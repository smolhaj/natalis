// events_sonder_15.js — contemplative layer, batch 15
// Weight 2, no choices, mem-gated, pure observation.
// Themes: numbers and counting, the recurring day, bureaucracy as lived texture,
// hands and what they hold, threshold moments, debt and owing, what children inherit,
// what the body knows, the photograph not taken, the second language.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_15 = [

  // ── NUMBERS AND COUNTING ───────────────────────────────────────────────────

  {
    id: 'son15_counting_money',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 35 && !G.mem?.son15CountingMoney,
    text: pick([
      `You count the money on the table. You know the total before you finish counting because you have done this arithmetic many times. The counting is not about arriving at a number. It is about the handling, the confirmation that the number is what you think it is.`,
      `You check the balance. The number is the same as it was yesterday, which means nothing went wrong and nothing went right. The number that means nothing went wrong is the goal most months.`,
      `The price has gone up. Not by much. You calculate what "not by much" means across a month, across a year. The numbers are small and the calculation is familiar and you have been doing it for long enough that you don't notice you're doing it anymore.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15CountingMoney', true) },
  },

  {
    id: 'son15_the_exact_amount',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 55 && !G.mem?.son15ExactAmount,
    text: pick([
      `You know the exact amount without looking. The mortgage payment, the school fees, the rent — the figures that shape a month have been the same long enough that they are simply known, the way you know the number of steps to the bathroom in the dark.`,
      `You remember the exact salary you were making at twenty-eight. The exact price of the apartment you didn't buy. The exact amount that would have changed a specific thing. Numbers that meant something at the time stay.`,
      `Your child asks for money and you give them the amount you give. You do not explain the amount. The amount has an explanation that is the whole architecture of what you earn and what you owe and what is left.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15ExactAmount', true) },
  },

  // ── THE RECURRING DAY ─────────────────────────────────────────────────────

  {
    id: 'son15_tuesday',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 55 && !G.mem?.son15Tuesday,
    text: pick([
      `Tuesday is the day you notice without meaning to. Not the worst day or the best day but the most itself — nothing special, nothing promised, the middle of the week just being the middle of the week. Some days mark themselves by being unremarkable. Tuesday does this reliably.`,
      `You have been going to the same place on the same day at the same time for long enough that you know which counter has the shorter line, which time of day the parking is easier, which person will make small talk and which person prefers not to. The repetition is the structure. The structure is not a problem.`,
      `There is a day of the week you always feel slightly better. You have not worked out why and have stopped trying. It is Wednesday. You know it will be a better day when you wake up on Wednesdays, and you are usually right.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15Tuesday', true) },
  },

  {
    id: 'son15_the_commute_years',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 55 && G.career && !G.mem?.son15CommuteYears,
    text: pick([
      `You have spent years in transit between the place where you sleep and the place where you work. The time in between has a specific quality — neither place, neither thing. You have read there, slept there, thought things there that you did not think anywhere else. The commute is where a portion of your life actually happened.`,
      `You know this route so well that your body navigates it without your permission. You have looked up to find yourself at the station without any memory of walking from the bus. The route is in the body now, not in the mind.`,
      `The commute takes forty minutes each way. You have done this five days a week for nine years. You have spent a significant fraction of your waking life in this particular transit, between these particular streets, looking at these particular facades.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15CommuteYears', true) },
  },

  // ── BUREAUCRACY AS LIVED TEXTURE ──────────────────────────────────────────

  {
    id: 'son15_the_queue',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 35 && !G.mem?.son15Queue,
    text: pick([
      `The queue moves at its own pace. The pace is the pace of the counter, not of the people waiting. Everyone in the queue knows this. The adjustment you make is to the queue's pace, not the other way around.`,
      `You fill out the form. The form has a section for information you do not have. You find the information. You return. The form has changed. This is not unusual.`,
      `You have been told to come back on a specific day. You come back on that day. You are told to come back on a different day. You carry your documents in a folder now and the folder is familiar in the hand.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15Queue', true) },
  },

  {
    id: 'son15_the_stamp',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 40 && !G.mem?.son15Stamp,
    text: pick([
      `The document requires a stamp. This is not a metaphor. There is an actual stamp, in an office, held by a specific person, that makes the document valid. You find the office. The person with the stamp is not there today.`,
      `You have been told it is processed. Then you are told it has not been received. Then you are told it was received but not processed. The information changes without the document moving. You note this and continue.`,
      `The official form has a reference number. The reference number refers to your case. Your case has a status. The status has been "pending" for some months. You check the status and it is still pending and you have started to understand that "pending" is the default state of most things that are in the process of being decided.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15Stamp', true) },
  },

  // ── HANDS AND WHAT THEY HOLD ──────────────────────────────────────────────

  {
    id: 'son15_hands',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 58 && !G.mem?.son15Hands,
    text: pick([
      `Your hands have your father's shape. You noticed this at some point and did not pursue the thought. It has the quality of a door you can open or leave closed.`,
      `You watch your own hands doing something — a familiar task, something routine — and there is a moment where the hands feel borrowed. Someone else's hands. Then the moment passes and they are yours again.`,
      `Your hands know things your mind doesn't. The lock combination entered without thinking. The bread kneaded by feel. The specific firmness of the child's shoulder to tell you whether they're upset or just tired. The hands carry knowledge that doesn't pass through the brain.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15Hands', true) },
  },

  {
    id: 'son15_the_grip',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.son15Grip,
    text: pick([
      `The grip is not what it was. Not gone — still functional, still reliable — but you notice now that you hold things with more attention than you used to. The grip is no longer assumed.`,
      `You carry things carefully now. Not all things — the grocery bag, the briefcase, the ordinary objects — but certain things, things with weight or fragility or meaning. You carry them in both hands, which is a recent development.`,
      `Opening jars. The jar opener that lives in the second drawer that you bought two years ago and use without embarrassment. The body finds workarounds. The workarounds are just methods.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15Grip', true) },
  },

  // ── THRESHOLD MOMENTS ─────────────────────────────────────────────────────

  {
    id: 'son15_before_the_door',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 40 && !G.mem?.son15BeforeDoor,
    text: pick([
      `You stand outside the door for a moment before going in. This happens without deciding. The pause is brief and unremarkable and happens before job interviews, before difficult conversations, before any room where something might change.`,
      `You sit in the car for a few minutes after arriving. Not on the phone, not doing anything — just in the car, in the quiet, in the space between what you were doing and what you are about to do. Other people do this. You have seen them.`,
      `The pause at the top of the stairs. You don't know what you're waiting for. You go down.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15BeforeDoor', true) },
  },

  {
    id: 'son15_the_sentence',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 55 && !G.mem?.son15Sentence,
    text: pick([
      `You have a sentence you use when someone asks how you are. The sentence is true and also not the full answer. The full answer would take much longer and would require the other person to have more time than the question suggests. You say the sentence.`,
      `There is a conversation you have been meaning to have for a long time. The time for it keeps not arriving. At some point you begin to understand that the time for it may not arrive, and you adjust your relationship to the conversation accordingly.`,
      `You say something at dinner that you don't particularly mean to say. The table is quiet for a moment. Then someone changes the subject. The something you said stays with you for longer than the dinner does.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15Sentence', true) },
  },

  // ── DEBT AND OWING ────────────────────────────────────────────────────────

  {
    id: 'son15_the_debt',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 40 && !G.mem?.son15Debt,
    text: pick([
      `There is a person to whom you owe something that cannot be paid back with money. The debt has been running for years. You carry it the way you carry certain debts — not as a weight exactly, but as an awareness, a thing that modifies other things.`,
      `Someone lent you money when you needed it and the amount was not large and you paid it back but the paying back was not the whole of it. The gesture was the thing. You have been looking for the right occasion to reflect that back to them.`,
      `You are owed something that is no longer coming. You made your peace with this at some point. You have mostly kept the peace.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15Debt', true) },
  },

  {
    id: 'son15_what_was_given',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 55 && !G.mem?.son15WhatGiven,
    text: pick([
      `Your parents gave you things you didn't ask for and things you didn't know you needed and things you would have preferred they hadn't. The accounting is complicated. You have stopped trying to settle it.`,
      `The thing that was given to you at a specific moment — not a gift exactly, but a thing that was given, a word or a chance or a phone call — changed the direction of something. You know what direction you were going before. You know the new direction. The thing was small enough that the giver may not remember it.`,
      `What you have been given: you try to list it occasionally. The list is always longer than you expect. The things you did not ask for are on the list. The things that cost someone something are on the list. The list keeps adding to itself.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15WhatGiven', true) },
  },

  // ── WHAT CHILDREN INHERIT ─────────────────────────────────────────────────

  {
    id: 'son15_the_thing_you_passed',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.children?.length > 0 && G.age >= 38 && !G.mem?.son15ThingPassed,
    text: pick([
      `Your child does the thing you do. The specific gesture, the way of saying a particular phrase. You watch them do it and feel something that is partly recognition and partly something less comfortable — you did not mean to give them that one.`,
      `They will have things from you that they do not know are from you. Patterns installed so early they feel like personality. You can see some of them from the outside. You could not always.`,
      `Something from your family that you swore you would not pass on: you have passed it on in a different form. The form is different enough that it took you a while to recognise it. You recognise it now.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15ThingPassed', true) },
  },

  {
    id: 'son15_what_they_will_not_know',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.children?.length > 0 && G.age >= 40 && !G.mem?.son15WontKnow,
    text: pick([
      `There is a version of your life they will never know about — before them. The person you were for the years before they existed. It is not hidden, but it is also not narrated. The stories you have told them are curated. The uncurated version lives only in you.`,
      `They will not know how close things came to being different. The job you almost didn't take. The city you almost didn't move to. The person you almost didn't speak to. The contingency underneath what looks to them like their origin story.`,
      `What you went through before they arrived: some of it you have told, some of it you have not. The untold portion is not secret. It is just not relevant to them, yet, in the way that it was relevant to you when you were going through it. It may become relevant later.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15WontKnow', true) },
  },

  // ── WHAT THE BODY KNOWS ───────────────────────────────────────────────────

  {
    id: 'son15_body_knowledge',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && G.age <= 55 && !G.mem?.son15BodyKnowledge,
    text: pick([
      `The body knows the morning before you do. The quality of the day is available in the first few minutes after waking, before you have thought anything deliberately. You have learned to read this and mostly to trust it.`,
      `There are things you can tell about a room when you walk in — the temperature of the interaction, whether something is wrong — before you have processed any specific information. This used to feel like intuition. It is probably just pattern recognition from long enough in similar rooms.`,
      `Your body learned something during a specific period of your life and hasn't unlearned it. The alertness to a certain kind of sound. The assessment of a doorway before you walk through it. The legacy of an earlier set of conditions.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15BodyKnowledge', true) },
  },

  {
    id: 'son15_the_tiredness',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 58 && !G.mem?.son15Tiredness,
    text: pick([
      `The tiredness has a quality now that it didn't have at thirty. Not deeper exactly — more present. It doesn't go away with one good night the way it used to. You manage it rather than defeating it.`,
      `You are tired in the morning. This is new enough that you still notice it. You sleep well and wake tired. The body is running a different calculation than the one it used to run. You are learning the new calculation.`,
      `The specific tiredness of the middle of the week. Not physical exactly — a tiredness of the resource that runs underneath. You know how to replenish it now, which took some years to learn.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15Tiredness', true) },
  },

  // ── THE PHOTOGRAPH NOT TAKEN ──────────────────────────────────────────────

  {
    id: 'son15_moment_not_photographed',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.son15NotPhotographed,
    text: pick([
      `You did not take a photograph at the moment when a photograph would have been most accurate. What the place looked like. What the light was doing. The face of the person at the specific moment before it changed. The image is in memory only, which is not the same as having it.`,
      `The ones you wish you had taken: a list that grew quietly over years. A room you lived in. A face before. A specific light on a specific afternoon. The camera was somewhere else or you didn't think of it or you thought the moment would recur. The moment did not recur.`,
      `There are photographs of this period. None of them are the image you would have taken if you had been thinking about it. The image you would have taken is only in your memory, where it is very precise and will eventually not be.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15NotPhotographed', true) },
  },

  {
    id: 'son15_the_photo_that_exists',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.son15PhotoExists,
    text: pick([
      `You find a photograph of yourself at an age you can barely remember being. The face is yours and also not yours — the same features arranged differently, the skin a different texture, the posture of someone who has not yet accumulated the specific things that modify a posture. You look at it for a while.`,
      `There is a photograph from a period you don't talk about much. The faces in it are in their twenties. Some of them you are still in contact with. Some of them you have lost track of. One of them is dead. The photograph has no sense of all this.`,
      `Your children found the photographs and asked about them. You told the version of the story that was true and also small enough to fit in a conversation. The full version lives in the drawer where the photographs are.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15PhotoExists', true) },
  },

  // ── THE SECOND LANGUAGE ───────────────────────────────────────────────────

  {
    id: 'son15_second_language',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('emigrated') && G.age >= 30 && !G.mem?.son15SecondLanguage,
    text: pick([
      `The second language is fluent now. But there are words in the first language for which the second language has no equivalent — not because the concept doesn't exist in the new place, but because the word in the old language has a texture, a colour, a specific weight that the translation can't reproduce. You use the first language's word, sometimes, in the middle of a sentence in the second language. The listener usually understands.`,
      `You dream in both languages, but the emotional register of the dream is always in the first. Fear, grief, longing — these arrive in the language of childhood. The second language is for instructions.`,
      `Your children speak the second language better than the first. This was the intention. This was the cost.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15SecondLanguage', true) },
  },

  {
    id: 'son15_the_accent',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags.has('emigrated') && G.age >= 22 && G.age <= 45 && !G.mem?.son15Accent,
    text: pick([
      `Your accent in the second language is audible. People hear it and locate you before you have said anything about yourself. This is useful sometimes and not useful other times. You have learned which is which.`,
      `You catch yourself thinking in the first language and translating. This still happens in certain situations — under stress, when tired, when the concept requires a detour. You are still making the detour after all this time.`,
      `The accent in the first language has changed slightly. People who knew you before notice it. You notice it when you go back. The years away have modified you in both directions.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15Accent', true) },
  },

  // ── ORDINARY OBJECTS ──────────────────────────────────────────────────────

  {
    id: 'son15_the_cup',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.son15Cup,
    text: pick([
      `There is a cup you use every morning. It has been broken and mended. It has moved houses. You use it without thinking and when you think about it you can trace back the specific origin — a specific kitchen, a specific person who had it before you. The cup has a history that is not its history.`,
      `You have a collection of things you did not choose to collect — the aggregated small objects of years. The mug from a conference. The bowl from a market. The glass that was part of a set that is now only this glass. They sit together on a shelf without coherence. They are the record of where you've been.`,
      `The chair you always sit in. This is not dramatic — just the chair. But it is the chair, not the other chairs, for reasons you could not fully explain and have stopped trying to.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15Cup', true) },
  },

  {
    id: 'son15_what_you_kept',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.son15WhatKept,
    text: pick([
      `You have moved houses several times. The things that survived all the moves: not the things you expected. A letter. A particular photograph. A tool that was impractical to keep. These are the things that apparently you were unwilling to leave behind.`,
      `What you have kept and what it says about you: this is an archaeology you can do in an afternoon. The objects are honest. They kept the things they kept without rationalising it.`,
      `You could tell a version of your life that was only the objects. The objects you have now vs. the objects you had at thirty. The difference is specific. The things that left are specific. The things that stayed.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15WhatKept', true) },
  },

  // ── THE STRANGER GLIMPSED ─────────────────────────────────────────────────

  {
    id: 'son15_the_window',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && G.age >= 30 && !G.mem?.son15Window,
    text: pick([
      `The lit window across the street, at a time when most of the building is dark. Someone is there. Working, or not sleeping, or watching something, or just there in the way that people are in rooms at unusual hours. The window is the exact measure of how much you can know about another person at a distance.`,
      `You see them on the platform sometimes — not always the same day, but enough that you have a loose idea of their schedule. You have never spoken. You know approximately what their week looks like from the outside. They know the same about you, probably. These arrangements exist everywhere.`,
      `A figure on the opposite balcony, visible through the gap in the buildings, doing something domestic — watering a plant, taking in washing. You see this person regularly in the way that cities arrange for you to see people regularly without ever closing the distance.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15Window', true) },
  },

  {
    id: 'son15_the_other_life',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 58 && !G.mem?.son15OtherLife,
    text: pick([
      `You imagine, briefly, the life of the person in the adjacent queue. It's not a real imagining — more like a reflex. They are buying something specific and you project a context for the specific thing and then you don't.`,
      `On the train, the person across from you has been reading the same page for twenty minutes. They are somewhere that is not the page. Their face is a document that requires more information than you have.`,
      `The couple at the next table are in the middle of something. Not a fight — something subtler. The pauses between what they say. The thing they are not saying in the pauses. You look away. Their dinner is not yours to interpret.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15OtherLife', true) },
  },

  // ── MAINTENANCE ───────────────────────────────────────────────────────────

  {
    id: 'son15_the_maintenance',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.son15Maintenance,
    text: pick([
      `The ongoing maintenance of a life: the appointments, the renewals, the subscriptions, the servicing of the things that need to be serviced to keep functioning. This is not living exactly. It is the condition under which living is possible. You attend to it.`,
      `There is always something that needs doing. This is not a complaint — it is a structural feature of having things and people and commitments in the world. The list is never finished. You have accepted this.`,
      `You pay the bill before it becomes a reminder. This is a behaviour you developed at some point and can now not remember learning. The version of yourself that did not do this is available in memory but not in practice.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15Maintenance', true) },
  },

  {
    id: 'son15_the_small_repair',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && G.age <= 58 && !G.mem?.son15SmallRepair,
    text: pick([
      `The thing that has been broken and not yet fixed, for a period of time that has become embarrassing. You pass it every day. You have, somehow, adapted to it. At some point you will fix it or stop seeing it. Both outcomes have occurred before.`,
      `You fix the thing that has been broken. The fixing takes twelve minutes. You had been meaning to fix it for four months. The gap between the intending and the doing is not explainable. The thing is now fixed.`,
      `Someone in the building fixes something without being asked. The boiler, the light in the hallway, the latch on the gate. You do not know who. The evidence is the fixed thing. You feel obscure gratitude toward a person you cannot identify.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15SmallRepair', true) },
  },

  // ── LATE LIFE ─────────────────────────────────────────────────────────────

  {
    id: 'son15_the_age_you_are',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.son15AgeYouAre,
    text: pick([
      `You are the age your parents were when you were forming your first clear memories of them. You remember how old they seemed. You do not feel that old. This discrepancy is information about both you and them.`,
      `You have crossed the age that certain people you knew didn't reach. You think about this occasionally, not with guilt but with the specific awareness of the people for whom this age remained theoretical.`,
      `The number of your age is strange. Not that you feel it — you know the body and its schedule, you have made peace with the number and what it carries. It is just strange to say it and mean it.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15AgeYouAre', true) },
  },

  {
    id: 'son15_what_you_understand_now',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.son15UnderstandNow,
    text: pick([
      `What you understand now that you didn't at forty: some of it is obvious in retrospect, which is what makes it useful in retrospect and not in prospect. The understanding that arrives on time is rarer than the understanding that arrives late.`,
      `The advice you could give your younger self: you try to assemble this occasionally. The list always sounds obvious. It wasn't obvious at the time. This is the entire problem with advice.`,
      `You know things now that took time to learn and that you could not have been told. Not complicated things. Simple things. Things that simple that someone would have had to live the time in order to know them.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15UnderstandNow', true) },
  },

  {
    id: 'son15_the_earlier_self',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 70 && !G.mem?.son15EarlierSelf,
    text: pick([
      `The person you were at thirty would not fully recognise the person you are now, and vice versa. The change was continuous and so you did not notice most of it. What remains is continuity of memory and certain habits and the body that was there throughout.`,
      `You catch yourself doing something you used to do at a specific age. It's not regression — it's the thing returning because the circumstances have returned. The self is more contextual than it seems from inside.`,
      `The fears you had at twenty-five: most of them were not the thing you should have been afraid of. The things you should have been attentive to were quieter. You were not listening to the quiet things.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('son15EarlierSelf', true) },
  },

]
