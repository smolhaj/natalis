// BUILD 55 — Multilingualism arc (BUILD 41)
// The positive and political experience of living between languages.
// Code-switching as cognitive and identity work. The mother tongue as resistance.
// The lingua franca advantage made visible. The language that dies within a lifetime.
// Parent-child language gap. The interpreter's impossible word.

export const MULTILINGUAL_EVENTS = [

  // ── FOLLOW-THROUGHS (written first) ──────────────────────────────────────

  {
    id: 'mul_parent_language_grief',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('emigrated') && G.children.length > 0 && G.age >= 40 && !G.mem.mulParentLang,
    text: 'Your eldest cannot understand the joke you just made. Not the translation — the translation is accurate — but the shape of the humour, which exists only in the other language. There are things you know how to say in the language you brought with you that have no equivalent here, not just in vocabulary but in mood and register and what the sentence is doing. Your children will not inherit those things. You knew this was coming. It arrives anyway.',
    effect: (p) => { p.m -= 6; p.setMem('mulParentLang', true) },
  },

  {
    id: 'mul_language_death',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('minority_language_speaker') && G.age >= 65 && !G.mem.mulLangDeath,
    text: 'A linguist at a university has contacted your community association. They are making a recording. The number of fluent speakers left is fewer than fifty. Most of them are your age. Your grandchildren understand single words — the names of foods, the names of affection. The linguist\'s recording will preserve the grammar and the sound. It will not preserve the experience of thinking in it.',
    choices: [
      {
        text: 'Participate. Let them record you.',
        tag: 'recorded',
        outcome: 'You speak for four hours. The linguist\'s eyes widen at the complexity of the verbal system. You tell them about the words for different qualities of rain. They ask you to say them again.',
        effect: (p) => { p.m += 5; p.karma += 8; p.setMem('mulLangDeath', true) },
      },
      {
        text: 'Decline. Some things shouldn\'t become museum pieces.',
        tag: 'declined',
        outcome: 'When you are gone, what you carry goes with you. You have thought about this for years and decided it is yours to decide.',
        effect: (p) => { p.m -= 3; p.setMem('mulLangDeath', true) },
      },
    ],
  },

  // ── CODE-SWITCHING ────────────────────────────────────────────────────────

  {
    id: 'mul_code_switch',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('emigrated') && G.age >= 20 && G.age <= 35 && !G.mem.mulCodeSwitch,
    text: 'You argue in the language you grew up in. You do maths in the language you were taught it. You dream in the language you are most afraid in, which shifts as the years pass. At work you are one person; on the phone to your mother you are another; in the place where the two overlap, you speak a third language that exists only in that gap — a creole of contexts that has no name.',
    effect: (p) => { p.m += 5; p.e += 2; p.addFlag('multilingual_identity'); p.setMem('mulCodeSwitch', true) },
  },

  {
    id: 'mul_lingua_franca_visible',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('emigrated') && G.stats.smarts >= 55 && G.age >= 22 && G.age <= 35 && !G.mem.mulLinguaFranca,
    text: 'A conference. A colleague from Nigeria — better educated, more experienced, three published papers to your one — struggles in the Q&A. His English is strong but not native-speaker strong, and the questioner is moving fast. Your English is native. You answer for him without thinking, which he doesn\'t want, and then watch him navigate the room for the next three hours with the specific competence of someone doing twice the work to get half the credit. You had not noticed, before today, what you had been given for free.',
    effect: (p) => { p.e += 3; p.karma += 5; p.addFlag('privilege_visible'); p.setMem('mulLinguaFranca', true) },
  },

  // ── MOTHER TONGUE AS RESISTANCE ───────────────────────────────────────────

  {
    id: 'mul_mother_tongue_political',
    phase: 'young_adult',
    weight: 3,
    when: (G) => (G.flags.has('kurd_identity_suppressed') || G.flags.has('amazigh_identity') || G.flags.has('language_suppressed')) && G.age >= 18 && G.age <= 32 && !G.mem.mulMotherTonguePol,
    text: 'You publish something in the language. Not secretly — publicly. It is the first time you have seen something in the language in print that was not a government-approved folklore booklet or a foreign linguist\'s field notes. It has the specific weight of something ordinary that is not ordinary: a sentence in your grandmother\'s language, treated as if it belongs in the world.',
    choices: [
      {
        text: 'Keep writing. The act is the point.',
        tag: 'kept_writing',
        outcome: 'You are not arrested. You are not promoted either. The writing exists and continues to exist, which is not nothing.',
        effect: (p) => { p.m += 10; p.karma += 6; p.addFlag('resistance_through_art'); p.setMem('mulMotherTonguePol', true) },
      },
      {
        text: 'The risk isn\'t worth it to you.',
        tag: 'stopped',
        outcome: 'You write in the majority language for the work that needs to be done. You speak the other one at home, which is its own form of keeping.',
        effect: (p) => { p.m -= 4; p.setMem('mulMotherTonguePol', true) },
      },
    ],
  },

  // ── THE INTERPRETER ───────────────────────────────────────────────────────

  {
    id: 'mul_interpreter_impossible_word',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.career?.field === 'interpreter' || G.career?.id === 'interpreter' || G.flags.has('multilingual_identity') && G.stats.smarts >= 65 && G.age >= 30 && !G.mem.mulInterpreterWord,
    text: 'The word has no equivalent. The doctor asks the patient to describe the pain; the patient uses a word that means approximately "the ache that comes from missing something you cannot name." There is no clinical equivalent. You translate it as "chronic pain of psychological origin" and watch the doctor write it down and watch the patient\'s face as the sentence lands, and you understand the gap between what was said and what is now on the record.',
    effect: (p) => { p.m -= 5; p.e += 3; p.addFlag('seen_the_gap'); p.setMem('mulInterpreterWord', true) },
  },

  // ── GRANDPARENT TONGUE ────────────────────────────────────────────────────

  {
    id: 'mul_grandparent_tongue',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('emigrated') && G.age >= 60 && !G.mem.mulGrandparentTongue,
    text: 'Your grandchild asks why you laugh at different times than everyone else when you watch films together. You explain about the other language — not the grammar but the mood, the way certain ideas sit differently. They listen with the specific half-attention of a child being told something that doesn\'t apply to them. Then they ask you to teach them a word. You teach them the word for the feeling of missing a place you have never been.',
    effect: (p) => { p.m += 8; p.karma += 4; p.setMem('mulGrandparentTongue', true) },
  },
]
