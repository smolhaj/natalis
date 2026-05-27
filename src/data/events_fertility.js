// events_fertility.js
// Pregnancy and fertility arc events: miscarriage, IVF, childlessness choice,
// late pregnancy complications. Gate on gender, age, children, partner, country.

export const FERTILITY_EVENTS = [

  // ── MISCARRIAGE ──────────────────────────────────────────────────────────────

  {
    id: 'fertility_miscarriage',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem.fertilityMiscarriage &&
      G.character.gender === 'female' &&
      G.partner &&
      G.age >= 22 && G.age <= 38 &&
      G.flags.includes('trying_for_child'),
    text: 'You are eight weeks in when it ends. The clinic is matter-of-fact and kind, which is the correct combination. Your partner drives home. You do not talk much in the car. At home you sit together on the sofa for a long time. Later — days later — you will learn that it is very common. The commonness is both real and irrelevant to the specific weight of it.',
    choices: [
      {
        text: 'Grieve it properly, together',
        tag: null,
        outcome: 'You give it the space it needs. Your partner does too. The loss sits between you and does not divide you.',
        effect: (p) => { p.m -= 22; p.r += 8; p.addFlag('experienced_miscarriage'); p.partnerRel(8); p.setMem('fertilityMiscarriage', true) },
      },
      {
        text: 'Move forward — get the timing right and try again',
        tag: null,
        outcome: 'The trying-again becomes its own kind of weight. The grief stays compressed, waiting.',
        effect: (p) => { p.m -= 15; p.r += 12; p.h -= 5; p.addFlag('experienced_miscarriage'); p.setMem('fertilityMiscarriage', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'fertility_miscarriage_late',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem.fertilityMiscarriageLate &&
      G.character.gender === 'female' &&
      G.partner &&
      G.age >= 35 && G.age <= 42 &&
      G.flags.includes('trying_for_child'),
    text: 'The second time, you know what the signs mean. You do not tell anyone you were pregnant again. That means you cannot tell anyone you have lost it again. The silence is its own kind of grief — private and unwitnessed and somehow worse for that.',
    choices: [
      {
        text: 'Tell your partner — they should know',
        tag: null,
        outcome: 'You tell them. They sit with you. The sharing does not fix it but it changes what it is.',
        effect: (p) => { p.m -= 18; p.r += 10; p.addFlag('multiple_miscarriage'); p.partnerRel(6); p.setMem('fertilityMiscarriageLate', true) },
      },
      {
        text: 'Carry it privately',
        tag: null,
        outcome: 'You manage it alone. The management costs more than you expected.',
        effect: (p) => { p.m -= 25; p.r += 15; p.h -= 6; p.addFlag('multiple_miscarriage'); p.setMem('fertilityMiscarriageLate', true) },
      },
    ],
    effect: null,
  },

  // ── IVF / FERTILITY TREATMENT ─────────────────────────────────────────────────

  {
    id: 'fertility_ivf_consideration',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem.fertilityIvfConsideration &&
      G.character.gender === 'female' &&
      G.partner &&
      G.children.length === 0 &&
      G.age >= 32 && G.age <= 40 &&
      G.flags.includes('trying_for_child') &&
      (G.character.country.archetype === 'wealthy_west' || G.character.country.archetype === 'wealthy_east' || G.money > 20000),
    text: 'The fertility specialist lays out the options. IVF is the recommendation — the success rate at your age, per cycle, is approximately thirty percent. The cost is approximately fifteen thousand per cycle. Insurance covers none of it. He says most couples need two or three rounds. He says this in the same tone he uses for everything else.',
    choices: [
      {
        text: 'Start the first cycle',
        tag: null,
        outcome: 'The hormones change everything. You are tired and emotional and hopeful in a very specific, carefully managed way. You give yourself permission to want this.',
        effect: (p) => { p.m -= 10; p.h -= 8; p.mo -= 15000; p.addFlag('ivf_attempt'); p.setMem('fertilityIvfConsideration', true) },
      },
      {
        text: 'Try for one more natural cycle first',
        tag: null,
        outcome: 'You give it three months. Then you make the appointment.',
        effect: (p) => { p.m -= 5; p.addFlag('ivf_considering'); p.setMem('fertilityIvfConsideration', true) },
      },
      {
        text: 'It\'s not something you want to put your body through',
        tag: null,
        outcome: 'The decision settles something. The grief of the decision is a different grief from before.',
        effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('ivf_declined'); p.setMem('fertilityIvfConsideration', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'fertility_ivf_outcome',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem.fertilityIvfOutcome &&
      G.flags.includes('ivf_attempt'),
    text: 'The clinic calls with the result. You are somewhere ordinary when the call comes — a car, a kitchen, a corridor at work. The phone is cold in your hand.',
    choices: [
      {
        text: 'The cycle worked',
        tag: null,
        outcome: 'The relief is enormous and also cautious — you have learned to be cautious. The pregnancy test is a line, and the line is real, and you hold it for a long time before you call anyone.',
        effect: (p) => { p.m += 28; p.r -= 10; p.addFlag('ivf_success'); p.addFlag('pregnant'); p.setMem('fertilityIvfOutcome', true) },
      },
      {
        text: 'The cycle failed',
        tag: null,
        outcome: 'The specialist explains what to try next. You listen carefully and hear none of it. You call your partner from the car park.',
        effect: (p) => { p.m -= 22; p.r += 14; p.h -= 5; p.addFlag('ivf_failed'); p.setMem('fertilityIvfOutcome', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'fertility_traditional_remedy',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem.fertilityTraditionalRemedy &&
      G.character.gender === 'female' &&
      G.children.length === 0 &&
      G.age >= 26 && G.age <= 38 &&
      G.flags.includes('trying_for_child') &&
      ['subsaharan', 'developing_unstable', 'developing_urban'].includes(G.character.country.archetype),
    text: (G) => {
      return `An older woman in the family takes you aside. She knows someone — a healer, a specific prayer, a preparation that has worked for others. The clinic option exists in ${G.currentCountry?.name ?? G.character.country.name} but it is very far and very expensive. This option is available now and costs the price of belief.`
    },
    choices: [
      {
        text: 'Follow the traditional path — it is what your family does',
        tag: null,
        outcome: 'The ritual is specific and careful. Whether it helps or not is a question the outcome will not clearly answer. The act of trying with the tools you have is its own kind of answer.',
        effect: (p) => { p.m += 5; p.karma += 4; p.addFlag('fertility_traditional_sought'); p.setMem('fertilityTraditionalRemedy', true) },
      },
      {
        text: 'Seek the clinical option — find a way to make it work',
        tag: null,
        outcome: 'The distance and cost are significant. You make them work. The determination is something to remember.',
        effect: (p) => { p.m -= 5; p.e += 4; p.mo -= 3000; p.addFlag('fertility_clinical_sought'); p.setMem('fertilityTraditionalRemedy', true) },
      },
    ],
    effect: null,
  },

  // ── CHOOSING CHILDLESSNESS ────────────────────────────────────────────────────

  {
    id: 'fertility_childless_choice',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.fertilityChildlessChoice &&
      G.children.length === 0 &&
      G.age >= 28 && G.age <= 38 &&
      !G.flags.includes('trying_for_child'),
    text: 'There is a point at which not deciding is itself a decision. You have watched the people around you have children and you have noticed what they have that you don\'t and what you have that they don\'t. The conversation you are having internally — about what you want your life to be — has been ongoing for years. It arrives at something.',
    choices: [
      {
        text: 'This is not the life you want — and that\'s a complete answer',
        tag: null,
        outcome: 'The decision is clear and quiet. You stop waiting for it to feel different. It does not. The life you are building does not have this particular shape and that is its shape.',
        effect: (p) => { p.m += 8; p.r -= 6; p.addFlag('chose_childless'); p.setMem('fertilityChildlessChoice', true) },
      },
      {
        text: 'You are still not sure — leave it open',
        tag: null,
        outcome: 'The question persists. This is allowed.',
        effect: (p) => { p.m -= 3; p.r += 4; p.setMem('fertilityChildlessChoice', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'fertility_childless_questioned',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.mem.fertilityChildlessQuestioned &&
      G.flags.includes('chose_childless') &&
      G.age >= 38 && G.age <= 50,
    text: 'Your mother asks, for the last time you will allow, whether you have changed your mind. You tell her that you haven\'t. There is a pause in which you can hear her reassessing something. Then she says she hopes you are happy. You tell her that you are. The conversation ends. You sit with what it cost to say it and whether the cost was worth it and decide that it was.',
    choices: null,
    effect: (p) => { p.m += 6; p.r -= 5; p.karma += 3; p.setMem('fertilityChildlessQuestioned', true) },
  },

  // ── LATE PREGNANCY COMPLICATIONS ─────────────────────────────────────────────

  {
    id: 'fertility_late_pregnancy',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem.fertilityLatePregnancy &&
      G.character.gender === 'female' &&
      G.partner &&
      G.age >= 36 && G.age <= 44 &&
      G.flags.includes('trying_for_child'),
    text: 'The obstetrician flags it at the twelve-week scan — the pregnancy is higher risk at this age, with this particular finding. She says the word "monitoring" several times. The monitoring is thorough and the pregnancy proceeds. You carry a specific kind of anxiety for twenty-six weeks that has no name and no resolution until there is a resolution.',
    choices: [
      {
        text: 'Follow every recommendation precisely',
        tag: null,
        outcome: 'The monitoring is relentless and the delivery is difficult and the child is healthy. You do not forget a single day of the wait.',
        effect: (p) => { p.m -= 15; p.h -= 8; p.addFlag('high_risk_pregnancy'); p.addFlag('pregnant'); p.setMem('fertilityLatePregnancy', true) },
      },
      {
        text: 'Monitor carefully but try to live normally',
        tag: null,
        outcome: 'The balance is imperfect. The anxiety is constant but not disabling. The pregnancy continues.',
        effect: (p) => { p.m -= 10; p.h -= 5; p.addFlag('high_risk_pregnancy'); p.addFlag('pregnant'); p.setMem('fertilityLatePregnancy', true) },
      },
    ],
    effect: null,
  },

]
