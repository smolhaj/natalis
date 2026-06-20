// Social capital events — gated on charisma and looks thresholds.
// Charisma = social energy, the ability to move through rooms.
// Looks = a resource that is era- and culture-dependent.

export const SOCIAL_CAPITAL_EVENTS = [

  // ─── CHARISMA: HIGH ──────────────────────────────────────────────────────────

  {
    id: 'sc_social_connector',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.stats.charisma >= 72 && !G.mem?.scConnectorAck && (G.friends ?? []).length < 3,
    text: 'At a gathering you don\'t particularly want to be at, you introduce two strangers to each other. Within an hour they are deep in conversation. This is something you do without thinking about it — the noticing of who needs to meet whom, the easy sentence that makes two people a pair. You leave early. They don\'t notice.',
    choices: null,
    effect: (p) => {
      p.s += 4
      p.karma += 5
      p.addFlag('social_connector')
      p.setMem('scConnectorAck', true)
    },
  },

  {
    id: 'sc_high_charisma_career_door',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.stats.charisma >= 70 &&
      !G.career &&
      !G.mem?.scCareerDoorAck,
    text: 'Someone you met once, briefly, at a reception three months ago, calls with a name and a recommendation. The job isn\'t posted. They thought of you. You have been thought of because you were remembered, and you were remembered because of how you left the room.',
    choices: [
      {
        text: 'Follow up — you have nothing to lose',
        tag: 'took_the_referral',
        outcome: 'The meeting goes well. The door is open. What you do with it is up to you.',
        effect: (p) => { p.e += 5; p.m += 6; p.addFlag('network_referral'); p.setMem('scCareerDoorAck', true) },
      },
      {
        text: 'Ignore it — you are not ready',
        tag: 'declined_the_referral',
        outcome: 'The moment passes. The person moves on. Something closes.',
        effect: (p) => { p.r += 4; p.setMem('scCareerDoorAck', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sc_charisma_authoritarian_danger',
    phase: 'midlife',
    weight: 4,
    when: (G) => {
      const authRegimes = ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy']
      const regime = G.regime
      return G.stats.charisma >= 68 &&
        authRegimes.includes(regime) &&
        !G.mem?.scAuthDangerAck
    },
    text: 'Someone in authority has noticed you — not your work, but you: the way you hold a room, the way people turn toward you when you speak. In a different country this would be called leadership. Here it is called something else. You are asked, politely, to give a talk at the district meeting. The invitation is not quite optional.',
    choices: [
      {
        text: 'Accept and say the expected things',
        tag: 'performed_loyalty',
        outcome: 'The talk goes well. Afterward you feel the specific fatigue of having been entirely yourself and entirely not yourself at the same time.',
        effect: (p) => { p.m -= 8; p.s += 3; p.r += 6; p.addFlag('performed_loyalty'); p.setMem('scAuthDangerAck', true) },
      },
      {
        text: 'Find a reason to decline',
        tag: 'avoided_spotlight',
        outcome: 'You make yourself smaller. The invitation is not repeated. You are not sure if that is luck or warning.',
        effect: (p) => { p.s -= 3; p.m -= 4; p.setMem('scAuthDangerAck', true) },
      },
    ],
    effect: null,
  },

  // ─── CHARISMA: LOW ───────────────────────────────────────────────────────────

  {
    id: 'sc_low_charisma_room',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.stats.charisma <= 32 && !G.mem?.scLowRoomAck && G.age >= 18,
    text: 'A party. You arrive and within fifteen minutes know you have made a mistake. The conversations are already formed, the clusters sealed. You stand near the food and hold a drink and wait for the thing that makes this worth it, and it does not come. You leave after an hour. No one notices.',
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 3
      p.addFlag('knows_the_edge_of_rooms')
      p.setMem('scLowRoomAck', true)
    },
  },

  // ─── LOOKS: HIGH + ERA/CULTURE-SPECIFIC ──────────────────────────────────────

  {
    id: 'sc_looks_hollywood_era',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.stats.looks >= 75 &&
      G.character.country.name === 'United States' &&
      G.currentYear >= 1950 && G.currentYear <= 1975 &&
      !G.mem?.scLooksHollywoodAck,
    text: 'Someone hands you a card and tells you that you should be on television. It is the 1960s; television is still relatively new; faces like yours are exactly what the industry needs. You take the card home. You look at it for a long time. What television needs and what you need may not be the same thing.',
    choices: [
      {
        text: 'Follow it up — see what\'s possible',
        tag: 'pursued_screen',
        outcome: 'You go to the meeting. The room is full of people who look like you. Most of them won\'t get the part. You are not sure you want to be among those who do.',
        effect: (p) => { p.lo -= 2; p.m += 3; p.s += 4; p.addFlag('entertainment_adjacent'); p.setMem('scLooksHollywoodAck', true) },
      },
      {
        text: 'Put the card in a drawer',
        tag: 'declined_screen',
        outcome: 'Years later you find the card in the back of a drawer. You do not remember what you decided or why.',
        effect: (p) => { p.r += 4; p.setMem('scLooksHollywoodAck', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sc_looks_burden_developing',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.stats.looks >= 74 &&
      G.character.gender === 'female' &&
      ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.character.country.archetype) &&
      !G.mem?.scLooksBurdenAck,
    text: 'Men you do not know have started to speak to you differently. It began this year, the new way of being noticed — not for what you say but before you say it. Some of the attention is pleasant. Most of it is not. A woman in your family tells you this is the way of things. You are trying to work out what to do with that information.',
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.s -= 2
      p.addFlag('understands_that_attention_is_not_power')
      p.setMem('scLooksBurdenAck', true)
    },
  },

  {
    id: 'sc_looks_advantage_sales',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.stats.looks >= 72 &&
      G.career &&
      ['business', 'sales', 'finance', 'politics', 'media'].includes(G.career.field) &&
      !G.mem?.scLooksAdvAck,
    text: 'A client signs. They came to the meeting by recommendation and stayed because of the presentation, and you are honest enough to know that the presentation includes you — how you present, how you are received before you speak. The work is real. So is this other thing. You have learned to use it without quite naming it.',
    choices: null,
    effect: (p) => {
      p.w += 4
      p.s += 3
      p.m -= 3
      p.addFlag('appearance_capital')
      p.setMem('scLooksAdvAck', true)
    },
  },

  {
    id: 'sc_looks_fade_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.stats.looks <= 42 &&
      !G.mem?.scLooksFadeAck &&
      G.age >= 38 && G.age <= 55,
    text: 'A photograph. You are in a group and someone passes the phone around. You recognise the person on the left, the person on the right, and then you recognise yourself, and there is a small recalibration — not painful, just accurate. The face in the photograph is the face you have now, and the one you remember having are not the same face, and both of them are you.',
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.e += 5
      p.r += 2
      p.addFlag('accepted_time_passing')
      p.setMem('scLooksFadeAck', true)
    },
  },

]
