/* 英語のものさし：検索エンジン向けの静的ページを生成する
   使い方: node eigo/tools/build_seo.js
   - /eigo/bunpou/…      文法解説（単元ごと）
   - /eigo/chobun/…      長文（全訳・設問つき）
   - /eigo/magirawashii/… 紛らわしい語（組ごと）
   - sitemap.xml の <!-- eigo:start --> 〜 <!-- eigo:end --> を書き換える
   データを直したら、このスクリプトを再実行してください。 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');

const ROOT = path.resolve(__dirname, '..');          // eigo/
const SITE = path.resolve(ROOT, '..');                // リポジトリ直下
const ORIGIN = 'https://kazumono.com';
const TODAY = new Date().toISOString().slice(0, 10);

// ---- データ読み込み ----
const ctx = { window: {} }; ctx.EIGO = ctx.window.EIGO = {}; vm.createContext(ctx);
for (const f of fs.readdirSync(path.join(ROOT, 'data')).sort()) vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', f), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'audio', 'index.js'), 'utf8'), ctx);
const E = ctx.window.EIGO;

// ---- 共通関数 ----
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
const plain = t => String(t).replace(/\*\*/g, '').replace(/\n/g, ' ');
const norm = t => String(t).replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
const hash = t => { let h = 0x811c9dc5; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); };
const AUD = { s: new Set(E.AUDIO['s/us'].split(',')), w: new Set(E.AUDIO['w/us'].split(',')) };
// 音声ボタン（ファイルがあるときだけ出す）
function sayBtn(text, kind = 's') {
  const h = hash(norm(kind === 'w' ? text.toLowerCase() : text));
  if (!AUD[kind].has(h)) return '';
  return `<button class="ib sm" type="button" data-src="/eigo/audio/${kind}/us/${h}.mp3" aria-label="音声を聞く">🔊</button>`;
}
const TOPIC = { stocks: '株式・市場', crypto: '暗号資産', rates: '金利・金融政策', ai: 'AI・テクノロジー', art: 'アート', film: '映画', society: '社会・ビジネス' };
const LVJ = { B: '英検2級〜準1級レベル（TOEIC 600〜750相当）', A: '英検1級レベル（TOEIC 751〜990相当）' };
// 選択肢の並びをページごとに固定の順で入れ替える（データ上の正解は常に先頭のため）
function seeded(seed, n) { let h = parseInt(hash(seed), 16) || 1; const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; const j = h % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const clip = (s, n) => { s = plain(s); return s.length > n ? s.slice(0, n - 1) + '…' : s; };

function write(rel, html) {
  const file = path.join(ROOT, rel, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function page({ rel, title, desc, h1, crumbs, body, ld }) {
  const url = `${ORIGIN}/eigo/${rel}/`;
  const bc = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c[0], item: ORIGIN + c[1] })) };
  return `<!DOCTYPE html>
<html lang="ja">
<head>
<script>if(location.protocol==='http:'&&location.hostname==='kazumono.com'){location.replace('https://'+location.host+location.pathname+location.search+location.hash);}</script>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2146116373822311" crossorigin="anonymous"></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-BETYS4R53Y"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-BETYS4R53Y');</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ORIGIN}/assets/eigo-ogp.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="数字のものさし">
<meta property="og:locale" content="ja_JP">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#FFC83D">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700;900&family=Nunito:wght@600;700;800&family=Literata:opsz,wght@7..72,400;7..72,500;7..72,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/eigo/style.css">
<link rel="stylesheet" href="/eigo/static.css">
<script type="application/ld+json">${JSON.stringify(bc)}</script>
${ld ? `<script type="application/ld+json">${JSON.stringify(ld)}</script>` : ''}
</head>
<body>
<header class="top">
  <div class="top-in">
    <a class="logo" href="/eigo/" aria-label="英語のものさし"><span class="logo-mark" aria-hidden="true">A<span>あ</span></span><span class="logo-t">英語の<b>ものさし</b></span></a>
    <nav class="nav" aria-label="メニュー">
      <a href="/eigo/#cloze">✏️穴埋め</a><a href="/eigo/chobun/">📰長文</a><a href="/eigo/bunpou/">📘文法</a><a href="/eigo/magirawashii/">🔍紛らわしい語</a>
    </nav>
  </div>
</header>
<main class="wrap st">
  <nav class="crumb" aria-label="パンくずリスト">${crumbs.map((c, i) => i < crumbs.length - 1 ? `<a href="${c[1]}">${esc(c[0])}</a>` : `<span>${esc(c[0])}</span>`).join(' › ')}</nav>
  <h1 class="st-h1">${h1}</h1>
${body}
</main>
<footer class="foot"><div class="foot-in">
  <p>英語のものさし は <a href="/">数字のものさし</a> の無料の英語学習ツールです。問題・本文・解説はすべてオリジナルで、英検・TOEICの公式問題ではありません。「英検」は公益財団法人 日本英語検定協会の、「TOEIC」は ETS の登録商標です。音声は Kokoro-82M（Apache License 2.0）で生成しています。</p>
  <nav class="foot-links"><a href="/eigo/">英語のものさし</a><a href="/eigo/bunpou/">文法解説</a><a href="/eigo/chobun/">長文</a><a href="/eigo/magirawashii/">紛らわしい語</a><a href="/">数字のものさし</a><a href="/privacy/">プライバシーポリシー</a></nav>
</div></footer>
<script src="/eigo/static.js" defer></script>
</body>
</html>
`;
}
const cta = (href, label, sub) => `<div class="st-cta card"><div><b>${esc(label)}</b><p>${esc(sub)}</p></div><a class="btn btn-sun" href="${href}">アプリで解く →</a></div>`;
const provider = { '@type': 'Organization', name: '数字のものさし', url: ORIGIN + '/' };

