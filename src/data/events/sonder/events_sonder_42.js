// events_sonder_42.js
// Contemplative layer — 30 mem-gated glimpses.

export const EVENTS_SONDER_42 = [

  {
    id: 'sonder_42_a',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s42a,
    text: 'The word in your language for the particular quality of light in the late afternoon of autumn. Other languages have words for other things you have no word for. You have lived inside this light and this word your whole life without noticing that not everyone has it.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s42a', true) },
  },

  {
    id: 'sonder_42_b',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s42b,
    text: 'The specific weight of a sleeping child. You are carrying them to bed and they are completely surrendered to sleep and the weight is different from the weight of the same child awake — heavier, softer, a kind of complete trust. If you have carried a sleeping child you know this weight. If you have not, you do not.',
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('s42b', true) },
  },

  {
    id: 'sonder_42_c',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.s42c,
    text: 'A city you have never been to. You have a clear picture of it — from a film, a book, a description someone gave you. You go. The picture was almost entirely wrong in the details and entirely right in the feeling. You have been carrying a version of this city for years that was made entirely of imagination.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s42c', true) },
  },

  {
    id: 'sonder_42_d',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s42d,
    text: 'The newspaper you have been reading since your twenties has changed. Not all at once — over years. The tone, the assumptions it makes about who is reading it, what it considers worth reporting. You are not sure whether it changed or you did. Both is probably right. The relationship with a newspaper is longer than most relationships.',
    choices: null,
    effect: (p) => { p.setMem('s42d', true) },
  },

  {
    id: 'sonder_42_e',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 6 && G.age <= 13 && !G.mem?.s42e,
    text: 'The gap between the adult\'s version of an event and what you witnessed of it. They tell the story one way. You remember it differently. You are young enough that the adult version wins, becomes the official account, and your version recedes. For years afterward you are not sure what you actually saw.',
    choices: null,
    effect: (p) => { p.setMem('s42e', true) },
  },

  {
    id: 'sonder_42_f',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s42f,
    text: 'The specific time a friendship shifted from something maintained out of history into something you actually want. The friendship was there before; you showed up for the occasions; then at some point the showing up became something you would choose even without the history. You know roughly when it happened. You do not mention it because there is no occasion to mention it.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s42f', true) },
  },

  {
    id: 'sonder_42_g',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s42g,
    text: 'The meal that cost more than you can afford. You are in a restaurant and you ordered wrong and you are sitting with the number, calculating, and what you feel is not quite regret and not quite pleasure: something between the two, the feeling of having spent what you should not, and having eaten well.',
    choices: null,
    effect: (p) => { p.setMem('s42g', true) },
  },

  {
    id: 'sonder_42_h',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s42h,
    text: 'The era your grandchildren will not be able to imagine. Not technology — the texture of a day before certain things existed. The quiet. The slower correspondence. The not-knowing where someone was if they did not tell you. You lived in that world for decades. It is as gone as gaslight.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s42h', true) },
  },

  {
    id: 'sonder_42_i',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s42i,
    text: 'Your handshake. You have been told, at some point, that it communicates something. The grip, the duration, the eye contact. You have thought about this more than a handshake should require. A handshake is not supposed to require thought. It is one of the things that exposes how much of social behaviour is performance even when it is sincere.',
    choices: null,
    effect: (p) => { p.setMem('s42i', true) },
  },

  {
    id: 'sonder_42_j',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.s42j,
    text: 'The project you worked on for months that was cancelled a week before it was due. Not your fault. The work exists nowhere. You carry the knowledge from it — what you learned, what you figured out — but the object does not exist. The labour vanished into a decision made above you. This happens more than once. You learn to hold the work loosely.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s42j', true) },
  },

  {
    id: 'sonder_42_k',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s42k,
    text: 'You see a couple arguing quietly in a restaurant. You cannot hear the words. The body language is legible: the angle of the shoulder, the eye that won\'t hold the other\'s eye. You have been inside that conversation. You recognise it from the outside with the same precision.',
    choices: null,
    effect: (p) => { p.setMem('s42k', true) },
  },

  {
    id: 'sonder_42_l',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s42l,
    text: 'The house you grew up in exists somewhere. Someone else lives in it. The rooms have been repainted. The garden, if there was one, is the garden someone else planted. The address still works: if you mailed a letter to it, it would arrive. The building exists and nothing about it is yours anymore.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s42l', true) },
  },

  {
    id: 'sonder_42_m',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s42m,
    text: 'The specific pleasure of doing one thing well for a long time. You have been doing this thing — any thing, it doesn\'t matter what — for fifteen years. The pleasure is not in the novelty; it is in the grain of experience that accumulates: the small variations you can now perceive that a beginner cannot, the patterns that took a decade to become visible.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s42m', true) },
  },

  {
    id: 'sonder_42_n',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 13 && G.age <= 19 && !G.mem?.s42n,
    text: 'The first time you are alone in a house for a whole night. Your parents are away. The house has a different character when it is only yours: its sounds are louder, its spaces are larger, the darkness at the end of the corridor is specifically yours to walk into or not. You stay up too late. You do something you would not do if they were here. It is very minor. It is also the beginning of something.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s42n', true) },
  },

  {
    id: 'sonder_42_o',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s42o,
    text: 'The photo from a party you barely remember. You are in it, clearly happy, with people whose names you have to work to recall. The happiness in the photograph is real — you can see it. The event has not survived as memory. The evidence of your having been happy at it is in the photograph and nowhere else.',
    choices: null,
    effect: (p) => { p.setMem('s42o', true) },
  },

  {
    id: 'sonder_42_p',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 19 && !G.mem?.s42p,
    text: 'Someone explains something you already know in great detail. You let them finish. This is kindness or efficiency — you have not yet decided which — and it costs you nothing. Afterward they say "I hope that wasn\'t too much." You say it was helpful. Both things are true and one is more true than the other.',
    choices: null,
    effect: (p) => { p.s += 2; p.setMem('s42p', true) },
  },

  {
    id: 'sonder_42_q',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s42q,
    text: 'The body carrying knowledge the mind has not yet processed. A smell, a texture, a chord — and before you know why, something is happening in your chest. The mind catches up a second later and names the connection. The body arrived first. This has been true your whole life. You notice it more now.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s42q', true) },
  },

  {
    id: 'sonder_42_r',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s42r,
    text: 'The colleague who left the job three years ago. You have not kept in touch. You thought you would. In the moment of leaving the contact information was exchanged, the intention was genuine. The intention did not convert into the action. You see their name occasionally in a professional context. Something is resolved and something is incomplete.',
    choices: null,
    effect: (p) => { p.setMem('s42r', true) },
  },

  {
    id: 'sonder_42_s',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 14 && !G.mem?.s42s,
    text: 'The game that required everyone\'s belief to work. If one person stopped believing, stopped following the rules you all invented, the game ended — not because it was a bad game, but because all games require collective agreement to be real. You understood this before you had words for it.',
    choices: null,
    effect: (p) => { p.s += 2; p.setMem('s42s', true) },
  },

  {
    id: 'sonder_42_t',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s42t,
    text: 'The street you have walked down so many times that you walk it without seeing it. Then one day something is different — a shop has closed, a new one opened, a building is being torn down — and the street appears again, fully visible, a thing that has been changing while you were not watching.',
    choices: null,
    effect: (p) => { p.setMem('s42t', true) },
  },

  {
    id: 'sonder_42_u',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 21 && !G.mem?.s42u,
    text: 'You finish the conversation and leave and in the street you think of exactly the right thing you should have said. The clarity is complete and arrives too late. You could go back. You do not go back. The right thing is now the private right thing: the version of the conversation that exists only in you.',
    choices: null,
    effect: (p) => { p.setMem('s42u', true) },
  },

  {
    id: 'sonder_42_v',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 45 && !G.mem?.s42v,
    text: 'The moment when a child you know well stops needing your help with something they used to need help with. No ceremony. You just notice it is not happening anymore: they are doing it themselves. The transition was gradual and is only visible in retrospect. You are glad. Something small has ended.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s42v', true) },
  },

  {
    id: 'sonder_42_w',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s42w,
    text: 'The names on the memorial. You pass it often — a war memorial, a disaster marker, a plaque — and usually look past it. You stop one day and read the names. They are listed in columns. One column has names that were local, that were from the streets around the memorial. The names are ordinary names — the names of people who had ordinary names.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s42w', true) },
  },

  {
    id: 'sonder_42_x',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s42x,
    text: 'The letter you wrote but did not send. Or the email. Or the message you drafted and closed without sending. These accumulate: the not-sent communications form their own archive. Sometimes you send them later. Usually you don\'t. The recipient never knows about the draft.',
    choices: null,
    effect: (p) => { p.setMem('s42x', true) },
  },

  {
    id: 'sonder_42_y',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s42y,
    text: 'The thing you have been meaning to do for five years. Not a major thing: a small one, specific, something that would take an afternoon. It sits in the list. The list is mostly complete. This item persists. You have begun to suspect that the persistence is itself information: that you do not want to do it as much as you want to have wanted to do it.',
    choices: null,
    effect: (p) => { p.setMem('s42y', true) },
  },

  {
    id: 'sonder_42_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s42z,
    text: 'The early morning of a city before the city wakes. The specific quality: the same streets you know from afternoon, emptied out, the light still low, the few people you see either very tired or very awake. The city before it starts is a different city from the city you live in the rest of the day.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s42z', true) },
  },

  {
    id: 'sonder_42_aa',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.s42aa,
    text: 'The interview you gave about something you did, years later. They ask about the decisions. You describe them with a coherence they did not have in the moment — the moment was more confused, more contingent, more driven by what you did not know. The coherent version is also true. It is the version that can be told. The moment remains only in you.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s42aa', true) },
  },

  {
    id: 'sonder_42_ab',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.s42ab,
    text: 'The rain that arrives while you are somewhere without shelter. You did not plan for it. You are immediately, completely wet. The inconvenience is real and total. Something small in the situation makes it funny rather than frustrating — the thoroughness of it, the simplicity. You arrive wherever you are going soaked through. Someone hands you something dry.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s42ab', true) },
  },

  {
    id: 'sonder_42_ac',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s42ac,
    text: 'Someone tells you a secret and asks you to keep it. You keep it for years — it was their secret, not yours. Later the thing the secret was about becomes publicly known, and the secret is retroactively unnecessary. The years you kept it do not disappear. You kept it. This is a form of loyalty that was never acknowledged and never needs to be.',
    choices: null,
    effect: (p) => { p.m += 3; p.karma += 2; p.setMem('s42ac', true) },
  },

  {
    id: 'sonder_42_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s42ad,
    text: 'The generation after yours does the thing you were told was impossible. They do it without knowing it was supposed to be impossible, which turns out to be relevant. You watch them and feel something that is pride without ownership. You did not make it possible. You also did not tell them it was impossible.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s42ad', true) },
  },

]
