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

  // ── Kabyle Algeria (events_kabylie.js) ────────────────────────────────────
  kab_regrouped: {
    weight: 'major', category: 'displacement', intent: 'event',
    description: 'Moved down the mountain into a French regroupement camp while the village above became a forbidden zone.',
    notes: 'Set by kab_regroupement. Consumed by kab_ft_regroupement.',
  },
  kab_school_no_tamazight: {
    weight: 'moderate', category: 'education', intent: 'event',
    description: 'Schooled in an Arabic nobody at home spoke, with the language of the house punished in the yard.',
    notes: 'Set by kab_school_arabic. Consumed by kab_ft_school_child and kab_official_2016.',
  },
  kab_tafsut_1980: {
    weight: 'major', category: 'political', intent: 'event',
    description: 'Was there for the Berber Spring of April 1980.',
    notes: 'Set by kab_spring_campus and kab_spring_village. Consumed by kab_ft_tafsut and kab_official_2016.',
  },
  kab_boycott_year: {
    weight: 'moderate', category: 'education', intent: 'event',
    description: 'Lost the school year 1994-95 to the schoolbag strike.',
    notes: 'Set by kab_boycott_pupil. Consumed by kab_ft_boycott.',
  },
  kab_matoub_1998: {
    weight: 'moderate', category: 'cultural', intent: 'event',
    description: 'Lived through the killing of Matoub Lounès and the week the mountains burned for him.',
    notes: 'Set by kab_matoub_killed. Consumed by kab_ft_matoub.',
  },
  kab_black_spring: {
    weight: 'major', category: 'political', intent: 'event',
    description: 'Lived through the Black Spring of 2001 in Kabylie, 126 dead.',
    notes: 'Set by kab_black_spring_young and kab_black_spring_witness. Consumed by kab_ft_black_spring, kab_aarch, kab_national_2002.',
  },
  kab_aarch_delegate: {
    weight: 'moderate', category: 'community', intent: 'event',
    description: 'Sat for the village in the aarch coordination of 2001.',
    notes: 'Set by kab_aarch. Consumed by kab_ft_aarch.',
  },
  kab_emigrant_france: {
    weight: 'major', category: 'migration', intent: 'event',
    description: 'Left the Kabyle village for France, and owes it a line in the notebook.',
    notes: 'Set by kab_leave_old and kab_leave_new. Consumed by kab_ft_emigrant_money and kab_ft_emigrant_return.',
  },
  kab_flag_2019: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Held the Amazigh flag in 2019, the year it became an arrestable thing to carry.',
    notes: 'Set by kab_flag_2019. Consumed by kab_ft_flag.',
  },

  // ── Amhara Ethiopia (events_amhara.js) ────────────────────────────────────
  amh_church_school: {
    weight: 'moderate', category: 'religion', intent: 'event',
    description: 'Learned the fidel and the Psalms of David in Ge\'ez under the tree by the church.',
    notes: 'Set by amh_church_school. Consumed by amh_ft_church_school.',
  },
  amh_zemecha_student: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Sent to a southern village in the 1975 Zemecha to teach in Amharic.',
    notes: 'Set by amh_zemecha. Consumed by amh_ft_zemecha.',
  },
  amh_derg_soldier: {
    weight: 'major', category: 'military', intent: 'event',
    description: 'Conscripted into the Derg army and sent north.',
    notes: 'Set by amh_derg_conscript. Consumed by amh_ft_walked_home (May 1991).',
  },
  amh_walked_home: {
    weight: 'moderate', category: 'military', intent: 'event',
    description: 'Walked home through Tigray when the Derg army dissolved in 1991.',
    notes: 'Set by amh_ft_walked_home. Consumed by amh_ft_veteran.',
  },
  amh_resettled: {
    weight: 'major', category: 'displacement', intent: 'event',
    description: 'Put on a Derg resettlement truck from Wollo to Wollega in the 1984-86 famine.',
    notes: 'Set by amh_resettlement. Consumed by amh_ft_mete and amh_ft_leave_wollega.',
  },
  amh_1991_reclassified: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Became, after 1991, Amhara on a card before Ethiopian anywhere else.',
    notes: 'Set by amh_1991. Consumed by amh_ft_reclassified.',
  },
  amh_2005_voter: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Voted in the 2005 election and saw what the count cost.',
    notes: 'Set by amh_2005. Consumed by amh_ft_2015.',
  },
  amh_2016_protest: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Joined the stay-at-home strikes of the 2016 Amhara protests.',
    notes: 'Set by amh_2016. Consumed by amh_ft_2018.',
  },
  amh_war_2021: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Lived the 2020-22 war from an Amhara village, as its front line or its recruiting ground.',
    notes: 'Set by amh_war_wollo and amh_war_gojjam. Consumed by amh_ft_after_pretoria.',
  },
  amh_gulf_worker: {
    weight: 'major', category: 'migration', intent: 'event',
    description: 'Went to Saudi Arabia as a domestic worker, by the agency or by the sea road.',
    notes: 'Set by amh_gulf. Consumed by amh_ft_gulf_contract, amh_ft_gulf_deported, amh_ft_gulf_house.',
  },

  // ── Tajik Afghanistan (events_afghan_tajik.js) ────────────────────────────
  taj_panjshir_1982: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Hid in the side valleys of the Panjshir while the Soviet columns burned the villages.',
    notes: 'Set by taj_panjshir_offensive. Consumed by taj_ft_tanks.',
  },
  taj_jamiat_fighter: {
    weight: 'major', category: 'military', intent: 'event',
    description: 'Went up to the ridge with Massoud\'s men as a boy.',
    notes: 'Set by taj_mujahid. Consumed by taj_ft_disarm.',
  },
  taj_herat_1979: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Lived through the Herat uprising of March 1979 and its reprisal.',
    notes: 'Set by taj_herat_1979. Consumed by taj_ft_herat_grave.',
  },
  taj_kabul_1992: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Was in Kabul when the mujahideen factions fought over it, 1992-95.',
    notes: 'Set by taj_kabul_1992. Consumed by taj_ft_amnesty.',
  },
  taj_shomali_burned: {
    weight: 'major', category: 'displacement', intent: 'event',
    description: 'Driven off the Shomali plain in 1999 when the Taliban cut the vines and burned the villages.',
    notes: 'Set by taj_shomali_1999. Consumed by taj_ft_replant.',
  },
  taj_golden_needle: {
    weight: 'major', category: 'education', intent: 'event',
    description: 'Studied literature in Herat under the Taliban, disguised as a sewing class.',
    notes: 'Set by taj_golden_needle. Consumed by taj_ft_needle.',
  },
  taj_massoud_2001: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Heard, two days before the towers, that Massoud was dead.',
    notes: 'Set by taj_massoud. Consumed by taj_ft_massoud_week.',
  },
  taj_iran_worker: {
    weight: 'major', category: 'migration', intent: 'event',
    description: 'Crossed into Iran without papers to carry cement on Tehran building sites.',
    notes: 'Set by taj_iran_work. Consumed by taj_ft_deported.',
  },
  taj_panjshir_2021: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Was in the Panjshir when the Taliban flag went up over Bazarak, which in forty years had never happened.',
    notes: 'Set by taj_panjshir_2021. Consumed by taj_ft_valley_after.',
  },

  // ── Mende Sierra Leone (events_mende.js) ────────────────────────────────────
  mende_poro: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Went into the Poro bush as a boy and came out with the marks on his back.',
    notes: 'Set by mende_poro. Consumed by mende_ft_poro.',
  },
  mende_sande: {
    weight: 'moderate', category: 'identity', intent: 'event',
    description: 'Went into the Sande bush as a girl, with everything that meant.',
    notes: 'Set by mende_sande. Consumed by mende_ft_sande_daughter.',
  },
  mende_digger: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Dug for diamonds for three seasons at Tongo or in Kono, for a supporter.',
    notes: 'Set by mende_diamonds. Consumed by mende_ft_digger.',
  },
  mende_1982: {
    weight: 'major', category: 'political', intent: 'event',
    description: 'Was in Pujehun when the villages burned after the 1982 election.',
    notes: 'Set by mende_ndogboyosoi. Consumed by mende_ft_1982.',
  },
  mende_under_ruf: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Stayed in the village when the RUF came in 1991, and lived under them.',
    notes: 'Set by mende_ruf_kailahun / mende_ruf_pujehun. Consumed by mende_ruf_farm and mende_ft_trc.',
  },
  mende_fled_kailahun: {
    weight: 'major', category: 'displacement', intent: 'event',
    description: 'Walked from Kailahun to Kenema when the RUF came in 1991.',
    notes: 'Set by mende_ruf_kailahun. Consumed by mende_ft_return_kailahun.',
  },
  mende_refugee_guinea: {
    weight: 'major', category: 'displacement', intent: 'event',
    description: 'Fled over the border to the camps at Gueckedou in 1991.',
    notes: 'Set by mende_ruf_kailahun. Consumed by mende_ft_return_kailahun.',
  },
  mende_fled_pujehun: {
    weight: 'major', category: 'displacement', intent: 'event',
    description: 'Walked from Pujehun to the camp at Gondama outside Bo in 1991.',
    notes: 'Set by mende_ruf_pujehun. Consumed by mende_ft_return_pujehun.',
  },
  mende_displaced: {
    weight: 'major', category: 'displacement', intent: 'event',
    description: 'Village burned in the mid-nineties war; walked to Bo and never went back.',
    notes: 'Set by mende_flight_south. Consumed by mende_ft_displaced.',
  },
  mende_kamajor: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Was initiated into the Kamajors and held a checkpoint on the Bo road.',
    notes: 'Set by mende_kamajor. Consumed by mende_ft_kamajor, mende_norman, mende_ft_norman.',
  },
  mende_norman: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Watched Hinga Norman arrested by the Special Court in 2003.',
    notes: 'Set by mende_norman. Consumed by mende_ft_norman.',
  },
  mende_ebola: {
    weight: 'major', category: 'loss', intent: 'event',
    description: 'Lost an aunt to Ebola in 2014 and faced the burial team.',
    notes: 'Set by mende_ebola. Consumed by mende_ft_ebola.',
  },
  mende_dv: {
    weight: 'major', category: 'migration', intent: 'event',
    description: 'Won the American diversity visa lottery and went.',
    notes: 'Set by mende_dv_lottery. Consumed by mende_ft_america.',
  },

  // ── Hawiye Somalia (events_hawiye.js) ───────────────────────────────────────
  haw_campaign_1974: {
    weight: 'moderate', category: 'education', intent: 'event',
    description: 'Learned, or taught, the new Somali script in the 1974 rural literacy campaign.',
    notes: 'Set by haw_campaign_rural / haw_campaign_student. Consumed by haw_ft_campaign.',
  },
  haw_resettled: {
    weight: 'major', category: 'displacement', intent: 'event',
    description: 'Taken off the grazing land by truck in the 1974-75 drought and made a farmer on the river.',
    notes: 'Set by haw_dabadheer. Consumed by haw_ft_resettled.',
  },
  haw_ogaden: {
    weight: 'major', category: 'military', intent: 'event',
    description: 'Went to the Ogaden war in 1977 and walked back in 1978.',
    notes: 'Set by haw_ogaden_call. Consumed by haw_ft_ogaden.',
  },
  haw_sheltered: {
    weight: 'major', category: 'moral', intent: 'event',
    description: 'Hid a Darod family from the USC in January 1991.',
    notes: 'Set by haw_usc_city. Consumed by haw_ft_neighbour.',
  },
  haw_door_shut: {
    weight: 'major', category: 'moral', intent: 'event',
    description: 'Kept the door shut when the Darod family across the lane came to it in January 1991.',
    notes: 'Set by haw_usc_city. Consumed by haw_ft_door.',
  },
  haw_green_line: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Lived through the four months Mogadishu fired on itself across the Green Line.',
    notes: 'Set by haw_green_line. Consumed by haw_ft_green_line.',
  },
  haw_1993: {
    weight: 'major', category: 'conflict', intent: 'event',
    description: 'Was in Mogadishu in 1993, the summer of the hunt for Aidid and the third of October.',
    notes: 'Set by haw_1993. Consumed by haw_ft_film.',
  },
  haw_afgooye: {
    weight: 'major', category: 'displacement', intent: 'event',
    description: 'Fled Mogadishu for the Afgooye road in 2007.',
    notes: 'Set by haw_ethiopians. Consumed by haw_ft_afgooye.',
  },
  haw_kenya: {
    weight: 'major', category: 'migration', intent: 'event',
    description: 'Crossed into Kenya, to Dadaab and then Eastleigh.',
    notes: 'Set by haw_flee_kenya. Consumed by haw_ft_eastleigh.',
  },
  haw_minneapolis: {
    weight: 'major', category: 'migration', intent: 'event',
    description: 'Resettled from Eastleigh to Minneapolis.',
    notes: 'Set by haw_ft_eastleigh. Consumed by haw_ft_minneapolis.',
  },

  // ── Halpulaar Senegal (events_fouta.js) ─────────────────────────────────────
  fouta_emigrant: {
    weight: 'major', category: 'migration', intent: 'event',
    description: 'Sold two cows for the ticket and went to the foyer in Montreuil.',
    notes: 'Set by fouta_emigrate. Consumed by fouta_ft_emigrant_house and fouta_ft_emigrant_return.',
  },
  fouta_deportees: {
    weight: 'major', category: 'displacement', intent: 'event',
    description: 'Took in a family expelled across the river from Mauritania in 1989.',
    notes: 'Set by fouta_deportees. Consumed by fouta_ft_deportees.',
  },
  fouta_1989: {
    weight: 'moderate', category: 'moral', intent: 'event',
    description: 'Was there when the Mauritanian shop was emptied in April 1989.',
    notes: 'Set by fouta_1989. Consumed by fouta_ft_1989.',
  },
  fouta_herd_lost: {
    weight: 'major', category: 'economic', intent: 'event',
    description: 'Lost the family herd on the Mauritanian bank when the border closed in 1989.',
    notes: 'Set by fouta_herd_seized. Consumed by fouta_ft_herd.',
  },
  fouta_pulaar_writer: {
    weight: 'moderate', category: 'education', intent: 'event',
    description: 'Learned to write Pulaar, with the hooked letters, at an evening class.',
    notes: 'Set by fouta_pulaar_class. Consumed by fouta_ft_letter.',
  },
  fouta_went_dakar: {
    weight: 'moderate', category: 'migration', intent: 'event',
    description: 'Left the Fouta for an uncle\'s stall in Sandaga and a room in Pikine.',
    notes: 'Set by fouta_to_dakar. Consumed by fouta_ft_dakar_children.',
  },

  // ── Malinke Guinea (events_upper_guinea.js) ─────────────────────────────────
  mgn_gold: {
    weight: 'moderate', category: 'economic', intent: 'event',
    description: 'Worked the dry-season gold pits near Siguiri.',
    notes: 'Set by mgn_gold. Consumed by mgn_ft_gold.',
  },
  mgn_normes_hid: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Hid sacks under a false floor rather than deliver the full norme.',
    notes: 'Set by mgn_normes. Consumed by mgn_ft_normes.',
  },
  mgn_1976: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Lived next door to a Peul family through the 1976 speeches.',
    notes: 'Set by mgn_1976. Consumed by mgn_ft_boiro_names.',
  },
  mgn_1985: {
    weight: 'major', category: 'political', intent: 'event',
    description: 'Saw the Malinke shops looted after Diarra Traore\'s coup failed in July 1985.',
    notes: 'Set by mgn_1985. Consumed by mgn_ft_1985.',
  },
  mgn_2010_sheltered: {
    weight: 'major', category: 'moral', intent: 'event',
    description: 'Stood in front of a Peul trader\'s stall in Upper Guinea in October 2010.',
    notes: 'Set by mgn_2010_violence. Consumed by mgn_ft_2010_sheltered.',
  },
  mgn_2010_stood: {
    weight: 'major', category: 'moral', intent: 'event',
    description: 'Walked the other way while a Peul trader\'s stall was pulled down in October 2010.',
    notes: 'Set by mgn_2010_violence. Consumed by mgn_ft_2010_stood.',
  },
  mgn_2021: {
    weight: 'moderate', category: 'political', intent: 'event',
    description: 'Saw a colonel from Kankan take the palace in September 2021.',
    notes: 'Set by mgn_2021. Consumed by mgn_ft_2021.',
  },
  mgn_abidjan: {
    weight: 'major', category: 'migration', intent: 'event',
    description: 'Went down to Abidjan to a cousin\'s stall in Adjame.',
    notes: 'Set by mgn_abidjan. Consumed by mgn_ft_abidjan.',
  },
  mgn_libya: {
    weight: 'major', category: 'migration', intent: 'event',
    description: 'Paid the first stage of the road north and ended up in Libya.',
    notes: 'Set by mgn_mediterranean. Consumed by mgn_ft_libya.',
  },
}
