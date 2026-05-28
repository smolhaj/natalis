// Infrastructure events: power cuts, floods, traffic, air quality, water shortage.
// Universal recurring texture (cooldown 6–8) + one-time escalation choice per category.
// Gated on G.currentCountry?.name and G.place type/scale.

const POWER_CUT_COUNTRIES = new Set([
  'Nigeria', 'Lebanon', 'Zimbabwe', 'Pakistan', 'Bangladesh', 'Iraq',
  'Sudan', 'South Africa', 'Venezuela', 'Myanmar', 'Ghana', 'Ethiopia',
  'Nepal', 'Kenya', 'Tanzania', 'Uganda', 'Cameroon', 'Zambia',
])

const FLOOD_COUNTRIES = new Set([
  'Bangladesh', 'Nigeria', 'India', 'Indonesia', 'Philippines',
  'Vietnam', 'Thailand', 'Cambodia', 'Pakistan', 'Ghana',
  'Mozambique', 'Sierra Leone', 'Myanmar', 'Honduras', 'Haiti',
])

const HIGH_TRAFFIC_COUNTRIES = new Set([
  'Nigeria', 'Indonesia', 'Thailand', 'Mexico', 'Egypt', 'India',
  'Bangladesh', 'Pakistan', 'Kenya', 'Ethiopia', 'Philippines',
  'Ghana', 'Iran', 'Turkey', 'Brazil', 'Colombia',
])

const AIR_QUALITY_COUNTRIES = new Set([
  'India', 'China', 'Pakistan', 'Bangladesh', 'Iran', 'Egypt',
  'Nigeria', 'Indonesia', 'Ghana', 'Mongolia',
])

const WATER_STRESS_COUNTRIES = new Set([
  'South Africa', 'India', 'Pakistan', 'Jordan', 'Morocco',
  'Algeria', 'Egypt', 'Yemen', 'Iran', 'Kenya', 'Ethiopia',
  'Zimbabwe', 'Libya', 'Tunisia',
])

