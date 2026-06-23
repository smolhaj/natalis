// events_followthrough_54.js
// Political identity arc: late-life and midlife reckonings for political_leaning.
// Complements events_political_arc.js (which covers authoritarian stakes, surveillance,
// regime-specific consequences). These cover the lived experience of political identity
// across a full life — what it cost, what it produced, what it became.
// 10 events. No new flags.

export const FOLLOWTHROUGH_54_EVENTS = [

  // ── LEFT IN LATE LIFE ─────────────────────────────────────────────────────

  {
    id: 'ft54_pol_left_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.political_leaning === 'left' &&
      G.age >= 60 &&
      !G.mem?.ft54PolLeftLate,
    text: `The left — your politics, the one you held through the arguments at thirty and the discrediting at forty and the quiet of the decades after — has not arrived in the form you imagined. Some things it fought for are now ordinary: the rights that were once radical, the expectations that were once impossible. Some of the things it fought for are still not here and may not come. At this age the question is not whether you were right, which you partly were, but what you would do the same and what you would do differently, with the same politics and different tactics and knowing what you know now.`,
    choices: [
      {
        text: 'The politics held. You would hold them again.',
        tag: null,
        outcome: 'The conviction at the end is the same conviction at the beginning, which is not nothing. Some things are true for a whole life.',
        effect: (p) => {
          p.m += 4
          p.r += 3
          p.setMem('ft54PolLeftLate', true)
        },
      },
      {
        text: 'The politics held but the tactics were often wrong. You would argue differently.',
        tag: null,
        outcome: 'The distinction between the value and the method is a late-life distinction. You didn\'t have it at thirty. You have it now.',
        effect: (p) => {
          p.m += 3
          p.r += 4
          p.e += 2
          p.setMem('ft54PolLeftLate', true)
        },
      },
    ],
    effect: null,
  },

  // ── RIGHT IN LATE LIFE ────────────────────────────────────────────────────

  {
    id: 'ft54_pol_right_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.political_leaning === 'right' &&
      G.age >= 60 &&
      !G.mem?.ft54PolRightLate,
    text: `The market won. This is what you believed would happen and it happened. The state-run industries are private. The taxes came down. The economies that followed the principles you held grew faster than the ones that didn't. Some of what you expected from this is here: the efficiency, the innovation, the individual self-determination. Some of what you did not expect is also here: the precariousness underneath the prosperity, the fraying of the institutions that were supposed to be held in common, the generation below you that is less secure than you were at their age despite a larger economy. You find you do not have a clean answer for this.`,
    choices: [
      {
        text: 'The principles were right. The application was imperfect. That is true of all political programmes.',
        tag: null,
        outcome: 'The realism is honest. No political programme survives contact with implementation intact. Yours didn\'t either.',
        effect: (p) => {
          p.m += 3
          p.r += 4
          p.setMem('ft54PolRightLate', true)
        },
      },
      {
        text: 'Something was lost that you did not expect to lose. You would weight things differently now.',
        tag: null,
        outcome: 'The reweighting comes at the end of the life that tested the weights. This is the honest position. It is also late to act on it.',
        effect: (p) => {
          p.m += 2
          p.r += 5
          p.e += 2
          p.setMem('ft54PolRightLate', true)
        },
      },
    ],
    effect: null,
  },

  // ── NATIONALIST IN LATE LIFE ──────────────────────────────────────────────

  {
    id: 'ft54_pol_nationalist_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.political_leaning === 'nationalist' &&
      G.age >= 60 &&
      !G.mem?.ft54PolNatLate,
    text: `The nation that emerged is not the nation you imagined when the word nation still had a charge to it. The flag is the same flag. The anthem is the same anthem. The country inside these is something that required negotiation across decades — with the minorities, with the neighbours, with the global economy, with the generations that came after who do not feel about the founding the way the founding generation felt. You are old enough to have seen the gap between the national idea and the national reality. The gap is not a betrayal. It is just what nations are, from the inside, over time.`,
    choices: [
      {
        text: 'The nation exists and it is yours. That is the thing that was fought for.',
        tag: null,
        outcome: 'The existence is the thing. What is done with it is the next generation\'s argument. You produced the condition for that argument. That is enough.',
        effect: (p) => {
          p.m += 4
          p.r += 3
          p.setMem('ft54PolNatLate', true)
        },
      },
      {
        text: 'The nation that arrived is smaller than what was imagined. The imagining was necessary. The smallness is true.',
        tag: null,
        outcome: 'Holding both things — the necessity of the vision and the reality of what arrived — is a late-life cognitive task. You are up to it.',
        effect: (p) => {
          p.r += 5
          p.m += 2
          p.e += 2
          p.setMem('ft54PolNatLate', true)
        },
      },
    ],
    effect: null,
  },

  // ── DISSIDENT WHO OUTLASTED THE REGIME ───────────────────────────────────

  {
    id: 'ft54_pol_dissident_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.political_leaning === 'dissident' &&
      G.age >= 55 &&
      !G.mem?.ft54PolDissLate,
    text: `You outlasted it. This is not how you expected the story to end when you were in the middle of it — the expectation in the middle of it was not that you would outlast anything, but that you would survive the next year. The regime changed or collapsed or liberalised or simply stopped mattering in the way regimes stop mattering. And you are here, older than the person who made the choices that defined you, still carrying the name of those choices. "Dissident" is now a word with historical weight. At the time it was just what you were.`,
    choices: [
      {
        text: 'The outlasting is the meaning. The life that followed has its own shape now.',
        tag: null,
        outcome: 'The life after is longer than the life inside. What you made of it is the answer to what it was for.',
        effect: (p) => {
          p.m += 5
          p.r += 4
          p.karma += 3
          p.setMem('ft54PolDissLate', true)
        },
      },
      {
        text: 'Something was lost even in the outlasting. The people who didn\'t make it out.',
        tag: null,
        outcome: 'The accounting includes the ones who are not here to have this reckoning. You carry it for them, which is what survivors do.',
        effect: (p) => {
          p.m += 2
          p.r += 6
          p.karma += 5
          p.setMem('ft54PolDissLate', true)
        },
      },
    ],
    effect: null,
  },

  // ── APOLITICAL IN LATE LIFE ───────────────────────────────────────────────

  {
    id: 'ft54_pol_apolitical_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.political_leaning === 'apolitical' &&
      G.age >= 58 &&
      !G.mem?.ft54PolApLate,
    text: `You did not engage. This was a choice, some years, and other years it was not a choice but a form of exhaustion, and other years it was simply that the day's requirements left no room for the public argument. The choice not to engage has a cost that is different from the choice to engage: you are not responsible for the outcomes of causes you didn't support, and you are also not responsible for their achievements. The outcomes arrived anyway. You lived inside them. This is one of the things you can say about political abstention: it does not exempt you from history, only from the argument about it.`,
    choices: [
      {
        text: 'The abstention was defensible. You directed your energy where it could actually land.',
        tag: null,
        outcome: 'The energy went to the family, the work, the immediate community. Those also needed doing. The accounting has multiple ledgers.',
        effect: (p) => {
          p.m += 3
          p.r += 3
          p.setMem('ft54PolApLate', true)
        },
      },
      {
        text: 'There are moments when you wish you had weighed in. You didn\'t. That is the honest record.',
        tag: null,
        outcome: 'The honest record is the honest record. Regret about non-action is a specific kind of regret — harder to locate than regret about action, but real.',
        effect: (p) => {
          p.r += 5
          p.m += 1
          p.setMem('ft54PolApLate', true)
        },
      },
    ],
    effect: null,
  },

  // ── BECOMING MORE CONSERVATIVE THAN EXPECTED ─────────────────────────────

  {
    id: 'ft54_pol_rightward_shift_personal',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.political_leaning === 'right' &&
      G.age >= 40 && G.age <= 60 &&
      !G.mem?.ft54PolRightShift,
    text: `You notice that your positions have moved. Not dramatically — there was no conversion moment, no event that changed everything. But looking back at what you thought at twenty-five, you are now, quietly and in small ways, elsewhere. The instinct for caution that used to feel like timidity now feels like wisdom. The irritation with people who tell others how to live has not changed — only which people those are. This is not something you advertise, because the version of you that your friends know has not been updated, and the update would require explanation, and the explanation would be an argument, and the argument might not change anything.`,
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('ft54PolRightShift', true)
    },
  },

  // ── THE CAUSE WON AND WAS DISAPPOINTING ──────────────────────────────────

  {
    id: 'ft54_pol_cause_won_disappointing',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      (G.political_leaning === 'left' || G.political_leaning === 'nationalist' || G.political_leaning === 'dissident') &&
      G.age >= 38 && G.age <= 58 &&
      !G.mem?.ft54PolCauseWon,
    text: `The thing you worked for happened. The election was won, or the wall came down, or the law passed, or the independence was declared. You were there for it. The celebration was real. And then the after started — the governing, the implementation, the management of the people who had different ideas about what winning meant. The cause that was unified in opposition became complicated in power. The people you fought alongside developed separate agendas. The vision divided into factions. The winning was real. It was not the end of the story. The story, it turned out, does not have that kind of ending.`,
    choices: [
      {
        text: 'What was won is still real, even incomplete. The incomplete is the nature of the thing.',
        tag: null,
        outcome: 'The realism is hard-won. You earned it by watching what happened after, which is the part that required more work than the winning.',
        effect: (p) => {
          p.m += 3
          p.r += 4
          p.e += 2
          p.setMem('ft54PolCauseWon', true)
        },
      },
      {
        text: 'Something specific was lost in the winning. You know what it was.',
        tag: null,
        outcome: 'The specific loss is part of the honest accounting. It does not cancel what was gained. It sits alongside it.',
        effect: (p) => {
          p.r += 5
          p.m += 2
          p.setMem('ft54PolCauseWon', true)
        },
      },
    ],
    effect: null,
  },

  // ── POLITICAL FRIENDSHIP FRACTURE ────────────────────────────────────────

  {
    id: 'ft54_pol_friendship_fracture',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.political_leaning !== null &&
      G.political_leaning !== 'apolitical' &&
      G.age >= 35 && G.age <= 60 &&
      G.friends?.length > 0 &&
      !G.mem?.ft54PolFriendFrac,
    text: `There is a friendship that is now different because of this. Not ended, exactly — you still speak, you still occasionally meet — but the ease is gone. The subject came up one time too many and something real was said, or not said, and the friendship absorbed it but did not recover fully. You are now two people who know too much about each other's politics to pretend otherwise and not enough other things to sustain the relationship on those alone. The friendship still exists. It is smaller than it was.`,
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.r += 5
      p.setMem('ft54PolFriendFrac', true)
    },
  },

  // ── HOLDING THE CENTRE ────────────────────────────────────────────────────

  {
    id: 'ft54_pol_centre_dissolving',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.political_leaning === 'centre' &&
      G.age >= 35 && G.age <= 65 &&
      !G.mem?.ft54PolCentreDiss,
    text: `The centre is no longer a comfortable position. It used to be the place of moderation, of pragmatism, of the idea that both sides had something to offer and the task was synthesis. Now it is a position that satisfies neither side and is read as cowardice by both. The left reads the centre as complicity with the status quo. The right reads it as relativism about things that are not relative. You have not moved. The space you occupy has been reclassified as the wrong place to stand.`,
    choices: [
      {
        text: 'You hold the centre anyway. The unpopularity of a position is not evidence it is wrong.',
        tag: null,
        outcome: 'The holding requires a different kind of stubbornness than either flank requires. The flank has community. The centre has the argument.',
        effect: (p) => {
          p.m -= 3
          p.r += 4
          p.e += 3
          p.setMem('ft54PolCentreDiss', true)
        },
      },
      {
        text: 'You find yourself moving. The question is which direction.',
        tag: null,
        outcome: 'The direction is not settled. The movement is honest — you are responding to reality, not ideology. The reality keeps providing new information.',
        effect: (p) => {
          p.r += 5
          p.m -= 2
          p.setMem('ft54PolCentreDiss', true)
        },
      },
    ],
    effect: null,
  },

  // ── INHERITED POLITICS ────────────────────────────────────────────────────

  {
    id: 'ft54_pol_inherited_reckoning',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.political_leaning !== null &&
      G.age >= 38 && G.age <= 55 &&
      !G.mem?.ft54PolInherited,
    text: `You realise, somewhere in the middle of an argument, that the position you are holding was your parents' position. You did not adopt it consciously. It was the water you grew up in and you assumed, for a long time, that it was simply the correct position rather than the inherited one. The moment of realising this does not automatically change the position — the position may still be correct — but it changes the relationship to it. You are now choosing it, or choosing to examine it, rather than simply having it.`,
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 3
      p.setMem('ft54PolInherited', true)
    },
  },

]
