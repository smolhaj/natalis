// events_sonder_47.js — contemplative prose layer, weight 2, no choices, no new flags

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_47 = [

  {
    id: 'sonder_47_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s47a,
    text: pick([
      'The appliance that has always made that noise. You stopped hearing it years ago and now, in a quiet moment, you hear it again and it is the sound of every room you have lived in that had this appliance, all at once, layered.',
      'You have had the same response to the same kind of question for so long that you no longer notice you are giving it. Someone hears it and laughs in a way that tells you the response has become something performed rather than felt. You sit with that for a moment.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47a', true) },
  },

  {
    id: 'sonder_47_b',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s47b,
    text: pick([
      'The face of a stranger on a bus that you have seen before, on a different bus, in a different city, ten years ago. Not possible. But the face is the same and for a moment you are certain.',
      'You are trying to remember the name of someone and can feel the name without being able to reach it — the shape of it, the first letter, what it rhymes with. You give up and it arrives three hours later, in the middle of something unrelated.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47b', true) },
  },

  {
    id: 'sonder_47_c',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s47c,
    text: pick([
      'The first time you pay for something large enough that it takes most of what you have. The way the number looks when it is subtracted. The recalculation of what the remaining amount means. This is different from knowing, abstractly, that money goes.',
      'You are explaining something to someone younger and realise midway through that you are not sure you still believe the thing you are explaining. You finish the explanation anyway. Later you try to work out when you stopped believing it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47c', true) },
  },

  {
    id: 'sonder_47_d',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s47d,
    text: pick([
      'The adult who takes you seriously. It is not something you can name at the time — only that when they are gone you feel the weight of being treated as consequential, and the absence of it elsewhere.',
      'The game that requires only the street and other children and which ceases to exist when the children grow up and leave. No one writes it down. It is just gone, as though it was never there.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47d', true) },
  },

  {
    id: 'sonder_47_e',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s47e,
    text: pick([
      'The category you put yourself into and the category others put you into are different. You move between them depending on who is asking. The translation is mostly effortless and mostly invisible and occasionally exhausting.',
      'A song from a specific year that you have not heard since that year. When it comes on — in a shop, from a passing car — the year comes back not as memory but as atmosphere: the temperature, the light, the precise quality of what it was to be that age.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47e', true) },
  },

  {
    id: 'sonder_47_f',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s47f,
    text: pick([
      'The landlord\'s smell. The particular smell of someone else\'s home that permeates the place you are renting, that you have learned to stop noticing, that you sometimes catch again as though for the first time.',
      'Reading a book and reaching the part where you cannot tell if you read this before or only think you did. The text is familiar but differently familiar from how familiar the book is. Possibly you read it in a dream.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47f', true) },
  },

  {
    id: 'sonder_47_g',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s47g,
    text: pick([
      'You are telling a story from decades ago and you suddenly cannot remember whether it happened to you or to someone you knew so well that their story became indistinguishable from yours. You finish the story as though it happened to you. It probably did.',
      'The particular quiet of a house where children used to live. Not absence exactly — more like a held breath, a room still oriented toward purposes it no longer serves.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47g', true) },
  },

  {
    id: 'sonder_47_h',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s47h,
    text: pick([
      'The acquaintance who became a friend became someone you see once a year became someone who sends a birthday message. The transition happened gradually and without any conversation about it and both of you are probably fine with it and neither of you said so.',
      'You are in a meeting — or a classroom, or a ceremony — and you notice yourself playing a role that is yours but that you are also slightly watching from outside, as though verifying that you are performing it correctly. The watching is exhausting. The performing is not.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47h', true) },
  },

  {
    id: 'sonder_47_i',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s47i,
    text: pick([
      'The skill you are told you have that does not feel like a skill from the inside — it feels like the ordinary way of doing the thing. The gap between how it looks from outside and what it costs from inside is not something you can easily explain.',
      'The first time you notice that you are eating something and thinking about something else entirely. The meal is over before you tasted it. You are not sure when this started happening.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47i', true) },
  },

  {
    id: 'sonder_47_j',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s47j,
    text: pick([
      'The clothing that marks you as from a different income level from your classmates. Not obvious. But present. You learn which conversations to steer away from and which rooms to avoid on certain days.',
      'The lie you told that was accepted and that you have now repeated so many times that you cannot locate the original truth it replaced. The truth may still be findable. You have stopped looking.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47j', true) },
  },

  {
    id: 'sonder_47_k',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s47k,
    text: pick([
      'You realise you have been saying "recently" about an event that happened eight years ago. The recalibration of what "recently" means is one of the things no one warns you about.',
      'The photograph where you look happier than you remember being. Either the photograph is wrong or the memory is wrong. They cannot both be right. You have no way to check.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47k', true) },
  },

  {
    id: 'sonder_47_l',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s47l,
    text: pick([
      'The year that repeats as a reference point in your conversations. Younger people at the table have a different year. The different years are not wrong. They are just from different lives.',
      'You have been asked how things are going and you have said fine for so many years that "fine" no longer communicates anything. It is a punctuation mark. The actual answer lives somewhere else, unasked.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47l', true) },
  },

  {
    id: 'sonder_47_m',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s47m,
    text: pick([
      'The city that is easier in some ways when you do not know anyone in it. The anonymity is not loneliness from inside. It has a texture of its own — the way you move through spaces without being tracked by anyone who knows your name.',
      'The compliment that arrived late — years after the thing it was about — from someone who never gave compliments. You turn it over afterward for a long time, trying to understand what it was for.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47m', true) },
  },

  {
    id: 'sonder_47_n',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s47n,
    text: pick([
      'The smell of a specific classroom at a specific hour of a specific season that you could not describe but would recognise instantly, and which has come back to you once, unexpectedly, in a completely different building, and been gone before you could name it.',
      'The adult whose authority you respected and whose private life you never wondered about. Looking back, they must have had one. At the time there was no inside-the-school and outside-the-school for them — they simply existed as teachers exist, fully formed, without childhood.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47n', true) },
  },

  {
    id: 'sonder_47_o',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s47o,
    text: pick([
      'The meeting you did not go to that turned out to matter, and the meeting you did go to that turned out not to. Both felt the same from the outside at the time. The difference was only visible afterward.',
      'You are trying to be kind and you can tell the kindness is landing as something else. You are not sure what. You finish the sentence and let it land however it lands.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47o', true) },
  },

  {
    id: 'sonder_47_p',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s47p,
    text: pick([
      'The body\'s preferences have shifted without announcement. The food you wanted at thirty you no longer want. The food you dismissed at thirty you now seek out. The body is on its own schedule and it does not brief you in advance.',
      'You are reading something you wrote years ago and cannot locate who wrote it. The opinions are recognisably yours but the person who held them has been replaced by someone who holds them differently, or no longer holds them at all.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47p', true) },
  },

  {
    id: 'sonder_47_q',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s47q,
    text: pick([
      'The version of your family that exists in the city you have moved to — the simplified version, the version that starts later than the real one, the version that does not include the things you have decided not to explain. Most people who know you know this version.',
      'The work that takes longer than anyone thought because the part that takes time is invisible. You are not slow. The invisible part is real.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47q', true) },
  },

  {
    id: 'sonder_47_r',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s47r,
    text: pick([
      'The street you can walk blindfolded — every crack, every change in pavement texture, the place where the hedge overhangs into the path. You have walked this street enough times that the walking has become something other than walking.',
      'You correct someone gently and they take it badly and you spend the rest of the day wondering if the correction was worth making. The mathematics of this never simplify: the cost of correcting, the cost of not correcting, and neither amount is the same as the other.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47r', true) },
  },

  {
    id: 'sonder_47_s',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s47s,
    text: pick([
      'The meal that only one person makes the right way. Not the recipe — you know the recipe. The particular temperature, the particular timing, the particular something that is in the hands. The meal exists only in the presence of the person.',
      'The fear that was very large at seven and is a specific, manageable thing at forty-five. The shrinkage is good. But you remember what it was like when it was large and you do not look down on the child who held it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47s', true) },
  },

  {
    id: 'sonder_47_t',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s47t,
    text: pick([
      'The person in the next seat on a long journey. You speak for three hours and learn enough about each other\'s lives to be friends. You do not exchange contact information. At the end of the journey you part. You will not see each other again. Both of you know this.',
      'You have passed the age at which your parent was when you thought of them as old. You are not old in the way you thought they were. You are not sure what this means except that the arithmetic of age does not behave the way you expected.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47t', true) },
  },

  {
    id: 'sonder_47_u',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s47u,
    text: pick([
      'The object in a drawer that you cannot throw away and cannot explain. It has no function and no clear memory attached to it. It is just there, preserved by the same instinct that preserves things whose meaning has not yet finished arriving.',
      'You are laughing at something and then the laughter is happening and you are watching it happen and then it is over and you are in the room again. The laughter was real. The watching of the laughter was also real. Both things were true at once.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47u', true) },
  },

  {
    id: 'sonder_47_v',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s47v,
    text: pick([
      'The question you have been asked so many times that you have a clean answer ready. You give the clean answer. The clean answer is true but it is not the whole truth. The rest of the truth is not something you have figured out how to say quickly.',
      'The first time you disagree with a parent and are right and they know it. The rightness is not satisfying in the way you expected it would be.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47v', true) },
  },

  {
    id: 'sonder_47_w',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s47w,
    text: pick([
      'The grandchild who asks a question that you have been waiting your whole life for someone to ask. You do not say this. You answer the question. But the asking of it stays with you for weeks.',
      'You are listening to music and for a moment the music is doing something to time — stretching it or compressing it — and then the moment is over and the music is just music again. You cannot make it happen again by trying.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47w', true) },
  },

  {
    id: 'sonder_47_x',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s47x,
    text: pick([
      'The apology you owe that you have been meaning to give for years. Every year it is harder. The weight of the thing accrues interest. You are not sure anymore if an apology at this distance helps or only helps you.',
      'The conversation about money that nobody in your family has directly. The conversational form that substitutes for it — the complaint about a third party, the mention of a purchase, the silence that means no — is fluent and has its own grammar. You speak it without having been taught it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47x', true) },
  },

  {
    id: 'sonder_47_y',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s47y,
    text: pick([
      'The exact quality of light in the house at a particular hour. Not day and not evening. The light that means the day is done but the night has not started. Later in life, when you are somewhere else at this hour, the light sometimes catches and you are briefly, involuntarily, back.',
      'The older person who treats you as a person worth talking to. Not as a child to be instructed. The difference is felt immediately and remembered for a long time.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47y', true) },
  },

  {
    id: 'sonder_47_z',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s47z,
    text: pick([
      'The illness you recovered from that changed what you thought the body was capable of. Not in an inspirational way. In a practical way: you know what the body can survive now. It is information.',
      'You are in a room full of people you have known for decades and you notice, briefly, that you could describe any one of them to a stranger, and that the description would be accurate, and that none of it would touch what you actually know about them.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47z', true) },
  },

  {
    id: 'sonder_47_aa',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s47aa,
    text: pick([
      'The meal eaten alone that you did not expect to enjoy and enjoyed. The table for one. The book propped against the glass. The specific, slightly guilty pleasure of eating exactly what you want at exactly your own pace.',
      'You have been carrying an opinion for years and today, without any precipitating event, it shifts. Not all the way. Just enough that you notice it is no longer the same opinion it was this morning. This happens without drama and without announcement.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47aa', true) },
  },

  {
    id: 'sonder_47_ab',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s47ab,
    text: pick([
      'The city at a specific hour of a specific season that feels like it is showing you something it normally keeps hidden. The emptiness of it, or the fullness — the quality of the light, the temperature, the particular silence or noise at that precise hour. You walk through it knowing you are inside something that will not repeat exactly.',
      'The job that was not a career but that gave you something a career does not — a particular calibration of time, a particular relationship to effort. You think about this sometimes when the career is moving in ways that feel out of scale.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47ab', true) },
  },

  {
    id: 'sonder_47_ac',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s47ac,
    text: pick([
      'The thing you still do not know how to do that you assumed you would eventually learn. You have given up assuming. You will finish your life without knowing how to do this thing. The thing is not important. The not-knowing is also not important. It is only interesting.',
      'You are at the funeral of someone who was older than you and you are doing the arithmetic you always do at funerals and you arrive at a number and then you stop doing the arithmetic.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47ac', true) },
  },

  {
    id: 'sonder_47_ad',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s47ad,
    text: pick([
      'The other life you did not live runs parallel sometimes. Not regret exactly — more like curiosity. You see someone your age doing the thing you might have done and you observe what that life produces. Then you stop observing and return to the one you are in.',
      'Sitting with someone who is sleeping. The specific texture of being in the presence of someone unconscious — the changed quality of the room, the breathing, the way the person looks more available than when they are awake. You are responsible for the quiet.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s47ad', true) },
  },

]
