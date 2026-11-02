# DiPGOS: what the product does, as built (2026-09-25)

Source: the product repo at `Indus Technologies/Indus` (read-only). All paths below are relative to that repo. Both sub-repos (`platform/`, `frontend/`) are checked out on the `ACCS_Development` integration branch. It is 591 and 942 commits ahead of `main` respectively and is the branch deployed to Railway (`platform/docs/accs-backend-railway-health-2026-09-11.md`).

**Status key.** **SHIPPED**: built, merged to `ACCS_Development`, reachable in the deployed app. **IN PROGRESS**: code exists, but its data is thin or synthetic, or it has known blocking gaps. **PLANNED**: a placeholder, a mock, or a design doc only.

---

## 1. Plain description

DiPGOS ("Digital Project Governance & Operations System", `frontend/DESIGN.md`) is a FastAPI + Postgres/pgvector backend with a React SPA. It has three pillars (`docs/DIPGOS-FEATURE-CATALOG.md` §1):

- **CPDS**: tender to proposal. It uploads a tender, extracts a synopsis, profiles requirements by discipline, maps requirements to deliverables (Orchestrator), breaks deliverables into operations and man-hours (Composer), consolidates, then auto-derives a Gantt and budget and exports Excel and Word.
- **ACCS**: execution control for a heavy-civil job. The live instance is the Diamer-Basha Dam MW-1 RCC Stage 1 contract. ACCS models the work as Project → Contract → Scope → Activity → Process → Operation → Atom. It takes daily site reports, including photographed paper forms, checks every figure against the method statement's limits, raises alarms and sign-off requests, and folds progress, stock and earned value from those dated records.
- **AOS** (operations and maintenance): not built.

An AI assistant, **Mutlashi** (also called the Knowledge Repository), answers questions over the tender and execution corpora.

---

## 2. The ontology / semantic model

**Two layers.**

**(a) The operational hierarchy in the database.** `docs/DIPGOS-FEATURE-CATALOG.md` §6.1 gives the navigation tree. `docs/ATOM-MANAGER.md` §3b says all levels share one `entity` table, linked by `child_of`.

**(b) The formal ontology in `platform/ontology/`.** It is version 1.0.0 and `release_status: draft` (`ontology.yaml`). It defines:

- **Entity types:** `Operation` and `WorkFront` ("spine"); `Atom`, `AtomType`, `EquipmentAtom`, `MaterialAtom`, `WorkforceAtom` ("resource") (`entities/`).
- **Relationships:** `REQUIRES` (Operation → Atom; EquipmentAtom → WorkforceAtom/AtomType, with `quantity_per_unit`, `role`, `waste_factor`), `PERFORMED_AT` (Operation → WorkFront), and `PRECEDES` (Operation → Operation, with `lag` in hours) (`relationships/*.yaml`).
- **Nine contexts:** each is "a reasoning mechanism, not a business category" and has an accountable owner. They are GEO (site engineer), PHY (materials engineer), FUN (discipline lead/QA-QC), FIN (cost controller), CTR (contracts manager), HSE (HSE officer), LOC (planner), SUP (procurement lead) and SCH (scheduler) (`ontology/README.md`).
- **Verdicts:** matching gives **one verdict per context, never one pass/fail**. The values include `satisfied` (with margin), `not_satisfied` (routed to the context owner) and `indeterminate` (`matching/verdicts.yaml`).
- **Machinery:** 13 operators (e.g. `range_coverage`, `subsumption`, `spatiotemporal_exclusion`), 16 value shapes, 5 cascades (`access-window`, `ambient-temperature`, `cure-duration`, `ground-conditions`, `weather-wind`), and taxonomies (`atom-kind` with 30+ kinds such as `compaction_plant`, `concrete_mix` and `cementitious`, plus `qualification`, `cost-code` and `work-type`). Everything validates against JSON schemas in `_schema/`.
- **Projection:** `platform/projection/` maps relational rows to graph nodes and edges.

