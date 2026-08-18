import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { startServer } from './helpers/server.mjs';

let server, browser;
before(async () => { server = await startServer(); browser = await chromium.launch(); });
after(async () => { await browser.close(); await server.close(); });

async function page(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const p = await ctx.newPage();
  await p.goto(server.url, { waitUntil: 'load' });
  return p;
}

const css = (p, sel, prop) => p.$eval(sel, (el, prop) => getComputedStyle(el)[prop], prop);

test('tokens resolve to the exact design values', async () => {
  const p = await page();
  const tok = (name) => p.evaluate(
    (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim(), name);
  assert.equal(await tok('--ink'), '#0A1424');
  assert.equal(await tok('--navy'), '#0B182C');
  assert.equal(await tok('--slate'), '#12233F');
  assert.equal(await tok('--amber'), '#E8A020');
  assert.equal(await tok('--bone'), '#FBF9F4');
  assert.equal(await tok('--steel'), '#9DB0C4');
  await p.context().close();
});

test('the hero paints the ink background and bone headline', async () => {
  const p = await page();
  assert.equal(await css(p, '.hero', 'backgroundColor'), 'rgb(10, 20, 36)');
  assert.equal(await css(p, '.hero__title', 'color'), 'rgb(251, 249, 244)');
  assert.equal(await css(p, '.hero__title .accent', 'color'), 'rgb(232, 160, 32)');
  await p.context().close();
});

test('the nav is sticky, blurred, and shows inline links on desktop', async () => {
  const p = await page();
  assert.equal(await css(p, '.nav', 'position'), 'sticky');
  assert.match(await css(p, '.nav', 'backdropFilter'), /blur\(14px\)/);
  assert.equal(await css(p, '.nav__toggle', 'display'), 'none');
  assert.notEqual(await css(p, '.nav__links', 'display'), 'none');
  await p.context().close();
});

test('the hero reserves space for its bottom strip', async () => {
  const p = await page();
  const stripH = await p.$eval('.hero__strip', (el) => el.getBoundingClientRect().height);
  const padB = parseFloat(await css(p, '.hero__inner', 'paddingBottom'));
  assert.ok(padB >= stripH, `hero inner padding-bottom ${padB} must clear the ${stripH}px strip`);
  await p.context().close();
});

// I4: --nav-h (72px, the scroll-margin-top every <section> uses) is a fixed
// design token decoupled from the nav's real rendered height (measured
// 69-70px — see the comment on --nav-h in styles.css). The gap between them
// is the true clearance an anchor-jumped section lands with under the
// sticky nav, and it is thin: ~1.6-3.5px. A section's own top edge is what
// scroll-margin-top actually controls, so that is the tight assertion that
// would catch a nav grown taller than --nav-h. Each section's heading sits
// far below that (100s of px, thanks to section padding + the eyebrow row),
// so it is checked too — it is what a person actually looks at — but on its
// own it would not detect the nav-height regression this test exists to
// guard against.
const NAV_ANCHOR_IDS = ['conviction', 'dipgos', 'ai', 'company', 'contact'];

async function navClearance(p, id) {
  return p.evaluate((id) => {
    const nav = document.querySelector('.nav');
    const section = document.getElementById(id);
    // Instant, not the default (animated) scrollIntoView(): html has
    // scroll-behavior:smooth, which would race this measurement against an
    // in-flight scroll animation (the same trap that bit two earlier tests
    // in this file — see the below-the-fold-reveals and active-link tests).
    section.scrollIntoView({ behavior: 'instant', block: 'start' });
    const heading = section.querySelector('h1, h2, .contact__title');
    return {
      navBottom: nav.getBoundingClientRect().bottom,
      sectionTop: section.getBoundingClientRect().top,
      headingTop: heading.getBoundingClientRect().top,
    };
  }, id);
}

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 900 }]) {
  test(`anchor-scrolled sections clear the sticky nav at ${viewport.width}px`, async () => {
    const p = await page({ viewport });
    for (const id of NAV_ANCHOR_IDS) {
      const { navBottom, sectionTop, headingTop } = await navClearance(p, id);
      assert.ok(headingTop >= navBottom - 0.5,
        `#${id} heading top ${headingTop.toFixed(1)}px is above the nav's bottom edge ${navBottom.toFixed(1)}px`);
      assert.ok(sectionTop >= navBottom - 0.5,
        `#${id} section top ${sectionTop.toFixed(1)}px is above the nav's bottom edge ${navBottom.toFixed(1)}px — ` +
        `the sticky nav's real height now exceeds --nav-h`);
    }
    await p.context().close();
  });
}

// m9: ARIA 1.2 forbids naming a roleless element (a plain <span>), so an
// aria-label on one is dropped and AT falls back to reading the element's
// literal text content — here the dotless-ı glyph the wordmark is built
// from, not a real word. Fixed by hiding the decorative glyph
// (aria-hidden) and pairing it with a .sr-only span carrying the real
// word. Verified via the accessible-name/tree the browser actually
// exposes (Playwright's ariaSnapshot), not by re-reading the markup.
test('the DiPGOS and Indus wordmarks expose real words to assistive tech, not the dotless glyph', async () => {
  const p = await page();

  const lockupSnap = await p.locator('.lockup').ariaSnapshot();
  assert.match(lockupSnap, /DiPGOS/, 'lockup must expose the word "DiPGOS"');
  assert.doesNotMatch(lockupSnap, /[ıİ]/, 'the decorative dotless-glyph must not reach the accessibility tree');

  const footerBrandSnap = await p.locator('.footer__brand').ariaSnapshot();
  assert.match(footerBrandSnap, /Indus/, 'footer brand must expose the word "Indus"');
  assert.doesNotMatch(footerBrandSnap, /[ıİ]/, 'the decorative dotless-glyph must not reach the accessibility tree');

  // The nav brand link already worked correctly (aria-label on an anchor,
  // which does support naming, unlike a bare span) — pin its accessible
  // name too so a future edit can't silently regress it the same way.
  await p.getByRole('link', { name: 'Indus — home', exact: true }).waitFor({ state: 'attached' });

  await p.context().close();
});

