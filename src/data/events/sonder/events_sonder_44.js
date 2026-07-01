// events_sonder_44.js
// Contemplative layer — 30 events.
// Themes: the body at different ages, what news travels and what doesn't,
// the object that survives everything, language in the mind, working late,
// the village you left or didn't leave, memory made of smell.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_44 = [

  {
    id: 'sonder_44_a',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 32 && !G.mem?.s34a,
    text: pick([
      'You are learning where your body keeps things. The shoulders for certain kinds of worry. The jaw at night when things are unresolved. The stomach before a particular kind of conversation. You did not know you were going to have this body for so long. You assumed there would be a different arrangement.',
      'The body at twenty-six is just the body. You don\'t notice it the way you will later. This is a gift you don\'t know is a gift.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34a', true) },
  },

  {
    id: 'sonder_44_b',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 48 && !G.mem?.s34b,
    text: pick([
      'The body is keeping score on a different accounting system than the one you use. You don\'t find out until a morning when something doesn\'t work the way it worked, or until the doctor shows you numbers, or until you try to do something you used to do without thinking. The accounting system was running the whole time.',
      'You notice it first in the morning. The way you get up is different now than it was. Not dramatic — just a few degrees of something. A negotiation the body makes before you\'re fully awake.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34b', true) },
  },

  {
    id: 'sonder_44_c',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s34c,
    text: pick([
      'The body has become a project. Not in a bad way, necessarily, but in the way that anything requiring daily maintenance and management becomes a project. You have a relationship with it that is partly collaboration and partly negotiation.',
      'There are things the body has decided it will no longer do easily. You find workarounds. The workarounds become the new normal. In ten years the workarounds will have workarounds.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34c', true) },
  },

  {
    id: 'sonder_44_d',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 12 && !G.mem?.s34d,
    text: pick([
      'Someone in the village went away and came back different. You are too young to say what is different exactly, but you can see it — the way they sit, the way they hold silences, the new words that appear in their speech. You learn from this that going away changes people. You file this information.',
      'News travels through your community by voice. You know this because you can sometimes trace a piece of information back to its source — the truck driver, the trader, the relative who visited. You are learning the infrastructure of knowing.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s34d', true) },
  },

  {
    id: 'sonder_44_e',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 55 && !G.mem?.s34e,
    text: pick([
      'There is an object in your home that has moved with you through every place you have lived. You don\'t always notice it but it\'s always there. If someone asked you to explain its significance you would not be able to explain it completely. The significance is partly that it survived everything.',
      'The thing about photographs from twenty years ago is not the faces — it\'s the objects in the background. The furniture that is gone. The wallpaper. The clothing that places the image in a year. The background tells you more about the year than the face does, because the face tried to present itself and the background didn\'t.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s34e', true) },
  },

  {
    id: 'sonder_44_f',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 24 && G.age <= 36 && !G.mem?.s34f,
    text: pick([
      'You are working late. Not because you have to, tonight, but because the work is in a particular state that makes it hard to stop — the problem is almost solved, the document is almost finished. You notice you have been here four hours past when you thought you\'d leave. The office or the workspace is quiet. This version of concentration, of being alone with the almost-finished thing, has a specific texture.',
      'The commute has become so familiar that you no longer have memories of it. You arrive. There is no narrative of arriving — just the before and the after. This is true of things you do every day: the automatic makes no deposit in memory.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34f', true) },
  },

  {
    id: 'sonder_44_g',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 13 && !G.mem?.s34g,
    text: pick([
      'There are two languages inside you. The one for school and the one for home are not the same. You switch between them without thinking. You understand that the switching is a skill but you did not learn it the way you learn skills — it happened, and now you have it.',
      'The adults talk about something in the other room and you understand more of it than they know you understand. This is information you keep to yourself. The gap between what adults think children understand and what children actually understand is something you live inside.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s34g', true) },
  },

  {
    id: 'sonder_44_h',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 14 && G.age <= 19 && !G.mem?.s34h,
    text: pick([
      'You are becoming someone. The process is uncomfortable in a way that nobody told you about in advance — the not-yet of it, the way you are finishing one version of yourself before the next one is ready. The gap between the versions is where most of adolescence lives.',
      'You have discovered the version of yourself that exists in someone else\'s eyes. It\'s different from the version you carry. You\'re not sure which is more accurate. You try to reconcile them. You will spend years on this.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s34h', true) },
  },

  {
    id: 'sonder_44_i',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && G.age <= 55 && !G.mem?.s34i,
    text: pick([
      'You have become someone\'s memory of who they were when they knew you. You understand this when you run into a person from twenty years ago and see yourself in their eyes as you were then: a person who no longer exists but still exists, apparently, in this person\'s archive. You find this alarming and comforting in equal measure.',
      'The younger colleague does something the way you used to do it ten years ago, when you thought you were doing it right. You watch them. You do not say: that\'s what I did, and here is what I learned. You do not say anything. You let them learn it the way you learned it.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s34i', true) },
  },

  {
    id: 'sonder_44_j',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s34j,
    text: pick([
      'You are someone\'s old person now. The children and grandchildren have the same relationship to you that you had to the people who were old when you were young — the half-attention, the patience that is not always quite patience, the private certainty that your experience is more than it looks. The cycle is complete and you are on the far side of it.',
      'Memory is not filed chronologically. It\'s filed by intensity. The years that were eventful are large in the archive. The years that were quiet are thin. You have lived through both kinds. You have no preference now. You miss the quiet years more.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s34j', true) },
  },

  {
    id: 'sonder_44_k',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 30 && !G.mem?.s34k,
    text: pick([
      'You are calling home less often. Not because anything changed — not because of a fight or a decision — but because life expands around you and the call that was going to happen today gets moved to tomorrow, and then it\'s been two weeks. The two weeks become the new interval. You notice this without reversing it.',
      'The apartment is the first place that is only yours. Everything in it was chosen by you. The aesthetic it expresses is yours, for the first time in your life. You are learning what you like from looking at what you chose.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s34k', true) },
  },

  {
    id: 'sonder_44_l',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.age <= 52 && !G.mem?.s34l,
    text: pick([
      'The city you grew up in, or the village, or the neighbourhood — you return and it is changed. Not dramatically, but in the way that a face you know well changes over years: the same structure, the new surface. The buildings that are gone have left negative spaces you read automatically. The people you knew are mostly gone or inside. The street does not remember you.',
      'You are the age now that some of your parents\' friends were when you were a child. You remember them as fully formed adults. You now understand that they were at the age you are, which means they were figuring things out, which means the fully formed adult was a costume they were wearing.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s34l', true) },
  },

  {
    id: 'sonder_44_m',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 6 && G.age <= 11 && !G.mem?.s34m,
    text: pick([
      'You have a smell that is home. Not a named smell — not bread or wood or rain exactly — but a combination that you will recognise for the rest of your life and that will, for the rest of your life, produce the specific feeling of being small in a place where you are known.',
      'There is someone who is always there. A grandparent, an aunt, a neighbour: the person whose presence is so constant it\'s structural, like a wall. You don\'t know yet that you will lose this person. You don\'t know yet what the loss of something structural feels like from the inside.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.r += 3; p.setMem('s34m', true) },
  },

  {
    id: 'sonder_44_n',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 35 && !G.mem?.s34n,
    text: pick([
      'There are things you believed ten years ago that you no longer believe. The revision was gradual — no single conversion, just the slow accumulation of evidence against a position until the position became unsupportable. You don\'t remember changing your mind. You only notice afterward that you did.',
      'You are living in a city that is not the one you grew up in. The original city has become theoretical — the place you came from, not the place you are. You have two versions of yourself running: the one that belongs to the city of origin and the one that belongs to here. They are not yet reconciled.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.r += 3; p.setMem('s34n', true) },
  },

  {
    id: 'sonder_44_o',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 45 && G.age <= 58 && !G.mem?.s34o,
    text: pick([
      'Your children are at an age where they make major decisions without consulting you. You were consulted about their choices for twenty years. The consulting has ended. The ending is what you were trying to produce the whole time. The ending is strange.',
      'You have been at this job, or in this town, or in this relationship, long enough that the before-and-after of it is visible. You can remember the beginning. The beginning is far enough away that it is clearly behind you. What this makes you is a different kind of person from who you were at the beginning.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s34o', true) },
  },

  {
    id: 'sonder_44_p',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.s34p,
    text: pick([
      'You have outlived several things you thought would outlive you: the company, the neighborhood as it was, the marriage of people you thought were solid, the certainty about things that turned out to be arguable. You have not outlived yourself, yet. This is something.',
      'The grandchildren do not understand what the world was. Not because they are unintelligent — they are sharp, some of them. But they are inside the world as it is now, and the world as it was is not available to them the way memory is available to you. You carry something they will have secondhand at best. You are a primary source. This is not nothing.',
    ]),
    choices: null,
    effect: (p) => { p.r += 5; p.m += 2; p.setMem('s34p', true) },
  },

  {
    id: 'sonder_44_q',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 15 && G.age <= 20 && !G.mem?.s34q,
    text: pick([
      'You notice you have started saying something your parents say. A particular phrase. A way of responding to news. You catch it coming out of your mouth and there is a moment of recognition that is both amusing and slightly alarming. You are downloading something.',
      'The teacher who is difficult is also the teacher whose class you are learning the most in. You don\'t know yet whether to be grateful for this. You hold both things: resentment of the difficulty and the thing the difficulty is producing.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s34q', true) },
  },

  {
    id: 'sonder_44_r',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 50 && !G.mem?.s34r,
    text: pick([
      'Sleep has changed. You wake at three and cannot return. The thoughts that come at three are a specific category of thought — the ones about things you can\'t fix, amplified to fill the time. You have developed strategies. The strategies work sometimes.',
      'There is a friendship that is no longer what it was. Not because of a falling-out — there was no falling-out — but because you and this person are in different configurations of life now and the overlap has narrowed. The friendship still exists but in a reduced version. You grieve the fuller version without quite admitting this is what you are doing.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s34r', true) },
  },

  {
    id: 'sonder_44_s',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 26 && G.age <= 38 && !G.mem?.s34s,
    text: pick([
      'The money is enough now. Not comfortable — but enough: the specific relief of enough, after the years of calculating. You notice you have stopped the calculation and don\'t know exactly when. The stopping is quiet. It feels like something lifted without announcement.',
      'You have the job. The job is what you said you wanted. On the third month in the job you notice that having the thing you wanted does not produce the feeling you expected having the thing to produce. The feeling is more complicated than the wanting was.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s34s', true) },
  },

  {
    id: 'sonder_44_t',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 70 && !G.mem?.s34t,
    text: pick([
      'Someone much younger asks you what it was like. You are aware as you answer that you are editing — not lying but selecting, shaping, leaving out the parts that don\'t translate. The story you tell is true but it is not all of it. All of it would take too long and also would not fit in their available understanding. This is what getting old is: you become a summarised version of what actually happened.',
      'The garden in the morning. This is still a thing you have. The same garden or a different garden — but the fact of a garden, and the morning, and the specific quality of attention you bring to it now. You didn\'t have this attention when you were forty. It is one of the compensations.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.r += 3; p.setMem('s34t', true) },
  },

  {
    id: 'sonder_44_u',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 14 && !G.mem?.s34u,
    text: pick([
      'There is a game that exists only here, in this street or this compound or this schoolyard. A game with rules that were invented locally and exist nowhere else and are transmitted only child to child. You will teach this game to no one because there will be no one to teach it to in the same way. The game ends when your generation grows up.',
      'The season changes and the change is in your body before it\'s visible outside — something in the light, or the smell of the air, or a quality of afternoon. You are calibrated to this place in a way you don\'t know is calibration. You will only understand it later, when you live somewhere else and the calibration no longer matches.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s34u', true) },
  },

  {
    id: 'sonder_44_v',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 28 && !G.mem?.s34v,
    text: pick([
      'You are in a new place and you do not have the years of context that tell you what this neighbourhood sounds like at night, what the weather does in March, which shop is reliable. You are relearning a city from the beginning. The relearning is slow. It is also interesting in a way that familiarity will eventually replace.',
      'You have been reading the newspaper — or the feed, or whatever it is — for long enough to notice that some things recur. The recurrence is not a good sign but it is information. You are learning the grammar of the news, which is different from the content of the news.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s34v', true) },
  },

  {
    id: 'sonder_44_w',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 43 && G.age <= 55 && !G.mem?.s34w,
    text: pick([
      'You are watching a person do the thing you did at their age with the information you didn\'t have at their age. You could intervene. The intervention would be unwelcome. You let them learn it the way you learned it. This is a form of respect that is also a form of distance.',
      'The things you are still carrying from twenty years ago: you can list them now with some precision. You have tried addressing some of them. Some of them do not respond to being addressed. They require a different approach that you have not yet found or that does not exist.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s34w', true) },
  },

  {
    id: 'sonder_44_x',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 16 && G.age <= 21 && !G.mem?.s34x,
    text: pick([
      'You are aware, suddenly, of the specificity of where you are: this country, this town, this family. Someone else was born somewhere else into something else. You are not abstract. You are here, precisely. This fact is either comforting or frightening and sometimes both in the same afternoon.',
      'You are waiting to find out who you are. You assume you will find out. The finding-out is taking longer than expected. Meanwhile you perform a temporary version of yourself while the real version assembles.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.e += 2; p.setMem('s34x', true) },
  },

  {
    id: 'sonder_44_y',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 72 && !G.mem?.s34y,
    text: pick([
      'The era has a name now. Historians have put a bracket around the period you lived through and given it a name. It\'s not what you would have called it. The name describes the period from outside. From inside, the period was specific and daily and often uncertain. You were inside. The historians are outside. Both are true.',
      'The things you made. The children, if you had them. The objects, the work. Some of what you made will outlast you. You are not certain which parts. You hope you are right about which parts.',
    ]),
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('s34y', true) },
  },

  {
    id: 'sonder_44_z',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 36 && G.age <= 48 && !G.mem?.s34z,
    text: pick([
      'You drove past the house you grew up in. You don\'t know why. It was not on the way to where you were going. Someone else lives there now. The colour of the door has been changed. The garden is different. The specifics of what it meant to you live in a room that is now someone else\'s kitchen.',
      'A smell. That\'s all — a smell from somewhere, from someone passing on a street, from an open door, and you are immediately somewhere else. Not metaphorically somewhere else. You are ten, or eight, or thirteen, and the specific density of that time is available. Then it goes. Memory is mostly unavailable. This is the exception.',
    ]),
    choices: null,
    effect: (p) => { p.r += 5; p.m += 2; p.setMem('s34z', true) },
  },

  {
    id: 'sonder_44_aa',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 38 && !G.mem?.s34aa,
    text: pick([
      'Somewhere in the last five years you became the person making the decisions. Not all decisions — not the large abstract ones — but the operational ones, the ones about this situation in front of you. You didn\'t notice the transition happening. You are in the middle of it before you recognised it.',
      'You know what you want now in a way you didn\'t at twenty-two. The knowing is partial and still changing. But at twenty-two there was almost no signal. Now there is signal. The signal says: this is what matters and this doesn\'t and this matters more than you thought.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.m += 2; p.setMem('s34aa', true) },
  },

  {
    id: 'sonder_44_ab',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && G.age <= 78 && !G.mem?.s34ab,
    text: pick([
      'You are less interested in being right. This happened gradually. At forty you were considerably more interested in being right than you are now. You are not sure if this is wisdom or tiredness. Maybe they are the same thing. Maybe it doesn\'t matter what it\'s called.',
      'The parts of the life that you are glad to be done with. There are some. The commute in winter, or the performance review, or the specific anxiety of early parenthood, or the years when money was not enough. You have arrived past those. The arrival is quiet and you would have wanted to know it was coming.',
    ]),
    choices: null,
    effect: (p) => { p.m += 4; p.r += 3; p.setMem('s34ab', true) },
  },

  {
    id: 'sonder_44_ac',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 45 && G.age <= 60 && !G.mem?.s34ac,
    text: pick([
      'Your parents are old now in a different way than they were old before. Old-old: the way the body rearranges its priorities, the things that can\'t be maintained anymore. You watch this and understand that you are watching something that will eventually be true of you. The distance between watching and being-watched is a question of years.',
      'The conversation at dinner that turned into something real. The one where the formalities dropped and the people at the table said what was actually true. This happens less often than it should. When it happens you notice it. Afterward you think: that should be more of what dinner is. Then the next dinner is formal again.',
    ]),
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('s34ac', true) },
  },

  {
    id: 'sonder_44_ad',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 9 && G.age <= 13 && !G.mem?.s34ad,
    text: pick([
      'The light in summer at the end of the day, when it goes horizontal and turns everything amber. The specific hour when this happens is different here than it is anywhere else — or it feels that way. It probably isn\'t different. But it is specific to here in your memory, and in your memory is where it lives.',
      'There is a person at school who is not unkind and not kind — who exists in the middle register, who is there, who you see every day, who will become, without either of you knowing it, one of the people who populate the background of your childhood memory. In ten years they will be hard to distinguish from the wallpaper of the time. In thirty years you will remember their name and not their face.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.r += 2; p.setMem('s34ad', true) },
  },

]
