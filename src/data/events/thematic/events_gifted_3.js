// events_gifted_3.js — Gifted arc expansion III
//
// Covers the gaps remaining after events_gifted.js and events_gifted_2.js:
//   Parental dismissal of the gift
//   Public prodigy performance / competition entry
//   Gender × gift intersection (the competence that is not seen as competence)
//   Gift + disability intersection
//   Academic olympiad / competition path
//   Elite recognition arc (major prizes, world-level acknowledgment)

const isGifted = (G) =>
  G.flags.has('born_gifted_intellectual') ||
  G.flags.has('born_gifted_musical') ||
  G.flags.has('born_gifted_athletic') ||
  G.flags.has('born_gifted_artistic') ||
  G.flags.has('born_gifted_linguistic')

// ═══════════════════════════════════════════════════════════════════════════
// PARENTAL DISMISSAL
// ═══════════════════════════════════════════════════════════════════════════

export const GIFTED_3_EVENTS = [

  {
    id: 'gift_parent_dismissal',
    phase: 'childhood',
    weight: 7,
    when: (G) =>
      isGifted(G) &&
      !G.flags.has('gift_recognized') &&
      !G.mem?.giftParentDismissFired,
    text: (G) => {
      if (G.flags.has('born_gifted_musical')) return 'You play the piece — the one you taught yourself, note by note, from listening — and your father shrugs. Music is not a livelihood. Music is something that happens at church, or at ceremonies, not something you spend your afternoon on when there are other things to do. The piece you played is good and he cannot hear it as good because he has no frame for what good sounds like here. You put the instrument away and go back.'
      if (G.flags.has('born_gifted_athletic')) return 'The coach at the regional competition says something to your parents — about your times, about what they suggest for the future. Your parents listen. They do not change their view. The farm does not care about your times. The shop does not run itself. There are legitimate reasons why the gift does not become the direction, and understanding those reasons does not make the understanding easier.'
      return 'You show your parent what you\'ve made — the writing, the calculation, the drawing. Your parent is not dismissive from cruelty. Your parent has no framework to evaluate it. The thing is good and the goodness passes through the room without being caught. You learn to work without the acknowledgement. This is a useful skill and an unnecessary loss.'
    },
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('gift_parent_dismissed'); p.setMem('giftParentDismissFired', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PUBLIC PRODIGY — PERFORMANCE / COMPETITION
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'gift_public_performance',
    phase: 'childhood',
    weight: 7,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_recognized') &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.giftPublicPerfFired,
    text: (G) => {
      if (G.flags.has('born_gifted_musical')) return 'The concert hall holds four hundred people and you are eleven years old. You walk to the instrument and the room adjusts — it is watching a child, and then it is watching something else. The performance is not good because you are eleven. It is good in the way that certain things are good regardless of the age of the person producing them. Afterwards there are adults you have never met who want to speak to your parents.'
      if (G.flags.has('born_gifted_athletic')) return 'The regional championships. You are the youngest by two years. The time you post is a record. There are photographs. There is a small item in the local paper. You do not read the item. You are already thinking about the next race.'
      return 'The competition is regional first and then, on the strength of the regional result, national. You are the youngest in the room. You solve problems the older students cannot solve. The room notices. The adults running the competition notice. You leave with a score that does not fit the normal range of the normal distribution and several adults who have a new interest in your future.'
    },
    choices: [
      {
        text: 'The performance feels right — this is where the gift lives',
        tag: null,
        outcome: 'The public arena suits the gift. The gift and the arena begin to shape each other. There are things this produces and things it costs.',
        effect: (p) => { p.m += 6; p.s += 3; p.addFlag('gift_public_performer'); p.setMem('giftPublicPerfFired', true) },
      },
      {
        text: 'The attention is uncomfortable — the gift was not for this',
        tag: null,
        outcome: 'The gift that was private has been made public. The performance required something the gift did not originally include. You will have to decide what to do with that.',
        effect: (p) => { p.m -= 3; p.addFlag('gift_public_discomfort'); p.addFlag('gift_public_performer'); p.setMem('giftPublicPerfFired', true) },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ACADEMIC OLYMPIAD / COMPETITION PATH
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'gift_olympiad_path',
    phase: 'adolescence',
    weight: 7,
    when: (G) =>
      G.flags.has('born_gifted_intellectual') &&
      G.age >= 13 && G.age <= 18 &&
      G.currentYear >= 1960 &&
      !G.mem?.giftOlympiadFired,
    text: 'The mathematics olympiad, the physics olympiad, the international science competition — the system that exists for the specific talent you have. You are selected for the national team, or you qualify for the international round, or you simply solve the problems on the practice sheet faster than the teacher can mark them. The competition is global and the global field has people who are as good as you, which is the first time that has been true. The encounter with someone equally capable changes something.',
    choices: [
      {
        text: 'Win, or come close to winning',
        tag: null,
        outcome: 'The result is documented. Universities in other countries begin sending letters. The path, if you want it, is now visible.',
        effect: (p) => { p.e += 6; p.m += 8; p.addFlag('gift_olympiad_success'); p.addFlag('gift_olympiad_path'); p.setMem('giftOlympiadFired', true) },
      },
      {
        text: 'Place mid-field — the global ceiling is different from the local one',
        tag: null,
        outcome: 'The recalibration is useful and uncomfortable. You are not the most capable person in the world at this. You are in the top percentile of that person, which is a real thing, differently shaped than you expected.',
        effect: (p) => { p.e += 3; p.m -= 5; p.r += 4; p.addFlag('gift_olympiad_path'); p.setMem('giftOlympiadFired', true) },
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // GENDER × GIFT INTERSECTION
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'gift_gender_barrier',
    phase: 'adolescence',
    weight: 8,
    when: (G) =>
      isGifted(G) &&
      G.character?.gender === 'female' &&
      G.flags.has('gift_recognized') &&
      !G.mem?.giftGenderFired,
    text: (G) => {
      if (G.flags.has('born_gifted_athletic')) return 'The boys\' track programme has better equipment, more coaching hours, and a budget that is a different order of magnitude. You are faster than the boys who receive the coaching you don\'t receive. The logic of the gap is structural and clear and no one in a position to change it is changing it. You train with what you have. What you have is worse and still producing results that attract attention.'
      if (G.currentYear < 1980) return 'The university admissions office returns the application. The programme does not accept women. This is not personal — it is policy. The policy is not questioned by the institution because the institution wrote the policy. You are the wrong gender for the path that would suit the gift. The gift does not adjust. The path does not open.'
      return 'The word they use is \'impressive, for a girl\' or \'remarkable given the circumstances\' or some other formulation that places your achievement inside a smaller category than the category it belongs in. The achievement is not inside the smaller category. The sentence that describes it is. You learn to hear the sentence and discard the framing while keeping the genuine part of the recognition, which requires a specific kind of patience.'
    },
    choices: [
      {
        text: 'Name it and push through anyway',
        tag: null,
        outcome: 'The naming costs something. The pushing through costs more. You arrive somewhere the framing said you couldn\'t reach.',
        effect: (p) => { p.m -= 5; p.s += 4; p.addFlag('gift_gender_barrier_named'); p.addFlag('gift_gender_fought'); p.setMem('giftGenderFired', true) },
      },
      {
        text: 'Find the path around — the obstacle is real but not the whole terrain',
        tag: null,
        outcome: 'The workaround is longer. It reaches the same place. What you know about the terrain, from navigating around the obstacle, turns out to be valuable.',
        effect: (p) => { p.m -= 3; p.e += 2; p.addFlag('gift_gender_navigated'); p.setMem('giftGenderFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gift_gender_midlife_reckoning',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isGifted(G) &&
      G.character?.gender === 'female' &&
      (G.flags.has('gift_gender_fought') || G.flags.has('gift_gender_navigated')) &&
      G.age >= 35 &&
      !G.mem?.giftGenderMidFired,
    text: 'In midlife you watch younger women in the same field you entered navigate the same terrain you navigated, with somewhat better maps. The landscape has changed. Not beyond recognition — the basic features are preserved — but the specific barriers that cost you specific years are less solid. You are not sure whether to feel that the costs were wasted or that the costs were part of what moved the landscape. Both things seem true.',
    choices: null,
    effect: (p) => { p.m += 4; p.r -= 3; p.karma += 5; p.addFlag('gift_gender_midlife_reckoned'); p.setMem('giftGenderMidFired', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // GIFT + DISABILITY INTERSECTION
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'gift_disability_intersection',
    phase: 'childhood',
    weight: 7,
    when: (G) =>
      isGifted(G) &&
      (G.flags.has('born_with_disability') || G.flags.has('born_deaf') || G.conditions?.some(c => c.id === 'chronic_condition')) &&
      !G.mem?.giftDisabilityFired,
    text: (G) => {
      if (G.flags.has('born_deaf') && G.flags.has('born_gifted_musical')) return 'The irony is not lost on you and is also not the whole story. The gift is real — you feel music in ways that have nothing to do with the channel you don\'t have access to. What you make is not music despite being Deaf. It is music from inside a different relationship to sound. The world will require time to understand this. You are not waiting for the world to understand it before making the thing.'
      if (G.flags.has('born_with_disability')) return 'The body and the gift coexist in the same person, which creates a logistical challenge for a world that puts the body first when deciding what a person is capable of. You have spent significant energy navigating the assumption that the body defines the ceiling. The gift has a different ceiling. The navigation is the cost of access to it.'
      return 'The condition and the gift occupy the same life. The world often sees only one — usually the condition, which is visible, rather than the gift, which requires investment to see. You have learned to create the conditions under which the gift is visible despite the condition making the room harder to enter.'
    },
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 3; p.addFlag('gift_disability_intersection'); p.setMem('giftDisabilityFired', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ELITE RECOGNITION ARC
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'gift_world_stage',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_extraordinary') &&
      G.fame >= 45 &&
      G.age >= 35 &&
      !G.mem?.giftWorldStageFired,
    text: (G) => {
      if (G.flags.has('born_gifted_athletic')) return 'The world championship or Olympic selection — whichever the sport — is the event the entire career was structured around reaching. You have reached it. You are here, at the level where the field is global and the stakes are the stakes that define careers. How you perform here will become the sentence that precedes your name for the rest of your professional life.'
      if (G.flags.has('born_gifted_musical')) return 'Carnegie Hall, the Royal Albert Hall, the Proms — or the equivalent stage that means your field has placed you at its centre. The invitation arrives and carries the weight of what it represents: the world in your field has been watching and has decided you belong at its centre. The preparation is not unlike any other preparation. The room is different.'
      return 'The invitation to address the field — the keynote, the prize lecture, the retrospective of your work that appears in the leading journal — signals that the field has placed your contribution at its centre. The recognition is real. What it means for what comes next is still being determined.'
    },
    choices: null,
    effect: (p) => { p.m += 10; p.fame += 10; p.addFlag('gift_world_stage'); p.setMem('giftWorldStageFired', true) },
  },

  {
    id: 'gift_major_prize',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isGifted(G) &&
      G.flags.has('gift_extraordinary') &&
      G.flags.has('gift_world_stage') &&
      G.fame >= 60 &&
      !G.mem?.giftPrizeFired,
    text: (G) => {
      if (G.flags.has('born_gifted_athletic')) return 'The gold medal, the world title, the record — the specific thing that the career was pointed at. The moment of it is shorter than you expected. The feeling is real and then it is the fact. The fact is permanent. What comes after the fact is a different and interesting question.'
      if (G.flags.has('born_gifted_musical')) return 'The prize is announced. Your name in the announcement. You have heard your name in a lot of contexts and this is a new context for it. The weight of what the prize represents — the accumulated judgement of the field — lands in a way that takes some time to settle into. The work is the same work it was yesterday. The frame around it has shifted.'
      return 'The phone call comes from a number you don\'t recognise early in the morning. You almost don\'t answer. The voice explains what it is calling to say. There is a pause after the explanation that you don\'t know how to fill. The work that led here was done without knowing it would lead here, and the best work usually is.'
    },
    choices: null,
    effect: (p) => { p.m += 15; p.fame += 15; p.addFlag('gift_major_prize'); p.setMem('giftPrizeFired', true) },
  },

  {
    id: 'gift_after_the_peak',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      isGifted(G) &&
      (G.flags.has('gift_world_stage') || G.flags.has('gift_olympiad_success')) &&
      G.age >= 55 &&
      !G.mem?.giftAfterPeakFired,
    text: 'The peak is behind you now — not as something lost but as something completed. What comes after the peak is a different relationship to the gift: less urgent, more deliberate, no longer oriented toward the height of what can be achieved but toward what can be passed on, what can be enjoyed, what the gift actually is now that you no longer need to prove it. This is not decline. It is something less driven and more complete.',
    choices: null,
    effect: (p) => { p.m += 8; p.r -= 4; p.addFlag('gift_after_peak'); p.setMem('giftAfterPeakFired', true) },
  },

]
