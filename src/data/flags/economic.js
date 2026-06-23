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
    intent: 'event', notes: 'Set by economic crisis/recovery world events. Follow-through: ft47_economic_stabilization_midlife.',
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

  // ── DOCTOR ARC ──────────────────────────────────────────────────────────────

  doc_first_death: {
    weight: 'moderate',
    category: 'career',
    description: 'Doctor carried out of the room after their first patient death as the responsible physician.',
    intent: 'event',
    notes: 'Guard for doc_the_case and doc_the_question follow-ons.',
  },

  doc_resource_shortage: {
    weight: 'moderate',
    category: 'career',
    description: 'Doctor working in a setting where essential medications and equipment are absent — the workaround as the primary skill.',
    intent: 'none',
  },

  doc_the_case: {
    weight: 'moderate',
    category: 'career',
    description: 'The one case the doctor carries differently from all others — face and result retrievable without effort decades later.',
    intent: 'none',
  },

  doc_tells_truth: {
    weight: 'minor',
    category: 'career',
    description: 'Doctor chose to give a patient as full a truthful prognosis as possible when asked directly.',
    intent: 'none',
  },

  doc_colleague_lost: {
    weight: 'major',
    category: 'career',
    description: 'A medical colleague died by suicide — the specific shadow the profession carries.',
    intent: 'event',
  },

  doc_burnout: {
    weight: 'major',
    category: 'career',
    description: 'Doctor experiencing clinical emotional distance — the accumulation of years narrowing the felt significance of individual patients.',
    intent: 'both',
  },

  doc_burnout_addressed: {
    weight: 'moderate',
    category: 'career',
    description: 'Doctor took leave to address burnout — some of what was lost returned.',
    intent: 'none',
  },

  doc_rural_posting: {
    weight: 'moderate',
    category: 'career',
    description: 'Doctor posted to a rural clinic covering hundreds of square kilometres with minimal backup.',
    intent: 'none',
  },

  doc_late_reckoning: {
    weight: 'moderate',
    category: 'career',
    description: 'Doctor\'s late-life accounting of a medical career in terms of individual faces and moments rather than numbers.',
    intent: 'none',
  },

  // ── JOURNALIST ARC ──────────────────────────────────────────────────────────

  journalist_first_story: {
    weight: 'moderate',
    category: 'career',
    description: 'The journalist\'s first story that mattered — reached where it needed to reach, produced the response that said the information landed.',
    intent: 'event',
  },

  journalist_source_kept: {
    weight: 'major',
    category: 'career',
    description: 'Journalist protected a source when it was costly to do so — established a permanent position.',
    intent: 'event',
  },

  journalist_self_censored: {
    weight: 'major',
    category: 'career',
    description: 'Journalist filed a story without its central finding under editorial or political pressure.',
    intent: 'event',
  },

  journalist_colleague_killed: {
    weight: 'major',
    category: 'career',
    description: 'A journalist colleague was killed covering a story — the specific professional weight of this loss.',
    intent: 'both',
  },

  journalist_subject_encountered: {
    weight: 'moderate',
    category: 'career',
    description: 'Journalist encountered a subject of their work and confronted the gap between accuracy and full consequence.',
    intent: 'none',
  },

  journalist_archive_read: {
    weight: 'minor',
    category: 'career',
    description: 'Journalist read their own work from twenty-plus years ago — found some certainties wrong, the record permanent.',
    intent: 'none',
  },

  journalist_late_reckoning: {
    weight: 'moderate',
    category: 'career',
    description: 'Journalist\'s late-life accounting of what journalism does and does not accomplish.',
    intent: 'none',
  },

  // ── LAWYER ARC ──────────────────────────────────────────────────────────────

  lawyer_first_client: {
    weight: 'moderate',
    category: 'career',
    description: 'Lawyer\'s first real client — taught the gap between what the law promises and what it delivers.',
    intent: 'event',
  },

  lawyer_guilty_client: {
    weight: 'moderate',
    category: 'career',
    description: 'Client privately admitted guilt; lawyer represented them anyway per the adversarial requirement.',
    intent: 'none',
  },

  lawyer_justice_gap: {
    weight: 'major',
    category: 'career',
    description: 'Case that resolved correctly under law but not justly — the two outcomes diverged.',
    intent: 'event',
  },

  lawyer_pro_bono: {
    weight: 'moderate',
    category: 'career',
    description: 'Lawyer took a case for nothing because it mattered — found something in themselves that billing work did not produce.',
    intent: 'none',
  },

  lawyer_in_system: {
    weight: 'moderate',
    category: 'career',
    description: 'Lawyer chose to stay inside a legal system used as political instrument — finding spaces where real law still operates.',
    intent: 'none',
  },

  lawyer_dissident_cases: {
    weight: 'major',
    category: 'career',
    description: 'Lawyer took cases the state would not like — using the law against itself under authoritarian conditions.',
    intent: 'event',
  },

  lawyer_wrongful_conviction_doubt: {
    weight: 'major',
    category: 'career',
    description: 'Lawyer became aware — without legal certainty — that someone they prosecuted or failed to defend may have been innocent.',
    intent: 'both',
  },

  lawyer_late_career: {
    weight: 'minor',
    category: 'career',
    description: 'Late-career lawyer who has seen enough legal change to know the law is more contingent than it appears.',
    intent: 'none',
  },

  lawyer_life_accounted: {
    weight: 'moderate',
    category: 'career',
    description: 'Lawyer\'s late-life accounting of a career inside the imperfect machinery of the law.',
    intent: 'none',
  },

  // ── NURSE ARC ───────────────────────────────────────────────────────────────

  nurse_first_death: {
    weight: 'moderate',
    category: 'career',
    description: 'Nurse was the person in the room when a patient died — before the doctor arrived. First time.',
    intent: 'event',
  },

  nurse_family_mediation: {
    weight: 'moderate',
    category: 'career',
    description: 'Nurse translating between what medicine can offer and what a desperate family needs medicine to promise.',
    intent: 'none',
  },

  nurse_advocated: {
    weight: 'moderate',
    category: 'career',
    description: 'Nurse successfully challenged a treatment decision through proper escalation — clinical observation overrode the ward round.',
    intent: 'none',
  },

  nurse_accumulated_grief: {
    weight: 'major',
    category: 'career',
    description: 'Nurse who has accumulated years of patient deaths — the specific weight of repeated loss, the clinical distance built as a tool.',
    intent: 'both',
  },

  nurse_short_staffed: {
    weight: 'moderate',
    category: 'career',
    description: 'Nurse covering a chronic staffing gap — the gap is their body and hours.',
    intent: 'none',
  },

  nurse_recognition_received: {
    weight: 'minor',
    category: 'career',
    description: 'A patient family found the nurse specifically, after the fact, to say what the care meant.',
    intent: 'none',
  },

  nurse_retired: {
    weight: 'moderate',
    category: 'career',
    description: 'Nurse retired after a long career — last handover, keys left, something carried out.',
    intent: 'event',
    notes: 'Guards nurse_life_accounted (nur_life_accounting when: G.flags.has(nurse_retired)).',
  },

  nurse_life_accounted: {
    weight: 'moderate',
    category: 'career',
    description: 'Nurse\'s late-life accounting of a career done in hands-knowledge and accumulated weight, not metrics.',
    intent: 'none',
  },

  // ── FARMER ARC ──────────────────────────────────────────────────────────────

  farmer_first_season: {
    weight: 'minor',
    category: 'career',
    description: 'Farmer\'s first independent season — the lesson that farming is waiting on things larger than your effort.',
    intent: 'event',
    notes: 'Guards farmer_good_year.',
  },

  farmer_good_year: {
    weight: 'minor',
    category: 'career',
    description: 'A year when the rains came right, the crop came through, the market was fair — the standard referenced in harder years.',
    intent: 'none',
  },

  farmer_credit_trap: {
    weight: 'moderate',
    category: 'economic',
    description: 'Farmer locked into the trader-loan cycle — money at planting, repayment in crop at the trader\'s harvest price.',
    intent: 'none',
  },

  farmer_land_titled: {
    weight: 'minor',
    category: 'economic',
    description: 'Farmer obtained a formal land title — the document that clarifies ownership in ways that carry their own ambiguity.',
    intent: 'none',
  },

  farmer_survived_bad_years: {
    weight: 'moderate',
    category: 'career',
    description: 'Farmer survived consecutive bad seasons — came through, but something shifted in the margin.',
    intent: 'none',
  },

  farmer_family_migrated: {
    weight: 'moderate',
    category: 'geographic',
    description: 'A family member left for the city to provide income while the farm struggled — the farm changes shape.',
    intent: 'none',
  },

  farmer_inheritance_question: {
    weight: 'moderate',
    category: 'career',
    description: 'The unresolved question of who will farm the land after the farmer — the child who stayed vs. the one who left.',
    intent: 'event',
  },

  farmer_body_cost: {
    weight: 'moderate',
    category: 'health',
    description: 'Farmer\'s body presenting the accumulated cost of thirty years of physical work — the back, the knees, the hands.',
    intent: 'none',
  },

  farmer_late_reckoning: {
    weight: 'moderate',
    category: 'career',
    description: 'Farmer\'s late-life accounting of a life in seasons — the land still there, the people gone, the food produced.',
    intent: 'none',
  },

  // ── POLICE ARC ──────────────────────────────────────────────────────────────

  police_first_call: {
    weight: 'minor',
    category: 'career',
    description: 'Officer\'s first solo call — the gap between procedure and situation as the actual job.',
    intent: 'event',
    notes: 'Guards police_community_distrust.',
  },

  police_community_distrust: {
    weight: 'major',
    category: 'career',
    description: 'Officer patrolling a community with documented reasons not to trust the police — the arithmetic of institutional debt.',
    intent: 'none',
  },

  police_force_used: {
    weight: 'major',
    category: 'career',
    description: 'Officer used proportionate force in the line of duty — the unprocessed weight of it at 11pm in the car outside home.',
    intent: 'event',
  },

  police_sought_support: {
    weight: 'minor',
    category: 'career',
    description: 'Officer sought psychological support after using force — partial processing within institutional limits.',
    intent: 'none',
  },

  police_regime_enforcer: {
    weight: 'major',
    category: 'political',
    description: 'Officer fully complied with orders to police political activity under an authoritarian regime.',
    intent: 'none',
  },

  police_minimal_compliance: {
    weight: 'moderate',
    category: 'political',
    description: 'Officer left a gap in authoritarian enforcement — small, deniable, some people used it.',
    intent: 'none',
  },

  police_whistleblower: {
    weight: 'major',
    category: 'career',
    description: 'Officer reported departmental wrongdoing through proper channels — career consequences, partial accountability.',
    intent: 'none',
  },

  police_silence_kept: {
    weight: 'major',
    category: 'career',
    description: 'Officer chose silence over reporting departmental wrongdoing — knows it, doesn\'t discuss it.',
    intent: 'none',
  },

  police_career_weight: {
    weight: 'major',
    category: 'career',
    description: 'Officer carrying the accumulated weight of exposure — scenes, decisions, the gap between procedure and situation over fifteen-plus years.',
    intent: 'both',
    notes: 'Guards pol_career_weight_echo (late_life echo).',
  },

  police_late_reckoning: {
    weight: 'moderate',
    category: 'career',
    description: 'Officer\'s late-life accounting of a career holding authority in communities that had reason not to trust it.',
    intent: 'none',
  },

  // ── FARMER ARC INHERITANCE ECHO ─────────────────────────────────────────────

  farmer_inheritance_resolved: {
    weight: 'minor',
    category: 'career',
    description: 'The farm inheritance question reached some resolution — who will farm it, or won\'t.',
    intent: 'none',
  },

  // ── SOCIAL WORKER ARC ───────────────────────────────────────────────────────

  sw_first_case: {
    weight: 'minor',
    category: 'career',
    description: 'Social worker\'s first case — learned the gap between the referral form and the actual situation.',
    intent: 'event',
    notes: 'Guards sw_good_outcome.',
  },

  sw_good_outcome: {
    weight: 'moderate',
    category: 'career',
    description: 'A case that resolved well — the place in professional memory where the work was worth doing.',
    intent: 'none',
  },

  sw_system_failure_witnessed: {
    weight: 'major',
    category: 'career',
    description: 'Social worker watched the system fail a case they had flagged — the specific shape of avoidable harm.',
    intent: 'none',
  },

  sw_secondary_trauma: {
    weight: 'major',
    category: 'career',
    description: 'Social worker carrying secondary trauma — the accumulation of sustained proximity to others\' worst experiences.',
    intent: 'both',
    notes: 'Guards sw_secondary_trauma_echo (late_life).',
  },

  sw_sought_support: {
    weight: 'minor',
    category: 'career',
    description: 'Social worker sought formal supervision or peer support for secondary trauma — ongoing processing.',
    intent: 'none',
  },

  sw_colleague_left: {
    weight: 'moderate',
    category: 'career',
    description: 'A good colleague left social work entirely — the specific moment when a known abstract becomes a specific person\'s choice.',
    intent: 'event',
    notes: 'Guards sw_colleague_echo (late_life).',
  },

  sw_late_reckoning: {
    weight: 'moderate',
    category: 'career',
    description: 'Social worker\'s late-life accounting — the system failures, the weight, the good-outcome file, what changed because you were the assigned worker.',
    intent: 'none',
  },

  // ── ARTIST ARC ──────────────────────────────────────────────────────────────

  artist_first_real_work: {
    weight: 'moderate',
    category: 'career',
    description: 'Artist\'s first work that could only have come from them — origin unaccountable, conditions of arrival unrepeatable.',
    intent: 'event',
    notes: 'Guards artist_money_question and artist_recognized.',
  },

  artist_committed_to_work: {
    weight: 'moderate',
    category: 'career',
    description: 'Artist chose the real work over the sellable work — precarious economy, real creative integrity.',
    intent: 'none',
  },

  artist_commercial_path: {
    weight: 'moderate',
    category: 'career',
    description: 'Artist chose the sellable work — margins for real work smaller than planned.',
    intent: 'event',
    notes: 'Guards artist_commercial_echo (late_life).',
  },

  artist_recognized: {
    weight: 'moderate',
    category: 'career',
    description: 'Artist\'s work seen and understood by the right audience — the occasion that tells something true about the work.',
    intent: 'none',
  },

  artist_fallow_period: {
    weight: 'moderate',
    category: 'career',
    description: 'Artist went through a sustained fallow period — work not coming, conditions present, resource depleted.',
    intent: 'event',
    notes: 'Guards artist_after_fallow.',
  },

  artist_after_fallow: {
    weight: 'moderate',
    category: 'career',
    description: 'Artist came out of the fallow period with work that surprised them — the fallow produced what the interrupted version wouldn\'t have.',
    intent: 'none',
  },

  artist_body_of_work: {
    weight: 'moderate',
    category: 'career',
    description: 'Artist has a body of work visible from a distance — accumulated, uneven, some of it the real stuff.',
    intent: 'none',
  },

  artist_late_reckoning: {
    weight: 'moderate',
    category: 'career',
    description: 'Artist\'s late-life accounting — real work made, money question unresolved, fallow survived, body of work exists.',
    intent: 'none',
  },

  // ── ENGINEER ARC ─────────────────────────────────────────────────────────────

  engineer_first_design: {
    weight: 'moderate',
    category: 'career',
    description: 'Engineer saw the first thing they designed get built — tolerances held, fabrication drawings went out with their name.',
    intent: 'none',
  },

  engineer_compromised: {
    weight: 'major',
    category: 'career',
    description: 'Engineer signed off on a cheaper material substitution that met code but reduced their calculated margin.',
    intent: 'both',
    notes: 'Guards eng_compromise_echo (late_life).',
  },

  engineer_held_line: {
    weight: 'moderate',
    category: 'career',
    description: 'Engineer pushed back on a spec substitution and got the original material restored via structural review.',
    intent: 'none',
  },

  engineer_failure: {
    weight: 'major',
    category: 'career',
    description: 'Something the engineer designed failed — not catastrophically, but traced back to a modelling assumption they made.',
    intent: 'event',
    notes: 'Guards eng_the_investigation.',
  },

  engineer_safety_flagged: {
    weight: 'major',
    category: 'career',
    description: 'Engineer escalated a safety concern before breaking ground, causing delay but getting the detail corrected.',
    intent: 'event',
    notes: 'Guards eng_safety_echo (late_life).',
  },

  engineer_safety_documented: {
    weight: 'moderate',
    category: 'career',
    description: 'Engineer documented a safety concern but did not escalate — the project proceeded with the concern in the file.',
    intent: 'none',
  },

  engineer_obsolescence: {
    weight: 'moderate',
    category: 'career',
    description: 'Engineer whose primary software stack has become legacy — still competent, holds physical system knowledge the new tools lack.',
    intent: 'none',
  },

  engineer_late_reckoning: {
    weight: 'moderate',
    category: 'career',
    description: 'Engineer\'s late-life accounting — things built, failure survived, compromises made, structures still standing.',
    intent: 'none',
  },

  // ── SOFTWARE DEVELOPER ARC ───────────────────────────────────────────────────

  dev_first_shipped: {
    weight: 'moderate',
    category: 'career',
    description: 'Software developer shipped their first product — watched the first user interaction go the way they designed it.',
    intent: 'none',
  },

  dev_pivot: {
    weight: 'moderate',
    category: 'career',
    description: 'Developer\'s startup/company pivoted away from the product they joined for — still engineering, different mission.',
    intent: 'none',
  },

  dev_raised_privacy: {
    weight: 'moderate',
    category: 'career',
    description: 'Developer raised minimal data collection as an engineering concern — some collection was scoped down.',
    intent: 'none',
  },

  dev_surveillance_complied: {
    weight: 'major',
    category: 'career',
    description: 'Developer built data collection they had reservations about — framed as a product decision above their level.',
    intent: 'event',
    notes: 'Guards dev_surveillance_echo (late_life).',
  },

  dev_crunch: {
    weight: 'moderate',
    category: 'career',
    description: 'Developer went through extended crunch period — health and mood costs of twelve-week-in-six-weeks delivery.',
    intent: 'none',
  },

  dev_burnout_addressed: {
    weight: 'moderate',
    category: 'career',
    description: 'Developer took time away during burnout — something returned in the third week that had been absent.',
    intent: 'none',
  },

  dev_burnout_unaddressed: {
    weight: 'major',
    category: 'career',
    description: 'Developer kept working through burnout — output same, but relationship to the work fundamentally shifted.',
    intent: 'both',
    notes: 'Guards dev_burnout_echo (late_life).',
  },

  dev_obsolescence: {
    weight: 'moderate',
    category: 'career',
    description: 'Developer\'s primary stack classified as legacy — holds deep edge-case knowledge the newer engineers lack.',
    intent: 'none',
  },

  dev_late_reckoning: {
    weight: 'moderate',
    category: 'career',
    description: 'Developer\'s late-life accounting — systems shipped, ethical corners navigated, stack changed three times.',
    intent: 'none',
  },

  // ── FACTORY WORKER ARC ───────────────────────────────────────────────────────

  factory_first_shift: {
    weight: 'moderate',
    category: 'labor',
    description: 'Factory worker\'s first shift — motion repeated hundreds of times, body taking it over by hour four.',
    intent: 'none',
  },

  factory_line_sped_up: {
    weight: 'moderate',
    category: 'labor',
    description: 'Production line speed increased 15% — efficiency study did not measure what the new pace costs the body across a year.',
    intent: 'none',
  },

  factory_joined_union: {
    weight: 'major',
    category: 'labor',
    description: 'Factory worker signed the union card during organising drive — first contract took 14 months, grievance procedure won.',
    intent: 'both',
    notes: 'Guards fac_union_echo (late_life).',
  },

  factory_declined_union: {
    weight: 'moderate',
    category: 'labor',
    description: 'Factory worker did not sign the union card — benefits from contract anyway; organiser knows.',
    intent: 'none',
  },

  factory_repetitive_strain: {
    weight: 'moderate',
    category: 'labor',
    description: 'Factory worker developed repetitive strain injury — cumulative conversation between motion and joint over ten years.',
    intent: 'none',
  },

  factory_injury: {
    weight: 'major',
    category: 'labor',
    description: 'Factory worker injured by machine at hour nine — compensation form, recovery longer than doctor initially said.',
    intent: 'event',
    notes: 'Guards fac_injury_echo (late_life).',
  },

  factory_plant_closed: {
    weight: 'major',
    category: 'labor',
    description: 'Factory worker\'s plant closed by holding company — severance paid, retraining has a waiting list.',
    intent: 'none',
  },

  factory_late_reckoning: {
    weight: 'moderate',
    category: 'labor',
    description: 'Factory worker\'s late-life accounting — body as record, wages earned, solidarity or its absence.',
    intent: 'none',
  },

  // ── LABORER ARC ──────────────────────────────────────────────────────────────

  laborer_body_young: {
    weight: 'moderate',
    category: 'labor',
    description: 'Laborer at peak physical capability — knows their inventory of what they can lift, carry, sustain.',
    intent: 'none',
  },

  laborer_seasonal_work: {
    weight: 'moderate',
    category: 'labor',
    description: 'Laborer navigating the precarious seasonal rhythm — full months and thin months, same shape every year.',
    intent: 'none',
  },

  laborer_injury_recovered: {
    weight: 'moderate',
    category: 'labor',
    description: 'Laborer rested properly after back injury — returned with modified lifting protocol, clearer sense of limits.',
    intent: 'none',
  },

  laborer_injury: {
    weight: 'major',
    category: 'labor',
    description: 'Laborer returned to work too early after back injury — disc didn\'t fully resolve; negotiating the thing for years.',
    intent: 'event',
    notes: 'Guards lab_injury_echo (late_life).',
  },

  laborer_debt_cycle: {
    weight: 'moderate',
    category: 'labor',
    description: 'Laborer in debt-to-wage cycle — borrowed against next season\'s wages to cover this season\'s gap.',
    intent: 'none',
  },

  laborer_aging_out: {
    weight: 'moderate',
    category: 'labor',
    description: 'Laborer in the category of workers who get the easier jobs — foreman\'s calculation about what the body can do today.',
    intent: 'none',
  },

  laborer_late_reckoning: {
    weight: 'moderate',
    category: 'labor',
    description: 'Laborer\'s late-life accounting — body as record, peak years and accumulation, seasons survived.',
    intent: 'none',
  },

  // ── CIVIL SERVANT ARC ────────────────────────────────────────────────────────

  civil_servant_first_posting: {
    weight: 'moderate',
    category: 'career',
    description: 'Civil servant\'s first posting — learned the gap between the form and the situation, and that the form is the only instrument.',
    intent: 'none',
  },

  civil_servant_applied_rule: {
    weight: 'moderate',
    category: 'career',
    description: 'Civil servant applied the rule where the rule was insufficient — technically correct, not the whole situation.',
    intent: 'none',
  },

  civil_servant_used_discretion: {
    weight: 'moderate',
    category: 'career',
    description: 'Civil servant found the discretionary provision in the rule to produce the outcome the policy intended.',
    intent: 'none',
  },

  civil_servant_regime_complied: {
    weight: 'major',
    category: 'career',
    description: 'Civil servant processed a regime directive requiring the civil service to categorise a population it hadn\'t categorised before.',
    intent: 'both',
    notes: 'Guards cs_regime_echo (late_life).',
  },

  civil_servant_regime_refused: {
    weight: 'major',
    category: 'career',
    description: 'Civil servant requested reassignment rather than process a regime directive — took six months; machinery continued without them.',
    intent: 'none',
  },

  civil_servant_small_decisions: {
    weight: 'moderate',
    category: 'career',
    description: 'Civil servant who has made thousands of small decisions — the stream of situations processed, correctly on balance.',
    intent: 'none',
  },

  civil_servant_late_reckoning: {
    weight: 'moderate',
    category: 'career',
    description: 'Civil servant\'s late-life accounting — rules applied, discretion found or not, regime directive processed or refused.',
    intent: 'none',
  },

  // ── DRIVER ARC ───────────────────────────────────────────────────────────────

  driver_city_knowledge: {
    weight: 'moderate',
    category: 'career',
    description: 'Driver who knows the city by its traffic — routes that breathe at which hours, badly timed signals, conditional shortcuts.',
    intent: 'none',
  },

  driver_late_passenger: {
    weight: 'moderate',
    category: 'career',
    description: 'Driver who became recipient of the specific privacy of the back seat — information that has nowhere else to go at 11pm.',
    intent: 'none',
  },

  driver_body_cost: {
    weight: 'moderate',
    category: 'labor',
    description: 'Driver whose back shows what twelve-hour shifts in the same posture for ten years produces — managing the early-stage cost.',
    intent: 'none',
  },

  driver_night_work: {
    weight: 'moderate',
    category: 'labor',
    description: 'Driver who worked night shifts — the city at 2am is a different city; developed a different alertness for it.',
    intent: 'none',
  },

  driver_accident: {
    weight: 'major',
    category: 'career',
    description: 'Driver involved in an accident that was not their fault — passenger not seriously injured; returned to work after three days.',
    intent: 'event',
    notes: 'Guards drv_accident_echo (late_life).',
  },

  driver_platform_worker: {
    weight: 'moderate',
    category: 'labor',
    description: 'Driver operating under a platform app — rated out of five, position in queue affected, managing the rating system.',
    intent: 'none',
  },

  driver_late_reckoning: {
    weight: 'moderate',
    category: 'career',
    description: 'Driver\'s late-life accounting — city known, passengers carried, accident survived, body cost paid.',
    intent: 'none',
  },

  // ── MERCHANT ARC ─────────────────────────────────────────────────────────────

  merchant_market_knowledge: {
    weight: 'moderate',
    category: 'economic',
    description: 'Merchant who knows the market by its rhythm — which day suppliers are hungry, where the information is before it becomes price.',
    intent: 'none',
  },

  merchant_claimed_business: {
    weight: 'moderate',
    category: 'economic',
    description: 'Merchant who claimed the family business as their own rather than something they were continuing.',
    intent: 'none',
  },

  merchant_uncertain_inheritance: {
    weight: 'moderate',
    category: 'economic',
    description: 'Merchant who kept open the question of whether the business was chosen or inherited — the market doesn\'t distinguish.',
    intent: 'none',
  },

  merchant_good_year: {
    weight: 'moderate',
    category: 'economic',
    description: 'Merchant who experienced the good year — conditions aligned, price moved right, the buyer came through.',
    intent: 'none',
  },

  merchant_bad_year: {
    weight: 'major',
    category: 'economic',
    description: 'Merchant who lived through a significantly bad year — reserve substantially reduced; both uncontrollable factors and revisable decisions.',
    intent: 'event',
    notes: 'Guards mer_bad_year_echo (late_life).',
  },

  merchant_adapted: {
    weight: 'moderate',
    category: 'economic',
    description: 'Merchant who adapted to structural market shift — smaller position than before, but more stable than expected.',
    intent: 'none',
  },

  merchant_held_position: {
    weight: 'moderate',
    category: 'economic',
    description: 'Merchant who held their original position during market shift — now serving the edge of the market.',
    intent: 'none',
  },

  merchant_succession_question: {
    weight: 'moderate',
    category: 'economic',
    description: 'Merchant who arrived at the succession question — who takes over the market knowledge that cannot be transferred automatically.',
    intent: 'none',
  },

  merchant_late_reckoning: {
    weight: 'moderate',
    category: 'economic',
    description: 'Merchant\'s late-life accounting — goods moved, markets navigated, bad years survived, knowledge built and leaving active use.',
    intent: 'none',
  },

  // ── ACCOUNTANT ARC ───────────────────────────────────────────────────────────

  accountant_number_knowledge: {
    weight: 'moderate',
    category: 'economic',
    description: 'Accountant who knows where the money is — structure, source, destination, and what the gap means about an enterprise.',
    intent: 'none',
  },

  accountant_shaded_truth: {
    weight: 'major',
    category: 'economic',
    description: 'Accountant who produced a technically accurate presentation designed to create a specific impression for the client.',
    intent: 'event',
    notes: 'Guards acc_shaded_truth_echo (late_life).',
  },

  accountant_held_accuracy: {
    weight: 'moderate',
    category: 'economic',
    description: 'Accountant who pushed back on shading request — filing is straightforwardly true, client accepted with contextual notes.',
    intent: 'none',
  },

  accountant_reported_fraud: {
    weight: 'major',
    category: 'economic',
    description: 'Accountant who reported discovered fraud to regulators — investigation ran two years, name permanently in documentation.',
    intent: 'none',
  },

  accountant_documented_fraud: {
    weight: 'major',
    category: 'economic',
    description: 'Accountant who documented fraud internally rather than reporting externally — partial recovery, partial concealment.',
    intent: 'event',
    notes: 'Guards acc_fraud_echo (late_life).',
  },

  accountant_quiet_years: {
    weight: 'moderate',
    category: 'economic',
    description: 'Accountant who lived the quiet years — accurate numbers, reliable rhythm, knowledge of money\'s movement across decades.',
    intent: 'none',
  },

  accountant_late_reckoning: {
    weight: 'moderate',
    category: 'economic',
    description: 'Accountant\'s late-life accounting — numbers accurate on balance, fraud decision made, knowledge of money leaving active use.',
    intent: 'none',
  },

}
