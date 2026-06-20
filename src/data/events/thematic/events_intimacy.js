// events_intimacy.js
// BUILD 45 — Sex and Intimacy Across a Life
// The physical and emotional dimension of desire, love, and the body across time.
// Distinct from romance_arc.js (relationship milestones) and fertility.js (reproductive outcomes).

export const INTIMACY_EVENTS = [

  // ── SOCIETAL SHIFT: THE SEXUAL REVOLUTION ────────────────────────────────────

  {
    id: 'int_liberation_wave',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.archetype === 'wealthy_west' &&
      G.currentYear >= 1967 && G.currentYear <= 1977 &&
      G.age >= 17 && G.age <= 36 &&
      !G.mem?.intLiberationWave,
    text: 'Women are marching in New York, London, and Paris. The word has a name now: *liberation*. The thing being demanded is complicated — bodily autonomy, equal pay, the right to be taken seriously — but the demand itself feels clarifying. You are of the generation for whom this is new.',
    choices: null,
    effect: (p) => {
      p.m += 7
      p.addFlag('liberation_generation')
      p.setMem('intLiberationWave', true)
    },
  },

  {
    id: 'int_liberation_reckoning',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('liberation_generation') &&
      G.character.gender === 'female' &&
      G.age >= 38 && G.age <= 55 &&
      !G.mem?.intLiberationReckoning,
    text: 'The revolution happened. You benefited from it in specific ways — work, choice, some kinds of freedom — and in other ways it did not arrive. The gap between what was promised and what was delivered is not a complaint. It is a fact about what a generation can and cannot do in one lifetime.',
    choices: null,
    effect: (p) => {
      p.setMem('intLiberationReckoning', true)
      p.addFlag('liberation_generation_reckoning')
    },
  },

  // ── THE LONG MARRIAGE: DESIRE OVER TIME ──────────────────────────────────────

  {
    id: 'int_long_marriage_shift',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.partner &&
      G.partner.married &&
      (G.partner.years ?? 0) >= 12 &&
      G.age >= 43 && G.age <= 62 &&
      !G.mem?.intLongMarriageShift,
    text: (G) =>
      `Desire is not what it was at the beginning. It has changed shape — less urgent, more specific, stranger in certain ways. You know ${G.partner?.name ?? 'each other'} with a completeness that is its own kind of intimacy. The body is different. What happens between you is different. You do not know whether to call this diminishment or depth. Perhaps it is both.`,
    choices: null,
    effect: (p) => {
      p.partnerRel(5)
      p.setMem('intLongMarriageShift', true)
      p.addFlag('long_marriage_intimacy')
    },
  },

  // ── THE AFFAIR NOT TAKEN ──────────────────────────────────────────────────────

  {
    id: 'int_affair_temptation',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.partner &&
      G.age >= 33 && G.age <= 54 &&
      !G.mem?.romanceInfidelity &&
      !G.mem?.intAffairTempt,
    text: 'Something begins that you did not intend to begin. A conversation that goes somewhere specific. An attention that is particular and returned. The decision has not been made — but it is there, waiting.',
    choices: [
      {
        text: 'Let it continue',
        tag: 'affair_brief',
        outcome: 'It continues for several months. You end it before it becomes something harder to end. You do not tell your partner.',
        effect: (p) => { p.m -= 8; p.r += 14; p.partnerRel(-10); p.addFlag('affair_brief_secret'); p.setMem('intAffairTempt', true) },
      },
      {
        text: 'Pull back — you know what you have',
        tag: null,
        outcome: 'You step back before it becomes what it could become. The decision costs something. You do not entirely regret it.',
        effect: (p) => { p.m -= 4; p.karma += 7; p.addFlag('affair_not_taken'); p.setMem('intAffairTempt', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'int_affair_not_taken_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('affair_not_taken') &&
      G.age >= 58 &&
      !G.mem?.intAffairEcho,
    text: 'You encounter them somewhere, or hear their name, or simply think of them for no reason — the way the mind returns occasionally to a road not taken. You do not know if the decision was right. You know it was a decision.',
    choices: null,
    effect: (p) => {
      p.karma += 4
      p.setMem('intAffairEcho', true)
    },
  },

  {
    id: 'int_affair_weight',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('affair_brief_secret') &&
      G.partner &&
      !G.mem?.intAffairWeight,
    text: (G) =>
      `You carry it quietly. ${G.partner?.name ?? 'Your partner'} does not know. There are ordinary moments — dinner, the Sunday paper — when it surfaces, not with guilt exactly but with a knowledge of what you chose to keep from the person who chose to stay with you.`,
    choices: null,
    effect: (p) => {
      p.r += 8
      p.setMem('intAffairWeight', true)
    },
  },

  // ── THE LATE BEGINNING ────────────────────────────────────────────────────────

  {
    id: 'int_late_beginning',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.partner &&
      G.age >= 36 && G.age <= 52 &&
      !G.mem?.intLateQuestion,
    text: (G) =>
      `You are ${G.age ?? 40}. Most of the people you know have been with someone for a long time now. Some are on their second attempt. The question of whether to keep trying — or whether the life you have built without that has its own shape worth keeping — is less resolved than it appears from the outside.`,
    choices: [
      {
        text: 'Keep trying — you are not done with this',
        tag: null,
        outcome: 'You decide not to stop hoping for it. This takes a particular kind of courage at this age.',
        effect: (p) => { p.m += 5; p.addFlag('late_love_seeking'); p.setMem('intLateQuestion', true) },
      },
      {
        text: 'The life you have is full — you are done waiting',
        tag: null,
        outcome: 'Not resignation — a decision, finally, about what you are building and for whom.',
        effect: (p) => { p.m += 9; p.addFlag('solo_by_choice'); p.setMem('intLateQuestion', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'int_late_love_arrives',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.includes('late_love_seeking') &&
      !G.partner &&
      G.age >= 37 && G.age <= 60 &&
      !G.mem?.intLateLoveArrives,
    text: 'They call at eleven pm and you have been awake for an hour already, not expecting it. The conversation goes until one. You are both old enough to know what this is. You are surprised anyway.',
    choices: null,
    effect: (p) => {
      p.m += 18
      p.s += 4
      p.addFlag('late_love_found')
      p.setMem('intLateLoveArrives', true)
    },
  },

  // ── SEXUALITY IN A CULTURE THAT DOESN'T NAME IT ──────────────────────────────

  {
    id: 'int_culture_unnamed',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      const arch = G.character.country.archetype
      return (
        (arch === 'subsaharan' || arch === 'wealthy_gulf' || arch === 'developing_urban') &&
        G.age >= 25 && G.age <= 52 &&
        !G.mem?.intCultureUnnamed
      )
    },
    text: 'In the language you grew up with, the vocabulary for this is not exactly absent — but it is not for speaking aloud. What happens between people is private in a specific way: not like a secret, but like weather. Everyone knows it is there. No one describes it directly. You have lived your whole life in this silence and it does not feel like deprivation. It is simply how the thing is held.',
    choices: null,
    effect: (p) => {
      p.setMem('intCultureUnnamed', true)
      p.addFlag('cultural_intimacy_silence')
    },
  },

  // ── THE BODY IN LATER LIFE ────────────────────────────────────────────────────

  {
    id: 'int_body_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.partner &&
      G.age >= 63 && G.age <= 82 &&
      !G.mem?.intBodyLate,
    text: (G) =>
      `The body has changed. What happens between you and ${G.partner?.name ?? 'your partner'} has changed with it — quieter in some ways, more itself in others. The people who assume this part of a life ends at a certain age are wrong about the age, and wrong about what this part is.`,
    choices: null,
    effect: (p) => {
      p.m += 9
      p.partnerRel(7)
      p.setMem('intBodyLate', true)
      p.addFlag('intimacy_late_life')
    },
  },

  // ── THE SOLO LIFE ─────────────────────────────────────────────────────────────

  {
    id: 'int_solo_texture',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      (G.flags.includes('solo_by_choice') || !G.partner) &&
      G.age >= 43 &&
      !G.flags.includes('late_love_found') &&
      !G.mem?.intSoloTexture,
    text: 'The things people assume you are missing — closeness, the particular warmth of being known — are not entirely absent. They are distributed differently. A friend who has known you for twenty years. The two-hour phone call. The comfort that does not require a shared address. You have assembled something that works. It does not have a name in the language of couplehood. It does not need one.',
    choices: null,
    effect: (p) => {
      p.m += 10
      p.s += 3
      p.setMem('intSoloTexture', true)
      p.addFlag('built_something_solo')
    },
  },

  // ── FIRST LOSS ────────────────────────────────────────────────────────────────

  {
    id: 'int_first_ending',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.age >= 19 && G.age <= 27 &&
      !G.partner &&
      G.mem?.romanceLateCall && // had at least one relationship (romanceLateCall fired = had early partner)
      !G.mem?.intFirstEnding,
    text: 'The first ending that was actually an ending — not a misunderstanding, but two people who discovered they were growing in different directions. You had understood love as something that, once found, continued. You understand it differently now.',
    choices: null,
    effect: (p) => {
      p.m -= 11
      p.setMem('intFirstEnding', true)
      p.addFlag('first_love_over')
    },
  },

]
