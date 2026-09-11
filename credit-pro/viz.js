/* ============================================================================
 * /credit-pro/viz.js — 判定結果の見える化
 *
 * engine.js の evaluate() が返す結果オブジェクトだけを読んで SVG を組み立てる。
 * 計算は一切やり直さない（Excel版 Pro と同じ数字がそのまま図になる）。
 * 外部ライブラリなし。app.js から renderViz(r, f) を呼ぶ。
 * ========================================================================== */

/* サイトのパレット（index.html の :root と同じ値） */
const C = {
  seaDeep: "#33526C", sea: "#527695", sky: "#84D2F5", aqua: "#B0F1F0", mist: "#DFF6F1",
  ink: "#0F1A22", soft: "#4A5A66", faint: "#7A8A95",
  warn: "#B5623F", amber: "#E0A94A", peridot: "#82B33A", green: "#4E8F2E",
  rose: "#F4C3D3", bloom: "#F8A3BF", deep: "#8C3B22",
  track: "#E1E9ED", grid: "#E2E9EC", axis: "#9FB0BC",
};

/* ------------------------------------------------------------ 小道具 */
const esc = (s) => String(s ?? "").replace(/[&<>"]/g,
  (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
const n1 = (x) => (isFinite(x) ? x.toFixed(1) : "—");
const n2 = (x) => (isFinite(x) ? x.toFixed(2) : "—");
const p1 = (x) => (isFinite(x) ? (x * 100).toFixed(1) + "%" : "—");
const clip = (t, n) => (String(t).length > n ? String(t).slice(0, n - 1) + "…" : String(t));

function T(x, y, t, o = {}) {
  const halo = o.halo
    ? `<text x="${x}" y="${y}" font-size="${o.s || 11}" ${o.a ? `text-anchor="${o.a}"` : ""}
        ${o.w ? `font-weight="${o.w}"` : ""} fill="none" stroke="#fff" stroke-width="3.4"
        stroke-linejoin="round">${esc(t)}</text>` : "";
  return halo + `<text x="${x}" y="${y}" font-size="${o.s || 11}" fill="${o.c || C.soft}"
    ${o.a ? `text-anchor="${o.a}"` : ""} ${o.w ? `font-weight="${o.w}"` : ""}>${esc(t)}</text>`;
}
const R = (x, y, w, h, f, o = {}) =>
  (w > 0 && h > 0)
    ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${o.rx ? ` rx="${o.rx}"` : ""}${o.st ? ` stroke="${o.st}" stroke-width="${o.sw || 1}"` : ""}/>`
    : "";
const L = (x1, y1, x2, y2, c, w = 1, d) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}"${d ? ` stroke-dasharray="${d}"` : ""}/>`;

/** 目盛りをきりのいい数字にする */
function niceStep(x) {
  if (!(x > 0)) return 1;
  const e = Math.pow(10, Math.floor(Math.log10(x))), m = x / e;
  for (const c of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) if (m <= c + 1e-9) return c * e;
  return 10 * e;
}
/** lo〜hi を4区間のきりのいい目盛りに収める（0は必ず目盛り線に乗る） */
function axis4(lo, hi) {
  if (hi <= lo) hi = lo + 1;
  let step = niceStep((hi - lo) / 4), a, b, guard = 0;
  do {
    a = Math.floor(lo / step) * step; b = a + step * 4;
    if (b >= hi - 1e-9) break;
    step = niceStep(step * 1.05);
  } while (++guard < 20);
  return { lo: a, hi: b, ticks: [0, 1, 2, 3, 4].map((i) => a + step * i) };
}
const svg = (vb, body) =>
  `<svg class="viz__svg" viewBox="${vb}" role="img" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

/* ======================================================= ① スコアの内訳 */
function scoreBars(r) {
  const s = r.scores;
  const rows = [
    ["① 業歴", s.gyoreki, 10], ["② 資本構成", s.shihon, 12], ["③ 規模", s.kibo, 18],
    ["④ 損益", s.soneki, 10], ["⑤ 経営者", s.keiei, 20], ["⑥ 償還余力", s.shokan, 30],
  ];
  const MAX = 30, bx = 108, bw = 250, rowH = 38, top = 14;
  let h = "";
  rows.forEach(([name, got, max], i) => {
    const y = top + i * rowH, track = bw * max / MAX, ratio = max ? got / max : 0;
    const col = ratio >= 0.8 ? C.green : ratio >= 0.6 ? C.peridot
      : ratio >= 0.4 ? C.sea : ratio >= 0.2 ? C.warn : C.deep;
    h += T(0, y + 18, name, { s: 12.5, w: "700", c: C.ink });
    h += R(bx, y + 5, track, 17, C.track, { rx: 5 });
    h += R(bx, y + 5, Math.max(track * ratio, ratio > 0 ? 2 : 0), 17, col, { rx: 5 });
    h += T(bx + track + 9, y + 18, `${got} / ${max}`, { s: 11.5, w: "700", c: C.ink });
    h += T(0, y + 31, `${Math.round(ratio * 100)}%を取得`, { s: 9.5, c: C.faint });
  });
  const y = top + rows.length * rowH + 4;
  h += L(0, y, 420, y, "#C9D3D8", 1);
  h += T(0, y + 19, "合計", { s: 13.5, w: "700", c: C.ink });
  h += T(bx + bw + 9, y + 19, `${s.total} / 100`, { s: 13.5, w: "700", c: C.ink });
  h += T(0, y + 33, "バーの長さは配点の大きさ（30点満点＝いちばん長い）", { s: 9.5, c: C.faint });
  return svg("0 0 420 300", h);
}

/* ================================================= ② 財務指標のかたち */
const RADAR = [
  { n: "自己資本比率", u: "%", dec: 1, dir: 1, star: true,
    get: (r) => r.ratios.periods[0].equityRatio * 100, bm: (r) => r.benchmark.equityRatio * 100 },
  { n: "経常利益率", u: "%", dec: 1, dir: 1, star: true,
    get: (r) => r.ratios.periods[0].ordinaryMargin * 100, bm: (r) => r.benchmark.ordinaryMarginAvg3 * 100 },
  { n: "営業利益率", u: "%", dec: 1, dir: 1, star: true,
    get: (r) => r.ratios.periods[0].operatingMargin * 100, bm: (r) => r.benchmark.operatingMarginR6 * 100 },
  { n: "総資本回転率", u: "回", dec: 2, dir: 1, star: false,
    get: (r) => r.ratios.periods[0].assetTurnover, bm: () => 1.0 },
  { n: "流動比率", u: "%", dec: 0, dir: 1, star: false,
    get: (r) => r.ratios.periods[0].currentRatio * 100, bm: () => 120 },
  { n: "借入金月商倍率", u: "か月", dec: 2, dir: -1, star: false,
    get: (r) => r.ratios.periods[0].gearingMonths, bm: () => 6.0 },
];
const norm = (v, b, dir) => {
  if (!isFinite(v)) return 3;
  if (dir > 0) return b > 0 ? Math.max(3, Math.min(100, v / b * 50)) : 3;
  if (v <= 0) return 100;
  return b > 0 ? Math.max(3, Math.min(100, b / v * 50)) : 3;
};

function radar(r) {
  if (!(r.cur.totalCapital > 0) || !(r.cur.sales > 0))
    return svg("0 0 420 330", R(0, 0, 420, 330, "#F3F6F7", { rx: 10 })
      + T(210, 168, "決算書の数字を入れるとチャートが出ます", { a: "middle", s: 12, c: C.faint }));
  const cx = 210, cy = 148, RR = 95;
  const vals = RADAR.map((ax) => {
    const v = ax.get(r), b = ax.bm(r);
    return { ax, v, b, s: norm(v, b, ax.dir) };
  });
  let h = "";
  [25, 50, 75, 100].forEach((k) => {
    const p = vals.map((_, i) => {
      const a = (i * 60 - 90) * Math.PI / 180;
      return `${cx + Math.cos(a) * RR * k / 100},${cy + Math.sin(a) * RR * k / 100}`;
    });
    h += `<polygon points="${p.join(" ")}" fill="none" stroke="${k === 100 ? "#B4C4CC" : "#DCE5E9"}" stroke-width="1"/>`;
  });
  for (let i = 0; i < 6; i++) {
    const a = (i * 60 - 90) * Math.PI / 180;
    h += L(cx, cy, cx + Math.cos(a) * RR, cy + Math.sin(a) * RR, "#DCE5E9", 1);
  }
  const base = vals.map((_, i) => {
    const a = (i * 60 - 90) * Math.PI / 180;
    return `${cx + Math.cos(a) * RR * 0.5},${cy + Math.sin(a) * RR * 0.5}`;
  });
  const mine = vals.map((o, i) => {
    const a = (i * 60 - 90) * Math.PI / 180;
    return `${cx + Math.cos(a) * RR * o.s / 100},${cy + Math.sin(a) * RR * o.s / 100}`;
  });
  h += `<polygon points="${base.join(" ")}" fill="none" stroke="#5A6B76" stroke-width="1.6" stroke-dasharray="5 4"/>`;
  h += `<polygon points="${mine.join(" ")}" fill="${C.sea}" fill-opacity="0.26" stroke="${C.sea}" stroke-width="2.4"/>`;
  mine.forEach((p) => { const [x, y] = p.split(","); h += `<circle cx="${x}" cy="${y}" r="3.4" fill="${C.seaDeep}"/>`; });
  vals.forEach((o, i) => {
    const a = (i * 60 - 90) * Math.PI / 180;
    const lx = cx + Math.cos(a) * (RR + 24), ly = cy + Math.sin(a) * (RR + 24);
    const an = Math.cos(a) > 0.2 ? "start" : Math.cos(a) < -0.2 ? "end" : "middle";
    h += T(lx, ly, o.ax.n + (o.ax.star ? " ★" : ""), { a: an, s: 10.5, w: "700", c: C.ink });
    h += T(lx, ly + 13, (isFinite(o.v) ? o.v.toFixed(o.ax.dec) : "—") + o.ax.u, { a: an, s: 10.5, w: "700", c: C.sea });
    if (o.ax.dir < 0) h += T(lx, ly + 24, "小さいほど良い", { a: an, s: 8.5, c: C.faint });
  });
  h += T(210, 318, "点線＝基準。外にはみ出していれば基準より良い", { a: "middle", s: 10, c: C.faint });
  return svg("0 0 420 330", h);
}

