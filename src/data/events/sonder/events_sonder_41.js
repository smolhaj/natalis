// events_sonder_41.js
// Contemplative layer — 30 mem-gated glimpses.

export const EVENTS_SONDER_41 = [

  {
    id: 'sonder_41_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s41a,
    text: 'The same corner table. You have been coming to this place long enough that the table has become understood between you and the staff without negotiation. Minor continuity, but it is a kind of being known that the city does not otherwise offer.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s41a', true) },
  },

  {
    id: 'sonder_41_b',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s41b,
    text: 'You read an article about a place you have been. The place in the article and the place in your memory are different places. You wonder whether the article is wrong or your memory is wrong or whether both are right and the place contains both versions simultaneously.',
    choices: null,
    effect: (p) => { p.setMem('s41b', true) },
  },

  {
    id: 'sonder_41_c',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 14 && !G.mem?.s41c,
    text: 'The smell of rain on dry ground. You are young enough that you don\'t know this has a name — petrichor — but you know the smell. You know it as something that announces something: that the dry is ending, that the air is about to change.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s41c', true) },
  },

  {
    id: 'sonder_41_d',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s41d,
    text: 'You are trying to remember a name and you cannot. Not a famous name — a specific person: someone who was kind to you in 1981, or someone who sat beside you for two years in school. The name is gone. What remains is the texture of them: the way they held their head, what they smelled like, that they were kind. The name was the label. The label is gone. The person remains, unlabelled.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s41d', true) },
  },

  {
    id: 'sonder_41_e',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.s41e,
    text: 'You say something intended as a small point and someone in the room is clearly hurt by it. You hadn\'t seen the connection. They don\'t say they\'re hurt; you see it. You continue the conversation. Later you replay it and still can\'t fully see what they saw in what you said, which is its own kind of information.',
    choices: null,
    effect: (p) => { p.setMem('s41e', true) },
  },

  {
    id: 'sonder_41_f',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s41f,
    text: 'The last day of a job. You have packed the box of things from your desk. The badge. The coffee cup. The plant you kept alive for two years under fluorescent light. You carry it to the lift. The office looks the same. You have left it unchanged. It will close around the space you occupied in two weeks.',
    choices: null,
    effect: (p) => { p.setMem('s41f', true) },
  },

  {
    id: 'sonder_41_g',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 13 && G.age <= 18 && !G.mem?.s41g,
    text: 'The older sibling\'s music, the parent\'s music, the music on the radio that is nobody you know — and then the music that is yours. The specific year when the music your peers are listening to is different from any of those, and belongs to this year and this age and will not sound the same when you hear it at forty.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s41g', true) },
  },

  {
    id: 'sonder_41_h',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s41h,
    text: 'You notice that you have started crossing the road when you see a large group of teenagers coming toward you on the pavement. You do not remember when this started. You are trying to decide whether this is reasonable or whether it is the beginning of a relationship to youth that you do not want to have.',
    choices: null,
    effect: (p) => { p.setMem('s41h', true) },
  },

  {
    id: 'sonder_41_i',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s41i,
    text: 'The photograph on the wall that everyone else has stopped noticing. You notice it every time: the light in it, the way it was taken before anyone knew it would become the defining image of that period. Now it is a document. When it was taken it was just Tuesday.',
    choices: null,
    effect: (p) => { p.setMem('s41i', true) },
  },

  {
    id: 'sonder_41_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s41j,
    text: 'The flight home. Not a specific flight — the pattern of them over years. The first time the city below resolves from altitude into the specific grid you know, and your body recognises it before your mind does. You are not sure when "home" became this particular place rather than the other one.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s41j', true) },
  },

  {
    id: 'sonder_41_k',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.s41k,
    text: 'You read a book that someone else has read before you — you can tell from the pencil marks, the small underlines, the folded corner on page 214. Someone chose that corner on page 214. Someone thought those lines mattered. You read those lines looking for the reason and cannot find it. The previous reader remains at a complete remove.',
    choices: null,
    effect: (p) => { p.setMem('s41k', true) },
  },

  {
    id: 'sonder_41_l',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s41l,
    text: 'Someone much younger asks for your advice on something you were thinking about seriously when you were their age. The thing they are asking is the thing you spent three years on in your twenties and arrived at an imperfect answer to. You give them the answer. You watch them receive it with the same urgency you had when you were looking for it. You remember that the urgency was the point.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s41l', true) },
  },

  {
    id: 'sonder_41_m',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s41m,
    text: 'The news that someone from your past has died. Not someone you are still close to — someone you shared a particular years-long period of your life with and then lost contact with in the way people lose contact. Their face in your memory is from that period, which is thirty years ago. The person who died is someone else entirely: different weight, different hair, different life. You grieve the thirty-year-old photograph.',
    choices: null,
    effect: (p) => { p.r += 3; p.m -= 4; p.setMem('s41m', true) },
  },

  {
    id: 'sonder_41_n',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s41n,
    text: 'The kitchen where you have had the most important conversations of your life. Not a kitchen that was designed for this — a regular kitchen, possibly small, possibly with inadequate lighting. The table, the two chairs, the ordinary domestic setting in which the extraordinary conversations happen because that is the room where people stop performing and put the kettle on.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s41n', true) },
  },

  {
    id: 'sonder_41_o',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 19 && !G.mem?.s41o,
    text: 'The thing you said in a group conversation that you realised, three seconds after you said it, was wrong — not just mistaken but wrong in a way that revealed something. You corrected it. The correction was noted without comment. The three seconds before the correction have never fully left.',
    choices: null,
    effect: (p) => { p.setMem('s41o', true) },
  },

  {
    id: 'sonder_41_p',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s41p,
    text: 'The person at the window. You are on a train, or in a waiting room, or at a gate. They are looking out at something outside. You wonder what they\'re looking at and whether they\'re seeing it or whether they\'re somewhere entirely else, as you sometimes are at windows.',
    choices: null,
    effect: (p) => { p.setMem('s41p', true) },
  },

  {
    id: 'sonder_41_q',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s41q,
    text: 'You find the letters from a period of your life when letter-writing was how you maintained relationships across distance. The handwriting is yours and not quite yours: the version of your hand from twenty years ago, less certain in some strokes, more elaborate in others. The person you are reading sounds familiar and like a stranger.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s41q', true) },
  },

  {
    id: 'sonder_41_r',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 13 && !G.mem?.s41r,
    text: 'The animal that adopted you — not your family\'s animal, the animal of the neighbourhood that began appearing at your back door. You fed it for a season. Then you stopped seeing it. Adults say these things happen. You understood then that they do. The understanding was specific and physical.',
    choices: null,
    effect: (p) => { p.m -= 4; p.setMem('s41r', true) },
  },

  {
    id: 'sonder_41_s',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s41s,
    text: 'The meeting you left feeling good about that led to nothing. The meeting you left feeling uncertain about that produced the best thing in the next two years. You have stopped trusting your immediate reading of meetings as a result. You read them anyway.',
    choices: null,
    effect: (p) => { p.setMem('s41s', true) },
  },

  {
    id: 'sonder_41_t',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 21 && !G.mem?.s41t,
    text: 'You are very tired and there is still two hours to go. The specific quality of this tiredness — not sleepy, but the tiredness of sustained attention in a room full of people. You drink the water. You focus on one face. You get through the two hours. On the way home you stare out the window and your mind produces nothing.',
    choices: null,
    effect: (p) => { p.setMem('s41t', true) },
  },

  {
    id: 'sonder_41_u',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s41u,
    text: 'The view you have looked at so many times it has become transparent. You no longer see it — it has become the backdrop against which other things happen. One morning you look at it and see it again. The same trees, the same rooftops, the same angle of light you have been looking at for nine years. For a moment it is astonishing.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s41u', true) },
  },

  {
    id: 'sonder_41_v',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s41v,
    text: 'The generation below you does not know certain things that you assumed everyone knew. Not historical facts — habits, skills, procedures: how to read a paper map, how to write a formal letter on paper, how to manage when the system fails. This was knowledge your generation absorbed through friction. They have not had the same friction.',
    choices: null,
    effect: (p) => { p.setMem('s41v', true) },
  },

  {
    id: 'sonder_41_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s41w,
    text: 'The quality of silence after a difficult conversation. Not comfortable silence. The silence that means both people have said what they are going to say and are sitting with whether it was the right thing. You have learned not to fill this silence with more words. It took a long time to learn.',
    choices: null,
    effect: (p) => { p.setMem('s41w', true) },
  },

  {
    id: 'sonder_41_x',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && !G.mem?.s41x,
    text: 'You are on the phone to someone you have not spoken to in years. The first two minutes are the formal re-establishment — how are you, what have you been doing, the summary compression. After five minutes something shifts and you are talking the way you used to talk. For a moment the years between are negotiable.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s41x', true) },
  },

  {
    id: 'sonder_41_y',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 6 && G.age <= 12 && !G.mem?.s41y,
    text: 'You are sick and staying home from school. The house in the daytime is different from the house in the evening: different sounds, different light, the world going on outside without you. You lie on the sofa. Someone brings you soup. You watch the ceiling and feel simultaneously terrible and peaceful.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s41y', true) },
  },

  {
    id: 'sonder_41_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s41z,
    text: 'There is a plant in the house you have been keeping alive for more than a decade. You do not think about it most days. It needs water on a schedule that you have internalized. Occasionally you look at it and understand that it is a living thing that depends on you, and that it has been living and depending on you through events that felt, at the time, like everything — and it just sat there, continuing.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s41z', true) },
  },

  {
    id: 'sonder_41_aa',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s41aa,
    text: 'The question someone asked you at thirty that you are only now able to answer. They asked it and you gave the answer you had at thirty, which was approximate. You have been answering it more precisely, inside yourself, for twenty-five years. They probably don\'t remember the conversation. The question is still one of the most important things you were ever asked.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s41aa', true) },
  },

  {
    id: 'sonder_41_ab',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s41ab,
    text: 'You watch something on television about the city where you grew up. The camera shows the street, the market, the building you remember. The camera moves on. The city exists independently of your having grown up in it, which is obvious but occasionally still surprising.',
    choices: null,
    effect: (p) => { p.setMem('s41ab', true) },
  },

  {
    id: 'sonder_41_ac',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 19 && !G.mem?.s41ac,
    text: 'The first time you cook for someone else and it comes out right. Not a complex meal — something simple, done correctly. They eat it and say it is good. You understand the difference between making food for yourself and making food that someone else will eat. The second version requires a different kind of attention.',
    choices: null,
    effect: (p) => { p.m += 4; p.s += 2; p.setMem('s41ac', true) },
  },

  {
    id: 'sonder_41_ad',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && !G.mem?.s41ad,
    text: 'You read something you wrote fifteen years ago. The thinking is good but the confidence is excessive in a specific way you recognize as the confidence of someone who didn\'t yet know what they didn\'t know. The content is not embarrassing. The certainty is. You hope you no longer do it. You are not sure.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s41ad', true) },
  },

]
