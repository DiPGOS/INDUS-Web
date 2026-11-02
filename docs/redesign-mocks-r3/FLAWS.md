# Why 7 of 8 mocks failed, and what R1-C got right

A design critique to brief round 3. Evidence comes from the screenshots in
`../redesign-mocks/shots/` (R1) and `../redesign-mocks-r2/shots/` (R2), and from
the mock HTML. "Words" means visible body text, with CSS, JS and SVG stripped.

Screens reviewed:
- **c-loop:** all of them (desktop fold, 2–5; phone fold, 2–4; tablet fold).
- **r2a-record:** desktop fold, 2–6; phone fold, 3, 4.
- **Every other mock:** desktop fold plus 2–3 more desktop shots, and phone fold plus 1 more phone shot.

## 0. The finding that reframes everything

**In round 1 the copy was the same in every mock.** A, B, C and D all open with
"The world needs a new way to build.", the same 45-word lead, the same CTAs and
the same sections (each has about 980–990 words). The owner still loved C,
strongly disliked A and D, and only partly liked B. **So round 1 was a purely
visual test, and C's visual system won.** Compare `a-proof-desktop-fold.png` with
`c-loop-desktop-fold.png`: the headline is identical, but A has a sans body and a
desert screenshot where C has a serif body and the luminous mark-diagram. The
owner rejected A.

Round 2 then changed the variable he had *not* objected to, the copy:

- Words went up 2.3–2.8× (R2-A 2,774; B 2,636; C 2,265; D 2,723).
- Sections roughly doubled, from 5 h2s to 9–13.
- About 10–11 † markers per page, and "Pilot data" labels 4–9 times per page.

Round 2 also kept everything that made the mocks look alike. The likeliest
reading of "they don't seem right" is this: **R2 turned a brand page into a
research report, and all eight pages still look like one template.**

## 1. What makes R1-C work

Shots: `c-loop-desktop-fold.png`, `-tablet-fold.png`, `-phone-fold.png`, `-desktop-4.png`.

1. **One sentence, very large.** The h1 is `clamp(44px, 5.6vw, 86px)/1.04`,
   about 80px at 1440. Its 8 words set in 3 lines of 2–4 words each, filling
   about 480px of a 1300px container. Nothing sits above it: no kicker, eyebrow
   or badge.
2. **Three tiers in the hero, no more:** headline, then the serif lead
   (20px/1.65, about 45 words), then the CTAs. The italic tagline sits below a
   hairline as a quiet coda.
3. **A colour rhyme carries the eye.** Amber appears only on "build.", on the
   hub of the mark, on one arc of the ring and on the primary CTA. So the eye
   goes headline, then amber "build.", across to the amber hub at the same
   height, then round the ring, then back down to the amber button. It is a
   closed loop on the page that echoes the loop in the diagram.
4. **The diagram is an emblem, not an explanation.** The ring grows out of the
   DiPGOS mark, so it is *owned* imagery that no competitor could reuse. It has
   five single-word serif verbs (Sense, Understand, Foresee, Adapt, Act). Each
   verb has one short sans line, and you don't need to read those lines to get
   the picture. There are no figures, units or codes in the fold.
5. **Universal idea, not domain procedure.** "Sense → Act" reads as a thinking
   system to any CEO. It sells ambition and intelligence, not compliance.
6. **The serif body sets the register.** Gelasio is used for the reading text
   too, not just the display type. The page reads as an essay or manifesto
   rather than SaaS. This is the main visible difference from A (Schibsted) and
   B (Hanken), which carry the same words.
