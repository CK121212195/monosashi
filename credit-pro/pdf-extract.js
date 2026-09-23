/* ============================================================================
 * pdf-extract.js — 決算書PDFから数値を取り出す
 *
 * pdf.js のテキストレイヤーだけを使う。OCRもサーバー送信も行わない。
 * Python版（検証済み）と同じアルゴリズムを移植したもの。
 *
 * 対応している様式:
 *   ・計算書類（会社計算規則）  … 資産の部／負債の部 の左右2段組み・単年
 *   ・有価証券報告書 / 決算短信 … 前期／当期 の2年並記・単段
 *
 * 気をつけている点:
 *   ・分散配置（「現 金 及 び 預 金」）→ 空白を全除去してから照合する
 *   ・注記番号（※1,※2）→ 科目名から除去する
 *   ・2段組みには「科目が2列」と「年度が2列」の2種類がある。
 *     取り違えると前期の数字を当期として静かに取り込むため、必ず判別する
 *   ・有利子負債は「社債＋長期借入金」のように合算が要る。選択ではなく加算
 * ========================================================================== */

/* ------------------------------------------------------------------ 正規化 */
/** 分散配置・全角・注記番号を吸収して比較可能な形にする */
export function norm(s) {
  return String(s)
    .normalize("NFKC")
    .replace(/[\s\u3000]+/g, "")
    .replace(/[※＊*]\s*[\d,、，]*/g, "")
    .replace(/[（(]注\d*[）)]/g, "")
    // 小計ラベルを囲む隅付き括弧・かぎ括弧を除去する。
    // 例:「【流動資産】」「【売上高】」を辞書の「流動資産」「売上高」と一致させるため。
    // 単位表記（単位：千円）や（連結）は丸括弧なので影響しない。
    .replace(/[【】「」『』〔〕［］]/g, "")
    // IFRSの有価証券報告書は、科目名の直後に注記番号を置く。
    // 例:「営業債権及びその他の債権7、27」「リース負債12、27」
    // 末尾の数字（と区切りの読点）だけを落とす。先頭の数字（1年内返済予定…）は残す。
    .replace(/\d+(?:[、，,]\d+)*$/, "")
    // 「法人税、住民税および事業税」のように接続詞を仮名で書く決算書がある。
    // 辞書は漢字なので一致せず、その科目が丸ごと欠落する。
    // 実例：法人税等が調整額だけになり、当期純利益が積み上がらなくなっていた。
    .replace(/および/g, "及び").replace(/ならびに/g, "並びに")
    .replace(/または/g, "又は").replace(/もしくは/g, "若しくは");
}

const NUM_RE = /^[△▲\-−(（]?[\d,]+[)）]?$/;

/**
 * pdf.js は「△ 63,414」のように、符号と数字のあいだに空白を含んだまま
 * 1つの item として返すことがある（決算公告に多い）。
 * 空白を落とさずに数値判定すると、その金額は数値と認められず科目名の側に流れ、
 * さらに norm() の「末尾の注記番号を落とす」処理に削られて、金額ごと消える。
 * 実例：「法人税等調整額△63,414」が消え、法人税等が合計だけになっていた。
 */
const deSpace = (s) => String(s).normalize("NFKC").replace(/[\s\u3000]+/g, "");

