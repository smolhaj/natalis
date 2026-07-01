// events_sonder_35.js
// Contemplative layer — weight 2, no choices, no new flags, mem-gated.
// Themes: the body in a waiting room, the small cruelty remembered,
// the book you never finished, the tree that grew, what happens at sixty,
// the friend who became someone else, the smell of old paper,
// the thing that fixes itself overnight.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_35 = [

  {
    id: 'sonder35_waiting_room_body',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s35WaitingRoom,
    text: pick([
      'The waiting room: the specific quality of sitting in a plastic chair in a place that processes people. The numbering system. The fluorescent light. The other people doing what you are doing — the looking at your phone, the looking at the wall, the looking at nothing in particular. Waiting is its own skill and you have gotten better at it.',
      'You have spent hours of your life in waiting rooms. The hours are not lost, exactly — things were thought in them that would not have been thought elsewhere. The waiting room is the place where your mind goes to whatever it has been not addressing.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s35WaitingRoom', true) },
  },

  {
    id: 'sonder35_small_cruelty',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s35SmallCruelty,
    text: pick([
      'A small cruelty you did, years ago. Nothing spectacular — a word said at the wrong time, a joke at someone\'s expense that went further than it was meant to go, an unkindness that required no effort. You have thought about it since at intervals. The person probably does not remember it. You do.',
      'The unkind thing you said: it arrived fully formed and you said it before you processed whether to say it. The processing happened in the two seconds after, watching the effect. You have carried the two seconds longer than the person you said it to has carried the words.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.karma -= 1; p.setMem('s35SmallCruelty', true) },
  },

  {
    id: 'sonder35_book_unfinished',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s35BookUnfinished,
    text: pick([
      'A book you started and put down and intend to finish. The book has been in this state for longer than it would take to finish it. You know roughly where you stopped. The book sits in the exact position where you left it, accumulating the specific meaning of unfinished things.',
      'There is a book on your shelf that has a bookmark in it at the page where you stopped years ago. You have moved the book through several homes. The bookmark has not moved. You will finish the book. The finishing is not urgent. The intention is.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s35BookUnfinished', true) },
  },

  {
    id: 'sonder35_tree_that_grew',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 45 && !G.mem?.s35TreeGrew,
    text: pick([
      'A tree you planted or knew when it was young is now large. The largeness happened in the same time you were doing other things. The tree did not require your attention to grow. It grew anyway, and the scale of it — the height, the canopy — is the measure of the time that passed while you were busy.',
      'You remember the sapling. You remember the specific year, roughly, that you noticed the sapling had become a tree. The tree is now older than many of the relationships you were in when you planted it. The tree outlasted them without trying.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s35TreeGrew', true) },
  },

  {
    id: 'sonder35_what_happens_at_sixty',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 57 && G.age <= 65 && !G.mem?.s35WhatAtSixty,
    text: pick([
      'You are approaching or passing sixty and what happens at sixty is that the future has a different texture from the future at forty. At forty the future was large in both directions — behind and ahead. At sixty the arithmetic is clearer. The clarity is not frightening, exactly. It is more like a focus.',
      'Sixty: the decade where the question of what you want to do with your life changes to what you want to do with the time that is clearly there and available. The questions are related but not identical. The second one is more specific and has a different urgency.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s35WhatAtSixty', true) },
  },

  {
    id: 'sonder35_friend_who_changed',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s35FriendChanged,
    text: pick([
      'A friend became someone else. The change was gradual — opinions you did not share that you initially attributed to a phase, a way of speaking that grew more insistent — and then it was not gradual, it was complete. You are in contact or not in contact. Either way the person you knew and the person they became are two separate things you hold together under the same name.',
      'The friend who changed: politics, religion, a relationship that restructured them, a trauma that took them somewhere you could not follow. You are still in each other\'s lives, maintained at a distance that didn\'t exist before. The maintenance requires specific effort and you provide it because of who they were before the change.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s35FriendChanged', true) },
  },

  {
    id: 'sonder35_smell_of_old_paper',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s35SmellOldPaper,
    text: pick([
      'Old paper has a smell — a compound of lignin and the slow work of time on organic matter. The smell is specific to the age and condition and storage of the paper. You know the smell from a particular library, a particular set of books, a box of papers that belonged to someone before you. The smell is information: it tells you how old something is before you read what it says.',
      'The smell of a particular room full of old things: papers, books, fabrics stored long enough to develop the smell of their own age. The room is in a house you visited, a library you used. The smell opens the room completely when you encounter it somewhere unexpected.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s35SmellOldPaper', true) },
  },

  {
    id: 'sonder35_thing_fixes_overnight',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s35FixesOvernight,
    text: pick([
      'Some problems fix themselves if you give them the night. The problem that was urgent at ten o\'clock has a different character at seven in the morning. Not all problems do this. Some problems are worse in the morning. You have learned, with some accuracy, which are which.',
      'You discovered at some point that sleep is a processing system and that the thing you were stuck on often unstucks itself while you were not consciously working on it. The discovery is not original — the advice to sleep on it is ancient — but discovering it from inside is different from being told it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s35FixesOvernight', true) },
  },

  {
    id: 'sonder35_the_bus_passenger',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s35BusPassenger,
    text: pick([
      'The person across from you on the bus: asleep, or looking out the window at whatever the window offered. A face you will not see again, in transit, between its own two points. The face had a specific expression — not a performed expression, but a transit expression, the face a face makes when it thinks it is unobserved.',
      'On the bus or train or tram: the other passengers each going between their two points, each with the complete interior life that the word "passenger" does not contain. You are also a passenger, also containing it. The containment is universal and invisible.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s35BusPassenger', true) },
  },

  {
    id: 'sonder35_the_phrase_you_use',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s35PhraseYouUse,
    text: pick([
      'You use a phrase that came from someone else — a parent, a teacher, a friend, a book — and you have used it so long it feels native. When you trace it back, if you trace it back, you find the source. The phrase arrived in you from outside and stayed.',
      'A turn of phrase, a specific way of describing something, a word you prefer over its synonyms: you got it from somewhere. From someone who phrased things this way, or a book, or a moment. The origin is usually traceable if you try. The tracing reveals that your language is partly built from other people\'s.',
    ]),
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s35PhraseYouUse', true) },
  },

  {
    id: 'sonder35_the_neighbour_you_know',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s35NeighbourKnow,
    text: pick([
      'A neighbour you have known for years but do not know well. The relationship has a precise calibration: the greeting, the brief exchange about specific visible things, the wave. Neither of you has moved further in or further out. The calibration works and you have both maintained it without discussion.',
      'The neighbour: you know their schedule by their car or their light or the sound of their door. You know roughly what kind of person they are from the interaction of proximity over years. You have never been in their home. They have never been in yours. This is a relationship with its own integrity.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s35NeighbourKnow', true) },
  },

  {
    id: 'sonder35_what_you_were_sure_of',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s35WhatSureOf,
    text: pick([
      'The things you were sure of at twenty-five: some of them held. More of them did not. The not-holding was gradual — an opinion that softened, a certainty that became a position you held more lightly, a conviction that the world did not support in the specific way you had believed it would. You hold your current certainties with a different grip.',
      'You were sure of certain things when you were younger. The sureness was not arrogance — it was just what certainty felt like before you had collected enough cases to make the certainty more complex. The complexity arrived slowly. The certainties are still there, differently weighted.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s35WhatSureOf', true) },
  },

  {
    id: 'sonder35_the_specific_tuesday',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s35SpecificTuesday,
    text: pick([
      'A day you remember for no obvious reason — a Tuesday in an ordinary month of an ordinary year, a day with no event attached to it, just the specific quality of how the light came through the window and what you were doing and the feeling of that particular hour. The day is filed under nothing but you still have it.',
      'Among the days that get remembered, some are remembered for reasons and some are remembered for no clear reason at all. A day that was simply a day, during which nothing happened that would merit recording, but which stayed. The staying is its own mystery.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s35SpecificTuesday', true) },
  },

  {
    id: 'sonder35_the_object_at_the_table',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s35ObjectAtTable,
    text: pick([
      'At the table where you grew up: a specific object that was always there. A salt shaker, a fruit bowl, a radio, a cloth that was replaced by the same cloth. The object was not remarkable. It was there every morning. Its presence was the texture of ordinary life and you noticed it only when it was gone.',
      'The house you grew up in had objects that were permanent — always in the same place, always the same function, always the same relationship to the people around the table. You did not register them as specific until they were not there anymore, and then the absence was its own kind of presence.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s35ObjectAtTable', true) },
  },

  {
    id: 'sonder35_the_question_asked_late',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 50 && !G.mem?.s35QuestionAskedLate,
    text: pick([
      'There are questions you should have asked your parents or grandparents when you could and did not. The questions are specific — about a place they came from, a thing that happened, a person they mentioned once and did not mention again. The not-asking was not negligence. You simply did not know yet that you would want to know.',
      'The question you should have asked: about the year before you were born, about the reason they left, about the name that appeared in a document you found later. The person who could answer it is gone. The question is the same question. The answer is not recoverable from the sources that remain.',
    ]),
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('s35QuestionAskedLate', true) },
  },

  {
    id: 'sonder35_the_talent_not_pursued',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s35TalentNotPursued,
    text: pick([
      'There is a thing you were good at that you did not pursue. The not-pursuing had reasons — a different path was more practical, the talent was not legible as a career, life arranged itself in a different direction. The talent is still in you. You use it occasionally, in private, and it is still there, which is a small satisfaction and a small regret simultaneously.',
      'The ability you did not make central: you can play the instrument, you can do the mathematics, you can draw the thing — but you chose the other road and the ability has been available and unused for years. It remains available. That fact has different meanings at different ages.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s35TalentNotPursued', true) },
  },

  {
    id: 'sonder35_the_long_table',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s35LongTable,
    text: pick([
      'The long table at a celebration: the specific abundance of a family event or a gathering where the table is too long for one conversation and so there are several conversations happening simultaneously, each with its own logic, and you can hear all of them and belong to only one. The table is a collective event that is also many private events.',
      'A table with many people around it: the specific noise of it, the cross-conversations, the person at the far end who is having a different evening from the person at the near end. You know this kind of table from many occasions. The memory of all of them is stored as one thing.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s35LongTable', true) },
  },

  {
    id: 'sonder35_the_decision_lived_with',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 50 && !G.mem?.s35DecisionLivedWith,
    text: pick([
      'A decision from twenty years ago that you are still living with — not regretting, exactly, just still inside. The decision branched the path and you cannot see the other branch anymore. You have stopped trying to see it. The branch you took is long enough now that it is not a branch, it is the path.',
      'The old decision: the one that felt large at the time and turned out to be as large as it felt. You made it with the information you had. The information was incomplete, as information always is. The life you are living is what came from the incomplete information. The life is specific and real.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s35DecisionLivedWith', true) },
  },

  {
    id: 'sonder35_the_rain_at_night',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s35RainAtNight,
    text: pick([
      'Rain at night: the specific sound of it on whatever surface is outside your window. You have listened to this sound in different places and the sound is different each time because the roof is different, the distance different, the density of the rain different. The sound is one of the sounds that belongs to being inside.',
      'The rain arrived while you were asleep and you woke to it. The room was dark and the sound of rain was continuous. You lay in the dark and listened to the rain and the listening was its own complete thing, requiring nothing from you.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s35RainAtNight', true) },
  },

  {
    id: 'sonder35_the_letter_received',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s35LetterReceived,
    text: pick([
      'A letter you received that was important: not email, but a letter, handwritten or typed, in an envelope, with a stamp. The handwriting told you something about the state the person was in when they wrote it. The envelope is still somewhere. The letter changed something or confirmed something or arrived at exactly the right moment.',
      'The letter in the mail: the weight of paper folded, the handwriting of someone you know, the specific texture of a communication that required a decision to send — stamps, envelope, the walk to the post box. The decision is inside the letter in a way that email does not have.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s35LetterReceived', true) },
  },

  {
    id: 'sonder35_the_heat_in_summer',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s35HeatInSummer,
    text: pick([
      'The summer heat of your childhood: the specific temperature of the place you grew up, the specific smell the heat released from the streets and the walls and the vegetation, the way the afternoon stopped. The heat of other places is hot but it is not this heat. The heat of your childhood is the reference point.',
      'The long afternoons of summer when everything slowed: the shade that moved across the yard and you moved with it, the sound the insects made, the specific quality of the light at four o\'clock that was different from the light at noon. The heat had a texture and you lived in the texture.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s35HeatInSummer', true) },
  },

  {
    id: 'sonder35_the_plan_that_fell_through',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s35PlanFellThrough,
    text: pick([
      'A plan you made with someone that fell through — a trip that was going to happen, a project that was going to begin, a thing you were going to do together. The plan had a level of detail that made it feel real. The thing that prevented it was specific and probably small. You never made the plan again.',
      'The thing you were going to do: the dates were nearly set, the logistics were roughly worked out, the anticipation was real. Then the logistics didn\'t align, or one of you moved, or the money wasn\'t there, or someone got sick. The plan dissolved without a clear moment of dissolution. It simply stopped being scheduled.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s35PlanFellThrough', true) },
  },

  {
    id: 'sonder35_the_hour_between',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s35HourBetween,
    text: pick([
      'The hour between the end of work and the start of the evening: not a gap but a small country with its own laws. You are not at work but you have not become your non-work self yet. In this hour things are possible that are not possible in the structured parts of the day — a walk, a detour, the unscheduled.',
      'The transition hour: when what you were doing has ended and what you are going to do has not started. The transition is not empty — it has a quality of its own, a kind of permission that the organised parts of the day do not give. You have learned to use the transition rather than fill it.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s35HourBetween', true) },
  },

  {
    id: 'sonder35_the_money_in_small_amounts',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s35MoneySmallAmounts,
    text: pick([
      'There was a period when you counted money in small denominations — the coins arranged, the calculation of what the week required, the specific attention to amounts that later became rounding errors. The attention was not pleasant. It was a kind of knowledge. You still do the calculation automatically even when the denominations are different.',
      'The arithmetic of a tight month: the amount in the account, the bills due, the days remaining, the calculation you ran in your head before you ran it on paper. The arithmetic made you precise about money in a way that did not leave when the money stopped being tight.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s35MoneySmallAmounts', true) },
  },

  {
    id: 'sonder35_the_song_you_knew',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s35SongYouKnew,
    text: pick([
      'A song you knew before you could understand the words. You learned the melody and a version of the syllables, and for years the song existed in you as sound without meaning. When you eventually understood the words, the understanding changed the song. The pre-understanding version is still in you alongside the one that knows what it says.',
      'The song that predates your comprehension of it: you knew the melody, the rhythm, the shape of the feeling it made. The words came later, with the language. The song in your childhood and the song as an adult are related but distinct. Both are still available.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.r += 2; p.setMem('s35SongYouKnew', true) },
  },

  {
    id: 'sonder35_the_apology_made',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s35ApologyMade,
    text: pick([
      'You apologised for something and the apology was accepted and it is done. The sequence completed itself. And yet the thing you apologised for sits in a different file from things that are simply done — it is in the file of things that required the apology, which is its own category.',
      'The apology: you said it and meant it and it was received. The account is settled. The thing that required the apology is still there in the record. The settlement does not erase the record, it closes the account. You understand the difference.',
    ]),
    choices: null,
    effect: (p) => { p.karma += 2; p.r += 2; p.setMem('s35ApologyMade', true) },
  },

  {
    id: 'sonder35_the_body_at_rest',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 50 && !G.mem?.s35BodyAtRest,
    text: pick([
      'The body at rest: not asleep, just still — sitting or lying in a place where nothing is required from it. The body\'s default state is rarely available. When it arrives, it has a quality of surprise, as if the body is not sure it is allowed this. The allowing is its own small pleasure.',
      'The specific quality of a body that has been working and is now not working — the stillness after effort, the settling of everything that was active. The stillness is not absence. It is the body having a moment that is entirely its own.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.h += 1; p.setMem('s35BodyAtRest', true) },
  },

  {
    id: 'sonder35_the_corner_table',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s35CornerTable,
    text: pick([
      'The corner table in the cafe or restaurant — the one with the wall on two sides, the view of the room, the relative quiet. You have learned to ask for it when it is available. The preference is not snobbery. It is about where the attention goes when you are in a room: the wall holds you in and the view of the room gives you something to look at without being looked at.',
      'There is a configuration of furniture in a public space that you prefer: the specific geometry of the seated position relative to the door, the window, the rest of the room. You have this preference without having formally decided it. It arrived gradually from accumulated experience of what worked.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s35CornerTable', true) },
  },

  {
    id: 'sonder35_what_you_call_home',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s35WhatCallHome,
    text: pick([
      'Home is a word you use for more than one place. The place you grew up. The place you live now. Sometimes a place you lived for a few years that left more of a mark than its years should account for. The word accommodates all of them but the accommodation requires some internal negotiation that you have not fully finished.',
      'You call a place home and you also call another place home. The two homes have different qualities: one is where you are from and one is where you are, and sometimes those are the same and sometimes they are not, and the not-sameness is something you carry without always noticing you are carrying it.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s35WhatCallHome', true) },
  },

]
