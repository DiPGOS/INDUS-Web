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

  /* ---------------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------------- */
  function setupNav() {
    var nav = document.querySelector('.nav');
    var toggle = document.getElementById('nav-toggle');
    var panel = document.getElementById('nav-links');
    if (!nav || !toggle || !panel) return;

    function setOpen(open) {
      nav.classList.toggle('nav--open', open);
      document.body.classList.toggle('nav-locked', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('nav--open'));
    });

    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !nav.classList.contains('nav--open')) return;
      setOpen(false);
      toggle.focus();
    });

    // Leaving the mobile range with the panel open would strand the lock.
    window.matchMedia('(min-width: 860px)').addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
    });
  }

  /* ---------------------------------------------------------------
     Active nav link
     --------------------------------------------------------------- */
  function setupActiveLink() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (!section) return;
      byId[id] = link;
      sections.push(section);
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove('nav__link--active'); });
        var link = byId[entry.target.id];
        if (link) link.classList.add('nav__link--active');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------------------------------------------------------------
     Contact address — assembled at runtime so it is never in the
     served HTML and never scraped from source.
     --------------------------------------------------------------- */
  function setupContact() {
    var nodes = document.querySelectorAll('[data-u][data-d]');
    Array.prototype.forEach.call(nodes, function (el) {
      var user = el.getAttribute('data-u');
      var domain = el.getAttribute('data-d');
      if (!user || !domain) return;
      el.setAttribute('href', 'mailto:' + user + '@' + domain);
    });
  }

  /* ---------------------------------------------------------------
     Copyright year
     --------------------------------------------------------------- */
  function setupYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  setupReveal();
  setupNav();
  setupActiveLink();
  setupContact();
  setupYear();
})();
