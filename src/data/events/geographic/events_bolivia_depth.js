// Bolivia depth arc events
// Angles not in events_bolivia.js: War of the Pacific sea loss (Día del Mar),
// Che Guevara 1967 (La Higuera), Potosí colonial legacy, cholita identity,
// lithium triangle, TIPNIS road conflict 2011, sacred coca ceremony, ICJ case 2018.

const IS_BOL = (G) => G.character.country?.name === 'Bolivia'

export const BOLIVIA_DEPTH_EVENTS = [

  {
    id: 'bol_dep_dia_del_mar',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_BOL(G) &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.bolDiaMar,
    text: 'Every March 23rd, the school holds its ceremony for el Día del Mar. The teacher places the map on the board — the version that shows Bolivia as it was before 1884, with the Litoral Region stretching down to the Pacific. You are expected to learn the treaty dates, the battle names, the kilometres of coastline that are now Chilean. You have never seen the ocean. You do not live anywhere near where the coast was. But you will grow up understanding that the ocean belongs to Bolivia in a way no treaty has resolved.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.addFlag('bol_sea_loss_identity'); p.setMem('bolDiaMar', true) },
  },

  {
    id: 'bol_dep_che_1967',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_BOL(G) &&
      G.currentYear >= 1967 && G.currentYear <= 1980 &&
      G.age >= 16 &&
      !G.mem?.bolChe,
    text: 'The news about Che Guevara\'s capture and death at La Higuera reaches different people as different things. The guerrilla died in the jungle near Vallegrande after eleven months of a campaign that never found support among the campesinos he came to liberate. The Bolivian miners\' unions he hoped would join him did not. The CIA was involved; the Bolivian army was involved. Whether the failure was his, or the particular problem of a revolution imported from Cuba to a country whose revolution had already happened in 1952, will be argued about for decades.',
    choices: [
      {
        text: 'He died for something — even failed revolutions mark the ground they fall on',
        tag: 'sympathetic',
        outcome: 'The photograph of his body, the resemblance to a pietà — you will carry that image the way you carry other images that land before you have the language for them.',
        effect: (p) => { p.karma += 4; p.addFlag('bol_che_guevara_echo'); p.addFlag('political_active'); p.setMem('bolChe', true) },
      },
      {
        text: 'He came from outside and asked Bolivians to die for his idea',
        tag: 'skeptical',
        outcome: 'The 1952 revolution already happened here. What he brought was not what was needed. The analysis does not make the photograph of his body easier to look at.',
        effect: (p) => { p.e += 3; p.addFlag('bol_che_guevara_echo'); p.setMem('bolChe', true) },
      },
    ],
  },

  {
    id: 'bol_dep_potosi_colonial',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_BOL(G) &&
      G.flags.has('bol_mining_generation') &&
      G.age >= 10 && G.age <= 16 &&
      !G.mem?.bolPotosi,
    text: 'The school teaches you the number: eight million people died in the Potosí mines during the colonial period. Silver from this mountain built the cathedrals of Seville, funded the Spanish armada, priced the global market for two centuries. The Cerro Rico left Bolivia with a hollowed mountain and the lungs of the men who worked it. This is not taught as tragedy. It is taught as history. The distinction between those two things is something you will spend time thinking about.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 3; p.addFlag('bol_potosi_colonial_weight'); p.setMem('bolPotosi', true) },
  },

  {
    id: 'bol_dep_cholita_pollera',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_BOL(G) &&
      G.currentYear >= 2005 && G.currentYear <= 2025 &&
      G.age >= 25 &&
      !G.mem?.bolCholita,
    text: 'The cholita wrestlers of El Alto wear their pollera skirts and bowler hats into the ring. It began as entertainment — middle-class audiences watching Aymara women perform exaggerated falls — but something shifted. The women performing are Aymara. The costumes are their ordinary clothes. The violence is choreographed. The pride they carry into it is not. After 2006, after Evo\'s inauguration, the pollera is no longer only a marker of market-woman invisibility. The cholitas selling vegetables in the morning and performing in the ring on Saturday are the same women.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 3; p.addFlag('bol_cholita_generation'); p.setMem('bolCholita', true) },
  },

  {
    id: 'bol_dep_lithium_debate',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_BOL(G) &&
      G.currentYear >= 2015 && G.currentYear <= 2030 &&
      G.age >= 25 &&
      !G.mem?.bolLithium,
    text: 'The Salar de Uyuni contains the world\'s largest known lithium reserve — more than twenty-one million tonnes. The electric car market is being built around this element. The MAS government nationalised lithium extraction through YPFB and COMIBOL, insisting on Bolivian processing rather than raw export. The argument is the argument Bolivia has been having since 1545: who processes the resource, and where does the value go? The salt flat is white and flat and nearly silent. The world wants what is under it.',
    choices: [
      {
        text: 'Nationalisation and local processing is the only way Bolivia avoids repeating Potosí',
        tag: 'nationalist',
        outcome: 'The argument for national control is the argument for not watching four centuries of extracted wealth leave again. You have watched Bolivia\'s resources leave long enough to know the pattern.',
        effect: (p) => { p.m += 5; p.addFlag('bol_lithium_generation'); p.setMem('bolLithium', true) },
      },
      {
        text: 'Foreign investment moves faster — the lithium window may close if Bolivia\'s terms exclude the market',
        tag: 'pragmatic',
        outcome: 'The lithium is there regardless. The question is whether the decision gets made before the market moves to sodium-ion or something else entirely. Bolivia has waited before, and waiting has costs.',
        effect: (p) => { p.e += 3; p.addFlag('bol_lithium_generation'); p.setMem('bolLithium', true) },
      },
    ],
  },

  {
    id: 'bol_dep_tipnis_road',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_BOL(G) &&
      G.currentYear >= 2011 && G.currentYear <= 2016 &&
      G.age >= 20 &&
      !G.mem?.bolTipnis,
    text: 'The government wants to build a road through the TIPNIS — the Isiboro Sécure National Park and Indigenous Territory in the lowland Amazon. The road would connect Cochabamba to Beni, open the region, and cut through one of the most biodiverse places in Bolivia. The indigenous communities living inside the TIPNIS are marching to La Paz to stop it. That Evo Morales — the first indigenous president, who rewrote the constitution with Pachamama as a rights-holder — is ordering the road is not lost on anyone. Highland and lowland indigenous politics are different politics.',
    choices: [
      {
        text: 'The TIPNIS communities\' right to their territory cannot be overridden by development logic',
        tag: 'protection',
        outcome: 'The marchers reached La Paz. Facing political pressure, the government temporarily suspended the road. The suspension did not last. The law changed again. The road remains a live question.',
        effect: (p) => { p.m -= 3; p.karma += 5; p.addFlag('bol_tipnis_generation'); p.setMem('bolTipnis', true) },
      },
      {
        text: 'Bolivia\'s lowland regions need infrastructure — the same principle cannot always mean no development',
        tag: 'development',
        outcome: 'The communities inside TIPNIS have a different relationship to development logic than the argument being made about their territory. The road is still being argued about.',
        effect: (p) => { p.e += 2; p.addFlag('bol_tipnis_generation'); p.setMem('bolTipnis', true) },
      },
    ],
  },

  {
    id: 'bol_dep_sacred_coca_ceremony',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_BOL(G) &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.bolCocaCeremony,
    text: 'The coca ceremony is not cocaine. It is older than the word for cocaine. The leaves are arranged on a cloth and offered to Pachamama before a journey, before a difficult undertaking, before harvest. The abuelos say you read the leaves the way you read the year: for what is coming and what must be respected. You are not sure you believe it. You are not sure you don\'t. The leaf in your mouth at altitude is the thing that makes the cold manageable. The drug war happening to the same leaf somewhere else in the world is a different story with the same plant.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 2; p.addFlag('bol_sacred_coca_identity'); p.setMem('bolCocaCeremony', true) },
  },

  {
    id: 'bol_dep_maritime_icj',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_BOL(G) &&
      G.currentYear >= 2013 && G.currentYear <= 2020 &&
      G.age >= 25 &&
      !G.mem?.bolIcj,
    text: 'Bolivia takes Chile to the International Court of Justice at The Hague to argue that Chile has an obligation to negotiate sea access. Not the return of the 1879 territory — just the obligation to negotiate. The lawyers argue the case for years. In October 2018 the court rules: Chile has no legal obligation to negotiate. The ruling is what legal scholars said it would probably be. Bolivia will continue to have no coast. The case made the argument. The argument did not produce the coast.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.addFlag('bol_maritime_icj_generation'); p.setMem('bolIcj', true) },
  },

]
