// Follow-through events for flags that were previously orphaned.
// Every flag here represents something that happened and then disappeared.
// These events make sure it didn't.

export const FOLLOWTHROUGH_2_EVENTS = [

  // ── LGBTQ RELATIONSHIP ECHO ──────────────────────────────────────────────────
  // The first relationship you had that was actually you.

  {
    id: 'ft2_lgbtq_relationship_echo',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('lgbtq_had_relationship') && G.age >= 22 && !G.mem?.lgbtqRelEchoAck,
    text: 'The relationship is years behind you now. What you carry from it isn\'t what you expected. Not the loss — the recognition. Someone saw you specifically, not the version of yourself you were performing for everyone else. That doesn\'t stop mattering.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 2; p.setMem('lgbtqRelEchoAck', true) },
  },

  // ── ABORTION ECHO ────────────────────────────────────────────────────────────
  // A date that comes around.

  {
    id: 'ft2_abortion_echo',
    phase: null,
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('had_abortion') && G.age >= 28 && !G.mem?.abortionEchoAck,
    text: 'A date passes each year that you notice but don\'t name. You didn\'t decide to notice it. You just do.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('abortionEchoAck', true) },
  },

  {
    id: 'ft2_abortion_next_pregnancy',
    phase: null,
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('had_abortion') && G.flags.has('pregnant') &&
      !G.mem?.abortionNextPregnancyAck,
    text: 'This pregnancy is different from the last one, in the most relevant sense. You hold both at once. You are allowed to hold both at once.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 3; p.setMem('abortionNextPregnancyAck', true) },
  },

  // ── WAR CHILDHOOD REFLEX ─────────────────────────────────────────────────────
  // What the body learned doesn't unlearn easily.

  {
    id: 'ft2_war_childhood_reflex',
    phase: 'young_adult',
    weight: 2,
    cooldown: 8,
    when: (G) => G.flags.has('war_childhood') && G.age >= 19,
    text: 'A door slams somewhere in the building. You are flat against the wall before you know you moved. Then you are standing in a hallway in a city where there is no war. Which is the whole point.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2 },
  },

  {
    id: 'ft2_war_childhood_news',
    phase: 'midlife',
    weight: 2,
    cooldown: 10,
    when: (G) => G.flags.has('war_childhood') && G.age >= 30,
    text: 'News footage of another country\'s conflict. You watch it differently from people who didn\'t grow up near one — not with distance, but with specific recognition. The noise a city makes when it stops being ordinary. You know that sound.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2 },
  },

  // ── BETRAYAL TRUST PATTERNS ──────────────────────────────────────────────────
  // What you learned about people at fifteen.

  {
    id: 'ft2_betrayal_trust_pattern',
    phase: 'young_adult',
    weight: 2,
    cooldown: 8,
    when: (G) => G.flags.has('betrayal_adolescence') && G.age >= 22,
    text: 'A friendship is going well. Exactly when it reaches a certain depth, something in you slows down. You have done this before — reached a point and then started waiting for the thing that happens at this point.',
    choices: [
      {
        text: 'Notice it. Keep going anyway.',
        tag: null,
        outcome: 'You push past the reflex. It costs something. This is probably the right cost.',
        effect: (p) => { p.m += 4; p.s += 3; p.karma += 3 },
      },
      {
        text: 'Step back before it can happen again.',
        tag: null,
        outcome: 'The friendship doesn\'t end. It levels off. This is a kind of safety.',
        effect: (p) => { p.r += 4; p.m -= 2 },
      },
    ],
  },

  // ── HARVEST FAILURE / FOOD INSECURITY ECHO ───────────────────────────────────
  // The arithmetic of dry ground doesn't leave you.

  {
    id: 'ft2_harvest_failure_weather',
    phase: 'midlife',
    weight: 2,
    cooldown: 6,
    when: (G) => G.flags.has('harvest_failure') && G.age >= 28,
    text: 'A dry summer. The forecast says rain next week. Something in you reads it differently than a forecast — you have felt this before. The arithmetic of dry ground and time. The specific patience of waiting for rain that might not come.',
    choices: null,
    effect: (p) => { p.r += 2; p.e += 2 },
  },

  // ── CIVIL WAR LIVED ──────────────────────────────────────────────────────────
  // Carrying a country that burned.

  {
    id: 'ft2_civil_war_midlife',
    phase: 'midlife',
    weight: 2,
    cooldown: 8,
    when: (G) => G.flags.has('civil_war_lived') && G.age >= 30,
    text: 'Someone asks where you\'re from. You say the name of the country. You do not say: the version of the country that existed when I was a child. You do not say: the version that doesn\'t exist anymore. You just say the name.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2 },
  },

  {
    id: 'ft2_civil_war_young_adult',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('civil_war_lived') && G.age >= 20 && G.age <= 30 && !G.mem?.civilWarYAack,
    text: 'You are building a life in a country that was at war when you were small. The country and you both carry the same years differently. You are not sure which of you has healed more.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 3; p.setMem('civilWarYAack', true) },
  },

  // ── ETHNIC MINORITY CONFLICT ─────────────────────────────────────────────────
  // The country that happened to you.

  {
    id: 'ft2_ethnic_minority_daily',
    phase: null,
    weight: 2,
    cooldown: 10,
    when: (G) => G.flags.has('ethnic_minority_conflict') && G.age >= 22,
    text: 'Someone asks where you\'re really from. You have several answers ready — the quick one, the longer one, the accurate one that takes a sentence to explain — and you have learned to read the room before choosing.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2 },
  },

  {
    id: 'ft2_ethnic_minority_career',
    phase: 'midlife',
    weight: 2,
    cooldown: 8,
    when: (G) => G.flags.has('ethnic_minority_conflict') && G.career && G.age >= 30,
    text: 'A room. The configuration of who is in it. You read this kind of room quickly, automatically, in a way that people who haven\'t needed to don\'t. You are never quite only a professional in rooms like this.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 2 },
  },

  // ── REFUGEE ANNIVERSARY ──────────────────────────────────────────────────────
  // The date on the documents.

  {
    id: 'ft2_refugee_anniversary',
    phase: null,
    weight: 2,
    cooldown: 0,
    when: (G) => (G.flags.has('refugee') || G.residencyStatus === 'refugee_status') &&
      G.age >= 18 && !G.mem?.refugeeAnniversaryAck,
    text: 'The date on the documents is the date you crossed. You didn\'t choose this date. It chose you. You have had birthdays since then. This other date also comes around every year.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('refugeeAnniversaryAck', true) },
  },

  {
    id: 'ft2_refugee_residency_milestone',
    phase: null,
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('refugee') && G.flags.has('resettlement_established') &&
      G.age >= 25 && !G.mem?.refugeeMilestoneAck,
    text: 'You have been here longer than you were there. The arithmetic of this takes a moment to process when you first do it. You do it again to check. You are from two places now, in different proportions.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 3; p.setMem('refugeeMilestoneAck', true) },
  },

  // ── DISSIDENT READER ─────────────────────────────────────────────────────────
  // The books you read when they were dangerous.

  {
    id: 'ft2_dissident_books_hiding',
    phase: null,
    weight: 2,
    cooldown: 8,
    when: (G) => G.flags.has('dissident_reader') && G.age >= 22,
    text: (G) => {
      const isAuth = ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy'].includes(G.regime)
      if (isAuth) {
        return 'The books are still in the house. You don\'t display them. The habit of how they are placed — spine inward, cover facing down — is so automatic you only notice it when someone else does.'
      }
      return 'The books from that period are on the shelf now, visible. You live somewhere where this is not a risk. You are aware that this fact requires no commentary and you still find yourself thinking about it.'
    },
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2 },
  },

  {
    id: 'ft2_dissident_reader_career',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('dissident_reader') && G.career && G.age >= 22 && !G.mem?.dissidentCareerAck,
    text: (G) => {
      const isAuth = ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy'].includes(G.regime)
      if (isAuth) {
        return 'A colleague mentions a name — an author, an idea — in a way that is a test. You know how to fail this test safely. You are very good at it by now.'
      }
      return 'A colleague has not read the things you read in the years when reading them meant something. You explain. You notice that without the risk, the books mean something slightly different. This is not a complaint.'
    },
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('dissidentCareerAck', true) },
  },

  // ── EXPLICIT CHOICE CALLBACKS ────────────────────────────────────────────────
  // Events that name a prior decision and its weight in the present tense.

  {
    id: 'ft2_turned_down_opportunity',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('turned_down_opportunity') && G.age >= 35 && !G.mem?.turnedDownCallbackAck,
    text: 'You think sometimes about the thing you didn\'t take. Not with regret exactly — more like curiosity. A parallel version of you made a different choice in that room. You have no way of knowing if that version is better. You have built what you have.',
    choices: null,
    effect: (p) => { p.r += 2; p.e += 2; p.setMem('turnedDownCallbackAck', true) },
  },

  {
    id: 'ft2_chose_loyalty_over_truth',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('chose_loyalty') && G.age >= 34 && !G.mem?.loyaltyCallbackAck,
    text: 'The thing you didn\'t say in that room is still with you. You chose the person over the principle. You are not sure yet whether that was wisdom or cowardice and you may never be. The person you protected doesn\'t know what you did.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('loyaltyCallbackAck', true) },
  },

  {
    id: 'ft2_person_you_reported',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('reported_someone') && G.age >= 30 && !G.mem?.reportedCallbackAck,
    text: 'You made a report once. You don\'t know what happened to the person after. You have told yourself several things about this over the years, depending on the year.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('reportedCallbackAck', true) },
  },

]
