// events_sonder_53.js — contemplative layer, weight 2, all mem-gated

export const EVENTS_SONDER_53 = [

  {
    id: 'sonder_53_a',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s53a,
    text: 'The generation below you does not use the word in the way you use it. Not a major difference — a slight shift in what the word implies, a connotation that has moved. You can still communicate. But the word you are using and the word they are receiving are not exactly the same word, and the gap is the gap that opens slowly between any speaker and the language that was current when they learned it.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s53a', true) },
  },

  {
    id: 'sonder_53_b',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s53b,
    text: 'The piece of equipment you have used so long that its malfunction feels like an injury. Not expensive equipment necessarily. The specific chair, the specific knife, the specific pen, the drawer pull that is loose in a specific way you have learned to accommodate. Its absence or failure produces something disproportionate to its monetary value. The economy of objects: some of them accumulate significance far beyond their cost.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s53b', true) },
  },

  {
    id: 'sonder_53_c',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s53c,
    text: 'The compliment you are still carrying years later. Not a compliment about your appearance or a flattering remark — a compliment that named something specific, that said I see this particular thing about you and it is good. You remember the room. You remember who said it and what they were wearing. The specific compliment did something to the specific person you were at the time and the doing is still present in the person you are now.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s53c', true) },
  },

  {
    id: 'sonder_53_d',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s53d,
    text: 'The adult who treated you like a person rather than a category. Not a remarkable adult by any external measure. The specific quality of the interaction: they listened to what you actually said, asked a follow-up question, did not condescend. You remembered it because it was distinct from the ordinary traffic of adults and children. The distinction is information about the ordinary traffic.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s53d', true) },
  },

  {
    id: 'sonder_53_e',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s53e,
    text: 'The furniture you have had for thirty years. It has been in every room you have lived in for thirty years. It has become invisible the way the familiar becomes invisible: present always, perceived only when moved or removed. Someone who visits notices it as an object. You have stopped noticing it as an object. You notice it now, because they noticed it, and the noticing produces a brief sense of its history: every room it has been in, every version of yourself it has accompanied.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s53e', true) },
  },

  {
    id: 'sonder_53_f',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s53f,
    text: 'The thing you were convinced you would never do that you now do routinely. Not a moral position — a practical thing, a preference, a type of food, a type of person you thought you would never be compatible with. The conviction was absolute and then wore away gradually and now you do the thing without remembering you once thought you would not. The self is not a stable territory.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s53f', true) },
  },

  {
    id: 'sonder_53_g',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s53g,
    text: 'The meeting where you understood that the decision had already been made and the meeting was for show. The tell was in the room layout, or in the sequence of speakers, or in the document that was circulated in advance. The decision was made elsewhere, by fewer people, and you are in the meeting to receive it dressed as a consultation. You have stopped being surprised by this. The stopping being surprised is either wisdom or accommodation and you are not certain which.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s53g', true) },
  },

  {
    id: 'sonder_53_h',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s53h,
    text: 'The evening that was just an evening that you will remember clearly forever. No special occasion, no notable event: a particular evening with particular people in a particular place and the quality of the light and the conversation and the ease of it. These evenings exist and are not predictable. Looking back you know exactly when they were. You did not know it while it was happening. The memorial is always retroactive.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s53h', true) },
  },

  {
    id: 'sonder_53_i',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s53i,
    text: 'The sentence your parent said that you now hear yourself saying. Not a memorable sentence — an ordinary one, the kind of sentence that was in the daily texture of that household, that you absorbed without registering it as something to remember or repeat. It comes out of you intact, years later, in the right context, and the fit of it is both uncanny and entirely natural. You are the channel through which that sentence continues.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s53i', true) },
  },

  {
    id: 'sonder_53_j',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s53j,
    text: 'The project that is going slowly and you are not sure if the slowness is the project or you. The distinction matters and is hard to determine from inside it. The project that is inherently slow: the right pace. The project that is going slowly because you are not fully present: a different situation. You have been trying to determine which this is for six months and the trying has not produced clarity. This is also information about the project.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s53j', true) },
  },

  {
    id: 'sonder_53_k',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s53k,
    text: 'The fear that was completely real to you and is completely mysterious to you now. Not embarrassing — genuinely mysterious: the specific thing you were afraid of that you cannot account for as an adult. The stairs, the specific sound, the shape behind the door. The fear had its own logic and the logic is no longer available. You remember the fear without remembering the reasoning that made it fear rather than just a thing.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s53k', true) },
  },

  {
    id: 'sonder_53_l',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s53l,
    text: 'The overnight train. The specific experience of getting on at one city and waking in another: the night as transition, the rocking that was also the passage of distance, the window showing nothing and then showing something, the arrival in a city that is already awake and going about its morning while you are still damp with sleep. The overnight train is a specific form of movement that produces a specific sense of translation.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s53l', true) },
  },

  {
    id: 'sonder_53_m',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s53m,
    text: 'The appointment you have been going to for years with the same person: the doctor, the dentist, the accountant, the mechanic. You have accumulated a shared history that has no name for itself. They know things about you that are specific and practical. You know things about them — the family, the change in their face over years — that are similarly specific and practical. The relationship is not friendship and is not purely transactional. It is the kind of relationship that does not have a word.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s53m', true) },
  },

  {
    id: 'sonder_53_n',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s53n,
    text: 'The plant that survived. Not a hardy plant — the specific plant that was ill and recovered, that you had given up on and it did not give up. The plant as minor companion. The relationship between a plant and the person who tends it is not a relationship in the way human relationships are, and it is something. The plant that you almost threw away and did not throw away is still in the corner, in the pot, older now, having survived the year you thought it would not.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s53n', true) },
  },

  {
    id: 'sonder_53_o',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s53o,
    text: 'The first time you were alone in the city — not lost, not in danger, alone in the sense of having an afternoon with no obligation and no companion and a city in which to spend it. The discovery that this is possible. The discovery that you can navigate the city on your own time and your own logic. The afternoon is small and formative. The self that emerges from it is slightly more a self than the self that went into it.',
    choices: null,
    effect: (p) => { p.m += 3; p.s += 2; p.setMem('s53o', true) },
  },

  {
    id: 'sonder_53_p',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s53p,
    text: 'The photograph of yourself that you do not recognize immediately. The person in the photograph is clearly you. You do not recognize them for a fraction of a second. The recognition arrives and in the gap between the image and the recognition there is a brief encounter with yourself as a stranger — the face that others see, the body that is yours as a fact and also yours as an image that can be seen by others and not immediately claimed.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s53p', true) },
  },

  {
    id: 'sonder_53_q',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s53q,
    text: 'The decision that was made by not deciding. At some point the window for making the decision closed and the default — the staying, the not-moving, the continuing — became the choice. You did not choose the default. The default chose itself in the absence of a choice. Now the default is the condition and the condition is permanent enough that calling it a choice feels only partially wrong.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s53q', true) },
  },

  {
    id: 'sonder_53_r',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s53r,
    text: 'The period when everything was difficult and nothing was wrong in a way you could identify. Not depression exactly — the diffuse difficulty that attaches to a particular stretch of months for reasons that remain unclear. It lifted eventually, without explanation, the way it arrived. In retrospect you cannot locate a cause or a resolution. The period is in the map of your life as a territory with a different climate from the territories around it.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s53r', true) },
  },

  {
    id: 'sonder_53_s',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s53s,
    text: 'The game that was only for the two of you. Not a game with rules you could explain — the specific game that required exactly your two imaginations, that worked only with you and this other child, that would not have existed with anyone else. The game ended when the friendship changed or when you grew out of it. What ended was not only the game but the specific space that only existed when the two of you were in it together.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s53s', true) },
  },

  {
    id: 'sonder_53_t',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s53t,
    text: 'The list of things you can no longer eat. Not a list you made deliberately — the body made it over decades, through trial and error, through the specific conversations between your digestive system and various foods that produced specific outcomes. The list is now longer than it was at thirty. The body has opinions it did not have at thirty. The opinions are inconvenient and non-negotiable.',
    choices: null,
    effect: (p) => { p.r += 3; p.h -= 2; p.setMem('s53t', true) },
  },

  {
    id: 'sonder_53_u',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s53u,
    text: 'The joke that you have told too many times. You know you have told it too many times. The people around you are allowing you to tell it again. The dynamic in the room during the telling: the people who have heard it managing their response, the person who has not heard it laughing genuinely, the specific comedy of a joke that is most of the way to being a piece of family mythology rather than a joke. You tell it anyway. The ritual version of the funny thing is its own category of funny.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s53u', true) },
  },

  {
    id: 'sonder_53_v',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s53v,
    text: 'The work you did for free that led to the thing that mattered. Not as a strategy — at the time it was simply the work, done for its own reasons, without calculation. The connection between that work and what came from it was not obvious until much later. The unpaid work as apprenticeship, as credential, as relationship that opened a door. None of this was the reason you did it. All of it is what came from it.',
    choices: null,
    effect: (p) => { p.e += 2; p.m += 2; p.setMem('s53v', true) },
  },

  {
    id: 'sonder_53_w',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s53w,
    text: 'The person who is in almost every photograph from a certain period and is now completely absent from your life. Not a conflict — the ordinary drift. The photographs show them in your kitchen, at your table, in the group at the event. You have not spoken in eight years. The photographs document a period of closeness that ended so gradually you cannot place the ending. The ending is visible now only in the archive.',
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('s53w', true) },
  },

  {
    id: 'sonder_53_x',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s53x,
    text: 'The email you did not answer and then it was too late to answer. Not a difficult email — an email that required a response that you kept not writing. Time passed. The moment for writing it as a reply passed. Writing it now would require acknowledging the gap, which makes it harder. You have thought about this email more than you would have spent writing it. The unwritten reply is its own correspondence.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s53x', true) },
  },

  {
    id: 'sonder_53_y',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s53y,
    text: 'The book that was too old for you that you read anyway. You did not understand parts of it. You understood enough. The understanding that arrived through the parts you did not fully grasp: a different kind of understanding, accessed not through comprehension but through the texture of the language and the emotional weight of what you couldn\'t fully account for. The books that were too old for you shaped you more than the books that were exactly right.',
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('s53y', true) },
  },

  {
    id: 'sonder_53_z',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s53z,
    text: 'The flatmate who is now a stranger. You lived with this person in a state of intimate proximity for two years: you knew their sleeping schedule and their mood by the sound of the door and their grocery preferences and their specific way of leaving the kitchen. The intimacy was situational rather than chosen. The situation ended. The person you knew in that specific way is now someone you would nod at on the street. The intimacy was real and it was the intimacy of proximity, which is its own category.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s53z', true) },
  },

  {
    id: 'sonder_53_aa',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s53aa,
    text: 'The apology you received that came too late to change anything but was still worth receiving. The apology does not restore what was lost. It also does something: it acknowledges what happened, which the other version — the not-apologizing — did not acknowledge. The two versions have different weights in you, and the weight of the acknowledgment is real even when it is late and even when you are not sure you have forgiven.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('s53aa', true) },
  },

  {
    id: 'sonder_53_ab',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s53ab,
    text: 'The route you have walked so many times that you walk it in the dark without thinking. The body navigates while the mind is elsewhere. You arrive and cannot quite account for the passage: the route happened beneath awareness, automatic, stored in the muscles rather than the conscious memory. The body has learned things the mind has not been told about.',
    choices: null,
    effect: (p) => { p.setMem('s53ab', true) },
  },

  {
    id: 'sonder_53_ac',
    phase: 'adolescence',
    weight: 2,
    when: (G) => !G.mem?.s53ac,
    text: 'The question you were too embarrassed to ask and the answer you therefore never got. The question about the thing you did not understand in a context where not understanding seemed like it would reveal something you did not want revealed. You nodded. The not-understanding remained. You found out later, differently, which is not the same as having asked and been answered in the room where the question was live.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s53ac', true) },
  },

  {
    id: 'sonder_53_ad',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s53ad,
    text: 'The last time. You do not know it is the last time when it happens. The last time in the old apartment, the last time the whole family is in one room, the last time the conversation is easy in the way it was before a change that came later. The last time only becomes the last time retrospectively: at the time it was just that time, which is also every time. The knowledge arrives with the distance. The event itself contains no marker.',
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('s53ad', true) },
  },

]
