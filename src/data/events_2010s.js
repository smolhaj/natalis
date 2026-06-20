// Cross-cutting 2010s texture events.
// The decade's specific felt experiences: platform economy, climate grief,
// political fracture, algorithmic life, always-on connectivity.
// Not country-specific; for national events see country arc files.

export const EVENTS_2010S = [

  // ─── THE GIG ECONOMY ─────────────────────────────────────────────────────────

  {
    id: 'dec10_gig_work',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2013 && G.currentYear <= 2023 &&
      G.age >= 19 && G.age <= 34 &&
      !G.career?.id &&
      !G.mem?.dec10GigDone &&
      (G.character.country.archetype === 'wealthy_west' ||
       G.character.country.archetype === 'wealthy_east' ||
       G.character.country.archetype === 'developing_urban'),
    text: 'The app. There is work available whenever you want it — driving, delivering, running errands on someone else\'s schedule. You set your own hours. You are your own boss. The app takes its cut and the cut is what the app decides. Your expenses are yours. There is no sick pay. There is flexibility, which is real, and instability, which is also real.',
    choices: [
      {
        text: 'Take the work — it bridges the gap',
        tag: 'pragmatic',
        outcome: 'You work when you can. The money is there and then it isn\'t. You learn to watch the surge pricing the way your grandfather watched weather.',
        effect: (p) => { p.mo += 800; p.m -= 5; p.h -= 3; p.addFlag('gig_worker'); p.setMem('dec10GigDone', true); },
      },
      {
        text: 'Decline — you need something with a floor',
        tag: 'security',
        outcome: 'The flexibility was real. So was the exposure. You keep looking for something with a contract attached.',
        effect: (p) => { p.m += 3; p.e += 3; p.setMem('dec10GigDone', true); },
      },
    ],
  },

  {
    id: 'dec10_gig_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.currentYear >= 2018 && G.currentYear <= 2026 &&
      G.age >= 35 && G.age <= 50 &&
      G.flags.has('gig_worker') &&
      !G.mem?.dec10GigEchoDone,
    text: 'A decade of gig-platform work is a decade without a pension contribution, without employer sick cover, without any of the architecture that turns employment into security. You look at what your parents had at your age and the distance is not about effort.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.m -= 4; p.setMem('dec10GigEchoDone', true); },
  },

  // ─── THE PHONE AT THE TABLE ────────────────────────────────────────────────

  {
    id: 'dec10_always_connected',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2012 && G.currentYear <= 2020 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.dec10AlwaysDone &&
      G.flags.has('has_smartphone'),
    text: 'You notice it at dinner: four people at the table and three phones face-up beside the plates. Not checking constantly — just available, the screen half-lit, the possibility of interruption present the whole time. You wonder when this became normal and cannot identify the moment it happened. It happened like a season changing.',
    choices: null,
    effect: (p) => { p.e += 3; p.m -= 3; p.setMem('dec10AlwaysDone', true); p.addFlag('always_connected'); },
  },

  // ─── CLIMATE GRIEF AS GENERATIONAL IDENTITY ────────────────────────────────

  {
    id: 'dec10_climate_grief_young',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2015 && G.currentYear <= 2022 &&
      G.age >= 13 && G.age <= 19 &&
      !G.mem?.dec10ClimGriefDone &&
      (G.character.country.archetype === 'wealthy_west' ||
       G.character.country.archetype === 'wealthy_east'),
    text: 'The IPCC report. The school strike. Greta Thunberg in Geneva, at Davos, at the UN — the same rage, different rooms. You have grown up inside a decade of increasingly specific climate language: 1.5 degrees, tipping points, carbon budget. The adults around you discuss it as a future problem. To you it feels like a present condition, something you carry without anyone naming it.',
    choices: [
      {
        text: 'Channel it into action — join the strikes',
        tag: 'activist',
        outcome: 'The Friday marches. Signs hand-painted the night before. The movement gives the anxiety somewhere to go.',
        effect: (p) => { p.m += 5; p.karma += 6; p.s += 3; p.addFlag('climate_activist'); p.addFlag('climate_generation'); p.setMem('dec10ClimGriefDone', true); },
      },
      {
        text: 'Feel it and carry it quietly',
        tag: 'witness',
        outcome: 'You read everything you can and say little about it. The knowledge settles into something you live alongside.',
        effect: (p) => { p.e += 5; p.r += 3; p.addFlag('climate_generation'); p.setMem('dec10ClimGriefDone', true); },
      },
    ],
  },

  // ─── POPULIST FRACTURE ─────────────────────────────────────────────────────

  {
    id: 'dec10_populist_fracture',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2016 && G.currentYear <= 2021 &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.dec10PopFracDone &&
      (G.character.country.archetype === 'wealthy_west' ||
       G.character.country.archetype === 'post_soviet'),
    text: 'The vote, whichever vote it was in your country, split along lines you didn\'t know were load-bearing. At Christmas, someone at the table says something and your father says something back. A silence you don\'t quite recover from. You realise the disagreement is not about policy but about what you think the world is, and that the two versions are not easily bridged.',
    choices: [
      {
        text: 'Argue back — the silence would be worse',
        tag: 'confrontational',
        outcome: 'The argument doesn\'t resolve. It never does. But you are not the person who stayed quiet.',
        effect: (p) => { p.m -= 5; p.s += 3; p.karma += 3; p.addFlag('political_fracture_lived'); p.setMem('dec10PopFracDone', true); },
      },
      {
        text: 'Let it go — the relationship matters more',
        tag: 'conciliatory',
        outcome: 'You choose the meal over the argument. The gap does not close but you eat together.',
        effect: (p) => { p.m -= 3; p.r += 4; p.addFlag('political_fracture_lived'); p.setMem('dec10PopFracDone', true); },
      },
    ],
  },

  // ─── OCCUPY / INEQUALITY AWAKENING ────────────────────────────────────────

  {
    id: 'dec10_occupy_moment',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.currentYear >= 2011 && G.currentYear <= 2014 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.dec10OccupyDone &&
      (G.character.country.archetype === 'wealthy_west'),
    text: 'Zuccotti Park. St Paul\'s Cathedral. The tents in the city square, the general assemblies, the handmade signs. The occupations last weeks, then months. The specific demand — what, exactly, are we asking for? — is the thing they never resolve. But the map they draw of the economy, the vocabulary they put into circulation: that stays.',
    choices: [
      {
        text: 'Go down and see it',
        tag: 'curious',
        outcome: 'You spend a few evenings at the camp. You come away with a specific set of questions about money that you did not have before.',
        effect: (p) => { p.e += 6; p.karma += 4; p.s += 2; p.addFlag('occupy_witness'); p.setMem('dec10OccupyDone', true); },
      },
      {
        text: 'Follow it from a distance',
        tag: 'observer',
        outcome: 'You watch the coverage and read the arguments. Something in the language about the 99 percent lodges in you.',
        effect: (p) => { p.e += 4; p.addFlag('occupy_witness'); p.setMem('dec10OccupyDone', true); },
      },
    ],
  },

  // ─── BORN INTO INTERNET ────────────────────────────────────────────────────

  {
    id: 'dec10_born_digital',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2012 && G.currentYear <= 2020 &&
      G.age >= 13 && G.age <= 18 &&
      G.character.birthYear >= 2001 &&
      !G.mem?.dec10BornDigDone,
    text: 'You do not remember the world before the internet because there was no such world for you. Older people sometimes say this as if it were an accusation. What you notice instead: you have always had access to any question ever asked, any song ever recorded, any face you wanted to find. This is different from having the map before you know you\'re lost.',
    choices: null,
    effect: (p) => { p.e += 4; p.s += 2; p.addFlag('born_digital'); p.setMem('dec10BornDigDone', true); },
  },

  // ─── INFORMATION OVERLOAD / DECADE EXHAUSTION ─────────────────────────────

  {
    id: 'dec10_decade_exhaustion',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.currentYear >= 2017 && G.currentYear <= 2022 &&
      G.age >= 30 && G.age <= 50 &&
      !G.mem?.dec10ExhaustDone &&
      (G.character.country.archetype === 'wealthy_west' ||
       G.character.country.archetype === 'wealthy_east'),
    text: 'Something about the speed of the news. Every day the top story is an emergency and then a different emergency replaces it and the first one is never resolved. You are aware of more simultaneous crises than any previous generation had information about. You don\'t know what to do with this. You don\'t know if knowing helps or if it is just a new form of powerlessness.',
    choices: null,
    effect: (p) => { p.m -= 4; p.e += 3; p.r += 3; p.addFlag('information_overload'); p.setMem('dec10ExhaustDone', true); },
  },

  // ─── THE ALGORITHM DECIDES ────────────────────────────────────────────────

  {
    id: 'dec10_algorithm_life',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.currentYear >= 2014 && G.currentYear <= 2022 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.dec10AlgoDone &&
      G.flags.has('has_smartphone'),
    text: 'At some point the feed stopped being chronological. What you see is what the algorithm has decided you want to see, which is a function of what you looked at before, which is already a function of previous versions of the algorithm. You can\'t fully explain how your opinions formed in this decade and whether the sequence was yours.',
    choices: null,
    effect: (p) => { p.e += 5; p.m -= 3; p.r += 2; p.addFlag('algorithm_aware'); p.setMem('dec10AlgoDone', true); },
  },
]
