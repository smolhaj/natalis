// Ivory Coast (Côte d'Ivoire) character arc events
// Covers: cocoa economy, Houphouët-Boigny era and death, 1999 coup,
// 2010 election crisis, Abidjan urban texture, late reckoning.
// Three events already exist in events_west_africa.js:
//   cdi_houphouet_era (childhood, 1960–1985)
//   cdi_ivoirite_crisis (young_adult, 1995–2005)
//   cdi_civil_war (midlife, 2002–2011)
// This file adds depth for gaps those three don't cover.

const IS_IVORIAN = (G) => G.character.country.name === 'Ivory Coast';

export const IVORY_COAST_EVENTS = [

  // ── COCOA ECONOMY ─────────────────────────────────────────────────────────────

  {
    id: 'ci_cocoa_smallholder',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.currentYear >= 1965 && G.currentYear <= 2005 &&
      G.ruralUrban === 'rural' &&
      G.age >= 16 && G.age <= 35 &&
      !G.mem?.ciCocoa,
    text: 'Ivory Coast grows a third of the world\'s cocoa. The trees take four years to bear fruit. You plant them and you wait. When the pods come they are red and yellow and heavy, and you harvest them with a machete and split each one and spread the beans on mats to ferment. The smell of fermenting cocoa is the smell of this life. The world price is set in London and New York. You do not set it. Some years the price is high and you build a concrete block room onto the house. Some years the price falls and you do not.',
    choices: [
      {
        text: 'Plant more trees — more land, future income.',
        tag: 'Scale',
        outcome: 'The trees will bear fruit in four years. In four years the price may be different. The risk belongs to you.',
        effect: (p) => { p.w += 3; p.m -= 3; p.addFlag('ci_cocoa_farmer'); p.setMem('ciCocoa', true); },
      },
      {
        text: 'Diversify — keep food crops alongside cocoa.',
        tag: 'Hedge',
        outcome: 'Less cocoa income in the good years. Food when the price falls. Your family eats when the market doesn\'t.',
        effect: (p) => { p.h += 2; p.m -= 1; p.addFlag('ci_cocoa_farmer'); p.setMem('ciCocoa', true); },
      },
    ],
  },

  // ── HOUPHOUËT-BOIGNY DEATH 1993 ────────────────────────────────────────────

  {
    id: 'ci_houphouet_death_1993',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.currentYear >= 1993 && G.currentYear <= 1994 &&
      G.age >= 12 &&
      !G.mem?.ciHbDeath,
    text: 'December 7, 1993. Félix Houphouët-Boigny dies in Yamoussoukro at the age of eighty-eight, possibly eighty-nine — he never confirmed his birth year. He had been the country\'s only president. His photograph had hung in every government building, every schoolroom, every police station for thirty-three years. Henri Konan Bédié, the National Assembly speaker, announces the succession on television before the army has decided what it thinks. The photograph stays on the walls for now. But it is a photograph of someone who is gone.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 3; p.addFlag('ci_houphouet_witness'); p.setMem('ciHbDeath', true); },
  },

  // ── 1999 COUP ─────────────────────────────────────────────────────────────────

  {
    id: 'ci_coup_1999',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.currentYear >= 1999 && G.currentYear <= 2000 &&
      G.age >= 16 &&
      !G.mem?.ciCoup1999,
    text: 'Christmas Eve, 1999. General Robert Guéï and a group of soldiers call themselves the National Committee of Public Salvation and announce on radio that Bédié has been removed. The announcement comes at midnight. By morning the soldiers have renamed themselves a junta and are deciding who will be allowed to run for president. Alassane Ouattara — who was excluded from the 1995 election for being insufficiently Ivorian — is excluded again. The election that follows is between Guéï and Laurent Gbagbo. Guéï announces himself the winner. The streets fill with protesters. Guéï leaves the country. Gbagbo is president.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('ci_coup_1999_witness'); p.setMem('ciCoup1999', true); },
  },

  // ── ABIDJAN URBAN TEXTURE ─────────────────────────────────────────────────────

  {
    id: 'ci_abidjan_life',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2015 &&
      G.ruralUrban === 'urban' &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.ciAbidjan,
    text: 'Abidjan sits on a lagoon. The Plateau business district rises on one side; Treichville and Adjamé spread on the other. The bridges connect them and the bridges also separate them: the old European city and the African city that grew alongside it. The gbaka minibuses navigate gaps in traffic that seem impossible. The markets in Treichville run all night. The phone booths on the street corners, each one operated by a woman with a notebook tracking call minutes. The smell of grilled plantain and exhaust and the lagoon, in the morning before the heat arrives.',
    choices: [
      {
        text: 'You work in the formal economy — office, bank, government.',
        tag: 'Formal',
        outcome: 'The Plateau with its air conditioning and fixed salaries. You wear different clothes for work and for the neighbourhood.',
        effect: (p) => { p.e += 2; p.w += 3; p.addFlag('ci_abidjan_generation'); p.setMem('ciAbidjan', true); },
      },
      {
        text: 'You work in trade — the market, the informal sector.',
        tag: 'Informal',
        outcome: 'No fixed salary, no job security, no paper. The market has its own rules and you know them.',
        effect: (p) => { p.s += 3; p.m += 2; p.addFlag('ci_abidjan_generation'); p.setMem('ciAbidjan', true); },
      },
    ],
  },

  // ── 2010 ELECTION CRISIS ──────────────────────────────────────────────────────

  {
    id: 'ci_election_crisis_2010',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.currentYear >= 2010 && G.currentYear <= 2011 &&
      G.age >= 20 &&
      !G.mem?.ciElection2010,
    text: 'November 28, 2010. The Independent Electoral Commission announces that Alassane Ouattara has won the presidential election with 54 percent of the vote. The Constitutional Council, controlled by Laurent Gbagbo\'s allies, annuls the results and declares Gbagbo the winner. The UN, the African Union, France, and the United States recognise Ouattara. Gbagbo has the military. Ouattara has international recognition and the Forces Nouvelles fighters from the north. The country divides again — not along a zone of confidence this time but street by street in Abidjan. Three thousand people die. It lasts five months.',
    choices: [
      {
        text: 'Your neighbourhood is Gbagbo territory. You navigate it.',
        tag: 'South',
        outcome: 'The roadblocks are manned by the Jeunes Patriotes. You learn which checkpoints ask for papers and which ones ask for money.',
        effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('ci_election_crisis_witness'); p.setMem('ciElection2010', true); },
      },
      {
        text: 'You move — to family in the north, to Abidjan\'s quieter quarters, out of the country.',
        tag: 'Leave',
        outcome: 'You leave before the worst. You watch the last five months from somewhere safer. You will wonder what that means for a long time.',
        effect: (p) => { p.m -= 8; p.h += 3; p.addFlag('ci_election_crisis_witness'); p.addFlag('ci_election_displaced'); p.setMem('ciElection2010', true); },
      },
    ],
  },

  // ── NORTH-SOUTH DIVIDE ────────────────────────────────────────────────────────

  {
    id: 'ci_north_south_identity',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.currentYear >= 1995 &&
      (G.ethnicity === 'senufo' || G.ethnicity === 'dioula_manding' || G.ethnicity === 'malinke_ci') &&
      G.age >= 14 &&
      !G.mem?.ciNorthSouth,
    text: 'The north of the country is predominantly Muslim and predominantly Gur and Manding — Sénoufo, Dioula, Malinké. The south is predominantly Christian and Akan. Under Houphouët-Boigny these were not categories that mattered politically. After his death they began to matter a great deal. Ivoirité named the south as the authentic Ivory Coast. The north was positioned as foreign, questionable, incomplete. You grow up knowing that the country has decided your family\'s origins are a problem it can choose to recognise or ignore depending on who is in power.',
    choices: [
      {
        text: 'You hold the Muslim north as your identity — prayer, Dioula, the family networks.',
        tag: 'Identity',
        outcome: 'The identity is real and it is also contested. You carry it in a country that has debated whether you fully belong to it.',
        effect: (p) => { p.m -= 5; p.s += 2; p.addFlag('ci_northern_identity'); p.setMem('ciNorthSouth', true); },
      },
      {
        text: 'You learn to code-switch — French, the Plateau, the credentials that cross the line.',
        tag: 'Navigate',
        outcome: 'The credentials get you into rooms where the question of where you are from is not asked immediately. It is always asked eventually.',
        effect: (p) => { p.e += 3; p.m -= 3; p.addFlag('ci_northern_identity'); p.setMem('ciNorthSouth', true); },
      },
    ],
  },

  // ── LATE RECKONING ────────────────────────────────────────────────────────────

  {
    id: 'ci_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_IVORIAN(G) &&
      G.currentYear >= 2015 &&
      (G.flags.includes('ci_houphouet_witness') || G.flags.includes('ivorian_civil_war_generation')) &&
      !G.mem?.ciLateReckoning,
    text: 'The economy has been growing again since 2012 — seven, eight, nine percent per year. Abidjan is building: glass towers on the Plateau, new bridge over the lagoon, supermarkets in Cocody. The Ivorian Miracle is the phrase people use again, without irony or with it, depending on who is speaking. You have lived through the miracle and the crash and the ivoirité years and the civil war and the election crisis. The phrase covers a long silence about everything that happened between the first time someone used it and now.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.addFlag('ci_long_witness'); p.setMem('ciLateReckoning', true); },
  },

]
