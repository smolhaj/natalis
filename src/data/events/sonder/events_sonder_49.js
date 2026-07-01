// events_sonder_49.js — contemplative layer, weight 2, all mem-gated

export const EVENTS_SONDER_49 = [

  {
    id: 'sonder_49_a',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s49a,
    text: 'You pass a window where someone is playing an instrument badly — the same phrase, over and over, not yet right. You stop for a moment without meaning to. You remember the particular feeling of being that person: the phrase that keeps not happening, and the persistence of trying anyway. The window does not see you. You continue.',
    choices: null,
    effect: (p) => { p.setMem('s49a', true) },
  },

  {
    id: 'sonder_49_b',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s49b,
    text: 'The handshake that became an embrace — you don\'t know when that happened with this person, which meeting it was. Somewhere along the years the greeting changed and neither of you discussed it. Now the embrace is the greeting and the handshake would be strange. The friendship made a decision without being asked.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s49b', true) },
  },

  {
    id: 'sonder_49_c',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s49c,
    text: 'You are on a train and you can see into the lit kitchen of a house going past. A person at the counter, their back to you, doing something. For half a second you see their kitchen, their posture, the particular colour of their wall. Then gone. The life in that kitchen continues without interruption. You will never know what they were making.',
    choices: null,
    effect: (p) => { p.setMem('s49c', true) },
  },

  {
    id: 'sonder_49_d',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s49d,
    text: 'The nickname someone gave you years ago that you have not been called since they stopped calling you it. It contained a version of you that only that person saw. No one else uses it. No one else knew to use it. The word is available but the person who used it is not here to use it.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s49d', true) },
  },

  {
    id: 'sonder_49_e',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s49e,
    text: 'The adult who takes you seriously when the other adults don\'t — not your parents, not your teacher, a person at the edge of your life who treats what you say as something worth responding to. You remember them specifically. They probably do not know what they did.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 2; p.setMem('s49e', true) },
  },

  {
    id: 'sonder_49_f',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s49f,
    text: 'You know the ending of your own story better than you know the middle — you know roughly what direction it goes and how long is left. A strange kind of knowledge to carry. When you were young the story had no visible ending. Now the ending is on the horizon. You have learned to keep looking at the middle.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s49f', true) },
  },

  {
    id: 'sonder_49_g',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s49g,
    text: 'The thing you almost said in the meeting but didn\'t. It would have been right. You thought it through quickly — the room, the people in it, what would follow from saying it — and chose silence. Walking home you say it out loud to yourself, to the empty street, where it sounds exactly as right as it would have sounded in the room. The room is behind you.',
    choices: null,
    effect: (p) => { p.setMem('s49g', true) },
  },

  {
    id: 'sonder_49_h',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s49h,
    text: 'You are very tired and the tiredness has its own colour and its own weight and its own specific relationship to the chair you are in. The task is not done. The tiredness is older than today. Tomorrow the tiredness will be the same but the task will be different. For the moment you just sit in it.',
    choices: null,
    effect: (p) => { p.setMem('s49h', true) },
  },

  {
    id: 'sonder_49_i',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s49i,
    text: 'The moment in the conversation when you understand that the other person is not going to be persuaded and you are not going to be persuaded and you are both now just performing the argument. You have the choice of continuing or stopping. You continue for two more minutes and then you stop.',
    choices: null,
    effect: (p) => { p.setMem('s49i', true) },
  },

  {
    id: 'sonder_49_j',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s49j,
    text: 'The number of people at your age in the world who are doing exactly what you are doing right now — making this particular kind of choice, managing this particular kind of problem — is very large. The loneliness of the problem is specific to you. The problem itself is not. This is a fact that sometimes helps and sometimes does not.',
    choices: null,
    effect: (p) => { p.setMem('s49j', true) },
  },

  {
    id: 'sonder_49_k',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s49k,
    text: 'The specific sound of rain on a specific kind of roof — tile, tin, thatch, asphalt — that you knew in childhood. Somewhere else in the world it is raining on a roof like that right now. You can hear it without hearing it. The memory is very precise about the sound and imprecise about everything else.',
    choices: null,
    effect: (p) => { p.setMem('s49k', true) },
  },

  {
    id: 'sonder_49_l',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s49l,
    text: 'You have decided something about yourself that is not quite right. You don\'t know this yet. The decision seems accurate from inside the evidence you currently have. In a few years you will have more evidence and the decision will revise. The revision will feel sudden but it will have been happening the whole time.',
    choices: null,
    effect: (p) => { p.setMem('s49l', true) },
  },

  {
    id: 'sonder_49_m',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s49m,
    text: 'The way a grandchild looks at you when you say something — the look that means they are deciding whether to believe it. You are very authoritative in their world and also very strange. They are working out the ratio. You remember working out the same ratio with someone who no longer exists.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s49m', true) },
  },

  {
    id: 'sonder_49_n',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s49n,
    text: 'The party goes late enough that the sound of it changes — the people who stay past midnight are different from the people who arrived at eight, and the conversation is different too, less curated, more specific. You have found yourself staying past midnight more often. Something in the after-midnight version interests you that the earlier version doesn\'t reach.',
    choices: null,
    effect: (p) => { p.s += 2; p.setMem('s49n', true) },
  },

  {
    id: 'sonder_49_o',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s49o,
    text: 'You find a shortcut you have been using for years is closed. The detour is minor. What you notice is that you feel briefly lost in a neighbourhood you know well, which reveals that what you were navigating was not the neighbourhood but the specific route through it. The neighbourhood is larger than the route.',
    choices: null,
    effect: (p) => { p.setMem('s49o', true) },
  },

  {
    id: 'sonder_49_p',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s49p,
    text: 'The disease your generation gets: not all of you, but enough that it has a pattern. The specific one. The one the doctor treats as routine because it is routine at your age, but which is not routine to you because you are the one who has it. The statistics are about populations. You are inside the statistic.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s49p', true) },
  },

  {
    id: 'sonder_49_q',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s49q,
    text: 'The task you have been putting off for months has a very specific small first step that you have been avoiding. The first step takes eleven minutes. This becomes clear only after you do it. The months of putting off were not about the task — they were about the starting of the task, which turns out to be smaller than the not-starting.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s49q', true) },
  },

  {
    id: 'sonder_49_r',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s49r,
    text: 'The book you read at exactly the right age. Not the right book for reading in general — the right book for the thing you were in the middle of at that specific moment. Someone gave it to you or you found it by accident. The book knew something you didn\'t know you needed to know yet.',
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('s49r', true) },
  },

  {
    id: 'sonder_49_s',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s49s,
    text: 'The light through the curtains at a specific time of morning — thin, horizontal, the room still cool. You have woken before the alarm and there is a small gift of unscheduled time. The body knows it\'s early. The mind is still slow. For twenty minutes you exist without having to do anything.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s49s', true) },
  },

  {
    id: 'sonder_49_t',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s49t,
    text: 'The news arrives that someone you lost touch with has died. You knew them in a period of your life that is now gone in multiple ways — gone because they are gone and gone because the person you were then is not who you are now. The grief is for a compound thing: the person and the time and the version of yourself that existed when you knew them.',
    choices: null,
    effect: (p) => { p.r += 4; p.m -= 3; p.setMem('s49t', true) },
  },

  {
    id: 'sonder_49_u',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s49u,
    text: 'The moment when you realise you are the oldest person in the room. Not the obvious kind — a party where everyone is young — but the kind that comes up in a meeting, a committee, a professional context where seniority once belonged to others. You are now the seniority. You do not feel like the seniority. The room disagrees.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s49u', true) },
  },

  {
    id: 'sonder_49_v',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s49v,
    text: 'Someone is explaining something to you that you already know. They don\'t know you know. You let them explain. The explanation takes four minutes. The decision to let them explain — to receive information you already have, to give this person the experience of teaching — is a small act of generosity that costs you four minutes and gives them something less measurable.',
    choices: null,
    effect: (p) => { p.karma += 2; p.setMem('s49v', true) },
  },

  {
    id: 'sonder_49_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s49w,
    text: 'The market: the stall, the vendor, the transaction that has happened in some form in this kind of place for as long as there have been people in this kind of place. The specific stall. The specific vegetables at this season. The vendor who recognises you, or does not, and the different texture of each. You buy what you came for and you go.',
    choices: null,
    effect: (p) => { p.setMem('s49w', true) },
  },

  {
    id: 'sonder_49_x',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s49x,
    text: 'You have stopped arguing about one thing that used to make you argue. You don\'t remember when that happened. The thing still comes up. You no longer feel the need to correct it. Either you have made peace with the thing being wrong, or you have decided the energy the argument costs is not worth what the argument can do, or you are tired. You are not sure which of these is true.',
    choices: null,
    effect: (p) => { p.setMem('s49x', true) },
  },

  {
    id: 'sonder_49_y',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s49y,
    text: 'The stranger on the bus who falls asleep and whose head tilts against your shoulder. You do not move. You are not sure why you do not move — whether it is kindness, or whether movement would cost more attention than staying still. They wake at their stop, apologise, leave. You have held a stranger\'s sleep for twelve minutes.',
    choices: null,
    effect: (p) => { p.karma += 2; p.setMem('s49y', true) },
  },

  {
    id: 'sonder_49_z',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s49z,
    text: 'The skill you have that no one knows about. Not a secret exactly — it simply has not come up. A competence in some small domain that you acquired along the way and exercise privately. Somewhere there is a context in which this skill would be valuable to someone. You have never found that context. The skill waits.',
    choices: null,
    effect: (p) => { p.setMem('s49z', true) },
  },

  {
    id: 'sonder_49_aa',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s49aa,
    text: 'There is a smell in this house that is not a smell anywhere else in the world. You will not realise this until you have been away from the house for long enough that coming back means smelling it again for the first time. Right now it is simply the smell of here. It will become the smell of here later, when here is somewhere you are not.',
    choices: null,
    effect: (p) => { p.setMem('s49aa', true) },
  },

  {
    id: 'sonder_49_ab',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s49ab,
    text: 'You are waiting for something you will not get today. The waiting has its own texture at this point: not anxious, just patient in a specific key. You have been waiting long enough to have become comfortable with the waiting, which is different from having accepted that the thing won\'t come. You are not sure you know the difference from inside it.',
    choices: null,
    effect: (p) => { p.setMem('s49ab', true) },
  },

  {
    id: 'sonder_49_ac',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s49ac,
    text: 'The way the face of someone you love looks when they don\'t know you\'re watching — not performing, not responding to you, just existing. The face that is for the world they\'re in when they\'re alone. You catch it for a moment. It is the same face you know and also a different face entirely.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s49ac', true) },
  },

  {
    id: 'sonder_49_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s49ad,
    text: 'The specific quality of afternoon in the particular season you are in right now: the angle of the light, the temperature in the shade versus the sun, the smell of the air at four o\'clock. You have been in this specific quality of afternoon before — many times — but you have not been in it at this age before. The afternoon is the same. You are different.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s49ad', true) },
  },

]
