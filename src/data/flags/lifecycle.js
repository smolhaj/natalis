/**
 * LIFECYCLE_FLAGS — flags introduced alongside the lifecycle, specific_lives
 * and followthrough repairs. Each is set by a real triggering event and consumed
 * downstream, per the follow-through-first rule.
 */
export const LIFECYCLE_FLAGS = {
  cared_for_children: { weight: 'major', category: 'family', description: 'Raised a child to adulthood with the relationship intact.', intent: 'event', notes: 'Earned in tick() when a child reaches 18 with relationshipQuality >= 50. Gates late_children_support and late_grandchild_born.' },
  questioning_sexuality: { weight: 'major', category: 'identity', description: 'Recognised something about their own desire, at an age and in a place that decided what it cost.', intent: 'event', notes: 'Set by adol_questioning_recognition. Gates the five era-specific LGBTQ events in specific_lives.' },
  plain_community_born: { weight: 'major', category: 'identity', description: 'Born into a plain Anabaptist community — the Ordnung, the buggy, the decision waiting at the end of adolescence.', intent: 'event', notes: 'Set by sl_plain_community_child (low-probability childhood roll). Gates sl_amish_rumspringa, which previously fired for any rural US Protestant teenager.' },
  haredi_family: { weight: 'major', category: 'religion', description: 'Born into a Haredi household, where the day is organised around study.', intent: 'event', notes: 'Set by sl_hasidic_education. Gates the Haredi arc, which previously fired for any Jewish child.' },
  haredi_learning_path: { weight: 'moderate', category: 'religion', description: 'Stayed on the learning path rather than leaving for secular work.', intent: 'event', notes: 'Set by the Haredi arc.' },
  haredi_enlisted: { weight: 'major', category: 'military', description: 'Enlisted despite the community — a decision with a cost inside the family.', intent: 'event', notes: 'Set by the Israeli conscription branch of the Haredi arc.' },
  left_stable_job: { weight: 'major', category: 'career', description: 'Left something secure without a plan, and found out what that costs.', intent: 'event', notes: 'Set by sl_leave_stable_job; sl_left_job_three_years_on is its three-years-later callback.' },
  learning_was_the_life: { weight: 'moderate', category: 'religion', description: 'Stayed in full-time study long enough that it stopped being a deferment and became the life.', intent: 'year_texture', notes: 'Set by sl_haredi_learning_late.' },
  stayed_and_absorbed_it: { weight: 'moderate', category: 'community', description: 'Stayed in the community that never quite forgave the uniform.', intent: 'year_texture', notes: 'Set by sl_haredi_enlisted_after.' },
  left_the_neighbourhood: { weight: 'moderate', category: 'community', description: 'Moved somewhere nobody knew what the decision had cost.', intent: 'year_texture', notes: 'Set by sl_haredi_enlisted_after.' },
  lottery_winner: { weight: 'major', category: 'economic', description: 'Won a jackpot — money that arrived without being earned, in a life organised around earning.', intent: 'event', notes: 'Set by the lottery activity. Gates the windfall arc in events_windfall.js.' },
  windfall_kept_quiet: { weight: 'moderate', category: 'economic', description: 'Told nobody outside the house.', intent: 'year_texture', notes: 'Set by wf_the_week_after.' },
  windfall_known: { weight: 'major', category: 'economic', description: 'Told everyone, and became the person who won.', intent: 'event', notes: 'Set by wf_the_week_after; gates wf_the_asking.' },
  windfall_gave_it_away: { weight: 'major', category: 'values', description: 'Gave to whoever asked, and watched it go where it was always going.', intent: 'year_texture', notes: 'Set by wf_the_asking.' },
  windfall_became_the_judge: { weight: 'major', category: 'relationship', description: 'Assesses the people closest to him now, a role he did not choose.', intent: 'year_texture', notes: 'Set by wf_the_asking.' },
  windfall_refused: { weight: 'major', category: 'relationship', description: 'Kept it, and lost two people over it.', intent: 'year_texture', notes: 'Set by wf_the_asking.' },
  windfall_work_optional: { weight: 'moderate', category: 'career', description: 'Work became a choice, which made it a different act.', intent: 'year_texture', notes: 'Set by wf_work_question.' },
  windfall_in_proportion: { weight: 'major', category: 'psychological', description: 'Late in life, able to hold the win as one thing that happened rather than the thing that happened.', intent: 'year_texture', notes: 'Set by wf_late_accounting.' },
}
