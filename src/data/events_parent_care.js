// events_parent_care.js
// 8-event arc: parental decline through to death.
// Fires for midlife characters (30+) who still have living parents.
// Chain: first_sign → conversation → decision → daily_reality →
//        sibling_disagreement → bad_day → last_convo → connects to grief.

export const PARENT_CARE_EVENTS = [

  // ── 1: THE FIRST SIGN ────────────────────────────────────────────────────────

  {
    id: 'pc_first_sign',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.mem.pcFirstSign &&
      G.age >= 48 &&
      G.parents &&
      (G.parents.mother?.alive || G.parents.father?.alive),
    text: (G) => {
      const parent = G.parents.mother?.alive ? G.parents.mother : G.parents.father
      const name = parent?.name?.split(' ')[0] ?? 'your parent'
      const age = parent?.currentAge ?? 75
      return `The call is nothing specific. ${name} is fine — they say that. But there is a pause before the answer to a simple question that wasn't there before, and when you mention an appointment they mentioned last week, they say they don't remember mentioning it. You are ${G.age}. ${name} is ${age}. You have been half-expecting this. That doesn't make it less of a shift.`
    },
    choices: [
      {
        text: 'Visit soon to assess properly',
        tag: null,
        outcome: 'The visit is reassuring and not reassuring. They are coping. The question of for how long is now visible.',
        effect: (p) => { p.m -= 5; p.karma += 5; p.setMem('pcFirstSign', true) },
      },
      {
        text: 'Note it but don\'t act yet',
        tag: null,
        outcome: 'The note stays in your mind. The months pass. The question becomes louder eventually.',
        effect: (p) => { p.m -= 3; p.r += 4; p.setMem('pcFirstSign', true) },
      },
    ],
    effect: null,
  },

  // ── 2: THE CONVERSATION ──────────────────────────────────────────────────────

  {
    id: 'pc_conversation',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.mem.pcFirstSign &&
      !G.mem.pcConversation &&
      G.age >= 50 &&
      G.parents &&
      (G.parents.mother?.alive || G.parents.father?.alive),
    text: (G) => {
      const parent = G.parents.mother?.alive ? G.parents.mother : G.parents.father
      const name = parent?.name?.split(' ')[0] ?? 'your parent'
      return `The conversation you have been putting off. You sit down with ${name} — this is the one where you ask what they want, what they are managing and what they are not, and what happens when the not-managing becomes definitive. It is not a comfortable conversation. They resist it at first, then accept it, then cry a little, then say they are fine. All of this is true simultaneously.`
    },
    choices: [
      {
        text: 'Have it directly — name what you are both observing',
        tag: null,
        outcome: 'The honesty is difficult and a relief. You leave with a shared understanding, even if none of the practical questions are resolved.',
        effect: (p) => { p.m -= 6; p.karma += 8; p.r -= 4; p.setMem('pcConversation', true) },
      },
      {
        text: 'Have it gently — let them lead',
        tag: null,
        outcome: 'The conversation is softer and less complete. You know more than before. Some things remain unsaid.',
        effect: (p) => { p.m -= 4; p.karma += 4; p.setMem('pcConversation', true) },
      },
    ],
    effect: null,
  },

  // ── 3: THE DECISION ─────────────────────────────────────────────────────────

  {
    id: 'pc_decision',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.mem.pcConversation &&
      !G.mem.pcDecision &&
      G.age >= 52 &&
      G.parents &&
      (G.parents.mother?.alive || G.parents.father?.alive),
    text: (G) => {
      const parent = G.parents.mother?.alive ? G.parents.mother : G.parents.father
      const name = parent?.name?.split(' ')[0] ?? 'your parent'
      const archetype = G.character.country.archetype
      const isFamilyCentric = ['subsaharan', 'developing_urban', 'wealthy_gulf', 'wealthy_east'].includes(archetype)
      if (isFamilyCentric) {
        return `In your family, in this culture, the question of ${name} moving in is not really a question — it is what is expected and, on most days, what you want. But wanting it and living it are different things. The room that would be theirs is a room that is currently used for something else. The logistics begin now.`
      }
      return `The decision has become concrete. ${name} can no longer manage entirely alone. The options are what they always are: move in with you, a supervised residential facility, or significantly increased home care visits. None of these are without cost — financial, spatial, emotional. You have to choose.`
    },
    choices: [
      {
        text: 'Move them in with you',
        tag: null,
        outcome: 'The house reorganises. The daily contact is sometimes tender and sometimes exhausting. You do not regret the decision. You are tired.',
        effect: (p) => { p.m -= 10; p.h -= 5; p.karma += 12; p.mo -= 3000; p.addFlag('parent_moved_in'); p.setMem('pcDecision', 'moved_in') },
      },
      {
        text: 'Find a good care facility',
        tag: null,
        outcome: 'The facility is as good as facilities get. The guilt is present regardless. You visit often.',
        effect: (p) => { p.m -= 8; p.mo -= 8000; p.karma += 6; p.r += 5; p.addFlag('parent_in_care'); p.setMem('pcDecision', 'care_facility') },
      },
      {
        text: 'Increase home care visits — they stay in their home',
        tag: null,
        outcome: 'Independence is maintained. You coordinate the carers, the schedule, the emergencies. It is a second job.',
        effect: (p) => { p.m -= 6; p.mo -= 5000; p.karma += 8; p.addFlag('parent_home_care'); p.setMem('pcDecision', 'home_care') },
      },
    ],
    effect: null,
  },

  // ── 4: DAILY REALITY ────────────────────────────────────────────────────────

  {
    id: 'pc_daily_reality',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.mem.pcDecision &&
      !G.mem.pcDailyReality &&
      G.age >= 54 &&
      G.flags.includes('parent_moved_in'),
    text: (G) => {
      const parent = G.parents?.mother?.alive ? G.parents.mother : G.parents?.father
      const name = parent?.name?.split(' ')[0] ?? 'your parent'
      return `The first months of ${name} living here were adjustment. Now it is simply life. The rhythm includes: the medication schedule, the night when they called you at 2am because they couldn\'t find the bathroom, the afternoon they told you a story about your grandmother that you had never heard and that you stayed for. The weight of the caregiving is real. So is the access to them.`
    },
    choices: [
      {
        text: 'This is hard but worth it',
        tag: null,
        outcome: 'The commitment is a choice you renew monthly. The intimacy with the end of their life is something you will carry differently than people who weren\'t there.',
        effect: (p) => { p.m -= 5; p.h -= 4; p.karma += 10; p.r -= 6; p.setMem('pcDailyReality', true) },
      },
      {
        text: 'Set firmer limits — you need your own space too',
        tag: null,
        outcome: 'The limits are necessary. You are sustainable as a carer because you have protected something for yourself.',
        effect: (p) => { p.m -= 3; p.h -= 2; p.karma += 6; p.setMem('pcDailyReality', true) },
      },
    ],
    effect: null,
  },

  // ── 5: SIBLING DISAGREEMENT ─────────────────────────────────────────────────

  {
    id: 'pc_sibling_disagreement',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.mem.pcConversation &&
      !G.mem.pcSiblingDisagreement &&
      G.age >= 53 &&
      G.siblings && G.siblings.some(s => s.alive) &&
      G.parents && (G.parents.mother?.alive || G.parents.father?.alive),
    text: (G) => {
      const sib = G.siblings.find(s => s.alive)
      const name = sib?.name?.split(' ')[0] ?? 'your sibling'
      return `You and ${name} do not agree about what is needed, who is doing it, and whether what is currently being done is sufficient. ${name} thinks the care level is excessive; you think it is barely adequate. Or the reverse: ${name} thinks you should be doing more; you are already doing everything you can. The conversation becomes circular and then stops being a conversation.`
    },
    choices: [
      {
        text: 'Name the inequity directly — make the division explicit',
        tag: null,
        outcome: 'The directness is uncomfortable. The division becomes clearer. Something shifts — not resolved, but named.',
        effect: (p) => { p.m -= 8; p.r += 5; p.s -= 3; p.setMem('pcSiblingDisagreement', true) },
      },
      {
        text: 'Continue carrying more than your share — it\'s easier',
        tag: null,
        outcome: 'Easier in the short term. The resentment accumulates quietly.',
        effect: (p) => { p.m -= 6; p.r += 8; p.karma += 5; p.setMem('pcSiblingDisagreement', true) },
      },
      {
        text: 'Involve a professional mediator or social worker',
        tag: null,
        outcome: 'The third party helps. The plan that comes out of it holds for several months.',
        effect: (p) => { p.m -= 4; p.mo -= 500; p.r -= 3; p.setMem('pcSiblingDisagreement', true) },
      },
    ],
    effect: null,
  },

  // ── 6: A SPECIFIC BAD DAY ───────────────────────────────────────────────────

  {
    id: 'pc_bad_day',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.mem.pcDecision &&
      !G.mem.pcBadDay &&
      G.age >= 55 &&
      G.parents && (G.parents.mother?.alive || G.parents.father?.alive),
    text: (G) => {
      const parent = G.parents?.mother?.alive ? G.parents.mother : G.parents?.father
      const name = parent?.name?.split(' ')[0] ?? 'your parent'
      const decision = G.mem.pcDecision
      if (decision === 'moved_in') {
        return `${name} does not recognise you this morning. Not for two hours. They call you by their sibling\'s name — someone who has been dead for forty years. When the recognition returns, they are embarrassed and you do not know what to do with what just happened in your own kitchen.`
      }
      return `The call comes from the facility. ${name} had a fall. Not serious, the staff say, which means not serious today. You drive there. The drive is its own kind of time. They are fine when you arrive. You sit with them for two hours. They seem smaller than they did last month.`
    },
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 6; p.setMem('pcBadDay', true) },
  },

  // ── 7: THE LAST GOOD CONVERSATION ───────────────────────────────────────────

  {
    id: 'pc_last_conversation',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.mem.pcBadDay &&
      !G.mem.pcLastConversation &&
      G.age >= 58 &&
      G.parents && (G.parents.mother?.alive || G.parents.father?.alive),
    text: (G) => {
      const parent = G.parents?.mother?.alive ? G.parents.mother : G.parents?.father
      const name = parent?.name?.split(' ')[0] ?? 'your parent'
      const pAge = parent?.currentAge ?? 80
      return `You do not know, at the time, that this is the last conversation where ${name} is entirely present. They are ${pAge}. They ask about something you did as a child — they remember it differently from how you do, and you spend an hour in the disagreement, which is a form of connection. When you leave you feel something without being able to name it. It is only later that you understand what you were feeling was the last time.`
    },
    choices: null,
    effect: (p) => { p.m -= 8; p.r -= 10; p.karma += 8; p.setMem('pcLastConversation', true) },
  },

  // ── 8: DECLINE AND DEATH ─────────────────────────────────────────────────────
  // This event advances the parent toward death — the actual death fires
  // via the existing parent death system (killParent) + grief module.

  {
    id: 'pc_final_decline',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.mem.pcLastConversation &&
      !G.mem.pcFinalDecline &&
      G.age >= 60 &&
      G.parents && (G.parents.mother?.alive || G.parents.father?.alive),
    text: (G) => {
      const parent = G.parents?.mother?.alive ? G.parents.mother : G.parents?.father
      const name = parent?.name?.split(' ')[0] ?? 'your parent'
      const archetype = G.character.country.archetype
      if (['wealthy_west', 'post_soviet'].includes(archetype)) {
        return `${name} is in the hospital now. The decision has been made to focus on comfort rather than intervention. You sit with them for four days. They sleep more than they are awake. The hours when they are awake matter differently than regular hours. The medical staff are kind in the specific way that people are kind when they do this every day.`
      }
      return `${name}\'s final weeks. You are with them. The extended family comes in shifts that would have been logistically impossible a generation ago but which, now, feel like the right and only way. The house is full of the wrong kind of busy. You are glad they are not alone.`
    },
    choices: null,
    effect: (p) => {
      const isMotherAlive = p._state.parents?.mother?.alive
      const isFatherAlive = p._state.parents?.father?.alive
      const parentKey = isMotherAlive ? 'mother' : (isFatherAlive ? 'father' : null)
      p.m -= 18; p.r += 8; p.karma += 15
      if (parentKey) p.killParent(parentKey)
      p.addFlag('lost_parent')
      p.setMem('pcFinalDecline', true)
    },
  },

]
