// events_sonder_46.js
// Contemplative layer — 30 events.
// Themes: the object that outlived its purpose, distance and what it does to
// the voice, the specific weight of an empty room, what prayer sounds like
// from outside, the hour before the news, the body's private archive.

export const EVENTS_SONDER_46 = [

  {
    id: 'sonder_46_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36a,
    text: 'There is a cup in the kitchen that belongs to no one and has been there for years. You do not use it. You do not throw it away. It was here when you moved in or someone left it or it came with something else. It has become part of the room the way a nail becomes part of a wall — not noticed until you notice it, and then the fact of it suddenly requires explanation. You cannot explain it. You leave it.',
    choices: null,
    effect: (p) => { p.setMem('s36a', true) },
  },

  {
    id: 'sonder_46_b',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36b,
    text: 'The voice of someone on the phone from far away is slightly different from their voice in the room. You have been talking to them for years and you know both versions. The phone voice is thinner. It contains the distance as a frequency. When you see them again in person the voice is deeper than you had been remembering and you understand that the phone has been giving you a diminished version of them for however long this has been going on.',
    choices: null,
    effect: (p) => { p.setMem('s36b', true) },
  },

  {
    id: 'sonder_46_c',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s36c,
    text: 'The room you used to work in is now used for something else. You pass through it sometimes on the way to somewhere else and the arrangement of the furniture is wrong — correct for its new purpose, wrong for the body that remembers working there. Your hands remember where the papers were. The table has been moved. This is ordinary. The body takes longer than the mind to accept ordinary.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s36c', true) },
  },

  {
    id: 'sonder_46_d',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36d,
    text: 'Prayer from outside a room: you hear the rhythm but not the words. The rhythm is the most honest part — the register it arrives at, the pace of the breath, the specific cadence of petition versus gratitude. You know which kind of prayer this is without hearing the words. You have made the same sounds. The sounds go somewhere or they do not. Either way the sounds are real.',
    choices: null,
    effect: (p) => { p.setMem('s36d', true) },
  },

  {
    id: 'sonder_46_e',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36e,
    text: 'There is the hour before the news when you know bad news is coming and have not yet heard it. This hour is different from all other hours. The knowledge that it is about to be real is almost as heavy as the reality. Sometimes the news is not as bad as the hour before it. Sometimes it is worse. The hour before teaches you things about how dread works that you would rather not know.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s36e', true) },
  },

  {
    id: 'sonder_46_f',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s36f,
    text: 'The smell of your grandmother\'s house — or whichever house is the first house you remember as not-your-house — is a thing you carry without knowing you carry it. Years later something triggers it: a particular soap, a cooking smell, a wood or stone or curtain fabric. The smell is the house before the house is the image. You are briefly there and then you are not.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s36f', true) },
  },

  {
    id: 'sonder_46_g',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36g,
    text: 'The map of your city in your head is not the same as the map of your city in the phone. The phone map is accurate. Your map is layered: where things were before they changed, where the route was before the new road, where the person who lived at this address lived before they moved. You navigate by both maps simultaneously without deciding to.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s36g', true) },
  },

  {
    id: 'sonder_46_h',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s36h,
    text: 'The body has a private archive that the mind does not have full access to. A gesture you make that you did not know you made — someone shows you a photograph and there it is, the specific angle of the wrist, the position of the head. Your mother made that gesture. Or you made it first and she learned it from you. The archive has no clear filing system and no known origin date.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s36h', true) },
  },

  {
    id: 'sonder_46_i',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36i,
    text: 'You have been speaking someone else\'s language for long enough that you now dream in it. The first time this happened you noticed it. Now it is ordinary. What is not ordinary: the dreams that still come in your first language, which is also your real language, which is also not always distinguishable from the second. You wake up sometimes uncertain which language you were in and for a moment the languages are not separate things.',
    choices: null,
    effect: (p) => { p.setMem('s36i', true) },
  },

  {
    id: 'sonder_46_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36j,
    text: 'The neighbor whose schedule you know without intending to know it: the departure time, the car sound, the light that goes off at a particular hour. You have never spoken to them. You know them by their routine the way you know any regular thing by its pattern. When the routine changes — the car is not there, the light stays on later than usual — you notice without deciding to notice.',
    choices: null,
    effect: (p) => { p.setMem('s36j', true) },
  },

  {
    id: 'sonder_46_k',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36k,
    text: 'Waiting at a border. The booth, the officer, the specific power of the desk between you. The question about the purpose of your trip, which you answer in the language that will be accepted, which may or may not be your first language. The stamp. The line behind you. The countries stack up in the passport like a record of where you were permitted. You are permitted now. You go through.',
    choices: null,
    effect: (p) => { p.setMem('s36k', true) },
  },

  {
    id: 'sonder_46_l',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36l,
    text: 'There is the thing you say at funerals that is not untrue but is also not the full truth. Everyone who speaks at funerals says a version of this thing. The full truth about a person is not available at a funeral because the people who knew the full truth are there, and the people who knew different partial truths are also there, and the funeral is not the occasion to compare versions. You say what is true enough.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s36l', true) },
  },

  {
    id: 'sonder_46_m',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s36m,
    text: 'You learned to read before you understood that not everyone could read. The discovery that some adults could not read — your grandmother, a neighbour, someone your parents knew — rearranged your understanding of what reading was. Before: a thing you were being taught. After: a thing that divided the world in some way you had not known the world was divided.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s36m', true) },
  },

  {
    id: 'sonder_46_n',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36n,
    text: 'The window seat on a train you have taken many times. The landscape outside is familiar and also always slightly different — different light, different season, different state of the crops or the buildings going up or the ones coming down. You look out the window with the specific attention you give to something you know well enough that you can see what has changed.',
    choices: null,
    effect: (p) => { p.setMem('s36n', true) },
  },

  {
    id: 'sonder_46_o',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s36o,
    text: 'Some of the people you knew are now dead and some are alive and you do not always know which. The address book has entries you would not know how to verify. Some of them have been dead for years and you have not known. The not-knowing is not the same as not caring. It is the arithmetic of a life that has distributed itself across distances.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s36o', true) },
  },

  {
    id: 'sonder_46_p',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36p,
    text: 'The specific weight of a gift you will never use but will keep because of who gave it. The shelf where it lives is the shelf of these objects. Every house has such a shelf or such a drawer. The objects on it are not decorative and not functional. They are the record of relationships in object form.',
    choices: null,
    effect: (p) => { p.setMem('s36p', true) },
  },

  {
    id: 'sonder_46_q',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36q,
    text: 'When the electricity goes out at night the darkness is complete. You know the room by touch and by the sound of your own movement — the distance to the wall, the location of the furniture, the number of steps to the door. The body knows this without the body having been asked to learn it. You learned it by living here, which is different from learning it deliberately.',
    choices: null,
    effect: (p) => { p.setMem('s36q', true) },
  },

  {
    id: 'sonder_46_r',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36r,
    text: 'There is a phrase your family uses that no one outside your family uses in quite the same way. The meaning is clear inside the family and would require explanation outside it. You have never explained it. It has not come up in a way that required explanation. One day it will come up, or one day it will stop being used, and either way you will notice its absence.',
    choices: null,
    effect: (p) => { p.setMem('s36r', true) },
  },

  {
    id: 'sonder_46_s',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36s,
    text: 'The apprentice who learned from you and is now better than you. This is the outcome you were working toward. The outcome has arrived and it is accompanied by something you did not entirely anticipate: the knowledge that you are no longer the best at this particular thing. The knowledge is not painful in the way you might have predicted. It is more like completion. More like the project landing somewhere you could not have landed it.',
    choices: null,
    effect: (p) => { p.m += 2; p.e += 1; p.setMem('s36s', true) },
  },

  {
    id: 'sonder_46_t',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s36t,
    text: 'There is less urgency about the news than there used to be. You still read it or hear it but the urgency that the news requires from you — the taking of a position, the formation of an opinion, the preparation for the argument — is less pressing. This may be wisdom. It may be something else. You hold both possibilities.',
    choices: null,
    effect: (p) => { p.setMem('s36t', true) },
  },

  {
    id: 'sonder_46_u',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36u,
    text: 'The market at the hour before it closes: the price coming down, the food that did not sell available for less than it was worth this morning, the vendors packing what they could not sell. The transactions at closing time are a different economy from the transactions at opening — the same goods, different arithmetic. You know both economies if you know this market well enough.',
    choices: null,
    effect: (p) => { p.setMem('s36u', true) },
  },

  {
    id: 'sonder_46_v',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36v,
    text: 'You have stopped explaining something to people who do not understand it. The explanation was always incomplete and the incompleteness grew with each attempt. At some point the explanation started requiring more context than the thing being explained, and the context required its own context. Now you say something shorter. The something shorter is true enough and loses what it loses.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s36v', true) },
  },

  {
    id: 'sonder_46_w',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s36w,
    text: 'The rain on a corrugated roof is a sound that is not like any other. If you grew up with it you will hear it again decades later in a different country in a different rain and the sound will arrive before the memory does — you will be briefly somewhere else before you know you have gone there.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s36w', true) },
  },

  {
    id: 'sonder_46_x',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36x,
    text: 'You have been doing the same task for so long that you no longer experience the task as something you decide to do. The decision has been absorbed into the routine. The routine has become the background of the day. What this means: the task is done, reliably, without cost. What this also means: the task is done without presence. You will not remember doing it today.',
    choices: null,
    effect: (p) => { p.setMem('s36x', true) },
  },

  {
    id: 'sonder_46_y',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36y,
    text: 'The light at the window of the apartment above you goes off at 11pm most nights. Sometimes it goes off at 2am. You notice without meaning to. On the nights it goes off at 2am you briefly think about the person at the window, what they were doing that kept the light on, whether it was work or illness or reading or the television or something else. You do not know them. You know this about them.',
    choices: null,
    effect: (p) => { p.setMem('s36y', true) },
  },

  {
    id: 'sonder_46_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36z,
    text: 'The handwriting in the margin of a book you bought secondhand. The person had opinions that are now visible to you without permission. The ink is faded or is not faded. The opinions are wrong or are not wrong. The person who wrote them is now unknown to you in a way that feels close — you have their thoughts but not their name, and the thoughts are not general, they are specific, they were written to be read by whoever had the next occasion to read them, which is now you.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s36z', true) },
  },

  {
    id: 'sonder_46_aa',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s36aa,
    text: 'Your hands are the hands of someone older than you thought you were. The skin tells a story you have been living from the inside. You look at them — the specific configuration of vein and knuckle and the mark from the thing that happened twenty years ago — and they are the hands of an adult in a way that still surprises you on certain mornings.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s36aa', true) },
  },

  {
    id: 'sonder_46_ab',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36ab,
    text: 'The bus you take every morning stops at the same stops in the same order and the people who board at each stop are recognisable without being known. The man with the newspaper at the third stop. The woman with the child at the fifth. The boy with the school bag who runs for it at the eighth and usually makes it. You have never spoken to any of them. They are the furniture of your morning.',
    choices: null,
    effect: (p) => { p.setMem('s36ab', true) },
  },

  {
    id: 'sonder_46_ac',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36ac,
    text: 'You know a song in a language you do not speak. You learned it as a sound — the melody, the syllables in their sequence — before you knew the words were words. The song is about something. You looked it up once. The meaning changed the song and did not change it. You still sing it as a sound more than as a meaning.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s36ac', true) },
  },

  {
    id: 'sonder_46_ad',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36ad,
    text: 'The conversation you rehearsed for weeks that, when it arrived, went nothing like the rehearsal. The rehearsal had been more persuasive. The actual conversation was interrupted and resumed and ended somewhere else entirely. What you wanted to say is still in the rehearsal. The rehearsal is still available to you. You return to it sometimes, when the original conversation is long over, to finish it in the version where it went the way it was supposed to go.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s36ad', true) },
  },

]
