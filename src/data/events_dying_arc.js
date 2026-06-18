// events_dying_arc.js — Burst F
// 6 events for the final years. Not about death as a stat — about the
// specific consciousness of a person who knows they are likely near the end.
// Age-gated at 75+, firing in the final phase of a long life.

export const DYING_ARC_EVENTS = [

  // ── 1. THE BODY ACCOUNTING ───────────────────────────────────────────────────
  // The first time you take stock of what the body can and can't do.
  {
    id: 'da_body_accounting',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem?.daBodyAccountingDone &&
      G.age >= 75 && G.age <= 85,
    text: 'You are doing the accounting. The knee that requires planning around. The afternoon nap that is no longer optional. The word that sometimes takes a moment longer to arrive than it used to. These are not complaints — you note them the way a navigator notes the position of the boat. You are here. This is what the boat can do. You adjust the course accordingly.',
    choices: null,
    effect: (p) => {
      p.setMem('daBodyAccountingDone', true)
      p.addFlag('dying_arc_begun')
      p.h -= 5
      p.e += 3
    },
  },

  // ── 2. THE THINGS TO GIVE AWAY ────────────────────────────────────────────────
  // Objects and what to do with them.
  {
    id: 'da_giving_away',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.daGivingAwayDone &&
      G.age >= 77 && G.age <= 88,
    text: 'You have been moving things. Not dramatically — a book to someone who would value it, a tool to someone who would use it, a piece of furniture that belongs with a particular person more than it belongs with you. You are not giving away your life. You are sending certain parts of it where they should end up while you are still there to place them. There is a satisfaction in this that you did not anticipate.',
    choices: [
      {
        text: 'You give thoughtfully — each thing to the right person',
        tag: 'thoughtful',
        outcome: 'The objects are moving. The relationships, in small ways, are confirmed.',
        effect: (p) => {
          p.setMem('daGivingAwayDone', true)
          p.addFlag('legacy_distributed')
          p.m += 6
          p.karma += 5
        },
      },
      {
        text: 'You struggle to let go — the objects are the accumulation',
        tag: 'holding',
        outcome: 'Some things are still here. That is all right.',
        effect: (p) => {
          p.setMem('daGivingAwayDone', true)
          p.m -= 3
        },
      },
    ],
    effect: null,
  },

  // ── 3. WHAT YOU WANT SAID ────────────────────────────────────────────────────
  // The specific question of how you want to be remembered.
  {
    id: 'da_what_said',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.daWhatSaidDone &&
      G.age >= 78 && G.age <= 90,
    text: 'You have thought, in a way you could not have earlier in life, about what you want said. Not a eulogy — you don\'t require performance. Something simpler: a true sentence. One thing about this life that is accurate. You have been trying to identify what that sentence would be, and it has been harder to find than you expected. The candidates keep not being quite right.',
    choices: [
      {
        text: 'You write it down — a letter to whoever comes after',
        tag: 'writes',
        outcome: 'The letter exists. Whether it lands the way you intended is not something you will know.',
        effect: (p) => {
          p.setMem('daWhatSaidDone', true)
          p.addFlag('final_letter_written')
          p.m += 8
          p.karma += 6
          p.addFlag('life_reviewed')
        },
      },
      {
        text: 'You tell someone in person — a child, a friend, whoever is near',
        tag: 'spoken',
        outcome: 'The conversation happens. It is imperfect and it is enough.',
        effect: (p) => {
          p.setMem('daWhatSaidDone', true)
          p.addFlag('spoken_legacy')
          p.m += 7
          p.karma += 4
          p.addFlag('life_reviewed')
        },
      },
      {
        text: 'You let it go — you were never good at being summed up',
        tag: 'lets_go',
        outcome: 'Some things resist epitaph. You were one of them.',
        effect: (p) => {
          p.setMem('daWhatSaidDone', true)
          p.m += 3
          p.addFlag('found_meaning')
        },
      },
    ],
    effect: null,
  },

  // ── 4. THE NIGHT QUESTION ────────────────────────────────────────────────────
  // 3am with the specific consciousness of late age.
  {
    id: 'da_night_question',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.daNightQuestionDone &&
      G.age >= 80 && G.age <= 92,
    text: 'You wake at three in the morning, which is when the questions arrive that the day keeps at a distance. You are not frightened exactly. You are aware, in the specific way of people who have been this age, that you do not know how much time there is. You lie in the dark and think about this with a quality of attention that is neither panic nor peace but something in between — a kind of sitting with it, the way you\'d sit with anything you cannot change.',
    choices: null,
    effect: (p) => {
      p.setMem('daNightQuestionDone', true)
      p.addFlag('dying_consciousness')
      p.e += 5
      p.m -= 4
    },
  },

  // ── 5. SOMEONE GONE BEFORE ──────────────────────────────────────────────────
  // A peer dies. You understand what this means.
  {
    id: 'da_peer_dies',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.mem?.daPeerDiesDone &&
      G.age >= 79 && G.age <= 90,
    text: 'Someone you have known for most of your life dies, and now you are accounting for the absence. Not grief exactly — grief you have been through. This is something quieter: the understanding that the people who knew you when you were young are becoming fewer. The witnesses to your earlier self are leaving, one by one, and with each one goes a portion of the record. There will be a last one. At some point, you understand, that last one will be you.',
    choices: null,
    effect: (p) => {
      p.setMem('daPeerDiesDone', true)
      p.addFlag('last_witnesses_going')
      p.m -= 8
      p.e += 4
      p.r += 5
    },
  },

  // ── 6. THE ACCEPTANCE ────────────────────────────────────────────────────────
  // The one that is quiet and not dramatic.
  {
    id: 'da_acceptance',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.daAcceptanceDone &&
      G.flags.has('dying_arc_begun') &&
      G.age >= 82,
    text: 'You have arrived at something you couldn\'t have named earlier. Not resignation — not giving up. More like: you have put down the argument with the fact of it. The life was this. You lived it in this direction, made these choices, carried these things. It did not resolve neatly. It was not supposed to. At some point the arguing with its shape becomes less important than inhabiting whatever of it remains.',
    choices: null,
    effect: (p) => {
      p.setMem('daAcceptanceDone', true)
      p.addFlag('acceptance')
      p.addFlag('found_meaning')
      p.addFlag('peace')
      p.m += 10
      p.e += 5
      p.r -= 10
      p.legacy += 5
    },
  },

]
