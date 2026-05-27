// events_education_arc.js
// University depth events: choosing a major, academic failure, a professor who mattered,
// dropping out, student debt becoming real, the gap between the degree and the job.

export const EDUCATION_ARC_EVENTS = [

  // ── FIRST YEAR ───────────────────────────────────────────────────────────────

  {
    id: 'edu_first_week',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.includes('university_enrolled') && G.age >= 18 && G.age <= 20 && !G.mem.eduFirstWeek,
    text: 'The first week of university is a great deal of paperwork followed by a great deal of people performing confidence they do not have. You perform yours. Somewhere in the middle of the second day, in a corridor between two buildings, you notice that nobody here knows who you were before.',
    choices: null,
    effect: (p) => { p.m += 8; p.s += 4; p.e += 3; p.setMem('eduFirstWeek', true) },
  },

  {
    id: 'edu_professor_who_matters',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('university_enrolled') && G.age >= 19 && G.age <= 23 && !G.mem.eduProfessor,
    text: 'One lecturer is different in a way that is hard to name at the time. They are not kind in a performing way. They assign more than is comfortable and do not soften the feedback. But the question they ask on a Tuesday morning in the second year stays with you for the rest of your education and, it turns out, much longer than that.',
    choices: null,
    effect: (p) => { p.e += 8; p.m += 6; p.addFlag('formative_teacher'); p.setMem('eduProfessor', true) },
  },

  {
    id: 'edu_academic_failure',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('university_enrolled') && G.age >= 19 && G.age <= 22 &&
      (G.stats.smarts ?? 50) < 55 && !G.mem.eduAcademicFailure,
    text: 'You fail an examination. Not narrowly — actually fail. The mark is returned with red ink in specific places. You sit with it for a day. The version of yourself that sailed through school meets the version that university is making.',
    choices: [
      {
        text: 'Attend the resit and take it seriously',
        tag: null,
        outcome: 'You pass the resit. The process of preparing for it teaches you something the first attempt did not.',
        effect: (p) => { p.e += 6; p.m -= 5; p.setMem('eduAcademicFailure', true) },
      },
      {
        text: 'Accept the grade and move on — everyone fails something',
        tag: null,
        outcome: 'The grade stays on your transcript. You carry it as a specific piece of information about your own limits.',
        effect: (p) => { p.m -= 8; p.r += 5; p.gpa -= 0.15; p.setMem('eduAcademicFailure', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'edu_dropout_temptation',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.includes('university_enrolled') && G.age >= 20 && G.age <= 22 &&
      (G.stats.happiness ?? 50) < 45 && !G.mem.eduDropout,
    text: 'You are midway through the second year and the degree is not yet making sense as a direction. The work is not interesting. The debt is accumulating. A friend who left at eighteen is earning and seems content. You make a calculation that involves several unknowns.',
    choices: [
      {
        text: 'Stay — you are too close to quit',
        tag: null,
        outcome: 'You stay. The third year is different. Whether that was the right call becomes clear eventually.',
        effect: (p) => { p.e += 4; p.m += 3; p.setMem('eduDropout', true) },
      },
      {
        text: 'Leave — the money and the time are better used elsewhere',
        tag: null,
        outcome: 'You withdraw. The relief is immediate. The long-term calculation takes years to assess.',
        effect: (p) => { p.m += 6; p.r += 5; p.addFlag('dropped_out'); p.setMem('eduDropout', true) },
      },
    ],
    effect: null,
  },

  // ── GRADUATION AND AFTERMATH ─────────────────────────────────────────────────

  {
    id: 'edu_graduation_debt',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.education?.level === 'university' && G.age >= 22 && G.age <= 25 &&
      ['wealthy_west'].includes(G.character.country.archetype) && !G.mem.eduGradDebt,
    text: 'The certificate is real. The debt is also real — a specific number that arrives in a letter about two months after graduation, when the ceremony photographs have been looked at fewer times. You get a job. The first paycheck has a deduction on it labeled with the name of the loan program.',
    choices: null,
    effect: (p) => { p.mo -= 12000; p.m -= 8; p.r += 5; p.addFlag('student_debt'); p.setMem('eduGradDebt', true) },
  },

  {
    id: 'edu_degree_irrelevant',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.education?.level === 'university' && G.career && G.age >= 24 &&
      G.career.field !== G.education?.field && !G.mem.eduDegreeIrrelevant,
    text: 'Four years of one subject and you are doing something else entirely. Nobody warned you that this is extremely common. You use almost none of the specific content. You use, constantly, the thing the degree actually trained: how to sit with a difficult problem and not immediately solve it.',
    choices: null,
    effect: (p) => { p.e += 5; p.m += 3; p.r += 4; p.setMem('eduDegreeIrrelevant', true) },
  },

  {
    id: 'edu_scholarship_pressure',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('scholarship_won') && G.age >= 19 && G.age <= 22 && !G.mem.eduScholarshipPressure,
    text: 'The scholarship has conditions. Minimum GPA, required attendance, a renewal review every year. You are here because of the number on a form, which means the number on a form matters in a different way than it does for people who are paying for this themselves. The pressure is invisible and permanent.',
    choices: [
      {
        text: 'Embrace the accountability — it keeps you focused',
        tag: null,
        outcome: 'The scholarship holds. You graduate having earned the thing.',
        effect: (p) => { p.e += 6; p.m -= 3; p.setMem('eduScholarshipPressure', true) },
      },
      {
        text: 'Find the conditions suffocating — it changes why you are here',
        tag: null,
        outcome: 'The scholarship becomes associated with obligation rather than opportunity. You get through it.',
        effect: (p) => { p.m -= 8; p.r += 5; p.e += 3; p.setMem('eduScholarshipPressure', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'edu_first_gen_university',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.includes('university_enrolled') &&
      ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.character.country.archetype) &&
      G.age >= 18 && G.age <= 22 && !G.mem.eduFirstGen,
    text: 'You are the first in your family to attend university. This fact is present in every call home, in the particular way your parents say your name when you answer, in the questions they ask that are technically about your studies and actually about whether you are safe and whether you are becoming someone they will still recognize.',
    choices: null,
    effect: (p) => { p.m += 6; p.r += 6; p.e += 5; p.addFlag('first_gen_graduate'); p.setMem('eduFirstGen', true) },
  },

  {
    id: 'edu_graduate_job_gap',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.education?.level === 'university' && !G.career && G.age >= 23 && G.age <= 26 && !G.mem.eduJobGap,
    text: 'The applications go out and are acknowledged and then go quiet. You have a degree that is real and credentials that are correct and you are applying for jobs that two hundred other people with correct credentials are also applying for. You do temporary work and wait.',
    choices: [
      {
        text: 'Keep applying — the right thing will come',
        tag: null,
        outcome: 'After eight months something lands that is not quite right but is a start.',
        effect: (p) => { p.m -= 8; p.e += 3; p.setMem('eduJobGap', true) },
      },
      {
        text: 'Take anything — experience is the priority now',
        tag: null,
        outcome: 'You take a position below what you expected. It teaches you things the degree did not.',
        effect: (p) => { p.m -= 5; p.e += 5; p.setMem('eduJobGap', true) },
      },
    ],
    effect: null,
  },

]
