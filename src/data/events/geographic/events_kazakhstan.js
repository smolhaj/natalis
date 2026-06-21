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
    phase: 'childhood',
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
    phase: 'young_adult',
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
    phase: 'midlife',
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
    phase: 'midlife',
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
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_KAZAKH(G) &&
      G.currentYear >= 2019 && G.currentYear <= 2020 &&
      G.age >= 25 &&
      !G.mem?.kazNazarResign,
    text: 'On March 19, 2019 Nazarbayev announced his resignation. He has been president since 1989 — through the Soviet period, through independence, through thirty years of consolidated personal power. The announcement was surprising in its form; the reality it announced was not. He remains chairman of the Security Council. His daughter runs the Senate. His son-in-law runs the national company. His party continues. The word for this transition, in Kazakhstan, is managed. The city is renamed for him the next day. You watch the announcement and try to understand what, exactly, has changed.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.m += 2; p.addFlag('kaz_post_nazarbayev'); p.setMem('kazNazarResign', true) },
  },

  // ─── QANTAR: JANUARY 2022 PROTESTS ───────────────────────────────────────

  {
    id: 'kaz_qantar_protests',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_KAZAKH(G) &&
      G.currentYear >= 2022 && G.currentYear <= 2023 &&
      G.age >= 20 &&
      !G.mem?.kazQantar,
    text: 'On January 1, 2022, the subsidies on liquefied petroleum gas are lifted. The price doubles in Zhanaozen — the same town as 2011 — overnight. By January 4 the protests have spread to Almaty, to Aktobe, to Shymkent. The largest protests in Kazakhstan\'s history. On January 5 President Tokayev requests CSTO troops — Russian, Belarusian, Armenian, Kyrgyz soldiers entering Kazakhstan to "restore order." He calls the protesters "20,000 bandits and terrorists" and gives an order to shoot without warning. The internet goes dark. When the count is done: 238 people killed, 10,000 arrested. Qantar — January — enters the language.',
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
        outcome: 'The Telegram channels going quiet one by one. The VPN that stopped working. The specific quality of an information vacuum: you know something is happening; you know only the silhouette of what it is.',
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
    text: 'The official narrative settled into: foreign terrorists, internal provocateurs, a managed restoration. Tokayev arrested some Nazarbayev allies including the former head of the security services and called it anti-corruption. He renamed the city back to Astana. The CSTO troops left. The 10,000 people who were arrested have had varying outcomes. Some were released. Some were convicted. Human rights organisations have documented torture in detention. The word Qantar is not used officially as anything other than a restored order. You use it differently.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.setMem('kazQantarAfter', true) },
  },

  // ─── OIL WEALTH AND ITS ABSENCES ─────────────────────────────────────────

  {
    id: 'kaz_oil_contradiction',
    phase: 'midlife',
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
    phase: 'childhood',
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
    text: 'You have watched a country be built. Not from nothing — from a Soviet republic that was forty percent Russian and held a nuclear test site and had lost its nomadic life to collectivisation and starvation — but something that did not exist as an independent entity now exists, has a flag, has a capital with a real skyline, has a history being constructed in real time. The construction includes what is included and what is left out. Zhanaozen is not in the official history. The January protests are a managed restoration. The grandfather\'s star names are in a language that is now official policy. You have watched all of this. You hold it without it resolving.',
    choices: null,
    effect: (p) => { p.m += 6; p.r += 7; p.karma += 4; p.e += 4; p.addFlag('kaz_testigo_generation'); p.setMem('kazLate', true) },
  },

]