function radarTable(r, f) {
  const rows = RADAR.map((ax) => {
    const v = ax.get(r), b = ax.bm(r);
    const ok = ax.dir > 0 ? v >= b : v <= b;
    const mark = ok ? "○" : "△";
    const word = ax.star ? (ok ? "基準以上" : "基準未満") : (ok ? (ax.dir > 0 ? "目安以上" : "目安以内") : (ax.dir > 0 ? "目安未満" : "目安超"));
    return `<tr><th>${esc(ax.n)}${ax.star ? ' <span class="viz__star">★</span>' : ""}</th>
      <td>${isFinite(v) ? v.toFixed(ax.dec) + ax.u : "—"}</td>
      <td class="viz__bm">${b.toFixed(ax.dec)}${ax.u}</td>
      <td class="${ok ? "viz__ok" : "viz__ng"}">${mark} ${word}</td></tr>`;
  }).join("");
  return `<table class="viz__table"><thead><tr><th>指　標</th><th>実　績</th><th>基準・目安</th><th>判定</th></tr></thead>
    <tbody>${rows}</tbody></table>
    <p class="viz__note">★＝財務省 法人企業統計の該当業種の値（${esc(r.input.industry.trim())}／${esc(r.input.capitalTier)}）。
    ★のない3つは実務上の一般的な目安（総資本回転率1.0回・流動比率120%・借入金月商倍率6か月）です。</p>`;
}

