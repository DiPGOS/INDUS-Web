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
        rectangle:  'public/images/Logo/logo_rectangle.webp',
      },
      nav: [
        { label: 'Platform',  href: '#intro' },
        { label: 'Products',  href: '#products' },
        { label: 'Company',   href: '#cta' },
      ],
    },
    hero: {
      imageDark:  'public/images/main.png',
      imageLight: 'public/images/main_light.png',
      headline: ['Shaping the Future of', 'Engineering & Construction'],
      subHeadline: "Introducing DiPGOS\nThe world's first Project Operating System",
    },
    intro: {
      headline: 'Until now, construction ran on fragmented tools. Now it runs on an <em>Operating System.</em>',
      para: 'DiPGOS is a domain-built Operating System for engineering and construction delivery. It provides a unified, integrated view of project operations by treating construction activities as production systems — not isolated tasks.',
      imageDark:  'public/images/dipgos_dashboard/dipgos_dashboard_dark.webp',
      imageLight: 'public/images/dipgos_dashboard/dipgos_dashboard_light.webp',
    },
    products: {
      intro: 'Seamlessly move from proposal to construction to maintenance with three purpose-built studios sharing a single intelligent core.',
      items: [
        {
          abbr: 'CPDS',
          name: 'Cognitive Project Design Studio',
          phase: 'Phase 1 – Design & Proposal',
          icon: 'design_services',
        },
        {
          abbr: 'ACCS',
          name: 'Autonomous Cognitive Construction Studio',
          phase: 'Phase 2 – Construction & Monitoring',
          icon: 'construction',
          imgLight: 'public/images/accs/accs_light.webp',
          imgDark:  'public/images/accs/accs_dark.webp',
        },
        {
          abbr: 'AOS',
          name: 'Autonomous Operation & Maintenance',
          phase: 'Phase 3 – Operations & Maintenance',
          icon: 'precision_manufacturing',
        },
      ],
    },
    ai: [
      {
        icon: 'psychology',
        title: 'Physics‑Informed AI',
      },
      {
        icon: 'history_edu',
        title: 'Knowledge Retrieval from Past Work',
      },
      {
        icon: 'chat',
        title: 'Conversational AI Assistant',
      },
      {
        icon: 'auto_fix_high',
        title: 'Applied AI',
      },
    ],
    footer: {
      tagline: 'Shaping teh future of Engineering and Construction.',
      year: '2025',
      product: [
        { label: 'DiPGOS', href: '#platform' },
        { label: 'CPDS',   href: '#products' },
        { label: 'ACCS',   href: '#products' },
        { label: 'AOS',    href: '#products' },
      ],
      legal: [
        { label: 'Privacy Policy',   href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Contact',          href: 'mailto:sales@industechsol.com' },
      ],
    },
  };

  /* =============================================
     HELPERS
     ============================================= */
  const $ = id => document.getElementById(id);
  const icon = name => `<span class="material-symbols-outlined">${name}</span>`;
  const setText = (id, val) => { const el = $(id); if (el) el.textContent = val; };
  const setHTML = (id, val) => { const el = $(id); if (el) el.innerHTML = val; };

  /* =============================================
     THEME
     ============================================= */
  const THEME_KEY = 'theme';

  function getPreferredTheme() {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (e) {
      // ignore storage errors and fall through to system preference
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    root.dataset.theme = theme;

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // ignore storage errors
    }

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      const isDark = theme === 'dark';
      const iconEl = btn.querySelector('.material-symbols-outlined');
      btn.setAttribute('aria-pressed', String(isDark));
      btn.setAttribute(
        'aria-label',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      );
      if (iconEl) {
        iconEl.textContent = isDark ? 'light_mode' : 'dark_mode';
      }
    }

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.content = theme === 'dark' ? '#060a14' : '#f5f7fb';
    }

    setHeroBackgroundForTheme(theme);
    setIntroImageForTheme(theme);
    setProductImagesForTheme(theme);
  }

  function setHeroBackgroundForTheme(theme) {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const bg = hero.querySelector('.hero-bg-img');
    if (!bg) return;

    const isLight = theme === 'light';
    const src = isLight
      ? (DATA.hero.imageLight || DATA.hero.imageDark)
      : (DATA.hero.imageDark || DATA.hero.imageLight);

    bg.style.backgroundImage = `url('${src}')`;
  }

  function setIntroImageForTheme(theme) {
    const img = document.querySelector('.intro-screenshot');
    if (!img) return;

    const isLight = theme === 'light';
    const light = img.dataset.imgLight || DATA.intro.imageLight;
    const dark  = img.dataset.imgDark  || DATA.intro.imageDark;
    const src   = isLight ? (light || dark) : (dark || light);
    if (src) img.src = src;
  }

  function setProductImagesForTheme(theme) {
    const imgs = document.querySelectorAll('.product-thumb img[data-img-light], .product-thumb img[data-img-dark]');
    imgs.forEach(img => {
      const light = img.dataset.imgLight;
      const dark  = img.dataset.imgDark;
      if (!light && !dark) return;
      const isLight = theme === 'light';
      const src = isLight ? (light || dark) : (dark || light);
      if (src) img.src = src;
    });
  }

  function toggleTheme() {
    const current = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
  }

  /* =============================================
     BUILD
     ============================================= */
  function init() {
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    document.title = DATA.meta.title;
    const metaEl = document.querySelector('meta[name="description"]');
    if (metaEl) metaEl.content = DATA.meta.description;

    buildHeader();
    buildHero();
    buildIntro();
    buildProducts();
    buildAI();
    buildFooter();

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }

    setupHeroSubheadline();
    setupHeader();
    setupMobile();
    setupReveal();
    setupSmoothScroll();
  }

  /* ---- Header ---- */
  function buildHeader() {
    const logoImg = $('logo-img');
    if (logoImg) {
      logoImg.src = DATA.header.logo.rectangle;
      logoImg.onload  = () => logoImg.classList.add('loaded');
      logoImg.onerror = () => logoImg.style.display = 'none';
    }

    const navEl = $('nav-links');
    const mobEl = $('mobile-nav');
    const links = DATA.header.nav.map(n => `<a href="${n.href}" class="nav-link">${n.label}</a>`).join('');
    if (navEl) navEl.innerHTML = links;
    if (mobEl) mobEl.innerHTML = links;
  }

  /* ---- Hero ---- */
  function buildHero() {
    const theme = document.documentElement.dataset.theme || getPreferredTheme();
    setHeroBackgroundForTheme(theme);

    const hl = $('hero-headline');
    if (hl) {
      hl.innerHTML =
        DATA.hero.headline[0] + '<br><span class="accent">' + DATA.hero.headline[1] + '</span>';
    }

    const sub = DATA.hero.subHeadline;
    if (sub) setText('hero-sub', sub);
  }

  /* ---- Intro ---- */
  function buildIntro() {
    setHTML('intro-headline', DATA.intro.headline);
    setText('intro-para', DATA.intro.para);

    const img = document.querySelector('.intro-screenshot');
    if (img) {
      img.dataset.imgLight = DATA.intro.imageLight || '';
      img.dataset.imgDark  = DATA.intro.imageDark  || '';
      const theme = document.documentElement.dataset.theme || getPreferredTheme();
      setIntroImageForTheme(theme);
    }
  }

  /* ---- Products ---- */
  function buildProducts() {
    setText('products-intro', DATA.products.intro);

    const theme = document.documentElement.dataset.theme || getPreferredTheme();

    setHTML('products-grid', DATA.products.items.map((p, i) => {
      const imgLight = p.imgLight || p.img || '';
      const imgDark  = p.imgDark  || p.img || '';
      const isLight  = theme === 'light';
      const imgSrc   = isLight ? (imgLight || imgDark) : (imgDark || imgLight);
      const hasImage = Boolean(imgSrc);

      return `
      <div class="product-card" data-reveal data-delay="${i * 120}">
        <div class="product-thumb">
          <div class="product-placeholder">
            ${icon(p.icon)}
            <span style="font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;">${p.abbr}</span>
            ${hasImage ? '' : '<span class="product-coming-soon">Coming soon</span>'}
          </div>
          ${hasImage ? `
          <img src="${imgSrc}" alt="${p.name}" loading="lazy"
               data-img-light="${imgLight || ''}"
               data-img-dark="${imgDark || ''}"
               onload="this.classList.add('img-loaded')"
               onerror="this.remove()">` : ''}
          <span class="product-phase-pill">${p.phase}</span>
        </div>
        <div class="product-body">
          <h3 class="product-name">${p.name}</h3>
        </div>
      </div>`;
    }).join(''));
  }

  /* ---- AI ---- */
  function buildAI() {
    setHTML('ai-grid', DATA.ai.map((f, i) => `
      <div class="ai-card" data-reveal data-delay="${i * 100}">
        <div class="ai-icon">${icon(f.icon)}</div>
        <h3 class="ai-title">${f.title}</h3>
      </div>`).join(''));
  }

  /* ---- Footer ---- */
  function buildFooter() {
    const footerBrand = document.querySelector('.footer-brand');
    if (footerBrand && !footerBrand.querySelector('.footer-logo')) {
      const logo = document.createElement('img');
      logo.src = DATA.header.logo.rectangle;
      logo.alt = 'Indus Technology Solution';
      logo.className = 'footer-logo';
      footerBrand.insertBefore(logo, footerBrand.firstChild);
    }

    setText('footer-tagline', DATA.footer.tagline);
    setText('footer-copy', `© ${DATA.footer.year} Indus Technology Solutions. All rights reserved.`);
    setHTML('footer-product-links', DATA.footer.product.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join(''));
    setHTML('footer-legal-links',   DATA.footer.legal.map(l  => `<li><a href="${l.href}">${l.label}</a></li>`).join(''));
  }

  /* =============================================
     HERO SUBHEADLINE — grab attention on first interaction
     ============================================= */
  function setupHeroSubheadline() {
    const heroSub = document.getElementById('hero-sub');
    if (!heroSub || !heroSub.textContent.trim()) return;

    let locked = true;

    const reveal = () => {
      if (!locked) return;
      locked = false;
      window.scrollTo({ top: 0 });
      heroSub.classList.add('visible', 'emphasize');
      setTimeout(() => {
        heroSub.classList.remove('emphasize');
        teardown();
      }, 900);
    };

    const onWheel = (e) => {
      if (!locked) return;
      if (e.deltaY > 0 && window.scrollY < 40) {
        e.preventDefault();
        reveal();
      }
    };

    const onKeydown = (e) => {
      if (!locked) return;
      const key = e.key;
      if (key === 'ArrowDown' || key === 'PageDown' || key === ' ' || key === 'Spacebar') {
        e.preventDefault();
        reveal();
      }
    };

    const onTouchMove = (e) => {
      if (!locked) return;
      if (window.scrollY < 40) {
        e.preventDefault();
        reveal();
      }
    };

    function teardown() {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeydown);
      window.removeEventListener('touchmove', onTouchMove);
    }

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeydown);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
  }

  /* =============================================
     HEADER SCROLL BEHAVIOR
     ============================================= */
  function setupHeader() {
    const header = document.getElementById('site-header');
    const logoImg = $('logo-img');
    if (!header) return;

    const onScroll = () => {
      const scrolled = window.scrollY > 60;
      header.classList.toggle('scrolled', scrolled);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* =============================================
     MOBILE MENU
     ============================================= */
  function setupMobile() {
    const btn  = $('hamburger');
    const menu = $('mobile-menu');
    if (!btn || !menu) return;

    const close = () => { btn.classList.remove('open'); menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
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
    if (!targets.length || !('IntersectionObserver' in window)) {
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
     ANIMATED COUNTERS
     ============================================= */
  // (Animated counters removed – no stats elements in current HTML)

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
      const offset = 80;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  }

  /* =============================================
     INIT
     ============================================= */
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();