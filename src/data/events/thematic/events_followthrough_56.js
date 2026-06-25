// events_followthrough_56.js
// Sibling arc depth: late midlife and late_life follow-throughs for the sibling
// relationship flags set in events_siblings.js. Covers the emigrated sibling
// relationship calcifying over decades, being the one who stayed, meeting an
// estranged sibling at a parent's funeral, inheritance disputes, the strong-bond
// sibling in late life, being the last surviving sibling, the 20-year estrangement
// question, caretaking, and the uncanny resemblance that age produces.
// 10 events. 2 new flags.

export const FOLLOWTHROUGH_56_EVENTS = [

  // ── THE EMIGRATED SIBLING DECADES LATER ───────────────────────────────────

  {
    id: 'ft56_sib_emigrated_years_later',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.siblings && G.siblings.length > 0 &&
      G.flags.has('sibling_emigrated') &&
      G.age >= 38 && G.age <= 55 &&
      !G.mem?.ft56SibEmigLater,
    text: (G) => {
      const s = G.siblings[0]
      return `${s?.name ?? 'Your sibling'} has been gone long enough now that the absence has become a kind of presence. You talk on the phone — WhatsApp now, video calls on holidays — and the connection is real and also partial in a way that wasn't true at the beginning. They have a life you cannot imagine completely. You have a life they know in the edited version. The strangeness is that neither of you notices this most of the time. Then occasionally you do.`
    },
    choices: [
      {
        text: 'Plan a visit — one of you goes to the other. Make it real.',
        tag: null,
        outcome: 'The visit is not what either of you expected. It is also good. The gap between the edited version and the actual person narrows for a while.',
        effect: (p) => {
          p.m += 6
          p.r -= 3
          p.setMem('ft56SibEmigLater', true)
        },
      },
      {
        text: 'Accept that this is what it is now. Distance became the shape of it.',
        tag: null,
        outcome: 'The acceptance is not resignation, quite. It is honesty about what emigration does to a sibling relationship over decades.',
        effect: (p) => {
          p.r += 5
          p.m -= 2
          p.setMem('ft56SibEmigLater', true)
        },
      },
    ],
    effect: null,
  },

  // ── THE STAYER ────────────────────────────────────────────────────────────

  {
    id: 'ft56_sib_the_stayer',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.siblings && G.siblings.length > 0 &&
      G.flags.has('sibling_emigrated') &&
      G.age >= 35 && G.age <= 52 &&
      !G.mem?.ft56SibStayer,
    text: (G) => {
      const s = G.siblings[0]
      return `${s?.name ?? 'Your sibling'} left. You stayed. At first this was not a position — it was just the shape of what happened. Now, years in, it has accumulated into something. You are the one who knows where the parents' documents are. You are the one who goes to the funerals. You are the one the parents call when something goes wrong, and something goes wrong regularly now. The arrangements that accumulate around an aging family fall to the person who is present. You are present.`
    },
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 4
      p.karma += 5
      p.addFlag('sib_the_stayer')
      p.setMem('ft56SibStayer', true)
    },
  },

  // ── ESTRANGED AT PARENT'S FUNERAL ─────────────────────────────────────────

  {
    id: 'ft56_sib_estranged_funeral',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.siblings && G.siblings.length > 0 &&
      G.flags.has('sibling_estranged') &&
      (!G.parents?.father?.alive || !G.parents?.mother?.alive) &&
      G.age >= 40 &&
      !G.mem?.ft56SibFuneral,
    text: (G) => {
      const s = G.siblings[0]
      return `You see ${s?.name ?? 'your sibling'} across the room at the service. The years of not speaking are a physical thing between you — not a wall, something less solid than a wall but harder to walk through. You both do the things the day requires: you speak to the same people, handle the same logistics, receive the same condolences. For a few hours you are the children of this person together, which was the original fact before everything else.`
    },
    choices: [
      {
        text: 'Find a moment to speak to them. Not to resolve it — just to speak.',
        tag: null,
        outcome: 'The conversation is short and does not fix what is broken. It is also not nothing. You exchanged words at your parent\'s funeral. That will be part of the memory.',
        effect: (p) => {
          p.m += 4
          p.r -= 3
          p.setMem('ft56SibFuneral', true)
        },
      },
      {
        text: 'Get through the day and leave. The estrangement is not the day\'s business.',
        tag: null,
        outcome: 'You managed it. The parent is buried. The estrangement is intact. Later you will think about whether that was the right call.',
        effect: (p) => {
          p.r += 5
          p.m -= 4
          p.setMem('ft56SibFuneral', true)
        },
      },
    ],
    effect: null,
  },

  // ── INHERITANCE DISPUTE ────────────────────────────────────────────────────

  {
    id: 'ft56_sib_inheritance',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.siblings && G.siblings.length > 0 &&
      (!G.parents?.father?.alive || !G.parents?.mother?.alive) &&
      G.age >= 40 &&
      !G.mem?.ft56SibInherit,
    text: (G) => {
      const s = G.siblings[0]
      return `The question of the house — or the savings, or the land, depending on what your family had — comes up within weeks. The conversation with ${s?.name ?? 'your sibling'} reveals things about each of you that were present all along: assumptions about fairness, about who sacrificed what and for whom, about what your parents would have wanted versus what they actually said. Some families do this cleanly. Many do not. What is at stake is not mainly the money.`
    },
    choices: [
      {
        text: 'Be fair, even if the split does not feel equal to you.',
        tag: null,
        outcome: 'The fairness costs you something concrete and saves the relationship. What you gave up is real and also not the whole of what matters.',
        effect: (p) => {
          p.m += 3
          p.r -= 2
          p.karma += 6
          p.addFlag('sib_inheritance_conflict')
          p.setMem('ft56SibInherit', true)
        },
      },
      {
        text: 'Hold to what you believe you are owed.',
        tag: null,
        outcome: 'The position is not wrong. The relationship pays for it. How much it pays depends on what the relationship was already.',
        effect: (p) => {
          p.mo += 3000
          p.r += 7
          p.addFlag('sib_inheritance_conflict')
          p.setMem('ft56SibInherit', true)
        },
      },
    ],
    effect: null,
  },

  // ── STRONG BOND IN LATE LIFE ───────────────────────────────────────────────

  {
    id: 'ft56_sib_strong_bond_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.siblings && G.siblings.length > 0 &&
      G.flags.has('sibling_bond_strong') &&
      G.age >= 62 &&
      !G.mem?.ft56SibBondLate,
    text: (G) => {
      const s = G.siblings[0]
      return `The private language you and ${s?.name ?? 'your sibling'} built when you were children — the shorthand, the references that require no explanation — is still there. You discover this on a phone call or at a family gathering: a word, a gesture, and you both know exactly what it means without having used it in thirty years. The person who was in the house with you in the beginning is still the person who knows the house from the inside. That does not diminish with age. It gets rarer.`
    },
    choices: null,
    effect: (p) => {
      p.m += 8
      p.r -= 3
      p.setMem('ft56SibBondLate', true)
    },
  },

  // ── THE LAST SIBLING ──────────────────────────────────────────────────────

  {
    id: 'ft56_sib_last_one',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.siblings && G.siblings.length > 0 &&
      G.flags.has('sibling_died') &&
      G.age >= 65 &&
      !G.mem?.ft56SibLastOne,
    text: `You are now the only one left who remembers the household from the inside. The sibling who shared that space with you — the house as it was, the parents as they were before they were parents the way old people are parents — is gone. There is no one left to say: do you remember when. The memory of the early life is now exclusively yours, which changes its character. A witnessed past is one thing. An unwitnessed one is another. You are the last witness.`,
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 8
      p.addFlag('sib_last_sibling')
      p.setMem('ft56SibLastOne', true)
    },
  },

  // ── 20-YEAR ESTRANGEMENT ──────────────────────────────────────────────────

  {
    id: 'ft56_sib_long_estrangement',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.siblings && G.siblings.length > 0 &&
      G.flags.has('sibling_estranged') &&
      !G.flags.has('sibling_reconciled') &&
      G.age >= 62 &&
      !G.mem?.ft56SibLongEst,
    text: (G) => {
      const s = G.siblings[0]
      return `It has been long enough that the estrangement from ${s?.name ?? 'your sibling'} is not a rupture anymore — it is a fact. You have both built lives in which the other does not appear. You are aware of them the way you are aware of distant weather: you know they exist, you hear occasionally through the network, you register the information without it changing your day. What is left now is a question you have not fully answered: at this age, does it matter to try? Does not trying matter?`
    },
    choices: [
      {
        text: 'Reach out. You are old enough to not need to win.',
        tag: null,
        outcome: 'They respond. Not warmly — carefully. Something that had been closed for twenty years opens, a little. That is more than you expected.',
        effect: (p) => {
          p.m += 6
          p.r -= 5
          p.karma += 7
          p.setMem('ft56SibLongEst', true)
        },
      },
      {
        text: 'Leave it. The life you built without them is the life you have.',
        tag: null,
        outcome: 'The decision is made and stays made. The occasional wondering remains. You have decided that is acceptable.',
        effect: (p) => {
          p.r += 6
          p.m -= 3
          p.setMem('ft56SibLongEst', true)
        },
      },
    ],
    effect: null,
  },

  // ── CARETAKING REVERSAL ────────────────────────────────────────────────────

  {
    id: 'ft56_sib_caretaking',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.siblings && G.siblings.length > 0 &&
      G.age >= 45 && G.age <= 62 &&
      !G.mem?.ft56SibCaretake,
    text: (G) => {
      const s = G.siblings[0]
      return `${s?.name ?? 'Your sibling'} is not well in a way that requires managing. Not a crisis — something slower: a health situation that needs checking on, a financial situation that has become precarious, a state of life that the person you grew up alongside should not be in alone. The question of what you do about it arrives without announcement. You had not planned to be in this position. You had not planned not to be.`
    },
    choices: [
      {
        text: 'Show up — regularly, not dramatically. Just be there.',
        tag: null,
        outcome: 'The showing up becomes part of your weeks. It changes you in ways that are hard to name. They need you and you are there.',
        effect: (p) => {
          p.m -= 3
          p.karma += 10
          p.r -= 4
          p.setMem('ft56SibCaretake', true)
        },
      },
      {
        text: 'Do what you reasonably can without reshaping your life around it.',
        tag: null,
        outcome: 'You manage it from a distance and arrange what you can arrange. You do not know if it is enough. It may not be.',
        effect: (p) => {
          p.r += 5
          p.setMem('ft56SibCaretake', true)
        },
      },
    ],
    effect: null,
  },

  // ── THE RECONCILED RELATIONSHIP IN LATE LIFE ──────────────────────────────

  {
    id: 'ft56_sib_reconcile_texture',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.siblings && G.siblings.length > 0 &&
      G.flags.has('sibling_reconciled') &&
      G.age >= 62 &&
      !G.mem?.ft56SibReconcile,
    text: (G) => {
      const s = G.siblings[0]
      return `The reconciliation happened years ago now and what remains is not the drama of the reconciliation — it is the ordinary ongoing relationship that followed it. You and ${s?.name ?? 'your sibling'} talk regularly. You know each other's lives again. The estrangement is in the past as a fact, not a wound. What was lost in the years apart is also past. What is strange is how normal it has become — as if the gap were just a very long silence in a conversation that was always going to resume.`
    },
    choices: null,
    effect: (p) => {
      p.m += 7
      p.r -= 4
      p.setMem('ft56SibReconcile', true)
    },
  },

  // ── THE UNCANNY RESEMBLANCE ────────────────────────────────────────────────

  {
    id: 'ft56_sib_resemblance',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.siblings && G.siblings.length > 0 &&
      G.age >= 60 &&
      !G.mem?.ft56SibResemble,
    text: (G) => {
      const s = G.siblings[0]
      return `At this age you look like ${s?.name ?? 'your sibling'}. Not as you both looked at twenty — as your parent looked at this age, which is to say: you look like each other because you both look like the person who made you. The resemblance is startling the first few times, then settles into something you stop noticing. Sometimes a gesture, a way of holding a cup, a particular turn of phrase, and you catch it again. The family face. Carried forward. Being carried forward.`
    },
    choices: null,
    effect: (p) => {
      p.m += 4
      p.r += 3
      p.setMem('ft56SibResemble', true)
    },
  },

]
