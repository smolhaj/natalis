// Follow-through events (MODE C): callbacks for flags that were set but
// never checked — authoritarian_veteran, paid_bribe, democracy_movement,
// considering_emigration, radio_childhood, sibling_reconciled, earthquake_survivor.

export const FOLLOWTHROUGH_23_EVENTS = [

  // ── AUTHORITARIAN VETERAN ─────────────────────────────────────────────────────
  // Carried habits from service under a regime.

  {
    id: 'ft23_authoritarian_veteran_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('authoritarian_veteran') &&
      !G.mem?.ft23AuthVetMidlife,
    text: 'You catch yourself in the old posture — the deference to the person at the front of the room, the automatic calibration for who has authority and what they want to hear. It was useful when it kept you safe. You are not in that context anymore. The habit did not get the memo.',
    choices: [
      {
        text: 'You have been working on it — the habit is loosening',
        tag: null,
        outcome: 'Not gone. Less automatic. That is progress.',
        effect: (p) => { p.m += 5; p.e += 3; p.setMem('ft23AuthVetMidlife', true) },
      },
      {
        text: 'Some habits become character — you are not sure you want to change it',
        tag: null,
        outcome: 'It served you. It costs something in this different life. You have not decided what to do about that.',
        effect: (p) => { p.r += 3; p.m -= 2; p.setMem('ft23AuthVetMidlife', true) },
      },
    ],
  },

  {
    id: 'ft23_authoritarian_veteran_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('authoritarian_veteran') &&
      G.age >= 62 &&
      !G.mem?.ft23AuthVetLate,
    text: 'When you think about the years under that system, you count the things you did not say and the things you did. You chose compliance more than once. You chose it for reasons that still seem like reasons. The world you live in now does not require those choices. You are still sorting out which habits were responses to that world and which became you.',
    choices: null,
    effect: (p) => { p.e += 4; p.r += 4; p.setMem('ft23AuthVetLate', true) },
  },

  // ── PAID BRIBE ───────────────────────────────────────────────────────────────
  // The first bribe, and what it became.

  {
    id: 'ft23_paid_bribe_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('paid_bribe') &&
      !G.mem?.ft23BribeEcho,
    text: 'The first time you paid it was a specific amount to a specific person in a specific situation. Since then the transactions have not been dramatic — a small amount at a checkpoint, an expedited document, a look that everyone in the room understands. You have become fluent in a system you did not build and cannot avoid. You think about the people who built it sometimes.',
    choices: [
      {
        text: 'You have made a point of refusing since — you are not going to be that person',
        tag: null,
        outcome: 'Some things move slower. The refusal has cost you time and occasionally more than time. You have decided this is the correct cost.',
        effect: (p) => { p.karma += 8; p.m -= 3; p.setMem('ft23BribeEcho', true) },
      },
      {
        text: 'The system works this way — you work within it',
        tag: null,
        outcome: 'Not proud of it. Not exactly ashamed. Fluent.',
        effect: (p) => { p.r += 5; p.karma -= 3; p.setMem('ft23BribeEcho', true) },
      },
    ],
  },

  // ── DEMOCRACY MOVEMENT ───────────────────────────────────────────────────────
  // What happened to the people who joined the movement.

  {
    id: 'ft23_democracy_movement_decade',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('democracy_movement') &&
      !G.mem?.ft23DemocDecade,
    text: 'A decade on from the movement, you look at what it produced. Some things changed. Some things that were supposed to change did not. People who were in the streets with you have taken different paths: a few became politicians, a few became cynics, a few kept going in the same direction. The cause is still there. What you believe about its chances has adjusted.',
    choices: [
      {
        text: 'Still committed — the change is slow, not absent',
        tag: null,
        outcome: 'You are still in it. The energy is different — more patient, more strategic. Less like a wave and more like a long push.',
        effect: (p) => { p.m += 6; p.karma += 5; p.setMem('ft23DemocDecade', true) },
      },
      {
        text: 'You have stepped back — the personal cost became too high',
        tag: null,
        outcome: 'You have not abandoned the beliefs. You have abandoned the exposure. You are not sure those are different things.',
        effect: (p) => { p.r += 5; p.m -= 3; p.setMem('ft23DemocDecade', true) },
      },
    ],
  },

  {
    id: 'ft23_democracy_movement_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('democracy_movement') &&
      G.age >= 60 &&
      !G.mem?.ft23DemocLate,
    text: 'There are younger people asking you what it was like. You are now one of the people who were there when it mattered. The account you give is honest but selected — you leave out the fear, partly because it is hard to describe, and partly because you do not want to discourage them. The younger people are more optimistic than you were at their age. You are not sure if that is naivety or if something has genuinely changed.',
    choices: null,
    effect: (p) => { p.m += 7; p.karma += 4; p.e += 3; p.legacy += 5; p.setMem('ft23DemocLate', true) },
  },

  // ── CONSIDERING EMIGRATION ───────────────────────────────────────────────────
  // The consideration that didn't resolve into a decision.

  {
    id: 'ft23_considering_emigration_returns',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('considering_emigration') &&
      !G.flags.has('expat') &&
      !G.mem?.ft23ConsidEmig,
    text: 'You thought about leaving. You had reasons. The reasons are still there, more or less. The life has continued here, which means the decision — to go or stay — became a kind of default rather than a choice. You are still not sure that is the same as having decided.',
    choices: [
      {
        text: 'You have made peace with staying — this is your life',
        tag: null,
        outcome: 'You stopped looking at that particular horizon. The life here is real and yours.',
        effect: (p) => { p.m += 6; p.r -= 3; p.setMem('ft23ConsidEmig', true) },
      },
      {
        text: 'You still think about it — the possibility is not closed',
        tag: null,
        outcome: 'You carry it as a live question. This is tiring. It also keeps something open.',
        effect: (p) => { p.m -= 2; p.r += 3; p.setMem('ft23ConsidEmig', true) },
      },
    ],
  },

  // ── RADIO CHILDHOOD ──────────────────────────────────────────────────────────
  // The specific nostalgia of a pre-television information world.

  {
    id: 'ft23_radio_childhood_memory',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('radio_childhood') &&
      G.age >= 55 &&
      !G.mem?.ft23RadioMemory,
    text: 'You learned to read the world through a speaker — the specific sound of a particular broadcaster\'s voice, the way the whole family oriented toward the set at the same hour. The news arrived as sound, which meant it arrived as presence. You could not watch it happen. You could only hear it described, which gave it a particular quality — closer to story, further from spectacle. You are not sure that was worse.',
    choices: null,
    effect: (p) => { p.m += 7; p.e += 3; p.setMem('ft23RadioMemory', true) },
  },

  // ── SIBLING RECONCILED ───────────────────────────────────────────────────────
  // Years after the reconciliation — what it became.

  {
    id: 'ft23_sibling_reconciled_settled',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('sibling_reconciled') &&
      !G.mem?.ft23SibReconciled,
    text: 'The reconciliation happened. You said what needed to be said, or most of it. The relationship since has been careful at the edges but present. You see them at the right occasions. There are things you don\'t discuss, which is different from not being able to discuss them — more like choosing the same conversation you always have, which is a kind of love.',
    choices: null,
    effect: (p) => { p.m += 8; p.setMem('ft23SibReconciled', true) },
  },

  // ── EARTHQUAKE SURVIVOR ──────────────────────────────────────────────────────
  // Years after — the body memory, the rebuilding.

  {
    id: 'ft23_earthquake_survivor_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('earthquake_survivor') &&
      !G.mem?.ft23EarthquakeEcho,
    text: 'The ground moved once when you did not expect it to. Years later, certain sounds — a truck on a rough road, something heavy dropped in another room — produce a response in your body before your mind catches up. You are not frightened. Your nervous system has its own record of events, and it is not finished with the accounting.',
    choices: null,
    effect: (p) => { p.e += 3; p.r += 2; p.setMem('ft23EarthquakeEcho', true) },
  },

  {
    id: 'ft23_earthquake_survivor_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('earthquake_survivor') &&
      G.age >= 58 &&
      !G.mem?.ft23EarthquakeLate,
    text: 'You think sometimes about what was standing before and what is standing now. Some of it was rebuilt. Some of it was replaced with something different. Some of it is still rubble or the space where rubble was cleared. A city after an earthquake has two layers — the one that exists and the one it replaced — and you can read both of them at once, which people who arrived after cannot do.',
    choices: null,
    effect: (p) => { p.m += 6; p.e += 4; p.setMem('ft23EarthquakeLate', true) },
  },

]
