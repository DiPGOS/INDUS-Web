# DiPGOS Site Rebuild — Design

**Date:** 2026-08-12
**Repo:** `INDUS-Web` (deployed to `industechsol.com` via GitHub Pages)
**Source design:** `dipgos-presentation-cover/project/DiPGOS Site.dc.html`
**Claude Design project:** `1d41332c-112e-4e3c-9d87-267b97b1e617` ("DiPGOS presentation cover")

## Goal

Replace the existing INDUS marketing site with the new single-page DiPGOS site from
the Claude Design handoff bundle. The result is a hand-written static site — no build
step — that reproduces the design's desktop layout exactly and adds the responsive,
interactive, and accessibility behaviour the prototype does not specify.

## Source of truth

The Claude Design project was read over MCP (`DesignSync.list_files`) and its file list
matches the downloaded bundle exactly; bundle files are timestamped the same day. The
**local bundle is the source of truth** for implementation. No further MCP reads are
needed, and nothing is pushed back to the design project.

`dipgos-presentation-cover/` is gitignored, so every asset the site needs must be
**copied into the repo**. The bundle is a reference, not a runtime dependency.

## Decisions

| # | Decision | Rationale |
|---|---|---|
| 1 | **Full clean replace.** No old content survives. | The old site's CPDS/ACCS/AOS narrative is superseded by the new one. |
| 2 | **Static, no build** — `index.html` + `styles.css` + `main.js` + `assets/`. | Matches the repo today; Pages deploys on push. A bundler adds CI for no gain at one page. |
| 3 | **Dark-only.** Drop the old light/dark toggle. | The design defines no light palette. Inventing one would be interpretation, not implementation. |
| 4 | **Three responsive tiers** (≥1100 / 700–1099 / <700). | The prototype has zero media queries and would render 5-across loop cards on a phone. |
| 5 | **Inline styles lifted to a stylesheet.** | Required, not cosmetic: inline `style=` cannot express `:hover` or media queries, both of which the site needs. |
| 6 | **OG image = the LinkedIn banner**, downscaled. | Chosen for zero design work. Accepted trade-off: it is 4:1 and will letterbox in link previews. |
| 7 | **Contact address obfuscated in JS.** No email appears as text or in raw HTML. | `kamran@industechsol.com` must not be scrapeable or visible; no generic mailbox is confirmed to exist. |
| 8 | **Footer gains a Contact column.** | The design leaves an empty grid cell at `grid-column:10/span 3`; a second conversion path fills it. |

## Non-goals

- No light theme, no theme toggle.
- No contact form, no third-party scripts, no analytics.
- No CMS or data layer. Copy lives in the HTML (the old `DATA`-object indirection is dropped —
  it bought nothing for a single page and made the markup unreadable).
- No changes pushed back to the Claude Design project.
- No additional pages (no privacy/legal routes). The design specifies one page.

## File inventory

### Created / rewritten

```
index.html                        semantic sections, zero inline styles
styles.css                        :root tokens, components, 3 breakpoints
main.js                           reveal observer, mobile nav, active link, mailto assembly
Readme.md                         rewritten to describe the new site
assets/constellation-dark.svg     19 KB, copied verbatim, used 4×
assets/dipgos-mark-light.svg       4 KB, copied verbatim, used 2×
assets/i-dot.svg                  440 B, copied verbatim, used 3×
assets/command-center.webp        converted from the 2.6 MB source PNG
assets/favicon.svg                from exports/svg/indus-icon-dark-theme.svg (540 B)
assets/favicon.png                from exports/indus-icon-dark-theme.png, for legacy fallback
assets/og-card.png                LinkedIn banner downscaled to 1200×300
docs/superpowers/specs/…          this document
```

### Deleted

```
public/images/**        all of it — Logo/, main.webp, main_light.webp, accs/, dipgos_dashboard/
```
Old `index.html`, `main.js`, and `styles.css` are rewritten in place, not archived —
git history is the archive.

### Unchanged

`CNAME`, `.gitignore`, `.vscode/settings.json`, `.git/`.

## Asset pipeline

| Asset | Action | Reason |
|---|---|---|
| `command-center.png` (2.6 MB) | → WebP via `npx sharp-cli`, quality ~80 | Single heaviest asset on the page; a mid-page full-width image at 2.6 MB is an LCP problem. Target 250–400 KB. |
| `linkedin-profile-banner-dark-3168x792.png` (359 KB) | → resize to 1200×300 PNG | 3168px wide is far past any OG consumer's needs. |
| `indus-icon-dark-theme.svg` | copy as `favicon.svg` | Modern browsers prefer SVG favicons. |
| `indus-icon-dark-theme.png` | copy as `favicon.png` | Fallback for browsers without SVG favicon support. |
| The three SVGs | copy verbatim | Already small and vector; no processing. |

