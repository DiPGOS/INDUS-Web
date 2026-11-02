# DiPGOS marketing website: content plan

The content for a public website selling DiPGOS to construction companies: site structure, draft copy, what each page should show, and what we can and cannot claim.

Everything here comes from what the product actually does today ([DIPGOS-FEATURE-CATALOG.md](DIPGOS-FEATURE-CATALOG.md)). Copy is a first draft, written to be edited.

---

## 1. Decide these before anything is written

| Question | Why it matters | Current state in the repo |
|---|---|---|
| **Product name and casing** | The app uses both "DiPGOS" and "DipGos". A public site needs one. | `DESIGN.md` says *DipGos (Digital Project Governance & Operations System)*. The feature catalog says *DiPGOS*. |
| **Company name on the site** | Who is the seller: Indus Technologies, or a separate brand? | Repo folder is "Indus Technologies"; email domain is industechsol.com. |
| **Which customers can be named** | The app ships with Pakistani dam and hydropower projects as demo data. Showing them as customers needs written permission. | Mohmand, Diamer Basha, Tarbela, Mangla, Ghazi-Barotha, Chashma, Bunji, Harpo, Pattan, Thakot, One CBD are seed data only. |
| **Sales model** | Decides the main call to action: book a demo, start a pilot, or contact sales. | A pilot model exists for the Knowledge Repository ([kr-training-pilot-findings.md](../platform/kr-training-pilot-findings.md)). |
| **Target market** | Copy and imagery differ for Pakistan hydropower vs. Gulf EPC vs. global. | Images in `frontend/public/images/portfolio/` cover Pakistan dams, Saudi (NEOM, Jubail, Yanbu, Aramco) and Karachi ports. |

---

## 2. Positioning

**Who it's for:** EPC contractors and heavy-civil builders who bid on and deliver large, multi-discipline projects such as dams, hydropower, buildings and industrial plants.

**The problem we solve:** a bid is priced in one set of spreadsheets, planned in another, built against a third, and reported in a fourth. Nothing connects the tender requirement to the crew on site or to the cost that goes over budget.

**What DiPGOS is:** one connected system from tender to handover. The same requirements, resources and operations carry through bidding, planning, construction and reporting, so every number on site traces back to the bid.

**One-line positioning options (pick one):**

1. *From tender to site, one connected system.*
2. *The control room for construction projects.*
3. *Bid it, plan it, build it — in one place.*
4. *Every requirement, resource and rupee, traced from tender to handover.*

