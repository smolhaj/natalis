// Peru arc events
//
// Peru's story across the 20th–21st centuries:
//  — The Shining Path (Sendero Luminoso) begins 1980 in Ayacucho, founded
//    by philosophy professor Abimael Guzmán. Maoist people's war. Targets
//    anyone connected to the state: teachers, local officials, members of
//    other left parties, village water committees. The army responds with
//    massacres. 69,000 dead by 1992; the Truth Commission later found 75%
//    of victims were Quechua-speaking — invisible to Lima.
//  — Alberto Fujimori elected 1990 on anti-elite platform. 1992 autogolpe:
//    dissolves Congress and the judiciary with army tanks in the street.
//    Congress has been meeting under emergency powers for years anyway.
//    New constitution 1993 approved by referendum with 52%.
//  — Guzmán captured September 12 1992. Photographed in prison stripes,
//    denying the revolution. Sendero collapses without its mythology.
//  — Sterilization campaign 1996–2000: 270,000 women sterilized, mostly
//    Quechua-speaking indigenous women in rural highlands, under program
//    officially framed as voluntary family planning. Cases documented of
//    coercion in government health posts: "sign or no treatment."
//  — Vladivideo scandal 2000: Vladimiro Montesinos (Fujimori's intelligence
//    chief) caught on video bribing opposition congressman. Videos surface
//    showing Congress members, judges, media owners, military officers —
//    the bribery infrastructure of Fujimorismo made visible. Fujimori
//    flees to Japan and faxes his resignation. He is later extradited.
//  — Truth and Reconciliation Commission (CVR) 2001–2003: 69,000 dead.
//    The highland majority invisible in the national accounting.
//  — Post-2000: the Lima vs. province divide continues. Regionalist
//    presidents (Toledo, Humala) promise highland inclusion. Implementation
//    is slower. The anti-Lima resentment crystallises into political force.
//  — Keiko Fujimori runs three times for president (2011, 2016, 2021),
//    loses by small margins each time, cries fraud each time.
//  — 2023: Pedro Castillo (ex-school teacher from the highlands) impeached
//    after attempting autogolpe. Six people killed in resulting protests.
//    Another cycle of the same crisis.

