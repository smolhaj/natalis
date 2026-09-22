// Iceland and Moldova arc events
//
// The two extremes of the small-European-country range in the same century:
// one went from turf farms to among the richest places on earth inside a
// lifetime, the other from Soviet republic to the poorest country in Europe
// with a quarter of its working-age population abroad. Written together
// because the mechanism is the same in both — a very small population, one
// export, and an outside decision — and the outcome is opposite.
//
// 14 events. Follow-throughs at the bottom.

const IS_IS = (G) => G.currentCountry?.name === 'Iceland' || G.character.country?.name === 'Iceland'
const IS_MD = (G) => G.currentCountry?.name === 'Moldova' || G.character.country?.name === 'Moldova'

export const ICELAND_MOLDOVA_EVENTS = [

  // ── Iceland ──

  {
    id: 'isl_occupation_wages',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_IS(G) &&
      G.currentYear >= 1940 && G.currentYear <= 1946 &&
      G.age >= 12 &&
      !G.mem?.islOccupation,
    text: 'The British come in May and the Americans replace them the next year, and there are more soldiers on the island than there are men of working age. They build the airfield at Keflavík and the roads to it, and they pay in cash, weekly, which is a thing that has essentially not happened here before. Your father leaves the farm for the airfield. Within four years the turf houses are being abandoned faster than any policy managed in forty. People call it the blessed war, quietly, and are aware of what it means that they do.',
    choices: [
      { text: 'Take the wage', tag: null, outcome: 'You are paid weekly for the first time in your life and you never go back to the farm.', effect: (p) => { p.mo += 900; p.w += 6; p.m += 5; p.addFlag('isl_occupation_wages'); p.addFlag('isl_left_the_farm') } },
      { text: 'Stay on the land', tag: 'defiant', outcome: 'You keep the sheep. The neighbours go and the valley thins and you are still there in 1970.', effect: (p) => { p.m += 2; p.h += 3; p.mo -= 200; p.addFlag('isl_stayed_farming') } },
    ],
    effect: null,
  },

  {
    id: 'isl_cod_war',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_IS(G) &&
      ((G.currentYear >= 1958 && G.currentYear <= 1961) || (G.currentYear >= 1972 && G.currentYear <= 1976)) &&
      G.age >= 14 &&
      !G.mem?.islCodWar,
    text: 'The limit goes out — four miles, then twelve, then fifty, then two hundred — and each time the Royal Navy sends frigates and each time Iceland sends coastguard vessels with a net-cutter on a cable. There is no army. There is a threat to leave NATO and close the base, which is the entire arsenal and turns out to be enough. The frigates go home. A country of two hundred thousand people has won a dispute with Britain four times by having something Britain wanted more than it wanted the fish.',
    choices: null,
    effect: (p) => {
      p.m += 10; p.karma += 4; p.e += 4
      p.addFlag('isl_cod_war_generation')
      p.setMem('islCodWar', true)
    },
  },

  {
    id: 'isl_herring_gone',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_IS(G) &&
      G.currentYear >= 1967 && G.currentYear <= 1972 &&
      G.age >= 16 &&
      !G.mem?.islHerring,
    text: 'The herring does not come. Siglufjörður had thirty salting stations and a population that tripled every summer and a brass band, and the fish simply stops arriving — fished out, or moved, and the argument about which will go on for fifty years. The town loses half its people inside a decade. The buildings stay. You can walk down to the quay in 1975 and see the racks still standing with nothing on them, which is a specific way for an industry to end: not a closure, an absence.',
    choices: null,
    effect: (p) => {
      p.mo -= 800; p.m -= 8; p.e += 3
      p.addFlag('isl_herring_collapse')
      p.setMem('islHerring', true)
    },
  },

  {
    id: 'isl_quota_system',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_IS(G) &&
      G.currentYear >= 1984 && G.currentYear <= 2000 &&
      G.age >= 20 &&
      !G.mem?.islQuota,
    text: 'The catch is allocated as a transferable quota, in proportion to what each boat landed in the reference years, and the allocation is free. Within a decade the quota is an asset worth more than the boat, and it can be sold, and it is — out of the villages, to the companies. A family that fished for six generations sells its share and buys a flat in Reykjavík, and the harbour it leaves has a quay and no right to use it. The system saved the stock. It is also the largest transfer of wealth in the country\'s history and it went to about twenty families.',
    choices: [
      { text: 'Sell the quota', tag: 'yielding', outcome: 'It is more money than your father saw in a lifetime. The village notices the day the boat leaves.', effect: (p) => { p.mo += 45000; p.w += 14; p.m -= 6; p.karma -= 4; p.addFlag('isl_sold_quota') } },
      { text: 'Keep fishing', tag: 'defiant', outcome: 'You fish your share. Every year the arithmetic of not having sold gets harder to defend at home.', effect: (p) => { p.mo += 1800; p.m += 4; p.karma += 5; p.addFlag('isl_kept_quota') } },
    ],
    effect: null,
  },

  {
    id: 'isl_kreppan_2008',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_IS(G) &&
      G.currentYear >= 2008 && G.currentYear <= 2010 &&
      G.age >= 18 &&
      !G.mem?.islKreppan,
    text: 'Three banks holding about ten times what the country produces in a year fail inside a week. The króna loses half its value; the mortgage you took in a foreign currency because everyone did now costs double in the money you are paid in. People bang pots outside the parliament until the government falls — the pots-and-pans revolution, and the pots are actual kitchen pots. Then the country does the thing nobody else does: it lets the banks fail, puts bankers on trial, and declines to make the public pay the foreign depositors.',
    choices: [
      { text: 'Go to the square with a pot', tag: 'defiant', outcome: 'You are there most evenings in January. The government resigns and you are aware you were part of the reason.', effect: (p) => { p.m += 8; p.karma += 8; p.mo -= 6000; p.addFlag('isl_kreppan_protester'); p.addFlag('politically_awakened') } },
      { text: 'Deal with your own mortgage and let the square handle itself', tag: null, outcome: 'You renegotiate, twice, and lose the second car. The arithmetic takes six years to come back.', effect: (p) => { p.mo -= 12000; p.m -= 10; p.addFlag('isl_kreppan_debt') } },
    ],
    effect: null,
  },

  {
    id: 'isl_everyone_related',
    phase: null,
    weight: 6,
    when: (G) =>
      IS_IS(G) &&
      G.age >= 18 && G.age <= 60 &&
      !G.mem?.islRelated,
    text: 'You meet someone and within four minutes you have established, without either of you finding it strange, which farm their grandmother was from and therefore how you are related. Three hundred thousand people and a genealogy that is written down back to the settlement, so the question is never whether you are related but how far out. The phone book is alphabetised by first name because the surnames are patronymics and a family shares none of them. Anonymity is not a thing that is available here, and neither is being unaccounted for.',
    choices: null,
    effect: (p) => {
      p.s += 6; p.m += 4
      p.addFlag('isl_everyone_related')
      p.setMem('islRelated', true)
    },
  },

  // ── Moldova ──

  {
    id: 'mda_deportation_1949',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_MD(G) &&
      G.currentYear >= 1946 && G.currentYear <= 1951 &&
      G.age >= 6 &&
      !G.mem?.mdaDeport,
    text: 'Operation Iasul takes them in one night in July — thirty-five thousand people, the families of anyone with too much land or the wrong relative, to Kurgan and Tyumen. The lists were made locally, which is the part nobody in the village will discuss for the next sixty years, because the person who made the list also stayed. Before that came the famine of 1946 and 1947, and the requisition quotas that caused it, and the words people use for that year are not the words in the textbook.',
    choices: [
      { text: 'Your family is on the list', tag: null, outcome: 'Four days in a cattle car. You are in Siberia for eight years and you come back to a house with someone else in it.', effect: (p) => { p.m -= 20; p.h -= 12; p.mo -= 1500; p.addFlag('mda_deported_family'); p.addFlag('displaced'); p.addFlag('lost_home') } },
      { text: 'Your family is not', tag: null, outcome: 'You watch the carts go past the end of the lane at four in the morning. Nobody in your house goes to the window.', effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('mda_deportation_witness'); p.addFlag('aut_taught_silence') } },
    ],
    effect: null,
  },

  {
    id: 'mda_cyrillic_school',
    phase: 'childhood',
    weight: 8,
    when: (G) =>
      IS_MD(G) &&
      G.currentYear >= 1950 && G.currentYear <= 1989 &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.mdaCyrillic,
    text: 'The language you speak at home is Romanian and the alphabet you are taught to write it in is Cyrillic, because the official position is that Moldovan is a separate language that happens to be identical. The textbooks say so. The better jobs are in Russian, so your parents put you in the Russian school or they do not, and that decision at seven determines a great deal. You grow up able to read your own language only in letters that were assigned to it by a decision made in Moscow.',
    choices: [
      { text: 'Russian school. It is the door.', tag: 'yielding', outcome: 'You are fluent and placeable and slightly foreign in your grandmother\'s kitchen.', effect: (p) => { p.e += 8; p.w += 4; p.m -= 4; p.addFlag('mda_russian_schooled'); p.addFlag('language_divided') } },
      { text: 'Moldovan school, Cyrillic and all', tag: 'defiant', outcome: 'You keep the language and lose two rungs of the ladder, and in 1989 you are suddenly the one who was right.', effect: (p) => { p.e += 4; p.m += 5; p.w -= 4; p.addFlag('mda_kept_language') } },
    ],
    effect: null,
  },

  {
    id: 'mda_latin_script_1989',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_MD(G) &&
      G.currentYear >= 1989 && G.currentYear <= 1992 &&
      G.age >= 14 &&
      !G.mem?.mdaLatin,
    text: 'The language law passes and the alphabet changes back, and for a year the signs in Chișinău are in both, and then in one. There are half a million people in this republic who do not speak Romanian and have never needed to, and for them the same law reads as a door closing. On the left bank of the Dniester they refuse it outright. Within three years that refusal has a flag, a currency, a Russian garrison, and a war that kills a thousand people and then stops without ending.',
    choices: null,
    effect: (p) => {
      p.e += 6; p.m += 4
      p.addFlag('mda_language_restored')
      p.setMem('mdaLatin', true)
    },
  },

  {
    id: 'mda_transnistria_1992',
    phase: null,
    weight: 8,
    when: (G) =>
      IS_MD(G) &&
      G.currentYear >= 1992 && G.currentYear <= 1994 &&
      G.age >= 14 &&
      !G.mem?.mdaTransnistria,
    text: 'The fighting is at Bender, on the bridge, and it lasts four months and involves the Russian Fourteenth Army on one side of it. Then there is a ceasefire and no settlement, and the strip on the far bank keeps the steel mill, the power station and most of the industry. You can cross it with the right papers and a wait. Thirty years later it is still there, still unrecognised by anyone, still garrisoned, and the word everyone uses for the situation is frozen, which describes the politics and not the people in it.',
    choices: null,
    effect: (p) => {
      p.m -= 10; p.e += 5
      p.addFlag('mda_transnistria_war')
      p.addFlag('civil_conflict_witness')
      p.setMem('mdaTransnistria', true)
    },
  },

  {
    id: 'mda_labour_departure',
    phase: null,
    weight: 9,
    when: (G) =>
      IS_MD(G) &&
      G.currentYear >= 1998 && G.currentYear <= 2025 &&
      G.age >= 19 && G.age <= 48 &&
      !G.flags.has('emigrated') &&
      !G.mem?.mdaDeparture,
    text: 'The factory on the far bank, the vineyards under a Russian embargo, and a wage that will not cover the winter. Everybody\'s cousin is in Italy cleaning for a family in Padua, or in Moscow on a building site, or in Israel caring for someone\'s mother. A third of what this country runs on arrives by transfer. The village you grew up in is now grandparents and grandchildren with the middle generation missing, and the arithmetic has been obvious for years.',
    choices: [
      { text: 'Italy. The care work.', tag: null, outcome: 'Padua. You raise someone else\'s parents and your own children raise themselves, on video calls, at a distance you can measure in years.', effect: (p) => { p.mo += 5200; p.m -= 12; p.setResidency('work_visa'); p.addFlag('mda_labour_migrant'); p.addFlag('emigrated'); p.addFlag('children_left_behind') } },
      { text: 'Moscow. It is closer and the language is already yours.', tag: null, outcome: 'A site in the outer districts, six to a room, and a residency permit that is always nearly expired.', effect: (p) => { p.mo += 3400; p.m -= 10; p.h -= 6; p.setResidency('work_visa'); p.addFlag('mda_labour_migrant'); p.addFlag('emigrated') } },
      { text: 'Stay. Somebody has to be here.', tag: 'defiant', outcome: 'You stay. You are the one who looks after four sets of grandparents and three sets of other people\'s children.', effect: (p) => { p.m -= 4; p.karma += 9; p.mo -= 400; p.addFlag('mda_stayed_behind'); p.addFlag('stayed_behind') } },
    ],
    effect: null,
  },

  {
    id: 'mda_romanian_passport',
    phase: null,
    weight: 7,
    when: (G) =>
      IS_MD(G) &&
      G.currentYear >= 2007 &&
      G.age >= 18 &&
      !G.mem?.mdaPassport,
    text: 'If a grandparent was a citizen of Romania before 1940 — and in this country that is most people — you can have a Romanian passport, and a Romanian passport is an EU passport. Nearly a million have taken it. The queue at the consulate is a national institution. The question of whether taking it means you think you are Romanian, or simply that you would like to be able to work in Lisbon, is one people answer differently at election time and in the queue.',
    choices: [
      { text: 'Apply. It is a document, not an identity.', tag: null, outcome: 'It takes two years and a folder of certified copies. You use it within a month of getting it.', effect: (p) => { p.mo += 300; p.w += 5; p.e += 3; p.addFlag('mda_romanian_passport') } },
      { text: 'Decline. You are Moldovan.', tag: 'defiant', outcome: 'You hold the position through two elections and one argument with your sister, who is in Bologna.', effect: (p) => { p.m += 3; p.karma += 4; p.w -= 3; p.addFlag('mda_declined_passport'); p.addFlag('mda_moldovan_identity') } },
    ],
    effect: null,
  },

  {
    id: 'mda_wine_embargo',
    phase: null,
    weight: 6,
    when: (G) =>
      IS_MD(G) &&
      G.currentYear >= 2006 &&
      G.age >= 20 &&
      !G.mem?.mdaWine,
    text: 'Ninety per cent of the wine went east and then one morning it does not, because Russia has found a sanitary objection that arrives at the same time as a political disagreement. The cellars at Cricova run for kilometres and are full. Growers pull vines. The industry spends fifteen years learning to sell to people who have never heard of it, which it eventually manages, and the lesson everybody draws is about having one customer.',
    choices: null,
    effect: (p) => {
      p.mo -= 1600; p.m -= 6; p.e += 4
      p.addFlag('mda_embargo_hit')
      p.setMem('mdaWine', true)
    },
  },
]

