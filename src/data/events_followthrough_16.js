// Follow-through events (BUILD — Russia arc follow-throughs)
// Late-life callbacks for flags set in Russia-specific events.
// Covers Soviet-Afghan veteran late reckoning, Chechen war generation,
// Ukraine war exile and veterans, Bolotnaya generation late witness.

export const FOLLOWTHROUGH_16_EVENTS = [

  {
    id: 'ft16_soviet_afghan_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('soviet_afghan_veteran') &&
      G.age >= 55 &&
      !G.mem?.ft16AfghanLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2021) {
        return 'August 2021. The last American soldier leaves Afghanistan. The Taliban returns to Kabul in three days. You served in the same country forty years ago, when the state that sent you in was also certain of its mission, also expected the year to be short, also found that the mountain did not care about the briefing. The afgantsy — the Soviet veterans\' association — does not issue a public statement. You do not know what you would have said in it.'
      }
      return 'The Memorial Foundation has compiled the names of Soviet soldiers killed in Afghanistan. 15,000 killed. 35,000 wounded. The figures are exact now in a way they were not when the bodies were coming back in sealed coffins. The memorial in Moscow acknowledges what the state did not acknowledge when you were coming home from it. The acknowledgment comes thirty years after the silence. You are in your sixties. The acknowledgment is for the record.'
    },
    choices: [
      {
        text: 'You attend the afgantsy gatherings. These are the people who understand without explanation.',
        tag: null,
        outcome: 'The understanding without explanation is what the association is for. You have been coming for thirty years. The people who are gone from the list now are gaps in a specific kind of conversation.',
        effect: (p) => { p.m += 5; p.r += 4; p.karma += 4; p.setMem('ft16AfghanLate', true); },
      },
      {
        text: 'You do not speak about it. The silence has served.',
        tag: null,
        outcome: 'What you do not speak about is still there. The silence does not change what is there.',
        effect: (p) => { p.r += 6; p.m += 2; p.setMem('ft16AfghanLate', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft16_chechnya_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('chechnya_generation') &&
      G.age >= 55 &&
      !G.mem?.ft16ChechnyaLate,
    text: 'Grozny has been rebuilt. The towers are glass and lit at night. Ramzan Kadyrov\'s photograph is in every shop window. Chechnya is officially pacified — it has been officially pacified since 2009. You remember the buildings in 1995: the apartment blocks shelled until they looked like the photographs from Stalingrad. The reporters who photographed them were later shot or poisoned or died of other causes. The war that was not called a war is now a stability that is not called an occupation. You understand the relationship between these two things because you were in the country for the transition between them.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft16ChechnyaLate', true)
    },
  },

  {
    id: 'ft16_ukraine_exile_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('russia_ukraine_exile') &&
      G.age >= 45 &&
      G.currentYear >= 2024 &&
      !G.mem?.ft16UkraineExileLate,
    text: (G) => {
      const country = G.currentCountry?.name || 'the country you are in'
      return `You are in ${country}. You have been here since 2022. The question of when you will go back assumes there is something to go back to that resembles what you left, which is a question with no current answer. You follow Russian news in the way that people follow the news of a place they both are and are not from. Your documents say one thing. Your accent says another. The people around you who know you call you Russian and you do not correct them and you are not sure that they are wrong.`
    },
    choices: [
      {
        text: 'You are building a life here. The country you are from is the country you are from.',
        tag: null,
        outcome: 'The building is real. The country you are from does not stop being what it is because you have left it.',
        effect: (p) => { p.m += 4; p.r += 3; p.setMem('ft16UkraineExileLate', true); },
      },
      {
        text: 'You are waiting. For what, exactly, is something you are still working out.',
        tag: null,
        outcome: 'The waiting is its own country. You live in it between the country you came from and the country you are in.',
        effect: (p) => { p.r += 6; p.m -= 2; p.setMem('ft16UkraineExileLate', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft16_ukraine_veteran_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('russia_ukraine_veteran') &&
      G.age >= 35 &&
      G.currentYear >= 2024 &&
      !G.mem?.ft16UkraineVetLate,
    text: 'The briefing described a three-day operation. The operation is in its second year. The casualties are not published. The men from your unit who are gone are described in official communications as having died in the performance of their duty defending the motherland, which is true and is also the entire official account. What was found in Ukraine — the specific things, the towns, the people — is not in the official account. You are home now. Home has the same streets. You have a different relationship with the streets because you have come back from something the streets do not know about.',
    choices: [
      {
        text: 'You find a way to speak about it. The speaking matters, even imperfectly.',
        tag: null,
        outcome: 'What is spoken imperfectly is better than what is not spoken. This is not always true. In this case you believe it is.',
        effect: (p) => { p.r += 4; p.m += 3; p.karma += 4; p.setMem('ft16UkraineVetLate', true); },
      },
      {
        text: 'What is inside stays inside. The streets are the streets.',
        tag: null,
        outcome: 'The streets are the streets. What is inside does not resolve because it stays there.',
        effect: (p) => { p.r += 6; p.m -= 3; p.h -= 2; p.setMem('ft16UkraineVetLate', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft16_bolotnaya_navalny',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('bolotnaya_generation') &&
      G.currentYear >= 2024 &&
      G.age >= 40 &&
      !G.mem?.ft16BolotnaLate,
    text: 'You were in the square in 2011 or you watched from nearby. The white ribbons. The hundred thousand people who discovered that there were a hundred thousand people like them in the same city. The Bolotnaya prisoners were tried and served their sentences. The foreign agent law passed and the anti-extremism laws expanded and the space for what could be said publicly narrowed through the 2010s until what remained was a specific kind of silence that resembles the silence before. In February 2024, Alexei Navalny died in IK-6 Polar Wolf. He was forty-seven. The calculation he made in 2021 — to return, knowing the cost — was a political act, which is different from a practical one.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 4
      p.karma += 5
      p.e += 3
      p.setMem('ft16BolotnaLate', true)
    },
  },

]
