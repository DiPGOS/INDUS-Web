# DiPGOS Site Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the INDUS marketing site with the single-page DiPGOS site from the Claude Design bundle, as a hand-written static site with no build step.

**Architecture:** Four shipped files at the repo root — `index.html`, `styles.css`, `main.js`, `assets/` — served directly by GitHub Pages. The design prototype's inline styles are lifted into `:root` custom properties plus BEM-lite component classes, because inline `style=` cannot express `:hover` or media queries and the site needs both. A dev-only test suite (`tests/`, `package.json`, gitignored `node_modules/`) verifies structure, asset budget, responsive behaviour, and accessibility; none of it is served content.

**Tech Stack:** HTML5, hand-written CSS (custom properties, grid, `clamp()`), vanilla ES2020 JS (no framework, no dependencies at runtime). Gelasio via Google Fonts; body type is the `Arial` system stack. Tests: Node 26 built-in `node:test` + `playwright` (devDependency, Chromium only). Image conversion: `npx sharp-cli`.

## Global Constraints

Every task's requirements implicitly include this section. Values are copied verbatim from `docs/superpowers/specs/2026-08-12-dipgos-site-rebuild-design.md`.

- **Source of truth is the local bundle** at `dipgos-presentation-cover/project/`. That directory is **gitignored** — every asset must be *copied into* `assets/`. Never reference a path under `dipgos-presentation-cover/` from shipped code.
- **Never push anything back** to the Claude Design project.
- **No runtime dependencies.** The shipped site loads exactly one external resource: the Gelasio stylesheet from `fonts.googleapis.com`. No CDN scripts, no analytics, no third-party embeds.
- **No build step.** `index.html`, `styles.css`, `main.js`, and `assets/` are served exactly as committed.
- **The string `kamran@industechsol.com` must never appear in `index.html`, `styles.css`, or any served asset.** It is assembled at runtime in `main.js` from `data-u` / `data-d` attributes.
- **No `style="` attributes in `index.html`.** No literal hex colour outside `styles.css`, except `<meta name="theme-color" content="#0A1424">`, which cannot reference a custom property.
- **Every colour, size, and timing is copied verbatim from the prototype.** Do not "improve" values. The 14 approved deviations in the spec are the complete list of permitted departures.
- **Design tokens** (exact values, defined once in `:root`):
  `--ink:#0A1424` · `--navy:#0B182C` · `--slate:#12233F` · `--ink-deep:#070F1C` · `--amber:#E8A020` · `--amber-hi:#FFC24D` · `--amber-soft:#E8C98A` · `--on-amber:#3a2c0c` · `--bone:#FBF9F4` · `--text-hi:#dbe3ec` · `--text-mid:#c1cdda` · `--steel:#9DB0C4` · `--dim:#6b7d92` · `--rule-rgb:157,176,196` · `--max:1280px` · `--nav-h:72px`
- **Breakpoints:** desktop ≥1100px (the prototype, verbatim) · tablet 700–1099px · mobile <700px. **Nav flips to hamburger at 860px**, which is deliberately *not* a tier boundary.
- **Radius scale:** `999px` pills · `18px` command-center frame · `16px` loop + foundation cards · `14px` function + AI cards · `11px` foundation chips.
- **All six keyframe animations** (`floatY` 9s, `corepulse` 4s, `drift` 22s, `bob` 2.2s, `underline` 1s, `loopglow` 3.2s) and the reveal transition must be disabled under `@media (prefers-reduced-motion: reduce)`, along with `scroll-behavior:smooth`.
- **Copy is verbatim from the prototype**, with exactly one correction: `"systemwe always needed"` → `"system we always needed"`. Preserve the design's em dashes (—), curly apostrophes (’), and non-breaking spaces where they appear.

---

## File Structure

| File | Responsibility |
|---|---|
| `index.html` | All markup and copy. Seven landmarks, semantic elements, zero presentation. |
| `styles.css` | Every visual rule. Ordered: tokens → reset → keyframes → base type → components in document order → responsive tiers → reduced-motion. |
| `main.js` | Four behaviours: reveal observer, mobile nav, active-link, mailto assembly + year. IIFE, no globals. |
| `assets/` | 7 files. Three SVGs verbatim, one converted WebP, two favicons, one OG card. |
| `tests/helpers/server.mjs` | Zero-dependency static file server for browser tests. |
| `tests/assets.test.mjs` | Asset existence, dimensions, byte budgets. |
| `tests/structure.test.mjs` | HTML/CSS invariants parsed as text — no browser. |
| `tests/browser.test.mjs` | Playwright: computed styles, responsive tiers, no-JS, reduced-motion, keyboard. |
| `package.json` | devDependency on `playwright` + `npm test` script. Not served content. |
| `Readme.md` | Rewritten to describe the new site. |

Splitting CSS across multiple files was considered and rejected: without a build step it would mean multiple `<link>` requests for one page, and the spec forbids a bundler.

---

### Task 1: Test harness and asset pipeline

**Files:**
- Create: `package.json`, `tests/helpers/server.mjs`, `tests/assets.test.mjs`
- Create: `assets/constellation-dark.svg`, `assets/dipgos-mark-light.svg`, `assets/i-dot.svg`, `assets/command-center.webp`, `assets/favicon.svg`, `assets/favicon.png`, `assets/og-card.png`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: nothing.
- Produces: `assets/` populated with the 7 filenames above (every later task references these exact names); `tests/helpers/server.mjs` exporting `async function startServer(root)` returning `{ url, close }`.

- [ ] **Step 1: Write the failing asset test**

Create `tests/assets.test.mjs`:

```js
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
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `node --test tests/assets.test.mjs`
Expected: FAIL — every subtest errors with `ENOENT` because `assets/` does not exist yet.

- [ ] **Step 3: Create package.json and the static server helper**

`package.json`:

```json
{
  "name": "indus-web",
  "version": "1.0.0",
  "private": true,
  "description": "Indus Technology Solutions marketing site. Static, no build step.",
  "scripts": {
    "test": "node --test tests/",
    "test:assets": "node --test tests/assets.test.mjs",
    "test:structure": "node --test tests/structure.test.mjs",
    "test:browser": "node --test tests/browser.test.mjs",
    "serve": "node tests/helpers/server.mjs --standalone"
  },
  "devDependencies": {
    "playwright": "^1.49.0"
  }
}
```

`tests/helpers/server.mjs`:

```js
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { extname, join, normalize } from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.json': 'application/json',
};

