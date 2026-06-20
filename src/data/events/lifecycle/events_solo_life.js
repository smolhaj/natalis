// events_solo_life.js — Burst E
// Events for characters who move through life without a long-term partner.
// Not about loneliness as failure — about the specific texture of a life
// that doesn't centre around couplehood. Freedom and weight both.

export const SOLO_LIFE_EVENTS = [

  // ── 1. THE QUESTION FIRST ARRIVES ────────────────────────────────────────────
  // Mid-20s. Everyone around you is pairing off. You notice.
  {
    id: 'sl_question_arrives',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.partner &&
      !G.mem?.slQuestionDone &&
      G.age >= 24 && G.age <= 30 &&
      !G.flags.has('chose_childless'), // avoid stacking with fertility events
    text: 'The invitations change shape around this age. What was "come to the party" becomes "come to the engagement dinner." The conversations at work include a subject that wasn\'t there two years ago. Your colleagues\' weekends have acquired a structure yours doesn\'t have yet. You are not unhappy exactly. But you are aware, for the first time, of a gap between your life\'s shape and the shape that seems expected.',
    choices: [
      {
        text: 'You want this — you are just waiting for the right person',
        tag: 'waiting',
        outcome: 'The wanting is real. The waiting has its own specific texture.',
        effect: (p) => {
          p.setMem('slQuestionDone', true)
          p.addFlag('solo_wants_partner')
          p.m -= 3
        },
      },
      {
        text: 'You are not sure you want it — the question itself is unfamiliar',
        tag: 'unsure',
        outcome: 'You do not know what you want. That is an honest position.',
        effect: (p) => {
          p.setMem('slQuestionDone', true)
          p.addFlag('solo_uncertain')
        },
      },
      {
        text: 'You are building a different kind of life, deliberately',
        tag: 'deliberate',
        outcome: 'You understand that this is a choice, and that choices have costs and rewards both.',
        effect: (p) => {
          p.setMem('slQuestionDone', true)
          p.addFlag('solo_deliberate')
          p.m += 5
          p.karma += 3
        },
      },
    ],
    effect: null,
  },

  // ── 2. THE APARTMENT ─────────────────────────────────────────────────────────
  // The specific texture of living alone, well into adulthood.
  {
    id: 'sl_living_alone',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.partner &&
      !G.mem?.slLivingAloneDone &&
      G.age >= 27 && G.age <= 35,
    text: 'You have a flat that is exactly as you arranged it. Nothing moves unless you move it. The particular silence of a home with one person in it has a texture you have learned to read: not empty, not full, but specific in a way shared spaces aren\'t. You can leave a book face-down on the arm of the sofa for a week. You can eat dinner at ten. You can leave the lights off when you come in and sit in the dark for a moment without explaining it to anyone.',
    choices: null,
    effect: (p) => {
      p.setMem('slLivingAloneDone', true)
      p.addFlag('solo_life_texture')
      p.m += 3
      p.s -= 2
    },
  },

  // ── 3. THE FRIENDS WHO HAVE COUPLED ─────────────────────────────────────────
  // Mid-30s. The social landscape has reorganised itself.
  {
    id: 'sl_friends_coupled',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.partner &&
      !G.mem?.slFriendsCoupledDone &&
      G.age >= 32 && G.age <= 40,
    text: 'The social geometry has shifted. The dinners now happen in pairs and foursomes. When friends host, you are the spare number, seated between someone\'s partner and someone\'s partner\'s colleague. The conversations are about mortgages, school districts, a recurring subject involving sleep deprivation. You love these people. But you are watching the map of common experience diverge from yours, slowly, year by year.',
    choices: [
      {
        text: 'You invest in your friendships differently — they become more important to you',
        tag: 'invest',
        outcome: 'The friendships become deeper in some ways, even as the daily experience gaps widen.',
        effect: (p) => {
          p.setMem('slFriendsCoupledDone', true)
          p.addFlag('solo_friendship_deep')
          p.s += 5
          p.karma += 3
        },
      },
      {
        text: 'You find new people — others in the same position',
        tag: 'new_people',
        outcome: 'There is a specific social world that exists among people who have not coupled. You begin to inhabit it.',
        effect: (p) => {
          p.setMem('slFriendsCoupledDone', true)
          p.addFlag('solo_found_community')
          p.s += 3
          p.m += 3
        },
      },
      {
        text: 'You withdraw somewhat — the divergence is real and you feel it',
        tag: 'withdraw',
        outcome: 'The loneliness is not constant, but it has an address now.',
        effect: (p) => {
          p.setMem('slFriendsCoupledDone', true)
          p.addFlag('solo_withdrawn')
          p.m -= 5
          p.s -= 4
        },
      },
    ],
    effect: null,
  },

  // ── 4. WHAT ACCUMULATES ──────────────────────────────────────────────────────
  // 40s. The specific freedom of a life not negotiated with another person.
  {
    id: 'sl_what_accumulates',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.partner &&
      !G.mem?.slAccumulatesDone &&
      G.age >= 38 && G.age <= 48,
    text: 'You have done things that people with partners don\'t often do: moved for a job without negotiation, quit a job without discussion, spent three months somewhere impractical, changed your life in ways that required only your own agreement. The freedom is real and you have used it. Alongside it, less discussable, is the knowledge that no one has really witnessed the accumulation of your life from close proximity. You are known by many people in pieces, and by no one entirely.',
    choices: null,
    effect: (p) => {
      p.setMem('slAccumulatesDone', true)
      p.addFlag('solo_freedom_cost_known')
      p.m += 2
      p.e += 4
    },
  },

  // ── 5. THE ILLNESS QUESTION ──────────────────────────────────────────────────
  // Midlife. A minor illness makes something concrete.
  {
    id: 'sl_illness_question',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.partner &&
      !G.mem?.slIllnessDone &&
      G.age >= 42 && G.age <= 55,
    text: 'You are sick for a week — not seriously, not hospitalised, just genuinely unwell. You manage it. You go to the shop when you need something, you make food when you can, you cancel what needs cancelling. At some point during the week, you think: if this were worse, if this were much worse, the arrangements of a life alone would require planning that a partnered life builds in automatically. You get better. But the thought stays.',
    choices: [
      {
        text: 'You plan ahead — friends, networks, practical arrangements',
        tag: 'plan',
        outcome: 'You address it practically. This turns out to be a good use of time.',
        effect: (p) => {
          p.setMem('slIllnessDone', true)
          p.addFlag('solo_plans_made')
          p.s += 4
          p.h += 2
        },
      },
      {
        text: 'You let it sit — you will deal with it when it arrives',
        tag: 'defer',
        outcome: 'You file it under things you know and do not act on. Most things live in that file.',
        effect: (p) => {
          p.setMem('slIllnessDone', true)
        },
      },
    ],
    effect: null,
  },

  // ── 6. THE OCCASION ALONE ────────────────────────────────────────────────────
  // Late midlife. A significant occasion (birthday, holiday, anniversary) alone.
  {
    id: 'sl_occasion_alone',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.partner &&
      !G.mem?.slOccasionDone &&
      G.age >= 48 && G.age <= 60,
    text: 'There is a day — your birthday, or a particular date, or just a day when the rest of the world seems to be elsewhere with someone else — where the aloneness is not background texture but foreground fact. You make dinner for yourself. You sit with it. It is neither catastrophic nor entirely fine. You think about the person you might have been by now in a different configuration of the same life. That person seems only loosely related to the one you are.',
    choices: null,
    effect: (p) => {
      p.setMem('slOccasionDone', true)
      p.addFlag('solo_occasion_felt')
      p.m -= 6
      p.e += 3
    },
  },

  // ── 7. WHAT YOU HAVE INSTEAD ────────────────────────────────────────────────
  // Late life. Taking stock.
  {
    id: 'sl_what_instead',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.partner &&
      !G.flags.has('widowed') && !G.flags.has('divorced') &&
      !G.mem?.slWhatInsteadDone &&
      G.age >= 58 && G.age <= 70,
    text: 'You are accounting for the life honestly, the way people do at this age. You did not have the central relationship that most people built around. What you have instead is not a compensation — it is simply different: work that mattered more because it mattered to you alone, friendships that became primary rather than supplementary, a self that was never divided between two people\'s needs. The accounting is not triumphant. It is honest.',
    choices: [
      {
        text: 'The life is a good one — genuinely, without qualification',
        tag: 'good',
        outcome: 'You mean it. That is worth something.',
        effect: (p) => {
          p.setMem('slWhatInsteadDone', true)
          p.addFlag('solo_life_accepted')
          p.m += 10
          p.karma += 5
        },
      },
      {
        text: 'Good, and with a persistent loss in it — both things are true',
        tag: 'mixed',
        outcome: 'You do not resolve the two. They sit alongside each other.',
        effect: (p) => {
          p.setMem('slWhatInsteadDone', true)
          p.addFlag('solo_life_accepted')
          p.addFlag('solo_grief_named')
          p.m += 4
          p.e += 4
        },
      },
      {
        text: 'You are still not sure it was what you would have chosen',
        tag: 'uncertain',
        outcome: 'The uncertainty is its own kind of answer at this age.',
        effect: (p) => {
          p.setMem('slWhatInsteadDone', true)
          p.addFlag('solo_grief_named')
          p.r += 8
          p.e += 4
        },
      },
    ],
    effect: null,
  },

  // ── 8. THE LATE BEGINNING (unexpected partner in late life) ──────────────────
  // Triggered if the solo character finds a partner after 52.
  // This event fires the year after they partner, if they haven't had one before.
  {
    id: 'sl_late_partner',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.partner &&
      G.flags.has('solo_life_texture') &&
      !G.flags.has('divorced') &&
      !G.mem?.slLatePartnerDone &&
      G.age >= 52,
    text: 'You have spent most of your adult life alone, and now you are not. The adjustment is not what you expected — not difficult exactly, but strange. You have decades of habits shaped for one person. You have a self that was built without reference to another person\'s needs. The rearranging is interesting and inconvenient and occasionally wonderful. The person you are with understands what it cost to get to this, which helps.',
    choices: null,
    effect: (p) => {
      p.setMem('slLatePartnerDone', true)
      p.addFlag('solo_late_love')
      p.m += 12
      p.s += 4
    },
  },

]