The site loads **one webfont family** (Gelasio, from Google Fonts) and nothing else
external. Body text is `Arial, Helvetica, sans-serif` — a system stack, zero requests.

Gelasio's heaviest weight is 700. The prototype requests `font:800` on the loop-card
numerals; that resolves to 700 in the prototype too. Reproducing the rendered result,
not the literal declaration, is correct here.

## Design tokens

All values extracted from the prototype. Nothing invented.

```css
:root {
  /* surfaces */
  --ink:        #0A1424;  /* page bg, hero, DiPGOS section */
  --navy:       #0B182C;  /* Conviction + AI sections, card fills */
  --slate:      #12233F;  /* Company section, foundation panel */
  --ink-deep:   #070F1C;  /* contact gradient terminus */

  /* accent */
  --amber:      #E8A020;
  --amber-hi:   #FFC24D;  /* link + button hover */
  --amber-soft: #E8C98A;  /* DıPGOS wordmark, nav CTA text */
  --on-amber:   #3a2c0c;  /* body text on amber fills */

  /* text */
  --bone:       #FBF9F4;  /* primary */
  --text-hi:    #dbe3ec;
  --text-mid:   #c1cdda;
  --steel:      #9DB0C4;  /* muted */
  --dim:        #6b7d92;  /* labels, copyright */

  /* rules — the prototype uses this base at .12/.14/.16/.18/.22/.28 alpha */
  --rule-rgb:   157,176,196;

  /* type */
  --serif: 'Gelasio', serif;
  --sans:  Arial, Helvetica, sans-serif;

  /* layout */
  --max: 1280px;
  --nav-h: 72px;          /* the design's scroll-margin-top, not the measured nav
                             height (~60px) — the extra 12px is breathing room above
                             a heading after an anchor jump. Keep the two decoupled. */
}
```

Radius scale as used: `999px` pills · `18px` command-center frame · `16px` loop and
foundation cards · `14px` function and AI cards · `11px` foundation chips.

Section rhythm: `padding: clamp(96px,13vw,180px) clamp(24px,6vw,72px)`, container
`max-width:1280px; margin:0 auto`. Conviction runs slightly taller
(`clamp(100px,15vw,200px)`); contact taller still (`clamp(100px,14vw,180px)`).

Naming is BEM-lite (`.loop-card`, `.loop-card--act`, `.fn-card`, `.eyebrow`). No
utility framework, no reset library.

## Page structure

Single page, seven landmarks, in order:

1. **Nav** — sticky, `rgba(10,20,36,.72)` + `backdrop-filter:blur(14px)`, bottom rule.
   Brand wordmark "ındus", four anchors (Conviction · DiPGOS · Applied AI · Company),
   amber-outlined pill CTA "Get in touch" → `#contact`.
2. **Hero** (`#top`) — constellation background at `.42` opacity, DiPGOS mark watermark
   at `.11` drifting on `floatY`, an amber radial orb on `drift`. `h1`: *"The world needs
   a new way to build."* with "build" in amber. Lead paragraph. Bottom strip with the
   tagline and a "Scroll ↓" cue whose arrow runs `bob`.
3. **01 · Our Conviction** (`#conviction`) — ghost "01" numeral at `rgba(232,160,32,.05)`,
   eyebrow, `h2` with an amber underline that draws in on `underline`, a two-column
   rule-topped text block (12-col: `1/span 6` and `8/span 5`), and an amber-rule
   statement paragraph.
4. **02 · The Operating System** (`#dipgos`) — constellation at `.34`. DıPGOS lockup
   (mark on `corepulse` + wordmark + "Project Operating System"), `h2`, lead. Then three
   sub-blocks:
   - *How it thinks* — five loop cards (Sense · Understand · Foresee · Adapt · **Act**).
     The first four are `--navy` with an amber bar running `loopglow` staggered at
     `0/.5/1/1.5s`; **Act** is a solid amber card with `--on-amber` text and no bar.
   - *What it connects* — six function cards, then a centred "↓ every function runs on
     one foundation ↓" label, then the **foundation panel**: `--slate`, amber `3px` top
     border, constellation at `.3`, three chips (Productivity · Quality · Health & safety).
   - *Where you run it* — the command-center image in an `18px` rounded frame with a deep
     drop shadow, then three rule-topped columns (Navigate · Action & Command · Decision
     Intelligence).
