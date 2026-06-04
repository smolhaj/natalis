// Uganda character events
// Historical arcs: Idi Amin 1971–79 (State Research Bureau terror, Asian expulsion),
// Bush War and Obote II, Museveni NRA liberation 1986,
// LRA (Lord's Resistance Army) in northern Uganda 1987–2008+,
// HIV/AIDS "Slim" disease, Museveni's consolidation and removal of term limits.

export const UGANDA_EVENTS = [

  {
    id: 'uga_amin_era',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Uganda' &&
      G.currentYear >= 1971 && G.currentYear <= 1979 &&
      G.age >= 12 &&
      !G.mem.ugaAmin,
    text: 'Idi Amin Dada took power in January 1971 in a military coup while Milton Obote was in Singapore. The word "disappeared" became a verb in Uganda. The State Research Bureau operated out of a building in Nakasero. The Nile Hotel swimming pool acquired a meaning that is not spoken directly. The number of people killed during Amin\'s eight years is estimated between 100,000 and 500,000 — the uncertainty is itself part of the record. You are living inside this uncertainty, learning to read the environment for signals that most people in other countries do not need to read.',
    choices: [
      {
        text: 'You keep your head down. Most people do.',
        tag: null,
        outcome: 'The strategy of most people in most places under most governments of this kind. The strategy works, until it doesn\'t. You are in the years where it is working.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('amin_generation'); p.setMem('ugaAmin', true) },
      },
      {
        text: 'Someone close to you disappears.',
        tag: null,
        outcome: 'The disappearance has no official explanation, which is its own explanation. You add this person to the count that no one is officially taking.',
        effect: (p) => { p.m -= 18; p.r += 10; p.addFlag('amin_generation'); p.addFlag('experienced_loss'); p.setMem('ugaAmin', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'uga_asian_expulsion_1972',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Uganda' &&
      G.currentYear === 1972 &&
      (G.character.ethnicity === 'asian' || G.character.ethnicity === 'asian_ugandan' || G.character.ethnicity === 'south_asian') &&
      !G.mem.ugaAsianExpulsion,
    text: 'August 4, 1972. Idi Amin announces that Uganda\'s Asian population — some 60,000 people, most of them British citizens or British Protected Persons, many whose families have been in East Africa for three generations — have 90 days to leave. The businesses, the properties, the savings accounts are to be handed over under the policy he calls "Africanisation." Your family has built a duka, a trading business, a network of relationships that took decades. You have 90 days.',
    choices: null,
    effect: (p) => { p.m -= 20; p.mo -= Math.floor((p.mo ?? 0) * 0.75); p.r += 14; p.addFlag('amin_asian_expulsion'); p.addFlag('experienced_displacement'); p.setMem('ugaAsianExpulsion', true) },
  },

  {
    id: 'uga_slim_disease',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Uganda' &&
      G.currentYear >= 1983 && G.currentYear <= 1998 &&
      G.age >= 15 &&
      !G.mem.ugaSlim,
    text: '"Slim" is what Ugandans call it — the wasting, the thinness before death. The first cases emerged in the fishing villages around Rakai district and Lake Victoria in the early 1980s. The disease follows the main roads and the truck routes. By the mid-1980s the village has people who are clearly dying of something no one is naming. The ABC campaign — Abstain, Be faithful, use a Condom — Uganda\'s government response under Museveni — is one of the earliest serious AIDS interventions in Africa. But the campaign comes after the village has been teaching its own lessons.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('ugandan_aids_generation'); p.setMem('ugaSlim', true) },
  },

  {
    id: 'uga_museveni_liberation_1986',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Uganda' &&
      G.currentYear >= 1986 && G.currentYear <= 1990 &&
      G.age >= 15 &&
      !G.mem.ugaMuseveni86,
    text: 'January 26, 1986. Yoweri Museveni\'s National Resistance Army takes Kampala. After Idi Amin and then the Obote II period — the killings in the Luwero Triangle, the disappearances — the NRA\'s arrival is experienced by many as liberation. Museveni\'s inaugural speech: "No army has the right to mishandle you." The 10-point programme promises democracy, security, national unity. You are present at the beginning of a government that will still be in power four decades later. In 1986 you do not know that yet.',
    choices: null,
    effect: (p) => { p.m += 10; p.r -= 3; p.addFlag('museveni_liberation_generation'); p.setMem('ugaMuseveni86', true) },
  },

  {
    id: 'uga_lra_northern',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Uganda' &&
      G.currentYear >= 1993 && G.currentYear <= 2006 &&
      G.age >= 8 && G.age <= 18 &&
      !G.mem.ugaLRA,
    text: 'Joseph Kony\'s Lord\'s Resistance Army has been operating in northern Uganda since 1987. The LRA abducts children — boys to become soldiers, girls to be distributed among commanders. By the mid-1990s, children in Gulu and Kitgum have developed the night commute: walking into town before dark to sleep in churches, schools, bus parks — anywhere with numbers. The logic is simple. You cannot be taken from a crowd as easily as from a home. You commute with your sleeping mat and you go home in the morning.',
    choices: [
      {
        text: 'You are in the north. You night-commute.',
        tag: null,
        outcome: 'You learn the route, the timing, the mat you keep by the door. The teachers the next morning know where you slept and say nothing. Everyone knows. No one says.',
        effect: (p) => { p.m -= 16; p.h -= 5; p.r += 10; p.addFlag('lra_northern_generation'); p.setMem('ugaLRA', true) },
      },
      {
        text: 'You are in Kampala. The north exists as radio reports.',
        tag: null,
        outcome: 'The distance is geographical and also something else. The radio reports are specific — Gulu, Kitgum, Pader — and they are also general in the way that something two hundred kilometres away is general.',
        effect: (p) => { p.m -= 6; p.r += 4; p.addFlag('lra_northern_generation'); p.setMem('ugaLRA', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'uga_museveni_consolidation',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Uganda' &&
      G.currentYear >= 2005 && G.currentYear <= 2021 &&
      G.age >= 25 &&
      !G.mem.ugaConsolidation,
    text: '2005: the constitution is amended to remove the presidential term limits that Museveni had once called essential for African democracy. The NRM that ended Amin has become something different — an entrenched system of patronage and managed opposition. Bobi Wine — Robert Kyagulanyi, the musician — enters parliament in 2017 and loses the 2021 election to Museveni in a process international observers describe as not credible. Museveni is seventy-six years old. He has been in power for thirty-five years. The country is younger than his presidency.',
    choices: [
      {
        text: 'You remember 1986. The distance between then and now is the education.',
        tag: null,
        outcome: 'The man who said "no army has the right to mishandle you" removed his own term limits. You have been present for the entire arc. That is a specific kind of knowledge.',
        effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('museveni_consolidation_generation'); p.setMem('ugaConsolidation', true) },
      },
      {
        text: 'You were born after the liberation. This is simply the government.',
        tag: null,
        outcome: 'Museveni is not a liberator to you — he is the permanent condition. The before-Museveni that the older generation references is history to you, not memory.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('museveni_consolidation_generation'); p.setMem('ugaConsolidation', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'uga_boda_boda_city',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Uganda' &&
      G.currentYear >= 2000 && G.currentYear <= 2025 &&
      G.age >= 18 && G.age <= 35 &&
      (G.ruralUrban === 'urban' || G.ruralUrban === 'peri_urban') &&
      !G.mem.ugaBodaBoda,
    text: 'The boda-boda: a motorcycle taxi that navigates the traffic, the mud roads, the gaps between bus stops. Kampala without boda-bodas is not Kampala. The economics work for young men with access to a bike — some own theirs, some pay the owner a daily fee and keep the difference. It is the informal economy\'s most visible institution and one of the leading causes of road deaths in the country. You are either riding one, driving one, or living in a city organized around them.',
    choices: null,
    effect: (p) => { p.m += 3; p.addFlag('kampala_informal_generation'); p.setMem('ugaBodaBoda', true) },
  },

]
