# Round 4: B's look, the live site's full story, DiPGOS front and centre

## The owner's feedback on round 3 (2026-10-08)

- **The look of R3-B ("Ground") is good.** The owner liked the construction-site photography.
- **Round 3 lost too much of the marketing content.** R1-C carried the details of how the system works and what we offer. The round-3 variants don't show them, either clearly or visually.
- **DiPGOS is missing from R3-B altogether.**
- **Keep as much of the current live site's content as possible.** Rephrasing, shortening or lengthening is fine. Removing it is not.
- **New ideas on top are welcome.**

## So the rules change from round 3

- **Base look: [`../redesign-mocks-r3/r3b-ground.html`](../redesign-mocks-r3/r3b-ground.html).** Read its CSS and reuse its token system:
  - ink `#0A1424`
  - shale `#111C2A`
  - rock `#9AA1A6`
  - silt `#C7B595`
  - river `#7CC4BC`
  - bone `#FBF9F4`
  - amber `#E8A020` (actions and the i-dot)
  - blue `#3E74D6` (i-dot rings)

  Keep its devices too:
  - Gelasio + Archivo;
  - 2px buttons;
  - graded photos;
  - text on solid ink blocks, never floating on a photo;
  - the i-dot used as pins.

  Its hero (the aerial with pins dropping in) stays as it is, apart from the hero copy and the DiPGOS presence below.
- **Content: everything in [`CONTENT.md`](CONTENT.md) must appear.** That file is the inventory of the live site plus the new additions. Every block is marked *keep* or *add*. You may rephrase and restructure, but don't drop a block.
- **The length budget goes up.** About 1,300–1,800 words, and a phone page under about 16 screens. Round 3's 300–600-word cap is lifted: the owner wants the substance back. Density is still the enemy, though. **Show it, don't wall it:** every substantive block gets a visual treatment, not just paragraphs.
- **DiPGOS must be unmistakable:**
  - The **DiPGOS lockup with its tagline** (`../../assets/brand/dipgos-lockup-tagline-light.svg`) opens the DiPGOS chapter, large.
  - The DiPGOS name appears in the hero area. The hero line under the h1 names it.
  - The nav has a **DiPGOS** item.
  - The flat DiPGOS mark (amber core, amber beams, blue nodes, no glow; see `../redesign-mocks-r3/r3a-emblem.html` for a clean flat redraw you may reuse) appears at least once as a diagram, not as decoration.
- **Nav:** Indus logo, then Conviction, DiPGOS, Applied AI, Company, then `Get in touch`. These are the live site's items, as the content plan's multi-page site map isn't built yet.
- **Still binding from round 3** (the reasons are in [`../redesign-mocks-r3/FLAWS.md`](../redesign-mocks-r3/FLAWS.md) §5):
  - No codes or units above the fold.
  - No hedge labels in the visible design, apart from placeholder frames and the footer notes line.
  - No glow, orbs, gradient blobs or pills.
  - No circled or zero-padded numerals. Plain 1–5 is fine for the loop, which is a real sequence. Drop the live site's "01 / 02" section numbers.
  - No caps eyebrows above every heading.
  - No 3×N bordered card grid.
  - No monospace or handwriting fonts.
  - Amber means action, plus the i-dot and the mark's core and beams.
  - One container; running text ≤ ~65ch; AA contrast; tap targets ≥ 24px.
  - 360–1600px with no horizontal scroll.
  - Skip link and focus ring; an opaque mobile menu.
  - The contact rules (below).
- **Motion:** the hero pin drop, plus **at most one** more orchestrated moment, which belongs to your variant's main new idea. All of it sits inside `prefers-reduced-motion: no-preference`. Don't fade-up every section.

## Assets

Paths are relative to the mock file in `docs/redesign-mocks-r4/`.

- **Photos** in `assets/` (the same set as round 3):
  - `site-dasu-aerial.jpg` (2200×1387)
  - `site-basha-aerial.jpg` (1280×720)
  - `site-mohmand-aerial.jpg` (1280×807)
  - `site-tarbela-pit.jpg` (1280×806): a **circular** shaft pit with baked-in elevation labels
  - `river-bunji.jpg` (2200×1467)
  - `river-indus-gorge.jpg` (1280×940)

  View them before using them.
