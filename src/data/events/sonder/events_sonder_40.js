// events_sonder_40.js
// Contemplative layer — 30 mem-gated glimpses.

export const EVENTS_SONDER_40 = [

  {
    id: 'sonder_40_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s40a,
    text: 'You find a key in a drawer and cannot remember which door it opened. You have lived in enough places now that the inventory of former doors is longer than you expected. You keep the key.',
    choices: null,
    effect: (p) => { p.setMem('s40a', true) },
  },

  {
    id: 'sonder_40_b',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s40b,
    text: 'Someone says your name slightly wrong and you let it go. After the third or fourth time, you have decided that correcting them would cost more than the error. A small territory surrendered.',
    choices: null,
    effect: (p) => { p.setMem('s40b', true) },
  },

  {
    id: 'sonder_40_c',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s40c,
    text: 'The phone rings and you knew it would. A second before, without cause — just the knowledge, arriving from somewhere. You pick up. The thing happened that you somehow already knew had happened.',
    choices: null,
    effect: (p) => { p.setMem('s40c', true) },
  },

  {
    id: 'sonder_40_d',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s40d,
    text: 'The angle of light through a particular window at a particular hour. You are somewhere else now, somewhere entirely different, but the light comes in at the same angle and for a moment the room you left exists again with complete precision.',
    choices: null,
    effect: (p) => { p.setMem('s40d', true) },
  },

  {
    id: 'sonder_40_e',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.s40e,
    text: 'You decide not to finish the book. This is rarer than it sounds — the habit of finishing has its own momentum. But you put it down on page 180 and do not pick it up again. The partial story settles into permanent incompleteness. It is not unpleasant.',
    choices: null,
    effect: (p) => { p.setMem('s40e', true) },
  },

  {
    id: 'sonder_40_f',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s40f,
    text: 'You notice you have stopped doing something you used to do. Not stopped it deliberately — it simply ceased, sometime in the last few years, without announcement. You cannot identify the last time. The last time has already happened.',
    choices: null,
    effect: (p) => { p.setMem('s40f', true) },
  },

  {
    id: 'sonder_40_g',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && !G.mem?.s40g,
    text: 'Someone else points out that you say the same phrase three times a day. You had not noticed. Now you notice every time, and it is slightly altered — the thing observed is not quite the same thing anymore. You wonder what else you do without noticing.',
    choices: null,
    effect: (p) => { p.setMem('s40g', true) },
  },

  {
    id: 'sonder_40_h',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 50 && !G.mem?.s40h,
    text: 'The sound of that street at seven in the morning — the particular sound, not a general morning sound but the specific sound of that neighbourhood in that city at that hour. You are far from it now. The sound is still there, unchanged, in whatever part of you stores such things.',
    choices: null,
    effect: (p) => { p.setMem('s40h', true) },
  },

  {
    id: 'sonder_40_i',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.s40i,
    text: 'Someone gives you confident wrong directions. You follow them for a while out of some social contract and then have to retrace your steps. The time taken is not significant. The feeling of having trusted when you should have checked stays longer.',
    choices: null,
    effect: (p) => { p.setMem('s40i', true) },
  },

  {
    id: 'sonder_40_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s40j,
    text: 'Waiting for test results. Not even bad results — you do not know yet whether they are bad. The waiting has its own quality: everything possible is still possible, all the branching futures still open. You understand for the first time what it would mean to close them.',
    choices: null,
    effect: (p) => { p.setMem('s40j', true) },
  },

  {
    id: 'sonder_40_k',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s40k,
    text: 'You find the village your grandparents came from on a map. It is small enough to be off most maps — you have to look for it specifically. You trace the road from there to where you ended up and the road is long and full of things that happened.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s40k', true) },
  },

  {
    id: 'sonder_40_l',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s40l,
    text: 'A piece of music you associate with a particular period of your life. You cannot listen to it the way you once could — the music is still there but what it opens into is now too large, and you have things to do today. You save it for when you have time to let it do what it does.',
    choices: null,
    effect: (p) => { p.setMem('s40l', true) },
  },

  {
    id: 'sonder_40_m',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s40m,
    text: 'You try to make the meal your mother made. You have the ingredients, you have watched it made, you know the approximate steps. What you make is recognizably the same dish. It does not taste the same. The variable is not recipe.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s40m', true) },
  },

  {
    id: 'sonder_40_n',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s40n,
    text: 'The first time you pay someone significantly older than you to fix something. The reversal takes a moment to process. They know something you do not know and you are paying for it. You watch them work with the mild embarrassment of having known so little for so long.',
    choices: null,
    effect: (p) => { p.setMem('s40n', true) },
  },

  {
    id: 'sonder_40_o',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s40o,
    text: 'Someone else\'s worry becomes your worry. They mention it once, as a passing thing — a health scare, a money problem, something at work — and it settles into you and keeps appearing. The concern is not yours but it lives in you with the same insistence.',
    choices: null,
    effect: (p) => { p.setMem('s40o', true) },
  },

  {
    id: 'sonder_40_p',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s40p,
    text: 'You remember the price of things from years ago with the same precision you remember faces. The bus fare. The cost of the flat share. The amount your first proper job paid per month. The numbers are exact. They do not mean what they meant.',
    choices: null,
    effect: (p) => { p.setMem('s40p', true) },
  },

  {
    id: 'sonder_40_q',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.s40q,
    text: 'You are at a wedding and it is obvious from the way they talk to each other that it will not last. You say nothing. Nobody says anything. The day proceeds in its full expensive beauty and everyone smiles in the photographs.',
    choices: null,
    effect: (p) => { p.setMem('s40q', true) },
  },

  {
    id: 'sonder_40_r',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s40r,
    text: 'A child asks you a question so precisely aimed that you have to sit down with it. Not "why is the sky blue" — something harder than that. Something about why people leave or why some people have more than others. You try to answer it seriously. You are still not sure you succeeded.',
    choices: null,
    effect: (p) => { p.setMem('s40r', true) },
  },

  {
    id: 'sonder_40_s',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 50 && !G.mem?.s40s,
    text: 'Three in the morning. The specific quality of the wakefulness is different from any other hour — the mind that will not close, the house around you with its night sounds, the knowledge that you are the only one awake and that this is temporary. You have had this wakefulness before.',
    choices: null,
    effect: (p) => { p.setMem('s40s', true) },
  },

  {
    id: 'sonder_40_t',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.s40t,
    text: 'A film that says something you could not say. You watch it in a particular state — a particular age, a particular place in your life — and the film meets you there and gives you the word for what you had been carrying wordlessly. The word helps. The film does not tell you what to do with it.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s40t', true) },
  },

  {
    id: 'sonder_40_u',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.s40u,
    text: 'The mirror in an unfamiliar hotel. You have been travelling and the mirror shows you at a slightly different angle than your own mirror does. You look at the version for a moment — the same and not the same — then let it go.',
    choices: null,
    effect: (p) => { p.setMem('s40u', true) },
  },

  {
    id: 'sonder_40_v',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s40v,
    text: 'You discover you have been mispronouncing something for twenty years. Not a rare word — something you have said in meetings, in introductions, with confidence. You correct it quietly and hope no one has been too polite to say.',
    choices: null,
    effect: (p) => { p.setMem('s40v', true) },
  },

  {
    id: 'sonder_40_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s40w,
    text: 'You go back to the school. The corridor is the same. The smell is the same — floor polish and something institutional underneath. The scale of it has changed. The lockers that once seemed enormous are chest height. You do not belong here anymore and neither does the child you were.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s40w', true) },
  },

  {
    id: 'sonder_40_x',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && !G.mem?.s40x,
    text: 'In the house there are two languages. Your parents switch between them mid-sentence and you have learned to follow — you speak both but you dream in one and count in the other and you do not know why the two languages have different territories inside you.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s40x', true) },
  },

  {
    id: 'sonder_40_y',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s40y,
    text: 'Making tea for someone — the specific small ceremony of it. You have done this enough times that the motions are body memory. You carry the cup carefully. The care is out of proportion to what it is, which is just tea, which is exactly what it is.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s40y', true) },
  },

  {
    id: 'sonder_40_z',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s40z,
    text: 'The work you did that no one noticed. Not a single event — an accumulated pattern: the extra hour, the problem solved before it became visible, the quality held up quietly for years. Someone else received credit. The work was still done. You are not sure what to make of this.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s40z', true) },
  },

  {
    id: 'sonder_40_aa',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s40aa,
    text: 'The bus that goes through the old neighbourhood. You don\'t need to take it — there is a faster route — but occasionally you do. The stops are the same. The faces at each stop have been replaced. The replacement has been happening for longer than the faces you remember were there.',
    choices: null,
    effect: (p) => { p.setMem('s40aa', true) },
  },

  {
    id: 'sonder_40_ab',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s40ab,
    text: 'Someone says "I thought of you when I saw this." They show you a small thing — a news story, an object, a photograph. The thing is right: they know what to connect you to. Being known precisely is rarer than it sounds.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s40ab', true) },
  },

  {
    id: 'sonder_40_ac',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s40ac,
    text: 'A heavy bag and then an empty one. You have carried things a long time — obligations, histories, the things you took on that weren\'t asked of you. The bags get lighter. You are not sure whether that is relief or loss.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s40ac', true) },
  },

  {
    id: 'sonder_40_ad',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s40ad,
    text: 'You are in a meeting or a gathering and there is a person in the room who is very old. They sit quietly. They have seen things that have ended. The room fills with talk and decisions and plans for next year and they sit in it with fifty years more of evidence about how things go. You wonder what they think of your certainties.',
    choices: null,
    effect: (p) => { p.setMem('s40ad', true) },
  },

]
