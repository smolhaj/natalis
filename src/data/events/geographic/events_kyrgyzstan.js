// events_kyrgyzstan.js — Kyrgyzstan character depth
// 10 events covering nomadic heritage (Soviet collectivisation aftermath),
// the Manas epic, three overthrown presidents, Tulip Revolution 2005,
// June 2010 Osh ethnic violence, Kyrgyz-Uzbek coexistence/rupture,
// remittance economy, and late reckoning.

const IS_KYRGYZ = (G) => G.character.country?.name === 'Kyrgyzstan'
const IS_OSH_UZBEK = (G) =>
  IS_KYRGYZ(G) &&
  G.character.ethnicity?.toLowerCase().includes('uzbek')

export const KYRGYZSTAN_EVENTS = [

  // ─── MANAS EPIC ──────────────────────────────────────────────────────────────

  {
    id: 'kyr_manas_epic',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      IS_KYRGYZ(G) &&
      G.character.ethnicity?.toLowerCase().includes('kyrgyz') &&
      G.currentYear >= 1950 && G.currentYear <= 2010 &&
      G.age >= 7 && G.age <= 16 &&
      !G.mem?.kyrManas,
    text: 'The Manas epic is half a million lines long. It is the longest oral epic in world literature. For centuries it lived in the memory of specialist singers — manaschi — who recited it from memory at festivals and celebrations. Stalin had it written down in the 1920s; later Soviet authorities sometimes banned parts of it for being too nationalist. You have heard it performed. The singer does not read it. He enters a kind of trance and the words come from somewhere that is not quite him. You are growing up in the country that produced this and has carried it.',
    choices: null,
    effect: (p) => { p.m += 6; p.e += 3; p.s += 2; p.addFlag('kyr_manas_generation'); p.setMem('kyrManas', true) },
  },

  // ─── NOMADIC HERITAGE ────────────────────────────────────────────────────────

  {
    id: 'kyr_steppe_heritage',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_KYRGYZ(G) &&
      G.character.ethnicity?.toLowerCase().includes('kyrgyz') &&
      G.currentYear >= 1950 && G.currentYear <= 2005 &&
      G.age >= 8 && G.age <= 18 &&
      !G.mem?.kyrSteppe,
    text: 'Your grandparents were nomads, or their parents were. The mountains are ninety percent of the country and the traditional economy moved between the high summer pastures and the lower winter ones on a calendar that the Soviet collective farm disrupted and ended. The yurt — the boz üy — is still made by some families, still erected at summer festivals. The horse is still a fact, a skill, a measure. You are growing up in the generation for whom the nomadic past is memory held by elders rather than a life they live. The elders are still there. You listen.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 2; p.addFlag('kyr_nomadic_heritage'); p.setMem('kyrSteppe', true) },
  },

  // ─── 1991 INDEPENDENCE SHOCK ─────────────────────────────────────────────────

  {
    id: 'kyr_independence_collapse',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_KYRGYZ(G) &&
      G.currentYear >= 1991 && G.currentYear <= 1996 &&
      G.age >= 16 &&
      !G.mem?.kyrIndep,
    text: 'The Soviet Union ends and Kyrgyzstan is independent and the Soviet economy ends with it. The factories close because the supply chains they depended on no longer cross the same borders. The professional class — engineers, doctors, teachers trained to Soviet standards — discovers that Soviet credentials have limited value in a market that does not yet exist. The subsidies that kept food prices low, the ruble that paid salaries: gone. You watch the people who had stable lives suddenly working out how to survive in an economy that arrived without instructions.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.m -= 5; p.w -= 3; p.addFlag('kyr_independence_generation'); p.setMem('kyrIndep', true) },
  },

  // ─── TULIP REVOLUTION 2005 ───────────────────────────────────────────────────

  {
    id: 'kyr_tulip_revolution',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      IS_KYRGYZ(G) &&
      G.currentYear >= 2005 && G.currentYear <= 2006 &&
      G.age >= 16 &&
      !G.mem?.kyrTulip,
    text: 'On March 24, 2005 protesters storm government buildings in Bishkek. President Askar Akayev flees to Russia. The Tulip Revolution — named after the flower, though the protesters did not choose the name — ends fifteen years of Akayev\'s rule. The optimism is real. What follows is also real: the next president, Bakiyev, proves to be worse. The lesson that the region is taking from these events is still being debated. You watched this happen in the capital of your country and you are still deciding what you watched.',
    choices: [
      {
        text: 'You were in the streets or among those who believed something had changed.',
        tag: 'kyr_tulip_participant',
        outcome: 'The feeling on that day was specific. The days after were also specific. You keep both.',
        effect: (p) => { p.addFlag('kyr_tulip_participant'); p.m += 4; p.r += 5; p.setMem('kyrTulip', true) },
      },
      {
        text: 'You watched it happen and felt uncertain about what it meant.',
        tag: 'kyr_tulip_skeptic',
        outcome: 'The optimism did not fully reach you. The next years confirmed some of your uncertainty.',
        effect: (p) => { p.addFlag('kyr_tulip_skeptic'); p.r += 6; p.e += 3; p.setMem('kyrTulip', true) },
      },
    ],
  },

  // ─── OSH ETHNIC VIOLENCE JUNE 2010 ───────────────────────────────────────────

  {
    id: 'kyr_osh_2010',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      IS_KYRGYZ(G) &&
      G.currentYear >= 2010 && G.currentYear <= 2012 &&
      G.age >= 16 &&
      !G.mem?.kyrOsh,
    text: 'In June 2010, after Bakiyev is overthrown in April, ethnic violence erupts in Osh and Jalal-Abad between Kyrgyz and Uzbeks. More than four hundred people are killed — probably more; the official count is contested. Hundreds of thousands are displaced. Uzbek neighbourhoods in Osh are burned. The violence was organized: there are accounts of trucks carrying armed men in from outside the city, of lists of addresses. The interim government declares a state of emergency. The international response is slow. This is happening in the south of your country.',
    choices: [
      {
        text: 'You are Kyrgyz. The violence created a silence around what happened that you have not resolved.',
        tag: 'kyr_osh_kyrgyz_witness',
        outcome: 'You know what happened. You know people who were in it. The question of collective responsibility is one your community has not been able to ask clearly.',
        effect: (p) => {
          p.addFlag('kyr_osh_kyrgyz_witness')
          p.r += 9; p.m -= 6; p.e += 3
          p.setMem('kyrOsh', true)
        },
      },
      {
        text: 'You are Uzbek. Your community bore the brunt of the violence.',
        tag: 'kyr_osh_uzbek_witness',
        outcome: 'The neighbourhood that was burned. The accounting of who is alive and who is not. The question of whether the country where you were born is a country for you.',
        effect: (p) => {
          p.addFlag('kyr_osh_uzbek_witness')
          p.r += 12; p.m -= 10; p.h -= 5; p.karma += 5
          p.setMem('kyrOsh', true)
        },
      },
    ],
  },

  // ─── KYRGYZ-UZBEK COEXISTENCE ────────────────────────────────────────────────

  {
    id: 'kyr_uzbek_coexistence',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_KYRGYZ(G) &&
      G.currentYear >= 2012 && G.currentYear <= 2025 &&
      G.age >= 25 &&
      (G.flags.has('kyr_osh_kyrgyz_witness') || G.flags.has('kyr_osh_uzbek_witness')) &&
      !G.mem?.kyrCoexist,
    text: 'You live in a country where two communities share the Fergana Valley and the Osh markets and the border districts, and where the memory of June 2010 is carried differently on each side. The coexistence continues — the Uzbek traders are still in the bazaar, the Kyrgyz neighbours are still across the street — but the June silence is in the air at certain moments, around certain subjects, with certain ages of people who remember. You navigate this. Most days it is just the texture of the place. Some days it is not just that.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 4; p.m += 2; p.addFlag('kyr_osh_generation'); p.setMem('kyrCoexist', true) },
  },

  // ─── THREE PRESIDENTS OVERTHROWN ─────────────────────────────────────────────

  {
    id: 'kyr_third_overthrow',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      IS_KYRGYZ(G) &&
      G.currentYear >= 2020 && G.currentYear <= 2022 &&
      G.age >= 25 &&
      !G.mem?.kyrThird,
    text: 'In October 2020, after a disputed parliamentary election, protesters overturn the results and president Sooronbay Jeenbekov resigns. This is the third time in fifteen years that a president of Kyrgyzstan has been forced from power by popular action — Akayev in 2005, Bakiyev in 2010, now Jeenbekov. The pattern is visible to everyone. The country is being called the most democratic of the Central Asian republics by people outside it, and chaotic by people inside it. You are one of the people inside it. You have watched three presidents go. The fourth one is now Sadyr Japarov, who was in prison for hostage-taking six months ago. The pattern continues.',
    choices: null,
    effect: (p) => { p.r += 6; p.e += 4; p.m += 2; p.addFlag('kyr_three_revolutions_generation'); p.setMem('kyrThird', true) },
  },

  // ─── GOLD AND REMITTANCES ─────────────────────────────────────────────────────

  {
    id: 'kyr_economy_reality',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      IS_KYRGYZ(G) &&
      G.currentYear >= 2005 && G.currentYear <= 2025 &&
      G.age >= 25 &&
      !G.mem?.kyrEcon,
    text: 'The economy is gold — the Kumtor mine in the Tian Shan produces a third of the country\'s export earnings — and remittances. The men who work in Russia and Kazakhstan send money home. When Russia imposes migration restrictions, or when the ruble falls, or when the pandemic closes borders, the remittances drop and Kyrgyzstan\'s household economies contract. The gold mine is owned by a Canadian company, then in dispute with the government for years, then nationalised in 2021. The mountain is a fact. Who benefits from the mountain has been a political argument for twenty years.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.m -= 2; p.addFlag('kyr_kumtor_generation'); p.setMem('kyrEcon', true) },
  },

  // ─── BRIDE KIDNAPPING ────────────────────────────────────────────────────────

  {
    id: 'kyr_ala_kachuu',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      IS_KYRGYZ(G) &&
      G.character.gender === 'female' &&
      G.character.ethnicity?.toLowerCase().includes('kyrgyz') &&
      G.currentYear >= 1960 && G.currentYear <= 2015 &&
      G.age >= 16 && G.age <= 25 &&
      !G.mem?.kyrAlakachuu,
    text: 'Ala kachuu: the practice of abducting a woman for marriage, which the law prohibits and which continues. Some of it is consensual performance of a custom; some of it is not. The rural areas, the older men, the family pressure to accept it as tradition — all of these are part of the environment you are navigating. A girl you knew was taken last year. She stayed. Whether she had a real choice is a question her family does not ask openly. You are aware of the edges of your freedom in ways that the word "tradition" does not fully explain.',
    choices: [
      {
        text: 'You know what your rights are and that they are not always enforceable.',
        tag: 'kyr_ala_kachuu_aware',
        outcome: 'The awareness is not the same as protection. It is the awareness that the protection is partial.',
        effect: (p) => { p.addFlag('kyr_ala_kachuu_aware'); p.r += 6; p.e += 4; p.m -= 3; p.setMem('kyrAlakachuu', true) },
      },
      {
        text: 'This is not something you think about directly. You think about the edges of it.',
        tag: 'kyr_tradition_burden',
        outcome: 'There are things women here know without saying. You know them too.',
        effect: (p) => { p.addFlag('kyr_tradition_burden'); p.r += 5; p.m -= 4; p.setMem('kyrAlakachuu', true) },
      },
    ],
  },

  // ─── LATE RECKONING ──────────────────────────────────────────────────────────

  {
    id: 'kyr_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      IS_KYRGYZ(G) &&
      G.age >= 60 &&
      !G.mem?.kyrLate,
    text: 'You have watched a small landlocked country try to find a form for itself three times in your adult life and succeed three times at overthrow and struggle each time with what comes after. The mountains have not changed. The Manas has not changed. The Kyrgyz identity is in the epic and in the mountains and in the memory of the nomadic way and in the specific shape of the argument that your country keeps having with itself about what it is and who it is for. You hold all of this without it resolving. That seems like the right relationship to it.',
    choices: null,
    effect: (p) => { p.m += 6; p.r += 7; p.karma += 5; p.e += 4; p.addFlag('kyr_testigo_generation'); p.setMem('kyrLate', true) },
  },

]
