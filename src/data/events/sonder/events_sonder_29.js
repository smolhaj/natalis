// events_sonder_29.js
// Contemplative layer: the small knowledge of place, what the body remembers
// without the mind, the person you used to be, gratitude without occasion,
// the unasked question, things that still exist.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_29 = [

  {
    id: 'sdr29_small_knowledge',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29SmallKnowledge,
    text: pick([
      'You know things about this place that are not in any document: where the drain backs up in heavy rain, which neighbour leaves the light on all night, the hour when the street is briefly, completely quiet. This knowledge accumulated without effort. You did not decide to learn it.',
      'The shortcut that you discovered on a day when you were running late. You have used it hundreds of times since. You have never told anyone about it. It is one of the small private geographies you carry.',
      'You know which of the steps on the staircase creaks. You have known for so long that you step over it without noticing. If you are trying to be quiet, you remember to step over it. If you are not trying to be quiet, you still step over it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29SmallKnowledge', true) },
  },

  {
    id: 'sdr29_body_without_mind',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29BodyWithoutMind,
    text: pick([
      'You were thinking about something else entirely and your hands did the task without you. Set the table, folded the cloth, locked the door. You came back to yourself and the thing was done.',
      'The route you have walked so many times that your feet know the turns before you consciously direct them. You arrive somewhere and only then notice you have arrived. The walk happened below the level of attention.',
      'You reached for something in the dark and found it exactly where you expected it to be. The body has a memory that does not consult you. It has been filing information for decades without being asked.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29BodyWithoutMind', true) },
  },

  {
    id: 'sdr29_who_you_were',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.sdr29WhoYouWere,
    text: pick([
      'There is a version of you from ten years ago that you do not fully remember being. The concerns were different. The stakes felt different. Whatever occupied you then occupied you completely. Looking back, it is like watching someone you mostly recognise going about a life you mostly understand.',
      'Someone who knew you a long time ago sees you and their recognition tells you something about who you were when they knew you. The person they are greeting exists partly in their memory and partly in you and the two do not entirely match.',
      'You said something this week that you would not have said fifteen years ago. Not because you have changed your mind — you have, though — but because you have changed the way you carry what you think. The sentence came out differently than it would have. That is the only evidence of the change.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29WhoYouWere', true) },
  },

  {
    id: 'sdr29_gratitude_without_occasion',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 25 && !G.mem?.sdr29GratitudeOccasion,
    text: pick([
      'Not because anything particularly good happened today. Just: the light through the window at this hour, the particular quality of the morning, the fact of being here and not somewhere worse. You did not plan to feel this. It arrived on its own.',
      'For a moment, driving or walking or doing something ordinary, you thought: this is enough. Not a conclusion — just a moment. The moment passed. The feeling left a trace.',
      'You are not sure what you are grateful for, exactly. Not a thing you can name. More the overall shape of the day — nothing required, nothing broken, the basic machinery of existence running without complaint. This turns out to be enough for something like gratitude.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('sdr29GratitudeOccasion', true) },
  },

  {
    id: 'sdr29_the_unasked_question',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr29UnaskedQuestion,
    text: pick([
      'There is a question you never asked someone while you had the chance. Not a dramatic question — something small, something about their life before you knew them. You thought you would ask it later and then there was no later. The question sits there, permanently open.',
      'Your parent knew something about where the family came from and you did not ask enough questions while you could. The record exists in them and in no other place. What they knew will not be known.',
      'You had years to ask someone how they felt about something and you never asked because asking felt presumptuous, or the right moment never came. Now you know what they would have said only by inference, which is a worse kind of knowing.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('sdr29UnaskedQuestion', true) },
  },

  {
    id: 'sdr29_things_that_still_exist',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 50 && !G.mem?.sdr29ThingsExist,
    text: pick([
      'The tree was there when you were a child and it is still there. Not every tree survives the city — they get cut for pipes, for widening, for shade that the building no longer wants. This one stayed. You do not know who decided to keep it.',
      'The building you grew up near is still standing, with its plaque and its postbox and its particular smell in summer that you would recognise immediately. Somewhere inside it the same stairs are there, the same bend in the corridor.',
      'Something from forty years ago still exists: a shop, a church, a wall with a painted advertisement for something no one sells anymore. You pass it occasionally. It is the same and you are different and neither of you mentions this.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('sdr29ThingsExist', true) },
  },

  {
    id: 'sdr29_someone_you_will_not_see_again',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.sdr29WontSeeAgain,
    text: pick([
      'You said goodbye to someone and you did not know it was the last goodbye. You have not thought about it for a while. Something reminded you just now. The last goodbye was ordinary. That is always how the last goodbye is.',
      'There is someone you lost track of — not through any event, just through the natural drift of separate lives. You do not know where they are. They do not know where you are. Both of you are somewhere, living a life neither of you can see.',
      'You think of someone from a particular time and you cannot remember the last thing they said to you. You remember their face well enough. The last words are gone. This is how most conversations end — not knowing they are ending.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('sdr29WontSeeAgain', true) },
  },

  {
    id: 'sdr29_the_word',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29TheWord,
    text: pick([
      'There is a word you use that you got from a specific person. You can still hear it in their voice when you say it, or sometimes when you hear it. The word carries the person inside it. You have passed it on without knowing it.',
      'A word from your childhood that you stopped using at some point — you don\'t know exactly when — and only notice now because you heard someone else use it. It felt old in their mouth. You remember it feeling ordinary in yours.',
      'There is a word in your first language that does not translate exactly. Not that the concept doesn\'t exist elsewhere — but the word holds it in a particular way, with a particular weight. The translation is always a smaller thing.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29TheWord', true) },
  },

  {
    id: 'sdr29_the_door',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29TheDoor,
    text: pick([
      'The door you have opened thousands of times. You do not think about opening it. You open it and you are through. When you think about this specific door — where you have been going through it, what has happened on the other side over the years — there is something in it worth a moment.',
      'There is a door somewhere that you will never open again. You may have already been through it for the last time without knowing. Most doors are like this eventually.',
      'The sound of a particular door — the rattle, the specific weight of it, the way the latch settles. You know this sound so well it has become a kind of signal: someone is coming in, or you are home, or the day is beginning.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29TheDoor', true) },
  },

  {
    id: 'sdr29_stranger_window',
    phase: null,
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && !G.mem?.sdr29StrangerWindow,
    text: `A light is on in the apartment across the way. Not unusual — it is evening, people are at home. But someone is moving inside: a shape, a silhouette, a person doing whatever they do in the evenings. They do not know you are watching. You are not watching, exactly. Your eyes went there and the life inside briefly registered. They are in their version of this hour. You are in yours. The window contains both.`,
    choices: null,
    effect: (p) => { p.setMem('sdr29StrangerWindow', true) },
  },

  {
    id: 'sdr29_the_smell_remembered',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29SmellRemembered,
    text: pick([
      'A smell that is not common anywhere you go now: something from your grandmother\'s house, or the school corridor, or the place where you worked the first time. The smell arrives in an unexpected context and takes you back with a speed that thought cannot match.',
      'There is a smell that means a specific thing to you and means nothing in particular to most people. Not good or bad — just encoded. It carries the first time you smelled it somewhere inside it, and everything that was happening at the time.',
      'You smelled something today that you had not smelled in years. For a moment you were somewhere else entirely. Then you were back. The somewhere else was vivid while it lasted. These are the fastest kind of memory.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29SmellRemembered', true) },
  },

  {
    id: 'sdr29_the_letter_unwritten',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.sdr29LetterUnwritten,
    text: pick([
      'You have been meaning to write to someone for months. Not a letter exactly — a message, a call, something to say you are thinking of them. You have not done it. Not because you have stopped thinking of them. The opposite.',
      'There is something you should have said to someone when you had the chance. You have composed it in your head many times, with different words each time. The composition has never left your head.',
      'You thought about sending something — a note, a photograph, an acknowledgement of a thing that was done for you a long time ago. You thought about it and then you thought about it again and then you did not send it. The thought is still there.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('sdr29LetterUnwritten', true) },
  },

  {
    id: 'sdr29_the_ordinary_meal',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29OrdinaryMeal,
    text: pick([
      'You eat the same thing on certain days, not because you planned to but because it settled into the rotation without being formally decided. On those days you eat it and it is the thing you eat on those days. This is its own small comfort.',
      'A meal you did not choose carefully, eaten standing or in a hurry, that was unexpectedly good. Not because the food was special. Something about the hour, the light, the fact of being hungry and then not hungry. It is still there in memory when most careful meals are not.',
      'The meal someone else cooked for you that you have tried to reproduce many times. It is never quite the same. This has less to do with the recipe and more to do with who cooked it and when.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29OrdinaryMeal', true) },
  },

  {
    id: 'sdr29_sleeping_elsewhere',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29SleepingElsewhere,
    text: pick([
      'You slept in a place that was not your own bed and the strangeness of it kept you partially awake. Not uncomfortable — just different. The ceiling, the sounds, the weight of the air. In the morning you knew where you were before you fully woke. The body oriented itself.',
      'A night in a different city: the quality of the dark there, the sound of traffic at 3am that is not your traffic. You were briefly someone living there, inside their ordinary night, before you got on the train back.',
      'Waking up in a house you knew as a child. The proportions of the room were different from memory. They were not different — your memory had adjusted them. The room is the same. You have changed what it would fit inside.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29SleepingElsewhere', true) },
  },

  {
    id: 'sdr29_the_skill_unused',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr29SkillUnused,
    text: pick([
      'There is something you learned to do well and have not done in years. You do not know if you still can. You have not tested it because testing it would require confronting the possibility that it has faded. The skill exists in memory as intact. Maybe it is.',
      'You used to be able to do this quickly. You try it now and it takes longer and there are hesitations that were not there before. The skill is still present. It is the ease that has gone, not the knowledge.',
      'Something you learned as a child and carried for years, then put down. It is still there somewhere — you are certain of this without being able to prove it. If you picked it up again it would come back. You have not picked it up.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29SkillUnused', true) },
  },

  {
    id: 'sdr29_the_child_grown',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 50 && G.children && G.children.length > 0 && !G.mem?.sdr29ChildGrown,
    text: pick([
      'Your child is now older than you were when they were born. You are now the parent of someone your age. The arithmetic of this is simple; what it means takes longer to take in.',
      'Something your child says or does that is unmistakably from you — a gesture, a phrase, a way of reacting to something. You recognise it before you are sure what you are recognising. It is strange to see something of yourself living in another person.',
      'The version of your child that you knew when they were small is not the person in front of you now, though the person in front of you contains that version. You are the only one who remembers both. This is a specific kind of knowledge.',
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('sdr29ChildGrown', true) },
  },

  {
    id: 'sdr29_the_hour_alone',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29HourAlone,
    text: pick([
      'An hour you had not planned on — a cancellation, an early finish, something that did not take as long as expected. You sat with the unexpected hour. You did not know what to do with it first, then you did, then it was over.',
      'The apartment or the house to yourself: the particular quality of the quiet when it is not your usual quiet but quiet from the absence of someone who is usually there. Different from loneliness. More like a different key.',
      'You had time today and you used it badly, by which you mean you did nothing in particular and it was fine. You are not sure when you learned to be comfortable doing nothing in particular. It took longer than it should have.',
    ]),
    choices: null,
    effect: (p) => { p.m += 1; p.setMem('sdr29HourAlone', true) },
  },

  {
    id: 'sdr29_the_repair',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29TheRepair,
    text: pick([
      'Something was broken and now it is fixed. Not dramatically broken — just not working, a thing you worked around for longer than you should have. Now it works. The not-working was what you noticed. The working is what you stop noticing.',
      'You repaired something yourself when you could have paid someone else to do it. Or you paid someone else to do it when you could have done it yourself. Either way: the thing works now. That was the point.',
      'The patch, the splice, the join — visible if you look, invisible in use. The object has a history now that it did not have before. Most objects acquire this history without ceremony.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29TheRepair', true) },
  },

  {
    id: 'sdr29_watching_someone_sleep',
    phase: null,
    weight: 2,
    when: (G) => (G.partner || (G.children && G.children.length > 0)) && !G.mem?.sdr29WatchSleep,
    text: pick([
      'You woke up before them and watched them sleep for a moment. The face in sleep is unguarded in a way the waking face is not. You know this face. Something in watching it was tender and uncomplicated in a way that the day would not be.',
      'The child asleep: the total surrender of it, the specific weight of a sleeping child if you have to move them. The sleep of children is an argument for something, though you are not sure what.',
      'They were asleep and you were awake and for a minute you watched. Then you got up and let them sleep and the moment passed into the ordinary category of things that happened on a Tuesday.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('sdr29WatchSleep', true) },
  },

  {
    id: 'sdr29_the_object_kept',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr29ObjectKept,
    text: pick([
      'You still have something you cannot explain keeping. Not valuable — just yours. It has moved with you through multiple places and you have never considered not taking it. You have not looked at it in months. You would notice if it were gone.',
      'An object from someone who is dead that you did not choose to keep specifically, that you just kept when everything else was sorted. It has been with you long enough that it is no longer theirs — it is yours. This happened gradually.',
      'The thing you kept when you should have thrown it away, or gave it away, or sold it. It is in a drawer somewhere. You know exactly where. You do not take it out often. The knowing where it is is the thing.',
    ]),
    choices: null,
    effect: (p) => { p.r += 1; p.setMem('sdr29ObjectKept', true) },
  },

  {
    id: 'sdr29_the_night_drive',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29NightDrive,
    text: pick([
      'Driving or riding at night when the roads are different — emptier, the lights making everything specific. The city at 2am is not the city at noon. Both are real. The night version is the one people see less and remember longer.',
      'A long journey in the dark: the window, the reflections, the other passengers asleep. Outside: towns you pass through without stopping, lights that mean other lives going about their business at this hour.',
      'You went somewhere and came back the same night, longer than expected. The return journey in the dark, the familiar roads looking different. You got home later than planned. The house was quiet and the house was yours.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29NightDrive', true) },
  },

  {
    id: 'sdr29_the_music',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29TheMusic,
    text: pick([
      'A song you have not heard in years and then you hear it. The specific feeling of a song from a particular time arriving in a different time. Not just memory — something more physical. The body has been carrying it.',
      'You found yourself singing something without knowing where it came from. The song surfaced from somewhere below the level of intention. You knew all the words. You had not thought about the song in years.',
      'The music that was playing during a specific period of your life: you hear it now and the period comes back with it, not as a visual memory but as a feeling — the particular texture of being that age, in that situation. The song is a door that opens onto it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29TheMusic', true) },
  },

  {
    id: 'sdr29_the_sky',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29TheSky,
    text: pick([
      'You looked up today. Not because anything required it — just looked up and the sky was there, doing whatever it does at this hour. You have not looked up as often as you planned to. Most of the sky happens without you looking.',
      'Stars: only visible outside the city, or only visible in the city when the power goes out, or visible always but you forget they are there. When you do see them — all of them, properly — something recalibrates.',
      'The clouds moving. You watched them for a moment longer than there was any reason to. They were not going anywhere in particular. Neither were you. You were both in the same afternoon.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29TheSky', true) },
  },

  {
    id: 'sdr29_the_generation_before',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.sdr29GenerationBefore,
    text: pick([
      "Your parents' generation had a different set of certainties that turned out to be wrong or temporary. Your generation has a different set. You have begun to notice, from the position of middle age, that the certainties your generation holds are probably also temporary. The ones that will turn out to be wrong are not marked.",
      "Something that was new in your parents' time is now old in yours. The technology, the belief, the way of doing a thing — it arrived within living memory and now it is the established way and the people who remember its arrival are getting old. You are now the generation that will remember.",
      'You are the age your parent was when you were at a particular age. You remember them at this age from the outside. Now you are inside it. The inside and the outside are not the same view.',
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('sdr29GenerationBefore', true) },
  },

  {
    id: 'sdr29_the_queue',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29TheQueue,
    text: pick([
      'You stood in a queue today and the queue moved slowly. You did not mind as much as you thought you would. You observed the other people. You had a thought that was not about the queue. The queue ended.',
      'A queue for something minor: a counter, a gate, a till. The person behind you too close. The person ahead taking longer than necessary. The transaction completed. You leave before you have fully processed that you are through.',
      'The wait is the thing nobody schedules. The appointment, the procedure, the result — these are scheduled. The wait before them is just time, experienced differently. Some people fill it. Some people let it be waiting.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29TheQueue', true) },
  },

  {
    id: 'sdr29_light_in_evening',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29LightEvening,
    text: pick([
      'The specific light at the end of the day when the sun is almost but not fully gone — everything gold, then orange, then the colour of shadow. It takes fifteen minutes. You were there for some of it.',
      'The evening light through a particular window at a particular time of year. You look forward to it without meaning to. It comes around and you notice it came. It will come again.',
      'The moment the light changed: you were in the middle of something and then the room was different, the quality of the light shifted and for a second everything was the same but different. Then the moment passed and the light settled into its evening work.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29LightEvening', true) },
  },

  {
    id: 'sdr29_the_brief_conversation',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29BriefConversation,
    text: pick([
      'Someone said something to you in passing — at the counter, in the corridor, while waiting for something. You have thought about it a few times since. They do not know they said it. You do not know their name. The thing they said was not large. It was specific.',
      'A conversation that was supposed to be quick and lasted an hour. You did not plan for an hour. Neither did they. Both of you walked away later having said something that needed to be said, which neither of you knew before you started.',
      'You spoke to someone today who you will never speak to again and both conversations went exactly as they needed to and then they ended. This is most conversations.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29BriefConversation', true) },
  },

  {
    id: 'sdr29_arrival',
    phase: null,
    weight: 2,
    when: (G) => !G.mem?.sdr29Arrival,
    text: pick([
      'You arrived somewhere and for a moment the arriving was its own thing — before you were inside it, before you were doing what you came to do. The threshold moment: here and not yet there.',
      'Coming home after a time away: the specific smell of home, which you only notice when you have been away long enough to lose it. The reassembly of the familiar. The first night back in your own bed.',
      'You came back to a place you had not been in some time. The place had continued without you, which is what places do. You had continued without the place. The meeting of those two continuations takes a moment.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29Arrival', true) },
  },

  {
    id: 'sdr29_the_birthday',
    phase: null,
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.sdr29TheBirthday,
    text: pick([
      'There are people who remember your birthday and call, and people who forget and feel bad about it later, and people who do not know when it is and that is fine. The birthday itself is just a day. What it collects around it is the measure of something else.',
      'Another one. The number has become larger than it seemed it would be when you were watching it from far away. From far away you thought you would feel different about it than you do. You do not feel very different about it. This is the usual surprise.',
      'On your birthday you thought about what you expected this year would look like and what it actually looks like. Not dramatically different. Different enough to notice. You made adjustments you did not plan to make. Some of them turned out well.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr29TheBirthday', true) },
  },

]
