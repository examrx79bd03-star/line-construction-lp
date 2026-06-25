/* =====================================================================
   LINE構築サポート LP — 挙動
   ・ターゲットタブ切替（store / creator）: body[data-tab] を切替えるだけ。
     ④課題・⑤できること・⑦事例の出し分けは CSS が担当（JSが落ちても
     初期表示の store コンテンツは DOM に残るフェイルセーフ設計）。
   ・FAQ アコーディオン: 同時に1件のみ開く。
   ===================================================================== */
(function () {
  'use strict';

  /* ---- ターゲットタブ切替 ---- */
  var tabButtons = document.querySelectorAll('.tab-btn[data-tab-target]');
  function selectTab(target) {
    document.body.setAttribute('data-tab', target);
    tabButtons.forEach(function (btn) {
      btn.setAttribute('aria-selected', String(btn.dataset.tabTarget === target));
    });
  }
  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectTab(btn.dataset.tabTarget);
    });
  });

  /* ---- FAQ アコーディオン（同時に1件のみ開く） ---- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var sign = item.querySelector('.faq-q__sign');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var willOpen = !item.classList.contains('open');
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        var s = other.querySelector('.faq-q__sign');
        var q = other.querySelector('.faq-q');
        if (s) s.textContent = '＋';
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        item.classList.add('open');
        if (sign) sign.textContent = '−';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