export async function startServer(root = fileURLToPath(new URL('../../', import.meta.url))) {
  const server = createServer(async (req, res) => {
    // Strip the query string, then block traversal above root.
    const rel = normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^([/\\])+/, '');
    const path = join(root, rel === '' ? 'index.html' : rel);
    if (!path.startsWith(root)) { res.writeHead(403).end('forbidden'); return; }
    try {
      const body = await readFile(path);
      res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('not found');
    }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const { port } = server.address();
  return {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise((r) => server.close(r)),
  };
}

if (process.argv.includes('--standalone')) {
  const { url } = await startServer();
  console.log(`serving on ${url}`);
}
```

- [ ] **Step 4: Install the dev dependency**

```bash
npm install
npx playwright install chromium
```

Expected: `playwright` in `node_modules/`, Chromium downloaded. `node_modules/` is already covered by `.gitignore`.

- [ ] **Step 5: Copy the three SVGs verbatim**

```bash
mkdir -p assets
SRC="dipgos-presentation-cover/project"
cp "$SRC/assets/constellation-dark.svg" assets/constellation-dark.svg
cp "$SRC/assets/dipgos-mark-light.svg" assets/dipgos-mark-light.svg
cp "$SRC/assets/i-dot.svg"             assets/i-dot.svg
cp "$SRC/exports/svg/indus-icon-dark-theme.svg" assets/favicon.svg
cp "$SRC/exports/indus-icon-dark-theme.png"     assets/favicon.png
```

- [ ] **Step 6: Convert the two raster assets**

```bash
SRC="dipgos-presentation-cover/project"
npx --yes sharp-cli -i "$SRC/assets/command-center.png" -o assets/ -f webp -q 80 --output-name command-center
npx --yes sharp-cli -i "$SRC/exports/linkedin-profile-banner-dark-3168x792.png" -o assets/ -f png resize 1200 300 --fit cover --output-name og-card
```

If `sharp-cli`'s flag names differ on the installed version, run `npx sharp-cli --help` and adapt — the requirement is only that `assets/command-center.webp` is a WebP under 500 KB and `assets/og-card.png` is a 1200×300 PNG. Both are asserted by the test.

- [ ] **Step 7: Add node_modules and test output to .gitignore**

Append to `.gitignore` (it already contains `dipgos-presentation-cover/` and `node_modules/` — confirm before adding, do not duplicate lines):

```
# test artifacts
test-results/
```

- [ ] **Step 8: Run the test to verify it passes**

Run: `node --test tests/assets.test.mjs`
Expected: PASS, 5/5 subtests. If the WebP budget fails, re-run step 6 with `-q 70`.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json .gitignore tests/ assets/
git commit -m "build: add test harness and copy design assets

Copies the three SVGs verbatim, converts command-center.png (2.6 MB)
to WebP and downscales the LinkedIn banner to a 1200x300 OG card.
Adds a zero-dependency static server and asset budget tests."
```

---

### Task 2: HTML document shell, metadata, nav, and hero

**Files:**
- Modify: `index.html` (full rewrite)
- Create: `tests/structure.test.mjs`

**Interfaces:**
- Consumes: `assets/` filenames from Task 1.
- Produces: the `<head>` block and the `.nav` / `.hero` markup. Class names later tasks style: `.nav`, `.nav__inner`, `.nav__brand`, `.nav__links`, `.nav__link`, `.nav__cta`, `.nav__toggle`, `.wordmark`, `.wordmark__i`, `.wordmark__dot`, `.hero`, `.hero__bg`, `.hero__mark`, `.hero__orb`, `.hero__inner`, `.hero__title`, `.hero__lead`, `.hero__strip`, `.hero__strip-inner`, `.hero__tagline`, `.hero__scroll`, `.hero__arrow`, `.accent`. Also produces the `[data-reveal]` contract consumed by Task 9 and the `.js` class contract set by the inline head script.

- [ ] **Step 1: Write the failing structure test**

Create `tests/structure.test.mjs`:

```js
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
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `node --test tests/structure.test.mjs`
Expected: FAIL — the old `index.html` still has `style="` attributes, a `mailto:`, `public/` references, and none of the new metadata.

- [ ] **Step 3: Rewrite index.html with the shell, nav, and hero**

Replace `index.html` entirely. This step produces the document down to the end of the hero; Tasks 3 and 4 append the remaining sections before `</body>`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Indus — The Project Operating System for Engineering &amp; Construction</title>
<meta name="description" content="INDUS is rebuilding how the world builds — a single operating system where every part of a project connects, so the project itself can think and act.">
<meta name="theme-color" content="#0A1424">
<meta name="color-scheme" content="dark">
<link rel="canonical" href="https://industechsol.com/">

<meta property="og:type" content="website">
<meta property="og:url" content="https://industechsol.com/">
<meta property="og:title" content="Indus — The Project Operating System">
<meta property="og:description" content="A single operating system where every part of a project connects, so the project itself can think and act.">
<meta property="og:image" content="https://industechsol.com/assets/og-card.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Indus — The Project Operating System">
<meta name="twitter:description" content="A single operating system where every part of a project connects, so the project itself can think and act.">
<meta name="twitter:image" content="https://industechsol.com/assets/og-card.png">

<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="assets/favicon.png" type="image/png" sizes="any">
<link rel="apple-touch-icon" href="assets/favicon.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gelasio:ital,wght@0,400;0,500;0,600;0,700;1,400&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
<script>document.documentElement.className = 'js';</script>
</head>
<body>

<header class="nav">
  <div class="nav__inner">
    <a class="nav__brand" href="#top" aria-label="Indus — home">
      <span class="wordmark"><span class="wordmark__i">ı<span class="wordmark__dot" aria-hidden="true"></span></span>ndus</span>
    </a>

    <button class="nav__toggle" id="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu">
      <span class="nav__bar" aria-hidden="true"></span>
      <span class="nav__bar" aria-hidden="true"></span>
      <span class="nav__bar" aria-hidden="true"></span>
    </button>

    <nav class="nav__links" id="nav-links" aria-label="Main">
      <a class="nav__link" href="#conviction">Conviction</a>
      <a class="nav__link" href="#dipgos">DiPGOS</a>
      <a class="nav__link" href="#ai">Applied AI</a>
      <a class="nav__link" href="#company">Company</a>
      <a class="nav__cta" href="#contact">Get in touch</a>
    </nav>
  </div>
</header>

<main>

<section class="hero" id="top">
  <img class="hero__bg" src="assets/constellation-dark.svg" alt="" aria-hidden="true">
  <img class="hero__mark" src="assets/dipgos-mark-light.svg" alt="" aria-hidden="true">
  <div class="hero__orb" aria-hidden="true"></div>

  <div class="hero__inner">
    <h1 class="hero__title" data-reveal>The world needs a new way to <span class="accent">build</span>.</h1>
    <p class="hero__lead" data-reveal>We can’t house, power and connect eight billion people with the fractured way the world builds today. <b>INDUS</b>&nbsp;is rebuilding it from the ground up — a single operating system where every part of a project connects, so the project itself can think and act.</p>
  </div>

  <div class="hero__strip">
    <div class="hero__strip-inner">
      <span class="hero__tagline">The world’s oldest industry, reimagined from the ground up.</span>
      <a class="hero__scroll" href="#conviction">Scroll<span class="hero__arrow" aria-hidden="true">↓</span></a>
    </div>
  </div>
</section>

</main>
<script src="main.js" defer></script>
</body>
</html>
```

Note the nav markup order: the toggle button sits **before** `.nav__links` in the DOM so keyboard focus reaches it first on mobile. CSS `order` restores the visual arrangement on desktop.

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/structure.test.mjs`
Expected: PASS, 7/7. The page renders unstyled — that is correct at this stage.

- [ ] **Step 5: Commit**

```bash
git add index.html tests/structure.test.mjs
git commit -m "feat: rewrite index.html shell, nav and hero

Semantic markup with no inline styles, full metadata, OG/Twitter cards
and favicons. Adds structural invariant tests: no style attributes, no
leaked email, no public/ references, every asset path resolves."
```

---

### Task 3: HTML for sections 01 Conviction and 02 DiPGOS

**Files:**
- Modify: `index.html` (insert both sections inside `<main>`, after `</section>` of the hero)

**Interfaces:**
- Consumes: `.accent`, `[data-reveal]` from Task 2.
- Produces: class names for Tasks 6 and 8: `.section`, `.section--conviction`, `.section--dipgos`, `.section__bg`, `.section__inner`, `.ghost`, `.eyebrow`, `.eyebrow__num`, `.eyebrow__rule`, `.eyebrow__label`, `.underline`, `.split`, `.split__col`, `.split__col--a`, `.split__col--b`, `.statement`, `.statement__bar`, `.lockup`, `.lockup__mark`, `.lockup__word`, `.lockup__tag`, `.block`, `.sublabel`, `.sublabel__rule`, `.loop`, `.loop-card`, `.loop-card--act`, `.loop-card__num`, `.loop-card__title`, `.loop-card__body`, `.loop-card__bar`, `.fn-grid`, `.fn-card`, `.fn-card__head`, `.fn-card__dot`, `.fn-card__title`, `.kicker`, `.arrow-label`, `.foundation`, `.foundation__inner`, `.foundation__lead`, `.foundation__label`, `.foundation__title`, `.foundation__chips`, `.chip`, `.frame`, `.trio`, `.trio__col`, `.trio__label`, `.lead`, `.prose`.

- [ ] **Step 1: Insert the Conviction section**

Insert immediately after the hero's closing `</section>`:

```html
<section class="section section--conviction" id="conviction">
  <div class="ghost" aria-hidden="true">01</div>
  <div class="section__inner">
    <div class="eyebrow" data-reveal>
      <span class="eyebrow__num">01</span>
      <span class="eyebrow__rule" aria-hidden="true"></span>
      <span class="eyebrow__label">Our Conviction</span>
    </div>

    <h2 class="section__title section__title--xl" data-reveal>We built the world. But never built the <span class="underline">machine that builds it</span>.</h2>

    <div class="split" data-reveal>
      <div class="split__col split__col--a">
        <p>Roads, dams, cities, power plants, buildings — every physical thing around us was delivered by engineering and construction. It is the largest industry on earth: <b>$15 trillion a year</b>. And its greatest work is still ahead — <span class="hi">the build now coming is the largest in the history of human civilization.</span></p>
      </div>
      <div class="split__col split__col--b">
        <p>What keeps us up at night is one question: <span class="hi">how will the world deliver it?</span> The industry carrying humanity’s future still fights the battles it has always fought — <span class="hi-soft">productivity stalled for decades</span>, <span class="hi-soft">cost and schedule overruns the norm rather than the exception</span>, <span class="hi-soft">quality failures still making headlines</span>.</p>
      </div>
    </div>

    <div class="statement" data-reveal>
      <span class="statement__bar" aria-hidden="true"></span>
      <p>The answer is not another tool on the pile. The industry has thousands of tools — each holding a fragment of the project. What’s missing is <b>the machine</b>: an <span class="accent">operating system</span>, one place where every part of a project connects, understands itself, and acts. Connect the work, and it <span class="accent">begins to think</span>.</p>
    </div>
  </div>
</section>
```

`.hi` renders `--bone`, `.hi-soft` renders `--text-mid` — both defined in Task 6.

- [ ] **Step 2: Insert the DiPGOS section header and the living loop**

Insert immediately after the Conviction `</section>`:

```html
<section class="section section--dipgos" id="dipgos">
  <img class="section__bg" src="assets/constellation-dark.svg" alt="" aria-hidden="true">
  <div class="section__inner">
    <div class="eyebrow" data-reveal>
      <span class="eyebrow__num">02</span>
      <span class="eyebrow__rule" aria-hidden="true"></span>
      <span class="eyebrow__label">The Operating System</span>
    </div>

    <div class="lockup" data-reveal>
      <img class="lockup__mark" src="assets/dipgos-mark-light.svg" alt="" aria-hidden="true">
      <span class="lockup__word" aria-label="DiPGOS">D<span class="wordmark__i wordmark__i--lg">ı<span class="wordmark__dot" aria-hidden="true"></span></span>PGOS</span>
      <span class="lockup__tag">Project<br>Operating System</span>
    </div>

    <h2 class="section__title" data-reveal>Your whole project, running as <span class="accent">one system</span>.</h2>
    <p class="lead" data-reveal>The first system built to run the work itself — connecting every signal, reasoning over the whole, and turning your project into one that can <b>think and act</b>.</p>

    <div class="block" data-reveal>
      <div class="sublabel"><span class="sublabel__rule" aria-hidden="true"></span>How it thinks</div>
      <p class="prose">A living loop runs continuously over the work. Each turn makes the next sharper — the project learns as it is built.</p>
      <div class="loop">
        <div class="loop-card">
          <div class="loop-card__num">01</div>
          <h3 class="loop-card__title">Sense</h3>
          <p class="loop-card__body">Read the project’s true state from the ground, live.</p>
          <span class="loop-card__bar" aria-hidden="true"></span>
        </div>
        <div class="loop-card">
          <div class="loop-card__num">02</div>
          <h3 class="loop-card__title">Understand</h3>
          <p class="loop-card__body">Set it against what you know and the science of the work.</p>
          <span class="loop-card__bar" aria-hidden="true"></span>
        </div>
        <div class="loop-card">
          <div class="loop-card__num">03</div>
          <h3 class="loop-card__title">Foresee</h3>
          <p class="loop-card__body">See what’s coming before it lands on the programme.</p>
          <span class="loop-card__bar" aria-hidden="true"></span>
        </div>
        <div class="loop-card">
          <div class="loop-card__num">04</div>
          <h3 class="loop-card__title">Adapt</h3>
          <p class="loop-card__body">Reshape the plan against the live operation.</p>
          <span class="loop-card__bar" aria-hidden="true"></span>
        </div>
        <div class="loop-card loop-card--act">
          <div class="loop-card__num">05</div>
          <h3 class="loop-card__title">Act</h3>
          <p class="loop-card__body">Put the call in front of the right person, and move.</p>
        </div>
      </div>
    </div>
```

The `loopglow` animation delays (`0`, `.5s`, `1s`, `1.5s`) are applied in CSS via `:nth-child`, not per-element markup.

- [ ] **Step 3: Insert "What it connects"**

Append inside the same `.section__inner`:

```html
    <div class="block" data-reveal>
      <div class="sublabel"><span class="sublabel__rule" aria-hidden="true"></span>What it connects</div>
      <h3 class="block__title">Every function, on one live picture of the work.</h3>
      <p class="prose">Today each function runs in its own tool, blind to the rest. In DiPGOS they all run on one live picture of the job — so schedule, cost, supply chain, quality and safety finally move together.</p>

      <div class="kicker">Functions that run themselves — driven by the work, approved by you</div>
      <div class="fn-grid">
        <div class="fn-card"><div class="fn-card__head"><span class="fn-card__dot" aria-hidden="true"></span><h4 class="fn-card__title">Autonomous Scheduling</h4></div><p>The plan drives itself off the live process.</p></div>
        <div class="fn-card"><div class="fn-card__head"><span class="fn-card__dot" aria-hidden="true"></span><h4 class="fn-card__title">Finance</h4></div><p>Cost and value move with the work.</p></div>
        <div class="fn-card"><div class="fn-card__head"><span class="fn-card__dot" aria-hidden="true"></span><h4 class="fn-card__title">Supply Chain</h4></div><p>Materials sequenced to the real plan.</p></div>
        <div class="fn-card"><div class="fn-card__head"><span class="fn-card__dot" aria-hidden="true"></span><h4 class="fn-card__title">Risk Management</h4></div><p>Exposure caught before it bites.</p></div>
        <div class="fn-card"><div class="fn-card__head"><span class="fn-card__dot" aria-hidden="true"></span><h4 class="fn-card__title">Resource Manager</h4></div><p>People and plant, put where they pay.</p></div>
        <div class="fn-card"><div class="fn-card__head"><span class="fn-card__dot" aria-hidden="true"></span><h4 class="fn-card__title">Document Manager</h4></div><p>The right revision, tied to the work.</p></div>
      </div>

      <div class="arrow-label" aria-hidden="true">↓&nbsp;&nbsp;every function runs on one foundation&nbsp;&nbsp;↓</div>

      <div class="foundation">
        <img class="section__bg" src="assets/constellation-dark.svg" alt="" aria-hidden="true">
        <div class="foundation__inner">
          <div class="foundation__lead">
            <div class="foundation__label">The foundation · it all starts here</div>
            <h4 class="foundation__title">Operational Management</h4>
            <p>How the work is actually going, on the ground — captured live, where delivery is won or lost.</p>
          </div>
          <div class="foundation__chips">
            <div class="chip">Productivity</div>
            <div class="chip">Quality</div>
            <div class="chip">Health &amp; safety</div>
          </div>
        </div>
      </div>

      <p class="statement__close">The intelligence does the heavy lifting; <span class="accent">you approve</span>. Every function runs itself — and you stay in command.</p>
    </div>
```

- [ ] **Step 4: Insert "Where you run it" and close the section**

```html
    <div class="block" data-reveal>
      <div class="sublabel"><span class="sublabel__rule" aria-hidden="true"></span>Where you run it</div>
      <h3 class="block__title">The command center — not a dashboard.</h3>
      <p class="prose">The operational command center your team runs the work from, and takes decisions in. One place: where the work stands, what it’s made of, and how it’s performing.</p>

      <div class="frame">
        <img src="assets/command-center.webp" width="2400" height="1350" loading="lazy" decoding="async"
             alt="DiPGOS command center — scope navigation at left, a live project map at the centre, and productivity, quality and business panels at right">
      </div>

      <div class="trio">
        <div class="trio__col">
          <div class="trio__label">Navigate — where, what &amp; how</div>
          <p><b>Where</b> — the live map, the epicentre of activity. <b>What</b> — scope, blocks and work fronts. <b>How</b> — productivity, quality and safety. The whole project, navigable from one place.</p>
        </div>
        <div class="trio__col">
          <div class="trio__label">Action &amp; command</div>
          <p>Approve, escalate, change, resolve — every action taken inside the system, in context, on the record. Alarms, decision engine, change manager, notifications, collaboration — command lives where the work lives.</p>
        </div>
        <div class="trio__col">
          <div class="trio__label">Decision intelligence</div>
          <p>Your <b>knowledge repository</b> — historic projects and contracts — reasoned against the live operation the moment a decision is made.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Set the real `width`/`height` on the command-center image.** Read the actual pixel dimensions of the generated WebP and substitute them — the `2400`/`1350` above is a placeholder ratio that must be replaced with measured values, or the reserved space will be wrong and the page will shift on load. Get them with:

```bash
node -e "const b=require('fs').readFileSync('assets/command-center.webp');const i=b.indexOf('VP8 ')>=0?b.indexOf('VP8 '):b.indexOf('VP8L');console.log('inspect manually if unclear');" 
npx --yes sharp-cli -i assets/command-center.webp --help >/dev/null 2>&1 || true
```

Simplest reliable read — take the dimensions from the *source* PNG, since the conversion in Task 1 did not resize:

```bash
node -e "const b=require('fs').readFileSync('dipgos-presentation-cover/project/assets/command-center.png');console.log(b.readUInt32BE(16)+'x'+b.readUInt32BE(20))"
```

- [ ] **Step 5: Run the structure tests to verify nothing regressed**

Run: `node --test tests/structure.test.mjs`
Expected: PASS, 7/7. In particular `every referenced asset path exists on disk` now also covers `command-center.webp`.

- [ ] **Step 6: Verify the image dimensions were substituted**

Run:
```bash
grep -o 'width="[0-9]*" height="[0-9]*"' index.html
```
Expected: the printed values match the `WxH` from Step 4. If they still read `2400 1350` and that is not the real size, fix before committing.

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "feat: add Conviction and DiPGOS section markup

Sections 01 and 02 including the five-card living loop, six function
cards, the foundation panel and the command-center block. Loop
animation delays move to CSS nth-child rather than per-element."
```

---

### Task 4: HTML for sections 03 AI, 04 Company, contact and footer

**Files:**
- Modify: `index.html` (append the remaining sections)

**Interfaces:**
- Consumes: `.section`, `.eyebrow`, `.accent`, `[data-reveal]` from Tasks 2–3.
- Produces: `.section--ai`, `.section--company`, `.ai-grid`, `.stack`, `.stack__card`, `.stack__card--primary`, `.stack__title`, `.stack__sub`, `.stack__connector`, `.ai-prose`, `.ai-prose__close`, `.company`, `.company__meta`, `.meta`, `.meta__label`, `.meta__name`, `.meta__role`, `.contact`, `.contact__orb`, `.contact__inner`, `.contact__eyebrow`, `.contact__title`, `.contact__cta`, `.footer`, `.footer__brand`, `.footer__tagline`, `.footer__col`, `.footer__label`, `.footer__links`, `.footer__link`, `.footer__bottom`, `.footer__copy`, `.footer__motto`. Produces the `data-u` / `data-d` attribute contract consumed by Task 10, and `#year`.

- [ ] **Step 1: Insert the Applied & Physical AI section**

After the DiPGOS `</section>`:

```html
<section class="section section--ai" id="ai">
  <div class="section__inner">
    <div class="eyebrow" data-reveal>
      <span class="eyebrow__num">03</span>
      <span class="eyebrow__rule" aria-hidden="true"></span>
      <span class="eyebrow__label">Applied &amp; Physical AI</span>
    </div>
    <h2 class="section__title section__title--ai" data-reveal>AI can only act on ground it understands. <span class="accent">We build the ground.</span></h2>

    <div class="ai-grid">
      <div class="stack" data-reveal>
        <div class="stack__card stack__card--primary">
          <h3 class="stack__title">Applied AI — human in command</h3>
          <p class="stack__sub">AI does the heavy lifting; your engineers stay in command.</p>
        </div>
        <div class="stack__connector" aria-hidden="true">↑&nbsp;&nbsp;stands on&nbsp;&nbsp;↑</div>
        <div class="stack__card">
          <h3 class="stack__title">Semantic &amp; knowledge layer</h3>
          <p class="stack__sub">The meaning and context of your project.</p>
        </div>
        <div class="stack__card">
          <h3 class="stack__title">Operational relationships</h3>
          <p class="stack__sub">How work sequences, depends and constrains.</p>
        </div>
        <div class="stack__card">
          <h3 class="stack__title">Physics &amp; Operational Sciences</h3>
          <p class="stack__sub">How things really behave on the ground.</p>
        </div>
      </div>

      <div class="ai-prose" data-reveal>
        <p class="ai-prose__hi">Everyone is racing to put AI to work. But an agent is only as good as what it understands — and in construction, that understanding never existed.</p>
        <p>DiPGOS builds the layers AI must stand on: the meaning, the relationships, the operational sciences and the physics of the work. Give AI that ground, and it can finally reason and act on real projects.</p>
        <p class="ai-prose__close">Electricity. The internet. AI. The value was never in the raw technology — it was in the <span class="accent">application layer</span> built on top. We are that applied layer for engineering &amp; construction.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Insert the Company section**

```html
<section class="section section--company" id="company">
  <div class="section__inner company">
    <div class="company__label" data-reveal>
      <div class="eyebrow">
        <span class="eyebrow__num">04</span>
        <span class="eyebrow__rule" aria-hidden="true"></span>
        <span class="eyebrow__label">The Company</span>
      </div>
    </div>
    <div class="company__body">
      <h2 class="section__title section__title--company" data-reveal>We lived the problem before we built the answer.</h2>
      <p class="company__prose" data-reveal>Indus is built by engineers and builders who spent their careers inside real projects — feeling the gridlock first-hand.&nbsp;We’re not software people guessing at the industry. We’re industry people building the system we always needed.</p>
      <div class="company__meta" data-reveal>
        <div class="meta">
          <div class="meta__label">Founded by</div>
          <div class="meta__name">M. Kamran Basit</div>
          <div class="meta__role">Founder &amp; CEO</div>
        </div>
        <div class="meta">
          <div class="meta__label">Entities</div>
          <div class="meta__role">Indus Technology Solutions (Pvt) Ltd<br>Indus Technologies LLC · USA</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

The prose contains the one approved copy correction: `system we always needed` (the prototype reads `systemwe`).

- [ ] **Step 3: Insert the contact section and footer, then close `<main>`**

```html
<section class="section contact" id="contact">
  <img class="section__bg" src="assets/constellation-dark.svg" alt="" aria-hidden="true">
  <div class="contact__orb" aria-hidden="true"></div>

  <div class="contact__inner">
    <div class="contact__eyebrow" data-reveal>
      <span class="eyebrow__rule" aria-hidden="true"></span>
      <span class="eyebrow__label eyebrow__label--amber">Let’s Build</span>
      <span class="eyebrow__rule" aria-hidden="true"></span>
    </div>
    <h2 class="contact__title" data-reveal>Let’s shape the future of how the world <span class="accent">gets built</span>.</h2>
    <div class="contact__actions" data-reveal>
      <a class="contact__cta" href="#contact" data-u="kamran" data-d="industechsol.com">Contact Us</a>
    </div>
  </div>

  <footer class="footer">
    <div class="footer__brand">
      <span class="wordmark wordmark--footer"><span class="wordmark__i">ı<span class="wordmark__dot" aria-hidden="true"></span></span>ndus</span>
      <p class="footer__tagline">Shaping the Future of Engineering &amp; Construction</p>
    </div>

    <div class="footer__col">
      <div class="footer__label">Explore</div>
      <nav class="footer__links" aria-label="Footer">
        <a class="footer__link" href="#conviction">Our conviction</a>
        <a class="footer__link" href="#dipgos">DiPGOS</a>
        <a class="footer__link" href="#ai">Applied &amp; Physical AI</a>
        <a class="footer__link" href="#company">Company</a>
      </nav>
    </div>

    <div class="footer__col">
      <div class="footer__label">Contact</div>
      <div class="footer__links">
        <a class="footer__link" href="#contact" data-u="kamran" data-d="industechsol.com">Get in touch</a>
        <span class="footer__note">Indus Technology Solutions (Pvt) Ltd</span>
        <span class="footer__note">Indus Technologies LLC · USA</span>
      </div>
    </div>

    <div class="footer__bottom">
      <span class="footer__copy">© <span id="year">2026</span> Indus Technology Solutions. All rights reserved.</span>
      <span class="footer__motto">The project thinks; the human commands.</span>
    </div>
  </footer>
</section>

</main>
```

Both `data-u`/`data-d` anchors point at `#contact` until `main.js` rewrites `href`. With JS off they are harmless self-links, never dead ones.

- [ ] **Step 4: Run the structure tests**

Run: `node --test tests/structure.test.mjs`
Expected: PASS, 7/7 — critically `index.html leaks no email address`, which now has two `data-u`/`data-d` pairs to not-find.

- [ ] **Step 5: Add and run a heading-order test**

Append to `tests/structure.test.mjs`:

```js
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
```

Run: `node --test tests/structure.test.mjs`
Expected: PASS, 9/9.

- [ ] **Step 6: Commit**

```bash
git add index.html tests/structure.test.mjs
git commit -m "feat: add AI, Company, contact and footer markup

Completes the page. Footer gains the Contact column that fills the
design's empty grid cell. Contact addresses use data-u/data-d and are
assembled at runtime, so no email appears in the served HTML.
Fixes the design's 'systemwe' typo."
```

---

### Task 5: CSS tokens, reset, keyframes, nav and hero

**Files:**
- Modify: `styles.css` (full rewrite)
- Create: `tests/browser.test.mjs`

**Interfaces:**
- Consumes: every class name from Tasks 2–4.
- Produces: the `:root` token block that Tasks 6–8 reference exclusively; `startServer` usage pattern for later browser tests.

- [ ] **Step 1: Write the failing browser test**

Create `tests/browser.test.mjs`:

```js
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
    return { w: parseFloat(s.outlineWidth), style: s.outlineStyle, tag: document.activeElement.tagName };
  });
  assert.notEqual(ring.tag, 'BODY', 'Tab should move focus off body');
  assert.ok(ring.w > 0, `expected a focus ring, got outline-width ${ring.w}`);
  assert.notEqual(ring.style, 'none');
  await p.context().close();
});
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `node --test tests/browser.test.mjs`
Expected: FAIL — `styles.css` is still the old stylesheet, so tokens are empty strings and `.hero` does not exist.

- [ ] **Step 3: Write the token block, reset, keyframes and base type**

Replace `styles.css` entirely, starting with:

```css
/* ============================================================
   Indus — DiPGOS site
   Tokens → reset → keyframes → base → components → responsive
   Every value is copied from the design prototype.
   ============================================================ */

:root {
  /* surfaces */
  --ink: #0A1424;
  --navy: #0B182C;
  --slate: #12233F;
  --ink-deep: #070F1C;

  /* accent */
  --amber: #E8A020;
  --amber-hi: #FFC24D;
  --amber-soft: #E8C98A;
  --on-amber: #3a2c0c;

  /* text */
  --bone: #FBF9F4;
  --text-hi: #dbe3ec;
  --text-mid: #c1cdda;
  --steel: #9DB0C4;
  --dim: #6b7d92;

  /* rules — used at .12 / .14 / .16 / .18 / .22 / .28 alpha */
  --rule-rgb: 157, 176, 196;

  /* type */
  --serif: 'Gelasio', serif;
  --sans: Arial, Helvetica, sans-serif;

  /* layout */
  --max: 1280px;
  --nav-h: 72px;          /* the design's scroll-margin-top, NOT the measured
                             nav height (~60px). Keep the two decoupled. */
  --gutter: clamp(24px, 6vw, 72px);
  --pad-y: clamp(96px, 13vw, 180px);
}

*, *::before, *::after { box-sizing: border-box; }

html, body { margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--ink);
  color: var(--bone);
  font-family: var(--sans);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

section { scroll-margin-top: var(--nav-h); }

a { text-decoration: none; color: var(--amber); }
a:hover { color: var(--amber-hi); }

:focus-visible {
  outline: 2px solid var(--amber);
  outline-offset: 3px;
  border-radius: 2px;
}

::selection { background: rgba(232, 160, 32, .24); }

img { max-width: 100%; }

h1, h2, h3, h4 { margin: 0; font-weight: 600; }
p { margin: 0; }

/* --- keyframes ------------------------------------------------ */
@keyframes floatY   { 0%, 100% { transform: translateY(0); }        50% { transform: translateY(-12px); } }
@keyframes corepulse{ 0%, 100% { opacity: .5; }                     50% { opacity: 1; } }
@keyframes drift    { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(40px, -30px) scale(1.08); } }
@keyframes underline{ to { transform: scaleX(1); } }
@keyframes bob      { 0%, 100% { transform: translateY(0); opacity: .55; } 50% { transform: translateY(7px); opacity: 1; } }
@keyframes loopglow { 0%, 100% { opacity: .14; transform: scaleX(.35); } 50% { opacity: 1; transform: scaleX(1); } }

