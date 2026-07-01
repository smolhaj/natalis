// events_followthrough_82.js — Spain depth arc follow-throughs

export const FOLLOWTHROUGH_82_EVENTS = [

  // ── spain_rojo_family ─────────────────────────────────────────────────────

  {
    id: 'ft82_rojo_family_document',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('spain_rojo_family') &&
      G.currentYear >= 1975 && G.currentYear <= 2000 &&
      G.age >= 30 &&
      !G.mem?.ft82RojoDocument,
    text: 'The archives open slowly after 1975. The military records, the prison registers, the civil war casualty lists that the Franco regime kept and that the democratic state inherits. You look for the specific name. The name appears in a record: the sentence, the classification, the date. The date of execution or the date of release. The document converts the family silence into a fact you can hold. The fact is worse and better than the silence simultaneously.',
    choices: null,
    effect: (p) => {
      p.r += 7
      p.m -= 4
      p.e += 3
      p.setMem('ft82RojoDocument', true)
    },
  },

  {
    id: 'ft82_rojo_transition',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('spain_rojo_family') &&
      G.flags.has('transicion_generation') &&
      G.currentYear >= 1977 && G.currentYear <= 1985 &&
      G.age >= 25 &&
      !G.mem?.ft82RojoTransicion,
    text: 'The Amnesty Law of 1977 frees the political prisoners and also frees those who imprisoned them. The Pacto del Olvido that structures the transition: your family\'s loss is part of what is being forgotten. The transition requires the forgetting and produces the democracy. You live inside the trade-off: the democracy is real and it was purchased partly with your right to know what happened and who did it.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 3
      p.setMem('ft82RojoTransicion', true)
    },
  },

  // ── spain_anti_franco_cell ────────────────────────────────────────────────

  {
    id: 'ft82_anti_franco_1977',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('spain_anti_franco_cell') &&
      G.currentYear >= 1977 && G.currentYear <= 1982 &&
      G.age >= 25 &&
      !G.mem?.ft82AntiFranco77,
    text: 'The first democratic elections in forty years: June 15, 1977. The CCOO and the workers\' organizations you were part of are now legal. The meetings that required careful organization in apartments are now in union halls with your name on a membership card. The difference between the clandestine and the legal versions of the same organization contains the entire meaning of what the transition was. You vote. The vote is legal. This is what you were in the apartment for.',
    choices: null,
    effect: (p) => {
      p.m += 8
      p.karma += 4
      p.setMem('ft82AntiFranco77', true)
    },
  },

  {
    id: 'ft82_anti_franco_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('spain_anti_franco_cell') &&
      G.currentYear >= 2000 &&
      G.age >= 55 &&
      !G.mem?.ft82AntiFrancoLate,
    text: 'The young people ask about the Franco years with the specific curiosity of people who did not live inside them. You have the answer. The answer has the texture of experience rather than history: the cold apartment, the sound of the specific knock, the names you learned not to say in certain company. You are a source rather than a reader of the history. The position is strange and satisfying.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m += 3
      p.setMem('ft82AntiFrancoLate', true)
    },
  },

  // ── spain_chabola_childhood ───────────────────────────────────────────────

  {
    id: 'ft82_chabola_apartment',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('spain_chabola_childhood') &&
      G.currentYear >= 1965 && G.currentYear <= 1985 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.ft82ChabolaApartment,
    text: 'The apartment. Not in the barraca now — in a flat in a block built by the Plan de Viviendas: six floors, two-bedroom, the elevator sometimes working. The apartment is the family\'s arrival. It has an address that allows you to register for work. The address is in a neighbourhood that has other people like you: the block is full of the same migration, the same origin, the same wager on the north. The barraca is torn down. The neighbourhood is still there.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.w += 4
      p.setMem('ft82ChabolaApartment', true)
    },
  },

  {
    id: 'ft82_chabola_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('spain_chabola_childhood') &&
      G.currentYear >= 1990 &&
      G.age >= 55 &&
      !G.mem?.ft82ChabolaLate,
    text: 'The neighbourhood where the barraca was is now something else: apartments, a market, a park. The transformation happened slowly and then all at once. You walk through it sometimes. Nothing you can identify as the specific thing that was there remains. The social elevator: your children went to university, which is what the wager was for. The wager paid off. The barraca is gone and its children are graduates and this is the intended outcome of the migration that felt, at the time, like pure risk.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m += 3
      p.setMem('ft82ChabolaLate', true)
    },
  },

  // ── spain_carrero_blanco_lived ────────────────────────────────────────────

  {
    id: 'ft82_carrero_transition',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('spain_carrero_blanco_lived') &&
      G.currentYear >= 1975 && G.currentYear <= 1980 &&
      G.age >= 25 &&
      !G.mem?.ft82CarreroTransition,
    text: 'Franco dies on November 20, 1975 — two years after Carrero Blanco. The transition that follows is the transition that Carrero Blanco would have prevented. Whether ETA\'s calculation was correct — whether a bomb in a Madrid street in 1973 produced a better Spain in 1978 — is the kind of consequentialist question that has a specific answer and does not resolve the moral question. The transition happens. The person who would have prevented it is dead. Both of these are facts.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft82CarreroTransition', true)
    },
  },

  // ── spain_amnesia_pact ────────────────────────────────────────────────────

  {
    id: 'ft82_amnesia_historical_memory',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('spain_amnesia_pact') &&
      G.currentYear >= 2007 &&
      G.age >= 50 &&
      !G.mem?.ft82AmnesiaMemory,
    text: '2007: the Ley de Memoria Histórica under Zapatero. 2022: the Ley de Memoria Democrática under Sánchez, which goes further — creating a public bank of DNA for exhumations, revoking Franco\'s honours, removing the remaining Francoist symbols from public space. The PP votes against both laws. The amnesia pact of 1977 held for thirty years; what replaced it is contested by exactly the parties whose ancestors were protected by the pact. The argument about memory and justice and the transition is the argument Spain has been having since 1977 and is still having.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft82AmnesiaMemory', true)
    },
  },

  // ── spain_ley_peligrosidad_survived ──────────────────────────────────────

  {
    id: 'ft82_peligrosidad_transition',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('spain_ley_peligrosidad_survived') &&
      G.currentYear >= 1979 && G.currentYear <= 1985 &&
      G.age >= 25 &&
      !G.mem?.ft82PeligrosidadTransicion,
    text: 'The Ley de Peligrosidad y Rehabilitación Social is modified in 1979 to remove homosexuality from the list of social dangers. The modification does not produce a formal apology. The people who were interned in the reformatories at Huelva and Badajoz receive no rehabilitation, no compensation, no acknowledgment that the internment was wrong. The law changes. The record of the law does not change. The years in the reformatory are still in the record, classified as voluntary commitment for rehabilitation, which they were not.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 3
      p.karma += 4
      p.setMem('ft82PeligrosidadTransicion', true)
    },
  },

  {
    id: 'ft82_peligrosidad_2005',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('spain_ley_peligrosidad_survived') &&
      G.currentYear >= 2005 &&
      G.age >= 45 &&
      !G.mem?.ft82Peligrosidad2005,
    text: '2005: same-sex marriage legal in Spain. You were classified as dangerous in the records of the state that also produced the state that has now done this. The distance between the reformatory at Huelva and the marriage registry in 2005 is not a distance in geography. It is a distance in what the state says you are. The state has changed its position. The record of the earlier position is still in the archives, still classified as it was classified.',
    choices: null,
    effect: (p) => {
      p.r += 7
      p.m += 4
      p.karma += 5
      p.setMem('ft82Peligrosidad2005', true)
    },
  },

  // ── spain_fosa_recovery ───────────────────────────────────────────────────

  {
    id: 'ft82_fosa_result',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('spain_fosa_recovery') &&
      G.currentYear >= 2010 &&
      G.age >= 55 &&
      !G.mem?.ft82FosaResult,
    text: 'The result of the DNA analysis or the exhumation: a match, or not a match. If there is a match, the family now has the specific knowledge: the body is confirmed, the death is dated, the execution is documented. There is a ceremony, or there is not. The bones are reburied in the family plot, or they stay at the forensic facility pending further identification. The knowledge is different from the certainty that the grave is found. Both are different from the seventy years of not knowing. The archive closes in one sense and opens in another.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 2
      p.karma += 4
      p.setMem('ft82FosaResult', true)
    },
  },

]
