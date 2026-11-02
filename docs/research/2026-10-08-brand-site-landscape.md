# Brand-site landscape: construction tech, industrial software, hard tech (Oct 2026)

Input for the DiPGOS / Indus Technologies site redesign (round 3). The question: what do strong
2025–26 sites in our neighbourhood actually do, which of those habits are now clichés, and what
visual territory is still free for a megaproject (dams, hydropower, EPC) project operating system.

**Method.** 21 homepages surveyed on 2026-10-08. 16 were loaded in headless Chrome at 1440×900:
viewport screenshot plus computed styles (body colour, heading font/size, button radius, page
height). Five (marked †) were read as text only via WebFetch, so their visual notes are thinner.
"Length" is the rendered page height at 1440 px wide, a rough proxy for how much a page asks of
the reader. Palantir was deliberately excluded (off-limits as a model; see
`2026-09-25-claude-track-palantir-landscape.md` for that ground).

## 1. Sites surveyed

### Construction tech and the incumbent baseline

| Site | Hero and message | Imagery | Type and colour | Product shown as | Credibility | Length | One distinctive thing |
|---|---|---|---|---|---|---|---|
| [Procore](https://www.procore.com) | Slogan: "Together, we can build it all" under a mono caps eyebrow | Laptop-on-site photo with dashboard; real project photos lower | pitchSans mono eyebrow + heavy procoreSans; warm stone background, orange `#FF5200`, 4 px radius | Annotated screenshots, AI chat panel | "3 million+ global projects", 8 logos, G2 stars, quotes | 7.2k px | Owns construction orange; warm neutral instead of white. Banner: "Procore acquires DroneDeploy" |
| [Buildots](https://buildots.com) | "Construction intelligence to power your whole operation." Boxed caps eyebrow "KNOW. ACT. OUTPERFORM." | Aerial city photo with hi-vis yellow wireframe overlays and floating progress cards (94 %, 68 %) | Sharp Grotesk; charcoal + safety yellow-green | Overlay on photo, then feature grid | 20+ logos, "reduce delays by up to 50 %" | 11.8k px | Safety-yellow brand colour; viewfinder-bracket logo |
| [Doxel](https://doxel.ai) | "Physical Intelligence for Construction" in Newsreader serif, 110 px, light | Helmet-cam video of a worker, purple tint, data tag "QTY 1630 / 3380 LF, 48 % Complete" | Serif display + Archivo/Inter; near-black, orange square (0 px) button | Plan-vs-actual UI cards | Logo row, 11 % / 16 % / 95 % metrics, 5 quotes | 5.9k px | A data label in real trade units sitting on real footage |
| [ALICE](https://www.alicetechnologies.com) | Rotating verbs: "Optimize / De-risk / Recover / Accelerate your project" | Dotted particle globe with floating industry tags | Bw Modelica; dark navy, periwinkle `#6878FF` caps eyebrow, glass floating nav | Product cards with placeholder images | "$297B deployed", 12 logos, ROI %, SOC 2, awards | 12.0k px | Nothing visual; it is the cliché checklist (see §2). Content (scenario planning) is strong |
| [Trunk Tools](https://www.trunktools.com) † | Role-cycling: "creates AI-enabled [Superintendents / PMs…]" | Site photos, founder portrait, SMS screenshot | n/a | An actual SMS thread with the AI answering a schedule question | $50B volume, 1,000 projects, 8 logos, SOC 2 | n/a | Product shown in the channel field staff really use (text messages); founder "came to AI from construction" |
| [OpenSpace](https://www.openspace.ai) † | Slogan: "Always visible. Never in doubt." | Gradients + site photos + UI mockups | n/a | Capture → Coordinate → Act triad | "77B sq ft captured, 132 countries", logos | n/a | Cumulative-capture number as scale proof |
| [Bentley](https://www.bentley.com) | "Behind the world's infrastructure" | Top-down drone video of a highway | Inter + JetBrains Mono; dark `#111213` | Product menu, not on the page | Logo marquee directly under hero (Port Authority NSW, DPR, Stantec…), awards | 7.1k px | Geo-detects country ("Pakistan") in the nav; orthographic drone footage |

### Industrial data and operations software

| Site | Hero and message | Imagery | Type and colour | Product shown as | Credibility | Length | One distinctive thing |
|---|---|---|---|---|---|---|---|
| [Cognite](https://www.cognite.com) | Product launch: "Introducing Cognite Flows™" | Navy-violet gradient, floating dashboard cards, **3D mascot in a hard hat with wings** | Space Grotesk + Manrope | Floating cropped UI | IDC / Forrester badges, "465 % ROI", "$100B customer value by 2035" | 9.3k px | Cautionary: the mascot and gradient undercut a serious industrial buyer |
| [Seeq](https://www.seeq.com) † | "THE BEST INDUSTRIAL AI RUNS ON EXPERTISE" | Product UI | n/a | Analytics UI screenshot | Logos, LNS Research quote, awards, case-study PDF | n/a | Stance: AI serves the domain expert, not replaces them |
| [Augury](https://www.augury.com) † | "Industrial AI Agents That Work for You. From Uptime to Unstoppable." | Real plant and worker photography | n/a | Capability cards and a process narrative, little UI | 170+ manufacturers, Forrester 310 %, Verdantix leader | n/a | Legacy-vs-us comparison table; "outcomes vs outputs" framing |
| [Aize](https://www.aize.io) † | "The next generation of understanding" (vague) | 3D offshore asset models, FPSO and rig photos | n/a | Digital-twin video demos | ExxonMobil, BP, SBM logos; ISO 27001 | n/a | Domain vocabulary (FPSO, TAR, subsea) and a "useful, not perfect" twin philosophy; has an EPC use case |

### Hard-tech brand exemplars

| Site | Hero and message | Imagery | Type and colour | Product shown as | Credibility | Length | One distinctive thing |
|---|---|---|---|---|---|---|---|
| [Hadrian](https://www.hadrian.co) | "The Future of American Production" | **CNC toolpath line-art**, blue mesh with gold tool paths, in a chamfered frame | Söhne + Söhne Mono + Söhne Breit; navy `#002548`; outline square buttons | Short "what we build" section, video | None on the page: no logos, no metrics | 3.5k px | Live clock strip of its plants' time zones in the nav; graphics drawn from the work's own artefact |
| [Anduril](https://www.anduril.com) | Minimal; the page is a product index | One large media tile per system; Arsenal-2 is a top-down factory floor labelled "Station 01, 02…" | Helvetica Now Display; black | Named systems: Arsenal-2, Ghost, Barracuda, Lattice, Fury… | The catalogue itself | 5.2k px | Nouns, not adjectives: the page is a list of named, real things |
| [Saronic](https://www.saronic.com) | Mono caps "REDEFINING MARITIME SUPERIORITY" + full-width wordmark | Full-bleed video of the vessel at sea | Suisse Intl + Suisse Mono; slate `#1B2733`, acid lime `#ACFF24` | CTAs are "Capabilities" and "Specifications" | Bar: "awarded U.S. Navy production contract" | 9.4k px | Specifications as a primary CTA; a dated contract as the credibility |
| [Helsing](https://helsing.ai) | "MILITARY AI" set edge to edge | Top-down drone video of a ship deck | One family (Suisse Intl); beige `#DED6CB` | Nav is product designations (CA-1 Europa, HX-2, SG-1…) | Ethics statement up front | 7.4k px | One typographic gesture and nothing else |
| [Commonwealth Fusion](https://cfs.energy) | "The world's largest and leading commercial fusion energy company" | **Macro photo of the real HTS magnet plates** | NB International + Mono; warm grey `#CCC8C3`, copper `#CF6D46`; boxed grid nav; 0 px radius | Technology page | Scale claim + news | 4.8k px | Accent colour sampled from the photographed material (copper) |
| [Varda](https://www.varda.com) | "Space born, Earth bound" | **Duotone navy/orange aerial terrain** with the layout grid drawn visibly over it | MT Everyday Sans; navy `#0A3065` + orange | Platform tile | Dated fact: "W-8 and W-9 have launched" | 2.5k px | Duotone landscape + exposed grid; the shortest page surveyed |
| [Flexport](https://www.flexport.com) | "AI-powered logistics for the real world" + "Save up to 10 %" | Real ocean photo with a container ship, with the product rising over it | Zalando Sans 200 + Roboto Mono caps nav; 0 px radius | **Full-width UI at near-real scale**: "Hello, Thomas! 3 overdue tasks… Shipments 766" | Logos, savings figure | 11.7k px | The product shown as a working screen with plausible data, not as cards |
| [Watershed](https://watershed.com) | "Where climate leaders are market leaders" | Dithered mountain, flat colour blocks, product nodes on material photos (Denim 2.9 kgCO2e → Jeans assembly) | Messina Sans + Geist Mono + Mackinac; white, blue; 2 px radius | Node cards with real units | Eyebrow "Trusted by 5 of the top 6 US banks", Verdantix | 9.0k px | A credibility fact used as the eyebrow instead of a category label |
| [Linear](https://linear.app) | "The product development system for teams and agents" | Product UI only | Inter Variable + Berkeley Mono; `#08090A`; pill buttons | Near 1:1 app screen with real-looking content (DRV-8852, agent panel) | Customers page | 10.0k px | The originator of the "dark SaaS" look has dropped the glow; only the imitators still use it |
| [Base Power](https://www.basepowercompany.com) | "Save money. Stay powered." (now consumer-facing) | Lifestyle photography | PP Neue Montreal; warm off-white | Pricing calculator | "30,000+ homeowners", 4.8 stars | 13.8k px | A price in a headline: "$13,000 is $695" |

## 2. What is now a cliché (the "AI slop" look), with evidence

These recur often enough in the sample that a buyer who has seen three vendor sites will read
them as filler.

1. **Dark navy or violet gradient + floating cropped UI cards.** ALICE (navy, glass nav, floating
   tags), Cognite (navy-violet gradient, floating dashboards), OpenSpace (gradient backgrounds).
   Linear, which popularised the dark look, now uses flat near-black and a real-scale app screen.
2. **Abstract "global network" visuals.** ALICE's dotted particle globe with floating industry
   tags is the purest case. It says "worldwide" and nothing about construction.
3. **Generic 3D.** Cognite's winged hard-hat mascot; Aize's glossy 3D asset models are borderline
   (they are at least the customer's asset).
4. **"Intelligence" as the category word.** "Construction intelligence" (Buildots), "Physical
   Intelligence" (Doxel), "Visual Intelligence Platform" (OpenSpace, and Procore's DroneDeploy
   banner). The word is saturated in construction tech; DiPGOS should not use it.
5. **AI agents as the headline.** Procore AI agents, Augury "AI Agents That Work for You",
   Cognite Flows, Linear "teams and agents". The claim no longer differentiates.
6. **Triad slogans and three-pillar frameworks.** "Know. Act. Outperform." (Buildots), Capture →
   Coordinate → Act (OpenSpace), "Move fast / smart / together" (CFS).
7. **Rotating or role-cycling headlines.** ALICE (four verbs), Trunk Tools (job titles).
8. **Caps eyebrow above every heading**, now usually monospaced: Procore, Buildots, ALICE,
   Watershed, Saronic, Flexport. Almost universal, so it is no longer a style choice. Use it only
   where it carries information (Watershed puts a fact there).
9. **Logo marquee straight after the hero**, then a stack of vendor ROI percentages: Doxel
   11 / 16 / 95 %, ALICE 17 / 14 / 12 %, Cognite 465 %, Augury 310 % (the last two from
   vendor-commissioned Forrester studies). Readers discount these numbers.
10. **"Get a demo" as the only call to action**, repeated five or more times.
11. **Very long pages**: Buildots 11.8k px, ALICE 12.0k, Flexport 11.7k, Linear 10.0k, against
    2.5–5.2k for Varda, Hadrian, CFS and Anduril. Length signals that the company is unsure.
12. **The 2025–26 "defense-tech starter pack"**: mono caps micro-type, one acid accent, full-bleed
    drone video, a giant wordmark (Saronic, Helsing, Anduril). These are the best-looking sites in
    the sample, but copying the kit is now a cliché in its own right. It also sits next to the
    Palantir aesthetic, and on a small company selling to EPCs it reads as posturing.

Not a cliché in this sector: **pill buttons.** Measured radii: Doxel, CFS and Flexport 0 px;
Watershed 2 px; Procore and Saronic 4 px; ALICE 5 px; Buildots and Base 8 px; only Linear uses
pills. Industrial sites already run square.

## 3. What the distinctive sites do instead: transferable moves

1. **Draw the graphic language from the work's own artefact.** Hadrian's hero is machining
   toolpaths. Anduril's Arsenal-2 tile is a labelled factory plan ("Station 01…"). Varda shows
   the terrain its capsules land on. None of them uses abstract art.
2. **Sample the accent colour from the material.** CFS's copper is the copper in its magnet
   photo. Buildots's safety yellow and Procore's orange come from site PPE. Colour should come
   from the subject, not from a palette generator.
3. **Shoot the real thing at an engineering angle.** Macro (CFS magnet plates) or orthographic
   top-down (Helsing's deck, Bentley's highway, Anduril's factory). Top-down reads as plan or
   survey; macro reads as material truth. Both are hard to fake with stock.
4. **Label real footage with real units.** Doxel's "1630 / 3380 LF, 48 % Complete", Watershed's
   "2.9 kgCO2e", Buildots's progress percentages. A unit-specific label is more convincing than
   any adjective.
5. **Show the product as a working screen at near-real scale with plausible content.** Flexport
   ("3 overdue tasks… Shipments 766") and Linear (a real-looking issue with an agent panel), not
   floating cropped cards. Trunk Tools shows its AI inside an SMS thread, the channel its users
   already have.
6. **Name the things.** Anduril's page is a product index; Helsing's nav is product designations;
   Saronic's call to action is "Specifications". Nouns and specifications instead of adjectives.
7. **Use operational, dated facts as credibility.** Hadrian's plant clocks, Varda's "W-8 and W-9
   have launched", Saronic's contract award. Each says "this is running now".
8. **Make one typographic gesture, then stop.** Helsing's edge-to-edge "MILITARY AI"; Doxel's
   110 px light serif; CFS's single family plus its mono. Usually one family and a mono companion.
9. **Keep the page short.** Varda (2.5k px), Hadrian (3.5k) and CFS (4.8k) say less and look
   surer. Depth belongs on inner pages.
10. **Put a fact in the eyebrow, not a category.** Watershed: "Trusted by 5 of the top 6 US
    banks" where everyone else writes "PLATFORM".

## 4. Construction-specific territory nobody in the sample owns

Every construction-tech site surveyed draws from **US commercial building**: towers, data
centres, interiors with steel studs, laptops on site. **Heavy civil and hydropower are visually
unclaimed.** Bentley comes closest (a highway), and Aize's offshore vocabulary shows how far
domain language can go. Material DiPGOS could own:

- **Sections and elevations.** A dam cross-section (upstream face, gallery, foundation grout
  curtain) and elevation markers (▽ EL 1,182.5 m) as typographic devices. This is the
  dam-builder's equivalent of Hadrian's toolpaths.
- **Contour and survey lines.** Topographic contours of a valley, reservoir full-supply level,
  chainage ("Ch 2+350"). Contours make a calm background texture with real meaning, unlike
  dotted globes.
- **The RCC lift as a unit of progress.** Roller-compacted concrete rises in numbered horizontal
  lifts. Stacked lift bands, filling as the project advances, are a visual for progress and for
  the product (planned vs placed) that only this sector has.
- **The S-curve.** Planned vs actual cumulative progress is the chart every project director
  reads. One honest S-curve, drawn well, can be the signature chart in place of generic KPI tiles.
- **Work fronts, method statements, daily site reports.** These are better as **real document
  formats shown in the product** (a report page, a method-statement step list) than as copy. Round
  2 showed that work-front jargon in headlines does not land with the owner.
- **Photography no competitor has.** Night RCC pours under floodlights, diversion tunnels,
  cofferdams, haul roads cut into valley walls, aggregate stockpiles, top-down shots of the dam
  crest. This also fits the owner's "no light theme" rule: dark comes from night-pour photography
  and concrete, not from navy glow.
- **Colours from the subject, mostly unclaimed:** concrete greys (warm and cool), silt and
  laterite ochre (the Indus is a silt-laden river), topographic contour brown, reservoir
  blue-grey, rebar rust. **Avoid hi-vis yellow** (Buildots) and **construction orange** (Procore,
  Doxel); both are taken.
- **Place and time.** Hadrian makes "American production" its identity. Indus can be
  matter-of-fact about working in the Indus basin and South Asia: project calendars around
  monsoon and low-flow seasons, PKT working hours, site elevations in metres. Treat this as fact,
  not as a slogan.

Caveat: round 1's mock D ("light drawing sheet", title blocks and drawing-sheet framing) was
disliked. Use engineering drawing as **content** (a real section, a real contour) rather than
as page chrome that dresses the whole site as a drawing.

## 5. Risks for a small company selling to large EPCs

- **No customer logos.** Every construction competitor leans on a marquee. Do not fake one or use
  "Trusted by" with unpermissioned names. Alternatives: a walk-through of the real product with
  realistic (anonymised) data; named people and their engineering backgrounds (Trunk Tools's
  founder letter works because it is personal); scale facts that are true and checkable (projects
  configured, work fronts tracked, documents processed) only once they are verified against
  `2026-09-25-dipgos-product-truth.md`; "references on request" for tender evaluators.
- **Claims discipline.** Competitors' percentages come from case studies or vendor-commissioned
  Forrester TEI studies, and buyers discount them. DiPGOS should claim only what the product repo
  shows it does, in present tense, with no invented ROI. A specific, modest true claim ("tracks
  planned vs placed concrete per lift") beats "reduce delays by up to 50 %".
- **AI scepticism.** "Agents" and "intelligence" are saturated. Show the assistant answering one
  real project question, with its sources (the report, schedule activity or drawing it read). Do
  not lead with the assistant as the headline.
- **Photo rights and client sensitivity.** Dam and hydropower sites are state or utility
  projects. Get written permission for site imagery and project names. Stock dam photos are few
  and recognisable; reusing them would undercut move 3.
- **Procurement reality.** EPCs and owners evaluate through tenders. They need a downloadable
  capability statement, deployment and hosting model (on-premise or in-country data residency),
  security posture stated plainly (ALICE, Trunk Tools and Aize show SOC 2 / ISO 27001 badges; do
  not imply certifications Indus does not hold), and support hours. A "Contact an engineer" path
  serves this better than five "Get a demo" buttons.
- **Page weight.** Full-bleed video heroes (Saronic, Helsing, Bentley, Doxel) are heavy. Visitors
  on site or regional connections will get the poster frame. Prefer a strong still and short,
  muted, lazy-loaded clips.
- **Borrowed swagger.** Copying the defense-tech kit (§2.12) makes a small vendor look like it is
  posturing, and drifts toward the off-limits Palantir look. The credible register for a small
  specialist is calm, specific and domain-native.

## 6. Short version for the design team

- Pick **one** visual idea drawn from dams themselves (lifts, sections, contours) and let it carry
  the hero. No globes, orbs or mascots.
- Take colour from concrete, silt and contour brown, not from PPE (taken) or SaaS violet.
- Show DiPGOS as a real screen at real scale with plausible project data, plus one assistant
  answer with its sources.
- Put facts where competitors put labels: eyebrows, captions, unit-labelled overlays.
- Keep the homepage short (aim for 4–5k px at 1440 wide). Depth goes on inner pages.
- One type family plus a mono for data. Square corners.
- Credibility comes from true, dated, specific things, never from a fake logo wall.
