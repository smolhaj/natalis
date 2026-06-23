// events_followthrough_53.js
// Late-life reckoning with the formative desire.
// One event per desire type, all firing in late_life at age >= 60.
// These address what the childhood wound became over a full life —
// whether the desire was met, redirected, accepted, or still running.
// No new flags. No choices required (auto-resolve for two; choices for six).

export const FOLLOWTHROUGH_53_EVENTS = [

  // ── PROVE WORTH ───────────────────────────────────────────────────────────

  {
    id: 'ft53_prove_worth_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.desire === 'prove_worth' &&
      G.age >= 62 &&
      !G.mem?.ft53ProveWorthLate,
    text: `The question that ran the life: are you enough? You spent decades operating from the answer you were given too early — not enough, not quite, not proven — and then spending most of your working years trying to revise that answer through achievement. Some of the achievements are real. The answer is not settled in the way you expected settling to feel. It is more that the question has become less urgent. Not answered: quieter. The energy it took to keep the question alive has gradually gone elsewhere.`,
    choices: [
      {
        text: 'The question is quieter now. You didn\'t answer it — you outlived the need for it.',
        tag: null,
        outcome: 'Outliving the need is not the same as resolution. It is its own thing. The life you built while answering the question is real regardless.',
        effect: (p) => {
          p.m += 5
          p.r += 3
          p.setMem('ft53ProveWorthLate', true)
        },
      },
      {
        text: 'You still need to prove it. That is not a failure. It is the shape of this particular engine.',
        tag: null,
        outcome: 'Some desires don\'t resolve; they keep you moving. The movement has produced a life. That is also a form of answer.',
        effect: (p) => {
          p.m += 3
          p.r += 4
          p.e += 2
          p.setMem('ft53ProveWorthLate', true)
        },
      },
    ],
    effect: null,
  },

  // ── BELONG ────────────────────────────────────────────────────────────────

  {
    id: 'ft53_belong_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.desire === 'belong' &&
      G.age >= 62 &&
      !G.mem?.ft53BelongLate,
    text: `You wanted to belong — to a place, a people, a version of the world that would claim you. You spent time trying to find the group that would make you feel that way. Some of the groups were real and some of the belonging was real. At this age the belonging you have is the belonging you made: the people who know you, the place you call home because you kept coming back to it. Whether the belonging you made matches the belonging you wanted is a question you've had time to sit with.`,
    choices: [
      {
        text: 'The made belonging is enough. It is actually belonging — it just required building.',
        tag: null,
        outcome: 'The distinction between found belonging and made belonging matters less from here than it did from earlier. Both feel the same when you\'re inside them.',
        effect: (p) => {
          p.m += 6
          p.r += 2
          p.setMem('ft53BelongLate', true)
        },
      },
      {
        text: 'The belonging you have and the belonging you wanted remain different things. You know both shapes.',
        tag: null,
        outcome: 'The knowledge of both shapes is not nothing. It is an honest accounting. You belong here and you also know what a different belonging would have felt like.',
        effect: (p) => {
          p.m += 3
          p.r += 4
          p.setMem('ft53BelongLate', true)
        },
      },
    ],
    effect: null,
  },

  // ── BE SEEN ───────────────────────────────────────────────────────────────

  {
    id: 'ft53_be_seen_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.desire === 'be_seen' &&
      G.age >= 62 &&
      !G.mem?.ft53BeSeenLate,
    text: `The need to be seen — to have someone look at what you are doing and register that you are doing it, to be known rather than assumed — ran through your working years as a persistent hunger. There were moments. People who looked. Occasions where you were recognized for what you actually were rather than the simplified version. At this age the registry of who has seen you is longer than it once was. You have been seen in parts and by some people and on some occasions. That is probably the accounting for most lives.`,
    choices: [
      {
        text: 'The people who have seen you — really seen you — are enough. You know who they are.',
        tag: null,
        outcome: 'The list is small and real. Small and real is what visibility turns out to mean when you have enough of it to measure.',
        effect: (p) => {
          p.m += 5
          p.r += 3
          p.setMem('ft53BeSeenLate', true)
        },
      },
      {
        text: 'You are still not entirely sure you have been seen. The feeling persists.',
        tag: null,
        outcome: 'The persistence is not a failure. It is the refusal to accept the simplified version. That refusal is a form of self-respect.',
        effect: (p) => {
          p.r += 5
          p.m += 2
          p.setMem('ft53BeSeenLate', true)
        },
      },
    ],
    effect: null,
  },

  // ── SAFETY ────────────────────────────────────────────────────────────────

  {
    id: 'ft53_safety_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.desire === 'safety' &&
      G.age >= 62 &&
      !G.mem?.ft53SafetyLate,
    text: `The wound was fear: of instability, of the unpredictable, of what happens when the floor shifts. The life you built was partly in response to that: certain choices made because they offered more ground underfoot, certain risks not taken because the cost of the fall felt too known. Safety is not a state you arrive at. You understand this now the way you couldn't understand it at thirty. It is a practice. The practice is still ongoing. At this age you are better at the practice than you were, which is the nearest thing to safety there is.`,
    choices: null,
    effect: (p) => {
      p.m += 4
      p.r += 3
      p.e += 2
      p.setMem('ft53SafetyLate', true)
    },
  },

  // ── CONNECTION ────────────────────────────────────────────────────────────

  {
    id: 'ft53_connection_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.desire === 'connection' &&
      G.age >= 62 &&
      !G.mem?.ft53ConnectionLate,
    text: `You have always needed to be close to people — not just near them, but actually in contact, actually landing, the specific experience of being with someone where the barrier is down. The life has offered this sometimes and withheld it other times and the periods of withholding were the difficult ones. At this age you are clear about what the connection requires: attention, and willingness, and time. The time is shorter than it was. The attention is more deliberate. The connections you have are chosen.`,
    choices: [
      {
        text: 'The connections you have are the ones that mattered enough to maintain. They are yours.',
        tag: null,
        outcome: 'The maintenance is its own form of care. The chosen connections are more itself than they were when they were simply present.',
        effect: (p) => {
          p.m += 6
          p.r += 2
          p.setMem('ft53ConnectionLate', true)
        },
      },
      {
        text: 'Some connections you wanted didn\'t survive. The absences are real.',
        tag: null,
        outcome: 'The absences are in the accounting. They are also what remain of people who had their own reasons, who made their own choices. You hold both.',
        effect: (p) => {
          p.m += 2
          p.r += 5
          p.setMem('ft53ConnectionLate', true)
        },
      },
    ],
    effect: null,
  },

  // ── LEAVE MARK ────────────────────────────────────────────────────────────

  {
    id: 'ft53_leave_mark_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.desire === 'leave_mark' &&
      G.age >= 62 &&
      !G.mem?.ft53LeaveMarkLate,
    text: `The mark you wanted to leave: evidence that you were here, that the being-here mattered, that something was different because you passed through it. The mark that exists is not always the one you planned. Some of what you built has already dispersed. Some of it is still here in a form you recognize. Some of the mark is in people rather than in objects — in a student, a child, a person whose life went differently because you were in it. That kind of mark is harder to see and does not survive in an archive. It is real.`,
    choices: [
      {
        text: 'The mark is smaller and more precise than you imagined. That is what marks are.',
        tag: null,
        outcome: 'Precise is not the same as small. The precision is the thing that makes it real.',
        effect: (p) => {
          p.m += 4
          p.r += 3
          p.karma += 3
          p.setMem('ft53LeaveMarkLate', true)
        },
      },
      {
        text: 'The mark in people is the one that matters. You know which people.',
        tag: null,
        outcome: 'The people carry it. The carrying is not visible but it is real and it will continue past you.',
        effect: (p) => {
          p.m += 6
          p.karma += 5
          p.r += 2
          p.setMem('ft53LeaveMarkLate', true)
        },
      },
    ],
    effect: null,
  },

  // ── FREEDOM ───────────────────────────────────────────────────────────────

  {
    id: 'ft53_freedom_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.desire === 'freedom' &&
      G.age >= 62 &&
      !G.mem?.ft53FreedomLate,
    text: `Freedom was always the thing: to not be constrained, to have choices, to not be in the position where someone else decides what you do and when. You spent a fair amount of the life managing obligations — to people, to institutions, to the requirements of basic survival — that were the opposite of free. At this age some of the obligations have released. The children are grown. The career is resolved. The debts, mostly. What remains is something that might be the nearest thing to freedom the ordinary life offers: a significant amount of choice about how to spend the days, constrained by the body and the money but less by other people's requirements.`,
    choices: [
      {
        text: 'This is the freedom you were working toward. It is actually here.',
        tag: null,
        outcome: 'The reality of it is quieter than the anticipation. It is also real. The days are yours to organize.',
        effect: (p) => {
          p.m += 6
          p.r += 2
          p.setMem('ft53FreedomLate', true)
        },
      },
      {
        text: 'The freedom arrived but the desire for it is still running. Wanting what you have is its own practice.',
        tag: null,
        outcome: 'The practice of wanting what you have. Some people learn it early. You are learning it now. The learning is still learning.',
        effect: (p) => {
          p.m += 4
          p.r += 3
          p.e += 2
          p.setMem('ft53FreedomLate', true)
        },
      },
    ],
    effect: null,
  },

  // ── REDEMPTION ────────────────────────────────────────────────────────────

  {
    id: 'ft53_redemption_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.desire === 'redemption' &&
      G.age >= 62 &&
      !G.mem?.ft53RedemptionLate,
    text: `The thing you needed to be redeemed for: you know what it is. The need to be made right — to repair, to be different, to be not the person who did that or didn't do that — has been the running current of the life. Some of the repair has happened. Some was not possible. You have done what you could and it has been enough for some things and not enough for others. Redemption is apparently not a destination. It is more like a direction. You are still facing it. That is not failure. That is what redemption looks like from the inside of a real life.`,
    choices: [
      {
        text: 'The direction is enough. You have kept facing it. The keeping is the thing.',
        tag: null,
        outcome: 'The consistency of the facing is itself a kind of integrity. The people who matter know what direction you have kept.',
        effect: (p) => {
          p.m += 5
          p.karma += 5
          p.r += 2
          p.setMem('ft53RedemptionLate', true)
        },
      },
      {
        text: 'There are things that couldn\'t be repaired. You carry them without the redemption.',
        tag: null,
        outcome: 'The carrying without resolution is its own form of taking responsibility. The thing that couldn\'t be fixed is still held. That is not nothing.',
        effect: (p) => {
          p.karma += 3
          p.r += 5
          p.m += 2
          p.setMem('ft53RedemptionLate', true)
        },
      },
    ],
    effect: null,
  },

]
