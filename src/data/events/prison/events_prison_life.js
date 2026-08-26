// ─── Prison ───────────────────────────────────────────────────────────────────
// getNextEvent filters the in-prison pool to events declaring `prisonOk: true`.
// No event in the game declared it, so a prison sentence — often the most
// consequential stretch of a life — produced one line a year: "Another year
// behind bars." These are the years themselves.
//
// Phase is null throughout: incarceration reaches adolescents and the elderly
// alike, and each guard carries its own age range.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

const HARSH_REGIMES = new Set([
  'military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy', 'absolute_monarchy',
])

export const PRISON_EVENTS = [
  {
    id: 'pr_first_week',
    phase: null,
    prisonOk: true,
    weight: 9,
    when: (G) => G.inPrison && !G.mem?.prisonFirstWeek,
    text: () => pick([
      'The first week is mostly noise. Doors that are louder than doors need to be, a television nobody is watching, someone two cells down who talks all night to a person who is not there. You learn the schedule faster than you expected. The body adjusts before the rest of you does.',
      'You are given a number and a bedroll and a laminated sheet of rules. The sheet has been photocopied so many times the last lines are illegible. Nobody explains what happens if you break the illegible ones. You fold it and put it under the mattress anyway.',
    ]),
    choices: [
      { text: 'Keep your head down.', tag: 'prison_quiet', outcome: 'You become difficult to notice. It works.', effect: (p) => { p.m -= 3; p.setMem('prisonFirstWeek', true); p.addFlag('prison_quiet') } },
      { text: 'Work out who runs the wing.', tag: 'prison_reads_room', outcome: 'You learn the shape of it within a fortnight. Knowing is not the same as being safe, but it is not nothing.', effect: (p) => { p.s += 3; p.m -= 4; p.setMem('prisonFirstWeek', true); p.addFlag('prison_connected') } },
    ],
    effect: null,
  },
  {
    id: 'pr_visit_that_comes',
    phase: null,
    prisonOk: true,
    weight: 6,
    when: (G) => G.inPrison && G.age >= 18 && (G.partner || G.parents?.mother?.alive || G.parents?.father?.alive) && !G.mem?.prisonVisit,
    text: 'The visit is thirty minutes and there is a table between you bolted to the floor. You had things you meant to say. What you talk about instead is a leaking tap at the house, and whether it was fixed, and who fixed it. At the end you both stand at the same time and neither of you knows what to do with your hands.',
    choices: [
      { text: 'Ask them to keep coming.', outcome: 'They say yes. They mean it when they say it.', effect: (p) => { p.m += 6; p.setMem('prisonVisit', true); p.updatePartnerRel(4) } },
      { text: 'Tell them not to come again.', outcome: 'You tell yourself it is a kindness. It is partly a kindness.', effect: (p) => { p.m -= 8; p.r += 5; p.setMem('prisonVisit', true); p.addFlag('prison_cut_off') } },
    ],
    effect: null,
  },
  {
    id: 'pr_visit_that_stops',
    phase: null,
    prisonOk: true,
    weight: 5,
    when: (G) => G.inPrison && G.age >= 18 && G.prisonSentence >= 2 && G.mem?.prisonVisit && !G.mem?.prisonVisitStopped,
    text: 'The visits get further apart in a way nobody announces. Every second month, then the month that is missed and explained, then the month that is missed and not mentioned. You do not ask about it on the phone. Asking would make it a fact.',
    choices: null,
    effect: (p) => { p.m -= 7; p.setMem('prisonVisitStopped', true); p.addFlag('prison_forgotten') },
  },
  {
    id: 'pr_letter_out',
    phase: null,
    prisonOk: true,
    weight: 6,
    when: (G) => G.inPrison && G.age >= 16 && !G.mem?.prisonLetter,
    text: (G) => G.flags?.includes('illiterate')
      ? 'You pay a man on the wing in cigarettes to write it for you. You say the words out loud and he puts them down, and the words come out slightly different on the page — flatter, more formal, someone else\'s. You send it anyway. It is still the only way your voice gets out.'
      : 'You write it at the small desk, in the hour when the wing is quietest. You cross out the first two attempts because they sound like a man performing calm. The third one just says what the days are like. That is the one you send.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('prisonLetter', true) },
  },
  {
    id: 'pr_the_yard',
    phase: null,
    prisonOk: true,
    weight: 7,
    when: (G) => G.inPrison && G.age >= 16 && !G.mem?.prisonYard,
    text: 'The yard is a rectangle and everyone walks it the same direction. You have started walking with two men whose names you know and whose crimes you have not asked about. They have not asked about yours. This is the closest thing to a friendship the place allows, and it is more than nothing.',
    choices: [
      { text: 'Keep the arrangement.', outcome: 'You walk the rectangle together for the rest of it. You will think about them later, at odd moments, for years.', effect: (p) => { p.m += 5; p.s += 2; p.setMem('prisonYard', true); p.addFlag('prison_friendship') } },
      { text: 'Stay separate.', outcome: 'You do the time alone. It is cleaner and it is longer.', effect: (p) => { p.m -= 5; p.setMem('prisonYard', true); p.addFlag('prison_alone') } },
    ],
    effect: null,
  },
  {
    id: 'pr_the_offer',
    phase: null,
    prisonOk: true,
    weight: 5,
    when: (G) => G.inPrison && G.age >= 18 && !G.mem?.prisonOffer,
    text: 'A man who is owed favours by people you have not met explains that there is work available, inside and after. He is not threatening you. He is being genuinely helpful, which is the part that makes it difficult. He says think about it and then does not mention it again, which is its own kind of pressure.',
    choices: [
      { text: 'Take the work.', tag: 'criminal_life', outcome: 'It makes the sentence easier and the years after it harder.', effect: (p) => { p.mo += 2000; p.karma -= 8; p.setMem('prisonOffer', true); p.addFlag('prison_recruited'); p.addFlag('criminal_life') } },
      { text: 'Decline it.', outcome: 'Nothing bad happens. You spend a month waiting for something bad to happen.', effect: (p) => { p.m -= 4; p.karma += 4; p.setMem('prisonOffer', true); p.addFlag('prison_refused_recruitment') } },
    ],
    effect: null,
  },
  {
    id: 'pr_education',
    phase: null,
    prisonOk: true,
    weight: 5,
    when: (G) => G.inPrison && G.age >= 17 && G.prisonSentence >= 2 && !G.mem?.prisonEducation &&
      !['conflict_zone'].includes(G.archetype),
    text: 'There is a class on Tuesdays in a room with a whiteboard and eleven plastic chairs. The teacher comes in from outside and treats the room like a room of people, which is not how the rest of the building treats it. You sign up mostly to have somewhere to be on Tuesdays.',
    choices: [
      { text: 'Take it seriously.', outcome: 'You finish the course. The certificate is a piece of paper and it is also the first thing in years with your name on it that is not a charge sheet.', effect: (p) => { p.e += 8; p.m += 6; p.setMem('prisonEducation', true); p.addFlag('prison_education') } },
      { text: 'Drift out of it.', outcome: 'You stop going in the fourth week. Nobody comes to find out why.', effect: (p) => { p.m -= 3; p.setMem('prisonEducation', true) } },
    ],
    effect: null,
  },
  {
    id: 'pr_political_wing',
    phase: null,
    prisonOk: true,
    weight: 7,
    when: (G) => G.inPrison && G.age >= 17 && HARSH_REGIMES.has(G.regime) &&
      (G.flags?.includes('political_prisoner') || G.flags?.includes('dissident') || G.political_leaning === 'dissident') &&
      !G.mem?.prisonPolitical,
    text: 'The men on this wing are teachers and printers and a man who ran a photocopier. The conversation is better than any you had outside, because everyone here has already paid for having opinions and there is nothing left to be careful about. You learn more in this corridor than you did at school.',
    choices: null,
    effect: (p) => { p.e += 7; p.m += 3; p.addFlag('prison_political_education'); p.setMem('prisonPolitical', true) },
  },
  {
    id: 'pr_interrogation',
    phase: null,
    prisonOk: true,
    weight: 6,
    when: (G) => G.inPrison && G.age >= 16 && HARSH_REGIMES.has(G.regime) && !G.mem?.prisonInterrogation,
    text: 'They want two names. They already have the names — you can tell from how they ask, the way they leave space for you to fill in something they will only be confirming. The room is very ordinary. There is a radiator and a calendar from a fertiliser company.',
    choices: [
      { text: 'Give them the names.', outcome: 'It is over in an hour. It is not over.', effect: (p) => { p.m -= 12; p.r += 18; p.karma -= 10; p.setMem('prisonInterrogation', true); p.addFlag('informed_on_someone') } },
      { text: 'Give them nothing.', outcome: 'They keep you longer. You find out what you are, which most people never do.', effect: (p) => { p.h -= 12; p.m -= 6; p.karma += 8; p.setMem('prisonInterrogation', true); p.addFlag('held_the_line') } },
    ],
    effect: null,
  },
  {
    id: 'pr_illness_inside',
    phase: null,
    prisonOk: true,
    weight: 4,
    when: (G) => G.inPrison && G.age >= 25 && !G.mem?.prisonIllness,
    text: 'Something is wrong and the process for saying so involves a form. You fill in the form. Three weeks later you see a nurse for four minutes and she is kind and has nothing to give you. The thing gets better on its own, or it does not, and either way you learn not to fill in the form again.',
    choices: null,
    effect: (p) => { p.h -= 8; p.m -= 4; p.setMem('prisonIllness', true); p.addFlag('prison_untreated') },
  },
  {
    id: 'pr_news_from_outside',
    phase: null,
    prisonOk: true,
    weight: 6,
    when: (G) => G.inPrison && G.age >= 18 && G.prisonSentence >= 2 && !G.mem?.prisonNewsOutside,
    text: (G) => (G.children?.length ?? 0) > 0
      ? 'Your child has started at a new school, or moved house, or learned to swim. You are told this on a phone with a queue behind you and eleven minutes of credit. You say the right things. You put the phone down and stand there for a second before you turn around, because turning around means going back in.'
      : 'A wedding happened. Somebody died. A street you know has been dug up and re-laid. The outside keeps rearranging itself without consulting you, and you are told about it in fragments, out of order, weeks late.',
    choices: null,
    effect: (p) => { p.m -= 6; p.setMem('prisonNewsOutside', true) },
  },
  {
    id: 'pr_the_count',
    phase: null,
    prisonOk: true,
    weight: 5,
    when: (G) => G.inPrison && G.prisonSentence >= 3 && !G.mem?.prisonCount,
    text: 'You have started counting differently. Not days — days are unusable. You count in things that arrive: the laundry exchange, the Tuesday class, the month the canteen list changes. Time becomes a series of small deliveries and you are surprised how well it works.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('prisonCount', true); p.addFlag('learned_prison_time') },
  },
  {
    id: 'pr_violence',
    phase: null,
    prisonOk: true,
    weight: 4,
    when: (G) => G.inPrison && G.age >= 16 && !G.mem?.prisonViolence,
    text: 'It happens near the servery and it is much quicker than you expect. Afterwards everyone goes back to queuing. You find that you are holding your tray at exactly the same angle you were holding it before, and that nobody is going to mention this again.',
    choices: [
      { text: 'Say nothing to anyone.', outcome: 'You carry it. It stops being an event and becomes a piece of information about the world.', effect: (p) => { p.m -= 8; p.setMem('prisonViolence', true); p.addFlag('witnessed_violence') } },
      { text: 'Report it.', outcome: 'You are moved to another wing for your own protection, which is also a punishment.', effect: (p) => { p.m -= 6; p.karma += 3; p.setMem('prisonViolence', true); p.addFlag('prison_marked') } },
    ],
    effect: null,
  },
  {
    id: 'pr_parole_board',
    phase: null,
    prisonOk: true,
    weight: 7,
    when: (G) => G.inPrison && G.age >= 18 && G.prisonSentence <= 2 && !G.mem?.prisonParole,
    text: 'Three people at a table read a version of your life from a folder and ask whether you agree with it. The version is accurate and it is not you. You have about ten minutes to be a person rather than a file, and the skill of doing that is not one anyone in here has been teaching.',
    choices: [
      { text: 'Say what they want to hear.', outcome: 'It works. You are not proud of how easily it works.', effect: (p) => { p.m += 4; p.r += 3; p.setMem('prisonParole', true); p.addFlag('prison_performed_remorse') } },
      { text: 'Tell them the truth.', outcome: 'The truth is more complicated than the form allows for. They write something down.', effect: (p) => { p.karma += 5; p.setMem('prisonParole', true); p.addFlag('prison_told_truth') } },
    ],
    effect: null,
  },
  {
    id: 'pr_last_night',
    phase: null,
    prisonOk: true,
    weight: 8,
    when: (G) => G.inPrison && G.prisonSentence <= 1 && !G.mem?.prisonLastNight,
    text: 'The last night is the longest one. You have already given away the kettle and the good blanket. You lie there listing what you will do first, and the list keeps collapsing because the things on it are too small to be a plan and too large to be a morning.',
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('prisonLastNight', true); p.addFlag('prison_last_night') },
  },
  {
    id: 'pr_long_sentence_middle',
    phase: null,
    prisonOk: true,
    weight: 5,
    when: (G) => G.inPrison && G.prisonSentence >= 5 && G.age >= 25 && !G.mem?.prisonMiddle,
    text: 'You are somewhere in the middle of it now, which is the part nobody warns you about. The beginning had shock to carry it and the end will have the date. The middle is just the building, indefinitely, and the discovery that you can get used to almost anything and that getting used to it is not the same as being all right.',
    choices: null,
    effect: (p) => { p.m -= 5; p.setMem('prisonMiddle', true); p.addFlag('long_sentence_served') },
  },
]
