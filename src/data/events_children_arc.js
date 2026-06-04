// events_children_arc.js
// The full arc of parenthood — school milestones, teen years, adult children,
// grandchildren, achievement, and loss. Fires from the parent's perspective.
// Gate on G.children && G.children.length > 0.

export const CHILDREN_ARC_EVENTS = [

  // ── SCHOOL MILESTONES ────────────────────────────────────────────────────────

  {
    id: 'child_first_report',
    phase: 'midlife',
    weight: 4,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childFirstReport) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 6 && a <= 8
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 6 && a <= 8
      })
      const name = child?.name ?? 'Your child'
      return `${name}'s first school report arrives in an envelope you open at the kitchen table. The marks are mostly fine. One number is worse than you expected and you catch yourself sitting with it longer than the good ones. You put the report on the counter and go make dinner and come back to it twice.`
    },
    choices: [
      {
        text: 'Make the good ones the story you tell',
        tag: null,
        outcome: 'You frame it as encouragement. The number you worried about stays quietly inside you.',
        effect: (p) => { p.m += 5; p.karma += 3; p.setMem('childFirstReport', true) },
      },
      {
        text: 'Ask about the weak subject first',
        tag: null,
        outcome: 'The conversation is short. They look at the table. You try not to make it about you.',
        effect: (p) => { p.m += 2; p.e += 2; p.setMem('childFirstReport', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_struggling_school',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childStrugglingSchool) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 8 && a <= 14
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 8 && a <= 14
      })
      const name = child?.name ?? 'Your child'
      return `The teacher requests a meeting. She is kind about it, which is almost harder — the careful phrasing, the concern that has been accumulating for some time before you knew. ${name} is falling behind in reading. Not dramatically. Enough. You drive home with the specific silence of a problem you should have noticed earlier.`
    },
    choices: [
      {
        text: 'Find a tutor',
        tag: null,
        outcome: 'The sessions happen every Wednesday. Progress is slow and real.',
        effect: (p) => { p.m -= 5; p.mo -= 800; p.e += 3; p.setMem('childStrugglingSchool', true) },
      },
      {
        text: 'Work through it with them yourself, evenings',
        tag: null,
        outcome: 'The kitchen table becomes a study hall. Some nights go well. Some nights end in frustration. On balance, something improves.',
        effect: (p) => { p.m -= 3; p.e += 4; p.karma += 3; p.setMem('childStrugglingSchool', true) },
      },
      {
        text: 'Wait and see — children develop at different rates',
        tag: null,
        outcome: 'They find their footing eventually. The gap narrows. You are not sure how much was waiting and how much was luck.',
        effect: (p) => { p.m -= 8; p.r += 5; p.setMem('childStrugglingSchool', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_university_acceptance',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childUniversityAcceptance) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 17 && a <= 19
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 17 && a <= 19
      })
      const name = child?.name ?? 'Your child'
      return `The letter arrives, or the email, or the phone notification — the format has changed but the fact has not. ${name} got in. You stand in the kitchen with the news and feel something you cannot name cleanly: pride, and the cost of it, and the distance that is coming, and pride again.`
    },
    choices: [
      {
        text: 'Celebrate properly — this is real',
        tag: null,
        outcome: 'You make a meal they like. The evening is uncomplicated in a way evenings rarely are now.',
        effect: (p) => { p.m += 12; p.mo -= 200; p.addFlag('child_went_to_university'); p.setMem('childUniversityAcceptance', true) },
      },
      {
        text: 'Start looking at the numbers',
        tag: null,
        outcome: 'The finances are what they are. You find a way through them.',
        effect: (p) => { p.m += 6; p.mo -= 3000; p.addFlag('child_went_to_university'); p.setMem('childUniversityAcceptance', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_drops_out',
    phase: 'midlife',
    weight: 2,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (!G.flags.includes('child_went_to_university')) return false
      if (G.mem.childDropsOut) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 18 && a <= 22
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 18 && a <= 22
      })
      const name = child?.name ?? 'Your child'
      return `${name} calls on a Tuesday. Not to check in — the call has a shape you recognize before they say anything. They are leaving university. They have thought about this. They are not asking permission. You hold the phone and locate what you actually feel, which is not the same as what comes out of your mouth.`
    },
    choices: [
      {
        text: 'Ask what the plan is — and mean it as a question, not a challenge',
        tag: null,
        outcome: 'They have a plan, or most of one. You listen. The conversation ends better than it started.',
        effect: (p) => { p.m -= 8; p.karma += 5; p.setMem('childDropsOut', true) },
      },
      {
        text: 'Tell them what you think',
        tag: null,
        outcome: 'You say it. They hear it. The call ends shortly after. It takes a few weeks before the silence lifts.',
        effect: (p) => { p.m -= 12; p.r += 6; p.setMem('childDropsOut', true) },
      },
      {
        text: 'Accept it — it is their life',
        tag: null,
        outcome: 'You say you support them. The sentence costs something. You mean it anyway.',
        effect: (p) => { p.m -= 5; p.karma += 8; p.setMem('childDropsOut', true) },
      },
    ],
    effect: null,
  },

  // ── TEEN YEARS ───────────────────────────────────────────────────────────────

  {
    id: 'child_teen_conflict',
    phase: 'midlife',
    weight: 4,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childTeenConflict) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 14 && a <= 17
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 14 && a <= 17
      })
      const name = child?.name ?? 'Your child'
      return `${name} comes home two hours late. They told you they were at a friend's house. You called the friend's mother at nine o'clock. The conversation was awkward on both sides. When they come through the door, they look at you and know immediately that you know. There is a silence in the hallway.`
    },
    choices: [
      {
        text: 'Have the conversation now, while it is real',
        tag: null,
        outcome: 'The argument is loud and reaches nothing definitive. By morning the air has shifted slightly.',
        effect: (p) => { p.m -= 6; p.s += 2; p.setMem('childTeenConflict', true) },
      },
      {
        text: 'Sleep on it and talk in the morning',
        tag: null,
        outcome: 'The morning conversation is quieter and more precise. They don\'t apologize, exactly, but they hear you.',
        effect: (p) => { p.m -= 4; p.karma += 3; p.setMem('childTeenConflict', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_teen_rebellion',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childTeenRebellion) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 14 && a <= 18
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 14 && a <= 18
      })
      const name = child?.name ?? 'Your child'
      return `${name} stops talking to you. Not with a fight — just a gradual closing of doors. Single-word answers. Meals eaten fast. Somewhere in the last year, the access you had to their interior life quietly ended and you did not notice until it was over. Three months pass like this.`
    },
    choices: [
      {
        text: 'Give them the space — they will come back',
        tag: null,
        outcome: 'They do. It takes longer than you would like. The door opens again, changed.',
        effect: (p) => { p.m -= 10; p.r += 4; p.karma += 5; p.setMem('childTeenRebellion', true) },
      },
      {
        text: 'Find a way to reach them — a drive, a task, something side by side',
        tag: null,
        outcome: 'You engineer an hour without it being a conversation. Something unguarded happens in it.',
        effect: (p) => { p.m -= 5; p.s += 3; p.karma += 4; p.setMem('childTeenRebellion', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_teen_trouble',
    phase: 'midlife',
    weight: 2,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childTeenTrouble) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 13 && a <= 17
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 13 && a <= 17
      })
      const name = child?.name ?? 'Your child'
      const scenario = Math.random() < 0.5
        ? `The school calls: ${name} was in a fight. Another student. No one was seriously hurt. The word suspended is used.`
        : `The school calls. The vice-principal is careful with the phrasing: ${name} was found with something they shouldn't have had. There will be consequences.`
      return `${scenario} You are at work when your phone rings. You sit in your car in the car park for a moment before starting the engine.`
    },
    choices: [
      {
        text: 'Go in, stay calm, and get the full picture before reacting',
        tag: null,
        outcome: 'The meeting is difficult. You hear things that surprise you. Some of them are about your child; some of them are about the school.',
        effect: (p) => { p.m -= 10; p.e += 3; p.setMem('childTeenTrouble', true) },
      },
      {
        text: 'Defend your child first, understand later',
        tag: null,
        outcome: 'You hold the line in the meeting. Afterward, alone with them, you ask the questions you should have asked in the room.',
        effect: (p) => { p.m -= 8; p.r += 5; p.setMem('childTeenTrouble', true) },
      },
      {
        text: 'Make it clear this cannot happen again and mean it',
        tag: null,
        outcome: 'The consequences at home are real. The relationship survives them.',
        effect: (p) => { p.m -= 12; p.karma += 2; p.setMem('childTeenTrouble', true) },
      },
    ],
    effect: null,
  },

  // child_comes_out — three variants: criminalized country, accepting parent (karma>=60),
  // struggling parent (karma<40), and uncertain parent (middle). Only one fires per playthrough.

  {
    id: 'child_comes_out_criminalized',
    phase: 'midlife',
    weight: 2,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childComesOut) return false
      if (!G.lgbtqCriminalized) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 15 && a <= 22
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 15 && a <= 22
      })
      const name = child?.name ?? 'Your child'
      return `${name} tells you at the kitchen table, quietly, with the specific bravery of someone who has been carrying this alone for a long time. You understand in the same moment what they are telling you and what it means in this country, in this time, for your child who is sitting across from you. The weight of it is in both directions at once.`
    },
    choices: [
      {
        text: 'Hold them and tell them to be careful — the world outside this room is dangerous',
        tag: null,
        outcome: 'They know. They have always known. Saying it aloud is not a warning so much as a covenant.',
        effect: (p) => { p.m -= 8; p.karma += 10; p.addFlag('child_came_out'); p.setMem('childComesOut', true) },
      },
      {
        text: 'Tell them this must stay inside the family',
        tag: null,
        outcome: 'They nod. The conversation closes. You are not certain what it has cost them to close it.',
        effect: (p) => { p.m -= 15; p.r += 8; p.addFlag('child_came_out'); p.setMem('childComesOut', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_comes_out_accepting',
    phase: 'midlife',
    weight: 2,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childComesOut) return false
      if (G.lgbtqCriminalized) return false
      if (G.karma < 60) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 15 && a <= 22
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 15 && a <= 22
      })
      const name = child?.name ?? 'Your child'
      return `${name} tells you. You can see how much the telling cost them — the careful phrasing, the watching your face. You reach across the table. You tell them you love them and that nothing about this changes that. Their shoulders drop about half an inch. You both sit there a moment.`
    },
    choices: [
      {
        text: 'Tell them you love them and you are glad they told you',
        tag: null,
        outcome: 'The relief on their face is immediate and complete. Something that had been braced relaxes.',
        effect: (p) => { p.m += 8; p.karma += 8; p.addFlag('child_came_out'); p.setMem('childComesOut', true) },
      },
      {
        text: 'Ask if there is someone — if there is already a person in their life',
        tag: null,
        outcome: 'There is. You listen to the name and the details. The conversation goes on for an hour. This is new territory for both of you and it is good.',
        effect: (p) => { p.m += 10; p.s += 4; p.karma += 6; p.addFlag('child_came_out'); p.setMem('childComesOut', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_comes_out_struggling',
    phase: 'midlife',
    weight: 2,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childComesOut) return false
      if (G.lgbtqCriminalized) return false
      if (G.karma >= 40) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 15 && a <= 22
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 15 && a <= 22
      })
      const name = child?.name ?? 'Your child'
      return `${name} tells you. You sit with the words in your mouth. What comes out is not what they needed to hear. They leave the room. You sit at the table for a long time with the conversation replaying, and the version of you in the replay does better, and you know the real version is what they will carry.`
    },
    choices: [
      {
        text: 'Find them later and try to repair what you said',
        tag: null,
        outcome: 'The apology is imperfect. They accept it carefully, at a distance. The work of it will take longer than one conversation.',
        effect: (p) => { p.m -= 10; p.r += 10; p.karma += 5; p.addFlag('child_came_out'); p.setMem('childComesOut', true) },
      },
      {
        text: 'Stay in your position — you believe what you believe',
        tag: null,
        outcome: 'They do not come home for months. The house is quiet with a specific quality of quiet.',
        effect: (p) => { p.m -= 20; p.r += 18; p.karma -= 8; p.addFlag('child_came_out'); p.setMem('childComesOut', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_comes_out_uncertain',
    phase: 'midlife',
    weight: 2,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childComesOut) return false
      if (G.lgbtqCriminalized) return false
      if (G.karma < 40 || G.karma >= 60) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 15 && a <= 22
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 15 && a <= 22
      })
      const name = child?.name ?? 'Your child'
      return `${name} tells you. You say the right words, mostly. You are not certain what you feel and you are careful not to let that uncertainty become their problem. Later, in the weeks that follow, you find your way toward understanding. It takes longer than you would have expected of yourself.`
    },
    choices: [
      {
        text: 'Tell them you love them — even if the rest takes you some time',
        tag: null,
        outcome: 'It is not everything, but it is enough for now. They can see you are trying.',
        effect: (p) => { p.m += 2; p.karma += 6; p.addFlag('child_came_out'); p.setMem('childComesOut', true) },
      },
      {
        text: 'Ask for time to process — and be honest that you need it',
        tag: null,
        outcome: 'The honesty lands better than pretending. They give you the time. You use it.',
        effect: (p) => { p.m -= 4; p.r += 4; p.karma += 4; p.addFlag('child_came_out'); p.setMem('childComesOut', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_first_relationship',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childFirstRelationship) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 16 && a <= 21
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 16 && a <= 21
      })
      const name = child?.name ?? 'Your child'
      return `${name} brings someone home. You make tea, or dinner, and you are pleasant and asked about in the weeks that follow. You make an assessment in the first hour that you keep entirely to yourself. The assessment is specific and partly wrong and partly right and you will not know which parts until later.`
    },
    choices: [
      {
        text: 'Be warm — trust their judgment',
        tag: null,
        outcome: 'The person relaxes. The dynamic between the three of you becomes uncomplicated in the way that domestic things can.',
        effect: (p) => { p.m += 6; p.karma += 4; p.setMem('childFirstRelationship', true) },
      },
      {
        text: 'Be careful — you are watching',
        tag: null,
        outcome: 'You say nothing. You watch. Some of what you see is a projection of old worries. Some of it isn\'t.',
        effect: (p) => { p.m += 2; p.r += 3; p.setMem('childFirstRelationship', true) },
      },
    ],
    effect: null,
  },

  // ── ADULT CHILD EVENTS ───────────────────────────────────────────────────────

  {
    id: 'child_leaves_home',
    phase: 'midlife',
    weight: 4,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childLeavesHome) return false
      const youngest = G.children.reduce((a, b) =>
        (G.age - a.ageAtBirth) < (G.age - b.ageAtBirth) ? a : b
      )
      const youngestAge = G.age - youngest.ageAtBirth
      return youngestAge >= 18 && youngestAge <= 22
    },
    text: 'The last one leaves. You help carry the boxes to the car and there is the drive to the new place and the boxes carried up the stairs. On the drive home the car is lighter than it has ever been. You park in the driveway and sit for a moment. The house is the same temperature it always is. The silence is not hostile. It is just very large.',
    choices: [
      {
        text: 'Let yourself feel the size of it',
        tag: null,
        outcome: 'The evening is long. You eat dinner at a different time than usual. You are surprised to find it is also, strangely, peaceful.',
        effect: (p) => { p.m -= 8; p.r += 4; p.addFlag('empty_nest'); p.setMem('childLeavesHome', true) },
      },
      {
        text: 'Fill the evening — visit someone, go out, make plans',
        tag: null,
        outcome: 'The distraction works as distraction. The house is waiting when you get back. You are better equipped to sit in it now.',
        effect: (p) => { p.m -= 4; p.s += 2; p.addFlag('empty_nest'); p.setMem('childLeavesHome', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_career_choice_different',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childCareerChoiceDifferent) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 22 && a <= 28
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 22 && a <= 28
      })
      const name = child?.name ?? 'Your child'
      return `${name} has decided what they are going to do. It is not a path you would have chosen for them — not because it is wrong, but because it is not legible to you in the way that legible paths are. You find yourself unable to assess whether it is wise. That may be the point.`
    },
    choices: [
      {
        text: 'Ask questions — try to understand what they are actually building',
        tag: null,
        outcome: 'The conversation teaches you something. Not enough to fully picture it, but enough to stop worrying quite as much.',
        effect: (p) => { p.m += 3; p.e += 3; p.karma += 4; p.setMem('childCareerChoiceDifferent', true) },
      },
      {
        text: 'Say you trust them — and leave space for them to ask for help if they need it',
        tag: null,
        outcome: 'They do not ask for months. Then, one evening, they call with a specific question. You answer it. This is the arrangement.',
        effect: (p) => { p.m += 5; p.karma += 6; p.setMem('childCareerChoiceDifferent', true) },
      },
      {
        text: 'Say what you really think',
        tag: null,
        outcome: 'They listen. They disagree. They go ahead with it. The relationship absorbs the disagreement.',
        effect: (p) => { p.m -= 3; p.r += 4; p.setMem('childCareerChoiceDifferent', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_moves_abroad',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childMovesAbroad) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 22 && a <= 35
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 22 && a <= 35
      })
      const name = child?.name ?? 'Your child'
      return `${name} is leaving the country. There is a job, or a person, or simply a need to be somewhere else that you understand without it being explained. You learn the time difference by heart without meaning to. You start doing the arithmetic every time you want to call.`
    },
    choices: [
      {
        text: 'Help with the move — make the departure something to hold, not regret',
        tag: null,
        outcome: 'The goodbye at the airport is real. You drive home through ordinary streets that look the same and aren\'t.',
        effect: (p) => { p.m -= 10; p.karma += 5; p.addFlag('child_lives_abroad'); p.setMem('childMovesAbroad', true) },
      },
      {
        text: 'Make them promise to call — often, and mean it',
        tag: null,
        outcome: 'They do call. Less often than promised, more often than you feared.',
        effect: (p) => { p.m -= 8; p.r += 4; p.addFlag('child_lives_abroad'); p.setMem('childMovesAbroad', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_financial_help',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childFinancialHelp) return false
      if (G.money < 5000) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 22 && a <= 35
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 22 && a <= 35
      })
      const name = child?.name ?? 'Your child'
      const scenario = Math.random() < 0.33
        ? 'a deposit on a flat — they have almost enough but not quite'
        : Math.random() < 0.5
          ? 'a business idea they have been working on for a year'
          : 'a debt that has become difficult to manage alone'
      return `${name} calls on a Sunday evening. The conversation circles for a few minutes before it arrives at the point: they need money. Specifically, ${scenario}. They are not asking lightly. You can hear that.`
    },
    choices: [
      {
        text: 'Give it — with no strings attached',
        tag: null,
        outcome: 'They are relieved in a way that makes the cost easy. You don\'t think about the amount again. Not much.',
        effect: (p) => { p.m += 5; p.mo -= 4000; p.karma += 8; p.setMem('childFinancialHelp', true) },
      },
      {
        text: 'Give it — as a loan, written down',
        tag: null,
        outcome: 'The document lives in a drawer. Whether it is ever repaid matters less than you expected.',
        effect: (p) => { p.m += 2; p.mo -= 4000; p.karma += 4; p.setMem('childFinancialHelp', true) },
      },
      {
        text: 'You don\'t have it to give — be honest about that',
        tag: null,
        outcome: 'The conversation is uncomfortable and ends with understanding. They find another way.',
        effect: (p) => { p.m -= 6; p.r += 5; p.setMem('childFinancialHelp', true) },
      },
      {
        text: 'Tell them you need to think about it',
        tag: null,
        outcome: 'You give yourself a week. The decision you come to is the one you already knew.',
        effect: (p) => { p.m -= 3; p.mo -= 2000; p.setMem('childFinancialHelp', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_wedding',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childWedding) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 24 && a <= 35
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 24 && a <= 35
      })
      const name = child?.name ?? 'Your child'
      return `The wedding is as you expected it and not. There is the ceremony, the photographs, the meal, the dancing. You meet, for the first time in the assembled version, the person who will share ${name}'s ordinary life — the mornings, the bills, the small frictions and recoveries that constitute a life. You are glad for them. The gladness is simple.`
    },
    choices: [
      {
        text: 'Say what you actually feel in the speech — plainly',
        tag: null,
        outcome: 'People are moved. Not by the performance of it — by the fact that you meant it.',
        effect: (p) => { p.m += 15; p.s += 4; p.mo -= 3000; p.addFlag('child_wedding'); p.setMem('childWedding', true) },
      },
      {
        text: 'Keep it short, keep it warm, let the day be theirs',
        tag: null,
        outcome: 'The speech is brief and well-received. The night is long and good.',
        effect: (p) => { p.m += 12; p.mo -= 3000; p.addFlag('child_wedding'); p.setMem('childWedding', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_divorce',
    phase: 'midlife',
    weight: 2,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (!G.flags.includes('child_wedding')) return false
      if (G.mem.childDivorce) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 28 && a <= 45
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 28 && a <= 45
      })
      const name = child?.name ?? 'Your child'
      return `${name} tells you the marriage is ending. You hear what they tell you and you hear what they do not tell you, and the two things together are a portrait of a pain they have been inside for some time without telling you. You think about the wedding. You say very little.`
    },
    choices: [
      {
        text: 'Be what they need right now, not what you think about the situation',
        tag: null,
        outcome: 'They call more in the months that follow. You answer every time.',
        effect: (p) => { p.m -= 8; p.karma += 8; p.setMem('childDivorce', true) },
      },
      {
        text: 'Ask what happened — you want to understand',
        tag: null,
        outcome: 'They tell you some of it. The some of it is enough to understand the rest.',
        effect: (p) => { p.m -= 6; p.e += 2; p.setMem('childDivorce', true) },
      },
      {
        text: 'Tell them what you think — they should know',
        tag: null,
        outcome: 'The conversation goes somewhere you didn\'t intend. You repair it, slowly, over several calls.',
        effect: (p) => { p.m -= 12; p.r += 7; p.setMem('childDivorce', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_estrangement',
    phase: 'midlife',
    weight: 2,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childEstrangement) return false
      const child = G.children[0]
      if (!child) return false
      if (child.relationshipQuality >= 40) return false
      const childAge = G.age - child.ageAtBirth
      return childAge >= 25 && childAge <= 40
    },
    text: (G) => {
      const child = G.children[0]
      const name = child?.name ?? 'Your child'
      return `${name} stops calling. The last conversation was months ago — not a fight, exactly, but something that settled into absence without announcement. You try once and the call goes unanswered and you do not try again for a while. The silence accumulates. It is not like other silences. It has a specific temperature.`
    },
    choices: [
      {
        text: 'Write a letter — some things are easier to say without a response required',
        tag: null,
        outcome: 'You write it and send it. You don\'t know if it is read. The writing of it does something anyway.',
        effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('child_estrangement'); p.setMem('childEstrangement', true) },
      },
      {
        text: 'Give it time — pushing will not help',
        tag: null,
        outcome: 'The time passes. The silence stays. You learn to hold it without it consuming everything.',
        effect: (p) => { p.m -= 16; p.r += 9; p.addFlag('child_estrangement'); p.setMem('childEstrangement', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_reconciliation',
    phase: 'midlife',
    weight: 2,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (!G.flags.includes('child_estrangement')) return false
      if (G.mem.childReconciliation) return false
      const estrangedYear = G.mem.childEstrangement
      if (!estrangedYear || G.currentYear - estrangedYear < 5) return false
      return true
    },
    text: (G) => {
      const child = G.children[0]
      const name = child?.name ?? 'Your child'
      return `${name} reaches out. A message, not a call. The phrasing is careful in a way that tells you they have written it more than once. You read it twice. You do not know what the path forward looks like. You know you want there to be one.`
    },
    choices: [
      {
        text: 'Respond the same day — don\'t make them wait',
        tag: null,
        outcome: 'The reply is careful and warm and imperfect. They respond. The correspondence begins.',
        effect: (p) => { p.m += 15; p.r -= 8; p.karma += 8; p.setMem('childReconciliation', true) },
      },
      {
        text: 'Sit with it before you respond — get the words right',
        tag: null,
        outcome: 'You respond three days later. The reply says the same thing your first draft said. They are glad you answered.',
        effect: (p) => { p.m += 12; p.r -= 5; p.karma += 6; p.setMem('childReconciliation', true) },
      },
    ],
    effect: null,
  },

  // ── GRANDCHILDREN VIA CHILDREN ARC ──────────────────────────────────────────

  {
    id: 'child_announces_pregnancy',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childAnnouncesPregnancy) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 22 && a <= 38
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 22 && a <= 38
      })
      const name = child?.name ?? 'Your child'
      return `${name} tells you they are expecting. The sentence reorganizes the room. You were a child, and then a parent, and now this third thing that you do not yet have language for. The compression of time is total for a moment — all of it at once — and then you say the right words and mean them.`
    },
    choices: [
      {
        text: 'Tell them what it means to you — plainly',
        tag: null,
        outcome: 'The conversation goes to places conversations rarely go. You remember it later in its entirety.',
        effect: (p) => { p.m += 18; p.s += 3; p.addFlag('grandchild_born'); p.setMem('childAnnouncesPregnancy', true) },
      },
      {
        text: 'Ask all the practical questions first — when, where, how are they feeling',
        tag: null,
        outcome: 'The logistics are a love language. They know that. They answer every question.',
        effect: (p) => { p.m += 14; p.e += 2; p.addFlag('grandchild_born'); p.setMem('childAnnouncesPregnancy', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_miscarriage_news',
    phase: 'midlife',
    weight: 2,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childMiscarriageNews) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 22 && a <= 40
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 22 && a <= 40
      })
      const name = child?.name ?? 'Your child'
      return `${name} calls to tell you they have lost the pregnancy. The call is short. You hear what they are not saying in the gaps — the grief without a script, the losses that have no established category. You want to do something. There is very little that can be done. You stay on the phone.`
    },
    choices: [
      {
        text: 'Go to them — or ask when you can',
        tag: null,
        outcome: 'You show up. You do not try to make it make sense. You bring food. You sit with them.',
        effect: (p) => { p.m -= 12; p.karma += 8; p.setMem('childMiscarriageNews', true) },
      },
      {
        text: 'Give them space — check in gently in a few days',
        tag: null,
        outcome: 'They appreciate the message. They are not ready for the visit yet. You wait and then you come.',
        effect: (p) => { p.m -= 10; p.karma += 4; p.setMem('childMiscarriageNews', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_child_sick',
    phase: 'late_life',
    weight: 2,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (!G.flags.includes('grandchild_born')) return false
      if (G.mem.childChildSick) return false
      return true
    },
    text: (G) => {
      const child = G.children[0]
      const name = child?.name ?? 'Your child'
      return `${name} calls and you hear the fear in their voice before you hear the words. The grandchild is in hospital. Something that is probably fine but is not yet confirmed as fine. You are across the city or across the country and there is nothing to do but be on the phone. You understand, for the first time completely, what it felt like to be your own parents when you were the one in the hospital.`
    },
    choices: [
      {
        text: 'Get there as fast as you can',
        tag: null,
        outcome: 'You arrive to a waiting room. The grandchild recovers. The waiting was long and the relief is complete.',
        effect: (p) => { p.m -= 10; p.h -= 3; p.karma += 6; p.setMem('childChildSick', true) },
      },
      {
        text: 'Stay on the phone — keep them company from where you are',
        tag: null,
        outcome: 'You are on the phone for six hours. The grandchild is fine by morning. You sleep badly from relief.',
        effect: (p) => { p.m -= 8; p.s += 3; p.setMem('childChildSick', true) },
      },
    ],
    effect: null,
  },

  // ── CAREER AND ACHIEVEMENT ───────────────────────────────────────────────────

  {
    id: 'child_professional_achievement',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childProfessionalAchievement) return false
      const child = G.children[0]
      if (!child) return false
      if (child.relationshipQuality < 60) return false
      const childAge = G.age - child.ageAtBirth
      return childAge >= 28 && childAge <= 45
    },
    text: (G) => {
      const child = G.children[0]
      const name = child?.name ?? 'Your child'
      return `${name} has done something significant. A promotion, a publication, a thing they built that is now in the world in a real way. You hear about it and you feel the pride that is, if you are honest, partly about you — the years of driving them places, the cost of things, the faith that was not always easy to maintain. You let yourself have the feeling. They have earned it and so have you.`
    },
    choices: null,
    effect: (p) => { p.m += 14; p.karma += 4; p.setMem('childProfessionalAchievement', true) },
  },

  {
    id: 'child_surpasses_you',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childSurpassesYou) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 30 && a <= 45
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 30 && a <= 45
      })
      const name = child?.name ?? 'Your child'
      return `${name} is earning more than you were at their age. Or has built something larger, or achieved something you didn\'t manage. The fact of it arrives and sits with you for a while. What you feel is not what you expected to feel. It is complicated in a way that has less to do with them than with an older question about yourself that this has reopened.`
    },
    choices: [
      {
        text: 'Feel the pride fully — this is what it was supposed to look like',
        tag: null,
        outcome: 'The other thing is still there. But the pride is louder and you let it be.',
        effect: (p) => { p.m += 8; p.r -= 5; p.karma += 5; p.setMem('childSurpassesYou', true) },
      },
      {
        text: 'Sit with the complicated thing — it is honest',
        tag: null,
        outcome: 'You are proud and something else. Both are true. You live in the both for a while.',
        effect: (p) => { p.m += 3; p.r += 5; p.e += 3; p.setMem('childSurpassesYou', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_caretaker',
    phase: 'late_life',
    weight: 3,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childCaretaker) return false
      if (G.age < 70) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 40
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 40
      })
      const name = child?.name ?? 'Your child'
      return `${name} has started checking in differently. More frequently, and with a quality to the questions that is new — how are you eating, are you sleeping, have you seen the doctor. You recognize the posture because it is how you used to ask about them. The reversal is strange and, underneath the strangeness, a specific kind of love.`
    },
    choices: [
      {
        text: 'Let them in — they need this and so do you',
        tag: null,
        outcome: 'The calls are regular. The dynamic settles into something new that fits.',
        effect: (p) => { p.m += 10; p.h += 3; p.karma += 4; p.setMem('childCaretaker', true) },
      },
      {
        text: 'Reassure them you are fine — you don\'t want to be a worry',
        tag: null,
        outcome: 'They are only partly reassured. They keep calling. You find yourself less resistant to it over time.',
        effect: (p) => { p.m += 5; p.r += 3; p.setMem('childCaretaker', true) },
      },
    ],
    effect: null,
  },

  // ── GRIEF / LOSS ─────────────────────────────────────────────────────────────

  {
    id: 'child_serious_illness',
    phase: 'late_life',
    weight: 2,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childSeriousIllness) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 30 && a <= 55
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 30 && a <= 55
      })
      const name = child?.name ?? 'Your child'
      return `${name} has a diagnosis. The word lands differently when it is your child — regardless of their age, regardless of your age. You have been preparing for certain losses your whole adult life. This was not one of them. The wrong order of it is the specific thing. You do not know how to hold it correctly because there is no correct way.`
    },
    choices: [
      {
        text: 'Be there — everything else can wait',
        tag: null,
        outcome: 'You rearrange. You show up. The logistics of it are consuming in a way that is partly a mercy.',
        effect: (p) => { p.m -= 18; p.h -= 4; p.r += 8; p.karma += 6; p.setMem('childSeriousIllness', true) },
      },
      {
        text: 'Ask what they need and follow that, not what you assume',
        tag: null,
        outcome: 'They need different things at different stages. You learn to ask again each time.',
        effect: (p) => { p.m -= 14; p.h -= 3; p.r += 6; p.karma += 8; p.setMem('childSeriousIllness', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'child_death_adult',
    phase: 'late_life',
    weight: 1,
    when: (G) => {
      if (!G.children || G.children.length === 0) return false
      if (G.mem.childDeathAdult) return false
      if (G.age < 55) return false
      return G.children.some(c => {
        const a = G.age - c.ageAtBirth
        return a >= 25
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const a = G.age - c.ageAtBirth
        return a >= 25
      })
      const name = child?.name ?? 'Your child'
      return `${name} dies. You are sitting somewhere ordinary when you find out. You will remember exactly where you were and what the light was doing. Everything after has a different shape. No one is supposed to outlive their children. The loss does not fit any architecture you have built. It is its own country and you will live there now.`
    },
    choices: null,
    effect: (p) => { p.m -= 40; p.h -= 12; p.r += 30; p.addFlag('lost_child'); p.addFlag('bereaved'); p.setMem('childDeathAdult', true) },
  },

  // ── EARLY PARENTHOOD (ages 0–5) ────────────────────────────────────────────

  {
    id: 'child_infant_night',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) => {
      if (!G.children?.length) return false
      if (G.mem?.childInfantNight) return false
      return G.children.some(c => (G.age - c.ageAtBirth) <= 1)
    },
    text: (G) => {
      const child = G.children.find(c => (G.age - c.ageAtBirth) <= 1)
      const name = child?.name?.split(' ')[0] ?? 'The baby'
      return `${name} does not sleep in a way that can be predicted. Nights have become a territory of two-hour windows and the strange lucid exhaustion of someone who is needed without rest. You look at them at 3am and the feeling is too large to live in the same sentence as the tiredness.`
    },
    choices: null,
    effect: (p) => { p.setMem('childInfantNight', true); p.m -= 4; p.h -= 5; p.r += 3 },
  },

  {
    id: 'child_first_word',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) => {
      if (!G.children?.length) return false
      if (G.mem?.childFirstWord) return false
      return G.children.some(c => {
        const ca = G.age - c.ageAtBirth
        return ca >= 1 && ca <= 2
      })
    },
    text: (G) => {
      const child = G.children.find(c => { const ca = G.age - c.ageAtBirth; return ca >= 1 && ca <= 2 })
      const name = child?.name?.split(' ')[0] ?? 'They'
      return `${name} says something that is recognisably a word. Not clearly — more a sound that the context makes into a word. You hear it twice before you're sure. You are sure. You call someone to tell them and it sounds smaller in the telling than it was in the room.`
    },
    choices: null,
    effect: (p) => { p.setMem('childFirstWord', true); p.m += 12 },
  },

  {
    id: 'child_toddler_personality',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) => {
      if (!G.children?.length) return false
      if (G.mem?.childToddlerPersonality) return false
      return G.children.some(c => {
        const ca = G.age - c.ageAtBirth
        return ca >= 2 && ca <= 4
      })
    },
    text: (G) => {
      const child = G.children.find(c => { const ca = G.age - c.ageAtBirth; return ca >= 2 && ca <= 4 })
      const name = child?.name?.split(' ')[0] ?? 'They'
      const traits = child?.traits ?? []
      const trait = traits[0] ?? 'something specific'
      return `${name} is becoming a person with preferences. The preference is ${trait === 'curious' ? 'to know how everything works — the drawer, the door hinge, your face when you say no' : trait === 'shy' ? 'to watch before they join — a minute at the door before entering any room' : trait === 'spirited' ? 'to be in the middle of whatever is happening, always, regardless of permission' : `something you\'re still learning to name`}. You are meeting someone who will know you for the rest of your life.`
    },
    choices: null,
    effect: (p) => { p.setMem('childToddlerPersonality', true); p.m += 8 },
  },

  {
    id: 'child_school_age_independence',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) => {
      if (!G.children?.length) return false
      if (G.mem?.childSchoolAgeIndep) return false
      return G.children.some(c => {
        const ca = G.age - c.ageAtBirth
        return ca >= 5 && ca <= 8
      })
    },
    text: (G) => {
      const child = G.children.find(c => { const ca = G.age - c.ageAtBirth; return ca >= 5 && ca <= 8 })
      const name = child?.name?.split(' ')[0] ?? 'They'
      return `${name} has a life at school that you only know from reports. A best friend whose name you hear constantly. A teacher they talk about. A person who bothered them in the playground, resolved by the following Monday. You are becoming someone who receives news rather than being present. This is correct and a little strange.`
    },
    choices: null,
    effect: (p) => { p.setMem('childSchoolAgeIndep', true); p.m += 5; p.r += 2 },
  },

  // ── CHILD'S EMERGING PATH ──────────────────────────────────────────────────

  {
    id: 'child_interest_emerges',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) => {
      if (!G.children?.length) return false
      if (G.mem?.childInterestEmerges) return false
      return G.children.some(c => {
        const ca = G.age - c.ageAtBirth
        return ca >= 8 && ca <= 13
      })
    },
    text: (G) => {
      const child = G.children.find(c => { const ca = G.age - c.ageAtBirth; return ca >= 8 && ca <= 13 })
      const name = child?.name?.split(' ')[0] ?? 'They'
      const traits = child?.traits ?? []
      const interest = traits.includes('curious') ? 'how things work — the engine, the keyboard, the question nobody thought to ask'
        : traits.includes('sensitive') ? 'stories — reading them, making them up, telling them to anyone who will stay still long enough'
        : traits.includes('spirited') ? 'sport, specifically the particular sport where the quality they have is most useful'
        : traits.includes('funny') ? 'making people laugh, which is a skill that looks accidental and isn\'t'
        : 'something you hadn\'t predicted, which is how it always goes'
      return `${name} is interested in ${interest}. The interest has the texture of a vocation, not a phase. You are watching someone discover what they\'re for.`
    },
    choices: [
      {
        text: 'Invest in it — support the interest actively',
        tag: null,
        outcome: 'Lessons, materials, time. It costs something. So does watching something wither.',
        effect: (p) => { p.setMem('childInterestEmerges', 'supported'); p.mo -= 300; p.m += 8; p.karma += 4 },
      },
      {
        text: 'Encourage it without major investment',
        tag: null,
        outcome: 'You make room for it. The room is enough.',
        effect: (p) => { p.setMem('childInterestEmerges', 'encouraged'); p.m += 5; p.karma += 2 },
      },
      {
        text: 'Gently redirect — the interest isn\'t practical',
        tag: null,
        outcome: 'They redirect, mostly. The interest resurfaces in different forms over the years.',
        effect: (p) => { p.setMem('childInterestEmerges', 'redirected'); p.m -= 2; p.r += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'child_disappoints_you',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => {
      if (!G.children?.length) return false
      if (G.mem?.childDisappoints) return false
      return G.children.some(c => {
        const ca = G.age - c.ageAtBirth
        return ca >= 14 && ca <= 18 && (c.relationshipQuality ?? 60) < 55
      })
    },
    text: (G) => {
      const child = G.children.find(c => {
        const ca = G.age - c.ageAtBirth
        return ca >= 14 && ca <= 18 && (c.relationshipQuality ?? 60) < 55
      })
      const name = child?.name?.split(' ')[0] ?? 'They'
      return `${name} does something that disappoints you. Not catastrophically — no one is in danger — but a choice that reveals a gap between who you thought they were becoming and who they are. You have to decide how much space the disappointment gets.`
    },
    choices: [
      {
        text: 'Have the conversation — name what happened',
        tag: null,
        outcome: 'The conversation is uncomfortable and necessary. They hear some of it. That\'s enough for now.',
        effect: (p) => { p.setMem('childDisappoints', 'talked'); p.m -= 3; p.karma += 3 },
      },
      {
        text: 'Give it time — you don\'t want to push them further away',
        tag: null,
        outcome: 'The silence holds something. So does the distance.',
        effect: (p) => { p.setMem('childDisappoints', 'waited'); p.m -= 5; p.r += 3 },
      },
    ],
    effect: null,
  },

  {
    id: 'child_adult_path_revealed',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) => {
      if (!G.children?.length) return false
      if (G.mem?.childAdultPath) return false
      return G.children.some(c => (G.age - c.ageAtBirth) >= 18 && (G.age - c.ageAtBirth) <= 25)
    },
    text: (G) => {
      const child = G.children.find(c => { const ca = G.age - c.ageAtBirth; return ca >= 18 && ca <= 25 })
      const name = child?.name?.split(' ')[0] ?? 'They'
      const q = child?.relationshipQuality ?? 60
      if (q >= 70) {
        return `${name} is finding their shape in the world. The path they are taking is not the one you imagined for them, and it is more clearly theirs than anything you imagined would have been. You tell them this. The conversation stays with you.`
      }
      return `${name} is finding their path, largely without your input. You hear about it in fragments. What you wanted for them and what they are choosing are not the same. You are working out how much that matters.`
    },
    choices: null,
    effect: (p) => {
      const children = p._state?.children ?? []
      const child = children.find(c => {
        const ca = (p._state?.age ?? 0) - c.ageAtBirth
        return ca >= 18 && ca <= 25
      })
      const q = child?.relationshipQuality ?? 60
      p.setMem('childAdultPath', true)
      if (q >= 70) { p.m += 8; p.karma += 3 }
      else { p.m -= 3; p.r += 5 }
    },
  },

  // ── MILESTONE MOMENTS ─────────────────────────────────────────────────────

  {
    id: 'child_milestone_ten',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) => {
      if (!G.children?.length || G.mem?.childMilestoneTen) return false
      return G.children.some(c => { const ca = G.age - c.ageAtBirth; return ca >= 9 && ca <= 11 })
    },
    text: (G) => {
      const child = G.children.find(c => { const ca = G.age - c.ageAtBirth; return ca >= 9 && ca <= 11 })
      const name = child?.name?.split(' ')[0] ?? 'Your child'
      return `${name} is ten. You have photographs of them as a baby that feel impossible — not like a different child but like a different creature, something pre-verbal and soft. The person who now corrects your mispronunciations and has opinions about their friends and sometimes goes quiet for entire evenings is continuous with that creature. You cannot locate the transition. It happened while you were present.`
    },
    choices: null,
    effect: (p) => { p.m += 6; p.r += 2; p.setMem('childMilestoneTen', true) },
  },

  {
    id: 'child_milestone_sixteen',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) => {
      if (!G.children?.length || G.mem?.childMilestoneSixteen) return false
      return G.children.some(c => { const ca = G.age - c.ageAtBirth; return ca >= 15 && ca <= 17 })
    },
    text: (G) => {
      const child = G.children.find(c => { const ca = G.age - c.ageAtBirth; return ca >= 15 && ca <= 17 })
      const name = child?.name?.split(' ')[0] ?? 'Your child'
      const q = child?.relationshipQuality ?? 60
      if (q >= 65) {
        return `${name} is sixteen. There are parts of their life you are not part of — friends you have not met, conversations you will not hear. This is correct. You watch them from a small distance and feel the specific satisfaction of a person becoming themselves without requiring your permission.`
      }
      return `${name} is sixteen. The distance between you is real and it has been growing for two years. You tell yourself this is normal. You tell yourself they will come back when they are older. You hope you are right, and you do not know how to accelerate it.`
    },
    choices: null,
    effect: (p) => {
      const child = (p._state?.children ?? []).find(c => {
        const ca = (p._state?.age ?? 0) - c.ageAtBirth
        return ca >= 15 && ca <= 17
      })
      const q = child?.relationshipQuality ?? 60
      if (q >= 65) { p.m += 5; p.karma += 2 } else { p.m -= 3; p.r += 4 }
      p.setMem('childMilestoneSixteen', true)
    },
  },

  {
    id: 'child_milestone_leaving',
    phase: 'midlife',
    weight: 4,
    cooldown: 0,
    when: (G) => {
      if (!G.children?.length || G.mem?.childMilestoneLeaving) return false
      return G.children.some(c => { const ca = G.age - c.ageAtBirth; return ca >= 17 && ca <= 20 })
    },
    text: (G) => {
      const child = G.children.find(c => { const ca = G.age - c.ageAtBirth; return ca >= 17 && ca <= 20 })
      const name = child?.name?.split(' ')[0] ?? 'Your child'
      return `${name} is moving out. The room they leave behind is exactly the room they lived in — the same furniture, the same light from the same window — and now it is a room of absence. You stand in the doorway for a moment. You close the door. You try to remember that this is what you were for, all of it. This departure was the destination.`
    },
    choices: [
      {
        text: 'You hold it together until they are gone.',
        tag: 'composed_sendoff',
        outcome: 'They leave with their bags and a hug that is slightly longer than usual. After the car turns the corner you sit down for a while.',
        effect: (p) => { p.m -= 5; p.r += 3; p.karma += 4; p.setMem('childMilestoneLeaving', true) },
      },
      {
        text: 'You tell them how proud you are.',
        tag: 'told_them',
        outcome: 'They absorb it in the awkward way that genuine things land. You think they will remember it.',
        effect: (p) => { p.m += 3; p.karma += 8; p.setMem('childMilestoneLeaving', true) },
      },
    ],
    effect: null,
  },

]
