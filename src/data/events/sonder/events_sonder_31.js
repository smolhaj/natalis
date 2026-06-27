// events_sonder_31.js — contemplative prose layer, weight 2, no choices, no new flags

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_31 = [

  {
    id: 'sonder_31_a',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 32 && !G.mem?.s31a,
    text: pick([
      'You have been living in this city long enough that you know which streets to avoid on certain days and which to take when you have extra time. This is a form of belonging that has no ceremony.',
      'Someone says your name from across a room and you turn before you have consciously registered it. The sound of your own name in someone else\'s mouth, every time, still briefly strange.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31a', true) },
  },

  {
    id: 'sonder_31_b',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 35 && !G.mem?.s31b,
    text: pick([
      'The first apartment you had that was entirely your own: the sound of it when empty, the way your footsteps announced themselves in the rooms before any furniture arrived.',
      'You still have the habit of looking at the sky before you make plans. Someone taught you this — your grandmother, your father, a neighbour who kept a garden. You have not thought about where the habit came from in years.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31b', true) },
  },

  {
    id: 'sonder_31_c',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 14 && G.age <= 19 && !G.mem?.s31c,
    text: pick([
      'The group you are part of has a particular sound — the way several people laugh at once, the frequency that is specific to this configuration and will not recur when the configuration changes.',
      'You are carrying something for someone — a message, a small errand, a secret that was told to you because they needed somewhere to put it. The weight of it is not nothing.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31c', true) },
  },

  {
    id: 'sonder_31_d',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 50 && !G.mem?.s31d,
    text: pick([
      'You have been to this neighbourhood at every stage of what this neighbourhood has been. You are the continuity it does not know about.',
      'The conversation you had twenty years ago and are still occasionally correcting in your mind. The version you would have now, if you could. You would still lose but more gracefully.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31d', true) },
  },

  {
    id: 'sonder_31_e',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 52 && !G.mem?.s31e,
    text: pick([
      'Someone younger than you asks for your advice and you give it, and then afterwards you think about what you would have said to yourself at their age, which is different, which is always different.',
      'The thing you do well that has no name for itself — the particular skill of knowing when a room has shifted, of reading the temperature of a gathering. No one trained you. You watched, and then you knew.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31e', true) },
  },

  {
    id: 'sonder_31_f',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && G.age <= 70 && !G.mem?.s31f,
    text: pick([
      'The pleasure of knowing a subject well enough that you no longer have to prove you know it. The ease that comes after the long period of proving.',
      'Your handwriting has changed over the decades in ways you did not decide. You sign your name the same way you have signed it for forty years and then look at the signature and find it slightly foreign, as if someone else is doing the signing.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31f', true) },
  },

  {
    id: 'sonder_31_g',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s31g,
    text: pick([
      'You know someone who has died in every decade of your adult life. The list now is long enough that when you add to it the addition feels continuous rather than exceptional.',
      'The younger person who reminds you of yourself at their age — not in any specific detail but in the whole posture of them, the way they are standing in the room.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31g', true) },
  },

  {
    id: 'sonder_31_h',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 12 && !G.mem?.s31h,
    text: pick([
      'The gap between who you are at school and who you are at home. You cross from one into the other every day and the crossing is so habitual you have stopped noticing it requires a change.',
      'Someone told you something important and then changed the subject and you have been thinking about what they said ever since, with no way to return to it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31h', true) },
  },

  {
    id: 'sonder_31_i',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 28 && !G.mem?.s31i,
    text: pick([
      'The city at a time you are not usually in it — five in the morning, or three in the afternoon on a Tuesday. It feels like finding a room in a house you thought you knew completely.',
      'You are waiting for something that will happen in its own time and the waiting is the entire activity right now. You have not been good at this. You are getting better at it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31i', true) },
  },

  {
    id: 'sonder_31_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 55 && !G.mem?.s31j,
    text: pick([
      'The meeting you were in where everyone said what they thought was expected of them and nothing that was true. You left and stood outside for a moment before continuing. The moment was the whole of it.',
      'The object in your house that has moved from apartment to apartment, city to city, and is still where you put it after the last move. It has outlasted several versions of your life.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31j', true) },
  },

  {
    id: 'sonder_31_k',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 24 && G.age <= 38 && !G.mem?.s31k,
    text: pick([
      'The photo of yourself from ten years ago that you encounter unexpectedly. The person looking out from it knew nothing that you know now. They did not look like someone who didn\'t know it.',
      'The meal you have been making for years — the dish whose quantities you know without measuring, that you make when the specific people it belongs to are gathered. It tastes like what it is.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31k', true) },
  },

  {
    id: 'sonder_31_l',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s31l,
    text: pick([
      'The long arc of a friendship that has outlasted everything the friendship started as. What you have now is something the people you were at the beginning could not have named.',
      'You sleep differently than you used to. The hours shift. You are awake when the house is quiet and you have stopped fighting the wakefulness and started listening to what it gives you instead.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31l', true) },
  },

  {
    id: 'sonder_31_m',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && G.age <= 58 && !G.mem?.s31m,
    text: pick([
      'The things you know now that you will not be able to pass on — not because no one would listen but because the thing you know cannot be transferred in words, only arrived at by living. The particular knowledge that dies with the person who holds it.',
      'Someone is telling you a story you have heard them tell before. You let them. The story is not for your information.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31m', true) },
  },

  {
    id: 'sonder_31_n',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 15 && G.age <= 20 && !G.mem?.s31n,
    text: pick([
      'The song that belongs to this year. In twenty years it will play and you will be exactly here, involuntarily, before the memory surfaces — smell and temperature and something unresolved.',
      'You are in the middle of the thing that will later be the story. You cannot feel the middle as a middle. You can only feel it as the present, which is what it is.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31n', true) },
  },

  {
    id: 'sonder_31_o',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 26 && G.age <= 40 && !G.mem?.s31o,
    text: pick([
      'The acquaintance who, over years, becomes the person you call first with certain news. The upgrade happened without being decided.',
      'The project you started that you have not finished and still have not abandoned. It is somewhere between the two, neither completed nor given up. You visit it occasionally and put it down again.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31o', true) },
  },

  {
    id: 'sonder_31_p',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.s31p,
    text: pick([
      'The things that seemed urgent at forty that are not urgent now. The liberation in that. The grief in it, too — that the urgency was partly what made the days press forward.',
      'Your body has negotiated some things without your input. The knee that needs a certain angle. The morning stiffness that passes. You have learned its requirements and it continues its work.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31p', true) },
  },

  {
    id: 'sonder_31_q',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 44 && G.age <= 56 && !G.mem?.s31q,
    text: pick([
      'The political conversation at the table that you held your opinion through. The opinion was not wrong. The table was not the right place for it. You are learning to know the difference.',
      'The window you look out of every morning. The tree on the other side of it has grown in the years you have been here. Something has been happening in your absence.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31q', true) },
  },

  {
    id: 'sonder_31_r',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 14 && !G.mem?.s31r,
    text: pick([
      'The adult you are visiting has a life that exists entirely outside your knowledge of it. The room they sit in when you are not here. The things they do in the hours between your visits.',
      'The animal you found and kept briefly and then released or lost. The specific quality of caring for something that needs you and cannot ask for what it needs.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31r', true) },
  },

  {
    id: 'sonder_31_s',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 42 && !G.mem?.s31s,
    text: pick([
      'The birthday that passes without the usual ceremony. You let it. The fact of another year is recorded only by you and by the number, quietly.',
      'The sleep that came on the train or the bus and you arrived somewhere unexpected. The disorientation of a place that is both familiar and briefly, before full wakefulness, not.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31s', true) },
  },

  {
    id: 'sonder_31_t',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s31t,
    text: pick([
      'You have become, for certain people in your family, the person who was there before. The keeper of the before. The weight of this is different from what you expected.',
      'The sound the house makes when everyone else has left. You have been in enough houses to know that each has its own version of this sound. This one is yours.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31t', true) },
  },

  {
    id: 'sonder_31_u',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 45 && G.age <= 60 && !G.mem?.s31u,
    text: pick([
      'The part of you that is still the age you were at a specific moment — the year the particular thing happened — and the rest of you that has continued aging around it.',
      'The city changed around you while you were living your life in it. Now a neighbourhood you knew has a different name in the mouth of someone who moved here recently. They are not wrong. The old name is also not wrong.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31u', true) },
  },

  {
    id: 'sonder_31_v',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 30 && !G.mem?.s31v,
    text: pick([
      'The mistake you made that you have explained to yourself in every possible way. The explaining is now finished. What remains is the fact of what happened, which does not need explanation.',
      'Something is beginning. You can feel it the way you can feel the pressure before weather changes. The feeling is not a guarantee of anything. It is accurate more often than not.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31v', true) },
  },

  {
    id: 'sonder_31_w',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 70 && !G.mem?.s31w,
    text: pick([
      'The grandchild or young person who looks at you and does not see what you know about yourself. To them you have always been this. The before is entirely invisible.',
      'You have lost track of how many times you have told a particular story. The story has changed in the telling — small adjustments, compressions, the part that turns out to be the important part now. You do not know how close it is to what actually happened.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31w', true) },
  },

  {
    id: 'sonder_31_x',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 36 && G.age <= 48 && !G.mem?.s31x,
    text: pick([
      'The apology you owe someone who is no longer reachable. The apology you have made to the version of them you carry, which is not the same as the actual apology and knows it is not.',
      'The long period of not knowing what you wanted followed by the moment of knowing clearly. The moment itself is quiet. No announcement. Just the difference between one kind of confusion and having something to move toward.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31x', true) },
  },

  {
    id: 'sonder_31_y',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 12 && G.age <= 17 && !G.mem?.s31y,
    text: pick([
      'The private world that exists in parallel with the world everyone else can see. The two have almost nothing in common. You move between them daily without this being strange.',
      'The thing you are very good at that no one around you values in the way it deserves to be valued. You have started to understand that this is one of the things the world does and that it will continue doing it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31y', true) },
  },

  {
    id: 'sonder_31_z',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 40 && !G.mem?.s31z,
    text: pick([
      'The decade is ending. Not officially — it is just a number. But the person who started this decade and the person ending it are different in ways that feel significant and are hard to account for.',
      'You are reading something and you stop and put it down because the sentence did something. You sit with it for a moment. Then you pick the thing back up.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31z', true) },
  },

  {
    id: 'sonder_31_aa',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 63 && G.age <= 75 && !G.mem?.s31aa,
    text: pick([
      'The question someone asks you that you have never been asked before. At this age, the new question is rare. When it comes it is welcome in a specific way.',
      'The morning with nothing required of it. The full morning and no obligation. You are still learning what to do with this. The obligation was not nothing — it organised the hours.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31aa', true) },
  },

  {
    id: 'sonder_31_ab',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 48 && G.age <= 60 && !G.mem?.s31ab,
    text: pick([
      'You know someone who lost everything and rebuilt and the rebuilding is visible in how they carry themselves. The knowledge of rebuilding is in the posture. You recognize it because you have done some version of it.',
      'The afternoon that had no event in it and was perfect. The perfection was invisible at the time. It became visible later, in retrospect, as the thing that was perfect: nothing happening, the light on the floor, the silence that did not require filling.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s31ab', true) },
  },

]
