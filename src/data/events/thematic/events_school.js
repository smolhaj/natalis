// events_school.js
// BUILD 46 — The School as an Institution
// The school from the inside: resource poverty, the scholarship student, war interruption, the national exam.
// Distinct from events_education_arc.js (university depth) and events_adolescence.js (student identity).

export const SCHOOL_EVENTS = [

  // ── THE CLASSROOM WITHOUT ENOUGH ─────────────────────────────────────────────

  {
    id: 'sch_room_sixty',
    phase: 'childhood',
    weight: 4,
    when: (G) => {
      const arch = G.character.country.archetype
      return (
        (arch === 'subsaharan' || arch === 'developing_urban' || arch === 'developing_unstable') &&
        G.age >= 7 && G.age <= 11 &&
        !G.mem?.schRoomSixty
      )
    },
    text: 'There are sixty children in the classroom. One teacher, one board, no textbooks — only the notebook you share with your cousin. The teacher writes on the board and you copy. You have been doing this since you were old enough to hold a pencil. You do not know yet that this is unusual.',
    choices: null,
    effect: (p) => {
      p.setMem('schRoomSixty', true)
      p.addFlag('resource_poor_school')
    },
  },

  {
    id: 'sch_teacher_unpaid',
    phase: 'childhood',
    weight: 3,
    when: (G) => {
      const arch = G.character.country.archetype
      return (
        G.flags.includes('resource_poor_school') &&
        (arch === 'subsaharan' || arch === 'developing_unstable') &&
        G.age >= 8 && G.age <= 13 &&
        !G.mem?.schTeacherUnpaid
      )
    },
    text: 'The government has not paid the teachers in four months. Two of them stopped coming. Yours did not. You understand this only later — that she walked three kilometres each way, for nothing, because she decided the children were her reason rather than the salary. You did not think to ask why at the time.',
    choices: null,
    effect: (p) => {
      p.e += 3
      p.setMem('schTeacherUnpaid', true)
      p.addFlag('teacher_sacrifice')
    },
  },

  {
    id: 'sch_teacher_sacrifice_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('teacher_sacrifice') &&
      G.age >= 38 &&
      !G.mem?.schTeacherSacrificeEcho,
    text: (G) =>
      `You hear about a teachers' strike on the news — underpaid, under-resourced, threatening to walk out. You think about the woman who walked three kilometres each way for four months with no salary, because your class needed her there. You do not know what happened to her. You have carried her, unnamed, for ${G.age - 10 > 20 ? 'decades' : 'years'}.`,
    choices: null,
    effect: (p) => {
      p.karma += 5
      p.setMem('schTeacherSacrificeEcho', true)
    },
  },

  // ── THE SHARED TEXTBOOK ───────────────────────────────────────────────────────

  {
    id: 'sch_no_books',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.wealthTier <= 1 &&
      G.character.ruralUrban === 'rural' &&
      G.age >= 8 && G.age <= 12 &&
      !G.flags.includes('resource_poor_school') &&
      !G.mem?.schNoBooks,
    text: 'Three children share one textbook. The agreement is that whoever reads slowest holds it. You learn to read fast — not because you are exceptionally clever but because you do not want to be the one holding the book while others wait. Later you will understand this as something that formed you. For now it is just Tuesday.',
    choices: null,
    effect: (p) => {
      p.e += 2
      p.setMem('schNoBooks', true)
      p.addFlag('resource_poor_school')
    },
  },

  // ── THE SCHOLARSHIP STUDENT ───────────────────────────────────────────────────

  {
    id: 'sch_scholarship_arrival',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.stats.smarts >= 60 &&
      G.wealthTier <= 2 &&
      G.age >= 13 && G.age <= 16 &&
      !G.mem?.schScholarshipArrival,
    text: (G) => {
      const isRich = G.character.country.archetype === 'wealthy_west' || G.character.country.archetype === 'wealthy_east'
      return isRich
        ? `The letter comes on a Saturday. A scholarship to a school you have passed on the bus — the one with the playing fields and the cars outside at pickup. Your family reads it twice. You are twelve days away from a different life, and you do not entirely want it.`
        : `The exam results place you in the national secondary school, three towns away. Your family will not be able to visit often. You are the first person in your extended family to go. The suitcase is not large enough for the weight of what they have put inside it.`
    },
    choices: [
      {
        text: 'Accept it — this is what you were aiming for',
        tag: null,
        outcome: 'You take the place. The first week is disorienting in ways you could not have predicted.',
        effect: (p) => {
          p.e += 4
          p.m -= 3
          p.addFlag('scholarship_student')
          p.setMem('schScholarshipArrival', true)
        },
      },
      {
        text: 'The distance feels too large',
        tag: null,
        outcome: 'You decline. The decision is not regretted immediately. It becomes something you carry later.',
        effect: (p) => {
          p.m += 2
          p.r += 6
          p.addFlag('scholarship_declined')
          p.setMem('schScholarshipArrival', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'sch_scholarship_lunch',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.flags.includes('scholarship_student') &&
      G.age >= 13 && G.age <= 17 &&
      !G.mem?.schScholarshipLunch,
    text: 'The uniform fits differently on you than it does on the others — you cannot say how exactly, but you know it. The lunch table is the most legible version of the gap: what they carry in their bags, the names of the places they visited during the school break, the specific vocabulary of people who have never had to think about money. You are here on merit. You are also, clearly, from somewhere else.',
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.e += 3
      p.s += 2
      p.setMem('schScholarshipLunch', true)
      p.addFlag('class_gap_known')
    },
  },

  {
    id: 'sch_scholarship_payoff',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('scholarship_student') &&
      G.age >= 20 && G.age <= 30 &&
      !G.mem?.schScholarshipPayoff,
    text: 'The doors that opened were real. The network, the credential, the specific quality of opportunity — you would not have reached most of it from the school you were zoned for. You are aware of the contingency: one exam, one letter, one family that let you go. You carry this differently than the people beside you who assumed these doors would open.',
    choices: null,
    effect: (p) => {
      p.e += 3
      p.s += 2
      p.m += 7
      p.karma += 4
      p.setMem('schScholarshipPayoff', true)
      p.addFlag('scholarship_opened_doors')
    },
  },

  // ── SCHOOL IN A WAR ZONE ──────────────────────────────────────────────────────

  {
    id: 'sch_war_zone_open',
    phase: 'childhood',
    weight: 4,
    when: (G) => {
      const arch = G.character.country.archetype
      return (
        arch === 'conflict_zone' &&
        G.age >= 6 && G.age <= 12 &&
        !G.mem?.schWarZoneOpen
      )
    },
    text: 'The school is still open. The teacher is still there every morning at seven-thirty. It is an ordinary thing and not an ordinary thing — the classroom is intact, the children arrive, the mathematics lesson proceeds. Some of them have not been home in three weeks. The teacher does not address this.',
    choices: [
      {
        text: 'You go. The routine is the point.',
        tag: null,
        outcome: 'You learn fractions in a city where the tap water runs brown. The routine holds something together.',
        effect: (p) => {
          p.e += 3
          p.m += 2
          p.addFlag('war_school_attended')
          p.setMem('schWarZoneOpen', true)
        },
      },
      {
        text: 'Your family will not send you. The route is too exposed.',
        tag: null,
        outcome: 'The year passes. You keep up with the children who attended, mostly. The gap is not in what you know but in what you missed.',
        effect: (p) => {
          p.e -= 3
          p.r += 3
          p.addFlag('war_school_missed')
          p.setMem('schWarZoneOpen', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'sch_war_year_gap',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.flags.includes('war_school_missed') &&
      G.age >= 13 && G.age <= 17 &&
      !G.mem?.schWarYearGap,
    text: 'The year you missed cannot be reconstructed from borrowed notes. You sit in a classroom now and the lesson assumes knowledge you were supposed to have acquired when you weren\'t there. No one adjusts for the gap; everyone else is working from what they have, and you are working from what remained after the thing that took the year.',
    choices: null,
    effect: (p) => {
      p.e -= 4
      p.m -= 5
      p.r += 4
      p.setMem('schWarYearGap', true)
    },
  },

  // ── THE NATIONAL EXAM ─────────────────────────────────────────────────────────

  {
    id: 'sch_national_exam',
    phase: 'adolescence',
    weight: 4,
    when: (G) => {
      const arch = G.character.country.archetype
      return (
        (arch === 'developing_urban' || arch === 'subsaharan' || arch === 'post_soviet' || arch === 'wealthy_east') &&
        G.age >= 16 && G.age <= 18 &&
        !G.mem?.schNationalExam
      )
    },
    text: (G) => {
      const arch = G.character.country.archetype
      if (arch === 'wealthy_east') {
        return `The exam that determines your university placement, your career, and by extension the shape of your life is in three days. Everything before this was preparation. The hall holds four hundred students and the silence in it is a specific kind of pressure.`
      }
      if (arch === 'post_soviet') {
        return `The national exam determines everything: which institute, which profession, which city. People have bribed for places. Your family could not. You sit down with what you know.`
      }
      return `The school-leaving certificate is the document that makes or doesn't make the future. Your results will determine whether you go to secondary school in the city or come back to work the land. You sit in the examination hall and it is absolutely quiet.`
    },
    choices: [
      {
        text: 'You know the material. You do your best.',
        tag: null,
        outcome: 'The results, when they come, reflect what you put in. The door is open.',
        effect: (p) => {
          p.e += 5
          p.m += 6
          p.addFlag('exam_result_strong')
          p.setMem('schNationalExam', true)
        },
      },
      {
        text: 'The pressure makes something go wrong.',
        tag: null,
        outcome: 'The score is not what it should be. You will spend the next decade carrying the gap between what you were capable of and what the paper says.',
        effect: (p) => {
          p.e -= 2
          p.m -= 8
          p.r += 7
          p.addFlag('exam_result_weak')
          p.setMem('schNationalExam', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'sch_exam_echo',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('exam_result_weak') &&
      G.age >= 20 && G.age <= 32 &&
      !G.mem?.schExamEcho,
    text: 'The path the exam blocked has been replaced by another path. You know the alternatives were real and not lesser — that the person you became has little to do with the score. This does not entirely silence the question of what would have happened if the pressure in the room that day had sat differently.',
    choices: null,
    effect: (p) => {
      p.m -= 3
      p.r += 4
      p.setMem('schExamEcho', true)
    },
  },

]
