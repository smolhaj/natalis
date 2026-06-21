/**
 * IDENTITY_FLAGS — identity flags for the natalis flag system.
 * Auto-split from src/data/flags.js by scripts/split_flags.py
 */
export const IDENTITY_FLAGS = {

  experienced_racism: {
    weight: 'major',
    category: 'trauma',
    description: 'Character has experienced racial discrimination in a significant encounter.',
    intent: 'both',
    timestamped: true,
  },

  war_childhood: {
    weight: 'major',
    category: 'trauma',
    description: 'Character grew up during active armed conflict — artillery, checkpoints, displacement as a child.',
    intent: 'both',
    notes: 'Set 21x across many modules. Has ribbon and some event guards but missing year texture path. High priority.',
  },

  civil_war_lived: {
    weight: 'major',
    category: 'trauma',
    description: 'Character lived through a civil war as an adult — not just a child witness.',
    intent: 'both',
    notes: 'followthrough_4 has a news echo but no year texture path.',
  },

  conflict_zone_childhood: {
    weight: 'major',
    category: 'trauma',
    description: 'Grew up in a conflict zone; related to war_childhood but distinct (zone vs active war).',
    intent: 'year_texture',
  },

  genocide_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Character survived a genocide — Rwanda, Cambodia, Bosnia, etc.',
    intent: 'both',
    notes: 'Has ribbon; no dedicated year texture path. One of the heaviest flags with no prose echo.',
  },

  torture_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'Character was tortured by state or non-state actors.',
    intent: 'both',
    notes: 'Set in events_followthrough_9.js for political prisoners under authoritarian regimes (fires while inPrison). Three follow-through events: body memory (midlife), naming it (late). Year texture path in buildYearTexture.',
  },

  traumatized_by_violence: {
    weight: 'major',
    category: 'trauma',
    description: 'Character witnessed or experienced severe violence that left lasting psychological marks.',
    intent: 'both',
    notes: 'Set in events_conflict_childhood.js (conf_direct_violence), events_crosscutting.js (cc_bombardment_first_night), events_gang.js (gang_violence_witnessed accept branch). Follow-through events in followthrough_9. Year texture in buildYearTexture.',
  },

  conflict_injury: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Character was physically injured during armed conflict.',
    intent: 'year_texture',
    notes: 'GENUINE GAP — not set via addFlag() anywhere. Should be added to conflict events with a physical injury branch.',
  },

  famine_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Character survived a famine as an active participant (not just observer).',
    intent: 'event',
    notes: 'Triggers the famine personal arc (events_followthrough_5.js). famine_memory is the downstream flag.',
  },

  famine_memory: {
    weight: 'major',
    category: 'trauma',
    description: 'The hoarding reflex and food relationship that persists decades after a famine.',
    intent: 'both',
    timestamped: true,
    notes: 'Has year texture path (pantry check). Should also fire in some relationship/partner contexts.',
  },

  boarding_school: {
    weight: 'major',
    category: 'trauma',
    description: 'Character was sent to boarding school — often a site of institutional trauma, disconnection, or violence.',
    intent: 'both',
    timestamped: true,
  },

  lgbtq_family_rejection: {
    weight: 'major',
    category: 'trauma',
    description: 'Character was rejected by their family upon coming out.',
    intent: 'both',
    timestamped: true,
  },

  abusive_relationship: {
    weight: 'major',
    category: 'trauma',
    description: 'Character was in an abusive relationship — emotional, physical, or both.',
    intent: 'both',
    notes: 'Has followthrough event (anxiety with new partner) but no year texture path.',
  },

  interrogated_by_state: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Questioned by police, secret service, or political authorities.',
    intent: 'year_texture',
    notes: 'Has hypervigilance followthrough event. Year texture path missing.',
  },

  political_prisoner: {
    weight: 'major',
    category: 'trauma',
    description: 'Character was imprisoned for political reasons — dissent, identity, or affiliation.',
    intent: 'both',
    notes: 'Post-release arc exists (events_postrelease.js). No year texture path once released.',
  },

  child_soldier: {
    weight: 'major',
    category: 'trauma',
    description: 'Character was conscripted or recruited as a child soldier.',
    intent: 'both',
    notes: 'Clear orphan — set in conflict events, checked only in ribbons.',
  },

  first_gen_graduate: {
    weight: 'major',
    category: 'identity',
    description: 'First in family to complete university — carries pride, rupture, and expectation.',
    intent: 'both',
    notes: 'Has followthrough event and ribbon. Year texture path present.',
  },

  first_gen_university: {
    weight: 'major',
    category: 'identity',
    description: 'First in family to attend university (may not have graduated).',
    intent: 'year_texture',
    notes: 'Year texture path exists. followthrough coverage thinner than first_gen_graduate.',
  },

  double_consciousness: {
    weight: 'major',
    category: 'identity',
    description: 'Character navigates two worlds simultaneously — minority/majority, diaspora/origin, etc.',
    intent: 'year_texture',
    notes: 'Has followthrough event. Year texture path missing.',
  },

  independence_generation_self: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character was alive and aware when their country achieved independence.',
    intent: 'event',
    notes: 'Has year texture path and followthrough_5 event.',
  },

  liberation_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character grew up in the feminist liberation era and carries that formation.',
    intent: 'event',
    notes: 'followthrough_6 covers this.',
  },

  civil_rights_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character was shaped by the civil rights movement — as participant or witness.',
    intent: 'event',
    notes: 'Year texture path exists (late_life). followthrough_5 covers this.',
  },

  cold_war_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character grew up under the shadow of Cold War nuclear anxiety and ideology.',
    intent: 'year_texture',
    notes: 'Set by world events. No year texture path or character-level follow-through. Clear gap.',
  },

  end_of_history_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Character absorbed the 1990s optimism that liberal democracy had won.',
    intent: 'year_texture',
    notes: 'Set by internet era events. No year texture.',
  },

  apartheid_era: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character lived under apartheid — Black, Coloured, or white South African.',
    intent: 'year_texture',
    notes: 'Set in South Africa events. No year texture path. Gap.',
  },

  apartheid_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character was shaped by the apartheid era — the political and moral formation.',
    intent: 'year_texture',
    notes: 'Set by world events. No dedicated year texture. Gap.',
  },

  post_apartheid_realist: {
    weight: 'minor',
    category: 'identity',
    description: 'Held the 1994 hope at arm\'s length — watching the gap between democratic symbolism and the actual arithmetic of land and inequality.',
    intent: 'none',
    notes: 'Set by sa_mandela_era_hope (realist choice). No downstream event needed.',
  },

  loadshedding_generation: {
    weight: 'moderate',
    category: 'experience',
    description: 'South African character shaped by Eskom load-shedding — the schedule on the phone, Stage 4, Stage 6, the inverter, the generator, the productive hours of the country cut by managed state failure.',
    intent: 'year_texture',
    notes: 'Set by sa_loadshedding.',
  },

  apartheid_pass_book: {
    weight: 'major',
    category: 'identity',
    description: 'Carried the apartheid-era passbook (dompas) — the internal document that said where a Black South African was permitted to be, at what hours, subject to police check at any time.',
    intent: 'year_texture',
    notes: 'Set by cities_extended.js Johannesburg pass laws event and world event. South Africa Black/Coloured characters pre-1986.',
  },

  lagos_tech_generation: {
    weight: 'minor',
    category: 'experience',
    description: 'Part of the Lagos tech ecosystem (2010s–2020s) — Andela, Paystack, Flutterwave, the Silicon Lagoon; building around infrastructure failure rather than waiting for it to be resolved.',
    intent: 'none',
    notes: 'Set by nga_tech_generation. No downstream event needed.',
  },

  chernobyl_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character lived through the Chernobyl disaster in the Soviet Union or Eastern bloc.',
    intent: 'event',
    notes: 'Industrial arc events handle this. chernobyl_liquidator is the deeper flag.',
  },

  dissident_reader: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character read forbidden literature in an authoritarian context.',
    intent: 'event',
    notes: 'followthrough_4 has social cost event. Year texture path exists (brief).',
  },

  dissident_writer: {
    weight: 'major',
    category: 'identity',
    description: 'Character wrote or distributed banned content under an authoritarian regime.',
    intent: 'both',
    notes: 'followthrough_4 has arrest risk event. Year texture path present.',
  },

  learned_silence: {
    weight: 'major',
    category: 'identity',
    description: 'Character learned to self-censor in an authoritarian or dangerous context.',
    intent: 'both',
    notes: 'Has followthrough event and year texture path. Reasonably covered.',
  },

  authoritarian_childhood: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character grew up under an authoritarian system that shaped their relationship to authority.',
    intent: 'year_texture',
    notes: 'Year texture path shared with learned_silence.',
  },

  rural_to_urban: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character moved from a rural area to a city — the rupture with origin.',
    intent: 'event',
    notes: 'Has followthrough event (village return moment). Year texture thin.',
  },

  digital_leapfrog: {
    weight: 'minor',
    category: 'identity',
    description: 'Character skipped landline era and went straight to mobile technology.',
    intent: 'none',
    notes: 'Texture flag; no follow-through required.',
  },

  russia_ukraine_veteran: {
    weight: 'major',
    category: 'trauma',
    description: 'Served in Russia\'s Ukraine war — answered the mobilization call, carrying what was found there versus what the briefing described.',
    intent: 'year_texture',
    notes: 'Set by ru_mobilization_2022 (answered call choice).',
  },

  soviet_afghan_veteran: {
    weight: 'major',
    category: 'trauma',
    description: 'Served in the Soviet-Afghan War (1979-1989) — the zinc coffins, the altitude sickness, the mujahideen, the country that greeted you with silence when you came home.',
    intent: 'both',
    notes: 'Set by ru_afghan_war_served event. Needs year texture and a late-life follow-through event.',
  },

  beslan_generation: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Shaped by the Beslan school siege (September 1-3, 2004) — 334 dead, 186 of them children, the three days of television, the numbers that were official and the numbers that were not.',
    intent: 'year_texture',
    notes: 'Set by ru_beslan_2004. Texture only.',
  },

  veteran_unthanked: {
    weight: 'moderate',
    category: 'identity',
    description: 'Returned from a war the state preferred not to acknowledge — Chechnya, Afghanistan, other conflicts where the official narrative erased the soldiers\' experience.',
    intent: 'year_texture',
    notes: 'Set by ru_chechnya_war (served choice) and soldier_arc events.',
  },

  holodomor_family_memory: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Ukrainian character who grew up with family memory of the Holodomor (1932-33 famine) — what the grandparents did not speak about, and what they did.',
    intent: 'year_texture',
    notes: 'Set by ukr_holodomor_family. Texture only.',
  },

  ukrainian_language_identity: {
    weight: 'minor',
    category: 'identity',
    description: 'Chose Ukrainian over Russian as a daily language after independence — the political act embedded in the language choice in an officially bilingual country.',
    intent: 'none',
    notes: 'Set by ukr_language_question. Texture only; identity signal.',
  },

  ukraine_2022_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Ukrainian civilian who lived through the February 2022 full-scale invasion — the sirens, the shelters, the specific choice of where to go, what the city looked like in the weeks after.',
    intent: 'year_texture',
    notes: 'Set by ukr_invasion_2022 (stayed choice).',
  },

  gulag_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the Soviet gulag system — arrested under Article 58, sent to Kolyma/Vorkuta/Karaganda, lived inside the ration-tied-to-output system, survived the social hierarchy of blatnye vs. politicals.',
    intent: 'both',
    notes: 'Set by ps_gulag_arrest. Follow-throughs: ps_gulag_camp, ps_gulag_release, ps_gulag_late_reckoning. Year texture in buildYearTexture.',
  },

  carries_family_silence: {
    weight: 'major',
    category: 'identity',
    description: 'Grew up with the shape of an unspeakable family history — the box in the wardrobe, the sentence that stops, the name said once and never again.',
    intent: 'year_texture',
    notes: 'Set by all family silence childhood events. The unifying flag for inherited generational trauma across all origins.',
  },

  food_insecurity_inherited: {
    weight: 'moderate',
    category: 'identity',
    description: 'Raised in a family marked by famine memory — grandparent who cannot watch food wasted, the specific hunger that outlasts the event.',
    intent: 'year_texture',
    notes: 'Set by fs_great_leap (Great Leap famine family memory). The texture of inherited food anxiety.',
  },

  partition_family_lived: {
    weight: 'moderate',
    category: 'identity',
    description: 'Family was displaced by the India-Pakistan Partition — the ancestral address recited like a prayer, the furniture left behind, the city that is now the wrong country.',
    intent: 'year_texture',
    notes: 'Set by fs_partition. Partition-specific variant of carries_family_silence.',
  },

  disappeared_family_known: {
    weight: 'major',
    category: 'identity',
    description: 'Has a disappeared family member — a name without a story, the absence that was not explained until adulthood.',
    intent: 'year_texture',
    notes: 'Set by fs_disappeared (Argentina junta family memory).',
  },

  post_genocide_generation: {
    weight: 'major',
    category: 'identity',
    description: 'Grew up in the aftermath of genocide — counting on fingers, the neighbours watched differently, the word inadequate when it finally arrived.',
    intent: 'year_texture',
    notes: 'Set by fs_genocide (Rwanda/Burundi family memory).',
  },

  family_history_known: {
    weight: 'moderate',
    category: 'identity',
    description: 'Asked the question and received the answer — the family silence broken in adulthood, the story now carried instead of the absence.',
    intent: 'year_texture',
    notes: 'Set by fs_adult_asks (choice: listened to everything). Follow-through for carries_family_silence.',
  },

  family_history_partial: {
    weight: 'minor',
    category: 'identity',
    description: 'Asked and stopped partway — not yet ready for the full story, carrying a partial version of the family silence.',
    intent: 'year_texture',
    notes: 'Set by fs_adult_asks (choice: stopped partway).',
  },

  generational_weight_felt: {
    weight: 'moderate',
    category: 'identity',
    description: 'At midlife understood the specific work of a parent\'s silence — now carrying one\'s own version of the same shape.',
    intent: 'year_texture',
    notes: 'Set by fs_midlife_weight. The recognition that silence transfers across generations.',
  },

  reconstruction_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Came of age during Lebanon\'s 1990s reconstruction — the brief belief that Beirut would become what it once promised to be.',
    intent: 'year_texture',
    notes: 'Set by events_lebanon.js (lbn_solidere_belief). Follow-through in late life when the belief is audited against events.',
  },

  lira_collapse_lived: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the Lebanese pound hyperinflation — savings wiped, prices changing by the hour.',
    intent: 'both',
    notes: 'Set by events_lebanon.js (lbn_bank_freeze). Connects to existing hyperinflation patterns in year texture.',
  },

  infrastructure_collapse_lived: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Lived through systemic infrastructure failure — state electricity measured in hours, generator subscriptions, diesel queues.',
    intent: 'year_texture',
    notes: 'Set by events_lebanon.js (lbn_generator_economy). Texture label; cooldown prevents overfire.',
  },

  beirut_blast_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the August 4 2020 Beirut port explosion — 2,750 tonnes of ammonium nitrate, 218 dead, 300,000 homeless, windows shattered 240km away.',
    intent: 'year_texture',
    notes: 'Set by events_lebanon.js (lbn_port_explosion) and world event we_beirut_blast_2020.',
  },

  ofw_passport_held: {
    weight: 'moderate',
    category: 'rights',
    description: 'OFW worker\'s passport confiscated by Gulf employer (kafala system — "held for safekeeping").',
    intent: 'event',
    notes: 'Set by ofw_arrival_gulf. Gates ribbon the_kafala_survivor. The condition is the point — no single resolution event exists.',
  },

  intellectual_target: {
    weight: 'major',
    category: 'trauma',
    description: 'Character was threatened or targeted because of their intellectual or creative work during the Black Decade.',
    intent: 'event',
    notes: 'Set by alg_journalist_target. Follow-through via existing arts and censored_work flags.',
  },

  decennie_noire_memory: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Character has arrived at a late-life reckoning with the Black Decade — the impunity, the amnesty, the unexamined past.',
    intent: 'year_texture',
    notes: 'Set by alg_late_reckoning (auto-resolve, late_life). Year-texture path added in gameEngine.js. Follow-through echo: ft10_decennie_noire_echo.',
  },

  chinese_culture_returned: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character reclaimed or supported the revival of Chinese cultural expression in Indonesia after the 2000 ban was lifted.',
    intent: 'event',
    notes: 'Set by id98_ban_lifted and id98_decade_identity. Ribbon: the_returned_culture.',
  },

  id98_rebuilt: {
    weight: 'moderate',
    category: 'resilience',
    description: 'Character or family rebuilt their business/life in Indonesia after the 1998 riots rather than emigrating.',
    intent: 'event',
    notes: 'Set by id98_aftermath_rebuild (rebuilt or stayed_changed paths).',
  },

  id98_witness_bystander: {
    weight: 'major',
    category: 'moral',
    description: 'Non-Chinese Indonesian character witnessed the targeting of ethnic Chinese during the May 1998 riots and faced a choice about intervention.',
    intent: 'both',
    notes: 'Set by id98_bystander. The choice (help/watch) shapes karma and carries into later reflection.',
  },

  id_1965_stained: {
    weight: 'major',
    category: 'trauma',
    description: 'A family member was taken or killed in the 1965–66 anti-communist purge — carried as an undeclared grief through thirty years of New Order silence.',
    intent: 'both',
    notes: 'Set by id_1965_purge (family taken choice). The silence is enforced by the New Order; grief is privatized.',
  },

  id_bali_bombing_generation: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Lived through the October 12, 2002 Bali bombings — 202 dead, Indonesia\'s national reckoning with religious extremism.',
    intent: 'both',
    notes: 'Set by id_bali_bombing_2002.',
  },

  id_tsunami_2004_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the December 26, 2004 Indian Ocean tsunami — 170,000 dead in Aceh alone, 230,000 total across the Indian Ocean.',
    intent: 'both',
    notes: 'Set by id_tsunami_2004. Rural-gated to approximate Acehnese/coastal Sumatran experience.',
  },

  id_papua_identity: {
    weight: 'major',
    category: 'identity',
    description: 'Carries Papuan indigenous identity in Indonesia — the Morning Star flag, customary land, and structural exclusion from what "Indonesian" was designed to contain.',
    intent: 'both',
    notes: 'Set by id_papua_identity event. Papuan ethnicity gate.',
  },

  kurd_identity_suppressed: {
    weight: 'major',
    category: 'identity',
    description: 'Kurdish character\'s language and cultural identity were officially suppressed — through school systems, naming laws, or citizenship denial.',
    intent: 'both',
    notes: 'Set by kurd_tr_language_school (Turkey, pre-1991) and kurd_sy_stateless (Syria, pre-2011). Follow-through: kurd_late_reckoning.',
  },

  kurd_language_moment: {
    weight: 'moderate',
    category: 'identity',
    description: 'Kurdish character experienced the specific moment of hearing their language publicly for the first time after decades of suppression.',
    intent: 'event',
    notes: 'Set by kurd_tr_language_lifted (pulling over to listen to the radio).',
  },

  debt_recovered: {
    weight: 'moderate',
    category: 'resilience',
    description: 'Character has recovered from a debt crisis — credit rebuilt, obligations discharged, the specific absence of a weight carried for years.',
    intent: 'both',
    notes: 'Set by debt_decade_clean and debt_late_life_free. Ribbon: the_debt_recovered.',
  },

  earthquake_2010_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'Character survived the January 12, 2010 Haiti earthquake — 35 seconds, 220,000+ dead, 1.5 million displaced.',
    intent: 'both',
    notes: 'Set by hai_earthquake_2010. Follow-through: hai_earthquake_camp. Ribbon: the_haiti_earthquake.',
  },

  earthquake_camp_survivor: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Character lived in a displacement camp after the 2010 earthquake — blue UNHCR tarpaulins, twice-weekly water trucks, UN cholera.',
    intent: 'event',
    notes: 'Set by hai_earthquake_camp.',
  },

  earthquake_survivor: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Survived a major earthquake — the thirty-five seconds that reorganised the city and the memory.',
    intent: 'year_texture',
    notes: 'Set by Haiti earthquake events and worldEvents Tangshan/Nepal/Mexico/Japan earthquake world events.',
  },

  dual_identity: {
    weight: 'moderate',
    category: 'identity',
    description: 'Carries two cultural identities simultaneously — the community inside the community, the code-switching that is not a choice but a lived competence.',
    intent: 'year_texture',
    notes: 'Set by events_culture.js (minority community finding) and events_society.js (dual name/identity). Rich year texture potential.',
  },

  class_awareness: {
    weight: 'minor',
    category: 'identity',
    description: 'Developed early class consciousness — noticing the domestic workers\' names, the arrangement others find unusual, the thing that was taken for granted.',
    intent: 'year_texture',
    notes: 'Set by events_culture.js (wealthy Gulf/developing) and events_texture.js (domestic service observation).',
  },

  failure_integrated: {
    weight: 'minor',
    category: 'identity',
    description: 'Metabolised a major failure and carried it forward as information rather than shame — the specific work of making a failure useful.',
    intent: 'year_texture',
    notes: 'Set by events_coherence.js and events_early_life.js (first real failure choice).',
  },

  bolivarian_collapse_lived: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the collapse of the Bolivarian project — the supermarket queues at 4am, the CLAP food bags, the medicines that couldn\'t be found, the currency that lost six zeros.',
    intent: 'year_texture',
    notes: 'Set by ven_escasez.',
  },

  ven_stayer: {
    weight: 'moderate',
    category: 'identity',
    description: 'Stayed in Venezuela when seven million left — the specific identity of the ones who remained while the country emptied, watching the departures from the same street.',
    intent: 'year_texture',
    notes: 'Set by ven_emigrar (stayed choice) and ven_emigrar (left choice, co-set).',
  },

  col_bogotazo_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Grew up in the shadow of El Bogotazo — Gaitán\'s assassination April 9 1948, the burning of the capital, the beginning of the decade of Liberal/Conservative violence.',
    intent: 'year_texture',
    notes: 'Set by col_bogotazo.',
  },

  col_violencia_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through La Violencia (1948–58) — the rural partisan massacres, the families divided by Liberal/Conservative allegiance, the displacement from countryside to city.',
    intent: 'year_texture',
    notes: 'Set by col_la_violencia_rural.',
  },

  col_cartel_era: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the Medellín cartel years (1984–93) — car bombs, plata o plomo, the president and the justice minister and the editor and the candidates killed.',
    intent: 'year_texture',
    notes: 'Set by col_cartel_medellin.',
  },

  col_paramilitary_era: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived under AUC paramilitary control (1997–2003) — the massacres, the informant economy, the army that sometimes arrived after.',
    intent: 'year_texture',
    notes: 'Set by col_paramilitares.',
  },

  col_estrato_known: {
    weight: 'minor',
    category: 'identity',
    description: 'Carries the estratificación number — the 1–6 official class designation printed on every Colombian utility bill, present in every social introduction\'s subtext.',
    intent: 'year_texture',
    notes: 'Set by col_estratificacion.',
  },

  irn_double_life: {
    weight: 'moderate',
    category: 'identity',
    description: 'Navigated Iran\'s public/private split — the satellite dish on the roof, the party behind closed curtains, the hijab folded in the bag, the relationship not acknowledged on the street.',
    intent: 'year_texture',
    notes: 'Set by irn_private_public (both choices).',
  },

  irn_hijab_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Female: lived under mandatory hijab enforcement — the gasht-e ershad car, the map of which streets patrol which days, the morning calculation of coat and route.',
    intent: 'year_texture',
    notes: 'Set by irn_hijab_daily (both choices). Female characters only.',
  },

  irn_stayer_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Stayed in Iran when the WhatsApp group filled with foreign-country flags — the decision to remain made against the background of the people who left.',
    intent: 'year_texture',
    notes: 'Set by irn_brain_drain (stay choice).',
  },

  sau_siege_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Was in Saudi Arabia during the 1979 Grand Mosque siege — Juhayman\'s two-week occupation of the Haram in Mecca, 450+ dead, the state\'s response being intensified religious conservatism.',
    intent: 'year_texture',
    notes: 'Set by sau_grand_mosque_1979.',
  },

  sau_mutaween_era: {
    weight: 'moderate',
    category: 'identity',
    description: 'Lived under the mutaween (CPVPV) — the religious police who enforced gender segregation, dress codes, prayer times, and the geography of public space until they lost arrest powers in 2016.',
    intent: 'year_texture',
    notes: 'Set by sau_mutaween (both choices).',
  },

  sau_wasta_system: {
    weight: 'minor',
    category: 'identity',
    description: 'Navigated the wasta system — connections, influence, the phone call that does in two days what the official channel takes six months — and understands what it builds and what it prevents.',
    intent: 'year_texture',
    notes: 'Set by sau_wasta (both choices).',
  },

  bedouin_nomad_childhood: {
    weight: 'major',
    category: 'identity',
    description: 'Had a nomadic Bedouin childhood — seasonal migration, tent assembly, livestock knowledge, navigation by stars and terrain.',
    intent: 'year_texture',
    notes: 'Set by bdo_tent_childhood (auto-resolve). Powers bdo_settlement_government guard.',
  },

  bdo_settled_first_gen: {
    weight: 'moderate',
    category: 'identity',
    description: 'First generation of Bedouin to settle permanently — the hinge between nomadic ancestry and sedentary descendants.',
    intent: 'event',
    notes: 'Set by bdo_settlement_government (both choices). Follow-through: bdo_navigation_lost (midlife), bdo_late_reckoning (late_life).',
  },

  bedouin_knowledge_keeper: {
    weight: 'minor',
    category: 'identity',
    description: 'Documented nomadic navigation knowledge — star names, route markings, water-reading signs — before it disappeared from living memory.',
    intent: 'none',
    notes: 'Set by bdo_navigation_lost (write it down branch). Self-contained.',
  },

  showa_salaryman: {
    weight: 'moderate',
    category: 'identity',
    description: 'Lived the salaryman compact — lifetime employment at one company, the 6am train and midnight return, the section chief\'s karaoke, the hanami, the karoshi that is always somewhere nearby.',
    intent: 'year_texture',
    notes: 'Set by jpn_salaryman_life (accept choice).',
  },

  ol_ceiling_lived: {
    weight: 'moderate',
    category: 'identity',
    description: 'Navigated Japan\'s OL (Office Lady) structure — the tea poured at meetings where men decided things, the education that exceeded the role, the ceiling encoded in the employment contract.',
    intent: 'year_texture',
    notes: 'Set by jpn_office_lady (both choices).',
  },

  burakumin_identity: {
    weight: 'major',
    category: 'identity',
    description: 'Descended from Japan\'s feudal outcast caste — legally emancipated 1871, discrimination persisting in marriage vetoes, residential patterns, the things said behind you and not to your face.',
    intent: 'year_texture',
    notes: 'Set by jpn_burakumin. Requires ethnicity burakumin.',
  },

  hikikomori_experience: {
    weight: 'major',
    category: 'psychological',
    description: 'Withdrew from society — months or years in a room, the delivery slot, the screen, the outside\'s specific hardness. One of an estimated million by 2010.',
    intent: 'year_texture',
    notes: 'Set by jpn_hikikomori (both choices). Gated on low happiness or charisma.',
  },

  fukushima_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Was in Japan on March 11, 2011 — the 9.0 earthquake, the tsunami, the Fukushima meltdowns, 19,000 dead, the word "anzen" no longer fitting the sentence it was placed in.',
    intent: 'year_texture',
    notes: 'Set by jpn_fukushima. Text branches for Tohoku (rural) vs. Tokyo (urban).',
  },

  jpn_caregiver_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Took on elder care in Japan\'s aging society — the waiting list for facilities, the kaigo arithmetic of one working-age person per dependent, the gendered distribution of who provides it.',
    intent: 'year_texture',
    notes: 'Set by jpn_aging_parent (both choices).',
  },

  hibakusha_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Atomic bomb survivor — survived Hiroshima or Nagasaki, carrying the flash, the burns, the radiation illness, and the subsequent decades of social discrimination.',
    intent: 'year_texture',
    notes: 'Set by jpn_hibakusha. Also sets the hibakusha flag to gate ca2 downstream events (marriage discrimination, stigma).',
  },

  hibakusha_silent: {
    weight: 'moderate',
    category: 'identity',
    description: 'Atomic bomb survivor who chose not to disclose — carrying the secret of the bomb alongside its physical effects.',
    intent: 'year_texture',
    notes: 'Set by jpn_hibakusha (silence choice). The weight of maintaining the secret over decades.',
  },

  zainichi_identity: {
    weight: 'major',
    category: 'identity',
    description: 'Zainichi Korean — Korean-Japanese living in Japan across generations, navigating alien registration, fingerprinting, name erasure, and the question of what citizenship is for.',
    intent: 'year_texture',
    notes: 'Set by jpn_zainichi (dual identity and resist choices). One of the most historically significant minority identities in East Asia.',
  },

  zainichi_naturalized: {
    weight: 'moderate',
    category: 'identity',
    description: 'Zainichi Korean who naturalized Japanese citizenship — the Korean name leaves the official register, the identity does not.',
    intent: 'year_texture',
    notes: 'Set by jpn_zainichi (naturalize choice).',
  },

  aum_proximate: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Was on or near an affected subway line on March 20, 1995 — or knew someone who was.',
    intent: 'year_texture',
    notes: 'Set by jpn_aum_sarin_1995 (proximate choice).',
  },

  ainu_identity: {
    weight: 'moderate',
    category: 'identity',
    description: 'Ainu identity — Japan\'s indigenous Hokkaido people, dispossessed through 1899 colonial legislation, denied indigenous recognition until 2019.',
    intent: 'year_texture',
    notes: 'Set by jpn_ainu (both choices). The Ainu are approximately 25,000 people; land and language rights remain contested.',
  },

  ainu_revival: {
    weight: 'minor',
    category: 'identity',
    description: 'Participated in Ainu cultural revival — learning the nearly-lost language, reconnecting to practices whose chain of transmission was broken by colonisation.',
    intent: 'year_texture',
    notes: 'Set by jpn_ainu (revival choice).',
  },

  per_sendero_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Grew up in Peru during the Sendero Luminoso years (1981–92) — the school closures, the ronda campesina patrols, the bodies on the road in the morning. 69,000 dead.',
    intent: 'year_texture',
    notes: 'Set by per_sendero_childhood. Text branches for Quechua vs. coastal. Gates per_cvr event.',
  },

  per_sterilization_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the forced sterilization campaign (1996–2000) — one of the 270,000 Quechua-speaking women sterilized under a program officially called voluntary family planning.',
    intent: 'year_texture',
    notes: 'Set by per_sterilization (signed choice). Gates per_cvr alternate text. Surfaced in late-life reckoning.',
  },

  per_lima_migrant: {
    weight: 'moderate',
    category: 'identity',
    description: 'An internal migrant navigating Lima — the serrano/cholo distinction, the city that received you and the city that sees you, the gap between those two things.',
    intent: 'year_texture',
    notes: 'Set by per_lima_racism (both choices).',
  },

  femicidio_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Female Mexican character shaped by the ongoing femicide crisis — the arithmetic of what time, which route, who to text when you arrive.',
    intent: 'year_texture',
    notes: 'Set by la_mex_femicidio. Year texture for Mexican women; can surface as persistent background anxiety.',
  },

  earthquake_volunteer: {
    weight: 'moderate',
    category: 'moral',
    description: 'Went into the rubble during a disaster to help dig — not an official, not a soldier, just a person with their hands.',
    intent: 'none',
    notes: 'Set by la_mex_1985_earthquake (volunteer choice). Captures the spontaneous civilian response to the 1985 Mexico earthquake.',
  },

  solidarity_citizen: {
    weight: 'minor',
    category: 'identity',
    description: 'Responded directly to a disaster with physical presence — bucket chains, rescue support, immediate civilian solidarity.',
    intent: 'none',
    notes: 'Set by la_mex_2017_earthquake and similar civilian-response events.',
  },

  cub_santeria_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up practicing Santería under Cuba\'s atheist state — the orishas in the back room, the babalawo who doesn\'t advertise.',
    intent: 'year_texture',
    notes: 'Set by cub_santeria_underground for folk_religion Cubans. Year texture (two registers: revolutionary and Yoruba-inflected).',
  },

  laos_alms_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up with the Buddhist morning alms round as daily texture — kneeling at dawn, giving sticky rice, the social fabric of merit maintained through the gesture.',
    intent: 'year_texture',
    notes: 'Set by laos_alms_round. Year texture (what you give out of the house at dawn comes back).',
  },

  laos_mekong_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up with the Mekong as both boundary and commute — Thailand visible from the bank, the kip and baht savings, the porous border economy.',
    intent: 'year_texture',
    notes: 'Set by laos_mekong_economy. Year texture (the river that makes the country feel bounded and open simultaneously).',
  },

  nam_san_displaced: {
    weight: 'major',
    category: 'identity',
    description: 'San character evicted from ancestral land into resettlement — losing veldkos knowledge, ancestral waterholes, language; thirty-two speakers of your age.',
    intent: 'year_texture',
    notes: 'Set by nam_san_ancestral_land. Year texture (what the resettlement area came with and didn\'t come with).',
  },

  black_july_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'Tamil Sri Lankan character survived the July 1983 anti-Tamil pogrom in Colombo — electoral registers used to identify Tamil homes, police standing by.',
    intent: 'both',
    notes: 'Set by slk_black_july. Ribbon: the_black_july. A founding event of the Tamil diaspora.',
  },

  amazigh_identity: {
    weight: 'moderate',
    category: 'identity',
    description: 'Amazigh Moroccan character navigates a country where their language was excluded from official life — school in Arabic, name from the approved list.',
    intent: 'both',
    notes: 'Set by mor_amazigh_school and mor_amazigh_name. Follow-through: mor_amazigh_recognition.',
  },

  amazigh_recognition_era: {
    weight: 'minor',
    category: 'identity',
    description: 'Amazigh character witnessed the 2011 constitutional recognition of Tifinagh — ambivalent about whether recognition without resources is meaningful.',
    intent: 'event',
    notes: 'Set by mor_amazigh_recognition (both paths).',
  },

  multilingual_identity: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character lives between languages — arguing in one, dreaming in another, inhabiting a third that exists only in the gaps between them.',
    intent: 'both',
    notes: 'Set by mul_code_switch. Follow-throughs: mul_parent_language_grief, mul_grandparent_tongue.',
  },

  minority_language_speaker: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character speaks a minority or endangered language — one that is not in the official register, may be suppressed, and whose speakers are decreasing.',
    intent: 'both',
    notes: 'Set by language suppression events and cultural identity events. Follow-through: mul_language_death.',
  },

  seen_the_gap: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character has experienced the gap between what was said and what was translated — the word that had no equivalent, the meaning that went on the record as something else.',
    intent: 'event',
    notes: 'Set by mul_interpreter_impossible_word.',
  },

  moral_weight_carried: {
    weight: 'major',
    category: 'moral',
    description: 'Character followed an order or made a decision whose weight has not reduced with time — not unresolved, just present.',
    intent: 'both',
    notes: 'Set by sol_the_order and other high-stakes compliance events. Follow-through: sol_late_reckoning.',
  },

  colonial_category: {
    weight: 'major',
    category: 'identity',
    description: 'Character\'s ethnic identity was fixed and documented by a colonial administration — the ledger entry that became more real than what was said.',
    intent: 'both',
    notes: 'Set by doc_colonial_census. Follow-through: doc_category_becomes_fate.',
  },

  rwa_rtlm_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Heard Radio Mille Collines (RTLM) in 1993-94 — the music, then the names, then the word inyenzi becoming ordinary. The sound that preceded everything.',
    intent: 'year_texture',
    notes: 'Set by rwa_radio_mille_collines. High-weight — RTLM coordinated the genocide.',
  },

  rwa_genocide_witness: {
    weight: 'major',
    category: 'trauma',
    description: 'Alive in Rwanda during the 100 days of April-July 1994 — the roadblocks, the churches, the hundred-day arithmetic. Witness or survivor or perpetrator\'s neighbor — all categories.',
    intent: 'both',
    notes: 'Set by rwa_hundred_days_adolescent and rwa_hundred_days_adult. Connects to genocide_survivor.',
  },

  rwa_goma_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'In the Goma camps after July 1994 — the volcanic rock, the cholera, the génocidaires running the camp committees, the aid system unable to separate perpetrators from refugees.',
    intent: 'year_texture',
    notes: 'Set by rwa_goma_camps. Hutu-gated. Camps destroyed 1996.',
  },

  tajik_peace_generation: {
    weight: 'moderate',
    category: 'moral',
    description: 'Character witnessed the 1997 General Agreement on Peace — watched commanders who gave orders for atrocities receive government uniforms.',
    intent: 'none',
    notes: 'Set by taj_peace_1997. The uncomfortable texture of impunity dressed as reconciliation.',
  },

  turkmenbashi_generation: {
    weight: 'major',
    category: 'identity',
    description: 'Character grew up under Niyazov\'s personality cult — reciting Ruhnama passages, watching January renamed Turkmenbashi, the rotating golden statue.',
    intent: 'year_texture',
    notes: 'Set by tkm_niyazov_cult. The childhood indoctrination that is never entirely shed.',
  },

  turkmenistan_closed_world: {
    weight: 'major',
    category: 'identity',
    description: 'Character lives in Turkmenistan\'s information environment — filtered internet, banned VPNs, passport controls, the permitted-to-leave register.',
    intent: 'year_texture',
    notes: 'Set by tkm_isolation. The normalisation of not knowing what normal is.',
  },

  institutional_doubt: {
    weight: 'moderate',
    category: 'moral',
    description: 'Character began to ask questions of the institution from inside it — noticing the shape of the power they hold, the gap between what is said and what is known.',
    intent: 'both',
    notes: 'Set by cle_ireland_parish_power (noticed branch), cle_yeshiva_compact (uncomfortable branch). Follow-through: cle_ireland_collapse.',
  },

  institutional_complicity: {
    weight: 'major',
    category: 'moral',
    description: 'Character remained inside an institution while knowing of its harms — not perpetrating but not naming. The specific moral position of silence within power.',
    intent: 'both',
    notes: 'Set by cle_ireland_knowledge (silent branch). High weight; affects epitaph. Follow-through: cle_ireland_collapse.',
  },

  institutional_dissent: {
    weight: 'moderate',
    category: 'moral',
    description: 'Character dissented from within their institution — wrote to the bishop, named what they saw, in contexts where this had cost.',
    intent: 'event',
    notes: 'Set by cle_ireland_knowledge (wrote branch).',
  },

  institutional_reckoning: {
    weight: 'major',
    category: 'moral',
    description: 'Character went through the public reckoning of an institution they gave their life to — watching it named for what it was, in real time, from inside.',
    intent: 'event',
    notes: 'Set by cle_ireland_collapse. Terminal event in the Irish clergy arc.',
  },

  sen_casamance_inside: {
    weight: 'major',
    category: 'trauma',
    description: 'From the Casamance region — lived with the low-intensity conflict, demining alerts, roadblocks, neighbours who left, the map of areas where you do not walk',
    intent: 'year_texture',
    notes: 'Set by sen_casamance (inside choice). Year texture: the specific geography of a region that is inside a country and also partly outside it.',
  },

  origin_country_visited: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character visited the country they were born in as an adoptee — landscape matching something they could not have remembered, sharing faces with people who are supposed to be an origin.',
    intent: 'event',
    notes: 'Set by adp_origin_trip. Midlife event; the specific feeling has no single word in either language.',
  },

  maasai_moran: {
    weight: 'major',
    category: 'identity',
    description: 'Completed the moran age-grade initiation — the ceremony, the ochre, the spear, the specific knowledge of cattle and land that comes with the role.',
    intent: 'year_texture',
    notes: 'Set by ken_maasai_moran (auto-resolve). Powers ken_maasai_nairobi_choice guard. Year texture in buildYearTexture for pastoral/cattle memory.',
  },

  maasai_stayed_pastoral: {
    weight: 'moderate',
    category: 'identity',
    description: 'Chose to remain in pastoral Maasai life as the land contracted — the droughts, the shrinking group ranches, the ones who left.',
    intent: 'none',
    notes: 'Set by ken_maasai_nairobi_choice (stayed branch). No follow-through required — the life is the texture.',
  },

  eth_tigray_witnessed: {
    weight: 'major',
    category: 'trauma',
    description: 'Witnessed the 2020-2022 Tigray War — 300,000-500,000 dead, Eritrean troops, systematic rape, the Nobel Peace laureate at war in the north, the communications blackout.',
    intent: 'year_texture',
    notes: 'Set by eth_tigray_war_2020 (both choices).',
  },

  zim_xenophobia_2008: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived or witnessed the May 2008 xenophobic violence in South Africa — 62 killed, 100,000 displaced within South Africa. Started in Alexandra, spread to other townships.',
    intent: 'year_texture',
    notes: 'Set by zim_xenophobic_2008 event. Year texture: the specific weight of that month, remaining in a country where it happened.',
  },

  lost_home: {
    weight: 'major',
    category: 'trauma',
    description: 'Lost the place they called home — through conflict, eviction, displacement, or partition',
    intent: 'both',
    notes: 'Set by conflict childhood, poverty eviction, gentrification, partition world events. Year texture + ft11_lost_home_return.',
  },

  independent_thinker: {
    weight: 'moderate',
    category: 'identity',
    description: 'Habitually reaches their own conclusions; resists conformity to official or social pressure',
    intent: 'year_texture',
    notes: 'Set by career_regime events (resigned on principle, refused loyalty declaration), culture events. Tension arc with pragmatic_compliance.',
  },

  military_service: {
    weight: 'moderate',
    category: 'experience',
    description: 'Completed military service (non-combat; distinct from deployed_to_conflict)',
    intent: 'both',
    notes: 'Set by conscription events, Korea service, gender events. Does NOT gate soldier arc (that requires deployed_to_conflict). Year texture + ft11_military_reunion.',
  },

  pragmatic_compliance: {
    weight: 'moderate',
    category: 'identity',
    description: 'Made pragmatic accommodations with an authoritarian system — signed, joined, complied to survive',
    intent: 'both',
    notes: 'Set by career_regime (loyalty declaration, collectivization), culture (party membership), Kurdish PKK events. Year texture + ft11_compliance_reckoning.',
  },

  passed_checkpoint: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Passed through military or police checkpoints as normalized daily life',
    intent: 'year_texture',
    notes: 'Set by conflict_childhood, Lebanon, Algeria events. Body-memory hypervigilance reflex that outlasts the context.',
  },

  gaokao_survivor: {
    weight: 'moderate',
    category: 'experience',
    description: 'Survived the Chinese university entrance examination — the gaokao',
    intent: 'year_texture',
    notes: 'Set by events_culture.js gaokao events. Performance-under-examination reflex; China-specific pressure psychology.',
  },

  romania_decree_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Romanian woman whose reproductive choices were constrained by Decree 770 (1966–89)',
    intent: 'year_texture',
    notes: 'Set by eur_rom_decree_770. State-mandated pregnancy risk; knowledge shared between women below official channels.',
  },

  romania_orphan_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Spent childhood in Romanian state orphanage system (up to 170,000 children, 1:30 staff ratio)',
    intent: 'year_texture',
    notes: 'Set by eur_rom_orphanage_generation. Emotional neglect; group-management survival skills.',
  },

  securitate_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Grew up under Securitate surveillance in communist Romania — the careful conversations, the neighbour who might be an informer, the gap between what was said and what was meant.',
    intent: 'both',
    notes: 'Set by rom_securitate_childhood. Needs year texture + follow-through for when Securitate files were opened.',
  },

  stayed_when_others_left: {
    weight: 'moderate',
    category: 'identity',
    description: 'Chose to remain in a country or city others fled — transition, conflict, or collapse',
    intent: 'year_texture',
    notes: 'Set by eur_rom_post89_transition (Romania) and potentially other emigration-choice events.',
  },

  hungarian_diaspora_1956: {
    weight: 'major',
    category: 'identity',
    description: 'Left Hungary after the 1956 uprising — one of 200,000 who crossed the Austrian border before it closed',
    intent: 'year_texture',
    notes: 'Set by hun_1956_uprising_adult (left choice).',
  },

  deportation_family_memory: {
    weight: 'major',
    category: 'trauma',
    description: 'Family member deported to Siberia in 1941 or 1949 — the Baltic Soviet deportations; absent relative who shapes identity',
    intent: 'year_texture',
    notes: 'Set by balt_deportation_family. Year texture in buildYearTexture. Follow-through: ft20_deportation_late.',
  },

  russian_minority_baltic: {
    weight: 'major',
    category: 'identity',
    description: 'Russian-speaking minority in Baltic states post-independence — Soviet-era arrivals navigating citizenship laws, non-citizen passports, language requirements',
    intent: 'year_texture',
    notes: 'Set by balt_russian_non_citizen. Follow-through: ft20_russian_minority_late.',
  },

  eu_emigrant_baltic: {
    weight: 'moderate',
    category: 'identity',
    description: 'Left a Baltic state after EU accession 2004 — part of the mass emigration that drained 10–15% of population',
    intent: 'year_texture',
    notes: 'Set by balt_eu_emigration. Follow-through: ft20_eu_emigrant_return.',
  },

  nato_bombing_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the 78-day NATO bombing of Serbia/Belgrade, March–June 1999',
    intent: 'year_texture',
    notes: 'Set by eur_ser_nato_bombing_1999. Two branches: stayed in Belgrade, left city.',
  },

  abkhazia_displaced_connection: {
    weight: 'major',
    category: 'trauma',
    description: 'Has family or close connection to the 250,000 Georgians displaced from Abkhazia in the 1992–93 war',
    intent: 'year_texture',
    notes: 'Set by geo_abkhazia_war.',
  },

  georgian_war_2008: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the 2008 Russia-Georgia war — Russian tanks within 40km of Tbilisi, South Ossetia and Abkhazia occupation',
    intent: 'year_texture',
    notes: 'Set by geo_war_2008. Follow-through: ft21_war_2008_late.',
  },

  geo_supra_keeper: {
    weight: 'minor',
    category: 'identity',
    description: 'Formed by the Georgian supra tradition — the feast, the tamada, the toast as the language of true things',
    intent: 'year_texture',
    notes: 'Set by geo_supra_identity.',
  },

  geo_orthodox_backbone: {
    weight: 'minor',
    category: 'identity',
    description: 'Shaped by Georgian Orthodox identity as national spine — the church that survived Soviet rule as the form of Georgian continuity',
    intent: 'year_texture',
    notes: 'Set by geo_orthodox_identity.',
  },

  geo_testigo_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Late-life witness to the full Georgia arc — April 9 to Rose Revolution to 2008 war to the EU protests',
    intent: 'both',
    notes: 'Set by geo_late_reckoning.',
  },

  dprk_songbun_revealed: {
    weight: 'major',
    category: 'identity',
    description: 'Understood their Songbun class — the family political loyalty class that determines every ceiling, set by grandparents\' choices going back three generations',
    intent: 'year_texture',
    notes: 'Set by dprk_songbun.',
  },

  dprk_loyal_class: {
    weight: 'moderate',
    category: 'identity',
    description: 'Songbun loyal class — access to Pyongyang, university, better work units',
    intent: 'year_texture',
    notes: 'Set by dprk_songbun choice loyal.',
  },

  dprk_hostile_class: {
    weight: 'major',
    category: 'identity',
    description: 'Songbun hostile or wavering class — ceiling on education, work, location; the architecture of closed doors',
    intent: 'year_texture',
    notes: 'Set by dprk_songbun choice hostile.',
  },

  dprk_arduous_march: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the Arduous March famine 1994-98 — Public Distribution System collapsed, 300K-1M dead, the official name requiring you to be a soldier marching toward victory',
    intent: 'year_texture',
    notes: 'Set by dprk_arduous_march.',
  },

  dprk_foreign_media: {
    weight: 'major',
    category: 'identity',
    description: 'Watched forbidden South Korean dramas or foreign films on USB drives — 2am, curtain closed, volume low, the gap between that world and this one',
    intent: 'year_texture',
    notes: 'Set by dprk_usb_drives.',
  },

  dprk_execution_witness: {
    weight: 'major',
    category: 'trauma',
    description: 'Was mandated to attend a public execution in North Korea — the field, the crowd, the not-looking-away that is also noted',
    intent: 'year_texture',
    notes: 'Set by dprk_public_execution.',
  },

  dprk_defection_considered: {
    weight: 'major',
    category: 'identity',
    description: 'Did the defection calculation — the Tumen river at knee-depth, China deportation risk, Mongolia or Thailand routes, the family left behind',
    intent: 'year_texture',
    notes: 'Set by dprk_defection_calculation.',
  },

  dprk_chose_stay: {
    weight: 'major',
    category: 'identity',
    description: 'Ran the defection calculation and chose to stay — the family, the curtain, the 2am dramas, the folded calculation',
    intent: 'year_texture',
    notes: 'Set by dprk_defection_calculation choice stayed.',
  },

  dprk_hanawon_complete: {
    weight: 'major',
    category: 'identity',
    description: 'Completed the Hanawon resettlement facility in South Korea — the cashcard, the pronunciation gap, the constitution that says you\'re already Korean',
    intent: 'year_texture',
    notes: 'Set by dprk_hanawon.',
  },

  uru_dictatorship_lived: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived Uruguay\'s 1973-85 military dictatorship — highest per-capita political prisoner rate in world, Tupamaro leaders in sensory deprivation',
    intent: 'year_texture',
    notes: 'Set by uru_dictatorship_life.',
  },

  pry_guarani_speaker: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up bilingual in Spanish and Guaraní — the only country in Latin America where an indigenous language is genuinely majority-spoken',
    intent: 'year_texture',
    notes: 'Set by pry_guarani_identity.',
  },

  bel_chernobyl_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Alive in Belarus during the 1986 Chernobyl explosion — 70% of fallout landed in Belarus; May Day parade in contaminated Minsk',
    intent: 'year_texture',
    notes: 'Set by bel_chernobyl. Follow-through in buildYearTexture.',
  },

  bel_chernobyl_zone: {
    weight: 'major',
    category: 'trauma',
    description: 'Was in the contaminated Gomel or Mogilev region in April-May 1986 — the cloud, the official silence, the two contradictory statements',
    intent: 'year_texture',
    notes: 'Set by bel_chernobyl choice affected_zone.',
  },

  bel_crackdown_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the post-2020 crackdown — Raman Bandarenka, the Okrestina detention centre, Ryanair flight forced down',
    intent: 'year_texture',
    notes: 'Set by bel_crackdown. Splits into bel_exile or bel_stayed_2020.',
  },

  bel_stayed_2020: {
    weight: 'major',
    category: 'identity',
    description: 'Stayed in Belarus after 2020 — learned what staying required, the changed calculations, the new language of the situation',
    intent: 'year_texture',
    notes: 'Set by bel_crackdown choice stayed.',
  },

  arm_genocide_memory_bearer: {
    weight: 'major',
    category: 'trauma',
    description: 'Carries direct family memory of the Armenian Genocide 1915 — grandparent who survived, the branch that didn\'t',
    intent: 'year_texture',
    notes: 'Set by arm_genocide_memory. Follow-through: ft22_arm_genocide_bearer_late.',
  },

  arm_earthquake_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the 1988 Spitak earthquake or volunteered in the rescue — 25,000 dead in forty-three seconds',
    intent: 'year_texture',
    notes: 'Set by arm_earthquake_1988 and spitak_earthquake_1988 world event.',
  },

  arm_earthquake_zone: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Was physically in the earthquake zone (Spitak, Leninakan) on December 7, 1988',
    intent: 'year_texture',
    notes: 'Set by arm_earthquake_1988 choice survivor.',
  },

  arm_stayed_dark_years: {
    weight: 'moderate',
    category: 'identity',
    description: 'Chose to stay in Armenia through the dark blockade years when hundreds of thousands left',
    intent: 'year_texture',
    notes: 'Set by arm_dark_winter choice stayed.',
  },

  arm_left_briefly: {
    weight: 'minor',
    category: 'identity',
    description: 'Left Armenia temporarily during the blockade years and returned',
    intent: 'none',
    notes: 'Set by arm_dark_winter choice left.',
  },

  arm_combat_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Saw direct combat in Karabakh 1991-1994; carried the mountain war in the body afterward',
    intent: 'year_texture',
    notes: 'Set by arm_karabakh_veteran choice fighter.',
  },

  arm_diaspora_encounter: {
    weight: 'minor',
    category: 'identity',
    description: 'Met diaspora Armenians and felt the strange gap — the same people, the different language, the different knowing',
    intent: 'year_texture',
    notes: 'Set by arm_diaspora_encounter.',
  },

  arm_war_2020_loss: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the November 2020 defeat — Shushi fallen, ceasefire signed at 3am, Karabakh lost',
    intent: 'year_texture',
    notes: 'Set by arm_war_2020. Follow-through: ft22_arm_karabakh_veteran_late (with veteran flag).',
  },

  azr_black_january_witness: {
    weight: 'major',
    category: 'trauma',
    description: 'Was in the street during the January 19-20 1990 Soviet military operation in Baku',
    intent: 'year_texture',
    notes: 'Set by azr_black_january choice witness.',
  },

  azr_baku_pogrom_witness: {
    weight: 'major',
    category: 'trauma',
    description: 'Witnessed or was adjacent to the 1988-1990 anti-Armenian pogroms in Baku — the empty apartments, the guilt',
    intent: 'year_texture',
    notes: 'Set by azr_baku_pogrom. Follow-through: ft22_azr_baku_pogrom_late.',
  },

  waishengren_generation: {
    weight: 'major',
    category: 'identity',
    description: 'Mainlander (Waishengren) — came to Taiwan with the KMT in 1949 or child of those who did; the temporary that became permanent',
    intent: 'year_texture',
    notes: 'Set by twn_waishengren.',
  },

  sg_conformist: {
    weight: 'minor',
    category: 'values',
    description: 'Accepted Singapore\'s social contract — prosperity in exchange for compliance',
    intent: 'event',
    notes: 'Set by sg_fine_city (choice 1).',
  },

  sg_restless: {
    weight: 'minor',
    category: 'values',
    description: 'Felt the stifling quality of Singapore\'s managed society — the prosperity real but the breathing room constrained',
    intent: 'year_texture',
    notes: 'Set by sg_fine_city (choice 2).',
  },

  muhajir_identity: {
    weight: 'major',
    category: 'identity',
    description: 'Muhajir — partition migrant identity, Urdu-speaking Karachi',
    intent: 'year_texture',
    notes: 'Pakistan post-partition displacement arc. Year texture in buildYearTexture.',
  },

  partition_memory_family: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Family memory of the 1947 partition violence',
    intent: 'year_texture',
    notes: 'Pakistan/India partition. Year texture in buildYearTexture.',
  },

  partition_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the 1947 India-Pakistan Partition — the largest forced migration in recorded history',
    intent: 'none',
    notes: 'Set by partition_of_india world event (characters alive in 1947).',
  },

  partition_refugee: {
    weight: 'major',
    category: 'trauma',
    description: 'Was part of the mass refugee movement of 1947 — crossed the new border during or after Partition',
    intent: 'none',
    notes: 'Set by partition_india_refugee world event.',
  },

  partition_india_memory: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up with family memory of Partition — the city they left, the neighbour who helped, the object that was carried',
    intent: 'none',
    notes: 'Set by ind_partition_family_memory. India Hindu/Sikh second generation.',
  },

  partition_colony_raised: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up in a refugee colony (Delhi: Lajpat Nagar, Punjabi Bagh, Rajinder Nagar) — the geography of displaced families',
    intent: 'none',
    notes: 'Set by ind_partition_colony. Gates on partition_india_memory.',
  },

  '1971_war_lived': {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the 1971 East Pakistan/Bangladesh war from West Pakistan',
    intent: 'year_texture',
    notes: 'Pakistan 1971. Year texture in buildYearTexture.',
  },

  zia_generation: {
    weight: 'moderate',
    category: 'experience',
    description: 'Grew up under Zia ul-Haq Islamization, 1977-88',
    intent: 'year_texture',
    notes: 'Pakistan Zia era. Year texture in buildYearTexture.',
  },

  karachi_violence_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through Karachi ethnic violence and targeted killings, 1986-1999',
    intent: 'year_texture',
    notes: 'Pakistan Karachi. Year texture in buildYearTexture.',
  },

  nuclear_pakistan_generation: {
    weight: 'moderate',
    category: 'experience',
    description: 'Witnessed Pakistan nuclear tests 1998',
    intent: 'year_texture',
    notes: 'Pakistan 1998. Year texture in buildYearTexture.',
  },

  aps_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Pakistani shaped by the December 16, 2014 APS Peshawar massacre — 132 children killed by Pakistani Taliban; the school hall, the silence that followed.',
    intent: 'year_texture',
    notes: 'Set by pak_aps_peshawar_2014. Auto-resolve event.',
  },

  afghan_crisis_neighbor: {
    weight: 'moderate',
    category: 'experience',
    description: 'Lived with Afghan refugee crisis and Afghan war spillover',
    intent: 'year_texture',
    notes: 'Pakistan 1980s. Year texture in buildYearTexture.',
  },

  media_skeptic: {
    weight: 'moderate',
    category: 'identity',
    description: 'Learned not to trust state media through lived experience of the gap between broadcast and reality',
    intent: 'year_texture',
    notes: 'Year texture in buildYearTexture.',
  },

  religious_education: {
    weight: 'moderate',
    category: 'experience',
    description: 'Primary education was religious/madrassah rather than secular state schooling',
    intent: 'year_texture',
    notes: 'Year texture in buildYearTexture.',
  },

  hibakusha_stigma_lived: {
    weight: 'major',
    category: 'trauma',
    description: 'Atomic bomb survivor or survivor\'s child carrying the hibakusha stigma — marriage discrimination, employment barriers, the generation that could not speak openly about what happened to them.',
    intent: 'year_texture',
    notes: 'Set by ca2_japan_hibakusha_stigma / ca2_japan_hibakusha_hidden.',
  },

  minamata_disease: {
    weight: 'major',
    category: 'trauma',
    description: 'Affected by Minamata disease — mercury poisoning from Chisso factory effluent, the fishing community, the government\'s decades-long denial, the Smithsonian photographs.',
    intent: 'year_texture',
    notes: 'Set by ca2_japan_minamata_village.',
  },

  salaryman_life: {
    weight: 'moderate',
    category: 'experience',
    description: 'Lived the salaryman track — company man, company housing, company transfers, the identity built around an employer rather than a self.',
    intent: 'year_texture',
    notes: 'Set by ca2_japan_salaryman_transfer.',
  },

  karoshi_adjacent: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Lost someone to karoshi (overwork death) or came close to it — the culture of the last train, the desk at midnight, the collapse that has a name.',
    intent: 'year_texture',
    notes: 'Set by ca2_japan_karoshi_pressure.',
  },

  earthquake_country: {
    weight: 'minor',
    category: 'experience',
    description: 'Grew up in Japan with earthquake drills as ordinary life — the bag by the door, the chart of safe buildings, the alarm that is never a surprise.',
    intent: 'none',
    notes: 'Set by ca2_japan_earthquake_preparedness. Texture only; no downstream event needed.',
  },

  tohoku_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'In Tōhoku on March 11, 2011 — the 9.0 earthquake, the tsunami that came forty minutes later, the line where the wave stopped and everything on one side was gone.',
    intent: 'year_texture',
    notes: 'Set by ca2_japan_tohoku_2011 (affected area choice).',
  },

  korean_economic_miracle_worker: {
    weight: 'moderate',
    category: 'experience',
    description: 'Worked in the chaebol factory economy during South Korea\'s 9.2% annual growth miracle, 1960s-80s',
    intent: 'year_texture',
    notes: 'Set by korea_factory_1970s. Two branches: stayed/studied, or organized labour.',
  },

  gwangju_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through or near the May 18, 1980 Gwangju Uprising — paratroopers, suppressed death count, decade of silence',
    intent: 'year_texture',
    notes: 'Set by korea_gwangju_1980. Two branches: in Gwangju, or knew people who were.',
  },

  korean_speed_culture: {
    weight: 'moderate',
    category: 'identity',
    description: 'Internalized ppalli-ppalli (hurry-hurry) — South Korea\'s cultural tempo as a personal rhythm',
    intent: 'year_texture',
    notes: 'Set by korea_ppalli_ppalli.',
  },

  naksa_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the June 1967 Six-Day War defeat — the Naksa, the collapse of the Nasser dream',
    intent: 'year_texture',
    notes: 'Set by egy_naksa_1967. Two branches: personal belief shattered, or brother at front.',
  },

  mubarak_emergency_generation: {
    weight: 'moderate',
    category: 'experience',
    description: 'Lived under the 1981-2011 Emergency Law — detention without charge, the shape of what you don\'t say',
    intent: 'year_texture',
    notes: 'Set by egy_mubarak_emergency.',
  },

  arab_spring_disillusionment: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived the post-Tahrir counter-revolution — emergency law returns, square holds different meaning',
    intent: 'year_texture',
    notes: 'Set by egy_tahrir_aftermath. Gates on tahrir_generation.',
  },

  egypt_wasta_beneficiary: {
    weight: 'moderate',
    category: 'moral',
    description: 'Got a job or position through wasta (connections) rather than merit — knows how the system actually works',
    intent: 'year_texture',
    notes: 'Set by egy_wasta_career (first choice). Moral weight: the system is real but the benefitting is its own ledger.',
  },

  egypt_wasta_blocked: {
    weight: 'moderate',
    category: 'adversity',
    description: 'Navigated Egyptian professional life without wasta — learned the longer, harder route through the system',
    intent: 'year_texture',
    notes: 'Set by egy_wasta_career (second choice).',
  },

  egypt_gulf_worker: {
    weight: 'moderate',
    category: 'identity',
    description: 'Took a Gulf contract — the Egyptian professional who chose Saudi/UAE/Kuwait over staying, sent remittances home, came back three weeks a year',
    intent: 'year_texture',
    notes: 'Set by egy_gulf_contract_choice (first choice). Distinct from OFW system; covers professional-class Egyptians.',
  },

  egypt_stayed_for_roots: {
    weight: 'minor',
    category: 'identity',
    description: 'Chose to stay in Egypt when the Gulf option was available — watched others leave, held the longer path',
    intent: 'none',
    notes: 'Set by egy_gulf_contract_choice (second choice).',
  },

  egypt_blocked_generation: {
    weight: 'moderate',
    category: 'adversity',
    description: 'Part of Egypt\'s blocked professional generation — university degree, government desk job, the gap between preparation and what the preparation is for',
    intent: 'year_texture',
    notes: 'Set by egy_blocked_generation. Only fires if not egypt_gulf_worker.',
  },

  coptic_navigation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Navigated professional and public life as a Coptic Christian in Egypt — the church community, the topography of what doors are and aren\'t open',
    intent: 'year_texture',
    notes: 'Set by egy_coptic_navigation (both choices).',
  },

  sectarian_threat_survived: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Experienced a sectarian attack or nearby threat — a church bombing, communal violence — and returned to normal life the next morning',
    intent: 'none',
    notes: 'Set by egy_coptic_navigation (second choice). Broader flag potentially applicable cross-country.',
  },

  india_1984_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Witnessed the 1984 anti-Sikh violence after Indira Gandhi\'s assassination — organized mobs, absent police, 2,733+ dead',
    intent: 'year_texture',
    notes: 'Set by ind_1984_sikh_massacre. Two branches: in Delhi, or at distance.',
  },

  bpo_generation: {
    weight: 'moderate',
    category: 'experience',
    description: 'Worked in India\'s BPO/call centre economy — night shifts on American time, adopted work name, salary above parents\' generation',
    intent: 'year_texture',
    notes: 'Set by ind_call_centre_generation.',
  },

  canadian_healthcare_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'The health card — the treatment that happens, the billing that does not follow. Healthcare as part of what Canada means.',
    intent: 'year_texture',
    notes: 'Set by can_healthcare_experience (auto-resolve).',
  },

  head_tax_generation: {
    weight: 'major',
    category: 'identity',
    description: 'Chinese Canadian whose family paid the head tax — $500 in 1903, two years of wages, the exclusion and the community built despite it.',
    intent: 'both',
    notes: 'Set by can_chinese_head_tax.',
  },

  hyphenated_canadian: {
    weight: 'moderate',
    category: 'identity',
    description: 'Canadian and something else — the hyphen navigated in both directions, the country that calls itself multicultural and the rooms where that claim is tested.',
    intent: 'year_texture',
    notes: 'Set by can_chinese_head_tax.',
  },

  white_australia_generation: {
    weight: 'major',
    category: 'identity',
    description: 'Grew up under the White Australia Policy — the dictation test, the conditional belonging, the performance of proving membership.',
    intent: 'both',
    notes: 'Set by aus_white_australia_policy.',
  },

  hyphenated_australian: {
    weight: 'moderate',
    category: 'identity',
    description: 'Navigated being Australian and something else simultaneously — the double fluency, the rooms where one identity is more legible than the other.',
    intent: 'year_texture',
    notes: 'Set by aus_white_australia_policy.',
  },

  aus_vietnam_vet: {
    weight: 'major',
    category: 'experience',
    description: 'Australian Vietnam veteran — served after the birthday ballot, came back to no Welcome Home Parade until 1987.',
    intent: 'both',
    notes: 'Set by aus_vietnam_conscription (went choice). The parade was fifteen years late.',
  },

  aus_vietnam_evaded: {
    weight: 'moderate',
    category: 'experience',
    description: 'Evaded the Australian Vietnam conscription ballot — student deferment, medical, objection.',
    intent: 'year_texture',
    notes: 'Set by aus_vietnam_conscription (evaded choice).',
  },

  jim_crow_childhood: {
    weight: 'major',
    category: 'identity',
    description: 'Grew up under Jim Crow — the water fountains, the schools, the signs. The survival rules taught before reading.',
    intent: 'both',
    notes: 'Set by usa_jim_crow_childhood. Foundational to Black American experience pre-1965.',
  },

  stayed_in_the_south: {
    weight: 'moderate',
    category: 'identity',
    description: 'Stayed in the South during the Great Migration years — the civil rights movement would come to the South first, where the laws were explicit.',
    intent: 'year_texture',
    notes: 'Set by usa_great_migration (stayed choice).',
  },

  vietnam_went: {
    weight: 'major',
    category: 'experience',
    description: 'Went to Vietnam when called — thirteen months in-country. The country needed to be fine when you returned.',
    intent: 'both',
    notes: 'Set by usa_vietnam_draft_decision (go choice). Gates usa_vietnam_return.',
  },

  vietnam_deferred: {
    weight: 'moderate',
    category: 'experience',
    description: 'Deferred from the Vietnam draft — college, medical, family hardship. Carries the knowledge that the number was drawn and was arranged not to go.',
    intent: 'year_texture',
    notes: 'Set by usa_vietnam_draft_decision (deferred choice).',
  },

  vietnam_veteran: {
    weight: 'major',
    category: 'experience',
    description: 'Vietnam veteran — came back to a country that needed you to be fine and had no structure for when you were not.',
    intent: 'both',
    notes: 'Set by usa_vietnam_return.',
  },

  stayed_in_the_town: {
    weight: 'moderate',
    category: 'identity',
    description: 'Stayed in the deindustrialised town while others left — the empty downtown, the schools tied to a tax base that was gone.',
    intent: 'year_texture',
    notes: 'Set by usa_rustbelt_factory (stayed choice).',
  },

  overpoliced_community: {
    weight: 'moderate',
    category: 'identity',
    description: 'From a community subjected to stop-and-frisk, aggressive policing, and the daily expenditure of navigating that.',
    intent: 'year_texture',
    notes: 'Set by usa_war_on_drugs (survived choice).',
  },

  witnessed_incarceration: {
    weight: 'moderate',
    category: 'experience',
    description: 'Watched someone close get caught in the mass incarceration system — the trial, the mandatory minimum, the years.',
    intent: 'year_texture',
    notes: 'Set by usa_war_on_drugs (witnessed choice).',
  },

  housing_lost: {
    weight: 'moderate',
    category: 'experience',
    description: 'Lost their home — to foreclosure, to eviction, to fire or disaster. The equity, the neighborhood, the street with four other empty houses.',
    intent: 'year_texture',
    notes: 'Set by usa_foreclosure_2008 (lost choice) and poverty arc events.',
  },

  opioid_crisis_touched: {
    weight: 'major',
    category: 'experience',
    description: 'Touched by the opioid crisis — lost someone, watched the community absorb the losses, understood the obituary language.',
    intent: 'both',
    notes: 'Set by usa_opioid_crisis.',
  },

  katrina_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Shaped by Hurricane Katrina — the levees failing, the Superdome, the rooftops, 67% of the dead Black, 80% of the city underwater, the neighborhoods that did not come back.',
    intent: 'year_texture',
    notes: 'Set by usa_hurricane_katrina_2005.',
  },

  grenfell_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Shaped by the Grenfell Tower fire of June 14, 2017 — 72 dead in a social housing block, the cheaper cladding, the residents who had warned for years.',
    intent: 'year_texture',
    notes: 'Set by uk_grenfell_2017.',
  },

  windrush_generation: {
    weight: 'major',
    category: 'identity',
    description: 'Shaped by or directly affected by the Windrush scandal — Caribbean-born British residents threatened with deportation after decades of legal residence under the Hostile Environment policy.',
    intent: 'year_texture',
    notes: 'Set by uk_windrush_scandal_2018.',
  },

  citizenship_threatened: {
    weight: 'major',
    category: 'trauma',
    description: 'Directly faced the threat of having their legal right to remain in a country questioned or revoked — the Windrush experience: employment lost, NHS denied, deportation notice.',
    intent: 'year_texture',
    notes: 'Set by uk_windrush_scandal_2018 (directly affected choice).',
  },

  london_77_generation: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Shaped by the July 7, 2005 London bombings — four coordinated attacks on Underground and bus, 52 dead, 700 injured, the bombers British citizens from Leeds.',
    intent: 'year_texture',
    notes: 'Set by uk_77_bombings_2005.',
  },

  communist_poland_childhood: {
    weight: 'major',
    category: 'identity',
    description: 'Grew up in communist Poland — the queue at the state butcher, the official history and the real history learned in parallel.',
    intent: 'both',
    notes: 'Set by pol_communist_childhood.',
  },

  church_formed_identity: {
    weight: 'moderate',
    category: 'identity',
    description: 'Identity shaped by the church as parallel institution — the space outside the party\'s reach, the formation in a different register from the official.',
    intent: 'year_texture',
    notes: 'Set by pol_communist_childhood (church choice) and pol_pope_john_paul_1978.',
  },

  poland_eu_emigrant: {
    weight: 'major',
    category: 'experience',
    description: 'Left Poland after EU accession — the UK, Ireland, Germany. The double life of remittances home and a career abroad.',
    intent: 'both',
    notes: 'Set by pol_eu_accession_2004 (went west choice).',
  },

  eu_freedom_movement: {
    weight: 'moderate',
    category: 'identity',
    description: 'Benefited from EU freedom of movement — the work permit that appeared, the border that opened, the Europe that became navigable.',
    intent: 'year_texture',
    notes: 'Set by pol_eu_accession_2004.',
  },

  mezzogiorno_born: {
    weight: 'moderate',
    category: 'identity',
    description: 'From the Italian south — the Mezzogiorno, where the miracle\'s geography ended and the emigration north began.',
    intent: 'year_texture',
    notes: 'Set by it_miracolo_economico and it_southern_emigration.',
  },

  southern_migrant_italy: {
    weight: 'major',
    category: 'identity',
    description: 'Moved north from the Italian south — called terroni in Turin or Milan, built a life in the factories and the northern city.',
    intent: 'both',
    notes: 'Set by it_southern_emigration (north choice).',
  },

  italian_emigrant: {
    weight: 'major',
    category: 'experience',
    description: 'Left Italy — for Switzerland, Germany, or elsewhere. The guest worker arrangement or the brain drain of the precariato generation.',
    intent: 'both',
    notes: 'Set by it_southern_emigration (abroad choice) and it_precariato (leave choice).',
  },

  stayed_in_the_south_italy: {
    weight: 'moderate',
    category: 'identity',
    description: 'Stayed in the Italian south while the generation emigrated — building something in a diminishing place.',
    intent: 'year_texture',
    notes: 'Set by it_southern_emigration (stayed choice).',
  },

  political_violence_witnessed: {
    weight: 'major',
    category: 'experience',
    description: 'Knew someone who was present at or affected by political violence — the abstract becomes specific and personal.',
    intent: 'year_texture',
    notes: 'Set by it_anni_di_piombo (proximity choice) and similar events.',
  },

  mediterranean_crossing_survived: {
    weight: 'major',
    category: 'experience',
    description: 'Crossed the Mediterranean on a migrant route — the rubber boat or wooden boat, Lampedusa, the calculation of what it cost.',
    intent: 'both',
    notes: 'Set by it_mediterranean_crossing.',
  },

  gastarbeiter_generation: {
    weight: 'major',
    category: 'identity',
    description: 'Part of the Gastarbeiter cohort — migrant workers who came to West Germany on two-year contracts that became permanent lives.',
    intent: 'both',
    notes: 'Set by ger_gastarbeiter_arrival. The "two years" that stretched into a lifetime.',
  },

  remittance_sender: {
    weight: 'moderate',
    category: 'experience',
    description: 'Sent money home to family while living abroad — the economy of the diaspora.',
    intent: 'year_texture',
    notes: 'Set by ger_gastarbeiter_arrival (plan-to-return choice). Also applicable in OFW arcs.',
  },

  settled_migrant: {
    weight: 'moderate',
    category: 'identity',
    description: 'Made a conscious decision early that the country of migration is now home — before systems or institutions were ready for that decision.',
    intent: 'year_texture',
    notes: 'Set by ger_gastarbeiter_arrival (stayed choice).',
  },

  hyphenated_german: {
    weight: 'major',
    category: 'identity',
    description: 'Born in Germany or came young — German is the first language, but Germany does not fully claim the character. Built an identity the categories do not have a slot for.',
    intent: 'both',
    notes: 'Set by ger_turkish_german_identity.',
  },

  diaspora_identity: {
    weight: 'moderate',
    category: 'identity',
    description: 'Identity shaped by being between two cultures — the country of origin\'s expectations and the country of settlement\'s limits.',
    intent: 'year_texture',
    notes: 'Set by ger_turkish_german_identity (emphasis-Turkish choice). Relevant across multiple diasporas.',
  },

  nsu_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Turkish or Greek-German character shaped by the NSU murders 2000–2011 — nine Turkish-German and one Greek-German killed while police investigated the victims\' families. "Dönermorde." Files shredded the week the truth broke.',
    intent: 'year_texture',
    notes: 'Set by ger_nsu_murders_2011.',
  },

  troubles_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Grew up during the Troubles in Northern Ireland — the checkpoint, the bomb, the community as political category, the peace walls.',
    intent: 'year_texture',
    notes: 'Set by the_troubles world event.',
  },

  holodomor_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the 1932-33 Holodomor in Ukraine or USSR — the enforced silence, the doctored census, the bread that could not be spoken of.',
    intent: 'year_texture',
    notes: 'Set by holodomor_1932 world event.',
  },

  algerian_war_veteran: {
    weight: 'major',
    category: 'experience',
    description: 'Served in Algeria 1954–62 — in a war that France did not call a war until 1999. Carries something unsaid.',
    intent: 'both',
    notes: 'Set by fr_algerian_war_soldier (followed orders choice). Deeply buried in French social memory.',
  },

  carries_something_unsaid: {
    weight: 'major',
    category: 'psychological',
    description: 'A thing was done or witnessed that was never spoken about. The not-talking outlasted the event by decades.',
    intent: 'year_texture',
    notes: 'Set by fr_algerian_war_soldier (followed orders). Applicable to other trauma arcs.',
  },

  banlieue_generation: {
    weight: 'major',
    category: 'identity',
    description: 'Grew up in the French banlieues — between the France of the papers and the France of the police stop. Double fluency in two Frances.',
    intent: 'both',
    notes: 'Set by fr_banlieue_second_gen.',
  },

  paris_attacks_generation: {
    weight: 'major',
    category: 'experience',
    description: 'Lived through the 2015 Paris attacks — Charlie Hebdo in January, the Bataclan in November. The ordinary evening as target.',
    intent: 'both',
    notes: 'Set by fr_charlie_hebdo_bataclan_2015.',
  },

  irish_emigrant_generation: {
    weight: 'major',
    category: 'experience',
    description: 'Left Ireland as part of the structural emigration wave — the boat-train, London/Boston/Sydney',
    intent: 'year_texture',
    notes: 'Set by ire_emigration_wave (left branch). Irish emigration was a generational condition through most of the 20th century.',
  },

  stayed_in_ireland: {
    weight: 'moderate',
    category: 'identity',
    description: 'Stayed in Ireland while their generation emigrated — watching the town empty',
    intent: 'year_texture',
    notes: 'Set by ire_emigration_wave (stayed branch).',
  },

  turkish_coup_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the September 12, 1980 Turkish military coup — 650,000 detained, systematic torture, constitution rewritten',
    intent: 'year_texture',
    notes: 'Set by tur_coup_1980. Two branches: politically active (detained risk), or observer.',
  },

  kemalist_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Turkish secular Kemalist — holds the headscarf ban and laicite as correct principles',
    intent: 'year_texture',
    notes: 'Set by tur_secularism_tension (secular choice).',
  },

  post_kemalist_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Turkish post-Kemalist — sees the headscarf ban as exclusion rather than secularism',
    intent: 'year_texture',
    notes: 'Set by tur_secularism_tension (religious freedom choice).',
  },

  marmara_earthquake_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the August 1999 Marmara earthquake — 17,000+ dead, corruption-built buildings, slow government response',
    intent: 'year_texture',
    notes: 'Set by tur_earthquake_1999.',
  },

  turkish_conservative_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'AKP supporter — saw the Kemalist establishment as the obstacle and Erdogan\'s decade as legitimate development',
    intent: 'year_texture',
    notes: 'Set by tur_erdogan_arc (conservative branch).',
  },

  turkish_historical_silence: {
    weight: 'moderate',
    category: 'experience',
    description: 'Knows the shape of what Turkey\'s state has decided the past is allowed to be — 1915, Article 301, Orhan Pamuk',
    intent: 'year_texture',
    notes: 'Set by tur_armenian_silence.',
  },

  ivorian_civil_war_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the 2002-2011 Ivorian civil war — country split north/south, zone of confidence, Abidjan vs Bouaké',
    intent: 'year_texture',
    notes: 'Set by cdi_civil_war.',
  },

  ci_cocoa_farmer: {
    weight: 'moderate',
    category: 'experience',
    description: 'Grew or harvested cocoa in Ivory Coast — part of the economy that made the Ivorian Miracle and employed four million West African migrants',
    intent: 'year_texture',
    notes: 'Set by ci_cocoa_smallholder. Year texture: fermenting pods, London/New York price, the concrete block room.',
  },

  ci_election_crisis_witness: {
    weight: 'major',
    category: 'trauma',
    description: 'Witnessed the 2010-2011 post-election crisis — Gbagbo vs. Ouattara, 3,000 dead, five months of street fighting in Abidjan before ICC arrest',
    intent: 'both',
    notes: 'Set by ci_election_crisis_2010. Follow-through: who was right about Ouattara, who benefited from reunification.',
  },

  ci_election_displaced: {
    weight: 'moderate',
    category: 'experience',
    description: 'Displaced during the 2010-2011 Ivorian election crisis — moved north, moved out, watched from safety while others didn\'t',
    intent: 'year_texture',
    notes: 'Set by ci_election_crisis_2010 (leave choice). Year texture: the silence of safe distance.',
  },

  ci_northern_identity: {
    weight: 'moderate',
    category: 'identity',
    description: 'Muslim Ivorian from the north — Sénoufo, Dioula, or Malinké — carrying an identity that ivoirité politics coded as foreign or incomplete',
    intent: 'year_texture',
    notes: 'Set by ci_north_south_identity. Year texture: the credential gap, the checkpoint language.',
  },

  ci_long_witness: {
    weight: 'major',
    category: 'experience',
    description: 'Witnessed the full arc of modern Ivory Coast — miracle to crash to civil war to reunification, two versions of the same phrase',
    intent: 'both',
    notes: 'Set by ci_late_reckoning. Follow-through: ci_second_miracle_late. Year texture: the new glass towers and the silence about what happened between.',
  },

  ci_full_arc_witness: {
    weight: 'major',
    category: 'experience',
    description: 'Has lived through both uses of "Ivorian Miracle" — the Houphouët years and the post-2012 recovery — and everything between them',
    intent: 'year_texture',
    notes: 'Set by ci_second_miracle_late. Year texture: the survival implicit in having witnessed both.',
  },

  ci_miracle_reckoned: {
    weight: 'minor',
    category: 'reflection',
    description: 'Has arrived at a clear-eyed understanding of what the Ivorian Miracle required — migrant labour, one-man rule — and what it produced',
    intent: 'year_texture',
    notes: 'Set by ci_miracle_late_reckoning.',
  },

  ci_cocoa_accounting: {
    weight: 'moderate',
    category: 'reflection',
    description: 'Has worked through the gap between the cocoa economy as lived from inside and as described in European supply chain reports — different accountings of the same numbers',
    intent: 'year_texture',
    notes: 'Set by ci_cocoa_late_accounting.',
  },

  tuareg_settled_reckoned: {
    weight: 'minor',
    category: 'reflection',
    description: 'Has processed the position of settling — holding Tuareg identity while living in a city, watching the 2012 Azawad uprising from Bamako, belonging to neither side',
    intent: 'year_texture',
    notes: 'Set by tuareg_settled_late_return.',
  },

  bamileke_identity: {
    weight: 'moderate',
    category: 'identity',
    description: 'Bamileke Cameroonian identity — carries the entrepreneurial tradition, tontine networks, the "Jews of Africa" label and what it costs to be the ethnic group associated with commercial success in a state that distributes by other criteria',
    intent: 'year_texture',
    notes: 'Set by cmr_bamileke_world. Year texture: the tontine, the market stall, the suspicion.',
  },

  anglophone_cameroonian: {
    weight: 'major',
    category: 'identity',
    description: 'Anglophone Cameroonian — speaks English, inherited common law, belongs to the 20% linguistic minority navigating a Francophone state apparatus',
    intent: 'both',
    notes: 'Set by cmr_anglophone_identity. Follow-through: anglophone_crisis_inside events.',
  },

  anglophone_crisis_inside: {
    weight: 'major',
    category: 'trauma',
    description: 'Experienced the Anglophone crisis from inside the Anglophone regions — the internet shutdown, the army, the Amba Boys, the village burning, the school years lost',
    intent: 'both',
    notes: 'Set by cmr_anglophone_strike_2016 (Anglophone choice). Follow-through: ambazonia_displaced for those who left.',
  },

  ambazonia_displaced: {
    weight: 'major',
    category: 'trauma',
    description: 'Displaced by the Ambazonia conflict from 2018 — village emptied, children out of school, caught between military and armed separatists, no man\'s land',
    intent: 'year_texture',
    notes: 'Set by cmr_ambazonia_displacement. Year texture: counting the children who cannot read.',
  },

  cmr_long_witness: {
    weight: 'major',
    category: 'experience',
    description: 'Has witnessed Cameroon\'s full arc under Biya — forty years, the promise of "Africa in miniature," the Anglophone crisis unresolved, the continued absence of transition',
    intent: 'year_texture',
    notes: 'Set by cmr_late_reckoning. Year texture: the miniature and what scale means.',
  },

  anglophone_long_witness: {
    weight: 'major',
    category: 'experience',
    description: 'Anglophone Cameroonian who has watched the 2016 crisis extend for years without resolution — illiterate generation, factionalized armed groups, no peace framework',
    intent: 'year_texture',
    notes: 'Set by cmr_anglophone_late_reckoning. Year texture: the specific arithmetic of what was lost.',
  },

  cmr_crisis_witness_reckoned: {
    weight: 'moderate',
    category: 'reflection',
    description: 'Francophone Cameroonian who has named, in private, the moral position of continuing normally while the Anglophone crisis happened in the same country',
    intent: 'year_texture',
    notes: 'Set by cmr_crisis_echo_francophone.',
  },

  anglophone_inside_reckoned: {
    weight: 'major',
    category: 'trauma',
    description: 'Anglophone Cameroonian who was inside the crisis and has stayed inside it — holding the specific timeline of the crisis as a personal chronology, asking not when it ends but what will be left',
    intent: 'year_texture',
    notes: 'Set by cmr_inside_long_memory.',
  },

  nga_boko_haram_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the Boko Haram insurgency in North-East Nigeria — the displacement, the checkpoints, the Chibok kidnapping, the 2.6 million internally displaced.',
    intent: 'both',
    notes: 'Set by nga_boko_haram. Specifically for Northern Nigerian characters (hausa_fulani, kanuri) in the conflict years 2009–2020.',
  },

  nga_ethnic_pride: {
    weight: 'minor',
    category: 'identity',
    description: 'Carries Yoruba, Igbo, or Hausa-Fulani ethnic identity as a primary marker — the name, the accent, the network that determines political affiliation.',
    intent: 'both',
    notes: 'Set by nga_ethnic_navigation (choice: wear identity fully). Checked in year texture.',
  },

  nigerian_diaspora_stigma: {
    weight: 'moderate',
    category: 'experience',
    description: 'Managed the 419 national stereotype abroad — the assumption that being Nigerian meant fraud association',
    intent: 'year_texture',
    notes: 'Set by nga_419_scam_culture.',
  },

  nepa_generation: {
    weight: 'moderate',
    category: 'experience',
    description: 'Organised daily life around generator access and power cuts — NEPA (Never Expect Power Always), diesel costs, the ceiling fan stutter that signals the grid going down.',
    intent: 'year_texture',
    notes: 'Set by nga_nepa_generator_culture. Universal Nigerian urban/semi-urban adult experience 1985–2015+.',
  },

  lagos_go_slow_generation: {
    weight: 'minor',
    category: 'experience',
    description: 'Lived the Lagos go-slow — Third Mainland Bridge standstills, danfo jams, hawkers working the gridlock, trips that took two hours instead of twenty minutes.',
    intent: 'year_texture',
    notes: 'Set by nga_lagos_go_slow. Urban Nigeria only.',
  },

  amin_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived under Idi Amin\'s Uganda 1971–79 — State Research Bureau terror, arbitrary disappearances, fear as the ambient condition',
    intent: 'year_texture',
    notes: 'Set by uga_amin_era.',
  },

  amin_asian_expulsion: {
    weight: 'major',
    category: 'trauma',
    description: 'Asian-Ugandan expelled in 1972 — 90 days to leave, businesses and properties confiscated, three generations of belonging erased',
    intent: 'year_texture',
    notes: 'Set by uga_asian_expulsion_1972. Asian ethnicity guard.',
  },

  lra_northern_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the LRA years in northern Uganda — night commuting, child abductions, the geography of fear in Gulu and Kitgum',
    intent: 'year_texture',
    notes: 'Set by uga_lra_northern. Two branches: in the north, or in Kampala.',
  },

  kampala_informal_generation: {
    weight: 'minor',
    category: 'experience',
    description: 'Lived in the boda-boda city — Kampala organized around motorcycle taxis, the informal economy\'s most visible institution',
    intent: 'year_texture',
    notes: 'Set by uga_boda_boda_city.',
  },

  somalia_state_collapse: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the 1991 collapse of the Somali state — Barre falls, militia takes the streets, the specific texture of a country without a government',
    intent: 'year_texture',
    notes: 'Set by som_state_collapse_1991. Two branches: in Mogadishu, or fled.',
  },

  somali_clan_identity: {
    weight: 'moderate',
    category: 'experience',
    description: 'Navigates identity through clan — the checkpoint question, the 2am phone call, xeer as the safety net when the state is absent',
    intent: 'year_texture',
    notes: 'Set by som_clan_calculus.',
  },

  alshabaab_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived under al-Shabaab control or in Mogadishu fighting it — music banned, phone restrictions, the order that comes with terror',
    intent: 'year_texture',
    notes: 'Set by som_alshabaab_generation. Two branches: territory, or AMISOM Mogadishu.',
  },

  somali_diaspora_connection: {
    weight: 'moderate',
    category: 'experience',
    description: 'Connected to the diaspora economy — remittances through hawala, the relative in Minnesota/Oslo/London who phones and sends',
    intent: 'year_texture',
    notes: 'Set by som_remittance_economy.',
  },

  somalia_famine_2011: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the 2011 famine — 260,000 dead, UN famine declaration, drought and conflict overlapping',
    intent: 'year_texture',
    notes: 'Set by som_famine_2011.',
  },

  thai_uncolonized_identity: {
    weight: 'moderate',
    category: 'experience',
    description: 'Absorbed the Thai national curriculum narrative of uncolonized pride — the only mainland SE Asian country to survive intact, with what that leaves out',
    intent: 'year_texture',
    notes: 'Set by tha_uncolonized_pride.',
  },

  thai_lese_majeste_awareness: {
    weight: 'major',
    category: 'experience',
    description: 'Navigates the specific self-censorship of Article 112 — the pause before the opinion, accumulating counts, decades in prison for criticism',
    intent: 'year_texture',
    notes: 'Set by tha_lese_majeste.',
  },

  bng_cyclone_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Born in Bangladesh in the shadow of the 1970 Bhola cyclone — the deadliest tropical cyclone in history (up to 500,000 dead), and Pakistan\'s inadequate response that accelerated independence.',
    intent: 'year_texture',
    notes: 'Set by bng_bhola_shadow.',
  },

  bng_mukti_bahini: {
    weight: 'major',
    category: 'identity',
    description: 'Joined or actively supported the Mukti Bahini during the 1971 Liberation War.',
    intent: 'year_texture',
    notes: 'Set by bng_liberation_war_1971 (choice 1).',
  },

  bng_famine_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the 1974 Bangladesh famine — 1–1.5 million dead of starvation three years after independence, under Mujibur Rahman\'s government.',
    intent: 'year_texture',
    notes: 'Set by bng_1974_famine.',
  },

  bng_cyclone_survivor: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Lived through a major cyclone as an adult in Bangladesh — the 1991 cyclone (138,000 dead), Sidr 2007, or later storms.',
    intent: 'year_texture',
    notes: 'Set by bng_cyclone_life.',
  },

  nepal_maoist_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through Nepal\'s Maoist People\'s War 1996–2006 — the rural insurgency, the new authority, the decade of conflict that killed 13,000',
    intent: 'year_texture',
    notes: 'Set by nep_maoist_insurgency.',
  },

  nepal_earthquake_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the 2015 Gorkha earthquake — 9,000 dead, 600,000 houses destroyed, the silence after the shaking stopped',
    intent: 'year_texture',
    notes: 'Set by nep_earthquake_2015.',
  },

  reeducation_family: {
    weight: 'major',
    category: 'trauma',
    description: 'Had a family member sent to re-education camp after 1975 — months became years, the official letters, the father or uncle who came back different or did not come back.',
    intent: 'year_texture',
    notes: 'Set by vn_reeducation_camp.',
  },

  bourgeois_classification: {
    weight: 'major',
    category: 'trauma',
    description: 'Classified as bourgeois by the re-registration committees after 1975 — the family background that determined school, work, and what the future was allowed to contain.',
    intent: 'year_texture',
    notes: 'Set by vn_class_reclassification (labelled choice).',
  },

  hidden_class_background: {
    weight: 'moderate',
    category: 'identity',
    description: 'Concealed a family\'s class background after 1975 reclassification — the grandfather not mentioned, the house before not described, the thing known and not said.',
    intent: 'year_texture',
    notes: 'Set by vn_class_reclassification (conceal choice).',
  },

  new_economic_zone: {
    weight: 'major',
    category: 'trauma',
    description: 'Sent to a New Economic Zone — cleared jungle with hand tools, grew food on land that did not want to grow it, the city you were removed from still existing without you.',
    intent: 'year_texture',
    notes: 'Set by vn_new_economic_zone (stayed choice).',
  },

  myanmar_1988_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Witnessed or participated in the 8888 Uprising — hundreds of thousands in the streets, 3,000 killed, SLORC coup',
    intent: 'year_texture',
    notes: 'Set by mya_1988_uprising.',
  },

  myanmar_saffron_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Witnessed the 2007 Saffron Revolution — monks with upturned bowls, the crackdown, Kenji Nagai shot',
    intent: 'year_texture',
    notes: 'Set by mya_saffron_revolution_2007.',
  },

  myanmar_nargis_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived Cyclone Nargis 2008 — 140,000 dead in the Irrawaddy Delta, the junta blocking international aid',
    intent: 'year_texture',
    notes: 'Set by mya_cyclone_nargis_2008.',
  },

  myanmar_coup_2021: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the February 2021 military coup — CDM strikes, crackdown, PDF resistance, the decade of opening reversed',
    intent: 'year_texture',
    notes: 'Set by mya_coup_2021.',
  },

  tunisian_womens_rights_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Tunisian woman aware of the 1956 Code of Personal Status — the only Arab country to abolish polygamy and require consent for marriage at independence',
    intent: 'year_texture',
    notes: 'Set by tun_code_personal_status.',
  },

  tunisian_saied_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through Saied\'s 2021 constitutional coup — the purging of the constitution written by the revolution, the democracy dismantled by its own president',
    intent: 'year_texture',
    notes: 'Set by tun_saied_coup_2021.',
  },

  sudan_bashir_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through Bashir\'s 30-year Islamist military dictatorship — ghost houses, dissolved unions, the Khartoum of the NIF',
    intent: 'year_texture',
    notes: 'Set by sdn_bashir_coup_1989.',
  },

  darfur_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Witnessed or was affected by the Darfur genocide 2003+ — Janjaweed, 300,000-400,000 dead, ICC arrest warrant for Bashir',
    intent: 'year_texture',
    notes: 'Set by sdn_darfur_2003.',
  },

  sudan_coup_2021_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the October 2021 coup that ended the transitional government — the second reversal in three years',
    intent: 'year_texture',
    notes: 'Set by sdn_coup_2021.',
  },

  sdn_khartoum_war_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the April 2023 SAF vs. RSF civil war in Khartoum — capital city turned battlefield, 4 million displaced from Khartoum alone',
    intent: 'event',
    notes: 'Set by sdn_civil_war_2023 (both choices). Follow-through: ft25_khartoum_war_echo.',
  },

  angola_civil_war_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through Angola\'s 27-year civil war (1975–2002) — 500,000 dead, 4 million displaced, Cold War proxy conflict',
    intent: 'year_texture',
    notes: 'Set by ang_independence_civil_war_1975.',
  },

  angola_landmine_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Grew up with landmines as a background fact — 15 million mines in Angolan soil, the paths that exist because other paths are mined',
    intent: 'year_texture',
    notes: 'Set by ang_war_years_midlife and ang_landmine_reality.',
  },

  jordanian_palestinian_identity: {
    weight: 'major',
    category: 'identity',
    description: 'Palestinian-Jordanian identity — the family displacement story, the village key, the border that created a different country within living memory',
    intent: 'year_texture',
    notes: 'Set by jor_palestinian_family. 48% of Jordan\'s population.',
  },

  jordan_black_september_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Witnessed Black September 1970 — PLO-Jordan civil war, thousands dead, PLO expelled to Lebanon',
    intent: 'year_texture',
    notes: 'Set by jor_black_september_1970.',
  },

  jordanian_wasta_used: {
    weight: 'minor',
    category: 'identity',
    description: 'Used family connections (wasta) to open a door — the infrastructure of Jordanian social mobility',
    intent: 'year_texture',
    notes: 'Set by jor_wasta_system (first branch).',
  },

  jordanian_no_wasta: {
    weight: 'minor',
    category: 'identity',
    description: 'Navigated Jordan without family wasta — the longer path through the system',
    intent: 'year_texture',
    notes: 'Set by jor_wasta_system (second branch).',
  },

  irq_iran_iraq_veteran: {
    weight: 'major',
    category: 'trauma',
    description: 'Served in the Iran-Iraq War 1980–88 — eight years on the front, poison gas, stalemate, 250,000–500,000 Iraqi dead, a border that didn\'t move.',
    intent: 'year_texture',
    notes: 'Set by irq_iran_iraq_war (first choice). Major trauma flag.',
  },

  irq_sanctions_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the 1991–2003 UN sanctions — the dinar collapsing, infant mortality doubling, the middle class dismantled, the oil-for-food ration card.',
    intent: 'year_texture',
    notes: 'Set by irq_sanctions_1990s (both choices). One of the most comprehensive sanctions regimes in history.',
  },

  irq_displacement_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived the 2006–08 sectarian civil war — Baghdad sorted by neighbourhood, two million displaced, the walls that went up.',
    intent: 'year_texture',
    notes: 'Set by irq_sectarian_war (both choices). 2M internally displaced in 2006–08.',
  },

  irq_isis_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Alive during the ISIS years 2014–17 — Mosul fell in 48 hours, the caliphate, the Yazidi genocide on Sinjar, nine months of liberation, the ruined mosque.',
    intent: 'year_texture',
    notes: 'Set by irq_isis_mosul (auto-effect).',
  },

  libyan_revolution_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the 2011 revolution — Benghazi uprising, NATO, Gaddafi killed in a drainage pipe, the 42-year state dissolving overnight',
    intent: 'year_texture',
    notes: 'Set by lby_revolution_2011.',
  },

  libyan_fragmentation_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lives in post-Gaddafi Libya — two governments, militias, oil fields as bargaining chips, Islamic State in Benghazi',
    intent: 'year_texture',
    notes: 'Set by lby_post_gaddafi_chaos.',
  },

  zambian_copper_crash_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the 1975 copper price collapse and the IMF structural adjustment years — the hollowing-out of a welfare state',
    intent: 'year_texture',
    notes: 'Set by zmb_copper_crash.',
  },

  zambian_aids_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the Zambian AIDS crisis — life expectancy falls to 40, the generation between 20 and 40 bears most of the dying',
    intent: 'year_texture',
    notes: 'Set by zmb_aids_crisis_1990s.',
  },

  zambian_evangelical_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Part of the Zambian evangelical wave — Zambia declared a Christian nation 1991, Pentecostal churches filling the gap left by the state',
    intent: 'year_texture',
    notes: 'Set by zmb_evangelical_wave.',
  },

  mozambican_civil_war_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the RENAMO civil war 1977–1992 — destruction of schools/clinics, 1 million dead, South African destabilisation',
    intent: 'year_texture',
    notes: 'Set by moz_renamo_civil_war.',
  },

  mozambican_floods_generation: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Lived through the 2000 Mozambique floods — Cyclone Eline, 800 dead, 500,000 displaced, baby Rosita born in a tree',
    intent: 'year_texture',
    notes: 'Set by moz_floods_2000.',
  },

  afghan_soviet_war_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the Soviet-Afghan War 1979–1989 — 1 million dead, 5 million refugees, mujahideen jihad',
    intent: 'year_texture',
    notes: 'Set by afg_soviet_occupation.',
  },

  afghan_combatant: {
    weight: 'major',
    category: 'trauma',
    description: 'Fought in the Afghan wars — as mujahideen, soldier, or resistance; carries the specific knowledge of having been in the war',
    intent: 'year_texture',
    notes: 'Set by afg_soviet_occupation (choice 1).',
  },

  afghan_refugee: {
    weight: 'major',
    category: 'trauma',
    description: 'Fled Afghanistan — to Pakistan, Iran, or the diaspora; Afghan in a place that is not Afghanistan',
    intent: 'year_texture',
    notes: 'Set by afg_soviet_occupation (choice 2).',
  },

  afghan_civil_war_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the post-Soviet civil war 1992–1996 — warlords, Kabul destroyed, 70,000 civilian dead',
    intent: 'year_texture',
    notes: 'Set by afg_civil_war_kabul.',
  },

  afghan_taliban_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived under Taliban rule 1996–2001 — schools closed for girls, music/TV/kite-flying banned, religious police',
    intent: 'year_texture',
    notes: 'Set by afg_taliban_rule.',
  },

  afghan_women_under_taliban: {
    weight: 'major',
    category: 'trauma',
    description: 'Experienced Taliban rule as a woman — banned from work, school, public life without a male guardian',
    intent: 'year_texture',
    notes: 'Set by afg_taliban_rule (choice 1, female experience).',
  },

  afghan_fall_2021: {
    weight: 'major',
    category: 'trauma',
    description: 'Alive when Kabul fell in August 2021 — eleven days, airport chaos, Taliban return, everything built in 20 years at risk',
    intent: 'year_texture',
    notes: 'Set by afg_taliban_return_2021.',
  },

  afghan_evacuee: {
    weight: 'major',
    category: 'trauma',
    description: 'Evacuated from Afghanistan in August 2021 — through the airport, the border, or some other route; starting over',
    intent: 'year_texture',
    notes: 'Set by afg_taliban_return_2021 (choice 1, got out).',
  },

  yemeni_war_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the 2015+ war — Saudi airstrikes, Houthi control, proxy conflict with no clean sides',
    intent: 'year_texture',
    notes: 'Set by yem_houthi_war_2015.',
  },

  yemeni_war_north: {
    weight: 'major',
    category: 'trauma',
    description: 'In Sana\'a or Houthi-controlled north during the war — occupied city, aerial bombardment',
    intent: 'year_texture',
    notes: 'Set by yem_houthi_war_2015 (choice 1, north).',
  },

  yemeni_war_south: {
    weight: 'major',
    category: 'trauma',
    description: 'In Aden or southern Yemen during the war — contested city, STC vs. Hadi government',
    intent: 'year_texture',
    notes: 'Set by yem_houthi_war_2015 (choice 2, south).',
  },

  yemeni_crisis_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the Yemen humanitarian collapse — cholera epidemic, famine conditions, Hodeidah siege',
    intent: 'year_texture',
    notes: 'Set by yem_humanitarian_collapse.',
  },

  born_gifted_intellectual: {
    weight: 'major',
    category: 'identity',
    description: 'Character was born with exceptional mathematical or scientific reasoning — patterns visible where others see noise, problems solved before the method is taught.',
    intent: 'both',
    notes: 'Set at birth roll (4% chance) in deriveGenerationalFlags. Gates all gifted arc events for this type. Surfaced in identity card.',
  },

  born_gifted_musical: {
    weight: 'major',
    category: 'identity',
    description: 'Character was born with exceptional musical ability — perfect or near-perfect pitch, structural hearing, an ear that understands sound as language.',
    intent: 'both',
    notes: 'Set at birth roll. Gates gifted_musical arc events.',
  },

  born_gifted_athletic: {
    weight: 'major',
    category: 'identity',
    description: 'Character was born with exceptional physical ability — the body cooperates at a level that suggests a different relationship to movement.',
    intent: 'both',
    notes: 'Set at birth roll. Gates gifted_athletic arc events. Intersects with career_arcs.js athlete events.',
  },

  born_gifted_artistic: {
    weight: 'major',
    category: 'identity',
    description: 'Character was born with exceptional visual or spatial perception — they see the composition inside things before it exists.',
    intent: 'both',
    notes: 'Set at birth roll. Gates gifted_artistic arc events.',
  },

  born_gifted_linguistic: {
    weight: 'major',
    category: 'identity',
    description: 'Character was born with exceptional facility with language — words arrive complete, phrasing comes pre-formed, they hear the gap between what is said and what is meant.',
    intent: 'both',
    notes: 'Set at birth roll. Gates gifted_linguistic arc events. Distinct from general high smarts.',
  },

  gift_recognized: {
    weight: 'major',
    category: 'identity',
    description: 'Someone external — a teacher, coach, mentor — witnessed the gift and named it. The first mirror.',
    intent: 'both',
    notes: 'Set by gift_teacher_recognition. Required for all subsequent arc branching.',
  },

  gift_suppressed: {
    weight: 'major',
    category: 'trauma',
    description: 'Structural barriers — poverty, racism, gender, geography — blocked the formal path for the gift. The door closed.',
    intent: 'both',
    notes: 'Set by gift_door_closes. Gates hostile path events (community mentor, civil rights channel, underground). Surfaces in identity card and year texture.',
  },

  gift_underground: {
    weight: 'major',
    category: 'identity',
    description: 'After the formal path closed, the character kept working at the gift in private — in margins, late at night, in borrowed time.',
    intent: 'both',
    notes: 'Set by gift_underground (keep working choice). Year texture fires for this state. Can transition to gift_rekindled.',
  },

  gift_deferred: {
    weight: 'moderate',
    category: 'identity',
    description: 'The path was offered but declined — family obligation, fear, wrong timing. The gift is on hold.',
    intent: 'event',
    notes: 'Set by gift_door_opens (decline choice). Should trigger late-bloomer path in young_adult.',
  },

  gift_set_aside: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character chose to let the gift go — built a different life deliberately, not because forced.',
    intent: 'year_texture',
    notes: 'Set by gift_underground (let it go choice). Softer regret arc than gift_wasted.',
  },

  gift_wasted: {
    weight: 'major',
    category: 'trauma',
    description: 'The gift was real, no path opened, no rekindling found. The character knows exactly what they could have been.',
    intent: 'both',
    notes: 'Set by gift_midlife_reckoning_hostile. Midlife regret flag. Surfaces in identity card age 40+.',
  },

  gift_partial: {
    weight: 'moderate',
    category: 'identity',
    description: 'Gift developed but capped below potential — systemic ceiling, injury, wrong era. Competent but not what was possible.',
    intent: 'year_texture',
    notes: 'Set by favorable fork choices that don\'t fully commit, or by world stage athletic (partial choice).',
  },

  gift_midlife_peace: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character made peace with the arc of their gift — what it cost, what it produced.',
    intent: 'year_texture',
    notes: 'Set by gift_midlife_reckoning_favorable (accept choice).',
  },

  gift_midlife_doubt: {
    weight: 'moderate',
    category: 'identity',
    description: 'Midlife questioning of what the gift cost — the path taken, what was spent to take it.',
    intent: 'year_texture',
    notes: 'Set by gift_midlife_reckoning_favorable (doubt choice). Different from gift_wasted — the arc succeeded, but at cost.',
  },

  gift_late_accounting: {
    weight: 'moderate',
    category: 'identity',
    description: 'Late-life reckoning with the full arc — the gift, the path, what was built, what was prevented.',
    intent: 'none',
    notes: 'Set by gift_late_accounting. Terminal flag in the arc.',
  },

  systemic_ceiling: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Character explicitly encountered a structural barrier to their advancement — not personal failure but systemic exclusion.',
    intent: 'year_texture',
    notes: 'Set by gift_first_ceiling. Broader than experienced_racism — includes class, gender, geography barriers.',
  },

  perfectionism_burden: {
    weight: 'moderate',
    category: 'trauma',
    description: 'The twice-as-good tax — performing flawlessly as a survival strategy in hostile institutional environments.',
    intent: 'year_texture',
    notes: 'Set by gift_integration_pioneer. USA/racism-specific. Chronic happiness drain.',
  },

  prodigy_burden: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Identified as exceptional so young that the performance of exceptionalism became the whole identity — the person underneath the gift was never fully found.',
    intent: 'year_texture',
    notes: 'Set by gift_prodigy_weight (perform it choice) or gift_burnout (push through choice).',
  },

  gift_identity_found: {
    weight: 'moderate',
    category: 'identity',
    description: 'Pushed back against the prodigy performance and found the self underneath the gift.',
    intent: 'none',
    notes: 'Set by gift_prodigy_weight (push back choice). Counter to prodigy_burden.',
  },

  gift_burnout_break: {
    weight: 'moderate',
    category: 'identity',
    description: 'Took a complete break from the gift — stopped performing, stopped producing. Uncomfortable and necessary.',
    intent: 'year_texture',
    notes: 'Set by gift_burnout (take a break choice). Gates gift_burnout_recovery event.',
  },

  gift_parent_had_it: {
    weight: 'moderate',
    category: 'identity',
    description: 'Discovered after a parent\'s death that the parent carried the same gift — the notebooks, the recordings, the letters never sent.',
    intent: 'year_texture',
    notes: 'Set by gift_parent_echo. The gift is older than the character thought.',
  },

  gift_sibling_split: {
    weight: 'moderate',
    category: 'trauma',
    description: 'The path was there for one sibling but not both — the character saw a near-equal go where they couldn\'t go.',
    intent: 'year_texture',
    notes: 'Set by gift_sibling_split event. The gladness and the other thing coexist.',
  },

  gift_peer_found: {
    weight: 'moderate',
    category: 'identity',
    description: 'Encountered a genuine creative equal for the first time — the standard set by that encounter became a permanent fixture.',
    intent: 'year_texture',
    notes: 'Set by gift_peer_encounter. Gates gift_ultimate_work.',
  },

  gift_crisis_around: {
    weight: 'moderate',
    category: 'identity',
    description: 'Managed rather than resolved the creative crisis — adapted, salvaged, moved forward with the doubt underneath.',
    intent: 'none',
    notes: 'Set by gift_creative_crisis (find a way around choice). Counter to gift_crisis_through.',
  },

  gift_constrained: {
    weight: 'moderate',
    category: 'identity',
    description: 'The state colonised the gift — the public work performed for the regime, the real work hidden inside it or in a drawer.',
    intent: 'year_texture',
    notes: 'Set by gift_state_colonizes (find work inside constraints choice). Authoritarian regimes 1930–1992.',
  },

  gift_exploited: {
    weight: 'moderate',
    category: 'trauma',
    description: 'The institution that supported the gift extracted its value on unjust terms — the contract that gave away the recordings, the scholarship that was really ownership.',
    intent: 'none',
    notes: 'Set by gift_contract_trap (work within it choice). Year ≤1995, musical/athletic.',
  },

  gift_fought_exploitation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Challenged the exploitative arrangement — legally, professionally, directly. The fight cost something and was morally correct.',
    intent: 'none',
    notes: 'Set by gift_contract_trap (challenge it choice) and gift_credit_stolen (confront it choice).',
  },

  gift_credit_stolen: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Work produced by the character was attributed to someone else — senior authorship, group credit, institutional erasure.',
    intent: 'year_texture',
    notes: 'Set by gift_credit_stolen event. Female academics or pre-1975. The work is still there; the attribution isn\'t.',
  },

  gift_documenting_claim: {
    weight: 'minor',
    category: 'identity',
    description: 'Documented everything carefully so that provenance could be traced later.',
    intent: 'none',
    notes: 'Set by gift_credit_stolen (document everything choice). Patient long-game response to theft.',
  },

  gift_exploitation_understood: {
    weight: 'moderate',
    category: 'identity',
    description: 'In midlife, understood the exploitation as systemic rather than personal — the mechanism became legible.',
    intent: 'none',
    notes: 'Set by gift_exploitation_reckoning. Enables mentoring younger people through the same system.',
  },

  gift_gould_understood: {
    weight: 'major',
    category: 'identity',
    description: 'Late-life structural understanding: the gift was never rare, what was rare was the path. The failure was not personal. The mathematics were always structural.',
    intent: 'both',
    notes: 'Set by gift_gould_understanding. Late-life Gould arc. Names the Stephen Jay Gould insight explicitly.',
    timestamped: true,
  },

  gift_cotton_field_reckoned: {
    weight: 'major',
    category: 'identity',
    description: 'Late-life reckoning: the life built was the life the circumstances permitted. The other life, built for by the gift, was the life the circumstances didn\'t permit.',
    intent: 'both',
    notes: 'Set by gift_cotton_field_late. Requires gift_wasted + age 65+. Ribbon: "The Cotton Field".',
    timestamped: true,
  },

  gift_parallel_understood: {
    weight: 'moderate',
    category: 'identity',
    description: 'Encountered the work their gift would have made — done by someone else with different circumstances — and held it clearly rather than only painfully.',
    intent: 'none',
    notes: 'Set by gift_parallel_unlived (clarifying choice). The talent was real. The path wasn\'t there. Separate facts.',
  },

  gift_never_named: {
    weight: 'major',
    category: 'trauma',
    description: 'The gift existed but was never named — no teacher, no institution, no word for it. The thing was real; the vocabulary was unavailable.',
    intent: 'year_texture',
    notes: 'Set by gift_never_named event. Requires !gift_recognized. Late life. One of the saddest gift states.',
  },

  gift_deferred_final: {
    weight: 'moderate',
    category: 'identity',
    description: 'At the late-bloomer door, chose not to go through — the moment had passed, the decision was allowed, it didn\'t fully settle.',
    intent: 'none',
    notes: 'Set by gift_late_bloomer_return (too late choice). The acceptance that is not quite acceptance.',
  },

  gift_anniversary_reckoned: {
    weight: 'moderate',
    category: 'identity',
    description: 'Twenty years after the door closed, made peace with the gap — no longer standing in front of the door, carrying the distance but no longer measuring it.',
    intent: 'none',
    notes: 'Set by gift_anniversary_door. Midlife, 20+ years after gift ceiling. Quiet resolution.',
  },

  gift_parent_dismissed: {
    weight: 'moderate',
    category: 'identity',
    description: 'The gift went unrecognised by the parent — not from cruelty but from the absence of a framework to evaluate it.',
    intent: 'year_texture',
    notes: 'Set by gift_parent_dismissal. Parent had no frame for the gift. Produces specific unacknowledged-gift texture.',
  },

  gift_public_discomfort: {
    weight: 'minor',
    category: 'identity',
    description: 'The public performance of the gift felt wrong — the gift was private and the arena made it something else.',
    intent: 'none',
    notes: 'Set by gift_public_performance (uncomfortable choice).',
  },

  gift_gender_barrier_named: {
    weight: 'moderate',
    category: 'identity',
    description: 'Named the gender barrier on the gift path explicitly — pushed through it rather than around it.',
    intent: 'none',
    notes: 'Set by gift_gender_barrier (name it choice).',
  },

  gift_gender_fought: {
    weight: 'moderate',
    category: 'identity',
    description: 'Fought the structural gender barrier to the gift path — arrived somewhere the framing said was inaccessible.',
    intent: 'year_texture',
    notes: 'Set by gift_gender_barrier (name it choice). Gates gift_gender_midlife_reckoning.',
  },

  gift_gender_navigated: {
    weight: 'moderate',
    category: 'identity',
    description: 'Found the path around the gender barrier — longer route, same destination, different terrain knowledge.',
    intent: 'year_texture',
    notes: 'Set by gift_gender_barrier (find path around choice). Gates gift_gender_midlife_reckoning.',
  },

  gift_gender_midlife_reckoned: {
    weight: 'moderate',
    category: 'identity',
    description: 'In midlife, reckoned with what the gender barrier cost and what it may have moved — watching younger women navigate lighter versions of the same terrain.',
    intent: 'none',
    notes: 'Set by gift_gender_midlife_reckoning. Female + gifted + fought or navigated.',
  },

  gift_disability_intersection: {
    weight: 'major',
    category: 'identity',
    description: 'Gift and disability occupy the same person — the world sees the condition first; the gift requires investment to see.',
    intent: 'year_texture',
    notes: 'Set by gift_disability_intersection event. born_with_disability or born_deaf or chronic condition + gifted.',
  },

  gift_after_peak: {
    weight: 'moderate',
    category: 'identity',
    description: 'The peak of the gift is behind — not lost but completed. A different, less urgent relationship to the gift.',
    intent: 'year_texture',
    notes: 'Set by gift_after_the_peak event. Age 55+. The phase after proving.',
  },

  class_enemy_family: {
    weight: 'major',
    category: 'trauma',
    description: 'Family classified as class enemy in Maoist China — landlord, capitalist, rightist — with all that entails for opportunity and safety.',
    intent: 'year_texture',
    notes: 'Set by cn_class_enemy_childhood. China, 1950–1976.',
  },

  sent_down_youth: {
    weight: 'major',
    category: 'trauma',
    description: 'Sent to the countryside during the Cultural Revolution\'s rustification campaign — years of rural labour instead of education.',
    intent: 'year_texture',
    notes: 'Set by cn_sent_down_youth. China, 1968–1977.',
  },

  sent_down_survived: {
    weight: 'moderate',
    category: 'resilience',
    description: 'Survived the sent-down years with intellectual life intact — continued learning despite the interruption.',
    intent: 'none',
    notes: 'Set by cn_sent_down_youth (keep learning choice).',
  },

  sent_down_intellectual: {
    weight: 'moderate',
    category: 'identity',
    description: 'Used the sent-down years for intellectual development despite the intended purpose of the programme.',
    intent: 'none',
    notes: 'Set by cn_sent_down_youth (keep learning choice). Counter to erasure.',
  },

  sent_down_returned: {
    weight: 'moderate',
    category: 'identity',
    description: 'Returned from the countryside after Mao — with a gap where education should have been.',
    intent: 'year_texture',
    notes: 'Set by cn_sent_down_return. The decade gap is permanent.',
  },

  family_rehabilitated: {
    weight: 'moderate',
    category: 'identity',
    description: 'Family\'s class enemy designation was posthumously rehabilitated under Deng — the apology came, the years didn\'t return.',
    intent: 'none',
    notes: 'Set by cn_rehabilitation.',
  },

  gaokao_survived: {
    weight: 'moderate',
    category: 'identity',
    description: 'Sat the gaokao and scored well enough to continue — not the top tier, but a path.',
    intent: 'none',
    notes: 'Set by cn_gaokao (good score choice).',
  },

  china_hidden_second_child: {
    weight: 'major',
    category: 'adversity',
    description: 'Had a second child in secret under the one-child policy — unregistered, no hukou, no legal existence for the child.',
    intent: 'both',
    notes: 'Set by cn_one_child_decision (hide the birth choice). Triggers heihaizi arc: schoolgate, inspection, 2015 policy window, late reckoning. Year texture in buildYearTexture.',
  },

  china_heihaizi_school_wall: {
    weight: 'moderate',
    category: 'adversity',
    description: 'The hidden second child was denied schooling — no hukou, no enrollment.',
    intent: 'none',
    notes: 'Set by cn_heihaizi_schoolgate (can\'t pay choice). Hard outcome of the heihaizi arc.',
  },

  china_heihaizi_uncaught: {
    weight: 'moderate',
    category: 'moral',
    description: 'The family planning inspection passed without discovering the unregistered child.',
    intent: 'none',
    notes: 'Set by cn_heihaizi_inspection. One escape outcome.',
  },

  china_heihaizi_fine_paid: {
    weight: 'moderate',
    category: 'adversity',
    description: 'Discovered during a family planning inspection — the crushing fine for the unregistered second child.',
    intent: 'none',
    notes: 'Set by cn_heihaizi_inspection (caught choice). Several years\' salary in fines.',
  },

  china_heihaizi_registered: {
    weight: 'moderate',
    category: 'identity',
    description: 'Used the 2015 amnesty window to finally register the hidden second child — an ID card after a lifetime without one.',
    intent: 'none',
    notes: 'Set by cn_heihaizi_policy_2015. The resolution (partial) of the heihaizi arc.',
  },

  tiananmen_witness: {
    weight: 'major',
    category: 'trauma',
    description: 'Was in Beijing in June 1989 — witnessed the movement, the square, and what happened on June 4th.',
    intent: 'year_texture',
    notes: 'Set by cn_tiananmen_personal. China, 1989. Produces permanent silence or activism.',
  },

  tiananmen_silence: {
    weight: 'moderate',
    category: 'identity',
    description: 'After Tiananmen, chose survival silence — the events not mentioned, the grief carried privately.',
    intent: 'none',
    notes: 'Set by cn_tiananmen_personal (carry it quietly choice).',
  },

  village_connection_kept: {
    weight: 'minor',
    category: 'identity',
    description: 'Maintained connection to village of origin despite city migration — remittances, visits, dual identity.',
    intent: 'none',
    notes: 'Set by cn_village_to_city (keep village choice).',
  },

  little_emperor: {
    weight: 'moderate',
    category: 'identity',
    description: 'Only child in one-child China — the singularity of parental investment, the weight of collective family expectation.',
    intent: 'year_texture',
    notes: 'Set by cn_only_child_weight.',
  },

  china_tech_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Part of China\'s tech boom generation — WeChat, Alipay, Didi, Alibaba as primary infrastructure of daily life.',
    intent: 'none',
    notes: 'Set by cn_tech_generation.',
  },

  zero_covid_lockdown: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Lived through China\'s zero-COVID lockdowns — weeks or months confined to apartment.',
    intent: 'year_texture',
    notes: 'Set by cn_zero_covid_lockdown. 2020–2022.',
  },

  lying_flat_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Adopted the lying flat (tang ping) ethos — rejection of the 996 grind, involuntary simplicity as protest.',
    intent: 'year_texture',
    notes: 'Set by cn_lying_flat.',
  },

  suneung_survived: {
    weight: 'moderate',
    category: 'identity',
    description: 'Sat the suneung and entered a good but non-SKY university — carrying the weight of the difference.',
    intent: 'year_texture',
    notes: 'Set by kr_suneung_result (good university choice).',
  },

  gwangju_witness: {
    weight: 'major',
    category: 'trauma',
    description: 'Witnessed the Gwangju uprising of May 1980 — the paratroopers, the citizens, the ten days, the crushing.',
    intent: 'year_texture',
    notes: 'Set by kr_gwangju_1980.',
  },

  korea_military_served: {
    weight: 'moderate',
    category: 'identity',
    description: 'Completed mandatory South Korean military service — 21 months, the experience every Korean man of the generation has in common.',
    intent: 'year_texture',
    notes: 'Set by kr_military_service_texture.',
  },

  korea_military_returned: {
    weight: 'minor',
    category: 'identity',
    description: 'Returned to civilian life after military service — the disruption absorbed into the expected pattern.',
    intent: 'none',
    notes: 'Set by kr_military_return.',
  },

  hallyu_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Felt the specific pride of Hallyu — BTS at the UN, Parasite at the Oscars, the world memorising Korean choreography.',
    intent: 'none',
    notes: 'Set by kr_hallyu_pride.',
  },

  compressed_generation_korea: {
    weight: 'moderate',
    category: 'identity',
    description: 'The compressed generation — farmer grandparents, university-educated self, study-abroad children. Three generations of mobility in one.',
    intent: 'year_texture',
    notes: 'Set by kr_compressed_generation.',
  },

  sampo_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'The generation that gave up romance, marriage, and children (sampo — three abandonments) under structural economic pressure — housing costs, precarious employment.',
    intent: 'year_texture',
    notes: 'Set by kr_sampo_generation. Korean youth 2010s+.',
  },

  disability_world_small: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Experienced the world physically made for non-disabled people — schools, transport, spaces that require workarounds to enter.',
    intent: 'none',
    notes: 'Design flag. Actual events use disability_inaccessibility_experienced (set by dis_inaccessible_world).',
  },

  disability_advocate: {
    weight: 'moderate',
    category: 'identity',
    description: 'Became an advocate for accessibility — the personal experience converted to structural demand.',
    intent: 'none',
    notes: 'Set by dis_world_built_wrong (fight for access choice).',
  },

  disability_adapted: {
    weight: 'minor',
    category: 'resilience',
    description: 'Found the workarounds — adapted to the inaccessible world rather than fighting the structure directly.',
    intent: 'none',
    notes: 'Set by dis_world_built_wrong (find workarounds choice).',
  },

  deaf_family: {
    weight: 'moderate',
    category: 'identity',
    description: 'Born into a Deaf family — sign language is the first language, Deaf culture is native rather than arrived-at.',
    intent: 'year_texture',
    notes: 'Set upstream or by dis_deaf_identity. Branches cochlear implant event significantly.',
  },

  deaf_identity_claimed: {
    weight: 'major',
    category: 'identity',
    description: 'Claimed Deaf identity explicitly — the capital D, the culture, the community, the language.',
    intent: 'year_texture',
    notes: 'Set by dis_deaf_identity.',
  },

  cochlear_implant_refused: {
    weight: 'major',
    category: 'identity',
    description: 'Refused cochlear implant — Deafness not framed as condition to be fixed but as identity to be lived.',
    intent: 'year_texture',
    notes: 'Set by dis_cochlear_implant (refuse choice).',
  },

  disability_before_after: {
    weight: 'major',
    category: 'trauma',
    description: 'Life divides into before and after the acquisition — the former body remembered, the current body lived.',
    intent: 'year_texture',
    notes: 'Set by dis_acquired_adjustment.',
  },

  disability_new_normal: {
    weight: 'moderate',
    category: 'resilience',
    description: 'Arrived at a new normal — the disability is the condition of the life now, not a departure from it.',
    intent: 'none',
    notes: 'Set by dis_acquired_adjustment (find new normal choice).',
  },

  disability_late_peace: {
    weight: 'major',
    category: 'identity',
    description: 'In late life, arrived at peace with the body — not overcoming it, not despite it, but with it.',
    intent: 'year_texture',
    notes: 'Set by dis_late_peace. Age 60+.',
  },

  addiction_spiral: {
    weight: 'major',
    category: 'trauma',
    description: 'In full spiral — the addiction governing decisions, relationships, work, money.',
    intent: 'year_texture',
    notes: 'Set by add_spiral event. Requires drug_addiction or alcohol_addiction.',
  },

  addiction_overdose_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived an overdose — the specific understanding that this can kill.',
    intent: 'year_texture',
    notes: 'Set by add_overdose_survived. Gates both recovery and add_overdose_death.',
  },

  in_recovery: {
    weight: 'major',
    category: 'resilience',
    description: 'In recovery — not cured, but the compulsion managed. The ongoing work of not using.',
    intent: 'year_texture',
    notes: 'Set by add_the_decision (recovery choice). Blocks overdose death trigger.',
  },

  recovery_year_one: {
    weight: 'moderate',
    category: 'resilience',
    description: 'Completed the first year of sobriety — the hardest year.',
    intent: 'none',
    notes: 'Design flag. Actual events use early_recovery (set by add_early_recovery event).',
  },

  recovery_long_term: {
    weight: 'major',
    category: 'resilience',
    description: 'Long-term sobriety — years, not months. The compulsion has become background rather than foreground.',
    intent: 'year_texture',
    notes: 'Set by add_long_term_recovery.',
  },

  addiction_family_witness: {
    weight: 'moderate',
    category: 'trauma',
    description: 'A family member developed addiction — the specific helplessness of watching and not being able to stop it.',
    intent: 'none',
    notes: 'Design flag. Actual events use addiction_family_supported / addiction_family_isolated (set by add_family_witness).',
  },

  addiction_family_carried: {
    weight: 'moderate',
    category: 'moral',
    description: 'Said the hard thing to the person in the using — honest, risky, outcome uncontrollable.',
    intent: 'event',
    notes: 'Set by add_carrying_someone first choice. Late-life follow-through: ft28_addiction_carried_late.',
  },

  addiction_family_boundary: {
    weight: 'moderate',
    category: 'moral',
    description: 'Held the boundary — you cannot carry someone else\'s recovery; the cost to the relationship was real.',
    intent: 'event',
    notes: 'Set by add_carrying_someone second choice. Late-life follow-through: ft28_addiction_boundary_late.',
  },

  addiction_family_supported: {
    weight: 'moderate',
    category: 'identity',
    description: 'Found support (Al-Anon or equivalent) for loving someone in addiction — the reframe about what is and isn\'t yours to control.',
    intent: 'event',
    notes: 'Set by add_family_witness first choice. Midlife echo: ft28_addiction_supported_echo.',
  },

  addiction_family_isolated: {
    weight: 'moderate',
    category: 'adversity',
    description: 'Held on alone — not ready to involve strangers, the specific accumulated cost of carrying it privately.',
    intent: 'event',
    notes: 'Set by add_family_witness second choice. Late-life follow-through: ft28_addiction_isolated_late.',
  },

  resisted_addiction: {
    weight: 'moderate',
    category: 'moral',
    description: 'Chose the other path when someone close went into addiction — the road not taken, visible at late-life distance.',
    intent: 'event',
    notes: 'Set upstream. Late-life follow-through: ft28_resisted_addiction_late.',
  },

  cycle_broken: {
    weight: 'major',
    category: 'moral',
    description: 'Stopped a destructive inherited pattern — violence, addiction, abandonment, financial recklessness — before it passed to the next generation.',
    intent: 'event',
    notes: 'Set in multiple contexts. Late-life follow-through: ft28_cycle_broken_late.',
  },

  gambler: {
    weight: 'moderate',
    category: 'behavior',
    description: 'Gambling has become a habit — the pull of the table as the one moment in the day when an outcome resolves clearly in minutes. Set via activities panel casino loss path.',
    intent: 'event',
    notes: 'Set by activities.js casino/gambling loss outcome. Follow-through: ft25_gambler_midlife.',
  },

  child_soldier_path: {
    weight: 'major',
    category: 'trauma',
    description: 'Trigger flag: character will be taken as a child soldier. Set at birth or early conflict event.',
    intent: 'none',
    notes: 'Trigger flag. Set by conflict_zone birth roll or early-childhood conflict event. Gates cs_taken (weight 999).',
  },

  child_soldier_taken: {
    weight: 'major',
    category: 'trauma',
    description: 'Taken from village by an armed group as a child. The life before is the last of the before.',
    intent: 'year_texture',
    notes: 'Set by cs_taken.',
  },

  child_soldier_indoctrinated: {
    weight: 'major',
    category: 'trauma',
    description: 'Underwent the indoctrination process — weapon, uniform, ideology, the division of the world into us and enemy.',
    intent: 'year_texture',
    notes: 'Set by cs_indoctrination.',
  },

  child_soldier_order_followed: {
    weight: 'major',
    category: 'trauma',
    description: 'Carried out the order. The commanders produced what they intended. The weight of it does not leave.',
    intent: 'year_texture',
    notes: 'Set by cs_the_order (carry out choice). Coexists with moral_injury.',
  },

  child_soldier_order_refused: {
    weight: 'major',
    category: 'identity',
    description: 'Refused the order. The consequences were immediate and physical. The refusal is yours.',
    intent: 'year_texture',
    notes: 'Set by cs_the_order (refuse choice). Coexists with moral_injury.',
  },

  child_soldier_free: {
    weight: 'major',
    category: 'identity',
    description: 'Free from the armed group — escaped or liberated. No longer in the unit; not yet a civilian.',
    intent: 'year_texture',
    notes: 'Set by cs_liberation.',
  },

  child_soldier_ddr: {
    weight: 'moderate',
    category: 'identity',
    description: 'Went through DDR (Disarmament, Demobilisation, Reintegration) — the programme, the certificate, the partial.',
    intent: 'year_texture',
    notes: 'Set by cs_ddr_process.',
  },

  child_soldier_returned_home: {
    weight: 'major',
    category: 'identity',
    description: 'Returned to village — the complicated welcome, the mother\'s face, the knowledge held by both without being surfaced.',
    intent: 'year_texture',
    notes: 'Set by cs_return_to_village.',
  },

  child_soldier_civilian_hard: {
    weight: 'major',
    category: 'trauma',
    description: 'Civilian life doesn\'t fit — the body has military responses civilian contexts don\'t know how to receive.',
    intent: 'year_texture',
    notes: 'Set by cs_civilian_difficulty.',
  },

  child_soldier_late_reckoning: {
    weight: 'major',
    category: 'identity',
    description: 'In late life, understood the child who was taken — they were not a soldier. The name was false. The things done were real. Both true.',
    intent: 'year_texture',
    notes: 'Set by cs_late_reckoning. Age 55+.',
  },

  ww1_soldier: {
    weight: 'major',
    category: 'trauma',
    description: 'Enlisted or conscripted into WWI — the war, when reached, unlike what any belief prepared for.',
    intent: 'year_texture',
    notes: 'Set by ww1_conscription_notice. Gates ww1_trenches, ww1_armistice.',
  },

  ww1_trenches: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the trenches — ten feet deep, nine months occupied, the permanent mud, the categorized incoming shells.',
    intent: 'year_texture',
    notes: 'Set by ww1_trenches event. Gates ww1_shell_shock.',
  },

  ww1_survived: {
    weight: 'major',
    category: 'resilience',
    description: 'Survived WWI — part of the generation that carried the specific weight of the ones who came back.',
    intent: 'year_texture',
    notes: 'Set by ww1_armistice.',
  },

  ww1_armistice_witness: {
    weight: 'moderate',
    category: 'identity',
    description: 'Present when the guns stopped on the eleventh hour of the eleventh day — the silence that had a texture.',
    intent: 'none',
    notes: 'Set by ww1_armistice.',
  },

  ww1_veteran: {
    weight: 'major',
    category: 'identity',
    description: 'WWI veteran — home, different, carrying the specific weight of having come back when fourteen from the village did not.',
    intent: 'year_texture',
    notes: 'Set by ww1_return_home.',
  },

  flu_1918_survived: {
    weight: 'minor',
    category: 'resilience',
    description: 'Household survived the 1918 flu — survival in 1918 was its own kind of luck.',
    intent: 'none',
    notes: 'Set by flu_1918_household (survive choice).',
  },

  depression_era: {
    weight: 'major',
    category: 'trauma',
    description: 'Living through the Great Depression — the condition that settled over the years after 1929.',
    intent: 'year_texture',
    notes: 'Set by dep_crash_1929. Gates dep_job_loss, dep_long_recovery.',
  },

  depression_breadline: {
    weight: 'major',
    category: 'trauma',
    description: 'Stood in the breadline — the shame before the hunger becomes urgent, the photograph from inside.',
    intent: 'year_texture',
    notes: 'Set by dep_breadline.',
  },

  depression_survivor: {
    weight: 'major',
    category: 'identity',
    description: 'Great Depression survivor — the specific way of being in the world it produced: saving everything, distrusting security, kitchen garden long after necessary.',
    intent: 'year_texture',
    notes: 'Set by dep_long_recovery.',
  },

  divorce_known_before: {
    weight: 'minor',
    category: 'identity',
    description: 'Knew the marriage was over before the formal ending — began thinking practically while the form continued.',
    intent: 'none',
    notes: 'Set by div_the_long_end (start thinking practically choice).',
  },

  divorce_legal_done: {
    weight: 'moderate',
    category: 'identity',
    description: 'Divorce legally completed — the marriage translated into a ledger, the ledger filed.',
    intent: 'year_texture',
    notes: 'Set by div_legal_process. Requires divorced flag.',
  },

  divorce_year_one: {
    weight: 'moderate',
    category: 'trauma',
    description: 'First year after divorce — the structural losses, what was taken for granted, the shared life\'s shape now absent.',
    intent: 'year_texture',
    notes: 'Set by div_first_year. Requires divorce_legal_done.',
  },

  divorce_solo_choice: {
    weight: 'minor',
    category: 'identity',
    description: 'Chose not to date again after divorce — the aloneness has things to teach.',
    intent: 'none',
    notes: 'Set by div_dating_again (not yet choice).',
  },

  divorce_integrated: {
    weight: 'moderate',
    category: 'identity',
    description: 'Divorce integrated into the landscape of the life — no longer the defining feature, but part of the terrain.',
    intent: 'year_texture',
    notes: 'Set by div_long_integration. Midlife, 5-10 years out.',
  },

  dementia_advance_plan: {
    weight: 'moderate',
    category: 'identity',
    description: 'Made advance care plans while still able — decisions for the future self who cannot decide.',
    intent: 'none',
    notes: 'Set by dem_the_plan.',
  },

  dementia_clear_days: {
    weight: 'moderate',
    category: 'identity',
    description: 'The clear days — when the fog lifts and the distance the disease has put is visible from the outside.',
    intent: 'year_texture',
    notes: 'Set by dem_clarity_window.',
  },

  celebrity_public_self: {
    weight: 'major',
    category: 'identity',
    description: 'The public self exists — made from interviews, photographs, selected moments, searchable, permanent, partial.',
    intent: 'year_texture',
    notes: 'Set by cel_the_public_self. Fame >= 40.',
  },

  celebrity_parasocial: {
    weight: 'moderate',
    category: 'identity',
    description: 'The parasocial relationship — people who feel they know you feel genuinely what they feel for a version that isn\'t fully you.',
    intent: 'year_texture',
    notes: 'Set by cel_parasocial.',
  },

  celebrity_media_friction: {
    weight: 'moderate',
    category: 'identity',
    description: 'Responded to media framing — learned that correcting the record feeds the machinery.',
    intent: 'none',
    notes: 'Set by cel_media_scrutiny (respond choice).',
  },

  celebrity_spiral: {
    weight: 'major',
    category: 'trauma',
    description: 'In the celebrity spiral — fame and unhappiness coexisting, managing the emptiness unsustainably.',
    intent: 'year_texture',
    notes: 'Set by cel_the_spiral (fill it choice).',
  },

  celebrity_sought_help: {
    weight: 'moderate',
    category: 'resilience',
    description: 'Sought help during the celebrity emptiness — the work slow, the recognition that fame is neither problem nor solution arrived at over months.',
    intent: 'none',
    notes: 'Set by cel_the_spiral (get help choice).',
  },

  celebrity_faced_cancellation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Faced the cancellation directly — gave the specific, honest statement the machinery wasn\'t expecting.',
    intent: 'none',
    notes: 'Set by cel_cancellation (face it choice).',
  },

  celebrity_went_quiet: {
    weight: 'moderate',
    category: 'identity',
    description: 'Went quiet during the cancellation — stopped providing fuel to the machinery.',
    intent: 'none',
    notes: 'Set by cel_cancellation (go quiet choice).',
  },

  celebrity_fought_back: {
    weight: 'moderate',
    category: 'identity',
    description: 'Fought back against the cancellation — was right, paid for being publicly right.',
    intent: 'none',
    notes: 'Set by cel_cancellation (fight it choice).',
  },

  celebrity_scaled_back: {
    weight: 'major',
    category: 'identity',
    description: 'Scaled back from public life — the opportunities still there, choosing which ones matter.',
    intent: 'year_texture',
    notes: 'Set by cel_exit_from_public_life.',
  },

  celebrity_private_life: {
    weight: 'moderate',
    category: 'identity',
    description: 'Returned to private life — the ordinary things extraordinary by contrast with the distance fame put in.',
    intent: 'year_texture',
    notes: 'Set by cel_private_life_found.',
  },

  teacher_first_classroom: {
    weight: 'moderate',
    category: 'identity',
    description: 'First classroom — twenty-three years old, thirty-two students, the training as preparation for a general case.',
    intent: 'year_texture',
    notes: 'Set by tch_first_classroom.',
  },

  teacher_bureaucracy_survived: {
    weight: 'moderate',
    category: 'resilience',
    description: 'Survived the bureaucratic accumulation — found workarounds to protect classroom from system.',
    intent: 'none',
    notes: 'Set by tch_bureaucracy (adapt choice).',
  },

  teacher_advocate: {
    weight: 'moderate',
    category: 'identity',
    description: 'Became an advocate within the education system — known as someone with opinions, occasionally useful.',
    intent: 'none',
    notes: 'Set by tch_bureaucracy (push back choice).',
  },

  teacher_parent_conflict: {
    weight: 'minor',
    category: 'identity',
    description: 'Managed a difficult parent — the specific challenge of the parent who loves too specifically to see clearly.',
    intent: 'none',
    notes: 'Set by tch_difficult_parent.',
  },

  teacher_resource_poor: {
    weight: 'moderate',
    category: 'identity',
    description: 'Teaching in a resource-poor environment — own chalk, shared textbooks, roof that leaks, students who still learn.',
    intent: 'year_texture',
    notes: 'Set by tch_resource_poor.',
  },

  teacher_late_career: {
    weight: 'moderate',
    category: 'identity',
    description: 'Late-career teacher — the subject not a performance but a conversation, the depth that the first version lacked.',
    intent: 'year_texture',
    notes: 'Set by tch_late_career.',
  },

  teacher_retired: {
    weight: 'major',
    category: 'identity',
    description: 'Retired from teaching — the last class, the applause, the hallway on the way out that was the same hallway.',
    intent: 'year_texture',
    notes: 'Set by tch_retirement.',
  },

  teacher_life_accounted: {
    weight: 'major',
    category: 'identity',
    description: 'Accounted the teaching life — not in salary but in names remembered, moments that were the actual work, the faces.',
    intent: 'year_texture',
    notes: 'Set by tch_life_accounting.',
  },

  first_test_pushed_through: {
    weight: 'moderate',
    category: 'identity',
    description: 'Faced the first real test of their wound and pushed through rather than withdrawing.',
    intent: 'year_texture',
    notes: 'Set by ls_first_test life skeleton event.',
  },

  first_test_pulled_back: {
    weight: 'moderate',
    category: 'identity',
    description: 'Pulled back at the first real test of their wound — self-protection over exposure.',
    intent: 'year_texture',
    notes: 'Set by ls_first_test life skeleton event.',
  },

  first_test_confided: {
    weight: 'moderate',
    category: 'identity',
    description: 'Named the wound to someone at the first real test — found words for it.',
    intent: 'year_texture',
    notes: 'Set by ls_first_test life skeleton event.',
  },

  fork_stayed_course: {
    weight: 'major',
    category: 'identity',
    description: 'At the crossroads in early midlife, committed to the path already chosen.',
    intent: 'year_texture',
    notes: 'Set by ls_the_fork. Gates ls_the_cost prose variants.',
  },

  fork_changed_direction: {
    weight: 'major',
    category: 'identity',
    description: 'At the crossroads in early midlife, changed direction — altered the course of their life.',
    intent: 'year_texture',
    notes: 'Set by ls_the_fork. Gates ls_the_cost prose variants.',
  },

  reckoning_peace: {
    weight: 'major',
    category: 'identity',
    description: 'Made peace with the life lived — stopped arguing with it at the reckoning.',
    intent: 'year_texture',
    notes: 'Set by ls_the_reckoning.',
  },

  reckoning_still_time: {
    weight: 'major',
    category: 'identity',
    description: 'At the reckoning, chose to believe there is still time — refused acceptance.',
    intent: 'year_texture',
    notes: 'Set by ls_the_reckoning.',
  },

  ya_priority_achievement: {
    weight: 'moderate',
    category: 'identity',
    description: 'Entering young adulthood, prioritized career and achievement over all else.',
    intent: 'year_texture',
    notes: 'Set by phase_entry_young_adult.',
  },

  ya_priority_connection: {
    weight: 'moderate',
    category: 'identity',
    description: 'Entering young adulthood, prioritized love and belonging over ambition.',
    intent: 'year_texture',
    notes: 'Set by phase_entry_young_adult.',
  },

  ya_priority_identity: {
    weight: 'moderate',
    category: 'identity',
    description: 'Entering young adulthood, chose to spend the years figuring out who they actually are.',
    intent: 'year_texture',
    notes: 'Set by phase_entry_young_adult.',
  },

  ml_priority_build: {
    weight: 'moderate',
    category: 'identity',
    description: 'Entering midlife, chose to consolidate and build what already exists.',
    intent: 'none',
    notes: 'Set by phase_entry_midlife.',
  },

  ml_priority_repair: {
    weight: 'moderate',
    category: 'identity',
    description: 'Entering midlife, turned toward repair — the relationships and things that needed attention.',
    intent: 'year_texture',
    notes: 'Set by phase_entry_midlife.',
  },

  ml_priority_reconsider: {
    weight: 'moderate',
    category: 'identity',
    description: 'Entering midlife, chose to reconsider — acknowledged something wasn\'t working.',
    intent: 'year_texture',
    notes: 'Set by phase_entry_midlife.',
  },

  ll_priority_acceptance: {
    weight: 'moderate',
    category: 'identity',
    description: 'Entering late life, chose acceptance — made peace with what has been built.',
    intent: 'year_texture',
    notes: 'Set by phase_entry_late_life.',
  },

  ll_priority_transmit: {
    weight: 'moderate',
    category: 'identity',
    description: 'Entering late life, chose transmission — focused on passing things on to those who come after.',
    intent: 'year_texture',
    notes: 'Set by phase_entry_late_life.',
  },

  ll_priority_unfinished: {
    weight: 'moderate',
    category: 'identity',
    description: 'Entering late life, chose the unfinished — one more thing still to do.',
    intent: 'year_texture',
    notes: 'Set by phase_entry_late_life.',
  },

  maya_language_suppressed: {
    weight: 'major',
    category: 'trauma',
    description: 'Had their indigenous Maya language banned or punished at school — the specific suppression of a language as identity.',
    intent: 'both',
    notes: 'Set by ca_maya_school. Distinct from general indigenous suppression; specific to Guatemala\'s school-language policy 1960-1994.',
  },

  liberation_theology_influenced: {
    weight: 'moderate',
    category: 'formative',
    description: 'Shaped in youth by a liberation theology priest — the scripture-meets-social-justice tradition of Latin American Catholicism.',
    intent: 'year_texture',
    notes: 'Set by ca_liberation_theology and ca_archbishop_radio. Gates liberation_theology_cost follow-through events if character later faces regime pressure.',
  },

  contra_war_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the US-backed Contra war against the Sandinista government in Nicaragua 1981-1990.',
    intent: 'both',
    notes: 'Set by ca_contra_witness. Distinct from civil_war_lived — this was a proxy war with a specific Cold War ideological structure.',
  },

  northern_journey_taken: {
    weight: 'major',
    category: 'formative',
    description: 'Made the decision to migrate north — the Central American journey toward the US border, undocumented.',
    intent: 'both',
    notes: 'Set by ca_north_or_stay. Interfaces with residencyStatus (undocumented) and existing immigration events.',
  },

  peace_accords_generation: {
    weight: 'moderate',
    category: 'formative',
    description: 'Old enough to understand what the peace accords meant — came of age during or just after the signing of Central American civil war settlements.',
    intent: 'year_texture',
    notes: 'Set by ca_peace_accords_day and the central_america_peace_accords world event.',
  },

  ca_truth_told: {
    weight: 'moderate',
    category: 'formative',
    description: 'Gave full testimony to a truth commission — chose to put everything on the record despite the risks of naming names.',
    intent: 'year_texture',
    notes: 'Set by ca_truth_commission (full testimony branch).',
  },

  witnessed_romero_death: {
    weight: 'major',
    category: 'trauma',
    description: 'Old enough to understand the assassination of Archbishop Romero in El Salvador, 1980 — the killing of the voice that named the dead.',
    intent: 'year_texture',
    notes: 'Set by the romero_assassination_1980 world event.',
  },

  lived_through_coup: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through a military coup — the specific experience of a government falling violently and the silence that follows.',
    intent: 'year_texture',
    notes: 'Set by guatemala_coup_1954 world event.',
  },

  inst_power_accounted: {
    weight: 'moderate',
    category: 'faith',
    description: 'Clergy character who faced a reckoning with their institutional power — spoke truth or kept silence.',
    intent: 'year_texture',
    notes: 'Set by inst_power_accounting. Follow-through for institutional_power.',
  },

  spoke_institutional_truth: {
    weight: 'moderate',
    category: 'faith',
    description: 'Chose to speak honestly about institutional failures despite personal cost.',
    intent: 'year_texture',
    notes: 'Set by inst_power_accounting or clergy_adapted_late_reckoning.',
  },

  clergy_adapted_reckoned: {
    weight: 'moderate',
    category: 'faith',
    description: 'Clergy who adapted to authoritarian rule has faced a late-life reckoning with what that cost.',
    intent: 'year_texture',
    notes: 'Set by clergy_adapted_late_reckoning.',
  },

  amazigh_recognized_late: {
    weight: 'moderate',
    category: 'identity',
    description: 'Amazigh character who witnessed official recognition of their language and identity post-2011.',
    intent: 'year_texture',
    notes: 'Set by amazigh_official_recognition.',
  },

  multilingual_inheritance_passed: {
    weight: 'moderate',
    category: 'identity',
    description: 'Multilingual character who watched their multilingual identity pass to the next generation.',
    intent: 'year_texture',
    notes: 'Set by multilingual_inheritance.',
  },

  language_spoken_to_grandchild: {
    weight: 'moderate',
    category: 'identity',
    description: 'Minority language speaker who actively passed the language to the next generation.',
    intent: 'year_texture',
    notes: 'Set by minority_language_grandchild.',
  },

  kurd_europe_question_faced: {
    weight: 'moderate',
    category: 'identity',
    description: 'Kurdish European diaspora character who directly faced the question of return.',
    intent: 'year_texture',
    notes: 'Set by kurd_europe_return_question.',
  },

  kurd_return_planning: {
    weight: 'moderate',
    category: 'identity',
    description: 'Kurdish diaspora character actively planning a return to their homeland.',
    intent: 'year_texture',
    notes: 'Set by kurd_europe_return_question (return choice).',
  },

  moroccan_diaspora_looking_back: {
    weight: 'moderate',
    category: 'identity',
    description: 'Moroccan diaspora character who has lived longer in Europe than in Morocco.',
    intent: 'year_texture',
    notes: 'Set by moroccan_diaspora_counting.',
  },

  mouride_diaspora_dahira: {
    weight: 'moderate',
    category: 'faith',
    description: 'Mouride member who found or built a dahira community in the diaspora.',
    intent: 'year_texture',
    notes: 'Set by mouride_diaspora_dahira event.',
  },

  baath_state_learned: {
    weight: 'moderate',
    category: 'identity',
    description: 'Syrian character who grew up under Ba\'ath party rule and learned the grammar of authoritarian surveillance — portraits, silence, the unsaid.',
    intent: 'year_texture',
    notes: 'Set by sy_baath_childhood. Gates deeper Syria events.',
  },

  hama_silence: {
    weight: 'major',
    category: 'trauma',
    description: 'Syrian character who knew or witnessed the 1982 Hama massacre — the defining silence of a generation.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by sy_hama_1982. Up to 40,000 dead. The event that taught the lesson of this state.',
  },

  civil_war_checkpoint_daily: {
    weight: 'major',
    category: 'trauma',
    description: 'Syrian character who lived through the daily reality of a divided city — checkpoints, barrel bombs, knowing which roads are safe this week.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by sy_checkpoint_life.',
  },

  civil_war_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'Character who survived the Syrian civil war from inside the country.',
    intent: 'year_texture',
    notes: 'Set by sy_checkpoint_life. Broad survival flag.',
  },

  great_leap_hunger: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the famine years of the Great Leap Forward (1959-62) — the specific texture of permanent hunger as a child.',
    intent: 'year_texture',
    notes: 'Set by cn_great_leap_hunger.',
  },

  struggle_session_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'Was the target of a Cultural Revolution struggle session — stood in the centre while classmates and teachers read charges aloud.',
    intent: 'year_texture',
    notes: 'Set by cn_struggle_session_target.',
  },

  denounced_family_cr: {
    weight: 'major',
    category: 'trauma',
    description: 'During a Cultural Revolution struggle session, confirmed the charges against a parent — the impossible calculus of survival.',
    intent: 'year_texture',
    notes: 'Set by cn_struggle_session_target (confirm choice). Branch of struggle_session_survived.',
  },

  refused_denounce_cr: {
    weight: 'major',
    category: 'trauma',
    description: 'During a Cultural Revolution struggle session, refused to confirm the charges against a parent — accepted the consequences.',
    intent: 'year_texture',
    notes: 'Set by cn_struggle_session_target (refuse choice). Branch of struggle_session_survived.',
  },

  struggle_session_witnessed: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Witnessed a Cultural Revolution struggle session — saw a classmate or colleague publicly humiliated, made smaller in real time.',
    intent: 'year_texture',
    notes: 'Set by cn_struggle_session_witness.',
  },

  reform_era_participant: {
    weight: 'minor',
    category: 'opportunity',
    description: 'Participated in China\'s 1990s reform era — caught the wave of the country reorganising from scarcity to surplus.',
    intent: 'year_texture',
    notes: 'Set by cn_reform_euphoria (get in choice).',
  },

  hui_identity_marked: {
    weight: 'moderate',
    category: 'identity',
    description: 'Hui Muslim in China — learned early to manage a Muslim identity inside a country where Islam is practiced but never unremarked.',
    intent: 'year_texture',
    notes: 'Set by cn_hui_experience.',
  },

  built_state_generation: {
    weight: 'major',
    category: 'identity',
    description: 'Israeli founding generation — grew up knowing the state was built for them, with the weight that comes with that knowledge.',
    intent: 'year_texture',
    notes: 'Set by il_founding_memory.',
  },

  mizrahi_culture_kept: {
    weight: 'moderate',
    category: 'identity',
    description: 'Mizrahi Jew who consciously carried the culture — music, food, language of the house — through the Ashkenazi-dominated integration process.',
    intent: 'year_texture',
    notes: 'Set by il_mizrahi_maabara (culture choice).',
  },

  idf_served: {
    weight: 'major',
    category: 'identity',
    description: 'Completed Israeli mandatory military service — the institution that shapes Israeli adult identity more than any other.',
    intent: 'year_texture',
    notes: 'Set by il_idf_service.',
  },

  idf_combat_veteran: {
    weight: 'major',
    category: 'trauma',
    description: 'Served in a combat unit during IDF service — the specific closeness and weight of the platoon experience.',
    intent: 'year_texture',
    notes: 'Set by il_idf_service (combat choice).',
  },

  yom_kippur_front_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'Was deployed to the front during the Yom Kippur War 1973 — the first two days, the near-catastrophe, what the army was capable of.',
    intent: 'year_texture',
    notes: 'Set by il_yom_kippur_personal (deployed choice).',
  },

  yom_kippur_witness: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Witnessed the Yom Kippur War from the rear — the bulletins, the men returning, the close calls that were other people\'s close calls.',
    intent: 'year_texture',
    notes: 'Set by il_yom_kippur_personal (rear choice).',
  },

  rabin_killed_witness: {
    weight: 'major',
    category: 'trauma',
    description: 'Israeli who lived through the Rabin assassination 1995 — the rally for peace, the specific content of the shock (who killed him and why).',
    intent: 'year_texture',
    notes: 'Set by il_rabin_killed.',
  },

  second_intifada_terror_lived: {
    weight: 'major',
    category: 'trauma',
    description: 'Israeli civilian during the second intifada (2001-05) — buses as calculations, the changed routes, the daily arithmetic that does not appear in casualty statistics.',
    intent: 'year_texture',
    notes: 'Set by il_second_intifada_fear.',
  },

  arab_citizen_divided_self: {
    weight: 'major',
    category: 'identity',
    description: 'Arab citizen of Israel navigating two identities — the passport and the Arabic name, the Hebrew at work and Arabic at home, Independence Day and its other.',
    intent: 'year_texture',
    notes: 'Set by il_arab_citizen_identity.',
  },

  oct7_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'Israeli who lived through October 7 2023 — the alert at 6:29am, the scale arriving in pieces, the after.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by il_oct7_reckoning.',
  },

  oct7_lost_someone: {
    weight: 'major',
    category: 'trauma',
    description: 'Lost a specific person — friend, family member, neighbour — on October 7 2023.',
    intent: 'year_texture',
    notes: 'Set by il_oct7_reckoning (lost someone choice). Branch of oct7_survived.',
  },

  discrimination_named: {
    weight: 'minor',
    category: 'identity',
    description: 'Named discrimination they experienced rather than absorbing it silently — the act of naming as record.',
    intent: 'none',
    notes: 'Set by il_ethiopian_aliyah_arrival (named discrimination choice).',
  },

  inside_gaza_bombardment: {
    weight: 'major',
    category: 'trauma',
    description: 'Was inside Gaza during a major Israeli military operation — the F-16s at night, the children not sleeping, the memorised basement location.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by pal_gaza_bombardment.',
  },

  nakba_day_keeper: {
    weight: 'minor',
    category: 'identity',
    description: 'Passed the key on to the next generation — the act that says what words cannot about return and memory.',
    intent: 'none',
    notes: 'Set by pal_late_return_question.',
  },

  pandemic_healthcare_worker: {
    weight: 'major',
    category: 'trauma',
    description: 'Was a healthcare worker on the front line during COVID-19 — the PPE shortages, the ward deaths in a specific order, the tablet held up to a dying patient\'s face.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by pan_healthcare_worker / pan_healthcare_worker_midlife.',
  },

  pandemic_burned_out: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Took burnout leave during the pandemic — the ward felt like abandonment even as the body needed rest.',
    intent: 'year_texture',
    notes: 'Set alongside pandemic_healthcare_worker when burnout leave is chosen.',
  },

  pandemic_elderly_isolated: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Spent the pandemic years isolated at 70+ — the window waves, the more frequent calls that were also a kind of loneliness.',
    intent: 'year_texture',
    notes: 'Set by pan_elderly_isolation.',
  },

  broke_the_rules_for_this: {
    weight: 'minor',
    category: 'identity',
    description: 'Broke pandemic regulations to be present at a dying parent\'s bedside — a choice carried without regret.',
    intent: 'none',
    notes: 'Set by pan_death_without_goodbye when break_the_rules is chosen.',
  },

  pandemic_unvaccinated: {
    weight: 'moderate',
    category: 'identity',
    description: 'Declined the COVID-19 vaccine — this became a position held and asked about.',
    intent: 'year_texture',
    notes: 'Set by pan_vaccine_choice when decline is chosen.',
  },

  pandemic_long_covid: {
    weight: 'major',
    category: 'trauma',
    description: 'Developed long COVID — the stairs, the Thursday afternoon concentration, the thing that is simultaneously true and not quite accepted.',
    intent: 'both',
    notes: 'Set by pan_long_covid / pan_long_covid_midlife. Also calls p.addCondition(\'long_covid\', \'mild\').',
  },

  english_medium_identity: {
    weight: 'moderate',
    category: 'identity',
    description: 'Claimed English as the primary vehicle — the door opened, and the gap to the village grew at the same pace.',
    intent: 'year_texture',
    notes: 'Set by ind_english_medium_identity.',
  },

  bilingual_identity: {
    weight: 'moderate',
    category: 'identity',
    description: 'Held two languages and the uncomfortable position between them — fluent in the discomfort.',
    intent: 'year_texture',
    notes: 'Set by ind_english_medium_identity (hold-both branch).',
  },

  regional_identity_pride: {
    weight: 'moderate',
    category: 'identity',
    description: 'Led with a regional Indian identity rather than performing national neutrality.',
    intent: 'year_texture',
    notes: 'Set by ind_regional_language_pride.',
  },

  national_identity_neutral: {
    weight: 'minor',
    category: 'identity',
    description: 'Learned to perform the national neutrality — the performance became habit.',
    intent: 'none',
    notes: 'Set by ind_regional_language_pride (neutrality branch).',
  },

  dowry_negotiated: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Family managed the full dowry demand — the figure settled, the cost not spoken.',
    intent: 'year_texture',
    notes: 'Set by ind_dowry_negotiation.',
  },

  dowry_contested: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Tried to reduce the dowry demand — partially succeeded; something in the other family\'s warmth was also partially reduced.',
    intent: 'year_texture',
    notes: 'Set by ind_dowry_negotiation (contest branch).',
  },

  suppressed_ambition: {
    weight: 'major',
    category: 'identity',
    description: 'Accepted a path that was not the thing wanted — the other thing went into a drawer and stayed there.',
    intent: 'both',
    notes: 'Set by ind_first_gen_pressure (want-something-else or say-it branch).',
  },

  first_gen_defied: {
    weight: 'moderate',
    category: 'identity',
    description: 'Said what they actually wanted to a family that had already decided — the silence that followed had a shape.',
    intent: 'event',
    notes: 'Set by ind_first_gen_pressure (say-it branch). Follow-through: ind_first_gen_defied_echo.',
  },

  invisible_labour_known: {
    weight: 'moderate',
    category: 'identity',
    description: 'Named the arithmetic of primary domestic responsibility that is not quite discussable.',
    intent: 'year_texture',
    notes: 'Set by ind_mothers_labour.',
  },

  academic_pressure: {
    weight: 'moderate',
    category: 'identity',
    description: 'Entered the narrow path — engineering or medicine, the entrance exam, everything else waiting until after.',
    intent: 'year_texture',
    notes: 'Set by ind_first_gen_pressure.',
  },

  suppressed_ambition_revived: {
    weight: 'minor',
    category: 'identity',
    description: 'Found a way to hold the suppressed thing — a class, an evening practice. Not what it would have been; also not nothing.',
    intent: 'none',
    notes: 'Set by ind_suppressed_ambition_midlife (revive branch).',
  },

  suppressed_ambition_buried: {
    weight: 'minor',
    category: 'identity',
    description: 'Kept walking past the bookshop — the arithmetic of the trade continues, the career remains very good.',
    intent: 'none',
    notes: 'Set by ind_suppressed_ambition_midlife (bury branch).',
  },

  gr_testigo_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Late-life witness to the full Greek arc — civil war aftermath, junta, Polytechnic, Metapolitefsi, EU accession, debt crisis, OXI',
    intent: 'both',
    notes: 'Set by gr_late_reckoning.',
  },

  colonial_war_served: {
    weight: 'major',
    category: 'trauma',
    description: 'Served in the Portuguese colonial wars in Africa (Angola, Guinea-Bissau, Mozambique, 1961–74) — came back changed in ways that take years to name.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by pt_colonial_war.',
  },

  witnessed_displacement: {
    weight: 'minor',
    category: 'formative',
    description: 'Witnessed mass displacement or return migration as a bystander — the particular weight of watching people arrive with everything they own.',
    intent: 'none',
    notes: 'Set by pt_retornados and similar displacement events.',
  },

  post_edsa_private: {
    weight: 'minor',
    category: 'identity',
    description: 'Redirected from politics to private life after post-EDSA disillusionment — brownouts, failed promises, surviving dynasties.',
    intent: 'none',
    notes: 'Set by ph_post_edsa_disillusionment.',
  },

  typhoon_upbringing: {
    weight: 'minor',
    category: 'formative',
    description: 'Grew up with typhoon season as a recurring structure of childhood — Signal 1/2/3, suspended classes, floods that come and leave.',
    intent: 'year_texture',
    notes: 'Set by ph_typhoon_season.',
  },

  haiyan_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Was in the Visayas during Typhoon Haiyan (Yolanda) November 2013 — 6,300 dead, 6-metre storm surge, debris fields where streets had been.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by ph_haiyan_2013 (affected-area branch).',
  },

  metoo_era: {
    weight: 'minor',
    category: 'identity',
    description: 'Lived through the 2017–19 #MeToo reckoning — the public naming of what had been privately understood.',
    intent: 'none',
    notes: 'Set by we_metoo_2017.',
  },

  black_summer_witnessed: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Lived through Australia\'s 2019–20 Black Summer — the months of smoke, orange sky, and 18 million hectares of fire.',
    intent: 'none',
    notes: 'Set by we_australian_bushfires_2019.',
  },

  jan6_witnessed: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Watched the January 6, 2021 Capitol attack — the first violent interruption of the US peaceful transfer of power.',
    intent: 'none',
    notes: 'Set by we_jan6_2021.',
  },

  bra_evangelical_convert: {
    weight: 'moderate',
    category: 'identity',
    description: 'Converted from Catholicism to evangelical Protestantism in Brazil\'s one-generation religious transformation — the Universal Church, the prosperity gospel, the favela congregation.',
    intent: 'year_texture',
    notes: 'Set by bra_evangelical_shift (choice 1).',
  },

  arg_2001_stayed: {
    weight: 'moderate',
    category: 'identity',
    description: 'Stayed in Argentina through the 2001–02 collapse, navigating the pesificación and rebuilding within the country while others left.',
    intent: 'year_texture',
    notes: 'Set by la_arg_pesificacion (stay choice).',
  },

  inner_dissent: {
    weight: 'minor',
    category: 'identity',
    description: 'Filed the gap between official narrative and felt experience — a quiet interior resistance that preceded any capacity to name it.',
    intent: 'year_texture',
    notes: 'Set by es_franco_school (filing-the-gap branch) and other events.',
  },

  basque_suppressed: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up with Euskara as a private language — banned or discouraged from official spaces under Franco; the language held as a form of resistance.',
    intent: 'year_texture',
    notes: 'Set by es_basque_language_suppressed.',
  },

  catalan_suppressed: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up with Català suppressed in official spaces — "Habla la lengua del Imperio." The language held at home while Castilian was required at school.',
    intent: 'year_texture',
    notes: 'Set by es_catalan_language_suppressed.',
  },

  galician_suppressed: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up with Galego treated as rural/old — the irony that Galicia was Franco\'s origin region and Galego was still marginalised.',
    intent: 'year_texture',
    notes: 'Set by es_galician_language_texture.',
  },

  '23F_remembered': {
    weight: 'moderate',
    category: 'trauma',
    description: 'Was alive and aware for February 23, 1981 — Tejero in the Cortes, the 17-hour wait, the moment when nobody knew what kind of country it would be tomorrow.',
    intent: 'year_texture',
    notes: 'Set by es_23F_coup_attempt.',
  },

  spain_crisis_stayed: {
    weight: 'moderate',
    category: 'resilience',
    description: 'Stayed in Spain through the 2010s crisis — the mileurista generation, the job that didn\'t use the degree, the parents\' apartment another year.',
    intent: 'year_texture',
    notes: 'Set by es_brain_drain (stay branch).',
  },

  hajj_complete: {
    weight: 'major',
    category: 'spiritual',
    description: 'Completed the Hajj pilgrimage — the tawaf at the Ka\'aba, Mina, Arafat, the millions of bodies moving in the same direction. Returned changed in ways that take years to name.',
    intent: 'year_texture',
    notes: 'Set by events_religion_arc.js (Hajj choice) and events_religion.js (Hajj choice). Checks for religion beginning with "muslim".',
  },

  surveillance_paranoia: {
    weight: 'moderate',
    category: 'psychological',
    description: 'Carries the learned reflex of self-censorship from living under state surveillance — the habit of managing what is said in which rooms, faster than conscious thought.',
    intent: 'year_texture',
    notes: 'Set by events_culture.js (information_surveillance event) and events_career_regime.js (journalist_source_arrested event).',
  },

  survived_hyperinflation: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived hyperinflation — savings account numbers that stayed the same as the numbers became worth fractions; learning to spend the day you were paid; the literacy of what a currency actually is.',
    intent: 'year_texture',
    notes: 'Set by events_culture.js (hyperinflation event) and events_world_response.js (world event response).',
  },

  cultural_revolution_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the Chinese Cultural Revolution (1966–76) — the school closures, the struggle sessions, the decade that organized itself around the destruction of the educated.',
    intent: 'year_texture',
    notes: 'Set by world event we_china_cultural_revolution.',
  },

  economic_collapse_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through national economic collapse — the currency devaluation, the bank freeze, the savings repriced into something worth a fraction of what they had been.',
    intent: 'year_texture',
    notes: 'Set by we_venezuela_collapse and similar catastrophic economic world events.',
  },

  ill_child_ward_community: {
    weight: 'minor',
    category: 'resilience',
    description: 'Found an unexpected community in the hospital ward — other parents who knew the specific knowledge the situation required.',
    intent: 'none',
    notes: 'Set by sick_child_ward_community.',
  },

  khmer_rouge_rural_witness: {
    weight: 'major',
    category: 'trauma',
    description: 'Was already living in the Cambodian countryside when the Khmer Rouge arrived in 1975 — witnessed Year Zero from within the cooperative system, not as an evacuee.',
    intent: 'year_texture',
    notes: 'Set by cam_rural_year_zero. Supplements khmer_rouge_survivor from events_asia_arcs.js.',
  },

  family_taken_khmer_rouge: {
    weight: 'major',
    category: 'trauma',
    description: 'Had a parent summoned for Khmer Rouge re-education — watched them walk up the road with two cadres, not knowing it was the last time.',
    intent: 'year_texture',
    notes: 'Set by cam_family_taken. Calls killParent(). Distinct from genocide_survivor (more personal/specific loss).',
  },

  perpetrator_neighbor_silence: {
    weight: 'moderate',
    category: 'moral',
    description: 'Chose to maintain civil relations with a former Khmer Rouge operative living in the same community — the daily cost of the amnesty that made Cambodia function.',
    intent: 'year_texture',
    notes: 'Set by cam_living_alongside (civility choice).',
  },

  refused_complicit_silence: {
    weight: 'moderate',
    category: 'moral',
    description: 'Refused to maintain civil relations with a former Khmer Rouge operative — chose personal integrity over the practical arrangement, at practical cost.',
    intent: 'year_texture',
    notes: 'Set by cam_living_alongside (refusal choice).',
  },

  khmer_rouge_second_gen_researched: {
    weight: 'minor',
    category: 'identity',
    description: 'Second-generation Cambodian who responded to parental silence by researching the Khmer Rouge history independently.',
    intent: 'none',
    notes: 'Set by cam_second_generation_silence (research choice).',
  },

  khmer_rouge_second_gen_silence: {
    weight: 'minor',
    category: 'identity',
    description: 'Second-generation Cambodian who chose to respect the parental silence about Khmer Rouge — carries the questions as a specific kind of not-knowing.',
    intent: 'none',
    notes: 'Set by cam_second_generation_silence (silence choice).',
  },

  khmer_rouge_late_reckoned: {
    weight: 'moderate',
    category: 'resilience',
    description: 'In late life, reached a reckoning with what was passed on — the silence, the building, the question of what was protected and what was lost.',
    intent: 'year_texture',
    notes: 'Set by cam_survivor_late_reckoning.',
  },

  rasta_encounter: {
    weight: 'moderate',
    category: 'identity',
    description: 'Encountered Rastafari as a living theological and political movement — the reasoning about Babylon, Zion, African repatriation, and colonial inheritance from someone inside it.',
    intent: 'year_texture',
    notes: 'Set by jam_rasta_as_form. Not about aesthetics — about the worldview.',
  },

  jamaica_stayed: {
    weight: 'moderate',
    category: 'identity',
    description: 'Chose to stay in Jamaica when emigration was the live option — carried the awareness of what that meant as the people who left sent letters.',
    intent: 'year_texture',
    notes: 'Set by jam_emigration_decision (stay choice).',
  },

  reggae_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Came of age with reggae and ska as a living political and spiritual consciousness — sound system culture, the specific argument in the bass line.',
    intent: 'none',
    notes: 'Set by jam_reggae_generation.',
  },

  jam_late_reckoned: {
    weight: 'minor',
    category: 'resilience',
    description: 'In late life, reached a reckoning with what Jamaica did to itself — or what leaving meant — the accumulated understanding of a specific political history.',
    intent: 'none',
    notes: 'Set by jam_late_reckoning.',
  },

  carnival_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up with Trinidad Carnival as a total social institution — the mas camp, the steel band, the road march, the calypso as political commentary.',
    intent: 'year_texture',
    notes: 'Set by tri_carnival_season.',
  },

  indotrinidadian_ethnic_tension: {
    weight: 'moderate',
    category: 'identity',
    description: 'Indo-Trinidadian who navigated the ethnic politics of T&T — the DLP/UNC as community party, the PNM majority, the accommodation that requires keeping certain conversations from happening.',
    intent: 'year_texture',
    notes: 'Set by tri_ethnic_politics_indo.',
  },

  afrotrinidadian_politics_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Afro-Trinidadian who voted in the ethnic-party structure — PNM majority, the specific accommodation with Indo-Trinidadian neighbors that the cricket ground and Carnival road share.',
    intent: 'none',
    notes: 'Set by tri_ethnic_politics_afro.',
  },

  steelband_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up with the steel pan as the national instrument — the instrument invented from oil drums after the colonial ban on African drums, now played across ethnic lines.',
    intent: 'none',
    notes: 'Set by tri_steelband_solidarity.',
  },

  camp_boiro_survivor_adjacent: {
    weight: 'major',
    category: 'trauma',
    description: 'Someone close survived Camp Boiro — the political prison where thousands were killed by deliberate starvation under the "black diet."',
    intent: 'year_texture',
    notes: 'Set by gn_camp_boiro (survived branch). Carries the weight of what the survivor does not say.',
  },

  guinea_stayed_accommodation: {
    weight: 'moderate',
    category: 'survival',
    description: 'Stayed in Guinea and learned the accommodations staying required — which projects to propose, which knowledge to keep private.',
    intent: 'event',
    notes: 'Set by gn_educated_class_leaves (stay branch).',
  },

  guinea_stadium_2009_witness: {
    weight: 'major',
    category: 'trauma',
    description: 'Witnessed or lived through the September 28, 2009 stadium massacre in Conakry — 157 killed, systematic rape by Presidential Guard soldiers.',
    intent: 'year_texture',
    notes: 'Set by gn_stadium_2009. Late-life reckoning through impunity — Dadis Camara still alive in Burkina Faso.',
  },

  mongolian_nomadic_heritage: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up in a nomadic herding family — the seasonal routes, the ger assembly, the terrain knowledge that lives in the body not books.',
    intent: 'year_texture',
    notes: 'Set by mn_nomadic_herder_childhood. Gates mn_dzud_winter and mn_ulaanbaatar_migration.',
  },

  stalinist_purge_family_memory: {
    weight: 'major',
    category: 'trauma',
    description: 'Family member was killed in the 1937–38 Stalinist purges of Mongolian Buddhism; 22,000 monks killed, 700 monasteries destroyed.',
    intent: 'year_texture',
    notes: 'Set by mn_stalinist_purge_family. Hidden thangkas, official story of "illness."',
  },

  dzud_survivor: {
    weight: 'major',
    category: 'survival',
    description: 'Survived a dzud — catastrophic winter when snow seals the grass and livestock die by thousands; the 2000 dzud killed a third of Mongolia\'s national herd.',
    intent: 'year_texture',
    notes: 'Set by mn_dzud_winter. Permanent relationship to winter weather; climate arc texture.',
  },

  sankara_mourner: {
    weight: 'major',
    category: 'trauma',
    description: 'Carries the specific grief of Sankara\'s assassination — a political death experienced as personal loss, the friend-who-killed-his-friend betrayal.',
    intent: 'year_texture',
    notes: 'Set by bfa_sankara_killed (Memorize branch) or sankara_assassination_1987 world event. Annual texture: the unmarked grave, the renamed boulevard.',
  },

  mali_empire_memory: {
    weight: 'minor',
    category: 'identity',
    description: 'Carries the memory of the ancient Mali, Ghana, and Songhai empires as a living identity reference — Mansa Musa, Timbuktu, manuscripts — not just textbook history.',
    intent: 'year_texture',
    notes: 'Set by mli_empire_heritage. Informs late-life reckoning prose: "from poverty" vs. "from this."',
  },

  mali_cotton_generation: {
    weight: 'moderate',
    category: 'experience',
    description: 'Worked within Mali\'s CMDT cotton system — planted cotton under state price controls, experienced the gap between the farmer\'s risk and the company\'s price-setting power.',
    intent: 'year_texture',
    notes: 'Set by mli_cotton_economy. Year texture: harvest season arithmetic, cotton bales, the price announcement.',
  },

  mali_traore_era: {
    weight: 'moderate',
    category: 'experience',
    description: 'Came of age under Moussa Traoré\'s 23-year military dictatorship (1968–1991) — learned the vocabulary of the unsayable, navigated single-party silence.',
    intent: 'year_texture',
    notes: 'Set by mli_traore_era. Year texture: UDPM party formalities, the careful language of daily life under managed silence.',
  },

  tuareg_malian: {
    weight: 'major',
    category: 'identity',
    description: 'Tuareg (Kel Tamasheq) identity in Mali — nomadic Berber people living across Saharan borders, negotiating between the desert logic and the Malian state\'s sedentarization.',
    intent: 'both',
    notes: 'Set by mli_tuareg_question. Gates tuareg_nomadic_life and tuareg_settled branches. Year texture: the seasonal route, the tent, the identity document.',
  },

  tuareg_nomadic_life: {
    weight: 'moderate',
    category: 'experience',
    description: 'Tuareg character who maintained a nomadic way of life — seasonal migrations, camel herding, navigation by stars, existence outside state record-keeping.',
    intent: 'year_texture',
    notes: 'Set by mli_tuareg_question (nomadic branch). Year texture: the route, the well, the tent fabric in different temperatures.',
  },

  tuareg_settled: {
    weight: 'moderate',
    category: 'experience',
    description: 'Tuareg character who settled in cities — Bamako, Gao, or Kidal — navigating dual identity as Tuareg and urban Malian, visibility vs. assimilation.',
    intent: 'year_texture',
    notes: 'Set by mli_tuareg_question (settled branch). Year texture: being Tuareg in a city that sees you as a type.',
  },

  mali_long_witness: {
    weight: 'major',
    category: 'experience',
    description: 'Late-life reckoning with Mali\'s cycle of coups (1968, 1991, 2012, 2020, 2021) — lived through democracy\'s arrival and its collapse, having marched or witnessed 1991.',
    intent: 'year_texture',
    notes: 'Set by mli_sahel_late_reckoning. Late-life only. The march as middle of a story rather than its end.',
  },

  eritrean_late_reckoned: {
    weight: 'moderate',
    category: 'identity',
    description: 'Measured independent Eritrea against what the independence movement said it would be — the gap between 1993 and now, the generation lost to indefinite service.',
    intent: 'none',
    notes: 'Set by eri_late_reckoning.',
  },

  devout: {
    weight: 'moderate',
    category: 'faith',
    description: 'Adherent faith practice — prayer, observance, community — that guides daily decisions rather than being nominal.',
    intent: 'none',
    notes: 'Cross-cutting. Set by various religion and cultural events. Checked 6x across event guards.',
  },

  acceptance: {
    weight: 'minor',
    category: 'identity',
    description: 'Reached a state of genuine acceptance after hardship — not forgetting, but no longer fighting what cannot be changed.',
    intent: 'none',
    notes: 'Cross-cutting. Set by late-life reflection and grief events.',
  },

  found_meaning: {
    weight: 'moderate',
    category: 'identity',
    description: 'Located meaning or purpose — in work, faith, family, or community — that makes the difficult years coherent in retrospect.',
    intent: 'none',
    notes: 'Cross-cutting. Set by desire-resolution, religion-arc, and community events.',
  },

  integrity: {
    weight: 'moderate',
    category: 'moral',
    description: 'Maintained moral integrity under conditions designed to compromise it — the refusal that cost something real.',
    intent: 'none',
    notes: 'Cross-cutting. Set by corruption, authoritarian, and career events.',
  },

  principled: {
    weight: 'moderate',
    category: 'moral',
    description: 'Acted from principle when the easier or safer path was available — known to others as someone who means what they say.',
    intent: 'none',
    notes: 'Cross-cutting. Set by moral choice events across contexts.',
  },

  community_leader: {
    weight: 'moderate',
    category: 'identity',
    description: 'Took on formal or informal community leadership — the person others bring problems to, the one who shows up.',
    intent: 'none',
    notes: 'Cross-cutting. Set by social capital, religion-arc, and rural texture events.',
  },

  corruption_exposed: {
    weight: 'moderate',
    category: 'moral',
    description: 'Exposed or bore witness to systematic corruption at close range — the knowledge of how the money actually moves.',
    intent: 'none',
    notes: 'Cross-cutting. Set by career-regime, Mani Pulite, and political events.',
  },

  disaster_survivor: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Survived a major natural disaster — earthquake, flood, cyclone — and carries the specific recalibration of risk that produces.',
    intent: 'both',
    notes: 'Set by events_disasters.js, events_nepal.js, events_haiti.js, and others where physical disaster survival is confirmed.',
  },

  left_school_early: {
    weight: 'moderate',
    category: 'identity',
    description: 'Exited formal education before completion — for work, family obligation, marriage, conflict, or necessity.',
    intent: 'none',
    notes: 'Cross-cutting. Set by poverty, child labor, family obligation, and conflict events.',
  },

  found_meaning: {
    weight: 'moderate',
    category: 'psychological',
    description: 'Found a source of meaning — work, community, faith, art, or relationship — that orients the life beyond survival.',
    intent: 'both',
    notes: 'Set by faith arc, project arc, teaching arc, and desire-resolution events.',
  },

  acceptance: {
    weight: 'minor',
    category: 'psychological',
    description: 'Reached a state of acceptance — of loss, limitation, or circumstance — that is not resignation but a genuine reckoning.',
    intent: 'event',
    notes: 'Set by grief, late-life, and disability arc events when character reaches genuine acceptance.',
  },

  integrity: {
    weight: 'minor',
    category: 'psychological',
    description: 'Acted with integrity under pressure — a specific instance of choosing honesty or principle when the easier path was available.',
    intent: 'event',
    notes: 'Set by ethical choice events in career, crisis, and regime arcs.',
  },

  experienced_loss: {
    weight: 'moderate',
    category: 'psychological',
    description: 'Experienced significant loss — beyond standard grief, a loss that reshaped the life\'s topology.',
    intent: 'both',
    notes: 'Set by grief, conflict, and crisis arcs as a catch-all for non-specific but significant loss. Has year texture in buildYearTexture.',
  },

  tur_kahramanmaras_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Experienced the February 2023 Kahramanmaraş earthquakes — either directly in the southeast or as a witnessing Turkish citizen following the count.',
    intent: 'both',
    notes: 'Set by tur_kahramanmaras_2023 event. Has year texture in Turkey section of buildYearTexture.',
  },

  maasai_pastoralist: {
    weight: 'major',
    category: 'identity',
    description: 'A Maasai who grew up in the cattle-herding pastoral system — age-set identity, seasonal migration, the cattle as economic and cultural foundation.',
    intent: 'both',
    notes: 'Set by nom_maasai_cattle_world event. Has year texture in nomadic section of buildYearTexture.',
  },

  maasai_conservation_displaced: {
    weight: 'moderate',
    category: 'trauma',
    description: 'A Maasai whose ancestral grazing land was absorbed into national parks or conservation areas without adequate compensation — experienced the colonial and post-colonial land dispossession.',
    intent: 'both',
    notes: 'Set by nom_maasai_national_park event. Has year texture in nomadic section of buildYearTexture.',
  },

  bedouin_settled: {
    weight: 'moderate',
    category: 'identity',
    description: 'A Bedouin who grew up during the government sedentarisation programmes — concrete houses replacing tents, migration routes fenced and formalised, the tribal structure adapting to fixed addresses.',
    intent: 'both',
    notes: 'Set by nom_bedouin_settlement event. Has year texture in nomadic section of buildYearTexture.',
  },

  nomadic_heritage: {
    weight: 'moderate',
    category: 'identity',
    description: 'Carries nomadic or pastoral heritage — from Maasai, Bedouin, or Mongolian herder backgrounds — in a world that no longer accommodates the original way of life.',
    intent: 'both',
    notes: 'Set by multiple nomadic arc events (maasai city question, bedouin land claim, mongol UB). Has year texture in nomadic section of buildYearTexture.',
  },

  mongolian_herder: {
    weight: 'major',
    category: 'identity',
    description: 'A Mongolian who grew up in a nomadic herder family — ger tent as home, seasonal migration, steppe pastoralism as the organising structure of daily life.',
    intent: 'both',
    notes: 'Set by nom_mongol_ger_childhood event. Has year texture in nomadic section of buildYearTexture.',
  },

  mongolian_dzud_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'A Mongolian herder who survived a dzud winter catastrophe — the combined drought and freeze that kills livestock en masse and can wipe out a family\'s entire herd.',
    intent: 'both',
    notes: 'Set by nom_mongol_dzud event. Has year texture in nomadic section of buildYearTexture.',
   category: 'economics',
    description: 'Family income includes remittances from a member working abroad — the arithmetic of absence built into the household budget.',
    intent: 'year_texture',
    notes: 'Cross-cutting. Set by OFW, Tajik remittance, migration, and emigrant events. Already in buildYearTexture.',
  },

  moral_injury: {
    weight: 'major',
    category: 'moral',
    description: 'Carries moral injury — the specific damage done when you acted against your values, or failed to act, and cannot undo it.',
    intent: 'none',
    notes: 'Cross-cutting. Set by soldier arc, complicity, and child soldier events.',
  },

  bol_mining_generation: {
    weight: 'major',
    category: 'identity',
    description: 'Grew up in a Bolivian mining town — Potosí or Oruro — where the smelter and the Cerro Rico defined the landscape and the cough of the fathers.',
    intent: 'year_texture',
    notes: 'Set by bol_mining_childhood. Bolivia only.',
  },

  bol_coca_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Urban Bolivian who watched the Chapare eradication from a distance — understood both arguments.',
    intent: 'none',
    notes: 'Set by bol_coca_eradication (observer choice). Bolivia only.',
  },

  bol_evo_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Witnessed the 2005 election of Evo Morales — first indigenous president in a country where 62% of the population is indigenous.',
    intent: 'none',
    notes: 'Set by bol_evo_election_2005. Bolivia only.',
  },

  bol_2019_fraud_believed: {
    weight: 'moderate',
    category: 'moral',
    description: 'Believes the 2019 Bolivian election was fraudulent and the OAS report was correct — holds the position knowing the evidence will never resolve cleanly.',
    intent: 'none',
    notes: 'Set by bol_2019_crisis (fraud choice). Bolivia only.',
  },

  bol_2019_coup_accepted: {
    weight: 'moderate',
    category: 'moral',
    description: 'Believes the 2019 military ousting of Morales was a coup — holds the position knowing the evidence will never resolve cleanly.',
    intent: 'none',
    notes: 'Set by bol_2019_crisis (coup choice). Bolivia only.',
  },

  nz_rugby_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up with rugby as a near-civic religion — the All Blacks as national identity, the haka before they learned French.',
    intent: 'none',
    notes: 'Set by nz_rugby_childhood. New Zealand only.',
  },

  nz_nuclear_free_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Remembers New Zealand\'s nuclear-free declaration and the ANZUS fracture — a small country choosing its principles over its alliance.',
    intent: 'none',
    notes: 'Set by nz_nuclear_free_declaration. New Zealand only.',
  },

  nz_stayer: {
    weight: 'minor',
    category: 'identity',
    description: 'Stayed in New Zealand while others left for Australia — watched the departures, and remained.',
    intent: 'none',
    notes: 'Set by nz_brain_drain (stayed choice). New Zealand only.',
  },

  nz_christchurch_earthquake: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Experienced the 2011 Christchurch earthquake — 185 dead, lunchtime, the cathedral collapsed, the central city closed for years.',
    intent: 'none',
    notes: 'Set by nz_christchurch_earthquake_2011. New Zealand only.',
  },

  nz_christchurch_attack_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the 2019 Christchurch mosque attack — 51 killed, the prime minister in a black hijab, the gun laws changed in 26 days, the door left unlocked no longer meaning what it meant.',
    intent: 'year_texture',
    notes: 'Set by nz_christchurch_attack_2019. New Zealand only.',
  },

  authoritarian_veteran: {
    weight: 'moderate',
    category: 'identity',
    description: 'Served under or survived an authoritarian regime — carries the habits of compliance, deference, and self-censorship that were survival under that system.',
    intent: 'event',
    notes: 'Set by events_culture.js (military service under authoritarian) and events_career_regime.js (survived purge). Checked by ft23_authoritarian_veteran_*.',
  },

  paid_bribe: {
    weight: 'moderate',
    category: 'moral',
    description: 'Has participated in the informal corruption economy — the first time was specific; since then it has become a kind of fluency.',
    intent: 'event',
    notes: 'Set by events_culture.js and events_career_regime.js. Checked by ft23_paid_bribe_echo.',
  },

  radio_childhood: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up with radio as the primary information medium — learned to read the world through sound before television made it spectacle.',
    intent: 'event',
    notes: 'Set by events_texture.js and events_technology.js. Checked by ft23_radio_childhood_memory.',
  },

  earthquake_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived a major earthquake — the body retains the memory of the ground moving; certain sounds still produce the response before the mind catches up.',
    intent: 'event',
    notes: 'Set by Haiti earthquake events and worldEvents.js. Checked by ft23_earthquake_survivor_*.',
  },

  failure_integrated: {
    weight: 'moderate',
    category: 'moral',
    description: 'Has genuinely processed a major failure — looked at it straight, understood what it cost and what it meant, without the nausea.',
    intent: 'event',
    notes: 'Set by events_coherence.js. Checked by ft24_failure_integrated_midlife.',
  },

  party_member: {
    weight: 'major',
    category: 'moral',
    description: 'Joined the ruling party for pragmatic reasons under a single-party system — the ideology performed well enough to be unremarkable, the advancement real.',
    intent: 'event',
    notes: 'Set by events_historical.js and events_culture.js. Checked by ft24_party_member_reckoning.',
  },

  dual_identity: {
    weight: 'major',
    category: 'identity',
    description: 'Holds two cultural identities — does the translation daily, belongs fully to neither, sees from two places simultaneously.',
    intent: 'event',
    notes: 'Set by events_culture.js and events_society.js. Checked by ft24_dual_identity_midlife.',
  },

  class_awareness: {
    weight: 'moderate',
    category: 'identity',
    description: 'Has had the moment when the class mechanism became visible — understands how advantage distributes and reads rooms accordingly.',
    intent: 'event',
    notes: 'Set by events_texture.js and events_culture.js. Checked by ft24_class_awareness_settled.',
  },

  veteran: {
    weight: 'major', category: 'identity',
    description: 'Military veteran — carries the body knowledge, the specific friends, and the things not spoken of from active service.',
    intent: 'none', notes: 'Set by war world events.',
  },

  drought_survivor: {
    weight: 'moderate', category: 'trauma',
    description: 'Survived a major drought — the specific experience of watching a landscape dry and food become scarce.',
    intent: 'event', notes: 'Set by drought/famine world events. Follow-through: ft39_drought_late.',
  },

  apartheid_privileged: {
    weight: 'major', category: 'moral',
    description: 'Was privileged under apartheid — white South African who benefited from a system of racial separation.',
    intent: 'event', notes: 'Set by apartheid world events. Follow-through: ft39_apartheid_privileged_late.',
  },

  witnessed_climate_change: {
    weight: 'moderate', category: 'trauma',
    description: 'Has witnessed visible climate change effects — weather patterns, species, landscapes changed in a lifetime.',
    intent: 'event', notes: 'Set by climate world events. Follow-through: ft39_climate_witness_late.',
  },

  genocide_witness: {
    weight: 'major', category: 'trauma',
    description: 'Witnessed a genocide — carries the specific weight of knowing what human beings did to each other in their time.',
    intent: 'none', notes: 'Set by genocide world events (Rwanda, Srebrenica, etc.).',
  },

  revolution_disillusionment: {
    weight: 'moderate', category: 'moral',
    description: 'Has experienced the disillusionment after a revolution — when the new order fails to deliver what the old order\'s overthrow promised.',
    intent: 'none', notes: 'Set by post-revolutionary disillusionment world events.',
  },

  eu_generation: {
    weight: 'moderate', category: 'identity',
    description: 'Grew up with European Union membership as a given — free movement, the euro, the removal of borders that had defined a continent.',
    intent: 'none', notes: 'Set by EU formation/expansion world events.',
  },

  brexit_era: {
    weight: 'moderate', category: 'identity',
    description: 'Lived through Brexit — the British referendum and exit from the EU, and the years of argument about what it meant.',
    intent: 'none', notes: 'Set by Brexit world event.',
  },

  quebec_referendum_lived: {
    weight: 'moderate', category: 'identity',
    description: 'Lived through the 1995 Quebec independence referendum — 49.4% for separation, the night that could have split Canada.',
    intent: 'none', notes: 'Set by Quebec referendum world event.',
  },

  '1967_generation': {
    weight: 'moderate', category: 'identity',
    description: 'Defined by the 1967 Arab defeat — the Naksa, the Six-Day War, the moment the pan-Arab project broke.',
    intent: 'none', notes: 'Set by 1967 war world event.',
  },

  independence_ghana: {
    weight: 'major', category: 'identity',
    description: 'Witnessed Ghanaian independence 1957 — the night the lights came on at the polo grounds, Nkrumah\'s freedom speech.',
    intent: 'none', notes: 'Set by Ghana independence world event.',
  },

  independence_kenya: {
    weight: 'major', category: 'identity',
    description: 'Witnessed Kenyan independence 1963 — uhuru, and the specific expectations that came with it.',
    intent: 'none', notes: 'Set by Kenya independence world event.',
  },

  independence_zimbabwe: {
    weight: 'major', category: 'identity',
    description: 'Witnessed Zimbabwean independence 1980 — Robert Mugabe\'s first address, the hope that had specific content.',
    intent: 'none', notes: 'Set by Zimbabwe independence world event.',
  },

  triangle_generation: {
    weight: 'moderate', category: 'identity',
    description: 'Northern Triangle generation — grew up amid the gang violence and migration pressures of Guatemala, Honduras, or El Salvador.',
    intent: 'none', notes: 'Set by Northern Triangle world event.',
  },

  anarchist_barcelona: {
    weight: 'moderate', category: 'identity',
    description: 'Lived in anarchist Barcelona 1936–37 — the collectives, the militias, the brief utopia before it was crushed.',
    intent: 'none', notes: 'Set by Spanish Civil War world event.',
  },

  flu_pandemic_survivor: {
    weight: 'major', category: 'trauma',
    description: 'Survived the 1918 Spanish flu pandemic — 50 million dead globally, the young killed disproportionately, the silence that followed.',
    intent: 'none', notes: 'Set by Spanish flu world event.',
  },

  mabo_generation: {
    weight: 'major', category: 'identity',
    description: 'Generation defined by the Mabo decision 1992 — the High Court ruling that recognised Indigenous title to land, ending the legal fiction of terra nullius.',
    intent: 'none', notes: 'Set by Mabo world event.',
  },

  apology_generation: {
    weight: 'major', category: 'identity',
    description: 'Witnessed the 2008 National Apology to Indigenous Australians — the parliament, the prime minister, the Stolen Generations in the gallery.',
    intent: 'none', notes: 'Set by Australian Apology world event.',
  },

  reef_loss_generation: {
    weight: 'moderate', category: 'trauma',
    description: 'Generation witnessing the bleaching of the Great Barrier Reef — the visible loss of a living system in a single lifetime.',
    intent: 'none', notes: 'Set by reef bleaching world events.',
  },

  heat_stress_generation: {
    weight: 'moderate', category: 'trauma',
    description: 'Generation experiencing dangerous heat as a new normal — wet-bulb temperatures that make outdoor work deadly for days at a time.',
    intent: 'none', notes: 'Set by heat wave world events.',
  },

  tipping_point_generation: {
    weight: 'major', category: 'trauma',
    description: 'Generation living through climate tipping points — the Arctic ice cap gone, the coral systems bleached, the projections becoming present tense.',
    intent: 'none', notes: 'Set by climate tipping point world events.',
  },

  turkey_syria_earthquake_2023: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the February 2023 Turkey-Syria earthquake — 50,000+ dead, cities in rubble, survivors waiting in freezing February nights.',
    intent: 'none',
    notes: 'Set by we_turkey_syria_earthquake_2023 world event. Turkey/Syria characters.',
  },

  aw_evacuated_and_left: {
    weight: 'major',
    category: 'moral',
    description: 'Was evacuated as international staff while national colleagues were left behind to shelter in place.',
    intent: 'event',
    notes: 'Set by aw_evacuation (international branch). Moral weight: the vehicle moving, the colleague watching.',
  },

  aw_left_behind: {
    weight: 'major',
    category: 'moral',
    description: 'Was left behind during an evacuation order — sheltered in place while international colleagues were extracted.',
    intent: 'event',
    notes: 'Set by aw_evacuation (local branch). The asymmetry that the job description did not mention.',
  },

  aw_dissented: {
    weight: 'moderate',
    category: 'moral',
    description: 'Formally flagged internal dissent about an inadequate closure protocol — noted, unchanged.',
    intent: 'none',
    notes: 'Set by aw_funding_cut second choice. The thing on the record.',
  },

  aw_burnout_endured: {
    weight: 'moderate',
    category: 'moral',
    description: 'Continued aid work through compassion fatigue — the work got done; unclear whether this was commitment.',
    intent: 'none',
    notes: 'Set by aw_burnout third choice.',
  },

  girmitiya_heritage: {
    weight: 'major',
    category: 'identity',
    description: 'Indo-Fijian character who carries the inherited memory of girmitiya indenture — the ships, the girmit paper, the reason for staying.',
    intent: 'none',
    notes: 'Set by fj_girmitiya_memory. Contextual identity marker; referenced in fj_late_life prose.',
  },

  cane_farming_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up in a cane-farming family on leased iTaukei land — the lease countdown as background fact.',
    intent: 'event',
    notes: 'Set by fj_cane_season. Gates fj_land_lease_expires.',
  },

  fiji_stayed_on: {
    weight: 'moderate',
    category: 'identity',
    description: 'Chose to remain in Fiji despite the emigration wave — part of what was left; watched others leave for years.',
    intent: 'none',
    notes: 'Set by fj_emigration second choice. Referenced in fj_late_life stayed branch prose.',
  },

  drought_childhood: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up with annual dry-season water scarcity — the hierarchy of thirst, going to sleep still thirsty.',
    intent: 'none',
    notes: 'Set by wi_dry_season. Contextual marker for rural water hardship.',
  },

  refused_bonded_debt: {
    weight: 'moderate',
    category: 'moral',
    description: 'Refused a bonded debt loan despite crisis — found another way; not bound.',
    intent: 'none',
    notes: 'Set by bl_initial_loan second choice.',
  },

  child_laborer: {
    weight: 'major',
    category: 'childhood',
    description: 'Worked as a child laborer — the carpet loom, the kiln, the debt that was the father\'s but the work that was theirs.',
    intent: 'none',
    notes: 'Set by bl_carpet_child. The fingers the right size for the knots.',
  },

  stayed_sharecrop: {
    weight: 'moderate',
    category: 'identity',
    description: 'Chose to stay in the South while others left — the community, the family, the ongoing ledger.',
    intent: 'none',
    notes: 'Set by bl_sharecrop_north second choice.',
  },

  challenged_power: {
    weight: 'moderate',
    category: 'moral',
    description: 'Asked to see the ledger — questioned the accounting of someone with power over them.',
    intent: 'none',
    notes: 'Set by bl_sharecrop_ledger first choice.',
  },

  sw_considered_sector: {
    weight: 'minor',
    category: 'identity',
    description: 'Considered entering sex work in a legalized context and decided against it.',
    intent: 'none',
    notes: 'Set by sw_entry_legalized second choice.',
  },

  sw_police_extorted: {
    weight: 'moderate',
    category: 'adversity',
    description: 'Extorted by police — paid or refused, either way the power relationship was explicit and the law was on the wrong side of it.',
    intent: 'none',
    notes: 'Set by both choices of sw_police_encounter.',
  },

  sw_stigma_denied: {
    weight: 'minor',
    category: 'identity',
    description: 'Denied the work to family — maintained the version that cost them less, at its own cost.',
    intent: 'none',
    notes: 'Set by sw_family_knows first choice.',
  },

  sw_stigma_handled: {
    weight: 'minor',
    category: 'identity',
    description: 'Told family the truth about the work — the conversation was not easy and changed what the relationship could be.',
    intent: 'none',
    notes: 'Set by sw_family_knows second choice.',
  },

  hcr_born_in: {
    weight: 'major',
    category: 'identity',
    description: 'Born into a high-control congregation — the restrictions not experienced as restrictions because there was nothing else to compare them to.',
    intent: 'event',
    notes: 'Set by hcr_childhood_congregation. Gates the whole HCR arc.',
  },

  hcr_member: {
    weight: 'major',
    category: 'identity',
    description: 'Member of a high-control religious group — social world and doctrinal world are the same world.',
    intent: 'event',
    notes: 'Set by hcr_childhood_congregation and hcr_adult_convert. Primary arc gate.',
  },

  hcr_convert: {
    weight: 'moderate',
    category: 'identity',
    description: 'Converted to a high-control group as an adult — recruited during a moment of searching; the warmth, the community, the clear answers.',
    intent: 'none',
    notes: 'Set by hcr_adult_convert first choice.',
  },

  hcr_social_reorganised: {
    weight: 'moderate',
    category: 'identity',
    description: 'Social world has reorganised entirely around the congregation — outside relationships are complicated in ways inside ones are not.',
    intent: 'event',
    notes: 'Set by hcr_community_deepens. Gates hcr_demands_escalate.',
  },

  hcr_demands_met: {
    weight: 'moderate',
    category: 'moral',
    description: 'Complied with escalating demands from the group — educational, financial, vocational.',
    intent: 'none',
    notes: 'Set by hcr_demands_escalate first choice.',
  },

  hcr_first_doubt_internal: {
    weight: 'moderate',
    category: 'identity',
    description: 'First internal pushback against group demands — the doubt that has not yet been named.',
    intent: 'event',
    notes: 'Set by hcr_demands_escalate second choice. Gates hcr_committee.',
  },

  hcr_blood_refused: {
    weight: 'major',
    category: 'moral',
    description: 'Upheld the blood doctrine in a medical crisis — the card signed with full understanding, the cost now concrete.',
    intent: 'none',
    notes: 'Set by hcr_blood_crisis first choice.',
  },

  hcr_doctrine_broken: {
    weight: 'major',
    category: 'moral',
    description: 'Accepted medically necessary treatment that violated group doctrine — the congregation will hear; consequences will follow.',
    intent: 'event',
    notes: 'Set by hcr_blood_crisis second choice. Gates hcr_committee.',
  },

  hcr_restricted: {
    weight: 'moderate',
    category: 'identity',
    description: 'Privileges in the congregation curtailed after committee hearing — a period of restriction, monitored compliance.',
    intent: 'none',
    notes: 'Set by hcr_committee first choice.',
  },

  hcr_disfellowshipped: {
    weight: 'major',
    category: 'adversity',
    description: 'Formally disfellowshipped — announced from the platform; members instructed to avoid contact.',
    intent: 'event',
    notes: 'Set by hcr_committee second choice. Gates hcr_exit (shunning prose variant).',
  },

  hcr_exited: {
    weight: 'major',
    category: 'identity',
    description: 'Left the high-control group — the social world closed in a single weekend; the question is what comes next.',
    intent: 'event',
    notes: 'Set by hcr_exit. Gates hcr_secular_reentry and hcr_shunning_years. Changes prose of hcr_late_reckoning.',
  },

  hcr_shunned: {
    weight: 'major',
    category: 'adversity',
    description: 'Shunned by former congregation members including family — they look at the shelf when they see you in the supermarket.',
    intent: 'event',
    notes: 'Set alongside hcr_exited by hcr_exit. Gates hcr_shunning_years.',
  },

  hcr_rebuilding: {
    weight: 'moderate',
    category: 'identity',
    description: 'Rebuilding a secular social life after leaving — learning at thirty-five what was never taught.',
    intent: 'year_texture',
    notes: 'Set by hcr_secular_reentry. Needs year texture in buildYearTexture().',
  },

  sami_boarding_survivor: {
    weight: 'major',
    category: 'adversity',
    description: 'Survived the Norwegian or Swedish boarding school (internatskole) where Sami language and identity were systematically suppressed, 1920–1970.',
    intent: 'event',
    notes: 'Set by ind_sami_boarding alongside language_lost. Changes ind_sami_hidden_identity prose and ind_sami_late prose.',
  },

  sami_reindeer_knowledge: {
    weight: 'moderate',
    category: 'identity',
    description: 'Holds the specific embodied knowledge of the reindeer migration — reading ice, weather, terrain — learned by presence rather than instruction.',
    intent: 'none',
    notes: 'Set by ind_sami_reindeer_migration.',
  },

  sami_alta_witness: {
    weight: 'moderate',
    category: 'identity',
    description: 'Witnessed or participated in the Alta dam controversy 1979–82, the galvanising moment of modern Sami political organization.',
    intent: 'none',
    notes: 'Set by both choices of ind_sami_alta.',
  },

  sami_parliament_moment: {
    weight: 'moderate',
    category: 'identity',
    description: 'Present (in some sense) for the opening of the Sami Parliament (Sámediggi) in 1989 and King Olav V\'s acknowledgment of state injustice.',
    intent: 'none',
    notes: 'Set by ind_sami_parliament_1989.',
  },

  sami_identity_reclaimed: {
    weight: 'moderate',
    category: 'identity',
    description: 'Began saying it openly — in rooms that had no prior category for it, making the explanation the other person\'s work.',
    intent: 'none',
    notes: 'Set by ind_sami_hidden_identity reclaim choice.',
  },

  sami_language_returned: {
    weight: 'moderate',
    category: 'identity',
    description: 'Re-learned Northern Sami as an adult — words arriving with sensory memories attached; the language came back changed, as living things do.',
    intent: 'year_texture',
    notes: 'Set by ind_sami_language_return. Changes ind_sami_late prose. Needs year texture in buildYearTexture().',
  },

  amazon_forest_knowledge: {
    weight: 'moderate',
    category: 'identity',
    description: 'Carries the embodied ecological knowledge of the Amazon — plant medicine, river reading, seasonal calendars — learned by following rather than instruction.',
    intent: 'none',
    notes: 'Set by ind_amazon_forest_knowledge. Gates ind_amazon_passing_knowledge and ind_amazon_late prose.',
  },

  amazon_territory_defender: {
    weight: 'moderate',
    category: 'moral',
    description: 'Understands, through experience, that the territory requires active defense against extractive industry.',
    intent: 'none',
    notes: 'Set by ind_amazon_garimpo_arrives resist choice, ind_amazon_bagua_2009, and ind_amazon_funai network choice.',
  },

  amazon_deforestation_witness: {
    weight: 'moderate',
    category: 'adversity',
    description: 'Watched the smoke of deforestation come closer each dry season until the forest became pasture within living memory.',
    intent: 'none',
    notes: 'Set by ind_amazon_smoke_horizon.',
  },

  amazon_legal_fighter: {
    weight: 'moderate',
    category: 'identity',
    description: 'Engaged with FUNAI demarcation process or legal channels — learning bureaucratic language as a survival tool.',
    intent: 'none',
    notes: 'Set by ind_amazon_funai_demarcation both choices. Changes ind_amazon_late prose.',
  },

  amazon_stayed: {
    weight: 'moderate',
    category: 'identity',
    description: 'Chose to remain in the forest community when the city option appeared — the knowledge requires people who know it.',
    intent: 'none',
    notes: 'Set by ind_amazon_city_question stay choice.',
  },

  amazon_urban_indigenous: {
    weight: 'moderate',
    category: 'identity',
    description: 'Left the community for the city — the forest knowledge is not valued in the same way there, and is also not replaceable once absent.',
    intent: 'none',
    notes: 'Set by ind_amazon_city_question go choice.',
  },

  amazon_knowledge_passed: {
    weight: 'major',
    category: 'moral',
    description: 'Made the time and took the children into the forest; some of the knowledge passed, not all, enough for them to know what they do not know.',
    intent: 'none',
    notes: 'Set by ind_amazon_passing_knowledge teach choice. Changes ind_amazon_late prose.',
  },

  fgm_underwent: {
    weight: 'major',
    category: 'adversity',
    description: 'Underwent female genital cutting — the ceremony, the recovery, the body carrying what the body carries.',
    intent: 'event',
    notes: 'Set by fgm_child_ceremony (auto-resolve) or fgm_adolescent_question comply choice. Gates fgm_medical_encounter and fgm_daughter_question. Changes fgm_late_reckoning prose.',
  },

  fgm_refused: {
    weight: 'major',
    category: 'moral',
    description: 'Refused the ceremony — older, more aware; the social cost was real and she paid it.',
    intent: 'event',
    notes: 'Set by fgm_adolescent_question refuse choice alongside fgm_social_cost. Changes fgm_late_reckoning prose.',
  },

  fgm_social_cost: {
    weight: 'moderate',
    category: 'adversity',
    description: 'Paid the community cost of refusal — a quiet subtraction of things expected that were no longer available.',
    intent: 'none',
    notes: 'Set by fgm_adolescent_question refuse choice alongside fgm_refused.',
  },

  fgm_medical_known: {
    weight: 'moderate',
    category: 'identity',
    description: 'Medical system made a formal record; the clinical framework and the community framework named the same body differently.',
    intent: 'none',
    notes: 'Set by fgm_medical_encounter answer choice.',
  },

  fgm_broke_cycle: {
    weight: 'major',
    category: 'moral',
    description: 'Protected her daughter — the cycle ends here, at the cost of some relationships and some belonging.',
    intent: 'year_texture',
    notes: 'Set by fgm_daughter_question protect choice. Changes fgm_late_reckoning prose. Needs year texture in buildYearTexture().',
  },

  fgm_continued_cycle: {
    weight: 'moderate',
    category: 'moral',
    description: 'Did not intervene in the daughter\'s ceremony — the community remains intact; she carries a specific weight alongside the relief.',
    intent: 'none',
    notes: 'Set by fgm_daughter_question continue choice.',
  },

  climate_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Came of age during the 2015–2022 climate mobilisation — Greta Thunberg, school strikes, IPCC reports — with climate grief as a formative part of adolescence.',
    intent: 'event',
    notes: 'Set by dec10_climate_grief_young. Checked in ribbons and worldEvents.',
  },

  born_digital: {
    weight: 'minor',
    category: 'identity',
    description: 'Born after 2000 — has no pre-internet memory; the internet is not a technology they adopted but the medium they grew up inside.',
    intent: 'none',
    notes: 'Set by dec10_born_digital.',
  },

  information_overload: {
    weight: 'minor',
    category: 'identity',
    description: 'Experienced the late-2010s condition of news saturation — more simultaneous crises than any previous generation had information about, and no clear way to act on the knowledge.',
    intent: 'year_texture',
    notes: 'Set by dec10_decade_exhaustion.',
  },

  refusenik_applied: {
    weight: 'moderate',
    category: 'identity',
    description: 'A Soviet Jewish character filed the refusenik emigration application — beginning the years-long, career-destroying wait for an exit visa.',
    intent: 'none',
    notes: 'Set by sl_soviet_jew_emigration when the player chooses to apply.',
  },

  refusenik_stayed: {
    weight: 'moderate',
    category: 'identity',
    description: 'A Soviet Jewish character withdrew their emigration application — choosing Soviet life over the refusenik limbo, whatever the reason.',
    intent: 'none',
    notes: 'Set by sl_soviet_jew_emigration when the player chooses to withdraw.',
  },

  igbo_stayed_north: {
    weight: 'moderate',
    category: 'identity',
    description: 'An Igbo person chose to remain in the north after the 1966 pogroms — the decision and its weight, the neighbours who protected or did not.',
    intent: 'none',
    notes: 'Set by sl_igbo_after_66.',
  },

  venezuela_stayed_professional: {
    weight: 'moderate',
    category: 'resilience',
    description: 'A Venezuelan professional stayed during the economic collapse — treating patients or maintaining infrastructure despite conditions that drove colleagues abroad.',
    intent: 'year_texture',
    notes: 'Set by sl_venezuela_professional_collapse when the player chooses to stay.',
  },

  coptic_fought_permit: {
    weight: 'minor',
    category: 'identity',
    description: 'A Coptic Christian persisted with the state church-building permit — the bureaucratic resistance that is the everyday texture of minority religious practice in Egypt.',
    intent: 'none',
    notes: 'Set by sl_coptic_church_permit.',
  },

  lgbtq_lived_underground: {
    weight: 'moderate',
    category: 'identity',
    description: 'Lived LGBTQ identity in a hostile legal or social environment — the calibration of trust, the parallel community, the constant calculation.',
    intent: 'year_texture',
    notes: 'Set by sl_russia_gay_propaganda, sl_egypt_lgbtq_crackdown. Cross-cutting hostile-environment LGBTQ flag.',
  },

  witnessed_rights_expansion: {
    weight: 'minor',
    category: 'identity',
    description: 'Witnessed a formal legal expansion of their rights — the moment a law changes and the country officially acknowledges your existence.',
    intent: 'none',
    notes: 'Set by sl_india_377_repeal and similar rights-expansion events.',
  },

  intergenerational_trauma: {
    weight: 'moderate',
    category: 'identity',
    description: 'Carries the trauma of a historical atrocity through family silence — the things not in the album, the dates that make the room go still.',
    intent: 'year_texture',
    notes: 'Set by sl_second_gen_holocaust, sl_hiroshima_second_gen. Cross-generational historical wound.',
  },

  code_switched: {
    weight: 'minor',
    category: 'identity',
    description: 'Learned to perform the dominant-class register — voice, vocabulary, demeanour — as a social survival strategy when crossing class or cultural lines.',
    intent: 'year_texture',
    notes: 'Set by sl_first_gen_university_uk and similar code-switching events.',
  },

  class_guilt: {
    weight: 'moderate',
    category: 'identity',
    description: 'Carries ongoing guilt about class mobility — the moments of choosing the new world over the one they came from, and the people left out of those choices.',
    intent: 'year_texture',
    notes: 'Set by sl_class_betrayal. Cross-cutting upward mobility guilt.',
  },

  minority_language_gap: {
    weight: 'minor',
    category: 'identity',
    description: 'The intergenerational language gap — speaks the dominant language more fluently than their parents\' minority language, or vice versa. A form of partial belonging in both.',
    intent: 'none',
    notes: 'Set by sl_kazakh_russified_generation and similar assimilation events.',
  },

  language_suppression_lived: {
    weight: 'moderate',
    category: 'identity',
    description: 'Lived the suppression of their native language in formal institutions — the school, the court, the government office where the minority language was banned.',
    intent: 'year_texture',
    notes: 'Set by sl_catalan_franco_language. Distinct from minority_language_speaker (more active suppression).',
  },

  indigenous_knowledge: {
    weight: 'minor',
    category: 'identity',
    description: 'Carries practical traditional knowledge — crop varieties, ecological reading, craft techniques — that exists nowhere else and that formal education systems do not value.',
    intent: 'none',
    notes: 'Set by sl_peru_potato_altitude.',
  },

  faith_chosen: {
    weight: 'minor',
    category: 'spirituality',
    description: 'Returned to a religious community as an adult after a period of exposure to alternatives — the faith that was inherited and then chosen again.',
    intent: 'none',
    notes: 'Set by sl_amish_rumspringa (return branch).',
  },

  left_faith_community: {
    weight: 'moderate',
    category: 'spirituality',
    description: 'Left a tight-knit religious community through formal exit — shunning, excommunication, or social severing — to live outside its structures.',
    intent: 'year_texture',
    notes: 'Set by sl_amish_rumspringa (leave branch). Cross-cutting for high-control communities.',
  },

  ordained_temporary: {
    weight: 'minor',
    category: 'spirituality',
    description: 'Temporarily ordained — completed a period of monastic life (Buddhist ordination, novitiate, etc.) as a cultural rite of passage rather than a permanent vocation.',
    intent: 'none',
    notes: 'Set by sl_thai_monk_ordination.',
  },

  second_country_rooted: {
    weight: 'moderate',
    category: 'identity',
    description: 'Put down roots in a country they arrived in as a temporary worker — the permanent life built inside a temporary legal status.',
    intent: 'year_texture',
    notes: 'Set by sl_german_gastarbeiter_stayed. Cross-cutting migrant settler experience.',
  },

  informer_stasi: {
    weight: 'major',
    category: 'moral',
    description: 'Served as an unofficial informant for the Stasi or equivalent surveillance apparatus — the files that exist, the comrades reported, the complicity that was not called by that name at the time.',
    intent: 'event',
    notes: 'Set by sl_east_germany_stasi_informer. Follow-through: sl_stasi_file_opened fires at late_life.',
  },

  private_public_split: {
    weight: 'minor',
    category: 'identity',
    description: 'Lives a bifurcated existence — one face for the state, the mosque, the collective; another for the cassette tape, the hidden room, the private music. Common in authoritarian and socially conservative contexts.',
    intent: 'none',
    notes: 'Set by sl_iran_cassette_tape.',
  },

  outlasted_regime: {
    weight: 'minor',
    category: 'identity',
    description: 'Survived and outlasted the political order that defined their life — the specific surprise of permanence in an order assumed permanent.',
    intent: 'none',
    notes: 'Set by sl_late_regime_survived.',
  },

  language_legacy_bearer: {
    weight: 'minor',
    category: 'identity',
    description: 'A speaker of a dying or endangered language who carries what the recordings cannot — the precise inflection, the untranslatable phrase, the irony only native speakers know.',
    intent: 'year_texture',
    notes: 'Set by sl_late_language_last_speaker.',
  },

  land_transferred: {
    weight: 'minor',
    category: 'identity',
    description: 'Completed a generational land transfer — the legal moment when accumulated labour becomes inheritance and the self steps out of the chain.',
    intent: 'none',
    notes: 'Set by sl_late_farm_handed_on.',
  },

  racial_tax_paid: {
    weight: 'moderate',
    category: 'identity',
    description: 'Experienced the cumulative cost of being the only one in predominantly white professional environments — the exhaustion of representation, the calculation about naming things, the excellence required to be visible.',
    intent: 'year_texture',
    notes: 'Set by sl_black_uk_professional. Cross-cutting in any professional context for ethnic minorities.',
  },

  disability_hidden: {
    weight: 'moderate',
    category: 'identity',
    description: 'A disability managed in private, concealed from the neighbourhood, the school, the outside world — the arrangement that takes considerable energy from those who maintain it.',
    intent: 'year_texture',
    notes: 'Set by sl_india_disabled_family_shame.',
  },

  beauty_capital_used: {
    weight: 'minor',
    category: 'identity',
    description: 'Experienced their physical appearance as a resource managed by others — the pageant, the nomination, the usefulness to people around them that took years to process.',
    intent: 'none',
    notes: 'Set by sl_philippines_beauty_pageant.',
  },

  boarding_school_indigenous: {
    weight: 'major',
    category: 'identity',
    description: 'Attended a federal or colonial Indigenous boarding school — the assimilation machinery that removed language, name, and cultural continuity; the reading gained at the price of what was taken.',
    intent: 'event',
    notes: 'Set by sl_native_boarding_school. Follow-through: sl_native_boarding_school_followthrough fires at young_adult.',
  },

  cultural_erasure_lived: {
    weight: 'moderate',
    category: 'identity',
    description: 'The language their grandparents spoke, the ceremonies that correspond to months — not taught, because the system that taught reading also removed those. A specific absence shaped like a skill.',
    intent: 'year_texture',
    notes: 'Set by sl_native_boarding_school_followthrough.',
  },

  mission_station_raised: {
    weight: 'major',
    category: 'identity',
    description: 'Raised on a government mission station — rations on Thursdays, the manager\'s authority over marriage and wages, the trust accounts, the word that would not be spoken officially for decades.',
    intent: 'year_texture',
    notes: 'Set by sl_aboriginal_mission. Australia 1920–1970 Aboriginal experience.',
  },

  indigenous_language_reclaimed: {
    weight: 'moderate',
    category: 'identity',
    description: 'Part of a language revival generation — the kōhanga reo child, the grandchild who knows what the parent\'s generation was told not to speak. The reversal as act of inheritance.',
    intent: 'none',
    notes: 'Set by sl_maori_kohanga.',
  },

  punitive_psychiatry_survived: {
    weight: 'major',
    category: 'identity',
    description: 'Committed to a Soviet psychiatric institution for political dissent — "sluggish schizophrenia" as a diagnostic category that exists only for people who believe the system is unjust.',
    intent: 'year_texture',
    notes: 'Set by sl_soviet_punitive_psychiatry.',
  },

  gulag_birth_generation: {
    weight: 'major',
    category: 'identity',
    description: 'Born in or to a parent imprisoned in the Gulag — the camp nursery for children of female prisoners, the orphanage, the reunion years later that one person remembers and the other does not.',
    intent: 'none',
    notes: 'Set by sl_gulag_camp_born.',
  },

  refugee_rebuilt_network: {
    weight: 'moderate',
    category: 'resilience',
    description: 'Rebuilt a pre-existing community network in the refugee or displaced context — the trader network older than the displacement that reassembled itself in the new city.',
    intent: 'none',
    notes: 'Set by sl_sindhi_hindu_refugee.',
  },

  colonial_contact_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Among the first generation to encounter colonial administration in their village — the patrol post, the flagpole, the mission school that came four years later.',
    intent: 'none',
    notes: 'Set by sl_png_first_contact_generation.',
  },

  third_gender_traditional: {
    weight: 'moderate',
    category: 'identity',
    description: 'Belongs to a traditional third-gender category — fa\'afafine, hijra, or equivalent — that predates Western gender terminology and carries its own social obligations and roles.',
    intent: 'year_texture',
    notes: 'Set by sl_samoan_fa_afafine.',
  },

  extraction_community: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up in an extraction-economy community — the spill not cleaned up, the community development fund that built things that did not function, the money deposited somewhere else.',
    intent: 'year_texture',
    notes: 'Set by sl_niger_delta_oil_community.',
  },

  professional_woman_trailblazer: {
    weight: 'moderate',
    category: 'identity',
    description: 'A woman who entered a professional field when women were trained but not considered equal — the state policy of equality and the house that was not the policy.',
    intent: 'year_texture',
    notes: 'Set by sl_soviet_woman_scientist and sl_first_female_doctor_iran.',
  },

  wartime_labour_displaced: {
    weight: 'moderate',
    category: 'identity',
    description: 'Worked wartime industrial labour and was displaced by returning men when the war ended — excellent at the job, not kept; the law that gave the job back and the silence about what it cost.',
    intent: 'year_texture',
    notes: 'Set by sl_wartime_factory_woman_uk.',
  },

  professional_woman_islamic_republic: {
    weight: 'moderate',
    category: 'identity',
    description: 'A professional woman who continued practicing in the Islamic Republic through the years of contested policy — the ongoing negotiation that does not appear in either the official history or the Western narrative.',
    intent: 'none',
    notes: 'Set by sl_first_female_doctor_iran.',
  },

  kibbutz_privatisation_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Part of the Israeli generation that experienced kibbutz privatisation — the communal children\'s house dissolved, the founding parents disappointed, the quiet relief of sleeping in the same house as your mother.',
    intent: 'none',
    notes: 'Set by sl_kibbutz_second_generation.',
  },

  commune_childhood: {
    weight: 'minor',
    category: 'identity',
    description: 'Raised on a 1960s–70s commune — the insufficient vegetable garden, the considerable discussion, the six non-sibling children who are the comparison point for all other social arrangements.',
    intent: 'year_texture',
    notes: 'Set by sl_us_commune_child.',
  },

  civil_war_childhood: {
    weight: 'major',
    category: 'identity',
    description: 'A childhood inside a civil war — the sounds that require moving to the corridor, the school that opens by which militia is where, the violence as texture rather than event.',
    intent: 'year_texture',
    notes: 'Set by sl_lebanon_war_child.',
  },

  siege_adolescence: {
    weight: 'major',
    category: 'identity',
    description: 'Adolescence spent inside a siege — the basement classrooms, the homework by candlelight, the girl liked and the music listened to on a battery radio, and the rest-of-life of explaining it.',
    intent: 'year_texture',
    notes: 'Set by sl_sarajevo_siege_teenager.',
  },

  stayed_through_crisis: {
    weight: 'moderate',
    category: 'resilience',
    description: 'Chose to stay and work through a national crisis rather than emigrating — the workarounds, the deficit management, the gratitude of patients, the system still broken, both things true.',
    intent: 'none',
    notes: 'Set by sl_greek_crisis_doctor_leaves (stay branch).',
  },

  cold_war_childhood: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up with duck-and-cover drills — the wooden desk, the gap between danger described and protection offered, the adults who were frightened but could not say so.',
    intent: 'year_texture',
    notes: 'Set by sl_us_nuclear_family_1950s.',
  },

  reeducation_camp_family: {
    weight: 'major',
    category: 'identity',
    description: 'Had a parent or spouse sent to a Vietnamese re-education camp — the monitored letters written in careful language that both writer and reader understand is not the real language.',
    intent: 'event',
    notes: 'Set by sl_vietnam_reeducation_family. Follow-through: sl_vietnam_reeducation_return fires at adolescence.',
  },

  hijra_community: {
    weight: 'moderate',
    category: 'identity',
    description: 'Initiated into the South Asian hijra community — belonging opened, formal economy employment closed, the blessing work at weddings and births, the sacred and the humiliated in the same afternoon.',
    intent: 'year_texture',
    notes: 'Set by sl_hijra_initiation.',
  },

  cyclone_survivor: {
    weight: 'moderate',
    category: 'identity',
    description: 'Survived a major cyclone in the Bangladeshi delta — carries a specific number of people who did not survive; the annual preparation is now automatic, the attachment lives in people rather than things.',
    intent: 'year_texture',
    notes: 'Set by sl_bangladesh_bhola_child.',
  },

  japanese_american_internment: {
    weight: 'major',
    category: 'identity',
    description: 'Interned under Executive Order 9066 — American-born, English-speaking, still required to report to the assembly centre, sold the truck in three days, found someone else in the house in 1945.',
    intent: 'year_texture',
    notes: 'Set by sl_japanese_american_internment.',
  },

  pentecostal_childhood: {
    weight: 'minor',
    category: 'spirituality',
    description: 'Raised in Nigerian Pentecostal prosperity gospel — eight-hour Sundays, the building fund mentioned every week for twelve years, the faith genuine and the theological argument needing work.',
    intent: 'event',
    notes: 'Set by sl_nigeria_pentecostal_child. Follow-through: sl_nigeria_pentecostal_adult fires at young_adult.',
  },

  uyghur_suppression_lived: {
    weight: 'major',
    category: 'identity',
    description: 'Living under the Xinjiang surveillance and cultural suppression apparatus — family disappeared into "vocational training," learned which apps not to use, which calls not to make, where the Quran cannot be seen.',
    intent: 'year_texture',
    notes: 'Set by sl_uyghur_disappeared_family.',
  },

  independence_generation_carib: {
    weight: 'minor',
    category: 'identity',
    description: 'Present at a Caribbean independence ceremony — the new flag, the flag that came down, the fireworks, the standing on the hill watching a country be born.',
    intent: 'none',
    notes: 'Set by sl_barbados_independence_child.',
  },

  stayed_to_build: {
    weight: 'moderate',
    category: 'resilience',
    description: 'Chose to stay in a small island or peripheral place when emigration was the available achievement — the achievement of staying is real and not always legible as achievement to those who left.',
    intent: 'year_texture',
    notes: 'Set by sl_small_island_brain_drain (stay branch).',
  },

  coloured_classification: {
    weight: 'major',
    category: 'identity',
    description: 'Classified as Coloured under South Africa\'s Population Registration Act — a family split by the pencil test, the classification determining school, bus, hospital, and who could marry whom.',
    intent: 'year_texture',
    notes: 'Set by sl_apartheid_pencil_test.',
  },

  orthodox_fasting_formation: {
    weight: 'minor',
    category: 'spirituality',
    description: 'Formed by the Ethiopian Orthodox fasting calendar — 250+ fasting days per year; the year structured by fasts rather than seasons; mother rising before dawn for lentils and shiro; the body knowing it.',
    intent: 'none',
    notes: 'Set by sl_ethiopia_fasting_year.',
  },

  climate_displaced_stayed: {
    weight: 'moderate',
    category: 'identity',
    description: 'Chose to stay on a climate-threatened island despite rising seas — the staying as witness, the grief of watching the tides, the decision that will likely be made again.',
    intent: 'year_texture',
    notes: 'Set by sl_pacific_climate_rising_sea (stay branch).',
  },

  transracial_adoptee: {
    weight: 'moderate',
    category: 'identity',
    description: 'Transracially adopted — Korean in Minnesota, Black in Sweden, the only one of their ethnicity in their school, a folder of paperwork and a photograph of a woman the agency says is their mother.',
    intent: 'year_texture',
    notes: 'Set by sl_korean_adoptee_child.',
  },

  adoptee_searched: {
    weight: 'moderate',
    category: 'identity',
    description: 'Searched for a birth parent as an adult adoptee — the file, the name, the intermediary, the not-responding that is its own information.',
    intent: 'none',
    notes: 'Set by sl_korean_adoptee_return (search branch).',
  },

  space_race_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up with Gagarin\'s face on the classroom wall — the Soviet space achievement felt from inside, before the other feelings about the Soviet Union were available.',
    intent: 'none',
    notes: 'Set by sl_soviet_space_race_child.',
  },

  traveller_childhood: {
    weight: 'moderate',
    category: 'identity',
    description: 'Irish Traveller childhood — the barrel-top wagon, the harvest circuits, the horse as family economics, the moves before the week was out. Ireland did not officially recognise Travellers as an ethnic group until 2017.',
    intent: 'event',
    notes: 'Set by sl_irish_traveller_child. Follow-through: sl_irish_traveller_sedentarisation.',
  },

  matatu_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Nairobi working/lower-middle-class person whose daily infrastructure is the matatu — the tout hanging from the door, the sound system louder than physics requires, forty minutes becoming an hour forty.',
    intent: 'none',
    notes: 'Set by sl_kenya_matatu_generation.',
  },

  chechen_deportation_memory: {
    weight: 'major',
    category: 'identity',
    description: 'Inheritor of the 1944 Chechen deportation — four hundred and ninety thousand people in cattle cars in three days; grandparents who lost children in the first Kazakh winter; oblique references as inheritance.',
    intent: 'year_texture',
    notes: 'Set by sl_chechen_deportation_memory.',
  },

  intifada_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Palestinian child during the First Intifada — the school closed by military order, the flag illegal and put back up anyway, the men speaking in the kitchen after the children were supposed to be asleep.',
    intent: 'year_texture',
    notes: 'Set by sl_first_intifada_child.',
  },

  driving_ban_lived: {
    weight: 'moderate',
    category: 'identity',
    description: 'Saudi woman who lived and worked under the driving ban — the driver as a quarter of salary, the scheduling in advance, the medical professional who the country needed and also needed to not drive.',
    intent: 'event',
    notes: 'Set by sl_saudi_driving_ban. Follow-through: sl_saudi_driving_ban_lifted fires when ban lifted (2018+).',
  },

  blood_feud_family: {
    weight: 'major',
    category: 'identity',
    description: 'Family caught in an Albanian Kanun blood feud — father confined to the house for years, the child who brings meals, the reconciliation organisations who have visited twice, the other family that has not agreed.',
    intent: 'year_texture',
    notes: 'Set by sl_albanian_blood_feud.',
  },

  dzud_survivor: {
    weight: 'moderate',
    category: 'identity',
    description: 'Mongolian herder who survived a major dzud — the winter that killed a quarter of the national herd, the emergency fodder arriving in March, the count after the thaw a different number.',
    intent: 'year_texture',
    notes: 'Set by sl_mongolia_dzud_winter.',
  },

  colonial_resistance: {
    weight: 'major',
    category: 'identity',
    description: 'Participated in clandestine resistance to colonial occupation — the information network, the shelter given, the people who disappeared, the survival that was not guaranteed.',
    intent: 'year_texture',
    notes: 'Set by sl_east_timor_resistance (resist branch).',
  },

  occupation_survived: {
    weight: 'moderate',
    category: 'identity',
    description: 'Survived a military occupation by keeping a low profile — the accommodations, the silences, the things not said; processed for years after independence.',
    intent: 'year_texture',
    notes: 'Set by sl_east_timor_resistance (survive branch).',
  },

  soviet_educated: {
    weight: 'moderate',
    category: 'identity',
    description: 'Educated at the Peoples\' Friendship University Moscow or equivalent — the scholarship, the first January, the friendship of peoples and its specific limits on the metro.',
    intent: 'year_texture',
    notes: 'Set by sl_african_student_ussr.',
  },

  indigenous_land_rights: {
    weight: 'moderate',
    category: 'identity',
    description: 'Living through a land and water rights dispute as an indigenous community member — the river that was always there, the water code that privatised it, the tension that continues.',
    intent: 'year_texture',
    notes: 'Set by sl_mapuche_water_rights.',
  },

  art_through_conflict: {
    weight: 'moderate',
    category: 'identity',
    description: 'Continued making art during active conflict nearby — the rumba in Kinshasa while the war was in the east; the music as the thing that is not the war, both necessary.',
    intent: 'year_texture',
    notes: 'Set by sl_drc_musician_war.',
  },

  uzb_silk_road_identity: {
    weight: 'minor',
    category: 'identity',
    description: 'Uzbek character who carries Timur/Samarkand/Bukhara as identity anchor — the Registan, the blue tilework, the Silk Road as inheritance.',
    intent: 'none',
    notes: 'Set by uzb_silk_road_identity (event).',
  },

  uzb_alphabet_transition: {
    weight: 'minor',
    category: 'identity',
    description: 'Uzbek character who experienced all three alphabets: Arabic script (pre-1928), Cyrillic (1940-1993), modified Latin (1993+) — grandparents\' letters unreadable.',
    intent: 'none',
    notes: 'Set by uzb_alphabet_generation.',
  },

  uzb_fergana_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'From the Fergana Valley borderlands — the Soviet-drawn lines cutting through communities, the cousin who is now a different citizen, the 2010 ethnic violence.',
    intent: 'none',
    notes: 'Set by uzb_fergana_borders.',
  },

  kaz_steppe_identity: {
    weight: 'minor',
    category: 'identity',
    description: 'Carries Kazakh steppe nomadic heritage — the star names in Kazakh, the grandfather\'s knowledge of seasonal routes, the identity persisting through Soviet collectivisation.',
    intent: 'none',
    notes: 'Set by kaz_steppe_memory.',
  },

  kazakh_speaker: {
    weight: 'minor',
    category: 'identity',
    description: 'Primary Kazakh speaker — the language of the steppe recovered from Soviet suppression, now official policy, marker of authenticity.',
    intent: 'none',
    notes: 'Set by kaz_language_question (Kazakh path).',
  },

  kaz_russian_speaker_primary: {
    weight: 'minor',
    category: 'identity',
    description: 'Russian-primary speaker in Kazakhstan — the professional language of Soviet legacy, now living alongside a Kazakh revival.',
    intent: 'none',
    notes: 'Set by kaz_language_question (Russian path).',
  },

  // ─── TAJIKISTAN FLAGS ───────────────────────────────────────────────────────

  taj_pamiri_identity: {
    weight: 'moderate',
    category: 'identity',
    description: 'Pamiri identity in Tajikistan — Ismaili Muslim, Shughni or Wakhi speaker, GBAO resident or diaspora, marked in a Sunni Tajik state.',
    intent: 'none',
    notes: 'Set by taj_pamiri_identity event (both paths).',
  },

  taj_pamiri_stayed: {
    weight: 'minor',
    category: 'identity',
    description: 'Pamiri who stayed in GBAO — the isolation as protection, the Aga Khan networks, the passes that close in winter.',
    intent: 'none',
    notes: 'Set by taj_pamiri_identity (stayed path).',
  },

  taj_pamiri_dushanbe: {
    weight: 'minor',
    category: 'identity',
    description: 'Pamiri living in Dushanbe — recognizable by surname and accent, navigating the capital\'s informal Pamiri networks.',
    intent: 'none',
    notes: 'Set by taj_pamiri_identity (Dushanbe path).',
  },

  // ─── KYRGYZSTAN FLAGS ────────────────────────────────────────────────────────

  kyr_manas_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up knowing the Manas epic — half a million lines, longest oral epic in world literature, recited in trance by manaschi singers.',
    intent: 'none',
    notes: 'Set by kyr_manas_epic.',
  },

  kyr_nomadic_heritage: {
    weight: 'minor',
    category: 'identity',
    description: 'Carries Kyrgyz nomadic heritage — the boz üy, the high summer pastures, the horse culture that Soviet collectivisation disrupted.',
    intent: 'none',
    notes: 'Set by kyr_steppe_heritage.',
  },

  kyr_ala_kachuu_aware: {
    weight: 'moderate',
    category: 'identity',
    description: 'Kyrgyz woman who knows the edges of bride kidnapping custom — the law that prohibits it, the community that maintains it, the partial protection.',
    intent: 'none',
    notes: 'Set by kyr_ala_kachuu (aware path).',
  },

  kyr_tradition_burden: {
    weight: 'moderate',
    category: 'identity',
    description: 'Kyrgyz woman who carries the unspoken knowledge of tradition\'s limits — the things women know without saying.',
    intent: 'none',
    notes: 'Set by kyr_ala_kachuu (burden path).',
  },

  // ─── TURKMENISTAN ─────────────────────────────────────────────────────────────

  tkm_soviet_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up in Soviet Turkmenistan — cotton quotas, the Karakum Canal, collective farm rhythms.',
    intent: 'none',
    notes: 'Set by tkm_soviet_cotton.',
  },

  tkm_ruhnama_compliant: {
    weight: 'moderate',
    category: 'identity',
    description: 'Learned the Ruhnama fully, as required — passages now permanent in memory, meaning uncertain.',
    intent: 'none',
    notes: 'Set by tkm_ruhnama_required.',
  },

  tkm_ruhnama_resistant: {
    weight: 'moderate',
    category: 'identity',
    description: 'Learned the minimum Ruhnama and found real reading elsewhere, quietly. The counter-curriculum.',
    intent: 'none',
    notes: 'Set by tkm_ruhnama_required.',
  },

  tkm_darvaza_witness: {
    weight: 'minor',
    category: 'identity',
    description: 'Has seen the Darvaza gas crater — burning since 1971, visible for kilometres at night across the Karakum Desert.',
    intent: 'none',
    notes: 'Set by tkm_darvaza_crater.',
  },

  // ─── GHANA ────────────────────────────────────────────────────────────────────

  gha_akan_day_name: {
    weight: 'minor',
    category: 'identity',
    description: 'Carries the Akan day-name alongside their given name — Kwame, Kofi, Yaa, Ama: the name that tells Ghanaians which day you arrived.',
    intent: 'none',
    notes: 'Set by gha_day_name.',
  },

  gha_cocoa_family: {
    weight: 'moderate',
    category: 'identity',
    description: 'From a cocoa-farming family — learned early that what you produce and what you receive are mediated by prices set in London and Zürich.',
    intent: 'none',
    notes: 'Set by gha_cocoa_family event.',
  },

  gha_pentecostal_committed: {
    weight: 'moderate',
    category: 'identity',
    description: 'Drawn into the new Pentecostalism — Lighthouse, ICGC, the conviction in the warehouse church that God\'s approval is imminent.',
    intent: 'none',
    notes: 'Set by gha_pentecostal_rise.',
  },

  gha_faith_private: {
    weight: 'moderate',
    category: 'identity',
    description: 'Maintains faith privately, at a distance from Pentecostal intensity — believes what they believe but not in that specific room.',
    intent: 'none',
    notes: 'Set by gha_pentecostal_rise.',
  },

  gha_year_of_return_witness: {
    weight: 'minor',
    category: 'identity',
    description: 'Watched the 2019 Year of Return — diaspora arriving, Cape Coast castle ceremonies, the complicated feelings about recognition and performance.',
    intent: 'none',
    notes: 'Set by gha_year_of_return.',
  },

  // ─── ECUADOR ──────────────────────────────────────────────────────────────────

  ecu_quechua_home: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up with Quechua as the home language — learned early that Spanish was the school language and what that distinction meant for the rest of life.',
    intent: 'both',
    notes: 'Set by ecu_school_quechua. Year texture + ft34_quechua_late follow-through.',
  },

  ecu_flower_worker: {
    weight: 'moderate',
    category: 'identity',
    description: 'Worked in the Cayambe/Cotopaxi flower export industry — the pre-dawn hours, the fumigation mist, botanical expertise that earns almost nothing.',
    intent: 'both',
    notes: 'Set by ecu_flower_hacienda. Year texture + ft34_flower_late follow-through.',
  },

  // ─── EL SALVADOR ─────────────────────────────────────────────────────────────

  slv_gang_renta_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Paid or witnessed the gang renta economy — the weekly collection, the fixed rate, the understanding that this is simply what operating in these streets costs.',
    intent: 'both',
    notes: 'Set by slv_gang_renta. Year texture + ft35_renta_echo follow-through.',
  },

  // ─── GUATEMALA ────────────────────────────────────────────────────────────────

  gua_highland_maya: {
    weight: 'moderate',
    category: 'identity',
    description: 'Maya highland identity — the milpa, the weaving patterns that say what village you are from, the cofradía calendar, the state that doesn\'t know you exist.',
    intent: 'both',
    notes: 'Set by gua_highland_childhood. Year texture + ft36_highland_maya_late follow-through.',
  },

}
