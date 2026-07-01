// events_sonder_55.js — contemplative layer, weight 2, all mem-gated

export const EVENTS_SONDER_55 = [

  {
    id: 'sonder_55_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s55a,
    text: 'The person who sat next to you on a long journey — a train, a bus, a flight of several hours. You spoke or you didn\'t. You shared the particular silence of people who will never see each other again and know it. By the end you knew something about them. You do not know their name. The knowledge is specific and useless and you still have it.',
    choices: null,
    effect: (p) => { p.setMem('s55a', true) },
  },

  {
    id: 'sonder_55_b',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s55b,
    text: 'The way a city sounds at 4am. Not the same city at noon or at midnight — specifically 4am, when the night people have gone home and the morning people have not yet arrived. You know this sound from some occasion when you were awake at 4am and the city made itself available to you in a register it reserves for 4am. You have not forgotten it. You may not hear it again.',
    choices: null,
    effect: (p) => { p.setMem('s55b', true) },
  },

  {
    id: 'sonder_55_c',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s55c,
    text: 'The adult who took your opinion seriously when you were a child. Not patronizingly — actually considered what you said and responded to it as if it mattered. This was not your parent, usually; parents have a different mode. A teacher, a neighbour, an uncle. The effect of that adult treating you as someone worth listening to is still in you. It precedes anything you know about yourself.',
    choices: null,
    effect: (p) => { p.setMem('s55c', true) },
  },

  {
    id: 'sonder_55_d',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s55d,
    text: 'You find something you wrote when you were young — a letter, a diary entry, notes from a course you once took. The handwriting is yours but the person is not, quite. The concerns are not the concerns you have now. The thing you were most afraid of is not the thing you would now most fear. You read it the way you read a document from a country you once lived in: recognizing the language, not entirely recognizing the place.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s55d', true) },
  },

  {
    id: 'sonder_55_e',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s55e,
    text: 'The friend you have not spoken to in years but would recognize immediately if they called. The relationship has been on hold rather than ended. You both know this without having discussed it. The maintenance has been suspended without the attachment being cancelled. At some specific moment one of you will call and the conversation will resume from something close to where it stopped.',
    choices: null,
    effect: (p) => { p.setMem('s55e', true) },
  },

  {
    id: 'sonder_55_f',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s55f,
    text: 'The first time you cooked a meal for other people and it worked. Not just edible — actually good, and you knew it was good before anyone said so. Something shifted in how you understood what you were capable of. This is a small thing and yet it is the kind of small thing from which a version of the self is assembled: the version that can produce something from raw materials and give it to someone else.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s55f', true) },
  },

  {
    id: 'sonder_55_g',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s55g,
    text: 'The meeting where the decision had already been made. The agenda, the presentation, the discussion: all real, all engaged with seriously. But the decision preceded the meeting by hours or weeks and the meeting was the form through which the decision would be announced. You understood this during the meeting. You participated anyway, because this is what the meeting required, and because sometimes the form matters even when the substance is predetermined.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s55g', true) },
  },

  {
    id: 'sonder_55_h',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s55h,
    text: 'The body learning something you did not teach it. A gesture, a posture, a way of holding your head when you are thinking. You see it in a photograph or a reflection and recognize it as your mother\'s gesture, your father\'s posture. The inheritance operates below the level of imitation. You did not decide to do this. The body decided to carry forward what the body observed.',
    choices: null,
    effect: (p) => { p.setMem('s55h', true) },
  },

  {
    id: 'sonder_55_i',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s55i,
    text: 'The plant that keeps living. You have killed many plants through neglect or overcare. This one persists without explanation. It is not a beautiful plant. It does not flower. It sits in the same pot for years, producing no particular effect, refusing to die. You have moved it from flat to flat. It is now part of the household in the way that only things which have survived multiple decisions to throw them away can be.',
    choices: null,
    effect: (p) => { p.setMem('s55i', true) },
  },

  {
    id: 'sonder_55_j',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s55j,
    text: 'The specific quality of a summer evening in your twenties. You cannot reproduce the feeling — you have tried on subsequent summer evenings. Something in it was produced by a combination of circumstances that has not repeated: the people, the place, the specific moment in your life. The memory is very precise about what it felt like. It is imprecise about what exactly happened. The feeling is the thing that was kept.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s55j', true) },
  },

  {
    id: 'sonder_55_k',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s55k,
    text: 'The thing you said once that someone remembered and repeated back to you years later. You had no memory of saying it. They quoted it exactly, attributed it to you precisely, said it had changed how they thought about something. You had said it without meaning to leave it, and it had stayed in someone else without your knowledge. You are the source of something you have forgotten.',
    choices: null,
    effect: (p) => { p.setMem('s55k', true) },
  },

  {
    id: 'sonder_55_l',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s55l,
    text: 'The silence after a long argument. Not the productive silence where something is being processed — the silence where both people have said everything and neither of them knows what comes next. This silence has a specific texture that depends on what came before it. The next thing said will have to carry the whole weight of the argument plus the silence. Usually someone says something small. The small thing is not small.',
    choices: null,
    effect: (p) => { p.setMem('s55l', true) },
  },

  {
    id: 'sonder_55_m',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s55m,
    text: 'Someone you loved looking at you from a distance — across a room, across a street — not knowing you could see them. The expression on their face before they knew you were watching. You saw something you were not supposed to see. Not a secret. A private version of them, the one that exists when the performance of being with other people has been temporarily suspended. You have not mentioned it. You have not forgotten it.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s55m', true) },
  },

  {
    id: 'sonder_55_n',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s55n,
    text: 'The sound of rain on a particular roof. Not rain in general — rain on this specific material (corrugated iron, tile, flat felt, lead flashing) producing this specific register. You know what rain sounds like in the house you grew up in and in any house since then there is a comparison being made without your asking for it. The original sound is still the reference. All other rain is rain-compared-to-that.',
    choices: null,
    effect: (p) => { p.setMem('s55n', true) },
  },

  {
    id: 'sonder_55_o',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s55o,
    text: 'The job interview that went well and then nothing. A second interview, or a warm letter, or a week of expectation. Then silence. Then a formal refusal with the word "unfortunately." You have thought about what you would have done in that job, in that organisation, in that city. The life that would have followed is vivid enough to have been a life. You did not live it. You lived this one. The job that said no is still there, on the alternate track, unfading.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s55o', true) },
  },

  {
    id: 'sonder_55_p',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s55p,
    text: 'The text you drafted and did not send. The version where you said the true thing, the version where you said what you meant rather than what you said. You read it back, you may have read it several times. Then you deleted it or left it in the drafts folder. The true version exists somewhere or existed somewhere. The sent version is what happened. The relationship between the two versions is the gap between what you are in private and what you are to the other person.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s55p', true) },
  },

  {
    id: 'sonder_55_q',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s55q,
    text: 'The accumulation. Not any one thing — the accumulation of experience, of knowledge, of consequence, of having done things and said things and been in places and made decisions that became other decisions. You could not have held this much at thirty. Thirty-year-old you was also richer — more possibility, more time, the future still large. You have traded one kind of wealth for another, and the exchange was not voluntary, and you are not sure the terms were fair, and they were also the only terms available.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s55q', true) },
  },

  {
    id: 'sonder_55_r',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s55r,
    text: 'The specific quality of being sick as a child. The altered temperature of everything — the sheets, the light, the sounds from downstairs. The permission to do nothing, to lie still, to be tended to. The world reduced to a radius of a few feet and that radius being sufficient. Fever is a kind of state change: the sick child is in the world differently from the well child, and some part of the sick child\'s experience is something the well child cannot access.',
    choices: null,
    effect: (p) => { p.setMem('s55r', true) },
  },

  {
    id: 'sonder_55_s',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s55s,
    text: 'The money you did not spend and did not save — that disappeared somewhere between those two options. Not stolen, not wasted on anything specific: it simply stopped being there. You were not poor. The money was not tracked carefully. Months later it was not there. This is the particular texture of a time before you started paying attention, when money was something that arrived and left without a record being kept.',
    choices: null,
    effect: (p) => { p.setMem('s55s', true) },
  },

  {
    id: 'sonder_55_t',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s55t,
    text: 'The decision made in a bad state of mind that turned out to be correct. You were exhausted, or grieving, or angry, or unwell. You made a decision you should not have been making in that state. The decision was right. You cannot claim credit for reasoning — you were not reasoning well. The decision was right anyway. This is unsettling in a way that good decisions made from good reasoning are not.',
    choices: null,
    effect: (p) => { p.setMem('s55t', true) },
  },

  {
    id: 'sonder_55_u',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s55u,
    text: 'The room where something important happened — the waiting room, the kitchen, the office, the car on a particular road. You pass through a room like it now and the original room is present in the new one, just behind it. The event that happened there is not what you remember most vividly. You remember the room: the light, the arrangement of objects, the sound. Rooms hold events differently than memory does.',
    choices: null,
    effect: (p) => { p.setMem('s55u', true) },
  },

  {
    id: 'sonder_55_v',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s55v,
    text: 'The stranger at the bus stop or the bank or the checkout who told you something personal — not because you asked, not because you seemed like someone who wanted to know, but because they needed to say it to someone and you were there. You received it. You did not know what to do with it. You still remember it. They do not remember you.',
    choices: null,
    effect: (p) => { p.setMem('s55v', true) },
  },

  {
    id: 'sonder_55_w',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s55w,
    text: 'The year that went past very fast and the year that went past very slowly. The fast year: full, too much happening, each month crowded with events. The slow year: nothing much happened, and the nothing-much happening stretched into itself. The years do not correspond to time: the fast year took twelve months and the slow year took twelve months and they are not the same twelve months.',
    choices: null,
    effect: (p) => { p.setMem('s55w', true) },
  },

  {
    id: 'sonder_55_x',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s55x,
    text: 'The game you invented with one other child. Not a game that existed before — something specific to the two of you, with rules that would mean nothing to anyone else, with geography that was yours: this patch of ground, this specific corner, this time of day. The game existed only while both of you played it. When you stopped playing, the game ended. Nobody else has ever played it or will.',
    choices: null,
    effect: (p) => { p.setMem('s55x', true) },
  },

  {
    id: 'sonder_55_y',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s55y,
    text: 'The capacity that has simply stopped being available. Not a dramatic loss — something quiet. The ability to read for three hours without looking up. The ability to fall asleep in strange places. The ability to ignore discomfort for long enough that it stopped being discomfort. These capacities were there, then they were there less, then they were not there. The body revising its own contract without negotiation.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s55y', true) },
  },

  {
    id: 'sonder_55_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s55z,
    text: 'The gift you gave that landed perfectly. Not an expensive gift — the gift that was right in a way that expensive gifts often are not. The person received it and you could see that they received it, that it found something specific. This is rare. You knew it was rare at the time. The memory of the moment they opened it is more vivid than the object itself.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s55z', true) },
  },

  {
    id: 'sonder_55_aa',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s55aa,
    text: 'The first time you had to explain something you had always taken for granted. A custom, a word, a social rule that you had never needed to name because it was simply what people did. To explain it to someone from outside required you to see it from outside for the first time. The custom looked different from outside. It had not occurred to you that it was optional.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s55aa', true) },
  },

  {
    id: 'sonder_55_ab',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s55ab,
    text: 'The dream that returns. Not every night — intermittently, across decades. A different setting each time but the same structure: you are trying to get somewhere and cannot, or you are being asked something and do not know the answer, or you are in a building that keeps changing its configuration. The dream is different and it is the same dream. Your sleeping mind has a recurring project it has not finished.',
    choices: null,
    effect: (p) => { p.setMem('s55ab', true) },
  },

  {
    id: 'sonder_55_ac',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s55ac,
    text: 'The moment you were given responsibility before you were ready for it. The promotion, the assignment, the trust placed in you by someone who believed you could do this. You were not sure you could do this. You did it. Not perfectly — with the particular imperfection of someone who is learning while doing the thing they are supposed to have already learned. This is most of how responsibility works.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s55ac', true) },
  },

  {
    id: 'sonder_55_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s55ad,
    text: 'What you notice about younger people. Not their opinions — you notice how certain they seem about things you spent years not being certain about. You cannot tell them that the certainty itself is temporary; they would not believe you, and you would not have believed it either at that age. They are right to be certain. They are wrong about what they are certain about. Both of these things are true and you were the same.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s55ad', true) },
  },

]
