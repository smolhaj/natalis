// Angola character events
// Historical arcs: Portuguese colonialism and forced labour (contract labour system),
// independence 1975 and immediate civil war (MPLA vs UNITA vs FNLA),
// Cuban troops and Soviet backing for MPLA, South African/US backing for UNITA,
// civil war 1975–2002 (500,000 dead, 4 million displaced), Jonas Savimbi killed 2002,
// oil boom and reconstruction, authoritarian MPLA rule, Luanda as world's most
// expensive city (2014–16 expat rankings), 2017 transition from Dos Santos to Lourenço.

export const ANGOLA_EVENTS = [

  {
    id: 'ang_independence_civil_war_1975',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Angola' &&
      G.currentYear >= 1975 && G.currentYear <= 1980 &&
      G.age >= 14 &&
      !G.mem.angCivilWar,
    text: 'November 11, 1975. Portugal grants independence and departs — quickly, without a proper handover. The three liberation movements — MPLA, UNITA, FNLA — are simultaneously at war with each other for the country. Cuban troops arrive to back the MPLA; South African forces cross from Namibia to back UNITA and FNLA. The Cold War has chosen Angola as a venue. Luanda is the capital; the MPLA holds it. The rest of the country is divided by force and shifting front lines. This is what independence looks like.',
    choices: [
      {
        text: 'You support the MPLA — the Marxist movement that holds Luanda.',
        tag: null,
        outcome: 'The MPLA wins the capital and international recognition. What winning costs in the interior is a different accounting.',
        effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('angola_civil_war_generation'); p.addFlag('angola_mpla_supporter'); p.setMem('angCivilWar', true) },
      },
      {
        text: 'You are in a rural area — the war arrives as something that happens to the land you live on.',
        tag: null,
        outcome: 'The front lines are not on maps you have access to. They are in the village one morning and gone the next. You survive by reading the air.',
        effect: (p) => { p.m -= 16; p.h -= 5; p.r += 10; p.addFlag('angola_civil_war_generation'); p.setMem('angCivilWar', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ang_war_years_midlife',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Angola' &&
      G.currentYear >= 1985 && G.currentYear <= 2001 &&
      G.age >= 25 &&
      !G.mem.angWarMidlife,
    text: 'The war is in its second decade. The MPLA controls the cities; UNITA controls the bush. The landmines are everywhere — Angola has more landmines per square kilometre than any country in the world; the count will reach ten to fifteen million. The roads between cities are mined. A journey by car or bus is a journey with an understood statistical risk. Luanda\'s informal markets — the candonga — are how you get what the formal economy doesn\'t provide. The oil is being extracted offshore. The money doesn\'t arrive in the form of roads or hospitals.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('angola_landmine_generation'); p.setMem('angWarMidlife', true) },
  },

  {
    id: 'ang_peace_2002',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Angola' &&
      G.currentYear === 2002 &&
      G.age >= 18 &&
      !G.mem.angPeace,
    text: 'February 22, 2002. UNITA leader Jonas Savimbi is killed in a government ambush in Moxico province. The war has gone on for twenty-seven years. Six weeks later the MPLA and UNITA sign the Luena Memorandum — ceasefire, integration of UNITA forces. The war that has run your entire adult life, that has shaped everything about the country\'s infrastructure and economy and population, ends. Angola has more landmines in its soil than people alive. 500,000 people are dead. Four million are displaced. Reconstruction begins from this.',
    choices: null,
    effect: (p) => { p.m += 14; p.r += 6; p.addFlag('angola_peace_generation'); p.setMem('angPeace', true) },
  },

  {
    id: 'ang_oil_boom',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Angola' &&
      G.currentYear >= 2004 && G.currentYear <= 2014 &&
      G.age >= 25 &&
      !G.mem.angOilBoom,
    text: 'The oil price is high and Angola\'s offshore fields are producing at full capacity. GDP growth is the fastest in Africa for several years. The construction cranes are on Luanda\'s skyline. The Sonangol state oil company\'s revenues are enormous. A fraction of it builds the roads and apartments the city needs. A larger fraction finds its way to other places — MPLA-connected construction companies, the president\'s daughter at the head of Sonangol. Luanda is briefly one of the most expensive cities in the world for foreign workers. For everyone else, the arithmetic is different.',
    choices: null,
    effect: (p) => { p.m += 4; p.mo += 600; p.r += 5; p.addFlag('angola_oil_boom_generation'); p.setMem('angOilBoom', true) },
  },

  {
    id: 'ang_dos_santos_rule',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Angola' &&
      G.currentYear >= 1985 && G.currentYear <= 2016 &&
      G.age >= 20 &&
      !G.mem.angDosSantos,
    text: 'José Eduardo dos Santos has been president since 1979 — one of the longest-serving heads of state in the world. The MPLA is the state and the state is the MPLA. His daughter Isabel dos Santos runs Sonangol. His son runs the sovereign wealth fund. The political opposition exists in a narrow legal space that the government monitors and occasionally criminalises. The party that fought Portuguese colonialism became its own kind of extraction machine. You know this and know what can and cannot be said about it.',
    choices: null,
    effect: (p) => { p.m -= 7; p.r += 5; p.addFlag('angola_mpla_generation'); p.setMem('angDosSantos', true) },
  },

  {
    id: 'ang_landmine_reality',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Angola' &&
      G.currentYear >= 1985 && G.currentYear <= 2010 &&
      G.age >= 16 &&
      !G.mem.angLandmine,
    text: 'The war laid fifteen million landmines in Angolan soil. This is not an abstraction — it is the reason why the path through the field is the path through the field, why certain ground is avoided, why deminers in orange helmets are a regular sight near the roads. Angola has more amputees per capita than most countries. The International Campaign to Ban Landmines won the Nobel Peace Prize in 1997. The mines are still there.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.h -= 2; p.addFlag('angola_landmine_generation'); p.setMem('angLandmine', true) },
  },

]
