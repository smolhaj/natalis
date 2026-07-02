// events_sonder_57.js — contemplative layer, weight 2, all mem-gated

export const EVENTS_SONDER_57 = [

  {
    id: 'sonder_57_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s57a,
    text: 'You explain your work to someone at a party and watch the understanding arrive in their face — not the full understanding but the shape of it. You know the difference. You have been watching for it long enough to distinguish the polite version from the real one.',
    choices: null,
    effect: (p) => { p.setMem('s57a', true) },
  },

  {
    id: 'sonder_57_b',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s57b,
    text: 'The doctor who is younger than your oldest child. You register this in the appointment without saying anything about it. You answer the questions about your habits. The doctor nods in a way that is both professional and very young.',
    choices: null,
    effect: (p) => { p.setMem('s57b', true) },
  },

  {
    id: 'sonder_57_c',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 30 && !G.mem?.s57c,
    text: 'The place you live is not yet fully yours — you have not accumulated enough to fill it, and the walls still show the previous tenant in certain ways. You are used to this. You think you will always be used to this. You will not always be used to this.',
    choices: null,
    effect: (p) => { p.setMem('s57c', true) },
  },

  {
    id: 'sonder_57_d',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 9 && G.age <= 13 && !G.mem?.s57d,
    text: 'The adult conversation in the next room: the voices whose words you cannot quite make out. You know the tone — the one that means something is being decided about your life without you in the room. You lie in bed and try to hear through the wall.',
    choices: null,
    effect: (p) => { p.setMem('s57d', true) },
  },

  {
    id: 'sonder_57_e',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && G.age <= 55 && !G.mem?.s57e,
    text: 'You have reached the age where you know what you are good at and what you are not, and the second list has stopped being an embarrassment. You can name both lists without much feeling attached to either. This is either wisdom or resignation. You have decided it does not matter which.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s57e', true) },
  },

  {
    id: 'sonder_57_f',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 25 && G.age <= 33 && !G.mem?.s57f,
    text: 'A version of yourself that might have been: the other degree, the other city, the person you did not pursue. The version appears in certain moods and then leaves. You do not live in that version. You live in this one, which has its own texture that the other version would have lacked.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s57f', true) },
  },

  {
    id: 'sonder_57_g',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.s57g,
    text: 'The old neighbourhood, seen from a car window. It has changed and you are relieved that it has changed and also slightly aggrieved that it has changed without your permission. Both reactions are unreasonable. You have them anyway.',
    choices: null,
    effect: (p) => { p.setMem('s57g', true) },
  },

  {
    id: 'sonder_57_h',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 52 && !G.mem?.s57h,
    text: 'The meeting that was resolved, eventually, by everyone in the room getting tired of the disagreement at the same time. The resolution was not principled. It was fatigue. The outcome was the same as if it had been principled, which is the thing you cannot tell the meeting about.',
    choices: null,
    effect: (p) => { p.setMem('s57h', true) },
  },

  {
    id: 'sonder_57_i',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 14 && G.age <= 17 && !G.mem?.s57i,
    text: 'The particular geography of the school corridor — who stands where, the unwritten topology of the social arrangement that everyone knows and no one discusses. You navigate it every day. You wonder if this is what adulthood is like. It is not what adulthood is like. It is also not entirely unlike it.',
    choices: null,
    effect: (p) => { p.setMem('s57i', true) },
  },

  {
    id: 'sonder_57_j',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.s57j,
    text: 'You have begun, without deciding to, to say goodbye to places. The park you will not go back to. The restaurant that is about to close. The street where the building came down. The goodbyes are quiet and unannounced. Only you know they are goodbyes.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s57j', true) },
  },

  {
    id: 'sonder_57_k',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 44 && !G.mem?.s57k,
    text: 'The sentence you have been about to say for three years. It is in your head in the form of a sentence. You know who you would say it to and what the occasion for saying it would be. The occasion has not quite arrived and the sentence waits.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s57k', true) },
  },

  {
    id: 'sonder_57_l',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 21 && G.age <= 29 && !G.mem?.s57l,
    text: 'The friendship that is mostly kept alive by the shared history — the version of you both that exists in each other\'s memory from ten years ago. You are both different people now. The friendship is partly between the old people and partly between the new ones. Both pairs are present when you meet.',
    choices: null,
    effect: (p) => { p.setMem('s57l', true) },
  },

  {
    id: 'sonder_57_m',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 11 && !G.mem?.s57m,
    text: 'The gift that was wrong — wrong size, wrong colour, meant for someone else, bought out of obligation. You learn to say thank you for the wrong gift. The learning is useful and also a small form of corruption.',
    choices: null,
    effect: (p) => { p.setMem('s57m', true) },
  },

  {
    id: 'sonder_57_n',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 46 && G.age <= 58 && !G.mem?.s57n,
    text: 'You hear your voice on a recording and do not recognise it for a second. The voice that you think of as your voice is not the voice that leaves your body and arrives in the ears of other people. This gap has been there your whole life. You are only sometimes aware of it.',
    choices: null,
    effect: (p) => { p.setMem('s57n', true) },
  },

  {
    id: 'sonder_57_o',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 26 && G.age <= 35 && !G.mem?.s57o,
    text: 'The skill you taught yourself in your twenties — from a book, from someone at work, from watching and trying repeatedly — is now the thing people ask you about. The teaching yourself was invisible. The being asked is the visible version of the same investment.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s57o', true) },
  },

  {
    id: 'sonder_57_p',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 70 && !G.mem?.s57p,
    text: 'The accumulation of the news over a lifetime — the disasters and elections and assassinations and recessions — has produced in you a particular quality of perspective that the young people around you do not yet have. You are not sure it is wisdom. It is at least scale.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s57p', true) },
  },

  {
    id: 'sonder_57_q',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 36 && G.age <= 48 && !G.mem?.s57q,
    text: 'The morning when you are running late and every light is red and the bus is pulling away as you arrive and you stand on the pavement in the cold and understand that you are going to be late and that being late is the worst thing that will happen today and that today is a good day by any accounting.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s57q', true) },
  },

  {
    id: 'sonder_57_r',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 15 && G.age <= 17 && !G.mem?.s57r,
    text: 'The song that represents this period so completely that hearing it in thirty years will reconstruct not just the memory but the specific quality of being alive at sixteen — the particular texture of that afternoon in particular, which was neither good nor bad but simply is, preserved in the song.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s57r', true) },
  },

  {
    id: 'sonder_57_s',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 45 && !G.mem?.s57s,
    text: 'Someone borrows something of yours and does not return it and eventually you stop expecting it back. The object is not valuable. What the not-returning cost is something smaller and more durable than what the object was worth.',
    choices: null,
    effect: (p) => { p.setMem('s57s', true) },
  },

  {
    id: 'sonder_57_t',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s57t,
    text: 'The face in the mirror that you have stopped comparing to older photographs. The comparison used to produce something — not grief exactly, but an awareness that the comparison was being made. Now the face is simply the face. The looking stops measuring.',
    choices: null,
    effect: (p) => { p.m += 2; p.r -= 2; p.setMem('s57t', true) },
  },

  {
    id: 'sonder_57_u',
    weight: 2,
    phase: 'young_adult',
    when: (G) => G.age >= 19 && G.age <= 26 && !G.mem?.s57u,
    text: 'The first time you sit in a meeting and have more than one idea and do not say either of them. You are learning something. Whether it is the right thing to learn is a question you will be answering for the rest of your working life.',
    choices: null,
    effect: (p) => { p.setMem('s57u', true) },
  },

  {
    id: 'sonder_57_v',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 52 && !G.mem?.s57v,
    text: 'The city you grew up in and left is now the city people your age are moving to because it is cheaper than the city you moved to. The geography of affordable has shifted around you in ways that make the decisions of your twenties look both arbitrary and inevitable.',
    choices: null,
    effect: (p) => { p.setMem('s57v', true) },
  },

  {
    id: 'sonder_57_w',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 12 && !G.mem?.s57w,
    text: 'The game that only works with exactly four players and you can only find three. You try with three. It does not work with three. The game waits for the fourth player, who may or may not appear before summer is over.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s57w', true) },
  },

  {
    id: 'sonder_57_x',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 63 && !G.mem?.s57x,
    text: 'The chair you bought thirty years ago is still in the house. Everything else has been replaced or lost. The chair is still here, unremarkable, permanent in the way that objects become permanent by simply persisting through all the seasons you could have thrown them out.',
    choices: null,
    effect: (p) => { p.setMem('s57x', true) },
  },

  {
    id: 'sonder_57_y',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 50 && !G.mem?.s57y,
    text: 'You have been working on something for three years and it is not finished and may not be finished and you are no longer sure whether the not-finishing is a failure or the correct relationship to have with something that may not be the kind of thing that finishes.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s57y', true) },
  },

  {
    id: 'sonder_57_z',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 32 && !G.mem?.s57z,
    text: 'The choice that felt large at twenty-four — the job, the city, the relationship — looks different at twenty-nine. Not smaller. Just more in context. You can see the contingency around it now. The contingency was always there. You were too close to it to see the frame.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s57z', true) },
  },

  {
    id: 'sonder_57_aa',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 72 && !G.mem?.s57aa,
    text: 'The way the light falls on the same wall at the same time of year. You notice it every year now. You noticed it before but not with this attention. The attention is the thing that changed. The light has always been the same.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s57aa', true) },
  },

  {
    id: 'sonder_57_ab',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 48 && !G.mem?.s57ab,
    text: 'The compliment you gave years ago that you have forgotten entirely but that the person mentions to you now, unexpectedly, as the thing that changed how they thought about themselves. You do not remember the compliment. They have been carrying it for fifteen years.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s57ab', true) },
  },

  {
    id: 'sonder_57_ac',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 29 && !G.mem?.s57ac,
    text: 'The city reveals itself slowly — the neighbourhood you did not know about, the shortcut that takes twenty minutes off the commute, the place where the good bakery is. You have been here for two years. There is still city you have not learned. There will always be city you have not learned.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s57ac', true) },
  },

  {
    id: 'sonder_57_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 75 && !G.mem?.s57ad,
    text: 'You are helping someone with something you have done many times — the form, the procedure, the thing that seems complicated until you have done it often enough. You do not remember when it stopped being complicated for you. It just did, somewhere in the accumulation of the doing.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s57ad', true) },
  },

]
