// events_inheritance_arc.js — The inheritance arc
//
// The parent care arc ends with `killParent` and the grief module. What follows
// is not covered anywhere: going through the house, taking something, the estate
// settlement, the sibling dynamics around who gets what, the moment when the
// second parent dies and you are suddenly the oldest generation. And years later:
// what you actually inherited — objects, patterns, yourself.
//
// Guards on `lost_parent` (set by parent_care.js and the natural parent death
// system) and on `G.parents` structure for both-parents-gone detection.

export const INHERITANCE_ARC_EVENTS = [

  {
    id: 'inh_the_sorting',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      G.flags.has('lost_parent') &&
      G.age >= 35 &&
      !G.mem?.inhSorting,
    text: `The house needs to be sorted. You open drawers that were never yours to open: expired coupons, a ball of rubber bands, letters filed in an order that made sense to one person. Some things are worth keeping. Most are not, and you keep some of those anyway.`,
    choices: [
      {
        text: 'Take your time with it. Rushing would be a different kind of loss.',
        tag: null,
        outcome: 'The sorting takes longer than expected. The time is not wasted. Some things become clear during it.',
        effect: (p) => {
          p.m -= 6
          p.karma += 5
          p.addFlag('inh_sorting_happened')
          p.setMem('inhSorting', true)
        },
      },
      {
        text: 'Get through it practically. The objects are objects.',
        tag: null,
        outcome: 'You move through it efficiently. The grief is present whether or not you slow down for it.',
        effect: (p) => {
          p.m -= 8
          p.r += 3
          p.addFlag('inh_sorting_happened')
          p.setMem('inhSorting', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'inh_the_object',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.flags.has('inh_sorting_happened') &&
      G.age >= 35 &&
      !G.mem?.inhObject,
    text: `There is one object from the house that is yours now. Not the valuable things, which have their own paperwork, but the thing that became yours without anyone deciding it. A cup, a tool, the chair from the corner of a room you can still see exactly. You take it home and put it somewhere, on a shelf or in a drawer, and either is right.`,
    choices: null,
    effect: (p) => {
      p.m += 4
      p.addFlag('inh_object_taken')
      p.setMem('inhObject', true)
    },
  },

  {
    id: 'inh_sibling_estate',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.flags.has('lost_parent') &&
      G.siblings?.some(s => s.alive) &&
      G.age >= 38 &&
      !G.mem?.inhSiblingEstate,
    text: `The estate needs to be settled between you and your siblings. It may be a great deal or it may be the house and what is in it. Either way the conversation brings everything that has happened between you since childhood into the room. Most of the time it settles. Sometimes it does not.`,
    choices: [
      {
        text: 'Handle it practically, without allowing old dynamics to take over.',
        tag: null,
        outcome: 'The estate settles. The settlement is complete, if not entirely without tension.',
        effect: (p) => {
          p.m -= 4
          p.r += 2
          p.setMem('inhSiblingEstate', true)
        },
      },
      {
        text: 'The old dynamics take over anyway, despite intentions.',
        tag: null,
        outcome: 'The estate settlement surfaces things. Some of them resolve and some of them do not fully resolve. The relationship with at least one sibling is different afterward.',
        effect: (p) => {
          p.m -= 8
          p.r += 5
          p.addFlag('inh_sibling_rupture')
          p.setMem('inhSiblingEstate', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'inh_what_they_left',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('inh_sorting_happened') &&
      G.age >= 38 &&
      !G.mem?.inhWhatLeft,
    text: (G) => {
      const wealthTier = G.stats?.wealth ?? 50
      if (wealthTier >= 65) {
        return `What your parent left: the house, or its value. Some accounts. Objects that have dollar values attached to them. The presence of the money changes the conversation about the death, slightly, in a register that feels wrong. The conversation it changes is also real. You navigate both.`
      } else if (wealthTier >= 35) {
        return `What your parent left: not much, in the financial sense. The house, if there was a house, or a share of it. Some things that have no market value and a lot of value. The modest inheritance: you were not expecting wealth, and the absence of wealth is not a disappointment, but the amount that arrives — or doesn't arrive — tells you something about how they lived that you didn't fully know while they were living it.`
      }
      return `What your parent left: almost nothing, in material terms. A life was lived with what there was and what there was was not much. The objects are the inheritance. You take what can be taken and the rest is the texture of a life that did not accumulate assets — not from failure but from the circumstances that existed.`
    },
    choices: null,
    effect: (p) => {
      const w = p.stats?.wealth ?? 50
      if (w >= 65) {
        p.mo += 15000
        p.m -= 3
      } else if (w >= 35) {
        p.mo += 2000
        p.m -= 3
      } else {
        p.m -= 5
        p.r += 3
      }
      p.setMem('inhWhatLeft', true)
    },
  },

  {
    id: 'inh_both_parents_gone',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      G.parents &&
      !G.parents.mother?.alive &&
      !G.parents.father?.alive &&
      G.age >= 45 &&
      !G.mem?.inhBothGone,
    text: `Both of your parents are dead now. There was a generation above you and now there is not. Nobody is left who can answer a question about the years before you can remember. It happens without a ceremony, and you understand it slowly, in the middle of ordinary days.`,
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 6
      p.addFlag('inh_both_parents_gone')
      p.setMem('inhBothGone', true)
    },
  },

  {
    id: 'inh_the_patterns',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('inh_both_parents_gone') &&
      G.age >= 58 &&
      !G.mem?.inhPatterns,
    text: `What you inherited that is not money and not an object: a way of holding your shoulders. A sentence that is theirs in your mouth. A fear of one kind of situation, and a steadiness you found when something required it and recognised as theirs. You did not choose any of it. Some of it you can see from the outside now.`,
    choices: null,
    effect: (p) => {
      p.e += 4
      p.r += 3
      p.m += 3
      p.setMem('inhPatterns', true)
    },
  },

  {
    id: 'inh_late_reckoning',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('inh_both_parents_gone') &&
      G.age >= 65 &&
      !G.mem?.inhLateReckoning,
    text: `The accounting of inheritance from the far side of it: what was left in objects, what was left in money (more or less), what was left in patterns that took years to identify, what was left in the knowledge of who those people were — which included things that were not visible until the sorting of the house. You are the age now that they were when you were a child forming your first clear memories of them. You have more information about them than you had at any earlier point in your life, and they are not here to ask. The inheritance is complete and it is ongoing.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 5
      p.karma += 4
      p.addFlag('inh_reckoning_completed')
      p.legacy += 5
      p.setMem('inhLateReckoning', true)
    },
  },

]
