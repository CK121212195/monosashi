/* 英語のものさし：解説ページ用の小さなスクリプト（音声ボタンのみ） */
(function () {
  var cur = null, curBtn = null;
  function stop() { if (cur) { cur.pause(); cur = null; } if (curBtn) curBtn.classList.remove('playing'); curBtn = null; }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-src]');
    if (!b) return;
    var again = curBtn === b;
    stop();
    if (again) return; // 再生中にもう一度押すと止まる
    var a = new Audio(b.getAttribute('data-src'));
    cur = a; curBtn = b; b.classList.add('playing');
    a.addEventListener('ended', function () { if (cur === a) stop(); });
    a.play().catch(stop);
  });
})();
