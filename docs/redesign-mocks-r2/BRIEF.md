# Round-2 mocks: shared brief

## What happened in round 1, and what changes now

The owner reviewed four round-1 mocks in `docs/redesign-mocks/`:

- **Rejected outright:** A ("the evolution") and D (the light drawing sheet).
- **Liked most:** C (the editorial long-read, with a loop diagram grown from the DiPGOS mark).
- **Liked in part:** B (the product-first, annotated, sticky walkthrough).

Overall none of them "seemed right". **The reason: they rearranged the same marketing copy.** The owner wants substance: how a capital project really runs, where P6 EPPM and the rest of the tools fail, and exactly how DiPGOS fixes each failure. The ambition behind it is **to revolutionise the construction industry.**

Round 2 therefore starts from **new, research-backed copy:**

- [`COPY.md`](COPY.md): the single source of all text. Read it in full.
- [`../research/2026-09-25-ec-lifecycle-tools-ontology.md`](../research/2026-09-25-ec-lifecycle-tools-ontology.md): the verdict and the claim sheet. Read the verdict and the claim sheet.
- [`../research/2026-09-25-dipgos-product-truth.md`](../research/2026-09-25-dipgos-product-truth.md): what the product really does. Read §2, §4, §5 and §8.

**Palantir.** Palantir is a reference **only** for the ontology *definitions*: object types, link types and action types. **Do not copy Palantir's site, narrative, tone or visual style.** DiPGOS is a different product, and its design must come from DiPGOS itself.

## Where the design language comes from

The design comes from DiPGOS, its users and its subject:

- **The product's own screens,** in `assets/app-*.png`, which are real captures of the running app. The product's design doc says: "a control room, not a consumer app"; "calm, technical, trustworthy". Status colours are used only for status: green `#22c55e` satisfied, amber `#f59e0b` warning, red `#ef4444` breach. The product's primary buttons are gold/amber. Its brand blue is `#3b82f6` on dark.
- **The site's vocabulary:** work fronts written the way the site writes them ("Blocks 14–15 · EL 922.0–932.2 · Lift 2 · Layer 7"), method-statement limits, record sheets, NCRs, sign-offs.
- **The brand constants:** the Indus wordmark (see `index.html` line 39 and `.wordmark*` in `styles.css`), the DiPGOS mark (`../../assets/dipgos-mark-light.svg`), Gelasio for display type, and amber `#E8A020` as the action colour.

**Structure encodes information.** On this site that means:

- Status colours mark only real verdicts: satisfied, or over by a margin.
- Numbers mark only real sequences: the steps of the day, the lifecycle phases and footnotes.
- Superscript footnotes link each figure to the Sources section at the end of the page. They are part of the credibility, so render them visibly.

## Files and paths

- **Write exactly one file:** `docs/redesign-mocks-r2/<id>.html`. Inline all CSS and JS. A Google Fonts `<link>` is allowed. Touch nothing else, and run no git commands.
- **Brand assets:** `../../assets/command-center.webp` (1912×935), `../../assets/dipgos-mark-light.svg`, `../../assets/constellation-dark.svg`, `../../assets/i-dot.svg`, `../../assets/favicon.svg`.
- **Real product screens:** in `assets/`. Label each as *"From the running system. Pilot data."*

| File | Size | Shows |
|---|---|---|
| `app-atom-manager-home.png` | 1440×900 | The whole catalogue by class, "LIVE · as of 19 Sep 2026", demand and schedule forecast |
| `app-schedule-forecast.png` | 1440×900 | 8-week lanes: who is claimed, out or short, such as "3 × Formwork climb — Block 21" and clashes |
| `app-record-what-happened.png` | 1440×900 | Recording a fault against a unit: "appended, never overwritten — a correction is a new dated row" |
| `app-site-reports-folder.png` | 1920×935 | The day's "Place & Spread RCC — Blocks 14–15 · EL 922.0–932.2 · Lift 2 · Layer 8/9" files, each with an *Evaluate* button |
| `app-evaluate-against-contract.png` | 1920×935 | "The document is reviewed against the contract clause by clause" |

  **`app-site-reports-folder.png` shows staff names** in the ORIGINATOR column, at roughly x 1530–1680 and y 230–460 of the 1920×935 image. You **must** hide them, either with an overlay or by cropping.
