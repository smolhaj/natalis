// Cuba depth arc events
// Covers: revolutionary-generation childhood, Bay of Pigs 1961 from inside,
// Mariel boatlift 1980, Santería under atheist state, libreta ration-book
// daily life, Raúl reforms 2008-17, Obama thaw 2014, July 11 2021 protests.
// Supplements events in events_latin_america.js (CDR, Special Period, balsero).

const CUBA_EVENTS = [

  {
    id: 'cub_revolution_childhood',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1960 && G.currentYear <= 1975 &&
      G.age >= 6 && G.age <= 12 &&
      !G.mem?.cub_revolution_childhood,
    text: (G) => {
      const yr = G.currentYear
      if (yr <= 1963) return 'The literacy campaign sent teenagers into your neighborhood with lanterns and primers. The reading rate goes from sixty percent to ninety-nine in one year, according to the broadcast. You are part of the number. The primer has the face of the revolution on the cover — the palm trees, the specific serif of the slogan — and you learn to read with it the way the generation before you learned to read with the catechism. The state is not God but it is present in the same way.'
      return 'You are a Young Pioneer. The red neckerchief must be tied properly before school. You know all the verses about the revolution and you know the faces on the wall and you know that the imperialists are outside and the revolution is what keeps you inside its protection. You believe this the way children believe what is given to them before they have words for belief.'
    },
    choices: null,
    effect: (p) => { p.e += 2; p.addFlag('cub_revolution_generation'); p.setMem('cub_revolution_childhood', true); },
  },

  {
    id: 'cub_bay_of_pigs_1961',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear === 1961 &&
      G.age >= 14 &&
      !G.mem?.cub_bay_of_pigs,
    text: 'April 17, 1961. The radio announces an invasion at Playa Girón — CIA-trained Cuban exiles landing on the southern coast. The militia is mobilizing. Three days of near-total national emergency: the schools close, the streets fill with armed workers, the radio plays military marches between Fidel\'s voice. On the third day the announcement: the invaders are defeated. The jubilation in the street is genuine. The external enemy has confirmed everything the revolution said about itself.',
    choices: [
      {
        text: 'You volunteered — took a rifle or a support role.',
        tag: 'mobilized',
        outcome: 'The militia post at the edge of the neighborhood. Three days of readiness. Cigarettes with men you did not know. The victory came before you had to find out what you would do with the rifle.',
        effect: (p) => { p.m += 4; p.e += 2; p.addFlag('cub_bay_of_pigs_generation'); p.addFlag('cub_mobilized_1961'); p.setMem('cub_bay_of_pigs', true); },
      },
      {
        text: 'You watched from a distance, uncertain.',
        tag: 'watched',
        outcome: 'The radio. A neighbor\'s certainty. Your own calculation of which side you were on, made quietly and then folded away. The revolution wins. Your uncertainty is no longer necessary to hold.',
        effect: (p) => { p.r += 3; p.addFlag('cub_bay_of_pigs_generation'); p.setMem('cub_bay_of_pigs', true); },
      },
    ],
  },

  {
    id: 'cub_mariel_1980',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear === 1980 &&
      G.age >= 17 && G.age <= 50 &&
      !G.mem?.cub_mariel,
    text: 'April 1980. Castro announces that anyone who wants to leave can leave from the port of Mariel. Within days 125,000 people are trying to go. He adds prisoners, mental patients, people labeled antisocial. The boats from Miami come and go. He calls the departing ones escoria — scum. Some of the escoria are simply people who want a different life. Some are people who were put on the boats without choosing. You are at the port or you are watching the port from elsewhere.',
    choices: [
      {
        text: 'You got on one of the boats.',
        tag: 'left',
        outcome: 'Three days in a crowded vessel. The Florida coastline. The tent city at Eglin Air Force Base. The Cuban Miami that was not fully prepared for you — you were "Marielito" before you had time to be anything else.',
        effect: (p) => { p.m -= 5; p.r += 4; p.addFlag('emigrated'); p.addFlag('cub_mariel_gone'); p.setResidency('refugee_status'); p.setMem('cub_mariel', true); },
      },
      {
        text: 'You stayed. The calculation came out that way.',
        tag: 'stayed',
        outcome: 'The people who left are called names on the radio. Some of them were your neighbors. You do not know yet whether the ones who stayed were the ones who believed or the ones who were afraid or simply the ones who had not yet accumulated enough desperation.',
        effect: (p) => { p.r += 5; p.addFlag('cub_mariel_stayed'); p.setMem('cub_mariel', true); },
      },
    ],
  },

  {
    id: 'cub_santeria_underground',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.religion === 'folk_religion' &&
      G.age >= 13 && G.age <= 22 &&
      !G.mem?.cub_santeria,
    text: 'The orishas do not appear on the official calendar. The revolution is atheist and Santería is officially backward — a colonial remnant, pre-scientific, not what the new Cuba requires of its citizens. In practice: the altars are in back rooms. The ceremonies happen at night. The babalawo who reads the diloggún does not advertise. You have grown up knowing this division: two registers, two vocabularies, the revolutionary one for public and the Yoruba-inflected one for home. The orishas are Changó, Yemayá, Oshún. The state is the state. Both require offerings.',
    choices: null,
    effect: (p) => { p.s += 2; p.addFlag('cub_santeria_generation'); p.setMem('cub_santeria', true); },
  },

  {
    id: 'cub_libreta_texture',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1965 && G.currentYear <= 1995 &&
      !G.mem?.cub_libreta,
    text: 'The libreta covers: rice, beans, sugar, cooking oil, bread, chicken when available. The butcher shop has a schedule. The bodega knows you by family unit. The ration covers perhaps half of what a family needs; the rest comes from whatever the network provides — a neighbor with a cousin at the farm, the black market price for coffee, the relative in Miami who sends tinned food in the post. You become expert at the arithmetic of what you have and what you can stretch and what you can trade. This arithmetic is your financial education.',
    choices: null,
    effect: (p) => { p.e += 2; p.addFlag('cub_libreta_generation'); p.setMem('cub_libreta', true); },
  },

  {
    id: 'cub_raul_opening',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 2008 && G.currentYear <= 2017 &&
      G.age >= 25 &&
      !G.mem?.cub_raul_opening,
    text: (G) => {
      const yr = G.currentYear
      const change = yr <= 2011
        ? 'cell phones are now legal to own — not the internet, but the phone itself'
        : yr <= 2014
        ? 'private restaurants can now expand beyond family, hire outsiders, serve whom they choose'
        : 'you can now buy and sell your house legally, a transaction that required black market arrangements for fifty years'
      return `Raúl has introduced another small reform: ${change}. Each reform is the lifting of something always arbitrary — an old prohibition that served no one visible. The pace is deliberate: slow enough to be controlled, fast enough to suggest direction. You are watching your country renegotiate its terms with itself, in small increments, through official channels.`
    },
    choices: [
      {
        text: 'You move carefully to take advantage.',
        tag: 'opener',
        outcome: 'The paladare, or the phone, or the transaction that is now legal — you enter the space the reform opened. It is small. It is real.',
        effect: (p) => { p.w += 4; p.m += 3; p.addFlag('cub_raul_opener'); p.setMem('cub_raul_opening', true); },
      },
      {
        text: 'You wait. You have seen reforms before.',
        tag: 'skeptic',
        outcome: 'The reforms are real but narrow and supervised and reversible. You have learned that the door opening is not the same as the door open.',
        effect: (p) => { p.r += 4; p.addFlag('cub_raul_skeptic'); p.setMem('cub_raul_opening', true); },
      },
    ],
  },

  {
    id: 'cub_obama_thaw_2014',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 2014 && G.currentYear <= 2015 &&
      G.age >= 18 &&
      !G.mem?.cub_obama_thaw,
    text: 'December 17, 2014. Obama and Raúl Castro give simultaneous televised addresses. The United States and Cuba are restoring diplomatic relations after fifty-three years. The pope mediated. The streets of Havana are quiet with the weight of something large. You watch on a neighbor\'s television and the anchor reads the statement and you sit with what you are feeling, which does not have a single name. The Americans will come. Something will change. You do not know yet whether you should be glad.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 3; p.addFlag('cub_obama_generation'); p.setMem('cub_obama_thaw', true); },
  },

  {
    id: 'cub_july11_protests',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear === 2021 &&
      G.age >= 18 &&
      !G.mem?.cub_july11,
    text: 'July 11, 2021. The chant is "Patria y Vida" — Homeland and Life — not "Patria o Muerte" — Homeland or Death. The difference is one syllable and sixty years. The protests begin in San Antonio de los Baños and spread to Havana, Santiago, twenty other cities. Cubans who have never protested are outside. The food shortages and the power cuts and the COVID collapse of the peso have accumulated into something that was not safe to say in the street and is now being said in the street.',
    choices: [
      {
        text: 'You went outside. You were in the street.',
        tag: 'marched',
        outcome: 'The hours outside. The arrests that came afterward — sentences of eight and twelve years. The neighbor who is not there now. You were there for the moment. The moment was real.',
        effect: (p) => { p.m -= 5; p.r += 8; p.karma += 6; p.addFlag('cub_july11_marcher'); p.setMem('cub_july11', true); },
      },
      {
        text: 'You watched from a window. The risk calculation.',
        tag: 'watched',
        outcome: 'The ones who went outside are now in prison or in exile or still waiting. You are still here, with the sound of that day, which you carry without talking about.',
        effect: (p) => { p.r += 6; p.addFlag('cub_july11_watched'); p.setMem('cub_july11', true); },
      },
    ],
  },

]

export default CUBA_EVENTS