test('keyboard focus paints a visible ring', async () => {
  const p = await page();
  // Tab, not .focus() — programmatic focus does not reliably match
  // :focus-visible in Chromium, only keyboard interaction does.
  await p.keyboard.press('Tab');
  const ring = await p.evaluate(() => {
    const s = getComputedStyle(document.activeElement);
    return {
      w: parseFloat(s.outlineWidth),
      style: s.outlineStyle,
      color: s.outlineColor,
      tag: document.activeElement.tagName,
    };
  });
  assert.notEqual(ring.tag, 'BODY', 'Tab should move focus off body');
  assert.notEqual(ring.style, 'none');
  // Chromium's default UA focus outline also has non-zero width and a
  // non-'none' style, so those two checks alone pass even without the
  // site's own :focus-visible rule. Pin the exact amber colour and width
  // from styles.css so the test actually fails when that rule is missing.
  assert.equal(ring.w, 2, `expected the amber focus ring at 2px, got outline-width ${ring.w}`);
  assert.equal(ring.color, 'rgb(232, 160, 32)', `expected amber outline colour, got ${ring.color}`);
  await p.context().close();
});

test('loop cards sit five across on desktop, with Act in amber', async () => {
  const p = await page();
  assert.equal(
    (await css(p, '.loop', 'gridTemplateColumns')).split(' ').length, 5,
    'expected 5 loop columns at 1440px');
  assert.equal(await css(p, '.loop-card--act', 'backgroundColor'), 'rgb(232, 160, 32)');
  assert.equal(await css(p, '.loop-card--act .loop-card__title', 'color'), 'rgb(10, 20, 36)');
  assert.equal(await css(p, '.loop-card--act .loop-card__body', 'color'), 'rgb(58, 44, 12)');
  await p.context().close();
});

test('loop glow bars are staggered by 0/.5/1/1.5s', async () => {
  const p = await page();
  const delays = await p.$$eval('.loop-card__bar',
    (els) => els.map((e) => getComputedStyle(e).animationDelay));
  assert.deepEqual(delays, ['0s', '0.5s', '1s', '1.5s']);
  await p.context().close();
});

test('function cards sit three across on desktop', async () => {
  const p = await page();
  assert.equal((await css(p, '.fn-grid', 'gridTemplateColumns')).split(' ').length, 3);
  await p.context().close();
});

test('the conviction split uses the 6 / 5 twelve-column layout', async () => {
  const p = await page();
  assert.equal((await css(p, '.split', 'gridTemplateColumns')).split(' ').length, 12);
  assert.equal(await css(p, '.split__col--a', 'gridColumnStart'), '1');
  assert.equal(await css(p, '.split__col--b', 'gridColumnStart'), '8');
  await p.context().close();
});

test('the foundation panel carries the amber top border', async () => {
  const p = await page();
  assert.equal(await css(p, '.foundation', 'borderTopWidth'), '3px');
  assert.equal(await css(p, '.foundation', 'borderTopColor'), 'rgb(232, 160, 32)');
  assert.equal(await css(p, '.foundation', 'backgroundColor'), 'rgb(18, 35, 63)');
  await p.context().close();
});

test('the AI stack uses the primary amber card and tinted layers', async () => {
  const p = await page();
  assert.equal(await css(p, '.stack__card--primary', 'backgroundColor'), 'rgb(232, 160, 32)');
  assert.equal(await css(p, '.stack__card--primary .stack__title', 'color'), 'rgb(18, 35, 63)');
  assert.equal(await css(p, '.stack__card--primary .stack__sub', 'color'), 'rgb(58, 44, 12)');
  assert.equal(await css(p, '.stack__card:not(.stack__card--primary)', 'backgroundColor'), 'rgba(255, 255, 255, 0.05)');
  await p.context().close();
});

test('company and AI sections use their designed backgrounds', async () => {
  const p = await page();
  assert.equal(await css(p, '.section--ai', 'backgroundColor'), 'rgb(11, 24, 44)');
  assert.equal(await css(p, '.section--company', 'backgroundColor'), 'rgb(18, 35, 63)');
  await p.context().close();
});

test('the contact CTA is an amber pill', async () => {
  const p = await page();
  assert.equal(await css(p, '.contact__cta', 'backgroundColor'), 'rgb(232, 160, 32)');
  assert.equal(await css(p, '.contact__cta', 'color'), 'rgb(10, 20, 36)');
  assert.equal(await css(p, '.contact__cta', 'borderRadius'), '999px');
  await p.context().close();
});

