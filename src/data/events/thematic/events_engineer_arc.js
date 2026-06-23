// events_engineer_arc.js — Deep engineer career arc
//
// Engineers design the things the world runs on. The arc tracks what it
// means to build for the long term — the first thing that works,
// the compromise that gets the project done, the failure you carry
// for years, and the eventual accounting of what your hands made.

const isEngineer = (G) => G.career?.id === 'engineer' || G.flags.has('engineer_career')

export const ENGINEER_ARC_EVENTS = [

  {
    id: 'eng_first_design',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      isEngineer(G) &&
      !G.mem?.engFirstDesignFired,
    text: `Something you designed gets built. Not the whole thing — a component, a system, a section — but yours enough that the fabrication drawings went out with your name on them. You check the tolerances again the night before the pour. You are at the site earlier than anyone else the morning it happens. The concrete fills the form correctly. You have made something that will be there after you are not.`,
    choices: null,
    effect: (p) => {
      p.m += 10
      p.e += 3
      p.addFlag('engineer_first_design')
      p.setMem('engFirstDesignFired', true)
    },
  },

  {
    id: 'eng_the_compromise',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      isEngineer(G) &&
      G.flags.has('engineer_first_design') &&
      !G.mem?.engCompromiseFired,
    text: `The project budget has been revised. The material you specified — the one with the load distribution you calculated the design around — is no longer in scope. The substituted material is adequate. It meets code. The margin is reduced from what it was, which is still a margin. The client signs off. The project manager signs off. The decision is yours to make on paper that already has the substitute written into it.`,
    choices: [
      {
        text: 'Sign off — it meets code, the project needs to move',
        tag: null,
        outcome: `You sign. The project delivers on time. The thing you designed is slightly different from the thing you calculated for, in a way that will never be visible and may never matter.`,
        effect: (p) => {
          p.w += 4
          p.m -= 6
          p.addFlag('engineer_compromised')
          p.setMem('engCompromiseFired', true)
        },
      },
      {
        text: 'Push back — get the original spec or get a proper structural review',
        tag: null,
        outcome: `The review takes three weeks and costs the relationship with the project manager. The structural engineer confirms your calculation. The original material goes back in.`,
        effect: (p) => {
          p.m += 6
          p.w -= 3
          p.addFlag('engineer_held_line')
          p.setMem('engCompromiseFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'eng_the_failure',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isEngineer(G) &&
      G.age >= 30 &&
      !G.mem?.engFailureFired,
    text: `Something you built has failed. Not catastrophically — no one is dead, the structural elements held — but a system you designed is not working the way it was supposed to work, and the failure is in your section, and it has been traced back to an assumption in your model that turned out not to hold under the actual load conditions. You knew the assumption had uncertainty in it. You documented the uncertainty. The documentation is in the file.`,
    choices: null,
    effect: (p) => {
      p.m -= 12
      p.r += 8
      p.addFlag('engineer_failure')
      p.setMem('engFailureFired', true)
    },
  },

  {
    id: 'eng_the_investigation',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      G.flags.has('engineer_failure') &&
      G.age >= 33 &&
      !G.mem?.engInvestigationFired,
    text: `The investigation into the failure concludes. The report identifies the load assumption and notes that it was within acceptable modelling practice for the information available at the time. You are named as the engineer of record and the report notes that your documentation was thorough. This is an exoneration. It is also a permanent part of the record that the failure happened and that the design was yours. You learn from the investigation something specific about the failure mode that changes how you model similar systems from now on.`,
    choices: null,
    effect: (p) => {
      p.m += 4
      p.e += 5
      p.r -= 3
      p.setMem('engInvestigationFired', true)
    },
  },

  {
    id: 'eng_safety_question',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      isEngineer(G) &&
      G.age >= 36 &&
      !G.mem?.engSafetyFired,
    text: `You are reviewing drawings for a project that is two weeks from breaking ground. There is something in the load path that concerns you — not a code violation, not a calculable failure, but a detail that you do not like the look of. Raising it will delay the project. The project is already behind. The lead engineer has signed off. You can document your concern in the file and proceed, or you can escalate it and cause the delay.`,
    choices: [
      {
        text: 'Escalate — get a second structural review before the ground breaks',
        tag: null,
        outcome: `The review takes ten days. The detail is revised. The project manager is difficult about it. The structure, as built, is the structure you wanted to see.`,
        effect: (p) => {
          p.m += 5
          p.w -= 2
          p.addFlag('engineer_safety_flagged')
          p.setMem('engSafetyFired', true)
        },
      },
      {
        text: 'Document and proceed — it meets code and you are not the lead engineer',
        tag: null,
        outcome: `You document your concern in terms that will be in the file if anything ever needs the file. The project delivers on schedule. Nothing happens. The concern remains something you hold.`,
        effect: (p) => {
          p.m -= 5
          p.r += 5
          p.addFlag('engineer_safety_documented')
          p.setMem('engSafetyFired', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'eng_obsolescence',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      isEngineer(G) &&
      G.age >= 42 &&
      !G.mem?.engObsoFired,
    text: `The software the profession runs on has changed twice since you learned it. The first change you adapted to. The second change coincided with a particularly heavy project load, and the adaptation was partial. You can do what you need to do. There are things the newer engineers do faster. You know things about the physical systems that the software does not know, and which the software's outputs do not always reflect. Both of these things are true and the relative value of each depends on who is doing the evaluation.`,
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.e += 3
      p.addFlag('engineer_obsolescence')
      p.setMem('engObsoFired', true)
    },
  },

  {
    id: 'eng_compromise_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('engineer_compromised') &&
      G.age >= 55 &&
      !G.mem?.engCompromiseEchoFired,
    text: `You drive past the thing you built with the substituted material. It is still there. It has been there for twenty years and the margin you reduced it to has held, which is what margins are for. You have checked it, by some means or another, more often than the inspection schedule required. The thing stands. The question you could not answer at the time — whether you made the right call — is still not answered. What is answered is: the thing stands, and nothing bad happened, and the margin held.`,
    choices: null,
    effect: (p) => {
      p.m += 4
      p.r -= 3
      p.setMem('engCompromiseEchoFired', true)
    },
  },

  {
    id: 'eng_safety_echo',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('engineer_safety_flagged') &&
      G.age >= 55 &&
      !G.mem?.engSafetyEchoFired,
    text: `You still think about the detail you flagged. Not obsessively — as a specific memory in the category of decisions that turned out to have been worth the difficulty. The project manager moved on two years after the project. The structure has been in service since, performing as designed. The ten days cost you something. You are not sure anymore exactly what. The detail is right, and it has been right for however many years since you put it right, and on some balance sheet that is probably the number that matters.`,
    choices: null,
    effect: (p) => {
      p.m += 5
      p.e += 2
      p.setMem('engSafetyEchoFired', true)
    },
  },

  {
    id: 'eng_late_reckoning',
    phase: 'late_life',
    weight: 7,
    when: (G) =>
      isEngineer(G) &&
      G.age >= 60 &&
      !G.mem?.engLateFired,
    text: `The things you built are still there. Some of them you drive past; others are in cities you moved on from; some are in the technical literature of a failure investigation. The accounting of a career spent making permanent things: the tolerances held, the loads were within the envelope, the assumptions were within acceptable practice. The one failure produced a report and a change in how you model. The compromises — the ones where code was met and the margin was reduced but the thing stood — are part of the record too. You built things. The things are still there.`,
    choices: null,
    effect: (p) => {
      p.m += 10
      p.r -= 4
      p.karma += 5
      p.addFlag('engineer_late_reckoning')
      p.setMem('engLateFired', true)
      p.legacy += 8
    },
  },

]
