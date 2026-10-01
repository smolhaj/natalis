// events_child_soldier.js — Child soldier arc
//
// Full arc: the normal life before, abduction, indoctrination, the order
// to harm (given — not off-screen), desensitisation, escape/liberation,
// DDR process, civilian difficulty, and the lifelong moral accounting.
//
// Fires for conflict_zone characters or those with war_childhood flag.
// The perpetration events carry the full weight: the player chose to be in
// this game with historical honesty — this is what this is.

const isConflictZone = (G) =>
  G.conflictRisk > 0.15 ||
  G.flags.has('war_childhood') ||
  G.flags.has('conflict_zone_birth')

export const CHILD_SOLDIER_EVENTS = [

  {
    id: 'cs_taken',
    phase: 'childhood',
    weight: 999,
    when: (G) =>
      G.flags.has('child_soldier_path') &&
      !G.mem?.csTakenFired,
    text: (G) => {
      const age = G.age ?? 12
      return `They come in the night. ${age <= 10 ? 'You are ten' : `You are ${age}`} and you understand what is happening before the adults in the house do, because you have been watching the direction they come from for two weeks. The men with the weapons take several children from the village. You are one of them. The village is behind you before you can form the thought of what leaving it means.`
    },
    choices: null,
    effect: (p) => { p.m -= 20; p.h -= 5; p.addFlag('child_soldier_taken'); p.setMem('csTakenFired', true) },
  },

  {
    id: 'cs_indoctrination',
    phase: 'childhood',
    weight: 9,
    when: (G) =>
      G.flags.has('child_soldier_taken') &&
      !G.mem?.csIndocFired,
    text: 'They give you a weapon and a uniform and tell you that you are a soldier, and who the enemy is, and what soldiers do. They are very clear about what happens to soldiers who do not do it, and you have seen it happen. The idea is simpler than you expected: there is us, and there is the enemy, who is not fully human. You learn to say the parts that are required. You do not learn to believe all of them.',
    choices: null,
    effect: (p) => { p.m -= 15; p.addFlag('child_soldier_indoctrinated'); p.setMem('csIndocFired', true) },
  },

  {
    id: 'cs_the_order',
    phase: 'childhood',
    weight: 8,
    when: (G) =>
      G.flags.has('child_soldier_indoctrinated') &&
      !G.mem?.csOrderFired,
    text: 'The commander gives you an order to hurt someone: a prisoner, a villager, a captured boy from the other side. The commander is watching and so are the others. You know what happens to the ones who refuse. You are a child with a weapon in a situation built to leave no choice, which is not the same as there being none.',
    choices: [
      {
        text: 'You carry out the order',
        tag: null,
        outcome: 'You do it. The commander approves. The other soldiers approve. You have passed the test they set. You now carry something that will not leave for the rest of your life. The commanders have produced exactly what they intended to produce.',
        effect: (p) => { p.m -= 25; p.karma -= 15; p.addFlag('child_soldier_order_followed'); p.addFlag('moral_injury'); p.setMem('csOrderFired', true) },
      },
      {
        text: 'You refuse — the consequences are immediate',
        tag: null,
        outcome: 'You refuse. The consequences are severe and physical. You survive them. The refusal is yours. The commanders have failed to produce what they intended. That matters. You pay for it.',
        effect: (p) => { p.h -= 15; p.m -= 20; p.addFlag('child_soldier_order_refused'); p.addFlag('moral_injury'); p.setMem('csOrderFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cs_liberation',
    phase: 'adolescence',
    weight: 8,
    when: (G) =>
      G.flags.has('child_soldier_taken') &&
      !G.flags.has('child_soldier_free') &&
      !G.mem?.csLibFired,
    text: (G) => {
      const escaped = Math.random() < 0.4
      if (escaped) return 'The chance comes and you take it. The window is three minutes; you have watched the rotation for four months. Three of you go and one is caught, and it is not you. You walk for two days to the UN compound. The man at the gate looks at you for a long time before he speaks.'
      return 'The armed group is routed by the government forces or the peacekeepers or by internal collapse — the exact mechanism matters less than the result. You are free in a very specific and incomplete sense: you are no longer in the unit, and you do not know where you are, and you do not know how to be a person who is not in the unit.'
    },
    choices: null,
    effect: (p) => { p.h += 5; p.m -= 10; p.addFlag('child_soldier_free'); p.setMem('csLibFired', true) },
  },

  {
    id: 'cs_ddr_process',
    phase: 'adolescence',
    weight: 8,
    when: (G) =>
      G.flags.has('child_soldier_free') &&
      !G.mem?.csDDRFired,
    text: 'The programme is called DDR: disarmament, demobilisation, reintegration. It is built for the general case and you are one person. The counsellors have too many files. You are given a certificate and an identity card and told you can go back to school. You were twelve when you left it.',
    choices: null,
    effect: (p) => { p.h += 5; p.m += 5; p.addFlag('child_soldier_ddr'); p.setMem('csDDRFired', true) },
  },

  {
    id: 'cs_return_to_village',
    phase: 'adolescence',
    weight: 7,
    when: (G) =>
      G.flags.has('child_soldier_ddr') &&
      !G.mem?.csReturnFired,
    text: "Some of the village knows what happened, and some of it knows what you did. Your mother's face when she sees you: she did not know you were alive, and you did not know she was. The two of you decide, without a word, to put what happened in between somewhere it will not come up yet. Maybe later.",
    choices: null,
    effect: (p) => { p.m += 8; p.r += 5; p.addFlag('child_soldier_returned_home'); p.setMem('csReturnFired', true) },
  },

  {
    id: 'cs_civilian_difficulty',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      G.flags.has('child_soldier_free') &&
      G.age >= 16 &&
      !G.mem?.csCivilFired,
    text: 'Civilian life does not fit. The years in the unit taught you things the school has no use for, and left gaps where sixteen to twenty-two should have been. Your body answers to things a classroom cannot see: a loud noise, a uniform, the wrong kind of eye contact.',
    choices: null,
    effect: (p) => { p.m -= 10; p.addFlag('child_soldier_civilian_hard'); p.addFlag('trauma_responses'); p.setMem('csCivilFired', true) },
  },

  {
    id: 'cs_moral_injury_midlife',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      G.flags.has('moral_injury') &&
      G.flags.has('child_soldier_taken') &&
      G.age >= 30 &&
      !G.mem?.csMoralMidFired,
    text: 'In midlife the child you were is plainly a child; you can see the age from outside now. Twelve, with a weapon and an ideology and a choice that was not a choice. Knowing it does not undo anything. It is not comfort. It is accurate.',
    choices: [
      {
        text: 'Seek out people who survived the same — there is a language for it',
        tag: null,
        outcome: 'The organisation for former child soldiers exists. The language is there. Being in a room with people who know the weight is accompanied carrying.',
        effect: (p) => { p.r -= 8; p.m += 6; p.karma += 5; p.addFlag('child_soldier_community'); p.setMem('csMoralMidFired', true) },
      },
      {
        text: 'Carry it privately — this is not something to share',
        tag: null,
        outcome: 'The carrying continues privately. It is a permanent feature of the interior landscape. You have learned to live with it present.',
        effect: (p) => { p.r -= 4; p.m += 2; p.setMem('csMoralMidFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'cs_late_reckoning',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      G.flags.has('child_soldier_taken') &&
      G.age >= 55 &&
      !G.mem?.csLateFired,
    text: 'Late in life the children you know are the age you were when it happened. Looking at them — their faces, the gap between what they understand and what they don\'t yet understand — you understand something about yourself at twelve that you could not have understood from inside it. You were not a soldier. They made you into something with that name. The name was false. You are old enough to hold them both without needing them to resolve.',
    choices: null,
    effect: (p) => { p.r -= 10; p.m += 8; p.karma += 8; p.addFlag('child_soldier_late_reckoning'); p.setMem('csLateFired', true) },
  },

]
