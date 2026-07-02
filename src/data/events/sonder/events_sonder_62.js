// Sonder module 62 — 30 contemplative events
// Weight 2, null choices, all mem-gated. Universal human texture.

export const EVENTS_SONDER_62 = [

  {
    id: 'sonder_62_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s62a,
    text: 'The list you made in January is still where you left it. Some things on the list happened without being crossed off. Some things you crossed off before they were finished. Some things you do not remember putting on the list and cannot now explain.',
    choices: null,
    effect: (p) => { p.setMem('s62a', true) },
  },

  {
    id: 'sonder_62_b',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s62b,
    text: 'You borrowed the habit of saying a particular phrase from someone you admired at twenty-two. The phrase transferred before you noticed it had transferred. The person you borrowed it from may not remember saying it. You have been saying it for fifteen years.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s62b', true) },
  },

  {
    id: 'sonder_62_c',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s62c,
    text: 'The handwriting on the envelope is your mother\'s handwriting and your mother has been dead for eleven years. The envelope is old — you found it in a box — and the handwriting is exactly as you remember it, which is to say more familiar than your own handwriting, since you do not often see your own handwriting from the outside.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s62c', true) },
  },

  {
    id: 'sonder_62_d',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s62d,
    text: 'The shorter route takes the same amount of time as the longer route because of the light at the bottom of the hill. You discovered this three years ago and have continued taking the shorter route anyway. The knowledge does not change the preference.',
    choices: null,
    effect: (p) => { p.setMem('s62d', true) },
  },

  {
    id: 'sonder_62_e',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s62e,
    text: 'The map of the world that hung in the classroom placed your country near the center. Every map places something near the center. The centering felt like information. It was also a choice someone made before you were old enough to know choices were being made.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s62e', true) },
  },

  {
    id: 'sonder_62_f',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s62f,
    text: 'Your colleague mentioned offhand a difficulty she has been managing for two years. You did not know. You have seen her every working day for two years. You did not know. The information she carried through those two years of daily proximity was not visible in the daily proximity.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s62f', true) },
  },

  {
    id: 'sonder_62_g',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s62g,
    text: 'The job you did not get led to the job you got, which led to the circumstance in which you met the person you are still in contact with. The chain is visible in retrospect. You have tried to follow it back to the precise point where it diverged from another chain and cannot.',
    choices: null,
    effect: (p) => { p.setMem('s62g', true) },
  },

  {
    id: 'sonder_62_h',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s62h,
    text: 'The word you mispronounced for four years was not corrected by anyone who heard it. Either they did not notice or they did not want to embarrass you. The not-correcting was a form of something. You are not sure if it was kindness.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s62h', true) },
  },

  {
    id: 'sonder_62_i',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s62i,
    text: 'The things you thought would be hard to give up were not hard to give up. The things you thought you could easily do without turned out to be the structure of the day. The inventory was wrong. You are still updating it.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s62i', true) },
  },

  {
    id: 'sonder_62_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s62j,
    text: 'The object was a gift from someone you are no longer in contact with. You have kept the object because you like the object, not because of the person, but the person is in the object now and is retrievable from the object whether you want to retrieve them or not.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s62j', true) },
  },

  {
    id: 'sonder_62_k',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s62k,
    text: 'The city you moved to was described to you before you arrived by people who had visited it. Their descriptions were accurate and did not match what you found. Description is a different thing from the place. You knew this in principle. You know it now in practice.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s62k', true) },
  },

  {
    id: 'sonder_62_l',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s62l,
    text: 'You have reached an age at which people younger than you are making decisions that affect you. This is not a complaint. It is a description of how time distributes authority. The description is accurate. It is also new, in the way that everything obvious becomes new when it becomes personal.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s62l', true) },
  },

  {
    id: 'sonder_62_m',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s62m,
    text: 'The version of you that exists in the stories your parent tells about you is not wrong, exactly. It emphasizes different things. The person in those stories is related to you in the way that a photograph taken from one angle is related to the person photographed from all angles.',
    choices: null,
    effect: (p) => { p.setMem('s62m', true) },
  },

  {
    id: 'sonder_62_n',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s62n,
    text: 'The smell of a particular classroom — chalk dust, the particular wood of the desks, something that came through the window in autumn — is retrievable in full from certain other smells that have no connection to the classroom. The retrieval is automatic. The classroom is there before you decide to go back to it.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s62n', true) },
  },

  {
    id: 'sonder_62_o',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s62o,
    text: 'You have stopped arguing about several things you used to argue about. Not because you changed your position. Because the argument was not going anywhere and the not-going-anywhere was using something you needed for other things.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s62o', true) },
  },

  {
    id: 'sonder_62_p',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s62p,
    text: 'The person at the table next to you at the café has been speaking quietly for forty minutes. You have not been listening but you have registered the rhythm of the conversation — the pauses, the tone shifts, the long quiet in the middle where something was decided or not decided. You do not know their language. You read the rhythm anyway.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s62p', true) },
  },

  {
    id: 'sonder_62_q',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s62q,
    text: 'The anger you carried for a long time has mostly left. You are not sure when it left or what replaced it. Something replaced it — not exactly peace, which is too large a word. Something quieter than anger that does not require as much maintenance.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s62q', true) },
  },

  {
    id: 'sonder_62_r',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s62r,
    text: 'The meeting that was scheduled for Thursday was moved to the following Tuesday and you experienced a relief out of proportion to the rescheduling. The relief told you something about the meeting you had not been telling yourself.',
    choices: null,
    effect: (p) => { p.setMem('s62r', true) },
  },

  {
    id: 'sonder_62_s',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s62s,
    text: 'The books that mattered to you at fourteen were not the books that were supposed to matter to you at fourteen. The ones that were supposed to matter sat on the shelf. The ones that mattered were taken to a different room and read in a way that felt like the books were speaking directly into the part of you that the school day did not reach.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 2; p.setMem('s62s', true) },
  },

  {
    id: 'sonder_62_t',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s62t,
    text: 'The project you abandoned is still in a folder somewhere. Not a project anyone knew about — something private, unfinished, that got as far as it got and then stopped. The stopping was not a decision. It was an accumulation of other things until the project was no longer being worked on.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s62t', true) },
  },

  {
    id: 'sonder_62_u',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s62u,
    text: 'There was a period when you went to sleep before midnight every night for three months and felt better than you had in years. The feeling was not complicated. You have never reliably replicated the conditions. The conditions were simple. Something about the simplicity made them unsustainable.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s62u', true) },
  },

  {
    id: 'sonder_62_v',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s62v,
    text: 'You know the approximate number of times you have eaten breakfast. The number is large enough to be abstract. The specific breakfasts you remember are few. What the remembered ones have in common is not what you would have predicted if asked to predict which ones would be remembered.',
    choices: null,
    effect: (p) => { p.setMem('s62v', true) },
  },

  {
    id: 'sonder_62_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s62w,
    text: 'Your handwriting is your father\'s handwriting. You noticed this for the first time on a form you filled out and had to read back, and the reading back felt like something other than reading your own handwriting. The shape of the letters was not yours first.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s62w', true) },
  },

  {
    id: 'sonder_62_x',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s62x,
    text: 'The lie you told was small and you have not told it since. But you remember it with a precision that larger events do not have. The smallness of it and the precision of the memory are connected. The small things that should not have happened are the ones that leave the clearest trace.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s62x', true) },
  },

  {
    id: 'sonder_62_y',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s62y,
    text: 'The person who apologized to you after ten years apologized for something you had mostly forgiven and were not expecting the apology for. The apology moved the thing slightly. You are not sure in which direction. The forgiveness had already settled and the apology unsettled it slightly, then it settled again, differently.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s62y', true) },
  },

  {
    id: 'sonder_62_z',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s62z,
    text: 'The habit of checking before you leave — the door, the gas, the window — is the same check your mother made. You watched her make it. You absorbed the sequence without being taught the sequence. The inheritance of small anxieties is also a form of inheritance.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s62z', true) },
  },

  {
    id: 'sonder_62_aa',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s62aa,
    text: 'There was a summer that felt longer than summers do now. You know why it felt longer — the days were not subdivided the same way, the obligations were different, the clock was more porous. Knowing why it felt longer does not make current summers feel the same way.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s62aa', true) },
  },

  {
    id: 'sonder_62_ab',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s62ab,
    text: 'The skill you have that impresses people is not the skill you consider your best skill. The skill you consider your best skill is one that is harder to show and that you have rarely been in situations where showing it was useful. You know both skills are real. The invisible one is more yours.',
    choices: null,
    effect: (p) => { p.setMem('s62ab', true) },
  },

  {
    id: 'sonder_62_ac',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s62ac,
    text: 'You have rehearsed conversations that never happened. A few of them, if they had happened, would have changed things. The rehearsal did something — it clarified what you thought, what you wanted to say. The conversation not happening also did something. Both are facts about those years.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s62ac', true) },
  },

  {
    id: 'sonder_62_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s62ad,
    text: 'The neighbor you waved at for twenty years died last spring. You did not know her name, which you now consider a failure of some kind, or a feature of a particular kind of city life, or both. The wave was real. The not knowing the name was also real. The wave is over and you find you notice its absence.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s62ad', true) },
  },

]
