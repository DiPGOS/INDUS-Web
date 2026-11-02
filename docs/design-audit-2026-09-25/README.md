# Design audit: industechsol.com

**Date:** 2026-09-25
**Build audited:** live site, which matches `main` at `2d291c6` (hero-mark rotation is deployed)
**Viewports:** 1440×900 desktop, 820×1180 tablet portrait, 390×844 phone (touch, DPR 2)
**Screens:** [`shots/`](shots/). `d*` is desktop, `t*` is tablet, `m*` is phone.

## Scope

The August audit (`02c9b07`) found defects: the underline overflowing on phones,
the hero overshooting the fold, the contrast floor, the landmarks and the no-JS
contact path. All of those are fixed and under test. They stayed fixed in this
pass, so this audit leaves them out.

This audit asks something different: **does the design do its job?** That job is
to make an engineering-and-construction buyer believe Indus has built something
real, and to get them to write in. It covers hierarchy, typography, colour
meaning, layout, content order and copy. Six small new defects turned up along
the way and are listed at the end.

## Verdict

The site has a confident voice and a strong typographic opening. It is clean and
accessible. It is also *all argument and very little evidence*.

- **Evidence arrives late.** The one piece of real evidence, the command-centre
  screenshot of a live dam project, sits more than halfway down the page. On a
  phone it shrinks to a thumbnail nobody can read.
- **The closing step is fragile.** The only way to make contact is a `mailto:`
  button that never shows the address.
- **The design system has gone loose.** Amber, all-caps labels and highlighted
  phrases are each used so often that none of them signals anything any more.
- **The body typeface is Arial,** which works against the care in the headlines.

Almost everything below is a subtraction or a reorder, not new decoration.

## What to keep

- **The hero headline.** Gelasio at 128px with tight tracking is the page's best
  moment and does not look templated.
- **The palette.** Ink/navy with one warm accent suits the subject: blueprint
  and site lighting, not SaaS. The contrast floor is well engineered.
- **The command-centre screenshot.** Real product and a real project (Diamer-Basha
  is visible in its breadcrumb). This is the strongest asset on the site.
- **The loop numbering (01–05).** It is a real sequence, so the numbers carry
  meaning. The staggered bar pulse under the cards is a good quiet idea.
- **The copy voice, where it is concrete.** "We're not software people guessing
  at the industry. We're industry people building the system we always needed."
- **Motion discipline.** Reduced motion, hover gating and the slow mark rotation
  are all done properly.

---

## P1: the page's job

### 1. The proof is buried
The command centre starts at **y≈4,450px on desktop (54% of the page)** and at
**y≈5,517px on a phone (61%)**. Before it the visitor reads about five screens of
manifesto: conviction, "operating system", loop, function cards, foundation. A
sceptical buyer is asked to accept the claim for five screens before being shown
anything.

**Fix:** Put a crop of the command centre in the hero, or directly under it,
next to "See DiPGOS". Let section 02 open on the full image and explain it,
instead of explaining first and showing last. The conviction copy survives the
move and reads better once the reader has seen the product.

### 2. The command centre can't be read on phones, and is cropped everywhere
- On a phone the image renders at **342×168px**, so the UI text is about 2–3px
  tall ([m04](shots/m04.png)). The one proof moment becomes a texture.
- `.frame img` scales to 1.04 for the parallax. That crop cuts UI text at the
  edges: the breadcrumb reads "TFOLIO", the right panel reads "Planned: 7",
  and the left rail's icons are sliced ([d06](shots/d06.png), [d07](shots/d07.png)).
- The trio beneath (*Navigate / Action & command / Decision intelligence*)
  explains the screen, but nothing links each column to a region of the image.

**Fixes:**
- Serve a mobile crop through `<picture>`: the map plus the right-hand panel,
  legible at 350px.
- Keep the scale-and-parallax headroom out of the UI's text edges, or drop it.
- Add three small numbered markers on the image that match the trio columns, so
  "Where / What / How" point at something.