/* ============================================= ③ 貸借対照表のかたち */
function bsBlock(r, f) {
  const cur = r.cur;
  const assets = cur.totalAssets, liabEq = cur.totalCapital;
  if (!(assets > 0))
    return svg("0 0 420 300", R(0, 0, 420, 300, "#F3F6F7", { rx: 10 })
      + T(210, 154, "貸借対照表を入力すると図が出ます", { a: "middle", s: 12, c: C.faint }));
  const top = 44, bot = 272, H = bot - top, lx = 46, rx = 214, cw = 118;
  const scale = Math.max(assets, liabEq);
  const px = (a) => H * a / scale;
  let h = T(lx + cw / 2, 30, "資産（持ち物）", { a: "middle", s: 11.5, w: "700", c: C.ink })
        + T(rx + cw / 2, 30, "負債・純資産（お金の出どころ）", { a: "middle", s: 11.5, w: "700", c: C.ink });
  const stack = (x, items) => {
    let y = top, out = "";
    items.forEach((it) => {
      const hh = px(it.a);
      if (hh <= 0) return;
      out += R(x, y, cw, hh, it.c, { st: "#FFFFFF", sw: 1 });
      if (hh >= 19) {
        out += T(x + 8, y + hh / 2 - 2, it.n, { s: 10, w: "700", c: it.light ? "#FFFFFF" : C.ink });
        out += T(x + cw - 8, y + hh / 2 + 11, `${f.yenU(it.a)}（${Math.round(it.a / scale * 100)}%）`,
          { a: "end", s: 9.5, c: it.light ? "#FFFFFF" : C.soft });
      }
      y += hh;
    });
    return out;
  };
  h += stack(lx, [
    { n: "現金・預金", a: cur.cash, c: C.sky },
    { n: "その他の流動資産", a: Math.max(cur.currentAssets - cur.cash, 0), c: C.aqua },
    { n: "固定資産", a: cur.fixedAssets + cur.deferred, c: C.mist },
  ]);
  h += stack(rx, [
    { n: "有利子負債", a: cur.interestBearingDebt, c: C.sea, light: true },
    { n: "その他の負債", a: Math.max(cur.totalLiab - cur.interestBearingDebt, 0), c: "#CBDEE7" },
    { n: "純資産", a: Math.max(cur.equity, 0), c: C.peridot, light: true },
  ]);
  if (cur.equity < 0) {
    const yA = top + px(assets), yL = top + px(cur.totalLiab);
    h += L(lx, yA, rx + cw, yA, C.deep, 1.6, "6 4");
    h += R(rx, yA, cw, yL - yA, C.deep, { rx: 0 });
    h += T(rx + cw / 2, (yA + yL) / 2 + 4, "債務超過", { a: "middle", s: 11, w: "700", c: "#FFFFFF" });
  }
  h += T(210, 292, "左右の高さは必ず同じ。右下の緑が厚いほど、返さなくていいお金で買っている",
    { a: "middle", s: 9.5, c: C.faint });
  return svg("0 0 420 300", h);
}

