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
     3.6s failsafe — which fires only if the observer never ran.
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
    // observe() queues an initial observation for every target whether it
    // intersects or not, so this flips within a frame in any browser whose
    // observer works at all — and stays false in one whose does not.
    var observerLive = false;
    var io = new IntersectionObserver(function (entries) {
      observerLive = true;
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

    // Failsafe for a broken observer, not for a slow visitor. Its job is
    // "never leave content hidden whatever the observer does", so it fires
    // only when the observer has never called back at all — stubbed,
    // policy-blocked or otherwise inert. Firing it on a bare timer instead
    // would flatten the page out from under anyone still reading the hero
    // at 3.6s: every reveal jumps to .is-instant (transition: none) and the
    // cascades, sweeps, line draws and frame entrance below never play.
    // Instant, not animated — if this fires, nothing on the page is being
    // tracked, so animating is a pop from content nobody can see.
    setTimeout(function () {
      if (observerLive) return;
      els.forEach(function (el) {
        if (el.classList.contains('is-visible') || el.classList.contains('is-instant')) return;
        show(el, true);
      });
    }, 3600);
  }

  /* ---------------------------------------------------------------
     Ambient motion
     The four infinite loops (floatY, drift, corepulse, loopglow) idle at
     animation-play-state:paused and only run while their container is on
     screen. Unlike the reveal observer this one removes the class again
     on exit — that is the entire point.
     --------------------------------------------------------------- */
  function setupAmbient() {
    var els = Array.prototype.slice.call(
      document.querySelectorAll('.hero, .loop, .lockup'));
    if (!els.length) return;

    // Paused forever is a worse failure than always running, so anything
    // that stops the observer working leaves every container live.
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-live'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle('is-live', entry.isIntersecting);
      });
    }, { threshold: 0 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------
     Command-centre parallax
     The one motion number that lives in JS. It is handed to CSS as a
     custom property, so composition and easing still live in styles.css.
     The scroll handler is attached only while the frame is on screen and
     removed the moment it leaves.
     --------------------------------------------------------------- */
  function setupParallax() {
    var frame = document.querySelector('.frame');
    var img = frame && frame.querySelector('img');
    if (!img || reduce || !('IntersectionObserver' in window)) return;

    var RANGE = 10;          // px of travel either side of centre, at most
    var ticking = false;
    var attached = false;

    function paint() {
      ticking = false;
      var rect = frame.getBoundingClientRect();
      var vh = window.innerHeight || 800;
      // -1 with the frame below the viewport, 0 dead centre, +1 above it.
      var progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      progress = Math.max(-1, Math.min(1, progress));
      // The overflow that hides this travel comes from .frame img's
      // scale(1.04) — 2% of the rendered height at each edge, which
      // shrinks with the viewport while RANGE does not. Below roughly
      // 1100px the flat range outruns it and exposes page background
      // inside the frame, so take whichever is smaller.
      var range = Math.min(RANGE, rect.height * 0.02);
      img.style.setProperty('--parallax', (progress * range).toFixed(2) + 'px');
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(paint);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting === attached) return;
        attached = entry.isIntersecting;
        if (attached) {
          window.addEventListener('scroll', onScroll, { passive: true });
          paint();
        } else {
          window.removeEventListener('scroll', onScroll);
        }
      });
    }, { threshold: 0 });

    io.observe(frame);
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
    // Safari < 14 has no addEventListener on MediaQueryList — only the
    // older addListener — and calling the missing method throws, which
    // (unguarded) used to abort this whole function before it returned,
    // taking every module queued after it down too. Feature-detect both.
    var mql = window.matchMedia('(min-width: 860px)');
    var onRangeChange = function (e) { if (e.matches) setOpen(false); };
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onRangeChange);
    } else if (typeof mql.addListener === 'function') {
      mql.addListener(onRangeChange);
    }
  }

  /* ---------------------------------------------------------------
     Nav scroll state
     A 1px sentinel at the top of the hero, not a scroll listener.
     Without IntersectionObserver the nav simply keeps its default
     appearance — cosmetic, not broken.
     --------------------------------------------------------------- */
  function setupNavState() {
    var nav = document.querySelector('.nav');
    var sentinel = document.querySelector('.nav-sentinel');
    if (!nav || !sentinel || !('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        nav.classList.toggle('nav--scrolled', !entry.isIntersecting);
      });
    }, { threshold: 0 });

    io.observe(sentinel);
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

  // Each module is independent (see the file banner) and every module here
  // touches a different, separately-critical piece of the page (reveal
  // animation, mobile nav, active link, the mailto assembly, the year).
  // An uncaught throw in one must never take the rest down with it — e.g.
  // one brittle browser API call previously aborted setupNav() before
  // setupContact() ran, silently disabling the site's only conversion path.
  // Run every module through the same guard so that failure mode can't
  // recur, regardless of which module or browser API causes it.
  function run(setup) {
    try {
      setup();
    } catch (e) {
      if (window.console && console.error) console.error(e);
    }
  }

  run(setupReveal);
  run(setupAmbient);
  run(setupParallax);
  run(setupNav);
  run(setupNavState);
  run(setupActiveLink);
  run(setupContact);
  run(setupYear);
})();
