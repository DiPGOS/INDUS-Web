/**
 * Indus — DiPGOS site
 * No dependencies. Every module is a no-op if its markup is absent.
 */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     Scroll reveal
     Ported from the design prototype's setupReveal(), same numbers:
     threshold .1, rootMargin -6% bottom, 92% first-paint cutoff,
     3.6s failsafe.
     --------------------------------------------------------------- */
  function setupReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!els.length) return;

    function show(el, instant) {
      el.classList.add(instant ? 'is-instant' : 'is-visible');
    }

    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { show(el, true); });
      return;
    }

    var vh = window.innerHeight || 800;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        show(entry.target, false);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    els.forEach(function (el) {
      // Anything already near the fold appears without animating in.
      if (el.getBoundingClientRect().top < vh * 0.92) show(el, true);
      else io.observe(el);
    });

    // Failsafe: never leave content hidden, whatever the observer does.
    setTimeout(function () { els.forEach(function (el) { show(el, false); }); }, 3600);
  }

  setupReveal();
})();