```
Project ─ Contract ─ Scope ─ Activity ─ Process ─ Operation ──PERFORMED_AT──▶ WorkFront
 (Diamer-Basha) (MW-1)  (SOW-1) (RCC Construction)  │      (e.g. "Blocks 14–15 · EL 922.0–932.2 · Lift 2 · Layer 7")
                                                    ├─PRECEDES(lag)─▶ Operation
                                                    └─REQUIRES / operation_atom(consumes|uses, qty)─▶ Atom
                                                                                        │ behaviour class ∈ {material, workforce,
                                                                                        │   equipment, temporary_works, deliverable, storage}
                                                                                        ├─ units (one per physical machine/set/vessel/person)
                                                                                        ├─ holdings/movements (material lots in vessels)
                                                                                        └─ atom_requirement ─▶ Kind ("roller needs operator 1/mch-h, diesel 8 L/h")
```

**"Physics and operational sciences" means these concrete things in the code:**

- **Method-statement checks as data points.** `platform/backend/scripts/seed_rcc_method_statement.py` authors 6 processes and 21 operations from method statement MS-348 through the same composer API the UI uses. Examples:
  - Unloading height ≤ 1.5 m and spread layer thickness = 33 cm (Place & Spread).
  - Roller speed ≤ 2.5 km/h, passes "1+4~5+1", compacted layer = 30 cm, compacted before initial set (Compact RCC).
  - Bedding mortar 10–15 mm, aggregate moisture ≤ 5 %, pozzolan Blaine ≥ 400 m²/kg.
  - Dump-truck speed ≤ 15 km/h (tagged `hse`), grout dosage 6 L/m, curing 14 days.
  - Each check carries a context tag and an alarm flag.
- **Recipes.** Operations `consume` or `use` atoms with quantities, e.g. Batch & Mix uses 90 kg pozzolan and 95 L water (same file, lines ~491–501).
- **Co-requirements.** A vibratory roller needs an operator at 1 per machine-hour plus diesel at 8 L/h (`platform/backend/docs/accs/Demo-Questions.md` Q17). CIL resolves "bulldozer operator *is a* plant operator" by subsumption (`platform/ontology/BUSINESS-CASE.md` §5).
- **Cascades.** Cure duration is published by PHY on the mix and derives SCH's minimum lag, so the schedule "reflects the chemistry rather than restating it". This is authored, but the data still hard-codes 72 h on the Cure operation (`ontology/contexts/_cascades/cure-duration.yaml`).
- **Geometry-driven quantities.** `dam_stage1.py` expands the dam into blocks, lifts at the drawing's pins, and 0.3 m layers. Volumes are scaled to MS-348 Table 6-1, and each front's quantity comes from demand, geometry or occurrence (`services/process_configurator/quantity.py`, `supply.py`).
- **Scheduling.** A CPM forward and backward pass computes total float on work fronts (`process_configurator/cpm.py`).
- **Productivity norms (CPDS side).** Norms turn deliverables into man-hours (`/api/v1/norms`, `requirement_norm_map`, catalog §10.2).

---

## 3. Modules and capabilities

