/**
 * FLAG_REGISTRY — master design document for the natalis flag system.
 *
 * Every flag with weight 'major' or 'moderate' should appear here.
 * Pure texture flags (minor details with no narrative follow-through required)
 * can be omitted — the check-flags script will surface unregistered
 * high-frequency ones for review.
 *
 * Fields:
 *   weight      'major' | 'moderate' | 'minor'
 *               major   = life-defining; must surface in prose across decades
 *               moderate = significant; should surface at least once post-flag
 *               minor   = texture; no follow-through required
 *
 *   category    'trauma' | 'loss' | 'displacement' | 'identity' | 'achievement' |
 *               'relationship' | 'political' | 'world_event'
 *
 *   description What this flag represents in the character's lived experience.
 *
 *   intent      What follow-through should exist:
 *               'event'        = at least one dedicated follow-through event
 *               'year_texture' = should feed into buildYearTexture() prose
 *               'both'         = dedicated event AND year texture presence
 *               'none'         = texture label; no follow-through needed
 *
 *   timestamped true if flag is in TIMESTAMPED_FLAGS (auto-records year set in mem)
 *
 *   notes       Optional — current gaps, pending work, or caveats.
 *
 * Status ('covered' | 'partial' | 'orphaned') is NOT stored here.
 * Run `npm run check-flags` to derive it dynamically from source.
 */
