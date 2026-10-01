// events_philippines_depth.js
// Philippines depth texture:
// OFW departure culture, jeepney commute, balikbayan box ritual,
// Mindanao/Moro identity and Bangsamoro, maritime labor, BPO call centers,
// Ondoy 2009, campus activism under martial law, Imelda's shoes.

const isPhilippines = (G) => G.character.country?.name === 'Philippines'
const isMindanao = (G) => isPhilippines(G) && G.character.religion?.startsWith('muslim')

export const PHILIPPINES_DEPTH_EVENTS = [

  // ── OFW DEPARTURE ─────────────────────────────────────────────────────────────

  {
    id: 'ph_dep_ofw_departure',
    phase: null,
    weight: 4,
    when: (G) =>
      isPhilippines(G) &&
      (G.currentCountry?.name ?? 'Philippines') === 'Philippines' &&
      G.currentYear >= 1985 && G.currentYear <= 2015 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.phOfwDeparture,
    text: `The departure: the whole family at Terminal 1, uncles and cousins who drove two hours, because this is the kind of thing you turn up for. The OFW queue is its own queue, under a sign that says Bagong Bayani, new hero, and the government means it, because the money sent home holds up the economy. The tax, the window for your welfare card, and then the family on the other side of the glass, getting smaller. The balikbayan box will arrive before you do.`,
    choices: [
      {
        text: 'You are the one leaving.',
        tag: null,
        outcome: 'You memorise the faces through the glass. The memory will be accurate for about a year and then will begin to need refreshing from photographs.',
        // `setResidency` changed the papers and left the character in Manila
        // for the rest of their life. `emigrateTo` puts them where they went.
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('ph_dep_ofw_family'); p.emigrateTo(['Saudi Arabia', 'Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Italy']); p.setMem('phOfwDeparture', true) },
      },
      {
        text: 'You are one of the ones watching.',
        tag: null,
        outcome: 'Your parent or sibling or spouse goes through the gate. The drive home is quiet in a way. The first phone call comes two days later.',
        effect: (p) => { p.m -= 6; p.addFlag('ph_dep_ofw_family'); p.setMem('phOfwDeparture', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ph_dep_balikbayan_box',
    phase: null,
    weight: 3,
    when: (G) =>
      isPhilippines(G) &&
      G.flags.has('ph_dep_ofw_family') &&
      G.currentYear >= 1988 && G.currentYear <= 2015 &&
      G.age >= 5 && G.age <= 18 &&
      !G.mem?.phBalikbayanBox,
    text: `The box arrives before Christmas: a balikbayan box, a hundred-litre cardboard cube reinforced with tape, sent by ship because the shipping is cheaper than air. The contents: Spam, Oreos, Hershey's, clothes that are one size larger than you are because your parent estimated you from nine months ago, shoes, a toy or two, medicine. The relatives in the US or Saudi or Japan pack these things and seal them and they travel six weeks by sea. You know the brands from the box before you know the country they came from. The box is a letter in the language of what is available there and unaffordable here.`,
    choices: null,
    effect: (p) => { p.m += 6; p.r += 4; p.setMem('phBalikbayanBox', true) },
  },

  // ── JEEPNEY TEXTURE ───────────────────────────────────────────────────────────

  {
    id: 'ph_dep_jeepney',
    phase: null,
    weight: 3,
    when: (G) =>
      isPhilippines(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1975 && G.currentYear <= 2020 &&
      G.age >= 14 && G.age <= 45 &&
      !G.mem?.phJeepney,
    text: `The jeepney: extended from American military jeeps left after WWII, painted in chrome and saints and province names and the driver's family. The barker shouts the route: Monumento, Quiapo, EDSA. You board from behind and pass your fare forward — person to person down the aisle — to the driver, who makes change without looking and drives at the same time. The ventilation is the open sides. The saints on the dashboard each have a name and a story of where they came from. The air inside holds the exhaust of EDSA traffic for the whole route. You have taken this route so many times that you know which saints are on the dashboard of which jeepney.`,
    choices: null,
    effect: (p) => { p.r += 3; p.m += 3; p.setMem('phJeepney', true) },
  },

  // ── MARTIAL LAW CAMPUS ────────────────────────────────────────────────────────

  {
    id: 'ph_dep_campus_martial_law',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isPhilippines(G) &&
      G.currentYear >= 1972 && G.currentYear <= 1983 &&
      G.age >= 17 && G.age <= 28 &&
      !G.mem?.phCampusMartialLaw,
    text: `The universities in 1970 were full of rallies before the declaration. After September 1972 the rallies stop. The ROTC is compulsory and the ROTC colonel is connected to the military intelligence apparatus in ways that are understood but not stated. The progressive organisations have gone underground or stopped. Some students know people who have disappeared: arrested under Proclamation 1081, held in Camp Crame or Fort Magsaysay, returned changed or not returned. The library still has the books. The conversations happen in certain rooms, with certain people, on trust.`,
    choices: [
      {
        text: 'You stay inside the allowed — you have a family to protect and a degree to finish.',
        tag: null,
        outcome: 'You earn the degree. It protects you. The calculation is something you will carry, and will sometimes call prudence and sometimes call something else.',
        effect: (p) => { p.m -= 5; p.r += 6; p.addFlag('marcos_generation'); p.setMem('phCampusMartialLaw', true) },
      },
      {
        text: 'You know the rooms and the people and you are inside the conversation.',
        tag: null,
        outcome: 'The conversation is dangerous and real. You are careful and sometimes careless and so far this has been enough.',
        effect: (p) => { p.m -= 3; p.r += 4; p.karma += 6; p.addFlag('marcos_generation'); p.addFlag('inner_dissent'); p.setMem('phCampusMartialLaw', true) },
      },
    ],
    effect: null,
  },

  // ── IMELDA'S SHOES ────────────────────────────────────────────────────────────

  {
    id: 'ph_dep_imelda_shoes',
    phase: null,
    weight: 2,
    when: (G) =>
      isPhilippines(G) &&
      G.currentYear >= 1986 && G.currentYear <= 1995 &&
      G.age >= 14 &&
      !G.mem?.phImeldaShoes,
    text: `When the Marcoses fled to Hawaii in 1986, the inventory of Malacañang Palace found 3,000 pairs of shoes in Imelda's closet. This is now the fact that structures how the world sees the Philippines in the Marcos years — a detail that stands for all the details. You have a narrower set of facts: the hospitals that weren't built, the newspapers that stayed closed, the friends of your parents who didn't come back from the detention centres. The shoes are true. The shoes are also the easiest true thing to put in a sentence.`,
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('phImeldaShoes', true) },
  },

  // ── MORO / MINDANAO ───────────────────────────────────────────────────────────

  {
    id: 'ph_dep_moro_identity',
    phase: null,
    weight: 4,
    when: (G) =>
      isMindanao(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      G.age >= 8 && G.age <= 18 &&
      !G.mem?.phMoroIdentity,
    text: `You grow up in Mindanao knowing the word Moro, once a Spanish insult for Muslims, now claimed. The MNLF has fought for a separate state since 1969, and the MILF broke away from it in 1984, and the army's operations have names. The soldiers at the checkpoint are not from Mindanao. They look at your name and then at you, and the name tells them everything they think they need. You learn to carry it differently in different rooms.`,
    choices: [
      {
        text: 'Your family is in the conflict zones. You have moved for safety.',
        tag: null,
        outcome: 'The displacement has a town name, a house left, a school interrupted. These do not reduce to the word "refugee." They remain themselves.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('ph_dep_moro_identity'); p.setMem('phMoroIdentity', true) },
      },
      {
        text: 'Your family is in Cotabato or Marawi or Davao, managing the civilian middle.',
        tag: null,
        outcome: 'The civilian middle means: going to school when school is open, staying home when the sounds are wrong, not speaking about what you hear on the radio in rooms that have the wrong people in them.',
        effect: (p) => { p.m -= 5; p.e += 4; p.addFlag('ph_dep_moro_identity'); p.setMem('phMoroIdentity', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ph_dep_bangsamoro_2019',
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      isMindanao(G) &&
      G.flags.has('ph_dep_moro_identity') &&
      G.currentYear >= 2019 &&
      G.age >= 25 &&
      !G.mem?.phBangsamoro,
    text: `January 2019: the Bangsamoro Organic Law passes the plebiscite. After fifty years of armed conflict — the MNLF, the MILF, Camp Abubakar, the Marawi siege of 2017 — there is now a Bangsamoro Autonomous Region in Muslim Mindanao with its own parliament and chief minister. The peace agreement does not mean the same thing to everyone in Mindanao. It means different things depending on which decade you spent in the conflict, which family members you are counting, which groups you trust to implement it. You have opinions calibrated by experience. The BOL is signed into law. What it produces will take decades to know.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.m += 4; p.setMem('phBangsamoro', true) },
  },

  // ── SEAMEN / MARITIME LABOR ────────────────────────────────────────────────────

  {
    id: 'ph_dep_seaman',
    phase: null,
    weight: 3,
    when: (G) =>
      isPhilippines(G) &&
      G.currentYear >= 1975 && G.currentYear <= 2015 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.phSeaman,
    text: `A quarter of the world's seafarers are Filipino. You train in Manila or Cebu, get the certificates, and the agency signs you for nine months with a Norwegian company or a Greek tanker or a Japanese cargo line, under a flag of Panama or Liberia or the Marshall Islands. You are the crew. The money goes home every month from an exchange stall near whatever port you are in. The nine months become a life counted in contracts.`,
    choices: [
      {
        text: 'You become a seaman. The nine-month contract becomes a way of life.',
        tag: null,
        outcome: 'The life is the months aboard and the months home, the children who grow in between, the savings account that grows differently from the savings of people on land.',
        effect: (p) => { p.mo += 8000; p.m -= 5; p.r += 5; p.addFlag('ph_dep_seaman_family'); p.setMem('phSeaman', true) },
      },
      {
        text: 'You train but take a land-based job instead.',
        tag: null,
        outcome: 'The maritime training certifications hang in a folder. The option remains and you do not take it. This is a decision you will revisit in years when land money is short.',
        effect: (p) => { p.e += 4; p.m += 3; p.setMem('phSeaman', true) },
      },
    ],
    effect: null,
  },

  // ── BPO / CALL CENTERS ────────────────────────────────────────────────────────

  {
    id: 'ph_dep_bpo',
    phase: null,
    weight: 4,
    when: (G) =>
      isPhilippines(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 2002 && G.currentYear <= 2020 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.phBpo,
    text: `By 2010 the call centres of Makati, Ortigas and Cebu have overtaken India's. The air conditioning is set to an American thermostat, and the shift is the night shift, because the Americans are awake. You change your sleep, and your accent, and on the calls your name is James or Karen. Between calls you eat in the cafeteria with other people who have done the same to their nights and their names. It pays more than teaching.`,
    choices: [
      {
        text: 'The BPO job is the best job available and you take it seriously.',
        tag: null,
        outcome: 'You move up: team leader, quality analyst, operations manager. The accent becomes irrelevant at the manager level. The night shift does not.',
        effect: (p) => { p.mo += 6000; p.e += 3; p.addFlag('ph_dep_bpo_generation'); p.setMem('phBpo', true) },
      },
      {
        text: 'You use the BPO job to fund something else — school, savings, a different plan.',
        tag: null,
        outcome: 'The night shifts fund the day plan. The plan takes longer than expected. The night shifts continue longer than expected. This is how the plan becomes the life.',
        effect: (p) => { p.mo += 4000; p.r += 4; p.addFlag('ph_dep_bpo_generation'); p.setMem('phBpo', true) },
      },
    ],
    effect: null,
  },

  // ── ONDOY 2009 ────────────────────────────────────────────────────────────────

  {
    id: 'ph_dep_ondoy_2009',
    phase: null,
    weight: 4,
    when: (G) =>
      isPhilippines(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear === 2009 &&
      G.age >= 16 &&
      !G.mem?.phOndoy,
    text: `September 2009, and Ondoy drops a month of rain on Manila in six hours, and the Marikina River comes over its banks. People on rooftops; the water in the houses up to the second floor. The rescue boats are private bangkas, because the official rescue runs on another timeline. You spend the storm on a roof or in a car or watching the water come in at the door, while strangers on Twitter map which streets are still passable.`,
    choices: [
      {
        text: 'Your home flooded.',
        tag: null,
        outcome: 'The inventory of what the water took is exact. The drying out takes weeks. The mud smell in the walls takes longer. You know now exactly what elevation your house sits at.',
        effect: (p) => { p.m -= 8; p.h -= 4; p.mo -= 5000; p.r += 5; p.addFlag('ph_dep_ondoy_survivor'); p.setMem('phOndoy', true) },
      },
      {
        text: 'You were safe and spent the storm helping others.',
        tag: null,
        outcome: 'The rope, the bangka, the dry clothing you passed over a fence. You remember the face of each person you pulled out of the water.',
        effect: (p) => { p.karma += 7; p.m -= 4; p.addFlag('ph_dep_ondoy_survivor'); p.setMem('phOndoy', true) },
      },
    ],
    effect: null,
  },

]
