// events_grandparent_arc.js — The grandparent arc
//
// The game has a children arc, a parent care arc, and partner lifecycle events,
// but no arc for the experience of becoming a grandparent. This is a universal
// late-life milestone — affecting almost every person who has children and
// lives long enough — and one of the emotionally richest experiences of late life.
//
// The arc covers: the first grandchild (the specific disorientation of that
// category), the relationship texture, transmitting something, the question the
// grandchild asks about the past, watching them grow up and leave, and the late
// reckoning of what was passed on and what wasn't.
//
// Cannot model actual grandchild in game state (children's children not tracked),
// so events fire based on having children + appropriate age, and prose refers to
// "your grandchild" as a real but untracked person in the character's life.

const hasChildren = (G) => G.children?.some(c => c.alive)

export const GRANDPARENT_ARC_EVENTS = [

  {
    id: 'gp_first_grandchild',
    phase: 'late_life',
    weight: 8,
    when: (G) =>
      hasChildren(G) &&
      G.age >= 50 && G.age <= 70 &&
      !G.mem?.gpFirstGrandchild,
    text: `A child has been born to your child. The category "grandparent" has now applied to you for some hours and you are still calibrating what it means. It is not parent — you know what parent is and this is not that. It is something adjacent to parent but displaced one generation, which means you see it from outside the emergency and with a distance that is new. The baby is small and specific and it is strange that this particular small specific person is in some sense yours and in another sense has nothing to do with you yet.`,
    choices: [
      {
        text: 'Hold them. The calibration can happen later.',
        tag: null,
        outcome: 'The calibration happens through the holding. The category clarifies itself slowly, in the months that follow, through the specific rather than the general.',
        effect: (p) => {
          p.m += 14
          p.addFlag('became_grandparent')
          p.setMem('gpFirstGrandchild', true)
        },
      },
      {
        text: 'Stay at the edge of things. You know your role will come later.',
        tag: null,
        outcome: 'The edge is where you can see everything. Your role arrives when you are needed rather than when the ceremony requires you.',
        effect: (p) => {
          p.m += 10
          p.addFlag('became_grandparent')
          p.setMem('gpFirstGrandchild', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'gp_the_relationship',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      G.flags.has('became_grandparent') &&
      G.age >= 55 &&
      !G.mem?.gpRelationship,
    text: `The relationship that develops between you and your grandchild is not quite any relationship you have had before. You are not responsible for them in the way you were responsible for their parent — the weight has shifted to the generation between you — and this changes what the relationship can be. You can be present without the urgency. You can listen without the intervention you would have performed at their parent's age. The specific freedom of this is something you understand slowly and then suddenly all at once.`,
    choices: null,
    effect: (p) => {
      p.m += 8
      p.karma += 5
      p.addFlag('grandparent_relationship_formed')
      p.setMem('gpRelationship', true)
    },
  },

  {
    id: 'gp_the_teaching',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('became_grandparent') &&
      G.age >= 58 &&
      !G.mem?.gpTeaching,
    text: `There is something you know that is worth passing on, and your grandchild is old enough now to receive it. Not school knowledge — that is being handled elsewhere, by better-qualified people, with better materials than you had. Something else. How to do a specific thing with your hands, or a story about the place where you came from, or a way of thinking about a problem that took you thirty years to arrive at. You show them. They receive it in the partial way that children receive things — enough.`,
    choices: [
      {
        text: 'Teach them the skill. Your hands remember what your mind has half-forgotten.',
        tag: null,
        outcome: 'The skill passes. They will not always know where it came from. That is also fine.',
        effect: (p) => {
          p.m += 7
          p.karma += 6
          p.addFlag('grandparent_transmitted_skill')
          p.setMem('gpTeaching', true)
        },
      },
      {
        text: 'Tell them the story. Some things pass better in words.',
        tag: null,
        outcome: 'The story is imperfect and partial and they will remember a version of it that differs from what you said. This is how stories survive.',
        effect: (p) => {
          p.m += 6
          p.karma += 5
          p.addFlag('grandparent_transmitted_story')
          p.setMem('gpTeaching', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'gp_the_question',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      G.flags.has('became_grandparent') &&
      G.age >= 62 &&
      !G.mem?.gpQuestion,
    text: `Your grandchild, at an age when children begin asking questions that have weight behind them, asks you something about your past. They have heard something — a date, a name, a place — and they want to know what it was like. What it was like to be young when the thing happened. What you were doing when you heard about it. The question is specific and not answerable in the way they expect — the past has the peculiar quality that everyone who was in it was doing something ordinary at the time — but you try to answer it anyway.`,
    choices: [
      {
        text: 'Answer as fully as you can. They deserve to know where they come from.',
        tag: null,
        outcome: 'The full answer takes longer than expected. They listen. Some of it will stay with them.',
        effect: (p) => {
          p.m += 8
          p.karma += 7
          p.addFlag('grandparent_answered_question')
          p.setMem('gpQuestion', true)
        },
      },
      {
        text: 'Give them something, but not everything. Some things are not for the young.',
        tag: null,
        outcome: 'The partial answer is still an answer. What you withheld you believed should be withheld. The belief may or may not have been correct.',
        effect: (p) => {
          p.m += 4
          p.r += 3
          p.setMem('gpQuestion', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'gp_grandchild_leaves',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      G.flags.has('grandparent_relationship_formed') &&
      G.age >= 68 &&
      !G.mem?.gpLeaves,
    text: `The grandchild who grew up in your proximity — who was small and then not small, who received things from you and gave things back in the improvised way that children give — has now left for somewhere else. University, or the city, or another country, or simply another life. The proximity that was the condition of the relationship has ended. The relationship continues in its adjusted form: calls, visits, messages that arrive out of sequence. This is not loss. It is the correct trajectory of a child becoming a person. You know this. The apartment is still quieter than it was.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 4
      p.setMem('gpLeaves', true)
    },
  },

  {
    id: 'gp_distant_grandchild',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('became_grandparent') &&
      G.flags.has('emigrated') &&
      G.age >= 65 &&
      !G.mem?.gpDistant,
    text: `The grandchild grows up in another country. You see them in photographs first and then on a screen and then, when it is managed, in person — which is always shorter than anticipated and always different from the screen. They speak the language of where they live, which is not your language, or it is your language but with an accent that would never place them here. They know you in the way that grandchildren know grandparents at a distance: as a presence and a warmth and a name attached to a face, but not the full accumulation of time in proximity that is the other kind of knowing.`,
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 6
      p.karma += 3
      p.setMem('gpDistant', true)
    },
  },

  {
    id: 'gp_late_reckoning',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      G.flags.has('became_grandparent') &&
      G.age >= 72 &&
      !G.mem?.gpLateReckoning,
    text: `The accounting of grandparenthood from the vantage of late years: what was passed on and what wasn't; what they received from you and what they will not know came from you; the specific times when you were what they needed and the specific times when you were not. The grandchild is a person now, more or less, and the person they became is partly from you and mostly from the thousand other things that shaped them, including the decisions they made themselves. Your contribution is there. It is not always the contribution you planned to make.`,
    choices: null,
    effect: (p) => {
      p.m += 6
      p.r += 3
      p.karma += 6
      p.addFlag('grandparent_late_reckoning')
      p.legacy += 10
      p.setMem('gpLateReckoning', true)
    },
  },

  {
    id: 'gp_multiple_grandchildren',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.has('became_grandparent') &&
      G.children?.filter(c => c.alive)?.length >= 2 &&
      G.age >= 65 &&
      !G.mem?.gpMultiple,
    text: `There are now several grandchildren and the household during visits has a particular quality of organized chaos that you recognize from when your own children were this age, except that you are now watching from the chair rather than managing it. The noise level. The specific way a child of four uses a surface that is not designated as a surface. The negotiations over food. You observe all of this and find, to your surprise, that you are not tired by it in the way you would have been tired by it thirty years ago — the distance from responsibility has changed its texture entirely.`,
    choices: null,
    effect: (p) => {
      p.m += 10
      p.setMem('gpMultiple', true)
    },
  },

]
