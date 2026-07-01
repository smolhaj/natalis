/**
 * POLITICAL_FLAGS — political flags for the natalis flag system.
 * Auto-split from src/data/flags.js by scripts/split_flags.py
 */
export const POLITICAL_FLAGS = {

  soweto_generation: {
    weight: 'major',
    category: 'historical',
    description: 'In Soweto or the wider Black South African community on June 16, 1976 — Hector Pieterson, the march against Afrikaans-medium instruction, the bullets, the image that circled the world.',
    intent: 'both',
    notes: 'Set by sa_soweto_1976. Needs year texture and a late-life follow-through.',
  },

  mandela_release_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Watched Nelson Mandela walk out of Victor Verster Prison on February 11, 1990 — the twenty-seven years ending in that walk, the crowd on the road, the raised fist.',
    intent: 'year_texture',
    notes: 'Set by sa_mandela_release_1990.',
  },

  zuma_state_capture_era: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the Zuma years (2009-2018) — state capture, Nkandla, the Gupta family, the systematic looting of state-owned enterprises.',
    intent: 'year_texture',
    notes: 'Set by sa_state_capture. Texture only.',
  },

  post_apartheid_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Voted in or witnessed South Africa\'s first democratic election, April 27, 1994 — the queue at the polling station, the ink-stamped thumb, the first vote.',
    intent: 'year_texture',
    notes: 'Set by sa_first_vote_1994.',
  },

  rainbow_nation_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Embraced the post-1994 South African hope — the Rainbow Nation, the TRC, Mandela\'s moral authority — and the subsequent calibration of that hope against structural reality.',
    intent: 'year_texture',
    notes: 'Set by sa_mandela_era_hope (hope choice).',
  },

  marikana_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the Marikana massacre of August 16, 2012 — 34 striking miners shot by the ANC government\'s police; the event that restructured post-apartheid disillusionment.',
    intent: 'year_texture',
    notes: 'Set by sa_marikana_2012.',
  },

  post_apartheid_disillusionment: {
    weight: 'moderate',
    category: 'political',
    description: 'The specific disillusionment of someone who believed in the post-1994 promise and watched it break — not at the ANC\'s ideology but at its governance.',
    intent: 'year_texture',
    notes: 'Set by sa_marikana_2012 (betrayal choice).',
  },

  sa_sharpeville_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through or was shaped by the Sharpeville Massacre of March 21, 1960 — 69 Black South Africans shot by police at an anti-pass-law protest, most in the back as they ran.',
    intent: 'event',
    notes: 'Set by sa_sharpeville_1960. Follow-through: ft63_sharpeville_midlife, ft63_sharpeville_late.',
  },

  sa_pass_humiliation: {
    weight: 'major',
    category: 'historical',
    description: 'Experienced the dompas (reference book) system — the passbook apartheid required Black South Africans to carry at all times, controlling freedom of movement and employment.',
    intent: 'event',
    notes: 'Set by sa_pass_book_daily. Follow-through: ft63_pass_abolition (1986).',
  },

  sa_biko_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Influenced by Steve Biko and the Black Consciousness movement; present in the culture when Biko was killed in police detention on September 12, 1977.',
    intent: 'event',
    notes: 'Set by sa_biko_death_1977. Follow-through: ft63_biko_late.',
  },

  sa_anc_exile: {
    weight: 'major',
    category: 'displacement',
    description: 'Left South Africa to join the ANC in exile — Lusaka, London, Dar es Salaam — through the Botswana route or other crossings; lived as a political exile.',
    intent: 'event',
    notes: 'Set by sa_anc_exile. Follow-through: ft63_exile_return_1990.',
  },

  sa_forced_removal: {
    weight: 'major',
    category: 'historical',
    description: 'Forcibly removed from home under the Group Areas Act or similar apartheid legislation — Sophiatown, District Six, Cato Manor, or any of the communities that were razed and resettled.',
    intent: 'event',
    notes: 'Set by sa_forced_removal. Follow-through: ft63_removal_restitution.',
  },

  sa_mbeki_aids_era: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the Mbeki AIDS denialism period (1999-2008) — the years in which ARV distribution was blocked and 330,000+ preventable deaths occurred.',
    intent: 'event',
    notes: 'Set by sa_mbeki_aids. Follow-through: ft63_mbeki_aids_post.',
  },

  sa_born_free: {
    weight: 'moderate',
    category: 'identity',
    description: 'South African born after April 1994 — the "born free" generation who inherited the democracy without living through its winning, growing up into the gap between constitutional freedom and inherited material inequality.',
    intent: 'year_texture',
    notes: 'Set by sa_born_free_reality. Follow-through: ft63_born_free_vote.',
  },

  sa_service_delivery_era: {
    weight: 'moderate',
    category: 'political',
    description: 'Participated in or witnessed the post-apartheid service delivery protests — a generation who held the ANC to the specific promises of 1994 (water, electricity, housing) at the local level.',
    intent: 'event',
    notes: 'Set by sa_service_delivery_protest. Follow-through: ft63_service_delivery_late.',
  },

  sa_afrikaner_transformed: {
    weight: 'moderate',
    category: 'identity',
    description: 'Afrikaner South African who worked through the transformation of Afrikaner identity after 1994 — the language question, the history question, the relationship between the language and what was done in its name.',
    intent: 'year_texture',
    notes: 'Set by sa_afrikaner_identity. Texture only.',
  },

  sa_land_debate_era: {
    weight: 'moderate',
    category: 'political',
    description: 'Engaged with the South African land question — the 2018+ debate about expropriation without compensation, the arithmetic of apartheid-era dispossession still expressed in land ownership.',
    intent: 'year_texture',
    notes: 'Set by sa_land_question. Texture only.',
  },

  endsars_generation: {
    weight: 'major',
    category: 'political',
    description: 'Nigerian youth shaped by the October 2020 #EndSARS protests — the hashtag, the highway blockades, the Lekki toll gate shooting, the footage that circulated before it was removed.',
    intent: 'year_texture',
    notes: 'Set by nga_endsars_2020.',
  },

  green_movement_generation: {
    weight: 'major',
    category: 'political',
    description: 'Iranian shaped by the 2009 Green Movement — the fraudulent election, the "Where is my vote?" chant, Neda Agha-Soltan, the crackdown of 4,000 arrested.',
    intent: 'year_texture',
    notes: 'Set by iran_green_movement_2009.',
  },

  zan_zendegi_azadi: {
    weight: 'major',
    category: 'political',
    description: 'Iranian shaped by the 2022–23 Mahsa Amini protests — "Woman, Life, Freedom" — the most significant challenge to the Islamic Republic since 1979.',
    intent: 'year_texture',
    notes: 'Set by iran_mahsa_amini_2022.',
  },

  graduated: {
    weight: 'major',
    category: 'achievement',
    description: 'Character completed university. The credential and the rupture it marks.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Memory layer has an entry. Could use more follow-through in career context.',
  },

  business_failed: {
    weight: 'major',
    category: 'achievement',
    description: 'A business the character built has failed.',
    intent: 'both',
    timestamped: true,
    notes: 'Year texture and memory layer. Post-crisis path. Reasonably covered.',
  },

  business_failed_and_restarted: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Character failed and tried again — the specific resilience of a second attempt.',
    intent: 'year_texture',
    notes: 'No dedicated year texture path for the restart itself.',
  },

  knows_failure: {
    weight: 'major',
    category: 'achievement',
    description: 'Character experienced a significant failure that changed their relationship to risk and ambition.',
    intent: 'both',
    timestamped: true,
    notes: 'Memory layer and followthrough_8 reframe event. Covered.',
  },

  career_defining_work: {
    weight: 'major',
    category: 'achievement',
    description: 'Character produced their defining professional achievement.',
    intent: 'event',
    notes: 'Year texture path present. Late-life echo in followthrough. Covered.',
  },

  first_love_over: {
    weight: 'major',
    category: 'achievement',
    description: 'The first significant romantic relationship has ended.',
    intent: 'both',
    timestamped: true,
    notes: 'Memory layer and followthrough_6. Reasonably covered.',
  },

  is_mentor: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Character has taken on a mentoring role for a younger person.',
    intent: 'year_texture',
    notes: 'Year texture path present. Mentor arc events cover this.',
  },

  scholarship_student: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Character received a scholarship that changed their educational trajectory.',
    intent: 'event',
    notes: 'events_school.js has the payoff event and social texture events.',
  },

  scholarship_declined: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Character turned down a scholarship — the road not taken.',
    intent: 'event',
    notes: 'followthrough_6 has a midlife wonder event.',
  },

  art_in_drawer: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Character has creative work they have never shown to anyone.',
    intent: 'both',
    timestamped: true,
    notes: 'followthrough_8 has a midlife choice event. Year texture path present.',
  },

  artistic_integrity: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Character chose not to compromise their creative work, at some cost.',
    intent: 'event',
    notes: 'events_arts.js has a late echo event.',
  },

  project_revived: {
    weight: 'minor',
    category: 'achievement',
    description: 'Character returned to a creative project they had abandoned for years.',
    intent: 'none',
    notes: 'Terminal flag. Set when writing_in_drawer project is reopened after 10+ years.',
  },

  nollywood_generation: {
    weight: 'minor',
    category: 'achievement',
    description: 'Character participated in Nigeria\'s Nollywood film industry.',
    intent: 'event',
    notes: 'events_arts.js has a decade callback.',
  },

  compromised: {
    weight: 'major',
    category: 'political',
    description: 'Character made a moral compromise — betrayed someone or acted against their values for survival or gain.',
    intent: 'both',
    timestamped: true,
    notes: 'followthrough_8 has a late reckoning. Memory layer. Covered.',
  },

  solidarity_proven: {
    weight: 'moderate',
    category: 'political',
    description: 'Character took a significant personal risk to stand in solidarity with someone else.',
    intent: 'event',
    timestamped: true,
    notes: 'followthrough_8 has a late echo. Covered.',
  },

  lab_crossed_line: {
    weight: 'major',
    category: 'political',
    description: 'Character crossed the picket line during a labour dispute.',
    intent: 'event',
    timestamped: true,
    notes: 'followthrough_8 has a midlife surfacing event.',
  },

  resistance_through_art: {
    weight: 'moderate',
    category: 'political',
    description: 'Character used their art as a form of political resistance under repression.',
    intent: 'event',
    notes: 'followthrough_5 has a recognition event.',
  },

  censored_work: {
    weight: 'moderate',
    category: 'political',
    description: 'Character\'s creative or journalistic work was censored by authorities.',
    intent: 'event',
    notes: 'followthrough_5 has a journalist story event.',
  },

  political_active: {
    weight: 'moderate',
    category: 'political',
    description: 'Character became actively politically engaged — organizing, protesting, or campaigning.',
    intent: 'event',
    notes: 'followthrough_4 has a regime-gated career cost event.',
  },

  chernobyl_liquidator: {
    weight: 'major',
    category: 'political',
    description: 'Character was sent to help contain the Chernobyl disaster — dosimeter confiscated, body kept its account.',
    intent: 'both',
    timestamped: true,
    notes: 'Industrial arc has health decade and silence events. Year texture path present. Covered.',
  },

  chernobyl_advocate: {
    weight: 'minor',
    category: 'political',
    description: 'Character chose to speak publicly about Chernobyl health consequences.',
    intent: 'none',
    notes: 'Texture flag from the silence/advocate choice.',
  },

  grew_up_polluted: {
    weight: 'moderate',
    category: 'political',
    description: 'Character grew up near environmental pollution — wrong-coloured river, chemical smell.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Year texture path present (30%). Has midlife pollution body event.',
  },

  industrial_upbringing: {
    weight: 'moderate',
    category: 'political',
    description: 'Character grew up near heavy industry — factory fumes, industrial landscape.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Year texture path present (30%).',
  },

  oil_delta_witness: {
    weight: 'moderate',
    category: 'political',
    description: 'Character witnessed oil spill damage in the Niger Delta.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Timestamped. No specific year texture path yet.',
  },

  bhopal_refused_settlement: {
    weight: 'minor',
    category: 'political',
    description: 'Character refused the inadequate Bhopal disaster settlement.',
    intent: 'none',
    notes: 'Texture label from the settlement choice event.',
  },

  chechnya_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Russian character shaped by the Chechen wars (1994-96, 1999-2009) — the zinc coffins, the mothers\' organisations, the war the television didn\'t call a war.',
    intent: 'year_texture',
    notes: 'Set by ru_chechnya_war.',
  },

  russia_2022_generation: {
    weight: 'major',
    category: 'political',
    description: 'Russian shaped by the February 2022 full-scale invasion of Ukraine — the banned word "war", the arrests, the borders at capacity, the private chat register.',
    intent: 'year_texture',
    notes: 'Set by ru_ukraine_invasion_2022.',
  },

  bolotnaya_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Part of Russia\'s 2011-12 protest movement — Bolotnaya Square, the white ribbons, the first mass political mobilisation since the 1990s, and the systematic suppression that followed.',
    intent: 'both',
    notes: 'Set by ru_bolotnaya_2011. Needs year texture and a follow-through for Navalny\'s death 2024.',
  },

  russia_1991_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Russian adult who lived through the August 1991 coup attempt and its collapse — Yeltsin on the tank, the three days of uncertainty, the country that ceased to exist by December.',
    intent: 'year_texture',
    notes: 'Set by ru_1991_coup_collapse.',
  },

  putin_stability_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Russian shaped by the Putin stability bargain of the 2000s — rising oil wages and order exchanged for political passivity and managed democracy.',
    intent: 'year_texture',
    notes: 'Set by ru_putin_stability_bargain.',
  },

  orange_revolution_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Part of Ukraine\'s 2004 Orange Revolution — the tent city on Maidan, Yushchenko\'s poisoned face, the Supreme Court annulment, the second election. The precedent.',
    intent: 'year_texture',
    notes: 'Set by ukr_orange_revolution_2004.',
  },

  euromaidan_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Part of the Euromaidan (2013-14) — the tent city, the Berkut crackdown, the Heavenly Hundred (Небесна Сотня), the revolution that led directly to Crimea, Donbas, and 2022.',
    intent: 'both',
    notes: 'Set by ukr_euromaidan_2013. Needs year texture and a late-life follow-through about what Maidan led to.',
  },

  regime_compliance: {
    weight: 'minor',
    category: 'political',
    description: 'Accepted an authoritarian government\'s framing of an event — not out of conviction but because the information environment made the alternative harder to reach.',
    intent: 'none',
    notes: 'Set by ru_ukraine_invasion_2022 (accepted framing choice). No downstream event needed.',
  },

  gulag_released_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Released from the gulag after Stalin\'s death (1953–58 amnesty waves) — without transportation, money, or documents; returning to a city that has moved on.',
    intent: 'year_texture',
    notes: 'Set by ps_gulag_release. Year texture: the specific texture of being released without means of return.',
  },

  collectivization_witness: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed Soviet collectivisation — animals seized, pasture routes closed, nomadic or farming life destroyed by administrative order.',
    intent: 'year_texture',
    notes: 'Set by events_central_asia.js (ca_kaz_collectivization). Specific to Kazakhstan 1929–36. Carries sedentarization follow-through.',
  },

  environmental_witness: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed large-scale environmental destruction within living memory — not abstract, but visible in the landscape of childhood.',
    intent: 'year_texture',
    notes: 'Set by events_central_asia.js (ca_uzb_aral_sea). Aral Sea desiccation. Complements grew_up_polluted.',
  },

  knew_the_truth: {
    weight: 'major',
    category: 'political',
    description: 'Character knows — or believes — that state forces were involved in the Bentalha or Rais massacres and the official attribution is incomplete.',
    intent: 'both',
    notes: 'Set by alg_massacre_news (say what you think). Ribbon: the_knew_the_truth. The ambiguity is deliberate.',
  },

  intellectual_target_reckoned: {
    weight: 'moderate',
    category: 'political',
    description: 'Character who was targeted as an intellectual during the Algerian Black Decade has reached a midlife reckoning with that experience.',
    intent: 'event',
    notes: 'Set by ft10_intellectual_target_midlife. Gates ft10_intellectual_target_late.',
  },

  reformasi_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Character witnessed or participated in Indonesia\'s democratic transition after Suharto\'s resignation (May 1998).',
    intent: 'event',
    notes: 'Set by id98_suharto_falls. Ribbon: the_reformasi_generation.',
  },

  id98_reckoned: {
    weight: 'moderate',
    category: 'historical',
    description: 'Character has reached a late-life reckoning with the fact that no one was ever prosecuted for the May 1998 riots.',
    intent: 'year_texture',
    notes: 'Set by id98_late_reckoning (late_life, auto-resolve).',
  },

  id_1965_survived: {
    weight: 'major',
    category: 'historical',
    description: 'Navigated through the 1965–66 purge without losing immediate family — but carrying the knowledge of what happened under enforced silence.',
    intent: 'both',
    notes: 'Set by id_1965_purge (navigated through choice). Gates id_new_order_silence event.',
  },

  id_1965_silence_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Spent the New Order years in enforced silence about the 1965 purge — a generation that knew and could not say.',
    intent: 'both',
    notes: 'Set by id_new_order_silence event.',
  },

  kurd_reform_era: {
    weight: 'moderate',
    category: 'political',
    description: 'Kurdish character in Turkey lived through the EU-accession reform era — Kurdish TV, optional courses — and carries ambivalence about its incompleteness.',
    intent: 'year_texture',
    notes: 'Set by kurd_tr_eu_reforms (2002–2010).',
  },

  anfal_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Kurdish character or family was touched by the Anfal campaign (1988) — the Iraqi government\'s genocide of Kurdish civilians, including chemical weapons at Halabja.',
    intent: 'both',
    notes: 'Set by the anfal_campaign_1988 world event. Gates kurd_anfal_diaspora_news. Ribbon: the_anfal_generation.',
  },

  kurd_stateless: {
    weight: 'major',
    category: 'legal',
    description: 'Syrian Kurdish character was officially stateless under the post-1962 citizenship law — listed as ajanib (foreigner) despite generations of Syrian residence.',
    intent: 'both',
    notes: 'Set by kurd_sy_stateless. Cleared conditionally by kurd_citizenship_restored. Ribbon: the_stateless_nation.',
  },

  rojava_generation: {
    weight: 'major',
    category: 'political',
    description: 'Syrian Kurdish character witnessed or participated in the Rojava self-administration experiment (2012+) — the first Kurdish-administered territory in modern history.',
    intent: 'both',
    notes: 'Set by kurd_sy_rojava. Ribbon: the_rojava_generation.',
  },

  kurd_militant_adjacent: {
    weight: 'major',
    category: 'political',
    description: 'Kurdish character in Turkey provided active support to the PKK — carrying messages, housing members, attending meetings — during the 1984–2000 conflict.',
    intent: 'both',
    notes: 'Set by kurd_tr_pkk_question (active choice). Carries ongoing risk in authoritarian Turkey.',
  },

  kurd_citizenship_restored: {
    weight: 'moderate',
    category: 'legal',
    description: 'Syrian Kurdish character received Syrian citizenship under the April 2011 presidential decree — after 49 years of statelessness.',
    intent: 'event',
    notes: 'Set by kurd_sy_citizenship_restored. The timing (uprising\'s first weeks) is part of its meaning.',
  },

  tonton_macoute_era: {
    weight: 'major',
    category: 'political',
    description: 'Character grew up under the Duvalier dynasty with the Tonton Macoutes — state-sponsored terror that operated outside law, paid in impunity.',
    intent: 'both',
    notes: 'Set by hai_macoute_texture (childhood, Haiti 1957–86). Follow-through: hai_duvalier_midlife_echo.',
  },

  knows_the_debt: {
    weight: 'moderate',
    category: 'political',
    description: 'Character knows about the 122-year French debt Haiti paid for its own independence — the ransom for freedom.',
    intent: 'event',
    notes: 'Set by hai_debt_of_independence. An educational payload: most Haitians were not taught this in school.',
  },

  hai_transition_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Character witnessed Baby Doc\'s fall on February 7, 1986 — twenty-nine years of Duvalierism ending in a morning.',
    intent: 'event',
    notes: 'Set by hai_baby_doc_falls. The euphoria and its subsequent failure are both part of this.',
  },

  democracy_movement: {
    weight: 'moderate',
    category: 'political',
    description: 'Participated in a democracy movement — the decision that this cannot keep happening, and what that decision costs.',
    intent: 'year_texture',
    notes: 'Set by Gwangju world event (South Korea) and Turkey coup events. Cross-national political engagement flag.',
  },

  radio_childhood: {
    weight: 'minor',
    category: 'historical',
    description: 'Grew up with radio as the primary household medium — the voices from the wooden box, the family gathered, the world arriving as sound.',
    intent: 'year_texture',
    notes: 'Set by events_texture.js (era radio family) and events_technology.js (radio era). Period texture flag.',
  },

  tlatelolco_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed or was present at the 1968 Tlatelolco massacre in Mexico City — soldiers firing into a student gathering ten days before the Olympics.',
    intent: 'year_texture',
    notes: 'Set by la_mex_tlatelolco_1968. Surfaces in year texture (political trauma, state violence memory) and potential follow-through events for Mexico characters.',
  },

  narco_era_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the 2006+ Mexican drug war as personal lived texture — a name on the news list, a route no longer taken, a conversation about whether to move.',
    intent: 'year_texture',
    notes: 'Set by la_mex_narco_era. Year texture probe for ongoing risk/displacement calculus; gates narco follow-through.',
  },

  caracazo_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through El Caracazo, Venezuela 1989 — the army firing on civilian protesters, official death toll 276, real count higher, mass graves found twenty years later.',
    intent: 'year_texture',
    notes: 'Set by la_ven_caracazo character event and venezuela_caracazo_1989 world event. Year texture (state violence memory) + Venezuela political arc follow-through.',
  },

  ven_chavez_1998_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Was in Venezuela for Chávez\'s 1998 election — the paratrooper who said "por ahora" in 1992 becoming president, and the specific split it produced in Venezuelan society.',
    intent: 'year_texture',
    notes: 'Set by ven_chavez_election_1998.',
  },

  ven_2002_coup_lived: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 47-hour April 2002 coup against Chávez — the generals\' TV announcement, the businessmen\'s government, the crowd coming down from the cerros, the return.',
    intent: 'year_texture',
    notes: 'Set by ven_2002_coup.',
  },

  ven_oil_boom_lived: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived inside the petrodollar boom years — oil at $100/barrel, the misiones, Cuban doctors in the barrio, Mercal food, the imports flooding in at the official rate.',
    intent: 'year_texture',
    notes: 'Set by ven_oil_misiones.',
  },

  ven_chavez_death_generation: {
    weight: 'major',
    category: 'historical',
    description: 'In Venezuela when Chávez died March 5 2013 — the announcement from Maduro on state television, the two-day coffin procession, the grief of a generation whose political imagination he had built.',
    intent: 'year_texture',
    notes: 'Set by ven_chavez_death.',
  },

  ven_2017_generation: {
    weight: 'major',
    category: 'political',
    description: 'Was in Venezuela during the 2017 protests — four months of daily street actions, 120 dead, the guarimba, the birdshot, the motorcycles, and Maduro surviving everything.',
    intent: 'year_texture',
    notes: 'Set by ven_2017_protests.',
  },

  ven_testigo_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the full arc of Bolivarian Venezuela — the hope, the oil, the missions, the collapse, the exodus. The complete account.',
    intent: 'year_texture',
    notes: 'Set by ven_late_reckoning.',
  },

  la_violencia_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through La Violencia, Colombia 1948–58 — partisan civil war between Liberals and Conservatives that killed two hundred thousand people.',
    intent: 'year_texture',
    notes: 'Set by la_col_la_violencia character event and colombia_bogotazo_1948 world event. Year texture for older Colombian characters; gates generational memory follow-through.',
  },

  col_farc_era: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived in guerrilla-contested territory — the FARC tax on coca and cattle, the road after dark, the choice between visibility and neutrality that was also no choice.',
    intent: 'year_texture',
    notes: 'Set by col_farc_question.',
  },

  col_paz_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the 2016 Santos peace accord — the Nobel Prize, the referendum that failed, the Congress ratification, the FARC becoming a political party.',
    intent: 'year_texture',
    notes: 'Set by col_paz_santos.',
  },

  col_paro_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the 2021 Paro Nacional — 46 days of blockades, 83 dead, ESMAD firing live rounds in Cali, the internet going down.',
    intent: 'year_texture',
    notes: 'Set by col_paro_2021.',
  },

  col_testigo_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'A witness to Colombia\'s long arc of violence — from La Violencia through the cartel years through the paramilitaries through the peace accord. The map of it all.',
    intent: 'year_texture',
    notes: 'Set by col_late_reckoning.',
  },

  irn_khatami_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the Khatami reform era (1997–2005) — 300 newspapers, civil society, student uprising 1999, Shirin Ebadi Nobel Prize — and its systematic dismantling by the Guardian Council.',
    intent: 'year_texture',
    notes: 'Set by irn_khatami_era (both choices).',
  },

  irn_jcpoa_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the JCPOA arc — the 2015 signing, international delegations, the Boeing deal, Trump\'s 2018 withdrawal, the rial collapse, the double loss of hope and answer.',
    intent: 'year_texture',
    notes: 'Set by irn_jcpoa.',
  },

  irn_testigo_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Late-life witness to the Islamic Republic\'s full arc — Khatami, Ahmadinejad, Rouhani, Raisi, the reforms and crackdowns, the deals and withdrawals, the protests.',
    intent: 'year_texture',
    notes: 'Set by irn_late_reckoning.',
  },

  sau_aramco_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up in Saudi Arabia shaped by Aramco — the oil company that built the kingdom\'s infrastructure, funded the state, and employs the grammar of every sentence in Saudi life.',
    intent: 'year_texture',
    notes: 'Set by sau_aramco_generation.',
  },

  sau_gulf_war_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the Gulf War and the presence of 500,000 US troops on Saudi soil — the founding grievance of modern jihadism, Bin Laden\'s break with the royal family, the American bases that stayed.',
    intent: 'year_texture',
    notes: 'Set by sau_gulf_war_1990 (both choices).',
  },

  sau_scholarship_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Part of the King Abdullah Scholarship Program — 200,000 Saudis sent abroad with full funding, returning with the comparative knowledge of what other countries look like.',
    intent: 'year_texture',
    notes: 'Set by sau_scholarship_abroad (both choices).',
  },

  sau_khashoggi_generation: {
    weight: 'major',
    category: 'political',
    description: 'Was in Saudi Arabia when Jamal Khashoggi was killed inside the Istanbul consulate (October 2018) — the WhatsApp silence, the columns not written, the category of critic made visibly unsafe.',
    intent: 'year_texture',
    notes: 'Set by sau_khashoggi_2018 (both choices).',
  },

  sau_vision_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age during Vision 2030 — the MBS-era opening: women driving, cinemas, concerts, mutaween stripped of arrest powers, but also the Ritz detention and the Khashoggi killing.',
    intent: 'year_texture',
    notes: 'Set by sau_vision_2030.',
  },

  sau_testigo_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'A late-life witness to Saudi Arabia\'s full arc — the oil boom, the siege, the American troops, the mutaween years, Vision 2030, and the country that is not yet what it is becoming.',
    intent: 'year_texture',
    notes: 'Set by sau_late_reckoning.',
  },

  japan_postwar_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up in occupied Japan (1946–52) or the immediate postwar years — chocolate from American soldiers, rubble becoming concrete, trains running through the ruins, the emperor\'s voice on the radio.',
    intent: 'year_texture',
    notes: 'Set by jpn_postwar_childhood.',
  },

  anpo_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Was in Japan during the 1960 Anpo protests — hundreds of thousands around the Diet building opposing the US security treaty, the Zengakuren students, the democracy testing its limits.',
    intent: 'year_texture',
    notes: 'Set by jpn_anpo_protests (both choices).',
  },

  showa_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Shaped by the Showa economic miracle — 10%/year growth, bullet trains, transistor radios, the 1964 Olympics, the country\'s transformation from rubble to manufacturer in two decades.',
    intent: 'year_texture',
    notes: 'Set by jpn_economic_miracle, jpn_salaryman_life (distant choice).',
  },

  bubble_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age during Japan\'s asset bubble (1985–90) — Imperial Palace land worth more than California, golf memberships traded as securities, the Nikkei at 38,915.',
    intent: 'year_texture',
    notes: 'Set by jpn_bubble_years. Gates jpn_bubble_collapse.',
  },

  jpn_testigo_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'A witness to Japan\'s long arc — the postwar miracle, the bubble, the collapse, Fukushima — and to the national silence around the war that produced the recovery.',
    intent: 'year_texture',
    notes: 'Set by jpn_war_silence (both choices).',
  },

  zainichi_resisted: {
    weight: 'moderate',
    category: 'political',
    description: 'Refused fingerprinting as a Zainichi Korean in the 1970s-90s — part of the civil rights movement that ended the requirement in 1999.',
    intent: 'year_texture',
    notes: 'Set by jpn_zainichi (resist choice).',
  },

  aum_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the 1995 Tokyo subway sarin attack — 13 dead, thousands injured, the assumption of Japanese safety punctured.',
    intent: 'year_texture',
    notes: 'Set by jpn_aum_sarin_1995 (both choices).',
  },

  okinawa_base_opposition: {
    weight: 'moderate',
    category: 'political',
    description: 'Lives under or opposes the US military base concentration in Okinawa — 70% of US bases on less than 1% of Japan\'s land, the 1995 rape protests, the Henoko relocation fight.',
    intent: 'year_texture',
    notes: 'Set by jpn_okinawa_bases (both choices).',
  },

  per_fujimori_era: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the Fujimori decade (1990–2000) — the autogolpe, the anti-inflation shock, the sterilization campaign, the vladivideos.',
    intent: 'year_texture',
    notes: 'Set by per_autogolpe_1992, per_sterilization (refused choice), per_keiko_generation.',
  },

  per_postfujimori_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age in the vladivideo era and its aftermath — watching Fujimori fax his resignation from Tokyo after the tapes revealed the full bribery infrastructure of the decade.',
    intent: 'year_texture',
    notes: 'Set by per_vladivideo.',
  },

  per_cvr_witness: {
    weight: 'moderate',
    category: 'historical',
    description: 'Engaged with the CVR — the Comisión de la Verdad y Reconciliación — either by testifying or by living through the accounting of 69,000 dead that Lima had avoided for twenty years.',
    intent: 'year_texture',
    notes: 'Set by per_cvr (both choices). Gated on per_sendero_generation or per_sterilization_survivor.',
  },

  per_keiko_era: {
    weight: 'minor',
    category: 'political',
    description: 'Lived through the Keiko Fujimori electoral cycles (2011, 2016, 2021) — the country splitting three times on what the 1990s were, the small margins, the fraud allegations.',
    intent: 'year_texture',
    notes: 'Set by per_keiko_generation.',
  },

  per_testigo_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'A witness to Peru\'s full late-20th-century arc — Sendero, the autogolpe, the sterilizations, the vladivideos, the CVR, the Keiko cycles. The complete map in one body.',
    intent: 'year_texture',
    notes: 'Set by per_late_reckoning.',
  },

  ayotzinapa_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Shaped by the September 2014 disappearance of 43 Ayotzinapa student teachers — "fue el estado" — and the structural impunity it revealed.',
    intent: 'year_texture',
    notes: 'Set by la_mex_ayotzinapa_2014.',
  },

  mexico_earthquake_1985_witness: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the September 19, 1985 Mexico City earthquake — the day civil society was born: brigadas de rescate, citizens digging with their hands while the PRI stalled.',
    intent: 'year_texture',
    notes: 'Set by we_mexico_city_earthquake_1985 world event. Complements la_mex_1985_earthquake character event (which sets earthquake_volunteer).',
  },

  mex_2017_earthquake_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Lived through the September 19, 2017 Mexico City earthquake — the same date as 1985 — and the civilian solidarity response: bucket chains, silence for the dogs.',
    intent: 'year_texture',
    notes: 'Set by la_mex_2017_earthquake.',
  },

  // ── MEXICO DEPTH FLAGS (events_mexico.js)

  mex_pri_fell_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Present for the July 2, 2000 election night when the PRI lost power after 71 years — the specific texture of watching a hegemony end in real time.',
    intent: 'event',
    notes: 'Set by mex_2000_election_night. Follow-through: mex_pri_fall_reckoning (12+ years later).',
  },

  mex_transition_uncertain: {
    weight: 'minor',
    category: 'political',
    description: 'Felt ambivalence rather than celebration at the PRI\'s 2000 defeat — the transition was real and the uncertainty about what followed was also real.',
    intent: 'none',
    notes: 'Set by mex_2000_election_night (stay-in branch). Narrative distinction only.',
  },

  mex_tequila_crisis_survivor: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived through the December 1994 "Error de diciembre" — the peso devaluation that wiped out middle-class savings and pushed interest rates above 80%.',
    intent: 'year_texture',
    notes: 'Set by mex_tequila_crisis_1994. Year texture for Mexican characters: the memory of savings that became worth less overnight.',
  },

  mex_dirty_war_witness: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed or was adjacent to Mexico\'s Guerra Sucia (1970s–80s) — the political disappearances that followed Tlatelolco, the Halcones, the rural guerrilla suppression.',
    intent: 'none',
    notes: 'Set by mex_dirty_war_1970s. Terminal marker; the name is kept but no follow-through event fires.',
  },

  mex_unam_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Studied at the UNAM — the free public university, its gratuidad principle, and the argument that education is not a service you purchase.',
    intent: 'year_texture',
    notes: 'Set by mex_unam_world. Year texture: the free university as a worldview carried forward.',
  },

  mex_strike_participant: {
    weight: 'minor',
    category: 'political',
    description: 'Joined the 1999–2000 UNAM student strike (the longest in university history) against proposed tuition fees.',
    intent: 'none',
    notes: 'Set by mex_unam_strike_1999. Narrative distinction from those who didn\'t join.',
  },

  mex_crossed_north: {
    weight: 'major',
    category: 'displacement',
    description: 'Crossed into the United States from Mexico — the decision, the cost, the specific undocumented status that follows.',
    intent: 'year_texture',
    notes: 'Set by mex_going_north_question (go north branch). Co-fires with emigrated flag. Year texture for Mexico emigrant experience north of the border.',
  },

  mex_amlo_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Present for AMLO\'s 2018 election win (the largest popular vote in Mexican history) and the Cuarta Transformación promise.',
    intent: 'event',
    notes: 'Set by mex_amlo_2018. Follow-through: mex_amlo_echo (2022+, what the transformation actually produced).',
  },

  mex_amlo_believer: {
    weight: 'minor',
    category: 'political',
    description: 'Voted for or supported AMLO in 2018 with genuine hope in the Cuarta Transformación project.',
    intent: 'none',
    notes: 'Set by mex_amlo_2018 (hope branch). Narrative distinction from skeptics.',
  },

  mex_amlo_skeptic: {
    weight: 'minor',
    category: 'political',
    description: 'Watched the 2018 AMLO victory with cautious unease — the populist form concerned as much as the content.',
    intent: 'none',
    notes: 'Set by mex_amlo_2018 (caution branch). Narrative distinction.',
  },

  mex_indigenous_bilingual: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up holding two languages: the indigenous language that names where you come from, and Spanish, the language of where you are going.',
    intent: 'year_texture',
    notes: 'Set by mex_indigenous_school. Year texture: the two-language life carried into adulthood.',
  },

  mex_cnte_teacher: {
    weight: 'minor',
    category: 'political',
    description: 'Identified with the CNTE dissident teachers\' union — primarily in Oaxaca, Chiapas, Guerrero — rather than the SNTE official structure.',
    intent: 'none',
    notes: 'Set by mex_oaxacan_teacher (union branch). Narrative marker.',
  },

  union_solidarity: {
    weight: 'minor',
    category: 'political',
    description: 'Took a principled stand with union action — whether at the UNAM, the CNTE, or another workers\' organisation.',
    intent: 'none',
    notes: 'Set by mex_oaxacan_teacher (solidarity branch). General labor solidarity marker.',
  },

  paramilitary_era_lived: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived under or was directly affected by AUC paramilitary operations in Colombia — the false positives, the missing cousin, the arithmetic of speaking.',
    intent: 'year_texture',
    notes: 'Set by la_col_auc_paramilitares. Year texture (state/non-state violence); follow-through for Colombia peace process events.',
  },

  special_period_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through Cuba\'s Special Period 1991–2000 — Soviet subsidies gone, blackouts, rations halved, the bicycle as primary transport.',
    intent: 'year_texture',
    notes: 'Set by la_cub_special_period. Year texture (shortage economy, dual-currency inequity). Already has buildYearTexture block.',
  },

  cuba_cdr_attendee: {
    weight: 'minor',
    category: 'political',
    description: 'Attended CDR (Committee for the Defense of the Revolution) block meetings — the voluntary-but-noticed civic surveillance.',
    intent: 'year_texture',
    notes: 'Set by la_cub_cdr. Year texture (dual compliance, local surveillance culture).',
  },

  cub_revolution_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up as a child during the Cuban Revolution\'s first years — the literacy campaign, the Young Pioneers, the primer with the revolution\'s face.',
    intent: 'year_texture',
    notes: 'Set by cub_revolution_childhood. Year texture (revolutionary childhood vs. present disillusionment).',
  },

  cub_bay_of_pigs_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Was in Cuba during the Bay of Pigs invasion April 1961 — the three days of mobilization and the nationalist aftermath.',
    intent: 'year_texture',
    notes: 'Set by cub_bay_of_pigs_1961 (both choices). Year texture (the moment the revolution confirmed itself).',
  },

  cub_mobilized_1961: {
    weight: 'minor',
    category: 'historical',
    description: 'Joined the militia or took a support role during the Bay of Pigs emergency.',
    intent: 'year_texture',
    notes: 'Set by cub_bay_of_pigs_1961 mobilized choice. Year texture (the version of yourself who picked up the rifle).',
  },

  cub_mariel_stayed: {
    weight: 'minor',
    category: 'historical',
    description: 'Chose to stay in Cuba while 125,000 others left via the Mariel boatlift in 1980.',
    intent: 'year_texture',
    notes: 'Set by cub_mariel_1980. Year texture (watching the departure, calibrating what staying meant).',
  },

  cub_raul_skeptic: {
    weight: 'minor',
    category: 'political',
    description: 'Skeptical of Raúl\'s reforms — the door opening is not the same as the door open; reforms are narrow, supervised, reversible.',
    intent: 'year_texture',
    notes: 'Set by cub_raul_opening. Year texture (calibrated distrust of partial liberalizations).',
  },

  cub_obama_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Was in Cuba for the December 17, 2014 normalization announcement — the simultaneous television addresses, the quiet streets after.',
    intent: 'year_texture',
    notes: 'Set by cub_obama_thaw_2014. Year texture (the brief window that opened and didn\'t stay open).',
  },

  cub_july11_marcher: {
    weight: 'major',
    category: 'political',
    description: 'Went into the street on July 11, 2021 — the largest protests in Cuba since 1959, "Patria y Vida" replacing "Patria o Muerte".',
    intent: 'year_texture',
    notes: 'Set by cub_july11_protests. Year texture (the neighbor who went to prison, carrying the day without talking about it).',
  },

  cub_july11_watched: {
    weight: 'minor',
    category: 'political',
    description: 'Watched the July 11 2021 protests from a window — the risk calculation, the sound of the day carried without speaking.',
    intent: 'year_texture',
    notes: 'Set by cub_july11_protests. Year texture (witness without participant; the arithmetic of staying inside).',
  },

  laos_revolution_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Was in Laos for the Pathet Lao victory December 1975 — the monarchy abolished, the Secret War ended, the Hmong who fought for the CIA now enemies of the new state.',
    intent: 'year_texture',
    notes: 'Set by laos_pathet_lao_1975 world event. Year texture (what the revolution meant depends on which side your family was on).',
  },

  laos_uxo_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up in Laos with the daily reality of UXO (unexploded ordnance) from the 1964-73 Secret War — the rule about not touching metal in the field, the boy who didn\'t follow it.',
    intent: 'year_texture',
    notes: 'Set by laos_uxo_childhood. Year texture (the war that ended before you were born and its problem that hasn\'t ended).',
  },

  laos_hmong_era: {
    weight: 'major',
    category: 'political',
    description: 'Hmong character shaped by post-1975 persecution — the CIA Secret Army legacy, the family members who fled to Minnesota, the knowledge of which topics not to raise in school.',
    intent: 'year_texture',
    notes: 'Set by laos_hmong_highland. Year texture (old family knowledge passed before you had words for it).',
  },

  laos_party_generation: {
    weight: 'minor',
    category: 'political',
    description: 'Navigated the LPRP single-party structure — the mandatory meetings, the formula, the calibration between public and private speech.',
    intent: 'year_texture',
    notes: 'Set by laos_party_discipline. Year texture (the register you use at the meeting vs. at home).',
  },

  laos_dam_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the Mekong dam reckoning — eleven upstream dams in China, fish stocks declining, the 2018 collapse that killed 49, electricity sold to Thailand.',
    intent: 'year_texture',
    notes: 'Set by laos_mekong_dams. Year texture (the river the fishermen were born on is changing).',
  },

  nam_herero_memory_bearer: {
    weight: 'major',
    category: 'historical',
    description: 'Herero or Nama character who carries the oral memory of the 1904-08 genocide — the Extermination Order, the bones sent to Germany, the generational transmission of loss.',
    intent: 'year_texture',
    notes: 'Set by nam_herero_oral_history and nam_german_apology_herero_nama. Year texture (the bone of history passed through telling).',
  },

  nam_aids_generation_nam: {
    weight: 'moderate',
    category: 'historical',
    description: 'Namibian character who grew up during the country\'s HIV/AIDS epidemic (late 1990s-2010s) — one in five adults infected at peak; the funerals as rhythm of the year.',
    intent: 'year_texture',
    notes: 'Set by nam_aids_generation. Year texture (knowledge that a specific decision can determine the rest of your life).',
  },

  nam_swapo_generation: {
    weight: 'minor',
    category: 'political',
    description: 'Shaped by SWAPO\'s dual nature as liberation movement and entrenched ruling party — liberation legitimacy that became patronage infrastructure.',
    intent: 'year_texture',
    notes: 'Set by nam_swapo_ruling_party. Year texture (keeping separate the loyalty to the idea and the use of the structure).',
  },

  nam_german_apology_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Alive for Germany\'s 2021 acknowledgment of the Herero/Nama genocide — the first formal use of the word "genocide," the 1.1bn euros, the Herero Council\'s rejection.',
    intent: 'year_texture',
    notes: 'Set by nam_german_apology_2021 and nam_german_apology_herero_nama. Year texture (the word vs. the number vs. the question).',
  },

  nam_independence_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Was in Namibia for independence on March 21, 1990 — the last African country to achieve independence from colonial/apartheid rule.',
    intent: 'year_texture',
    notes: 'Set by nam_independence_1990 world event. Year texture (the flag that was not there before and is there now).',
  },

  aragalaya_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Character participated in the 2022 Aragalaya (struggle) — Sri Lanka\'s multiethnic protest movement that brought down the Rajapaksa presidency.',
    intent: 'event',
    notes: 'Set by slk_2022_collapse (protested path). Ribbon: the_aragalaya.',
  },

  years_of_lead_generation: {
    weight: 'major',
    category: 'political',
    description: 'Character lived through the Années de Plomb — Hassan II\'s era of political detention, disappearances, and the specific learned silence of a Moroccan university in the 1970s.',
    intent: 'both',
    notes: 'Set by mor_years_of_lead. Follow-through: mor_years_of_lead_echo. Ribbon: the_years_of_lead.',
  },

  mor_moudawwana_generation: {
    weight: 'moderate',
    category: 'social',
    description: 'Moroccan woman who lived through the 2004 Moudawwana reform — the family code that raised the marriage age, restricted polygamy, and required judicial divorce.',
    intent: 'year_texture',
    notes: 'Set by mor_moudawwana_2004. Year texture: the gap between the law on paper and the practice on the ground; a reform that came from the throne rather than the street.',
  },

  refugee_status_generation: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Character was born or grew up in a refugee camp — where the homeland is a story transmitted by parents rather than a place experienced.',
    intent: 'year_texture',
    notes: 'Set by mor_sahrawi_tindouf (Sahrawi camps) and potentially other refugee camp events. Year texture: the intergenerational transmission of displacement.',
  },

  rohingya_stateless: {
    weight: 'major',
    category: 'legal',
    description: 'Rohingya character is stateless under Myanmar\'s 1982 Citizenship Law — listed as temporary resident in the country where their family has lived for generations.',
    intent: 'both',
    notes: 'Set by roh_stateless_document. Gates roh_restricted_movement. Ribbon: the_temporary_resident.',
  },

  ujamaa_generation: {
    weight: 'major',
    category: 'political',
    description: 'Tanzanian character lived through Nyerere\'s ujamaa era — believed in or sceptical of the Arusha Declaration, was moved in Operation Vijiji, carries the complexity of a failed vision that built real schools.',
    intent: 'both',
    notes: 'Set by tan_arusha_declaration. Follow-throughs: tan_villagisation, tan_ujamaa_late_reckoning, tan_nyerere_death.',
  },

  // ── TANZANIA DEPTH FLAGS ──────────────────────────────────────────────────
  tan_zanzibar_revolution_generation: {
    weight: 'major',
    category: 'political',
    description: 'Zanzibari character whose family was shaped by the 1964 revolution — either liberation from the sultanate or displacement and loss.',
    intent: 'year_texture',
    notes: 'Set by tan_zanzibar_revolution (both choices). Gates tan_zanzibar_identity follow-through event. Memory of a world-altering week in January 1964.',
  },

  tan_magufuli_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Tanzanian character who lived through Magufuli\'s Bulldozer era 2015–21 — infrastructure and authoritarianism, COVID denial, sudden death.',
    intent: 'year_texture',
    notes: 'Set by tan_magufuli_era (both choices). The ambivalence of a leader who built roads and buried statistics.',
  },

  multiparty_generation: {
    weight: 'minor',
    category: 'political',
    description: 'Character witnessed their country\'s first multiparty elections — the specific experience of an opposition name on a ballot for the first time.',
    intent: 'event',
    notes: 'Set by tan_multiparty and other transitions to democracy events.',
  },

  deployed_to_conflict: {
    weight: 'major',
    category: 'military',
    description: 'Character was deployed to an active conflict zone — the flight, the specific smell, the recalibration of what safe and not-safe feel like.',
    intent: 'both',
    notes: 'Set by sol_deployment_orders. Gates all subsequent soldier arc events.',
  },

  combat_veteran: {
    weight: 'major',
    category: 'military',
    description: 'Character served in a combat zone — carries what was done, what was seen, the friend who was gone by Thursday.',
    intent: 'both',
    notes: 'Set by sol_first_week. Follow-throughs: sol_the_order, sol_return_home, sol_not_sleeping, sol_late_reckoning.',
  },

  returned_veteran: {
    weight: 'major',
    category: 'military',
    description: 'Character returned from deployment — back in the airport, the sign someone made, the specific wrongness of everything being too clean and too loud.',
    intent: 'both',
    notes: 'Set by sol_return_home. Follow-throughs: sol_not_sleeping, sol_the_question, sol_anniversary.',
  },

  veteran_silence: {
    weight: 'moderate',
    category: 'military',
    description: 'Character has learned the short answer — the version of their service that fits in a conversation. The longer version travels with them.',
    intent: 'event',
    notes: 'Set by sol_the_question. Surfaces in year texture for characters with returned_veteran flag.',
  },

  rwandan_survivor: {
    weight: 'major',
    category: 'persecution',
    description: 'Character survived the 1994 Rwandan genocide — crossed a checkpoint, watched who did not cross, has never fully stopped walking past it.',
    intent: 'both',
    notes: 'Set by doc_rwandan_id_1994. High-weight flag; should dominate the epitaph.',
  },

  rwa_habyarimana_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up in Habyarimana\'s Rwanda 1973-1994 — ethnic quotas, single-party state, the ID card that categorized you before you understood what the category meant.',
    intent: 'year_texture',
    notes: 'Set by rwa_habyarimana_childhood. Both Hutu and Tutsi perspectives (branched text).',
  },

  rwa_gacaca_generation: {
    weight: 'major',
    category: 'cultural',
    description: 'Sat in the gacaca courts 2001-2012 — community justice in open fields; testified or was testified about; the accounting that the country built its forward motion on.',
    intent: 'year_texture',
    notes: 'Set by rwa_gacaca_courts. 1.5 million cases processed.',
  },

  rwa_kagame_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived in post-genocide Rwanda under Kagame — the clean streets, the economic miracle, the no-ethnicity rule, the press restrictions. Both things simultaneously.',
    intent: 'year_texture',
    notes: 'Set by rwa_kagame_era (both choices).',
  },

  rwa_reconciliation_generation: {
    weight: 'moderate',
    category: 'cultural',
    description: 'Lived long enough in post-genocide Rwanda to watch the gap between the official account and what happened in specific fields, on specific hills.',
    intent: 'year_texture',
    notes: 'Set by rwa_late_reckoning. Late-life reflection flag.',
  },

  sangha_member: {
    weight: 'major',
    category: 'religion',
    description: 'Character is a Buddhist monk — member of the sangha that in Cambodia predates and outlasts every government, providing education and care where the state does not.',
    intent: 'both',
    notes: 'Set by cle_cambodia_monk. Gates cle_cambodia_khmer_rouge.',
  },

  faith_survived_suppression: {
    weight: 'major',
    category: 'religion',
    description: 'Character\'s faith survived an attempt to destroy it entirely — the robes removed, the institution dissolved, the self preserved because there was nowhere else for it to go.',
    intent: 'both',
    notes: 'Set by cle_cambodia_khmer_rouge. Follow-through: cle_cambodia_rebuilding.',
  },

  mouride_member: {
    weight: 'moderate',
    category: 'religion',
    description: 'Character is part of the Mouride Sufi brotherhood — its economy, its spiritual authority, its city of Touba, its transnational dahira network that predates and outlasts the nation-state.',
    intent: 'both',
    notes: 'Set by sen_magal_touba. Follow-throughs: sen_marabout_authority, sen_diaspora_dahira.',
  },

  senegal_democracy_generation: {
    weight: 'major',
    category: 'political',
    description: 'Witnessed Senegal\'s 2000 alternance — the peaceful transfer of power after 40 years of PS rule, Diouf shaking Wade\'s hand; one of the first democratic alternations in West Africa',
    intent: 'year_texture',
    notes: 'Set by sen_alternance_2000. Year texture: what it means to have seen power transferred without soldiers.',
  },

  casamance_generation: {
    weight: 'major',
    category: 'political',
    description: 'Grew up with the Casamance conflict (MFDC separatism since 1982) as background reality — from inside the region or as a distant awareness from Dakar',
    intent: 'year_texture',
    notes: 'Set by sen_casamance. Two branches: inside (sen_casamance_inside) or outside (Dakar awareness).',
  },

  sen_intellectual_dakar: {
    weight: 'moderate',
    category: 'cultural',
    description: 'Encountered the Dakar intellectual world — Cheikh Anta Diop, Présence Africaine, IFAN, the argument that African civilisation precedes Europe — and was changed by it',
    intent: 'year_texture',
    notes: 'Set by sen_dakar_intellectual. Year texture: the specific feeling of an argument that reframes everything.',
  },

  uyghur_suppressed: {
    weight: 'major',
    category: 'persecution',
    description: 'Uyghur character lives under systematic cultural suppression — Ramadan restrictions enforced at work, language policy, the memo arriving via the work unit, saying yes to lunch while fasting at home.',
    intent: 'both',
    notes: 'Set by uyg_ramadan_restricted. Follow-throughs: uyg_camp_era, uyg_diaspora_silence.',
  },

  uyghur_detained: {
    weight: 'major',
    category: 'persecution',
    description: 'Uyghur character was detained in a Vocational Education and Training Center — the months inside, the things that were not described afterward, the training in not describing them.',
    intent: 'both',
    notes: 'Set by uyg_camp_era (comply branch). One of the most significant ongoing human rights situations in current events.',
  },

  colonial_subject: {
    weight: 'moderate',
    category: 'political',
    description: 'Character from Puerto Rico: US citizen, not eligible to vote for US president, represented by a non-voting delegate. The other word is not used in official documents.',
    intent: 'both',
    notes: 'Set by pr_colonial_status. The specific constitutional paradox of Puerto Rico\'s status makes this a useful educational event.',
  },

  ken_silent_under_moi: {
    weight: 'moderate',
    category: 'political',
    description: 'Stayed quiet during the Moi single-party era in Kenya (1982–91) — the learned suppression of political speech, the monitoring of who talks too much.',
    intent: 'event',
    notes: 'Set by ken_moi_silence (silent branch). Follow-through: ken_moi_silence_late (late_life reflection on the silence).',
  },

  eth_abiy_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived through the Abiy Ahmed 2018 moment — the peace deal with Eritrea, the border opening, the Nobel Peace Prize, the euphoria of a country that seemed to be turning.',
    intent: 'year_texture',
    notes: 'Set by eth_abiy_peace_2018. Precedes the Tigray war context.',
  },

  // ── ETHIOPIA DEPTH FLAGS (events_ethiopia_depth.js) ───────────────────────

  eth_haile_selassie_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed Haile Selassie\'s removal in September 1974 — forty-four years of imperial rule ending in a Volkswagen Beetle, the Lion of Judah described as "former king" in the next day\'s newspaper.',
    intent: 'year_texture',
    notes: 'Set by eth_haile_selassie_fall (both choices). Year texture: post-imperial memory, the arc of governments in one lifetime. Follow-through: eth_emperor_late_reckoning.',
  },

  eth_eritrea_loss: {
    weight: 'moderate',
    category: 'political',
    description: 'Ethiopian who lived through Eritrean independence in 1993 — the country becoming landlocked overnight, the ports of Assab and Massawa passing to a foreign state.',
    intent: 'year_texture',
    notes: 'Set by eth_eritrea_referendum_1993. Year texture: the specific condition of landlocked Ethiopia, the absence of a coast.',
  },

  eth_oromia_protest_witness: {
    weight: 'moderate',
    category: 'political',
    description: 'Present for the Oromia protests 2015–2016 — the Irreechaa massacre at Lake Hora, the state of emergency, the years of pressure that preceded Abiy Ahmed\'s rise.',
    intent: 'event',
    notes: 'Set by eth_oromia_protests_2016 (both choices). Follow-through: eth_oromia_abiy_reckoning (when eth_abiy_generation is also set).',
  },

  zimbabwe_independence_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Grew up in the first decade of Zimbabwean independence (1980s) when the country was genuinely building — schools, clinics, a functioning economy.',
    intent: 'none',
    notes: 'Set by zim_mugabe_early (childhood). The optimism of that era shapes how the later collapse is experienced.',
  },

  murambatsvina_witness: {
    weight: 'minor',
    category: 'political',
    description: 'Witnessed Operation Murambatsvina (2005) — 700,000 people made homeless or unemployed as informal settlements and markets were demolished.',
    intent: 'none',
    notes: 'Set by zim_murambatsvina in events_zimbabwe.js.',
  },

  zim_mugabe_era_end: {
    weight: 'minor',
    category: 'historical',
    description: 'Lived through the November 2017 military removal of Mugabe — watched the generals\' statement, the resignation, the street celebrations.',
    intent: 'none',
    notes: 'Set by zim_mugabe_fall_2017 in events_zimbabwe.js.',
  },

  romanian_austerity_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Survived the 1981–89 Romanian electricity rationing and food scarcity under Ceaușescu debt repayment',
    intent: 'year_texture',
    notes: 'Set by eur_rom_rationing_1980s. Sub-subsistence calories; near-zero meat; scheduled blackouts.',
  },

  romanian_transition_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived the post-1989 Romanian transition — Mineriads, factory closings, neither the old nor the promised new',
    intent: 'year_texture',
    notes: 'Set by eur_rom_post89_transition. Two branches: stayed or emigrated.',
  },

  romania_1989_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Was in Romania for the December 1989 revolution — Timișoara, Ceaușescu\'s last speech, the helicopter, the execution on Christmas Day.',
    intent: 'year_texture',
    notes: 'Set by rom_revolution_1989.',
  },

  hungarian_1956_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed or survived the 1956 Hungarian uprising and the Soviet re-occupation — the twelve days and what followed',
    intent: 'year_texture',
    notes: 'Set by hun_1956_uprising_child, hun_1956_uprising_adult, and worldEvent hungarian_uprising_1956.',
  },

  kadar_compromise_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived under Kádár\'s goulash communism — relative prosperity in exchange for political silence, 1963–88',
    intent: 'year_texture',
    notes: 'Set by hun_kadar_goulash.',
  },

  hungary_1989_border_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed Hungary cutting the Austrian border wire in May 1989 — the act that triggered the Eastern Bloc dominoes',
    intent: 'year_texture',
    notes: 'Set by hun_border_1989.',
  },

  orban_era_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Living through Orbán\'s democratic backsliding from 2010 — media capture, constitutional rewrite, illiberal democracy',
    intent: 'year_texture',
    notes: 'Set by hun_orban_era.',
  },

  prague_spring_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 1968 Prague Spring and Soviet invasion — the eight months and the specific silence that followed',
    intent: 'year_texture',
    notes: 'Set by worldEvent prague_spring_1968. Year texture in buildYearTexture.',
  },

  normalization_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through Czechoslovak normalization 1969–89 — 20 years of enforced conformity, kitchen opinions, signed self-criticisms',
    intent: 'both',
    notes: 'Set by cze_normalization. Follow-through: ft19_normalization_late.',
  },

  charter_77_generation: {
    weight: 'major',
    category: 'political',
    description: 'Signed Charter 77, passed it along, or was directly shaped by its existence and the risk attached to it',
    intent: 'both',
    notes: 'Set by cze_charter_77. Follow-through: ft19_charter_late for signatories.',
  },

  velvet_revolution_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed the Velvet Revolution November 1989 — the key-jingling, the twenty-one days, the speed of it',
    intent: 'year_texture',
    notes: 'Set by cze_velvet_revolution. Follow-through: ft19_velvet_late.',
  },

  // ─── CZECH REPUBLIC DEPTH ─────────────────────────────────────────────────────

  cze_communist_takeover_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed the February 1948 Communist coup — the "Victorious February," Masaryk\'s death, the end of Czechoslovak democracy.',
    intent: 'event',
    notes: 'Set by cze_victorious_february_1948. Follow-through: ft40_february_48_late.',
  },

  cze_stalinist_terror_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the Stalinist show trials in Czechoslovakia — the Slánský trial 1952, antisemitic charges, eleven hanged.',
    intent: 'event',
    notes: 'Set by cze_slansky_trial. Follow-through: ft40_slansky_rehabilitation.',
  },

  cze_prague_spring_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the Prague Spring 1968 — the Dubček reform period, the seven months of something that felt like it would last.',
    intent: 'both',
    notes: 'Set by cze_prague_spring. Year texture + ft40_prague_spring_late.',
  },

  cze_invasion_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Present for the Warsaw Pact invasion of August 20, 1968 — 500,000 troops, 2,000 tanks, from five allied countries.',
    intent: 'both',
    notes: 'Set by cze_invasion_august_1968. Year texture + ft40_invasion_late.',
  },

  cze_emigrant_1968: {
    weight: 'major',
    category: 'geographic',
    description: 'Left Czechoslovakia after the August 1968 invasion — part of the 300,000 who emigrated while borders were briefly open.',
    intent: 'event',
    notes: 'Set by cze_emigration_1968 (emigrate choice). Follow-through: ft40_emigrant_68_late.',
  },

  cze_stayer_1968: {
    weight: 'moderate',
    category: 'geographic',
    description: 'Stayed in Czechoslovakia after August 1968 — chose to remain through the normalization years.',
    intent: 'year_texture',
    notes: 'Set by cze_emigration_1968 (stay choice). Year texture block.',
  },

  cze_havel_generation: {
    weight: 'major',
    category: 'political',
    description: 'Witnessed Václav Havel\'s presidency beginning January 1990 — the playwright-dissident who went from prison to president in weeks.',
    intent: 'event',
    notes: 'Set by cze_havel_president. Follow-through: ft40_havel_late.',
  },

  cze_velvet_divorce_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the Velvet Divorce January 1, 1993 — Czechoslovakia splitting peacefully into Czech Republic and Slovakia without a referendum.',
    intent: 'event',
    notes: 'Set by cze_velvet_divorce. Follow-through: ft40_velvet_divorce_late.',
  },

  cze_eu_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through Czech EU accession May 1, 2004 — gaining the right to live and work across Europe, the Schengen opening.',
    intent: 'year_texture',
    notes: 'Set by cze_eu_accession_2004. Year texture block.',
  },

  // ── DENMARK ───────────────────────────────────────────────────────────────

  den_occupation_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Danish person who lived through the German occupation 1940–45 — the "model protectorate", the government that stayed, the complicated question of accommodation.',
    intent: 'event',
    notes: 'Set by den_wwii_occupation. Follow-through: ft45_den_occupation_late.',
  },

  den_rescue_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed or participated in the October 1943 rescue of Danish Jews — fishing boats across the Øresund, 7,000 people ferried to Sweden.',
    intent: 'event',
    notes: 'Set by den_jewish_rescue. Follow-through in den_rescue_late event (self-contained within events_denmark.js).',
  },

  den_liberation_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed Danish liberation May 5, 1945 — the lights in windows, then the retsopgøret, the legal reckoning.',
    intent: 'event',
    notes: 'Set by den_liberation_1945. Follow-through: ft45_den_liberation_late.',
  },

  den_cartoon_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the Jyllands-Posten cartoon crisis 2005–06 — the twelve cartoons, the diplomatic escalation, the burning embassies, the Danish self-image under examination.',
    intent: 'event',
    notes: 'Set by den_cartoon_crisis. Follow-through: ft45_den_cartoon_late.',
  },

  // ── NORWAY ────────────────────────────────────────────────────────────────

  nor_occupation_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Norwegian who lived through the German occupation 1940–45 — the Quisling government, the NS, the resistance, the lowered voices.',
    intent: 'event',
    notes: 'Set by nor_wwii_occupation. Follow-through: ft43_occupation_late.',
  },

  nor_liberation_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed Norwegian liberation May 8, 1945 — the flags that had been hidden, the king returning from London on June 7.',
    intent: 'event',
    notes: 'Set by nor_liberation_1945. Follow-through: ft43_liberation_accounting.',
  },

  nor_oil_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Norwegian who lived through the oil discovery and wealth accumulation from 1969 onward — the slow transformation of Norway into the world\'s largest per-capita sovereign wealth fund.',
    intent: 'both',
    notes: 'Set by nor_oil_discovery. Year texture block and follow-through ft43_oil_fund_reckoning.',
  },

  nor_eu_no_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Norwegian who participated in or was shaped by the 1972 or 1994 EU referendums — both times the country chose not to join.',
    intent: 'event',
    notes: 'Set by nor_eu_referendums. Follow-through: ft43_eu_no_late.',
  },

  nor_july22_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Norwegian alive on July 22, 2011 — the bomb in Oslo and the massacre at Utøya. Seventy-seven dead. The name of the island entered the language as a wound.',
    intent: 'event',
    notes: 'Set by nor_july22. Follow-through: ft43_july22_late.',
  },

  // ── SWEDEN ────────────────────────────────────────────────────────────────

  swe_wwii_neutral_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Swedish adult who lived through the postwar moral reckoning about neutrality — the transit routes, the iron sales, the absent occupation that left a different kind of question.',
    intent: 'event',
    notes: 'Set by swe_wwii_reckoning. Follow-through in ft41.',
  },

  swe_palme_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Knew exactly where they were when Olof Palme was shot on Sveavägen at 23:21 on February 28, 1986 — the thirty-four-year open wound in the Swedish national psyche.',
    intent: 'both',
    notes: 'Set by swe_palme_assassination. Year texture and follow-through in ft41.',
  },

  swe_welfare_retrenchment_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the 1992 Swedish banking and currency crisis — interest rates to 500%, unemployment tripling, welfare state cuts that restructured the meaning of folkhem.',
    intent: 'event',
    notes: 'Set by swe_1992_crisis. Follow-through in ft41.',
  },

  swe_immigration_era_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the transformation of Sweden into one of the world\'s most per-capita-generous refugee-receiving countries — and the collision of that self-image with integration limits.',
    intent: 'year_texture',
    notes: 'Set by swe_immigration_question. Year texture block.',
  },

  swe_democrats_era: {
    weight: 'moderate',
    category: 'political',
    description: 'Watched the Sweden Democrats rise from 5.7% (2010) to 20% (2022), from the margins to government influence — with a founding history that the party has distanced itself from but not erased.',
    intent: 'event',
    notes: 'Set by swe_democrats_rise. Follow-through in ft41.',
  },

  // ── FINLAND ───────────────────────────────────────────────────────────────

  no_1942_witness: {
    weight: 'major',
    category: 'historical',
    description: 'Norwegian who was alive during the November 1942 deportation of Jews — 773 sent to Auschwitz on the SS Donau, carried out by Norwegian police under NS orders. Thirty-four survived.',
    intent: 'none',
    notes: 'Set by no_1942_deportation.',
  },

  fin_continuation_war_gen: {
    weight: 'major',
    category: 'historical',
    description: 'Finnish adult who lived through the Continuation War 1941–44 — the *jatkosota*, fought alongside Germany to recover Karelia. Followed by a separate peace and 300 million USD in reparations.',
    intent: 'none',
    notes: 'Set by fin_continuation_war.',
  },

  fin_finlandized_gen: {
    weight: 'major',
    category: 'political',
    description: 'Finnish adult who lived through Finlandization 1948–91 — the strategic self-censorship and careful accommodation of Soviet preferences that kept Finland free from occupation at a cost not said aloud.',
    intent: 'event',
    notes: 'Set by fin_finlandization. Checked by fin_nato_2023 (conditional bonus text).',
  },

  fin_nato_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Finnish adult alive when Finland joined NATO on April 4, 2023 — ending 75 years of military non-alignment with a 188-8 parliamentary vote.',
    intent: 'none',
    notes: 'Set by fin_nato_2023.',
  },

  fin_swedish_minority: {
    weight: 'moderate',
    category: 'identity',
    description: 'Swedish-speaking Finn (finlandssvensk) — part of the 5% constitutional minority with Swedish-medium institutions, navigating two languages and the question of which one they are.',
    intent: 'none',
    notes: 'Set by fin_swedish_speaker.',
  },

  fin_reconstruction_gen: {
    weight: 'moderate',
    category: 'historical',
    description: 'Finnish young adult who worked in or alongside the reparations-driven industrial build-out 1945–60 — the industrialisation of Finland as an accident of defeat.',
    intent: 'none',
    notes: 'Set by fin_reparations_industry.',
  },

  baltic_russification_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Educated under Soviet Russification in Baltic states — Russian as language of advancement, native language as kitchen culture',
    intent: 'year_texture',
    notes: 'Set by balt_soviet_school.',
  },

  baltic_song_resistance: {
    weight: 'moderate',
    category: 'political',
    description: 'Attended Baltic song festivals as national identity resistance — the space where the occupation could not fully reach',
    intent: 'year_texture',
    notes: 'Set by balt_song_festival.',
  },

  baltic_january_1991: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed or participated in the January 1991 events — Soviet troops at the Vilnius TV Tower or Riga barricades, 14+ killed',
    intent: 'year_texture',
    notes: 'Set by balt_january_1991. Follow-through: ft20_january_1991_late.',
  },

  tito_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Old enough to remember Tito\'s death (May 4, 1980) and feel the mourning — and the unasked question',
    intent: 'year_texture',
    notes: 'Set by eur_ser_tito_death. Marks end of non-aligned Yugoslav prestige era.',
  },

  yugoslav_dissolution_lived: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed Yugoslavia dissolve into successor states 1991–93 — identity category replaced by subcategory',
    intent: 'year_texture',
    notes: 'Set by eur_ser_yugoslav_identity (two branches: took new identity, or stayed Yugoslav).',
  },

  yugoslav_hyperinflation_lived: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 1993 Yugoslav hyperinflation (116 trillion percent — second worst in recorded history)',
    intent: 'year_texture',
    notes: 'Set by eur_ser_hyperinflation_1993. Deutschmark/cigarette parallel economy; salary spent same hour earned.',
  },

  serbian_democratic_transition: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed October 5, 2000 — the fall of Milošević and the DOS electoral revolution',
    intent: 'year_texture',
    notes: 'Set by eur_ser_milosevic_falls. Specific feeling of sudden absence after long resistance.',
  },

  april_9_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed or survived the April 9, 1989 Tbilisi massacre — Soviet troops killing 21 at the peaceful Rustaveli vigil',
    intent: 'year_texture',
    notes: 'Set by geo_april9_1989. Follow-through: ft21_april9_late.',
  },

  rose_revolution_georgia: {
    weight: 'moderate',
    category: 'historical',
    description: 'Participated in or witnessed the Georgian Rose Revolution, November 2003 — Shevardnadze\'s peaceful removal',
    intent: 'year_texture',
    notes: 'Set by geo_rose_revolution.',
  },

  eu_dream_georgia: {
    weight: 'moderate',
    category: 'political',
    description: 'Shaped by Georgia\'s EU integration aspiration — the dream, the protests, the Georgian Dream backslide 2024',
    intent: 'year_texture',
    notes: 'Set by geo_eu_dream.',
  },

  geo_1990s_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Survived the catastrophic Georgian 1990s — 70% economic collapse, 4-hour power days, warlords, mass emigration',
    intent: 'year_texture',
    notes: 'Set by geo_1990s_collapse.',
  },

  geo_saakashvili_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the Saakashvili reform era 2004–2012 — overnight police reform, anti-corruption, but also the 2007 crackdown',
    intent: 'year_texture',
    notes: 'Set by geo_saakashvili_era.',
  },

  dprk_juche_childhood: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up in North Korea with Juche indoctrination from before literacy — the portrait above the blackboard, the political primer before the reading primer',
    intent: 'year_texture',
    notes: 'Set by dprk_juche_childhood.',
  },

  dprk_criticism_session: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived the weekly saenghwal chonghwa self-criticism sessions — the calibration of how harshly to criticize, neither too lenient nor too harsh',
    intent: 'year_texture',
    notes: 'Set by dprk_criticism_session.',
  },

  uru_tupamaro_era: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the Tupamaro urban guerrilla era in Uruguay 1965-72 — bank robberies distributed to poor, political kidnappings of corrupt officials',
    intent: 'year_texture',
    notes: 'Set by uru_tupamaro.',
  },

  uru_tupamaro_adjacent: {
    weight: 'major',
    category: 'political',
    description: 'Was on the edges of the Tupamaro movement — distributing materials, the distinction between involvement and sympathy mattering less after 1973',
    intent: 'year_texture',
    notes: 'Set by uru_tupamaro choice involved.',
  },

  uru_coup_1973: {
    weight: 'major',
    category: 'historical',
    description: 'Lived the Bordaberry coup June 27, 1973 — parliament doors closed, Uruguay\'s welfare state dictatorship begins',
    intent: 'year_texture',
    notes: 'Set by uru_bordaberry_coup. Follow-through: uru_dictatorship_lived.',
  },

  uru_democracy_restored: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the 1985 Uruguayan return to democracy — Mujica walking out of prison, parliament reopening, exiles returning',
    intent: 'year_texture',
    notes: 'Set by uru_return_democracy.',
  },

  uru_mujica_era: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived Mujica\'s presidency 2010-15 — the farmhouse, the Beetle, 90% salary donated, marijuana + abortion + same-sex marriage legalized',
    intent: 'year_texture',
    notes: 'Set by uru_mujica_presidency.',
  },

  pry_stroessner_era: {
    weight: 'major',
    category: 'historical',
    description: 'Navigated Stroessner\'s 35-year dictatorship in Paraguay 1954-1989 — the Colorado Party membership card, the choice of inside or outside the system',
    intent: 'year_texture',
    notes: 'Set by pry_stroessner.',
  },

  pry_colorado_refused: {
    weight: 'moderate',
    category: 'political',
    description: 'Refused to join the Colorado Party under Stroessner — chose the narrowness of outside the patronage system',
    intent: 'year_texture',
    notes: 'Set by pry_stroessner choice outside.',
  },

  pry_triple_alliance_memory: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up with the Triple Alliance War in living cultural memory — 60-70% of population killed 1864-70, the grief and pride that share the same feeling',
    intent: 'year_texture',
    notes: 'Set by pry_triple_alliance_memory.',
  },

  pry_archive_terror: {
    weight: 'major',
    category: 'historical',
    description: 'Alive for the 1992 discovery of the Archive of Terror in Asunción — four tonnes of Operation Condor documents, six countries coordinated',
    intent: 'year_texture',
    notes: 'Set by pry_archive_1992.',
  },

  ecu_oil_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived Ecuador\'s oil era from the 1970s — the Oriente as a petroleum zone, Texaco contamination, what the Amazon is for',
    intent: 'year_texture',
    notes: 'Set by ecu_oil_oriente.',
  },

  ecu_dollarization_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived Ecuador\'s 2000 dollarization — the sucre losing 75% of value, banks closed, savings wiped out, waking up in a dollar economy',
    intent: 'year_texture',
    notes: 'Set by ecu_dollarization.',
  },

  ecu_yasuni_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Watched the Yasuní-ITT Initiative from proposal to failure — Ecuador offered to leave oil in the ground; the world declined',
    intent: 'year_texture',
    notes: 'Set by ecu_yasuni.',
  },

  ecu_conaie_2019: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the 2019 CONAIE uprising — indigenous movement shutting down Quito for two weeks over fuel subsidies, government forced to negotiate',
    intent: 'year_texture',
    notes: 'Set by ecu_conaie_uprising.',
  },

  bel_partisan_memory: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up with living memory of WWII partisan war in Belarus — a third of the population dead, every family with a grave',
    intent: 'year_texture',
    notes: 'Set by bel_partisan_memory.',
  },

  bel_independence_1991: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived Belarus\'s sudden independence — the Belavezha Accords hunting lodge, the country emotionally unprepared for it',
    intent: 'year_texture',
    notes: 'Set by bel_independence_1991.',
  },

  bel_lukashenko_era: {
    weight: 'major',
    category: 'political',
    description: 'Voted for or lived through Lukashenko\'s 1994 election — the collective farm director who came to stay',
    intent: 'year_texture',
    notes: 'Set by bel_lukashenko_1994.',
  },

  bel_state_discipline: {
    weight: 'moderate',
    category: 'political',
    description: 'Learned the internal calibration of what not to say in a Lukashenko-era state enterprise — not fear, information',
    intent: 'year_texture',
    notes: 'Set by bel_state_discipline.',
  },

  bel_2020_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Alive for the 2020 Belarusian protests — Tsikhanouskaya, the Sunday marches, the women human chains, the tractor factory strike',
    intent: 'year_texture',
    notes: 'Set by bel_2020_protests. Follow-through: bel_crackdown.',
  },

  bel_2020_marcher: {
    weight: 'major',
    category: 'political',
    description: 'Marched every Sunday in Minsk August-November 2020 — 200,000 people, that silent, then that loud',
    intent: 'year_texture',
    notes: 'Set by bel_2020_protests choice marched.',
  },

  arm_dark_winter_survivor: {
    weight: 'major',
    category: 'historical',
    description: 'Survived the Armenian blockade winters 1992-1997 — one hour of electricity per day, unheated apartments',
    intent: 'year_texture',
    notes: 'Set by arm_dark_winter. Follow-through: ft22_arm_dark_winter_echo.',
  },

  arm_karabakh_veteran_1: {
    weight: 'major',
    category: 'military',
    description: 'Served in the First Karabakh War 1991-1994 — the victory that became the wound of 2020',
    intent: 'both',
    notes: 'Set by arm_karabakh_veteran. Follow-through: ft22_arm_karabakh_veteran_late.',
  },

  arm_velvet_revolution: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed or participated in the 2018 Armenian Velvet Revolution — Pashinyan walking from Gyumri to Yerevan',
    intent: 'year_texture',
    notes: 'Set by arm_velvet_2018. Follow-through: ft22_arm_velvet_reckoning.',
  },

  arm_velvet_participant: {
    weight: 'moderate',
    category: 'political',
    description: 'Marched in the 2018 Armenian Velvet Revolution; stood in Republic Square',
    intent: 'year_texture',
    notes: 'Set by arm_velvet_2018 choice marched.',
  },

  azr_black_january_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed or survived Black January 1990 — Soviet army killing 131 Baku civilians in pro-independence crackdown',
    intent: 'year_texture',
    notes: 'Set by azr_black_january. World event possible.',
  },

  azr_baku_boom: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through Baku\'s oil-funded transformation 2005-2015 — glass towers, Formula 1, Eurovision, IDPs still in containers',
    intent: 'year_texture',
    notes: 'Set by azr_baku_boom.',
  },

  azr_press_silence: {
    weight: 'moderate',
    category: 'political',
    description: 'Internalized the habits of self-censorship under Aliyev\'s media crackdowns — the names you don\'t search, the texts you don\'t send',
    intent: 'year_texture',
    notes: 'Set by azr_press_freedom.',
  },

  azr_war_victory_2020: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through Azerbaijan\'s 2020 44-day war victory — the joy complicated by thirty years of grief and the price of winning',
    intent: 'year_texture',
    notes: 'Set by azr_war_2020.',
  },

  azr_karabakh_return_2023: {
    weight: 'major',
    category: 'historical',
    description: 'Returned to Karabakh after the 2023 Azerbaijani offensive — the house, the mulberry tree, what was there and what was not',
    intent: 'year_texture',
    notes: 'Set by azr_karabakh_return_2023. Follow-through: ft22_azr_idp_return.',
  },

  taiwan_228_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Survived or was shaped by the February 28 Massacre 1947 — KMT troops killing 18,000-30,000 Taiwanese civilians',
    intent: 'year_texture',
    notes: 'Set by twn_228_massacre. Follow-through in buildYearTexture.',
  },

  martial_law_taiwan: {
    weight: 'major',
    category: 'historical',
    description: 'Lived under Taiwan\'s martial law 1949-87 — 38 years, the longest in modern history; white terror, political prisoners',
    intent: 'year_texture',
    notes: 'Set by twn_white_terror.',
  },

  taiwan_democratic_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed Taiwan\'s democratization — the end of martial law 1987, first direct presidential election 1996',
    intent: 'year_texture',
    notes: 'Set by twn_democratization.',
  },

  taiwan_cross_strait_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Living with the cross-strait tension as permanent background — the missile drills, TSMC strategy, Ukraine-as-Taiwan analogy',
    intent: 'year_texture',
    notes: 'Set by twn_cross_strait_tension.',
  },

  may13_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed or was shaped by the May 13, 1969 ethnic riots in Malaysia — hundreds killed, 61-year UMNO era shaped by the trauma',
    intent: 'year_texture',
    notes: 'Set by mys_may13_1969.',
  },

  nep_generation_malaysia: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived under Malaysia\'s New Economic Policy — Bumiputera quotas, affirmative action, the racial structuring of opportunity',
    intent: 'year_texture',
    notes: 'Set by mys_nep_experience. Affects Malay, Chinese, and Indian characters differently.',
  },

  reformasi_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Shaped by the 1998 reformasi movement — Anwar Ibrahim\'s arrest, the first sustained democracy movement against UMNO',
    intent: 'year_texture',
    notes: 'Set by mys_reformasi.',
  },

  ge14_generation_malaysia: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed Malaysia\'s GE14 2018 — the first opposition victory in 61 years; UMNO\'s fall, Pakatan Harapan\'s collapse',
    intent: 'year_texture',
    notes: 'Set by mys_ge14_2018.',
  },

  sg_founding_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Was a young adult when Singapore was expelled from Malaysia in 1965 — became a citizen of a country nobody planned',
    intent: 'year_texture',
    notes: 'Set by sg_separation_1965.',
  },

  sg_kampung_generation: {
    weight: 'moderate',
    category: 'cultural',
    description: 'Childhood home was a kampung (village) cleared for HDB blocks — the pre-urbanization way of life replaced by high-rise public housing',
    intent: 'year_texture',
    notes: 'Set by sg_kampung_clearing.',
  },

  sg_dialect_lost: {
    weight: 'moderate',
    category: 'cultural',
    description: 'Chinese Singaporean whose Hokkien, Teochew, or Cantonese dialect was suppressed by the Speak Mandarin Campaign — grandmother\'s language became inaccessible',
    intent: 'year_texture',
    notes: 'Set by sg_speak_mandarin (choice 1). The cultural loss of dialects within a generation.',
  },

  sg_dialect_keeper: {
    weight: 'minor',
    category: 'cultural',
    description: 'Chinese Singaporean who maintained their ancestral dialect despite the Speak Mandarin Campaign',
    intent: 'event',
    notes: 'Set by sg_speak_mandarin (choice 2).',
  },

  sg_ns_served: {
    weight: 'moderate',
    category: 'military',
    description: 'Completed Singapore National Service — the 2-year rite of passage for all male citizens',
    intent: 'year_texture',
    notes: 'Set by sg_national_service. Universal male experience in Singapore.',
  },

  sg_lky_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Was alive and adult when Lee Kuan Yew died in 2015 — the man who built Singapore is gone',
    intent: 'year_texture',
    notes: 'Set by sg_lky_death_2015.',
  },

  sg_independence_witness: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed Singapore\'s expulsion from Malaysia in August 1965 — became part of an unplanned nation',
    intent: 'event',
    notes: 'Set by singapore_independence_1965 world event.',
  },

  sg_lky_mourning_witness: {
    weight: 'minor',
    category: 'historical',
    description: 'Was in Singapore when Lee Kuan Yew died in 2015 — witnessed the national mourning',
    intent: 'event',
    notes: 'Set by lee_kuan_yew_death_2015 world event.',
  },

  benazir_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Pakistani shaped by Benazir Bhutto\'s assassination on December 27, 2007 — the first female prime minister of a Muslim-majority country, killed at a Rawalpindi rally.',
    intent: 'year_texture',
    notes: 'Set by pak_benazir_assassination_2007.',
  },

  blasphemy_law_era: {
    weight: 'major',
    category: 'political',
    description: 'Pakistani shaped by the blasphemy accusation architecture — the crowd that assembles before the court, Asia Bibi, the teacher who cannot go home.',
    intent: 'year_texture',
    notes: 'Set by pak_blasphemy_fear.',
  },

  spanish_flu_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 1918-20 Spanish flu pandemic — the second wave, the lung deaths, the suppressed funerals',
    intent: 'year_texture',
    notes: 'Set by spanish_flu_1918 world event. Era-defining mortality experience; precedes any modern public health infrastructure.',
  },

  independence_disillusionment: {
    weight: 'major',
    category: 'historical',
    description: 'Came of age in a newly independent nation whose post-colonial promise was visibly narrowing by the 1970s',
    intent: 'year_texture',
    notes: 'Set by decolonisation_disillusionment_1970s world event. Affects subsaharan/developing_urban/developing_unstable archetypes, ages 15+.',
  },

  anpo_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Participated in the 1960 Anpo protests against the US-Japan security treaty — the largest protest in postwar Japanese history, and its aftermath of disillusionment.',
    intent: 'year_texture',
    notes: 'Set by ca2_japan_anpo_protests.',
  },

  lost_decade_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through Japan\'s Lost Decade (1991-2001) — the Nikkei at 16,000, the permanent employment that became temporary, the asset values that never returned.',
    intent: 'year_texture',
    notes: 'Set by ca2_japan_bubble_collapse.',
  },

  fukushima_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Shaped by the Fukushima Daiichi nuclear disaster — the hydrogen explosions, the exclusion zone, the reckoning about who bore the risk of an energy decision made decades earlier.',
    intent: 'year_texture',
    notes: 'Set by ca2_japan_tohoku_2011 and ca2_japan_nuclear_reckoning.',
  },

  anti_nuclear_generation: {
    weight: 'minor',
    category: 'political',
    description: 'Changed perspective on nuclear energy after Fukushima — not to fear but to the specific understanding that risk is never distributed the same as benefit.',
    intent: 'none',
    notes: 'Set by ca2_japan_nuclear_reckoning (changed-perspective choice). No downstream event needed.',
  },

  june_struggle_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the June 1987 democratic struggle — Lee Han-yeol, office workers in streets, direct elections won',
    intent: 'year_texture',
    notes: 'Set by korea_democracy_1987.',
  },

  korean_imf_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 1997-98 IMF crisis — won collapse, mass layoffs, gold donation drives, chaebol restructuring',
    intent: 'year_texture',
    notes: 'Set by korea_imf_crisis_1997. Two branches: laid off, or survived.',
  },

  hallyu_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived to see Korean cultural exports (drama, music) become a global force — hallyu wave 2000s-2010s',
    intent: 'year_texture',
    notes: 'Set by korea_hallyu_2000s.',
  },

  nasser_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up during the Nasser era — Suez nationalization, pan-Arab nationalism, radio speeches that stopped rooms',
    intent: 'year_texture',
    notes: 'Set by egy_nasser_dream. Egypt 1956-67.',
  },

  // ── EGYPT DEPTH FLAGS (events_egypt_depth.js) ─────────────────────────────

  october_war_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Present for the October 1973 War — the crossing of the Suez Canal, the Bar-Lev Line breached, the real advance that answered 1967, the ceasefire that ended it under US pressure.',
    intent: 'year_texture',
    notes: 'Set by egy_october_war_1973 (both choices). Year texture: the crossing as national memory. Follow-through: egy_october_war_late_echo (late_life).',
  },

  egy_camp_david_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through Sadat\'s peace with Israel — the Camp David Accords 1978, Egypt\'s expulsion from the Arab League, Sadat\'s assassination 1981, the cold peace that followed.',
    intent: 'event',
    notes: 'Set by egy_camp_david_1978 (both choices). Follow-through: egy_camp_david_late_life (late_life reckoning on the peace and its price).',
  },

  egy_sisi_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through Sisi\'s 2013 counter-revolution — Morsi removed, the Rabaa massacre of 800–2,600 Brotherhood protesters, the emergency law restored, the Tahrir promise closed.',
    intent: 'year_texture',
    notes: 'Set by egy_sisi_2013 (both choices). Year texture: post-Arab Spring Egypt under the counter-revolution.',
  },

  egy_pound_crisis_2016: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived through the November 2016 Egyptian pound flotation — currency halved overnight as part of IMF conditions, prices spiked, the immediate material impact.',
    intent: 'none',
    notes: 'Set by egy_pound_flotation_2016. Terminal flag — the economic shock is its own event with no specific downstream.',
  },

  infitah_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age during Sadat\'s infitah (open door) — foreign goods, class stratification, not everyone on the same side',
    intent: 'year_texture',
    notes: 'Set by egy_sadat_infitah.',
  },

  egypt_bread_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the 1977 bread riots — intifadat al-haita, the government backing down, the fact of it',
    intent: 'year_texture',
    notes: 'Set by egy_bread_riots_1977.',
  },

  tahrir_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed or participated in the January-February 2011 Tahrir Square revolution — 18 days, Mubarak gone',
    intent: 'year_texture',
    notes: 'Set by egy_tahrir_2011. Two branches: in Tahrir, or outside it.',
  },

  sadat_assassination_witness: {
    weight: 'moderate',
    category: 'historical',
    description: 'Present in Egypt the day Sadat was assassinated (October 6, 1981) — witnessed the moment that delivered Mubarak and thirty years of emergency law',
    intent: 'event',
    notes: 'Set by we_sadat_assassination_1981 world event. Follow-through: ft44_sadat_late.',
  },

  emergency_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 1975-77 Emergency — opposition arrests, press censorship, sterilization programmes, the parenthesis in Indian democracy',
    intent: 'year_texture',
    notes: 'Set by ind_emergency_1975. Two branches: adapted, or knew someone detained.',
  },

  babri_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed the December 6, 1992 demolition of the Babri Masjid and subsequent riots — the constitutional fault line exposed',
    intent: 'year_texture',
    notes: 'Set by ind_babri_masjid_1992.',
  },

  liberalization_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age during the 1991 Indian economic liberalization — licence raj dismantled, IT boom, new class formations',
    intent: 'year_texture',
    notes: 'Set by ind_liberalization_1991. Two branches: entered new economy, or left behind.',
  },

  gujarat_2002_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 2002 Gujarat violence — organized communal killing, state government accountability disputed for decades',
    intent: 'year_texture',
    notes: 'Set by ind_gujarat_2002.',
  },

  demonetization_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the November 2016 demonetization — 86% of currency withdrawn overnight, weeks of queues',
    intent: 'year_texture',
    notes: 'Set by ind_demonetization_2016. Two branches: had formal banking, or had cash savings.',
  },

  caa_protest_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Shaped by the 2019-20 CAA protests — the Citizenship Amendment Act, Shaheen Bagh, the hundred-day sit-in, the Delhi riots of February 2020.',
    intent: 'year_texture',
    notes: 'Set by ind_caa_protests_2019.',
  },

  farmers_protest_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Witnessed the 2020-21 farmers\' protests at Delhi borders — thirteen months on the highways at Singhu, Tikri, Ghazipur, then the repeal of all three farm laws.',
    intent: 'year_texture',
    notes: 'Set by ind_farmers_protest_2020.',
  },

  october_crisis_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived through the October Crisis 1970 — FLQ kidnappings, War Measures Act, nearly 500 detained without charge. Canada\'s only peacetime suspension of civil liberties.',
    intent: 'both',
    notes: 'Set by can_october_crisis_1970.',
  },

  charter_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Came of age after the Charter of Rights and Freedoms 1982 — rights constitutionalized, Quebec absent from the signing, section 15 equality provisions.',
    intent: 'year_texture',
    notes: 'Set by can_charter_1982.',
  },

  quebec_question_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the ongoing Quebec constitutional question — Meech Lake, the 1995 referendum, the 54,000-vote margin.',
    intent: 'year_texture',
    notes: 'Set by can_charter_1982 and can_quebec_referendum_1995.',
  },

  meech_lake_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Watched the Meech Lake Accord fail in 1990 — Elijah Harper\'s eagle feather, the Bloc Québécois forming in the aftermath.',
    intent: 'year_texture',
    notes: 'Set by can_meech_lake_1990 (auto-resolve).',
  },

  referendum_night_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Watched the 1995 Quebec referendum — the night of 50.58% No, the 54,000-vote margin, Canada almost becoming two countries.',
    intent: 'both',
    notes: 'Set by can_quebec_referendum_1995.',
  },

  trc_witness_generation: {
    weight: 'major',
    category: 'political',
    description: 'Non-Indigenous Canadian who engaged with the Truth and Reconciliation Commission\'s 94 Calls to Action — the graves, the apology, the ongoing accounting.',
    intent: 'both',
    notes: 'Set by can_trc_calls_to_action_2015.',
  },

  aus_vietnam_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age during Australian Vietnam conscription — watched men the same age go or not go by random draw.',
    intent: 'year_texture',
    notes: 'Set by aus_vietnam_conscription (marble-not-drawn choice).',
  },

  dismissal_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived through The Dismissal — the Governor-General\'s termination of Whitlam on Remembrance Day 1975, reserve powers never used before or since.',
    intent: 'both',
    notes: 'Set by aus_dismissal_1975.',
  },

  port_arthur_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through Port Arthur 1996 and the subsequent gun buyback — Australia\'s defining moment on gun control, 650,000 weapons destroyed.',
    intent: 'both',
    notes: 'Set by aus_port_arthur_1996.',
  },

  pacific_solution_era: {
    weight: 'major',
    category: 'political',
    description: 'Lived through the Tampa affair and Pacific Solution — offshore detention, the phrase "we will decide who comes," the human rights record it produced.',
    intent: 'both',
    notes: 'Set by aus_tampa_2001.',
  },

  ssm_australia_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the same-sex marriage postal survey 2017 — the months of being debated, the 61.6% result, the law that followed.',
    intent: 'year_texture',
    notes: 'Set by aus_ssm_postal_survey_2017.',
  },

  aus_mabo_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'An adult Australian during the Mabo decision 1992 — terra nullius overturned, the culture war that followed, the black armband history debate',
    intent: 'year_texture',
    notes: 'Set by aus_mabo_1992.',
  },

  aus_sorry_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Alive for the Rudd apology of February 2008 — "We apologise" to the Stolen Generations, said in Parliament after eleven years of refusal',
    intent: 'year_texture',
    notes: 'Set by aus_rudd_apology_2008.',
  },

  great_migration_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Moved North as part of the Great Migration — the factories, the de facto segregation, the city built in a country that was different from the South and not different enough.',
    intent: 'both',
    notes: 'Set by usa_great_migration (moved choice).',
  },

  civil_rights_movement_participant: {
    weight: 'major',
    category: 'political',
    description: 'Participated in the civil rights movement — the marches, the sit-ins, the boycotts, the registrations. Knew what the participation cost.',
    intent: 'both',
    notes: 'Set by usa_civil_rights_movement (participant choice).',
  },

  king_assassination_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the assassination of Martin Luther King Jr. on April 4, 1968 — the grief, the fires, the end of one phase.',
    intent: 'both',
    notes: 'Set by usa_king_assassination_1968.',
  },

  vietnam_refused: {
    weight: 'major',
    category: 'political',
    description: 'Refused the Vietnam draft — Canada, conscientious objection, underground. Pardoned in 1977. The weight is not administrative.',
    intent: 'both',
    notes: 'Set by usa_vietnam_draft_decision (refused choice).',
  },

  rustbelt_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through Rust Belt deindustrialisation — the plant closing notice, the severance you needed a lawyer to read, the town that was different after.',
    intent: 'both',
    notes: 'Set by usa_rustbelt_factory.',
  },

  war_on_drugs_era: {
    weight: 'major',
    category: 'political',
    description: 'Lived through the War on Drugs as a Black or Hispanic man — the stops, the mandatory minimums, the hundred-to-one sentencing disparity.',
    intent: 'both',
    notes: 'Set by usa_war_on_drugs.',
  },

  sept11_generation_us: {
    weight: 'major',
    category: 'historical',
    description: 'American who lived through 9/11 — the country that existed on September 10 did not return. The security lines arrived and did not leave.',
    intent: 'both',
    notes: 'Set by usa_9_11_experience. US-specific; post_9_11_world is the global version.',
  },

  post_9_11_world: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the post-9/11 global transformation — the airport security, the surveillance law, the wars, the changed public experience of civil liberties.',
    intent: 'year_texture',
    notes: 'Set by nine_eleven world event (global). All living adults post-2001.',
  },

  school_shooting_era: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up in post-Columbine America — the lockdown drills, ALICE protocol, the exits memorised, the question of what the backpack stops.',
    intent: 'both',
    notes: 'Set by usa_school_shooting_era. Auto-resolve event.',
  },

  jfk_assassination_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Shaped by the November 22, 1963 Kennedy assassination — Walter Cronkite removing his glasses, the oath on Air Force One, the stained dress, the question that remained open for sixty years.',
    intent: 'year_texture',
    notes: 'Set by usa_jfk_assassination_1963.',
  },

  watergate_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Shaped by Watergate — the Saturday Night Massacre, the eighteen and a half minutes, Nixon\'s resignation wave from the South Lawn, the specific accident by which the system worked.',
    intent: 'year_texture',
    notes: 'Set by usa_watergate_resignation_1974.',
  },

  miners_strike_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 1984-85 miners\' strike — the picket lines, Orgreave, the communities that were asking whether the pit would close and therefore whether the community would survive.',
    intent: 'year_texture',
    notes: 'Set by uk_miners_strike_1984 and the miners_strike world event.',
  },

  poll_tax_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the 1989-90 Community Charge (poll tax) — the flat levy, the non-payment campaign, Trafalgar Square, Thatcher\'s fall.',
    intent: 'year_texture',
    notes: 'Set by uk_poll_tax_1990.',
  },

  iraq_war_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'UK character shaped by the 2003 Iraq War — the million-person march, the dossier, the weapons that were not found, the inquiries that produced more questions.',
    intent: 'year_texture',
    notes: 'Set by uk_iraq_war_2003.',
  },

  brexit_generation: {
    weight: 'major',
    category: 'historical',
    description: 'UK character shaped by the June 2016 Brexit vote — 52/48, Cameron\'s resignation, the pound\'s fall, the years of negotiations.',
    intent: 'year_texture',
    notes: 'Set by uk_brexit_2016. Supplements the brexit_era world event flag.',
  },

  remain_voter: {
    weight: 'minor',
    category: 'political',
    description: 'Voted Remain in the 2016 Brexit referendum.',
    intent: 'none',
    notes: 'Set by uk_brexit_2016 (remain choice). No downstream event; texture only.',
  },

  leave_voter: {
    weight: 'minor',
    category: 'political',
    description: 'Voted Leave in the 2016 Brexit referendum.',
    intent: 'none',
    notes: 'Set by uk_brexit_2016 (leave choice). No downstream event; texture only.',
  },

  class_politics_formed: {
    weight: 'moderate',
    category: 'political',
    description: 'Had political consciousness formed by class experience — the miners\' strike, the deindustrialisation of communities, the gap between official economic discourse and lived experience.',
    intent: 'year_texture',
    notes: 'Set by uk_miners_strike_1984 (community choice) and similar events.',
  },

  falklands_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Shaped by the 1982 Falklands War — the Task Force sailing 8,000 miles south, the ship names arriving through the news, 255 British and 649 Argentine dead in seventy-four days.',
    intent: 'year_texture',
    notes: 'Set by uk_falklands_1982.',
  },

  scottish_independence_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Shaped by the September 2014 Scottish independence referendum — 84.6% turnout, 55.3% No, 44.7% Yes; the question returned after Brexit.',
    intent: 'year_texture',
    notes: 'Set by uk_scottish_independence_2014.',
  },

  scottish_yes_voter: {
    weight: 'minor',
    category: 'political',
    description: 'Voted Yes (or supported Yes) in the 2014 Scottish independence referendum.',
    intent: 'none',
    notes: 'Set by uk_scottish_independence_2014 (Yes choice). No downstream event; texture only.',
  },

  pope_visit_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through John Paul II\'s 1979 visit to Poland — the two million in Kraków, the thing the state did not know how to answer.',
    intent: 'both',
    notes: 'Set by pol_pope_john_paul_1978.',
  },

  solidarity_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived through Solidarity 1980-89 — the legalization, the ten million members, the hope, the martial law, the underground, and the Round Table.',
    intent: 'both',
    notes: 'Set by pol_solidarity_1980.',
  },

  solidarity_member: {
    weight: 'moderate',
    category: 'political',
    description: 'Actually joined Solidarity — was in the meeting, in the church, when the window opened and the air was extraordinary.',
    intent: 'year_texture',
    notes: 'Set by pol_solidarity_1980 (joined choice).',
  },

  martial_law_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through martial law Dec 1981 — the tanks, the phones cut, the internments, Solidarity declared illegal, Jaruzelski on television in his uniform.',
    intent: 'both',
    notes: 'Set by pol_martial_law_1981.',
  },

  underground_poland: {
    weight: 'major',
    category: 'political',
    description: 'Participated in the Polish underground during martial law — the bibuła, the samizdat, the church basements, the printing and distributing.',
    intent: 'both',
    notes: 'Set by pol_martial_law_1981 (underground choice).',
  },

  '1989_poland_generation': {
    weight: 'major',
    category: 'historical',
    description: 'Voted in the June 4, 1989 Polish elections — the first non-Communist PM in the Eastern Bloc, the same day as Tiananmen.',
    intent: 'both',
    notes: 'Set by pol_round_table_1989.',
  },

  smolensk_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Polish adult who lived through the April 2010 Smolensk crash — 96 officials killed including the President, the grief, and the political polarisation that followed.',
    intent: 'year_texture',
    notes: 'Set by pol_smolensk_2010. Both branches set this flag.',
  },

  smolensk_doubted: {
    weight: 'minor',
    category: 'political',
    description: 'Polish person who held private doubt about the official account of the Smolensk crash — the sequence (Katyń commemoration, Russian territory, Russian investigation) that didn\'t sit easily.',
    intent: 'none',
    notes: 'Set by pol_smolensk_2010 (doubt branch).',
  },

  nl_hunger_winter_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up with parents who survived the Hunger Winter of 1944–45 — 22,000 Dutch civilians starved; tulip bulbs eaten; food never wasted',
    intent: 'year_texture',
    notes: 'Set by nl_hunger_winter_memory. Generational trauma passed through parental behavior.',
  },

  nl_pillarization_generation: {
    weight: 'moderate',
    category: 'cultural',
    description: 'Grew up in the verzuiling system — organized into Catholic, Protestant, or Socialist pillar determining school, hospital, broadcaster, sports club',
    intent: 'year_texture',
    notes: 'Set by nl_verzuiling. Pillarization collapsed in 1960s–80s.',
  },

  nl_provo_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Participated in or was shaped by the Dutch Provo movement and squatters movement — Amsterdam\'s creative-disruptive radical tradition',
    intent: 'year_texture',
    notes: 'Set by nl_provo_youth (choice 1).',
  },

  nl_srebrenica_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Dutch citizen when Srebrenica happened in 1995 — Dutchbat standing by while 8,000 Muslim men and boys were executed; national shame',
    intent: 'year_texture',
    notes: 'Set by nl_srebrenica_1995.',
  },

  nl_fortuyn_witness: {
    weight: 'major',
    category: 'political',
    description: 'Was adult in the Netherlands in 2002 when Pim Fortuyn was assassinated — the cognitive dissonance of the country\'s first modern populist murder',
    intent: 'year_texture',
    notes: 'Set by nl_fortuyn_2002 (both choices). Fortuyn was gay, anti-Islam immigration, shot by an animal rights activist.',
  },

  nl_colonial_reckoning_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Dutch citizen during the reckoning with Dutch colonial history — the slavery apology (2022), the Indonesian colonial war acknowledgment',
    intent: 'event',
    notes: 'Set by nl_colonial_reckoning.',
  },

  nl_water_generation: {
    weight: 'minor',
    category: 'cultural',
    description: 'Grew up understanding that the Netherlands exists below sea level by constant collective effort — the Delta Works, the polders, the deal with the North Sea',
    intent: 'year_texture',
    notes: 'Set by nl_water_country.',
  },

  miracolo_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up during Italy\'s economic miracle 1955-68 — the Fiat 500, the refrigerator, the television, the GDP growth rate of five percent a year.',
    intent: 'year_texture',
    notes: 'Set by it_miracolo_economico.',
  },

  sessantotto_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived through the Italian 1968 and the Hot Autumn of 1969 — the factory occupations, the 150 million hours of strikes, the Statuto dei lavoratori.',
    intent: 'both',
    notes: 'Set by it_sessantotto_hot_autumn.',
  },

  anni_di_piombo_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the Years of Lead — Piazza Fontana, the Red Brigades, Aldo Moro, Bologna station. Political violence from right and left and state.',
    intent: 'both',
    notes: 'Set by it_anni_di_piombo.',
  },

  mani_pulite_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived through Mani Pulite 1992-94 — the end of the First Republic, the entire political class on trial, Craxi in Tunis, the DC disbanded.',
    intent: 'both',
    notes: 'Set by it_mani_pulite.',
  },

  berlusconi_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived through the Berlusconi era 1994-2011 — media empire plus political power, seventeen trials, three governments.',
    intent: 'both',
    notes: 'Set by it_berlusconi_era.',
  },

  media_democracy_concern: {
    weight: 'moderate',
    category: 'political',
    description: 'Concerned by the concentration of media power in the hands of politicians — the overlap that lasted twenty years in Italy.',
    intent: 'year_texture',
    notes: 'Set by it_berlusconi_era (concerned choice).',
  },

  ddr_generation: {
    weight: 'major',
    category: 'political',
    description: 'Grew up in East Germany — the FDJ blue shirt, the Trabant queue, the portraits in the school hall. 1989 arrived without preparation.',
    intent: 'both',
    notes: 'Set by ger_ddr_daily_life. ger_reunification_1990 has dynamic text for this flag.',
  },

  reunification_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived through German reunification 1990 — whether as liberation or as the end of the only country they knew.',
    intent: 'both',
    notes: 'Set by ger_reunification_1990.',
  },

  willkommenskultur_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Participated in the Willkommenskultur — the welcome of the 2015 refugee arrivals. The position later required defending.',
    intent: 'year_texture',
    notes: 'Set by ger_refugee_crisis_2015 (volunteer choice).',
  },

  german_migration_debate: {
    weight: 'moderate',
    category: 'political',
    description: 'Uncertain or resistant about the 2015 refugee crisis — concern shared with people whose concerns were different in kind.',
    intent: 'year_texture',
    notes: 'Set by ger_refugee_crisis_2015 (resistant choice).',
  },

  wirtschaftswunder_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age in the West German Wirtschaftswunder — the economic miracle of the 1950s, the Beetle, the Fresswelle, the rebuilding that moved fast past the question of what it was rebuilding from.',
    intent: 'year_texture',
    notes: 'Set by ger_wirtschaftswunder.',
  },

  stasi_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived under the East German Stasi — 100,000 employees and 200,000 informers for 16 million people; after 1989 you could request your file and learn who reported on you.',
    intent: 'year_texture',
    notes: 'Set by gdr_stasi_apparatus world event.',
  },

  trabant_owner: {
    weight: 'minor',
    category: 'cultural',
    description: 'Owned or waited 13 years for a Trabant — the East German car that became an ironic object after reunification.',
    intent: 'year_texture',
    notes: 'Set by we_trabant world event.',
  },

  algerian_war_conscientious: {
    weight: 'major',
    category: 'political',
    description: 'Refused or resisted orders in Algeria — conscientious objection with consequences. Carries both the cost and the knowledge of what was refused.',
    intent: 'both',
    notes: 'Set by fr_algerian_war_soldier (refused choice).',
  },

  gilets_jaunes_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through or participated in the gilets jaunes movement 2018–20 — the roundabout as political centre, the metropolitan/peripheral divide.',
    intent: 'year_texture',
    notes: 'Set by fr_yellow_vests_2018.',
  },

  mai_68_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Shaped by French May 1968 — the barricades in the Latin Quarter, ten million workers on strike, de Gaulle\'s Baden-Baden disappearance and June landslide, the reorganisation of French cultural life that the government\'s victory did not undo.',
    intent: 'year_texture',
    notes: 'Set by fr_mai_68.',
  },

  troubles_adjacent: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived in the Republic during the Troubles — not in the conflict, but not outside it either',
    intent: 'year_texture',
    notes: 'Set by ire_troubles_border.',
  },

  celtic_tiger_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the Celtic Tiger years — cranes, returning emigrants, house prices doubling, the feeling of wealth',
    intent: 'year_texture',
    notes: 'Set by ire_celtic_tiger. Two branches: bought in, or held back.',
  },

  irish_crash_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 2008-2013 Irish crash — bank guarantee, IMF, austerity, second emigration wave',
    intent: 'year_texture',
    notes: 'Set by ire_crash_2008. Two branches: lost job/house, or adjacent observer.',
  },

  irish_church_reckoning: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed the Irish Catholic Church institutional collapse — Ryan Report, Murphy Report, Magdalene laundries, industrial schools',
    intent: 'year_texture',
    notes: 'Set by ire_church_collapse.',
  },

  ire_famine_family_memory: {
    weight: 'major',
    category: 'historical',
    description: 'Irish character who grew up with direct or near-direct family memory of the Great Hunger 1845-52 — grandparent testimony, weight of *an Gorta Mór* in the house.',
    intent: 'none',
    notes: 'Set by ire_famine_shadow.',
  },

  ire_rising_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Irish character who came of age during or just after the Easter Rising 1916 and War of Independence — the executions that changed opinion, the treaty that split everything.',
    intent: 'none',
    notes: 'Set by ire_easter_rising.',
  },

  ire_civil_war_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Irish character whose family took a side in the 1922-23 Civil War — the Treaty vs Anti-Treaty wound that became Fianna Fáil vs Fine Gael for seventy years.',
    intent: 'none',
    notes: 'Set by ire_civil_war_wound (both choice branches).',
  },

  ire_emergency_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Irish adult who lived through the Emergency (Irish neutrality in WWII 1939-46) — turf instead of coal, the BBC heard in secret, 160,000 Irish volunteering despite official neutrality.',
    intent: 'none',
    notes: 'Set by ire_emergency.',
  },

  ire_industrial_school_survivor: {
    weight: 'major',
    category: 'historical',
    description: 'Was placed in or directly witnessed an Industrial School or Magdalene Laundry 1935-80 — the Church-run detention system for illegitimate, orphaned, or poor children.',
    intent: 'event',
    notes: 'Set by ire_industrial_school. Checked by ire_ryan_report (follow-through).',
  },

  ire_gaeltacht_gen: {
    weight: 'minor',
    category: 'identity',
    description: 'Irish character who navigated the compulsory Irish language system and the Gaeltacht — Irish as state requirement and as contested living culture.',
    intent: 'none',
    notes: 'Set by ire_gaeltacht.',
  },

  ire_equality_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed or participated in Ireland\'s 2015 marriage equality referendum — the first country to approve same-sex marriage by popular vote (62.1%).',
    intent: 'none',
    notes: 'Set by ire_marriage_equality.',
  },

  ire_repeal_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Female Irish character who witnessed the 2018 Repeal of the Eighth Amendment — abortion legalised after 35 years of twelve women a day crossing to England.',
    intent: 'none',
    notes: 'Set by ire_repeal_eighth.',
  },

  gezi_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Was in Gezi Park protests May 2013 — the line before and after which the trajectory of Turkey was clear',
    intent: 'year_texture',
    notes: 'Set by tur_erdogan_arc (Gezi branch).',
  },

  turkish_growth_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age during Turkey\'s 2002-2012 economic triple — the AKP\'s first decade, inflation down, infrastructure up',
    intent: 'year_texture',
    notes: 'Set by tur_economic_miracle_2000s.',
  },

  turkey_2016_generation: {
    weight: 'major',
    category: 'political',
    description: 'Was in Turkey on July 15, 2016 — the coup attempt, the citizens who lay in front of tanks, the 250 dead, and the mass purges that followed in weeks.',
    intent: 'year_texture',
    notes: 'Set by turkey_coup_attempt_2016 world event. Year texture in buildYearTexture for the purge experience and the country that emerged.',
  },

  nkrumah_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up in Nkrumah\'s Ghana — the first independence, the pan-African project, the idea that was supposed to show what African self-governance could be',
    intent: 'year_texture',
    notes: 'Set by gha_nkrumah_dream.',
  },

  rawlings_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through Rawlings\' Ghana — coups, structural adjustment, the PNDC years',
    intent: 'year_texture',
    notes: 'Set by gha_rawlings_era.',
  },

  ghana_democracy_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed Ghana\'s 1992 democratization and the 2000 peaceful transfer of power to opposition',
    intent: 'year_texture',
    notes: 'Set by gha_democracy_1992.',
  },

  nkrumah_education_beneficiary: {
    weight: 'moderate',
    category: 'historical',
    description: 'Attended a school built by Nkrumah\'s government — first-generation secondary or university student, existing only because independence built the institution.',
    intent: 'none',
    notes: 'Set by gha_nkrumah_school.',
  },

  ghana_1966_disillusionment: {
    weight: 'moderate',
    category: 'political',
    description: 'Witnessed the February 1966 coup that deposed Nkrumah while he was abroad — the grief of a generation that believed the pan-African project would hold.',
    intent: 'year_texture',
    notes: 'Set by gha_1966_coup. Annual texture of the specific grief of post-independence disillusionment.',
  },

  korean_war_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up in South Korea\'s post-war poverty 1950s — living inside the "before" of the miracle, when the bowl was light.',
    intent: 'none',
    notes: 'Set by kr_postwar_poverty_childhood.',
  },

  park_era_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived under Park Chung-hee\'s development state 1963–1979 — the implicit bargain of rapid growth exchanged for political repression.',
    intent: 'year_texture',
    notes: 'Set by kr_park_development_bargain (both choices). Annual texture of the authoritarian growth era.',
  },

  kr_dep_hell_joseon: {
    weight: 'moderate',
    category: 'political',
    description: 'Adopted the "hell Joseon" (헬조선) framing — the 2013+ naming of South Korea\'s rigid hierarchy and closed mobility for young people despite world-class education and infrastructure. A generational political education.',
    intent: 'year_texture',
    notes: 'Set by kr_dep_hell_joseon event.',
  },

  ivorian_miracle_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up during the Ivorian Miracle — 7% growth, the model West African economy, cocoa and coffee abundance',
    intent: 'year_texture',
    notes: 'Set by cdi_houphouet_era.',
  },

  ivoirite_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the ivoirité crisis — authenticity politics that excluded northerners/migrants and prefigured civil war',
    intent: 'year_texture',
    notes: 'Set by cdi_ivoirite_crisis. Two branches: affected, or benefiting.',
  },

  ci_houphouet_witness: {
    weight: 'moderate',
    category: 'historical',
    description: 'Was alive when Houphouët-Boigny died December 7 1993 — witnessed the end of thirty-three years of the only presidency the country had known',
    intent: 'year_texture',
    notes: 'Set by ci_houphouet_death_1993. Year texture: the photograph still on the wall.',
  },

  ci_coup_1999_witness: {
    weight: 'moderate',
    category: 'political',
    description: 'Witnessed the Christmas Eve 1999 coup by General Guéï — third coup in Francophone West Africa that year, ended Bédié\'s ivoirité project by different means',
    intent: 'year_texture',
    notes: 'Set by ci_coup_1999. Year texture: the radio at midnight, Guéï leaving.',
  },

  ci_gbagbo_reckoning: {
    weight: 'moderate',
    category: 'political',
    description: 'Processed the 2019 ICC acquittal of Laurent Gbagbo — the man whose refusal to leave office caused 3,000 deaths, acquitted and returned to Abidjan',
    intent: 'year_texture',
    notes: 'Set by ci_gbagbo_acquittal_2019. Year texture: what the legal outcome and the historical record imply together.',
  },

  sahel_long_arc_witness: {
    weight: 'major',
    category: 'political',
    description: 'Has watched the Sahel crisis move through Mali, Burkina Faso, and towards Ivory Coast — coups, jihadist expansion, French departure, Wagner arrival — as a regional pattern across multiple decades',
    intent: 'year_texture',
    notes: 'Set by sahel_regional_witness_late. Cross-country flag for Mali, Burkina, and CI characters.',
  },

  cmr_biya_era: {
    weight: 'moderate',
    category: 'political',
    description: 'Came of age under Paul Biya\'s presidency — the photo in every office, the RDPC as the party of the state, the managed elections across four decades',
    intent: 'year_texture',
    notes: 'Set by cmr_biya_long_rule. Year texture: the form that asks political affiliation, the conversation that stops.',
  },

  anglophone_political: {
    weight: 'moderate',
    category: 'political',
    description: 'Anglophone Cameroonian who names the arithmetic of exclusion explicitly — minority political consciousness in a majoritarian state',
    intent: 'year_texture',
    notes: 'Set by cmr_anglophone_identity (identity choice). Year texture: the counting of cabinet ministers.',
  },

  anglophone_crisis_witness: {
    weight: 'major',
    category: 'political',
    description: 'Witnessed the 2016-ongoing Anglophone crisis — what began as lawyers\' and teachers\' strikes became an armed conflict with burning villages, school boycotts, and half a million displaced',
    intent: 'both',
    notes: 'Set by cmr_anglophone_strike_2016. Follow-through: long-running unresolved conflict, no peace talks.',
  },

  nigerian_oil_boom_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age during the 1973-81 Nigerian oil boom — naira strength, federal abundance, the before of the SAP',
    intent: 'year_texture',
    notes: 'Set by nga_oil_boom.',
  },

  sap_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through Nigeria\'s IMF structural adjustment programme — devaluation, cuts, the floor systematically removed',
    intent: 'year_texture',
    notes: 'Set by nga_sap_1980s. The word SAP used for decades to describe what was done.',
  },

  nga_military_era: {
    weight: 'major',
    category: 'political',
    description: 'Came of age under Nigerian military rule (1966–1999) — the coup culture, suspended constitutions, and patronage politics of the generals.',
    intent: 'both',
    notes: 'Set by nga_coup_culture. Distinct from country-specific Biafra/SAP flags.',
  },

  nga_june12_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived the June 12 1993 election annulment — Abiola\'s clear victory erased by Babangida, the democratic possibility unmade overnight.',
    intent: 'both',
    notes: 'Set by nga_june12_1993. One of Nigeria\'s defining political betrayals.',
  },

  nga_democracy_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Witnessed Nigeria\'s return to civilian rule in 1999 — the first peaceful democratic transfer after sixteen years of military government.',
    intent: 'both',
    notes: 'Set by nga_democracy_1999.',
  },

  nga_sharia_transition: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the implementation of Sharia criminal law in 12 northern Nigerian states (1999–2002) — the complex intersection of faith, federalism, and ethnic identity.',
    intent: 'both',
    notes: 'Set by nga_sharia_north for Hausa-Fulani characters in the transition period.',
  },

  saro_wiwa_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the November 1995 execution of Ken Saro-Wiwa — the Ogoni activists, Shell, the delta that continued to burn',
    intent: 'year_texture',
    notes: 'Set by nga_saro_wiwa_1995.',
  },

  ugandan_aids_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up in Uganda during the "Slim" epidemic — watched the village lose people before the disease had a name, ABC campaign era',
    intent: 'year_texture',
    notes: 'Set by uga_slim_disease.',
  },

  museveni_liberation_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Present for the 1986 NRA liberation — the hope of the January 26 moment, the specific quality of believing in a government for the first time',
    intent: 'year_texture',
    notes: 'Set by uga_museveni_liberation_1986.',
  },

  museveni_consolidation_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Watched Museveni remove term limits and consolidate 30+ year rule — the distance between 1986 and now as the education',
    intent: 'year_texture',
    notes: 'Set by uga_museveni_consolidation.',
  },

  mogadishu_1993_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Present for the Battle of Mogadishu / Black Hawk Down — what October 3-4, 1993 means from inside the city vs. the film',
    intent: 'year_texture',
    notes: 'Set by som_unosom_black_hawk_down.',
  },

  somaliland_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up in Somaliland — the unrecognized state that works: elections, currency, police, constitution without international recognition',
    intent: 'year_texture',
    notes: 'Set by som_somaliland_stability. Isaaq ethnicity guard.',
  },

  thai_1997_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 1997 baht collapse — the construction cranes stopping, the companies folding, Thailand as the trigger of the Asian contagion',
    intent: 'year_texture',
    notes: 'Set by tha_1997_baht_crisis. Two branches: direct cost / survived with difficulty.',
  },

  thai_red_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Red Shirt — rural north/northeast, remembers Thaksin\'s policies (universal healthcare, village funds), the coup that undid them',
    intent: 'year_texture',
    notes: 'Set by tha_red_yellow_conflict.',
  },

  thai_yellow_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Yellow Shirt — urban middle class, royalist establishment, believed democratic form was insufficient to override corruption',
    intent: 'year_texture',
    notes: 'Set by tha_red_yellow_conflict.',
  },

  thai_coup_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed one of Thailand\'s thirteen coups — the tanks on the streets, the peaceful curfew, the generals explaining necessity on television',
    intent: 'year_texture',
    notes: 'Set by tha_coup_generation.',
  },

  thai_middle_income_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Part of Thailand\'s working/lower-middle class built by manufacturing and tourism — the thirty-year middle income plateau',
    intent: 'year_texture',
    notes: 'Set by tha_economic_middle_income.',
  },

  thai_76_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed or survived the October 6 1976 Thammasat massacre — students killed by rightwing paramilitaries, hanged from trees, democratic opening reversed',
    intent: 'none',
    notes: 'Set by tha_thammasat_1976.',
  },

  thai_hilltribe_stateless: {
    weight: 'moderate',
    category: 'identity',
    description: 'Hill tribe person born in Thailand without Thai citizenship — Karen, Hmong, Akha, or Lahu communities whose borders predate the modern state',
    intent: 'none',
    notes: 'Set by tha_hilltribe_stateless.',
  },

  thai_boom_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Part of Thailand\'s 1985–96 economic boom — the factory migration, the construction surge, 9% annual growth reshaping who lives how',
    intent: 'event',
    notes: 'Set by tha_boom_years. Checked by tha_boom_late_reckoning.',
  },

  thai_deep_south_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the deep south insurgency 2004+ — Pattani, Yala, Narathiwat, the 7,000 dead, the Malay-speaking Muslim community in a Thai Buddhist state',
    intent: 'none',
    notes: 'Set by tha_deep_south.',
  },

  thai_ordained: {
    weight: 'minor',
    category: 'identity',
    description: 'Temporarily ordained as a Buddhist monk — the Thai tradition of ordination for one rainy season before marriage',
    intent: 'event',
    notes: 'Set by tha_sangha_power. Checked by tha_ordained_echo.',
  },

  thai_2020_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Part of the 2020–21 youth protest movement — the unprecedented calls for monarchy reform, three-finger salute, Article 112 prosecutions',
    intent: 'none',
    notes: 'Set by tha_2020_protests.',
  },

  thai_covid_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Experienced the 2020–21 Thai tourism collapse — 39M visitors to 400K, the informal economy with no floor',
    intent: 'event',
    notes: 'Set by tha_covid_tourism. Checked by tha_covid_rebuilding.',
  },

  bng_liberation_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 1971 Liberation War — 9 months of Pakistani army atrocities, Mukti Bahini resistance, Indian intervention, and Victory Day December 16.',
    intent: 'year_texture',
    notes: 'Set by bng_liberation_war_1971.',
  },

  bng_coup_generation: {
    weight: 'major',
    category: 'political',
    description: 'Witnessed the August 15, 1975 military coup — the assassination of Sheikh Mujibur Rahman and most of his family, four years after the Liberation War.',
    intent: 'year_texture',
    notes: 'Set by bng_mujib_1975.',
  },

  bng_uprising_generation: {
    weight: 'major',
    category: 'political',
    description: 'Witnessed the 2024 student uprising — the quota protests, the 300 dead, Sheikh Hasina\'s helicopter departure, and the morning after.',
    intent: 'year_texture',
    notes: 'Set by bng_student_uprising_2024.',
  },

  nepal_republic_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed Nepal become a federal republic in 2008 — the end of the world\'s only Hindu kingdom by popular vote',
    intent: 'year_texture',
    notes: 'Set by nep_republic_2006.',
  },

  boat_person: {
    weight: 'major',
    category: 'persecution',
    description: 'Left Vietnam by boat after 1975 — the South China Sea, the camps, the piracy risk, the resettlement country that was not home.',
    intent: 'year_texture',
    notes: 'Set by vn_the_boat_decision (boat choice). Often co-set with south_vietnamese_diaspora.',
  },

  evaded_relocation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Evaded relocation to a New Economic Zone — networks, bribes, the calculation of what risk was acceptable to stay in a city you had always lived in.',
    intent: 'year_texture',
    notes: 'Set by vn_new_economic_zone (evaded choice).',
  },

  stayed_south_vietnam: {
    weight: 'moderate',
    category: 'cultural',
    description: 'Stayed in South Vietnam after 1975 and chose not to leave when leaving was possible — the people who left and the people who stayed carry the division differently.',
    intent: 'year_texture',
    notes: 'Set by vn_the_boat_decision (stayed choice).',
  },

  doi_moi_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age during Đổi Mới reform — the market opening, the motorcycles appearing, the private business that was suddenly legal after being illegal.',
    intent: 'year_texture',
    notes: 'Set by vn_doi_moi_awakening (two branches) and vn_communist_capitalist.',
  },

  doi_moi_entrepreneur: {
    weight: 'moderate',
    category: 'historical',
    description: 'Started a business during Đổi Mới — navigated the Party paperwork, the guanxi, the question of which official needed to know which thing.',
    intent: 'year_texture',
    notes: 'Set by vn_doi_moi_awakening (first branch).',
  },

  north_south_awareness: {
    weight: 'minor',
    category: 'cultural',
    description: 'Carries the north-south distinction inside Vietnam — the accent, the food, the way a family\'s history maps onto a geography that is officially unified.',
    intent: 'year_texture',
    notes: 'Set by vn_north_south_divide.',
  },

  viet_kieu_investor: {
    weight: 'minor',
    category: 'cultural',
    description: 'Returned to Vietnam as Việt kiều — diaspora money, a passport from somewhere else, the country that changed while you were gone and recognizes you as useful now.',
    intent: 'year_texture',
    notes: 'Set by vn_viet_kieu_return (invest choice).',
  },

  vietnam_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Marked by the American War — grew up in a country at war, or came of age in the years immediately after the war ended.',
    intent: 'year_texture',
    notes: 'Set by world event american_war_in_vietnam. Covers all Vietnamese regardless of side.',
  },

  vn_sino_tension_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the 2014 South China Sea crisis — China\'s oil rig in Vietnamese waters, anti-Chinese protests in industrial zones, the contradiction of Communist-party-brother and territorial adversary.',
    intent: 'year_texture',
    notes: 'Set by vn_south_china_sea_2014.',
  },

  vn_dissident_adjacent: {
    weight: 'moderate',
    category: 'political',
    description: 'Tested the line between online speech and state censorship — knows the names of bloggers and activists who got the timeline wrong; navigates the closed political space within the open economy.',
    intent: 'event',
    notes: 'Set by vn_cybersecurity_2018 (second choice).',
  },

  myanmar_socialist_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Grew up under Ne Win\'s Burmese Way to Socialism — the isolation, the nationalisation, the shortwave radio as the only window',
    intent: 'year_texture',
    notes: 'Set by mya_socialist_isolation.',
  },

  myanmar_activist: {
    weight: 'moderate',
    category: 'political',
    description: 'Was in the streets during the 8888 Uprising — carries the memory of the crowd and what followed',
    intent: 'year_texture',
    notes: 'Set by mya_1988_uprising (first branch).',
  },

  myanmar_junta_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the SLORC/SPDC decades — junta cronies, forced labour, the stolen 1990 election',
    intent: 'year_texture',
    notes: 'Set by mya_slorc_years.',
  },

  myanmar_civilian_hope_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived the 2011–21 opening — press freedom, Suu Kyi freed and elected, foreign investment, the decade of cautious hope',
    intent: 'year_texture',
    notes: 'Set by mya_civilian_opening_2011.',
  },

  myanmar_cdm_participant: {
    weight: 'major',
    category: 'political',
    description: 'Participated in the Civil Disobedience Movement after the 2021 coup — left the job, joined the strike, put their name on a list',
    intent: 'year_texture',
    notes: 'Set by mya_coup_2021 (first branch).',
  },

  mya_dep_ethnic_minority_war: {
    weight: 'major',
    category: 'political',
    description: 'Grew up in ethnic minority Myanmar (Karen, Kachin, Shan, Chin, etc.) during the civil wars — the sounds from the next valley, displacement, the road that changes hands.',
    intent: 'event',
    notes: 'Set by mya_dep_ethnic_civil_war. Follow-through: mya_dep_ethnic_war_late (late life reckoning).',
  },

  mya_dep_1990_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Voted in (or witnessed) the May 1990 election that the NLD won by 80% and the SLORC annulled — the world\'s largest ignored election result.',
    intent: 'event',
    notes: 'Set by mya_dep_1990_election. Follow-through: mya_dep_1990_echo (2021 coup déjà vu).',
  },

  mya_dep_jade_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Worked or lived near the Hpakant jade mines — the world\'s largest jade deposit, controlled by military concessions, generating $31B annually outside the tax register.',
    intent: 'year_texture',
    notes: 'Set by mya_dep_jade_miner.',
  },

  mya_dep_censorship_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up under SLORC/SPDC media censorship — approved films, the VCR parlour with the curtain, copies of copies of copies of the outside world on degraded tape.',
    intent: 'year_texture',
    notes: 'Set by mya_dep_vcr_culture.',
  },

  mya_dep_chin_hills: {
    weight: 'moderate',
    category: 'identity',
    description: 'From the Chin Hills — the Baptist-converted, isolated highlands where the nearest market was a day\'s walk and the state arrived slowly and partially.',
    intent: 'year_texture',
    notes: 'Set by mya_dep_chin_hills event.',
  },

  mya_dep_spring_revolution: {
    weight: 'major',
    category: 'political',
    description: 'Participated in or was shaped by the Spring Revolution — the civilian resistance to the 2021 coup, CDM, PDF, the junta\'s airstrikes on its own villages.',
    intent: 'year_texture',
    notes: 'Set by mya_dep_spring_revolution event. Also sets myanmar_cdm_participant or emigrated depending on choice.',
  },

  tunisian_ben_ali_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up or came of age under Ben Ali\'s police state — the controlled bread and silence, the police politique, the art of living in permitted spaces',
    intent: 'year_texture',
    notes: 'Set by tun_ben_ali_state.',
  },

  tunisian_revolution_generation: {
    weight: 'major',
    category: 'political',
    description: 'Witnessed Tunisia\'s Jasmine Revolution — Bouazizi\'s act, the twenty-eight days, Ben Ali\'s flight, the one Arab Spring that completed its arc',
    intent: 'year_texture',
    notes: 'Set by tun_bouazizi_revolution_2011.',
  },

  tunisian_democratic_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through Tunisia\'s democratic transition 2012–19 — the Nobel-winning constitution, Ennahda negotiating with secularists, the experiment the world watched',
    intent: 'year_texture',
    notes: 'Set by tun_democratic_transition.',
  },

  tunisian_interior_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Aware of the coast/interior divide — the economic model that left Sidi Bouzid behind, the structural context of the man who started the revolution',
    intent: 'year_texture',
    notes: 'Set by tun_economic_interior.',
  },

  sudan_islamist_law_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived under Nimeiry\'s September Laws 1983 — Sharia applied to Sudan, public executions, Mahmoud Taha executed',
    intent: 'year_texture',
    notes: 'Set by sdn_nimeiry_sharia_1983.',
  },

  sudan_south_separation_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed South Sudan\'s independence 2011 — a third of Sudan\'s territory and most of the oil leaving',
    intent: 'year_texture',
    notes: 'Set by sdn_south_sudan_independence_2011.',
  },

  sudan_revolution_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived through Sudan\'s 2019 revolution — Bashir falls after bread protests, the sit-in at military HQ, June 3 massacre, transitional agreement',
    intent: 'year_texture',
    notes: 'Set by sdn_revolution_2019.',
  },

  sudanese_activist: {
    weight: 'major',
    category: 'political',
    description: 'Was at the Khartoum sit-in in 2019 — present when the revolution was made and when the RSF fired into it on June 3',
    intent: 'year_texture',
    notes: 'Set by sdn_revolution_2019 (first branch).',
  },

  angola_mpla_supporter: {
    weight: 'moderate',
    category: 'political',
    description: 'Supported the MPLA in the civil war — the Marxist movement that held Luanda and won international recognition',
    intent: 'year_texture',
    notes: 'Set by ang_independence_civil_war_1975 (first branch).',
  },

  angola_peace_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Experienced Angola\'s 2002 peace — Savimbi killed, Luena Memorandum signed, end of a war that ran for 27 years',
    intent: 'year_texture',
    notes: 'Set by ang_peace_2002.',
  },

  angola_oil_boom_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the post-war oil boom — Luanda as the world\'s most expensive city for expats, construction cranes, MPLA wealth capture',
    intent: 'year_texture',
    notes: 'Set by ang_oil_boom.',
  },

  angola_mpla_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived under Dos Santos\' 38-year MPLA rule — the party that fought colonialism becoming its own extraction machine',
    intent: 'year_texture',
    notes: 'Set by ang_dos_santos_rule.',
  },

  ang_dep_musseque_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Grew up in a Luanda musseque — the unplanned settlements on sandy ground where the colonial city\'s workforce lived',
    intent: 'year_texture',
    notes: 'Set by ang_dep_musseque_life.',
  },

  ang_dep_retornado_departure: {
    weight: 'minor',
    category: 'historical',
    description: 'Witnessed the 1975 retornado exodus — 300,000 Portuguese settlers leaving furniture on pavements, cars at the airport',
    intent: 'none',
    notes: 'Set by ang_dep_retornados_1975.',
  },

  ang_dep_ovimbundu_highlands: {
    weight: 'moderate',
    category: 'identity',
    description: 'Ovimbundu who stayed in the central highlands during the civil war — UNITA territory, changed hands, agricultural land mined',
    intent: 'year_texture',
    notes: 'Set by ang_dep_ovimbundu_displacement (first choice).',
  },

  ang_dep_ovimbundu_luanda: {
    weight: 'minor',
    category: 'identity',
    description: 'Ovimbundu who came to Luanda and navigated the ethnic geography of an MPLA city as highland-origin Angolans',
    intent: 'year_texture',
    notes: 'Set by ang_dep_ovimbundu_displacement (second choice).',
  },

  ang_dep_mestizo_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Mestiço Angolan who came of age under MPLA Marxist socialism — colonial-educated class leading independence, the complications that produced',
    intent: 'year_texture',
    notes: 'Set by ang_dep_mestizo_socialism.',
  },

  ang_dep_cuban_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Grew up with Cubans as part of the landscape — 30,000–50,000 Cuban soldiers, doctors, and teachers present 1976–1991',
    intent: 'year_texture',
    notes: 'Set by ang_dep_cuban_presence.',
  },

  ang_dep_demob_reunited: {
    weight: 'moderate',
    category: 'personal',
    description: 'Child soldier demobilised and reunited with family after 2002 — the person who left is not the same person who came back',
    intent: 'none',
    notes: 'Set by ang_dep_child_soldier_demob (first choice).',
  },

  ang_dep_demob_no_family: {
    weight: 'major',
    category: 'trauma',
    description: 'Child soldier demobilised with no family found — built a life from a vocational skill with a family-shaped absence',
    intent: 'none',
    notes: 'Set by ang_dep_child_soldier_demob (second choice).',
  },

  ang_dep_demining_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Witnessed post-war demining in rural Angola — the red tape moving back, the ceremony of walking onto cleared land',
    intent: 'year_texture',
    notes: 'Set by ang_dep_demining.',
  },

  ang_dep_oil_inequality: {
    weight: 'minor',
    category: 'economic',
    description: 'Lived in Luanda during the oil boom inequality years — world\'s most expensive city for expats, musseque water trucks, villas on the ridge',
    intent: 'year_texture',
    notes: 'Set by ang_dep_luanda_inequality.',
  },

  ang_dep_portuguese_bilingual: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up switching between a Bantu language at home and Portuguese in the public world — the colonial tongue as independence\'s lingua franca',
    intent: 'year_texture',
    notes: 'Set by ang_dep_portuguese_language.',
  },

  jordanian_peace_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through Jordan\'s 1994 Wadi Araba peace treaty with Israel — the pragmatic case and the Palestinian-Jordanian complication',
    intent: 'year_texture',
    notes: 'Set by jor_peace_treaty_1994.',
  },

  jordanian_hussein_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Lived through King Hussein\'s long reign — the survivor king, 47 years of monarchy holding a fragile state together',
    intent: 'year_texture',
    notes: 'Set by jor_king_hussein_era.',
  },

  irq_baath_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up inside the Ba\'ath state — the party card as admission ticket, the portrait in every room, the mukhabarat in the neighbourhood, the double grammar of what you said and what you meant.',
    intent: 'year_texture',
    notes: 'Set by irq_baath_childhood. Iraq 1970–2003.',
  },

  irq_war_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Shaped by the Iran-Iraq War — no outside, only distance from the front that determines which costs arrive first.',
    intent: 'year_texture',
    notes: 'Set by irq_iran_iraq_war (both choices).',
  },

  irq_postwar_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived the 2003 invasion and immediate aftermath — army disbanded, de-Baathification, museum looting, the question of who has the gun.',
    intent: 'year_texture',
    notes: 'Set by irq_2003_invasion (both choices).',
  },

  irq_diaspora_generation: {
    weight: 'moderate',
    category: 'cultural',
    description: 'In the Iraqi diaspora — one of the highest professional emigration rates in history, living in the gap between the Iraq you miss and the Iraq that exists.',
    intent: 'year_texture',
    notes: 'Set by irq_diaspora_professional (both choices).',
  },

  irq_tishreen_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Witnessed or joined the October 2019 Tishreen uprising — 600 dead, electoral reform partially met, the system absorbing and surviving.',
    intent: 'year_texture',
    notes: 'Set by irq_tishreen_2019 (both choices).',
  },

  libyan_jamahiriya_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up in Gaddafi\'s Jamahiriya — the Green Book ideology, basic popular congresses, free oil-funded welfare state, Revolutionary Guard surveillance',
    intent: 'year_texture',
    notes: 'Set by lby_gaddafi_jamahiriya.',
  },

  libyan_sanctions_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived under UN sanctions 1992–2003 — Lockerbie, no flights, frozen assets, the thinner shelves of international isolation',
    intent: 'year_texture',
    notes: 'Set by lby_lockerbie_sanctions.',
  },

  libyan_rehabilitation_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Watched Libya\'s 2003 rehabilitation — WMD disclosed, sanctions lifted, Blair shaking Gaddafi\'s hand, Western oil companies returning',
    intent: 'year_texture',
    notes: 'Set by lby_rehabilitation_2003.',
  },

  libyan_revolutionary: {
    weight: 'major',
    category: 'political',
    description: 'Joined or supported the 2011 uprising against Gaddafi — and has been living with what the revolution produced',
    intent: 'year_texture',
    notes: 'Set by lby_revolution_2011 (first branch).',
  },

  libyan_oil_state_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age in the Gaddafi oil state — free housing, free university, free healthcare, the Mukhabarat as the price',
    intent: 'year_texture',
    notes: 'Set by lby_gaddafi_oil_state.',
  },

  zambian_kaunda_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up under Kenneth Kaunda\'s Humanism — the copper-funded welfare state, UNIP, Man at the Centre',
    intent: 'year_texture',
    notes: 'Set by zmb_kaunda_humanism.',
  },

  zambian_copper_belt_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Came of age in the Copper Belt company towns — Kitwe, Ndola, Luanshya, the miner\'s wage, the brief oil-state-of-Africa moment',
    intent: 'year_texture',
    notes: 'Set by zmb_copper_belt.',
  },

  zambian_democracy_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed Zambia\'s 1991 democratic transfer of power — Kaunda loses to Chiluba, the first in southern Africa',
    intent: 'year_texture',
    notes: 'Set by zmb_democratic_transition_1991.',
  },

  zmb_dep_tonga_kariba: {
    weight: 'major',
    category: 'displacement',
    description: 'BaTonga family displaced by the Kariba Dam flooding (1957-58) — 57,000 people removed from the Zambezi valley, Nyaminyami\'s domain drowned.',
    intent: 'event',
    notes: 'Follow-through: zmb_dep_tonga_echo (late_life witness).',
  },

  zmb_dep_copper_closure: {
    weight: 'moderate',
    category: 'labor',
    description: 'Grew up in a post-ZCCM Copperbelt closure town — the company town infrastructure without the company maintaining it.',
    intent: 'year_texture',
    notes: 'Set by zmb_dep_copper_closure.',
  },

  zmb_dep_aids_orphan: {
    weight: 'major',
    category: 'family',
    description: 'Raised by grandparents or siblings after parents died in the Zambian AIDS crisis — the gap in the middle generation.',
    intent: 'event',
    notes: 'Follow-through: zmb_dep_aids_orphan_adult (young_adult).',
  },

  zmb_dep_compound_lusaka: {
    weight: 'moderate',
    category: 'geographic',
    description: 'Grew up in a Lusaka informal compound — George, Kanyama, Kalingalinga — the charcoal economy, the tap at the end of the road.',
    intent: 'year_texture',
    notes: 'Set by zmb_dep_compound_lusaka.',
  },

  zmb_dep_mealie_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived through the post-SAP mealie meal price shock — the subsidy removed, the staple tripling in price.',
    intent: 'year_texture',
    notes: 'Set by zmb_dep_mealie_crisis.',
  },

  zmb_dep_chinese_copper: {
    weight: 'moderate',
    category: 'labor',
    description: 'Worked in or adjacent to Chinese-owned copper and coal operations (CNMC, Collum) — the wages below ZCCM, the labor disputes.',
    intent: 'year_texture',
    notes: 'Set by zmb_dep_chinese_copper.',
  },

  mozambican_frelimo_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up under FRELIMO\'s one-party socialist state — independence, nationalisation, "A luta continua", the infrastructure-sparse inheritance of Portuguese colonialism',
    intent: 'year_texture',
    notes: 'Set by moz_frelimo_independence.',
  },

  mozambican_machel_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Alive when Samora Machel died in the 1986 plane crash — the only president Mozambique had known, suspicion of South African involvement',
    intent: 'year_texture',
    notes: 'Set by moz_machel_death_1986.',
  },

  mozambican_peace_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the 1992 Rome Peace Accords and the first Mozambican multi-party elections — the war ending after fifteen years',
    intent: 'year_texture',
    notes: 'Set by moz_peace_accords_1992.',
  },

  mozambican_gas_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Came of age when offshore gas was discovered and the Cabo Delgado insurgency began — the resource and the violence arriving together',
    intent: 'year_texture',
    notes: 'Set by moz_gas_cabo_delgado.',
  },

  moz_dep_aldeias: {
    weight: 'minor',
    category: 'historical',
    description: 'Grew up during FRELIMO\'s communal villages (aldeias comunais) forced villagisation 1977–82 — displaced from ancestral machamba to collective plots',
    intent: 'year_texture',
    notes: 'Set by moz_dep_aldeias_comunais.',
  },

  moz_dep_reeducacao: {
    weight: 'minor',
    category: 'historical',
    description: 'Had a close person taken to a FRELIMO reeducation camp 1975–85 — and lived with their absence or changed return',
    intent: 'none',
    notes: 'Set by moz_dep_reeducacao.',
  },

  moz_dep_landmine_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up in rural Mozambique among landmines laid during the civil war — learned safe paths before any other geography',
    intent: 'event',
    notes: 'Set by moz_dep_landmine. Follow-through: moz_dep_landmine_late.',
  },

  moz_dep_cashew_generation: {
    weight: 'minor',
    category: 'economic',
    description: 'Lived through the World Bank structural adjustment that removed cashew export tariffs and collapsed domestic processing jobs',
    intent: 'year_texture',
    notes: 'Set by moz_dep_cashew.',
  },

  moz_dep_maputo_boom: {
    weight: 'minor',
    category: 'historical',
    description: 'Came of age in Maputo during the post-peace reconstruction boom — churrasqueiras, new malls, the city rebuilding its energy',
    intent: 'year_texture',
    notes: 'Set by moz_dep_maputo_boom.',
  },

  moz_dep_hidden_debt: {
    weight: 'moderate',
    category: 'economic',
    description: 'Adult during the tuna bonds / hidden debt scandal 2013–16 — $2.2B in secret loans, IMF program collapse, currency crash',
    intent: 'none',
    notes: 'Set by moz_dep_hidden_debt.',
  },

  moz_dep_aids_orphan_moz: {
    weight: 'moderate',
    category: 'personal',
    description: 'Grew up as an AIDS orphan in Mozambique — raised by grandmother or older sibling after parents died during the HIV peak 1995–2010',
    intent: 'event',
    notes: 'Set by moz_dep_aids_orphan. Follow-through: moz_dep_aids_orphan_adult.',
  },

  afghan_saur_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up during the Saur Revolution and Soviet-backed PDPA communist rule — land reform, literacy campaigns, and disappearances',
    intent: 'year_texture',
    notes: 'Set by afg_saur_revolution_1978.',
  },

  afghan_2001_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the 2001 US invasion and the "Kabul bubble" — girls\' schools reopening, aid economy, reconstruction hope',
    intent: 'year_texture',
    notes: 'Set by afg_us_invasion_2001.',
  },

  afg_taliban_96_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the Taliban\'s first takeover of Kabul in September 1996 — the overnight edicts, music stopped, women confined, burqa enforced, girls\' schools closed.',
    intent: 'event',
    notes: 'Set by afg_taliban_kabul_1996. Follow-through: ft63_afg_96_late.',
  },

  afg_education_revoked: {
    weight: 'major',
    category: 'historical',
    description: 'Afghan girl whose formal education was revoked by Taliban decree — 1996–2001 or 2021+; the school that simply did not open one morning.',
    intent: 'event',
    notes: 'Set by afg_education_revoked. Follow-through: ft63_afg_educ_2001, ft63_afg_educ_2021.',
  },

  afg_secret_schooling: {
    weight: 'major',
    category: 'historical',
    description: 'Attended or taught a secret school for girls during Taliban rule — textbooks hidden under cloth, the accelerated reading out of fear of being discovered.',
    intent: 'event',
    notes: 'Set by afg_education_revoked event (secret school choice). Follow-through: ft63_afg_secret_school_late.',
  },

  afg_2001_liberation_hope: {
    weight: 'major',
    category: 'historical',
    description: 'Experienced the fall of the Taliban in November 2001 — the music returning to Kabul, women removing burqas, the first walk outside alone in five years.',
    intent: 'event',
    notes: 'Set by afg_2001_fall_of_kabul. Follow-through: ft63_afg_hope_2010.',
  },

  afg_interpreter_served: {
    weight: 'major',
    category: 'historical',
    description: 'Worked as interpreter for NATO/US forces in Afghanistan — translating not just words but context, register, and unspoken meaning, while carrying the risk of being targeted.',
    intent: 'event',
    notes: 'Set by afg_interpreter_nato. Follow-through: ft63_afg_interpreter_post, afg_interpreter_2021_threat.',
  },

  afg_women_career_built: {
    weight: 'major',
    category: 'historical',
    description: 'Afghan woman who built a professional career during the 2001-2021 period — degree, ministry work, NGO, journalism, medicine; the visible professional women\'s class that existed before 2021.',
    intent: 'event',
    notes: 'Set by afg_women_career_2013. Feeds into afg_2021_collapse event.',
  },

  afg_2021_escaped: {
    weight: 'major',
    category: 'displacement',
    description: 'Escaped Afghanistan during the August 2021 Taliban takeover — the airport crush, the evacuation flight, the transit country, the visa category that determines the next three years.',
    intent: 'event',
    timestamped: true,
    notes: 'Set by afg_2021_collapse (escaped choice). Follow-through: ft63_afg_escaped_first_year.',
  },

  afg_2021_stayed: {
    weight: 'major',
    category: 'historical',
    description: 'Stayed in Afghanistan when the Taliban returned in August 2021 — could not reach the airport, or would not leave family, or chose to remain.',
    intent: 'event',
    notes: 'Set by afg_2021_collapse (stayed choice). Follow-through: ft63_afg_stayed_2023.',
  },

  afg_diaspora_watches: {
    weight: 'moderate',
    category: 'historical',
    description: 'Afghan diaspora member watching the 2021 collapse from abroad — the group chat that goes quiet for three days, the careful messages that resume.',
    intent: 'year_texture',
    notes: 'Set by afg_2021_diaspora_watch. Texture only.',
  },

  afg_aid_economy_worker: {
    weight: 'moderate',
    category: 'economic',
    description: 'Worked in the reconstruction-era aid economy (NGO, UN, ministry, international organisation) in Afghanistan 2002–2021 — salaries that transformed, work that had a gap between intention and result.',
    intent: 'year_texture',
    notes: 'Set by afg_reconstruction_years (aid worker choice). Texture only.',
  },

  afg_interpreter_evacuated: {
    weight: 'major',
    category: 'displacement',
    description: 'Afghan interpreter evacuated on a Special Immigrant Visa after the 2021 Taliban takeover — Fort Lee processing, resettlement, the survival of what the visa was for.',
    intent: 'event',
    notes: 'Set by afg_interpreter_2021_threat (made it choice).',
  },

  afg_post_2021_life: {
    weight: 'moderate',
    category: 'historical',
    description: 'Living in Afghanistan under Taliban rule post-2021 — the checkpoint calculations, the dress code management, the humanitarian crisis, the phone that connects to an outside world that is watching.',
    intent: 'year_texture',
    notes: 'Set by afg_living_under_new_taliban. Texture only.',
  },

  yemeni_saleh_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up under Ali Abdullah Saleh\'s rule — tribal balancing, qat culture, the mosque as civic institution',
    intent: 'year_texture',
    notes: 'Set by yem_saleh_era_childhood.',
  },

  yemeni_unification_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Alive for Yemeni reunification 1990 — north and south merging two genuinely different societies',
    intent: 'year_texture',
    notes: 'Set by yem_unification_1990.',
  },

  yemeni_1994_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 1994 civil war — south crushed in 70 days, land redistributed to northern tribes, unresolved grievances',
    intent: 'year_texture',
    notes: 'Set by yem_1994_civil_war.',
  },

  yemeni_revolution_generation: {
    weight: 'major',
    category: 'historical',
    description: 'In Change Square 2011 — Saleh removed, the brief hope of the Arab Spring transition',
    intent: 'year_texture',
    notes: 'Set by yem_arab_spring_2011.',
  },

  gift_cultivated: {
    weight: 'major',
    category: 'achievement',
    description: 'The gift entered a structured development path — scholarship, programme, formal training. The arc has a favorable fork.',
    intent: 'both',
    notes: 'Set by gift_door_opens (accept choice). Gates favorable young-adult and extraordinary talent events.',
  },

  gift_rekindled: {
    weight: 'major',
    category: 'achievement',
    description: 'After suppression or deferral, the gift found a channel — a mentor, a movement, a late opening.',
    intent: 'both',
    notes: 'Set by gift_community_mentor, gift_civil_rights_channel. Gates extraordinary talent events alongside gift_cultivated.',
  },

  gift_fulfilled: {
    weight: 'major',
    category: 'achievement',
    description: 'The gifted arc completed — the extraordinary work was done, the gift expressed fully.',
    intent: 'both',
    notes: 'Set by several extraordinary talent events. Identity card surfaces this. Year texture has dedicated path.',
    timestamped: true,
  },

  gift_passed_on: {
    weight: 'major',
    category: 'achievement',
    description: 'Character taught the gift to someone younger — child, student, community. The arc continues through another person.',
    intent: 'both',
    notes: 'Set by gift_teaching_impulse (intervene choice), athletic after (coach), and extraordinary talent late events.',
  },

  gift_extraordinary: {
    weight: 'major',
    category: 'achievement',
    description: 'Character reached the extraordinary ceiling — world-class performance, canonical work, landmark discovery.',
    intent: 'both',
    notes: 'Set by gift_athletic_legendary, gift_tenured_professor, gift_music_canonical, gift_art_major_prize, gift_voice_of_generation.',
    timestamped: true,
  },

  gift_milestone_1: {
    weight: 'moderate',
    category: 'achievement',
    description: 'First major public milestone of the gifted arc — first publication, HBCU graduation, first recognised performance.',
    intent: 'year_texture',
    notes: 'Set by gift_hbcu_graduation and gift_first_public_moment.',
  },

  hbcu_graduate: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Graduated from a historically Black college or university — HBCU network, specific cultural formation, the weight of what it means.',
    intent: 'year_texture',
    notes: 'Set by gift_hbcu_graduation. USA-specific. Related to first_gen_university.',
  },

  pro_athlete: {
    weight: 'major',
    category: 'achievement',
    description: 'Reached professional athletic level — contract, competition at the highest tier, career as athlete.',
    intent: 'both',
    notes: 'Set by gift_athletic_world_stage. Distinct from career=athlete (many athletes never reach this).',
  },

  intellectual_breakthrough: {
    weight: 'major',
    category: 'achievement',
    description: 'Produced research or work that changed the field — cited, built upon, named.',
    intent: 'both',
    notes: 'Set by gift_intellectual_breakthrough. Gates gift_intellectual_legacy.',
  },

  tenured_professor: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Achieved tenure — the specific freedom to pursue inconvenient work without removal.',
    intent: 'both',
    notes: 'Set by gift_tenured_professor.',
  },

  acclaimed_musician: {
    weight: 'major',
    category: 'achievement',
    description: 'Musical work reached canonical status — the record that defines a moment, the work younger musicians cite.',
    intent: 'both',
    notes: 'Set by gift_music_landmark. Gates gift_music_canonical.',
  },

  acclaimed_artist: {
    weight: 'major',
    category: 'achievement',
    description: 'Visual or artistic work received serious critical recognition — retrospective, prize, institutional acknowledgement.',
    intent: 'both',
    notes: 'Set by gift_art_critical_moment. Gates gift_art_major_prize.',
  },

  acclaimed_writer: {
    weight: 'major',
    category: 'achievement',
    description: 'Writing reached published recognition — the work reviewed seriously, read, cited, argued with.',
    intent: 'both',
    notes: 'Set by gift_writing_published. Gates gift_literary_prize and gift_voice_of_generation.',
  },

  gift_realized: {
    weight: 'major',
    category: 'achievement',
    description: 'The gift found its fullest expression — the ultimate work was made, the thing the character was born to produce.',
    intent: 'both',
    notes: 'Set by gift_ultimate_work. Requires gift_extraordinary + deep path work (immersion, peer, crisis, or integration). Highest gift state.',
    timestamped: true,
  },

  gift_burnout_recovered: {
    weight: 'major',
    category: 'achievement',
    description: 'Returned from burnout break to find the gift exactly where it was left — the performance stripped out, the actual thing remaining.',
    intent: 'both',
    notes: 'Set by gift_burnout_recovery. Ribbon: "The Long Way Back".',
  },

  gift_second_generation: {
    weight: 'major',
    category: 'achievement',
    description: 'The path that was blocked for them — they made it for their child. The gift continued into the next generation.',
    intent: 'both',
    notes: 'Set by gift_second_generation_path. Ribbon: "The Second Generation". Requires gift_suppressed + gift_child_has_it.',
    timestamped: true,
  },

  gift_deep_immersion: {
    weight: 'major',
    category: 'achievement',
    description: 'Arranged a period of complete withdrawal into the work — the quality of attention that the gift requires, recovered.',
    intent: 'year_texture',
    notes: 'Set by gift_deep_immersion event. Gates gift_ultimate_work alongside peer/crisis/integration.',
  },

  gift_crisis_through: {
    weight: 'major',
    category: 'achievement',
    description: 'Went back to the beginning of the work after a structural crisis rather than patching over it — the crisis was the door.',
    intent: 'year_texture',
    notes: 'Set by gift_creative_crisis (go back choice). Gates gift_ultimate_work.',
  },

  gift_integration_synthesis: {
    weight: 'major',
    category: 'achievement',
    description: 'The gift absorbed the full biography — losses, crossings, exclusions — and became something neither the gift nor the life could have produced alone.',
    intent: 'year_texture',
    notes: 'Set by gift_integration_synthesis event. Gates gift_ultimate_work.',
  },

  gift_late_bloomer: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Returned to the gift in middle age — the path narrower, still a path.',
    intent: 'year_texture',
    notes: 'Set by gift_late_bloomer_return (go through choice). Often follows gift_deferred.',
  },

  gift_diaspora_unlocked: {
    weight: 'major',
    category: 'achievement',
    description: 'Migration unlocked the formal path for the gift — the new country evaluated the ability on merit where the origin country had not.',
    intent: 'year_texture',
    notes: 'Set by gift_diaspora_unlock. The barrier was geographic/structural, never innate.',
  },

  gift_radicalized: {
    weight: 'moderate',
    category: 'political',
    description: 'The structural understanding of what blocked the gift became political consciousness — the barrier analysed and converted to action or resistance.',
    intent: 'none',
    notes: 'Set by gift_ceiling_radicalizes. Often sets political_leaning=left. The gift as lens for structural analysis.',
  },

  gift_tribute_received: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Late in life, received evidence that the gift passed forward — a student\'s dedication, a citation, a public acknowledgement of lineage.',
    intent: 'none',
    notes: 'Set by gift_late_tribute. Age 68+. The correct outcome: the gift continues past you.',
  },

  gift_public_performer: {
    weight: 'moderate',
    category: 'achievement',
    description: 'The gift was brought into a public arena — competition, concert hall, examination — as a child or adolescent.',
    intent: 'year_texture',
    notes: 'Set by gift_public_performance. Gates further performance arc. May coexist with gift_public_discomfort.',
  },

  gift_olympiad_path: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Entered and competed in academic olympiad or international competition — the system that exists for the intellectual gift.',
    intent: 'year_texture',
    notes: 'Set by gift_olympiad_path event. Gates gift_olympiad_success.',
  },

  gift_olympiad_success: {
    weight: 'major',
    category: 'achievement',
    description: 'Won or placed at the top of an international academic competition — result documented, university interest generated.',
    intent: 'year_texture',
    notes: 'Set by gift_olympiad_path (win choice). Ribbon: candidate. Opens elite university path.',
  },

  gift_world_stage: {
    weight: 'major',
    category: 'achievement',
    description: 'Reached the world stage of the gift — Carnegie Hall, Olympic selection, Nobel lecture, world championship, field-defining publication.',
    intent: 'year_texture',
    notes: 'Set by gift_world_stage event. Requires gift_extraordinary + fame >= 45. Gates gift_major_prize.',
  },

  gift_major_prize: {
    weight: 'major',
    category: 'achievement',
    description: 'Received a major prize — gold medal, world title, Nobel-level recognition, field-defining award.',
    intent: 'year_texture',
    notes: 'Set by gift_major_prize event. Requires gift_world_stage. Ribbon candidate.',
  },

  gaokao_succeeded: {
    weight: 'major',
    category: 'achievement',
    description: 'Passed the gaokao with a score enabling elite university entry — the gate reopened after the Cultural Revolution years.',
    intent: 'year_texture',
    notes: 'Set by cn_gaokao (top score choice). Post-1977.',
  },

  china_entrepreneur: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Started a private business during China\'s reform era — part of the generation that built wealth where none was possible before.',
    intent: 'year_texture',
    notes: 'Set by cn_first_private_business.',
  },

  social_credit_awareness: {
    weight: 'minor',
    category: 'political',
    description: 'Became aware of and adapted behaviour to China\'s social credit system.',
    intent: 'none',
    notes: 'Set by cn_social_credit_awareness.',
  },

  zero_covid_anger: {
    weight: 'moderate',
    category: 'political',
    description: 'Felt — and expressed, at some cost — anger at the zero-COVID system during the lockdowns.',
    intent: 'none',
    notes: 'Set by cn_zero_covid_lockdown (express anger choice).',
  },

  worker_protest: {
    weight: 'minor',
    category: 'political',
    description: 'Participated in worker protest against SOE layoffs or conditions.',
    intent: 'none',
    notes: 'Set by cn_iron_rice_bowl_broken (join the protest choice).',
  },

  sky_university: {
    weight: 'major',
    category: 'achievement',
    description: 'Entered Seoul National, Korea, or Yonsei university — the name on the door the family said at every dinner.',
    intent: 'year_texture',
    notes: 'Set by kr_suneung_result (SKY choice).',
  },

  suneung_succeeded: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Scored well enough on the suneung to enter the desired university.',
    intent: 'none',
    notes: 'Set by kr_suneung_result (SKY choice).',
  },

  disability_workplace_changed: {
    weight: 'minor',
    category: 'achievement',
    description: 'Changed the workplace\'s accommodations through advocacy — the fight produced something structural.',
    intent: 'none',
    notes: 'Set by dis_workplace_navigation (fight for accommodations choice).',
  },

  teacher_letter_received: {
    weight: 'major',
    category: 'achievement',
    description: 'Received the letter — fifteen years later, the student found you to say what students rarely say at the time: it mattered.',
    intent: 'year_texture',
    notes: 'Set by tch_the_letter.',
  },

  damascus_spring_witness: {
    weight: 'moderate',
    category: 'political',
    description: 'Syrian intellectual/professional who witnessed the brief Damascus Spring of 2000–2001 — discussion forums, open letters, and the shutdown that followed.',
    intent: 'year_texture',
    notes: 'Set by sy_damascus_spring.',
  },

  briefly_believed: {
    weight: 'minor',
    category: 'political',
    description: 'Character who briefly believed a political opening was real before it was shut down.',
    intent: 'year_texture',
    notes: 'Set by sy_damascus_spring (participate choice). Also applicable to Arab Spring optimism.',
  },

  syria_uprising_witness: {
    weight: 'major',
    category: 'political',
    description: 'Syrian character who witnessed the 2011 uprising from inside Syria — street, balcony, or early flight.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by sy_march_2011. Required for downstream civil war events.',
  },

  china_intellectual_silenced: {
    weight: 'major',
    category: 'political',
    description: 'Chinese intellectual or professional who narrowed their work under the post-2012 Xi-era tightening — the smaller boundary becoming the boundary.',
    intent: 'year_texture',
    notes: 'Set by cn_xi_tightening (careful choice).',
  },

  china_left_for_silence: {
    weight: 'major',
    category: 'political',
    description: 'Left China because of the intellectual and political tightening under Xi — the departure as a response to the closing of space.',
    intent: 'year_texture',
    notes: 'Set by cn_xi_tightening (leave choice).',
  },

  settlement_moved: {
    weight: 'major',
    category: 'political',
    description: 'Israeli who chose to move to a settlement in the occupied territories — building inside contested land, living inside the legal and ethical debate.',
    intent: 'year_texture',
    notes: 'Set by il_settlement_question (move choice).',
  },

  post_oslo_israeli_despair: {
    weight: 'moderate',
    category: 'political',
    description: 'Israeli who believed in Oslo and watched it unravel — the handshake, the assassination, Camp David, the intifada, the settlements continuing.',
    intent: 'year_texture',
    notes: 'Set by il_post_oslo_despair.',
  },

  pandemic_community_response: {
    weight: 'minor',
    category: 'achievement',
    description: 'Volunteered during the pandemic — deliveries, calls to the elderly, the specific usefulness of helping.',
    intent: 'none',
    notes: 'Set by pan_wealthy_west_specific when volunteer is chosen.',
  },

  junta_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Came of age under the Greek Colonels\' junta (1967–74) — learned to calibrate speech, endured the silence the regime required.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by gr_junta_announcement.',
  },

  junta_youth: {
    weight: 'moderate',
    category: 'historical',
    description: 'Adolescent years fell under the junta\'s cultural restrictions — banned music, banned hair, banned Sophocles.',
    intent: 'year_texture',
    notes: 'Set by gr_junta_culture.',
  },

  polytechnic_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Was present for or near the Athens Polytechnic uprising of November 1973 — the broadcast that said "this is the Polytechnic," the tank through the gate.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by gr_polytechnic_1973.',
  },

  revolution_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Was old enough to hear Theodorakis on the radio the day the Greek junta fell — songs known when they were illegal, played openly at last.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by gr_junta_fall_1974.',
  },

  metapolitefsi_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Voted in the first meaningful Greek elections after the junta — the specific feeling of an election that counts after years when it did not.',
    intent: 'year_texture',
    notes: 'Set by gr_metapolitefsi.',
  },

  gr_civil_war_memory: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up in the aftermath of the Greek Civil War 1944-49 — the family silences, the lists, the left/right fracture that ran through households and villages',
    intent: 'year_texture',
    notes: 'Set by gr_civil_war_memory. The war killed more Greeks than the German occupation; it was not discussed.',
  },

  gr_oxi_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the July 2015 OXI referendum — voted no to austerity, watched Tsipras accept terms more severe than what was rejected one week later',
    intent: 'year_texture',
    notes: 'Set by gr_oxi_2015.',
  },

  // Greece depth arc flags (events_greece_depth.js)
  greek_prosfyges_family: {
    weight: 'moderate',
    category: 'identity',
    description: 'Family heritage of the 1922 Asia Minor prosfyges — grandparents expelled from Smyrna, Pontus, or Eastern Thrace, carrying the geography of a lost world in speech.',
    intent: 'none',
    notes: 'Set by gr_prosfyges_family.',
  },

  greek_oxi_1940_gen: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived the October 1940 Oxi — Metaxas\'s refusal of Mussolini\'s ultimatum, the Greek army pushing the Italians back through the Pindus mountains in winter.',
    intent: 'none',
    notes: 'Set by gr_oxi_1940.',
  },

  greek_katochi_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Survived the Axis Occupation 1941-44 — the Katochi, the famine winter of 1941-42 in Athens when 300,000 died, the specific education of knowing what a government controls.',
    intent: 'none',
    notes: 'Set by gr_katochi.',
  },

  greek_elas_member: {
    weight: 'moderate',
    category: 'historical',
    description: 'Participated in EAM/ELAS — the Greek wartime resistance against the Axis, dominated by the Communist Party but broad-coalition, operating in the mountains and the cities.',
    intent: 'none',
    notes: 'Set by gr_elas_resistance.',
  },

  greek_civil_war_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the Greek Civil War 1946-49 — the war that ran through families and villages along a left/right line drawn by the occupation and not erased until 1981.',
    intent: 'event',
    notes: 'Set by gr_civil_war. Checked by gr_civil_war_late_reckoning.',
  },

  civic_record_denied: {
    weight: 'major',
    category: 'historical',
    description: 'Denied the Greek certificate of civic reliability (frouriko pistopiitiko) due to family political history — blocked from civil service, university, passport, emigration papers.',
    intent: 'none',
    notes: 'Set by gr_frouriko.',
  },

  greek_economic_miracle_gen: {
    weight: 'minor',
    category: 'historical',
    description: 'Came of age in the Greek economic miracle of the 1950s-60s — the fastest growth in Europe after West Germany, the first refrigerator, the concrete going up everywhere.',
    intent: 'none',
    notes: 'Set by gr_economic_miracle.',
  },

  greek_gastarbeiter: {
    weight: 'moderate',
    category: 'identity',
    description: 'Emigrated to West Germany as a gastarbeiter in the 1960s-70s — part of the 300,000 Greeks who went north under bilateral labour agreements, living between two languages and two countries.',
    intent: 'none',
    notes: 'Set by gr_gastarbeiter.',
  },

  estado_novo_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Came of age under Salazar\'s Estado Novo — learned the PIDE, the calibrated sentence, the shape of forty-eight years of permitted life.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by pt_estado_novo_texture.',
  },

  colonial_war_evaded: {
    weight: 'moderate',
    category: 'historical',
    description: 'Evaded Portuguese conscription by emigrating — most often to France — rather than serve in a colonial war the rest of the world had already ended.',
    intent: 'year_texture',
    notes: 'Set by pt_colonial_war.',
  },

  carnation_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Was present on April 25, 1974 — the Carnation Revolution, the day forty-eight years of dictatorship ended with flowers in rifle barrels.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by pt_carnation_revolution.',
  },

  eu_accession_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through Portugal\'s 1986 EC accession as an adult — the structural funds, the new roads, the specific relief of a generation that remembered dictatorship.',
    intent: 'year_texture',
    notes: 'Set by pt_eu_accession.',
  },

  marcos_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up under Ferdinand Marcos\'s martial law (1972–86) — the curfew, the arrests, the infrastructure projects, the calibrated public speech.',
    intent: 'year_texture',
    notes: 'Set by ph_martial_law_1972.',
  },

  aquino_assassination_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Was alive for Ninoy Aquino\'s assassination August 21, 1983 — the yellow ribbons, the eight-hour funeral procession.',
    intent: 'year_texture',
    notes: 'Set by ph_aquino_assassination_1983.',
  },

  edsa_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 1986 EDSA People Power Revolution — the nuns in front of tanks, Marcos boarding the helicopter to Hawaii.',
    intent: 'year_texture',
    notes: 'Set by ph_edsa_1986.',
    timestamped: true,
  },

  people_power_witness: {
    weight: 'moderate',
    category: 'historical',
    description: 'Was personally on EDSA — in the crowd when the tanks came and stopped.',
    intent: 'year_texture',
    notes: 'Set by ph_edsa_1986 (crowd branch).',
  },

  post_edsa_engaged: {
    weight: 'minor',
    category: 'political',
    description: 'Stayed politically engaged after the EDSA revolution despite post-democratisation disillusionment.',
    intent: 'none',
    notes: 'Set by ph_post_edsa_disillusionment.',
  },

  haiyan_witness: {
    weight: 'moderate',
    category: 'historical',
    description: 'Watched Typhoon Haiyan from a distance — the images from Tacloban, the international aid, the new scale of what a Philippine typhoon could mean.',
    intent: 'year_texture',
    notes: 'Set by ph_haiyan_2013 (watching branch).',
  },

  philippine_voter: {
    weight: 'minor',
    category: 'political',
    description: 'Navigated the Philippine political dynasty system as a voter — the recurring surnames, the turncoats, the specific calculus of lesser evils.',
    intent: 'none',
    notes: 'Set by ph_dynasty_texture.',
  },

  duterte_era: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived under Rodrigo Duterte\'s presidency (2016–22) — the Oplan Tokhang, nanlaban reports, thirty-thousand dead, sixty-percent approval.',
    intent: 'year_texture',
    notes: 'Set by ph_duterte_drug_war.',
  },

  duterte_dissent: {
    weight: 'moderate',
    category: 'political',
    description: 'Publicly or privately opposed the Duterte drug war — the extrajudicial killings, the barangay operations at night.',
    intent: 'year_texture',
    notes: 'Set by ph_duterte_drug_war (dissent branch).',
  },

  marcos_jr_era: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through Bongbong Marcos\'s 2022 election — the son of the dictator winning by the largest plurality in Philippine history.',
    intent: 'year_texture',
    notes: 'Set by ph_marcos_jr_return_2022.',
  },

  marcos_jr_dissent: {
    weight: 'minor',
    category: 'political',
    description: 'Felt the specific historical dread of Marcos Jr.\'s election — the memory of martial law, the history that wasn\'t taught.',
    intent: 'none',
    notes: 'Set by ph_marcos_jr_return_2022 (dread branch).',
  },

  polarization_era: {
    weight: 'minor',
    category: 'political',
    description: 'Lived through the 2016 US election — the result that confounded the polls and launched a prolonged national reckoning.',
    intent: 'none',
    notes: 'Set by we_us_election_2016.',
  },

  blm_era: {
    weight: 'minor',
    category: 'political',
    description: 'Lived through the George Floyd protests of 2020 — the largest protest movement in US history.',
    intent: 'none',
    notes: 'Set by we_george_floyd_2020.',
  },

  lava_jato_era: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through Brazil\'s Operation Car Wash (2014–18) — the corruption investigation that ended in Dilma\'s impeachment and Lula\'s imprisonment.',
    intent: 'none',
    notes: 'Set by we_brazil_lava_jato.',
  },

  bolsonaro_era: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through Bolsonaro\'s election and presidency (2018–22) — the polarisation, WhatsApp, evangelical alignment, Amazon acceleration.',
    intent: 'none',
    notes: 'Set by we_bolsonaro_2018.',
  },

  plano_real_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Experienced the Plano Real (1994) — the day Brazilian hyperinflation ended and prices stopped changing faster than you could track them.',
    intent: 'year_texture',
    notes: 'Set by we_brazil_plano_real.',
  },

  june_days_2013: {
    weight: 'minor',
    category: 'political',
    description: 'Lived through Brazil\'s 2013 Jornadas de Junho — the bus fare protest that became a million-person movement.',
    intent: 'none',
    notes: 'Set by we_brazil_june_days_2013.',
  },

  brazil_dictatorship_lived: {
    weight: 'major',
    category: 'political',
    description: 'Lived under Brazil\'s military dictatorship (1964–85) — AI-5, the DOPS, the DOI-CODI torture centers, and the "economic miracle" happening simultaneously.',
    intent: 'year_texture',
    notes: 'Set by brazil_1964_coup world event.',
  },

  bra_dictatorship_generation: {
    weight: 'major',
    category: 'political',
    description: 'Came of age during Brazil\'s AI-5 years (1968–79) — living inside the systematic silence of the torture state.',
    intent: 'year_texture',
    notes: 'Set by bra_ai5_dictatorship.',
  },

  bra_resistance_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Was on the edges of resistance during Brazil\'s dictatorship years — meetings, pamphlets, university networks.',
    intent: 'year_texture',
    notes: 'Set by bra_ai5_dictatorship (choice 2).',
  },

  bra_abertura_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through Brazil\'s abertura — the Amnesty Law of 1979 that freed the tortured and their torturers with identical paperwork.',
    intent: 'year_texture',
    notes: 'Set by bra_amnesty_1979.',
  },

  bra_diretas_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Was alive for Diretas Já 1984 — the million-person marches for direct elections, and the amendment that fell twenty-two votes short.',
    intent: 'year_texture',
    notes: 'Set by bra_diretas_ja_1984.',
  },

  bra_copa_generation: {
    weight: 'minor',
    category: 'cultural',
    description: 'Lived through the 2013–14 Copa protests — "Copa para quem?" and the 7–1 and the stadium in Brasília repurposed for cricket.',
    intent: 'year_texture',
    notes: 'Set by bra_copa_protests.',
  },

  bra_pandemic_witness: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived Brazil\'s 700,000 COVID deaths under Bolsonaro\'s pandemic denialism — the second-highest toll in the world.',
    intent: 'year_texture',
    notes: 'Set by bra_bolsonaro_covid.',
  },

  carandiru_witness_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Was in Brazil in 1992 when military police killed 111 prisoners in Carandiru in thirty minutes — the single deadliest act of state violence since the dictatorship.',
    intent: 'event',
    notes: 'Set by carandiru_massacre_1992 world event. Follow-through: bra_carandiru_late (late_life, conviction overturned, colonel ran for office).',
  },

  carandiru_personal_proximity: {
    weight: 'major',
    category: 'criminal_justice',
    description: 'Had personal proximity to Carandiru — knew people who were there, or had been inside the criminal justice system that Carandiru was part of.',
    intent: 'none',
    notes: 'Set by bra_carandiru_proximity (criminal record branch). Self-contained — the proximity is the texture.',
  },

  bra_hyperinflation_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived Brazil\'s hyperinflation years (1986–1994) — prices changing daily, currencies renamed, the Plano Real shock of overnight stability.',
    intent: 'year_texture',
    notes: 'Set by bra_hyperinflation.',
  },

  bra_plano_real_optimist: {
    weight: 'minor',
    category: 'historical',
    description: 'Embraced the 1994 Plano Real as Brazil\'s economic modernisation — stable prices as proof of a new country.',
    intent: 'year_texture',
    notes: 'Set by bra_hyperinflation (choice 2).',
  },

  bra_carandiru_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the 1992 Carandiru massacre — 111 inmates killed by military police, the commander acquitted and elected to the state assembly.',
    intent: 'year_texture',
    notes: 'Set by bra_carandiru_1992.',
  },

  bra_nordestino_stayed: {
    weight: 'minor',
    category: 'historical',
    description: 'Remained in Brazil\'s drought-stricken Northeast while others migrated south — the ones who stayed in the sertão\'s diminishing towns.',
    intent: 'year_texture',
    notes: 'Set by bra_nordestino_migration (choice 2).',
  },

  bra_lula_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived Lula\'s 2002 election — the metalworker-turned-president, Bolsa Familia, and the first Brazilian government that many poor citizens felt acknowledged their existence.',
    intent: 'year_texture',
    notes: 'Set by bra_lula_election.',
  },

  bra_lava_jato_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived Operation Car Wash — the anti-corruption investigation that imprisoned Lula, elected Bolsonaro, and was later ruled to have been politically biased.',
    intent: 'year_texture',
    notes: 'Set by bra_lava_jato.',
  },

  bra_january_8_witness: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the January 8, 2023 storming of Brazil\'s Congress, Planalto Palace, and Supreme Court by Bolsonaro supporters after Lula\'s inauguration.',
    intent: 'year_texture',
    notes: 'Set by bra_january_8_2023.',
  },

  corralito_survivor: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 2001 Argentine corralito — bank accounts frozen, withdrawals limited to $250/week, dollar savings eventually converted to devalued pesos.',
    intent: 'year_texture',
    notes: 'Set by la_arg_corralito_2001.',
  },

  arg_cacerolazos_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the December 19–20 2001 cacerolazos — pot-banging protests that drove President de la Rúa to flee by helicopter from the Casa Rosada.',
    intent: 'year_texture',
    notes: 'Set by la_arg_cacerolazos.',
  },

  cinco_presidentes_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through five Argentine presidents in twelve days (Dec 20, 2001 – Jan 1, 2002) — the governing collapse that followed the corralito.',
    intent: 'year_texture',
    notes: 'Set by la_arg_cacerolazos.',
  },

  piquetero_era: {
    weight: 'minor',
    category: 'political',
    description: 'Navigated Argentina\'s 2001–04 piquetero movement — unemployed workers blocking roads with burning tires when unemployment hit 25%.',
    intent: 'year_texture',
    notes: 'Set by la_arg_piqueteros.',
  },

  kirchner_recovery_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Witnessed the Kirchner-era economic recovery 2003–11 after the 2001 collapse — debt restructuring, soy boom, unemployment halved.',
    intent: 'year_texture',
    notes: 'Set by la_arg_kirchner_recovery.',
  },

  franco_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up in school under Franco — the portrait, Una Grande y Libre, the calibrated classroom where the boundary between sayable and unsayable was learned early.',
    intent: 'year_texture',
    notes: 'Set by es_franco_school.',
  },

  transicion_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through La Transición — Franco\'s death 1975, the constitutional process, first democratic elections 1977, the 1978 constitution.',
    intent: 'year_texture',
    notes: 'Set by es_franco_death_1975.',
  },

  movida_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age during La Movida Madrileña — the cultural explosion of 1978–85, the reaction against forty years of Francoism, Almodóvar, the city at 4am.',
    intent: 'year_texture',
    notes: 'Set by es_la_movida.',
  },

  spain_1992_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Experienced 1992 as Spain\'s arrival moment — Barcelona Olympics, Expo Sevilla, AVE rail, the measurable distance from 1975.',
    intent: 'year_texture',
    notes: 'Set by es_1992.',
  },

  spain_catalan_conflict_lived: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the 2017 Catalan independence referendum and its aftermath — the fractured WhatsApp groups, the riot gear at ballot boxes, the constitutional position and its contradictions.',
    intent: 'year_texture',
    notes: 'Set by es_catalan_independence_2017.',
  },

  madrid_11m_lived: {
    weight: 'moderate',
    category: 'historical',
    description: 'Present in Spain during 11-M, March 11, 2004: 191 dead on four commuter trains at rush hour. Aznar\'s government managed information about the perpetrators for three days before the general election.',
    intent: 'year_texture',
    notes: 'Set by es_11m_2004. Both branches set this flag.',
  },

  indignados_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Came of age in Spain during the 15-M movement (May 2011): Puerta del Sol occupied for weeks, "No nos representan," youth unemployment at 46%. Eventual precursor to Podemos and end of bipartidismo.',
    intent: 'year_texture',
    notes: 'Set by es_15m_2011.',
  },

  geracao_rasca_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Portuguese "desperate generation" — lived the 2011 crisis and the March 12 Geração à Rasca protests (300K in Lisbon, largest since 1974). Signs read "Parva que Sou." Bailout followed six weeks later.',
    intent: 'year_texture',
    notes: 'Set by pt_geracao_rasca_2011.',
  },

  quiet_resistance: {
    weight: 'moderate',
    category: 'political',
    description: 'Practiced quiet resistance under an authoritarian system — the small refusal, the lesson that didn\'t include the required paragraph, the form filled incorrectly, the question asked that wasn\'t on the list.',
    intent: 'year_texture',
    notes: 'Set by events_career_regime.js (teacher, nurse, collective worker), events_gulf_east.js (gulf_female_navigation choice).',
  },

  reform_era_china: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age during China\'s reform and opening up (Deng era, post-1978) — the transition from planned scarcity to market possibility that reorganised the country within a decade.',
    intent: 'year_texture',
    notes: 'Set by world event we_china_reform_era.',
  },

  handover_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the 1997 Hong Kong handover — one country, two systems, fifty years; the flags changing over the harbour at midnight.',
    intent: 'year_texture',
    notes: 'Set by world event we_hong_kong_handover_1997.',
  },

  korean_miracle_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up inside South Korea\'s compressed economic miracle — the jump from post-war subsistence to semiconductor exporter inside a generation.',
    intent: 'year_texture',
    notes: 'Set by world event we_korea_economic_miracle and events_country_arcs.js.',
  },

  india_tech_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Part of India\'s IT and outsourcing generation — the Bangalore campuses, the night shifts, the salary that rewrote what an Indian middle-class life could look like.',
    intent: 'year_texture',
    notes: 'Set by world event we_india_tech_boom.',
  },

  oil_boom_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up in a country transformed by oil wealth — the infrastructure arriving suddenly, the state subsidies, the specific relationship to work that petro-wealth creates.',
    intent: 'year_texture',
    notes: 'Set by multiple Gulf/Nigeria world events including we_gulf_oil_boom, we_nigeria_oil_boom, we_kuwait_oil_boom.',
  },

  decolonization_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed independence — the flag change, the first national government, and the decades-long work of building a country from the infrastructure colonialism left behind.',
    intent: 'year_texture',
    notes: 'Set by multiple independence world events (African, Asian, Southeast Asian) across worldEvents.js.',
  },

  tuol_sleng_witnessed: {
    weight: 'moderate',
    category: 'historical',
    description: 'Visited Tuol Sleng (S-21) — saw the intake photographs of the 17,000 prisoners, most of whom did not survive; left with unanswerable questions.',
    intent: 'year_texture',
    notes: 'Set by cam_tuol_sleng.',
  },

  cochabamba_witness: {
    weight: 'minor',
    category: 'historical',
    description: 'Was present in Cochabamba during the 2000 Water War — the first successful uprising against water privatisation in the world.',
    intent: 'event',
    notes: 'Set by we_cochabamba_water_war_2000 world event. Follow-through: ft46_cochabamba_late.',
  },

  jamaican_independence_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Was present in Jamaica for the August 6, 1962 independence celebrations — old enough to remember the flag going up and what was believed that night.',
    intent: 'event',
    notes: 'Set by we_jamaica_independence_1962. Follow-through: ft46_jamaican_independence_late.',
  },

  // ── DOMINICAN REPUBLIC ────────────────────────────────────────────────────────

  trujillo_generation: {
    weight: 'major', category: 'historical',
    description: 'Grew up under Trujillo\'s 31-year dictatorship — his photograph in every home, the SIM secret police, the required silence about certain people who disappeared.',
    intent: 'none', notes: 'Set by dr_trujillo_childhood.',
  },

  dr_massacre_generation: {
    weight: 'major', category: 'conflict',
    description: 'Generation aware of the 1937 Parsley Massacre — 17,000-35,000 Haitians and dark-skinned Dominicans killed on Trujillo\'s orders at the border.',
    intent: 'none', notes: 'Set by dr_parsley_massacre.',
  },

  dr_mirabal_generation: {
    weight: 'major', category: 'conflict',
    description: 'Generation defined by the assassination of the Mirabal sisters (November 25, 1960) — Patria, Minerva, and María Teresa, strangled on Trujillo\'s orders.',
    intent: 'none', notes: 'Set by dr_mirabal_sisters.',
  },

  dr_trujillo_gone: {
    weight: 'moderate', category: 'historical',
    description: 'Lived through the death of Trujillo (May 30, 1961) — the end of 31 years, the uncertainty of what comes after.',
    intent: 'none', notes: 'Set by dr_trujillo_killed.',
  },

  dr_1965_generation: {
    weight: 'major', category: 'conflict',
    description: 'Witnessed the 1965 Dominican civil war and US military intervention — 42,000 American troops, the Constitutionalists vs. the military junta.',
    intent: 'none', notes: 'Set by dr_1965_intervention.',
  },

  dr_baseball_generation: {
    weight: 'minor', category: 'identity',
    description: 'Grew up in the Dominican baseball pipeline — the academies, the scouts, the bonus as exit strategy, the dream measured in kilometres per hour.',
    intent: 'none', notes: 'Set by dr_baseball_dream.',
  },

  dr_remittance_generation: {
    weight: 'moderate', category: 'economics',
    description: 'Part of the Dominican remittance economy — either sending or receiving, the barrel from New York, Washington Heights as second capital.',
    intent: 'none', notes: 'Set by dr_remittance_economy.',
  },

  jamaican_garrison_community: {
    weight: 'major',
    category: 'political',
    description: 'Grew up in a Kingston garrison community — the neighborhood organized around party loyalty, the don as parallel state, JLP or PNP colors as civic identity.',
    intent: 'both',
    notes: 'Set by jam_garrison_childhood. Gates jam_area_don and jam_late_reckoning.',
  },

  jamaica_1980_election_witness: {
    weight: 'major',
    category: 'political',
    description: 'Lived through the 1980 Jamaican election — 800 people killed by garrison-distributed political guns before and after the October vote.',
    intent: 'event',
    notes: 'Set by jam_1980_election_violence.',
  },

  garrison_patron_dependent: {
    weight: 'moderate',
    category: 'political',
    description: 'Accepted the garrison patron system — the don\'s loans, his favors, in exchange for votes, silence, and looking away from what his money required.',
    intent: 'year_texture',
    notes: 'Set by jam_area_don (accepted choice).',
  },

  garrison_patron_refused: {
    weight: 'moderate',
    category: 'political',
    description: 'Tried to navigate outside the garrison patron system — not punished, but excluded from the network of favors that constitutes survival in a garrison community.',
    intent: 'year_texture',
    notes: 'Set by jam_area_don (refused choice).',
  },

  trinidad_oil_boom_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age during T&T\'s oil boom (1973-1986) — the specific affluence, the imported goods, the Caribbean neighbors arriving for work, before the price collapse.',
    intent: 'year_texture',
    notes: 'Set by tri_oil_boom_texture.',
  },

  trinidad_1990_coup_witness: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed the July 27, 1990 Jamaat al Muslimeen coup attempt — Abu Bakr\'s men holding parliament and TTT for six days, the Prime Minister on television at gunpoint.',
    intent: 'event',
    notes: 'Set by tri_1990_coup.',
  },

  voted_no_1958: {
    weight: 'moderate',
    category: 'historical',
    description: 'Voted No in Guinea\'s September 1958 independence referendum — the only French colony to refuse the French Community.',
    intent: 'event',
    notes: 'Set by gn_no_vote_1958. Gate for post-independence identity events.',
  },

  voted_yes_1958: {
    weight: 'minor',
    category: 'historical',
    description: 'Voted Yes in Guinea\'s 1958 referendum — the minority position in a country that voted 95% No.',
    intent: 'none',
    notes: 'Set by gn_no_vote_1958. Carries private dissent through Touré era.',
  },

  guinea_french_revenge_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age in Guinea after France withdrew everything — civil servants, vehicles, medicine, lightbulbs — in retaliation for the No vote.',
    intent: 'event',
    notes: 'Set by gn_french_revenge.',
  },

  sekou_toure_era_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through Sékou Touré\'s 1958–84 single-party state — mandatory PDG meetings, the culture of informers, the calibrated silence.',
    intent: 'year_texture',
    notes: 'Set by gn_sekou_toure_apparatus. Gates gn_camp_boiro.',
  },

  conte_era_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Lived through the two-day interval between Sékou Touré\'s death and Lansana Conté\'s military coup — the closest Guinea came to an open future.',
    intent: 'none',
    notes: 'Set by gn_conte_morning.',
  },

  guinea_independence_proclaimed: {
    weight: 'moderate',
    category: 'historical',
    description: 'Was present in Guinea for the September 28, 1958 independence vote — the no that shocked de Gaulle and started Sékou Touré\'s experiment.',
    intent: 'event',
    notes: 'Set by we_guinea_independence_1958. Follow-through: ft46_guinea_independence_late.',
  },

  negdel_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up in the negdel livestock collective — factory schedules applied to nomadic herding, security and absurdity coexisting.',
    intent: 'event',
    notes: 'Set by mn_negdel_life. Gates mn_negdel_dissolution_shock.',
  },

  mn_1990_revolution_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Alive during Mongolia\'s 1990 democratic revolution — hunger strikes in Sukhbaatar Square, the MPRP\'s unexpected agreement to multi-party elections.',
    intent: 'event',
    notes: 'Set by mn_1990_revolution.',
  },

  sankara_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up under Thomas Sankara\'s 1983–1987 revolution — cycling president, mass vaccinations, renamed country, cotton clothing replacing imported suits.',
    intent: 'year_texture',
    notes: 'Set by bfa_sankara_bicycle. Gates bfa_sankara_killed, bfa_compaore_silence, bfa_sankara_late_reckoning. Also used by sankara_assassination_1987 world event guard.',
  },

  burkina_vaccinated_child: {
    weight: 'minor',
    category: 'historical',
    description: 'Was vaccinated during Sankara\'s 1984 mass vaccination week — 2.5 million children in eight days.',
    intent: 'none',
    notes: 'Set by bfa_vaccination_week. Historical marker; no separate follow-through needed.',
  },

  burkina_renaming_memory: {
    weight: 'minor',
    category: 'historical',
    description: 'Was old enough to remember the country being renamed from Upper Volta to Burkina Faso in 1984 — learning to spell their own country again.',
    intent: 'none',
    notes: 'Set by bfa_upper_volta_renamed. Identity flavour; surfaces in late-life reckoning if desired.',
  },

  compaore_27_years: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through Blaise Compaoré\'s 27-year post-coup regime — the silence around Sankara\'s name, the unmarked grave, the pretense of normalcy.',
    intent: 'year_texture',
    notes: 'Set by bfa_compaore_silence. Annual texture: the name not spoken, the anniversary without ceremony.',
  },

  burkina_2014_uprising: {
    weight: 'major',
    category: 'historical',
    description: 'Was in Burkina Faso during the October 2014 uprising — crowds burning parliament, Compaoré gone within twenty-four hours.',
    intent: 'year_texture',
    notes: 'Set by bfa_uprising_2014 or burkina_uprising_2014 world event. Civic pride marker; the day popular action actually worked.',
  },

  mali_democracy_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived through Mali\'s March 1991 democratic revolution — the moment General ATT refused to fire on protesters and Traoré was arrested in his own home.',
    intent: 'year_texture',
    notes: 'Set by mli_revolution_1991. Late-life reckoning in mli_sahel_late_reckoning when democracy collapses in 2020.',
  },

  mali_2012_crisis_lived: {
    weight: 'major',
    category: 'political',
    description: 'Lived through the March 2012 coup by Captain Sanogo and the subsequent collapse of northern Mali to Tuareg separatists and Islamist groups within days.',
    intent: 'both',
    notes: 'Set by mli_coup_2012. Gates mli_timbuktu_islamists and mli_operation_serval.',
  },

  timbuktu_generation: {
    weight: 'moderate',
    category: 'cultural',
    description: 'Aware of the rescue of Timbuktu\'s 300,000+ ancient manuscripts — librarians moving them south to Bamako box by box before Islamist forces could destroy them.',
    intent: 'year_texture',
    notes: 'Set by mli_timbuktu_islamists. Year texture: what the manuscripts represent vs. what their survival costs.',
  },

  mali_serval_witness: {
    weight: 'moderate',
    category: 'political',
    description: 'Witnessed France\'s Operation Serval intervention in January 2013 — French jets retaking northern Malian cities, Malians cheering the soldiers of their former colonizer.',
    intent: 'year_texture',
    notes: 'Set by mli_operation_serval. Year texture: the specific irony of relief and contradiction held together.',
  },

  pol_left_noted: {
    weight: 'major',
    category: 'political',
    description: 'Left-leaning character in an authoritarian state who has been noted — not arrested, just entered into the surveillance apparatus; knows their file exists.',
    intent: 'year_texture',
    notes: 'Set by pol_left_authoritarian_noted. Annual awareness of the surveillance; the ongoing calibration of speech.',
  },

  dissident_file_known: {
    weight: 'major',
    category: 'political',
    description: 'Dissident character who has been told by a trusted contact that there is a state file on them — transcript of conversations, list of associates.',
    intent: 'event',
    notes: 'Set by pol_dissident_file_known. Guards pol_dissident_outlasts_regime.',
  },

  pol_reagan_era_left: {
    weight: 'moderate',
    category: 'political',
    description: 'Left-wing character in the wealthy West during 1979–1998 who experienced the rightward shift of their era — the world moving while they stayed.',
    intent: 'none',
    notes: 'Set by pol_left_1980s_rightward_shift.',
  },

  pol_nationalist_new_country: {
    weight: 'moderate',
    category: 'political',
    description: 'Nationalist character in a newly independent state — loving a country still deciding what it is, nationalism without a settled object.',
    intent: 'none',
    notes: 'Set by pol_nationalist_new_flag.',
  },

  pol_apolitical_pressured: {
    weight: 'minor',
    category: 'political',
    description: 'Apolitical character who said something that sounded like a position when pushed — surprised themselves.',
    intent: 'none',
    notes: 'Set by pol_apolitical_questioned (one branch).',
  },

  pol_centre_accused: {
    weight: 'moderate',
    category: 'political',
    description: 'Centrist character who has been told by both sides that the centre is a form of complicity or naivety.',
    intent: 'none',
    notes: 'Set by pol_centre_no_place.',
  },

  pol_dissident_outlasted_regime: {
    weight: 'major',
    category: 'political',
    description: 'Dissident character who outlasted the authoritarian regime they opposed — stood in the space where it was, chose whether to read their file.',
    intent: 'none',
    notes: 'Set by pol_dissident_outlasts_regime (both branches).',
  },

  pol_right_in_communist_state: {
    weight: 'major',
    category: 'political',
    description: 'Right-leaning character who lived under communist rule — performing public loyalty while holding private conviction, fluent in two political languages.',
    intent: 'year_texture',
    notes: 'Set by pol_right_under_communism. Annual texture of the double life: public and private speech.',
  },

  pol_nationalist_abroad: {
    weight: 'moderate',
    category: 'political',
    description: 'Nationalist character in diaspora — became the country in other people\'s eyes, defending positions they didn\'t choose to defend, nationalism lonelier and louder abroad.',
    intent: 'none',
    notes: 'Set by pol_nationalist_abroad.',
  },

  eritrean_liberation_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Grew up during the EPLF liberation struggle — Amharic-language schooling that contradicted Tigrinya identity at home, fighters moving through at night.',
    intent: 'none',
    notes: 'Set by eri_liberation_childhood. The whole arc documents this generation; no separate follow-through needed.',
  },

  eritrean_independence_generation: {
    weight: 'major',
    category: 'political',
    description: 'Was present in Eritrea for the April 1993 independence referendum and the celebrations that followed — 99.8% yes vote, thirty years of struggle resolved in a day.',
    intent: 'year_texture',
    notes: 'Set by eri_independence_1993. The joy is the baseline against which everything since is measured.',
  },

  eritrean_border_war_era: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 1998–2000 Eritrea-Ethiopia border war — the trenches, the conscription, the 70,000 dead, and the Badme border ruling that was never implemented.',
    intent: 'event',
    notes: 'Set by we_eritrea_border_war_1998. Follow-through: ft46_eritrean_border_war_late.',
  },

  eritrean_national_service: {
    weight: 'major',
    category: 'political',
    description: 'Subjected to Eritrea\'s indefinite national service — the Warsay-Yikaalo campaign, 500 nakfa/month, no legal right to leave the country without permission.',
    intent: 'year_texture',
    notes: 'Set by eri_border_war_1998 (both choices) and eri_leaving_decision (stayed). Annual texture until emigration or death.',
  },

  eri_national_service_endured: {
    weight: 'moderate',
    category: 'political',
    description: 'Chose to endure Eritrea\'s indefinite national service rather than flee — years of construction, teaching in remote villages, waiting for a release date that never came.',
    intent: 'event',
    notes: 'Set by eri_national_service_indefinite (stayed choice) and eri_leaving_decision (stayed choice).',
  },

  eri_g15_witness: {
    weight: 'moderate',
    category: 'political',
    description: 'Witnessed the September 2001 G-15 crackdown — eleven senior officials arrested without trial, independent press shut overnight, three journalists known personally.',
    intent: 'none',
    notes: 'Set by eri_g15_crackdown_2001. Echoed through the general political arc and late reckoning.',
  },

  eri_diaspora_tax_paid: {
    weight: 'minor',
    category: 'political',
    description: 'Paid the PFDJ two-percent diaspora tax — the receipt filed, name on the compliant list, family needs secured at the cost of funding the government you left.',
    intent: 'none',
    notes: 'Set by eri_diaspora_tax (paid choice).',
  },

  eri_diaspora_tax_refused: {
    weight: 'minor',
    category: 'political',
    description: 'Refused to pay the PFDJ diaspora tax — refusal noted, family in Eritrea potentially facing consequences, the collector moving on to the next family.',
    intent: 'none',
    notes: 'Set by eri_diaspora_tax (refused choice).',
  },

  activist: {
    weight: 'moderate',
    category: 'political',
    description: 'Engaged in organised civic or political activism — protests, campaigns, labour organising — beyond passive awareness.',
    intent: 'none',
    notes: 'Cross-cutting. Set by political awakening events across multiple regions.',
  },

  regime_self_censorship: {
    weight: 'moderate',
    category: 'political',
    description: 'Learned to self-censor under authoritarian pressure — the habitual pause before speaking that becomes second nature.',
    intent: 'none',
    notes: 'Cross-cutting. Set in authoritarian-context events. The learned silence that outlasts the regime.',
  },

  scholarship_recipient: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Received a scholarship that opened a door — the selection that made a different trajectory possible.',
    intent: 'none',
    notes: 'Cross-cutting. Set by school and education events. Distinct from first_gen_graduate (cause vs. outcome).',
  },

  coup_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through a military coup — the overnight restructuring of power, the curfew, the announcements on state radio.',
    intent: 'both',
    notes: 'Generic version of country-specific coup flags. Set across West African, Southeast Asian, Latin American arcs.',
  },

  activist: {
    weight: 'moderate',
    category: 'political',
    description: 'Became an activist — organized, demonstrated, or dedicated sustained energy to a political or social cause.',
    intent: 'both',
    notes: 'Generic flag set across political, social justice, environmental, and rights-based event arcs.',
  },

  regime_self_censorship: {
    weight: 'moderate',
    category: 'political',
    description: 'Learned to self-censor under an authoritarian regime — the automatic editing of thought before speech, the reflex of restraint.',
    intent: 'both',
    notes: 'Set across multiple authoritarian country arcs. Also gates career texture in education/government/media fields.',
  },

  political_aware: {
    weight: 'minor',
    category: 'political',
    description: 'Developed political consciousness — aware of structural power, regime character, and the conditions that produce what is experienced as ordinary life.',
    intent: 'both',
    notes: 'Set by protest, crisis, and injustice events. Checked in epitaph for summary language.',
  },

  independence_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age around national independence — the flag change, the new constitution, the particular energy of a country becoming itself.',
    intent: 'event',
    notes: 'Set by decolonisation and independence event arcs. Generic version of country-specific independence flags.',
  },

  liberation_war_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up during or immediately after a liberation war — national independence achieved through armed struggle.',
    intent: 'event',
    notes: 'Set by Angola, Zimbabwe, Mozambique, Bangladesh and other liberation war arcs.',
  },

  tur_ataturk_era: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through Atatürk\'s top-down modernisation programme — the Latin alphabet, dress code reforms, secularist state — and is positioned by it, for or against.',
    intent: 'both',
    notes: 'Set by tur_ataturk_alphabet event. Has year texture in Turkey section of buildYearTexture.',
  },

  tur_refugee_host_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived in Turkey during the Syrian refugee influx — neighbourhood transformation, economic pressure, and the dual reality of humanitarian obligation and political resentment.',
    intent: 'both',
    notes: 'Set by tur_syrian_refugees event. Has year texture in Turkey section of buildYearTexture.',
  },

  tur_istanbul_convention_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'A Turkish woman who lived through the government\'s 2021 withdrawal from the Istanbul Convention on violence against women — either protesting or watching.',
    intent: 'both',
    notes: 'Set by tur_istanbul_convention event (female only). Has year texture in Turkey section.',
  },

  partition_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Family was displaced or divided by a partition — the specific grief of a street or city on the other side of a new border.',
    intent: 'event',
    notes: 'Set by events_texture.js partition event. Gates ftw26_partition_late.',
  },

  depression_era_childhood: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up in a household still living with Depression-era habits — tins kept full, shoes mended, money never quite trusted to last.',
    intent: 'event',
    notes: 'Set by events_texture.js (Depression era). Gates ftw26_depression_era_late.',
  },

  nkrumah_era: {
    weight: 'major',
    category: 'historical',
    description: 'Was alive and old enough to feel the Nkrumah era in Ghana — the independence euphoria and the 1966 coup that ended it.',
    intent: 'event',
    notes: 'Set by events_west_africa.js. Gates ftw26_nkrumah_late.',
  },

  fiji_1987_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Was an adult during the 1987 Rabuka coup — the first time Fiji\'s democratic result was militarily overturned.',
    intent: 'event',
    notes: 'Set by fj_1987_coup_indo or fj_1987_coup_itaukei. Gates fj_late_life.',
  },

  fiji_coup_displaced_politically: {
    weight: 'major',
    category: 'political',
    description: 'Indo-Fijian whose elected government was removed by coup — the result stands in the record; what stands in the present is different.',
    intent: 'none',
    notes: 'Set by fj_1987_coup_indo. Contextual political marker; contributes to fj_late_life prose register.',
  },

  fiji_2000_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Was adult during the Speight coup of 2000 — 56 days of George Speight holding parliament and a prime minister hostage.',
    intent: 'none',
    notes: 'Set by fj_2000_coup. Contextual historical marker; contributing weight to fj_late_life.',
  },

  village_electrified: {
    weight: 'major',
    category: 'historical',
    description: 'The village got electricity during childhood or adolescence — one of the largest single quality-of-life changes in a person\'s life.',
    intent: 'none',
    notes: 'Set by wi_electrification or rural_texture electrification events. Guards against re-electrification events.',
  },

  water_war_generation: {
    weight: 'major',
    category: 'political',
    description: 'Experienced the Cochabamba Water War 2000 — the uprising that reversed the privatization of the city\'s water supply.',
    intent: 'none',
    notes: 'Set by wi_cochabamba_water_war protest choice.',
  },

  bonded_debt_disputed: {
    weight: 'moderate',
    category: 'political',
    description: 'Formally disputed the inheritance of a bonded debt — the magistrate hearing scheduled eight months away, continuing to work while it is pending.',
    intent: 'none',
    notes: 'Set by bl_debt_inherited second choice. bl_abolition_gap fires regardless (gates on bonded_labor).',
  },

  bonded_release_process: {
    weight: 'major',
    category: 'legal',
    description: 'Engaged with the NGO process for legal release from bonded labor — names given, reports filed, the process beginning.',
    intent: 'event',
    notes: 'Set by bl_abolition_gap first choice. Gates bl_liberation.',
  },

  sharecrop_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Black American sharecropper in the South — the settlement ledger, the debt that goes into next year, the counting that never comes out ahead.',
    intent: 'event',
    notes: 'Set by bl_sharecrop_ledger. Gates bl_sharecrop_north.',
  },

  great_migration: {
    weight: 'major',
    category: 'historical',
    description: 'Left the South for Northern industrial cities during the Great Migration — the check in real money, the different cold.',
    intent: 'none',
    notes: 'Set by bl_sharecrop_north first choice. Overlaps with Black American historical arc.',
  },

  local_memory_keeper: {
    weight: 'moderate',
    category: 'cultural',
    description: 'Began preserving community memory — names, places, events — that would otherwise disappear with the generation that experienced them.',
    intent: 'both',
    notes: 'Set by loc_memory_keeper. Needs year texture in buildYearTexture().',
  },

  local_legacy_rooted: {
    weight: 'moderate',
    category: 'legacy',
    description: 'Stepped back from a community role and saw the shape of what they built — a farewell that revealed the structure they had created.',
    intent: 'year_texture',
    notes: 'Set by loc_the_farewell. Gates loc_forgotten_in_time and loc_transmitted.',
  },

  local_advocate: {
    weight: 'minor',
    category: 'political',
    description: 'Wrote letters, attended meetings, and pushed formal channels to bring resources to their community — without receiving or expecting credit.',
    intent: 'none',
    notes: 'Set by loc_village_healer advocate choice.',
  },

  climate_activist: {
    weight: 'moderate',
    category: 'political',
    description: 'Actively participated in climate activism — school strikes, Extinction Rebellion, climate marches — as a young person in the 2015–2022 period.',
    intent: 'year_texture',
    notes: 'Set by dec10_climate_grief_young (activist choice).',
  },

  political_fracture_lived: {
    weight: 'moderate',
    category: 'political',
    description: 'Experienced the populist political fracture of the late 2010s as a personal rupture — Brexit, Trump, Bolsonaro, or equivalent — splitting families and friendships along newly visible lines.',
    intent: 'year_texture',
    notes: 'Set by dec10_populist_fracture.',
  },

  occupy_witness: {
    weight: 'minor',
    category: 'political',
    description: 'Witnessed or engaged with the Occupy movement (2011–12) — the camps, the vocabulary of the 99 percent, the question of what specifically was being demanded.',
    intent: 'year_texture',
    notes: 'Set by dec10_occupy_moment.',
  },

  political_awakening: {
    weight: 'moderate',
    category: 'political',
    description: 'Experienced a defining political awakening — a historical event that crystallised what had previously been diffuse into a clear political understanding.',
    intent: 'none',
    notes: 'Set by sl_soweto_student_1976 and similar politically clarifying events.',
  },

  political_prisoner_risk: {
    weight: 'moderate',
    category: 'political',
    description: 'Under active risk of political detention or arrest for their known political affiliations — the specific lived precarity of being on a list.',
    intent: 'none',
    notes: 'Set by sl_chile_1973_morning and similar events where political network activity creates documented risk.',
  },

  iit_graduate: {
    weight: 'minor',
    category: 'achievement',
    description: 'Graduated from an IIT or equivalent elite technical institution after the grinding preparation of JEE coaching culture.',
    intent: 'none',
    notes: 'Set by sl_india_iit_pressure (commit branch).',
  },

  examined_politics: {
    weight: 'minor',
    category: 'political',
    description: 'Explicitly reckoned with how and why their political views changed over a lifetime — distinguishing genuine wisdom from the comfort of accommodation.',
    intent: 'none',
    notes: 'Set by sl_late_political_reckoning.',
  },

  nl_colonial_reconciling: {
    weight: 'minor',
    category: 'political',
    description: 'Dutch citizen who receives the 2022 colonial apology as something — incomplete but not nothing.',
    intent: 'none',
    notes: 'Set by ft30_nl_colonial_apology (receiving path).',
  },

  nl_colonial_critical: {
    weight: 'minor',
    category: 'political',
    description: 'Dutch citizen who finds the formal colonial apology insufficient — the gap between what happened and what was named too wide to bridge with a press conference.',
    intent: 'none',
    notes: 'Set by ft30_nl_colonial_apology (critical path).',
  },

  tur_kemalist_identity: {
    weight: 'minor',
    category: 'political',
    description: 'Turkish character who holds Kemalist secularist identity as a considered position — the top-down modernisation project as worth defending.',
    intent: 'none',
    notes: 'Set by ft30_ataturk_positioned (secularist path).',
  },

  tur_religious_identity_reemergent: {
    weight: 'minor',
    category: 'political',
    description: 'Turkish character who sees the return of religious identity — Arabized call to prayer, Ottoman script recovery — as genuine rather than purely political.',
    intent: 'none',
    notes: 'Set by ft30_ataturk_positioned (religious identity path).',
  },

  uzb_karimov_era: {
    weight: 'moderate',
    category: 'political',
    description: 'Uzbek character who lived under Karimov\'s 27-year rule — the mahalla surveillance, the faith crackdown, the one-party consolidation.',
    intent: 'event',
    notes: 'Set by uzb_mahalla_system (both paths).',
  },

  uzb_andijan_witness: {
    weight: 'moderate',
    category: 'political',
    description: 'Aware of or affected by the Andijan massacre of May 13, 2005 — the government\'s killing of between 187 and 750+ protesters.',
    intent: 'none',
    notes: 'Set by uzb_andijan_2005 and andijan_massacre_2005 world event. Terminal: knowledge of a suppressed atrocity is its own endpoint.',
  },

  uzb_faith_under_surveillance: {
    weight: 'moderate',
    category: 'political',
    description: 'Practiced Islam under Karimov\'s religious surveillance state — where visible religiosity was coded as a security threat.',
    intent: 'none',
    notes: 'Set by uzb_faith_crackdown (both paths). Terminal: the surveillance is the arc.',
  },

  uzb_thaw_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Present during Mirziyoyev\'s partial opening — the released prisoners, the open borders, the tourists in Samarkand, the calibrated hope.',
    intent: 'none',
    notes: 'Set by uzb_mirziyoyev_opening (both paths). Terminal: the opening and the response to it are the arc.',
  },

  uzb_karimov_death_witness: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through Karimov\'s death in 2016 — the end of 27 years, the disorientation of a constant pressure suddenly absent.',
    intent: 'none',
    notes: 'Set by uzb_karimov_death. Terminal: the death-of-dictator moment is itself the endpoint; thaw generation follows.',
  },

  uzb_testigo_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Late-life Uzbek witness to the full arc — Soviet era, independence, Karimov, and whatever follows.',
    intent: 'none',
    notes: 'Set by uzb_late_reckoning. Terminal: late-life witness flags are endpoints of their arcs.',
  },

  kaz_astana_generation: {
    weight: 'minor',
    category: 'political',
    description: 'Watched Astana renamed Nur-Sultan and then Astana again — the city with three names in one generation.',
    intent: 'none',
    notes: 'Set by kaz_nursultan_rename.',
  },

  kaz_zhanaozen_witness: {
    weight: 'moderate',
    category: 'political',
    description: 'Aware of the Zhanaozen massacre of December 16, 2011 — 16 oil workers killed on Independence Day.',
    intent: 'event',
    notes: 'Set by kaz_zhanaozen_2011 and kaz_zhanaozen_massacre_2011 world event. Follow-through: ft46_kaz_zhanaozen_late.',
  },

  kaz_post_nazarbayev: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through Nazarbayev\'s managed resignation in 2019 — the thirty-year president who remained chairman, whose city was renamed for him.',
    intent: 'none',
    notes: 'Set by kaz_nazarbayev_steps_down.',
  },

  kaz_qantar_protester: {
    weight: 'moderate',
    category: 'political',
    description: 'Participated in the January 2022 Qantar protests — in the streets before the CSTO arrived and the internet went dark.',
    intent: 'none',
    notes: 'Set by kaz_qantar_protests (street path).',
  },

  kaz_qantar_witness: {
    weight: 'moderate',
    category: 'political',
    description: 'Witnessed the January 2022 Qantar crackdown — watching the internet go dark, 238 killed, 10,000 arrested.',
    intent: 'none',
    notes: 'Set by kaz_qantar_protests (home path) and kaz_qantar_2022 world event.',
  },

  kaz_testigo_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Late-life Kazakh witness: Soviet collectivisation through independence through oil boom through Qantar.',
    intent: 'none',
    notes: 'Set by kaz_late_reckoning. Terminal witness flag.',
  },

  // ─── TAJIKISTAN FLAGS ───────────────────────────────────────────────────────

  taj_soviet_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Grew up in Soviet-era Tajikistan — the industrial Dushanbe built from a Monday market town, Russian-medium schools.',
    intent: 'none',
    notes: 'Set by taj_soviet_dushanbe.',
  },

  taj_civil_war_witness: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed the Tajik civil war 1992–97 — 50,000–100,000 dead, one in ten displaced, most violent post-Soviet conflict in Central Asia.',
    intent: 'none',
    notes: 'Set by taj_civil_war_begins (both paths).',
  },

  taj_postwar_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age in the post-civil-war period — the peace that preserved the men who caused the war, the slow consolidation of Rahmon\'s power.',
    intent: 'none',
    notes: 'Set by taj_peace_1997.',
  },

  taj_rahmon_era: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived under Rahmon\'s "Leader of the Nation" rule — the title, the portrait in every office, the son positioned for succession.',
    intent: 'year_texture',
    notes: 'Set by taj_leader_of_nation. Needs year texture.',
  },

  taj_gbao_witness: {
    weight: 'major',
    category: 'historical',
    description: 'Present in GBAO during the 2022 security crackdown — armoured vehicles, internet blackout, deaths the government did not confirm.',
    intent: 'none',
    notes: 'Set by taj_gbao_2022 (in-GBAO path).',
  },

  taj_gbao_distant_witness: {
    weight: 'moderate',
    category: 'historical',
    description: 'Watched from outside GBAO as the internet went dark during the 2022 crackdown.',
    intent: 'event',
    notes: 'Set by taj_gbao_2022 (distant path). Follow-through: ft47_tajik_gbao_late.',
  },

  taj_rogun_generation: {
    weight: 'minor',
    category: 'political',
    description: 'Tajik who knows the Rogun Dam — sovereignty, electricity exports, the regional water conflict with Uzbekistan.',
    intent: 'none',
    notes: 'Set by taj_rogun_dam. Terminal.',
  },

  taj_remittance_household: {
    weight: 'moderate',
    category: 'economic',
    description: 'Part of a remittance-dependent household — the first of the month, the ruble fluctuations, the survival arithmetic.',
    intent: 'none',
    notes: 'Set by taj_remittance_life. Terminal.',
  },

  taj_testigo_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Late-life Tajik witness: Soviet Dushanbe through civil war through Rahmon\'s authoritarianism.',
    intent: 'none',
    notes: 'Set by taj_late_reckoning. Terminal.',
  },

  // ─── KYRGYZSTAN FLAGS ────────────────────────────────────────────────────────

  kyr_independence_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age in the post-Soviet collapse of Kyrgyzstan — factories closed, Soviet credentials worthless, economy improvised.',
    intent: 'none',
    notes: 'Set by kyr_independence_collapse.',
  },

  kyr_tulip_participant: {
    weight: 'moderate',
    category: 'political',
    description: 'Participated in or supported the Tulip Revolution of March 2005 — Akayev overthrown, storming of government buildings in Bishkek.',
    intent: 'none',
    notes: 'Set by kyr_tulip_revolution (participant path).',
  },

  kyr_tulip_skeptic: {
    weight: 'minor',
    category: 'political',
    description: 'Watched the Tulip Revolution with uncertainty — Bakiyev proved worse, the skepticism was vindicated.',
    intent: 'none',
    notes: 'Set by kyr_tulip_revolution (skeptic path).',
  },

  kyr_osh_kyrgyz_witness: {
    weight: 'major',
    category: 'historical',
    description: 'Kyrgyz witness to the June 2010 Osh ethnic violence — 400+ killed, Uzbek neighbourhoods burned, organised violence.',
    intent: 'none',
    notes: 'Set by kyr_osh_2010 (Kyrgyz path).',
  },

  kyr_osh_uzbek_witness: {
    weight: 'major',
    category: 'historical',
    description: 'Uzbek survivor of the June 2010 Osh ethnic violence — bore the brunt, 400+ killed, question of belonging in Kyrgyzstan.',
    intent: 'none',
    notes: 'Set by kyr_osh_2010 (Uzbek path).',
  },

  kyr_osh_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Carries the June 2010 silence — Kyrgyz-Uzbek coexistence after ethnic violence, the things not said around certain subjects.',
    intent: 'none',
    notes: 'Set by kyr_uzbek_coexistence. Terminal.',
  },

  kyr_three_revolutions_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Watched three presidents overthrown in fifteen years — Akayev 2005, Bakiyev 2010, Jeenbekov 2020. Most democratic, most chaotic.',
    intent: 'none',
    notes: 'Set by kyr_third_overthrow.',
  },

  kyr_kumtor_generation: {
    weight: 'minor',
    category: 'economic',
    description: 'Kyrgyz who knows the Kumtor gold mine — a third of exports, twenty years of disputes, nationalized 2021, the mountain as political argument.',
    intent: 'none',
    notes: 'Set by kyr_economy_reality.',
  },

  kyr_testigo_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Late-life Kyrgyz witness: independence shock through three overthrown presidents through Osh through today.',
    intent: 'none',
    notes: 'Set by kyr_late_reckoning. Terminal.',
  },

  // ─── TURKMENISTAN ─────────────────────────────────────────────────────────────

  tkm_turkmenbashi_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived through the Niyazov personality cult — renamed months, Ruhnama memorisation, rotating gold statue, banana bans, ballet bans.',
    intent: 'none',
    notes: 'Set by tkm_turkmenbashi_decrees.',
  },

  tkm_post_turkmenbashi: {
    weight: 'moderate',
    category: 'political',
    description: 'Alive for the December 2006 moment: what follows the man who renamed himself Father of All Turkmen?',
    intent: 'none',
    notes: 'Set by tkm_niyazov_death. Guards tkm_arkadag_era event.',
  },

  tkm_arkadag_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived the Berdymukhamedov/Arkadag era — portrait on cereal boxes, horse book, dynastic handoff to son in 2022.',
    intent: 'none',
    notes: 'Set by tkm_arkadag_era.',
  },

  tkm_gas_wealth_paradox: {
    weight: 'major',
    category: 'economic',
    description: 'Fourth-largest gas reserves in the world; bread ration cards. The gap between what the state has and what the people live on.',
    intent: 'none',
    notes: 'Set by tkm_gas_poverty_paradox.',
  },

  tkm_information_seeker: {
    weight: 'moderate',
    category: 'political',
    description: 'Found ways around Turkmenistan\'s information blockade — VPN, passed USB sticks, shortwave. Carries knowledge that cannot be spoken about.',
    intent: 'none',
    notes: 'Set by tkm_information_border.',
  },

  tkm_information_cautious: {
    weight: 'moderate',
    category: 'political',
    description: 'Chose the safety of not seeking blocked information. Lives with the particular cost of not knowing.',
    intent: 'none',
    notes: 'Set by tkm_information_border.',
  },

  tkm_exiled_silent: {
    weight: 'moderate',
    category: 'political',
    description: 'Turkmen in exile who stays publicly silent — the constraint of family safety extends across the border.',
    intent: 'none',
    notes: 'Set by ft32_departure_attempted_echo.',
  },

  tkm_exiled_speaking: {
    weight: 'moderate',
    category: 'political',
    description: 'Turkmen in exile who speaks publicly, with permission from family, knowing the cost.',
    intent: 'none',
    notes: 'Set by ft32_departure_attempted_echo.',
  },

  // ─── GHANA ────────────────────────────────────────────────────────────────────

  gha_rawlings_believer: {
    weight: 'moderate',
    category: 'political',
    description: 'Saw the Rawlings PNDC era as genuine accountability — the anger of the second lieutenant felt like overdue correction.',
    intent: 'none',
    notes: 'Set by gha_rawlings_pndc.',
  },

  gha_rawlings_skeptic: {
    weight: 'moderate',
    category: 'political',
    description: 'Skeptical of the PDC era — saw "accountability" shade into arbitrary power with no recourse.',
    intent: 'none',
    notes: 'Set by gha_rawlings_pndc.',
  },

  gha_first_voter: {
    weight: 'minor',
    category: 'political',
    description: 'Cast a ballot in Ghana\'s first multiparty election 1992 — a civilian Rawlings, a boycotted parliament, a first vote with all its limits.',
    intent: 'none',
    notes: 'Set by gha_first_election.',
  },

  gha_volta_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Grew up knowing the Akosombo Dam — the 80,000 displaced, the lake over the villages, the power that comes and goes with the water level.',
    intent: 'none',
    notes: 'Set by gha_volta_dam.',
  },

  gha_dumsor_era: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through dumsor 2014–16 — the 12/24 hour off-on cycle, the generators, the diesel economy, the hashtag.',
    intent: 'none',
    notes: 'Set by gha_dumsor.',
  },

  // ─── ECUADOR ──────────────────────────────────────────────────────────────────

  ecu_military_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Came of age under the 1963–79 military rule — the juntas, Rodríguez Lara\'s nationalist revolution, the managed press, the closed parties.',
    intent: 'both',
    notes: 'Set by ecu_military_dictatorship. Year texture + ft34 follow-through.',
  },

  ecu_correa_supporter: {
    weight: 'moderate',
    category: 'political',
    description: 'Believed in the Citizen Revolution — the hospitals built with oil money, the debt restructuring, the closed US base at Manta.',
    intent: 'event',
    notes: 'Set by ecu_correa_revolution. Follow-through: ft34_correa_supporter_late.',
  },

  ecu_correa_skeptic: {
    weight: 'moderate',
    category: 'political',
    description: 'Kept distance from the Citizen Revolution — watched the press restrictions tighten, opponents jailed, constitution bent toward permanence.',
    intent: 'event',
    notes: 'Set by ecu_correa_revolution. Follow-through: ft34_correa_skeptic_late.',
  },

  ecu_gang_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through Ecuador\'s 2023–24 gang crisis — the Villavicencio assassination, the TV studio takeover, the estado de excepción.',
    intent: 'event',
    notes: 'Set by ecu_gang_crisis_2024. Follow-through: ft34_gang_late.',
  },

  // ─── EL SALVADOR ─────────────────────────────────────────────────────────────

  slv_romero_death_witness: {
    weight: 'moderate',
    category: 'political',
    description: 'Alive in El Salvador when Archbishop Romero was assassinated on March 24, 1980 — the moment that made the war undeniable.',
    intent: 'event',
    notes: 'Set by slv_romero_death. Follow-throughs: ft35_romero_canonised, ft35_civil_war_late.',
  },

  slv_el_mozote_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Alive when the El Mozote bones were found in 1992 — the massacre denied for a decade, the forensic evidence that ended the denial.',
    intent: 'event',
    notes: 'Set by slv_el_mozote. Follow-through: ft35_mozote_late.',
  },

  slv_bukele_believer: {
    weight: 'moderate',
    category: 'political',
    description: 'Believed in Bukele\'s break from the ARENA/FMLN duopoly — hopeful that something new was possible.',
    intent: 'event',
    notes: 'Set by slv_bukele_arrival. Follow-through: ft35_bukele_believer_late.',
  },

  slv_bukele_skeptic: {
    weight: 'moderate',
    category: 'political',
    description: 'Skeptical of Bukele\'s governing style — recognised the concentration of power before its full extent was visible.',
    intent: 'event',
    notes: 'Set by slv_bukele_arrival. Follow-through: ft35_bukele_skeptic_late.',
  },

  slv_estado_excepcion_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the 2022+ estado de excepción — the mass arrests, CECOT, the silence on the streets, the uninvestigated innocents.',
    intent: 'event',
    notes: 'Set by slv_estado_excepcion. Follow-throughs: ft35_estado_late, ft35_civil_war_late.',
  },

  // ─── GUATEMALA ────────────────────────────────────────────────────────────────

  gua_1954_coup_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Alive when the CIA overthrew Árbenz in 1954 — Operation PBSUCCESS, the United Fruit Company, the end of Guatemala\'s democratic decade.',
    intent: 'event',
    notes: 'Set by gua_1954_coup. Follow-through: ft36_1954_late.',
  },

  gua_scorched_earth_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived through the scorched earth campaign 1981–83 — 669 massacres, 200k dead, the genocide the CEH named in 1999.',
    intent: 'both',
    notes: 'Set by gua_scorched_earth. Year texture + ft36_scorched_earth_ceh follow-through.',
  },

  gua_modelo_village_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Relocated to a military "model village" (polo de desarrollo) — the army\'s system for making survivors legible, visible, and supervised.',
    intent: 'both',
    notes: 'Set by gua_modelo_village. Year texture + ft36_modelo_village_late follow-through.',
  },

  gua_1996_peace_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Alive for the 1996 Peace Accords — 36 years of civil war ending with the generals still free and the land question unresolved.',
    intent: 'event',
    notes: 'Set by gua_peace_accords_1996. Follow-through: ft36_peace_late.',
  },

  gua_rios_montt_witness: {
    weight: 'moderate',
    category: 'political',
    description: 'Watched the 2013 genocide trial — the conviction that held for ten days, the procedural annulment, the death without sentence.',
    intent: 'event',
    notes: 'Set by gua_rios_montt_trial. Follow-through: ft36_rios_montt_late.',
  },

  // ─── HONDURAS ─────────────────────────────────────────────────────────────────

  hon_battalion_316_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Alive in Honduras during the Battalion 316 years (1980–1986) — the CIA-trained death squad that made union organisers, students, journalists, and priests disappear.',
    intent: 'event',
    notes: 'Set by hon_battalion_316. Follow-through: ft37_battalion_truth.',
  },

  hon_mitch_survivor: {
    weight: 'major',
    category: 'historical',
    description: 'Survived Hurricane Mitch (October 1998) — four days stalled, 7,000 dead, 80% of crops destroyed, thirty years of infrastructure gone; the Choluteca River changed course.',
    intent: 'both',
    notes: 'Set by hon_hurricane_mitch. Year texture + ft37_mitch_late follow-through.',
  },

  hon_zelaya_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Alive in Honduras on June 28, 2009 — the morning soldiers dragged Zelaya from the presidential residence in pyjamas and flew him to Costa Rica.',
    intent: 'event',
    notes: 'Set by hon_zelaya_coup. Follow-through: ft37_zelaya_late.',
  },

  hon_berta_witness: {
    weight: 'major',
    category: 'political',
    description: 'Knew of or witnessed Berta Cáceres — her activism stopping the Agua Zarca dam, the Goldman Prize in 2015, the assassination on March 2, 2016.',
    intent: 'event',
    notes: 'Set by hon_berta_caceres. Follow-through: ft37_berta_late.',
  },

  // ─── NICARAGUA ────────────────────────────────────────────────────────────────

  nic_somoza_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up under the Somoza dynasty (1936–1979) — the three-generation family dictatorship backed by the US, the National Guard as a family business.',
    intent: 'event',
    notes: 'Set by nic_somoza_dynasty. Follow-through: ft38_somoza_late.',
  },

  nic_revolution_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Present for the Sandinista Revolution of July 19, 1979 — Somoza\'s flight, the columns entering Managua, the forty-three-year dynasty ending in hours.',
    intent: 'both',
    notes: 'Set by nic_revolution_1979. Year texture + ft38_revolution_late follow-through.',
  },

  nic_literacy_generation: {
    weight: 'major',
    category: 'political',
    description: 'Participated in or benefited from the 1980 National Literacy Crusade — five months, kerosene lamps, literacy rising from 50% to 87% in one year.',
    intent: 'both',
    notes: 'Set by nic_literacy_crusade. Year texture + ft38_literacy_late follow-through.',
  },

  nic_election_1990_shock: {
    weight: 'moderate',
    category: 'political',
    description: 'Present for the 1990 electoral defeat of the FSLN — Ortega losing to Violeta Chamorro, the revolutionary government accepting democratic accountability.',
    intent: 'event',
    notes: 'Set by nic_election_1990. Follow-through: ft38_election_1990_late.',
  },

  nic_ortega_return: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through Ortega\'s return to power after 2007 — the FSLN back in government, the Árbol de la Vida roundabouts, the accommodation with the Catholic Church.',
    intent: 'year_texture',
    notes: 'Set by nic_ortega_returns. Year texture block in yearTexture.js.',
  },

  nic_2018_witness: {
    weight: 'major',
    category: 'historical',
    description: 'Present for the April 2018 uprising — students with morteros against riot police, 328 killed over five months, the government that came from 1979 shooting protesters.',
    intent: 'event',
    notes: 'Set by nic_uprising_2018. Follow-through: ft38_2018_witness_late.',
  },

  nic_protest_participant: {
    weight: 'moderate',
    category: 'political',
    description: 'Actively joined the April 2018 protests in Nicaragua — in the street, at the tranques, making the gesture with everyone who was still out.',
    intent: 'none',
    notes: 'Set by nic_uprising_2018 protest choice. Narrative distinction only.',
  },

  nic_nicaraguan_exile: {
    weight: 'major',
    category: 'political',
    description: 'Left Nicaragua after the 2018 crackdown — part of the tens of thousands in Costa Rica, Miami, Madrid; citizenship stripped, property expropriated.',
    intent: 'event',
    notes: 'Set by nic_exile_wave. Follow-through: ft38_exile_late.',
  },

  // ── JAPAN DEPTH (events_japan_depth.js) ──────────────────────────────────

  okinawa_battle_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the Battle of Okinawa 1945 — 94,000 civilian dead, a third of the island\'s population; the specific wound that is different from Hiroshima\'s wound.',
    intent: 'event',
    notes: 'Set by jpn_okinawa_battle_1945. Follow-through: ft64_okinawa_midlife, ft64_okinawa_textbook.',
  },

  jpn_article9_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age under the postwar constitution — Article 9, renouncing war, written in nine days by MacArthur\'s government and ratified into Japanese identity.',
    intent: 'year_texture',
    notes: 'Set by jpn_occupation_constitution (first choice).',
  },

  jpn_overwork_generation: {
    weight: 'moderate',
    category: 'social',
    description: 'Lived the karoshi era — 70-80 hour weeks, the office at 10 p.m., the body keeping a different account from the official one.',
    intent: 'year_texture',
    notes: 'Set by jpn_karoshi (first choice).',
  },

  jpn_kobe_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Present for the 1995 Kobe earthquake — 6,434 dead, the elevated highway on its side, the fires that spread for three days because the pipes broke.',
    intent: 'year_texture',
    notes: 'Set by jpn_kobe_earthquake_1995 (both choices).',
  },

  jpn_lost_generation: {
    weight: 'moderate',
    category: 'social',
    description: 'The employment ice age — graduated 1993–2005 into a Japan that had stopped hiring, the freeter economy, the "parasite singles" label, lifetime employment as something that happened to older siblings.',
    intent: 'year_texture',
    notes: 'Set by jpn_lost_generation event (both choices).',
  },

  jpn_confronted_history: {
    weight: 'moderate',
    category: 'identity',
    description: 'Sought out the history that Japanese textbooks leave out — comfort women, Nanjing, the full civilian toll — and now carries two versions of the country.',
    intent: 'event',
    notes: 'Set by jpn_comfort_women_silence (first choice). Follow-through: ft64_confronted_history_late.',
  },

  jpn_rural_decline_witness: {
    weight: 'moderate',
    category: 'social',
    description: 'Watched a Japanese rural village empty — the school closed, the cooperative dissolved, the post office on reduced hours; what remains is elderly, stubborn, and beautiful.',
    intent: 'year_texture',
    notes: 'Set by jpn_rural_village (auto-resolve).',
  },

  jpn_article9_defender: {
    weight: 'moderate',
    category: 'political',
    description: 'Stood in the 2015 protest against Abe\'s Article 9 reinterpretation — the 100,000 outside the Diet, the vote passing anyway, the feeling of having been counted and not having been the majority.',
    intent: 'year_texture',
    notes: 'Set by jpn_article9_debate_late (first choice).',
  },

  jpn_women_career: {
    weight: 'moderate',
    category: 'identity',
    description: 'Pushed into the general track in a Japan that officially allowed it but practically did not — the cost continuous and specific, the project completed.',
    intent: 'event',
    notes: 'Set by jpn_women_ceiling (first choice). Follow-through: ft64_women_career_late.',
  },

  jpn_fukushima_evacuee: {
    weight: 'major',
    category: 'displacement',
    description: 'Evacuated from the Fukushima exclusion zone after March 11, 2011 — the house is there, the documents were taken, the cat could not be caught, you are not allowed to live there.',
    intent: 'event',
    notes: 'Set by jpn_fukushima_evacuation (first choice). Follow-through: ft64_fukushima_evacuee_late.',
  },

  // ── ORAL TRADITION REGISTER (events_oral_tradition.js) ───────────────────

  oral_famine_memory: {
    weight: 'moderate',
    category: 'historical',
    description: 'Received the oral history of a famine from grandparents — the story that gets told the same way each time because something in the telling has fixed.',
    intent: 'year_texture',
    notes: 'Set by oral_grandmother_famine.',
  },

  oral_market_listening: {
    weight: 'minor',
    category: 'social',
    description: 'Learned to read adult faces when market news is bad — the specific stillness, the way conversation stops and starts in a different direction.',
    intent: 'year_texture',
    notes: 'Set by oral_market_news.',
  },

  oral_radio_generation: {
    weight: 'minor',
    category: 'social',
    description: 'Grew up in a village with one radio — the man who had been a soldier, the crowd gathering around it, the translation that adjusted what the official language said.',
    intent: 'year_texture',
    notes: 'Set by oral_radio_man.',
  },

  oral_political_awareness: {
    weight: 'minor',
    category: 'political',
    description: 'Received political news through a chain of translation — newspaper to teacher to parent to you — and learned that the echo is adjusted in transit.',
    intent: 'year_texture',
    notes: 'Set by oral_political_news.',
  },

  oral_displacement_considered: {
    weight: 'moderate',
    category: 'displacement',
    description: 'The family discussed leaving when violence arrived in the next district — a discussion that is itself a departure, a point after which you are not fully in the place.',
    intent: 'event',
    notes: 'Set by oral_violence_nearby (first choice). Follow-through: ft64_displacement_considered_late.',
  },

  oral_city_curiosity: {
    weight: 'minor',
    category: 'social',
    description: 'Heard about the city from the cousin who went there and came back with objects and stories — learned that the version and the city are not identical, and will find out how much when going.',
    intent: 'year_texture',
    notes: 'Set by oral_cousin_city.',
  },

  oral_independence_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed independence as a child — the teacher who ran into class, the sound at weddings from the crowd outside, the flag and money and officials who spoke your grandparents\' language.',
    intent: 'year_texture',
    notes: 'Set by oral_independence_announced.',
  },

  oral_harvest_failed: {
    weight: 'moderate',
    category: 'economic',
    description: 'Was old enough to watch the harvest assessment by silence — the men standing in the field, the length of the pause, the mother beginning the arithmetic that is not arithmetic.',
    intent: 'year_texture',
    notes: 'Set by oral_harvest_failed event.',
  },

  oral_elder_taught: {
    weight: 'minor',
    category: 'identity',
    description: 'Began receiving elder knowledge — the oral history of lineage, land, forbidden marriages — given in pieces on a schedule the elder controls.',
    intent: 'year_texture',
    notes: 'Set by oral_elder_knowledge.',
  },

  oral_disease_era: {
    weight: 'minor',
    category: 'health',
    description: 'Navigated a local disease outbreak through five contradictory accounts and learned to weight the version from someone who was actually present.',
    intent: 'year_texture',
    notes: 'Set by oral_disease_rumour.',
  },

  oral_soldiers_passed: {
    weight: 'moderate',
    category: 'conflict',
    description: 'Soldiers came through, took some things, moved on. "No one was hurt this time" — with the word "this time" in it even when no one says it.',
    intent: 'event',
    notes: 'Set by oral_soldiers_passed event. Follow-through: ft64_soldiers_passed_late.',
  },

  // ── VENEZUELA DEPTH (events_venezuela_depth.js) ───────────────────────────

  ven_chavez_generation: {
    weight: 'major',
    category: 'political',
    description: 'Came of political age in 1998 believing the Chávez project could transform Venezuela — the grandmother who cried, the sense that someone who spoke like your father had finally won.',
    intent: 'event',
    notes: 'Set by ven_chavez_1998 (first choice). Follow-through: ft65_chavez_gen_midlife, ft65_chavez_gen_late.',
  },

  ven_missions_beneficiary: {
    weight: 'moderate',
    category: 'social',
    description: 'Received access to Barrio Adentro social missions — the Cuban doctor at the módulo, the first blood pressure check, the subsidized medicine; something that had always been for other people becoming, once, for you.',
    intent: 'event',
    notes: 'Set by ven_barrio_adentro (auto-resolve). Follow-through: ft65_missions_late.',
  },

  ven_boom_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived through the oil petrodollar boom 2006–2013 — the shopping trips to Miami, the cheap imports, the appliances and cars, a country spending its future on its present.',
    intent: 'event',
    notes: 'Set by ven_oil_boom (both choices). Follow-through: ft65_boom_gen_late.',
  },

  ven_chavez_death_witness: {
    weight: 'major',
    category: 'historical',
    description: 'Present for the March 5, 2013 announcement at 4:25 p.m. — the grief of the barrio or the quiet of a different neighbourhood, and the question of what continues without him.',
    intent: 'year_texture',
    notes: 'Set by ven_chavez_death (auto-resolve).',
  },

  ven_food_scarcity_era: {
    weight: 'major',
    category: 'social',
    description: 'Lived through the food queue years 2015–2020 — the 5 a.m. number, the cornmeal calculation, the bachaquero premium, the woman with the two-day-old number.',
    intent: 'event',
    notes: 'Set by ven_food_line (both choices). Follow-through: ft65_food_scarcity_late.',
  },

  ven_2017_witness: {
    weight: 'major',
    category: 'political',
    description: 'Present for the 2017 protests — 126 dead, tear gas in residential streets, the guarimba and the colectivo response; in the street or watching from the window.',
    intent: 'event',
    notes: 'Set by ven_2017_protest (both choices). Follow-through: ft65_2017_witness_late.',
  },

  ven_hyperinflation_era: {
    weight: 'major',
    category: 'economic',
    description: 'Survived Venezuelan hyperinflation — three currencies in four years, prices doubling weekly, the dollar bill carried like a saint\'s image, the zeroes removed and then added again.',
    intent: 'event',
    notes: 'Set by ven_hyperinflation (auto-resolve). Follow-through: ft65_hyperinflation_late.',
  },

  ven_diaspora: {
    weight: 'major',
    category: 'displacement',
    description: 'Left Venezuela — by air with a bag, or across the Simón Bolívar bridge with almost nothing; one of 7 million who departed between 2015 and 2023.',
    intent: 'event',
    notes: 'Set by ven_departure (both choices). Follow-through: ft65_diaspora_first_year, ft65_diaspora_reckoning.',
  },

  ven_colectivo_era: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived with colectivos — pro-government armed groups on motorcycles in the barrios, the social navigation required, the grammar of what you say in front of them.',
    intent: 'year_texture',
    notes: 'Set by ven_colectivo (both choices).',
  },

  ven_dollarization_era: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived through Venezuela\'s informal dollarization from 2019 — prices in USD in a country whose revolution declared the dollar the enemy, the state tacitly permitting what it could no longer stop.',
    intent: 'event',
    notes: 'Set by ven_dollarization (auto-resolve). Follow-through: ft65_dollarization_late.',
  },

  ven_clap_system: {
    weight: 'moderate',
    category: 'social',
    description: 'Navigated the CLAP food distribution system — the party-linked monthly food bag, the coordinator whose goodwill is required, the food that is real regardless of what it represents.',
    intent: 'year_texture',
    notes: 'Set by ven_clap (first choice).',
  },

  ven_colombia_migrant: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Venezuelan migrant in Colombia — the PPT document, the informal economy or the formal job, the register in which "venezolano" is said.',
    intent: 'event',
    notes: 'Set by ven_migrant_colombia (both choices). Follow-through: ft65_colombia_migrant_late.',
  },

  // ── CUBA DEPTH (events_cuba_depth.js) ────────────────────────────────────

  cub_missile_crisis_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Was on the island during the 13 days of October 1962 — the anti-aircraft batteries, the broadcasts, the specific fear of knowing you are inside the thing the superpowers are negotiating about.',
    intent: 'year_texture',
    notes: 'Set by cub_dep_missile_crisis. Follow-through: ft66_missile_crisis_late.',
  },

  cub_nueva_trova_generation: {
    weight: 'moderate',
    category: 'cultural',
    description: 'Came of age with nueva trova — Silvio Rodríguez, Pablo Milanés; songs that were political and personal at the same time, containing ambivalences the official culture could not fully contain.',
    intent: 'year_texture',
    notes: 'Set by cub_dep_nueva_trova. Follow-through: ft66_nueva_trova_midlife.',
  },

  cub_doctor_export: {
    weight: 'major',
    category: 'career',
    description: 'Was sent on an internationalist medical mission — two or more years treating patients in a country that is not Cuba, paid by Cuba, returning with comparisons that do not resolve cleanly.',
    intent: 'event',
    notes: 'Set by cub_dep_doctor_mission (first choice). Follow-through: ft66_doctor_mission_return.',
  },

  cub_elian_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Was an adult during the Elián González affair 1999–2000 — the raid photograph, the custody battle as proxy for Cuba–Miami politics, the boy as referendum.',
    intent: 'none',
    notes: 'Set by cub_dep_elian. No downstream event needed.',
  },

  cub_dual_currency_era: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived the CUC/CUP dual-currency economy 1994–2021 — earning pesos, pricing life in convertibles, the two Cubas sharing the same streets.',
    intent: 'none',
    notes: 'Set by cub_dep_dual_currency. Follow-through: ft66_dual_currency_late (not flagged for intent).',
  },

  cub_education_generation: {
    weight: 'moderate',
    category: 'education',
    description: 'Educated under the Cuban revolutionary system — high literacy, equalised access, credentials that exceed what the domestic economy can absorb.',
    intent: 'event',
    notes: 'Set by cub_dep_education. Follow-through: ft66_cuba_education_late.',
  },

  cub_exit_visa_era: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived under the tarjeta blanca exit visa requirement — the state permission required to leave the island, removed in 2013.',
    intent: 'none',
    notes: 'Set by cub_dep_exit_visa. Follow-through: ft66_exit_visa_2013 (not flagged for intent).',
  },

  cub_lgbtq_suppression: {
    weight: 'major',
    category: 'identity',
    description: 'Experienced the revolutionary state\'s persecution of homosexuality — UMAP labour camps, Paragraph 69 university expulsions, CDR reporting, the gay man as incompatible with the New Man.',
    intent: 'none',
    notes: 'Set by cub_dep_paragraph_69. Yearbook reckoning available for future events.',
  },

  cub_cultural_conformity: {
    weight: 'moderate',
    category: 'cultural',
    description: 'Chose to work within the quinquenio gris cultural parameters — finding what could be made within constraints, the work that survived the gray period.',
    intent: 'none',
    notes: 'Set by cub_dep_gray_period (first choice).',
  },

  cub_rural_tobacco: {
    weight: 'minor',
    category: 'occupation',
    description: 'Worked in the Viñales tobacco vegas — knowledge of soil and leaf and harvest that the state quota cannot contain.',
    intent: 'none',
    notes: 'Set by cub_dep_vinales_tobacco.',
  },

  // ── PHILIPPINES DEPTH FLAGS ───────────────────────────────────────────────

  ph_bpo_generation: {
    weight: 'moderate',
    category: 'occupation',
    description: 'Worked the BPO/call center graveyard shift — the body clock inverted, speaking American English in the Manila night.',
    intent: 'year_texture',
    notes: 'Set by ph_dep_bpo_shift. Deserves yearTexture prose about night-shift body, the name you answered to.',
  },

  ph_fiesta_culture: {
    weight: 'minor',
    category: 'cultural',
    description: 'Shaped by the barrio fiesta — the patron saint\'s gravity that pulls the diaspora home once a year.',
    intent: 'year_texture',
    notes: 'Set by ph_dep_fiesta. YearTexture: fiesta season, the smell of lechón, the committee meetings.',
  },

  ph_basketball_generation: {
    weight: 'minor',
    category: 'cultural',
    description: 'Grew up on the concrete barangay court — the game that America left and the Philippines kept.',
    intent: 'none',
    notes: 'Set by ph_dep_basketball.',
  },

  ph_black_nazarene_devout: {
    weight: 'minor',
    category: 'religious',
    description: 'Joined the Black Nazarene procession — nine million faithful in the Manila streets, white towels reaching toward the image.',
    intent: 'none',
    notes: 'Set by ph_dep_black_nazarene.',
  },

  ph_moro_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'From the Moro homeland — a community whose identity is defined by the armed conflict with Manila and the long road to Bangsamoro autonomy.',
    intent: 'event',
    notes: 'Set by ph_dep_mindanao_moro. Follow-through: Bangsamoro Organic Law 2019, post-autonomy reckoning.',
  },

  ph_hacienda_generation: {
    weight: 'minor',
    category: 'economic',
    description: 'Grew up under the hacienda system — the land that was always that family\'s land, the cane that always required your labour.',
    intent: 'event',
    notes: 'Set by ph_dep_hacienda. Follow-through: land reform reckoning, city escape echo.',
  },

  ph_jeepney_generation: {
    weight: 'minor',
    category: 'cultural',
    description: 'Knew the jeepney routes the way you know the bones of a place — the fare passed forward, the chrome horses, the rosary on the dash.',
    intent: 'none',
    notes: 'Set by ph_dep_jeepney.',
  },

  ph_undas_generation: {
    weight: 'minor',
    category: 'religious',
    description: 'Observed Undas — the two-day occupation of the cemetery where the dead have a specific address your family has maintained.',
    intent: 'none',
    notes: 'Set by ph_dep_undas.',
  },

  ph_probinsya_generation: {
    weight: 'minor',
    category: 'cultural',
    description: 'Still from the probinsya even after years in Manila — the balikbayan box as proxy self, the province as permanent address of the heart.',
    intent: 'none',
    notes: 'Set by ph_dep_probinsya.',
  },

  ph_ofw_departed: {
    weight: 'moderate',
    category: 'migration',
    description: 'Took the OFW contract — the airport goodbye with the whole family, the two-year equation that becomes a way of life.',
    intent: 'event',
    notes: 'Set by ph_dep_ofw_calculus (go choice). Also sets emigrated. Follow-through: return, the changed house.',
  },

  ph_stayed_behind: {
    weight: 'minor',
    category: 'migration',
    description: 'Chose to stay when the economic logic pointed away — the one who receives the balikbayan box instead of sending it.',
    intent: 'event',
    notes: 'Set by ph_dep_ofw_calculus (stay choice). Follow-through: watching others leave, the calculus revisited.',
  },

}
