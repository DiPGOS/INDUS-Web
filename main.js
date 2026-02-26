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
      image: 'public/images/main.png',
      headline: ['Shaping the Future of', 'Engineering & Construction'],
    },
    intro: {
      headline: 'Until now, construction ran on fragmented tools. Now it runs on an <em>Operating System.</em>',
      para: 'DiPGOS is a domain-built Operating System for engineering and construction delivery. It provides a unified, integrated view of project operations by treating construction activities as production systems — not isolated tasks.',
    },
    products: {
      intro: 'Seamlessly move from proposal to construction to maintenance with three purpose-built studios sharing a single intelligent core.',
      items: [
        {
          abbr: 'CPDS',
          name: 'Cognitive Project Design Studio',
          phase: 'Phase 1 – Design & Proposal',
          icon: 'design_services',
          img:  'public/images/dipgos_dashboard/dipgos_dashboard_light.webp',
        },
        {
          abbr: 'ACCS',
          name: 'Autonomous Cognitive Construction Studio',
          phase: 'Phase 2 – Construction & Monitoring',
          icon: 'construction',
          img:  'public/images/accs/accs_light.webp',
        },
        {
          abbr: 'AOS',
          name: 'Autonomous Operation & Maintenance',
          phase: 'Phase 3 – Operations & Maintenance',
          icon: 'precision_manufacturing',
          img:  'public/images/aos/aos_light.webp',
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
     BUILD
     ============================================= */
  function init() {
    document.title = DATA.meta.title;
    const metaEl = document.querySelector('meta[name="description"]');
    if (metaEl) metaEl.content = DATA.meta.description;

    buildHeader();
    buildHero();
    buildIntro();
    buildProducts();
    buildAI();
    buildFooter();

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
    const hero = document.getElementById('hero');
    const bg = hero && hero.querySelector('.hero-bg-img');
    if (bg) bg.style.backgroundImage = `url('${DATA.hero.image}')`;

    const hl = $('hero-headline');
    if (hl) {
      hl.innerHTML =
        DATA.hero.headline[0] + '<br><span class="accent">' + DATA.hero.headline[1] + '</span>';
    }
    // setText('hero-sub', DATA.hero.sub);

    // setHTML('hero-stats', DATA.hero.stats.map(s => `
    //   <div class="stat-cell">
    //     <div class="stat-num" data-target="${s.number}" data-suffix="${s.suffix}">0${s.suffix}</div>
    //     <div class="stat-lbl">${s.label}</div>
    //   </div>`).join(''));
  }

  /* ---- Intro ---- */
  function buildIntro() {
    setHTML('intro-headline', DATA.intro.headline);
    setText('intro-para', DATA.intro.para);
  }

  /* ---- Stats strip (duplicate, same data) ---- */
  // function buildStats() {
  //   setHTML('stats-grid', DATA.hero.stats.map(s => `
  //     <div class="stat-cell">
  //       <div class="stat-num" data-target="${s.number}" data-suffix="${s.suffix}">0${s.suffix}</div>
  //       <div class="stat-lbl">${s.label}</div>
  //     </div>`).join(''));
  // }

  /* ---- Products ---- */
  function buildProducts() {
    setText('products-intro', DATA.products.intro);
    setHTML('products-grid', DATA.products.items.map((p, i) => `
      <div class="product-card" data-reveal data-delay="${i * 120}">
        <div class="product-thumb">
          <div class="product-placeholder">
            ${icon(p.icon)}
            <span style="font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;">${p.abbr}</span>
          </div>
          <img src="${p.img}" alt="${p.name}" loading="lazy"
               onload="this.classList.add('img-loaded')"
               onerror="this.remove()">
          <span class="product-phase-pill">${p.phase}</span>
        </div>
        <div class="product-body">
          <h3 class="product-name">${p.name}</h3>
        </div>
      </div>`).join(''));
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