/* --- shared inline accents ------------------------------------ */
.accent  { color: var(--amber); }
.hi      { color: var(--bone); }
.hi-soft { color: var(--text-mid); }
b        { color: var(--bone); font-weight: 700; }
```

- [ ] **Step 4: Append the wordmark, nav and hero component rules**

```css
/* --- wordmark -------------------------------------------------- */
.wordmark {
  font: 600 26px/1 var(--serif);
  color: var(--bone);
  letter-spacing: -.2px;
}
.wordmark--footer { font-size: 32px; }
.wordmark__i { position: relative; }
.wordmark__dot {
  position: absolute;
  left: 50%;
  top: .05em;
  transform: translateX(-50%);
  width: .30em;
  height: .30em;
  background: url(assets/i-dot.svg) center / contain no-repeat;
}
.wordmark__i--lg .wordmark__dot { top: .07em; }

/* --- nav ------------------------------------------------------- */
.nav {
  position: sticky;
  top: 0;
  z-index: 60;
  background: rgba(10, 20, 36, .72);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(var(--rule-rgb), .12);
}
.nav__inner {
  max-width: var(--max);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px clamp(20px, 5vw, 48px);
}
.nav__brand { display: flex; align-items: baseline; gap: 10px; }
.nav__links {
  display: flex;
  align-items: center;
  gap: clamp(18px, 2.6vw, 40px);
}
.nav__link {
  font: 400 14.5px/1 var(--sans);
  letter-spacing: .2px;
  color: var(--steel);
  white-space: nowrap;
}
.nav__link:hover { color: var(--bone); }
.nav__cta {
  border: 1px solid rgba(232, 160, 32, .55);
  color: var(--amber-soft);
  font: 700 13px/1 var(--sans);
  padding: 11px 20px;
  border-radius: 999px;
  white-space: nowrap;
  margin-left: clamp(4px, 1vw, 16px);
}
.nav__cta:hover { background: var(--amber); color: var(--ink); }

