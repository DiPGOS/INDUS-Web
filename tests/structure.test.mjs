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