5. **03 · Applied & Physical AI** (`#ai`) — `h2`, then a 12-col split: left is the AI stack
   (amber "Applied AI — human in command" card, an "↑ stands on ↑" connector, three
   tinted layer cards); right is three prose paragraphs closing on the application-layer
   argument.
6. **04 · The Company** (`#company`) — `--slate`, 4/8 split: eyebrow left, `h2` + prose +
   two meta blocks (Founded by / Entities) right.
7. **Contact + Footer** (`#contact`) — gradient `--ink` → `--ink-deep`, constellation at
   `.5`, centred amber radial. Centred eyebrow "Let's Build", large `h2`, amber pill CTA.
   Footer below a rule: brand + tagline (5 col), Explore links (3 col), **Contact column
   (3 col, new)**, then a bottom bar with copyright and *"The project thinks; the human
   commands."*

Heading order is `h1 → h2 → h2 → h3 → h3 → h2 → h2 → h2` — valid, no levels skipped.
Decorative images (`constellation`, the hero watermark, the lockup mark) carry `alt=""`.
The command-center image keeps the design's descriptive alt text verbatim.

## Responsive specification

| Element | ≥1100px | 700–1099px | <700px |
|---|---|---|---|
| Loop cards (5) | 5 across | 3 across (3+2) | 1 column |
| Function cards (6) | 3 across | 2 across | 1 column |
| Conviction two-col | `6` / `5` split | stacked | stacked |
| Foundation panel | row, wrapping | row, wrapping | stacked |
| Command-center trio | 3 across | 2 across | 1 column |
| AI stack / prose | `6` / `5` split | stacked (stack first) | stacked |
| Company block | `4` / `8` split | stacked | stacked |
| Footer | `5` / `3` / `3` | 2 columns | 1 column |
| Nav | inline links | **hamburger below 860px** | hamburger |

Type already scales — every size in the design is a `clamp()`, so no per-tier font rules
are needed.

Nav flips at **860px**, not 700px: brand + four links + pill CTA needs roughly 700px of
run before it wraps into two ragged rows.

### Mobile nav — invented

The design specifies no mobile nav. It is built from the design's own vocabulary: the
same `rgba(10,20,36,.72)` blurred surface, links stacked at the nav type scale, amber pill
CTA at the bottom. Behaviour: `aria-expanded` on the toggle, `Escape` closes, body scroll
locks while open, selecting a link closes the panel.

### Hero layout fix

The prototype's hero is `min-height:calc(100vh - 60px)` with an **absolutely positioned**
bottom strip, so on a short viewport (phone landscape) the headline runs underneath the
strip. Fix: reserve the strip's height as hero bottom padding. This is a defect in the
prototype, not a design intent to reproduce.

## JavaScript behaviour

`main.js`, no dependencies, no framework.

### 1. Scroll reveal

Ported from the prototype's `setupReveal()` with its exact parameters:
`IntersectionObserver` at `threshold: 0.1`, `rootMargin: '0px 0px -6% 0px'`; hidden state
is `opacity:0` + `translateY(34px)`; transition `.85s cubic-bezier(.22,.61,.36,1)` on
opacity and transform; elements already within 92% of the viewport height on load reveal
immediately without animating; a 3.6s `setTimeout` force-reveals everything as a failsafe.

**One deliberate change.** The prototype applies the hidden state *from JS*, which flashes
content before hiding it, and leaves the page invisible if the script fails. Instead:
an inline `<head>` script sets `class="js"` on `<html>`, and CSS hides `[data-reveal]`
only under `.js`. No flash; no-JS degrades to fully visible.

### 2. Mobile nav toggle

Open/close, `aria-expanded`, `Escape` to close, scroll lock, close on link selection.

### 3. Active-link highlight — addition

Not in the design. Carried over in spirit from the old site, justified by a five-section
scroll. `IntersectionObserver` over the sections marks the matching nav anchor. Cheap to
remove if it reads as noise.

### 4. Contact address assembly

The address never appears as text or in the served HTML. Markup:

```html
<a class="cta" href="#contact" data-u="kamran" data-d="industechsol.com">Contact Us</a>
```

JS rewrites `href` to the `mailto:` on load. Without JS the anchor is a harmless self-link
rather than a dead one. Same mechanism for the footer Contact column, which reads
"Get in touch" rather than showing an address.

### 5. Copyright year

Rendered by JS with a static `2026` in the markup as the no-JS fallback, so the footer
does not go stale.

## Accessibility

- `:focus-visible` rings on every link and button — an **addition**; the design specifies
  no keyboard focus styling, which would leave the site unusable by keyboard.
