// events_social_worker_arc.js — Deep social worker career arc
//
// The social worker exists in careers.js with one event (child harmed
// on your caseload, system ignored your flag). These events add what
// that can't: the texture of sustained proximity to people the system
// failed, the bureaucratic accumulation, the colleague who didn't
// survive the work, the carrying that accumulates over a career.

const isSW = (G) => G.career?.id === 'social_worker' || G.flags.has('social_worker_career')

export const SOCIAL_WORKER_ARC_EVENTS = [

  {
    id: 'sw_first_case',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isSW(G) &&
      !G.mem?.swFirstCaseFired,
    text: `Your first case is a family. You have been assigned a family and the family has a situation that the referral form summarises in four fields. The actual situation is a different shape from the four fields. You spend more hours with it than the caseload is supposed to accommodate. You find this is not unusual — the caseload is always more than is supposed to be accommodated — and that working out how to do the job under this structural condition is the actual competency the job requires, and that nobody said this in the training.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.e += 3
      p.addFlag('sw_first_case')
      p.setMem('swFirstCaseFired', true)
    },
  },

  {
    id: 'sw_the_good_outcome',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      isSW(G) &&
      G.flags.has('sw_first_case') &&
      !G.mem?.swGoodOutcomeFired,
    text: `A case resolves well. Not completely — they rarely resolve completely — but well enough that the child is safe, or the person is housed, or the family has what they needed. You write the closure notes. The case goes off your list. You carry the information that the work can sometimes produce this, and file it in the place where you keep the things that make the work worth doing, which is a real place in your professional life, and you check it when you need to.`,
    choices: null,
    effect: (p) => {
      p.m += 10
      p.karma += 8
      p.addFlag('sw_good_outcome')
      p.setMem('swGoodOutcomeFired', true)
    },
  },

  {
    id: 'sw_system_failure',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isSW(G) &&
      G.age >= 30 &&
      !G.mem?.swSystemFired,
    text: `You have been flagging this case for three months. The system processes flags in a specific way, which is the way that does not always result in action in the time that action is needed. The outcome is an outcome that was not inevitable — you can see the shape of how it might have been avoided, and the shape includes a moment several weeks ago where a different decision would have changed the subsequent ones. You file the report. The report is thorough. Someone will read it and it will inform the next set of guidelines that will be circulated to the next set of workers who will flag the next set of cases that the system will process in the specific way that the system processes them.`,
    choices: null,
    effect: (p) => {
      p.m -= 15
      p.r += 10
      p.addFlag('sw_system_failure_witnessed')
      p.setMem('swSystemFired', true)
    },
  },

  {
    id: 'sw_secondary_trauma',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      isSW(G) &&
      G.age >= 34 &&
      !G.mem?.swTraumaFired,
    text: `The work involves sustained proximity to other people's worst experiences. You carry what you hear — not in the clinical sense of PTSD, or not only in that sense, but in the sense that the experiences are now in you in a way that does not switch off at the end of the working day. You have been trained for this. The training gives you frameworks. The frameworks are genuinely useful and also do not fully cover the specific thing that happens when you have been with the same family for eight months and the thing you knew might happen happens.`,
    choices: [
      {
        text: 'Seek formal supervision and peer support',
        tag: null,
        outcome: `The supervision helps. It does not remove what you carry; it gives it somewhere to be processed. The processing is ongoing.`,
        effect: (p) => {
          p.m -= 5
          p.h += 3
          p.addFlag('sw_sought_support')
          p.setMem('swTraumaFired', true)
        },
      },
      {
        text: 'Keep going — you are the professional, your job is to manage this',
        tag: null,
        outcome: `You keep going. The carrying continues. Some of it compresses into a specific kind of tiredness that is not physical tiredness.`,
        effect: (p) => {
          p.m -= 12
          p.h -= 4
          p.addFlag('sw_secondary_trauma')
          p.setMem('swTraumaFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'sw_colleague_left',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isSW(G) &&
      G.age >= 36 &&
      !G.mem?.swColleagueFired,
    text: `A colleague who was good at this job — genuinely good, the kind that the cases went better for having them on — has left. Not to another organisation but out of the field entirely. You understand this. You have understood it for a long time as an abstract possibility and now it is a specific person's specific decision, and their specific reason for leaving is a reason you recognise from your own experience of the work, and you are still here, and you are thinking about that fact.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 6
      p.addFlag('sw_colleague_left')
      p.setMem('swColleagueFired', true)
    },
  },

  {
    id: 'sw_colleague_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('sw_colleague_left') &&
      G.age >= 55 &&
      !G.mem?.swColleagueEchoFired,
    text: `You still think about the colleague who left. Not constantly — the work leaves you with less time for idle thought than other occupations — but in the specific moment when a case is hard and you know exactly how they would have approached it and what they would have said in the briefing afterwards. You stayed. They left. Both choices were the same choice about the same job made in the same impossible arithmetic, and they resolved differently. Neither resolution was wrong.`,
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.r += 3
      p.e += 2
      p.setMem('swColleagueEchoFired', true)
    },
  },

  {
    id: 'sw_secondary_trauma_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('sw_secondary_trauma') &&
      G.age >= 55 &&
      !G.mem?.swTraumaEchoFired,
    text: `The specific kind of tiredness has become structural. You have learned to identify when it is affecting your professional judgement and to compensate for it, which is itself a kind of expertise. You have learned when to take leave and what the difference is between the tiredness that leave addresses and the tiredness that is permanent. Both kinds are real. You are not the person who entered this field, in ways that are partly the specific damage of secondary trauma and partly just the accumulation of being the person this work produced. Both of those things are also real.`,
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 5
      p.e += 3
      p.setMem('swTraumaEchoFired', true)
    },
  },

  {
    id: 'sw_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isSW(G) &&
      G.age >= 60 &&
      !G.mem?.swLateFired,
    text: `The accounting: you chose to work with people at the worst points of their lives, sustained that choice for thirty-something years, and the system you worked within was imperfect in specific ways that you tried to address from inside, with mixed results. The outcomes you could influence you influenced. The outcomes you couldn't, you documented. Some of the cases closed well. The good-outcome file is real. What you carry out of the career, alongside the system failures and the weight and the colleague who left, is also this: the specific family that changed shape because you were the worker assigned to them. That happened. It's in the record.`,
    choices: null,
    effect: (p) => {
      p.m += 12
      p.r -= 6
      p.karma += 10
      p.addFlag('sw_late_reckoning')
      p.setMem('swLateFired', true)
      p.legacy += 10
    },
  },

]
