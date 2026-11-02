# Redesign mocks: shared brief

These are four full-page mocks of industechsol.com, each with a different layout
idea. The owner will look at all four, pick one (or mix them), and the chosen
direction then gets built into the real site. The mocks are decision material:
they must be complete, responsive and honest, not polished fragments.

The audit that motivates the redesign is `docs/design-audit-2026-09-25/README.md`.
Read it. Every mock must fix the issues listed under **Shared requirements**.

## Subject, audience, job

- **Subject:** Indus Technology Solutions builds DiPGOS, a "project operating
  system" for engineering and construction. Live product: a command centre over
  a real dam project, with scope, map, productivity, quality and business panels.
- **Audience:** owners, EPC contractors and project directors of large
  infrastructure (dams, power, roads). Engineers: sceptical, technical, busy.
- **Job:** make them believe the product is real, then get them to email.

## Files and paths

- Write exactly one file: `docs/redesign-mocks/<id>.html`. Inline all CSS and JS.
  Google Fonts `<link>` is allowed. Touch nothing else in the repo, and run no git
  commands.
- Assets are referenced from the repo root, one level up from the mocks:
  `../../assets/command-center.webp` (1912×935), `../../assets/dipgos-mark-light.svg`
  (hub-and-nodes mark, amber core, pale-blue nodes), `../../assets/constellation-dark.svg`,
  `../../assets/i-dot.svg`, `../../assets/favicon.svg`.
- The Indus wordmark is text: `ı` (dotless i) plus a small amber dot with a blue
  ring, then `ndus`, set in Gelasio. See `index.html` line 39 and `.wordmark*` in
  `styles.css`.
- Preview server (already running): **http://127.0.0.1:60131/docs/redesign-mocks/<id>.html**.
  The live site is at http://127.0.0.1:60131/ if you want to compare.

## Copy rules

**Text that's good stays.** Take every string from `index.html` verbatim, except
for these audit-driven edits. They are the only permitted changes:

1. **Spelling is UK throughout:** command *centre*, *civilisation*, *programme*,
   *epicentre*.
2. **Sentence case** for every heading, label, button and card title. For
   example: "Physics & operational sciences", "Autonomous scheduling",
   "Resource manager", "Health & safety". DiPGOS and Indus keep their casing.
3. **CTAs:** links that jump to the contact section say **Get in touch**. The
   contact button, which opens email, says **Email us**. Drop "Contact Us" and
   the "Let's Build" label.
4. **Remove labels that restate their heading:**
   - Drop the section eyebrows "Our conviction", "The operating system",
     "Applied & physical AI" and "The company" as labels above h2s. Nav and
     footer still use the section names.
   - Keep the DiPGOS lockup tag "Project operating system" once.
   - "The foundation · it all starts here" becomes "The foundation".
   - The long caps kicker becomes a normal sentence-case line: "Functions that
     run themselves — driven by the work, approved by you."
5. **Taglines:** keep "The world's oldest industry, reimagined from the ground
   up." and the motto "The project thinks; the human commands." Drop "Shaping
   the Future of Engineering & Construction".
6. **Emphasis:** use at most two levels, body text plus one highlight. Collapse
   `.hi` / `.hi-soft` / `<b>` / `.accent` into that. Amber *text* highlighting
   appears only in the hero ("build.") and the contact headline ("gets built."),
   which rhyme as bookends.
7. **Placeholders the owner must supply:**
   - Mark with class `todo`: a dashed amber outline plus a tiny "needs owner
     input" tag.
   - Company proof, 3–4 facts. Write plausible *placeholder* facts in square
     brackets, e.g. "[20+ years delivering hydropower & infrastructure]",
     "[N projects run on DiPGOS]", "[Offices: Islamabad · USA]".
   - Naming the dam project: "Diamer-Basha" only inside a `todo`.
   - Never present an invented fact as real.

## Shared requirements (the audit fixes)

- **One container.** Nav, hero, sections and footer share the same left and
  right edges at every width.
- **Running text ≤ ~65ch** at every width, including tablet.
- **Solid amber fill means "action" and nothing else.** Buttons only. Highlight
  cards and chips use rules, borders or tints. Nothing that can't be clicked
  may look like a button.