### 3. The contact step depends on a mail client and never shows the address
- The site's only conversion is a `mailto:` button. The address is never shown
  on screen, which is by design, because the address is kept out of the source.
- Visitors on webmail with no desktop mail client click the button and
  **nothing happens**, with no fallback they can see. For a B2B audience that is
  a meaningful share of people.
- The same action has four names: *Get in touch* (nav, hero, footer),
  *Contact Us* (the actual button) and *Let's Build* (its label).

**Fixes:**
- Show the assembled address as text beside the button, with a copy control.
  JS still builds it at runtime, so it stays out of the source and the
  `mailto` test.
- Label the button for what it does: **Email us**.
- Use one name for the action everywhere.

### 4. The Company section asserts experience but shows none
"Built by engineers and builders who spent their careers inside real projects"
is followed only by a founder's name and title ([d09](shots/d09.png)). No
projects, years, sectors, team or locations appear. Two legal entities (Pakistan
and USA) are mentioned only in the footer. Meanwhile the screenshot shows a
flagship dam that the copy never names.

**Fix:** Add three or four hard facts: projects delivered or run on DiPGOS
(name Diamer-Basha if that is cleared), years in the industry, and where the
team works. *This needs input from the owner. See the open questions below.*

---

## P2: the design system

### 5. Every heading highlights a phrase in amber
There are **nine** amber phrases: *build*, *machine that builds it*,
*operating system*, *begins to think*, *one system*, *you approve*,
*We build the ground.*, *application layer* and *gets built*. Every h2 has one
except Company's. That is the most common tell of a templated page. Once every
heading has one, the device stops signalling anything, and it spends the colour
the buttons need (see #6).

**Fix:** Keep it in the hero ("build.") and in the contact bookend ("gets built.")
so the two rhyme. Remove it everywhere else. In section 01 keep the underline
*or* the amber, not both.

### 6. Solid amber means "button" in some places and not in others
In the hero, a filled amber pill is the primary action. The page then shows two
filled amber blocks that can't be clicked: the **Act** loop card and the
**Applied AI** stack card ([d04](shots/d04.png), [d08](shots/d08.png)). The
foundation chips (*Productivity / Quality / Health & safety*) are filled,
rounded and bold, so they look like buttons too.

**Fix:** Reserve filled amber for actions only. Mark *Act* and *Applied AI* with
an amber rule or border on slate instead. Give the chips a flat outline or plain
text style so they don't read as buttons.

### 7. There are more than 20 tracked all-caps labels, in 7 different sizes
- Label roles run at 10, 11, 11, 11, 12, 12 and 13px, with letter-spacing
  between 1.6 and 3px. It is one role with no token behind it.
- The top of section 02 stacks four lines of caps before the headline on a
  phone: *02 — THE OPERATING SYSTEM*, then the lockup, then
  *PROJECT / OPERATING SYSTEM* ([m02](shots/m02.png)). Two of those labels say
  the same thing.
- A full sentence is set in tracked caps: *FUNCTIONS THAT RUN THEMSELVES —
  DRIVEN BY THE WORK, APPROVED BY YOU*. It wraps on phones with
  `line-height: 11px` on 11px type, so the two lines touch ([m03](shots/m03.png)).

**Fixes:**
- Define one label token.
- Delete any label that restates its heading: the section eyebrows whose text
  repeats the h2, the lockup tag, and "The foundation · it all starts here".
- Set anything longer than three words in sentence case.

### 8. The body typeface is Arial
`--sans: Arial, Helvetica, sans-serif` sets every paragraph, button, nav item and
label, which is about 80% of the text on the page. Gelasio headlines over Arial
body read as "serif chosen, sans defaulted".

**Fix:** Choose a sans on purpose, preferably one with some engineering
character: Schibsted Grotesk, Hanken Grotesk, Public Sans or IBM Plex Sans. Load
one variable file (~25–40KB) with `font-display: swap`. Alternatively, run body
copy in Gelasio and keep the sans for UI only.

### 9. The nav and hero sit on a different grid from the rest of the page
At 1440px, the nav and hero content run from **x=121 to 1305**. Every section
and the footer run from **x=73 to 1353**. The left edge jogs 48px at the fold,
and the nav wordmark doesn't line up with the footer wordmark below it
(`.hero__inner` pads 48px inside `--max`; sections use `--gutter`).

**Fix:** Use one container rule for everything.

### 10. Prose lines run long
- At desktop, `.lead`, `.prose`, `.split__col`, `.ai-prose` and `.company__prose`
  set about **88–92 characters per line**.
- At tablet portrait (820px) the max-widths never engage, so lines reach
  **94–106 characters** ([t01](shots/t01-fold.png)).
- The hero lead is fine (about 60 characters at desktop), but reaches about 86
  on a tablet.

**Fix:** Cap running text at about `65ch` (roughly 38em) whatever the viewport.

### 11. Section 01 uses five emphasis devices at once
Section 01 uses `<b>`, `.hi`, `.hi-soft`, `.accent` and `.underline`. Its two
columns also use opposite schemes: the left column is all bone-white, while the
right is steel grey with white highlights ([d02](shots/d02.png)). They read as two
different treatments rather than one argument in two halves.

**Fix:** Use two emphasis levels at most: body, plus one highlight. Give both
columns the same base colour.

### 12. The section numbers and ghost numerals don't encode anything
Sections 01–04 are not a sequence the reader follows. Their numbering
competes with the loop's 01–05, which *is* a sequence. The ghost numerals sit at
3.5% amber. They are barely visible on ink, but show clearly on Company's
lighter navy, where they look like a rendering smudge
([d09](shots/d09.png)). The previous audit added ghosts to 02–04 to make 01's
look intentional. The better fix is to remove all four.

**Fix:** Drop the section numbers and ghosts, and let the loop own numbering.

### 13. The "living loop" is drawn as a straight line
The copy says "A living loop runs continuously… each turn makes the next
sharper". The design shows five cards in a row, or on a phone five full-width
cards stacked 839px tall. Nothing brings *Act* back to *Sense*. This is the
product's central idea and the natural place for the page's one signature
visual.

**Fix:** Draw it as a cycle: a ring or closed track on desktop, and on a phone a
compact numbered list with a visible return from 05 to 01. Keep the bar pulse,
running around the ring.

### 14. The AI "stack" reads as a list, not as layers
The three foundation layers are separate cards with gaps between them. Only the
top card has a "stands on" connector ([d08](shots/d08.png)), so nothing says
that Physics supports Relationships, which supports Semantics.

**Fix:** Butt the layers together as strata, with shared borders, no gaps, and
the widest or darkest at the bottom. Keep one "stands on" between the AI layer
and the ground.

### 15. The page is long and repeats itself
- The phone page is **9,076px, about 10.8 screens**. The DiPGOS section alone is
  **4,093px** (4.8 screens).
- The six function cards stack to 644px for six five-word lines.
- *Operating system* appears four times in visible copy, twice in the
  eyebrow-plus-lockup at the top of 02. Phrases like *one place*,
  *one live picture*, *one system* and *single* appear ten times.
- There are four slogans: the hero tagline, *Let's Build*, the footer tagline
  and the footer motto.

**Fixes:**
- Lay the function cards out two across on phones, as a compact list.
- Cut the repeated "one system" phrasing to about three instances.
- Keep one tagline and one motto.

### 16. Casing and spelling are inconsistent
- **Casing:** *Physics & Operational Sciences* is title case, while its siblings
  are sentence case (*Semantic & knowledge layer*). The same split appears in
  *Resource Manager* versus *Health & safety*, *Contact Us* versus
  *Get in touch*, and the footer's *Shaping the Future of Engineering &
  Construction*.
- **Spelling:** US and UK spellings are mixed, sometimes in one sentence. The
  command-centre alt text says "command **center** … at the **centre**", with
  *programme* and *epicentre* alongside *civilization* and *center*.

**Fix:** Use sentence case everywhere and pick one spelling standard.

### 17. The hero mark crowds the text on narrow screens, and the tablet hero is empty
- At 390px the mark sits behind the lead paragraph, and the ghost *Get in touch*
  button lands on the mark's core, so a transparent button sits on a busy
  shape ([m01](shots/m01-fold.png)).
- At 820×1180 the hero centres its content vertically, which leaves about 270px
  of empty navy above the headline ([t01](shots/t01-fold.png)).

**Fixes:**
- Under 700px, make the mark smaller and move it below the CTAs, or give the
  ghost button a solid ink fill.
- Top-align the hero on tall portrait viewports.

---

## New defects (small, measurable)

| # | Defect | Evidence | Fix |
|---|---|---|---|
| D1 | **The active nav link goes stale.** It shows the last active section when you're back at the hero, and shows *Conviction* after a jump to Contact. | `main.js:230-237` acts only on `isIntersecting`, never clears, and doesn't observe the hero or contact sections. Reproduced: top of page → *Company*; 0→7400 jump → *Conviction*. | Clear all links when no linked section is in the band, e.g. observe hero and contact too and map them to "none". |
| D2 | **Headline visible through the open mobile menu.** | [m06](shots/m06-menu.png). The panel is `rgba(ink,.96)` with `backdrop-filter`. Its parent `.nav` has its own `backdrop-filter`, so the panel's blur most likely can't reach the page behind it (Backdrop Root), and the 4% leak shows crisp text. | Make the open panel opaque (`var(--ink)`). |
| D3 | **Wrapping labels have `line-height: 1`.** The hero tagline (12.5/12.5) wraps on phones with an orphaned "up."; the `.kicker` lines touch. | [m01](shots/m01-fold.png), [m03](shots/m03.png) | Line-height ≥1.4 on anything that can wrap; `text-wrap: balance` on the tagline. |
| D4 | **The "SCROLL ↓" arrow sits below the text baseline** at every tier. | [desktop fold](shots/desktop-1440-fold.png), [m01](shots/m01-fold.png) | Align the flex items to the baseline, or nudge the arrow up. |
| D5 | **The command-centre crop cuts UI text.** | See #2. | Covered by #2. |
| D6 | **A stray constellation fragment at the 01→02 seam** reads as a slider or progress bar. | [d03](shots/d03.png) | Shift the `section__bg` offset so no lone edge sits in empty space. |

## Suggested order

1. **Quick fixes, about an hour, no content decisions:** D1–D4 and D6, one
   container (#9), prose measure (#10), label line-heights, casing and spelling
   (#16), opaque menu. Guard each with a symptom test, as the suite already does.
2. **System pass, about half a day:**
   - Amber only on actions (#6).
   - Accent phrases cut to two (#5).
   - One label token and fewer labels (#7).
   - Two emphasis levels (#11).
   - Section numbers and ghosts removed (#12).
   - Body typeface (#8).
3. **Structure, which needs owner input:**
   - Proof moved up (#1).
   - Mobile crop and callouts on the command centre (#2).
   - Visible address and one CTA name (#3).
   - Company facts (#4).
   - Loop drawn as a cycle (#13).
   - Stack drawn as strata (#14).
   - Trims (#15).

## Open questions for the owner

1. **Diamer-Basha:** can the project be named in the copy? It is already visible
   in the screenshot's breadcrumb.
2. **Company proof:** which facts can be published (projects, years, headcount,
   offices)?
3. **Contact address:** is showing it on screen acceptable if JS still assembles
   it and it stays out of the source?
4. **Body typeface:** is a new webfont acceptable, or should body copy move to
   Gelasio?

## Method notes

- The live site was compared with the local files after normalising line
  endings. The size gaps come from multibyte characters, and the latest
  commit's `spin` keyframe is present live.
- Reveals were forced by scrolling the whole page before capture. Measurements
  come from `getBoundingClientRect` and `getComputedStyle` in Chrome.
- Characters-per-line figures come from each element's width divided by the mean
  glyph width of a pangram in its computed font. Treat them as ±5%.
