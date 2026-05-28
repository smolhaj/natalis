// Place-based events: family moves, internal migration, arrival texture.
// These fire when a character moves, changes neighborhoods, or lives in
// a place with specific conditions.

export const PLACES_EVENTS = [

  // ── FAMILY MOVES (childhood / adolescence) ─────────────────────────────────
  // Triggered by war, economic, career flags — the family moves and you go too.

  {
    id: 'place_family_war_move',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) => (G.flags.has('war_childhood') || G.flags.has('civil_war_lived') || G.flags.has('conflict_zone_childhood'))
      && G.place && !G.mem?.familyWarMoveAck,
    text: (G) => `The family leaves ${G.place?.name ?? 'home'}. Not all at once — first the bags, then the goodbyes, then the road. You are young enough that the adults shield you from the reason and old enough to understand it anyway. The place you are going has a name. The place you are leaving will become the one you keep returning to in memory.`,
    choices: null,
    effect: (p) => { p.r += 5; p.m -= 5; p.addFlag('family_displaced'); p.setMem('familyWarMoveAck', true) },
  },

  {
    id: 'place_family_career_move',
    phase: 'childhood',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('parent_promotion') && G.place && G.age >= 6 && !G.mem?.familyCareerMoveAck,
    text: (G) => `Your father gets a transfer. Your mother says: it's a good opportunity. You are old enough to have a best friend and to understand what leaving them means. The new place is ${G.place?.type === 'urban' ? 'bigger' : 'smaller'} than where you came from. You will spend the first year comparing everything to what you left.`,
    choices: [
      {
        text: 'Accept it. Commit to the new place.',
        tag: null,
        outcome: 'You make friends faster than you expected. The new place becomes real.',
        effect: (p) => { p.m += 3; p.s += 4; p.setMem('familyCareerMoveAck', true) },
      },
      {
        text: 'Resist it quietly. Hold on to what you had.',
        tag: 'resistant_to_change',
        outcome: 'The old friendships don\'t survive the distance. Neither do the comparisons, eventually.',
        effect: (p) => { p.r += 4; p.m -= 3; p.setMem('familyCareerMoveAck', true) },
      },
    ],
  },

  {
    id: 'place_family_poverty_move',
    phase: 'childhood',
    weight: 2,
    cooldown: 0,
    when: (G) => (G.flags.has('family_financial_crisis') || G.character?.familyStability === 'unstable')
      && G.place && G.age >= 5 && !G.mem?.familyPovertyMoveAck,
    text: (G) => `The rent becomes impossible. The family moves to a smaller place — a different part of ${G.place?.name ?? 'the city'}, or further out. The new address is a kind of fact you learn not to say out loud. You go to a different school. You start again.`,
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 4; p.addFlag('childhood_housing_instability'); p.setMem('familyPovertyMoveAck', true) },
  },

  {
    id: 'place_adolescent_neighborhood_change',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('relocated') && G.age >= 13 && G.age <= 17 && !G.mem?.adolRelocAck,
    text: (G) => {
      const nbr = G.neighborhood ?? G.place?.name ?? 'this place'
      return `${nbr} is not where you grew up. The references people make — the places, the names, the shorthand — are not yours yet. You are learning the geography of a new adolescence. Some things translate. Most don't.`
    },
    choices: null,
    effect: (p) => { p.r += 3; p.s -= 3; p.setMem('adolRelocAck', true) },
  },

  // ── RURAL TO CITY (young adult) ─────────────────────────────────────────────

  {
    id: 'place_rural_to_city_arrival',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) => G.flags.has('rural_to_urban') && G.place && ['urban', 'megacity', 'major_city', 'mid_city'].some(s => G.place.type === 'urban' || G.place.scale === s) && !G.mem?.ruralCityArrivalAck,
    text: (G) => {
      const city = G.place?.name ?? 'the city'
      const home = G.birthPlace?.name ?? 'home'
      return `${city} operates on a scale you didn't fully believe until you were in it. The street you grew up on in ${home} had names for everything and everyone. Here the scale makes that impossible. You are nobody here. This is the worst of it, and also the point.`
    },
    choices: [
      {
        text: 'Lean into the anonymity. Build something new.',
        tag: 'city_arrival_optimist',
        outcome: 'The city gives you what you came for — the chance to be someone it doesn\'t know yet.',
        effect: (p) => { p.m += 4; p.s += 3; p.e += 2; p.setMem('ruralCityArrivalAck', true) },
      },
      {
        text: 'Find others from home. Rebuild the familiar.',
        tag: null,
        outcome: 'The village network in the city is real. You are not alone. You are also not quite here yet.',
        effect: (p) => { p.m += 2; p.r += 3; p.setMem('ruralCityArrivalAck', true) },
      },
    ],
  },

  {
    id: 'place_rural_to_city_one_year',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('rural_to_urban') && G.age >= 20 && !G.mem?.ruralCityOneYearAck,
    text: (G) => {
      const city = G.cityName ?? G.place?.name ?? 'the city'
      return `A year in ${city}. You have a route now — the way you walk to work, the coffee place, the shortcut through the market. The city has stopped being abstract. You have opinions about which neighbourhoods have changed and which haven\'t, the way people who grew up here do. Something has shifted in the direction of home.`
    },
    choices: null,
    effect: (p) => { p.m += 4; p.s += 2; p.setMem('ruralCityOneYearAck', true) },
  },

  // ── NEIGHBORHOOD DEPTH ──────────────────────────────────────────────────────

  {
    id: 'place_informal_neighborhood_life',
    phase: null,
    weight: 2,
    cooldown: 12,
    when: (G) => G.neighborhoodTier === 'informal' && G.age >= 8,
    text: (G) => {
      const nbr = G.neighborhood ?? 'this neighbourhood'
      return `${nbr} has a logic that outsiders miss. Who owns which block of pavement. Where the water pressure is best in the morning. Which family has the generator when the power cuts. You know these things the way you know your own face. This knowledge is not nothing.`
    },
    choices: null,
    effect: (p) => { p.e += 2; p.s += 2 },
  },

  {
    id: 'place_informal_eviction_threat',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.neighborhoodTier === 'informal' && G.age >= 18 && !G.mem?.evictionThreatAck,
    text: (G) => {
      const nbr = G.neighborhood ?? 'the settlement'
      return `A notice goes up. The land the settlement is on has been sold to a developer, or rezoned, or the city wants to clear it for something else. The language is bureaucratic. The meaning is: leave. People gather to discuss what to do. Some have been here thirty years.`
    },
    choices: [
      {
        text: 'Join the residents\' committee. Fight it.',
        tag: 'community_organiser',
        outcome: 'You learn what it takes to fight a government decision. The outcome is uncertain. The education is permanent.',
        effect: (p) => { p.e += 3; p.karma += 4; p.m -= 2; p.setMem('evictionThreatAck', true) },
      },
      {
        text: 'Start looking for somewhere else.',
        tag: null,
        outcome: 'You move before the deadline. The new place costs more. You don\'t lose everything.',
        effect: (p) => { p.r += 4; p.mo -= 500; p.setMem('evictionThreatAck', true) },
      },
    ],
  },

  {
    id: 'place_working_class_neighborhood',
    phase: null,
    weight: 2,
    cooldown: 15,
    when: (G) => G.neighborhoodTier === 'working_class' && G.age >= 10,
    text: (G) => {
      const nbr = G.neighborhood ?? 'the street'
      const city = G.cityName ?? G.place?.name ?? 'the city'
      return `${nbr} in ${city}: the bus stops at 6am full of people going to work. The shops open at seven. On weekends the street fills up. Everyone knows roughly what everyone else earns. The ambitions here are concrete: a better flat, a car, a child at the good school. Nothing abstract. Nothing pretending.`
    },
    choices: null,
    effect: (p) => { p.m += 2 },
  },

  {
    id: 'place_elite_neighborhood_contrast',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.neighborhoodTier === 'elite' && !G.flags.has('born_elite') && G.age >= 30 && !G.mem?.eliteNbrAck,
    text: (G) => {
      const nbr = G.neighborhood ?? 'this part of the city'
      return `${nbr} is quiet in a way that money makes possible. The streets are clean not because people clean them more but because people here can afford to not make messes that stay. You have worked your way into a life that looks the same from the outside as the lives of people who were born to it. It looks the same. It isn't.`
    },
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2; p.setMem('eliteNbrAck', true) },
  },

  // ── PLACE TEXTURE ───────────────────────────────────────────────────────────

  {
    id: 'place_megacity_overwhelm',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.place?.scale === 'megacity' && G.age >= 18 && G.age <= 25 && !G.mem?.megacityOverwhelmAck,
    text: (G) => {
      const city = G.place?.name ?? 'the city'
      return `${city} contains more people than some countries. You are twenty-something and some days the scale of it — the endless buildings, the metro crowds at rush hour, the fact that you can walk for two hours and never leave it — tips from exciting into something else. It's not loneliness exactly. It's the specific vertigo of being very small in something very large.`
    },
    choices: null,
    effect: (p) => { p.r += 2; p.m -= 2; p.setMem('megacityOverwhelmAck', true) },
  },

  {
    id: 'place_village_knowledge',
    phase: 'childhood',
    weight: 2,
    cooldown: 0,
    when: (G) => G.place?.type === 'rural' && G.age >= 7 && !G.mem?.villageKnowledgeAck,
    text: (G) => {
      const place = G.place?.name ?? 'here'
      return `In ${place} everyone knows what you did last Tuesday. The privacy you will later want does not exist here, and neither does the loneliness. The village watches you grow up the way it watches the seasons, with matter-of-fact attention. This is its own kind of being held.`
    },
    choices: null,
    effect: (p) => { p.m += 3; p.s += 2; p.setMem('villageKnowledgeAck', true) },
  },

  {
    id: 'place_village_to_city_return',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('rural_to_urban') && G.birthPlace && G.age >= 35 && !G.mem?.villageReturnAck,
    text: (G) => {
      const home = G.birthPlace?.name ?? 'home'
      const city = G.cityName ?? G.place?.name ?? 'the city'
      return `You go back to ${home} for a visit. ${city} has changed you in ways that are invisible until you're standing in the place that hasn't changed. The road is the same width. The school is the same building. The distance between the well and the house is the same. You are not the same person who left, and the place is a mirror that shows you exactly how much.`
    },
    choices: null,
    effect: (p) => { p.r += 4; p.m += 3; p.setMem('villageReturnAck', true) },
  },

  {
    id: 'place_city_return_village',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.place?.type === 'rural' && G.birthPlace?.scale && ['megacity','major_city'].includes(G.birthPlace.scale) && G.age >= 35 && !G.mem?.cityReturnVillageAck,
    text: (G) => {
      const oldCity = G.birthPlace?.name ?? 'the city'
      const newPlace = G.place?.name ?? 'here'
      return `You left ${oldCity} for ${newPlace}. People said: you'll miss it. You do, sometimes — the restaurants, the museums, the specific anonymity. But you sleep better here. The morning is quieter. There is a pace to the days that the city would not have given you. You have stopped explaining to people why you came.`
    },
    choices: null,
    effect: (p) => { p.m += 5; p.h += 3; p.setMem('cityReturnVillageAck', true) },
  },

  // ── NEIGHBORHOOD MOVE (wealth threshold crossing) ──────────────────────────

  {
    id: 'place_moving_up_neighborhood',
    phase: null,
    weight: 2,
    cooldown: 0,
    when: (G) => (G.flags.has('wealth_increased') || G.stats.wealth > 70) && G.neighborhoodTier === 'working_class' && G.age >= 25 && !G.mem?.movingUpNbrAck,
    text: (G) => {
      const old = G.neighborhood ?? 'the old place'
      return `You can afford somewhere better now. The process of leaving ${old} is strange — going back to collect things, seeing it smaller than memory made it. The new place is nicer. The new neighbours don't know you yet. Some things leave faster than you expected. Some things you miss that you didn't think you would.`
    },
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('movingUpNbrAck', true) },
  },

  {
    id: 'place_moving_down_neighborhood',
    phase: null,
    weight: 2,
    cooldown: 0,
    when: (G) => (G.flags.has('bankruptcy') || G.flags.has('financial_ruin') || G.stats.wealth < 20) && G.neighborhoodTier === 'middle_class' && G.age >= 30 && !G.mem?.movingDownNbrAck,
    text: (G) => {
      const old = G.neighborhood ?? 'where you were'
      return `The finances make ${old} impossible. The move to a cheaper place is practical. You do it without drama, because the drama is internal — the specific recalibration of who you thought you were becoming, now measured against where you actually are. The new street is fine. You just didn\'t expect to be here.`
    },
    choices: null,
    effect: (p) => { p.r += 6; p.m -= 5; p.setMem('movingDownNbrAck', true) },
  },

  // ── CAREER + PLACE INCOMPATIBILITY ─────────────────────────────────────────

  {
    id: 'place_career_requires_city',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.place?.type === 'rural' && G.career && ['software_developer','data_scientist','finance','lawyer','journalist','content_creator'].includes(G.career?.id) && G.age >= 20 && !G.mem?.careerCityPullAck,
    text: (G) => {
      const career = G.career?.title ?? 'this kind of work'
      const city = G.cityName ?? 'a city'
      return `${career} exists in ${city}. Not here. There are things you can do remotely and things you can\'t, and the things you can\'t are still where the real opportunities concentrate. You\'ve been managing the distance. It\'s starting to cost something.`
    },
    choices: [
      {
        text: 'Accept that you need to move.',
        tag: 'career_drove_move',
        outcome: 'The move is practical. The career accelerates. The place you left takes on a different quality in memory.',
        effect: (p) => { p.e += 4; p.w += 3; p.setMem('careerCityPullAck', true) },
      },
      {
        text: 'Stay. Build something here instead.',
        tag: 'stayed_for_place',
        outcome: 'You find a version of the work that fits here. It isn\'t the same version. It\'s yours.',
        effect: (p) => { p.m += 4; p.r += 2; p.setMem('careerCityPullAck', true) },
      },
    ],
  },

  {
    id: 'place_farming_career_place_fit',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.place?.type === 'rural' && G.career?.id === 'farmer' && G.age >= 22 && !G.mem?.farmingPlaceFitAck,
    text: (G) => {
      const place = G.place?.name ?? 'here'
      return `The land in ${place} is what your work is about. Not an abstraction, not a career path — the actual ground, the specific water table, the weather patterns you can now read before the forecast confirms them. Most people you know from school work in offices in other cities. You are here. You know things they don\'t.`
    },
    choices: null,
    effect: (p) => { p.m += 4; p.e += 3; p.setMem('farmingPlaceFitAck', true) },
  },

  // ── PLACE IDENTITY ──────────────────────────────────────────────────────────

  {
    id: 'place_stranger_in_city',
    phase: 'young_adult',
    weight: 2,
    cooldown: 10,
    when: (G) => G.flags.has('emigrated') && G.age >= 20 && G.age <= 35,
    text: (G) => {
      const city = G.cityName ?? G.place?.name ?? 'this city'
      return `${city} is still not entirely yours. There are jokes you don\'t quite catch, references to things that happened before you arrived, ways of standing in a queue that mark you. You are getting better at all of it. You are also aware, in a way you weren\'t at first, that \'getting better at it\' is a permanent project rather than something that ends.`
    },
    choices: null,
    effect: (p) => { p.r += 2; p.e += 2 },
  },

  {
    id: 'place_long_term_belonging',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => !G.flags.has('relocated') && G.birthPlace && G.place?.id === G.birthPlace?.id && G.age >= 40 && !G.mem?.longTermBelongingAck,
    text: (G) => {
      const place = G.place?.name ?? 'here'
      return `You have lived in ${place} your entire life. There are people here who have known you since you were eight years old. When something happens to you, people here know about it before you\'ve decided how to talk about it. This is sometimes a constraint and sometimes the opposite of lonely. More often it is both at once.`
    },
    choices: null,
    effect: (p) => { p.m += 4; p.s += 2; p.setMem('longTermBelongingAck', true) },
  },

  {
    id: 'place_multiple_homes',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('emigrated') && G.flags.has('relocated') && G.age >= 35 && !G.mem?.multipleHomesAck,
    text: (G) => {
      const birth = G.birthPlace?.name ?? 'where you were born'
      const now = G.place?.name ?? 'here'
      return `Someone asks where you\'re from and you hesitate in a way that used to feel like a problem. ${birth} is one answer. ${now} is another. There are habits you carry from each, and things you miss from each, and you have stopped ranking them.`
    },
    choices: null,
    effect: (p) => { p.m += 3; p.e += 2; p.setMem('multipleHomesAck', true) },
  },

  // ── HISTORICAL FAMILY DISPLACEMENT ─────────────────────────────────────────

  {
    id: 'place_partition_displacement',
    phase: 'early_childhood',
    weight: 3,
    cooldown: 0,
    when: (G) => G.flags.has('partition_survived') && !G.mem?.partitionDisplacementAck,
    text: (G) => `The family came here from somewhere else. The word for what happened changes depending on who is telling the story. You know the name of the city they left. You know the name of the street. You have never been there. Your parents say: it doesn\'t matter now. Their hands say something different when they say it.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.addFlag('family_displaced'); p.setMem('partitionDisplacementAck', true) },
  },

  {
    id: 'place_refugee_first_permanent_address',
    phase: null,
    weight: 3,
    cooldown: 0,
    when: (G) => G.flags.has('refugee') && G.flags.has('resettlement_established') && G.place && !G.mem?.refugeeAddressAck,
    text: (G) => {
      const place = G.place?.name ?? 'this place'
      const nbr = G.neighborhood ?? ''
      return `${place}${nbr ? ` — ${nbr}` : ''}. This address is yours. For the first time in years, a letter with this address on it will reach you. The bureaucracy of this is not small: without an address you are administrative air, you exist nowhere the system can see. Now you are findable. This is the infrastructure of existing.`
    },
    choices: null,
    effect: (p) => { p.m += 6; p.setMem('refugeeAddressAck', true) },
  },

]
