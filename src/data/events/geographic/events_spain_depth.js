// events_spain_depth.js — Spain depth arc
// Post-Civil War repression, clandestine anti-Franco resistance, chabola migration,
// Carrero Blanco assassination 1973, Amnesty Law 1977, Ley de Peligrosidad Social,
// fosas comunes / Historical Memory Law, same-sex marriage 2005

export const SPAIN_DEPTH_EVENTS = [

  {
    id: 'es_dep_posguerra_rojo',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 1940 && G.currentYear <= 1960 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.esPosguerraRojo,
    text: 'The thing that is not spoken of: the photograph that was removed when a visitor came, the relative whose name came up and then didn\'t, the questions you were told not to ask at school. After the war, the losers were classified in the depuration records: rojo, separatista, masón, ateo. The classification determined employment, housing, university admission. Your grandfather or your uncle or the man whose name appears in documents you will find decades later: the losers\' silence was not voluntary. It was the condition of survival.',
    choices: [
      {
        text: 'You understood early that there was something in the family that was not to be said.',
        tag: null,
        outcome: 'You understood it the way children understand things they have not been taught: from the shape of the avoided subject, from the specific quiet that surrounded the specific name. You carry the shape without, for years, the content.',
        effect: (p) => { p.r += 5; p.addFlag('spain_rojo_family'); p.setMem('esPosguerraRojo', true); },
      },
      {
        text: 'Nobody told you anything and you found out from a document.',
        tag: null,
        outcome: 'Forty years later, or twenty, or ten: a document in a box. The name in the record. The category assigned. The sentence served or the death in a ditch on the road outside the village. The document fills in the shape you absorbed as a child.',
        effect: (p) => { p.r += 7; p.m -= 4; p.addFlag('spain_rojo_family'); p.setMem('esPosguerraRojo', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'es_dep_clandestinity',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 1958 && G.currentYear <= 1975 &&
      G.age >= 18 && G.age <= 38 &&
      !G.mem?.esClandestinity,
    text: 'Under Franco, opposition is illegal. The legal unions are the Sindicatos Verticales — the state unions. The CCOO, the Comisiones Obreras, organizes underground in the factories. The student opposition meets in apartments, passes typewritten pamphlets, uses the priest\'s office because the Church is a grey zone where the civil guards are less likely to search. Being found with certain reading material is enough. You know someone who was arrested. The clandestinity is not heroism in the way films describe it — it is people trying to organize normally and having to do it in the dark.',
    choices: [
      {
        text: 'You participate — meetings, pamphlets, the small illegal work.',
        tag: null,
        outcome: 'The small illegal work is small and illegal. You are careful. You are also doing something. The years accumulate. When Franco dies in 1975, you are one of the people who already had an organization, who already knew how to organize, which is why the transition goes the way it goes.',
        effect: (p) => { p.karma += 8; p.r += 5; p.m -= 3; p.addFlag('spain_anti_franco_cell'); p.setMem('esClandestinity', true); },
      },
      {
        text: 'You know it is happening. You are not part of it. The calculation is not abstract — you have seen what arrest produces.',
        tag: null,
        outcome: 'The calculation is reasonable and the risk is real. You carry the knowledge of your inaction as one of the things you know about yourself. When the transition arrives it does not require that you did anything. You did not do anything.',
        effect: (p) => { p.r += 6; p.addFlag('spain_anti_franco_cell'); p.setMem('esClandestinity', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'es_dep_chabolas',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 1950 && G.currentYear <= 1970 &&
      G.age >= 6 && G.age <= 18 &&
      !G.mem?.esChabolas,
    text: 'Two million people move from Andalusia, Extremadura, Murcia to Barcelona and Madrid between 1950 and 1975. They build the city before the city builds for them. The barracas, the chabolas — the shantytowns on the periphery — are cities within cities: the same hierarchy of streets and neighbors and children, but without running water, without paving, without the address that would allow you to register for school. The move north is the family\'s wager on the future, which is also your future. The wager is partly right.',
    choices: [
      {
        text: 'You grow up in the barraca at the edge of the city. The city is where you live but not yet where you belong.',
        tag: null,
        outcome: 'The social elevator exists. It is slow and the price of the ticket is paid forward — paid in your children\'s generation, not yours. You are in the generation that moves from the village to the barraca to the apartment block in fifteen years. The apartment block feels like arrival.',
        effect: (p) => { p.m -= 4; p.r += 5; p.w += 3; p.addFlag('spain_chabola_childhood'); p.setMem('esChabolas', true); },
      },
      {
        text: 'You remember the village and you remember arriving and you remember the difference, which is not the difference you expected.',
        tag: null,
        outcome: 'The village had poverty with community. The barraca has poverty with strangers who become community, slowly, over the years, in the way that shared conditions produce it. The difference from what you expected is the making of your urban self.',
        effect: (p) => { p.r += 7; p.addFlag('spain_chabola_childhood'); p.setMem('esChabolas', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'es_dep_carrero_blanco',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear === 1973 &&
      G.age >= 18 &&
      !G.mem?.esCarreroBlanco,
    text: 'December 20, 1973. Admiral Luis Carrero Blanco, Franco\'s Prime Minister and expected successor, is killed in Madrid. ETA has spent months tunneling under the street. The car bomb launches the car five stories into the air — over the building on Calle Claudio Coello — and it lands in the courtyard of the Jesuit church. Carrero Blanco was the mechanism that would have continued Francoism after Franco. The assassination removed the mechanism. The transition that happened after Franco\'s death in 1975 happened partly because the person who would have prevented it was dead.',
    choices: null,
    effect: (p) => { p.r += 5; p.addFlag('spain_carrero_blanco_lived'); p.setMem('esCarreroBlanco', true); },
  },

  {
    id: 'es_dep_pacto_olvido',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 1977 && G.currentYear <= 1985 &&
      G.age >= 25 &&
      G.flags.has('transicion_generation') &&
      !G.mem?.esPactoOlvido,
    text: 'The Amnesty Law of October 1977: political prisoners are freed, but also, and in the same law, the crimes of the Franco dictatorship cannot be prosecuted. The two amnesties are bundled into one legislation. The Pacto del Olvido — the pact of forgetting — is not a law exactly, but it is the agreement that the transition requires: nobody gets prosecuted, nobody gets a trial, nobody gets an official acknowledgment that what was done to them was done. Spain becomes a democracy and the people who ran the dictatorship continue in their careers. The transition works. The not-prosecuting is part of why it works.',
    choices: [
      {
        text: 'The agreement was necessary. The alternative was another conflict.',
        tag: null,
        outcome: 'The alternative was real: the army was watching, the right was armed, the transition was fragile. The 23-F proves this three years later. You accepted the pact. The families who could not find the graves also accepted it, because they had no alternative.',
        effect: (p) => { p.r += 5; p.addFlag('spain_amnesia_pact'); p.setMem('esPactoOlvido', true); },
      },
      {
        text: 'The pact bought the democracy at the price of justice. The families know which price was paid.',
        tag: null,
        outcome: 'Forty years later, in 2007, the Historical Memory Law. In 2022, the Democratic Memory Law. The families who waited forty years for the graves to be opened waited because of the pact that was made in 1977. The transition was necessary and the price was paid by the people who did not make the deal.',
        effect: (p) => { p.r += 7; p.karma += 4; p.addFlag('spain_amnesia_pact'); p.setMem('esPactoOlvido', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'es_dep_ley_peligrosidad',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 1960 && G.currentYear <= 1978 &&
      G.age >= 18 && G.age <= 40 &&
      G.flags.has('lgbtq_identity') &&
      !G.mem?.esLeyPeligrosidad,
    text: 'The Ley de Peligrosidad y Rehabilitación Social: the law classifying homosexuals as dangerous persons subject to internment in reformatories — specifically in the separate facilities for homosexuals at Huelva and Badajoz — and mandatory psychiatric treatment. Effective until the law is modified in 1979. The bars that exist are unofficial and the raids are real. Your navigation of a city that contains you illegally is the specific navigation: which bars, which hours, which signals, who can be trusted. The knowledge is shared in a community that has to keep itself invisible to survive.',
    choices: [
      {
        text: 'You navigate it. The navigation is exhausting and specific and you are alive.',
        tag: null,
        outcome: 'You navigate it and you find the community that also navigates it. The community is not the same as freedom. It is the thing that exists in the absence of freedom and is worth considerably more than nothing.',
        effect: (p) => { p.m -= 8; p.h -= 3; p.r += 6; p.addFlag('spain_ley_peligrosidad_survived'); p.setMem('esLeyPeligrosidad', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'es_dep_fosa_comu',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 2000 &&
      G.age >= 50 &&
      G.flags.has('spain_rojo_family') &&
      !G.mem?.esFosaComu,
    text: 'The Association for the Recovery of Historical Memory: founded in 2000, the first organization dedicated to finding and opening the mass graves of those killed in the Civil War and its aftermath. There are an estimated 114,000 bodies in the ditches and the roadsides and the olive groves. The 2007 Historical Memory Law provides some funding and some official acknowledgment. It does not provide prosecution. You know where the grave is or you have always suspected where it is. The grave is not yet open. The process of opening it is long and requires forms and permissions and DNA samples and is also the thing that has been waited for since 1939.',
    choices: [
      {
        text: 'You give the DNA sample. You wait for the result.',
        tag: null,
        outcome: 'The result comes back with a match or it does not. Either way you have done what could be done. The graves that are opened give families the specific knowledge instead of the permanent uncertainty. The specific knowledge is worse and better simultaneously.',
        effect: (p) => { p.r += 6; p.m -= 3; p.karma += 5; p.addFlag('spain_fosa_recovery'); p.setMem('esFosaComu', true); },
      },
      {
        text: 'You have waited long enough that the waiting has become the condition.',
        tag: null,
        outcome: 'The waiting has become the condition and you are not sure you want to exchange it for the knowledge. The uncertainty is at least familiar. This is a thought you do not say aloud because it sounds wrong, though it does not feel wrong.',
        effect: (p) => { p.r += 8; p.setMem('esFosaComu', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'es_dep_matrimonio_igualitario',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 2005 && G.currentYear <= 2012 &&
      G.age >= 25 && G.age <= 60 &&
      G.flags.has('lgbtq_identity') &&
      !G.mem?.esMatrimonioIgualitario,
    text: 'June 30, 2005. Spain becomes the third country in the world to legalize same-sex marriage, including adoption rights. The PP appeals to the Constitutional Court; the court upholds the law in 2012. The ceremony: in a room that the law says you can now use for this purpose, signing the papers that say this, which is also the papers that say you exist in the legal category you spent years outside of. Rajoy at a PP congress holds up two rings and says they are the symbol of what marriage is. One of the rings is yours.',
    choices: [
      {
        text: 'You marry or you could now if you chose to, which is the thing that matters.',
        tag: null,
        outcome: 'The legal category is not the same as the feeling, and it is not nothing. The years before it existed, the years of navigating without it, the specific weight of its absence — all of that is present at the ceremony or at the knowledge that the ceremony is now possible.',
        effect: (p) => { p.m += 8; p.karma += 5; p.addFlag('spain_lgbtq_2005'); p.setMem('esMatrimonioIgualitario', true); },
      },
      {
        text: 'You do not marry but the law passing is its own event, regardless.',
        tag: null,
        outcome: 'The law passing and the ceremony are different things. The law passing says the state has changed its position on what you are. That is its own event, separate from what you do with the change.',
        effect: (p) => { p.m += 5; p.karma += 3; p.addFlag('spain_lgbtq_2005'); p.setMem('esMatrimonioIgualitario', true); },
      },
    ],
    effect: null,
  },

]
