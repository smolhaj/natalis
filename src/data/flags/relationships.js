/**
 * RELATIONSHIP_FLAGS — relationships flags for the natalis flag system.
 * Auto-split from src/data/flags.js by scripts/split_flags.py
 */
export const RELATIONSHIP_FLAGS = {

  permanently_estranged: {
    weight: 'major',
    category: 'relationship',
    description: 'A reconciliation attempt was rejected — the estrangement is now permanent.',
    intent: 'year_texture',
    notes: 'Set in late-life reconciliation arc. Checked nowhere. Clear orphan.',
  },

  reconciled_damaged: {
    weight: 'moderate',
    category: 'relationship',
    description: 'A damaged relationship has been partially repaired — still fragile.',
    intent: 'year_texture',
    notes: 'Year texture path present. Reasonably covered.',
  },

  affair_brief_secret: {
    weight: 'major',
    category: 'relationship',
    description: 'Character had a brief affair they never disclosed.',
    intent: 'both',
    timestamped: true,
    notes: 'followthrough_8 surfaces this at midlife. Memory layer. Covered.',
  },

  affair_not_taken: {
    weight: 'major',
    category: 'relationship',
    description: 'Character was tempted but chose not to have an affair.',
    intent: 'both',
    timestamped: true,
    notes: 'Multiple follow-throughs and memory layer. Well covered.',
  },

  sibling_estranged: {
    weight: 'major',
    category: 'relationship',
    description: 'A sibling relationship has broken down into estrangement.',
    intent: 'both',
    notes: 'Set in events_siblings.js (sibEstrangement). No year texture path for the years after the break. Clear gap.',
  },

  long_marriage_intimacy: {
    weight: 'moderate',
    category: 'relationship',
    description: 'A long marriage has developed into a different, quieter form of intimacy.',
    intent: 'year_texture',
    notes: 'Set in events_intimacy.js. followthrough_6 has a late-life echo.',
  },

  built_something_solo: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Unpartnered character has built a meaningful life outside couplehood.',
    intent: 'year_texture',
    notes: 'Set in events_solo_life.js. No dedicated year texture path.',
  },

  id98_targeted_by_name: {
    weight: 'major',
    category: 'discrimination',
    description: 'Chinese-Indonesian character was specifically targeted by anti-Chinese graffiti or violence in the May 1998 riots.',
    intent: 'both',
    notes: 'Set by id98_graffiti. Gates id98_riot_night.',
  },

  veteran_solidarity: {
    weight: 'moderate',
    category: 'community',
    description: 'Character has found someone else who served — the specific shorthand, not having to perform the short answer.',
    intent: 'event',
    notes: 'Set by sol_veteran_recognition.',
  },

  rebuilt_institution: {
    weight: 'major',
    category: 'community',
    description: 'Character rebuilt a religious or civic institution from near-zero — teaching what remained of a tradition to a generation that grew up without any.',
    intent: 'event',
    notes: 'Set by cle_cambodia_rebuilding. The specific solemnity of rebuilding from almost nothing.',
  },

  diaspora_community_built: {
    weight: 'moderate',
    category: 'community',
    description: 'Character built or joined a diaspora community structure — a savings circle, a prayer group, a mutual aid network that recreates belonging in a new geography.',
    intent: 'event',
    notes: 'Set by sen_diaspora_dahira. Cross-cultural flag also set by other diaspora community events.',
  },

  teranga_household: {
    weight: 'moderate',
    category: 'social',
    description: 'Lives by teranga — the Wolof obligation of hospitality that exceeds cultural preference, requiring you to feed visitors and shelter family regardless of your own means',
    intent: 'year_texture',
    notes: 'Set by sen_teranga. Year texture: the meal that couldn\'t be spared, the debt that runs across generations.',
  },

  adopted: {
    weight: 'major',
    category: 'family',
    description: 'Character was adopted — domestic or international, transracial or same-race. The origin story was made for a child; the fact is more complicated and they are old enough to sense the edges of it.',
    intent: 'both',
    notes: 'Set by adp_always_knew in childhood. Gates all subsequent adoptee arc events. Core identity flag.',
  },

  found_birth_family: {
    weight: 'major',
    category: 'family',
    description: 'Character made contact with birth family — a half-sibling found via DNA, a first cousin twice removed. The first call was forty minutes and they did not know what to call each other at the end of it.',
    intent: 'both',
    notes: 'Set by adp_search. Significant milestone; follow-through in future relationship events.',
  },

  decree_779_generation: {
    weight: 'major',
    category: 'gender',
    description: 'Romanian woman who lived under Decree 779 (1966-1989) — abortion and contraception banned, menstrual inspections, forced natalism, illegal procedures in unsafe conditions.',
    intent: 'both',
    notes: 'Set by rom_decree_779. Needs year texture + late-life reckoning.',
  },

  arm_baku_refugee_host: {
    weight: 'moderate',
    category: 'social',
    description: 'Hosted Armenian refugees from Azerbaijan (1988-1991) fleeing the Baku pogroms',
    intent: 'year_texture',
    notes: 'Set by arm_baku_refugees event.',
  },

  sg_hdb_generation: {
    weight: 'minor',
    category: 'social',
    description: 'Grew up in HDB public housing — the Singapore social engineering project that housed 80% of the population',
    intent: 'event',
    notes: 'Set by sg_psle_exam (both choices).',
  },

  sg_eip_generation: {
    weight: 'minor',
    category: 'social',
    description: 'Encountered Singapore\'s Ethnic Integration Policy in housing — where you can live partially determined by your ethnicity',
    intent: 'event',
    notes: 'Set by sg_ethnic_quota.',
  },

  womens_rights_restricted: {
    weight: 'major',
    category: 'discrimination',
    description: 'Experienced legal discrimination under gender-unequal legal framework',
    intent: 'year_texture',
    notes: 'Pakistan Hudood/Zina; may overlap with other countries. Year texture in buildYearTexture.',
  },

  hikikomori_adjacent: {
    weight: 'minor',
    category: 'relationship',
    description: 'Knew someone who withdrew into hikikomori — the closed door, the television, the family that didn\'t know what to do.',
    intent: 'none',
    notes: 'Set by ca2_japan_hikikomori. No downstream event needed; texture flag.',
  },

  strajk_kobiet_generation: {
    weight: 'moderate',
    category: 'gender',
    description: 'Polish woman who lived through the October 2020 Constitutional Tribunal abortion ruling and the Ogólnopolski Strajk Kobiet (All-Poland Women\'s Strike) — the lightning bolt symbol, the streets.',
    intent: 'year_texture',
    notes: 'Set by pol_womens_strike_2020.',
  },

  nl_multicultural_generation: {
    weight: 'moderate',
    category: 'social',
    description: 'Lived through the Surinamese immigration wave of 1975 and the subsequent transformation of Dutch cities — the Dutch multiculturalism experiment',
    intent: 'year_texture',
    notes: 'Set by nl_surinamese_wave (both choices).',
  },

  dmz_separated_family: {
    weight: 'major',
    category: 'family',
    description: 'Has relatives in North Korea, separated by the DMZ since the armistice — the unreachability of people ninety kilometres away.',
    intent: 'year_texture',
    notes: 'Set by kr_dmz_family_separated. Annual texture of the unresolvable absence.',
  },

  tontine_member: {
    weight: 'minor',
    category: 'social',
    description: 'Participates in a tontine — rotating savings and credit association common across West/Central Africa, especially Bamileke communities; the group as the bank',
    intent: 'year_texture',
    notes: 'Set by cmr_bamileke_world (trade choice). Year texture: the monthly meeting, who wins, the trust required.',
  },

  gift_child_has_it: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Recognised the same gift in their own child — the specific stillness, the precocious ease.',
    intent: 'event',
    notes: 'Set by gift_child_carries_it. Gates gift_second_generation_path.',
  },

  one_child_policy_complied: {
    weight: 'moderate',
    category: 'family',
    description: 'Had one child in compliance with the one-child policy — the single child carries the family expectations of many.',
    intent: 'year_texture',
    notes: 'Set by cn_one_child_decision (comply choice). 1980–2015.',
  },

  one_child_policy_resisted: {
    weight: 'moderate',
    category: 'family',
    description: 'Had a second child despite the one-child policy — paid the fine, accepted the consequences.',
    intent: 'year_texture',
    notes: 'Set by cn_one_child_decision (pay fine choice). 1980–2015.',
  },

  china_heihaizi_school_found: {
    weight: 'moderate',
    category: 'family',
    description: 'Paid for private school when the unregistered child was denied public enrollment.',
    intent: 'none',
    notes: 'Set by cn_heihaizi_schoolgate. One outcome of the heihaizi arc.',
  },

  left_behind_child: {
    weight: 'major',
    category: 'family',
    description: 'Was a left-behind child — parents migrated for work, raised by grandparents. One of ~61 million in China.',
    intent: 'year_texture',
    notes: 'Set by cn_left_behind_child.',
  },

  korea_marriage_pressure: {
    weight: 'moderate',
    category: 'family',
    description: 'Experienced the sustained social pressure toward marriage — Chuseok conversations, matchmaking apps, government birth rate opinions.',
    intent: 'year_texture',
    notes: 'Set by kr_marriage_pressure.',
  },

  disability_partner_found: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Found a partner who sees past the disability to the person — the love that doesn\'t require the disability to be overcome or invisible.',
    intent: 'none',
    notes: 'Set by dis_love_and_disability.',
  },

  disability_love_costs: {
    weight: 'moderate',
    category: 'relationship',
    description: 'The disability shaped the love — the partner who stayed, the ones who didn\'t, the specific texture of being loved in this body.',
    intent: 'none',
    notes: 'Design flag. No current event sets this — future arc expansion.',
  },

  recovery_sponsor: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Became a sponsor for someone new to recovery — the giving back that is part of staying well.',
    intent: 'none',
    notes: 'Set by add_giving_back.',
  },

  addiction_in_family: {
    weight: 'moderate',
    category: 'family',
    description: 'Addiction present in the family — sibling, parent, or child with dependency.',
    intent: 'none',
    notes: 'Set upstream by family events or birth configuration. Gates add_family_witness.',
  },

  reluctant_parent: {
    weight: 'moderate',
    category: 'family',
    description: 'Became a parent without full willingness — the reluctance was real at the beginning, even if the relationship became real too.',
    intent: 'event',
    notes: 'Set by events.js (having child choice, reluctant branch). Follow-through: ft25_reluctant_parent_midlife.',
  },

  child_soldier_community: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Found community with other former child soldiers — the language that exists there, the accompanied carrying.',
    intent: 'none',
    notes: 'Set by cs_moral_injury_midlife (seek community choice).',
  },

  divorce_attempt_repair: {
    weight: 'minor',
    category: 'relationship',
    description: 'Made one more attempt to repair the marriage before the divorce — the most honest conversation in years.',
    intent: 'none',
    notes: 'Set by div_the_long_end (try once more choice).',
  },

  coparenting_cooperative: {
    weight: 'moderate',
    category: 'family',
    description: 'Co-parenting is cooperative — the schedule made as good as it can be, whatever the cost of cooperation.',
    intent: 'year_texture',
    notes: 'Set by div_children_question (prioritise cooperation choice).',
  },

  coparenting_difficult: {
    weight: 'moderate',
    category: 'family',
    description: 'Co-parenting is difficult — the conflict not contained for the schedule, the children hearing the edges.',
    intent: 'year_texture',
    notes: 'Set by div_children_question (conflict continues choice).',
  },

  divorce_dating_again: {
    weight: 'minor',
    category: 'relationship',
    description: 'Dating again after divorce — the knowing of what a relationship requires, the procedural quality of early meetings.',
    intent: 'none',
    notes: 'Set by div_dating_again.',
  },

  divorce_children_grown: {
    weight: 'minor',
    category: 'family',
    description: 'Children from the marriage are now grown, with their own understanding of what happened.',
    intent: 'none',
    notes: 'Set by div_children_grown. Late life.',
  },

  dementia_family_told: {
    weight: 'moderate',
    category: 'family',
    description: 'Told the family about the diagnosis — the responses dividing into the researcher, the quiet one, the denier, the crier.',
    intent: 'none',
    notes: 'Set by dem_telling_family.',
  },

  dementia_parent: {
    weight: 'major',
    category: 'family',
    description: 'Parent developing dementia — the twice-told story, the familiar name gone from the familiar face.',
    intent: 'year_texture',
    notes: 'Set by dem_parent_first_signs. Gates diagnosis, forgot me, late stage.',
  },

  dementia_primary_carer: {
    weight: 'major',
    category: 'family',
    description: 'Primary carer for parent with dementia — the own life reorganised around the care.',
    intent: 'year_texture',
    notes: 'Set by dem_parent_diagnosis (take on responsibility choice).',
  },

  dementia_shared_care: {
    weight: 'moderate',
    category: 'family',
    description: 'Shared care of dementia parent with siblings — the uneven share, the family friction, the distributed burden.',
    intent: 'none',
    notes: 'Set by dem_parent_diagnosis (share it choice).',
  },

  dementia_care_facility: {
    weight: 'moderate',
    category: 'family',
    description: 'Parent in professional care facility — the guilt that doesn\'t mean the decision was wrong.',
    intent: 'year_texture',
    notes: 'Set by dem_parent_diagnosis (professional care choice).',
  },

  teacher_that_student: {
    weight: 'major',
    category: 'relationship',
    description: 'The student who was different — the hard one, the extra time, the shift that was real without a specific moment.',
    intent: 'year_texture',
    notes: 'Set by tch_the_student. Gates tch_the_letter.',
  },

  moved_for_partner: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Relocated to a different city for their partner\'s career or opportunity.',
    intent: 'year_texture',
    notes: 'Set by pw_partner_wants_move.',
  },

  leftover_woman_label: {
    weight: 'moderate',
    category: 'gender',
    description: 'Received the 剩女 ("leftover woman") label from state media and social pressure — educated, employed, unmarried over 25.',
    intent: 'year_texture',
    notes: 'Set by cn_leftover_woman.',
  },

  arranged_meeting_accepted: {
    weight: 'minor',
    category: 'relationship',
    description: 'Agreed to an arranged marriage introduction — the structure moved forward.',
    intent: 'none',
    notes: 'Set by ind_arranged_marriage_meetings (accept branch).',
  },

  arranged_meeting_declined: {
    weight: 'minor',
    category: 'relationship',
    description: 'Said no to an arranged introduction — exercised a veto within a system that contains the veto.',
    intent: 'none',
    notes: 'Set by ind_arranged_marriage_meetings (decline branch).',
  },

  joint_family_tension: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Began saving separately in a joint household — prudence or the beginning of something else.',
    intent: 'event',
    notes: 'Set by ind_joint_family_entry. Checked by ind_joint_family_nuclear_transition.',
  },

  nuclear_family_choice: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Moved into a nuclear household — Sunday visits began, the relationship adjusting through deliberate distance.',
    intent: 'year_texture',
    notes: 'Set by ind_joint_family_nuclear_transition.',
  },

  stayed_joint_family: {
    weight: 'minor',
    category: 'relationship',
    description: 'Stayed in the joint household — not sure whether it was loyalty or inertia.',
    intent: 'none',
    notes: 'Set by ind_joint_family_nuclear_transition (stay branch).',
  },

  urban_rural_connected: {
    weight: 'minor',
    category: 'relationship',
    description: 'Maintained ties to the village through remittances — not large enough, but arriving.',
    intent: 'none',
    notes: 'Set by ind_village_visit_midlife.',
  },

  urban_rural_disconnected: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Lost touch with the village gradually — the distance too specific to bridge.',
    intent: 'year_texture',
    notes: 'Set by ind_village_visit_midlife (lose-touch branch).',
  },

  retornado_family: {
    weight: 'moderate',
    category: 'family',
    description: 'Family member was among the 700,000 retornados who returned from Angola and Mozambique after independence — arriving with what could be carried.',
    intent: 'year_texture',
    notes: 'Set by pt_retornados.',
  },

  bra_favela_generation: {
    weight: 'moderate',
    category: 'social',
    description: 'Grew up in a Brazilian favela — the hill, the self-built house, the water hose, the community, the bala perdida arithmetic.',
    intent: 'year_texture',
    notes: 'Set by bra_favela_childhood.',
  },

  bra_favela_survived: {
    weight: 'major',
    category: 'social',
    description: 'Navigated the specific violence arithmetic of favela life — bala perdida, faction control, the decision to stay or leave the hill.',
    intent: 'year_texture',
    notes: 'Set by bra_bala_perdida.',
  },

  bra_racial_reckoning: {
    weight: 'moderate',
    category: 'social',
    description: 'Named the racial democracy myth — understood the gap between Brazil\'s founding story about race and who occupies which rooms.',
    intent: 'year_texture',
    notes: 'Set by bra_racial_democracy (choice 1).',
  },

  first_gen_reconciled: {
    weight: 'moderate',
    category: 'family',
    description: 'Had the direct conversation with the father who went silent when the path was defied — something released, without the exact word being said.',
    intent: 'none',
    notes: 'Set by ind_first_gen_defied_echo.',
  },

  first_gen_distance_kept: {
    weight: 'minor',
    category: 'family',
    description: 'Left the first-generation defiance conversation unfinished — the silence continuing at a different pitch, careful rather than cold.',
    intent: 'none',
    notes: 'Set by ind_first_gen_defied_echo.',
  },

  sends_remittances: {
    weight: 'moderate',
    category: 'family',
    description: 'Sends remittances home — the monthly transfer that structures the relationship with family in the country of origin, the version of your life they receive being the money rather than the life.',
    intent: 'year_texture',
    notes: 'Set by events_vietnam.js (vn_viet_kieu_return or remittance choice) and events_romania.js (eu_emigrant_romania choice).',
  },

  child_seriously_ill: {
    weight: 'major',
    category: 'family',
    description: 'A child was diagnosed with a serious illness during the character\'s midlife — reorganizing daily life around medical need for an extended period.',
    intent: 'year_texture',
    notes: 'Trigger flag. Set by sick_child_diagnosis. Gates the full sick child arc.',
  },

  child_illness_recovery: {
    weight: 'moderate',
    category: 'family',
    description: 'The seriously ill child recovered — the numbers improved and the crisis resolved, though the experience changed everyone who went through it.',
    intent: 'year_texture',
    notes: 'Set by sick_child_recovery. Gates late follow-through sick_child_who_they_became.',
  },

  child_illness_chronic: {
    weight: 'moderate',
    category: 'family',
    description: 'The child\'s illness became a chronic condition — permanently managed but never resolved, shaping the family\'s life indefinitely.',
    intent: 'year_texture',
    notes: 'Set by sick_child_becomes_chronic. Gates late follow-through sick_child_chronic_late.',
  },

  ill_child_partner_rebuilt: {
    weight: 'minor',
    category: 'relationship',
    description: 'The crisis of a child\'s serious illness drew the couple closer — sustained pressure became a form of shared intimacy.',
    intent: 'none',
    notes: 'Set by sick_child_partner_pressure (unit choice).',
  },

  ill_child_partner_fractured: {
    weight: 'moderate',
    category: 'relationship',
    description: 'The child\'s illness fractured the partnership — each parent carried the grief alone, and the distance grew.',
    intent: 'none',
    notes: 'Set by sick_child_partner_pressure (separated choice). Persists as relationship quality cost.',
  },

  ill_child_late_witness: {
    weight: 'moderate',
    category: 'family',
    description: 'Witnessed who the formerly ill child became as an adult — either recovered and whole, or living well with a chronic condition.',
    intent: 'year_texture',
    notes: 'Set by sick_child_who_they_became or sick_child_chronic_late.',
  },

  mentor: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Became a guiding presence for someone younger — the relationship where you handed something across rather than passed it down.',
    intent: 'none',
    notes: 'Cross-cutting. Set by mentor arc, teacher arc, and career events.',
  },

  mentored: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Was guided by a mentor — the specific debt of having been taken seriously by someone who didn\'t have to bother.',
    intent: 'none',
    notes: 'Cross-cutting. Set by mentor arc and education events.',
  },

  has_close_friend: {
    weight: 'minor',
    category: 'relationship',
    description: 'Has or had a friendship deep enough that the person knows the real version — not a social contact but a witness.',
    intent: 'none',
    notes: 'Cross-cutting. Set by friendship arc and small life events.',
  },

  strong_marriage: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Enduring partnership that has weathered years and remains genuinely close — the marriage that worked.',
    intent: 'none',
    notes: 'Cross-cutting. Set by romance arc and long-marriage events.',
  },

  estranged_family: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Family bonds broken or strained to the point of sustained absence — the gap at the table that everyone knows not to mention.',
    intent: 'none',
    notes: 'Cross-cutting. Set by family conflict, honour, and generational tension events.',
  },

  caretaker: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Took on informal caregiving role for a family member — the person who stayed, who managed the decline, who was there.',
    intent: 'none',
    notes: 'Cross-cutting. Set by parent-care, sick-child, and dementia arc events.',
  },

  community_leader: {
    weight: 'moderate',
    category: 'social',
    description: 'Became a community leader — organized neighbors, represented the group, took on the unpaid work of holding community together.',
    intent: 'both',
    notes: 'Set by neighborhood, religious, and civic events across multiple arcs.',
  },

  strong_marriage: {
    weight: 'moderate',
    category: 'relationship',
    description: 'A strong, durable partnership — the kind that has survived difficulty and is a genuine resource rather than a background fact.',
    intent: 'both',
    notes: 'Set by romance arc, long partnership texture, and relationship quality events when relationship quality is high.',
  },

  sibling_reconciled: {
    weight: 'moderate',
    category: 'relationships',
    description: 'Reconciled with an estranged sibling — the relationship is present but careful at the edges, which is a kind of love.',
    intent: 'event',
    notes: 'Set by events_siblings.js and events_late_life.js. Checked by ft23_sibling_reconciled_settled.',
  },

  found_community: {
    weight: 'major',
    category: 'relationships',
    description: 'Found a community — people who know things about you that others in your life don\'t, who have watched you change and you them; now includes funerals.',
    intent: 'event',
    notes: 'Set by events_culture.js (LGBTQ community finding). Checked by ft24_found_community_deepens.',
  },

  divided_family: {
    weight: 'major', category: 'relationships',
    description: 'Family separated by political division — a sibling, parent, or relative on the other side of a border that became permanent.',
    intent: 'event', notes: 'Set by Korean division world event. Follow-through: ft47_divided_family_late.',
  },

  adult_heartbreak: {
    weight: 'major',
    category: 'relationship',
    description: 'Ended a serious adult relationship — not adolescent heartbreak but a real partnership with shared routines and a plausible future, that ended through incompatibility or diverging growth.',
    intent: 'event',
    notes: 'Set by ya_adult_breakup (all three branches). Gates ftw26_adult_heartbreak_echo.',
  },

  stayed_too_long: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Stayed in the adult relationship past the moment of knowing — the delay branch of ya_adult_breakup.',
    intent: 'event',
    notes: 'Set by ya_adult_breakup (delayed branch only). Branches ftw26_adult_heartbreak_echo text; gates ftw26_stayed_too_long_pattern.',
  },

  arranged_marriage_settled: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Arranged marriage that became something like love — chosen by repetition, confirmed by years.',
    intent: 'none',
    notes: 'Set by ftw26_arranged_marriage_midlife (first branch). Downstream: late-life warmth texture.',
  },

  arranged_marriage: {
    weight: 'major',
    category: 'relationship',
    description: 'Entered a marriage arranged by family rather than chosen independently — the starting point, not the ending.',
    intent: 'event',
    notes: 'Set by events_texture.js rural marriage pressure event. Gates ftw26_arranged_marriage_midlife.',
  },

  foster_care: {
    weight: 'major',
    category: 'family',
    description: 'Was placed in foster care as a child — the identity question of family that is real but differently configured.',
    intent: 'event',
    notes: 'Set by events.js foster home event. Gates ftw26_foster_care_identity.',
  },

  chose_family: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Built chosen family — people who function as kin without the biological or legal designation.',
    intent: 'none',
    notes: 'Set by ftw26_foster_care_identity (first branch). Late-life warmth texture.',
  },

  community_organiser: {
    weight: 'moderate',
    category: 'social',
    description: 'Took on a community leadership role — the pump committee, the neighbourhood meeting, the person who agreed to decide.',
    intent: 'none',
    notes: 'Set by wi_pump_committee first choice, and other community organizing events.',
  },

  sw_regular_client_known: {
    weight: 'minor',
    category: 'relationship',
    description: 'Had a regular client — the version that is almost kind, which creates its own particular accounting.',
    intent: 'none',
    notes: 'Set by sw_regular_client.',
  },

  local_hero: {
    weight: 'moderate',
    category: 'community',
    description: 'Recognised within their immediate community — not fame, but the specific texture of being known and trusted within five kilometres.',
    intent: 'both',
    notes: 'Set by loc_first_recognition and career-specific recognition events in events_local.js. Gates trusted/achievement/coach/farewell events. Needs year texture.',
  },

  local_trusted: {
    weight: 'moderate',
    category: 'community',
    description: 'Became the person the community brings its unofficial problems to — mediating disputes, holding confidences, navigating what cannot go to formal authority.',
    intent: 'both',
    notes: 'Set by loc_trusted_with_problems. Gates village healer event.',
  },

  local_achievement: {
    weight: 'moderate',
    category: 'community',
    description: 'Organised something that actually happened — a community project, victory, or improvement that existed only because of their sustained effort.',
    intent: 'year_texture',
    notes: 'Set by loc_small_victory. Gates formal role choice.',
  },

  community_healer: {
    weight: 'moderate',
    category: 'community',
    description: 'Became the de facto medical resource for a rural community without clinic access — absorbing the gap between what the state provides and what people need.',
    intent: 'year_texture',
    notes: 'Set by loc_village_healer. Fires in developing/subsaharan/conflict archetypes, rural characters.',
  },

  local_official: {
    weight: 'minor',
    category: 'community',
    description: 'Took a formal community role — council, board, association — translating informal community trust into official structure.',
    intent: 'none',
    notes: 'Set by loc_formal_role take choice.',
  },

  local_coach_legacy: {
    weight: 'minor',
    category: 'community',
    description: 'Built something through years of coaching youth — the relationship with the people, not just the results.',
    intent: 'year_texture',
    notes: 'Set by loc_the_coach. Late-life texture available.',
  },

  uzb_mahalla_careful: {
    weight: 'minor',
    category: 'social',
    description: 'Learned to be unremarkable around the mahalla surveillance apparatus — normal answers, normal attendance, the art of reflecting nothing the state did not put there.',
    intent: 'none',
    notes: 'Set by uzb_mahalla_system (careful path).',
  },

  uzb_mahalla_distanced: {
    weight: 'minor',
    category: 'social',
    description: 'Maintained distance from the mahalla apparatus at the cost of the services and social fabric it controlled.',
    intent: 'none',
    notes: 'Set by uzb_mahalla_system (distanced path).',
  },

  uzb_faith_private: {
    weight: 'minor',
    category: 'social',
    description: 'Practiced Islam in the domestic space under Karimov — the kitchen, the funeral, the things said between family members without being named as what they are.',
    intent: 'none',
    notes: 'Set by uzb_faith_crackdown (private path).',
  },

  uzb_faith_permitted: {
    weight: 'minor',
    category: 'social',
    description: 'Limited Islamic practice to the state-registered mosque and approved texts under Karimov — the compliance real and so is the gap between it and what was handed down.',
    intent: 'none',
    notes: 'Set by uzb_faith_crackdown (permitted path).',
  },

  uzb_thaw_embraced: {
    weight: 'minor',
    category: 'social',
    description: 'Chose to act on the Mirziyoyev opening — speaking more openly, applying for things not applied for before, cautious adjacency to optimism.',
    intent: 'none',
    notes: 'Set by uzb_mirziyoyev_opening (embraced path).',
  },

  uzb_thaw_skeptical: {
    weight: 'minor',
    category: 'social',
    description: 'Waited out the Mirziyoyev thaw with the calibration that 27 years of Karimov had built — the structure was the same structure.',
    intent: 'none',
    notes: 'Set by uzb_mirziyoyev_opening (skeptical path).',
  },

  became_mentor: {
    weight: 'moderate',
    category: 'social',
    description: 'Took on a mentoring role — gave someone starting out the specific guidance that wasn\'t given to you, or was.',
    intent: 'none',
    notes: 'Set by mentor_young activity (retirement panel, 45+). Surfaced in buildYearTexture and late-life prose.',
  },

  wrote_memoirs: {
    weight: 'moderate',
    category: 'social',
    description: 'Wrote a memoir — set down the life; the act of writing changed what was remembered.',
    intent: 'none',
    notes: 'Set by write_memoirs activity (retirement panel, 60+).',
  },

  // ── INHERITANCE ARC (events_inheritance_arc.js)

  inh_sorting_happened: {
    weight: 'minor',
    category: 'family',
    description: 'Went through a deceased parent\'s house to sort their belongings — the specific work of making decisions about objects that no longer have their person.',
    intent: 'event',
    notes: 'Set by inh_the_sorting. Gates inh_the_object and inh_what_they_left.',
  },

  inh_object_taken: {
    weight: 'minor',
    category: 'family',
    description: 'Took one object from a deceased parent\'s house — the cup, the tool, the piece of furniture that now contains the room and the person.',
    intent: 'year_texture',
    notes: 'Set by inh_the_object. Year texture: the object that carries a room.',
  },

  inh_sibling_rupture: {
    weight: 'moderate',
    category: 'relationships',
    description: 'The estate settlement surfaced old sibling dynamics — a relationship is different afterward.',
    intent: 'none',
    notes: 'Set by inh_sibling_estate (conflict branch). The rupture is the outcome; no follow-through event.',
  },

  inh_both_parents_gone: {
    weight: 'major',
    category: 'family',
    description: 'Both parents are now dead — the threshold moment of being the oldest version of yourself in anyone\'s memory.',
    intent: 'event',
    notes: 'Set by inh_both_parents_gone. Gates inh_the_patterns and inh_late_reckoning.',
  },

  inh_reckoning_completed: {
    weight: 'moderate',
    category: 'family',
    description: 'Arrived at the full accounting of inheritance — objects, money, patterns, knowledge — from the far side of it.',
    intent: 'none',
    notes: 'Set by inh_late_reckoning. Terminal marker; also increments legacy by 5.',
  },

  // ── GRANDPARENT ARC (events_grandparent_arc.js)

  became_grandparent: {
    weight: 'major',
    category: 'family',
    description: 'A child was born to your child — the disorientation of the category "grandparent" applying to you for the first time.',
    intent: 'both',
    notes: 'Set by gp_first_grandchild. Gates entire grandparent arc. Year texture for late-life warmth and presence.',
  },

  grandparent_relationship_formed: {
    weight: 'moderate',
    category: 'family',
    description: 'Developed the specific grandparent-grandchild relationship — present without the urgency, able to listen without intervention.',
    intent: 'year_texture',
    notes: 'Set by gp_the_relationship. Year texture: the quality of unhurried presence.',
  },

  grandparent_transmitted_skill: {
    weight: 'minor',
    category: 'family',
    description: 'Passed a specific skill to a grandchild — the hands remember what the mind has half-forgotten.',
    intent: 'none',
    notes: 'Set by gp_the_teaching (skill branch). Narrative distinction from story branch.',
  },

  grandparent_transmitted_story: {
    weight: 'minor',
    category: 'family',
    description: 'Passed a story to a grandchild — imperfect, partial; they will remember a version that differs from what was said.',
    intent: 'none',
    notes: 'Set by gp_the_teaching (story branch). Narrative distinction from skill branch.',
  },

  grandparent_answered_question: {
    weight: 'minor',
    category: 'family',
    description: 'Answered a grandchild\'s question about the past as fully as possible — what it was like to be young when the thing happened.',
    intent: 'none',
    notes: 'Set by gp_the_question (full answer branch).',
  },

  grandparent_late_reckoning: {
    weight: 'moderate',
    category: 'family',
    description: 'Arrived at the late reckoning of grandparenthood — what was passed on and what wasn\'t; the contribution that was there but not always the one planned.',
    intent: 'none',
    notes: 'Set by gp_late_reckoning. Terminal marker; also increments legacy by 10.',
  },

}
