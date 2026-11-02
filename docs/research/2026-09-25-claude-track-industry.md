# Capital-project industry research: the Claude track

Date: 2026-09-25. This is one independent track of a two-model research exercise, written to ground the DiPGOS marketing story in cited facts.

Method: every factual claim is followed by a URL. Where a claim comes from general practitioner convention and I found no source, it is marked **unsourced**. Figures were checked against the primary document wherever it could be fetched: the Ansar et al. dam paper, the KPMG 2015 survey, Ballard's dissertation and the PIDE working paper were read in full text. mckinsey.com timed out on every fetch, so the McKinsey figures below come from search-engine excerpts of McKinsey's own pages and PDFs. Check them against the original before they go on the site. Four more claims also come from search excerpts, not fetched pages: the Gather Insights and Triangle PM quotes, the Dasu cost-driver percentages from Profit, and the DCMA thresholds.

---

## 1. The capital-project lifecycle, phase by phase

### 1.1 Stage gates (FEL 1–3)

- Independent Project Analysis (IPA) splits front-end loading into three gated phases. In FEL 1 (Business Planning) the team confirms "whether there is a business opportunity". FEL 2 (Scope Development) ends in the "selection and approval of a single alternative". FEL 3 (Project Definition, meaning FEED or basic engineering) ends in "full funds authorization", the Final Investment Decision. https://www.ipaglobal.com/news/article/what-is-front-end-loading-fel-in-project-management/
- IPA says its research across "more than 25,000 capital projects" shows "the completeness of FEL is the single best predictor of safety, cost, schedule, and operability outcomes." https://www.ipaglobal.com/news/article/what-is-front-end-loading-fel-in-project-management/
- Estimate maturity follows the gates. AACE 18R-97 grades estimates from Class 5 to Class 1 by level of project definition. A Class 5 estimate can have a range as wide as −50%/+100%. Class 3 is the "control budget" level, at about 10–40% definition and typically −20%/+30%. https://web.aacei.org/docs/default-source/toc/toc_18r-97.pdf ; https://epcland.com/cost-estimate-classification-system-for-process-industries/

### 1.2 Phase table

The decisions and data per phase follow IPA and AACE above. The "typical tools" column is practitioner convention unless it carries a citation.

