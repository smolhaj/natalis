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
  G.currentCountry?.archetype === 'conflict_zone' ||
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
    text: 'The process is not complicated. You are given a weapon and a uniform and you are told you are a soldier. You are told who the enemy is. You are told what soldiers do. The commanders are very clear about what happens to soldiers who do not do what soldiers do. The threat is not abstract — you have seen what happens. The ideology is simpler than you expected: the world is divided into us and the enemy and the enemy is not fully human. You learn to say the parts of this that are required. You do not learn to believe all of them.',
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
    text: 'The commander gives you an order. The order is to harm a specific person — a prisoner, a villager, a captured fighter from the other side. You understand what the order is. The commander is watching. The other soldiers are watching. You understand what happens to soldiers who refuse. You are a child with a weapon in a situation designed to leave you no real choice, which does not mean there is no choice.',
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
      if (escaped) return 'The chance comes and you take it. The window is three minutes — you know this from watching the rotation for four months. You go. Three of you go. One is caught. You are not one who is caught. You walk for two days to reach the UN compound. The person at the gate looks at you for a long time before speaking.'
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
    text: 'The DDR programme — disarmament, demobilisation, reintegration — is what the UN and the NGOs have. You go through it. The programme has a structure and the structure helps and also the structure is designed for a general case and you are a specific person. The counsellors are doing their best with large caseloads and the best is partial. You are given documents — a certificate, an identity card. You are told you can go to school. You have not been to school in three years. You were twelve when you left.',
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
    text: "The village knows what happened and some of the village knows what you did there. The welcome is genuine and complicated. Your mother's face when she sees you. You did not know if she would still be alive. She did not know if you would. The reunion contains everything — love and the knowledge of what happened in between and the decision, made by both of you without discussion, to hold the knowledge somewhere that does not come to the surface immediately. Maybe later. Not yet.",
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
    text: 'The civilian life does not fit. This is not metaphorical — the specific skills the years built are military skills, and the school demands civilian skills, and the civilian world demands civilian skills, and you have gaps where those should be. The gap between sixteen and twenty-two, the years of normal development, the things you would have learned. The body has responses built into it by the years in the unit that civilian contexts don\'t know how to receive. A loud noise. A uniform. The wrong kind of eye contact.',
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
    text: 'In midlife the accounting is different. The child you were when it happened is clearly a child now — you can see the age from outside. You were twelve. You were given a weapon and an ideology and a choice that was not a choice. Understanding this does not undo what was done. It changes the frame. The frame change is not comfort. It is something more useful than comfort: it is accurate.',
    choices: [
      {
        text: 'Seek out people who survived the same — there is a language for it',
        tag: null,
        outcome: 'The organisation for former child soldiers exists. The language is there. Being in a room with people who know the specific weight is not resolution. It is accompanied carrying.',
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
    text: 'Late in life the children you know are the age you were when it happened. Looking at them — their faces, the specific gap between what they understand and what they don\'t yet understand — you understand something about yourself at twelve that you could not have understood from inside it. You were not a soldier. They made you into something with that name. The name was false. The things that were done and that you did were real. Both things are true. You are old enough to hold them both without needing them to resolve.',
    choices: null,
    effect: (p) => { p.r -= 10; p.m += 8; p.karma += 8; p.addFlag('child_soldier_late_reckoning'); p.setMem('csLateFired', true) },
  },

]
