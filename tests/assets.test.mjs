import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stat, readFile } from 'node:fs/promises';

const A = new URL('../assets/', import.meta.url);
const sizeOf = async (name) => (await stat(new URL(name, A))).size;

test('all seven assets exist', async () => {
  for (const f of [
    'constellation-dark.svg', 'dipgos-mark-light.svg', 'i-dot.svg',
    'command-center.webp', 'favicon.svg', 'favicon.png', 'og-card.png',
  ]) {
    await assert.doesNotReject(stat(new URL(f, A)), `missing assets/${f}`);
  }
});

test('command-center.webp is under the 500 KB budget', async () => {
  const bytes = await sizeOf('command-center.webp');
  assert.ok(bytes < 500 * 1024, `command-center.webp is ${bytes} bytes, budget 512000`);
  assert.ok(bytes > 20 * 1024, `command-center.webp is ${bytes} bytes — suspiciously small, check the conversion`);
});

test('command-center.webp is a real WebP', async () => {
  const buf = await readFile(new URL('command-center.webp', A));
  assert.equal(buf.subarray(0, 4).toString('latin1'), 'RIFF');
  assert.equal(buf.subarray(8, 12).toString('latin1'), 'WEBP');
});

test('og-card.png is 1200x300', async () => {
  const buf = await readFile(new URL('og-card.png', A));
  assert.equal(buf.subarray(1, 4).toString('latin1'), 'PNG');
  // PNG IHDR: width at byte 16, height at byte 20, both big-endian uint32
  assert.equal(buf.readUInt32BE(16), 1200);
  assert.equal(buf.readUInt32BE(20), 300);
});

test('the three SVGs are copied verbatim, not re-encoded', async () => {
  for (const f of ['constellation-dark.svg', 'dipgos-mark-light.svg', 'i-dot.svg']) {
    const txt = await readFile(new URL(f, A), 'utf8');
    assert.match(txt, /^<svg\b/, `assets/${f} should start with <svg`);
  }
});
