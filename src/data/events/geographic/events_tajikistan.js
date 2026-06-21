// events_tajikistan.js — Tajikistan character depth
// 10 events covering the Soviet Tajik SSR through Rahmon's authoritarian rule.
// Focus: civil war 1992–97 (most violent post-Soviet conflict in Central Asia),
// Pamiri identity, labour migration to Russia, Rogun dam politics,
// GBAO crackdown 2022, "Leader of the Nation" cult, and remittance economy.

const IS_TAJIK = (G) => G.character.country?.name === 'Tajikistan'
const IS_PAMIRI = (G) => IS_TAJIK(G) && G.character.ethnicity?.toLowerCase().includes('pamiri')

export const TAJIKISTAN_EVENTS = [

  // ─── SOVIET CHILDHOOD ────────────────────────────────────────────────────────

  {
    id: 'taj_soviet_dushanbe',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_TAJIK(G) &&
      G.currentYear >= 1960 && G.currentYear <= 1991 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.tajSoviet,
    text: 'Dushanbe was a village called Dyushambe before the Soviets arrived. The name means Monday in Tajik — it was a market town, a place people came once a week to trade. The Soviets industrialised it, built apartment blocks and a Lenin Avenue and a cotton processing plant and an aluminium smelter. They built schools in Russian where the educated classes taught and studied. You are growing up in the city that grew from those decisions. The bazaar where the traders used to come on Mondays is still there in an altered form. You know this city as normal. It is not the only version of it that has existed.',
    choices: null,
    effect: (p) => { p.e += 3; p.m += 2; p.addFlag('taj_soviet_generation'); p.setMem('tajSoviet', true) },
  },

  // ─── CIVIL WAR 1992–97 ───────────────────────────────────────────────────────

  {
    id: 'taj_civil_war_begins',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      IS_TAJIK(G) &&
      G.currentYear >= 1992 && G.currentYear <= 1994 &&
      G.age >= 16 &&
      !G.mem?.tajWar,
    text: 'By May 1992 the demonstrations in Dushanbe have become a war. The Soviet-era government backed by Russia and Uzbekistan on one side; Islamic opposition groups and regional militias from Gharm and the Pamirs on the other. The categories do not hold cleanly — it is also a war of regions, of clans, of old Soviet networks against new formations. Between 1992 and 1997 between fifty thousand and one hundred thousand people will be killed. One in ten Tajiks will be displaced. The country will lose a generation of educated professionals to emigration. This is happening around you now.',
    choices: [
      {
        text: 'Your family stayed in Dushanbe and survived the worst of it behind closed doors.',
        tag: 'taj_civil_war_stayed',
        outcome: 'The city changed hands more than once. The apartment blocks were the same. The people in them changed. You learned to read the street — who was in control today, which route was safe.',
        effect: (p) => { p.addFlag('taj_civil_war_stayed'); p.addFlag('taj_civil_war_witness'); p.r += 8; p.m -= 6; p.h -= 4; p.setMem('tajWar', true) },
      },
      {
        text: 'Your family fled to a village in the mountains or across the border to Afghanistan.',
        tag: 'taj_civil_war_displaced',
        outcome: 'The displacement was specific: what you could carry, where you went, how long you stayed before returning. The people who stayed are not the same as you and you are not the same as them.',
        effect: (p) => { p.addFlag('taj_civil_war_displaced'); p.addFlag('taj_civil_war_witness'); p.r += 10; p.m -= 8; p.h -= 6; p.setMem('tajWar', true) },
      },
    ],
  },

  // ─── PEACE ACCORD 1997 ───────────────────────────────────────────────────────

  {
    id: 'taj_peace_1997',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_TAJIK(G) &&
      G.flags.has('taj_civil_war_witness') &&
      G.currentYear >= 1997 && G.currentYear <= 1999 &&
      G.age >= 20 &&
      !G.mem?.tajPeace,
    text: 'The General Agreement on the Establishment of Peace and National Accord is signed in Moscow in June 1997. Emomali Rahmon stays as president. Thirty percent of government positions go to the United Tajik Opposition. The militias are supposed to integrate into state forces. Some do. Many keep their weapons and their territories. The educated people who left during the war are mostly still gone. Dushanbe\'s population is returning. What is returning to the city is not exactly the city that left.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m += 3; p.addFlag('taj_postwar_generation'); p.setMem('tajPeace', true) },
  },

  // ─── LABOUR MIGRATION TO RUSSIA ─────────────────────────────────────────────

  {
    id: 'taj_russia_migration',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_TAJIK(G) &&
      G.currentYear >= 2000 && G.currentYear <= 2020 &&
      G.age >= 18 && G.age <= 35 &&
      G.character.gender === 'male' &&
      !G.mem?.tajMigrate,
    text: 'A quarter of Tajikistan\'s GDP comes from money sent home by men working in Russia. In some villages, almost every man between twenty and forty is absent. They work construction in Moscow, cleaning in Novosibirsk, markets in Yekaterinburg. They send money on the first of the month. The wives and parents and children count on the first of the month. When Russia\'s economy contracts or tightens its migration rules, Tajikistan\'s households feel it within weeks. You are at the age when this calculation becomes personal.',
    choices: [
      {
        text: 'You went to Russia. The money was real and the conditions were what they were.',
        tag: 'taj_russia_migrant',
        outcome: 'The construction site, the dormitory, the phone call home on Sunday. You are one of the quarter-million Tajiks in Russia at any given time. The money arrives and your family\'s life is measurably different. Your life is the cost of that difference.',
        effect: (p) => { p.addFlag('taj_russia_migrant'); p.mo += 4000; p.w += 2; p.r += 6; p.m -= 4; p.setMem('tajMigrate', true) },
      },
      {
        text: 'You stayed. You found work locally at lower wages and watched others leave.',
        tag: 'taj_stayed_behind',
        outcome: 'The men who stayed have their reasons — parents who needed care, wives who refused the separation, papers that didn\'t clear. You stayed and built what could be built here on what the local economy could pay.',
        effect: (p) => { p.addFlag('taj_stayed_behind'); p.s += 3; p.m += 3; p.r += 3; p.setMem('tajMigrate', true) },
      },
    ],
  },

  // ─── RAHMON CULT OF PERSONALITY ─────────────────────────────────────────────

  {
    id: 'taj_leader_of_nation',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_TAJIK(G) &&
      G.currentYear >= 2015 && G.currentYear <= 2022 &&
      G.age >= 25 &&
      !G.mem?.tajRahmon,
    text: 'The parliament passed a law in 2015 giving Emomali Rahmon the title "Leader of the Nation" (Peshvoi Millat). This makes him exempt from prosecution for life, allows him to speak at any government event at any time, and makes insulting him a criminal offence. His photograph has been in the government offices since 1994. The title is new. The practice is not. His son Rustam Emomali is chairman of the Senate. The mathematics of succession is visible.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.m -= 4; p.addFlag('taj_rahmon_era'); p.setMem('tajRahmon', true) },
  },

  // ─── PAMIRI IDENTITY ─────────────────────────────────────────────────────────

  {
    id: 'taj_pamiri_identity',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_PAMIRI(G) &&
      G.currentYear >= 1990 && G.currentYear <= 2020 &&
      G.age >= 16 &&
      !G.mem?.tajPamiri,
    text: 'The Gorno-Badakhshan Autonomous Oblast is the size of Switzerland and holds roughly three percent of Tajikistan\'s population. The roads from Dushanbe take two days when they are open. The people here speak Shughni, Wakhi, Rushani — languages closer to Persian than to Tajik, not mutually intelligible. The Pamiris are mostly Ismaili Muslim, a minority within a Sunni country. During the civil war the Pamiri fighters were on the opposition side. The Dushanbe government does not forget this. You know what it means to be from here, which is different from what it means in the capital.',
    choices: [
      {
        text: 'You stayed in Khorog or the valley. The isolation is also protection.',
        tag: 'taj_pamiri_stayed',
        outcome: 'The mountains are specific: the altitude, the cold, the passes that close in winter. The Aga Khan Development Network built the schools and the hospitals that the state did not. Your identity is particular in a way that the capital does not have language for.',
        effect: (p) => { p.addFlag('taj_pamiri_stayed'); p.addFlag('taj_pamiri_identity'); p.m += 4; p.s += 2; p.r += 5; p.setMem('tajPamiri', true) },
      },
      {
        text: 'You moved to Dushanbe for university or work. You are Pamiri in a Tajik city.',
        tag: 'taj_pamiri_dushanbe',
        outcome: 'In Dushanbe you are recognizable as Pamiri — by surname, by accent, by the informal networks that the Pamiris maintain in the city. The networks function. They also mark you.',
        effect: (p) => { p.addFlag('taj_pamiri_dushanbe'); p.addFlag('taj_pamiri_identity'); p.r += 6; p.e += 3; p.s += 2; p.setMem('tajPamiri', true) },
      },
    ],
  },

  // ─── GBAO CRACKDOWN 2022 ─────────────────────────────────────────────────────

  {
    id: 'taj_gbao_2022',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      IS_TAJIK(G) &&
      G.currentYear >= 2022 && G.currentYear <= 2024 &&
      G.age >= 20 &&
      !G.mem?.tajGbao,
    text: 'In November 2021 protests began in Gorno-Badakhshan after the killing of a local leader by security forces. The government declared a state of emergency and cut internet access. In May 2022 security forces launched a large operation in GBAO — armoured vehicles, arrests, reported deaths that the government did not confirm. The number of people killed is disputed. The protests were the largest in GBAO since the civil war. The internet blackout meant most of what happened was documented later, by the diaspora, from accounts that got out after the fact.',
    choices: [
      {
        text: 'You were in GBAO during the crackdown.',
        tag: 'taj_gbao_witness',
        outcome: 'The armoured vehicles on the mountain roads. The phone going silent. The specific texture of not being able to tell anyone what was happening while it happened.',
        effect: (p) => { p.addFlag('taj_gbao_witness'); p.r += 10; p.m -= 7; p.h -= 3; p.setMem('tajGbao', true) },
      },
      {
        text: 'You were in Dushanbe or abroad and watched the internet go dark over GBAO.',
        tag: 'taj_gbao_distant_witness',
        outcome: 'The GBAO contacts going quiet. The VPNs that stopped working. The specific fear of absence when the absence is over people you know in a place you know.',
        effect: (p) => { p.addFlag('taj_gbao_distant_witness'); p.r += 7; p.m -= 5; p.setMem('tajGbao', true) },
      },
    ],
  },

  // ─── ROGUN DAM ───────────────────────────────────────────────────────────────

  {
    id: 'taj_rogun_dam',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_TAJIK(G) &&
      G.currentYear >= 2010 && G.currentYear <= 2023 &&
      G.age >= 25 &&
      !G.mem?.tajRogun,
    text: 'The Rogun Dam on the Vakhsh River has been under construction, on and off, since the Soviet period. When complete it will be the tallest dam in the world and will make Tajikistan self-sufficient in electricity and a significant electricity exporter. Uzbekistan has opposed it for decades — the dam will regulate the flow of the Amu Darya, which Uzbekistan\'s agriculture depends on. The dam is a national project, a matter of sovereignty, a point of regional conflict, and a construction site where you know people who have worked. All of these are the same dam.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 4; p.m += 2; p.addFlag('taj_rogun_generation'); p.setMem('tajRogun', true) },
  },

  // ─── REMITTANCE ECONOMY ──────────────────────────────────────────────────────

  {
    id: 'taj_remittance_life',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_TAJIK(G) &&
      G.currentYear >= 2008 && G.currentYear <= 2022 &&
      G.age >= 30 &&
      !G.mem?.tajRemit,
    text: 'The money arrives from Russia. It arrives via Western Union, via Migom, via the man who drives back for weddings and brings cash sewn into jacket linings. When it arrives — on the first of the month, or when the construction project ends, or when the employer pays — the family buys what has been calculated. Flour, cooking oil, school fees, the medical bill that has been waiting. When the ruble falls, as it did in 2014 and in 2022, the family\'s purchasing power falls with it. You are one household in an economy where this is the structure of survival.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 3; p.addFlag('taj_remittance_household'); p.setMem('tajRemit', true) },
  },

  // ─── LATE RECKONING ──────────────────────────────────────────────────────────

  {
    id: 'taj_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_TAJIK(G) &&
      G.age >= 60 &&
      !G.mem?.tajLate,
    text: 'You have watched a country negotiate its existence: the war, the peace that preserved the men who caused the war, the slow construction of the Leader of the Nation\'s portrait on every wall, the sons of men who disappeared in 1992 who are now managing the state that their fathers opposed. Tajikistan has its own logic — a logic of altitude and isolation and the specific political economy of a landlocked country surrounded by larger powers that all have opinions about what it should be. You have lived inside that logic for sixty years. You do not resolve it. You hold it.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 7; p.karma += 4; p.e += 4; p.addFlag('taj_testigo_generation'); p.setMem('tajLate', true) },
  },

]
