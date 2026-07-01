// events_sonder_45.js
// Contemplative layer — 30 events.
// Themes: the document that defines you, standing in queues through a life,
// the neighbourhood over decades, the conversation you almost didn't have,
// learning something new late, cooking from memory, retirement as a concept.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_45 = [

  {
    id: 'sonder_45_a',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 30 && !G.mem?.s35a,
    text: pick([
      'There is a document that defines you to systems that don\'t know you. An ID card, a passport, a residence permit. The document reduces you to a set of categories that are accurate and insufficient. You carry it. The carrying becomes so habitual that you notice only when it is absent.',
      'The year you moved to a new place: the specific disorientation of not knowing which bus goes where, not knowing which shop stays open late, not knowing the names of the streets in a way that means you can navigate without checking. The knowing comes slowly and then is just the knowledge of a place.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s35a', true) },
  },

  {
    id: 'sonder_45_b',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 52 && !G.mem?.s35b,
    text: pick([
      'You have been standing in queues your whole life. The queue at the office, the queue at the clinic, the queue at the border, the queue at the supermarket in the bad years. You have learned the posture of waiting: the specific relationship to time that queuing requires, the way the mind goes when the body has nothing to do but stand.',
      'The neighbourhood has changed. Not from yesterday to today — from a decade ago to now. The corner shop is a different kind of shop. The buildings that were low are high. The people who were there have moved and different people have arrived. You are one of the ones who stayed, and the perspective of the stayer is different from the perspective of either arrival.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s35b', true) },
  },

  {
    id: 'sonder_45_c',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.s35c,
    text: pick([
      'Retirement is a concept that arrived suddenly as a date and is now a condition. The condition is not what you expected when the date was far away. What you expected was rest. What arrived was: the structure is gone and the structure is what the day was organized around and without it the day is open in a way that requires a different organization than you have previously needed to build.',
      'You are learning what your body can do at this age that it could not do at fifty. There are some things. Patience, in the literal physical sense — you can wait in a chair for a long time without needing to be doing something else. This is not nothing. This is not the same as the things that have gone away.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.r += 3; p.setMem('s35c', true) },
  },

  {
    id: 'sonder_45_d',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 12 && !G.mem?.s35d,
    text: pick([
      'There is a recipe your grandmother makes that does not have a written version. It exists only in her hands. You watch the hands sometimes without understanding that this is the archive — not a book, not a card, but the specific motion of a specific person. You will try to make it later and the version you make will be a reconstruction from watching the hands.',
      'You are learning to read people. Not reading — you can read — but reading people: the gap between what a face says and what the person says, the way certain silences are answers, the tone that means something different from the words. This is the education that happens outside school.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.s += 2; p.setMem('s35d', true) },
  },

  {
    id: 'sonder_45_e',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 24 && G.age <= 34 && !G.mem?.s35e,
    text: pick([
      'The phone call you almost didn\'t make. The one you had been putting off for a week and then made on a Tuesday because you were passing through the station and had twenty minutes. What came out of it was the conversation you needed to have been having for two years. You were making it out of convenience and it turned into something else. You still think about it.',
      'You have a skill now that you did not have three years ago. Not a professional skill — something else: how to navigate a specific kind of difficult conversation, or how to cook one particular thing, or how to tell when a situation is about to get worse before it shows external signs of getting worse. You learned it from the situation that required it.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.e += 2; p.setMem('s35e', true) },
  },

  {
    id: 'sonder_45_f',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 54 && !G.mem?.s35f,
    text: pick([
      'There was a year in this decade that was particularly quiet. No major events — no crisis, no breakthrough, no loss. The year is thin in memory as a result. The thin years are the good years and also the ones you can\'t remember. Both of these things are true and neither resolves the other.',
      'You cook something from memory now — a dish your mother made, or your grandmother, the one that requires no recipe because it is in the hands and the nose and the specific memory of a kitchen in a different decade. The version you make is not the same version. The version you make is what you carry forward.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.r += 3; p.setMem('s35f', true) },
  },

  {
    id: 'sonder_45_g',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 15 && G.age <= 20 && !G.mem?.s35g,
    text: pick([
      'You are watching your parents be wrong about something. Not wrong in the way that parents are sometimes wrong — actually wrong, in a way you can see, in a domain where you know more than they do. This is new. The new thing is the specific discomfort of knowing something that the people who are supposed to know things don\'t know.',
      'The group you belong to and the group you are beginning to separate from are the same group. The separation happens slowly and is not declared. You are changing your position relative to the people you grew up with without anyone saying so. The position change will become visible in five years. Right now it is interior.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.r += 3; p.setMem('s35g', true) },
  },

  {
    id: 'sonder_45_h',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 44 && G.age <= 58 && !G.mem?.s35h,
    text: pick([
      'You are learning something new at this age. Not for professional development — something you chose because you wanted to: an instrument, a language, a physical skill. The learning at forty-seven is different from the learning at nineteen: slower, more frustrating, and also something else — you know why you\'re doing it, which you often didn\'t at nineteen. The knowing why is a different kind of attention than the learning itself.',
      'The commute you have been doing for eleven years and the thing you notice today that you have never noticed in eleven years. A mural on a wall you have passed a thousand times. A business you have never registered. The infrastructure of familiarity, and then suddenly a gap in it.',
    ]),
    choices: null,
    effect: (p) => { p.e += 3; p.m += 2; p.setMem('s35h', true) },
  },

  {
    id: 'sonder_45_i',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.s35i,
    text: pick([
      'The things that take longer now. The list is longer than it was. You add items to the list as you encounter them and try not to make the list the subject of too much attention, because attention to the list is not the same as doing anything about it and also produces a feeling you do not find useful.',
      'Your children are navigating something you navigated at their age. You watch them navigate it and understand exactly how it will go and know that this knowledge is not transferable. The knowledge must be acquired by navigating the thing. You watch and try not to signal that you know how it goes.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s35i', true) },
  },

  {
    id: 'sonder_45_j',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 32 && !G.mem?.s35j,
    text: pick([
      'You were lonely for a period. Not unhappy exactly — working, productive, connected in the surface sense — but lonely in the interior sense: the kind that comes from not being known rather than from being alone. You have not talked about this period. It is in the record now only in what it produced: the changes you made when it ended, the things you now value about your life that you did not value before you understood what their absence felt like.',
      'The friend who sees you differently from how you see yourself. Not better or worse — differently. Their version of you is always slightly surprising and always has something accurate in it that your version misses. You use this friend the way you use a mirror that shows an angle you can\'t see from the front.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.r += 3; p.setMem('s35j', true) },
  },

  {
    id: 'sonder_45_k',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 13 && !G.mem?.s35k,
    text: pick([
      'There is a place in this town or this street or this building where you go when you need to be by yourself. Not hidden — just the place that is yours when you need to be in it. You do not explain this place to anyone. It does not require explaining. It is the geography of your interior life, which has a geography before you know enough to describe it.',
      'The summer (or the dry season, or the school holiday, depending on where you are): the specific expanse of it, the way time moved differently, the project you had and abandoned and had again. You will remember it as a whole but it was really a series of days each of which required managing.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s35k', true) },
  },

  {
    id: 'sonder_45_l',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && G.age <= 56 && !G.mem?.s35l,
    text: pick([
      'You are having a different relationship to disagreement than you had at thirty. At thirty you needed to settle it — to resolve, to win, to produce agreement from the disagreement. Now you can leave it unsettled more often. Not because you care less but because you understand that some disagreements are stable states, not problems to solve.',
      'Someone you know is going through the thing you went through seven years ago. Not identical — but recognizably the same shape of thing. You offer what you know. You know that what you offer is useful and also not quite enough, because useful is not the same as the experience of the thing.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.r += 3; p.setMem('s35l', true) },
  },

  {
    id: 'sonder_45_m',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 14 && G.age <= 19 && !G.mem?.s35m,
    text: pick([
      'The music you are listening to this year. Not the music that will last — you don\'t know yet which will last — but the music that is the soundtrack of this specific year: the one that plays during the commute, the one you have memorized without meaning to. This music is going to become the music that places this period of your life when you hear it at thirty-five. You don\'t know this yet.',
      'You are lying about something small. Not a harmful lie — a lie of social management: the thing you say that is easier than the thing that is true, repeated often enough that you have forgotten which version is the one you say in which context. The management of small lies is its own kind of administration.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s35m', true) },
  },

  {
    id: 'sonder_45_n',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 70 && !G.mem?.s35n,
    text: pick([
      'There is something you have not done and will not do now. The window for it has closed — not because of illness or failure but because the sequence of decisions that would have led to it required choosing it earlier than you chose. You know this without grief exactly. You hold it as a fact about the configuration of a life: it was one configuration and not another. Every configuration excludes other configurations.',
      'You have been watching the same argument cycle through in your family for three generations. The argument has different people in it each cycle but the structure is the same. You can see the structure clearly from where you are, which is outside it. You were inside it once. You are not sure you could tell them what you see. You are not sure it would help.',
    ]),
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('s35n', true) },
  },

  {
    id: 'sonder_45_o',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 26 && G.age <= 36 && !G.mem?.s35o,
    text: pick([
      'The city at 2 a.m. is a different city from the city at 2 p.m. You have been in both versions and know both and they share geography but not atmosphere. The 2 a.m. city: the specific populations out, the specific silences and specific sounds, the way the air quality changes. You have some of your best conversations in the 2 a.m. city and you do some of your worst thinking in it.',
      'You have a theory about how things work — the relationship, the career, the financial plan — and then the thing happens that the theory did not account for. You revise the theory. The revision makes the theory more accurate and smaller. The more accurate the theory gets, the smaller it gets. You keep revising.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s35o', true) },
  },

  {
    id: 'sonder_45_p',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 46 && G.age <= 58 && !G.mem?.s35p,
    text: pick([
      'The conversation at the kitchen table that went longer than a conversation usually goes. Not a fight, not a resolution — a conversation that found its way into the actual subject rather than the social surface of the subject. You have these rarely. When you have one you recognize it by how different the feeling is from what you thought conversations were.',
      'You have a decade of evidence about yourself now that you didn\'t have at thirty. The evidence tells you: some things about yourself are not going to change, and identifying which things those are is a form of self-knowledge that is only available from this distance. The list of unchangeable things is shorter than you feared and longer than you hoped.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.r += 4; p.setMem('s35p', true) },
  },

  {
    id: 'sonder_45_q',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 9 && G.age <= 14 && !G.mem?.s35q,
    text: pick([
      'There is someone in this neighbourhood who has always been old. Older than your parents, older than the oldest person you know well. This person has been old since you can remember, which is the whole span of your consciousness so far. You will learn later that old people were young once and that the knowledge is available but not fully imaginable until you are old yourself.',
      'The animal in the family: the dog or cat or the goat or the chicken, the creature that is part of the household without being a person. Your relationship to this creature is uncomplicated in a way that very few of your relationships are. You notice this without knowing yet what to make of it.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s35q', true) },
  },

  {
    id: 'sonder_45_r',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 50 && !G.mem?.s35r,
    text: pick([
      'You are carrying something from a decade ago that you haven\'t set down. Not dramatically — it doesn\'t stop your life. But it is weight, and you are aware of the weight, and occasionally you consider whether setting it down is possible and what the action of setting it down would look like. The action is not obvious.',
      'Your children ask you about something from your past. Not an interrogation — a real question, from curiosity. You answer it and in the answering discover that your memory of the event and the version you tell them are not identical. You are editing without deciding to edit. The version you tell becomes the version they carry.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s35r', true) },
  },

  {
    id: 'sonder_45_s',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 38 && !G.mem?.s35s,
    text: pick([
      'The season in a different country. You expected to adjust and you have adjusted but the seasonal expectation — the specific light, the specific temperature, the smell of a month — has not adjusted entirely. Your body is still calibrated to the original place. You feel this at odd moments: a scent in the air that belongs somewhere else.',
      'You have done this enough times — the meeting, the negotiation, the application, the interview — that you know the shape of it. Not comfortable, exactly, but familiar. The familiarity reduces the cost of it. The cost is still nonzero but it used to be higher.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s35s', true) },
  },

  {
    id: 'sonder_45_t',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 66 && G.age <= 78 && !G.mem?.s35t,
    text: pick([
      'Your grandchildren are growing up in a world you recognize and don\'t recognize. You recognize the structure of childhood. You don\'t recognize most of the specifics: the devices, the problems, the configurations of social life they navigate. You offer the structure where you can. You stay quiet about the specifics because the specifics were different in your version.',
      'There are people who exist for you only in memory now. The memory is vivid in some places and has gaps in others. The gaps grow slowly and you become aware of them by reaching for a detail that is no longer there. A face is available but not the voice. A voice is available but not the words from a specific conversation.',
    ]),
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('s35t', true) },
  },

  {
    id: 'sonder_45_u',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 43 && G.age <= 55 && !G.mem?.s35u,
    text: pick([
      'You notice you have started doing the thing your father or mother did. The gesture, the phrase, the specific response to a specific situation. You caught it and it was already out of you before you caught it. This is how things transfer between generations: not by decision but by the body, which has been watching for decades.',
      'The project you started two years ago that you have not finished and may not finish. It is still there — in a folder, in a box, in a space in the mind. Not abandoned exactly. In suspension. The suspension is comfortable enough that the completion keeps being delayed. You are deciding whether to finish it or to name the suspension as its actual status.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s35u', true) },
  },

  {
    id: 'sonder_45_v',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 6 && G.age <= 11 && !G.mem?.s35v,
    text: pick([
      'There is a word in the language you\'re growing up in that doesn\'t exist in the other language, if there is another language. Or a concept that the two languages handle differently. You are learning, without being taught, that language shapes what is available to think. You don\'t have this formulation yet. You have the feeling that you can think certain things only in one direction.',
      'You are memorizing something without trying: the phone number of the house, the bus route, the layout of the school. The memorizing is automatic and the things memorized are fixed. In forty years you will still know the number of the house in a way you will not know things you deliberately tried to remember.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s35v', true) },
  },

  {
    id: 'sonder_45_w',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 24 && G.age <= 35 && !G.mem?.s35w,
    text: pick([
      'The decision that did not feel like a decision at the time. The thing you chose by doing it rather than by deliberation: the city you stayed in, the person you kept seeing, the job you stayed at past the point of certainty. Looking back these look like decisions. They were also just sequences of days in which you did not choose to do something different.',
      'You are at the beginning of something — a relationship, a career stage, a project — and you know it is the beginning but you can\'t see the shape of the whole thing from here. You are in the position of someone who has started a book they haven\'t read before. You don\'t know if it will be what it looks like right now.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s35w', true) },
  },

  {
    id: 'sonder_45_x',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 72 && !G.mem?.s35x,
    text: pick([
      'The house or the apartment that you have lived in longer than any previous place. This place has absorbed a decade of a specific kind of life — the marks on the doorframe, the shelf that lists slightly, the window that sticks in summer. The place has more of your history in it than you have in any other place. This is different from being at home, though it is also that.',
      'You have watched a technology arrive, become ubiquitous, and begin to become obsolete. You have watched this happen twice, or three times, depending on how long you have been paying attention. The pattern is always: it is going to change everything; it does change some things; it becomes part of the background; something else arrives.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.r += 4; p.setMem('s35x', true) },
  },

  {
    id: 'sonder_45_y',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 48 && G.age <= 60 && !G.mem?.s35y,
    text: pick([
      'The person you were in an argument with years ago and are now not in argument with. Not because the argument was resolved — it was ended, which is different. Ended by time, by both of you needing something the argument was consuming. The thing you disagreed about is still true. You are not arguing about it. This is a different state from resolution.',
      'You are giving something away. Not metaphorically — an object, a piece of furniture, books, something physical. The giving away is a specific action of deciding that the thing you are giving away does not need to keep moving forward with you. This is not loss. This is a kind of editing. The editing feels clean.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.r += 3; p.setMem('s35y', true) },
  },

  {
    id: 'sonder_45_z',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 16 && G.age <= 21 && !G.mem?.s35z,
    text: pick([
      'The first money you earned yourself. Not given, not a gift — earned by doing a thing someone agreed to pay you to do. The amount is not relevant. What is relevant is the specific difference between this money and given money: the first is yours in a way the second isn\'t, exactly, which is a feeling before it is an economic fact.',
      'You have a friend who is going through something you are not going through. The difference in your situations is clear to both of you and neither of you says it. You offer what you can, which is presence, which is not enough and is also something. You learn from this that being alongside is different from helping.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s35z', true) },
  },

  {
    id: 'sonder_45_aa',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 52 && !G.mem?.s35aa,
    text: pick([
      'The recurring dream. Not always the same dream — the same category of dream: the one where you are in the school you went to forty years ago and it is enormous and you can\'t find the exit, or the one where you have a test you have not prepared for, or the one where you can\'t run fast enough. The dream is not about the school or the test. The dream is about the feeling, which is available at any age.',
      'A place from your childhood has been demolished. You find out from a photograph someone posts. The place was not important in the way that famous places are important. It was important in the way that specific places in childhood are important: it was the place, and being the place was the whole of what it needed to be.',
    ]),
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('s35aa', true) },
  },

  {
    id: 'sonder_45_ab',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && G.age <= 77 && !G.mem?.s35ab,
    text: pick([
      'You still have most of your faculties. You think about this sometimes, in the way you think about the weather when it is good: aware of it, grateful without having to say so, aware also that the awareness is partly an awareness of the alternative.',
      'Someone is reading a book you read fifty years ago and asks you what you thought of it. You remember what you thought of it. You have also changed enough since then that what you thought of it is partially historical information about a person who no longer exists and partially still continuous with your current reading of it. The book is the same book. The reader is not the same reader.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.r += 4; p.setMem('s35ab', true) },
  },

  {
    id: 'sonder_45_ac',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 32 && !G.mem?.s35ac,
    text: pick([
      'You have arrived somewhere at the same time as thousands of other people: a concert, a sporting event, a political gathering, a memorial. The being-together-in-the-same-direction is a specific experience. Not community — you don\'t know these people. Something else: the temporary fact of a large number of people oriented toward the same thing, the warmth of it, the specific sound of it, the way it ends and disperses and you are separate again.',
      'You have been in a relationship long enough now to know what the arguments are actually about. Not what the arguments say they are about — the dishes, the schedule, the money. What they are actually about: the thing underneath, which is always one of a small number of things. Knowing this does not make the argument shorter but it makes it more navigable.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.s += 2; p.setMem('s35ac', true) },
  },

  {
    id: 'sonder_45_ad',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 46 && G.age <= 60 && !G.mem?.s35ad,
    text: pick([
      'The work you do that nobody counts. Not unvalued — people would notice if it stopped. But not tracked: the email at 7 p.m., the thing you thought of at 2 a.m. and dealt with, the version of the meeting that happened before the meeting. The invisible scaffold of the visible outcomes. You know this is what you do. You would like someone else to know it too.',
      'Your body is slower to recover now. Not dramatically — you don\'t notice it each day. You notice it in the comparison: a week of bad sleep at forty-eight is different from a week of bad sleep at thirty-two in a way that is not about the number of hours. The recovery time has extended. You are accounting for the extension.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s35ad', true) },
  },

]
