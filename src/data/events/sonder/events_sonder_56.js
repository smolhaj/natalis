// events_sonder_56.js — contemplative layer, weight 2, all mem-gated

export const EVENTS_SONDER_56 = [

  {
    id: 'sonder_56_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s56a,
    text: 'You catch yourself using a phrase you have never consciously chosen. It is something your mother said, or someone from the first place you worked. You try to find where it entered you and cannot find the seam.',
    choices: null,
    effect: (p) => { p.setMem('s56a', true) },
  },

  {
    id: 'sonder_56_b',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s56b,
    text: 'The noise of a city at four in the morning — reduced to its constituent parts: the distant truck, the one lit window, the bird that has the time wrong. You are awake for no reason and the city is almost legible in a way it is not when it is full.',
    choices: null,
    effect: (p) => { p.setMem('s56b', true) },
  },

  {
    id: 'sonder_56_c',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 30 && !G.mem?.s56c,
    text: 'A decade from now you will think of this period as the one when everything was still open. You do not know this yet. You are inside it.',
    choices: null,
    effect: (p) => { p.setMem('s56c', true) },
  },

  {
    id: 'sonder_56_d',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 11 && !G.mem?.s56d,
    text: 'You discover that adults are sometimes wrong, and then spend several months treating this as a more interesting fact than it will eventually seem. Everything looks different from inside the discovery.',
    choices: null,
    effect: (p) => { p.setMem('s56d', true) },
  },

  {
    id: 'sonder_56_e',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 55 && !G.mem?.s56e,
    text: 'You finish something you started — a book, a project, a year of not doing the thing — and feel, for a moment, very little. The feeling arrives later, smaller than you expected, and lasts longer.',
    choices: null,
    effect: (p) => { p.setMem('s56e', true) },
  },

  {
    id: 'sonder_56_f',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 24 && G.age <= 32 && !G.mem?.s56f,
    text: 'The apartment is the right size for a person who has not yet accumulated things. You do not think of it as insufficient. You will remember it later as the period of the right-sized life.',
    choices: null,
    effect: (p) => { p.setMem('s56f', true) },
  },

  {
    id: 'sonder_56_g',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s56g,
    text: 'The friend who moved away and stayed away. You exchange messages at significant intervals — birthdays, deaths, large things. The friendship is preserved in amber. You are not sure it is still friendship in the operating sense. You are not sure this matters.',
    choices: null,
    effect: (p) => { p.setMem('s56g', true) },
  },

  {
    id: 'sonder_56_h',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 52 && !G.mem?.s56h,
    text: 'You have become the person who arrives on time. You do not remember choosing this. The version of you who ran late everywhere has simply disappeared, replaced by someone who calculates travel time and adds ten minutes and still manages to be the first one there.',
    choices: null,
    effect: (p) => { p.setMem('s56h', true) },
  },

  {
    id: 'sonder_56_i',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 14 && G.age <= 17 && !G.mem?.s56i,
    text: 'There is a person at school who has noticed you in a way that has changed the texture of every day. You are not sure they know they have done this. You are not sure you could explain it.',
    choices: null,
    effect: (p) => { p.setMem('s56i', true) },
  },

  {
    id: 'sonder_56_j',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s56j,
    text: 'The things you owned that you no longer own: the bicycle, the coat, the specific chair. You cannot always remember what happened to them. They departed without ceremony. The inventory of their absence is something you do unexpectedly in the middle of other thoughts.',
    choices: null,
    effect: (p) => { p.setMem('s56j', true) },
  },

  {
    id: 'sonder_56_k',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && !G.mem?.s56k,
    text: 'You call the number and get a recording that says the number is no longer in service. The person is still alive — you know this — but the line that connected you for thirty years no longer goes to them. You sit with this for a moment longer than necessary.',
    choices: null,
    effect: (p) => { p.setMem('s56k', true) },
  },

  {
    id: 'sonder_56_l',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 28 && !G.mem?.s56l,
    text: 'The meal you have eaten two hundred times without thinking about it becomes, briefly, the thing that tells you where you are from. You are eating it alone, in a different city, and it carries more information than a meal should carry.',
    choices: null,
    effect: (p) => { p.setMem('s56l', true) },
  },

  {
    id: 'sonder_56_m',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 12 && !G.mem?.s56m,
    text: 'The sound of a particular house at night: the pipes, the particular creak, the way the refrigerator hums. These are sounds you will be able to reproduce in your mind thirty years later with perfect fidelity, though you will not know you remember them until you hear something similar.',
    choices: null,
    effect: (p) => { p.setMem('s56m', true) },
  },

  {
    id: 'sonder_56_n',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 45 && G.age <= 58 && !G.mem?.s56n,
    text: 'You stop mid-sentence because you cannot find the word. Not a complex word — a common one. The word returns in thirty seconds but the thirty seconds is new, and you note it.',
    choices: null,
    effect: (p) => { p.setMem('s56n', true) },
  },

  {
    id: 'sonder_56_o',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 26 && G.age <= 35 && !G.mem?.s56o,
    text: 'The opinion you held at twenty-two which you now find embarrassing without quite being able to remember why you held it. The memory of having held it is clear. The reasoning that produced it is gone.',
    choices: null,
    effect: (p) => { p.setMem('s56o', true) },
  },

  {
    id: 'sonder_56_p',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.s56p,
    text: 'The street where you grew up exists now only in the form it had when you lived there. The current street, with its different shops and its different people, does not interfere with the original. Both versions persist. You are fluent in one and the other is the real one.',
    choices: null,
    effect: (p) => { p.setMem('s56p', true) },
  },

  {
    id: 'sonder_56_q',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 36 && G.age <= 48 && !G.mem?.s56q,
    text: 'A stranger on a train is reading the same book you read at twenty-three. The book changed something for you. The stranger is on the page where you remember being changed. You do not speak. You watch them turn the page.',
    choices: null,
    effect: (p) => { p.setMem('s56q', true) },
  },

  {
    id: 'sonder_56_r',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 15 && G.age <= 17 && !G.mem?.s56r,
    text: 'The problem with the afternoon: it is long and empty and full of a feeling you do not have a name for yet. Later you will call it longing or restlessness or youth. Right now it is just the long afternoon.',
    choices: null,
    effect: (p) => { p.setMem('s56r', true) },
  },

  {
    id: 'sonder_56_s',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 44 && !G.mem?.s56s,
    text: 'The colleague who knows all the same things you know, who has been at the desk beside yours for seven years. You have had the same conversation about the same problem more times than you can count. This is what most of a working life is. This is not diminished by being most of it.',
    choices: null,
    effect: (p) => { p.setMem('s56s', true) },
  },

  {
    id: 'sonder_56_t',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s56t,
    text: 'You have become someone who knows how to wait. You do not know when this happened. Waiting used to be a cost. Now it is the time between things — unremarkable, sometimes pleasant, always temporary.',
    choices: null,
    effect: (p) => { p.setMem('s56t', true) },
  },

  {
    id: 'sonder_56_u',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 24 && !G.mem?.s56u,
    text: 'The confidence of people your age who seem to know exactly what they want. You watch them from the position of not knowing and wonder if the knowing is real or performed and cannot tell the difference, which may itself be the answer.',
    choices: null,
    effect: (p) => { p.setMem('s56u', true) },
  },

  {
    id: 'sonder_56_v',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 50 && !G.mem?.s56v,
    text: 'You have started doing the thing your parent did — the gesture, the phrase, the particular way of reacting to difficulty — without any decision to do it. It arrived on its own. You are not sure whether to be unsettled or reassured.',
    choices: null,
    effect: (p) => { p.setMem('s56v', true) },
  },

  {
    id: 'sonder_56_w',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 9 && G.age <= 13 && !G.mem?.s56w,
    text: 'The book you find in the house that is for adults — not forbidden, just not yours — and read in the gap between what it was written for and what you make of it at eleven. The making is partial. The partial is still an opening.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s56w', true) },
  },

  {
    id: 'sonder_56_x',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.s56x,
    text: 'Someone shows you a photograph you are in but do not remember being taken. The person you are in the photograph is younger, thinner, holding something you no longer own, standing somewhere you can now only approximately place. You are in it. It is not you.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s56x', true) },
  },

  {
    id: 'sonder_56_y',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 50 && !G.mem?.s56y,
    text: 'Rain on a window you are not near. You can hear it but not see it. The sound places you in a room from twenty years ago with no logic you can follow. The room is precise: the colour of the wall, the specific quality of afternoon, who was on the other side of the door.',
    choices: null,
    effect: (p) => { p.setMem('s56y', true) },
  },

  {
    id: 'sonder_56_z',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 32 && !G.mem?.s56z,
    text: 'You have been to the same place enough times that you can walk it in memory. The weight of the familiar is different from the weight of the unfamiliar. You are learning to prefer the one you have chosen over the one that was simply available.',
    choices: null,
    effect: (p) => { p.setMem('s56z', true) },
  },

  {
    id: 'sonder_56_aa',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 70 && !G.mem?.s56aa,
    text: 'The grandchild asks you what it was like before. Before what, you ask. Before everything, they say. You understand they mean before the things they cannot imagine being without. You try to describe the before and find that what made it real was not the absence of the things they have but the presence of different things, which is harder to explain.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s56aa', true) },
  },

  {
    id: 'sonder_56_ab',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 48 && !G.mem?.s56ab,
    text: 'The habit you broke ten years ago that you find yourself almost performing today — the old reach for the cigarette, the drink, the particular coping — and then do not perform. The not-performing is not easy. It is easier than it was. The gap between the two is the decade.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s56ab', true) },
  },

  {
    id: 'sonder_56_ac',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 29 && !G.mem?.s56ac,
    text: 'The friend group that felt permanent at twenty-three is already stratifying at twenty-eight. Some have moved. Some have had children. Some have not changed and the not-changing is its own kind of change. You are watching a formation that felt like weather become something more provisional.',
    choices: null,
    effect: (p) => { p.setMem('s56ac', true) },
  },

  {
    id: 'sonder_56_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 75 && !G.mem?.s56ad,
    text: 'You find that you are not afraid of the dark in the way you once were, or of certain kinds of silence, or of being alone. The things that frightened you have been replaced by different things, and those different things are also manageable, more or less, most of the time. This seems like progress, though you know it is also just what happens.',
    choices: null,
    effect: (p) => { p.m += 2; p.r -= 2; p.setMem('s56ad', true) },
  },

]
