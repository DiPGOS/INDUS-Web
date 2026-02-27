/**
 * IndusTechSol – main.js
 * Unified glassmorphism site – data, DOM, interactions
 */
(function () {
  'use strict';

  /* =============================================
     CONTENT DATA
     ============================================= */
  const DATA = {
    meta: {
      title: 'Indus Technology Solution – The Project Operating System for Engineering & Construction',
      description: 'DiPGOS unifies CPDS, ACCS, and AOS into a single intelligent platform. From proposal to operations, experience seamless, AI‑powered project delivery.',
    },
    header: {
      logo: {
        square: 'public/images/Logo/logo.webp',
        rectangle: 'public/images/Logo/logo_rectangle.webp',
      },
      nav: [
        { label: 'Platform', href: '#intro' },
        { label: 'Products', href: '#products' },
        { label: 'Company', href: '#cta' },
      ],
    },
    hero: {
      imageDark: 'public/images/main.png',
      imageLight: 'public/images/main_light.png',
      headline: ['Shaping the Future of', 'Engineering & Construction'],
      subEyebrow: 'Introducing DiPGOS',
      subMain: 'The World\'s First<br>Project Operating System',
    },
    intro: {
      headline: 'Until now, construction ran on fragmented tools. Now it runs on an <em>Operating System.</em>',
      para: 'DiPGOS is a domain-built Operating System for engineering and construction delivery. It provides a unified, integrated view of project operations by treating construction activities as production systems — not isolated tasks.',
      imageDark: 'public/images/dipgos_dashboard/dipgos_dashboard_dark.webp',
      imageLight: 'public/images/dipgos_dashboard/dipgos_dashboard_light.webp',
    },
    products: {
      intro: 'Seamlessly move from proposal to construction to maintenance with three purpose-built studios sharing a single intelligent core.',
      items: [
        {
          abbr: 'CPDS',
          name: 'Cognitive Project Design Studio',
          phase: 'Design',
          icon: 'design_services',
        },
        {
          abbr: 'ACCS',
          name: 'Autonomous Cognitive Construction Studio',
          phase: 'Construction',
          icon: 'construction',
          imgLight: 'public/images/accs/accs_light.webp',
          imgDark: 'public/images/accs/accs_dark.webp',
        },
        {
          abbr: 'AOS',
          name: 'Autonomous Operation & Maintenance',
          phase: 'Operations & Maintenance',
          icon: 'precision_manufacturing',
        },
      ],
    },
    ai: [
      { icon: 'psychology', title: 'Physics‑Informed AI' },
      { icon: 'history_edu', title: 'Knowledge Retrieval from Past Work' },
      { icon: 'chat', title: 'Conversational AI Assistant' },
      { icon: 'auto_fix_high', title: 'Applied AI' },
    ],
    footer: {
      tagline: 'Shaping the future of Engineering and Construction.',
      year: '2025',
      product: [
        { label: 'DiPGOS', href: '#platform' },
        { label: 'CPDS', href: '#products' },
        { label: 'ACCS', href: '#products' },
        { label: 'AOS', href: '#products' },
      ],
      legal: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Contact', href: 'mailto:kamran@industechsol.com' },
      ],
    },
  };

  /* =============================================
     HELPERS
     ============================================= */
  const $ = id => document.getElementById(id);
  const icon = n => `<span class="material-symbols-outlined">${n}</span>`;
  const setText = (id, val) => { const el = $(id); if (el) el.textContent = val; };
  const setHTML = (id, val) => { const el = $(id); if (el) el.innerHTML = val; };

  /* =============================================
     THEME
     Always dark on load — no localStorage, no OS preference.
     Theme toggle still works within the session.
     ============================================= */
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;

    const btn = $('theme-toggle');
    const isDark = theme === 'dark';

    if (btn) {
      const iconEl = btn.querySelector('.material-symbols-outlined');
      btn.setAttribute('aria-pressed', String(isDark));
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      if (iconEl) iconEl.textContent = isDark ? 'light_mode' : 'dark_mode';
    }

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.content = isDark ? '#060a14' : '#f5f7fb';

    updateThemeImages(theme);
  }

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
  }

  /* =============================================
     THEME-AWARE IMAGE HELPER
     One consolidated helper used everywhere.
     ============================================= */
  function updateThemeImages(theme) {
    const isLight = theme === 'light';

    // Hero background
    const heroBg = document.querySelector('#hero .hero-bg-img');
    if (heroBg) {
      const src = isLight
        ? (DATA.hero.imageLight || DATA.hero.imageDark)
        : (DATA.hero.imageDark || DATA.hero.imageLight);
      heroBg.style.backgroundImage = `url('${src}')`;
    }

    // All images tagged with data-img-light / data-img-dark
    document.querySelectorAll('img[data-img-light], img[data-img-dark]').forEach(img => {
      const src = isLight
        ? (img.dataset.imgLight || img.dataset.imgDark)
        : (img.dataset.imgDark || img.dataset.imgLight);
      if (src) img.src = src;
    });
  }

  /* =============================================
     BUILD — header
     ============================================= */
  function buildHeader() {
    const logoImg = $('logo-img');
    if (logoImg) {
      logoImg.src = DATA.header.logo.rectangle;
      logoImg.onload = () => logoImg.classList.add('loaded');
    }

    const links = DATA.header.nav
      .map(n => `<a href="${n.href}" class="nav-link">${n.label}</a>`)
      .join('');

    setHTML('nav-links', links);
    setHTML('mobile-nav', links);
  }

  /* =============================================
     BUILD — hero
     ============================================= */
  function buildHero() {
    updateThemeImages(document.documentElement.dataset.theme);

    // Main headline
    const hl = $('hero-headline');
    if (hl) {
      hl.innerHTML =
        DATA.hero.headline[0] +
        '<br><span class="accent">' + DATA.hero.headline[1] + '</span>';
    }

    // Sub-headline: two-tier markup for phase-2 impact
    const sub = $('hero-sub');
    if (sub) {
      sub.innerHTML =
        `<span class="hero-sub-eyebrow">${DATA.hero.subEyebrow}</span>` +
        `<span class="hero-sub-main">${DATA.hero.subMain}</span>`;
      sub.removeAttribute('aria-hidden');
    }
  }

  /* =============================================
     BUILD — intro
     ============================================= */
  function buildIntro() {
    setHTML('intro-headline', DATA.intro.headline);
    setText('intro-para', DATA.intro.para);

    const img = document.querySelector('.intro-screenshot');
    if (img) {
      img.dataset.imgLight = DATA.intro.imageLight || '';
      img.dataset.imgDark = DATA.intro.imageDark || '';
      updateThemeImages(document.documentElement.dataset.theme);
    }
  }

  /* =============================================
     BUILD — products  (pipeline layout)
     Cards = nodes. SVG edges between them carry
     animated dashed flow lines with arrowheads,
     conveying seamless CPDS → ACCS → AOS handoff.
     ============================================= */
  function buildProducts() {
    setText('products-intro', DATA.products.intro);

    const isLight = document.documentElement.dataset.theme === 'light';
    const items = DATA.products.items;

    // Build SVG edge connector between two consecutive nodes
    function buildEdge(idx) {
      const markerId = `arr${idx}`;
      // Labels for each transition
      return `
      <div class="pipeline-edge-wrap" data-edge="${idx}" aria-hidden="true">
        <svg class="pipeline-edge-svg" viewBox="0 0 72 32" preserveAspectRatio="none">
          <defs>
            <marker id="${markerId}" markerWidth="8" markerHeight="8"
                    refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
              <polygon class="edge-arrow" points="0,1 8,4 0,7" fill="rgba(59,130,246,0.4)"/>
            </marker>
          </defs>
         
          <!-- animated flow -->
          <line class="edge-flow" x1="4" y1="16" x2="60" y2="16"
                marker-end="url(#${markerId})"/>
        </svg>
      </div>`;
    }

    // Build a card node
    function buildNode(p, i) {
      const imgLight = p.imgLight || p.img || '';
      const imgDark = p.imgDark || p.img || '';
      const imgSrc = isLight ? (imgLight || imgDark) : (imgDark || imgLight);
      const hasImage = Boolean(imgSrc);

      return `
      <div class="product-node" data-phase="${i}" data-reveal data-delay="${i * 80}">
        <div class="product-thumb">
          <div class="product-placeholder">
            ${icon(p.icon)}
            <span style="font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;margin-top:2px;">${p.abbr}</span>
            ${hasImage ? '' : '<span class="product-coming-soon">Coming soon</span>'}
          </div>
          ${hasImage ? `
          <img src="${imgSrc}" alt="${p.name}" loading="lazy"
               data-img-light="${imgLight}"
               data-img-dark="${imgDark}"
               onload="this.classList.add('img-loaded')"
               onerror="this.remove()">` : ''}
          <span class="product-phase-pill">${p.phase}</span>
        </div>
        <div class="product-body">
          <h3 class="product-name">${p.name}</h3>
        </div>
      </div>`;
    }

    // Interleave nodes and edges
    let html = '<div class="products-pipeline">';
    items.forEach((p, i) => {
      html += buildNode(p, i);
      if (i < items.length - 1) html += buildEdge(i);
    });
    html += '</div>';

    setHTML('products-grid', html);
  }

  /* =============================================
     BUILD — AI section
     ============================================= */
  function buildAI() {
    setHTML('ai-grid', DATA.ai.map((f, i) => `
      <div class="ai-card" data-reveal data-delay="${i * 100}">
        <div class="ai-icon">${icon(f.icon)}</div>
        <h3 class="ai-title">${f.title}</h3>
      </div>`).join(''));
  }

  /* =============================================
     BUILD — footer
     ============================================= */
  function buildFooter() {
    const brand = document.querySelector('.footer-brand');
    if (brand && !brand.querySelector('.footer-logo')) {
      const logo = document.createElement('img');
      logo.src = DATA.header.logo.rectangle;
      logo.alt = 'Indus Technology Solution';
      logo.className = 'footer-logo';
      brand.insertBefore(logo, brand.firstChild);
    }

    setText('footer-tagline', DATA.footer.tagline);
    setText('footer-copy', `© ${DATA.footer.year} Indus Technology Solutions. All rights reserved.`);
    setHTML('footer-product-links', DATA.footer.product.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join(''));
    setHTML('footer-legal-links', DATA.footer.legal.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join(''));
  }

  /* =============================================
     HERO — sticky phase-2 scroll reveal
     ─────────────────────────────────────────────
     Phase 1 (default):   Main headline, large centred.
     Phase 2 (on scroll): Headline disappears;
                          sub-headline rises to centre
                          (styled as bold heading).
     Persists on reverse scroll — sub stays, no headline.
     =============================================
     The hero is position:sticky inside #hero-wrapper
     (200vh tall). Scrolling through the wrapper keeps
     the hero pinned; once the wrapper is past the top
     the hero scrolls off naturally.
     ============================================= */
  function setupHeroPhase2() {
    const wrapper = document.getElementById('hero-wrapper');
    const heroEl = document.getElementById('hero');
    if (!wrapper || !heroEl) return;

    // Ensure headline is visible immediately (no reveal system involved)
    heroEl.style.setProperty('--hero-shift', '0');

    const update = () => {
      const viewportH = window.innerHeight || 1;
      // getBoundingClientRect + scrollY gives the correct document-relative top
      // even after images / fonts load and push layout down.
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      // The scrollable range inside the wrapper is (wrapperHeight - viewportH).
      // We want --hero-shift to go 0→1 smoothly across that range.
      const scrollable = Math.max(wrapper.offsetHeight - viewportH, 1);
      const scrolled = Math.max(0, window.scrollY - wrapperTop);
      const t = Math.min(1, scrolled / scrollable);

      heroEl.style.setProperty('--hero-shift', t.toFixed(4));

      // Class used only for cosmetic extras (progress bar, scroll-cue hide)
      heroEl.classList.toggle('hero--shifted', t > 0.05);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update(); // run once on load
  }

  /* =============================================
     HEADER — scroll behaviour
     ============================================= */
  function setupHeader() {
    const header = $('site-header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* =============================================
     MOBILE MENU
     ============================================= */
  function setupMobile() {
    const btn = $('hamburger');
    const menu = $('mobile-menu');
    if (!btn || !menu) return;

    const close = () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    };

    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });

    menu.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', close));
    window.matchMedia('(min-width: 769px)').addEventListener('change', e => { if (e.matches) close(); });
  }

  /* =============================================
     SCROLL REVEAL
     ============================================= */
  function setupReveal() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('revealed'));
      return;
    }

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

    targets.forEach(t => obs.observe(t));
  }

  /* =============================================
     ACTIVE NAV HIGHLIGHTING
     Uses IntersectionObserver to highlight the nav
     link matching the current visible section.
     ============================================= */
  function setupActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const linkMap = {};
    document.querySelectorAll('.nav-link[href^="#"]').forEach(a => {
      linkMap[a.getAttribute('href').slice(1)] = a;
    });

    const setActive = (id) => {
      Object.values(linkMap).forEach(a => a.classList.remove('nav-active'));
      if (linkMap[id]) linkMap[id].classList.add('nav-active');
    };

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    sections.forEach(s => obs.observe(s));
  }

  /* =============================================
     SMOOTH SCROLL
     ============================================= */
  function setupSmoothScroll() {
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    });
  }

  /* =============================================
     INIT
     ============================================= */
  function init() {
    applyTheme('dark'); // always dark on load

    document.title = DATA.meta.title;
    const metaEl = document.querySelector('meta[name="description"]');
    if (metaEl) metaEl.content = DATA.meta.description;

    buildHeader();
    buildHero();
    buildIntro();
    buildProducts();
    buildAI();
    buildFooter();

    $('theme-toggle')?.addEventListener('click', toggleTheme);

    setupHeroPhase2();
    setupHeader();
    setupMobile();
    setupReveal();
    setupSmoothScroll();
    setupActiveNav();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();