/* ============================================== ④ 売上と利益の推移 */
function trend(r, f) {
  const S = [r.prev2.sales, r.prev.sales, r.cur.sales];
  const O = [r.prev2.ordinaryProfit, r.prev.ordinaryProfit, r.cur.ordinaryProfit];
  const labels = [r.input.terms[2] || "前々期", r.input.terms[1] || "前期", r.input.terms[0] || "今期"];
  if (S.every((x) => x <= 0))
    return svg("0 0 420 280", R(0, 0, 420, 280, "#F3F6F7", { rx: 10 })
      + T(210, 144, "売上高を入れると推移が出ます", { a: "middle", s: 12, c: C.faint }));
  const Lm = 54, Rm = 54, Tm = 26, Bm = 46, W = 420, Hh = 280;
  const x0 = Lm, x1 = W - Rm, y0 = Tm, y1 = Hh - Bm, pw = x1 - x0, ph = y1 - y0;
  const sA = axis4(0, Math.max(...S)), oA = axis4(Math.min(0, ...O), Math.max(0, ...O));
  const YS = (v) => y1 - ph * (v - sA.lo) / (sA.hi - sA.lo);
  const YO = (v) => y1 - ph * (v - oA.lo) / (oA.hi - oA.lo);
  let h = "";
  for (let g = 0; g <= 4; g++) {
    const gy = y0 + ph * g / 4, k = 4 - g;
    h += L(x0, gy, x1, gy, C.grid, 1);
    h += T(x0 - 7, gy + 4, f.yenU(sA.ticks[k]), { a: "end", s: 9, c: C.faint });
    h += T(x1 + 7, gy + 4, f.yenU(oA.ticks[k]), { s: 9, c: C.warn });
  }
  if (oA.lo < 0) h += L(x0, YO(0), x1, YO(0), C.warn, 1.4, "4 3");
  const bw = pw / 3 * 0.40, pts = [];
  S.forEach((s, i) => {
    const cx = x0 + pw * (i + 0.5) / 3;
    if (s > 0) {
      h += R(cx - bw / 2, YS(s), bw, y1 - YS(s), C.sky, { rx: 3 });
      // 経常利益の点が棒より上にあるときは、棒のラベルを棒の中に入れて衝突を避ける
      const inside = YO(O[i]) < YS(s) + 10;
      h += T(cx, YS(s) + (inside ? 16 : -6), f.yenU(s),
        { a: "middle", s: 9.5, w: "700", c: inside ? C.seaDeep : C.seaDeep, halo: !inside });
    }
    pts.push(`${cx},${YO(O[i])}`);
    h += T(cx, y1 + 16, clip(labels[i], 9), { a: "middle", s: 10, w: "700", c: C.ink });
  });
  h += `<polyline points="${pts.join(" ")}" fill="none" stroke="${C.warn}" stroke-width="2.6"/>`;
  O.forEach((o, i) => {
    const cx = x0 + pw * (i + 0.5) / 3, yy = YO(o);
    h += `<circle cx="${cx}" cy="${yy}" r="4.2" fill="${C.warn}" stroke="#fff" stroke-width="1.4"/>`;
    const onBar = S[i] > 0 && yy > YS(S[i]);
    h += T(cx, yy + (onBar ? 18 : -10), f.yenU(o), { a: "middle", s: 9.5, w: "700", c: C.warn, halo: 1 });
  });
  h += T(x0 - 7, y0 - 9, "売上高", { a: "end", s: 9.5, w: "700", c: C.seaDeep });
  h += T(x1 + 7, y0 - 9, "経常利益", { s: 9.5, w: "700", c: C.warn });
  h += T(210, Hh - 8, `単位：${f.U_LABEL()}`, { a: "middle", s: 9.5, c: C.faint });
  return svg("0 0 420 280", h);
}

