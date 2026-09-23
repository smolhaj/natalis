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

import { inSenderoZone, PE_LIMA } from './events_peru_midcentury.js'

// Presidents of Peru, by the year they took office. Read by the late
// reckoning so that the list a character recites stops at the year they are
// standing in: it was a fixed string ending in Castillo, and it fired from 2010.
const PE_PRESIDENTS = [
  [1968, 'Velasco'], [1975, 'Morales Bermúdez'], [1980, 'Belaúnde'], [1985, 'García'],
  [1990, 'Fujimori'], [2000, 'Paniagua'], [2001, 'Toledo'], [2006, 'García'],
  [2011, 'Humala'], [2016, 'Kuczynski'], [2018, 'Vizcarra'], [2020, 'Merino'],
  [2020, 'Sagasti'], [2021, 'Castillo'], [2022, 'Boluarte'],
]

const PERU_EVENTS = [

  // ── SENDERO LUMINOSO: HIGHLAND CHILDHOOD ─────────────────────────────────────

  {
    id: 'per_sendero_childhood',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.currentYear >= 1981 && G.currentYear <= 1992 &&
      (inSenderoZone(G) || PE_LIMA(G)) &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.per_sendero,
    text: (G) => {
      return inSenderoZone(G)
        ? 'The teachers stop coming to school. First one stops coming, then two, then the school is closed because someone burned the door and the army is in the plaza and people say the Senderistas were in the next village. Your parents speak in Quechua when they don\'t want you to understand. You understand some of what they\'re saying. The word they repeat is "runakuna" — the people — and another word for who is killing the people. You learn that the Shining Path kills teachers, community leaders, people who have accepted anything from the government. Your father is on the ronda campesina — the self-defense patrol. He comes home before dawn.'
        : 'The news from Ayacucho is that the Shining Path has executed the mayor and the two school teachers. The news has been this kind of news for two years. The army is also in Ayacucho and the army has also been executing people. Your parents talk about it as a distant problem. The distance is specifically geographic: the violence is in the highlands, among the indigenous population, in a language and a landscape that Lima does not think about very often.'
    },
    choices: null,
    effect: (p) => { p.m -= 12; p.h -= 4; p.r += 8; p.addFlag('per_sendero_generation'); p.setMem('per_sendero', true); },
  },

  // ── FUJIMORI'S AUTOGOLPE 1992 ────────────────────────────────────────────────

  {
    id: 'per_autogolpe_1992',
    phase: null,
    weight: 300,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.currentYear >= 1992 && G.currentYear <= 1992 &&
      G.age >= 14 &&
      !G.mem?.per_autogolpe && !G.mem?.per_fujimori_golpe,
    text: (G) => {
      const isWealthy = G.stats.wealth > 60
      return isWealthy
        ? 'April 5, 1992. Army tanks in front of the Congress building. Fujimori on national television at midnight dissolving Congress, suspending the judiciary, suspending the Constitution. The Shining Path is still active. The economy has had three-digit inflation. The political class that Congress represents has been failing for a decade. On the street in Miraflores, the reaction is complicated: many people approve. The Sendero has to be defeated. If the institutions were working, the autogolpe wouldn\'t have been possible. These sentences are both true and both are being used to justify something that has a different name in the countries that are watching from outside.'
        : 'April 5, 1992. Tanks in front of Congress. Fujimori on television. Two years ago nobody knew his name; he was the rector of the agrarian university, the son of immigrants from Kumamoto. He says the institutions have failed. He says he will rebuild them with emergency powers. In the highland provinces the response is similar to Lima: many people support him. Congress was not doing anything about the Shining Path. The question you are carrying is: what happens after the emergency powers.'
    },
    choices: null,
    effect: (p) => { p.e += 3; p.addFlag('per_fujimori_era'); p.setMem('per_autogolpe', true); p.setMem('per_fujimori_golpe', true); },
  },

  // ── THE STERILIZATION CAMPAIGN ────────────────────────────────────────────────

  {
    id: 'per_sterilization',
    phase: null,
    weight: 120,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1996 && G.currentYear <= 2000 &&
      G.ruralUrban === 'rural' &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.per_esterilizacion,
    text: 'The promotora from the health post comes to the village with a list. The program is called voluntary family planning. The word "voluntary" in the form means you sign or you don\'t receive the medication next time, or your child doesn\'t get vaccinated, or the child\'s papers get complicated. 270,000 women will be sterilized over four years, mostly Quechua-speaking, mostly without what the form calls informed consent. The doctor at the post explains the procedure in a language you partially understand. You are told to sign. What happens in the moment after you receive the form is something you will carry for decades.',
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
    phase: null,
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
    phase: null,
    weight: 200,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.currentYear >= 2000 && G.currentYear <= 2001 &&
      G.age >= 18 &&
      !G.mem?.per_vladi && !G.mem?.per_vladivideo,
    text: 'The tape is grainy and the sound is poor and it is a man counting fifteen thousand dollars onto a table for a congressman who takes it. Then there is another tape, and by December there are thousands of them, because he filmed everything he ever did. Judges, generals, the men who own the television channels. The president leaves for Japan by way of Brunei and sends his resignation by fax. His own minister accepts it by fax, and that is how the decade ends.',
    context: 'Vladimiro Montesinos, head of Peru\'s intelligence service under Alberto Fujimori, secretly videotaped his own bribery of politicians, judges, officers and media owners. The first tape was broadcast in September 2000. Fujimori fled to Japan in November and faxed his resignation from Tokyo; Congress rejected it and removed him for moral incapacity instead. Both men were later convicted and imprisoned.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 6; p.addFlag('per_postfujimori_generation'); p.setMem('per_vladi', true); p.setMem('per_vladivideo', true); },
  },

  // ── TRUTH COMMISSION ─────────────────────────────────────────────────────────

  {
    id: 'per_cvr',
    phase: null,
    weight: 150,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.currentYear >= 2003 && G.currentYear <= 2005 &&
      G.age >= 20 &&
      (G.flags.has('per_sendero_generation') || G.flags.has('per_sterilization_survivor') ||
        G.flags.has('pe_desaparecido_family') || G.flags.has('pe_desplazado') ||
        G.flags.has('pe_sendero_assembly') || G.flags.has('pe_rondero')) &&
      !G.mem?.per_cvr,
    text: (G) => {
      const isVictim = G.flags.has('per_sterilization_survivor')
      if (G.flags.has('pe_desaparecido_family')) return 'The Commission comes to Huamanga and sits at a long table in a hall, and the hearings are on the radio, in Quechua with a translator. The women from the association go in one at a time with their photographs. The final report says 69,280, and says that three of every four of them spoke Quechua, and says it in a language most of them did not read. He is in it as a line in an annex: a name, a date, a place, and the words presumed dead.'
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
    phase: null,
    weight: 60,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.currentYear >= 2011 && G.currentYear <= 2022 &&
      G.age >= 25 &&
      (G.flags.has('per_fujimori_era') || G.flags.has('per_sendero_generation') || G.flags.has('per_sterilization_survivor')) &&
      !G.mem?.per_keiko,
    text: (G) => {
      const lost = G.currentYear >= 2021
        ? 'She has lost three runoffs: in 2011 by five points, in 2016 by forty-one thousand votes, in 2021 by forty-four thousand. The third time she said fraud, and the fraud was not found.'
        : G.currentYear >= 2016
          ? 'She has lost two runoffs: in 2011 by five points, in 2016 by forty-one thousand votes out of seventeen million.'
          : 'She lost the runoff in 2011 by five points, to a former army officer who had once led a garrison uprising against her father.'
      return `Keiko Fujimori, the daughter, is on the ballot. ${lost} The country is split on what the Fujimori name means: the decade of economic stability and Sendero defeated on one side; the autogolpe, the sterilizations, the vladivideos on the other. The split runs straight through families, straight through the highland-coast divide, straight through whatever you believe about what the 1990s actually were.`
    },
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
          : `Peru's history in your lifetime: ${PE_PRESIDENTS.filter(([y]) => y >= (G.character?.birthYear ?? 0) + 8 && y <= G.currentYear).map(([, n]) => n).join(', ')}. Each name is a crisis. The pattern under the names is the same crisis repeating.`
    },
    choices: null,
    effect: (p) => { p.r += 5; p.addFlag('per_testigo_generation'); p.setMem('per_reckoning', true); },
  },

]

export default PERU_EVENTS
