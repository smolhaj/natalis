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
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 1998 && G.currentYear <= 2000 &&
      G.age >= 16 &&
      !G.mem?.venChavez98,
    text: (G) => {
      const poor = G.stats.wealth < 40
      if (poor) {
        return 'December 6, 1998. The results come in and Chávez has won with 56 percent. In the barrio this is not a result — it is an event. Fireworks from somewhere below. Your grandmother cries. She is not crying because she is afraid; she cries because this is the first time since she has been alive that someone who speaks like her father spoke, who uses the same words for the same things, has won anything. You understand something about representation that you did not understand yesterday.'
      }
      return 'December 6, 1998. The results. Hugo Chávez Frías, the coup leader from 1992 who went to prison and came out and ran for election — 56 percent. Your family had voted for the opposition. The television is on. Your father says: they will see. In the next weeks he says it again. You understand that "they will see" is not a prediction about what will happen. It is a statement about whose fault it is for what will happen.'
    },
    choices: [
      {
        text: 'The hope is real. The country needed something to break.',
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
    phase: 'young_adult',
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
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2006 && G.currentYear <= 2013 &&
      G.age >= 22 &&
      !G.mem?.venOilBoom,
    text: 'The oil price is above $100. Venezuela has the largest proven reserves in the world. The petrodollars flow in a specific way: into Miraflores, into the missions, into the import system that brings cheap goods because the official exchange rate makes importing absurdly profitable. You buy appliances, a car, a television. Your cousin takes a trip to Miami to shop — not for a vacation but literally for shopping, for the duty-free gap. The economy is a wheel turning on oil and the wheel is turning fast and the specific feeling of a wheel turning fast is that it will keep turning. It will not keep turning at this speed. You do not know this now in the way you will know it later.',
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
    id: 'ven_chavez_death',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2013 && G.currentYear <= 2014 &&
      G.age >= 16 &&
      !G.mem?.venChavezDeath,
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
      p.setMem('venChavezDeath', true)
    },
  },

  {
    id: 'ven_food_line',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2015 && G.currentYear <= 2020 &&
      G.age >= 18 &&
      !G.mem?.venFoodLine,
    text: 'The supermarket has a system now. You arrive before 5 a.m. to take a number. The number system means you do not have to stand in the queue — you can come back at 8 when it opens — but you have to be there before 5 to get a number low enough to enter before the shelves are empty. What is on the shelves changes by week. Last week: cornmeal, rice, cooking oil. This week: cornmeal, no rice, sugar that costs what used to be a week\'s salary. The woman ahead of you in the queue has a number from two days ago that she never used; the number is now worthless; she came back anyway because the cornmeal might still be there. You talk to her while you wait. This is one of the unexpected aspects of the queue: the conversation.',
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
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2017 && G.currentYear <= 2018 &&
      G.age >= 17 &&
      !G.mem?.ven2017,
    text: 'The 2017 protests are the largest in the country\'s history up to that point — 126 dead by July, hundreds injured. The colectivos on motorcycles in response to the guarimba barricades. Tear gas in residential streets. The opposition took the street. Capriles, Leopoldo López from his prison, María Corina Machado from a podium. You are watching or you are in it. The thing the protests did: they were real, they were massive, they were met with the specific proportions of force that allowed them to be eventually exhausted without being crushed in a way that would have made the pictures too internationally legible.',
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
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2018 && G.currentYear <= 2021 &&
      G.age >= 20 &&
      !G.mem?.venHyperinflation,
    text: 'The bolívar fuerte gave way to the bolívar soberano in August 2018, removing five zeroes. The bolívar soberano is running at 1,000,000 percent annual inflation when the government introduces the bolívar digital in October 2021, removing six zeroes. You have lived through three currencies in four years. The price of arepas at the corner bakery changes between when you order and when you receive them, or it doesn\'t change today but changed last Tuesday. You keep a dollar bill in your wallet the way people once kept a photo of a saint: for protection, for the specific certainty that this denomination will be worth something tomorrow.',
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
    phase: 'young_adult',
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
      return 'You cross the Simón Bolívar bridge at San Antonio del Táchira into Cúcuta, Colombia. There are Venezuelans you don\'t know on the bridge — families, people alone, people with wheelie suitcases and people with nothing. You have one bag. The bridge is the decision made visible and permanent: the side you came from and the side you are going to. There are Colombians with water and bread at the end of the bridge. There is an NGO table. There is also the road north, which is the rest of this.'
    },
    choices: [
      {
        text: 'You leave with enough to establish something somewhere.',
        tag: 'ven_diaspora',
        outcome: 'The establishment is possible and hard and takes longer than the estimation. The Venezuelan community you find is yourself and people exactly like you — also establishing, also calculating.',
        effect: (p) => { p.mo -= 2000; p.r += 8; p.addFlag('ven_diaspora'); p.setResidency('work_visa'); p.setMem('venDeparture', true); },
      },
      {
        text: 'You leave with almost nothing. The departure is the only option left.',
        tag: 'ven_diaspora',
        outcome: 'The walk across the bridge is the option. The option becomes the life. The life is made from this beginning, which is also an end.',
        effect: (p) => { p.mo -= 500; p.m -= 5; p.h -= 5; p.r += 10; p.addFlag('ven_diaspora'); p.setResidency('refugee_status'); p.setMem('venDeparture', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ven_colectivo',
    phase: 'young_adult',
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
        outcome: 'The security, money, and community are real. The constraints on what you can say, where you can go, what happens to your options later — also real.',
        effect: (p) => { p.s += 4; p.mo += 3000; p.karma -= 5; p.addFlag('ven_colectivo_era'); p.setMem('venColectivo', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ven_dollarization',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2019 && G.currentYear <= 2023 &&
      G.age >= 22 &&
      !G.mem?.venDollarization,
    text: 'The government never officially dollarized. The economy dollarized informally, spontaneously, from below. By 2020 the supermarket prices everything in dollars even though the official currency is the bolívar digital and the law requires bolívares. Restaurants price in USD. Rent is quoted in USD. The government that produced the hyperinflation tacitly permits the dollarization that corrects for the hyperinflation. You think of this sometimes: the currency the government spent twenty years nationalizing, the "gringo money" that was the symbol of what the revolution was against — this is now the unit of daily life, inside the revolution\'s project, by the revolution\'s admission of failure.',
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2016 && G.currentYear <= 2023 &&
      G.age >= 20 &&
      !G.mem?.venClap,
    text: 'The CLAP (Comités Locales de Abastecimiento y Producción): government food bags distributed monthly through party-aligned local committees. Inside: cornmeal, rice, lentils, cooking oil, canned goods — the composition varies and cannot be predicted in advance. The CLAP committee controls who receives the box and when. In your building or your block there is a CLAP coordinator. The coordinator may be kind or may be the specific kind of person drawn to controlling a necessary resource. The box is necessary. The coordinator is someone you need to maintain a relationship with regardless of your view of the political system that created the box.',
    choices: [
      {
        text: 'You receive it. The food is real regardless of what it represents.',
        tag: 'ven_clap_system',
        outcome: 'The food is real. What it represents is also real and these two realities exist in the same bag of cornmeal. You decide which one to pay attention to at meals.',
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
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.has('ven_diaspora') &&
      G.currentCountry === 'Colombia' &&
      G.currentYear >= 2017 && G.currentYear <= 2024 &&
      G.age >= 18 &&
      !G.mem?.venMigrantColombia,
    text: 'The Permiso Especial de Permanencia (PEP), then the Permiso de Protección Temporal (PPT): the Colombian document for Venezuelans, valid for ten years, renewable. You get it or you don\'t get it. Getting it: a queue at Migración Colombia, the cedula venezolana, fingerprints, a number, waiting months, a card with your face on it that makes the legal market accessible and the informal market slightly less necessary. Not getting it: the informal market is the market. Colombians are — mostly — not hostile and not entirely welcoming. There is a word: venezolano, and the word has a register that depends on who says it and how. You learn the register.',
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