- **The real command centre capture:** `../../assets/command-center.webp` (1912×935). It shows scope navigation on the left, a live project map in the centre, and productivity, quality and business panels on the right. Use it large (≥ 900px wide). On phones, use art-directed crops (`object-fit` / `object-position`), never a thumbnail of the whole thing.
- **Brand:**
  - `../../assets/brand/indus-logo-light.svg`
  - `../../assets/brand/dipgos-lockup-tagline-light.svg`
  - `../../assets/brand/dipgos-wordmark-light.svg`
  - `../../assets/brand/dipgos-mark-light.svg` (the mark has glow; redraw it flat if you use it large)
- **Product screens to come:** use the round-3 placeholder frame. That is a dark panel at the real aspect ratio, with a 1px border and 8px radius, and the text "Screen to come: <subject>" in muted 14px. Use it only where the content asks for a screen the owner hasn't supplied yet.

## Contact (unchanged)

- JS assembles the address from `data-u="kamran"` and `data-d="industechsol.com"`. Never put a literal `mailto:` or the address in the source.
- Show the address as selectable text, with a **Copy** button (it confirms "Copied") and an **Email us** button.
- Add `<noscript>` with "kamran (at) industechsol.com".

## Mock tag

A small plain text link under the nav at the top-left (as in R3-B): "R4 · <letter> · <name> · all mocks", linking to `index.html`.

## Footer

- Indus logo + "Shaping the future of engineering & construction".
- The Explore links and Contact.
- The two entities.
- © 2026 Indus Technology Solutions. All rights reserved.
- Motto: "The project thinks; the human commands."
- One notes line: the photo rights, the † (if used) and the Sources (if you used the 96% figure).

## The two variants

Both use the same base look and the same full content. They differ in **how the system is made visual**, which is where the owner asked for new ideas.

### R4-A · "Ground, complete": the live site's order, each idea drawn from the site itself

**Order:**

1. hero;
2. Conviction;
3. DiPGOS:
   - the lockup + "Your whole project, running as one system";
   - how it thinks;
   - what it connects;
   - where you run it;
4. from tender to site *(add)*;
5. Applied & Physical AI;
6. company;
7. contact.

**Visual ideas (required):**

- **How it thinks → the loop drawn on the ground.** Use `site-tarbela-pit.jpg`: the shaft is a real circle. Overlay the five-step loop (Sense → Understand → Foresee → Adapt → Act, with Act returning to Sense) as a ring that follows the pit's rim. Put an i-dot at each step and set the labels on ink tags.
  - Use an SVG with a viewBox matching the image (1280×806) and `preserveAspectRatio` matching the crop, so the ring stays registered at every width.
  - On phones, the photo keeps the ring and the five steps are listed below it.
  - This is your one extra motion moment: the ring draws once when it scrolls into view.
- **What it connects → six functions standing on one foundation.** Draw it as a **section through the ground**. The six functions are the structure above grade:
  - Autonomous Scheduling
  - Finance
  - Supply Chain
  - Risk Management
  - Resource Manager
  - Document Manager

  Below a single heavy grade line sits **the foundation, Operational Management**, with Productivity, Quality and Health & safety. Set it as typography and lines: no boxes or cards. The foundation band may use a strip of `site-basha-aerial.jpg` (the excavated abutments) as its texture.
- **Where you run it → the command centre, annotated.** Show the real capture large, with three i-dot pins on its regions (Where = the map, What = the scope rail, How = the right panels). Each pin ties to its text. Below it, set "Action & command" and "Decision intelligence" as two columns.
- **Applied & Physical AI → the stack drawn as dam lifts.** A dam's cross-section (a trapezoid profile, drawn in line) is built of four horizontal lifts. The base is Physics & operational sciences, then Operational relationships, then the Semantic & knowledge layer, then Applied AI (human in command) on top. Labels sit beside each lift. "We build the ground" becomes literal.
- **From tender to site (add):** the six-step lifecycle as a horizontal line on desktop (a vertical one on phones), with the module names (CPDS, Atom Manager, ACCS, Mutlashi) on their spans and Operate (AOS) dimmed as "later". Set the band against `river-bunji.jpg` or keep it plain ink. Your call.

