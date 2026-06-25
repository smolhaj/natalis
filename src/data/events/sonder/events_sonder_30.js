// events_sonder_30.js
// Contemplative layer: the return of a season, the thing you carry without knowing,
// the face before mirrors, the argument that ended, small acts witnessed.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_30 = [

  {
    id: 'sdr30_season_returns',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr30SeasonReturns,
    text: pick([
      'The season came back. Whatever this season brings — the heat, the cold, the rain at a particular angle — it arrived again and you recognized it immediately. The body recognized it before the mind did. You have had this season before.',
      'The smell of this particular month: the particular combination of damp and warmth or cold and smoke or whatever this month smells like in this place. You know it before you know what you are smelling. It has always smelled like this.',
      'Another winter, or another summer, or another rainy season. The count of them has grown large enough that the return feels like greeting something rather than experiencing it for the first time. You have been here before. The season has been here before. This is the resumption of a conversation.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30SeasonReturns', true) },
  },

  {
    id: 'sdr30_face_before_mirror',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr30FaceMirror,
    text: pick([
      'You caught your reflection unexpectedly — a shop window, a dark phone screen, a mirror at an angle. The face was yours and you recognized it, but for a half-second before recognition there was just a person. Unfamiliar, briefly, before the familiar reasserted itself.',
      'You looked in the mirror this morning and noticed the face has been doing something while you were not watching. Not alarmingly so. Just: continuing in the direction faces go. You looked at it for a moment. Then you went about your morning.',
      'Your face at this age looks like someone in your family at this age. Not exactly like them — close enough that someone who knew them would see it. The resemblance arrived without being invited. You did not choose whose face to borrow.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30FaceMirror', true) },
  },

  {
    id: 'sdr30_the_argument_ended',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 25 && !G.mem?.sdr30ArgumentEnded,
    text: pick([
      'The argument you had with someone ran for months or years and then, without a resolution, it ended. Not because it was resolved. Because both of you got tired of it, or because something else happened, or because the thing being argued about stopped mattering as urgently as it had. The argument is now past. Neither of you won. Both of you moved on.',
      'You realized at some point that a disagreement you were maintaining had cost more than what the disagreement was about. You dropped it. The dropping was quiet. You are not sure if the other person noticed.',
      'There is a thing you and someone close to you stopped arguing about. The argument went underground rather than resolving. It is still there. You both know it is there. By tacit agreement you are not going down to it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30ArgumentEnded', true) },
  },

  {
    id: 'sdr30_small_act_witnessed',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr30SmallActWitnessed,
    text: pick([
      'Someone stopped to help a stranger with something minor — directions, a dropped bag, a door held open at the right moment. The whole transaction took thirty seconds and neither person will think about it again. You saw it. You are the only record.',
      'A child helped an older person. You were watching without meaning to. The help was natural, unannounced. The older person received it without ceremony. Both went on. The moment existed and then it was over and you saw it.',
      'Two strangers on the street, one of them having some kind of difficulty, the other stopping without being asked. You walked past. On the other side of where you are now, both of them have gone about their days. The moment that was there is not there anymore, except in you.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('sdr30SmallActWitnessed', true) },
  },

  {
    id: 'sdr30_what_you_carry',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr30WhatYouCarry,
    text: pick([
      'There are things you carry that you did not know you were carrying. Not memories exactly — textures. The way a particular kind of institutional room makes you feel. The voice register that makes you close up. The smell that opens something. These responses exist because something installed them. You discovered them by bumping into them.',
      'You noticed today that you do a thing your parent did. Not something you were taught — something absorbed. A gesture, a phrase, a reaction. The absorption happened without awareness. The thing is in you now and comes out without prompting.',
      'What you believe without knowing you believe it: the deeper set of assumptions that only surfaces when something contradicts them. Most of these you have never articulated. Some of them are wrong. You find the wrong ones slowly, by running into them.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30WhatYouCarry', true) },
  },

  {
    id: 'sdr30_the_conversation_not_had',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 50 && !G.mem?.sdr30ConversationNotHad,
    text: pick([
      'There is a conversation you have never had with someone you love. Not because it could not be had — because you both decided, separately, that you could live with not having it. This may have been the right decision. It may not have been. The conversation is still there, unhad.',
      'You and someone you are close to have never talked about certain things — the things that are obvious from the outside, the things that shaped the texture of the relationship. You talk around them. The talking around is also a form of communication. Neither of you is unaware of the shape of what is not said.',
      'The late-life conversation that starts "I wanted to ask you something." You have been meaning to start it for years. It is still possible. You have not started it. The time for it is not unlimited, which is something you know without saying.',
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('sdr30ConversationNotHad', true) },
  },

  {
    id: 'sdr30_the_window_in_winter',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr30WindowWinter,
    text: pick([
      'Rain on the window while you are inside and warm. The specific pleasure of being on the right side of it — not because being outside in rain is bad, but because being inside when there is rain outside is its own thing, a shelter that announces itself.',
      'The condensation on the window in the cold. You traced something in it when you were a child. You do not remember what. The practice of tracing something in window condensation is older than you and will outlast you.',
      'Looking out through a window at weather happening outside. You are in the warm and the weather is in the cold and the pane of glass between you holds both conditions simultaneously. You can see the outside without being in it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30WindowWinter', true) },
  },

  {
    id: 'sdr30_the_inherited_thing',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr30InheritedThing,
    text: pick([
      'You are using a thing someone else used before you — a tool, a piece of furniture, an object that has moved from their hands to yours. The object contains their use of it somehow. Not literally. But when you use it there is an awareness that you are not the first person to do this particular action with this particular thing.',
      'Something was passed to you without ceremony. It was just there and then you were the one who had it. You have had it long enough that it is yours now and not theirs, though sometimes you think of them when you use it.',
      'The recipe, the method, the way of doing a specific task that you learned from someone and have been doing since. You have been doing it long enough that it feels like yours. It is also theirs. Both are true simultaneously.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30InheritedThing', true) },
  },

  {
    id: 'sdr30_the_crowd_dispersing',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr30CrowdDisperses,
    text: pick([
      'Something was over and the people who had gathered for it were leaving in all directions — out of the stadium, out of the ceremony, out of the hall. One moment: a concentrated thing. The next: dispersal, each person returning to their separate life. The gathering existed and then it did not.',
      'The street emptied out faster than you expected. One minute there were people and then — for some reason, weather or the end of something, an hour changing — they were not. The empty street after people is different from the empty street before people.',
      'You watched a crowd leave after something. All the individual lives that had been made temporarily collective by the thing they were there for, now separating back out. Each one carrying a different version of what just happened.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30CrowdDisperses', true) },
  },

  {
    id: 'sdr30_the_handwriting',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 50 && !G.mem?.sdr30Handwriting,
    text: pick([
      'You found something written in someone\'s handwriting. Not typed — handwritten, in the particular way their hand moved on paper. The handwriting is more specific than a photograph somehow. You knew immediately whose it was. This is what they looked like holding a pen.',
      'Your own handwriting from twenty years ago: recognisably yours, somewhat different. The letters were formed with more deliberateness then, or with less, depending on the time. The hand changes over decades. The change is too slow to notice directly.',
      'A note someone left you, kept for years: the handwriting faded but still legible. The thing they wrote was ordinary — a list, a reminder, a few words. The handwriting is what remains when the occasion for the writing is long past.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('sdr30Handwriting', true) },
  },

  {
    id: 'sdr30_the_gesture',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr30TheGesture,
    text: pick([
      'Someone touched your arm briefly in passing — reassurance, connection, nothing requiring a response. The touch lasted half a second. The half-second was enough. The body registers these things without the mind having to interpret them.',
      'A gesture someone makes when they are talking: the particular way they use their hands to mean something, the shape a hand makes when they are looking for a word. You have watched this for so long you would know it anywhere.',
      'You made a gesture today that belongs to someone else — something you absorbed without noticing and now do without thinking. The gesture came out of you as if it were yours. It is yours. It was theirs first.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30TheGesture', true) },
  },

  {
    id: 'sdr30_the_light_at_home',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr30LightAtHome,
    text: pick([
      'The particular light of this house at this time of day — afternoon in winter, morning in summer, whatever combination this is. You know this light. It is specific to this house at this hour. Elsewhere it is different. Here it is this.',
      'When you come home and the light is already on inside, which means someone is in there. Or no light is on, and the house is waiting. The light in the window is information before it is anything else.',
      'You leave the light on sometimes when you go out. Not for security — for yourself when you come back. Coming home to a lit room is different from coming home to a dark one. The difference is small and real.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30LightAtHome', true) },
  },

  {
    id: 'sdr30_the_price_of_things',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.sdr30PriceOfThings,
    text: pick([
      'You remember what this cost twenty years ago. Not with nostalgia — just with the particular precision that economic memory produces. The mind keeps these numbers without being asked. The price has changed and the number from before is still there.',
      'The thing that used to be cheap and is no longer cheap. You remember the first time you noticed the price had changed past the point of being ordinary. The change was not large. It was the direction of it.',
      'What you could buy on what you earned at a particular age, versus now. The ratio has not improved in all the ways you expected. In some ways it has. In others: you do more, earn more, have less of certain things than people with equivalent effort had a generation before you. The arithmetic of this is not your fault and is still true.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30PriceOfThings', true) },
  },

  {
    id: 'sdr30_the_animal',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr30TheAnimal,
    text: pick([
      'A bird on a wire, or a dog sleeping in the shade, or a cat on a wall. The animal existed completely in its own life for the seconds you watched it. It did not know it was being watched. It did not need to know.',
      'An animal crossed your path today. Not dramatically — just passing through. The animal had somewhere to be, or was resting, or was doing whatever this animal does at this hour. Your lives briefly intersected.',
      'There was a stray cat or dog that appeared regularly in one part of your life — outside a building you used, on a street you walked often. At some point it stopped appearing. You noticed its absence more than you noticed its presence.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30TheAnimal', true) },
  },

  {
    id: 'sdr30_the_decade',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.sdr30TheDecade,
    text: pick([
      'The decade has a character that you can see now that you are in it — differently than you could see the character of the previous decade while you were inside it. Each decade only becomes fully visible from the outside, as it is ending. You are inside this one still.',
      'The decade you spent in a particular place, with particular people, doing a particular kind of work: it has a texture that other decades do not have. The texture came from all of it together, which you could not see while you were in the middle of accumulating it.',
      'Looking back at your thirties, or your twenties, or your forties: it is a country you have been to. You know it but you do not live there now. The people you were friends with there are still your friends but they also live somewhere else now — in their current decade.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30TheDecade', true) },
  },

  {
    id: 'sdr30_the_apology',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 28 && !G.mem?.sdr30TheApology,
    text: pick([
      'You apologized for something, or someone apologized to you, and both of you knew the apology was real. These are not common. The common ones are performed. The real ones have a different weight.',
      'There is an apology you owe that you have not made. You know what it would require. You have not required it of yourself yet. The window for it may still be open.',
      'Someone apologized to you years after the fact. The apology arrived when the wound it addressed had mostly healed. The timing made it different from what it would have been. You received it. You were not sure what to do with it after.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('sdr30TheApology', true) },
  },

  {
    id: 'sdr30_the_telephone',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.sdr30TelephoneCall,
    text: pick([
      'A phone call from someone you had not expected to hear from. The voice on the line, recognisable before they said who it was. The past twenty minutes have been spent catching up on years. You both said "we should do this more often" and both of you meant it and both of you know the pattern.',
      'You called someone you had been meaning to call. The call was good. The call should have happened sooner. The call is now over and you feel the absence of what should have been more of these calls over the years that passed without them.',
      'There are people you speak to only when something prompts it — a birthday, a piece of news. Between those occasions they exist in your life as a name in a contact list. You think about them occasionally, without calling. They think about you occasionally, without calling. Both of you would be happy to hear the other\'s voice.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('sdr30TelephoneCall', true) },
  },

  {
    id: 'sdr30_the_first_time',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 25 && !G.mem?.sdr30FirstTime,
    text: pick([
      'The first time you did something you now do routinely. You cannot remember which time was the first time. The first time has been absorbed into the general practice. This is true of almost everything you know how to do.',
      'Something you experienced for the first time that you knew, while experiencing it, would become a permanent thing. The first time you saw this place, heard this music, tasted this food. The first time was already becoming a memory while it was still the first time.',
      'You can sometimes remember the version of yourself before something: before you knew how to do this, before you understood that, before this relationship, before that loss. The before is accessible. The person in it is not exactly you. Close enough to recognise.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30FirstTime', true) },
  },

  {
    id: 'sdr30_the_town',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.sdr30TheTown,
    text: pick([
      'The place where you grew up: you go back sometimes, or you do not go back. Either way it exists in a form inside you that is not the same as what is there now. The town you grew up in has continued to happen without you. You have been happening without it.',
      'The main street of somewhere you lived for years. You could walk it in memory right now — the shops that were there, the turn before the thing, the smell of the bakery or the market or whatever it was. The street is still there, with different shops.',
      'Someone mentioned the name of a place you used to live and you were briefly there. Not in memory exactly — in the body-knowledge of that place, the texture of it. The mention was all it took. The place is in you in the way places get in you.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30TheTown', true) },
  },

  {
    id: 'sdr30_the_morning_after',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr30MorningAfter,
    text: pick([
      'The morning after something significant — a celebration, a funeral, a long conversation, a decision. The morning arrives regardless. The same requirements as any other morning. The significance of the day before is still in the air but the morning proceeds at its own pace.',
      'After a long evening: the quiet of the morning, the specific quality of tired that is also rest. The night before is receding. The day ahead has not yet started. A brief interval between the two.',
      'You woke up and for a moment you did not remember. Then you remembered. The morning carries forward what the night ended. This is how it always works. The morning is not separate from what preceded it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30MorningAfter', true) },
  },

  {
    id: 'sdr30_the_body_in_effort',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr30BodyEffort,
    text: pick([
      'Physical effort: the specific quality of the body when it is doing something that requires all of it. Not pain. Not ease. The complete engagement of the body in a task. Whatever the task is — it takes all of you and for the time it takes all of you there is nothing else.',
      'The tiredness after work that uses the body: different from the tiredness of sitting still all day. The body that has been used is tired in a way that wants rest in a specific way. You have learned the difference between kinds of tired.',
      'Lifting something heavy: the particular attention to weight, to balance, to what the back is doing. The body has a competence in this that the mind just watches. You have always been able to do this. You are now checking whether you still can.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30BodyEffort', true) },
  },

  {
    id: 'sdr30_the_letter_received',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 25 && !G.mem?.sdr30LetterReceived,
    text: pick([
      'A letter arrived. Not a bill, not an official document — something someone wrote and put in an envelope and addressed to you specifically. The existence of this is rarer than it used to be. You kept it. Most letters you have kept are from a particular era when letters were common.',
      'Someone wrote you something longer than a message — an email, a letter, a note — that required them to sit with their thoughts about you for long enough to write them down. You read it more than once. Some of what they said was right. Some was not. All of it was theirs.',
      'You found a letter someone wrote you years ago. You remember receiving it. You do not remember it as precisely as the rereading reminded you. The reading reminded you what was happening then and what they understood about it, which was different from what you understood at the time.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('sdr30LetterReceived', true) },
  },

  {
    id: 'sdr30_the_late_sun',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr30LateSun,
    text: pick([
      'The sun in the late afternoon in summer: the shadows getting long, the light getting low and warm, the specific quality of this hour that people have always known and always named. The late-afternoon light is the same everywhere and specific to each place.',
      'A long summer evening when the light simply will not go. The sky has been doing something beautiful for an hour and it is still doing it. You noticed. You will not necessarily remember having noticed. The sky continues.',
      'Sunset: the moment of it, the colours of it, the fact that it happens every day without requiring anyone to watch and is nevertheless watchable every day. You watched today for a few minutes. Then you went back to whatever you were doing.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30LateSun', true) },
  },

  {
    id: 'sdr30_the_silence_between',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr30SilenceBetween,
    text: pick([
      'A silence with someone that was not awkward — two people who have known each other long enough that silence is another kind of communication. You were both in the silence and both comfortable in it and then one of you said something and the silence ended.',
      'The pause in a conversation that was the conversation\'s deepest moment: where neither person was saying anything and both knew it. What was not said was the point.',
      'You and this person have sat in the same room in silence many times. The silence has different qualities depending on what preceded it and what follows. You can read the quality of the silence before you speak into it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30SilenceBetween', true) },
  },

  {
    id: 'sdr30_the_news_turned_off',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.sdr30NewsTurnedOff,
    text: pick([
      'You turned it off. Not permanently — you came back. But for a day or a week you did not read about what was happening and the world continued happening and you were not watching and that was also a choice a person can make.',
      'The point at which the news becomes too much: a day, a week, a month of events that require continuous attention. At some point the attention exhausts itself. You take the break you need. The news does not pause for it.',
      'You decided today that today was enough. Whatever was happening would continue happening whether or not you followed it hour by hour. You let it continue without you. In the morning you checked again. The world had kept its pace.',
    ]),
    choices: null,
    effect: (p) => { p.m += 1; p.setMem('sdr30NewsTurnedOff', true) },
  },

  {
    id: 'sdr30_the_word_almost_used',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr30WordAlmostUsed,
    text: pick([
      'You almost said it and then did not. The sentence went a different direction. The word that was coming was not wrong, just more than the moment required. You chose the smaller word instead. The larger one went back.',
      'A word you thought of and could not quite produce — the word that meant exactly the right thing, just out of reach. You got near it, described around it, moved on. The word exists. It will come when you are not looking for it.',
      'There is a word for what you are trying to say and it may not be in your language. It may be in a language you don\'t speak. Or it may not exist anywhere. Some things do not have words and you sense this when you look for them.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30WordAlmostUsed', true) },
  },

  {
    id: 'sdr30_something_worked',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr30SomethingWorked,
    text: pick([
      'Something went right today — not dramatically, just correctly. The thing worked the way it was supposed to. No intervention required. You noticed this briefly and then proceeded. The working of things is the default that everything else departs from.',
      'You tried something and it worked on the first attempt. This does not always happen. When it does, it is worth a moment of acknowledgement, which you gave it: a moment, then on to the next thing.',
      'Everything that was supposed to happen today happened. The trains ran, the meeting concluded, the task was done, the thing you needed was where you left it. A day in which the machinery of life cooperated. Not memorable. Not nothing.',
    ]),
    choices: null,
    effect: (p) => { p.m += 1; p.setMem('sdr30SomethingWorked', true) },
  },

  {
    id: 'sdr30_being_introduced',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr30BeingIntroduced,
    text: pick([
      'Someone introduced you to someone else: "This is—" and then the version of you that exists in their description. The description is accurate and is not quite you. The gap between what someone says about you and what you are is the space your full self lives in.',
      'You introduced someone. The words you chose to describe them told you something about what you think is most important about them, which is different from what they think is most important about themselves.',
      'You were described in passing to someone who did not know you: a name, a context, what you do. The version of you that arrived in that room before you arrived was made entirely of those three things. You walked in and began to exceed the description.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr30BeingIntroduced', true) },
  },

  {
    id: 'sdr30_the_year_in_a_phrase',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.sdr30YearInPhrase,
    text: pick([
      'Someone mentioned a year and what it meant: "the year of —" and then whatever it was, the thing that stood for all of it. Every year could be reduced to one thing. The reduction misses most of what the year was. The reduction is also true.',
      'You mentioned a year to someone younger and the year meant nothing to them. They knew the facts of it, if they were interested enough to know the facts. But they did not have the year as a felt thing, a texture, a weight. You do. The difference is a generation.',
      'Looking back at the years from here: some years you can name clearly, the thing that stood for them. Others are harder to name. The hardest to name were not necessarily the worst years. The undramatic years leave less that can be summarised.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('sdr30YearInPhrase', true) },
  },

  {
    id: 'sdr30_the_tree_in_wind',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr30TreeInWind,
    text: `A tree moving in wind: the specific motion of branches and leaves when the wind is doing something, which is different from the tree when nothing is moving. You watched it for a moment. There was nothing else to it. The tree was doing what trees do in wind. You noticed.`,
    choices: null,
    effect: (p) => { p.setMem('sdr30TreeInWind', true) },
  },

]
