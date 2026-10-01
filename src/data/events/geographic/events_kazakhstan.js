// events_kazakhstan.js — Kazakhstan character depth
// 10 events covering gaps in events_central_asia.js (which covers nomad
// collectivisation, Aral Sea, and oil boom). This module covers:
// Kazakh language revival, the city renamed twice, Russian minority
// coexistence, Zhanaozen massacre 2011, Nazarbayev managed succession,
// Qantar January 2022 protests and crackdown, late reckoning.

const IS_KAZAKH = (G) => G.character.country?.name === 'Kazakhstan'

export const KAZAKHSTAN_EVENTS = [

  // ─── KAZAKH LANGUAGE REVIVAL ─────────────────────────────────────────────

  {
    id: 'kaz_language_question',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_KAZAKH(G) &&
      G.currentYear >= 1991 && G.currentYear <= 2010 &&
      G.age >= 7 && G.age <= 16 &&
      !G.mem?.kazLang,
    text: 'Soviet policy suppressed Kazakh — the professionals spoke Russian, the schools taught in Russian, the television that came from Moscow was in Russian. By independence, fewer than forty percent of ethnic Kazakhs could hold a conversation in their own language. Kazakh was the language of older relatives, of songs, of the countryside. The new state is making it official and mandatory. You are growing up in the middle of a language being recovered — taught by people who are also learning it, administered by people who still think in Russian.',
    choices: [
      {
        text: 'Kazakh is your primary language. You carry this as a marker of authenticity.',
        tag: 'kazakh_speaker',
        outcome: 'In a country where language is political, being fluent in Kazakh is both identity and currency — and occasionally a wall between you and the Russian-speaking half of your world.',
        effect: (p) => { p.addFlag('kazakh_speaker'); p.s += 2; p.e += 2; p.setMem('kazLang', true) },
      },
      {
        text: 'Russian is the language you actually live in. Kazakh is something you learn in school.',
        tag: 'kaz_russian_speaker_primary',
        outcome: 'The professional world, the internet, the city — these are still largely Russian. You will learn enough Kazakh to navigate officially. The gap between languages is the gap between two versions of what your country is.',
        effect: (p) => { p.addFlag('kaz_russian_speaker_primary'); p.e += 2; p.r += 3; p.setMem('kazLang', true) },
      },
    ],
  },

  // ─── RUSSIAN MINORITY ────────────────────────────────────────────────────

  {
    id: 'kaz_russian_coexistence',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_KAZAKH(G) &&
      G.character.ethnicity?.toLowerCase().includes('russian') &&
      G.currentYear >= 1991 && G.currentYear <= 2020 &&
      G.age >= 18 &&
      !G.mem?.kazRussian,
    text: 'In 1991 Russians were forty percent of Kazakhstan\'s population. Now you are nineteen percent and falling — the emigration has been steady for thirty years, the Russian-speaking cities of the north thinning out. Putin has made the occasional remark about whether Kazakhstan has a legitimate historical existence. The Kazakh state is officially multicultural; the direction of travel is clear. You know the trajectory. You are still here, which means you have decided something, even if you did not decide it explicitly.',
    choices: [
      {
        text: 'You consider yourself Kazakhstani. This is home.',
        tag: 'kaz_russian_stayed_home',
        outcome: 'Kazakhstani, not Russian — the distinction matters to you. You speak Kazakh adequately. Your children speak it better than you.',
        effect: (p) => { p.addFlag('kaz_russian_stayed_home'); p.m += 4; p.s += 2; p.setMem('kazRussian', true) },
      },
      {
        text: 'You have thought about Russia. You are still doing the calculation.',
        tag: 'kaz_russian_considering_leave',
        outcome: 'The calculation involves the job, the apartment, the parents, the sense that Russia is not what Russia used to be either. You are staying, for now, for reasons.',
        effect: (p) => { p.addFlag('kaz_russian_considering_leave'); p.r += 6; p.m -= 4; p.setMem('kazRussian', true) },
      },
    ],
  },

  // ─── THE CITY THAT HAD THREE NAMES ───────────────────────────────────────

  {
    id: 'kaz_nursultan_rename',
    phase: null,
    weight: 4,
    when: (G) =>
      IS_KAZAKH(G) &&
      G.currentYear >= 2019 && G.currentYear <= 2022 &&
      G.age >= 25 &&
      !G.mem?.kazRename,
    text: 'The capital has been Akmola, then Astana (which means capital in Kazakh), then Nur-Sultan (for the president who just resigned), and is now Astana again after the January protests made the Nur-Sultan name untenable. You have watched the city renamed three times in your adult life — the signs repainted, the passports of city residents showing different cities, the international mail rerouted. The capital itself rose from the steppe in 1997 as a monument to what the oil money could build. The glass towers are still there. The name under them is now back to what it was.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.addFlag('kaz_astana_generation'); p.setMem('kazRename', true) },
  },

  // ─── ZHANAOZEN OIL MASSACRE 2011 ─────────────────────────────────────────

  {
    id: 'kaz_zhanaozen_2011',
    phase: null,
    weight: 5,
    when: (G) =>
      IS_KAZAKH(G) &&
      G.currentYear >= 2011 && G.currentYear <= 2013 &&
      G.age >= 22 &&
      !G.mem?.kazZhan,
    text: 'On December 16, 2011 — Independence Day — police opened fire on oil workers striking in Zhanaozen. The workers had been on strike for seven months, demanding higher wages from KazMunaiGas, the state oil company whose revenues fund the capital\'s architecture and the president\'s National Fund. Sixteen people were killed in the square. The government called the strikers provocateurs and saboteurs. Nazarbayev flew to Zhanaozen, declared a state of emergency, and said those responsible would be punished. The union leaders were among those arrested. This was the first time in his twenty-two years in power that the facade developed a visible crack.',
    choices: null,
    effect: (p) => { p.r += 8; p.e += 3; p.m -= 4; p.addFlag('kaz_zhanaozen_witness'); p.setMem('kazZhan', true) },
  },

  // ─── NAZARBAYEV RESIGNATION 2019 ─────────────────────────────────────────

  {
    id: 'kaz_nazarbayev_steps_down',
    phase: null,
    weight: 5,
    when: (G) =>
      IS_KAZAKH(G) &&
      G.currentYear >= 2019 && G.currentYear <= 2020 &&
      G.age >= 25 &&
      !G.mem?.kazNazarResign,
    text: 'March 2019. Nazarbayev resigns, after thirty years, and stays head of the Security Council, and his daughter runs the Senate, and his party runs everything else. The word for it is managed. The next day the capital is renamed after him. You watch and try to work out what, exactly, has changed.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.m += 2; p.addFlag('kaz_post_nazarbayev'); p.setMem('kazNazarResign', true) },
  },

  // ─── QANTAR: JANUARY 2022 PROTESTS ───────────────────────────────────────

  {
    id: 'kaz_qantar_protests',
    phase: null,
    weight: 5,
    when: (G) =>
      IS_KAZAKH(G) &&
      G.currentYear >= 2022 && G.currentYear <= 2023 &&
      G.age >= 20 &&
      !G.mem?.kazQantar,
    text: 'On January 1, 2022, the subsidy on car gas is lifted and the price doubles overnight in Zhanaozen, the same town as 2011. By January 4 there are protests in Almaty, Aktobe, Shymkent, the largest the country has known. Tokayev calls in the CSTO, Russian soldiers among them, calls the protesters bandits and terrorists, and orders the police to shoot without warning. The internet goes dark. The month gives its name, Qantar, to what happened.',
    context: 'The official toll of the January 2022 unrest was 238 dead; about 10,000 people were detained.',
    choices: [
      {
        text: 'You were in the streets.',
        tag: 'kaz_qantar_protester',
        outcome: 'The few days when the streets belonged to people who had never before believed the streets could belong to them. And then the CSTO vehicles, and then the dark internet, and then the counting.',
        effect: (p) => { p.addFlag('kaz_qantar_protester'); p.addFlag('political_active'); p.m -= 8; p.r += 10; p.setMem('kazQantar', true) },
      },
      {
        text: 'You were at home, watching the internet flicker out.',
        tag: 'kaz_qantar_witness',
        outcome: 'The Telegram channels going quiet one by one. The VPN that stopped working. The quality of an information vacuum: you know something is happening; you know only the silhouette of what it is.',
        effect: (p) => { p.addFlag('kaz_qantar_witness'); p.r += 8; p.m -= 5; p.setMem('kazQantar', true) },
      },
    ],
  },

  // ─── QANTAR AFTERMATH ────────────────────────────────────────────────────

  {
    id: 'kaz_qantar_aftermath',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_KAZAKH(G) &&
      (G.flags.has('kaz_qantar_witness') || G.flags.has('kaz_qantar_protester')) &&
      G.currentYear >= 2022 && G.currentYear <= 2024 &&
      !G.mem?.kazQantarAfter,
    text: 'The official story settles: foreign terrorists, internal provocateurs, order restored. Tokayev arrests some of Nazarbayev\'s people and calls it anti-corruption, and gives the capital its old name back. Of the thousands arrested, some are released and some convicted, and the human rights groups write down what happened in the cells. Officially Qantar means order restored. You use the word differently.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.setMem('kazQantarAfter', true) },
  },

  // ─── OIL WEALTH AND ITS ABSENCES ─────────────────────────────────────────

  {
    id: 'kaz_oil_contradiction',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_KAZAKH(G) &&
      G.currentYear >= 2005 && G.currentYear <= 2022 &&
      G.age >= 30 &&
      !G.mem?.kazOilContr,
    text: 'Kazakhstan has three percent of the world\'s proven oil reserves. The National Fund holds fifty billion dollars. The architecture of Astana/Nur-Sultan is specifically designed to be photographed from the air — the Norman Foster pyramid, the Khan Shatyr tent, the Bayterek tower. Meanwhile, the Mangystau region where the oil is extracted — where the fields are, where Zhanaozen is — remains among the country\'s poorest areas. The National Fund\'s returns flow to the state budget; the state budget builds the capital. You know the geography of where the money comes from and where it goes.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 3; p.m -= 3; p.setMem('kazOilContr', true) },
  },

  // ─── STEPPE IDENTITY ─────────────────────────────────────────────────────

  {
    id: 'kaz_steppe_memory',
    phase: null,
    weight: 3,
    when: (G) =>
      IS_KAZAKH(G) &&
      G.character.ethnicity?.toLowerCase().includes('kazakh') &&
      G.currentYear >= 1950 && G.currentYear <= 2000 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.kazSteppe,
    text: 'Your grandfather knew the names of the stars from the saddle. The constellations that told you which direction to ride on a dark steppe night. He has not ridden that way for forty years — the collective farm, the city, the settled life — but the names are in him and he gives them to you in Kazakh, the old names, before the Russian astronomers renamed things. You are in a city. You look up. The stars are the same stars. You have their names in a language that was almost taken from you before you were born.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.addFlag('kaz_steppe_identity'); p.setMem('kazSteppe', true) },
  },

  // ─── LATE RECKONING ──────────────────────────────────────────────────────

  {
    id: 'kaz_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_KAZAKH(G) &&
      G.age >= 60 &&
      !G.mem?.kazLate,
    text: 'You have watched a country be built, out of a Soviet republic that was nearly half Russian, that held a nuclear test site and lost its nomadic life to collectivisation and famine. Now it has a flag and a capital with a real skyline and a history being assembled in real time, with some things in it and some left out. Zhanaozen is not in the official history; January is an order restored. You have watched all of it, and it does not resolve.',
    choices: null,
    effect: (p) => { p.m += 6; p.r += 7; p.karma += 4; p.e += 4; p.addFlag('kaz_testigo_generation'); p.setMem('kazLate', true) },
  },

]
