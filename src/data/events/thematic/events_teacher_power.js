export const TEACHER_POWER_EVENTS = [
  // ── PART A: Teacher in a poor country arc ─────────────────────────────────

  {
    id: 'tpc_rural_posting',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.career?.id === 'teacher' &&
      ['developing_urban', 'developing_unstable', 'subsaharan', 'conflict_zone'].includes(G.character.country?.archetype) &&
      G.currentYear >= 1960 &&
      G.age >= 22 && G.age <= 35 &&
      !G.mem?.tpcRuralPosting,
    text: `The posting is to a school two hours from the nearest town on a road that becomes a river in rainy season. The village has a headman, a market every Thursday, and a school with three classrooms and a corrugated iron roof that amplifies the rain. You are the highest social status in the village. You earn the lowest salary in the district. Both of these things are true at the same time.`,
    choices: null,
    effect: (p) => {
      p.m += 6;
      p.e += 4;
      p.addFlag('rural_teacher');
      p.setMem('tpcRuralPosting', true);
    },
  },

  {
    id: 'tpc_no_textbooks',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.has('rural_teacher') &&
      !G.mem?.tpcNoBooks,
    text: `There are thirty-two students and six textbooks. You write the lesson on the board. The chalk runs out in March and the replacement order, submitted in January, arrives in October. By then you have been writing on the board with a stick of charcoal for seven months, which works well enough but turns your hands grey by afternoon. The students have learned to read your writing in charcoal. They do not complain about it. They take what they are given because what they are given is what there is.`,
    choices: null,
    effect: (p) => {
      p.m -= 6;
      p.e += 3;
      p.addFlag('teacher_improviser');
      p.setMem('tpcNoBooks', true);
    },
  },

  {
    id: 'tpc_exceptional_student',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('rural_teacher') &&
      !G.mem?.tpcExStudent,
    text: `She has read every book in the school three times. You can see it in the way she waits for the question before you finish asking it — not impatience, something more specific than that. You write a letter to the district education office about a scholarship. The office acknowledges receipt. Six months later, a second letter arrives to say the deadline for that scholarship passed in April. You write the letter in February. The reply came in November.`,
    choices: [
      {
        text: 'Find another way. Write to the secondary school directly, to the NGO, to anyone.',
        tag: 'find_way',
        outcome: `It takes two years. Something is found — a church bursary, a part-scholarship, something. She goes.`,
        effect: (p) => {
          p.e += 5;
          p.karma += 8;
          p.m -= 6;
          p.addFlag('fought_for_student');
          p.setMem('tpcExStudent', true);
        },
      },
      {
        text: 'Tell her the truth. The system did not work and you cannot fix it.',
        tag: 'truth',
        outcome: `You tell her. She listens without crying, which is worse than if she had cried. She stays in the village. You don't know what she does with what she knows.`,
        effect: (p) => {
          p.m -= 10;
          p.r += 6;
          p.setMem('tpcExStudent', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'tpc_inspection_day',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('rural_teacher') &&
      G.age >= 30 && G.age <= 50 &&
      !G.mem?.tpcInspection,
    text: `Two men arrive from the district office with clipboards and government shirts. You have spent a week preparing. The classroom with no roof in the rainy season has a temporary tarpaulin; you borrowed it from the headman. The textbook count is laid out carefully. The men write things down with a focus that suggests the writing is the point, not the school. They leave after two hours without saying anything evaluative. A report will be sent, they say. It is sent to the district, not to you.`,
    choices: null,
    effect: (p) => {
      p.m -= 8;
      p.r += 4;
      p.setMem('tpcInspection', true);
    },
  },

  {
    id: 'tpc_salary_delayed',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('rural_teacher') &&
      G.age >= 28 && G.age <= 50 &&
      !G.mem?.tpcSalary,
    text: `Four months without salary. The explanation from the district is that the payroll forms were lost in a processing transition, which is either true or a particular kind of lie that cannot be proven to be a lie. Your students come every morning. You teach every morning. The headman's wife brings you yams twice a week without being asked to. You are not sure whether this is dignity or something you do not have a word for yet — the state you are in when the work continues after the reason to do it has been removed.`,
    choices: null,
    effect: (p) => {
      p.mo -= 1200;
      p.m -= 10;
      p.addFlag('taught_unpaid');
      p.setMem('tpcSalary', true);
    },
  },

  {
    id: 'tpc_student_returns',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('rural_teacher') &&
      G.age >= 55 &&
      !G.mem?.tpcReturn,
    text: `A car pulls up outside the school you still teach in. The student you remember as a child — the one who always sat in front, who waited before speaking — steps out in a suit. He is a doctor now, at the city hospital. He has driven four hours specifically to find you. He does not come in for long. He stands in the courtyard of the school, which has not changed, and says what he came to say. You do not know what to do with it, which is not the same as not being glad.`,
    choices: null,
    effect: (p) => {
      p.m += 20;
      p.karma += 12;
      p.r -= 8;
      p.setMem('tpcReturn', true);
    },
  },

  {
    id: 'tpc_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('rural_teacher') &&
      G.age >= 65 &&
      !G.mem?.tpcLate,
    text: `You count the students. Over forty years, roughly twelve hundred children sat in front of you. You don't know most of what happened to them. Some stayed in the village. Some left and didn't come back. A few came back to say something. The ones you remember most are not always the ones who made the most of what you gave them — sometimes it's the one who sat in the back and said nothing, about whom you wonder still.`,
    choices: null,
    effect: (p) => {
      p.m += 12;
      p.r += 6;
      p.karma += 8;
      p.setMem('tpcLate', true);
    },
  },

  // ── PART B: Child of power arc ────────────────────────────────────────────

  {
    id: 'cop_birth_privilege',
    phase: 'early_childhood',
    weight: 3,
    when: (G) =>
      ['developing_unstable', 'subsaharan', 'post_soviet'].includes(G.character.country?.archetype) &&
      G.stats.wealth >= 70 &&
      G.age >= 4 && G.age <= 10 &&
      G.currentYear >= 1955 && G.currentYear <= 1995 &&
      !G.mem?.copBirth,
    text: `Your father's photograph is on the wall of the district office. You learn this because someone mentions it in front of you and another person nods in a way that means they already knew. At school, the teacher's manner is different with you than with the other children — not unkind, the opposite. A particular kind of careful. You are four or six or eight years old. You do not know what to do with the difference, but you notice it.`,
    choices: null,
    effect: (p) => {
      p.w += 5;
      p.addFlag('child_of_power');
      p.setMem('copBirth', true);
    },
  },

  {
    id: 'cop_the_doors',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.flags.has('child_of_power') &&
      G.age >= 14 && G.age <= 25 &&
      !G.mem?.copDoors,
    text: `The scholarship that others competed for and didn't get. The university place that came through quickly. The job that appeared without advertisement. Nobody says why. Your father doesn't explain and you don't ask. The people around you notice. Whether they say so depends on what your father is in a position to do for them. You notice that they notice.`,
    choices: null,
    effect: (p) => {
      p.w += 8;
      p.e += 5;
      p.m += 4;
      p.setMem('copDoors', true);
    },
  },

  {
    id: 'cop_what_power_costs',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('child_of_power') &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem?.copCosts,
    text: `You learn, gradually, where the salary comes from. Not from his work exactly, but from the contracts he controls, the land he signs off, the import licences that pass through his office and stop at the right desk. You have always lived well. You now understand the mechanism of it. The mechanism is not unusual. It is how things work. You have to decide what you think that means.`,
    choices: [
      {
        text: 'Look away. This is how things work. You did not build the system.',
        tag: 'look_away',
        outcome: `You continue inside the system. Its logic is coherent as long as you don't ask about the foundation.`,
        effect: (p) => {
          p.w += 5;
          p.r += 8;
          p.addFlag('benefited_from_system');
          p.setMem('copCosts', true);
        },
      },
      {
        text: 'You cannot look away. Not now that you can see it clearly.',
        tag: 'cannot_look_away',
        outcome: `You remove yourself from the closest parts of it. This costs something and earns something else.`,
        effect: (p) => {
          p.m -= 12;
          p.karma += 10;
          p.addFlag('refused_privilege');
          p.setMem('copCosts', true);
        },
      },
    ],
    effect: null,
  },

  {
    id: 'cop_the_fall',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.flags.has('child_of_power') &&
      G.age >= 25 && G.age <= 45 &&
      !G.mem?.copFall,
    text: `The call comes at six in the morning. Your father has been removed — that is the word they use, removed — from his position. By evening the car that was his office's car is gone. The photograph in the district office has been replaced with someone else's photograph. The scholarship you didn't need to apply for, the door that opened without explanation: you understand now what those things were built on. You understand because it is not there anymore.`,
    choices: null,
    effect: (p) => {
      p.w -= 20;
      p.mo -= 5000;
      p.m -= 20;
      p.addFlag('power_fell');
      p.setMem('copFall', true);
    },
  },

  {
    id: 'cop_after_the_fall',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('power_fell') &&
      G.age >= 35 && G.age <= 60 &&
      !G.mem?.copAfterFall,
    text: `You have rebuilt something. It is smaller than what you had and it is yours in a different way — earned through something other than the photograph on the wall. The distance between the two versions of your life is one phone call, one morning, one change in who holds which office. You know this in a way that people who have not lived both versions do not know it.`,
    choices: null,
    effect: (p) => {
      p.m += 8;
      p.r += 6;
      p.karma += 6;
      p.setMem('copAfterFall', true);
    },
  },
];
