# Indus — industechsol.com

Single-page marketing site for Indus Technology Solutions, built from the
DiPGOS Site design in Claude Design. Static, no build step, deployed to
GitHub Pages.

## Shipped files

| Path | Purpose |
|---|---|
| `index.html` | All markup and copy. Five landmarks (banner, two nav, main, contentinfo), no inline styles. |
| `styles.css` | Every visual rule. Tokens → reset → keyframes → components → interaction → responsive. |
| `main.js` | Reveal observer, ambient gating, command-centre parallax, mobile nav, nav scroll state, active link, contact assembly, year. |
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
- **Motion tokens.** Durations, easings, reveal travel and hover lift live
  in the `/* motion */` group on `:root`, so the whole feel is tunable from
  one block. Every duration and easing this motion system added reads from
  there, as do its reveal travel and hover lift, with two one-off
  exceptions written at their single call site: the command centre's `1s`
  signature entrance and the `1px` press offset — the reduced-motion
  block's `.001ms` is a kill switch, not a duration. Short **choreography
  delays** are deliberately not tokenised — the hero cascade's
  `120ms` / `240ms` / `360ms`, the underline sweep's `350ms` and the `120ms`
  on the rule and bar draws are written inline at their point of use,
  where the sequence they encode reads in one place. The one delay that is
  a token is the grid stagger step, `--stagger`, which every staggered
  child multiplies. Animations that predate the tokens (the ambient loops
  `floatY`, `drift`, `corepulse`, `loopglow` and `bob`, plus two older nav
  transitions) still carry their own values; they were left alone rather
  than churned. `main.js` holds one motion number, the parallax range,
  which it hands to CSS as a custom property, and one geometric constant
  that caps it — the 2% of frame height that `.frame img`'s `scale(1.04)`
  leaves to travel through.
- **Motion state is classes: JS toggles, CSS interprets.** `.is-visible`
  and `.is-instant` on `[data-reveal]`, `.is-live` on an ambient container,
  `.nav--scrolled` on the nav, and the older `.nav--open` on the mobile
  panel. No motion decision lives in JavaScript.
- **The contact address is never in the source.** It is assembled at
  runtime from `data-u` / `data-d`. Adding a literal `mailto:` fails the
  test suite.
- **Breakpoints:** desktop ≥1100px, tablet 700–1099px, mobile <700px.
  The nav flips to a hamburger at 860px, which is deliberately not a
  tier boundary.
- **Every animation** must be disabled under
  `@media (prefers-reduced-motion: reduce)`, and every hover lift must sit
  inside `@media (hover: hover)` so a tap cannot strand an element in its
  raised state.

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