- **One label style,** defined once as a token. Sentence case unless it's 1–2
  words, and very few labels overall. No numbered section eyebrows and no ghost
  numerals. Numbers appear only on the loop (01–05), because it is a real
  sequence.
- **The loop is drawn as a cycle.** Act visibly returns to Sense.
- **The AI stack is drawn as strata.** The layers are contiguous, and the base
  reads as the foundation.
- **The command centre is evidence.** It must appear high on the page (how high
  depends on your variant), be readable on a 390px phone (use art-directed
  crops with `object-fit` / `object-position`, or a taller crop, never a 342px
  thumbnail), never crop UI text at its edges, and link the Where / What / How
  explanation to regions of the image with visible markers.
- **Contact:**
  - JS assembles the address from `data-u="kamran"` and `data-d="industechsol.com"`.
    Never write a literal `mailto:` or the full address in the source.
  - The address shows as visible, selectable text, with a **Copy** button
    (`navigator.clipboard`, with a "Copied" confirmation) and an **Email us**
    button.
  - Keep a `<noscript>` fallback: "kamran (at) industechsol.com".
- **Nav:** the active link reflects the section in view and **clears** on the
  hero and contact sections. The mobile menu panel is **opaque**. Include a skip
  link and a visible `:focus-visible` ring.
- **Wrapping text** has line-height ≥ 1.35. Nothing that can wrap gets
  `line-height: 1`.
- **Responsive** from 360px to 1600px with no horizontal scroll. Check 1440×900,
  820×1180 and 390×844. Tap targets ≥ 24px.
- **Motion:** one orchestrated moment at most (the hero entrance or your
  signature element), not fade-up on every section. Wrap all of it in
  `prefers-reduced-motion: no-preference`.
- **Contrast:** AA for all text against its real background.
- **Mock tag:** a small fixed pill at the bottom-left, "Mock <letter> ·
  <name> · ← all mocks", linking to `index.html`. Keep it unobtrusive.

## Design discipline

