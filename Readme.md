# Indus — industechsol.com

Single-page marketing site for Indus Technology Solutions, built from the
DiPGOS Site design in Claude Design. Static, no build step, deployed to
GitHub Pages.

## Shipped files

| Path | Purpose |
|---|---|
| `index.html` | All markup and copy. Five landmarks (banner, two nav, main, contentinfo), no inline styles. |
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
