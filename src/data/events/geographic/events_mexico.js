// events_mexico.js — Mexico depth
//
// The events_latin_america.js omnibus covers Tlatelolco 1968, 1982 peso crisis,
// 1985 earthquake, Zapatista 1994, maquiladora, narco era 2006+, Ayotzinapa 2014,
// 2017 earthquake, and femicidio.
//
// This file adds what those cannot: the fall of the PRI in 2000 (71 years
// ending on a single night), the 1994 Tequila Crisis that devastated the middle
// class, the Dirty War of the 1970s that followed Tlatelolco, the UNAM as a
// world unto itself, the specific decision to go north, indigenous identity in
// Mexico, the AMLO moment and its aftermath, and the intimate texture of
// Day of the Dead as private practice.

const isMex = (G) => G.character.country.name === 'Mexico'

export const MEXICO_DEPTH_EVENTS = [

  {
    id: 'mex_2000_election_night',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isMex(G) &&
      G.currentYear === 2000 &&
      G.age >= 18 &&
      !G.mem?.mex2000ElectionNight,
    text: `July 2, 2000. The vote count is still coming in and the Instituto Federal Electoral is updating the numbers on screen. The PRI has governed since 1929. Every president since then has been PRI. The schools, the unions, the IMSS, the ejidos — all built by the PRI, all administered by the PRI. And then Francisco Fox is ahead by nine points and there is no way to read this except the reading that the numbers say. Presidente Zedillo appears on television and concedes. His voice is steady. Something that was always true is now past tense.`,
    choices: [
      {
        text: 'Go outside. The street is full of people.',
        tag: null,
        outcome: 'The celebrating in the street is specific: people who spent their whole lives under one party, who perhaps voted against it and never expected it to matter, suddenly outside at eleven at night.',
        effect: (p) => {
          p.m += 12
          p.addFlag('mex_pri_fell_generation')
          p.setMem('mex2000ElectionNight', true)
        },
      },
      {
        text: 'Stay in. You are not sure what to feel.',
        tag: null,
        outcome: 'The PRI did many things wrong. It also built the world you live in. The transition is real and the uncertainty about what it produces is also real.',
        effect: (p) => {
          p.m += 4
          p.r += 3
          p.addFlag('mex_pri_fell_generation')
          p.addFlag('mex_transition_uncertain')
          p.setMem('mex2000ElectionNight', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'mex_tequila_crisis_1994',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      isMex(G) &&
      G.currentYear >= 1994 && G.currentYear <= 1996 &&
      G.age >= 18 &&
      !G.mem?.mexTequilaCrisis,
    text: `In December 1994 the new government devalues the peso in three days. It is called the "Error de diciembre" because someone has to be blamed for an error. In January 1995 the interest rate reaches 80 percent. Savings held in pesos — a year ago worth something — are now worth something smaller. People who had a middle-class life stop having a middle-class life. The IMF loan to Mexico is the largest in its history. The term "efecto tequila" is used by economists who are not here. Here it is used by no one.`,
    choices: null,
    effect: (p) => {
      p.w -= 15
      p.m -= 10
      p.mo -= Math.floor(p.mo ? p.mo * 0.35 : 0)
      p.addFlag('mex_tequila_crisis_survivor')
      p.setMem('mexTequilaCrisis', true)
    },
  },

  {
    id: 'mex_dirty_war_1970s',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isMex(G) &&
      G.currentYear >= 1970 && G.currentYear <= 1984 &&
      G.age >= 18 &&
      !G.mem?.mexDirtyWar,
    text: `The Tlatelolco massacre did not end the state's relationship to political opposition — it clarified it. In the years that follow, students who continued organising disappear. The Halcones, a paramilitary group with government authorisation, attack a student march in 1971 and kill at least 25. The rural guerrilla movements — Liga Comunista 23 de Septiembre, PDLP — are systematically dismantled. The people who belonged to them are found, or not found. The phrase used by families is "desaparecido político." The phrase does not make the newspapers.`,
    choices: [
      {
        text: 'You know someone who has gone this way. You keep their name.',
        tag: null,
        outcome: 'The name is specific and that specificity is the point. A name is not statistics.',
        effect: (p) => {
          p.m -= 10
          p.r += 7
          p.karma += 5
          p.addFlag('mex_dirty_war_witness')
          p.setMem('mexDirtyWar', true)
        },
      },
      {
        text: 'You are careful about what you say and what you attend.',
        tag: null,
        outcome: 'The caution is not cowardice but it feels close to it sometimes.',
        effect: (p) => {
          p.m -= 6
          p.r += 4
          p.addFlag('mex_dirty_war_witness')
          p.setMem('mexDirtyWar', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'mex_unam_world',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isMex(G) &&
      G.currentYear >= 1960 &&
      G.age >= 18 && G.age <= 26 &&
      G.stats.smarts >= 45 &&
      !G.flags.has('emigrated') &&
      !G.mem?.mexUnam,
    text: `The Universidad Nacional Autónoma de México is free of charge. This is not a policy — it is the constitution of a world. The campus at Ciudad Universitaria is large enough to get lost in, built in the 1950s with murals by Siqueiros and O'Gorman on the library exterior. The gratuidad — the principle of no tuition — has been here since 1929 and is defended, when needed, by the students in the streets. You study under this principle. You will carry this argument for the rest of your life: that education is not a service you purchase.`,
    choices: null,
    effect: (p) => {
      p.e += 8
      p.m += 6
      p.addFlag('mex_unam_generation')
      p.setMem('mexUnam', true)
    },
  },

  {
    id: 'mex_unam_strike_1999',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isMex(G) &&
      G.flags.has('mex_unam_generation') &&
      G.currentYear >= 1999 && G.currentYear <= 2000 &&
      G.age >= 18 && G.age <= 28 &&
      !G.mem?.mexUnamStrike,
    text: `The government proposes charging fees at the UNAM. The student assembly votes to strike. The strike lasts 9 months and 24 days — the longest in the university's history. The Federal Preventive Police finally occupy the campus in February 2000 and arrest 900 students. You are enrolled during this time. The question that the strike asks — whether education is a right or a purchased service — does not resolve cleanly after the police leave.`,
    choices: [
      {
        text: 'Join the strike. The gratuidad is the point.',
        tag: null,
        outcome: 'The nine months cost you an academic year. The argument you made is still the argument.',
        effect: (p) => {
          p.e += 4
          p.karma += 8
          p.addFlag('mex_strike_participant')
          p.setMem('mexUnamStrike', true)
        },
      },
      {
        text: 'Don\'t join. The academic year is the year you have.',
        tag: null,
        outcome: 'The moderate position is also a position. The strike happens without you.',
        effect: (p) => {
          p.m -= 4
          p.r += 3
          p.setMem('mexUnamStrike', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'mex_going_north_question',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isMex(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2010 &&
      G.age >= 20 && G.age <= 35 &&
      !G.flags.has('emigrated') &&
      !G.mem?.mexGoingNorth,
    text: `Someone in the family has already gone. They send money, sometimes — more in the first years, then the amounts become irregular, then they come back, or they don't. The decision is not mainly about distance. It is about what the work pays here versus what it pays there, and the specific cost of the crossing, and whether the person on the other side who said they would help is reliable, and the question of papers, and the question of what happens if things go wrong, and the question of what you are leaving behind that cannot be replaced by the money you send back.`,
    choices: [
      {
        text: 'Go north. The calculation adds up.',
        tag: null,
        outcome: 'The crossing costs what it costs. You arrive in a place that is the same country that produces the television and different from it in every other way.',
        effect: (p) => {
          p.mo += 2000
          p.m -= 8
          p.addFlag('emigrated')
          p.addFlag('mex_crossed_north')
          p.setResidency('undocumented')
          p.setMem('mexGoingNorth', true)
        },
      },
      {
        text: 'Stay. The leaving costs something that doesn\'t appear in the calculation.',
        tag: null,
        outcome: 'The people who went keep calling. You keep not going. The decision is continuous rather than made once.',
        effect: (p) => {
          p.m += 3
          p.addFlag('stayed_when_others_left')
          p.setMem('mexGoingNorth', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'mex_indigenous_school',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      isMex(G) &&
      (G.ethnicity?.id === 'indigenous_nahua' ||
       G.ethnicity?.id === 'indigenous_maya' ||
       G.ethnicity?.id === 'indigenous_zapotec' ||
       G.ethnicity?.id === 'indigenous_mixtec' ||
       G.ethnicity?.id === 'indigenous_mexican' ||
       G.ethnicity?.disadvantaged) &&
      G.age >= 6 && G.age <= 12 &&
      !G.mem?.mexIndigenousSchool,
    text: `The school teaches in Spanish. The language you speak at home — Nahuatl or Zapotec or Mixtec or the language that has a name for its mountains and no word for the republic that claims them — is not the language of the books or the tests or the teacher. The teacher is not always cruel about this. Sometimes the teacher is not from here and genuinely does not know that there is another language in the room. You learn to hold two things separately: the language that says where you come from, and the language that says where you are going.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.m -= 5
      p.addFlag('mex_indigenous_bilingual')
      p.addFlag('code_switched')
      p.setMem('mexIndigenousSchool', true)
    },
  },

  {
    id: 'mex_amlo_2018',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isMex(G) &&
      G.currentYear === 2018 &&
      G.age >= 20 &&
      !G.mem?.mexAmlo2018,
    text: `Andrés Manuel López Obrador wins with 53 percent — the largest popular vote in Mexican history. It is his third attempt. He lost in 2006 by less than one percent in disputed circumstances. He lost again in 2012. Now the margin is not in doubt and the party he formed, Morena, has the majority. He calls it the Cuarta Transformación: the independence from Spain, the Reform War, the Revolution, and now this. In the Zócalo the crowd is enormous. The question of what a transformation actually looks like under the conditions that actually exist begins the next morning.`,
    choices: [
      {
        text: 'The moment is real. The man has been waiting for this and so have you.',
        tag: null,
        outcome: 'The hope is specific: that the political capture of Mexico by its own elites will finally be interrupted. You hold this, carefully.',
        effect: (p) => {
          p.m += 8
          p.addFlag('mex_amlo_generation')
          p.addFlag('mex_amlo_believer')
          p.setMem('mexAmlo2018', true)
        },
      },
      {
        text: 'The man and the movement worry you as much as the thing they replaced.',
        tag: null,
        outcome: 'Populism with good intentions is still populism. You watch carefully.',
        effect: (p) => {
          p.m += 2
          p.addFlag('mex_amlo_generation')
          p.addFlag('mex_amlo_skeptic')
          p.setMem('mexAmlo2018', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'mex_amlo_echo',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      isMex(G) &&
      G.flags.has('mex_amlo_generation') &&
      G.currentYear >= 2022 &&
      !G.mem?.mexAmloEcho,
    text: `The six years under AMLO: the security situation worsened in some metrics, improved in few. The cartels remained. The megaprojects — the Tren Maya, the Dos Bocas refinery — went forward over environmental and Indigenous objections. The morning press conferences became famous for their length and their relationship to evidence. The pandemic response was slow. Poverty programs reached people who had never been reached before. Claudia Sheinbaum won the 2024 election. The question of what the Cuarta Transformación actually transformed is a question different people answer differently, in good faith, from different lived positions.`,
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('mexAmloEcho', true)
    },
  },

  {
    id: 'mex_pri_fall_reckoning',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      isMex(G) &&
      G.flags.has('mex_pri_fell_generation') &&
      G.currentYear >= 2012 &&
      G.age >= 50 &&
      !G.mem?.mexPriFallReckoning,
    text: `Twelve years after the PRI lost power, they were back. The PRI won the 2012 election and Enrique Peña Nieto governed until 2018 and the corruption scandals that followed had names and specifics. Democracy had not produced what democracy was supposed to produce. The institutions Fox's transition was supposed to inaugurate were not fully inaugurated. The night in 2000 when you went outside or stayed in — both were a response to something that was true. What was not clear in 2000 is still not clear: what the country would have looked like if the machine had continued, and what it will look like now that it has stopped.`,
    choices: null,
    effect: (p) => {
      p.r += 6
      p.e += 4
      p.setMem('mexPriFallReckoning', true)
    },
  },

  {
    id: 'mex_altar_de_muertos',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      isMex(G) &&
      G.age >= 35 &&
      G.parents?.some(p => !p.alive) &&
      !G.mem?.mexAltarMuertos,
    text: `You build the altar the way you were shown: the levels, the photograph, the marigold path from the door so they can find their way back. The food they liked. A glass of water because the journey makes them thirsty. This is not tourism — it is the specific transaction of the living with the dead, which requires the marigolds to be fresh and the photograph to be the right one and the objects arranged in the order that means something to the person they represent. The dead do not stay and they are not gone. The altar is the infrastructure for the specific hours when both things are true.`,
    choices: null,
    effect: (p) => {
      p.m += 6
      p.karma += 4
      p.setMem('mexAltarMuertos', true)
    },
  },

  {
    id: 'mex_cdmx_texture',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      isMex(G) &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 1982 && G.currentYear <= 2002 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.mexCdmxTexture,
    text: `The Hoy No Circula program starts in 1989 to control the smog: your vehicle cannot circulate on a specific day based on the last digit of your plate. The smog is visible, a brown lens over the mountains that on a clear day show Popocatépetl. The METRO at rush hour is a different body temperature from the body temperature of the city above it. The street vendors on Insurgentes have a route and a schedule and a specific product and an understanding with the metro police. This is ordinary life in the largest Spanish-speaking city in the world and it is ordinary in ways that have no outside equivalent.`,
    choices: null,
    effect: (p) => {
      p.m += 4
      p.setMem('mexCdmxTexture', true)
    },
  },

  {
    id: 'mex_oaxacan_teacher',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      isMex(G) &&
      (G.career?.id === 'teacher' || G.flags.has('teacher_career')) &&
      G.currentYear >= 1980 &&
      G.age >= 30 &&
      !G.mem?.mexOaxacanTeacher,
    text: `The CNTE — the Coordinadora Nacional de Trabajadores de la Educación — is the teachers' dissident union, strongest in Oaxaca, Chiapas, Guerrero, Michoacán. In 2006, after the government tried to remove the Oaxacan section's leader, the union occupied the Zócalo in Oaxaca City for five months. The barricades were made of whatever was at hand. The government eventually sent in federal police. You teach in this system and you have views about the union — views shaped by whether you live in a state where the CNTE is the union, or whether you are in the Mexico City bureaucracy that the union is trying to change.`,
    choices: [
      {
        text: 'You are with the union. The teachers\' working conditions are the students\' learning conditions.',
        tag: null,
        outcome: 'The solidarity is real and the work continues and the strikes continue to happen when the conditions require.',
        effect: (p) => {
          p.m += 3
          p.karma += 6
          p.addFlag('union_solidarity')
          p.addFlag('mex_cnte_teacher')
          p.setMem('mexOaxacanTeacher', true)
        },
      },
      {
        text: 'The CNTE has its own politics and they are not always the students\' politics.',
        tag: null,
        outcome: 'The critique is also available in good faith. The system it opposes is real; so are its own contradictions.',
        effect: (p) => {
          p.r += 4
          p.e += 3
          p.setMem('mexOaxacanTeacher', true)
        },
      },
    ],
    effect: null,
  },

]
