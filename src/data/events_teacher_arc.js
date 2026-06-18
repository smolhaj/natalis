// events_teacher_arc.js — Deep teacher career arc
//
// The 'teacher' career ID already exists in careers.js.
// These events add personal texture the career system cannot:
// the first classroom, the student who changes you, bureaucracy
// accumulating over years, the letter that arrives years later.
//
// Also covers teaching in resource-poor contexts (complements events_school.js
// which covers the school as institution from the student's side).

const isTeacher = (G) => G.career?.id === 'teacher' || G.flags.has('teacher_career')

export const TEACHER_ARC_EVENTS = [

  {
    id: 'tch_first_classroom',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isTeacher(G) &&
      !G.mem?.tchFirstClassFired,
    text: 'The first class is thirty-two students and you are twenty-three and you have been trained for this and the training, it turns out, is preparation for a general case and this is a specific room. The specific room has its own social structure, its own energies, its own particular child in the back row who is already watching you to see how you handle the child in the second row who is testing you before you have had time to establish the terms. You manage. What you do not manage, you recover from.',
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 2; p.s += 3; p.addFlag('teacher_first_classroom'); p.setMem('tchFirstClassFired', true) },
  },

  {
    id: 'tch_the_student',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isTeacher(G) &&
      G.flags.has('teacher_first_classroom') &&
      !G.mem?.tchStudentFired,
    text: 'There is a student who is different. Not the easiest student — often the hardest one, the one with the home situation that arrives in the classroom every day before the student does. You spend more time than the timetable accounts for. You adjust the approach. Something shifts. It is not dramatic — there is no specific moment that you could point to. But the shift is real, and you know it is real, and the student knows it, and neither of you says it directly, because that\'s not how this particular thing works.',
    choices: null,
    effect: (p) => { p.m += 8; p.karma += 8; p.addFlag('teacher_that_student'); p.setMem('tchStudentFired', true) },
  },

  {
    id: 'tch_bureaucracy',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isTeacher(G) &&
      G.age >= 30 &&
      !G.mem?.tchBureauFired,
    text: 'The paperwork has expanded to fill the time that used to be for the work. The data entry, the assessments, the standardised reporting on things that resist standardisation, the meetings about meetings about the curriculum that was revised before the previous revision was implemented. The students are the same as they have always been — curious, difficult, specific, worth the effort. The system around the students has become harder to navigate without losing the reason you came into the room in the first place.',
    choices: [
      {
        text: 'Adapt — find ways to protect the classroom from the system',
        tag: null,
        outcome: 'The workarounds accumulate. You become skilled at satisfying the paperwork quickly enough to have something left for the actual work. This is its own professional knowledge.',
        effect: (p) => { p.m -= 5; p.e += 3; p.addFlag('teacher_bureaucracy_survived'); p.setMem('tchBureauFired', true) },
      },
      {
        text: 'Push back — this is not what schools are for',
        tag: null,
        outcome: 'The pushing back costs something and changes very little. You become known as someone with opinions. This is sometimes useful.',
        effect: (p) => { p.m -= 8; p.s += 2; p.addFlag('teacher_advocate'); p.setMem('tchBureauFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'tch_difficult_parent',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isTeacher(G) &&
      !G.mem?.tchParentFired,
    text: 'The parent arrives with a grievance and a certainty about the grievance that does not accommodate any version of events other than the version the child reported at home. You have the other version, and the grade book, and the pattern of behaviour, and the record. The conversation is one of the specific challenges of the job that the training did not fully address: the parent who loves their child too specifically to see them clearly, and the child watching to see what happens when two adults in authority disagree.',
    choices: null,
    effect: (p) => { p.m -= 5; p.s += 2; p.addFlag('teacher_parent_conflict'); p.setMem('tchParentFired', true) },
  },

  {
    id: 'tch_the_letter',
    phase: 'midlife',
    weight: 8,
    when: (G) =>
      isTeacher(G) &&
      G.flags.has('teacher_that_student') &&
      G.age >= 35 &&
      !G.mem?.tchLetterFired,
    text: 'The letter arrives, or the message, or the person appears at the back of a room. The student who was difficult, the one you spent the extra time on fifteen years ago — they have located you to say what students rarely say at the time: that it mattered. What you did mattered. The specific thing you said in the specific moment. They have carried it for fifteen years and wanted you to know. You had forgotten the moment. They had not.',
    choices: null,
    effect: (p) => { p.m += 18; p.r -= 8; p.addFlag('teacher_letter_received'); p.setMem('tchLetterFired', true); p.legacy += 8 },
  },

  {
    id: 'tch_resource_poor',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isTeacher(G) &&
      (G.currentCountry?.gdp === 'low' || G.currentCountry?.gdp === 'very_low' || G.currentCountry?.gdp === 'low_medium') &&
      !G.mem?.tchResourceFired,
    text: 'The school has one textbook per three students. The textbook is eight years old. The chalk is your own — bought from the market on the way in. The roof of the second classroom has a section where rain comes through and during the long rains the section moves. You teach around it. The students who want to learn are learning. What they are learning with is the minimum. What you are providing, between the minimum and what they deserve, is your own energy. The subtraction is steady.',
    choices: null,
    effect: (p) => { p.m -= 5; p.h -= 3; p.karma += 10; p.addFlag('teacher_resource_poor'); p.setMem('tchResourceFired', true) },
  },

  {
    id: 'tch_late_career',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isTeacher(G) &&
      G.age >= 45 &&
      !G.mem?.tchLateCareerFired,
    text: 'The students are now younger than your own children, if you have children, or younger than you were when you started. You have taught the same subject enough times that it is no longer a performance — it is something closer to conversation, and the conversation has depth in it that the first version did not. The new teachers look to you, occasionally, for the thing that is not in the training: how to survive the third week of March when everything is hard, how to still find the particular student worth the particular effort.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 2; p.addFlag('teacher_late_career'); p.setMem('tchLateCareerFired', true) },
  },

  {
    id: 'tch_retirement',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isTeacher(G) &&
      G.age >= 60 &&
      !G.mem?.tchRetirementFired,
    text: 'The last class. The students applaud — the ritual of it — and the applause is genuine and also marks the end of something that has been the primary structure of your adult life for thirty-five years. You clear the desk. There are materials in the drawers that go back to the nineties. You leave a box for the next person. The classroom is already the next person\'s classroom. The hallway on the way out is the same hallway as always, and you are not the same person who walked into it the first time, and neither of those things is a simple thing to carry.',
    choices: null,
    effect: (p) => { p.m += 6; p.r += 5; p.addFlag('teacher_retired'); p.setMem('tchRetirementFired', true) },
  },

  {
    id: 'tch_life_accounting',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      G.flags.has('teacher_retired') &&
      !G.mem?.tchLifeAccountFired,
    text: 'The accounting of a teaching life is not done in salary — the salary was what it was, and it was not the reason. It is done in the names you still remember, the moments that were the actual work, the student who wrote the letter, the slow dawning on a face when the concept finally arrived. These are not recorded anywhere. They exist in you, and they are not measurable, and they are the measure.',
    choices: null,
    effect: (p) => { p.m += 10; p.r -= 5; p.karma += 5; p.addFlag('teacher_life_accounted'); p.setMem('tchLifeAccountFired', true); p.legacy += 10 },
  },

]
