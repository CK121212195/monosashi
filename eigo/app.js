/* =========================================================
   英語のものさし  app.js
   - 依存ライブラリなし。すべてブラウザ内で動作します。
   - 学習記録は localStorage にのみ保存し、外部へは送信しません。
   - 発音：Wiktionary の録音（dictionaryapi.dev 経由）を優先し、
           無い場合だけブラウザの合成音声を使います（画面に明示）。
   ========================================================= */
(() => {
'use strict';

const E = window.EIGO || {};
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const dayMs = 86400000;

/* ---------------- ラベル ---------------- */
const TOPICS = {
  stocks:  { ja: '株式・市場',   c: 'sky' },
  crypto:  { ja: '暗号資産',     c: 'grape' },
  rates:   { ja: '金利・金融政策', c: 'sun' },
  ai:      { ja: 'AI・テクノロジー', c: 'leaf' },
  art:     { ja: 'アート',       c: 'coral' },
  film:    { ja: '映画',         c: 'rose' },
  society: { ja: '社会・ビジネス', c: 'teal' }
};
const CATS = {
  vocab:   '語彙',
  idiom:   '熟語・句動詞',
  grammar: '文法・語法',
  confuse: '紛らわしい語'
};
const LV = {
  B: { short: 'Lv.B', ja: '英検2級〜準1級', toeic: 'TOEIC 600〜750 相当' },
  A: { short: 'Lv.A', ja: '英検1級',       toeic: 'TOEIC 751〜990 相当' }
};
const POS = { n: '名', v: '動', adj: '形', adv: '副', prep: '前', conj: '接', pron: '代', det: '限', aux: '助', phr: '句', num: '数', pn: '固', int: '間' };

/* ---------------- 保存 ---------------- */
const KEY = 'eigo-monosashi-v1';
const Store = {
  d: null,
  load() {
    try { this.d = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { this.d = {}; }
    const d = this.d;
    d.q = d.q || {};         // 問題ID -> {n:回数, c:正解数, last:正誤, t:時刻}
    d.words = d.words || {}; // 単語 -> {box, due, ctx, added}
    d.days = d.days || {};   // 日付 -> 解答数
    d.read = d.read || {};   // 長文ID -> {score, total, wpm, t}
    d.set = Object.assign({ accent: 'us', rate: 0.9, hover: true }, d.set || {});
    return d;
  },
  save() { try { localStorage.setItem(KEY, JSON.stringify(this.d)); } catch (e) { /* 保存できない環境でも動かす */ } }
};
Store.load();

function recordAnswer(id, ok) {
  const r = Store.d.q[id] || { n: 0, c: 0 };
  r.n++; if (ok) r.c++; r.last = ok ? 1 : 0; r.t = Date.now();
  Store.d.q[id] = r;
  const t = today(); Store.d.days[t] = (Store.d.days[t] || 0) + 1;
  Store.save();
}
function streak() {
  let n = 0; const d = new Date();
  // 今日まだ解いていなければ、昨日までの連続日数を数える
  const key = x => x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0');
  if (!Store.d.days[key(d)]) d.setDate(d.getDate() - 1);
  while (Store.d.days[key(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

/* ---------------- 辞書 ---------------- */
const DICT = Object.create(null);
const IDIOM = Object.create(null);   // 先頭語 -> [[語,...], ...]
(E.DICT_PARTS || []).join('\n').split('\n').forEach(line => {
  line = line.trim();
  if (!line || line[0] === '#') return;
  const [w, p, ja, ipa, lv] = line.split('|').map(s => (s || '').trim());
  if (!w) return;
  // 先頭が = の見出しは大文字小文字を区別する（US＝米国 と us＝私たちを を分ける）
  const key = w[0] === '=' ? w.slice(1) : w.toLowerCase().replace(/’/g, "'");
  if (DICT[key]) { if (!DICT[key].ja.includes(ja)) DICT[key].ja += '；' + ja; if (!DICT[key].ipa && ipa) DICT[key].ipa = ipa; if (!DICT[key].lv && lv) DICT[key].lv = lv; return; }
  DICT[key] = { w: w[0] === '=' ? w.slice(1) : w, p, ja, ipa: ipa || '', lv: lv || '' };
  if (key.includes(' ')) {
    const parts = key.split(' ');
    (IDIOM[parts[0]] = IDIOM[parts[0]] || []).push(parts);
  }
});
Object.values(IDIOM).forEach(list => list.sort((a, b) => b.length - a.length));
const IRREG = E.IRREG || {};
const TRAPS = E.TRAPS || {};
const HETERO = E.HETERO || {};

function candidates(w) {
  const c = [w];
  if (IRREG[w]) c.push(IRREG[w]);
  const add = x => { if (x && x.length > 1) c.push(x); };
  if (w.endsWith("'s")) add(w.slice(0, -2));
  if (w.endsWith("s'")) add(w.slice(0, -1));
  if (w.endsWith('ies')) add(w.slice(0, -3) + 'y');
  if (w.endsWith('s') && !w.endsWith('ss')) add(w.slice(0, -1));
  if (w.endsWith('es')) add(w.slice(0, -2));
  if (w.endsWith('ied')) add(w.slice(0, -3) + 'y');
  if (w.endsWith('ed')) { add(w.slice(0, -2)); add(w.slice(0, -1)); if (/(.)\1ed$/.test(w)) add(w.slice(0, -3)); }
  if (w.endsWith('ing')) { const s = w.slice(0, -3); add(s); add(s + 'e'); if (/(.)\1$/.test(s)) add(s.slice(0, -1)); }
  if (w.endsWith('ier')) add(w.slice(0, -3) + 'y');
  if (w.endsWith('iest')) add(w.slice(0, -4) + 'y');
  if (w.endsWith('er')) { add(w.slice(0, -2)); add(w.slice(0, -1)); if (/(.)\1er$/.test(w)) add(w.slice(0, -3)); }
  if (w.endsWith('est')) { add(w.slice(0, -3)); add(w.slice(0, -2)); }
  if (w.endsWith('ily')) add(w.slice(0, -3) + 'y');
  if (w.endsWith('ly')) { add(w.slice(0, -2)); add(w.slice(0, -2) + 'le'); }
  return c;
}
function lookup(raw) {
  if (raw === raw.toUpperCase() && DICT[raw]) return { key: raw, e: DICT[raw], surface: raw };
  const w = raw.toLowerCase().replace(/’/g, "'");
  const cands = candidates(w).filter(k => DICT[k] && !k.includes(' '));
  if (!cands.length) return null;
  // 見出し語そのものがあればそれを優先。-ing / -ed 形は動詞の見出しを優先する（using → use、us ではない）
  let k = cands[0];
  if (k !== w && /(ing|ed)$/.test(w)) k = cands.find(c => DICT[c].p === 'v') || k;
  return { key: k, e: DICT[k], surface: raw };
}

/* ---------------- 紛らわしい語 ---------------- */
const CONF = E.CONFUSE || [];
const CONF_IDX = Object.create(null);
CONF.forEach((g, gi) => g.g.forEach(w => { (CONF_IDX[w.toLowerCase()] = CONF_IDX[w.toLowerCase()] || []).push(gi); }));

// つづりが1文字違い・1文字入れ替えの語を辞書から自動で探す（登録済みグループの補完）
const SINGLE = Object.keys(DICT).filter(k => !k.includes(' ') && k.length >= 5 && /^[a-z]+$/.test(k));
function nearMiss(key) {
  if (key.length < 5) return [];
  const out = [];
  for (const k of SINGLE) {
    if (k === key || Math.abs(k.length - key.length) > 1) continue;
    // 語形変化の関係（-s/-d/-e の付け外し）は除外
    const [s, l] = k.length < key.length ? [k, key] : [key, k];
    if (l.startsWith(s) && /^(s|d|e|r)$/.test(l.slice(s.length))) continue;
    if (editClose(key, k)) out.push(k);
    if (out.length >= 4) break;
  }
  return out;
}
function editClose(a, b) {
  if (a.length === b.length) {
    const diff = []; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) diff.push(i);
    if (diff.length === 1) return true;
    if (diff.length === 2 && diff[1] === diff[0] + 1 && a[diff[0]] === b[diff[1]] && a[diff[1]] === b[diff[0]]) return true;
    return false;
  }
  const [s, l] = a.length < b.length ? [a, b] : [b, a];
  let i = 0, j = 0, skip = 0;
  while (i < s.length && j < l.length) { if (s[i] === l[j]) { i++; j++; } else { if (++skip > 1) return false; j++; } }
  return true;
}

// 2語の差分を文字単位で色分けする（LCS）
function diffPair(a, b) {
  const n = a.length, m = b.length, dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const markA = new Array(n).fill(true), markB = new Array(m).fill(true);
  let i = 0, j = 0;
  while (i < n && j < m) { if (a[i] === b[j]) { markA[i] = markB[j] = false; i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++; }
  const render = (s, mk) => [...s].map((ch, k) => mk[k] ? `<mark>${esc(ch)}</mark>` : esc(ch)).join('');
  return [render(a, markA), render(b, markB)];
}
function diffGroup(words) {
  if (words.length === 2) return diffPair(words[0], words[1]);
  // 3語以上：先頭語との差分で色分け
  return words.map((w, i) => i === 0 ? diffPair(w, words[1])[0] : diffPair(words[0], w)[1]);
}

/* ---------------- テキストの描画（単語ごとにホバー可能に） ---------------- */
const TOKEN_RE = /[A-Za-z]+(?:['’][A-Za-z]+)*|___/g;
function renderText(text, opt = {}) {
  // opt.marks: [{s:部分文字列, cls}] 根拠箇所などのハイライト
  let segs = [{ t: text, cls: '' }];
  (opt.marks || []).forEach(mk => {
    const next = [];
    segs.forEach(sg => {
      if (sg.cls) { next.push(sg); return; }
      const at = sg.t.indexOf(mk.s);
      if (at < 0 || !mk.s) { next.push(sg); return; }
      next.push({ t: sg.t.slice(0, at), cls: '' }, { t: mk.s, cls: mk.cls }, { t: sg.t.slice(at + mk.s.length), cls: '' });
    });
    segs = next;
  });
  return segs.map(sg => {
    const inner = tokenizeHTML(sg.t, opt);
    return sg.cls ? `<span class="${sg.cls}">${inner}</span>` : inner;
  }).join('');
}
function tokenizeHTML(text, opt) {
  const toks = []; let last = 0, m;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(text))) { toks.push({ gap: text.slice(last, m.index), w: m[0] }); last = m.index + m[0].length; }
  const tail = text.slice(last);
  let html = '';
  for (let i = 0; i < toks.length; i++) {
    const tk = toks[i];
    html += esc(tk.gap);
    if (tk.w === '___') { html += opt.blank || '<span class="blank">&nbsp;</span>'; continue; }
    // 熟語の検出（最長一致・活用形も許容）
    const idm = matchIdiom(toks, i);
    if (idm) {
      html += `<span class="idm" data-i="${esc(idm.key)}">`;
      for (let k = i; k < i + idm.len; k++) { if (k > i) html += esc(toks[k].gap); html += wordSpan(toks[k].w); }
      html += '</span>';
      i += idm.len - 1;
      continue;
    }
    html += wordSpan(tk.w);
  }
  return html + esc(tail);
}
function wordSpan(w) {
  const hit = lookup(w);
  if (!hit) return `<span class="w nf">${esc(w)}</span>`;
  const warn = CONF_IDX[hit.key] || TRAPS[hit.key] || HETERO[hit.key];
  const lv = hit.e.lv ? ` lv${hit.e.lv}` : '';
  return `<span class="w${warn ? ' warn' : ''}${lv}" data-k="${esc(hit.key)}">${esc(w)}</span>`;
}
function matchIdiom(toks, i) {
  const first = toks[i].w.toLowerCase().replace(/’/g, "'");
  const cand = candidates(first);
  for (const c of cand) {
    const list = IDIOM[c]; if (!list) continue;
    for (const parts of list) {
      if (i + parts.length > toks.length) continue;
      let ok = true;
      for (let k = 1; k < parts.length; k++) {
        const t = toks[i + k];
        if (/[.,;:!?()"]/.test(t.gap)) { ok = false; break; } // 句読点をまたがない
        const tw = t.w.toLowerCase().replace(/’/g, "'");
        if (tw !== parts[k] && !candidates(tw).includes(parts[k])) { ok = false; break; }
      }
      if (ok) return { key: parts.join(' '), len: parts.length };
    }
  }
  return null;
}

/* ---------------- 音声 ---------------- */
const NOVELTY = /(albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|ralph|kathy|espeak)/i;
function voiceScore(v, acc) {
  const want = acc === 'uk' ? /en[-_]GB/i : /en[-_]US/i;
  let s = 0;
  if (want.test(v.lang)) s += 20; else if (/^en/i.test(v.lang)) s += 5; else return -99;
  if (/natural|neural|online|premium|enhanced/i.test(v.name)) s += 12;
  if (/google/i.test(v.name)) s += 9;
  if (/(samantha|ava|allison|susan|zoe|evan|nathan|tom|daniel|serena|kate|oliver|arthur|martha|aria|jenny|guy|libby|ryan|sonia)/i.test(v.name)) s += 6;
  if (NOVELTY.test(v.name)) s -= 60;
  return s;
}
const Speech = {
  voices: [],
  init() {
    if (!('speechSynthesis' in window)) return;
    const load = () => { this.voices = speechSynthesis.getVoices() || []; renderVoiceInfo(); };
    load();
    speechSynthesis.addEventListener && speechSynthesis.addEventListener('voiceschanged', load);
  },
  pick(acc) {
    const best = this.voices.map(v => ({ v, s: voiceScore(v, acc) })).filter(x => x.s > 0).sort((a, b) => b.s - a.s)[0];
    return best ? best : null;
  },
  quality(acc) {
    const p = this.pick(acc);
    if (!p) return { level: 'none', name: '' };
    return { level: p.s >= 29 ? 'good' : p.s >= 20 ? 'ok' : 'low', name: p.v.name + '（' + p.v.lang + '）' };
  },
  speak(text, rate) {
    if (!('speechSynthesis' in window)) { toast('このブラウザは音声読み上げに対応していません'); return false; }
    Rec.stop();
    speechSynthesis.cancel();
    const acc = Store.d.set.accent;
    const u = new SpeechSynthesisUtterance(text);
    const p = this.pick(acc);
    if (p) { u.voice = p.v; u.lang = p.v.lang; } else u.lang = acc === 'uk' ? 'en-GB' : 'en-US';
    u.rate = rate || Store.d.set.rate;
    speechSynthesis.speak(u);
    return true;
  }
};
const Rec = {
  cache: Object.create(null), audio: null,
  stop() { if (this.audio) { try { this.audio.pause(); } catch (e) {} } },
  async find(word) {
    if (word in this.cache) return this.cache[word];
    let res = null;
    try {
      const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 6000);
      const r = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(word), { signal: ctl.signal });
      clearTimeout(tm);
      if (r.ok) {
        const j = await r.json();
        const ph = [];
        (Array.isArray(j) ? j : []).forEach(e => (e.phonetics || []).forEach(p => ph.push(p)));
        const clips = ph.filter(p => p.audio).map(p => ({
          url: p.audio.startsWith('//') ? 'https:' + p.audio : p.audio,
          acc: /-uk\.mp3$/i.test(p.audio) ? 'uk' : /-us\.mp3$/i.test(p.audio) ? 'us' : /-au\.mp3$/i.test(p.audio) ? 'au' : 'other',
          ipa: p.text || '',
          src: p.sourceUrl || ''
        }));
        const ipas = { us: '', uk: '' };
        clips.forEach(c => { if ((c.acc === 'us' || c.acc === 'uk') && c.ipa && !ipas[c.acc]) ipas[c.acc] = c.ipa; });
        res = { clips, ipas, any: (ph.find(p => p.text) || {}).text || '' };
      }
    } catch (e) { res = null; }
    this.cache[word] = res;
    return res;
  },
  async play(word, slow) {
    Speech.speak && ('speechSynthesis' in window) && speechSynthesis.cancel();
    const acc = Store.d.set.accent;
    const info = await this.find(word);
    const clip = info && (info.clips.find(c => c.acc === acc) || info.clips.find(c => c.acc === (acc === 'us' ? 'uk' : 'us')) || info.clips[0]);
    if (clip) {
      this.stop();
      const a = new Audio(clip.url);
      a.playbackRate = slow ? 0.7 : 1;
      if ('preservesPitch' in a) a.preservesPitch = true;
      this.audio = a;
      try { await a.play(); return { kind: 'rec', acc: clip.acc, info }; } catch (e) { /* 再生失敗時は合成音声へ */ }
    }
    Speech.speak(word, slow ? 0.6 : Store.d.set.rate);
    return { kind: 'tts', info };
  }
};

/* ---------------- ポップオーバー ---------------- */
const pop = document.createElement('div');
pop.className = 'pop'; pop.setAttribute('role', 'dialog'); pop.hidden = true;
document.body.appendChild(pop);
let popFor = null, popTimer = 0, hideTimer = 0;

function entryHTML(key, surface, idiomKey) {
  const e = DICT[key];
  let h = '';
  if (idiomKey && DICT[idiomKey]) {
    const ie = DICT[idiomKey];
    h += `<div class="pop-idm"><span class="pill pill-grape">熟語</span> <b>${esc(ie.w)}</b><div class="pop-ja">${esc(ie.ja)}</div>
      <button class="ib" data-say="${esc(ie.w)}" title="熟語を合成音声で聞く">🔊<small>合成</small></button></div>`;
  }
  if (!e) return h || '<div class="pop-none">辞書に未登録の語です</div>';
  const form = surface && surface.toLowerCase() !== key ? `<span class="pop-form">${esc(surface)} → 原形</span>` : '';
  const lv = e.lv ? `<span class="pill ${e.lv === 'A' ? 'pill-coral' : 'pill-sky'}">${e.lv === 'A' ? '1級語彙' : '準1級語彙'}</span>` : '';
  h += `<div class="pop-head">
    <div><div class="pop-w">${esc(e.w)} ${lv}</div>${form}</div>
    <div class="pop-btns">
      <button class="ib" data-play="${esc(key)}" title="発音を聞く">🔊</button>
      <button class="ib" data-play="${esc(key)}" data-slow="1" title="ゆっくり聞く">🐢</button>
      <button class="ib ${Store.d.words[key] ? 'on' : ''}" data-save="${esc(key)}" title="単語帳に入れる">${Store.d.words[key] ? '★' : '☆'}</button>
    </div></div>
    <div class="pop-ipa" data-ipa="${esc(key)}">${e.ipa ? '<span class="ipa">/' + esc(e.ipa) + '/</span>' : '<span class="muted">🔊を押すと発音記号を取得します</span>'}</div>
    <div class="pop-ja"><span class="pos">${esc(POS[e.p] || e.p || '')}</span>${esc(e.ja)}</div>`;
  if (HETERO[key]) h += `<div class="alert alert-sun"><b>品詞で発音が変わる語</b>${esc(HETERO[key])}<br><small>単語だけの音声は片方の読みしか流れません。文ごと聞いて確かめてください。</small></div>`;
  if (TRAPS[key]) h += `<div class="alert alert-coral"><b>カタカナ発音の罠</b>${esc(TRAPS[key])}</div>`;
  const groups = CONF_IDX[key] || [];
  groups.forEach(gi => {
    const g = CONF[gi];
    const others = g.g.map((w, i) => ({ w, m: g.m[i] })).filter(x => x.w.toLowerCase() !== key);
    const d = diffGroup(g.g);
    h += `<div class="alert alert-grape"><b>混同注意</b>
      <div class="cmp">${g.g.map((w, i) => `<span class="cmp-w ${w.toLowerCase() === key ? 'me' : ''}">${d[i]}</span><span class="cmp-m">${esc(g.m[i])}</span>`).join('')}</div>
      <small>${esc(g.tip)}</small></div>`;
    void others;
  });
  if (!groups.length) {
    const nm = nearMiss(key);
    if (nm.length) h += `<div class="alert alert-grape"><b>つづりが1文字違いの語</b>${nm.map(k => { const d = diffPair(key, k); return `<div class="nm"><span class="cmp-w">${d[1]}</span> <span class="cmp-m">${esc(DICT[k].ja)}</span></div>`; }).join('')}</div>`;
  }
  return h;
}
function showPop(el) {
  const k = el.dataset.k; const idm = el.closest('.idm');
  if (!k && !idm) return;
  popFor = el;
  pop.innerHTML = `<button class="pop-x" aria-label="閉じる">×</button>` + entryHTML(k, el.textContent, idm && idm.dataset.i);
  pop.hidden = false;
  const r = el.getBoundingClientRect();
  const pw = Math.min(360, window.innerWidth - 24);
  pop.style.width = pw + 'px';
  let left = r.left + window.scrollX + r.width / 2 - pw / 2;
  left = Math.max(12 + window.scrollX, Math.min(left, window.scrollX + window.innerWidth - pw - 12));
  pop.style.left = left + 'px';
  const ph = pop.offsetHeight;
  const below = r.bottom + 10, above = r.top - ph - 10;
  const top = (below + ph > window.innerHeight && above > 0) ? above : below;
  pop.style.top = (top + window.scrollY) + 'px';
  $$('.w.act').forEach(x => x.classList.remove('act'));
  el.classList.add('act');
}
function hidePop() { pop.hidden = true; popFor = null; $$('.w.act').forEach(x => x.classList.remove('act')); }
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

document.addEventListener('mouseover', ev => {
  if (!canHover || !Store.d.set.hover) return;
  let w = ev.target.closest('.w');
  // 回答前の選択肢の上ではポップアップを出さない（ほかの選択肢を覆ってしまうため）
  if (w && w.closest('.opt:not(:disabled)')) w = null;
  if (w && (w.dataset.k || w.closest('.idm'))) {
    clearTimeout(hideTimer); clearTimeout(popTimer);
    if (popFor === w) return;
    popTimer = setTimeout(() => showPop(w), 110);
  } else if (ev.target.closest('.pop')) {
    clearTimeout(hideTimer);
  }
});
document.addEventListener('mouseout', ev => {
  if (!canHover || !Store.d.set.hover) return;
  const from = ev.target.closest('.w, .pop');
  if (!from) return;
  const to = ev.relatedTarget && ev.relatedTarget.closest && ev.relatedTarget.closest('.w, .pop');
  if (to === from) return;
  clearTimeout(popTimer);
  hideTimer = setTimeout(hidePop, 260);
});
document.addEventListener('click', async ev => {
  const t = ev.target;
  const w = t.closest('.w');
  if (w && (w.dataset.k || w.closest('.idm')) && !t.closest('button:not(:disabled)')) {
    if (popFor === w && !canHover) { hidePop(); return; }
    showPop(w); return;
  }
  const play = t.closest('[data-play]');
  if (play) {
    const key = play.dataset.play;
    play.classList.add('busy');
    const r = await Rec.play(key, !!play.dataset.slow);
    play.classList.remove('busy');
    const ipaBox = $(`.pop [data-ipa="${CSS.escape(key)}"]`) || $(`[data-ipa="${CSS.escape(key)}"]`);
    if (ipaBox) {
      const e = DICT[key] || {};
      const got = r.info ? (r.info.ipas[Store.d.set.accent] || r.info.ipas.us || r.info.ipas.uk || r.info.any) : '';
      const src = r.kind === 'rec'
        ? `<span class="src src-rec">録音（${r.acc === 'uk' ? '英' : r.acc === 'us' ? '米' : r.acc === 'au' ? '豪' : ''}）・Wiktionary</span>`
        : `<span class="src src-tts">合成音声（録音が見つからないため）</span>`;
      const ipa = e.ipa ? '/' + e.ipa + '/' : (got ? got.replace(/^\/?/, '/').replace(/\/?$/, '/') : '');
      ipaBox.innerHTML = (ipa ? `<span class="ipa">${esc(ipa)}</span>` : '') + src;
    }
    return;
  }
  const say = t.closest('[data-say]');
  if (say) { Speech.speak(say.dataset.say, say.dataset.slow ? 0.65 : undefined); return; }
  const save = t.closest('[data-save]');
  if (save) {
    const key = save.dataset.save;
    const ctx = popFor ? (popFor.closest('[data-ctx]') || {}).dataset?.ctx || '' : '';
    toggleWord(key, ctx);
    const on = !!Store.d.words[key];
    $$(`[data-save="${CSS.escape(key)}"]`).forEach(b => { b.classList.toggle('on', on); if (b.classList.contains('ib')) b.textContent = on ? '★' : '☆'; });
    toast(on ? `「${DICT[key] ? DICT[key].w : key}」を単語帳に入れました` : '単語帳から外しました');
    return;
  }
  if (t.closest('.pop-x')) { hidePop(); return; }
  if (!t.closest('.pop')) hidePop();
});
document.addEventListener('keydown', ev => { if (ev.key === 'Escape') hidePop(); });
window.addEventListener('resize', hidePop);

/* ---------------- 単語帳（間隔反復） ---------------- */
const BOX_DAYS = [0, 1, 3, 7, 16, 35];
function toggleWord(key, ctx) {
  if (Store.d.words[key]) delete Store.d.words[key];
  else Store.d.words[key] = { box: 0, due: Date.now(), ctx: ctx || '', added: Date.now() };
  Store.save(); updateBadges();
}
function addWord(key, ctx) {
  if (!DICT[key] || Store.d.words[key]) return;
  Store.d.words[key] = { box: 0, due: Date.now(), ctx: ctx || '', added: Date.now() };
  Store.save();
}
function dueWords() { const now = Date.now(); return Object.entries(Store.d.words).filter(([, v]) => v.due <= now).map(([k]) => k); }

/* ---------------- 共通UI ---------------- */
function toast(msg) {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2200);
}
function topicPill(tp) { const t = TOPICS[tp] || { ja: tp, c: 'sky' }; return `<span class="pill pill-${t.c}">${esc(t.ja)}</span>`; }
function lvPill(lv) { return `<span class="pill ${lv === 'A' ? 'pill-lvA' : 'pill-lvB'}" title="${esc(LV[lv].toeic)}">${LV[lv].short} ${esc(LV[lv].ja)}</span>`; }
const CHEER_OK = ['Nice! その調子です', 'Great! 語感が育っています', 'Perfect! 本番でも取れる1問', 'Excellent! 着実に積み上がっています', 'Well done! この1問は自分のものです'];
const CHEER_NG = ['惜しい！ここで出会えたのが収穫です', '大丈夫。今ここで覚えれば本番で取れます', 'ナイスチャレンジ！解説で一気に定着させましょう', '間違えた問題ほど記憶に残ります。解説へどうぞ'];
const pickOne = a => a[Math.floor(Math.random() * a.length)];
function updateBadges() {
  const n = dueWords().length;
  $$('[data-due]').forEach(b => { b.textContent = n; b.hidden = !n; });
}
function renderVoiceInfo() {
  const box = $('#voiceInfo'); if (!box) return;
  const q = Speech.quality(Store.d.set.accent);
  const lab = { good: '良好', ok: '標準', low: '注意', none: '見つかりません' }[q.level];
  box.innerHTML = `<b>合成音声：</b>${q.name ? esc(q.name) : '（英語の音声がありません）'} <span class="pill ${q.level === 'good' ? 'pill-leaf' : q.level === 'ok' ? 'pill-sun' : 'pill-coral'}">${lab}</span>` +
    (q.level === 'low' || q.level === 'none' ? '<p class="muted small">お使いの環境の合成音声は品質が低い可能性があります。単語は録音を優先して再生しますが、文の読み上げは参考程度にしてください。Chrome / Edge / Safari の最新版では、より自然な音声が使えることが多いです。</p>' : '');
}

/* ---------------- ルーター ---------------- */
const view = () => $('#view');
const routes = {};
function go(hash) { if (location.hash !== hash) location.hash = hash; else route(); }
function route() {
  hidePop();
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  Rec.stop();
  const h = location.hash.replace(/^#\/?/, '') || 'home';
  const [name, arg] = h.split('/');
  $$('.nav a').forEach(a => a.classList.toggle('on', a.dataset.r === name));
  (routes[name] || routes.home)(arg);
  updateBadges();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

/* ---------------- ホーム ---------------- */
routes.home = () => {
  const cz = E.CLOZE || [], ps = E.PASSAGES || [];
  const nB = cz.filter(q => q.lv === 'B').length + ps.filter(p => p.lv === 'B').reduce((s, p) => s + p.qs.length, 0);
  const nA = cz.filter(q => q.lv === 'A').length + ps.filter(p => p.lv === 'A').reduce((s, p) => s + p.qs.length, 0);
  const pctA = nA + nB ? Math.round(nA / (nA + nB) * 100) : 0;
  const answered = Object.values(Store.d.q);
  const acc = answered.reduce((s, r) => s + r.n, 0) ? Math.round(answered.reduce((s, r) => s + r.c, 0) / answered.reduce((s, r) => s + r.n, 0) * 100) : null;
  const topicCount = {};
  ps.forEach(p => topicCount[p.tp] = (topicCount[p.tp] || 0) + 1);
  cz.forEach(q => topicCount[q.tp] = (topicCount[q.tp] || 0) + 1);
  const words = ps.reduce((s, p) => s + wordCount(p), 0);
  view().innerHTML = `
  <section class="hero">
    <div class="hero-in">
      <p class="eyebrow">Read. Touch. Listen. Remember.</p>
      <h1>読みながら、<br><em>触れた単語</em>がそのまま身につく。</h1>
      <p class="lead">英検2級〜1級・TOEIC 600点以上をめざす人のための、筆記（リーディング）特化の無料問題集です。本文のどの単語も、カーソルを合わせるだけで意味・発音記号・混同しやすい語が出ます。登録は不要、学習記録はお使いのブラウザの中だけに保存されます。</p>
      <div class="demo card" data-ctx="The central bank's decision to raise interest rates rattled the stock market, yet investors who had diversified into bonds stayed calm.">
        <p class="demo-lab">試しに単語へカーソルを（スマホはタップ）</p>
        <p class="demo-en">${renderText("The central bank's decision to raise interest rates rattled the stock market, yet investors who had diversified into bonds stayed calm.")}</p>
        <p class="demo-hint"><span class="w warn demo-key">点線の語</span>は、混同しやすい語・カタカナ発音の罠がある語です。</p>
      </div>
      <div class="cta">
        <a class="btn btn-sun" href="#cloze">穴埋め問題をはじめる →</a>
        <a class="btn btn-sky" href="#reading">長文を読む →</a>
      </div>
    </div>
  </section>

  <section class="stats-row">
    <div class="stat"><span class="stat-n">${streak()}</span><span class="stat-l">日連続</span></div>
    <div class="stat"><span class="stat-n">${Store.d.days[today()] || 0}</span><span class="stat-l">今日の解答</span></div>
    <div class="stat"><span class="stat-n">${acc === null ? '—' : acc + '<small>%</small>'}</span><span class="stat-l">これまでの正答率</span></div>
    <a class="stat stat-link" href="#words"><span class="stat-n">${dueWords().length}</span><span class="stat-l">今日の単語復習</span></a>
  </section>

  <section class="modes">
    <a class="mode card" href="#cloze"><span class="mode-ic">✏️</span><h2>穴埋め問題</h2><p>語彙・熟語・文法・紛らわしい語の4分野 ${cz.length}問。選択肢すべての意味と、ほかの選択肢が「なぜ違うか」まで解説します。</p></a>
    <a class="mode card" href="#reading"><span class="mode-ic">📰</span><h2>長文読解</h2><p>投資・金利・暗号資産・AI・アート・映画など ${ps.length}本（計 約${words.toLocaleString()}語）。根拠の一文をハイライトし、読む速さ（語/分）も測れます。</p></a>
    <a class="mode card" href="#confuse"><span class="mode-ic">🔍</span><h2>紛らわしい語ドリル</h2><p>conform / confirm のような一文字違い・似た意味の語 ${CONF.length}組。違う文字に色がつくので、目で見て区別できます。</p></a>
    <a class="mode card" href="#words"><span class="mode-ic">⭐</span><h2>単語帳と復習</h2><p>☆で入れた語と、間違えた問題の語を、忘れかけた頃に出し直します（間隔反復）。 <span class="badge" data-due hidden></span></p></a>
  </section>

  <section class="features">
    <h2 class="sec-title">間違った発音で覚えないための工夫</h2>
    <div class="feat-grid">
      <div class="feat card"><h3>🎙️ 人の声の録音を優先</h3><p>単語の🔊は、Wiktionary に投稿された<strong>実際の人の録音</strong>を優先して再生します。録音がない語だけ合成音声に切り替え、どちらで再生したかを必ず表示します。</p></div>
      <div class="feat card"><h3>🔤 発音記号とアクセント</h3><p>重要語には発音記号（IPA）を収録。強く読む位置（ˈ）が一目でわかります。米音・英音も切り替えられます。</p></div>
      <div class="feat card"><h3>⚠️ カタカナ発音の罠</h3><p>label（レイベル）、vitamin（ヴァイタミン）、debt（bを読まない）など、日本語のカタカナ読みで覚えやすい語に警告を出します。</p></div>
      <div class="feat card"><h3>🔁 品詞で発音が変わる語</h3><p>record・present・contract など、名詞と動詞で強勢が移る語は両方の読みを表示し、文ごとの読み上げで確かめるよう促します。</p></div>
    </div>
  </section>

  <section class="levels card">
    <h2 class="sec-title">レベル構成</h2>
    <p>全${(nA + nB)}問のうち、<b>${LV.B.short}（${LV.B.ja}／${LV.B.toeic}）が${100 - pctA}%</b>、<b>${LV.A.short}（${LV.A.ja}／${LV.A.toeic}）が${pctA}%</b>です。穴埋めの「おまかせ」出題も、この比率（約85：15）で組み立てます。</p>
    <div class="lvbar"><span class="lvbar-b" style="width:${100 - pctA}%">${LV.B.short} ${100 - pctA}%</span><span class="lvbar-a" style="width:${pctA}%">${pctA}%</span></div>
    <p class="muted small">※ レベル区分は、英検・TOEICの公開情報をもとに当サイトが判断した目安です。各試験の公式問題ではありません。</p>
    <div class="topic-chips">${Object.keys(TOPICS).filter(t => topicCount[t]).map(t => `${topicPill(t)}<small>${topicCount[t]}</small>`).join(' ')}</div>
  </section>`;
};
function wordCount(p) { return p.body.join(' ').split(/\s+/).filter(Boolean).length; }

/* ---------------- 穴埋め ---------------- */
let quiz = null;
routes.cloze = () => {
  const cz = E.CLOZE || [];
  const last = Store.d.set.cloze || { n: 10, lv: 'mix', cat: 'all', tp: 'all', wrong: false };
  const wrongCount = cz.filter(q => Store.d.q[q.id] && Store.d.q[q.id].last === 0).length;
  const catCount = c => cz.filter(q => q.cat === c).length;
  view().innerHTML = `
  <section class="page-head"><h1>穴埋め問題</h1><p>文の空所に入る語句を選びます。問題文の単語にもカーソルを合わせて、意味と発音を確かめながら進めましょう。</p></section>
  <form class="setup card" id="setup">
    <fieldset><legend>問題数</legend>
      ${[10, 20, 30].map(n => `<label class="chip"><input type="radio" name="n" value="${n}" ${last.n == n ? 'checked' : ''}><span>${n}問</span></label>`).join('')}
    </fieldset>
    <fieldset><legend>レベル</legend>
      <label class="chip"><input type="radio" name="lv" value="mix" ${last.lv === 'mix' ? 'checked' : ''}><span>おまかせ（85：15）</span></label>
      <label class="chip"><input type="radio" name="lv" value="B" ${last.lv === 'B' ? 'checked' : ''}><span>${LV.B.short}のみ</span></label>
      <label class="chip"><input type="radio" name="lv" value="A" ${last.lv === 'A' ? 'checked' : ''}><span>${LV.A.short}のみ</span></label>
    </fieldset>
    <fieldset><legend>分野</legend>
      <label class="chip"><input type="radio" name="cat" value="all" ${last.cat === 'all' ? 'checked' : ''}><span>すべて</span></label>
      ${Object.entries(CATS).map(([k, v]) => `<label class="chip"><input type="radio" name="cat" value="${k}" ${last.cat === k ? 'checked' : ''}><span>${v} <small>${catCount(k)}</small></span></label>`).join('')}
    </fieldset>
    <fieldset><legend>題材</legend>
      <label class="chip"><input type="radio" name="tp" value="all" ${last.tp === 'all' ? 'checked' : ''}><span>すべて</span></label>
      ${Object.entries(TOPICS).filter(([k]) => cz.some(q => q.tp === k)).map(([k, v]) => `<label class="chip"><input type="radio" name="tp" value="${k}" ${last.tp === k ? 'checked' : ''}><span>${v.ja}</span></label>`).join('')}
    </fieldset>
    <label class="check"><input type="checkbox" name="wrong" ${last.wrong ? 'checked' : ''} ${wrongCount ? '' : 'disabled'}> 前回まちがえた問題だけ（${wrongCount}問）</label>
    <button class="btn btn-sun btn-wide" type="submit">スタート →</button>
  </form>`;
  $('#setup').addEventListener('submit', ev => {
    ev.preventDefault();
    const f = new FormData(ev.target);
    const s = { n: +f.get('n'), lv: f.get('lv'), cat: f.get('cat'), tp: f.get('tp'), wrong: !!f.get('wrong') };
    Store.d.set.cloze = s; Store.save();
    let pool = cz.filter(q => (s.cat === 'all' || q.cat === s.cat) && (s.tp === 'all' || q.tp === s.tp));
    if (s.wrong) pool = pool.filter(q => Store.d.q[q.id] && Store.d.q[q.id].last === 0);
    // 未回答の問題を優先して出す
    const fresh = q => Store.d.q[q.id] ? 1 : 0;
    const order = arr => shuffle(arr).sort((a, b) => fresh(a) - fresh(b));
    let list;
    if (s.lv === 'mix') {
      const nA = Math.round(s.n * 0.15);
      const A = order(pool.filter(q => q.lv === 'A')).slice(0, nA);
      const B = order(pool.filter(q => q.lv === 'B')).slice(0, s.n - A.length);
      list = shuffle(A.concat(B));
      if (list.length < s.n) list = list.concat(order(pool.filter(q => !list.includes(q))).slice(0, s.n - list.length));
    } else list = order(pool.filter(q => q.lv === s.lv)).slice(0, s.n);
    if (!list.length) { toast('条件に合う問題がありません。条件をゆるめてください'); return; }
    quiz = { list, i: 0, res: [] };
    renderQ();
  });
};
function optMeaning(o) {
  // 選択肢の語句を辞書で引く（熟語→単語の順）
  const low = o.toLowerCase().replace(/’/g, "'");
  if (DICT[low]) return { key: low, e: DICT[low] };
  const words = low.split(/\s+/);
  if (words.length > 1) {
    const cand = candidates(words[0]);
    for (const c of cand) { const k = [c].concat(words.slice(1)).join(' '); if (DICT[k]) return { key: k, e: DICT[k] }; }
    return null;
  }
  const hit = lookup(o);
  return hit ? { key: hit.key, e: hit.e } : null;
}
function renderQ() {
  const q = quiz.list[quiz.i];
  const n = quiz.list.length;
  const opts = q.o.map((o, i) => ({ o, i }));
  view().innerHTML = `
  <section class="qwrap">
    <div class="qtop">
      <div class="prog"><span style="width:${(quiz.i) / n * 100}%"></span></div>
      <div class="qmeta"><span class="qnum">${quiz.i + 1} / ${n}</span> ${lvPill(q.lv)} ${topicPill(q.tp)} <span class="pill pill-line">${CATS[q.cat]}</span></div>
    </div>
    <div class="qcard card" data-ctx="${esc(q.q.replace('___', q.o[q.a]))}">
      <p class="qtext">${renderText(q.q, { blank: '<span class="blank" id="blank">&emsp;&emsp;&emsp;</span>' })}</p>
      <div class="opts">${opts.map(({ o, i }) => `<button class="opt" data-i="${i}"><span class="opt-k">${i + 1}</span><span class="opt-t">${esc(o)}</span></button>`).join('')}</div>
      <div id="fb"></div>
    </div>
    <p class="kbd muted small">キーボード：1〜4で選択、Enterで次へ</p>
  </section>`;
  $$('.opt').forEach(b => b.addEventListener('click', () => answerQ(+b.dataset.i)));
}
function answerQ(i) {
  const q = quiz.list[quiz.i];
  if (quiz.res[quiz.i] !== undefined) return;
  const ok = i === q.a;
  quiz.res[quiz.i] = { ok, pick: i };
  recordAnswer(q.id, ok);
  $$('.opt').forEach(b => {
    const k = +b.dataset.i; b.disabled = true;
    if (k === q.a) b.classList.add('ok'); else if (k === i) b.classList.add('ng');
  });
  $('#blank').outerHTML = `<span class="blank filled ${ok ? 'ok' : 'ng'}">${esc(q.o[q.a])}</span>`;
  // 間違えたら、正解の語を単語帳へ自動で入れる
  const hit = optMeaning(q.o[q.a]);
  if (!ok && hit) addWord(hit.key, q.q.replace('___', q.o[q.a]));
  const full = q.q.replace('___', q.o[q.a]);
  const rows = q.o.map((o, k) => {
    const m = optMeaning(o);
    const note = q.w && q.w[k] ? q.w[k] : '';
    return `<tr class="${k === q.a ? 'is-ok' : ''}"><td class="o-w">${k === q.a ? '◎ ' : ''}${m ? `<span class="w${CONF_IDX[m.key] ? ' warn' : ''}" data-k="${esc(m.key)}">${esc(o)}</span>` : esc(o)}</td>
      <td>${m ? esc(m.e.ja) : ''}${note ? `<div class="o-note">${esc(note)}</div>` : ''}</td>
      <td class="o-a">${m && !m.key.includes(' ') ? `<button class="ib sm" data-play="${esc(m.key)}" title="発音">🔊</button>` : `<button class="ib sm" data-say="${esc(o)}" title="合成音声">🔊</button>`}</td></tr>`;
  }).join('');
  // 選択肢に紛らわしい語の組があれば差分を表示
  let confBox = '';
  const inOpts = q.o.map(o => o.toLowerCase());
  const g = CONF.find(g => g.g.filter(w => inOpts.includes(w.toLowerCase())).length >= 2);
  if (g) {
    const d = diffGroup(g.g);
    confBox = `<div class="alert alert-grape"><b>見分けるコツ</b><div class="cmp">${g.g.map((w, k) => `<span class="cmp-w">${d[k]}</span><span class="cmp-m">${esc(g.m[k])}</span>`).join('')}</div><small>${esc(g.tip)}</small></div>`;
  }
  $('#fb').innerHTML = `
    <div class="fb ${ok ? 'fb-ok' : 'fb-ng'}"><b>${ok ? '◎ ' + pickOne(CHEER_OK) : '△ ' + pickOne(CHEER_NG)}</b></div>
    <div class="exp">
      <div class="exp-en">${renderText(full)} <button class="ib sm" data-say="${esc(full)}" title="文を合成音声で聞く">🔊<small>文</small></button></div>
      <p class="exp-ja">${esc(q.ja)}</p>
      <p class="exp-body">${esc(q.ex)}</p>
      <table class="otable"><tbody>${rows}</tbody></table>
      ${confBox}
      ${!ok && hit ? '<p class="muted small">正解の語を単語帳に入れました。明日から復習に出てきます。</p>' : ''}
    </div>
    <button class="btn btn-sun btn-wide" id="next">${quiz.i + 1 < quiz.list.length ? '次の問題へ →' : '結果を見る →'}</button>`;
  $('#next').addEventListener('click', nextQ);
  $('#next').focus({ preventScroll: true });
  $('#fb').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function nextQ() {
  if (quiz.i + 1 < quiz.list.length) { quiz.i++; renderQ(); window.scrollTo(0, 0); }
  else renderResult();
}
function renderResult() {
  const n = quiz.list.length, c = quiz.res.filter(r => r && r.ok).length;
  const pct = Math.round(c / n * 100);
  const msg = pct >= 90 ? '見事です！この範囲はもう得点源です。' : pct >= 70 ? 'いい流れです。間違えた問題だけもう一度解くと、一気に固まります。' : pct >= 50 ? '伸びしろが見えました。解説を読み返してから再挑戦すると効果的です。' : '今日の一歩が、いちばん大きな一歩です。まずは間違えた語を単語帳で復習しましょう。';
  view().innerHTML = `
  <section class="result card">
    <p class="eyebrow">Result</p>
    <div class="ring" style="--p:${pct}"><span>${c}<small>/${n}</small></span></div>
    <p class="result-msg">${msg}</p>
    <div class="cta center">
      ${c < n ? '<button class="btn btn-coral" id="retry">間違えた問題をもう一度</button>' : ''}
      <a class="btn btn-sun" href="#cloze">新しいセットへ</a>
    </div>
  </section>
  <section class="review">
    ${quiz.list.map((q, k) => { const r = quiz.res[k] || {}; return `<details class="rv card ${r.ok ? 'rv-ok' : 'rv-ng'}"><summary><span class="rv-m">${r.ok ? '◎' : '△'}</span> ${esc(q.q.replace('___', '[' + q.o[q.a] + ']'))}</summary><div class="rv-b"><p>${renderText(q.q.replace('___', q.o[q.a]))}</p><p class="exp-ja">${esc(q.ja)}</p><p>${esc(q.ex)}</p></div></details>`; }).join('')}
  </section>`;
  const rt = $('#retry');
  if (rt) rt.addEventListener('click', () => { const wrong = quiz.list.filter((q, k) => !(quiz.res[k] || {}).ok); quiz = { list: shuffle(wrong), i: 0, res: [] }; renderQ(); });
}
document.addEventListener('keydown', ev => {
  if (!quiz || !$('.qwrap') || ev.target.closest('input, textarea')) return;
  if (/^[1-4]$/.test(ev.key)) { const b = $$('.opt')[+ev.key - 1]; if (b && !b.disabled) b.click(); }
  if (ev.key === 'Enter' && $('#next') && document.activeElement !== $('#next')) { ev.preventDefault(); $('#next').click(); }
});

/* ---------------- 長文 ---------------- */
routes.reading = (id) => {
  if (id) return renderPassage(id);
  const ps = E.PASSAGES || [];
  const f = Store.d.set.readTp || 'all';
  view().innerHTML = `
  <section class="page-head"><h1>長文読解</h1><p>いまの社会とつながる題材を書き下ろしました。本文のどの単語もホバーで意味が出ます。まず時間を計って読み、設問を解いたあと、根拠の一文と全訳で確かめましょう。</p></section>
  <div class="filters" id="rf">
    <button class="chip-btn ${f === 'all' ? 'on' : ''}" data-tp="all">すべて <small>${ps.length}</small></button>
    ${Object.entries(TOPICS).filter(([k]) => ps.some(p => p.tp === k)).map(([k, v]) => `<button class="chip-btn ${f === k ? 'on' : ''}" data-tp="${k}">${v.ja} <small>${ps.filter(p => p.tp === k).length}</small></button>`).join('')}
  </div>
  <div class="plist">${ps.filter(p => f === 'all' || p.tp === f).map(p => {
    const r = Store.d.read[p.id]; const wc = wordCount(p);
    return `<a class="pcard card" href="#reading/${p.id}">
      <div class="pcard-top">${topicPill(p.tp)} ${lvPill(p.lv)}</div>
      <h2 lang="en">${esc(p.title)}</h2>
      <p class="pcard-ja">${esc(p.jt)}</p>
      <div class="pcard-meta"><span>${wc}語</span><span>設問${p.qs.length}</span>${r ? `<span class="done">✓ ${r.score}/${r.total}${r.wpm ? '・' + r.wpm + '語/分' : ''}</span>` : ''}</div>
    </a>`;
  }).join('')}</div>
  <p class="muted small note">※ 本文は学習用に書き下ろしたものです。制度や技術の一般的な仕組みを題材にしていますが、登場する企業・人物・数値の一部は架空です。投資判断の参考にはしないでください。</p>`;
  $$('#rf [data-tp]').forEach(b => b.addEventListener('click', () => { Store.d.set.readTp = b.dataset.tp; Store.save(); routes.reading(); }));
};
let rd = null;
function renderPassage(id) {
  const p = (E.PASSAGES || []).find(x => x.id === id);
  if (!p) { go('#reading'); return; }
  if (!rd || rd.id !== id) rd = { id, start: Date.now(), stop: 0, ans: [], showJa: false };
  const wc = wordCount(p);
  const marks = rd.ans.map((a, k) => a !== undefined && p.qs[k].ev ? { p: p.qs[k].ev[0], s: p.qs[k].ev[1], k } : null).filter(Boolean);
  const paraHTML = p.body.map((para, pi) => {
    const mk = marks.filter(m => m.p === pi).map(m => ({ s: m.s, cls: 'evi evi' + ((m.k % 4) + 1) }));
    return `<div class="para" data-ctx="${esc(para)}">
      <button class="ib sm para-say" data-say="${esc(para)}" title="この段落を合成音声で聞く">🔊</button>
      <p lang="en">${renderText(para, { marks: mk })}</p>
      ${rd.showJa ? `<p class="para-ja">${esc(p.ja[pi] || '')}</p>` : ''}
    </div>`;
  }).join('');
  const qsHTML = p.qs.map((q, k) => {
    const a = rd.ans[k];
    return `<div class="rq card ${a !== undefined ? (a === q.a ? 'rq-ok' : 'rq-ng') : ''}" id="rq${k}">
      <p class="rq-q"><span class="rq-n evi${(k % 4) + 1}">Q${k + 1}</span> ${renderText(q.q)}</p>
      <div class="opts">${q.o.map((o, i) => `<button class="opt ${a !== undefined ? (i === q.a ? 'ok' : i === a ? 'ng' : '') : ''}" data-q="${k}" data-i="${i}" ${a !== undefined ? 'disabled' : ''}><span class="opt-k">${i + 1}</span><span class="opt-t">${renderText(o)}</span></button>`).join('')}</div>
      ${a !== undefined ? `<div class="exp"><div class="fb ${a === q.a ? 'fb-ok' : 'fb-ng'}"><b>${a === q.a ? '◎ 正解' : '△ 正解は ' + (q.a + 1)}</b></div>${q.qj ? `<p class="exp-ja">設問訳：${esc(q.qj)}</p>` : ''}<p class="exp-body">${esc(q.ex)}</p>${q.ev ? '<p class="muted small">本文の<span class="evi evi' + ((k % 4) + 1) + '">色つきの部分</span>が根拠です。</p>' : ''}</div>` : ''}
    </div>`;
  }).join('');
  const done = rd.ans.filter(a => a !== undefined).length;
  const score = p.qs.filter((q, k) => rd.ans[k] === q.a).length;
  const elapsed = (rd.stop || Date.now()) - rd.start;
  const wpm = rd.stop ? calcWpm(wc, elapsed) : 0;
  view().innerHTML = `
  <article class="passage">
    <a class="back" href="#reading">← 長文の一覧へ</a>
    <header class="p-head">
      <div>${topicPill(p.tp)} ${lvPill(p.lv)} <span class="muted small">${wc}語</span></div>
      <h1 lang="en">${esc(p.title)}</h1>
      <p class="pcard-ja">${esc(p.jt)}</p>
    </header>
    <div class="toolbar card">
      <div class="timer"><span class="timer-ic">⏱</span><span id="tm">${fmtTime(elapsed)}</span>
        ${rd.stop ? (wpm ? `<span class="wpm"><b>${wpm}</b> 語/分</span>` : '<span class="muted small">計測時間が短すぎるため、読む速さは記録していません</span>') : '<button class="btn btn-sm btn-sky" id="stopRead">読み終えた</button>'}</div>
      <label class="switch"><input type="checkbox" id="jaT" ${rd.showJa ? 'checked' : ''}><span>全訳を表示</span></label>
    </div>
    ${rd.stop && wpm ? `<p class="wpm-note muted small">${wpmNote(wpm, p.lv)}</p>` : ''}
    <div class="p-grid">
      <div class="p-body">${paraHTML}</div>
      <aside class="p-qs">
        <h2 class="sec-title sm">設問 <small class="muted">${done}/${p.qs.length}</small></h2>
        ${qsHTML}
        ${done === p.qs.length ? `<div class="card p-done"><b>${score} / ${p.qs.length} 問正解</b><p>${score === p.qs.length ? '全問正解！論旨をしっかりつかめています。' : '根拠の色つき部分と全訳を見比べると、取りこぼしの理由がはっきりします。'}</p><a class="btn btn-sun btn-sm" href="#reading">ほかの長文へ</a></div>` : ''}
      </aside>
    </div>
  </article>`;
  clearInterval(rd.iv);
  if (!rd.stop) rd.iv = setInterval(() => { const t = $('#tm'); if (!t || location.hash !== '#reading/' + id) { clearInterval(rd.iv); return; } t.textContent = fmtTime(Date.now() - rd.start); }, 1000);
  const stopBtn = $('#stopRead'); if (stopBtn) stopBtn.addEventListener('click', () => { rd.stop = Date.now(); keepScroll(() => renderPassage(id)); });
  $('#jaT').addEventListener('change', e => { rd.showJa = e.target.checked; keepScroll(() => renderPassage(id)); });
  $$('.p-qs .opt').forEach(b => b.addEventListener('click', ev => {
    if (ev.target.closest('.w') && canHover) { /* ホバー中の単語クリックでも回答にする */ }
    const k = +b.dataset.q, i = +b.dataset.i;
    if (rd.ans[k] !== undefined) return;
    if (!rd.stop) rd.stop = Date.now(); // 最初の回答で読む時間の計測を止める
    rd.ans[k] = i;
    recordAnswer(p.id + '-' + k, i === p.qs[k].a);
    const doneNow = rd.ans.filter(a => a !== undefined).length;
    if (doneNow === p.qs.length) {
      const sc = p.qs.filter((q, kk) => rd.ans[kk] === q.a).length;
      Store.d.read[p.id] = { score: sc, total: p.qs.length, wpm: calcWpm(wc, rd.stop - rd.start), t: Date.now() };
      Store.save();
    }
    keepScroll(() => renderPassage(id));
  }));
}
// 本文を通読したとは考えにくい速さ（600語/分超）や短すぎる計測（20秒未満）は記録しない
function calcWpm(words, ms) { if (ms < 20000) return 0; const w = Math.round(words / (ms / 60000)); return w > 600 ? 0 : w; }
function keepScroll(fn) { const y = window.scrollY; fn(); window.scrollTo(0, y); }
function fmtTime(ms) { const s = Math.floor(ms / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
function wpmNote(w, lv) {
  const target = lv === 'A' ? 130 : 110;
  const base = `当サイトの目安は ${LV[lv].short} で ${target}語/分 前後です（試験の公式基準ではありません）。`;
  if (w >= target * 1.6) return base + 'かなり速く読めています。設問の正答率も合わせて確認してください。';
  if (w >= target) return base + '目安を超えています。この速さを保ちながら精度を上げていきましょう。';
  if (w >= target * 0.7) return base + 'あと少しです。わからない単語で止まらず、段落の要点を先につかむ読み方を試してみてください。';
  return base + 'まずは正確に読めていれば十分です。同じ本文を翌日にもう一度読むと、速さが目に見えて上がります。';
}

/* ---------------- 紛らわしい語 ---------------- */
let drill = null;
routes.confuse = (arg) => {
  if (arg === 'drill') return renderDrill();
  view().innerHTML = `
  <section class="page-head"><h1>紛らわしい語</h1><p>一文字違い・似た音・似た意味で取り違えやすい組です。<mark class="demo-mark">色がついた文字</mark>が違う部分。語をタップすると意味と発音が出ます。</p>
    <a class="btn btn-grape" href="#confuse/drill">ドリルを始める（15問）→</a></section>
  <div class="cgrid">${CONF.map(g => {
    const d = diffGroup(g.g);
    return `<div class="cg card">
      ${g.g.map((w, i) => `<div class="cg-row"><span class="w cg-w" data-k="${esc(w.toLowerCase())}">${d[i]}</span><button class="ib sm" data-play="${esc(w.toLowerCase())}" title="発音">🔊</button><span class="cg-m">${esc(g.m[i])}</span></div>`).join('')}
      <p class="cg-tip">${esc(g.tip)}</p>
    </div>`;
  }).join('')}</div>`;
};
function renderDrill() {
  if (!drill || drill.fin) {
    const items = [];
    CONF.forEach((g, gi) => (g.q || []).forEach((q, qi) => items.push({ gi, qi, s: q.s, a: q.a, ja: q.ja })));
    drill = { list: shuffle(items).slice(0, 15), i: 0, c: 0, fin: false };
  }
  const it = drill.list[drill.i];
  if (!it) { drill.fin = true; return routes.confuse(); }
  const g = CONF[it.gi];
  view().innerHTML = `
  <section class="qwrap">
    <div class="qtop"><div class="prog grape"><span style="width:${drill.i / drill.list.length * 100}%"></span></div>
      <div class="qmeta"><span class="qnum">${drill.i + 1} / ${drill.list.length}</span> <span class="pill pill-grape">紛らわしい語</span></div></div>
    <div class="qcard card">
      <p class="qtext">${renderText(it.s, { blank: '<span class="blank" id="blank">&emsp;&emsp;&emsp;</span>' })}</p>
      <div class="opts">${shuffle(g.g.map((w, i) => ({ w, i }))).map(({ w, i }, k) => `<button class="opt" data-i="${i}"><span class="opt-k">${k + 1}</span><span class="opt-t">${esc(w)}</span></button>`).join('')}</div>
      <div id="fb"></div>
    </div>
  </section>`;
  $$('.opt').forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.i, ok = i === it.a;
    if ($('#fb').innerHTML) return;
    if (ok) drill.c++;
    recordAnswer('cf-' + it.gi + '-' + it.qi, ok);
    $$('.opt').forEach(x => { x.disabled = true; const k = +x.dataset.i; if (k === it.a) x.classList.add('ok'); else if (k === i) x.classList.add('ng'); });
    $('#blank').outerHTML = `<span class="blank filled ${ok ? 'ok' : 'ng'}">${esc(g.g[it.a])}</span>`;
    if (!ok) addWord(g.g[it.a].toLowerCase(), it.s.replace('___', g.g[it.a]));
    const d = diffGroup(g.g);
    const full = it.s.replace('___', g.g[it.a]);
    $('#fb').innerHTML = `<div class="fb ${ok ? 'fb-ok' : 'fb-ng'}"><b>${ok ? '◎ ' + pickOne(CHEER_OK) : '△ ' + pickOne(CHEER_NG)}</b></div>
      <div class="exp"><div class="exp-en">${renderText(full)} <button class="ib sm" data-say="${esc(full)}">🔊<small>文</small></button></div>
      ${it.ja ? `<p class="exp-ja">${esc(it.ja)}</p>` : ''}
      <div class="alert alert-grape"><b>見分けるコツ</b><div class="cmp">${g.g.map((w, k) => `<span class="cmp-w">${d[k]}</span><span class="cmp-m">${esc(g.m[k])}</span>`).join('')}</div><small>${esc(g.tip)}</small></div></div>
      <button class="btn btn-grape btn-wide" id="next">${drill.i + 1 < drill.list.length ? '次へ →' : '結果を見る →'}</button>`;
    $('#next').addEventListener('click', () => {
      drill.i++;
      if (drill.i >= drill.list.length) {
        const c = drill.c, n = drill.list.length; drill.fin = true;
        view().innerHTML = `<section class="result card"><p class="eyebrow">Drill result</p><div class="ring grape" style="--p:${Math.round(c / n * 100)}"><span>${c}<small>/${n}</small></span></div>
          <p class="result-msg">${c === n ? '完璧です！取り違えやすい語を確実に見分けられています。' : '取り違えた語は単語帳に入れました。色つきの文字を意識して、もう一度見てみましょう。'}</p>
          <div class="cta center"><a class="btn btn-grape" href="#confuse/drill" id="again">もう一度</a><a class="btn btn-sky" href="#confuse">一覧へ</a></div></section>`;
        $('#again').addEventListener('click', ev => { ev.preventDefault(); drill = null; renderDrill(); });
      } else renderDrill();
    });
    $('#next').focus({ preventScroll: true });
  }));
}

/* ---------------- 単語帳 ---------------- */
let rv = null;
routes.words = (arg) => {
  if (arg === 'review') return renderReview();
  const ws = Object.entries(Store.d.words).sort((a, b) => a[1].due - b[1].due);
  const due = dueWords().length;
  view().innerHTML = `
  <section class="page-head"><h1>単語帳</h1><p>☆を押した語と、間違えた問題の正解の語がここに入ります。思い出せた語ほど次の復習までの間隔が伸び（1→3→7→16→35日）、忘れた語はすぐに出し直します。</p>
    ${due ? `<a class="btn btn-sun" href="#words/review">今日の復習をはじめる（${due}語）→</a>` : ws.length ? '<p class="fb fb-ok"><b>今日の復習は完了しています。お疲れさまでした！</b></p>' : ''}
  </section>
  ${ws.length ? `<div class="wlist">${ws.map(([k, v]) => { const e = DICT[k] || { w: k, ja: '' }; return `<div class="wrow card">
    <span class="w" data-k="${esc(k)}">${esc(e.w)}</span>
    <button class="ib sm" data-play="${esc(k)}">🔊</button>
    <span class="wrow-ja">${esc(e.ja)}</span>
    <span class="wrow-box" title="復習段階">${'●'.repeat(v.box)}${'○'.repeat(5 - v.box)}</span>
    <span class="muted small">${v.due <= Date.now() ? '今日' : Math.ceil((v.due - Date.now()) / dayMs) + '日後'}</span>
    <button class="ib sm on" data-save="${esc(k)}" title="単語帳から外す">★</button></div>`; }).join('')}</div>`
    : '<div class="empty card"><p>まだ単語が入っていません。</p><p class="muted">問題文や長文の単語にカーソルを合わせ、☆を押すと入ります。</p></div>'}`;
};
function renderReview() {
  if (!rv || !rv.list.length || rv.done) rv = { list: shuffle(dueWords()), i: 0, flip: false, done: false, stats: [0, 0, 0] };
  const k = rv.list[rv.i];
  if (!k) { rv.done = true; return routes.words(); }
  const e = DICT[k] || { w: k, ja: '', ipa: '' };
  const v = Store.d.words[k] || {};
  view().innerHTML = `
  <section class="qwrap">
    <div class="qtop"><div class="prog"><span style="width:${rv.i / rv.list.length * 100}%"></span></div><div class="qmeta"><span class="qnum">${rv.i + 1} / ${rv.list.length}</span></div></div>
    <div class="flash card ${rv.flip ? 'flip' : ''}">
      <div class="flash-w">${esc(e.w)} <button class="ib" data-play="${esc(k)}">🔊</button></div>
      ${v.ctx ? `<p class="flash-ctx">${renderText(v.ctx)}</p>` : ''}
      ${rv.flip ? `<div class="flash-back"><div data-ipa="${esc(k)}">${e.ipa ? '<span class="ipa">/' + esc(e.ipa) + '/</span>' : ''}</div><p class="flash-ja">${esc(e.ja)}</p>${TRAPS[k] ? `<div class="alert alert-coral"><b>カタカナ発音の罠</b>${esc(TRAPS[k])}</div>` : ''}</div>
        <div class="grade"><button class="btn btn-coral" data-g="0">忘れた</button><button class="btn btn-sun" data-g="1">あやしい</button><button class="btn btn-leaf" data-g="2">覚えた</button></div>`
      : '<p class="muted">意味を思い浮かべてから、めくってください。</p><button class="btn btn-sky btn-wide" id="flip">めくる</button>'}
    </div>
  </section>`;
  const f = $('#flip'); if (f) f.addEventListener('click', () => { rv.flip = true; renderReview(); });
  $$('[data-g]').forEach(b => b.addEventListener('click', () => {
    const g = +b.dataset.g, w = Store.d.words[k];
    if (w) {
      if (g === 0) w.box = 0; else if (g === 2) w.box = Math.min(5, w.box + 1);
      w.due = Date.now() + (g === 0 ? 10 * 60000 : BOX_DAYS[Math.max(1, w.box)] * dayMs * (g === 1 ? 0.5 : 1));
      Store.save();
    }
    rv.i++; rv.flip = false; renderReview();
  }));
}

/* ---------------- 学習記録 ---------------- */
routes.stats = () => {
  const cz = E.CLOZE || [];
  const agg = (items) => { let n = 0, c = 0; items.forEach(id => { const r = Store.d.q[id]; if (r) { n += r.n; c += r.c; } }); return { n, c, p: n ? Math.round(c / n * 100) : null }; };
  const byCat = Object.keys(CATS).map(k => ({ l: CATS[k], ...agg(cz.filter(q => q.cat === k).map(q => q.id)) }));
  const byLv = ['B', 'A'].map(lv => ({ l: LV[lv].short + ' ' + LV[lv].ja, ...agg(cz.filter(q => q.lv === lv).map(q => q.id).concat((E.PASSAGES || []).filter(p => p.lv === lv).flatMap(p => p.qs.map((_, k) => p.id + '-' + k)))) }));
  const byTp = Object.keys(TOPICS).map(tp => ({ l: TOPICS[tp].ja, ...agg(cz.filter(q => q.tp === tp).map(q => q.id).concat((E.PASSAGES || []).filter(p => p.tp === tp).flatMap(p => p.qs.map((_, k) => p.id + '-' + k)))) }));
  const bars = rows => rows.map(r => `<div class="bar-row"><span class="bar-l">${esc(r.l)}</span><span class="bar"><span style="width:${r.p || 0}%"></span></span><span class="bar-v">${r.p === null ? '—' : r.p + '%'}<small>${r.n ? ' (' + r.c + '/' + r.n + ')' : ''}</small></span></div>`).join('');
  const days = []; const d = new Date(); d.setDate(d.getDate() - 27);
  for (let i = 0; i < 28; i++) { const k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); days.push({ k, n: Store.d.days[k] || 0, m: d.getMonth() + 1, dd: d.getDate() }); d.setDate(d.getDate() + 1); }
  const reads = Object.entries(Store.d.read);
  view().innerHTML = `
  <section class="page-head"><h1>学習記録</h1><p>記録はこのブラウザの中だけに保存されています。別の端末とは共有されません。</p></section>
  <div class="card st-card"><h2 class="sec-title sm">直近4週間 <small class="muted">${streak()}日連続</small></h2>
    <div class="heat">${days.map(x => `<span class="hc h${x.n === 0 ? 0 : x.n < 5 ? 1 : x.n < 15 ? 2 : 3}" title="${x.m}/${x.dd}：${x.n}問"></span>`).join('')}</div></div>
  <div class="card st-card"><h2 class="sec-title sm">分野別の正答率（穴埋め）</h2>${bars(byCat)}</div>
  <div class="card st-card"><h2 class="sec-title sm">レベル別</h2>${bars(byLv)}</div>
  <div class="card st-card"><h2 class="sec-title sm">題材別</h2>${bars(byTp)}</div>
  <div class="card st-card"><h2 class="sec-title sm">長文の記録</h2>${reads.length ? `<table class="rtable"><tbody>${reads.map(([id, r]) => { const p = (E.PASSAGES || []).find(x => x.id === id); return p ? `<tr><td><a href="#reading/${id}">${esc(p.title)}</a></td><td>${r.score}/${r.total}</td><td>${r.wpm ? r.wpm + '語/分' : ''}</td></tr>` : ''; }).join('')}</tbody></table>` : '<p class="muted">まだありません。</p>'}</div>
  <p class="center"><button class="btn btn-line btn-sm" id="reset">学習記録をすべて消す</button></p>`;
  $('#reset').addEventListener('click', () => {
    if (!confirm('学習記録・単語帳をすべて消去します。元に戻せません。よろしいですか？')) return;
    const s = Store.d.set; localStorage.removeItem(KEY); Store.load(); Store.d.set = s; Store.save(); routes.stats(); toast('学習記録を消去しました');
  });
};

/* ---------------- 設定 ---------------- */
function initSettings() {
  const dlg = $('#settings');
  $('#openSet').addEventListener('click', () => { syncSettings(); dlg.showModal ? dlg.showModal() : dlg.setAttribute('open', ''); renderVoiceInfo(); });
  $('#closeSet').addEventListener('click', () => dlg.close ? dlg.close() : dlg.removeAttribute('open'));
  dlg.addEventListener('change', ev => {
    const t = ev.target;
    if (t.name === 'accent') Store.d.set.accent = t.value;
    if (t.name === 'rate') Store.d.set.rate = +t.value;
    if (t.name === 'hover') Store.d.set.hover = t.checked;
    Store.save(); renderVoiceInfo();
  });
  $('#testVoice').addEventListener('click', () => Speech.speak('The committee will confirm whether the design conforms to the new standard.'));
}
function syncSettings() {
  const s = Store.d.set;
  $$('#settings [name=accent]').forEach(r => r.checked = r.value === s.accent);
  $$('#settings [name=rate]').forEach(r => r.checked = +r.value === s.rate);
  $('#settings [name=hover]').checked = s.hover;
}

/* ---------------- 起動 ---------------- */
Speech.init();
initSettings();
route();

// 開発用：辞書の収録状況を確認する（コンソールで EIGO_DEBUG.missing() ）
window.EIGO_DEBUG = {
  lookup, DICT,
  missing() {
    const texts = [];
    (E.CLOZE || []).forEach(q => { texts.push(q.q); q.o.forEach(o => texts.push(o)); });
    (E.PASSAGES || []).forEach(p => { texts.push(p.title); p.body.forEach(b => texts.push(b)); p.qs.forEach(q => { texts.push(q.q); q.o.forEach(o => texts.push(o)); }); });
    CONF.forEach(g => (g.q || []).forEach(q => texts.push(q.s)));
    const miss = {};
    texts.forEach(t => (t.match(TOKEN_RE) || []).forEach(w => { if (w !== '___' && !lookup(w)) miss[w.toLowerCase()] = (miss[w.toLowerCase()] || 0) + 1; }));
    return miss;
  }
};
})();
