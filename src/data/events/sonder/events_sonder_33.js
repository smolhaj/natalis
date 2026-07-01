// events_sonder_33.js — contemplative prose layer, weight 2, no choices, no new flags

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_33 = [

  {
    id: 'sonder_33_a',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 32 && !G.mem?.s33a,
    text: pick([
      'The letter you wrote that you did not send. You reread it once and understood what you actually meant, and then you did not send it, but you kept what you understood.',
      'The other person in the queue who has been waiting longer than you have. You wonder about the thing they are waiting for. The queue moves.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33a', true) },
  },

  {
    id: 'sonder_33_b',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 54 && !G.mem?.s33b,
    text: pick([
      'The recurring sensation of having forgotten something important, followed by the knowledge that you have not — that this is just a feeling the morning produces.',
      'The colleague you have worked alongside for a decade and still do not know well. The knowledge of their professional self is complete. The rest of them is entirely unknown to you.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33b', true) },
  },

  {
    id: 'sonder_33_c',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 63 && !G.mem?.s33c,
    text: pick([
      'The light through a window at a particular angle that you have seen before, in a different house, in a different decade. The light does not know this. You carry the comparison.',
      'The year you did not think would be significant and which turned out to be the year everything changed. In retrospect the signs were there. In the year itself the signs were invisible.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33c', true) },
  },

  {
    id: 'sonder_33_d',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 13 && !G.mem?.s33d,
    text: pick([
      'The game with rules that only your group knows, invented over two summers and now elaborate enough to take all afternoon. Outside the group, the rules do not exist.',
      'The smell of this kitchen at this time of year. You will be forty-five before you understand why a kitchen smell from childhood has the weight it has. The understanding does not add to the weight.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33d', true) },
  },

  {
    id: 'sonder_33_e',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 24 && G.age <= 38 && !G.mem?.s33e,
    text: pick([
      'The people whose names you have forgotten from the year you remember very clearly. The year is vivid. The names are gone. The people are somewhere with their names intact.',
      'The work that was good today. Not exceptional — just good. The solidity of having done a thing well and knowing it. The quiet of that particular satisfaction.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33e', true) },
  },

  {
    id: 'sonder_33_f',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 14 && G.age <= 19 && !G.mem?.s33f,
    text: pick([
      'The song that is everywhere this season. You will hear it in twenty years and be returned to exactly here — the specific temperature, the specific unsettled feeling of this period.',
      'The version of yourself you perform for different audiences. The performance is not exactly lying. It is the selection of which true thing to present in which room.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33f', true) },
  },

  {
    id: 'sonder_33_g',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 44 && G.age <= 58 && !G.mem?.s33g,
    text: pick([
      'The friend who has known you for twenty-five years. The version of you they know includes people and places and decisions that no one in your current life has any access to. They are a kind of archive.',
      'You are still carrying something from a conversation ten years ago that the other person has certainly forgotten. The sentence is still in you, doing its work.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33g', true) },
  },

  {
    id: 'sonder_33_h',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.s33h,
    text: pick([
      'The habit you inherited from your mother or your father that you did not know you had until someone pointed it out. The gesture, the phrase, the particular way of handling a situation.',
      'The accumulation of ordinary days that a life is made of. Not the events — the days between them. The breakfast, the walk, the unremarkable afternoon. The ordinary is the texture. The events are just what the ordinary is interrupted by.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33h', true) },
  },

  {
    id: 'sonder_33_i',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 27 && G.age <= 40 && !G.mem?.s33i,
    text: pick([
      'The city outside your window is going on without reference to what you are going through. This is not indifference. It is the city being the city, which is the condition you live in.',
      'You made a decision that was not the best decision available to you and which you made anyway because the best decision was not bearable at the time. Looking back, the decision holds.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33i', true) },
  },

  {
    id: 'sonder_33_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 36 && G.age <= 50 && !G.mem?.s33j,
    text: pick([
      'The object you reach for and then do not need. The reflex that outlasted its original purpose. The hand that knows where something used to be.',
      'The book on the shelf you have not read in fifteen years that you could reach for now. You look at it. You put it back. The time for that book is not this week.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33j', true) },
  },

  {
    id: 'sonder_33_k',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && G.age <= 74 && !G.mem?.s33k,
    text: pick([
      'The neighbourhood that has changed around you while you stayed in it. You are one of the long-term residents now. The new arrivals do not know the neighbourhood you know.',
      'The pleasure you no longer have to apologise for. The music you listen to at full volume in an empty house, or the food you make only for yourself, or the afternoon you spend exactly as you choose.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33k', true) },
  },

  {
    id: 'sonder_33_l',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 34 && !G.mem?.s33l,
    text: pick([
      'The version of the story you tell yourself about why you made the choices you made. The story is mostly true. Some of the true parts are not in the story.',
      'The city at 6am before the streets fill: the cleaners, the delivery vans, the person running before the day begins. A city is not one thing. This is one of its forms.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33l', true) },
  },

  {
    id: 'sonder_33_m',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 46 && G.age <= 60 && !G.mem?.s33m,
    text: pick([
      'The age your parents were when you were the age you are now. You understand some things about them that you did not understand when they were this age and you were younger.',
      'The thing that was supposed to have resolved by now and has not resolved. The resolution is no longer the point. What you are doing with the unresolved thing is the point.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33m', true) },
  },

  {
    id: 'sonder_33_n',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 9 && G.age <= 15 && !G.mem?.s33n,
    text: pick([
      'The first time you understood that the adult in front of you did not know what they were doing. The realisation was not comforting. It was clarifying.',
      'You are waiting for something that everyone else seems to have already received. You do not ask why. You wait.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33n', true) },
  },

  {
    id: 'sonder_33_o',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 72 && !G.mem?.s33o,
    text: pick([
      'The grandchild or young person asking you what it was like. What it was like is not a story — it was the daily texture of a life, and the daily texture does not compress well. You tell them something true and insufficient.',
      'The comfort that comes from having outlasted several things you thought would break you. Not pride exactly. More like the specific knowledge that you are more durable than you believed.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33o', true) },
  },

  {
    id: 'sonder_33_p',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 42 && !G.mem?.s33p,
    text: pick([
      'The relationship that ended and which you do not want back but which still occupies specific rooms in your memory — the street, the restaurant, the season it occupied.',
      'The project you are in the middle of. The middle of a project is the hardest part: past the excitement of beginning, not yet at the clarity of the end, inside the sustained effort that no one else can see.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33p', true) },
  },

  {
    id: 'sonder_33_q',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 52 && !G.mem?.s33q,
    text: pick([
      'The decision that was made without deciding. Not a choice but a drift that accumulated into a direction. You are in the direction now and it is more or less where you would have chosen.',
      'The person you used to be friends with and have not spoken to in eight years. Not estranged — just diverged. Both of you moved and the geography solved itself.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33q', true) },
  },

  {
    id: 'sonder_33_r',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 15 && G.age <= 20 && !G.mem?.s33r,
    text: pick([
      'You are reading and the reading is going into a place that is not quite memory and not quite imagination. The book is doing something to you. Later you will not be able to explain what.',
      'The adult you trusted more than your parents at a particular moment. The adult probably does not know this. The moment was real.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33r', true) },
  },

  {
    id: 'sonder_33_s',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 32 && G.age <= 46 && !G.mem?.s33s,
    text: pick([
      'The meal that took three hours and a recipe and four failed attempts before it worked. The fourth time was the time. You know now what you had to fail at four times to know.',
      'The person sleeping in the next room whose presence changes the quality of the silence. The silence with someone in it is different from the silence without.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33s', true) },
  },

  {
    id: 'sonder_33_t',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && G.age <= 72 && !G.mem?.s33t,
    text: pick([
      'The things that are permanent about you and the things that changed. The permanent things are not the ones you would have predicted at thirty.',
      'You find yourself finishing other people\'s sentences in your mind before they finish them aloud. This is not because you are impatient. It is because you have been listening to people for a long time.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33t', true) },
  },

  {
    id: 'sonder_33_u',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && G.age <= 56 && !G.mem?.s33u,
    text: pick([
      'The evening you did not plan that became the evening you remember. No event. Just the specific light and the specific people and the conversation that went longer than anyone expected.',
      'The small ceremony your household has — the way Sunday morning works, the particular thing you do before a journey, the routine that is more than a routine. It is not a ritual because no one named it. It is a ritual.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33u', true) },
  },

  {
    id: 'sonder_33_v',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 30 && !G.mem?.s33v,
    text: pick([
      'The job that you held for two years that you do not think about much but which shaped what you know how to do. The shaping was invisible at the time.',
      'The city is teaching you things. Not the city as a lesson but the city as a set of conditions you navigate until the navigation becomes knowledge.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33v', true) },
  },

  {
    id: 'sonder_33_w',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s33w,
    text: pick([
      'The things you know you will never do. The list is not sad — it is clarifying. The energy that was spent on the possibility can now be spent on what is actually available.',
      'Someone you love is aging faster than you expected. You watch for the signs and make adjustments without announcing the watching or the adjustments.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33w', true) },
  },

  {
    id: 'sonder_33_x',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 48 && G.age <= 62 && !G.mem?.s33x,
    text: pick([
      'The photograph from the year that turned out to be the last year before everything changed. No one in the photograph knew this. Everyone is just standing there, in the year, not yet knowing.',
      'You have repaired something — a relationship, an object, a habit — that you thought was broken beyond repair. The repair required longer than you expected and is less perfect than new. It holds.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33x', true) },
  },

  {
    id: 'sonder_33_y',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 26 && G.age <= 38 && !G.mem?.s33y,
    text: pick([
      'The voice on the phone that sounds exactly like the person you were expecting and is not that person. The disorientation of a fraction of a second.',
      'You are good at something that you did not try to become good at. It developed while you were attending to other things. You have been doing it for so long the goodness at it is just part of you now.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33y', true) },
  },

  {
    id: 'sonder_33_z',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 70 && !G.mem?.s33z,
    text: pick([
      'The long project that has finally ended. You have been working on it for so long that the ending requires an adjustment. The time it occupied is now unoccupied. You will fill it with something.',
      'The two people you were: the younger one and the older one. They are not continuous in every way. Some things were lost in the transition. Some things were gained. The balance is not precisely calculable.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33z', true) },
  },

  {
    id: 'sonder_33_aa',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 34 && G.age <= 48 && !G.mem?.s33aa,
    text: pick([
      'The stranger whose face you have seen every week for two years — on the same commute, in the same coffee shop — and with whom you have never exchanged more than a nod. A kind of intimacy without introduction.',
      'The question the child asked that you could not answer and which you have been thinking about since. It was a simple question. You did not have the answer. You still do not.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33aa', true) },
  },

  {
    id: 'sonder_33_ab',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 28 && !G.mem?.s33ab,
    text: pick([
      'The night you stayed up for no reason except that sleep did not come and the house was quiet and you were, briefly, alone in the world in a way that was not lonely.',
      'The possibility ahead of you — the multiple possible futures — has a specific quality at this age. From here, many things are still open. You do not fully feel the openness, but it is there.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s33ab', true) },
  },

]
