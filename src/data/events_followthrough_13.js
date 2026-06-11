// events_followthrough_13.js
// Follow-through events for 10 flags that previously had year_texture gaps.
// Each event fires once, deepens the flag's story, and sets a completion flag
// that the year texture can reference for a second-layer echo.

export const FOLLOWTHROUGH_13_EVENTS = [

  // ─── INSTITUTIONAL POWER ─────────────────────────────────────────────────────

  {
    id: 'inst_power_accounting',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('institutional_power') && G.age >= 58 && !G.flags.includes('inst_power_accounted'),
    text: 'You have held the position for two decades. A younger priest — or imam, or minister — comes to you privately with a question about a decision the institution made in the past that the institution would prefer not to revisit. He has found something in the archive. He wants to know what you know.',
    choices: [
      {
        text: 'Tell him what you know.',
        tag: 'honest',
        outcome: 'You tell him the full account. The institution\'s version and what actually happened and the distance between them. He listens without interrupting. You have not said this out loud before.',
        effect: (p) => { p.addFlag('inst_power_accounted'); p.addFlag('spoke_institutional_truth'); p.m += 5; p.karma += 4; },
      },
      {
        text: 'Give him the official account.',
        tag: 'protect',
        outcome: 'You give him the version the institution has agreed on. He thanks you. He is not entirely convinced. You know this because you were not entirely convinced at his age either.',
        effect: (p) => { p.addFlag('inst_power_accounted'); p.r += 3; },
      },
    ],
  },

  // ─── CLERGY ADAPTED ──────────────────────────────────────────────────────────

  {
    id: 'clergy_adapted_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('clergy_adapted') && G.age >= 65 && !G.flags.includes('clergy_adapted_reckoned'),
    text: 'You are old enough to see the full shape of what the adaptation cost. The sermons that said what the state needed to hear in words that sounded like faith. The silence about the things you should not have been silent about. The theology of the possible that kept you alive and kept the congregation intact and also kept certain crimes uncontested. God and the state. The account has been running a long time.',
    choices: [
      {
        text: 'Speak to the young clergy about it.',
        tag: 'witness',
        outcome: 'You tell them what you did and why and what it cost. The telling is the most honest thing you have done in this role. They listen with a quality of attention you have not received in years.',
        effect: (p) => { p.addFlag('clergy_adapted_reckoned'); p.addFlag('spoke_institutional_truth'); p.m += 6; p.karma += 5; },
      },
      {
        text: 'Keep the silence you have always kept.',
        tag: 'silence',
        outcome: 'Some accounts are settled privately. You have made your accounting with God, or the version of God that survived the adaptation. The young clergy will learn what they learn. You have carried this far enough.',
        effect: (p) => { p.addFlag('clergy_adapted_reckoned'); p.r += 4; },
      },
    ],
  },

  // ─── YESHIVA TRAINED ─────────────────────────────────────────────────────────

  {
    id: 'yeshiva_secular_translation',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.includes('yeshiva_trained') && G.age >= 24 && G.age <= 40 && !G.flags.includes('yeshiva_secular_bridge'),
    text: 'A colleague asks where your way of arguing comes from — the habit of holding a problem from multiple angles at once, looking for the question underneath the question, refusing to let a contradiction go unexamined. You say: where I was trained. They ask: where was that? You say it. They are surprised, or they are not surprised, depending on who they are.',
    choices: null,
    effect: (p) => {
      p.addFlag('yeshiva_secular_bridge')
      p.e += 3
      p.s += 2
    },
  },

  // ─── AMAZIGH IDENTITY ────────────────────────────────────────────────────────

  {
    id: 'amazigh_official_recognition',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.flags.includes('amazigh_identity') && G.age >= 40 && G.currentYear >= 2011 && !G.flags.includes('amazigh_recognized_late'),
    text: 'Tamazight is in the constitution now. The Tifinagh script appears on official signs. After years in which the language and name were not officially acknowledged, they are acknowledged. You stand in front of one of the new signs for longer than is strictly necessary.',
    choices: null,
    effect: (p) => {
      p.addFlag('amazigh_recognized_late')
      p.m += 5
      p.e += 2
    },
  },

  // ─── MULTILINGUAL IDENTITY ───────────────────────────────────────────────────

  {
    id: 'multilingual_inheritance',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.flags.includes('multilingual_identity') && (G.children ?? []).length > 0 && G.age >= 32 && !G.flags.includes('multilingual_inheritance_passed'),
    text: 'Your child mixes languages in a single sentence in a way that is grammatically impossible in either language and perfectly clear in both simultaneously. You understand every word and the logic of the construction. The construction would be opaque to someone with only one of the languages. You are laughing before they finish.',
    choices: null,
    effect: (p) => {
      p.addFlag('multilingual_inheritance_passed')
      p.m += 6
    },
  },

  // ─── MINORITY LANGUAGE SPEAKER ───────────────────────────────────────────────

  {
    id: 'minority_language_grandchild',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('minority_language_speaker') && (G.children ?? []).length > 0 && G.age >= 55 && !G.flags.includes('language_spoken_to_grandchild'),
    text: 'You are speaking to your grandchild in the language your grandparents spoke to you. The child is learning it — slowly, incompletely, with an accent you do not have. The linguists would call this a reclamation. You call it a Tuesday afternoon with someone you love.',
    choices: null,
    effect: (p) => {
      p.addFlag('language_spoken_to_grandchild')
      p.m += 6
      p.karma += 3
    },
  },

  // ─── KURD EUROPE DIASPORA ────────────────────────────────────────────────────

  {
    id: 'kurd_europe_return_question',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.includes('kurd_europe_diaspora') && G.age >= 35 && G.age <= 58 && !G.flags.includes('kurd_europe_question_faced'),
    text: 'The question comes up at the community association. Some people have gone back — the village is there or rebuilt or something is there. The political conditions have changed or appear to have changed. Someone has returned and written about it. Someone else tried and came back. You have the question now and it will not stop being the question.',
    choices: [
      {
        text: 'Begin making plans to return.',
        tag: 'return',
        outcome: 'The process is long and the outcome is uncertain and you are doing it anyway. Whatever the village is now, you need to see it.',
        effect: (p) => { p.addFlag('kurd_europe_question_faced'); p.addFlag('kurd_return_planning'); p.m += 3; },
      },
      {
        text: 'Stay with the life built here.',
        tag: 'stay',
        outcome: 'The life you have built in this country is real. Your children do not speak Kurmanji at home. The decision makes sense and it is still a loss of a particular kind.',
        effect: (p) => { p.addFlag('kurd_europe_question_faced'); p.r += 2; },
      },
      {
        text: 'Keep the question open.',
        tag: 'open',
        outcome: 'The question belongs to you. You do not have to answer it on anyone else\'s timeline.',
        effect: (p) => { p.addFlag('kurd_europe_question_faced'); },
      },
    ],
  },

  // ─── MOROCCAN DIASPORA ───────────────────────────────────────────────────────

  {
    id: 'moroccan_diaspora_counting',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.includes('moroccan_diaspora') && G.age >= 60 && !G.flags.includes('moroccan_diaspora_looking_back'),
    text: 'You have been here longer than you were there. The arithmetic crossed some years ago and you missed the exact moment. The house in Casablanca or Fès or Nador is your niece\'s now, or rented, or different in ways that would not be recognisable. The crossing of the Strait was a one-way crossing that did not know itself as one-way at the time.',
    choices: null,
    effect: (p) => {
      p.addFlag('moroccan_diaspora_looking_back')
      p.r += 3
      p.m += 2
    },
  },

  // ─── MOURIDE MEMBER ──────────────────────────────────────────────────────────

  {
    id: 'mouride_diaspora_dahira',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.flags.includes('mouride_member') && G.currentCountry !== G.character?.country?.name && G.age >= 28 && !G.flags.includes('mouride_diaspora_dahira'),
    text: 'The dahira meets in someone\'s apartment. Eight people. A recording of the khassaïds from the phone. The smell of rice and fish from the kitchen. You are in a country that does not know what you are doing here on a Saturday evening. You know. The eight people know. The brotherhood crossed the ocean with you.',
    choices: null,
    effect: (p) => {
      p.addFlag('mouride_diaspora_dahira')
      p.m += 6
      p.karma += 3
    },
  },

  // ─── DEBT RECOVERED ──────────────────────────────────────────────────────────

  {
    id: 'debt_zero_moment',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.flags.includes('debt_recovered') && !G.flags.includes('debt_free_milestone'),
    text: 'You paid the last of it. The number is zero. You have checked it three times because the zero has not been there before. The years of payments. The specific arithmetic of every month, the interest that ate the first years of repayments, the slow turn of the principal. All of it: gone.',
    choices: null,
    effect: (p) => {
      p.addFlag('debt_free_milestone')
      p.m += 7
      p.w += 2
      p.mo += 500
    },
  },

]