| Module | Status | Evidence / notes |
|---|---|---|
| **Command Center** (CPDS bid portfolio; ACCS "command headline" tiles for execution + quality/NCR per activity, process and operation) | SHIPPED | `frontend/src/core/router/lazyRoutes.ts:293`, `modules/accs/activity/pages/components/CommandHeadline.tsx`. 20 Descon users over 168 person-days (`platform/docs/pilot-report/pilot-report.md` §1.2) |
| **CPDS pipeline** (synopsis, profiler v3 for civil/electrical/mechanical/piping/process/I&C, nomination, orchestrator, composer, consolidator, Excel/Word export) | SHIPPED, piloted | Catalog §2. Pilot: 24 Descon users, 23,594 requests, 3,215 saved changes (pilot-report.md) |
| **Scheduling**: CPDS auto Gantt; ACCS configurator (assignments, work fronts, CPM float, baseline freeze/"Finalize", client schedule MS-348 imported verbatim) | SHIPPED (CPDS); SHIPPED on the ACCS branch | Catalog §2.9, §3.2; `process_configurator/{cpm,finalize,ms348_schedule}.py`; `execution/progress.py` measures against the frozen baseline |
| **Finance / cost**: CPDS Sankey + budget; ACCS BOQ, certified work, IPC bills that freeze on approval, price adjustment `P1 = P0(a + b·L1/L01 + …) − P0`, claims and instructions, retention/advance recovery | CPDS SHIPPED; ACCS commercial IN PROGRESS | `services/{billing,price_adjustment,pa_formulas,changes,contract_finance}.py`; UI tabs in `frontend/src/modules/process-composer/pages/components/activity/` (BillOfQuantitiesTab, InvoicesTab, PriceAdjustmentTab, ChangesTab). The only BOQ is a seed with 1 item (`routes/boq.py` docstring); "Nothing commercial is loaded" (Demo-Questions.md) |
| **Supply chain**: PO lifecycle REQ→PO, receipts that fold into stores, committed / received / paid / outstanding | IN PROGRESS | `services/procurement/{orders,commitment,receipts}.py`. Procurement tables 0/11 populated (`platform/backend/docs/accs/Data-Inventory.md`). Receipts crash stock reads (HIGH bug, Railway health doc §1). The SCM screen runs on `SyntheticDataService.ts` |
| **Risk** | PLANNED | `/cpds/risks` page says "(dummy data)" (`frontend/src/modules/cpds/dashboard/pages/RisksPage.tsx`); `risk_register` has 0 rows |
| **Resources: Atom Manager** (6 behaviour classes, units, holdings in vessels, append-only ledger, availability by reason, demand and schedule forecasts, media) | SHIPPED | `docs/ATOM-MANAGER.md`; R5 browser walkthrough (`docs/atom-manager-redesign/_archive/review/r5-built/walkthrough.md`). Finance and Documents tabs are not built (§8) |
| **Documents**: register, OneDrive/SharePoint sync, "Evaluate" against the contract, drawing↔atom map | IN PROGRESS | `docs/document-manager-redesign/README.md` (two screens behind a build flag, 13 bugs); screenshot `docs/document-manager-redesign/live/01-global-root.png` |
| **Quality**: every data-point breach raises an NCR; people raise QAORs; close and reopen need a reason, with an event history | SHIPPED | `services/execution/alarms.py`, `alarm_lifecycle.py`, `db/models/alarm.py:115`. Q13–15 in Demo-Questions.md (40 open majors; 9 runs approved with 29 open alarms) |
| **HSE / Sustainability** | PLANNED (mock) | `sustainabilityMock.ts`: "no backend answers this yet … the page marks every figure Synthetic". HSE context "has no source data at all" (`ontology.yaml`) |
| **Alarms** | SHIPPED | `/api/v1/alarms` with scope, severity and as_of filters (`platform/backend/docs/accs/INTEGRATION-STATUS.md` §2) |
| **Approvals / decision register** (one pending sign-off per operation output, approver taken from the method: QA Manager, Site Engineer, Consultant Rep) | SHIPPED | `services/execution/{decisions,approval}.py`. "Anyone may decide, for now": there is no party model |
| **Change Manager** | PLANNED | Generic CRUD route (`routes/change_management.py`) plus per-level JSON fallbacks (`modules/user-actions/changeManagement/data/*.json`); tables empty |
| **Decision Engine** (`/decision-engine`) | SHIPPED as a diagram only | A static ReactFlow graph of the CPDS workflow (Upload ITB → Synopsis → Bid/No-Bid …) (`modules/cpds/decision-engine/data/decisionEngineGraph.ts`). It is not an engine |
| **CIL** (completeness and compatibility of an atom on an operation) | Completeness IN PROGRESS; compatibility deferred | `ontology/BUSINESS-CASE.md` §0: a full run gave "2024 verdicts, and not one satisfied or not_satisfied" |
| **Knowledge Repository / Mutlashi** (agentic RAG, 11 tools, citations, stage labels tender/FEED/delivered, calculator; separate ACCS agent) | SHIPPED | Catalog §7; `platform/knowledge-repository-user-manual.md`; `services/rag/accs/`. Pilot: 195 Descon questions; use "started strong and faded"; 0 ratings |
| **AI form reading** (photo or scan of a paper sheet → proposal; the human confirms; OneDrive "Site reports" folder watcher) | SHIPPED on the ACCS branch | `services/execution/intake.py` ("Nothing here writes … a value with no source is not a value"), `drive_intake.py`, `evidence.py` |
| **Forms**: the work-front report form is generated from the operation's data points | SHIPPED | `GET /execution/work-fronts/{id}/form`; `services/execution/form.py`; real sheet `RCC-PL-place-and-spread-rcc (FORM).docx` (repo root) |
| **AOS** | PLANNED | Nav slot only (catalog §1, §12.1) |

