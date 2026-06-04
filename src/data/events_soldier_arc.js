// BUILD 9 — The soldier's arc
// Deployment, the thing done, the return, the carrying.
// Not combat as spectacle. The specific consciousness of someone
// trained to do something and who did it.

const IS_MILITARY = (G) => G.career?.id === 'soldier' || G.career?.field === 'military'

// Countries/years with major deployment history
const DEPLOYMENT_CONTEXT = (G) => {
  const c = G.character.country?.name
  const y = G.currentYear
  const a = G.character.country?.archetype
  if (a === 'conflict_zone') return true
  if (c === 'United States' && ((y >= 1950 && y <= 1953) || (y >= 1965 && y <= 1975) || (y >= 1991 && y <= 1991) || (y >= 2001 && y <= 2021))) return true
  if (c === 'United Kingdom' && ((y >= 1950 && y <= 1953) || (y >= 1982 && y <= 1982) || (y >= 1990 && y <= 1991) || (y >= 2001 && y <= 2021))) return true
  if (c === 'Russia' && ((y >= 1979 && y <= 1989) || (y >= 1994 && y <= 1996) || (y >= 1999 && y <= 2009))) return true
  if (c === 'Australia' && ((y >= 1965 && y <= 1975) || (y >= 2001 && y <= 2021))) return true
  if (c === 'France' && ((y >= 1954 && y <= 1962) || (y >= 1990 && y <= 1991))) return true
  if (c === 'Argentina' && y >= 1982 && y <= 1982) return true
  if (c === 'South Korea' && y >= 1950 && y <= 1953) return true
  if (['Nigeria', 'Ethiopia', 'DRC', 'Somalia', 'Sudan', 'Angola', 'Mozambique', 'Algeria'].includes(c)) return true
  return false
}

