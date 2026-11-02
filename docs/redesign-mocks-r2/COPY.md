# Round-2 copy deck: the DiPGOS story, grounded

**Status:** draft copy for the mocks. It is built from the research in [`../research/2026-09-25-ec-lifecycle-tools-ontology.md`](../research/2026-09-25-ec-lifecycle-tools-ontology.md), which holds the verdict and claim sheet.

**Rules:**

- **Every figure carries its footnote number.** Footnotes resolve to the Sources list at the end, and each mock renders them as superscripts linking to a sources section.
- **Product claims only cover what is built.** The build status of each claim is in the claim sheet.
- **Some names need client permission first.** A dagger † marks every name or example that needs permission before launch: Diamer-Basha, MW-1, MS-348, PFJV, Descon. Mocks render the dagger and a one-line note: "† Named with the client's permission pending."
- **"Palantir" never appears on the page.**
- **Mocks may reorder, cut or split sections**, but may not invent claims. Headlines marked *(option)* are alternatives. Pick one per mock.

---

## 0 · Meta

- **Title:** `DiPGOS by Indus: the operating system for megaprojects`
- **Description:** `Every pour checked against the method, owned by a named engineer, and counted the day it happens. DiPGOS models how a megaproject is really built.`

## Voice: revolution, backed by proof

Indus is here to **revolutionise the construction industry**. The page should sound like it.

- **Lead with ambition.** State the ambition plainly and without hedging, in the hero, the opening of the model section and the close.
- **Back every bold line with something concrete within a screen:** a sourced figure, a real limit from the method statement, or a real screen.
- **Revolutionary is about what changes:** a project that knows its own state every day, not once a month. It is never about hype words: no "disrupt", "game-changing" or "AI-powered".
- **The confidence comes from specifics.** That is what separates this from every other construction-tech site.

## 1 · Hero

**Kicker:** The world needs a new way to build.

**Headline (options, pick one; the first three lead with the revolution):**

- R1. The world's oldest industry has never had an operating system. Now it does.
- R2. We're rebuilding how the world builds, starting with the work itself.
- R3. Construction built the modern world. It still can't tell you, today, what was built today.
- A. The plan is updated once a month. The dam is built every day.
- B. Every pour, checked against the method, the day it's poured.
- C. Megaprojects don't fail in the plan. They fail between the plan and the site.

The R-lines work best with a short concrete line underneath, e.g. under R1: "Every pour checked against the method, owned by a named engineer, and counted the day it happens."

**Lead:** DiPGOS is the project operating system for engineering and construction megaprojects. It models the project the way it is actually built: every scope, work front, operation, crew, machine and material, and the method that governs them. Each day's work is then checked, owned and counted the day it happens. People decide. The system keeps the record.

**CTAs:** `See a day on a work front` (jumps to section 6) · `Get in touch`

**Proof line (small, under the CTAs):** Running on an RCC dam: Stage 1, Blocks 12–24, EL 898–990 m.†

## 2 · The stakes

