// events_coherence.js — Burst G
// Follow-through events for orphaned flags. The past should leave traces.
// Each event picks up a prior moment and asks: where did that go?

export const COHERENCE_EVENTS = [

  // ── SCHOLARSHIP WINNER → what it actually led to ──────────────────────────
  {
    id: 'coh_scholarship_payoff',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('scholarship_winner') &&
      !G.mem?.cohScholarshipPayoff &&
      G.age >= 20 && G.age <= 28,
    text: 'The scholarship got you here — that is the first thing you said about yourself for years, the way you began the story. You are far enough in now to see what it led to. The money was real. The door it opened was real. Whether you have walked far enough through it to say the gamble paid off is a question you keep adjusting your answer to.',
    choices: [
      {
        text: 'It paid off. The trajectory changed.',
        tag: 'paid_off',
        outcome: 'You can trace a line from that application to where you are. The line is real.',
        effect: (p) => {
          p.setMem('cohScholarshipPayoff', true)
          p.addFlag('scholarship_transformed_life')
          p.m += 8
          p.e += 4
          p.karma += 3
        },
      },
      {
        text: 'It got you in the room. The room turned out to be ordinary.',
        tag: 'ordinary',
        outcome: 'The scholarship was the beginning of finding out that there is no door that resolves everything.',
        effect: (p) => {
          p.setMem('cohScholarshipPayoff', true)
          p.addFlag('knows_failure')
          p.e += 5
          p.m -= 2
        },
      },
    ],
    effect: null,
  },

  // ── TALENT DISCOVERED → what you did with it ─────────────────────────────
  {
    id: 'coh_talent_direction',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('talent_discovered') &&
      !G.mem?.cohTalentDirection &&
      G.age >= 20 && G.age <= 30,
    text: 'You found a talent young and have been deciding ever since what to do about it. The choice resolves, at some point, into two shapes: the talent as your life, or the talent alongside your life. Both are real positions with real costs.',
    choices: [
      {
        text: 'You made the talent the centre — you built around it',
        tag: 'centre',
        outcome: 'The bet is on. You will not know for years if it was right.',
        effect: (p) => {
          p.setMem('cohTalentDirection', 'centre')
          p.addFlag('talent_as_vocation')
          p.m += 5
          p.e += 6
        },
      },
      {
        text: 'You kept it as a private thing — it belongs to you, not to a career',
        tag: 'private',
        outcome: 'Some talents stay cleaner when no one needs them to earn.',
        effect: (p) => {
          p.setMem('cohTalentDirection', 'private')
          p.addFlag('talent_kept_private')
          p.m += 7
          p.karma += 4
        },
      },
      {
        text: 'The practical path took over — the talent is still there, somewhere',
        tag: 'deferred',
        outcome: 'You tell yourself you will return to it. Some people do.',
        effect: (p) => {
          p.setMem('cohTalentDirection', 'deferred')
          p.addFlag('deferred_talent')
          p.m -= 4
          p.r += 6
        },
      },
    ],
    effect: null,
  },

  // ── KNOWS FAILURE → the failure that still sits in the room ──────────────
  {
    id: 'coh_failure_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('knows_failure') &&
      !G.mem?.cohFailureEcho &&
      G.age >= 34 && G.age <= 45,
    text: 'You have achieved things since the failure. This does not resolve the failure. You think about it in specific moments — walking into rooms where you need to be taken seriously, filling out applications, introducing yourself to people who haven\'t heard the story. The failure sits in a corner of every professional encounter. You have learned to work around it. Whether you have moved past it is different question.',
    choices: [
      {
        text: 'You have integrated it — the failure taught you something real',
        tag: 'integrated',
        outcome: 'The failure is part of how you know what you know. That is not nothing.',
        effect: (p) => {
          p.setMem('cohFailureEcho', true)
          p.addFlag('failure_integrated')
          p.e += 5
          p.karma += 3
          p.m += 4
        },
      },
      {
        text: 'It still costs you — you have not stopped compensating',
        tag: 'compensating',
        outcome: 'The compensation has its own costs. You are aware of this. Awareness has not resolved it.',
        effect: (p) => {
          p.setMem('cohFailureEcho', true)
          p.r += 5
          p.m -= 3
          p.e += 3
        },
      },
    ],
    effect: null,
  },

  // ── PEER DEATH IN ADOLESCENCE → how it sits at 30 ────────────────────────
  {
    id: 'coh_peer_death_echo',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.mem?.adol2PeerDeath &&
      !G.mem?.cohPeerDeathEcho &&
      G.age >= 28 && G.age <= 38,
    text: 'You are the age now that your friend never reached. You have been this age for a year and something about it is strange — the specific maths of outliving someone by a decade now, then two, then more. You have done things they will never do. You have become someone they never met. This is not a sad thought exactly, though it is not quite not sad. It is just a fact that you carry.',
    choices: null,
    effect: (p) => {
      p.setMem('cohPeerDeathEcho', true)
      p.addFlag('carries_early_loss')
      p.m -= 4
      p.e += 5
      p.karma += 3
    },
  },

  // ── CHILDHOOD OBJECT → midlife, where it is now ──────────────────────────
  {
    id: 'coh_childhood_object',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('childhood_object') &&
      !G.mem?.cohChildhoodObject &&
      G.age >= 36 && G.age <= 50,
    text: 'You still have it — the object. Moved it through a number of addresses, which is its own statement. It does nothing useful. You cannot always explain why it has survived when other things have not. It sat on a shelf when you were young and it sits on a shelf now and the arc between those two positions is your life so far.',
    choices: null,
    effect: (p) => {
      p.setMem('cohChildhoodObject', true)
      p.addFlag('object_kept')
      p.m += 5
      p.e += 3
    },
  },

  // ── POLITICAL AWAKENING AT 20 → what happened to it ─────────────────────
  {
    id: 'coh_political_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      (G.flags.has('political_awakening_twenty') || G.flags.has('political_awareness_early')) &&
      !G.mem?.cohPoliticalEcho &&
      G.age >= 35 && G.age <= 48,
    text: 'You were certain once. There was a moment — a book, a conversation, a specific news event — when the shape of the world became legible and you knew what you thought about it. You still largely think that. But certainty has a different weight now than it did then. You have learned that being right is a more complicated thing than you understood at twenty.',
    choices: [
      {
        text: 'The politics held — deepened rather than simplified',
        tag: 'deepened',
        outcome: 'What changed is the texture, not the direction.',
        effect: (p) => {
          p.setMem('cohPoliticalEcho', true)
          p.addFlag('politics_mature')
          p.karma += 5
          p.e += 4
        },
      },
      {
        text: 'You moderated — the certainty didn\'t survive contact with complexity',
        tag: 'moderated',
        outcome: 'You are harder to place now than you used to be. This has costs and advantages.',
        effect: (p) => {
          p.setMem('cohPoliticalEcho', true)
          p.addFlag('politics_moderate')
          p.e += 5
          p.r += 3
        },
      },
      {
        text: 'You stopped engaging — the cost-to-reward ratio didn\'t hold',
        tag: 'withdrew',
        outcome: 'The politics went somewhere else. You went somewhere else.',
        effect: (p) => {
          p.setMem('cohPoliticalEcho', true)
          p.addFlag('politics_disengaged')
          p.m -= 3
          p.r += 4
        },
      },
    ],
    effect: null,
  },

  // ── FRIEND GROUP SCATTERED → the specific grief of 35 ───────────────────
  {
    id: 'coh_friend_scatter_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('friend_group_scattered') &&
      !G.mem?.cohFriendScatterEcho &&
      G.age >= 33 && G.age <= 44,
    text: 'You see them occasionally — a wedding, an anniversary, a visit that happens once every few years and then takes eighteen months to schedule again. The group that defined your early twenties exists now mainly as a group chat and a set of faces you can still read at a glance, even after the gap. The closeness is real. The proximity is not. You have both and you have learned they are different things.',
    choices: null,
    effect: (p) => {
      p.setMem('cohFriendScatterEcho', true)
      p.addFlag('scattered_friends_loved')
      p.m += 4
      p.s -= 2
    },
  },

  // ── FIRST_GEN_GRADUATE → telling your parents at graduation ──────────────
  {
    id: 'coh_firstgen_parents',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('first_gen_graduate') &&
      !G.mem?.cohFirstGenParents &&
      G.age >= 21 && G.age <= 26 &&
      (G.parents?.mother?.alive || G.parents?.father?.alive),
    text: 'You have the degree now. The parent who is still here is at the ceremony, or has heard the news, or has received the photograph. What happens in their face is not what you expected and is exactly what you expected. You understood, abstractly, that this mattered to them more than they ever said. You understand it concretely now, standing here.',
    choices: null,
    effect: (p) => {
      p.setMem('cohFirstGenParents', true)
      p.addFlag('firstgen_pride_witnessed')
      p.m += 10
      p.karma += 6
    },
  },

  // ── DEFERRED TALENT → midlife, the return question ───────────────────────
  {
    id: 'coh_deferred_talent_midlife',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('deferred_talent') &&
      !G.mem?.cohDeferredTalentMidlife &&
      G.age >= 42 && G.age <= 55,
    text: 'The talent is still there. You know this because it is still waiting. You find yourself thinking about it in specific contexts — on long train journeys, in meetings that have nothing to do with it, on Sunday mornings before the day has acquired its schedule. You have been telling yourself you will return to it for twenty years. The return keeps not happening. This is either about to change or it isn\'t.',
    choices: [
      {
        text: 'You return to it — you make the time',
        tag: 'return',
        outcome: 'The talent was still there. That, at least, is settled.',
        effect: (p) => {
          p.setMem('cohDeferredTalentMidlife', true)
          p.addFlag('talent_returned')
          p.m += 12
          p.karma += 5
        },
      },
      {
        text: 'You let it go properly — you stop telling yourself you\'ll return',
        tag: 'release',
        outcome: 'The release is its own kind of freedom. The grief of it is also real.',
        effect: (p) => {
          p.setMem('cohDeferredTalentMidlife', true)
          p.addFlag('talent_released')
          p.m += 3
          p.r += 6
        },
      },
    ],
    effect: null,
  },

  // ── LEFT SCHOOL EARLY → the credential question at 30 ────────────────────
  {
    id: 'coh_left_school_early_echo',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.flags.has('left_school_early') &&
      !G.mem?.cohLeftSchoolEcho &&
      G.age >= 28 && G.age <= 38,
    text: 'The gap in the CV is an explanation you have given and refined for years. Sometimes it is an advantage — the story is interesting, the path is unusual. Other times it is a closed door. You have learned to read which situation you are in within the first few minutes. The question of what would have happened if you had stayed resolves, usually, into something too complicated to track.',
    choices: [
      {
        text: 'It was the right call — you built something the classroom wouldn\'t have',
        tag: 'right',
        outcome: 'You believe this. Most days you believe this.',
        effect: (p) => {
          p.setMem('cohLeftSchoolEcho', true)
          p.addFlag('early_exit_owned')
          p.m += 5
          p.karma += 3
        },
      },
      {
        text: 'You regret it — the credential is a door that keeps being locked',
        tag: 'regret',
        outcome: 'You know what you lost. You cannot entirely un-know it.',
        effect: (p) => {
          p.setMem('cohLeftSchoolEcho', true)
          p.addFlag('credential_regret')
          p.r += 7
          p.m -= 4
        },
      },
    ],
    effect: null,
  },

  // ── CARRIES_FAMILY_SILENCE + has_child → transmitting or breaking the cycle
  {
    id: 'coh_silence_transmission',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('carries_family_silence') &&
      G.children?.length > 0 &&
      !G.mem?.cohSilenceTransmission &&
      G.age >= 36 && G.age <= 52,
    text: 'Your child asks you something — about your grandparents, about where the family came from, about why there are no photographs from before a certain year. You are in the position now that your parent was in when you asked. The choice your parent made is the choice you are making right now, in this moment.',
    choices: [
      {
        text: 'You tell them — you break the pattern',
        tag: 'tells',
        outcome: 'The story is now two generations deep instead of sealed. You don\'t know yet whether that was right.',
        effect: (p) => {
          p.setMem('cohSilenceTransmission', true)
          p.addFlag('silence_broken')
          p.m += 6
          p.karma += 8
        },
      },
      {
        text: 'You deflect — you don\'t have the words yet',
        tag: 'deflects',
        outcome: 'The silence passes to another generation. You tell yourself there is still time.',
        effect: (p) => {
          p.setMem('cohSilenceTransmission', true)
          p.addFlag('silence_passed_on')
          p.m -= 4
          p.r += 6
        },
      },
    ],
    effect: null,
  },

]
