// events_sonder_28.js
// Contemplative layer: the things you did not plan, repetition and time,
// the quality of attention, small recognitions, thresholds, end-of-day light.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_28 = [

  {
    id: 'sdr28_unplanned_route',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28UnplannedRoute,
    text: pick([
      'You take a different street home and there is nothing remarkable about it — a shop you have not seen before, a tree in a gap between buildings. You do not know why you went that way. Sometimes you do not go the usual way and that is the whole of it.',
      'You meant to go straight home and then you did not. You stopped somewhere else first, something small — bread, a newspaper, nothing that needed to happen today. The extra twenty minutes dissolved into the evening without a trace.',
      'There was a route you used for years and then for no particular reason you stopped using it. You have not thought about why. The first route still exists, presumably. The city does not wait for you to come back.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28UnplannedRoute', true) },
  },

  {
    id: 'sdr28_someone_laughing',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28SomeoneLaughing,
    text: pick([
      'From the next room, or through a wall, someone is laughing — genuinely, the kind that catches and keeps going. You do not know what they are laughing at. The sound is its own thing, separate from its cause, the pure fact of it arriving through whatever separates you from them.',
      'In the street, two people you do not know are laughing about something. You pass them. Their laughter is still going when you have gone far enough that you cannot hear it anymore. Somewhere behind you it is still happening.',
      'Laughter from the apartment above, late in the evening. You are not in it. It is not for you. There is something in that — not loneliness exactly, but the knowledge that there are rooms happening everywhere that you are not in.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28SomeoneLaughing', true) },
  },

  {
    id: 'sdr28_the_last_one',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28TheLastOne,
    text: pick([
      'The last of something you have had for a long time. The last of the coffee in the tin, the last of the soap, the last page of the notebook. There is a small pause before you replace it, or before you buy more. You notice it, briefly, then do not.',
      'At some point you ate the last one — the last of whatever they were — and that was the last time you ever ate one. You did not know it then. The last time of anything tends not to announce itself.',
      'The jar has been in the back of the cupboard for so long you cannot remember buying it. You throw it away without opening it. It had been there through several versions of your life. You do not think about what those versions were.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28TheLastOne', true) },
  },

  {
    id: 'sdr28_clock_watching',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28ClockWatching,
    text: pick([
      'You look at the time and it is later than you expected. Not much later — an hour, maybe. But you had thought you had more of it than you do. The evening has been doing something while you were not paying attention.',
      'There is a kind of time that only exists in waiting rooms. It moves differently there — thicker, more visible, each minute aware of itself. You sit in it. At some point it ends.',
      'Three in the afternoon has always had a particular quality. Not quite afternoon any more, not yet anything else. The light goes sideways. Something in it never fully resolves.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28ClockWatching', true) },
  },

  {
    id: 'sdr28_the_chair',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28TheChair,
    text: pick([
      'There is one chair in this place that you always sit in. You do not remember choosing it. You sit in it and it is your chair and that is all that needs to be said about it.',
      'The chair you grew up with — someone sat in it before you, someone sat in it after. It probably still exists somewhere. Chairs outlast the households they were part of.',
      'When someone sits in your chair you do not say anything. You sit somewhere else and it does not feel right. You wait for them to leave.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28TheChair', true) },
  },

  {
    id: 'sdr28_saying_goodbye',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28SayingGoodbye,
    text: pick([
      'The goodbye at the door that runs longer than it should — a few more sentences, a question, another thing remembered. You are both already going and yet not quite gone. This is its own kind of attachment: the reluctance to finish.',
      'There is a particular goodbye that you think about sometimes. Not a big goodbye — just a normal one, at the end of a normal day. You did not know at the time that it was the last one.',
      'Some people you say goodbye to at the end of every conversation as though you might not speak again for a long time, even when you will speak tomorrow. You do not know where that came from. It is just how you say goodbye to them.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28SayingGoodbye', true) },
  },

  {
    id: 'sdr28_heat_in_the_body',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28HeatInTheBody,
    text: pick([
      'The specific heat of summer at its peak — not just temperature but weight, the air not moving, the city holding on to everything it has collected since morning. You know this heat. It is the same heat it always is.',
      'There is a cold that gets into the joints and does not leave until spring. You have known this cold for years now. It arrives, settles in, waits. You have learned what helps and what does not.',
      'After you were sick for a week, the first day you felt well again your body felt like something given back. You walked outside and the air was ordinary air and it was enough.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28HeatInTheBody', true) },
  },

  {
    id: 'sdr28_the_photograph_looked_at',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr28PhotographLookedAt,
    text: pick([
      'You found a photograph of yourself from years ago and you looked at it for a while. You cannot quite locate yourself in the face. Not because you look so different, though you do. More because you do not know what that person was thinking, what they were worried about, what they thought would happen next.',
      'There is a photograph that was not staged — someone caught you doing something ordinary. You are not looking at the camera. You do not know you are about to be a photograph yet. You look like that is just your life, going on.',
      'The photographs from before you had a camera in your pocket every day are different. They had to be chosen. Someone decided: this moment is worth the cost of the film, the processing. What was selected says something. What was not selected you can no longer see.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28PhotographLookedAt', true) },
  },

  {
    id: 'sdr28_market_day',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28MarketDay,
    text: pick([
      'The market on a certain morning of the week. The same stalls roughly in the same places. The particular smell of it — vegetables, something fried, the morning damp still in the canvas. You have been here enough times that you know which way to go without thinking about it.',
      'The man selling things from a cart: the same place every day, or every week. You have bought from him enough times that there is something between you, not friendship, but recognition. He knows what you usually take.',
      'There is always someone at the market who has been there longer than anyone else can remember. They have a particular authority that comes from being older than the stall next to them, from knowing the history of the ground they are standing on.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28MarketDay', true) },
  },

  {
    id: 'sdr28_the_name',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28TheName,
    text: pick([
      'Someone pronounces your name and gets it slightly wrong. You do not correct them. You have not always corrected people. At some point you decided whether this was worth the effort and you have been consistent since then.',
      'You hear your name said in a crowd — not directed at you, just someone else with the same name, or someone calling out for someone else. You turn before you can stop yourself. The body responds before the mind has checked.',
      'There are people who shorten your name, people who use the version only your family uses, people who have always used your full name. Each of these is a version of you that only exists in relation to them.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28TheName', true) },
  },

  {
    id: 'sdr28_cooking_alone',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28CookingAlone,
    text: pick([
      'You are cooking alone and you are not in a hurry. The sound of it — the oil, the water coming to a boil, the knife on the board. There is nothing else happening. This is enough of something.',
      'The dish you make when you are the only one eating it. Exactly what you want, nothing compromised, nothing explained. There is a small private pleasure in this that you would not mention to anyone.',
      'You learned this recipe from someone and now you make it differently than they did. Not because you improved it, just because your hands do it their own way. The dish has your version and their version and you cannot make theirs anymore.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28CookingAlone', true) },
  },

  {
    id: 'sdr28_dust_in_light',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28DustInLight,
    text: pick([
      'A shaft of light through the curtains and the dust moving in it. You have seen this your whole life and it still catches your attention for a moment before you remember what you were doing.',
      'The light in the late afternoon when it comes sideways through a window and catches everything — the edge of a table, a glass of water, the dust — and makes it all briefly worth looking at.',
      'The light changed. You were in the middle of something and the room changed around you — some cloud moving, some hour passing — and for a moment everything was lit differently and you noticed.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28DustInLight', true) },
  },

  {
    id: 'sdr28_the_news',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 25 && !G.mem?.sdr28TheNews,
    text: pick([
      'The news in the morning before you are ready for it. Something happened. You read it or hear it and then you go about your day with it somewhere inside you, this thing that happened to people you will never know, in a place you may never go.',
      'There are days when you stop following it. Not permanently — you come back. But for a week, or a month, you decide you cannot hold all of it. The world continues to have things happen in it while you are not watching.',
      'You remember where you were when certain things happened — not always the big things, sometimes something smaller, something only you remember was important. The news makes memory strange that way. Some of it sticks and some of it does not.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28TheNews', true) },
  },

  {
    id: 'sdr28_the_plant',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28ThePlant,
    text: pick([
      'The plant on the windowsill has been there long enough that you no longer see it unless you are watering it. Then you see it: it is still alive, it has grown, something has happened while you were not paying attention.',
      'You have killed more plants than you have kept. The ones that lived did so despite you, largely. They asked for less than you had to give.',
      'Someone gave you a plant years ago and you still have it. They may not know that. It has outlasted several other things from the same period. This is not something you have ever mentioned to anyone.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28ThePlant', true) },
  },

  {
    id: 'sdr28_the_crowd',
    phase: null,
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && !G.mem?.sdr28TheCrowd,
    text: pick([
      'Moving through a crowd without touching anyone — the small negotiations of space, the adjustments, the bodies aware of each other. You get through it. On the other side: open air, your own pace again.',
      'You are in a crowd and for a moment you see yourself from above — one person among all these people, all moving with somewhere to be, all inside their own complete version of the day. The view disappears. You keep walking.',
      'The city on a weekday morning — everyone going the same direction, more or less. You have been part of this current for years. You know how to be in it. You move.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28TheCrowd', true) },
  },

  {
    id: 'sdr28_the_smell_of_rain',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28SmellOfRain,
    text: pick([
      'The smell before rain — petrichor, though you may not know that word. The air changes. Something in you recognises it before you consciously register what is coming.',
      'It started raining while you were inside and by the time you noticed the street was already wet. There is always a version of this where you just missed being caught in it.',
      'Rain on a particular surface makes a sound you know well — roof tiles, a tin roof, leaves, pavement. The specific sound of rain in the place where you grew up is a sound you carry without knowing you carry it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28SmellOfRain', true) },
  },

  {
    id: 'sdr28_being_recognised',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.sdr28BeingRecognised,
    text: pick([
      'Someone recognises you in a place where you did not expect to be recognised. Not a famous kind of recognition — just someone from a chapter of your life that you thought was closed. You are still that person to them.',
      'The shopkeeper who recognises you even though you only come in occasionally. The small nod: you are known here. You do not know their name. They do not know yours. Something passes between you anyway.',
      'A child who knew you when they were small recognises you now as an adult. You are a particular person to them — a version of you from before they were old enough to know what they were remembering. You can see yourself in how they greet you.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28BeingRecognised', true) },
  },

  {
    id: 'sdr28_the_end_of_something',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.sdr28EndOfSomething,
    text: pick([
      'You have been doing this for thirty years or forty and now you are not doing it anymore. Not a decision, exactly — more a gradual stopping. The last time you did it you did not know it was the last time. You know now.',
      'The neighbourhood has changed enough that you stopped going. Not in protest — you just stopped, the way you stop going places. Someone else lives in the version of the neighbourhood you remember.',
      'There is an era of your life that is over in a way that other eras were not. They ended but they still felt adjacent. This one is genuinely past. You can look at it the way you look at somewhere you lived a long time ago: accurately, without living there.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28EndOfSomething', true) },
  },

  {
    id: 'sdr28_the_habit',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28TheHabit,
    text: pick([
      'You have done this at this time on this day for so long that if you did not do it you would notice the gap it left. Not because the thing is important but because the gap would be. Habit is its own kind of structure.',
      'You no longer remember starting this. You just do it. It is part of the scaffold of the day, one of the things that holds the shape of a day together. You do not think about it. You just do it and the day holds.',
      'The small ritual that other people would find strange if they saw it — the particular order you do things in, the exact way. You have always done it this way. You have never explained it to anyone.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28TheHabit', true) },
  },

  {
    id: 'sdr28_someone_alone',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28SomeoneAlone,
    text: pick([
      'A person eating alone in a restaurant: reading, or not reading, just sitting with their food. You glance at them and then away. They are in their life. You are in yours. The restaurant contains both without difficulty.',
      'Someone on a bench in the park, not doing anything — not on a phone, not reading. Just sitting. There is something in it that you cannot quite name: either they have more peace than you or they are waiting for something or they are just resting. You do not know. You keep walking.',
      'You see someone across the street who reminds you of someone you knew. They are not that person — they cannot be, it has been too long, the person you are thinking of would be older now. But the walk, the angle of the head.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28SomeoneAlone', true) },
  },

  {
    id: 'sdr28_the_ache',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.sdr28TheAche,
    text: pick([
      'Something aches that did not used to ache. Not seriously — just a reminder that the body has a history. It will pass, or it will become something you manage. You have not decided yet which kind it is.',
      'The tiredness at the end of a day that is different from the tiredness at the end of a day when you were younger. This one is accumulated. It has been waiting for you since morning.',
      'Your back, or your knees, or your hands. Some joint that was not something you thought about before. You think about it now. Not with alarm — just acknowledgement. This is the body telling you something true.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28TheAche', true) },
  },

  {
    id: 'sdr28_children_playing',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 25 && !G.mem?.sdr28ChildrenPlaying,
    text: pick([
      'Children in a courtyard or a street, playing something with rules that only they know. The total absorption of it — nothing exists outside the game while the game is happening. You watch for a moment and then continue.',
      'A child is laughing at something that is not funny to you and is entirely funny to them. The gap between what is funny at their age and what is funny at yours is not something you can fully remember crossing.',
      'The children on this street are a different generation from the children who were here when you arrived. The previous children are grown. New ones replaced them without anyone announcing it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28ChildrenPlaying', true) },
  },

  {
    id: 'sdr28_the_task_done',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28TheTaskDone,
    text: pick([
      'You finished something that had been waiting. Not a large thing — a form, a repair, a call you had been putting off. It took fifteen minutes. The weight of having it undone was much larger than the thing itself.',
      'The list in your head that you maintain without writing it down. Some things have been on it for years. They move to the top sometimes and back down. Occasionally something comes off for good.',
      'You did the thing before you were ready to do it. Not because you were ready, but because you were tired of not having done it. This is different from wanting to. It worked.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28TheTaskDone', true) },
  },

  {
    id: 'sdr28_the_old_neighbourhood',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr28OldNeighbourhood,
    text: pick([
      'You went back to a neighbourhood you lived in before and the street was recognisable but the details had been replaced. New signs, a different kind of restaurant, the building where something used to be still has a different something in it now. The form without the content.',
      'The house you grew up in with different curtains in the windows, a different colour on the door. It belongs to someone else. It always did, in a way — you just occupied it for a time.',
      'The route you memorised thirty years ago: you still know which way to turn. The body keeps that knowledge even when the destination no longer exists in the same form. You walked it without having to think.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28OldNeighbourhood', true) },
  },

  {
    id: 'sdr28_late_at_night',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28LateAtNight,
    text: pick([
      'The house at 2am or 3am — the particular quality of it. Every sound has a different scale at that hour. The refrigerator, a branch against a window, someone outside at a distance. You are the only one awake. This is a different version of the same place.',
      'You woke up in the middle of the night and could not go back to sleep for a while. You lay there. The dark was its own thing — not frightening, not peaceful, just the dark doing its usual work. Eventually sleep came back.',
      'The silence after midnight is not the same silence as midday. Something is resting in it, or the city is resting, and you happen to be awake inside the rest. You do not know what to do with it except wait for morning.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28LateAtNight', true) },
  },

  {
    id: 'sdr28_something_heard',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28SomethingHeard,
    text: pick([
      'You overheard something that was not meant for you. A fragment — half a sentence, a name, a number. You do not know the context. The fragment stays with you anyway, incomplete, irreducible.',
      'The person on the phone in a public place, conducting their life at full volume. You try not to listen. You listen anyway. You will carry some version of their conversation for the rest of the day without knowing anything about them.',
      'Music from somewhere you could not identify — a window, a car, a space behind a wall. The song was one you knew from a specific time. By the time you located where it was coming from, it had changed.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28SomethingHeard', true) },
  },

  {
    id: 'sdr28_winter_morning',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28WinterMorning,
    text: pick([
      'A winter morning when the light comes late and thin. Getting up before the light makes the day feel front-heavy — all effort at the start, the light arriving as a kind of confirmation after the fact.',
      'The cold in the room before the heat comes on. You know this cold. Every winter it is the same negotiation with yourself about getting out of the blankets. You always do. The moment of it never gets easier.',
      'Frost on a window or a car or the ground, the particular crystalline precision of it. It has no reason to be beautiful. It is, anyway.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr28WinterMorning', true) },
  },

  {
    id: 'sdr28_the_stranger_on_the_road',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr28StrangerOnRoad,
    text: `You pass someone on the road — coming the other way, or going the same direction faster, or slower. For a second you are in each other's awareness: another person, real, complete, carrying whatever they are carrying. Then you are past each other. There is nothing more to it and there does not need to be.`,
    choices: null,
    effect: (p) => { p.setMem('sdr28StrangerOnRoad', true) },
  },

]
