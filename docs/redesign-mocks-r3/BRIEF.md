# Round 3: shared brief

## What we know now

The owner reviewed eight mocks across two rounds.

- **Round 1** (`../redesign-mocks/`): **C, "The loop", was the only one liked.** All four round-1 mocks used *identical copy*, so the owner chose C purely on its visual system:
  - one huge serif sentence ("The world needs a new way to build.");
  - Gelasio for the reading text, too;
  - the DiPGOS mark grown into an emblem;
  - scarce amber;
  - slow rhythm: about 990 words and 5 sections.
- **Round 2** (`../redesign-mocks-r2/`): **all four rejected**, including R2-A, which was built as "C evolved". Round 2 turned a brand page into a research report:
  - about 2.5× the words;
  - codes, timestamps and units in the hero;
  - stat walls, tables and footnote daggers;
  - "Pilot data" hedges on everything.

  All eight mocks also shared one navy, serif and amber-pill template.

**Read [`FLAWS.md`](FLAWS.md) §1 and §5 (Do / Don't) before designing.** These rules are binding. When this brief and FLAWS.md disagree, this brief wins.

Also read these:

- [`COPY.md`](COPY.md): the only source of text. It is short on purpose.
- [`../research/2026-10-08-brand-site-landscape.md`](../research/2026-10-08-brand-site-landscape.md): reference sites and the 2025–26 clichés to avoid. Read its synthesis sections.

**The owner's words:** "a modern brand site overall… I do not want it to be AI slop or a clone." The owner reviews on a phone.

## Brand constants (new kit in `assets/brand/`)

All four mocks share these. Paths are relative to the mock file.

| Asset | Path |
|---|---|
| Indus logo: serif wordmark; the "i" dot is an amber ball in a blue ring | `../../assets/brand/indus-logo-light.svg` (light ink, for dark backgrounds) |
| DiPGOS wordmark | `../../assets/brand/dipgos-wordmark-light.svg` |
| DiPGOS lockup, with the "PROJECT OPERATING SYSTEM" tagline | `../../assets/brand/dipgos-lockup-tagline-light.svg` |
| DiPGOS mark: amber core, blue nodes, links | `../../assets/brand/dipgos-mark-light.svg` |

- **Colours from the kit:**
  - ink `#0A1424`
  - amber `#E8A020`, with a highlight of `#FFD470` and a shade of `#CE8A17`
  - brand blue `#3E74D6`
  - bone `#FBF9F4`
- **Wordmark type:** the wordmarks are set in a Gelasio-like bold serif, so **Gelasio** is the brand display face in every mock.
- **The mark's glow is not a brand constant.** The SVG uses radial-gradient glows. Where you redraw the mark as a large emblem, draw it **flat and crisp**: no bloom, orb or halo (FLAWS Don't #7).
- **Amber in the "i"-dot is the brand's signature moment.** Using that motif (amber core in a blue ring) as a structural device is encouraged.

## Real photography: new this round

These are in `assets/`. They are real project photos from the DiPGOS product library, resized.

| File | Size | Shows |
|---|---|---|
| `site-dasu-aerial.jpg` | 2200×1387 | Aerial of a dam site in a deep valley, with haul roads and a cofferdam. The best full-bleed image. |
| `site-basha-aerial.jpg` | 1280×720 | Aerial of a river between two excavated, terraced abutments. Use it at ≤ 1280px wide. |
| `site-mohmand-aerial.jpg` | 1280×807 | Aerial of a huge earthworks site, with a spillway chute and camps. |
| `site-tarbela-pit.jpg` | 1280×806 | A circular shaft pit; the photo already has labels baked in (EL 477 m, Pit EL 421 m, Cofferdam EL 458 m). |
| `river-bunji.jpg` | 2200×1467 | The turquoise Indus river with a suspension bridge and mountains: daylight, bright. |
| `river-indus-gorge.jpg` | 1280×940 | The Indus gorge with snow peaks: blue, dramatic. |

- **Grade the photos to sit in a dark page.** Use a CSS filter or a solid ink panel beside them, never a gradient fade-to-black over the subject. Crop them with `object-position`.
- **Don't caption the photos with project names.** Names need permission. A footer note covers the photos: "Project photography from the DiPGOS library; usage rights to be confirmed."

## Product screens: placeholders

The owner will send real DiPGOS screenshots later. Until then, show each screen as a **placeholder frame**:

- a dark panel at the real aspect ratio (1920×935 or 16:10), with a 1px border and 8px radius;
- the text "Screen to come: <what it shows>" centred inside, in the UI sans at 14px, muted;
- no fake UI skeletons, no hatching and no lorem.

Pick from these subjects: *ACCS project map with contract markers*, *Activity flow with the RCC dam lifts*, *Atom Manager resource catalogue*, *CPDS requirement profiler*, *Mutlashi answer with sources*.

You may use one real capture, `../../assets/command-center.webp` (1912×935). Use it only at ≥ 900px wide, and never in the hero.

## Shared requirements (every mock)

- **Length:** ≤ 1,200 words in `<main>` and ≤ 7 `h2`s. The **phone page must stay under 10 screens** at 390×844. The shoot script reports both, so check them.
- **Above the fold, no codes or units:** no EL, RCC, NCR, FEL, m³, timestamps or †. There is no eyebrow or kicker above the h1.
- **No hedge labels in the visible design** ("Pilot data", "Illustrative", "pending"), with two exceptions: the placeholder frames, and one footer notes line.
- **No stat walls, no 3×N card grid, no glow, orbs or gradient blobs, no circled or zero-padded numerals, no monospace, no handwriting fonts, and no pill shapes.** Buttons are rectangles with 0–8px radius.
- **Words and looks the market has used up:**
  - Don't call DiPGOS an "intelligence" anything. Buildots, Doxel and OpenSpace already do.
  - No defense-tech styling: no mono caps, no single acid accent, no drone-video hero.
  - No rotating headline verbs and no dotted globes.
- **Numbers only where the content is a sequence.** The lifecycle steps are one (1–6, plain numerals).
- **Amber means action,** plus at most one brand moment (the i-dot or the mark's core). Green and red never appear.
- **Nav (content-plan site map):** Indus logo, then Product, Solutions, Pilot, Company, then a `Book a demo` button. The links may point to in-page anchors. Each mock styles its nav differently, so the eight-mock sameness doesn't repeat. On mobile, use an opaque menu panel. Include a skip link and a visible `:focus-visible` ring.
- **One container:** shared left and right edges at every width. Running text stays at or under ~65ch.
- **Contact:** JS assembles the address from `data-u="kamran"` and `data-d="industechsol.com"`. Never put a literal `mailto:` or the address in the source. Show it as selectable text, with a **Copy** button (it confirms "Copied") and an **Email us** button. Add a `<noscript>` with "kamran (at) industechsol.com".
- **Motion:** one orchestrated moment, which is your signature, inside `prefers-reduced-motion: no-preference`. Don't fade-up every section.
- **Accessibility:**
  - AA contrast;
  - line-height ≥ 1.35 on anything that wraps;
  - tap targets ≥ 24px;
  - 360–1600px with **no horizontal scroll**;
  - alt text on photos.
- **Mock tag:** a small, plain text link (not a pill), positioned absolutely just under the nav at the top-left: "R3 · <letter> · <name> · all mocks", linking to `index.html`.
- **Fonts:** Google Fonts `<link>` only. Inline all CSS and JS in one file.
- **Footer:**
  - motto: "The project thinks; the human commands.";
  - © 2026 Indus Technology Solutions;
  - the two entities;
  - one notes line covering the photos, the † (if you used a † below the fold) and the Sources link for any figure you used.

## The four directions

These must differ in **hero copy, visual device, type pairing, section order and CTA/nav styling**. If two of them could swap headlines unnoticed, one of them isn't a direction.

### R3-A · "Emblem": C, refined (bold voice)

- **Hero:** "The world needs a new way to build." The DiPGOS mark is redrawn large, flat and crisp as the emblem.
- **Signature:**
  - **The emblem's nodes are the lifecycle.** Six of the mark's blue nodes carry one-word serif verbs for the six real steps: *Read · Understand · Propose · Bid · Book · Control*. Each verb has one short sans line from COPY §3. A seventh node, *Operate*, is drawn dimmed, labelled "later".
  - The links run from the amber core to each node.
  - **The one motion moment:** on load, the links draw out from the core one by one, and then the ring closes.
  - On phones the emblem stays whole and legible: shrink it, and set the six verbs below it as a short list rather than squeezing labels around it.
- **Type:** Gelasio for display *and* reading text (C's register), with Instrument Sans for UI only.
- **Palette:** C's deep ink navy. Amber appears on the core and the CTA only. No amber word in the h1 this time; the core carries it.
- **Order:**
  1. hero + emblem;
  2. one full-bleed **photo band** (`site-basha-aerial` or `site-dasu-aerial`), with a single aphorism set over a solid ink strip, not over the photo;
  3. the command centre (`command-center.webp` large, ≥ 900px; a placeholder below that);
  4. Mutlashi as one aphorism plus two lines;
  5. company;
  6. contact.
- **CTA kit:** solid amber with a 6px radius, and a text-link secondary.

### R3-B · "Ground": the land is the hero (bold voice)

- **Hero:** full-bleed `site-dasu-aerial.jpg`, graded dark. The headline is "The world's oldest industry has never had an operating system.", set very large and bottom-left on a solid ink block that overlaps the photo's lower edge. It does not float on the photo.
- **Signature:**
  - **The brand i-dot used as survey pins on the real site.** Four to six amber-in-blue-ring dots sit on visible features of the photo: haul road, cofferdam, camp, excavation. Each has a short plain label: *a crew*, *a machine*, *a load of material*, *a work front*.
  - The line beneath reads: "Every crew, machine and load on a site like this, in one system."
  - **The one motion moment:** the pins drop in one at a time.
  - On phones, use an art-directed crop that keeps 3–4 pins visible.
- **Type:** Gelasio display, with a sturdy grotesque body (choose it deliberately; not Inter or Schibsted).
- **Palette:** taken from the photographs: rock grey, silt and the turquoise of the river. The page ground is ink.
- **Order:**
  1. hero;
  2. the problem: one bold statement plus **one** large figure (96% or 98%), beside `site-mohmand-aerial`;
  3. the lifecycle as a large typographic list, 1–6, each step one line, with a slim photo crop beside;
  4. product: one large placeholder plus two smaller ones;
  5. "Built for the hardest builds": dams first, with `site-tarbela-pit`;
  6. company, with `river-indus-gorge` and the line "Named for the river our first projects are built on." (this line is an assumption; put it in your report);
  7. contact.
- **CTA kit:** square-cornered amber with a 0–2px radius, and an outlined secondary.

### R3-C · "One thread": the product walkthrough (engineer voice)

- **Hero:** "From tender to site, one connected system." Left-aligned, at 56–72px, so smaller than A and B. Under it sits COPY's engineer lead.
- **Signature:**
  - **A single continuous line runs from the hero down the page** and passes through the six lifecycle steps. At each step it reaches an i-dot node, and the step shows its name, one line and **a large product screen placeholder**. The line *is* the "connected" claim.
  - **The one motion moment:** the line draws as you scroll, scroll-linked. Render the full line when motion is reduced.
  - The line is **brand blue**, the nodes are amber in a blue ring, and amber otherwise means action only.
  - On phones the line runs down the left gutter (about 20px) with steps stacked beside it.
- **This is the product-first walkthrough** that the owner partly liked in R1-B, but calm:
  - one screen per step;
  - no annotations wall;
  - no sticky dashboard.
- **Type:** Gelasio display, IBM Plex Sans body. The page is more product-literate than A or B.
- **Palette:** a cooler ink, with blue as the structural colour.
- **Order:**
  1. hero;
  2. the problem: three short points as a typographic list, no figure;
  3. the thread, steps 1–6 (the bulk of the page);
  4. one proof line set as a sentence, not tiles: "Six disciplines. Seven levels of drill-down. Every AI answer sourced.";
  5. Mutlashi;
  6. pilot (five steps, set compactly);
  7. contact ("See it on your own tender.").
- **Company** goes in the footer area: founder plus two lines.
- **CTA kit:** amber rectangle with a 4px radius; the secondary is a blue text link.

### R3-D · "The clause": one requirement, traced (engineer voice)

- **Hero:** "Every requirement, resource and rupee, traced from tender to handover." On the right sits **a fragment of a tender page**: bone paper, set in a serif, three or four lines of a plausible generic spec clause. One sentence in it is marked with an amber underline, for example: "Roller-compacted concrete shall be placed in layers not exceeding 300 mm compacted thickness."
  - The clause is illustrative and generic. Name no project. Say so in your report, not on the page.
- **Signature:**
  - **The marked sentence travels.** As you scroll, the same sentence reappears, transformed at each stop, as a short typographic sequence:
    1. the tender clause;
    2. a requirement: Civil, approved by an engineer;
    3. a deliverable;
    4. an operation, "Place & spread";
    5. its crew, machines and materials;
    6. the day's site report, checked against it.
  - Each stop is one line of plain English plus the transformed sentence. **There are no boxes or flowchart rectangles.** Set it as typography with a thin connecting rule.
  - **The one motion moment:** the sentence carries over between stops; a crossfade or a positional move is fine.
  - On phones it is a vertical sequence with no motion dependency.
- **Type:**
  - Gelasio for display and for the "document" fragments;
  - a humanist sans for UI and body, chosen deliberately (not Inter);
  - the tender fragment may use Gelasio Italic for clause numbers.
- **Palette:** ink, with bone used *only* for the document fragment, as a paper object on the dark page. It is not a light theme.
- **Order:**
  1. hero;
  2. the problem: one sentence plus one figure;
  3. the trace (signature);
  4. the command centre (one placeholder, large);
  5. Mutlashi;
  6. "Built for": three sectors, set as a sentence list;
  7. company + contact.
- **CTA kit:** an amber rectangle with a 2px radius, and an underlined text-link secondary.

## Files and process

1. **Write exactly one file:** `docs/redesign-mocks-r3/<id>.html`, where `<id>` is `r3a-emblem`, `r3b-ground`, `r3c-thread` or `r3d-clause`. Touch nothing else, and run no git commands.
2. **Before coding,** write your token plan (4–6 hex colours, type roles, ASCII wireframe of desktop and phone, and the one bold thing). Then check it against FLAWS §5 and the landscape clichés, and revise whatever reads like a default.
3. **The preview server is already running:** `http://127.0.0.1:49729/docs/redesign-mocks-r3/<id>.html`. Do not start another.
4. **Shoot:** from the repo root, run `node docs/redesign-mocks-r3/tools/shoot.mjs <id> http://127.0.0.1:49729`. It writes `docs/redesign-mocks-r3/shots/<id>-*.png` and prints the words, h2 count, screens, overflow and console errors.
5. **Critique your own screenshots** (Read the PNGs), the phone fold first, and fix what you see. Do at least two shoot-fix passes. Check:
   - the phone fold: headline, lead, CTA and an uncropped emblem or image;
   - no horizontal scroll;
   - words and screens within budget;
   - zero console errors.
6. **Report in ≤ 250 words:**
   - the signature, in one line;
   - your tokens;
   - the words, h2 count and phone screens;
   - any assumptions;
   - anything you saw but couldn't fix.