/* toggle is hidden until the 860px nav breakpoint (Task 8) */
.nav__toggle {
  display: none;
  order: 3;
  background: none;
  border: 0;
  padding: 10px;
  cursor: pointer;
}
.nav__bar {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--bone);
  border-radius: 2px;
  transition: transform .25s ease, opacity .25s ease;
}
.nav__bar + .nav__bar { margin-top: 5px; }

/* --- hero ------------------------------------------------------ */
.hero {
  position: relative;
  overflow: hidden;
  background: var(--ink);
  min-height: calc(100vh - 60px);
  display: flex;
}
.hero__bg, .section__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
.hero__bg { opacity: .42; }
.hero__mark {
  position: absolute;
  right: -9%;
  top: 47%;
  transform: translateY(-50%);
  width: min(720px, 56vw);
  height: auto;
  opacity: .11;
  animation: floatY 9s ease-in-out infinite;
  pointer-events: none;
}
.hero__orb {
  position: absolute;
  left: 6%;
  top: 24%;
  width: min(560px, 52%);
  height: 460px;
  background: radial-gradient(circle, rgba(232, 160, 32, .12), transparent 66%);
  animation: drift 22s ease-in-out infinite;
  pointer-events: none;
}
.hero__inner {
  position: relative;
  max-width: var(--max);
  width: 100%;
  margin: auto;
  /* Bottom padding clears the absolutely-positioned strip.
     The prototype omits this and the headline collides with it
     on short viewports. Approved deviation #6. */
  padding: clamp(70px, 10vw, 110px) clamp(24px, 6vw, 48px) clamp(140px, 12vw, 176px);
}
.hero__title {
  max-width: 1180px;
  font: 600 clamp(46px, 9vw, 128px)/0.98 var(--serif);
  color: var(--bone);
  letter-spacing: -2.5px;
  text-wrap: balance;
}
.hero__lead {
  margin-top: clamp(30px, 4vw, 44px);
  max-width: 660px;
  font: 400 clamp(17px, 2vw, 22px)/1.58 var(--sans);
  color: var(--text-mid);
  text-wrap: pretty;
}
.hero__strip {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid rgba(var(--rule-rgb), .14);
}
.hero__strip-inner {
  max-width: var(--max);
  margin: 0 auto;
  padding: 16px clamp(24px, 6vw, 48px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.hero__tagline {
  font: 400 12.5px/1 var(--sans);
  letter-spacing: .4px;
  color: var(--dim);
}
.hero__scroll {
  display: flex;
  align-items: center;
  gap: 9px;
  font: 700 11px/1 var(--sans);
  letter-spacing: 2.4px;
  color: var(--steel);
  text-transform: uppercase;
}
.hero__scroll:hover { color: var(--amber); }
.hero__arrow { display: inline-block; animation: bob 2.2s ease-in-out infinite; }
```

- [ ] **Step 5: Run the browser test to verify it passes**

Run: `node --test tests/browser.test.mjs`
Expected: PASS, 5/5.

- [ ] **Step 6: Commit**

```bash
git add styles.css tests/browser.test.mjs
git commit -m "feat: add CSS tokens, reset, keyframes, nav and hero

Lifts the prototype's inline styles into :root custom properties and
component classes. Adds focus-visible rings the design omits, and
reserves hero bottom padding so the headline clears the bottom strip
on short viewports."
```

---

### Task 6: CSS for sections 01 Conviction and 02 DiPGOS

**Files:**
- Modify: `styles.css` (append)
- Modify: `tests/browser.test.mjs` (append tests)

**Interfaces:**
- Consumes: tokens and keyframes from Task 5; class names from Task 3.
- Produces: `.section`, `.section__inner`, `.eyebrow`, `.split`, `.loop`, `.fn-grid`, `.foundation`, `.frame`, `.trio` rules that Task 8 overrides at breakpoints.

- [ ] **Step 1: Write the failing tests**

Append to `tests/browser.test.mjs`:

```js
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
```

- [ ] **Step 2: Run to verify failure**

Run: `node --test tests/browser.test.mjs`
Expected: FAIL — the new subtests error because `.loop`, `.fn-grid`, `.split`, and `.foundation` have no rules yet.

- [ ] **Step 3: Append the section scaffolding and Conviction rules**

```css
/* --- section scaffolding --------------------------------------- */
.section {
  position: relative;
  overflow: hidden;
  padding: var(--pad-y) var(--gutter);
}
.section__inner { position: relative; max-width: var(--max); margin: 0 auto; }
.section--conviction { background: var(--navy); padding-block: clamp(100px, 15vw, 200px); }
.section--dipgos { background: var(--ink); }
.section--dipgos > .section__bg { opacity: .34; }

.section__title {
  max-width: 1120px;
  font: 600 clamp(34px, 5.4vw, 68px)/1.05 var(--serif);
  color: var(--bone);
  letter-spacing: -1.4px;
  text-wrap: balance;
}
.section__title--xl {
  max-width: 1180px;
  font-size: clamp(38px, 7.2vw, 92px);
  line-height: 1.03;
  letter-spacing: -1.6px;
}

.ghost {
  position: absolute;
  left: clamp(-30px, -2vw, -14px);
  top: clamp(56px, 8vw, 110px);
  font: 600 clamp(150px, 26vw, 420px)/0.8 var(--serif);
  color: rgba(232, 160, 32, .05);
  letter-spacing: -8px;
  pointer-events: none;
  user-select: none;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: clamp(30px, 4vw, 44px);
}
.section--conviction .eyebrow { margin-bottom: clamp(34px, 4.5vw, 54px); }
.eyebrow__num   { font: 700 13px/1 var(--sans); letter-spacing: 2px; color: var(--amber); }
.eyebrow__rule  { width: 26px; height: 1px; background: rgba(232, 160, 32, .5); flex: 0 0 auto; }
.eyebrow__label { font: 700 13px/1 var(--sans); letter-spacing: 3px; color: var(--steel); text-transform: uppercase; }
.eyebrow__label--amber { color: var(--amber); letter-spacing: 3.4px; }

.underline { position: relative; white-space: nowrap; color: var(--amber); }
.underline::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -6px;
  height: 4px;
  background: var(--amber);
  border-radius: 4px;
  transform: scaleX(0);
  transform-origin: left center;
  animation: underline 1s cubic-bezier(.22, .61, .36, 1) .4s 1 forwards;
}

.split {
  margin-top: clamp(50px, 7vw, 90px);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(28px, 5vw, 72px);
  align-items: start;
}
.split__col {
  min-width: 0;
  border-top: 1px solid rgba(var(--rule-rgb), .28);
  padding-top: clamp(22px, 2.4vw, 30px);
}
.split__col p { font: 400 clamp(17px, 1.9vw, 21px)/1.62 var(--sans); }
.split__col--a { grid-column: 1 / span 6; }
.split__col--a p { color: var(--text-hi); }
.split__col--b { grid-column: 8 / span 5; }
.split__col--b p { color: var(--steel); }

.statement { margin-top: clamp(50px, 6vw, 84px); }
.statement__bar {
  display: block;
  width: 60px;
  height: 3px;
  background: var(--amber);
  border-radius: 3px;
  margin-bottom: clamp(22px, 2.6vw, 32px);
}
.statement p {
  max-width: 1120px;
  font: 500 clamp(23px, 3.1vw, 40px)/1.3 var(--serif);
  color: var(--bone);
  text-wrap: balance;
}
.statement p b { font-weight: 600; }
```

- [ ] **Step 4: Append the DiPGOS lockup, loop, and function-card rules**

```css
/* --- DiPGOS lockup --------------------------------------------- */
.lockup {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 22px;
}
.lockup__mark {
  width: clamp(40px, 4.6vw, 58px);
  height: auto;
  animation: corepulse 4s ease-in-out infinite;
}
.lockup__word {
  font: 700 clamp(30px, 4vw, 50px)/1 var(--serif);
  color: var(--amber-soft);
  letter-spacing: -.8px;
}
.lockup__tag {
  font: 700 11px/1.5 var(--sans);
  letter-spacing: 2.4px;
  color: var(--dim);
  text-transform: uppercase;
  border-left: 1px solid rgba(var(--rule-rgb), .28);
  padding-left: 14px;
}

.lead {
  margin-top: clamp(24px, 3vw, 34px);
  max-width: 840px;
  font: 400 clamp(17px, 1.9vw, 21px)/1.6 var(--sans);
  color: var(--text-mid);
  text-wrap: pretty;
}

.block { margin-top: clamp(72px, 9vw, 124px); }
.block:first-of-type { margin-top: clamp(58px, 7.5vw, 96px); }
.block__title {
  max-width: 900px;
  font: 600 clamp(26px, 3.6vw, 44px)/1.08 var(--serif);
  color: var(--bone);
  letter-spacing: -.8px;
  text-wrap: balance;
}

.sublabel {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  font: 700 12px/1 var(--sans);
  letter-spacing: 2.6px;
  color: var(--amber);
  text-transform: uppercase;
}
.sublabel__rule { width: 20px; height: 1px; background: rgba(232, 160, 32, .65); flex: 0 0 auto; }

.prose {
  max-width: 820px;
  margin-top: 16px;
  font: 400 clamp(15px, 1.7vw, 18px)/1.58 var(--sans);
  color: var(--steel);
}
.block > .sublabel + .prose { margin-top: 0; margin-bottom: clamp(26px, 3vw, 38px); max-width: 760px; line-height: 1.55; }

/* --- living loop ------------------------------------------------ */
.loop { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
.loop-card {
  position: relative;
  background: var(--navy);
  border: 1px solid rgba(var(--rule-rgb), .18);
  border-radius: 16px;
  padding: 26px 22px 30px;
  min-width: 0;
}
.loop-card__num   { font: 700 24px/1 var(--serif); color: var(--amber); margin-bottom: 14px; }
.loop-card__title { font: 700 clamp(18px, 1.9vw, 21px)/1.15 var(--serif); color: var(--bone); margin-bottom: 8px; }
.loop-card__body  { font: 400 13.5px/1.5 var(--sans); color: var(--steel); }
.loop-card__bar {
  position: absolute;
  left: 22px; right: 22px; bottom: 0;
  height: 3px;
  background: var(--amber);
  border-radius: 3px;
  transform-origin: left;
  animation: loopglow 3.2s ease-in-out infinite;
}
.loop-card:nth-child(1) .loop-card__bar { animation-delay: 0s; }
.loop-card:nth-child(2) .loop-card__bar { animation-delay: .5s; }
.loop-card:nth-child(3) .loop-card__bar { animation-delay: 1s; }
.loop-card:nth-child(4) .loop-card__bar { animation-delay: 1.5s; }

.loop-card--act { background: var(--amber); border: 0; }
.loop-card--act .loop-card__num,
.loop-card--act .loop-card__title { color: var(--ink); }
.loop-card--act .loop-card__body  { color: var(--on-amber); font-weight: 500; }

/* --- function cards --------------------------------------------- */
.kicker {
  margin-top: clamp(34px, 4vw, 50px);
  margin-bottom: 14px;
  font: 700 11px/1 var(--sans);
  letter-spacing: 2px;
  color: var(--dim);
  text-transform: uppercase;
}
.fn-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.fn-card {
  background: var(--navy);
  border: 1px solid rgba(var(--rule-rgb), .18);
  border-radius: 14px;
  padding: 22px;
  min-width: 0;
}
.fn-card__head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.fn-card__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--amber); flex: 0 0 auto; }
.fn-card__title { font: 700 18px/1.15 var(--serif); color: var(--bone); }
.fn-card p { margin-left: 17px; font: 400 14px/1.5 var(--sans); color: var(--steel); }