export function toNum(tok) {
  const t0 = deSpace(tok).replace(/,/g, "");
  const neg = /^[△▲\-−(（]/.test(t0);
  const t = t0.replace(/^[△▲\-−(（]/, "").replace(/[)）]$/, "");
  if (!/^\d+$/.test(t)) return null;
  const v = parseInt(t, 10);
  return neg ? -v : v;
}

const isNum = (tok) => NUM_RE.test(deSpace(tok)) && toNum(tok) !== null;

/**
 * 「数字の一部になりうる文字」かどうか。
 * PDFによっては金額を1文字ずつ別のitemで出す（例: "4" "3" "2" "," "4" "6" "4"）。
 * isNum は "," 単体を数値と見なさないため、そこで語の結合が切れ、
 * カンマだけが科目名の側に取り残されて「流動資産合計,,」のようになり辞書と一致しなくなる。
 * 結合の判定にはこちらを使い、数値としての判定には従来どおり isNum を使う。
 */
const isNumish = (tok) => /^[\d,.\u25b3\u25b2\-\u2212()（）]+$/.test(deSpace(tok));

/* -------------------------------------------------- pdf.js の item → 語 */
/**
 * pdf.js は文字単位でitemを返すことがある（分散配置の決算書は特に）。
 * y座標で行にまとめ、x方向に近いものを1語として連結する。
 */
function itemsToWords(items, viewportHeight) {
  const raw = [];
  for (const it of items) {
    const s = it.str;
    if (!s || !s.trim()) continue;
    const x0 = it.transform[4];
    const y = it.transform[5];
    const x1 = x0 + (it.width || 0);
    const top = viewportHeight - y;
    const fs = it.height || Math.abs(it.transform[3]) || 10;   // 文字の高さ（会社名の行の切り分けに使う）
    // 決算公告には、区分の合計を「[ 5,510,362 ]」と角括弧で囲む様式がある。
    // pdf.js が金額と閉じ括弧を1つの item（"5,510,362 ]"）で返すと、金額と認められず科目名の側に流れ、
    // その区分（例：流動負債・固定負債）が丸ごと欠ける（実例：千円２）。
    // 括弧を別の item に切り分ける。位置は文字数で按分する（金額の右端が金額列にそろうように）。
    const m = /^(\s*[\[［]\s*)?([△▲\-−]?\s*[\d,]+)(\s*[\]］]\s*)?$/.exec(s);
    if (m && (m[1] || m[3]) && /\d/.test(m[2])) {
      const per = (x1 - x0) / s.length;
      const a = (m[1] || "").length, b = m[2].length;
      if (m[1]) raw.push({ text: m[1], x0, x1: x0 + a * per, top, fs });
      raw.push({ text: m[2], x0: x0 + a * per, x1: x0 + (a + b) * per, top, fs });
      if (m[3]) raw.push({ text: m[3], x0: x0 + (a + b) * per, x1, top, fs });
      continue;
    }
    raw.push({ text: s, x0, x1, top, fs });
  }
  raw.sort((a, b) => a.top - b.top || a.x0 - b.x0);

  // 行にまとめる
  const lines = [];
  for (const r of raw) {
    const ln = lines.find((l) => Math.abs(l.top - r.top) <= 3);
    if (ln) { ln.items.push(r); ln.top = (ln.top + r.top) / 2; }
    else lines.push({ top: r.top, items: [r] });
  }

  // 行内でx方向に近いものを連結して語にする
  const words = [];
  for (const ln of lines) {
    ln.items.sort((a, b) => a.x0 - b.x0);
    let cur = null;
    for (const it of ln.items) {
      const h = 10; // 想定文字高
      // 決算公告は金額欄を【】で囲む。左段の「】」と右段の「【流動負債】」は
      // 数ピクセルしか離れておらず、そのまま結合すると左右の段が1つの語になり、
      // 段組みの分割が効かなくなる。隅付き括弧はまたいで結合しない。
      const bracketBreak = /】$/.test(cur ? cur.text : "") || /^【/.test(it.text);
      if (cur && !bracketBreak && it.x0 - cur.x1 <= h * 0.9 && isNumish(it.text) === isNumish(cur.text)) {
        cur.text += it.text; cur.x1 = it.x1; cur.fs = Math.max(cur.fs, it.fs);
      } else {
        if (cur) words.push(cur);
        cur = { text: it.text, x0: it.x0, x1: it.x1, top: ln.top, fs: it.fs };
      }
    }
    if (cur) words.push(cur);
  }
  return words;
}

/**
 * 科目名を突き合わせるための鍵。括弧の類をすべて落とす。
 * 決算公告は小計を「【流動資産】」と囲むが、PDFによっては半角で「流動資産[]」、
 * 「有形固定資産(」のように括弧が科目名に貼りついた形で出てくる。
 * norm では全角の隅付き括弧しか落としていなかったため、半角のものが残って辞書と一致せず、
 * 区分の合計が丸ごと欠けて貸借が合わなくなっていた。
 * ラベル側と辞書側の両方に同じ処理をかけるので、「(純額)」付きの辞書項目も壊れない。
 */
const keyOf = (s) => String(s)
  .replace(/[【】「」『』〔〕［］\[\]（）()]/g, "")
  // 「当期純損失(△)」「税金等調整前当期純損失(△)」のように、
  // 損失であることを示す△が科目名に付く様式がある。括弧を外しても△が残り、
  // 辞書の「当期純損失」と一致せず当期純利益が丸ごと欠測していた。
  .replace(/[△▲]/g, "");

/* ------------------------------------------------------------ レイアウト判定 */
/** 右揃えで3回以上現れるx1＝金額列。見出しの年号やページ番号は頻度で除外する */
function amountBands(words, pageWidth) {
  const nums = words.filter((w) => isNum(w.text));
  if (nums.length < 4) return [];
  // 注記番号の列（「10」「15」など）を金額列と誤認しないようにする。
  // 注記番号は桁が短く符号も付かないため、列ごとの「最大桁数」で見分ける。
  const cnt = new Map(), width = new Map();
  for (const w of nums) {
    const k = Math.round(w.x1);
    cnt.set(k, (cnt.get(k) || 0) + 1);
    const digits = w.text.replace(/[^\d]/g, "").length;
    const signed = /^[△▲\-−(（]/.test(w.text.normalize("NFKC"));
    width.set(k, Math.max(width.get(k) || 0, digits + (signed ? 10 : 0)));
  }
  let xs = [...cnt.entries()].filter(([, c]) => c >= 3).map(([x]) => x).sort((a, b) => a - b);
  if (xs.length > 1) {
    // 最も「金額らしい」列の桁数を基準に、明らかに桁の小さい列（注記番号）を落とす
    const maxW = Math.max(...xs.map((x) => width.get(x)));
    const kept = xs.filter((x) => width.get(x) >= Math.min(4, maxW) || width.get(x) >= maxW - 2);
    if (kept.length) xs = kept;
  }
  if (!xs.length) return [];
  // 近い位置（ページ幅の10%未満）の右端は、同じ列の揃いのぶれとして1つの列にまとめる。
  // ただし、同じ行に金額が並んで現れる位置どうしは別の列（1行に同じ列の金額は1つしか無い）。
  // 列の間隔が狭い表（「前期｜当期｜増減」を 55pt 間隔で並べる）で3列を1列にまとめ、増減だけを当期として読んでいた
  // （7回目の独立レビューの指摘）。
  const lines = new Map();
  for (const w of nums) {
    const k = Math.round(w.x1);
    if (!lines.has(k)) lines.set(k, new Set());
    lines.get(k).add(Math.round(w.top / 3));
  }
  const together = (group, x) => {
    const lx = lines.get(x) || new Set();
    let n = 0;
    for (const g of group) { const lg = lines.get(g); if (lg) for (const t of lx) if (lg.has(t)) n++; }
    return n;
  };
  const bands = [];
  let cur = [xs[0]];
  for (const x of xs.slice(1)) {
    if (x - cur[cur.length - 1] < pageWidth * 0.10 && together(cur, x) < 2) cur.push(x);
    else { bands.push(cur); cur = [x]; }
  }
  bands.push(cur);
  return bands.map((b) => Math.max(...b));
}

/* ------------------------------------------------------------ 列の見出し */
/**
 * 金額の列の上にある見出しの行を集める。金額でない語を、同じ高さのものどうし左から順につなぐ。
 * 見出しは1文字ずつ離して置かれることがある（「当　年　度」）ので、語を1つずつではなく行として見る。
 * 範囲は、左端の金額列の少し左から右端の金額列まで（科目名の列は含めない）。
 */
const DASH_RE = /^[-−‐‑–—―ー]$/;
function headerLinesOf(words, bands) {
  if (!bands.length) return [];
  let gap = 0;
  for (let i = 1; i < bands.length; i++) gap = gap ? Math.min(gap, bands[i] - bands[i - 1]) : bands[i] - bands[i - 1];
  const lo = bands[0] - Math.max(130, gap + 20), hi = bands[bands.length - 1] + 20;
  const mid = (w) => (w.x0 + w.x1) / 2;
  const ws = words.filter((w) => !isNum(w.text) && !DASH_RE.test(deSpace(w.text)) && mid(w) > lo && mid(w) <= hi)
                  .sort((a, b) => (a.top - b.top) || (a.x0 - b.x0));
  const lines = [];
  for (const w of ws) {
    const l = lines[lines.length - 1];
    if (l && Math.abs(w.top - l.top) <= 3) l.ws.push(w); else lines.push({ top: w.top, ws: [w] });
  }
  for (const l of lines) { l.ws.sort((a, b) => a.x0 - b.x0); l.text = norm(l.ws.map((w) => w.text).join("")); }
  return lines;
}
// 期を表す語（長いものを先に）。CUR は当期、PRI は前期
const CUR_WORDS = "当連結会計年度|当事業年度|当会計年度|当年度|本年度|今年度|当期|今期|本期|当年|本年";
const PRI_WORDS = "前連結会計年度|前事業年度|前会計年度|前年度|昨年度|前期|昨期|前年|昨年";
/**
 * 見出しらしい行か：期を表す語・日付・単位・「実績」「残高」「決算額」などの見出しの語を除くと、ほとんど何も残らない行。
 * 注記の文（「当期は前期に比べて…」）や表題（「前期比較貸借対照表」）を見出しと取り違えないため。
 * 「当期実績｜前期実績」「当期(千円)｜前期(千円)」のように列ごとに語が付く見出しも認める（7回目の独立レビューの指摘）。
 */
function headerLike(s) {
  const rest = s.replace(new RegExp(CUR_WORDS + "|" + PRI_WORDS, "g"), "")
    .replace(/予算額?|実績|決算額?|残高|帳簿|金額|計上額|差異|単位|千円|百万円|円|科目|区分|摘要|注記|番号|現在|から|まで|FY|作成日/g, "")
    .replace(/[()（）\[\]＜＞<>【】年月日度期第末元令和平成昭和自至RH\d\s.\/〜~\-－:：、,%]/g, "");
  return rest.length <= 4;
}
/**
 * 見出しの行の中の「期の語」「年・期の番号」「予算・実績」を、それぞれ金額のどの列の上にあるかとともに返す。
 * 列の割り当ては「ます目」で決める：列 i のます目は、左隣の列の金額の右端から列 i の金額の右端まで
 * （左端の列は、列の間隔と同じ幅だけ左まで）。語がます目に収まっていれば、その列の見出し。
 *   ・Excel で作った表のように見出しをます目の左に寄せても、右・中央に寄せても、同じ列になる
 *     （7回目の直し方では「最も近い金額の列」に割り当てていて、左寄せの短い見出しを左の列と取り違えた。8回目の独立レビューの指摘）
 *   ・表題の下の中央の期間や、注記・凡例の行（「当期 第44期(…) 前期 第43期(…)」）のように、ます目をまたぐ長い語は数えない
 *   ・ます目から少しはみ出すだけの短い語（列の幅より少し広い見出しを中央にそろえたもの）は、中心で決める
 *   ・1文字ずつ離して置いた見出し（「当　年　度」）は、語の文字の半分以上が収まる列にする
 * 行ごとに { toks: [{ type, val, word, col }], colText: [列ごとの見出しの文字] } を返す。
 */
function headerTokens(words, bands) {
  if (bands.length < 2) return [];
  let gap = Infinity;
  for (let i = 1; i < bands.length; i++) gap = Math.min(gap, bands[i] - bands[i - 1]);
  const cellLo = (i) => (i === 0 ? bands[0] - gap - 10 : bands[i - 1] - 2);
  const cellOf = (w) => {
    for (let i = 0; i < bands.length; i++) if (w.x0 >= cellLo(i) && w.x1 <= bands[i] + 4) return i;
    if (w.x1 - w.x0 <= gap * 1.2) {
      const c = (w.x0 + w.x1) / 2;
      for (let i = 0; i < bands.length; i++) if (c > (i === 0 ? bands[0] - gap : bands[i - 1]) && c <= bands[i] + 4) return i;
    }
    return -1;
  };
  // 1つの語の中に大きな空白をはさんで2つの見出しが入っていることがある（Word で作った表の「当期　　　　　前期」）。
  // 空白で分け、位置は文字数で按分する（分けないと、ます目をまたぐ長い語として数えない。8回目の独立レビューの指摘）
  const pieces = (w) => {
    const raw = String(w.text);
    if (!/\u3000|\s{2,}/.test(raw)) return [w];
    const per = (w.x1 - w.x0) / Math.max(1, raw.length);
    const out = [];
    for (const m of raw.matchAll(/[^\s\u3000]+(?:\s(?!\s)[^\s\u3000]+)*/g)) {
      out.push({ ...w, text: m[0], x0: w.x0 + m.index * per, x1: w.x0 + (m.index + m[0].length) * per });
    }
    return out.length ? out : [w];
  };
  const out = [];
  for (const l of headerLinesOf(words, bands)) {
    const lws = l.ws.flatMap(pieces);
    let text = "";
    const owner = [];
    for (const w of lws) { const t = deSpace(w.text); text += t; for (let i = 0; i < t.length; i++) owner.push(w); }
    if (!headerLike(text)) continue;
    const colText = bands.map(() => "");
    for (const w of lws) { const c = cellOf(w); if (c >= 0) colText[c] += deSpace(w.text); }
    const toks = [];
    const add = (m, type, val) => {
      const ws = owner.slice(m.index, m.index + m[0].length);
      const cnt = new Map();
      for (const w of ws) { const c = cellOf(w); if (c >= 0) cnt.set(c, (cnt.get(c) || 0) + 1); }
      if (!cnt.size) return;
      const [col, n] = [...cnt.entries()].sort((a, b) => b[1] - a[1])[0];
      if (n * 2 < ws.length) return;
      toks.push({ type, val, word: m[0], col });
    };
    for (const m of text.matchAll(new RegExp(CUR_WORDS, "g"))) add(m, "cur");
    for (const m of text.matchAll(new RegExp(PRI_WORDS, "g"))) add(m, "pri");
    for (const m of text.matchAll(/(?<!\d)(?:19|20)\d{2}(?!\d)/g)) add(m, "y", +m[0]);
    for (const m of text.matchAll(/(令和|平成|昭和)(\d{1,2}|元)年/g)) add(m, "y", (m[1] === "令和" ? 2018 : m[1] === "平成" ? 1988 : 1925) + (m[2] === "元" ? 1 : +m[2]));
    for (const m of text.matchAll(/(?<![A-Za-z])([RH])(\d{1,2})(?=年|\.|\/)/g)) add(m, "y", (m[1] === "R" ? 2018 : 1988) + +m[2]);
    for (const m of text.matchAll(/(?<![\d令和平成昭和RH])(\d{1,2})年\d{1,2}月/g)) add(m, "yy", +m[1]);   // 元号を省いた「7年3月期」
    for (const m of text.matchAll(/第(\d{1,3})期/g)) add(m, "k", +m[1]);
    for (const m of text.matchAll(/予算/g)) add(m, "budget");
    for (const m of text.matchAll(/実績|決算/g)) add(m, "actual");
    if (toks.length) out.push({ toks, colText });
  }
  return out;
}
/**
 * 2列の表の並び（"normal"＝前期が左 / "reversed"＝当期が左 / null＝決められない）を、列の上の見出しから決める。
 *  ・当期の語と前期の語が、それぞれ別の列の上にあれば、当期の語のある列が当期（「当年度｜前年度」→ reversed）。
 *  ・年（西暦・和暦）・期の番号が両方の列の上にあれば、大きい方の列が当期（「第44期｜第43期」→ reversed）。
 *  見出しの行ごとに票を集め、食い違えば null（入れ替えない）。
 * 以前（6回目）は行の中の語の順序だけで決めていたため、列の上にない注記の行（「当期 第44期… 前期 第43期…」）の
 * 並びで、普通の表を入れ替えていた（7回目の独立レビューの指摘）。
 */
function headerOrder(words, bands) {
  if (bands.length !== 2) return null;
  const votes = new Set();
  for (const { toks, colText } of headerTokens(words, bands)) {
    const cols = (type) => [...new Set(toks.filter((t) => t.type === type).map((t) => t.col))];
    const cur = cols("cur"), pri = cols("pri");
    if (cur.length === 1 && pri.length === 1 && cur[0] !== pri[0]) votes.add(cur[0] < pri[0] ? "reversed" : "normal");
    else if (cur.length + pri.length === 1) {
      // 片方の列にだけ期の語があり（「実績｜前年実績」「決算額｜前年度決算額」。予算の列を落とした後の予実の表など）、
      // もう一方の列の見出しが金額の語（実績・決算・金額・残高）なら、それを反対の期とみなす（9回目の独立レビューの指摘）
      const one = cur.length ? cur[0] : pri[0], other = one === 0 ? 1 : 0;
      // 期の語のある列が計画・目標・見込み・予想の列（「当期計画｜実績」）なら、実績の列は前期ではないので決めない（10回目の独立レビューの指摘）。
      // 「予算」は入れない：予算の列は dropBudgetColumns で先に落ち、その見出しが隣の列のます目に入る（「実績｜予算｜前年実績」の
      // 予算を落とすと、前年実績の列のます目が「予算前年実績」になる）ので、入れると正しい票まで止めてしまう
      if (/実績|決算|金額|残高/.test(colText[other] || "") && !/計画|目標|見込|予想|予測/.test(colText[one] || "")) {
        votes.add((cur.length ? one === 0 : one === 1) ? "reversed" : "normal");
      }
    }
    // 1つの期間（「自2024年4月1日」「至2025年3月31日」）が2つの列の上に割れて載っているだけの行は、年を比べない
    //（比べると「前期が左」の票になり、正しい票と食い違って入れ替えなくなる。8回目の独立レビューの指摘）
    // 左が期間の始まりだけ（「自…」「…から」「…～」）で右はそうでない、または右が終わりだけ（「至…」「～…」「…まで」）で左はそうでない行
    const c0 = colText[0] || "", c1 = colText[1] || "";
    const startLike = (c) => (/自/.test(c) && !/至/.test(c)) || /(?:から|[～〜~\-－])$/.test(c);
    const endLike = (c) => (/至/.test(c) && !/自/.test(c)) || /^[～〜~\-－]/.test(c) || (/まで$/.test(c) && !/から/.test(c));
    if ((startLike(c0) && !startLike(c1)) || (endLike(c1) && !endLike(c0))) continue;
    for (const type of ["y", "yy", "k"]) {
      const v = [0, 1].map((c) => toks.filter((t) => t.type === type && t.col === c).map((t) => t.val));
      if (v[0].length && v[1].length) {
        const a = Math.max(...v[0]), b = Math.max(...v[1]);
        if (a !== b) votes.add(a > b ? "reversed" : "normal");
      }
    }
  }
  return votes.size === 1 ? [...votes][0] : null;
}

/**
 * 段組みを判定する。
 *  "single"   … 単段
 *  "accounts" … 科目が左右2列（計算書類）→ splitX で分割して読む
 *  "years"    … 年度が2列（有報・短信）→ 分割せず、行内の数値配列で持つ
 */
function classify(words, pageWidth, pageText) {
  const bands = amountBands(words, pageWidth);
  if (bands.length < 2) return { kind: "single", splitX: null };
  // 列の見出しに「前事業年度／当事業年度」「前連結会計年度／当連結会計年度」があれば、前期・当期の2列の表。
  // 以前は「前期…当期」だけでも認めていたが、この語は科目名や注記の文（「前期損益修正益」「前期に引き続き当期も」）にも
  // 出てくるため、単年の表を2期の表と取り違えていた（独立レビューの指摘）。「前期」「当期」だけを見出しにする2期の表は、
  // 金額の列の並び（下の判定）で見分ける。
  // さらに、その2語が「見出しらしい行」（期の語と日付のほかにほとんど何も無い行）にあり、それぞれ別の金額の列の上に
  // あることを確かめる（headerTokens）。注記の文（「前事業年度において…当事業年度より…」「前事業年度、当事業年度ともに
  // 該当事項はありません。」）は見出しではない。以前はページ全体の文字列で、2語のあいだが日付の文字だけかを見ていたが、
  // 読点「、」を日付の文字に入れていたため注記の文を見出しと取り違え、左右2段の貸借対照表を2期の表として読んでいた
  // （6回目の独立レビューの指摘）。
  if (headerTokens(words, bands).some(({ toks }) => {
    const p = toks.find((t) => t.type === "pri" && /^前(?:連結会計|事業)年度$/.test(t.word));
    const c = toks.find((t) => t.type === "cur" && /^当(?:連結会計|事業)年度$/.test(t.word));
    return p && c && p.col !== c.col;
  })) return { kind: "years", splitX: null, byHeader: true };
  // 左段の金額と右段の金額の“あいだ”に科目名があれば「科目が2列」、なければ「年度が2列」。
  // 判定を誤ると当期と前期を取り違えるため、次の2点を必ず確認する。
  //   ・あいだの文字が、左段の金額のすぐ右から始まっているか（表の途中の注釈を拾わない）
  //   ・その文字が複数行にわたって存在するか（1行だけの脚注を科目列と誤認しない）
  // 2つの金額列 lo・hi のあいだに科目名の列があるかを調べ、あれば段の境目の x を返す（無ければ null）
  const splitBetween = (lo, hi) => {
    // 構成比の列の「%」「12.3」のような語は科目名ではない（損益計算書の構成比の列を左右2段と取り違えないため。9回目の独立レビューで気づいた）
    const mids = words.filter((w) => !isNum(w.text) && !/^[\d.,%％()（）△▲\-−]+$/.test(deSpace(w.text)) && w.x0 > lo + 2 && w.x0 < hi - 20);
    const midRows = new Set(mids.map((w) => Math.round(w.top / 3)));
    const numRows = new Set(words.filter((w) => isNum(w.text) && Math.abs(w.x1 - hi) <= 4)
                                 .map((w) => Math.round(w.top / 3)));
    // 右段の金額がある行のうち、あいだに科目名も存在する行の割合
    let share = 0;
    if (numRows.size) {
      let n = 0;
      for (const r of numRows) if (midRows.has(r)) n++;
      share = n / numRows.size;
    }
    if (!(mids.length >= 5 && midRows.size >= 3 && share >= 0.6)) return null;
    // 境目は「左段の金額の右端＋6」。ただし右段の科目名がそれより手前から始まる組版では、
    // 右段の1文字目が左段に入り「流動資産流」「動負債」のように割れてしまう
    // （実例：横浜国際平和会議場の決算公告。金額の右端 297.0 に対し、右段の「流」は 299.8 から始まる）。
    // そういうときだけ、左段の金額の右端と右段の文字の左端の、すき間の中央で切る。
    const rightStarts = words.filter((w) => !isNum(w.text) && w.x0 > lo && w.x0 < hi - 20).map((w) => w.x0);
    const firstRight = rightStarts.length ? Math.min(...rightStarts) : Infinity;
    return Math.min(lo + 6, (lo + firstRight) / 2);
  };
  // 左右の段の中に「内訳｜合計」の2列がある表では、隣り合う金額列のあいだに科目名の列があるのは2本目と3本目のあいだになる。
  // 1本目と2本目だけを見ると科目名が見つからず、左右の段を1つの2期の表と取り違える（8回目の独立レビューの指摘）ので、
  // 隣り合うすべての組を左から順に調べる。
  let splitX = null, si = -1;
  for (let i = 0; i + 1 < bands.length && splitX === null; i++) { splitX = splitBetween(bands[i], bands[i + 1]); si = i; }
  if (splitX !== null) {
    // 決算公告の「要旨」には、貸借対照表の左右2段の右に損益計算書をもう1段並べる様式がある（3段）。
    //   流動資産 3,695 │ 流動負債 2,819 │ 売上高 8,347
    // 2段として読むと、右の2段が「流動負債売上原価」のように1つの科目名になり、負債の区分も損益計算書も丸ごと欠ける
    // （実例：サンフレッチェ広島の決算公告）。その右の金額列のあいだにも科目名の列があれば、3段に分ける。
    let splitX2 = null;
    for (let i = si + 1; i + 1 < bands.length && splitX2 === null; i++) splitX2 = splitBetween(bands[i], bands[i + 1]);
    return { kind: "accounts", splitX, splitX2 };
  }
  return { kind: "years", splitX: null };
}

/* ---------------------------------------------------------------- 行の抽出 */
/**
 * 比較貸借対照表のように「前期 当期 増減」の3列を並べる表で、増減の列（と、その右の前期比などの列）を取り除く。
 * 取り除かないと、行の右端＝当期として増減額を当期の金額と読んでしまう（独立レビューの指摘。会計ソフトの帳票に多い）。
 * 増減の列は貸借の等式をすべて満たす（当期と前期の差なので）ため、検算では気づけない。見落とすと黙って間違える。
 *
 * 見つけ方は2つ。
 *  (1) 金額の関係：隣り合う2つの列 i・j と、その右の列 k の金額が、ほとんどの行で c_k = c_j − c_i になっている。
 *      見出しの言い回し（「増減金額」「増減(▲)」「増減(B)-(A)」「前期比較」…）や、見出しの無い続きのページにも効く。
 *      c_k = c_i − c_j なら、当期を左に置く表（「当年度 前年度 増減」）だと分かる（order: "reversed"）。
 *  (2) 見出し：金額の行が少なくて (1) で決められないときに、列の上の見出し（CHANGE_HEAD）で判断する。
 *      見出しは1文字ずつ離して置かれることがあるので（「増　減」）、列の上の語を行ごとにつないで調べる。
 * どちらも、当期の列より右をすべて落とす（「増減額｜増減率」「前期比｜増減」のように変化の列が2つある表のため）。
 * 予算と実績を並べる表は、先に dropBudgetColumns で予算と差異の列を落とす（予算を前期・当期として読まないため）。
 * 戻り値：{ words, order }。order は (1) で並びが分かったときの "normal"（前期→当期）/ "reversed"（当期→前期）、ほかは null。
 */
const CHANGE_HEAD = new RegExp("^(?:増減|増[△▲]減|増加\\([△▲]減少\\)|比較増減|差引増減|当期増減|対前期増減|対前年度?増減|前期比較?|前年度?比|対前年度?比|前年同期比)" +
  "(?:金額|額|率)?(?:\\((?:[△▲][^()]{0,8}|%|[A-Z](?:[-−－ー][A-Z])?)\\)(?:[-−－ー]\\([A-Z]\\))?|%)?$");
function changeColumnByArithmetic(words, bands) {
  const onB = (w) => bands.findIndex((b) => Math.abs(w.x1 - b) <= 4);
  const isA = (w) => isNum(w.text) || DASH_RE.test(deSpace(w.text));
  // 行ごとに、列ごとの金額と科目名を集める
  const lines = [];
  for (const w of words.slice().sort((a, b) => (a.top - b.top) || (a.x0 - b.x0))) {
    let l = lines.find((x) => Math.abs(x.top - w.top) <= 3);
    if (!l) { l = { top: w.top, ws: [] }; lines.push(l); }
    l.ws.push(w);
  }
  for (const l of lines) {
    l.v = new Map(); l.bad = false;
    const lab = [];
    l.ws.sort((a, b) => a.x0 - b.x0);
    for (let i = 0; i < l.ws.length; i++) {
      const w = l.ws[i], t = deSpace(w.text);
      if (!isA(w)) {
        // 符号の欄に離して置いた「△」（「△  1,234」）。すぐ右の金額を負にする（金額の関係を正しく数えるため）
        if ((t === "△" || t === "▲") && l.ws[i + 1] && isNum(l.ws[i + 1].text) && l.ws[i + 1].x0 - w.x1 <= 40) { l.ws[i + 1].__neg = true; continue; }
        lab.push(t);
        continue;
      }
      const bi = onB(w);
      if (bi < 0) continue;
      if (l.v.has(bi)) l.bad = true;
      let v = DASH_RE.test(t) ? 0 : toNum(w.text);
      if (w.__neg && v > 0) v = -v;
      l.v.set(bi, v);
    }
    for (const w of l.ws) delete w.__neg;
    l.label = keyOf(norm(lab.join("")));
  }
  // 増減の列のある表では、ほとんどの行に3つの金額が並ぶ。3つ並ぶ行がページの金額の行の半分に満たないときは判断しない
  // （「取得価額｜減価償却累計額｜帳簿価額」のように、一部の行だけが c_k = c_i − c_j になる表で、帳簿価額の列を落とさないため）。
  const amtLines = lines.filter((l) => !l.bad && l.v.size > 0);
  // さらに、合計の行（「流動資産合計」など）が2行以上あるときは、その3分の2以上に3つの金額が並ぶことを求める。
  // 比較貸借対照表では合計の行にも増減が並ぶが、固定資産の明細（取得価額｜累計額｜帳簿価額）が多いページの合計の行は
  // 帳簿価額の列にしか金額が無い（7回目の独立レビューの指摘：明細の行が過半のページで帳簿価額の列を落としていた）。
  const totalLines = amtLines.filter((l) => /(?:合計|総計|計)$/.test(l.label) ||
    /^(?:流動資産|固定資産|有形固定資産|無形固定資産|投資その他の資産|繰延資産|流動負債|固定負債|純資産|資産|負債)(?:の部)?$/.test(l.label));
  let best = null;
  for (let k = 2; k < bands.length; k++) {
    for (let i = 0; i + 1 < k; i++) {
      const j = i + 1;
      let n = 0, hit = 0, fwd = 0, rev = 0;
      for (const l of amtLines) {
        if (!l.v.has(i) || !l.v.has(j) || !l.v.has(k)) continue;
        // 3つとも「－」（0）の行は、どの関係も満たしてしまうので数えない
        if (l.v.get(i) === 0 && l.v.get(j) === 0 && l.v.get(k) === 0) continue;
        n++;
        const d = l.v.get(j) - l.v.get(i), c = l.v.get(k);
        const f = Math.abs(c - d) <= 1, r = Math.abs(c + d) <= 1;
        if (f || r) hit++;
        if (d !== 0 && f && !r) fwd++;
        if (d !== 0 && r && !f) rev++;
      }
      if (n < 4 || n < amtLines.length * 0.5 || hit < n * 0.8) continue;
      if (totalLines.length >= 2 && totalLines.filter((l) => l.v.has(i) && l.v.has(j) && l.v.has(k)).length < totalLines.length * 2 / 3) continue;
      const order = fwd >= 2 && rev === 0 ? "normal" : rev >= 2 && fwd === 0 ? "reversed" : null;
      if (!best || hit > best.hit) best = { j, hit, order };
    }
  }
  return best;
}
/**
 * 予算の列と、予算との差の列（差異・差額・増減・予算比）を落とす（「予算額｜決算額｜差異」「前年実績｜予算｜実績｜予算差異」
 * 「前期｜当期｜当期予算」。公益法人・学校法人の収支計算書、予実の管理表など）。予算を前期や当期として読まないため。
 * 残った実績の列は、ふつうの表と同じに読む（1列なら単年、前年の実績と当年の実績の2列なら2期）。
 * 以前（7回目）は実績の列のうち左端の1列だけを残していて、「前年実績｜予算｜実績」で前年の実績を当期として読んでいた。
 * 実績・決算の語が無い「前期｜当期｜当期予算」は予算の列を当期として読んでいた（いずれも8回目の独立レビューの指摘）。
 * 見出しに予算の列が無ければ何もしない（null）。
 */
function dropBudgetColumns(words, bands) {
  const drop = new Set();
  for (const { toks, colText } of headerTokens(words, bands)) {
    const bud = new Set(toks.filter((t) => t.type === "budget").map((t) => t.col));
    if (!bud.size) continue;
    for (const c of bud) drop.add(c);
    colText.forEach((t, c) => {
      if (/差異|差額|増減|予算比|達成率|対予算/.test(t)) drop.add(c);
      // 執行率・比率の列（9回目に足した）は、その列のます目の見出しに金額の語・期の語が無いときだけ落とす。
      // 比率の列の数字は桁が短く金額の列と認められないことが多く、そのときの見出しは右隣の金額の列のます目に入る
      // （「予算｜比率｜実績｜比率」で、実績の列のます目が「比率実績」になる）。それで実績の列を落としていた（10回目の独立レビューの指摘）
      else if (/執行率|比率/.test(t) && !/実績|決算|金額|残高/.test(t) && !new RegExp(CUR_WORDS + "|" + PRI_WORDS).test(t)) drop.add(c);
    });
  }
  if (!drop.size || drop.size >= bands.length) return null;
  return words.filter((w) => {
    if (!(isNum(w.text) || DASH_RE.test(deSpace(w.text)))) return true;
    const bi = bands.findIndex((b) => Math.abs(w.x1 - b) <= 4);
    return bi < 0 || !drop.has(bi);
  });
}
function dropChangeColumn(words0, pageWidth) {
  let words = words0;
  let bands = amountBands(words, pageWidth);
  if (bands.length < 2) return { words, order: null };
  const nb = dropBudgetColumns(words, bands);
  if (nb) { words = nb; bands = amountBands(words, pageWidth); }
  if (bands.length < 3) return { words, order: null };
  const cutAt = (j, order) => {
    const edge = bands[j] + 4;   // 当期の列の右端より右は増減などの列
    return { words: words.filter((w) => ((isNum(w.text) || DASH_RE.test(deSpace(w.text))) ? w.x1 <= edge : w.x0 <= edge)), order };
  };
  const ar = changeColumnByArithmetic(words, bands);
  if (ar) return cutAt(ar.j, ar.order);
  // 見出しで判断する：左から3本目以降の列で、見出しが増減の言い回しになっている最初の列の手前で切る
  for (let k = 2; k < bands.length; k++) {
    const hi = bands[k], lo = bands[k - 1];
    const ws = words.filter((w) => !isNum(w.text) && w.x1 >= hi - 90 && w.x0 <= hi + 10 && w.x0 > lo)
                    .sort((a, b) => (a.top - b.top) || (a.x0 - b.x0));
    const lines = [];
    for (const w of ws) {
      const l = lines[lines.length - 1];
      if (l && Math.abs(w.top - l.top) <= 3) l.ws.push(w); else lines.push({ top: w.top, ws: [w] });
    }
    if (lines.some((l) => CHANGE_HEAD.test(norm(l.ws.map((w) => w.text).join(""))))) return cutAt(k - 1, null);
  }
  return { words, order: null };
}

function rowsOf(words0, pageWidth, pageText) {
  const { words, order: arithOrder } = dropChangeColumn(words0, pageWidth);
  const { kind: kind0, splitX, splitX2, byHeader } = classify(words, pageWidth, pageText);
  let kind = kind0;
  const buckets = new Map();
  for (const w of words) {
    const col = splitX === null || w.x0 < splitX ? 0 : (splitX2 != null && w.x0 >= splitX2 ? 2 : 1);
    const key = col + ":" + Math.round(w.top / 3);
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(w);
  }
  // 金額列のx1位置。ここに右端が揃っている数値だけを金額として採用し、
  // 注記番号（左寄り・少桁）を金額として拾ってしまうのを防ぐ。
  const bands = amountBands(words, pageWidth);
  const onBand = (w) => bands.some((b) => Math.abs(w.x1 - b) <= 4);
  // 金額欄の「－」（該当なし＝0）。
  // 有価証券報告書は、前期か当期の一方にしか残高が無い科目で、もう一方の欄に「－」を置く。
  //   短期借入金          －        9,311
  // 「－」を数値と認めないと科目名の側に流れて「短期借入金-」となり、辞書と一致せず科目ごと消える。
  // さらに「リース債務 5 －」では、前期の 5 が当期の値として読まれる。
  // 金額の列の右端にそろっている「－」だけを 0 の金額として扱う（科目名の中の「ー」は巻き込まない）。
  const dashAmt = (w) => bands.length > 0 && /^[-−‐‑–—―ー]$/.test(deSpace(w.text)) && onBand(w);
  const isAmt = (w) => isNum(w.text) || dashAmt(w);
  // 構成比・執行率の列の「58.9」「100.0%」「%」は、金額でも科目名でもない。科目名に混ぜると「売上高100.0%」になり、
  // どの科目にも当たらなくなる（9回目の独立レビューで気づいた。構成比の列のある損益計算書・執行率の列のある収支計算書）
  // 赤字の行の「△4.0」「-4.0」や、括弧でくくった「(58.9)」「(58.9%)」も同じ（10回目の独立レビューの指摘。9回目は符号・括弧の付く形を拾っていなかった）
  const pctLike = (w) => /^(?:[(（][△▲\-−]?(?:[\d,]*\.\d+[%％]?|[\d,]+[%％])[)）]|[△▲\-−]?(?:[\d,]*\.\d+[%％]?|[\d,]+[%％])|[%％]|[(（][%％][)）])$/.test(deSpace(w.text));

  // 「１年以内返済／長期借入金」のように科目名が2行に折り返すと、
  // 金額だけの行と、科目名だけの行に分かれてしまう。
  // 同じ段の隣接する行どうしに限って、科目名を金額の行へ寄せる。
  {
    const keys = [...buckets.keys()];
    const info = new Map();
    for (const k of keys) {
      const ws = buckets.get(k);
      const [col, top] = k.split(":").map(Number);
      info.set(k, { col, top, hasNum: ws.some(isAmt),
                    hasLabel: ws.some((w) => !isAmt(w)) });
    }
    for (const k of keys) {
      const me = info.get(k);
      if (!me) continue;                               // 既に他の行へ寄せた行
      if (!me.hasNum || me.hasLabel) continue;         // 金額だけの行が対象
      // 折り返しは上下2行にまたがることがある（1行目「１年以内返済」/2行目「長期借入金」）。
      // 上下とも科目名だけの行なら、上の行から順に金額の行へ寄せる。
      let moved = 0;
      for (const d of [-2, -1, 1, 2]) {
        if (moved >= 2) break;
        const nk = me.col + ":" + (me.top + d);
        const nb = info.get(nk);
        if (!nb || nb.hasNum || !nb.hasLabel) continue;
        buckets.get(k).push(...buckets.get(nk));       // 科目名を金額の行へ移す
        buckets.delete(nk);
        info.delete(nk);
        moved++;
      }
    }
  }
  // 折り返した科目名で、金額が1行目か最終行にある形（Excel で作ったPDFは、セルの下端にそろえるものが多い）。
  //   電子記録              500   ← 科目名の前半と金額
  //   債権                        ← 科目名の後半だけの行
  // 上の処理は金額だけの行しか見ないので、科目名が「電子記録」になり、どの科目にも当たらず黙って落ちていた（6回目の独立レビューの指摘）。
  // すぐ上か下（行の間隔 9〜15pt）の、科目名だけの行を寄せる。ただし、寄せる前の科目名が辞書にも名前の型にも当たらず、
  // 寄せた後の名前が辞書の科目名とぴったり一致するときだけ。名前の型（ITEM_RE）での一致は認めない
  // （「未収入金」の下の見出し「売上債権」を貼りつけて「未収入金売上債権」を売上債権にしてしまうため）。
  // 「…合計」「…計」の行は科目名が完結しているので寄せない（次の区分の見出しを貼りつけていた。点検で判明）。
  {
    const labelOf = (ws) => ws.filter((w) => !isAmt(w) && !pctLike(w)).sort((a, b) => (a.top - b.top) || (a.x0 - b.x0)).map((w) => w.text).join("");
    for (const k of [...buckets.keys()]) {
      const ws = buckets.get(k);
      if (!ws || !ws.some(isAmt)) continue;
      const lab = labelOf(ws);
      if (!lab || knownLabel(lab) || /(?:合計|小計|計)$/.test(keyOf(norm(lab)))) continue;
      const [col, top] = k.split(":").map(Number);
      for (const d of [-3, 3, -4, 4, -5, 5]) {
        const nk = col + ":" + (top + d);
        const nws = buckets.get(nk);
        if (!nws || nws.some(isAmt)) continue;
        const nlab = labelOf(nws);
        // 金額の行の科目名が「…の」「…予定」のように途中で切れている（続きが下の行にある）ときは、名前の型（ITEM_RE）での
        // 一致も認める（「1年以内返済予定の／長期借入金」。辞書に無い言い回しが多い。7回目の独立レビューの指摘）
        const kl = keyOf(norm(lab));
        const cont = d > 0 && (/(?:の|及び|並びに|・|、|予定|返済|償還|以内|内)$/.test(kl) || /(?:1|一)年(?:以)?内|返済|償還/.test(kl));
        if (!knownLabel(d < 0 ? nlab + lab : lab + nlab, !cont)) continue;
        ws.push(...nws);
        buckets.delete(nk);
        break;
      }
    }
  }

  const rows = [];
  for (const [bkey, ws] of buckets.entries()) {
    // 「販売費及び一般管／理費」のように2行へ折り返した科目名は、
    // x0だけで並べると下の行が先に来て「理費販売費及び一般管」になる。
    // 上下（top）を先に見てから左右（x0）で並べる。
    ws.sort((a, b) => (Math.round(a.top / 3) - Math.round(b.top / 3)) || (a.x0 - b.x0));
    const nums = ws.filter(isAmt);
    const labels = ws.filter((w) => !isAmt(w) && !pctLike(w)).map((w) => w.text);
    // 決算公告には、マイナス記号を金額から離れた「符号欄」に置く様式がある。
    //   法人税、住民税および事業税        △          627
    // 「△」が単独の語になると数値と認められず科目名の側に流れ、
    // 金額は正の数として読まれる。税額の還付が支払として入り、当期純利益が合わなくなる。
    // ただし、隣の欄から紛れ込んだ「△」を巻き込むと符号を壊すので、
    // 単独の△の個数が金額の個数と一致するときにだけ符号を反転する。
    const signs = ws.filter((w) => { const t = deSpace(w.text); return t === "△" || t === "▲"; }).length;
    let amountWords = bands.length ? nums.filter(onBand) : nums;
    if (!amountWords.length) amountWords = nums;        // バンドを検出できない表は従来どおり
    // 金額列にそろっているのが「－」だけで、本物の金額は列から少しずれている行（「短期借入金 － 9,311」）。
    // 「－」だけを金額として採ると、本物の金額を落として 0 と読んでしまう。本物の金額があれば、ずれていても採る
    // （独立レビューの指摘。「－」を0と読むようにした変更で生じうる）。
    if (bands.length && amountWords.length && amountWords.every(dashAmt) && nums.some((w) => !dashAmt(w))) amountWords = nums;
    const isDashW = amountWords.map(dashAmt);
    // 科目名ごと括弧で囲んだ行（「（有形固定資産）  (8,399,415)」）の括弧は小計の印で、マイナスではない。
    // 括弧をマイナスと読むと、有形固定資産が −8,399,415 になっていた（実例：リライアンスエナジー沖縄）。
    // 日本の決算書のマイナスは△・▲なので、この形の行に限って括弧をマイナスとみなさない。
    const parenLabel = /^[(（].*[)）]$/.test(norm(labels.join("")));
    let amounts = amountWords.map((w) => {
      if (dashAmt(w)) return 0;
      const v = toNum(w.text);
      return parenLabel && v < 0 && /^[(（]/.test(deSpace(w.text)) ? -v : v;
    });
    // 「－」（0）には符号が付かないので、数に入れない。
    // 「法人税等調整額 △ 12 －」を、△1つと金額2つで数が合わないと見て、12 を正のまま読んでいた。
    const realIdx = amounts.map((_, i) => i).filter((i) => !isDashW[i]);
    if (signs > 0 && signs === realIdx.length && realIdx.every((i) => amounts[i] >= 0)) {
      for (const i of realIdx) amounts[i] = -amounts[i];
    }
    // 「税引前当期純損失 324,442」「当期純損失 287,836」のように、科目名が損失を表し、
    // 金額には△を付けない様式（中小企業の決算公告に多い）。そのまま読むと損失が利益として入り、
    // 特別損失の推定も検算も合わなくなる（実例：損失を計上した年の決算公告）。
    // 科目名にも金額にも△が無く、利益の語を含まない損失の段階利益に限って、符号を負にする。
    {
      const raw = norm(labels.join(""));
      const real = realIdx.map((i) => amounts[i]);
      if (!/[△▲]/.test(raw) &&
          /^(営業|経常|当期経常|税引前当期純|税引前当期|税引前|税金等調整前当期純|当期純|当期|親会社株主に帰属する当期純)損失$/.test(keyOf(raw)) &&
          real.length && real.every((v) => v > 0)) {
        for (const i of realIdx) amounts[i] = -amounts[i];   // 「－」（0）はそのまま
      }
    }
    // その金額が何列目にあるかを覚えておく。
    // 「内訳の右隣に区分合計を置く」様式では、内訳と合計が別の列に並ぶ。
    // 列を無視して右端を採ると、内訳を足すときに合計まで足してしまう。
    const cols = amountWords.map((w) => {
      if (!bands.length) return -1;
      let bi = 0, bd = Infinity;
      for (let i = 0; i < bands.length; i++) {
        const d = Math.abs(w.x1 - bands[i]);
        if (d < bd) { bd = d; bi = i; }
      }
      return bi;
    });
    if (!labels.length || !amounts.length) continue;
    // side … 左右2段の表で、左段(0)か右段(1)か。資産の科目を負債の段から拾わないために使う
    // 科目名の左端（字下げの判断に使う）。「※1」のような注記の印は科目名の左にはみ出して置かれることがあるので数えない
    // （数えると、その行だけ左に出て、続く行がすべて字下げされて見える。6回目の独立レビューの指摘）
    const lws = ws.filter((w) => !isAmt(w) && !pctLike(w) && norm(w.text) !== "");
    const lx = Math.min(...(lws.length ? lws : ws.filter((w) => !isAmt(w))).map((w) => w.x0));
    rows.push({ label: norm(labels.join("")), amounts, cols, side: Number(bkey.split(":")[0]), kind, nb: bands.length, dash: isDashW, lx });
  }
  // 内訳・合計の2列の表かどうかを、合計の列の金額が「直前までの内訳の列の金額の和」になっているかで確かめる（sig）。
  //   現金及び預金  1,000
  //   売掛金        3,000
  //   その他          500   4,500   ← 右の 4,500 は 1,000＋3,000＋500（区分の合計）
  // 和は、直前の合計の行より後に内訳の列だけに金額がある行が1つ以上あるときだけ数える。
  // そうしないと、2期の表の「前期と当期が同額」の行（1,000　1,000）を一致と数えてしまう（独立レビューの指摘）。
  const sig = (() => {
    if (bands.length < 2 || kind === "accounts") return false;
    const right = bands.length - 1;
    let acc = 0, n = 0, pairs = 0, hits = 0;
    for (const r of rows) {
      if (!Array.isArray(r.cols) || r.cols.length !== r.amounts.length) continue;
      if (isMemo(r.label)) continue;   // うち書きは内数なので和に入れない
      const det = r.amounts.filter((_, i) => r.cols[i] < right).reduce((a, b) => a + b, 0);
      const ti = r.cols.lastIndexOf(right);
      if (ti < 0) { acc += det; n++; continue; }
      // 直前の合計より後に内訳だけの行が無い（区分に科目が1つ）場合は、判断の材料にしない（2期の表の同額の行と見分けられない）
      if (r.amounts.length === 2 && r.cols[0] < right && n > 0) {
        pairs++;
        if (acc !== 0 && Math.abs(acc + det - r.amounts[ti]) <= Math.max(1, Math.abs(r.amounts[ti]) * 0.0005)) hits++;
      }
      acc = 0; n = 0;
    }
    return hits >= 1 && hits / pairs >= 0.5;
  })();
  // 金額の列が2つあっても、前期・当期の2列とは限らない。
  // 中小企業の決算書は「内訳」「合計」の2列に金額を置く（単年）。前期・当期の表なら、ほとんどの行に金額が2つ並ぶが、
  // 内訳・合計の表では1行に金額は1つ（区分の最後の行だけ2つ）。取り違えると、内訳の列から存在しない「前期」を作ってしまう
  // （検証用の見本 T1 で確認）。
  // まず合計の行（「流動資産合計」「負債純資産合計」「営業利益」…）の金額の数で見分ける。前期・当期の表では合計の行にも
  // 両年の金額が並ぶが、内訳・合計の表では合計の行の金額は合計の列の1つだけ。注記など金額1つの行が同じページに多く並んでも
  // 影響を受けない（以前は金額2つの行の割合だけで見ていて、注記の多い2期の表を単年にし、前期を当期として読むことがあった。
  // 6回目の独立レビューの指摘）。
  // 合計の行が少なくて決められないときは、金額が2つある行の割合で見分ける（見出しで2期と分かった表は、より低い割合でだけ単年
  // とみなす。実物の決算書では、前期・当期の表は 84% 以上の行に金額が2つ、内訳・合計の表は 35% 以下だった）。
  // 合計の列が内訳の和になっていること（sig）では単年に変えない。2期の表でも偶然の一致はありうる（独立レビューの指摘）。
  if (kind === "years" && rows.length >= 5) {
    const TOTAL_RE = /(?:合計|総計)$|^(?:売上総|営業|経常|税引前当期純|税金等調整前当期純|当期純)(?:利益|損失)$/;
    const totals = rows.filter((r) => TOTAL_RE.test(keyOf(r.label)) && !isMemo(r.label));
    // 利益と損失を別の行に書く2期の損益計算書（前期は「営業損失」、当期は「営業利益」の行に金額があり、他方の欄は空白）では、
    // 段階利益の行がどれも金額1つになる。同じ段の利益の行と損失の行が別々の列に金額を持つなら、2期分の1つの合計とみなす
    // （7回目の独立レビューの指摘：黒字転換の年の2期の損益計算書を単年にし、前期を落としていた）。
    const byStage = new Map();
    for (const r of totals) {
      const m = /^(売上総|営業|経常|税引前当期純|税金等調整前当期純|当期純)(利益|損失)$/.exec(keyOf(r.label));
      if (m) { if (!byStage.has(m[1])) byStage.set(m[1], {}); byStage.get(m[1])[m[2]] = r; }
    }
    const paired = new Set();
    for (const { 利益: pr, 損失: ls } of byStage.values()) {
      if (pr && ls && pr.amounts.length === 1 && ls.amounts.length === 1 && Array.isArray(pr.cols) && Array.isArray(ls.cols) && pr.cols[0] !== ls.cols[0]) {
        paired.add(pr); paired.add(ls);
      }
    }
    const rest = totals.filter((r) => !paired.has(r));
    const nPair = paired.size / 2;
    const nTot = rest.length + nPair;
    const t2 = rest.filter((r) => r.amounts.length >= 2).length + nPair, t1 = rest.filter((r) => r.amounts.length === 1).length;
    let single;
    if (nTot >= 3 && t2 >= nTot * 2 / 3) single = false;
    else if (nTot >= 3 && t1 >= nTot * 2 / 3) single = true;
    else single = rows.filter((r) => r.amounts.length >= 2).length / rows.length < (byHeader ? 0.3 : 0.5);
    if (single) {
      kind = "single";
      for (const r of rows) r.kind = "single";
    }
  }
  // 当期を左、前期を右に置く表（公益法人の「当年度　前年度　増減」、会計ソフトの帳票の一部）。
  // 下の処理はすべて「右が当期」の前提なので、列の番号を入れ替えて「前期→当期」の順にそろえる。
  // 入れ替えないと、前年度を当期として読み、増減の向きが逆になる（独立レビューの指摘）。
  // 並びは、増減の列の金額の関係（dropChangeColumn。見出しより確か）で分かればそれを、無ければ見出し（headerOrder）で決める。
  // 見出しは「今期｜前期」「2025年3月期｜2024年3月期」「第44期｜第43期」のような言い回しもある（6回目の独立レビューの指摘）。
  if (kind === "years" && bands.length === 2) {
    const reversed = (arithOrder || headerOrder(words, bands)) === "reversed";
    if (reversed) {
      for (const r of rows) {
        if (!Array.isArray(r.cols)) continue;
        const idx = r.amounts.map((_, i) => i);
        const nc = r.cols.map((c) => (c === 0 ? 1 : c === 1 ? 0 : c));
        idx.sort((i, j) => nc[i] - nc[j]);
        r.amounts = idx.map((i) => r.amounts[i]);
        r.dash = idx.map((i) => (r.dash || [])[i]);
        r.cols = idx.map((i) => nc[i]);
      }
    }
  }
  // 内訳・合計の表なら、金額が2つある行の左は科目の金額、右は区分の合計（itemAt が使う）
  if (kind === "single" && sig) for (const r of rows) r.detailFirst = true;
  return { rows, kind };
}

/* ------------------------------------------------------------------ 科目辞書 */
// agg   … 集計済みの科目。1つでも見つかればそれを採用
// parts … 内訳科目。aggが無いときに全部足す
const BS_DICT = {
  // 会計ソフトの試算表の形（見出し「現金・預金」→ 科目 → 「現金・預金 合計」）では、合計の行の名前に「合計」が付く。
  // 辞書に無いと内訳の「現金」だけを拾い、預金を落としていた（6回目の独立レビューの指摘）
  cash: { agg: ["現金及び預金", "現金預金", "現金・預金", "現金及び現金同等物", "現金及び預金合計", "現金預金合計", "現金・預金合計"], parts: ["現金", "預金"] },
  receivables: { agg: ["受取手形及び売掛金", "売上債権", "受取手形、売掛金及び契約資産", "売掛金及びその他の短期債権", "受取手形及び売掛金(純額)", "営業債権及びその他の債権", "営業債権及び契約資産", "受取手形、売掛金及び契約資産(純額)"], parts: ["受取手形", "売掛金", "契約資産", "電気事業未収金", "電子記録債権", "売掛金及び契約資産", "完成工事未収入金", "受取手形及び電子記録債権"] },
  inventory: { agg: ["棚卸資産"], parts: ["商品及び製品", "商品", "製品", "仕掛品", "原材料及び貯蔵品", "原材料", "貯蔵品", "未成工事支出金", "販売用不動産", "仕掛販売用不動産", "未成業務支出金"] },
  // 合計の行を「…計」と書く様式（「流動資産計」）もある。辞書に無いと区分の合計が欠ける（8回目の独立レビューで気づいた）
  tangible: { agg: ["有形固定資産合計", "有形固定資産計", "有形固定資産"], parts: [] },
  currentAssets: { agg: ["流動資産合計", "流動資産計", "流動資産"], parts: [] },
  // IFRSは「非流動資産合計」。日本基準の「固定資産合計」と同じ位置づけ
  fixedAssets: { agg: ["固定資産合計", "非流動資産合計", "固定資産計", "非流動資産計", "固定資産"], parts: [] },
  deferred: { agg: ["繰延資産合計", "繰延資産計", "繰延資産"], parts: [] },
  payables: { agg: ["支払手形及び買掛金", "仕入債務", "買掛金及びその他の短期債務", "営業債務及びその他の債務"], parts: ["支払手形", "買掛金", "電気事業未払金", "電子記録債務", "工事未払金", "支払手形及び電子記録債務"] },
  shortDebt: { agg: [], parts: ["短期借入金", "1年内返済予定の長期借入金", "1年以内に期限到来の固定負債",
                                "1年内償還予定の社債", "コマーシャル・ペーパー", "リース債務",
                                "その他の短期金融負債", "リース負債", "短期借入債務", "リース債務流動", "1年以内返済長期借入金", "1年内返済予定長期借入金",
                                // 流動負債の節に載る「長期借入金」「社債」は1年内返済・償還分。
                                // 節を限定して拾うので、固定負債側の同名科目とは混ざらない。
                                "長期借入金", "社債"] },
  currentLiab: { agg: ["流動負債合計", "流動負債計", "流動負債"], parts: [] },
  longDebt: { agg: [], parts: ["長期借入金", "社債", "リース債務", "長期金融負債", "リース負債", "長期借入債務", "借入金", "社債及び借入金", "リース債務固定"] },
  fixedLiab: { agg: ["固定負債合計", "非流動負債合計", "固定負債計", "非流動負債計", "固定負債"], parts: [] },
  // 決算公告には合計行を置かず、区分の見出し行に金額を書く様式がある（「純資産の部 42,301,401」）。
  // 「純資産の部」を拾えないと、貸借が純資産のぶんだけ合わなくなる。
  equity: { agg: ["純資産合計", "純資産の部合計", "純資産計", "純資産の部計", "資本合計", "純資産の部", "純資産"], parts: [] },
  totalCapital: { agg: ["負債純資産合計", "負債及び純資産合計", "負債及び資本合計", "負債・純資産合計", "負債・純資産の部合計", "負債純資産の部合計", "負債純資産計", "負債及び純資産計", "負債及び純資産の部合計",
                       // 総資本は総資産と同額。上記が無い様式では資産側の合計で代用する
                       "資産合計", "資産の部合計", "資産の部計", "資産計"], parts: [] },
};
const PL_DICT = {
  // 事業別に売上を並べる様式（建設・不動産）では、合計行を先に見ないと
  // 最初の事業の売上だけを全社の売上として取り込んでしまう。
  // 実例：大東建託で 1,842,357 のところを 540,975（完成工事高）にしていた。
  sales: { agg: ["売上高合計", "営業収益合計", "売上収益合計", "売上高", "営業収益", "純営業収益",
                 "売上収益", "完成工事高", "事業収益", "営業収益及び営業外収益"], parts: [] },
  cogs: { agg: ["売上原価合計", "売上原価", "完成工事原価", "営業原価"], parts: [] },
  // ガス事業は「供給販売費及び一般管理費」。内訳の「一般管理費」だけを採らないよう、合計を先に置く
  // （実例：広島ガスで 24,778 のところ 5,274 にしていた）。
  sga: { agg: ["販売費及び一般管理費合計", "販売費及び一般管理費計", "販売費及び一般管理費",
               "供給販売費及び一般管理費合計", "供給販売費及び一般管理費",
               "販売費及び一般管理費等", "一般管理費", "販売費"], parts: [] },
  // IFRSには「営業利益」を置かず「コア営業利益」「事業利益」とする会社がある。
  // 本来の営業利益が見つかったときはそちらが優先されるよう、末尾に置く。
  operating: { agg: ["営業利益", "営業損失", "営業利益又は営業損失", "営業損失(△)", "コア営業利益", "事業利益"], parts: [] },
  // IFRSには営業外収益/費用が無い。金融収益・その他収益・持分法投資利益を合算して同じ位置に置く
  nonOpInc: { agg: ["営業外収益", "営業外収益合計"], parts: ["金融収益", "その他収益", "持分法による投資利益"] },
  nonOpExp: { agg: ["営業外費用", "営業外費用合計"], parts: ["金融費用", "その他費用", "持分法による投資損失"] },
  ordinary: { agg: ["経常利益", "経常損失", "当期経常利益", "経常利益又は経常損失"], parts: [] },
  extraInc: { agg: ["特別利益", "特別利益合計"], parts: [] },
  extraExp: { agg: ["特別損失", "特別損失合計"], parts: [] },
  // 「法人税等」は合計とはかぎらない。「法人税等」と「法人税等調整額」を別の行に置く様式があり、
  // 「法人税等」を合計として採ると調整額のぶんだけ税額を取り違える。
  // 実例：東京生活館で 147,774,199 のところを 219,353,700 にしていた。
  // 明示的な合計行だけを agg に置き、それ以外は内訳として足し合わせる。
  tax: { agg: ["法人税等合計", "法人所得税費用", "法人税、住民税及び事業税等合計"],
         parts: ["法人税、住民税及び事業税", "法人税住民税及び事業税", "法人税等", "法人税等調整額"] },
  net: { agg: ["当期純利益", "当期純損失", "当期利益", "中間利益", "中間(当期)利益", "親会社株主に帰属する当期純利益", "親会社の所有者に帰属する当期利益", "当期純利益又は当期純損失"], parts: [] },
};
const GROSS = { agg: ["売上総利益", "売上総利益合計", "営業総利益"], parts: [] };
// 売上高のほかに「営業収入」を並べる様式（小売業）。営業収益はこの合算になる。
const OPINCOME = { agg: ["営業収入合計", "営業収入", "その他の営業収入"], parts: [] };
// 辞書（BS_DICT・PL_DICT）か名前の型（ITEM_RE）に当たる科目名か。折り返した科目名をつなぐかどうかの判断に使う（rowsOf）
let KNOWN_KEYS = null;
function knownLabel(label, exactOnly = false) {
  if (!KNOWN_KEYS) {
    KNOWN_KEYS = new Set();
    for (const d of [BS_DICT, PL_DICT]) for (const spec of Object.values(d)) for (const n of [...(spec.agg || []), ...(spec.parts || [])]) KNOWN_KEYS.add(keyOf(norm(n)));
  }
  const k = keyOf(norm(label));
  return KNOWN_KEYS.has(k) || (!exactOnly && Object.keys(ITEM_RE).some((c) => isItem(c, label)));
}
const DEP = { agg: ["減価償却費", "減価償却費及びその他の償却費", "減価償却費及び償却費", "減価償却費及びのれん償却額", "減価償却及び償却費"], parts: [] };
const OPEX = ["営業費用", "営業費用合計", "営業費", "営業費合計", "経常費用", "経常費用合計"];

/**
 * 前期・当期の2列の表（金額の列がちょうど2本）で、その行の yi の年度の金額を返す。該当しなければ undefined。
 * 片方の年度の欄が空白（「－」も無い）の行を「行の右端＝当期」と読むと、前期の金額を当期として取り込む。
 * 列の位置で年度を決め、空白の欄は 0（その年度には残高が無い）とする。
 * 金額の列が3本以上の表（注記番号の列や、年度ごとに内訳・合計の2列がある表）は、列と年度の対応が決められないので対象外。
 */
function yearCell(r, yi) {
  if (r.kind !== "years" || r.nb !== 2 || !Array.isArray(r.cols) || r.cols.length !== r.amounts.length) return undefined;
  const i = r.cols.lastIndexOf(yi === -1 ? 1 : 0);
  return i >= 0 ? r.amounts[i] : 0;
}
/**
 * その行の科目そのものの金額。内訳・合計の2列の表（detailFirst）では、区分の最後の科目の行に
 * 「科目の金額（内訳の列）」と「区分の合計（合計の列）」が並ぶ。行の右端を採ると区分の合計を科目の値として読むので、
 * 内訳の列の金額を採る（例：「長期借入金 1,000　2,500」の 2,500 は固定負債の合計。独立レビューの指摘）。
 */
function itemAt(r, yi) {
  if (r.detailFirst && r.amounts.length === 2 && Array.isArray(r.cols) && r.cols[0] < r.cols[1]) return r.amounts[0];
  return amountAt(r, yi);
}
/** その行の yi の年度の欄に、本物の金額があるか（「－」や空白でないか） */
function realAt(r, yi) {
  const a = r.amounts, d = r.dash || [];
  if (r.kind === "years" && r.nb === 2 && Array.isArray(r.cols) && r.cols.length === a.length) {
    const i = r.cols.lastIndexOf(yi === -1 ? 1 : 0);
    return i >= 0 && !d[i];
  }
  const i = yi === -1 ? a.length - 1 : (a.length >= 2 ? a.length - 2 : a.length - 1);
  return i >= 0 && !d[i];
}
/** その行の yi の年度の金額。2列の表は列の位置で、それ以外は右から数える（当期＝右端、前期＝右から2番目） */
function amountAt(r, yi) {
  const y = yearCell(r, yi);
  if (y !== undefined) return y;
  const a = r.amounts;
  if (yi === -1) return a[a.length - 1];
  return a.length >= 2 ? a[a.length - 2] : a[a.length - 1];
}

/**
 * yi: -1=当期（右端）／0=前期（右から2番目）
 * 有報・短信には「注記」列があり、注記番号が数値として拾われることがある。
 * 先頭から数えると注記番号を金額として取り込むため、必ず右端から数える。
 */
function pull(rows, spec, yi) {
  const val = (r) => itemAt(r, yi);
  // 集計済みの科目は、辞書の順に最初に見つかった行を採る。ただし、その年度の欄が「－」や空白の行は後回しにする。
  // 利益の年と損失の年を別の行に書く様式（「営業利益 1,000 －」「営業損失 － 500」）で、
  // 損失の年に「営業利益」の「－」を採って 0 と読み、検算の警告まで出していた（独立レビューの指摘）。
  // 飛ばす先は、同じ科目の利益・損失の書き分け（「営業利益」→「営業損失」）に限る。
  // 別の科目（「当期純利益」→「親会社株主に帰属する当期純利益」）へ飛ぶと、違う数字を当期純利益にしてしまう。
  const concept = (n) => keyOf(n).replace(/損失/g, "利益").replace(/又は.*$/, "");
  let first = null;
  for (const name of spec.agg) {
    const k = keyOf(name);
    const r = rows.find((x) => keyOf(x.label) === k);
    if (!r) continue;
    if (first && concept(name) !== concept(first.name)) continue;
    if (realAt(r, yi)) return { value: val(r), source: name };
    if (!first) first = { r, name };
  }
  if (first) return { value: val(first.r), source: first.name };
  // 内訳の合算では、行の右端が「区分合計」であることがある。
  //   法人税、住民税及び事業税   477,659            ← 内訳の列
  //   法人税等調整額     29,373  507,032            ← 右端は区分合計の列
  // 右端をそのまま足すと、内訳と合計を両方足して二重計上になる。
  // 実例：テレビ大阪で法人税等が 507,032 → 984,691（＋94%）になっていた。
  //
  // かといって「金額が多い行は末尾を捨てる」では逆に壊れる。
  // 有価証券報告書には、隣の表の数値が1つだけ紛れ込んで
  // 前期・当期の左側に余分な列ができる行があり、そこでは捨てるべきは左端だからである。
  // 実例：キオクシアの「社債及び借入金」。
  //
  // そこで列の位置そのものを見る。足し合わせる科目すべてに共通して存在する列を選ぶ。
  // 内訳どうしは必ず同じ列に並ぶので、区分合計の列は自然に外れる。
  const partKeys = spec.parts.map(keyOf);
  const hits = rows.filter((x) => partKeys.includes(keyOf(x.label)));
  if (hits.length) {
    const col = commonCol(hits, yi);
    const valPart = (r) => {
      const y = yearCell(r, yi);
      if (y !== undefined) return y;
      if (r.detailFirst && r.amounts.length === 2) return itemAt(r, yi);
      if (col !== null) {
        const i = r.cols ? r.cols.indexOf(col) : -1;
        if (i >= 0) return r.amounts[i];
      }
      return val(r);
    };
    return { value: hits.reduce((a, r) => a + valPart(r), 0), source: hits.map((h) => h.label).join("＋") };
  }
  return { value: null, source: null };
}

/**
 * 合算する行すべてに共通して存在する金額列のうち、当期にあたるものを返す。
 * yi=-1 なら共通列の右端、yi=0 ならその1つ左。
 * 列を特定できないときは null を返し、呼び出し側は従来どおり行の右端を使う。
 */
function commonCol(hits, yi) {
  if (!hits.length || !hits.every((r) => Array.isArray(r.cols) && r.cols.length === r.amounts.length)) return null;
  let common = null;
  for (const r of hits) {
    const s = new Set(r.cols.filter((c) => c >= 0));
    if (!s.size) return null;
    common = common === null ? s : new Set([...common].filter((c) => s.has(c)));
    if (!common.size) return null;
  }
  const sorted = [...common].sort((a, b) => a - b);
  if (yi === -1) return sorted[sorted.length - 1];
  return sorted.length >= 2 ? sorted[sorted.length - 2] : sorted[sorted.length - 1];
}

/* ------------------------------------------------ 科目の分類（名前の型で判定） */
/**
 * 売上債権・棚卸資産・仕入債務・有利子負債は、完全一致の辞書では表記ゆれを拾いきれない。
 *   「一年以内返済予定長期借入金」（漢数字）「受取手形・完成工事未収入金等」「1年内期限リース債務」…
 * 辞書に無い科目が1つでもあると、見つかった内訳だけを足した「それらしい値」が画面に出て、誰も気づけない
 * （実例：新日本空調の売上債権が 68,375 のところ 2,093。電子記録債権だけを数えていた）。
 * そこで科目名に含まれる語の型で判定する。[含める語, 除く語] の組。
 */
const ITEM_RE = {
  // 「営業外受取手形」「営業外電子記録債務」は本業の取引ではない（設備の売却代金・購入代金など）ので除く
  receivables: [/受取手形|売掛金|売上債権|完成工事未収入金|完成業務未収入金|電子記録債権|契約資産|営業債権|営業未収入金|未収運賃|事業未収金/,
                /貸倒|引当|長期|固定化|破産|更生|割引|譲渡|営業外/],
  // 棚卸資産は表記が多い（販売用土地・未着品・積送品・開発事業等支出金…）。拾い残すと一部だけの合計になる。
  // 一方、損益計算書の売上原価の内訳（期首商品棚卸高・当期商品仕入高）や、商品化権・金融派生商品・未払商品代金のように
  // 「商品」「製品」を含むだけの別の科目は除く
  inventory: [/棚卸|たな卸|商品|製品|仕掛|原材料|原料|材料|貯蔵品|支出金|販売用|販売土地|未着品|積送品|制作勘定|在庫/,
              /前渡|前払|仮払|未収|未払|貸倒|引当|評価|券|保証|有価証券|金融|派生|権|棚卸高|たな卸高|仕入高|売上|原価|費|損/],
  payables: [/支払手形|買掛金|仕入債務|電子記録債務|工事未払金|営業未払金|営業債務|受託販売未払金|事業未払金/,
             /設備|引当|営業外/],
  debt: [/借入金|社債|コマーシャル・?ペーパー|^CP$|リース債務|リース負債|借入債務|有利子負債|期限到来の固定負債/,
         /未払|前受|引当|預り|保証|繰延|利息|発行費|評価|貸付/],
};
// 「その他の営業債権」のような「その他の…」は雑多な科目なので、売上債権・仕入債務には数えない
// （IFRSの「営業債権及びその他の債権」は「その他」で始まらないので影響しない）
// 「（うち1年内返済予定長期借入金）」のような内書きは、上の行の内数なので足さない
const isMemo = (label) => /^[(（](?:うち|内)|^(?:うち|内訳)|^内\s*[、,，:：]?\s*(?=[0-9０-９一１])/.test(String(label).trim()) || /^うち/.test(keyOf(label));
const isItem = (cat, label) => {
  const k = keyOf(label); const [inc, exc] = ITEM_RE[cat];
  if (isMemo(label)) return false;
  if ((cat === "receivables" || cat === "payables") && /^その他/.test(k)) return false;
  // 不動産業の「販売用不動産信託受益権」は棚卸資産（「権」を含むが、販売用として持つ不動産の持分）
  if (cat === "inventory" && /^販売用.*受益権$/.test(k)) return true;
  return inc.test(k) && !exc.test(k);
};

/**
 * 流動資産の区間（見出し「流動資産」から「流動資産合計」まで。合計行が無ければ、次の区分の見出しの手前まで）。
 * 売上債権・棚卸資産を名前で探すときに、非流動資産の同名科目（IFRSの非流動の「営業債権及びその他の債権」）や、
 * 同じページに載った損益計算書の行（期首商品棚卸高など）を拾わないようにする。区切れなければ null。
 */
function sliceCurrentAssets(rows) {
  const find = (re, from = 0) => { for (let i = from; i < rows.length; i++) if (re.test(keyOf(rows[i].label))) return i; return -1; };
  const hCA = find(/^流動資産$/);
  let start = hCA >= 0 ? hCA : 0;
  const endCA0 = find(/^(?:流動資産合計|流動資産の部合計)$/);
  // 見出し行が無いとき：非流動資産（固定資産）を先に書く様式（IFRS は順序を問わない）では、
  // その合計行の次から流動資産が始まる。先頭からにすると非流動の「営業債権及びその他の債権」まで数える（独立レビューの指摘）
  if (hCA < 0 && endCA0 > 0) {
    for (let i = 0; i < endCA0; i++) if (/^(?:非流動資産合計|固定資産合計|繰延資産合計)$/.test(keyOf(rows[i].label))) start = i + 1;
  }
  const endCA = find(/^(?:流動資産合計|流動資産の部合計)$/, start);
  if (endCA >= 0) return rows.slice(start, endCA + 1);
  const next = find(/^(?:固定資産|非流動資産|固定資産合計|非流動資産合計|資産合計|資産の部合計|繰延資産)$/, start + 1);
  return next > start ? rows.slice(start, next) : null;
}
// 流動・固定の区切りが分からないときに、名前だけで短期・長期を見分ける
const SHORT_DEBT = /短期|1年|一年|コマーシャル|^CP$|期限到来/;
const LONG_DEBT = /長期|社債/;

/**
 * 条件に合う行をすべて足す。内訳どうしは同じ列に並ぶので共通の列を使う（区分合計の列を足さない）。
 *
 * 「内訳」列に内訳、「合計」列に合計行を置く様式では、同じ科目群を二重に数えてしまう。
 * そこで、共通の列が無く、右端の列にある行が1行だけで、その値が残りの行の和に一致するときに限り、その1行を採る。
 * 値の一致だけで判断してはいけない。短期借入金 7,000 ＋ CP 13,000 ＝ 1年内返済予定の長期借入金 20,000
 * のような偶然の一致で、正しい合計 40,000 を 20,000 にしてしまう（実例：鉄道会社の決算公告）。
 */
function pullBy(rows, pred, yi) {
  const hits = rows.filter(pred);
  if (!hits.length) return { value: null, source: null };
  // 2列の表（前期・当期）は、行ごとに列の位置で年度を決める（空白の欄は0）
  if (hits.every((r) => yearCell(r, yi) !== undefined)) {
    return { value: hits.reduce((a, r) => a + yearCell(r, yi), 0), source: hits.map((h) => h.label).join("＋") };
  }
  const col = commonCol(hits, yi);
  const pick = (r) => {
    // 内訳・合計の表で、科目の金額と区分の合計が同じ行に並ぶときは、内訳の列（左）が科目の金額
    if (r.detailFirst && r.amounts.length === 2 && r.cols && r.cols[0] < r.cols[1]) return 0;
    if (col !== null) { const i = r.cols ? r.cols.indexOf(col) : -1; if (i >= 0) return i; }
    const n = r.amounts.length;
    return yi === -1 ? n - 1 : (n >= 2 ? n - 2 : n - 1);
  };
  const vals = hits.map((r) => r.amounts[pick(r)]);
  const sum = vals.reduce((a, b) => a + b, 0);
  // 小計行と内訳1行だけ（2行）のときも同じ形になる（「売上債権 3,000」と内訳「売掛金 3,000」）。
  // ただし2行の場合は、前期・当期の表では列が年度を表すので判定しない（3行以上は従来どおり、年度ごとに内訳・合計の列がある表にも使う）
  if (col === null && hits.every((r) => Array.isArray(r.cols)) &&
      (hits.length >= 3 || (hits.length === 2 && hits.every((r) => r.kind !== "years")))) {
    const colOf = hits.map((r, i) => r.cols[pick(r)]);
    const right = Math.max(...colOf);
    const inRight = colOf.map((c, i) => (c === right ? i : -1)).filter((i) => i >= 0);
    if (inRight.length === 1 && colOf.some((c) => c !== right)) {
      const i = inRight[0];
      // 一致の許容：2行なら完全一致だけ（小計行とその内訳1行は同じ金額になる）。3行以上は、内訳の端数処理で
      // 生じうる「行数−1」単位まで。割合で許すと、大きな金額どうしの偶然の近さで合計扱いしてしまう（独立レビューの指摘）
      if (Math.abs(sum - 2 * vals[i]) <= (hits.length === 2 ? 0 : hits.length - 1)) return { value: vals[i], source: hits[i].label + "（合計列の行）" };
    }
  }
  return { value: sum, source: hits.map((h) => h.label).join("＋") };
}

/* ------------------------------------------------------------ 財務諸表の特定 */
/**
 * 見出しの検出。
 * pdf.js はテキストを content stream の順で返すため、見出しがページ末尾に来ることがある。
 * したがって「先頭◯文字」ではなくページ全文から探す。
 */
// 「要約中間連結損益計算書」「連結財政状態計算書」「貸借対照表」など語順・修飾語の差を吸収する
// 損益と包括利益を1つの表にまとめる様式（1計算書方式）は「連結損益及び包括利益計算書」
// 「連結純損益及びその他の包括利益計算書」と書き、「損益計算書」の語を含まない。
// 見出しと認めないと連結の損益計算書が見つからず、単体の損益計算書を連結の貸借対照表と
// 組み合わせてしまう（数字は自然に見えるので気づけない）。
const HEAD_RE = /(?:【([^】]{0,12}?)】?|([^\n]{0,12}?))(財政状態計算書|貸借対照表|純?損益及び(?:その他の)?包括利益計算書|損益計算書|キャッシュ・?フロー計算書)/g;

function headingsOf(pageText) {
  const out = [];
  HEAD_RE.lastIndex = 0;
  let m;
  while ((m = HEAD_RE.exec(pageText)) !== null) {
    // 直前12文字のうち、見出しに直接つながる修飾語だけを見る。
    // 「…包括利益計算書】【要約中間連結損益計算書」のように直前に別の見出しが
    // 来ることがあるため、最後の「】」より後ろだけを修飾語として扱う。
    let mod = (m[1] || m[2] || "");
    const cut = mod.lastIndexOf("】");
    if (cut >= 0) mod = mod.slice(cut + 1);
    mod = mod.replace(/^[^ぁ-んァ-ヶ一-龥]+/, "");     // 先頭の数字・記号を落とす
    // 「２．四半期連結財務諸表及び主な注記（１）四半期連結貸借対照表」のように、
    // 直前に別の見出しの語が来ることがある。「注記」「財務諸表」より後ろだけを修飾語とする。
    for (const cutWord of ["注記", "財務諸表等", "財務諸表"]) {
      const j = mod.lastIndexOf(cutWord);
      if (j >= 0) { mod = mod.slice(j + cutWord.length).replace(/^[^ぁ-んァ-ヶ一-龥]+/, ""); break; }
    }
    if (/包括利益$/.test(mod)) continue;               // 包括利益計算書はPLではない
    if (/計上額|について|に関する|における|場合|とき|より|ため/.test(mod)) continue;  // 本文中の言及を除く
    const kind = /財政状態|貸借/.test(m[3]) ? "BS" : /損益/.test(m[3]) ? "PL" : "CF";
    out.push({ kind, text: mod + m[3], consolidated: mod.includes("連結") });
  }
  return out;
}

/** 見出しではなく中身で財務諸表と判断できるか（見出しが別ページにある場合の保険） */
function bodyLooksLike(kind, labels) {
  const keys = new Set([...labels].map(keyOf));
  const has = (...ks) => ks.some((k) => keys.has(keyOf(k)));
  // 電気事業・ガス事業の貸借対照表は合計行を「合計」としか書かず、
  // 「流動資産合計」「資産合計」のいずれも存在しない。
  // 区分の見出し行だけで構成されるため、それを手掛かりに認める。
  // これが無いと、見出しは正しく取れているのに本文で弾かれて丸ごと欠測になる。
  if (kind === "BS" && has("流動資産") && has("固定資産", "非流動資産")) return true;
  if (kind === "BS") return has("流動資産合計", "非流動資産合計", "固定資産合計", "資産合計",
                                "流動負債合計", "非流動負債合計", "負債合計", "資本合計", "純資産合計",
                                // 決算公告は「合計」ではなく「〜の部合計」と書く様式がある
                                "資産の部合計", "負債の部合計", "純資産の部合計",
                                "負債・純資産合計", "負債純資産合計", "負債及び純資産合計",
                                // 「…計」と書く様式
                                "流動資産計", "固定資産計", "資産計", "流動負債計", "固定負債計", "負債計", "純資産計", "負債純資産計");
  // 利益科目が無いものは損益計算書とみなさない。
  // 「売上高」だけを条件にすると、経営指標の推移表などを誤って拾う。
  if (kind === "PL") return has("営業利益", "営業損失", "営業利益又は営業損失", "経常利益", "当期経常利益",
                                "税引前利益", "税引前中間利益", "税引前当期純利益", "税金等調整前当期純利益",
                                "当期純利益", "当期純損失", "中間利益", "売上総利益");
  // CF計算書から取るのは減価償却費だけなので、その行があるかで判断する。
  // IFRSの有価証券報告書は「減価償却費及び償却費」と書くため、DEP の全表記を認める。
  // これが無いとCF計算書を見落とし、セグメント情報など複数ページの値を合算してしまう（二重計上）。
  if (kind === "CF") return has(...DEP.agg);
  return false;
}

/**
 * PDF全体を走査して BS/PL/CF を特定する。
 *
 * 重要な設計:
 *   ・連結を単体より優先する。混ざると貸借が合わなくなり、しかも数字は自然に見えるため気づけない
 *   ・BSは資産の部と資本の部で2ページに分かれることがある（IFRS・有報で頻出）。
 *     見出しページに続く「同じ表の続き」を結合する
 */
/* ------------------------------------------------- 会社名・金額単位の検出 */
const CO_KINDS = ["株式会社", "有限会社", "合同会社", "合資会社", "合名会社"];
// 会計用語や住所の断片が混ざっていたら、それは会社名ではなく本文の切れ端
const CO_NG = /資産|負債|利益|損失|費用|収益|合計|計算書|報告書|剰余金|余金|原価|税引|除却|配当|事項|営業外|注記|明細|科目|金額|株主資本|変動|附属|監査|決算|貸借|損益|現在|まで|から|支社|支店|本社|営業所|御中|様|作成|[0-9]\s*[年月日]/;
// 提出会社ではないのに有価証券報告書の表紙に必ず載る名前。これを社名として拾わない。
const CO_EXCLUDE = /証券取引所|取引所|信託銀行|証券代行|監査法人|会計事務所|印刷|EDINET|縦覧/;
const CO_OK = /^[ぁ-んァ-ヶ一-龥々ａ-ｚＡ-Ｚa-zA-Z0-9・ー]{2,20}$/;

/**
 * 決算書の金額単位を返す。決算書は必ず「（単位：千円）」等を明記している。
 * 本シートは百万円で計算するため、換算に使う。取り違えると規模と与信限度額が桁違いになる。
 */
export function detectUnit(pageTexts) {
  const t = pageTexts.join("");
  // ①「（単位：千円）」が最も確実。決算書・計算書類はほぼこの形
  let m = t.match(/単位[：:]?\s*([百千]?万?円)/);
  // ②有価証券報告書は「売上高(百万円)」「営業収益(百万円)」のように項目名に単位を付ける
  if (!m) m = t.match(/(?:売上高|営業収益|経常収益|純資産額|総資産額)[（(]([百千]?万?円)[）)]/);
  // 決算公告には「（単位：〜）」を書かず、金額欄の見出しに単位だけを置く様式がある。
  // 例:「科目 金額 科目 金額 円 円 流動資産 …」
  if (!m) m = t.match(/金[\s　]*額[）)]?[\s　]*[（(]?([百千]?万?円)/);
  // 単位の表示が一切なく、表の下の注記だけが単位を語っている決算公告がある。
  // 例:「記載金額は、千円未満の端数を切り捨てて表示しております。」
  // ここを読み落とすと桁が3つも6つもずれるため、必ず拾う。
  if (!m) m = t.match(/([百千]?万?円)未満(?:の端数)?[をは]?切(?:り)?捨/);
  if (!m) return null;
  const u = m[1];
  if (u === "百万円") return { label: "百万円", toMillion: 1 };
  if (u === "千円") return { label: "千円", toMillion: 1 / 1000 };
  if (u === "万円") return { label: "万円", toMillion: 1 / 100 };
  if (u === "円") return { label: "円", toMillion: 1 / 1000000 };
  return null;
}

/**
 * ページの語を「行」にまとめ、行の中の大きなすき間（文字の高さの4倍超）でさらに区切った「かたまり」を返す。
 * 決算公告は1行に「社名 …（大きな空白）… （単位：円）」「第16期 …（大きな空白）… 社名」のように
 * 別の情報を並べるため、すき間で切らないと社名に余計な語が付く。
 * 1文字ずつ間を空けて組む社名（「東　京　ド　ー　ム」）のすき間は文字の高さの1〜2倍なので、切れない。
 */
function segmentsOf(words) {
  const byTop = new Map();
  for (const w of words) {
    if (!byTop.has(w.top)) byTop.set(w.top, []);
    byTop.get(w.top).push(w);
  }
  const segs = [];
  for (const [top, ws] of [...byTop.entries()].sort((a, b) => a[0] - b[0])) {
    ws.sort((a, b) => a.x0 - b.x0);
    let cur = null;
    for (const w of ws) {
      const h = Math.max(w.fs || 10, cur ? cur.fs : 0);
      if (cur && w.x0 - cur.x1 <= h * 4) { cur.text += w.text; cur.x1 = Math.max(cur.x1, w.x1); cur.fs = h; }
      else { if (cur) segs.push(cur); cur = { text: w.text, x0: w.x0, x1: w.x1, top, fs: w.fs || 10 }; }
    }
    if (cur) segs.push(cur);
  }
  return segs;
}

// 社名の直後・直前に来やすく、社名の一部にはならない語。ここで切る
// 日付（「令和7年3月31日現在」「2025年3月31日」）も社名の一部にはならない。社名と日付が1つのかたまりになる見出し
// （「株式会社◯◯　　令和7年3月31日現在」）で、日付ごと社名と見て捨てていた（6回目の独立レビューの指摘）
const CO_STOP = /(代表取締役|代表執行役|取締役社長|取締役|代表社員|代表理事|代表者|理事長|執行役員|貸借対照表|損益計算書|株主資本等変動計算書|個別注記表|決算公告|決算報告書|計算書類|事業報告|第\d+期|〒|電話|TEL|FAX|作成|御中|(?:令和|平成|昭和)(?:\d{1,2}|元)年|(?:19|20)\d{2}年)/;
// 社名の本体（会社の種類を除いた部分）に使える文字。norm 後なので英数字は半角
const CO_PART = /^[ぁ-んァ-ヶ一-龥々a-zA-Z0-9・ー&.'\-]{1,30}$/;

/**
 * かたまりの文字列から社名（「株式会社◯◯」「◯◯株式会社」）を取り出す。社名と決められなければ null。
 * 前後の語（代表取締役・日付・書類名・住所）は CO_STOP などで落とす。
 */
function companyNameIn(s) {
  const m = s.match(/株式会社|有限会社|合同会社|合資会社|合名会社/);
  if (!m) return null;
  let pre = s.slice(0, m.index), post = s.slice(m.index + m[0].length);
  const cut = post.split(CO_STOP)[0];
  // 日付で切った残りが助詞で終わる（「株式会社ABCを2024年4月1日付で…」）のは文の途中。社名ではない（7回目の独立レビューの指摘）。
  // 日付で切ったときだけ、社名の終わりにならない助詞（を・に・は・が・で・へ）に限る。「株式会社いなげや」「株式会社たねや」の
  // ような社名まで捨てていた（8回目の独立レビューの指摘）
  const dateCut = /^(?:(?:令和|平成|昭和)(?:\d{1,2}|元)年|(?:19|20)\d{2}年)/.test(post.slice(cut.length));
  if (dateCut && /[をにはがでへ]$/.test(cut)) return null;
  // 区切りの語（代表取締役・貸借対照表・第N期・作成…）の手前が、漢字・カタカナ・英字のすぐ後ろの助詞で終わるのも文の途中
  // （「株式会社ABCの貸借対照表」「株式会社サンプル工業が作成した…」「株式会社南西物産の代表取締役を兼務…」。9回目の独立レビューの指摘）。
  // ひらがなのすぐ後ろの助詞は社名の一部のことが多いので残す（やまと・まこと・かえで・いろは・なかの・ひらの・こが・まつなが）。
  // 「ひらがな＋ー＋と」も社名の終わりとみなす（はーと・さぽーと・すまーと）。「ー」の後ろのほかの助詞（「株式会社ぱわーが作成」
  // 「株式会社ふぁみりーの代表取締役を兼務」）や、カタカナの後ろの「ー」（スーパーの…）は文の途中とみなす（13回目の独立レビューの指摘）。
  // pdf.js は空白を別の語にして読み取りの途中で落とすので、
  // 社名の後ろの空白では見分けられない（10回目の独立レビューの指摘）。
  // 11回目は助詞を外して読むようにしたが、ひらがなの社名の最後の字を削り（なかの→なか）、文の中の別の会社の名前を
  // きれいな社名にしてしまった（12回目の独立レビューの指摘）ので、10回目の決まりに戻した。
  // 送付状の「株式会社さくらの第12期決算報告書を…」のような文は、社名を選ぶところ（companyFromLines）で、
  // 「の」を除いた同じ名前の候補（決算書のページの「株式会社さくら」）があればそちらを採る
  if (cut !== post && /[をにはがでへとの]$/.test(cut) && !/[\u3041-\u309f][をにはがでへとの]$|[\u3041-\u309f]\u30fcと$/.test(cut)) return null;
  post = cut.replace(/[(（][^)）]*[)）]?$/, "");   // 「(E26815)」「（9831）」
  if (/(本社|本店|支社|支店|営業所|事業所|工場)$/.test(post)) post = "";  // 「◯◯株式会社東京本社」
  pre = pre.split(CO_STOP).pop()
    .replace(/^.*(?:会社名|商号|名称)[:：]?/, "")
    .replace(/^.*(?:丁目|番地|[0-9]+番[0-9]*号?|[0-9]+号)/, "")       // 住所の名残り
    .replace(/^[0-9]+/, "");
  if (pre && post) return null;                     // 両側に語がある＝文章の途中。社名と決められない
  const body = pre || post;
  if (!body || !CO_PART.test(body) || CO_NG.test(body)) return null;
  const name = pre + m[0] + post;
  return CO_EXCLUDE.test(name) ? null : name;
}

/**
 * 決算書（貸借対照表・損益計算書）のページか。社名の候補の順位づけに使う（companyFromLines）。
 *  ・表題のかたまり：飾り（■・1.・＜＞）、期・日付（第44期・令和6年度・令和7年3月31日現在・自…至…）、社名、
 *    「決算報告書」「の要旨」「及び」を除くと、「貸借対照表」「損益計算書」などの語だけになるかたまりがある
 *  ・または、貸借対照表・損益計算書の科目の行（流動資産・資産合計・売上高・営業利益…）が3種類以上ある
 * 送付状の「添付書類：直近2期分の貸借対照表・損益計算書」「決算書（貸借対照表…）送付のご案内」は表題ではない。
 * 送付状・案内状の語（送付・ご案内・拝啓・記…）があるページや、別々の表題が2つ以上並ぶページ（目次・同封書類の一覧）は、
 * 科目の行が無ければ決算書のページとしない。
 * 戻り値は "title"（表題で分かった）/ "body"（科目の行で分かった）/ false。
 * 6回目は表題が単独のかたまりのときだけ認めていたため、「貸借対照表 令和7年3月31日現在」「令和6年度 貸借対照表」
 * 「株式会社◯◯ 貸借対照表」のような表題のページを決算書のページと認めず、送付状の差出人を社名に選んでいた
 * （7回目の独立レビューの指摘）。
 */
const STMT_WORDS = /(?:要約)?(?:中間)?(?:連結|個別)?(?:比較)?(?:貸借対照表|損益計算書|財政状態計算書|損益及び包括利益計算書|包括利益計算書|株主資本等変動計算書|(?:合計)?(?:残高)?試算表)/g;
const STMT_BODY = /^(?:流動資産|固定資産|流動負債|固定負債|資産の部|負債の部|純資産の部|資産合計|負債合計|純資産合計|負債純資産合計|売上高|売上原価|売上総利益|販売費及び一般管理費|営業利益|営業外収益|営業外費用|経常利益|当期純利益)/;
function isStatementPage(segs) {
  const body = new Set();
  const titles = [];
  let letter = false;
  for (const sg of segs) {
    const t = norm(sg.text);
    const m = STMT_BODY.exec(t);
    if (m) body.add(m[0]);
    // 送付状・案内状の語。同封の書類の一覧（「1. 貸借対照表」「2. 損益計算書」）を表題と取り違えないため
    if (/送付|ご案内|拝啓|謹啓|敬具|謹白|同封|添付|^記$|下記/.test(t)) letter = true;
    if (t.length > 50 || !new RegExp(STMT_WORDS.source).test(t)) continue;
    const rest = t.replace(STMT_WORDS, "")
      .replace(/決算報告書|計算書類|決算公告|の要旨|要旨|及び|並びに|単位[:：]?(?:千|百万)?円/g, "")
      .replace(/第\d+期|(?:令和|平成|昭和)(?:\d{1,2}|元)年度?|(?:19|20)\d{2}年度?|\d{1,2}月\d{1,2}日|\d{1,2}月期|現在|自|至|まで|から/g, "")
      .replace(/[■□●○◆◇◎・＜＞<>【】\[\]「」『』()（）\d.．\/〜~\-－:：、,\s]/g, "");
    if (!rest || /^(?:(?:株式会社|有限会社|合同会社|合資会社|合名会社).{1,20}|.{1,20}(?:株式会社|有限会社|合同会社|合資会社|合名会社))$/.test(rest)) {
      titles.push([...t.matchAll(STMT_WORDS)].map((x) => x[0]).join("・"));
    }
  }
  if (body.size >= 3) return "body";
  if (letter) return false;
  // 表題が1つ（貸借対照表と損益計算書を1ページに載せるなら「貸借対照表及び損益計算書」のような1つのかたまり）なら決算書のページ。
  // 別々のかたまりに2つ以上の表題が並ぶのは、目次か同封の書類の一覧（8回目の独立レビューの指摘）
  return new Set(titles).size === 1 ? "title" : false;
}

/**
 * 先頭3ページの「かたまり」から会社名を探す。
 * 宛名（「株式会社◯◯銀行 御中」）は提出先であって作成した会社ではないので、候補にしない（社名は控えておく）。
 * 宛名は次の形をとる（6回目の独立レビューの指摘で、2行・同じ行の部署名の形を加えた）。
 *   株式会社◯◯銀行 御中／株式会社◯◯ 代表取締役 ◯◯ 様（1つのかたまり）
 *   株式会社◯◯　　与信管理部　　御中（大きなすき間で3つのかたまり）
 *   株式会社◯◯銀行
 *   渋谷支店 御中（2行。御中の行の上の行で、左端がそろっているもの）
 * 候補の順位：
 *   0 … 宛名の会社で、決算書のページ（isStatementPage）にも載るもの
 *        （会計事務所が顧問先に送る「株式会社◯◯ 御中」の書類に、その会社の決算書が綴じてある）
 *   1 … ふつうの候補
 *   2 … 宛名の会社だが、決算書のページには載らないもの（利用者の会社宛ての送付状・調査票の欄外の社名かもしれない。
 *        ただし顧問先宛ての送付状で、決算書のページに社名が無い場合もあるので、会計系の社名よりは先にする）
 *   3 … 「作成」と明記された、会計系の名前（会計・税理士・記帳…）の作成者（表紙・送付状に載る会計事務所）
 * 同じ順位の中では、前のページ → （同じページでは）ふつうの候補 → 作成者・決算書のページの宛名 → 会計系の名前 →
 * かたまりが社名だけ → 上の行。
 * 「作成」と明記された作成者でも、会計系の名前でなければ会社自身のことがある（自社で作成した決算書）ので、順位1に置く。
 * 会計系の名前でも「作成」と明記されていなければ、その会社自身（記帳代行の会社の決算書）のことがあるので、順位1に置く。
 * 以前（5回目）は作成者をページの中でだけ後回しにしていたため、1ページ目の送付状の作成者（会計事務所）を選ぶことがあった。
 * 決算書のページの判断も、「貸借対照表」の語がどこかにあるかで見ていたため、送付状の「添付書類：貸借対照表…」で
 * 決算書のページと取り違えていた（いずれも6回目の独立レビューの指摘）。
 */
// 決算書の提出先になる金融機関（宛名に使う）。銀行・中央金庫・公庫。宛名は「株式会社琉球銀行本店営業部」のように部署名が
// 続くことがあるので、名前のどこにあってもよい（11回目は名前の終わりだけにしていて、部署名の付いた銀行を社名に選んでいた。
// 12回目の独立レビューの指摘）。信用金庫・信用組合・農協は株式会社でないので、もともと社名の候補にならない。
// リース・クレジット・ファクタリングなどは入れない：語の途中に当たる（ファミ「リース」トア）うえ、会計事務所の顧問先の社名にもある
// （10回目はこれらも入れていて、試算表の宛名の顧問先を捨てていた。11回目の独立レビューの指摘）。そのため、決算書のページに
// リース会社などの宛名が載り、会社名が表紙にだけある様式では、宛名の会社を選ぶ（既知の限界）
const FIN_ADDR = /銀行|中央金庫|商工中金|公庫/;
function companyFromLines(segPages) {
  if (!Array.isArray(segPages)) return null;
  const cands = [];
  const addressed = new Set();   // 宛名として出てきた社名
  const KIND = /株式会社|有限会社|合同会社|合資会社|合名会社/;
  const ADDR_END = /(?:御中|殿|様)$/;
  const stmtPage = segPages.map((segs) => isStatementPage(segs || []));
  segPages.forEach((segs, pi) => {
    const list = segs || [];
    // 宛名のかたまりを集める
    const inAddr = new Set();
    for (const a of list) {
      const t = norm(a.text);
      if (!ADDR_END.test(t) && !/^御中/.test(t)) continue;
      inAddr.add(a);
      if (KIND.test(t)) continue;   // 社名まで1つのかたまりに入っている
      // 同じ行の左：部署名などを飛ばして、最初の社名まで
      const left = list.filter((x) => x !== a && Math.abs(x.top - a.top) <= 1 && x.x1 <= a.x0 + 1).sort((p, q) => q.x0 - p.x0);
      let found = false, bx = a.x0;
      for (const x of left) {
        const xt = norm(x.text);
        if (KIND.test(xt)) { inAddr.add(x); found = true; break; }
        if (xt.length > 15) break;   // 部署名らしくない長い語（本文）があれば、宛名ではない
        inAddr.add(x);
        bx = Math.min(bx, x.x0);
      }
      if (found) continue;
      // 上の行：宛名の行（部署名・氏名を含む）と左端がそろい、行の間隔が狭いもの（2行まで）
      let cur = a;
      for (let step = 0; step < 2; step++) {
        const fs = cur.fs || 10;
        const up = list.filter((x) => x.top < cur.top && cur.top - x.top <= fs * 2.5 && Math.abs(x.x0 - bx) <= 40)
                       .sort((p, q) => q.top - p.top);
        if (!up.length) break;
        inAddr.add(up[0]);
        if (KIND.test(norm(up[0].text))) break;
        cur = up[0];
      }
    }
    const lineOf = (sg) => list.filter((x) => x.top === sg.top).sort((a, b) => a.x0 - b.x0);
    const neighbor = (sg, d) => { const ln = lineOf(sg); const j = ln.indexOf(sg) + d; return j >= 0 && j < ln.length ? norm(ln[j].text) : ""; };
    list.forEach((sg, si) => {
      const s = norm(sg.text);
      if (inAddr.has(sg)) {
        const nm = companyNameIn(s.replace(/(?:御中|殿|様)$/, ""));
        if (nm) {
          addressed.add(nm);
          // 決算書のページそのものに宛名として載る社名（会計事務所が作る決算書・試算表の各ページの「株式会社◯◯ 様」）は、
          // その会社の決算書なので候補にする（そのページの差出人の会計事務所より先。7回目の独立レビューの指摘）。
          // （表題だけで判断していたため、科目の行のある本物の試算表のページで候補にならなかった。9回目の独立レビューの指摘）
          // 銀行・公庫の宛名は、決算書を出す先であって決算書の会社ではないので候補にしない（決算書のページに
          // 「株式会社◯◯銀行 御中」と載せて出す様式。9回目の直し方では、そのページに会社名が無いと銀行を選んでいた。10回目の独立レビューの指摘）
          if (stmtPage[pi] && !FIN_ADDR.test(nm)) cands.push({ name: nm, whole: false, page: pi, idx: si, acct: false, prep: false, onStmtAddr: true });
        }
        return;
      }
      if (/御中/.test(s)) return;
      // 作成者：会計事務所のことも、その会社自身のこともあるので、除かずに後回しにする
      const prep = /^(?:作成|作成者)[:：]?$/.test(neighbor(sg, -1));
      const name = companyNameIn(s);
      if (!name) return;
      const acct = /会計|税理士|税務|監査|アカウンティング|記帳/.test(name);
      cands.push({ name, whole: name === s, page: pi, idx: si, acct, prep });
    });
  });
  if (!cands.length) return null;
  // 決算書のページに宛名として載る社名（onStmtAddr）は順位1。同じページの中では、ふつうの候補より後、会計系の名前より先
  // （7回目は順位0にしていて、決算書のページに載る銀行宛ての「◯◯銀行 御中」を社名に選んでいた。8回目の独立レビューの指摘）
  // 宛名のページに、宛名でもなく会計系でもない社名の候補が無ければ、宛名が決算書の会社（会計事務所が顧問先に作る試算表）なので順位0。
  // あれば順位1で、そのページのふつうの候補の後（銀行宛ての「◯◯銀行 御中」が載る決算書のページで、決算書の会社を選ぶため）。
  // 9回目の独立レビューの指摘：順位1に固定していたため、1ページ目の会計事務所の送付状の差出人に負けていた
  // ページの最後の行（フッター）の社名は、作成者・印刷した会社のことが多いので「ふつうの候補」に数えない
  // （9回目の独立レビューの指摘：試算表のページのフッターの「株式会社ミライ経営」に、宛名の顧問先が負けていた）
  const lastTop = segPages.map((segs) => Math.max(-Infinity, ...(segs || []).map((sg) => sg.top)));
  const footer = (c) => { const sg = (segPages[c.page] || [])[c.idx]; return !!sg && sg.top >= lastTop[c.page] - 2 * (sg.fs || 10) && (segPages[c.page] || []).length > 3; };
  const plainOn = new Set(cands.filter((c) => !c.onStmtAddr && !c.acct && !addressed.has(c.name) && !footer(c)).map((c) => c.page));
  const tier = (c) => (c.onStmtAddr ? (plainOn.has(c.page) ? 1 : 0) : addressed.has(c.name) && stmtPage[c.page] ? 0 : c.acct && c.prep ? 3 : addressed.has(c.name) ? 2 : 1);
  const sub = (c) => (c.acct ? 2 : c.onStmtAddr || c.prep ? 1 : 0);
  cands.sort((a, b) => (tier(a) - tier(b)) || (a.page - b.page) || (sub(a) - sub(b)) || (b.whole - a.whole) || (a.idx - b.idx));
  // 選んだ候補が、かたまりの中で助詞（の・が・を・に・へ）と区切りの語の手前で切れた名前（送付状の「株式会社さくらの第12期決算報告書を
  // 送付…」）で、その助詞を除いた同じ名前が、ほかの候補か宛名にあれば、そちらを採る（11回目の独立レビューの指摘）。
  // 区切りの語が続かない名前（表紙の「株式会社みらいへ」）には当てない（13回目の独立レビューの指摘：フッターの別の会社
  // 「株式会社みらい」に置き換えていた）
  const top = cands[0], best = top.name;
  if (/[のがをにへ]$/.test(best)) {
    const s = norm(((segPages[top.page] || [])[top.idx] || {}).text || "");
    const at = s.indexOf(best);
    const tail = at >= 0 && s.slice(at + best.length).search(CO_STOP) === 0;
    const stem = best.slice(0, -1);
    if (tail && (cands.some((c) => c.name === stem) || addressed.has(stem))) return stem;
  }
  return best;
}

/**
 * 会社名を返す。誤った名前を自動入力すると手入力より危険なので、
 * 確度が低い候補は採用せず null を返す（空欄のままにする）。
 * 採用条件は「2回以上出てくる」または「1ページ目の冒頭＝表題部にある」こと。
 */
export function detectCompany(pageTexts, segPages) {
  const t = pageTexts.join("");

  // ① 有価証券報告書の表紙は「【会社名】株式会社◯◯」と明記している。
  //    ここが読めれば推測は要らないので、最優先で採用する。
  // 本文の正規化で【】は既に外れているため、括弧なしの形で照合する。
  // 例：「…事業年度第13期(…)会社名株式会社マネーフォワード英訳名MoneyForward…」
  const KIND_RE = "株式会社|有限会社|合同会社|合資会社|合名会社";
  const labeled = (pageTexts[0] || "").match(new RegExp(
    "(?:会社名|商号|名称)\\s*((?:" + KIND_RE + ")[ぁ-んァ-ヶ一-龥々ａ-ｚＡ-Ｚa-zA-Z0-9・ー]{1,20}" +
    "|[ぁ-んァ-ヶ一-龥々ａ-ｚＡ-Ｚa-zA-Z0-9・ー]{1,20}(?:" + KIND_RE + "))"));
  if (labeled) {
    // 直後の見出し語（英訳名 など）を巻き込んでいたら落とす
    const n = labeled[1].replace(/(英訳名|代表者|本店|電話番号|事務連絡者|最寄り|縦覧|上場取引所|コード番号|URL|証券コード|決算期|問合せ先).*$/, "")
      // 有価証券報告書の表紙は社名の直後にEDINETコード（E04678）を置く。
      // ページの区切りで「E」だけが残ることがあるため、日本語のあとに続くEは落とす。
      .replace(/([ぁ-んァ-ヶ一-龥])E\d{0,6}$/, "$1");
    if (n.length >= 4) return n;
  }
  // ①' 有価証券報告書の表紙が数ページ後ろにあるもの（EDINETの目次や白紙が先に綴じてある）。
  //    本文の表にも「名称」「会社名」の列はあるため、2ページ目以降は表紙に固有の並び
  //    「会社名◯◯株式会社英訳名」に限る（実例：ユニ・チャーム、トヨタ自動車は4ページ目が表紙）。
  {
    const re = new RegExp("会社名\\s*((?:" + KIND_RE + ")[ぁ-んァ-ヶ一-龥々ａ-ｚＡ-Ｚa-zA-Z0-9・ー]{1,20}" +
      "|[ぁ-んァ-ヶ一-龥々ａ-ｚＡ-Ｚa-zA-Z0-9・ー]{1,20}(?:" + KIND_RE + "))(?=英訳名)");
    for (let i = 1; i < pageTexts.length; i++) {
      const m = (pageTexts[i] || "").match(re);
      if (m && m[1].length >= 4) return m[1];
    }
  }
  // ② 行ごとに探す（決算公告・計算書類）。ページ全体をつなげた文字列で探すと、
  //    隣の行の語が社名に貼りつく（「株式会社横浜国際平和会議場代表取締役」「第16期大阪国際石油精製株式会社」
  //    「株式会社テスト工業第」）。行単位なら、社名はたいてい1行（または行の中の1かたまり）に単独で書かれている。
  const byLine = companyFromLines(segPages);
  if (byLine) return byLine;

  // ③ 行の情報が無い・行で見つからないときの従来の方法（ページをつなげた文字列から推測する）
  const cands = new Map();
  // 有価証券報告書の表紙は社名の直後にEDINETコード（E04678）を置く。
  // ページの区切りで「E」だけが残ることがあるため、日本語のあとに続くEは落とす。
  const add = (n0) => {
    const n = String(n0 || "").replace(/([ぁ-んァ-ヶ一-龥])E\d{0,6}$/, "$1");
    if (n) cands.set(n, (cands.get(n) || 0) + 1);
  };
  for (const kind of CO_KINDS) {
    let i = -1;
    while ((i = t.indexOf(kind, i + 1)) !== -1) {
      // 後置形（株式会社○○）：直後を名前として読む。次の会社種別・記号・数字で打ち切る
      let after = t.slice(i + kind.length, i + kind.length + 14)
                   .split(/[（(【］\]、。：:0-9０-９]/)[0]
                   .replace(/(?:令和|平成|昭和)$/, "");   // 「株式会社◯◯令和7年…」の年号を巻き込まない
      for (const k2 of CO_KINDS) { const p2 = after.indexOf(k2); if (p2 >= 0) after = after.slice(0, p2); }
      if (CO_OK.test(after) && !CO_NG.test(after) && !CO_EXCLUDE.test(kind + after)) add(kind + after);
      // 前置形（○○株式会社）：直前を名前として読む。長い候補から順に見る
      const before = t.slice(Math.max(0, i - 20), i);
      for (let s = 0; s < before.length; s++) {
        let cand = before.slice(s);
        // 「…でOTNet株式会社」のように直前の助詞を巻き込むのを防ぐ
        cand = cand.replace(/^[ぁ-ん]{1,2}(?=[ァ-ヶ一-龥A-Za-zＡ-Ｚ0-9])/, "");
        // 「…3月31日沖縄電力株式会社」のように日付の末尾文字を巻き込むのを防ぐ
        cand = cand.replace(/^[年月日期至自現在]+/, "");
        // 「有価証券報告書GMO…」のように直前の見出し語を巻き込むのを防ぐ
        cand = cand.replace(/^(?:有価証券報告書|報告書|書類|表紙|提出会社|会社名|商号|名称|当社|同社)+/, "");
        // 「…個別注記表浜銀ファイナンス」のように、直前の書類名を巻き込むのを防ぐ
        cand = cand.replace(/^.*(?:個別注記表|注記表|計算書類|貸借対照表|損益計算書|決算公告|決算報告書)/, "");
        // 「…牧港五丁目2番1号FRT」のように、直前の住所を巻き込むのを防ぐ
        cand = cand.replace(/^.*(?:丁目|番地|[0-9０-９]+番[0-9０-９]*号?|[0-9０-９]+号)/, "");
        // 住所やページ番号の名残りで先頭に数字が付くことがある（「…2番1号1東京海上ミレア…」）
        cand = cand.replace(/^[0-9０-９]+/, "");
        // 数字を落とすと日付の助数詞が先頭に出てくる（「…3月31日東京生活館」→「日東京生活館」）
        cand = cand.replace(/^[年月日期至自現在]+/, "");
        // 切り出した先頭が語の途中だと、別の語の断片を社名にしてしまう。
        // 例：「…個別注記表株式会社東京ドーム」から「記表株式会社」を作ってしまっていた。
        // 直前の文字が日本語なら、語の境界ではないので採用しない。
        {
          const at = i - (before.length - s);
          const prev = at > 0 ? t[at - 1] : "";
          if (prev && /[ぁ-んァ-ヶ一-龥]/.test(prev) && cand === before.slice(s)) continue;
        }
        if (CO_OK.test(cand) && !CO_NG.test(cand) && !CO_EXCLUDE.test(cand + kind)) { add(cand + kind); break; }
      }
      i += kind.length;
    }
  }
  // 1ページ目の表題部にある社名が最も信頼できる。有価証券報告書は必ずここに提出会社名を書く。
  // 本文には「株式会社を設立」のような文章の断片が何度も出るため、頻度だけで選ぶと負ける。
  const head = (pageTexts[0] || "").slice(0, 400);
  const inHead = [...cands.keys()].filter((k) => head.includes(k));
  if (inHead.length) {
    // 表題部に複数あるときは、
    //  ① 表題部での出現位置が最も後ろ（提出会社名は見出しの最後に書かれる）
    //  ② 同じ位置なら短いほう（余計な語を巻き込んでいない）
    // の順で選ぶ。長いほうを選ぶと「役員…縦覧に供する場所株式会社」のような塊を掴む。
    return inHead.sort((a, b) => {
      const d = head.indexOf(a) - head.indexOf(b);
      return d !== 0 ? d : a.length - b.length;
    })[0];
  }
  // 表題部で見つからないときだけ、2回以上出てくるものを採る
  let best = 0, company = null;
  for (const [k, v] of cands) if (v >= 2 && v > best) { best = v; company = k; }
  return company;
}

/**
 * 本ツールの判定モデルに載らない業態かどうかを返す。
 * 銀行・保険の決算書は、貸借対照表に流動／固定の区分が無く、
 * 損益計算書も売上高ではなく経常収益で構成されるため、そもそも様式が違う。
 * また業界基準に用いる統計も金融業・保険業を対象外としている。
 * 「読み取れませんでした」ではなく、対象外であることを伝えるために使う。
 */
export function detectOutOfScope(pageTexts) {
  const t = pageTexts.join("");
  const bank = /経常収益/.test(t) && /(?:預金|貸出金|コールローン|資金運用収益)/.test(t);
  if (bank) return "bank";
  // 「責任準備金」だけで保険業と決めてはいけない。
  // 退職給付の簡便法を説明する定型文
  //   「年金財政計算上の責任準備金を退職給付債務とする方法を用いた簡便法」
  // が中小企業の個別注記表に頻繁に載っており、正常な会社を対象外として
  // 門前払いしていた（実例：鉄道会社の計算書類）。
  // 保険業に固有の科目か、保険業であることが本文から明らかな場合に限る。
  const insHard = /(?:保険料等収入|支払備金|保険引受収益|保険引受費用|支払保険金)/.test(t);
  const insSoft = /責任準備金/.test(t) &&
                  /(?:保険業法|少額短期保険|生命保険業|損害保険業|保険会社|共済事業)/.test(t);
  if (insHard || insSoft) return "insurance";
  // 暗号資産交換業。利用者から預かった暗号資産・金銭を、資産（利用者暗号資産・預託金）と
  // 負債（預り暗号資産・預り金）の両方に計上するため、総資産の大半が預かり分になり、比率が一般事業会社と比べられない。
  // 「受入手数料」があるため以前は証券会社と表示していたが、業態の説明として正しくないので分けて知らせる。
  // 手掛かりには貸借対照表の科目名（利用者暗号資産・預り暗号資産）を使い、先頭12ページの本文から探す。
  // 「暗号資産交換業」という業態の語は使わない。証券グループの有価証券報告書にも事業の説明として出てくる
  // （実例：GMOフィナンシャルホールディングス、マネックスグループ）。
  const secHard = /(?:トレーディング損益|信用取引資産|信用取引負債)/.test(t);
  if (!secHard && /利用者暗号資産|預り暗号資産/.test(t)) return "crypto";
  // 証券会社・金融商品取引業。損益計算書が営業収益と受入手数料で構成され、
  // 貸借対照表にも流動／固定の区分が無いため、本ツールの判定モデルに載らない。
  const sec = /(?:受入手数料|トレーディング損益|信用取引資産|信用取引負債|金融商品取引業)/.test(t);
  if (sec) return "securities";
  return null;
}

/**
 * 四半期・中間の決算書かどうかを、見つかった財務諸表の「見出し」で判定する。
 * 本文には有価証券報告書でも「四半期」の語が出るため、本文検索では誤判定する。
 * 四半期の損益計算書は3か月ぶんなので、年商として扱うと
 * 回転率も償還年数も与信限度額も静かに狂う。読めても判定してはいけない。
 */
export function detectInterim(found) {
  const heads = [(found && found.BS && found.BS.heading) || "",
                 (found && found.PL && found.PL.heading) || ""].join(" ");
  return /四半期|中間/.test(heads) ? "interim" : null;
}

/* ------------------------------------------------------------------ 決算期 */
/**
 * 決算期を特定する。決算書の様式によって書き方が違うため、次の順で探す。
 *   ① 会計期間「自2025年4月1日 至2026年3月31日」… 決算日が確実に分かる
 *   ② 貸借対照表日「2026年3月31日現在」
 *   ③ 期数「第47期」… 決算日は分からないが、期の前後関係は分かる
 * 戻り値の end は並べ替えに使う（新しいものが後ろ）。label は画面表示用。
 */
export function detectPeriod(pageTexts) {
  const t = pageTexts.join("");
  const out = { end: null, no: null, label: "" };

  // 決算書には前期と当期の2列があり、前期のほうが先に書かれている。
  // 最初の一致を採ると必ず1期古い日付になるため、見つかった中で最も新しいものを採る。
  const ends = [];
  const pad = (x) => String(x).padStart(2, "0");
  for (const mm of t.matchAll(/自\d{4}年\d{1,2}月\d{1,2}日至(\d{4})年(\d{1,2})月(\d{1,2})日/g))
    ends.push(`${mm[1]}-${pad(mm[2])}-${pad(mm[3])}`);
  if (!ends.length)
    for (const mm of t.matchAll(/(\d{4})年(\d{1,2})月(\d{1,2})日現在/g))
      ends.push(`${mm[1]}-${pad(mm[2])}-${pad(mm[3])}`);
  // 決算公告には和暦で書かれたものがある（令和7年12月31日現在）
  if (!ends.length)
    for (const mm of t.matchAll(/(令和|平成)(\d{1,2})年(\d{1,2})月(\d{1,2})日現在/g)) {
      const base = mm[1] === "令和" ? 2018 : 1988;
      ends.push(`${base + Number(mm[2])}-${pad(mm[3])}-${pad(mm[4])}`);
    }
  if (ends.length) out.end = ends.sort()[ends.length - 1];

  let m = t.match(/第(\d{1,3})期/);
  if (m) out.no = parseInt(m[1], 10);

  if (out.end) {
    const [y, mo] = out.end.split("-");
    out.label = `${y}年${parseInt(mo, 10)}月期`;
    if (out.no) out.label = `第${out.no}期（${out.label}）`;
  } else if (out.no) {
    out.label = `第${out.no}期`;
  }
  return out;
}

export async function scanPdf(pdfjs, buf, onProgress) {
  // cMap（文字コード変換表）を必ず渡す。
  // 有価証券報告書は MS-Gothic 等のCIDフォントを埋め込みつつ ToUnicode を持たないものが多く、
  // これが無いと文字が1文字も取り出せず「画像PDF」と誤判定してしまう。
  const doc = await pdfjs.getDocument({
    data: new Uint8Array(buf),
    useWorkerFetch: false,
    isEvalSupported: false,
    cMapUrl: new URL("../vendor/cmaps/", import.meta.url).href,
    cMapPacked: true,
  }).promise;
  const pages = [];
  const pageTexts = [];
  const segPages = [];
  let totalChars = 0;

  for (let i = 1; i <= doc.numPages; i++) {
    if (onProgress) onProgress(i, doc.numPages);
    const page = await doc.getPage(i);
    const vp = page.getViewport({ scale: 1 });
    const tc = await page.getTextContent();
    const words = itemsToWords(tc.items, vp.height);
    const pageText = norm(words.map((w) => w.text).join(""));
    totalChars += pageText.length;
    if (pageTexts.length < 12) pageTexts.push(pageText);
    if (segPages.length < 3) segPages.push(segmentsOf(words));   // 会社名を行から探すため
    const { rows, kind } = words.length ? rowsOf(words, vp.width, pageText) : { rows: [], kind: "single" };
    pages.push({ no: i, rows, kind, text: pageText, labels: new Set(rows.map((r) => r.label)),
                 headings: headingsOf(pageText) });
  }
  await doc.destroy();

  // テキストレイヤーが無いPDF（スキャン画像）は、その旨を明示して返す
  if (totalChars < 200) return { _noText: true };

  // 決算期を拾う。複数のPDFを投入されたとき、新しい順に並べ替えるために使う。
  // 読めなくても処理は続ける（並べ替えを諦めて投入順にするだけ）。
  const period = detectPeriod(pageTexts);
  const outOfScope = detectOutOfScope(pageTexts);
  const company = detectCompany(pageTexts, segPages);

  const found = {};
  // 減価償却費を全ページから探すために保持する。列挙対象に混ざらないよう非列挙にする。
  Object.defineProperty(found, "_pages", { value: pages, enumerable: false });
  Object.defineProperty(found, "_period", { value: period, enumerable: false });
  Object.defineProperty(found, "_company", { value: company, enumerable: false });
  Object.defineProperty(found, "_outOfScope", { value: outOfScope, enumerable: false });
  // 指定した種類（BS/PL/CF）と範囲（連結／単体）の財務諸表を、先頭のページから探す。無ければ null
  const locate = (kind, wantConsolidated) => {
    for (const pg of pages) {
      const h = pg.headings.find((x) => x.kind === kind && x.consolidated === wantConsolidated);
      if (!h || !bodyLooksLike(kind, pg.labels)) continue;
      const f = { page: pg.no, rows: pg.rows.slice(), kind: pg.kind,
                  consolidated: h.consolidated, heading: h.text };
      // 損益計算書が「特別損失合計」で切れ、税金と当期純利益だけが次ページに載る様式がある。
      // 無条件に結合すると次ページの包括利益計算書を飲み込むため、
      // ①見出しが無い ②包括利益の科目を含まない ③税金か純利益の科目を含む
      // の3つを満たすページに限って、1ページだけ結合する。
      if (kind === "PL") {
        // 損益計算書が「当期純利益（損失）」まで載っていれば完結している。載っていなければ次ページが続き。
        // ・損失の表記（「当期純損失」「当期純利益又は当期純損失(△)」）も完結の印として認める。
        //   認めないと、損失の年は次ページの株主資本等変動計算書（当期首残高・剰余金の配当など）まで結合していた
        //   （実例：損失を計上した年の決算公告）。
        // ・税引前利益や法人税等は完結の印にしない。そこでページが切れ、当期純利益が次ページにある様式がある
        //   （独立レビューで作った見本 T8：「税引前当期純利益又は税引前当期純損失(△)」でページが切れる）。
        const NET_ROW = /^(?:当期純(?:利益|損失)|当期(?:利益|損失)|親会社株主に帰属する当期純(?:利益|損失))/;
        const TAX_ROW = /^(?:法人税等合計|法人税等|法人税、住民税及び事業税|法人所得税費用)$/;
        const complete = (labels) => [...labels].some((k) => NET_ROW.test(keyOf(k)));
        const hasTail = (labels) => [...labels].some((k) => NET_ROW.test(keyOf(k)) || TAX_ROW.test(keyOf(k)));
        if (!complete(pg.labels)) {
          const nx = pages[pg.no];               // 次のページ（pagesは0起点）
          const isComprehensive = (labels) =>
            [...labels].some((k) => /包括利益/.test(k));
          // 株主資本等変動計算書にも「当期純利益」の行があるため、その表の行は続きに含めない。
          // 同じページの上に損益計算書の続き（法人税等・当期純利益）、下に株主資本等変動計算書、という様式があるので、
          // ページごと除くのではなく、変動計算書の最初の行（当期首残高など）の手前までを続きとして採る（独立レビューの指摘）。
          if (nx && !nx.headings.length && nx.rows.length && !isComprehensive(nx.labels)) {
            const cut = nx.rows.findIndex((r) => /^(?:当期首残高|前期末残高|当期変動額|剰余金の配当)/.test(keyOf(r.label)));
            const tail = cut >= 0 ? nx.rows.slice(0, cut) : nx.rows;
            if (tail.length && hasTail(new Set(tail.map((r) => r.label)))) {
              f.rows.push(...tail);
              f.continued = [nx.no];
            }
          }
        }
      }
      // 続きのページを結合する。
      // 貸借対照表だけが「資産の部」と「資本の部」で2ページに割れるため、BSに限定する。
      if (kind === "BS") {
        const need = ["資本合計", "純資産合計", "負債及び資本合計", "負債純資産合計", "負債及び純資産合計"];
        const hasEquity = (labels) => need.some((k) => labels.has(k));
        for (let n = pg.no; n < pages.length && !hasEquity(new Set(f.rows.map((r) => r.label))); n++) {
          const nx = pages[n];
          if (!nx || nx.headings.length || !nx.rows.length) break;
          if (!bodyLooksLike("BS", nx.labels)) break;
          f.rows.push(...nx.rows);
          f.continued = (f.continued || []).concat(nx.no);
        }
      }
      return f;
    }
    return null;
  };
  // 連結を優先する。ただし連結と単体を混ぜない。
  // 連結の貸借対照表に単体の損益計算書を組み合わせると、比率（回転期間・利益率・償還年数）が
  // すべて意味を失うのに、数字は自然に見えるので気づけない。
  //   ・連結の BS と PL が両方そろう → 連結で読む
  //   ・どちらかしか無いが、単体の BS と PL はそろう → 単体で読み、その旨を知らせる
  //   ・単体もそろわない → 見つかったものを使い、混ざったときは知らせる
  let scopeNote = null;
  const con = { BS: locate("BS", true), PL: locate("PL", true), CF: locate("CF", true) };
  let use = con;
  if (!(con.BS && con.PL)) {
    const sol = { BS: locate("BS", false), PL: locate("PL", false), CF: locate("CF", false) };
    if (sol.BS && sol.PL) {
      use = sol;
      if (con.BS || con.PL) {
        scopeNote = `連結の${con.BS ? "損益計算書" : "貸借対照表"}を読み取れなかったため、` +
          "連結と単体を混ぜないよう、単体（この会社だけ）の決算書で揃えて読み取りました。" +
          "連結の数字で判定したい場合は、連結の数字を手入力してください。";
      }
    } else {
      const BS = con.BS || sol.BS, PL = con.PL || sol.PL;
      // 減価償却費は損益計算書と同じ範囲のキャッシュ・フロー計算書から採る
      const CF = PL ? (PL.consolidated ? con.CF : sol.CF) : (con.CF || sol.CF);
      use = { BS, PL, CF };
      if (BS && PL && BS.consolidated !== PL.consolidated) {
        scopeNote = `貸借対照表は${BS.consolidated ? "連結" : "単体"}、損益計算書は${PL.consolidated ? "連結" : "単体"}の数字です。` +
          "連結と単体が混ざっているため、比率が正しく出ません。どちらかに揃えて入力し直してください。";
      }
    }
  }
  for (const k of ["BS", "PL", "CF"]) if (use[k]) found[k] = use[k];
  Object.defineProperty(found, "_scopeNote", { value: scopeNote, enumerable: false });

  // 金額の単位は「決算書そのもののページ」から採る。
  // 全文の先頭から探すと、為替レート表の「（単位：円）」のような
  // 決算書と無関係な記載を拾い、百万円を円と取り違える。桁が6つずれる。
  const unitPages = [];
  for (const k of ["BS", "PL"]) {
    if (!found[k]) continue;
    const nos = [found[k].page, ...(found[k].continued || [])];
    for (const n of nos) { const pg = pages.find((x) => x.no === n); if (pg) unitPages.push(pg.text); }
  }
  const unit = detectUnit(unitPages.length ? unitPages : pageTexts) || detectUnit(pageTexts);
  Object.defineProperty(found, "_unit", { value: unit, enumerable: false });
  Object.defineProperty(found, "_interim", { value: detectInterim(found), enumerable: false });

  return found;
}

/** 負債の部を流動セクション／固定（非流動）セクションに切り分ける */
function sliceSection(rows, which) {
  const find = (re) => rows.findIndex((r) => re.test(keyOf(r.label)));
  // 負債の区間の始まり（見出し行に金額が無く、行として拾えないとき）。
  // 以前は「合計行の20行前」としていたため、流動負債が20行を超える決算書や、左右2段で資産と負債の行が
  // 交互に並ぶ表では、先頭の支払手形・買掛金・短期借入金が区間から外れていた（独立レビューの指摘）。
  //  ・左右2段の表：資産と負債が同じ行に並ぶので先頭から。資産の側の行は、呼び出し側が段（side）で除く
  //  ・それ以外：資産合計の次の行から
  const liabStart = (end) => {
    if (rows.slice(0, end).some((r) => r.kind === "accounts")) return 0;
    let iAss = -1;
    for (let k = 0; k < end; k++) if (/^(資産合計|資産の部合計)$/.test(keyOf(rows[k].label))) iAss = k;
    return iAss >= 0 ? iAss + 1 : Math.max(0, end - 20);
  };

  // ① 合計行がある様式（有価証券報告書など）。合計行が節の末尾になる。
  const endCur = find(/^流動負債合計$/);
  const endFix = find(/^(固定負債合計|非流動負債合計)$/);
  if (endCur >= 0 && endFix > endCur) {
    const i = find(/^流動負債$/);
    const startCur = i >= 0 && i < endCur ? i : liabStart(endCur);
    return which === "current"
      ? rows.slice(startCur, endCur + 1)
      : rows.slice(endCur + 1, endFix + 1);
  }
  // ①' 固定負債を先に書き、区分ごとに合計行を置く様式（ガス事業の有価証券報告書など）。
  //    「固定負債合計 → 流動負債合計」の順。①は流動が先の前提なので判別できず全体を返し、
  //    固定側の社債・長期借入金まで短期有利子負債に数えていた（実例：広島ガスで 5,794 のところ 39,676）。
  if (endFix >= 0 && endCur > endFix) {
    const startFix = liabStart(endFix);
    return which === "fixed"
      ? rows.slice(startFix, endFix + 1)
      : rows.slice(endFix + 1, endCur + 1);
  }

  // ② 合計行が無く、「流動負債」「固定負債」の見出し行だけがある様式（決算公告に多い）。
  //    区切らないまま全体を渡すと、流動と固定の両方に同じ名前で載る「リース債務」等を
  //    二重に拾い、有利子負債が実際の倍近くになる。数字は自然に見えるので気づけない。
  const hCur = find(/^流動負債$/);
  const hFix = find(/^(固定負債|非流動負債)$/);
  if (hCur >= 0 && hFix > hCur) {
    const hTot = find(/^(負債合計|負債の部合計|負債の部計|負債計)$/);
    return which === "current"
      ? rows.slice(hCur, hFix)
      : rows.slice(hFix, hTot > hFix ? hTot : rows.length);
  }

  // ③ 固定負債を先に書く様式（電気事業・ガス事業の貸借対照表）。
  //    「固定負債 … 流動負債 … 負債合計」の順で、合計行を持たない。
  //    ②は流動が先にある前提なので判別できず、全体を返してしまい、
  //    固定側の社債・長期借入金を短期有利子負債にも計上していた。
  //    実例：沖縄電力で短期有利子負債 320,460（流動負債 86,246）という値になっていた。
  if (hFix >= 0 && hCur > hFix) {
    const hTot = find(/^(負債合計|負債の部合計|負債の部計|負債計)$/);
    return which === "fixed"
      ? rows.slice(hFix, hCur)
      : rows.slice(hCur, hTot > hCur ? hTot : rows.length);
  }

  // ④ 固定負債の区分そのものが無い様式（小さな会社の決算公告）。流動負債から負債合計までが流動負債。
  //    ここで全体を返すと、名前だけで短期・長期を見分けるしかなくなり、「リース債務」などを取りこぼす。
  if (hFix < 0 && endFix < 0 && (hCur >= 0 || endCur >= 0)) {
    const s = hCur >= 0 ? hCur : liabStart(endCur);
    const hTot = find(/^(負債合計|負債の部合計|負債の部計|負債計)$/);
    const e = endCur >= 0 ? endCur + 1 : (hTot > s ? hTot : rows.length);
    return which === "current" ? rows.slice(s, e) : [];
  }

  return rows;   // 判別できなければ全体を対象（呼び出し側で「区切れなかった」ことを判定に使う）
}

/* -------------------------------------------------------- 1期分の組み立て */

/**
 * 損益計算書の「区分合計」を、内訳の右隣にある1つ多い金額から拾う。
 *
 * 中小企業の計算書類や決算公告には、こういう様式がある。
 *
 *     営業外収益
 *       受取利息及び配当金   1,162
 *       その他                  21     1,265   ← 区分合計は内訳の右隣
 *     営業外費用
 *       支払利息                58
 *       その他                   4        62
 *
 * 「営業外収益」という見出し行そのものに金額が無いため、辞書では拾えない。
 * そこで、内訳より金額が1つ多い行を区分合計とみなす。
 *
 * ただし推測なので、必ず算術で検算してから採用する。
 *   営業利益 ＋ 営業外収益 − 営業外費用 ＝ 経常利益
 *   経常利益 ＋ 特別利益   − 特別損失   ＝ 税引前当期純利益
 * 合わなければ何も入れない。間違った値を静かに入れるくらいなら、未取得のままがよい。
 */
function inferPlSections(rows, out, source, yi) {
  if (!rows.length) return;
  const val = (r) => amountAt(r, yi);
  // 内訳行がいくつ金額を持つか（最頻値）。区分合計はそれより1つ多い。
  const freq = new Map();
  for (const r of rows) freq.set(r.amounts.length, (freq.get(r.amounts.length) || 0) + 1);
  let base = 1, best = -1;
  for (const [n, c] of freq) if (c > best) { best = c; base = n; }

  const idx = (names) => rows.findIndex((r) => names.includes(keyOf(r.label)));
  const iOp  = idx(["営業利益", "営業損失"]);
  const iOrd = idx(["経常利益", "経常損失"]);
  const iPre = idx(["税引前当期純利益", "税引前当期純損失", "税金等調整前当期純利益", "税引前利益"]);

  // 内訳・合計の2列の表（単年）で、合計の列の番号
  const rightCol = Math.max(-1, ...rows.filter((r) => r.kind === "single" && Array.isArray(r.cols) && r.cols.length)
                                      .map((r) => Math.max(...r.cols)));
  const subtotalsBetween = (a, b) => {
    if (a < 0 || b < 0 || b <= a) return [];
    const seg = rows.slice(a + 1, b);
    const bySize = seg.filter((r) => r.amounts.length > base);
    if (bySize.length) return bySize;
    // 区分に科目が1つしかないと、その金額は内訳の列を経ずに合計の列へ直接書かれる。
    //   特別利益   工事負担金等受入額          1,620
    //   特別損失   固定資産圧縮損              1,620
    // 金額の数では区分合計と見分けられないため、内訳・合計の2列の表に限り「合計の列にある行」を区分合計とみなす。
    // 採用するのは検算（経常利益＋特別利益−特別損失＝税引前利益）が合うときだけ（solve が確かめる）。
    // 実例：鉄道・不動産の事業別に損益を書く決算公告で、特別利益・特別損失が空欄のままになっていた。
    if (rightCol >= 1 && seg.length && seg.every((r) => r.kind === "single" && Array.isArray(r.cols) && r.cols.length)) {
      const rs = seg.filter((r) => r.cols[r.cols.length - 1] === rightCol);
      if (rs.length >= 1 && rs.length <= 2) return rs;
    }
    return [];
  };
  const near = (x, y) => Math.abs(x - y) <= Math.max(2, Math.abs(y) * 0.005);

  /**
   * 区間内の区分合計から、収益側と費用側を決める。
   * 2つあれば「前が収益・後が費用」。
   * 1つしか無い様式（特別利益が無く特別損失だけ、など）もあるため、
   * その場合は収益とみなす場合・費用とみなす場合の両方を検算し、合うほうを採る。
   * どちらも合わなければ何も入れない。
   */
  const solve = (from, to, target, incKey, expKey, incLabel, expLabel) => {
    if (out[incKey] !== null || out[expKey] !== null) return;
    if (target === null || target === undefined) return;
    const sub = subtotalsBetween(from, to);
    const start = from === iOp ? out.operating : out.ordinary;
    if (start === null || start === undefined) return;
    if (sub.length === 2) {
      const inc = val(sub[0]), exp = val(sub[1]);
      if (near(start + inc - exp, target)) {
        out[incKey] = inc; source[incKey] = incLabel + "（区分合計より）";
        out[expKey] = exp; source[expKey] = expLabel + "（区分合計より）";
      }
      return;
    }
    if (sub.length === 1) {
      const x = val(sub[0]);
      if (near(start - x, target)) {          // 費用だけがある
        out[expKey] = x; source[expKey] = expLabel + "（区分合計より）";
        out[incKey] = 0; source[incKey] = incLabel + "（記載なし）";
      } else if (near(start + x, target)) {   // 収益だけがある
        out[incKey] = x; source[incKey] = incLabel + "（区分合計より）";
        out[expKey] = 0; source[expKey] = expLabel + "（記載なし）";
      }
      return;
    }
  };

  // ① 営業外収益・営業外費用
  solve(iOp, iOrd, out.ordinary, "nonOpInc", "nonOpExp", "営業外収益", "営業外費用");

  // ② 特別利益・特別損失
  if (iPre >= 0) {
    solve(iOrd, iPre, val(rows[iPre]), "extraInc", "extraExp", "特別利益", "特別損失");
  }

  // ③ 売上高・売上原価。
  // リース業などには、売上を内訳だけで並べ「売上高」の行を置かない様式がある。
  //     リース売上高   29,079
  //     割賦売上高        629
  //     その他の売上高      8   31,116   ← 区分合計は内訳の右隣
  // 売上高が取れないと回転率も月商倍率も出せないため、区分合計から推定する。
  // 売上総利益（無ければ営業利益）と突き合わせて合う場合にだけ採用する。
  if (out.sales === null && out.cogs === null) {
    const iGross = idx(["売上総利益", "売上総利益合計", "営業総利益"]);
    const end = iGross >= 0 ? iGross : iOp;
    const target = iGross >= 0 ? val(rows[iGross]) : out.operating;
    if (end > 0 && target !== null && target !== undefined) {
      const sub = rows.slice(0, end).filter((r) => r.amounts.length > base);
      if (sub.length === 2) {
        const inc = val(sub[0]), exp = val(sub[1]);
        if (near(inc - exp, target)) {
          out.sales = inc; source.sales = "営業収益の区分合計より";
          out.cogs = exp; source.cogs = "営業費用の区分合計より";
          // 営業利益で突き合わせた場合、費用側の合計に販管費まで含まれている。
          // そのまま販管費を別に引くと二重計上になるので、費用側から取り除く。
          if (iGross < 0) {
            if (out.sga !== null && out.sga !== undefined) {
              out.cogs = exp - out.sga;
              source.cogs = "営業費用の区分合計−販売費及び一般管理費";
            } else {
              out.sga = 0; source.sga = "営業費用に含まれるため区分なし";
            }
          }
        }
      }
    }
  }
}

/**
 * 事業別に損益を並べる様式で、全事業の合計に差し替える。
 * 合算した収益と費用の差が「全事業営業利益」と一致する場合にだけ採用する。
 * 合わなければ何も変えない。
 */
function mergeSegmentPl(rows, out, source, yi, warnings) {
  const val = (r) => amountAt(r, yi);
  const total = rows.find((r) => /^全事業(営業利益|営業損失)$/.test(keyOf(r.label)));
  if (!total) return;
  const totalOp = val(total);
  const incRows = rows.filter((r) => ["営業収益", "売上高"].includes(keyOf(r.label)));
  const expRows = rows.filter((r) => ["営業費", "営業費用", "売上原価"].includes(keyOf(r.label)));
  if (incRows.length < 2 || !expRows.length) return;
  const inc = incRows.reduce((a, r) => a + val(r), 0);
  const exp = expRows.reduce((a, r) => a + val(r), 0);
  if (Math.abs(inc - exp - totalOp) > Math.max(2, Math.abs(inc) * 0.0005)) return;
  out.sales = inc;      source.sales = `全事業の営業収益（${incRows.length}事業の合計）`;
  out.sga = exp;        source.sga = `全事業の営業費（${expRows.length}事業の合計）`;
  out.cogs = 0;
  out.operating = totalOp; source.operating = "全事業営業利益";
  warnings.push("事業別に区分された損益計算書のため、全事業を合算しました。この様式には売上原価と販管費の区分がないため、営業費の全額を販管費として扱っています。");
}

export function buildPeriod(found, yi) {
  const out = {}, source = {}, warnings = [];
  const bs = found.BS?.rows || [], pl = found.PL?.rows || [], cf = found.CF?.rows || [];
  if (found._scopeNote) warnings.push(found._scopeNote);   // 連結と単体の扱い（scanPdf で判断）

  for (const [k, spec] of Object.entries(BS_DICT)) {
    // 有利子負債は「リース負債」のように流動・非流動で同名の科目があるため、
    // 区間を限定して拾わないと二重計上になる
    const scope = k === "shortDebt" ? sliceSection(bs, "current")
                : k === "longDebt" ? sliceSection(bs, "fixed") : bs;
    const { value, source: s } = pull(scope, spec, yi);
    out[k] = value; if (s) source[k] = s;
  }
  // 売上債権・棚卸資産・仕入債務・有利子負債は、名前の型で判定し直す（見つかれば辞書の結果より優先）。
  {
    const cur = sliceSection(bs, "current"), fix = sliceSection(bs, "fixed");
    const sliced = cur !== bs || fix !== bs;
    const ca = sliceCurrentAssets(bs) || bs;
    // 左右2段の表では、資産は左段(0)・負債は右段(1)にある。反対の段の科目を拾わない。
    // 3段の要旨では、3段目(2)は損益計算書なので、資産にも負債にも数えない
    const assetSide = (r) => !(r.kind === "accounts" && r.side !== 0);
    const liabSide = (r) => !(r.kind === "accounts" && r.side !== 1);
    const set = (k, res) => { if (res.value !== null) { out[k] = res.value; source[k] = res.source; } };
    // 区分の合計の行（「棚卸資産」「売上債権合計」「仕入債務計」）が1つだけあり、その前後に内訳（商品・貯蔵品／受取手形・売掛金）を
    // 並べる様式では、合計と内訳を両方足してしまう（独立レビューの指摘）。そこで、ほかの行が合計の行の内訳かどうかを次の順に確かめ、
    // 内訳なら合計の行を採る（内訳でない同じ種類の行は、別の科目として足す）。
    //   (b) 同じ種類のほかの行すべての和が、合計の行と一致する
    //   (w) 合計の行に続く（「…合計」「…計」の行なら、先立つ）ひと続きの行を順に足していき、合計の行と一致するところまでが内訳。
    //       辞書に無い科目（不渡手形・消耗品・開発用土地）や貸倒引当金が内訳に混じっていても、和で確かめられる。
    //       「(うち…)」の行は内数なので飛ばす。別の区分の合計の行（「現金・預金合計」「流動資産合計」）や、ほかの区分の
    //       科目（前払費用・未収入金・有価証券…）で止める。途中に小計（「商品 合計」、下の行の和になっている「商品及び製品」）が
    //       あれば、その内訳は飛ばして小計の行の金額を数える。内訳には同じ種類の科目が1つ以上含まれていなければならない。
    //       合計の行が「売上債権」のように「合計」の付かない名前で、内訳の後ろに置かれた表もあるので、逆向きも確かめる。
    //   (a) 和が合わないときは字下げを見る：合計の行のすぐ下に、同じ字下げで2行以上並ぶ行に同じ種類の科目があれば、それが内訳。
    // どれにも当たらなければ同じ種類の行をすべて足す（「売上債権 3,000」と並べて「電子記録債権 500」を別に書く様式）。
    // そのとき、合計の行の内訳が並ぶ側に同じ種類の行があれば、二重に数えている可能性を警告で知らせる。
    // 和の一致は、内訳が n 行なら n−1 単位まで許す（千円未満を行ごとに切り捨てた決算書で生じる差。pullBy と同じ）。
    // 以前は (a) を和より先に見ていて、字下げした「うち書き」や、合計の行の後ろの別の区分の行を内訳と取り違え、
    // 二重に数えていた（6回目の独立レビューの指摘）。6回目の直し方では、小計を含む内訳や、次の区分の貸倒引当金を
    // 内訳と取り違えることがあった（7回目の独立レビューの指摘）。
    // 売上債権は貸倒引当金を引く前の額で数える（下の allowanceCA の説明を参照）。合計の行が貸倒引当金を引いた後の額のときは、
    // 引当金を足し戻した額を採る（貸倒引当金を見るのは売上債権だけ）。
    const TOTALISH = /(?:合計|小計|計)$/;
    const AGG_ANY = /^(?:売上債権|棚卸資産|たな卸資産|仕入債務)(?:合計|小計|計)?$/;
    const STOP_ACCT = /^(?:前払費用|前払金|前渡金|未収入金|未収収益|短期貸付金|有価証券|仮払金|立替金|預け金|繰延税金資産|未収還付法人税等|未収消費税等|現金|預金|現金及び預金|現金預金|現金・預金)$/;
    const one = (r) => { const x = pullBy([r], () => true, yi).value; return typeof x === "number" ? x : 0; };
    // 科目の合計の行（「受取手形及び売掛金合計」「売掛金 合計」「長期借入金 計」、科目名の無い「計」）は、すぐ上のひと続きの行
    // （補助科目の取引先・借入先の名前の行や、内訳の科目の行）をまとめたもの。和が一致すれば、合計の行を1つの科目として数え、
    // まとめられた行のうち同じ種類の科目の行は数えない（二重になるため）。
    //   売掛金｜A商事 1,000   ← 1行目にだけ科目名が付く補助科目（科目の行として数えると、合計の行と二重になる）
    //          B産業   2,000
    //   売掛金 合計     3,000  ← これを数える
    // 科目名の無い「計」「合計」の行は、まとめた行に同じ種類の科目があるときだけ、その種類の科目として数える。
    // 以前（6回目）は「…合計」「…計」をすべて科目から外して補助科目で締める試算表の借入金・売掛金を落とし、7回目は
    // 上の行が科目のときだけ合計の行を外したため、1行目にだけ科目名が付く補助科目を二重に数えていた（8回目の独立レビューの指摘）。
    const LIAB_STOP = /^(?:支払手形|買掛金|未払金|未払費用|未払法人税等|未払消費税等|前受金|預り金|賞与引当金|退職給付引当金|役員退職慰労引当金|繰延税金負債|資産除去債務)$/;
    // 貸借対照表の決まった科目名（頭の「長期」「短期」「1年以内…の」を除いて比べる）。補助科目の名前（取引先・借入先）と見分けるために使う
    const ACCT_TITLE = new RegExp("^(?:" + [
      "現金", "小口現金", "受取手形", "売掛金", "電子記録債権", "完成工事未収入金", "受取手形及び売掛金", "売上債権",
      "商品", "製品", "半製品", "仕掛品", "原材料", "材料", "貯蔵品", "商品及び製品", "製品及び商品", "原材料及び貯蔵品", "未成工事支出金",
      "販売用不動産", "棚卸資産", "たな卸資産", "前渡金", "貸付金", "差入保証金", "保証金", "敷金", "出資金", "建物", "建物附属設備", "構築物",
      "機械装置", "機械及び装置", "車両運搬具", "工具器具備品", "工具器具及び備品", "工具、器具及び備品", "器具備品", "土地", "建設仮勘定",
      "ソフトウェア", "のれん", "電話加入権", "借地権", "リース資産", "支払手形", "買掛金", "電子記録債務", "工事未払金", "支払手形及び買掛金",
      "仕入債務", "借入金", "社債", "リース債務", "資産除去債務", "資本金",
    ].join("|") + ")$");
    // 語尾は、取引先・借入先の名前や、補助科目の種類の名前の終わりにならないものに限る。「…金」「…品」だけでは商工中金・沖縄食品の
    // ような名前に当たる（10回目の独立レビューの指摘）。11回目・12回目に足した語尾のうち「…手形」「…債権」「…債務」「…未収金」
    // 「消耗品」「…借入金」「…未払金」「…立替金」などは、補助科目の種類（約束手形・クレジット債権・社保未収金・保証協会付借入金・
    // 外注未払金・工事立替金）にも当たり、補助科目の「計」を捨てて科目の1行目しか数えなくなった（12回目・13回目の独立レビューの指摘）
    // ので外した。残すのは「…保証金」「…敷金」（受入保証金・入居保証金・受入敷金。11回目の独立レビューの指摘）だけ。
    // 名前の無い「計」で区分を締める様式の「長期割賦未払金」などは別の科目と見ないが、その様式は区分の合計を読めず、
    // 貸借が一致しないと画面で知らせる
    const ACCT_PART = new RegExp("^(?:未払|前払|前受|未収|仮払|仮受|預り|立替|貸倒|繰延税金|退職給付|賞与引当|役員退職)|(?:" + [
      "引当金", "準備金", "預金", "積金", "有価証券", "剰余金", "積立金", "保証金", "敷金",
    ].join("|") + ")$");
    // aggRe に当たる区分の合計の行（「売上債権合計」など）は pickCat が内訳と合わせて扱うので、ここでは見ない
    // （ここで内訳を外すと、貸倒引当金を引いた後の合計の行をそのまま採ってしまう）
    const blocksOf = (rowsIn, sideOk, cat, aggRe = null) => {
      const drop = new Set(), extra = new Set(), names = new Map();
      rowsIn.forEach((T, ti) => {
        if (!sideOk(T) || (aggRe && aggRe.test(keyOf(T.label)))) return;
        const kt = keyOf(T.label);
        const generic = /^(?:計|合計|小計)$/.test(kt);
        if (!generic && !(TOTALISH.test(kt) && isItem(cat, T.label))) return;
        const t = one(T);
        let acc = 0, n = 0;
        const blk = [];
        for (let i = ti - 1; i >= 0 && blk.length < 30; i--) {
          const r = rowsIn[i];
          if (!sideOk(r) || isMemo(r.label)) continue;
          const k = keyOf(r.label);
          if (TOTALISH.test(k) || STOP_ACCT.test(k) || LIAB_STOP.test(k) || AGG_ANY.test(k)) break;
          blk.push(r); acc += one(r); n++;
          if (Math.abs(acc - t) <= Math.max(0, n - 1)) {
            const items = blk.filter((x) => isItem(cat, x.label));
            if (generic) {
              // 科目名の無い「計」は、まとめた行が「同じ種類の科目」と「補助科目（取引先・借入先の名前）」だけのときに限る。
              // 長期未払金・普通預金・貸倒引当金のような別の科目が混じれば、それは区分の合計（9回目の独立レビューの指摘：
              // 固定負債の「計」を借入金として数えたり、流動資産の「計」を売上債権・棚卸資産の両方に数えたり、
              // 貸倒引当金を引いた後の「計」を売上債権として採ったりしていた）
              // 別の科目かどうかは、決まった科目名（ACCT_TITLE・ACCT_PART）で見る。9回目は語尾（…金・…品・…物）で見ていて、
              // 借入先・取引先の名前（商工中金・沖縄食品・山田金物・設備資金）を別の科目と取り違え、補助科目の「計」を
              // 捨てていた（10回目の独立レビューの指摘）
              const acctLike = (x) => {
                if (isItem(cat, x.label)) return false;
                const k = keyOf(x.label).replace(/^(?:長期|短期|1年以?内(?:返済|償還)?(?:予定)?の?|一年以?内(?:返済|償還)?(?:予定)?の?)/, "");
                return ACCT_TITLE.test(k) || ACCT_PART.test(k);
              };
              if (!items.length || blk.some(acctLike)) break;
              extra.add(T);
              names.set(T, items[items.length - 1].label);   // ブロックの最初（上）の科目の名前で、短期・長期を見分ける
            }
            for (const x of items) drop.add(x);
            break;
          }
        }
      });
      return { drop, extra, names };
    };
    const pickCat = (rowsIn, sideOk, cat, aggRe, name) => {
      const { drop, extra } = blocksOf(rowsIn, sideOk, cat, aggRe);
      const itemOk = (r) => sideOk(r) && (extra.has(r) || (isItem(cat, r.label) && !drop.has(r)));
      const all = () => pullBy(rowsIn, itemOk, yi);
      const agg = rowsIn.filter((r) => sideOk(r) && aggRe.test(keyOf(r.label)));
      if (agg.length !== 1) return all();
      const A = agg[0];
      const a = pullBy(agg, () => true, yi);
      const restRows = rowsIn.filter((r) => r !== A && itemOk(r));
      if (!restRows.length) return a;
      if (a.value === null) return all();
      const tolN = (n) => Math.max(1, n - 1);
      const allowOf = (r) => { if (cat !== "receivables" || !/貸倒引当金/.test(keyOf(r.label))) return 0; const x = one(r); return x < 0 ? x : 0; };
      // 内訳と分かった行 members のほかの、同じ種類の行を別の科目として足す
      const finish = (members) => {
        const allow = members.reduce((s, r) => s + allowOf(r), 0);
        const items = members.filter((r) => restRows.includes(r));
        // 内訳の中に貸倒引当金がある：内訳の科目だけで合計の行と一致すれば合計の行は引当金を引く前の額、そうでなければ引いた後の額
        const itemSum = items.reduce((s, r) => s + one(r), 0);
        const net = allow < 0 && !(items.length && Math.abs(itemSum - a.value) <= tolN(items.length));
        const base = net ? a.value - allow : a.value;
        const src = net ? `${a.source}（貸倒引当金を足し戻し）` : a.source;
        const others = restRows.filter((r) => !members.includes(r));
        if (!others.length) return { value: base, source: src };
        const o = pullBy(others, () => true, yi);
        return { value: base + o.value, source: `${src}＋${o.source}` };
      };
      // (b)
      const rest = pullBy(restRows, () => true, yi);
      if (Math.abs(rest.value - a.value) <= tolN(restRows.length)) return a;
      // (w)
      const idx = rowsIn.indexOf(A);
      const lead = !TOTALISH.test(keyOf(A.label));   // 合計の行が内訳より先に来る名前か（「売上債権」「棚卸資産」）
      const stopAt = (r) => { const k = keyOf(r.label); return STOP_ACCT.test(k) || (r !== A && AGG_ANY.test(k)); };
      // 行 i の下（dir=1）／上（dir=-1）に続くひと続きの行で、和が target に一致するもの（2行以上）。見つからなければ null
      const childrenOf = (i, dir, target) => {
        let acc = 0;
        const rows = [];
        for (let j = i + dir; j >= 0 && j < rowsIn.length && rows.length < 20; j += dir) {
          const r = rowsIn[j];
          if (!sideOk(r) || isMemo(r.label)) continue;
          if (stopAt(r) || TOTALISH.test(keyOf(r.label))) break;
          rows.push(r); acc += one(r);
          if (rows.length >= (dir === 1 ? 2 : 1) && Math.abs(acc - target) <= Math.max(0, rows.length - 1)) return { rows, end: j };
        }
        return null;
      };
      const walk = (dir, withSub) => {
        let acc = 0, n = 0;
        const members = [];
        for (let i = idx + dir; i >= 0 && i < rowsIn.length && members.length < 30; i += dir) {
          const r = rowsIn[i];
          if (!sideOk(r) || isMemo(r.label)) continue;
          if (stopAt(r)) break;
          const tot = TOTALISH.test(keyOf(r.label));
          if (tot && !(withSub && dir === -1)) break;
          const v = one(r);
          if (withSub) {
            // 上へ歩いて小計の行（「商品 合計」）に当たった：そのさらに上の、和が小計に一致する行を内訳として飛ばす
            // 下へ歩いて、すぐ下の2行以上の和になっている行（「商品及び製品」→ 商品・製品）に当たった：その下の行を飛ばす
            const sub = tot ? childrenOf(i, -1, v) : (dir === 1 ? childrenOf(i, 1, v) : null);
            if (tot && !sub) break;
            if (sub) { members.push(r, ...sub.rows); acc += v; n++; i = sub.end; }
            else { members.push(r); acc += v; n++; }
          } else { members.push(r); acc += v; n++; }
          if (members.some((m) => restRows.includes(m)) && Math.abs(acc - a.value) <= tolN(n)) return members;
        }
        return null;
      };
      const dir = lead ? 1 : -1;
      // 小計を飛ばさない歩き方と飛ばす歩き方の両方を試し、内訳として多くの行をまとめられた方を採る
      // （「棚卸資産 1,500 → 商品及び製品 1,500 → 商品 1,000・製品 500」で、最初の行だけで一致して止まると、
      //  商品・製品を別の科目として二重に数える。8回目の独立レビューの指摘）
      const best = (d) => { const a1 = walk(d, false), a2 = walk(d, true); return !a1 ? a2 : !a2 ? a1 : (a2.length > a1.length ? a2 : a1); };
      const w = best(dir) || (lead ? best(-1) : null);
      if (w) return finish(w);
      // (a)
      if (lead) {
        const kids = [];
        for (let i = idx + 1; i < rowsIn.length; i++) {
          const r = rowsIn[i];
          if (!sideOk(r)) continue;
          if (!(typeof r.lx === "number" && typeof A.lx === "number" && r.lx > A.lx + 2)) break;
          kids.push(r);
        }
        // 字下げで判断するのは、同じ字下げの行が2行以上続くときだけ（科目名を中央にそろえた表では、短い科目名が字下げに見える）
        const sameIndent = kids.length >= 2 && kids.every((r) => Math.abs(r.lx - kids[0].lx) <= 2);
        if (sameIndent && kids.some((r) => restRows.includes(r))) return finish(kids);
      }
      // どれでもない：すべて足す。合計の行の内訳が並ぶ側（「棚卸資産」なら下、「…合計」なら上。区分の境目まで）に
      // 同じ種類の行があれば警告する（反対側に並ぶ同じ種類の行は、ふつうは別の科目。建設業の「未成工事支出金」の下の
      // 「たな卸資産」など。そこで警告すると、ふつうの決算書で毎回警告が出る）
      const near = [];
      for (let i = idx + dir; i >= 0 && i < rowsIn.length; i += dir) {
        const r = rowsIn[i];
        if (!sideOk(r) || isMemo(r.label)) continue;
        if (stopAt(r) || TOTALISH.test(keyOf(r.label))) break;
        if (restRows.includes(r)) near.push(r);
      }
      const res = all();
      if (near.length) {
        ambiguous.push(`${name}は、合計の行「${A.label}」と、ほかの${name}の科目（${restRows.map((r) => r.label).join("・")}）を足しました。` +
                       `これらが「${A.label}」の内訳であれば二重に数えています。決算書でご確認ください。`);
      }
      return res;
    };
    const ambiguous = [];
    set("receivables", pickCat(ca, assetSide, "receivables", /^(?:売上債権|売上債権(?:合計|小計|計))$/, "売上債権"));
    set("inventory", pickCat(ca, assetSide, "inventory", /^(?:棚卸資産|たな卸資産)(?:合計|小計|計)?$/, "棚卸資産"));
    set("payables", pickCat(sliced ? cur : bs, liabSide, "payables", /^(?:仕入債務|仕入債務(?:合計|小計|計))$/, "仕入債務"));
    for (const m of ambiguous) warnings.push(m);
    // 有利子負債：科目の合計の行と、それがまとめた借入金の科目の行を二重に数えない（blocksOf）
    const debtIn = (rowsIn) => {
      const { drop, extra, names } = blocksOf(rowsIn, liabSide, "debt");
      const f = (r) => liabSide(r) && (extra.has(r) || (isItem("debt", r.label) && !drop.has(r)));
      f.nameOf = (r) => names.get(r) || r.label;   // 科目名の無い「計」は、まとめた借入金の科目の名前で短期・長期を見分ける
      return f;
    };
    if (sliced) {
      set("shortDebt", pullBy(cur, debtIn(cur), yi));
      set("longDebt", pullBy(fix, debtIn(fix), yi));
    } else {
      // 流動・固定の区切りが分からない：「短期」「1年内」などと明記された科目だけを短期に、
      // 「長期」「社債」を長期に数える。区切れないまま全体を足すと、同じ借入金を両方に数えてしまう
      // 辞書の結果は区切れないまま全体から拾っているため、見つからなかった場合も含めて置き換える
      const debt = debtIn(bs);
      const nm = (r) => keyOf(debt.nameOf(r));
      const s = pullBy(bs, (r) => debt(r) && SHORT_DEBT.test(nm(r)), yi);
      const l = pullBy(bs, (r) => debt(r) && !SHORT_DEBT.test(nm(r)) && LONG_DEBT.test(nm(r)), yi);
      out.shortDebt = s.value; if (s.source) source.shortDebt = s.source; else delete source.shortDebt;
      out.longDebt = l.value; if (l.source) source.longDebt = l.source; else delete source.longDebt;
    }
    // 売上債権は貸倒引当金を引く前の額で数えるため、流動資産の中の貸倒引当金（△）を控えておく。
    // 検算（validatePeriod）で「現金預金＋売上債権＋棚卸資産 ≦ 流動資産合計」を確かめるときに戻して比べる
    // （引当金が「その他」より大きい正しい決算書を、重複と誤って知らせないため）。
    // なお、名前の型で集めた値が区分の合計を超えても、辞書の値に黙って戻すことはしない。
    // どちらが正しいかは決めきれず、戻すと正しい値を黙って捨てることがあった（独立レビューの指摘）。
    // 超えていれば検算が画面で知らせ、利用者に確かめてもらう。
    let allow = 0;
    for (const r of ca) if (/貸倒引当金/.test(keyOf(r.label)) && assetSide(r)) { const v = itemAt(r, yi); if (typeof v === "number" && v < 0) allow += -v; }
    out.allowanceCA = allow || null;   // 検算用（判定エンジンは使わない）
  }
  for (const [k, spec] of Object.entries(PL_DICT)) {
    const { value, source: s } = pull(pl, spec, yi);
    out[k] = value; if (s) source[k] = s;
  }

  // 事業別に損益を積む様式（鉄道・不動産など）。
  //   鉄道事業  営業収益 6,791,578 / 営業費 6,346,123 / 営業利益 445,454
  //   不動産事業 営業収益   814,538 / 営業費   545,008 / 営業利益 269,529
  //   全事業   営業利益   714,984
  // 同じ科目名が繰り返されるため、そのままでは最初の事業の数字だけを
  // 全社の売上高・営業利益として取り込んでしまう。
  // 実例：売上高が 7,606,116 のところ 6,791,578（−10.7%）、
  //       営業利益が 714,984 のところ 445,454（−37.7%）になっていた。
  // 「全事業営業利益」がある場合に限り、各事業を合算して差し替える。
  mergeSegmentPl(pl, out, source, yi, warnings);

  // 区分の見出し行に金額が無い様式では、内訳の右隣にある区分合計を推測する（検算つき）
  inferPlSections(pl, out, source, yi);

  // 「流動負債合計」「固定負債合計」を置かず、負債合計だけを書く様式への手当て。
  // 区分が両方とも空のままだと貸借が合わず、判定にも進めない。
  // 負債合計から固定負債（判明していれば）を引いた残りを流動負債とみなす。
  // 流動負債を多めに見ることになるが、流動比率は低く出る方向なので与信では安全側。
  if (out.currentLiab === null) {
    const liab = pull(bs, { agg: ["負債合計", "負債の部合計", "負債の部計", "負債計"], parts: [] }, yi);
    if (liab.value !== null) {
      out.currentLiab = liab.value - (out.fixedLiab || 0);
      source.currentLiab = "負債合計−固定負債（推定）";
      warnings.push("流動負債と固定負債の区分がこの決算書には記載されていないため、負債合計から推定しました。区分の内訳が必要な場合は手入力で補ってください。");
    }
  }

  // 売上原価の内訳（期首棚卸＋仕入−期末棚卸）だけを並べ、「売上原価」の行を置かない様式。
  // 売上総利益が読めていれば差額で確定できる。推測ではなく恒等式なので安全。
  if (out.cogs === null && out.sales !== null) {
    const g = pull(pl, GROSS, yi);
    if (g.value !== null) {
      out.cogs = out.sales - g.value;
      source.cogs = "売上高−売上総利益";
    }
  }

  // 小売業には「売上高」と「営業収入」を並べ、その合算を営業収益とする様式がある。
  // 売上高だけを採ると、営業利益が積み上がらない。
  // 実例：サンエーで 245,547 のところを 225,485 にしていた（営業収入 20,062 が抜けていた）。
  // 足したほうが営業利益の計算に合う場合にだけ採用する。
  if (out.sales !== null && out.cogs !== null && out.sga !== null && out.operating !== null) {
    const gap = out.sales - out.cogs - out.sga - out.operating;
    if (Math.abs(gap) > Math.max(2, Math.abs(out.sales) * 0.0005)) {
      const oi = pull(pl, OPINCOME, yi);
      if (oi.value !== null && Math.abs(out.sales + oi.value - out.cogs - out.sga - out.operating)
                               <= Math.max(2, Math.abs(out.sales) * 0.0005)) {
        out.sales += oi.value;
        source.sales = (source.sales || "売上高") + "＋" + oi.source;
      }
    }
  }

  // 総資本の行が「合計」としか書かれない様式（電気事業など）。
  // 資産側の区分が揃っていれば、その和が総資本と一致する。
  if (out.totalCapital === null && out.currentAssets !== null && out.fixedAssets !== null) {
    out.totalCapital = out.currentAssets + out.fixedAssets + (out.deferred || 0);
    source.totalCapital = "流動資産＋固定資産（合計行なし）";
  }

  // 減価償却費：CF計算書 →（無ければ）損益計算書 →（無ければ）全ページ の順に探す。
  // 中小企業の計算書類にはCF計算書が無く、販売費及び一般管理費明細書や
  // 製造原価報告書に載っていることが多いため、最後は全ページを走査する。
  let dep = pull(cf, DEP, yi);
  if (dep.value === null) {
    dep = pull(pl, DEP, yi);
    if (dep.value !== null) dep.source += "（損益計算書より）";
  }
  // 全ページを探すときは、読み取った決算書と違う範囲（連結／単体）の財務諸表のページを除く。
  // 単体で揃えたのに連結のキャッシュ・フロー計算書から減価償却費を拾うと、そこだけ連結の数字が混ざる
  // （独立レビューで作った見本 T7 で確認）。
  const scopeCons = found.PL ? found.PL.consolidated : (found.BS ? found.BS.consolidated : null);
  const otherScope = (pg) => scopeCons !== null && scopeCons !== undefined &&
    (pg.headings || []).some((h) => h.consolidated !== scopeCons);
  if (dep.value === null && Array.isArray(found._pages)) {
    // 販管費明細と製造原価報告書の両方にある場合は合算する（両方が費用計上分）
    const hits = [];
    for (const pg of found._pages) {
      if (found.CF && pg.no === found.CF.page) continue;
      if (found.PL && pg.no === found.PL.page) continue;
      if (otherScope(pg)) continue;
      const r = pg.rows.find((x) => DEP.agg.includes(x.label));
      if (r) {
        const v = itemAt(r, yi);
        if (typeof v === "number") hits.push({ page: pg.no, value: v });
      }
    }
    if (hits.length) {
      dep = { value: hits.reduce((a, h) => a + h.value, 0),
              source: hits.map((h) => `${h.page}ページ`).join("＋") + "（明細より）" };
      if (hits.length > 1) {
        warnings.push("減価償却費を複数ページから合算しました（" +
          hits.map((h) => `${h.page}ページ ${h.value.toLocaleString()}`).join(" ＋ ") +
          "）。二重計上でないかご確認ください。");
      }
    }
  }
  // それでも見つからないときは、注記の本文から拾う。
  // 中小企業の計算書類は「損益計算書に関する注記」に
  //   （3）減価償却費 2,467,046千円
  // と文章で書くことがあり、表になっていないため行としては取れない。
  // 単位付きで書かれているものだけを採り、決算書本体の単位へ換算する。
  if (dep.value === null && Array.isArray(found._pages) && found._unit) {
    const RE = /減価償却費(?:及び[^0-9]{0,10})?[^0-9△▲]{0,4}([△▲]?[\d,]+)(円|千円|百万円)/;
    const scale = { "円": 0.000001, "千円": 0.001, "百万円": 1 };
    for (const pg of found._pages) {
      if (otherScope(pg)) continue;
      const m = RE.exec(pg.text);
      if (!m) continue;
      const raw = toNum(m[1]);
      if (raw === null || raw === 0) continue;
      const v = Math.round(raw * scale[m[2]] / found._unit.toMillion);
      dep = { value: v, source: `${pg.no}ページの注記より` };
      warnings.push("減価償却費は注記の本文から読み取りました。金額をご確認ください。");
      break;
    }
  }
  out.depreciation = dep.value;
  if (dep.source) source.depreciation = dep.source;
  if (dep.value === null)
    warnings.push("減価償却費が見つかりませんでした。償還余力の算定に必要です。製造原価明細・販管費明細からご入力ください。");

  // 売上原価／販管費の区分が無い様式（電気事業・通信事業など）
  if (out.cogs === null && out.sga === null) {
    for (const name of OPEX) {
      const r = pl.find((x) => keyOf(x.label) === keyOf(name));
      if (r) {
        // 前期を取るときに左端から数えてはいけない。
        // 有価証券報告書には、隣の表の数値が左に1つ紛れ込む行があり、
        // そこを前期の金額として拾ってしまう。
        // 実例：東京電力の営業費用が 6,575,938 のところ 2 になっていた。
        out.sga = amountAt(r, yi);
        out.cogs = 0;
        source.sga = name + "（売上原価との区分なし）";
        warnings.push("この様式には売上原価と販管費の区分がありません。営業費用の全額を販管費として扱っています。売上総利益率は実態を表しません。");
        break;
      }
    }
  }

  // IFRSの損益計算書は費用を「△835,371」のようにマイナス表記する。
  // 本シートは費用を正の数で扱うため、符号を揃える。
  // 反転する前に「費用を負で書く様式かどうか」を覚えておく。
  const negStyle = ["cogs", "sga", "nonOpExp", "extraExp"]
    .some((k) => typeof out[k] === "number" && out[k] < 0);
  for (const k of ["cogs", "sga", "nonOpExp", "extraExp"]) {
    if (typeof out[k] === "number" && out[k] < 0) out[k] = -out[k];
  }
  // 法人税等だけは別扱いにする。
  // 税額は還付超過で本当にマイナスになることがあり、それを正に反転すると
  // 当期純利益が積み上がらなくなる（実例：法人税等 △2,868 を ＋2,868 にしていた）。
  // 費用を負で書く様式のときにだけ反転する。
  if (typeof out.tax === "number" && out.tax < 0 && negStyle) out.tax = -out.tax;
  // 営業外収益がマイナスで返るケース（その他費用を含めて相殺された場合）も正に寄せる
  if (typeof out.nonOpInc === "number" && out.nonOpInc < 0) {
    out.nonOpExp = (out.nonOpExp || 0) + Math.abs(out.nonOpInc);
    out.nonOpInc = 0;
  }

  // IFRS の損益計算書は、判定エンジンが組み立て直す利益を決算書の税引前利益に合わせる
  reconcileIfrsPl(pl, out, source, yi, warnings);

  // 「その他」は小計からの差額で埋める。こうすると小計が必ず一致する
  const d = (total, ...items) =>
    out[total] === null || out[total] === undefined
      ? null
      : out[total] - items.reduce((a, k) => a + (out[k] || 0), 0);
  out.otherCurrentAssets = d("currentAssets", "cash", "receivables", "inventory");
  out.otherFixedAssets = d("fixedAssets", "tangible");
  out.otherCurrentLiab = d("currentLiab", "payables", "shortDebt");
  out.otherFixedLiab = d("fixedLiab", "longDebt");

  // 決算書自体の端数処理で、資産側と負債側が1〜数単位ずれることがある。
  // 重要性のない差は「その他流動資産」で吸収して検算を0にする。
  // 吸収しないと、正しく読み取れているのに赤い警告が出て利用者を不安にさせる。
  {
    const a = (out.currentAssets || 0) + (out.fixedAssets || 0) + (out.deferred || 0);
    const l = (out.currentLiab || 0) + (out.fixedLiab || 0) + (out.equity || 0);
    const gap = a - l;
    const tol = Math.max(2, Math.abs(a) * 0.0001);   // 総資産の0.01%まで
    if (gap !== 0 && Math.abs(gap) <= tol && out.otherCurrentAssets !== null) {
      out.otherCurrentAssets -= gap;
      out.currentAssets -= gap;
      source.roundingAdjust = `端数調整 ${gap > 0 ? "−" : "＋"}${Math.abs(gap)}`;
    }
  }

  // 固定負債が無い会社（決算公告の小規模会社に多い）は、固定負債の行そのものが存在しない。
  // 総資本・流動負債・純資産が揃っていれば差額で埋められる。埋めないと区分が欠けたまま判定に入る。
  if (out.fixedLiab === null && out.totalCapital !== null &&
      out.currentLiab !== null && out.equity !== null) {
    const rest = out.totalCapital - out.currentLiab - out.equity;
    if (rest >= 0 && rest <= Math.abs(out.totalCapital) * 0.02) {
      out.fixedLiab = rest;
      source.fixedLiab = "差額（総資本−流動負債−純資産）";
      // その他固定負債も埋め直す（判定エンジンは内訳を足して固定負債を作るため、空のままだと固定負債が消える）
      out.otherFixedLiab = rest - (out.longDebt || 0);
    }
  }
  // 電気事業・鉄道事業の貸借対照表は「有形固定資産」という行を置かず、
  // 「電気事業固定資産」「鉄軌道事業固定資産」のように事業別に並べる。
  // 内訳を足し合わせると、その下位項目まで拾って二重計上になる（例：その他の電気事業固定資産）。
  // 固定資産から投資その他の資産と無形固定資産を引く恒等式のほうが確実。
  if (out.tangible === null && out.fixedAssets !== null) {
    const hasBiz = bs.some((r) => /事業固定資産$/.test(keyOf(r.label)));
    const inv = pull(bs, { agg: ["投資その他の資産", "投資その他の資産合計", "投資その他資産"], parts: [] }, yi);
    const intan = pull(bs, { agg: ["無形固定資産", "無形固定資産合計"], parts: [] }, yi);
    if (hasBiz && inv.value !== null) {
      out.tangible = out.fixedAssets - inv.value - (intan.value || 0);
      source.tangible = "固定資産−投資その他の資産" + (intan.value ? "−無形固定資産" : "");
    }
  }

  if (out.tangible === null && out.fixedAssets !== null)
    warnings.push("有形固定資産の内訳が特定できませんでした。固定資産合計は正しいですが、有形と無形の内訳はご確認ください。");
  for (const k of ["shortDebt", "longDebt"]) {
    if (out[k] === null) {
      out[k] = 0;
      warnings.push("有利子負債に該当する科目が見つかりませんでした。無借金でない場合は必ずご入力ください。");
      break;
    }
  }
  return { values: out, source, warnings };
}

/**
 * IFRS の損益計算書（経常利益が無く、税引前利益で段が切れる）を、判定エンジンの形に合わせる。
 * エンジンは「売上高−売上原価−販管費＋営業外収益−営業外費用＋特別利益−特別損失−法人税等」と
 * 内訳から利益を作り直す。IFRS の「その他の収益・費用」「金融収益・費用」「持分法による投資損益」
 * 「為替差損益」などを拾い残すと、項目ひとつひとつは正しく読めていても、利益が大きくずれる
 * （実例：トヨタ自動車で当期純利益 4,789,755 のところ 6,119,260、リクルートで 496,680 のところ 536,772）。
 *   ① 「売上原価並びに販売費及び一般管理費合計」「営業費用合計」のような費用の合計行があれば、
 *      その内訳のうち売上原価・販管費以外の費用（例：金融事業に係る金融費用）を売上原価に加える
 *   ② 販管費（①の合計行があればその行）より下、税引前利益より上の行を、段階利益の行を除いて
 *      収益（＋）と費用（−）に分け、営業外収益・営業外費用とする
 * 組み立てた税引前利益が決算書の税引前利益と合うときだけ採用する。合わなければ値は触らず、その旨を知らせる。
 */
function reconcileIfrsPl(pl, out, source, yi, warnings) {
  if (!pl.length || (out.ordinary !== null && out.ordinary !== undefined)) return;   // 経常利益がある＝日本基準
  if (out.sales === null || out.cogs === null || out.sga === null) return;
  const k = (r) => keyOf(r.label);
  // 日本基準の区分の行があれば IFRS ではない（経常利益だけ読み落とした日本基準の表を、ここで作り変えない）
  if (pl.some((r) => /^(?:経常利益|経常損失|営業外収益|営業外費用|特別利益|特別損失)/.test(k(r)))) return;
  const iPre = pl.findIndex((r) => /^(?:税引前(?:当期)?(?:利益|損失)|税金等調整前当期純(?:利益|損失))/.test(k(r)));
  if (iPre < 0) return;
  // 行の中から、求める年度の列の金額を取る（注記番号の列が左に紛れ込んでいても、右から数える）
  const maxCol = Math.max(-1, ...pl.filter((r) => Array.isArray(r.cols) && r.cols.length).map((r) => Math.max(...r.cols)));
  const valOf = (r) => {
    if (maxCol >= 1 && Array.isArray(r.cols) && r.cols.length === r.amounts.length) {
      const i = r.cols.indexOf(yi === -1 ? maxCol : maxCol - 1);
      return i >= 0 ? r.amounts[i] : null;
    }
    const a = r.amounts;
    return yi === -1 ? a[a.length - 1] : (a.length >= 2 ? a[a.length - 2] : null);
  };
  const pretax = valOf(pl[iPre]);
  if (typeof pretax !== "number") return;
  const idxOf = (name) => (name ? pl.findIndex((r) => k(r) === keyOf(name)) : -1);
  const iSales = idxOf(source.sales), iCogs = idxOf(source.cogs), iSga = idxOf(source.sga);
  if (iSales < 0 || iCogs < 0 || iSga < 0 || iSales > iPre || iCogs > iPre || iSga > iPre) return;
  const SUBTOTAL = /合計$|^売上総利益|^営業利益|^営業損失|^コア営業利益|^事業利益/;
  const contrib = (r) => {
    const v = valOf(r);
    if (typeof v !== "number") return null;
    const key = k(r);
    if (/損益|純額/.test(key)) return v;               // 為替差損益<純額>・持分法による投資損益（△は損失）は符号どおり
    if (/費用|損失|原価/.test(key)) return -Math.abs(v); // 費用の行は、△の有無にかかわらず差し引く
    return v;                                          // 収益の行
  };
  const near = (x, y) => Math.abs(x - y) <= Math.max(3, Math.abs(y) * 0.0005);
  let cogs = out.cogs, start = iSga, cogsNote = "";
  // ① 費用の合計行
  const iCost = pl.findIndex((r) => /^(?:売上原価並びに販売費及び一般管理費|売上原価及び販売費及び一般管理費|営業費用)合計$/.test(k(r)));
  if (iCost > iSales && iCost < iPre) {
    const extra = [];
    for (let i = iSales + 1; i < iCost; i++) {
      if (i === iCogs || i === iSga || SUBTOTAL.test(k(pl[i]))) continue;
      const c = contrib(pl[i]);
      if (c !== null) extra.push([pl[i].label, c]);
    }
    const total = valOf(pl[iCost]);
    const add = -extra.reduce((a, [, c]) => a + c, 0);
    if (extra.length && typeof total === "number" && near(cogs + out.sga + add, Math.abs(total))) {
      cogs += add;
      cogsNote = "＋" + extra.map(([l]) => l).join("＋");
    }
    start = Math.max(start, iCost);
  }
  // ② 販管費（費用の合計行）より下、税引前利益より上
  let inc = 0, exp = 0;
  const incL = [], expL = [];
  for (let i = start + 1; i < iPre; i++) {
    if (SUBTOTAL.test(k(pl[i]))) continue;
    const c = contrib(pl[i]);
    if (c === null) continue;
    if (c >= 0) { inc += c; incL.push(pl[i].label); } else { exp += -c; expL.push(pl[i].label); }
  }
  const calc = out.sales - cogs - out.sga + inc - exp;
  if (!near(calc, pretax)) {
    warnings.push(`IFRSの損益計算書で、営業利益より下の項目を足し上げた税引前利益（${Math.round(calc).toLocaleString()}）が、` +
      `決算書の税引前利益（${pretax.toLocaleString()}）と合いません。営業外収益・営業外費用（金融収益・費用、その他の収益・費用など）をご確認ください。`);
    return;
  }
  if (cogsNote) { out.cogs = cogs; source.cogs = (source.cogs || "売上原価") + cogsNote; }
  out.nonOpInc = inc; source.nonOpInc = incL.length ? incL.join("＋") + "（IFRS）" : "該当なし（IFRS）";
  out.nonOpExp = exp; source.nonOpExp = expL.length ? expL.join("＋") + "（IFRS）" : "該当なし（IFRS）";
}

/**
 * 独立に抽出した資産側小計と負債側小計を突き合わせる。
 * v は百万円。unit（決算書の単位）を渡すと、
 *  ・許容差の下限を「原本の2単位」にする（百万円の決算書は2百万円、円の決算書は2円）
 *  ・文中の金額を原本の単位で書く（「差 2,500,000円」。百万円に直した「差 2.5」は原本と突き合わせられない）
 */
export function validatePeriod(v, unit) {
  const a = (v.currentAssets || 0) + (v.fixedAssets || 0) + (v.deferred || 0);
  const l = (v.currentLiab || 0) + (v.fixedLiab || 0) + (v.equity || 0);
  const msgs = [];
  const has = (...ks) => ks.every((k) => v[k] !== null && v[k] !== undefined);
  const u = unit && unit.toMillion ? unit.toMillion : 1;
  const jp = (n) => Math.round(Number(n) / u).toLocaleString() + (unit && unit.label ? unit.label : "");
  const tol = (base, scale) => Math.max(2 * u, Math.abs(base || 0) * 0.005, Math.abs(scale || 0) * 0.0005);

  if (Math.abs(a - l) > Math.max(2 * u, Math.abs(a) * 0.0001))
    msgs.push(`貸借が一致しません（資産計 ${jp(a)} と 負債純資産計 ${jp(l)} の差 ${jp(a - l)}）`);

  // 以下の積み上がりの検算は、判定エンジンと同じく「読み取れていない内訳は0」として計算する。
  // エンジンは内訳から利益を組み立て直すため、内訳が1つ欠けただけで利益がずれる。
  // 以前は内訳が1つでも欠けると検算そのものを飛ばしていたため、法人税等や特別損益を読み落とすと、
  // 利益が膨らんだまま「そのまま使えます」になりえた。
  const z = (x) => x || 0;

  // 経常利益の積み上がり
  if (has("ordinary", "operating")) {
    const calc = v.operating + z(v.nonOpInc) - z(v.nonOpExp);
    if (Math.abs(calc - v.ordinary) > tol(v.ordinary))
      msgs.push(`経常利益が積み上がりません（計算 ${jp(calc)} と 記載 ${jp(v.ordinary)}）`);
  }

  // 営業利益の積み上がり。
  // 売上原価と販管費の区分が無い様式では cogs=0 として扱っているため、そこも通る。
  if (has("sales", "operating", "ordinary")) {   // IFRSは経常利益が無く、営業利益にその他収益/費用を含むため対象外
    const calc = v.sales - z(v.cogs) - z(v.sga);
    if (Math.abs(calc - v.operating) > tol(v.operating, v.sales))
      msgs.push(`営業利益が積み上がりません（売上高−売上原価−販管費 ${jp(calc)} と 記載 ${jp(v.operating)}）`);
  }

  // 営業利益の行が読めていないと、上の2つの検算はどちらも動かない。
  // 判定エンジンが作る経常利益（売上高−売上原価−販管費＋営業外収益−営業外費用）と、記載の経常利益を直接突き合わせる。
  if (!has("operating") && has("sales", "ordinary")) {
    const calc = v.sales - z(v.cogs) - z(v.sga) + z(v.nonOpInc) - z(v.nonOpExp);
    if (Math.abs(calc - v.ordinary) > tol(v.ordinary, v.sales))
      msgs.push(`経常利益が積み上がりません（売上高−売上原価−販管費＋営業外収益−営業外費用 ${jp(calc)} と 記載 ${jp(v.ordinary)}）`);
  }

  // 当期純利益までの積み上がり。
  // ここに検算が無かったため、法人税等の二重計上や事業別損益の取りこぼしが
  // 貸借の一致だけをすり抜けて、そのまま判定に流れ込んでいた。
  if (has("ordinary", "net")) {
    const calc = v.ordinary + z(v.extraInc) - z(v.extraExp) - z(v.tax);
    if (Math.abs(calc - v.net) > tol(v.net, v.ordinary))
      msgs.push(`当期純利益が積み上がりません（経常利益＋特別損益−法人税等 ${jp(calc)} と 記載 ${jp(v.net)}）`);
  }

  // 法人税等も当期純利益も読めていないと、判定エンジンは法人税等を0として当期純利益を作る（実際より大きく出る）。
  // 上の検算は当期純利益が無いと動かないので、ここで知らせる。
  // IFRS（経常利益が無い）でも同じ。損益計算書の行が読めていれば（売上高・営業利益など）知らせる。
  if (!has("net") && !has("tax") && (has("ordinary") || has("operating") || has("sales")))
    msgs.push("法人税等と当期純利益が読み取れていません。このままでは法人税等を0として計算するため、当期純利益が実際より大きく出ます。決算書をご確認のうえ、下の「ここだけ入力してください」の欄に法人税等を入力してください。");

  // IFRS（経常利益が無い）の当期利益までの積み上がり。
  // 判定エンジンは内訳から利益を組み立て直すため、ここが合わないと評点が決算書と違う利益で計算される。
  if (!has("ordinary") && has("sales", "net")) {
    const calc = v.sales - z(v.cogs) - z(v.sga) + z(v.nonOpInc) - z(v.nonOpExp) + z(v.extraInc) - z(v.extraExp) - z(v.tax);
    if (Math.abs(calc - v.net) > tol(v.net, v.sales))
      msgs.push(`当期利益が積み上がりません（内訳から計算 ${jp(calc)} と 記載 ${jp(v.net)}）`);
  }

  // 区分をまたいだ二重計上の検出。
  // 有利子負債は流動負債・固定負債の内数なので、区分の合計を超えることはない。
  // 超えていれば、同名科目を流動と固定の両方で拾っている。
  const sdOver = has("shortDebt", "currentLiab") && v.shortDebt > v.currentLiab * 1.001 + 2 * u;
  if (sdOver)
    msgs.push(`短期有利子負債 ${jp(v.shortDebt)} が流動負債 ${jp(v.currentLiab)} を超えています（区分の重複の可能性）`);
  if (has("longDebt", "fixedLiab") && v.longDebt > v.fixedLiab * 1.001 + 2 * u)
    msgs.push(`長期有利子負債 ${jp(v.longDebt)} が固定負債 ${jp(v.fixedLiab)} を超えています（区分の重複の可能性）`);
  // 内訳（判定エンジンが足し上げる科目）が区分の合計を超えていれば、どこかで二重に数えている。
  // エンジンは「その他」を 合計−内訳 で持つため、ここを見逃すと「その他」がマイナスのまま判定に入る。
  if (has("currentAssets")) {
    const parts = z(v.cash) + z(v.receivables) + z(v.inventory) - z(v.allowanceCA);   // 売上債権は貸倒引当金を引く前の額
    if (parts > v.currentAssets * 1.001 + 2 * u)
      msgs.push(`現金預金・売上債権・棚卸資産の合計 ${jp(parts)} が流動資産合計 ${jp(v.currentAssets)} を超えています（内訳の重複の可能性）`);
  }
  if (has("tangible", "fixedAssets") && v.tangible > v.fixedAssets * 1.001 + 2 * u)
    msgs.push(`有形固定資産 ${jp(v.tangible)} が固定資産合計 ${jp(v.fixedAssets)} を超えています（内訳の重複の可能性）`);
  if (!sdOver && has("currentLiab")) {
    const parts = z(v.payables) + z(v.shortDebt);
    if (parts > v.currentLiab * 1.001 + 2 * u)
      msgs.push(`仕入債務・短期有利子負債の合計 ${jp(parts)} が流動負債合計 ${jp(v.currentLiab)} を超えています（内訳の重複の可能性）`);
  }

  return { diff: a - l, messages: msgs };
}

/** エンジン入力のキー名に合わせて1期分を返す */
export function toEngineFields(v) {
  return {
    sales: v.sales, cogs: v.cogs, sga: v.sga,
    nonOpInc: v.nonOpInc, nonOpExp: v.nonOpExp,
    extraInc: v.extraInc, extraExp: v.extraExp, tax: v.tax,
    depreciation: v.depreciation,
    cash: v.cash, receivables: v.receivables, inventory: v.inventory,
    otherCurrentAssets: v.otherCurrentAssets, tangible: v.tangible,
    otherFixedAssets: v.otherFixedAssets, deferred: v.deferred,
    payables: v.payables, shortDebt: v.shortDebt,
    otherCurrentLiab: v.otherCurrentLiab, longDebt: v.longDebt,
    otherFixedLiab: v.otherFixedLiab, equity: v.equity,
  };
}
