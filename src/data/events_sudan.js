// Sudan character events
// Historical arcs: Nimeiry/Islamist law 1983, Bashir's 30-year military-Islamist
// dictatorship 1989–2019, Darfur genocide 2003–ongoing (300,000–400,000 dead),
// South Sudan independence 2011, Sudan's 2019 revolution (bread and dignity),
// transitional government 2019–21, October 2021 coup, April 2023 war in Khartoum.
// Note: Sudanese characters are primarily Arab-African Muslim majority;
// South Sudanese characters have separate coverage in the conflict zone/DRC arcs.

export const SUDAN_EVENTS = [

  {
    id: 'sdn_nimeiry_sharia_1983',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Sudan' &&
      G.currentYear >= 1983 && G.currentYear <= 1989 &&
      G.age >= 16 &&
      !G.mem.sdnSharia,
    text: 'September 1983. Nimeiry announces the September Laws — Islamic criminal law applied nationwide. Amputation for theft. Flogging for alcohol. Public executions. The legal status of women is reordered. Mahmoud Mohammed Taha, a reformist Islamic scholar who opposed the laws, is publicly executed in January 1985. You are living in the country this has become. In April 1985 Nimeiry is overthrown in a coup while he is abroad. The September Laws are not repealed.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('sudan_islamist_law_generation'); p.setMem('sdnSharia', true) },
  },

  {
    id: 'sdn_bashir_coup_1989',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Sudan' &&
      G.currentYear >= 1989 && G.currentYear <= 1995 &&
      G.age >= 16 &&
      !G.mem.sdnBashir,
    text: 'June 30, 1989. Brigadier Omar al-Bashir launches a coup while the elected civilian government is attempting peace negotiations with the south. The National Islamic Front of Hassan al-Turabi is the civilian face of the new order. The unions are dissolved. The parties are dissolved. The press is closed. Political opponents — lawyers, judges, academics, army officers — are taken to ghost houses: unofficial detention centres that do not appear in official records. The new Sudan is being constructed.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 7; p.addFlag('sudan_bashir_generation'); p.setMem('sdnBashir', true) },
  },

  {
    id: 'sdn_darfur_2003',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Sudan' &&
      G.currentYear >= 2003 && G.currentYear <= 2010 &&
      G.age >= 16 &&
      !G.mem.sdnDarfur,
    text: 'February 2003. The Sudan Liberation Army and the Justice and Equality Movement take up arms in Darfur — the western region, the periphery the Khartoum government has long ignored. The government\'s response: the Janjaweed militias, drawn from Arab nomadic groups, burn villages, rape systematically, kill by the hundreds of thousands. Between 300,000 and 400,000 people die. Two million are displaced. The International Criminal Court issues an arrest warrant for Bashir in 2009 — the first sitting head of state to be indicted for genocide. He travels freely. The Janjaweed become the Rapid Support Forces.',
    choices: [
      {
        text: 'You are from Darfur or have family there.',
        tag: null,
        outcome: 'The arithmetic of who is gone and who is displaced is personal. The word "genocide" arrived from international lawyers. The villages were burning before the word.',
        effect: (p) => { p.m -= 20; p.r += 12; p.h -= 5; p.addFlag('darfur_generation'); p.addFlag('genocide_survivor'); p.setMem('sdnDarfur', true) },
      },
      {
        text: 'You are in Khartoum, following the reports.',
        tag: null,
        outcome: 'The reports were controlled. What arrived was partial. What you understood of the scale came later. The government\'s word for it was "tribal conflict." You have revised your understanding several times.',
        effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('darfur_generation'); p.setMem('sdnDarfur', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sdn_south_sudan_independence_2011',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Sudan' &&
      G.currentYear === 2011 &&
      G.age >= 18 &&
      !G.mem.sdnSouth,
    text: 'July 9, 2011. South Sudan votes for independence after a 2005 peace agreement that ended Africa\'s longest civil war. The south becomes the world\'s newest country. Sudan loses a third of its territory and most of its oil. For northern Sudanese, the independence is a wound with a complicated texture: the war was the government\'s and cost northern Sudanese too, and the oil loss will reshape the economy. The country that remains is smaller and poorer and still under Bashir.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('sudan_south_separation_generation'); p.setMem('sdnSouth', true) },
  },

  {
    id: 'sdn_revolution_2019',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Sudan' &&
      G.currentYear === 2019 &&
      G.age >= 16 &&
      !G.mem.sdnRevolution,
    text: 'December 2018. The price of bread triples. Protests start in Atbara and spread to Khartoum. By April 2019 millions are camped in front of the military headquarters in Khartoum, singing and demanding the end of Bashir\'s thirty-year rule. On April 11, the army removes Bashir. He is arrested. The crowd stays, demanding civilian rule. On June 3, the Rapid Support Forces — the Janjaweed rebranded — fire into the sit-in. More than a hundred are killed. The bodies are thrown into the Nile. In August, a civilian-military transitional agreement is signed. Sudan is changing, for now.',
    choices: [
      {
        text: 'You are in the sit-in.',
        tag: null,
        outcome: 'You were at the military headquarters when the country changed. You were also there on June 3. You carry both.',
        effect: (p) => { p.m += 8; p.r += 10; p.addFlag('sudan_revolution_generation'); p.addFlag('sudanese_activist'); p.setMem('sdnRevolution', true) },
      },
      {
        text: 'You follow it from home, from work, through calls.',
        tag: null,
        outcome: 'Every Sudanese person you know was checking their phone every hour. When Bashir fell you were in a room and you know who was in the room with you.',
        effect: (p) => { p.m += 8; p.r += 6; p.addFlag('sudan_revolution_generation'); p.setMem('sdnRevolution', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sdn_coup_2021',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Sudan' &&
      G.currentYear === 2021 &&
      G.age >= 16 &&
      !G.mem.sdnCoup2021,
    text: 'October 25, 2021. General Abdel Fattah al-Burhan dissolves the transitional government, arrests civilian leaders, and declares a state of emergency. The transition lasted two years. The military was never genuinely sharing power. The coup is the clearest statement of what the military\'s position was throughout: the transition was a managed space, not a genuine handover. The streets fill again. The crackdowns begin again. The RSF — the Rapid Support Forces, the Janjaweed — are still there.',
    choices: null,
    effect: (p) => { p.m -= 14; p.r += 9; p.addFlag('sudan_coup_2021_generation'); p.setMem('sdnCoup2021', true) },
  },

]
