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


/* Scrollspy: highlight the nav link for whichever section is in view. */
(function () {
  if (!('IntersectionObserver' in window)) return;

  var links = document.querySelectorAll('.nav__link[href^="#"]');
  var map = {};
  var sections = [];
  links.forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    var section = document.getElementById(id);
    if (section) { map[id] = link; sections.push(section); }
  });
  if (!sections.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (l) { l.classList.remove('is-active'); });
      if (map[entry.target.id]) map[entry.target.id].classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 }); // active when a section crosses the viewport's middle band

  sections.forEach(function (s) { io.observe(s); });
})();

