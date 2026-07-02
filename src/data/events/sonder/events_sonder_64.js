// Sonder module 64 — 30 contemplative events
// Weight 2, null choices, all mem-gated. Universal human texture.

export const EVENTS_SONDER_64 = [

  {
    id: 'sonder_64_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s64a,
    text: 'The kitchen drawer has objects whose purpose you no longer remember. They were important enough to keep. You have not thrown them away. They occupy the drawer with the confidence of things that belong somewhere.',
    choices: null,
    effect: (p) => { p.setMem('s64a', true) },
  },

  {
    id: 'sonder_64_b',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s64b,
    text: 'The person at the next table in the café is laughing at something on their phone. The laugh is real and private and has nothing to do with you and is still briefly pleasant to be near. Unearned proximity to other people\'s joy is a small resource.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s64b', true) },
  },

  {
    id: 'sonder_64_c',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s64c,
    text: 'You said the thing you were afraid to say and the world did not end. This happened once and was not enough evidence to change the general feeling about saying things you are afraid to say. Evidence and feeling operate on different systems.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s64c', true) },
  },

  {
    id: 'sonder_64_d',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s64d,
    text: 'The meeting that was described in advance as productive was not productive. The meeting that was described as a formality contained the actual decision. You have learned to attend the formalities more carefully than the substantive sessions.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s64d', true) },
  },

  {
    id: 'sonder_64_e',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s64e,
    text: 'You thought everyone could do the thing you could do until you discovered they couldn\'t. The discovery was not pride — it was closer to vertigo. The ground shifted. You were standing on a different patch of ground than you had thought.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s64e', true) },
  },

  {
    id: 'sonder_64_f',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s64f,
    text: 'The body you inhabit has been reliable for so long that you built structures assuming its reliability. The structures stand. The reliability has recently become conditional. You are revising the structures.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s64f', true) },
  },

  {
    id: 'sonder_64_g',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s64g,
    text: 'The compliment you are most tired of receiving is about a quality you value less than the person giving the compliment thinks you do. The compliment lands in the wrong place every time. You accept it anyway because the alternative is a conversation about what you actually value, which is longer.',
    choices: null,
    effect: (p) => { p.setMem('s64g', true) },
  },

  {
    id: 'sonder_64_h',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s64h,
    text: 'The feeling of being watched even when no one is watching — that was something you felt most acutely at this age. You felt it getting up, sitting down, eating, existing in your body in the presence of others. The feeling was not entirely wrong. But it was not entirely right either.',
    choices: null,
    effect: (p) => { p.setMem('s64h', true) },
  },

  {
    id: 'sonder_64_i',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s64i,
    text: 'The night you stayed too long at something and then stood outside in the early morning air and felt the gap between the warm inside and the cold outside — that gap, before you moved, was a specific kind of pause that your life does not offer often.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s64i', true) },
  },

  {
    id: 'sonder_64_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s64j,
    text: 'You know a great deal about one thing that most people know nothing about. The knowledge does not come up often. When it comes up, the conversation changes in a way that is briefly satisfying and then over. The knowledge sits in you unused most of the time like a specific tool in the back of a drawer.',
    choices: null,
    effect: (p) => { p.setMem('s64j', true) },
  },

  {
    id: 'sonder_64_k',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s64k,
    text: 'The people who formed your sense of what was normal — your earliest frame for how things are done, what people are like, what to expect — were a small and specific sample. Everything you learned afterward was implicitly compared to that sample, including things the sample had no way to prepare you for.',
    choices: null,
    effect: (p) => { p.r += 2; p.e += 2; p.setMem('s64k', true) },
  },

  {
    id: 'sonder_64_l',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s64l,
    text: 'The friend who always brings you the right thing when you are sick does not know you as well as the friend you call when you have something important to decide. They serve different functions and are not interchangeable and you are lucky to have both.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s64l', true) },
  },

  {
    id: 'sonder_64_m',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s64m,
    text: 'The thing you were certain about at twenty-four was wrong in a way you could not have identified at twenty-four. You know now. The knowing now doesn\'t help the twenty-four-year-old. You are protective of the certainties of people that age in a specific way that is not quite sympathy.',
    choices: null,
    effect: (p) => { p.setMem('s64m', true) },
  },

  {
    id: 'sonder_64_n',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s64n,
    text: 'The first time you saw the ocean — or the first time you saw snow, or the first time you were in a city much larger than your own — the scale of it produced something that was not wonder and was not fear but was both at the same time, before the two separated into individual feelings.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s64n', true) },
  },

  {
    id: 'sonder_64_o',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s64o,
    text: 'The apology you owe someone has been owed for twelve years. The twelve years have not made it easier to give. The twelve years have added a second layer — the apology for the twelve years on top of the original apology — that makes the task more complex without making it more impossible.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s64o', true) },
  },

  {
    id: 'sonder_64_p',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s64p,
    text: 'The question of what you will have been occupies more space than it used to. Not what you will have done — that list is largely settled — but what kind of thing you will have been. The two questions are related but not identical.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s64p', true) },
  },

  {
    id: 'sonder_64_q',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s64q,
    text: 'The period when you had almost nothing was also a period with specific freedoms. The freedoms were not compensation. They were just true at the same time. You held both at once then. You would not trade the period for its freedoms now. But you remember both.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s64q', true) },
  },

  {
    id: 'sonder_64_r',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s64r,
    text: 'Your handwriting has changed. The change happened gradually and you did not notice it until you compared something written recently to something written ten years ago. The handwriting from ten years ago is recognizably yours. It is also slightly different. You changed your handwriting without deciding to.',
    choices: null,
    effect: (p) => { p.setMem('s64r', true) },
  },

  {
    id: 'sonder_64_s',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s64s,
    text: 'The friendship that was most important to you at fifteen would not survive the people you both became. You know this because you became those people and the friendship did not survive. The not surviving is not a failure of the friendship. The friendship was exactly right for fifteen.',
    choices: null,
    effect: (p) => { p.m -= 2; p.setMem('s64s', true) },
  },

  {
    id: 'sonder_64_t',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s64t,
    text: 'The silence in the house at certain hours has become something you notice rather than something you exist inside of. You are not sure when the transition happened. The silence is the same silence. Your relationship to it has changed.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s64t', true) },
  },

  {
    id: 'sonder_64_u',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s64u,
    text: 'You described yourself differently in letters than in person. The person in the letters was you with more access to the inside. The person in person was you with more capacity for the immediate. The letters required different conditions than conversation. You wrote more in them than you were able to say.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s64u', true) },
  },

  {
    id: 'sonder_64_v',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s64v,
    text: 'The regret that feels largest is not the thing you did but the state you were in when you did it. The thing could have gone differently; the state was what it was. You wish you had done differently. You also wish you had been in a better condition to do differently. The two wishes point at separate problems.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s64v', true) },
  },

  {
    id: 'sonder_64_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s64w,
    text: 'The child at the park was crying for a reason that was obvious to the child and invisible to all the adults watching. The adults watching were not indifferent. They could not see the reason. The child lived in a world where the reason was clear. The two worlds occupied the same park.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s64w', true) },
  },

  {
    id: 'sonder_64_x',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s64x,
    text: 'The work that paid least is the work you remember in the most sensory detail. The texture of the surface, the specific smell, the hour of the day, the name of the person you worked alongside. High-stakes work is remembered differently — by outcome, by anxiety. The low-stakes work is remembered as texture.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s64x', true) },
  },

  {
    id: 'sonder_64_y',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s64y,
    text: 'You have reached the point where some things you held tightly no longer need to be held tightly. The relaxation is not giving up. It is more like arriving at the right grip after a long time using the wrong one.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s64y', true) },
  },

  {
    id: 'sonder_64_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s64z,
    text: 'The moment you realized you had become the person the younger you had hoped to become was not triumphant. It was Tuesday. You were doing something ordinary. The hope had been large and the landing was quiet. The quiet landing is also a version of success.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s64z', true) },
  },

  {
    id: 'sonder_64_aa',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s64aa,
    text: 'The meal that was special — the food that only came on certain days, for certain reasons, from a specific person who made it — is retrievable as a specific taste that is also a specific set of circumstances: the table, the hour, the permission that the food represented.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s64aa', true) },
  },

  {
    id: 'sonder_64_ab',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s64ab,
    text: 'The person who makes decisions you disagree with is operating from information you do not have or from a framework that weighs things differently than yours does. Both possibilities are usually true at the same time. Keeping both in mind requires effort you do not always have.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s64ab', true) },
  },

  {
    id: 'sonder_64_ac',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s64ac,
    text: 'You are sleeping in a room where someone you do not know slept before you and someone you will not meet will sleep after you. The bed is yours for now. The room has absorbed other people\'s nights. You sleep in what they left, and leave what they will sleep in.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s64ac', true) },
  },

  {
    id: 'sonder_64_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s64ad,
    text: 'You can tell the difference now between problems that will resolve if left alone and problems that require action. It took a long time to tell the difference reliably. The failure to tell the difference earlier cost time that went into solving problems that would have resolved themselves and not solving problems that needed action.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s64ad', true) },
  },

]
