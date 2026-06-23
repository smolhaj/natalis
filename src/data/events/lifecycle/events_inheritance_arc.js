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
    text: `The house that was your parent's house needs to be sorted. This is a specific kind of work. You open cupboards and drawers that were not yours to open and find things that were private in the way that everyday things are private — the expired coupons, the collection of rubber bands, the cards and letters filed in an order that made sense to them. You are making decisions about objects that had a relationship to a person who is no longer here to weight them with that relationship. Some things are worth keeping. Most things are not. The worth and the keeping are separate questions.`,
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
    text: `There is one object from the house that is yours now. Not the valuable things — those have their own logistics — but the object that is yours in the way that some things become yours without a process. A cup. A specific tool. A piece of furniture that sat in a specific corner of a room that you can still see exactly. The object contains the room. The room contains the person. You take the object home and put it where you put it, which is either in a visible place or in a drawer, and both are correct.`,
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
    text: `The estate needs to be settled. Between you and your siblings. The estate may be substantial or it may be the house and what's in it and the decision about what to do with the house, which is itself its own conversation. The conversation about money between siblings who have had different financial lives is a specific conversation. There is no version of it that is entirely without the history of who you each are to each other, which is the history of everything that has happened between you since childhood. Most of the time the estate settles. Sometimes it doesn't.`,
    choices: [
      {
        text: 'Handle it practically, without allowing old dynamics to take over.',
        tag: null,
        outcome: 'The estate settles. The settlement is not entirely without tension. It is complete.',
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
        return `What your parent left: the house, or its value. Some accounts. Objects that have dollar values attached to them. The presence of the money changes the conversation about the death, slightly, in a register that feels wrong. The money is real. The conversation it changes is also real. You navigate both.`
      } else if (wealthTier >= 35) {
        return `What your parent left: not much, in the financial sense. The house, if there was a house, or a share of it. Some things that have no market value and a lot of value. The modest inheritance: you were not expecting wealth, and the absence of wealth is not a disappointment, but the specific amount that arrives — or doesn't arrive — tells you something about how they lived that you didn't fully know while they were living it.`
      }
      return `What your parent left: almost nothing, in material terms. A life was lived with what there was and what there was was not much. The objects are the inheritance. You take what can be taken and the rest is the specific texture of a life that did not accumulate assets — not from failure but from the circumstances that existed.`
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
    text: `Both of your parents are now dead. The phrase has a specific weight that it accumulates slowly rather than arriving at once. There is a generation above you and now there is not. The people who remembered you at the beginning, who carried the specific early information about you, are not here. There is no one left who can answer questions about that period. You are now the oldest version of yourself that exists in anyone's memory. This is the transition that does not have a ceremony. It happens in the background of ordinary life and is understood gradually.`,
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
    text: `What you inherited that has no monetary value and is not an object: a way of holding your shoulders. A sentence structure that is theirs in your mouth. An approach to a specific kind of problem. A fear of a specific kind of situation. A capacity you discovered you had when something required it, and recognized as theirs when it appeared. The inheritance at the level of pattern is not chosen and not refused — it was installed and it operates. You can see some of it from the outside now. You could not always.`,
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
    text: `The accounting of inheritance from the far side of it: what was left in objects, what was left in money (more or less), what was left in patterns that took years to identify, what was left in the specific knowledge of who those people were — which included things that were not visible until the sorting of the house. You are the age now that they were when you were a child forming your first clear memories of them. You have more information about them than you had at any earlier point in your life, and they are not here to ask. The inheritance is complete and it is ongoing.`,
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
