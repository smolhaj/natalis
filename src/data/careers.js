// PLACEHOLDER — will be replaced by agent output
export const CAREERS = [
  {
    id: 'teacher',
    title: 'Teacher',
    field: 'education',
    levels: [
      { title: 'Teaching Assistant', salaryRange: [22000, 30000] },
      { title: 'Teacher', salaryRange: [32000, 48000] },
      { title: 'Senior Teacher', salaryRange: [48000, 65000] },
      { title: 'Head of Department', salaryRange: [60000, 80000] },
    ],
    requirements: { education: 'university', field: null, minIntelligence: 5, minAge: 22 },
    archetypeAvailable: 'all',
    gdpRequired: 'any',
    promotionChance: 0.12,
    description: 'Educate the next generation.',
    events: [
      {
        id: 'teacher_student_secret',
        phase: 'young_adult',
        weight: 3,
        text: 'A student confides in you about abuse at home. You are legally required to report it, but the family has warned the child of the consequences.',
        choices: [
          {
            text: 'Report it — it is the law and the right thing',
            tag: 'integrity',
            outcome: 'You make the call. The child\'s face stays with you.',
            effect: (p) => { p.m -= 5; },
            inject: null,
          },
          {
            text: 'Talk to the child first, try to handle it quietly',
            tag: 'compassionate',
            outcome: 'You try to protect without the system.',
            effect: (p) => { p.m -= 3; p.s += 2; },
            inject: null,
          },
        ],
        effect: null,
        when: (G) => G.career?.field === 'education',
      },
    ],
  },
  {
    id: 'laborer',
    title: 'Manual Laborer',
    field: 'trade',
    levels: [
      { title: 'Day Laborer', salaryRange: [8000, 15000] },
      { title: 'Skilled Laborer', salaryRange: [15000, 25000] },
      { title: 'Foreman', salaryRange: [25000, 40000] },
    ],
    requirements: { education: 'none', field: null, minIntelligence: null, minAge: 16 },
    archetypeAvailable: 'all',
    gdpRequired: 'any',
    promotionChance: 0.08,
    description: 'Physical work, honest wages.',
    events: [],
  },
]
