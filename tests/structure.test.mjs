import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (f) => readFile(new URL(`../${f}`, import.meta.url), 'utf8');

test('index.html has no inline style attributes', async () => {
  const html = await read('index.html');
  assert.equal(html.match(/\sstyle="/g), null, 'found style="" attributes');
});

test('index.html leaks no email address', async () => {
  const html = await read('index.html');
  assert.ok(!html.includes('kamran@industechsol.com'), 'raw email present in HTML');
  assert.ok(!/mailto:/i.test(html), 'literal mailto: present in HTML');
});

test('index.html carries the required metadata', async () => {
  const html = await read('index.html');
  for (const needle of [
    '<html lang="en">',
    'name="viewport"',
    'name="description"',
    'name="theme-color" content="#0A1424"',
    'name="color-scheme" content="dark"',
    'rel="canonical" href="https://industechsol.com/"',
    'property="og:title"',
    'property="og:description"',
    'property="og:image"',
    'property="og:url"',
    'name="twitter:card" content="summary_large_image"',
    'assets/favicon.svg',
  ]) {
    assert.ok(html.includes(needle), `missing metadata: ${needle}`);
  }
});

test('the only external origin is Google Fonts', async () => {
  const html = await read('index.html');
  const urls = [...html.matchAll(/https?:\/\/([^/"'\s]+)/g)].map((m) => m[1]);
  const allowed = new Set(['fonts.googleapis.com', 'fonts.gstatic.com', 'industechsol.com']);
  for (const host of urls) assert.ok(allowed.has(host), `unexpected external host: ${host}`);
});

test('every referenced asset path exists on disk', async () => {
  const { stat } = await import('node:fs/promises');
  const html = await read('index.html');
  const paths = new Set([...html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)].map((m) => m[1]));
  assert.ok(paths.size > 0, 'no assets/ references found at all');
  for (const p of paths) {
    await assert.doesNotReject(stat(new URL(`../${p}`, import.meta.url)), `broken reference: ${p}`);
  }
});

test('nothing under public/ is referenced', async () => {
  const html = await read('index.html');
  assert.ok(!html.includes('public/'), 'index.html still references public/');
});

test('the hero landmark and nav exist with correct anchors', async () => {
  const html = await read('index.html');
  assert.ok(html.includes('id="top"'), 'missing #top');
  for (const id of ['conviction', 'dipgos', 'ai', 'company', 'contact']) {
    assert.ok(html.includes(`href="#${id}"`), `nav is missing a link to #${id}`);
  }
});

test('heading levels never skip', async () => {
  const html = await read('index.html');
  const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
  assert.equal(levels[0], 1, 'document must open with an h1');
  assert.equal(levels.filter((l) => l === 1).length, 1, 'exactly one h1');
  for (let i = 1; i < levels.length; i++) {
    assert.ok(levels[i] <= levels[i - 1] + 1, `h${levels[i - 1]} followed by h${levels[i]} skips a level`);
  }
});

test('the mailto contract is present and complete', async () => {
  const html = await read('index.html');
  const pairs = [...html.matchAll(/data-u="([^"]+)"\s+data-d="([^"]+)"/g)];
  assert.equal(pairs.length, 2, 'expected exactly two obfuscated contact anchors');
  for (const [, u, d] of pairs) {
    assert.equal(u, 'kamran');
    assert.equal(d, 'industechsol.com');
  }
});

test('the old public/ tree is gone', async () => {
  const { stat } = await import('node:fs/promises');
  await assert.rejects(stat(new URL('../public', import.meta.url)),
    'public/ still exists — the old site was not removed');
});

test('styles.css defines colours only in :root', async () => {
  const css = await read('styles.css');
  const root = css.slice(css.indexOf(':root'), css.indexOf('}', css.indexOf(':root')));
  const outside = css.replace(root, '');
  const hexes = [...outside.matchAll(/#[0-9a-fA-F]{3,8}\b/g)].map((m) => m[0]);
  assert.deepEqual(hexes, [], `hex literals outside :root: ${hexes.join(', ')}`);
});

test('the total shipped payload stays under 1 MB', async () => {
  const { stat, readdir } = await import('node:fs/promises');
  let total = 0;
  for (const f of ['index.html', 'styles.css', 'main.js']) {
    total += (await stat(new URL(`../${f}`, import.meta.url))).size;
  }
  for (const f of await readdir(new URL('../assets', import.meta.url))) {
    total += (await stat(new URL(`../assets/${f}`, import.meta.url))).size;
  }
  assert.ok(total < 1024 * 1024, `shipped payload is ${Math.round(total / 1024)} KB, budget 1024 KB`);
});

test('the brand is set as Indus, never INDUS', async () => {
  // The hero lead and the meta description shouted it; every other mention —
  // title, og tags, footer, copyright, legal entities — did not.
  const html = await read('index.html');
  const shouted = [...html.matchAll(/INDUS/g)].map((m) => html.slice(Math.max(0, m.index - 40), m.index + 45));
  assert.deepEqual(shouted, [], `"INDUS" appears in: ${shouted.join(' | ')}`);
});

test('the legal entities are named in one place', async () => {
  // They ran in section 04 and again in the footer, word for word. The footer
  // is where they belong; 04 is about the people.
  const html = await read('index.html');
  assert.equal(html.match(/Indus Technologies LLC/g).length, 1);
  assert.equal(html.match(/Indus Technology Solutions \(Pvt\) Ltd/g).length, 1);
});

test('the keyboard entry point exists and points at main', async () => {
  const html = await read('index.html');
  assert.match(html, /<a class="skip-link" href="#content">/,
    'no skip link ahead of the six nav tab stops');
  assert.match(html, /<main id="content" tabindex="-1">/,
    'the skip link needs a focusable target');
});

test('the contentinfo footer sits outside main', async () => {
  const html = await read('index.html');
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  assert.ok(!main.includes('role="contentinfo"'),
    'contentinfo must be a top-level landmark');
  assert.ok(html.indexOf('</main>') < html.indexOf('role="contentinfo"'),
    'the footer must come after </main>');
});

test('the no-JS contact fallback names an address without writing one', async () => {
  const html = await read('index.html');
  assert.match(html, /<noscript><p class="contact__fallback">/);
  assert.ok(html.includes('kamran (at) industechsol.com'),
    'the fallback must name a reachable address');
});