---

## 4. Real data and examples

- **Project:** Diamer Basha Dam, contract MW-1, "RCC Dam Construction Stage 1 (Blocks 12-24, EL.898-990 m)". The source document is PFJV-DBDP-DBCG-PM-TMP-2026-348 (MS-348), with specification Vol 3A ch.6 (143 clauses). The PDF is at `frontend/docs/PFJV-DBDP-DBCG-PM-TMP-2026-348 … .pdf`. Hierarchy: Diamer Basha → contract → RCC Placement → Placement & Compaction → Compact RCC (`Demo-Questions.md` Q3). URL slugs are `pbs-bd-dam-mw01`, `mw-1`, `sow-1` (`docs/ATOM-MANAGER.md` §3b).
- **Dam breakdown:** 13 contraction-joint blocks (12–24), EL 898–988, 24 placement panels, 4,880 places (Q12). The breakdown document was later replaced by panel / panel-lift / panel-layer levels (`platform/backend/docs/accs/PBS-Dam-API.md` warning box).
- **Scale in the pilot database (2026-09-01):** 9,423 work fronts, 9,423 schedule activities, 17,947 schedule links, 1,424 units, 114 atoms, 216 atom types, 55 rules, 37 methodologies, 93 alarms. 59 of 180 tables are populated (`Data-Inventory.md`).
- **Demo figures (2026-09-04, "checked against SQL"):**
  - 2,038,683 m³ placed: 101.5 % of target on started fronts, 36.0 % of 5,661,201 m³ overall.
  - 11,086 m³ placed on 31 Aug in four pours.
  - 600 pours awaiting sign-off.
  - Batching plants at 360 and 320 m³/h (cooled).
  - Source: `Demo-Questions.md`. Not independently verified as real site data (see §8).
- **Catalogue (seed `basha_mw1.py`):** Table 4-1 has 24 equipment rows covering 123 machines, and Table 4-2 has 18 material rows. "Cement 595,115 T · Estimated" is planned consumption, not stock. Examples: crawler dozer DH13-B3, vibratory roller 14.5/20 t, tower placer, cable crane 30 t, GERCC grouting unit, and 581 roll-over formwork sets (`docs/ATOM-MANAGER.md` §1).
- **Real field form, "PLACE & SPREAD RCC · RCC-PL":**
  - Header: "PFJV / Descon · RCC Dam Construction Stage 1 · Method Statement MS-348 · Daily site record".
  - Sample sheet: Lift 2, Layer 7, Panel Blocks 14–15 · EL 922.0–932.2, 820 m³.
  - Four checks: slope ≤ 1:10 (recorded 1:11), unloading height ≤ 1.5 m (recorded 2), layer = 33 cm (recorded 35), temperature < 18 °C (recorded 18.5).
  - Instruction printed on the sheet: "a blank is recorded as 'not answered', never as a pass."
  - Source: `RCC-PL-place-and-spread-rcc (FORM).docx`.
- **Units in use:** m³ placed/compacted, m² treated/cured, m of joint, kg/m³ (wet density 2590 min avg, 2510 floor), Vebe seconds, °C, km/h, L/h, PKR (idle cost "PKR 1,008,000/week", R5 walkthrough).
- **CPDS pilot:** Descon engineers, 8 Jul–28 Aug 2026. Most activity concentrated on RFP 36, in the I&C/Process disciplines (`docs/feedback/FEEDBACK_AUDIT.md` §2). The KR example corpus is EPC work: fire-water pumps, P&IDs, IFC gates, and man-hour norms (KR manual §6).

---

## 5. What genuinely differentiates it, in the product's own terms

