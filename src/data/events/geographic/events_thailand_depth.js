// events_thailand_depth.js
// Thailand depth arc — texture not in events_thailand.js.
// Base file covers: uncolonized identity, lèse-majesté, 1997 baht crisis,
// Red/Yellow conflict, coup culture, Thammasat October 6 1976, Hill tribe
// statelessness, Boom years, Pattani insurgency, Buddhist ordination,
// 2020-21 youth protests, COVID/tourism.
// This file: October 14 1973 uprising, Isan migration to Bangkok,
// muay thai as working-class mobility, merit-making and spirit houses,
// Songkran, bar economy, royal presence in everyday life, 2011 floods.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const THAILAND_DEPTH_EVENTS = [

  // ── OCTOBER 14, 1973 ─────────────────────────────────────────────────────

  {
    id: 'tha_dep_1973',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear === 1973 &&
      G.age >= 16 &&
      !G.mem?.thaDepOct73,
    text: 'October 1973. Students arrested for handing out leaflets about a constitution, and the crowds grow, half a million on Ratchadamnoen. The government orders the army to fire and students die in the street. Then the king appears on television, and the generals leave the country, and a dictatorship of fifteen years falls to students in three days. The country becomes, briefly, something it was not.',
    choices: [
      {
        text: 'You are in the crowd at Ratchadamnoen.',
        tag: null,
        outcome: 'You were there for the three days and what they produced: the resignation, the exile, the king\'s appearance. You know what a crowd that size feels like from inside it. You will spend the next three years watching what the democratic opening becomes.',
        effect: (p) => {
          p.m += 8
          p.r += 6
          p.karma += 5
          p.addFlag('tha_1973_generation')
          p.addFlag('activist')
          p.setMem('thaDepOct73', true)
        },
      },
      {
        text: 'You hear about it from outside Bangkok, in fragments.',
        tag: null,
        outcome: 'The news that a government fell to student protests arrives with a delay. By the time you understand what happened it has already happened. The next three years of democratic experiment happen in Bangkok first and reach you second.',
        effect: (p) => {
          p.m += 4
          p.e += 3
          p.addFlag('tha_1973_generation')
          p.setMem('thaDepOct73', true)
        },
      },
    ],
    effect: null,
  },

  // ── ISAN MIGRATION ────────────────────────────────────────────────────────

  {
    id: 'tha_dep_isan_migration',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear >= 1975 &&
      G.age >= 16 && G.age <= 30 &&
      G.ruralUrban === 'rural' &&
      !G.mem?.thaDepIsanMig,
    text: () => pick([
      'Isan: the northeast, two-thirds of Thailand\'s area, a third of its population, the driest soil, the lowest wages. Your village is in Udon Thani or Roi Et or Buriram or Nakhon Ratchasima. The factory in Samut Prakan or the construction site in Bangkok pays four times what the rice paddy produces. The bus goes overnight. You sleep sitting up. You arrive at Mo Chit or the Eastern Bus Terminal before dawn. The city does not greet you; it absorbs you.',
      'The Isan migrant lives in two places simultaneously. The room in Bangkok is small and shared: six to a room, hot water in a bucket. The village in Isan is where the money goes: the remittance that built the concrete house, that sent the younger brother to school, that bought the plot of land that the family still farms. You call home on Sundays. You go home for Songkran and sometimes Loy Krathong. The city is where you work. Home is where you are from.',
    ]),
    choices: [
      {
        text: 'You go to Bangkok. The factory or the construction site.',
        tag: null,
        outcome: 'The dormitory. The six-day week. The foreman who knows your province and employs accordingly. The city pays. The city costs.',
        effect: (p) => {
          p.w += 5
          p.mo += 2000
          p.m -= 5
          p.addFlag('tha_isan_migrant')
          p.addFlag('rural_to_urban')
          p.setMem('thaDepIsanMig', true)
        },
      },
      {
        text: 'You stay. The rice paddy, the family, the dry season.',
        tag: null,
        outcome: 'You watch two, three, five people from your village leave for Bangkok. The remittances come back to them — to their families. The village becomes older and quieter over a decade. You are part of what remains.',
        effect: (p) => {
          p.m += 2
          p.r += 4
          p.addFlag('tha_isan_migrant')
          p.setMem('thaDepIsanMig', true)
        },
      },
    ],
    effect: null,
  },

  // ── MUAY THAI ─────────────────────────────────────────────────────────────

  {
    id: 'tha_dep_muay_thai',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear >= 1960 &&
      G.age >= 10 && G.age <= 20 &&
      G.character.gender === 'male' &&
      G.stats.wealth < 55 &&
      !G.mem?.thaDepMuayThai,
    text: 'The muay thai camp takes boys at twelve, under a trainer who has made fighters in this province for twenty years: mornings at the camp, afternoons in the heat, fists, elbows, knees, shins and the clinch. It is the road for a poor boy to Rajadamnern or Lumpinee, where the big gamblers sit and fighters earn real money and send it home. Most boys never get there. The training is still the training.',
    choices: [
      {
        text: 'You fight through the provincial circuits toward Bangkok.',
        tag: null,
        outcome: 'The fights at the local stadium: five hundred baht for a win. Then a hundred thousand people watching at Lumpinee on a Friday. Then the calculation about how many years before the damage adds up. The money lasts while it lasts.',
        effect: (p) => {
          p.h -= 5
          p.s += 5
          p.mo += 3000
          p.addFlag('tha_muay_thai_generation')
          p.setMem('thaDepMuayThai', true)
        },
      },
      {
        text: 'You train but do not pursue it as a career.',
        tag: null,
        outcome: 'The discipline of the camp stays in you: the footwork, the way to receive a blow, the capacity to continue. These turn out to be useful in categories that have nothing to do with the ring.',
        effect: (p) => {
          p.h += 3
          p.s += 3
          p.addFlag('tha_muay_thai_generation')
          p.setMem('thaDepMuayThai', true)
        },
      },
    ],
    effect: null,
  },

  // ── MERIT-MAKING AND SPIRIT HOUSES ────────────────────────────────────────

  {
    id: 'tha_dep_merit_making',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.religion === 'buddhist' &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.thaDepMerit,
    text: () => pick([
      'Tam bun — making merit. The monks walk in single file before dawn with their lacquered alms bowls. Your mother wakes at five to prepare the rice, the sticky rice, the vegetables. The act of placing food in the bowl accumulates merit — a spiritual economy in which the intention to give and the giving are both tracked and both return. The spirit house in the courtyard has fresh garlands today: the san phra phum requires daily tending. The Buddhism and the animism are one practice with two vocabularies.',
      'The lotus, the incense, the gold leaf you press onto the Buddha image: the daily texture of Thai Buddhist life is tactile and specific. The merit economy runs through everything — the temple fair, the funeral donation, the scholarship to a poor student. Your grandmother knows the merit value of each act the way she knows the price of market vegetables. Karma is an accounting system. Merit is the deposit.',
    ]),
    choices: null,
    effect: (p) => {
      p.m += 4
      p.s += 2
      p.addFlag('tha_merit_generation')
      p.setMem('thaDepMerit', true)
    },
  },

  // ── SONGKRAN ─────────────────────────────────────────────────────────────

  {
    id: 'tha_dep_songkran',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.age >= 16 && G.age <= 40 &&
      !G.mem?.thaDepSongkran,
    text: 'Songkran, the new year in April. In the morning the young pour water over the hands of the old and ask their blessing; in the afternoon the whole country is soaked from water guns and pickup trucks with barrels in the back. The buses out of Bangkok are full a month ahead, and Isan fills up again with its own people. The water washes the old year away.',
    choices: null,
    effect: (p) => {
      p.m += 7
      p.s += 3
      p.addFlag('tha_songkran_generation')
      p.setMem('thaDepSongkran', true)
    },
  },

  // ── BAR ECONOMY ──────────────────────────────────────────────────────────

  {
    id: 'tha_dep_bar_economy',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1970 &&
      G.age >= 18 && G.age <= 35 &&
      G.stats.wealth < 45 &&
      !G.mem?.thaDepBar,
    text: 'Pattaya, Patpong, Walking Street, the islands in high season. The factory pays less, the hours are longer, the future is the same, and the bar pays more. The foreign men have money, and you can read any of them within five minutes if you have done this long enough. You know women who got a visa from it, or a house, or nothing, or hurt. You decide in your circumstances with your information, and other people\'s opinions are not your circumstances.',
    choices: [
      {
        text: 'You take the work. The money is real and you need it.',
        tag: null,
        outcome: 'You develop a set of competencies that nobody acknowledges as competencies. The money goes home. Some of it stays with you. Some years are better than others. You remain the person making the decisions about your life.',
        effect: (p) => {
          p.w += 6
          p.mo += 4000
          p.s += 3
          p.addFlag('tha_bar_economy_generation')
          p.setMem('thaDepBar', true)
        },
      },
      {
        text: 'You find another path, even though it pays less.',
        tag: null,
        outcome: 'The factory, the restaurant, the market stall. The money is what it is. The calculation that led you elsewhere was also yours to make.',
        effect: (p) => {
          p.w += 2
          p.mo += 800
          p.setMem('thaDepBar', true)
        },
      },
    ],
    effect: null,
  },

  // ── THE MONARCHY IN DAILY LIFE ────────────────────────────────────────────

  {
    id: 'tha_dep_royal_daily',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.age >= 7 && G.age <= 18 &&
      !G.mem?.thaDepRoyal,
    text: 'The portrait of the King is in every room that matters: the school classroom, the government office, the shop, the restaurant, the hospital waiting area. When the national anthem plays at eight in the morning and six in the evening, everyone stops — in the street, in the train station, in the market. The cinema plays the royal anthem before every film and everyone stands. King Bhumibol\'s photograph is the King\'s photograph and later his son\'s and the face changes but the ritual does not. The monarchy is the water the country swims in.',
    choices: null,
    effect: (p) => {
      p.e += 2
      p.addFlag('tha_royal_devotion')
      p.setMem('thaDepRoyal', true)
    },
  },

  // ── 2011 FLOODS ──────────────────────────────────────────────────────────

  {
    id: 'tha_dep_floods_2011',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Thailand' &&
      G.currentYear === 2011 &&
      G.age >= 18 &&
      !G.mem?.thaDepFlood2011,
    text: '2011, and the monsoon does not stop. By October a third of the provinces are under water, and the industrial estates north of Bangkok, the hard drives and the car parts, are three metres deep, and factories on the other side of the world stop for lack of them. The water reaches the edge of Bangkok, and the government\'s sandbag walls keep it out of the centre by sending it into the outer districts. It takes three months to drain.',
    choices: [
      {
        text: 'Your home or workplace floods.',
        tag: null,
        outcome: 'The water comes slowly and then it doesn\'t stop. You carry what fits. The house dries in March. Some of what was in the house does not recover. The insurance, if you have it, takes longer.',
        effect: (p) => {
          p.m -= 15
          p.mo -= 3000
          p.r += 6
          p.addFlag('tha_2011_flood_generation')
          p.addFlag('disaster_survivor')
          p.setMem('thaDepFlood2011', true)
        },
      },
      {
        text: 'You are in Bangkok proper. The barriers hold.',
        tag: null,
        outcome: 'The sandbags at the Lat Phrao intersection. The water behind the barrier, the dry street in front. You watch the cities north of Bangkok on television and understand that the barrier is the only reason you are watching and not in it.',
        effect: (p) => {
          p.m -= 5
          p.r += 4
          p.addFlag('tha_2011_flood_generation')
          p.setMem('thaDepFlood2011', true)
        },
      },
    ],
    effect: null,
  },

]