/* ========================================== ⑤ 返せるお金と、返す額 */
function repay(r, f) {
  const cf = r.redemption.simpleCF;
  const rp = [0, 1, 2].map((i) => Number(r.input.repayment[i]) || 0);
  if (cf === 0 && rp.every((x) => x === 0))
    return svg("0 0 420 280", R(0, 0, 420, 280, "#F3F6F7", { rx: 10 })
      + T(210, 144, "返済計画を入れると図が出ます", { a: "middle", s: 12, c: C.faint }));
  const Lm = 58, Rm = 18, Tm = 26, Bm = 52, W = 420, Hh = 280;
  const x0 = Lm, x1 = W - Rm, y0 = Tm, y1 = Hh - Bm, pw = x1 - x0, ph = y1 - y0;
  const all = [cf, ...rp];
  const A = axis4(Math.min(0, ...all), Math.max(0, ...all));
  const Y = (v) => y1 - ph * (v - A.lo) / (A.hi - A.lo);
  let h = "";
  for (let g = 0; g <= 4; g++) {
    const gy = y0 + ph * g / 4;
    h += L(x0, gy, x1, gy, C.grid, 1);
    h += T(x0 - 7, gy + 4, f.yenU(A.ticks[4 - g]), { a: "end", s: 9, c: C.faint });
  }
  if (A.lo < 0) h += L(x0, Y(0), x1, Y(0), C.deep, 1.4, "4 3");
  const gw = pw / 3, bw = gw * 0.28;
  for (let i = 0; i < 3; i++) {
    const gx = x0 + gw * i + gw / 2, a = cf, b = rp[i];
    h += R(gx - bw - 3, Math.min(Y(a), Y(0)), bw, Math.abs(Y(a) - Y(0)), C.sea, { rx: 3 });
    h += R(gx + 3, Math.min(Y(b), Y(0)), bw, Math.abs(Y(b) - Y(0)), C.rose, { rx: 3 });
    if (a !== 0) h += T(gx - bw / 2 - 3, Y(a) + (a < 0 ? 12 : -6), f.yenU(a), { a: "middle", s: 9, w: "700", c: C.seaDeep });
    if (b !== 0) h += T(gx + bw / 2 + 3, Y(b) - 6, f.yenU(b), { a: "middle", s: 9, w: "700", c: C.warn });
    h += T(gx, y1 + 16, `${i + 1}年目`, { a: "middle", s: 10, w: "700", c: C.ink });
    const sur = a - b;
    if (a !== 0 || b !== 0)
      h += T(gx, y1 + 30, sur >= 0 ? `余力 +${f.yenU(sur)}` : `不足 ${f.yenU(-sur)}`,
        { a: "middle", s: 9.5, w: "700", c: sur >= 0 ? C.green : C.deep });
  }
  h += T(210, Hh - 5, `単位：${f.U_LABEL()}（簡易CF＝当期純利益＋減価償却費。3年とも直近期と同水準で見込む）`,
    { a: "middle", s: 9, c: C.faint });
  return svg("0 0 420 280", h);
}

