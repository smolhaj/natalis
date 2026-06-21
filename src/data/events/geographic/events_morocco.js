// BUILD 55 — Morocco arc
// Hassan II 1961–99: Years of Lead (Années de Plomb) — political detention, disappearances,
// the coup attempts of 1971 and 1972. Amazigh (Berber) language and culture officially
// suppressed until 2011; one-third of Moroccans are Amazigh.
// France/Spain: the emigration dream. The Strait of Gibraltar, 14km wide.
// Arabic/French/Amazigh/Darija: a country of four linguistic registers whose mastery
// determines which rooms you can enter.

const IS_MOROCCO = (G) => G.character.country?.name === 'Morocco'
const IS_AMAZIGH = (G) => G.character.ethnicity === 'amazigh_moroccan' || G.character.ethnicity === 'berber'

export const MOROCCO_EVENTS = [

  // ── FOLLOW-THROUGHS (written first) ──────────────────────────────────────

  {
    id: 'mor_years_of_lead_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('years_of_lead_generation') && G.age >= 40 && !G.mem.morLeadEcho,
    text: 'The Equity and Reconciliation Commission has published its report. The number of cases: 9,779 confirmed. The reparations process has begun. The king has apologised, in the formal language of institutional acknowledgment. You think about the people who did not live to receive an apology. The commission does not name individuals who gave orders.',
    effect: (p) => { p.m -= 4; p.setMem('morLeadEcho', true) },
  },

  {
    id: 'mor_amazigh_recognition',
    phase: 'midlife',
    weight: 3,
    when: (G) => IS_AMAZIGH(G) && IS_MOROCCO(G) && G.currentYear >= 2011 && G.currentYear <= 2016 && !G.mem.morAmazighRec,
    text: 'The 2011 constitution recognises Amazigh as an official language. Tifinagh script on government signage. Your grandmother\'s language on the same board as Arabic and French. She lived eighty-two years in a country that treated her language as folklore. You consider what it means that the recognition comes now, in this form, at this time — the Arab Spring is outside, and the makhzen is negotiating its survival.',
    choices: [
      {
        text: 'The recognition is real, whatever the motive.',
        tag: 'accepts',
        outcome: 'Your niece is learning Tifinagh in school. Something that didn\'t exist for your generation exists for hers. This is worth something.',
        effect: (p) => { p.m += 8; p.addFlag('amazigh_recognition_era'); p.setMem('morAmazighRec', true) },
      },
      {
        text: 'A constitutional clause without funding or teachers is performance.',
        tag: 'sceptical',
        outcome: 'The schools still teach in Arabic and French. The economy still rewards French. The clause exists. You watch to see what it does.',
        effect: (p) => { p.m += 3; p.addFlag('amazigh_recognition_era'); p.setMem('morAmazighRec', true) },
      },
    ],
  },

  {
    id: 'mor_diaspora_late',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('moroccan_diaspora') && G.age >= 62 && !G.mem.morDiasLate,
    text: 'You have been in France for forty years. Your Darija is the Darija of someone who left in 1978, which is now the Darija of no one who stayed. Your grandchildren speak French and some Arabic and no Amazigh at all. When you go back, Marrakech is full of European tourists and the medina has been renovated for them and your cousins\' children are renting out their apartments on platforms their parents cannot operate.',
    effect: (p) => { p.m -= 5; p.setMem('morDiasLate', true) },
  },

  // ── AMAZIGH IDENTITY ──────────────────────────────────────────────────────

  {
    id: 'mor_amazigh_school',
    phase: 'childhood',
    weight: 4,
    when: (G) => IS_AMAZIGH(G) && IS_MOROCCO(G) && G.currentYear <= 2003 && G.age >= 6 && G.age <= 12 && !G.mem.morAmazighSchool,
    text: 'At school everything is in Arabic. Your family speaks Tamazight — or Tachelhit, or Tarifit, depending on the region. These are not on the blackboard. The teacher uses Modern Standard Arabic, which is not the Arabic of the street either. You are learning to read and write in two languages that are not the language you speak at home. You pass.',
    effect: (p) => { p.m -= 6; p.e += 2; p.addFlag('amazigh_identity'); p.setMem('morAmazighSchool', true) },
  },

  {
    id: 'mor_amazigh_name',
    phase: 'childhood',
    weight: 3,
    when: (G) => IS_AMAZIGH(G) && IS_MOROCCO(G) && G.currentYear <= 1996 && G.age >= 6 && G.age <= 14 && !G.mem.morAmazighName,
    text: 'The civil registrar refused your cousin\'s name. Amazigh names were not on the approved list until 1996 — you had to have an Arab-Islamic name, or a name from the French list, or a name that sounded ambiguous enough. Your aunt renamed her son on the way out of the office and gave him his real name at home. He has two names. Most people in the High Atlas have two names.',
    effect: (p) => { p.m -= 5; p.addFlag('amazigh_identity'); p.addFlag('double_consciousness'); p.setMem('morAmazighName', true) },
  },

  // ── YEARS OF LEAD ─────────────────────────────────────────────────────────

  {
    id: 'mor_years_of_lead',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_MOROCCO(G) && G.currentYear >= 1965 && G.currentYear <= 1989 && G.stats.smarts >= 55 && G.age >= 16 && G.age <= 30 && !G.mem.morYearsLead,
    text: 'The student protests of 1965 ended with Hassan II\'s tanks in the streets of Casablanca. Hundreds dead; the number was never official. The students who disappeared went to Derb Moulay Cherif or Kenitra prison. The years called the Années de Plomb. You navigate the university — which has leftists, which has Islamists, which has government informers, which has all three simultaneously — and you learn the politics of the room before you speak.',
    choices: [
      {
        text: 'Stay away from politics. Study and leave.',
        tag: 'withdrew',
        outcome: 'You graduate. You get to France or Canada or the Gulf. You write to friends who stayed and didn\'t withdraw.',
        effect: (p) => { p.m -= 5; p.addFlag('years_of_lead_generation'); p.addFlag('learned_silence'); p.setMem('morYearsLead', true) },
      },
      {
        text: 'Participate quietly. The risk is worth it.',
        tag: 'participated',
        outcome: 'You attend meetings, pass pamphlets, know what is said and by whom. Two people you know spend time at Derb Moulay Cherif. You are not among them. Whether this is luck or calculation, you are not certain.',
        effect: (p) => { p.m += 3; p.karma += 5; p.addFlag('years_of_lead_generation'); p.addFlag('political_active'); p.setMem('morYearsLead', true) },
      },
    ],
  },

  // ── EMIGRATION ────────────────────────────────────────────────────────────

  {
    id: 'mor_strait_decision',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_MOROCCO(G) && G.age >= 18 && G.age <= 32 && !G.mem.morStraitDecision,
    text: 'On a clear day from Tangier you can see Spain. Fourteen kilometres. The boats that make the crossing are not designed for fourteen kilometres of open Atlantic — they are designed for a calm day, which is not always what the Strait offers. Thousands cross this way each year. Hundreds die each year. The official route requires a visa which requires a bank statement which requires a job which requires the visa. You consider the options.',
    choices: [
      {
        text: 'Apply for the visa through official channels.',
        tag: 'official',
        outcome: 'The application takes fourteen months. The refusal arrives in an envelope from the consulate. You apply again.',
        effect: (p) => { p.m -= 8; p.setMem('morStraitDecision', true) },
      },
      {
        text: 'Cross. You know someone who knows the captain.',
        tag: 'crossed',
        outcome: 'The crossing takes three hours and you spend them very still. You arrive. The first six months are the hardest six months of your life.',
        effect: (p) => { p.m -= 15; p.h -= 5; p.addFlag('moroccan_diaspora'); p.addFlag('emigrated'); p.setResidency('undocumented'); p.setMem('morStraitDecision', true) },
      },
      {
        text: 'Stay. The other side is not what people say.',
        tag: 'stayed',
        outcome: 'Some who went came back. The money they brought back didn\'t stay long. You build something here that is yours, even if it is smaller.',
        effect: (p) => { p.m -= 3; p.addFlag('stayed_behind'); p.setMem('morStraitDecision', true) },
      },
    ],
  },

  // ── LANGUAGE AS REGISTER ──────────────────────────────────────────────────

  {
    id: 'mor_language_register',
    phase: 'young_adult',
    weight: 3,
    when: (G) => IS_MOROCCO(G) && G.age >= 18 && G.age <= 28 && !G.mem.morLangRegister,
    text: 'A job interview. The position requires French. Your French is good — you have been educated in it — but it is not native, and native is what the interviewer is hearing for. The other candidate\'s mother tongue is French; his grandfather went to the same lycée as the interviewer\'s grandfather. This is the architecture of it: not a wall but a gradient, measurable in the vowels you did not learn at three years old.',
    choices: [
      {
        text: 'Present yourself in the French you have.',
        tag: 'presented',
        outcome: 'You are not hired for this job. The French you have is sufficient for the next one. The gradient remains.',
        effect: (p) => { p.m -= 6; p.e += 2; p.setMem('morLangRegister', true) },
      },
      {
        text: 'Decide the gradient is the problem, not you.',
        tag: 'reframed',
        outcome: 'You speak three languages and navigate four registers. The person who got the job speaks one fluently and considers this normal.',
        effect: (p) => { p.m -= 2; p.karma += 4; p.setMem('morLangRegister', true) },
      },
    ],
  },
]
