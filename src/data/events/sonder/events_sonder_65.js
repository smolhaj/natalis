// Sonder module 65 — 30 contemplative events
// Weight 2, null choices, all mem-gated. Universal human texture.

export const EVENTS_SONDER_65 = [

  {
    id: 'sonder_65_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65a,
    text: 'The word you keep almost saying — the one you start and redirect before it comes out — is a word you stopped saying because of a specific reaction you received once. You do not always remember the reaction. You remember the redirect. It has become automatic.',
    choices: null,
    effect: (p) => { p.setMem('s65a', true) },
  },

  {
    id: 'sonder_65_b',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s65b,
    text: 'The person who taught you to do the thing you now teach others to do does not know you have been teaching it. You have never told them. The knowledge passed from them to you and from you outward and they are the source of something they cannot see.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s65b', true) },
  },

  {
    id: 'sonder_65_c',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s65c,
    text: 'The conversation that ended badly ended badly because neither person said the thing they actually meant. Both said adjacent things. The adjacent things were wrong in ways that the actual things would not have been. You know this now. The conversation has been over for years.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s65c', true) },
  },

  {
    id: 'sonder_65_d',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65d,
    text: 'The season that is hardest for you is hard in a way that you have never fully explained to anyone. The explanation would require tracing a line back to something that happened in that season once and left a residue. The residue is not grief. It is something that does not have a common name.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s65d', true) },
  },

  {
    id: 'sonder_65_e',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s65e,
    text: 'The adult you trusted most had a version of themselves that they showed only to you — or that you believed was only for you. You do not know if it was. The belief was part of what made you feel chosen. The feeling of being chosen by that specific person shaped what you looked for afterward.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s65e', true) },
  },

  {
    id: 'sonder_65_f',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s65f,
    text: 'The place you go back to in your mind when you are asked to picture somewhere calm is a specific place you were at a specific time. The place may not be calm now. You are not going back to the place. You are going back to the version of yourself that was calm there, which is a different retrieval.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s65f', true) },
  },

  {
    id: 'sonder_65_g',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65g,
    text: 'You have told the story so many times that the version you tell has replaced the memory it was built from. The original is not accessible. What is accessible is the story you perfected in the telling, which is a different thing and also the only thing you have now.',
    choices: null,
    effect: (p) => { p.setMem('s65g', true) },
  },

  {
    id: 'sonder_65_h',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s65h,
    text: 'The city felt different at three in the morning than it did at any other hour. The streets that during the day belonged to the commercial were empty and briefly yours. You walked through them on the nights you stayed too late somewhere and felt a brief ownership that was really just the absence of competition.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s65h', true) },
  },

  {
    id: 'sonder_65_i',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65i,
    text: 'The work you did that you are most proud of is work that no one noticed at the time. The work that received the most recognition is work you know was not your best. The ratio has not resolved itself into a system you can use. It is just a fact about how recognition and quality are related, which is: imperfectly.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s65i', true) },
  },

  {
    id: 'sonder_65_j',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s65j,
    text: 'The things you expected to feel when you reached this age are not entirely the things you feel. Some expected feelings did not arrive. Some feelings that arrived were not expected. The map you had of this territory was drawn by people who had not been here yet when they drew it.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s65j', true) },
  },

  {
    id: 'sonder_65_k',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s65k,
    text: 'The embarrassment that was most acute at this age — the specific one — involved a moment when you became suddenly visible in a way you had not prepared for. The visibility lasted thirty seconds. The memory of it lasted significantly longer and does not follow the same rules as the original event.',
    choices: null,
    effect: (p) => { p.setMem('s65k', true) },
  },

  {
    id: 'sonder_65_l',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65l,
    text: 'The thing you find it hardest to ask for help with is the thing you are most competent at. The competence created an expectation that you would manage it. The expectation became a kind of isolation. You manage it. It is sometimes harder than it looks from outside.',
    choices: null,
    effect: (p) => { p.setMem('s65l', true) },
  },

  {
    id: 'sonder_65_m',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s65m,
    text: 'The friend who knew you best at twenty-two would find you legible now. The core is the same. The strategies you have developed around the core are different. Some of the strategies are improvements. Some are accommodations that you have stopped questioning.',
    choices: null,
    effect: (p) => { p.setMem('s65m', true) },
  },

  {
    id: 'sonder_65_n',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s65n,
    text: 'The sound that was the sound of being safe — the voice from the other room, the particular click of the gate, the kettle in the kitchen at a specific hour — is stored as a physical sensation rather than a thought. You cannot reproduce the sound, but certain things approximate it and produce something the body recognizes before the mind does.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s65n', true) },
  },

  {
    id: 'sonder_65_o',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65o,
    text: 'You adapted to the compromise so long ago that the original preference is hard to reconstruct. You know there was an original preference. You are not sure it matters now what it was. The compromise is what you have. The compromise has its own satisfactions, which are different from the satisfactions the original preference would have produced.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s65o', true) },
  },

  {
    id: 'sonder_65_p',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s65p,
    text: 'The people you disappointed most are not necessarily the people you most wanted not to disappoint. The people you most wanted not to disappoint were watching for something you also wanted for yourself. The watching was a form of accompaniment. The disappointment, when it came, was shared.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s65p', true) },
  },

  {
    id: 'sonder_65_q',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s65q,
    text: 'The letter you almost sent — the one you drafted and read again and decided not to send — had the real thing in it. The conversation you had instead had a version of the real thing. The version was careful. The letter had been less careful and more true. You do not know what the letter would have done. It is in a drawer or is not in a drawer anymore.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s65q', true) },
  },

  {
    id: 'sonder_65_r',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65r,
    text: 'The task you put off longest is not the hardest task. It is a task of medium difficulty that requires something you have been unable to arrange: the right hour, the right mood, the absence of interruption, the willingness to find out what is on the other side of starting.',
    choices: null,
    effect: (p) => { p.setMem('s65r', true) },
  },

  {
    id: 'sonder_65_s',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s65s,
    text: 'The thing you wanted most was a thing you didn\'t yet have a name for. You knew you wanted it when you encountered the absence of it. The absence was present in certain rooms, certain situations, certain conversations. You navigated around it for years before you could describe what you were navigating around.',
    choices: null,
    effect: (p) => { p.m -= 2; p.setMem('s65s', true) },
  },

  {
    id: 'sonder_65_t',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s65t,
    text: 'The period of your life that your memory has organized most carefully is not the most eventful period. It is a period in which you were paying attention to your own life in a particular way — when the events and the experience of the events were happening simultaneously. The other periods are also there but require more effort to enter.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s65t', true) },
  },

  {
    id: 'sonder_65_u',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65u,
    text: 'The object that has traveled with you through every move is an object whose primary purpose ended years ago. It is still in the category of things you bring. Its presence in the new place is a kind of continuity that does not require acknowledgment to function.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s65u', true) },
  },

  {
    id: 'sonder_65_v',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s65v,
    text: 'The mentor whose advice you followed most carefully is the person whose advice you now sometimes think was not right. Not wrong — not right for you specifically. The advice was right for the person they saw. The person they saw was not the whole person. You have not told them this.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s65v', true) },
  },

  {
    id: 'sonder_65_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65w,
    text: 'The skill you have that is genuinely rare is a skill you came to by accident and can no longer reconstruct how you came to it. You cannot teach it the way it was taught to you because it was not taught to you — it arrived through a sequence of conditions that you cannot replicate.',
    choices: null,
    effect: (p) => { p.setMem('s65w', true) },
  },

  {
    id: 'sonder_65_x',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s65x,
    text: 'The question you most wanted answered at forty is not a question you are still asking. Either it answered itself, or you stopped being the kind of person who needed that particular answer. You are not sure which happened and it no longer matters enough to investigate.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s65x', true) },
  },

  {
    id: 'sonder_65_y',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s65y,
    text: 'The game had rules that were obvious to everyone playing and to no one outside the game. If you tried to explain the rules now you would find them hard to reconstruct because the rules were not learned — they were understood in the process of playing, which is different from learning.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s65y', true) },
  },

  {
    id: 'sonder_65_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65z,
    text: 'The relationship you handle most carefully is a relationship with someone who does not know you are handling it carefully. The care is not condescension. It is knowledge about what that person needs that they have not told you but that you have understood from long attention to the specific way they function.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s65z', true) },
  },

  {
    id: 'sonder_65_aa',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s65aa,
    text: 'You were competent at the thing before you understood what made you competent at it. The understanding came later and did not improve the competence. It gave you language for what you were already doing, which has been useful for explaining it to others but has not changed the doing.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s65aa', true) },
  },

  {
    id: 'sonder_65_ab',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s65ab,
    text: 'The projects you abandoned are not all failures. Some of them were completed in the sense that they were resolved — not by finishing but by becoming unnecessary. The need they were supposed to meet was met some other way. The project stopped before it ended and the ending turned out not to be required.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s65ab', true) },
  },

  {
    id: 'sonder_65_ac',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65ac,
    text: 'The child at the table who did not speak during the whole meal was conducting an elaborate internal monologue that you could not hear. You know this because you were also once a child who did not speak during the whole meal and also conducting an elaborate internal monologue that no one could hear. The adult table you were at thought you were quiet. You were not quiet.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s65ac', true) },
  },

  {
    id: 'sonder_65_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s65ad,
    text: 'What you have built is visible in ways you did not plan for — in the people who learned things from being around you, in the structures that outlasted your involvement in them, in decisions that were made differently because of something you said once that you no longer remember saying. The record of a life is not only the things you meant to contribute.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s65ad', true) },
  },

]
