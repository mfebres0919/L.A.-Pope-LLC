/* Mobile navigation toggle — tiny, dependency-free, deferred. */
(function () {
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  if (!nav || !toggle) return;

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(!nav.classList.contains('is-open'));
  });

  // Close the menu after tapping a link (single-page anchor navigation).
  nav.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () { setOpen(false); });
  });

  // Close on Escape for keyboard users.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
})();


/* Header: flush & full-width at the very top, floating rounded card once scrolled. */
(function () {
  var header = document.querySelector('.header');
  if (!header) return;

  var THRESHOLD = 20; // px scrolled before it "lifts" into the floating state

  function update() {
    header.classList.toggle('is-floating', window.scrollY > THRESHOLD);
  }

  update(); // set correct state on load (e.g. if the page opens already scrolled)
  window.addEventListener('scroll', update, { passive: true });
})();

