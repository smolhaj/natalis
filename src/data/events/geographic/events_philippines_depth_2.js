// events_philippines_depth_2.js
// Philippines depth arc — texture not covered in events_philippines.js.
// events_philippines.js covers: Marcos martial law, Aquino assassination, EDSA 1986,
// post-EDSA disillusionment, typhoon season, Haiyan 2013, dynasty texture,
// Duterte drug war, Marcos Jr. return 2022.
// OFW arc covered in events_ofw.js.
// This file: BPO night-shift, barrio fiesta, basketball courts, Black Nazarene,
// Moro/Mindanao south, hacienda inequality, jeepney, provincial home ties,
// typhoon warning as annual routine, OFW departure decision from home side.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const PHILIPPINES_DEPTH_2_EVENTS = [

  // ── BPO / CALL CENTER GRAVEYARD SHIFT ────────────────────────────────────

  {
    id: 'ph_dep_bpo_shift',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.currentYear >= 2000 &&
      G.age >= 18 && G.age <= 35 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.phDepBPO,
    text: pick([
      'The call center is open while Manila sleeps. Your shift starts at 10pm and runs to 7am, synchronized to US time zones. You answer as "David" or "Jessica" — the American name they gave you for the account — and you speak in the flat, slightly-midwest accent you have trained yourself to produce without thinking about it. The salary is three times what most jobs here pay. The cost is the body clock, the sunlight you do not see on workdays, the social life that runs on a different schedule from your friends who work days.',
      'The BPO industry is the backbone of what keeps the economy moving in a particular direction. You are a college graduate working a night shift speaking American English about problems you do not have. The product you are selling or supporting or explaining is one you have never used. The customer you are speaking to does not know where you are. You are very good at this. You have been doing it for four years. You are beginning to think about how long you will do it.',
    ]),
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.w += 3
      p.mo += 2000
      p.addFlag('ph_bpo_generation')
      p.setMem('phDepBPO', true)
    },
  },

  // ── BARRIO FIESTA ─────────────────────────────────────────────────────────

  {
    id: 'ph_dep_fiesta',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.age >= 6 && G.age <= 18 &&
      !G.mem?.phDepFiesta,
    text: 'The fiesta is the barangay\'s claim on the calendar. Your patron saint\'s feast day: the procession in the morning, the lechón that has been turning since before you woke up, the houses open to whoever arrives. Your mother has been preparing for three weeks. The fiesta committee has been meeting for two months. The whole street is involved in a way that has nothing to do with obligation — the obligation and the celebration have the same texture. People come back from Manila for this. People come back from Hong Kong. The barangay pulls its diaspora home once a year with the specific gravity of the patron saint.',
    choices: null,
    effect: (p) => {
      p.m += 6
      p.s += 3
      p.addFlag('ph_fiesta_culture')
      p.setMem('phDepFiesta', true)
    },
  },

  // ── BASKETBALL ────────────────────────────────────────────────────────────

  {
    id: 'ph_dep_basketball',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.age >= 8 && G.age <= 20 &&
      G.character?.gender !== 'female' &&
      !G.mem?.phDepBasketball,
    text: 'The court is concrete and the ring has no net and the backboard is plywood but none of that matters because this is what the boys of the barangay do in the hours between school and dinner. Basketball is the national sport in a country that the United States gave basketball to the way it gave the Philippines other things — the education system, the names in the telephone directory, the road signs in English — and basketball stayed the way those other things stayed. You are not tall. Most Filipinos are not tall. This does not affect how the game is played. You learn to play with what you have, which is the specific intelligence of the underpowered team.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.s += 2
      p.addFlag('ph_basketball_generation')
      p.setMem('phDepBasketball', true)
    },
  },

  // ── BLACK NAZARENE PROCESSION ─────────────────────────────────────────────

  {
    id: 'ph_dep_black_nazarene',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.age >= 16 &&
      (G.character?.religion?.startsWith('christian_catholic') || G.character?.birthReligion?.startsWith('christian_catholic')) &&
      !G.mem?.phDepNazarene,
    text: 'January 9. The Black Nazarene is a dark wood statue of Jesus carrying the cross, brought from Mexico in 1606, kept in the Quiapo Church. Every year, the feast day procession draws nine million people into the streets of Manila. You have come for the procession, which takes hours to complete because of the density of the crowd. People throw white towels to be touched to the statue as it passes — the cloth touched to the image of suffering carries something back. The devotion is not complicated. It is the specific Catholic faith of the Philippines, which is the faith of people who have been told that suffering is holy and have made the theology of suffering into something collective and enormous.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.s += 2
      p.addFlag('ph_black_nazarene_devout')
      p.setMem('phDepNazarene', true)
    },
  },

  // ── MORO/MINDANAO SOUTH ───────────────────────────────────────────────────

  {
    id: 'ph_dep_mindanao_moro',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.currentYear >= 1970 &&
      G.age >= 16 &&
      (G.ethnicity === 'moro' || G.ethnicity === 'tausug' || G.ethnicity === 'maranao' ||
       G.character?.religion?.startsWith('muslim') || G.character?.birthReligion?.startsWith('muslim')) &&
      !G.mem?.phDepMoro,
    text: 'The Bangsamoro — the Moro nation — has been in armed conflict with the Manila government since the 1970s. The MNLF, then the MILF, then the splinter groups. The Moro people are Muslim in a Catholic country and Malay in a state whose elite identifies differently, and the conflict is about land and autonomy and the specific history of the Moro homeland that was never surrendered. You live in this conflict not as a combatant necessarily but as someone whose community is defined by it: the checkpoint, the relative who went to the mountains, the school that was built with foreign money that arrived because the conflict had made international news. In 2019, the Bangsamoro Organic Law creates an autonomous region. The law does not settle everything. Nothing settles everything.',
    choices: [
      {
        text: 'The cause is just. The methods are more complicated.',
        tag: null,
        outcome: 'The justice of the cause and the complexity of the methods are both things you carry. The autonomy law gives a name to the region and a government to the region. The conditions that produced the conflict are not entirely resolved by either.',
        effect: (p) => {
          p.r += 5
          p.e += 3
          p.addFlag('ph_moro_generation')
          p.setMem('phDepMoro', true)
        },
      },
      {
        text: 'Find a way to live that runs alongside the conflict, not inside it.',
        tag: null,
        outcome: 'The way alongside is available to some. The checkpoint on the road is on both paths. The beside is not quite as separate as it sounds.',
        effect: (p) => {
          p.r += 4
          p.m -= 4
          p.addFlag('ph_moro_generation')
          p.setMem('phDepMoro', true)
        },
      },
    ],
    effect: null,
  },

  // ── HACIENDA NEGROS ───────────────────────────────────────────────────────

  {
    id: 'ph_dep_hacienda',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.currentYear >= 1960 && G.currentYear <= 2010 &&
      G.age >= 16 &&
      G.ruralUrban === 'rural' &&
      !G.mem?.phDepHacienda,
    text: 'The hacienda is the fact around which everything else arranges itself. In Negros Occidental, the sugar haciendas are what the island is for — the sacadas who cut cane for the harvest season, the kasugpong system of attached labour, the company store. The hacendero family has been here since the Spanish period. The land reform that was supposed to change this relationship was passed in 1972 and amended and delayed and partially implemented and partially evaded. Some land changed hands. Some did not. The cane still grows on land that was always this family\'s land, and you still work it. The specific texture of the relationship between you and the family that owns what you work on is a texture you have known since childhood and will know until you leave or until something changes.',
    choices: [
      {
        text: 'Organise with the other workers. Collective action is the arithmetic that changes things.',
        tag: 'ph_dep_hacienda_organiser',
        outcome: 'The organising is possible and is dangerous. The hacienda has a history with organisers. You know the history. You proceed with the knowledge.',
        effect: (p) => {
          p.karma += 6
          p.r += 5
          p.m -= 4
          p.addFlag('ph_hacienda_generation')
          p.addFlag('activist')
          p.setMem('phDepHacienda', true)
        },
      },
      {
        text: 'Leave the hacienda for the city. This is not the life you are staying for.',
        tag: null,
        outcome: 'Manila or Cebu. The city is what the hacienda is not: a place where you are not permanently known as someone who works someone else\'s land. The trade is not clean. You make it anyway.',
        effect: (p) => {
          p.m -= 3
          p.r += 3
          p.addFlag('ph_hacienda_generation')
          p.setMem('phDepHacienda', true)
        },
      },
    ],
    effect: null,
  },

  // ── JEEPNEY ───────────────────────────────────────────────────────────────

  {
    id: 'ph_dep_jeepney_b',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.currentYear >= 1960 && G.currentYear <= 2020 &&
      G.age >= 14 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.phDepJeepney,
    text: 'The jeepney is the American military jeep remade into something the Philippines invented for itself: extended body, chrome horses, painted saints and slogans on the hood, wooden benches in the back, the driver\'s seat a throne of rosary beads and hanging dice. You know the jeepney routes the way you know the bones of the place — where this one terminates, where to transfer, the fare you hold up to the ceiling for the other passengers to pass forward to the driver. The jeepney economy is the informal economy: owner-operators who bought their route and maintain their vehicle, drivers who pay the boundary and keep what\'s left, mechanics who know jeepney engines the way surgeons know anatomy. The government has been phasing them out since 2017, replacing them with modern buses. The people who know the routes grieve the loss of something they have no other word for.',
    choices: null,
    effect: (p) => {
      p.m += 3
      p.s += 2
      p.addFlag('ph_jeepney_generation')
      p.setMem('phDepJeepney', true)
    },
  },

  // ── UNDAS / ALL SAINTS ────────────────────────────────────────────────────

  {
    id: 'ph_dep_undas',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.age >= 25 &&
      (G.character?.religion?.startsWith('christian') || G.character?.birthReligion?.startsWith('christian')) &&
      !G.mem?.phDepUndas,
    text: 'November 1 and 2: Undas. The Filipino All Saints and All Souls is a two-day occupation of the cemeteries. You bring food and candles and the family, and you stay — sometimes overnight. The graves are scrubbed, the flowers replaced, the candles lit. The cemetery becomes a neighbourhood for two days: children running between the tombs, vendors selling balloons and peanuts at the gate, the specific sound of families being together in the place where the absent ones are. The dead are not gone. They are in the specific address of the plot your family has maintained for three generations. You visit. The visit is ordinary and not ordinary at the same time.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.r += 3
      p.addFlag('ph_undas_generation')
      p.setMem('phDepUndas', true)
    },
  },

  // ── PROBINSYA / BALIKBAYAN BOX ─────────────────────────────────────────────

  {
    id: 'ph_dep_probinsya',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.age >= 20 &&
      G.ruralUrban === 'urban' &&
      !G.mem?.phDepProbinsya,
    text: 'The probinsya — the province — is where you are from, even if you have been in Manila for ten years. The jeepney to the bus terminal to the ferry or the bus to the province, taken at Christmas and Holy Week and whenever the family calls. The balikbayan box is the object that carries this relationship when you can\'t: a cardboard box filled with things unavailable or too expensive at home — corned beef, chocolate, shampoo, shoes — sent ahead of you or instead of you when you can\'t make the trip. The box arrives at your mother\'s house and is opened with ceremony. What you sent is a record of what you thought she needed and what the city has that the province does not.',
    choices: null,
    effect: (p) => {
      p.m += 3
      p.r += 4
      p.s += 2
      p.addFlag('ph_probinsya_generation')
      p.setMem('phDepProbinsya', true)
    },
  },

  // ── OFW DEPARTURE DECISION (HOME SIDE) ───────────────────────────────────

  {
    id: 'ph_dep_ofw_calculus',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Philippines' &&
      G.currentYear >= 1980 &&
      G.age >= 20 && G.age <= 38 &&
      !G.mem?.phDepOFWCalc,
    text: 'The calculation is made by the people around you constantly and is eventually made by you. Two years in Saudi Arabia or Hong Kong or Italy: the nurse or domestic worker salary multiplied by 24, converted, compared to what you earn here, compared to what the house would cost, what the children\'s school would cost, what your parents need. The OFW is the worker that the Philippine economy runs on — twelve percent of GDP in remittances, the ATM receipt that pays for everything the government does not provide. The decision is economic and the economic decision is not separable from the family decision and the family decision is not separable from the specific loneliness of the two years in a country where you do not know the language of the street.',
    choices: [
      {
        text: 'Go. The calculation comes out this way.',
        tag: 'ph_dep_went_ofw',
        outcome: 'The contract is two years. The airport goodbye is the specific Filipino goodbye: the whole family, the departure hall, the faces through the glass. You will be back. The economy requires that you come back and go again.',
        effect: (p) => {
          p.r += 5
          p.m -= 5
          p.w += 5
          p.mo += 8000
          p.addFlag('ph_ofw_departed')
          p.addFlag('emigrated')
          p.setResidency('work_visa')
          p.setMem('phDepOFWCalc', true)
        },
      },
      {
        text: 'Stay. Someone has to stay and the other calculations don\'t add up.',
        tag: null,
        outcome: 'You stay. The barangay loses a different person that year. You receive the balikbayan box from the one who went and open it and think about the accounting.',
        effect: (p) => {
          p.r += 4
          p.karma += 3
          p.addFlag('ph_stayed_behind')
          p.setMem('phDepOFWCalc', true)
        },
      },
    ],
    effect: null,
  },

]
