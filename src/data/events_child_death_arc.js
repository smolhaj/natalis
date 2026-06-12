// events_child_death_arc.js
// The death of a child — the arc that the existing grief_child_young_death
// event (in events_grief.js) only sketches. That event fires and sets
// lost_child. This module is everything after that, and the infant death
// event that the system was missing.
//
// Arc shape:
//   Triggering → first weeks → telling people → the room →
//   try again (if applicable) → surviving siblings → anniversary →
//   cohort flash (seeing them in others) → partner years-later →
//   late-life reckoning: who they would have been.

// ── helpers ──────────────────────────────────────────────────────────────────

// Probability of infant death per living infant per year, by archetype × era.
// Approximate; reflects HISTORICAL_IMR in gameEngine scaled for child-of-player.
const infantDeathProb = (G) => {
  const arch = G.character?.country?.archetype ?? 'developing_urban'
  const yr = G.currentYear ?? 1970
  if (arch === 'conflict_zone') return yr < 1980 ? 0.12 : yr < 2000 ? 0.07 : 0.05
  if (arch === 'subsaharan') return yr < 1970 ? 0.13 : yr < 2000 ? 0.06 : 0.04
  if (arch === 'developing_unstable') return yr < 1970 ? 0.09 : yr < 2000 ? 0.04 : 0.025
  if (arch === 'developing_urban') return yr < 1970 ? 0.07 : yr < 2000 ? 0.03 : 0.015
  if (arch === 'post_soviet') return yr < 1960 ? 0.08 : yr < 1995 ? 0.025 : 0.01
  if (arch === 'wealthy_gulf') return yr < 1970 ? 0.09 : yr < 2000 ? 0.02 : 0.008
  // wealthy_west, wealthy_east
  return yr < 1950 ? 0.06 : yr < 1970 ? 0.025 : yr < 1990 ? 0.012 : yr < 2010 ? 0.006 : 0.004
}

// Cause of infant death text by archetype and era
function infantCauseText(G) {
  const arch = G.character?.country?.archetype ?? 'developing_urban'
  const yr = G.currentYear ?? 1970
  if (arch === 'conflict_zone' || arch === 'developing_unstable') {
    return 'illness — the kind that has a treatment, in places where the treatment is available. You are not in one of those places.'
  }
  if (arch === 'subsaharan') {
    return yr < 1990
      ? 'diarrheal illness. The clinic is a day\'s walk. By the time you arrive, it is already too late.'
      : 'complications that the clinic names in words that require a specialist you do not have access to.'
  }
  if (yr >= 1990) {
    return 'SIDS — sudden infant death syndrome — which means they found no cause. You have looked at the words "no cause" for a long time now.'
  }
  if (yr >= 1970) {
    return 'what the doctor calls cot death. No warning. No explanation the medical system can offer you.'
  }
  return 'something acute that moved faster than anything could be done.'
}

