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
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1952 && G.currentYear <= 1965 &&
      G.age >= 6 && G.age <= 20 &&
      !G.mem?.bngDepEkushey,
    text: 'February 21, 1952. Students at Dhaka University march against the government\'s decision that Urdu, which most Bengalis do not speak, will be the only national language, and the police fire on them. Rafiq, Barkat, Jabbar, Salam: every child in East Pakistan learns the names. The language they died for is the language you are thinking in now. Ekushey, the twenty-first, becomes the date everything is organised around.',
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
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear === 1988 &&
      G.age >= 12 &&
      !G.mem?.bngDepFloods88,
    text: () => pick([
      'The water comes and does not go. Dhaka floods, which nobody living can remember; the roads are rivers and the cattle stand on whatever roofs are still above it. It stays for weeks. When it goes down the roads are gone in places and the crops nearly everywhere, and every household asks the same question about where to begin.',
      'The flood takes the winter rice crop before it is harvested. The aid arrives in boats. The boats can reach some villages and not others. In the villages they cannot reach, people eat what they have until they don\'t. You learn the geography of where the food goes in a disaster not from a map but from who comes back thinner and who doesn\'t come back.',
    ]),
    context: 'The 1988 floods covered about three-quarters of Bangladesh, the worst in the country\'s recorded history.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1975 && G.currentYear <= 2000 &&
      G.age >= 16 &&
      G.ethnicity === 'chakma' &&
      !G.mem?.bngDepCHT,
    text: 'The Hill Tracts are where the Chakma, the Marma, the Tripura and others have lived for centuries. Since the seventies the government has been settling Bengali families in the hills, and the Shanti Bahini has been fighting it, and the army\'s operations do not reach the Dhaka papers. Your village was moved, or you know a village that was burned. The 1997 accord gives autonomy on paper. The settlers stay.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 2017 &&
      G.age >= 20 &&
      !G.mem?.bngDepRohingya,
    text: () => pick([
      'From the beach road at Cox\'s Bazar you can see the camp: bamboo and plastic sheeting up the hillsides, the aid agencies\' vehicles going round and round. Most of the people in it came in August 2017, from across the border in Myanmar. Bangladesh has sheltered Rohingya for thirty years, but never like this. The world\'s attention came and moved on. The Rohingya are still in the camp.',
      'Your relative works for an NGO in the camp. The stories that come back from the camp are not the stories in the international news. The international news has the broad shape. The camp stories are: the family, the medical case that was or wasn\'t treated, the registration card that allows or doesn\'t allow movement, the cruelty of a situation that has lasted this long without resolution.',
    ]),
    context: 'Kutupalong, with about a million Rohingya residents, became the largest refugee camp in the world after the Myanmar military\'s 2017 clearance operations.',
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
    phase: null,
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
    phase: null,
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
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 2013 && G.currentYear <= 2018 &&
      G.flags.has('bng_garment_generation') &&
      G.age >= 22 &&
      !G.mem?.bngDepRanaAfter,
    text: 'There were cracks in the pillars on the Tuesday and the bank on the ground floor sent its staff home. The floors above were told to come in or lose the month. It took thirty seconds. Afterwards there is an accord and there are inspections and a fire door on your own floor that now opens outward, and the fund pays your neighbour less than the letter said it would. The orders did not go anywhere else, because the wage here is still the wage.',
    context: 'Rana Plaza in Savar collapsed on 24 April 2013, killing 1,134 garment workers and injuring some 2,500. Cracks had been reported the previous day and the building\'s bank and shops evacuated, but garment workers were ordered back in. The Accord on Fire and Building Safety, signed by over 190 brands, inspected more than 1,600 factories. The compensation fund reached its target only after two years of campaigning.',
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
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 2012 &&
      G.age >= 20 &&
      !G.mem?.bngDepBkash,
    text: 'bKash: any phone, no bank. The garment worker in Ashulia, the rickshaw puller in Khulna, the farmer in Bogura can all send and receive money now. The remittance from Malaysia arrives as a text message, and the village shop takes payment on the app. Grameen built its lending with group meetings; this was built with a SIM card. The country skipped the step where everyone needed a branch.',
    context: 'bKash, launched in 2011, had about sixty million registered accounts by 2020.',
    choices: null,
    effect: (p) => {
      p.e += 3
      p.w += 3
      p.addFlag('bng_bkash_generation')
      p.setMem('bngDepBkash', true)
    },
  },

]
