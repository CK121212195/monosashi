/* 英語のものさし：データの点検
   使い方: node eigo/tools/check_data.js
   1) 本文・設問・例文に出る単語が、すべて辞書で引けるか（app.js と同じ原形推定で判定）
   2) 画面で🔊を押せる文・単語に、音声ファイルがあるか
   3) 選択肢の数と正解番号が正しいか
   どれかが0件でなければ、直してから公開してください。 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const ctx = { window: {} }; ctx.EIGO = ctx.window.EIGO = {}; vm.createContext(ctx);
for (const f of fs.readdirSync(path.join(ROOT, 'data')).sort()) vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', f), 'utf8'), ctx);
const audioIdx = path.join(ROOT, 'audio', 'index.js');
if (fs.existsSync(audioIdx)) vm.runInContext(fs.readFileSync(audioIdx, 'utf8'), ctx);
const E = ctx.window.EIGO;

// 辞書（app.js と同じ組み立て）
const DICT = {};
E.DICT_PARTS.join('\n').split('\n').forEach(line => { line = line.trim(); if (!line || line[0] === '#') return; const w = line.split('|')[0].trim(); if (!w) return; const key = w[0] === '=' ? w.slice(1) : w.toLowerCase(); if (!DICT[key]) DICT[key] = line.split('|')[1]; });
const IRREG = E.IRREG;
const src = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
eval(src.match(/function candidates\(w\) \{[\s\S]*?\n\}/)[0].replace('function candidates', 'global.candidates = function'));
const lookup = raw => { if (raw === raw.toUpperCase() && DICT[raw]) return raw; const w = raw.toLowerCase(); return candidates(w).find(k => DICT[k] && !k.includes(' ')) || null; };

const texts = [], sentences = [];
E.CLOZE.forEach(q => { texts.push(q.q, ...q.o); sentences.push(q.q.replace('___', q.o[q.a])); });
E.PASSAGES.forEach(p => { texts.push(p.title, ...p.body); p.qs.forEach(q => texts.push(q.q, ...q.o)); sentences.push(...p.body); });
E.CONFUSE.forEach(g => (g.q || []).forEach(q => { texts.push(q.s); sentences.push(q.s.replace('___', g.g[q.a])); }));
(E.GRAMMAR || []).forEach(u => { u.sec.forEach(s => s.ex.forEach(e => { texts.push(e[0]); sentences.push(e[0]); })); u.qs.forEach(q => { texts.push(q.q, ...q.o); sentences.push(q.q.replace('___', q.o[q.a])); }); });

const miss = new Set();
texts.forEach(t => (t.match(/[A-Za-z]+(?:['’][A-Za-z]+)*/g) || []).forEach(w => { if (!lookup(w.replace(/’/g, "'"))) miss.add(w.toLowerCase()); }));
const skip = new Set(['s', 'p', 'd', 'ed', 'th', 'm', 'r']);
[...miss].forEach(w => skip.has(w) && miss.delete(w));
console.log('1) 辞書にない語:', miss.size, miss.size ? [...miss].slice(0, 40).join(' ') : '');

if (E.AUDIO) {
  const norm = t => String(t).replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
  const hash = t => { let h = 0x811c9dc5; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); };
  const S = new Set(E.AUDIO['s/us'].split(',')), W = new Set(E.AUDIO['w/us'].split(','));
  const sm = sentences.filter(t => !S.has(hash(norm(t))));
  const wm = Object.keys(DICT).filter(k => !skip.has(k) && !['S', 'P'].includes(k) && !W.has(hash(norm(k))));
  console.log('2) 音声のない文:', sm.length, sm.slice(0, 3));
  console.log('   音声のない単語:', wm.length, wm.slice(0, 20).join(' '));
} else console.log('2) audio/index.js がありません');

const bad = [];
E.CLOZE.forEach(q => { if (q.o.length !== 4 || !(q.a >= 0 && q.a < 4)) bad.push(q.id); });
(E.GRAMMAR || []).forEach(u => u.qs.forEach((q, k) => { if (q.o.length !== 4 || !(q.a >= 0 && q.a < 4)) bad.push(u.id + '-' + k); }));
E.PASSAGES.forEach(p => p.qs.forEach((q, k) => { if (!(q.a >= 0 && q.a < q.o.length)) bad.push(p.id + '-' + k); if (q.ev && !p.body[q.ev[0]].includes(q.ev[1])) bad.push(p.id + '-' + k + '（根拠の文字列が本文にない）'); }));
console.log('3) 形の崩れた問題:', bad.length, bad.join(', '));
