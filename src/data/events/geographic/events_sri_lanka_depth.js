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
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Sri Lanka' &&
      G.currentYear === 2004 &&
      G.age >= 14 &&
      !G.mem?.slkDepTsunami,
    text: 'December 26, and the sea goes out farther than anyone has seen it go, and the fishing families walk down to see what is on the sea floor. Then it comes back, fast, at Galle, at Hambantota, at Arugam Bay, at Batticaloa, and in a couple of hours tens of thousands are dead, Sinhalese and Tamil and Muslim alike. For a few days the war pauses while both sides help with the relief. Then it does not.',
    context: 'About 30,000 people died in Sri Lanka in the 2004 Indian Ocean tsunami.',
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
        outcome: 'The relief effort absorbs you. You carry things you never carry. For a brief period the work requires everyone and produces a kind of solidarity that does not persist when the work ends.',
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
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Sri Lanka' &&
      G.character.ethnicity === 'indian_tamil' &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.slkDepEstateTamil,
    text: 'The estate is its own world in the hill country. Your family has picked tea for three generations, brought from South India by the British to work estates the Kandyan Sinhalese would not. The line rooms, the check roll, the kilos weighed each day are the words of your childhood. In 1948 citizenship was taken from most estate Tamils, and it was given back in 1988, and your parents voted for the first time in 1989. A vote is not the same thing as equality in Nuwara Eliya.',
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
    text: () => pick([
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
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Sri Lanka' &&
      G.character.ethnicity === 'sri_lankan_tamil' &&
      G.currentYear >= 2009 && G.currentYear <= 2011 &&
      G.age >= 20 &&
      !G.mem?.slkDepMullivaikkal,
    text: 'The government declares no-fire zones on the coast and then shells them, and shells the hospitals with red crosses on the roofs. The corridor the civilians are inside gets narrower every week. The footage exists. The reports exist. There is no tribunal, and the government says its army was the most humanitarian in the world. You had family inside that corridor. Some of them came out.',
    context: 'A UN panel of experts put the civilian toll in the final months at a minimum of 40,000.',
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
    phase: null,
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
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Sri Lanka' &&
      G.currentYear === 2019 &&
      G.age >= 18 &&
      !G.mem?.slkDepEasterSunday,
    text: 'Easter Sunday 2019: bombs in three churches and three hotels, in Colombo, Negombo and Batticaloa, by men linked to the Islamic State. The intelligence services had been warned and did nothing. In November the country elects Gotabaya Rajapaksa, the security candidate. The country that survived the war has a new fear, from a direction twenty-six years of war did not prepare it for.',
    context: 'The Easter bombings killed about 270 people.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Sri Lanka' &&
      G.ruralUrban === 'urban' &&
      G.character.ethnicity === 'sinhalese' &&
      G.currentYear >= 1995 && G.currentYear <= 2009 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.slkDepColomboCkpt,
    text: 'The checkpoint at Colombo 3. You slow down, open the window, hand over the card. The soldier is nineteen and you are twenty-six, and the checkpoint is on your way to the office. The restaurant you go to on Friday nights is two kilometres from where a bomb killed sixty people when you were a child. The war is an ambient condition, managed rather than resolved. The menu at the restaurant has not changed.',
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
    text: 'Ranil Wickremesinghe is president, a man who has lost nearly every election he ever personally fought and is appointed whenever someone is needed to talk to the IMF. The debt is being restructured; the power cuts are shorter; there is petrol. Nothing that produced the Aragalaya has been fixed. The Rajapaksas are still in parliament. The people who swam in the president\'s pool are in prison.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 2
      p.setMem('slkDepAragalayaAfter', true)
    },
  },

]
