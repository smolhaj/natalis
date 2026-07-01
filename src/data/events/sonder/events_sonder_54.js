// events_sonder_54.js — contemplative layer, weight 2, all mem-gated

export const EVENTS_SONDER_54 = [

  {
    id: 'sonder_54_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s54a,
    text: 'The smell of a particular building you knew as a child. Not your house — someone else\'s. A school, a neighbour\'s flat, a shop that has closed. The smell arrives without warning: in a hotel corridor, in a lift, in a building in a different city on a different continent. You recognize it before you can name it. It is not a smell that exists as a category. It is only that specific place, that specific time, and the fact that your body filed it.',
    choices: null,
    effect: (p) => { p.setMem('s54a', true) },
  },

  {
    id: 'sonder_54_b',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s54b,
    text: 'A sentence your teacher said — not in a lesson, not about a subject, said by accident in a corridor or at the end of the day. You remember the words exactly. You have used the principle in situations the teacher was not imagining. The teacher does not know this sentence stayed. The teacher may not remember saying it. You use it the way people use tools that came with no manual.',
    choices: null,
    effect: (p) => { p.setMem('s54b', true) },
  },

  {
    id: 'sonder_54_c',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s54c,
    text: 'A photograph in which everyone is still alive. You can identify the year by the haircuts, by what is behind the subjects, by what was not yet wrong. Everyone in the photograph will die. You are the only one of the people in this photograph who knows this, because the photograph was taken at a moment when that particular outcome had not yet established itself. You have become the photograph\'s memory of itself.',
    choices: null,
    effect: (p) => { p.setMem('s54c', true) },
  },

  {
    id: 'sonder_54_d',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s54d,
    text: 'You wake in a room and do not know where you are. Not disoriented — genuinely blank. The ceiling, the light, the sound through the window: none of it resolves into location for several seconds. Then: the smell, the specific creak of the bed, a detail. You are here. You remember travelling here. The blank was a moment of being no one in particular, in no place in particular, before the world reassembled itself around you.',
    choices: null,
    effect: (p) => { p.setMem('s54d', true) },
  },

  {
    id: 'sonder_54_e',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s54e,
    text: 'The radio in the next room. Your parents are awake and you are supposed to be asleep. The voices are indistinct. The music starts and stops. The quality of the light under the door is different from daylight — it is the light of the lamp they use in the evenings, the specific warmth of it. You are not needed there. The house is running without you. This is not loneliness: it is the first evidence that the world has a version of itself that doesn\'t require your presence.',
    choices: null,
    effect: (p) => { p.setMem('s54e', true) },
  },

  {
    id: 'sonder_54_f',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s54f,
    text: 'You are in someone else\'s house — a friend\'s home, a boyfriend\'s flat, a family you\'ve been invited to stay with. The house makes sounds yours doesn\'t. The pipes knock differently. The stairs have a different register. The refrigerator hums on a different note. In the night you can hear the house settling and it is not your house settling, so you don\'t know what it is settling into.',
    choices: null,
    effect: (p) => { p.setMem('s54f', true) },
  },

  {
    id: 'sonder_54_g',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s54g,
    text: 'The first time grief had physical weight. Not metaphorical weight — actual heaviness in the chest, the arms, the area just below the sternum. You had not known the body would do this. The body had not done this before with you. The body was doing something it knew how to do and that you were encountering for the first time: the specific work of carrying a loss that the rest of the world does not know you are carrying.',
    choices: null,
    effect: (p) => { p.setMem('s54g', true) },
  },

  {
    id: 'sonder_54_h',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s54h,
    text: 'The country changing around you without anyone announcing it is changing. The shop that was one thing is now another. The street that was quiet is now the place everyone goes. The neighbourhood that was considered undesirable is now the neighbourhood people move to when they want to say something about themselves. You did not make any of these changes. The changes happened in the accumulated decisions of people you don\'t know, and one day you walk through the street and you don\'t recognize it any more than you recognize yourself in old photographs.',
    choices: null,
    effect: (p) => { p.setMem('s54h', true) },
  },

  {
    id: 'sonder_54_i',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s54i,
    text: 'Handwriting you would know anywhere. Not your own — someone else\'s. A parent, a friend, a teacher. The specific loop in the letter g. The way the t crosses. This person could write any word in any order and you would identify the handwriting before you read the word. This is a form of knowing that doesn\'t require thought, that operates faster than recognition: the body reading before the mind arrives.',
    choices: null,
    effect: (p) => { p.setMem('s54i', true) },
  },

  {
    id: 'sonder_54_j',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s54j,
    text: 'The thing you kept meaning to explain. To a parent, a sibling, a friend — the full version of something you said partially once and never returned to. The explanation exists in you clearly: you know what you would say, how you would say it, what you would want them to understand. The conversation did not happen. Now it cannot. The explanation is still there, fully formed, with nowhere to go.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s54j', true) },
  },

  {
    id: 'sonder_54_k',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s54k,
    text: 'The last time your child thought you knew everything. You cannot identify it precisely — it was not marked. One day they stopped asking your opinion as if your opinion settled the matter. One day they stopped looking at you to calibrate their response to a situation. You did not notice the transition while it was happening. You noticed afterward, looking back, that there was a period when you knew everything and a period when you didn\'t, and no day that divided them.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s54k', true) },
  },

  {
    id: 'sonder_54_l',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s54l,
    text: 'A task that seemed enormous the first time and is now ordinary. You do not notice doing it. You do it while thinking about something else. The version of you who first encountered this task — nervous, deliberate, checking everything twice — is entirely gone. In its place is a version of you who does this automatically. The transition from one to the other was so gradual that you have no memory of it.',
    choices: null,
    effect: (p) => { p.setMem('s54l', true) },
  },

  {
    id: 'sonder_54_m',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s54m,
    text: 'A habit you picked up from someone who is now dead. You make the coffee the way they made it. You fold the newspaper the way they folded it. You say a particular phrase — the specific rhythm of it — the way they said it. The habit is in you so completely that you do not think of them when you do it. Then you think of them. The habit is how the dead keep making small appearances in the lives of people who loved them.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s54m', true) },
  },

  {
    id: 'sonder_54_n',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s54n,
    text: 'The building before it was what it is now. You remember it as a school, a warehouse, a pub, an empty lot. It is now a restaurant, a block of flats, a supermarket. The previous thing is still there in your experience of the current thing — you walk through the restaurant and you are also walking through the school. This is a form of extra information nobody else in the room has: the knowledge that the place once had a different purpose and different people.',
    choices: null,
    effect: (p) => { p.setMem('s54n', true) },
  },

  {
    id: 'sonder_54_o',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s54o,
    text: 'You become the oldest person in the room. Not always — not even often — but in certain specific rooms: a meeting at work, a gathering of your closest friends, a family occasion. The position has no formality. Nobody announces it. But you are aware of it: the room is full of people who are younger than you, and you can see them the way older people always saw you, which is to say: as people who have not been where this is going.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s54o', true) },
  },

  {
    id: 'sonder_54_p',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s54p,
    text: 'A meal that meant nothing at the time. An ordinary lunch in an ordinary week, thirty years ago — you have no reason to remember it and you cannot fully reconstruct it. But something of it remains: the light in the room, a particular quality of being there. Not a special meal. Not a significant occasion. A meal that meant nothing. The fact that some residue of it remains is harder to explain than the meals you remember deliberately.',
    choices: null,
    effect: (p) => { p.setMem('s54p', true) },
  },

  {
    id: 'sonder_54_q',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s54q,
    text: 'An afternoon you remember having nothing to do. A summer afternoon, a school holiday, a day with no appointments and no obligations and nothing specific happening. You wandered through it. You sat somewhere and got up and sat somewhere else. Time moved differently — not fast, not slow, but in a texture that has no name except the texture of an afternoon with nothing to do, which is a form of wealth you did not know you had.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s54q', true) },
  },

  {
    id: 'sonder_54_r',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s54r,
    text: 'You hear the same news twice — once when it happens and once when you tell someone who hasn\'t heard. The second time is different. The first time the news arrived from outside. The second time it arrives through you, and you watch the other person\'s face change, and you are the news, briefly. You learn something about how news travels and what you become when you carry it.',
    choices: null,
    effect: (p) => { p.setMem('s54r', true) },
  },

  {
    id: 'sonder_54_s',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s54s,
    text: 'A word that exists in your language and does not translate. You try to explain it to someone who doesn\'t have it. The explanation is always too long. The word in your language does the work in one syllable. The language without the word has to use a sentence and still doesn\'t land. You begin to understand that you think certain things by having the word for them, and that the people without the word are not thinking quite the same thing.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s54s', true) },
  },

  {
    id: 'sonder_54_t',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s54t,
    text: 'A colleague you never saw outside of work. You spent more hours with them than with most of your friends. You know what they look like when they\'re frustrated, when they\'ve had a good morning, when they\'re trying not to show they\'re tired. You don\'t know where they live. You don\'t know what they do in the evenings. The relationship exists entirely within the building, within the hours, and feels complete within those limits in a way that is hard to explain to people who have not experienced it.',
    choices: null,
    effect: (p) => { p.setMem('s54t', true) },
  },

  {
    id: 'sonder_54_u',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s54u,
    text: 'The moment your body had opinions you hadn\'t consulted. A food you suddenly couldn\'t eat. A physical reaction to a place or person that arrived before thought did. A new sensation in your back, your knee, your stomach that wasn\'t there last year. The body issuing notices you didn\'t know it was authorized to issue. You begin to understand that you live inside something that has its own agenda and only intermittently matches yours.',
    choices: null,
    effect: (p) => { p.setMem('s54u', true) },
  },

  {
    id: 'sonder_54_v',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s54v,
    text: 'The way time moved before phones. An afternoon waiting for someone to call — you were in the flat, you could not leave the flat because the phone was in the flat. A day with no particular anchor, with no device to check. The time had a different texture. Not better, not worse. Different. You can reconstruct it intellectually but the body no longer knows how to do it — the body has been reconditioned by the phone, by the constant small availability of something to check.',
    choices: null,
    effect: (p) => { p.setMem('s54v', true) },
  },

  {
    id: 'sonder_54_w',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s54w,
    text: 'A street that no longer exists as it was. The specific configuration of the buildings, the specific quality of the light when the buildings had that configuration. You walk along what is now there and you are also walking along what was there, which only you and a few other people now carry. This is not grief, exactly. It is the particular position of being the memory of something that no longer exists in any other form.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s54w', true) },
  },

  {
    id: 'sonder_54_x',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s54x,
    text: 'The person at the counter who didn\'t look up. A bureaucrat, a clerk, a cashier — someone whose job placed them between you and a thing you needed. They processed you without looking at you. You were a form to be filled, a transaction to be completed. Afterward you tried to think of who they were when they were not at the counter. You couldn\'t. The counter had made them temporarily two-dimensional, and you had let it, which implicates you too.',
    choices: null,
    effect: (p) => { p.setMem('s54x', true) },
  },

  {
    id: 'sonder_54_y',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s54y,
    text: 'A particular quality of afternoon light that keeps returning. Not the same afternoon — a different one, in a different year, in a different place, but the light is recognizably the same light. Low and slanted and specific in the way it hits a surface. It is enough to stop you for a second. The light is doing something and you do not know exactly what it is doing, except that it has done this before, and each time it does it you feel the previous times briefly laid over the current one.',
    choices: null,
    effect: (p) => { p.setMem('s54y', true) },
  },

  {
    id: 'sonder_54_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s54z,
    text: 'Your face begins to tell you things. A line you didn\'t put there. A way the light catches something that wasn\'t there five years ago. You are not the first person to look in a mirror and find someone slightly different looking back, and you will not be the last. But it is happening to you specifically, in this specific face, which you have been looking at longer than anyone and which is now changing in ways that require no consent.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s54z', true) },
  },

  {
    id: 'sonder_54_aa',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s54aa,
    text: 'Something you have carried across every move. Not because it is valuable or beautiful — because you have not decided not to carry it. A ceramic dish. A book you have not read since the first time. A photograph of people you no longer know how to contact. It has been in every flat, every house, in a different position each time but always present. At some point it became the thing that marks the place as yours rather than temporary.',
    choices: null,
    effect: (p) => { p.setMem('s54aa', true) },
  },

  {
    id: 'sonder_54_ab',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s54ab,
    text: 'The specific quality of waiting for someone who is late. Not long late — ten minutes, fifteen. You are in a café or on a corner. You have checked your phone. You have rechecked your phone. The time passes at a different rate than time normally passes. There is a version of you waiting who is calm and a version who is already composing the face you will make when they arrive. Both versions are present simultaneously in the body.',
    choices: null,
    effect: (p) => { p.setMem('s54ab', true) },
  },

  {
    id: 'sonder_54_ac',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s54ac,
    text: 'The first time you were genuinely glad to be going home. Not as a child going home to parents — that is a different thing. Going home to your own home: your own flat, your own things, your own bed in the specific position you have arranged it. The gladness is specific: this is where you sleep, this is where you keep your things, this is the particular radius in which you are most yourself. You have made a place. You are going back to it.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s54ac', true) },
  },

  {
    id: 'sonder_54_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s54ad,
    text: 'What you notice you no longer notice. The train that goes past at 6am — you stopped hearing it years ago. The neighbour\'s music on Friday evenings. The particular quality of the air on certain streets. The city has been training you to ignore it, and you have been a good student. The things you no longer notice are no longer in your life in the way they once were. This is adaptation. It is also a form of loss that happens without ceremony.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s54ad', true) },
  },

]
