// ─── Windfall ─────────────────────────────────────────────────────────────────
// Follow-through for the lottery jackpot. The economy agent deliberately left
// the win flagless, because setting a flag with no downstream is a bug by this
// project's own rule — so the stone gets its echo here before the flag is set.
//
// A jackpot is one of the few events that can restructure a life from outside
// it, and the interesting part is never the money. It is that the money arrives
// without being earned, in a life organised around earning.

export const WINDFALL_EVENTS = [
  {
    id: 'wf_the_week_after',
    phase: null,
    weight: 7,
    when: (G) => G.flags.has('lottery_winner') && !G.mem?.wfWeekAfter,
    text: 'The first week is administrative. A form, a bank appointment, a man in a good suit explaining instruments you have no vocabulary for. You had imagined feeling something enormous and instead you feel the specific fatigue of paperwork. The enormous thing arrives later, at three in the morning, and it is not joy exactly.',
    choices: [
      { text: 'Tell nobody outside the house.', tag: 'windfall_private', outcome: 'It stays a secret for about four years, which is longer than most people manage.', effect: (p) => { p.setMem('wfWeekAfter', true); p.addFlag('windfall_kept_quiet'); p.m += 3 } },
      { text: 'Tell everyone. It is good news.', tag: 'windfall_public', outcome: 'It is good news. It is also, from that week onward, the first thing anyone knows about you.', effect: (p) => { p.setMem('wfWeekAfter', true); p.addFlag('windfall_known'); p.m += 6; p.s -= 3 } },
    ],
    effect: null,
  },
  {
    id: 'wf_the_asking',
    phase: null,
    weight: 6,
    when: (G) => G.flags.has('windfall_known') && !G.mem?.wfAsking,
    text: 'They do not ask directly. It arrives as a story about a business that would work, or a treatment that is not funded, or a deposit that is nearly there. You can hear the shape of the request under the story and you have to decide before they finish speaking. Every version of yes changes the relationship, and so does every version of no.',
    choices: [
      { text: 'Give, to whoever asks.', outcome: 'The money goes where it was always going to go. So does a certain amount of the goodwill.', effect: (p) => { p.wipeMoney(0.35); p.karma += 8; p.m -= 4; p.setMem('wfAsking', true); p.addFlag('windfall_gave_it_away') } },
      { text: 'Decide case by case.', outcome: 'You become a person who assesses the people close to him. You did not choose that role and cannot put it down.', effect: (p) => { p.wipeMoney(0.12); p.m -= 6; p.r += 6; p.setMem('wfAsking', true); p.addFlag('windfall_became_the_judge') } },
      { text: 'Say no, and keep saying it.', outcome: 'You keep the money. Two people stop calling and one of them was right to.', effect: (p) => { p.m -= 9; p.karma -= 6; p.r += 8; p.setMem('wfAsking', true); p.addFlag('windfall_refused') } },
    ],
    effect: null,
  },
  {
    id: 'wf_work_question',
    phase: null,
    weight: 5,
    when: (G) => G.flags.has('lottery_winner') && G.age >= 25 && G.age <= 62 && !G.mem?.wfWork,
    text: (G) => G.career
      ? 'You go in on Monday because you cannot think what else to do with a Monday. The work has not changed. What has changed is that it is now optional, and a thing you do by choice turns out to be a different thing from the same act done by necessity — not lighter, exactly. Just differently weighted.'
      : 'The days have no shape now and nobody is expecting you anywhere. You had always assumed the shape was imposed on you. It turns out you were holding part of it up yourself, and without the other part it will not stand.',
    choices: null,
    effect: (p) => { p.setMem('wfWork', true); p.m -= 2; p.addFlag('windfall_work_optional') },
  },
  {
    id: 'wf_late_accounting',
    phase: 'late_life',
    weight: 6,
    when: (G) => G.flags.has('lottery_winner') && G.age >= 62 && !G.mem?.wfLate,
    text: 'People still bring it up, decades on, as the thing that happened to you. You have had a whole life since and most of it had nothing to do with it. Whether it made the life better is not a question you can answer, because there is no second life to hold it against — only this one, which has been mostly ordinary, and which you would have wanted anyway.',
    choices: null,
    effect: (p) => { p.setMem('wfLate', true); p.m += 4; p.addFlag('windfall_in_proportion') },
  },
]
