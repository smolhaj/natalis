// events_followthrough_66.js
// Follow-throughs for Venezuela depth flags:
// vzla_dep_maduro_generation, vzla_dep_crisis_diaspora,
// vzla_dep_bolivarian_believer.

export const FOLLOWTHROUGH_66_EVENTS = [

  // ── MADURO GENERATION ─────────────────────────────────────────────────────────

  {
    id: 'ft66_maduro_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('vzla_dep_maduro_generation') &&
      G.age >= 30 && G.age <= 55 &&
      !G.mem?.ft66MaduroMidlife,
    text: `You have spent years inside the crisis — not as an event but as the medium of daily life. The daily life inside it required a specific knowledge: which queues had stock, which supermarkets had dollars, which streets were navigable at which hours, which colectivo had which arrangement with which barrio. The knowledge is granular and is in your body as much as your mind. You know what the inside of the crisis felt like from inside it, which is not the same as what it looked like from the news reports that were made about it for people who were not inside it.`,
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.setMem('ft66MaduroMidlife', true) },
  },

  {
    id: 'ft66_maduro_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('vzla_dep_maduro_generation') &&
      G.age >= 55 &&
      !G.mem?.ft66MaduroLate,
    text: `The crisis is still the crisis or the crisis has begun to change or something else has happened that requires a new name. From inside Venezuela the accounting runs through personal mathematics — the price of things, the power availability, the presence or absence of particular neighbours who were there last year and are not this year. The seven million who left left a country with more space in it than before. The space has a specific texture. You know the texture because you are in it.`,
    choices: null,
    effect: (p) => { p.r += 7; p.setMem('ft66MaduroLate', true) },
  },

  // ── CRISIS DIASPORA ────────────────────────────────────────────────────────────

  {
    id: 'ft66_diaspora_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('vzla_dep_crisis_diaspora') &&
      G.age >= 28 && G.age <= 55 &&
      !G.mem?.ft66DiasporaMidlife,
    text: `The Venezuelan diaspora is in every Spanish-speaking city and in Miami and in Madrid. You are in one of them. The diaspora has a shorthand: the exchange rate of the moment, the news from inside that requires interpretation, the word that means something different here from what it meant there. You maintain the Venezuela you carry in conversation with the Venezuela that exists, which requires checking because the Venezuela that exists continues to change faster than the Venezuela you carry.`,
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('ft66DiasporaMidlife', true) },
  },

  {
    id: 'ft66_diaspora_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('vzla_dep_crisis_diaspora') &&
      G.age >= 55 &&
      !G.mem?.ft66DiasporaLate,
    text: `You have been outside Venezuela for years — long enough that some things you know about it are the things it used to be. Your children know Venezuela from what you have told them and from what they can see online. The country they have in their heads and the country in your head are different because you lived in it and they did not. Both of you call it home or one of you does. The word carries more work than one word should have to carry.`,
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 3; p.setMem('ft66DiasporaLate', true) },
  },

  // ── BOLIVARIAN BELIEVER ────────────────────────────────────────────────────────

  {
    id: 'ft66_believer_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('vzla_dep_bolivarian_believer') &&
      G.age >= 55 &&
      !G.mem?.ft66BelieverLate,
    text: `You believed when belief was warranted and you watched what happened to the thing you believed in. The accounting of the Bolivarian project — what it built that still exists, what it destroyed that cannot be rebuilt, what was real and what was performance — is the accounting of your political life. You are inside the accounting without a clean conclusion. The conclusion requires more years than have passed, and the passage of more years is not certain. You hold the question open because the alternative is to close it prematurely.`,
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.setMem('ft66BelieverLate', true) },
  },

  {
    id: 'ft66_believer_midlife_reckoning',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('vzla_dep_bolivarian_believer') &&
      G.age >= 35 && G.age <= 60 &&
      G.currentYear >= 2018 &&
      !G.mem?.ft66BelieverMidlife,
    text: `The people who dismissed the revolution from the beginning are not more right than you were. They predicted collapse on different grounds, many of which were wrong. What happened is more specific: the oil management was extractive without reinvestment, the institutions were hollowed out, the Cuban security model was imported, the PDVSA engineers were replaced after the 2002 strike with loyal people who were not always competent people. The belief was not naive. The collapse is not proof the belief was wrong about everything. The accounting requires more precision than either side usually applies.`,
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.setMem('ft66BelieverMidlife', true) },
  },

]
