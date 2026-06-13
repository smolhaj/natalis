// Follow-through events — Central Europe arc (Hungary + Czech Republic)
// Late-life callbacks for Hungarian uprising, Kádár compromise, diaspora;
// Czech normalization late accounting, Charter 77 recognition, Velvet reckoning.

export const FOLLOWTHROUGH_19_EVENTS = [

  {
    id: 'ft19_hungarian_1956_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('hungarian_1956_generation') &&
      G.age >= 55 &&
      !G.mem?.ft191956Late,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2006) {
        return 'October 23, 2006: the fiftieth anniversary. Riots in Budapest — the first serious street violence since 1989 — between supporters and opponents of the socialist government that just admitted to lying about the economy for years. The anniversary of the uprising becomes the occasion for something different and uglier than commemoration. You watch this and you think about what the uprising was, and what is being done with its anniversary, and whether these two things share anything more than a name.'
      }
      return 'The uprising is a living memory for you and a historical event for people born after 1960. The difference between those two relationships to the same sequence of days is one of the distances of your life. What you remember is not quite what they learn in school, though the school version is not exactly wrong. The wrong is one of texture. The texture is yours and cannot be transferred.'
    },
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft191956Late', true); },
  },

  {
    id: 'ft19_kadar_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('kadar_compromise_generation') &&
      G.age >= 55 &&
      !G.mem?.ft19KadarLate,
    text: 'The question the Kádár years raised and did not answer: what did the compromise cost? Not in political terms — the cost there is documented. In another register. The specific kind of person produced by a society that says: do not aspire beyond what the deal allows, do not ask about the tanks, do not organize. The person who is competent and careful and does not talk about certain things. You are looking at that person in the mirror, and it is the first time you are looking with something like clarity.',
    choices: [
      {
        text: 'The deal was what was available. You took what was available. That is the accurate accounting.',
        tag: null,
        outcome: 'Accurate. And also not all of what the accounting contains.',
        effect: (p) => { p.r += 4; p.m -= 2; p.setMem('ft19KadarLate', true); },
      },
      {
        text: 'You made the compromise and you knew you were making it. The knowing is the part you keep.',
        tag: null,
        outcome: 'The knowing did not change what you did. But it is a different thing than not knowing.',
        effect: (p) => { p.r += 5; p.karma += 3; p.setMem('ft19KadarLate', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft19_hungarian_diaspora_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('hungarian_diaspora_1956') &&
      G.age >= 55 &&
      !G.mem?.ft19HunDiaspora,
    text: 'After 1989, the border is open and you can go back. Going back is a different thing than it once was. The Hungary that exists now is not the Hungary you left. The people you knew have aged along a different timeline. What you remember as familiar is either gone or changed in ways that feel like a critique of your memory. The diaspora community in your adopted country is still the community of 1956 — most of you are old enough now that the community is shrinking.',
    choices: [
      {
        text: 'You go back. You want to see what the place became.',
        tag: null,
        outcome: 'You see it. The seeing confirms something and contradicts something else. Both are worth having.',
        effect: (p) => { p.m += 5; p.r += 5; p.setMem('ft19HunDiaspora', true); },
      },
      {
        text: 'You do not go back. What you remember is what you want to keep.',
        tag: null,
        outcome: 'What you remember does not change against a comparison you did not make. That is a choice with a cost and a benefit.',
        effect: (p) => { p.r += 6; p.m -= 3; p.setMem('ft19HunDiaspora', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft19_normalization_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('normalization_generation') &&
      G.age >= 55 &&
      !G.mem?.ft19NormLate,
    text: 'After 1989, the question of who did what during normalization took years to settle and never settled completely. The lustration process named names. Some people disputed what was said about them. Some disputes were well-founded. The specific texture of normalization was that coercion existed on a spectrum, and the documents do not always show the spectrum. What you know about what you did — or what people you knew did — lives in a different register than what the files contain.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('ft19NormLate', true); },
  },

  {
    id: 'ft19_charter_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('charter_77_generation') &&
      G.flags.includes('political_dissident') &&
      G.age >= 55 &&
      !G.mem?.ft19CharterLate,
    text: 'After 1989, the Charter 77 signatories who survived were recognized — invited to serve, written about, offered positions in the new state. Havel himself was one of them. But the recognition was not uniform and was not always what had been imagined. The moral prestige of resistance did not automatically translate into political effectiveness, and Czech politics after 1989 did not always move in the direction the resistance had implied it would. What you paid for a thing and what the thing turned out to be are two different sums.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 4; p.karma += 4; p.setMem('ft19CharterLate', true); },
  },

  {
    id: 'ft19_velvet_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('velvet_revolution_generation') &&
      G.age >= 50 &&
      !G.mem?.ft19VelvetLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2019) {
        return 'Thirty years after November 1989, Czech politics has produced Andrej Babiš — a billionaire prime minister who is also an accused secret-police collaborator, charged with EU subsidy fraud, who controls several major newspapers. Havel died in 2011. The specific mood of the Havel years — the philosopher at the castle, the playwright as president — lasted for a particular window. What came after is what came after. You watched all of it.'
      }
      return 'The Velvet Revolution was supposed to install something. What it installed, in the first decade: rapid privatization, the oligarchisation of the privatized assets, restitution claims. And also: the opening, the EU, genuine prosperity. The question is what the revolution was for exactly, and whether it delivered that. The answer is not simple — which is itself a kind of answer.'
    },
    choices: null,
    effect: (p) => { p.r += 4; p.m -= 2; p.e += 3; p.setMem('ft19VelvetLate', true); },
  },

]
