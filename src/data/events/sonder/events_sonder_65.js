// Sonder module 65 — 30 contemplative events
// Weight 2, null choices, all mem-gated. Universal human texture.

export const EVENTS_SONDER_65 = [

{
    id: 'sonder_65_b',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s65b,
    text: 'Whoever taught you to do this does not know you have been teaching it. You have never told them. The knowledge passed from them to you and from you outward and they are the source of something they cannot see.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s65b', true) },
  },

{
    id: 'sonder_65_d',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65d,
    text: 'One season is hardest for you, and hard in a way you have never fully explained to anyone. The explanation would require tracing a line back to something that happened in that season once and left a residue. The residue is not grief. It is something that does not have a common name.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s65d', true) },
  },

  {
    id: 'sonder_65_e',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s65e,
    text: 'One adult you trusted had a version of themselves they showed only to you — or that you believed was only for you. You do not know if it was. The belief was part of what made you feel chosen. The feeling of being chosen by that specific person shaped what you looked for afterward.',
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
    id: 'sonder_65_i',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65i,
    text: 'You are proudest of work that no one noticed at the time. The work that received the most recognition is work you know was not your best. The ratio has not resolved itself into a system you can use. It is just a fact about how recognition and quality are related, which is: imperfectly.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s65i', true) },
  },

  {
    id: 'sonder_65_j',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s65j,
    text: 'What you expected to feel at this age is not entirely what you feel. Some expected feelings did not arrive. Some feelings that arrived were not expected. The map you had of this territory was drawn by people who had not been here yet when they drew it.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s65j', true) },
  },

  {
    id: 'sonder_65_k',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s65k,
    text: 'Embarrassment is most acute at this age — the specific one — involved a moment when you became suddenly visible in a way you had not prepared for. The visibility lasted thirty seconds. The memory of it lasted significantly longer and does not follow the same rules as the original event.',
    choices: null,
    effect: (p) => { p.setMem('s65k', true) },
  },

  {
    id: 'sonder_65_l',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65l,
    text: 'You find it hardest to ask for help with the thing you are most competent at. The competence created an expectation that you would manage it. The expectation became a kind of isolation. You manage it. It is sometimes harder than it looks from outside.',
    choices: null,
    effect: (p) => { p.setMem('s65l', true) },
  },

{
    id: 'sonder_65_n',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s65n,
    text: 'One sound was the sound of being safe — the voice from the other room, the particular click of the gate, the kettle in the kitchen at a specific hour — is stored as a physical sensation rather than a thought. You cannot reproduce the sound, but certain things approximate it and produce something the body recognizes before the mind does.',
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
    text: 'You disappointed people who were not necessarily the people you most wanted not to disappoint. The people you most wanted not to disappoint were watching for something you also wanted for yourself. The watching was a form of accompaniment. The disappointment, when it came, was shared.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s65p', true) },
  },

{
    id: 'sonder_65_r',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65r,
    text: 'You put off longest a task that is not the hardest one. It is a task of medium difficulty that requires something you have been unable to arrange: the right hour, the right mood, the absence of interruption, the willingness to find out what is on the other side of starting.',
    choices: null,
    effect: (p) => { p.setMem('s65r', true) },
  },

  {
    id: 'sonder_65_s',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s65s,
    text: 'What you wanted most was something you did not yet have a name for. You knew you wanted it when you encountered the absence of it. The absence was present in certain rooms, certain situations, certain conversations. You navigated around it for years before you could describe what you were navigating around.',
    choices: null,
    effect: (p) => { p.m -= 2; p.setMem('s65s', true) },
  },

  {
    id: 'sonder_65_t',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s65t,
    text: 'Your memory has organized one period most carefully, and it is not the most eventful one. It is a period in which you were paying attention to your own life in a particular way — when the events and the experience of the events were happening simultaneously. The other periods are also there but require more effort to enter.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s65t', true) },
  },

{
    id: 'sonder_65_v',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s65v,
    text: 'You followed one person\'s advice most carefully and now sometimes think it was not right. Not wrong — not right for you specifically. The advice was right for the person they saw. The person they saw was not the whole person. You have not told them this.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s65v', true) },
  },

  {
    id: 'sonder_65_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65w,
    text: 'You have one genuinely rare skill, arrived at by accident, and you can no longer reconstruct how. You cannot teach it the way it was taught to you because it was not taught to you — it arrived through a sequence of conditions that you cannot replicate.',
    choices: null,
    effect: (p) => { p.setMem('s65w', true) },
  },

  {
    id: 'sonder_65_x',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s65x,
    text: 'What you most wanted answered at forty is not something you are still asking. Either it answered itself, or you stopped being the kind of person who needed that particular answer. You are not sure which happened and it no longer matters enough to investigate.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s65x', true) },
  },

  {
    id: 'sonder_65_y',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s65y,
    text: 'A game had rules that were obvious to everyone playing and to no one outside it. If you tried to explain the rules now you would find them hard to reconstruct because the rules were not learned — they were understood in the process of playing, which is different from learning.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s65y', true) },
  },

  {
    id: 'sonder_65_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65z,
    text: 'You handle one relationship most carefully, with someone who does not know you are handling it carefully. The care is not condescension. It is knowledge about what that person needs that they have not told you but that you have understood from long attention to the way they function.',
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
    text: 'Not everything you abandoned is a failure. Some of them were completed in the sense that they were resolved — not by finishing but by becoming unnecessary. The need they were supposed to meet was met some other way. The project stopped before it ended and the ending turned out not to be required.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s65ab', true) },
  },

  {
    id: 'sonder_65_ac',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s65ac,
    text: 'A child at the table did not speak during the whole meal and was conducting an elaborate internal monologue you could not hear. You know this because you were also once a child who did not speak during the whole meal and also conducting an elaborate internal monologue that no one could hear. The adult table you were at thought you were quiet. You were not quiet.',
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