test('the footer lays out three columns plus a full-width bottom bar', async () => {
  const p = await page();
  assert.equal((await css(p, '.footer', 'gridTemplateColumns')).split(' ').length, 12);
  assert.equal(await css(p, '.footer__bottom', 'gridColumnStart'), '1');
  const cols = await p.$$eval('.footer__col', (els) => els.length);
  assert.equal(cols, 2, 'expected Explore and Contact columns');
  assert.equal(await css(p, '.footer__brand', 'gridColumnStart'), '1');
  assert.equal(await css(p, '.footer__brand', 'gridColumnEnd'), 'span 5');
  // Both columns must be EXPLICITLY placed. A column that matches no rule is
  // auto-placed into a single narrow track instead of failing loudly — which is
  // exactly how the :nth-of-type bug shipped: it counted divs, and .footer__brand
  // is a div, so Contact matched nothing and collapsed to one column.
  assert.equal(await css(p, '.footer__col--explore', 'gridColumnStart'), '7');
  assert.equal(await css(p, '.footer__col--explore', 'gridColumnEnd'), 'span 3');
  assert.equal(await css(p, '.footer__col--contact', 'gridColumnStart'), '10');
  assert.equal(await css(p, '.footer__col--contact', 'gridColumnEnd'), 'span 3');
  await p.context().close();
});

test('both footer columns stay on one row and are readably wide', async () => {
  // Guards the visible symptom rather than the mechanism: a mis-placed column
  // drops to the next row and squeezes its text into a ~90px ribbon.
  for (const width of [1440, 1280]) {
    const p = await page({ viewport: { width, height: 900 } });
    const [brand, explore, contact] = await Promise.all(
      ['.footer__brand', '.footer__col--explore', '.footer__col--contact'].map((s) =>
        p.$eval(s, (el) => el.getBoundingClientRect().toJSON())));

    assert.ok(Math.abs(explore.top - brand.top) < 2,
      `Explore column left the brand's row at ${width}px`);
    assert.ok(Math.abs(contact.top - brand.top) < 2,
      `Contact column left the brand's row at ${width}px (top ${contact.top} vs ${brand.top})`);
    assert.ok(contact.width > 150,
      `Contact column is only ${contact.width}px wide at ${width}px — it is being squeezed`);
    assert.ok(contact.left > explore.left,
      'Contact must sit to the right of Explore');
    await p.context().close();
  }
});

test('footer columns stack correctly below the desktop tier', async () => {
  const at = async (width, sel, prop) => {
    const p = await page({ viewport: { width, height: 900 } });
    const v = await css(p, sel, prop);
    await p.context().close();
    return v;
  };
  // tablet: side by side in a 6-column grid
  assert.equal(await at(900, '.footer__col--explore', 'gridColumnStart'), '1');
  assert.equal(await at(900, '.footer__col--contact', 'gridColumnStart'), '4');
  // mobile: full width, one under the other
  assert.equal(await at(390, '.footer__col--explore', 'gridColumnEnd'), '-1');
  assert.equal(await at(390, '.footer__col--contact', 'gridColumnEnd'), '-1');
});

const WIDTHS = [390, 768, 1024, 1280, 1920];

test('no horizontal overflow at any target width', async () => {
  for (const width of WIDTHS) {
    const p = await page({ viewport: { width, height: 900 } });
    const overflow = await p.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.ok(overflow <= 1, `horizontal overflow of ${overflow}px at ${width}px`);
    await p.context().close();
  }
});

test('loop and function grids collapse per tier', async () => {
  const cols = async (width, sel) => {
    const p = await page({ viewport: { width, height: 900 } });
    const n = (await css(p, sel, 'gridTemplateColumns')).split(' ').length;
    await p.context().close();
    return n;
  };
  assert.equal(await cols(1280, '.loop'), 5);
  assert.equal(await cols(900,  '.loop'), 3);
  assert.equal(await cols(390,  '.loop'), 1);
  assert.equal(await cols(1280, '.fn-grid'), 3);
  assert.equal(await cols(900,  '.fn-grid'), 2);
  assert.equal(await cols(390,  '.fn-grid'), 1);
});

test('twelve-column splits stack below 1100px', async () => {
  const p = await page({ viewport: { width: 900, height: 900 } });
  for (const sel of ['.split', '.ai-grid', '.company']) {
    assert.equal((await css(p, sel, 'gridTemplateColumns')).split(' ').length, 1,
      `${sel} should be single-column at 900px`);
  }
  await p.context().close();
});

test('the hamburger replaces inline links below 860px', async () => {
  const wide = await page({ viewport: { width: 900, height: 900 } });
  assert.equal(await css(wide, '.nav__toggle', 'display'), 'none');
  await wide.context().close();

  const narrow = await page({ viewport: { width: 800, height: 900 } });
  assert.notEqual(await css(narrow, '.nav__toggle', 'display'), 'none');
  const links = await narrow.$eval('.nav__links', (el) => getComputedStyle(el).transform);
  assert.ok(links !== 'none' || await css(narrow, '.nav__links', 'visibility') === 'hidden',
    'closed mobile panel must be off-screen or hidden');
  await narrow.context().close();
});

