// events_venezuela_depth_2.js
// Venezuela depth arc: Chávez 1998 election, Barrio Adentro social missions,
// oil petrodollar boom 2006-2012, Chávez death 2013, food scarcity beginning
// 2015, 2017 protests, hyperinflation 2018-2020, the departure, colectivos,
// informal dollarization, Venezuelan migrant in Colombia, CLAP food system.
// Complements events_venezuela.js.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const VENEZUELA_DEPTH_2_EVENTS = [

  {
    id: 'ven_chavez_1998',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 1998 && G.currentYear <= 2000 &&
      G.age >= 16 &&
      !G.mem?.venChavez98,
    text: (G) => {
      const poor = G.stats.wealth < 40
      if (poor) {
        return 'December 6, 1998. Chávez has won, and in the barrio it is not a result, it is an event: fireworks from somewhere below. Your grandmother cries, and not from fear. It is the first time in her life that a man who talks like her father talked, using the same words for the same things, has won anything. You understand something about representation that you did not understand yesterday.'
      }
      return 'December 6, 1998, the results: Hugo Chávez, the coup leader of 1992, prison and out and elected, with more than half the vote. Your family voted for the other side. The television is on. Your father says: they will see, and says it again in the following weeks. You understand that "they will see" is a statement about whose fault it will be.'
    },
    choices: [
      {
        text: 'You hope. The country needed something to break.',
        tag: 'ven_chavez_generation',
        outcome: 'The break arrives. Whether it produces the thing the hope was for is the question of the next two decades.',
        effect: (p) => { p.m += 8; p.addFlag('ven_chavez_generation'); p.setMem('venChavez98', true); },
      },
      {
        text: 'A man who led a coup does not become a democrat by being elected.',
        tag: null,
        outcome: 'The argument has merit. The argument has merit for twenty years, in different configurations, as the thing it predicted partially arrives and partially does not.',
        effect: (p) => { p.r += 3; p.setMem('venChavez98', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ven_barrio_adentro',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2003 && G.currentYear <= 2010 &&
      G.stats.wealth < 50 &&
      G.age >= 15 &&
      !G.mem?.venBarrioAdentro,
    text: 'Barrio Adentro: Cuban doctors sent to the Venezuelan barrios under the oil-for-doctors exchange, providing primary care in places that have never had a clinic. The módulo is built at the corner of your street. The doctor who works there is named Dr. Ramos and she is from Santiago de Cuba and she examines your mother and finds the blood pressure problem that has never been found before and gives a prescription that costs what it costs at the farmacia de barrio, which is much less than what the private clinic charges. Your mother has this finding. You have the experience of something that was always for other people being, for once, for you.',
    choices: null,
    effect: (p) => {
      p.m += 6
      p.h += 5
      p.addFlag('ven_missions_beneficiary')
      p.setMem('venBarrioAdentro', true)
    },
  },

  {
    id: 'ven_oil_boom',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2006 && G.currentYear <= 2013 &&
      G.age >= 22 &&
      !G.mem?.venOilBoom,
    text: 'The oil is above a hundred dollars, and the money flows: into the palace, into the missions, into an import system made absurdly profitable by the official exchange rate. You buy appliances, a car, a television; your cousin flies to Miami not on holiday but to shop. The economy is a wheel turning on oil, turning fast, and a wheel turning fast feels as if it will keep turning. It will not, at this speed.',
    choices: [
      {
        text: 'You save in dollars, slowly, through the parallel market.',
        tag: null,
        outcome: 'The savings exist when the savings matter. The parallel market rate, the number you track on your phone, the number everyone tracks privately while pretending not to, becomes the only real number in the economy.',
        effect: (p) => { p.mo += 8000; p.w += 4; p.e += 3; p.addFlag('ven_boom_generation'); p.setMem('venOilBoom', true); },
      },
      {
        text: 'You spend. The bolivar is what it is and you live in it.',
        tag: 'ven_boom_generation',
        outcome: 'You live in the bolivar and the bolivar lives in the oil price and the oil price has a future the economy has not told you about yet.',
        effect: (p) => { p.m += 8; p.mo += 3000; p.addFlag('ven_boom_generation'); p.setMem('venOilBoom', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ven_dep_chavez_death',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2013 && G.currentYear <= 2014 &&
      G.age >= 16 &&
      !G.mem?.venChavezDeath && !G.mem?.ven_chavez_death,
    text: (G) => {
      const isChavista = G.flags.has('ven_chavez_generation') || G.flags.has('ven_missions_beneficiary')
      if (isChavista) {
        return 'March 5, 2013. 4:25 p.m. Vice-president Maduro on television: El Comandante ha muerto. You hear it through the wall from the neighbours\' television before you hear it on your own. The grief in the barrio is the kind that does not know where to put itself — it goes into the street, it goes into the night, it goes into the months afterward when the project of living inside what he built continues without him. You wonder who continues it, how, whether the continuation is the thing or something else wearing the thing\'s name.'
      }
      return 'March 5, 2013. 4:25 p.m. Maduro on television: El Comandante ha muerto. In your neighbourhood the sound is different from what the television will show from the barrios. Here it is — not quiet exactly, but a different quality of response. The question that comes immediately is: what now, and who controls what now, and what the next election will look like. You understand that the thing you have been waiting for — for the project to end — has and has not arrived, because the project was always larger than one person.'
    },
    choices: null,
    effect: (p) => {
      p.r += 8
      p.m -= 5
      p.addFlag('ven_chavez_death_witness')
      p.setMem('venChavezDeath', true); p.setMem('ven_chavez_death', true)
    },
  },

  {
    id: 'ven_food_line',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2015 && G.currentYear <= 2020 &&
      G.age >= 18 &&
      !G.mem?.venFoodLine,
    text: 'You take a number before five in the morning so you can come back at eight low enough to get through the door before the shelves go. This week there is cornmeal, no rice, and sugar at what used to be a week\'s wages. The woman ahead of you is holding a number from Tuesday that is worth nothing now and she has come anyway. You talk. Nobody warned you that the queue would also be where the conversations happen.',
    context: 'Venezuelan price controls and the collapse of import capacity produced chronic shortages from 2014. Supermarkets rationed entry by the last digit of an identity card and the state distributed subsidised boxes through the CLAP programme. Annual inflation passed one million percent in 2018 and roughly seven million Venezuelans left the country.',
    choices: [
      {
        text: 'You manage within it — the queue, the calculation, the conversation.',
        tag: 'ven_food_scarcity_era',
        outcome: 'You manage. The managing becomes a skill you did not seek. The skill continues to be required for longer than you initially believed it would be required.',
        effect: (p) => { p.h -= 5; p.m -= 8; p.s += 3; p.addFlag('ven_food_scarcity_era'); p.setMem('venFoodLine', true); },
      },
      {
        text: 'You pay the bachaquero rate — the black market markup — because the queue costs time you can\'t afford.',
        tag: 'ven_food_scarcity_era',
        outcome: 'The bachaquero network is the real distribution system. The legal one is the theatre above it. You are paying for the difference between the theatre and the thing.',
        effect: (p) => { p.mo -= 2000; p.h -= 2; p.addFlag('ven_food_scarcity_era'); p.setMem('venFoodLine', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ven_2017_protest',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2017 && G.currentYear <= 2018 &&
      G.age >= 17 &&
      !G.mem?.ven2017,
    text: '2017. Barricades in the streets and colectivos on motorbikes, tear gas drifting into apartment windows. The opposition has taken the street and the state answers with exactly enough force to wear the protests down without the kind of massacre that makes the world\'s front pages. You are watching from a window, or you are in it. By July the count of the dead is past a hundred.',
    context: 'The 2017 protests left at least 126 people dead between April and July.',
    choices: [
      {
        text: 'You go out. The street is where the argument lives.',
        tag: 'ven_2017_witness',
        outcome: 'The argument lives in the street and the street does not resolve the argument. You come home. The government is still there. The argument continues in a different form.',
        effect: (p) => { p.m -= 5; p.karma += 8; p.r += 5; p.addFlag('ven_2017_witness'); p.setMem('ven2017', true); },
      },
      {
        text: 'You watch from the window or the television. The street is too dangerous this time.',
        tag: 'ven_2017_witness',
        outcome: 'From the window: the tear gas cloud moving, the motorcycles, the distant sound of something hitting a surface. The witness and the participant are not the same category. You are the witness.',
        effect: (p) => { p.m -= 6; p.r += 6; p.addFlag('ven_2017_witness'); p.setMem('ven2017', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ven_hyperinflation',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2018 && G.currentYear <= 2021 &&
      G.age >= 20 &&
      !G.mem?.venHyperinflation,
    text: 'The bolívar fuerte gave way to the bolívar soberano in August 2018, removing five zeroes. The bolívar soberano is running at 1,000,000 percent annual inflation when the government introduces the bolívar digital in October 2021, removing six zeroes. You have lived through three currencies in four years. The price of arepas at the corner bakery changes between when you order and when you receive them, or it doesn\'t change today but changed last Tuesday. You keep a dollar bill in your wallet the way people once kept a photo of a saint: for protection, for the certainty that this denomination will be worth something tomorrow.',
    choices: null,
    effect: (p) => {
      p.mo -= 3000
      p.m -= 10
      p.r += 6
      p.addFlag('ven_hyperinflation_era')
      p.setMem('venHyperinflation', true)
    },
  },

  {
    id: 'ven_departure',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2015 && G.currentYear <= 2022 &&
      G.age >= 18 && G.age <= 50 &&
      (G.flags.has('ven_food_scarcity_era') || G.flags.has('ven_hyperinflation_era') || G.flags.has('ven_2017_witness')) &&
      !G.mem?.venDeparture,
    text: (G) => {
      const hasMoney = G.money > 5000
      if (hasMoney) {
        return 'You leave by air. The airport is not dramatic — the drama is at home, the month before, the conversations with your mother, the day your father did not come to the airport because he said goodbye at the door because he could not do the airport. The plane lifts over Caracas. You see the barrio lights and then the ocean and then nothing you know. You land in Bogotá or Miami or Santiago and everything is technically the same — the language, the food that is almost the food — and entirely different in ways that will take years to name.'
      }
      return 'You cross the Simón Bolívar bridge from San Antonio del Táchira into Cúcuta. Families, people alone, wheelie suitcases and people with nothing; you have one bag. The bridge makes the decision visible: the side you are leaving and the side you are going to. At the far end Colombians are handing out water and bread, and there is an aid agency\'s table. After that there is the road north.'
    },
    // Both branches say you leave, and both set a residency, and neither moved
    // anybody: the character held a work visa in Caracas. Found once
    // narrated-move read function-bodied text.
    choices: [
      {
        text: 'You leave with enough to establish something somewhere.',
        tag: 'ven_diaspora',
        outcome: 'The establishment is possible and hard and takes longer than the estimation. The Venezuelan community you find is yourself and people exactly like you — also establishing, also calculating.',
        effect: (p) => { p.mo -= 2000; p.r += 8; p.addFlag('ven_diaspora'); p.addFlag('emigrated'); p.emigrateTo(['Colombia', 'United States', 'Chile'], { residency: 'work_visa' }); p.setMem('venDeparture', true); },
      },
      {
        text: 'You leave with almost nothing. The departure is the only option left.',
        tag: 'ven_diaspora',
        outcome: 'The walk across the bridge is the option. The option becomes the life. The life is made from this beginning, and this end.',
        effect: (p) => { p.mo -= 500; p.m -= 5; p.h -= 5; p.r += 10; p.addFlag('ven_diaspora'); p.addFlag('emigrated'); p.emigrateTo('Colombia', { residency: 'refugee_status' }); p.setMem('venDeparture', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ven_colectivo',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2004 && G.currentYear <= 2022 &&
      G.age >= 16 && G.age <= 40 &&
      G.stats.wealth < 55 &&
      !G.mem?.venColectivo,
    text: 'The colectivos: armed groups, pro-government, organized on a motorcycle topology, present in the barrios as a form of order that is not the police and is not the state and is also not separate from them. In your neighbourhood they are the people who know everyone, who have lists, who control what happens on specific streets at specific hours. The relationship to them is precise: what you say to them, what you don\'t say, which conversations you have in front of them and which you have elsewhere. This is a skill the barrio teaches and you have learned it without being formally taught.',
    choices: [
      {
        text: 'You navigate the relationship correctly. The colectivo sees you as neutral.',
        tag: null,
        outcome: 'Neutral is a position that requires maintenance. You maintain it. The maintenance is its own form of political activity.',
        effect: (p) => { p.s += 3; p.addFlag('ven_colectivo_era'); p.setMem('venColectivo', true); },
      },
      {
        text: 'You join. The colectivo is security, money, community, in that order.',
        tag: 'ven_colectivo_era',
        outcome: 'You have security, money, and community. The constraints on what you can say, where you can go, what happens to your options later — also real.',
        effect: (p) => { p.s += 4; p.mo += 3000; p.karma -= 5; p.addFlag('ven_colectivo_era'); p.setMem('venColectivo', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ven_dollarization',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2019 && G.currentYear <= 2023 &&
      G.age >= 22 &&
      !G.mem?.venDollarization,
    text: 'The government never dollarised. The country did it on its own, from below. By 2020 the supermarket, the restaurant and the landlord all quote in dollars, although the law says bolívares. The gringo money the revolution spent twenty years against is now the unit of daily life, under the revolution\'s own eye.',
    choices: null,
    effect: (p) => {
      p.e += 4
      p.r += 5
      p.addFlag('ven_dollarization_era')
      p.setMem('venDollarization', true)
    },
  },

  {
    id: 'ven_clap',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2016 && G.currentYear <= 2023 &&
      G.age >= 20 &&
      !G.mem?.venClap,
    text: 'The CLAP box comes monthly through the local committee: cornmeal, rice, lentils, oil, a few tins, never quite the same. The committee decides who gets one and when, and in your block there is a coordinator. The coordinator may be kind, or may be the kind of person who likes holding something people need. You need the box, so you keep on good terms, whatever you think of the system that made it.',
    choices: [
      {
        text: 'You receive it. The food is real regardless of what it represents.',
        tag: 'ven_clap_system',
        outcome: 'There is food. What it represents is also real and these two realities exist in the same bag of cornmeal. You decide which one to pay attention to at meals.',
        effect: (p) => { p.h += 3; p.m -= 3; p.addFlag('ven_clap_system'); p.setMem('venClap', true); },
      },
      {
        text: 'You refuse it. You find other ways.',
        tag: null,
        outcome: 'The other ways are the bachaquero, the remittance from the cousin in Bogotá, the informal dollar economy. The refusal is a position. The position costs something.',
        effect: (p) => { p.m -= 5; p.mo -= 1500; p.karma += 4; p.setMem('venClap', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ven_migrant_colombia',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('ven_diaspora') &&
      G.currentCountry?.name === 'Colombia' &&
      G.currentYear >= 2017 && G.currentYear <= 2024 &&
      G.age >= 18 &&
      !G.mem?.venMigrantColombia,
    text: 'The PEP, then the PPT: a Colombian card for Venezuelans, ten years, renewable. Getting it means a queue at Migración, fingerprints, months of waiting, and then a card with your face that opens the legal job market. Without it the informal market is the only market. Colombians are mostly not hostile and not quite welcoming. You learn the tone in which people say venezolano, and what it means from each of them.',
    choices: [
      {
        text: 'You get the PPT and begin the slow construction of something legal.',
        tag: 'ven_colombia_migrant',
        outcome: 'The legal something: a job in a restaurant or a construction site or a call centre. The salary in pesos, the conversion rate to what you send home, the arithmetic of sending home becoming the arithmetic of the month.',
        effect: (p) => { p.mo += 2000; p.s += 3; p.addFlag('ven_colombia_migrant'); p.setMem('venMigrantColombia', true); },
      },
      {
        text: 'You are undocumented and working in the informal sector.',
        tag: 'ven_colombia_migrant',
        outcome: 'The informal sector: the corner tienda that pays cash, the daily labour market in the morning, the landlord who rents to Venezuelans because they don\'t make complaints. The money is less and the risk is present.',
        effect: (p) => { p.m -= 5; p.h -= 3; p.addFlag('ven_colombia_migrant'); p.setResidency('undocumented'); p.setMem('venMigrantColombia', true); },
      },
    ],
    effect: null,
  },

]
