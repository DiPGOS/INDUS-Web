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
  await p.context().close();
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

test('content is fully visible with JavaScript disabled', async () => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(server.url, { waitUntil: 'load' });
  const hidden = await p.$$eval('[data-reveal]',
    (els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
  assert.equal(hidden, 0, 'no-JS visitors must see every reveal element');
  await ctx.close();
});

test('above-the-fold reveals are visible immediately, without animating in', async () => {
  const p = await page();
  assert.equal(await css(p, '.hero__title', 'opacity'), '1');
  await p.context().close();
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
  await p.$eval('#ai', (el) => el.scrollIntoView());
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
