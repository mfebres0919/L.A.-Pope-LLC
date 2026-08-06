/* Scroll reveal — fade + rise elements in as each section enters the viewport.
   Staggered in DOM order. Deferred, dependency-free.
   Triggering per-section (not per-element) means grid/carousel items that sit
   off-screen horizontally still reveal once you reach the section. */
(function () {
  var SEL = '.topper,.hero__wordmark,.hero__title,.hero__text,.hero__actions,' +
            '.gallery__title,.gallery__text,.gallery__item,' +
            '.services__title,.services__text,.service-card,' +
            '.agencies__title,.agencies__text,.marquee,' +
            '.about__media,.about__title,.about__text,' +
            '.contact__title,.info-card,.contact__form,' +
            '.footer__brand,.footer__col';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var containers = document.querySelectorAll('main section, .footer');

  function revealAll(scope) {
    scope.querySelectorAll(SEL).forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i, 12) * 70) + 'ms'; // stagger, capped so grids don't drag
      el.classList.add('is-visible');
    });
  }

  // No animation path: reveal everything immediately.
  if (reduce || !('IntersectionObserver' in window)) {
    containers.forEach(revealAll);
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      revealAll(entry.target);
      io.unobserve(entry.target); // reveal once, then stop watching
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  containers.forEach(function (c) { io.observe(c); });
})();
