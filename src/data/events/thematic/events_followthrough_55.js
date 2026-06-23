// events_followthrough_55.js
// Regret threshold arc: events that fire when the regret stat crosses meaningful
// thresholds at different life phases. Regret is accumulated through choices across
// a life; these events reflect what that accumulated weight FEELS like in practice.
// No new flags. 10 events.

export const FOLLOWTHROUGH_55_EVENTS = [

  // ── MIDLIFE: FIRST REAL ACCOUNTING ────────────────────────────────────────

  {
    id: 'ft55_regret_midlife_low',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.age >= 38 && G.age <= 52 &&
      G.regret >= 5 && G.regret < 20 &&
      !G.mem?.ft55RegretMidLow,
    text: `You take stock around this age. The choices are behind you — some of them, the defining ones. The road not taken is less a road than a direction you didn't go, and you can imagine where it led, and you find you don't actually want that life. What you have is what you chose, in the ways you chose it. The word for this isn't satisfaction exactly. It's more like a recognition that the choices were yours and most of them were decent choices.`,
    choices: null,
    effect: (p) => {
      p.m += 5
      p.r += 2
      p.setMem('ft55RegretMidLow', true)
    },
  },

  {
    id: 'ft55_regret_midlife_mid',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.age >= 38 && G.age <= 52 &&
      G.regret >= 20 && G.regret < 40 &&
      !G.mem?.ft55RegretMidMid,
    text: `There are things you would do differently. This is a quiet fact, present in the background of most days, audible in the 3am inventory that arrives without invitation. Not specific decisions so much as patterns: the version of yourself that appeared in arguments, the window when the children were small that you were somewhere else for, the year you did not make the call you should have made. The regret is not catastrophic. It is ordinary and yours.`,
    choices: [
      {
        text: 'Name the thing you most want to change and start from there.',
        tag: null,
        outcome: 'The naming is harder than expected. The starting is harder still. Something shifts anyway.',
        effect: (p) => {
          p.m += 3
          p.r -= 4
          p.e += 3
          p.setMem('ft55RegretMidMid', true)
        },
      },
      {
        text: 'Accept it as the texture of a lived life. No one gets through clean.',
        tag: null,
        outcome: 'The acceptance is not resignation. It is a form of honesty about what a life is. The regret stays but changes quality — more like weather than wound.',
        effect: (p) => {
          p.m += 6
          p.r += 3
          p.setMem('ft55RegretMidMid', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'ft55_regret_midlife_high',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.age >= 38 && G.age <= 55 &&
      G.regret >= 40 &&
      !G.mem?.ft55RegretMidHigh,
    text: `The accounting in the middle of a life, when the things that were lost are now fully lost and the things that remain are visible in the light of what wasn't chosen — this accounting has a particular quality. You are not old enough for it to be retrospective. You are still inside it. The life continues. The regret is structural: it shapes what you notice, what you avoid, what you find yourself working against without fully naming why.`,
    choices: [
      {
        text: 'You can still change the direction. Not everything, but something.',
        tag: null,
        outcome: 'The decision to act is not the action. But the decision is also not nothing. It begins here.',
        effect: (p) => {
          p.m += 4
          p.r -= 6
          p.e += 4
          p.karma += 3
          p.setMem('ft55RegretMidHigh', true)
        },
      },
      {
        text: 'Let it be what it is. There is something honest in not pretending.',
        tag: null,
        outcome: 'The honesty is costly and also accurate. The life continues. You stop fighting the accounting and let it be part of the inventory.',
        effect: (p) => {
          p.r += 6
          p.m -= 3
          p.e += 2
          p.setMem('ft55RegretMidHigh', true)
        },
      },
    ],
    effect: null,
  },

  // ── LATE LIFE: WHAT REMAINS ────────────────────────────────────────────────

  {
    id: 'ft55_regret_late_low',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.age >= 60 &&
      G.regret < 15 &&
      !G.mem?.ft55RegretLateLow,
    text: `At this age the question of regret is a real question, not a philosophical one. You answer it honestly: there are things you would have done differently, but they are small things, and the life that resulted from the choices you made is a life you recognise as yours. You are not surprised by it. That is a form of luck and a form of character and the two are not easy to separate.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.r += 2
      p.setMem('ft55RegretLateLow', true)
    },
  },

  {
    id: 'ft55_regret_late_mid',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.age >= 60 &&
      G.regret >= 15 && G.regret < 35 &&
      !G.mem?.ft55RegretLateMid,
    text: `You are old enough now to see the shape of it whole. The shape contains some things you are glad of and some things you carry. The carrying is real — it has weight, it changes the posture. What you have found, slowly, is that the regret and the gratitude are not in different rooms. They are in the same room. The life that produced the one produced the other.`,
    choices: [
      {
        text: 'What you carry is part of who you are now. You would carry it again.',
        tag: null,
        outcome: 'The acceptance arrived at the end rather than the beginning. That is the order it comes in, if it comes at all.',
        effect: (p) => {
          p.m += 7
          p.r += 3
          p.setMem('ft55RegretLateMid', true)
        },
      },
      {
        text: 'There are specific things you are still trying to put right.',
        tag: null,
        outcome: 'There is time for some of it. Not all of it. You work with what time there is.',
        effect: (p) => {
          p.m += 4
          p.r -= 5
          p.karma += 5
          p.setMem('ft55RegretLateMid', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'ft55_regret_late_high',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.age >= 60 &&
      G.regret >= 35 && G.regret < 55 &&
      !G.mem?.ft55RegretLateHigh,
    text: `There is a lot of it. You have lived long enough to know this is not a standard amount. The accumulation is yours — the things chosen and the things not chosen and the things that happened while you were doing something else. The question at this age is not what to do with it. It is mostly just to be honest about it, to yourself, which is harder than it sounds.`,
    choices: [
      {
        text: 'Be honest about it. Without needing it to resolve into something useful.',
        tag: null,
        outcome: 'The honesty without purpose is a different kind of honesty than the kind that leads somewhere. It is enough, sometimes, just to see clearly.',
        effect: (p) => {
          p.r += 5
          p.m += 3
          p.e += 3
          p.setMem('ft55RegretLateHigh', true)
        },
      },
      {
        text: 'There are people you owe something to. Start there.',
        tag: null,
        outcome: 'The accounting that leads to action is the only kind that changes the balance. You begin. You are not done. You begin anyway.',
        effect: (p) => {
          p.m += 6
          p.r -= 6
          p.karma += 8
          p.setMem('ft55RegretLateHigh', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'ft55_regret_late_very_high',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.age >= 60 &&
      G.regret >= 55 &&
      !G.mem?.ft55RegretLateVeryHigh,
    text: `You have carried a lot. Not all of it was within your control — but enough of it was that you cannot cleanly separate the life from the choices that made it. What you arrive at, at this age, with this weight, is something that cannot be called peace. It is closer to clarity: the recognition that this is what the life was, and that you were in it, and that the accounting does not change the fact of it but does change your relationship to it. Whether that is enough is a question only you can answer.`,
    choices: [
      {
        text: 'The life was real even at its worst. You claim it.',
        tag: null,
        outcome: 'The claiming is the hardest thing. Also the only thing that is still available. You do it.',
        effect: (p) => {
          p.m += 8
          p.r += 4
          p.e += 4
          p.setMem('ft55RegretLateVeryHigh', true)
        },
      },
      {
        text: 'There is still something left to do. You do not have to leave it this way.',
        tag: null,
        outcome: 'The thing you do is small. It is also not nothing. That matters more than the size.',
        effect: (p) => {
          p.m += 5
          p.r -= 8
          p.karma += 10
          p.setMem('ft55RegretLateVeryHigh', true)
        },
      },
    ],
    effect: null,
  },

  // ── REGRET AND SPECIFIC RELATIONSHIPS ─────────────────────────────────────

  {
    id: 'ft55_regret_parent_relationship',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 60 &&
      G.regret >= 20 &&
      (!G.parents?.father?.alive || !G.parents?.mother?.alive) &&
      !G.mem?.ft55RegretParent,
    text: `One of the persistent textures of late-life regret is the parent-shaped one — the conversations that did not happen before they died, the things that were said in arguments that were never retracted, the version of your relationship that was improving when it ended. These regrets have a specific quality: they cannot be closed. The relationship is in the past tense now. What you do with that is an internal project rather than an interpersonal one.`,
    choices: [
      {
        text: 'Let what was good stand. The relationship was real even with what it lacked.',
        tag: null,
        outcome: 'The imperfect relationship was still a relationship. Holding both things is the honest position.',
        effect: (p) => {
          p.m += 5
          p.r += 3
          p.setMem('ft55RegretParent', true)
        },
      },
      {
        text: 'Find a way to say what was unsaid — a letter, a grave visit, something.',
        tag: null,
        outcome: 'The saying does not reach them. It reaches you. That is different from nothing.',
        effect: (p) => {
          p.m += 4
          p.r -= 4
          p.karma += 4
          p.setMem('ft55RegretParent', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'ft55_regret_children_window',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 58 &&
      G.regret >= 18 &&
      G.children?.length > 0 &&
      !G.mem?.ft55RegretChildren,
    text: `The window when your children were small — you were working through most of it, or worried through most of it, or simply absent in the way that adults who are carrying everything are absent even when they are present. The window is gone. They are grown. You know what was missed in a way that is more specific now than it was then, because now you can see the people they became and imagine what you might have contributed to the becoming, if you had been more fully there.`,
    choices: [
      {
        text: 'Be there now, fully. The window that remains is not nothing.',
        tag: null,
        outcome: 'They are adults. The relationship is different. The being-there is also different. You commit to the version that is available.',
        effect: (p) => {
          p.m += 6
          p.r -= 5
          p.karma += 6
          p.setMem('ft55RegretChildren', true)
        },
      },
      {
        text: 'Say it — that you know what was missed and you\'re sorry.',
        tag: null,
        outcome: 'Some children can receive this. Some cannot. You say it anyway because it is true and owed.',
        effect: (p) => {
          p.m += 4
          p.r -= 3
          p.karma += 8
          p.setMem('ft55RegretChildren', true)
        },
      },
    ],
    effect: null,
  },

  // ── SOMETHING THAT DID NOT HAPPEN ─────────────────────────────────────────

  {
    id: 'ft55_regret_the_life_not_lived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 65 &&
      G.regret >= 25 &&
      !G.mem?.ft55RegretNotLived,
    text: `There is a life you did not live. Not a fantasy — something more specific: the direction you considered and didn't take, the person you were becoming in a particular year before the path narrowed. You can feel the shape of it even now, from the inside of the life you did live. The two lives are not entirely separate. The one you lived was shaped by what you didn't choose. What you didn't choose was shaped by who you were. The whole thing was you.`,
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m += 4
      p.e += 3
      p.setMem('ft55RegretNotLived', true)
    },
  },

]
