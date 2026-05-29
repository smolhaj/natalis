// BUILD 32 — Urban Slum and Neighborhood Texture
// New events gated on G.neighborhoodTier.
// Expands on the handful of events in events_places.js.
// Uses local-language words sparingly where they add payload.

export const NEIGHBORHOOD_EVENTS = [

  // ── INFORMAL TIER ──────────────────────────────────────────────────────────

  {
    id: 'nbr_standpipe',
    phase: 'childhood',
    weight: 4,
    cooldown: 0,
    when: (G) =>
      G.neighborhoodTier === 'informal' &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.standpipeKnown &&
      ['subsaharan', 'conflict_zone', 'developing_unstable', 'developing_urban'].includes(G.archetype),
    text: 'The standpipe at the corner runs from five until seven in the morning. You learn to be there at five, jerry can balanced on your head before school, queue behind eight others who are also going to school or work or nowhere in particular. The water that comes out is the same water everyone drinks. In the dry months it runs for forty minutes, not two hours.',
    choices: null,
    effect: (p) => {
      p.setMem('standpipeKnown', true)
      p.h -= 2; p.m -= 3
      p.addFlag('water_insecurity')
    },
  },

  {
    id: 'nbr_fire_settlement',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.neighborhoodTier === 'informal' &&
      G.age >= 16 && !G.mem?.settlementFire,
    text: 'The fire starts in the section nearest the road — a cooking gas cylinder, someone says later, though no one really knows. The corrugated iron conducts heat before it conducts flame. By the time you smell it the roof three houses down is already lighting the next one. You have the time it takes to run one block.',
    choices: [
      {
        text: 'Grab your documents and the money',
        tag: null,
        outcome: 'You lose everything else. You keep what cannot be replaced.',
        effect: (p) => {
          p.setMem('settlementFire', true)
          p.mo -= Math.round((p._state.money ?? 0) * 0.4)
          p.m -= 15; p.h -= 5
          p.addFlag('lost_home')
        },
      },
      {
        text: 'Help the neighbours get their children out first',
        tag: null,
        outcome: 'Everyone gets out. You lose the documents too. The karma stays with you longer than the loss.',
        effect: (p) => {
          p.setMem('settlementFire', true)
          p.mo -= Math.round((p._state.money ?? 0) * 0.6)
          p.m -= 12; p.karma += 10
          p.addFlag('lost_home')
        },
      },
    ],
    effect: null,
  },

  {
    id: 'nbr_landlord_nearby',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.neighborhoodTier === 'informal' &&
      G.age >= 18 && !G.mem?.slumLandlordMet,
    text: 'Your landlord is not a company. He is the man who lives in the proper-built house at the corner, whose brother owns the plot yours sits on. The rent is paid in cash, to his hand, on the first of the month. When the roof leaks he sends his nephew to patch it, eventually. When you are two weeks late he knocks before the month is out.',
    choices: [
      {
        text: 'Pay reliably — keep the peace',
        tag: null,
        outcome: 'It is the right calculation. He is not a bad man. He is a man who owns things.',
        effect: (p) => { p.setMem('slumLandlordMet', true); p.m -= 3; p.mo -= 200 },
      },
      {
        text: 'Negotiate — the roof has been leaking for months',
        tag: null,
        outcome: 'He concedes two weeks off next month. The roof is still not fixed.',
        effect: (p) => { p.setMem('slumLandlordMet', true); p.s += 3; p.karma += 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'nbr_thin_walls',
    phase: 'childhood',
    weight: 3,
    cooldown: 5,
    when: (G) =>
      G.neighborhoodTier === 'informal' && G.age >= 6 && G.age <= 16,
    text: 'The walls are corrugated iron, or concrete block without plaster, or plywood. You hear everything next door — the arguments, the radio programme, the crying that goes on and then stops. You learn to sleep through sound. You learn which sounds mean nothing and which ones mean something is happening that you should not hear.',
    choices: null,
    effect: (p) => { p.m -= 2; p.e += 2 },
  },

  {
    id: 'nbr_generator_envy',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.neighborhoodTier === 'informal' &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.generatorEnvyAck &&
      ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.archetype),
    text: 'The house at the corner has a generator. You know this because at eight o\'clock, when the power goes off for the whole neighbourhood, their lights stay on. The sound is diesel and grinding and constant. Your mother says to stop staring at their windows.',
    choices: null,
    effect: (p) => { p.setMem('generatorEnvyAck', true); p.m -= 3; p.e += 3; p.r += 2 },
  },

  {
    id: 'nbr_school_distance',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.neighborhoodTier === 'informal' &&
      G.age >= 7 && G.age <= 11 &&
      !G.mem?.schoolDistanceEvent &&
      G.ruralUrban === 'urban',
    text: 'The nearest school is four kilometres away. There is no school bus. You walk it twice a day, in shoes that fit and then stop fitting. In the rainy season the road through the lower section floods to the knee. Other children in your block do not go anymore.',
    choices: [
      {
        text: 'Keep going — every day, both directions',
        tag: null,
        outcome: 'You go. You are tired. You keep going.',
        effect: (p) => {
          p.setMem('schoolDistanceEvent', true)
          p.e += 5; p.h -= 2; p.m -= 3
          p.addFlag('first_gen_university_potential')
        },
      },
      {
        text: 'Drop to three days a week to earn something at home',
        tag: null,
        outcome: 'It is a practical decision. The schoolwork suffers. You do not know yet what that costs.',
        effect: (p) => {
          p.setMem('schoolDistanceEvent', true)
          p.e -= 5; p.mo += 200
        },
      },
    ],
    effect: null,
  },

  {
    id: 'nbr_gang_block',
    phase: 'adolescence',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.neighborhoodTier === 'informal' &&
      G.age >= 13 && G.age <= 18 &&
      !G.mem?.gangBlockEvent &&
      ['subsaharan', 'developing_urban', 'developing_unstable', 'conflict_zone'].includes(G.archetype),
    text: 'The group that controls the block is not officially anything. They collect something from the market sellers — for protection, they say — and they know which people on the block have money and which are respected and which can be pushed. They have started noticing you.',
    choices: [
      {
        text: 'Keep your head down and stay invisible',
        tag: null,
        outcome: 'Invisible is a skill. You develop it.',
        effect: (p) => { p.setMem('gangBlockEvent', true); p.m -= 5; p.s -= 2; p.addFlag('learned_silence') },
      },
      {
        text: 'Find ways to be useful to them without joining',
        tag: null,
        outcome: 'Proximity without membership. It buys safety and costs something harder to name.',
        effect: (p) => { p.setMem('gangBlockEvent', true); p.karma -= 5; p.s += 3; p.m -= 3 },
      },
      {
        text: 'Make clear you are not available',
        tag: null,
        outcome: 'Two uncomfortable months. Then they move their attention elsewhere.',
        effect: (p) => { p.setMem('gangBlockEvent', true); p.m -= 8; p.karma += 5 },
      },
    ],
    effect: null,
  },

  {
    id: 'nbr_government_upgrade',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.neighborhoodTier === 'informal' &&
      G.age >= 18 && !G.mem?.slumUpgradeEvent &&
      G.currentYear >= 1995,
    text: (G) => {
      const city = G.place?.name ?? G.capital
      return `A city council truck arrives with surveying equipment. Someone is going to lay a pipe — or pave the road, or install streetlights, or maybe all three. The project has been in planning for four years, according to the sign they put on the corner. Whether it will be finished is a different question. For the moment, ${city} is being improved.`
    },
    choices: null,
    effect: (p) => {
      p.setMem('slumUpgradeEvent', true)
      p.h += 5; p.m += 6; p.w += 3
      p.addFlag('neighbourhood_upgraded')
    },
  },

  {
    id: 'nbr_informal_home_business',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.neighborhoodTier === 'informal' &&
      G.age >= 20 && !G.mem?.homeBusinessStarted &&
      ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.archetype),
    text: 'You start something from the front room — a small thing. Braiding hair. Repairing phones. Selling cooked food on Friday evenings. The customers are neighbours at first, then their cousins. There is no sign, no registration, no account. There is a reputation, which is worth more.',
    choices: null,
    effect: (p) => {
      p.setMem('homeBusinessStarted', true)
      p.mo += 700; p.m += 7; p.s += 5
      p.addFlag('micro_entrepreneur')
    },
  },

  // ── WORKING CLASS TIER ─────────────────────────────────────────────────────

  {
    id: 'nbr_working_class_solidarity',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.neighborhoodTier === 'working_class' &&
      G.age >= 8 && G.age <= 14 && !G.mem?.wclassSolidAck,
    text: 'Everyone knows when you are sick because the woman from three houses down brings soup without being asked. Everyone knows when your mother loses her job because the rent discussion happens through the wall. Privacy is not what this neighbourhood offers. What it offers instead is that you are not alone with anything.',
    choices: null,
    effect: (p) => { p.setMem('wclassSolidAck', true); p.m += 6; p.s += 4 },
  },

  {
    id: 'nbr_working_class_noise',
    phase: 'childhood',
    weight: 2,
    cooldown: 5,
    when: (G) => G.neighborhoodTier === 'working_class' && G.age >= 8 && G.age <= 14,
    text: 'The block is loud in a specific way: the football on concrete, the argument three floors up, the motorbike that won\'t start, the music from the bar that opens at noon. Your parents worked hard for this flat and it is better than what came before it. The noise is a fact, not a complaint.',
    choices: null,
    effect: (p) => { p.m -= 2; p.e += 2 },
  },

  {
    id: 'nbr_moving_up_guilt',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      (G.neighborhoodTier === 'middle_class' || G.neighborhoodTier === 'elite') &&
      (G.flags.has('rural_to_urban') || G.flags.has('born_informal') || G.mem?.startedInformal) &&
      G.age >= 30 && !G.mem?.movingUpGuiltAck,
    text: (G) => {
      const origin = G.flags.has('rural_to_urban') ? 'the village' : 'the neighbourhood where you grew up'
      return `You drive past ${origin} for the first time in years. Nothing has changed, or the change is worse. The people you grew up with are still there. You are not. The new apartment is quiet and has hot water and this morning you forgot to appreciate it.`
    },
    choices: null,
    effect: (p) => { p.setMem('movingUpGuiltAck', true); p.m -= 4; p.r += 5; p.karma += 3 },
  },

  // ── ELITE TIER ─────────────────────────────────────────────────────────────

  {
    id: 'nbr_elite_isolation',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.neighborhoodTier === 'elite' &&
      G.age >= 8 && G.age <= 14 && !G.mem?.eliteIsoAck,
    text: 'The compound is walled. Outside the wall is the city and the city sounds — but muffled, as if a different life is being lived at a distance. The school you attend is also walled and gated. The children you know all live in places like this one. The world outside is something you see from cars.',
    choices: null,
    effect: (p) => { p.setMem('eliteIsoAck', true); p.m += 3; p.e += 3; p.r += 4 },
  },

  {
    id: 'nbr_elite_guilt_teen',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.neighborhoodTier === 'elite' &&
      G.age >= 14 && G.age <= 18 && !G.mem?.eliteGuiltTeen &&
      ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.archetype),
    text: 'You are driven to school past people who are walking to work. You are old enough to understand that this is not a neutral arrangement — that the wall around your compound represents something. You are not yet old enough to know what to do with that understanding.',
    choices: [
      {
        text: 'Sit with the discomfort — don\'t explain it away',
        tag: null,
        outcome: 'It stays with you. That is not a bad thing.',
        effect: (p) => { p.setMem('eliteGuiltTeen', true); p.m -= 3; p.karma += 5; p.setPolitical('left') },
      },
      {
        text: 'This is just how things are',
        tag: null,
        outcome: 'The thought closes before it fully opens. Later in life you will revisit it.',
        effect: (p) => { p.setMem('eliteGuiltTeen', true) },
      },
    ],
    effect: null,
  },

  // ── GENTRIFICATION / RETURN ────────────────────────────────────────────────

  {
    id: 'nbr_gentrification_return',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.age >= 35 && G.age <= 50 &&
      !G.mem?.gentrificationReturnAck &&
      (G.flags.has('rural_to_urban') || G.flags.has('neighbourhood_upgraded') || G.mem?.startedInformal),
    text: (G) => {
      const origin = G.place?.name ?? 'the old neighbourhood'
      return `You go back to ${origin} for something — a relative, an errand. The coffee place is new and its prices suggest it is not for the people who live nearby. The old market has been relicensed and rebuilt. The man who fixed shoes on the corner for twenty years has gone, and no one knows where.`
    },
    choices: null,
    effect: (p) => { p.setMem('gentrificationReturnAck', true); p.m -= 5; p.r += 5 },
  },

  {
    id: 'nbr_good_years_memory',
    phase: 'late_life',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.age >= 60 && !G.mem?.nbrGoodYearsAck &&
      (G.mem?.stallNeighborName || G.mem?.firstFriendName || G.mem?.hawkerRouteSet),
    text: (G) => {
      const name = G.mem?.stallNeighborName ?? G.mem?.firstFriendName ?? 'people you no longer see'
      return `You think about ${name} sometimes. The specific geography of an earlier life — the street, the light at a particular time of day, the sound of it. These things have stopped existing in the world but they exist exactly as they were inside you.`
    },
    choices: null,
    effect: (p) => { p.setMem('nbrGoodYearsAck', true); p.m += 5; p.r += 3 },
  },

]
