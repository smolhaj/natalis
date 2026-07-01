// events_sonder_48.js — contemplative layer, weight 2, all mem-gated

export const EVENTS_SONDER_48 = [

  {
    id: 'sonder_48_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s48a,
    text: 'The way someone reads the room before speaking — the pause, the brief survey of faces, the adjustment. You have been doing this for years without realising it had a name. Today you watch yourself do it and understand that you learned it from somewhere. From the atmosphere of some specific room, at some specific age, when the air required it. The skill is so old it feels like instinct.',
    choices: null,
    effect: (p) => { p.setMem('s48a', true) },
  },

  {
    id: 'sonder_48_b',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s48b,
    text: 'You recognise the restaurant because of the pattern on the awning, which is the same pattern it had forty years ago. The restaurant is different inside — different tables, different smells, different owners. The awning remained. You stand outside for a moment longer than necessary. The awning does not know you were ever here.',
    choices: null,
    effect: (p) => { p.setMem('s48b', true) },
  },

  {
    id: 'sonder_48_c',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s48c,
    text: 'The call ends and you sit with the phone for a while. The person on the other end is somewhere you cannot picture clearly — some room, some chair, some light through some window. The call lasted forty minutes. You said the important things. You did not say the other things. The distance between the important things and the other things is the conversation you have in the silence after.',
    choices: null,
    effect: (p) => { p.setMem('s48c', true) },
  },

  {
    id: 'sonder_48_d',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s48d,
    text: 'There is a tree outside that you have seen in all its versions — the bare version, the green version, the yellow version — and you have not thought of it as a tree you know until today. Today you notice that you know its branch structure from memory. That the branch on the left leans more than it used to. That the lean is from the storms three years ago. You have been watching this tree without watching it.',
    choices: null,
    effect: (p) => { p.setMem('s48d', true) },
  },

  {
    id: 'sonder_48_e',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s48e,
    text: 'There is a room in someone\'s house that you visited exactly twice as a child. You can still see it: the texture of the wallpaper, the smell, the particular quality of the light through those windows at that hour. You don\'t know who lived there. The room exists in your memory more vividly than rooms you\'ve been in a hundred times.',
    choices: null,
    effect: (p) => { p.setMem('s48e', true) },
  },

  {
    id: 'sonder_48_f',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s48f,
    text: 'You find yourself walking at the pace of the person ahead of you without having decided to. You match their speed and their route for two blocks before noticing. They turn. You continue. For two blocks you were following the logic of a stranger\'s errands instead of your own.',
    choices: null,
    effect: (p) => { p.setMem('s48f', true) },
  },

  {
    id: 'sonder_48_g',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s48g,
    text: 'The way the light falls in the kitchen at a specific hour — late afternoon, the angle that makes the table look different from how it looks all day. You have seen this light ten thousand times and it still interrupts you. Some things do not habituate. You do not know why this is one of them.',
    choices: null,
    effect: (p) => { p.setMem('s48g', true) },
  },

  {
    id: 'sonder_48_h',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s48h,
    text: 'You find an old letter in a box — not addressed to you, not from someone you know. Whoever packed this box put it here. You read the first line and then stop. The private life of a stranger, from a year before you were born, in your box. You put it back. The box has been holding it for longer than you have owned the box.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s48h', true) },
  },

  {
    id: 'sonder_48_i',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s48i,
    text: 'Someone at school today said something that you will still remember in thirty years. You don\'t know this yet. To you it is just a sentence that someone said in the hallway, a throwaway remark that landed differently than the speaker intended. The sentence has already begun the work of becoming permanent. You don\'t feel it happening.',
    choices: null,
    effect: (p) => { p.setMem('s48i', true) },
  },

  {
    id: 'sonder_48_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s48j,
    text: 'There are people from your past who don\'t know where you are now. Not estranged — just lost track. They knew a version of you that has been revised several times since. Somewhere, someone who knew you at twenty-two has a picture of you that is still true to them and is no longer true to you. You have no way to update it.',
    choices: null,
    effect: (p) => { p.setMem('s48j', true) },
  },

  {
    id: 'sonder_48_k',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s48k,
    text: 'Your handwriting has changed since you were young. Not once but several times — the adolescent version, the young adult version, the version that emerged after years of signing the same signature. You look at something you wrote decades ago and the hand that formed those letters was a different hand, working from a different place. The pen knew something then that it doesn\'t now.',
    choices: null,
    effect: (p) => { p.setMem('s48k', true) },
  },

  {
    id: 'sonder_48_l',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s48l,
    text: 'Someone is eating alone at the table by the window. You notice them for a fraction of a second — coffee, a book, their jacket on the back of the chair. They don\'t look up. You pass. The fraction of a second is the whole of what you will ever know about this particular person on this particular morning. They had a before and will have an after. You are a fraction of a second of neither.',
    choices: null,
    effect: (p) => { p.setMem('s48l', true) },
  },

  {
    id: 'sonder_48_m',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s48m,
    text: 'The smell of a specific fuel — diesel, or coal smoke, or the particular petroleum scent of a bus from thirty years ago — returns something to you that you hadn\'t known you were missing. Not a memory exactly. The body\'s record, which keeps its own filing system and retrieves without being asked.',
    choices: null,
    effect: (p) => { p.setMem('s48m', true) },
  },

  {
    id: 'sonder_48_n',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s48n,
    text: 'There is a game you played for two summers and then never again. You don\'t remember deciding to stop — it just stopped being the game. Something replaced it, or the group that played it dispersed, or it became the wrong kind of thing to want. The game still exists somewhere in its rules and its equipment. You just don\'t play it.',
    choices: null,
    effect: (p) => { p.setMem('s48n', true) },
  },

  {
    id: 'sonder_48_o',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s48o,
    text: 'You have been giving the same piece of advice for twenty years. It is good advice. It is advice you did not take yourself, at the age when it would have helped most. You give it without irony now. The irony was part of the younger version; this version just gives the advice.',
    choices: null,
    effect: (p) => { p.setMem('s48o', true) },
  },

  {
    id: 'sonder_48_p',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s48p,
    text: 'The way the city sounds different on a public holiday — the absence of one category of noise making all the other categories more audible. The birds have always been there. The footsteps of the person one floor up have always been there. What you were hearing before was mostly traffic.',
    choices: null,
    effect: (p) => { p.setMem('s48p', true) },
  },

  {
    id: 'sonder_48_q',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s48q,
    text: 'You send a message and then look at the thread above it — the history of what you have said to this person, going back months. The person you are in those messages is recognisably you and has perspectives that have quietly shifted since. The thread is a record that does not know it is a record.',
    choices: null,
    effect: (p) => { p.setMem('s48q', true) },
  },

  {
    id: 'sonder_48_r',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s48r,
    text: 'A child in the street is doing the thing children do — the small private drama of walking along a wall, of balancing on a curb — and you remember doing it. Not this wall, not this curb, but the same grammar of the walk, the same internal intensity about something that looks from outside like nothing at all. The grammar is very old. The child doesn\'t know you recognise it.',
    choices: null,
    effect: (p) => { p.setMem('s48r', true) },
  },

  {
    id: 'sonder_48_s',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s48s,
    text: 'The things you are not afraid of anymore. You have a list, though you\'ve never written it down: the things that used to cost something to do that now cost nothing. The things that used to require preparation that now just happen. You don\'t know exactly when each thing became easy. They became easy gradually and then suddenly, the way other things become hard.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s48s', true) },
  },

  {
    id: 'sonder_48_t',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s48t,
    text: 'Someone you haven\'t spoken to in years appears in your mind for no reason — their face, their particular way of beginning a sentence, something they once said in a car. The mind keeps filing things you didn\'t ask it to file, and retrieves them according to rules you have no access to. You have no idea what triggered this one.',
    choices: null,
    effect: (p) => { p.setMem('s48t', true) },
  },

  {
    id: 'sonder_48_u',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s48u,
    text: 'You are doing something you have done a hundred times — making this particular meal, taking this particular route — and you are doing it competently without thinking about it. The thinking happened at some earlier point and became the body\'s knowledge. The body no longer consults you for this one.',
    choices: null,
    effect: (p) => { p.setMem('s48u', true) },
  },

  {
    id: 'sonder_48_v',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s48v,
    text: 'There is an object in the room that has outlasted everything around it. You don\'t notice it most days. Today you notice how long it has been here — through the different furniture, through the different uses of the room, through the people who were in this room and are no longer. The object has no opinion about any of this. It is just the object.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s48v', true) },
  },

  {
    id: 'sonder_48_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s48w,
    text: 'The meeting runs long and the window behind the speaker is the sky at different stages of afternoon, and you track the sky more than you track the speaker without deciding to. The sky is doing something with the light. The meeting resolves a minor thing. The sky has done something you cannot repeat because the angle won\'t be the same tomorrow.',
    choices: null,
    effect: (p) => { p.setMem('s48w', true) },
  },

  {
    id: 'sonder_48_x',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s48x,
    text: 'There is a phrase that adults use that you have not understood and have not asked about. You have been filing it away under "something adults mean" and working around it. Today you hear it again and the context makes it clear. The phrase meant something much simpler than you assumed. You have been treating it as complex for years.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s48x', true) },
  },

  {
    id: 'sonder_48_y',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s48y,
    text: 'You are telling a story from years ago and you notice the story has become smooth — worn by telling, the rough edges removed, the chronology tidied up, the emotional logic made cleaner than it was. The original event was messier. The story is the version that works. You are no longer certain where the line is.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s48y', true) },
  },

  {
    id: 'sonder_48_z',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s48z,
    text: 'The person you were most afraid of becoming, when you were young, in the abstract — the type, the cautionary figure — is a person you sometimes resemble now in small ways, and sometimes don\'t at all. The fear was not entirely accurate. The resemblance is not catastrophic. The original fear was made with the information available at the time.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s48z', true) },
  },

  {
    id: 'sonder_48_aa',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s48aa,
    text: 'Two people you know separately would get along extremely well, and you have thought about introducing them for years, and you haven\'t. The reason shifts when you examine it. There may not be a reason. The introduction might still happen. The specific afternoon that would have been their meeting continues not to occur.',
    choices: null,
    effect: (p) => { p.setMem('s48aa', true) },
  },

  {
    id: 'sonder_48_ab',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s48ab,
    text: 'The photograph your friend takes of the meal before eating it. The moment between the food arriving and the eating of it, suspended. You do not take photographs of food. You notice that you don\'t and that this is a choice, made without consciously making it, about which category of things is worth recording. Your friend\'s category is different. The food grows cold equally.',
    choices: null,
    effect: (p) => { p.setMem('s48ab', true) },
  },

  {
    id: 'sonder_48_ac',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s48ac,
    text: 'The way children now speak to each other is slightly different from the way you spoke to each other at their age. The register has shifted. The words are mostly the same words but some of the words are new and some of the old words have changed position. You understand everything they say. What you notice is the shift, not the content.',
    choices: null,
    effect: (p) => { p.setMem('s48ac', true) },
  },

  {
    id: 'sonder_48_ad',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s48ad,
    text: 'At a certain age you stop reading the menu looking for what sounds best and start reading it knowing roughly what you will order. The order happens before the decision happens. There was a time when the menu was a genuine question. You remember that time without particularly wanting it back. This is different from resignation. It might be efficiency. The distinction matters to you more than it probably should.',
    choices: null,
    effect: (p) => { p.setMem('s48ad', true) },
  },

]
