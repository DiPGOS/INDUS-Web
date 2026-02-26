/**
 * IndusTechSol – main.js
 * Scroll animations, header behavior, counters, interactions
 */

(function () {
    'use strict';
  
    /* =============================================
       CONTENT DATA
       ============================================= */
    const DATA = {
      meta: {
        title: 'IndusTechSol – The Project Operating System for Engineering & Construction',
        description: 'DiPGOS unifies CPDS, ACCS, and AOS into a single intelligent platform. From proposal to operations, experience seamless, AI‑powered project delivery.',
      },
      header: {
        logoText: '',
        logo: {
          light: 'public/images/Logo/logo_light.webp',
          dark: 'public/images/Logo/logo_dark.webp',
        },
        nav: [
          { label: 'Platform', href: '#platform' },
          { label: 'Products', href: '#products' },
          { label: 'Solutions', href: '#solutions' },
          { label: 'Company', href: '#why' },
        ],
        ctaText: 'Request Demo',
      },
      hero: {
        image: 'public/images/main.png',
        headline: ['Shaping the Future of', 'Engineering & Construction'],
        sub: 'Introducing DiPGOS — the world\'s first Project Operating System built natively for engineering and construction delivery.',
        stats: [
          { number: '3', suffix: 'x', label: 'Faster Proposal Cycle' },
          { number: '100', suffix: '%', label: 'Phase Continuity' },
          { number: '1', suffix: '', label: 'Unified Platform' },
        ],
      },
      intro: {
        line1: 'Until now, construction ran on fragmented tools.',
        line2: 'Now it runs on an Operating System.',
        para: 'DiPGOS is a domain-built Operating System for engineering and construction delivery. It provides a unified, integrated view of project operations by treating construction activities as production systems — not isolated tasks.',
      },
      ontology: {
        description: 'Every project is decomposed into a universal, scalable hierarchy ensuring total consistency across all delivery phases:',
        hierarchy: [
          { label: 'Project', icon: 'account_tree' },
          { label: 'Contract', icon: 'description' },
          { label: 'Scope', icon: 'view_list' },
          { label: 'Activity', icon: 'task_alt' },
          { label: 'Subactivity', icon: 'checklist' },
          { label: 'Operation', icon: 'settings' },
          { label: 'Atom', icon: 'person' },
        ],
      },
      products: {
        intro: 'Seamlessly move from proposal to construction to maintenance with three purpose-built studios sharing a single intelligent core.',
        items: [
          {
            name: 'CPDS',
            fullName: 'Cognitive Project Design Studio',
            description: 'Turn RFPs into structured proposals. AI extracts scopes, BOQ, schedules and builds a traceable process with an n8n‑like visual flow canvas.',
            phase: 'Phase 1 – Proposal & Design',
            icon: 'design_services',
            image: 'public/images/dipgos_dashboard/dipgos_dashboard_light.webp',
          },
          {
            name: 'ACCS',
            fullName: 'Autonomous Cognitive Construction Studio',
            description: 'Monitor execution in real‑time. AI compares as‑built against the plan, predicts delays, and automates compliance checks.',
            phase: 'Phase 2 – Construction & Monitoring',
            icon: 'construction',
            image: 'public/images/accs/accs_light.webp',
          },
          {
            name: 'AOS',
            fullName: 'Autonomous Operation & Maintenance',
            description: 'Extend asset life with AI‑driven maintenance schedules, real‑time sensor integration, and automated work orders.',
            phase: 'Phase 3 – Operations & Maintenance',
            icon: 'precision_manufacturing',
            image: 'public/images/aos/aos_light.webp',
          },
        ],
      },
      ai: {
        features: [
          {
            icon: 'psychology',
            title: 'Physics‑Informed AI',
            description: 'Models trained on construction domain knowledge — loads, materials, sequences. Not generic data; real engineering intelligence.',
          },
          {
            icon: 'history_edu',
            title: 'Knowledge Retrieval from Past Work',
            description: 'Leverage historical project data to generate better proposals, estimate risks accurately, and reuse proven workflows.',
          },
          {
            icon: 'chat',
            title: 'Conversational AI Assistant',
            description: 'Chat with your project data. Ask "What are the unresolved requirements?" or "Show me all operations needing a crane."',
          },
          {
            icon: 'auto_fix_high',
            title: 'Applied AI in Proposal Making',
            description: 'Auto‑populate BOQ, suggest scopes from performance history, and flag compliance gaps before submission — automatically.',
          },
        ],
      },
      painPoints: [
        {
          icon: 'groups',
          title: 'Fragmented Collaboration',
          solution: 'One source of truth for all stakeholders — estimators, engineers, compliance officers, and site teams — always in sync.',
        },
        {
          icon: 'update',
          title: 'Slow, Error‑Prone Updates',
          solution: 'Change a scope and watch it propagate instantly to BOQ, schedule, and compliance matrices with zero manual rework.',
        },
        {
          icon: 'approval',
          title: 'Delayed BOQ Approvals',
          solution: 'AI pre‑validates quantities and costs; approval workflows trigger automatically, cutting review cycles in half.',
        },
        {
          icon: 'sync_alt',
          title: 'Disconnected Phases',
          solution: 'Data flows seamlessly from CPDS → ACCS → AOS — no manual handoffs, no information loss across the project lifecycle.',
        },
      ],
      why: {
        reasons: [
          { strong: 'Operationalize, not just digitize', text: ' — we apply a production‑system mindset to every construction workflow.' },
          { strong: 'Deepest ontology in the industry', text: ' — from billion‑dollar contracts down to a single worker atom.' },
          { strong: 'Physical AI', text: ' — intelligence that respects the laws of engineering and construction.' },
          { strong: 'Trusted by EPC firms', text: ' — proven on large‑scale infrastructure delivery worldwide.' },
        ],
      },
      footer: {
        tagline: 'Building the digital backbone for the physical world.',
        year: '2025',
        links: {
          product: [
            { label: 'DiPGOS', href: '#' },
            { label: 'CPDS', href: '#products' },
            { label: 'ACCS', href: '#products' },
            { label: 'AOS', href: '#products' },
            { label: 'Request Demo', href: '#cta' },
          ],
          legal: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Contact', href: 'mailto:sales@industechsol.com' },
          ],
        },
      },
    };
  
    /* =============================================
       DOM BUILD HELPERS
       ============================================= */
    function el(tag, attrs = {}, children = []) {
      const element = document.createElement(tag);
      for (const [k, v] of Object.entries(attrs)) {
        if (k === 'className') element.className = v;
        else if (k === 'innerHTML') element.innerHTML = v;
        else if (k === 'textContent') element.textContent = v;
        else element.setAttribute(k, v);
      }
      for (const child of children) {
        if (typeof child === 'string') element.insertAdjacentHTML('beforeend', child);
        else if (child) element.appendChild(child);
      }
      return element;
    }
  
    function icon(name, cls = '') {
      return `<span class="material-symbols-outlined ${cls}">${name}</span>`;
    }
  
    /* =============================================
       BUILD PAGE
       ============================================= */
    function buildPage() {
      // Meta
      document.title = DATA.meta.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', DATA.meta.description);
  
      buildHeader();
      buildHero();
      buildStatsStrip();
      buildIntro();
      buildOntology();
      buildProducts();
      buildAI();
      buildPainPoints();
      buildWhy();
      buildCTA();
      buildFooter();
  
      initScrollAnimations();
      initHeader();
      initCounters();
      initMobileMenu();
    }
  
    /* ---- HEADER ---- */
    function buildHeader() {
      const header = document.getElementById('site-header');
      if (!header) return;
  
      // Try to load logo image
      const logoImg = header.querySelector('#logo-img');
      if (logoImg) {
        logoImg.src = DATA.header.logo.light;
        logoImg.alt = DATA.header.logoText;
        logoImg.dataset.light = DATA.header.logo.light;
        logoImg.dataset.dark = DATA.header.logo.dark;
        logoImg.onload = () => logoImg.classList.add('loaded');
        logoImg.onerror = () => logoImg.style.display = 'none';
      }
  
      // Nav links
      const navEl = header.querySelector('#nav-links');
      if (navEl) {
        navEl.innerHTML = DATA.header.nav.map(n =>
          `<a href="${n.href}" class="nav-link">${n.label}</a>`
        ).join('');
      }
  
      // Mobile menu
      const mobileNav = header.querySelector('#mobile-nav');
      if (mobileNav) {
        mobileNav.innerHTML = DATA.header.nav.map(n =>
          `<a href="${n.href}" class="nav-link">${n.label}</a>`
        ).join('');
      }
    }
  
    /* ---- HERO ---- */
    function buildHero() {
      const heroSection = document.getElementById('hero');
      if (!heroSection) return;
  
      // Background image
      const bgEl = heroSection.querySelector('.hero-bg-img');
      if (bgEl && DATA.hero.image) {
        bgEl.style.backgroundImage = `url('${DATA.hero.image}')`;
      }
  
      // Headline: two lines (first line + <br> + second line with accent)
      const hlEl = heroSection.querySelector('#hero-headline');
      if (hlEl) {
        const line1 = DATA.hero.headline[0];
        const line2 = DATA.hero.headline[1] ? `<span class="line-accent">${DATA.hero.headline[1]}</span>` : '';
        hlEl.innerHTML = line2 ? `${line1}<br>${line2}` : line1;
      }
    }

    /* ---- STATS STRIP (after intro) ---- */
    function buildStatsStrip() {
      const statsEl = document.getElementById('hero-stats');
      if (!statsEl) return;
      statsEl.innerHTML = DATA.hero.stats.map(s => `
        <div class="stat-item">
          <div class="stat-number" data-target="${s.number}" data-suffix="${s.suffix}">0${s.suffix}</div>
          <div class="stat-label">${s.label}</div>
        </div>
      `).join('');
    }

    /* ---- INTRO ---- */
    function buildIntro() {
      const el1 = document.getElementById('intro-line1');
      const el2 = document.getElementById('intro-line2');
      const el3 = document.getElementById('intro-para');
      if (el1) el1.textContent = DATA.intro.line1;
      if (el2) el2.textContent = DATA.intro.line2;
      if (el3) el3.textContent = DATA.intro.para;
    }
  
    /* ---- ONTOLOGY ---- */
    function buildOntology() {
      const descEl = document.getElementById('ontology-desc');
      if (descEl) descEl.textContent = DATA.ontology.description;
  
      const flowEl = document.getElementById('ontology-flow');
      if (!flowEl) return;
  
      flowEl.innerHTML = DATA.ontology.hierarchy.map((item, i) => `
        <div class="hierarchy-node" data-reveal data-delay="${i * 80}">
          <div class="hierarchy-item">
            <div class="h-icon">${icon(item.icon)}</div>
            <span class="h-label">${item.label}</span>
          </div>
          ${i < DATA.ontology.hierarchy.length - 1 ? `<span class="hierarchy-arrow">${icon('chevron_right')}</span>` : ''}
        </div>
      `).join('');
    }
  
    /* ---- PRODUCTS ---- */
    function buildProducts() {
      const introEl = document.getElementById('products-intro');
      if (introEl) introEl.textContent = DATA.products.intro;
  
      const gridEl = document.getElementById('products-grid');
      if (!gridEl) return;
  
      gridEl.innerHTML = DATA.products.items.map((p, i) => `
        <div class="product-card" data-reveal data-delay="${i * 150}">
          <div class="product-card-visual">
            <div class="product-card-visual-placeholder">
              ${icon(p.icon)}
              <span style="font-family:var(--font-display);font-size:0.8rem;letter-spacing:0.06em;text-transform:uppercase;">${p.name}</span>
            </div>
            <img src="${p.image}" alt="${p.fullName}" loading="lazy" onload="this.classList.add('img-loaded')" onerror="this.remove()">
            <span class="product-phase-badge">${p.phase}</span>
          </div>
          <div class="product-card-body">
            <span class="product-name-tag">${p.name}</span>
            <h3 class="product-full-name">${p.fullName}</h3>
            <p class="product-desc">${p.description}</p>
            <span class="product-link">Learn more ${icon('arrow_forward')}</span>
          </div>
        </div>
      `).join('');
    }
  
    /* ---- AI SECTION ---- */
    function buildAI() {
      const gridEl = document.getElementById('ai-grid');
      if (!gridEl) return;
  
      gridEl.innerHTML = DATA.ai.features.map((f, i) => `
        <div class="ai-card" data-reveal data-delay="${i * 120}">
          <div class="ai-card-icon">${icon(f.icon)}</div>
          <h3 class="ai-card-title">${f.title}</h3>
          <p class="ai-card-desc">${f.description}</p>
        </div>
      `).join('');
    }
  
    /* ---- PAIN POINTS ---- */
    function buildPainPoints() {
      const gridEl = document.getElementById('pain-grid');
      if (!gridEl) return;
  
      gridEl.innerHTML = DATA.painPoints.map((p, i) => `
        <div class="pain-card" data-reveal data-delay="${i * 120}">
          <div class="pain-icon">${icon(p.icon)}</div>
          <div class="pain-body">
            <h3 class="pain-title">${p.title}</h3>
            <p class="pain-solution">${p.solution}</p>
          </div>
        </div>
      `).join('');
    }
  
    /* ---- WHY ---- */
    function buildWhy() {
      const listEl = document.getElementById('why-reasons');
      if (!listEl) return;
  
      listEl.innerHTML = DATA.why.reasons.map((r, i) => `
        <div class="why-reason" data-reveal data-delay="${i * 100}">
          <div class="why-check">${icon('check', 'icon-fill')}</div>
          <p class="why-reason-text"><strong>${r.strong}</strong>${r.text}</p>
        </div>
      `).join('');
    }
  
    /* ---- CTA ---- */
    function buildCTA() {
      // Static in HTML — nothing to build
    }
  
    /* ---- FOOTER ---- */
    function buildFooter() {
      const taglineEl = document.getElementById('footer-tagline');
      if (taglineEl) taglineEl.textContent = DATA.footer.tagline;
  
      const copyEl = document.getElementById('footer-copy');
      if (copyEl) copyEl.textContent = `© ${DATA.footer.year} Indus Technology Solutions. All rights reserved.`;
  
      const productLinksEl = document.getElementById('footer-product-links');
      if (productLinksEl) {
        productLinksEl.innerHTML = DATA.footer.links.product
          .map(l => `<li><a href="${l.href}">${l.label}</a></li>`)
          .join('');
      }
  
      const legalLinksEl = document.getElementById('footer-legal-links');
      if (legalLinksEl) {
        legalLinksEl.innerHTML = DATA.footer.links.legal
          .map(l => `<li><a href="${l.href}">${l.label}</a></li>`)
          .join('');
      }
    }
  
    /* =============================================
       HEADER SCROLL BEHAVIOR
       ============================================= */
    function initHeader() {
      const header = document.getElementById('site-header');
      if (!header) return;
  
      const logoImg = header.querySelector('#logo-img');
  
      function onScroll() {
        const scrolled = window.scrollY > 50;
        header.classList.toggle('scrolled', scrolled);
      }
  
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  
    /* =============================================
       MOBILE MENU
       ============================================= */
    function initMobileMenu() {
      const hamburger = document.getElementById('hamburger');
      const mobileMenu = document.getElementById('mobile-menu');
      if (!hamburger || !mobileMenu) return;

      function closeMenu() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }

      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
      });

      // Close on nav link click
      mobileMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
      });

      // Close when viewport is wide enough that hamburger is hidden (e.g. resize from mobile to desktop)
      const mediaQuery = window.matchMedia('(min-width: 769px)');
      function onResizeOrMatch(e) {
        if (e.matches && mobileMenu.classList.contains('open')) closeMenu();
      }
      mediaQuery.addEventListener('change', onResizeOrMatch);
      onResizeOrMatch(mediaQuery);
    }
  
    /* =============================================
       INTERSECTION OBSERVER – REVEAL ANIMATIONS
       ============================================= */
    function initScrollAnimations() {
      const targets = document.querySelectorAll('[data-reveal]');
      if (!targets.length) return;
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
  
      targets.forEach(t => observer.observe(t));
    }
  
    /* =============================================
       ANIMATED COUNTERS
       ============================================= */
    function initCounters() {
      const counters = document.querySelectorAll('.stat-number[data-target]');
      if (!counters.length) return;
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
  
      counters.forEach(c => observer.observe(c));
    }
  
    function animateCounter(el) {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
  
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
  
      requestAnimationFrame(update);
    }
  
    /* =============================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================= */
    document.addEventListener('click', function (e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const headerHeight = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  
    /* =============================================
       INIT
       ============================================= */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', buildPage);
    } else {
      buildPage();
    }
  
  })();