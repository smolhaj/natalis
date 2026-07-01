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
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isPhilippines(G) &&
      G.currentYear >= 1985 && G.currentYear <= 2015 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.phOfwDeparture,
    text: `The departure ritual: the whole family at NAIA Terminal 1, sometimes uncles and cousins who drove two hours because this is the kind of thing you are present for. The OFW queue is its own queue. The signs say "Bagong Bayani" — New Hero — and the government means it, because the remittances are twenty percent of GDP. The departure tax. The window where you process your OWWA membership card. Then the terminal, and the family on the other side of the glass, getting smaller. You are going to Saudi or Hong Kong or Italy or the US. The balikbayan box will arrive before you do.`,
    choices: [
      {
        text: 'You are the one leaving.',
        tag: null,
        outcome: 'You memorise the faces through the glass. The memory will be accurate for about a year and then will begin to need refreshing from photographs.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('ph_dep_ofw_family'); p.setResidency('work_visa'); p.setMem('phOfwDeparture', true) },
      },
      {
        text: 'You are one of the ones watching.',
        tag: null,
        outcome: 'Your parent or sibling or spouse goes through the gate. The drive home is quiet in a specific way. The first phone call comes two days later.',
        effect: (p) => { p.m -= 6; p.addFlag('ph_dep_ofw_family'); p.setMem('phOfwDeparture', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ph_dep_balikbayan_box',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      isPhilippines(G) &&
      G.flags.has('ph_dep_ofw_family') &&
      G.currentYear >= 1988 && G.currentYear <= 2015 &&
      G.age >= 5 && G.age <= 18 &&
      !G.mem?.phBalikbayanBox,
    text: `The box arrives before Christmas: a balikbayan box, a hundred-litre cardboard cube reinforced with tape, sent by ship because the shipping is cheaper than air. The contents are specific: Spam, Oreos, Hershey's, clothes that are one size larger than you are because your parent estimated you from nine months ago, shoes, a toy or two, medicine. The relatives in the US or Saudi or Japan pack these things and seal them and they travel six weeks by sea. You know the brands from the box before you know the country they came from. The box is a letter in the language of what is available there and unaffordable here.`,
    choices: null,
    effect: (p) => { p.m += 6; p.r += 4; p.setMem('phBalikbayanBox', true) },
  },

  // ── JEEPNEY TEXTURE ───────────────────────────────────────────────────────────

  {
    id: 'ph_dep_jeepney',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isPhilippines(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1975 && G.currentYear <= 2020 &&
      G.age >= 14 && G.age <= 45 &&
      !G.mem?.phJeepney,
    text: `The jeepney: extended from American military jeeps left after WWII, painted in chrome and saints and province names and the driver's family. The barker shouts the route: Monumento, Quiapo, EDSA. You board from behind and pass your fare forward — person to person down the aisle — to the driver, who makes change without looking and drives at the same time. The ventilation is the open sides. The saints on the dashboard have specific names and provenance. The air inside holds the exhaust of EDSA traffic for the whole route. You have taken this route so many times that you know which saints are on the dashboard of which jeepney.`,
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
    text: `The universities in 1970 were full of rallies before the declaration. After September 1972 the rallies stop. The ROTC is compulsory and the ROTC colonel is connected to the military intelligence apparatus in specific ways that are understood but not stated. The progressive organisations have gone underground or stopped. Some students know people who have disappeared: arrested under Proclamation 1081, held in Camp Crame or Fort Magsaysay, returned changed or not returned. The library still has the books. The conversations are specific rooms, specific people, specific trust.`,
    choices: [
      {
        text: 'You stay inside the allowed — you have a family to protect and a degree to finish.',
        tag: null,
        outcome: 'The degree is real. The protection is real. The calculation is something you will carry, and will sometimes call prudence and sometimes call something else.',
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
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      isPhilippines(G) &&
      G.currentYear >= 1986 && G.currentYear <= 1995 &&
      G.age >= 14 &&
      !G.mem?.phImeldaShoes,
    text: `When the Marcoses fled to Hawaii in 1986, the inventory of Malacañang Palace found 3,000 pairs of shoes in Imelda's closet. This is now the fact that structures how the world sees the Philippines in the Marcos years — a detail that stands for all the details. You have a more specific set of facts: the hospitals that weren't built, the newspapers that stayed closed, the friends of your parents who didn't come back from the detention centres. The shoes are true. The shoes are also the easiest true thing to put in a sentence.`,
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.setMem('phImeldaShoes', true) },
  },

  // ── MORO / MINDANAO ───────────────────────────────────────────────────────────

  {
    id: 'ph_dep_moro_identity',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      isMindanao(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      G.age >= 8 && G.age <= 18 &&
      !G.mem?.phMoroIdentity,
    text: `You grow up in Mindanao knowing the word Moro — originally a Spanish slur for Muslim Filipinos, now claimed. The MNLF under Nur Misuari has been fighting since 1969 for a separate state. The MILF broke away from the MNLF in 1984. The military operations have names: Oplan Ultimatum, Oplan Lambat-Bitag. The AFP soldiers at the checkpoint are not from Mindanao. They look at your name and they look at you. The name is the thing that explains everything to them about you. You are learning to carry the explanation differently in different rooms.`,
    choices: [
      {
        text: 'Your family is in the conflict zones. You have moved for safety.',
        tag: null,
        outcome: 'The displacement is specific: a town name, a house left, a school interrupted. These specifics do not simplify into the word "refugee." They remain themselves.',
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      isMindanao(G) &&
      G.flags.has('ph_dep_moro_identity') &&
      G.currentYear >= 2019 &&
      G.age >= 25 &&
      !G.mem?.phBangsamoro,
    text: `January 2019: the Bangsamoro Organic Law passes the plebiscite. After fifty years of armed conflict — the MNLF, the MILF, Camp Abubakar, the Marawi siege of 2017 — there is now a Bangsamoro Autonomous Region in Muslim Mindanao with its own parliament and chief minister. The peace agreement does not mean the same thing to everyone in Mindanao. It means different things depending on which decade you spent in the conflict, which family members you are counting, which groups you trust to implement it. You have opinions calibrated by specific experience. The BOL is real. What it produces will take decades to know.`,
    choices: null,
    effect: (p) => { p.r += 4; p.e += 3; p.m += 4; p.setMem('phBangsamoro', true) },
  },

  // ── SEAMEN / MARITIME LABOR ────────────────────────────────────────────────────

  {
    id: 'ph_dep_seaman',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isPhilippines(G) &&
      G.currentYear >= 1975 && G.currentYear <= 2015 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.phSeaman,
    text: `A quarter of the world's seafarers are Filipino. The training is in Manila or Cebu — marine engineering, seamanship, STCW certification. Then the agency: you sign a nine-month contract with a Norwegian shipping company or a Greek tanker operator or a Japanese cargo firm. The ship is not Filipino. The flag is Panama or Liberia or the Marshall Islands, which are flags of convenience. You are the crew. The remittance goes home every month through a money-changing service on a street near the port in whatever city you're in. The nine months become a life that is measured in contracts.`,
    choices: [
      {
        text: 'You become a seaman. The nine-month contract becomes a way of life.',
        tag: null,
        outcome: 'The life is specific: the months aboard and the months home, the children who grow in between, the savings account that grows differently from the savings of people on land.',
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
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isPhilippines(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 2002 && G.currentYear <= 2020 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.phBpo,
    text: `The BPO boom: business process outsourcing. By 2010 the Philippines overtakes India as the world's call center capital. The offices are in Makati, BGC, Ortigas, Cebu IT Park — air-conditioned at the temperature Americans set their thermostats. The shift is night shift because the Americans are awake. You change your sleep cycle. You adopt an American accent or a neutral accent, which is the same thing. Your name becomes "James" or "Karen" for the call. Between calls you eat in the cafeteria with the other people who have done what you've done to their sleep and their name. The salary is 25,000 pesos a month, which is more than a teacher makes.`,
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
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      isPhilippines(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear === 2009 &&
      G.age >= 16 &&
      !G.mem?.phOndoy,
    text: `September 26, 2009. Tropical Storm Ondoy drops a month of rain on Metro Manila in six hours. The Marikina River overflows. Cainta, Pasig, Marikina, Quezon City. People on rooftops. The water inside houses reaches the second floor. The rescue boats are private bangkas because the official rescue has a different timeline. You spend the storm on a roof or in a car or watching the water enter at the doorway. The Twitter feeds map which streets are passable. This is the first disaster where the response routes through social media because the official channels cannot process the scale fast enough.`,
    choices: [
      {
        text: 'Your home flooded.',
        tag: null,
        outcome: 'The inventory of what the water took is specific. The drying out takes weeks. The mud smell in the walls takes longer. You know now exactly what elevation your house sits at.',
        effect: (p) => { p.m -= 8; p.h -= 4; p.mo -= 5000; p.r += 5; p.addFlag('ph_dep_ondoy_survivor'); p.setMem('phOndoy', true) },
      },
      {
        text: 'You were safe and spent the storm helping others.',
        tag: null,
        outcome: 'The rope, the bangka, the dry clothing you passed over a fence. The faces of people you pulled out of water are specific.',
        effect: (p) => { p.karma += 7; p.m -= 4; p.addFlag('ph_dep_ondoy_survivor'); p.setMem('phOndoy', true) },
      },
    ],
    effect: null,
  },

]
