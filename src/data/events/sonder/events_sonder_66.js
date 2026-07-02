// Sonder module 66 — 30 contemplative events
// Weight 2, null choices, all mem-gated. Universal human texture.

export const EVENTS_SONDER_66 = [

  {
    id: 'sonder_66_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s66a,
    text: 'The routine that has kept you functional is not the routine you would have chosen. It is the routine that emerged from constraints and became, through repetition, the shape of your days. You have not evaluated it recently. It does not occur to you to evaluate it most mornings. The most functional routines are the ones you no longer notice.',
    choices: null,
    effect: (p) => { p.setMem('s66a', true) },
  },

  {
    id: 'sonder_66_b',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s66b,
    text: 'The photograph from that year: you are doing something ordinary and you are younger than you thought of yourself as at the time. The gap between how old you felt and how old you were is visible only in retrospect. At the time you felt the age you were used to feeling, which is all anyone feels.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s66b', true) },
  },

  {
    id: 'sonder_66_c',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s66c,
    text: 'The apartment you lived in alone for the first time had a particular sound at night — the pipes, the neighbors, the street at certain hours. You slept through it after two weeks. But the first two weeks you listened to the building and learned it the way you would learn a new person: attending to what it did when it thought no one was watching.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s66c', true) },
  },

  {
    id: 'sonder_66_d',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s66d,
    text: 'The colleague you have worked alongside for ten years knows a version of you that your family does not know. Not a better version. A version shaped by the particular demands of the work and the particular audience of the workplace. You are not performing at work. You are also not fully yourself.',
    choices: null,
    effect: (p) => { p.setMem('s66d', true) },
  },

  {
    id: 'sonder_66_e',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s66e,
    text: 'You believed for several years something that was not true — a geographical fact, a biological fact, something about how the world worked — and the belief was not corrected because no one thought to correct it, because it was the kind of thing that adults assume children know. The discovery that it was wrong came from a casual remark someone made in passing. The remark restructured a small piece of your model of the world.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s66e', true) },
  },

  {
    id: 'sonder_66_f',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s66f,
    text: 'The song that was the sound of that summer is available now in a way it was not then — any time, through any speaker — and yet hearing it deliberately is a different thing from hearing it accidentally. The accidental version ambushes you. The deliberate version reminds you. They retrieve different versions of the same memory.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s66f', true) },
  },

  {
    id: 'sonder_66_g',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s66g,
    text: 'The advice you give most often is advice you did not take when you needed it. This is not hypocrisy. The advice became available to you through the experience of not taking it, and you give it in the hope that someone else can take it without needing the experience. The hope is usually not fulfilled. The advice is usually not taken. People learn this the same way you learned it.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s66g', true) },
  },

  {
    id: 'sonder_66_h',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s66h,
    text: 'The house — or the apartment, or the room — has absorbed years of your particular way of living: where things land when you put them down, which light switch gets touched first, the corner where things accumulate that should probably go somewhere but have been here so long they are part of the room. A stranger would see clutter. You see the biography of your habits.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s66h', true) },
  },

  {
    id: 'sonder_66_i',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s66i,
    text: 'The failure you learned the most from is not the failure you talk about when you talk about learning from failure. The failure you talk about is the one that can be narratively resolved — it led to something, it taught a specific lesson, it has a tidy ending. The other one is still open.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s66i', true) },
  },

  {
    id: 'sonder_66_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s66j,
    text: 'The person you called about the news that happened today — before you fully processed the news, before you knew how to feel about it — is the person you trust most. The speed of the call is the evidence. The list of people you would call first is short and has changed over the decades and its current state says something about the decade you are in.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s66j', true) },
  },

  {
    id: 'sonder_66_k',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s66k,
    text: 'The argument you made at thirty-five with great confidence and some rightness is an argument you would make differently now. Not wrong — differently. The difference is not less conviction but more awareness of what the conviction was standing on and what it wasn\'t. The thirty-five-year-old was also right. The rightness and the incompleteness coexisted.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s66k', true) },
  },

  {
    id: 'sonder_66_l',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s66l,
    text: 'The place you went when you needed to be alone was a place that the adults in your life probably knew about but left alone. The privacy was partly theirs — they decided not to intrude. You didn\'t know this at the time. You thought the hiding place was secret. It was secret enough.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s66l', true) },
  },

  {
    id: 'sonder_66_m',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s66m,
    text: 'The meeting that you thought was going badly was going fine. The meeting that you thought was going well was not going as well as you thought. The gap between how you read the room and what the room contained is consistent enough to tell you something about yourself that you do not fully act on.',
    choices: null,
    effect: (p) => { p.setMem('s66m', true) },
  },

  {
    id: 'sonder_66_n',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s66n,
    text: 'The person sitting across from you on public transport has a life in which you are a brief, forgettable stranger. They looked up when you sat down and then away. In their account of today you do not exist. You are glad of this. The anonymity of transit is a kind of rest.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s66n', true) },
  },

  {
    id: 'sonder_66_o',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s66o,
    text: 'The health system has become a more familiar environment than you wanted it to be. The waiting rooms. The forms. The difference between a doctor who sees the chart and a doctor who sees the person who brought the chart. You have learned to distinguish them quickly. This is a skill that costs something to develop.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s66o', true) },
  },

  {
    id: 'sonder_66_p',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s66p,
    text: 'The window of the office building across the street, lit at two in the morning: someone is there. You do not know what they are doing. The knowing-that-they-are-there without knowing anything else is a pure form of sonder — the full weight of another life, compressed into a single lit rectangle.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s66p', true) },
  },

  {
    id: 'sonder_66_q',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s66q,
    text: 'The teacher who pushed you hardest did not know they were pushing you. They were teaching the subject. The pressure that landed on you as pressure was coming from somewhere in you that the teacher happened to activate. The teacher would not remember you in quite the way you remember them.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s66q', true) },
  },

  {
    id: 'sonder_66_r',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s66r,
    text: 'The email in your drafts folder that you have not sent for six months is not waiting to be sent. It is waiting to be deleted. You have not deleted it because deleting it is a decision and sending it was also a decision and you are still avoiding both decisions simultaneously, which takes very little energy once you stop noticing the folder exists.',
    choices: null,
    effect: (p) => { p.setMem('s66r', true) },
  },

  {
    id: 'sonder_66_s',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s66s,
    text: 'The generation below you makes different kinds of mistakes than you made. Not better or worse — structured differently, caused by different things. Watching them makes you aware that your mistakes were also structured by the particular pressures and blindnesses of your time, which you did not see at the time because they were the water you were in.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s66s', true) },
  },

  {
    id: 'sonder_66_t',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s66t,
    text: 'The pleasure you take in the specific ordinary thing — the particular tea, the specific walk, the hour you protect in the evening — is a pleasure that has refined itself over years of learning what you actually want rather than what you thought you should want. This is one of the advantages of having lived long enough.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s66t', true) },
  },

  {
    id: 'sonder_66_u',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s66u,
    text: 'The imaginary world you built was architecturally consistent — the geography held, the rules applied, the history of the place accumulated between sessions. You maintained it across weeks or months. You inhabited it more fully than most adults inhabit any single space. The capacity to do this did not disappear when you grew up. It went somewhere else.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s66u', true) },
  },

  {
    id: 'sonder_66_v',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s66v,
    text: 'The moment you chose one path rather than another: you remember it as more of a decision than it was. The path was partly chosen and partly fallen into — the timing, the available options, the particular state you were in that week. The decision and the falling-into happened together and you remember the deciding part because it is more narratively useful.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s66v', true) },
  },

  {
    id: 'sonder_66_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s66w,
    text: 'The category of things you are never going to do is larger than it used to be and also less troubling. The narrowing is not loss. It is the clarification that comes from knowing yourself well enough to be honest about what is actually yours and what was always someone else\'s ambition for you.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s66w', true) },
  },

  {
    id: 'sonder_66_x',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s66x,
    text: 'The news of the day has become hard to hold at the level of feeling it seems to require. You feel it, briefly, and then it joins the category of things that are true and ongoing and that you cannot act on. You do not know if this is wisdom or exhaustion or what the difference would look like from the inside.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s66x', true) },
  },

  {
    id: 'sonder_66_y',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s66y,
    text: 'The social map of the school was legible to everyone who was in it and opaque to anyone who was not. The rules about who could sit where, who could speak to whom, which combinations were permitted and which were social violations — these were never written and were known by everyone. The rules changed without announcement and the fact of the change was itself communicated through the social map.',
    choices: null,
    effect: (p) => { p.setMem('s66y', true) },
  },

  {
    id: 'sonder_66_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s66z,
    text: 'The thing you make that is yours — the meal, the garden, the arrangement, whatever form the making takes — produces a satisfaction that operates outside language. You do not narrate it. It does not require narration. It is the oldest category of satisfaction: the thing existed and you made it and the making was the point.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s66z', true) },
  },

  {
    id: 'sonder_66_aa',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s66aa,
    text: 'You are at a point in your life where the gap between who you were supposed to become and who you are becoming is becoming visible. The gap is not a failure. It is an acknowledgment that the person who was supposed to become something was working with less information than you now have. The revision is ongoing.',
    choices: null,
    effect: (p) => { p.setMem('s66aa', true) },
  },

  {
    id: 'sonder_66_ab',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s66ab,
    text: 'The question of whether the life you lived was the right life for you to have lived: you have not resolved it and do not expect to. The question is not the kind that resolves. It is the kind that becomes less urgent through familiarity — not answered but held more easily, the way you hold the weight of anything you have carried long enough.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s66ab', true) },
  },

  {
    id: 'sonder_66_ac',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s66ac,
    text: 'The moment at the party when you said the right thing, the thing that landed, that the room received — you still have it. It is in the small treasury of moments when the gap between what you meant and what was heard closed completely. Those moments are rarer than they look from outside.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s66ac', true) },
  },

  {
    id: 'sonder_66_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s66ad,
    text: 'The smaller circle you move in now — fewer people, more familiar, less effort spent on maintenance — is not diminishment. It is selection. You know now which connections replenish and which ones cost. The knowledge came slowly and arrived as a reduction in the size of the world you need.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s66ad', true) },
  },

]