### R4-B · "Ground, the mark at work": DiPGOS's own mark explains the system

**Order:**

1. hero;
2. Conviction, as a short photo sequence;
3. DiPGOS:
   - the lockup + "Your whole project, running as one system";
   - the mark;
   - the command centre;
4. from tender to site *(add)*;
5. Applied & Physical AI;
6. company;
7. contact.

**Visual ideas (required):**

- **Conviction → three statements, three photographs.**
  - "$15 trillion a year: the largest industry on earth" over (beside) `site-mohmand-aerial`;
  - "The largest build in human history is still ahead" beside `river-bunji` or `site-basha-aerial`;
  - "Not another tool on the pile: the machine" beside `site-dasu-aerial` cropped differently from the hero.

  Each statement sits on an ink block. The full conviction paragraphs follow, compactly.
- **The mark at work: one large, flat DiPGOS mark with two states** and a two-button toggle: *How it thinks* / *What it connects*. This is your one extra motion moment: the labels re-flow when it toggles. The toggle must be a real, accessible control (`aria-pressed`), and both states must be readable without JS, rendered as lists.
  - **How it thinks:** five of the mark's nodes carry Sense, Understand, Foresee, Adapt and Act, and a ring closes the loop. The amber core is labelled "your project, live".
  - **What it connects:** six nodes carry the six functions. The amber core becomes **Operational Management, the foundation** (Productivity, Quality, Health & safety). The point: every function draws from the live work at the centre.
  - On phones the mark shrinks and stays whole, with the labels in a list below it.
- **Where you run it → the command centre as a short pinned sequence.** On desktop, the capture stays pinned while three short text steps scroll past (Where, What, How). Each step highlights its region with a 2px bone outline and dims the rest. Then come "Action & command" and "Decision intelligence".
  - On phones there is no pinning: show three art-directed crops, one per step.
  - If you run out of motion budget, a static three-crop layout is fine. The toggle is the main idea.
- **Applied & Physical AI → geological strata.** Draw four contiguous layers as strata in a cliff section, using wavy, non-box boundaries in four tones of rock/silt. The base is Physics. Labels sit on the layers. Optionally, a narrow strip of `river-indus-gorge.jpg` sits beside it as the "real" strata.
- **From tender to site (add):** the six steps as a compact numbered typographic list, each with its module name, beside a tall crop of `site-basha-aerial`. Operate (AOS) is dimmed as "later".

## Process

1. **Write exactly one file:** `docs/redesign-mocks-r4/r4a-ground.html` or `docs/redesign-mocks-r4/r4b-mark.html`. Touch nothing else, and run no git commands.
2. **Start from the R3-B file.** Copy its head, tokens, nav, hero, contact and footer patterns, then rebuild the middle.
3. **Before coding,** check every CONTENT.md block off against your planned sections, and write that checklist as an HTML comment at the top of your file.
4. **The preview server is already running:** `http://127.0.0.1:49729/docs/redesign-mocks-r4/<id>.html`. Do not start another.
5. **Shoot** from the repo root: `node docs/redesign-mocks-r4/tools/shoot.mjs <id> http://127.0.0.1:49729`. This uses the installed headless shell.
6. **Read the PNGs,** the phone shots first. Fix what you see, and do at least two passes. Check:
   - no horizontal scroll;
   - zero console errors;
   - the overlays stay registered on the photos at 1440, 820 and 390;
   - every CONTENT.md block is present.
7. **Report in ≤ 250 words:**
   - the visual idea per section;
   - the words, h2 count and phone screens;
   - any CONTENT.md block you merged or rephrased heavily;
   - any assumptions;
   - anything you couldn't fix.
