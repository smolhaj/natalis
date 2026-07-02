// Sonder module 60 — 30 contemplative events
// Weight 2, null choices, all mem-gated. Universal human texture.

export const EVENTS_SONDER_60 = [

  {
    id: 'sonder_60_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s60a,
    text: 'The handwriting on the envelope is from someone who has been dead for years. For a moment before you process what you are looking at, you think the letter arrived today.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s60a', true) },
  },

  {
    id: 'sonder_60_b',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s60b,
    text: 'There is a specific quality to the tiredness you feel at the end of a day when nothing went wrong. It is different from the tiredness of difficulty. It is heavier.',
    choices: null,
    effect: (p) => { p.setMem('s60b', true) },
  },

  {
    id: 'sonder_60_c',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s60c,
    text: 'The playground has a particular smell in rain — the rubber and the wet earth and the metal of the climbing frame. You will not be able to name this smell as an adult but you will recognise it.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s60c', true) },
  },

  {
    id: 'sonder_60_d',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s60d,
    text: 'You are walking behind someone who has the exact posture your father had. The walk, the way the shoulders carry the weight. It is not him. You know that. You slow down anyway.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s60d', true) },
  },

  {
    id: 'sonder_60_e',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s60e,
    text: 'The argument you rehearsed on the walk to the meeting was not the argument you needed. The actual conversation required something you had not prepared. This keeps happening.',
    choices: null,
    effect: (p) => { p.setMem('s60e', true) },
  },

  {
    id: 'sonder_60_f',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s60f,
    text: 'The building you lived in for three years has been demolished. You know this because someone mentioned it. You have not been back to check. The knowledge is enough and also not quite enough.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s60f', true) },
  },

  {
    id: 'sonder_60_g',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s60g,
    text: 'You can no longer remember what you were angry about for the first six months of that particular year. The feeling is still there, dimly, under the memory. The reason has gone.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s60g', true) },
  },

  {
    id: 'sonder_60_h',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s60h,
    text: 'The group you belonged to in school had rules nobody said out loud. You did not know what the rules were until you broke one. You still do not know what all of them were.',
    choices: null,
    effect: (p) => { p.setMem('s60h', true) },
  },

  {
    id: 'sonder_60_i',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s60i,
    text: 'There is a person in your life who has never seen you at your best. The version of you they know is the version from a difficult period. You have never found the right time to address this.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s60i', true) },
  },

  {
    id: 'sonder_60_j',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s60j,
    text: 'You finished the book and set it down and sat for a while doing nothing. This happens rarely. You are aware it happened and that you are aware of it happening, which is already too much awareness.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s60j', true) },
  },

  {
    id: 'sonder_60_k',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s60k,
    text: 'The phrase you use most often at work — the one you say without thinking twenty times a week — is one you picked up from someone you have not thought about in years. The phrase is still there. They are not.',
    choices: null,
    effect: (p) => { p.setMem('s60k', true) },
  },

  {
    id: 'sonder_60_l',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s60l,
    text: 'You have started telling the same two stories. People who have known you a long time already know which ones they are. You know you are telling them again. The telling is not fully within your control.',
    choices: null,
    effect: (p) => { p.setMem('s60l', true) },
  },

  {
    id: 'sonder_60_m',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s60m,
    text: 'The photograph of you at that age — you have seen it recently, someone found it — shows a person who looks uncertain about something. You cannot remember being uncertain about that particular thing. The uncertainty must have resolved itself.',
    choices: null,
    effect: (p) => { p.setMem('s60m', true) },
  },

  {
    id: 'sonder_60_n',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s60n,
    text: 'The shortcut through the market — past the fish stall and the woman who sells vegetables, left at the corner with the blue wall — takes eleven minutes less than the main road. You have been taking it for years. Nobody else seems to know it exists.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s60n', true) },
  },

  {
    id: 'sonder_60_o',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s60o,
    text: 'You are watching someone do something the slow way, and you know the fast way, and you do not say anything. Knowing this about yourself — that you no longer intervene — is new information.',
    choices: null,
    effect: (p) => { p.setMem('s60o', true) },
  },

  {
    id: 'sonder_60_p',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s60p,
    text: 'There is a sound the house makes at night that is not threatening but would be impossible to explain to someone who had not grown up in it. You have stopped hearing it. It is still there.',
    choices: null,
    effect: (p) => { p.setMem('s60p', true) },
  },

  {
    id: 'sonder_60_q',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s60q,
    text: 'The decision you agonised over for six months turned out not to matter as much as the decision you made without thinking on a Tuesday afternoon. You noticed this pattern once and then forgot it.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s60q', true) },
  },

  {
    id: 'sonder_60_r',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s60r,
    text: 'The city you live in now has a geography you know in your body — the hills, the distances, the smell of different neighbourhoods at different hours. You did not choose to learn it. You just did, over time.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s60r', true) },
  },

  {
    id: 'sonder_60_s',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s60s,
    text: 'There is a specific silence between people who have known each other long enough. It does not need filling. You have this with one person. Possibly two. The number is not going to get larger.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s60s', true) },
  },

  {
    id: 'sonder_60_t',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s60t,
    text: 'The teacher who said the thing you still remember did not know they were saying something you would still remember. They were in the middle of another sentence and it came out. You carried it and they didn\'t know.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s60t', true) },
  },

  {
    id: 'sonder_60_u',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s60u,
    text: 'You are no longer the youngest person in most rooms. This happened gradually and then it was simply true. The adjustment is not dramatic. It is more like a new understanding of where you stand.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s60u', true) },
  },

  {
    id: 'sonder_60_v',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s60v,
    text: 'The object has been on the shelf since before you moved in. You have no idea where it came from or who put it there. At some point it became part of what the shelf looks like and you stopped asking.',
    choices: null,
    effect: (p) => { p.setMem('s60v', true) },
  },

  {
    id: 'sonder_60_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s60w,
    text: 'The news arrived during something ordinary — washing up, or walking to the bus — and you finished the ordinary thing before letting it in. The gap between the news and your response was about thirty seconds. You still think about that gap.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s60w', true) },
  },

  {
    id: 'sonder_60_x',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s60x,
    text: 'The animal knew something was wrong before you did. You do not know how. You have no explanation for it. You simply remember that the animal knew first and then you knew and there is no useful theory that connects them.',
    choices: null,
    effect: (p) => { p.setMem('s60x', true) },
  },

  {
    id: 'sonder_60_y',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s60y,
    text: 'The party where you knew no one: at some point you stopped being uncomfortable and started watching. The room was interesting in a way it had not been when you were trying to be in it. You stayed longer than you expected.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s60y', true) },
  },

  {
    id: 'sonder_60_z',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s60z,
    text: 'Certain sounds have started to carry. A door closing in another part of the building. The chair on the floor above. You hear things now that you did not use to hear. You do not know what changed.',
    choices: null,
    effect: (p) => { p.setMem('s60z', true) },
  },

  {
    id: 'sonder_60_aa',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s60aa,
    text: 'You learned the route home by feeling rather than thinking — the corner with the broken step, the gate that sticks, the dog behind the blue fence that barks and then stops. The body learned it before the mind did.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s60aa', true) },
  },

  {
    id: 'sonder_60_ab',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s60ab,
    text: 'There is a version of events you told so many times it became the true version. You are no longer certain which details were in the original and which arrived later. The story is accurate. The memory is something else.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s60ab', true) },
  },

  {
    id: 'sonder_60_ac',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s60ac,
    text: 'The light in the apartment across the way goes on at the same time every morning. You have never seen the person who turns it on. They have a schedule. They are consistent. You find this, for reasons you cannot fully explain, reassuring.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s60ac', true) },
  },

  {
    id: 'sonder_60_ad',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s60ad,
    text: 'You were introduced to someone at a gathering and five minutes later could not remember their name. This used to embarrass you. Now you wait a few minutes and ask again. The embarrassment and the asking both became easier at approximately the same age.',
    choices: null,
    effect: (p) => { p.setMem('s60ad', true) },
  },

]
