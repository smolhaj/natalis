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
    notes: 'Set by alg_late_reckoning (auto-resolve, late_life).',
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

}