7. **Slow rhythm.** Sections are padded `clamp(64px, 8vw, 116px)` and each one
   makes a single point. The h2s are aphorisms at about 58px
   (`c-loop-desktop-4.png`: "AI can only act on ground it understands. We
   build the ground."). Each section has one figure at most, and the page has
   5 h2s.
8. **Dark, deep and calm.** The ink is near-black navy, with one soft radial
   light behind the hub and no textures. The product screenshot comes second
   (`c-loop-desktop-2.png`), after the idea has landed.

## 2. What R2-A lost, though it was meant to be "C evolved"

Compare `r2a-record-desktop-fold.png` with `c-loop-desktop-fold.png`.

| | R1-C | R2-A |
|---|---|---|
| H1 | 8 words, about 80px, 3 lines | 13 words, about 60px (`clamp(40px, 4.2vw, 62px)`), 5 lines |
| C's line | It is the h1 | Demoted to a small italic kicker above the h1 |
| Hero tiers | 3 | 6 (mock pill, kicker, h1, sub, CTAs, "Running on…†" proof line) |
| Ring labels | 5 one-word verbs | 6 verbs, plus timestamps, plus codes ("06:40 RCC-PL sheet", "820 m³", "3 NCRs raised") |
| Figures and codes in fold | 0 (only 01–05) | About 17: six timestamps, 820 m³, 1/3/3, Blocks 14–15, EL 922.0–932.2, Lift 2, Layer 7, Stage 1, Blocks 12–24, EL 898–990, † |
| Colour | Amber only | Amber, plus green and red in the hero ("1 satisfied, 3 over"), plus amber handwriting ("next layer") |
| Idea | How a project *thinks* | How one RCC layer gets inspected in a day |
| Words / h2s | 991 / 5 | 2,774 / 10, plus a Sources section |

What changed in substance:
- **The emblem became a schematic.** You now have to *read* the ring
  (timestamps, units, verdict colours) and then a caption decoding
  "Blocks 14–15 · EL 922.0–932.2 · Lift 2 · Layer 7".
- **The metaphor broke.** One day of inspections is a line, not a cycle. "Counted
  returns to Paper" is forced, and it shows.
- **The scale of the ambition shrank.** The page went from "a new way to build"
  to concrete QA paperwork. For an owner who wants Palantir-level ambition, the
  hero now pitches a site-inspection app.
- **It opens on failure.** The first section after the hero is a stat wall:
  96%, 16 years, 59% of Pakistan's projects late, 98%
  (`r2a-record-desktop-2.png`). It has margin citations to arXiv and McKinsey.
  It reads like a consultant's deck. It may also be awkward for a Pakistani
  vendor selling to Pakistani public clients.
- **It reads like a report.** There is a 9-row × 4-column phase table
  (`-desktop-3.png`), a paper form in a fake-handwriting font (Caveat,
  `-desktop-4.png`) and a "Sources, numbered as cited" appendix
  (`-desktop-6.png`).
- **Hedges sit everywhere:**
  - "name pending†" on the product screenshot;
  - "From the running system. Pilot data.";
  - "(Illustrative timeline…)";
  - "Recreated from a real record sheet".

  Each one is honest, but together they say "not real yet" (`-desktop-4.png`,
  `-desktop-5.png`).
- **The nav tells you it's long.** "The problem / The model / One day / The
  system" is a table of contents. C's nav (DiPGOS / Conviction / Applied AI /
  Company) named brand-level destinations.

## 3. Flaws across the rejected mocks, ranked by likely impact

1. **Density and length (all of R2).** About 2.3k–2.8k words, 9–13 sections,
   footnoted stats, tables, spec sheets and timelines. The owner reviews on a
   phone, and every R2 phone page is a long scroll of small numbers
   (`r2a-record-phone-3.png`, `-phone-4.png`; `r2b-workfront-phone-3.png`;
   `r2d-lifecycle-phone-3.png`). A brand site needs a few ideas that land, not
   a dossier.
2. **Domain jargon in the most valuable spots.** Heroes and first sections are
   full of terms like these:
   - RCC, EL 922.0–932.2, NCR, MS-348;
   - FEL 1–3, CPDS / ACCS / AOS;
   - `PERFORMED_AT`, `Atom`, "Data point".

   Examples: `r2c-model-desktop-fold.png`, `r2c-model-phone-2.png`,
   `r2d-lifecycle-desktop-fold.png`. Owners and project directors buy outcomes.
   The vocabulary should be proof *below* the fold, never the headline.
