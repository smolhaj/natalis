// events_romance_arc.js
// Early relationship arc events: from first conversations to the patterns of long love.
// Fire when: has partner, phase-gated, mem-gated to prevent repeats.

export const ROMANCE_ARC_EVENTS = [

  // ── EARLY RELATIONSHIP ───────────────────────────────────────────────────────

  {
    id: 'romance_late_night_call',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.partner &&
      !G.partner.married &&
      (G.partner.years ?? 0) <= 1 &&
      !G.mem?.romanceLateCall,
    text: (G) =>
      `You are on the phone with ${G.partner?.name ?? 'them'} and look up and it is 3 AM. You have been talking for four hours. You have not run out of things to say.`,
    choices: null,
    effect: (p) => { p.m += 12; p.s += 3; p.partnerRel(8); p.setMem('romanceLateCall', true) },
  },

  {
    id: 'romance_first_fight',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.partner &&
      !G.partner.married &&
      (G.partner.years ?? 0) >= 1 &&
      !G.mem?.romanceFirstFight,
    text: (G) =>
      `You and ${G.partner?.name ?? 'your partner'} have your first real argument. It is about something small — schedules, or a comment that landed wrong, or a plan that wasn't communicated — and then it is suddenly about something larger. You go home separately. The silence is new and unpleasant.`,
    choices: [
      {
        text: 'Call that evening — you don\'t want to let it sit',
        tag: null,
        outcome: 'The call starts stiff and ends somewhere softer. You both apologize about the same part.',
        effect: (p) => { p.m += 5; p.partnerRel(5); p.setMem('romanceFirstFight', true) },
      },
      {
        text: 'Give it a day — you both need space',
        tag: null,
        outcome: 'The day passes. The re-entry is careful. You learn something about how the two of you fight.',
        effect: (p) => { p.m -= 4; p.partnerRel(-3); p.setMem('romanceFirstFight', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'romance_meet_family',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.partner &&
      !G.partner.married &&
      (G.partner.years ?? 0) >= 1 &&
      !G.mem?.romanceMeetFamily,
    text: (G) =>
      `${G.partner?.name ?? 'Your partner'} takes you to meet their family. The table is full, the noise level is specific to this household, and you understand in a new way what they come from.`,
    choices: [
      {
        text: 'Be yourself — if this is going anywhere, they should meet you',
        tag: null,
        outcome: 'It goes reasonably well. One family member clearly likes you. One is reserving judgement.',
        effect: (p) => { p.m += 8; p.s += 3; p.partnerRel(6); p.setMem('romanceMeetFamily', true) },
      },
      {
        text: 'Be careful — this matters and you know it',
        tag: null,
        outcome: 'You are careful and slightly stiffer than usual. They seem to like you. You\'re not sure they\'ve met you.',
        effect: (p) => { p.m += 3; p.s += 1; p.partnerRel(2); p.setMem('romanceMeetFamily', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'romance_future_talk',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.partner &&
      !G.partner.married &&
      (G.partner.years ?? 0) >= 1 &&
      G.age >= 22 &&
      !G.mem?.romanceFutureTalk,
    text: (G) =>
      `You and ${G.partner?.name ?? 'your partner'} talk about the future — obliquely at first, then directly. Children: yes or no. Where: here or somewhere else. The conversation doesn't resolve everything, but it establishes that you are both having it.`,
    choices: [
      {
        text: 'Lay out what you actually want',
        tag: null,
        outcome: 'There are overlaps and differences. The differences are not dealbreakers. Not yet.',
        effect: (p) => { p.m += 6; p.partnerRel(8); p.setMem('romanceFutureTalk', true) },
      },
      {
        text: 'Keep it vague — it\'s too soon to commit to specifics',
        tag: null,
        outcome: 'The conversation circles and lands nowhere conclusive. You leave it for another time.',
        effect: (p) => { p.m += 2; p.partnerRel(-3); p.setMem('romanceFutureTalk', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'romance_moving_in',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.partner &&
      !G.partner.married &&
      (G.partner.years ?? 0) >= 2 &&
      G.age >= 20 &&
      !G.mem?.romanceMovingIn,
    text: (G) =>
      `The question of moving in comes up — practically, inevitably. ${G.partner?.name ?? 'Your partner'} spends more nights here than at their own place. The rent math makes sense. The emotional math is more complicated.`,
    choices: [
      {
        text: 'Move in together',
        tag: 'cohabiting',
        outcome: 'The first month is an adjustment. The arrangement gradually becomes a life.',
        effect: (p) => { p.m += 10; p.partnerRel(10); p.addFlag('cohabiting'); p.setMem('romanceMovingIn', true) },
      },
      {
        text: 'Not yet — you both need your own space still',
        tag: null,
        outcome: 'The arrangement continues as it is. There is a small strain around the decision, and then it passes.',
        effect: (p) => { p.m -= 3; p.partnerRel(-5); p.setMem('romanceMovingIn', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'romance_jealousy',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.partner &&
      !G.partner.married &&
      (G.partner.years ?? 0) >= 1 &&
      (G.partner.craziness ?? 30) > 55 &&
      !G.mem?.romanceJealousy,
    text: (G) =>
      `${G.partner?.name ?? 'Your partner'} goes through your phone. They don't find anything — there is nothing to find. But the fact of it changes the atmosphere of the next few days. You have to decide how much weight to give it.`,
    choices: [
      {
        text: 'Have the conversation directly',
        tag: null,
        outcome: 'They apologize. The explanation is less satisfying than the apology.',
        effect: (p) => { p.m -= 5; p.partnerRel(-8); p.setMem('romanceJealousy', true) },
      },
      {
        text: 'Let it go — everyone has difficult moments',
        tag: null,
        outcome: 'You absorb it and move on. The memory stays.',
        effect: (p) => { p.m -= 8; p.partnerRel(-3); p.setMem('romanceJealousy', true) },
      },
    ],
    effect: null,
  },

  // ── LONG RELATIONSHIP ARC ─────────────────────────────────────────────────────

  {
    id: 'romance_rut',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.partner &&
      G.partner.married &&
      (G.partner.years ?? 0) >= 5 &&
      (G.partner.relationshipQuality ?? 60) < 55 &&
      !G.mem?.romanceRut,
    text: (G) =>
      `You and ${G.partner?.name ?? 'your partner'} have settled into patterns. Not bad patterns, exactly — just worn ones. You have the same conversations about the same things. The evenings follow a predictable shape. You cannot remember the last time something surprised you about them.`,
    choices: [
      {
        text: 'Name it — you both feel it and pretending doesn\'t help',
        tag: null,
        outcome: 'The conversation is uncomfortable and necessary. Things don\'t immediately improve, but they\'re no longer being avoided.',
        effect: (p) => { p.m -= 5; p.partnerRel(12); p.setMem('romanceRut', true) },
      },
      {
        text: 'Plan something different — a trip, a change, anything',
        tag: null,
        outcome: 'The disruption helps more than you expected. The familiarity looks different from a new place.',
        effect: (p) => { p.m += 5; p.partnerRel(8); p.setMem('romanceRut', true) },
      },
      {
        text: 'This is what long relationships are — accept it',
        tag: null,
        outcome: 'Acceptance is its own kind of peace. The rut becomes the comfortable groove.',
        effect: (p) => { p.m += 2; p.partnerRel(-6); p.setMem('romanceRut', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'romance_anniversary_reflection',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.partner &&
      G.partner.married &&
      (G.partner.years ?? 0) >= 10 &&
      (G.partner.relationshipQuality ?? 60) >= 60 &&
      !G.mem?.romanceAnniversary,
    text: (G) =>
      `Ten years — or close enough. You are sitting at a table that is familiar, with food that is familiar, and ${G.partner?.name ?? 'your partner'} is across from you and you understand what it means to know someone over time. The person across the table is not who you married. They are more. So are you.`,
    choices: null,
    effect: (p) => { p.m += 15; p.r -= 5; p.partnerRel(6); p.addFlag('strong_marriage'); p.setMem('romanceAnniversary', true) },
  },

  {
    id: 'romance_growing_apart',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.partner &&
      G.partner.married &&
      (G.partner.years ?? 0) >= 8 &&
      (G.partner.relationshipQuality ?? 60) < 35 &&
      !G.mem?.romanceGrowingApart,
    text: (G) =>
      `You and ${G.partner?.name ?? 'your partner'} are not fighting. You are simply occupying the same space with increasing efficiency and decreasing warmth. You pass each other in the hallway. You eat at slightly different times. Neither of you has said the word yet.`,
    choices: [
      {
        text: 'Try couples therapy before it goes further',
        tag: null,
        outcome: 'The sessions are uncomfortable. Some things get named that should have been named years ago. It helps, partially.',
        effect: (p) => { p.m -= 5; p.partnerRel(15); p.setMem('romanceGrowingApart', true) },
      },
      {
        text: 'Have the honest conversation — even if it leads somewhere difficult',
        tag: null,
        outcome: 'You say it. They say it back, differently. The conversation is not the end of anything yet, but it is a clearing.',
        effect: (p) => { p.m -= 8; p.partnerRel(-5); p.r += 5; p.setMem('romanceGrowingApart', true) },
      },
      {
        text: 'Keep going — disruption costs too much right now',
        tag: null,
        outcome: 'The distance becomes the arrangement. You both adapt to it.',
        effect: (p) => { p.m -= 12; p.partnerRel(-10); p.r += 8; p.setMem('romanceGrowingApart', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'romance_rekindling',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.partner &&
      G.partner.married &&
      (G.partner.years ?? 0) >= 5 &&
      (G.partner.relationshipQuality ?? 60) >= 70 &&
      G.flags.includes('strong_marriage') &&
      !G.mem?.romanceRekindling,
    text: (G) =>
      `You are away for a week — work, or family, or something else. When you come back, ${G.partner?.name ?? 'your partner'} is at the door and you notice something that familiarity usually absorbs. For a moment you see them the way you did at the beginning.`,
    choices: null,
    effect: (p) => { p.m += 14; p.partnerRel(8); p.setMem('romanceRekindling', true) },
  },

  // ── ADOLESCENT FIRST LOVE ─────────────────────────────────────────────────────

  {
    id: 'romance_first_crush',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      !G.partner &&
      G.age >= 13 &&
      G.age <= 17 &&
      !G.mem?.romanceFirstCrush,
    text: 'There is a person. You are aware of them in a way that has no useful precedent in your experience. You study the pattern of when they appear in a room. You have rehearsed conversations that you have not had.',
    choices: [
      {
        text: 'Say something',
        tag: null,
        outcome: 'You say something. It doesn\'t come out the way you rehearsed. It doesn\'t need to.',
        effect: (p) => { p.m += 10; p.s += 4; p.setMem('romanceFirstCrush', true) },
      },
      {
        text: 'Say nothing — the imagined version is better anyway',
        tag: null,
        outcome: 'They never know. The feeling passes slowly, and then quickly, and then stays as a kind of reference point.',
        effect: (p) => { p.m += 5; p.r += 4; p.setMem('romanceFirstCrush', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'romance_teen_heartbreak',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      !G.partner &&
      G.flags.includes('first_relationship') &&
      G.age >= 15 &&
      G.age <= 18 &&
      !G.mem?.romanceTeenHeartbreak,
    text: 'It ends. You are not sure why, exactly — the reasons they gave were real but not the whole thing. You walk home from school a different way for three weeks to avoid the particular intersection. The feeling is more total than you expected anything to be.',
    choices: null,
    effect: (p) => { p.m -= 14; p.r += 6; p.e += 3; p.setMem('romanceTeenHeartbreak', true) },
  },

]