// m5: below 860px, the toggle's open/close behaviour lives entirely in
// main.js. If the hidden-panel CSS applied unconditionally, a no-JS visitor
// would get an inert button in front of a permanently invisible link list —
// zero reachable navigation. Both the toggle's display and the panel's
// hidden state are gated on the .js class (set by an inline <head> script),
// so without JS the panel falls back to its default, always-visible layout.
test('with JS disabled below 860px, nav links render normally and stay reachable', async () => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(server.url, { waitUntil: 'load' });

  assert.equal(await css(p, '.nav__toggle', 'display'), 'none',
    'toggle has no working handler without JS and must stay hidden, not inert');
  assert.equal(await css(p, '.nav__links', 'visibility'), 'visible',
    'nav links must not be hidden — there is no JS to ever reveal them');

  const hrefs = await p.$$eval('.nav__link, .nav__cta', (els) => els.map((e) => e.getAttribute('href')));
  assert.deepEqual(hrefs, ['#conviction', '#dipgos', '#ai', '#company', '#contact']);
  for (const href of hrefs) {
    const box = await p.locator(`.nav a[href="${href}"]`).first().boundingBox();
    assert.ok(box && box.width > 0 && box.height > 0, `link ${href} is not visible/reachable without JS`);
  }
  await ctx.close();
});

// m10: m5 gated the panel's *container* (.nav__links) and the toggle on
// .js, but left the panel's own .nav__link/.nav__cta sizing (padding: 16px
// 0, font-size: 17px, ...) ungated. Below 860px without JS, those
// vertical-panel rules still won the cascade over the base row rules (same
// specificity, later in source order) and applied to links laid out as a
// normal horizontal row — inflating the sticky nav 69px -> 99px and
// widening the row far past the viewport (390px -> scrollWidth 600, 210px
// of overflow; 320px -> 280px of overflow). The m5 test above only checks
// `box.width > 0 && box.height > 0`, which an off-screen box satisfies, so
// it missed this entirely.
//
// Fix: gate .nav__link/.nav__cta's mobile-panel sizing on .js too, matching
// their container, so it only ever applies when the panel actually exists.
// The style assertions below directly guard that regression.
//
// A second, separate defect stacked on top of the first: the base
// `.nav__links` rule (used unmodified as the no-JS row layout) was missing
// `flex-wrap: wrap`, present in the design prototype
// (`dipgos-presentation-cover/project/DiPGOS Site.dc.html` line 38) but
// dropped from our copy. Without it, the ~560-580px-wide row of 4 links + a
// CTA could not wrap and overflowed the 390px/320px viewports no matter how
// the individual links were sized. Restoring `flex-wrap: wrap` on the base
// rule (styles.css) lets the row wrap onto multiple lines at these widths,
// which is achievable zero overflow, not merely a smaller residual number —
// so the test below asserts that directly instead of a link-style proxy.
//
// Trade-off, accepted and intentionally unasserted here: wrapping makes the
// no-JS row 2-3 lines tall (measured ~102.5px at 390px, ~135px at 320px, up
// from the single-row ~70px), which pushes past the fixed 72px --nav-h that
// <section>'s scroll-margin-top uses, so anchor jumps no longer fully clear
// the nav in this no-JS mobile case. That matches the prototype's own
// wrapping behaviour and is out of this fix's scope to solve.
for (const width of [390, 320]) {
  test(`with JS disabled at ${width}px, nav links wrap and stay inside the viewport`, async () => {
    const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(server.url, { waitUntil: 'load' });

    const linkStyle = await p.$eval('.nav__link', (el) => {
      const s = getComputedStyle(el);
      return { paddingTop: s.paddingTop, fontSize: s.fontSize };
    });
    assert.equal(linkStyle.paddingTop, '0px',
      'nav__link is carrying the vertical-panel\'s 16px padding without JS');
    assert.equal(linkStyle.fontSize, '14.5px',
      'nav__link is carrying the vertical-panel\'s 17px font-size without JS');

    const { scrollWidth, clientWidth } = await p.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    assert.ok(scrollWidth - clientWidth <= 1,
      `no-JS nav row overflows at ${width}px — scrollWidth ${scrollWidth} vs clientWidth ${clientWidth}`);

    // Every nav link/CTA — not just the first — must land fully inside the
    // viewport now that the row wraps instead of merely not being clipped.
    const hrefs = await p.$$eval('.nav__link, .nav__cta', (els) => els.map((e) => e.getAttribute('href')));
    for (const href of hrefs) {
      const box = await p.locator(`.nav a[href="${href}"]`).first().boundingBox();
      assert.ok(box && box.x >= 0 && box.x + box.width <= width,
        `link ${href} falls outside the ${width}px viewport (x=${box && box.x}, right=${box && box.x + box.width})`);
    }

    await ctx.close();
  });
}

// m6: the open panel's natural height (~303px) plus body.nav-locked's
// overflow:hidden strands the CTA off-screen with no way to reach it below
// roughly 342px of viewport height. Reproduced at 568x320. The panel now
// carries max-height + overflow-y:auto; prove it end-to-end by actually
// clicking the CTA — Playwright's click() auto-scrolls the target into view
// within its nearest scrollable ancestor and fails if it cannot, so this is
// a real reachability check, not just a CSS-property assertion.
test('the open mobile panel stays reachable on short viewports', async () => {
  const p = await page({ viewport: { width: 568, height: 320 } });
  await p.click('#nav-toggle');
  assert.equal(await p.$eval('.nav', (el) => el.classList.contains('nav--open')), true);

  assert.equal(await css(p, '.nav__links', 'overflowY'), 'auto');
  const panelBox = await p.$eval('.nav__links', (el) => el.getBoundingClientRect());
  assert.ok(panelBox.height <= 320 + 0.5,
    `open panel height ${panelBox.height}px exceeds the 320px viewport — the CTA can be pushed off-screen`);

  await p.click('.nav__cta');
  await p.context().close();
});