3. **Sameness.**
   - **R1:** all four mocks share the same hero copy.
   - **R2:** all four share the same kicker ("The world needs a new way to
     build."), the same sub ("Every pour checked against the method, owned by a
     named engineer…"), the same CTA ("See a day on a work front") and the same
     "Running on an RCC dam…†" line. See the four `r2*-desktop-fold.png` shots.
   - **Visually,** seven of eight use the same navy ink, Gelasio 600 headings,
     amber pill CTA beside an outlined pill, right-aligned nav with an outlined
     "Get in touch", and the same bottom-left mock pill.
   - **Net:** the owner saw two hero texts in eight layouts. Nothing felt like a
     new idea, which reads as "AI slop".
4. **Credibility clutter on a brand page.** Every one of these is an apology:
   - **R2:** 10–11 † per page, "Pilot data" 4–9 times, "Names hidden" overlays,
     "name pending", "Illustrative";
   - **R1:** dashed amber "needs owner input" boxes (`c-loop-desktop-5.png`
     has four in one panel; `a-proof-phone-3.png`; `b-canvas-phone-fold.png`).
5. **Weak imagery.** The only image the mocks have is the command centre
   screenshot:
   - It shows a beige-grey desert with small blue pins. As a hero
     (`a-proof-desktop-fold.png`, `b-canvas-desktop-fold.png`,
     `r2b-workfront-desktop-fold.png`) it reads as "sand plus dashboard",
     with low contrast and unreadable 9px UI text.
   - On phones it crops to sand and a sliver of panel (`a-proof-phone-fold.png`,
     `b-canvas-phone-fold.png`, `r2b-workfront-phone-fold.png`).
   - There is no photography anywhere of dams, concrete, cranes, people or
     scale, and no site photos exist in `assets/`.
6. **Text-box diagrams.** Most "diagrams" are labelled rectangles:
   - the AI strata in A, B, C and D (`a-proof-desktop-4.png`,
     `b-canvas-desktop-5.png`, `c-loop-desktop-4.png`, `d-sheet-desktop-4.png`);
   - D's loop as a flowchart of boxes (`d-sheet-phone-3.png`);
   - B's racetrack (`b-canvas-desktop-4.png`);
   - R2-C's graph of monospace chips;
   - R2-D's band of 9 tiles.

   They look like PowerPoint. C's mark-ring is the only diagram that works as
   an image.
7. **Weak typographic hierarchy in R2 heroes.** The h1 is smaller (about 60px)
   and longer (11–15 words) than C's. A kicker, a bold sans sub and a body
   paragraph compete with it. `r2c-model-desktop-fold.png` has six text tiers
   before the CTA, and R2-D's hero sub and body sit side by side at nearly the
   same weight (`r2d-lifecycle-desktop-fold.png`).
8. **Wrong emotional register.** R2 leads with blame (overruns, "run late as a
   rule", "None of them runs it") and procedure. C led with conviction and
   capability. The owner's stated ambition is to *revolutionise*, and a
   failure-stat wall reads as a consultancy, not a category leader.
9. **Mobile problems.**
   - The ring is cropped across the bottom of the first screen and then
     repeated as a list (`c-loop-phone-fold.png`, `-phone-2.png`; the R2-A
     phone fold does the same).
   - R2-C's graph turns into chip soup (`r2c-model-phone-2.png`).
   - R2-D's sticky phase bar costs about 100px of every screen
     (`r2d-lifecycle-phone-3.png`).
   - R1's fixed mock pill overlaps body text (`a-proof-phone-3.png`,
     `c-loop-phone-4.png`), and B's boxed hamburger is heavy.
10. **Light theme (D).** Rejected outright. Blueprint grid, hatching and tick
    marks read as a CAD template (`d-sheet-desktop-fold.png`,
    `-desktop-4.png`).

## 4. AI-slop tells already present in C (do not carry forward)

- **The glowing orb:** a radial blue glow behind the hub (`hubglow` /
  `dotglow` gradients) and pale glowing node balls. This is the generic
  "neural network constellation" look. Keep the mark; drop the bloom, or make
  it far subtler.
- **Pill everything:** CTAs, nav "Get in touch", the mock tag and the
  Where/What/How markers on the screenshot (`c-loop-desktop-2.png`) are all
  999px-radius pills.
- **Circled numerals 01–05** on the ring and in the phone list. The verbs carry
  the order already.
- **The bold run-in label formula**, repeated on every caption: "**How it
  thinks.** A living loop…", "**What it connects.** …", "**Where you run it.**
  …".
- **The 3×2 bordered function grid** (`c-loop-desktop-3.png`), the SaaS
  feature grid by another name, plus a foundation bar on a tinted panel.
- **The stacked-box AI strata** with "Stands on" connectors and a hatched base
  (`c-loop-desktop-4.png`).
- **Cliché aphorism pairs:** "X can only Y. We build Z." and "We lived the
  problem before we built the answer." Fine once per page, tiring three times.
- **Mission inflation in the lead:** "eight billion people". It is generic, and
  every climate or infra startup says it.
- **The section-name running head** in a left rail ("DiPGOS", "Applied AI",
  "Company" in `c-loop-desktop-2…5.png`). It mostly duplicates the nav and
  leaves a dead 150px column.
- **Empty half-screens:** a left-aligned paragraph with nothing to its right
  (`c-loop-desktop-3.png`, `-desktop-4.png`). It looks unfinished rather than
  deliberate.

## 5. Do / Don't for round 3

### Do
1. **Keep C's hero formula.** One serif sentence of 6–10 words at 80–96px
   desktop and 44–52px phone, 2–3 lines. Under it, one serif lead of no more
   than 35 words, then two CTAs. Nothing above the h1.
2. **Keep amber scarce and rhyming:** one word in the h1, the mark's core, the
   primary CTA. Never green or red above the fold.
3. **Make the DiPGOS mark the hero image,** as C did, and push it further: draw
   it bigger and crisper, or let it animate once. Treat it as the brand's
   emblem, not a chart.
4. **Use Gelasio for reading text** (lead, ledes, pull quotes). Keep the sans to
   UI, labels and captions.
5. **Cap the page at about 1,000–1,200 words and 5–6 sections.** Each section
   gets one claim, one supporting line and one visual. Phone pages should run
   under 9 screens.
6. **Order the page vision, then capability, then proof, then people.** Product
   specifics (work fronts, method-statement checks) go in one proof section,
   told in plain English ("every pour checked against the method") and shown
   with one strong visual.
7. **Use one real number per proof section at most,** set large, with its
   source in a single "Sources" link in the footer. Use no inline † or
   superscripts.
8. **Use real-world photography.** Commission or obtain one or two
   full-bleed photographs of the owner's own sites, such as a dam face at dusk,
   an RCC lift or a site office. Ask the owner, and never use stock.
9. **Show the product as a hero-quality crop.** Use a tight, legible crop with
   a dark UI area and large type (for example the schedule-forecast lane or the
   evaluate dialog). Never use the full desert map at thumbnail scale.
10. **Draw diagrams as images:** lines, the mark and space. Where structure is
    a list, set it as typography (a large numbered list or a table set like a
    book), not boxes.
11. **Make each mock structurally different,** with different hero copy, a
    different visual device and a different section order. Write a one-line
    "what's different" for each before building.
12. **Lead with conviction.** "We're building the operating system for how the
    world builds" beats "megaprojects run late". At most one problem stat, after
    the vision.
13. **Use plain buttons:** 6–8px radius, or text links with a rule for the
    secondary action. Use one style of CTA throughout.
14. **Design the phone fold first.** The headline, lead and a complete, uncropped
    emblem or image should fit 390×844. Never repeat a diagram as a list just
    after it.
15. **Name nav items as destinations,** for example DiPGOS, Mutlashi (AI),
    Company, Contact, never as a table of contents.

### Don't
1. **Don't put codes or units above the fold:** no EL, RCC, NCR, MS-, FEL,
   timestamps, m³ or †.
2. **Don't add hedges to the page:** no "Pilot data", "Illustrative", "name
   pending", "needs owner input" or "Names hidden" in the visible design. Put
   placeholders in a separate review note, or use neutral real copy.
3. **Don't put a kicker or eyebrow above the h1,** and don't demote the
   strongest line to a kicker.
4. **Don't use stat walls** (a 2×2 or 4-row grid of big percentages), the
   classic AI landing-page block.
5. **Don't use stacked-box or tile diagrams** (strata boxes, phase tiles,
   racetracks, flowchart rectangles, monospace chip graphs).
6. **Don't use a 3×N bordered feature grid,** whatever it's called.
7. **Don't use glow, bloom, orbs or constellation dots,** and no radial
   gradient blobs behind content.
8. **Don't make every element a pill:** buttons, tags, markers and the mock tag.
9. **Don't use circled or zero-padded numerals** as decoration (01–05, ①–⑥).
10. **Don't use handwriting or "authentic" fonts** (Caveat, Kalam) or monospace
    for flavour.
11. **Don't repeat the run-in "Bold label. Sentence." caption formula** on every
    figure.
12. **Don't use the desert command centre screenshot as a hero,** or at a
    width below 900px.
13. **Don't put tables, spec sheets, timelines or a Sources appendix** on the
    brand homepage. Those belong on a later DiPGOS or "How it works" page.
14. **Don't use the light theme or blueprint/CAD textures** (grid, hatching,
    tick marks).
15. **Don't ship mocks that share hero copy or the same nav and CTA kit.** If
    two mocks could swap headlines unnoticed, one of them isn't a direction.