const PERU_EVENTS = [

  // ── SENDERO LUMINOSO: HIGHLAND CHILDHOOD ─────────────────────────────────────

  {
    id: 'per_sendero_childhood',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.currentYear >= 1981 && G.currentYear <= 1992 &&
      G.ruralUrban === 'rural' &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.per_sendero,
    text: (G) => {
      const isIndigenous = G.ethnicity?.includes('quechua') || G.ethnicity?.includes('aymara') || G.ethnicity?.includes('indigenous')
      return isIndigenous
        ? 'The teachers stop coming to school. First one stops coming, then two, then the school is closed because someone burned the door and the army is in the plaza and people say the Senderistas were in the next village. Your parents speak in Quechua when they don\'t want you to understand. You understand some of what they\'re saying. The word they repeat is "runakuna" — the people — and another word for who is killing the people. You learn that the Shining Path kills teachers, community leaders, people who have accepted anything from the government. Your father is on the ronda campesina — the self-defense patrol. He comes home before dawn.'
        : 'The news from Ayacucho is that the Shining Path has executed the mayor and the two school teachers. The news has been this kind of news for two years. The army is also in Ayacucho and the army has also been executing people. Your parents in Lima talk about it as a distant problem. The distance is specifically geographic: the violence is in the highlands, among the indigenous population, in a language and a landscape that Lima does not think about very often.'
    },
    choices: null,
    effect: (p) => { p.m -= 12; p.h -= 4; p.r += 8; p.addFlag('per_sendero_generation'); p.setMem('per_sendero', true); },
  },

  // ── FUJIMORI'S AUTOGOLPE 1992 ────────────────────────────────────────────────

  {
    id: 'per_autogolpe_1992',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.currentYear >= 1992 && G.currentYear <= 1992 &&
      G.age >= 14 &&
      !G.mem?.per_autogolpe,
    text: (G) => {
      const isWealthy = G.stats.wealth > 60
      return isWealthy
        ? 'April 5, 1992. Army tanks in front of the Congress building. Fujimori on national television at midnight dissolving Congress, suspending the judiciary, suspending the Constitution. The Shining Path is still active. The economy has had three-digit inflation. The political class that Congress represents has been failing for a decade. On the street in Miraflores, the reaction is complicated: many people approve. The Sendero has to be defeated. If the institutions were working, the autogolpe wouldn\'t have been possible. These sentences are both true and both are being used to justify something that has a different name in the countries that are watching from outside.'
        : 'April 5, 1992. Tanks in front of Congress. Fujimori on television. He is from Ayacucho — where the war started. He says the institutions have failed. He says he will rebuild them with emergency powers. In the highland provinces the response is similar to Lima: many people support him. Congress was not doing anything about the Shining Path. The question you are carrying is: what happens after the emergency powers.'
    },
    choices: null,
    effect: (p) => { p.e += 3; p.addFlag('per_fujimori_era'); p.setMem('per_autogolpe', true); },
  },

  // ── THE STERILIZATION CAMPAIGN ────────────────────────────────────────────────

  {
    id: 'per_sterilization',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1996 && G.currentYear <= 2000 &&
      G.ruralUrban === 'rural' &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.per_esterilizacion,
    text: 'The promotora from the health post comes to the village with a list. The program is called voluntary family planning. The word "voluntary" in the form means you sign or you don\'t receive the medication next time, or your child doesn\'t get vaccinated, or the school records get complicated. 270,000 women will be sterilized over four years, mostly Quechua-speaking, mostly without what the form calls informed consent. The doctor at the post explains the procedure in a language you partially understand. You are told to sign. What happens in the moment after you receive the form is something you will carry for decades.',
    choices: [
      {
        text: 'You sign. The alternatives are not explained as alternatives.',
        tag: null,
        outcome: 'What was done to you is documented in the CVR — the Truth Commission — but the accounting is still incomplete. The case file exists. It does not resolve what the procedure ended.',
        effect: (p) => { p.m -= 25; p.h -= 10; p.r += 15; p.karma += 5; p.addFlag('per_sterilization_survivor'); p.setMem('per_esterilizacion', true); },
      },
      {
        text: 'You refuse. What the refusal costs is specific and ongoing.',
        tag: null,
        outcome: 'The health post becomes a complicated place. The specific form of difficulty a rural woman in the 1990s faces when she refuses what the government health worker has told her to do.',
        effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('per_fujimori_era'); p.setMem('per_esterilizacion', true); },
      },
    ],
    effect: null,
  },

  // ── LIMA DIVIDE: THE CHOLO/SERRANO QUESTION ──────────────────────────────────

  {
    id: 'per_lima_racism',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.currentYear >= 1985 && G.currentYear <= 2010 &&
      G.ruralUrban === 'urban' &&
      (G.ethnicity?.includes('quechua') || G.ethnicity?.includes('indigenous') || G.ethnicity?.includes('mestizo')) &&
      G.age >= 16 && G.age <= 35 &&
      !G.mem?.per_lima_racism,
    text: 'Lima is a city of nine million that has been receiving people from the sierra for fifty years. You came, or your parents came, or your grandparents came. The word "serrano" is an adjective that describes where you are from and carries everything Lima thinks about the place. "Cholo" is another word. In certain mouths both words are neutral. In certain offices and certain conversations neither word is neutral. You navigate the distinction between the city that received you and the city that sees you, and the gap between them is the daily education.',
    choices: [
      {
        text: 'You learn Lima\'s grammar and move through it strategically.',
        tag: null,
        outcome: 'The navigation is real and requires energy. What it costs is not visible to the people you navigate among.',
        effect: (p) => { p.e += 4; p.s += 4; p.addFlag('per_lima_migrant'); p.setMem('per_lima_racism', true); },
      },
      {
        text: 'You hold the identity from home. It is the one that is actually yours.',
        tag: null,
        outcome: 'Holding the identity has its costs. The costs are the price of being visible as yourself in a city that has opinions about where you\'re from.',
        effect: (p) => { p.m -= 6; p.r += 5; p.karma += 4; p.addFlag('per_lima_migrant'); p.setMem('per_lima_racism', true); },
      },
    ],
    effect: null,
  },

  // ── VLADIVIDEO AND THE COLLAPSE ──────────────────────────────────────────────

  {
    id: 'per_vladivideo',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.currentYear >= 2000 && G.currentYear <= 2001 &&
      G.age >= 18 &&
      !G.mem?.per_vladi,
    text: 'September 2000. The video: Vladimiro Montesinos, head of the SIN — the intelligence service — handing $15,000 in cash to an opposition congressman, on tape, while they discuss the price. Then another tape. Then another. Eventually there are thousands of videos. Judges being paid. Military officers being paid. Television executives being paid. The entire bribery infrastructure of the Fujimori system on tape, because Montesinos taped everything. Fujimori flees to Japan via Brunei. He faxes his resignation from Tokyo. His minister accepts it by fax. That is how the decade ends.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 6; p.addFlag('per_postfujimori_generation'); p.setMem('per_vladi', true); },
  },

  // ── TRUTH COMMISSION ─────────────────────────────────────────────────────────

  {
    id: 'per_cvr',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.currentYear >= 2003 && G.currentYear <= 2005 &&
      G.age >= 20 &&
      (G.flags.has('per_sendero_generation') || G.flags.has('per_sterilization_survivor')) &&
      !G.mem?.per_cvr,
    text: (G) => {
      const isVictim = G.flags.has('per_sterilization_survivor')
      return isVictim
        ? 'The CVR — Comisión de la Verdad y Reconciliación — takes testimony. 69,000 dead. 75% Quechua-speaking. The sterilization campaign. The cases accumulate. The cases exist now in a document. The document does not give back what the procedure ended. But the document exists, which is more than the people who gave the orders planned for.'
        : 'The Truth Commission publishes its final report. 69,000 dead, 75% indigenous. The report finds the Shining Path responsible for 54% of deaths and the Peruvian security forces responsible for 32%. Both numbers. The Lima press reports the numbers with less interest than the international press. The people for whom the numbers are names have been waiting for this document for twenty years.'
    },
    choices: [
      {
        text: 'You give testimony. The saying of it is separate from what is done with it.',
        tag: null,
        outcome: 'The record exists. The case file is part of the national accounting. What happens to the accounting is a longer-term question.',
        effect: (p) => { p.karma += 8; p.r -= 3; p.addFlag('per_cvr_witness'); p.setMem('per_cvr', true); },
      },
      {
        text: 'You do not testify. There is no version of saying it that resolves what happened.',
        tag: null,
        outcome: 'The silence is yours to have. The things that happened in those years are in the report anyway — the pattern, the numbers, the official account. The specific thing is still yours.',
        effect: (p) => { p.r += 6; p.addFlag('per_cvr_witness'); p.setMem('per_cvr', true); },
      },
    ],
    effect: null,
  },

  // ── THE KEIKO CYCLES ─────────────────────────────────────────────────────────

  {
    id: 'per_keiko_generation',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.currentYear >= 2011 && G.currentYear <= 2022 &&
      G.age >= 25 &&
      (G.flags.has('per_fujimori_era') || G.flags.has('per_sendero_generation') || G.flags.has('per_sterilization_survivor')) &&
      !G.mem?.per_keiko,
    text: 'Keiko Fujimori, the daughter, has run for president three times. She lost in 2011 (51.4% vs 48.5%). She lost in 2016 (51.1% vs 48.8%). She lost in 2021 (50.1% vs 49.8%). Each time she cried fraud. Each time the fraud was not found. The country is split on what the Fujimori name means: the decade of economic stability and Sendero defeated on one side; the autogolpe, the sterilizations, the vladivideos on the other. The split runs straight through families, straight through the highland-coast divide, straight through whatever you believe about what the 1990s actually were.',
    choices: null,
    effect: (p) => { p.r += 5; p.addFlag('per_keiko_era'); p.setMem('per_keiko', true); },
  },

  // ── LATE RECKONING ────────────────────────────────────────────────────────────

  {
    id: 'per_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.currentYear >= 2010 &&
      G.age >= 55 &&
      (G.flags.has('per_sendero_generation') || G.flags.has('per_fujimori_era') || G.flags.has('per_sterilization_survivor')) &&
      !G.mem?.per_reckoning,
    text: (G) => {
      const isVictim = G.flags.has('per_sterilization_survivor')
      const isHighland = G.ruralUrban === 'rural'
      return isVictim
        ? 'You are one of the 270,000. That number exists in the CVR report and in the cases that are still open and in the specific knowledge of your body. The justice has been partial. The accountability has been partial. The Fujimori name is still on the ballot. You are still here, which is the other partial fact.'
        : isHighland
          ? 'The Shining Path came from the highlands and killed mostly highland people and the state responded by killing highland people and the Truth Commission named it: 69,000 dead, 75% Quechua-speaking. You were inside the 75% or you were adjacent to it. The accounting took twenty years and is still being debated in Lima as though it happened somewhere else.'
          : 'Peru\'s history in your lifetime: Velasco, Morales Bermúdez, Belaúnde, García, Fujimori, Paniagua, Toledo, García, Humala, Kuczynski, Vizcarra, Merino, Sagasti, Castillo. Each name is a crisis. The country has had eight presidents in eight years. The pattern under the names is the same crisis repeating.'
    },
    choices: null,
    effect: (p) => { p.r += 5; p.addFlag('per_testigo_generation'); p.setMem('per_reckoning', true); },
  },

]

export default PERU_EVENTS
