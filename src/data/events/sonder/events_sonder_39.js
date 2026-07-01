// events_sonder_39.js
// Contemplative layer — 30 events.
// Themes: the translation problem, what age teaches about time,
// the specific weight of inherited objects, a city seen from above,
// the conversation that should have happened.

export const EVENTS_SONDER_39 = [

  {
    id: 'sonder_39_a',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s39a,
    text: 'There is something you understand in your first language that you cannot say in the second. The concept exists; the word does not translate; the translation loses the thing. You have tried to explain it in the other language and watched people understand something adjacent to what you meant. The adjacent thing is not the thing.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s39a', true) },
  },

  {
    id: 'sonder_39_b',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s39b,
    text: 'The year passes faster than last year, which passed faster than the year before. This is not a feeling; it is consistent with what is understood about perception: time feels shorter when there is less novelty in it. The implication is that the years that feel shortest are the years most fully inhabited by routine — the years you were, in some sense, most yourself.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s39b', true) },
  },

  {
    id: 'sonder_39_c',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s39c,
    text: 'The object was your grandmother\'s and then your mother\'s and is now yours and will eventually be someone else\'s or nowhere. The object itself is indifferent to this sequence. The sequence is in you. When you pick up the object you are also, briefly, the child who watched your grandmother pick it up, which is the closest thing to seeing your grandmother alive that is still available to you.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s39c', true) },
  },

  {
    id: 'sonder_39_d',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s39d,
    text: 'Seen from above — from a plane, from a high building — the city is a pattern with no individual in it. You can see the general shape of how people move, the logic of the streets, the density of different neighbourhoods. From above, the texture of individual lives is not visible. You have been in both positions. The distance changes what is legible.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s39d', true) },
  },

  {
    id: 'sonder_39_e',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s39e,
    text: 'The conversation you should have had has a specific shape in your memory: the table, the other person, the approximate hour, the thing you had been building to and then did not say. The conversation that happened instead went somewhere else and ended differently. You have replayed the first version often enough that it has the quality of memory even though it did not happen.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s39e', true) },
  },

  {
    id: 'sonder_39_f',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s39f,
    text: 'There is something you were afraid of as a child that you are not afraid of now. The fear was real and specific. At some point between then and now it dissolved, and you cannot point to the moment of dissolution. The fear simply stopped being there. You are not sure what to conclude about the nature of fear from this, but you have noticed it.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s39f', true) },
  },

  {
    id: 'sonder_39_g',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s39g,
    text: 'The meeting ran long. You were late for something. What you were late for is not recoverable, but the specific frustration of the meeting that ran long is preserved in the body — the glance at the phone, the calculation of what was still possible. This memory is not important. It is extremely specific. These two things are not contradictory.',
    choices: null,
    effect: (p) => { p.setMem('s39g', true) },
  },

  {
    id: 'sonder_39_h',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s39h,
    text: 'The kindness you received from a stranger at a specific moment and did not fully register at the time — the person who helped with the bags, or waited, or said the right thing without being asked. You have thought about it since. The stranger did not know it mattered. The mattering happened later, in the thinking.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s39h', true) },
  },

  {
    id: 'sonder_39_i',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s39i,
    text: 'Your handwriting has changed. The handwriting you had at fifteen is available in old notebooks. The handwriting you have now is different from it in ways that are not entirely explicable by practice: something about the pressure, the slant, the shape of specific letters. Handwriting is the body\'s trace on the page. The trace changes as the body changes.',
    choices: null,
    effect: (p) => { p.setMem('s39i', true) },
  },

  {
    id: 'sonder_39_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s39j,
    text: 'The work meeting where you understood, before it ended, exactly how it would end. Not from evidence — from some accumulation of signal that the rational analysis arrived at afterward. You have started to trust this knowledge. It is not infallible. It is often right enough to act on. You do not know what to call it except attention that has accumulated past a certain threshold.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s39j', true) },
  },

  {
    id: 'sonder_39_k',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s39k,
    text: 'There was a period when the specific question of who you were going to be felt entirely open. You did not know yet. The not-knowing was not frightening — it was a kind of space. That period ended, gradually and without announcement, as the choices accumulated and the space of possibility contracted toward what you actually became.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s39k', true) },
  },

  {
    id: 'sonder_39_l',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s39l,
    text: 'The day your parent talked to you like an adult for the first time. Not as a parent to a child — a different register. You remember noticing it. The shift was not announced. They began explaining something instead of deciding it for you, and the explanation included your opinion as a variable. The day is not dateable but it is in the memory as a specific event.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s39l', true) },
  },

  {
    id: 'sonder_39_m',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s39m,
    text: 'The things your body used to do without requiring recovery: the long walk, the night of poor sleep followed by a productive day, the bending and lifting without consequence. These things departed incrementally, so that there was no single morning when they were all gone, only a series of mornings when one more thing required more careful management than it used to.',
    choices: null,
    effect: (p) => { p.r += 2; p.h -= 1; p.setMem('s39m', true) },
  },

  {
    id: 'sonder_39_n',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s39n,
    text: 'You have read the same book at different ages and it was a different book each time. The words are the same. You changed. The book available to you at twenty-two is not the book available to you at forty because at forty you have different information about what the book is describing, which is to say about what has happened to people.',
    choices: null,
    effect: (p) => { p.e += 2; p.m += 2; p.setMem('s39n', true) },
  },

  {
    id: 'sonder_39_o',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s39o,
    text: 'You have made the same mistake more than once. Not a similar mistake — the same structural error, appearing in different contexts. The contexts were different enough that you did not recognise the mistake until after. The structure was consistent. You are not sure what this says about you. You have noticed it.',
    choices: null,
    effect: (p) => { p.r += 2; p.e += 2; p.setMem('s39o', true) },
  },

  {
    id: 'sonder_39_p',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s39p,
    text: 'The map of the world at the age when you first saw one. The borders were different or the same and you did not know the difference. The countries had sizes and shapes that you memorized without understanding what they contained. The memorized shapes are still in you. Some of them are the wrong shapes now because the borders changed.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s39p', true) },
  },

  {
    id: 'sonder_39_q',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s39q,
    text: 'There is a younger person at work who reminds you of how you were at that age — the specific combination of ambition and unawareness, the certainty about things that will turn out to be more complicated. You do not tell them this. The information would not be useful. The finding-out is the education.',
    choices: null,
    effect: (p) => { p.r += 2; p.m += 2; p.setMem('s39q', true) },
  },

  {
    id: 'sonder_39_r',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s39r,
    text: 'The photograph you have of your parents when they were younger than you are now. They look like adults in it. They look nothing like what you understand adults to be from inside adulthood. They look like people who were trying, who were in the middle of something, who did not know what came next.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s39r', true) },
  },

  {
    id: 'sonder_39_s',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s39s,
    text: 'The explanation you gave that was accurate and was not understood. You tried a different explanation and it was also not understood. At some point you stopped trying to explain and let the thing stand as it was. The misunderstanding has been there since. You have learned to work around it.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s39s', true) },
  },

  {
    id: 'sonder_39_t',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s39t,
    text: 'There was a summer — or a season, or a stretch of months — that lasted longer than any other equivalent period of your life. The time moved at a speed that is not available now. You could not tell you what made it slow. The slowness made the detail available: specific afternoons, specific light, the name of who was there.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s39t', true) },
  },

  {
    id: 'sonder_39_u',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s39u,
    text: 'The embarrassment from fifteen years ago arrives without warning in the middle of something unrelated. The grocery shop, the walk. You are suddenly back in the room where the embarrassment happened. The room is accurate. The feeling is accurate. The embarrassment is over and was not as catastrophic as it felt. The body does not seem to know this.',
    choices: null,
    effect: (p) => { p.setMem('s39u', true) },
  },

  {
    id: 'sonder_39_v',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s39v,
    text: 'You have started to appreciate things that you actively disliked when you were young. Not everything — some of the dislikes have held. But some of the things you could not understand the point of have become things you actively seek. Whether this is growth or the accommodation of diminishing energy for resistance is an open question.',
    choices: null,
    effect: (p) => { p.m += 2; p.r += 2; p.setMem('s39v', true) },
  },

  {
    id: 'sonder_39_w',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s39w,
    text: 'The friendship that went quiet. Not a falling out — a gradual reduction in contact, until the contact is once a year, then once every few years, then a message at a birthday. The friendship is still there in the sense that if you met in a room it would be available. The distance is not estrangement. It is what happens when two lives move in different directions and the effort of maintenance exceeds what either person has to offer.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s39w', true) },
  },

  {
    id: 'sonder_39_x',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s39x,
    text: 'You learned the name of something before you learned the thing itself. The word was in the adult vocabulary you were absorbing before you had access to what it named. When you finally encountered the thing, it already had a name in your head and the name shaped how you received it. This is true of many things. You cannot always identify which.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s39x', true) },
  },

  {
    id: 'sonder_39_y',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s39y,
    text: 'The job interview where you performed a version of yourself that was accurate in the relevant facts and not entirely continuous with the rest of you. You were professional. You were consistent. You answered the questions correctly. The version of you that sat in that chair and got that job is you. It is also a specific presentation of you. All professional presentations are this.',
    choices: null,
    effect: (p) => { p.setMem('s39y', true) },
  },

  {
    id: 'sonder_39_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s39z,
    text: 'The sentence you almost said and then didn\'t. Not a significant sentence — a small correction, a mild observation, a word of disagreement. You did not say it and the conversation continued without it and the omission has been there ever since, present in a way that is not quite guilt and not quite regret but occupies the same part of the interior.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s39z', true) },
  },

  {
    id: 'sonder_39_aa',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s39aa,
    text: 'The version of yourself that existed before the thing happened. You can access it in memory but you cannot return to it. The thing changed something in the sequence of the self. The before-version is still in there as a historical record. The after-version is the one you are working with.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s39aa', true) },
  },

  {
    id: 'sonder_39_ab',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s39ab,
    text: 'The song that was everywhere during a specific period and then went away. You have not thought about it in years and then it comes back — from a shop, from someone else\'s phone — and the period comes back with it: not the events but the texture, the emotional climate, the particular quality of those months in your life. The song is a compression of time that the brain stored against future access.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s39ab', true) },
  },

  {
    id: 'sonder_39_ac',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s39ac,
    text: 'The adult who told you the truth when you were not expecting the truth. Not a lesson — actual information, delivered without softening. You were old enough to receive it and it changed something. You have carried a version of that person\'s directness as a standard you return to when you are deciding how to speak to someone younger.',
    choices: null,
    effect: (p) => { p.e += 3; p.m += 2; p.setMem('s39ac', true) },
  },

  {
    id: 'sonder_39_ad',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s39ad,
    text: 'The room you rented when you first lived alone. The specific dimensions of it: how many steps from the door to the window, the noise from the street at different hours, the particular quality of being alone in a space that was entirely yours. You can reconstruct it from memory with a detail you cannot replicate for rooms you have lived in since, even larger ones, even better ones.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s39ad', true) },
  },

]