**Opening (kept from the current site; the ambition that frames the whole page):** Roads, dams, cities, power plants: every physical thing around us was delivered by engineering and construction. It is the largest industry on earth, at $15 trillion a year *(source needed; the owner's figure from the current site; mark `todo`)*. Its greatest work is still ahead: the build now coming is the largest in the history of human civilisation.

**Headline:** And the largest things we build run late as a rule.

**Figures (use 3–4):**

- **96%.** The average cost overrun across 245 large dams in 65 countries. Three in four ran over budget; eight in ten ran late, by 2.3 years on average.[1]
- **16 years.** How long Neelum-Jhelum took against a planned 8. Its cost went from Rs 84.5 bn to Rs 423 bn.[2]
- **59%.** The share of Pakistan's 931 ongoing federal development projects that were running late.[3]
- **98%.** The share of megaprojects that overrun their budget by more than 30%. 77% finish at least 40% late.[4]

**Body:** None of this comes from a shortage of engineering talent. It comes from not having a shared, current and trusted account of the work: what was done, where, by whom, to what standard, and who approved it.

**Counterweight (small print, for credibility):** Dams completed after 2000 have overrun less than earlier ones, at 33% on cost and 18% on schedule on average.[5] The trend is better, but the problem remains.

## 3 · How a project really runs

**Headline:** A megaproject passes through seven hands before it produces a single unit of power.

**Intro:** Each phase makes its decisions in its own tools, then hands the next phase a pile of documents. The model of the project gets rebuilt at every handover.

**Phases.** For each: what is decided, where it lives today, and where it breaks.

| Phase | Decides | Lives in today | Breaks when |
|---|---|---|---|
| Feasibility (FEL 1) | Is there a project worth doing? | Spreadsheets, studies | Estimates carry a −50%/+100% range.[6] |
| Scope (FEL 2) | Which single option to take forward | Spreadsheets, early schedules | The chosen option's assumptions are never carried forward as data |
| Front-end design (FEL 3) | Final investment decision, contract strategy | P6, estimating tools | The control budget is set at −20%/+30% and then treated as fact[6] |
| Tender and bid | Price, programme, method | Excel, Word, norms in people's heads | Man-hours rest on norms nobody can trace |
| Detailed engineering | Issued-for-construction drawings | BIM, document control (Aconex, Forma) | Drawings and the schedule describe the work in different words |
| Procurement | What arrives, and when | ERP (SAP), spreadsheets | Deliveries aren't tied to the operations that need them |
| Construction | Sequence, quality, change, payment | P6 monthly, site bar charts, paper forms, Excel | The site and the plan drift apart within weeks.[7][8] |
| Commissioning and handover | Take-over | Completion systems, document registers | As-built truth is reconstructed from paper |
| Operations | Keeping the asset running | CMMS / asset systems | The history of how it was built is gone |

**Parties strip.** The Employer pays. The Engineer administers the contract and rules on claims (FIDIC Red and Yellow Books).[9] The contractor builds. Subcontractors and suppliers deliver packages. Four parties, four sets of systems, one piece of concrete.

**Where DiPGOS sits (label on the lifecycle):**

- **CPDS** covers tender to proposal. Built, and piloted with an EPC contractor's engineers.†
- **ACCS** covers execution control. Built, and running on an RCC dam.†
- **AOS** covers operations. Planned.

## 4 · Where the stack breaks

**Headline:** The tools record the project. None of them runs it.

**Intro:** Primavera P6 is the industry's schedule of record, and it is very good at being one. The trouble is everything that has to happen outside it.

1. **The plan is monthly. The site is daily.** Schedule updates are normally monthly, while superintendents run the job from one- or two-week bar charts.[7] Only about half of the work assigned to crews at the start of a week is completed as planned.[8]
2. **Percent complete is an opinion.** A supervisor's estimate is the measure "most prone to overstatement and the hardest to audit".[10] In one documented case a contractor reported activities as "90% complete for several months" to hide missed starts.[11]
3. **The method statement is a PDF.** The limits that decide whether a layer is acceptable (thickness, unloading height, temperature, roller passes) live in a document. They aren't data that anything checks.
4. **Every system names the work differently.** The WBS in the schedule, the cost codes in the ERP and the numbers in the document register each describe the same concrete.[12] Moving data between them is manual in 49% of cases.[13]
5. **Nobody can say who approved what.** On Tarbela's 5th extension, a contractor's cofferdam change the contract did not allow was accepted conditionally by the Engineer and approved by the employer. The inquiry held all three responsible, and the cost rose from Rs 82 bn to about Rs 317 bn.[14]
6. **Data is collected, then ignored.** 95.5% of engineering and construction data goes unused.[15] Team members spend 14 hours a week on conflict, rework and hunting for information, 5.5 of them hunting for data alone.[16]

**Closing line:** The industry does not need another tool on the pile. It needs a model of the work that every tool, and every person, can read.

## 5 · The model

**Headline:** DiPGOS starts from what the project is made of.

**Intro:** Most software models documents, dates or geometry. DiPGOS models *the work*: the things a project is made of, how they relate, and the method that governs them. Every screen, form, check and figure reads from that one model.

**The nouns (object types):**

- **Project → Contract → Scope → Activity → Process → Operation.** The breakdown of the job, down to a single operation such as "Place & spread RCC".
- **Work front:** a bounded place and time where an operation happens. For example: *Blocks 14–15 · EL 922.0–932.2 · Lift 2 · Layer 7*.
- **Atom:** anything the work consumes or uses, in six classes: material, workforce, equipment, temporary works, deliverable, storage. Each *unit* is one physical thing, such as roller 3 of 12, or formwork set 037 of 581.
- **Run:** one filed report of work on a work front.
- **Data point:** one measured check on that report.
- **Alarm / NCR:** a breach, with its margin.
- **Decision:** a sign-off, with its approver and reason.

**The relations (show as a diagram):**

- An Operation is *performed at* a Work front.
- An Operation *precedes* another Operation, with a lag in hours.
- An Operation *requires* Atoms, with quantities. Batch & mix, for instance, uses 90 kg of pozzolan and 95 L of water.
- An Atom *needs* Atoms. A vibratory roller needs one operator per machine-hour and 8 L/h of diesel.

**The verbs (actions):**

- File a run
- Check it against the method
- Raise an NCR
- Request a sign-off
- Approve or reject, with a reason
- Freeze a baseline
- Certify quantities for billing *(in progress)*

**Sub-section, "The method statement becomes the model":** Diamer-Basha's RCC method statement† is loaded as data: 6 processes and 21 operations, each with its limits.

| Operation | Limit |
|---|---|
| Place & spread | Unloading height ≤ 1.5 m; layer 33 cm |
| Compact | Roller ≤ 2.5 km/h; compacted layer 30 cm; before initial set |
| Bedding mortar | 10–15 mm |
| Aggregate | Moisture ≤ 5% |
| Haul | Dump truck ≤ 15 km/h (safety) |
| Cure | 14 days |

The same limits generate the paper form the foreman fills in, the screen form, the checks, the alarms, and the approver each output goes to.

**Sub-section, "One verdict per discipline, never a single pass/fail" (label: *the model's shape; in development*):** A check is judged separately by each discipline that owns part of it: the site engineer for geometry, the materials engineer for physical properties, the scheduler for sequence, the cost controller for money, and so on across nine owners. A verdict reads like "Not satisfied: physical, 5 °C short, materials engineer", not a red cross.

## 6 · One day on a work front

**Headline:** One layer, one day.

**Setup:** Work front *Blocks 14–15 · EL 922.0–932.2 · Lift 2 · Layer 7*. Operation: Place & spread RCC. 820 m³.† *(Illustrative timeline. The values come from a real sample record sheet.)*

**Timeline (DiPGOS):**

1. **06:40 · Paper.** The foreman fills in the RCC-PL sheet on paper, as always. The sheet itself says: *"A blank is recorded as 'not answered', never as a pass."*
2. **07:05 · Read.** A photo of the sheet lands in the site-reports folder. DiPGOS reads it and matches it to its work front by the site's own words. A person confirms each value, because nothing is written without a source. A sheet that could belong to two fronts is parked, not guessed.
3. **07:06 · Checked.** Four checks against the method:
   - Slope 1:11 against ≤ 1:10 · **satisfied**
   - Unloading height 2.0 m against ≤ 1.5 m · **0.5 m over**
   - Layer 35 cm against 33 cm · **2 cm over**
   - Temperature 18.5 °C against < 18 °C · **0.5 °C over**
4. **07:06 · Owned.** Three NCRs are raised, each with its margin, and routed to the approver the method names.
5. **11:30 · Decided.** The consultant's representative reviews the layer and records the decision with a reason. Closing or reopening an NCR also needs a reason, and every step stays in the history.
6. **18:00 · Counted.** 820 m³ counts against the frozen baseline. Float on the following operations recomputes, and the day's quantities are ready for certification.

**Contrast column ("The same day, in a typical stack"):**

- The sheet goes into a folder.
- The numbers are retyped into a spreadsheet days later.
- The 2 cm, if anyone notices it, becomes an email.
- At month-end the activity's percent complete goes up in P6.

**Closing line:** Same concrete, same people. The difference is that the record exists the day the work does.

## 7 · Where you run it

**Headline:** The command centre, not a dashboard.

**Body (keep from the current site):** The operational command centre your team runs the work from, and takes decisions in. One place: where the work stands, what it's made of, and how it's performing.

**Screens:** The command-centre image, annotated with Where (the live map), What (scope and work fronts) and How (productivity, quality and business). Also, as available:

- **Atom Manager:** "the whole catalogue, right now", with 536 people, 134 machines, 710 sets and 24 vessels, and "LIVE · as of 19 Sep 2026".
- **Schedule forecast:** who is claimed, out or short over the next 8 weeks.
- **Record what happened:** "appended, never overwritten — a correction is a new dated row".
- **Site reports folder:** the day's Place & Spread files, each with *Evaluate*.
- **Evaluate against the contract:** "reviewed against the contract clause by clause".

Label the screenshots as *"From the running system. Pilot data."*

## 8 · AI, on the record

**Headline:** AI proposes. A named engineer decides. The record keeps both.

**Body:** DiPGOS uses AI where it removes the typing, not the judgement. It reads a photographed site sheet into a proposal for a person to confirm. It answers questions over the tender, the design documents and the delivered record, and cites its sources every time. It never writes a value without a source, and it never signs anything off.

**Aside (keep from the current site, trimmed):** AI can only act on ground it understands. The model of the work is that ground.

## 9 · Principles

**Headline:** How the record stays true.

- **Records in, state out.** Nothing is typed as a total. Stock, hours, progress and earned value are all computed from dated records, so you can ask what any figure said on any past date.
- **A blank is not a pass.** "Nothing reported" and "we looked, and there is none" are different answers, and DiPGOS keeps them apart.
- **Every verdict has an owner.** A breach arrives with its margin and the name of the person who must act.
- **Two denominators, both named.** Progress is shown against the fronts that have started and against the whole job. The first can read 101% while the second reads 36%, and both are true.
- **Paper stays paper.** Forms are printed from the method and read back from photos. Nobody retypes a sheet.
- **It sits alongside what you have.** DiPGOS works with the contract schedule as issued and the folders your site already uses. It doesn't ask you to throw away P6.

## 10 · Company

**Headline (keep):** We lived the problem before we built the answer.

**Body (keep):** Indus is built by engineers and builders who spent their careers inside real projects, and felt the gridlock first-hand. We're not software people guessing at the industry. We're industry people building the system we always needed.

**Founder (keep):** M. Kamran Basit, Founder & CEO.

**Facts (placeholders, class `todo`):**

- [Years in heavy civil and hydropower]
- [Projects delivered]
- [Offices: Pakistan · USA]

**Entities (real, from the footer):** Indus Technology Solutions (Pvt) Ltd · Indus Technologies LLC, USA

## 11 · Contact

**Headline (keep):** Let's shape the future of how the world gets built.

**Sub:** Bring us the project you trust least. We'll show you what its record would look like.

**Contact block:** the visible address (assembled at runtime), a `Copy` button and an `Email us` button. `<noscript>` fallback: kamran (at) industechsol.com.

## Footer

- **Motto:** The project thinks; the human commands.
- **Tagline:** The world's oldest industry, reimagined from the ground up.
- **Legal:** © 2026 Indus Technology Solutions.
- **Dagger note:** † Named with the client's permission pending.

---

## Sources (numbered as cited)

1. Ansar, Flyvbjerg, Budzier & Lunn (2014), "Should we build more large dams?", *Energy Policy*. https://arxiv.org/pdf/1409.0002
2. Water Power Magazine, "Audit declares Neelum-Jhelum hydropower project a failure". https://www.waterpowermagazine.com/news/audit-declares-neelum-jhelum-hydropower-project-a-failure/
3. PIDE Working Paper 2023:10, *Reforming the Federal PSDP*. https://file.pide.org.pk/pdfpideresearch/wp-23-10-reforming-the-federal-public-sector-development-programme.pdf
4. McKinsey (2015), *The construction productivity imperative*. https://www.mckinsey.com/capabilities/operations/our-insights/the-construction-productivity-imperative
5. Plummer Braeckman, Disselhoff & Kirchherr (2020), *International Journal of Water Resources Development*. https://ideas.repec.org/a/taf/cijwxx/v36y2020i5p839-854.html
6. AACE International 18R-97, cost estimate classification. https://web.aacei.org/docs/default-source/toc/toc_18r-97.pdf
7. Long International, "Contract scheduling provisions". https://www.long-intl.com/articles/contract-scheduling-provisions/
8. Ballard (2000), *The Last Planner System of Production Control*. https://lean-construction-gcs.storage.googleapis.com/wp-content/uploads/2022/09/08152942/the-last-planner-system-of-production-control-ballard2000-dissertation.pdf
9. ICCP, "FIDIC Red, Yellow and Silver Books". https://www.instituteccp.com/fidic-red-yellow-and-silver-books-a-brief-overview/
10. Gather Insights, progress measurement. https://www.gatherinsights.com/en/earned-value/definitions/progress-measurement
11. Ankura, "Construction schedules: why owners should monitor and care". https://ankura.com/insights/construction-schedules-why-owners-should-monitor-and-care
12. Quollnet, "Work breakdown structure explained". https://quollnet.com/article/work-breakdown-structure-explained
13. JBKnowledge 2020 ConTech Report, via Construction Dive. https://www.constructiondive.com/news/construction-app-usage-increases-despite-continued-lack-of-integration/592922/
14. Dawn, Tarbela 5th extension inquiry. https://www.dawn.com/news/2014942
15. FMI & Autodesk (2021), *Harnessing the Data Advantage*. https://fmicorp.com/insights/quick-reads/harnessing-the-data-advantage-in-engineering-and-construction
16. FMI & PlanGrid (2018), *Construction Disconnected*. https://www.prnewswire.com/news-releases/new-research-from-plangrid-and-fmi-identifies-factors-costing-the-construction-industry-more-than-177-billion-annually-300689826.html
