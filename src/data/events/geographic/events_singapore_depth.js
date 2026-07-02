// events_singapore_depth.js — Singapore depth arc (angles not covered by events_singapore.js)

export const SINGAPORE_DEPTH_EVENTS = [

  // ── Operation Coldstore 1963 ─────────────────────────────────────────────────

  {
    id: 'sg_dep_coldstore_1963',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Singapore' &&
      G.currentYear >= 1963 && G.currentYear <= 1968 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.sgColdstore,
    text: 'Operation Coldstore: February 2, 1963. Over a hundred trade unionists, student leaders, and Barisan Sosialis members are detained under the Internal Security Act without trial. The PAP says they are communist conspirators. The Barisan says they are democrats who won elections and lost to the ISA instead of the ballot box. Lee Kuan Yew says: "We are going to make this work, and for that we need to remove the obstruction." The obstruction is in Changi Prison. Some will be there for over a decade.',
    choices: [
      {
        text: 'You are among those detained, or you know someone who is',
        tag: 'detained',
        outcome: 'The detention order has no fixed term. You will be released when the government decides you have been sufficiently de-radicalized. The country being built outside the prison is not the country you were building.',
        effect: (p) => { p.m -= 12; p.r += 8; p.h -= 5; p.addFlag('sg_coldstore_generation') },
      },
      {
        text: 'You are a PAP supporter — the communists had to be removed',
        tag: 'supporter',
        outcome: 'The Singapore that emerges from 1963 is stable and productive. The price paid to build it — the men in Changi — is not something that comes up in the National Day narrative.',
        effect: (p) => { p.e += 2; p.r += 4; p.addFlag('sg_coldstore_generation') },
      },
    ],
    effect: null,
  },

  // ── Nanyang University (Nantah) closure 1980 ──────────────────────────────

  {
    id: 'sg_dep_nantah_closure_1980',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Singapore' &&
      G.ethnicity === 'chinese_singaporean' &&
      G.currentYear >= 1978 && G.currentYear <= 1985 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.sgNantah,
    text: 'Nanyang University — Nantah — was built by the Chinese community in the 1950s, funded by donations from taxi drivers and trishaw riders, to provide Chinese-medium university education. In 1980 it is merged with the University of Singapore into NUS and the Chinese-medium instruction is ended. The government says it is a pragmatic decision: English is the language of the economy. You know this is true. You also know that Nantah was built by hands and savings that understood something about what they were building that the economists do not count.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.addFlag('sg_nantah_generation'); p.setMem('sgNantah', true) },
  },

  // ── Operation Spectrum 1987 ───────────────────────────────────────────────

  {
    id: 'sg_dep_spectrum_1987',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Singapore' &&
      G.currentYear >= 1987 && G.currentYear <= 1993 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.sgSpectrum,
    text: 'May 1987. Twenty-two people are detained under the ISA — social workers, theatre practitioners, Catholic lay workers, a law student. The government calls it a Marxist conspiracy. Most of those detained had been involved in work with migrant workers, prisoners, the urban poor. Several are released and then re-detained after they speak to foreign journalists. The allegations are denied by Amnesty International, lawyers from outside Singapore, and eventually most who knew the detainees. The detentions last two to three years. No charges are ever filed.',
    choices: [
      {
        text: 'You knew one of the detainees — you know what they were actually doing',
        tag: 'knew_them',
        outcome: 'You cannot say anything publicly that would protect them. You watch the newspapers. The word "Marxist" appears in headlines written by people who did not attend the same meetings you attended.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('sg_spectrum_generation') },
      },
      {
        text: 'You did not know them — you read the official account and were uncertain',
        tag: 'uncertain',
        outcome: 'Singapore\'s official accounts are usually accurate about numbers and dates. About other things you have learned to be less certain. The uncertainty is the thing you carry.',
        effect: (p) => { p.e += 2; p.r += 4; p.addFlag('sg_spectrum_generation') },
      },
    ],
    effect: null,
  },

  // ── Malay-Muslim identity in Singapore ────────────────────────────────────

  {
    id: 'sg_dep_malay_muslim_sg_identity',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Singapore' &&
      G.ethnicity === 'malay_singaporean' &&
      G.currentYear >= 1970 &&
      G.age >= 25 &&
      !G.mem?.sgMalayMuslim,
    text: 'You are Malay in a country governed by a Chinese majority. Your language — Malay — is the national language of Singapore, sung in the anthem, printed on the coins, and spoken by fifteen percent of the population. Your religion is administered by a government-appointed body, MUIS. Your community\'s loyalty is a question that the government has managed rather than resolved: the gentle exclusion from sensitive military postings, the Group Representation Constituencies that guarantee Malay representation in Parliament while also ensuring PAP endorsement of Malay candidates. You are Singaporean. You are also navigating what that means when the country is not built in your image.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.addFlag('sg_malay_muslim_sg_identity'); p.setMem('sgMalayMuslim', true) },
  },

  // ── Migrant worker experience ─────────────────────────────────────────────

  {
    id: 'sg_dep_migrant_worker',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentCountry === 'Singapore' &&
      G.character.country?.name !== 'Singapore' &&
      G.currentYear >= 2000 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.sgMigrantWorker,
    text: 'The dormitory holds twelve hundred men. The room holds sixteen. The salary is what the contract said, less the deductions: levy, transport, dormitory fee, uniform. You came because the money in Singapore is more than anything available at home. You knew the arithmetic before you came. You knew about the dormitory. What you did not fully know was the quality of the hours outside work: the food court where a plate of rice and chicken costs more than an hour\'s wages, the phone that takes the whole day to process each call home, the two years that look long from the outside and longer from the inside.',
    choices: [
      {
        text: 'Send the money home — that is what you came for',
        tag: 'remit',
        outcome: 'The transfers arrive. The house is being built. The children are in school. The arithmetic works if you do not count yourself in it too heavily.',
        effect: (p) => { p.mo += 8000; p.m -= 8; p.h -= 3; p.addFlag('sg_migrant_worker_sg') },
      },
      {
        text: 'Document the conditions — someone should know',
        tag: 'document',
        outcome: 'The phone camera. The notes. You are not the first to try this. You know you are not the last.',
        effect: (p) => { p.mo += 5000; p.m -= 6; p.karma += 4; p.addFlag('sg_migrant_worker_sg') },
      },
    ],
    effect: null,
  },

  // ── "Foreign talent" and the local professional ───────────────────────────

  {
    id: 'sg_dep_foreign_talent_debate',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Singapore' &&
      G.currentYear >= 2010 && G.currentYear <= 2022 &&
      G.age >= 28 && G.age <= 50 &&
      G.career &&
      !G.mem?.sgForeignTalent,
    text: 'The 2011 general election: PAP wins 60.1% — its worst result since 1963. The word on the ground is immigration. Not migrant workers this time — professionals. The "foreign talent" programme has brought in tens of thousands of Employment Pass holders, and the question circulating at void decks and coffee shops is whether Singaporeans are being passed over in their own country. The 2013 Population White Paper projects six point nine million people by 2030. Sixty thousand people sign a petition against it. You have your own view. Every Singaporean does.',
    choices: [
      {
        text: 'The openness is what built Singapore — you cannot close the door now',
        tag: 'open',
        outcome: 'The argument is historically accurate and also does not address what your colleague\'s brother experienced at his last three job interviews.',
        effect: (p) => { p.e += 3; p.r += 2; p.addFlag('sg_foreign_talent_debate') },
      },
      {
        text: 'There is a difference between attracting talent and replacing citizens',
        tag: 'local',
        outcome: 'The PAP hears it in 2011. The policies adjust slightly. The adjustments are partial. The tension does not resolve.',
        effect: (p) => { p.r += 4; p.m -= 2; p.addFlag('sg_foreign_talent_debate') },
      },
    ],
    effect: null,
  },

  // ── Section 377A repeal 2022 ─────────────────────────────────────────────

  {
    id: 'sg_dep_377a_repeal_2022',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Singapore' &&
      G.flags.has('lgbtq_identity') &&
      G.currentYear >= 2022 && G.currentYear <= 2025 &&
      G.age >= 25 &&
      !G.mem?.sg377aRepeal,
    text: 'November 2022. Prime Minister Lee Hsien Loong announces that Section 377A — which criminalises sex between men — will be repealed. It is repealed in January 2023. At the same time, the constitution is amended to define marriage as between a man and a woman, closing the door on any path to marriage equality through the courts. The repeal is real. The amendment is also real. Singapore has given something and taken something in the same legislative session. You have been living in this country for your whole life, and this is what it looks like when it moves.',
    choices: [
      {
        text: 'The repeal is real and it matters — acknowledge that',
        tag: 'acknowledge',
        outcome: 'The years between the first activists and this moment are in the room when you let yourself feel it. The room is large.',
        effect: (p) => { p.m += 4; p.r += 3; p.addFlag('sg_lgbtq_377a_repeal') },
      },
      {
        text: 'The constitutional amendment is the closing of a door — mourn that too',
        tag: 'mourn',
        outcome: 'The repeal and the amendment are a single legislative package. You take the whole package and you decide what to do with it.',
        effect: (p) => { p.m += 2; p.r += 5; p.addFlag('sg_lgbtq_377a_repeal') },
      },
    ],
    effect: null,
  },

  // ── SG50 — 50th anniversary reckoning 2015 ───────────────────────────────

  {
    id: 'sg_dep_sg50_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country?.name === 'Singapore' &&
      G.currentYear >= 2015 && G.currentYear <= 2017 &&
      G.age >= 55 &&
      !G.mem?.sgSG50,
    text: 'Singapore turns fifty in 2015. The National Day parade on the Padang, the exhibitions, the commemorations. LKY dies in March. The year is dense with the feeling of the founding generation passing. You were young when independence — separation, really — happened, and you are old enough now to have seen everything in between. The country works. You live in something that functions. The people who ask whether Singapore is a good place to live are not wrong to ask it, and the people who answer "yes" are also not wrong. You have lived the fifty years. The question is too simple for the life inside it.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 4; p.e += 2; p.addFlag('sg_sg50_generation'); p.setMem('sgSG50', true) },
  },

]
