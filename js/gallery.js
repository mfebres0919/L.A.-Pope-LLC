/* Gallery — filter tabs + photo lightbox. Tiny, dependency-free, deferred.
   (Video tiles are plain links that open the video's page in a new tab — no JS needed.) */
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

  /* ---- Photo lightbox (enlarged view) ---- */
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  var lightboxImg = lightbox.querySelector('.lightbox__img');
  var closeBtn = lightbox.querySelector('.lightbox__close');
  var lastFocused = null;

  function openLightbox(img) {
    lastFocused = document.activeElement;
    lightboxImg.src = img.currentSrc || img.src; // the source the browser actually loaded (WebP if supported)
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // stop background scroll
    closeBtn.focus();
  }
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.removeAttribute('src');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  grid.querySelectorAll('.gallery__item[data-type="photo"] .gallery__open').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = btn.querySelector('img');
      if (img) openLightbox(img);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox(); // click the backdrop
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
})();