export const SOLDIER_ARC_EVENTS = [

  {
    id: 'sol_deployment_orders',
    phase: 'young_adult',
    weight: 4,
    when: (G) => IS_MILITARY(G) && DEPLOYMENT_CONTEXT(G) && G.age >= 18 && G.age <= 35 && !G.mem.solDeployed,
    text: 'The orders come through in the morning. You know the place name from news reports. It looked different in news reports than it does in the briefing, and different again in the briefing than it will look when you arrive. You have been trained for this. Training and the actual thing are related but not the same.',
    choices: [
      {
        text: 'You are ready. This is what you signed up for.',
        tag: 'ready',
        outcome: 'The flight is commercial, which surprises you. The soldiers around you sleep or look out the window. You land and it is already different from everything you were told.',
        effect: (p) => { p.m -= 5; p.addFlag('deployed_to_conflict'); p.setMem('solDeployed', true) },
      },
      {
        text: 'You have doubts you don\'t say aloud.',
        tag: 'doubts',
        outcome: 'You go. The doubts travel with you. In the first week you stop noticing them because there is too much else to notice.',
        effect: (p) => { p.m -= 8; p.addFlag('deployed_to_conflict'); p.addFlag('moral_complexity'); p.setMem('solDeployed', true) },
      },
    ],
  },

  {
    id: 'sol_first_week',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('deployed_to_conflict') && !G.mem.solFirstWeek,
    text: 'The first week: the heat, the smell that does not match anything you can name, the specific weight of carrying what you carry, the way your body recalibrates its sense of safe and not-safe. You learn the route to the latrine in the dark. You learn the specific sound of the particular vehicles that mean something. You learn which hours are quieter than others.',
    effect: (p) => { p.h -= 4; p.addFlag('combat_veteran'); p.setMem('solFirstWeek', true) },
  },

  {
    id: 'sol_the_friend',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.has('deployed_to_conflict') && !G.mem.solFriendLost,
    text: 'There is someone you ate with every morning for four months. Not your closest friend from before — a specific closeness that only forms in a specific context. They are gone by Thursday. The manner of it was fast. You think about that sometimes — that it was fast — as though this is important information.',
    effect: (p) => { p.m -= 18; p.h -= 5; p.addFlag('lost_friend'); p.addFlag('grief_carried'); p.setMem('solFriendLost', true) },
  },

  {
    id: 'sol_the_order',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('deployed_to_conflict') && !G.mem.solOrder,
    text: 'There is something you were ordered to do. You did it. The order was legal. The legality of it and the weight of it are separate things that do not cancel each other out. You do not describe it specifically to people who were not there, not because you are protecting them but because you would have to start from too far back.',
    choices: [
      {
        text: 'You followed the order. You follow orders.',
        tag: 'followed',
        outcome: 'The operational logic was clear. The operational logic is still clear. What sits beside the operational logic is something else.',
        effect: (p) => { p.m -= 12; p.addFlag('moral_weight_carried'); p.setMem('solOrder', true) },
      },
      {
        text: 'You followed it, but you have not stopped thinking about it.',
        tag: 'questioning',
        outcome: 'You did what was required. What was required is not the same as what you would have chosen. You are not sure there was a choice.',
        effect: (p) => { p.m -= 15; p.karma += 6; p.addFlag('moral_weight_carried'); p.addFlag('moral_complexity'); p.setMem('solOrder', true) },
      },
    ],
  },

  {
    id: 'sol_return_home',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.has('deployed_to_conflict') && !G.mem.solReturn,
    text: 'You land at home. Someone made a sign. You appreciate the sign. The airport is the airport you left from except everything about it is slightly wrong — too clean, too loud, the ceiling too low, the people moving in ways that are too relaxed. Someone who loves you is there. You hug them. You are back. Something that was you left here and did not travel with you, and something that came back is not accounted for in anyone\'s welcome.',
    effect: (p) => { p.m -= 8; p.addFlag('returned_veteran'); p.setMem('solReturn', true) },
  },

  {
    id: 'sol_not_sleeping',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('returned_veteran') && G.age >= 20 && !G.mem.solSleep,
    text: 'Two years after returning, you still don\'t sleep through. This is not unusual. The people around you don\'t know it\'s not unusual. The specific thing that wakes you is not always the same thing. You get up and sit in the kitchen until your body decides it\'s done. You do not describe this to anyone who hasn\'t done it.',
    choices: [
      {
        text: 'Talk to someone — a doctor, a therapist, another veteran.',
        tag: 'sought_help',
        outcome: 'The clinic is a strip mall between a nail salon and a pharmacy. You go once and then again. Progress is not linear. You keep going.',
        effect: (p) => { p.m += 7; p.addFlag('sought_help'); p.setMem('solSleep', true) },
      },
      {
        text: 'Manage it. You\'ve managed worse.',
        tag: 'managed_alone',
        outcome: 'You function. You are good at functioning. The kitchen at 3am becomes a kind of room you have in your life.',
        effect: (p) => { p.m -= 5; p.h -= 4; p.setMem('solSleep', true) },
      },
    ],
  },

  {
    id: 'sol_the_question',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.flags.has('returned_veteran') && !G.mem.solQuestion,
    text: 'People ask what it was like. They mean well. The question doesn\'t have an answer that fits in a conversation. The honest answer starts somewhere so far back that by the time you reach the part they\'re asking about, you\'ve lost them. The short answer is not a lie but it isn\'t the truth either. You learn the short answer and use it.',
    effect: (p) => { p.m -= 5; p.addFlag('veteran_silence'); p.setMem('solQuestion', true) },
  },

  {
    id: 'sol_veteran_recognition',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('returned_veteran') && G.age >= 35 && !G.mem.solRecognition,
    text: 'You meet another veteran at a function — not organised, just a chance disclosure. The conversation is different from other conversations. You don\'t have to explain certain things. You don\'t have to perform the short answer. The specific relief of talking to someone who already knows.',
    effect: (p) => { p.m += 10; p.karma += 4; p.addFlag('veteran_solidarity'); p.setMem('solRecognition', true) },
  },

  {
    id: 'sol_anniversary',
    phase: 'midlife',
    weight: 2,
    cooldown: 10,
    when: (G) => G.flags.has('returned_veteran') && G.age >= 35,
    text: 'There is a date in the year. The date means something. You sometimes forget, consciously, and your body doesn\'t. You notice you\'re irritable in the days before. You notice the specific quality of light. You notice things that aren\'t connected but that you file in the same place.',
    effect: (p) => { p.m -= 8; p.h -= 2 },
  },

  {
    id: 'sol_physical_cost',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('deployed_to_conflict') && G.age >= 40 && !G.mem.solPhysical,
    text: 'The doctor asks about your history. You mention it. She asks follow-up questions. Something that was recorded as minor at the time is now contributing to something they can measure. You knew this would eventually be a conversation. You did not know what it would feel like to have it sitting across from someone who was in secondary school when it happened.',
    effect: (p) => { p.h -= 8; p.addCondition('chronic_pain', 'mild'); p.setMem('solPhysical', true) },
  },

  {
    id: 'sol_telling_children',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('returned_veteran') && G.children.length > 0 && G.age >= 60 && !G.mem.solChildren,
    text: 'Your child asks about your service with the specific seriousness of someone who has been wondering for years. You decide what version to give them. There is the version that protects them and the version that is true, and they are not entirely different versions but the emphasis is.',
    choices: [
      {
        text: 'Tell them the fuller version. They\'re old enough.',
        tag: 'told_truth',
        outcome: 'They listen without interrupting, which surprises you. At the end they ask one question. It is the right question.',
        effect: (p) => { p.m += 12; p.karma += 6; p.updateChildRel(0, 8); p.setMem('solChildren', true) },
      },
      {
        text: 'Give them the version that lets them sleep.',
        tag: 'protected',
        outcome: 'They seem satisfied. You don\'t know if they are. You have spent a long time not knowing things about the people you love.',
        effect: (p) => { p.m += 5; p.setMem('solChildren', true) },
      },
    ],
  },

  {
    id: 'sol_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.flags.has('moral_weight_carried') && G.age >= 65 && !G.mem.solLateReckoning,
    text: 'There is something you did forty years ago. You have not resolved it in the intervening time — you\'ve just been someone who carries it. At some point carrying something long enough doesn\'t make it lighter. It just becomes part of the architecture of who you are.',
    effect: (p) => { p.m -= 6; p.karma += 8; p.setMem('solLateReckoning', true) },
  },

  {
    id: 'sol_wound_sustained',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.has('deployed_to_conflict') && !G.mem.solWound,
    text: 'It happens in a moment too fast to have a shape. There is the world before it and then there is something in your body that wasn\'t there before, and the medic is speaking, and you are trying to establish whether you can continue. The honest answer and the answer you give are not the same answer.',
    choices: [
      {
        text: 'Report the full extent of it. Go to the aid station.',
        tag: 'wound_reported',
        outcome: 'They send you out of theatre. The paperwork is thorough. You are angry at the thoroughness in a way you cannot explain to anyone who wasn\'t there.',
        effect: (p) => { p.h -= 12; p.addFlag('conflict_injury'); p.addFlag('returned_veteran'); p.setMem('solWound', true) },
      },
      {
        text: 'Report it as minor. Stay with your unit.',
        tag: 'wound_concealed',
        outcome: 'You continue. The body compensates in the way bodies do when they are given no alternative. You know, somewhere, that this will be in you for a long time.',
        effect: (p) => { p.h -= 18; p.addFlag('conflict_injury'); p.setMem('solWound', true) },
      },
    ],
  },

]
