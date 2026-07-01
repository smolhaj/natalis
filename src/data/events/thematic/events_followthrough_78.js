// events_followthrough_78.js
// Follow-through events for Argentina depth (events_argentina_depth.js)

export const FOLLOWTHROUGH_78_EVENTS = [

  // ── PERONIST GENERATION FOLLOW-THROUGHS ──────────────────────────────────

  {
    id: 'ft78_peronist_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('arg_peronist_generation') &&
      G.currentYear >= 1975 &&
      G.age >= 50 &&
      !G.mem?.ft78PeronistLate,
    text: 'Perón died in 1974. His widow, Isabelita, lasted two years before the coup. The movement he created — Peronism — has managed to be simultaneously the labour movement, the populist right, the Kirchnerite left, and the Menemite neoliberalism, all calling themselves by the same name. You have been a Peronist for your whole life and what that name means has changed so many times that the consistency is more in the name than in the content. You still call yourself a Peronist. The question is which one.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.e += 3
      p.setMem('ft78PeronistLate', true)
    },
  },

  {
    id: 'ft78_evita_death',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('arg_peronist_generation') &&
      G.currentYear >= 1952 && G.currentYear <= 1956 &&
      G.age >= 16 &&
      !G.mem?.ft78EvitaDeath,
    text: 'July 26, 1952. Eva Perón dies at thirty-three of cervical cancer. The state of mourning runs two weeks. The radio announces it. The queues at the Ministry of Labour to view the body run days. The embalming: she is preserved by a Spanish doctor, Pedro Ara, in a process that takes a year. Then the coup comes in 1955 and the military hides the body for sixteen years — they steal it, afraid even of a corpse. The body\'s location is a state secret until 1971. You do not know where she is. The country does not know where she is.',
    choices: null,
    effect: (p) => {
      p.m -= 7
      p.r += 6
      p.setMem('ft78EvitaDeath', true)
    },
  },

  // ── MALVINAS CONSCRIPT FOLLOW-THROUGHS ────────────────────────────────────

  {
    id: 'ft78_malvinas_return',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('arg_malvinas_conscript') &&
      G.currentYear >= 1982 && G.currentYear <= 1990 &&
      G.age >= 20 &&
      !G.mem?.ft78MalvinasReturn,
    text: 'The airport is not what you expected. No parade. No ceremony. The defeat is too fresh for the country to look at the veterans directly — looking at the veterans means looking at the defeat, and the defeat means looking at the junta, and the junta is in the process of falling. You come home and the home is the same home but the country around it is in the middle of something large that happened partly because you were in the Malvinas. You don\'t know how to fit yourself into that sentence.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 7
      p.h -= 3
      p.setMem('ft78MalvinasReturn', true)
    },
  },

  {
    id: 'ft78_malvinas_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('arg_malvinas_conscript') &&
      G.currentYear >= 2000 &&
      G.age >= 45 &&
      !G.mem?.ft78MalvinasLate,
    text: 'The veterans\' associations count the suicides. More Argentine veterans have died by suicide since 1982 than died in the war itself. The number is not official. It is kept by the veterans who are left. The war lasted 74 days. The aftermath has lasted decades. The islands are still called the Malvinas in Argentina, still considered Argentine in the constitution, still a grievance that political parties invoke when they need one. You were there for 74 days. You have been coming back from those 74 days for the rest of your life.',
    choices: null,
    effect: (p) => {
      p.r += 8
      p.m -= 5
      p.h -= 2
      p.setMem('ft78MalvinasLate', true)
    },
  },

  // ── BUENOS AIRES CULTURE FOLLOW-THROUGHS ─────────────────────────────────

  {
    id: 'ft78_analysis_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('arg_buenos_aires_culture') &&
      G.currentYear >= 1985 &&
      G.age >= 50 &&
      !G.mem?.ft78AnalysisLate,
    text: 'Decades of analysis. You are a different kind of not-fine than you were at the beginning. The analyst you started with retired; the next one emigrated during the crisis; the current one is thirty years younger than you. What the couch has given you: the ability to name something slightly faster than you could before, the knowledge of where certain things come from, the habit of asking why you did what you did instead of just doing it. What it has not given you: the absence of difficulty. Nobody said it would. You just hoped.',
    choices: null,
    effect: (p) => {
      p.m += 3
      p.e += 4
      p.r += 4
      p.setMem('ft78AnalysisLate', true)
    },
  },

  // ── AMIA FOLLOW-THROUGH ───────────────────────────────────────────────────

  {
    id: 'ft78_amia_impunity',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('arg_amia_generation') &&
      G.currentYear >= 2010 &&
      G.age >= 35 &&
      !G.mem?.ft78AMIAImpunity,
    text: 'The case is still open. Thirty years later, no one has been convicted in an Argentine court. The investigation has implicated Iranian officials, then been dropped, then reopened, then become the subject of a prosecutor found dead in his apartment hours before he was due to testify to congress — Alberto Nisman, 2015. The 85 dead have the specific indignity of remaining victims of an unsolved crime in the jurisdiction where they were killed. Justice delayed is a phrase that gets used. You have lived inside the delay.',
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 7
      p.karma += 4
      p.setMem('ft78AMIAImpunity', true)
    },
  },

  // ── HYPERINFLATION FOLLOW-THROUGH ─────────────────────────────────────────

  {
    id: 'ft78_inflation_returns',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('arg_hyperinflation_1989') &&
      G.currentYear >= 2020 &&
      G.age >= 50 &&
      !G.mem?.ft78InflationReturns,
    text: 'The inflation is back. Not 3,000 percent but 100 percent annually, then 200, then the central bank counting in thousands of pesos for things that used to cost tens. You have been here. Your body knows the calculation — the quick buy before the price changes, the dollar holding, the savings in a mattress because a bank account is a form of hope you have learned not to trust. The young people around you are learning this for the first time. You learned it in 1989 and the learning is in the body.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 7
      p.e += 2
      p.setMem('ft78InflationReturns', true)
    },
  },

  // ── KIRCHNER TRIALS FOLLOW-THROUGH ───────────────────────────────────────

  {
    id: 'ft78_trials_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('arg_kirchner_trials_generation') &&
      G.currentYear >= 2015 &&
      G.age >= 45 &&
      !G.mem?.ft78TrialsReckoning,
    text: 'The trials have produced convictions. More than a thousand former officers and collaborators have been sentenced. The Mothers who walked in circles since 1977 have lived to see some of this. Some of them are dead now. The human rights organisations they built continue. The argument in Argentina is about whether the memory of the dictatorship should be permanent or whether it should give way to something else. You do not have trouble with this argument. The people who argue for giving way were not among the disappeared.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.karma += 5
      p.r += 4
      p.setMem('ft78TrialsReckoning', true)
    },
  },

]
