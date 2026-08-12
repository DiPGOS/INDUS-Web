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
  await p.context().close();
});
