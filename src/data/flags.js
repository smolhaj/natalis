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
    intent: 'event',
    notes: 'events_stayed.js covers this arc.',
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
    notes: 'events_family_silence.js covers this.',
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

  la_violencia_generation: {
    weight: 'major',
    category: 'historical',
    description: 'Lived through La Violencia, Colombia 1948–58 — partisan civil war between Liberals and Conservatives that killed two hundred thousand people.',
    intent: 'year_texture',
    notes: 'Set by la_col_la_violencia character event and colombia_bogotazo_1948 world event. Year texture for older Colombian characters; gates generational memory follow-through.',
  },

  femicidio_generation: {
    weight: 'moderate',
    category: 'identity',
    description: 'Female Mexican character shaped by the ongoing femicide crisis — the arithmetic of what time, which route, who to text when you arrive.',
    intent: 'year_texture',
    notes: 'Set by la_mex_femicidio. Year texture for Mexican women; can surface as persistent background anxiety.',
  },

  paramilitary_era_lived: {
    weight: 'moderate',
    category: 'historical',
    description: 'Lived under or was directly affected by AUC paramilitary operations in Colombia — the false positives, the missing cousin, the arithmetic of speaking.',
    intent: 'year_texture',
    notes: 'Set by la_col_auc_paramilitares. Year texture (state/non-state violence); follow-through for Colombia peace process events.',
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

  // ── ETHIOPIA ───────────────────────────────────────────────────────────────

  eth_red_terror_survived: {
    weight: 'major',
    category: 'conflict',
    description: 'Survived the Derg Red Terror 1977–78 by staying invisible — watching neighbours disappear, learning the calculus of silence under a regime that killed on lists.',
    intent: 'event',
    notes: 'Set by eth_red_terror_1977 (survived branch). Follow-through: eth_red_terror_echo (late_life, when asked about it as history).',
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
    intent: 'none',
    notes: 'Set by zim_exodus_south. Overlaps with emigrated flag which carries the primary diaspora follow-through.',
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
  stayed_when_others_left: {
    weight: 'moderate',
    category: 'identity',
    description: 'Chose to remain in a country or city others fled — transition, conflict, or collapse',
    intent: 'year_texture',
    notes: 'Set by eur_rom_post89_transition (Romania) and potentially other emigration-choice events.',
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
    description: 'Had a second child despite the one-child policy — fines, job consequences, social pressure.',
    intent: 'year_texture',
    notes: 'Set by cn_one_child_decision (have second choice). 1980–2015.',
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
    intent: 'none',
    notes: 'Set by syrian_civil_war world event. Fires for Lebanon/Jordan/Turkey/Iraq characters.',
  },

  refugee_crisis_witness: {
    weight: 'minor',
    category: 'world_event',
    description: 'Wealthy West character who witnessed the 2015 Syrian refugee crisis — the photograph, the debate, the political fracture.',
    intent: 'none',
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

}
