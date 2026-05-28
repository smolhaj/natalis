// City-specific texture events for Lagos, Mumbai, Cairo, Mexico City, Moscow.
// Gated on G.place?.id. 4–5 events per city.
// Cairo and Moscow get era-split text via text: (G) => fn.

export const CITY_EVENTS = [

  // ── LAGOS ─────────────────────────────────────────────────────────────────────
  // id: 'ng_lagos'

  {
    id: 'city_lagos_go_slow',
    phase: 'midlife',
    weight: 3,
    cooldown: 8,
    when: (G) => G.place?.id === 'ng_lagos' && !!G.career,
    text: () =>
      `The go-slow begins at Eko Bridge and does not end until Ojuelegba. Four kilometers in ninety minutes. The conductor of the danfo in front of you is arguing through a window with a commercial motorcyclist. Nobody moves. A hawker walks the lane selling cold water and phone chargers. You watch the hours leaving you.`,
    choices: null,
    effect: (p) => { p.m -= 4; },
  },

  {
    id: 'city_lagos_area_boys',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.place?.id === 'ng_lagos' && !G.mem?.areaBoysEncounter,
    text: () =>
      `Three young men are waiting near the bus stop on Apapa Road. They have positioned themselves at the only gap in the fence. The toll is informal, unposted, and non-negotiable — though the amount is open to discussion. Everyone around you pretends not to see them.`,
    choices: [
      {
        text: 'Pay what they ask. It is not worth the trouble.',
        tag: null,
        outcome: 'You pay. They let you past. The amount was less than you expected. You learn to keep small bills in a separate pocket.',
        effect: (p) => { p.mo -= 50; p.m -= 2; p.setMem('areaBoysEncounter', true) },
      },
      {
        text: 'Negotiate. These things are negotiated.',
        tag: null,
        outcome: "You offer half. There is a pause, a look exchanged between them. They take it. You nod and continue. Lagos is always a negotiation.",
        effect: (p) => { p.mo -= 25; p.s += 2; p.setMem('areaBoysEncounter', true) },
      },
      {
        text: 'Turn around and find another route.',
        tag: null,
        outcome: 'The long way adds twenty minutes. You arrive late. You do not explain why.',
        effect: (p) => { p.m -= 3; p.setMem('areaBoysEncounter', true) },
      },
    ],
  },

  {
    id: 'city_lagos_hustle_test',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.place?.id === 'ng_lagos' && !G.mem?.lagosHustleTest,
    text: () =>
      `Lagos has a way of separating people. Not by what they came with — that is irrelevant here — but by what they are willing to do between six in the morning and ten at night. You have been here long enough to understand this. You have not yet decided which kind of person you will be.`,
    choices: [
      {
        text: 'Throw yourself into it. The city rewards the relentless.',
        tag: 'lagos_hustler',
        outcome: 'You begin before sunrise. You learn the rhythm. Lagos does not love you — it does not love anyone — but it compensates the diligent.',
        effect: (p) => { p.m += 4; p.mo += 1500; p.e += 3; p.addFlag('lagos_hustler'); p.setMem('lagosHustleTest', true) },
      },
      {
        text: 'Find your own pace. Lagos does not have to be everything.',
        tag: null,
        outcome: "You work steadily, rest when you can, refuse to let the city's tempo become your own. Some people leave. Some stay. You stay.",
        effect: (p) => { p.m += 6; p.h += 2; p.setMem('lagosHustleTest', true) },
      },
    ],
  },

  {
    id: 'city_lagos_flooding_july',
    phase: 'midlife',
    weight: 3,
    cooldown: 8,
    when: (G) => G.place?.id === 'ng_lagos',
    text: () =>
      `July in Lagos. The drains are blocked with plastic bags and the rain has come before the waste management truck. Lekki Expressway is a lake. The water under your front door is brown and moves slowly. Your neighbor is sweeping it out with a broom, which is not enough, but it is something to do with your hands.`,
    choices: null,
    effect: (p) => { p.m -= 3; p.h -= 1; },
  },

  {
    id: 'city_lagos_generator_culture',
    phase: 'midlife',
    weight: 3,
    cooldown: 9,
    when: (G) => G.place?.id === 'ng_lagos',
    text: () =>
      `The symphony of generators plays up and down the street at seven, when NEPA takes the light. Each one begins at a slightly different pitch. You can tell which neighbors refueled this week and which didn't. The boy across the road is selling fuel in five-liter jugs by torchlight. He has been doing this since he was twelve. He is twenty-three now and has saved enough to buy a second generator.`,
    choices: null,
    effect: (p) => { p.m -= 2; },
  },

  // ── MUMBAI ────────────────────────────────────────────────────────────────────
  // id: 'in_mumbai'

  {
    id: 'city_mumbai_local_train',
    phase: 'midlife',
    weight: 3,
    cooldown: 8,
    when: (G) => G.place?.id === 'in_mumbai' && !!G.career,
    text: () =>
      `The 8:17 Virar Fast at Churchgate. The platform is already full; the train arrives and you do not get on — you are put on, absorbed into the carriage by pressure. There are no handholds left so you are held upright by other people. The man whose armpit is near your face is reading a newspaper folded into quarters. At Dadar a cascade of bodies exits and you breathe. At Andheri you almost fall. You have been doing this for six years.`,
    choices: null,
    effect: (p) => { p.m -= 3; p.h -= 1; },
  },

  {
    id: 'city_mumbai_monsoon_specific',
    phase: 'midlife',
    weight: 3,
    cooldown: 8,
    when: (G) => G.place?.id === 'in_mumbai',
    text: () =>
      `The July monsoon does not arrive in Mumbai so much as it takes possession of the city. The streets below Kurla flood to chest height by afternoon; the trains stop running for six hours. The city files this under expected. You know which roads hold, which neighborhoods drain, which buildings let water in through the third-floor windows. This knowledge is as much a part of living here as your address.`,
    choices: null,
    effect: (p) => { p.m -= 4; p.h -= 1; },
  },

  {
    id: 'city_mumbai_contrast',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.place?.id === 'in_mumbai' && !G.mem?.mumbaiContrastSeen,
    text: () =>
      `From the flyover on the Western Express Highway you can see Dharavi below and the towers of Bandra-Kurla Complex ahead. Both are part of the same city. The distance between them is measurable in meters. You are in a taxi going from one to the other and you do not know what to do with the view.`,
    choices: null,
    effect: (p) => { p.e += 2; p.m -= 2; p.setMem('mumbaiContrastSeen', true) },
  },

  {
    id: 'city_mumbai_ganesh',
    phase: 'midlife',
    weight: 2,
    cooldown: 10,
    when: (G) => G.place?.id === 'in_mumbai',
    text: () =>
      `Ganesh Chaturthi. The idol on your street has been installed since Tuesday — ten feet high, lit from below, with marigolds stacked around the base. The dhol drums start at six in the morning and do not stop. On the eleventh day the procession takes three hours to pass your building. The idol goes into the sea. The city is entirely itself for these ten days.`,
    choices: null,
    effect: (p) => { p.m += 4; p.s += 2; },
  },

  {
    id: 'city_mumbai_dabbawala',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.place?.id === 'in_mumbai' && !!G.career && !G.mem?.dabbawalaObserved,
    text: () =>
      `At the station, a man with a wooden crate on his head is moving faster than the crowd. He is a dabbawala. The crate holds twelve tiffin boxes, each one packed by someone's wife or mother that morning in the suburbs, and he will deliver them to the correct office floor in the correct building in the correct part of the city, code-sorted by marks on the lid. The delivery failure rate is one in sixteen million. The deliveryman is illiterate. He has been doing this since 1984.`,
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('dabbawalaObserved', true) },
  },

  // ── CAIRO ─────────────────────────────────────────────────────────────────────
  // id: 'eg_cairo'

  {
    id: 'city_cairo_ahwa',
    phase: 'midlife',
    weight: 3,
    cooldown: 9,
    when: (G) => G.place?.id === 'eg_cairo',
    text: (G) => {
      if (G.currentYear >= 2011) return `The ahwa on Tahrir Street is full at two in the afternoon — it will be full at two in the morning as well. The television in the corner is showing the news, which is not news anymore, which everyone watches anyway. The shisha smoke moves under the ceiling fan. The man at the table nearest the road has been there since you arrived three hours ago and has not ordered anything new.`
      return `The ahwa on the corner is open at midnight and still full. The backgammon pieces click between two old men who have been playing for six years without apparent score-keeping. The tea arrives in a glass. The shisha charcoal is changed every twenty minutes. You could spend a year in Cairo and a third of it could be spent here, and this would not be wasted time.`
    },
    choices: null,
    effect: (p) => { p.m += 4; p.s += 2; },
  },

  {
    id: 'city_cairo_ramadan_night',
    phase: 'midlife',
    weight: 2,
    cooldown: 10,
    when: (G) => G.place?.id === 'eg_cairo',
    text: () =>
      `Cairo inverts itself during Ramadan. The city is quieter than usual during the day — slower, conserving — and then the call to prayer for iftar comes and the streets fill. The fanous lanterns are up along Muizz Street. Families who have not seen each other since last Ramadan are eating at tables that occupy the pavement. The city is most itself at the moment of breaking fast.`,
    choices: null,
    effect: (p) => { p.m += 5; p.s += 2; },
  },

  {
    id: 'city_cairo_downtown_decay',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.place?.id === 'eg_cairo' && !G.mem?.cairoDowntownSeen,
    text: (G) => {
      if (G.currentYear >= 2011) return `Downtown Cairo after the revolution. The Art Deco buildings that Khedive Ismail built in 1869 to make Paris jealous now have pharmacies on the ground floor, photocopying shops, three generations of electrical wire stapled over the original facades. The marble staircases are intact. Upstairs, an NGO shares a floor with a dentist who shares a wall with a family that has lived there since 1953.`
      return `Downtown Cairo. Talaat Harb Street. The buildings are from a different ambition — Haussmann-wide, marble-lobbied, designed to look like somewhere else. The somewhere else is now history. On the ground floor: a mobile phone shop, a shawarma window, a currency exchange. Upstairs: floors of offices, families, empty rooms. The building does not know it is not still 1930.`
    },
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('cairoDowntownSeen', true) },
  },

  {
    id: 'city_cairo_nile_evening',
    phase: 'midlife',
    weight: 3,
    cooldown: 9,
    when: (G) => G.place?.id === 'eg_cairo',
    text: () =>
      `The Nile Corniche at sunset. The feluccas are still out, moving slowly against the current, which is the slowest thing in Cairo. The city behind you — the traffic, the adhan, the generator noise — exists at a slight remove. A woman is selling lupini beans from a cart. You buy a paper cone and eat them slowly and watch the river, which has been here for all of it, and does not seem particularly moved.`,
    choices: null,
    effect: (p) => { p.m += 4; },
  },

  {
    id: 'city_cairo_era_change',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.place?.id === 'eg_cairo' && !G.mem?.cairoEraTextSeen,
    text: (G) => {
      if (G.currentYear <= 1970) return `Nasser's Cairo. The city under construction — the Corniche is new, the Nile Hilton just opened, the radio plays Umm Kulthum every Thursday night and the city stops. There is something being built here that has not finished being defined yet.`
      if (G.currentYear <= 2000) return `Mubarak's Cairo is a city of university graduates who cannot find work, of families crammed into apartments designed for half as many people, of traffic that has long since exceeded the capacity of roads built in 1920. The city functions through informal arrangements — the baksheesh economy, the wasta network, the understanding that the rule and the practice are different things.`
      return `Post-revolution Cairo. The army is back; the square is quiet. The city carries the memory of eighteen days in 2011 the way a person carries a scar — visible, permanent, not always painful. Life continues. The ahwa is open. The river is where it was.`
    },
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('cairoEraTextSeen', true) },
  },

  // ── MEXICO CITY ───────────────────────────────────────────────────────────────
  // id: 'mx_mexico_city'

  {
    id: 'city_mexcity_earthquake_memory',
    phase: 'midlife',
    weight: 3,
    cooldown: 10,
    when: (G) => G.place?.id === 'mx_mexico_city' && G.currentYear >= 1985,
    text: (G) => {
      if (G.currentYear === 1985 || G.currentYear === 1986) return `September 19, 1985. At 7:19 in the morning the ground moves in a way that is different from the smaller earthquakes you have felt before. The motion is long and rolling. The building sways. When it stops you go to the window: dust has risen over Tlatelolco. You will spend the next week in the rubble. The government does not arrive for three days. The neighbors do not wait.`
      return `The earthquake alarm goes off — the Alertsísmo system, the radio-wave early warning — and your body moves before you have decided to move it. You know the drill from childhood. You know it from 1985, from 2017, from the smaller ones in between. You are standing in the doorframe before you have thought the word earthquake. This is what living in Mexico City teaches the body.`
    },
    choices: null,
    effect: (p) => { p.m -= 4; p.h += 2; p.e += 2; },
  },

  {
    id: 'city_mexcity_unam',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.place?.id === 'mx_mexico_city' && G.age >= 18 && !G.mem?.unamVisited,
    text: () =>
      `Ciudad Universitaria. The library mural is the size of a building, which it is. The campus is its own country — forty-five thousand students, its own post office, its own metro station, its own political weather. There is a strike at the faculty of economics. The students have painted the gates. This too is part of the curriculum.`,
    choices: null,
    effect: (p) => { p.e += 3; p.s += 2; p.setMem('unamVisited', true) },
  },

  {
    id: 'city_mexcity_smog',
    phase: 'midlife',
    weight: 3,
    cooldown: 8,
    when: (G) => G.place?.id === 'mx_mexico_city' && G.currentYear >= 1970 && G.currentYear <= 2010,
    text: (G) => {
      if (G.currentYear <= 1992) return `The smog in the Valley of Mexico. The city sits in a bowl surrounded by mountains — Popocatépetl, Iztaccíhuatl — which you have not seen clearly in weeks. The thermal inversion traps the exhaust from three million cars. The air is the color of anxiety. Children are issued masks for school.`
      return `Even in the better years, Mexico City's air in winter has a particular quality — not the crisis of the eighties but the residue of a city too large for its geography. Popocatépetl is visible today, which is a good day. On a good day people stop to look.`
    },
    choices: null,
    effect: (p) => { p.h -= 3; p.m -= 2; },
  },

  {
    id: 'city_mexcity_becoming_chilango',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'mx_mexico_city' &&
      G.birthPlace?.id !== 'mx_mexico_city' &&
      !G.mem?.chilangoMoment,
    text: () =>
      `You are not from here. You are from somewhere with a specific quality of silence, a specific kind of food, a specific speed. Mexico City has not asked you to forget this. It has simply made it less and less available — replaced it with the city's noise, its food, its pace. One morning you realize you have started complaining about people from the provinces who don't know how to ride the metro. You have become what you arrived to.`,
    choices: null,
    effect: (p) => { p.m += 3; p.s += 3; p.addFlag('became_chilango'); p.setMem('chilangoMoment', true) },
  },

  {
    id: 'city_mexcity_microbuses',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.place?.id === 'mx_mexico_city' && !G.mem?.microbusFirst,
    text: () =>
      `The microbus does not have a schedule. It has a route and a driver who interprets the route loosely. The vehicle should legally hold fifteen people and holds twenty-two. The driver has a saint's image on the dashboard and a collection of CDs that date to 2003. The bus stops when you shout, not at designated stops. You shout. He stops. You are almost at the right place.`,
    choices: null,
    effect: (p) => { p.m += 2; p.s += 2; p.setMem('microbusFirst', true) },
  },

  // ── MOSCOW ────────────────────────────────────────────────────────────────────
  // id: 'ru_moscow'

  {
    id: 'city_moscow_kiosk_economy',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ru_moscow' &&
      G.currentYear >= 1991 && G.currentYear <= 1999 &&
      !G.mem?.moscowKioskSeen,
    text: () =>
      `Moscow 1993. The kiosks have appeared overnight — orange and green corrugated metal booths on every corner, selling cigarettes, vodka, imported chocolate bars, pornography, currencies, Snickers. The state shops are still open but the shelves are not reliable. The kiosk is reliable. The man who runs the nearest one works twenty hours a day and has a Kalashnikov under the counter. He is twenty-four years old. He will be a millionaire in six years or dead. He does not know which.`,
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('moscowKioskSeen', true) },
  },

  {
    id: 'city_moscow_metro',
    phase: 'midlife',
    weight: 3,
    cooldown: 9,
    when: (G) => G.place?.id === 'ru_moscow',
    text: (G) => {
      if (G.currentYear <= 1991) return `The Moscow Metro at rush hour. The chandeliers are lit. The marble is polished. The train arrives on a forty-five-second interval and is still full. This was built to show what the Soviet Union was capable of. It remains the most beautiful thing the Soviet Union produced. Everyone is reading.`
      return `The Moscow Metro. The Kievskaya station with its mosaics, the Komsomolskaya ceiling that belongs in a cathedral — people move through it without looking up. You have started looking up. The woman next to you on the bench is reading a novel. The man standing has a podcast in his ears. The beauty is unacknowledged, which may be the point.`
    },
    choices: null,
    effect: (p) => { p.m += 3; p.e += 2; },
  },

  {
    id: 'city_moscow_rublyovka',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.place?.id === 'ru_moscow' &&
      G.currentYear >= 2000 &&
      !G.mem?.rublyovkaMoment,
    text: () =>
      `The Rublyovka highway, heading west from Moscow. The dacha country of the new rich — security fences that go on for a kilometer, forest cut back from the road, the occasional helicopter pad visible through the trees. The same road where Brezhnev used to drive his American cars. The same road. Different cars. Different people inside them. The same direction.`,
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('rublyovkaMoment', true) },
  },

  {
    id: 'city_moscow_dacha',
    phase: 'midlife',
    weight: 3,
    cooldown: 9,
    when: (G) => G.place?.id === 'ru_moscow',
    text: () =>
      `Friday evening train out of Kursky station. Every weekend, the city exhales. The dachas are small — some have running water, some do not — but they have gardens, and the garden is the point. Your neighbor grows tomatoes and cucumbers and charges nothing for them. The grandmother three plots over has been growing the same strawberries since 1967. On Sunday evening the train back fills with people carrying bags of vegetables, looking slightly more like themselves than they did on Friday.`,
    choices: null,
    effect: (p) => { p.m += 6; p.h += 2; },
  },

  {
    id: 'city_moscow_winter',
    phase: 'midlife',
    weight: 3,
    cooldown: 9,
    when: (G) => G.place?.id === 'ru_moscow',
    text: () =>
      `Moscow winter. The temperature drops to minus twenty-two overnight and the city does not slow. The metro is warmer than your apartment. The ice on the Moskva River is a foot thick. The coat you bought when you arrived — which seemed like enough — is not enough. You buy a second coat. The woman at the market who sells felt boots says you should have come to her in September. She is not wrong.`,
    choices: null,
    effect: (p) => { p.h -= 2; p.m -= 2; },
  },
]