.arrow-label {
  text-align: center;
  font: 700 11px/1 var(--sans);
  letter-spacing: 2.4px;
  color: var(--dim);
  text-transform: uppercase;
  padding: clamp(16px, 2vw, 22px) 0;
}
```

Note `.loop-card__num` uses `font-weight:700`, not the prototype's `800`. Gelasio has no 800 — the prototype renders 700 too. Declaring 700 states the truth rather than relying on font fallback.

- [ ] **Step 5: Append the foundation panel and command-center rules**

```css
/* --- foundation panel -------------------------------------------- */
.foundation {
  position: relative;
  overflow: hidden;
  background: var(--slate);
  border: 1px solid rgba(232, 160, 32, .3);
  border-top: 3px solid var(--amber);
  border-radius: 16px;
  padding: clamp(26px, 3vw, 36px) clamp(24px, 3vw, 40px);
}
.foundation > .section__bg { opacity: .3; }
.foundation__inner {
  position: relative;
  display: flex;
  gap: clamp(22px, 4vw, 48px);
  align-items: center;
  flex-wrap: wrap;
}
.foundation__lead { flex: 1 1 260px; min-width: 0; }
.foundation__label {
  font: 700 10px/1 var(--sans);
  letter-spacing: 2px;
  color: var(--amber);
  text-transform: uppercase;
  margin-bottom: 9px;
}
.foundation__title {
  font: 700 clamp(24px, 3vw, 34px)/1.06 var(--serif);
  color: var(--bone);
  letter-spacing: -.5px;
}
.foundation__lead p {
  margin-top: 12px;
  max-width: 420px;
  font: 400 14.5px/1.55 var(--sans);
  color: var(--steel);
}
.foundation__chips { flex: 1 1 300px; min-width: 0; display: flex; gap: 12px; flex-wrap: wrap; }
.chip {
  flex: 1 1 120px;
  background: rgba(255, 255, 255, .06);
  border-radius: 11px;
  padding: 16px 18px;
  font: 700 16px/1.1 var(--serif);
  color: var(--bone);
}

