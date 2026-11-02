// Screenshot + sanity report for one round-3 mock.
// Usage (from the repo root): node docs/redesign-mocks-r4/tools/shoot.mjs <id> <baseUrl>
//   e.g. node docs/redesign-mocks-r4/tools/shoot.mjs r4a-ground http://127.0.0.1:12345
// Writes docs/redesign-mocks-r4/shots/<id>-{desktop,tablet,phone}-*.png and prints a JSON report.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const [id, base] = process.argv.slice(2);
if (!id || !base) { console.error('usage: shoot.mjs <id> <baseUrl>'); process.exit(1); }
const url = `${base.replace(/\/$/, '')}/docs/redesign-mocks-r4/${id}.html`;
const out = 'docs/redesign-mocks-r4/shots';
await mkdir(out, { recursive: true });

const views = [
  { name: 'desktop', width: 1440, height: 900, max: 16 },
  { name: 'tablet', width: 820, height: 1180, max: 1 },
  { name: 'phone', width: 390, height: 844, max: 18, mobile: true },
];
// The installed Playwright expects a newer Chromium than the one on this machine;
// fall back to the installed headless shell when it exists.
const shell = `${process.env.LOCALAPPDATA}/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-win64/chrome-headless-shell.exe`;
const browser = await chromium.launch(existsSync(shell) ? { executablePath: shell } : {});
const report = { url };
for (const v of views) {
  const ctx = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: 1,
    isMobile: !!v.mobile,
    hasTouch: !!v.mobile,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1800); // let the one entrance animation settle
  const m = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight,
    words: (document.querySelector('main') || document.body).innerText.split(/\s+/).filter(Boolean).length,
    h2: document.querySelectorAll('main h2').length,
  }));
  const screens = Math.ceil(m.height / v.height);
  report[v.name] = { ...m, screens, overflowX: m.scrollWidth > m.clientWidth, errors };
  const n = Math.min(screens, v.max);
  for (let i = 0; i < n; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * v.height);
    await page.waitForTimeout(450);
    await page.screenshot({ path: `${out}/${id}-${v.name}-${i === 0 ? 'fold' : i + 1}.png` });
  }
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(report, null, 2));
