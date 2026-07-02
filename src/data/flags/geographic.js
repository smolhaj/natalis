/**
 * GEOGRAPHIC_FLAGS — geographic flags for the natalis flag system.
 * Auto-split from src/data/flags.js by scripts/split_flags.py
 */
export const GEOGRAPHIC_FLAGS = {

  emigrated: {
    weight: 'major',
    category: 'displacement',
    description: 'Character has left their country of origin and settled elsewhere.',
    intent: 'both',
    timestamped: true,
    notes: 'Has extensive year texture (yearsAbroad gates), integration arc, memory layer. Well covered.',
  },

  refugee: {
    weight: 'major',
    category: 'displacement',
    description: 'Character fled their country as a refugee, with that legal/identity status.',
    intent: 'both',
    notes: 'Has resettlement events and ribbon. No year texture for the decade after resettlement.',
  },

  displaced: {
    weight: 'major',
    category: 'displacement',
    description: 'Character was internally displaced — moved within their country by conflict or disaster.',
    intent: 'year_texture',
    notes: 'Clear orphan. Set in conflict/disaster events, never specifically followed up.',
  },

  climate_displaced: {
    weight: 'major',
    category: 'displacement',
    description: 'Character was displaced by climate change — drought, flooding, or uninhabitability.',
    intent: 'both',
    notes: 'Has passive drain and a residency status. Year texture path exists for the status check.',
  },

  displaced: {
    weight: 'major',
    category: 'displacement',
    description: 'Character was displaced from their home by war, disaster, or political violence.',
    intent: 'year_texture',
    notes: 'Set frequently in worldEvents.js (addFlags arrays) and conflict events. No dedicated year texture path beyond refugee/emigrant paths. Gap.',
  },

  refugee: {
    weight: 'major',
    category: 'displacement',
    description: 'Character fled as a refugee — the legal and psychological status of having no safe home.',
    intent: 'both',
    notes: 'Set in many events and worldEvents.js. Has resettlement events and ribbon. No year texture for years after resettlement. Gap.',
  },

  stayed_behind: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Character chose to stay when their peer group or generation emigrated.',
    intent: 'both',
    notes: 'events_stayed.js covers this arc. Year texture in buildYearTexture: the view from staying, the elsewhere of the people who left.',
  },

  witness_to_exodus: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Character lived through a mass departure from their community or country.',
    intent: 'event',
    notes: 'events_stayed.js and followthrough_6 cover this.',
  },

  internally_displaced: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Character was forced to move within their country\'s borders.',
    intent: 'year_texture',
    notes: 'Variant of displaced; both need year texture.',
  },

  white_emigrant_sa: {
    weight: 'moderate',
    category: 'migration',
    description: 'White South African who emigrated post-1994 — the "chicken run" to Australia, the UK, New Zealand, Canada — carrying a country that became too complicated to name simply.',
    intent: 'year_texture',
    notes: 'Set by sa_white_emigration.',
  },

  brain_drain_gone: {
    weight: 'minor',
    category: 'migration',
    description: 'Left home country to pursue professional opportunities abroad, contributing to brain drain — aware of the specific question of what is owed to the place left.',
    intent: 'none',
    notes: 'Set by nga_tech_generation (leave choice) and similar career-emigration events.',
  },

  bhola_survivor: {
    weight: 'moderate',
    category: 'world_event',
    description: 'Survived the 1970 Bhola cyclone — the deadliest tropical cyclone on record.',
    intent: 'event',
    notes: 'followthrough_7 has a liberation war connection event.',
  },

  liberation_war_witnessed: {
    weight: 'major',
    category: 'world_event',
    description: 'Witnessed the Bangladesh Liberation War of 1971 as a child or adult.',
    intent: 'event',
    notes: 'followthrough_5 has a reference. Needs more coverage.',
  },

  tangshan_witness: {
    weight: 'moderate',
    category: 'world_event',
    description: 'Survived or witnessed the 1976 Tangshan earthquake.',
    intent: 'event',
    notes: 'followthrough_7 has a midlife memory event.',
  },

  survived_bombardment: {
    weight: 'major',
    category: 'world_event',
    description: 'Character survived a sustained urban bombardment — Beirut, Sarajevo, Gaza, Aleppo.',
    intent: 'both',
    notes: 'Year texture path present (post-crisis). Crosscutting arc covers the arc itself.',
  },

  berlin_wall_era_lived: {
    weight: 'moderate',
    category: 'world_event',
    description: 'Character lived through the Berlin Wall period — division, surveillance, family separation.',
    intent: 'year_texture',
    notes: 'Set by world event. No character-level year texture or follow-through. Clear gap.',
  },

  survived_soviet_collapse: {
    weight: 'major',
    category: 'world_event',
    description: 'Character lived through the Soviet Union\'s collapse — savings wiped, institutions dissolved.',
    intent: 'year_texture',
    notes: 'Post-Soviet arc events exist. Year texture path should reference this specifically.',
  },

  russia_ukraine_exile: {
    weight: 'major',
    category: 'migration',
    description: 'Left Russia after 2022 — one of 700,000+ who went to Tbilisi, Yerevan, Riga, Istanbul — carrying the name of a country that has become complicated to say you are from.',
    intent: 'year_texture',
    notes: 'Set by ru_ukraine_invasion_2022 (leave choice) and ru_mobilization_2022.',
  },

  donbas_displaced: {
    weight: 'major',
    category: 'migration',
    description: 'Internally displaced from the Donbas conflict (2014-2022) — left Donetsk or Luhansk when the "people\'s republics" were declared, carrying what you could, moving west.',
    intent: 'year_texture',
    notes: 'Set by ukr_donbas_2014 (leave choice).',
  },

  ukraine_refugee_2022: {
    weight: 'major',
    category: 'migration',
    description: 'One of 8 million Ukrainians who became refugees after February 24, 2022 — the border, the children, the suitcase, the language that is suddenly your introduction in every room.',
    intent: 'year_texture',
    notes: 'Set by ukr_invasion_2022 (fled choice).',
  },

  dotcom_survivor: {
    weight: 'minor',
    category: 'world_event',
    description: 'Character survived the dotcom crash — financial or identity loss.',
    intent: 'none',
    notes: 'Texture flag from internet era events.',
  },

  aids_crisis_generation: {
    weight: 'major',
    category: 'world_event',
    description: 'Character lived through the AIDS crisis in the Western world — watching friends die, ACT UP era.',
    intent: 'year_texture',
    notes: 'Set by worldEvents.js (AIDS crisis world event, USA-gated) and events_country_arcs_2.js (USA AIDS watch, LGBTQ-gated). No character-level year texture follow-through. High priority gap for LGBTQ characters.',
  },

  aids_generation: {
    weight: 'major',
    category: 'world_event',
    description: 'Character lived through the AIDS epidemic — mass death in community, primarily sub-Saharan Africa.',
    intent: 'year_texture',
    notes: 'Set by worldEvents.js (AIDS epidemic world events) and events.js. Broader than aids_crisis_generation. No year texture path. High priority gap.',
  },

  survived_aids_crisis: {
    weight: 'major',
    category: 'world_event',
    description: 'Character personally survived the AIDS crisis — their own diagnosis, survival against the odds.',
    intent: 'both',
    notes: 'Set in events_society.js. Distinct from aids_generation (observer) — this is personal survival. No year texture or midlife echo. High priority gap.',
  },

  genocide_family_memory: {
    weight: 'major',
    category: 'world_event',
    description: 'Character\'s family survived a genocide — the silence and shape of that in childhood.',
    intent: 'event',
    notes: 'events_family_silence.js covers the childhood expression of this.',
  },

  disappeared_family_memory: {
    weight: 'major',
    category: 'world_event',
    description: 'A family member was disappeared by state authorities — the specific absence.',
    intent: 'event',
    notes: 'events_family_silence.js covers the childhood framing.',
  },

  holocaust_family_memory: {
    weight: 'major',
    category: 'world_event',
    description: 'Family survived the Holocaust — the things that were never said at dinner.',
    intent: 'event',
    notes: 'events_family_silence.js covers this. Generational trauma mechanic active.',
  },

  partition_family_memory: {
    weight: 'major',
    category: 'world_event',
    description: 'Family was displaced by the Partition of India — the street name in a city they cannot go back to.',
    intent: 'event',
    notes: 'events_family_silence.js covers this.',
  },

  great_leap_family_memory: {
    weight: 'major',
    category: 'world_event',
    description: 'Family starved or survived the Great Leap Forward famine — never named at home.',
    intent: 'event',
    notes: 'events_family_silence.js covers this.',
  },

  khmer_rouge_family_memory: {
    weight: 'major',
    category: 'world_event',
    description: 'Family survived the Khmer Rouge — survivors who became the missing generation.',
    intent: 'event',
    notes: 'events_family_silence.js covers this.',
  },

  gulag_family_memory: {
    weight: 'major',
    category: 'world_event',
    description: 'Family member was sent to the Gulag — the thing that cannot be said outside the apartment.',
    intent: 'event',
    notes: 'events_family_silence.js covers this. Seeded by deriveGenerationalFlags() for post-Soviet countries born 1930-55.',
  },

  cultural_revolution_family: {
    weight: 'major',
    category: 'world_event',
    description: 'Family was targeted during China\'s Cultural Revolution — sent down, denounced, destroyed.',
    intent: 'event',
    notes: 'events_family_silence.js covers this. Also events_country_arcs_2.js has character-level events.',
  },

  biafra_family_memory: {
    weight: 'major',
    category: 'world_event',
    description: 'Family lived through the Biafra war — the hunger, the silence after.',
    intent: 'event',
    notes: 'events_family_silence.js covers this.',
  },

  ofw_worker: {
    weight: 'major',
    category: 'migration',
    description: 'Character has left the Philippines as an Overseas Filipino Worker.',
    intent: 'both',
    notes: 'Set by ofw_poea_signing. Gates complication events (contract violation, Sunday calls, balikbayan box, remittance ritual). Downstream: ofw_late_reckoning in late_life, ofw_cycle_repeating when children reach working age.',
  },

  ofw_gulf: {
    weight: 'moderate',
    category: 'migration',
    description: 'OFW character is working in a Gulf country (Saudi Arabia, UAE, Kuwait, Qatar).',
    intent: 'event',
    notes: 'Gates ofw_arrival_gulf texture event. Intersects with cc_domestic_ofw_gulf in events_crosscutting.js which provides inside-the-house texture. mem.ofwDestination === "gulf" used for dynamic text in multi-destination events.',
  },

  ofw_hongkong: {
    weight: 'moderate',
    category: 'migration',
    description: 'OFW character is working in Hong Kong or Singapore.',
    intent: 'event',
    notes: 'Gates ofw_arrival_hongkong event (Victoria Park Sunday texture). HK OFWs have legally-mandated rest days — events reflect the difference from Gulf kafala conditions.',
  },

  ofw_italy: {
    weight: 'moderate',
    category: 'migration',
    description: 'OFW character is working in Italy or another EU country.',
    intent: 'event',
    notes: 'Gates ofw_arrival_italy event (care work texture, Filipino community center).',
  },

  ofw_returned: {
    weight: 'major',
    category: 'migration',
    description: 'OFW character has returned to the Philippines permanently.',
    intent: 'both',
    notes: 'Gates ofw_late_reckoning (65+), ofw_cost_accounting (young_adult), ofw_cycle_repeating (midlife, when own child considers leaving). Also gates ribbon the_ofw_returned.',
  },

  ofw_runaway: {
    weight: 'moderate',
    category: 'migration',
    description: 'OFW worker fled an employer to find a new placement without formal transfer.',
    intent: 'event',
    notes: 'Set by ofw_contract_violation (find new employer secretly branch). Illegal under Gulf kafala; legal but risky in HK/EU. Follow-through not yet written.',
  },

  decennie_noire_generation: {
    weight: 'major',
    category: 'world_event',
    description: 'Character lived through the Algerian Black Decade (1992–2002) — the cancelled election, the armed insurgency, the massacres whose attribution was never settled.',
    intent: 'both',
    notes: 'Set by world event algeria_black_decade_begins. Follow-throughs: alg_decade_silence, alg_telling_children, alg_late_reckoning.',
  },

  algeria_exile: {
    weight: 'major',
    category: 'displacement',
    description: 'Character fled Algeria during the Black Decade and lived in exile, most commonly in France.',
    intent: 'both',
    notes: 'Set by alg_journalist_target (leave path) and alg_the_list (leave path). Follow-through: alg_exile_return.',
  },

  algeria_returned: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Character who fled Algeria during the Black Decade chose to return after violence subsided.',
    intent: 'event',
    notes: 'Set by alg_exile_return (return choice). Ribbon: the_exile_return.',
  },

  ofw_cycle_witness: {
    weight: 'minor',
    category: 'migration',
    description: 'OFW who returned has now watched their own child begin the same migration cycle.',
    intent: 'event',
    notes: 'Set by ofw_cycle_repeating. Completes the generational arc of the OFW system.',
  },

  id98_emigrated: {
    weight: 'major',
    category: 'migration',
    description: 'Chinese-Indonesian character emigrated after the 1998 riots — to Singapore, Australia, or the United States.',
    intent: 'both',
    notes: 'Set by id98_aftermath_rebuild (emigrated path). Also sets emigrated flag.',
  },

  id_transmigration_settler: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Participated in Suharto\'s transmigration program — Javanese resettled to Kalimantan, Sulawesi, or Papua; 6 million moved 1965–1990.',
    intent: 'both',
    notes: 'Set by id_transmigration (Javanese/Sundanese ethnicity gate).',
  },

  kurd_village_evacuated: {
    weight: 'major',
    category: 'displacement',
    description: 'Kurdish character\'s village in southeast Turkey was forcibly evacuated and burned by the military during the 1990s security operations.',
    intent: 'both',
    notes: 'Set by kurd_tr_village_evacuation. Follow-through: kurd_village_midlife_echo. Ribbon: the_stateless_nation.',
  },

  kurd_europe_diaspora: {
    weight: 'moderate',
    category: 'migration',
    description: 'Kurdish character lives in European diaspora — typically Germany, Sweden, or the Netherlands — carrying unresolved questions of belonging.',
    intent: 'both',
    notes: 'Set when village evacuation leads abroad. Follow-through: kurd_diaspora_question.',
  },

  kurd_returned_home: {
    weight: 'moderate',
    category: 'migration',
    description: 'Kurdish diaspora character returned to Turkey/Kurdistan, finding the country of a relative rather than their own.',
    intent: 'event',
    notes: 'Set by kurd_diaspora_question (go back path). Carries dissonance — Germany made you German.',
  },

  haitian_diaspora: {
    weight: 'major',
    category: 'migration',
    description: 'Haitian character emigrated to Brooklyn, Miami, or Montreal — carrying the obligation to send money home and the specific diaspora identity of someone who left.',
    intent: 'both',
    notes: 'Set by hai_diaspora_decision. Follow-throughs: hai_diaspora_earthquake_call, hai_diaspora_late_reckoning. Ribbon: the_dyaspora.',
  },

  col_desplazado: {
    weight: 'major',
    category: 'displacement',
    description: 'Internally displaced by the Colombian conflict — arrived in a city periphery from a contested rural territory, part of the 7 million who were moved by armed actors.',
    intent: 'year_texture',
    notes: 'Set by col_la_violencia_rural (left choice), col_farc_question (moved choice), col_paramilitares (leave choice).',
  },

  col_falsos_positivos_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the falsos positivos scandal — the systematic killing of civilians by Colombian army units presented as combat kills (2002–2008). Knows the Soacha twenty-two.',
    intent: 'year_texture',
    notes: 'Set by col_dep_false_positives. Triggers col_dep_falsos_echo follow-through.',
  },

  col_medellin_transformation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed Medellín\'s transformation from the world\'s most dangerous city to an urban innovation story — the cable cars, the murder rate\'s fall, the complicated truth behind both.',
    intent: 'year_texture',
    notes: 'Set by col_dep_medellin_transforms.',
  },

  col_coca_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Grew up in a Colombian rural area where coca was the only viable cash crop — the buyer\'s scales, the fumigation planes, the substitution check that arrived late if it arrived.',
    intent: 'event',
    notes: 'Set by col_dep_coca_farmer. Follow-through: col_dep_coca_accord_echo (after 2017 peace accord).',
  },

  col_afrocolombiano_choco: {
    weight: 'major',
    category: 'identity',
    description: 'Afro-Colombian from the Chocó / Pacific coast — three hundred years of settlement, paradox of biodiversity and poverty, displacement from Buenaventura\'s bajas.',
    intent: 'year_texture',
    notes: 'Set by col_dep_choco_life, col_dep_choco_displaced.',
  },

  col_urban_settler: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Built a life in a city periphery neighbourhood as a desplazado — organised for water and electricity, becoming part of the city through the specific work of staying.',
    intent: 'none',
    notes: 'Set by col_dep_desplazado_city (build choice). Terminal flag.',
  },

  col_cafetero_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Grew up in a Colombian coffee farming family — the harvest in October, the price set in New York, the school uniform paid or delayed based on the quintal price.',
    intent: 'year_texture',
    notes: 'Set by col_dep_cafetero.',
  },

  col_jep_witness: {
    weight: 'moderate',
    category: 'historical',
    description: 'Testified before the Jurisdicción Especial para la Paz — chose to contribute to the official truth record of the Colombian conflict.',
    intent: 'none',
    notes: 'Set by col_dep_jep (testify choice). Terminal flag.',
  },

  irn_diaspora_generation: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Left Iran — Turkey first, then Canada/Germany/UK — part of the 150,000/year brain drain that the IMF calls the highest in the world.',
    intent: 'year_texture',
    notes: 'Set by irn_brain_drain (leave choice). Also sets emigrated.',
  },

  bedouin_settled: {
    weight: 'major',
    category: 'displacement',
    description: 'Underwent the government-incentivised transition from nomadic to settled life — a concrete house, piped water, a registered plot.',
    intent: 'year_texture',
    notes: 'Set by bdo_settlement_government (both choices). Powers follow-through events.',
  },

  tamil_diaspora: {
    weight: 'major',
    category: 'migration',
    description: 'Tamil Sri Lankan character emigrated during or after the civil war — to Toronto, London, or Melbourne — carrying the war and the diaspora obligation.',
    intent: 'both',
    notes: 'Set by slk_diaspora_decision. Follow-through: slk_diaspora_war_end. Ribbon: the_eelam_generation.',
  },

  internally_displaced: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Character was internally displaced within their own country — fled north from Colombo in July 1983, or forced from their village by conflict.',
    intent: 'event',
    notes: 'Set by slk_black_july (fled_north path).',
  },

  moroccan_diaspora: {
    weight: 'moderate',
    category: 'migration',
    description: 'Moroccan character emigrated to France, Spain, or elsewhere — carrying the Darija of someone who left, and the obligation to send money home.',
    intent: 'both',
    notes: 'Set by mor_strait_decision (crossed path). Follow-through: mor_diaspora_late.',
  },

  // ── MOROCCO DEPTH FLAGS ───────────────────────────────────────────────────
  mor_1971_coup_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Moroccan character who lived through the 1971 Skhirat coup attempt and 1972 F-5 attack — the years when the monarchy could have ended, and the specific political atmosphere of a king who survived twice.',
    intent: 'year_texture',
    notes: 'Set by mor_skhirat_coup and mor_green_march_1975. Year texture: the texture of living under a king who survives assassination.',
  },

  sahrawi_identity: {
    weight: 'major',
    category: 'identity',
    description: 'Sahrawi character — from Western Sahara, born or raised in the Tindouf refugee camps, carrying the homeland as a story rather than a memory.',
    intent: 'year_texture',
    notes: 'Set by mor_sahrawi_tindouf. Year texture: the specific weight of displacement transmitted across generations; a homeland that is a map and a name and not a place.',
  },

  mor_casablanca_2003_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Moroccan character who lived through the May 2003 Casablanca bombings — the before/after of how Morocco understood its own urban poor and its relationship with political Islam.',
    intent: 'year_texture',
    notes: 'Set by mor_casa_bombings_2003. Year texture: the specific atmosphere of a country watching its own cities.',
  },

  mor_rif_movement_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Moroccan character who lived through the 2016–17 Hirak Rif movement — from Mouhcine Fikri\'s death to Nasser Zefzafi\'s twenty-year sentence.',
    intent: 'event',
    notes: 'Set by mor_hirak_rif. Follow-through: mor_rif_echo (checks this flag).',
  },

  rohingya_displacement: {
    weight: 'major',
    category: 'displacement',
    description: 'Rohingya character was displaced in the August 2017 military clearance operations — villages burned, walking to the river, crossing to Bangladesh.',
    intent: 'both',
    notes: 'Set by roh_village_burning. Follow-through: roh_crossing → roh_coxs_bazar. Ribbon: the_clearance_operation.',
  },

  rohingya_coxs_bazar: {
    weight: 'major',
    category: 'displacement',
    description: 'Rohingya character lives in Cox\'s Bazar — the world\'s largest refugee camp, 1 million people, no legal status in Bangladesh.',
    intent: 'both',
    notes: 'Set by roh_crossing. Follow-throughs: roh_coxs_bazar_years, roh_resettlement_interview.',
  },

  rohingya_resettled: {
    weight: 'major',
    category: 'migration',
    description: 'Rohingya character was resettled in a third country — the first passport, citizenship, children who have never been stateless.',
    intent: 'both',
    notes: 'Set by roh_resettlement_arrives. Follow-through: roh_diaspora_late. Ribbon: the_first_passport.',
  },

  stateless_childhood: {
    weight: 'major',
    category: 'displacement',
    description: 'Character grew up without a registered birth — enrolled in school in pencil, existing in the community but not in the official record.',
    intent: 'both',
    notes: 'Set by doc_no_birth_certificate. Follow-throughs: doc_first_passport, doc_stateless_marriage.',
  },

  stateless_navigator: {
    weight: 'major',
    category: 'displacement',
    description: 'Character has learned to read the specific quality of the pause at a border checkpoint — this pause means it might work, that pause means it won\'t.',
    intent: 'both',
    notes: 'Set by doc_stateless_crossing. Follow-through: doc_first_passport.',
  },

  first_passport_received: {
    weight: 'major',
    category: 'displacement',
    description: 'Character received their first passport — a country saying they are theirs. They sat with it for longer than the object probably merited.',
    intent: 'event',
    notes: 'Set by doc_first_passport. Terminal event in the statelessness arc.',
  },

  asharshylyk_survivor: {
    weight: 'major',
    category: 'disaster',
    description: 'Kazakh character survived the Asharshylyk — the 1931-33 famine that killed one in three Kazakhs during forced collectivisation.',
    intent: 'both',
    notes: 'Set by cas_kazakh_famine. Specific flag for the Kazakh famine distinct from other famine_survivor uses.',
  },

  aral_sea_witness: {
    weight: 'moderate',
    category: 'environment',
    description: 'Character watched the Aral Sea disappear — the ship hulls in the sand where the water was, the sea they knew only as a story from their grandfather.',
    intent: 'event',
    notes: 'Set by cas_aral_sea. Educational payload: cotton monoculture as environmental destruction.',
  },

  post_soviet_brain_drain: {
    weight: 'moderate',
    category: 'migration',
    description: 'Character witnessed the departure of Soviet-era technical expertise — engineers, doctors, teachers — who left for Russia or elsewhere after independence.',
    intent: 'none',
    notes: 'Set by taj_russian_departure. The absence that remained after the skilled left.',
  },

  tajik_civil_war_generation: {
    weight: 'major',
    category: 'conflict',
    description: 'Character lived through the Tajik Civil War 1992–97 — the worst post-Soviet conflict, 50,000 dead, fought along regional and factional lines.',
    intent: 'year_texture',
    notes: 'Set by taj_civil_war_1992. Follow-through: taj_peace_1997 gated on this flag.',
  },

  internal_displacement: {
    weight: 'moderate',
    category: 'migration',
    description: 'Character was displaced within their own country by conflict or disaster — not a refugee, but not at home either.',
    intent: 'none',
    notes: 'Set by taj_civil_war_1992 (flee branch). General flag applicable across conflict contexts.',
  },

  tajik_stayed_home: {
    weight: 'minor',
    category: 'migration',
    description: 'Character stayed when others left for Russia — the village with the demographic gap, the quietness of a particular kind.',
    intent: 'none',
    notes: 'Set by taj_remittance_economy (independent branch).',
  },

  sen_morocco_transit: {
    weight: 'major',
    category: 'immigration',
    description: 'Took the overland route north from West Africa to Morocco, transiting through Mali and Algeria, attempting to reach the Melilla or Ceuta fence.',
    intent: 'event',
    notes: 'Set by sen_morocco_route. Follow-through: sen_nador_forest → sen_melilla_fence chain.',
  },

  sen_melilla_attempt: {
    weight: 'major',
    category: 'immigration',
    description: 'Participated in a mass fence-climbing attempt at Melilla — the tactic of using overwhelming numbers to cross the 6-metre steel fence into Spanish territory.',
    intent: 'event',
    notes: 'Set by sen_nador_forest. Follow-through: sen_melilla_fence (cross vs. pushed back).',
  },

  sen_made_europe: {
    weight: 'major',
    category: 'immigration',
    description: 'Made it over the Melilla fence into Spain — arrived in European territory after the fence attempt, claiming asylum rights.',
    intent: 'none',
    notes: 'Set by sen_melilla_fence (success choice). Character is now asylum_seeker in Spain.',
  },

  sen_fence_pushback: {
    weight: 'major',
    category: 'immigration',
    description: 'Was knocked down at the Melilla fence and pushed back by Moroccan guards — the illegal collective expulsion practice that the European Court of Human Rights later ruled violated Article 4 of Protocol 4.',
    intent: 'event',
    notes: 'Set by sen_melilla_fence (pushback choice). Follow-through: sen_fence_pushback_echo (ECHR ruling 2020).',
  },

  uyghur_diaspora: {
    weight: 'major',
    category: 'displacement',
    description: 'Uyghur character fled to Kazakhstan, Turkey, or a third country before the invitation became a summons — phone number changed, told no one who might be asked.',
    intent: 'both',
    notes: 'Set by uyg_camp_era (fled branch). Follow-through: uyg_diaspora_silence — the testimony decision when family is still inside.',
  },

  maria_survivor: {
    weight: 'major',
    category: 'disaster',
    description: 'Character survived Hurricane Maria in 2017 — the sixteen days without power becoming weeks, the government reporting 64 deaths while 2,975 people died.',
    intent: 'both',
    notes: 'Set by pr_maria_2017. The gap between the official count and the actual count is educational payload. Follow-through in diaspora events.',
  },

  ken_crossed_nairobi: {
    weight: 'minor',
    category: 'conflict',
    description: 'Crossed Nairobi during the 2007–08 post-election violence, navigating roadblocks listening for names and accents.',
    intent: 'none',
    notes: 'Set by ken_post_election_2007 (crossed branch). No follow-through required — the experience is self-contained.',
  },

  ken_dep_matatu_generation: {
    weight: 'moderate',
    category: 'urban',
    description: 'Nairobi matatu commuter — knows the routes, the touts, the shortcut logic, the graffiti that marks each route\'s personality. The daily calculus of getting across the city.',
    intent: 'year_texture',
    notes: 'Set by ken_dep_matatu.',
  },

  ken_dep_westgate_generation: {
    weight: 'major',
    category: 'conflict',
    description: 'Nairobi resident during the Westgate mall attack, September 2013 — the Al-Shabaab attack on a Saturday shopping crowd, 67 killed over four days. The city was different after.',
    intent: 'year_texture',
    notes: 'Set by ken_dep_westgate.',
  },

  ken_dep_runner_generation: {
    weight: 'moderate',
    category: 'sport',
    description: 'Grew up in the Rift Valley running culture — altitude, cattle-herding fitness, the school races, the neighbours who came back with Olympic medals. Running as a possible path.',
    intent: 'year_texture',
    notes: 'Set by ken_dep_runner (both choices).',
  },

  maasai_land_displaced: {
    weight: 'major',
    category: 'displacement',
    description: 'Displaced from ancestral Maasai grazing land by wildlife conservation boundaries — the experience of the land becoming "protected" from the people who lived on it.',
    intent: 'year_texture',
    notes: 'Set by ken_maasai_land_displacement (both branches). Year texture: the animals inside worth more than the people outside.',
  },

  ph_dep_ofw_family: {
    weight: 'major',
    category: 'migration',
    description: 'Filipino OFW family — either the one who left or the one who waited. The balikbayan box, the monthly remittance, the missed years that arrive by phone call.',
    intent: 'year_texture',
    notes: 'Set by ph_dep_ofw_departure (both choices).',
  },

  ph_dep_moro_identity: {
    weight: 'major',
    category: 'identity',
    description: 'Muslim Filipino (Moro) identity in Mindanao — navigating the checkpoint, the conflict, the name that explains everything to the soldier who reads it.',
    intent: 'year_texture',
    notes: 'Set by ph_dep_moro_identity (both choices).',
  },

  ph_dep_bpo_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Filipino BPO/call center generation — the night shift, the adopted accent, the salary that beats teaching, the sleep cycle that does not.',
    intent: 'year_texture',
    notes: 'Set by ph_dep_bpo (both choices).',
  },

  ph_dep_seaman_family: {
    weight: 'moderate',
    category: 'migration',
    description: 'Filipino seafarer or family of seafarer — nine-month contracts, Panama-flag ships, remittances from every port, children who grow between voyages.',
    intent: 'year_texture',
    notes: 'Set by ph_dep_seaman (leave choice).',
  },

  ph_dep_ondoy_survivor: {
    weight: 'major',
    category: 'disaster',
    description: 'Survivor of Tropical Storm Ondoy (2009) — the rooftop, the Marikina overflow, the mud smell in the walls for months, the elevation of your house now known exactly.',
    intent: 'year_texture',
    notes: 'Set by ph_dep_ondoy_2009 (both choices).',
  },

  maasai_nairobi: {
    weight: 'major',
    category: 'migration',
    description: 'Left pastoral Maasai life for Nairobi — the city that does not know your age-grade or lineage, where you start over.',
    intent: 'year_texture',
    notes: 'Set by ken_maasai_nairobi_choice (Nairobi branch). Year texture: urban Maasai identity, caught between worlds.',
  },

  eth_red_terror_survived: {
    weight: 'major',
    category: 'conflict',
    description: 'Survived the Derg Red Terror 1977–78 by staying invisible — watching neighbours disappear, learning the calculus of silence under a regime that killed on lists.',
    intent: 'event',
    notes: 'Set by eth_red_terror_1977 (survived branch). Follow-through: eth_red_terror_echo (late_life, when asked about it as history).',
  },

  eth_arbegnoch_family: {
    weight: 'moderate',
    category: 'conflict',
    description: 'Grew up in a family that joined the Arbegnoch patriots during the Italian occupation 1935–41 — the guerrilla resistance from the countryside while Haile Selassie was in exile in Bath.',
    intent: 'none',
    notes: 'Set by eth_italian_invasion_1935 (resistance branch). Terminal flag — the identity marker needs no downstream event.',
  },

  gukurahundi_generation: {
    weight: 'major',
    category: 'conflict',
    description: 'Ndebele child or adolescent in Matabeleland during the Gukurahundi massacres 1983–87 — twenty thousand killed by the North Korean-trained Fifth Brigade, the silence enforced for decades.',
    intent: 'event',
    notes: 'Set by zim_gukurahundi in events_zimbabwe.js. Follow-through: zim_gukurahundi_late (late_life, when the word enters the historical record).',
  },

  zim_diaspora: {
    weight: 'minor',
    category: 'immigration',
    description: 'Left Zimbabwe for the diaspora (South Africa, UK, Botswana) during the economic collapse — part of the three million who left.',
    intent: 'both',
    notes: 'Set by zim_exodus_south. Follow-through: zim_johannesburg_arrival, zim_xenophobic_2008, zim_diaspora_decade, zim_diaspora_late. Year texture in gameEngine.',
  },

  zim_skilled_displaced: {
    weight: 'moderate',
    category: 'immigration',
    description: 'Skilled Zimbabwean (nurse, teacher, engineer) working below qualification in the South African diaspora — credentials not recognised, documentation irregular.',
    intent: 'year_texture',
    notes: 'Set by zim_johannesburg_arrival. Year texture: working below qualification, the gap between training and daily work.',
  },

  zim_diaspora_return: {
    weight: 'moderate',
    category: 'immigration',
    description: 'Returned to Zimbabwe after years in the diaspora — chose to go back rather than remain in South Africa in late life.',
    intent: 'none',
    notes: 'Set by zim_diaspora_late (return choice).',
  },

  eu_emigrant_romania: {
    weight: 'moderate',
    category: 'migration',
    description: 'Romanian who emigrated to Western Europe post-EU accession (2007) — one of the 3-4 million who left for Spain, Italy, the UK, Germany.',
    intent: 'year_texture',
    notes: 'Set by rom_eu_emigration.',
  },

  dprk_defected: {
    weight: 'major',
    category: 'displacement',
    description: 'Defected from North Korea — the river at 3am, the months of dangerous transit, arriving in a country that is technically yours',
    intent: 'both',
    notes: 'Set by dprk_defection_calculation choice cross. Follow-through: dprk_hanawon_complete.',
  },

  bel_exile: {
    weight: 'major',
    category: 'displacement',
    description: 'Left Belarus after 2020 — Warsaw, Vilnius; the Belarusian expat community large enough to have its own cafes and funerals',
    intent: 'both',
    notes: 'Set by bel_crackdown choice left. Follow-through: bel_exile_life.',
  },

  azr_karabakh_idp: {
    weight: 'major',
    category: 'displacement',
    description: 'Internally displaced from Nagorno-Karabakh or surrounding districts 1993-2020 — railway carriage, unfinished building, the deed',
    intent: 'both',
    notes: 'Set by azr_karabakh_idp event. Follow-through: azr_karabakh_return_2023, ft22_azr_idp_return.',
  },

  black_summer_generation: {
    weight: 'major',
    category: 'climate',
    description: 'Lived through the 2019-20 Australian Black Summer megafires — 18.6 million hectares, red sky over Sydney, the abstract becoming undeniable',
    intent: 'year_texture',
    notes: 'Set by aus_black_summer_2020.',
  },

  gulf_coast_displaced: {
    weight: 'major',
    category: 'displacement',
    description: 'Directly displaced by Hurricane Katrina — in New Orleans, with people there, the specific waiting to know whether those you love survived.',
    intent: 'year_texture',
    notes: 'Set by usa_hurricane_katrina_2005 (directly affected choice).',
  },

  ghana_stayed_generation: {
    weight: 'moderate',
    category: 'migration',
    description: 'Stayed in Ghana during the 1980s–2000s brain drain, watching the educated class empty out, holding the fort.',
    intent: 'none',
    notes: 'Set by gha_brain_drain_witness (stayed choice).',
  },

  ci_abidjan_generation: {
    weight: 'minor',
    category: 'place',
    description: 'Lived and worked in Abidjan — the lagoon city, Plateau business district, Treichville markets, gbaka minibuses, the city that was West Africa\'s showcase',
    intent: 'year_texture',
    notes: 'Set by ci_abidjan_life. Year texture: the bridge, the morning smell, the code.',
  },

  ci_abidjan_lagoon_generation: {
    weight: 'moderate',
    category: 'place',
    description: 'Knows Abidjan through the Ébrié Lagoon — the pinasse ferries, the dawn pirogue fishermen, the market at Koumassi, the water older than the city',
    intent: 'year_texture',
    notes: 'Set by ci_dep_lagoon.',
  },

  cmr_douala_generation: {
    weight: 'minor',
    category: 'place',
    description: 'Lived and worked in Douala — the commercial capital, not the political capital; the Wouri estuary, Akwa, the market, Pidgin English as the common tongue',
    intent: 'year_texture',
    notes: 'Set by cmr_douala_life. Year texture: the traffic, the translations held simultaneously.',
  },

  cmr_yaounde_generation: {
    weight: 'minor',
    category: 'place',
    description: 'Came of age in Yaoundé — the political capital on the hill, the Beti social calendar, the University graduates waiting for government jobs that arrive slowly',
    intent: 'year_texture',
    notes: 'Set by cmr_dep_yaounde.',
  },

  laos_vientiane_generation: {
    weight: 'minor',
    category: 'place',
    description: 'Came of age in Vientiane — the quietest capital in Southeast Asia, the French colonial boulevard along the Mekong, the That Luang stupa, the evening light on the Thai shore across the river',
    intent: 'year_texture',
    notes: 'Set by laos_dep_vientiane.',
  },

  nga_delta_community: {
    weight: 'major',
    category: 'environmental',
    description: 'Part of a Niger Delta community living with oil extraction — the gas flares, the spills, the contaminated creeks, the decades-long remediation deficit.',
    intent: 'both',
    notes: 'Set by nga_niger_delta for Ijaw and Delta-region characters.',
  },

  nga_dep_nepa_generation: {
    weight: 'moderate', category: 'infrastructure',
    description: 'Grew up with NEPA/PHCN power cuts as a fact of life — candles, kerosene lamps, the generator economy, "there is light" as an announcement.',
    intent: 'year_texture', notes: 'Set by nga_dep_nepa.',
  },

  nga_dep_exam_passed: {
    weight: 'minor', category: 'education',
    description: 'Passed WAEC/JAMB on the first attempt — the examination that gates university admission in Nigeria.',
    intent: 'none', notes: 'Set by nga_dep_waec_jamb (good result choice).',
  },

  nga_dep_lagos_generation: {
    weight: 'moderate', category: 'urban',
    description: 'Formed by Lagos — the go-slow, the danfo, the perpetual negotiation of a megacity with more people than its infrastructure was built for.',
    intent: 'year_texture', notes: 'Set by nga_dep_go_slow.',
  },

  nga_dep_nollywood_generation: {
    weight: 'minor', category: 'cultural',
    description: 'Grew up with Nollywood VCDs — the industry that became the world\'s third-largest film output built without state support.',
    intent: 'year_texture', notes: 'Set by nga_dep_nollywood.',
  },

  nga_dep_endsars_generation: {
    weight: 'major', category: 'conflict',
    description: 'Was shaped by the #EndSARS protests of October 2020 — the Lekki toll gate shooting and what it revealed about the Nigerian state.',
    intent: 'year_texture', notes: 'Set by nga_dep_endsars.',
  },

  nga_dep_japa_generation: {
    weight: 'major', category: 'immigration',
    description: 'Part of the Japa wave — the mass emigration of educated young Nigerians in the 2020s.',
    intent: 'year_texture', notes: 'Set by nga_dep_japa (leave choice).',
  },

  nga_diaspora: {
    weight: 'major', category: 'immigration',
    description: 'Nigerian living abroad — carries Nigeria in remittances, in group chats, in the specific guilt and pride of the diaspora.',
    intent: 'year_texture', notes: 'Set by nga_dep_japa (leave choice) and tech emigration events.',
  },

  nga_dep_stayed_generation: {
    weight: 'moderate', category: 'resilience',
    description: 'Chose to stay in Nigeria when the Japa wave offered an exit — the generation that held on.',
    intent: 'year_texture', notes: 'Set by nga_dep_japa (stay choice).',
  },

  nga_dep_pentecostal_generation: {
    weight: 'moderate', category: 'religious',
    description: 'Formed by Nigerian Pentecostal church culture — megachurch as infrastructure, the prayer vocabulary, the testimony.',
    intent: 'year_texture', notes: 'Set by nga_dep_pentecostal.',
  },

  bng_dhaka_generation: {
    weight: 'minor',
    category: 'urban',
    description: 'Navigated Dhaka as one of the world\'s densest megacities — the rickshaws, the July floods, the city that expanded faster than its infrastructure.',
    intent: 'year_texture',
    notes: 'Set by bng_dhaka_city.',
  },

  bng_malaysia_worker: {
    weight: 'major',
    category: 'immigration',
    description: 'Bangladeshi contract worker in Malaysia — paid a dalal fee 3-5x the official rate, tied work permit, employer-held passport, dormitory of 18, sending 800 ringgit home each month.',
    intent: 'both',
    notes: 'Set by bng_malaysia_decision (choice 1). Follow-throughs: bng_malaysia_life, bng_malaysia_return. Year texture: the remittance calendar, the passport situation.',
  },

  nepal_royal_massacre_generation: {
    weight: 'moderate',
    category: 'world_event',
    description: 'Witnessed the 2001 royal massacre — Crown Prince Dipendra kills the royal family, dies as king, the 240-year Shah dynasty fractures',
    intent: 'year_texture',
    notes: 'Set by nep_royal_massacre_2001.',
  },

  nepal_gulf_worker: {
    weight: 'major',
    category: 'displacement',
    description: 'Part of Nepal\'s Gulf labor migration wave — the kafala system, the remittance economy, the one-way ticket',
    intent: 'year_texture',
    notes: 'Set by nep_gulf_migration.',
  },

  nepal_youth_exodus_generation: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Part of the generation that left Nepal or watched 1,500 young people a day leave — the village empty of anyone their age',
    intent: 'year_texture',
    notes: 'Set by nep_youth_exodus.',
  },

  nep_dep_gurkha_generation: {
    weight: 'major',
    category: 'military',
    description: 'Selected for the British or Indian Army Gurkha brigades — the hill run, the doko selection, the departure from the village.',
    intent: 'event',
    notes: 'Follow-through: nep_dep_gurkha_return in late_life.',
  },

  nep_dep_dalit_generation: {
    weight: 'major',
    category: 'caste',
    description: 'Experienced Dalit caste discrimination in Nepal — barred from shared water sources, temples, tea houses under the Muluki Ain tradition.',
    intent: 'year_texture',
    notes: 'Set by nep_dep_dalit_water. Intersects with experienced_caste_discrimination.',
  },

  nep_dep_kamaiya_generation: {
    weight: 'major',
    category: 'labor',
    description: 'Freed Tharu bonded laborer (Kamaiya system, abolished 2000) — the debt that accumulated faster than labor could repay it.',
    intent: 'year_texture',
    notes: 'Set by nep_dep_kamaiya.',
  },

  nep_dep_porter_generation: {
    weight: 'moderate',
    category: 'labor',
    description: 'Worked as mountain porter or guide on Nepal trekking routes — carrying loads by tumpline, the altitude as occupation.',
    intent: 'year_texture',
    notes: 'Set by nep_dep_porter.',
  },

  nep_dep_remittance_generation: {
    weight: 'moderate',
    category: 'family',
    description: 'Grew up in a remittance household — father in Qatar or Malaysia, monthly transfer as economic structure of childhood.',
    intent: 'event',
    notes: 'Follow-through: nep_dep_remittance_adult (the choice to go or stay).',
  },

  nep_dep_kumari_witness: {
    weight: 'moderate',
    category: 'religious',
    description: 'Was or knew the Kumari Devi — the living goddess selected from Newar Shakya community, the ritualized childhood, the difficult return.',
    intent: 'year_texture',
    notes: 'Set by nep_dep_kumari.',
  },

  nep_dep_pashupatinath: {
    weight: 'minor',
    category: 'cultural',
    description: 'Grew up with Pashupatinath cremations as part of ordinary life — the Bagmati ghats, death visible and continuous.',
    intent: 'none',
    notes: 'Terminal flag. Set by nep_dep_pashupatinath.',
  },

  south_vietnamese_diaspora: {
    weight: 'major',
    category: 'displacement',
    description: 'Left South Vietnam after the fall of Saigon — by boat, by camp, by resettlement. Carries both the country you left and the country that did not exist anymore when you left.',
    intent: 'year_texture',
    notes: 'Set by vn_the_boat_decision (boat choice).',
  },

  sdn_khartoum_displaced: {
    weight: 'major',
    category: 'displacement',
    description: 'Fled Khartoum during the 2023 civil war — left with what could be carried, city abandoned to the fighting between SAF and RSF',
    intent: 'event',
    notes: 'Set by sdn_civil_war_2023 (flee choice). Follow-through: ft25_khartoum_displaced_settled.',
  },

  jordanian_syrian_refugee_host: {
    weight: 'major',
    category: 'world_event',
    description: 'Witnessed Jordan absorbing 1.3 million Syrian refugees 2012-15 — 10% of the population, Zaatari, double-shift schools, water stress',
    intent: 'year_texture',
    notes: 'Set by jor_syrian_refugees_2012.',
  },

  rural_to_urban: {
    weight: 'moderate',
    category: 'migration',
    description: 'Moved from rural China to city as part of the largest internal migration in human history.',
    intent: 'year_texture',
    notes: 'Set by cn_village_to_city. 1990s–2010s.',
  },

  experienced_displacement: {
    weight: 'major',
    category: 'displacement',
    description: 'Was made to leave — not emigration but removal, expelled from a country or city by someone\'s decision. Carries the specific weight of home taken away.',
    intent: 'event',
    notes: 'Set by events_uganda.js (Amin Asian expulsion) and events_somalia.js (state collapse). Follow-through: ft25_displacement_midlife/late.',
  },

  gang_territory_lived: {
    weight: 'moderate',
    category: 'environment',
    description: 'Grew up or lived in territory controlled by MS-13 or Barrio 18 in the Northern Triangle.',
    intent: 'year_texture',
    notes: 'Set by ca_gang_corner (errand branch). Distinct from criminal_life — this is an environmental condition, not necessarily personal criminality.',
  },

  northern_triangle_migration: {
    weight: 'moderate',
    category: 'environment',
    description: 'Lived through the post-2014 Northern Triangle migration crisis as a direct witness — watched neighbors and families leave.',
    intent: 'year_texture',
    notes: 'Set by the central_american_migration_crisis world event.',
  },

  left_syria_early: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Syrian character who left before the worst of the civil war — reading the situation early.',
    intent: 'year_texture',
    notes: 'Set by sy_march_2011 (leave_early choice).',
  },

  left_syria: {
    weight: 'major',
    category: 'displacement',
    description: 'Syrian character who fled during the civil war — the boat crossing, the Turkish route, the rubber inflatable.',
    intent: 'both',
    timestamped: true,
    notes: 'Set by sy_displacement_choice (leave choice). Gates sy_europe_arrival.',
  },

  civil_war_displaced: {
    weight: 'major',
    category: 'displacement',
    description: 'Syrian character displaced by the civil war — departed rather than survived in place.',
    intent: 'year_texture',
    notes: 'Set by sy_displacement_choice (leave choice). Sister flag to left_syria.',
  },

  stayed_syria: {
    weight: 'major',
    category: 'displacement',
    description: 'Syrian character who chose (or was unable) to leave during the civil war — stayed with the house, the city, the life built.',
    intent: 'both',
    timestamped: true,
    notes: 'Set by sy_displacement_choice (stay choice). Gates sy_stayed_through.',
  },

  syria_europe_arrived: {
    weight: 'major',
    category: 'displacement',
    description: 'Syrian refugee who arrived in Europe — the camp, the caseworker, the file that doesn\'t know who they are.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by sy_europe_arrival. Follow-through for left_syria in European context.',
  },

  refugee_experience: {
    weight: 'major',
    category: 'displacement',
    description: 'Character who lived through the asylum seeker / refugee process — camp, caseworker, legal limbo, the compression of a specific life into a policy category.',
    intent: 'year_texture',
    notes: 'Set by sy_europe_arrival. Applicable beyond Syria but introduced here.',
  },

  syria_stayed_accounted: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Syrian character who has reckoned with the decision to stay — whether it was a choice or a circumstance.',
    intent: 'year_texture',
    notes: 'Set by sy_stayed_through.',
  },

  chose_to_stay: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Character who explicitly owned the decision to stay when others left — not trapped, but choosing.',
    intent: 'year_texture',
    notes: 'Set by sy_stayed_through (chosen branch).',
  },

  syrian_crisis_witnessed: {
    weight: 'minor',
    category: 'world_event',
    description: 'Non-Syrian character living in a neighboring country who witnessed the Syrian civil war\'s impact on their region.',
    intent: 'year_texture',
    notes: 'Set by syrian_civil_war world event. Fires for Lebanon/Jordan/Turkey/Iraq characters.',
  },

  refugee_crisis_witness: {
    weight: 'minor',
    category: 'world_event',
    description: 'Wealthy West character who witnessed the 2015 Syrian refugee crisis — the photograph, the debate, the political fracture.',
    intent: 'year_texture',
    notes: 'Set by syrian_refugee_crisis_europe world event.',
  },

  hukou_barrier_lived: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Experienced the hukou household registration system as a personal exclusion — living in a city while officially not existing in it.',
    intent: 'year_texture',
    notes: 'Set by cn_hukou_barrier.',
  },

  sent_down_intellectual_echo: {
    weight: 'moderate',
    category: 'history',
    description: 'Sent-down youth who kept reading in the countryside — the decade gave texture that cannot be acquired from books.',
    intent: 'year_texture',
    notes: 'Set by cn_sent_down_intellectual_echo. Follow-through for sent_down_intellectual.',
  },

  mizrahi_maabara: {
    weight: 'major',
    category: 'displacement',
    description: 'Grew up in or shaped by the Mizrahi ma\'abara transit camp era — the development town at the desert edge, the path that was longer than the map showed.',
    intent: 'year_texture',
    notes: 'Set by il_mizrahi_maabara.',
  },

  soviet_oleh_israel: {
    weight: 'moderate',
    category: 'immigration',
    description: 'Soviet/Russian Jewish immigrant (oleh) in Israel — the degree that does not transfer, the language that takes eighteen months, the ascent.',
    intent: 'year_texture',
    notes: 'Set by il_soviet_aliyah_arrival.',
  },

  ethiopian_oleh_israel: {
    weight: 'moderate',
    category: 'immigration',
    description: 'Ethiopian Jewish oleh — arrived in the airlift operations (Moses/Solomon), navigating a faith questioned and a Judaism two thousand years old.',
    intent: 'year_texture',
    notes: 'Set by il_ethiopian_aliyah_arrival.',
  },

  camp_is_home: {
    weight: 'major',
    category: 'displacement',
    description: 'Palestinian refugee camp as the only home ever known — second or third generation, the temporary that became permanent, the key for a lock that no longer exists.',
    intent: 'year_texture',
    notes: 'Set by pal_refugee_camp_generations.',
  },

  pandemic_informal_kept_working: {
    weight: 'moderate',
    category: 'world_event',
    description: 'Kept working through lockdown in an informal economy — the risk of the virus was less than the risk of not eating.',
    intent: 'year_texture',
    notes: 'Set by pan_informal_lockdown / pan_informal_lockdown_midlife.',
  },

  pandemic_locked_down: {
    weight: 'moderate',
    category: 'world_event',
    description: 'Stayed home through lockdown and borrowed money to survive — the debt came after the compliance.',
    intent: 'year_texture',
    notes: 'Set by pan_informal_lockdown when stay_home is chosen.',
  },

  pandemic_small_children_lockdown: {
    weight: 'minor',
    category: 'world_event',
    description: 'Navigated lockdown with small children at home — school closure and work-from-home instructions arriving on the same day.',
    intent: 'none',
    notes: 'Set by pan_small_children_lockdown / pan_small_children_lockdown_midlife.',
  },

  pandemic_vaccinated: {
    weight: 'minor',
    category: 'world_event',
    description: 'Got vaccinated against COVID-19 — the sore arm, the thing that felt like relief.',
    intent: 'none',
    notes: 'Set by pan_vaccine_choice variants.',
  },

  pandemic_vaccine_hesitant: {
    weight: 'minor',
    category: 'world_event',
    description: 'Waited before deciding on the COVID-19 vaccine — kept tracking the numbers.',
    intent: 'none',
    notes: 'Set by pan_vaccine_choice when wait is chosen.',
  },

  pandemic_survived_intact: {
    weight: 'minor',
    category: 'world_event',
    description: 'Got through the pandemic lockdown without major disruption — finished two books, started six more.',
    intent: 'none',
    notes: 'Set by pan_wealthy_west_specific when cope_quietly is chosen.',
  },

  considered_emigration: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Opened the tab on emigration and never quite closed it — visa categories, salary comparisons, the NRI return.',
    intent: 'event',
    notes: 'Set by ind_nri_return_question and other emigration events. Follow-through: ind_considered_emigration_echo.',
  },

  bra_amazon_generation: {
    weight: 'moderate',
    category: 'environmental',
    description: 'Was alive when Chico Mendes was shot in 1988 — lived in the era when the Amazon became a political economy with named stakes.',
    intent: 'year_texture',
    notes: 'Set by bra_chico_mendes.',
  },

  bra_nordestino_migrant: {
    weight: 'moderate',
    category: 'migration',
    description: 'Migrated from Brazil\'s impoverished Northeast (sertão) to São Paulo or Rio — the pau-de-arara generation who built the southeast on their labor.',
    intent: 'year_texture',
    notes: 'Set by bra_nordestino_migration (choice 1).',
  },

  arg_2001_emigrant: {
    weight: 'moderate',
    category: 'migration',
    description: 'Left Argentina during or after the 2001–02 collapse — part of the 100,000+ who emigrated to Spain, Italy, and elsewhere in the exodus year.',
    intent: 'year_texture',
    notes: 'Set by la_arg_pesificacion (emigrate choice).',
  },

  spain_crisis_emigrant: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Left Spain during the 2010s brain drain — the fuga de cerebros, EU passport, London or Berlin because the degree and the job market were not speaking.',
    intent: 'year_texture',
    notes: 'Set by es_brain_drain (leave branch).',
  },

  portuguese_emigrant_2011: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Emigrated from Portugal after the 2011 bailout — to Angola, Brazil, France, or the UK. One of the 400,000+ who left in the troika years.',
    intent: 'year_texture',
    notes: 'Set by pt_troika_lived (leave branch).',
  },

  emigration_reconsidered: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Re-opened the emigration question in midlife — the tab, the salary comparison, the decision to gather information rather than commit.',
    intent: 'none',
    notes: 'Set by ind_considered_emigration_echo (chose to re-explore).',
  },

  phnom_penh_return: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Returned to or arrived in Phnom Penh after liberation in 1979 — found the city half-empty, claimed a house, began rebuilding.',
    intent: 'year_texture',
    notes: 'Set by cam_phnom_penh_return. Gates the long-term reconstruction narrative.',
  },

  landmine_country: {
    weight: 'moderate',
    category: 'environment',
    description: 'Grew up in a heavily mined country — learned which paths exist because other paths are mined; lived alongside demining operations and prosthetics clinics.',
    intent: 'year_texture',
    notes: 'Set by cam_landmine_awareness (Cambodia). The red markers are permanent furniture of the landscape.',
  },

  swachh_bharat_adopted: {
    weight: 'minor',
    category: 'environment',
    description: 'Rural India: household adopted toilet use under Swachh Bharat Abhiyan — the practice changed, though the change took longer than the structure.',
    intent: 'none',
    notes: 'Set by ind_swachh_bharat (adoption choice).',
  },

  swachh_bharat_ambivalent: {
    weight: 'minor',
    category: 'environment',
    description: 'Rural India: the Swachh Bharat toilet was built; whether it was used is a different question — the structure and the habit are counted separately.',
    intent: 'none',
    notes: 'Set by ind_swachh_bharat (ambivalent choice).',
  },

  jamaica_emigrated: {
    weight: 'major',
    category: 'displacement',
    description: 'Left Jamaica for London, New York, or Toronto during the Windrush era or its aftermath — the specific emigration of the Anglophone Caribbean to Britain and North America.',
    intent: 'event',
    notes: 'Set by jam_emigration_decision (leave choice). Gates jam_late_reckoning.',
  },

  guinea_exile: {
    weight: 'moderate',
    category: 'migration',
    description: 'Left Guinea during the Touré era — part of the educated-class exodus to Dakar, Paris, or Montreal.',
    intent: 'event',
    notes: 'Set by gn_educated_class_leaves (leave branch). Works alongside emigrated flag.',
  },

  ger_district_migrant: {
    weight: 'moderate',
    category: 'migration',
    description: 'Left the steppe for Ulaanbaatar\'s ger districts — yurt neighborhoods at the city edge, coal stoves producing some of the world\'s worst winter air quality.',
    intent: 'year_texture',
    notes: 'Set by mn_ulaanbaatar_migration.',
  },

  burkina_sahel_displaced: {
    weight: 'major',
    category: 'migration',
    description: 'Was internally displaced by the Sahel jihadist insurgency (2019–2025) — part of the two million who fled.',
    intent: 'year_texture',
    notes: 'Set by bfa_sahel_violence (Flee branch). Year texture: camp life, loss of home, uncertain return.',
  },

  eri_border_war_veteran: {
    weight: 'moderate',
    category: 'conflict',
    description: 'Served in the 1998–2001 Eritrea-Ethiopia border war — the trench at Zalambessa, artillery, seventy thousand dead over a town in Italian-era treaty documents.',
    intent: 'event',
    notes: 'Set by eri_border_war_1998 (served choice).',
  },

  eri_flight_planned: {
    weight: 'moderate',
    category: 'migration',
    description: 'Made the decision to leave Eritrea — crossing into Sudan at night, the arithmetic of survival routes, the specific knowledge of what the Sinai does.',
    intent: 'event',
    notes: 'Set by eri_national_service_indefinite (planning choice). Gates eri_leaving_decision.',
  },

  eritrean_refugee: {
    weight: 'major',
    category: 'migration',
    description: 'Crossed out of Eritrea — through Sudan, then north and west; free in the specific way of having no protection from anyone.',
    intent: 'year_texture',
    notes: 'Set by eri_leaving_decision (left choice). Gates eri_sinai_trafficking and eri_diaspora_tax.',
  },

  eri_sinai_witness: {
    weight: 'moderate',
    category: 'conflict',
    description: 'Knows someone who went through the Sinai trafficking network — Bedouin ransom calls made to diaspora relatives, the specific knowledge of what arrival does not mean.',
    intent: 'event',
    notes: 'Set by eri_sinai_trafficking.',
  },

  grew_up_in_camp: {
    weight: 'major',
    category: 'displacement',
    description: 'Spent childhood or formative years in a refugee or IDP camp — the specific institutional experience of displaced community life.',
    intent: 'both',
    notes: 'Set by rohingya, palestine, somalia, and conflict-zone events for characters displaced in early life.',
  },

  bol_banzer_era_youth: {
    weight: 'moderate',
    category: 'conflict',
    description: 'Came of age under General Banzer\'s 1971–78 dictatorship — "comunista, subversivo, agitador" as the preferred vocabulary for dissent.',
    intent: 'none',
    notes: 'Set by bol_banzer_era. Bolivia only.',
  },

  bol_eradication_victim: {
    weight: 'moderate',
    category: 'conflict',
    description: 'Directly affected by the US-funded coca eradication programme — the army arrived with bulldozers.',
    intent: 'none',
    notes: 'Set alongside bol_coca_grower by bol_coca_eradication. Bolivia only.',
  },

  bol_gas_war_generation: {
    weight: 'major',
    category: 'conflict',
    description: 'Lived through or participated in the 2003 Gas War — sixty-seven dead in El Alto, Goni\'s flight to Miami, the gas kept under Bolivian soil.',
    intent: 'year_texture',
    notes: 'Set by bol_gas_war_2003. Bolivia only.',
  },

  bol_sea_loss_identity: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up in Bolivia learning the Día del Mar — the annual March 23 ceremony for the coast lost to Chile in 1884. The map with the Litoral Region as part of Bolivia is in every classroom.',
    intent: 'both',
    notes: 'Set by bol_dep_dia_del_mar. Checked by ft89_sea_loss_late_reckoning.',
  },

  bol_che_guevara_echo: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed or came of age during the news of Che Guevara\'s capture and death at La Higuera in 1967 — the failed revolution and its contested meaning.',
    intent: 'year_texture',
    notes: 'Set by bol_dep_che_1967. Bolivia only.',
  },

  bol_potosi_colonial_weight: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up in a Bolivian mining community and learned the colonial arithmetic: eight million dead in Potosí mines, the silver that built Spain and left Bolivia hollow.',
    intent: 'year_texture',
    notes: 'Set by bol_dep_potosi_colonial. Requires bol_mining_generation.',
  },

  bol_cholita_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Witnessed the cultural shift around cholita identity after 2006 — the pollera no longer only a market-woman marker, the wrestlers of El Alto performing pride in ordinary clothes.',
    intent: 'year_texture',
    notes: 'Set by bol_dep_cholita_pollera. Bolivia only, 2005+.',
  },

  bol_lithium_generation: {
    weight: 'major',
    category: 'economic',
    description: 'Aware of Bolivia\'s lithium debate — the Salar de Uyuni, the electric car market building around it, the Potosí pattern repeating in slow motion.',
    intent: 'both',
    notes: 'Set by bol_dep_lithium_debate. Checked by ft89_lithium_nationalization_echo.',
  },

  bol_tipnis_generation: {
    weight: 'major',
    category: 'conflict',
    description: 'Lived through the TIPNIS road conflict 2011 — the Evo Morales government versus Amazon indigenous communities, the march to La Paz, Pachamama in the constitution and a road through protected territory.',
    intent: 'both',
    notes: 'Set by bol_dep_tipnis_road. Checked by ft89_tipnis_road_outcome.',
  },

  bol_sacred_coca_identity: {
    weight: 'moderate',
    category: 'identity',
    description: 'Knows the coca leaf as sacred object — the Pachamama ceremony, the miners\' altitude aid, the akullico — distinct from its narco-politics in other countries.',
    intent: 'year_texture',
    notes: 'Set by bol_dep_sacred_coca_ceremony. Bolivia only.',
  },

  bol_maritime_icj_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Followed Bolivia\'s ICJ case against Chile 2013–2018 — the argument for a negotiating obligation that the court declined to find, the landlocked identity sharpened by a ruling.',
    intent: 'both',
    notes: 'Set by bol_dep_maritime_icj. Checked by ft89_icj_ruling_2018.',
  },

  nz_springbok_generation: {
    weight: 'major',
    category: 'conflict',
    description: 'Lived through the 1981 Springbok Tour — the moment New Zealand discovered it was not as unified as it had assumed, friends on opposite sides of police lines.',
    intent: 'year_texture',
    notes: 'Set by nz_springbok_tour_1981. New Zealand only.',
  },

  nz_rainbow_warrior_generation: {
    weight: 'moderate',
    category: 'conflict',
    description: 'Witnessed the Rainbow Warrior bombing in Auckland harbour — the specific education of state terrorism conducted by a nominal ally, and the world shrugging.',
    intent: 'event', notes: 'Follow-through: ft46_nz_rainbow_warrior_late.',
    notes: 'Set by nz_rainbow_warrior_1985. New Zealand only.',
  },

  nz_left_for_australia: {
    weight: 'moderate',
    category: 'migration',
    description: 'Left New Zealand for Australia — the Tasman migration logic: same language, easier visa, higher wages, familiar enough it doesn\'t feel like leaving.',
    intent: 'none',
    notes: 'Set by nz_brain_drain (left choice). New Zealand only.',
  },

  democracy_movement: {
    weight: 'major',
    category: 'conflict',
    description: 'Was part of a democracy movement — the experience of collective action against authoritarian rule and the long assessment of what it achieved.',
    intent: 'event',
    notes: 'Set by Gwangju world event and Turkey coup arc. Checked by ft23_democracy_movement_*.',
  },

  considering_emigration: {
    weight: 'moderate',
    category: 'migration',
    description: 'Seriously considered emigrating but has not yet left — carrying the live question of whether to go.',
    intent: 'event',
    notes: 'Set by events_scandinavia.js and events_decolonisation.js. Checked by ft23_considering_emigration_returns.',
  },

  lived_through_occupation: {
    weight: 'major', category: 'conflict',
    description: 'Lived through a military occupation — the experience of foreign soldiers, curfews, and daily civilian life under hostile control.',
    intent: 'event', notes: 'Set by WWII occupation world events. Follow-through: ft39_occupation_late.',
  },

  lived_through_revolution: {
    weight: 'major', category: 'conflict',
    description: 'Lived through a revolution — the specific fear and possibility of a rapid political rupture.',
    intent: 'event', notes: 'Set by various revolution world events. Follow-through: ft39_revolution_late.',
  },

  war_generation: {
    weight: 'major', category: 'conflict',
    description: 'Grew up or came of age during a major war — the formative compression of wartime.',
    intent: 'event', notes: 'Set by WWII and major conflict world events. Follow-through: ft39_war_generation_late.',
  },

  tutsi_hidden: {
    weight: 'major', category: 'conflict',
    description: 'Was a Tutsi who survived the 1994 genocide by hiding or being sheltered — the specific debt of being found later.',
    intent: 'event', notes: 'Set by Rwanda genocide world event. Follow-through: ft44_tutsi_hidden_late.',
  },

  systemic_discrimination: {
    weight: 'major', category: 'conflict',
    description: 'Has experienced systemic discrimination — not the individual encounter but the structural, legal, or social system built against them.',
    intent: 'event', notes: 'Set by apartheid and Jim Crow world events. Follow-through: ft47_systemic_discrimination_late.',
  },

  yugoslav_war_survivor: {
    weight: 'major', category: 'conflict',
    description: 'Survived the Yugoslav wars of the 1990s — the specific grief of a country that ceased to exist.',
    intent: 'event', notes: 'Set by Yugoslav dissolution world events. Follow-through: ft42_yugoslav_late.',
  },

  iran_revolution_lived: {
    weight: 'major', category: 'conflict',
    description: 'Lived through the 1979 Iranian revolution — watched a monarchy become a theocracy in under a year.',
    intent: 'event', notes: 'Set by Iranian revolution world event. Follow-through: ft42_iran_revolution_late.',
  },

  korean_division_generation: {
    weight: 'major', category: 'conflict',
    description: 'Generation of Koreans who lived through or were defined by the division of the peninsula — family on the other side of a border that cannot be crossed.',
    intent: 'event', notes: 'Set by Korean War/division world events. Follow-through: ft42_korean_division_late.',
  },

  cultural_revolution_survived: {
    weight: 'major', category: 'conflict',
    description: 'Survived the Chinese Cultural Revolution — the struggle sessions, the re-education, the specific terror of neighbours turned informers.',
    intent: 'event', notes: 'Set by Cultural Revolution world events. Follow-through: ft42_cultural_revolution_late.',
  },

  saigon_fell: {
    weight: 'major', category: 'conflict',
    description: 'Was present when Saigon fell in April 1975 — the helicopters on the roof, the embassy, the end of the American war.',
    intent: 'event', notes: 'Set by Fall of Saigon world event. Follow-through: ft42_saigon_late.',
  },

  soviet_collapse_lived: {
    weight: 'major', category: 'conflict',
    description: 'Witnessed the collapse of the Soviet Union — the end of an empire that had been presented as permanent.',
    intent: 'event', notes: 'Set by Soviet collapse world events. Follow-through: ft42_soviet_collapse_late.',
  },

  chechen_war_generation: {
    weight: 'major', category: 'conflict',
    description: 'Grew up during the Chechen wars — in Russia or Chechnya, the war was the permanent backdrop.',
    intent: 'event', notes: 'Set by Chechen war world events. Follow-through: ft44_chechen_late.',
  },

  ru_dep_terror_generation: {
    weight: 'major', category: 'conflict',
    description: 'Grew up during the Great Terror 1937-38 — night knocks, arrests, the silence afterward.',
    intent: 'year_texture', notes: 'Set by ru_dep_great_terror. Followed up by ru_dep_family_arrest.',
  },

  ru_dep_chsir: {
    weight: 'major', category: 'conflict',
    description: 'Member of the family of an arrested person — the CHSIR category that followed a child throughout Soviet life.',
    intent: 'year_texture', notes: 'Set by ru_dep_family_arrest. The silence about the father in official documents.',
  },

  ru_dep_kommunalka_generation: {
    weight: 'moderate', category: 'social',
    description: 'Grew up in a kommunalka — the communal apartment life of Soviet urban Russia.',
    intent: 'year_texture', notes: 'Set by ru_dep_kommunalka.',
  },

  ru_dep_thaw_believer: {
    weight: 'moderate', category: 'political',
    description: 'Believed in the possibility of reform after the secret speech — the Khrushchev thaw as genuine opening.',
    intent: 'year_texture', notes: 'Set by ru_dep_secret_speech (reform choice).',
  },

  ru_dep_thaw_sceptic: {
    weight: 'moderate', category: 'political',
    description: 'The secret speech created questions that could not be answered — the thaw as the beginning of private disbelief.',
    intent: 'year_texture', notes: 'Set by ru_dep_secret_speech (sceptic choice).',
  },

  ru_dep_blat_generation: {
    weight: 'moderate', category: 'economic',
    description: 'Came of age under the blat system — the Soviet economy of favours and reciprocal connections.',
    intent: 'year_texture', notes: 'Set by ru_dep_blat_system.',
  },

  ru_dep_1990s_generation: {
    weight: 'moderate', category: 'economic',
    description: 'Came of age in the 1990s Russian chaos — kiosks, voucher privatization, the end of savings.',
    intent: 'year_texture', notes: 'Set by ru_dep_1990s_kiosks.',
  },

  ru_dep_chechnya_generation: {
    weight: 'major', category: 'conflict',
    description: 'Served in or was directly touched by the first Chechen war 1994-96.',
    intent: 'year_texture', notes: 'Set by ru_dep_chechnya_war.',
  },

  chechen_civilian: {
    weight: 'major', category: 'conflict',
    description: 'Was a Chechen civilian during the wars — the specific experience of Grozny under bombardment.',
    intent: 'event', notes: 'Set by Chechen war world events. Follow-through: ft44_chechen_civilian_late.',
  },

  witnessed_democracy_end: {
    weight: 'major', category: 'conflict',
    description: 'Witnessed the end of a democratic government — a coup, an autogolpe, an election that was the last.',
    intent: 'event', notes: 'Set by various coup/democratic collapse world events. Follow-through: ft46_witnessed_democracy_end_late.',
  },

  condor_generation: {
    weight: 'major', category: 'conflict',
    description: 'Generation defined by Operation Condor — the US-backed network of South American dictatorships that coordinated disappearances across borders.',
    intent: 'event', notes: 'Set by Operation Condor world events. Follow-through: ft42_condor_late.',
  },

  red_terror_generation: {
    weight: 'major', category: 'conflict',
    description: 'Survived the Ethiopian Red Terror 1977–78 — 500,000 dead, the bodies displayed as warnings.',
    intent: 'event', notes: 'Set by Red Terror world event. Follow-through: ft42_red_terror_late.',
  },

  mau_mau_generation: {
    weight: 'major', category: 'conflict',
    description: 'Generation defined by the Mau Mau uprising and British counter-insurgency in Kenya — detention camps, collective punishment.',
    intent: 'event', notes: 'Set by Mau Mau world event. Follow-through: ft44_mau_mau_late.',
  },

  biafra_generation: {
    weight: 'major', category: 'conflict',
    description: 'Generation marked by the Biafra war 1967–70 — one million dead from famine, the images of starving children, the silence after.',
    intent: 'event', notes: 'Set by Biafra world event. Follow-through: ft42_biafra_late.',
  },

  civil_war_generation: {
    weight: 'major', category: 'conflict',
    description: 'Generation defined by civil war — fought over by factions, the state collapsed into competing armies.',
    intent: 'event', notes: 'Set by various civil war world events. Follow-through: ft47_spanish_civil_war_late.',
  },

  lumumba_generation: {
    weight: 'major', category: 'conflict',
    description: 'Generation that witnessed Patrice Lumumba — his independence speech, his assassination weeks later, the lesson that independence could be reversed.',
    intent: 'event', notes: 'Set by Lumumba world event. Follow-through: ft42_lumumba_late.',
  },

  bay_of_pigs_generation: {
    weight: 'moderate', category: 'conflict',
    description: 'Lived through the Bay of Pigs invasion 1961 — the CIA-backed exile attempt, the Cuban defeat, the specific proof that the revolution would be defended.',
    intent: 'event', notes: 'Set by Bay of Pigs world event. Follow-through: ft46_bay_of_pigs_late.',
  },

  mariel_generation: {
    weight: 'major', category: 'migration',
    description: 'Mariel boatlift generation — left Cuba in 1980, the 125,000 who sailed to Florida in five months.',
    intent: 'event', notes: 'Set by Mariel boatlift world event. Follow-through: ft46_mariel_late.',
  },

  mobutu_fall_generation: {
    weight: 'moderate', category: 'conflict',
    description: 'Generation that witnessed Mobutu\'s fall 1997 — the collapse of Zaire and the chaos that followed.',
    intent: 'event', notes: 'Set by Mobutu fall world event. Follow-through: ft46_mobutu_fall_late.',
  },

  iran_woman_life_freedom_generation: {
    weight: 'major',
    category: 'conflict',
    description: 'Lived through the 2022 Woman, Life, Freedom uprising in Iran — the most sustained challenge to the Islamic Republic since the revolution, sparked by Mahsa Amini\'s death in Morality Police custody.',
    intent: 'event',
    notes: 'Set by we_iran_mahsa_amini_2022 world event. Iran only. Follow-through: ft47_iran_wlf_late.',
  },

  sudan_civil_war_2023: {
    weight: 'major',
    category: 'conflict',
    description: 'Living through the 2023 Sudan civil war — SAF vs. RSF, Khartoum as a battlefield, 7 million displaced, the civilian transition destroyed.',
    intent: 'event',
    notes: 'Set by we_sudan_civil_war_2023 world event. Sudan only. Follow-through: ft47_sudan_war_late.',
  },

  fiji_emigrated: {
    weight: 'major',
    category: 'migration',
    description: 'Left Fiji as part of the Indo-Fijian emigration wave (1987–2010) — Brisbane, Auckland, Toronto, the specific knowledge of being Fijian Indian elsewhere.',
    intent: 'event',
    notes: 'Set by fj_emigration first choice. Gates fj_late_life emigrant branch.',
  },

  karen_displaced: {
    weight: 'moderate',
    category: 'displacement',
    description: 'A Karen person was displaced by the Myanmar military offensive — fled to Mae La camp or the Thai border, now in refugee status.',
    intent: 'event',
    notes: 'Set by sl_karen_displacement. Follow-through: sl_karen_camp_years fires at adolescence.',
  },

  igbo_fled_north: {
    weight: 'moderate',
    category: 'displacement',
    description: 'An Igbo person fled the north after the 1966 pogroms — part of the mass return of Igbos to the Eastern Region before the Biafra War.',
    intent: 'none',
    notes: 'Set by sl_igbo_after_66.',
  },

  refugee_camp_years: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Spent years in a refugee camp — the temporary status that becomes semi-permanent, the determination process, the category that cannot contain the full person.',
    intent: 'year_texture',
    notes: 'Set by sl_vietnamese_boat_arrival. Cross-cutting long-term camp experience.',
  },

  hukou_urban_migrant: {
    weight: 'moderate',
    category: 'displacement',
    description: 'A Chinese internal migrant living in a city without urban hukou — the floating population, the child whose schooling is not guaranteed, the labour without the rights.',
    intent: 'year_texture',
    notes: 'Set by sl_china_hukou_city.',
  },

  exile_generation_tibetan: {
    weight: 'moderate',
    category: 'displacement',
    description: 'A Tibetan born in exile — knows the geography of a country never seen, oriented toward a return the adults around them have awaited for decades without it arriving.',
    intent: 'year_texture',
    notes: 'Set by sl_tibetan_dharamsala_childhood.',
  },

  bengal_partition_displaced: {
    weight: 'major',
    category: 'displacement',
    description: 'Displaced by the Bengal Partition of 1947 — the line drawn in London through rice fields and market towns, the village now on the wrong side, the district that never quite becomes home.',
    intent: 'year_texture',
    notes: 'Set by sl_bengal_partition_hindu.',
  },

  brain_drain_participant: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Left a country in crisis to practice elsewhere — the brain drain statistic, the remittances sent home, the work done well in a hospital that has supplies.',
    intent: 'none',
    notes: 'Set by sl_greek_crisis_doctor_leaves (leave branch).',
  },

  exile_community_network: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Found and joined the exile community abroad — the Chileans in Stockholm, the Iranians in Paris, the Cubans in Miami. A community assembled from a shared shape of absence rather than a shared origin.',
    intent: 'year_texture',
    notes: 'Set by sl_chile_exile_europe.',
  },

  issei_generation: {
    weight: 'moderate',
    category: 'displacement',
    description: 'First-generation Japanese immigrant to the United States — the plantation labour contract, the ethnic barracks, the already-named categories (issei, nisei) waiting to receive them.',
    intent: 'year_texture',
    notes: 'Set by sl_japanese_hawaii_issei.',
  },

  caribbean_diaspora: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Caribbean graduate who emigrated via scholarship — the departure as the legible shape of achievement on a small island, the remittances sent, the carnival visits, the country of origin and the city of residence.',
    intent: 'year_texture',
    notes: 'Set by sl_small_island_brain_drain (leave branch).',
  },

  climate_refugee: {
    weight: 'major',
    category: 'displacement',
    description: 'Left a Pacific island due to rising seas and climate-driven uninhabitability — the taro gardens flooded, the cemetery flooding, the migration arrangements negotiated while the emissions continue.',
    intent: 'year_texture',
    notes: 'Set by sl_pacific_climate_rising_sea (leave branch).',
  },

  eviction_cycle_childhood: {
    weight: 'major',
    category: 'displacement',
    description: 'Grew up in a Roma settlement subject to recurring municipal eviction orders — moved seven times in eleven years, transferred schools four times, the settlement rebuilt each time from what can be moved.',
    intent: 'year_texture',
    notes: 'Set by sl_roma_eviction_cycle.',
  },

  stateless_adjacent: {
    weight: 'moderate',
    category: 'displacement',
    description: 'EU citizen on paper but living outside the practice of EU rights — the gap between the right of free movement and the practiced reality of eviction, increased policing, and discriminatory applications.',
    intent: 'year_texture',
    notes: 'Set by sl_roma_adult_europe.',
  },

  forced_sedentarisation: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Settled into a council house by policy decision — the locked door unfamiliar, the trailer in the garden, the house as a solution to a problem they were not asked to define.',
    intent: 'year_texture',
    notes: 'Set by sl_irish_traveller_sedentarisation.',
  },

  hmong_resettlement: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Hmong refugee resettled in Minnesota via Lutheran social services — the Secret War that was secret, Ban Vinai camp, January in Minneapolis at fifteen below zero, the snow nothing like anything in Laos.',
    intent: 'year_texture',
    notes: 'Set by sl_hmong_refugee_minnesota.',
  },

  transmigrant_family: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Javanese family moved to outer islands under Indonesian transmigration programme — the two hectares, the wooden house, the soil different from Java, the indigenous community that did not agree to the programme.',
    intent: 'year_texture',
    notes: 'Set by sl_indonesia_transmigrant.',
  },

  cyprus_displaced: {
    weight: 'major',
    category: 'displacement',
    description: 'Displaced by the 1974 Cyprus division — three days to leave Kyrenia, the Turkish-Cypriot neighbours also leaving in the opposite direction, the checkpoint that opened in 2003 and was not crossed.',
    intent: 'event',
    notes: 'Set by sl_cyprus_1974_displacement. Follow-through: sl_cyprus_checkpoint_2003 fires at late_life.',
  },

  planning_return_italy: {
    weight: 'minor',
    category: 'migration',
    description: 'An Italian emigrant seriously considering a return — looking at the logistics, the job market, the life that would need to be reconstructed on the other end.',
    intent: 'none',
    notes: 'Set by ft30_italian_emigrant_return (italian_emigrant follow-through).',
  },

  emigrant_home_settled: {
    weight: 'minor',
    category: 'migration',
    description: 'An emigrant who has accepted the country of migration as home — said it out loud, meant it, and noticed something change in the saying.',
    intent: 'none',
    notes: 'Set by ft30_italian_emigrant_return (italian_emigrant follow-through).',
  },

  transmigration_settled: {
    weight: 'minor',
    category: 'displacement',
    description: 'Javanese transmigrant who has made a life on the outer island — home is now Kalimantan or Sulawesi or Papua, not Java.',
    intent: 'none',
    notes: 'Set by ft30_transmigration_years_on (settled path).',
  },

  transmigration_displaced_still: {
    weight: 'minor',
    category: 'displacement',
    description: 'Javanese transmigrant who still measures the distance to Java — never fully settled, the original home still felt as the real one.',
    intent: 'none',
    notes: 'Set by ft30_transmigration_years_on (displaced path).',
  },

  uzb_stayed_behind: {
    weight: 'minor',
    category: 'migration',
    description: 'Uzbek character who stayed when family members went to Russia — watching the village empty seasonally, holding the role at home.',
    intent: 'none',
    notes: 'Set by uzb_labour_russia (stayed path).',
  },

  uzb_russia_migrant: {
    weight: 'minor',
    category: 'migration',
    description: 'Uzbek labour migrant who worked in Russia — the three-day bus, the shared apartment, the foreman who held the passport, the money sent home.',
    intent: 'none',
    notes: 'Set by uzb_labour_russia (migrant path).',
  },

  kaz_russian_stayed_home: {
    weight: 'minor',
    category: 'identity',
    description: 'Russian-Kazakhstani who consciously identifies as Kazakhstani — stayed as Russians emigrated, children speak Kazakh better.',
    intent: 'none',
    notes: 'Set by kaz_russian_coexistence (stayed path).',
  },

  kaz_russian_considering_leave: {
    weight: 'minor',
    category: 'migration',
    description: 'Russian minority in Kazakhstan doing the calculation — job, apartment, parents, the fact that Russia is not what Russia used to be either.',
    intent: 'none',
    notes: 'Set by kaz_russian_coexistence (considering path).',
  },

  // ─── TAJIKISTAN FLAGS ───────────────────────────────────────────────────────

  taj_civil_war_stayed: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Tajik who stayed in Dushanbe during the civil war — survived behind closed doors, learning the street day by day.',
    intent: 'none',
    notes: 'Set by taj_civil_war_begins (stayed path).',
  },

  taj_civil_war_displaced: {
    weight: 'major',
    category: 'displacement',
    description: 'Displaced by the Tajik civil war — fled to mountain village or across border to Afghanistan, returned to a changed city.',
    intent: 'none',
    notes: 'Set by taj_civil_war_begins (fled path).',
  },

  taj_russia_migrant: {
    weight: 'moderate',
    category: 'migration',
    description: 'Tajik labour migrant in Russia — construction sites, dormitories, Sunday phone calls, money sent on the first of the month.',
    intent: 'none',
    notes: 'Set by taj_russia_migration (migrant path).',
  },

  taj_stayed_behind: {
    weight: 'minor',
    category: 'migration',
    description: 'Tajik who stayed when the men went to Russia — built what could be built at local wages while the village emptied seasonally.',
    intent: 'none',
    notes: 'Set by taj_russia_migration (stayed path).',
  },

  kyr_osh_uzbek_stayed_rooted: {
    weight: 'moderate',
    category: 'identity',
    description: 'Uzbek-Kyrgyz who chose to stay in Kyrgyzstan after the June 2010 violence — the decision accumulated over years of staying when leaving was still possible.',
    intent: 'none',
    notes: 'Set by ft31_osh_uzbek_decade_on (stay path).',
  },

  kyr_osh_uzbek_departing: {
    weight: 'moderate',
    category: 'migration',
    description: 'Uzbek-Kyrgyz who has decided to leave Kyrgyzstan — the question of when is open, the question of whether has been answered.',
    intent: 'none',
    notes: 'Set by ft31_osh_uzbek_decade_on (leave path).',
  },

  taj_war_narrated: {
    weight: 'minor',
    category: 'identity',
    description: 'Told the civil war story to their child — more than before, some of it landing, some waiting for the right age.',
    intent: 'none',
    notes: 'Set by ft31_civil_war_son (full-telling path).',
  },

  taj_war_partial_telling: {
    weight: 'minor',
    category: 'identity',
    description: 'Told the outline of the civil war to their child — the rest stays with them, still deciding who the telling would be for.',
    intent: 'none',
    notes: 'Set by ft31_civil_war_son (partial path).',
  },

  // ─── TURKMENISTAN ─────────────────────────────────────────────────────────────

  tkm_ashgabat_resident: {
    weight: 'minor',
    category: 'geographic',
    description: 'Lives in white marble Ashgabat — gold domes, empty boulevards, fountains in the desert, bread queues past state monuments.',
    intent: 'none',
    notes: 'Set by tkm_ashgabat_marble.',
  },

  tkm_departure_attempted: {
    weight: 'major',
    category: 'geographic',
    description: 'Made the attempt to leave Turkmenistan — a state where exit is controlled and families of those who speak out from outside receive visits.',
    intent: 'none',
    notes: 'Set by tkm_departure_question.',
  },

  tkm_stayed_for_family: {
    weight: 'major',
    category: 'geographic',
    description: 'Stayed in Turkmenistan with the knowledge of what staying costs — the calculation that weighted family safety over personal exit.',
    intent: 'none',
    notes: 'Set by tkm_departure_question.',
  },

  // ─── GHANA ────────────────────────────────────────────────────────────────────

  gha_accra_urban: {
    weight: 'minor',
    category: 'geographic',
    description: 'Navigates Accra by the actual logic — trotros that run when full, the mate\'s shout, the city that grew faster than any plan for it.',
    intent: 'none',
    notes: 'Set by gha_accra_trotro.',
  },

  gha_diaspora_pressure: {
    weight: 'moderate',
    category: 'geographic',
    description: 'Went abroad carrying the family\'s expectation — the Western Union transfer that success means, the specific weight of Ghanaian diaspora obligation.',
    intent: 'none',
    notes: 'Set by gha_abroad_expectation.',
  },

  gha_stayed_deliberate: {
    weight: 'moderate',
    category: 'geographic',
    description: 'Chose to stay in Ghana — a decision less legible as a choice than going, but a choice nonetheless.',
    intent: 'none',
    notes: 'Set by gha_abroad_expectation.',
  },

  // ─── ECUADOR ──────────────────────────────────────────────────────────────────

  ecu_andean_highland: {
    weight: 'minor',
    category: 'geographic',
    description: 'From the Andean sierra — grew up with altitude, minga communal labour, and the specific knowledge of how the highlands sustain people.',
    intent: 'year_texture',
    notes: 'Set by ecu_minga. Year texture block.',
  },

  ecu_spain_emigrant: {
    weight: 'major',
    category: 'geographic',
    description: 'Emigrated to Spain during the 2001–08 wave — part of the 800,000 who left after the sucre collapse, building a life in one country while maintaining a version in another.',
    intent: 'both',
    notes: 'Set by ecu_spain_wave. Year texture + ft34_spain_echo follow-through.',
  },

  ecu_stayed_home_crisis: {
    weight: 'moderate',
    category: 'geographic',
    description: 'Stayed in Ecuador during the emigration wave — watched the neighbourhood empty, learned to live in a country exporting its people.',
    intent: 'year_texture',
    notes: 'Set by ecu_spain_wave. Year texture block.',
  },

  // ─── HONDURAS ─────────────────────────────────────────────────────────────────

  hon_banana_generation: {
    weight: 'moderate',
    category: 'geographic',
    description: 'Grew up in the shadow of the banana companies — United Fruit, Standard Fruit — and the plantation economy that the word "banana republic" was coined for.',
    intent: 'year_texture',
    notes: 'Set by hon_banana_plantation. Year texture block.',
  },

  // ─── ERA GAPS ─────────────────────────────────────────────────────────────────

  bengal_famine_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 1943 Bengal Famine — the wartime food crisis that killed 2–3 million people while censors called it "food scarcity."',
    intent: 'year_texture',
    notes: 'Set by eg_bengal_famine_child or eg_bengal_famine_adult. Year texture block for India/Bangladesh 1943–1950s.',
  },

  buenos_aires_neutral_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived in Buenos Aires during WWII neutrality — the specific moral experience of a country that chose not to choose while Europe burned.',
    intent: 'none',
    notes: 'Set by eg_buenos_aires_neutrality. Terminal flag — context is the event prose itself.',
  },

  independence_disillusionment: {
    weight: 'moderate',
    category: 'political',
    description: 'Watched independence promises collide with structural adjustment and IMF conditionality in the 1970s — the generation whose expectations were formed by independence and revised by reality.',
    intent: 'year_texture',
    notes: 'Set by eg_independence_broken_promise. Year texture for developing world 1968–85.',
  },

  // ─── SOUTH-TO-SOUTH MIGRATION ─────────────────────────────────────────────────

  bangladesh_malaysia_migrant: {
    weight: 'major',
    category: 'displacement',
    description: 'Left Bangladesh for Malaysia on a broker-fee arrangement — passport held by employer, wages withheld, debt at 30% interest financing the crossing.',
    intent: 'both',
    notes: 'Set by ss_bangladesh_malaysia_recruit. Full arc in events_south_south.js.',
  },

  zim_south_africa_migrant: {
    weight: 'major',
    category: 'displacement',
    description: 'Crossed into South Africa from Zimbabwe after 2000 — a qualified professional doing domestic or casual work in Johannesburg because the rand is real money.',
    intent: 'both',
    notes: 'Set by ss_zim_sa_arrival. Arc includes xenophobia 2008 and late echo.',
  },

  ghana_libya_migrant: {
    weight: 'major',
    category: 'displacement',
    description: 'Worked construction in Gaddafi\'s Libya — the Gulf-style labour destination for West Africans — before the 2011 uprising made getting home the only project.',
    intent: 'both',
    notes: 'Set by ss_ghana_libya. Events include ss_ghana_libya_2011 (evacuation).',
  },

  gulag_survivor: {
    weight: 'major',
    category: 'historical',
    description: 'Sentenced under Article 58 to the corrective labour camps — the Gulag as economic institution, extracting labour from anyone the Soviet state wished to classify as enemy.',
    intent: 'both',
    notes: 'Set by ss_gulag_arrest. Arc: arrest, Stalin death/amnesty release, 101-km rule, late silence.',
  },

  post_gulag: {
    weight: 'major',
    category: 'historical',
    description: 'Released from the Gulag after Stalin\'s death — free but prohibited from major cities, without transport, money, or documents, in a country that had no category for the formerly imprisoned.',
    intent: 'year_texture',
    notes: 'Set by ss_gulag_release. Gates late echo event ss_gulag_late_echo.',
  },

  pass_law_survivor: {
    weight: 'major',
    category: 'historical',
    description: 'Arrested under South Africa\'s pass laws — imprisoned for being in the wrong district without the right endorsement in the pass book every Black South African over sixteen was required to carry.',
    intent: 'both',
    notes: 'Set by ss_apartheid_pass_arrest. Echo event: first vote 1994.',
  },

  // ─── DRC DEPTH ────────────────────────────────────────────────────────────────

  zaire_teacher_generation: {
    weight: 'moderate',
    category: 'geographic',
    description: 'Taught in Zaire during the Mobutu era — the highest social status in the village, unpaid for months, writing lessons in charcoal when the chalk ran out.',
    intent: 'none',
    notes: 'Set by drc_zaire_teacher. Terminal — context in event prose.',
  },

  second_congo_war_urban_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived in Bukavu or eastern Congo during the Second Congo War — navigating the gap between radio accounts and a colleague\'s information about who controlled the road.',
    intent: 'none',
    notes: 'Set by drc_bukavu_1998. Terminal — context in event prose.',
  },

  // ─── PALESTINIAN CAMP DEPTH ───────────────────────────────────────────────────

  third_generation_refugee: {
    weight: 'major',
    category: 'displacement',
    description: 'Third-generation Palestinian refugee — born in a camp whose grandparents arrived in 1948, the key to a door that no longer exists kept on a hook by the entrance.',
    intent: 'both',
    notes: 'Set by pd_third_generation_key. Arc in events_palestine_depth.js.',
  },

  unrwa_educated: {
    weight: 'moderate',
    category: 'identity',
    description: 'Educated in an UNRWA school inside a refugee camp — taught that you come from somewhere else, Palestine in the textbook alongside cities you have never seen.',
    intent: 'none',
    notes: 'Set by pd_unrwa_school. Terminal — context in event prose.',
  },

  // ─── PERU DEPTH ───────────────────────────────────────────────────────────────

  per_dep_lima_migrant: {
    weight: 'moderate',
    category: 'migration',
    description: 'Serrano who migrated to Lima — the accent flattened or kept, the barriada built over years, the city absorbing and not-absorbing simultaneously.',
    intent: 'event',
    notes: 'Set by per_dep_serrano_lima. Follow-through: per_dep_sierra_late_reckoning (age 60+).',
  },

  per_dep_smelter_generation: {
    weight: 'moderate',
    category: 'health',
    description: 'Grew up near the La Oroya smelter — 99% of children with blood lead above WHO threshold, the company disputing the findings while the lungs did not wait.',
    intent: 'event',
    notes: 'Set by per_dep_la_oroya. Follow-through: per_dep_smelter_health_echo (late-life health cost).',
  },

  per_dep_nikkei_identity: {
    weight: 'moderate',
    category: 'identity',
    description: 'Nikkei-Peruvian — Japanese by descent, Peruvian by birth and culture, neither fully Japanese nor not, a category specific to Peru.',
    intent: 'year_texture',
    notes: 'Set by per_dep_nikkei.',
  },

  per_dep_afro_coast: {
    weight: 'moderate',
    category: 'identity',
    description: 'Afro-Peruvian from the southern coastal communities of Chincha or Cañete — festejo and landó, the cajón, three hundred years of culture built in the gap between visibility and recognition.',
    intent: 'year_texture',
    notes: 'Set by per_dep_afro_peruvian.',
  },

  per_dep_coca_vraem: {
    weight: 'moderate',
    category: 'economic',
    description: 'Grew up in the VRAEM coca economy — the highest-producing coca valley in the world, the helicopter eradication, the alternative crops that required infrastructure that wasn\'t there.',
    intent: 'year_texture',
    notes: 'Set by per_dep_vraem_coca.',
  },

  per_dep_castillo_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the Castillo 2021 election and its aftermath — the first serrano president, the sixty dead in the south when the police fired on protesters who had voted for him.',
    intent: 'year_texture',
    notes: 'Set by per_dep_castillo_2021.',
  },

}
