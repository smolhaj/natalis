// events_climate.js
// Climate arc events — BUILD 8
// Character events (not world events) covering 2015–2100.
// Branches on archetype and country to reflect unequal lived experience of climate change.

export const CLIMATE_EVENTS = [

  // ── AWARENESS AND GENERATION ─────────────────────────────────────────────────

  {
    id: 'clim_hottest_summer',
    phase: null,
    weight: 5,
    when: (G) =>
      G.currentYear >= 2025 && G.currentYear <= 2040 &&
      G.age >= 12 &&
      !G.mem?.climHottestSummer,
    text: (G) => {
      const arch = G.currentCountry?.archetype ?? G.character.country.archetype
      const country = G.currentCountry?.name ?? G.character.country.name
      const isGulf = ['United Arab Emirates', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Oman'].includes(country)
      const isDev = ['subsaharan', 'developing_unstable', 'developing_urban', 'conflict_zone'].includes(arch)
      if (isGulf) {
        return 'Forty-nine degrees for two weeks. The old men say they have never felt anything like it. The outdoor workers are on mandatory rest from ten in the morning until four. Three die anyway — unofficial, unreported. The air conditioning runs continuously through the night and the city hums.'
      } else if (isDev) {
        return 'The harvest comes in thin. The rains were a month late and two weeks short. The price of millet in the market has doubled since January and the gap between the portion that was normal and the portion that is possible is widening. Children eat last in every house you know.'
      } else {
        return 'The hottest summer since records began, the meteorologists say. It is the eighth year in a row they have said a version of this sentence. The surprise has run out. Elderly relatives are checked on. The garden is mostly dead by August. Life continues, adjusted.'
      }
    },
    choices: null,
    effect: (p) => { p.m -= 4; p.addFlag('climate_generation'); p.setMem('climHottestSummer', true); },
  },

  {
    id: 'clim_climate_anxiety',
    phase: null,
    weight: 4,
    when: (G) =>
      G.currentYear >= 2015 &&
      G.age >= 15 && G.age <= 30 &&
      ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype) &&
      !G.mem?.climClimateAnxiety,
    text: 'You are the first generation with the data and the deadlines. The IPCC reports are specific about the windows remaining. The grief is real but has no body — it is loss of something not dead yet, a pre-emptive mourning for a world still mostly intact. You see it in your friends too, though no one has a clean name for it.',
    choices: [
      {
        text: 'Get involved — channel it into action',
        tag: null,
        outcome: 'You find a group. The meetings are not always useful. The people are. There is something in being around others who refuse the alternative of not trying.',
        effect: (p) => { p.m += 3; p.s += 5; p.karma += 8; p.addFlag('climate_activist'); p.setMem('climClimateAnxiety', true); },
      },
      {
        text: 'Live with it — grief is not the same as paralysis',
        tag: null,
        outcome: 'You do not march. You make smaller changes in the life you actually have. Whether this counts for something, you genuinely do not know.',
        effect: (p) => { p.m -= 3; p.addFlag('climate_generation'); p.setMem('climClimateAnxiety', true); },
      },
      {
        text: 'Tune it out — survival requires some compartmentalization',
        tag: null,
        outcome: 'The news stays off. The reports stay unread. You know what you are doing. You do it anyway.',
        effect: (p) => { p.m += 2; p.r += 6; p.setMem('climClimateAnxiety', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'clim_activist_decade',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.includes('climate_activist') &&
      G.age >= 35 &&
      !G.mem?.climActivistDecade,
    text: 'Fifteen years. Some things moved — the legislation, the investment figures, the international agreements. Most things did not move enough, and you knew this while they were moving. You are not the person who gave up and not the person who won. You are the person still in the room, which is its own specific category.',
    choices: null,
    effect: (p) => { p.karma += 10; p.m -= 3; p.setMem('climActivistDecade', true); },
  },

  // ── FOOD AND AGRICULTURE ──────────────────────────────────────────────────────

  {
    id: 'clim_food_prices',
    phase: null,
    weight: 4,
    when: (G) =>
      G.currentYear >= 2028 && G.currentYear <= 2050 &&
      G.age >= 18 &&
      ['subsaharan', 'developing_unstable', 'developing_urban'].includes(G.character.country.archetype) &&
      !G.mem?.climFoodPrices,
    text: 'Three bad harvests, two of them in a row. Maize has doubled in the market. The portion that was normal a year ago is becoming smaller each year — not dramatically, not quickly enough to name as crisis, just incrementally smaller, like a tide going out. Your grandmother says the rains used to come differently.',
    choices: [
      {
        text: 'Learn the old methods — the grandmother\'s way, the kitchen garden',
        tag: null,
        outcome: 'The plot behind the house produces something. Not enough to matter in aggregate. Enough to matter on the days it matters.',
        effect: (p) => { p.h -= 2; p.karma += 5; p.addFlag('climate_adaptation'); p.setMem('climFoodPrices', true); },
      },
      {
        text: 'Absorb the cost and adapt what you can',
        tag: null,
        outcome: 'The budget is reorganised around new prices. Some things are cut. Life continues differently.',
        effect: (p) => { p.h -= 2; p.mo -= 500; p.m -= 4; p.setMem('climFoodPrices', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'clim_drought_severe',
    phase: null,
    weight: 4,
    when: (G) =>
      G.currentYear >= 2040 &&
      G.age >= 18 &&
      ['subsaharan', 'developing_unstable'].includes(G.character.country.archetype) &&
      G.ruralUrban === 'rural' &&
      !G.mem?.climDroughtSevere,
    text: 'The well does not refill this year. Not low — empty. Your grandfather says he has not seen this in eighty years, and he is not a man who exaggerates. You dig deeper and find salt water. The cattle are thinning. The land that was your family\'s living is not refusing you in a way that can be fixed with effort.',
    choices: [
      {
        text: 'Stay — this land has survived worse',
        tag: null,
        outcome: 'It does not survive this. By the following season you leave anyway, with less than you would have had if you had gone when there was still time to prepare.',
        effect: (p) => { p.m -= 10; p.h -= 8; p.w -= 8; p.mo -= 1000; p.r += 5; p.addFlag('climate_displaced'); p.addFlag('rural_to_urban'); p.setResidency('climate_displaced'); p.setMem('climDroughtSevere', true); },
      },
      {
        text: 'Leave for the city before the choice is made for you',
        tag: null,
        outcome: 'You go. The decision is yours to have made, which is not nothing. What you go to is unclear. What you left is clear.',
        effect: (p) => { p.m -= 6; p.addFlag('climate_displaced'); p.addFlag('rural_to_urban'); p.setResidency('climate_displaced'); p.setMem('climDroughtSevere', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'clim_displaced_year_later',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.includes('climate_displaced') &&
      G.age >= 25 &&
      !G.mem?.climDisplacedYearLater,
    text: 'A year into the city. Work of a kind — informal, unreliable, paying less than you need. A room with two or three others. You call home less than you used to, because the news from home is always the same news. The word for what happened to your land does not exist in the language of the city. You use the word drought. It is not wrong. It is not complete.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 5; p.setMem('climDisplacedYearLater', true); },
  },

  // ── COASTAL AND FLOODING ───────────────────────────────────────────────────────

  {
    id: 'clim_coastal_flood',
    phase: null,
    weight: 4,
    when: (G) => {
      const country = G.currentCountry?.name ?? G.character.country.name
      const coastals = ['Bangladesh', 'Vietnam', 'Indonesia', 'Philippines', 'Egypt', 'Nigeria',
        'Mozambique', 'Netherlands', 'United Kingdom', 'United States', 'Japan',
        'South Korea', 'Australia', 'France', 'Italy', 'Sri Lanka']
      return G.currentYear >= 2035 &&
        G.age >= 18 &&
        coastals.includes(country) &&
        !G.mem?.climCoastalFlood
    },
    text: (G) => {
      const arch = G.currentCountry?.archetype ?? G.character.country.archetype
      const isWealthy = ['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(arch)
      if (isWealthy) {
        return 'A levy upgrade is being proposed. A council meeting on flood risk management. The engineer presents models. The question is not whether the water will come higher but how much it will cost to keep it out and who pays. The answer, as these things go, is: everyone, unevenly.'
      } else {
        return 'The lower rooms are unusable for three months this year. The sandbags arrived late, which is their habit. Your grandmother has lived in this house for fifty years and refuses to leave it. You do not argue with her about this, because the argument has no winning side. The water line on the wall is higher than last year\'s mark.'
      }
    },
    choices: null,
    effect: (p) => { p.m -= 6; p.h -= 3; p.addFlag('climate_generation'); p.setMem('climCoastalFlood', true); },
  },

  // ── WITNESS AND DISPLACEMENT ───────────────────────────────────────────────────

  {
    id: 'clim_displacement_witness',
    phase: null,
    weight: 4,
    when: (G) =>
      G.currentYear >= 2040 &&
      G.age >= 25 &&
      !G.mem?.climDisplacementWitness,
    text: (G) => {
      const arch = G.currentCountry?.archetype ?? G.character.country.archetype
      const isWealthy = ['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(arch)
      if (isWealthy) {
        return 'Families are arriving from the coast, from the delta regions, from the islands. The phrase climate refugee is technically accurate and legally meaningless — it is not a recognised category under international law. Governments debate what to call them while the camps grow. The people in the camps use the word home for a place they cannot return to.'
      } else {
        return 'Families are coming from the north — from villages where the land is sand now, which is not a metaphor. They arrive with very little and settle where they can. The city is not designed for this number. Nobody\'s city was designed for this number.'
      }
    },
    choices: [
      {
        text: 'Help — time, money, whatever you have to give',
        tag: null,
        outcome: 'You give what you can. It is not nothing. It is also not enough, and you know this while you give it.',
        effect: (p) => { p.karma += 8; p.mo -= 300; p.addFlag('climate_solidarity'); p.setMem('climDisplacementWitness', true); },
      },
      {
        text: 'This is not something one person can solve',
        tag: null,
        outcome: 'You watch. You feel the weight of watching. There is a word for this and the word is also inadequate.',
        effect: (p) => { p.r += 5; p.m -= 3; p.setMem('climDisplacementWitness', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'clim_climate_solidarity_payoff',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.includes('climate_solidarity') &&
      G.age >= 40 &&
      !G.mem?.climSolidarityPayoff,
    text: 'The family you helped is five years settled. The eldest child goes to school here now. You receive a message once a year, at Eid or Christmas or New Year depending on the year and the sender\'s mood. It is a small thing. It persists, which is more than you expected.',
    choices: null,
    effect: (p) => { p.karma += 6; p.m += 5; p.setMem('climSolidarityPayoff', true); },
  },

  // ── ECONOMIC AND INSURANCE ────────────────────────────────────────────────────

  {
    id: 'clim_insurance_cancel',
    phase: null,
    weight: 3,
    when: (G) =>
      G.currentYear >= 2035 &&
      G.age >= 30 &&
      ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype) &&
      G.flags.includes('property_owner') &&
      !G.mem?.climInsuranceCancel,
    text: 'A letter from the insurance company. They are withdrawing flood coverage from properties in your postcode. The reason for the decision is, the letter says, actuarial. The reason is also visible from your front door. The letter uses the phrase structural reassessment of risk and does not use the phrase we are leaving before the cost of staying exceeds the profit, which is what it means.',
    choices: null,
    effect: (p) => { p.m -= 8; p.w -= 6; p.addFlag('climate_financial_loss'); p.setMem('climInsuranceCancel', true); },
  },

  {
    id: 'clim_carbon_sink',
    phase: null,
    weight: 2,
    when: (G) =>
      G.currentYear >= 2050 &&
      G.age >= 30 &&
      ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype) &&
      !G.mem?.climCarbonSink,
    text: 'Your country has, technically, reached net zero. The calculation involves offsets — forests in another hemisphere, carbon capture machines that work less efficiently than the project design documents promised. The scientists call it necessary progress. The activists call it accounting. The atmosphere processes neither press releases nor intentions, only molecules.',
    choices: null,
    effect: (p) => { p.m -= 2; p.e += 2; p.setMem('climCarbonSink', true); },
  },

  // ── EXTREME HEAT ───────────────────────────────────────────────────────────────

  {
    id: 'clim_gulf_summer',
    phase: null,
    weight: 5,
    when: (G) => {
      const country = G.currentCountry?.name ?? G.character.country.name
      const gulfCountries = ['United Arab Emirates', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Oman']
      return G.currentYear >= 2050 &&
        G.age >= 12 &&
        gulfCountries.includes(country) &&
        !G.mem?.climGulfSummer
    },
    text: 'Wet-bulb temperature in August. The human body cannot cool itself through sweating when the combination of heat and humidity crosses a threshold, and this August it has crossed it. Outdoor workers are ordered inside. Construction halts for six weeks. The migrant workers who came here on contracts that did not anticipate this specific risk are the ones who cannot afford to leave. Some of them are found in containers.',
    choices: [
      {
        text: 'Consider leaving — this city was not built for what it is becoming',
        tag: null,
        outcome: 'The thought becomes a plan, then a question of when rather than whether. The heat will not improve.',
        effect: (p) => { p.m -= 8; p.addFlag('climate_displacement_risk'); p.setMem('climGulfSummer', true); },
      },
      {
        text: 'Adapt — the infrastructure is here, the life is here',
        tag: null,
        outcome: 'You remain. You plan around the summers. The cost of air conditioning is a cost of existence in this place now.',
        effect: (p) => { p.h -= 5; p.m -= 10; p.addFlag('climate_adaptation'); p.setMem('climGulfSummer', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'clim_heat_dome',
    phase: null,
    weight: 4,
    when: (G) =>
      G.currentYear >= 2045 &&
      G.age >= 30 &&
      !G.mem?.climHeatDome,
    text: (G) => {
      const arch = G.currentCountry?.archetype ?? G.character.country.archetype
      const isWealthy = ['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(arch)
      if (isWealthy) {
        return 'A heat dome sits over the region for three weeks. The hospitals are overwhelmed. Most of the dead are elderly and alone. The word unprecedented is used again. It is no longer, technically, unprecedented — this is the fourth such event in twelve years — but the word keeps appearing in the official statements as if repetition does not affect its meaning.'
      } else {
        return 'Forty-seven degrees for twelve days. No air conditioning. The generators failed on the third day. People carried ice from wherever ice could be found for elderly relatives. The children were kept in the coolest room. Several people in the quarter did not survive the week. This is not classified as a natural disaster in the sense that it was not unforeseeable or unprevented.'
      }
    },
    choices: null,
    effect: (p) => { p.h -= 6; p.m -= 8; p.addFlag('climate_generation'); p.setMem('climHeatDome', true); },
  },

  // ── ECOLOGICAL LOSS ───────────────────────────────────────────────────────────

  {
    id: 'clim_reef_bleaching',
    phase: null,
    weight: 3,
    when: (G) => {
      const country = G.currentCountry?.name ?? G.character.country.name
      const reefCountries = ['Australia', 'Philippines', 'Indonesia', 'Egypt', 'Saudi Arabia', 'Maldives', 'Fiji']
      return G.currentYear >= 2030 &&
        G.age >= 15 &&
        reefCountries.includes(country) &&
        !G.mem?.climReefBleaching
    },
    text: 'The reef has bleached for the fourth consecutive year. White means dead — the coral expelled its algae because the water was too warm and without the algae there is only the white calcium structure, beautiful and empty. You have a photograph from when you were young. The photograph and the current reef are not the same place, and there is no mechanism by which the photograph\'s version is recovered.',
    choices: null,
    effect: (p) => { p.m -= 5; p.addFlag('climate_generation'); p.setMem('climReefBleaching', true); },
  },

  // ── ISLAND NATIONS AND EXISTENTIAL GEOGRAPHY ──────────────────────────────────

  {
    id: 'clim_pacific_king_tides',
    phase: null,
    weight: 6,
    when: (G) => {
      const currentCountry = G.currentCountry?.name ?? G.character.country.name
      const birthCountry = G.character.country.name
      const pacificNations = ['Maldives', 'Tuvalu', 'Kiribati', 'Marshall Islands', 'Fiji', 'Vanuatu']
      return G.currentYear >= 2035 &&
        G.age >= 10 &&
        (pacificNations.includes(currentCountry) || pacificNations.includes(birthCountry)) &&
        !G.mem?.climPacificKingTides
    },
    text: 'The king tides are coming higher. The old marks on the harbour wall show what they used to reach. The current tides pass both marks and it is not a king tide. The government has bought land in Fiji, in New Zealand — land in other countries, in case. You are fifteen and the land you stand on has a date. Nobody says this at school. The land knows.',
    choices: null,
    effect: (p) => { p.m -= 8; p.addFlag('existential_homeland'); p.addFlag('climate_generation'); p.setMem('climPacificKingTides', true); },
  },

  {
    id: 'clim_existential_homeland_adult',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.includes('existential_homeland') &&
      G.age >= 25 &&
      !G.mem?.climExistentialAdult,
    text: 'You are abroad now, or you are still there watching it. Either way you carry a fact that most people in the world have never had to carry: the place you are from will not exist in its current form for your children to return to. The loss has a name now. Climate displacement. Climate refugee. The names are new. The loss predates them.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 8; p.setMem('climExistentialAdult', true); },
  },

  // ── SOCIAL AND POLITICAL TEXTURE ──────────────────────────────────────────────

  {
    id: 'clim_climate_migration_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2045 &&
      G.age >= 35 && G.age <= 55 &&
      !G.mem?.climMigrationMidlife,
    text: 'A colleague arrived last year from a city that is no longer livable in summer. A family on your street came from a coastal delta that is no longer reliably above water. The phrase climate refugee still sits awkwardly in most people\'s mouths, including yours. The language is catching up to the reality. The reality does not wait for the language.',
    choices: null,
    effect: (p) => { p.m -= 3; p.addFlag('climate_generation'); p.setMem('climMigrationMidlife', true); },
  },

  // ── LATE LIFE WITNESS ─────────────────────────────────────────────────────────

  {
    id: 'clim_late_life_witness',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.currentYear >= 2070 &&
      !G.mem?.climLateLifeWitness,
    text: (G) => {
      const arch = G.currentCountry?.archetype ?? G.character.country.archetype
      const isWealthy = ['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(arch)
      if (isWealthy) {
        return 'When you were born, climate change was a projection. Scientists had models; politicians had meetings. Now it is the organising fact of your grandchildren\'s lives — which routes are safe, which crops still grow here, which cities are still above water. You lived through the in-between decades, the ones when the decisions were still theoretically available. You are not certain what that means you are responsible for. The question does not leave you.'
      } else {
        return 'Your grandchildren ask what the land looked like when the rains still came on schedule. You describe the colour of the sorghum in a good year. The smell of the red clay after the first rain of the season. The sound the birds made before the trees thinned. They cannot imagine it. You understand that you are describing something that is gone, and that you are one of the last people who saw it.'
      }
    },
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 8; p.setMem('climLateLifeWitness', true); },
  },

]
