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
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Angola' &&
      G.currentYear >= 1975 && G.currentYear <= 1980 &&
      G.age >= 14 &&
      !G.mem.angCivilWar,
    text: 'November 11, 1975, and Portugal leaves, fast, without a proper handover, and the three movements that fought it are at war with each other for the country. Cuban troops come for the MPLA, and South Africans cross from Namibia for the others; the Cold War has chosen Angola as a venue. The MPLA holds Luanda. The rest is front lines. This is what independence looks like.',
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
        outcome: 'The front lines are on no map you can see. They are in the village one morning and gone the next. You survive by reading the air.',
        effect: (p) => { p.m -= 16; p.h -= 5; p.r += 10; p.addFlag('angola_civil_war_generation'); p.setMem('angCivilWar', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ang_war_years_midlife',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Angola' &&
      G.currentYear >= 1985 && G.currentYear <= 2001 &&
      G.age >= 25 &&
      !G.mem.angWarMidlife,
    text: 'The war is in its second decade: the MPLA in the cities, UNITA in the bush, and mines everywhere, on the roads between towns, so that every bus journey carries an understood risk. In Luanda you get what the formal economy does not provide at the candonga markets. The oil comes out offshore. The money does not come back as roads or hospitals.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('angola_landmine_generation'); p.setMem('angWarMidlife', true) },
  },

  {
    id: 'ang_peace_2002',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Angola' &&
      G.currentYear === 2002 &&
      G.age >= 18 &&
      !G.mem.angPeace,
    text: 'February 2002, and Savimbi is killed in an ambush in the east. Six weeks later the two armies sign a ceasefire at Luena. The war that ran your whole adult life, that shaped every road and every family, ends. There are mines in the ground everywhere. Reconstruction begins from this.',
    context: 'Angola\'s civil war ran from 1975 to 2002, killing some 500,000 people and displacing about four million.',
    choices: null,
    effect: (p) => { p.m += 14; p.r += 6; p.addFlag('angola_peace_generation'); p.setMem('angPeace', true) },
  },

  {
    id: 'ang_oil_boom',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Angola' &&
      G.currentYear >= 2004 && G.currentYear <= 2014 &&
      G.age >= 25 &&
      !G.mem.angOilBoom,
    text: 'The oil price is high and the offshore fields are pumping flat out, and the economy grows faster than anywhere in Africa. Cranes on the Luanda skyline. A little of Sonangol\'s money builds roads and flats; more of it finds its way to the companies of the party\'s friends, and the president\'s daughter runs the oil company. For a while Luanda is one of the most expensive cities on earth for foreigners. For everyone else the arithmetic is different.',
    choices: null,
    effect: (p) => { p.m += 4; p.mo += 600; p.r += 5; p.addFlag('angola_oil_boom_generation'); p.setMem('angOilBoom', true) },
  },

  {
    id: 'ang_dos_santos_rule',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Angola' &&
      G.currentYear >= 1985 && G.currentYear <= 2016 &&
      G.age >= 20 &&
      !G.mem.angDosSantos,
    text: 'José Eduardo dos Santos has been president since 1979 — one of the longest-serving heads of state in the world. The MPLA is the state and the state is the MPLA. His daughter Isabel dos Santos runs Sonangol. His son runs the sovereign wealth fund. The political opposition exists in a narrow legal space that the government monitors and occasionally criminalises. The party that fought Portuguese colonialism became an extraction machine of its own. You know this and know what can and cannot be said about it.',
    choices: null,
    effect: (p) => { p.m -= 7; p.r += 5; p.addFlag('angola_mpla_generation'); p.setMem('angDosSantos', true) },
  },

  {
    id: 'ang_landmine_reality',
    phase: null,
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
