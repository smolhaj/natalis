// events_turkmenistan.js — 10 events for the Turkmenistan arc
// Covers: Soviet cotton childhood, Ruhnama memorization, Turkmenbashi personality cult,
// gas wealth paradox, white marble Ashgabat, Darvaza gas crater, Arkadag era,
// information control, departure calculation, late reckoning

const IS_TURKMEN = (G) => G.character.country?.name === 'Turkmenistan'

export const TURKMENISTAN_EVENTS = [

  // ─── SOVIET ERA ───────────────────────────────────────────────────────────────

  {
    id: 'tkm_soviet_cotton',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_TURKMEN(G) &&
      G.currentYear >= 1960 && G.currentYear <= 1991 &&
      !G.mem?.tkmSovietChild,
    text: 'The collective farm runs on cotton. Everyone knows the quota. In autumn the schools send children to the fields — you pick alongside the adults, your fingers stained brown at the end of each day. The Karakum Canal has brought water through the desert and made these fields possible; the canal is also draining the Aral Sea somewhere far to the north, though no one discusses this. The Soviet order is the order the world has always been in, as far as you can tell.',
    choices: null,
    effect: (p) => { p.m += 3; p.h -= 2; p.e += 3; p.addFlag('tkm_soviet_generation'); p.setMem('tkmSovietChild', true) },
  },

  // ─── TURKMENBASHI ─────────────────────────────────────────────────────────────

  {
    id: 'tkm_ruhnama_required',
    phase: 'adolescence',
    weight: 5,
    when: (G) =>
      IS_TURKMEN(G) &&
      G.currentYear >= 1995 && G.currentYear <= 2006 &&
      !G.mem?.tkmRuhnama,
    text: 'The Ruhnama is compulsory now: Turkmenbashi has written the soul of the nation, and you must know it. It is examined at school, civil servants must show they know it, and to get a driving licence you must pass a test on it. It is on the buildings and the radio and in the mouths of teachers. Some say it with feeling. Others with the careful blankness of people whose faces have learned to say what their minds do not.',
    choices: [
      {
        text: 'You learn the Ruhnama the way you learn anything required — thoroughly, so the knowing becomes invisible.',
        tag: 'tkm_ruhnama_compliant',
        outcome: 'The passages are in you now. You are not sure what to do with this.',
        effect: (p) => { p.addFlag('tkm_ruhnama_compliant'); p.e += 3; p.m -= 4; p.setMem('tkmRuhnama', true) },
      },
      {
        text: 'You learn the minimum and find your real reading elsewhere, quietly.',
        tag: 'tkm_ruhnama_resistant',
        outcome: 'The books you actually wanted are not in the library, but they exist. You find ways.',
        effect: (p) => { p.addFlag('tkm_ruhnama_resistant'); p.e += 5; p.s += 3; p.setMem('tkmRuhnama', true) },
      },
    ],
  },

  {
    id: 'tkm_turkmenbashi_decrees',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_TURKMEN(G) &&
      G.currentYear >= 1999 && G.currentYear <= 2006 &&
      !G.mem?.tkmDecrees,
    text: 'January is now called Turkmenbashi, and April is named after his mother. The circus is banned, and opera and ballet. A golden statue of the president in Ashgabat turns to face the sun. The news calls all of this progress. You watch the news the way you watch the weather: it tells you which way things are going, not what they are.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.addFlag('tkm_turkmenbashi_generation'); p.setMem('tkmDecrees', true) },
  },

  {
    id: 'tkm_gas_poverty_paradox',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_TURKMEN(G) &&
      G.currentYear >= 1997 && G.currentYear <= 2015 &&
      !G.mem?.tkmGasParadox,
    text: 'Turkmenistan has some of the largest gas reserves on earth; state television says so in a way that suggests the abundance has arrived. The bread ration has been in place for years, and families queue at the distribution points. The gas goes north through the pipe, and money comes back, and where the money goes you cannot see. You can see the white marble of Ashgabat and the fountains in the desert. You can see your family\'s ration card.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 4; p.m -= 3; p.addFlag('tkm_gas_wealth_paradox'); p.setMem('tkmGasParadox', true) },
  },

  // ─── DEATH OF THE FATHER OF ALL TURKMEN ──────────────────────────────────────

  {
    id: 'tkm_niyazov_death',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_TURKMEN(G) &&
      G.currentYear >= 2006 && G.currentYear <= 2008 &&
      !G.mem?.tkmNiyazovDeath,
    text: 'December 21, 2006, and Turkmenbashi is dead. The statue still turns and the months still carry his name, and for a few days nobody knows what the death of the one person means in a state built on him. The acting president is Berdymukhamedov, the health minister, the president\'s own dentist. People say it to each other quietly when nobody official is listening: the dentist.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 5; p.m += 3; p.addFlag('tkm_post_turkmenbashi'); p.setMem('tkmNiyazovDeath', true) },
  },

  // ─── ARKADAG ERA ──────────────────────────────────────────────────────────────

  {
    id: 'tkm_arkadag_era',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_TURKMEN(G) &&
      G.currentYear >= 2010 && G.currentYear <= 2022 &&
      G.flags.has('tkm_post_turkmenbashi') &&
      !G.mem?.tkmArkadag,
    text: 'Berdymukhamedov has renamed himself Arkadag — Patron. His portrait is on cereal boxes. His book on horses is required reading in schools. A city named Arkadag has been built outside Ashgabat. In 2022 he transferred the presidency to his son Serdar and became head of the senate, and both father and son now carry the title Arkadag at different levels. The Ruhnama is no longer required — it has been quietly removed from the curriculum. The system that required it remains entirely intact.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 4; p.m -= 2; p.addFlag('tkm_arkadag_generation'); p.setMem('tkmArkadag', true) },
  },

  // ─── ASHGABAT TEXTURE ─────────────────────────────────────────────────────────

  {
    id: 'tkm_ashgabat_marble',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_TURKMEN(G) &&
      G.currentYear >= 2005 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.tkmMarble,
    text: 'The capital is white marble and gold domes and eight-lane boulevards with almost no cars. The fountains run in the desert. At night the buildings are lit from below and the effect is of a city that exists primarily as an image of itself. You live here. The apartments are concrete behind the white marble facades; the facades face the boulevards; the boulevards are what the government photographs. You walk to the bread queue past a gold dome. This is your city.',
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 2; p.e += 4; p.addFlag('tkm_ashgabat_resident'); p.setMem('tkmMarble', true) },
  },

  // ─── INFORMATION BORDER ───────────────────────────────────────────────────────

  {
    id: 'tkm_information_border',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_TURKMEN(G) &&
      G.currentYear >= 2000 &&
      !G.mem?.tkmInfoBorder,
    text: 'The internet exists but is filtered. VPNs are illegal. Foreign news is blocked. Satellite dishes were banned, then partially unbanned, then reclassified. You know things are happening in the world — you can feel the shape of what you cannot see — but the content is not available through official channels. People share information through channels without names. You learn to understand what is not said as carefully as what is.',
    choices: [
      {
        text: 'You find ways to access what is blocked — quietly, carefully, as a permanent practice.',
        tag: 'tkm_information_seeker',
        outcome: 'You know more than you are supposed to know. You carry this carefully.',
        effect: (p) => { p.addFlag('tkm_information_seeker'); p.e += 7; p.r += 4; p.setMem('tkmInfoBorder', true) },
      },
      {
        text: 'You work with what is available. The risk of seeking more is not worth it.',
        tag: 'tkm_information_cautious',
        outcome: 'Safety costs. You pay them without quite naming them as costs.',
        effect: (p) => { p.addFlag('tkm_information_cautious'); p.m -= 3; p.r += 5; p.setMem('tkmInfoBorder', true) },
      },
    ],
  },

  // ─── THE GAS CRATER ───────────────────────────────────────────────────────────

  {
    id: 'tkm_darvaza_crater',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_TURKMEN(G) &&
      G.currentYear >= 1990 &&
      !G.mem?.tkmDarvaza,
    text: 'The Darvaza crater has been burning since before you were born. A Soviet gas exploration rig collapsed in 1971 and the hole ignited. The geologists thought it would burn itself out in days. It has burned for decades. At night it is visible for kilometres across the Karakum — a pit of fire in the sand that no one has managed to extinguish, or explained how to extinguish, or entirely explained why it keeps burning. In a country full of symbols imposed from above, this one imposed itself.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 3; p.e += 3; p.addFlag('tkm_darvaza_witness'); p.setMem('tkmDarvaza', true) },
  },

  // ─── DEPARTURE CALCULATION ────────────────────────────────────────────────────

  {
    id: 'tkm_departure_question',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_TURKMEN(G) &&
      G.currentYear >= 2000 &&
      !G.mem?.tkmDeparture,
    text: 'Leaving is not simple. The state controls exit. Travel abroad requires a sponsor, sometimes a security review, sometimes a process with no visible mechanism. People who leave and speak publicly about Turkmenistan from outside find that their families at home receive visits. You have been thinking about this — the shape of the calculation — for a while now.',
    choices: [
      {
        text: 'You make the attempt, through whatever route is available.',
        tag: 'tkm_departure_attempted',
        outcome: 'Some routes work. Some do not. You are in the process of finding out which.',
        effect: (p) => { p.addFlag('tkm_departure_attempted'); p.r += 6; p.m += 4; p.setMem('tkmDeparture', true) },
      },
      {
        text: 'The calculation comes out on the side of staying. The risk to your family is the deciding weight.',
        tag: 'tkm_stayed_for_family',
        outcome: 'You know what you chose and what you chose for. This does not make it lighter.',
        effect: (p) => { p.addFlag('tkm_stayed_for_family'); p.r += 8; p.karma += 5; p.m -= 3; p.setMem('tkmDeparture', true) },
      },
    ],
  },

]