**Voice** (from the product's own design system): precise, professional, understated. Write like an engineer explaining to another engineer. No "revolutionary", no "AI-powered everything".

---

## 3. Site map

```
Home
Product
  ├─ Tender & Proposal (CPDS)
  ├─ Planning & Resources (Configurator + Atom Manager)
  ├─ Construction Control (ACCS)
  └─ Mutlashi AI assistant
Solutions
  ├─ By role (BD, proposal, engineering, planning, site, procurement, management)
  └─ By sector (dams & hydropower, buildings, industrial)
Platform & security
How a pilot works
About
Book a demo
```

---

## 4. Home page

### Hero

> **From tender to site, one connected system.**
>
> DiPGOS reads your tenders, builds your proposal, plans your resources and tracks every operation on site — so the numbers you bid are the numbers you build against.
>
> [Book a demo]  [See how it works]

Visual: a real screenshot of the ACCS project map, or the Activity flow with the RCC dam lifts. Use the dark theme; it looks like a control room.

### The problem strip (three short points)

- **Tenders take weeks to read.** Hundreds of documents, addenda arriving daily, requirements buried in specs.
- **Bids and builds don't talk.** The estimate lives in one file, the schedule in another, site reports in a third.
- **Overruns show up too late.** By the time a deviation reaches the monthly report, the cost is already spent.

### The lifecycle (main section)

Show this as a left-to-right journey. Each step links to its product page.

| Step | Name on the site | What it does (site copy) |
|---|---|---|
| 1 | **Read the tender** | Upload the tender package. DiPGOS extracts the synopsis, client, value, dates and bid bond, and runs your bid / no-bid decision with the right approvals. |
| 2 | **Understand the requirements** | Requirements are extracted per discipline (civil, electrical, mechanical, piping, process, I&C) and mapped to the project's areas. Engineers review and approve; nothing goes forward unchecked. |
| 3 | **Build the proposal** | Requirements become deliverables, deliverables become operations, operations get the crews, equipment and materials they need. Schedule and cost are derived automatically. |
| 4 | **Export the bid** | Get the budget sheet in Excel and the proposal in Word, with commercial buffers applied by the proposal manager. |
| 5 | **Book real resources** | When the work is won, the planned resource types become real, booked people, machines and materials, with work fronts, critical path and baselines. |
| 6 | **Control construction** | Track every project from portfolio down to a single operation on a live map. Site teams report progress; alarms flag deviations; changes and cost increases are visible as they happen. |

Footnote for the designer: the product also reserves a seventh stage, **Operate** (AOS, for the maintenance phase). It is **not built**. Show it, if at all, as "coming later" and never as a feature.

### Proof strip

Only claims we can back today (see section 11):

- 6 engineering disciplines extracted from tenders
- 9 compatibility checks on every resource placed on a task
- 7 levels of drill-down: project → contract → scope → activity → process → operation → resource
- Every AI answer linked to its source document

### Mutlashi teaser

> **Ask your project anything.**
> Mutlashi, the built-in assistant, has read every tender, spec and drawing in your project. Ask it a question and it answers with the source, checks its arithmetic, and compares against past projects.

### Closing call to action

> **See it on your own tender.** Bring one past tender and we'll show you what DiPGOS extracts from it.
> [Book a demo]

---

## 5. Product pages

Each product page follows the same shape: one-line promise, the problem, three to five capabilities, one screenshot per capability, the roles that use it, and a call to action.

### 5.1 Tender & Proposal (CPDS)

**Promise:** *Go from tender package to priced, approved proposal without re-typing a single requirement.*

| Capability | Site copy | Screenshot to capture |
|---|---|---|
| Tender intake | Upload single files or the whole ZIP. Addenda and clarifications are matched to the tender as they arrive. | `/cpds/upload`, `/cpds/synopsis` |
| Bid / no-bid decision | BD recommends, management approves, the organisation acknowledges, with an audit trail at every step. | Synopsis approval panel |
| Requirement extraction | Requirements, bid data sheet and references extracted per discipline and mapped to the project's areas. Engineers approve item by item or all at once. | `/cpds/rfp/:id/profiling` (Profiler v3) |
| Team nomination | Assign a discipline lead to each part of the bid, confirmed by the proposal head. | `/cpds/nomination` |
| Deliverables & operations | Each requirement maps to deliverables; each deliverable is broken into operations with the crews, equipment and man-hours it needs. Cross-discipline dependencies are tracked. | Orchestrator and Composer screens |
| Auto-derived schedule & cost | The Gantt chart and the cost breakdown build themselves from the composed work. | Schedule Gantt, Finance Sankey |
| Proposal consolidation | The proposal manager applies cost, man-hour and front-end buffers, approves each discipline, and exports Excel and Word. | Consolidation review |
| Decision intelligence | A written read on each bid and discipline, not just rows of data. Opportunity radar, risk register and benchmarking against past bids. | `/cpds/radar`, `/cpds/risks` |

### 5.2 Planning & Resources (Configurator + Atom Manager)

**Promise:** *Know exactly which people, machines and materials each job needs, whether they're available, and what they cost.*

| Capability | Site copy |
|---|---|
| One resource catalogue | Workforce, equipment, temporary works and materials in one typed library, with the attributes that matter for each. |
| Needs and compatibility | Place a machine on a task and DiPGOS tells you what else it needs (an excavator needs an operator) and whether it suits the work across physical, spatial, performance, schedule, site, supply, financial, compliance and HSE checks. |
| Booking and work fronts | Turn planned resource types into real, booked units. Organise work into fronts with dependencies and critical path. |
| Calendars and availability | Every unit has its own working calendar, outages and lifecycle state, so availability is real, not assumed. |
| Stock and material flow | Deliveries, transfers and consumption tracked per site and per silo or yard, with projected shortfalls before they happen. |
| Scenarios and baselines | Simulate alternatives, compare them, and freeze a baseline to track against. |

Screenshots: Atom Manager (registry, atom detail with Schedule and Performance tabs), Configurator work-front view. The R6 design mockups in `docs/atom-manager-redesign/` are useful for marketing visuals once built.

### 5.3 Construction Control (ACCS)

**Promise:** *See every project, down to a single concrete pour, on one live map.*

| Capability | Site copy |
|---|---|
| Portfolio to operation drill-down | Start at your portfolio map, drill to a project, contract, scope, activity, process and single operation, each with its own map, metrics and status. |
| Progress reporting | Site teams report against dynamic forms per work front. Reports go through approval before they count. |
| Deviation alarms | Productivity, stock and schedule deviations raise alarms to the right people, with acknowledgement tracked. |
| Change and cost control | Change requests, variation orders and extensions of time in one register, approved by the right role. |
| Supply chain | Purchase requests, quotations, purchase orders, shipments, goods receipts, inventory and consumption, linked to the work that needs them. |
| Documents and drawings | Document manager with review workflow, drawing-to-resource mapping, and OneDrive / SharePoint integration. |
| Sustainability | Track sustainability and HSE data at project, contract and scope level. |
| Dam-specific views | Built for RCC dam construction: lift-by-lift progress, product breakdown structure, and a 2D construction view. |

Screenshots: Project map with contract markers (dark theme), Activity flow, RCC lifts view, Operation productivity graph.

### 5.4 Mutlashi AI assistant

**Promise:** *An assistant that has read every document on your project and shows you where its answer came from.*

| Capability | Site copy |
|---|---|
| Answers with sources | Every answer cites the document and section it came from. |
| Searches the way engineers think | Keyword, meaning and spreadsheet-aware search, plus direct queries on live project data. |
| Reads drawings | Pulls drawing details and regions, not just text. |
| Doesn't guess numbers | Uses a calculator for arithmetic instead of making figures up. |
| Compares documents | Compare a new spec against an old one, or a tender against a past bid. |
| Stays in scope | Answers are limited to the project you're working in. |
| Gets better with your feedback | Rate answers and confirm the good ones; confirmed answers become the benchmark. |
| Cost guardrails | Usage limits per conversation keep AI spend predictable. |

Honest framing for the "learns" claim: in a pilot, our team reviews feedback and makes the improvements. Automatic learning from confirmed answers is the enterprise roadmap, not today. See [kr-training-pilot-findings.md](../platform/kr-training-pilot-findings.md).

---

## 6. Solutions by role

The product has these roles built in, so the site can speak to each one directly.

| Role | Their headline | What they get |
|---|---|---|
| Business development | *Decide faster which tenders to chase.* | Synopsis in hours, opportunity radar, bid / no-bid workflow. |
| Business head / management | *Approve with the full picture.* | Decision intelligence, risk register, portfolio map, approvals in one place. |
| Proposal head | *Assemble the bid without chasing spreadsheets.* | Discipline-by-discipline approval, buffers, one-click Excel and Word export. |
| Discipline leads & engineers | *Spend your time on engineering, not on re-typing specs.* | Pre-extracted requirements to review, deliverables and operations to compose. |
| Planners | *A schedule that builds itself from the work.* | Auto-derived Gantt, critical path, work fronts, baselines and simulations. |
| Site & project controls | *Report once, and see where you stand.* | Work-front reporting, productivity, alarms, operation history. |
| Procurement & logistics | *Order what the work actually needs, when it needs it.* | Demand from the plan, purchase orders through goods receipt, stock projections. |

---

## 7. Solutions by sector

| Sector | Angle | Evidence in the product |
|---|---|---|
| **Dams & hydropower** (lead with this) | Purpose-built for RCC dam construction. | Dam breakdown structure, RCC lift views, cure-duration and ambient-temperature checks in the ontology. |
| **Buildings & urban** | Contract → scope → activity control with building views. | 2D building views, scope maps. |
| **Industrial & EPC** | Multi-discipline tenders with piping, process and I&C. | Discipline-specific extraction for all six disciplines. |

Ports, oil & gas and giga-projects (NEOM, Aramco, Jubail) appear in the image library. Use them only if the company has real work or a real pitch in those sectors.

---

## 8. Platform & security page

This page sells to IT and procurement. Keep it factual.

- **Role-based access:** 45 named permissions, with separate grants for viewing, managing, deleting, approving and exporting. Each role sees only what it should.
- **Approvals built in:** bid decisions, purchase orders, change requests and site reports each go through a named approval step.
- **Audit and analytics:** user activity tracking, per-user timelines, admin view of AI conversations.
- **Secure by default:** encrypted sign-in tokens, hashed passwords, rate limiting, CSRF protection and security headers.
- **Integrations:** Microsoft OneDrive / SharePoint, email notifications, Excel and Word export, real-time updates.
- **Traceable AI:** every assistant answer is linked to its sources and logged; usage has cost ceilings.
- **Deployment:** cloud-hosted, containerised. Confirm with the team before naming a cloud provider, region or certification.

Do not list ISO 27001, SOC 2 or data-residency guarantees unless the company actually holds them.

---

## 9. How a pilot works

The pilot model already exists for the knowledge assistant; extend it to the whole product.

1. **Bring one real tender** (or a past one).
2. **We set up your project** and load your documents.
3. **Your team uses it for 4–8 weeks** (confirm the length) on real work.
4. **You rate and confirm answers**; we turn that feedback into improvements every week.
5. **We review results together** and plan the rollout.

Copy line: *"Feedback is reviewed by our team before anything changes. For engineering data, every change should be checked, deliberate and reversible."*

---

## 10. Visual identity for the site

Take these from the product's design system ([frontend/DESIGN.md](../frontend/DESIGN.md)) so the site and the app feel like one brand.

| Element | Value |
|---|---|
| Feel | Calm, technical, trustworthy. A control room, not a consumer app. |
| Brand colour | Blue `#2563eb` (light) / `#3b82f6` (dark). Blue is the only accent. |
| Supporting accents | Warm orange `#fb923c`, cool sky `#0ea5e9`. Use sparingly. |
| Status colours | Green, amber, red only for status, never decoration. |
| Fonts | Poppins for headings, Inter for body. |
| Dark mode | Near-black `#040404` with glass panels and soft blue glow. Use it for hero sections and product shots. |
| Shapes | Soft shadows, 12–16px card radius, generous whitespace. |
| Imagery | Real site photography (dams, cranes, RCC placement) paired with real product screenshots. No stock "people pointing at laptops". |

**Assets already in the repo:**

- Logo marks: `frontend/public/images/logo/` (`dipgos-mark-dark.svg`, `dipgos-mark-light.svg`, `logo.png`)
- Mutlashi mark: `frontend/public/images/mutlashi/m-logo-2.svg`
- Project photography: `frontend/public/images/ACCS/`, `AOS/`, `CPDS/`, `portfolio/`
- Equipment photos with licences tracked: `frontend/public/atom-images/` (check credits in [atom-media-library.md](atom-manager-redesign/atom-media-library.md) before reusing on a public site)
- Feature icons: `frontend/public/svg/` (scheduling, procurement, sustainability, financial, forecasting, contract, alerts and more)

---

## 11. What we can and cannot claim

### Safe to claim (built and in the code today)

- Tender intake, bid / no-bid workflow, requirement extraction for six disciplines.
- Deliverables, operations and resource composition with auto-derived schedule and cost.
- Excel budget and Word proposal export.
- Resource catalogue with needs checking, booking, calendars, stock and movements.
- Seven-level construction drill-down with maps, reporting, alarms, change management and supply chain.
- Document management with OneDrive / SharePoint.
- AI assistant with cited sources, drawing reading, calculator, project scoping and cost guardrails.
- Role-based permissions and approval workflows.

### Do not claim (yet)

| Claim | Why not |
|---|---|
| "Manages operations and maintenance" / AOS | Not built. Only a navigation placeholder exists. |
| "Fully automatic compatibility checking" | The completeness half works; the compatibility half is still being finished. Say "checks what each resource needs". |
| "The AI learns on its own" | In a pilot, learning is reviewed by our team. Automatic learning is roadmap. |
| Named customers or project logos | The dam and hydropower projects in the app are demo data. Get written permission first. |
| Time or cost savings ("cut bid time by 70%") | No measured results in the repo. Use placeholders until a pilot produces real numbers. |
| Security certifications | None documented. |

### Numbers to collect from pilots (placeholders until then)

- Hours to produce a tender synopsis: before vs. after.
- Requirements extracted per tender, and the share approved without edits.
- Days from tender receipt to proposal submission.
- Share of site deviations caught by alarms before the monthly report.

---

## 12. Suggested build order

1. Settle section 1 (name, company, market, customers).
2. Capture product screenshots from a demo project, in both themes.
3. Write the home page and the CPDS page first; they carry the strongest, most complete story.
4. Add ACCS and Mutlashi pages.
5. Add role, sector, security and pilot pages.
6. Replace placeholders with pilot results as they come in.
