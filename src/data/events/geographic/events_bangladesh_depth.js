// events_bangladesh_depth.js
// Bangladesh depth arc — texture not in events_bangladesh.js.
// events_bangladesh.js covers: Bhola 1970, Liberation War 1971, famine 1974,
// Mujib assassination 1975, cyclone as annual, garment factory/Rana Plaza,
// Grameen microloan, Dhaka city, Malaysia labor migration, 2024 uprising.
// This file: Language Movement 1952 (Ekushey), 1988 floods, Chittagong Hill
// Tracts/Jumma peoples, Rohingya camp at Cox's Bazar, hilsa fish as cultural
// inheritance, Eid homeward migration, Rana Plaza aftermath, bKash mobile money.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const BANGLADESH_DEPTH_EVENTS = [

  // ── LANGUAGE MOVEMENT 1952 ────────────────────────────────────────────────

  {
    id: 'bng_dep_ekushey',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1952 && G.currentYear <= 1965 &&
      G.age >= 6 && G.age <= 20 &&
      !G.mem?.bngDepEkushey,
    text: 'February 21, 1952. Students at Dhaka University march to protest the Pakistani government\'s declaration that Urdu — a language most Bengalis do not speak — will be the only national language. The police fire on the procession. Rafiquddin Ahmed. Abul Barkat. Jabbar. Salauddin. The names of the martyrs are learned by every child in East Pakistan. The language they died for is the language you are thinking in right now. Ekushey — the twenty-first — becomes the date that organizes everything. Language is identity is nation.',
    choices: null,
    effect: (p) => {
      p.e += 4
      p.m += 2
      p.r += 4
      p.addFlag('bng_ekushey_generation')
      p.setMem('bngDepEkushey', true)
    },
  },

  // ── 1988 FLOODS ───────────────────────────────────────────────────────────

  {
    id: 'bng_dep_floods_1988',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear === 1988 &&
      G.age >= 12 &&
      !G.mem?.bngDepFloods88,
    text: pick([
      'Seventy-five percent of Bangladesh is underwater. The floods of 1988 are the worst in recorded history for this country — worse than 1974, worse than 1987. Dhaka is flooded for the first time. The roads are rivers. The cattle are on the rooftops of buildings that still have rooftops. The water is there for weeks. When it recedes, the roads are gone in places, the crops are gone in most places, and the question of where to begin is the question of every household.',
      'The flood takes the winter rice crop before it is harvested. The aid arrives in boats. The boats can reach some villages and not others. In the villages they cannot reach, people eat what they have until they don\'t. You learn the geography of where the food goes in a disaster not from a map but from who comes back thinner and who doesn\'t come back.',
    ]),
    choices: null,
    effect: (p) => {
      p.m -= 12
      p.h -= 6
      p.w -= 4
      p.addFlag('bng_1988_flood_generation')
      p.setMem('bngDepFloods88', true)
    },
  },

  // ── CHITTAGONG HILL TRACTS ────────────────────────────────────────────────

  {
    id: 'bng_dep_cht_jumma',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1975 && G.currentYear <= 2000 &&
      G.age >= 16 &&
      (G.ethnicity === 'chakma' || G.ethnicity === 'marma' || G.ethnicity === 'tripura' ||
       G.character?.ethnicity === 'chakma' || G.character?.ethnicity === 'marma') &&
      !G.mem?.bngDepCHT,
    text: 'The Chittagong Hill Tracts are the forested hills where the Jumma peoples — Chakma, Marma, Tripura, and others — have lived for centuries. Since 1972, the Bangladesh government has settled Bengali Muslim families in the Hills; since 1973, the Shanti Bahini has fought an insurgency. The army operations are not in the Dhaka newspapers the way the Dhaka events are. Your village has been displaced, or your village knows of a village that was burned. The 1997 peace accord gives autonomy on paper. The settlers remain. The autonomy is partial.',
    choices: [
      {
        text: 'Join the resistance. The Shanti Bahini is the only defense of the Hills.',
        tag: null,
        outcome: 'The armed resistance ends formally in 1997. What the peace accord provides and what the situation requires are not identical. The land question is not resolved by the accord.',
        effect: (p) => {
          p.m -= 10
          p.r += 8
          p.addFlag('bng_cht_generation')
          p.setMem('bngDepCHT', true)
        },
      },
      {
        text: 'Build a life in the remaining space the Hills allow.',
        tag: null,
        outcome: 'The space is narrower than it was. You build in it. The Hills are still the Hills: the jhum cultivation, the language, the ceremonies that the settlers do not participate in. The identity survives the pressure not by confronting it but by being itself in the spaces that remain.',
        effect: (p) => {
          p.m -= 5
          p.r += 5
          p.addFlag('bng_cht_generation')
          p.setMem('bngDepCHT', true)
        },
      },
    ],
    effect: null,
  },

  // ── ROHINGYA CAMP COX'S BAZAR ─────────────────────────────────────────────

  {
    id: 'bng_dep_rohingya_host',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 2017 &&
      G.age >= 20 &&
      !G.mem?.bngDepRohingya,
    text: pick([
      'Cox\'s Bazar. The Kutupalong camp is now the largest refugee camp in the world: over a million Rohingya from Myanmar, who arrived mostly in August 2017 after the military clearance operations. The camp is visible from the beach road. The bamboo shelters on the hillside, the plastic sheeting, the NGO vehicles in a constant circuit. Bangladesh has hosted Rohingya for thirty years and the scale of 2017 is an order of magnitude larger than before. The world\'s attention came and moved on. The Rohingya are still in the camp.',
      'Your relative works for an NGO in the camp. The stories that come back from the camp are not the stories in the international news. The international news has the broad shape. The camp stories are: the specific family, the medical case that was or wasn\'t treated, the registration card that allows or doesn\'t allow movement, the particular cruelty of a situation that has lasted this long without resolution.',
    ]),
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.addFlag('bng_rohingya_host_generation')
      p.setMem('bngDepRohingya', true)
    },
  },

  // ── HILSA FISH ────────────────────────────────────────────────────────────

  {
    id: 'bng_dep_hilsa',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.age >= 6 && G.age <= 25 &&
      !G.mem?.bngDepHilsa,
    text: 'The hilsa is the national fish. This means something specific: the hilsa runs up the rivers from the Bay of Bengal to spawn, and the seasonal arrival of the hilsa is an event in the calendar — the price in the bazaar, the smell of it frying, the argument about the best way to prepare it. In the monsoon the hilsa is cheap and fat and the whole city eats it; out of season the price is a measure of what a thing is worth when it is absent. Your mother prepares it the way her mother prepared it. The technique is precise and regional and differs from the technique the family across the river uses and that difference is somehow important.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.s += 2
      p.addFlag('bng_hilsa_generation')
      p.setMem('bngDepHilsa', true)
    },
  },

  // ── EID HOMEWARD MIGRATION ────────────────────────────────────────────────

  {
    id: 'bng_dep_eid_journey',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1990 &&
      G.age >= 18 && G.age <= 40 &&
      G.ruralUrban === 'urban' &&
      (G.character?.religion?.startsWith('muslim') || G.character?.birthReligion?.startsWith('muslim')) &&
      !G.mem?.bngDepEid,
    text: 'Eid ul-Fitr, and Dhaka empties. Fifteen million people leave the city in the three days before the holiday — by ferry, by bus, by train, by launch on the river. The Sadarghat terminal on the Buriganga river processes more human volume than most airports. You are on the launch overnight, sleeping on the deck with your luggage, the black river going past, the other people around you doing the same thing you are doing: going back to the village, where the mother will have cooked and the family will eat together and the children will wear new clothes and then in three days you will reverse the journey. The city and the village are the two addresses of the same life.',
    choices: null,
    effect: (p) => {
      p.m += 7
      p.s += 3
      p.addFlag('bng_eid_migration_generation')
      p.setMem('bngDepEid', true)
    },
  },

  // ── RANA PLAZA AFTERMATH ──────────────────────────────────────────────────

  {
    id: 'bng_dep_rana_after',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 2013 && G.currentYear <= 2018 &&
      G.flags.has('bng_garment_generation') &&
      G.age >= 22 &&
      !G.mem?.bngDepRanaAfter,
    text: 'Rana Plaza. April 24, 2013. You know the name the way you know a name that was said on the radio at a specific moment. The eight-story building that contained garment factories whose brands you would recognize collapsed in thirty seconds. 1,134 people dead. 2,500 injured. The brands that sourced from Rana Plaza released statements. The Accord on Fire and Building Safety was signed by one hundred and ninety brands. The inspections happened. Some buildings were improved. The compensation fund paid less than it promised to survivors. The brands continued to source from Bangladesh because the wages were still low.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 7
      p.e += 3
      p.addFlag('bng_rana_plaza_witness')
      p.setMem('bngDepRanaAfter', true)
    },
  },

  // ── BKASH MOBILE MONEY ────────────────────────────────────────────────────

  {
    id: 'bng_dep_bkash',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 2012 &&
      G.age >= 20 &&
      !G.mem?.bngDepBkash,
    text: 'bKash: the mobile money system that did in Bangladesh what traditional banks could not do. By 2020, sixty million accounts. The monthly threshold for a bKash account — any phone, no bank required — is low enough that the garment worker in Ashulia, the rickshaw puller in Khulna, the farmer in Bogura can send and receive money. The remittance from Malaysia arrives as a mobile transfer. The market purchase in the village uses the app. The Grameen Bank built financial inclusion with group meetings; bKash built it with a SIM card. Both are real. The country skipped the step where everyone needed a branch.',
    choices: null,
    effect: (p) => {
      p.e += 3
      p.w += 3
      p.addFlag('bng_bkash_generation')
      p.setMem('bngDepBkash', true)
    },
  },

]