- `@media (prefers-reduced-motion: reduce)` disables all six keyframe animations, the
  reveal transition (elements render visible immediately), and `scroll-behavior:smooth`.
  This is the design's own `reduceMotion` prop expressed as a platform feature.
- `<meta name="color-scheme" content="dark">` so form controls and scrollbars match.
- Decorative imagery `alt=""`; the one meaningful image keeps its descriptive alt.
- Contrast: `--steel` `#9DB0C4` on `--navy` `#0B182C` computes to **7.9:1** — passes AA
  comfortably for body text. `--dim` `#6b7d92` on `--ink` `#0A1424` computes to **4.4:1**,
  which clears AA for large text (3:1) but **misses AA for normal text (4.5:1) by a
  hair**. `--dim` is only used on uppercase tracked labels, the hero tagline, and the
  copyright line. Decision: leave it as designed, but if implementation finds `--dim`
  on any long-form or sub-14px prose, lift that instance to `--steel`.

## Metadata

The design file is a fragment and carries no metadata. Added:

- `<title>` — "Indus — The Project Operating System for Engineering & Construction"
- `<meta name="description">` — drawn from the hero lead
- `theme-color: #0A1424`, `color-scheme: dark`
- `<link rel="canonical" href="https://industechsol.com/">`
- Open Graph: `og:type=website`, `og:url`, `og:title`, `og:description`,
  `og:image` → `assets/og-card.png` (1200×300)
- Twitter: `twitter:card=summary_large_image` and matching fields
- Favicons: `favicon.svg` primary, `favicon.png` fallback

**Known trade-off:** the OG card is 4:1, not the 1.91:1 platforms expect. Link previews
will letterbox or centre-crop it. Accepted in exchange for zero design work; replaceable
later by dropping in a 1200×630 file at the same path.

## Deviations from the prototype

Everything below departs from `DiPGOS Site.dc.html`. Each is deliberate.

| # | Deviation | Why |
|---|---|---|
| 1 | Responsive tiers added | Prototype has no media queries; would render 5 loop cards across at 390px. |
| 2 | Mobile hamburger nav added | Prototype has no mobile nav at all. |
| 3 | `:focus-visible` styles added | Prototype specifies none; keyboard navigation would be invisible. |
| 4 | `prefers-reduced-motion` support | Replaces the design tool's `reduceMotion` prop. |
| 5 | Hidden reveal state moved to CSS | Prototype flashes content, and hides the page entirely if JS fails. |
| 6 | Hero bottom padding reserved | Prototype's absolute bottom strip overlaps the headline on short viewports. |
| 7 | `command-center.png` → WebP | 2.6 MB is an LCP failure on a marketing page. |
| 8 | Typo fixed: "system**we** always needed" → "system we always needed" | Missing space in the Company paragraph (design line 250). |
| 9 | Empty footer cells removed | `grid-column:10/span 3` and a stray `<div>` are editing leftovers. |
| 10 | Footer Contact column added | Fills #9's gap; gives a second conversion path. |
| 11 | Email obfuscated | `mailto:kamran@industechsol.com` is hardcoded in the prototype. |
| 12 | Active-link highlight added | Long single-page scroll; carried from the old site. |
| 13 | Metadata added | Prototype is a fragment with none. |
| 14 | `style-hover` → real `:hover` | The attribute is a design-tool convention; `support.js` does not implement it, so it is inert in a browser. |

Items 8 and 9 are corrections to the design file. They are fixed in the implementation
only — nothing is pushed back to the Claude Design project.

## Verification

Implementation is complete when all of the following are confirmed by running them,
not by inspection:

1. `index.html` contains no `style="` attributes, and no literal hex colour outside
   `styles.css` except `<meta name="theme-color">`, which cannot reference a custom
   property.
2. The string `kamran@industechsol.com` does not appear in `index.html`, and the
   Contact CTA opens a correctly addressed mail client after JS runs.
3. No horizontal scrollbar at 390px, 768px, 1024px, 1280px, and 1920px.
4. The hamburger appears below 860px, opens, traps nothing, and closes on
   link / `Escape` / toggle.
5. Every internal anchor (`#conviction`, `#dipgos`, `#ai`, `#company`, `#contact`)
   scrolls to its section with the heading clear of the sticky nav.
6. With JS disabled, all copy is visible and readable.
7. With `prefers-reduced-motion: reduce`, no element animates and content is visible.
8. Keyboard tab order reaches every link and button with a visible focus ring.
9. `command-center.webp` is under 500 KB and the page has no layout shift on its load.
10. Total transferred page weight under 1 MB on first load.
11. No 404s in the network panel — every `assets/` path resolves.
12. Nothing under `public/` remains referenced.
