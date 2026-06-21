/**
 * ECONOMIC_FLAGS — economic flags for the natalis flag system.
 * Auto-split from src/data/flags.js by scripts/split_flags.py
 */
export const ECONOMIC_FLAGS = {

  cotton_childhood: {
    weight: 'moderate',
    category: 'labor',
    description: 'Grew up with school closing for cotton harvests — childhood education subordinated to state agricultural quotas.',
    intent: 'year_texture',
    notes: 'Set by events_central_asia.js (ca_uzb_cotton_harvest). Uzbekistan 1950–2015. Reflects Soviet and post-Soviet forced child labour in cotton.',
  },

  oil_economy_participant: {
    weight: 'moderate',
    category: 'economic',
    description: 'Participated in the oil-extraction economy — the salary, the towers, the work that does not ask difficult questions.',
    intent: 'year_texture',
    notes: 'Set by events_central_asia.js (ca_kaz_oil_boom) take-the-position branch. Kazakhstan 1995–2010.',
  },

  ofw_broker_debt: {
    weight: 'moderate',
    category: 'economic',
    description: 'Character took out a loan to pay the agency/broker fee before departing as OFW.',
    intent: 'event',
    notes: 'Set by ofw_broker_fee loan choice. Represents the structural trap: in debt before earning anything. Follow-through via ofw_cost_accounting.',
  },

  kafala_documented: {
    weight: 'moderate',
    category: 'labor',
    description: 'OFW character in a Gulf country has had their passport held by an employer under the kafala sponsorship system.',
    intent: 'event',
    notes: 'Set by ft10_ofw_gulf_passport. Represents the specific power asymmetry of kafala — not criminally distinct but felt as captivity.',
  },

  ofw_broker_paid: {
    weight: 'minor',
    category: 'economic',
    description: 'OFW character has paid off their broker/agency fee loan in full.',
    intent: 'event',
    notes: 'Set by ft10_ofw_broker_paid_off. Resolution of ofw_broker_debt arc.',
  },

  ofw_new_placement: {
    weight: 'minor',
    category: 'labor',
    description: 'OFW runaway successfully secured a new legitimate employer placement.',
    intent: 'event',
    notes: 'Set by ft10_ofw_runaway_shelter (find new placement branch).',
  },

  informal_abroad: {
    weight: 'minor',
    category: 'labor',
    description: 'OFW character is working informally in a foreign country after fleeing their employer.',
    intent: 'event',
    notes: 'Set by ft10_ofw_runaway_shelter (work informally branch). Distinct from workStatus=informal — this is specifically abroad and specifically precarious.',
  },

  care_work_done: {
    weight: 'minor',
    category: 'labor',
    description: 'Character has spent significant time doing care work — tending to an elderly or dependent person professionally.',
    intent: 'event',
    notes: 'Set by ft10_ofw_italy_badante and potentially other care-work events. Quiet flag for ribbon eligibility.',
  },

  asian_crisis_personal: {
    weight: 'moderate',
    category: 'economic',
    description: 'Character lived through the 1997–98 Asian financial crisis as a personal economic rupture — rupiah collapse, supply shortages.',
    intent: 'event',
    notes: 'Set by id98_crisis_texture (Indonesia, 1997–98).',
  },

  debt_spiral: {
    weight: 'major',
    category: 'economic',
    description: 'Character is in an active debt spiral — carrying compounding interest, minimum payments that extend rather than reduce the principal.',
    intent: 'event',
    notes: 'Set by debt_first_card (carries_balance) and debt_microfinance_spiral. Clears on bankruptcy or recovery. Gates debt_collector_call.',
  },

  debt_spiral_experienced: {
    weight: 'major',
    category: 'economic',
    description: 'Character has experienced a debt spiral — the specific knowledge of what it means to owe money that grows while you pay it.',
    intent: 'both',
    notes: 'Set alongside debt_spiral and persists after recovery. Follow-throughs: debt_decade_clean, debt_teaching_children, debt_student_loan_decade, debt_late_life_free.',
  },

  debt_bankrupt: {
    weight: 'major',
    category: 'economic',
    description: 'Character filed for bankruptcy — either Chapter 7 (discharged, seven-year credit damage) or Chapter 13 (restructured payments).',
    intent: 'both',
    notes: 'Set by debt_bankruptcy. Year-textured for seven years post-filing.',
  },

  debt_restructured: {
    weight: 'moderate',
    category: 'economic',
    description: 'Character negotiated or was placed in a formal debt restructuring — bank hardship plan, Chapter 13, or similar.',
    intent: 'event',
    notes: 'Set by debt_spiral_deepens (called_bank) and debt_bankruptcy (chapter13).',
  },

  microfinance_borrower: {
    weight: 'moderate',
    category: 'economic',
    description: 'Character participates in a microfinance group-lending circle — jointly liable, weekly meetings, social collateral.',
    intent: 'event',
    notes: 'Set by debt_microfinance_entry (joined). Gates debt_microfinance_pressure and debt_microfinance_spiral.',
  },

  microfinance_declined: {
    weight: 'minor',
    category: 'economic',
    description: 'Character declined to join a microfinance lending circle, having seen group liability go wrong.',
    intent: 'none',
    notes: 'Set by debt_microfinance_entry (declined). Prevents future microfinance events.',
  },

  structural_adjustment_era: {
    weight: 'major',
    category: 'economic',
    description: 'Character lived through an IMF Structural Adjustment Programme — public sector hiring freezes, food subsidy removal, clinic closures experienced personally.',
    intent: 'both',
    notes: 'Set by debt_imf_arrives. Follow-through: debt_sap_clinic_closed. Ribbon: the_structural_adjustment.',
  },

  medical_debt: {
    weight: 'moderate',
    category: 'economic',
    description: 'Character carries or carried medical debt from a US hospital bill — the specific American experience of healthcare as financial risk.',
    intent: 'event',
    notes: 'Set by debt_medical_bill (all three paths). The negotiation path is an educational payload.',
  },

  irn_sanctions_generation: {
    weight: 'major',
    category: 'economic',
    description: 'Lived inside the sanctions economy — the rial\'s 95% value loss since 1979, the gap between official and street dollar rates, the JCPOA collapse in 2018 and 60% rial crash in three months.',
    intent: 'year_texture',
    notes: 'Set by irn_sanctions_economy.',
  },

  lost_decade_generation: {
    weight: 'major',
    category: 'economic',
    description: 'Young adult during Japan\'s Lost Decade (1991–2000) — the Nikkei down 60%, land values halved while loans remained full, the deflation, the restaurants gone, the promotions suspended.',
    intent: 'year_texture',
    notes: 'Set by jpn_bubble_collapse (both choices). Gated on bubble_generation.',
  },

  cuba_balsero: {
    weight: 'major',
    category: 'arc',
    description: 'Crossed the Florida Strait on a raft or inner tube during the 1994 balsero crisis — 35,000 Cubans in three months.',
    intent: 'year_texture',
    notes: 'Set by la_cub_balsero. Year texture (the crossing as permanent reference point). Ribbon gated on this flag.',
  },

  cuba_double_economy: {
    weight: 'minor',
    category: 'economic',
    description: 'Navigated Cuba\'s dual peso/dollar economy — taxi driver earning in a week what a doctor earns in a month.',
    intent: 'year_texture',
    notes: 'Set by la_cub_double_economy. Year texture (inequity as infrastructure).',
  },

  cub_mariel_gone: {
    weight: 'major',
    category: 'arc',
    description: 'Left Cuba during the 1980 Mariel boatlift — one of the 125,000 who crossed when Castro opened the port.',
    intent: 'year_texture',
    notes: 'Set by cub_mariel_1980. Year texture (being "Marielito" before anything else; the Cuba held in memory).',
  },

  cub_libreta_generation: {
    weight: 'minor',
    category: 'economic',
    description: 'Grew up managing life through the libreta ration book — the bodega arithmetic, the black market supplement, the network of cousins.',
    intent: 'year_texture',
    notes: 'Set by cub_libreta_texture. Year texture (shortage as financial education).',
  },

  cub_raul_opener: {
    weight: 'minor',
    category: 'economic',
    description: 'Cautiously moved to take advantage of Raúl Castro\'s small private-sector reforms — the paladare license, the legal phone, the house sale.',
    intent: 'year_texture',
    notes: 'Set by cub_raul_opening. Year texture (navigating the gap between the permitted and the still-forbidden).',
  },

  laos_china_era: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived the Chinese investment wave — rail line, SEZs, debt concessions, signs in Chinese, the ratio of benefit to obligation that nobody shares.',
    intent: 'year_texture',
    notes: 'Set by laos_china_investment. Year texture (Battery of Southeast Asia / what the battery costs).',
  },

  nam_communal_land_lived: {
    weight: 'moderate',
    category: 'economic',
    description: 'Grew up with the communal vs. commercial farm divide in post-independence Namibia — the fence between ancestral land and white-owned title.',
    intent: 'year_texture',
    notes: 'Set by nam_communal_land_divide. Year texture (the fence still there after independence).',
  },

  nam_diamond_country: {
    weight: 'minor',
    category: 'economic',
    description: 'Aware of the Sperrgebiet diamond contradiction — top-value diamond producer, understaffed hospitals; the resource curse as personal geography.',
    intent: 'year_texture',
    notes: 'Set by nam_diamond_wealth. Year texture (two facts in the same country).',
  },

  swahili_educated: {
    weight: 'moderate',
    category: 'education',
    description: 'Tanzanian character educated in Swahili — giving national cohesion and a ceiling against international opportunity simultaneously.',
    intent: 'event',
    notes: 'Set by tan_swahili_education. A specific trade-off that distinguishes Tanzania from all other African education systems.',
  },

  forced_harvest: {
    weight: 'moderate',
    category: 'labor',
    description: 'Character was mobilised for state agricultural harvest as a child or student — Uzbek cotton quota, school closed September-November.',
    intent: 'both',
    notes: 'Set by cas_uzbek_cotton and cas_uzbek_harvest_adult.',
  },

  tajik_remittance_dependent: {
    weight: 'moderate',
    category: 'economics',
    description: 'Character\'s household depends directly on remittances from a family member working abroad — the arithmetic of absence.',
    intent: 'year_texture',
    notes: 'Set by taj_remittance_economy (dependent branch). Tajikistan has highest remittance-to-GDP ratio in the world.',
  },

  turkmenistan_gas_generation: {
    weight: 'moderate',
    category: 'economics',
    description: 'Character understands the gap between Turkmenistan\'s fourth-largest gas reserves and the state of its hospitals and institutions.',
    intent: 'year_texture',
    notes: 'Set by tkm_gas_wealth_invisible. Resource wealth as a fact about someone else\'s palace.',
  },

  clergy_ordained: {
    weight: 'major',
    category: 'career',
    description: 'Character was ordained into a religious institution — holding genuine authority over people\'s lives, the weight of which is assumed rather than stated.',
    intent: 'both',
    notes: 'Set by cle_ireland_ordination, cle_cambodia_monk. Gates all downstream clergy arc events.',
  },

  institutional_power: {
    weight: 'moderate',
    category: 'career',
    description: 'Character held power through an institution — the school, the hospital, the moral economy of the parish. Power exercised through structure rather than force.',
    intent: 'both',
    notes: 'Set by cle_ireland_ordination. Relates to institutional_complicity and institutional_doubt follow-throughs.',
  },

  clergy_adapted: {
    weight: 'moderate',
    category: 'career',
    description: 'Character adapted their religious practice to an authoritarian context — preaching within a permitted frame, encoding what could not be said directly.',
    intent: 'both',
    notes: 'Set by cle_indonesia_imam_suharto. Cross-references resistance_through_art for encoded-speech path.',
  },

  yeshiva_trained: {
    weight: 'moderate',
    category: 'education',
    description: 'Character completed deep Torah study in a yeshiva — the world of the beit midrash, the compact with the state, the asymmetry it creates.',
    intent: 'both',
    notes: 'Set by cle_yeshiva_compact. Follow-through: cle_yeshiva_1967.',
  },

  francophone_educated: {
    weight: 'moderate',
    category: 'education',
    description: 'Character educated in the French colonial tradition — carrying tools that open doors in Paris and Dakar, with specific ambivalence about who those tools were made for.',
    intent: 'both',
    notes: 'Set by sen_gorée_school. Specific to Francophone Africa; relates to Négritude and the colonial education project.',
  },

  interrupted_career: {
    weight: 'moderate',
    category: 'career',
    description: 'Career interrupted by mandatory military service — the years of civilian professional life lost, the difficulty of re-entering where others had not stopped.',
    intent: 'both',
    notes: 'Set by events_culture.js mandatory service event (serve branch). Follow-through: career resentment, difficulty re-entering civilian work.',
  },

  zim_hyperinflation_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived through Zimbabwe\'s hyperinflation 2007–09 — hundred-trillion-dollar notes, morning shopping before prices changed, the abstract collapse of numerical meaning.',
    intent: 'event',
    notes: 'Set by zim_hyperinflation in events_zimbabwe.js. Follow-through: zim_hyperinflation_late (late_life, when asked to explain it).',
  },

  zim_land_reform_witness: {
    weight: 'moderate',
    category: 'economic',
    description: 'Witnessed the Fast Track Land Reform — commercial farms going to party officials, food supply collapsing, the gap between the stated and actual purpose of the programme.',
    intent: 'none',
    notes: 'Set by zim_land_reform_black in events_zimbabwe.js.',
  },

  dprk_jangmadang_trader: {
    weight: 'moderate',
    category: 'economic',
    description: 'Became a jangmadang market trader after the PDS collapse — technically illegal, practically necessary, women\'s economic space',
    intent: 'year_texture',
    notes: 'Set by dprk_arduous_march choice traded.',
  },

  dprk_jangmadang: {
    weight: 'moderate',
    category: 'economic',
    description: 'Participated in the jangmadang informal market — Chinese goods, information, the market that is both illegal and the only working economy',
    intent: 'year_texture',
    notes: 'Set by dprk_jangmadang.',
  },

  sg_exam_success: {
    weight: 'minor',
    category: 'education',
    description: 'Performed well in the PSLE — tracked into an elite secondary school stream',
    intent: 'event',
    notes: 'Set by sg_psle_exam (choice 1).',
  },

  sg_exam_failure: {
    weight: 'moderate',
    category: 'education',
    description: 'Underperformed in the PSLE — tracked into a lower stream, which shaped subsequent opportunities',
    intent: 'year_texture',
    notes: 'Set by sg_psle_exam (choice 2). The Singapore tracking system makes PSLE results deterministic.',
  },

  lost_generation_japan: {
    weight: 'major',
    category: 'economic',
    description: 'Part of Japan\'s employment ice age generation — graduated into a hiring freeze, stuck in irregular freeter work when permanent employment was the social contract.',
    intent: 'year_texture',
    notes: 'Set by ca2_japan_lost_generation. The "ushinawareta sedai" — the generation that fell through the floor of the postwar promise.',
  },

  freeter_track: {
    weight: 'moderate',
    category: 'economic',
    description: 'Settled into the freeter track — irregular, part-time, dispatch work — as the default rather than a stepping-stone, due to Japan\'s employment ice age.',
    intent: 'year_texture',
    notes: 'Set by ca2_japan_lost_generation (irregular work choice).',
  },

  canadian_housing_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Came of age in the Canadian housing crisis — million-dollar averages in Toronto, twelve-year social housing waitlists, the gap between parents\' $180K and today\'s $1.3M.',
    intent: 'year_texture',
    notes: 'Set by can_housing_affordability.',
  },

  mining_boom_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived through the Australian mining boom 2005–2015 — the lucky country working again, FIFO rosters, the commodity prices that didn\'t last.',
    intent: 'year_texture',
    notes: 'Set by aus_mining_boom.',
  },

  aus_housing_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Came of age in Australian housing crisis — median price twelve times income, eighty applicants for every rental, the gap between parental advice and arithmetic.',
    intent: 'year_texture',
    notes: 'Set by aus_housing_crisis.',
  },

  permanent_renter: {
    weight: 'moderate',
    category: 'economic',
    description: 'The permanent renter — renting is not the temporary condition before ownership but the condition itself.',
    intent: 'year_texture',
    notes: 'Set by aus_housing_crisis (renting choice) and similar.',
  },

  deindustrialisation_hit: {
    weight: 'moderate',
    category: 'economic',
    description: 'Directly hit by deindustrialisation — the retraining programs, the jobs that paid half of what the plant paid, the decade-long accounting.',
    intent: 'year_texture',
    notes: 'Set by usa_rustbelt_factory (retrained choice).',
  },

  foreclosure_generation: {
    weight: 'major',
    category: 'economic',
    description: 'Received the foreclosure notice — the adjustable rate that adjusted, the house sold from underneath, the credit score that takes seven years to recover.',
    intent: 'both',
    notes: 'Set by usa_foreclosure_2008.',
  },

  austerity_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'UK character who experienced the 2010s austerity programme — food banks, NHS waiting lists, bedroom tax, Universal Credit, the cuts to public services.',
    intent: 'year_texture',
    notes: 'Set by uk_austerity_2010s.',
  },

  shock_therapy_generation: {
    weight: 'major',
    category: 'economic',
    description: 'Lived through the Balcerowicz Plan — prices up 250%, state enterprises shut, unemployment at 16% by 1994, the bazaar economy that carried people through.',
    intent: 'both',
    notes: 'Set by pol_shock_therapy.',
  },

  transition_economy_cost: {
    weight: 'moderate',
    category: 'economic',
    description: 'Directly lost to the transition economy — factory closure, skills made obsolete, the smaller world after the known world ended.',
    intent: 'year_texture',
    notes: 'Set by pol_shock_therapy (destroyed choice).',
  },

  precariato_generation: {
    weight: 'major',
    category: 'economic',
    description: 'Italian precariato generation — short-term contracts, Partite IVA, the flexible labour market where flexibility belonged to the employer.',
    intent: 'both',
    notes: 'Set by it_precariato.',
  },

  ration_book_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived under a ration book economy — planned scarcity, the HO queue, the Intershop for hard currency, the parallel economy everyone navigated.',
    intent: 'year_texture',
    notes: 'Set by communist_economy world event.',
  },

  oil_shock_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived through the 1973 oil shock — the petrol queue, odd/even plates, car-free Sundays, the first lesson about where energy comes from.',
    intent: 'year_texture',
    notes: 'Set by oil_crisis_1973 world event.',
  },

  nga_naira_crisis_lived: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived through Nigeria\'s 2022–2024 naira crisis — the redesign-induced cash shortage, the rate collapse from 460 to 1,500+/dollar, the fuel subsidy removal.',
    intent: 'both',
    notes: 'Set by nga_naira_crisis.',
  },

  bng_garment_generation: {
    weight: 'moderate',
    category: 'labor',
    description: 'Worked in Bangladesh\'s garment sector — the factory floor, the building specification, the label that says a European name.',
    intent: 'year_texture',
    notes: 'Set by bng_garment_worker.',
  },

  bng_microloan_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Engaged with the Grameen Bank microloan system — the group accountability, the weekly meeting, the sewing machine or the mobile money.',
    intent: 'year_texture',
    notes: 'Set by bng_grameen_loan.',
  },

  bng_broker_debt: {
    weight: 'major',
    category: 'economics',
    description: 'Borrowed 3-5 lakh taka against family land to pay a labour broker fee — at 3%/month interest, the debt that made the migration possible and made returning impossible until it was cleared.',
    intent: 'year_texture',
    notes: 'Set by bng_malaysia_decision. The specific arithmetic: monthly income vs. debt service vs. remittance target.',
  },

  bng_remittance_generation: {
    weight: 'moderate',
    category: 'economics',
    description: 'Part of Bangladesh\'s remittance economy — sent money home monthly, contributing to the 7-8% of GDP that workers abroad provide. The second floor on the family house.',
    intent: 'year_texture',
    notes: 'Set by bng_malaysia_life and bng_malaysia_return. Year texture: the Western Union schedule, what the money built.',
  },

  vn_factory_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Part of Vietnam\'s manufacturing boom generation — Samsung, Apple suppliers, textiles; the China+1 industrial shift that remade the Mekong Delta and northern provinces.',
    intent: 'year_texture',
    notes: 'Set by vn_factory_generation (both choices).',
  },

  migrant_worker_china: {
    weight: 'moderate',
    category: 'labor',
    description: 'Worked as internal migrant in Chinese cities — without full urban hukou rights, in factory or construction work.',
    intent: 'year_texture',
    notes: 'Set by cn_village_to_city.',
  },

  iron_rice_bowl_broken: {
    weight: 'major',
    category: 'labor',
    description: 'State-sector job lost in 1990s SOE reforms — the lifetime employment guarantee of Mao-era China ended.',
    intent: 'year_texture',
    notes: 'Set by cn_iron_rice_bowl_broken.',
  },

  hagwon_childhood: {
    weight: 'moderate',
    category: 'education',
    description: 'Childhood defined by the hagwon circuit — after-school academies, evening tutors, no unscheduled time.',
    intent: 'year_texture',
    notes: 'Set by kr_hagwon_childhood.',
  },

  night_study_generation: {
    weight: 'moderate',
    category: 'education',
    description: 'Adolescence defined by night study culture — school library until 11pm, five hours of sleep, relentless competition.',
    intent: 'year_texture',
    notes: 'Set by kr_night_study.',
  },

  suneung_year: {
    weight: 'major',
    category: 'education',
    description: 'Sat the suneung — the nine-hour university entrance exam that divides a Korean life into before and after.',
    intent: 'year_texture',
    notes: 'Set by kr_suneung_year. Gates kr_suneung_result.',
  },

  chaebol_worker: {
    weight: 'moderate',
    category: 'labor',
    description: 'Entered the Samsung/Hyundai/LG track — company as family, loyalty as requirement, scale as security.',
    intent: 'year_texture',
    notes: 'Set by kr_chaebol_entry.',
  },

  disabled_worker: {
    weight: 'moderate',
    category: 'labor',
    description: 'Navigated workplace as a disabled person — accommodations, limitations, the gap between reasonable adjustment and actual adjustment.',
    intent: 'none',
    notes: 'Design flag. Actual events use disability_employment_found / disability_fought_barrier (set by dis_employment_barrier).',
  },

  depression_unemployed: {
    weight: 'major',
    category: 'labor',
    description: 'Lost job in the Depression — the identity that came with the job, gone along with the job.',
    intent: 'year_texture',
    notes: 'Set by dep_job_loss.',
  },

  teacher_career: {
    weight: 'moderate',
    category: 'labor',
    description: 'Teacher by vocation — the career the events in this arc gate on (alongside career.id === teacher).',
    intent: 'none',
    notes: 'Can be set by career events or used as alias for career.id === teacher.',
  },

  yeshiva_secular_bridge: {
    weight: 'moderate',
    category: 'education',
    description: 'Yeshiva-trained character who found their method of Talmudic reasoning valued in the secular world.',
    intent: 'year_texture',
    notes: 'Set by yeshiva_secular_translation.',
  },

  debt_free_milestone: {
    weight: 'moderate',
    category: 'financial',
    description: 'Character who has paid off their last significant debt — the zero-balance moment.',
    intent: 'year_texture',
    notes: 'Set by debt_zero_moment.',
  },

  '996_burnout_lived': {
    weight: 'moderate',
    category: 'career',
    description: 'Lived the 996 work culture (9am-9pm, 6 days) — the hourly rate calculation, the apartment unseen in daylight.',
    intent: 'year_texture',
    notes: 'Set by cn_996_burnout.',
  },

  olive_trees_burned: {
    weight: 'moderate',
    category: 'occupation',
    description: 'Witnessed or experienced the destruction of olive trees — the trees planted by grandparents, uprooted before harvest, the season compressed by fear.',
    intent: 'year_texture',
    notes: 'Set by pal_olive_harvest.',
  },

  family_detained_israel: {
    weight: 'major',
    category: 'occupation',
    description: 'Had a family member held under Israeli administrative detention — six months, renewable, no charges, no trial.',
    intent: 'year_texture',
    notes: 'Set by pal_administrative_detention.',
  },

  water_ration_life: {
    weight: 'moderate',
    category: 'occupation',
    description: 'Grew up with rationed water supply while a settlement with a swimming pool was visible on the nearby hill.',
    intent: 'year_texture',
    notes: 'Set by pal_water_access.',
  },

  greece_crisis_stayed: {
    weight: 'major',
    category: 'economic',
    description: 'Stayed in Greece through the debt crisis — ATM limits, pension cuts, the troika conditions, the long endurance.',
    intent: 'year_texture',
    notes: 'Set by gr_debt_crisis_2010.',
  },

  greece_crisis_emigrant: {
    weight: 'major',
    category: 'economic',
    description: 'Left Greece during the debt crisis — part of the new Greek emigration of educated people with EU passports and diminished options at home.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by gr_debt_crisis_2010.',
  },

  arg_savings_destroyed: {
    weight: 'major',
    category: 'economic',
    description: 'Had savings wiped by the pesificación — Argentine government conversion of dollar deposits to pesos at 1:1, then peso devalued 3:1; effectively lost two-thirds of savings.',
    intent: 'year_texture',
    notes: 'Set by la_arg_pesificacion.',
  },

  spanish_housing_crash: {
    weight: 'major',
    category: 'economic',
    description: 'Bought property during Spain\'s housing bubble and was caught in the 2008 crash — mortgage underwater, flat worth less than paid.',
    intent: 'year_texture',
    notes: 'Set by es_housing_boom_bust (bought branch).',
  },

  spain_crisis_texture: {
    weight: 'minor',
    category: 'economic',
    description: 'Experienced the 2008–14 Spanish crisis without direct property loss — rising rents, stagnant wages, fifty percent youth unemployment as backdrop.',
    intent: 'none',
    notes: 'Set by es_housing_boom_bust (didn\'t buy branch).',
  },

  portuguese_troika_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived the Portuguese troika austerity 2011-2014: €78bn bailout, wage cuts, TSU rises, Constitutional Court battles, and the specific irony of Portuguese professionals emigrating to Angola and Brazil.',
    intent: 'year_texture',
    notes: 'Set by pt_troika_lived. Leave branch also sets portuguese_emigrant_2011.',
  },

  mn_post_socialist_shock: {
    weight: 'moderate',
    category: 'economic',
    description: 'Experienced the post-1990 negdel dissolution — animals returned, but veterinary support, guaranteed prices, and collective infrastructure gone.',
    intent: 'event',
    notes: 'Set by mn_negdel_dissolution_shock.',
  },

  entrepreneur: {
    weight: 'moderate',
    category: 'economics',
    description: 'Started or currently runs a business — the experience of having something that is yours, with everything that means.',
    intent: 'none',
    notes: 'Cross-cutting. Set by business arc, informal economy, and career events.',
  },

  laid_off: {
    weight: 'moderate',
    category: 'labor',
    description: 'Experienced job loss through redundancy or business failure — the specific education of finding out what you were worth to them.',
    intent: 'none',
    notes: 'Cross-cutting. Set by automation, Rust Belt, career, and poverty events.',
  },

  mobile_money_user: {
    weight: 'minor',
    category: 'economics',
    description: 'Accesses financial services through mobile money — the bank in a pocket that skipped the branch-era entirely.',
    intent: 'none',
    notes: 'Cross-cutting. Set by Kenya M-Pesa, Tajik remittance, and informal economy events.',
  },

  food_insecurity: {
    weight: 'major',
    category: 'economics',
    description: 'Lived with genuine food insecurity — where the question of whether there will be enough to eat was not rhetorical.',
    intent: 'year_texture',
    notes: 'Cross-cutting. Set by famine, poverty, and subsistence events. Already in buildYearTexture.',
  },

  poverty_childhood: {
    weight: 'major',
    category: 'economic',
    description: 'Grew up in poverty — food insecurity, material deprivation, and the specific knowledge that scarcity produces during formation years.',
    intent: 'both',
    notes: 'Set by multiple events across conflict_childhood, poverty, informal, and country-specific arcs. Checked in epitaph (hadHardChildhood) and event guards.',
  },

  education_interrupted: {
    weight: 'moderate',
    category: 'education',
    description: 'Had education interrupted — by conflict, poverty, family need, displacement, or regime policy — before reaching desired level.',
    intent: 'both',
    notes: 'Set across conflict, poverty, and country-specific arcs where formal education is cut short by circumstance.',
  },

  mobile_money_user: {
    weight: 'minor',
    category: 'economic',
    description: 'Adopted mobile money — M-Pesa, bKash, MTN Mobile Money — as a primary financial infrastructure before having a bank account.',
    intent: 'event',
    notes: 'Set alongside mobile_money flag. Both checked in year texture via mobile_money || mobile_money_user.',
  },

  food_insecurity: {
    weight: 'major',
    category: 'economic',
    description: 'Experienced food insecurity — irregular access to adequate nutrition due to poverty, conflict, drought, or economic collapse.',
    intent: 'both',
    notes: 'Set across many poverty, conflict, and country-specific arcs. Has year texture via food_insecurity block in buildYearTexture.',
  },

  remittance_family: {
    weight: 'moderate',
    category: 'economic',
    description: 'Part of a remittance economy — depends on money sent from a family member abroad to cover basic costs.',
    intent: 'both',
    notes: 'Set by OFW, emigration, and diaspora arcs. Has year texture in buildYearTexture.',
  },

  internet_generation: {
    weight: 'moderate',
    category: 'technology',
    description: 'Part of the first generation for whom the internet was formative — shaped by early online culture, social media, and the specific consciousness of living publicly online.',
    intent: 'year_texture',
    notes: 'Set by technology arc events. Has year texture in buildYearTexture.',
  },

  tur_lira_crisis_lived: {
    weight: 'moderate',
    category: 'economic',
    description: 'Experienced the Turkish lira\'s collapse of 2021–2022 — 80%+ inflation, savings eroded, everyday purchasing power gutted by unorthodox monetary policy.',
    intent: 'both',
    notes: 'Set by tur_lira_crisis event. Has year texture in Turkey section of buildYearTexture.',
  },

  bol_1952_beneficiary: {
    weight: 'moderate',
    category: 'economics',
    description: 'Family received land through the 1952 MNR agrarian reform — the document is kept in a plastic sleeve.',
    intent: 'none',
    notes: 'Set by bol_1952_revolution_echo (beneficiary choice). Bolivia only.',
  },

  bol_1952_dispossessed: {
    weight: 'moderate',
    category: 'economics',
    description: 'Family lost property in the 1952 agrarian reform — the story is told with a specific bitterness.',
    intent: 'none',
    notes: 'Set by bol_1952_revolution_echo (dispossessed choice). Bolivia only.',
  },

  bol_hyperinflation_survived: {
    weight: 'major',
    category: 'economics',
    description: 'Lived through the 1984–85 hyperinflation of 24,000% — the year the price of bread changed between entering the market and reaching the front of the queue.',
    intent: 'year_texture',
    notes: 'Set by bol_hyperinflation_1985. Bolivia only.',
  },

  bol_coca_grower: {
    weight: 'moderate',
    category: 'economics',
    description: 'Family grew coca in the Chapare — and had years of cultivation bulldozed by US-funded eradication in an afternoon.',
    intent: 'year_texture',
    notes: 'Set by bol_coca_eradication (cocalero choice). Bolivia only.',
  },

  nz_rogernomics_generation: {
    weight: 'major',
    category: 'economics',
    description: 'Lived through Rogernomics 1984–90 — New Zealand as a free-market laboratory, the egalitarianism that turned out to be policy rather than character.',
    intent: 'year_texture',
    notes: 'Set by nz_rogernomics. New Zealand only.',
  },

  athlete_became_coach: {
    weight: 'moderate',
    category: 'career',
    description: 'Transitioned from performing athlete to coach — finding language for physical knowledge never spoken, watching another body learn what yours already knows.',
    intent: 'event',
    notes: 'Set by events_career_arcs.js and events_gifted.js. Checked by ft24_athlete_coach_settled.',
  },

  hyperinflation_survivor: {
    weight: 'major', category: 'economics',
    description: 'Lived through hyperinflation — prices changing faster than earnings, money bundled in newspaper because wallets became impractical.',
    intent: 'event', notes: 'Set by hyperinflation world events (Weimar, Zimbabwe, etc.). Follow-through: ft39_hyperinflation_late.',
  },

  economic_stabilization: {
    weight: 'moderate', category: 'economics',
    description: 'Lived through economic stabilisation after crisis — the specific relief and residual distrust of a currency that had become worthless.',
    intent: 'none', notes: 'Set by economic crisis/recovery world events.',
  },

  post_soviet_shock: {
    weight: 'major', category: 'economics',
    description: 'Experienced the post-Soviet economic shock — savings wiped, factories closed, the state\'s guarantees withdrawn overnight.',
    intent: 'event', notes: 'Set by Soviet collapse world events. Follow-through: ft39_post_soviet_late.',
  },

  depression_generation: {
    weight: 'major', category: 'economics',
    description: 'Grew up during the Great Depression — the bread lines, Hoovervilles, the decade of unemployment that shaped a generation\'s relationship to money.',
    intent: 'event', notes: 'Set by Great Depression world events. Follow-through: ft42_depression_late.',
  },

  money_zero_survived: {
    weight: 'major',
    category: 'economic',
    description: 'Was genuinely, counting-days broke in young adulthood — not symbolic poverty but an actual period of not having enough.',
    intent: 'event',
    notes: 'Set by ya_money_zero (all branches). Gates ftw26_money_zero_midlife and ftw26_money_zero_late.',
  },

  black_tax_contributor: {
    weight: 'major',
    category: 'economic',
    description: 'Has been sending a significant portion of income back to family for years — the informal tax on being the first to succeed that operates across African and diaspora communities.',
    intent: 'event',
    notes: 'Set by events_wealth_system.js black tax event. Gates ftw26_black_tax_midlife, ftw26_black_tax_late.',
  },

  ngo_worker: {
    weight: 'major',
    category: 'career',
    description: 'Works or worked in the humanitarian/NGO sector — the gate flag for the entire aid worker arc.',
    intent: 'event',
    notes: 'Set by aw_entry_international or aw_local_entry. Gates all subsequent aid worker events.',
  },

  aw_international_staff: {
    weight: 'moderate',
    category: 'career',
    description: 'Entered the aid sector as international (expatriate) staff, deployed from a wealthy country.',
    intent: 'year_texture',
    notes: 'Set by aw_entry_international. Branches text in aw_salary_gap_intl, aw_evacuation.',
  },

  ngo_local_staff: {
    weight: 'moderate',
    category: 'career',
    description: 'Works as national/local staff within an NGO — the same work, different passport, different pay structure.',
    intent: 'year_texture',
    notes: 'Set by aw_local_entry. Branches text/choices in aw_salary_gap_local, aw_evacuation.',
  },

  ngo_raised_pay_gap: {
    weight: 'minor',
    category: 'career',
    description: 'Formally raised the national/international salary gap with management — it was noted; nothing changed.',
    intent: 'none',
    notes: 'Set by aw_salary_gap_local second choice. Late-life texture: the thing you said that was heard differently than you said it.',
  },

  aw_programme_ended: {
    weight: 'moderate',
    category: 'career',
    description: 'Managed the closure of a humanitarian programme — not because the crisis ended but because funding shifted.',
    intent: 'none',
    notes: 'Set by aw_funding_cut (both choices). The families heard at approximately the same time as the flight home.',
  },

  aw_left_sector: {
    weight: 'moderate',
    category: 'career',
    description: 'Left the humanitarian sector entirely — the guilt and the relief both present and honest.',
    intent: 'none',
    notes: 'Set by aw_burnout second choice.',
  },

  fiji_land_lost: {
    weight: 'major',
    category: 'economic',
    description: 'ALTO lease was not renewed — left the cane land their family had farmed for thirty years.',
    intent: 'none',
    notes: 'Set by fj_land_lease_expires first choice. Contextual economic marker.',
  },

  fiji_lease_renewed: {
    weight: 'moderate',
    category: 'economic',
    description: 'Successfully petitioned for land lease renewal — thirty more years, the count starts again.',
    intent: 'none',
    notes: 'Set by fj_land_lease_expires second choice.',
  },

  bonded_labor: {
    weight: 'major',
    category: 'economic',
    description: 'Entered bonded labor — a debt taken during crisis at terms that make repayment structurally impossible, servicing interest without touching principal.',
    intent: 'event',
    notes: 'Set by bl_initial_loan, bl_carpet_child, bl_sharecrop_ledger. Gates bl_kiln_life, bl_debt_inherited, bl_abolition_gap, bl_late_reckoning.',
  },

  bonded_kiln: {
    weight: 'major',
    category: 'labor',
    description: 'Works in a brick kiln under bonded labor conditions — the quota of one thousand bricks, the ledger that never resolves.',
    intent: 'event',
    notes: 'Set by bl_initial_loan first choice. Gates bl_kiln_life.',
  },

  bonded_generational: {
    weight: 'major',
    category: 'economic',
    description: 'Inherited a parent\'s bonded debt — the mechanism that makes the trap intergenerational.',
    intent: 'none',
    notes: 'Set by bl_debt_inherited first choice. The ledger with the new name.',
  },

  bonded_labor_freed: {
    weight: 'major',
    category: 'economic',
    description: 'Received a certificate of release from bonded labor — the debt cancelled, the paper real, the daily navigation of the former owner\'s presence ongoing.',
    intent: 'none',
    notes: 'Set by bl_liberation (both choices). The freedom that comes with a particular kind of exposure.',
  },

  sex_work_entry: {
    weight: 'major',
    category: 'labor',
    description: 'Entered sex work — survival-driven, tolerated-grey-zone, or legalized European context. The primary gate flag for the sex work arc.',
    intent: 'event',
    notes: 'Set by sw_entry_survival, sw_entry_tolerated, sw_entry_legalized. Gates sw_daily_criminalized, sw_police_encounter, sw_regular_client, sw_family_knows, sw_exit_opportunity, sw_long_term, sw_late_reckoning.',
  },

  sw_criminalized_context: {
    weight: 'moderate',
    category: 'labor',
    description: 'Entered sex work in a criminalized legal context — police as extortion variable, safety calculation as constant.',
    intent: 'none',
    notes: 'Set alongside sex_work_entry by sw_entry_survival. Gates sw_daily_criminalized and sw_police_encounter.',
  },

  sw_tolerated_context: {
    weight: 'moderate',
    category: 'labor',
    description: 'In a tolerated grey zone — Thailand-pattern, technically illegal but visibly present; tourist economy built around it.',
    intent: 'none',
    notes: 'Set by sw_entry_tolerated.',
  },

  sw_legalized_worker: {
    weight: 'moderate',
    category: 'labor',
    description: 'Registered sex worker in a legalized context — Netherlands, Germany, or New Zealand. Employment rights on paper; stigma persisting independently of legality.',
    intent: 'none',
    notes: 'Set by sw_entry_legalized first choice.',
  },

  sw_exited: {
    weight: 'major',
    category: 'labor',
    description: 'Exited sex work — took the opportunity when it came, managed the income gap, moved on.',
    intent: 'none',
    notes: 'Set by sw_exit_opportunity first choice. sw_late_reckoning covers late-life for all sw_entry holders.',
  },

  sw_exit_declined: {
    weight: 'moderate',
    category: 'labor',
    description: 'Chose not to take an exit from sex work when one appeared — the gap between what stopping pays and what continuing pays was not abstract.',
    intent: 'none',
    notes: 'Set by sw_exit_opportunity second choice.',
  },

  sw_long_term_worker: {
    weight: 'major',
    category: 'labor',
    description: 'Spent a decade or more in sex work — the expert knowledge, the social world, the specific body of understanding that comes with long experience in the sector.',
    intent: 'year_texture',
    notes: 'Set by sw_exit_opportunity second choice and sw_long_term. Needs year texture in buildYearTexture().',
  },

  moneylender_debt_cleared: {
    weight: 'moderate',
    category: 'economic',
    description: 'Paid off the moneylender debt — years of reduced margin, then one season without the payment above everything.',
    intent: 'none',
    notes: 'Set by ft27_moneylender_ongoing first choice.',
  },

  gig_worker: {
    weight: 'moderate',
    category: 'economic',
    description: 'Worked in the platform/gig economy — Uber, Deliveroo, TaskRabbit, or equivalent — with flexibility as the primary benefit and instability as the structural cost.',
    intent: 'event',
    notes: 'Set by dec10_gig_work. Follow-through at midlife: dec10_gig_echo.',
  },

  always_connected: {
    weight: 'minor',
    category: 'technology',
    description: 'Experienced the decade of ubiquitous smartphone connectivity — the phone at the table, the half-lit screen, the permanent availability of interruption.',
    intent: 'year_texture',
    notes: 'Set by dec10_always_connected.',
  },

  algorithm_aware: {
    weight: 'minor',
    category: 'technology',
    description: 'Became conscious of algorithmic curation — the feed stopping being chronological, the opacity of what gets shown and why, the difficulty of tracing opinion-formation.',
    intent: 'none',
    notes: 'Set by dec10_algorithm_life.',
  },

  smartphone_generation: {
    weight: 'minor',
    category: 'technology',
    description: 'Part of the generation whose first sustained experience of the internet was through a smartphone rather than a desktop computer.',
    intent: 'none',
    notes: 'Set by internet_smartphone_arrival.',
  },

  afghan_girl_studied_secret: {
    weight: 'moderate',
    category: 'education',
    description: 'An Afghan girl chose to study in secret after the Taliban school ban — the continued education conducted in hiding, at risk.',
    intent: 'event',
    notes: 'Set by sl_afghan_girl_school_ban. Follow-through: sl_afghan_girl_echo fires at young_adult.',
  },

  afghan_girl_stopped_studying: {
    weight: 'moderate',
    category: 'education',
    description: 'An Afghan girl stopped studying after the Taliban school ban — the foreclosure of a life trajectory by decree.',
    intent: 'year_texture',
    notes: 'Set by sl_afghan_girl_school_ban.',
  },

  japan_ol_track_accepted: {
    weight: 'minor',
    category: 'career',
    description: 'Accepted the office-lady track — the career ceiling built into the role, the social smoothness that comes with not pushing back.',
    intent: 'none',
    notes: 'Set by sl_japan_ol_track.',
  },

  japan_career_fought: {
    weight: 'minor',
    category: 'career',
    description: 'Pushed back against the OL track assignment — the friction this created, the tiny space that refusal opened.',
    intent: 'none',
    notes: 'Set by sl_japan_ol_track.',
  },

  dhaka_garment_worked: {
    weight: 'moderate',
    category: 'labour',
    description: 'Worked in the Dhaka garment industry — the factory floors, the quota systems, the twelve-hour days, the economic lifeline of Bangladesh.',
    intent: 'event',
    notes: 'Set by sl_dhaka_garment. Follow-through: sl_rana_plaza_aftermath fires 2013-2017.',
  },

  industry_lost: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lost their occupation or livelihood to deindustrialisation — the letter, the closure, the identity built around a trade that no longer exists.',
    intent: 'year_texture',
    notes: 'Set by sl_coal_miner_pit_closure and similar industrial closure events.',
  },

  market_woman: {
    weight: 'minor',
    category: 'labour',
    description: 'Runs a market stall or trading post as the primary economic unit — the informal sector management that underpins urban economies across the developing world.',
    intent: 'none',
    notes: 'Set by sl_nigeria_market_woman.',
  },

  welfare_state_beneficiary: {
    weight: 'minor',
    category: 'economic',
    description: 'Directly benefited from a universal welfare system at a formative moment — NHS birth, free university, housing benefit — in a way that would not have been possible without the state.',
    intent: 'none',
    notes: 'Set by sl_uk_nhs_birth.',
  },

  bracero_generation: {
    weight: 'minor',
    category: 'labour',
    description: 'Part of the US Bracero Program or similar bilateral guest-worker contracts — the temporary migration that sustained remittance economies across borders.',
    intent: 'none',
    notes: 'Set by sl_mexican_bracero.',
  },

  colonial_education: {
    weight: 'moderate',
    category: 'education',
    description: 'Educated in a colonial institution — the missionary school, the colonial syllabus, the history taught against itself.',
    intent: 'year_texture',
    notes: 'Set by sl_missionary_school_africa.',
  },

  domestic_worker: {
    weight: 'moderate',
    category: 'labour',
    description: 'Worked as a live-in domestic worker — the maid\'s room off the kitchen, the Sunday noon day off, the legal protections on paper that do not reliably reach the kitchen.',
    intent: 'year_texture',
    notes: 'Set by sl_latin_america_maid. Cross-cutting developing_urban female experience.',
  },

  artisanal_miner: {
    weight: 'moderate',
    category: 'labour',
    description: 'Works artisanal mining — the hand and the sack and the absence of protective equipment, the one to three dollars a day, the company that sells the mineral that is not called artisanal.',
    intent: 'year_texture',
    notes: 'Set by sl_drc_cobalt_miner.',
  },

  precariat_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'The Japanese herbivore man generation — not aggressive about career or marriage, not because of failed ambition but because the pathways the previous generation walked are closed.',
    intent: 'year_texture',
    notes: 'Set by sl_japan_herbivore_men.',
  },

  sampo_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'South Korean sampo generation — gave up dating, marriage, children (and later home ownership and stable employment). The closing of doors the previous generation walked through when open.',
    intent: 'year_texture',
    notes: 'Set by sl_south_korea_sampo_generation.',
  },

  generation_rent: {
    weight: 'moderate',
    category: 'economic',
    description: 'Part of the UK generation rent — earns adequately, cannot buy, pays rent higher than a mortgage payment for the same property, has done the arithmetic and found it both clarifying and enraging.',
    intent: 'year_texture',
    notes: 'Set by sl_uk_generation_rent.',
  },

  land_dispossessed: {
    weight: 'major',
    category: 'economic',
    description: 'Lost a farm or substantial land through state confiscation — the letter, the three months, the crop already in the ground, the workers whose housing was on the land, both the injustice and the justice of it simultaneously.',
    intent: 'year_texture',
    notes: 'Set by sl_zimbabwe_white_farmer_seizure.',
  },

  second_business_started: {
    weight: 'minor',
    category: 'economic',
    description: 'Started a second business after a previous failure — smaller, more cautious, the scar tissue from the first attempt converted into structural knowledge.',
    intent: 'none',
    notes: 'Set by ft30_business_second_attempt (business_failed follow-through).',
  },

  business_chapter_closed: {
    weight: 'minor',
    category: 'economic',
    description: 'Decided not to try again after a business failure — the chapter closed, the energy redirected to career, family, or life outside the pitch deck.',
    intent: 'none',
    notes: 'Set by ft30_business_second_attempt (business_failed follow-through).',
  },

}
