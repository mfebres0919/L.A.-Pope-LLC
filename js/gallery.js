/* Gallery — filter tabs + click-to-play video facades.
   Tiny, dependency-free, deferred. Videos download only when clicked. */
(function () {
  var grid = document.querySelector('.gallery__grid');
  if (!grid) return;

  var filters = document.querySelectorAll('.gallery__filter');
  var items = grid.querySelectorAll('.gallery__item');

  /* ---- Filter tabs (All / Photos / Videos) ---- */
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var type = btn.dataset.filter;

      filters.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });

      items.forEach(function (item) {
        var show = type === 'all' || item.dataset.type === type;
        item.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---- Click-to-play video facades ---- */
  grid.querySelectorAll('.gallery__play').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = btn.dataset.video;
      if (!src) return;

      var poster = btn.querySelector('img');
      var video = document.createElement('video');
      video.className = 'gallery__video';
      video.src = src;
      if (poster) video.poster = poster.currentSrc || poster.src;
      video.controls = true;
      video.autoplay = true;
      video.setAttribute('playsinline', ''); // iOS: play inline, not fullscreen
      video.playsInline = true;

      btn.replaceWith(video);
      video.play().catch(function () { /* user can hit play manually */ });
    });
  });
})();
