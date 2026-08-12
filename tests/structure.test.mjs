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
