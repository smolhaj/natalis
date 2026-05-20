const NEGATIVE_FLAGS = new Set([
  'gang_past', 'criminal_life', 'war_childhood', 'hunger_childhood', 'anxious_child',
  'early_marriage', 'missed_schooling', 'child_labor', 'left_school_early', 'dropped_out',
  'compromised', 'corruption_exposed', 'refugee', 'displaced', 'reluctant_parent',
  'divorced', 'learned_silence', 'guarded_heart', 'smoker', 'heavy_drinker', 'child_soldier',
  'gang_member', 'criminal_record', 'abusive_relationship', 'alcohol_addiction',
  'gambling_addiction', 'drug_addiction', 'addiction',
])

const POSITIVE_FLAGS = new Set([
  'secure_base', 'determined_student', 'scholarship_won', 'university_graduate',
  'first_gen_graduate', 'integrity', 'trusted_person', 'self_made_woman', 'strong_marriage',
  'found_meaning', 'acceptance', 'grandparent', 'bridge_builder', 'reconciled_with_child',
  'adult_learner', 'committed_activist', 'emotionally_honest', 'cared_for_parents',
  'health_conscious', 'emigrated', 'entrepreneur', 'mentor', 'community_leader',
  'rehab_graduate', 'martial_arts', 'bookworm', 'school_athlete', 'has_close_friend',
  'has_licence', 'pilot_licence', 'boating_licence',
])

function flagStyle(flag) {
  if (NEGATIVE_FLAGS.has(flag)) return { bg: '#fff0ef', text: '#c0392b', border: '#ffcdd2' }
  if (POSITIVE_FLAGS.has(flag)) return { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' }
  return { bg: '#f0f4ff', text: '#1e40af', border: '#bfdbfe' }
}

function flagLabel(flag) {
  return flag.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

export default function FlagChip({ flag }) {
  const s = flagStyle(flag)
  return (
    <span
      className="inline-block text-xs px-2.5 py-1 rounded-full font-semibold border"
      style={{ backgroundColor: s.bg, color: s.text, borderColor: s.border }}
    >
      {flagLabel(flag)}
    </span>
  )
}
