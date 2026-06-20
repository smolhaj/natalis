// Mozambique character events
// Historical arcs: FRELIMO independence 1975, one-party socialist state (Samora Machel),
// RENAMO civil war 1977–1992 (South African/Rhodesian destabilisation), Machel plane crash 1986,
// Rome Peace Accords 1992 + first multi-party elections 1994,
// Mozambique floods 2000 (Cyclone Eline), offshore gas discovery 2010s,
// Cabo Delgado Islamist insurgency 2017+.

export const MOZAMBIQUE_EVENTS = [

  {
    id: 'moz_frelimo_independence',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Mozambique' &&
      G.currentYear >= 1975 && G.currentYear <= 1988 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem.mozFrelimo,
    text: 'June 25, 1975. Mozambique is independent. FRELIMO — the Front for the Liberation of Mozambique — is the party that won the liberation war and is now the government and there is no other. Samora Machel is president. "A luta continua" — the struggle continues — is what he says and what the schools teach. The land is nationalised. The private schools and clinics are nationalised. The colonial Portuguese have mostly left. What they leave behind is a country with almost no trained doctors, almost no secondary-school teachers, a civil service that was built for extraction. The independence is real. The infrastructure it inherits is real.',
    choices: null,
    effect: (p) => { p.e += 2; p.m += 4; p.r += 2; p.addFlag('mozambican_frelimo_generation'); p.setMem('mozFrelimo', true) },
  },

  {
    id: 'moz_renamo_civil_war',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Mozambique' &&
      G.currentYear >= 1978 && G.currentYear <= 1991 &&
      G.age >= 16 &&
      !G.mem.mozRenamo,
    text: 'RENAMO — the Mozambican National Resistance — was created by Rhodesian intelligence and then taken over by apartheid South Africa. Its strategy is not to win territory but to destroy: schools, clinics, bridges, grain stores, the infrastructure of ordinary rural life. By the late 1980s, one million Mozambicans are dead from the war. Five million are displaced. Teachers are targeted because they are FRELIMO\'s investment in the future. Clinics are targeted for the same reason. The countryside becomes the most dangerous place to be.',
    choices: [
      {
        text: 'You are in or near the rural areas — in the path of the war.',
        tag: null,
        outcome: 'You learned what it means when strangers with guns come and leave and what they leave behind. You carry the knowledge of what was destroyed and what was rebuilt and what was not.',
        effect: (p) => { p.m -= 18; p.h -= 4; p.r += 12; p.addFlag('mozambican_civil_war_generation'); p.addFlag('conflict_childhood_witnessed'); p.setMem('mozRenamo', true) },
      },
      {
        text: 'You are in Maputo or another city — watching the war from a distance it is still close enough to feel.',
        tag: null,
        outcome: 'The war is in the newspapers and in the conversations of adults and in the relatives who arrive from the provinces with less than they left with. The city is safer than the countryside. That is a different kind of knowing.',
        effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('mozambican_civil_war_generation'); p.setMem('mozRenamo', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'moz_machel_death_1986',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Mozambique' &&
      G.currentYear === 1986 &&
      G.age >= 8 &&
      !G.mem.mozMachel,
    text: 'October 19, 1986. Samora Machel\'s plane crashes into a hillside in South Africa near the Mozambican border. Machel and thirty-three others are dead. The South African government says it was pilot error. There is a Soviet-made navigation beacon near the crash site, repositioned. The evidence that the apartheid government lured the plane off course is substantial. Machel has been president since independence — the only president Mozambique has ever had. He is dead. Joaquim Chissano becomes president. The suspicion about what happened does not go away.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('mozambican_machel_generation'); p.setMem('mozMachel', true) },
  },

  {
    id: 'moz_peace_accords_1992',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Mozambique' &&
      G.currentYear >= 1992 && G.currentYear <= 1995 &&
      G.age >= 20 &&
      !G.mem.mozPeace,
    text: 'October 1992. The General Peace Agreement is signed in Rome. FRELIMO and RENAMO sit across from each other after fifteen years of a war that killed one million people. The UN peacekeeping mission — ONUMOZ — deploys. In 1994 there are elections. Chissano wins. Afonso Dhlakama, RENAMO\'s leader, accepts the result. The ceasefire holds. The mines are still in the ground — there are thousands of landmines — but the war is over. The reconstruction of the clinics and the schools and the bridges begins. That work takes decades.',
    choices: null,
    effect: (p) => { p.m += 10; p.r += 4; p.addFlag('mozambican_peace_generation'); p.setMem('mozPeace', true) },
  },

  {
    id: 'moz_floods_2000',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Mozambique' &&
      G.currentYear === 2000 &&
      G.age >= 16 &&
      !G.mem.mozFloods,
    text: 'February 2000. Cyclone Eline makes landfall. Then the rain doesn\'t stop. The Limpopo, the Save, the Zambezi overflow. Eight hundred people die. Half a million are displaced. Entire towns are underwater for weeks. A woman named Sophia Pedro gives birth to a daughter in a tree above the floodwaters — a helicopter rescue crew helps. The baby is named Rosita. The international cameras are there for that story. They are less there for the three months of recovery. The floods are not the worst thing that has happened in Mozambique. They arrive in a country that has not finished rebuilding from the last worst thing.',
    choices: null,
    effect: (p) => { p.m -= 10; p.h -= 2; p.r += 7; p.addFlag('mozambican_floods_generation'); p.setMem('mozFloods', true) },
  },

  {
    id: 'moz_gas_cabo_delgado',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Mozambique' &&
      G.currentYear >= 2010 &&
      G.age >= 25 &&
      !G.mem.mozGas,
    text: 'The gas. Enormous offshore gas deposits are discovered in the Rovuma Basin in the north. The numbers are extraordinary — among the largest in Africa. Total, ENI, ExxonMobil announce projects worth tens of billions. Then, in 2017, an insurgency begins in Cabo Delgado, Mozambique\'s northernmost province — also where the gas is. The group is locally called Al-Shabaab, no connection to the Somali group. By 2021 they have killed thousands, displaced 900,000 people, and Total has evacuated its Afungi gas base. The gas is still there. So are the displaced. The connection between the resource and the violence is not simple and it is not a coincidence.',
    choices: null,
    effect: (p) => { p.r += 8; p.m -= 6; p.addFlag('mozambican_gas_generation'); p.setMem('mozGas', true) },
  },

]