/* ====================================== ⑥ 借金を返し切るまでの年数 */
function gauge(r) {
  const red = r.redemption;
  const x0 = 34, x1 = 386, y = 64, bh = 24, MAX = 25;
  const X = (yr) => x0 + (x1 - x0) * Math.max(0, Math.min(MAX, yr)) / MAX;
  let h = R(x0, y, X(10) - x0, bh, C.peridot, { rx: 0 })
        + R(X(10), y, X(20) - X(10), bh, C.amber)
        + R(X(20), y, x1 - X(20), bh, C.warn);
  [0, 5, 10, 15, 20, 25].forEach((t) => {
    h += L(X(t), y + bh, X(t), y + bh + 5, C.faint, 1);
    h += T(X(t), y + bh + 17, t === 25 ? "25年〜" : `${t}年`, { a: "middle", s: 9.5, c: C.faint });
  });
  h += T(x0 + (X(10) - x0) / 2, y + 16, "健全", { a: "middle", s: 11, w: "700", c: "#fff" });
  h += T((X(10) + X(20)) / 2, y + 16, "要注意", { a: "middle", s: 11, w: "700", c: "#fff" });
  h += T((X(20) + x1) / 2, y + 16, "厳しい", { a: "middle", s: 11, w: "700", c: "#fff" });
  if (red.required <= 0) {
    h += T(210, 26, "実質無借金", { a: "middle", s: 18, w: "700", c: C.green });
    h += `<polygon points="${x0},${y - 2} ${x0 - 8},${y - 15} ${x0 + 8},${y - 15}" fill="${C.green}"/>`;
  } else if (red.simpleCF <= 0) {
    h += T(210, 26, "返済原資なし（簡易CFがマイナス）", { a: "middle", s: 14, w: "700", c: C.deep });
  } else {
    const px = X(red.years);
    h += `<polygon points="${px},${y - 2} ${px - 8},${y - 15} ${px + 8},${y - 15}" fill="${C.ink}"/>`;
    h += T(210, 26, `${n1(red.years)} 年`, { a: "middle", s: 20, w: "700", c: C.ink });
  }
  h += T(210, y + bh + 34, "要償還債務（有利子負債−現預金−正常運転資金）÷ 簡易キャッシュフロー",
    { a: "middle", s: 9.5, c: C.faint });
  return svg("0 0 420 150", h);
}

