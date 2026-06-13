// Desire resolution events — the positive path.
// Fire in midlife or late_life when the core wound's desire has been
// meaningfully pursued and there are signs it has been met.
// Each event sets desire_*_fulfilled, preventing the unfulfillment
// event in events_followthrough_12.js from firing for this character.
// Guards require both the desire and a reasonable proxy for satisfaction.

export const DESIRE_RESOLUTION_EVENTS = [

  {
    id: 'dr_prove_worth_met',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'prove_worth' &&
      G.karma >= 65 &&
      G.age >= 52 &&
      !G.mem?.drProveWorth,
    text: 'Something happens — an award, a conversation, a moment of being asked for advice by someone who matters — and you notice that the thing you have been trying to prove most of your adult life no longer needs proving in the same way. The original verdict, from wherever it came from, still lives in you. But it has lost its authority. You did not plan for this. You do not know exactly when it happened. Something shifted, sometime in the last few years, and the shift was real.',
    choices: [
      {
        text: 'You let yourself receive it. The work was real and this is what it looks like when the work is real.',
        tag: null,
        outcome: 'You receive it without the reflexive discount. It is allowed to count. You permit it to count.',
        effect: (p) => { p.m += 10; p.karma += 4; p.addFlag('desire_prove_worth_fulfilled'); p.setMem('drProveWorth', true); },
      },
      {
        text: 'The thing is — you\'re not sure you believe it yet. The old voice is faster than the new evidence.',
        tag: null,
        outcome: 'The old voice is faster. The new evidence is real. You are working on the lag between them. This is the work that remains.',
        effect: (p) => { p.m += 5; p.r += 3; p.addFlag('desire_prove_worth_fulfilled'); p.setMem('drProveWorth', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'dr_belong_met',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'belong' &&
      G.age >= 48 &&
      (G.partner || (G.friends && G.friends.length >= 2)) &&
      !G.mem?.drBelong,
    text: 'There is a room you walk into and they know your name and not just your name — they know the small things, the opinions, the specific way you react to certain news. This is not nothing. This is, you realize, the thing. It did not arrive the way you expected it to arrive. It arrived incrementally, in ordinary exchanges, in people who showed up more than once. You have found a version of the thing you were looking for since you were young enough not to know you were looking.',
    choices: [
      {
        text: 'You stay in the room. You stop looking over your shoulder for the version that was supposed to come earlier.',
        tag: null,
        outcome: 'The room is the room. The people are the people. You are in it. This is what belonging is: not an arrival but an ongoing.',
        effect: (p) => { p.m += 12; p.karma += 5; p.addFlag('desire_belong_fulfilled'); p.setMem('drBelong', true); },
      },
      {
        text: 'You receive it with some caution. You know things about belonging that you did not know earlier.',
        tag: null,
        outcome: 'The caution is wisdom and it does not prevent the belonging. The two can coexist. They are coexisting.',
        effect: (p) => { p.m += 8; p.e += 3; p.addFlag('desire_belong_fulfilled'); p.setMem('drBelong', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'dr_be_seen_met',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'be_seen' &&
      G.age >= 50 &&
      (G.fame > 0 || G.flags.includes('public_moment') || G.flags.includes('trc_witness') || G.flags.includes('project_shown')) &&
      !G.mem?.drBeSeen,
    text: 'Someone sees you accurately. Not the performed version, not the version that is legible from the outside — the actual thing. The person may be a stranger who reads something you wrote, or a partner who finally names something you never named yourself, or a child who turns back and says exactly the right sentence at exactly the right time. You spent a significant portion of your life wanting this. You were not sure it was a reasonable thing to want. It turns out it was reasonable. It turns out it was possible.',
    choices: [
      {
        text: 'You let the seeing land. You do not deflect.',
        tag: null,
        outcome: 'It lands. The not-deflecting is its own practice. You practiced it. It worked.',
        effect: (p) => { p.m += 10; p.karma += 4; p.s += 2; p.addFlag('desire_be_seen_fulfilled'); p.setMem('drBeSeen', true); },
      },
      {
        text: 'You deflect slightly — old habit — but you feel it anyway.',
        tag: null,
        outcome: 'The deflection is partial. The feeling comes through it anyway. This is progress.',
        effect: (p) => { p.m += 6; p.r += 3; p.addFlag('desire_be_seen_fulfilled'); p.setMem('drBeSeen', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'dr_safety_met',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'safety' &&
      G.age >= 55 &&
      G.money > 0 &&
      !G.inPrison &&
      G.stats.health >= 40 &&
      !G.mem?.drSafety,
    text: 'You notice, at some point in this period, that you are not scanning the room for threats the way you used to. The money in the account is more than you once imagined you would ever have. The people around you are people who do not want anything from you that you are unwilling to give. Your health is what it is — not what you hoped it would be, but managed. You have built, across decades, a version of the thing the child who needed safety did not have. The child is still in you. But the child is in a safer place than before.',
    choices: [
      {
        text: 'You let yourself feel the safety. It is allowed to be real.',
        tag: null,
        outcome: 'It is real. The old hypervigilance does not disappear but it does not run the room anymore.',
        effect: (p) => { p.m += 10; p.h += 3; p.karma += 3; p.addFlag('desire_safety_fulfilled'); p.setMem('drSafety', true); },
      },
      {
        text: 'You remain watchful. The safety is real but the vigilance is a habit too deep to release completely.',
        tag: null,
        outcome: 'The safety and the watchfulness coexist. They will probably always coexist. That is also a form of resolution.',
        effect: (p) => { p.m += 6; p.r += 3; p.addFlag('desire_safety_fulfilled'); p.setMem('drSafety', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'dr_connection_met',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.desire === 'connection' &&
      G.age >= 40 &&
      G.partner &&
      (G.partner.quality >= 65 || (G.children && G.children.length > 0)) &&
      !G.mem?.drConnection,
    text: 'There is a specific moment — not a dramatic one, just ordinary — when you understand that the thing you have been working toward, the closeness that always seemed to stop just short of actual arrival, is here. You are in it. You have been in it for some time without fully recognizing it as the thing. The recognition arrives now, as you are doing something ordinary. The gap you grew up with has closed. Not completely, not permanently — but enough. The connection is real.',
    choices: [
      {
        text: 'You tell the person. You say the thing you have been working toward saying.',
        tag: null,
        outcome: 'You say it. The person receives it. Something passes between you that was always there but did not have a word until now.',
        effect: (p) => { p.m += 12; p.karma += 6; p.addFlag('desire_connection_fulfilled'); p.setMem('drConnection', true); },
      },
      {
        text: 'You do not say it. You hold it. The knowing is enough.',
        tag: null,
        outcome: 'The knowing is enough. This is its own form of arrival.',
        effect: (p) => { p.m += 8; p.r += 2; p.addFlag('desire_connection_fulfilled'); p.setMem('drConnection', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'dr_leave_mark_met',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'leave_mark' &&
      G.age >= 55 &&
      (
        G.currentProject?.phase === 'established' ||
        G.flags.includes('writing_shown') ||
        G.flags.includes('published') ||
        G.flags.includes('trc_witness') ||
        G.flags.includes('civil_rights_movement_participant') ||
        G.flags.includes('solidarity_member') ||
        G.karma >= 70
      ) &&
      !G.mem?.drLeaveMark,
    text: 'You find out, at some point, that the thing you made or did or built has outlasted the making. A student who read something you wrote years ago comes back to tell you what it did for them. A movement you were part of is taught in a class. The community you helped build still exists without requiring your constant tending. The desire to leave a mark behind was partly about fear — that you would pass through without trace — and the fear was not irrational. But the trace exists. The mark is there.',
    choices: [
      {
        text: 'The knowledge that the work outlasted the making is the thing you were looking for.',
        tag: null,
        outcome: 'You have it. The looking is over. What comes after is something different from looking.',
        effect: (p) => { p.m += 10; p.karma += 6; p.addFlag('desire_leave_mark_fulfilled'); p.setMem('drLeaveMark', true); },
      },
      {
        text: 'The mark is not as large as you had hoped. But it is real. That is what you are sitting with.',
        tag: null,
        outcome: 'What is real does not require being large to be real. You know this now in a way you did not before.',
        effect: (p) => { p.m += 6; p.e += 3; p.r += 2; p.addFlag('desire_leave_mark_fulfilled'); p.setMem('drLeaveMark', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'dr_freedom_met',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.desire === 'freedom' &&
      G.age >= 38 &&
      (
        G.flags.includes('emigrated') ||
        G.flags.includes('solo_life_chosen') ||
        G.flags.includes('eu_freedom_movement') ||
        G.flags.includes('poland_eu_emigrant') ||
        (G.currentProject && G.currentProject.phase !== 'abandoned')
      ) &&
      !G.mem?.drFreedom,
    text: 'The life you have built does not fit the container you were handed as a child. You left, or you refused, or you chose the unconventional path, and enough years have passed now for you to see that the choice held. You are not trapped in the version of your life that was expected of you. The specific freedom you were looking for — to make the choices you were not supposed to make, to live in the structure you built instead of the one you were given — this is the life you are living.',
    choices: [
      {
        text: 'The freedom is real. You do not take it for granted.',
        tag: null,
        outcome: 'Not taking it for granted is the practice that keeps it. You practice it. The life continues.',
        effect: (p) => { p.m += 10; p.karma += 5; p.addFlag('desire_freedom_fulfilled'); p.setMem('drFreedom', true); },
      },
      {
        text: 'The freedom came with a cost you are still accounting for. That is the full picture.',
        tag: null,
        outcome: 'The cost and the freedom are both real. Holding both is the grown-up version of wanting freedom without knowing what it cost.',
        effect: (p) => { p.m += 6; p.r += 4; p.e += 2; p.addFlag('desire_freedom_fulfilled'); p.setMem('drFreedom', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'dr_redemption_met',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'redemption' &&
      G.age >= 55 &&
      G.karma >= 68 &&
      !G.mem?.drRedemption,
    text: 'You spent a significant portion of your life trying to make something right. The original wrong — whether you did it or it was done to you or you were complicit in something you should not have been complicit in — you carried it. You have been carrying it and also doing things that are different from the original wrong, building things, repairing things, being present for people in ways you were not present before. The redemption you were looking for is not an event. It is a direction. And you have been going in that direction for long enough that the direction is who you are.',
    choices: [
      {
        text: 'You accept that this is what redemption is: a direction, not a destination. You are pointed at it.',
        tag: null,
        outcome: 'Pointed at it and still moving. The original thing is still there. The direction you are facing is not toward it. This is the accomplishment.',
        effect: (p) => { p.m += 10; p.karma += 6; p.addFlag('desire_redemption_fulfilled'); p.setMem('drRedemption', true); },
      },
      {
        text: 'You are not sure it is enough. You are not sure the direction excuses the original.',
        tag: null,
        outcome: 'The original is what it was. The direction does not erase it. What it does is add something different to the account. The account is yours.',
        effect: (p) => { p.m += 5; p.r += 4; p.karma += 4; p.addFlag('desire_redemption_fulfilled'); p.setMem('drRedemption', true); },
      },
    ],
    effect: null,
  },

]
