// Mongolia arc events
// Soviet satellite 1924–1990: Mongolian People's Republic.
// 1937–38 Stalinist purges: 22,000 monks killed, 700 monasteries destroyed overnight.
// Negdels: livestock collectives that imposed factory schedules on nomadic herding.
// January 1990: hunger strikes in Sukhbaatar Square; the MPR agreed to multi-party elections.
// Post-1990 shock: negdels dissolved, herders left with animals but no support infrastructure.
// Dzud: catastrophic winters when snow seals the grass — the 2000 and 2010 dzuds killed
// millions of livestock. Half the population now in Ulaanbaatar, many in ger districts.
// 2000s: Oyu Tolgoi copper and gold mine — mining boom, uneven distribution of gains.

const IS_MONGOLIA = (G) => G.character.country?.name === 'Mongolia'

export const MONGOLIA_EVENTS = [

  {
    id: 'mn_nomadic_herder_childhood',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1924 && G.currentYear <= 1990 &&
      G.age >= 6 && G.age <= 11 &&
      !G.mem?.mnNomadChild,
    text: 'The ger goes up in forty minutes. You have watched your mother do it so many times that your hands know the sequence before your mind gives the instruction — the lattice walls, the roof poles, the felt layers, the smoke hole aligned to the wind. The seasonal routes are not written anywhere. They live in your father\'s reading of the grass color, the cloud formation over the ridge that always means snow within two days, the place where the best winter pasture has always been and will be again. This is the knowledge that moves through bodies, not books.',
    effect: (p) => { p.m += 12; p.h += 5; p.e += 4; p.addFlag('mongolian_nomadic_heritage'); p.setMem('mnNomadChild', true) },
  },

  {
    id: 'mn_stalinist_purge_family',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.currentYear >= 1937 && G.currentYear <= 1945 &&
      !G.mem?.mnPurge,
    text: 'Your uncle was a lama at the monastery six kilometers from where you were born. He was arrested in 1937, in the second month of the purges, taken in a truck with other monks from the district. The official word delivered afterward was illness. The monastery was demolished the following year; some of the carved wood was used for a storage building, some burned. The thangkas your grandmother kept are rolled inside a felt blanket in a corner of the ger that no one acknowledges and everyone knows about.',
    effect: (p) => { p.m -= 15; p.r += 10; p.e += 3; p.h -= 5; p.addFlag('stalinist_purge_family_memory'); p.setMem('mnPurge', true) },
  },

  {
    id: 'mn_negdel_life',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1950 && G.currentYear <= 1989 &&
      !G.mem?.mnNegdel,
    text: 'The negdel owns the animals in aggregate. You know which horse prefers the south-facing pasture in February, which cow will not take the new water source; this knowledge is yours and does not fit the collective register. The chairman files quarterly reports in a format designed for factory output. The veterinary station is real and useful; the school the collective runs is real and the children go. The absurdity and the security exist at the same time, in the same year, in the same body.',
    effect: (p) => { p.m += 3; p.h += 4; p.e += 5; p.s += 3; p.addFlag('negdel_generation'); p.setMem('mnNegdel', true) },
  },

  {
    id: 'mn_1990_revolution',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.currentYear >= 1989 && G.currentYear <= 1991 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.mn1990Rev,
    text: 'January 1990. A group of young people begins a hunger strike in Sukhbaatar Square. The Mongolian People\'s Revolutionary Party has ruled since 1924 — longer than you have been alive, longer than your parents have been alive. The hunger strikers are asking for multi-party elections. The MPRP watches the Soviet Union and calculates. What happens next is not what anyone expected: the Party agrees. No troops. No crackdown. The revolution succeeds by negotiation, which is its own kind of improbable.',
    choices: [
      {
        text: 'You are in the square. You are part of the thing that is happening.',
        tag: 'in_square',
        outcome: 'The cold in January in Ulaanbaatar is a physical fact — minus thirty, minus forty. You stand in it anyway. The agreement comes in May. Multi-party elections in July. You were present for the interval when it was still possible to fail.',
        effect: (p) => { p.m += 14; p.karma += 8; p.s += 5; p.e += 4; p.addFlag('mn_1990_revolution_generation'); p.addFlag('political_active'); p.setMem('mn1990Rev', true) },
      },
      {
        text: 'You watch from a cautious distance, uncertain what will happen.',
        tag: 'watching',
        outcome: 'The agreement arrives in the newspapers. You read about it from the room where you stayed. The shape of the world has changed while you waited to see which shape it would take.',
        effect: (p) => { p.m += 6; p.r += 5; p.addFlag('mn_1990_revolution_generation'); p.setMem('mn1990Rev', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'mn_negdel_dissolution_shock',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.currentYear >= 1991 && G.currentYear <= 1995 &&
      G.flags.has('negdel_generation') &&
      !G.mem?.mnNegdelDissolve,
    text: 'The negdel is dissolved with a decree. The animals are returned to individual families — which is what the animals always were, in truth, and everyone knew it. What is not returned is the veterinary station, or the guaranteed purchase price for wool, or the collective school, or the supply networks. The market economy is announced. The market infrastructure follows at a different pace, which is to say it does not follow. You have the animals and no floor.',
    effect: (p) => { p.m -= 14; p.h -= 6; p.w -= 3; p.mo -= 500; p.r += 7; p.addFlag('mn_post_socialist_shock'); p.setMem('mnNegdelDissolve', true) },
  },

  {
    id: 'mn_dzud_winter',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_MONGOLIA(G) &&
      (G.ruralUrban === 'rural' || G.flags.has('mongolian_nomadic_heritage')) &&
      G.currentYear >= 1990 &&
      (G.currentYear === 2000 || G.currentYear === 2001 || G.currentYear === 2010 || G.currentYear === 2011) &&
      !G.mem?.mnDzud,
    text: (G) => {
      const year = G.currentYear <= 2001 ? '2000' : '2010'
      return `The dzud arrives in November and does not leave until April. The snow comes thick and then freezes into a crust the animals cannot break through to reach the grass underneath. The temperature drops to minus forty and stays there. You watch the animals and know the arithmetic: the weakest go first, which is how you try to keep the strongest alive. The ${year} dzud kills a third of the national herd. You count what you have left at the end of March. The number is the answer to what comes next.`
    },
    effect: (p) => { p.m -= 20; p.h -= 10; p.mo -= 2000; p.w -= 4; p.r += 8; p.addFlag('dzud_survivor'); p.setMem('mnDzud', true) },
  },

  {
    id: 'mn_ulaanbaatar_migration',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1992 &&
      !G.mem?.mnUBMigrate,
    text: 'You bring the ger to Ulaanbaatar. You raise it on a plot at the edge of the ger district, where the city becomes the steppe in gradual stages. The coal stove that heats the ger through January makes the valley air gray by February; the city has the worst winter air quality in the world and the ger districts are where that measurement is made. The children can go to school here. The market is an hour\'s walk. The city keeps building outward to hold everyone who is arriving from the places the dzud reached.',
    choices: [
      {
        text: 'The ger district becomes home. You build a life here, in the margin the city permits.',
        tag: 'ger_district',
        outcome: 'The neighborhood accumulates — a fence, a small shed, a neighbor you know. The steppe is something you keep in the past tense, which is not the same as forgetting it.',
        effect: (p) => { p.m += 5; p.h -= 6; p.s += 4; p.addFlag('ger_district_migrant'); p.addFlag('urban_migrant'); p.setMem('mnUBMigrate', true) },
      },
      {
        text: 'You save enough to move into an apartment. The ger goes into storage.',
        tag: 'apartment',
        outcome: 'The apartment has a radiator that the building controls. In January, when the city is coldest, it is warm in here without your effort. This is a new sensation, and it takes years before it stops feeling like borrowed time.',
        effect: (p) => { p.m += 10; p.h += 3; p.w += 2; p.mo -= 1500; p.addFlag('ger_district_migrant'); p.addFlag('urban_migrant'); p.setMem('mnUBMigrate', true) },
      },
    ],
    effect: null,
  },

  // ── FOLLOW-THROUGH EVENTS ────────────────────────────────────────────────────

  {
    id: 'mn_stalinist_purge_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.flags.has('stalinist_purge_family_memory') &&
      G.age >= 55 &&
      !G.mem?.mnPurgeLate,
    text: 'The democratic government opens the state archives in the 1990s. The files from 1937 and 1938 list names, charges, verdicts — the verdicts are always the same. Your uncle\'s name is in there. The charge is "feudal lama, enemy of the people." The execution date is listed. You sit with the file for a long time. The thangkas that survived in the felt blanket are still in the family, still not spoken about directly. You decide to have them properly conserved. This is the only thing you can do for him now.',
    effect: (p) => { p.m -= 8; p.r += 6; p.karma += 8; p.e += 4; p.setMem('mnPurgeLate', true) },
  },

  {
    id: 'mn_dzud_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.flags.has('dzud_survivor') &&
      G.age >= 55 &&
      !G.mem?.mnDzudLate,
    text: 'Every winter now you watch the weather forecasts from a different city, or a ger district apartment, and run the arithmetic you learned in the bad years: temperature, snow depth, the pasture underneath. Your children know the word dzud but not the feeling of it — the arithmetic you do in your chest, not your head, standing in a field in February counting what you have left. Climate models say the dzuds are getting worse. You believe this without needing the models.',
    effect: (p) => { p.m -= 6; p.r += 7; p.e += 3; p.setMem('mnDzudLate', true) },
  },

  {
    id: 'mn_post_socialist_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.flags.has('mn_post_socialist_shock') &&
      G.age >= 55 &&
      !G.mem?.mnPostSocialistLate,
    text: 'The Oyu Tolgoi mine in the south produces copper and gold in volumes that should matter. The GDP per capita rises in charts. The ger districts at the edge of Ulaanbaatar are still there, still burning coal in January, still producing the gray air. You watched the negdels dissolve and waited for the market to arrive as something you could use. What arrived instead was a hierarchy of who knew how to use it. The knowledge of where the good winter pasture is does not transfer.',
    effect: (p) => { p.r += 6; p.e += 3; p.setMem('mnPostSocialistLate', true) },
  },

  {
    id: 'mn_ger_district_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.flags.has('ger_district_migrant') &&
      G.age >= 55 &&
      !G.mem?.mnGerDistrictLate,
    text: 'Ulaanbaatar is building upward now — tower blocks going up at the center while the ger districts hold at the edges. Your children live in apartments. In winter, when the coal smoke settles into the valley and the air quality index goes off the scale, you think about the steppe air in January, which was cold enough to hurt your lungs but clean in a way that had no name because it was simply how air was. You do not say this to your children. They have never known another city.',
    effect: (p) => { p.r += 5; p.m += 3; p.setMem('mnGerDistrictLate', true) },
  },

  {
    id: 'mn_1990_revolution_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_MONGOLIA(G) &&
      G.flags.has('mn_1990_revolution_generation') &&
      G.age >= 55 &&
      !G.mem?.mn1990Late,
    text: 'Mongolia has had peaceful transfers of power since 1990. The MPRP — renamed, reformed, sometimes the government, sometimes the opposition — still exists. The thing you watched happen in Sukhbaatar Square has lasted longer than most revolutions last. You think about the January cold in 1990 and the people who stood in it without knowing what would happen. That uncertainty was real. What resolved it was not inevitable. Someone in the Party calculated the cost and chose to open a door.',
    effect: (p) => { p.m += 6; p.r += 4; p.karma += 5; p.setMem('mn1990Late', true) },
  },

]
