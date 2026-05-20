const NEGATIVE_FLAGS = new Set([
  'gang_past', 'criminal_life', 'war_childhood', 'hunger_childhood', 'anxious_child',
  'early_marriage', 'missed_schooling', 'child_labor', 'left_school_early', 'dropped_out',
  'compromised', 'corruption_exposed', 'refugee', 'displaced', 'reluctant_parent',
  'divorced', 'learned_silence', 'guarded_heart', 'smoker', 'heavy_drinker', 'child_soldier',
  'gang_member', 'criminal_record', 'abusive_relationship',
])

const POSITIVE_FLAGS = new Set([
  'secure_base', 'determined_student', 'scholarship_won', 'university_graduate',
  'first_gen_graduate', 'integrity', 'trusted_person', 'self_made_woman', 'strong_marriage',
  'found_meaning', 'acceptance', 'grandparent', 'bridge_builder', 'reconciled_with_child',
  'adult_learner', 'committed_activist', 'emotionally_honest', 'cared_for_parents',
  'health_conscious', 'emigrated', 'entrepreneur', 'mentor', 'community_leader',
])

function flagColor(flag) {
  if (NEGATIVE_FLAGS.has(flag)) return 'bg-red-950 text-red-300 border-red-900'
  if (POSITIVE_FLAGS.has(flag)) return 'bg-green-950 text-green-300 border-green-900'
  return 'bg-natalis-surface text-natalis-dim border-natalis-border'
}

function flagLabel(flag) {
  return flag.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

export default function FlagChip({ flag }) {
  return (
    <span className={`inline-block text-xs px-2 py-0.5 border rounded-sm ${flagColor(flag)}`}>
      {flagLabel(flag)}
    </span>
  )
}