/* ================================================ グラフの読み取り */
function readings(r, f) {
  const s = r.scores, cur = r.cur, red = r.redemption, bm = r.benchmark, p = r.ratios.periods[0];
  const out = [];
  const axes = [["① 業歴", s.gyoreki, 10], ["② 資本構成", s.shihon, 12], ["③ 規模", s.kibo, 18],
                ["④ 損益", s.soneki, 10], ["⑤ 経営者", s.keiei, 20], ["⑥ 償還余力", s.shokan, 30]];
  const worst = axes.slice().sort((a, b) => a[1] / a[2] - b[1] / b[2])[0];
  out.push(`評点100点のうち、いちばん取りこぼしているのは「${worst[0].replace(/^[①-⑥]\s*/, "")}」です。`
    + `${worst[2]}点満点中${worst[1]}点、達成率${Math.round(worst[1] / worst[2] * 100)}%。①の棒グラフで、薄い部分がいちばん長い行です。`);

  if (cur.totalCapital > 0) {
    const er = p.equityRatio;
    out.push(cur.equity < 0
      ? "純資産がマイナスです。債務超過の状態にあり、与信判断では最も重い事実として扱われます。"
      : `自己資本比率は${p1(er)}。業種×資本金階層で補正した基準${p1(bm.equityRatio)}を`
        + (er >= bm.equityRatio ? "上回っており、②のレーダーでは外側に出ます。" : `${p1(bm.equityRatio - er)}下回っており、②のレーダーでは内側にへこみます。`)
        + `　③のB/S図では、右の柱の緑の厚みが自己資本比率、いちばん上の濃い青が有利子負債（${f.yenU(cur.interestBearingDebt)}${f.U_LABEL()}）です。`);
  }
  if (r.prev.sales > 0 && cur.sales > 0) {
    const up = cur.sales >= r.prev.sales, pu = cur.ordinaryProfit >= r.prev.ordinaryProfit;
    const lab = (up ? "増収" : "減収") + (pu ? "増益" : "減益");
    const note = up
      ? (pu ? "売上も利益も伸びています。" : "売上は伸びているのに、利益は減っています。原価と販管費のどちらが動いたのかを確認したいところです。")
      : (pu ? "売上は減りましたが、利益は増えています。狙って縮めたのか、たまたまかで意味が変わります。" : "売上も利益も減っています。与信判断では最も警戒する形です。");
    out.push(`④の推移：直近期は${lab}です。${note}棒の高さより、折れ線の向きを先に見てください。`);
  }
  if (red.required <= 0) {
    out.push(`⑥の償還余力：要償還債務はゼロ（実質無借金）です。有利子負債${f.yenU(red.interestBearingDebt)}${f.U_LABEL()}に対し、`
      + `現預金${f.yenU(red.cash)}と正常運転資金${f.yenU(red.workingCapital)}の合計が上回っています。`);
  } else if (red.simpleCF <= 0) {
    out.push("⑥の償還余力：簡易キャッシュフロー（当期純利益＋減価償却費）がマイナスです。"
      + "1年間の営業の結果として手元にお金が残っていないため、債務償還年数は計算できません。返済は借換えか資産の取り崩しに頼ることになります。");
  } else {
    out.push(`⑥の償還余力：債務償還年数は${n1(red.years)}年です。`
      + (red.years <= 10 ? "10年以内で、健全とされる水準に収まっています。"
        : red.years <= 15 ? "10年を超えており、注意を要する水準です。" : "15年を超えており、過大とみられる水準です。")
      + `　DSCR（簡易CF÷1年目返済額）は${n2(red.dscr)}倍。1.0倍未満は当年の返済原資が不足します。`);
  }
  if (red.repay3 > 0) {
    out.push(`⑤の返済：今後3年の約定返済額${f.yenU(red.repay3)}${f.U_LABEL()}に対し、簡易キャッシュフローの3年累計見込は${f.yenU(red.cf3)}、`
      + `充足率は${n2(red.ratio)}倍。`
      + (red.ratio >= 1 ? "青が桃色を上回っており、返済原資は自力で賄える見込みです。" : "桃色が青を上回っています。借換えか手元資金の取り崩しが前提になります。"));
  }
  out.push("グラフは入力された数字をそのまま描いています。粉飾、保証債務、簿外債務、経営者の資質は図には映りません。");
  return `<ul class="remarks">${out.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
}

/* ==================================================== 組み立て（公開） */
export function renderViz(r, f) {
  const card = (title, hint, body, extra = "") => `
    <div class="viz__card">
      <h3 class="viz__h">${title}</h3>
      <p class="viz__hint">${hint}</p>
      ${body}${extra}
    </div>`;
  return `
  <div class="calc">
    <h2>見える化</h2>
    <p class="calc__hint">上と同じ判定結果を、図にしたものです。数字の表のままでは伝わらない相手に、形と色で見せるために使ってください。</p>
    <div class="viz">
      ${card("スコアの内訳",
        "100点をどこで積み、どこで落としたか。バーの長さが配点、濃い部分が取れた点数です。",
        scoreBars(r))}
      ${card("財務指標のかたち",
        "点線の六角形が基準です。実線がその外にあれば基準より良い、内側なら基準より悪い。へこんでいる方向が弱点です。",
        radar(r), radarTable(r, f))}
      ${card("貸借対照表のかたち",
        "左が持ち物、右がそのお金の出どころ。右下の緑が厚いほど、返さなくていいお金で持ち物を買っていることになります。",
        bsBlock(r, f))}
      ${card("売上と利益の推移",
        "棒が売上高、折れ線が経常利益です。棒が伸びて線が下がっていれば増収減益、両方下がっていれば減収減益です。",
        trend(r, f))}
      ${card("返せるお金と、返す額",
        "青が1年で手元に残るお金の目安（簡易キャッシュフロー）、桃色がその年の約定返済額。青が桃色より高ければ、返済は回っています。",
        repay(r, f))}
      ${card("借金を返し切るまでの年数",
        "いまの稼ぐペースのまま、要償還債務を返し切るのに何年かかるか。10年を超えると、銀行はまず気にします。",
        gauge(r))}
      <div class="viz__card viz__card--wide">
        <h3 class="viz__h">グラフから読み取れること</h3>
        <p class="viz__hint">入力された数字から自動で書き出した観察です。判断そのものではありません。</p>
        ${readings(r, f)}
      </div>
    </div>
  </div>`;
}
