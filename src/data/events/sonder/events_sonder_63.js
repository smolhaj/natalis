// Sonder module 63 — 30 contemplative events
// Weight 2, null choices, all mem-gated. Universal human texture.

export const EVENTS_SONDER_63 = [

  {
    id: 'sonder_63_a',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s63a,
    text: 'The route you take home is the route you take because it became the route. There was no decision. You went one way once and then again and then the route was established and the decision was done. This is how most of the structure of your day was assembled.',
    choices: null,
    effect: (p) => { p.setMem('s63a', true) },
  },

  {
    id: 'sonder_63_b',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s63b,
    text: 'The question your grandchild asked you about your childhood required a long answer that you gave in three sentences. The three sentences were true. They were not the full account. You don\'t know whether the full account would have held their attention, but you know you didn\'t try.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s63b', true) },
  },

  {
    id: 'sonder_63_c',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s63c,
    text: 'The friend who always knew what to say when you didn\'t has not been in your life for six years. You think of her at moments when you don\'t know what to say. The thought does not produce what her presence would have produced. It produces only the thought of her.',
    choices: null,
    effect: (p) => { p.m -= 2; p.setMem('s63c', true) },
  },

  {
    id: 'sonder_63_d',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s63d,
    text: 'The photograph of you at twenty-three is on the shelf. You do not recognize yourself in it as much as you expected to. The person in it is familiar the way a very close relative is familiar — clearly related but not identical. Some specific thing about the mouth.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s63d', true) },
  },

  {
    id: 'sonder_63_e',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s63e,
    text: 'The teacher who made you feel stupid was not trying to make you feel stupid. You have arrived at this conclusion over many years. Arriving at it has not removed what was left by the original experience. Both things exist at the same time — the revised interpretation and the original deposit.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s63e', true) },
  },

  {
    id: 'sonder_63_f',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s63f,
    text: 'The decade between forty and fifty contained the most concentrated density of the things you will have to reckon with for the rest of your life. You did not know this while it was happening. You know it now. The decades do not announce what they contain.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s63f', true) },
  },

  {
    id: 'sonder_63_g',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s63g,
    text: 'You are better at the thing now than you were when you cared more about it. The caring less happened first and the improvement happened afterward. The relationship between effort and result is not always what you were taught it would be.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s63g', true) },
  },

  {
    id: 'sonder_63_h',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s63h,
    text: 'You are at the age where you sometimes understand something that happened thirty years ago without being able to explain why you understand it now. The understanding comes without announcement. It is not like remembering. It is more like a door that opens from the inside.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s63h', true) },
  },

  {
    id: 'sonder_63_i',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s63i,
    text: 'The adult who was hard on you was also, you have since learned, going through something difficult of their own. The two things are connected and also separate. Their difficulty does not explain yours away. Knowing about their difficulty changes how you hold yours.',
    choices: null,
    effect: (p) => { p.setMem('s63i', true) },
  },

  {
    id: 'sonder_63_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s63j,
    text: 'The work meeting that lasted two hours contained forty minutes of actual work. Everyone in the meeting knew this. No one said so during the meeting. There is a social contract around meetings that is separate from the practical function of meetings. You have been honoring it for years.',
    choices: null,
    effect: (p) => { p.setMem('s63j', true) },
  },

  {
    id: 'sonder_63_k',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s63k,
    text: 'The overnight train had six other passengers in the car. You did not speak to any of them. You arrived at the same destination at the same time with the same night of parallel sleep behind you. You went in six different directions at the station. Whatever they were traveling toward, you did not know, and they did not know yours.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s63k', true) },
  },

  {
    id: 'sonder_63_l',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s63l,
    text: 'Your children do not need to be told things you had to be told. They also do not know things you knew by their age without being told. The transfer across generations is not additive. Some things accumulate and some things reset.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s63l', true) },
  },

  {
    id: 'sonder_63_m',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s63m,
    text: 'The doctor is younger than your oldest child. The dentist is younger than that. The pharmacist looks like a person who has recently finished a degree. You are in the system now as a patient in a way that is different from before, and the people who manage you in that system are getting progressively younger without doing anything intentional to achieve this.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s63m', true) },
  },

  {
    id: 'sonder_63_n',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s63n,
    text: 'The song you were not supposed to know the words to, you knew the words to. The knowledge came from overhearing and from repetition and from the particular childhood ability to absorb what is in the air. You sang it privately. The singing was also private joy.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s63n', true) },
  },

  {
    id: 'sonder_63_o',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s63o,
    text: 'The plan that you and someone else made on a specific evening — the enthusiasm of the specific evening — has not been mentioned since by either of you. The plan was real in the moment. The plan exists now as a thing that was said and is not being done. This is a different category from a promise.',
    choices: null,
    effect: (p) => { p.setMem('s63o', true) },
  },

  {
    id: 'sonder_63_p',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s63p,
    text: 'The audition or interview or presentation you were most anxious about is not the one that mattered most. The one that mattered most felt almost routine at the time. The anxiety was not tracking the importance. The anxiety was tracking something else, which you have never been able to exactly identify.',
    choices: null,
    effect: (p) => { p.setMem('s63p', true) },
  },

  {
    id: 'sonder_63_q',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s63q,
    text: 'There are people you have thought of more often after they died than you did when they were alive. The thinking after is different from the thinking before — more fixed, more complete, also permanently incomplete in a specific way that the thinking before was not.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s63q', true) },
  },

  {
    id: 'sonder_63_r',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s63r,
    text: 'You gave a compliment once that clearly mattered more than you meant it to. The person\'s face when you said it. You did not know what you had said that hit that way. You said the thing and it landed and you moved on and they carried it somewhere. You hope it was the right thing to carry.',
    choices: null,
    effect: (p) => { p.m += 2; p.karma += 2; p.setMem('s63r', true) },
  },

  {
    id: 'sonder_63_s',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s63s,
    text: 'The room where you worked for two years had a window that looked at another building\'s window. The person in the other window was there every day at the same times. You have no idea what they did. They probably have no idea what you did. You were in each other\'s visual field for two years and you know nothing about each other.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s63s', true) },
  },

  {
    id: 'sonder_63_t',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s63t,
    text: 'The word you stopped using because someone corrected you in company — you stopped using it, and then stopped noticing you had stopped. The correction was minor. The adjustment was automatic. Language changes you before you decide to let it.',
    choices: null,
    effect: (p) => { p.setMem('s63t', true) },
  },

  {
    id: 'sonder_63_u',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s63u,
    text: 'The neighbor had a different smell in their house than your house had. Not bad or good — different. You noticed it every time you went there without being able to name what it was. You still can\'t name it. Whatever combination of cooking and cleaning products and people produced it, it was theirs, not yours.',
    choices: null,
    effect: (p) => { p.setMem('s63u', true) },
  },

  {
    id: 'sonder_63_v',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s63v,
    text: 'The injury that seemed minor has become the joint that tells you when rain is coming. The body\'s small archives. The fall from a bicycle at seventeen, the sprained ankle in the stairwell, all present in the body\'s ongoing commentary on itself.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s63v', true) },
  },

  {
    id: 'sonder_63_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s63w,
    text: 'You read the same sentence three times and each time failed to absorb it. Your mind went somewhere specific each time — the same somewhere, which suggests the somewhere is more important right now than the sentence. The sentence can wait. The somewhere cannot.',
    choices: null,
    effect: (p) => { p.setMem('s63w', true) },
  },

  {
    id: 'sonder_63_x',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s63x,
    text: 'The night you arrived in the new place and lay in the new bed and listened to the new sounds of the new street and thought: I am here now. And the here was entirely unfamiliar and the now was the first moment of something whose length you could not estimate from inside it.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s63x', true) },
  },

  {
    id: 'sonder_63_y',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s63y,
    text: 'The story your family tells about you at a particular age is not the story you tell about yourself at that age. Both versions have the same events in them. The emphasis is completely different. You have stopped correcting the family version. The correction never took.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s63y', true) },
  },

  {
    id: 'sonder_63_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s63z,
    text: 'The project that would have changed everything failed at the stage when you ran out of one specific thing: not money, not time, not ability — a specific thing whose name you know and which was also the most ordinary thing to run out of.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s63z', true) },
  },

  {
    id: 'sonder_63_aa',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s63aa,
    text: 'You understood that adults were performing competence before you had a word for performing. The specific adult. The specific competence being performed. The gap between the performance and the uncertainty underneath it was visible to you before you were told you were supposed to find it reassuring.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s63aa', true) },
  },

  {
    id: 'sonder_63_ab',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s63ab,
    text: 'The last thing your father said to you in ordinary conversation — not a final thing, just an ordinary day — you don\'t remember. You remember later conversations and earlier conversations. The middle ones dissolved into the continuity, which is where most conversations live.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s63ab', true) },
  },

  {
    id: 'sonder_63_ac',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s63ac,
    text: 'The emotion you cannot name is a compound of at least three things that have words and one thing that doesn\'t. The three that have words are not the primary ingredient. The thing without a word is. You have been carrying it for the length of this year without having a way to set it down because you cannot name what you\'d be setting down.',
    choices: null,
    effect: (p) => { p.m -= 2; p.r += 2; p.setMem('s63ac', true) },
  },

  {
    id: 'sonder_63_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s63ad,
    text: 'The city has been changing so long that you can no longer tell the difference between the city changing and the city being what it has always been. Both things are happening. The building that is new has been there for fifteen years, which means it is no longer new but it is still the building that was not there before.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s63ad', true) },
  },

]
