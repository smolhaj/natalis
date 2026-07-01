// events_sri_lanka_depth.js
// Sri Lanka depth arc — texture not in events_sri_lanka.js.
// Base file covers: Black July 1983, Jaffna childhood, Tamil diaspora, war end 2009,
// 2022 economic collapse/Aragalaya.
// This file: 2004 Boxing Day tsunami, tea estate Tamil identity (Indian Tamil),
// Sinhalese Buddhist nationalism, Mullivaikkal 2009 from inside, Rajapaksa
// family capture of state, 2019 Easter Sunday bombings, Colombo checkpoint
// generation, post-Aragalaya reckoning.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const SRI_LANKA_DEPTH_EVENTS = [

  // ── 2004 BOXING DAY TSUNAMI ───────────────────────────────────────────────

  {
    id: 'slk_dep_tsunami',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Sri Lanka' &&
      G.currentYear === 2004 &&
      G.age >= 14 &&
      !G.mem?.slkDepTsunami,
    text: 'December 26. The sea goes out before it comes back, farther than it has ever gone, and the fishing families go down to see what was on the sea floor. The wave comes in fast. In Galle, in Hambantota, in Arugam Bay, in Batticaloa — the eastern coast, the southern coast — it comes in fast. Thirty thousand people die in Sri Lanka in less than two hours. The wall of water does not distinguish: Sinhalese and Tamil and Muslim communities on the coast are equally in its path. The war paused for eleven days while both sides participated in the relief effort. Eleven days is specific and finite and notable.',
    choices: [
      {
        text: 'You are on the coast. The water comes.',
        tag: null,
        outcome: 'You survive by height, by chance, by someone grabbing your arm. The accounting of what was on the coast and is not anymore takes weeks.',
        effect: (p) => {
          p.m -= 18
          p.h -= 5
          p.r += 6
          p.addFlag('slk_tsunami_generation')
          p.addFlag('disaster_survivor')
          p.setMem('slkDepTsunami', true)
        },
      },
      {
        text: 'You are inland. You hear the numbers for days afterward.',
        tag: null,
        outcome: 'The relief effort absorbs you. You carry things you never carry. For a brief period the work requires everyone and produces a specific kind of solidarity that does not persist when the work ends.',
        effect: (p) => {
          p.m -= 8
          p.karma += 5
          p.addFlag('slk_tsunami_generation')
          p.setMem('slkDepTsunami', true)
        },
      },
    ],
    effect: null,
  },

  // ── TEA ESTATE TAMIL IDENTITY ─────────────────────────────────────────────

  {
    id: 'slk_dep_estate_tamil',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Sri Lanka' &&
      G.character.ethnicity === 'indian_tamil' &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.slkDepEstateTamil,
    text: 'The estate is its own world in the hill country. Your family has picked tea for three generations — brought from South India by the British to work the estates the Kandyan Sinhalese would not. The line numbers, the check roll, the daily kilos weighed: the vocabulary of the estate is the vocabulary of your childhood. In 1948 the Ceylon Citizenship Act removed citizenship from most estate Tamils — your grandparents voted and then did not. The 1988 Grant of Citizenship restored it for most. Your parents voted in 1989. You will vote in the next election. The vote is not the same thing as equality in Nuwara Eliya.',
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.r += 5
      p.e += 2
      p.addFlag('slk_estate_tamil_generation')
      p.setMem('slkDepEstateTamil', true)
    },
  },

  // ── SINHALESE BUDDHIST NATIONALISM ────────────────────────────────────────

  {
    id: 'slk_dep_buddhist_nationalism',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Sri Lanka' &&
      G.character.ethnicity === 'sinhalese' &&
      G.currentYear >= 2004 &&
      G.age >= 18 &&
      !G.mem?.slkDepBuddhistNat,
    text: pick([
      'The Jathika Hela Urumaya — nine monks in parliament in 2004, the first time monks ran as candidates. The robes in the chamber. The argument is that the Sinhalese Buddhist civilisation requires protection in ways that secular politics cannot provide. The anti-Muslim violence in Kandy in 2018 — the temples, the saffron in the crowd. You are Buddhist, as your family has been for generations. What some monks are doing with the teachings is something you are still deciding how to name.',
      'The official theology is that Sri Lanka is the island entrusted with the preservation of the Dhamma — the Buddha himself is supposed to have visited three times. This is not scripture for your grandmother; it is geography. The idea that Tamils are a threat to this preservation was not always the mainstream Buddhist position. The BBS and the JHU have made it mainstream in specific decades. You inherited the faith and not necessarily the political form it has taken.',
    ]),
    choices: [
      {
        text: 'The faith is one thing. The politics being done in its name is another.',
        tag: null,
        outcome: 'You hold both. The temple is still the temple. The monk in parliament is a different category. The two coexist without resolving.',
        effect: (p) => {
          p.r += 3
          p.e += 2
          p.addFlag('slk_sinhala_buddhist_generation')
          p.setMem('slkDepBuddhistNat', true)
        },
      },
      {
        text: 'The Sinhalese Buddhist heritage requires defence. The numbers are the numbers.',
        tag: null,
        outcome: 'The demographic arguments, the historical arguments. You carry them as conviction. The country moves in the direction you believe in. The consequences of the direction will arrive later.',
        effect: (p) => {
          p.s += 2
          p.addFlag('slk_sinhala_buddhist_generation')
          p.setPolitical('nationalist')
          p.setMem('slkDepBuddhistNat', true)
        },
      },
    ],
    effect: null,
  },

  // ── MULLIVAIKKAL 2009 ─────────────────────────────────────────────────────

  {
    id: 'slk_dep_mullivaikkal',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Sri Lanka' &&
      G.character.ethnicity === 'sri_lankan_tamil' &&
      G.currentYear >= 2009 && G.currentYear <= 2011 &&
      G.age >= 20 &&
      !G.mem?.slkDepMullivaikkal,
    text: 'The final months: the government declared No Fire Zones on the Vanni coast and then shelled them. The hospitals marked with the Red Cross were shelled. The civilians — 300,000 in January, fewer as the weeks passed, in ways that are still being counted — were inside a corridor that contracted. The UN Panel of Experts put the civilian death toll at 40,000 minimum. The Channel 4 footage exists. The Darusman Report exists. No international tribunal has been established. The government says the army is the most humanitarian army in the world. You have family inside that corridor. Some of them came out.',
    choices: [
      {
        text: 'Some of them came out.',
        tag: null,
        outcome: 'The IDP camps at Menik Farm: 300,000 people behind barbed wire in 2009, cleared over eighteen months. The ones who came out are here. The others are numbers in a range that begins at 40,000.',
        effect: (p) => {
          p.m -= 20
          p.r += 8
          p.addFlag('slk_mullivaikkal_witness')
          p.setMem('slkDepMullivaikkal', true)
        },
      },
      {
        text: 'None of them came out.',
        tag: null,
        outcome: 'You know the name of the No Fire Zone. You know the week. You do not know exactly where. The numbers do not tell you where.',
        effect: (p) => {
          p.m -= 25
          p.r += 12
          p.addFlag('slk_mullivaikkal_witness')
          p.setMem('slkDepMullivaikkal', true)
        },
      },
    ],
    effect: null,
  },

  // ── RAJAPAKSA STATE CAPTURE ───────────────────────────────────────────────

  {
    id: 'slk_dep_rajapaksa',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Sri Lanka' &&
      G.currentYear >= 2010 && G.currentYear <= 2020 &&
      G.age >= 25 &&
      !G.mem?.slkDepRajapaksa,
    text: 'The Rajapaksa family. Mahinda as president, Gotabaya as Defence Secretary, Chamal as Speaker, Basil as Economic Development Minister — four brothers across the key positions. After the war, the 18th Amendment removed presidential term limits. State media. The Hambantota port built with Chinese debt that the country cannot service and eventually converts to a 99-year lease. The journalists who criticise the government have a habit of disappearing. Lasantha Wickrematunge published his own obituary the week before he was killed.',
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 4
      p.addFlag('slk_rajapaksa_era')
      p.setMem('slkDepRajapaksa', true)
    },
  },

  // ── 2019 EASTER SUNDAY BOMBINGS ───────────────────────────────────────────

  {
    id: 'slk_dep_easter_sunday',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Sri Lanka' &&
      G.currentYear === 2019 &&
      G.age >= 18 &&
      !G.mem?.slkDepEasterSunday,
    text: 'April 21, 2019. Easter Sunday. Three churches and three luxury hotels in Colombo and Negombo and Batticaloa. 267 dead. The bombers are linked to the National Thowheed Jamath, to IS. The State Intelligence Services had warnings they did not act on — a parliamentary investigation finds the president\'s office was warned eleven days before. The attacks accelerate Gotabaya Rajapaksa\'s election in November: the security candidate. The country that survived the civil war has a new kind of fear, which arrives from a direction the last twenty-six years did not prepare it for.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 5
      p.addFlag('slk_easter_sunday_generation')
      p.setMem('slkDepEasterSunday', true)
    },
  },

  // ── COLOMBO CHECKPOINT GENERATION ────────────────────────────────────────

  {
    id: 'slk_dep_colombo_checkpoints',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Sri Lanka' &&
      G.ruralUrban === 'urban' &&
      G.character.ethnicity === 'sinhalese' &&
      G.currentYear >= 1995 && G.currentYear <= 2009 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.slkDepColomboCkpt,
    text: 'The checkpoint at Colombo 3. You slow down, open the window, hand the ID. The soldier is nineteen. You are twenty-six. The checkpoint is part of the route you take to the office. You have a restaurant you go to on Friday nights, two kilometres from a LTTE bombing that killed sixty-four people in 1987. You understand this is a specific kind of existence — the war as ambient condition, managed rather than resolved. The people at the checkpoints are Tamil. The soldier checking them is Sinhalese. The menu at the restaurant has not changed.',
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 3
      p.addFlag('slk_colombo_checkpoint_generation')
      p.setMem('slkDepColomboCkpt', true)
    },
  },

  // ── POST-ARAGALAYA RECKONING ──────────────────────────────────────────────

  {
    id: 'slk_dep_aragalaya_after',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Sri Lanka' &&
      G.currentYear >= 2023 &&
      G.age >= 25 &&
      (G.flags.has('aragalaya_generation') || G.flags.has('slk_rajapaksa_era')) &&
      !G.mem?.slkDepAragalayaAfter,
    text: 'Ranil Wickremesinghe is president. Wickremesinghe — who has lost every election he has personally contested since 1994, who has been appointed to power each time the country needed someone experienced enough to negotiate with the IMF. The debt restructuring is proceeding. The power cuts have reduced. The petrol is available. The conditions that produced the Aragalaya — the nepotism, the concentration of power, the inability to hear — have not been structurally resolved. The Rajapaksas are still in parliament. The people who stormed the presidential pool are in prison. The people who looted the treasury are in Maldives with their money.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 2
      p.setMem('slkDepAragalayaAfter', true)
    },
  },

]
