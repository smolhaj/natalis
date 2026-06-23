// events_police_arc.js — Deep police officer career arc
//
// The police officer exists in careers.js with one event (corruption).
// These events add what that can't: the first time the job is what
// the training said it would be, the first time it isn't, the
// colleague you trust and the culture you don't, the specific weight
// of holding authority in communities that have reason not to trust
// the people who hold it.
//
// Branches significantly on regime — democratic vs. authoritarian
// policing are different professions.

const isPolice = (G) => G.career?.id === 'police_officer' || G.flags.has('police_career')

export const POLICE_ARC_EVENTS = [

  {
    id: 'pol_first_call',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isPolice(G) &&
      !G.mem?.polFirstCallFired,
    text: `The first call that is yours — not accompanied, not observed, just you and the address and the situation that has not yet resolved itself. The training covers the procedure for this and you apply the procedure. The procedure is correct. The situation is more complicated than the procedure. You understand, in the driveway afterwards writing the report, that the gap between procedure and situation is the actual job, and that nobody warned you about the size of this gap, and that the gap does not get smaller — it becomes more familiar, which is not the same.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.e += 3
      p.addFlag('police_first_call')
      p.setMem('polFirstCallFired', true)
    },
  },

  {
    id: 'pol_community_trust',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isPolice(G) &&
      G.flags.has('police_first_call') &&
      !G.mem?.polCommunityFired,
    text: `The neighbourhood you patrol does not trust the police. This is not paranoia — it is history, specific and documented, the kind of history that communities pass down because passing it down is how they protect themselves. You understand this. You are now one of the things being passed down as a warning. You are also trying to do the job correctly, which means earning something that the institution you represent has spent years spending. The arithmetic of this is not in your favour, and you are aware of it, and you keep showing up because keeping showing up is the only part of the arithmetic you control.`,
    choices: null,
    effect: (p) => {
      p.m -= 7
      p.s += 3
      p.addFlag('police_community_distrust')
      p.setMem('polCommunityFired', true)
    },
  },

  {
    id: 'pol_use_of_force',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isPolice(G) &&
      G.age >= 23 &&
      !G.mem?.polForceFired,
    text: `You use force in the performance of your duties. The force is proportionate — this is your assessment and it is supported by the training and by what your partner saw. The person it was applied to is in hospital. The report is accurate. The inquiry, if there is one, will clear you. All of this is true. What is also true is that you are sitting in the car outside your house at 11pm and you have been sitting here for forty minutes and you are not ready to go inside.`,
    choices: [
      {
        text: 'Talk to someone — this needs to go somewhere',
        tag: null,
        outcome: `You talk to the department psychologist. The conversation is limited by what you are both able to say within the institutional context. It helps, partially.`,
        effect: (p) => {
          p.m -= 5
          p.h += 2
          p.addFlag('police_sought_support')
          p.setMem('polForceFired', true)
        },
      },
      {
        text: 'Process it yourself — this is part of the job',
        tag: null,
        outcome: `You process it. The processing is incomplete in ways you will not discover for some years.`,
        effect: (p) => {
          p.m -= 10
          p.h -= 3
          p.addFlag('police_force_used')
          p.setMem('polForceFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pol_regime_enforcement',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isPolice(G) &&
      (G.regime === 'single_party_authoritarian' || G.regime === 'military_dictatorship' || G.regime === 'single_party_communist') &&
      !G.mem?.polRegimeFired,
    text: `The orders arrive as orders do — through the chain of command, with the institutional weight of the institution behind them. The orders require you to police political activity: a gathering, a protest, a meeting of people who have not yet done anything illegal but whose gathering is itself what the state has decided to treat as illegal. You execute the orders. This is what the orders require. You execute them more or less completely, finding in the gap between more and less the last area of personal discretion available in a job that is narrowing that area year by year.`,
    choices: [
      {
        text: 'Execute the orders as given',
        tag: null,
        outcome: `You comply fully. The career is safe. Something else is less safe.`,
        effect: (p) => {
          p.m -= 10
          p.r += 8
          p.addFlag('police_regime_enforcer')
          p.setMem('polRegimeFired', true)
        },
      },
      {
        text: 'Execute the orders — but leave a gap where some people can leave',
        tag: null,
        outcome: `The gap is small. Some people use it. You file the report accurately about those who did not.`,
        effect: (p) => {
          p.m -= 6
          p.h -= 3
          p.karma += 6
          p.addFlag('police_minimal_compliance')
          p.setMem('polRegimeFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pol_whistleblower_choice',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isPolice(G) &&
      (G.regime === 'democracy' || G.regime === 'parliamentary_republic' || G.regime === 'federal_republic' || G.regime === 'constitutional_monarchy') &&
      G.age >= 35 &&
      !G.mem?.polWhistleFired,
    text: `You have knowledge of something being done wrong inside the department. Not corruption in the general sense — specific, documented, something you witnessed and cannot un-witness. The channels for reporting it exist. You have done the calculation of what using the channels will cost: the career, the colleagues, the informal network that the job runs on. The calculation does not resolve in a direction that makes the choice simple.`,
    choices: [
      {
        text: 'Report it through proper channels',
        tag: null,
        outcome: `The report goes in. The investigation is genuine, limited, and slow. Your position in the station is different after. The thing you reported is addressed, partially.`,
        effect: (p) => {
          p.m -= 8
          p.w -= 6
          p.karma += 12
          p.addFlag('police_whistleblower')
          p.setMem('polWhistleFired', true)
        },
      },
      {
        text: 'Keep quiet — the system protects itself, not you',
        tag: null,
        outcome: `You keep quiet. The thing you know stays in the category of things you know and don't discuss.`,
        effect: (p) => {
          p.m -= 8
          p.r += 8
          p.addFlag('police_silence_kept')
          p.setMem('polWhistleFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pol_career_weight',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isPolice(G) &&
      G.age >= 40 &&
      !G.mem?.polWeightFired,
    text: `The things you have seen in the course of the work have accumulated in a specific way. Not trauma in the clinical sense — or not only that — but a weight of exposure: the specific scenes, the specific faces, the specific decisions you made in the gap between procedure and situation. Some of these you have processed. Some have not been processed in ways you are aware of. The weight is part of the job and you have known this since the beginning, but knowing it at the beginning and knowing it at year fifteen are different kinds of knowing.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.h -= 4
      p.addFlag('police_career_weight')
      p.setMem('polWeightFired', true)
    },
  },

  {
    id: 'pol_force_echo',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.flags.has('police_force_used') &&
      G.age >= 40 &&
      !G.mem?.polForceEchoFired,
    text: `It was proportionate. The report was accurate. The inquiry cleared you. What has also happened is that the event is still there in a specific part of your memory that is different from the part where other events of similar weight live — it is more specific, more retrievable. You have not talked about it with the people who were not there, because the gap between what it was and what it sounds like is a gap that talking across makes larger. You have talked about it with the partner who was there. Once. The conversation established that you both carry it similarly.`,
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.r += 4
      p.setMem('polForceEchoFired', true)
    },
  },

  {
    id: 'pol_career_weight_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('police_career_weight') &&
      G.age >= 55 &&
      !G.mem?.polWeightEchoFired,
    text: `The weight does not diminish. You have learned to carry it more efficiently, which is not the same as diminishing. At fifty-five you are better at the job than you were at thirty and also more tired in a specific way that the job produces, not the body. You do not talk about this in the terms available to you for talking about it, which are the department's terms and the union's terms and the terms of the public narrative about police work. The specific thing you mean does not fit those terms.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 5
      p.e += 3
      p.setMem('polWeightEchoFired', true)
    },
  },

  {
    id: 'pol_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isPolice(G) &&
      G.age >= 60 &&
      !G.mem?.polLateFired,
    text: `The accounting: you held authority in communities that had reason not to trust the people who held it, and you tried to use that authority in a way that was worth trusting, with varying success. You followed orders that were correct and orders that were wrong, and in the cases where they were wrong you found what you found in yourself when you had to find it. The job required things from you that you gave and some things that you didn't know you were giving until they were gone. What you take from it: the calls that went right, the community that started nodding when you walked through, the case that closed. The rest is also there.`,
    choices: null,
    effect: (p) => {
      p.m += 6
      p.r -= 4
      p.karma += 6
      p.addFlag('police_late_reckoning')
      p.setMem('polLateFired', true)
      p.legacy += 6
    },
  },

]
