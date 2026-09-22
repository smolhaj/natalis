/**
 * NEW_ROSTER_FLAGS — the arcs for the eight countries added when the
 * roster-reference audit found content that already believed in them:
 * Austria, Croatia, Slovenia, Iceland, Moldova, Oman, Vanuatu, Bhutan.
 *
 * Kept in its own file rather than scattered across the six category files
 * because the whole set arrived together and will be maintained together.
 *
 * `intent` says where the flag is consumed, and `npm run check-flags` derives
 * coverage from the source rather than trusting this field — a flag whose
 * intent claims year texture it does not have is reported as partial.
 */
export const NEW_ROSTER_FLAGS = {

  // ── Austria: the account of itself the country did not give for forty years
  aut_heldenplatz_witness: {
    weight: 'major', category: 'historical', intent: 'both',
    description: 'Was a child in the crowd on the Heldenplatz in March 1938.',
    timestamped: false,
    notes: 'Gates the late-life reckoning event and the Austria year-texture block.',
  },
  aut_taught_silence: {
    weight: 'major', category: 'historical', intent: 'both',
    description: 'Learned, as a child, that the family does not discuss what it did or saw.',
    notes: 'Follow-through: aut_ft_silence_inherited, where the rule transfers to the next generation.',
  },
  aut_family_uneasy: {
    weight: 'moderate', category: 'historical', intent: 'year_texture',
    description: 'The household was not enthusiastic about the Anschluss and did not say so.',
  },
  aut_bombing_survivor: {
    weight: 'major', category: 'conflict', intent: 'year_texture',
    description: 'Sheltered through the bombing of Vienna in 1944–45.',
  },
  aut_occupation_childhood: {
    weight: 'moderate', category: 'historical', intent: 'year_texture',
    description: 'Childhood under the four-power occupation, 1945–55.',
  },
  aut_treaty_generation: {
    weight: 'major', category: 'historical', intent: 'both',
    description: 'Remembers the State Treaty of 1955 and what neutrality was bought with.',
    notes: 'Follow-through: aut_ft_neutrality_question at EU accession.',
  },
  aut_neutrality_defended: {
    weight: 'moderate', category: 'political', intent: 'year_texture',
    description: 'Holds neutrality as a principle rather than a historical price.',
  },
  aut_gemeindebau_life: {
    weight: 'major', category: 'economic', intent: 'both',
    description: 'Lives in municipal housing, in a tenancy that can outlast them.',
    notes: 'Follow-through: aut_ft_gemeindebau_late, the courtyard elder.',
  },
  aut_courtyard_elder: {
    weight: 'moderate', category: 'community', intent: 'year_texture',
    description: 'Has been in the same Gemeindebau courtyard longer than anyone else in it.',
  },
  aut_waldheim_reckoning: {
    weight: 'major', category: 'political', intent: 'both',
    description: 'Said out loud, in 1986, what the Waldheim documents meant about Austria.',
  },
  aut_waldheim_defended: {
    weight: 'major', category: 'political', intent: 'both',
    description: 'Defended Waldheim on the grounds that he did what everyone did.',
  },
  aut_waldheim_abstained: {
    weight: 'moderate', category: 'political', intent: 'year_texture',
    description: 'Got through 1986 without taking a position, and noticed the cost.',
  },
  aut_immigration_open: {
    weight: 'moderate', category: 'community', intent: 'year_texture',
    description: 'Knew the Gastarbeiter neighbours by name and used them.',
  },
  aut_immigration_distant: {
    weight: 'moderate', category: 'community', intent: 'year_texture',
    description: 'Kept a polite distance from the guest-worker families next door.',
  },
  aut_thursday_demos: {
    weight: 'major', category: 'political', intent: 'both',
    description: 'Walked the Ring every Thursday against the 2000 coalition.',
    notes: 'Follow-through: aut_ft_thursday_years_later, when the thing protested became the weather.',
  },
  aut_protest_exhausted: {
    weight: 'moderate', category: 'political', intent: 'year_texture',
    description: 'Was right and found that being right was not the relevant variable.',
  },
  aut_sovereignty_defensive: {
    weight: 'moderate', category: 'political', intent: 'year_texture',
    description: 'Found the outside criticism of Austria harder to take than what was criticised.',
  },
  aut_silence_broken: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Answered a child\'s direct question about the family\'s war, badly and completely.',
  },
  aut_silence_transmitted: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Changed the subject the way it was changed for them, and watched the rule transfer.',
  },
  aut_transmitted_memory: {
    weight: 'moderate', category: 'legacy', intent: 'year_texture',
    description: 'Gave a grandchild the small true thing rather than the dates.',
  },
  aut_withheld_memory: {
    weight: 'moderate', category: 'legacy', intent: 'year_texture',
    description: 'Gave the dates because the dates were safer.',
  },

  // ── Croatia and Slovenia: one federation, two 1990s
  adr_gastarbeiter_family: {
    weight: 'major', category: 'migration', intent: 'year_texture',
    description: 'Raised on remittance, with a father working in Germany ten months a year.',
  },
  adr_red_passport: {
    weight: 'major', category: 'historical', intent: 'both',
    description: 'Held the Yugoslav passport that worked in both directions.',
    notes: 'Follow-through: adr_ft_passport_downgrade, the queue at the consulate after 1992.',
  },
  adr_passport_nostalgia: {
    weight: 'moderate', category: 'historical', intent: 'year_texture',
    description: 'Misses a specific document rather than an ideology.',
  },
  adr_tito_generation: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Was alive in May 1980 and had never lived in a country without him.',
  },
  adr_si_independence: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Lived through Slovenia\'s ten-day war and the exit that followed.',
  },
  adr_si_luck_acknowledged: {
    weight: 'moderate', category: 'historical', intent: 'year_texture',
    description: 'Understands the ten days as an accident of demography rather than an achievement.',
  },
  adr_si_national_pride: {
    weight: 'moderate', category: 'political', intent: 'year_texture',
    description: 'Understands Slovenia\'s exit as something the country earned.',
  },
  adr_si_erased_aware: {
    weight: 'major', category: 'political', intent: 'both',
    description: 'Knows about the izbrisani — the 25,000 administratively deleted in 1992.',
    notes: 'Follow-through: adr_ft_si_erased_late, the Strasbourg ruling twenty years on.',
  },
  adr_si_erased_unaware: {
    weight: 'moderate', category: 'political', intent: 'year_texture',
    description: 'Treated the erasure as a paperwork problem.',
  },
  adr_si_erased_resolved: {
    weight: 'moderate', category: 'political', intent: 'year_texture',
    description: 'Saw the quietest injustice in the region finally named by a court.',
  },
  adr_si_crisis_generation: {
    weight: 'moderate', category: 'economic', intent: 'year_texture',
    description: 'Lived through Slovenia\'s 2013 banking crisis and the bad bank.',
  },
  adr_si_weekend_cottage: {
    weight: 'moderate', category: 'place', intent: 'year_texture',
    description: 'Has the family place in the hills and goes there most weekends of adult life.',
  },
  adr_hr_war_generation: {
    weight: 'major', category: 'conflict', intent: 'year_texture',
    description: 'Was in Croatia for the 1991–95 war in some capacity.',
  },
  adr_hr_veteran: {
    weight: 'major', category: 'military', intent: 'both',
    description: 'Volunteered in 1991 and served on a line for two years.',
    notes: 'Follow-through: adr_ft_veteran_pension, a category that became an identity.',
  },
  adr_hr_displaced: {
    weight: 'major', category: 'displacement', intent: 'both',
    description: 'Moved the family somewhere safer and spent the war hearing about it.',
  },
  adr_hr_kept_open: {
    weight: 'moderate', category: 'community', intent: 'year_texture',
    description: 'Kept a shop, a school or a clinic open through four years of war.',
  },
  adr_hr_oluja_celebrated: {
    weight: 'moderate', category: 'historical', intent: 'year_texture',
    description: 'Was in the square in August 1995 for the end of the war.',
  },
  adr_hr_oluja_complicated: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Noticed the thirty-kilometre column of tractors going north.',
  },
  adr_hr_serb_departed: {
    weight: 'major', category: 'displacement', intent: 'both',
    description: 'Left a Croatian village as a Serb, and the house was occupied within a month.',
  },
  adr_hr_serb_stayed: {
    weight: 'major', category: 'discrimination', intent: 'year_texture',
    description: 'Stayed as a Serb in wartime Croatia and learned the difference between unharmed and safe.',
  },
  adr_hr_emigrated: {
    weight: 'major', category: 'migration', intent: 'year_texture',
    description: 'Left for Ireland or Germany after Croatia\'s 2013 accession.',
  },
  adr_hr_stayed_behind: {
    weight: 'major', category: 'migration', intent: 'both',
    description: 'Stayed while half the school year left.',
    notes: 'Follow-through: adr_ft_emptied_village, the school that closed at nine children.',
  },
  adr_hr_season_economy: {
    weight: 'moderate', category: 'economic', intent: 'year_texture',
    description: 'Lives on a coastal summer and repairs things through the winter.',
  },
  adr_veteran_pension: {
    weight: 'moderate', category: 'economic', intent: 'year_texture',
    description: 'Draws the veterans\' benefit, in a queue where you can tell who was there.',
  },
  adr_veteran_refused_pension: {
    weight: 'moderate', category: 'moral', intent: 'year_texture',
    description: 'Stopped claiming the veterans\' benefit at real cost.',
  },
  adr_return_knocked: {
    weight: 'moderate', category: 'displacement', intent: 'year_texture',
    description: 'Knocked on the door of their old house and talked to the occupant about the roof.',
  },
  adr_return_withheld: {
    weight: 'moderate', category: 'displacement', intent: 'year_texture',
    description: 'Looked at the old house from the end of the lane and drove away.',
  },
  adr_village_emptied: {
    weight: 'moderate', category: 'place', intent: 'year_texture',
    description: 'Watched the village lose its school, and can name who is left and their ages.',
  },

  // ── Iceland: turf farms to a banking collapse inside a lifetime
  isl_occupation_wages: {
    weight: 'major', category: 'economic', intent: 'year_texture',
    description: 'Took a weekly cash wage on the wartime airfield — the thing that ended the farming economy.',
  },
  isl_left_the_farm: {
    weight: 'moderate', category: 'economic', intent: 'year_texture',
    description: 'Left the land for the wage and never went back.',
  },
  isl_stayed_farming: {
    weight: 'moderate', category: 'economic', intent: 'year_texture',
    description: 'Kept the sheep while the valley thinned.',
  },
  isl_cod_war_generation: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Watched a country with no army win a dispute with Britain four times.',
  },
  isl_herring_collapse: {
    weight: 'major', category: 'economic', intent: 'year_texture',
    description: 'Was there when the herring stopped arriving and the salting towns emptied.',
  },
  isl_sold_quota: {
    weight: 'major', category: 'economic', intent: 'both',
    description: 'Sold the family fishing quota — more money than a father saw in a lifetime.',
    notes: 'Follow-through: isl_ft_quota_village_late, the wake where you sit near the door.',
  },
  isl_kept_quota: {
    weight: 'moderate', category: 'moral', intent: 'year_texture',
    description: 'Kept fishing the quota while the arithmetic of not selling got harder.',
  },
  isl_quota_regret: {
    weight: 'moderate', category: 'moral', intent: 'year_texture',
    description: 'Is the richest person at the wake and sits near the door.',
  },
  isl_kreppan_protester: {
    weight: 'major', category: 'political', intent: 'both',
    description: 'Banged a kitchen pot outside the parliament until the government fell.',
  },
  isl_kreppan_debt: {
    weight: 'major', category: 'economic', intent: 'both',
    description: 'Held a foreign-currency mortgage when the króna halved.',
  },
  isl_accountability_seen: {
    weight: 'moderate', category: 'political', intent: 'year_texture',
    description: 'Watched bankers go to prison, which no other country managed.',
  },
  isl_everyone_related: {
    weight: 'moderate', category: 'community', intent: 'year_texture',
    description: 'Lives somewhere anonymity is not available and neither is being unaccounted for.',
  },

  // ── Moldova: the poorest country in Europe, a third of it abroad
  mda_deported_family: {
    weight: 'major', category: 'displacement', intent: 'both',
    description: 'Family taken in the July 1949 deportations; eight years in Siberia.',
  },
  mda_deportation_witness: {
    weight: 'major', category: 'historical', intent: 'both',
    description: 'Watched the carts go past at four in the morning and nobody went to the window.',
  },
  mda_russian_schooled: {
    weight: 'major', category: 'education', intent: 'year_texture',
    description: 'Put through the Russian school — the door, at the cost of the grandmother\'s kitchen.',
  },
  mda_kept_language: {
    weight: 'moderate', category: 'cultural', intent: 'year_texture',
    description: 'Kept Romanian in Cyrillic and lost two rungs of the ladder for it.',
  },
  mda_language_restored: {
    weight: 'moderate', category: 'cultural', intent: 'year_texture',
    description: 'Was there for the 1989 language law and the alphabet changing back.',
  },
  mda_transnistria_war: {
    weight: 'major', category: 'conflict', intent: 'year_texture',
    description: 'Lived through the 1992 war on the Dniester and the frozen thirty years after it.',
  },
  mda_labour_migrant: {
    weight: 'major', category: 'migration', intent: 'both',
    description: 'Went to Italy, Moscow or Israel for work, leaving children behind.',
    notes: 'Follow-through: mda_ft_video_childhood, the twelve-minute Sunday call.',
  },
  mda_stayed_behind: {
    weight: 'major', category: 'migration', intent: 'both',
    description: 'Stayed, and looks after four sets of grandparents and other people\'s children.',
    notes: 'Follow-through: mda_ft_grandparent_household.',
  },
  mda_returned_home: {
    weight: 'moderate', category: 'migration', intent: 'year_texture',
    description: 'Went home with less than planned, in time for the rest of a childhood.',
  },
  mda_stayed_abroad_too_long: {
    weight: 'major', category: 'migration', intent: 'year_texture',
    description: 'Two more years became six, and the politeness on the calls never changed.',
  },
  mda_raising_the_left_behind: {
    weight: 'major', category: 'family', intent: 'year_texture',
    description: 'Raising four children who are not theirs, in a category the state has no word for.',
  },
  mda_romanian_passport: {
    weight: 'moderate', category: 'migration', intent: 'year_texture',
    description: 'Took the Romanian passport — a document, and therefore an EU labour market.',
  },
  mda_declined_passport: {
    weight: 'moderate', category: 'identity', intent: 'year_texture',
    description: 'Declined the Romanian passport on the grounds of being Moldovan.',
  },
  mda_moldovan_identity: {
    weight: 'moderate', category: 'identity', intent: 'year_texture',
    description: 'Holds a Moldovan rather than Romanian identity, at election time and in the queue.',
  },
  mda_embargo_hit: {
    weight: 'moderate', category: 'economic', intent: 'year_texture',
    description: 'Lost the eastern wine market to a sanitary objection with a political timetable.',
  },
  mda_read_the_list: {
    weight: 'moderate', category: 'historical', intent: 'year_texture',
    description: 'Read the 1949 deportation list and found the signature at the bottom.',
  },
  mda_left_it_closed: {
    weight: 'moderate', category: 'historical', intent: 'year_texture',
    description: 'Left the archive closed so the village could keep working.',
  },

  // ── Oman: two countries, four years apart
  omn_old_sultanate: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Childhood under Said bin Taimur — three schools in the country, permits for everything.',
  },
  omn_renaissance_generation: {
    weight: 'major', category: 'historical', intent: 'both',
    description: 'Was alive for July 1970 and carries two Omans about four years apart.',
    notes: 'Follow-through: omn_ft_two_countries and omn_ft_oil_finite.',
  },
  omn_two_countries_carried: {
    weight: 'moderate', category: 'legacy', intent: 'year_texture',
    description: 'The only person in the room who feels the renaissance as distance rather than history.',
  },
  // ── Oman: the imamate war, 1954-59
  omn_imamate_family: {
    weight: 'major', category: 'political', intent: 'both',
    description: 'Family was on the imam\'s side when the interior lost its autonomy.',
    notes: 'Follow-through: omn_ft_imamate_after.',
  },
  omn_jebel_akhdar_survivor: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Was in the interior for the bombing and the SAS assault on the plateau.',
  },
  omn_falaj_destroyed: {
    weight: 'moderate', category: 'historical', intent: 'year_texture',
    description: 'The falaj above the village was bombed; the date palms died in order of distance from it.',
  },
  omn_imamate_buried: {
    weight: 'moderate', category: 'political', intent: 'year_texture',
    description: 'Took the government job and never raised the fifties again.',
  },
  omn_imamate_transmitted: {
    weight: 'moderate', category: 'legacy', intent: 'year_texture',
    description: 'Told the children the other version of 1959, once, in the kitchen.',
  },
  omn_dhofar_war: {
    weight: 'major', category: 'conflict', intent: 'year_texture',
    description: 'Lived through the Dhofar war, which the north was not told much about.',
  },
  omn_zanzibari_identity: {
    weight: 'major', category: 'identity', intent: 'year_texture',
    description: 'Swahili-speaking Omani from the Zanzibar return, keeping the language.',
  },
  omn_zanzibari_assimilated: {
    weight: 'moderate', category: 'identity', intent: 'year_texture',
    description: 'Lost the accent in two years and something else more slowly.',
  },
  omn_kafala_critical: {
    weight: 'moderate', category: 'moral', intent: 'year_texture',
    description: 'Says something about the arrangement half the workforce is inside.',
  },
  omn_kafala_accepted: {
    weight: 'moderate', category: 'moral', intent: 'year_texture',
    description: 'Decent to the people in their own house, incurious about the system.',
  },
  omn_ibadi_formation: {
    weight: 'moderate', category: 'religion', intent: 'year_texture',
    description: 'Formed by a tradition that predates the split everyone else arranges around.',
  },
  omn_diversification_doubt: {
    weight: 'moderate', category: 'economic', intent: 'year_texture',
    description: 'Has heard diversification in every speech since they were thirty.',
  },

  // ── Vanuatu: the Pandemonium, and a shortening cyclone season
  vut_condominium_childhood: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Schooled under the Anglo-French condominium — two of everything, none of it for you.',
  },
  vut_anglophone: {
    weight: 'major', category: 'education', intent: 'both',
    description: 'Came out of the English school, unable to follow half of Port Vila.',
    notes: 'Follow-through: vut_ft_language_divide.',
  },
  vut_francophone: {
    weight: 'major', category: 'education', intent: 'both',
    description: 'Came out of the French school, on the losing side of independence.',
    notes: 'Follow-through: vut_ft_language_divide.',
  },
  vut_bislama_working_language: {
    weight: 'moderate', category: 'cultural', intent: 'year_texture',
    description: 'Works in Bislama for the parts of the conversation that matter.',
  },
  vut_american_years: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Was there for the Espiritu Santo base, and for the jeeps in the sea afterwards.',
  },
  vut_independence_generation: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Saw both flags come down in July 1980, and the Santo rebellion that followed.',
  },
  vut_land_claim_won: {
    weight: 'major', category: 'economic', intent: 'year_texture',
    description: 'Won the custom-owner signature, the lease money, and an eleven-year silence from a cousin.',
  },
  vut_land_deferred: {
    weight: 'moderate', category: 'community', intent: 'year_texture',
    description: 'Deferred to the elder line and became the person everyone comes to next.',
  },
  vut_rebuilt_kastom: {
    weight: 'moderate', category: 'climate', intent: 'both',
    description: 'Rebuilt after Pam the way it was built before, and it is still standing.',
  },
  vut_rebuilt_modern: {
    weight: 'moderate', category: 'climate', intent: 'both',
    description: 'Rebuilt after Pam in iron and concrete, which is what peeled off next time.',
  },
  vut_climate_reckoning: {
    weight: 'major', category: 'climate', intent: 'year_texture',
    description: 'Has replaced the roof twice and the garden four times, and the interval is shortening.',
  },

  // ── Bhutan: Gross National Happiness, and who it was not extended to
  btn_serfdom_freed: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Family was on the list serfdom applied to when the king abolished it.',
  },
  btn_lhotshampa_expelled: {
    weight: 'major', category: 'displacement', intent: 'both',
    description: 'Nepali-speaking southerner pushed out by the 1990s census; twenty years in a camp.',
    notes: 'Follow-through: btn_ft_camp_generation, the poster at the travel agent.',
  },
  btn_lhotshampa_stayed: {
    weight: 'major', category: 'discrimination', intent: 'year_texture',
    description: 'Stayed on sufferance, with a citizenship category checked every time anything is needed.',
  },
  btn_television_generation: {
    weight: 'moderate', category: 'technology', intent: 'both',
    description: 'Was there in 1999 when television and the internet arrived on the same day.',
  },
  btn_first_election: {
    weight: 'moderate', category: 'political', intent: 'both',
    description: 'Voted in the first election, carrying something closer to obedience than enfranchisement.',
  },
  btn_gnh_examined: {
    weight: 'moderate', category: 'political', intent: 'year_texture',
    description: 'Has filled in the Gross National Happiness survey and noticed what it has no domain for.',
  },
  btn_told_the_story: {
    weight: 'moderate', category: 'displacement', intent: 'year_texture',
    description: 'Explained the census and the dress code, and watched it not fit what people knew.',
  },
  btn_kept_it_in: {
    weight: 'moderate', category: 'displacement', intent: 'year_texture',
    description: 'Said the country was beautiful, which is true, because they were tired.',
  },
  // ── The dzud follow-through, whose absence the registry corruption hid
  nomadic_rebuilt: {
    weight: 'moderate', category: 'economics', intent: 'year_texture',
    description: 'Bought back into the herd after a dzud, and now counts in bad winters survivable rather than in animals.',
  },
  nomadic_left_the_steppe: {
    weight: 'major', category: 'migration', intent: 'year_texture',
    description: 'Sold what the dzud left and took a fenced plot on the edge of Ulaanbaatar.',
  },

  // ── Germany 1933-49: the twelve years and the fifty-year argument after them
  // See src/data/events/geographic/events_germany_reich.js. The corpus had one
  // event touching the German 1930s before this.

  de_reich_child: {
    weight: 'major', category: 'historical', intent: 'both',
    description: 'A German childhood inside the twelve years.',
    notes: 'Follow-through: dereich_ft_1968_question, dereich_ft_photograph, dereich_ft_last_one.',
  },
  de_reich_family_approved: {
    weight: 'major', category: 'political', intent: 'year_texture',
    description: 'The household was relieved. The word at the table was order.',
  },
  de_reich_family_quiet: {
    weight: 'major', category: 'political', intent: 'year_texture',
    description: 'The household went quiet and turned the radio down.',
  },
  de_reich_family_opposed: {
    weight: 'major', category: 'political', intent: 'year_texture',
    description: 'Somebody in the house said the wrong thing out loud, once.',
  },
  de_hj_enthusiast: {
    weight: 'major', category: 'identity', intent: 'year_texture',
    description: 'Loved the Jungvolk or the Jungmädel, and was good at it.',
    notes: 'The hardest fact in the arc and the reason it is worth having.',
  },
  de_hj_attended: {
    weight: 'moderate', category: 'identity', intent: 'year_texture',
    description: 'Went, sang at the right volume, was never in trouble.',
  },
  de_hj_avoided: {
    weight: 'moderate', category: 'identity', intent: 'year_texture',
    description: 'Parents found a reason, at a cost to the father at work.',
  },
  de_classmate_vanished: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'A classmate was not there in the autumn and the register had been rewritten.',
  },
  de_asked_once: {
    weight: 'moderate', category: 'personal', intent: 'year_texture',
    description: 'Asked where she went, once, and got a hand flat on the table.',
  },
  de_said_it_too: {
    weight: 'major', category: 'moral', intent: 'year_texture',
    description: 'Repeated what the radio said, in a playground, and was agreed with.',
  },
  de_kristallnacht_witness: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Saw the street in the morning of 10 November 1938.',
  },
  de_small_decency: {
    weight: 'major', category: 'moral', intent: 'year_texture',
    description: 'A door left unlocked and a bag kept in a cupboard.',
  },
  de_believed_it: {
    weight: 'major', category: 'political', intent: 'year_texture',
    description: 'Believed it — not all of it, and the part believed was believed completely.',
  },
  de_listened_abroad: {
    weight: 'major', category: 'political', intent: 'year_texture',
    description: 'The household tuned past the end of the dial, which was a capital offence from 1943.',
  },
  de_denunciation_climate: {
    weight: 'moderate', category: 'political', intent: 'year_texture',
    description: 'The block warden on the second floor, who was neither paid nor threatened.',
  },
  de_marked_unreliable: {
    weight: 'moderate', category: 'political', intent: 'year_texture',
    description: 'A file with a word in it that shaped which jobs were available until about 1952.',
  },
  de_war_family: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'A father or brother called up; the ordinary condition of every street.',
  },
  de_father_lost_east: {
    weight: 'major', category: 'loss', intent: 'both',
    description: 'Missing in the east. No grave, no date.',
    notes: 'Follow-through: dereich_ft_father_never_found.',
  },
  de_no_grave: {
    weight: 'major', category: 'loss', intent: 'year_texture',
    description: 'The Red Cross card: date unknown, place unknown, case closed.',
  },
  de_father_returned_late: {
    weight: 'major', category: 'loss', intent: 'year_texture',
    description: 'Came back from Soviet captivity in 1949, and was somebody else.',
  },
  de_bombing_survivor: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'The siren, the cellar, the case packed by the door since 1942.',
  },
  de_bombed_out: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Dug out; everything the family owned in a handcart by morning.',
  },
  de_klv_evacuated: {
    weight: 'moderate', category: 'historical', intent: 'year_texture',
    description: 'Sent away with the school to the mountains, with a label on the coat.',
  },
  de_child_soldier_reich: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Flakhelfer, or a Panzerfaust in a park at fifteen.',
  },
  de_walked_away: {
    weight: 'major', category: 'moral', intent: 'year_texture',
    description: 'Put the weapon in a ditch and walked home through fields at night.',
  },
  de_zero_hour: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'May 1945: the flags into the stove and the street smelling of burning cloth.',
  },
  de_belief_collapsed: {
    weight: 'major', category: 'identity', intent: 'year_texture',
    description: 'Every instrument for telling true from false had been calibrated by the same people.',
  },
  de_relief_unspeakable: {
    weight: 'major', category: 'identity', intent: 'year_texture',
    description: 'It was relief, and the word could never be said out loud in this country.',
  },
  de_1945_violence: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'What happened in the town in those weeks, unwritten anywhere for fifty years.',
  },
  de_hunger_winter: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: '1946-47: the banisters into the stove, the tablecloth out to a farm.',
  },
  de_coal_child: {
    weight: 'moderate', category: 'historical', intent: 'year_texture',
    description: 'Took coal off the wagons, like every child in the street.',
  },
  de_truemmerfrau: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'Passed bricks and knocked the mortar off them, for a better ration card.',
  },
  de_rebuilt_it: {
    weight: 'moderate', category: 'legacy', intent: 'year_texture',
    description: 'Knows which parts of the city they put back by hand, and has never said.',
  },
  de_occupation_work: {
    weight: 'moderate', category: 'economic', intent: 'year_texture',
    description: 'Office work for the occupation, paid in cigarettes.',
  },
  de_vertriebene: {
    weight: 'major', category: 'historical', intent: 'year_texture',
    description: 'One of the twelve million who came west, from a farm on no buyable map.',
  },
  de_billeted_strangers: {
    weight: 'moderate', category: 'social', intent: 'year_texture',
    description: 'Four strangers in two rooms by order, and a mother who was civil and never warm.',
  },
  de_persilschein: {
    weight: 'major', category: 'moral', intent: 'year_texture',
    description: 'Two neighbours signed for you and you signed for two neighbours.',
  },
  de_denazified_honestly: {
    weight: 'major', category: 'moral', intent: 'year_texture',
    description: 'Answered the questionnaire accurately, at eighteen months and a career.',
  },
  de_reckoning_begun: {
    weight: 'major', category: 'identity', intent: 'year_texture',
    description: 'Thinks the arguing is right, and is one of the exhibits.',
  },
  de_reckoning_deferred: {
    weight: 'major', category: 'identity', intent: 'year_texture',
    description: 'It was wound up quietly around 1950 and the bill arrived in 1968.',
  },
  de_told_the_children: {
    weight: 'major', category: 'legacy', intent: 'year_texture',
    description: 'Told them, over four hours, and was not forgiven.',
  },
  de_deflected_the_children: {
    weight: 'major', category: 'legacy', intent: 'year_texture',
    description: 'Said they were a child, which was true and was not an answer.',
  },
  de_refused_the_children: {
    weight: 'major', category: 'legacy', intent: 'year_texture',
    description: 'Told them they had no idea. The conversation resumed eleven years later.',
  },
  de_named_it: {
    weight: 'major', category: 'legacy', intent: 'year_texture',
    description: 'Said the place-name on the back of the photograph out loud, with the family in the room.',
  },
  de_left_it_in_the_box: {
    weight: 'major', category: 'legacy', intent: 'year_texture',
    description: 'Said he was kind to you, which was true, as the last person who could say otherwise.',
  },
  de_told_it_straight: {
    weight: 'major', category: 'legacy', intent: 'year_texture',
    description: 'Told a room of fourteen-year-olds that the camping was good.',
  },
  de_gave_the_speech: {
    weight: 'moderate', category: 'legacy', intent: 'year_texture',
    description: 'Gave the answer they came for, which changed nothing, including them.',
  },
  de_wunder_bargain: {
    weight: 'major', category: 'economic', intent: 'year_texture',
    description: 'A new kitchen and a fortnight in Italy, and the subject that was not the subject.',
  },

  // -- Japan 1937-1952, the home front (events_japan_war.js) --------------
  jp_speaks_up_now: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Started saying things at sixty that they could not say at twelve.',
  },
  jp_war_home_front: {
    weight: 'moderate', category: 'world_events', intent: 'event',
    description: 'The war reached them as a street, a flag, and a belt of a thousand stitches.',
  },
  jp_kokumin_gakko: {
    weight: 'major', category: 'identity', intent: 'event',
    description: 'Schooled as a little citizen of the empire; can still recite the rescript.',
  },
  jp_believed_it: {
    weight: 'major', category: 'identity', intent: 'event',
    description: 'Believed every word of it, at eight, and has never settled what to do with that.',
  },
  jp_tonarigumi: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'The neighbourhood association: the rice, the bucket chain, the bamboo spear.',
  },
  jp_austerity_years: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Luxury is the enemy. The perm stopped; the trousers started.',
  },
  jp_dec8: {
    weight: 'moderate', category: 'world_events', intent: 'event',
    description: 'The eighth of December, and the relief of a war with a name.',
  },
  jp_hunger_years: {
    weight: 'major', category: 'health', intent: 'event',
    description: 'Barley, then sweet potato, then the vine. Cannot leave rice in a bowl.',
  },
  jp_metal_collection: {
    weight: 'moderate', category: 'world_events', intent: 'event',
    description: 'The temple bell, the railings, one of the two good pots.',
  },
  jp_factory_child: {
    weight: 'major', category: 'economic', intent: 'event',
    description: 'Pulled out of school into a factory at thirteen; the hands still know it.',
  },
  jp_saw_through_it: {
    weight: 'major', category: 'political', intent: 'event',
    description: 'Worked out what it was for, and did not say so.',
  },
  jp_sokai_child: {
    weight: 'major', category: 'geographic', intent: 'event',
    description: 'Evacuated by school to a country temple, three prefectures from home.',
  },
  jp_sokai_hunger: {
    weight: 'moderate', category: 'health', intent: 'event',
    description: 'A hunger that was a separate thing from wanting food.',
  },
  jp_saw_the_burned_city: {
    weight: 'major', category: 'world_events', intent: 'event',
    description: 'Went to look at the low city the morning after, and has never been able to describe it.',
  },
  jp_firebombing: {
    weight: 'major', category: 'world_events', intent: 'event',
    description: 'Was in a city on a night the wind made its own fire.',
  },
  jp_burned_out: {
    weight: 'major', category: 'economic', intent: 'event',
    description: 'The shape of where the house was: the step, the well, the scorched safe.',
  },
  jp_surrender_relief: {
    weight: 'moderate', category: 'world_events', intent: 'event',
    description: 'Felt relief first on the fifteenth of August, and was ashamed within the hour.',
  },
  jp_heard_the_broadcast: {
    weight: 'major', category: 'world_events', intent: 'event',
    description: 'Heard the voice nobody had heard before, over the cicadas.',
  },
  jp_occupation_child: {
    weight: 'moderate', category: 'world_events', intent: 'event',
    description: 'Was a child when the jeeps came, and the gum was the problem.',
  },
  jp_refused_the_gum: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Walked past with their chin up and has never been able to say what they were right about.',
  },
  jp_sumi_nuri: {
    weight: 'major', category: 'identity', intent: 'event',
    description: 'Blacked out their own textbook, at their own desk, with their calligraphy brush.',
  },
  jp_takenoko: {
    weight: 'major', category: 'economic', intent: 'event',
    description: 'The bamboo-shoot existence: the kimono, then the other kimono, then the scrolls.',
  },
  jp_repatriation_years: {
    weight: 'moderate', category: 'world_events', intent: 'event',
    description: 'Watched the lists go up at the ward office, and who came back different.',
  },
  jp_article_nine_generation: {
    weight: 'major', category: 'political', intent: 'event',
    description: 'Taught the new constitution as a subject, and heard the length of the pause.',
  },
  jp_told_the_child: {
    weight: 'major', category: 'relationships', intent: 'event',
    description: 'Told it properly, in the order it happened, including the happy part.',
  },
  jp_war_never_told: {
    weight: 'major', category: 'relationships', intent: 'event',
    description: 'Gave the short answer, knowing it would be all the grandchildren ever had.',
  },
  jp_gave_testimony: {
    weight: 'major', category: 'legacy', intent: 'event',
    description: 'Talked for an hour into a recorder, and said the bit about the sky twice.',
  },
}