export const INFRASTRUCTURE_EVENTS = [

  // ── POWER CUTS ────────────────────────────────────────────────────────────────

  {
    id: 'infra_power_cut',
    phase: 'midlife',
    weight: 4,
    cooldown: 7,
    when: (G) =>
      POWER_CUT_COUNTRIES.has(G.currentCountry?.name) &&
      G.place?.type === 'urban',
    text: (G) => {
      const city = G.place?.name ?? G.currentCountry?.name
      const cn = G.currentCountry?.name
      if (cn === 'Nigeria') return `NEPA takes the light at half past seven. The generator at the shop across the road whines to life; yours does not. You sit in the heat of ${city} waiting for the power to return, which it will, at some point, which is all anyone can say.`
      if (cn === 'Lebanon') return `The municipality electricity runs four hours today, two more than yesterday. The building generator covers the gap but the fuel cost appears in next month's bill. Everyone in ${city} is an electrician now — fluent in inverters, amperes, the calculation of what the building can run simultaneously.`
      if (cn === 'Zimbabwe') return `The load-shedding schedule said eighteen hours today. It said eight hours last week. No one keeps the schedule anymore. You keep candles.`
      if (cn === 'Pakistan') return `Twelve hours on, twelve off. The WAPDA schedule is posted and observed loosely. You time the cooking, the charging, the laundry around the hours when power will actually come.`
      if (cn === 'South Africa') return `Stage 4 load-shedding: four hours on, four hours off. Eskom's schedule has its own app now, which is something, though the app is not always right. The inverter beeps when the power cuts. After a while you stop hearing it.`
      return `The electricity goes out again. In ${city} this is weather — you plan around it, you remember which businesses have generators, you keep the phone charged before noon.`
    },
    choices: null,
    effect: (p) => { p.m -= 3; p.h -= 1; },
  },

  {
    id: 'infra_power_cut_escalation',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      POWER_CUT_COUNTRIES.has(G.currentCountry?.name) &&
      G.place?.type === 'urban' &&
      !G.mem?.powerEscalated,
    text: (G) => {
      const city = G.place?.name ?? G.currentCountry?.name
      return `The power has been out for three days — not load-shedding but a fault somewhere in the ${city} grid that the utility does not have parts to repair quickly. The freezer is lost. The water pump needs electricity. You are making decisions you did not expect to make this week.`
    },
    choices: [
      {
        text: 'Buy a generator. The cost is significant.',
        tag: 'generator_owner',
        outcome: 'The generator is loud and the fuel expensive. But the refrigerator works, and the children sleep.',
        effect: (p) => { p.mo -= 1200; p.m += 5; p.addFlag('generator_owner'); p.setMem('powerEscalated', true) },
      },
      {
        text: "Stay with relatives outside the city until the fault is repaired.",
        tag: null,
        outcome: 'Three days with family. The power returns while you are away.',
        effect: (p) => { p.m += 4; p.s += 2; p.setMem('powerEscalated', true) },
      },
      {
        text: 'Adapt. You have adapted to worse.',
        tag: null,
        outcome: 'You learn which hours are coolest, which neighbors have power, which foods keep without refrigeration. It works.',
        effect: (p) => { p.m -= 4; p.h -= 2; p.e += 3; p.setMem('powerEscalated', true) },
      },
    ],
  },

  // ── FLOOD SEASON ──────────────────────────────────────────────────────────────

  {
    id: 'infra_flood_season',
    phase: 'midlife',
    weight: 3,
    cooldown: 6,
    when: (G) =>
      FLOOD_COUNTRIES.has(G.currentCountry?.name) &&
      G.place?.type === 'urban',
    text: (G) => {
      const city = G.place?.name ?? G.currentCountry?.name
      const cn = G.currentCountry?.name
      if (cn === 'Bangladesh') return `The monsoon water comes through the floor drain first, then under the door. Half the neighborhood is knee-deep by morning. This is annual — the furniture goes up on bricks in June, comes back down in September. The children know which routes are still passable.`
      if (cn === 'India') return `The monsoon arrives in ${city} and the city wades. The trains stop when the tracks go under. The office will open when the water falls enough to walk in. It always has, and it always does.`
      if (cn === 'Nigeria') return `The July floods have come again. The drainage cannot carry it — the drains were designed for a smaller city — so it spreads into the streets and the low-lying compounds. You wait for it to recede.`
      if (cn === 'Philippines') return `The typhoon season has come. The flood lines on the walls from previous years are already marked in pencil. You know exactly how high the water came in 2012, in 2009, in 2006.`
      return `The rains came harder than expected. The low parts of ${city} are flooded — enough to close roads, delay everything, remind everyone that the city is built on something that remembers water.`
    },
    choices: null,
    effect: (p) => { p.m -= 4; p.h -= 2; },
  },

  {
    id: 'infra_flood_escalation',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      FLOOD_COUNTRIES.has(G.currentCountry?.name) &&
      G.place?.type === 'urban' &&
      !G.mem?.floodEscalated,
    text: () =>
      `This year's flood is not the ordinary flood. The water is chest-high in the street by midnight. The neighbors are on their roofs. Your ground-floor room is gone. You have until morning to decide what to do.`,
    choices: [
      {
        text: 'Get your family out. Go to higher ground now.',
        tag: null,
        outcome: 'You leave with what fits in a bag. The house is badly damaged when the water falls. The things you left are gone.',
        effect: (p) => { p.m -= 6; p.h += 3; p.addFlag('flood_survivor'); p.setMem('floodEscalated', true) },
      },
      {
        text: 'Stay on the roof and protect the house.',
        tag: null,
        outcome: 'You spend the night on the roof with the documents and food. The water reaches the second step and stops. In the morning you begin clearing.',
        effect: (p) => { p.m -= 8; p.h -= 4; p.addFlag('flood_survivor'); p.setMem('floodEscalated', true) },
      },
      {
        text: 'Help the family next door — they have a small child.',
        tag: null,
        outcome: 'You help them out before you attend to your own things. It takes until dawn. Your own room you sort later.',
        effect: (p) => { p.m -= 4; p.karma += 6; p.addFlag('flood_survivor'); p.setMem('floodEscalated', true) },
      },
    ],
  },

  // ── TRAFFIC TIME-POVERTY ──────────────────────────────────────────────────────

  {
    id: 'infra_traffic_grind',
    phase: 'midlife',
    weight: 3,
    cooldown: 7,
    when: (G) =>
      HIGH_TRAFFIC_COUNTRIES.has(G.currentCountry?.name) &&
      (G.place?.scale === 'megacity' || G.place?.scale === 'major_city') &&
      !!G.career,
    text: (G) => {
      const city = G.place?.name ?? G.currentCountry?.name
      const cn = G.currentCountry?.name
      if (cn === 'Nigeria') return `The go-slow on the Third Mainland Bridge is four kilometers long. You have been in traffic for two hours. The bus radio is playing the same song it played when you boarded. The conductor hangs from the door selling the route to pedestrians who are moving faster than you.`
      if (cn === 'Indonesia') return `Jakarta's jams begin before six and do not end before ten. The commute is four hours — two each way — which is time that used to belong to you. Now it belongs to the overpass, the horn, the driver's quiet radio.`
      if (cn === 'Thailand') return `Bangkok traffic. The expressway is faster but you cannot afford it every day. The local road past the market is slower but you know the shortcuts, which only helps until everyone else learns them too.`
      if (cn === 'Egypt') return `Cairo's microbuses do not have fixed stops. You know the route well enough to flag one down anywhere. The driver's assistant hangs from the door calling destinations. Three connections, two hours, twenty minutes on foot.`
      if (cn === 'India') return `The metro is faster but the connection to your office requires two more buses. By the time you arrive you have navigated four modes of transport and fifty minutes of standing.`
      return `Two hours in ${city} traffic today. The city is too large for its roads and its roads too few for the city. You know this. Everyone knows this. The bus is full.`
    },
    choices: null,
    effect: (p) => { p.m -= 4; p.e -= 1; },
  },

  {
    id: 'infra_traffic_escalation',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      HIGH_TRAFFIC_COUNTRIES.has(G.currentCountry?.name) &&
      (G.place?.scale === 'megacity' || G.place?.scale === 'major_city') &&
      !!G.career &&
      !G.mem?.trafficEscalated,
    text: () =>
      `The commute is now three hours each way. Six hours a day in transit. You have done the calculation: you spend more time traveling to work than working. Something has to change.`,
    choices: [
      {
        text: 'Find a job closer to where you live.',
        tag: null,
        outcome: 'The new job pays less. The commute is forty minutes. The hours recovered are not nothing.',
        effect: (p) => { p.mo -= 2000; p.m += 8; p.e += 4; p.setMem('trafficEscalated', true) },
      },
      {
        text: 'Move closer to work. The rent will be higher.',
        tag: null,
        outcome: 'The neighborhood near the office costs more. The commute is reduced. Something is gained; something is lost.',
        effect: (p) => { p.mo -= 4000; p.m += 6; p.setMem('trafficEscalated', true) },
      },
      {
        text: 'Accept it. Treat the commute as reading time.',
        tag: null,
        outcome: 'It is not a solution. It is an adaptation. The city moves around you and you sit inside it.',
        effect: (p) => { p.m -= 5; p.e += 3; p.setMem('trafficEscalated', true) },
      },
    ],
  },

  // ── AIR QUALITY ───────────────────────────────────────────────────────────────

  {
    id: 'infra_air_quality',
    phase: 'midlife',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      AIR_QUALITY_COUNTRIES.has(G.currentCountry?.name) &&
      (G.place?.scale === 'megacity' || G.place?.scale === 'major_city') &&
      G.currentYear >= 1990,
    text: (G) => {
      const city = G.place?.name ?? G.currentCountry?.name
      const cn = G.currentCountry?.name
      if (cn === 'India' && G.currentYear >= 2000) return `November in ${city}. The AQI this morning is 400 — hazardous. The sky is flat grey-brown from the ring road to the horizon. Schools will close if it reaches 450. You can taste the air on the back of your throat before you open the door.`
      if (cn === 'China' && G.currentYear >= 2000 && G.currentYear < 2016) return `${city}'s air this winter. The mountains that should be visible to the north are not visible. Not cloud. Particulate. Everyone knows they are there. You point in that direction when visitors ask. Nothing to show them.`
      if (cn === 'Pakistan') return `${city}'s winter smog mixes with smoke from the burning fields to the south. The city disappears inside it. Respiratory cases at the hospitals double in November. You wear a mask when you can find one.`
      return `The air in ${city} is the color of old newsprint today. The mountains, if there are mountains, are gone. Everyone coughs at some point in the afternoon and no one mentions it.`
    },
    choices: null,
    effect: (p) => { p.h -= 4; p.m -= 2; },
  },

  {
    id: 'infra_air_escalation',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      AIR_QUALITY_COUNTRIES.has(G.currentCountry?.name) &&
      (G.place?.scale === 'megacity' || G.place?.scale === 'major_city') &&
      G.currentYear >= 1990 &&
      !G.mem?.airEscalated,
    text: () =>
      `The doctor says your lungs show markers of long-term particulate exposure. Nothing acute, she says. But the recommendation is clear: reduce time outdoors, or consider whether this city is the right long-term choice.`,
    choices: [
      {
        text: 'Buy an air purifier. Change what you can control.',
        tag: null,
        outcome: 'The filter changes color within three weeks. The indoor air is better. Outside remains what it is.',
        effect: (p) => { p.mo -= 700; p.h += 5; p.setMem('airEscalated', true) },
      },
      {
        text: 'Begin looking for opportunities elsewhere.',
        tag: 'considering_leaving_city',
        outcome: 'You begin asking around. Nothing immediate, but the idea is now in motion.',
        effect: (p) => { p.m += 3; p.addFlag('considering_leaving_city'); p.setMem('airEscalated', true) },
      },
      {
        text: 'Stay. This is your city.',
        tag: null,
        outcome: 'You know the risks. You choose the city anyway. The doctor notes it in your file.',
        effect: (p) => { p.h -= 6; p.m += 4; p.setMem('airEscalated', true) },
      },
    ],
  },

  // ── WATER SHORTAGE ────────────────────────────────────────────────────────────

  {
    id: 'infra_water_shortage',
    phase: 'midlife',
    weight: 3,
    cooldown: 7,
    when: (G) =>
      WATER_STRESS_COUNTRIES.has(G.currentCountry?.name) &&
      G.place?.type === 'urban' &&
      G.currentYear >= 1970,
    text: (G) => {
      const city = G.place?.name ?? G.currentCountry?.name
      const cn = G.currentCountry?.name
      if (cn === 'South Africa' && G.currentYear >= 2017) return `${city}'s dam levels are at nineteen percent. Day Zero — the date the municipality turns off the taps entirely — is posted on the official website. The collection queues begin at four in the morning. The recommended allocation is fifty liters per person per day. You have been calculating.`
      if (cn === 'India') return `${city}'s reservoirs are dry for the third year running. The tanker trucks arrive in the morning — you hear the horn from inside the building — and the queue forms immediately. The water you receive has to last three days.`
      if (cn === 'Jordan') return `Amman gets running water once a week. The rooftop tank fills on Thursday; by Sunday it is almost gone. Everyone in the city is fluent in tank management, in the arithmetic of what remains.`
      if (cn === 'Pakistan') return `${city}'s water comes through the pipe that serves the whole block, on a schedule that is not exactly a schedule. You fill everything — every bucket, every pot — when the pressure rises.`
      return `Water in ${city} has been limited for weeks. The municipality says it will improve. The improvement has not come. You have learned to use less.`
    },
    choices: null,
    effect: (p) => { p.h -= 3; p.m -= 3; },
  },

  {
    id: 'infra_water_escalation',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      WATER_STRESS_COUNTRIES.has(G.currentCountry?.name) &&
      G.place?.type === 'urban' &&
      G.currentYear >= 1970 &&
      !G.mem?.waterEscalated,
    text: () =>
      `There has been no water for nine days. The tanker trucks are selling at four times the normal price and running out before noon. You are calculating in a way that leaves no room for anything else.`,
    choices: [
      {
        text: 'Pay the tanker price. There is no other option.',
        tag: null,
        outcome: "The water costs a third of this month's income. The family is fed and clean. You will recover financially.",
        effect: (p) => { p.mo -= 600; p.h += 4; p.m -= 5; p.setMem('waterEscalated', true) },
      },
      {
        text: "Go to your parents' house until the crisis passes.",
        tag: null,
        outcome: "Two weeks at your parents'. The water comes back while you are away.",
        effect: (p) => { p.m += 3; p.s += 2; p.h += 3; p.setMem('waterEscalated', true) },
      },
      {
        text: 'Organize the neighborhood. Pressure the municipality.',
        tag: 'community_organizer',
        outcome: 'Seven families, one petition, two hundred signatures. Three weeks later the schedule is restored. You are on the neighborhood group now.',
        effect: (p) => { p.m += 2; p.s += 4; p.karma += 5; p.addFlag('community_organizer'); p.setMem('waterEscalated', true) },
      },
    ],
  },
]