test('content is fully visible with JavaScript disabled', async () => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(server.url, { waitUntil: 'load' });
  const hidden = await p.$$eval('[data-reveal]',
    (els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
  assert.equal(hidden, 0, 'no-JS visitors must see every reveal element');
  await ctx.close();
});

test('above-the-fold content completes its entrance and never waits on JS', async () => {
  // The hero used to paint at opacity 1 with no entrance at all, and this
  // test pinned that exact mechanism. It now cascades — title, lead,
  // actions, strip, 120ms apart — on a CSS animation that starts at first
  // paint. The invariant worth protecting is unchanged: above-the-fold
  // content is never left hidden and never depends on deferred JS. Only
  // the mechanism it asserts has moved.
  const p = await page();
  await p.waitForFunction(
    () => getComputedStyle(document.querySelector('.hero__title')).opacity === '1',
    null, { timeout: 1200 });
  await p.context().close();

  for (const opts of [{ reducedMotion: 'reduce' }, { javaScriptEnabled: false }]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
    const pg = await ctx.newPage();
    await pg.goto(server.url, { waitUntil: 'load' });
    assert.equal(await css(pg, '.hero__title', 'opacity'), '1',
      `hero title not painted immediately with ${JSON.stringify(opts)}`);
    await ctx.close();
  }
});

test('below-the-fold reveals start hidden and reveal on scroll', async () => {
  const p = await page();
  const sel = '.section--company .section__title--company';
  assert.equal(await css(p, sel, 'opacity'), '0', 'should start hidden');
  // `html { scroll-behavior: smooth }` makes the default behavior:'auto'
  // inherit an animated scroll (CSSOM), so force an instant jump here —
  // otherwise the IntersectionObserver fire time rides on an animation
  // duration that races the 3600ms reveal failsafe and this timeout.
  await p.$eval(sel, (el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await p.waitForFunction(
    (s) => getComputedStyle(document.querySelector(s)).opacity === '1', sel, { timeout: 4000 });
  await p.context().close();
});

test('reduced-motion visitors get everything visible with no transition', async () => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(server.url, { waitUntil: 'load' });
  const hidden = await p.$$eval('[data-reveal]',
    (els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
  assert.equal(hidden, 0);
  await ctx.close();
});

test('the contact links resolve to a real mailto after JS runs', async () => {
  const p = await page();
  const hrefs = await p.$$eval('[data-u][data-d]', (els) => els.map((e) => e.getAttribute('href')));
  assert.equal(hrefs.length, 2);
  for (const h of hrefs) assert.equal(h, 'mailto:kamran@industechsol.com');
  await p.context().close();
});

// m7: Safari < 14 has no addEventListener on MediaQueryList (only the older
// addListener). setupNav() used to call it unguarded as its last statement,
// so on that browser the whole IIFE aborted before setupContact() ran and
// the mailto: was never assembled. Simulate that browser by handing
// setupNav()'s matchMedia query a fake MediaQueryList with addListener but
// no addEventListener — real Chromium's own MediaQueryList (used by every
// other matchMedia() call in main.js, e.g. reduced-motion) is untouched.
test('main.js survives a MediaQueryList without addEventListener (old Safari)', async () => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.addInitScript(() => {
    var real = window.matchMedia.bind(window);
    window.matchMedia = function (query) {
      var mql = real(query);
      if (query !== '(min-width: 860px)') return mql;
      return {
        matches: mql.matches,
        media: mql.media,
        addListener: function (fn) { mql.addListener(fn); },
        removeListener: function (fn) { mql.removeListener(fn); },
        // deliberately no addEventListener/removeEventListener
      };
    };
  });
  await p.goto(server.url, { waitUntil: 'load' });
  const hrefs = await p.$$eval('[data-u][data-d]', (els) => els.map((e) => e.getAttribute('href')));
  assert.equal(hrefs.length, 2);
  for (const h of hrefs) assert.equal(h, 'mailto:kamran@industechsol.com',
    'setupContact() must still run even when setupNav() hits a missing browser API');
  await ctx.close();
});

test('with JS disabled the contact links stay harmless, never dead', async () => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(server.url, { waitUntil: 'load' });
  const hrefs = await p.$$eval('[data-u][data-d]', (els) => els.map((e) => e.getAttribute('href')));
  for (const h of hrefs) assert.equal(h, '#contact');
  await ctx.close();
});

test('the mobile menu opens, closes on link, and closes on Escape', async () => {
  const p = await page({ viewport: { width: 500, height: 800 } });
  const open = () => p.$eval('.nav', (el) => el.classList.contains('nav--open'));
  const expanded = () => p.$eval('#nav-toggle', (el) => el.getAttribute('aria-expanded'));

  assert.equal(await open(), false);
  assert.equal(await expanded(), 'false');

  await p.click('#nav-toggle');
  assert.equal(await open(), true);
  assert.equal(await expanded(), 'true');
  assert.equal(await css(p, 'body', 'overflow'), 'hidden');

  await p.click('.nav__link[href="#dipgos"]');
  assert.equal(await open(), false);

  await p.click('#nav-toggle');
  assert.equal(await open(), true);
  await p.keyboard.press('Escape');
  assert.equal(await open(), false);
  assert.equal(await expanded(), 'false');

  await p.context().close();
});

test('the active nav link tracks the scrolled section', async () => {
  const p = await page();
  // `html { scroll-behavior: smooth }` makes the default behavior:'auto'
  // inherit an animated scroll (CSSOM), so force an instant jump here —
  // otherwise the active-link update rides on an animation duration that
  // races the 4000ms timeout below.
  await p.$eval('#ai', (el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await p.waitForFunction(
    () => document.querySelector('.nav__link--active')?.getAttribute('href') === '#ai',
    null, { timeout: 4000 });
  await p.context().close();
});

test('the copyright year is current', async () => {
  const p = await page();
  const year = await p.$eval('#year', (el) => el.textContent.trim());
  assert.equal(year, String(new Date().getFullYear()));
  await p.context().close();
});

test('every interactive element is reachable by keyboard', async () => {
  const p = await page();
  const count = await p.$$eval('a[href], button', (els) => els.length);
  const reached = new Set();
  for (let i = 0; i < count + 5; i++) {
    await p.keyboard.press('Tab');
    // Identify by position in the control list, not by href/id/tagName:
    // several distinct nav/footer/hero links intentionally share the same
    // href (e.g. multiple links to #conviction, both contact CTAs resolving
    // to the same mailto address), so a value-based key collapses genuinely
    // distinct, independently-reachable elements and undercounts coverage.
    const idx = await p.evaluate(() => {
      const a = document.activeElement;
      if (a === document.body) return null;
      const all = Array.prototype.slice.call(document.querySelectorAll('a[href], button'));
      const i = all.indexOf(a);
      return i === -1 ? null : i;
    });
    if (idx !== null) reached.add(idx);
  }
  assert.ok(reached.size >= count - 1, `tab reached ${reached.size} of ${count} controls`);
  await p.context().close();
});

test('motion tokens resolve and drive the block reveal', async () => {
  const p = await page();
  const tok = (n) => p.evaluate(
    (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim(), n);
  assert.equal(await tok('--dur-slow'), '720ms');
  assert.equal(await tok('--dur-hero'), '820ms');
  assert.equal(await tok('--stagger'), '70ms');
  assert.equal(await tok('--rise'), '24px');
  assert.equal(await tok('--rise-sm'), '18px');
  assert.equal(await tok('--rise-lg'), '28px');
  assert.equal(await tok('--lift'), '-3px');
  assert.equal(await tok('--amber-rgb'), '232, 160, 32');

  // A below-the-fold reveal still carries its pre-reveal state, now at the
  // tightened 24px / 720ms values rather than the original 34px / 850ms.
  const sel = '.section--company .section__title--company';
  assert.equal(await css(p, sel, 'transitionDuration'), '0.72s, 0.72s');
  assert.equal(await css(p, sel, 'transform'), 'matrix(1, 0, 0, 1, 0, 24)');
  await p.context().close();
});

test('staggered children carry strictly increasing transition delays', async () => {
  const p = await page();
  for (const sel of ['.loop', '.fn-grid', '.trio']) {
    const delays = await p.$$eval(`${sel} > *`,
      (els) => els.map((e) => parseFloat(getComputedStyle(e).transitionDelay)));
    assert.ok(delays.length >= 3, `${sel} should have several staggered children`);
    assert.equal(delays[0], 0, `${sel} first child must not be delayed`);
    for (let i = 1; i < delays.length; i++) {
      assert.ok(delays[i] > delays[i - 1],
        `${sel} child ${i} delay ${delays[i]}s must exceed ${delays[i - 1]}s`);
    }
  }
  await p.context().close();
});

test('staggered children are visible with no JS and under reduced motion', async () => {
  for (const opts of [{ javaScriptEnabled: false }, { reducedMotion: 'reduce' }]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
    const pg = await ctx.newPage();
    await pg.goto(server.url, { waitUntil: 'load' });
    const hidden = await pg.$$eval('[data-reveal-stagger] > *',
      (els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
    assert.equal(hidden, 0, `hidden staggered children with ${JSON.stringify(opts)}`);
    await ctx.close();
  }
});

test('the reveal failsafe shows below-fold content without animating it', async () => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  // Neuter IntersectionObserver so it never fires. The constructor must
  // still exist: setupReveal's `!('IntersectionObserver' in window)`
  // branch would show everything immediately and bypass the failsafe
  // this test exists to exercise.
  await ctx.addInitScript(() => {
    window.IntersectionObserver = function () {
      return { observe() {}, unobserve() {}, disconnect() {} };
    };
  });
  const p = await ctx.newPage();
  await p.goto(server.url, { waitUntil: 'load' });

  const sel = '.section--company .section__title--company';
  assert.equal(await css(p, sel, 'opacity'), '0', 'hidden before the failsafe fires');
  await p.waitForFunction(
    (s) => getComputedStyle(document.querySelector(s)).opacity === '1', sel, { timeout: 6000 });
  assert.match(await css(p, sel, 'transitionDuration'), /^0s/,
    'the failsafe must use .is-instant, not animate unseen content into view');
  await ctx.close();
});

test('idling past the failsafe window still leaves the motion system live', async () => {
  // The failsafe exists for a broken observer, not a slow reader. A
  // visitor who spends four seconds on the hero before scrolling must
  // still get the choreography, not a pre-flattened page.
  const p = await page();
  await p.waitForTimeout(4200);          // 3.6s failsafe + margin

  const state = () => p.$eval('.loop', (el) => ({
    visible: el.classList.contains('is-visible'),
    instant: el.classList.contains('is-instant'),
  }));
  assert.deepEqual(await state(), { visible: false, instant: false },
    'the failsafe must not touch content the working observer still owns');

  await p.$eval('.loop', (el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await p.waitForFunction(
    () => document.querySelector('.loop').classList.contains('is-visible'),
    null, { timeout: 3000 });

  const durations = await p.$$eval('.loop > *',
    (els) => els.map((el) => getComputedStyle(el).transitionDuration));
  assert.ok(durations.length >= 4, `expected the loop cards, got ${durations.length}`);
  for (const d of durations) {
    assert.ok(parseFloat(d) > 0,
      `a stagger child animated with transition-duration ${d} after the failsafe window`);
  }
  await p.context().close();
});

// getComputedStyle on the pseudo returns a matrix string, or the keyword
// 'none' when no transform applies. DOMMatrixReadOnly throws on 'none',
// so treat that as the fully-drawn state. Inlined at each call site
// rather than shared — Playwright serializes each of these separately.
const underlineScale = (pg) => pg.evaluate(() => {
  const t = getComputedStyle(document.querySelector('.underline'), '::after').transform;
  return t === 'none' ? 1 : new DOMMatrixReadOnly(t).a;
});

test('the underline sweeps when its heading reveals, not at page load', async () => {
  const p = await page();
  assert.equal(await underlineScale(p), 0,
    'undrawn while the conviction heading is still below the fold');

  await p.$eval('#conviction .section__title--xl',
    (el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await p.waitForFunction(() => {
    const t = getComputedStyle(document.querySelector('.underline'), '::after').transform;
    return t === 'none' || new DOMMatrixReadOnly(t).a > 0.9;
  }, null, { timeout: 4000 });
  await p.context().close();
});

test('the underline is drawn for no-JS and reduced-motion visitors', async () => {
  for (const opts of [{ javaScriptEnabled: false }, { reducedMotion: 'reduce' }]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
    const pg = await ctx.newPage();
    await pg.goto(server.url, { waitUntil: 'load' });
    assert.equal(await underlineScale(pg), 1,
      `underline not drawn with ${JSON.stringify(opts)}`);
    await ctx.close();
  }
});

test('ambient loops idle offscreen and run on screen', async () => {
  const p = await page();
  const state = (sel) => css(p, sel, 'animationPlayState');
  assert.equal(await state('.hero__mark'), 'running', 'the hero is on screen at load');
  assert.equal(await state('.loop-card__bar'), 'paused', 'the loop is far below the fold');

  await p.$eval('.loop', (el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await p.waitForFunction(
    () => getComputedStyle(document.querySelector('.loop-card__bar')).animationPlayState === 'running',
    null, { timeout: 3000 });
  assert.equal(await state('.hero__mark'), 'paused', 'the hero has left the viewport');
  await p.context().close();
});

test('ambient loops run unconditionally when the observer cannot', async () => {
  // Paused forever is a worse failure than always running, so both the
  // reduced-motion path and a missing IntersectionObserver must leave
  // every container live.
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { delete window.IntersectionObserver; });
  const p = await ctx.newPage();
  await p.goto(server.url, { waitUntil: 'load' });
  const live = await p.$$eval('.hero, .loop, .lockup',
    (els) => els.every((e) => e.classList.contains('is-live')));
  assert.ok(live, 'every ambient container should be live without an observer');
  await ctx.close();
});

test('the nav compacts once the viewport leaves the hero', async () => {
  const p = await page();
  assert.equal(
    await p.$eval('.nav', (el) => el.classList.contains('nav--scrolled')), false,
    'not scrolled at the top of the hero');
  assert.equal(await css(p, '.nav__inner', 'paddingTop'), '16px');

  await p.$eval('#dipgos', (el) => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await p.waitForFunction(
    () => document.querySelector('.nav').classList.contains('nav--scrolled'),
    null, { timeout: 3000 });
  await p.waitForFunction(
    () => getComputedStyle(document.querySelector('.nav__inner')).paddingTop === '11px',
    null, { timeout: 3000 });
  await p.context().close();
});

test('the hero offers both a primary and a secondary action', async () => {
  const p = await page();
  const links = await p.$$eval('.hero__actions a', (els) => els.map((e) => ({
    href: e.getAttribute('href'),
    u: e.getAttribute('data-u'),
    text: e.textContent.trim(),
  })));
  assert.equal(links.length, 2, 'expected a primary and a secondary hero CTA');
  assert.deepEqual(links.map((l) => l.href), ['#dipgos', '#contact']);
  // A third obfuscated mailto would break the structure suite's
  // exactly-two contract, so the secondary sends people to the contact
  // section, which carries the real address.
  assert.deepEqual(links.map((l) => l.u), [null, null]);
  for (const l of links) assert.ok(l.text.length > 0, 'hero CTAs need labels');
  await p.context().close();
});

test('cards answer the pointer, and reduced motion stills them', async () => {
  const p = await page();
  await p.$eval('.loop', (el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await (await p.$('.loop-card')).hover();
  // The lift rides the independent `translate` property, never `transform` —
  // `transform` belongs to the reveal, whose .is-visible rule outranks any
  // practical hover selector at (0,3,0).
  await p.waitForFunction(
    () => getComputedStyle(document.querySelector('.loop-card')).translate !== 'none',
    null, { timeout: 2000 });
  const lifted = await css(p, '.loop-card', 'translate');
  assert.match(lifted, /-3px$/, `expected a 3px upward lift, got ${lifted}`);
  await p.context().close();

  const ctx = await browser.newContext({
    reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  const rp = await ctx.newPage();
  await rp.goto(server.url, { waitUntil: 'load' });
  await rp.$eval('.loop', (el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await (await rp.$('.loop-card')).hover();
  await rp.waitForTimeout(400);
  assert.equal(await css(rp, '.loop-card', 'translate'), 'none',
    'reduced motion must leave the card exactly where it is');
  await ctx.close();
});

test('the command centre parallaxes only while it is on screen', async () => {
  const p = await page();
  const parallax = () => p.$eval('.frame img',
    (el) => el.style.getPropertyValue('--parallax'));
  assert.equal(await parallax(), '',
    'nothing should be written before the frame is reached');

  await p.$eval('.frame', (el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await p.waitForFunction(
    () => document.querySelector('.frame img').style.getPropertyValue('--parallax') !== '',
    null, { timeout: 3000 });

  const centred = parseFloat(await parallax());
  assert.ok(Math.abs(centred) < 3, `near centre the offset should be small, got ${centred}`);

  await p.evaluate(() => window.scrollBy(0, -300));
  await p.waitForTimeout(250);
  const moved = parseFloat(await parallax());
  assert.notEqual(moved, centred, 'scrolling should move the image');
  assert.ok(Math.abs(moved) <= 10, `offset must stay inside the 10px range, got ${moved}`);

  // "only while": once the frame is gone the scroll handler is detached,
  // so further scrolling must leave the last written value untouched.
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(250);
  const parked = parseFloat(await parallax());
  await p.evaluate(() => window.scrollBy(0, -220));
  await p.waitForTimeout(250);
  assert.equal(parseFloat(await parallax()), parked,
    'the offset must not keep updating once the frame has left the viewport');
  await p.context().close();
});

test('the parallax never travels further than the frame scale can hide', async () => {
  // scale(1.04) buys 2% of the image's height as headroom at each edge.
  // A flat 10px range outruns that on small viewports and opens a sliver
  // of page background inside the frame's rounded, hairline border.
  const p = await page({ viewport: { width: 390, height: 844 } });
  await p.$eval('.frame', (el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await p.waitForFunction(
    () => document.querySelector('.frame img').style.getPropertyValue('--parallax') !== '',
    null, { timeout: 3000 });

  // Let the 1s frame entrance finish: mid-transition the frame is still
  // at scale(.965), so its height — and the headroom derived from it —
  // is not yet the one the visitor ends up looking at.
  await p.waitForTimeout(1400);

  // Walk the frame across the whole viewport so every point of the travel
  // is sampled, not just the two the happy-path test happens to hit. Read
  // the offset and the height it has to hide inside in the same evaluate.
  const seen = [];
  for (let i = 0; i < 14; i += 1) {
    await p.evaluate(() => window.scrollBy(0, -80));
    await p.waitForTimeout(60);
    seen.push(await p.evaluate(() => ({
      offset: parseFloat(document.querySelector('.frame img').style.getPropertyValue('--parallax')),
      height: document.querySelector('.frame').getBoundingClientRect().height,
    })));
  }

  assert.ok(seen.some((s) => Math.abs(s.offset) > 0), 'the parallax should still move at 390px');
  for (const { offset, height } of seen) {
    const limit = height * 0.02 + 0.01;   // +toFixed(2) rounding
    assert.ok(Math.abs(offset) <= limit,
      `travelled ${offset}px against ${limit.toFixed(2)}px of headroom on a ${height}px frame`);
  }
  await p.context().close();
});

test('reduced motion leaves the command centre perfectly still', async () => {
  const ctx = await browser.newContext({
    reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(server.url, { waitUntil: 'load' });
  await p.$eval('.frame', (el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await p.evaluate(() => window.scrollBy(0, -300));
  await p.waitForTimeout(400);
  assert.equal(
    await p.$eval('.frame img', (el) => el.style.getPropertyValue('--parallax')), '',
    'no parallax may be written under prefers-reduced-motion');
  await ctx.close();
});

test('the ghost numeral clears the eyebrow it used to run through', async () => {
  for (const width of [1440, 700, 390]) {
    const p = await page({ viewport: { width, height: 900 } });
    const box = await p.evaluate(() => {
      const g = document.querySelector('.section--conviction .ghost');
      const e = document.querySelector('.section--conviction .eyebrow');
      return {
        ghostTop: g.getBoundingClientRect().top,
        eyebrowBottom: e.getBoundingClientRect().bottom,
      };
    });
    assert.ok(box.ghostTop >= box.eyebrowBottom,
      `at ${width}px the ghost starts at ${box.ghostTop}, above the eyebrow's ${box.eyebrowBottom}`);
    await p.context().close();
  }
});

test('rules and bars draw in with their section', async () => {
  const p = await page();
  const scaleX = (sel) => p.$eval(sel, (el) => {
    const t = getComputedStyle(el).transform;
    return t === 'none' ? 1 : new DOMMatrixReadOnly(t).a;
  });
  assert.equal(await scaleX('.statement__bar'), 0, 'retracted below the fold');
  await p.$eval('.statement', (el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await p.waitForFunction(() => {
    const t = getComputedStyle(document.querySelector('.statement__bar')).transform;
    return t === 'none' || new DOMMatrixReadOnly(t).a > 0.9;
  }, null, { timeout: 4000 });
  await p.context().close();
});
