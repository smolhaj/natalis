// ─── After ────────────────────────────────────────────────────────────────────
// Follow-through for the prison layer. Written alongside the events that set
// these flags, not after them: a sentence that leaves no trace in the decades
// that follow is just a plot point. What prison actually does to a life is
// mostly what it does afterwards.
//
// events_postrelease.js already covers the institutional aftermath — the job
// checkbox, the housing bar, parole, the recidivism trap. These are the private
// residues: what the years inside left in the body, the habits, the silences.

export const PRISON_AFTER_EVENTS = [
  {
    id: 'pra_counting_habit',
    phase: null,
    weight: 4,
    when: (G) => !G.inPrison && G.flags.has('learned_prison_time') && G.age >= 25 &&
      (G.currentYear - (G.mem?.releasedYear ?? G.currentYear)) >= 2 && !G.mem?.praCounting,
    text: 'You still measure time in deliveries. The bins go out, the wage lands, a particular programme is on. Someone asks how long you have been at the job and you have to convert it, because the honest answer is in units nobody else uses.',
    choices: null,
    effect: (p) => { p.setMem('praCounting', true) },
  },
  {
    id: 'pra_doors',
    phase: null,
    weight: 4,
    when: (G) => !G.inPrison && (G.flags.has('long_sentence_served') || G.flags.has('prison_last_night')) &&
      G.age >= 25 && !G.mem?.praDoors,
    text: 'You have not stopped listening for doors. Not consciously — it is more that a certain kind of metal sound arrives already meaning something, and it takes a full second to be reassigned to a filing cabinet, a car, a gate on the street.',
    choices: null,
    effect: (p) => { p.m -= 3; p.setMem('praDoors', true) },
  },
  {
    id: 'pra_the_two_men',
    phase: null,
    weight: 4,
    when: (G) => !G.inPrison && G.flags.has('prison_friendship') && G.age >= 30 && !G.mem?.praTwoMen,
    text: 'You think about the two men from the yard more than you expected to. You never had their addresses. You do not know whether they got out, or when, or what they went back to. They are among the small number of people who saw you in that specific year, and you cannot reach any of them.',
    choices: null,
    effect: (p) => { p.m -= 4; p.setMem('praTwoMen', true); p.addFlag('unreachable_friendship') },
  },
  {
    id: 'pra_certificate',
    phase: null,
    weight: 5,
    when: (G) => !G.inPrison && G.flags.has('prison_education') && G.age >= 25 && !G.mem?.praCertificate,
    text: 'The certificate is in the folder with the other documents. You do not put it on applications, because the dates invite a question. But you know what you learned and where you learned it, and there is a version of that knowledge that nobody can take back off you.',
    choices: [
      { text: 'Build on it.', outcome: 'You take the next course. This one has no wing, no Tuesdays, no plastic chairs.', effect: (p) => { p.e += 6; p.m += 6; p.setMem('praCertificate', true); p.addFlag('education_continued') } },
      { text: 'Leave it in the folder.', outcome: 'It stays where it is. You know it is there.', effect: (p) => { p.m += 2; p.setMem('praCertificate', true) } },
    ],
    effect: null,
  },
  {
    id: 'pra_name_you_gave',
    phase: null,
    weight: 6,
    when: (G) => !G.inPrison && G.flags.has('informed_on_someone') && G.age >= 25 && !G.mem?.praNameGave,
    text: 'You hear one of the names again, years later, attached to a fact — a town, a job, a death. You had made the name into an abstraction in order to keep living, and it does not stay abstract. It takes about four seconds to become a person again.',
    choices: null,
    effect: (p) => { p.m -= 9; p.r += 10; p.setMem('praNameGave', true) },
  },
  {
    id: 'pra_held_the_line_late',
    phase: 'late_life',
    weight: 5,
    when: (G) => !G.inPrison && G.flags.has('held_the_line') && G.age >= 55 && !G.mem?.praHeld,
    text: 'Nobody knows about it. There is no record, because the whole point was that nothing was recorded. It is the thing you are most certain of about yourself and the thing you will never be able to demonstrate, and at some point you stopped needing to.',
    choices: null,
    effect: (p) => { p.m += 8; p.karma += 4; p.setMem('praHeld', true); p.addFlag('quiet_integrity') },
  },
  {
    id: 'pra_recruited_pull',
    phase: null,
    weight: 5,
    when: (G) => !G.inPrison && G.flags.has('prison_recruited') && G.age >= 22 && !G.mem?.praRecruitedPull,
    text: 'The arrangement did not end at the gate. A number you did not ask for, a favour that was never framed as a debt, a man who greets you warmly in a shop. You understand that leaving would require a decision, and that you have not made it.',
    choices: [
      { text: 'Cut it off.', outcome: 'It costs you money and a year of looking over your shoulder. Then it is over.', effect: (p) => { p.mo -= 3000; p.m -= 5; p.karma += 8; p.setMem('praRecruitedPull', true); p.addFlag('left_the_life') } },
      { text: 'Stay in it.', outcome: 'It is easier. It stays easier for a while.', effect: (p) => { p.mo += 6000; p.karma -= 6; p.setMem('praRecruitedPull', true); p.addFlag('criminal_life') } },
    ],
    effect: null,
  },
  {
    id: 'pra_refused_and_poor',
    phase: null,
    weight: 4,
    when: (G) => !G.inPrison && G.flags.has('prison_refused_recruitment') && G.age >= 25 && !G.mem?.praRefused,
    text: 'You see what the men who took the work are driving. You made the other choice and the other choice has been expensive, and there is a specific evening — a bill, a phone call, a fridge — when you do the arithmetic on it honestly.',
    choices: null,
    effect: (p) => { p.m -= 5; p.karma += 3; p.setMem('praRefused', true) },
  },
  {
    id: 'pra_forgotten_reunion',
    phase: null,
    weight: 5,
    when: (G) => !G.inPrison && G.flags.has('prison_forgotten') && G.age >= 25 && !G.mem?.praForgotten,
    text: 'You are in the same room as them again and everyone behaves well. The visits that stopped are not raised. You had four years to build the sentence you would say about it, and in the event you say nothing, because the room has decided the subject is closed.',
    choices: [
      { text: 'Let it stay closed.', outcome: 'It stays closed. It also stays.', effect: (p) => { p.m -= 4; p.setMem('praForgotten', true); p.addFlag('unspoken_between_us') } },
      { text: 'Say it anyway.', outcome: 'It goes badly for an hour and better afterwards.', effect: (p) => { p.m += 5; p.setMem('praForgotten', true); p.addFlag('said_the_thing') } },
    ],
    effect: null,
  },
  {
    id: 'pra_political_after',
    phase: null,
    weight: 5,
    when: (G) => !G.inPrison && G.flags.has('prison_political_education') && G.age >= 25 && !G.mem?.praPolitical,
    text: 'The men from that corridor turn up in your life at intervals — a byline, a funeral notice, a voice on a broadcast from somewhere else. Whatever the state thought it was doing by putting you all in one building, it did the opposite of it.',
    choices: null,
    effect: (p) => { p.e += 4; p.m += 3; p.setMem('praPolitical', true); p.addFlag('political_network') },
  },
  {
    id: 'pra_body_after',
    phase: null,
    weight: 4,
    when: (G) => !G.inPrison && G.flags.has('prison_untreated') && G.age >= 35 && !G.mem?.praBody,
    text: 'A doctor asks how long it has been like this and you give a year that surprises her. She asks why you did not come sooner. There is a real answer involving a form and a photocopied sheet, and it is not an answer that fits in the appointment.',
    choices: null,
    effect: (p) => { p.h -= 5; p.setMem('praBody', true); p.addCondition('chronic_pain', 'moderate') },
  },
  {
    id: 'pra_violence_carried',
    phase: null,
    weight: 4,
    when: (G) => !G.inPrison && G.flags.has('witnessed_violence') && G.age >= 25 && !G.mem?.praViolence,
    text: 'Something happens in a car park or a bar — nothing, really, a raised voice — and you are already moving, already reading exits, already holding your body at the angle. It passes. You are quiet for the rest of the evening and the people with you assume you are tired.',
    choices: null,
    effect: (p) => { p.m -= 5; p.setMem('praViolence', true) },
  },
  {
    id: 'pra_the_gap_on_the_form',
    phase: null,
    weight: 5,
    when: (G) => !G.inPrison && G.criminalRecord?.length > 0 && G.age >= 25 && G.flags.has('prison_last_night') && !G.mem?.praGap,
    text: 'Every form has the years on it and the years have a hole in them. You have three versions of how to explain the hole: the honest one, the short one, and the one that changes the subject. You have got good at knowing which room wants which.',
    choices: null,
    effect: (p) => { p.s += 3; p.m -= 4; p.setMem('praGap', true); p.addFlag('practised_explanation') },
  },
  {
    id: 'pra_late_reckoning',
    phase: 'late_life',
    weight: 6,
    when: (G) => !G.inPrison && (G.flags.has('long_sentence_served') || G.flags.has('prison_last_night')) &&
      G.age >= 60 && !G.mem?.praReckoning,
    text: 'From here the sentence is a section rather than the whole book, which is not how it felt at the time and not how it felt for a long time after. You can hold both facts now: that those years were taken, and that the years since have been more numerous. Whether that is consolation or just arithmetic is a question you have stopped putting to yourself.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('praReckoning', true); p.addFlag('sentence_in_proportion') },
  },
  {
    id: 'pra_child_learns',
    phase: null,
    weight: 5,
    when: (G) => !G.inPrison && G.children?.length > 0 && G.flags.has('prison_last_night') &&
      G.children.some(c => (c.age ?? 0) >= 11) && !G.mem?.praChildLearns,
    text: 'They find out from someone who is not you. You can tell from the way the question arrives — too casual, rehearsed on the way home. What they want to know is not the offence. What they want to know is whether it is the kind of thing that is in them too.',
    choices: [
      { text: 'Tell them everything.', outcome: 'It takes two hours. They are older afterwards and so are you.', effect: (p) => { p.m += 4; p.updateChildRel(0, 8); p.setMem('praChildLearns', true); p.addFlag('told_child_truth') } },
      { text: 'Give them the short version.', outcome: 'They accept it. They will ask again in about ten years.', effect: (p) => { p.m -= 3; p.setMem('praChildLearns', true); p.addFlag('short_version_given') } },
    ],
    effect: null,
  },
  {
    id: 'pra_performed_remorse_after',
    phase: null,
    weight: 4,
    when: (G) => !G.inPrison && G.flags.has('prison_performed_remorse') && G.age >= 25 && !G.mem?.praPerformed,
    text: 'You learned in that room that the right words, delivered in the right order, move institutions. It is a genuinely useful skill and you have used it since — with a landlord, with a manager, once with a doctor. You are not entirely comfortable about how well it works.',
    choices: null,
    effect: (p) => { p.s += 4; p.r += 3; p.setMem('praPerformed', true) },
  },
]
