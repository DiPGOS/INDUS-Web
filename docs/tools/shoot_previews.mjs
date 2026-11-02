// 1920x1080 desktop preview of every mock in the owner review package.
// Run from the repo root with the preview server up:
//   node docs/tools/shoot_previews.mjs http://127.0.0.1:49729
import { chromium } from 'playwright';
import { mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const base = (process.argv[2] || '').replace(/\/$/, '');
if (!base) { console.error('usage: shoot_previews.mjs <baseUrl>'); process.exit(1); }
const pkg = 'docs/owner-review';
await mkdir(`${pkg}/previews`, { recursive: true });

const shell = `${process.env.LOCALAPPDATA}/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-win64/chrome-headless-shell.exe`;
const browser = await chromium.launch(existsSync(shell) ? { executablePath: shell } : {});
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const failed = [];
page.on('requestfailed', (r) => failed.push(r.url()));
page.on('response', (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });

for (const rnd of ['r1', 'r2', 'r3', 'r4']) {
  for (const file of (await readdir(`${pkg}/mocks/${rnd}`)).filter((f) => f.endsWith('.html'))) {
    const id = file.replace('.html', '');
    await page.goto(`${base}/${pkg}/mocks/${rnd}/${file}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2600); // let each mock's one entrance moment finish
    await page.screenshot({ path: `${pkg}/previews/${rnd}-${id}.jpg`, type: 'jpeg', quality: 82 });
    console.log('shot', rnd, id);
  }
}
await browser.close();
console.log(failed.length ? `FAILED REQUESTS:\n${failed.join('\n')}` : 'all requests ok');