.statement__close {
  margin-top: clamp(24px, 3vw, 32px);
  max-width: 820px;
  font: 500 clamp(17px, 2vw, 22px)/1.42 var(--serif);
  color: var(--bone);
}

/* --- command center ---------------------------------------------- */
.frame {
  margin-top: clamp(32px, 4vw, 48px);
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(var(--rule-rgb), .22);
  box-shadow: 0 50px 110px -46px rgba(0, 0, 0, .85);
}
.frame img { width: 100%; height: auto; display: block; }

.trio {
  margin-top: clamp(28px, 3.5vw, 40px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(20px, 3vw, 40px);
}
.trio__col {
  min-width: 0;
  border-top: 1px solid rgba(232, 160, 32, .4);
  padding-top: 18px;
}
.trio__label {
  font: 700 12px/1 var(--sans);
  letter-spacing: 1.6px;
  color: var(--amber);
  text-transform: uppercase;
  margin-bottom: 11px;
}
.trio__col p { font: 400 15px/1.55 var(--sans); color: var(--steel); }
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `node --test tests/browser.test.mjs`
Expected: PASS, 10/10.

- [ ] **Step 7: Commit**

```bash
git add styles.css tests/browser.test.mjs
git commit -m "feat: style Conviction and DiPGOS sections

Living loop, function cards, foundation panel and command-center
frame. Loop glow stagger moves to nth-child. Loop numerals declare
weight 700, which is what Gelasio actually renders for the
prototype's 800."
```

---

### Task 7: CSS for sections 03 AI, 04 Company, contact and footer

**Files:**
- Modify: `styles.css` (append)
- Modify: `tests/browser.test.mjs` (append tests)

**Interfaces:**
- Consumes: tokens from Task 5, `.section`/`.eyebrow` from Task 6, class names from Task 4.
- Produces: `.ai-grid`, `.company`, `.contact`, `.footer` rules that Task 8 overrides at breakpoints.

- [ ] **Step 1: Write the failing tests**

Append to `tests/browser.test.mjs`:

```js
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
```

- [ ] **Step 2: Run to verify failure**

Run: `node --test tests/browser.test.mjs`
Expected: FAIL on the four new subtests.

- [ ] **Step 3: Append the AI and Company rules**

```css
/* --- 03 Applied & Physical AI ------------------------------------ */
.section--ai { background: var(--navy); }
.section__title--ai {
  margin-bottom: clamp(44px, 6vw, 68px);
  font-size: clamp(32px, 5.4vw, 64px);
  line-height: 1.06;
  letter-spacing: -1.2px;
}
.ai-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(28px, 4vw, 60px);
  align-items: center;
}
.stack { grid-column: 1 / span 6; min-width: 0; display: flex; flex-direction: column; gap: 12px; }
.stack__card {
  background: rgba(255, 255, 255, .05);
  border: 1px solid rgba(var(--rule-rgb), .22);
  border-radius: 14px;
  padding: 19px 26px;
}
.stack__card .stack__title { font: 700 19px/1.1 var(--serif); color: var(--bone); }
.stack__card .stack__sub   { margin-top: 3px; font: 400 14px/1.4 var(--sans); color: var(--steel); }
.stack__card--primary {
  background: var(--amber);
  border: 0;
  padding: 22px 26px;
}
.stack__card--primary .stack__title { font-size: clamp(19px, 2.2vw, 24px); color: var(--slate); }
.stack__card--primary .stack__sub   { margin-top: 5px; font-size: 15px; color: var(--on-amber); }
.stack__connector {
  text-align: center;
  color: var(--amber);
  font: 700 13px/1 var(--sans);
  letter-spacing: .5px;
}
.ai-prose { grid-column: 8 / span 5; min-width: 0; }
.ai-prose p { font: 400 clamp(16px, 1.9vw, 20px)/1.6 var(--sans); color: var(--steel); }
.ai-prose p + p { margin-top: 22px; }
/* Two-class selectors (0,2,0) outrank `.ai-prose p` (0,1,1) and
   `.ai-prose p + p` (0,1,2) on specificity alone — no !important. */
.ai-prose .ai-prose__hi { color: var(--text-hi); }
.ai-prose .ai-prose__close {
  margin-top: 26px;
  font: 600 clamp(18px, 2.3vw, 25px)/1.38 var(--serif);
  color: var(--bone);
}

/* --- 04 Company --------------------------------------------------- */
.section--company { background: var(--slate); padding-block: clamp(96px, 13vw, 170px); }
.company {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(24px, 4vw, 64px);
  align-items: start;
}
.company__label { grid-column: 1 / span 4; min-width: 0; }
.company__label .eyebrow { margin-bottom: 0; }
.company__body  { grid-column: 5 / span 8; min-width: 0; }
.section__title--company {
  font-size: clamp(30px, 4.6vw, 56px);
  line-height: 1.08;
  letter-spacing: -1px;
}
.company__prose {
  margin-top: clamp(24px, 3vw, 34px);
  max-width: 760px;
  font: 400 clamp(16.5px, 1.9vw, 20px)/1.62 var(--sans);
  color: var(--steel);
  text-wrap: pretty;
}
.company__meta {
  margin-top: clamp(30px, 4vw, 44px);
  display: flex;
  gap: clamp(28px, 4vw, 56px);
  flex-wrap: wrap;
}
.meta__label {
  font: 700 11px/1 var(--sans);
  letter-spacing: 2px;
  color: var(--dim);
  text-transform: uppercase;
  margin-bottom: 9px;
}
.meta__name { font: 500 clamp(17px, 1.9vw, 20px)/1.3 var(--serif); color: var(--bone); }
.meta__role { font: 400 14px/1.4 var(--sans); color: var(--steel); }
.company__meta .meta:last-child .meta__role { font-size: 15px; line-height: 1.6; }
```

`.ai-prose__hi` and `.ai-prose__close` are written as two-class selectors so specificity alone carries the override. Do not reach for `!important` here.

- [ ] **Step 4: Append the contact and footer rules**

```css
/* --- close / contact ---------------------------------------------- */
.contact {
  background: linear-gradient(180deg, var(--ink) 0%, var(--ink-deep) 100%);
  padding: clamp(100px, 14vw, 180px) var(--gutter) 0;
  border-top: 1px solid rgba(var(--rule-rgb), .1);
}
.contact > .section__bg { opacity: .5; }
.contact__orb {
  position: absolute;
  left: 50%;
  top: 32%;
  transform: translate(-50%, -50%);
  width: min(720px, 90%);
  height: 440px;
  background: radial-gradient(circle, rgba(232, 160, 32, .13), transparent 66%);
  pointer-events: none;
}
.contact__inner { position: relative; max-width: 1080px; margin: 0 auto; text-align: center; }
.contact__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.contact__title {
  font: 600 clamp(36px, 6.4vw, 78px)/1.04 var(--serif);
  color: var(--bone);
  letter-spacing: -1.6px;
  text-wrap: balance;
}
.contact__actions {
  margin-top: clamp(30px, 4vw, 40px);
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.contact__cta {
  background: var(--amber);
  color: var(--ink);
  font: 800 15px/1 var(--sans);
  padding: 17px 30px;
  border-radius: 999px;
}
.contact__cta:hover { background: var(--amber-hi); color: var(--ink); }

/* --- footer -------------------------------------------------------- */
.footer {
  position: relative;
  max-width: var(--max);
  margin: clamp(66px, 9vw, 110px) auto 0;
  padding: clamp(40px, 5vw, 58px) 0 34px;
  border-top: 1px solid rgba(var(--rule-rgb), .16);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(24px, 3vw, 40px);
  text-align: left;
}
.footer__brand { grid-column: 1 / span 5; min-width: 0; }
.footer__tagline {
  margin-top: 15px;
  max-width: 340px;
  font: 400 14px/1.65 var(--sans);
  color: var(--steel);
}
.footer__col:nth-of-type(1) { grid-column: 7 / span 3; }
.footer__col:nth-of-type(2) { grid-column: 10 / span 3; }
.footer__col { min-width: 0; }
.footer__label {
  font: 700 11px/1 var(--sans);
  letter-spacing: 2px;
  color: var(--dim);
  text-transform: uppercase;
  margin-bottom: 16px;
}
.footer__links { display: flex; flex-direction: column; gap: 11px; }
.footer__link { font: 400 14.5px/1 var(--sans); color: var(--steel); }
.footer__link:hover { color: var(--bone); }
.footer__note { font: 400 13px/1.5 var(--sans); color: var(--dim); }
.footer__bottom {
  grid-column: 1 / -1;
  margin-top: clamp(20px, 3vw, 34px);
  padding-top: 22px;
  border-top: 1px solid rgba(var(--rule-rgb), .12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.footer__copy  { font: 400 12.5px/1 var(--sans); color: var(--dim); }
.footer__motto { font: italic 400 13px/1 var(--serif); color: var(--dim); }
```

`.footer__col:nth-of-type` targets the Explore and Contact columns by document order, so the Contact column lands in the design's empty `grid-column:10/span 3` cell.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `node --test tests/browser.test.mjs`
Expected: PASS, 14/14.

- [ ] **Step 6: Commit**

```bash
git add styles.css tests/browser.test.mjs
git commit -m "feat: style AI, Company, contact and footer

Footer Contact column occupies the grid-column:10 cell the design
left empty."
```

---

### Task 8: Responsive tiers

**Files:**
- Modify: `styles.css` (append the media-query block)
- Modify: `tests/browser.test.mjs` (append tests)

**Interfaces:**
- Consumes: every component rule from Tasks 5–7.
- Produces: the `.nav--open` class contract consumed by Task 10.

- [ ] **Step 1: Write the failing responsive tests**

Append to `tests/browser.test.mjs`:

```js
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
```

- [ ] **Step 2: Run to verify failure**

Run: `node --test tests/browser.test.mjs`
Expected: FAIL — grids stay 5-across at 390px and the toggle never appears.

- [ ] **Step 3: Append the nav breakpoint**

```css
/* ============================================================
   Responsive
   Nav flips at 860px — deliberately not a tier boundary.
   ============================================================ */

@media (max-width: 859.98px) {
  .nav__toggle { display: block; }
  .nav__inner { justify-content: space-between; }

  .nav__links {
    /* absolute, NOT fixed: the panel must hang below the nav bar.
       On a fixed element `top:100%` resolves against the viewport and
       would drop the panel off the bottom of the screen. `.nav` is
       position:sticky, so it is the containing block for this. */
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 8px clamp(20px, 5vw, 48px) 28px;
    background: rgba(10, 20, 36, .96);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(var(--rule-rgb), .12);
    transform: translateY(-8px);
    opacity: 0;
    visibility: hidden;
    transition: opacity .22s ease, transform .22s ease, visibility .22s;
  }
  .nav--open .nav__links {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .nav__link {
    padding: 16px 0;
    font-size: 17px;
    border-bottom: 1px solid rgba(var(--rule-rgb), .1);
  }
  .nav__cta { margin: 20px 0 0; text-align: center; padding: 15px 20px; font-size: 14px; }

  .nav--open .nav__bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav--open .nav__bar:nth-child(2) { opacity: 0; }
  .nav--open .nav__bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  body.nav-locked { overflow: hidden; }
}
```

- [ ] **Step 4: Append the tablet tier**

```css
/* --- tablet: 700–1099px ------------------------------------------- */
@media (max-width: 1099.98px) {
  .loop    { grid-template-columns: repeat(3, 1fr); }
  .fn-grid { grid-template-columns: repeat(2, 1fr); }
  .trio    { grid-template-columns: repeat(2, 1fr); }

  .split, .ai-grid, .company { grid-template-columns: 1fr; }
  .split__col--a, .split__col--b,
  .stack, .ai-prose,
  .company__label, .company__body { grid-column: 1 / -1; }

  .footer { grid-template-columns: repeat(6, 1fr); }
  .footer__brand { grid-column: 1 / -1; }
  .footer__col:nth-of-type(1) { grid-column: 1 / span 3; }
  .footer__col:nth-of-type(2) { grid-column: 4 / span 3; }

  .hero__title { letter-spacing: -1.4px; }
  .contact__title { letter-spacing: -1px; }
}
```

- [ ] **Step 5: Append the mobile tier**

```css
/* --- mobile: <700px ------------------------------------------------ */
@media (max-width: 699.98px) {
  .loop, .fn-grid, .trio { grid-template-columns: 1fr; }

  .footer { grid-template-columns: 1fr; }
  .footer__col:nth-of-type(1),
  .footer__col:nth-of-type(2) { grid-column: 1 / -1; }
  .footer__bottom { justify-content: flex-start; }

  .hero__inner { padding-bottom: clamp(150px, 34vw, 190px); }
  .hero__title { letter-spacing: -1px; }
  .hero__mark  { right: -22%; width: 92vw; }
  .contact__title { letter-spacing: -.6px; }

  .lockup__tag { border-left: 0; padding-left: 0; }
  .foundation__chips { flex-direction: column; }
  .chip { flex: 1 1 auto; }
  .company__meta { gap: 28px; }
}

/* --- short viewports: keep the hero from crushing ------------------- */
@media (max-height: 620px) {
  .hero { min-height: auto; }
  .hero__inner { padding-top: clamp(56px, 9vw, 90px); }
}
```

- [ ] **Step 6: Append the reduced-motion block**

```css
/* ============================================================
   Reduced motion — the design tool's reduceMotion prop, done right
   ============================================================ */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
  }
  .underline::after { transform: scaleX(1); }
  .loop-card__bar   { opacity: 1; transform: scaleX(1); }
  .js [data-reveal] { opacity: 1 !important; transform: none !important; }
}
```

- [ ] **Step 7: Run the tests to verify they pass**

Run: `node --test tests/browser.test.mjs`
Expected: PASS, 18/18.

- [ ] **Step 8: Commit**

```bash
git add styles.css tests/browser.test.mjs
git commit -m "feat: add responsive tiers and reduced-motion support

Three tiers plus an 860px nav breakpoint and a short-viewport guard.
Verified for zero horizontal overflow at 390/768/1024/1280/1920."
```

---

### Task 9: Scroll reveal

**Files:**
- Modify: `main.js` (full rewrite — this task writes the reveal module only)
- Modify: `styles.css` (append the reveal base rules)
- Modify: `tests/browser.test.mjs` (append tests)

**Interfaces:**
- Consumes: `[data-reveal]` from Tasks 2–4; the `.js` root class from Task 2.
- Produces: nothing consumed by later tasks — Task 10 appends independent modules to the same IIFE.

- [ ] **Step 1: Write the failing tests**

Append to `tests/browser.test.mjs`:

```js
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
  await p.$eval(sel, (el) => el.scrollIntoView());
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
```

- [ ] **Step 2: Run to verify failure**

Run: `node --test tests/browser.test.mjs`
Expected: FAIL on `below-the-fold reveals start hidden` — nothing hides them yet.

- [ ] **Step 3: Append the reveal base rules to styles.css**

Insert immediately **before** the `Responsive` block so the reduced-motion block at the end still wins:

```css
/* --- scroll reveal ------------------------------------------------
   Hidden state lives in CSS, gated on the .js root class set by an
   inline head script. The prototype set this from JS, which flashed
   content and left the page invisible if the script failed.
   ------------------------------------------------------------------ */
.js [data-reveal] {
  opacity: 0;
  transform: translateY(34px);
  transition: opacity .85s cubic-bezier(.22, .61, .36, 1),
              transform .85s cubic-bezier(.22, .61, .36, 1);
}
.js [data-reveal].is-visible { opacity: 1; transform: none; }
.js [data-reveal].is-instant { opacity: 1; transform: none; transition: none; }
```

- [ ] **Step 4: Write main.js with the reveal module**

Replace `main.js` entirely:

```js
/**
 * Indus — DiPGOS site
 * No dependencies. Every module is a no-op if its markup is absent.
 */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     Scroll reveal
     Ported from the design prototype's setupReveal(), same numbers:
     threshold .1, rootMargin -6% bottom, 92% first-paint cutoff,
     3.6s failsafe.
     --------------------------------------------------------------- */
  function setupReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!els.length) return;

    function show(el, instant) {
      el.classList.add(instant ? 'is-instant' : 'is-visible');
    }

    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { show(el, true); });
      return;
    }

    var vh = window.innerHeight || 800;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        show(entry.target, false);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    els.forEach(function (el) {
      // Anything already near the fold appears without animating in.
      if (el.getBoundingClientRect().top < vh * 0.92) show(el, true);
      else io.observe(el);
    });

    // Failsafe: never leave content hidden, whatever the observer does.
    setTimeout(function () { els.forEach(function (el) { show(el, false); }); }, 3600);
  }

  setupReveal();
})();
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `node --test tests/browser.test.mjs`
Expected: PASS, 22/22.

- [ ] **Step 6: Commit**

```bash
git add main.js styles.css tests/browser.test.mjs
git commit -m "feat: add scroll reveal

Ports the prototype's IntersectionObserver with identical thresholds
and the 3.6s failsafe. Hidden state moves to CSS gated on a .js root
class, so the page never flashes and stays readable without JS."
```

---

### Task 10: Mobile nav, active link, mailto assembly, year

**Files:**
- Modify: `main.js` (append three modules inside the existing IIFE)
- Modify: `styles.css` (append the active-link rule)
- Modify: `tests/browser.test.mjs` (append tests)

**Interfaces:**
- Consumes: `#nav-toggle`, `#nav-links`, `.nav--open`, `body.nav-locked`, `[data-u][data-d]`, `#year` from Tasks 2, 4, 8.
- Produces: `.nav__link--active`.

- [ ] **Step 1: Write the failing tests**

Append to `tests/browser.test.mjs`:

```js
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
    const tag = await p.evaluate(() => {
      const a = document.activeElement;
      return a === document.body ? null : (a.getAttribute('href') ?? a.id ?? a.tagName);
    });
    if (tag) reached.add(tag);
  }
  assert.ok(reached.size >= count - 1, `tab reached ${reached.size} of ${count} controls`);
  await p.context().close();
});
```

- [ ] **Step 2: Run to verify failure**

Run: `node --test tests/browser.test.mjs`
Expected: FAIL on mailto, menu, active-link, and year subtests.

- [ ] **Step 3: Append the active-link style rule**

```css
.nav__link--active { color: var(--bone); }
.nav__link--active::after {
  content: '';
  display: block;
  height: 1px;
  margin-top: 5px;
  background: var(--amber);
}
```

At the mobile breakpoint the underline would collide with the row border, so also add inside the existing `@media (max-width: 859.98px)` block:

```css
  .nav__link--active::after { display: none; }
```

- [ ] **Step 4: Append the three modules to main.js**

Insert before the closing `})();`, after the `setupReveal();` call:

```js
  /* ---------------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------------- */
  function setupNav() {
    var nav = document.querySelector('.nav');
    var toggle = document.getElementById('nav-toggle');
    var panel = document.getElementById('nav-links');
    if (!nav || !toggle || !panel) return;

    function setOpen(open) {
      nav.classList.toggle('nav--open', open);
      document.body.classList.toggle('nav-locked', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('nav--open'));
    });

    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !nav.classList.contains('nav--open')) return;
      setOpen(false);
      toggle.focus();
    });

    // Leaving the mobile range with the panel open would strand the lock.
    window.matchMedia('(min-width: 860px)').addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
    });
  }

  /* ---------------------------------------------------------------
     Active nav link
     --------------------------------------------------------------- */
  function setupActiveLink() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (!section) return;
      byId[id] = link;
      sections.push(section);
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove('nav__link--active'); });
        var link = byId[entry.target.id];
        if (link) link.classList.add('nav__link--active');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------------------------------------------------------------
     Contact address — assembled at runtime so it is never in the
     served HTML and never scraped from source.
     --------------------------------------------------------------- */
  function setupContact() {
    var nodes = document.querySelectorAll('[data-u][data-d]');
    Array.prototype.forEach.call(nodes, function (el) {
      var user = el.getAttribute('data-u');
      var domain = el.getAttribute('data-d');
      if (!user || !domain) return;
      el.setAttribute('href', 'mailto:' + user + '@' + domain);
    });
  }

  /* ---------------------------------------------------------------
     Copyright year
     --------------------------------------------------------------- */
  function setupYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  setupNav();
  setupActiveLink();
  setupContact();
  setupYear();
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `node --test tests/browser.test.mjs`
Expected: PASS, 28/28.

- [ ] **Step 6: Run the full suite**

Run: `npm test`
Expected: PASS across `assets`, `structure`, and `browser` files. `structure.test.mjs` still confirms no `mailto:` string is present in the source, which is exactly what this task's runtime assembly preserves.

- [ ] **Step 7: Commit**

```bash
git add main.js styles.css tests/browser.test.mjs
git commit -m "feat: add mobile nav, active link, mailto assembly and year

Contact addresses are built at runtime from data-u/data-d, so the
served HTML contains no email and the links degrade to #contact
without JS."
```

---

### Task 11: Delete the old site, rewrite the Readme, final verification

**Files:**
- Delete: `public/` (entire directory)
- Modify: `Readme.md` (full rewrite)
- Modify: `tests/structure.test.mjs` (append the final repo-state test)

**Interfaces:**
- Consumes: everything from Tasks 1–10.
- Produces: the final shippable repo.

- [ ] **Step 1: Write the failing repo-state test**

Append to `tests/structure.test.mjs`:

```js
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
```

- [ ] **Step 2: Run to verify failure**

Run: `node --test tests/structure.test.mjs`
Expected: FAIL on `the old public/ tree is gone`. The hex test may also fail — every `rgba(...)` is fine, but any stray `#RRGGBB` outside `:root` must be replaced with its token.

- [ ] **Step 3: Delete the old site assets**

```bash
git rm -r --quiet public/
```

Confirm nothing references them:
```bash
grep -rn "public/" index.html styles.css main.js || echo "clean"
```
Expected: `clean`.

- [ ] **Step 4: Fix any hex literals flagged outside :root**

Replace each with its token (`#0A1424` → `var(--ink)`, `#E8A020` → `var(--amber)`, and so on per the Global Constraints table). The `rgba(232,160,32,…)` amber tints and `rgba(255,255,255,…)` card fills are **not** hex and are expected to remain as-is — the design uses them at alphas that no token expresses.

- [ ] **Step 5: Rewrite Readme.md**

```markdown
# Indus — industechsol.com

Single-page marketing site for Indus Technology Solutions, built from the
DiPGOS Site design in Claude Design. Static, no build step, deployed to
GitHub Pages.

## Shipped files

| Path | Purpose |
|---|---|
| `index.html` | All markup and copy. Seven landmarks, no inline styles. |
| `styles.css` | Every visual rule. Tokens → reset → keyframes → components → responsive. |
| `main.js` | Reveal observer, mobile nav, active link, contact assembly, year. |
| `assets/` | Three SVGs, the command-center WebP, favicons, OG card. |
| `CNAME` | `industechsol.com`. |

Everything else in the repo is development tooling and is not served
content.

## Local preview

```bash
npm run serve      # http://127.0.0.1:<port>
```

Or open `index.html` directly — every path is relative and works from
`file://`.

## Tests

```bash
npm install
npx playwright install chromium
npm test
```

Three suites: `assets` (existence, dimensions, byte budgets), `structure`
(HTML/CSS invariants, parsed as text), and `browser` (Playwright —
computed styles, responsive tiers, no-JS, reduced motion, keyboard).

## Design conventions

- **Tokens only.** Every colour is a custom property on `:root` in
  `styles.css`. Hex literals outside that block fail the test suite.
- **No inline styles.** `index.html` carrying a `style=` attribute fails
  the test suite.
- **The contact address is never in the source.** It is assembled at
  runtime from `data-u` / `data-d`. Adding a literal `mailto:` fails the
  test suite.
- **Breakpoints:** desktop ≥1100px, tablet 700–1099px, mobile <700px.
  The nav flips to a hamburger at 860px, which is deliberately not a
  tier boundary.
- **Every animation** must be disabled under
  `@media (prefers-reduced-motion: reduce)`.

## Provenance

The design is `DiPGOS Site.dc.html` from the Claude Design project
`DiPGOS presentation cover`. The handoff bundle lives in
`dipgos-presentation-cover/`, which is **gitignored** — it is a
reference, not a dependency. The design spec and this implementation's
plan are in `docs/superpowers/`.

Fourteen deliberate deviations from the prototype (responsive tiers,
mobile nav, focus rings, reduced motion, image budget, and others) are
itemised in
`docs/superpowers/specs/2026-08-12-dipgos-site-rebuild-design.md`.
```

- [ ] **Step 6: Run the whole suite**

Run: `npm test`
Expected: PASS across all three files, 0 failures.

- [ ] **Step 7: Verify the remaining spec criteria that tests do not cover**

```bash
# 1 — no inline styles, no stray hex (already asserted, confirm visibly)
grep -c 'style="' index.html || echo "0 inline styles"

# 2 — no leaked address anywhere in shipped files
grep -rn "kamran@" index.html styles.css main.js || echo "no leaked address"

# 11 — every asset referenced actually exists
grep -o 'assets/[a-z0-9.-]*' index.html styles.css | sort -u | \
  while read -r p; do [ -f "$p" ] || echo "MISSING: $p"; done; echo "asset check done"

# payload
du -ch index.html styles.css main.js assets/* | tail -1
```

Expected: no inline styles, no leaked address, no `MISSING:` lines, total under 1 MB.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: remove the old site and document the new one

Deletes public/ — no asset in it is referenced by the new design.
Rewrites the Readme around the shipped files, the test suites and the
token/no-inline-style/no-literal-mailto conventions the tests enforce."
```

- [ ] **Step 9: Final review before merge**

Confirm each spec verification criterion, by running it rather than by inspection:

| # | Criterion | Covered by |
|---|---|---|
| 1 | No inline styles, no stray hex | `structure`: inline-style + hex-outside-root tests |
| 2 | No leaked email; CTA opens correct mail client | `structure` + `browser` mailto tests |
| 3 | No horizontal scrollbar at 5 widths | `browser`: overflow test |
| 4 | Hamburger below 860px, opens and closes | `browser`: menu test |
| 5 | Anchors clear the sticky nav | manual — scroll to each of the 5 sections |
| 6 | Readable with JS disabled | `browser`: no-JS test |
| 7 | Reduced motion: nothing animates, all visible | `browser`: reduced-motion test |
| 8 | Keyboard reaches every control with a focus ring | `browser`: keyboard + focus-ring tests |
| 9 | `command-center.webp` under 500 KB, no CLS | `assets` budget + explicit width/height |
| 10 | Payload under 1 MB | `structure`: payload test |
| 11 | No 404s | Step 7 asset check |
| 12 | Nothing under `public/` referenced | `structure`: public/ tests |

Criterion 5 is the only one not automated. Check it manually at 1440px and 390px.

---

## Self-Review

**Spec coverage.** Walked each spec section against the tasks:

| Spec section | Task |
|---|---|
| File inventory — created | 1 (assets), 2–4 (HTML), 5–8 (CSS), 9–10 (JS), 11 (Readme) |
| File inventory — deleted | 11 |
| Asset pipeline | 1 |
| Design tokens | 5 |
| Page structure, 7 landmarks | 2 (nav, hero), 3 (01, 02), 4 (03, 04, contact, footer) |
| Responsive specification | 8 |
| Mobile nav | 8 (CSS), 10 (JS) |
| Hero layout fix | 5 (padding), 8 (short-viewport guard) |
| JS: reveal | 9 |
| JS: nav toggle | 10 |
| JS: active link | 10 |
| JS: contact assembly | 10 |
| JS: copyright year | 10 |
| Accessibility — focus-visible | 5 |
| Accessibility — reduced motion | 8 |
| Accessibility — colour-scheme, alt text | 2 |
| Metadata | 2 |
| All 14 deviations | 1 (#7), 2 (#3, #5, #13), 3 (#8), 4 (#9, #10, #11, #12), 5 (#6, #14), 8 (#1, #2, #4) |
| All 12 verification criteria | 11 Step 9 |

No gaps.

**Placeholder scan.** One genuine placeholder was found and fixed rather than left: Task 3 Step 4 originally carried `width="2400" height="1350"` with no way to derive the real numbers, so it now includes the exact `node -e` command that reads the dimensions from the source PNG's IHDR chunk, plus a dedicated verification step. Task 1 Step 6's `sharp-cli` invocation is the one remaining place where the engineer may need to adapt flags to the installed version; the escape hatch and the pass condition are both stated explicitly, and the outcome is asserted by tests either way.

**Type and name consistency.** Cross-checked the class-name contracts between the Interfaces blocks and the code:

- Fixed: Task 8 introduced `body.nav-locked` while Task 10's `setupNav` was toggling `nav-lock`. Both now read `nav-locked`.
- Fixed: `.section__bg` is declared once in Task 5 and reused by `.section--dipgos`, `.foundation`, and `.contact` with per-context opacity overrides, rather than three near-duplicate rules.
- Fixed: `.eyebrow__label--amber` is used in Task 4's contact markup and is now defined in Task 6's eyebrow block.
- Confirmed: `is-visible` / `is-instant` are written by Task 9's JS and defined by Task 9's CSS; `.nav__link--active` is written by Task 10's JS and defined by Task 10's CSS; `data-u` / `data-d` are emitted in Task 4 and consumed in Task 10, with the values asserted identical in `structure.test.mjs`.