const urls = [];

// ================= 文法 =================
const G = E.GRAMMAR;
G.forEach((u, idx) => {
  const rel = `bunpou/${u.id}`;
  const prev = G[idx - 1], next = G[idx + 1];
  const secs = u.sec.map(s => `<section class="gsec card"><h2>${esc(s.h)}</h2><p class="gtext">${fmt(s.t)}</p>
  ${s.ex.length ? `<ul class="gex">${s.ex.map(([en, ja, note]) => `<li><div class="gex-en">${sayBtn(en)} <span lang="en">${esc(en)}</span></div><div class="gex-ja">${esc(ja)}${note ? `<span class="gex-note">${esc(note)}</span>` : ''}</div></li>`).join('')}</ul>` : ''}</section>`).join('\n');
  const qs = u.qs.map((q, k) => `<div class="card st-q"><p class="rq-q"><span class="rq-n evi1">Q${k + 1}</span> <span lang="en">${esc(q.q).replace('___', '<span class="blank">&emsp;&emsp;</span>')}</span></p>
    ${(() => { const ord = seeded(u.id + k, q.o.length); return `<ol class="st-opts">${ord.map(i => `<li lang="en">${esc(q.o[i])}</li>`).join('')}</ol>
    <details><summary>正解と解説を見る</summary><p><b>正解：${ord.indexOf(q.a) + 1}. ${esc(q.o[q.a])}</b></p><p class="exp-ja">${esc(q.ja)}</p><p>${esc(q.ex)}</p></details>`; })()}</div>`).join('\n');
  const body = `
  <p class="st-meta"><span class="pill pill-teal">${esc(u.cat)}</span> ${u.lv === 'UNI' ? '<span class="pill pill-coral">大学・TOEIC上級</span>' : '<span class="pill pill-leaf">高校文法</span>'}</p>
  <p class="glead">${esc(u.lead)}</p>
  ${cta(`/eigo/#grammar/${u.id}`, 'この単元をアプリで学ぶ', '例文の単語にカーソルを合わせると意味と発音が出ます。演習は自動採点・記録つき。')}
  ${secs}
  <section class="gsec card gtrap"><h2>⚠️ 間違えやすいポイント</h2><ul>${u.trap.map(t => `<li>${fmt(t)}</li>`).join('')}</ul></section>
  <section class="gsec card gtoeic"><h2>🎯 TOEIC・英検での出方</h2><p>${fmt(u.toeic)}</p></section>
  <h2 class="sec-title">演習問題（${u.qs.length}問）</h2>
  ${qs}
  ${cta(`/eigo/#grammar/${u.id}`, '演習をアプリで解く', '選択肢はシャッフルされ、正解・不正解が記録されます。間違えた問題だけの復習もできます。')}
  <nav class="gnav">${prev ? `<a class="btn btn-line btn-sm" href="/eigo/bunpou/${prev.id}/">← ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="btn btn-sky btn-sm" href="/eigo/bunpou/${next.id}/">${esc(next.title)} →</a>` : ''}</nav>
  <section class="st-more"><h2 class="sec-title sm">文法解説の一覧</h2><ul class="st-links">${G.map(x => `<li><a href="/eigo/bunpou/${x.id}/">${esc(x.title)}</a></li>`).join('')}</ul></section>`;
  const title = `${u.title}の使い方と例文｜英文法解説・演習${u.qs.length}問｜英語のものさし`;
  const desc = clip(`${u.title}をわかりやすく解説。${u.lead} 音声つき例文、間違えやすいポイント、TOEIC・英検での出方、解説つき演習${u.qs.length}問。`, 150);
  const ld = { '@context': 'https://schema.org', '@type': 'LearningResource', name: `${u.title}（英文法）`, description: desc, inLanguage: ['ja', 'en'], learningResourceType: ['解説', '練習問題'], educationalLevel: u.lv === 'UNI' ? '大学・TOEIC上級' : '高校', isAccessibleForFree: true, teaches: u.sec.map(s => s.h), url: `${ORIGIN}/eigo/${rel}/`, provider, dateModified: TODAY };
  write(rel, page({ rel, title, desc, h1: esc(u.title), crumbs: [['英語のものさし', '/eigo/'], ['文法解説', '/eigo/bunpou/'], [u.title, `/eigo/${rel}/`]], body, ld }));
  urls.push([`/eigo/${rel}/`, 0.7]);
});
{
  const cats = [...new Set(G.map(u => u.cat))];
  const body = `<p class="glead">高校で学ぶ英文法の全範囲（5文型・時制・助動詞・受動態・不定詞・動名詞・分詞・分詞構文・関係詞・接続詞・前置詞・冠詞・比較・仮定法・否定・倒置・話法）と、大学・TOEIC上級で問われる品詞の見分け方・動詞の語法・ビジネス文書の定型表現を、${G.length}単元・演習${G.reduce((s, u) => s + u.qs.length, 0)}問にまとめました。すべて無料です。</p>
  ${cta('/eigo/#grammar', '文法をアプリで学ぶ', 'ランダム演習、間違えた問題の復習、単元ごとの正答記録つき。')}
  ${cats.map(c => `<h2 class="sec-title sm gcat">${esc(c)}</h2><div class="glist">${G.filter(u => u.cat === c).map(u => `<a class="gcard card" href="/eigo/bunpou/${u.id}/"><span class="gno">${u.id.slice(1)}</span><span class="gt">${esc(u.title)}</span><span class="gm">${u.lv === 'UNI' ? '<span class="pill pill-coral">大学・TOEIC上級</span>' : '<span class="pill pill-leaf">高校</span>'}</span></a>`).join('')}</div>`).join('')}`;
  const title = '英文法解説 全32単元｜仮定法・不定詞・分詞構文・冠詞まで高校文法を網羅｜英語のものさし';
  const desc = '高校英文法の全範囲と、TOEIC Part 5・英検で問われる語法を32単元で解説。音声つき例文、間違えやすいポイント、解説つき演習160問。無料・登録不要。';
  write('bunpou', page({ rel: 'bunpou', title, desc, h1: '英文法解説（全32単元）', crumbs: [['英語のものさし', '/eigo/'], ['文法解説', '/eigo/bunpou/']], body, ld: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: '英文法解説', description: desc, url: ORIGIN + '/eigo/bunpou/', provider } }));
  urls.push(['/eigo/bunpou/', 0.8]);
}

// ================= 長文 =================
const P = E.PASSAGES;
const wc = p => p.body.join(' ').split(/\s+/).filter(Boolean).length;
P.forEach(p => {
  const rel = `chobun/${p.id}`;
  const paras = p.body.map((b, i) => `<div class="para">${sayBtn(b) ? sayBtn(b).replace('class="ib sm"', 'class="ib sm para-say"') : ''}<p lang="en">${esc(b)}</p></div>`).join('');
  const qs = p.qs.map((q, k) => `<div class="card st-q"><p class="rq-q"><span class="rq-n evi1">Q${k + 1}</span> <span lang="en">${esc(q.q)}</span></p>
    <ol class="st-opts">${q.o.map(o => `<li lang="en">${esc(o)}</li>`).join('')}</ol>
    <details><summary>正解と解説を見る</summary><p><b>正解：${q.a + 1}. ${esc(q.o[q.a])}</b></p>${q.qj ? `<p class="exp-ja">設問訳：${esc(q.qj)}</p>` : ''}<p>${esc(q.ex)}</p>${q.ev ? `<p class="small muted">根拠：第${q.ev[0] + 1}段落「<span lang="en">${esc(q.ev[1])}</span>」</p>` : ''}</details></div>`).join('\n');
  const tr = p.ja.map((j, i) => `<p><b>第${i + 1}段落</b>　${esc(j)}</p>`).join('');
  const others = P.filter(x => x.id !== p.id);
  const body = `
  <p class="st-meta"><span class="pill">${esc(TOPIC[p.tp] || p.tp)}</span> <span class="pill ${p.lv === 'A' ? 'pill-lvA' : 'pill-lvB'}">${esc(LVJ[p.lv])}</span> <span class="muted small">${wc(p)}語・設問${p.qs.length}問</span></p>
  <p class="glead">${esc(p.jt)}</p>
  ${cta(`/eigo/#reading/${p.id}`, '時間を計って読む', 'アプリ版では単語にカーソルを合わせるだけで意味と発音が出ます。読む速さ（語/分）と根拠の一文のハイライトつき。')}
  <div class="p-body st-body">${paras}</div>
  <h2 class="sec-title">設問（${p.qs.length}問）</h2>
  ${qs}
  <details class="card st-tr"><summary>全訳を見る</summary>${tr}</details>
  <p class="small muted">※ 本文は学習用に書き下ろしたものです。登場する企業・人物・数値の一部は架空です。投資判断の参考にはしないでください。</p>
  <section class="st-more"><h2 class="sec-title sm">ほかの長文</h2><ul class="st-links">${others.map(x => `<li><a href="/eigo/chobun/${x.id}/" lang="en">${esc(x.title)}</a> <span class="muted small">${esc(TOPIC[x.tp])}</span></li>`).join('')}</ul></section>`;
  const title = `【英語長文・全訳つき】${p.title}（${TOPIC[p.tp]}）｜${p.lv === 'A' ? '英検1級' : '英検準1級'}レベル｜英語のものさし`;
  const desc = clip(`${p.jt}。${TOPIC[p.tp]}を題材にした${wc(p)}語の英語長文と設問${p.qs.length}問。${p.lv === 'A' ? '英検1級・TOEIC上級' : '英検2級〜準1級・TOEIC 600〜750'}レベル、全訳・解説・音声つき。`, 150);
  const ld = { '@context': 'https://schema.org', '@type': 'LearningResource', name: p.title, alternateName: p.jt, description: desc, inLanguage: ['en', 'ja'], learningResourceType: ['読解問題'], educationalLevel: LVJ[p.lv], isAccessibleForFree: true, about: TOPIC[p.tp], url: `${ORIGIN}/eigo/${rel}/`, provider, dateModified: TODAY };
  write(rel, page({ rel, title, desc, h1: `<span lang="en">${esc(p.title)}</span>`, crumbs: [['英語のものさし', '/eigo/'], ['長文', '/eigo/chobun/'], [p.title, `/eigo/${rel}/`]], body, ld }));
  urls.push([`/eigo/${rel}/`, 0.7]);
});
{
  const body = `<p class="glead">株式・暗号資産・金利政策・AI・アート・映画など、いまの社会とつながる題材の英語長文${P.length}本。英検2級〜1級、TOEIC 600点以上をめざす人向けに書き下ろしました。全訳・設問の解説・音声つきで、無料で読めます。</p>
  ${cta('/eigo/#reading', 'アプリで読む', '単語のホバー辞書、読む速さの計測、根拠の一文のハイライトつき。')}
  <div class="plist">${P.map(p => `<a class="pcard card" href="/eigo/chobun/${p.id}/"><div class="pcard-top"><span class="pill">${esc(TOPIC[p.tp])}</span> <span class="pill ${p.lv === 'A' ? 'pill-lvA' : 'pill-lvB'}">${p.lv === 'A' ? 'Lv.A 英検1級' : 'Lv.B 英検2級〜準1級'}</span></div><h2 lang="en">${esc(p.title)}</h2><p class="pcard-ja">${esc(p.jt)}</p><div class="pcard-meta"><span>${wc(p)}語</span><span>設問${p.qs.length}</span></div></a>`).join('')}</div>`;
  const title = '英語長文 全20本（全訳・解説・音声つき）｜投資・AI・映画・アート｜英検準1級〜1級｜英語のものさし';
  const desc = '株式・暗号資産・金利・AI・アート・映画を題材にした英語長文20本。英検2級〜1級・TOEIC 600点以上向け。全訳、設問の解説、音声つきで無料。';
  write('chobun', page({ rel: 'chobun', title, desc, h1: '英語長文（全20本・全訳つき）', crumbs: [['英語のものさし', '/eigo/'], ['長文', '/eigo/chobun/']], body, ld: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: '英語長文', description: desc, url: ORIGIN + '/eigo/chobun/', provider } }));
  urls.push(['/eigo/chobun/', 0.8]);
}

// ================= 紛らわしい語 =================
const C = E.CONFUSE;
const slug = g => g.g.join('-').toLowerCase();
const diffPair = (a, b) => {
  const n = a.length, m = b.length, dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const A = new Array(n).fill(true), B = new Array(m).fill(true); let i = 0, j = 0;
  while (i < n && j < m) { if (a[i] === b[j]) { A[i] = B[j] = false; i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++; }
  const r = (s, mk) => [...s].map((c, k) => mk[k] ? `<mark>${esc(c)}</mark>` : esc(c)).join('');
  return [r(a, A), r(b, B)];
};
const diffGroup = w => w.length === 2 ? diffPair(w[0], w[1]) : w.map((x, i) => i === 0 ? diffPair(x, w[1])[0] : diffPair(w[0], x)[1]);
C.forEach((g, gi) => {
  const rel = `magirawashii/${slug(g)}`;
  const d = diffGroup(g.g);
  const words = g.g.join(' と ');
  const ex = (g.q || []).map(q => { const full = q.s.replace('___', g.g[q.a]); return `<li><div class="gex-en">${sayBtn(full)} <span lang="en">${esc(q.s).replace('___', `<b>${esc(g.g[q.a])}</b>`)}</span></div><div class="gex-ja">${esc(q.ja || '')}</div></li>`; }).join('');
  const body = `
  <section class="gsec card"><h2>意味の違い</h2>
    <table class="st-cf"><tbody>${g.g.map((w, i) => `<tr><td class="cg-w" lang="en">${d[i]}</td><td>${sayBtn(w, 'w')}</td><td>${esc(g.m[i])}</td></tr>`).join('')}</tbody></table>
    <p class="small muted">色がついた文字が、つづりの違う部分です。</p></section>
  <section class="gsec card gtoeic"><h2>見分けるコツ</h2><p>${esc(g.tip)}</p></section>
  <section class="gsec card"><h2>例文で確かめる</h2><ul class="gex">${ex}</ul></section>
  ${cta('/eigo/#confuse/drill', '紛らわしい語ドリルで確かめる', `${C.length}組から15問を出題。取り違えた語は自動で単語帳に入ります。`)}
  <section class="st-more"><h2 class="sec-title sm">ほかの紛らわしい語</h2><ul class="st-links">${C.map(x => x === g ? '' : `<li><a href="/eigo/magirawashii/${slug(x)}/" lang="en">${esc(x.g.join(' / '))}</a></li>`).join('')}</ul></section>`;
  const title = `${words}の違い｜意味・発音・見分け方と例文｜英語のものさし`;
  const desc = clip(`${words}の違いを解説。${g.g.map((w, i) => `${w}＝${g.m[i]}`).join('、')}。${g.tip}`, 150);
  const ld = { '@context': 'https://schema.org', '@type': 'LearningResource', name: `${words}の違い`, description: desc, inLanguage: ['ja', 'en'], learningResourceType: ['解説'], isAccessibleForFree: true, teaches: g.g, url: `${ORIGIN}/eigo/${rel}/`, provider, dateModified: TODAY };
  write(rel, page({ rel, title, desc, h1: `<span lang="en">${esc(g.g.join(' / '))}</span> の違い`, crumbs: [['英語のものさし', '/eigo/'], ['紛らわしい語', '/eigo/magirawashii/'], [g.g.join(' / '), `/eigo/${rel}/`]], body, ld }));
  urls.push([`/eigo/${rel}/`, 0.6]);
});
{
  const body = `<p class="glead">conform と confirm、adapt と adopt、affect と effect のように、一文字違い・似た音・似た意味で取り違えやすい英単語${C.length}組。違う文字に色をつけ、意味・発音・見分け方・例文をまとめました。</p>
  ${cta('/eigo/#confuse/drill', 'ドリルで確かめる', '15問ずつ出題。音声つき。')}
  <div class="cgrid">${C.map(g => { const d = diffGroup(g.g); return `<a class="cg card st-cg" href="/eigo/magirawashii/${slug(g)}/">${g.g.map((w, i) => `<div class="cg-row2"><span class="cg-w" lang="en">${d[i]}</span><span class="cg-m">${esc(g.m[i])}</span></div>`).join('')}</a>`; }).join('')}</div>`;
  const title = `紛らわしい英単語${C.length}組の違い｜conform/confirm・affect/effect など｜英語のものさし`;
  const desc = `一文字違い・似た意味で混同しやすい英単語${C.length}組の違いを、色分け・発音・見分け方・例文で解説。英検・TOEIC対策に。無料。`;
  write('magirawashii', page({ rel: 'magirawashii', title, desc, h1: `紛らわしい英単語（${C.length}組）`, crumbs: [['英語のものさし', '/eigo/'], ['紛らわしい語', '/eigo/magirawashii/']], body, ld: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: '紛らわしい英単語', description: desc, url: ORIGIN + '/eigo/magirawashii/', provider } }));
  urls.push(['/eigo/magirawashii/', 0.8]);
}

// ================= サイトマップ =================
{
  const f = path.join(SITE, 'sitemap.xml');
  let s = fs.readFileSync(f, 'utf8');
  const block = `  <!-- eigo:start（eigo/tools/build_seo.js が自動生成） -->\n  <url><loc>${ORIGIN}/eigo/</loc><lastmod>${TODAY}</lastmod><priority>0.9</priority></url>\n` +
    urls.map(([u, pr]) => `  <url><loc>${ORIGIN}${u}</loc><lastmod>${TODAY}</lastmod><priority>${pr}</priority></url>`).join('\n') + '\n  <!-- eigo:end -->';
  if (s.includes('<!-- eigo:start')) s = s.replace(/  <!-- eigo:start[\s\S]*?<!-- eigo:end -->/, block);
  else s = s.replace(/  <url><loc>https:\/\/kazumono\.com\/eigo\/<\/loc>[^\n]*\n/, '').replace('</urlset>', block + '\n\n</urlset>');
  fs.writeFileSync(f, s);
}
console.log('pages:', urls.length);
