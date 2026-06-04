// Nepal character events
// Historical arcs: Maoist People's War 1996–2006 (13,000–16,000 dead),
// King Gyanendra's royal coup 2005, Jana Andolan II / monarchy ends 2006/2008,
// earthquake April 25, 2015 (Gorkha, 9,000 dead), Gulf labor migration and kafala.
// Nepal is the youngest federal republic in Asia, formerly a 240-year monarchy.

export const NEPAL_EVENTS = [

  {
    id: 'nep_maoist_insurgency',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Nepal' &&
      G.currentYear >= 1996 && G.currentYear <= 2006 &&
      G.age >= 14 &&
      !G.mem.nepMaoist,
    text: 'The Communist Party of Nepal (Maoist) declares a People\'s War in February 1996. The insurgency grows from the rural west and hills — the areas the state does not reach, where the landlords are powerful and the caste ceiling is visible. By 2000 the Maoists control large rural areas. The army and the Maoists both commit violations; the Human Rights Watch reports document both sides. 13,000 people die over ten years. The insurgency is also a land reform movement, a caste liberation movement, and a Maoist revolution, simultaneously.',
    choices: [
      {
        text: 'You are in a rural area where the Maoists have presence.',
        tag: null,
        outcome: 'The village has a new authority alongside or instead of the old one. The Maoists collect taxes, settle disputes, punish. You navigate the new order.',
        effect: (p) => { p.m -= 14; p.r += 8; p.addFlag('nepal_maoist_generation'); p.setMem('nepMaoist', true) },
      },
      {
        text: 'You are in Kathmandu, following the insurgency through reports.',
        tag: null,
        outcome: 'The war is in the hills. In Kathmandu, it is in the news. The distance between the news and the hills is the thing you will understand later.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('nepal_maoist_generation'); p.setMem('nepMaoist', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'nep_royal_massacre_2001',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nepal' &&
      G.currentYear === 2001 &&
      G.age >= 14 &&
      !G.mem.nepRoyalMassacre,
    text: 'June 1, 2001. Crown Prince Dipendra shoots his parents — King Birendra and Queen Aishwarya — and eight other members of the royal family at the Narayanhity Palace before shooting himself. He is declared king while on life support; he dies three days later. The official account is disputed. King Gyanendra — Birendra\'s brother, now king — was not in the palace. The conspiracy theories accumulate in the absence of a credible investigation. The 240-year-old Shah dynasty is in crisis.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('nepal_royal_massacre_generation'); p.setMem('nepRoyalMassacre', true) },
  },

  {
    id: 'nep_republic_2006',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nepal' &&
      G.currentYear >= 2006 && G.currentYear <= 2008 &&
      G.age >= 16 &&
      !G.mem.nepRepublic,
    text: 'April 2006. The Jana Andolan II — the second people\'s movement — brings hundreds of thousands into the streets of Kathmandu. King Gyanendra, who seized direct power in 2005, is forced to reinstate parliament. The Maoists sign a peace agreement in November. In May 2008, the Constituent Assembly votes to abolish the monarchy. The 240-year-old Shah dynasty, the world\'s only Hindu kingdom, ends by vote. You are watching the end of the world your parents were born into and the beginning of a federal republic.',
    choices: null,
    effect: (p) => { p.m += 8; p.r += 4; p.addFlag('nepal_republic_generation'); p.setMem('nepRepublic', true) },
  },

  {
    id: 'nep_gulf_migration',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Nepal' &&
      G.currentYear >= 2000 && G.currentYear <= 2022 &&
      G.character.gender === 'male' &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem.nepGulfMigration,
    text: 'Qatar. Saudi Arabia. Malaysia. The labour broker charges a fee you have borrowed against. The ticket is one way. The kafala system means your employer controls your residency: you cannot change jobs, you cannot leave without a no-objection certificate, your passport may be held. The remittance you send home will be, for your family, the difference between the school fees being paid and not being paid. Young men from your village have gone this way. Some come back. You have heard of the ones who did not.',
    choices: [
      {
        text: 'You go.',
        tag: null,
        outcome: 'The work is what the work is. The money arrives home every month. That is the transaction you made. You try to keep it to that.',
        effect: (p) => { p.m -= 10; p.mo += 2500; p.r += 7; p.addFlag('nepal_gulf_worker'); p.setMem('nepGulfMigration', true) },
      },
      {
        text: 'A relative goes instead. You stay.',
        tag: null,
        outcome: 'The money comes from outside. You are the one who is here. The two roles are different kinds of sacrifice.',
        effect: (p) => { p.mo += 1000; p.m -= 4; p.addFlag('nepal_gulf_worker'); p.setMem('nepGulfMigration', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'nep_earthquake_2015',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Nepal' &&
      G.currentYear === 2015 &&
      G.age >= 10 &&
      !G.mem.nepEarthquake,
    text: 'April 25, 2015, 11:56am. The Gorkha earthquake: magnitude 7.8. The shaking lasts almost a minute. Kathmandu\'s brick buildings, Bhaktapur\'s medieval squares, the villages in the hills — the damage is specific and total. 9,000 people die. 600,000 houses are damaged or destroyed. The Langtang valley — a tourist trekking area — is obliterated by an avalanche triggered by the quake. The international aid arrives faster than the government can distribute it. You are somewhere when the shaking starts.',
    choices: [
      {
        text: 'You are in Kathmandu or the hill districts.',
        tag: null,
        outcome: 'You know where you were and what fell. You remember the sound of it and the silence after.',
        effect: (p) => { p.m -= 18; p.h -= 6; p.r += 10; p.addFlag('nepal_earthquake_generation'); p.setMem('nepEarthquake', true) },
      },
      {
        text: 'You are elsewhere in Nepal.',
        tag: null,
        outcome: 'You heard about it before you felt the aftershocks. You spent the next weeks trying to reach people.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('nepal_earthquake_generation'); p.setMem('nepEarthquake', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'nep_youth_exodus',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Nepal' &&
      G.currentYear >= 2010 &&
      G.age >= 20 && G.age <= 35 &&
      !G.mem.nepExodus,
    text: 'The statistic: Nepal sends more than 1,500 young people abroad every day as migrant workers. The economy cannot absorb the youth that are being educated. The alternative — Kathmandu, with its traffic, its air pollution index posted daily, its government jobs going to the connected — is also not enough. You are in the generation that leaves or watches the leaving. The village is full of people sending money back and empty of people your age.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('nepal_youth_exodus_generation'); p.setMem('nepExodus', true) },
  },

]
