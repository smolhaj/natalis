// events_accountant_arc.js — Deep accountant career arc
//
// The accountant is the person who knows where the money is. This gives
// a specific kind of access and a specific kind of moral exposure.
// The arc tracks what it means to spend a career in the knowledge of
// numbers: the intimacy with financial truth, the fraud that is
// eventually discovered, the client who wants help with a different
// version of the truth, and the late accounting of what all that
// knowledge added up to.

const isAccountant = (G) => G.career?.id === 'accountant' || G.flags.has('accountant_career')

export const ACCOUNTANT_ARC_EVENTS = [

  {
    id: 'acc_the_numbers',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isAccountant(G) &&
      !G.mem?.accNumbersFired,
    text: `You know where the money is. This is a specific kind of knowledge — not the money itself, but its structure: where it comes from, where it goes, what the gap between those two movements means about the health of an enterprise. Most people who work in a company do not know this. You know it about every company you work for or audit. This gives you a view of the world that is very accurate and not always comfortable to have.`,
    choices: null,
    effect: (p) => {
      p.m += 6
      p.e += 5
      p.addFlag('accountant_number_knowledge')
      p.setMem('accNumbersFired', true)
    },
  },

  {
    id: 'acc_the_client',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isAccountant(G) &&
      G.flags.has('accountant_number_knowledge') &&
      !G.mem?.accClientFired,
    text: `The client wants the numbers to tell a story that the numbers, as they are, do not tell. Not fraud — not yet — but a presentation of the figures that emphasises certain things and technically de-emphasises others in ways that are within the rules and also clearly in service of a picture the client wants to project rather than the picture that is there. You know the difference. The rules permit what they are asking for.`,
    choices: [
      {
        text: 'Produce what they want — it\'s within the rules and they\'re paying for a service',
        tag: null,
        outcome: `The filing goes out. The picture it presents is technically accurate. The client is satisfied. You have learned something about the gap between technically accurate and true.`,
        effect: (p) => {
          p.w += 4
          p.m -= 5
          p.r += 5
          p.addFlag('accountant_shaded_truth')
          p.setMem('accClientFired', true)
        },
      },
      {
        text: 'Push back — the numbers should represent the actual position',
        tag: null,
        outcome: `The conversation is uncomfortable. The client accepts the accurate version with notes explaining the context they wanted. You keep the client. The filing is straightforwardly true.`,
        effect: (p) => {
          p.m += 5
          p.karma += 6
          p.addFlag('accountant_held_accuracy')
          p.setMem('accClientFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'acc_the_fraud',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isAccountant(G) &&
      G.age >= 32 &&
      !G.mem?.accFraudFired,
    text: `The audit reveals what audits occasionally reveal: the numbers in the filing do not match the numbers in the underlying records, and the gap is not a discrepancy but a pattern, and the pattern has a direction, and the direction points toward the accounts of three specific people. You know what you are looking at. You know what the professional obligation is. You know what the consequences of the professional obligation are likely to be.`,
    choices: [
      {
        text: 'Report to regulators — the obligation is clear',
        tag: null,
        outcome: `You file the report. The investigation starts. You are a witness rather than a subject, which is the correct category to be in. The legal process takes two years. Your name is in documentation that will exist permanently.`,
        effect: (p) => {
          p.m -= 6
          p.karma += 12
          p.addFlag('accountant_reported_fraud')
          p.setMem('accFraudFired', true)
        },
      },
      {
        text: 'Document privately and give the company a chance to self-correct',
        tag: null,
        outcome: `You document it. You tell the board. The board begins an internal process. The internal process produces some recovery and some concealment, in a ratio you cannot fully determine. You have created a record without using it.`,
        effect: (p) => {
          p.m -= 8
          p.r += 8
          p.addFlag('accountant_documented_fraud')
          p.setMem('accFraudFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'acc_the_quiet_years',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isAccountant(G) &&
      G.age >= 38 &&
      !G.mem?.accQuietFired,
    text: `The work is largely quiet. This is what the work is: accurate numbers produced on time for clients who use them to understand their position and make decisions. The drama is not the norm. The norm is the careful annual rhythm of filings and reports and reviews. You are good at this. You are reliable at this. The knowledge you have about where the money is, deployed across dozens of clients over decades, amounts to a very specific and accurate picture of how money moves in the world.`,
    choices: null,
    effect: (p) => {
      p.m += 5
      p.e += 3
      p.w += 4
      p.addFlag('accountant_quiet_years')
      p.setMem('accQuietFired', true)
    },
  },

  {
    id: 'acc_fraud_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('accountant_documented_fraud') &&
      G.age >= 55 &&
      !G.mem?.accFraudEchoFired,
    text: `The internal process produced partial accountability and partial concealment, as you suspected at the time. The people most responsible were no longer at the company within three years. Some recovery happened. The full picture was not publicly established. You have the documentation. You also have the knowledge of what you did with it and what you did not do with it. Both of those things are in the file and in the version of the event you carry.`,
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 7
      p.karma -= 4
      p.setMem('accFraudEchoFired', true)
    },
  },

  {
    id: 'acc_shaded_truth_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('accountant_shaded_truth') &&
      G.age >= 55 &&
      !G.mem?.accShadedEchoFired,
    text: `The practice of presenting numbers in ways that are accurate and also designed to produce an impression has become, over the years, a thing you recognise immediately and do carefully. You know exactly where the line is. You have stayed on the right side of it. You also know that the practice exists on a slope and you have been navigating the slope for a long time. The navigation has been correct. You are aware of it.`,
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.r += 4
      p.setMem('accShadedEchoFired', true)
    },
  },

  {
    id: 'acc_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isAccountant(G) &&
      G.age >= 60 &&
      !G.mem?.accLateFired,
    text: `The accounting of a career spent accounting: the numbers were accurate, on balance, across the decades of filings and reports. The fraud that was discovered was reported or documented, according to the decision you made at the time. The clients whose presentations were shaded were presented accurately or in the version they asked for, according to the same. The quiet years were the majority of it. The knowledge you hold — where the money was, and is, and how it moves — is a very specific picture of the world that not many people have. You are leaving the phase of active use of that picture. The picture remains.`,
    choices: null,
    effect: (p) => {
      p.m += 9
      p.r -= 4
      p.karma += 5
      p.addFlag('accountant_late_reckoning')
      p.setMem('accLateFired', true)
      p.legacy += 6
    },
  },

]
