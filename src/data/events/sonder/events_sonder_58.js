// events_sonder_58.js — contemplative layer, weight 2, all mem-gated

export const EVENTS_SONDER_58 = [

  {
    id: 'sonder_58_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 36 && G.age <= 52 && !G.mem?.s58a,
    text: 'The waiting room. You have been in so many waiting rooms — the doctor, the solicitor, the headmaster, the DMV, the embassy — that you can reconstruct the texture of each one. The particular quality of the chair. The specific arrangement of the magazines. Waiting rooms are the same everywhere and entirely different depending on what you are waiting to hear.',
    choices: null,
    effect: (p) => { p.setMem('s58a', true) },
  },

  {
    id: 'sonder_58_b',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s58b,
    text: 'A phrase has entered your speech without permission — something you say now that you did not say before. You notice it only after you have already said it several hundred times. By the time you notice it, it is already yours. You think about where it came from: a colleague, a parent, a book you half-remember. The investigation is inconclusive.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s58b', true) },
  },

  {
    id: 'sonder_58_c',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s58c,
    text: 'You have lived in this city long enough that you navigate it by the invisible map of what things used to be — the chemist that is now a coffee shop, the alley that no longer exists, the building whose previous tenant you knew better than the current one. The invisible city and the visible city overlap perfectly. To newcomers the place looks one way. To you it looks like two places superimposed.',
    choices: null,
    effect: (p) => { p.setMem('s58c', true) },
  },

  {
    id: 'sonder_58_d',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.s58d,
    text: 'The dream of the house: not a house you have lived in, not quite any house that exists. The rooms configure differently each time but the feeling is consistent — something between recognition and longing. You have had the dream for thirty years. You have stopped trying to locate it. It belongs to the sleep geography that has nothing to do with the waking geography.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s58d', true) },
  },

  {
    id: 'sonder_58_e',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 30 && !G.mem?.s58e,
    text: 'The first time you did something that requires real skill without thinking about it — parallel parking, the difficult conversation, reading a room — you registered the absence of effort as a form of arrival. Something had moved from the part of you that tries to the part of you that simply does. You did not notice where it went. You only noticed it was gone.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s58e', true) },
  },

  {
    id: 'sonder_58_f',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 55 && !G.mem?.s58f,
    text: 'A meal that reconstructs something: the smell of a specific dish your grandmother made, or the taste of something you ate once in another city during a particular year when you were a particular version of yourself. The reconstruction is not complete. It is enough to make you feel that the version of yourself who ate it first still exists somewhere, having that first meal.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s58f', true) },
  },

  {
    id: 'sonder_58_g',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s58g,
    text: 'You find your handwriting from thirty years ago. It is yours — unmistakably yours in the letter shapes — and also slightly not yours, the pressure different, the slope different, the confidence of a person who had not yet learned the things that would change the slope. You read what it says. You do not remember writing it. Both things are true.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s58g', true) },
  },

  {
    id: 'sonder_58_h',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 34 && G.age <= 50 && !G.mem?.s58h,
    text: 'The moment the other person fell silent in the conversation: you know what you said that produced the silence. You did not intend the silence. You intended the sentence. The silence arrived anyway, and you sat in it together, and then one of you spoke and the conversation moved to a different place, and neither of you referred to the silence directly. The silence is still there somewhere in the room of that conversation.',
    choices: null,
    effect: (p) => { p.setMem('s58h', true) },
  },

  {
    id: 'sonder_58_i',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s58i,
    text: 'An object that survived everything: the move, the divorce, the fire, the flood, the years of storage, the children who wanted to throw it out. The object is unremarkable. It has no financial value. It has the value of things that persist through everything you have put them through. You cannot remember acquiring it. It is simply there, the way certain things simply are.',
    choices: null,
    effect: (p) => { p.setMem('s58i', true) },
  },

  {
    id: 'sonder_58_j',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 24 && G.age <= 32 && !G.mem?.s58j,
    text: 'The shortcut that became the route. You took it once because you were running late and it was faster. You took it again because you remembered it was faster. Now it is the route — the default, the thing you do without deciding. You have changed your own geography through the simple accumulation of one decision made slightly differently.',
    choices: null,
    effect: (p) => { p.setMem('s58j', true) },
  },

  {
    id: 'sonder_58_k',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && !G.mem?.s58k,
    text: 'There is a year that is difficult to talk about. You know the year by feel rather than by number. When the conversation approaches it you can feel the approach before the date arrives. You have developed manoeuvres for those conversations — ways of answering that are true but that do not go there. The year is not a secret. It is a place you visit alone.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s58k', true) },
  },

  {
    id: 'sonder_58_l',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 50 && !G.mem?.s58l,
    text: 'The friend whose number you still have but have not called in four years. You each know the other\'s number. You each know this is the situation. Neither of you has called. This is not a failure in the way a failure feels. It is more like a door that is still there — slightly stuck, still openable, not yet closed.',
    choices: null,
    effect: (p) => { p.setMem('s58l', true) },
  },

  {
    id: 'sonder_58_m',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s58m,
    text: 'The tiredness of your sixties is different from the tiredness of your thirties. The tiredness of your thirties came from doing too much. The tiredness now comes from something underneath doing — a tiredness that sleep does not fully address. You do not always mention this. When you do, people younger than you look at you in a way that tells you the tiredness is foreign to them. Good, you think.',
    choices: null,
    effect: (p) => { p.h -= 2; p.setMem('s58m', true) },
  },

  {
    id: 'sonder_58_n',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 36 && G.age <= 52 && G.children?.length >= 1 && !G.mem?.s58n,
    text: 'The question the child asks that you cannot answer — not because you do not know the answer but because the answer is the kind of thing that requires more life to understand. You give the reduced answer, the one that fits the age. You carry the full answer with you. You think: in ten years I will tell them the rest. You may not be asked again in ten years. The rest stays inside you.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s58n', true) },
  },

  {
    id: 'sonder_58_o',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 54 && !G.mem?.s58o,
    text: 'The appointment you have been moving forward for two years: the dentist, the dermatologist, the financial advisor, the difficult conversation. You move it because you are busy and then because the original urgency has faded and then because moving it has become its own habit. One day you will stop moving it. You know this. The appointment waits on the calendar like something you have agreed to feel guilty about.',
    choices: null,
    effect: (p) => { p.setMem('s58o', true) },
  },

  {
    id: 'sonder_58_p',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s58p,
    text: 'The coat that lasted twenty years. You do not know exactly when you bought it. You cannot remember the shop or the reason. The coat has been with you across four apartments, two cities, the loss of three people you loved, one period when you were happy in a way that was uninterrupted. The coat is a coat. The coat is also a companion in the way that objects become companions by simply staying.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s58p', true) },
  },

  {
    id: 'sonder_58_q',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 28 && !G.mem?.s58q,
    text: 'The name that is not your name: the version of your name that the new country uses, or the nickname that became the name before you could intervene, or the professional name that is yours and also a performance of yourself. You answer to it without effort. There is still a moment sometimes — very brief — when you hear the name in a public place and do not immediately know they are speaking to you.',
    choices: null,
    effect: (p) => { p.setMem('s58q', true) },
  },

  {
    id: 'sonder_58_r',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 13 && !G.mem?.s58r,
    text: 'The summer that stood still: the weeks between school terms when the days were long enough to lose track of time in a way that became impossible later. You were not doing nothing — you were doing the slow accumulation of the afternoon, the repetition of play, the hour that did not ask to become the next hour. You did not know the summer was ending until it had already ended.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s58r', true) },
  },

  {
    id: 'sonder_58_s',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 55 && !G.mem?.s58s,
    text: 'The meeting where nothing was decided — technically, formally, nothing was decided — but something was decided anyway in the texture of who spoke and who didn\'t, who deferred and who didn\'t, who used certain words that signalled something to people who knew what the words meant. The meeting ended. The decision had already been made. You recognised the shape of it as you were leaving.',
    choices: null,
    effect: (p) => { p.setMem('s58s', true) },
  },

  {
    id: 'sonder_58_t',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 36 && G.age <= 50 && !G.mem?.s58t,
    text: 'The book you have been meaning to finish for seven years. You know what happens — you have looked at the last chapter. What you cannot do is read from where you stopped in chapter eight, because chapter eight requires a state of mind that existed in the year you put it down, and the state of mind and the year are both gone. The book is still on the shelf. You mean to go back to it. This means something about you that you would rather not examine.',
    choices: null,
    effect: (p) => { p.setMem('s58t', true) },
  },

  {
    id: 'sonder_58_u',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s58u,
    text: 'The other person in the photograph: you are looking at a picture taken thirty years ago and you remember the occasion, the room, the reason for the photograph. You do not remember the other person. Their face is familiar in the way that faces are familiar when you have encountered them many times in the place they belonged and then never again. You cannot locate them in any other context. They were there. That is all you know.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s58u', true) },
  },

  {
    id: 'sonder_58_v',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 44 && G.age <= 58 && !G.mem?.s58v,
    text: 'The task you completed but did not finish: the report that was submitted but the underlying question was never resolved, the conversation that ended but the thing between you both was not addressed, the project that closed but the problem it was meant to solve is still there. The completion and the finishing are two different things. You have learned to live with both, which means learning to live with the gap between them.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s58v', true) },
  },

  {
    id: 'sonder_58_w',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.s58w,
    text: 'The last time you felt young without knowing it. You were in the middle of it — the energy, the sense that time was available, the body that simply did what you asked without commentary — and you did not flag it as youth. You flagged it as now. Youth is what now becomes when enough of it has passed. You would go back for a day, not to change anything, just to be in the body that did not know what it was.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s58w', true) },
  },

  {
    id: 'sonder_58_x',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 13 && G.age <= 17 && !G.mem?.s58x,
    text: 'The neighbour\'s light on at three in the morning. You are awake for your own reasons and you can see the window across the way where a light is on. You know nothing about why it is on. The light produces a feeling of being less alone in the wakefulness, even though the person behind it does not know you are there, and you are strangers, and the night is shared without being shared.',
    choices: null,
    effect: (p) => { p.setMem('s58x', true) },
  },

  {
    id: 'sonder_58_y',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 30 && !G.mem?.s58y,
    text: 'The smell of the house when you return: each house has one and you only detect it when you have been away long enough. The smell is yours — it is made of what you eat and how you heat the place and some quality of the building itself — but you cannot smell it from inside. You smell it at the door, briefly, and then you are inside it again and it is gone. The smell of your own life is one of the things you cannot have except in brief re-entry.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s58y', true) },
  },

  {
    id: 'sonder_58_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 54 && !G.mem?.s58z,
    text: 'The piece of news that turned out to be wrong: you told several people. You adjusted your understanding of the world around it. When the correction came you noticed the correction but the adjustment to your understanding did not fully reverse. Some part of you still holds the incorrect version as a possible version. The incorrect version is still taking up space that the correct one was supposed to occupy.',
    choices: null,
    effect: (p) => { p.setMem('s58z', true) },
  },

  {
    id: 'sonder_58_aa',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s58aa,
    text: 'A phrase that you carry from someone who is gone: one of their sentences that has become something you say, or a word they used for a thing that you have never found a better word for, or an opinion that was theirs first and that you have absorbed so completely you have stopped knowing it was theirs. They are in the language you speak. You would not have chosen this as the form of inheritance but it is the form that arrived.',
    choices: null,
    effect: (p) => { p.r += 3; p.m += 2; p.setMem('s58aa', true) },
  },

  {
    id: 'sonder_58_ab',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 12 && !G.mem?.s58ab,
    text: 'The afternoon that slowed down: not every afternoon, just a particular one where the light came in a certain way and you were in the middle of something — a game, a book, a nothing in particular — and time became wide and slow. You did not name this as happiness at the time. You had no word for it. The word arrived later, when you were trying to describe to someone else what happiness felt like when you were eight.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s58ab', true) },
  },

  {
    id: 'sonder_58_ac',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 56 && !G.mem?.s58ac,
    text: 'You drive past a street you know well and something is different — a building gone, a tree cut, a shop changed — and your brain registers it as wrong before you can identify what changed. The familiar has been altered. The alteration is entirely reasonable. The feeling of wrongness is not about the change but about the version of the place that existed in your head, which is now a version that no longer corresponds to the place itself.',
    choices: null,
    effect: (p) => { p.setMem('s58ac', true) },
  },

  {
    id: 'sonder_58_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.s58ad,
    text: 'The shape of the decision you did not make: not the dramatic refusal but the quieter one, the job not applied for, the place not moved to, the person not called. You can see the shape of the life that might have followed. The shape is clear. It is not the life you have, which is also clear. You are not sure which of them you would have preferred, which is the thing about the decision you did not make: you will never be sure, and you have made your peace with not being sure, mostly.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s58ad', true) },
  },

]