export const CHILD_DEATH_ARC_EVENTS = [

  // ─── INFANT DEATH TRIGGER ────────────────────────────────────────────────────

  {
    id: 'child_death_infant',
    phase: 'young_adult',
    weight: 2,
    when: (G) => {
      if (!G.children?.length) return false
      if (G.flags.includes('lost_child')) return false
      if (G.mem?.childDeathInfant) return false
      const hasInfant = G.children.some(c => G.age - c.ageAtBirth <= 1)
      if (!hasInfant) return false
      return Math.random() < infantDeathProb(G)
    },
    text: (G) => {
      const cause = infantCauseText(G)
      const infant = G.children.find(c => G.age - c.ageAtBirth <= 1)
      const name = infant?.name ?? 'The baby'
      return `${name} dies of ${cause}\n\nYou are not prepared for the specific scale of it — a person measured in weeks, and the space they leave. You thought small loss would be small grief. It is not. The grief is the size of everything that was going to happen and now will not.`
    },
    choices: [
      {
        text: 'You hold them for a long time before you let anyone take them.',
        tag: 'held',
        outcome: 'The nurses wait. No one says how long is too long. You take what you need.',
        effect: (p) => {
          p.m -= 32; p.h -= 10; p.r += 22
          p.addFlag('lost_child'); p.addFlag('bereaved'); p.addFlag('lost_child_infant')
          p.setMem('griefChildDeath', true); p.setMem('childDeathInfant', true)
        },
      },
      {
        text: 'You cannot stay in the room.',
        tag: 'left',
        outcome: 'You are in the corridor. Your partner is inside. You do not know how to return. Eventually you do.',
        effect: (p) => {
          p.m -= 36; p.h -= 12; p.r += 28
          p.addFlag('lost_child'); p.addFlag('bereaved'); p.addFlag('lost_child_infant')
          p.setMem('griefChildDeath', true); p.setMem('childDeathInfant', true)
        },
      },
    ],
    effect: null,
  },

  // ─── FIRST WEEKS ─────────────────────────────────────────────────────────────

  {
    id: 'child_death_first_weeks',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('lost_child') &&
      !G.mem?.childDeathFirstWeeks,
    text: (G) => {
      const isInfant = G.flags.includes('lost_child_infant')
      if (isInfant) {
        return 'The things that were purchased: unworn. The pram. The monitor. Objects that were preparation and are now monuments to what didn\'t happen. People bring food. They do not know what to say, which means they say the things that are available: that they are sorry, that time helps, that your child is at peace. None of this is wrong and none of it lands. You thank them. The food is in the refrigerator. You are not eating.'
      }
      return 'The house is full of their objects. The shoes by the door. The book they were reading that is still facedown on the same page. The specific arrangement of the bed. People say you do not have to do anything about any of it right away. They are right and also you do not know how to be in the house with all of it unchanged. You learn to be in the house with all of it unchanged. This takes longer than you would have predicted.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 14; p.h -= 6; p.r += 10
      p.setMem('childDeathFirstWeeks', true)
    },
  },

  // ─── TELLING PEOPLE ──────────────────────────────────────────────────────────

  {
    id: 'child_death_telling_people',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('lost_child') &&
      G.mem?.childDeathFirstWeeks &&
      !G.mem?.childDeathToldOthers &&
      G.age >= 32,
    text: 'You are at a work event or a new acquaintance asks about your family, and you say it for the first time to someone who did not know. "I had a child who died." The sentence does what sentences do: it produces a response. The response is a face, and then an inadequate word, and then an attempt to move past it. You understand they have nowhere to go with it. You have been living in it for years. You watch the gap between what you carry and what they can receive.',
    choices: [
      {
        text: 'Let them off the hook — you have learned to carry it gracefully.',
        tag: 'graceful',
        outcome: 'You say something that makes it easier for them. The skill of doing this has a cost you do not disclose.',
        effect: (p) => {
          p.addFlag('child_death_told_others'); p.s += 3; p.r += 6
          p.setMem('childDeathToldOthers', true)
        },
      },
      {
        text: 'Let it stand. You will not minimize it.',
        tag: 'held',
        outcome: 'The silence is not unkind. You have earned the right to let the weight be visible.',
        effect: (p) => {
          p.addFlag('child_death_told_others'); p.r -= 3; p.m += 3
          p.setMem('childDeathToldOthers', true)
        },
      },
    ],
    effect: null,
  },

  // ─── THE ROOM ────────────────────────────────────────────────────────────────

  {
    id: 'child_death_room_decision',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('lost_child') &&
      G.mem?.childDeathFirstWeeks &&
      !G.mem?.childDeathRoomDecision &&
      G.age >= 30,
    text: 'The question that arrives at some point and does not leave: what do you do with the room? The specific room. People have opinions about it — some people think keeping it as it was is healthy, some think it is not. Neither camp has lived in your house, which means neither camp has authority here. This is yours to decide.',
    choices: [
      {
        text: 'Keep it. You are not ready to change it.',
        tag: 'kept',
        outcome: 'The room is theirs. You go in sometimes. You sit. The sitting is something you cannot explain to anyone who has not lost a child.',
        effect: (p) => {
          p.addFlag('child_death_room_kept'); p.m -= 5; p.r += 4
          p.setMem('childDeathRoomDecision', true)
        },
      },
      {
        text: 'Change it, slowly. It can hold something else without erasing what it was.',
        tag: 'changed',
        outcome: 'You take months. Each object moved is a decision. The room becomes something else. They are not in the room any more in the same way. They are in other places now.',
        effect: (p) => {
          p.addFlag('child_death_room_repurposed'); p.m -= 3; p.r -= 3
          p.setMem('childDeathRoomDecision', true)
        },
      },
    ],
    effect: null,
  },

  // ─── TRY AGAIN ───────────────────────────────────────────────────────────────

  {
    id: 'child_death_try_again',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('lost_child') &&
      G.partner && G.partner.alive !== false &&
      G.age <= 42 &&
      !G.mem?.childDeathTryAgain,
    text: 'The question you have not spoken yet but which is present. Your partner has not spoken it either, but it is in the room when you are both in the room. You can have another child. Biologically, the door is still open. Whether to open it is not a biological question.',
    choices: [
      {
        text: 'Try again. Not as a replacement — as something new.',
        tag: 'try',
        outcome: 'You do not say "we\'re trying again" to anyone for a long time. The pregnancy, when it comes, is a different experience from any before it. Every week a different kind of held breath.',
        effect: (p) => {
          p.addFlag('child_death_tried_again'); p.m += 4
          p.setMem('childDeathTryAgain', true)
        },
      },
      {
        text: 'No. You cannot do this again. The grief of loss is specific and you know it now.',
        tag: 'not',
        outcome: 'The decision closes a door and opens a different one. The grief has a different shape now — finite, chosen.',
        effect: (p) => {
          p.addFlag('child_death_decided_not_again'); p.r += 5
          p.setMem('childDeathTryAgain', true)
        },
      },
      {
        text: 'Not yet. This question will wait.',
        tag: 'wait',
        outcome: 'You come back to it later, or you don\'t. It was your question to hold in your own time.',
        effect: (p) => {
          p.setMem('childDeathTryAgain', true)
        },
      },
    ],
    effect: null,
  },

  // ─── SURVIVING SIBLINGS ──────────────────────────────────────────────────────

  {
    id: 'child_death_surviving_siblings',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('lost_child') &&
      (G.children ?? []).filter(c => !G.flags.includes('lost_child') || G.children.indexOf(c) > 0).length > 1 &&
      !G.mem?.childDeathSiblings &&
      G.age >= 32,
    text: 'Your other child or children are grieving. They are also watching you grieve, which is a specific burden to put on a child. They go quiet in ways they didn\'t before, or they become louder, or they develop a particular vigilance about you — checking you are all right, becoming small adults you did not ask them to become. You are their parent. You are also broken. Both things have to be true in the same house.',
    choices: [
      {
        text: 'Talk to them directly about their sibling, and about grief.',
        tag: 'open',
        outcome: 'You tell them what you can. Not all of it — but enough. The permission to grieve openly is something you can give them even when your own grief is not managed.',
        effect: (p) => {
          p.karma += 8; p.m -= 6; p.s += 4; p.updateChildRel(0, 8)
          p.setMem('childDeathSiblings', true)
        },
      },
      {
        text: 'Try to protect them from the weight of it.',
        tag: 'protect',
        outcome: 'You do not know how much of the protection works. Children absorb things without being told. They will grieve in the way they learned — from you, from the silence, from watching.',
        effect: (p) => {
          p.m -= 10; p.r += 6
          p.setMem('childDeathSiblings', true)
        },
      },
    ],
    effect: null,
  },

  // ─── THE ANNIVERSARY ─────────────────────────────────────────────────────────

  {
    id: 'child_death_anniversary',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('lost_child') &&
      G.mem?.childDeathFirstWeeks &&
      !G.mem?.childDeathAnniversary &&
      G.age >= 33,
    text: (G) => {
      const isInfant = G.flags.includes('lost_child_infant')
      if (isInfant) {
        return 'The birthday comes — the first one. The day they were born and also, now, the day you remember they are gone. You have not agreed with your partner on what to do with it. Some parents mark it; some cannot. You find yourself awake early, not by design, and you understand that the body has remembered something the mind was trying not to dwell on. You do with the day whatever you can do with the day.'
      }
      return 'The birthday arrives. You have been watching it approach for weeks — trying not to watch it, watching it anyway. The night before, you think about what you would have been doing this time last year: the cake question, the presents, the argument they would have had about what they wanted. None of that happens. The day passes in a way that does not correspond to its weight. You go through it and come out the other side and you are still here and they are still gone.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 16; p.r += 10
      p.setMem('childDeathAnniversary', true)
    },
  },

  // ─── COHORT FLASH: SEEING THEM IN OTHERS ─────────────────────────────────────

  {
    id: 'child_death_cohort_flash',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('lost_child') &&
      G.mem?.childDeathFirstWeeks &&
      !G.mem?.childDeathCohortFlash &&
      G.age >= 36,
    text: (G) => {
      const isInfant = G.flags.includes('lost_child_infant')
      if (isInfant) {
        return 'You are somewhere public — a park, a waiting room, a birthday party for a colleague\'s child. A child is the age yours would be. They have learned to walk. They are talking in incomplete sentences that are nonetheless perfectly expressive. You watch them for a moment longer than you should. You leave before you have to explain your face.'
      }
      return 'You are somewhere you didn\'t expect it, and a child is exactly the age yours would be. They are doing something ordinary — kicking a ball, arguing with a sibling, reading on a bus — and you understand in a flash what the years you didn\'t have would have looked like. The specificity of it is what you are not prepared for. Not abstract grief: this particular child, this particular age, this particular ordinary afternoon they are living and your child is not.'
    },
    choices: null,
    effect: (p) => {
      p.m -= 12; p.r += 8
      p.setMem('childDeathCohortFlash', true)
    },
  },

  // ─── THE PARTNERSHIP YEARS LATER ─────────────────────────────────────────────

  {
    id: 'child_death_marriage_reflection',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('lost_child') &&
      G.partner && G.partner.alive !== false &&
      G.age >= 52 &&
      !G.mem?.childDeathMarriageReflection,
    text: 'Research on the subject says that the death of a child ends between forty and ninety percent of marriages, depending on the study. Yours did not end. You do not know, exactly, why it did not — which arguments you had and survived, which silences you misread and which you understood correctly, which of you held on hardest in the years when it was hardest. You are here together. You understand this is not universal. You have met people who did not make it through what you made it through. You do not speak of the ones who didn\'t, but you know they are there.',
    choices: [
      {
        text: 'Acknowledge it to your partner — this did not have to survive.',
        tag: 'acknowledged',
        outcome: 'You say something that is not easy to say. They receive it. The acknowledgement is a small thing and a large thing simultaneously.',
        effect: (p) => {
          p.addFlag('bereaved_parent_marriage_survived'); p.m += 8; p.karma += 6
          p.updatePartnerRel(10); p.setMem('childDeathMarriageReflection', true)
        },
      },
      {
        text: 'Carry it quietly. Some things don\'t need to be spoken.',
        tag: 'quiet',
        outcome: 'It is understood without being said. You have been reading each other for decades. The understanding is real.',
        effect: (p) => {
          p.addFlag('bereaved_parent_marriage_survived'); p.m += 4; p.updatePartnerRel(6)
          p.setMem('childDeathMarriageReflection', true)
        },
      },
    ],
    effect: null,
  },

  // ─── LATE-LIFE RECKONING: WHO THEY WOULD HAVE BEEN ───────────────────────────

  {
    id: 'child_death_late_reckoning',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('lost_child') &&
      G.age >= 60 &&
      !G.mem?.childDeathLateReckoning,
    text: (G) => {
      const isInfant = G.flags.includes('lost_child_infant')
      const childAge = isInfant
        ? G.age - 25  // rough: if they died at ~0, they'd be ~(parent's age - 25)
        : G.age - 40  // rough middle estimate for child who died in midlife
      const ageNow = Math.max(25, Math.min(45, childAge))

      if (isInfant) {
        return `They would be ${ageNow} now. You have been imagining them for decades — growing up in a form that has no actual basis in fact, only in what you saw in the first weeks. The way they turned their head. The specific grip. You built a person in your imagination from those weeks and you have been carrying that person through your whole adult life. They are not a stranger to you. They are the most specific imaginary person you know. You do not know if they would have been happy. You know they would have been loved.`
      }

      return `They would be ${ageNow} now. You have watched the children of your friends and your siblings become adults — get jobs, have relationships, become parents themselves — and you have run a parallel track alongside those lives: what their version might have looked like. You know enough of who they were to have a real guess. Not a fantasy — an extrapolation. The books they loved. The thing they were stubborn about. The particular way they looked at something that confused them. You carried all of this and constructed a person from it. The person they didn't become is someone you know.`
    },
    choices: [
      {
        text: 'You have made peace with it — not resolved it, but carried it to this point.',
        tag: 'carried',
        outcome: 'Peace is the wrong word. What you have is the ability to hold it. That is a different thing from peace and it is enough.',
        effect: (p) => {
          p.addFlag('child_death_late_reckoned'); p.m += 6; p.r -= 8; p.karma += 5
          p.setMem('childDeathLateReckoning', true)
        },
      },
      {
        text: 'The grief is as present as it has ever been. You do not apologize for this.',
        tag: 'present',
        outcome: 'You have carried it without it diminishing. That is also a form of endurance. You make no apologies for the scale of the grief to which you were entitled.',
        effect: (p) => {
          p.addFlag('child_death_late_reckoned'); p.r += 5; p.m -= 5; p.karma += 4
          p.setMem('childDeathLateReckoning', true)
        },
      },
    ],
    effect: null,
  },

  // ─── THE THING YOU NEVER SAID ─────────────────────────────────────────────────

  {
    id: 'child_death_unsaid',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('lost_child') &&
      G.age >= 65 &&
      G.mem?.childDeathLateReckoning &&
      !G.mem?.childDeathUnsaid,
    text: (G) => {
      const isInfant = G.flags.includes('lost_child_infant')
      if (isInfant) {
        return 'The thing you never got to say. Parents talk about this differently: the first words you planned, the things you would have told them about the world, the question of what you would have been to them. You did not get long enough for them to know you. You knew them. That asymmetry has a specific texture.'
      }
      return 'There is a thing you never said to them. Not a dramatic omission — just an ordinary thing: the thing you were going to say next time, or at the right moment, or when they were older and you thought they could understand it. The right time did not arrive. You carry the unsaid thing the way you carry everything else: not as a wound you keep reopening, but as an understanding of how many things are contingent, how much depends on next time.'
    },
    choices: null,
    effect: (p) => {
      p.r += 6; p.m -= 5; p.karma += 4
      p.setMem('childDeathUnsaid', true)
    },
  },

]