1. **"Records in, state out."** No current figure is stored. Stock, hours, availability, progress and earned value are folds over append-only dated records, computed "as of" a caller's date (`docs/ATOM-MANAGER.md` §1; `contract_finance.py`: "nobody types an amount anywhere in this file's path"). You can ask "what did this say in August?"
2. **The method statement is executable.** The same data points drive the paper form, the screen form, the AI extraction schema, the alarm rules and the approver chain (`intake.py`, `decisions.py`: "The chain is authored, not configured"). P6 and Procore keep the method statement as an attachment.
3. **Paper stays paper.** A foreman photographs the sheet or drops it in OneDrive. The system matches it to the right work front by the site's own words ("Blocks 18–20 · EL 898.0–901.0 · Lift 1 · Layer 1"), and "a sheet that resolves to two fronts is parked, not assigned" (`drive_intake.py`).
4. **Place-level granularity.** Progress is tracked per block, lift, layer and panel of the dam, drawn and coloured from the same read (`PBS-Dam-API.md`).
5. **Verdicts with owners.** "Not suitable — Physical, 5 °C short, materials engineer" rather than pass/fail (`ontology/README.md`, `verdicts.yaml`).
6. **Honest nulls.** `null` means "nothing reported", while `0` or `[]` means "we looked and there is none". No route pads a failure (`platform/backend/docs/accs/README.md`). Progress is shown against two named denominators (101.5 % vs 36.0 %).
7. **Money follows the pour.** Earned value is computed as runs × BOQ rate. Bills freeze on approval. Price adjustment uses the contract formula with published indices, and rejected claims are kept (`billing.py`, `price_adjustment.py`, `changes.py`).

---

## 6. Vocabulary (glossary)

- **Atom**: a specification ("Grade 53 OPC cement").
- **Kind / type**: the category of an atom ("Bulldozer").
- **Unit**: one physical thing (e.g. set 037 of 581).
- **Holding / lot**: material placed in a **vessel** (a silo is a storage unit).
- **Movement**: a delivery, transfer or consumption.
- **Behaviour class**: one of material, workforce, equipment, temporary works, deliverable, storage.
- **Recipe**: `consumes` / `uses`.
- **Co-requirement / needs**: what an atom requires in order to operate (e.g. operator, diesel).
- **Work front**: "a bounded place where an operation is performed, over a bounded period". Synonyms: work face, block, bay, panel-layer.
- **Run**: a filed report.
- **Data point / check**: a measured item on a report or form.
- **Output + approver**: what an operation produces and who signs it off.
- **Decision**: a sign-off request.
- **Alarm → NCR** (raised by a rule) / **QAOR** (raised by a person).
- **Fold, as-of, data date**: how figures are computed and dated.
- **Baseline / Finalize / snapshot**: the frozen plan that progress is measured against.
- **CPM float, critical**: scheduling terms.
- **Lift, layer, panel, block, EL (elevation), GERCC, green cutting, bedding mortar, Vebe, pozzolan**: RCC dam construction terms.
- **Placement Permit (RCC-04), RCC-01…05 inspections**: permit and inspection names from the method statement.
- **BOQ, IPC, price adjustment (PA), retention, advance recovery, claim, instruction, provisional sum**: commercial terms.
- **CPDS pipeline**: ITB/RFP, synopsis ("sypnosis" in code), BDS, profiler, spine, discipline, nomination, orchestrator, deliverable, composer, consolidator, buffers, bid/no-bid.
- **KR layers**: tender, FEED, reference standard, planned, delivered, proposal.
- **Nine contexts**: GEO, PHY, FUN, FIN, CTR, HSE, LOC, SUP, SCH.
- **Verdicts**: satisfied / not_satisfied / indeterminate.
- **Business Function (BF)**: a lens available at every hierarchy depth.
- **Mutlashi**: the AI assistant. **DEST**: the design/proposal side of the product (`services/rag/accs/__init__.py`).

---

## 7. Visual assets

**Screenshots of the real app (dark theme):**

- `docs/atom-manager-redesign/_archive/review/r5-built/`, taken 19 Sep in the real app against pilot data:
  - `01-home.png`: six class tiles (536 people, 134 machines, 710 sets, 24 vessels), fault counts, "LIVE · as of 19 Sep 2026" stamp, demand forecast, and schedule lanes such as "3 × Formwork climb — Block 21".
  - `04-class-equipment.png`
  - `06-faults-panel.png`
  - `09-unit.png`
  - `10-record-sheet.png`: record "what happened" by reason (Mechanical breakdown … Scheduled service, goes for approval), "appended, never overwritten".
  - `11-calendars.png`
