// Sonder module 61 — 30 contemplative events
// Weight 2, null choices, all mem-gated. Universal human texture.

export const EVENTS_SONDER_61 = [

  {
    id: 'sonder_61_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s61a,
    text: 'The conversation you keep preparing for has not happened. The person you need to have it with keeps appearing in ordinary contexts — at the table, on the phone — and the ordinary context is not the right one, and then they are gone again.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s61a', true) },
  },

  {
    id: 'sonder_61_b',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s61b,
    text: 'The summer you lived in a city you did not know well was the summer you learned how to be somewhere alone. The skill transferred. You use it still.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s61b', true) },
  },

  {
    id: 'sonder_61_c',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s61c,
    text: 'There was a week when something was wrong in the house and the adults were not explaining it. You felt the wrongness in the air before you had words for what wrongness felt like. This is one of the first things you knew before you were told.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s61c', true) },
  },

  {
    id: 'sonder_61_d',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s61d,
    text: 'The voice on the recording is younger than you are now. It is your voice. The person speaking is confident about something you no longer feel confident about and tentative about something you have long since resolved. It is like getting a letter from a stranger who shares your memories.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s61d', true) },
  },

  {
    id: 'sonder_61_e',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s61e,
    text: 'The plant has been alive for eleven years. You nearly killed it twice. It is now taller than the shelf it started on. Some living things in your life have outlasted things that seemed more important than a plant.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s61e', true) },
  },

  {
    id: 'sonder_61_f',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s61f,
    text: 'The walk home after the bad news took forty minutes. You remember the street more precisely than you remember what was said. The tree with the yellow leaves at the corner. The smell of something frying in a window. The pavement.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s61f', true) },
  },

  {
    id: 'sonder_61_g',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s61g,
    text: 'You had a theory of yourself at that age — what kind of person you were, what you valued, what you would or would not do. The theory was wrong in specific ways you could not have identified then and can only partly identify now.',
    choices: null,
    effect: (p) => { p.setMem('s61g', true) },
  },

  {
    id: 'sonder_61_h',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s61h,
    text: 'The market stall has had the same owner since you first came here. You do not know her name. She does not know yours. You have exchanged money and goods and brief pleasantries for many years. This is a relationship with a specific weight that has no name.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s61h', true) },
  },

  {
    id: 'sonder_61_i',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s61i,
    text: 'The worry you carried for fifteen years resolved itself without your involvement. Something you could not fix fixed itself eventually. You are not certain what to do with the space it occupied.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s61i', true) },
  },

  {
    id: 'sonder_61_j',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s61j,
    text: 'The furniture arrangement that came with the room is the furniture arrangement you have kept for three years. You have never considered rearranging it. This is not because it is ideal. It is because the room became itself this way and you became yourself in it.',
    choices: null,
    effect: (p) => { p.setMem('s61j', true) },
  },

  {
    id: 'sonder_61_k',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s61k,
    text: 'Your children have a shorthand for things that includes none of the references you have. When they talk among themselves there is a whole second language you are not fluent in. This is how it is supposed to work.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s61k', true) },
  },

  {
    id: 'sonder_61_l',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s61l,
    text: 'You know people who got the thing they wanted and were changed by it in ways they did not expect. You know people who did not get it. The two groups are not distributed the way you would have predicted from the outside.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s61l', true) },
  },

  {
    id: 'sonder_61_m',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s61m,
    text: 'There was an adult you were certain understood everything. This certainty was important. You needed it. It was also, as you later found out, not quite accurate — but the certainty served its purpose at the time.',
    choices: null,
    effect: (p) => { p.setMem('s61m', true) },
  },

  {
    id: 'sonder_61_n',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s61n,
    text: 'The error that caused problems for six months was not caught because everyone assumed someone else had checked it. This is the structural version of an absence. No one was responsible. Everyone was responsible.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s61n', true) },
  },

  {
    id: 'sonder_61_o',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s61o,
    text: 'The night you made the decision to stay was not the night you thought the decision was being made. You thought you were just not leaving. The distinction between those two things took years to understand.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s61o', true) },
  },

  {
    id: 'sonder_61_p',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s61p,
    text: 'The task you have been delaying for a year took thirty minutes. You knew it would take thirty minutes. The knowledge did not move the delay.',
    choices: null,
    effect: (p) => { p.setMem('s61p', true) },
  },

  {
    id: 'sonder_61_q',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s61q,
    text: 'You have outlived people you expected to outlive you. This is not something you know how to account for. The arithmetic of lifespans is not meant to be witnessed directly.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s61q', true) },
  },

  {
    id: 'sonder_61_r',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s61r,
    text: 'The music that was playing during a particular month has made that month retrievable in ways that memory alone could not manage. You cannot hear the song without also being fifteen, in that room, in that particular difficulty.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s61r', true) },
  },

  {
    id: 'sonder_61_s',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s61s,
    text: 'The person who got you through a difficult period was not the person you would have chosen for that role. They were simply there, and capable of the specific thing required. This is how some of the most important things happen.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s61s', true) },
  },

  {
    id: 'sonder_61_t',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s61t,
    text: 'You were confident about a political opinion you now hold differently. The change was not sudden. It was gradual, one piece of evidence at a time, until one day you noticed you believed something you used to argue against.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s61t', true) },
  },

  {
    id: 'sonder_61_u',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s61u,
    text: 'The game had rules that evolved entirely between you and one other person. No adult knew the rules. They were yours, and the world they created was real in the way that only things invented between two people are real.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s61u', true) },
  },

  {
    id: 'sonder_61_v',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s61v,
    text: 'You have given advice you did not take yourself. The advice was correct. Both things are true simultaneously and are not contradictory, which took a while to understand.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s61v', true) },
  },

  {
    id: 'sonder_61_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s61w,
    text: 'The coat from fifteen years ago still fits. You do not know what to make of this. Some things change at a rate that surprises you. Some things do not change at all.',
    choices: null,
    effect: (p) => { p.setMem('s61w', true) },
  },

  {
    id: 'sonder_61_x',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s61x,
    text: 'The friendship that mattered most in that period was not the one you would have listed if asked. The one you would have listed faded. The one you did not mention is still there.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s61x', true) },
  },

  {
    id: 'sonder_61_y',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s61y,
    text: 'The question your child asked at dinner had no answer you were willing to give. Not because you did not know. Because you knew, and the knowing was not something you could hand across the table.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s61y', true) },
  },

  {
    id: 'sonder_61_z',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s61z,
    text: 'The decade you thought would define your life was replaced in significance by a quieter one that followed it. The loud decade has the better stories. The quiet one is what actually changed you.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2; p.setMem('s61z', true) },
  },

  {
    id: 'sonder_61_aa',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s61aa,
    text: 'The neighbor whose schedule you know without trying — the light on at six, the car leaving at seven-fifteen, the return at six-forty-five — has not appeared for four days. You have not asked anyone about this. You are not sure what your concern entitles you to.',
    choices: null,
    effect: (p) => { p.setMem('s61aa', true) },
  },

  {
    id: 'sonder_61_ab',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s61ab,
    text: 'The collection you assembled — the stones, the bottle caps, the pressed flowers, the particular order they were kept in — was private in the way that the things you cared about most were private at that age. You did not show anyone. The collection was its own reason.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s61ab', true) },
  },

  {
    id: 'sonder_61_ac',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s61ac,
    text: 'You have been to the place where something important happened and found it smaller than the importance suggested it should be. The significance is not in the place. The place is where it happened.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s61ac', true) },
  },

  {
    id: 'sonder_61_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s61ad,
    text: 'You remember the exact sequence of a day thirty years ago with a precision that most recent weeks do not have. Memory does not record by importance. It records by intensity. The two are not the same.',
    choices: null,
    effect: (p) => { p.r += 2; p.e += 2; p.setMem('s61ad', true) },
  },

]
