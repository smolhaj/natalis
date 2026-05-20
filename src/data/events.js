// PLACEHOLDER — will be replaced by agent output
export const EVENTS = [
  {
    id: 'early_lesson',
    phase: 'childhood',
    weight: 3,
    when: () => true,
    text: 'A teacher notices your effort and stays after class to help you.',
    context: null,
    choices: [
      {
        text: 'Stay and learn',
        tag: 'determined_student',
        outcome: 'You absorb more than the lesson.',
        effect: (p) => { p.e += 5; p.m += 3; },
        inject: null,
      },
      {
        text: 'Leave — you have chores at home',
        tag: 'family_first',
        outcome: 'The opportunity passes quietly.',
        effect: (p) => { p.s += 3; },
        inject: null,
      },
    ],
    effect: null,
  },
]