- `docs/atom-manager-redesign/_archive/live/` (11 Sep): 16 shots, e.g. `02-class-equipment.png` (real catalogue rows: "Concrete batching plant 360 m³/h (cooled)", "Crawler dozer DH20-B3"), `16-unit-vessel.png`, `15-kind-drawer.png`. `12-atom-schedule-bug.png` shows a bug; do not use it.
- `docs/document-manager-redesign/live/01-global-root.png`: file list with MS-348 PDF, Volume 3A, the RCC-PL form, and "Evaluate" buttons. It shows staff names, so crop them.
- Earlier light-theme shots: `frontend/docs/superpowers/specs/screenshots/01-…08-*.png`.

**Imagery:**

- `frontend/public/images/ACCS/basha-diagram.jpg` is a stylised illustrative map, not an engineering drawing.
- `frontend/public/images/{ACCS,CPDS,AOS,portfolio}/*.jpg` are photos of Pakistani and Gulf projects (Tarbela, Dasu, Mohmand, NEOM, Jubail…). Their provenance and licence are unrecorded.
- `frontend/public/atom-images/` (29 Wikimedia files) and `atom-models/` (54 Poly Pizza `.glb` files) are CC0/CC-BY/CC-BY-SA and **need attribution** (`docs/atom-manager-redesign/atom-media-library.md`).
- Logo: `frontend/public/images/logo/dipgos-mark-{dark,light}.svg`. Mutlashi mark: `images/mutlashi/m-logo-2.svg`.

**Design language (`frontend/DESIGN.md`):**

- Tone: "a control room, not a consumer app", "calm, technical, trustworthy".
- Accent: blue is the brand. `#2563eb` in light, `#3b82f6` in dark. Accent-warm is `#fb923c`, accent-cool is `#0ea5e9` / `#34d399`.
- Status colours only for status: `#22c55e` success, `#f59e0b` warning, `#ef4444` error.
- Dark page `#040404`; light page is a gradient from `#fff` to `#f4f7ff`. Text `#0f172a` / `#f5f5f5`.
- Type: Poppins for headings, Inter for body, 14 px base.
- Shapes: 4 px spacing, 12 px card radius, soft shadows, glass panels, dotted canvas background for node graphs.
- Deviation: the Atom Manager screenshots use a gold "+ New atom" button and per-class hues, which departs from the "blue only" rule.

---

## 8. Cautions: do not claim yet

- **"Autonomous" anything.** AOS does not exist. ACCS has no autonomous control loop: a human confirms every AI-read value and every sign-off (`intake.py`, catalog §12.1).
- **Risk management, HSE, sustainability or change management as features.** They are dummy, mock or CRUD-only (see the §3 table).
- **"Decision engine / decision intelligence" as an optimiser.** The page is a static workflow diagram. DI is an LLM narrative over the bid.
- **Ontology-driven compatibility checks.** Draft ontology, and no satisfied/not_satisfied verdict has been produced on real data (`BUSINESS-CASE.md` §0). CTR, HSE and SUP are "largely ungrounded".
- **Accurate automated man-hour estimation.** This was the pilot's top complaint: 18 of 57 items said the deliverables follow DEST norms, not the client's SOW, and so the man-hours "cannot be trusted". All were closed as wont_fix/phase 2. Profiler citation line numbers are wrong (open #56/#57) (`FEEDBACK_AUDIT.md` §4.2, §4.6).
- **"Learns from your feedback."** Pilot learning is human-in-the-loop, and 0 ratings were given. Auto-learning is an enterprise-rollout plan (`kr-training-pilot-findings.md`).
- **Procurement, IPC and commercial control in production.** Tables are empty or a single seed row, and receipts currently crash stock reads.
- **Security and permissions.** Several ACCS read routes required no token when captured (`platform/backend/docs/accs/README.md` "Auth"). There is no party or role model on approvals, billing or suppliers (`approval.py`, `billing.py`, `orders.py`). Atom Manager has no role gating (`ATOM-MANAGER.md` §11).
- **Headline progress numbers (2 M m³, 101.5 %).** They come from the pilot database, which includes seeded records (`[seed:basha-mw1-activity]` markers, R5 walkthrough "Still open" #5). Stores read "hundreds of millions of kg below zero". Confirm provenance before publishing.
- **Named customers and people.** Descon, PFJV, the RFP/project names, staff names in screenshots, and the Chen Wei / Abid Shah names in the seed all need written permission.
- **Maturity.** The frontend test suite is "not green on a clean checkout". The backend has 30 known failures (`ATOM-MANAGER.md` §7; `platform/backend/docs/accs/README.md`).