// ─── Follow-through ──────────────────────────────────────────────────────────

export const ICELAND_MOLDOVA_FOLLOWTHROUGH = [

  {
    id: 'isl_ft_quota_village_late',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      G.flags.has('isl_sold_quota') &&
      G.age >= 60 &&
      !G.mem?.islFtQuota,
    text: 'You go back to the village for a funeral. The harbour is tidy and empty and there is a sign explaining what used to happen here, with a photograph of a boat that might be yours. You are the richest person at the wake and you sit near the door. Nobody says anything about it, and the not-saying has been going on for twenty-five years and will outlast you.',
    choices: null,
    effect: (p) => {
      p.m -= 8; p.r += 9
      p.addFlag('isl_quota_regret')
      p.setMem('islFtQuota', true)
    },
  },

  {
    id: 'isl_ft_kreppan_trials',
    phase: null,
    weight: 5,
    when: (G) =>
      (G.flags.has('isl_kreppan_protester') || G.flags.has('isl_kreppan_debt')) &&
      G.currentYear >= 2012 &&
      G.age >= 25 &&
      !G.mem?.islFtTrials,
    text: 'The bankers go to prison. Not all of them and not for long, but they go, with names everyone knows and a sentence handed down in a courtroom in Reykjavík, and no other country manages it. It does not give you back the six years. It does something else, which is harder to put a number on and which you notice every time you read about a different country\'s crisis.',
    choices: null,
    effect: (p) => {
      p.m += 8; p.karma += 5
      p.addFlag('isl_accountability_seen')
      p.setMem('islFtTrials', true)
    },
  },

  {
    id: 'mda_ft_video_childhood',
    phase: null,
    weight: 7,
    when: (G) =>
      G.flags.has('mda_labour_migrant') &&
      G.children?.length > 0 &&
      G.age >= 30 &&
      !G.mem?.mdaFtVideo,
    text: 'The call is on Sunday and it is twelve minutes long and your mother holds the phone at the wrong angle so you spend most of it looking at the ceiling of your own kitchen. Your child answers questions politely. There is a particular silence that happens about eight minutes in, every week, and you have both learned to fill it with a question about school. You have paid for the house they are standing in and you have not stood in it for three years.',
    choices: [
      { text: 'Go home. Take the loss.', tag: 'defiant', outcome: 'You go back with less than you planned and you are there for the rest of their childhood.', effect: (p) => { p.mo -= 2200; p.m += 14; p.karma += 8; p.updateChildRel(0, 22); p.addFlag('mda_returned_home') } },
      { text: 'Another two years. Then.', tag: 'yielding', outcome: 'Two years becomes six. The politeness on the calls does not change and that is how you know.', effect: (p) => { p.mo += 4000; p.m -= 12; p.r += 10; p.updateChildRel(0, -14); p.addFlag('mda_stayed_abroad_too_long') } },
    ],
    effect: null,
  },

  {
    id: 'mda_ft_grandparent_household',
    phase: null,
    weight: 6,
    when: (G) =>
      G.flags.has('mda_stayed_behind') &&
      G.age >= 45 &&
      !G.mem?.mdaFtGrandparent,
    text: 'There are four children in the house and none of them are yours. Their parents are in Padua and Moscow and one of them has stopped calling. You do the school runs and the fevers and the parent evenings, and the money arrives on time, and what you are is a category the state does not have a word for. At the school gate the other people waiting are all your age.',
    choices: null,
    effect: (p) => {
      p.m += 4; p.h -= 5; p.karma += 9
      p.addFlag('mda_raising_the_left_behind')
      p.setMem('mdaFtGrandparent', true)
    },
  },

  {
    id: 'mda_ft_deportation_names',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      (G.flags.has('mda_deported_family') || G.flags.has('mda_deportation_witness')) &&
      G.currentYear >= 1991 &&
      G.age >= 55 &&
      !G.mem?.mdaFtNames,
    text: 'The archives open and the lists are in them, with the signatures at the bottom. You could go and look. Everyone in the village of a certain age knows roughly whose grandfather held the pen, and has known for fifty years, and the knowledge has been managed by not being said. Somebody has proposed a memorial at the station. The argument about the wording has been running for four years.',
    choices: [
      { text: 'Read the list', tag: 'defiant', outcome: 'You find the name. It is the name you expected. Knowing is not better and you would do it again.', effect: (p) => { p.e += 6; p.m -= 8; p.addFlag('mda_read_the_list') } },
      { text: 'Leave it closed', tag: 'yielding', outcome: 'The village keeps working, which is what the silence was for.', effect: (p) => { p.m += 2; p.r += 6; p.addFlag('mda_left_it_closed') } },
    ],
    effect: null,
  },
]
