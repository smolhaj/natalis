// events_sonder_36.js
// Contemplative layer — weight 2, no choices, no new flags, mem-gated.
// Themes: the photograph that got ruined, the sound of your own name
// in another person's mouth, the shortcut you stopped taking, what
// the doctor said once, the bus you almost didn't get on, the specific
// colour of a particular afternoon.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_36 = [

  {
    id: 'sonder36_ruined_photograph',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36RuinedPhotograph,
    text: pick([
      'There is a photograph that got ruined — water damage, or a hard drive that died, or a fire that took a box of things. The photographs that were lost are more present in memory now than the ones that survive. The surviving photographs are accurate about surfaces. The lost ones are the ones the memory has edited into something specific and irreplaceable.',
      'A photograph you know you had and no longer have: the specific image, the moment it caught, the people in it at the ages they were. The loss of the photograph didn\'t take the memory — it changed the relationship between the memory and its evidence. Now the memory is the only version.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s36RuinedPhotograph', true) },
  },

  {
    id: 'sonder36_your_name_said',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36YourNameSaid,
    text: pick([
      'The sound of your own name in a particular person\'s mouth: the specific way they say it, the register, the syllable they stress. You have had your name said by enough people in enough accents and tones to know that the same name is not the same in all mouths. The version someone says when they are glad to see you and the version they say when they are calling you from another room.',
      'Your name sounds different depending on who is saying it and what they are about to say. You have learned to read the tone before the words. The name in a particular person\'s voice carries information the name itself does not contain.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s36YourNameSaid', true) },
  },

  {
    id: 'sonder36_shortcut_abandoned',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36ShortcutAbandoned,
    text: pick([
      'A shortcut you used to take that you no longer take — a path through the park or an alley between two streets that saved four minutes. You stopped taking it for a reason that is now unclear or a reason that no longer applies. The longer route has become the route. The shortcut still exists, probably.',
      'There is a path through your city that you used to take that you no longer take. Not because it closed — because your life rerouted around it and the shortcut became unfamiliar through non-use. The city you navigated then and the city you navigate now share the same streets but not the same map.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s36ShortcutAbandoned', true) },
  },

  {
    id: 'sonder36_what_the_doctor_said',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s36DoctorSaid,
    text: pick([
      'Something a doctor said once, in passing, that stayed. Not a diagnosis — a remark, a number they mentioned, an observation about how something looked. The remark was offhand from their side of the conversation. It has not been offhand from yours. You have thought about it in the weeks since and in the months since.',
      'The doctor said something that required a decision and you made the decision and now you live with the decision. The decision was made on incomplete information, as all decisions are. The living with it is different from the making of it — longer, quieter, ongoing.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s36DoctorSaid', true) },
  },

  {
    id: 'sonder36_bus_almost_missed',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36BusAlmostMissed,
    text: pick([
      'A bus you almost didn\'t get on. If you had not caught it, the afternoon would have been different — you would have been somewhere else when the thing happened, or the conversation would not have happened. The bus was there when you arrived. The world arranged itself in that order. You don\'t think about it often. When you do, the contingency of it is vertiginous.',
      'The small transport coincidence that changed the shape of something: the bus that came as you arrived, the train that was delayed and then wasn\'t, the plane that was full and then had a seat. The world does this constantly. You notice it only when the outcome is legible as important.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s36BusAlmostMissed', true) },
  },

  {
    id: 'sonder36_colour_of_afternoon',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s36ColourAfternoon,
    text: pick([
      'A specific colour that belongs to a specific time of day in a specific place. Not a general observation about light — the particular yellow of three o\'clock in October through the window of a room you spent years in. The colour is not available anywhere else in quite the same way. When something approaches it, you are briefly back in the room.',
      'The quality of light at four in the afternoon in the place you grew up: the angle, the season, the colour it made on the walls of whatever you were inside. The light has been different everywhere you have been since. The original is the reference and nothing matches it exactly.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s36ColourAfternoon', true) },
  },

  {
    id: 'sonder36_the_argument_won',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36ArgumentWon,
    text: pick([
      'An argument you won that you no longer feel good about having won. The winning was technically correct and the other person was wrong on the facts, and you knew it at the time, and the knowing was satisfying at the time. What you did not calculate into the winning was the relationship cost of being right in the specific way you were right.',
      'You were right and you said so clearly and the person you said it to has never quite been the same in that room with you. The rightness and the cost of it arrived in the same moment and only one of them was what you wanted. The moment has been finished for a long time. You still run it occasionally.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.karma -= 1; p.setMem('s36ArgumentWon', true) },
  },

  {
    id: 'sonder36_the_birthday_forgotten',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36BirthdayForgotten,
    text: pick([
      'A birthday you forgot: not of someone close, but of someone who expected you to remember. The forgetting registered with them before you knew they had registered it. The recovery was possible and you made it, but the window where you would have remembered without being reminded had passed.',
      'The calendar of other people\'s dates that you maintain in your head: you are mostly reliable and occasionally not. The not-reliable occasions have a specific character — not carelessness so much as the moment when the internal calendar was occupied elsewhere and the date passed.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s36BirthdayForgotten', true) },
  },

  {
    id: 'sonder36_the_debt_repaid',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s36DebtRepaid,
    text: pick([
      'You repaid something — money borrowed, a favour owed, a kindness that required return. The repayment closed the account. You have noticed that some accounts close cleanly and some close technically but still register as open in the other person\'s accounting, or in yours, or in both. This one is closed, you think, on both sides.',
      'The debt you cleared: the conversation where you said here it is, and the other person said thank you, and something was settled. The settling of small debts has a texture that is different from the settling of large ones. Both are real. Both matter in the economy of a relationship.',
    ]),
    choices: null,
    effect: (p) => { p.karma += 2; p.setMem('s36DebtRepaid', true) },
  },

  {
    id: 'sonder36_what_the_hands_hold',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s36WhatHandsHold,
    text: pick([
      'The things your hands have held over a lifetime: tools, children, the hands of people dying, the hands of people being born, paper, rope, soil, bread, the edge of a table during a difficult conversation. The hands do not remember the way the mind remembers — they remember functionally, in the ease or difficulty of the grip. The accumulated holding of sixty years is in the hands.',
      'Your hands at this age have held everything you have held. The holding is recorded in the joints and the skin. The objects and the people and the moments are all in the same hands that are holding this. The hands are the longest continuous record of your life.',
    ]),
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('s36WhatHandsHold', true) },
  },

  {
    id: 'sonder36_the_habit_without_reason',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36HabitNoReason,
    text: pick([
      'A habit you have that you cannot trace to an origin — always checking a particular thing before you leave, always taking the same side of the pavement, always putting the cup in the same spot. The habit has been running for so long the origin is not available. It may have had a reason once. The reason is gone and the habit is not.',
      'You do a small thing in a specific order every day without knowing why the order became that order. The order was not decided — it accumulated. You are inside the accumulation. The accumulation is what daily life is mostly made of.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s36HabitNoReason', true) },
  },

  {
    id: 'sonder36_the_time_alone',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36TimeAlone,
    text: pick([
      'The hours you spend alone that are not lonely: the particular quality of a Saturday morning when the rest of the house is out or quiet, the walk that has no destination, the afternoon in the cafe where you brought nothing to do. Solitude that is chosen is different from solitude that is imposed. You know both and have a relationship with each.',
      'Being alone in a place that belongs to you: the room or the house, the quiet that is yours, the freedom to move around the space without consideration for anyone else\'s trajectory. The alone that is a resource rather than a condition. You have learned to treat it as a resource.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s36TimeAlone', true) },
  },

  {
    id: 'sonder36_the_sentence_returned',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36SentenceReturned,
    text: pick([
      'A sentence you read years ago that has returned to you at intervals since — not a famous line, not a quotation anyone would recognise, just a sentence from a book or a letter or a conversation that hit a particular note and stayed. You have thought about why it stayed. The thinking has not resolved it. The sentence stays anyway.',
      'The words that stayed from a book you read long ago: not the story, not the plot, not the theme — one sentence, or part of one, that the rest of the book has faded around. The sentence is still live. It comes back in situations that are relevant to it and sometimes in situations that are not.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s36SentenceReturned', true) },
  },

  {
    id: 'sonder36_the_season_that_starts',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36SeasonStarts,
    text: pick([
      'The first day of a new season: not the calendar date but the day when the temperature changes enough or the light changes enough that the change is bodily. The body recognises the season before the mind does. The recognition is pleasure or anticipation or sometimes a small dread, depending on the season and what the season contains.',
      'The smell of the season turning: the specific compound that arrives when the cold breaks into warmth, or warmth breaks into cold, or the rain smell of a particular climate changes register. The smell announces the season before the season is visually apparent. You know the smell of your climate by its seasons.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s36SeasonStarts', true) },
  },

  {
    id: 'sonder36_the_last_time',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 50 && !G.mem?.s36LastTime,
    text: pick([
      'The last time you did something you did not know was the last time: the last time you were in a particular room, the last conversation with someone, the last time you ran without thinking about running. The last time was ordinary. The last-ness was not apparent at the time. The last-ness only became apparent afterward, when there was no next time.',
      'Some things end without marking the ending. The last time you were in the house you grew up in, the last time you saw a person you loved, the last time you could do something your body used to do easily — all of these ended while you were still expecting more. The ending announced itself only in the not-coming-again.',
    ]),
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('s36LastTime', true) },
  },

  {
    id: 'sonder36_the_morning_rush',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36MorningRush,
    text: pick([
      'The morning routine at full speed: the sequence that takes twenty-two minutes running in under eighteen, the choices made without consideration, the door closing on a house that will be unchanged when you return. You do this so often that you do it without noticing the doing. The noticing only happens when something breaks the routine.',
      'The leaving ritual: the same pockets checked, the same door confirmed locked, the same route to the street. You do this daily and the daily makes it invisible. The morning has a structure you inhabit without having designed it and it carries you to the day without requiring decisions.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('s36MorningRush', true) },
  },

  {
    id: 'sonder36_the_worry_lifted',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s36WorryLifted,
    text: pick([
      'The thing you worried about for a long time resolved itself without your intervention. The resolution arrived while you were thinking about something else and the worry that had occupied a portion of your mental background for months or years was suddenly not there. The absence of it felt like space. You were not sure, for a while, what to put in the space.',
      'A worry that ended: the health test came back clear, the conflict resolved, the thing that was threatening to happen didn\'t happen. The relief was real and disproportionate to how large the worry had actually been in the accounting of your daily life, which suggests the worry had been larger in the background than you had registered.',
    ]),
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s36WorryLifted', true) },
  },

  {
    id: 'sonder36_the_bread_line',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36BreadLine,
    text: pick([
      'A queue you stood in that was not your usual life — a queue for something rationed or scarce, for a bureaucratic process that required your presence, for a service that was overwhelmed. The queue revealed the specific social contract of what you were waiting for: who cut, who was patient, who helped, who didn\'t. A queue is a brief society.',
      'Standing in a long queue: the people on either side of you, the forward momentum in increments, the specific quality of collective waiting. The queue has a sociology — the information that travels back from the front, the alliances formed by proximity, the shared goal of reaching a point that is not visible from where you are.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s36BreadLine', true) },
  },

  {
    id: 'sonder36_the_object_passed_down',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s36ObjectPassedDown,
    text: pick([
      'Something that was handed to you from the generation above — a watch, a ring, a tool, a book with writing in it. The object carries the weight of having been used before you and by someone who is gone. You use it or keep it. Either way the object is a small archive of a life that preceded yours.',
      'The object you inherited: not because of its market value but because it was carried by someone and then by you. The using of it is a connection that requires no ritual to maintain. You simply use the thing and the using carries the history forward without effort.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s36ObjectPassedDown', true) },
  },

  {
    id: 'sonder36_the_festival_crowd',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36FestivalCrowd,
    text: pick([
      'The festival crowd, or the market crowd, or any large gathering of people in a purpose — the specific energy of many people wanting the same thing at the same time, moving in the same direction. You are inside the collective and also separate from it. The two things happen simultaneously.',
      'Being in a crowd that is celebrating: the specific acoustic of it, the way the mood is distributed through bodies and passes between them, the anonymity that is also a belonging. You are one person in a large number of people having the same feeling and the feeling is larger for being shared.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s36FestivalCrowd', true) },
  },

  {
    id: 'sonder36_the_number_you_still_know',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36NumberStillKnow,
    text: pick([
      'A phone number you still know by heart for a phone that no longer exists at that number — your parents\' number, a childhood friend\'s number, a number you dialled so many times the sequence is in your fingers before your mind registers it. You will carry the number after the number has no use. The carrying is automatic.',
      'A number memorised from a time when memorising numbers was necessary: dialled enough times to be in the hands, callable without looking at the page. The number may still work or may not. The memory of it is complete. The completeness is a small record of how much time you spent dialling it.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s36NumberStillKnow', true) },
  },

  {
    id: 'sonder36_what_you_overheard',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36Overheard,
    text: pick([
      'A conversation you overheard between strangers: a fragment of a sentence, a tone that made the content clear without all the words, a name said with a particular inflection. The fragment was not yours and you carried it home anyway. It was a piece of someone else\'s story, delivered by accident.',
      'The overheard conversation on the bus or in the cafe or through a wall: not enough to understand the full situation, but enough to feel the shape of it. Someone was going through something. The going-through was audible even when the words were not completely clear.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s36Overheard', true) },
  },

  {
    id: 'sonder36_the_small_competence',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s36SmallCompetence,
    text: pick([
      'A small competence you have that you did not study for — parallel parking, fixing a specific domestic problem, knowing which way is north in a new city without a compass. The competence arrived without instruction and stays without practice. You are not sure where it came from. It is reliable.',
      'You are good at something small that most people find difficult. The competence is not part of your professional identity; it doesn\'t come up in the contexts where people present themselves. It comes up at specific moments and at those moments you are useful in a way that requires no explanation.',
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s36SmallCompetence', true) },
  },

  {
    id: 'sonder36_the_price_of_things',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s36PriceOfThings,
    text: pick([
      'The price of things when you were twenty versus now. Not a complaint — an observation. A loaf of bread, a bus fare, a cinema ticket. The numbers have changed more than feels real. The amounts that felt large then feel small now. The amounts that feel large now would have been impossible then. The scale shifts and you live inside the shifting scale.',
      'You remember the price of things from decades ago with precision that surprises you — you know what a coffee cost, what a pair of shoes cost, what rent cost. The memory of prices is a kind of economic autobiography. The memory is accurate because the prices once required real decisions.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s36PriceOfThings', true) },
  },

  {
    id: 'sonder36_the_slow_friendship',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s36SlowFriendship,
    text: pick([
      'The friendship that developed so slowly you cannot identify when it became what it is. There was no first conversation that set it in motion. There was just accumulation — the same room at the same intervals, the gradual expansion of what you talked about, the day you realised the person was someone you would call in an emergency. The realisation was the only moment, the rest was before it.',
      'A friendship built over years rather than in a moment: the person you worked with or lived near or saw at the same recurring event, who became, through repetition and time, a person you trust. The slow friendships have a different architecture from the fast ones. They are load-bearing in a different way.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.s += 1; p.setMem('s36SlowFriendship', true) },
  },

  {
    id: 'sonder36_the_specific_tired',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s36SpecificTired,
    text: pick([
      'A tiredness that is not about sleep — the tiredness of a particular kind of effort sustained over time. Not physical exhaustion, not lack of rest, but the specific depletion of spending months or years in a situation that required more than what you had. The recovery from this tired takes longer than sleep. It requires something the body knows how to do but cannot do on demand.',
      'The tired you are is not the tired that sleep fixes. The tired is the kind that comes from a sustained situation — a year that required more than a year of effort, or a relationship that cost more than it returned, or a job that was too much of what you had to give. You know the difference now between the kind that sleep fixes and the kind that requires time.',
    ]),
    choices: null,
    effect: (p) => { p.m -= 2; p.h -= 1; p.r += 3; p.setMem('s36SpecificTired', true) },
  },

  {
    id: 'sonder36_the_light_on_the_street',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s36LightOnStreet,
    text: pick([
      'The lamp on the street that comes on every night as you pass it — or the lamp that is always burned out in the same block, or the lamp that flickers. The street at night has a texture of light and dark that you navigate without deciding to navigate it, a familiarity built from hundreds of passages.',
      'The street at night: the pools of light and the specific quality of the dark between them, the sound the street makes at eleven o\'clock that it does not make at noon. You have walked this street in all the hours it has. Each hour is a different street with the same buildings.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s36LightOnStreet', true) },
  },

  {
    id: 'sonder36_what_the_children_became',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 50 && !G.mem?.s36WhatChildrenBecame,
    text: pick([
      'The children of people you knew: they are now their own ages, in their own cities, doing their own work. You knew them when they were small. The version of them that is doing the work now is continuous with the small version but the continuity is not always visible. You look for the child in the adult and sometimes find it.',
      'The children who grew up around you — your own, or the neighbours\', or the children of friends — are adults now. Some are in cities far from where they started. The distance between the child they were and the person they are is the measure of the years. You carry both versions.',
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s36WhatChildrenBecame', true) },
  },

  {
    id: 'sonder36_the_unread_message',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentYear >= 2010 && !G.mem?.s36UnreadMessage,
    text: pick([
      'An unread message that you have not answered for long enough that answering now requires an explanation for the not-answering. The window where you could have answered without explanation has closed. The message sits in the thread, read but not acknowledged, the small social debt of it accumulating.',
      'The message you did not respond to: the first day you didn\'t answer it was the day you were going to answer it tomorrow. The tomorrow that became a week. The week that became enough time that the response now requires addressing the gap. The gap is the larger problem than the original message.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s36UnreadMessage', true) },
  },

]
