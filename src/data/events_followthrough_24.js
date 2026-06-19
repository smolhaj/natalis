// Follow-through events (MODE C): callbacks for second batch of never-checked flags.
// athlete_became_coach, failure_integrated, manages_chronic_condition,
// party_member, found_community, dual_identity, class_awareness, vision_impaired.

export const FOLLOWTHROUGH_24_EVENTS = [

  // ── ATHLETE BECAME COACH ──────────────────────────────────────────────────────
  // The identity shift from performing to teaching.

  {
    id: 'ft24_athlete_coach_settled',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('athlete_became_coach') &&
      !G.mem?.ft24AthCoach,
    text: 'You have been on this side of it long enough now to know that coaching is a different thing entirely. Not a lesser version of competing — a different occupation. What you are transmitting is not the same as what you performed. The transmission requires you to find language for things you always did without language, and to watch someone else\'s body learn what your body already knows.',
    choices: [
      {
        text: 'You have found it — this is the right work for this stage',
        tag: null,
        outcome: 'The career has a second shape. You are surprised to find it is as absorbing as the first.',
        effect: (p) => { p.m += 8; p.karma += 5; p.legacy += 4; p.setMem('ft24AthCoach', true) },
      },
      {
        text: 'You miss competing — the coaching is real but the loss is also real',
        tag: null,
        outcome: 'Both things are true. The grief for the performance career is its own kind of grief — specific and not always socially legible.',
        effect: (p) => { p.m += 3; p.r += 4; p.setMem('ft24AthCoach', true) },
      },
    ],
  },

  // ── FAILURE INTEGRATED ───────────────────────────────────────────────────────
  // The specific consciousness of someone who has actually processed a major failure.

  {
    id: 'ft24_failure_integrated_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('failure_integrated') &&
      !G.mem?.ft24FailureInt,
    text: 'The failure is something you can think about now without the particular nausea. Not because it became less of a failure — it did not — but because you have done what it turns out you needed to do with it. You have looked at it straight. You know what the failure cost and what it meant and roughly what you should have done differently. That is not nothing. Most people do not actually do this.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 4; p.karma += 3; p.setMem('ft24FailureInt', true) },
  },

  // ── MANAGES CHRONIC CONDITION ─────────────────────────────────────────────────
  // The daily rhythms of a managed condition.

  {
    id: 'ft24_manages_chronic_texture',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('manages_chronic_condition') &&
      !G.mem?.ft24ManagesChronic,
    text: 'The condition is managed, which means it is present in a particular way — not as crisis, but as infrastructure. The medication taken at the same time every day. The things avoided. The check-ups that are now permanent items on the calendar. You have negotiated a version of your life that accommodates this, and the negotiation has become routine, which is a different thing from the condition being gone.',
    choices: [
      {
        text: 'You have made a reasonable peace with the management',
        tag: null,
        outcome: 'The condition is part of the life. Not all of it. The management is a habit, like any other.',
        effect: (p) => { p.m += 6; p.e += 3; p.setMem('ft24ManagesChronic', true) },
      },
      {
        text: 'Some days the management is tiring in a way that is hard to explain',
        tag: null,
        outcome: 'Not in crisis — that is important. But the ongoing cost is real, and invisible to most people.',
        effect: (p) => { p.m += 2; p.h -= 2; p.setMem('ft24ManagesChronic', true) },
      },
    ],
  },

  // ── PARTY MEMBER ─────────────────────────────────────────────────────────────
  // The late reckoning of pragmatic party membership.

  {
    id: 'ft24_party_member_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('party_member') &&
      G.age >= 55 &&
      !G.mem?.ft24PartyReckoning,
    text: 'You joined for practical reasons. That is the honest account. The ideology was a performance you delivered well enough to be unremarkable. The advancement was real. What you performed to get it, you tell yourself, was not the same as what you believed — but the distinction requires more maintenance than it used to.',
    choices: [
      {
        text: 'Pragmatism was the right call — you used the system rather than being used by it',
        tag: null,
        outcome: 'The career was built. The family was provided for. You do not fully believe your own argument, but you believe enough of it.',
        effect: (p) => { p.r += 5; p.e += 2; p.setMem('ft24PartyReckoning', true) },
      },
      {
        text: 'The performance cost more than you realised at the time',
        tag: null,
        outcome: 'You know now what you were part of. The knowledge is uncomfortable and accurate.',
        effect: (p) => { p.r += 7; p.karma -= 3; p.m -= 4; p.setMem('ft24PartyReckoning', true) },
      },
    ],
  },

  // ── FOUND COMMUNITY ──────────────────────────────────────────────────────────
  // What the community became over time.

  {
    id: 'ft24_found_community_deepens',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('found_community') &&
      !G.mem?.ft24FoundComm,
    text: 'The community that found you — or that you found — has been part of the life for years now. The people in it have watched you change and you have watched them. There are funerals now, which was not the case when you first arrived. The community holds things about you that other people in your life do not know, and you hold the same for them. That is a specific kind of trust.',
    choices: null,
    effect: (p) => { p.m += 9; p.s += 3; p.karma += 4; p.setMem('ft24FoundComm', true) },
  },

  // ── DUAL IDENTITY ────────────────────────────────────────────────────────────
  // The specific midlife accounting of holding two cultures.

  {
    id: 'ft24_dual_identity_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('dual_identity') &&
      !G.mem?.ft24DualIdent,
    text: 'You have been doing the translation for years — not of language, exactly, though that too, but of context. The version of you that exists in one world is not the same version that exists in the other. The translation between them has cost things: the exhaustion of code-switching, the things that cannot travel between cultures, the private knowledge that some people who know you well know you partially. It has also given things that people with only one world do not have.',
    choices: [
      {
        text: 'The dual positioning is genuinely an advantage now — you can see from two places',
        tag: null,
        outcome: 'It is not a simple gift. It came with costs. You have decided the costs were worth the perspective.',
        effect: (p) => { p.m += 8; p.e += 5; p.setMem('ft24DualIdent', true) },
      },
      {
        text: 'The translation is tiring — you belong completely to neither',
        tag: null,
        outcome: 'You are never fully at home anywhere. This is a real thing that some people understand and many do not.',
        effect: (p) => { p.r += 4; p.m -= 2; p.setMem('ft24DualIdent', true) },
      },
    ],
  },

  // ── CLASS AWARENESS ──────────────────────────────────────────────────────────
  // The experience of understanding how class works from the inside.

  {
    id: 'ft24_class_awareness_settled',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('class_awareness') &&
      !G.mem?.ft24ClassAware,
    text: 'There was a moment — a room you were in, a conversation you heard, something about the ease of someone who grew up without the particular constraints — when the mechanism became visible. Since then you have been able to read the room in a way that is not always comfortable. You understand how the advantage distributes. The people inside the advantage often cannot see it. You have been on both sides of that perception.',
    choices: null,
    effect: (p) => { p.e += 5; p.m -= 2; p.r += 3; p.setMem('ft24ClassAware', true) },
  },

  // ── VISION IMPAIRED ──────────────────────────────────────────────────────────
  // Late life — adapting to vision loss.

  {
    id: 'ft24_vision_impaired_adapts',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('vision_impaired') &&
      G.age >= 65 &&
      !G.mem?.ft24VisionAdapt,
    text: 'The world is still readable, but the reading requires more. Larger print. Better light. The phone held closer. You have adapted in ways you could not have predicted before the adaptation was necessary — the other senses compensate in small ways, and some things you relied on vision for you now do by memory and touch. You are not blind. You are living in a smaller perceptual radius, which is a different experience.',
    choices: null,
    effect: (p) => { p.e += 3; p.m -= 3; p.h -= 2; p.setMem('ft24VisionAdapt', true) },
  },

]
