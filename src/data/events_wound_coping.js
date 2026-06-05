// Wound coping events — one per desire archetype, fire during adolescence.
// Establish how the character learns to handle their core formative wound.
// This is the first moment they consciously manage the thing that drives them.
// Requires: desire set by events_desires.js wound events, no coping yet established.
// Stores result in mem.woundCoping for use by subsequent events and year texture.

export const WOUND_COPING_EVENTS = [

  {
    id: 'wc_prove_worth',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.desire === 'prove_worth' && !G.mem?.woundCoping,
    text: `The feeling has been there for years — that you have to earn your place, that the doubt inside you could be confirmed any moment. By adolescence you have found two ways of living with it.`,
    choices: [
      {
        text: 'Fight harder. Silence the doubt by becoming undeniable.',
        outcome: 'You work twice as hard as anyone else. The doubt is still there. You have learned to outrun it.',
        effect: (p) => { p.setMem('woundCoping', 'fight'); p.e += 5; p.m -= 3 },
      },
      {
        text: 'Withdraw. If you never fully try, it can never be confirmed.',
        outcome: 'A certain safety in smallness. The wound is protected. So are the possibilities.',
        effect: (p) => { p.setMem('woundCoping', 'withdraw'); p.r += 4 },
      },
    ],
  },

  {
    id: 'wc_belong',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.desire === 'belong' && !G.mem?.woundCoping,
    text: `You have always felt just slightly outside — of rooms, of circles, of the understanding people seem to share without needing to explain it. By adolescence, two strategies have crystallized.`,
    choices: [
      {
        text: 'Conform. Remake yourself into whoever the room needs.',
        outcome: 'You become fluent in belonging. The cost is a certain amnesia about which version of yourself is original.',
        effect: (p) => { p.setMem('woundCoping', 'conform'); p.s += 5; p.r += 3 },
      },
      {
        text: 'Build your own room. Gather your own people.',
        outcome: 'You make yourself the center of a small world that needs you. The belonging is real, if deliberately constructed.',
        effect: (p) => { p.setMem('woundCoping', 'collect'); p.s += 4; p.m += 3 },
      },
    ],
  },

  {
    id: 'wc_be_seen',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.desire === 'be_seen' && !G.mem?.woundCoping,
    text: `Invisibility is something you know from the inside. You have been overlooked in ways that leave marks. Two responses have emerged.`,
    choices: [
      {
        text: 'Perform. Make yourself impossible to ignore.',
        outcome: 'You learn to take up space. People notice you. The original wound does not entirely close, but it is covered.',
        effect: (p) => { p.setMem('woundCoping', 'perform'); p.s += 6; p.lo += 3 },
      },
      {
        text: 'Provoke. Get attention through trouble if not through charm.',
        outcome: 'Negative attention is still attention. You learn this early. It will cost things you do not know you are spending yet.',
        effect: (p) => { p.setMem('woundCoping', 'provoke'); p.karma -= 3; p.m -= 2 },
      },
    ],
  },

  {
    id: 'wc_safety',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.desire === 'safety' && !G.mem?.woundCoping,
    text: `Safety was not a given in your early years. The world taught you it could be taken away. You have built a relationship with this fact.`,
    choices: [
      {
        text: 'Control. Order everything within reach.',
        outcome: 'Rules, routines, certainty manufactured wherever it can be. The world is not safe but your corner of it can be made to feel like it.',
        effect: (p) => { p.setMem('woundCoping', 'control'); p.e += 4; p.r += 2 },
      },
      {
        text: 'Vanish. Become invisible. Take no risks that could be noticed.',
        outcome: 'You master the art of not being where trouble is. The trade-off is that you are also not where opportunity is.',
        effect: (p) => { p.setMem('woundCoping', 'vanish'); p.r += 5 },
      },
    ],
  },

  {
    id: 'wc_connection',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.desire === 'connection' && !G.mem?.woundCoping,
    text: `Connection is what you have always reached for. Sometimes desperately. Two shapes for that reaching have developed.`,
    choices: [
      {
        text: 'Pursue. Move toward people, even at cost.',
        outcome: 'You become someone who calls, who shows up, who refuses the drift. Some find it overwhelming. Others find it sustaining.',
        effect: (p) => { p.setMem('woundCoping', 'pursue'); p.s += 5; p.m += 4 },
      },
      {
        text: 'Caretake. Make yourself essential to others.',
        outcome: 'Needed is close enough to loved. For a long time, this works.',
        effect: (p) => { p.setMem('woundCoping', 'caretake'); p.karma += 4; p.r += 3 },
      },
    ],
  },

  {
    id: 'wc_leave_mark',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.desire === 'leave_mark' && !G.mem?.woundCoping,
    text: `The terror of disappearing — of living and being forgotten as though you had not been there. You have found two ways of addressing this.`,
    choices: [
      {
        text: 'Build. Create things that outlast you.',
        outcome: 'You begin making things. Writing, designing, building, growing. The work feels like resistance against oblivion.',
        effect: (p) => { p.setMem('woundCoping', 'build'); p.e += 5; p.karma += 3 },
      },
      {
        text: 'Acquire. Accumulate, so there is proof you were here.',
        outcome: 'Objects and achievements stack up. They are not the mark you wanted but they are the mark you have.',
        effect: (p) => { p.setMem('woundCoping', 'acquire'); p.w += 5; p.r += 2 },
      },
    ],
  },

  {
    id: 'wc_freedom',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.desire === 'freedom' && !G.mem?.woundCoping,
    text: `The feeling of being trapped — in the family, the place, the life that was assigned rather than chosen — has shaped how you move through adolescence.`,
    choices: [
      {
        text: 'Escape. Plan to leave. Start leaving.',
        outcome: 'You become someone oriented toward exits. The freedom is real. The loneliness is too.',
        effect: (p) => { p.setMem('woundCoping', 'escape'); p.m += 3; p.r += 4 },
      },
      {
        text: 'Resist. Fight every limit placed on you.',
        outcome: 'You become someone who argues, challenges, refuses. You pay a social tax. The feeling of agency is worth it.',
        effect: (p) => { p.setMem('woundCoping', 'resist'); p.karma += 4; p.s += 3 },
      },
    ],
  },

  {
    id: 'wc_redemption',
    phase: 'adolescence',
    weight: 3,
    when: (G) => G.desire === 'redemption' && !G.mem?.woundCoping,
    text: `The sense that something needs to be made right — something done, not done, or witnessed — runs underneath everything. You have found two ways of carrying it.`,
    choices: [
      {
        text: 'Atone. Work to make up for the real or imagined failure.',
        outcome: 'You become someone who helps — sometimes compulsively — trying to settle a debt whose terms you wrote yourself.',
        effect: (p) => { p.setMem('woundCoping', 'atone'); p.karma += 6; p.m -= 3 },
      },
      {
        text: 'Deny. Refuse to examine it. Keep moving.',
        outcome: 'The wound is protected under layers of activity and forward motion. It surfaces anyway, in the way wounds do.',
        effect: (p) => { p.setMem('woundCoping', 'deny'); p.r += 5 },
      },
    ],
  },

]