export const FLAG_REGISTRY = {

  // ── TRAUMA ──────────────────────────────────────────────────────────────────

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

  // ── LOSS ────────────────────────────────────────────────────────────────────

  widowed: {
    weight: 'major',
    category: 'loss',
    description: 'Partner has died. The character is now alone after a shared life.',
    intent: 'both',
    timestamped: true,
    notes: 'buildYearTexture accesses coverage via mem.widowedYear timestamp (not F.has), so script shows it as partial. Coverage IS present — mem.widowedYear gates year-0, year 1-3, year 4-5 prose paths. F.has in generateIdentityCard. Partner_died flag gates additional grief prose. Reasonably covered.',
  },

  divorced: {
    weight: 'major',
    category: 'loss',
    description: 'Character\'s marriage ended in divorce.',
    intent: 'both',
    timestamped: true,
    notes: 'Has year texture path (post-crisis). Could use more long-term texture at 5yr/10yr.',
  },

  lost_friend: {
    weight: 'major',
    category: 'loss',
    description: 'A significant friend has died.',
    intent: 'both',
    timestamped: true,
    notes: 'Has memory layer entry and old-photo followthrough event.',
  },

  bereaved: {
    weight: 'major',
    category: 'loss',
    description: 'General bereavement flag — set alongside specific loss flags for any significant death.',
    intent: 'year_texture',
    notes: 'Set very frequently. buildYearTexture uses more specific flags (lost_parent, partner_died, lost_child) for prose rather than this generic flag. Ribbon present. Real year texture coverage is indirect — this flag deserves its own buildYearTexture path for cases where only bereaved is set.',
  },

  lost_parent: {
    weight: 'major',
    category: 'loss',
    description: 'A parent has died — set by parent care arc and grief events.',
    intent: 'both',
    notes: 'Set by events_parent_care.js (killParent + addFlag) and events_grief.js. Has year texture, memory layer via parentDeathYear in mem. killParent() also marks parent.alive=false directly. Well covered.',
  },

  lost_parent_young: {
    weight: 'major',
    category: 'loss',
    description: 'A parent died while the character was a child — the specific orphaned-early experience.',
    intent: 'both',
    notes: 'Set in events.js early parent death event. Distinct from adult parent loss; needs its own year texture path.',
  },

  lost_child: {
    weight: 'major',
    category: 'loss',
    description: 'A child of the character has died.',
    intent: 'both',
    notes: 'Has year texture (3 lines in buildYearTexture). No dedicated follow-through event covering the years after. Partnership impact missing.',
  },

  lost_sibling: {
    weight: 'major',
    category: 'loss',
    description: 'A sibling has died.',
    intent: 'both',
    notes: 'Sibling events cover the death itself. No year texture path for the years after.',
  },

  experienced_miscarriage: {
    weight: 'major',
    category: 'loss',
    description: 'Character (or partner) experienced a miscarriage.',
    intent: 'both',
    notes: 'Set in events_fertility.js (first and second trimester variants). No year texture path or midlife echo. High priority gap.',
  },

  multiple_miscarriage: {
    weight: 'major',
    category: 'loss',
    description: 'Character (or partner) has experienced repeated miscarriages — the compounding grief.',
    intent: 'both',
    notes: 'Set in events_fertility.js late miscarriage events. No year texture or midlife echo. High priority gap.',
  },

  cancer_survivor: {
    weight: 'major',
    category: 'loss',
    description: 'Character survived cancer — the body and relationship to mortality have changed.',
    intent: 'both',
    timestamped: true,
    notes: 'Has scan callback event and memory layer. Reasonably covered.',
  },

  lost_mentor: {
    weight: 'moderate',
    category: 'loss',
    description: 'The character\'s significant mentor has died.',
    intent: 'year_texture',
    notes: 'Mentor arc has an echo event (men_mentor_echo). Year texture path exists.',
  },

  grief_drinking: {
    weight: 'moderate',
    category: 'loss',
    description: 'Character turned to alcohol following a bereavement.',
    intent: 'year_texture',
    notes: 'Set in grief events. Checked nowhere — clear orphan.',
  },

  // ── DISPLACEMENT ────────────────────────────────────────────────────────────

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

  // ── IDENTITY / FORMATION ────────────────────────────────────────────────────

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

  white_emigrant_sa: {
    weight: 'moderate',
    category: 'migration',
    description: 'White South African who emigrated post-1994 — the "chicken run" to Australia, the UK, New Zealand, Canada — carrying a country that became too complicated to name simply.',
    intent: 'year_texture',
    notes: 'Set by sa_white_emigration.',
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

  post_apartheid_realist: {
    weight: 'minor',
    category: 'identity',
    description: 'Held the 1994 hope at arm\'s length — watching the gap between democratic symbolism and the actual arithmetic of land and inequality.',
    intent: 'none',
    notes: 'Set by sa_mandela_era_hope (realist choice). No downstream event needed.',
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

  endsars_generation: {
    weight: 'major',
    category: 'political',
    description: 'Nigerian youth shaped by the October 2020 #EndSARS protests — the hashtag, the highway blockades, the Lekki toll gate shooting, the footage that circulated before it was removed.',
    intent: 'year_texture',
    notes: 'Set by nga_endsars_2020.',
  },

  lagos_tech_generation: {
    weight: 'minor',
    category: 'experience',
    description: 'Part of the Lagos tech ecosystem (2010s–2020s) — Andela, Paystack, Flutterwave, the Silicon Lagoon; building around infrastructure failure rather than waiting for it to be resolved.',
    intent: 'none',
    notes: 'Set by nga_tech_generation. No downstream event needed.',
  },

  brain_drain_gone: {
    weight: 'minor',
    category: 'migration',
    description: 'Left home country to pursue professional opportunities abroad, contributing to brain drain — aware of the specific question of what is owed to the place left.',
    intent: 'none',
    notes: 'Set by nga_tech_generation (leave choice) and similar career-emigration events.',
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

  // ── ACHIEVEMENT / MILESTONE ─────────────────────────────────────────────────

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

  nollywood_generation: {
    weight: 'minor',
    category: 'achievement',
    description: 'Character participated in Nigeria\'s Nollywood film industry.',
    intent: 'event',
    notes: 'events_arts.js has a decade callback.',
  },

  // ── RELATIONSHIP ─────────────────────────────────────────────────────────────

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

  // ── POLITICAL / MORAL WEIGHT ────────────────────────────────────────────────

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

  // ── WORLD_EVENT FLAGS ────────────────────────────────────────────────────────
  // These are set by addFlags: [...] on world events rather than character events.
  // They represent living through a historical moment — not a personal choice.

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

  russia_ukraine_exile: {
    weight: 'major',
    category: 'migration',
    description: 'Left Russia after 2022 — one of 700,000+ who went to Tbilisi, Yerevan, Riga, Istanbul — carrying the name of a country that has become complicated to say you are from.',
    intent: 'year_texture',
    notes: 'Set by ru_ukraine_invasion_2022 (leave choice) and ru_mobilization_2022.',
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

  bolotnaya_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Part of Russia\'s 2011-12 protest movement — Bolotnaya Square, the white ribbons, the first mass political mobilisation since the 1990s, and the systematic suppression that followed.',
    intent: 'both',
    notes: 'Set by ru_bolotnaya_2011. Needs year texture and a follow-through for Navalny\'s death 2024.',
  },

  veteran_unthanked: {
    weight: 'moderate',
    category: 'identity',
    description: 'Returned from a war the state preferred not to acknowledge — Chechnya, Afghanistan, other conflicts where the official narrative erased the soldiers\' experience.',
    intent: 'year_texture',
    notes: 'Set by ru_chechnya_war (served choice) and soldier_arc events.',
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

  // ── Ukraine ──────────────────────────────────────────────────────────────────

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

  donbas_displaced: {
    weight: 'major',
    category: 'migration',
    description: 'Internally displaced from the Donbas conflict (2014-2022) — left Donetsk or Luhansk when the "people\'s republics" were declared, carrying what you could, moving west.',
    intent: 'year_texture',
    notes: 'Set by ukr_donbas_2014 (leave choice).',
  },

  ukraine_2022_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Ukrainian civilian who lived through the February 2022 full-scale invasion — the sirens, the shelters, the specific choice of where to go, what the city looked like in the weeks after.',
    intent: 'year_texture',
    notes: 'Set by ukr_invasion_2022 (stayed choice).',
  },

  ukraine_refugee_2022: {
    weight: 'major',
    category: 'migration',
    description: 'One of 8 million Ukrainians who became refugees after February 24, 2022 — the border, the children, the suitcase, the language that is suddenly your introduction in every room.',
    intent: 'year_texture',
    notes: 'Set by ukr_invasion_2022 (fled choice).',
  },

  regime_compliance: {
    weight: 'minor',
    category: 'political',
    description: 'Accepted an authoritarian government\'s framing of an event — not out of conviction but because the information environment made the alternative harder to reach.',
    intent: 'none',
    notes: 'Set by ru_ukraine_invasion_2022 (accepted framing choice). No downstream event needed.',
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

  gulag_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the Soviet gulag system — arrested under Article 58, sent to Kolyma/Vorkuta/Karaganda, lived inside the ration-tied-to-output system, survived the social hierarchy of blatnye vs. politicals.',
    intent: 'both',
    notes: 'Set by ps_gulag_arrest. Follow-throughs: ps_gulag_camp, ps_gulag_release, ps_gulag_late_reckoning. Year texture in buildYearTexture.',
  },

  gulag_released_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Released from the gulag after Stalin\'s death (1953–58 amnesty waves) — without transportation, money, or documents; returning to a city that has moved on.',
    intent: 'year_texture',
    notes: 'Set by ps_gulag_release. Year texture: the specific texture of being released without means of return.',
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

  collectivization_witness: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed Soviet collectivisation — animals seized, pasture routes closed, nomadic or farming life destroyed by administrative order.',
    intent: 'year_texture',
    notes: 'Set by events_central_asia.js (ca_kaz_collectivization). Specific to Kazakhstan 1929–36. Carries sedentarization follow-through.',
  },

  cotton_childhood: {
    weight: 'moderate',
    category: 'labor',
    description: 'Grew up with school closing for cotton harvests — childhood education subordinated to state agricultural quotas.',
    intent: 'year_texture',
    notes: 'Set by events_central_asia.js (ca_uzb_cotton_harvest). Uzbekistan 1950–2015. Reflects Soviet and post-Soviet forced child labour in cotton.',
  },

  environmental_witness: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed large-scale environmental destruction within living memory — not abstract, but visible in the landscape of childhood.',
    intent: 'year_texture',
    notes: 'Set by events_central_asia.js (ca_uzb_aral_sea). Aral Sea desiccation. Complements grew_up_polluted.',
  },

  oil_economy_participant: {
    weight: 'moderate',
    category: 'economic',
    description: 'Participated in the oil-extraction economy — the salary, the towers, the work that does not ask difficult questions.',
    intent: 'year_texture',
    notes: 'Set by events_central_asia.js (ca_kaz_oil_boom) take-the-position branch. Kazakhstan 1995–2010.',
  },

  // ── OFW ARC (events_ofw.js) ───────────────────────────────────────────────

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

  ofw_broker_debt: {
    weight: 'moderate',
    category: 'economic',
    description: 'Character took out a loan to pay the agency/broker fee before departing as OFW.',
    intent: 'event',
    notes: 'Set by ofw_broker_fee loan choice. Represents the structural trap: in debt before earning anything. Follow-through via ofw_cost_accounting.',
  },

  ofw_passport_held: {
    weight: 'moderate',
    category: 'rights',
    description: 'OFW worker\'s passport confiscated by Gulf employer (kafala system — "held for safekeeping").',
    intent: 'event',
    notes: 'Set by ofw_arrival_gulf. Gates ribbon the_kafala_survivor. The condition is the point — no single resolution event exists.',
  },

  ofw_runaway: {
    weight: 'moderate',
    category: 'migration',
    description: 'OFW worker fled an employer to find a new placement without formal transfer.',
    intent: 'event',
    notes: 'Set by ofw_contract_violation (find new employer secretly branch). Illegal under Gulf kafala; legal but risky in HK/EU. Follow-through not yet written.',
  },


  // ── BUILD 43 — ALGERIAN DÉCENNIE NOIRE ──────────────────────────────────

  decennie_noire_generation: {
    weight: 'major',
    category: 'world_event',
    description: 'Character lived through the Algerian Black Decade (1992–2002) — the cancelled election, the armed insurgency, the massacres whose attribution was never settled.',
    intent: 'both',
    notes: 'Set by world event algeria_black_decade_begins. Follow-throughs: alg_decade_silence, alg_telling_children, alg_late_reckoning.',
  },

  intellectual_target: {
    weight: 'major',
    category: 'trauma',
    description: 'Character was threatened or targeted because of their intellectual or creative work during the Black Decade.',
    intent: 'event',
    notes: 'Set by alg_journalist_target. Follow-through via existing arts and censored_work flags.',
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

  knew_the_truth: {
    weight: 'major',
    category: 'political',
    description: 'Character knows — or believes — that state forces were involved in the Bentalha or Rais massacres and the official attribution is incomplete.',
    intent: 'both',
    notes: 'Set by alg_massacre_news (say what you think). Ribbon: the_knew_the_truth. The ambiguity is deliberate.',
  },

  decennie_noire_memory: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Character has arrived at a late-life reckoning with the Black Decade — the impunity, the amnesty, the unexamined past.',
    intent: 'year_texture',
    notes: 'Set by alg_late_reckoning (auto-resolve, late_life). Year-texture path added in gameEngine.js. Follow-through echo: ft10_decennie_noire_echo.',
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

  intellectual_target_reckoned: {
    weight: 'moderate',
    category: 'political',
    description: 'Character who was targeted as an intellectual during the Algerian Black Decade has reached a midlife reckoning with that experience.',
    intent: 'event',
    notes: 'Set by ft10_intellectual_target_midlife. Gates ft10_intellectual_target_late.',
  },

  ofw_cycle_witness: {
    weight: 'minor',
    category: 'migration',
    description: 'OFW who returned has now watched their own child begin the same migration cycle.',
    intent: 'event',
    notes: 'Set by ofw_cycle_repeating. Completes the generational arc of the OFW system.',
  },

  // ── INDONESIA 1998 FLAGS ──────────────────────────────────────────────────

  asian_crisis_personal: {
    weight: 'moderate',
    category: 'economic',
    description: 'Character lived through the 1997–98 Asian financial crisis as a personal economic rupture — rupiah collapse, supply shortages.',
    intent: 'event',
    notes: 'Set by id98_crisis_texture (Indonesia, 1997–98).',
  },

  id98_targeted_by_name: {
    weight: 'major',
    category: 'discrimination',
    description: 'Chinese-Indonesian character was specifically targeted by anti-Chinese graffiti or violence in the May 1998 riots.',
    intent: 'both',
    notes: 'Set by id98_graffiti. Gates id98_riot_night.',
  },

  reformasi_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Character witnessed or participated in Indonesia\'s democratic transition after Suharto\'s resignation (May 1998).',
    intent: 'event',
    notes: 'Set by id98_suharto_falls. Ribbon: the_reformasi_generation.',
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

  id98_emigrated: {
    weight: 'major',
    category: 'migration',
    description: 'Chinese-Indonesian character emigrated after the 1998 riots — to Singapore, Australia, or the United States.',
    intent: 'both',
    notes: 'Set by id98_aftermath_rebuild (emigrated path). Also sets emigrated flag.',
  },

  id98_witness_bystander: {
    weight: 'major',
    category: 'moral',
    description: 'Non-Chinese Indonesian character witnessed the targeting of ethnic Chinese during the May 1998 riots and faced a choice about intervention.',
    intent: 'both',
    notes: 'Set by id98_bystander. The choice (help/watch) shapes karma and carries into later reflection.',
  },

  id98_reckoned: {
    weight: 'moderate',
    category: 'historical',
    description: 'Character has reached a late-life reckoning with the fact that no one was ever prosecuted for the May 1998 riots.',
    intent: 'year_texture',
    notes: 'Set by id98_late_reckoning (late_life, auto-resolve).',
  },

  // ── INDONESIA DEPTH FLAGS ─────────────────────────────────────────────────

  id_1965_stained: {
    weight: 'major',
    category: 'trauma',
    description: 'A family member was taken or killed in the 1965–66 anti-communist purge — carried as an undeclared grief through thirty years of New Order silence.',
    intent: 'both',
    notes: 'Set by id_1965_purge (family taken choice). The silence is enforced by the New Order; grief is privatized.',
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

  id_transmigration_settler: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Participated in Suharto\'s transmigration program — Javanese resettled to Kalimantan, Sulawesi, or Papua; 6 million moved 1965–1990.',
    intent: 'both',
    notes: 'Set by id_transmigration (Javanese/Sundanese ethnicity gate).',
  },

  id_papua_identity: {
    weight: 'major',
    category: 'identity',
    description: 'Carries Papuan indigenous identity in Indonesia — the Morning Star flag, customary land, and structural exclusion from what "Indonesian" was designed to contain.',
    intent: 'both',
    notes: 'Set by id_papua_identity event. Papuan ethnicity gate.',
  },

  // ── KURDISH IDENTITY FLAGS ────────────────────────────────────────────────

  kurd_identity_suppressed: {
    weight: 'major',
    category: 'identity',
    description: 'Kurdish character\'s language and cultural identity were officially suppressed — through school systems, naming laws, or citizenship denial.',
    intent: 'both',
    notes: 'Set by kurd_tr_language_school (Turkey, pre-1991) and kurd_sy_stateless (Syria, pre-2011). Follow-through: kurd_late_reckoning.',
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

  kurd_language_moment: {
    weight: 'moderate',
    category: 'identity',
    description: 'Kurdish character experienced the specific moment of hearing their language publicly for the first time after decades of suppression.',
    intent: 'event',
    notes: 'Set by kurd_tr_language_lifted (pulling over to listen to the radio).',
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

  kurd_returned_home: {
    weight: 'moderate',
    category: 'migration',
    description: 'Kurdish diaspora character returned to Turkey/Kurdistan, finding the country of a relative rather than their own.',
    intent: 'event',
    notes: 'Set by kurd_diaspora_question (go back path). Carries dissonance — Germany made you German.',
  },

  // ── FORMAL DEBT ARC FLAGS ─────────────────────────────────────────────────

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

  debt_recovered: {
    weight: 'moderate',
    category: 'resilience',
    description: 'Character has recovered from a debt crisis — credit rebuilt, obligations discharged, the specific absence of a weight carried for years.',
    intent: 'both',
    notes: 'Set by debt_decade_clean and debt_late_life_free. Ribbon: the_debt_recovered.',
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

  // ── HAITI FLAGS ───────────────────────────────────────────────────────────

  tonton_macoute_era: {
    weight: 'major',
    category: 'political',
    description: 'Character grew up under the Duvalier dynasty with the Tonton Macoutes — state-sponsored terror that operated outside law, paid in impunity.',
    intent: 'both',
    notes: 'Set by hai_macoute_texture (childhood, Haiti 1957–86). Follow-through: hai_duvalier_midlife_echo.',
  },

  haitian_diaspora: {
    weight: 'major',
    category: 'migration',
    description: 'Haitian character emigrated to Brooklyn, Miami, or Montreal — carrying the obligation to send money home and the specific diaspora identity of someone who left.',
    intent: 'both',
    notes: 'Set by hai_diaspora_decision. Follow-throughs: hai_diaspora_earthquake_call, hai_diaspora_late_reckoning. Ribbon: the_dyaspora.',
  },

  earthquake_2010_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'Character survived the January 12, 2010 Haiti earthquake — 35 seconds, 220,000+ dead, 1.5 million displaced.',
    intent: 'both',
    notes: 'Set by hai_earthquake_2010. Follow-through: hai_earthquake_camp. Ribbon: the_haiti_earthquake.',
  },

  earthquake_family_loss: {
    weight: 'major',
    category: 'grief',
    description: 'Character lost family members in the 2010 Haiti earthquake — learned by the phone calls that never connected.',
    intent: 'both',
    notes: 'Set by hai_diaspora_earthquake_call (lost_family path).',
  },

  earthquake_camp_survivor: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Character lived in a displacement camp after the 2010 earthquake — blue UNHCR tarpaulins, twice-weekly water trucks, UN cholera.',
    intent: 'event',
    notes: 'Set by hai_earthquake_camp.',
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

  democracy_movement: {
    weight: 'moderate',
    category: 'political',
    description: 'Participated in a democracy movement — the decision that this cannot keep happening, and what that decision costs.',
    intent: 'year_texture',
    notes: 'Set by Gwangju world event (South Korea) and Turkey coup events. Cross-national political engagement flag.',
  },

  class_awareness: {
    weight: 'minor',
    category: 'identity',
    description: 'Developed early class consciousness — noticing the domestic workers\' names, the arrangement others find unusual, the thing that was taken for granted.',
    intent: 'year_texture',
    notes: 'Set by events_culture.js (wealthy Gulf/developing) and events_texture.js (domestic service observation).',
  },

  radio_childhood: {
    weight: 'minor',
    category: 'historical',
    description: 'Grew up with radio as the primary household medium — the voices from the wooden box, the family gathered, the world arriving as sound.',
    intent: 'year_texture',
    notes: 'Set by events_texture.js (era radio family) and events_technology.js (radio era). Period texture flag.',
  },

  failure_integrated: {
    weight: 'minor',
    category: 'identity',
    description: 'Metabolised a major failure and carried it forward as information rather than shame — the specific work of making a failure useful.',
    intent: 'year_texture',
    notes: 'Set by events_coherence.js and events_early_life.js (first real failure choice).',
  },

  // ── LATIN AMERICA HISTORICAL FLAGS ───────────────────────────────────────

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

  // ── VENEZUELA ─────────────────────────────────────────────────────────────────

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

  bolivarian_collapse_lived: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the collapse of the Bolivarian project — the supermarket queues at 4am, the CLAP food bags, the medicines that couldn\'t be found, the currency that lost six zeros.',
    intent: 'year_texture',
    notes: 'Set by ven_escasez.',
  },

  ven_2017_generation: {
    weight: 'major',
    category: 'political',
    description: 'Was in Venezuela during the 2017 protests — four months of daily street actions, 120 dead, the guarimba, the birdshot, the motorcycles, and Maduro surviving everything.',
    intent: 'year_texture',
    notes: 'Set by ven_2017_protests.',
  },

  ven_stayer: {
    weight: 'moderate',
    category: 'identity',
    description: 'Stayed in Venezuela when seven million left — the specific identity of the ones who remained while the country emptied, watching the departures from the same street.',
    intent: 'year_texture',
    notes: 'Set by ven_emigrar (stayed choice) and ven_emigrar (left choice, co-set).',
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

  // ── COLOMBIA ──────────────────────────────────────────────────────────────────

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

  col_farc_era: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived in guerrilla-contested territory — the FARC tax on coca and cattle, the road after dark, the choice between visibility and neutrality that was also no choice.',
    intent: 'year_texture',
    notes: 'Set by col_farc_question.',
  },

  col_cartel_era: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the Medellín cartel years (1984–93) — car bombs, plata o plomo, the president and the justice minister and the editor and the candidates killed.',
    intent: 'year_texture',
    notes: 'Set by col_cartel_medellin.',
  },

  col_desplazado: {
    weight: 'major',
    category: 'displacement',
    description: 'Internally displaced by the Colombian conflict — arrived in a city periphery from a contested rural territory, part of the 7 million who were moved by armed actors.',
    intent: 'year_texture',
    notes: 'Set by col_la_violencia_rural (left choice), col_farc_question (moved choice), col_paramilitares (leave choice).',
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

  // ── IRAN ──────────────────────────────────────────────────────────────────────

  irn_khatami_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the Khatami reform era (1997–2005) — 300 newspapers, civil society, student uprising 1999, Shirin Ebadi Nobel Prize — and its systematic dismantling by the Guardian Council.',
    intent: 'year_texture',
    notes: 'Set by irn_khatami_era (both choices).',
  },

  irn_sanctions_generation: {
    weight: 'major',
    category: 'economic',
    description: 'Lived inside the sanctions economy — the rial\'s 95% value loss since 1979, the gap between official and street dollar rates, the JCPOA collapse in 2018 and 60% rial crash in three months.',
    intent: 'year_texture',
    notes: 'Set by irn_sanctions_economy.',
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

  irn_diaspora_generation: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Left Iran — Turkey first, then Canada/Germany/UK — part of the 150,000/year brain drain that the IMF calls the highest in the world.',
    intent: 'year_texture',
    notes: 'Set by irn_brain_drain (leave choice). Also sets emigrated.',
  },

  irn_stayer_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Stayed in Iran when the WhatsApp group filled with foreign-country flags — the decision to remain made against the background of the people who left.',
    intent: 'year_texture',
    notes: 'Set by irn_brain_drain (stay choice).',
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

  // ── SAUDI ARABIA ──────────────────────────────────────────────────────────────

  sau_aramco_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up in Saudi Arabia shaped by Aramco — the oil company that built the kingdom\'s infrastructure, funded the state, and employs the grammar of every sentence in Saudi life.',
    intent: 'year_texture',
    notes: 'Set by sau_aramco_generation.',
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

  sau_gulf_war_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the Gulf War and the presence of 500,000 US troops on Saudi soil — the founding grievance of modern jihadism, Bin Laden\'s break with the royal family, the American bases that stayed.',
    intent: 'year_texture',
    notes: 'Set by sau_gulf_war_1990 (both choices).',
  },

  sau_wasta_system: {
    weight: 'minor',
    category: 'identity',
    description: 'Navigated the wasta system — connections, influence, the phone call that does in two days what the official channel takes six months — and understands what it builds and what it prevents.',
    intent: 'year_texture',
    notes: 'Set by sau_wasta (both choices).',
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

  bedouin_nomad_childhood: {
    weight: 'major',
    category: 'identity',
    description: 'Had a nomadic Bedouin childhood — seasonal migration, tent assembly, livestock knowledge, navigation by stars and terrain.',
    intent: 'year_texture',
    notes: 'Set by bdo_tent_childhood (auto-resolve). Powers bdo_settlement_government guard.',
  },

  bedouin_settled: {
    weight: 'major',
    category: 'displacement',
    description: 'Underwent the government-incentivised transition from nomadic to settled life — a concrete house, piped water, a registered plot.',
    intent: 'year_texture',
    notes: 'Set by bdo_settlement_government (both choices). Powers follow-through events.',
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

  // ── JAPAN ─────────────────────────────────────────────────────────────────────

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

  bubble_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age during Japan\'s asset bubble (1985–90) — Imperial Palace land worth more than California, golf memberships traded as securities, the Nikkei at 38,915.',
    intent: 'year_texture',
    notes: 'Set by jpn_bubble_years. Gates jpn_bubble_collapse.',
  },

  lost_decade_generation: {
    weight: 'major',
    category: 'economic',
    description: 'Young adult during Japan\'s Lost Decade (1991–2000) — the Nikkei down 60%, land values halved while loans remained full, the deflation, the restaurants gone, the promotions suspended.',
    intent: 'year_texture',
    notes: 'Set by jpn_bubble_collapse (both choices). Gated on bubble_generation.',
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

  jpn_testigo_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'A witness to Japan\'s long arc — the postwar miracle, the bubble, the collapse, Fukushima — and to the national silence around the war that produced the recovery.',
    intent: 'year_texture',
    notes: 'Set by jpn_war_silence (both choices).',
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

  okinawa_base_opposition: {
    weight: 'moderate',
    category: 'political',
    description: 'Lives under or opposes the US military base concentration in Okinawa — 70% of US bases on less than 1% of Japan\'s land, the 1995 rape protests, the Henoko relocation fight.',
    intent: 'year_texture',
    notes: 'Set by jpn_okinawa_bases (both choices).',
  },

  // ── PERU ──────────────────────────────────────────────────────────────────────

  per_sendero_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Grew up in Peru during the Sendero Luminoso years (1981–92) — the school closures, the ronda campesina patrols, the bodies on the road in the morning. 69,000 dead.',
    intent: 'year_texture',
    notes: 'Set by per_sendero_childhood. Text branches for Quechua vs. coastal. Gates per_cvr event.',
  },

  per_fujimori_era: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the Fujimori decade (1990–2000) — the autogolpe, the anti-inflation shock, the sterilization campaign, the vladivideos.',
    intent: 'year_texture',
    notes: 'Set by per_autogolpe_1992, per_sterilization (refused choice), per_keiko_generation.',
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

  femicidio_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Female Mexican character shaped by the ongoing femicide crisis — the arithmetic of what time, which route, who to text when you arrive.',
    intent: 'year_texture',
    notes: 'Set by la_mex_femicidio. Year texture for Mexican women; can surface as persistent background anxiety.',
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

  earthquake_volunteer: {
    weight: 'moderate',
    category: 'moral',
    description: 'Went into the rubble during a disaster to help dig — not an official, not a soldier, just a person with their hands.',
    intent: 'none',
    notes: 'Set by la_mex_1985_earthquake (volunteer choice). Captures the spontaneous civilian response to the 1985 Mexico earthquake.',
  },

  mex_2017_earthquake_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Lived through the September 19, 2017 Mexico City earthquake — the same date as 1985 — and the civilian solidarity response: bucket chains, silence for the dogs.',
    intent: 'year_texture',
    notes: 'Set by la_mex_2017_earthquake.',
  },

  solidarity_citizen: {
    weight: 'minor',
    category: 'identity',
    description: 'Responded directly to a disaster with physical presence — bucket chains, rescue support, immediate civilian solidarity.',
    intent: 'none',
    notes: 'Set by la_mex_2017_earthquake and similar civilian-response events.',
  },

  paramilitary_era_lived: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived under or was directly affected by AUC paramilitary operations in Colombia — the false positives, the missing cousin, the arithmetic of speaking.',
    intent: 'year_texture',
    notes: 'Set by la_col_auc_paramilitares. Year texture (state/non-state violence); follow-through for Colombia peace process events.',
  },

  // ── CUBA ARC FLAGS ────────────────────────────────────────────────────────

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

  cub_mariel_gone: {
    weight: 'major',
    category: 'arc',
    description: 'Left Cuba during the 1980 Mariel boatlift — one of the 125,000 who crossed when Castro opened the port.',
    intent: 'year_texture',
    notes: 'Set by cub_mariel_1980. Year texture (being "Marielito" before anything else; the Cuba held in memory).',
  },

  cub_mariel_stayed: {
    weight: 'minor',
    category: 'historical',
    description: 'Chose to stay in Cuba while 125,000 others left via the Mariel boatlift in 1980.',
    intent: 'year_texture',
    notes: 'Set by cub_mariel_1980. Year texture (watching the departure, calibrating what staying meant).',
  },

  cub_santeria_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up practicing Santería under Cuba\'s atheist state — the orishas in the back room, the babalawo who doesn\'t advertise.',
    intent: 'year_texture',
    notes: 'Set by cub_santeria_underground for folk_religion Cubans. Year texture (two registers: revolutionary and Yoruba-inflected).',
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

  // ── LAOS ARC FLAGS ───────────────────────────────────────────────────────

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

  laos_alms_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up with the Buddhist morning alms round as daily texture — kneeling at dawn, giving sticky rice, the social fabric of merit maintained through the gesture.',
    intent: 'year_texture',
    notes: 'Set by laos_alms_round. Year texture (what you give out of the house at dawn comes back).',
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

  laos_mekong_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up with the Mekong as both boundary and commute — Thailand visible from the bank, the kip and baht savings, the porous border economy.',
    intent: 'year_texture',
    notes: 'Set by laos_mekong_economy. Year texture (the river that makes the country feel bounded and open simultaneously).',
  },

  laos_china_era: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived the Chinese investment wave — rail line, SEZs, debt concessions, signs in Chinese, the ratio of benefit to obligation that nobody shares.',
    intent: 'year_texture',
    notes: 'Set by laos_china_investment. Year texture (Battery of Southeast Asia / what the battery costs).',
  },

  laos_dam_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the Mekong dam reckoning — eleven upstream dams in China, fish stocks declining, the 2018 collapse that killed 49, electricity sold to Thailand.',
    intent: 'year_texture',
    notes: 'Set by laos_mekong_dams. Year texture (the river the fishermen were born on is changing).',
  },

  // ── NAMIBIA ARC FLAGS ────────────────────────────────────────────────────

  nam_herero_memory_bearer: {
    weight: 'major',
    category: 'historical',
    description: 'Herero or Nama character who carries the oral memory of the 1904-08 genocide — the Extermination Order, the bones sent to Germany, the generational transmission of loss.',
    intent: 'year_texture',
    notes: 'Set by nam_herero_oral_history and nam_german_apology_herero_nama. Year texture (the bone of history passed through telling).',
  },

  nam_communal_land_lived: {
    weight: 'moderate',
    category: 'economic',
    description: 'Grew up with the communal vs. commercial farm divide in post-independence Namibia — the fence between ancestral land and white-owned title.',
    intent: 'year_texture',
    notes: 'Set by nam_communal_land_divide. Year texture (the fence still there after independence).',
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

  nam_diamond_country: {
    weight: 'minor',
    category: 'economic',
    description: 'Aware of the Sperrgebiet diamond contradiction — top-value diamond producer, understaffed hospitals; the resource curse as personal geography.',
    intent: 'year_texture',
    notes: 'Set by nam_diamond_wealth. Year texture (two facts in the same country).',
  },

  nam_san_displaced: {
    weight: 'major',
    category: 'identity',
    description: 'San character evicted from ancestral land into resettlement — losing veldkos knowledge, ancestral waterholes, language; thirty-two speakers of your age.',
    intent: 'year_texture',
    notes: 'Set by nam_san_ancestral_land. Year texture (what the resettlement area came with and didn\'t come with).',
  },

  nam_independence_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Was in Namibia for independence on March 21, 1990 — the last African country to achieve independence from colonial/apartheid rule.',
    intent: 'year_texture',
    notes: 'Set by nam_independence_1990 world event. Year texture (the flag that was not there before and is there now).',
  },

  // ── SRI LANKA FLAGS ───────────────────────────────────────────────────────

  black_july_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'Tamil Sri Lankan character survived the July 1983 anti-Tamil pogrom in Colombo — electoral registers used to identify Tamil homes, police standing by.',
    intent: 'both',
    notes: 'Set by slk_black_july. Ribbon: the_black_july. A founding event of the Tamil diaspora.',
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

  aragalaya_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Character participated in the 2022 Aragalaya (struggle) — Sri Lanka\'s multiethnic protest movement that brought down the Rajapaksa presidency.',
    intent: 'event',
    notes: 'Set by slk_2022_collapse (protested path). Ribbon: the_aragalaya.',
  },

  // ── MOROCCO FLAGS ─────────────────────────────────────────────────────────

  amazigh_identity: {
    weight: 'moderate',
    category: 'identity',
    description: 'Amazigh Moroccan character navigates a country where their language was excluded from official life — school in Arabic, name from the approved list.',
    intent: 'both',
    notes: 'Set by mor_amazigh_school and mor_amazigh_name. Follow-through: mor_amazigh_recognition.',
  },

  years_of_lead_generation: {
    weight: 'major',
    category: 'political',
    description: 'Character lived through the Années de Plomb — Hassan II\'s era of political detention, disappearances, and the specific learned silence of a Moroccan university in the 1970s.',
    intent: 'both',
    notes: 'Set by mor_years_of_lead. Follow-through: mor_years_of_lead_echo. Ribbon: the_years_of_lead.',
  },

  moroccan_diaspora: {
    weight: 'moderate',
    category: 'migration',
    description: 'Moroccan character emigrated to France, Spain, or elsewhere — carrying the Darija of someone who left, and the obligation to send money home.',
    intent: 'both',
    notes: 'Set by mor_strait_decision (crossed path). Follow-through: mor_diaspora_late.',
  },

  amazigh_recognition_era: {
    weight: 'minor',
    category: 'identity',
    description: 'Amazigh character witnessed the 2011 constitutional recognition of Tifinagh — ambivalent about whether recognition without resources is meaningful.',
    intent: 'event',
    notes: 'Set by mor_amazigh_recognition (both paths).',
  },

  // ── ROHINGYA FLAGS ────────────────────────────────────────────────────────

  rohingya_stateless: {
    weight: 'major',
    category: 'legal',
    description: 'Rohingya character is stateless under Myanmar\'s 1982 Citizenship Law — listed as temporary resident in the country where their family has lived for generations.',
    intent: 'both',
    notes: 'Set by roh_stateless_document. Gates roh_restricted_movement. Ribbon: the_temporary_resident.',
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

  // ── TANZANIA FLAGS ────────────────────────────────────────────────────────

  ujamaa_generation: {
    weight: 'major',
    category: 'political',
    description: 'Tanzanian character lived through Nyerere\'s ujamaa era — believed in or sceptical of the Arusha Declaration, was moved in Operation Vijiji, carries the complexity of a failed vision that built real schools.',
    intent: 'both',
    notes: 'Set by tan_arusha_declaration. Follow-throughs: tan_villagisation, tan_ujamaa_late_reckoning, tan_nyerere_death.',
  },

  swahili_educated: {
    weight: 'moderate',
    category: 'education',
    description: 'Tanzanian character educated in Swahili — giving national cohesion and a ceiling against international opportunity simultaneously.',
    intent: 'event',
    notes: 'Set by tan_swahili_education. A specific trade-off that distinguishes Tanzania from all other African education systems.',
  },

  multiparty_generation: {
    weight: 'minor',
    category: 'political',
    description: 'Character witnessed their country\'s first multiparty elections — the specific experience of an opposition name on a ballot for the first time.',
    intent: 'event',
    notes: 'Set by tan_multiparty and other transitions to democracy events.',
  },

  // ── MULTILINGUALISM FLAGS ─────────────────────────────────────────────────

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

  // ── SOLDIER ARC FLAGS ────────────────────────────────────────────────────

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

  moral_weight_carried: {
    weight: 'major',
    category: 'moral',
    description: 'Character followed an order or made a decision whose weight has not reduced with time — not unresolved, just present.',
    intent: 'both',
    notes: 'Set by sol_the_order and other high-stakes compliance events. Follow-through: sol_late_reckoning.',
  },

  veteran_silence: {
    weight: 'moderate',
    category: 'military',
    description: 'Character has learned the short answer — the version of their service that fits in a conversation. The longer version travels with them.',
    intent: 'event',
    notes: 'Set by sol_the_question. Surfaces in year texture for characters with returned_veteran flag.',
  },

  veteran_solidarity: {
    weight: 'moderate',
    category: 'community',
    description: 'Character has found someone else who served — the specific shorthand, not having to perform the short answer.',
    intent: 'event',
    notes: 'Set by sol_veteran_recognition.',
  },

  // ── DOCUMENT/IDENTITY FLAGS ───────────────────────────────────────────────

  colonial_category: {
    weight: 'major',
    category: 'identity',
    description: 'Character\'s ethnic identity was fixed and documented by a colonial administration — the ledger entry that became more real than what was said.',
    intent: 'both',
    notes: 'Set by doc_colonial_census. Follow-through: doc_category_becomes_fate.',
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

  rwandan_survivor: {
    weight: 'major',
    category: 'persecution',
    description: 'Character survived the 1994 Rwandan genocide — crossed a checkpoint, watched who did not cross, has never fully stopped walking past it.',
    intent: 'both',
    notes: 'Set by doc_rwandan_id_1994. High-weight flag; should dominate the epitaph.',
  },

  // ── RWANDA ────────────────────────────────────────────────────────────────────

  rwa_habyarimana_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up in Habyarimana\'s Rwanda 1973-1994 — ethnic quotas, single-party state, the ID card that categorized you before you understood what the category meant.',
    intent: 'year_texture',
    notes: 'Set by rwa_habyarimana_childhood. Both Hutu and Tutsi perspectives (branched text).',
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

  // ── CENTRAL ASIA FLAGS ────────────────────────────────────────────────────

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

  forced_harvest: {
    weight: 'moderate',
    category: 'labor',
    description: 'Character was mobilised for state agricultural harvest as a child or student — Uzbek cotton quota, school closed September-November.',
    intent: 'both',
    notes: 'Set by cas_uzbek_cotton and cas_uzbek_harvest_adult.',
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

  tajik_peace_generation: {
    weight: 'moderate',
    category: 'moral',
    description: 'Character witnessed the 1997 General Agreement on Peace — watched commanders who gave orders for atrocities receive government uniforms.',
    intent: 'none',
    notes: 'Set by taj_peace_1997. The uncomfortable texture of impunity dressed as reconciliation.',
  },

  tajik_remittance_dependent: {
    weight: 'moderate',
    category: 'economics',
    description: 'Character\'s household depends directly on remittances from a family member working abroad — the arithmetic of absence.',
    intent: 'year_texture',
    notes: 'Set by taj_remittance_economy (dependent branch). Tajikistan has highest remittance-to-GDP ratio in the world.',
  },

  tajik_stayed_home: {
    weight: 'minor',
    category: 'migration',
    description: 'Character stayed when others left for Russia — the village with the demographic gap, the quietness of a particular kind.',
    intent: 'none',
    notes: 'Set by taj_remittance_economy (independent branch).',
  },

  turkmenbashi_generation: {
    weight: 'major',
    category: 'identity',
    description: 'Character grew up under Niyazov\'s personality cult — reciting Ruhnama passages, watching January renamed Turkmenbashi, the rotating golden statue.',
    intent: 'year_texture',
    notes: 'Set by tkm_niyazov_cult. The childhood indoctrination that is never entirely shed.',
  },

  turkmenistan_gas_generation: {
    weight: 'moderate',
    category: 'economics',
    description: 'Character understands the gap between Turkmenistan\'s fourth-largest gas reserves and the state of its hospitals and institutions.',
    intent: 'year_texture',
    notes: 'Set by tkm_gas_wealth_invisible. Resource wealth as a fact about someone else\'s palace.',
  },

  turkmenistan_closed_world: {
    weight: 'major',
    category: 'identity',
    description: 'Character lives in Turkmenistan\'s information environment — filtered internet, banned VPNs, passport controls, the permitted-to-leave register.',
    intent: 'year_texture',
    notes: 'Set by tkm_isolation. The normalisation of not knowing what normal is.',
  },

  // ── CLERGY / RELIGIOUS INSTITUTION FLAGS ────────────────────────────────

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

  rebuilt_institution: {
    weight: 'major',
    category: 'community',
    description: 'Character rebuilt a religious or civic institution from near-zero — teaching what remained of a tradition to a generation that grew up without any.',
    intent: 'event',
    notes: 'Set by cle_cambodia_rebuilding. The specific solemnity of rebuilding from almost nothing.',
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

  // ── SENEGAL FLAGS ─────────────────────────────────────────────────────────

  mouride_member: {
    weight: 'moderate',
    category: 'religion',
    description: 'Character is part of the Mouride Sufi brotherhood — its economy, its spiritual authority, its city of Touba, its transnational dahira network that predates and outlasts the nation-state.',
    intent: 'both',
    notes: 'Set by sen_magal_touba. Follow-throughs: sen_marabout_authority, sen_diaspora_dahira.',
  },

  diaspora_community_built: {
    weight: 'moderate',
    category: 'community',
    description: 'Character built or joined a diaspora community structure — a savings circle, a prayer group, a mutual aid network that recreates belonging in a new geography.',
    intent: 'event',
    notes: 'Set by sen_diaspora_dahira. Cross-cultural flag also set by other diaspora community events.',
  },

  francophone_educated: {
    weight: 'moderate',
    category: 'education',
    description: 'Character educated in the French colonial tradition — carrying tools that open doors in Paris and Dakar, with specific ambivalence about who those tools were made for.',
    intent: 'both',
    notes: 'Set by sen_gorée_school. Specific to Francophone Africa; relates to Négritude and the colonial education project.',
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
  sen_casamance_inside: {
    weight: 'major',
    category: 'trauma',
    description: 'From the Casamance region — lived with the low-intensity conflict, demining alerts, roadblocks, neighbours who left, the map of areas where you do not walk',
    intent: 'year_texture',
    notes: 'Set by sen_casamance (inside choice). Year texture: the specific geography of a region that is inside a country and also partly outside it.',
  },
  teranga_household: {
    weight: 'moderate',
    category: 'social',
    description: 'Lives by teranga — the Wolof obligation of hospitality that exceeds cultural preference, requiring you to feed visitors and shelter family regardless of your own means',
    intent: 'year_texture',
    notes: 'Set by sen_teranga. Year texture: the meal that couldn\'t be spared, the debt that runs across generations.',
  },
  sen_intellectual_dakar: {
    weight: 'moderate',
    category: 'cultural',
    description: 'Encountered the Dakar intellectual world — Cheikh Anta Diop, Présence Africaine, IFAN, the argument that African civilisation precedes Europe — and was changed by it',
    intent: 'year_texture',
    notes: 'Set by sen_dakar_intellectual. Year texture: the specific feeling of an argument that reframes everything.',
  },

  // ── ADOPTEE FLAGS ─────────────────────────────────────────────────────────

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

  origin_country_visited: {
    weight: 'moderate',
    category: 'identity',
    description: 'Character visited the country they were born in as an adoptee — landscape matching something they could not have remembered, sharing faces with people who are supposed to be an origin.',
    intent: 'event',
    notes: 'Set by adp_origin_trip. Midlife event; the specific feeling has no single word in either language.',
  },

  // ── UYGHUR FLAGS ──────────────────────────────────────────────────────────

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

  uyghur_diaspora: {
    weight: 'major',
    category: 'displacement',
    description: 'Uyghur character fled to Kazakhstan, Turkey, or a third country before the invitation became a summons — phone number changed, told no one who might be asked.',
    intent: 'both',
    notes: 'Set by uyg_camp_era (fled branch). Follow-through: uyg_diaspora_silence — the testimony decision when family is still inside.',
  },

  // ── PUERTO RICO FLAGS ─────────────────────────────────────────────────────

  maria_survivor: {
    weight: 'major',
    category: 'disaster',
    description: 'Character survived Hurricane Maria in 2017 — the sixteen days without power becoming weeks, the government reporting 64 deaths while 2,975 people died.',
    intent: 'both',
    notes: 'Set by pr_maria_2017. The gap between the official count and the actual count is educational payload. Follow-through in diaspora events.',
  },

  colonial_subject: {
    weight: 'moderate',
    category: 'political',
    description: 'Character from Puerto Rico: US citizen, not eligible to vote for US president, represented by a non-voting delegate. The other word is not used in official documents.',
    intent: 'both',
    notes: 'Set by pr_colonial_status. The specific constitutional paradox of Puerto Rico\'s status makes this a useful educational event.',
  },

  // ── HEALTH WORLD EVENTS ───────────────────────────────────────────────────

  ebola_survivor: {
    weight: 'moderate',
    category: 'health',
    description: 'Lived through the 2014–2016 Ebola epidemic in West Africa — the quarantine lines, the fear of touching the sick, the neighbors who did not recover.',
    intent: 'both',
    notes: 'Set by worldEvents.js Ebola world event for West Africa. Year texture prose for aftermath; health anxiety; survivor guilt.',
  },

  // ── CAREER FLAGS ──────────────────────────────────────────────────────────

  interrupted_career: {
    weight: 'moderate',
    category: 'career',
    description: 'Career interrupted by mandatory military service — the years of civilian professional life lost, the difficulty of re-entering where others had not stopped.',
    intent: 'both',
    notes: 'Set by events_culture.js mandatory service event (serve branch). Follow-through: career resentment, difficulty re-entering civilian work.',
  },

  // ── KENYA ──────────────────────────────────────────────────────────────────

  ken_silent_under_moi: {
    weight: 'moderate',
    category: 'political',
    description: 'Stayed quiet during the Moi single-party era in Kenya (1982–91) — the learned suppression of political speech, the monitoring of who talks too much.',
    intent: 'event',
    notes: 'Set by ken_moi_silence (silent branch). Follow-through: ken_moi_silence_late (late_life reflection on the silence).',
  },

  ken_crossed_nairobi: {
    weight: 'minor',
    category: 'conflict',
    description: 'Crossed Nairobi during the 2007–08 post-election violence, navigating roadblocks listening for names and accents.',
    intent: 'none',
    notes: 'Set by ken_post_election_2007 (crossed branch). No follow-through required — the experience is self-contained.',
  },

  maasai_moran: {
    weight: 'major',
    category: 'identity',
    description: 'Completed the moran age-grade initiation — the ceremony, the ochre, the spear, the specific knowledge of cattle and land that comes with the role.',
    intent: 'year_texture',
    notes: 'Set by ken_maasai_moran (auto-resolve). Powers ken_maasai_nairobi_choice guard. Year texture in buildYearTexture for pastoral/cattle memory.',
  },

  maasai_land_displaced: {
    weight: 'major',
    category: 'displacement',
    description: 'Displaced from ancestral Maasai grazing land by wildlife conservation boundaries — the experience of the land becoming "protected" from the people who lived on it.',
    intent: 'year_texture',
    notes: 'Set by ken_maasai_land_displacement (both branches). Year texture: the animals inside worth more than the people outside.',
  },

  maasai_nairobi: {
    weight: 'major',
    category: 'migration',
    description: 'Left pastoral Maasai life for Nairobi — the city that does not know your age-grade or lineage, where you start over.',
    intent: 'year_texture',
    notes: 'Set by ken_maasai_nairobi_choice (Nairobi branch). Year texture: urban Maasai identity, caught between worlds.',
  },

  maasai_stayed_pastoral: {
    weight: 'moderate',
    category: 'identity',
    description: 'Chose to remain in pastoral Maasai life as the land contracted — the droughts, the shrinking group ranches, the ones who left.',
    intent: 'none',
    notes: 'Set by ken_maasai_nairobi_choice (stayed branch). No follow-through required — the life is the texture.',
  },

  // ── ETHIOPIA ───────────────────────────────────────────────────────────────

  eth_red_terror_survived: {
    weight: 'major',
    category: 'conflict',
    description: 'Survived the Derg Red Terror 1977–78 by staying invisible — watching neighbours disappear, learning the calculus of silence under a regime that killed on lists.',
    intent: 'event',
    notes: 'Set by eth_red_terror_1977 (survived branch). Follow-through: eth_red_terror_echo (late_life, when asked about it as history).',
  },

  eth_abiy_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived through the Abiy Ahmed 2018 moment — the peace deal with Eritrea, the border opening, the Nobel Peace Prize, the euphoria of a country that seemed to be turning.',
    intent: 'year_texture',
    notes: 'Set by eth_abiy_peace_2018. Precedes the Tigray war context.',
  },

  eth_tigray_witnessed: {
    weight: 'major',
    category: 'trauma',
    description: 'Witnessed the 2020-2022 Tigray War — 300,000-500,000 dead, Eritrean troops, systematic rape, the Nobel Peace laureate at war in the north, the communications blackout.',
    intent: 'year_texture',
    notes: 'Set by eth_tigray_war_2020 (both choices).',
  },

  // ── ZIMBABWE (registering existing unregistered flags) ────────────────────

  gukurahundi_generation: {
    weight: 'major',
    category: 'conflict',
    description: 'Ndebele child or adolescent in Matabeleland during the Gukurahundi massacres 1983–87 — twenty thousand killed by the North Korean-trained Fifth Brigade, the silence enforced for decades.',
    intent: 'event',
    notes: 'Set by zim_gukurahundi in events_zimbabwe.js. Follow-through: zim_gukurahundi_late (late_life, when the word enters the historical record).',
  },

  zim_hyperinflation_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived through Zimbabwe\'s hyperinflation 2007–09 — hundred-trillion-dollar notes, morning shopping before prices changed, the abstract collapse of numerical meaning.',
    intent: 'event',
    notes: 'Set by zim_hyperinflation in events_zimbabwe.js. Follow-through: zim_hyperinflation_late (late_life, when asked to explain it).',
  },

  zimbabwe_independence_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Grew up in the first decade of Zimbabwean independence (1980s) when the country was genuinely building — schools, clinics, a functioning economy.',
    intent: 'none',
    notes: 'Set by zim_mugabe_early (childhood). The optimism of that era shapes how the later collapse is experienced.',
  },

  zim_land_reform_witness: {
    weight: 'moderate',
    category: 'economic',
    description: 'Witnessed the Fast Track Land Reform — commercial farms going to party officials, food supply collapsing, the gap between the stated and actual purpose of the programme.',
    intent: 'none',
    notes: 'Set by zim_land_reform_black in events_zimbabwe.js.',
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

  zim_xenophobia_2008: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived or witnessed the May 2008 xenophobic violence in South Africa — 62 killed, 100,000 displaced within South Africa. Started in Alexandra, spread to other townships.',
    intent: 'year_texture',
    notes: 'Set by zim_xenophobic_2008 event. Year texture: the specific weight of that month, remaining in a country where it happened.',
  },

  zim_diaspora_return: {
    weight: 'moderate',
    category: 'immigration',
    description: 'Returned to Zimbabwe after years in the diaspora — chose to go back rather than remain in South Africa in late life.',
    intent: 'none',
    notes: 'Set by zim_diaspora_late (return choice).',
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

  // ── IDENTITY FLAGS (Mode B: never-checked identity flags) ─────────────────────

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

  // ── Southeast Europe ──────────────────────────────────────────────────────────
  romania_decree_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Romanian woman whose reproductive choices were constrained by Decree 770 (1966–89)',
    intent: 'year_texture',
    notes: 'Set by eur_rom_decree_770. State-mandated pregnancy risk; knowledge shared between women below official channels.',
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

  decree_779_generation: {
    weight: 'major',
    category: 'gender',
    description: 'Romanian woman who lived under Decree 779 (1966-1989) — abortion and contraception banned, menstrual inspections, forced natalism, illegal procedures in unsafe conditions.',
    intent: 'both',
    notes: 'Set by rom_decree_779. Needs year texture + late-life reckoning.',
  },

  romania_1989_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Was in Romania for the December 1989 revolution — Timișoara, Ceaușescu\'s last speech, the helicopter, the execution on Christmas Day.',
    intent: 'year_texture',
    notes: 'Set by rom_revolution_1989.',
  },

  eu_emigrant_romania: {
    weight: 'moderate',
    category: 'migration',
    description: 'Romanian who emigrated to Western Europe post-EU accession (2007) — one of the 3-4 million who left for Spain, Italy, the UK, Germany.',
    intent: 'year_texture',
    notes: 'Set by rom_eu_emigration.',
  },
  stayed_when_others_left: {
    weight: 'moderate',
    category: 'identity',
    description: 'Chose to remain in a country or city others fled — transition, conflict, or collapse',
    intent: 'year_texture',
    notes: 'Set by eur_rom_post89_transition (Romania) and potentially other emigration-choice events.',
  },
  // ── HUNGARY ARC (events_central_europe.js) ───────────────────────────────────

  hungarian_1956_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed or survived the 1956 Hungarian uprising and the Soviet re-occupation — the twelve days and what followed',
    intent: 'year_texture',
    notes: 'Set by hun_1956_uprising_child, hun_1956_uprising_adult, and worldEvent hungarian_uprising_1956.',
  },

  hungarian_diaspora_1956: {
    weight: 'major',
    category: 'identity',
    description: 'Left Hungary after the 1956 uprising — one of 200,000 who crossed the Austrian border before it closed',
    intent: 'year_texture',
    notes: 'Set by hun_1956_uprising_adult (left choice).',
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

  // ── CZECH REPUBLIC ARC (events_central_europe.js) ────────────────────────────

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

  // ── BALTIC STATES ARC (events_baltic.js) ─────────────────────────────────────

  deportation_family_memory: {
    weight: 'major',
    category: 'trauma',
    description: 'Family member deported to Siberia in 1941 or 1949 — the Baltic Soviet deportations; absent relative who shapes identity',
    intent: 'year_texture',
    notes: 'Set by balt_deportation_family. Year texture in buildYearTexture. Follow-through: ft20_deportation_late.',
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
  nato_bombing_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the 78-day NATO bombing of Serbia/Belgrade, March–June 1999',
    intent: 'year_texture',
    notes: 'Set by eur_ser_nato_bombing_1999. Two branches: stayed in Belgrade, left city.',
  },
  serbian_democratic_transition: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed October 5, 2000 — the fall of Milošević and the DOS electoral revolution',
    intent: 'year_texture',
    notes: 'Set by eur_ser_milosevic_falls. Specific feeling of sudden absence after long resistance.',
  },

  // ── GEORGIA ARC (events_georgia.js) ──────────────────────────────────────────

  april_9_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed or survived the April 9, 1989 Tbilisi massacre — Soviet troops killing 21 at the peaceful Rustaveli vigil',
    intent: 'year_texture',
    notes: 'Set by geo_april9_1989. Follow-through: ft21_april9_late.',
  },

  abkhazia_displaced_connection: {
    weight: 'major',
    category: 'trauma',
    description: 'Has family or close connection to the 250,000 Georgians displaced from Abkhazia in the 1992–93 war',
    intent: 'year_texture',
    notes: 'Set by geo_abkhazia_war.',
  },

  rose_revolution_georgia: {
    weight: 'moderate',
    category: 'historical',
    description: 'Participated in or witnessed the Georgian Rose Revolution, November 2003 — Shevardnadze\'s peaceful removal',
    intent: 'year_texture',
    notes: 'Set by geo_rose_revolution.',
  },

  georgian_war_2008: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the 2008 Russia-Georgia war — Russian tanks within 40km of Tbilisi, South Ossetia and Abkhazia occupation',
    intent: 'year_texture',
    notes: 'Set by geo_war_2008. Follow-through: ft21_war_2008_late.',
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

  geo_saakashvili_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the Saakashvili reform era 2004–2012 — overnight police reform, anti-corruption, but also the 2007 crackdown',
    intent: 'year_texture',
    notes: 'Set by geo_saakashvili_era.',
  },

  geo_testigo_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Late-life witness to the full Georgia arc — April 9 to Rose Revolution to 2008 war to the EU protests',
    intent: 'both',
    notes: 'Set by geo_late_reckoning.',
  },

  // ── NORTH KOREA ARC (events_north_korea.js) ──────────────────────────────────

  dprk_juche_childhood: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up in North Korea with Juche indoctrination from before literacy — the portrait above the blackboard, the political primer before the reading primer',
    intent: 'year_texture',
    notes: 'Set by dprk_juche_childhood.',
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

  dprk_criticism_session: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived the weekly saenghwal chonghwa self-criticism sessions — the calibration of how harshly to criticize, neither too lenient nor too harsh',
    intent: 'year_texture',
    notes: 'Set by dprk_criticism_session.',
  },

  dprk_arduous_march: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the Arduous March famine 1994-98 — Public Distribution System collapsed, 300K-1M dead, the official name requiring you to be a soldier marching toward victory',
    intent: 'year_texture',
    notes: 'Set by dprk_arduous_march.',
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

  dprk_defected: {
    weight: 'major',
    category: 'displacement',
    description: 'Defected from North Korea — the river at 3am, the months of dangerous transit, arriving in a country that is technically yours',
    intent: 'both',
    notes: 'Set by dprk_defection_calculation choice cross. Follow-through: dprk_hanawon_complete.',
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

  // ── URUGUAY ARC (events_uy_py_ec.js) ─────────────────────────────────────────

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

  uru_dictatorship_lived: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived Uruguay\'s 1973-85 military dictatorship — highest per-capita political prisoner rate in world, Tupamaro leaders in sensory deprivation',
    intent: 'year_texture',
    notes: 'Set by uru_dictatorship_life.',
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

  // ── PARAGUAY ARC (events_uy_py_ec.js) ────────────────────────────────────────

  pry_guarani_speaker: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up bilingual in Spanish and Guaraní — the only country in Latin America where an indigenous language is genuinely majority-spoken',
    intent: 'year_texture',
    notes: 'Set by pry_guarani_identity.',
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

  // ── ECUADOR ARC (events_uy_py_ec.js) ─────────────────────────────────────────

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

  // ── BELARUS ARC (events_belarus.js) ──────────────────────────────────────────

  bel_partisan_memory: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up with living memory of WWII partisan war in Belarus — a third of the population dead, every family with a grave',
    intent: 'year_texture',
    notes: 'Set by bel_partisan_memory.',
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

  bel_crackdown_survived: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the post-2020 crackdown — Raman Bandarenka, the Okrestina detention centre, Ryanair flight forced down',
    intent: 'year_texture',
    notes: 'Set by bel_crackdown. Splits into bel_exile or bel_stayed_2020.',
  },

  bel_exile: {
    weight: 'major',
    category: 'displacement',
    description: 'Left Belarus after 2020 — Warsaw, Vilnius; the Belarusian expat community large enough to have its own cafes and funerals',
    intent: 'both',
    notes: 'Set by bel_crackdown choice left. Follow-through: bel_exile_life.',
  },

  bel_stayed_2020: {
    weight: 'major',
    category: 'identity',
    description: 'Stayed in Belarus after 2020 — learned what staying required, the changed calculations, the new language of the situation',
    intent: 'year_texture',
    notes: 'Set by bel_crackdown choice stayed.',
  },

  // ── ARMENIA ARC (events_armenia_azerbaijan.js) ───────────────────────────────

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

  arm_baku_refugee_host: {
    weight: 'moderate',
    category: 'social',
    description: 'Hosted Armenian refugees from Azerbaijan (1988-1991) fleeing the Baku pogroms',
    intent: 'year_texture',
    notes: 'Set by arm_baku_refugees event.',
  },

  arm_dark_winter_survivor: {
    weight: 'major',
    category: 'historical',
    description: 'Survived the Armenian blockade winters 1992-1997 — one hour of electricity per day, unheated apartments',
    intent: 'year_texture',
    notes: 'Set by arm_dark_winter. Follow-through: ft22_arm_dark_winter_echo.',
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

  arm_karabakh_veteran_1: {
    weight: 'major',
    category: 'military',
    description: 'Served in the First Karabakh War 1991-1994 — the victory that became the wound of 2020',
    intent: 'both',
    notes: 'Set by arm_karabakh_veteran. Follow-through: ft22_arm_karabakh_veteran_late.',
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

  arm_war_2020_loss: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the November 2020 defeat — Shushi fallen, ceasefire signed at 3am, Karabakh lost',
    intent: 'year_texture',
    notes: 'Set by arm_war_2020. Follow-through: ft22_arm_karabakh_veteran_late (with veteran flag).',
  },

  // ── AZERBAIJAN ARC (events_armenia_azerbaijan.js) ────────────────────────────

  azr_black_january_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed or survived Black January 1990 — Soviet army killing 131 Baku civilians in pro-independence crackdown',
    intent: 'year_texture',
    notes: 'Set by azr_black_january. World event possible.',
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

  azr_karabakh_idp: {
    weight: 'major',
    category: 'displacement',
    description: 'Internally displaced from Nagorno-Karabakh or surrounding districts 1993-2020 — railway carriage, unfinished building, the deed',
    intent: 'both',
    notes: 'Set by azr_karabakh_idp event. Follow-through: azr_karabakh_return_2023, ft22_azr_idp_return.',
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

  // ── TAIWAN ARC (events_taiwan_malaysia.js) ───────────────────────────────────

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

  waishengren_generation: {
    weight: 'major',
    category: 'identity',
    description: 'Mainlander (Waishengren) — came to Taiwan with the KMT in 1949 or child of those who did; the temporary that became permanent',
    intent: 'year_texture',
    notes: 'Set by twn_waishengren.',
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

  // ── MALAYSIA ARC (events_taiwan_malaysia.js) ─────────────────────────────────

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

  // ── SINGAPORE ARC (events_singapore.js) ──────────────────────────────────

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

  sg_hdb_generation: {
    weight: 'minor',
    category: 'social',
    description: 'Grew up in HDB public housing — the Singapore social engineering project that housed 80% of the population',
    intent: 'event',
    notes: 'Set by sg_psle_exam (both choices).',
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

  sg_eip_generation: {
    weight: 'minor',
    category: 'social',
    description: 'Encountered Singapore\'s Ethnic Integration Policy in housing — where you can live partially determined by your ethnicity',
    intent: 'event',
    notes: 'Set by sg_ethnic_quota.',
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

  // ── PAKISTAN ARC (events_pakistan.js) ────────────────────────────────────

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

  benazir_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Pakistani shaped by Benazir Bhutto\'s assassination on December 27, 2007 — the first female prime minister of a Muslim-majority country, killed at a Rawalpindi rally.',
    intent: 'year_texture',
    notes: 'Set by pak_benazir_assassination_2007.',
  },

  aps_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Pakistani shaped by the December 16, 2014 APS Peshawar massacre — 132 children killed by Pakistani Taliban; the school hall, the silence that followed.',
    intent: 'year_texture',
    notes: 'Set by pak_aps_peshawar_2014. Auto-resolve event.',
  },

  blasphemy_law_era: {
    weight: 'major',
    category: 'political',
    description: 'Pakistani shaped by the blasphemy accusation architecture — the crowd that assembles before the court, Asia Bibi, the teacher who cannot go home.',
    intent: 'year_texture',
    notes: 'Set by pak_blasphemy_fear.',
  },

  afghan_crisis_neighbor: {
    weight: 'moderate',
    category: 'experience',
    description: 'Lived with Afghan refugee crisis and Afghan war spillover',
    intent: 'year_texture',
    notes: 'Pakistan 1980s. Year texture in buildYearTexture.',
  },

  womens_rights_restricted: {
    weight: 'major',
    category: 'discrimination',
    description: 'Experienced legal discrimination under gender-unequal legal framework',
    intent: 'year_texture',
    notes: 'Pakistan Hudood/Zina; may overlap with other countries. Year texture in buildYearTexture.',
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

  // ── Japan ─────────────────────────────────────────────────────────────────────

  hibakusha_stigma_lived: {
    weight: 'major',
    category: 'trauma',
    description: 'Atomic bomb survivor or survivor\'s child carrying the hibakusha stigma — marriage discrimination, employment barriers, the generation that could not speak openly about what happened to them.',
    intent: 'year_texture',
    notes: 'Set by ca2_japan_hibakusha_stigma / ca2_japan_hibakusha_hidden.',
  },

  anpo_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Participated in the 1960 Anpo protests against the US-Japan security treaty — the largest protest in postwar Japanese history, and its aftermath of disillusionment.',
    intent: 'year_texture',
    notes: 'Set by ca2_japan_anpo_protests.',
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

  lost_decade_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through Japan\'s Lost Decade (1991-2001) — the Nikkei at 16,000, the permanent employment that became temporary, the asset values that never returned.',
    intent: 'year_texture',
    notes: 'Set by ca2_japan_bubble_collapse.',
  },

  earthquake_country: {
    weight: 'minor',
    category: 'experience',
    description: 'Grew up in Japan with earthquake drills as ordinary life — the bag by the door, the chart of safe buildings, the alarm that is never a surprise.',
    intent: 'none',
    notes: 'Set by ca2_japan_earthquake_preparedness. Texture only; no downstream event needed.',
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

  hikikomori_adjacent: {
    weight: 'minor',
    category: 'relationship',
    description: 'Knew someone who withdrew into hikikomori — the closed door, the television, the family that didn\'t know what to do.',
    intent: 'none',
    notes: 'Set by ca2_japan_hikikomori. No downstream event needed; texture flag.',
  },

  tohoku_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'In Tōhoku on March 11, 2011 — the 9.0 earthquake, the tsunami that came forty minutes later, the line where the wave stopped and everything on one side was gone.',
    intent: 'year_texture',
    notes: 'Set by ca2_japan_tohoku_2011 (affected area choice).',
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

  // ── South Korea ───────────────────────────────────────────────────────────────
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
  korean_speed_culture: {
    weight: 'moderate',
    category: 'identity',
    description: 'Internalized ppalli-ppalli (hurry-hurry) — South Korea\'s cultural tempo as a personal rhythm',
    intent: 'year_texture',
    notes: 'Set by korea_ppalli_ppalli.',
  },

  // ── Egypt ─────────────────────────────────────────────────────────────────────
  nasser_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up during the Nasser era — Suez nationalization, pan-Arab nationalism, radio speeches that stopped rooms',
    intent: 'year_texture',
    notes: 'Set by egy_nasser_dream. Egypt 1956-67.',
  },
  naksa_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the June 1967 Six-Day War defeat — the Naksa, the collapse of the Nasser dream',
    intent: 'year_texture',
    notes: 'Set by egy_naksa_1967. Two branches: personal belief shattered, or brother at front.',
  },
  infitah_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age during Sadat\'s infitah (open door) — foreign goods, class stratification, not everyone on the same side',
    intent: 'year_texture',
    notes: 'Set by egy_sadat_infitah.',
  },
  mubarak_emergency_generation: {
    weight: 'moderate',
    category: 'experience',
    description: 'Lived under the 1981-2011 Emergency Law — detention without charge, the shape of what you don\'t say',
    intent: 'year_texture',
    notes: 'Set by egy_mubarak_emergency.',
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
  arab_spring_disillusionment: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived the post-Tahrir counter-revolution — emergency law returns, square holds different meaning',
    intent: 'year_texture',
    notes: 'Set by egy_tahrir_aftermath. Gates on tahrir_generation.',
  },
  sadat_assassination_witness: {
    weight: 'moderate',
    category: 'historical',
    description: 'Present in Egypt the day Sadat was assassinated (October 6, 1981) — witnessed the moment that delivered Mubarak and thirty years of emergency law',
    intent: 'none',
    notes: 'Set by we_sadat_assassination_1981 world event.',
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

  // ── India ─────────────────────────────────────────────────────────────────────
  emergency_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 1975-77 Emergency — opposition arrests, press censorship, sterilization programmes, the parenthesis in Indian democracy',
    intent: 'year_texture',
    notes: 'Set by ind_emergency_1975. Two branches: adapted, or knew someone detained.',
  },
  india_1984_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Witnessed the 1984 anti-Sikh violence after Indira Gandhi\'s assassination — organized mobs, absent police, 2,733+ dead',
    intent: 'year_texture',
    notes: 'Set by ind_1984_sikh_massacre. Two branches: in Delhi, or at distance.',
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
  bpo_generation: {
    weight: 'moderate',
    category: 'experience',
    description: 'Worked in India\'s BPO/call centre economy — night shifts on American time, adopted work name, salary above parents\' generation',
    intent: 'year_texture',
    notes: 'Set by ind_call_centre_generation.',
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

  // ── Canada ────────────────────────────────────────────────────────────────────

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

  canadian_healthcare_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'The health card — the treatment that happens, the billing that does not follow. Healthcare as part of what Canada means.',
    intent: 'year_texture',
    notes: 'Set by can_healthcare_experience (auto-resolve).',
  },

  trc_witness_generation: {
    weight: 'major',
    category: 'political',
    description: 'Non-Indigenous Canadian who engaged with the Truth and Reconciliation Commission\'s 94 Calls to Action — the graves, the apology, the ongoing accounting.',
    intent: 'both',
    notes: 'Set by can_trc_calls_to_action_2015.',
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

  canadian_housing_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Came of age in the Canadian housing crisis — million-dollar averages in Toronto, twelve-year social housing waitlists, the gap between parents\' $180K and today\'s $1.3M.',
    intent: 'year_texture',
    notes: 'Set by can_housing_affordability.',
  },

  // ── Australia ─────────────────────────────────────────────────────────────────

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

  mining_boom_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived through the Australian mining boom 2005–2015 — the lucky country working again, FIFO rosters, the commodity prices that didn\'t last.',
    intent: 'year_texture',
    notes: 'Set by aus_mining_boom.',
  },

  ssm_australia_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the same-sex marriage postal survey 2017 — the months of being debated, the 61.6% result, the law that followed.',
    intent: 'year_texture',
    notes: 'Set by aus_ssm_postal_survey_2017.',
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

  black_summer_generation: {
    weight: 'major',
    category: 'climate',
    description: 'Lived through the 2019-20 Australian Black Summer megafires — 18.6 million hectares, red sky over Sydney, the abstract becoming undeniable',
    intent: 'year_texture',
    notes: 'Set by aus_black_summer_2020.',
  },

  // ── United States ──────────────────────────────────────────────────────────────

  jim_crow_childhood: {
    weight: 'major',
    category: 'identity',
    description: 'Grew up under Jim Crow — the water fountains, the schools, the signs. The survival rules taught before reading.',
    intent: 'both',
    notes: 'Set by usa_jim_crow_childhood. Foundational to Black American experience pre-1965.',
  },

  great_migration_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Moved North as part of the Great Migration — the factories, the de facto segregation, the city built in a country that was different from the South and not different enough.',
    intent: 'both',
    notes: 'Set by usa_great_migration (moved choice).',
  },

  stayed_in_the_south: {
    weight: 'moderate',
    category: 'identity',
    description: 'Stayed in the South during the Great Migration years — the civil rights movement would come to the South first, where the laws were explicit.',
    intent: 'year_texture',
    notes: 'Set by usa_great_migration (stayed choice).',
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

  vietnam_refused: {
    weight: 'major',
    category: 'political',
    description: 'Refused the Vietnam draft — Canada, conscientious objection, underground. Pardoned in 1977. The weight is not administrative.',
    intent: 'both',
    notes: 'Set by usa_vietnam_draft_decision (refused choice).',
  },

  vietnam_veteran: {
    weight: 'major',
    category: 'experience',
    description: 'Vietnam veteran — came back to a country that needed you to be fine and had no structure for when you were not.',
    intent: 'both',
    notes: 'Set by usa_vietnam_return.',
  },

  rustbelt_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through Rust Belt deindustrialisation — the plant closing notice, the severance you needed a lawyer to read, the town that was different after.',
    intent: 'both',
    notes: 'Set by usa_rustbelt_factory.',
  },

  deindustrialisation_hit: {
    weight: 'moderate',
    category: 'economic',
    description: 'Directly hit by deindustrialisation — the retraining programs, the jobs that paid half of what the plant paid, the decade-long accounting.',
    intent: 'year_texture',
    notes: 'Set by usa_rustbelt_factory (retrained choice).',
  },

  stayed_in_the_town: {
    weight: 'moderate',
    category: 'identity',
    description: 'Stayed in the deindustrialised town while others left — the empty downtown, the schools tied to a tax base that was gone.',
    intent: 'year_texture',
    notes: 'Set by usa_rustbelt_factory (stayed choice).',
  },

  war_on_drugs_era: {
    weight: 'major',
    category: 'political',
    description: 'Lived through the War on Drugs as a Black or Hispanic man — the stops, the mandatory minimums, the hundred-to-one sentencing disparity.',
    intent: 'both',
    notes: 'Set by usa_war_on_drugs.',
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

  foreclosure_generation: {
    weight: 'major',
    category: 'economic',
    description: 'Received the foreclosure notice — the adjustable rate that adjusted, the house sold from underneath, the credit score that takes seven years to recover.',
    intent: 'both',
    notes: 'Set by usa_foreclosure_2008.',
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

  lost_someone_opioids: {
    weight: 'major',
    category: 'grief',
    description: 'Lost someone to an opioid overdose — the phone call, the grief with the texture of prevention that was not available.',
    intent: 'year_texture',
    notes: 'Set by usa_opioid_crisis (lost-someone choice).',
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

  katrina_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Shaped by Hurricane Katrina — the levees failing, the Superdome, the rooftops, 67% of the dead Black, 80% of the city underwater, the neighborhoods that did not come back.',
    intent: 'year_texture',
    notes: 'Set by usa_hurricane_katrina_2005.',
  },

  gulf_coast_displaced: {
    weight: 'major',
    category: 'displacement',
    description: 'Directly displaced by Hurricane Katrina — in New Orleans, with people there, the specific waiting to know whether those you love survived.',
    intent: 'year_texture',
    notes: 'Set by usa_hurricane_katrina_2005 (directly affected choice).',
  },

  // ── United Kingdom ─────────────────────────────────────────────────────────────

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

  austerity_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'UK character who experienced the 2010s austerity programme — food banks, NHS waiting lists, bedroom tax, Universal Credit, the cuts to public services.',
    intent: 'year_texture',
    notes: 'Set by uk_austerity_2010s.',
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

  london_77_generation: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Shaped by the July 7, 2005 London bombings — four coordinated attacks on Underground and bus, 52 dead, 700 injured, the bombers British citizens from Leeds.',
    intent: 'year_texture',
    notes: 'Set by uk_77_bombings_2005.',
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

  // ── Poland ────────────────────────────────────────────────────────────────────

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

  strajk_kobiet_generation: {
    weight: 'moderate',
    category: 'gender',
    description: 'Polish woman who lived through the October 2020 Constitutional Tribunal abortion ruling and the Ogólnopolski Strajk Kobiet (All-Poland Women\'s Strike) — the lightning bolt symbol, the streets.',
    intent: 'year_texture',
    notes: 'Set by pol_womens_strike_2020.',
  },

  // ── Netherlands ───────────────────────────────────────────────────────────────

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

  nl_multicultural_generation: {
    weight: 'moderate',
    category: 'social',
    description: 'Lived through the Surinamese immigration wave of 1975 and the subsequent transformation of Dutch cities — the Dutch multiculturalism experiment',
    intent: 'year_texture',
    notes: 'Set by nl_surinamese_wave (both choices).',
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

  // ── Italy ─────────────────────────────────────────────────────────────────────

  miracolo_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up during Italy\'s economic miracle 1955-68 — the Fiat 500, the refrigerator, the television, the GDP growth rate of five percent a year.',
    intent: 'year_texture',
    notes: 'Set by it_miracolo_economico.',
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

  political_violence_witnessed: {
    weight: 'major',
    category: 'experience',
    description: 'Knew someone who was present at or affected by political violence — the abstract becomes specific and personal.',
    intent: 'year_texture',
    notes: 'Set by it_anni_di_piombo (proximity choice) and similar events.',
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

  precariato_generation: {
    weight: 'major',
    category: 'economic',
    description: 'Italian precariato generation — short-term contracts, Partite IVA, the flexible labour market where flexibility belonged to the employer.',
    intent: 'both',
    notes: 'Set by it_precariato.',
  },

  mediterranean_crossing_survived: {
    weight: 'major',
    category: 'experience',
    description: 'Crossed the Mediterranean on a migrant route — the rubber boat or wooden boat, Lampedusa, the calculation of what it cost.',
    intent: 'both',
    notes: 'Set by it_mediterranean_crossing.',
  },

  // ── Germany ───────────────────────────────────────────────────────────────────
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

  nsu_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Turkish or Greek-German character shaped by the NSU murders 2000–2011 — nine Turkish-German and one Greek-German killed while police investigated the victims\' families. "Dönermorde." Files shredded the week the truth broke.',
    intent: 'year_texture',
    notes: 'Set by ger_nsu_murders_2011.',
  },

  nsu_mourned: {
    weight: 'moderate',
    category: 'grief',
    description: 'Personally connected to one of the NSU murder victims — knew the family, or knew someone who did.',
    intent: 'none',
    notes: 'Set by ger_nsu_murders_2011 (direct connection choice). No downstream event.',
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

  ration_book_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived under a ration book economy — planned scarcity, the HO queue, the Intershop for hard currency, the parallel economy everyone navigated.',
    intent: 'year_texture',
    notes: 'Set by communist_economy world event.',
  },

  troubles_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Grew up during the Troubles in Northern Ireland — the checkpoint, the bomb, the community as political category, the peace walls.',
    intent: 'year_texture',
    notes: 'Set by the_troubles world event.',
  },

  oil_shock_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived through the 1973 oil shock — the petrol queue, odd/even plates, car-free Sundays, the first lesson about where energy comes from.',
    intent: 'year_texture',
    notes: 'Set by oil_crisis_1973 world event.',
  },

  holodomor_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the 1932-33 Holodomor in Ukraine or USSR — the enforced silence, the doctored census, the bread that could not be spoken of.',
    intent: 'year_texture',
    notes: 'Set by holodomor_1932 world event.',
  },

  // ── France ───────────────────────────────────────────────────────────────────
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

  algerian_war_conscientious: {
    weight: 'major',
    category: 'political',
    description: 'Refused or resisted orders in Algeria — conscientious objection with consequences. Carries both the cost and the knowledge of what was refused.',
    intent: 'both',
    notes: 'Set by fr_algerian_war_soldier (refused choice).',
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

  // ── Ireland ───────────────────────────────────────────────────────────────────
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

  // ── Turkey ────────────────────────────────────────────────────────────────────
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
  gezi_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Was in Gezi Park protests May 2013 — the line before and after which the trajectory of Turkey was clear',
    intent: 'year_texture',
    notes: 'Set by tur_erdogan_arc (Gezi branch).',
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

  // ── West Africa ───────────────────────────────────────────────────────────────
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

  ghana_stayed_generation: {
    weight: 'moderate',
    category: 'migration',
    description: 'Stayed in Ghana during the 1980s–2000s brain drain, watching the educated class empty out, holding the fort.',
    intent: 'none',
    notes: 'Set by gha_brain_drain_witness (stayed choice).',
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

  dmz_separated_family: {
    weight: 'major',
    category: 'family',
    description: 'Has relatives in North Korea, separated by the DMZ since the armistice — the unreachability of people ninety kilometres away.',
    intent: 'year_texture',
    notes: 'Set by kr_dmz_family_separated. Annual texture of the unresolvable absence.',
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
  ci_abidjan_generation: {
    weight: 'minor',
    category: 'place',
    description: 'Lived and worked in Abidjan — the lagoon city, Plateau business district, Treichville markets, gbaka minibuses, the city that was West Africa\'s showcase',
    intent: 'year_texture',
    notes: 'Set by ci_abidjan_life. Year texture: the bridge, the morning smell, the code.',
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
  ci_gbagbo_reckoning: {
    weight: 'moderate',
    category: 'political',
    description: 'Processed the 2019 ICC acquittal of Laurent Gbagbo — the man whose refusal to leave office caused 3,000 deaths, acquitted and returned to Abidjan',
    intent: 'year_texture',
    notes: 'Set by ci_gbagbo_acquittal_2019. Year texture: what the legal outcome and the historical record imply together.',
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
  sahel_long_arc_witness: {
    weight: 'major',
    category: 'political',
    description: 'Has watched the Sahel crisis move through Mali, Burkina Faso, and towards Ivory Coast — coups, jihadist expansion, French departure, Wagner arrival — as a regional pattern across multiple decades',
    intent: 'year_texture',
    notes: 'Set by sahel_regional_witness_late. Cross-country flag for Mali, Burkina, and CI characters.',
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
  tontine_member: {
    weight: 'minor',
    category: 'social',
    description: 'Participates in a tontine — rotating savings and credit association common across West/Central Africa, especially Bamileke communities; the group as the bank',
    intent: 'year_texture',
    notes: 'Set by cmr_bamileke_world (trade choice). Year texture: the monthly meeting, who wins, the trust required.',
  },
  cmr_biya_era: {
    weight: 'moderate',
    category: 'political',
    description: 'Came of age under Paul Biya\'s presidency — the photo in every office, the RDPC as the party of the state, the managed elections across four decades',
    intent: 'year_texture',
    notes: 'Set by cmr_biya_long_rule. Year texture: the form that asks political affiliation, the conversation that stops.',
  },
  anglophone_cameroonian: {
    weight: 'major',
    category: 'identity',
    description: 'Anglophone Cameroonian — speaks English, inherited common law, belongs to the 20% linguistic minority navigating a Francophone state apparatus',
    intent: 'both',
    notes: 'Set by cmr_anglophone_identity. Follow-through: anglophone_crisis_inside events.',
  },
  anglophone_political: {
    weight: 'moderate',
    category: 'political',
    description: 'Anglophone Cameroonian who names the arithmetic of exclusion explicitly — minority political consciousness in a majoritarian state',
    intent: 'year_texture',
    notes: 'Set by cmr_anglophone_identity (identity choice). Year texture: the counting of cabinet ministers.',
  },
  cmr_douala_generation: {
    weight: 'minor',
    category: 'place',
    description: 'Lived and worked in Douala — the commercial capital, not the political capital; the Wouri estuary, Akwa, the market, Pidgin English as the common tongue',
    intent: 'year_texture',
    notes: 'Set by cmr_douala_life. Year texture: the traffic, the translations held simultaneously.',
  },
  anglophone_crisis_witness: {
    weight: 'major',
    category: 'political',
    description: 'Witnessed the 2016-ongoing Anglophone crisis — what began as lawyers\' and teachers\' strikes became an armed conflict with burning villages, school boycotts, and half a million displaced',
    intent: 'both',
    notes: 'Set by cmr_anglophone_strike_2016. Follow-through: long-running unresolved conflict, no peace talks.',
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

  nga_boko_haram_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the Boko Haram insurgency in North-East Nigeria — the displacement, the checkpoints, the Chibok kidnapping, the 2.6 million internally displaced.',
    intent: 'both',
    notes: 'Set by nga_boko_haram. Specifically for Northern Nigerian characters (hausa_fulani, kanuri) in the conflict years 2009–2020.',
  },

  nga_sharia_transition: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through the implementation of Sharia criminal law in 12 northern Nigerian states (1999–2002) — the complex intersection of faith, federalism, and ethnic identity.',
    intent: 'both',
    notes: 'Set by nga_sharia_north for Hausa-Fulani characters in the transition period.',
  },

  nga_delta_community: {
    weight: 'major',
    category: 'environmental',
    description: 'Part of a Niger Delta community living with oil extraction — the gas flares, the spills, the contaminated creeks, the decades-long remediation deficit.',
    intent: 'both',
    notes: 'Set by nga_niger_delta for Ijaw and Delta-region characters.',
  },

  nga_naira_crisis_lived: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived through Nigeria\'s 2022–2024 naira crisis — the redesign-induced cash shortage, the rate collapse from 460 to 1,500+/dollar, the fuel subsidy removal.',
    intent: 'both',
    notes: 'Set by nga_naira_crisis.',
  },

  nga_ethnic_pride: {
    weight: 'minor',
    category: 'identity',
    description: 'Carries Yoruba, Igbo, or Hausa-Fulani ethnic identity as a primary marker — the name, the accent, the network that determines political affiliation.',
    intent: 'both',
    notes: 'Set by nga_ethnic_navigation (choice: wear identity fully). Checked in year texture.',
  },

  saro_wiwa_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed the November 1995 execution of Ken Saro-Wiwa — the Ogoni activists, Shell, the delta that continued to burn',
    intent: 'year_texture',
    notes: 'Set by nga_saro_wiwa_1995.',
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

  // ── Uganda ────────────────────────────────────────────────────────────────────
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
  lra_northern_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the LRA years in northern Uganda — night commuting, child abductions, the geography of fear in Gulu and Kitgum',
    intent: 'year_texture',
    notes: 'Set by uga_lra_northern. Two branches: in the north, or in Kampala.',
  },
  museveni_consolidation_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Watched Museveni remove term limits and consolidate 30+ year rule — the distance between 1986 and now as the education',
    intent: 'year_texture',
    notes: 'Set by uga_museveni_consolidation.',
  },
  kampala_informal_generation: {
    weight: 'minor',
    category: 'experience',
    description: 'Lived in the boda-boda city — Kampala organized around motorcycle taxis, the informal economy\'s most visible institution',
    intent: 'year_texture',
    notes: 'Set by uga_boda_boda_city.',
  },

  // ── Somalia ───────────────────────────────────────────────────────────────────
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
  mogadishu_1993_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Present for the Battle of Mogadishu / Black Hawk Down — what October 3-4, 1993 means from inside the city vs. the film',
    intent: 'year_texture',
    notes: 'Set by som_unosom_black_hawk_down.',
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
  somaliland_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up in Somaliland — the unrecognized state that works: elections, currency, police, constitution without international recognition',
    intent: 'year_texture',
    notes: 'Set by som_somaliland_stability. Isaaq ethnicity guard.',
  },

  // ── Thailand ──────────────────────────────────────────────────────────────────
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

  // ── BANGLADESH ───────────────────────────────────────────────────────────────

  bng_cyclone_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Born in Bangladesh in the shadow of the 1970 Bhola cyclone — the deadliest tropical cyclone in history (up to 500,000 dead), and Pakistan\'s inadequate response that accelerated independence.',
    intent: 'year_texture',
    notes: 'Set by bng_bhola_shadow.',
  },

  bng_liberation_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through the 1971 Liberation War — 9 months of Pakistani army atrocities, Mukti Bahini resistance, Indian intervention, and Victory Day December 16.',
    intent: 'year_texture',
    notes: 'Set by bng_liberation_war_1971.',
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

  bng_coup_generation: {
    weight: 'major',
    category: 'political',
    description: 'Witnessed the August 15, 1975 military coup — the assassination of Sheikh Mujibur Rahman and most of his family, four years after the Liberation War.',
    intent: 'year_texture',
    notes: 'Set by bng_mujib_1975.',
  },

  bng_cyclone_survivor: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Lived through a major cyclone as an adult in Bangladesh — the 1991 cyclone (138,000 dead), Sidr 2007, or later storms.',
    intent: 'year_texture',
    notes: 'Set by bng_cyclone_life.',
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

  bng_dhaka_generation: {
    weight: 'minor',
    category: 'urban',
    description: 'Navigated Dhaka as one of the world\'s densest megacities — the rickshaws, the July floods, the city that expanded faster than its infrastructure.',
    intent: 'year_texture',
    notes: 'Set by bng_dhaka_city.',
  },

  bng_uprising_generation: {
    weight: 'major',
    category: 'political',
    description: 'Witnessed the 2024 student uprising — the quota protests, the 300 dead, Sheikh Hasina\'s helicopter departure, and the morning after.',
    intent: 'year_texture',
    notes: 'Set by bng_student_uprising_2024.',
  },

  bng_malaysia_worker: {
    weight: 'major',
    category: 'immigration',
    description: 'Bangladeshi contract worker in Malaysia — paid a dalal fee 3-5x the official rate, tied work permit, employer-held passport, dormitory of 18, sending 800 ringgit home each month.',
    intent: 'both',
    notes: 'Set by bng_malaysia_decision (choice 1). Follow-throughs: bng_malaysia_life, bng_malaysia_return. Year texture: the remittance calendar, the passport situation.',
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

  // ── NEPAL ────────────────────────────────────────────────────────────────────

  nepal_maoist_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through Nepal\'s Maoist People\'s War 1996–2006 — the rural insurgency, the new authority, the decade of conflict that killed 13,000',
    intent: 'year_texture',
    notes: 'Set by nep_maoist_insurgency.',
  },

  nepal_royal_massacre_generation: {
    weight: 'moderate',
    category: 'world_event',
    description: 'Witnessed the 2001 royal massacre — Crown Prince Dipendra kills the royal family, dies as king, the 240-year Shah dynasty fractures',
    intent: 'year_texture',
    notes: 'Set by nep_royal_massacre_2001.',
  },

  nepal_republic_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Witnessed Nepal become a federal republic in 2008 — the end of the world\'s only Hindu kingdom by popular vote',
    intent: 'year_texture',
    notes: 'Set by nep_republic_2006.',
  },

  nepal_gulf_worker: {
    weight: 'major',
    category: 'displacement',
    description: 'Part of Nepal\'s Gulf labor migration wave — the kafala system, the remittance economy, the one-way ticket',
    intent: 'year_texture',
    notes: 'Set by nep_gulf_migration.',
  },

  nepal_earthquake_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the 2015 Gorkha earthquake — 9,000 dead, 600,000 houses destroyed, the silence after the shaking stopped',
    intent: 'year_texture',
    notes: 'Set by nep_earthquake_2015.',
  },

  nepal_youth_exodus_generation: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Part of the generation that left Nepal or watched 1,500 young people a day leave — the village empty of anyone their age',
    intent: 'year_texture',
    notes: 'Set by nep_youth_exodus.',
  },

  // ── VIETNAM ──────────────────────────────────────────────────────────────────

  south_vietnamese_diaspora: {
    weight: 'major',
    category: 'displacement',
    description: 'Left South Vietnam after the fall of Saigon — by boat, by camp, by resettlement. Carries both the country you left and the country that did not exist anymore when you left.',
    intent: 'year_texture',
    notes: 'Set by vn_the_boat_decision (boat choice).',
  },

  boat_person: {
    weight: 'major',
    category: 'persecution',
    description: 'Left Vietnam by boat after 1975 — the South China Sea, the camps, the piracy risk, the resettlement country that was not home.',
    intent: 'year_texture',
    notes: 'Set by vn_the_boat_decision (boat choice). Often co-set with south_vietnamese_diaspora.',
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

  vn_factory_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Part of Vietnam\'s manufacturing boom generation — Samsung, Apple suppliers, textiles; the China+1 industrial shift that remade the Mekong Delta and northern provinces.',
    intent: 'year_texture',
    notes: 'Set by vn_factory_generation (both choices).',
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

  // ── MYANMAR ──────────────────────────────────────────────────────────────────

  myanmar_socialist_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Grew up under Ne Win\'s Burmese Way to Socialism — the isolation, the nationalisation, the shortwave radio as the only window',
    intent: 'year_texture',
    notes: 'Set by mya_socialist_isolation.',
  },

  myanmar_1988_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Witnessed or participated in the 8888 Uprising — hundreds of thousands in the streets, 3,000 killed, SLORC coup',
    intent: 'year_texture',
    notes: 'Set by mya_1988_uprising.',
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

  myanmar_civilian_hope_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived the 2011–21 opening — press freedom, Suu Kyi freed and elected, foreign investment, the decade of cautious hope',
    intent: 'year_texture',
    notes: 'Set by mya_civilian_opening_2011.',
  },

  myanmar_coup_2021: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the February 2021 military coup — CDM strikes, crackdown, PDF resistance, the decade of opening reversed',
    intent: 'year_texture',
    notes: 'Set by mya_coup_2021.',
  },

  myanmar_cdm_participant: {
    weight: 'major',
    category: 'political',
    description: 'Participated in the Civil Disobedience Movement after the 2021 coup — left the job, joined the strike, put their name on a list',
    intent: 'year_texture',
    notes: 'Set by mya_coup_2021 (first branch).',
  },

  // ── TUNISIA ──────────────────────────────────────────────────────────────────

  tunisian_womens_rights_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Tunisian woman aware of the 1956 Code of Personal Status — the only Arab country to abolish polygamy and require consent for marriage at independence',
    intent: 'year_texture',
    notes: 'Set by tun_code_personal_status.',
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

  tunisian_saied_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through Saied\'s 2021 constitutional coup — the purging of the constitution written by the revolution, the democracy dismantled by its own president',
    intent: 'year_texture',
    notes: 'Set by tun_saied_coup_2021.',
  },

  tunisian_interior_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Aware of the coast/interior divide — the economic model that left Sidi Bouzid behind, the structural context of the man who started the revolution',
    intent: 'year_texture',
    notes: 'Set by tun_economic_interior.',
  },

  // ── SUDAN ────────────────────────────────────────────────────────────────────

  sudan_islamist_law_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived under Nimeiry\'s September Laws 1983 — Sharia applied to Sudan, public executions, Mahmoud Taha executed',
    intent: 'year_texture',
    notes: 'Set by sdn_nimeiry_sharia_1983.',
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

  sdn_khartoum_displaced: {
    weight: 'major',
    category: 'displacement',
    description: 'Fled Khartoum during the 2023 civil war — left with what could be carried, city abandoned to the fighting between SAF and RSF',
    intent: 'event',
    notes: 'Set by sdn_civil_war_2023 (flee choice). Follow-through: ft25_khartoum_displaced_settled.',
  },

  // ── ANGOLA ───────────────────────────────────────────────────────────────────

  angola_civil_war_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through Angola\'s 27-year civil war (1975–2002) — 500,000 dead, 4 million displaced, Cold War proxy conflict',
    intent: 'year_texture',
    notes: 'Set by ang_independence_civil_war_1975.',
  },

  angola_mpla_supporter: {
    weight: 'moderate',
    category: 'political',
    description: 'Supported the MPLA in the civil war — the Marxist movement that held Luanda and won international recognition',
    intent: 'year_texture',
    notes: 'Set by ang_independence_civil_war_1975 (first branch).',
  },

  angola_landmine_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Grew up with landmines as a background fact — 15 million mines in Angolan soil, the paths that exist because other paths are mined',
    intent: 'year_texture',
    notes: 'Set by ang_war_years_midlife and ang_landmine_reality.',
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

  // ── JORDAN ───────────────────────────────────────────────────────────────────

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

  jordanian_peace_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through Jordan\'s 1994 Wadi Araba peace treaty with Israel — the pragmatic case and the Palestinian-Jordanian complication',
    intent: 'year_texture',
    notes: 'Set by jor_peace_treaty_1994.',
  },

  jordanian_syrian_refugee_host: {
    weight: 'major',
    category: 'world_event',
    description: 'Witnessed Jordan absorbing 1.3 million Syrian refugees 2012-15 — 10% of the population, Zaatari, double-shift schools, water stress',
    intent: 'year_texture',
    notes: 'Set by jor_syrian_refugees_2012.',
  },

  jordanian_hussein_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Lived through King Hussein\'s long reign — the survivor king, 47 years of monarchy holding a fragile state together',
    intent: 'year_texture',
    notes: 'Set by jor_king_hussein_era.',
  },

  // ── IRAQ ─────────────────────────────────────────────────────────────────────

  irq_baath_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up inside the Ba\'ath state — the party card as admission ticket, the portrait in every room, the mukhabarat in the neighbourhood, the double grammar of what you said and what you meant.',
    intent: 'year_texture',
    notes: 'Set by irq_baath_childhood. Iraq 1970–2003.',
  },

  irq_iran_iraq_veteran: {
    weight: 'major',
    category: 'trauma',
    description: 'Served in the Iran-Iraq War 1980–88 — eight years on the front, poison gas, stalemate, 250,000–500,000 Iraqi dead, a border that didn\'t move.',
    intent: 'year_texture',
    notes: 'Set by irq_iran_iraq_war (first choice). Major trauma flag.',
  },

  irq_war_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Shaped by the Iran-Iraq War — no outside, only distance from the front that determines which costs arrive first.',
    intent: 'year_texture',
    notes: 'Set by irq_iran_iraq_war (both choices).',
  },

  irq_sanctions_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the 1991–2003 UN sanctions — the dinar collapsing, infant mortality doubling, the middle class dismantled, the oil-for-food ration card.',
    intent: 'year_texture',
    notes: 'Set by irq_sanctions_1990s (both choices). One of the most comprehensive sanctions regimes in history.',
  },

  irq_postwar_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived the 2003 invasion and immediate aftermath — army disbanded, de-Baathification, museum looting, the question of who has the gun.',
    intent: 'year_texture',
    notes: 'Set by irq_2003_invasion (both choices).',
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

  // ── LIBYA ────────────────────────────────────────────────────────────────────

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

  libyan_revolution_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the 2011 revolution — Benghazi uprising, NATO, Gaddafi killed in a drainage pipe, the 42-year state dissolving overnight',
    intent: 'year_texture',
    notes: 'Set by lby_revolution_2011.',
  },

  libyan_revolutionary: {
    weight: 'major',
    category: 'political',
    description: 'Joined or supported the 2011 uprising against Gaddafi — and has been living with what the revolution produced',
    intent: 'year_texture',
    notes: 'Set by lby_revolution_2011 (first branch).',
  },

  libyan_fragmentation_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lives in post-Gaddafi Libya — two governments, militias, oil fields as bargaining chips, Islamic State in Benghazi',
    intent: 'year_texture',
    notes: 'Set by lby_post_gaddafi_chaos.',
  },

  libyan_oil_state_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age in the Gaddafi oil state — free housing, free university, free healthcare, the Mukhabarat as the price',
    intent: 'year_texture',
    notes: 'Set by lby_gaddafi_oil_state.',
  },

  // ─── ZAMBIA ───────────────────────────────────────────────────────────────────

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

  zambian_copper_crash_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the 1975 copper price collapse and the IMF structural adjustment years — the hollowing-out of a welfare state',
    intent: 'year_texture',
    notes: 'Set by zmb_copper_crash.',
  },

  zambian_democracy_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed Zambia\'s 1991 democratic transfer of power — Kaunda loses to Chiluba, the first in southern Africa',
    intent: 'year_texture',
    notes: 'Set by zmb_democratic_transition_1991.',
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

  // ─── MOZAMBIQUE ───────────────────────────────────────────────────────────────

  mozambican_frelimo_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up under FRELIMO\'s one-party socialist state — independence, nationalisation, "A luta continua", the infrastructure-sparse inheritance of Portuguese colonialism',
    intent: 'year_texture',
    notes: 'Set by moz_frelimo_independence.',
  },

  mozambican_civil_war_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the RENAMO civil war 1977–1992 — destruction of schools/clinics, 1 million dead, South African destabilisation',
    intent: 'year_texture',
    notes: 'Set by moz_renamo_civil_war.',
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

  mozambican_floods_generation: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Lived through the 2000 Mozambique floods — Cyclone Eline, 800 dead, 500,000 displaced, baby Rosita born in a tree',
    intent: 'year_texture',
    notes: 'Set by moz_floods_2000.',
  },

  mozambican_gas_generation: {
    weight: 'minor',
    category: 'historical',
    description: 'Came of age when offshore gas was discovered and the Cabo Delgado insurgency began — the resource and the violence arriving together',
    intent: 'year_texture',
    notes: 'Set by moz_gas_cabo_delgado.',
  },

  // ─── AFGHANISTAN ──────────────────────────────────────────────────────────────

  afghan_saur_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up during the Saur Revolution and Soviet-backed PDPA communist rule — land reform, literacy campaigns, and disappearances',
    intent: 'year_texture',
    notes: 'Set by afg_saur_revolution_1978.',
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

  afghan_2001_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through the 2001 US invasion and the "Kabul bubble" — girls\' schools reopening, aid economy, reconstruction hope',
    intent: 'year_texture',
    notes: 'Set by afg_us_invasion_2001.',
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

  // ─── YEMEN ────────────────────────────────────────────────────────────────────

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

  // ── GIFTED ARC FLAGS ──────────────────────────────────────────────────────

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

  gift_cultivated: {
    weight: 'major',
    category: 'achievement',
    description: 'The gift entered a structured development path — scholarship, programme, formal training. The arc has a favorable fork.',
    intent: 'both',
    notes: 'Set by gift_door_opens (accept choice). Gates favorable young-adult and extraordinary talent events.',
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

  gift_rekindled: {
    weight: 'major',
    category: 'achievement',
    description: 'After suppression or deferral, the gift found a channel — a mentor, a movement, a late opening.',
    intent: 'both',
    notes: 'Set by gift_community_mentor, gift_civil_rights_channel. Gates extraordinary talent events alongside gift_cultivated.',
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

  gift_fulfilled: {
    weight: 'major',
    category: 'achievement',
    description: 'The gifted arc completed — the extraordinary work was done, the gift expressed fully.',
    intent: 'both',
    notes: 'Set by several extraordinary talent events. Identity card surfaces this. Year texture has dedicated path.',
    timestamped: true,
  },

  gift_partial: {
    weight: 'moderate',
    category: 'identity',
    description: 'Gift developed but capped below potential — systemic ceiling, injury, wrong era. Competent but not what was possible.',
    intent: 'year_texture',
    notes: 'Set by favorable fork choices that don\'t fully commit, or by world stage athletic (partial choice).',
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

  perfectionism_burden: {
    weight: 'moderate',
    category: 'trauma',
    description: 'The twice-as-good tax — performing flawlessly as a survival strategy in hostile institutional environments.',
    intent: 'year_texture',
    notes: 'Set by gift_integration_pioneer. USA/racism-specific. Chronic happiness drain.',
  },

  gift_realized: {
    weight: 'major',
    category: 'achievement',
    description: 'The gift found its fullest expression — the ultimate work was made, the thing the character was born to produce.',
    intent: 'both',
    notes: 'Set by gift_ultimate_work. Requires gift_extraordinary + deep path work (immersion, peer, crisis, or integration). Highest gift state.',
    timestamped: true,
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

  gift_burnout_recovered: {
    weight: 'major',
    category: 'achievement',
    description: 'Returned from burnout break to find the gift exactly where it was left — the performance stripped out, the actual thing remaining.',
    intent: 'both',
    notes: 'Set by gift_burnout_recovery. Ribbon: "The Long Way Back".',
  },

  gift_child_has_it: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Recognised the same gift in their own child — the specific stillness, the precocious ease.',
    intent: 'event',
    notes: 'Set by gift_child_carries_it. Gates gift_second_generation_path.',
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

  gift_peer_found: {
    weight: 'moderate',
    category: 'identity',
    description: 'Encountered a genuine creative equal for the first time — the standard set by that encounter became a permanent fixture.',
    intent: 'year_texture',
    notes: 'Set by gift_peer_encounter. Gates gift_ultimate_work.',
  },

  gift_crisis_through: {
    weight: 'major',
    category: 'achievement',
    description: 'Went back to the beginning of the work after a structural crisis rather than patching over it — the crisis was the door.',
    intent: 'year_texture',
    notes: 'Set by gift_creative_crisis (go back choice). Gates gift_ultimate_work.',
  },

  gift_crisis_around: {
    weight: 'moderate',
    category: 'identity',
    description: 'Managed rather than resolved the creative crisis — adapted, salvaged, moved forward with the doubt underneath.',
    intent: 'none',
    notes: 'Set by gift_creative_crisis (find a way around choice). Counter to gift_crisis_through.',
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

  gift_constrained: {
    weight: 'moderate',
    category: 'identity',
    description: 'The state colonised the gift — the public work performed for the regime, the real work hidden inside it or in a drawer.',
    intent: 'year_texture',
    notes: 'Set by gift_state_colonizes (find work inside constraints choice). Authoritarian regimes 1930–1992.',
  },

  gift_radicalized: {
    weight: 'moderate',
    category: 'political',
    description: 'The structural understanding of what blocked the gift became political consciousness — the barrier analysed and converted to action or resistance.',
    intent: 'none',
    notes: 'Set by gift_ceiling_radicalizes. Often sets political_leaning=left. The gift as lens for structural analysis.',
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

  gift_tribute_received: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Late in life, received evidence that the gift passed forward — a student\'s dedication, a citation, a public acknowledgement of lineage.',
    intent: 'none',
    notes: 'Set by gift_late_tribute. Age 68+. The correct outcome: the gift continues past you.',
  },

  gift_anniversary_reckoned: {
    weight: 'moderate',
    category: 'identity',
    description: 'Twenty years after the door closed, made peace with the gap — no longer standing in front of the door, carrying the distance but no longer measuring it.',
    intent: 'none',
    notes: 'Set by gift_anniversary_door. Midlife, 20+ years after gift ceiling. Quiet resolution.',
  },

  // ── events_gifted_3.js flags ──────────────────────────────────────────

  gift_parent_dismissed: {
    weight: 'moderate',
    category: 'identity',
    description: 'The gift went unrecognised by the parent — not from cruelty but from the absence of a framework to evaluate it.',
    intent: 'year_texture',
    notes: 'Set by gift_parent_dismissal. Parent had no frame for the gift. Produces specific unacknowledged-gift texture.',
  },

  gift_public_performer: {
    weight: 'moderate',
    category: 'achievement',
    description: 'The gift was brought into a public arena — competition, concert hall, examination — as a child or adolescent.',
    intent: 'year_texture',
    notes: 'Set by gift_public_performance. Gates further performance arc. May coexist with gift_public_discomfort.',
  },

  gift_public_discomfort: {
    weight: 'minor',
    category: 'identity',
    description: 'The public performance of the gift felt wrong — the gift was private and the arena made it something else.',
    intent: 'none',
    notes: 'Set by gift_public_performance (uncomfortable choice).',
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

  gift_after_peak: {
    weight: 'moderate',
    category: 'identity',
    description: 'The peak of the gift is behind — not lost but completed. A different, less urgent relationship to the gift.',
    intent: 'year_texture',
    notes: 'Set by gift_after_the_peak event. Age 55+. The phase after proving.',
  },

  // ── events_china.js flags ──────────────────────────────────────────────

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

  gaokao_succeeded: {
    weight: 'major',
    category: 'achievement',
    description: 'Passed the gaokao with a score enabling elite university entry — the gate reopened after the Cultural Revolution years.',
    intent: 'year_texture',
    notes: 'Set by cn_gaokao (top score choice). Post-1977.',
  },

  gaokao_survived: {
    weight: 'moderate',
    category: 'identity',
    description: 'Sat the gaokao and scored well enough to continue — not the top tier, but a path.',
    intent: 'none',
    notes: 'Set by cn_gaokao (good score choice).',
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

  china_hidden_second_child: {
    weight: 'major',
    category: 'adversity',
    description: 'Had a second child in secret under the one-child policy — unregistered, no hukou, no legal existence for the child.',
    intent: 'both',
    notes: 'Set by cn_one_child_decision (hide the birth choice). Triggers heihaizi arc: schoolgate, inspection, 2015 policy window, late reckoning. Year texture in buildYearTexture.',
  },

  china_heihaizi_school_found: {
    weight: 'moderate',
    category: 'family',
    description: 'Paid for private school when the unregistered child was denied public enrollment.',
    intent: 'none',
    notes: 'Set by cn_heihaizi_schoolgate. One outcome of the heihaizi arc.',
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

  rural_to_urban: {
    weight: 'moderate',
    category: 'migration',
    description: 'Moved from rural China to city as part of the largest internal migration in human history.',
    intent: 'year_texture',
    notes: 'Set by cn_village_to_city. 1990s–2010s.',
  },

  migrant_worker_china: {
    weight: 'moderate',
    category: 'labor',
    description: 'Worked as internal migrant in Chinese cities — without full urban hukou rights, in factory or construction work.',
    intent: 'year_texture',
    notes: 'Set by cn_village_to_city.',
  },

  village_connection_kept: {
    weight: 'minor',
    category: 'identity',
    description: 'Maintained connection to village of origin despite city migration — remittances, visits, dual identity.',
    intent: 'none',
    notes: 'Set by cn_village_to_city (keep village choice).',
  },

  china_entrepreneur: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Started a private business during China\'s reform era — part of the generation that built wealth where none was possible before.',
    intent: 'year_texture',
    notes: 'Set by cn_first_private_business.',
  },

  left_behind_child: {
    weight: 'major',
    category: 'family',
    description: 'Was a left-behind child — parents migrated for work, raised by grandparents. One of ~61 million in China.',
    intent: 'year_texture',
    notes: 'Set by cn_left_behind_child.',
  },

  little_emperor: {
    weight: 'moderate',
    category: 'identity',
    description: 'Only child in one-child China — the singularity of parental investment, the weight of collective family expectation.',
    intent: 'year_texture',
    notes: 'Set by cn_only_child_weight.',
  },

  social_credit_awareness: {
    weight: 'minor',
    category: 'political',
    description: 'Became aware of and adapted behaviour to China\'s social credit system.',
    intent: 'none',
    notes: 'Set by cn_social_credit_awareness.',
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

  zero_covid_anger: {
    weight: 'moderate',
    category: 'political',
    description: 'Felt — and expressed, at some cost — anger at the zero-COVID system during the lockdowns.',
    intent: 'none',
    notes: 'Set by cn_zero_covid_lockdown (express anger choice).',
  },

  lying_flat_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Adopted the lying flat (tang ping) ethos — rejection of the 996 grind, involuntary simplicity as protest.',
    intent: 'year_texture',
    notes: 'Set by cn_lying_flat.',
  },

  iron_rice_bowl_broken: {
    weight: 'major',
    category: 'labor',
    description: 'State-sector job lost in 1990s SOE reforms — the lifetime employment guarantee of Mao-era China ended.',
    intent: 'year_texture',
    notes: 'Set by cn_iron_rice_bowl_broken.',
  },

  worker_protest: {
    weight: 'minor',
    category: 'political',
    description: 'Participated in worker protest against SOE layoffs or conditions.',
    intent: 'none',
    notes: 'Set by cn_iron_rice_bowl_broken (join the protest choice).',
  },

  // ── events_korea.js flags ──────────────────────────────────────────────

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

  chaebol_worker: {
    weight: 'moderate',
    category: 'labor',
    description: 'Entered the Samsung/Hyundai/LG track — company as family, loyalty as requirement, scale as security.',
    intent: 'year_texture',
    notes: 'Set by kr_chaebol_entry.',
  },

  korea_marriage_pressure: {
    weight: 'moderate',
    category: 'family',
    description: 'Experienced the sustained social pressure toward marriage — Chuseok conversations, matchmaking apps, government birth rate opinions.',
    intent: 'year_texture',
    notes: 'Set by kr_marriage_pressure.',
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

  // ── events_disability.js flags ────────────────────────────────────────

  born_with_disability: {
    weight: 'major',
    category: 'health',
    description: 'Born with a physical disability — the body has always been this way. All planning, opportunity, and texture is shaped by this from the start.',
    intent: 'year_texture',
    notes: 'Trigger flag. Set at birth roll or via conflict_childhood events. Gates full disability arc.',
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

  born_deaf: {
    weight: 'major',
    category: 'health',
    description: 'Born Deaf — hearing is not available; Deaf identity and community may or may not be.',
    intent: 'year_texture',
    notes: 'Trigger flag. Gates full Deaf arc including cochlear implant debate.',
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

  cochlear_implant: {
    weight: 'major',
    category: 'health',
    description: 'Received a cochlear implant — a contested technology within Deaf culture: access vs. cure framing.',
    intent: 'year_texture',
    notes: 'Set by dis_cochlear_implant (accept choice). Produces specific Deaf community tension.',
  },

  cochlear_implant_refused: {
    weight: 'major',
    category: 'identity',
    description: 'Refused cochlear implant — Deafness not framed as condition to be fixed but as identity to be lived.',
    intent: 'year_texture',
    notes: 'Set by dis_cochlear_implant (refuse choice).',
  },

  disability_acquired: {
    weight: 'major',
    category: 'health',
    description: 'Disability acquired mid-life through accident, illness, or injury — the body changed and the self must reorganise around the change.',
    intent: 'year_texture',
    notes: 'Trigger flag. Set by accident events or specific illness events. Gates acquired disability arc.',
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

  disabled_worker: {
    weight: 'moderate',
    category: 'labor',
    description: 'Navigated workplace as a disabled person — accommodations, limitations, the gap between reasonable adjustment and actual adjustment.',
    intent: 'none',
    notes: 'Design flag. Actual events use disability_employment_found / disability_fought_barrier (set by dis_employment_barrier).',
  },

  disability_workplace_changed: {
    weight: 'minor',
    category: 'achievement',
    description: 'Changed the workplace\'s accommodations through advocacy — the fight produced something structural.',
    intent: 'none',
    notes: 'Set by dis_workplace_navigation (fight for accommodations choice).',
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

  disability_late_peace: {
    weight: 'major',
    category: 'identity',
    description: 'In late life, arrived at peace with the body — not overcoming it, not despite it, but with it.',
    intent: 'year_texture',
    notes: 'Set by dis_late_peace. Age 60+.',
  },

  // ── events_addiction.js flags ─────────────────────────────────────────

  drug_addiction: {
    weight: 'major',
    category: 'health',
    description: 'Developed drug addiction — the compulsion has crossed from use into dependency.',
    intent: 'year_texture',
    notes: 'Set by add_first_use (problem choice) or add_recreational_slide. Gates full addiction arc.',
  },

  alcohol_addiction: {
    weight: 'major',
    category: 'health',
    description: 'Developed alcohol addiction — the most socially invisible of the substance dependencies.',
    intent: 'year_texture',
    notes: 'Set by add_first_use or add_recreational_slide (alcohol branch). Gates addiction arc.',
  },

  addiction_recreational: {
    weight: 'minor',
    category: 'health',
    description: 'Using recreationally — not yet dependency, but the pattern is forming.',
    intent: 'none',
    notes: 'Set by add_first_use (keep it light choice). Gates add_recreational_slide.',
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

  died_of_overdose: {
    weight: 'major',
    category: 'death',
    description: 'Died of overdose — the second one.',
    intent: 'none',
    notes: 'Set by add_overdose_death. Requires addiction_spiral + addiction_overdose_survived + !in_recovery.',
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

  recovery_relapse: {
    weight: 'moderate',
    category: 'health',
    description: 'Relapsed after a period of recovery — the relapse part of the disease, not the end of recovery.',
    intent: 'year_texture',
    notes: 'Set by add_relapse.',
  },

  recovery_sponsor: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Became a sponsor for someone new to recovery — the giving back that is part of staying well.',
    intent: 'none',
    notes: 'Set by add_giving_back.',
  },

  addiction_family_witness: {
    weight: 'moderate',
    category: 'trauma',
    description: 'A family member developed addiction — the specific helplessness of watching and not being able to stop it.',
    intent: 'none',
    notes: 'Design flag. Actual events use addiction_family_supported / addiction_family_isolated (set by add_family_witness).',
  },

  addiction_in_family: {
    weight: 'moderate',
    category: 'family',
    description: 'Addiction present in the family — sibling, parent, or child with dependency.',
    intent: 'none',
    notes: 'Set upstream by family events or birth configuration. Gates add_family_witness.',
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

  experienced_displacement: {
    weight: 'major',
    category: 'displacement',
    description: 'Was made to leave — not emigration but removal, expelled from a country or city by someone\'s decision. Carries the specific weight of home taken away.',
    intent: 'event',
    notes: 'Set by events_uganda.js (Amin Asian expulsion) and events_somalia.js (state collapse). Follow-through: ft25_displacement_midlife/late.',
  },

  reluctant_parent: {
    weight: 'moderate',
    category: 'family',
    description: 'Became a parent without full willingness — the reluctance was real at the beginning, even if the relationship became real too.',
    intent: 'event',
    notes: 'Set by events.js (having child choice, reluctant branch). Follow-through: ft25_reluctant_parent_midlife.',
  },

  // ── events_child_soldier.js flags ─────────────────────────────────────

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

  trauma_responses: {
    weight: 'moderate',
    category: 'health',
    description: 'Body carries trauma responses — a loud noise, a uniform, the wrong eye contact. Not PTSD as diagnosis, but as lived texture.',
    intent: 'year_texture',
    notes: 'Set by cs_civilian_difficulty and other trauma arc events.',
  },

  child_soldier_community: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Found community with other former child soldiers — the language that exists there, the accompanied carrying.',
    intent: 'none',
    notes: 'Set by cs_moral_injury_midlife (seek community choice).',
  },

  child_soldier_late_reckoning: {
    weight: 'major',
    category: 'identity',
    description: 'In late life, understood the child who was taken — they were not a soldier. The name was false. The things done were real. Both true.',
    intent: 'year_texture',
    notes: 'Set by cs_late_reckoning. Age 55+.',
  },

  // ── events_wwi_depression.js flags ───────────────────────────────────

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

  ww1_shell_shock: {
    weight: 'major',
    category: 'health',
    description: 'Diagnosed with shell shock — the hands that shake, the sounds that return in sleep, returned to the line anyway.',
    intent: 'year_texture',
    notes: 'Set by ww1_shell_shock event. Adds shell_shock condition moderate.',
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

  flu_1918_loss: {
    weight: 'major',
    category: 'grief',
    description: 'Lost someone in the household to the 1918 influenza — grief without ceremony because ceremony would require gathering.',
    intent: 'year_texture',
    notes: 'Set by flu_1918_household (household dies choice).',
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

  depression_unemployed: {
    weight: 'major',
    category: 'labor',
    description: 'Lost job in the Depression — the identity that came with the job, gone along with the job.',
    intent: 'year_texture',
    notes: 'Set by dep_job_loss.',
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

  // ── events_divorce.js flags ───────────────────────────────────────────

  divorce_attempt_repair: {
    weight: 'minor',
    category: 'relationship',
    description: 'Made one more attempt to repair the marriage before the divorce — the most honest conversation in years.',
    intent: 'none',
    notes: 'Set by div_the_long_end (try once more choice).',
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

  divorce_year_one: {
    weight: 'moderate',
    category: 'trauma',
    description: 'First year after divorce — the structural losses, what was taken for granted, the shared life\'s shape now absent.',
    intent: 'year_texture',
    notes: 'Set by div_first_year. Requires divorce_legal_done.',
  },

  divorce_dating_again: {
    weight: 'minor',
    category: 'relationship',
    description: 'Dating again after divorce — the knowing of what a relationship requires, the procedural quality of early meetings.',
    intent: 'none',
    notes: 'Set by div_dating_again.',
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

  divorce_children_grown: {
    weight: 'minor',
    category: 'family',
    description: 'Children from the marriage are now grown, with their own understanding of what happened.',
    intent: 'none',
    notes: 'Set by div_children_grown. Late life.',
  },

  // ── events_dementia.js flags ──────────────────────────────────────────

  dementia_personal: {
    weight: 'major',
    category: 'health',
    description: 'Developing dementia — the words behind the usual place, the street driven past for eleven years.',
    intent: 'year_texture',
    notes: 'Set by dem_first_signs_personal. Age 68+. Adds dementia condition.',
  },

  dementia_diagnosed_early: {
    weight: 'moderate',
    category: 'health',
    description: 'Dementia diagnosed early — time to make decisions while still able to make them.',
    intent: 'year_texture',
    notes: 'Set by dem_first_signs_personal (go to doctor choice).',
  },

  dementia_family_told: {
    weight: 'moderate',
    category: 'family',
    description: 'Told the family about the diagnosis — the responses dividing into the researcher, the quiet one, the denier, the crier.',
    intent: 'none',
    notes: 'Set by dem_telling_family.',
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

  dementia_parent_forgot_me: {
    weight: 'major',
    category: 'grief',
    description: 'The parent looked at you and didn\'t know you — the polite look, the nod that wasn\'t recognition.',
    intent: 'year_texture',
    notes: 'Set by dem_parent_doesnt_know_you.',
  },

  dementia_parent_late_stage: {
    weight: 'major',
    category: 'grief',
    description: 'Parent in late-stage dementia — the face still familiar, most of what made it specific gone.',
    intent: 'year_texture',
    notes: 'Set by dem_parent_late_stage event.',
  },

  dementia_grief_resolved: {
    weight: 'moderate',
    category: 'grief',
    description: 'Grief after dementia resolved — the staged mourning already done, the final death at the end of a long goodbye.',
    intent: 'none',
    notes: 'Set by dem_after_loss.',
  },

  // ── events_celebrity.js flags ─────────────────────────────────────────

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

  // ── events_teacher_arc.js flags ───────────────────────────────────────

  teacher_career: {
    weight: 'moderate',
    category: 'labor',
    description: 'Teacher by vocation — the career the events in this arc gate on (alongside career.id === teacher).',
    intent: 'none',
    notes: 'Can be set by career events or used as alias for career.id === teacher.',
  },

  teacher_first_classroom: {
    weight: 'moderate',
    category: 'identity',
    description: 'First classroom — twenty-three years old, thirty-two students, the training as preparation for a general case.',
    intent: 'year_texture',
    notes: 'Set by tch_first_classroom.',
  },

  teacher_that_student: {
    weight: 'major',
    category: 'relationship',
    description: 'The student who was different — the hard one, the extra time, the shift that was real without a specific moment.',
    intent: 'year_texture',
    notes: 'Set by tch_the_student. Gates tch_the_letter.',
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

  teacher_letter_received: {
    weight: 'major',
    category: 'achievement',
    description: 'Received the letter — fifteen years later, the student found you to say what students rarely say at the time: it mattered.',
    intent: 'year_texture',
    notes: 'Set by tch_the_letter.',
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

  // ── LIFE SKELETON ────────────────────────────────────────────────────────────

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

  // ── PHASE ENTRY ──────────────────────────────────────────────────────────────

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

  moved_for_partner: {
    weight: 'moderate',
    category: 'relationship',
    description: 'Relocated to a different city for their partner\'s career or opportunity.',
    intent: 'year_texture',
    notes: 'Set by pw_partner_wants_move.',
  },

  // ── Central American arc ──────────────────────────────────────────────────

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

  gang_territory_lived: {
    weight: 'moderate',
    category: 'environment',
    description: 'Grew up or lived in territory controlled by MS-13 or Barrio 18 in the Northern Triangle.',
    intent: 'year_texture',
    notes: 'Set by ca_gang_corner (errand branch). Distinct from criminal_life — this is an environmental condition, not necessarily personal criminality.',
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

  northern_triangle_migration: {
    weight: 'moderate',
    category: 'environment',
    description: 'Lived through the post-2014 Northern Triangle migration crisis as a direct witness — watched neighbors and families leave.',
    intent: 'year_texture',
    notes: 'Set by the central_american_migration_crisis world event.',
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

  yeshiva_secular_bridge: {
    weight: 'moderate',
    category: 'education',
    description: 'Yeshiva-trained character who found their method of Talmudic reasoning valued in the secular world.',
    intent: 'year_texture',
    notes: 'Set by yeshiva_secular_translation.',
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

  debt_free_milestone: {
    weight: 'moderate',
    category: 'financial',
    description: 'Character who has paid off their last significant debt — the zero-balance moment.',
    intent: 'year_texture',
    notes: 'Set by debt_zero_moment.',
  },

  // ── SYRIA ARC ────────────────────────────────────────────────────────────────

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

  left_syria_early: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Syrian character who left before the worst of the civil war — reading the situation early.',
    intent: 'year_texture',
    notes: 'Set by sy_march_2011 (leave_early choice).',
  },

  syria_uprising_witness: {
    weight: 'major',
    category: 'political',
    description: 'Syrian character who witnessed the 2011 uprising from inside Syria — street, balcony, or early flight.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by sy_march_2011. Required for downstream civil war events.',
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

  // ── CHILD DEATH ARC ──────────────────────────────────────────────────────────

  lost_child_infant: {
    weight: 'major',
    category: 'loss',
    description: 'A child died in infancy (under 2 years old) — the specific grief of a person measured in weeks, and all that was going to happen and did not.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by child_death_infant. Branches the year texture and late-life reckoning from lost_child.',
  },

  child_death_told_others: {
    weight: 'moderate',
    category: 'loss',
    description: 'Bereaved parent who has told new people in their life about the loss — learned to carry it in conversation.',
    intent: 'year_texture',
    notes: 'Set by child_death_telling_people.',
  },

  child_death_room_kept: {
    weight: 'moderate',
    category: 'loss',
    description: 'Bereaved parent who kept the child\'s room as it was — a held space.',
    intent: 'year_texture',
    notes: 'Set by child_death_room_decision (kept choice).',
  },

  child_death_room_repurposed: {
    weight: 'moderate',
    category: 'loss',
    description: 'Bereaved parent who slowly changed the child\'s room — the room becomes something else without erasing what it was.',
    intent: 'year_texture',
    notes: 'Set by child_death_room_decision (changed choice).',
  },

  child_death_tried_again: {
    weight: 'moderate',
    category: 'loss',
    description: 'Bereaved parent who chose to try for another child after the loss.',
    intent: 'year_texture',
    notes: 'Set by child_death_try_again (try choice).',
  },

  child_death_decided_not_again: {
    weight: 'moderate',
    category: 'loss',
    description: 'Bereaved parent who decided not to try again after losing a child.',
    intent: 'year_texture',
    notes: 'Set by child_death_try_again (not choice).',
  },

  bereaved_parent_marriage_survived: {
    weight: 'major',
    category: 'loss',
    description: 'A bereaved parent\'s marriage survived the death of a child — statistically improbable, personally hard-won.',
    intent: 'year_texture',
    notes: 'Set by child_death_marriage_reflection. Branches the late year texture.',
  },

  child_death_late_reckoned: {
    weight: 'major',
    category: 'loss',
    description: 'Bereaved parent who has done the late-life reckoning about who their child would have been — the person they constructed from what they knew.',
    intent: 'year_texture',
    notes: 'Set by child_death_late_reckoning. Branches buildYearTexture for late_life.',
  },

  // ── CHINA DEPTH FLAGS ────────────────────────────────────────────────────

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

  hukou_barrier_lived: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Experienced the hukou household registration system as a personal exclusion — living in a city while officially not existing in it.',
    intent: 'year_texture',
    notes: 'Set by cn_hukou_barrier.',
  },

  reform_era_participant: {
    weight: 'minor',
    category: 'opportunity',
    description: 'Participated in China\'s 1990s reform era — caught the wave of the country reorganising from scarcity to surplus.',
    intent: 'year_texture',
    notes: 'Set by cn_reform_euphoria (get in choice).',
  },

  '996_burnout_lived': {
    weight: 'moderate',
    category: 'career',
    description: 'Lived the 996 work culture (9am-9pm, 6 days) — the hourly rate calculation, the apartment unseen in daylight.',
    intent: 'year_texture',
    notes: 'Set by cn_996_burnout.',
  },

  leftover_woman_label: {
    weight: 'moderate',
    category: 'gender',
    description: 'Received the 剩女 ("leftover woman") label from state media and social pressure — educated, employed, unmarried over 25.',
    intent: 'year_texture',
    notes: 'Set by cn_leftover_woman.',
  },

  hui_identity_marked: {
    weight: 'moderate',
    category: 'identity',
    description: 'Hui Muslim in China — learned early to manage a Muslim identity inside a country where Islam is practiced but never unremarked.',
    intent: 'year_texture',
    notes: 'Set by cn_hui_experience.',
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

  sent_down_intellectual_echo: {
    weight: 'moderate',
    category: 'history',
    description: 'Sent-down youth who kept reading in the countryside — the decade gave texture that cannot be acquired from books.',
    intent: 'year_texture',
    notes: 'Set by cn_sent_down_intellectual_echo. Follow-through for sent_down_intellectual.',
  },

  // ── ISRAEL ARC FLAGS ────────────────────────────────────────────────────

  built_state_generation: {
    weight: 'major',
    category: 'identity',
    description: 'Israeli founding generation — grew up knowing the state was built for them, with the weight that comes with that knowledge.',
    intent: 'year_texture',
    notes: 'Set by il_founding_memory.',
  },

  mizrahi_maabara: {
    weight: 'major',
    category: 'displacement',
    description: 'Grew up in or shaped by the Mizrahi ma\'abara transit camp era — the development town at the desert edge, the path that was longer than the map showed.',
    intent: 'year_texture',
    notes: 'Set by il_mizrahi_maabara.',
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

  settlement_moved: {
    weight: 'major',
    category: 'political',
    description: 'Israeli who chose to move to a settlement in the occupied territories — building inside contested land, living inside the legal and ethical debate.',
    intent: 'year_texture',
    notes: 'Set by il_settlement_question (move choice).',
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

  post_oslo_israeli_despair: {
    weight: 'moderate',
    category: 'political',
    description: 'Israeli who believed in Oslo and watched it unravel — the handshake, the assassination, Camp David, the intifada, the settlements continuing.',
    intent: 'year_texture',
    notes: 'Set by il_post_oslo_despair.',
  },

  discrimination_named: {
    weight: 'minor',
    category: 'identity',
    description: 'Named discrimination they experienced rather than absorbing it silently — the act of naming as record.',
    intent: 'none',
    notes: 'Set by il_ethiopian_aliyah_arrival (named discrimination choice).',
  },

  // ── PALESTINE ADDITIONAL FLAGS ────────────────────────────────────────────

  camp_is_home: {
    weight: 'major',
    category: 'displacement',
    description: 'Palestinian refugee camp as the only home ever known — second or third generation, the temporary that became permanent, the key for a lock that no longer exists.',
    intent: 'year_texture',
    notes: 'Set by pal_refugee_camp_generations.',
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

  // ── PANDEMIC ────────────────────────────────────────────────────────────────

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

  pandemic_elderly_isolated: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Spent the pandemic years isolated at 70+ — the window waves, the more frequent calls that were also a kind of loneliness.',
    intent: 'year_texture',
    notes: 'Set by pan_elderly_isolation.',
  },

  pandemic_death_without_goodbye: {
    weight: 'major',
    category: 'loss',
    description: 'Lost a parent during COVID-19 without being allowed in the room — the specific rule the specific shape of the loss.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by pan_death_without_goodbye / pan_death_without_goodbye_late.',
  },

  broke_the_rules_for_this: {
    weight: 'minor',
    category: 'identity',
    description: 'Broke pandemic regulations to be present at a dying parent\'s bedside — a choice carried without regret.',
    intent: 'none',
    notes: 'Set by pan_death_without_goodbye when break_the_rules is chosen.',
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

  pandemic_community_response: {
    weight: 'minor',
    category: 'achievement',
    description: 'Volunteered during the pandemic — deliveries, calls to the elderly, the specific usefulness of helping.',
    intent: 'none',
    notes: 'Set by pan_wealthy_west_specific when volunteer is chosen.',
  },

  pandemic_survived_intact: {
    weight: 'minor',
    category: 'world_event',
    description: 'Got through the pandemic lockdown without major disruption — finished two books, started six more.',
    intent: 'none',
    notes: 'Set by pan_wealthy_west_specific when cope_quietly is chosen.',
  },

  // India depth flags (events_india_depth.js)

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

  considered_emigration: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Opened the tab on emigration and never quite closed it — visa categories, salary comparisons, the NRI return.',
    intent: 'event',
    notes: 'Set by ind_nri_return_question and other emigration events. Follow-through: ind_considered_emigration_echo.',
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

  // ── GREECE ──────────────────────────────────────────────────────────────────

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

  gr_testigo_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Late-life witness to the full Greek arc — civil war aftermath, junta, Polytechnic, Metapolitefsi, EU accession, debt crisis, OXI',
    intent: 'both',
    notes: 'Set by gr_late_reckoning.',
  },

  // ── PORTUGAL ────────────────────────────────────────────────────────────────

  estado_novo_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Came of age under Salazar\'s Estado Novo — learned the PIDE, the calibrated sentence, the shape of forty-eight years of permitted life.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by pt_estado_novo_texture.',
  },

  colonial_war_served: {
    weight: 'major',
    category: 'trauma',
    description: 'Served in the Portuguese colonial wars in Africa (Angola, Guinea-Bissau, Mozambique, 1961–74) — came back changed in ways that take years to name.',
    intent: 'year_texture',
    timestamped: true,
    notes: 'Set by pt_colonial_war.',
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

  retornado_family: {
    weight: 'moderate',
    category: 'family',
    description: 'Family member was among the 700,000 retornados who returned from Angola and Mozambique after independence — arriving with what could be carried.',
    intent: 'year_texture',
    notes: 'Set by pt_retornados.',
  },

  witnessed_displacement: {
    weight: 'minor',
    category: 'formative',
    description: 'Witnessed mass displacement or return migration as a bystander — the particular weight of watching people arrive with everything they own.',
    intent: 'none',
    notes: 'Set by pt_retornados and similar displacement events.',
  },

  eu_accession_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through Portugal\'s 1986 EC accession as an adult — the structural funds, the new roads, the specific relief of a generation that remembered dictatorship.',
    intent: 'year_texture',
    notes: 'Set by pt_eu_accession.',
  },

  // ─── PHILIPPINES FLAGS ───────────────────────────────────────────────────────

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

  // ─── WORLD EVENT FLAGS (2013–2021) ───────────────────────────────────────────

  polarization_era: {
    weight: 'minor',
    category: 'political',
    description: 'Lived through the 2016 US election — the result that confounded the polls and launched a prolonged national reckoning.',
    intent: 'none',
    notes: 'Set by we_us_election_2016.',
  },

  metoo_era: {
    weight: 'minor',
    category: 'identity',
    description: 'Lived through the 2017–19 #MeToo reckoning — the public naming of what had been privately understood.',
    intent: 'none',
    notes: 'Set by we_metoo_2017.',
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

  // ── Brazil ───────────────────────────────────────────────────────────────────

  brazil_dictatorship_lived: {
    weight: 'major',
    category: 'political',
    description: 'Lived under Brazil\'s military dictatorship (1964–85) — AI-5, the DOPS, the DOI-CODI torture centers, and the "economic miracle" happening simultaneously.',
    intent: 'year_texture',
    notes: 'Set by brazil_1964_coup world event.',
  },

  bra_favela_generation: {
    weight: 'moderate',
    category: 'social',
    description: 'Grew up in a Brazilian favela — the hill, the self-built house, the water hose, the community, the bala perdida arithmetic.',
    intent: 'year_texture',
    notes: 'Set by bra_favela_childhood.',
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

  bra_amazon_generation: {
    weight: 'moderate',
    category: 'environmental',
    description: 'Was alive when Chico Mendes was shot in 1988 — lived in the era when the Amazon became a political economy with named stakes.',
    intent: 'year_texture',
    notes: 'Set by bra_chico_mendes.',
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

  bra_nordestino_migrant: {
    weight: 'moderate',
    category: 'migration',
    description: 'Migrated from Brazil\'s impoverished Northeast (sertão) to São Paulo or Rio — the pau-de-arara generation who built the southeast on their labor.',
    intent: 'year_texture',
    notes: 'Set by bra_nordestino_migration (choice 1).',
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

  bra_evangelical_convert: {
    weight: 'moderate',
    category: 'identity',
    description: 'Converted from Catholicism to evangelical Protestantism in Brazil\'s one-generation religious transformation — the Universal Church, the prosperity gospel, the favela congregation.',
    intent: 'year_texture',
    notes: 'Set by bra_evangelical_shift (choice 1).',
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


  // ─── ARGENTINA 2001 FLAGS ─────────────────────────────────────────────────────

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

  arg_savings_destroyed: {
    weight: 'major',
    category: 'economic',
    description: 'Had savings wiped by the pesificación — Argentine government conversion of dollar deposits to pesos at 1:1, then peso devalued 3:1; effectively lost two-thirds of savings.',
    intent: 'year_texture',
    notes: 'Set by la_arg_pesificacion.',
  },

  arg_2001_emigrant: {
    weight: 'moderate',
    category: 'migration',
    description: 'Left Argentina during or after the 2001–02 collapse — part of the 100,000+ who emigrated to Spain, Italy, and elsewhere in the exodus year.',
    intent: 'year_texture',
    notes: 'Set by la_arg_pesificacion (emigrate choice).',
  },

  arg_2001_stayed: {
    weight: 'moderate',
    category: 'identity',
    description: 'Stayed in Argentina through the 2001–02 collapse, navigating the pesificación and rebuilding within the country while others left.',
    intent: 'year_texture',
    notes: 'Set by la_arg_pesificacion (stay choice).',
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

  // ─── SPAIN FLAGS ─────────────────────────────────────────────────────────────

  franco_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Grew up in school under Franco — the portrait, Una Grande y Libre, the calibrated classroom where the boundary between sayable and unsayable was learned early.',
    intent: 'year_texture',
    notes: 'Set by es_franco_school.',
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

  transicion_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through La Transición — Franco\'s death 1975, the constitutional process, first democratic elections 1977, the 1978 constitution.',
    intent: 'year_texture',
    notes: 'Set by es_franco_death_1975.',
  },

  '23F_remembered': {
    weight: 'moderate',
    category: 'trauma',
    description: 'Was alive and aware for February 23, 1981 — Tejero in the Cortes, the 17-hour wait, the moment when nobody knew what kind of country it would be tomorrow.',
    intent: 'year_texture',
    notes: 'Set by es_23F_coup_attempt.',
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

  spain_crisis_emigrant: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Left Spain during the 2010s brain drain — the fuga de cerebros, EU passport, London or Berlin because the degree and the job market were not speaking.',
    intent: 'year_texture',
    notes: 'Set by es_brain_drain (leave branch).',
  },

  spain_crisis_stayed: {
    weight: 'moderate',
    category: 'resilience',
    description: 'Stayed in Spain through the 2010s crisis — the mileurista generation, the job that didn\'t use the degree, the parents\' apartment another year.',
    intent: 'year_texture',
    notes: 'Set by es_brain_drain (stay branch).',
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

  portuguese_troika_generation: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lived the Portuguese troika austerity 2011-2014: €78bn bailout, wage cuts, TSU rises, Constitutional Court battles, and the specific irony of Portuguese professionals emigrating to Angola and Brazil.',
    intent: 'year_texture',
    notes: 'Set by pt_troika_lived. Leave branch also sets portuguese_emigrant_2011.',
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

  // ─── CROSS-CUTTING EXPERIENCE FLAGS ──────────────────────────────────────────

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

  quiet_resistance: {
    weight: 'moderate',
    category: 'political',
    description: 'Practiced quiet resistance under an authoritarian system — the small refusal, the lesson that didn\'t include the required paragraph, the form filled incorrectly, the question asked that wasn\'t on the list.',
    intent: 'year_texture',
    notes: 'Set by events_career_regime.js (teacher, nurse, collective worker), events_gulf_east.js (gulf_female_navigation choice).',
  },

  sends_remittances: {
    weight: 'moderate',
    category: 'family',
    description: 'Sends remittances home — the monthly transfer that structures the relationship with family in the country of origin, the version of your life they receive being the money rather than the life.',
    intent: 'year_texture',
    notes: 'Set by events_vietnam.js (vn_viet_kieu_return or remittance choice) and events_romania.js (eu_emigrant_romania choice).',
  },

  survived_hyperinflation: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived hyperinflation — savings account numbers that stayed the same as the numbers became worth fractions; learning to spend the day you were paid; the literacy of what a currency actually is.',
    intent: 'year_texture',
    notes: 'Set by events_culture.js (hyperinflation event) and events_world_response.js (world event response).',
  },

  // ─── WORLD EVENT FLAGS (HISTORIC) ────────────────────────────────────────────

  cultural_revolution_generation: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through the Chinese Cultural Revolution (1966–76) — the school closures, the struggle sessions, the decade that organized itself around the destruction of the educated.',
    intent: 'year_texture',
    notes: 'Set by world event we_china_cultural_revolution.',
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

  economic_collapse_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Lived through national economic collapse — the currency devaluation, the bank freeze, the savings repriced into something worth a fraction of what they had been.',
    intent: 'year_texture',
    notes: 'Set by we_venezuela_collapse and similar catastrophic economic world events.',
  },

 // ── events_sick_child.js flags ────────────────────────────────────────

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

  ill_child_ward_community: {
    weight: 'minor',
    category: 'resilience',
    description: 'Found an unexpected community in the hospital ward — other parents who knew the specific knowledge the situation required.',
    intent: 'none',
    notes: 'Set by sick_child_ward_community.',
  },

  ill_child_late_witness: {
    weight: 'moderate',
    category: 'family',
    description: 'Witnessed who the formerly ill child became as an adult — either recovered and whole, or living well with a chronic condition.',
    intent: 'year_texture',
    notes: 'Set by sick_child_who_they_became or sick_child_chronic_late.',
  },

  // ── CAMBODIA DEPTH ──────────────────────────────────────────────────────────

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

  phnom_penh_return: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Returned to or arrived in Phnom Penh after liberation in 1979 — found the city half-empty, claimed a house, began rebuilding.',
    intent: 'year_texture',
    notes: 'Set by cam_phnom_penh_return. Gates the long-term reconstruction narrative.',
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

  landmine_country: {
    weight: 'moderate',
    category: 'environment',
    description: 'Grew up in a heavily mined country — learned which paths exist because other paths are mined; lived alongside demining operations and prosthetics clinics.',
    intent: 'year_texture',
    notes: 'Set by cam_landmine_awareness (Cambodia). The red markers are permanent furniture of the landscape.',
  },

  tuol_sleng_witnessed: {
    weight: 'moderate',
    category: 'historical',
    description: 'Visited Tuol Sleng (S-21) — saw the intake photographs of the 17,000 prisoners, most of whom did not survive; left with unanswerable questions.',
    intent: 'year_texture',
    notes: 'Set by cam_tuol_sleng.',
  },

  khmer_rouge_late_reckoned: {
    weight: 'moderate',
    category: 'resilience',
    description: 'In late life, reached a reckoning with what was passed on — the silence, the building, the question of what was protected and what was lost.',
    intent: 'year_texture',
    notes: 'Set by cam_survivor_late_reckoning.',
  },

  // ── INDIA INFRASTRUCTURE ─────────────────────────────────────────────────────

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

  // ── BOLIVIA INFRASTRUCTURE ───────────────────────────────────────────────────

  cochabamba_witness: {
    weight: 'minor',
    category: 'historical',
    description: 'Was present in Cochabamba during the 2000 Water War — the first successful uprising against water privatisation in the world.',
    intent: 'none',
    notes: 'Set by we_cochabamba_water_war_2000 world event.',
  },

  // ── CARIBBEAN ────────────────────────────────────────────────────────────────

  jamaican_independence_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Was present in Jamaica for the August 6, 1962 independence celebrations — old enough to remember the flag going up and what was believed that night.',
    intent: 'none',
    notes: 'Set by we_jamaica_independence_1962. Generational marker; no separate follow-through needed.',
  },

  jamaican_garrison_community: {
    weight: 'major',
    category: 'political',
    description: 'Grew up in a Kingston garrison community — the neighborhood organized around party loyalty, the don as parallel state, JLP or PNP colors as civic identity.',
    intent: 'both',
    notes: 'Set by jam_garrison_childhood. Gates jam_area_don and jam_late_reckoning.',
  },

  rasta_encounter: {
    weight: 'moderate',
    category: 'identity',
    description: 'Encountered Rastafari as a living theological and political movement — the reasoning about Babylon, Zion, African repatriation, and colonial inheritance from someone inside it.',
    intent: 'year_texture',
    notes: 'Set by jam_rasta_as_form. Not about aesthetics — about the worldview.',
  },

  jamaica_1980_election_witness: {
    weight: 'major',
    category: 'political',
    description: 'Lived through the 1980 Jamaican election — 800 people killed by garrison-distributed political guns before and after the October vote.',
    intent: 'event',
    notes: 'Set by jam_1980_election_violence.',
  },

  jamaica_emigrated: {
    weight: 'major',
    category: 'displacement',
    description: 'Left Jamaica for London, New York, or Toronto during the Windrush era or its aftermath — the specific emigration of the Anglophone Caribbean to Britain and North America.',
    intent: 'event',
    notes: 'Set by jam_emigration_decision (leave choice). Gates jam_late_reckoning.',
  },

  jamaica_stayed: {
    weight: 'moderate',
    category: 'identity',
    description: 'Chose to stay in Jamaica when emigration was the live option — carried the awareness of what that meant as the people who left sent letters.',
    intent: 'year_texture',
    notes: 'Set by jam_emigration_decision (stay choice).',
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

  trinidad_oil_boom_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Came of age during T&T\'s oil boom (1973-1986) — the specific affluence, the imported goods, the Caribbean neighbors arriving for work, before the price collapse.',
    intent: 'year_texture',
    notes: 'Set by tri_oil_boom_texture.',
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

  trinidad_1990_coup_witness: {
    weight: 'major',
    category: 'historical',
    description: 'Witnessed the July 27, 1990 Jamaat al Muslimeen coup attempt — Abu Bakr\'s men holding parliament and TTT for six days, the Prime Minister on television at gunpoint.',
    intent: 'event',
    notes: 'Set by tri_1990_coup.',
  },

  steelband_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up with the steel pan as the national instrument — the instrument invented from oil drums after the colonial ban on African drums, now played across ethnic lines.',
    intent: 'none',
    notes: 'Set by tri_steelband_solidarity.',
  },

  // ── GUINEA-CONAKRY ARC ───────────────────────────────────────────────────────

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

  camp_boiro_survivor_adjacent: {
    weight: 'major',
    category: 'trauma',
    description: 'Someone close survived Camp Boiro — the political prison where thousands were killed by deliberate starvation under the "black diet."',
    intent: 'year_texture',
    notes: 'Set by gn_camp_boiro (survived branch). Carries the weight of what the survivor does not say.',
  },

  camp_boiro_family_loss: {
    weight: 'major',
    category: 'grief',
    description: 'Someone close disappeared into Camp Boiro and did not return — officially died of "illness," no body, no date.',
    intent: 'year_texture',
    notes: 'Set by gn_camp_boiro (lost branch). Deep grief flag; year-texture prose.',
  },

  guinea_exile: {
    weight: 'moderate',
    category: 'migration',
    description: 'Left Guinea during the Touré era — part of the educated-class exodus to Dakar, Paris, or Montreal.',
    intent: 'event',
    notes: 'Set by gn_educated_class_leaves (leave branch). Works alongside emigrated flag.',
  },

  guinea_stayed_accommodation: {
    weight: 'moderate',
    category: 'survival',
    description: 'Stayed in Guinea and learned the accommodations staying required — which projects to propose, which knowledge to keep private.',
    intent: 'event',
    notes: 'Set by gn_educated_class_leaves (stay branch).',
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
    intent: 'none',
    notes: 'Set by we_guinea_independence_1958. Historical generational marker; no separate follow-through needed.',
  },

  guinea_stadium_2009_witness: {
    weight: 'major',
    category: 'trauma',
    description: 'Witnessed or lived through the September 28, 2009 stadium massacre in Conakry — 157 killed, systematic rape by Presidential Guard soldiers.',
    intent: 'year_texture',
    notes: 'Set by gn_stadium_2009. Late-life reckoning through impunity — Dadis Camara still alive in Burkina Faso.',
  },

  // ── MONGOLIA ARC ─────────────────────────────────────────────────────────────

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

  mn_post_socialist_shock: {
    weight: 'moderate',
    category: 'economic',
    description: 'Experienced the post-1990 negdel dissolution — animals returned, but veterinary support, guaranteed prices, and collective infrastructure gone.',
    intent: 'event',
    notes: 'Set by mn_negdel_dissolution_shock.',
  },

  dzud_survivor: {
    weight: 'major',
    category: 'survival',
    description: 'Survived a dzud — catastrophic winter when snow seals the grass and livestock die by thousands; the 2000 dzud killed a third of Mongolia\'s national herd.',
    intent: 'year_texture',
    notes: 'Set by mn_dzud_winter. Permanent relationship to winter weather; climate arc texture.',
  },

  ger_district_migrant: {
    weight: 'moderate',
    category: 'migration',
    description: 'Left the steppe for Ulaanbaatar\'s ger districts — yurt neighborhoods at the city edge, coal stoves producing some of the world\'s worst winter air quality.',
    intent: 'year_texture',
    notes: 'Set by mn_ulaanbaatar_migration.',
  },

  // ── BURKINA FASO / SANKARA ARC ───────────────────────────────────────────────

  sankara_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Grew up under Thomas Sankara\'s 1983–1987 revolution — cycling president, mass vaccinations, renamed country, cotton clothing replacing imported suits.',
    intent: 'year_texture',
    notes: 'Set by bfa_sankara_bicycle. Gates bfa_sankara_killed, bfa_compaore_silence, bfa_sankara_late_reckoning. Also used by sankara_assassination_1987 world event guard.',
  },

  sankara_mourner: {
    weight: 'major',
    category: 'trauma',
    description: 'Carries the specific grief of Sankara\'s assassination — a political death experienced as personal loss, the friend-who-killed-his-friend betrayal.',
    intent: 'year_texture',
    notes: 'Set by bfa_sankara_killed (Memorize branch) or sankara_assassination_1987 world event. Annual texture: the unmarked grave, the renamed boulevard.',
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

  burkina_sahel_displaced: {
    weight: 'major',
    category: 'migration',
    description: 'Was internally displaced by the Sahel jihadist insurgency (2019–2025) — part of the two million who fled.',
    intent: 'year_texture',
    notes: 'Set by bfa_sahel_violence (Flee branch). Year texture: camp life, loss of home, uncertain return.',
  },

  // ── MALI ARC ─────────────────────────────────────────────────────────────────

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

  mali_democracy_generation: {
    weight: 'major',
    category: 'political',
    description: 'Lived through Mali\'s March 1991 democratic revolution — the moment General ATT refused to fire on protesters and Traoré was arrested in his own home.',
    intent: 'year_texture',
    notes: 'Set by mli_revolution_1991. Late-life reckoning in mli_sahel_late_reckoning when democracy collapses in 2020.',
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

  mali_long_witness: {
    weight: 'major',
    category: 'experience',
    description: 'Late-life reckoning with Mali\'s cycle of coups (1968, 1991, 2012, 2020, 2021) — lived through democracy\'s arrival and its collapse, having marched or witnessed 1991.',
    intent: 'year_texture',
    notes: 'Set by mli_sahel_late_reckoning. Late-life only. The march as middle of a story rather than its end.',
  },

  // ── POLITICAL ARC ────────────────────────────────────────────────────────────

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

  // ── ERITREA ──────────────────────────────────────────────────────────────────

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
    intent: 'none',
    notes: 'Set by we_eritrea_border_war_1998. The war that turned independence into permanent emergency; no separate follow-through needed beyond eri arc events.',
  },

  eritrean_national_service: {
    weight: 'major',
    category: 'political',
    description: 'Subjected to Eritrea\'s indefinite national service — the Warsay-Yikaalo campaign, 500 nakfa/month, no legal right to leave the country without permission.',
    intent: 'year_texture',
    notes: 'Set by eri_border_war_1998 (both choices) and eri_leaving_decision (stayed). Annual texture until emigration or death.',
  },

  eri_border_war_veteran: {
    weight: 'moderate',
    category: 'conflict',
    description: 'Served in the 1998–2001 Eritrea-Ethiopia border war — the trench at Zalambessa, artillery, seventy thousand dead over a town in Italian-era treaty documents.',
    intent: 'event',
    notes: 'Set by eri_border_war_1998 (served choice).',
  },

  eri_national_service_endured: {
    weight: 'moderate',
    category: 'political',
    description: 'Chose to endure Eritrea\'s indefinite national service rather than flee — years of construction, teaching in remote villages, waiting for a release date that never came.',
    intent: 'event',
    notes: 'Set by eri_national_service_indefinite (stayed choice) and eri_leaving_decision (stayed choice).',
  },

  eri_flight_planned: {
    weight: 'moderate',
    category: 'migration',
    description: 'Made the decision to leave Eritrea — crossing into Sudan at night, the arithmetic of survival routes, the specific knowledge of what the Sinai does.',
    intent: 'event',
    notes: 'Set by eri_national_service_indefinite (planning choice). Gates eri_leaving_decision.',
  },

  eri_g15_witness: {
    weight: 'moderate',
    category: 'political',
    description: 'Witnessed the September 2001 G-15 crackdown — eleven senior officials arrested without trial, independent press shut overnight, three journalists known personally.',
    intent: 'none',
    notes: 'Set by eri_g15_crackdown_2001. Echoed through the general political arc and late reckoning.',
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

  eritrean_late_reckoned: {
    weight: 'moderate',
    category: 'identity',
    description: 'Measured independent Eritrea against what the independence movement said it would be — the gap between 1993 and now, the generation lost to indefinite service.',
    intent: 'none',
    notes: 'Set by eri_late_reckoning.',
  },

  // ── CROSS-CUTTING / GENERAL FLAGS ─────────────────────────────────────────
  // High-frequency flags set and checked across many modules; registered here
  // to maintain audit trail. Most are intent:'none' (gates events organically).

  devout: {
    weight: 'moderate',
    category: 'faith',
    description: 'Adherent faith practice — prayer, observance, community — that guides daily decisions rather than being nominal.',
    intent: 'none',
    notes: 'Cross-cutting. Set by various religion and cultural events. Checked 6x across event guards.',
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

  scholarship_recipient: {
    weight: 'moderate',
    category: 'achievement',
    description: 'Received a scholarship that opened a door — the selection that made a different trajectory possible.',
    intent: 'none',
    notes: 'Cross-cutting. Set by school and education events. Distinct from first_gen_graduate (cause vs. outcome).',
  },

  corruption_exposed: {
    weight: 'moderate',
    category: 'moral',
    description: 'Exposed or bore witness to systematic corruption at close range — the knowledge of how the money actually moves.',
    intent: 'none',
    notes: 'Cross-cutting. Set by career-regime, Mani Pulite, and political events.',
  },

  // ── CROSSCUTTING LIFE CONDITION FLAGS ──────────────────────────────────────
  poverty_childhood: {
    weight: 'major',
    category: 'economic',
    description: 'Grew up in poverty — food insecurity, material deprivation, and the specific knowledge that scarcity produces during formation years.',
    intent: 'both',
    notes: 'Set by multiple events across conflict_childhood, poverty, informal, and country-specific arcs. Checked in epitaph (hadHardChildhood) and event guards.',
  },

  grew_up_in_camp: {
    weight: 'major',
    category: 'displacement',
    description: 'Spent childhood or formative years in a refugee or IDP camp — the specific institutional experience of displaced community life.',
    intent: 'both',
    notes: 'Set by rohingya, palestine, somalia, and conflict-zone events for characters displaced in early life.',
  },

  coup_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'Lived through a military coup — the overnight restructuring of power, the curfew, the announcements on state radio.',
    intent: 'both',
    notes: 'Generic version of country-specific coup flags. Set across West African, Southeast Asian, Latin American arcs.',
  },

  disaster_survivor: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Survived a major natural disaster — earthquake, flood, cyclone — and carries the specific recalibration of risk that produces.',
    intent: 'both',
    notes: 'Set by events_disasters.js, events_nepal.js, events_haiti.js, and others where physical disaster survival is confirmed.',
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

  education_interrupted: {
    weight: 'moderate',
    category: 'education',
    description: 'Had education interrupted — by conflict, poverty, family need, displacement, or regime policy — before reaching desired level.',
    intent: 'both',
    notes: 'Set across conflict, poverty, and country-specific arcs where formal education is cut short by circumstance.',
  },

  political_aware: {
    weight: 'minor',
    category: 'political',
    description: 'Developed political consciousness — aware of structural power, regime character, and the conditions that produce what is experienced as ordinary life.',
    intent: 'both',
    notes: 'Set by protest, crisis, and injustice events. Checked in epitaph for summary language.',
  },

  left_school_early: {
    weight: 'moderate',
    category: 'identity',
    description: 'Exited formal education before completion — for work, family obligation, marriage, conflict, or necessity.',
    intent: 'none',
    notes: 'Cross-cutting. Set by poverty, child labor, family obligation, and conflict events.',
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

  found_meaning: {
    weight: 'moderate',
    category: 'psychological',
    description: 'Found a source of meaning — work, community, faith, art, or relationship — that orients the life beyond survival.',
    intent: 'both',
    notes: 'Set by faith arc, project arc, teaching arc, and desire-resolution events.',
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

  mobile_money_user: {
    weight: 'minor',
    category: 'economic',
    description: 'Adopted mobile money — M-Pesa, bKash, MTN Mobile Money — as a primary financial infrastructure before having a bank account.',
    intent: 'event',
    notes: 'Set alongside mobile_money flag. Both checked in year texture via mobile_money || mobile_money_user.',
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

  experienced_loss: {
    weight: 'moderate',
    category: 'psychological',
    description: 'Experienced significant loss — beyond standard grief, a loss that reshaped the life\'s topology.',
    intent: 'both',
    notes: 'Set by grief, conflict, and crisis arcs as a catch-all for non-specific but significant loss. Has year texture in buildYearTexture.',
  },

  internet_generation: {
    weight: 'moderate',
    category: 'technology',
    description: 'Part of the first generation for whom the internet was formative — shaped by early online culture, social media, and the specific consciousness of living publicly online.',
    intent: 'year_texture',
    notes: 'Set by technology arc events. Has year texture in buildYearTexture.',
  },

  // ── TURKEY DEPTH ────────────────────────────────────────────────────────────

  tur_ataturk_era: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived through Atatürk\'s top-down modernisation programme — the Latin alphabet, dress code reforms, secularist state — and is positioned by it, for or against.',
    intent: 'both',
    notes: 'Set by tur_ataturk_alphabet event. Has year texture in Turkey section of buildYearTexture.',
  },

  tur_kahramanmaras_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Experienced the February 2023 Kahramanmaraş earthquakes — either directly in the southeast or as a witnessing Turkish citizen following the count.',
    intent: 'both',
    notes: 'Set by tur_kahramanmaras_2023 event. Has year texture in Turkey section of buildYearTexture.',
  },

  tur_refugee_host_generation: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived in Turkey during the Syrian refugee influx — neighbourhood transformation, economic pressure, and the dual reality of humanitarian obligation and political resentment.',
    intent: 'both',
    notes: 'Set by tur_syrian_refugees event. Has year texture in Turkey section of buildYearTexture.',
  },

  tur_lira_crisis_lived: {
    weight: 'moderate',
    category: 'economic',
    description: 'Experienced the Turkish lira\'s collapse of 2021–2022 — 80%+ inflation, savings eroded, everyday purchasing power gutted by unorthodox monetary policy.',
    intent: 'both',
    notes: 'Set by tur_lira_crisis event. Has year texture in Turkey section of buildYearTexture.',
  },

  tur_istanbul_convention_generation: {
    weight: 'moderate',
    category: 'political',
    description: 'A Turkish woman who lived through the government\'s 2021 withdrawal from the Istanbul Convention on violence against women — either protesting or watching.',
    intent: 'both',
    notes: 'Set by tur_istanbul_convention event (female only). Has year texture in Turkey section.',
  },

  // ── NOMADIC LIFE ────────────────────────────────────────────────────────────

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

  // ── BOLIVIA FLAGS ──────────────────────────────────────────────────────────────

  bol_mining_generation: {
    weight: 'major',
    category: 'identity',
    description: 'Grew up in a Bolivian mining town — Potosí or Oruro — where the smelter and the Cerro Rico defined the landscape and the cough of the fathers.',
    intent: 'year_texture',
    notes: 'Set by bol_mining_childhood. Bolivia only.',
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

  bol_banzer_era_youth: {
    weight: 'moderate',
    category: 'conflict',
    description: 'Came of age under General Banzer\'s 1971–78 dictatorship — "comunista, subversivo, agitador" as the preferred vocabulary for dissent.',
    intent: 'none',
    notes: 'Set by bol_banzer_era. Bolivia only.',
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

  bol_eradication_victim: {
    weight: 'moderate',
    category: 'conflict',
    description: 'Directly affected by the US-funded coca eradication programme — the army arrived with bulldozers.',
    intent: 'none',
    notes: 'Set alongside bol_coca_grower by bol_coca_eradication. Bolivia only.',
  },

  bol_coca_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Urban Bolivian who watched the Chapare eradication from a distance — understood both arguments.',
    intent: 'none',
    notes: 'Set by bol_coca_eradication (observer choice). Bolivia only.',
  },

  bol_gas_war_generation: {
    weight: 'major',
    category: 'conflict',
    description: 'Lived through or participated in the 2003 Gas War — sixty-seven dead in El Alto, Goni\'s flight to Miami, the gas kept under Bolivian soil.',
    intent: 'year_texture',
    notes: 'Set by bol_gas_war_2003. Bolivia only.',
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

  // ── NEW ZEALAND FLAGS ──────────────────────────────────────────────────────────

  nz_rugby_generation: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up with rugby as a near-civic religion — the All Blacks as national identity, the haka before they learned French.',
    intent: 'none',
    notes: 'Set by nz_rugby_childhood. New Zealand only.',
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
    intent: 'none',
    notes: 'Set by nz_rainbow_warrior_1985. New Zealand only.',
  },

  nz_rogernomics_generation: {
    weight: 'major',
    category: 'economics',
    description: 'Lived through Rogernomics 1984–90 — New Zealand as a free-market laboratory, the egalitarianism that turned out to be policy rather than character.',
    intent: 'year_texture',
    notes: 'Set by nz_rogernomics. New Zealand only.',
  },

  nz_nuclear_free_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Remembers New Zealand\'s nuclear-free declaration and the ANZUS fracture — a small country choosing its principles over its alliance.',
    intent: 'none',
    notes: 'Set by nz_nuclear_free_declaration. New Zealand only.',
  },

  nz_left_for_australia: {
    weight: 'moderate',
    category: 'migration',
    description: 'Left New Zealand for Australia — the Tasman migration logic: same language, easier visa, higher wages, familiar enough it doesn\'t feel like leaving.',
    intent: 'none',
    notes: 'Set by nz_brain_drain (left choice). New Zealand only.',
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

  // ── CROSS-CUTTING FLAGS (FT-23 coverage) ──────────────────────────────────────

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

  radio_childhood: {
    weight: 'minor',
    category: 'identity',
    description: 'Grew up with radio as the primary information medium — learned to read the world through sound before television made it spectacle.',
    intent: 'event',
    notes: 'Set by events_texture.js and events_technology.js. Checked by ft23_radio_childhood_memory.',
  },

  sibling_reconciled: {
    weight: 'moderate',
    category: 'relationships',
    description: 'Reconciled with an estranged sibling — the relationship is present but careful at the edges, which is a kind of love.',
    intent: 'event',
    notes: 'Set by events_siblings.js and events_late_life.js. Checked by ft23_sibling_reconciled_settled.',
  },

  earthquake_survivor: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived a major earthquake — the body retains the memory of the ground moving; certain sounds still produce the response before the mind catches up.',
    intent: 'event',
    notes: 'Set by Haiti earthquake events and worldEvents.js. Checked by ft23_earthquake_survivor_*.',
  },

  // ── CROSS-CUTTING FLAGS (FT-24 coverage) ──────────────────────────────────────

  athlete_became_coach: {
    weight: 'moderate',
    category: 'career',
    description: 'Transitioned from performing athlete to coach — finding language for physical knowledge never spoken, watching another body learn what yours already knows.',
    intent: 'event',
    notes: 'Set by events_career_arcs.js and events_gifted.js. Checked by ft24_athlete_coach_settled.',
  },

  failure_integrated: {
    weight: 'moderate',
    category: 'moral',
    description: 'Has genuinely processed a major failure — looked at it straight, understood what it cost and what it meant, without the nausea.',
    intent: 'event',
    notes: 'Set by events_coherence.js. Checked by ft24_failure_integrated_midlife.',
  },

  manages_chronic_condition: {
    weight: 'moderate',
    category: 'health',
    description: 'Living with a managed chronic condition — not crisis, but permanent infrastructure: the medication, the avoidances, the calendar of check-ups.',
    intent: 'event',
    notes: 'Set by events_illness.js and events_condition_arc.js. Checked by ft24_manages_chronic_texture.',
  },

  party_member: {
    weight: 'major',
    category: 'moral',
    description: 'Joined the ruling party for pragmatic reasons under a single-party system — the ideology performed well enough to be unremarkable, the advancement real.',
    intent: 'event',
    notes: 'Set by events_historical.js and events_culture.js. Checked by ft24_party_member_reckoning.',
  },

  found_community: {
    weight: 'major',
    category: 'relationships',
    description: 'Found a community — people who know things about you that others in your life don\'t, who have watched you change and you them; now includes funerals.',
    intent: 'event',
    notes: 'Set by events_culture.js (LGBTQ community finding). Checked by ft24_found_community_deepens.',
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

  vision_impaired: {
    weight: 'moderate',
    category: 'health',
    description: 'Experiencing significant vision loss — living in a smaller perceptual radius, adapting through memory and other senses.',
    intent: 'event',
    notes: 'Set by events_late_life.js. Checked by ft24_vision_impaired_adapts.',
  },

  // ── WORLD-EVENT FLAGS (bulk registration) ─────────────────────────────────────
  // Set by worldEvents.js addFlags arrays. Registered here so the flag audit
  // tracks them. Most carry intent: 'none' — set by world event, no dedicated
  // follow-through event required beyond what the world event itself provides.

  lived_through_occupation: {
    weight: 'major', category: 'conflict',
    description: 'Lived through a military occupation — the experience of foreign soldiers, curfews, and daily civilian life under hostile control.',
    intent: 'none', notes: 'Set by WWII occupation world events.',
  },
  lived_through_revolution: {
    weight: 'major', category: 'conflict',
    description: 'Lived through a revolution — the specific fear and possibility of a rapid political rupture.',
    intent: 'none', notes: 'Set by various revolution world events.',
  },
  war_generation: {
    weight: 'major', category: 'conflict',
    description: 'Grew up or came of age during a major war — the formative compression of wartime.',
    intent: 'none', notes: 'Set by WWII and major conflict world events.',
  },
  hyperinflation_survivor: {
    weight: 'major', category: 'economics',
    description: 'Lived through hyperinflation — prices changing faster than earnings, money bundled in newspaper because wallets became impractical.',
    intent: 'none', notes: 'Set by hyperinflation world events (Weimar, Zimbabwe, etc.).',
  },
  veteran: {
    weight: 'major', category: 'identity',
    description: 'Military veteran — carries the body knowledge, the specific friends, and the things not spoken of from active service.',
    intent: 'none', notes: 'Set by war world events.',
  },
  drought_survivor: {
    weight: 'moderate', category: 'trauma',
    description: 'Survived a major drought — the specific experience of watching a landscape dry and food become scarce.',
    intent: 'none', notes: 'Set by drought/famine world events.',
  },
  economic_stabilization: {
    weight: 'moderate', category: 'economics',
    description: 'Lived through economic stabilisation after crisis — the specific relief and residual distrust of a currency that had become worthless.',
    intent: 'none', notes: 'Set by economic crisis/recovery world events.',
  },
  post_soviet_shock: {
    weight: 'major', category: 'economics',
    description: 'Experienced the post-Soviet economic shock — savings wiped, factories closed, the state\'s guarantees withdrawn overnight.',
    intent: 'none', notes: 'Set by Soviet collapse world events.',
  },
  apartheid_privileged: {
    weight: 'major', category: 'moral',
    description: 'Was privileged under apartheid — white South African who benefited from a system of racial separation.',
    intent: 'none', notes: 'Set by apartheid world events.',
  },
  witnessed_climate_change: {
    weight: 'moderate', category: 'trauma',
    description: 'Has witnessed visible climate change effects — weather patterns, species, landscapes changed in a lifetime.',
    intent: 'none', notes: 'Set by climate world events.',
  },
  genocide_witness: {
    weight: 'major', category: 'trauma',
    description: 'Witnessed a genocide — carries the specific weight of knowing what human beings did to each other in their time.',
    intent: 'none', notes: 'Set by genocide world events (Rwanda, Srebrenica, etc.).',
  },
  tutsi_hidden: {
    weight: 'major', category: 'conflict',
    description: 'Was a Tutsi who survived the 1994 genocide by hiding or being sheltered — the specific debt of being found later.',
    intent: 'none', notes: 'Set by Rwanda genocide world event.',
  },
  systemic_discrimination: {
    weight: 'major', category: 'conflict',
    description: 'Has experienced systemic discrimination — not the individual encounter but the structural, legal, or social system built against them.',
    intent: 'none', notes: 'Set by apartheid and Jim Crow world events.',
  },
  yugoslav_war_survivor: {
    weight: 'major', category: 'conflict',
    description: 'Survived the Yugoslav wars of the 1990s — the specific grief of a country that ceased to exist.',
    intent: 'none', notes: 'Set by Yugoslav dissolution world events.',
  },
  revolution_disillusionment: {
    weight: 'moderate', category: 'moral',
    description: 'Has experienced the disillusionment after a revolution — when the new order fails to deliver what the old order\'s overthrow promised.',
    intent: 'none', notes: 'Set by post-revolutionary disillusionment world events.',
  },
  iran_revolution_lived: {
    weight: 'major', category: 'conflict',
    description: 'Lived through the 1979 Iranian revolution — watched a monarchy become a theocracy in under a year.',
    intent: 'none', notes: 'Set by Iranian revolution world event.',
  },
  korean_division_generation: {
    weight: 'major', category: 'conflict',
    description: 'Generation of Koreans who lived through or were defined by the division of the peninsula — family on the other side of a border that cannot be crossed.',
    intent: 'none', notes: 'Set by Korean War/division world events.',
  },
  divided_family: {
    weight: 'major', category: 'relationships',
    description: 'Family separated by political division — a sibling, parent, or relative on the other side of a border that became permanent.',
    intent: 'none', notes: 'Set by Korean division world event.',
  },
  cultural_revolution_survived: {
    weight: 'major', category: 'conflict',
    description: 'Survived the Chinese Cultural Revolution — the struggle sessions, the re-education, the specific terror of neighbours turned informers.',
    intent: 'none', notes: 'Set by Cultural Revolution world events.',
  },
  saigon_fell: {
    weight: 'major', category: 'conflict',
    description: 'Was present when Saigon fell in April 1975 — the helicopters on the roof, the embassy, the end of the American war.',
    intent: 'none', notes: 'Set by Fall of Saigon world event.',
  },
  soviet_collapse_lived: {
    weight: 'major', category: 'conflict',
    description: 'Witnessed the collapse of the Soviet Union — the end of an empire that had been presented as permanent.',
    intent: 'none', notes: 'Set by Soviet collapse world events.',
  },
  chechen_war_generation: {
    weight: 'major', category: 'conflict',
    description: 'Grew up during the Chechen wars — in Russia or Chechnya, the war was the permanent backdrop.',
    intent: 'none', notes: 'Set by Chechen war world events.',
  },
  chechen_civilian: {
    weight: 'major', category: 'conflict',
    description: 'Was a Chechen civilian during the wars — the specific experience of Grozny under bombardment.',
    intent: 'none', notes: 'Set by Chechen war world events.',
  },
  eu_generation: {
    weight: 'moderate', category: 'identity',
    description: 'Grew up with European Union membership as a given — free movement, the euro, the removal of borders that had defined a continent.',
    intent: 'none', notes: 'Set by EU formation/expansion world events.',
  },
  witnessed_democracy_end: {
    weight: 'major', category: 'conflict',
    description: 'Witnessed the end of a democratic government — a coup, an autogolpe, an election that was the last.',
    intent: 'none', notes: 'Set by various coup/democratic collapse world events.',
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
  condor_generation: {
    weight: 'major', category: 'conflict',
    description: 'Generation defined by Operation Condor — the US-backed network of South American dictatorships that coordinated disappearances across borders.',
    intent: 'none', notes: 'Set by Operation Condor world events.',
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
  red_terror_generation: {
    weight: 'major', category: 'conflict',
    description: 'Survived the Ethiopian Red Terror 1977–78 — 500,000 dead, the bodies displayed as warnings.',
    intent: 'none', notes: 'Set by Red Terror world event.',
  },
  mau_mau_generation: {
    weight: 'major', category: 'conflict',
    description: 'Generation defined by the Mau Mau uprising and British counter-insurgency in Kenya — detention camps, collective punishment.',
    intent: 'none', notes: 'Set by Mau Mau world event.',
  },
  independence_kenya: {
    weight: 'major', category: 'identity',
    description: 'Witnessed Kenyan independence 1963 — uhuru, and the specific expectations that came with it.',
    intent: 'none', notes: 'Set by Kenya independence world event.',
  },
  biafra_generation: {
    weight: 'major', category: 'conflict',
    description: 'Generation marked by the Biafra war 1967–70 — one million dead from famine, the images of starving children, the silence after.',
    intent: 'none', notes: 'Set by Biafra world event.',
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
  civil_war_generation: {
    weight: 'major', category: 'conflict',
    description: 'Generation defined by civil war — fought over by factions, the state collapsed into competing armies.',
    intent: 'none', notes: 'Set by various civil war world events.',
  },
  anarchist_barcelona: {
    weight: 'moderate', category: 'identity',
    description: 'Lived in anarchist Barcelona 1936–37 — the collectives, the militias, the brief utopia before it was crushed.',
    intent: 'none', notes: 'Set by Spanish Civil War world event.',
  },
  depression_generation: {
    weight: 'major', category: 'economics',
    description: 'Grew up during the Great Depression — the bread lines, Hoovervilles, the decade of unemployment that shaped a generation\'s relationship to money.',
    intent: 'none', notes: 'Set by Great Depression world events.',
  },
  flu_pandemic_survivor: {
    weight: 'major', category: 'trauma',
    description: 'Survived the 1918 Spanish flu pandemic — 50 million dead globally, the young killed disproportionately, the silence that followed.',
    intent: 'none', notes: 'Set by Spanish flu world event.',
  },
  lumumba_generation: {
    weight: 'major', category: 'conflict',
    description: 'Generation that witnessed Patrice Lumumba — his independence speech, his assassination weeks later, the lesson that independence could be reversed.',
    intent: 'none', notes: 'Set by Lumumba world event.',
  },
  bay_of_pigs_generation: {
    weight: 'moderate', category: 'conflict',
    description: 'Lived through the Bay of Pigs invasion 1961 — the CIA-backed exile attempt, the Cuban defeat, the specific proof that the revolution would be defended.',
    intent: 'none', notes: 'Set by Bay of Pigs world event.',
  },
  mariel_generation: {
    weight: 'major', category: 'migration',
    description: 'Mariel boatlift generation — left Cuba in 1980, the 125,000 who sailed to Florida in five months.',
    intent: 'none', notes: 'Set by Mariel boatlift world event.',
  },
  mobutu_fall_generation: {
    weight: 'moderate', category: 'conflict',
    description: 'Generation that witnessed Mobutu\'s fall 1997 — the collapse of Zaire and the chaos that followed.',
    intent: 'none', notes: 'Set by Mobutu fall world event.',
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

  iran_woman_life_freedom_generation: {
    weight: 'major',
    category: 'conflict',
    description: 'Lived through the 2022 Woman, Life, Freedom uprising in Iran — the most sustained challenge to the Islamic Republic since the revolution, sparked by Mahsa Amini\'s death in Morality Police custody.',
    intent: 'none',
    notes: 'Set by we_iran_mahsa_amini_2022 world event. Iran only.',
  },

  turkey_syria_earthquake_2023: {
    weight: 'major',
    category: 'trauma',
    description: 'Survived the February 2023 Turkey-Syria earthquake — 50,000+ dead, cities in rubble, survivors waiting in freezing February nights.',
    intent: 'none',
    notes: 'Set by we_turkey_syria_earthquake_2023 world event. Turkey/Syria characters.',
  },

  sudan_civil_war_2023: {
    weight: 'major',
    category: 'conflict',
    description: 'Living through the 2023 Sudan civil war — SAF vs. RSF, Khartoum as a battlefield, 7 million displaced, the civilian transition destroyed.',
    intent: 'none',
    notes: 'Set by we_sudan_civil_war_2023 world event. Sudan only.',
  },

  // ── FOLLOWTHROUGH 26 FLAGS — early-life + cross-cutting ─────────────────────

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

  arranged_marriage: {
    weight: 'major',
    category: 'relationship',
    description: 'Entered a marriage arranged by family rather than chosen independently — the starting point, not the ending.',
    intent: 'event',
    notes: 'Set by events_texture.js rural marriage pressure event. Gates ftw26_arranged_marriage_midlife.',
  },

  partition_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Family was displaced or divided by a partition — the specific grief of a street or city on the other side of a new border.',
    intent: 'event',
    notes: 'Set by events_texture.js partition event. Gates ftw26_partition_late.',
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

  // ── AID WORKER ARC ──────────────────────────────────────────────────────────

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

  aw_programme_ended: {
    weight: 'moderate',
    category: 'career',
    description: 'Managed the closure of a humanitarian programme — not because the crisis ended but because funding shifted.',
    intent: 'none',
    notes: 'Set by aw_funding_cut (both choices). The families heard at approximately the same time as the flight home.',
  },

  aw_dissented: {
    weight: 'moderate',
    category: 'moral',
    description: 'Formally flagged internal dissent about an inadequate closure protocol — noted, unchanged.',
    intent: 'none',
    notes: 'Set by aw_funding_cut second choice. The thing on the record.',
  },

  aw_burnout_break: {
    weight: 'moderate',
    category: 'health',
    description: 'Took leave from humanitarian work due to compassion fatigue — the switch that does not turn fully on.',
    intent: 'none',
    notes: 'Set by aw_burnout first choice.',
  },

  aw_left_sector: {
    weight: 'moderate',
    category: 'career',
    description: 'Left the humanitarian sector entirely — the guilt and the relief both present and honest.',
    intent: 'none',
    notes: 'Set by aw_burnout second choice.',
  },

  aw_burnout_endured: {
    weight: 'moderate',
    category: 'moral',
    description: 'Continued aid work through compassion fatigue — the work got done; unclear whether this was commitment.',
    intent: 'none',
    notes: 'Set by aw_burnout third choice.',
  },

  // ── FIJI ARC ─────────────────────────────────────────────────────────────────

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

  fiji_emigrated: {
    weight: 'major',
    category: 'migration',
    description: 'Left Fiji as part of the Indo-Fijian emigration wave (1987–2010) — Brisbane, Auckland, Toronto, the specific knowledge of being Fijian Indian elsewhere.',
    intent: 'event',
    notes: 'Set by fj_emigration first choice. Gates fj_late_life emigrant branch.',
  },

  fiji_stayed_on: {
    weight: 'moderate',
    category: 'identity',
    description: 'Chose to remain in Fiji despite the emigration wave — part of what was left; watched others leave for years.',
    intent: 'none',
    notes: 'Set by fj_emigration second choice. Referenced in fj_late_life stayed branch prose.',
  },

  fiji_2000_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Was adult during the Speight coup of 2000 — 56 days of George Speight holding parliament and a prime minister hostage.',
    intent: 'none',
    notes: 'Set by fj_2000_coup. Contextual historical marker; contributing weight to fj_late_life.',
  },

  // ── WATER / INFRASTRUCTURE ARC ───────────────────────────────────────────────
  // Note: water_walk_childhood is set by events_rural_texture.js (rural_water_walk).
  // These flags cover the downstream/extended layer.

  drought_childhood: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up with annual dry-season water scarcity — the hierarchy of thirst, going to sleep still thirsty.',
    intent: 'none',
    notes: 'Set by wi_dry_season. Contextual marker for rural water hardship.',
  },

  village_electrified: {
    weight: 'major',
    category: 'historical',
    description: 'The village got electricity during childhood or adolescence — one of the largest single quality-of-life changes in a person\'s life.',
    intent: 'none',
    notes: 'Set by wi_electrification or rural_texture electrification events. Guards against re-electrification events.',
  },

  community_organiser: {
    weight: 'moderate',
    category: 'social',
    description: 'Took on a community leadership role — the pump committee, the neighbourhood meeting, the person who agreed to decide.',
    intent: 'none',
    notes: 'Set by wi_pump_committee first choice, and other community organizing events.',
  },

  water_war_generation: {
    weight: 'major',
    category: 'political',
    description: 'Experienced the Cochabamba Water War 2000 — the uprising that reversed the privatization of the city\'s water supply.',
    intent: 'none',
    notes: 'Set by wi_cochabamba_water_war protest choice.',
  },

  // ── BONDED LABOR ARC ─────────────────────────────────────────────────────────

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

  bonded_labor_freed: {
    weight: 'major',
    category: 'economic',
    description: 'Received a certificate of release from bonded labor — the debt cancelled, the paper real, the daily navigation of the former owner\'s presence ongoing.',
    intent: 'none',
    notes: 'Set by bl_liberation (both choices). The freedom that comes with a particular kind of exposure.',
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

  // ── SEX WORK ARC (BUILD 33) ──────────────────────────────────────────────────

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

  sw_regular_client_known: {
    weight: 'minor',
    category: 'relationship',
    description: 'Had a regular client — the version that is almost kind, which creates its own particular accounting.',
    intent: 'none',
    notes: 'Set by sw_regular_client.',
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

  // ── HIGH-CONTROL RELIGION / CULT ARC (BUILD 24) ─────────────────────────────

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

  // ── FOLLOWTHROUGH_27: WEALTH SYSTEM + ZIMBABWE + SOUTH AFRICA ───────────────

  moneylender_debt_cleared: {
    weight: 'moderate',
    category: 'economic',
    description: 'Paid off the moneylender debt — years of reduced margin, then one season without the payment above everything.',
    intent: 'none',
    notes: 'Set by ft27_moneylender_ongoing first choice.',
  },

  // ── SAMI ARC (NORWAY / SWEDEN) ───────────────────────────────────────────────

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

  // ── AMAZONIAN INDIGENOUS ARC (BRAZIL / PERU / COLOMBIA) ─────────────────────

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

  // ── FGM ARC: FEMALE GENITAL CUTTING ──────────────────────────────────────────

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

  // ─── LOCAL SIGNIFICANCE ARC (BUILD 30) ───────────────────────────────────────

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

  community_healer: {
    weight: 'moderate',
    category: 'community',
    description: 'Became the de facto medical resource for a rural community without clinic access — absorbing the gap between what the state provides and what people need.',
    intent: 'year_texture',
    notes: 'Set by loc_village_healer. Fires in developing/subsaharan/conflict archetypes, rural characters.',
  },

  local_advocate: {
    weight: 'minor',
    category: 'political',
    description: 'Wrote letters, attended meetings, and pushed formal channels to bring resources to their community — without receiving or expecting credit.',
    intent: 'none',
    notes: 'Set by loc_village_healer advocate choice.',
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

  // ─── 2010s TEXTURE ─────────────────────────────────────────────────────────

  gig_worker: {
    weight: 'moderate',
    category: 'economic',
    description: 'Worked in the platform/gig economy — Uber, Deliveroo, TaskRabbit, or equivalent — with flexibility as the primary benefit and instability as the structural cost.',
    intent: 'followthrough',
    notes: 'Set by dec10_gig_work. Follow-through at midlife: dec10_gig_echo.',
  },

  always_connected: {
    weight: 'minor',
    category: 'technology',
    description: 'Experienced the decade of ubiquitous smartphone connectivity — the phone at the table, the half-lit screen, the permanent availability of interruption.',
    intent: 'year_texture',
    notes: 'Set by dec10_always_connected.',
  },

  climate_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Came of age during the 2015–2022 climate mobilisation — Greta Thunberg, school strikes, IPCC reports — with climate grief as a formative part of adolescence.',
    intent: 'followthrough',
    notes: 'Set by dec10_climate_grief_young.',
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
    intent: 'followthrough',
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

  karen_displaced: {
    weight: 'moderate',
    category: 'displacement',
    description: 'A Karen person was displaced by the Myanmar military offensive — fled to Mae La camp or the Thai border, now in refugee status.',
    intent: 'followthrough',
    notes: 'Set by sl_karen_displacement. Follow-through: sl_karen_camp_years fires at adolescence.',
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

  igbo_fled_north: {
    weight: 'moderate',
    category: 'displacement',
    description: 'An Igbo person fled the north after the 1966 pogroms — part of the mass return of Igbos to the Eastern Region before the Biafra War.',
    intent: 'none',
    notes: 'Set by sl_igbo_after_66.',
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

  dhaka_garment_worked: {
    weight: 'moderate',
    category: 'labour',
    description: 'Worked in the Dhaka garment industry — the factory floors, the quota systems, the twelve-hour days, the economic lifeline of Bangladesh.',
    intent: 'followthrough',
    notes: 'Set by sl_dhaka_garment. Follow-through: sl_rana_plaza_aftermath fires 2013-2017.',
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

  aids_generation_witness: {
    weight: 'moderate',
    category: 'grief',
    description: 'Part of the generation that witnessed the AIDS epidemic as a community catastrophe — the funerals, the silence, the improvised care infrastructure.',
    intent: 'year_texture',
    notes: 'Set by sl_us_aids_gen. Distinct from AIDS personal diagnosis.',
  },

  industry_lost: {
    weight: 'moderate',
    category: 'economic',
    description: 'Lost their occupation or livelihood to deindustrialisation — the letter, the closure, the identity built around a trade that no longer exists.',
    intent: 'year_texture',
    notes: 'Set by sl_coal_miner_pit_closure and similar industrial closure events.',
  },

  childhood_disability: {
    weight: 'moderate',
    category: 'health',
    description: 'Acquired or lived with a significant disability from childhood — the architecture of education and public life built around what they could not do.',
    intent: 'year_texture',
    notes: 'Set by sl_polio_survivor_1950s. Distinct from born_with_disability (acquired) and born_deaf.',
  },

  intergenerational_trauma: {
    weight: 'moderate',
    category: 'identity',
    description: 'Carries the trauma of a historical atrocity through family silence — the things not in the album, the dates that make the room go still.',
    intent: 'year_texture',
    notes: 'Set by sl_second_gen_holocaust, sl_hiroshima_second_gen. Cross-generational historical wound.',
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

  market_woman: {
    weight: 'minor',
    category: 'labour',
    description: 'Runs a market stall or trading post as the primary economic unit — the informal sector management that underpins urban economies across the developing world.',
    intent: 'none',
    notes: 'Set by sl_nigeria_market_woman.',
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

  welfare_state_beneficiary: {
    weight: 'minor',
    category: 'economic',
    description: 'Directly benefited from a universal welfare system at a formative moment — NHS birth, free university, housing benefit — in a way that would not have been possible without the state.',
    intent: 'none',
    notes: 'Set by sl_uk_nhs_birth.',
  },

  refugee_camp_years: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Spent years in a refugee camp — the temporary status that becomes semi-permanent, the determination process, the category that cannot contain the full person.',
    intent: 'year_texture',
    notes: 'Set by sl_vietnamese_boat_arrival. Cross-cutting long-term camp experience.',
  },

  bracero_generation: {
    weight: 'minor',
    category: 'labour',
    description: 'Part of the US Bracero Program or similar bilateral guest-worker contracts — the temporary migration that sustained remittance economies across borders.',
    intent: 'none',
    notes: 'Set by sl_mexican_bracero.',
  },

  second_country_rooted: {
    weight: 'moderate',
    category: 'identity',
    description: 'Put down roots in a country they arrived in as a temporary worker — the permanent life built inside a temporary legal status.',
    intent: 'year_texture',
    notes: 'Set by sl_german_gastarbeiter_stayed. Cross-cutting migrant settler experience.',
  },

  colonial_education: {
    weight: 'moderate',
    category: 'education',
    description: 'Educated in a colonial institution — the missionary school, the colonial syllabus, the history taught against itself.',
    intent: 'year_texture',
    notes: 'Set by sl_missionary_school_africa.',
  },

  iit_graduate: {
    weight: 'minor',
    category: 'achievement',
    description: 'Graduated from an IIT or equivalent elite technical institution after the grinding preparation of JEE coaching culture.',
    intent: 'none',
    notes: 'Set by sl_india_iit_pressure (commit branch).',
  },

  informer_stasi: {
    weight: 'major',
    category: 'moral',
    description: 'Served as an unofficial informant for the Stasi or equivalent surveillance apparatus — the files that exist, the comrades reported, the complicity that was not called by that name at the time.',
    intent: 'event',
    notes: 'Set by sl_east_germany_stasi_informer. Follow-through: sl_stasi_file_opened fires at late_life.',
  },

  hukou_urban_migrant: {
    weight: 'moderate',
    category: 'displacement',
    description: 'A Chinese internal migrant living in a city without urban hukou — the floating population, the child whose schooling is not guaranteed, the labour without the rights.',
    intent: 'year_texture',
    notes: 'Set by sl_china_hukou_city.',
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

  examined_politics: {
    weight: 'minor',
    category: 'political',
    description: 'Explicitly reckoned with how and why their political views changed over a lifetime — distinguishing genuine wisdom from the comfort of accommodation.',
    intent: 'none',
    notes: 'Set by sl_late_political_reckoning.',
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

  hiv_positive_managed: {
    weight: 'moderate',
    category: 'health',
    description: 'Living with HIV on antiretroviral treatment — the virus suppressed, the management ongoing, the window of the pharmaceutical negotiation still visible in retrospect.',
    intent: 'year_texture',
    notes: 'Set by sl_hiv_africa_treatment. Pairs with hiv_managed condition.',
  },

  beauty_capital_used: {
    weight: 'minor',
    category: 'identity',
    description: 'Experienced their physical appearance as a resource managed by others — the pageant, the nomination, the usefulness to people around them that took years to process.',
    intent: 'none',
    notes: 'Set by sl_philippines_beauty_pageant.',
  },

  domestic_worker: {
    weight: 'moderate',
    category: 'labour',
    description: 'Worked as a live-in domestic worker — the maid\'s room off the kitchen, the Sunday noon day off, the legal protections on paper that do not reliably reach the kitchen.',
    intent: 'year_texture',
    notes: 'Set by sl_latin_america_maid. Cross-cutting developing_urban female experience.',
  },

  // ── Batch 6 flags ─────────────────────────────────────────────────────────

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

  exile_generation_tibetan: {
    weight: 'moderate',
    category: 'displacement',
    description: 'A Tibetan born in exile — knows the geography of a country never seen, oriented toward a return the adults around them have awaited for decades without it arriving.',
    intent: 'year_texture',
    notes: 'Set by sl_tibetan_dharamsala_childhood.',
  },

  witnessed_extreme_witness: {
    weight: 'moderate',
    category: 'grief',
    description: 'Received news of self-immolation or comparable extreme political witness — the information carried through a diaspora network with no adequate frame for it.',
    intent: 'none',
    notes: 'Set by sl_tibetan_self_immolation_witness.',
  },

  bengal_partition_displaced: {
    weight: 'major',
    category: 'displacement',
    description: 'Displaced by the Bengal Partition of 1947 — the line drawn in London through rice fields and market towns, the village now on the wrong side, the district that never quite becomes home.',
    intent: 'year_texture',
    notes: 'Set by sl_bengal_partition_hindu.',
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

  artisanal_miner: {
    weight: 'moderate',
    category: 'labour',
    description: 'Works artisanal mining — the hand and the sack and the absence of protective equipment, the one to three dollars a day, the company that sells the mineral that is not called artisanal.',
    intent: 'year_texture',
    notes: 'Set by sl_drc_cobalt_miner.',
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

  brain_drain_participant: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Left a country in crisis to practice elsewhere — the brain drain statistic, the remittances sent home, the work done well in a hospital that has supplies.',
    intent: 'none',
    notes: 'Set by sl_greek_crisis_doctor_leaves (leave branch).',
  },

  stayed_through_crisis: {
    weight: 'moderate',
    category: 'resilience',
    description: 'Chose to stay and work through a national crisis rather than emigrating — the workarounds, the deficit management, the gratitude of patients, the system still broken, both things true.',
    intent: 'none',
    notes: 'Set by sl_greek_crisis_doctor_leaves (stay branch).',
  },

  generation_rent: {
    weight: 'moderate',
    category: 'economic',
    description: 'Part of the UK generation rent — earns adequately, cannot buy, pays rent higher than a mortgage payment for the same property, has done the arithmetic and found it both clarifying and enraging.',
    intent: 'year_texture',
    notes: 'Set by sl_uk_generation_rent.',
  },

  // ── Batch 7 flags ─────────────────────────────────────────────────────────

  cold_war_childhood: {
    weight: 'moderate',
    category: 'identity',
    description: 'Grew up with duck-and-cover drills — the wooden desk, the gap between danger described and protection offered, the adults who were frightened but could not say so.',
    intent: 'year_texture',
    notes: 'Set by sl_us_nuclear_family_1950s.',
  },

  exile_community_network: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Found and joined the exile community abroad — the Chileans in Stockholm, the Iranians in Paris, the Cubans in Miami. A community assembled from a shared shape of absence rather than a shared origin.',
    intent: 'year_texture',
    notes: 'Set by sl_chile_exile_europe.',
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

  issei_generation: {
    weight: 'moderate',
    category: 'displacement',
    description: 'First-generation Japanese immigrant to the United States — the plantation labour contract, the ethnic barracks, the already-named categories (issei, nisei) waiting to receive them.',
    intent: 'year_texture',
    notes: 'Set by sl_japanese_hawaii_issei.',
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

  caribbean_diaspora: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Caribbean graduate who emigrated via scholarship — the departure as the legible shape of achievement on a small island, the remittances sent, the carnival visits, the country of origin and the city of residence.',
    intent: 'year_texture',
    notes: 'Set by sl_small_island_brain_drain (leave branch).',
  },

  stayed_to_build: {
    weight: 'moderate',
    category: 'resilience',
    description: 'Chose to stay in a small island or peripheral place when emigration was the available achievement — the achievement of staying is real and not always legible as achievement to those who left.',
    intent: 'year_texture',
    notes: 'Set by sl_small_island_brain_drain (stay branch).',
  },

  // ── Batch 8 flags ─────────────────────────────────────────────────────────

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

  gacaca_witness: {
    weight: 'major',
    category: 'grief',
    description: 'Sat in a gacaca community court listening to a perpetrator confess the detail of what they did to someone you knew — the state\'s version of justice in open air, and not yet knowing if it is better or worse than not knowing.',
    intent: 'year_texture',
    notes: 'Set by sl_rwanda_gacaca_witness.',
  },

  climate_refugee: {
    weight: 'major',
    category: 'displacement',
    description: 'Left a Pacific island due to rising seas and climate-driven uninhabitability — the taro gardens flooded, the cemetery flooding, the migration arrangements negotiated while the emissions continue.',
    intent: 'year_texture',
    notes: 'Set by sl_pacific_climate_rising_sea (leave branch).',
  },

  climate_displaced_stayed: {
    weight: 'moderate',
    category: 'identity',
    description: 'Chose to stay on a climate-threatened island despite rising seas — the staying as witness, the grief of watching the tides, the decision that will likely be made again.',
    intent: 'year_texture',
    notes: 'Set by sl_pacific_climate_rising_sea (stay branch).',
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

  forced_sedentarisation: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Settled into a council house by policy decision — the locked door unfamiliar, the trailer in the garden, the house as a solution to a problem they were not asked to define.',
    intent: 'year_texture',
    notes: 'Set by sl_irish_traveller_sedentarisation.',
  },

  tsunami_survivor: {
    weight: 'major',
    category: 'grief',
    description: 'Survived the 2004 Indian Ocean tsunami — the specific morning, the specific house, the specific absence of the specific people who were in it; the number that is so large it becomes a number before you finish counting.',
    intent: 'event',
    notes: 'Set by sl_aceh_tsunami_2004. Follow-through: sl_aceh_tsunami_reconstruction.',
  },

  // ── Batch 9 flags ─────────────────────────────────────────────────────────

  hmong_resettlement: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Hmong refugee resettled in Minnesota via Lutheran social services — the Secret War that was secret, Ban Vinai camp, January in Minneapolis at fifteen below zero, the snow nothing like anything in Laos.',
    intent: 'year_texture',
    notes: 'Set by sl_hmong_refugee_minnesota.',
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

  transmigrant_family: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Javanese family moved to outer islands under Indonesian transmigration programme — the two hectares, the wooden house, the soil different from Java, the indigenous community that did not agree to the programme.',
    intent: 'year_texture',
    notes: 'Set by sl_indonesia_transmigrant.',
  },

  dzud_survivor: {
    weight: 'moderate',
    category: 'identity',
    description: 'Mongolian herder who survived a major dzud — the winter that killed a quarter of the national herd, the emergency fodder arriving in March, the count after the thaw a different number.',
    intent: 'year_texture',
    notes: 'Set by sl_mongolia_dzud_winter.',
  },

}
