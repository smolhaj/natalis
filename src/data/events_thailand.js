// Thailand character events
// Historical arcs: uncolonized national identity, lèse-majesté Article 112,
// Red Shirt/Yellow Shirt political crisis 2006–14, military coups (2006, 2014),
// 1997 Asian Financial Crisis trigger, Thai middle-income economy.
// Thailand is the only mainland Southeast Asian country to avoid colonization.

export const THAILAND_EVENTS = [

  {
    id: 'tha_uncolonized_pride',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem.thaUncolonized,
    text: 'The history lesson: Thailand — then Siam — is the only country in mainland Southeast Asia that was never colonized. The French took Indochina; the British took Burma and Malaya. Siam played them against each other, ceded some territory, and preserved its sovereignty. The king in the lesson is wise, the diplomacy is heroic, the survival is a source of pride that runs through the national curriculum. You absorb this as fact. You will understand later what it leaves out — the ceded territories, the tributary arrangements, the form that "independence" took.',
    choices: null,
    effect: (p) => { p.e += 3; p.addFlag('thai_uncolonized_identity'); p.setMem('thaUncolonized', true) },
  },

  {
    id: 'tha_lese_majeste',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear >= 1976 &&
      G.age >= 18 &&
      !G.mem.thaLeseMajeste,
    text: 'Article 112 of the Criminal Code: insulting, defaming, or threatening the king, queen, heir apparent, or regent carries a penalty of three to fifteen years per count. The counts accumulate: criticise a royal speech, share a critical article, write something online — each can be a separate count. You know of cases where this added to decades. The law shapes not what you say but how you think before you speak, the pause before the opinion, the specific texture of self-censorship in a country where the law does not require you to actually insult anyone — only to be accused of it.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('thai_lese_majeste_awareness'); p.setMem('thaLeseMajeste', true) },
  },

  {
    id: 'tha_1997_baht_crisis',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear === 1997 &&
      G.age >= 18 &&
      !G.mem.tha1997,
    text: 'July 2, 1997. The Thai government floats the baht after running out of foreign reserves defending the peg. The baht falls forty percent in months. The crisis that begins in Thailand spreads to Indonesia, South Korea, Malaysia, the Philippines — the whole Asian Tiger economy in contagion. In Thailand, companies go bankrupt overnight. The construction cranes stop. The new apartments nobody can afford to buy now cannot be sold even cheaper. The IMF arrives with conditions. You are living inside the year that the phrase "Asian contagion" is being coined.',
    choices: [
      {
        text: 'The crisis costs you your job or your family\'s business.',
        tag: null,
        outcome: 'The baht number, the layoff notice, the conversation about what to sell — these are the specific details of a macroeconomic event as it arrives in your life.',
        effect: (p) => { p.m -= 16; p.mo -= Math.floor((p.mo ?? 0) * 0.35); p.r += 8; p.addFlag('thai_1997_generation'); p.setMem('tha1997', true) },
      },
      {
        text: 'You come through it, with difficulty.',
        tag: null,
        outcome: 'You watched what it did to people around you while managing what it did to you. The management was its own full-time occupation for two years.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('thai_1997_generation'); p.setMem('tha1997', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'tha_red_yellow_conflict',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear >= 2006 && G.currentYear <= 2014 &&
      G.age >= 20 &&
      !G.mem.thaRedYellow,
    text: 'The Red Shirts are Thaksin Shinawatra\'s supporters — the rural north and northeast, the poor, the people who felt visible under his government. The Yellow Shirts are the urban middle class, the royalist establishment, the people who believed Thaksin was corrupt enough to be worth a coup. In 2010 the Red Shirt occupation of central Bangkok ends with ninety dead and the commercial district burning. The two sides have not only different politics but different versions of what Thailand is for and who it belongs to.',
    choices: [
      {
        text: 'You are Red — you remember what Thaksin\'s policies meant for rural Thailand.',
        tag: null,
        outcome: 'Universal healthcare. Village funds. You know what the policy was. The coup undid it. You know that too.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('thai_red_generation'); p.setMem('thaRedYellow', true) },
      },
      {
        text: 'You are Yellow — the corruption was real, the democratic form was not sufficient.',
        tag: null,
        outcome: 'Thaksin\'s businesses, his party, his sister as prime minister. You believed the form of democracy was being used to solidify a different kind of power. You still believe this.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('thai_yellow_generation'); p.setMem('thaRedYellow', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'tha_coup_generation',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      (G.currentYear === 2006 || G.currentYear === 2014) &&
      G.age >= 20 &&
      !G.mem.thaCoup,
    text: 'The tanks are in the streets of Bangkok again. Thailand has had more coups than almost any country in the world — thirteen since 1932, depending on how you count. The military\'s relationship to democracy here is specific: elections occur, governments win, then the military or the courts undo the result if the result is inconvenient. The coup is peaceful. There is no fighting. The curfew is temporary. The generals appear on television and explain that this is necessary for national stability. You have heard this before.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('thai_coup_generation'); p.setMem('thaCoup', true) },
  },

  {
    id: 'tha_economic_middle_income',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear >= 2000 && G.currentYear <= 2020 &&
      G.age >= 28 &&
      !G.mem.thaMiddleIncome,
    text: 'Thailand has been called a middle-income country for thirty years. The manufacturing export economy — textiles, electronics, cars — produced a working class and a lower-middle class in the 1980s and 1990s. The tourism economy built another layer on top. You are in the class that exists because of the factories and the hotels and the service sector, the class that the economists call the Thai middle, and you are watching the cities grow and the countryside stay where it was and wondering when the next step happens.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 2; p.addFlag('thai_middle_income_generation'); p.setMem('thaMiddleIncome', true) },
  },

]
