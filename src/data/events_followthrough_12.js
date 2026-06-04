// events_followthrough_12.js
// Desire unfulfillment follow-through — late-life reckoning for unmet core desires.
// These fire once in late_life when a character has a desire but key satisfaction
// flags are absent. Each desire has one event; some share structure.
// Guards use !G.flags.has('desire_*_fulfilled') — those flags are never SET,
// so these events fire for nearly all characters with a desire. Intentional.

export const FOLLOWTHROUGH_12_EVENTS = [

  {
    id: 'ft12_prove_worth_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'prove_worth' &&
      G.age >= 62 &&
      !G.flags.has('desire_prove_worth_fulfilled') &&
      !G.mem.ft12ProveWorth,
    text: 'You are old enough now to see the shape of your life from the outside. The thing you wanted to prove — that you were enough, that the early verdict was wrong — you worked toward it through a version of urgency that people around you sometimes called ambition and sometimes called anxiety. Whether it was satisfied is a different question from whether you stopped trying. You are not sure you stopped trying. You are not sure you started knowing what proof would look like.',
    choices: [
      {
        text: 'You made your peace with the question.',
        tag: null,
        outcome: 'The question changes shape but doesn\'t leave. You have learned to carry it differently.',
        effect: (p) => { p.m += 4; p.karma += 4; p.setMem('ft12ProveWorth', true) },
      },
      {
        text: 'The work still isn\'t done.',
        tag: null,
        outcome: 'There is still something to prove. You are aware this is both true and possibly not the most useful frame for the years you have left. You carry both.',
        effect: (p) => { p.r += 5; p.setMem('ft12ProveWorth', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft12_belong_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'belong' &&
      G.age >= 62 &&
      !G.flags.has('desire_belong_fulfilled') &&
      !G.mem.ft12Belong,
    text: 'The groups you joined, the communities you found yourself in and then outside of again. The belonging that arrived and then didn\'t hold, or held for a while and then changed around you while you stayed the same. You are old enough now to see that belonging was never quite the stable thing the word implied. It required maintenance, and the maintenance required you to become slightly different versions of yourself in succession, and at some point you stopped.',
    choices: [
      {
        text: 'You found a version of it that was enough.',
        tag: null,
        outcome: 'Small but durable. One person, or a few. A place. Enough.',
        effect: (p) => { p.m += 5; p.s += 2; p.setMem('ft12Belong', true) },
      },
      {
        text: 'You made your peace with being somewhat outside.',
        tag: null,
        outcome: 'The outside has its own texture. You have furnished it over time.',
        effect: (p) => { p.m += 2; p.karma += 5; p.setMem('ft12Belong', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft12_be_seen_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'be_seen' &&
      G.age >= 62 &&
      !G.flags.has('desire_be_seen_fulfilled') &&
      !G.mem.ft12BeSeen,
    text: 'What you wanted was to be recognized: not famous, necessarily, but seen — the specific you, not the category you occupied. It happened sometimes. A teacher once. A colleague for a period. A partner who saw you clearly for a year before seeing something else. The recognition was real when it arrived. What surprised you was how briefly it satisfied the thing it was supposed to satisfy. You would be seen and then still feel the same need. You are still not sure what the need is, exactly. Closer than a need for approval, more precise than a need for love.',
    choices: [
      {
        text: 'You have been seen. The moments were enough.',
        tag: null,
        outcome: 'Small clearings in a longer story. You hold them.',
        effect: (p) => { p.m += 5; p.setMem('ft12BeSeen', true) },
      },
      {
        text: 'It wasn\'t quite what you needed, even when it arrived.',
        tag: null,
        outcome: 'The gap between being recognized and feeling recognized: you know it intimately. This is also a kind of knowledge.',
        effect: (p) => { p.r += 4; p.karma += 3; p.setMem('ft12BeSeen', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft12_safety_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'safety' &&
      G.age >= 62 &&
      !G.flags.has('desire_safety_fulfilled') &&
      !G.mem.ft12Safety,
    text: 'You spent a significant portion of your life managing the possibility of things going wrong. The contingencies: what happens if the money runs out, what happens if the relationship fails, what happens if the health turns. Some of this management was functional. Some of it was the early experience of instability translated into an adult practice of preparing for catastrophe that then did not arrive. You are old enough now to see the cost of the management alongside its benefits.',
    choices: [
      {
        text: 'The preparation kept you safe. You don\'t regret it.',
        tag: null,
        outcome: 'Safety is not nothing. The foundations held. The cost was worth the structure.',
        effect: (p) => { p.m += 4; p.h += 2; p.setMem('ft12Safety', true) },
      },
      {
        text: 'Some of the preparation kept you from other things.',
        tag: null,
        outcome: 'The unlived risks. You name a few. You are not sure whether you would have taken them if the early experience had been different.',
        effect: (p) => { p.r += 6; p.karma += 2; p.setMem('ft12Safety', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft12_connection_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'connection' &&
      G.age >= 62 &&
      !G.flags.has('desire_connection_fulfilled') &&
      !G.flags.has('partner') &&
      !G.mem.ft12Connection,
    text: 'What you wanted was close proximity to another person — not the abstraction of love but the specific daily practice of a life alongside someone who knew what you were actually like and remained. You had pieces of it. A relationship that lasted a decade. A friendship of the kind that doesn\'t require explanation. A child who calls on a regular basis. These were real. What you also had was the specific loneliness of people who know what they want and have only had partial versions of it.',
    choices: [
      {
        text: 'The partial versions were enough.',
        tag: null,
        outcome: 'Not everything you want arrives complete. What arrived was real.',
        effect: (p) => { p.m += 5; p.karma += 4; p.setMem('ft12Connection', true) },
      },
      {
        text: 'You still feel the want.',
        tag: null,
        outcome: 'In the evenings, mostly. You have learned to sit with it. That is not the same as not feeling it.',
        effect: (p) => { p.m -= 3; p.r += 5; p.setMem('ft12Connection', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft12_leave_mark_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'leave_mark' &&
      G.age >= 62 &&
      !G.flags.has('desire_leave_mark_fulfilled') &&
      !G.flags.has('famous') &&
      !G.mem.ft12LeaveMark,
    text: 'What you wanted was to make something that would outlast you. A work, a child, a thing in the world that would exist after you stopped existing. You made things. Some of them persist. Whether they will persist past the point where anyone who knew you is also gone — this is the question the desire was always really asking, and it is a question that cannot be answered in your lifetime by design.',
    choices: [
      {
        text: 'What you made is enough.',
        tag: null,
        outcome: 'The mark is in the record. What happens to the record is not yours to determine.',
        effect: (p) => { p.m += 4; p.karma += 5; p.setMem('ft12LeaveMark', true) },
      },
      {
        text: 'You wanted more than what you made.',
        tag: null,
        outcome: 'The wanting is also a piece of evidence about what you valued. That is not a small thing to know about yourself.',
        effect: (p) => { p.r += 5; p.m += 2; p.setMem('ft12LeaveMark', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft12_freedom_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'freedom' &&
      G.age >= 62 &&
      !G.flags.has('desire_freedom_fulfilled') &&
      !G.mem.ft12Freedom,
    text: 'The freedom you wanted was not just absence of constraint — it was the specific feeling of moving through the world without owing anyone an explanation. You had moments of it. Some years were freer than others. What you also had was the discovery that freedom without attachment has its own costs, and that the constraints you accumulated over time — children, debts, a place you had put down roots — were also the things that made the freedom worth having when it arrived.',
    choices: [
      {
        text: 'You found enough of it.',
        tag: null,
        outcome: 'The specific years that were free. The choices that were yours. You count them and they are enough.',
        effect: (p) => { p.m += 6; p.setMem('ft12Freedom', true) },
      },
      {
        text: 'More of your life was obligated than you planned.',
        tag: null,
        outcome: 'The obligations were real and some of them were worth it. That is not quite the same as having chosen them freely. You know the difference.',
        effect: (p) => { p.r += 5; p.karma += 3; p.setMem('ft12Freedom', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ft12_redemption_unlived',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.desire === 'redemption' &&
      G.age >= 62 &&
      !G.flags.has('desire_redemption_fulfilled') &&
      !G.mem.ft12Redemption,
    text: 'The thing you did, or the thing that was done to you, that required making right — you spent a portion of your life in its vicinity. Making amends, or preparing to. Carrying the weight of it in a way that expressed itself as effort in other domains. Whether the redemption actually happened is a different question from whether you moved toward it. You moved toward it. The arrival is harder to confirm.',
    choices: [
      {
        text: 'You did what you could. It is enough.',
        tag: null,
        outcome: 'The account is not settled but the effort was real. You put it down.',
        effect: (p) => { p.m += 5; p.karma += 8; p.r -= 4; p.setMem('ft12Redemption', true) },
      },
      {
        text: 'The weight is still there.',
        tag: null,
        outcome: 'It has changed shape over time. It is lighter than it was. It is not gone.',
        effect: (p) => { p.r += 4; p.karma += 4; p.setMem('ft12Redemption', true) },
      },
    ],
    effect: null,
  },

]
