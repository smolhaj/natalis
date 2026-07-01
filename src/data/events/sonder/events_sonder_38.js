// events_sonder_38.js
// Contemplative layer — 30 events.
// Themes: the dog you loved, mirrors at different ages, the word you
// mispronounced for years, what music does in an empty room, the person
// who fixed things, the letter you kept, the year the city changed,
// what you notice on the last visit.

export const EVENTS_SONDER_38 = [

  {
    id: 'sonder_38_a',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s38a,
    text: 'The dog was not your dog — it belonged to the family down the lane — but it knew you by sound and came when you appeared and this was a relationship with its own rules. The dog has been dead for twenty years. You still think of it specifically: the particular weight of its head on your knee, the breath, the way it watched you with a persistence that felt like a form of care.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s38a', true) },
  },

  {
    id: 'sonder_38_b',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s38b,
    text: 'The mirror does not lie but it does not show what you feel like from the inside. The face in the mirror is the face that the world sees: the marks on it from specific years, the particular set of the jaw. From the inside you feel like a version of yourself that precedes these marks. The two versions occupy the same body without reconciling.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s38b', true) },
  },

  {
    id: 'sonder_38_c',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s38c,
    text: 'There is a word you mispronounced for years because you learned it by reading and not by hearing. The pronunciation you had was internally consistent and felt like the word. Then someone said it aloud and the word became the spoken version and the spoken version replaced the private one. You still sometimes hear the private version first.',
    choices: null,
    effect: (p) => { p.setMem('s38c', true) },
  },

  {
    id: 'sonder_38_d',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s38d,
    text: 'Music in an empty room does something that music in a room with other people does not do. The emptiness is part of the acoustics. You have noticed this: the same piece of music sounds different depending on whether you are the only one hearing it. The shared listening changes the sound, or changes what the sound does.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s38d', true) },
  },

  {
    id: 'sonder_38_e',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s38e,
    text: 'There was a person who fixed things. The broken chair, the bicycle, the clock. You watched the fixing without fully understanding it, and what you retained was not the technique but the attitude: the patience with the object that was not cooperating, the willingness to stay inside the problem until it resolved. You still think of this person when something needs fixing.',
    choices: null,
    effect: (p) => { p.e += 2; p.m += 2; p.setMem('s38e', true) },
  },

  {
    id: 'sonder_38_f',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s38f,
    text: 'The letter is in a drawer and you know it is there and you do not reread it. Reading it would change the letter in some way — the letter as you remember it has accumulated meaning from the life that came after it. Reading it now would add the information of who you are now, which is not who you were when you received it. The unread letter stays perfect in its drawer.',
    choices: null,
    effect: (p) => { p.r += 2; p.m += 2; p.setMem('s38f', true) },
  },

  {
    id: 'sonder_38_g',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s38g,
    text: 'The year the city changed is not a single year but you remember it as one. Something shifted in the texture of the street: the shop that became a different shop, the demographic that changed, the specific smell that is no longer there or a new one. Cities change continuously but there is a year after which you know it is different from the city you arrived in.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s38g', true) },
  },

  {
    id: 'sonder_38_h',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s38h,
    text: 'On what turns out to be the last visit, you do not know it is the last visit. You behave as if there will be another one. You leave something there — a coat, a book, a question you meant to ask. The coat and the book are still there, in all probability. The question has nowhere to go.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s38h', true) },
  },

  {
    id: 'sonder_38_i',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s38i,
    text: 'The first job where you understood that being good at the work was not the same as being recognised for the work. The mechanism that converts competence into recognition is not the work itself. You learned this at the first job and have been navigating it ever since. The lesson was specific, the navigation has been general.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s38i', true) },
  },

  {
    id: 'sonder_38_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s38j,
    text: 'The birthday of someone who is no longer alive. The date is still in the calendar, or in the body — some years you remember it without remembering why you are aware of the date. Then you remember. The date exists in two registers now: the original one and the one the death created.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s38j', true) },
  },

  {
    id: 'sonder_38_k',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s38k,
    text: 'The hiding place. Every child finds one and the finding is private — the corner of the garden, the space under the stairs, the place behind the wardrobe. The hiding place is where you were when no one needed you for anything. You have not thought about it in decades. You can still locate it exactly in your memory, which is the mind saying: this mattered.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s38k', true) },
  },

  {
    id: 'sonder_38_l',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s38l,
    text: 'The train is late and you are on the platform with an hour. You have your phone and you don\'t use it. You stand or sit and you watch the platform do what platforms do. This is the hour you did not plan for and did not spend on anything and remember with something like gratitude, which is strange because nothing happened in it.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s38l', true) },
  },

  {
    id: 'sonder_38_m',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s38m,
    text: 'The talent you did not develop. Not a regret exactly — you did not have time, or circumstances, or the specific support it would have needed. The talent is still somewhere in the body. You pick up the instrument occasionally and the memory of it is there, available, like a room you haven\'t been in for years but haven\'t repainted.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s38m', true) },
  },

  {
    id: 'sonder_38_n',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s38n,
    text: 'The face you have now is the face that photographs you did not like, as a young person, predicted. The version of yourself you saw in photographs at thirty was not how you thought you looked. Now you see photographs of yourself at thirty and understand: that was accurate, and it was fine, and you were wrong about what fine looked like.',
    choices: null,
    effect: (p) => { p.r += 2; p.m += 2; p.setMem('s38n', true) },
  },

  {
    id: 'sonder_38_o',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s38o,
    text: 'The dream that repeats. Not always the same dream but recognisably the same situation — the building you can\'t navigate, the exam you didn\'t prepare for, the city you know but can\'t find the exit from. The dream uses your own footage to make something that has nothing to do with the original footage. You know the dream by the feeling it leaves, which precedes the content.',
    choices: null,
    effect: (p) => { p.setMem('s38o', true) },
  },

  {
    id: 'sonder_38_p',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s38p,
    text: 'The catchphrase or expression you picked up from someone and use without remembering where it came from. It has been yours for long enough that you would be surprised to hear someone else say it. At some point someone said it in the way that made you want to say it too. The origin is gone. The phrase remains.',
    choices: null,
    effect: (p) => { p.setMem('s38p', true) },
  },

  {
    id: 'sonder_38_q',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s38q,
    text: 'The neighbourhood where you spent years of your life looks different now — if you drive past it, which you sometimes do for reasons that are not entirely rational. The buildings are the same buildings but the businesses are different and the people are different and the trees are larger. The neighbourhood does not remember you. It has been used by other people while you were somewhere else.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s38q', true) },
  },

  {
    id: 'sonder_38_r',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s38r,
    text: 'The specific taste of something that only existed in one place at one time: the thing your grandmother made that no one has replicated, the street food from the corner that is no longer there. The taste is in the memory as a fact but cannot be verified or reproduced. This is a kind of knowledge that decays and cannot be backed up.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s38r', true) },
  },

  {
    id: 'sonder_38_s',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s38s,
    text: 'You have been inside the same argument twice in your life with different people and recognised it the second time. Not the content — the register. The positions, the way the sentences stack, the point at which someone will say the thing that ends the argument without resolving it. You knew where the argument was going before it went there. You did not find this useful.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s38s', true) },
  },

  {
    id: 'sonder_38_t',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s38t,
    text: 'The age at which your parents were when you were the age you are now. You have crossed it without marking the crossing and now you are older than they were at the moments you remember most clearly from your childhood. The parent in the memory is younger than you are. This is not comprehensible but it is true.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s38t', true) },
  },

  {
    id: 'sonder_38_u',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s38u,
    text: 'The afternoon you spent doing nothing that could be described. Not sleep and not work and not conversation. The body in the chair, the window, the particular light. This afternoon is not recoverable and is not regretted and is not significant. It is simply in the archive, alongside everything else, taking up the same amount of space.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s38u', true) },
  },

  {
    id: 'sonder_38_v',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s38v,
    text: 'The haircut you had at seventeen that you thought was a mistake and that photographs show was not a mistake. This is not about the hair. It is about the accuracy of your self-assessment at seventeen, which was poor in ways that took another decade to identify. The specific error about the hair is a sample of a larger error you were making about yourself at the time.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s38v', true) },
  },

  {
    id: 'sonder_38_w',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s38w,
    text: 'There are people who are grateful to you for things you barely remember doing. The favour that seemed small when you did it was large on their end. You find this out years later, sometimes. The ledger you keep of your own good acts is less complete than the ledger other people keep. This is probably true in the other direction as well.',
    choices: null,
    effect: (p) => { p.m += 3; p.karma += 2; p.setMem('s38w', true) },
  },

  {
    id: 'sonder_38_x',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s38x,
    text: 'The game required all the players to believe in the rules simultaneously and to not examine them. When one player stopped believing, the game became visible as a construction, which ended it. Games that children invent have this fragility. The game existed entirely in the shared belief and the shared belief was not permanent.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s38x', true) },
  },

  {
    id: 'sonder_38_y',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s38y,
    text: 'You signed a document without reading it. You knew what it was for and you trusted the person who gave it to you and you signed. The document transferred or committed or established something. You have never gone back to read what it said. This is how many things are transferred or committed or established.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s38y', true) },
  },

  {
    id: 'sonder_38_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s38z,
    text: 'The disagreement that was not resolved and is not ongoing. It has been set aside, not concluded. You see the person occasionally and the disagreement is there, below the conversation, the way furniture is there below a conversation. Neither of you raise it. It will not be raised. It will be there.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s38z', true) },
  },

  {
    id: 'sonder_38_aa',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s38aa,
    text: 'You have started to distinguish between things that need to be said and things that will be said anyway regardless of whether you say them. The first category is small. The second category is most things. This distinction has simplified a number of relationships without explaining itself.',
    choices: null,
    effect: (p) => { p.r += 2; p.m += 2; p.setMem('s38aa', true) },
  },

  {
    id: 'sonder_38_ab',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s38ab,
    text: 'The project you finished. It is done and has been done for years and exists as a completed thing, which is different from everything that is still ongoing. You return to it occasionally with the specific feeling of having done something that is actually finished. The feeling is not available from the things that are still ongoing, which is most things.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s38ab', true) },
  },

  {
    id: 'sonder_38_ac',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s38ac,
    text: 'There is a smell you associate with safety that has nothing obviously to do with safety. A cleaning product. A specific type of paper. The diesel smell of a particular kind of vehicle. The smell precedes the explanation: the body knows safety by smell before the brain categorizes it, and the particular smell is arbitrary and specific to you.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s38ac', true) },
  },

  {
    id: 'sonder_38_ad',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s38ad,
    text: 'You were briefly very good at something and then you were not and you don\'t know what changed. The technique was the same. The conditions were similar. The results were not. This is one of the genuinely mysterious things: the performance that cannot be produced on demand, that arrives and leaves without announcing its arrival or departure.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s38ad', true) },
  },

]