| Phase | Key decisions | Data produced | Typical tools |
|---|---|---|---|
| Concept / feasibility (FEL 1) | Is there a business opportunity? Go to scope development? (IPA, above) | Business case, Class 5 estimate (AACE, above), option studies | Excel, GIS, hydrology models (**unsourced**) |
| Pre-feasibility / scope (FEL 2) | Pick one alternative (IPA) | Class 4 estimate, conceptual design, risk register | Excel, early P6 schedule (**unsourced**) |
| FEED / FEL 3 | FID, contract strategy (IPA) | Class 3 control budget, basis of design, level-2/3 schedule, WBS | P6, estimating tools, Unifier/EcoSys for budgets (**unsourced**) |
| Detailed engineering | Design freeze, IFC drawings | Drawings, models, document registers, transmittals | BIM authoring, Aconex/ACC CDE (Oracle: https://www.oracle.com/construction-engineering/aconex/) |
| Procurement | Award, expediting, inspection | POs, vendor data, delivery dates | SAP / ERP, procurement modules (**unsourced**) |
| Construction | Sequencing, change, claims | Progress, quantities, NCRs, safety records, daily reports | P6, Procore, InEight, Excel (https://www.procore.com/what-is-procore ; https://ineight.com/products/ineight-project-controls/) |
| Commissioning & handover | Mechanical completion, take-over | Punch lists, test records, as-builts | Completions systems, CDE (**unsourced**) |
| Operations | Asset management | Asset information model | CMMS/EAM. ISO 19650 describes the Project Information Model becoming the Asset Information Model at handover. https://en.wikipedia.org/wiki/ISO_19650 |

### 1.3 Contract models

- **FIDIC Red Book:** the Employer does the detailed design, and payment is by measurement against a Bill of Quantities. An Employer-appointed "Engineer" administers the contract and determines claims. https://www.instituteccp.com/fidic-red-yellow-and-silver-books-a-brief-overview/
- **FIDIC Yellow Book:** plant and design-build. The Contractor designs, payment is a lump sum in instalments, and the Engineer role stays. https://www.instituteccp.com/fidic-red-yellow-and-silver-books-a-brief-overview/
- **FIDIC Silver Book:** EPC/turnkey. The Contractor takes "total responsibility for having foreseen all difficulties and costs". There is no Engineer, only an Employer's Representative. https://www.instituteccp.com/fidic-red-yellow-and-silver-books-a-brief-overview/
- Under the Red and Yellow Books the Engineer acts as the Employer's representative and also evaluates entitlements neutrally. https://www.acerislaw.com/understanding-risk-allocation-in-fidic-construction-contracts/
- **EPC lump sum compared with EPCM:** under EPC the contractor carries cost and schedule risk. Under EPCM the owner keeps most construction risk, including interface risk between contractors, and signs the trade contracts, while the EPCM firm manages on the owner's behalf. https://www.mastt.com/blogs/epcm-vs-epc ; https://fidic.org/sites/default/files/epcm_loots_2007.pdf
- In KPMG's 2015 owner survey, 32% of respondents favoured EPC, 30% used design-bid-build, and 58% of contracts were lump sum. https://assets.kpmg.com/content/dam/kpmg/pdf/2015/05/construction-survey-201502.pdf

### 1.4 Parties

The main parties are the Owner/Employer, the Engineer (under Red and Yellow Books), the PMC or EPCM firm, the EPC contractor, subcontractors and vendors. Sources as in 1.3. The PMC's role is not defined by FIDIC and varies by contract (**unsourced**). On Pakistan's Tarbela-5 project, the inquiry blamed all three of contractor, consultant (Engineer) and employer (see section 4). That is a live example of this party chain failing. https://www.dawn.com/news/2014942

---

## 2. The tool stack and its documented failure modes

### 2.1 What each tool is for

- **Oracle Primavera P6 EPPM** is Oracle's enterprise project-portfolio management and scheduling product. https://www.oracle.com/construction-engineering/primavera-p6/
- **Oracle Aconex** is a cloud common data environment (CDE) for documents, correspondence and workflows. https://www.oracle.com/construction-engineering/aconex/
- **Oracle Primavera Unifier** handles procurement, contract, scope and cost-control business processes. Its accelerator ships "over 125 preconfigured… business processes". https://www.oracle.com/construction-engineering/primavera-unifier-project-controls-asset-management/
- **SAP Project System (PS)** structures projects as WBS elements and networks and carries cost planning, budgeting and settlement. https://blog.sap-press.com/wbss-and-network-structures-in-saps-project-system ; https://learning.sap.com/courses/discovering-the-basics-of-sap-s-4hana-project-system/planning-costs-for-wbs-elements_d9f22bd8-1e3f-4b71-88e7-b2b52e6bb6c7
- **Procore** manages drawings, RFIs, submittals, budgets, schedules and field collaboration. https://www.procore.com/what-is-procore
- **Autodesk Construction Cloud** was renamed **Autodesk Forma** on 24 March 2026. Site copy should use the current name. https://adsknews.autodesk.com/en/news/autodesk-construction-cloud-is-now-autodesk-forma/
- **InEight** sells integrated cost, schedule, contract, change and risk controls for capital projects. https://ineight.com/products/ineight-project-controls/
- **EcoSys** has been renamed **Octave Sequence Enterprise** after Octave was spun off from Hexagon. Site copy should use the current name. https://www.octave.com/learn/resources/blogs/ecosys-becomes-octave-sequence-enterprise ; https://hexagon.com/company/newsroom/press-releases/2025/octave-unveiledhexagon-reveals-name-for-potential-2026-company-spin-off

### 2.2 CPM scheduling in practice: documented failure modes

**Monthly cadence against daily reality.**
- "Schedule updating is normally done monthly." https://www.long-intl.com/articles/contract-scheduling-provisions/
- The same source says: "too many construction superintendents may only look one or two weeks ahead and rely almost exclusively on a short-interval bar chart to manage the project". The CPM schedule and the site plan are different artefacts. https://www.long-intl.com/articles/contract-scheduling-provisions/
- Glenn Ballard's Last Planner research found that "only about half of the assignments made to construction crews at the beginning of a week were completed when planned". He calls traditional construction schedules "push mechanisms". Lookaheads "typically perform only the function of highlighting what SHOULD be done". https://lean-construction-gcs.storage.googleapis.com/wp-content/uploads/2022/09/08152942/the-last-planner-system-of-production-control-ballard2000-dissertation.pdf
- McKinsey (2016) wrote that project planning "remains uncoordinated between the office and the field and is often done on paper". This is a search excerpt; see Method. https://www.mckinsey.com/capabilities/operations/our-insights/imagining-constructions-digital-future

**Subjective percent complete.**
- A supervisor's percent-complete estimate is "the most prone to overstatement and the hardest to audit". Objective methods measure installed quantities instead. https://www.gatherinsights.com/en/earned-value/definitions/progress-measurement
- Owners standardise "rules of credit" to replace judgement with agreed milestones. https://www.linkedin.com/pulse/earned-value-rules-credit-discussion-daniel-glynn ; https://ineight.com/resources/article/rules-of-credit-drive-reliable-construction-budgeting/
- In a documented case, a contractor "reported activities as 90% complete for several months to avoid the detection of missed starts on other activities." https://ankura.com/insights/construction-schedules-why-owners-should-monitor-and-care
- Planning Planet practitioners advise against using percent complete to derive remaining duration, and warn that in cost-loaded schedules it drives earned value directly. https://planningplanet.com/forums/oracle-primavera-pm6/604599/recommended-way-update-progress-p6

**Schedules kept for contracts and claims, not execution.**
- "Owners frequently treat schedules as administrative deliverables rather than as core project-control and risk-management tools." https://ankura.com/insights/construction-schedules-why-owners-should-monitor-and-care
- Tribunals "give more weight to the schedules in effect during the job than those created for trial". The contemporaneous schedule is primarily legal evidence. https://www.long-intl.com/articles/contract-scheduling-provisions/
- When the owner maintains the schedule, "the contractor may feel that the schedule is no longer 'its schedule' and may lose interest in using the schedule as a management tool." https://www.long-intl.com/articles/contract-scheduling-provisions/

**Float and logic manipulation.**
- "Schedules can be altered in subtle ways that materially affect entitlement" through logic changes that move the critical path without visible date changes. Contractors have "used project float for its own benefit". https://ankura.com/insights/construction-schedules-why-owners-should-monitor-and-care
- AACE 70R-12 says schedule contingency is not "the improper use of preferential logic". https://web.aacei.org/docs/default-source/toc/toc_70r-12.pdf
- The US GAO says date constraints and lags "should be minimized and justified". Best Practice 9 requires updating "using actual progress and logic". https://www.gao.gov/assets/gao-12-120g.pdf
- The DCMA 14-point check fails a schedule if more than 5% of activities have missing logic, lags or hard constraints, or if more than 5% of activities carry over 44 days of total float, which it reads as broken logic. The check exists because these defects are common. https://www.deltek.com/resources/articles/dcma-14-point-assessment/ ; https://www.proove.eu/knowledge/the-14-point-dcma-schedule-assessment

### 2.3 Data silos, integration, coding and reporting

- **Siloed apps.** In JBKnowledge's 2020 ConTech report, 27% of respondents had no apps that integrate data, and only 5% said all their apps integrated. Data between non-integrated apps moves "Manually: 49%", by "Spreadsheets: 44%" and by "CSV files: 37%". https://www.constructiondive.com/news/construction-app-usage-increases-despite-continued-lack-of-integration/592922/
- **PMIS gaps.** KPMG (2015) found that 50% of owners used a PMIS. Of those, about a third had not integrated it with accounting and procurement software, rising to 47% at bigger organisations. KPMG blamed "disparate systems" that "may not be fully integrated". https://assets.kpmg.com/content/dam/kpmg/pdf/2015/05/construction-survey-201502.pdf
- **Interoperability cost.** NIST (2004) estimated $15.8 billion a year lost to inadequate interoperability in US capital facilities. Owners and operators bore $10.6 billion of it. https://www.nist.gov/publications/inadequate-interoperability-closer-look-costs
- **Inconsistent coding.** "A WBS is mainly a scope structure. A cost code or budget code is mainly a financial classification." "Confusion starts when one system is forced to perform the role of all the others." https://quollnet.com/article/work-breakdown-structure-explained
- A common split keeps the WBS and schedule in P6 and the costs in SAP, which forces a mapping between different data models. https://community.sap.com/t5/enterprise-resource-planning-q-a/sap-ps-and-primavera-integration/qaq-p/14298251
- I found no source on mapping document numbers and BIM element IDs to WBS and cost codes (**unsourced**). ISO 19650 exists to impose a single information-management discipline across a project. https://en.wikipedia.org/wiki/ISO_19650
- **EVM lag.** Weekly cost reports compiled from Friday timesheets are "already five to seven days behind site reality". By the time an overrun shows up, its causes "have often been in place for two or three weeks". https://trianglepmo.org/blog/earned-value-management-in-construction
- EVM guidance also warns of "booking lag" between work performed and costs recorded. https://www.pmi.org/learning/library/differences-earned-value-management-practices-construction-5790
- **Reporting burden.** No hard figure specific to project controls was found (**unsourced**). The closest data is FMI/PlanGrid's 5.5 hours a week hunting for project data (section 3).
- **Report confidence.** In KPMG 2015, 73% of owners said they were comfortable with report accuracy and timeliness, but a third at bigger organisations were "not convinced of the quality of reports". https://assets.kpmg.com/content/dam/kpmg/pdf/2015/05/construction-survey-201502.pdf

---

## 3. Quantitative evidence (sourced only)

### 3.1 Productivity

- McKinsey Global Institute (2017): global construction labour productivity grew about 1% a year over two decades. The whole economy grew 2.8% and manufacturing 3.6%. Catching up with the economy would be worth about $1.6 trillion a year. This is a search excerpt; see Method. https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution

### 3.2 Megaproject overruns

- Flyvbjerg: "Nine out of ten" megaprojects have cost overruns. The "iron law" is "Over budget, over time, over and over again". Megaprojects are worth USD 6–9 trillion a year, about 8% of global GDP. https://arxiv.org/abs/1409.0003 ; https://www.pmi.org/-/media/pmi/documents/public/pdf/research/research-summaries/flyvbjerg_megaprojects.pdf
- Flyvbjerg and Gardner's database of more than 16,000 projects shows 8.5% on budget and on time, and 0.5% on budget, on time and delivering the promised benefits. This comes from secondary summaries of *How Big Things Get Done*; confirm against the book before publishing. https://www.independent.org/tir/2023-fall/how-big-things-get-done/
- McKinsey (2015): "98 percent of megaprojects suffer cost overruns of more than 30 percent; 77 percent are at least 40 percent late." This is a search excerpt. https://www.mckinsey.com/capabilities/operations/our-insights/the-construction-productivity-imperative
- McKinsey (2016): large projects "typically take 20 percent longer to finish than scheduled and are up to 80 percent over budget." This is a search excerpt. https://www.mckinsey.com/capabilities/operations/our-insights/imagining-constructions-digital-future
- KPMG Global Construction Survey 2015: only 31% of owners' projects came within 10% of budget, and 25% within 10% of the original deadline, over the previous three years. 53% had at least one underperforming project in the previous year, rising to 90% for public-sector respondents. https://assets.kpmg.com/content/dam/kpmg/pdf/2015/05/construction-survey-201502.pdf
- EY (2014), covering 365 oil and gas megaprojects: 64% over budget and 73% behind schedule. Estimated completion costs were on average 59% above the initial estimate, a total of about US$1.7 trillion against US$1.2 trillion. https://www.prnewswire.com/news-releases/oil-and-gas-megaproject-overruns-to-cost-industry-more-than-us500b-271227501.html ; https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf
- Sovacool et al. (2014) studied 401 electricity projects in 57 countries built from 1936 to 2014. The mean cost overrun was 66.3%, and three in four projects ran over. https://www.sciencedirect.com/science/article/abs/pii/S2214629614000942

### 3.3 Data: unused, bad, and time spent searching

- FMI/Autodesk, *Harnessing the Data Advantage in Construction* (2021), surveyed 3,900 professionals. It found 95.5% of E&C data goes unused. https://fmicorp.com/insights/quick-reads/harnessing-the-data-advantage-in-engineering-and-construction
- The same study estimated that bad data cost the global industry $1.85 trillion in 2020, including $88.69 billion of rework (14% of all rework). 30% of respondents said more than half their project data is "bad". https://www.prnewswire.com/news-releases/study-from-autodesk-and-fmi-finds-better-data-strategies-could-save-the-global-construction-industry-1-85-trillion-301376278.html
- FMI/PlanGrid, *Construction Disconnected* (2018), surveyed 599 leaders, 500 of them in the US. It found about 14 hours a week lost to non-optimal activities, including "5.5 hours hunting down project data". That cost $177.5 billion a year in US labour. 48% of rework ($31.3 billion) came from miscommunication and poor project data. https://www.prnewswire.com/news-releases/new-research-from-plangrid-and-fmi-identifies-factors-costing-the-construction-industry-more-than-177-billion-annually-300689826.html

### 3.4 Hydropower and dams

- Ansar, Flyvbjerg, Budzier and Lunn (Energy Policy, 2014) studied 245 large dams in 65 countries, built 1934–2007. Three in four ran over cost. Actual costs averaged 96% above estimate (median 27%). Eight in ten ran late, by an average of 44% or 2.3 years (median 27%). A large dam took 8.6 years on average. The de-biasing uplift is +99%. https://arxiv.org/pdf/1409.0002
- Plummer Braeckman, Disselhoff and Kirchherr (2020) built a meta-dataset of 184 cost and 191 time observations. Post-2000 dams averaged a 33% cost overrun and an 18% schedule overrun, against 46% and 37% before 2000. The schedule improvement is statistically significant; the cost improvement is not. This is the counterweight to use if a critic calls the Oxford figures dated. https://ideas.repec.org/a/taf/cijwxx/v36y2020i5p839-854.html
- The World Commission on Dams (2000) reported a 56% average cost overrun across 81 large dams. This comes from a search excerpt; check the report itself. https://www.internationalrivers.org/wp-content/uploads/sites/86/2022/06/world_commission_on_dams_final_report.pdf

---

## 4. Pakistan and South Asia

### 4.1 WAPDA hydropower

- **Tarbela (historic).** The 1968 appraisal allowed a 7.5% contingency. Opening slipped from 1976 to 1984, and nominal cost reached nearly four times the initial budget. The dam accounted for 23% of the rise in Pakistan's external public debt between 1968 and 1984. https://arxiv.org/pdf/1409.0002
- **Diamer-Bhasha forecast (2014).** Ansar et al. forecast a 44% expected cost overrun for a Pakistani large dam. They predicted a 2027 opening against a planned 2021, with about 17 years needed for 80% schedule certainty. https://arxiv.org/pdf/1409.0002
- **Neelum-Jhelum (969 MW).** The plan was 8 years and Rs 84.5 billion. The project took 16 years and cost Rs 423.4 billion as of June 2023, an overrun of Rs 338.9 billion. The Auditor-General declared it a failure. The tail-race tunnel collapsed on 6 July 2022, halting the plant. https://www.waterpowermagazine.com/news/audit-declares-neelum-jhelum-hydropower-project-a-failure/ ; https://www.dawn.com/news/1939326
- **Dasu Stage-I.** The cost rose from Rs 479 billion (2014, with December 2019 completion) to Rs 1.738 trillion, with completion now November 2028. The planning minister cited "mismanagement and inordinate delays". Dawn reported that Dasu had no full-time project director or professional CFO. https://www.dawn.com/news/amp/1903704
- For Dasu, reported cost drivers were foreign exchange (45%), price escalation from the prolonged timeline (40.3%) and variation orders (14.7%). https://profit.pakistantoday.com.pk/2025/04/11/govt-approves-revised-dasu-hydropower-project-worth-rs-1-74-trillion/
- **Tarbela 5th Extension (1,530 MW).** The cost rose from Rs 82 billion to about Rs 316–317 billion, with completion moved from 2026 to June 2028. The inquiry found that "the contractor submitted a proposal to change the design of the cofferdam, which was contractually not allowed; the engineer accepted the design deficiency conditionally…; and the employer approved it". All three were held responsible. https://www.dawn.com/news/2014942 ; https://www.dawn.com/news/2002149/central-development-working-party-lashes-out-at-wapda-over-delay-in-dam-projects
- **Diamer-Bhasha (current).** The planning minister said its revised PC-I "had not been submitted for the last six years", reflecting "poor project management capacity". https://www.dawn.com/news/2002149/central-development-working-party-lashes-out-at-wapda-over-delay-in-dam-projects ; https://www.nation.com.pk/22-May-2026/planning-minister-concerned-cost-escalation-weak-management-lack-transparency
- **Senate scrutiny (July 2026).** A Senate sub-committee questioned WAPDA over delays on Dasu (reported 31% physical progress), Mohmand, T5HP, Harpo, Mangla refurbishment, Warsak and others. Reasons cited included land acquisition, floods, security and repeated design changes. https://www.brecorder.com/news/40430979/wapda-grilled-over-failure-to-complete-major-hydel-projects
- **Mohmand.** Generation is now targeted for 2027. The minister cited floods among the reasons for delay. https://www.waterpowermagazine.com/news/mohmand-dam-construction-advances-on-multiple-fronts-power-generation-targeted-for-2027/ ; https://profit.pakistantoday.com.pk/2025/01/06/mohmand-dam-on-track-to-be-completed-by-2026-27

### 4.2 The PSDP portfolio and CPEC

- A PIDE working paper (2023:10) reported that of 931 ongoing federal PSDP projects, 16% (148) had cost overruns and 59% (551) had time overruns. The throw-forward was about Rs 6.54 trillion (FY2022). The paper recommends an all-Pakistan "development dashboard" showing "slow moving projects". https://file.pide.org.pk/pdfpideresearch/wp-23-10-reforming-the-federal-public-sector-development-programme.pdf
- The planning minister later flagged a throw-forward above Rs 10 trillion. https://profit.pakistantoday.com.pk/2025/12/30/planning-minister-flags-rs1tr-throw-forward-low-utilisation-in-power-water-psdp-projects/
- **ML-1 railway**, originally a $7.7 billion CPEC flagship, "faced repeated delays over financing and cost negotiations". It was removed from CPEC in 2026 and is now pursuing ADB financing. https://propakistani.pk/2026/07/03/govt-drops-ml-1-railway-project-from-cpec/ ; https://www.arabnews.com/node/2654797/amp
- **CPEC energy.** The CPEC Secretariat reports 13 power projects (8,020 MW) and one HVDC line in commercial operation. The 884 MW Suki Kinari project was "expected" in July 2024. The Ministry of Planning has publicly denied that CPEC projects are delayed, so treat "CPEC delay" claims as contested. https://cpec.gov.pk/energy ; https://www.thenews.com.pk/latest/429883-ministry-of-planning-clarifies-news-regarding-delays-in-cpec-projects

### 4.3 India

- India's MoSPI monitors central-sector projects of Rs 150 crore and above. Reporting in March 2024 put 779 of 1,873 projects as delayed. These figures come from a secondary summary; verify against the MoSPI flash report. https://ipm.mospi.gov.in/Content/ArchiveReport/flash/2023-24/FR_dec_2023.pdf ; https://www.ijcrt.org/papers/IJCRT2508391.pdf
- Ansar et al. found "systematically higher schedule overruns in India and Pakistan". https://arxiv.org/pdf/1409.0002

---

## 5. Implications for the DiPGOS story

These are my inferences from the evidence above, not new claims.

1. **"Nobody has one live picture" is documented.** Apps don't integrate (JBKnowledge), PMIS isn't connected to accounting (KPMG), coding structures collide (Quollnet, SAP/P6), and data sits unused (FMI 95.5%).
2. **"Monthly schedule, daily site" is documented too.** Updates are monthly (Long), superintendents run 1–2-week bar charts (Long), about half of weekly crew assignments slip (Ballard), and percent complete gets gamed (Ankura).
3. **The approval-chain angle is strong in Pakistan specifically.** At Tarbela-5, a contractor proposal, a conditional Engineer acceptance and a late employer approval together produced a 285% escalation (Dawn). Human approval with a traceable record answers that failure directly.
4. **Avoid overclaiming.** Post-2000 dam overruns are smaller (Plummer Braeckman et al.), and CPEC delays are officially disputed.

---

## Sources

- IPA, What is FEL: https://www.ipaglobal.com/news/article/what-is-front-end-loading-fel-in-project-management/
- AACE 18R-97: https://web.aacei.org/docs/default-source/toc/toc_18r-97.pdf ; https://epcland.com/cost-estimate-classification-system-for-process-industries/
- AACE 70R-12: https://web.aacei.org/docs/default-source/toc/toc_70r-12.pdf
- ICCP, FIDIC books: https://www.instituteccp.com/fidic-red-yellow-and-silver-books-a-brief-overview/
- Aceris Law, FIDIC risk: https://www.acerislaw.com/understanding-risk-allocation-in-fidic-construction-contracts/
- Mastt, EPC vs EPCM: https://www.mastt.com/blogs/epcm-vs-epc
- Loots, EPC/EPCM (FIDIC): https://fidic.org/sites/default/files/epcm_loots_2007.pdf
- KPMG Global Construction Survey 2015: https://assets.kpmg.com/content/dam/kpmg/pdf/2015/05/construction-survey-201502.pdf
- KPMG Global Construction Survey 2025/26: https://kpmg.com/xx/en/our-insights/operations/global-construction-survey.html
- Oracle P6 / Aconex / Unifier: https://www.oracle.com/construction-engineering/primavera-p6/ ; https://www.oracle.com/construction-engineering/aconex/ ; https://www.oracle.com/construction-engineering/primavera-unifier-project-controls-asset-management/
- SAP PS: https://blog.sap-press.com/wbss-and-network-structures-in-saps-project-system ; https://community.sap.com/t5/enterprise-resource-planning-q-a/sap-ps-and-primavera-integration/qaq-p/14298251
- Procore: https://www.procore.com/what-is-procore
- Autodesk Forma rename: https://adsknews.autodesk.com/en/news/autodesk-construction-cloud-is-now-autodesk-forma/
- InEight: https://ineight.com/products/ineight-project-controls/ ; https://ineight.com/resources/article/rules-of-credit-drive-reliable-construction-budgeting/
- Octave Sequence Enterprise (EcoSys): https://www.octave.com/learn/resources/blogs/ecosys-becomes-octave-sequence-enterprise ; https://hexagon.com/company/newsroom/press-releases/2025/octave-unveiledhexagon-reveals-name-for-potential-2026-company-spin-off
- ISO 19650: https://en.wikipedia.org/wiki/ISO_19650
- Long International, scheduling provisions: https://www.long-intl.com/articles/contract-scheduling-provisions/
- Ankura, owners and schedules: https://ankura.com/insights/construction-schedules-why-owners-should-monitor-and-care
- Ballard (2000), Last Planner dissertation: https://lean-construction-gcs.storage.googleapis.com/wp-content/uploads/2022/09/08152942/the-last-planner-system-of-production-control-ballard2000-dissertation.pdf
- GAO Schedule Assessment Guide: https://www.gao.gov/assets/gao-12-120g.pdf
- DCMA 14-point: https://www.deltek.com/resources/articles/dcma-14-point-assessment/ ; https://www.proove.eu/knowledge/the-14-point-dcma-schedule-assessment
- Planning Planet, P6 progress: https://planningplanet.com/forums/oracle-primavera-pm6/604599/recommended-way-update-progress-p6
- Progress measurement: https://www.gatherinsights.com/en/earned-value/definitions/progress-measurement ; https://www.linkedin.com/pulse/earned-value-rules-credit-discussion-daniel-glynn
- EVM lag: https://trianglepmo.org/blog/earned-value-management-in-construction ; https://www.pmi.org/learning/library/differences-earned-value-management-practices-construction-5790
- JBKnowledge 2020 via Construction Dive: https://www.constructiondive.com/news/construction-app-usage-increases-despite-continued-lack-of-integration/592922/
- Quollnet, WBS: https://quollnet.com/article/work-breakdown-structure-explained
- NIST interoperability: https://www.nist.gov/publications/inadequate-interoperability-closer-look-costs
- McKinsey MGI 2017: https://www.mckinsey.com/capabilities/operations/our-insights/reinventing-construction-through-a-productivity-revolution
- McKinsey 2015: https://www.mckinsey.com/capabilities/operations/our-insights/the-construction-productivity-imperative
- McKinsey 2016: https://www.mckinsey.com/capabilities/operations/our-insights/imagining-constructions-digital-future
- Flyvbjerg 2014: https://arxiv.org/abs/1409.0003 ; https://www.pmi.org/-/media/pmi/documents/public/pdf/research/research-summaries/flyvbjerg_megaprojects.pdf
- How Big Things Get Done review: https://www.independent.org/tir/2023-fall/how-big-things-get-done/
- EY 2014: https://www.prnewswire.com/news-releases/oil-and-gas-megaproject-overruns-to-cost-industry-more-than-us500b-271227501.html ; https://aegex.com/images/uploads/white_papers/EY-spotlight-on-oil-and-gas-megaprojects.pdf
- Sovacool et al. 2014: https://www.sciencedirect.com/science/article/abs/pii/S2214629614000942
- FMI/Autodesk 2021: https://fmicorp.com/insights/quick-reads/harnessing-the-data-advantage-in-engineering-and-construction ; https://www.prnewswire.com/news-releases/study-from-autodesk-and-fmi-finds-better-data-strategies-could-save-the-global-construction-industry-1-85-trillion-301376278.html
- FMI/PlanGrid 2018: https://www.prnewswire.com/news-releases/new-research-from-plangrid-and-fmi-identifies-factors-costing-the-construction-industry-more-than-177-billion-annually-300689826.html
- Ansar et al. 2014: https://arxiv.org/pdf/1409.0002
- Plummer Braeckman et al. 2020: https://ideas.repec.org/a/taf/cijwxx/v36y2020i5p839-854.html
- World Commission on Dams 2000: https://www.internationalrivers.org/wp-content/uploads/sites/86/2022/06/world_commission_on_dams_final_report.pdf
- Neelum-Jhelum audit: https://www.waterpowermagazine.com/news/audit-declares-neelum-jhelum-hydropower-project-a-failure/ ; https://www.dawn.com/news/1939326
- Dasu: https://www.dawn.com/news/amp/1903704 ; https://profit.pakistantoday.com.pk/2025/04/11/govt-approves-revised-dasu-hydropower-project-worth-rs-1-74-trillion/
- Tarbela-5: https://www.dawn.com/news/2014942 ; https://www.dawn.com/news/2002149/central-development-working-party-lashes-out-at-wapda-over-delay-in-dam-projects ; https://www.nation.com.pk/22-May-2026/planning-minister-concerned-cost-escalation-weak-management-lack-transparency
- Senate sub-committee on WAPDA: https://www.brecorder.com/news/40430979/wapda-grilled-over-failure-to-complete-major-hydel-projects
- Mohmand: https://www.waterpowermagazine.com/news/mohmand-dam-construction-advances-on-multiple-fronts-power-generation-targeted-for-2027/ ; https://profit.pakistantoday.com.pk/2025/01/06/mohmand-dam-on-track-to-be-completed-by-2026-27
- PIDE WP 2023:10: https://file.pide.org.pk/pdfpideresearch/wp-23-10-reforming-the-federal-public-sector-development-programme.pdf
- PSDP throw-forward: https://profit.pakistantoday.com.pk/2025/12/30/planning-minister-flags-rs1tr-throw-forward-low-utilisation-in-power-water-psdp-projects/
- ML-1: https://propakistani.pk/2026/07/03/govt-drops-ml-1-railway-project-from-cpec/ ; https://www.arabnews.com/node/2654797/amp
- CPEC energy: https://cpec.gov.pk/energy ; https://www.thenews.com.pk/latest/429883-ministry-of-planning-clarifies-news-regarding-delays-in-cpec-projects
- MoSPI: https://ipm.mospi.gov.in/Content/ArchiveReport/flash/2023-24/FR_dec_2023.pdf ; https://www.ijcrt.org/papers/IJCRT2508391.pdf
