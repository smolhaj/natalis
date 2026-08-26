/**
 * PRISON_FLAGS — the incarceration arc.
 *
 * The in-prison event layer (src/data/events/prison/events_prison_life.js) was
 * unreachable before: selection filters the in-prison pool to events declaring
 * `prisonOk: true`, and no event in the game declared it, so a sentence produced
 * one line a year. Every flag below is set by that layer and consumed by
 * events_prison_after.js or events_postrelease.js — the echo was written
 * alongside the stone, per the follow-through-first rule.
 */
export const PRISON_FLAGS = {
  prison_quiet: { weight: 'moderate', category: 'criminal_justice', description: 'Survived the wing by being difficult to notice.', intent: 'year_texture', notes: 'Set by pr_first_week. Consumed by the post-release register.' },
  prison_connected: { weight: 'moderate', category: 'criminal_justice', description: 'Learned who ran the wing, and used that knowledge.', intent: 'year_texture', notes: 'Set by pr_first_week.' },
  prison_cut_off: { weight: 'major', category: 'criminal_justice', description: 'Told the people outside to stop visiting.', intent: 'year_texture', notes: 'Set by pr_visit_that_comes.' },
  prison_forgotten: { weight: 'major', category: 'criminal_justice', description: 'The visits stopped without anyone saying so.', intent: 'event', notes: 'Set by pr_visit_that_stops. Consumed by pra_forgotten_reunion.' },
  prison_friendship: { weight: 'moderate', category: 'criminal_justice', description: 'Walked the yard with the same two men for the length of a sentence.', intent: 'event', notes: 'Set by pr_the_yard. Consumed by pra_the_two_men.' },
  prison_alone: { weight: 'moderate', category: 'criminal_justice', description: 'Did the time without attaching to anyone.', intent: 'year_texture', notes: 'Set by pr_the_yard.' },
  prison_recruited: { weight: 'major', category: 'criminal_justice', description: 'Took work offered inside that continued outside.', intent: 'event', notes: 'Set by pr_the_offer. Consumed by pra_recruited_pull.' },
  prison_refused_recruitment: { weight: 'moderate', category: 'criminal_justice', description: 'Declined the arrangement, and paid for declining it.', intent: 'event', notes: 'Set by pr_the_offer. Consumed by pra_refused_and_poor.' },
  prison_education: { weight: 'major', category: 'education', description: 'Completed a course inside — the first document in years bearing their name that was not a charge sheet.', intent: 'event', notes: 'Set by pr_education. Consumed by pra_certificate.' },
  prison_political_education: { weight: 'major', category: 'political', description: 'Held on a political wing, and educated by the people held with them.', intent: 'event', notes: 'Set by pr_political_wing. Consumed by pra_political_after.' },
  informed_on_someone: { weight: 'major', category: 'moral', description: 'Gave names under interrogation.', intent: 'event', notes: 'Set by pr_interrogation. Consumed by pra_name_you_gave.' },
  held_the_line: { weight: 'major', category: 'moral', description: 'Gave nothing under interrogation, and was kept longer for it.', intent: 'event', notes: 'Set by pr_interrogation. Consumed by pra_held_the_line_late.' },
  prison_untreated: { weight: 'moderate', category: 'health', description: 'Learned that reporting illness inside was not worth the form.', intent: 'event', notes: 'Set by pr_illness_inside. Consumed by pra_body_after.' },
  learned_prison_time: { weight: 'moderate', category: 'psychological', description: 'Stopped counting days and started counting deliveries.', intent: 'event', notes: 'Set by pr_the_count. Consumed by pra_counting_habit.' },
  witnessed_violence: { weight: 'major', category: 'trauma', description: 'Saw it happen near the servery, and watched everyone go back to queuing.', intent: 'event', notes: 'Set by pr_violence. Consumed by pra_violence_carried.' },
  prison_marked: { weight: 'moderate', category: 'criminal_justice', description: 'Reported an incident and was moved for their own protection.', intent: 'year_texture', notes: 'Set by pr_violence.' },
  prison_performed_remorse: { weight: 'moderate', category: 'moral', description: 'Learned that the right words in the right order move institutions.', intent: 'event', notes: 'Set by pr_parole_board. Consumed by pra_performed_remorse_after.' },
  prison_told_truth: { weight: 'moderate', category: 'moral', description: 'Told the parole board something more complicated than the form allowed for.', intent: 'year_texture', notes: 'Set by pr_parole_board.' },
  prison_last_night: { weight: 'major', category: 'criminal_justice', description: 'Served a sentence to its end and lay awake through the last night of it.', intent: 'event', notes: 'Set by pr_last_night. Gates most of the post-release register.' },
  long_sentence_served: { weight: 'major', category: 'criminal_justice', description: 'Passed through the middle of a long sentence — the part with neither shock nor a date to carry it.', intent: 'event', notes: 'Set by pr_long_sentence_middle. Consumed by pra_doors and pra_late_reckoning.' },

  // Downstream residues, set by the after-layer itself.
  unreachable_friendship: { weight: 'moderate', category: 'relationship', description: 'Close to people they can never contact again.', intent: 'year_texture', notes: 'Set by pra_the_two_men.' },
  quiet_integrity: { weight: 'major', category: 'values', description: 'Certain of something about themselves that they can never demonstrate.', intent: 'year_texture', notes: 'Set by pra_held_the_line_late.' },
  left_the_life: { weight: 'major', category: 'criminal_justice', description: 'Cut off the arrangement that followed them out of the gate.', intent: 'year_texture', notes: 'Set by pra_recruited_pull.' },
  unspoken_between_us: { weight: 'moderate', category: 'family', description: 'A subject the family has decided is closed.', intent: 'year_texture', notes: 'Set by pra_forgotten_reunion.' },
  said_the_thing: { weight: 'moderate', category: 'family', description: 'Raised the closed subject anyway.', intent: 'year_texture', notes: 'Set by pra_forgotten_reunion.' },
  political_network: { weight: 'moderate', category: 'political', description: 'Connected, for life, to the people held alongside them.', intent: 'year_texture', notes: 'Set by pra_political_after.' },
  practised_explanation: { weight: 'moderate', category: 'psychological', description: 'Keeps three versions of the gap in the years, and knows which room wants which.', intent: 'year_texture', notes: 'Set by pra_the_gap_on_the_form.' },
  sentence_in_proportion: { weight: 'major', category: 'psychological', description: 'Late in life, able to hold the sentence as a section rather than the whole book.', intent: 'year_texture', notes: 'Set by pra_late_reckoning.' },
  told_child_truth: { weight: 'major', category: 'family', description: 'Told their child the whole of it.', intent: 'year_texture', notes: 'Set by pra_child_learns.' },
  short_version_given: { weight: 'moderate', category: 'family', description: 'Gave the child the short version, knowing they would ask again.', intent: 'year_texture', notes: 'Set by pra_child_learns.' },
  education_continued: { weight: 'moderate', category: 'education', description: 'Carried on studying after release.', intent: 'year_texture', notes: 'Set by pra_certificate.' },
}
