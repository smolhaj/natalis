// events_honduras.js — Honduras arc (8 events)
// Covers: banana republic childhood, Battalion 316 death squads, Contra war staging,
// Hurricane Mitch 1998, Zelaya coup 2009, Berta Cáceres 2016, gang territory,
// late reckoning
// Complements events_central_america.js which covers the regional war texture

const IS_HONDURAN = (G) => G.character.country?.name === 'Honduras'

export const HONDURAS_EVENTS = [

  // ─── BANANA REPUBLIC CHILDHOOD ────────────────────────────────────────────────

  {
    id: 'hon_banana_plantation',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_HONDURAN(G) &&
      G.currentYear >= 1950 && G.currentYear <= 1985 &&
      G.ruralUrban !== 'urban' &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.honBanana,
    text: 'The plantation runs to the horizon. United Fruit, Standard Fruit — the companies that came before the government and in some ways have never left. Your father works the rows. You know the smell of the chemical spray before you know the word for it. The bananas are grown for export; the price is set in New York; what arrives in your town is the portion that remained after the price was set elsewhere. This is the arrangement Honduras was built around, and the word for it — "banana republic" — was coined by a man who saw this valley from a boat in 1904 and understood exactly what he was looking at.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 3; p.addFlag('hon_banana_generation'); p.setMem('honBanana', true) },
  },

  // ─── BATTALION 316 ────────────────────────────────────────────────────────────

  {
    id: 'hon_battalion_316',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_HONDURAN(G) &&
      G.currentYear >= 1980 && G.currentYear <= 1986 &&
      G.age >= 18 &&
      !G.mem?.honBattalion,
    text: 'The disappearances are happening in Honduras — not as a side effect of a war here but as an operation. Battalion 316 is the name later given to the unit, trained by the CIA, that has been taking union organisers, students, journalists, and priests. The bodies surface in ditches or do not surface at all. The American ambassador is informed. The reports go to Washington and are filed. You have known people who were careful for particular reasons and people who were taken despite being careful. The disappearances teach you something about what "civilian" means in a country someone else is using.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('hon_battalion_316_generation'); p.setMem('honBattalion', true) },
  },

  // ─── CONTRA STAGING GROUND ────────────────────────────────────────────────────

  {
    id: 'hon_contra_base',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_HONDURAN(G) &&
      G.currentYear >= 1982 && G.currentYear <= 1990 &&
      G.age >= 18 &&
      !G.mem?.honContra,
    text: 'The Americans built bases in the south, near the Nicaraguan border. The Contras train there. The US calls Honduras a sovereign nation and treats it as a staging area. Both of these things are true simultaneously and neither cancels the other. Your government negotiated the use of your territory and the Americans did not have to negotiate very hard. The money arrived. The bases appeared. The Nicaraguan war is fought partly from your country\'s soil, and what Honduras receives for this is the presence of the Americans, which is both protection and occupation depending on the day.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 2; p.m -= 5; p.setMem('honContra', true) },
  },

  // ─── HURRICANE MITCH 1998 ─────────────────────────────────────────────────────

  {
    id: 'hon_hurricane_mitch',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      IS_HONDURAN(G) &&
      G.currentYear === 1998 &&
      G.age >= 15 &&
      !G.mem?.honMitch,
    text: 'Hurricane Mitch makes landfall in late October 1998 and stalls over Honduras for four days. Seven thousand people die. Eighty percent of the country\'s crops are destroyed. Bridges are gone. Roads are gone. The Choluteca River floods in a way that makes its old bed irrelevant — after the flood it runs in a completely different channel. USAID calls it the worst natural disaster in two centuries of Honduran history. The infrastructure that took thirty years to build is gone in four days. The Hondurans who were already leaving for the United States begin to leave at a rate that changes the character of entire regions.',
    choices: null,
    effect: (p) => { p.m -= 15; p.h -= 5; p.r += 8; p.mo -= 2000; p.addFlag('hon_mitch_survivor'); p.setMem('honMitch', true) },
  },

  // ─── ZELAYA COUP 2009 ─────────────────────────────────────────────────────────

  {
    id: 'hon_zelaya_coup',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_HONDURAN(G) &&
      G.currentYear === 2009 &&
      G.age >= 22 &&
      !G.mem?.honZelaya,
    text: 'At four in the morning on June 28, 2009, soldiers drag President Manuel Zelaya from the presidential residence in his pyjamas and fly him to Costa Rica. The Supreme Court called it constitutional. The military called it constitutional. The private sector called it constitutional. Zelaya had proposed a constitutional referendum — not a change to the constitution, a poll asking whether people wanted a constitutional assembly. The United States initially called it a coup and then mostly didn\'t. The international community suspended aid. The coup government held elections. Honduras has been living with the consequences since.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 7; p.e += 3; p.addFlag('hon_zelaya_generation'); p.setMem('honZelaya', true) },
  },

  // ─── BERTA CÁCERES 2016 ───────────────────────────────────────────────────────

  {
    id: 'hon_berta_caceres',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_HONDURAN(G) &&
      G.currentYear >= 2016 &&
      G.age >= 20 &&
      !G.mem?.honBerta,
    text: (G) => {
      const isIndigenous = ['indigenous_lenca', 'garifuna_honduran', 'miskito_honduran'].includes(G.character.ethnicity?.id)
      return isIndigenous
        ? 'Berta Cáceres was Lenca. She founded COPINH — the Civic Council of Popular and Indigenous Organisations of Honduras — and spent fifteen years stopping the Agua Zarca dam that would have diverted the Gualcarque River, sacred to the Lenca people. She received the Goldman Environmental Prize in 2015. On March 2, 2016, she was shot in her home in La Esperanza. The men who killed her were connected to the Desarrollos Energéticos company that was building the dam. You know her name. You know what it cost.'
        : 'Berta Cáceres, the Lenca activist who won the Goldman Environmental Prize and stopped the Agua Zarca dam on the Gualcarque River, is shot in her home on March 2, 2016. The intellectual authors of the murder are later found to include executives of the company that was building the dam. Honduras is the most dangerous country in the world for environmental activists. The awards her killers knew about did not protect her.'
    },
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 7; p.karma += 4; p.addFlag('hon_berta_witness'); p.setMem('honBerta', true) },
  },

  // ─── GANG TERRITORY ───────────────────────────────────────────────────────────

  {
    id: 'hon_gang_territory_2010s',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_HONDURAN(G) &&
      G.currentYear >= 2010 && G.currentYear <= 2022 &&
      G.ruralUrban === 'urban' &&
      G.age >= 22 &&
      !G.mem?.honGang,
    text: 'San Pedro Sula has the highest murder rate of any city on earth outside a declared war zone. The statistic is from 2012 and 2013 and 2014 — the worst years. The neighbourhood you live in has boundaries. You know them the way you know the streets: this block is Barrio 18, this corner is MS-13. The gang boundary is not marked on any official map. You carry it in your body the way you carry all knowledge you received without being taught. You do not cross the wrong line. This is the whole of the calculation.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.setMem('honGang', true) },
  },

  // ─── LATE RECKONING ───────────────────────────────────────────────────────────

  {
    id: 'hon_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_HONDURAN(G) &&
      G.age >= 58 &&
      !G.mem?.honLateReckoning,
    text: 'Honduras is a country that has served as the site of other people\'s projects for a century: the banana companies\' labour pool, the Americans\' staging base, the cartels\' transit corridor. The people who shaped its political economy mostly did not live here. The people who died in its disasters, disappeared in its death squads, fled its gangs, and rebuilt after its hurricane were Hondurans. Xiomara Castro became the first woman president in 2021, Zelaya\'s wife. The Battalion 316 survivors are still waiting for something resembling accountability. The banana companies are still there. You know the whole shape of the thing because you lived inside it.',
    choices: null,
    effect: (p) => { p.r += 6; p.m += 4; p.karma += 3; p.e += 2; p.setMem('honLateReckoning', true) },
  },

]
