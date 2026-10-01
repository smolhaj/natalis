export const TEACHER_POWER_EVENTS = [
  // ── PART A: Teacher in a poor country arc ─────────────────────────────────

  {
    id: 'tpc_rural_posting',
    phase: null,
    weight: 4,
    when: (G) =>
      G.career?.id === 'teacher' &&
      ['developing_urban', 'developing_unstable', 'subsaharan', 'conflict_zone'].includes(G.character.country?.archetype) &&
      G.currentYear >= 1960 &&
      G.age >= 22 && G.age <= 35 &&
      !G.mem?.tpcRuralPosting,
    text: `The posting is to a school two hours from the nearest town on a road that becomes a river in rainy season. The village has a headman, a market every Thursday, and a school with three classrooms and a corrugated iron roof that amplifies the rain. You are the highest social status in the village. You earn the lowest salary in the district.`,
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
    text: `Thirty-two students and six textbooks. The chalk runs out in March; the replacement ordered in January arrives in October. In between you write the lesson in charcoal, which works and turns your hands grey by afternoon. The students learn to read it without complaint. They take what they are given because it is what there is.`,
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
    text: `She has read every book in the school three times, and she has the answer before you finish asking. In February you write to the district office about a scholarship for her. The office acknowledges receipt. In November a second letter comes to say the deadline passed in April.`,
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
    text: `Two men arrive from the district office with clipboards and government shirts. You spent a week getting ready: a tarpaulin borrowed from the headman over the roofless room, the textbooks counted and laid out. The men write with great attention, as if the writing were the point. They leave after two hours without saying what they thought. The report goes to the district, not to you.`,
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
    text: `Four months without salary. The explanation from the district is that the payroll forms were lost in a processing transition, which is either true or a kind of lie that cannot be proven to be a lie. Your students come every morning. You teach every morning. The headman's wife brings you yams twice a week without being asked to. You are not sure whether this is dignity or something you do not have a word for yet — the state you are in when the work continues after the reason to do it has been removed.`,
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
    text: `A car stops outside the school. The boy who sat at the front and waited before he spoke gets out in a suit; he is a doctor at the city hospital now, and he has driven four hours to find you. He stands in the courtyard, which has not changed, and says what he came to say. He does not stay long. You do not know what to do with it, which is not the same as not being glad.`,
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
    text: `Over forty years, about twelve hundred children sat in front of you. You do not know what became of most of them. Some stayed, some left and never came back, a few came back to say something. The ones you think about most are not always the ones who did most with it. Sometimes it is a quiet one from the back row, and you still wonder.`,
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
    phase: null,
    weight: 3,
    when: (G) =>
      ['developing_unstable', 'subsaharan', 'post_soviet'].includes(G.character.country?.archetype) &&
      G.stats.wealth >= 70 &&
      G.age >= 4 && G.age <= 10 &&
      G.currentYear >= 1955 && G.currentYear <= 1995 &&
      !G.mem?.copBirth,
    text: `Your father's photograph is on the wall of the district office. You learn this because someone mentions it in front of you and another person nods; they already knew. At school, the teacher's manner is different with you than with the other children — not unkind, the opposite. A kind of careful. You are four or six or eight years old. You do not know what to do with the difference, but you notice it.`,
    choices: null,
    effect: (p) => {
      p.w += 5;
      p.addFlag('child_of_power');
      p.setMem('copBirth', true);
    },
  },

  {
    id: 'cop_the_doors',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('child_of_power') &&
      G.age >= 14 && G.age <= 25 &&
      !G.mem?.copDoors,
    text: `A scholarship others competed for and did not get. A university place that came through at once. A job nobody advertised. Your father does not explain and you do not ask. People notice, and whether they say so depends on what your father can do for them. You notice them noticing.`,
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
    text: `You learn, slowly, where the money comes from. Not the salary: the contracts he controls, the land he signs for, the import licences that pass through his office and stop at the right desk. You have always lived well. Now you know how it works, and that it is how things work here. You have to decide what you think about that.`,
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
    phase: null,
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
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('power_fell') &&
      G.age >= 35 && G.age <= 60 &&
      !G.mem?.copAfterFall,
    text: `You have rebuilt something. It is smaller than what you had and it is yours in a different way — earned through something other than the photograph on the wall. The distance between the two versions of your life is one phone call, one morning, one change in who holds which office. You know this as people who have not lived both versions do not.`,
    choices: null,
    effect: (p) => {
      p.m += 8;
      p.r += 6;
      p.karma += 6;
      p.setMem('copAfterFall', true);
    },
  },
];