- **Recreating the paper form in HTML is encouraged.** Build the RCC-PL "Place & Spread RCC" record sheet: header "PFJV / Descon† · RCC Dam Construction Stage 1 · Method Statement MS-348 · Daily site record". The four checks and their recorded values are listed in COPY §6. Label it *"Recreated from a real record sheet."*
- **Preview server** (already running; do not start another): `http://127.0.0.1:60131/docs/redesign-mocks-r2/<id>.html`.

## Shared requirements

These carry over from round 1: see the "Shared requirements" section of `docs/redesign-mocks/BRIEF.md`. They cover one container; running text ≤ ~65ch; solid amber for actions only; one label token; the contact block with the runtime-assembled address, Copy and Email us, and no literal `mailto:` or address in the source; the nav active state clearing on hero and contact; an opaque mobile menu; a skip link and focus rings; wrapping text with line-height ≥ 1.35; 360–1600px with no horizontal scroll; one orchestrated motion moment inside `prefers-reduced-motion: no-preference`; AA contrast; and the mock tag. Round 2 adds these:

- **Dark theme only.** The owner rejected the light theme.
- **All copy comes from COPY.md.** You may cut, reorder or split sections, and choose between the headline options, but never invent a claim or a figure. **Every figure keeps its footnote.** Include a Sources section, and the † note "Named with the client's permission pending."
- **The voice is revolution backed by proof.** The ambition lands hard at the top, and every bold line is followed within a screen by something concrete.
- **Show the real product.** Use the command centre and at least two of the `app-*.png` screens, each annotated with markers tied to the text.
- **The phone matters.** The owner reviews on a phone. Keep the phone page under about 13 screens (844px each). Cut sections for phones if needed, and say which ones in your report.
- **Mock tag:** "R2 · <letter> · <name> · ← all mocks", linking to `index.html`. On phones it must not cover content: position it absolutely under the nav, not fixed at the bottom.

## Design discipline

Load the `frontend-design:frontend-design` skill before designing. Spend boldness in **one** place, which is your variant's signature. Avoid template tells: caps eyebrows everywhere, the SaaS card kit, decorative numbering, a `→` on every link, middle-dot meta strings, and monospace used for decoration. Middle dots are fine *inside a work-front name*, because that is how the site writes them.

## The four variants

### R2-A · "The record": editorial long-read (C, evolved)

