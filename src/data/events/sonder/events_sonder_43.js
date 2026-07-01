// events_sonder_43.js — contemplative prose layer, weight 2, no choices, no new flags

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_43 = [

  {
    id: 'sonder_43_a',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 28 && !G.mem?.s33a,
    text: pick([
      'The years when you moved a lot. Different rooms, different cities, different people eating breakfast in kitchens you were temporarily part of. At the time it felt like freedom. Later it felt like something else — not regret exactly, but a recognition that you were practising a kind of lightness that was not what you actually wanted.',
      'Someone fell asleep on your shoulder on a bus or a train, a stranger, a heavy reliable weight, and they woke up embarrassed and you said something to make it normal and both of you faced forward again. That was the whole of it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33a', true) },
  },

  {
    id: 'sonder_43_b',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 55 && !G.mem?.s33b,
    text: pick([
      'The clothes in the back of the wardrobe that you are not going to wear again but have not yet decided. The category: things you cannot quite release, held in a space between the present and a past self who fits into them.',
      'Your handwriting has changed. Compared to letters from twenty years ago — the slope is different, the letters more compressed. You do not remember the change happening. It just became this, at some point, without announcement.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33b', true) },
  },

  {
    id: 'sonder_43_c',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 13 && !G.mem?.s33c,
    text: pick([
      'The adult who never talked down to you. Who explained things the way they would explain to another adult, without softening. You remember this person more vividly than others from that time, because being taken seriously at that age is unusual enough to register.',
      'The time that felt like it would last forever: a summer afternoon, a specific quality of late light, a game with rules that you all understood without writing them down. It ended. You did not know it was ending.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33c', true) },
  },

  {
    id: 'sonder_43_d',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s33d,
    text: pick([
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
    text: pick([
      'The period when you called your parents less. You were busy, or there was nothing to report, or the calls felt like obligation rather than connection. Later you understood this was a standard part of becoming your own person. The understanding didn\'t remove the small guilt of it.',
      'The person you were going to become — the one you imagined at eighteen, at twenty-two, the version of yourself five years ahead — does not quite match what you became. This is not a failure. It is just the specific way that becoming works.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33e', true) },
  },

  {
    id: 'sonder_43_f',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 48 && !G.mem?.s33f,
    text: pick([
      'The moment when you realised your parents were wrong about something — not a small thing but something structural, a belief they had built a life around — and that this was fine, that they were still your parents and you still came from them, but that their version of the world was not the definitive one.',
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
    text: pick([
      'The feeling that everyone else knew something you didn\'t — about how to dress, how to talk, some social knowledge you had somehow missed. You watched carefully and tried to derive the rule from observation. Sometimes you got it right.',
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
    text: pick([
      'The century you have spanned. The difference between the world in the year you were born and the world now is not just technology — the physical objects, the architecture of daily life, the way information travels. It is the assumptions that were obvious then that are now obviously wrong, and the ones that will be obvious later that you cannot currently see.',
      'You have attended a number of funerals. After a certain point they are mostly peers rather than parents or grandparents. You have begun to understand funerals not as anomalies but as the structure that holds the years together.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33h', true) },
  },

  {
    id: 'sonder_43_i',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 35 && !G.mem?.s33i,
    text: pick([
      'The job you almost took. The city you almost moved to. The person you almost asked. These are not regrets — they happened in a past that doesn\'t exist — but they have a texture, they are not nothing.',
      'You are at the age where you have opinions about how to do things — how to load a dishwasher, how to apologise, how to find a route through a new city — and you notice that your opinions are getting stronger. This is either wisdom or calcification. The difference is hard to assess from inside.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33i', true) },
  },

  {
    id: 'sonder_43_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && G.age <= 58 && !G.mem?.s33j,
    text: pick([
      'The year nothing happened. You try to identify it. There must have been a year that was calm, without event, without major change. You cannot quite locate it. The years that seemed calm in the middle of them are not the same when you look back. They were full of things you hadn\'t identified yet as things.',
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
    text: pick([
      'The thing that was wrong with your house that was never fixed. The sticky door, the window that didn\'t close all the way, the stair that creaked in a specific way. You registered it each time and then stopped registering it. This is how a lot of things become normal.',
      'The street you grew up on has a quality that you cannot describe accurately to anyone who didn\'t grow up on it. The smell, the exact proportion of shade to light in the afternoon, the specific sounds. This is not memory exactly — it\'s more like a body record.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33k', true) },
  },

  {
    id: 'sonder_43_l',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && G.age <= 70 && !G.mem?.s33l,
    text: pick([
      'The things you finally stopped worrying about. Not through therapy or decision but through a kind of natural erosion. The opinion of certain people. A particular failure from fifteen years ago. The comparison you used to make between yourself and someone else. They just stopped mattering. You notice the silence where they were.',
      'The body at this age requires more attention than it used to. This is not a complaint — it is an accounting. You are aware of it as a system in a way you were not when it simply worked without your noticing. The noticing is not pleasant but it is accurate.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33l', true) },
  },

  {
    id: 'sonder_43_m',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 26 && !G.mem?.s33m,
    text: pick([
      'The first time you lived alone. The specific freedom and the specific loneliness, which were not opposites. The sound of the apartment when you came home to it. Learning the difference between alone-and-fine and alone-and-not-fine, and that they could be in the same evening.',
      'The city when you first arrived in it. The feeling of newness that fades so quickly — the streets you had to concentrate to navigate, the landmarks you used as reference points. Within six months you stopped seeing them. Within a year they were invisible.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33m', true) },
  },

  {
    id: 'sonder_43_n',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 45 && G.age <= 60 && !G.mem?.s33n,
    text: pick([
      'The moment you stopped assuming you would live forever. Not a dramatic moment — not a diagnosis or an accident. Just a Tuesday when you understood, without melodrama, that your years are finite and countable. The strangeness is that it changed less than you expected.',
      'The meeting that was called because of you, where the problem was you, where the people in the room had decided something before you arrived. You understood this from the arrangement of the chairs. You have been in the other position — the one deciding before the meeting. The symmetry is uncomfortable.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33n', true) },
  },

  {
    id: 'sonder_43_o',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 13 && G.age <= 17 && !G.mem?.s33o,
    text: pick([
      'The friend you were closest to for a period — two years, three years — who then became someone you see occasionally and don\'t know what to talk about. The closeness wasn\'t false while it was happening. Life moved you into different proximities.',
      'You had a period of believing something intensely — a political idea, a religious conviction, a theory about how things work — that you don\'t believe now. This is not embarrassing. It was a real engagement with a serious question. The answer changed.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33o', true) },
  },

  {
    id: 'sonder_43_p',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 63 && !G.mem?.s33p,
    text: pick([
      'The stranger glimpsed through a window across a courtyard: a woman putting on an earring, a man standing very still looking at the floor, a child doing homework at a kitchen table at ten p.m. Their entire life is invisible to you except this thirty-second window, which you have now. They do not know you are watching.',
      'The names that come to you now that didn\'t come to you then. The year your mother died: you remember the room but not the name of the nurse who held your hand in the corridor. Now, inexplicably, the name arrives. Maureen. You have no idea why it comes now and not then.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33p', true) },
  },

  {
    id: 'sonder_43_q',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 25 && G.age <= 38 && !G.mem?.s33q,
    text: pick([
      'The friend who disappeared for a year and came back changed and didn\'t explain. You understood not to ask. The friendship continued in the shape of not asking, and that shape held.',
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
    text: pick([
      'The party where you stayed too late and then walked home. The empty street at three a.m., the sound of your own shoes. The city in that specific state of emptiness. You thought something in those hours that you couldn\'t have thought in daylight.',
      'The project you abandoned. You tell the story of abandoning it as a decision, but it was more of a drift. You simply went back to it less often until you stopped going back. The project does not know you abandoned it. It just sits in a folder.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33r', true) },
  },

  {
    id: 'sonder_43_s',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 6 && G.age <= 11 && !G.mem?.s33s,
    text: pick([
      'The toy or the book or the game that was everything to you for one year and that you have not thought about since. The intensity of that attachment — the way it occupied imagination entirely — has nothing to do with how long it lasted.',
      'Adults kept information from you. Some of it you found out later and it explained things. Some of it you never found out and it remains a gap — the version of an event you assembled from what you were allowed to know.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33s', true) },
  },

  {
    id: 'sonder_43_t',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.s33t,
    text: pick([
      'You know things about your city that no one else knows in quite the same configuration — the building that used to be a cinema, the street that was renamed twice, the family that lived in the house on the corner before it was demolished. This knowledge is not recorded. When you are gone it is gone.',
      'The illness that changed how you relate to your body: the first real illness, the first time the body stopped being background and became foreground, a thing that required management rather than simply doing what you asked. You became a different kind of person after that. Not worse — different.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33t', true) },
  },

  {
    id: 'sonder_43_u',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 21 && G.age <= 30 && !G.mem?.s33u,
    text: pick([
      'The letters or messages you have saved. Not all of them — a selection, weighted toward the ones that arrived at moments when you needed exactly them. You look at them rarely, maybe once a decade. But knowing they exist changes something.',
      'The body during a period of illness: the specific geography of the unwell body, the way the ceiling of a room looks different when you have been staring at it from a bed for three days, the slowness with which normal life reassembles after.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33u', true) },
  },

  {
    id: 'sonder_43_v',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 48 && G.age <= 60 && !G.mem?.s33v,
    text: pick([
      'You are the age your parents were when you were young. The age that seemed like adulthood accomplished. You remember being ten and looking at them at this age and thinking: they know everything now. You are now that age. The feeling from the inside is different from the view from ten.',
      'The things you say now that you heard your parents say — phrases, opinions, the specific way of assessing a situation. You hear it leaving your mouth and you recognise its origin. This is either frightening or reassuring. Both, probably.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33v', true) },
  },

  {
    id: 'sonder_43_w',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 15 && G.age <= 18 && !G.mem?.s33w,
    text: pick([
      'The moment you understood your parents were people — not parents-as-function but actual people with their own interior lives, their own regrets, their own versions of wanting something they hadn\'t gotten. It came through some specific small thing they said or did. The understanding was uncomfortable and important.',
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
    text: pick([
      'The light at this particular hour in this particular season. You have been watching it for decades from this window or a window like this one. The light is the same light that has been here the whole time. The observation is not profound — it is just accurate.',
      'The question you have never answered to your own satisfaction. Not a question that someone asked you — a question you have been carrying. It is possible that it will not be answered. You have made a kind of peace with that. The peace is not resolution.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33x', true) },
  },

  {
    id: 'sonder_43_y',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 40 && !G.mem?.s33y,
    text: pick([
      'The dinner party where the conversation turned and became something real — not the performance of dinner-party intelligence but an actual disagreement or an actual confession or an actual silence that nobody rushed to fill. Rare. You remember the specific quality of that room.',
      'The phase when you slept badly for a long time. Not dramatically — no nightmare, no crisis — just a consistent lack of full sleep that lasted for months and that coloured everything slightly wrong. Then it ended, also without drama. You did not notice the exact night it ended.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33y', true) },
  },

  {
    id: 'sonder_43_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 43 && G.age <= 56 && !G.mem?.s33z,
    text: pick([
      'The moment, in an argument, when you realised you were wrong. You did not say so in that moment. You said something else that meant you could leave the room with your position intact. You corrected your view privately, over the following days, without ever saying so.',
      'The photograph from when you were thirty that you came across recently. The face is recognisably yours but the expression is unfamiliar — an openness, a readiness, something not yet fixed. You don\'t know if you like or miss the person in that photograph. Both seems closest.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33z', true) },
  },

  {
    id: 'sonder_43_aa',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 9 && G.age <= 13 && !G.mem?.s33aa,
    text: pick([
      'The way time moved differently then. A summer afternoon lasted as long as some later years. This is not sentimentality — it is how time actually worked then, when almost everything was new and required processing. The compression comes later, when the new runs out.',
      'You had a particular way of being alone as a child — a game you played that you didn\'t tell anyone about, a story you were always in the middle of, a version of yourself that existed only in the private space of an unoccupied afternoon.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33aa', true) },
  },

  {
    id: 'sonder_43_ab',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && G.age <= 68 && !G.mem?.s33ab,
    text: pick([
      'The return to a city you lived in years ago. The streets are recognisable and wrong — the specific wrongness of a place that has continued without you. The café is a bank. The bank is something else. The person you were in that city is harder to access than the map of the streets.',
      'The conversation with a much younger person where you understood they were not simply a younger version of you. They have different reference points, different assumptions about what is normal, different things they take for granted. The world they grew up in was not the world you grew up in, even if it shares geography.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33ab', true) },
  },

  {
    id: 'sonder_43_ac',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 34 && !G.mem?.s33ac,
    text: pick([
      'The year you were most yourself, looking back. You can identify it from this distance in a way you couldn\'t from inside. Something was aligned — the work and the people and the energy — in a way that hasn\'t been quite the same since. This is not tragic. It might happen again. It\'s just accurate.',
      'You learned something from someone who was terrible in other ways. You have been trying to separate the thing they taught you from the person they were, because both are real. The separation is useful and incomplete.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33ac', true) },
  },

]
