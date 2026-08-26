// events_sonder_43.js — contemplative prose layer, weight 2, no choices, no new flags

import { place } from './_sonderGuards.js'

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_43 = [

  {
    id: 'sonder_43_a',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 28 && !G.mem?.s33a,
    text: () => pick([
      'You moved a lot for a stretch of years. Different rooms, different cities, different people eating breakfast in kitchens you were temporarily part of. At the time it felt like freedom. Later it felt like something else — not regret exactly, but a recognition that you were practising a kind of lightness that was not what you actually wanted.',
      'Someone fell asleep on your shoulder on a bus or a train, a stranger, a heavy reliable weight, and they woke up embarrassed and you said something to make it normal and both of you faced forward again. That was the whole of it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33a', true) },
  },

  {
    id: 'sonder_43_b',
    phase: null,
    weight: 2,
    when: (G) => place.isLiterate(G) && (G.age >= 40 && G.age <= 55 && !G.mem?.s33b),
    text: () => pick([
      'At the back of the wardrobe are clothes you are not going to wear again and have not yet decided about. The category: things you cannot quite release, held in a space between the present and a past self who fits into them.',
      'Your handwriting has changed. Compared to letters from twenty years ago — the slope is different, the letters more compressed. You do not remember the change happening. It just became this, at some point, without announcement.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33b', true) },
  },

  {
    id: 'sonder_43_c',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.season === 'summer' && (G.age >= 7 && G.age <= 13 && !G.mem?.s33c),
    text: () => pick([
      'One adult never talked down to you. Who explained things the way they would explain to another adult, without softening. You remember this person more vividly than others from that time, because being taken seriously at that age is unusual enough to register.',
      'The time that felt like it would last forever: a summer afternoon, a quality of late light, a game with rules that you all understood without writing them down. It ended. You did not know it was ending.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33c', true) },
  },

  {
    id: 'sonder_43_d',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s33d,
    text: () => pick([
      'The things that no longer require decision: what you eat for breakfast, how you spend a Tuesday morning, which route to take to the market. These were decisions once. Now they are just the shape of the day.',
      'A child at a family gathering who did not know who you were. You had to introduce yourself. You are still the person who remembers the year this child\'s parent was born, and the child does not know this, and there is no way to say it that wouldn\'t be strange.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33d', true) },
  },

  {
    id: 'sonder_43_e',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 32 && !G.mem?.s33e,
    text: () => pick([
      'For a while you called your parents less. You were busy, or there was nothing to report, or the calls felt like obligation rather than connection. Later you understood this was a standard part of becoming your own person. The understanding didn\'t remove the small guilt of it.',
      'You were going to become someone — the one you imagined at eighteen, at twenty-two, the version of yourself five years ahead — does not quite match what you became. This is not a failure. It is just the way that becoming works.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33e', true) },
  },

  {
    id: 'sonder_43_f',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 48 && !G.mem?.s33f,
    text: () => pick([
      'You realised your parents were wrong about something — not a small thing but something structural, a belief they had built a life around — and that this was fine, that they were still your parents and you still came from them, but that their version of the world was not the definitive one.',
      'A decade that felt like two. All the years from thirty-two to forty-two: the number of addresses, the number of different morning alarms, the different people sleeping in beds next to you or not. It becomes hard to remember the sequence correctly.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33f', true) },
  },

  {
    id: 'sonder_43_g',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 14 && G.age <= 17 && !G.mem?.s33g,
    text: () => pick([
      'Everyone else seemed to know something you did not — about how to dress, how to talk, some social knowledge you had somehow missed. You watched carefully and tried to derive the rule from observation. Sometimes you got it right.',
      'You felt things very intensely at this age. You know this now, looking at teenagers, in the way you couldn\'t know it then. Everything was enormous. The embarrassment lasted for months. The crush felt structural. Nothing can convince you at this age that these things are proportionate.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33g', true) },
  },

  {
    id: 'sonder_43_h',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 70 && !G.mem?.s33h,
    text: () => pick([
      'You have spanned a century. The difference between the world in the year you were born and the world now is not just technology — the physical objects, the architecture of daily life, the way information travels. It is the assumptions that were obvious then that are now obviously wrong, and the ones that will be obvious later that you cannot currently see.',
      'You have attended a number of funerals. After a certain point they are mostly peers rather than parents or grandparents. You have begun to understand funerals not as anomalies but as the structure that holds the years together.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33h', true) },
  },

  {
    id: 'sonder_43_i',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 35 && !G.mem?.s33i,
    text: () => pick([
      'You almost took a different job. The city you almost moved to. The person you almost asked. These are not regrets — they happened in a past that doesn\'t exist — but they have a texture, they are not nothing.',
      'You are at the age where you have opinions about how to do things — how to load a dishwasher, how to apologise, how to find a route through a new city — and you notice that your opinions are getting stronger. This is either wisdom or calcification. The difference is hard to assess from inside.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33i', true) },
  },

  {
    id: 'sonder_43_j',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 42 && G.age <= 58 && !G.mem?.s33j,
    text: () => pick([
      'A year in which nothing happened. You try to identify it. There must have been a year that was calm, without event, without major change. You cannot quite locate it. The years that seemed calm in the middle of them are not the same when you look back. They were full of things you hadn\'t identified yet as things.',
      'A conversation with your child that was not about logistics — not a schedule or a complaint or a request — but something actual. It didn\'t last long. The actual conversations are brief and the logistical ones are everything else. You remember the brief ones.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33j', true) },
  },

  {
    id: 'sonder_43_k',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 12 && !G.mem?.s33k,
    text: () => pick([
      'Something was wrong with the house and was never fixed. The sticky door, the window that didn\'t close all the way, the stair that creaked in a way. You registered it each time and then stopped registering it. This is how a lot of things become normal.',
      'The street you grew up on has a quality that you cannot describe accurately to anyone who didn\'t grow up on it. The smell, the exact proportion of shade to light in the afternoon, the sounds. This is not memory exactly — it\'s more like a body record.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33k', true) },
  },

{
    id: 'sonder_43_m',
    phase: 'young_adult',
    weight: 2,
    when: (G) => place.isUrban(G) && (G.age >= 18 && G.age <= 26 && !G.mem?.s33m),
    text: () => pick([
      'Living alone, the first time. The specific freedom and the loneliness, which were not opposites. The sound of the apartment when you came home to it. Learning the difference between alone-and-fine and alone-and-not-fine, and that they could be in the same evening.',
      'When you first arrived, the city. The feeling of newness that fades so quickly — the streets you had to concentrate to navigate, the landmarks you used as reference points. Within six months you stopped seeing them. Within a year they were invisible.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33m', true) },
  },

  {
    id: 'sonder_43_n',
    phase: null,
    weight: 2,
    when: (G) => place.worksInOffice(G) && (G.age >= 45 && G.age <= 60 && !G.mem?.s33n),
    text: () => pick([
      'You stopped assuming you would live forever. Not a dramatic moment — not a diagnosis or an accident. Just a Tuesday when you understood, without melodrama, that your years are finite and countable. The strangeness is that it changed less than you expected.',
      'A meeting was called because of you; the problem was you; the people in the room had decided something before you arrived. You understood this from the arrangement of the chairs. You have been in the other position — the one deciding before the meeting. The symmetry is uncomfortable.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33n', true) },
  },

  {
    id: 'sonder_43_o',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 13 && G.age <= 17 && !G.mem?.s33o,
    text: () => pick([
      'You were closest to one person for a period — two years, three years — who then became someone you see occasionally and don\'t know what to talk about. The closeness wasn\'t false while it was happening. Life moved you into different proximities.',
      'You had a period of believing something intensely — a political idea, a religious conviction, a theory about how things work — that you don\'t believe now. This is not embarrassing. It was a real engagement with a serious question. The answer changed.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33o', true) },
  },

  {
    id: 'sonder_43_p',
    phase: 'late_life',
    weight: 2,
    when: (G) => place.hasHealthcare(G) && (G.age >= 63 && !G.mem?.s33p),
    text: () => pick([
      'The stranger glimpsed through a window across a courtyard: a woman putting on an earring, a man standing very still looking at the floor, a child doing homework at a kitchen table at ten p.m. Their entire life is invisible to you except this thirty-second window, which you have now. They do not know you are watching.',
      'Names come to you now that did not come to you then. The year your mother died: you remember the room but not the name of the nurse who held your hand in the corridor. Now, inexplicably, the name arrives. Maureen. You have no idea why it comes now and not then.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33p', true) },
  },

  {
    id: 'sonder_43_q',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 25 && G.age <= 38 && !G.mem?.s33q,
    text: () => pick([
      'Someone disappeared for a year and came back changed and did not explain. You understood not to ask. The friendship continued in the shape of not asking, and that shape held.',
      'The period when you were briefly famous in a small way — locally, professionally, briefly viral on a platform that no longer exists — and then were not. The difference between the feeling of being seen and the feeling of being known. One of these fades. The other doesn\'t come from external sources.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33q', true) },
  },

  {
    id: 'sonder_43_r',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 52 && !G.mem?.s33r,
    text: () => pick([
      'You stayed too late and then walked home. The empty street at three a.m., the sound of your own shoes. The city in that specific state of emptiness. You thought something in those hours that you couldn\'t have thought in daylight.',
      'You abandoned it. You tell the story of abandoning it as a decision, but it was more of a drift. You simply went back to it less often until you stopped going back. The project does not know you abandoned it. It just sits in a folder.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33r', true) },
  },

  {
    id: 'sonder_43_s',
    phase: 'childhood',
    weight: 2,
    when: (G) => place.hasBooks(G) && (G.age >= 6 && G.age <= 11 && !G.mem?.s33s),
    text: () => pick([
      'A toy, or a book, or a game was everything to you for one year, and you have not thought about it since. The intensity of that attachment — the way it occupied imagination entirely — has nothing to do with how long it lasted.',
      'Adults kept information from you. Some of it you found out later and it explained things. Some of it you never found out and it remains a gap — the version of an event you assembled from what you were allowed to know.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33s', true) },
  },

{
    id: 'sonder_43_u',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 21 && G.age <= 30 && !G.mem?.s33u,
    text: () => pick([
      'You have saved letters, or messages. Not all of them — a selection, weighted toward the ones that arrived at moments when you needed exactly them. You look at them rarely, maybe once a decade. But knowing they exist changes something.',
      'The body during a period of illness: the geography of the unwell body, the way the ceiling of a room looks different when you have been staring at it from a bed for three days, the slowness with which normal life reassembles after.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33u', true) },
  },

{
    id: 'sonder_43_w',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 15 && G.age <= 18 && !G.mem?.s33w,
    text: () => pick([
      'You understood your parents were people — not parents-as-function but actual people with their own interior lives, their own regrets, their own versions of wanting something they hadn\'t gotten. It came through some specific small thing they said or did. The understanding was uncomfortable and important.',
      'You found something that mattered: a book, a song, a film, a person, an idea. For a period everything looked different through the lens of this thing. You could not explain it to someone who hadn\'t encountered it. You tried. The explanation failed.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33w', true) },
  },

  {
    id: 'sonder_43_x',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 72 && !G.mem?.s33x,
    text: () => pick([
      'At this hour, in this season, the light. You have been watching it for decades from this window or a window like this one. The light is the same light that has been here the whole time. The observation is not profound — it is just accurate.',
      'You have never answered it to your own satisfaction. Not a question that someone asked you — a question you have been carrying. It is possible that it will not be answered. You have made a kind of peace with that. The peace is not resolution.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33x', true) },
  },

  {
    id: 'sonder_43_y',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 40 && !G.mem?.s33y,
    text: () => pick([
      'At dinner the conversation turned and became something real — not the performance of dinner-party intelligence but an actual disagreement or an actual confession or an actual silence that nobody rushed to fill. Rare. You remember the quality of that room.',
      'You slept badly for a long stretch. Not dramatically — no nightmare, no crisis — just a consistent lack of full sleep that lasted for months and that coloured everything slightly wrong. Then it ended, also without drama. You did not notice the exact night it ended.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33y', true) },
  },

{
    id: 'sonder_43_aa',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.season === 'summer' && (G.age >= 9 && G.age <= 13 && !G.mem?.s33aa),
    text: () => pick([
      'The way time moved differently then. A summer afternoon lasted as long as some later years. This is not sentimentality — it is how time actually worked then, when almost everything was new and required processing. The compression comes later, when the new runs out.',
      'You had a particular way of being alone as a child — a game you played that you didn\'t tell anyone about, a story you were always in the middle of, a version of yourself that existed only in the private space of an unoccupied afternoon.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33aa', true) },
  },

{
    id: 'sonder_43_ac',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 34 && !G.mem?.s33ac,
    text: () => pick([
      'Looking back, one year was the year you were most yourself. You can identify it from this distance in a way you couldn\'t from inside. Something was aligned — the work and the people and the energy — in a way that hasn\'t been quite the same since. This is not tragic. It might happen again. It\'s just accurate.',
      'You learned something from someone who was terrible in other ways. You have been trying to separate the thing they taught you from the person they were, because both are real. The separation is useful and incomplete.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33ac', true) },
  },

]
