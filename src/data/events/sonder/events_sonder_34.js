// events_sonder_34.js
// Contemplative layer — weight 2, no choices, no new flags, mem-gated.
// Themes: the drawer of things with no place, morning light before anyone else
// is awake, the joke only two people knew, the smell of someone's coat,
// the word you mispronounced for years, the road you always meant to take,
// the sound of an empty house, what the hands remember.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_34 = [

  {
    id: 'sonder34_drawer_of_things',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s34DrawerOfThings,
    text: pick([
      'There is a drawer that holds the things with no designated place: the batteries of uncertain charge, the key to something you can no longer identify, the restaurant receipt from a meal that was significant at the time. You have not organised the drawer and will not. The drawer is honest in a way the organised parts of the room are not.',
      'The drawer contains: a button, a coin from a country you visited once, a pen that probably works, three small screws from a piece of furniture you assembled and had three screws left over and put them here in case they were important. They were probably not important. You have not thrown them away.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34DrawerOfThings', true) },
  },

  {
    id: 'sonder34_morning_before_anyone',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s34MorningBefore,
    text: pick([
      'There is an hour in the morning before anyone else is awake. The house makes small sounds. The light is the colour it is only at this hour before the angle changes. You have learned to exist in this hour as a kind of privacy that requires no one to leave.',
      'The early morning has a quality the rest of the day does not. Something is possible in it that closes as the day fills. You have tried to describe the quality and found that describing it is part of what closes it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34MorningBefore', true) },
  },

  {
    id: 'sonder34_joke_two_people',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s34JokeTwoPeople,
    text: pick([
      'There was a joke that required two specific people to be funny. Outside the two people, the setup did not work. You were one of the two people. The other person has not been in your life for years. The joke is still available to you — the whole architecture of it — and has nowhere to go.',
      'A shared joke is a small private language. You had one with someone. The language still exists in you and the other speaker is not in your life. This is not grief, exactly. It is closer to carrying a coin from a currency that no longer circulates.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s34JokeTwoPeople', true) },
  },

  {
    id: 'sonder34_smell_of_coat',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s34SmellOfCoat,
    text: pick([
      'There is a smell that belongs to a specific person — a coat, a soap, a particular combination that you cannot reconstruct but that you recognise completely when it arrives. The smell appears sometimes in unexpected places and for a moment places you in a room you have not been in for decades.',
      'Someone from a long time ago had a specific smell that was not cologne or anything named — the accumulation of daily life into a scent that belonged to that person. You have encountered it again in strangers and each time you are briefly somewhere else.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s34SmellOfCoat', true) },
  },

  {
    id: 'sonder34_mispronounced_word',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s34MispronouncedWord,
    text: pick([
      'There was a word you mispronounced for years — not badly, just wrongly, and in a way that no one corrected you because the mispronunciation was not so far off as to interrupt the sentence. When you finally heard the correct version you discovered the shape of your mistake. You still sometimes feel the old shape in your mouth before you catch it.',
      'You learned some words from reading and some from hearing, and the ones you learned from reading you sometimes pronounced incorrectly until someone said the word aloud near you and the gap closed. There is still a gap somewhere, probably, that has not closed yet.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34MispronouncedWord', true) },
  },

  {
    id: 'sonder34_road_always_meant',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s34RoadMeant,
    text: pick([
      'There is a road you have passed the entrance to many times and always meant to go down. The road is small and the entrance is not dramatic and each time you have been going somewhere else. The road has existed in your life as a possibility for longer than most things you actually did.',
      'You have a category of unvisited places that you know exist and have made a note to visit and have not. The note is internal. The places remain. The life is organised around different priorities and the unvisited places wait in a part of it that is not the centre.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s34RoadMeant', true) },
  },

  {
    id: 'sonder34_empty_house_sound',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s34EmptyHouseSound,
    text: pick([
      'An empty house sounds different from a house with people in it. The difference is not absence of voice — it is something structural, the way the building sits with its own sounds when no one is there to cover them. The settling, the refrigerator, the thing that ticks for no obvious reason. You know which sounds are yours.',
      'Coming home to an empty house has a specific quality that coming home to a full house does not. The quality is not simply loneliness, though loneliness can be inside it. It is also a kind of belonging — the house recognising you as the one it has been waiting for.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34EmptyHouseSound', true) },
  },

  {
    id: 'sonder34_what_hands_remember',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s34WhatHandsRemember,
    text: pick([
      'Your hands know things your mind does not actively hold. They know the sequence for a task you have done ten thousand times. They know the weight and position of tools you no longer use. They reach for switches in rooms that have changed. The knowledge in them is not the same kind as the knowledge in your head.',
      'There is a skill in your hands that lives below the level of thought — the angle, the pressure, the timing. You learned it so long ago that the learning is gone and what remains is only the doing. When you try to explain the doing you lose it briefly and have to stop explaining and let the hands show instead.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34WhatHandsRemember', true) },
  },

  {
    id: 'sonder34_the_long_pause',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s34LongPause,
    text: pick([
      'There is a pause at the end of a conversation that could become anything. You have learned to read the pause: it either means the conversation is finished or the conversation is about to say the thing it has been approaching for the last ten minutes. You have been wrong both ways.',
      'Some silences are endings and some silences are the thing about to be said. The skill of distinguishing between them is something you have gotten better at and still get wrong. The wrong ones — the silences you filled when you should have waited — are more memorable than the right ones.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34LongPause', true) },
  },

  {
    id: 'sonder34_something_you_avoided',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s34SomethingAvoided,
    text: pick([
      'You have been avoiding something for long enough that the avoidance has become comfortable. The thing is still there. The comfort of avoiding it is now its own reason to continue avoiding it. You have, at intervals, considered facing it, and then found something else to do instead.',
      'Not all avoidance is cowardice. Some of it is resource management — the thing is not urgent and other things are, and when you get to it you will get to it. The interval between deciding to get to it and getting to it is longer than it looks from the beginning.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s34SomethingAvoided', true) },
  },

  {
    id: 'sonder34_window_across_the_way',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s34WindowAcross,
    text: pick([
      'From your window you can see a window in the building across the way. The light in it goes on and off at intervals that suggest a life with its own schedule, its own reasons for being awake at eleven or midnight or two. You know nothing about the life. You have watched the light for a long time.',
      'The lighted window across the way: someone in it, or the light left on, or a television. The window is not yours and the life behind it is not yours and the ordinary miracle of another specific life going on behind a specific window has become ordinary enough that you only sometimes notice it.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s34WindowAcross', true) },
  },

  {
    id: 'sonder34_the_counting_habit',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s34CountingHabit,
    text: pick([
      'You count things when you are anxious or bored or in a room where nothing requires your attention. Steps, lights, people, the tiles in a ceiling. The counting organises the space in a way that is not useful but is calming. You have been doing this since before you were aware that you were doing it.',
      'A friend pointed out that you count things and you realised they were right and that you had been doing it for so long you had stopped noticing. The counting has no particular end — you do not do anything with the number. The count is the thing.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34CountingHabit', true) },
  },

  {
    id: 'sonder34_the_particular_chair',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s34ParticularChair,
    text: pick([
      'There is a chair that is yours in the way that no one decided but everyone understands. In your parents\' house, in your own house, somewhere you have lived — a particular chair that accumulated meaning by repetition until the chair and the person became the same thing in certain conversations. When someone else sits in the chair it registers in the room.',
      'The chair at the table that is yours: not assigned, just accumulated. The angle to the window that works. The distance from the heat. The way the room opens from that seat so you can see the door. These are things you noticed once, years ago, and the choice stuck.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34ParticularChair', true) },
  },

  {
    id: 'sonder34_the_face_on_the_platform',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s34FaceOnPlatform,
    text: pick([
      'A face on the platform: someone you do not know but whose expression you read for no reason except that you were both waiting and there was nothing else to look at. The expression said something — not legibly, but in the way faces say things in transit, where there is no one performing for anyone. The train came. You went different directions.',
      'In a transit space you catch a face at a moment it does not expect to be caught — the private expression between destinations. You see it, the person does not see you seeing it, and for a second you know something about someone you will never know. Then the platform clears and the knowing is gone too.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34FaceOnPlatform', true) },
  },

  {
    id: 'sonder34_the_recipe_in_the_head',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s34RecipeInHead,
    text: pick([
      'There are recipes you carry in your head that you did not write down because you did not think you would need to write them down. Some of them came from someone who is gone and the recipe is now the only version left. You have made the dish from the version in your head and it is close but not the same and you cannot identify what is different.',
      'The dish that someone always made — the version they always made — is not a recipe so much as a set of adjustments from a recipe, made by hand, made by feel, made so many times that the adjustments were the point. You know most of them. The ones you are missing are the ones you would not have known to ask about.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s34RecipeInHead', true) },
  },

  {
    id: 'sonder34_news_from_somewhere',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s34NewsFromSomewhere,
    text: pick([
      'The news arrives and the news is from somewhere you have been or from somewhere that contains people you know. The news lands differently from news about places that are just names. You check the names in the news against the names in your life and the overlap is small but the checking is automatic now.',
      'You carry the habit of scanning news for the places you have a connection to. The connection may be thin — a visit, a friend of a friend, a year spent there — but it changes the quality of the information. Generic disaster becomes a street you walked.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34NewsFromSomewhere', true) },
  },

  {
    id: 'sonder34_the_thing_that_wasnt_said',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 50 && !G.mem?.s34ThingNotSaid,
    text: pick([
      'There is something you did not say to someone who is gone. Not a confession — something ordinary, an acknowledgement, a piece of information that would have landed well. The situation passed and you thought there would be another and there was not. The unsaid thing is not dramatic. That is part of what makes it stay.',
      'The word you did not say in time: not a declaration but a small remark that would have let someone know you were paying attention. The opportunity closed. The person is gone or the moment is gone. The remark is still in you, waiting for a situation that will never have the same shape.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s34ThingNotSaid', true) },
  },

  {
    id: 'sonder34_the_ceiling_at_night',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s34CeilingAtNight,
    text: pick([
      'The ceiling at three in the morning is a different object from the ceiling in the day. You have studied specific ceilings over years. The stain that appeared and remained. The crack that extends another millimetre. The light from outside that moves across the plaster in a pattern that depends on the traffic below.',
      'Lying awake: the problem organises itself into the ceiling and the ceiling provides a neutral surface for it. The ceiling is not helpful but it is available. You have spent many hours in this specific exchange.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34CeilingAtNight', true) },
  },

  {
    id: 'sonder34_the_return_to_a_place',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s34ReturnToPlace,
    text: pick([
      'The place you return to after years: the buildings are mostly the same but the scale is different. The street you remembered as wide is narrower. The tree you remembered as large is larger. The house where something important happened is occupied by people who do not know that important thing happened there. The place holds no record of you.',
      'Return visits reorganise memory. The distance between two buildings that you remembered as far apart is not far. The hill you remembered as steep is a slope. The memory was built by a smaller body with different resources. The discrepancy between the memory and the place is not the memory being wrong.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s34ReturnToPlace', true) },
  },

  {
    id: 'sonder34_the_photograph_not_taken',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s34PhotographNotTaken,
    text: pick([
      'There are moments you decided not to photograph because you wanted to be in them without the camera between you and them. The moments are not documented. Whether the decision was right — whether being present was better than having the record — you cannot evaluate because you cannot compare the two versions of what happened.',
      'The photograph you did not take is always the more vivid one in memory, which is partly because memory has nothing to compete with. The photographs you took are accurate about specific surfaces. The things you did not photograph are the ones the memory renders in full.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s34PhotographNotTaken', true) },
  },

  {
    id: 'sonder34_the_voice_still_heard',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 45 && !G.mem?.s34VoiceStillHeard,
    text: pick([
      'The voice of someone gone: you can still produce it in your head, the specific pitch and rhythm and the particular phrases that person used. The voice has not degraded. You are not sure if you are remembering the voice or constructing a version that resembles it closely enough. The distinction has started to matter less.',
      'You can hear someone\'s voice who has been dead for years. The hearing is internal, produced from memory, assembled from the recordings you carry without knowing you are carrying them. The voice says things the person might have said. Sometimes it says things you wish the person had said. You can usually tell the difference.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s34VoiceStillHeard', true) },
  },

  {
    id: 'sonder34_the_route_by_heart',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s34RouteByHeart,
    text: pick([
      'There is a route you know so well that you can travel it without looking, the body navigating by accumulated repetition. You have walked or driven or taken transit this way so many times that the route is in your feet or your hands or your sense of duration. When you finally pay attention to it, it looks slightly different from the route you have been travelling in your mind.',
      'The walk you have taken so many times: the uneven pavement at one corner, the smell from the bakery that appears three-quarters of the way, the turn that comes earlier than it seems like it should. The route is a different kind of knowledge from directions. You could not describe it but your body would not get lost.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34RouteByHeart', true) },
  },

  {
    id: 'sonder34_the_conversation_replayed',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s34ConversationReplayed,
    text: pick([
      'You replay conversations after they are over. Not all of them — specific ones, ones where something was said that requires processing, or ones where something was not said and you are now reconstructing what would have happened if it had been. The replay is not accurate. It is a model of the conversation that you are adjusting.',
      'The conversation you go over again later: what you said, what they said, the point where the thing you should have said was available and you did not take it. The reconstruction has a particular energy — part analysis, part self-argument. It resolves eventually. Sometimes it takes longer than the conversation was.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s34ConversationReplayed', true) },
  },

  {
    id: 'sonder34_what_the_body_knew_first',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s34BodyKnewFirst,
    text: pick([
      'The body knew before the mind. You felt the wrongness of something before you had assembled the argument for the wrongness. The signal was specific — a tightness, a reluctance, a change in the quality of your attention — and you have learned to read it. The reading comes earlier than it used to.',
      'There are things the body decided before you made a decision. The weight of dread before a day you did not yet know would go badly. The lightness before something you did not yet know would go well. The body has information and it delivers the information in its own format, which is not propositional.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s34BodyKnewFirst', true) },
  },

  {
    id: 'sonder34_the_gift_kept',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s34GiftKept,
    text: pick([
      'You have kept a gift long after the relationship with the giver has changed or ended. The object remains on a shelf or in a drawer and you have not moved it because moving it would require a decision about what it is now. The object holds a version of a person that no longer exists in the same form.',
      'The thing someone gave you that you cannot throw away: not because it is useful or beautiful but because throwing it away would be a declaration you are not ready to make. The object sits and does not ask for anything. You walk past it and the relationship it encodes is available for a moment and then not.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s34GiftKept', true) },
  },

  {
    id: 'sonder34_the_inherited_opinion',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s34InheritedOpinion,
    text: pick([
      'You hold opinions that you did not form — you received them. About a family, a neighbourhood, a kind of person, a political question. At some point the opinion was handed to you and you took it and it became yours. You have been examining which ones you would hold if you had started from zero.',
      'The opinion you inherited: about a group, a country, a kind of work, a class of person. You held it for years before you noticed it was received rather than formed. The noticing does not automatically change it. Some inherited opinions survive examination. The surviving is worth something.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s34InheritedOpinion', true) },
  },

  {
    id: 'sonder34_the_last_good_year',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s34LastGoodYear,
    text: pick([
      'There is a year in the past that you think of as the last one before something changed. The year itself was not special — it was full of ordinary problems. But after it, something shifted: a relationship, a health thing, a capacity you had that reduced. You did not know at the time that you were in the last good year of that particular arrangement.',
      'Looking back: a year that was the last year of a particular kind of ease. Not the last happy year — you have had happy moments since — but the last year of a specific configuration that made certain things naturally possible. The year passed and you did not mark it because you did not know yet.',
    ]),
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('s34LastGoodYear', true) },
  },

  {
    id: 'sonder34_the_stranger_you_helped',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s34StrangerHelped,
    text: pick([
      'There is a stranger you helped once in a way that was small and required nothing from you — directions, a held door, a piece of information. You have thought about that stranger occasionally since. You do not know what happened next for them. The small help is complete in itself and you will never know if it mattered.',
      'You helped someone you did not know and will not see again. The help was proportionate and the person left and you returned to whatever you were doing. Somewhere a small good thing happened in the world because you were there at that moment. It is enough that it happened. It does not need to be remembered.',
    ]),
    choices: null,
    effect: (p) => { p.karma += 2; p.setMem('s34StrangerHelped', true) },
  },

]
