/**
 * FLAG_REGISTRY — master design document for the natalis flag system.
 *
 * Every flag with weight 'major' or 'moderate' should appear here.
 * Pure texture flags (minor details with no narrative follow-through required)
 * can be omitted.
 *
 * Fields:
 *   weight      'major' | 'moderate' | 'minor'
 *   category    'trauma' | 'loss' | 'displacement' | 'identity' | 'achievement' |
 *               'relationship' | 'political' | 'world_event'
 *   description What this flag represents in the character's lived experience.
 *   intent      'event' | 'year_texture' | 'both' | 'none'
 *   timestamped true if flag is in TIMESTAMPED_FLAGS (auto-records year set in mem)
 *   notes       Optional — current gaps, pending work, or caveats.
 *
 * Status ('covered' | 'partial' | 'orphaned') is NOT stored here.
 */
export const FLAG_REGISTRY = {

  // ── BUILD 43 — ALGERIAN DÉCENNIE NOIRE ──────────────────────────────────────

  decennie_noire_generation: {
    weight: 'major',
    category: 'world_event',
    description: 'Character lived through the Algerian Black Decade (1992–2002) — the cancelled election, the armed insurgency, the massacres whose attribution was never settled.',
    intent: 'both',
    timestamped: false,
    notes: 'Set by world event algeria_black_decade_begins. Triggers character arc events in events_algeria.js. Follow-throughs: alg_decade_silence, alg_telling_children, alg_late_reckoning.',
  },

  intellectual_target: {
    weight: 'major',
    category: 'trauma',
    description: 'Character was threatened or targeted because of their intellectual or creative work during the Black Decade.',
    intent: 'event',
    timestamped: false,
    notes: 'Set by alg_journalist_target. Character events for journalists, writers, academics. Follow-through via existing arts and censored_work flags.',
  },

  algeria_exile: {
    weight: 'major',
    category: 'displacement',
    description: 'Character fled Algeria during the Black Decade and lived in exile, most commonly in France.',
    intent: 'both',
    timestamped: true,
    notes: 'Set by alg_journalist_target (leave path) and alg_the_list (leave path). Follow-through via alg_exile_return event.',
  },

  algeria_returned: {
    weight: 'moderate',
    category: 'displacement',
    description: 'Character who fled Algeria during the Black Decade chose to return after violence subsided.',
    intent: 'event',
    timestamped: false,
    notes: 'Set by alg_exile_return (return choice). Ribbon: the_exile_return.',
  },

  knew_the_truth: {
    weight: 'major',
    category: 'political',
    description: 'Character knows — or believes — that state forces were involved in the Bentalha or Rais massacres and that the official attribution is incomplete.',
    intent: 'both',
    timestamped: false,
    notes: 'Set by alg_massacre_news (say what you think) and alg_concord_vote (spoil ballot). Ribbon: the_knew_the_truth. The ambiguity is deliberate: "knew" does not mean confirmed.',
  },

  decennie_noire_memory: {
    weight: 'moderate',
    category: 'trauma',
    description: 'Character has arrived at a late-life reckoning with the Black Decade — the impunity, the amnesty, the unexamined past.',
    intent: 'year_texture',
    timestamped: false,
    notes: 'Set by alg_late_reckoning (auto-resolve, late_life). Should eventually feed into buildYearTexture() late-life prose paths.',
  },

  // ── EXISTING FLAGS (sample for reference) ───────────────────────────────────

  civil_war_lived: {
    weight: 'major',
    category: 'trauma',
    description: 'Character lived through a civil war as an adult.',
    intent: 'both',
    notes: 'Set by alg_teacher_triangle and others across multiple modules.',
  },

  learned_silence: {
    weight: 'moderate',
    category: 'political',
    description: 'Character has learned not to say certain things — a survival reflex from living under authoritarian or dangerous conditions.',
    intent: 'event',
    notes: 'Set by multiple Algeria events and others. Follow-through in events_followthrough.js.',
  },

  coup_witnessed: {
    weight: 'moderate',
    category: 'political',
    description: 'Character witnessed a military coup or cancellation of democratic process.',
    intent: 'event',
    notes: 'Set by alg_coup_morning. Related to existing coup-witness flags in country arcs.',
  },

}
