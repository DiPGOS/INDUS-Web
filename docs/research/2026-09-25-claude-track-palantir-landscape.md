# Palantir and the "Palantir for construction" landscape (Claude research track)

Date: 2026-09-25. Sources are live pages (palantir.com rendered in a browser), Palantir's docs, the vendors' own sites and press releases. Competitor statistics are the vendors' own claims and were not independently verified.

---

## 1. Palantir's Ontology, precisely

**1.1 What it is.** Palantir defines the Ontology as "an operational layer for the organization" that sits on top of integrated data and "connects them to their real-world counterparts, ranging from physical assets like plants, equipment, and products to concepts like customer orders or financial transactions" (https://www.palantir.com/docs/foundry/ontology/overview/).

**1.2 Semantic elements (the nouns).**
- **Object type:** "the schema definition of a real-world entity or event". An object type is to a dataset what an object is to a row (https://www.palantir.com/docs/foundry/object-link-types/object-types-overview/).
- **Properties:** the fields of an object type, mapped from source data "with rich metadata for all fields and complete with granular security and governance" (https://www.palantir.com/docs/foundry/ontology/overview/).
- **Link type:** "the schema definition of a relationship between two object types". A single link type can be followed in both directions (https://www.palantir.com/docs/foundry/object-link-types/link-types-overview/).
- **Interfaces:** describe "the shape of an object type and its capabilities", which lets different object types be treated the same way (polymorphism) (https://www.palantir.com/docs/foundry/ontology/overview/).

**1.3 Kinetic elements (the verbs).**
- **Action type:** "the definition of a set of changes or edits to objects, property values, and links that a user can take at once", plus "the side effect behaviors that occur with action submission". Edits land in the object type's writeback dataset. Actions carry permissions and submission criteria, so that only authorised people can make a given change (https://www.palantir.com/docs/foundry/action-types/overview/).
- **Writeback to source systems:** a webhook attached to an action can "send data to an external system when end users apply an action", for example SAP or Salesforce. In *writeback* mode the webhook runs first, and if it fails the whole action is stopped. In *side-effect* mode it runs after the Foundry edit, on a best-effort basis (https://www.palantir.com/docs/foundry/action-types/webhooks/).
- **Functions:** business logic in TypeScript or Python that reads properties, follows links and makes "Ontology edits" (https://www.palantir.com/docs/foundry/functions/overview/).
- **Automate:** time- or data-triggered conditions ("when a new Alert object with priority high is added") whose effects submit actions or run Logic functions (https://www.palantir.com/docs/foundry/automate/overview/).

**1.4 The decision-centric framing.** Palantir's docs say: "The Ontology represents the *decisions* in an enterprise, not simply the data". Every decision is broken into **Data, Logic, Action and Security**. Data elements are "the nouns" and actions are "the verbs". "End-to-end decision lineage" is presented as the record that later improves the AI (https://www.palantir.com/docs/foundry/ontology/why-ontology/). The overview page says the stated goal is "better decision-making in an organization at scale" (https://www.palantir.com/docs/foundry/ontology/overview/).

**1.5 How AIP puts LLMs on the Ontology.**
- **AIP Logic** is "a no-code development environment for building, testing, and releasing functions powered by LLMs". A Logic function takes objects in and returns objects or text, or "make[s] edits to the Ontology". Those edits "can be automatically applied or staged for human review" (https://www.palantir.com/docs/foundry/logic/overview/).
- The AIP product page shows the loop in three steps: "AI reviews alerts and automatically proposes resolutions" → "Human operators review proposals to approve AI-suggested resolutions" → "Human operators remain in-the-loop for approving AI-proposed actions" (https://www.palantir.com/platforms/aip/).
- The Ontology is positioned as a "tool factory" for humans and agents. External agents reach it through **Ontology MCP**, and "the same security controls that govern Palantir-native agents apply equally to external agents" (https://www.palantir.com/platforms/ontology/).
- The agent builder is now called AIP Chatbot Studio (formerly Agent Studio). Its chatbots are "powered by large language models (LLMs), the Ontology, documents, and custom tools" (https://www.palantir.com/docs/foundry/agent-studio/overview/).

**Why this matters for Indus.** The mapping is close: scope, work fronts, operations and resources are object types; their relationships are link types; "the physics of the work" is Functions/Logic; "humans approving" is staged action proposals.

---

## 2. How Palantir tells the story on its website

**2.1 Narrative order (homepage).** The page runs in this order:
1. A single thesis headline: "Sovereign AI Systems for Every Decision".
2. A carousel of named programmes (ShipOS, Warp Speed, Maven, Chain Reaction).
3. One sentence of positioning: "real-time, AI-driven decisions … from the factory floors to the front lines".
4. Five products, numbered /0.1–/0.5, each described in one line. For example, the Ontology is "The central system for orchestrating decisions across Human+AI teams".
5. A long wall of attributed customer quotes that contain numbers.
6. A newsroom.

All of this is from https://www.palantir.com/.

**2.2 The proof is quotes with numbers, attributed to people and companies.** Examples: General Mills, "about $40,000 a day, which is about $14M annually"; Walgreens, 10 stores piloted and then "about 4000 stores within eight months"; Sompo Japan, "$60 million improvement in profit"; United Airlines, "almost 300 delays, 20 cancellations" saved. The E&C firm Jacobs is quoted on field mixed-reality (https://www.palantir.com/). The quotes are left rough on purpose: one includes "that actually produced s\*\*\*" (Parexel). That roughness reads as authentic (https://www.palantir.com/).

**2.3 The Ontology page explains the concept by breaking it into parts.**
- Thesis: "The Ontology System encodes the data, logic, action, and security of the enterprise to automate decisions across your operations."
- Then four parallel verbs: "Encode the data…", "Capture the logic…", "Model the actions…", "Govern the human-agent labor force".
- Then the engine ("Millions of reads, millions of writes. One unified reality.").
- Then the toolchain (OSDK, MCP).
- Each block ends in "Read more", linking to the docs (https://www.palantir.com/platforms/ontology/).

Visually, the page uses isometric line drawings of stacked layers, one labelled "DATA, LOGIC & ACTION SERVICES", and a diagram that walks "Properties → Objects → Actions → Functions → SDKs → Tools → Versioning → Automations → Branching", a sequence confirmed by the image alt text (https://www.palantir.com/platforms/ontology/).

**2.4 Product UI is shown as real screens with callouts, not mock-ups.** The AIP page's "Beyond Chat" section has three tabs: AI App / Action-Driven Logic / Automation. Each tab shows a full-width screenshot of the actual product, for example a "Reallocation Automation" with its condition, logic block and "Agent proposals" panel. Lettered A/B/C markers are pinned to the parts of the screen that the text explains (https://www.palantir.com/platforms/aip/). Palantir also publishes "Agent proposals" counts on the screen (needs review / accepted / rejected), which makes human approval visible as a number. This was observed on the rendered page; I did not confirm whether the numbers are notional.

**2.5 Industry pages lead with the domain model, then give numbers.** "Palantir for Construction":
- Opens with "The Construction Ontology". It "integrates all core functions—from pre-construction to procurement, job site execution, and project closeout—through a unified semantic layer" around "shared business objects like projects, activities, equipment, and subcontractors".
- Presents that model as sitting across ERP, project management, BIM, accounting and equipment systems, "preserving existing technology investments".
- Tabs by function (Estimating, Procurement, Labor, Equipment, Subcontractors…).
- Outcome claims such as "$126M in procurement cost savings with 315% ROI", "foremen decreased time spent collecting timecards from 1 hour to ~5 minutes" and "digital twin for a multi-billion-dollar project portfolio in just days".

All of this is from https://www.palantir.com/offerings/construction/. **Note:** the outcome figures are *not* attributed to named firms. The customer names (McCarthy, Cavanagh, Kiewit, The Nuclear Company) appear only in a separate video list (https://www.palantir.com/offerings/construction/).

**2.6 Impact studies read like engineering reports.** The Jacobs study has numbered sections:
1. "Generating Real-World Impact": 20% plantwide power savings, "~2,000 KWh per million gallons treated to ~1,500".
2. The problem: reactive plants, "noisy SCADA systems".
3. The mechanism: it integrates "real-time sensor data, lab data, CMMS data, Oracle financials" into the Ontology; models predict ammonia; operators get set-point emails "twice daily, timed to their planning meetings" and "are able to reject notifications", so "operators remain in ultimate control".
4. Scale.

It also admits "All data presented herein is notional" on the dashboards it shows (https://www.palantir.com/impact/jacobs/).

**2.7 Tone, vocabulary, type and colour.**
- Tone: declarative and a little combative, with statements like "Go beyond chat" and "There is so much left to build". The AIP page promises results "in days, not years" (https://www.palantir.com/platforms/aip/, https://www.palantir.com/).
- Recurring words: *decisions, operations, Ontology, Human+AI, orchestrate, encode, writeback, operational truth* (https://www.palantir.com/platforms/ontology/, https://www.palantir.com/platforms/aip/).
- Type: the site uses the "Alliance No.1/No.2" typefaces, with a hero set at 80px regular weight. There are no bold weights in headlines. Body text is dark grey (rgb 30,33,36) on white. These values were read from computed styles on https://www.palantir.com/.
- Colour: pages alternate near-black sections with off-white ones, and use one lavender/violet accent for key phrases and progress bars. Small monospace labels appear on the diagrams (https://www.palantir.com/platforms/ontology/, https://www.palantir.com/platforms/aip/).
- Density: long, text-heavy pages, about 9,500–15,000 px tall (measured on https://www.palantir.com/platforms/ontology/ and https://www.palantir.com/platforms/aip/).

---

## 3. Palantir in construction and infrastructure

| Organisation | What is documented | Source |
|---|---|---|
| **McCarthy Building Companies** | Multi-year partnership announced June 2026. McCarthy is building its "AI Operations Suite – Pulse" on AIP and connecting estimating, contracts and execution "through that same Ontology". It is modelling its tech team around embedded Palantir engineers. | https://www.mccarthy.com/insights/mccarthy-and-palantir-announce-strategic-partnership-to-bring-ai-to-the-construction-field ; https://www.constructiondive.com/news/mccarthy-palantir-artificial-intelligence-ai-partnership/822517/ |
| **Thomas Cavanagh Construction** | Extended its partnership to 31 Dec 2035 (release dated 27 May 2026). "We rebuilt critical workflows directly within Foundry" rather than doing API integrations. It is now commercialising Foundry-based solutions for other contractors. Palantir lists its "Total Operations Management" as "a replacement for all other scheduling software". | https://www.newswire.ca/news-releases/thomas-cavanagh-construction-limited-extends-strategic-partnership-with-palantir-technologies-through-december-31-2035-863207801.html ; https://www.palantir.com/offerings/construction/ |
| **The Nuclear Company** | "Nuclear Operating System" (NOS) built on Foundry for reactor construction, announced 27 June 2025. It covers schedule guidance and supply-chain verification. The reported value is $100M over five years. | https://world-nuclear-news.org/articles/companies-partner-on-ai-platform-to-speed-up-nuclear-deployments ; https://www.powermag.com/groups-partnering-to-develop-ai-software-to-speed-nuclear-reactor-construction/ |
| **Jacobs** (E&C / water) | Foundry at the Agua Nueva water reclamation site: 20% plantwide power savings. Also quoted on frontline mixed reality. | https://www.palantir.com/impact/jacobs/ ; https://www.palantir.com/ |
| **Utilities** | PG&E (first major US utility on Foundry, used for Public Safety Power Shutoffs). National Grid and Southern California Edison are also reported. The utilities page cites Jacobs and Sonnedix (solar). | https://www.streetinsider.com/Corporate+News/Palantir+(PLTR)+Providing+Technology+to+Enhance+Safety+and+Reliability+of+Electric+Grid+in+California/17833241.html ; https://www.utilitydive.com/spons/building-the-connected-utility-of-the-future/624039/ ; https://www.palantir.com/offerings/utilities/ |
| **Energy** | Kinder Morgan and Sonnedix impact studies are listed. | https://www.palantir.com/platforms/ontology/ (footer list) |

**What I could not find:** any documented Palantir deployment with Bechtel, Fluor or AECOM, or with a Middle East or South Asian EPC or project owner. Treat all of these as unsourced. The AIP page lists "Construction & Real Estate" as an industry category in AIP Now (https://www.palantir.com/platforms/aip/).

---

## 4. The "Palantir for construction" landscape

| Company | What it claims | How the site tells it | Gap it leaves |
|---|---|---|---|
| **Nodes & Links** | "Finally, your project can talk back." AI for project controls, with "auditable, hallucination-proof answers grounded in P6 principles", covering schedule integrity, delay analysis, QSRA and EVM. Logos include Bechtel, VINCI, Ferrovial, HS2 and Network Rail (https://nodeslinks.com/). It sits "atop your scheduling systems" (https://nodeslinks.com/solutions/contractors/). | Conversational hook, then logos, then comparisons against generic LLMs, then trust claims (https://nodeslinks.com/). | It is centred on the schedule file. It doesn't model resources, work fronts or site physics, and it doesn't write actions back. |
| **ALICE Technologies** | Generative scheduling that simulates "millions of possible scenarios". Deployed on "$297 billion" of projects. Claims 17% shorter duration and 14% lower labour cost (https://www.alicetechnologies.com/). | Stats → logos → products (Plan / Optimize / Model) → case studies, with real Gantt and scenario screenshots (https://www.alicetechnologies.com/). | Strong on the physics of planning, but it is a planning tool rather than a live operating layer. Humans take its output away to act on it. |
| **Oracle Construction & Engineering (Smart Construction Platform / Intelligence)** | "More than $9T in project value managed" (https://www.oracle.com/construction-engineering/). The "Intelligence" line (renamed from Construction Intelligence Cloud) adds prebuilt pipelines from P6, Unifier and Aconex, natural-language "talk to your database", and an AI Advisor for Safety (https://www.oracle.com/construction-engineering/intelligence/). | Scale numbers first, then a catalogue of products and ebooks. Reads as a suite brochure (https://www.oracle.com/construction-engineering/). | Analytics and prediction are bolted onto Oracle's own record systems. There is no unified semantic model across vendors and no approval loop that acts on the work. |
| **InEight** | "Deliver high-stakes capital projects with certainty". Connects scope, cost, schedule and execution. "Data for Outcome-Driven AI" is stated but not specified (https://ineight.com/). | Logos (AECOM, Kiewit, WSP) → role benefits → modules. Text-heavy (https://ineight.com/). | The AI story is vague. It sells integrated modules, not a model of the project that AI can reason over. |
| **Hexagon → Octave (Sequence Enterprise, formerly EcoSys; Smart Build)** | Octave was spun off from Hexagon on 28 May 2026 (https://hexagon.com/company/newsroom/press-releases/2025/octave-unveiledhexagon-reveals-name-for-potential-2026-company-spin-off). Sequence cites Forrester TEI results: "20% reduction in project cost overruns" for a composite organisation (https://www.octave.com/products/project-performance/sequence/sequence-enterprise). EcoSys 9.4 added the "Alix" chat assistant (https://aliresources.hexagon.com/enterprise-project-performance/introducing-ecosys-9-4-ushering-in-a-new-era-of-intelligent-projects). Smart Build covers 5D BIM cost control (https://hexagon.com/products/hxgn-smart-build-project-controls). | Benefit bullets, commissioned statistics and case studies (Technip Energies) (https://www.octave.com/products/project-performance/sequence/sequence-enterprise). | A project-controls back office with a chat assistant on top. No model of the field. |
| **Bentley (iTwin, SYNCHRO / SYNCHRO+)** | SYNCHRO+ is "a next-generation, AI-powered construction application that redefines traditional 4D modeling". Bentley Copilot "can make changes to models". CEO: "Our users are in control of their data" (https://www.bentley.com/news/bentley-systems-advances-infrastructure-ai-with-new-applications-and-industry-collaboration/). SYNCHRO case results include £80M of schedule benefits at Sellafield (https://www.bentley.com/software/synchro/). | Leads with 4D visuals such as crane sequences and critical-path highlighting (https://www.bentley.com/software/synchro/). | The geometry comes first. The model is of the *asset*, not of the *operation*: who does what, with which resource, and when. |
| **Buildots** | "KNOW. ACT. OUTPERFORM." Claims "up to 50% delay reduction" from comparing site capture with the plan (https://www.buildots.com/). | Three-word framework → logos → results (https://www.buildots.com/). | A sensor for progress (what got built) that feeds decisions but doesn't orchestrate them. |
| **Doxel** | "Physical Intelligence for Construction". Computer vision on 360° capture: "11% faster project delivery" (https://doxel.ai/). | Logos → features → a three-step "how it works" (https://doxel.ai/). | Same as Buildots: it observes the work but doesn't act on it. |
| **Slate Technologies** | "Connects project data systems, automates workflows, and delivers data-driven insights" (https://www.slate.ai/). | Problem statistic ("95% of construction data goes unused") → product suite → awards (https://www.slate.ai/). | The closest to an integration layer, but thinly evidenced. |
| **Datagrid** (acquired by Procore, Jan 2026) | "AI Agents that Do the Work for You". Examples include Buro Happold spec review going from "3–4 hours to 2–3 minutes" (https://www.datagrid.com/). Procore acquired it on 20 Jan 2026 (https://www.procore.com/press/procore-acquires-datagrid). | Every case study leads with a number (https://www.datagrid.com/). | Document-workflow agents (submittals, RFIs) with no model of the work itself. |
| **Trunk Tools** | "The AI platform built for construction". The "Cortex" layer maps documents to drawings. "Live on 1,000 U.S. projects", "$50 billion" of volume (https://www.trunktools.com/). | Scale claims → eight named Trunk* tools (https://www.trunktools.com/). | Document intelligence, US general-contractor focus. |
| **Document Crunch** | "Every dispute started somewhere. It was probably page 47." Contract risk. "500+ companies" (https://www.documentcrunch.com/). | A sharp copy hook with cited-answer and security principles (https://www.documentcrunch.com/). | Covers one domain: contract risk. |
| **Procore AI** (added) | "Construction AI built to get work done". Agents for RFIs and submittals, the "Magpie" reasoning model, "150+ built-in actions" (https://www.procore.com/ai). | Numbered customer outcomes and governance claims (https://www.procore.com/ai). | Agents that act *inside Procore's records*. This is the closest competitor to an "action" story, but it is document- and record-centric. |

**Pattern.** Each player owns one slice: the schedule (Nodes & Links, ALICE), documents (Trunk, Document Crunch, Datagrid, Procore), site capture (Buildots, Doxel), geometry (Bentley), or controls and ERP (Oracle, InEight, Octave). None of their sites shows a *typed model of the whole operation* (scope ↔ work front ↔ resource ↔ constraint) with AI proposing actions and humans approving writes. Palantir's construction page fills that gap generically (https://www.palantir.com/offerings/construction/). DiPGOS can claim it *specifically* for megaprojects.

---

## 5. Implications for the Indus site

**Lessons**

1. **Name the nouns *and* the verbs.** Palantir's whole explanation rests on "nouns" (objects, links) and "verbs" (actions) (https://www.palantir.com/docs/foundry/ontology/why-ontology/). Indus should list its actual object types (Scope item, Work front, Operation, Crew, Equipment, Constraint) *and* its actual actions (re-sequence, reallocate, release a work front). Without the verbs it is just a data model.
2. **Frame the product around decisions, not data.** Palantir's line "represents the decisions … not simply the data" (https://www.palantir.com/docs/foundry/ontology/why-ontology/) translates directly into megaproject language: "which work front opens tomorrow, with which crew".
3. **Show the approval loop as a screen.** AIP shows proposals, human review and counts of accepted and rejected proposals (https://www.palantir.com/platforms/aip/). Indus should show a real DiPGOS proposal card with its reasoning, the approver, and what gets written back.
4. **Annotate real UI; don't illustrate it.** Use lettered callouts on real screenshots, as the AIP page does (https://www.palantir.com/platforms/aip/). Label any data that is notional, as Jacobs does (https://www.palantir.com/impact/jacobs/).
5. **Write case studies as engineering reports.** Follow the Jacobs structure: result with units → problem → systems integrated → mechanism → where the human stays in control (https://www.palantir.com/impact/jacobs/).
6. **Attribute numbers.** Palantir's homepage quotes are named and carry numbers (https://www.palantir.com/). Its construction page's figures are not (https://www.palantir.com/offerings/construction/), and they read weaker for it. Indus should attach every figure to a named project, or say "pilot, unnamed at client request".
7. **Say what you sit on top of.** Palantir and Nodes & Links both reassure buyers about existing systems ("preserving existing technology investments", "atop your scheduling systems") (https://www.palantir.com/offerings/construction/, https://nodeslinks.com/solutions/contractors/). Name P6, ERP, BIM and document systems explicitly.
8. **Own "the physics of the work" as the thing that sets DiPGOS apart.** Competitors model documents, schedules or geometry (see section 4). No one's site shows constraints such as crew productivity, curing times or access sequencing driving the proposals. Show one constraint with a worked example.
9. **Make the marketing page a front door to depth.** Every Ontology block on Palantir's site links to the docs (https://www.palantir.com/platforms/ontology/). Indus should link each claim to a concise technical note or glossary entry.
10. **Governance is a feature, not a footer.** Palantir gives "Govern the human-agent labor force" equal billing with data, logic and action (https://www.palantir.com/platforms/ontology/). Bentley leads with data control (https://www.bentley.com/news/bentley-systems-advances-infrastructure-ai-with-new-applications-and-industry-collaboration/). Indus should state who can approve which action, and what is logged.
11. **Keep to one quiet visual system.** Palantir gets its seriousness from regular-weight type, one accent colour, isometric line diagrams and monospace labels (https://www.palantir.com/platforms/ontology/). Indus should borrow the restraint, not the look. Its own drawing-sheet language fits E&C.
12. **Go deep where you can't go wide.** Oracle ($9T) and Trunk (1,000 projects) lead with scale (https://www.oracle.com/construction-engineering/, https://www.trunktools.com/). Indus should lead with one megaproject: its work fronts, its objects and the decisions per week.

**Traps to avoid**

- **Borrowed grandeur.** Palantir's "Sovereign AI" tone rests on defence programmes (https://www.palantir.com/). Without comparable proof, the same register reads as vapourware.
- **Generic "AI-powered".** InEight's "Data for Outcome-Driven AI" and Slate's "95% of data unused" show how unspecified AI claims blur together (https://ineight.com/, https://www.slate.ai/). Every AI claim should name its input, its output and who approves it.
- **"Palantir for X" as a headline.** It concedes the category to Palantir, which now has its own Construction Ontology page (https://www.palantir.com/offerings/construction/). Use the comparison in conversation, not on the page.
- **Unattributed percentages** (see lesson 6), and stock photos of hard hats standing in for product.
- **Chat as the hero.** Even Palantir says "Go beyond chat" (https://www.palantir.com/platforms/aip/).

---

## Sources

- https://www.palantir.com/
- https://www.palantir.com/platforms/ontology/
- https://www.palantir.com/platforms/aip/
- https://www.palantir.com/offerings/construction/
- https://www.palantir.com/offerings/utilities/
- https://www.palantir.com/impact/jacobs/
- https://www.palantir.com/docs/foundry/ontology/overview/
- https://www.palantir.com/docs/foundry/ontology/why-ontology/
- https://www.palantir.com/docs/foundry/object-link-types/object-types-overview/
- https://www.palantir.com/docs/foundry/object-link-types/link-types-overview/
- https://www.palantir.com/docs/foundry/action-types/overview/
- https://www.palantir.com/docs/foundry/action-types/webhooks/
- https://www.palantir.com/docs/foundry/functions/overview/
- https://www.palantir.com/docs/foundry/logic/overview/
- https://www.palantir.com/docs/foundry/automate/overview/
- https://www.palantir.com/docs/foundry/agent-studio/overview/
- https://www.mccarthy.com/insights/mccarthy-and-palantir-announce-strategic-partnership-to-bring-ai-to-the-construction-field
- https://www.constructiondive.com/news/mccarthy-palantir-artificial-intelligence-ai-partnership/822517/
- https://www.newswire.ca/news-releases/thomas-cavanagh-construction-limited-extends-strategic-partnership-with-palantir-technologies-through-december-31-2035-863207801.html
- https://world-nuclear-news.org/articles/companies-partner-on-ai-platform-to-speed-up-nuclear-deployments
- https://www.powermag.com/groups-partnering-to-develop-ai-software-to-speed-nuclear-reactor-construction/
- https://www.streetinsider.com/Corporate+News/Palantir+(PLTR)+Providing+Technology+to+Enhance+Safety+and+Reliability+of+Electric+Grid+in+California/17833241.html
- https://www.utilitydive.com/spons/building-the-connected-utility-of-the-future/624039/
- https://nodeslinks.com/
- https://nodeslinks.com/solutions/contractors/
- https://www.alicetechnologies.com/
- https://www.oracle.com/construction-engineering/
- https://www.oracle.com/construction-engineering/intelligence/
- https://ineight.com/
- https://hexagon.com/company/newsroom/press-releases/2025/octave-unveiledhexagon-reveals-name-for-potential-2026-company-spin-off
- https://www.octave.com/products/project-performance/sequence/sequence-enterprise
- https://aliresources.hexagon.com/enterprise-project-performance/introducing-ecosys-9-4-ushering-in-a-new-era-of-intelligent-projects
- https://hexagon.com/products/hxgn-smart-build-project-controls
- https://www.bentley.com/news/bentley-systems-advances-infrastructure-ai-with-new-applications-and-industry-collaboration/
- https://www.bentley.com/software/synchro/
- https://www.buildots.com/
- https://doxel.ai/
- https://www.slate.ai/
- https://www.datagrid.com/
- https://www.procore.com/press/procore-acquires-datagrid
- https://www.trunktools.com/
- https://www.documentcrunch.com/
- https://www.procore.com/ai
