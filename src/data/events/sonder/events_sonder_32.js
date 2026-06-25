// events_sonder_32.js — contemplative prose layer, weight 2, no choices, no new flags

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_32 = [

  {
    id: 'sonder_32_a',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 30 && !G.mem?.s32a,
    text: pick([
      'The train that you almost did not catch. You have thought about what would have happened if you had missed it. The answer is: something different would have happened. Beyond that, you do not know.',
      'The period when everything seemed possible and you did not recognise it as a period. It had the feeling of a permanent state. Later you understood it was a period.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32a', true) },
  },

  {
    id: 'sonder_32_b',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 52 && !G.mem?.s32b,
    text: pick([
      'The child who looked at you on the bus today and then looked away. You were, for a moment, a stranger in the ordinary sense — someone with a face and a coat and no story attached.',
      'The sentence you said that was wrong and you knew it was wrong the moment it left your mouth. The room absorbed it. No one corrected you. You have been correcting it internally since.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32b', true) },
  },

  {
    id: 'sonder_32_c',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 6 && G.age <= 12 && !G.mem?.s32c,
    text: pick([
      'The adult in your life who treated you like a person who understood things. The way they spoke to you. You remembered it as a standard.',
      'You have been watching the same adults for years. The things that make them angry or quiet, the things they do when they think no one is watching. You know them the way they do not know you know them.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32c', true) },
  },

  {
    id: 'sonder_32_d',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.s32d,
    text: pick([
      'The afternoon light at this time of year is exactly what it was the year you were young, but you are different. The light has not changed. You have changed in every way. The light cannot tell.',
      'You know several people who died young. When you think of them they are still the age they were. They have not aged alongside you. They remain fixed in the year you knew them last.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32d', true) },
  },

  {
    id: 'sonder_32_e',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 24 && G.age <= 36 && !G.mem?.s32e,
    text: pick([
      'The thing you said yes to and should have said no to. The thing you said no to and should have said yes to. You cannot always tell in advance which is which. You are still learning the difference.',
      'At this hour, in this city, someone is doing what you are doing — not the same work, but the same quality of attention, the same leaning toward something unfinished.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32e', true) },
  },

  {
    id: 'sonder_32_f',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 14 && G.age <= 18 && !G.mem?.s32f,
    text: pick([
      'The person you are at the back of the bus and the person you are at the front of the class. The distance between them is navigated daily and without ceremony.',
      'You have a sense that something large is coming. You cannot name it or locate it. The sense is there when you wake and there when you sleep and you have learned to live inside it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32f', true) },
  },

  {
    id: 'sonder_32_g',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && G.age <= 56 && !G.mem?.s32g,
    text: pick([
      'The way your parent did something — the gesture, the phrase, the particular way of handling a situation — that you found yourself doing last week without deciding to.',
      'The garden or the balcony plant or the single succulent on the windowsill: something alive that you are responsible for. The specific relationship of noticing whether something is alive.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32g', true) },
  },

  {
    id: 'sonder_32_h',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.s32h,
    text: pick([
      'The photograph album that no one will look at after you are gone. The people in it have names only you can supply. When you are gone the photographs will become pictures of strangers.',
      'The body remembers things the mind has forgotten. The skill that comes back without having been practised. The route the hands know without instruction.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32h', true) },
  },

  {
    id: 'sonder_32_i',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 42 && !G.mem?.s32i,
    text: pick([
      'The meeting between two people at the table across from you. You cannot hear them but you can see what the conversation is. Something is being decided. You hope it goes the way the quieter one wants.',
      'The list you made of things to do and then did not make again because the list-making had become the thing you were doing instead of the things on the list.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32i', true) },
  },

  {
    id: 'sonder_32_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 44 && G.age <= 58 && !G.mem?.s32j,
    text: pick([
      'The job title you had for six years. When you say it now it sounds like someone else\'s job. The person who held that title — what they believed was important, what they stayed late for — is not entirely continuous with the person you are now.',
      'The version of yourself that existed before the particular thing happened. You can remember what it was like to not know it would happen. It is like remembering a different person who happened to have your name.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32j', true) },
  },

  {
    id: 'sonder_32_k',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 26 && !G.mem?.s32k,
    text: pick([
      'The first time you lived alone: the sound of nothing, the specific nothing of a space that was not waiting for anyone else. Provisional at first. Then the space became yours.',
      'Everyone at this party is performing slightly. You are performing slightly. The gap between the performance and the person underneath it is the same size in everyone and none of you discuss this openly.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32k', true) },
  },

  {
    id: 'sonder_32_l',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && G.age <= 72 && !G.mem?.s32l,
    text: pick([
      'The retirement of the body from certain activities has been gradual. Not a cliff. A slow negotiation where you learned what was no longer available and adjusted without ceremony.',
      'The season you waited for and when it arrived it was what you expected and also briefly better than expected, and then it ended, and then you waited for it again.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32l', true) },
  },

  {
    id: 'sonder_32_m',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 36 && G.age <= 48 && !G.mem?.s32m,
    text: pick([
      'The lunch alone at the counter. Not eating alone because of loneliness but eating alone because of preference, this once, at this counter, watching the cook work.',
      'The question you get at every gathering about how things are going. The answer you give. The answer you do not give. The gap between the two is not dishonesty — it is social convention, which is its own kind of truth.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32m', true) },
  },

  {
    id: 'sonder_32_n',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 34 && !G.mem?.s32n,
    text: pick([
      'The street you cross every day that you once crossed for the first time. The first crossing is nowhere in your memory. It has been absorbed into the ordinary.',
      'The object that arrived in your life from someone else\'s life and stayed. You cannot remember how long you have had it. It has become part of the inventory of what you own without becoming unremarkable.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32n', true) },
  },

  {
    id: 'sonder_32_o',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 72 && !G.mem?.s32o,
    text: pick([
      'The grandchild who asks where you were during the event that is now history. You answer. The answer is a sentence that does not contain most of what the event was. You are describing an experience inside a word.',
      'The body in the morning requires certain conversations before the day begins. The hip, the back, the knee. You negotiate. The body mostly agrees to continue.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32o', true) },
  },

  {
    id: 'sonder_32_p',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 13 && G.age <= 17 && !G.mem?.s32p,
    text: pick([
      'The book that mattered so much you cannot remember what your life was before reading it. The book did not change you — it named something that was already there. That was why it mattered.',
      'The teacher who did not notice you and the teacher who did. Both were teaching the same subject. The difference between them was not the subject.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32p', true) },
  },

  {
    id: 'sonder_32_q',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 46 && G.age <= 60 && !G.mem?.s32q,
    text: pick([
      'The competence you have now that you did not have at thirty. The specific earned knowledge of how to do a thing well. It arrived quietly, through repetition, until one day you noticed you were good at it.',
      'The room in the house that you have been in a thousand times and still sometimes enter wrong — going left when left is not where you meant to go. The body\'s habits are older than the house.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32q', true) },
  },

  {
    id: 'sonder_32_r',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 26 && G.age <= 40 && !G.mem?.s32r,
    text: pick([
      'The friendship that requires no preamble. You can go months and then be exactly where you were. The friendship is built in accumulated years that do not depreciate.',
      'The repair you made that holds. The thing you fixed that the person who made it did not expect to be repairable. The satisfaction of that is different from the satisfaction of buying something new.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32r', true) },
  },

  {
    id: 'sonder_32_s',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 64 && G.age <= 76 && !G.mem?.s32s,
    text: pick([
      'The city has changed in ways that mean the city your children grew up in is different from the city you grew up in, even when it is the same city. They know the new reference points. You know the old ones. Between you, you have the whole.',
      'The practice of not speaking first. You have learned it late. The space left when you do not fill it immediately is sometimes filled by what the other person actually meant to say.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32s', true) },
  },

  {
    id: 'sonder_32_t',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 14 && !G.mem?.s32t,
    text: pick([
      'The object you made with your hands that was not perfect and which was yours. The imperfection was part of what made it yours.',
      'The way the day felt the last time before it ended — the last summer of being young in a particular way, the last year before school changed. The feeling only visible in retrospect.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32t', true) },
  },

  {
    id: 'sonder_32_u',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 54 && !G.mem?.s32u,
    text: pick([
      'The colleagues who know your professional self but not the other one. The other one would surprise some of them. You are curious, occasionally, what they imagine.',
      'The habit of reading the room before entering it. You do this so automatically you would not have named it as a skill until someone said they could not do it, and you realised that you have been doing it for twenty years.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32u', true) },
  },

  {
    id: 'sonder_32_v',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 42 && !G.mem?.s32v,
    text: pick([
      'The decision that felt large at the time and which, from here, feels like the only decision that was possible given what you knew and who you were. The largeness was real. The impossibility of the alternative was also real.',
      'The walk you take that has become yours — the particular stretch of road or park or waterfront that has accumulated enough repetitions to feel owned, without being owned.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32v', true) },
  },

  {
    id: 'sonder_32_w',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 70 && !G.mem?.s32w,
    text: pick([
      'The simplification. The not carrying of things that were heavy and are no longer required. The year when you stopped explaining yourself in certain ways and found the silence worked as well.',
      'The person who you are now, looking back at the person who was so certain. The certainty was not wrong about everything. It was wrong about some things that mattered and right about some things that also mattered.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32w', true) },
  },

  {
    id: 'sonder_32_x',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 48 && G.age <= 60 && !G.mem?.s32x,
    text: pick([
      'The night you stayed up for a reason that seemed important and in the morning was still important but differently. Sleep changes the importance of things slightly. You have started to rely on this.',
      'The sound of rain on a different kind of roof — the tin roof of childhood, the tile roof of adulthood, the specific drumming of weather on whatever material you are living under. Rain sounds different depending on where you are inside.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32x', true) },
  },

  {
    id: 'sonder_32_y',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 32 && !G.mem?.s32y,
    text: pick([
      'The first payment you made for something large enough that you had to save for it. The object and the saving are both present in what you remember — the thing itself, and the months of the thing being ahead of you.',
      'You are becoming the person who was going to become this. From inside, it does not feel like becoming. It feels like staying the same and the world being different.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32y', true) },
  },

  {
    id: 'sonder_32_z',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && G.age <= 74 && !G.mem?.s32z,
    text: pick([
      'The recurring pleasure that has not diminished: the morning coffee, the book before bed, the conversation with a particular person. Some pleasures do not run out. You have located yours.',
      'The news that someone you knew long ago has died. The distance between that person and your present life was large. The death still reaches across it. That is something about how grief works.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32z', true) },
  },

  {
    id: 'sonder_32_aa',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 34 && G.age <= 46 && !G.mem?.s32aa,
    text: pick([
      'The things you notice now that you did not notice at twenty-five. The way a room is furnished tells you something. The way a person holds themselves tells you something. The information was always there.',
      'You are one of the older people in the room for the first time in a context where you previously were not. The shift has happened gradually. Tonight it is visible.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32aa', true) },
  },

  {
    id: 'sonder_32_ab',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 28 && !G.mem?.s32ab,
    text: pick([
      'The argument with yourself that you keep having. You know both sides. One side wins most days, but the other side keeps returning with the same evidence, arranged differently.',
      'The place that felt like home before you found home. The approximation of home: the friend\'s house, the neighbourhood you kept returning to, the city that worked for the person you were then.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s32ab', true) },
  },

]
