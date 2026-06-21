// events_followthrough_32.js — MODE B follow-throughs for Turkmenistan arc
// 8 events providing downstream consequences for flags set in events_turkmenistan.js

export const FOLLOWTHROUGH_32_EVENTS = [

  // ─── RUHNAMA LATE ECHO ────────────────────────────────────────────────────────

  {
    id: 'ft32_ruhnama_compliant_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('tkm_ruhnama_compliant') &&
      G.age >= 38 &&
      !G.mem?.ft32RuhnamaCompliant,
    text: 'The Ruhnama is no longer required. Berdymukhamedov removed it from the curriculum in 2008. The passages you memorised remain in you — not because you believe them but because that is what memorisation does. Occasionally a phrase surfaces during unrelated moments. You are not sure what to do with this: you cannot unlearn it, and you have nowhere to direct the feeling that it should not be in you.',
    choices: null,
    effect: (p) => { p.r += 6; p.m += 3; p.e += 4; p.setMem('ft32RuhnamaCompliant', true) },
  },

  {
    id: 'ft32_ruhnama_resistant_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('tkm_ruhnama_resistant') &&
      G.age >= 52 &&
      !G.mem?.ft32RuhnamaResistant,
    text: 'The books you found through the network of people who knew people — those books were the education you actually received. You think about this sometimes: the official education and the real one, running in parallel for years. The official one was about compliance. The other one was about whatever the person in front of you happened to have that month. Some of it was very good. None of it came with a curriculum.',
    choices: null,
    effect: (p) => { p.m += 6; p.karma += 4; p.e += 5; p.setMem('ft32RuhnamaResistant', true) },
  },

  // ─── INFORMATION ECHO ─────────────────────────────────────────────────────────

  {
    id: 'ft32_information_seeker_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('tkm_information_seeker') &&
      G.age >= 50 &&
      !G.mem?.ft32InfoSeeker,
    text: 'The habit of receiving information carefully — parsing what is present, reading what is absent, calculating who is in the room — is not a skill you can now turn off. You have used it in every context since. It makes you a very good reader of situations. It also makes you tired in ways that people without this habit do not understand: you cannot stop the calculation. You did not choose to be this way. The system chose it for you, and then you chose to stay with it.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 5; p.m += 3; p.setMem('ft32InfoSeeker', true) },
  },

  {
    id: 'ft32_information_cautious_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('tkm_information_cautious') &&
      G.age >= 52 &&
      !G.mem?.ft32InfoCautious,
    text: 'There are things you do not know and know you do not know. The specific mechanism of what happened in the years you were living through — the decisions made, the deals struck, the people who disappeared and the reasons — these are still not fully available to you. The internet is more open now than it was, and you have read some of what was not accessible before. Some of it confirmed what you had suspected. Some of it was worse than what you had suspected.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m += 2; p.setMem('ft32InfoCautious', true) },
  },

  // ─── DEPARTURE FOLLOW-THROUGH ─────────────────────────────────────────────────

  {
    id: 'ft32_departure_attempted_echo',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('tkm_departure_attempted') &&
      G.age >= 35 &&
      !G.mem?.ft32DepartureAttempted,
    text: 'You are outside. The route worked or a version of it worked. The people you left behind: some have been fine. Some have had visits from officials that they describe to you obliquely in phone calls, choosing their words. You are careful about what you say publicly. The calculation that governed leaving is still governing, just from the other side of the border.',
    choices: [
      {
        text: 'You stay quiet publicly. The safety of the people at home is the constraint.',
        tag: 'tkm_exiled_silent',
        outcome: 'Silence is a protection you extend toward others. This is a different kind of constraint than the one you left.',
        effect: (p) => { p.addFlag('tkm_exiled_silent'); p.r += 6; p.karma += 5; p.m -= 3; p.setMem('ft32DepartureAttempted', true) },
      },
      {
        text: 'You have decided to speak. The risk is theirs, and they know it, and they said to go ahead.',
        tag: 'tkm_exiled_speaking',
        outcome: 'They gave you permission. You use it carefully. The phone calls are now shorter and more careful from their end.',
        effect: (p) => { p.addFlag('tkm_exiled_speaking'); p.r += 4; p.karma += 7; p.m += 4; p.setMem('ft32DepartureAttempted', true) },
      },
    ],
  },

  {
    id: 'ft32_stayed_for_family_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('tkm_stayed_for_family') &&
      G.age >= 55 &&
      !G.mem?.ft32StayedFamily,
    text: 'The family for whom you stayed are still here. The calculation held — the choice protected what it was meant to protect. You have watched people leave over the years: some through official channels, some through less official ones, some who simply did not return from trips. You stayed. The country you stayed in has changed in ways that are hard to name: things have loosened slightly and tightened in other ways. You are still doing the same calculation, just with different numbers.',
    choices: null,
    effect: (p) => { p.r += 7; p.m += 4; p.karma += 6; p.e += 3; p.setMem('ft32StayedFamily', true) },
  },

  // ─── GAS PARADOX LATE ─────────────────────────────────────────────────────────

  {
    id: 'ft32_gas_wealth_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('tkm_gas_wealth_paradox') &&
      G.age >= 58 &&
      !G.mem?.ft32GasWealth,
    text: 'The gas is still there. The wealth is still somewhere else. In 2009 a new pipeline opened to China and the dependence on Russia shifted; in 2015 gas prices fell and the budget collapsed; in 2022 European demand rose and the prices rose with it. The mechanism has varied. The basic condition — enormous underground resource, ordinary people living carefully — has held. You have grown old in this gap.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 4; p.m += 3; p.setMem('ft32GasWealth', true) },
  },

  // ─── TURKMENBASHI LATE RECKONING ─────────────────────────────────────────────

  {
    id: 'ft32_turkmenbashi_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('tkm_turkmenbashi_generation') &&
      G.age >= 55 &&
      !G.mem?.ft32Turkmenbashi,
    text: 'In some countries a dictator dies and the statues come down. In Turkmenistan the statue was moved to the outskirts of the city and the country continued under the dentist and then the dentist\'s son. The months have their original names back. Most of the decrees have been quietly reversed without announcement. The architecture remains: the white marble, the gold domes, the eight-lane boulevards. A system that can produce all of this does not reverse through the removal of statues. You have been watching this long enough to know what changes and what does not.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 5; p.m += 3; p.setMem('ft32Turkmenbashi', true) },
  },

]