- **Type:** Gelasio for body and display (C's liked register); Instrument Sans for UI only.
- **Palette:** deep ink `#070F1C`, navy panels, bone text, amber for actions, and status colours for verdicts only.
- **Layout:**
  - A single reading column, with a **margin rail** on desktop. The rail carries the running head and the **sidenotes**: each footnote's source appears in the margin beside its claim, like a well-edited report. On phones, sidenotes collapse to tap-to-reveal superscripts.
  - **Hero:** headline R1, then C's **hub-and-ring diagram grown from the DiPGOS mark**. The ring now carries the **real six steps of the day** from COPY §6: Paper → Read → Checked → Owned → Decided → Counted, with Counted returning to Paper for the next layer.
  - The page then runs as chapters: stakes → how a project runs → where the stack breaks → the model → one day → screens → AI → principles → company → contact.
- **Signature:** sidenote citations, plus the ring of the real day.

### R2-B · "The work front": the product proves it (B, evolved)

- **Type:** Gelasio display, Hanken Grotesk body.
- **Palette:** ink/slate, amber for actions, the product blue `#3b82f6` for annotations, and status colours for verdicts.
- **Layout:**
  - **Hero:** the headline (R3 or A) in an ink panel over the real command centre, as in B.
  - **Centrepiece, the sticky "one day on a work front" scrollytelling.** On the left, the six timestamped steps scroll. On the right, a sticky pane shows the system's state at each step:
    1. the recreated paper sheet;
    2. the sheet matched to its work front;
    3. the check table filling in, with margins going red or green;
    4. three NCR cards, each with its owner;
    5. the sign-off with its reason;
    6. the 820 m³ counting against the baseline.
  - A "the same day, in a typical stack" contrast strip follows.
  - After it, a gallery of real annotated screens (masking the names).
  - Then stakes, where the stack breaks, the model, principles, company and contact.
  - On phones, the sticky pane becomes an inline state card after each step.
- **Signature:** the scrollytelling day.

### R2-C · "The model": ontology first

- **Type:** Gelasio display, IBM Plex Sans body. IBM Plex Mono is allowed **only** for object-type identifiers such as `Operation`, `WorkFront` and `Atom`, because those names are identifiers.
- **Palette:** near-black `#05080F`, a single hairline colour, amber for actions, and status colours for verdicts.
- **Layout:**
  - **Hero:** headline R1 or R2, beside an **explorable object graph of one real work front**: Project → Contract → Scope → Activity → Process → Operation "Place & spread RCC" → Work front "Blocks 14–15 · EL 922.0–932.2 · Lift 2 · Layer 7", with its Atoms (RCC mix, dump truck, dozer, operator) and its Run, Data points, NCR and Decision. Hovering or tapping a node shows its properties and its verbs. It must work on touch, with a readable list fallback on phones.
  - The page then walks through, in order:
    1. **nouns;**
    2. **relations** (performed at / precedes with lag / requires with quantity / needs);
    3. **verbs;**
    4. **"the method statement becomes the model",** set as a spec sheet of MS-348 limits;
    5. **"one verdict per discipline",** a ring of the nine owners labelled *in development*;
    6. **the day;**
    7. **the real screens;**
    8. **the stakes and where the stack breaks,** placed later as "why it matters";
    9. company and contact.
- **Signature:** the explorable graph, built from the product's real vocabulary.

### R2-D · "The lifecycle": the whole project, and where DiPGOS stands in it

- **Type:** Gelasio display, Instrument Sans body.
- **Palette:** ink/navy, amber for actions, and status colours for verdicts.
- **Layout:**
  - **Hero:** headline R2 over a full-width **lifecycle band**: Feasibility (FEL 1) → Scope (FEL 2) → Front-end design (FEL 3) → Tender & bid → Detailed engineering → Procurement → Construction → Commissioning & handover → Operations. The DiPGOS coverage is marked on the band: CPDS at tender, ACCS at construction, AOS (planned, dimmed) at operations.
  - On desktop the band becomes a **slim sticky rail** under the nav that fills in as you scroll through the phases.
  - Each phase gets a compact chapter with *Decides / Lives in today / Breaks when* (COPY §3), plus the four-party strip.
  - At **Construction** the page opens up into the deep dive: where the stack breaks (§4), the model (§5), one day (§6) and the screens (§7). **Tender** carries CPDS in brief, and **Operations** says honestly that AOS is planned.
  - Then AI, principles, company and contact.
  - On phones the rail becomes a compact progress bar with the current phase's name.
- **Signature:** the lifecycle rail with DiPGOS's coverage on it.

## What to hand back

1. The HTML file.
2. Screenshots in `docs/redesign-mocks-r2/shots/`:
   - `<id>-desktop-fold.png` and `<id>-desktop-2` to `-6`, covering the page;
   - `<id>-tablet-fold.png`;
   - `<id>-phone-fold.png` and `<id>-phone-2` to `-5`.
3. A report of no more than 250 words:
   - the signature, in one line;
   - the tokens you chose;
   - which COPY sections you used, cut or split, and the phone cuts;
   - any deviations, and why;
   - any issue you saw but couldn't fix.

**Critique your own screenshots and fix what you see before reporting**, the phone rendering above all.