Load the `frontend-design:frontend-design` skill before designing. In short:
spend boldness in **one** place (your variant's signature), keep everything else
quiet, avoid template tells (caps eyebrows everywhere, the SaaS card kit,
decorative numbering, a `→` on every link, middle-dot meta strings, monospace
data labels), and let structure encode information. Brand constants across all
mocks: the Indus wordmark, the DiPGOS mark, **Gelasio for display**, and amber
`#E8A020` as the action colour.

## The four variants

### A · "Proof up front": the evolution
The closest to today's site, fixed properly. It's the safe choice.

- **Palette:** today's: ink `#0A1424`, navy `#0B182C`, slate `#12233F`, bone
  `#FBF9F4`, steel `#9DB0C4`, amber `#E8A020`.
- **Type:** Gelasio display plus **Schibsted Grotesk** body and UI.
- **Layout:**
  - The hero puts the product inside the first screen. The headline, lead and
    CTAs sit on the left. A readable crop of the command centre (map plus right
    panel) bleeds off the right edge and starts above the fold.
  - The scroll strip goes. The order stays as today.
  - Conviction runs as one column, with the statement as a pull quote.
  - DiPGOS shows the full annotated command centre, with markers 1–3 matching
    the Where / What / How trio.
  - The loop is an SVG **ring** of five stations.
  - The functions become a 3×2 list with no card boxes, sitting on a full-width
    "foundation" bar underneath, so they visibly rest on it.
  - The AI section shows the strata stack. Company has a facts row.
  - Contact comes last.
- **Signature:** the hero image crop entering from the right.

```
[nav ─────────────────────────────── Get in touch]
 The world needs a       ┌───────────────────────
 new way to build.       │ command centre crop  ⟶ (bleeds off edge)
 lead…                   │
 [See DiPGOS] [Get in touch]
```

### B · "The command centre is the page": show, then argue
- **Palette:**
  - Today's ink and slate.
  - Amber for actions.
  - Add the product's own **signal blue `#3E74D6`**, taken from the i-dot and
    the product UI, used only for the image annotations: markers, region
    outlines and the step numbers that pair with them.
- **Type:** Gelasio plus **Hanken Grotesk**.
- **Layout:** reorder the page so the product comes first.
  1. **Hero:** a full-bleed command centre as the stage, darkened toward the
     bottom-left. The headline, lead and CTAs sit in a solid ink panel
     overlapping its bottom-left.
  2. **Scrollytelling:** on desktop the screenshot sticks on the right (about
     60% of the width) while five steps scroll on the left: Where, What, How,
     Action & command, Decision intelligence. Each step outlines its region of
     the image and dims the rest. On phones every step gets its own cropped
     image above its text, with no sticky behaviour.
  3. **The loop:** a closed **racetrack** band, a horizontal rounded track with
     five stations and a return lane. It becomes vertical on phones.
  4. **Functions on the foundation.**
  5. **"Why we built it":** the Conviction copy, now *after* the proof.
  6. **Applied AI:** strata as full-width horizontal bands.
  7. **Company.**
  8. **Contact.**
- **Signature:** the sticky annotated product with region highlighting.

### C · "The loop": an editorial long-read
- **Palette:** deeper ink `#070F1C` base with navy panels, bone text, and amber
  for actions.
- **Type:** **Gelasio for body as well** (line-height ≈1.65, generous measure
  ≈62ch). The UI sans, **Instrument Sans**, appears only in the nav, buttons,
  small labels and captions.
- **Layout:**
  - **Hero:** a split. Headline, lead and CTAs on the left. On the right, a
    large SVG diagram: the **DiPGOS mark as the hub** with the five loop stations
    orbiting on a ring. The loop grows out of the brand mark. A single highlight
    travels around the ring, with the motion only when reduced motion is off.
  - **Body:** a single editorial column with a **margin rail** on desktop. The
    rail holds the running head, which is the section name set small and sticky
    in the left margin.
  - Figures break out wide: the command centre (with markers), the functions
    and foundation, and the strata as a figure with a caption.
  - Pull quotes are large Gelasio.
  - **Company** reads as a short signed statement from the founder: the existing
    prose, then a signature line, with the facts table (placeholders) in the
    margin.
  - Contact is the finale.
- **Signature:** the hub-and-ring loop diagram built from the brand mark.

### D · "Drawing sheet": light, engineering-drawing vernacular
- **Palette:**
  - A **cool** drafting white `#F3F5F8` (not cream), with white `#FFFFFF`
    panels.
  - Ink `#0A1424` text.
  - Blueprint line `#3E74D6` at low alpha for the grid and dimension lines.
  - Amber `#E8A020` fill with ink text, for buttons only. Any amber *text* on
    light must be a darkened amber that passes AA, around `#8A5A00`.
  - The command centre sits in a dark ink "viewport" band. The footer is ink.
- **Type:** Gelasio display plus **Public Sans**, with tabular figures where
  numbers align.
- **Layout:**
  - A strict 12-column grid, faintly visible as column ticks along the page's
    top edge.
  - Small corner radii of 2–4px.
  - **The loop** is a process-flow diagram: stations joined by arrowed
    connectors, with a **return line** routed underneath from Act back to Sense,
    like a flowchart or P&ID. It is horizontal on desktop and vertical on phones,
    with the return line along the side.
  - **The AI stack** is a **civil section-cut**: contiguous layers with
    construction hatch patterns (SVG `<pattern>`), each labelled like a drawing
    callout.
  - **The footer is a drawing title block:** a real bordered table with Company,
    Entities (Pakistan (Pvt) Ltd, USA LLC), Contact, Sheet: industechsol.com,
    and Rev: 2026-09. It encodes real information, not decoration.
  - Dimension-line annotations (thin lines with end ticks) may mark the command
    centre's regions.
- **Signature:** construction-drawing vernacular: the flow diagram, section-cut
  and title block.

## What to hand back

1. The HTML file.
2. Screenshots in `docs/redesign-mocks/shots/`, named `<id>-desktop-fold.png`,
   `<id>-desktop-2.png` … (3–5 desktop screens covering the page),
   `<id>-tablet-fold.png`, `<id>-phone-fold.png`, plus 2–3 more phone screens.
3. A short report of no more than 250 words:
   - the signature, in one line;
   - the design tokens you settled on;
   - anything you deviated on, and why;
   - any placeholders or assumptions;
   - any issue you saw but couldn't fix.

**Critique your own screenshots and fix what you see before reporting.** Check
the phone rendering especially. The owner judges these on a phone as well.
