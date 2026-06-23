// events_sonder_16.js — Contemplative layer, batch 16
//
// 28 quiet-year prose events across: how a telephone call actually ended,
// the handwriting of someone gone, the recurring dream, phrases you've stopped
// using, Sunday afternoon, the census name vs. the real name, the sound of
// a specific decade, what you do with your hands when you're not doing anything,
// the specific weight of a door you know well, paper — receipts and letters —
// and the small archive of what survives.
//
// All weight 2, mem-gated, no choices, minimal stat effects.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_16 = [

  // ── THE TELEPHONE ────────────────────────────────────────────────────────────

  {
    id: 's16_phone_call_ending',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 40 && !G.mem?.s16PhoneCallEnding,
    text: pick([
      `At the end of a telephone call there is a particular small performance: the wind-down, the mutual signal that it is ending, the false goodbyes before the real one. You have done this thousands of times and it has never become easy — the goodbye is always slightly awkward, always faintly asymmetrical, always concluded by someone hanging up first.`,
      `You say goodbye on the phone and then wait a half-second to make sure the call has ended before you speak. This is a habit from the era of uncertain connections, of lines that did not always terminate cleanly. The habit has outlasted the technology that produced it.`,
      `A phone call with your mother takes a specific shape: the real information in the first five minutes, the longer middle section that is mostly company, the long negotiation of goodbye at the end. You know this shape. You have always known it. When she is gone you will reconstruct these calls from memory with surprising accuracy.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16PhoneCallEnding', true) },
  },

  {
    id: 's16_long_distance_call',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 45 && G.currentYear <= 2000 && !G.mem?.s16LongDistanceCall,
    text: pick([
      `The long-distance call. There was a time when the money in it was constant — the meter running, the awareness that each minute was a cost to be weighed against the conversation's content. You spoke faster. You got to the point. The brevity was a form of love: I will not waste your money on unnecessary words.`,
      `Long distance cost money and so the calls were short and purposeful. You said the necessary thing and then you said goodbye. The letter was for everything else. The fact that this is gone — that distance is now free — has changed something about the texture of contact that is hard to name precisely.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16LongDistanceCall', true) },
  },

  // ── HANDWRITING ───────────────────────────────────────────────────────────────

  {
    id: 's16_handwriting_of_the_dead',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.age >= 40 &&
      (G.flags.has('mother_died') || G.flags.has('father_died') || G.flags.has('friend_died')) &&
      !G.mem?.s16HandwritingDead,
    text: pick([
      `You find a note in their handwriting — a grocery list, a card, something unremarkable at the time of writing and now entirely remarkable. The handwriting is more their presence than the photograph. The photograph captures an exterior. The handwriting is them making a decision about where to place their pen.`,
      `The handwriting survives. A note stuck to the back of something, a name in the front of a book. You know this handwriting better than you realised — you have been reading it your entire life, and it is only now that you can see what it cost them to write, the specific way the pen went down.`,
      `There is a box that has letters in it. You have not opened it yet. You know what the handwriting looks like. You will open it, eventually, when you are ready to hold that specific presence without being overwhelmed by it. Not yet.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s16HandwritingDead', true) },
  },

  {
    id: 's16_own_handwriting',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s16OwnHandwriting,
    text: pick([
      `You rarely write by hand anymore and when you do it surprises you — the way the pen sits in your fingers, the specific look of letters formed by hand, the fact that your handwriting is still yours and has not changed in twenty years. The hand remembers what the mind has largely delegated to keyboards.`,
      `You sign something and look at your signature and think: this is the mark I make. You have made it thousands of times. It remains personal in a way that typed text never is — something that is specifically and only you, irreducible.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16OwnHandwriting', true) },
  },

  // ── THE RECURRING DREAM ───────────────────────────────────────────────────────

  {
    id: 's16_recurring_dream',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s16RecurringDream,
    text: pick([
      `You have a recurring dream — not every week, but often enough that you know its geography. A building with rooms that extend further than the building should allow. A street that keeps turning. A figure at a specific distance who does not come closer. The dream is not frightening. It is just persistent. You have stopped asking what it means.`,
      `In the recurring dream you are late for something and cannot get there. The obstacle changes — the transport, the road, the geography — but the lateness is always the same. You have had this dream for twenty years. You suspect you will have it for twenty more.`,
      `You return in dreams to a place you have never been in waking life — a room, a garden, a coast. You know its layout better than rooms you have lived in. The familiarity is not threatening. It is comfortable, almost. A place that belongs to you in the specific economy of sleep.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16RecurringDream', true) },
  },

  // ── PHRASES ───────────────────────────────────────────────────────────────────

  {
    id: 's16_phrase_stopped_using',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s16PhraseStoppedUsing,
    text: pick([
      `There is a phrase you stopped using at some point — a word from childhood, an expression from a particular era of your life — and you cannot remember stopping. It was in your mouth for years and then it wasn't. Language sheds things like this, quietly, without notice.`,
      `You catch yourself about to say something your mother said, or your grandmother said, a phrase from that world that you absorbed without intending to. You say it or you don't say it. Either way, you've noticed the lineage — the specific way language moves through generations like furniture, without anyone deciding to pass it on.`,
      `You use a word that nobody under thirty uses anymore. The word is not wrong, it is just dated, and the dating marks you — places you in a decade the way a song does, makes audible what you are made of. Language is biography.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16PhraseStoppedUsing', true) },
  },

  // ── SUNDAY AFTERNOON ─────────────────────────────────────────────────────────

  {
    id: 's16_sunday_afternoon',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s16SundayAfternoon,
    text: pick([
      `Sunday afternoon has a specific quality that no other time of the week has. The particular light of it, the particular sense of time running toward something — the week's resumption — without having reached it yet. You have spent many hours in this light without knowing what to do with them, which may be exactly what Sunday afternoon is for.`,
      `Three o'clock on Sunday. The day's plans, if there were any, have been completed or abandoned. What remains is an afternoon with no particular shape. You have never managed to fill this time with anything that feels adequate to it. The feeling of Sunday at three is its own complete experience.`,
      `The Sunday afternoon of childhood was different from the Sunday afternoon of adulthood. Something about the quality of the hours, the way the light feels — expectant, slightly melancholy, entirely familiar. The specific weight of unstructured time. You carry it differently now but the feeling has the same floor.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16SundayAfternoon', true) },
  },

  // ── THE CENSUS ────────────────────────────────────────────────────────────────

  {
    id: 's16_census_name',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.s16CensusName,
    text: pick([
      `On official forms you are a category. The category is accurate and also reductive — it covers you and does not cover you simultaneously. The bureaucracy does not have a field for the particular quality of what you are. It has the nearest available box, which you check.`,
      `Your name on official documents is a decision someone made about how to fit your name into a system designed for different names. The spelling, the truncation, the removal of the accent — these are small violences that the form was not designed to register as violations. They are not. They are just the form.`,
      `There is the name you are called by and the name on your documents. They may be the same name. They may not be. Either way, the official self and the actual self have a relationship that requires some translation — a learned habit of moving between the version of you that gets filed and the version of you that lives.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16CensusName', true) },
  },

  // ── THE SOUND OF A DECADE ─────────────────────────────────────────────────────

  {
    id: 's16_sound_of_decade',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s16SoundOfDecade,
    text: pick([
      `The sounds that place you in a decade are not the songs — it is the ambient sounds: the particular tone of a dial-up modem, the click of a camera shutter before cameras went silent, the specific quality of a television turning on in a certain era. These sounds are time. Hearing them is involuntary recall.`,
      `A specific ringtone that was everywhere for three years and then was gone. A sound effect in a game. The mechanical feedback of a keyboard that no longer exists. The archive of a decade is mostly sound, and sound is not stored where you can access it on purpose — only when something triggers it.`,
      `There are sounds from your childhood that no longer exist in the world — sounds specific to machinery that has been replaced, to technology that has been discontinued. The children who will never hear them will not know what they're missing. That's the nature of what gets lost.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16SoundOfDecade', true) },
  },

  // ── WHAT YOUR HANDS DO ────────────────────────────────────────────────────────

  {
    id: 's16_hands_idle',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s16HandsIdle,
    text: pick([
      `When you are not doing anything in particular, your hands do something. A specific gesture, a tapping pattern, a way of holding them that is yours and has always been yours. You do not choose it. Your hands choose it. You have been watching your hands do this for thirty years and you do not know when it started.`,
      `You notice your hands in conversation — the specific gestures, the placement, the things your hands say while your mouth is saying something else. A therapist might have something to say about the relationship between the two. You just observe it.`,
      `Your left hand and your right hand have different habits. The dominant one knows what it is for. The other one improvises — fidgets, holds, hovers. You are ambidextrous in this specific way: one hand performs, the other one lives.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16HandsIdle', true) },
  },

  // ── THE DOOR ──────────────────────────────────────────────────────────────────

  {
    id: 's16_the_door',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s16TheDoor,
    text: pick([
      `There is a door you have opened and closed more times than you can count — the front door of a place you lived for years, the office door, the door of a house that was someone else's but felt like yours. You know the specific weight of it, the sound it makes, whether it swings or sticks. When the place is gone, you will be surprised by how much you miss the door.`,
      `The door of the place where you grew up has a specific sound. You could identify it in the dark. The sound is the sound of returning — not the place itself but the specific announcement of return. You have been hearing that sound your whole life and it will not survive the house.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16TheDoor', true) },
  },

  // ── RECEIPTS AND PAPER ────────────────────────────────────────────────────────

  {
    id: 's16_receipts',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s16Receipts,
    text: pick([
      `You have a drawer or a pocket or a wallet that accumulates receipts. The receipts are a kind of diary — the small transactions of a life, the coffee on a specific Tuesday, the medication bought in a specific month. Nobody reads these. They are a record for no one, made automatically, accumulating until someone throws them away.`,
      `The paper that passes through a life is enormous. Bills, letters, forms, junk. Most of it is not kept. Some of it is kept and then lost. A very small portion survives and becomes the archive — the things that were not important at the time and became, somehow, the record of what the time was.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16Receipts', true) },
  },

  // ── THE CLOCK ─────────────────────────────────────────────────────────────────

  {
    id: 's16_clocks',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s16Clocks,
    text: pick([
      `At some point you started knowing what time it is without checking. Not exactly — within fifteen minutes, which is close enough for most purposes. The body has a clock. You did not install it. It simply arrived, or revealed itself, at an age when you started to notice the passage of time as something you were inside of rather than watching.`,
      `You check the time less than you used to and know it more. The phone that once answered this question constantly has become less necessary. You are not sure when this happened. The clock in your body is quieter and more accurate than the clock you used to consult.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16Clocks', true) },
  },

  // ── SOMETHING FIXED ───────────────────────────────────────────────────────────

  {
    id: 's16_what_got_fixed',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s16WhatGotFixed,
    text: pick([
      `There is a thing you spent years on — a quality you wanted to change, a problem you set out to solve in yourself — and at some point you noticed it was better. Not gone, not healed in any clean sense. Better. The work that you were doing without always being aware you were doing it produced something. The specific thing that changed is not the same thing you were targeting. That is also usually how it works.`,
      `Something you were anxious about for years stopped mattering. Not because the circumstances changed — because you changed, or exhausted the anxiety, or it simply ran out. You did not plan this. It happened the way sleep comes: without deciding to.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s16WhatGotFixed', true) },
  },

  // ── NUMBERS ───────────────────────────────────────────────────────────────────

  {
    id: 's16_numbers_you_know',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.s16NumbersYouKnow,
    text: pick([
      `You still know telephone numbers that no longer connect to anyone — a home number from childhood, a number from a relationship that ended, a number you dialed so many times the muscle memory is in your fingers before the mind has decided. These numbers will die with you. You are the last place they live.`,
      `Your own phone number is the number you know least well. You have to look it up. But the number of the first apartment, the number of the doctor you saw as a child, the number of a person you have not spoken to in fifteen years — these you have.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s16NumbersYouKnow', true) },
  },

  // ── LIGHT ─────────────────────────────────────────────────────────────────────

  {
    id: 's16_light_of_a_place',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s16LightOfPlace,
    text: pick([
      `Every place has a specific quality of light. Not the weather — the light. The specific angle at which the sun comes into a room at a certain hour in a certain season. You have been in enough rooms to know this is not universal: the light here is different from the light somewhere else, and both are different from the light of where you were as a child.`,
      `The light of a particular afternoon from a particular time in your life returns without warning — attached to nothing, a quality of illumination that your body recognizes from years ago. Autumn light, or winter morning light, or the specific yellow of a certain kind of lamp in a room that no longer exists. The light is the most persistent part of what a place was.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16LightOfPlace', true) },
  },

  // ── PHOTOGRAPHS AGAIN ─────────────────────────────────────────────────────────

  {
    id: 's16_photograph_of_yourself',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && !G.mem?.s16PhotographOfSelf,
    text: pick([
      `You look at a photograph of yourself from fifteen years ago and you see someone who thought they were older than they were. The face is young — undeniably young — and the person in it did not know that. You cannot convey this to them. The knowledge comes only from the other side of the years.`,
      `A photograph from a decade you remember as difficult. The face in it does not look difficult. It looks like someone getting through a day. You had thought you looked worse at the time. The external record says something different from the internal one, and you do not know which one to trust.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s16PhotographOfSelf', true) },
  },

  // ── THE COMMUTE AGAIN (DIFFERENT REGISTER) ────────────────────────────────────

  {
    id: 's16_journey_repeated',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s16JourneyRepeated,
    text: pick([
      `You have made this journey hundreds of times — the same road, the same stops, the same sequence of landmarks. At some point in the hundreds of repetitions, the journey became automatic: you arrive without having decided to navigate. The route is inside you. You have not so much memorised it as become it.`,
      `On a journey you have made so many times it requires no attention, you suddenly see something you have never noticed. A sign. A building. A tree that must have been there for years. The fact that you missed it for this long is information about how perception works — the familiar becomes invisible, which means you have been moving through a world you were not fully seeing.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16JourneyRepeated', true) },
  },

  // ── THE LATE-LIFE GIFT ────────────────────────────────────────────────────────

  {
    id: 's16_late_gift',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s16LateGift,
    text: pick([
      `Something unexpected at this age: you are less afraid than you were. Not fearless — the fear has not gone — but the specific grip of it has loosened. This is not wisdom and it is not acceptance. It is something closer to fatigue: you have been afraid long enough that the fear has become ordinary, and ordinary things require less management.`,
      `You have developed, late, a tolerance for not knowing. For years the uncertainty was something to resolve. Now you can sit in it for longer without it becoming intolerable. This is not philosophy. It is just what happened, in the way things happen — not through effort, but through accumulation.`,
      `You have become, at this age, more interested in specifics and less interested in categories. The category of the situation matters less than the actual situation. The general principle interests you less than the particular person. This is the gift, if there is one: that things become more themselves to you rather than less.`,
    ]),
    choices: null,
    effect: (p) => { p.e += 2; p.m += 2; p.setMem('s16LateGift', true) },
  },

  // ── THE THING ON THE SHELF ────────────────────────────────────────────────────

  {
    id: 's16_thing_on_shelf',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s16ThingOnShelf,
    text: pick([
      `There is an object on the shelf that has been on the shelf for as long as you can remember and that you have never moved. You do not move it when you clean. It is not decorative — or it is decorative in the way that things become decorative through duration: by being there long enough that removing them would feel like an edit of something important. You don't know where it came from. You never will.`,
      `The things on your shelves include objects you chose and objects that arrived — gifts, found things, objects that belonged to someone else and migrated. The objects you chose say something about who you thought you were when you chose them. The objects that arrived say something about who other people thought you were. Neither set is wrong.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16ThingOnShelf', true) },
  },

  // ── THE IMMIGRANT PHONE CALL ──────────────────────────────────────────────────

  {
    id: 's16_emigrant_call_home',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.flags.has('emigrated') &&
      G.age >= 22 && G.age <= 50 &&
      !G.mem?.s16EmigrantCallHome,
    text: pick([
      `The call home is a specific ritual. You dial at the time you have agreed on — accounting for the time difference, which you now calculate automatically — and you hear the room they are in: the television, a chair scraping, the quality of sound in a house that is not where you are. The call is fifteen minutes or an hour. Either way it is a thread back through the distance.`,
      `You describe your life to someone who cannot see it and they describe theirs to you and neither description is adequate to the thing. But the contact is the point — not the accuracy of the picture, just the voice over the distance, still there.`,
      `After you hang up there is a specific feeling that lasts for the rest of the evening. Not sadness exactly — not longing exactly. Something that has no name in either language, the particular weight of being far from something that still claims you.`,
    ]),
    choices: null,
    effect: (p) => { p.m -= 3; p.r += 3; p.setMem('s16EmigrantCallHome', true) },
  },

  // ── WHAT THE BODY REMEMBERS ───────────────────────────────────────────────────

  {
    id: 's16_body_memory',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 36 && !G.mem?.s16BodyMemory,
    text: pick([
      `You are doing something physical — a movement, a task, a skill — and you notice that your body knows how without your mind's participation. The body learned this years ago and retained it without being asked. Muscle memory, yes, but also something richer: a kind of competence that lives below language, that could not be described before it is demonstrated.`,
      `Something triggers a physical memory — a smell, a texture, a posture your body recognises. The memory is not visual. It is kinetic: the specific sensation of a time and place, something the body has kept that the mind has let go. The body is a better archive than you knew.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16BodyMemory', true) },
  },

  // ── THE SPECIFIC NOTHING ──────────────────────────────────────────────────────

  {
    id: 's16_doing_nothing',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s16DoingNothing,
    text: pick([
      `You are doing nothing. Not waiting for something — nothing. Sitting in a chair without a purpose. This was impossible for years: the stillness was immediately colonised by a task, a screen, a worry. At this age it is simply available. You can sit in a chair and be in the chair. This is not enlightenment. It is just time, which you finally have enough of to spend some of it on nothing.`,
      `There is a quality of presence in doing nothing that you did not have access to at forty. The nothing is full — not empty, not bored. Just present to what the afternoon actually is, which is a quiet room and enough time and no particular requirement. You are not sure when this became available. You are glad it is.`,
    ]),
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s16DoingNothing', true) },
  },

  // ── THE WEATHER ───────────────────────────────────────────────────────────────

  {
    id: 's16_weather_relationship',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s16WeatherRelationship,
    text: pick([
      `You have a relationship with a particular kind of weather — not the weather generally, but a specific condition: the first real cold of autumn, or the quality of light in a rainstorm, or the smell before a summer storm. The relationship is old. It was established in childhood, when a type of weather meant something, and it has persisted long after the thing it originally meant has gone.`,
      `The weather of where you grew up is the weather your body expects. Other climates are interesting, tolerable, sometimes preferred — but they require adjustment. The body orients itself toward the original weather the way a plant orients toward light: without deciding, just doing what the system does.`,
    ]),
    choices: null,
    effect: (p) => { p.setMem('s16WeatherRelationship', true) },
  },

  // ── THE YEAR THAT BLURS ───────────────────────────────────────────────────────

  {
    id: 's16_year_that_blurs',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 64 && !G.mem?.s16YearThatBlurs,
    text: pick([
      `At some point the years started coming faster. Not because less is happening — the events are still there — but because the years no longer have the texture that made them distinct. A decade that was entirely legible at the time has become, in memory, a single shape: the job, the house, the people. The specific sequence within it has softened. This is not failure of memory. It is just what decades become.`,
      `You cannot remember what year something happened. You remember the order of things and their quality, but not the year. The year requires counting backward from something anchored — the birth of a child, a move, a death — and even then it is approximate. The calendar was always a fiction imposed on a continuous experience. Time has stopped pretending otherwise.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s16YearThatBlurs', true) },
  },

  // ── THE LAST TIME ─────────────────────────────────────────────────────────────

  {
    id: 's16_last_time',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.s16LastTime,
    text: pick([
      `There are things you have done for the last time without knowing they were the last time. The last time you ran. The last time you saw a person who died afterward. The last time you were in a place that no longer exists. The last time of most things is not marked. You only know it retroactively, if you know it at all.`,
      `You have started, at this age, to notice lasts. Not morbidly — just with attention. The last long-haul flight, if that is what it was. The last time you lifted something heavy. The things that are becoming too hard are also becoming last times, and you are present to this in a way that is neither distressing nor resigned. It is just accurate.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s16LastTime', true) },
  },

  // ── THE SPECIFIC NAME ─────────────────────────────────────────────────────────

  {
    id: 's16_what_they_called_you',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 65 &&
      (G.flags.has('mother_died') || G.flags.has('father_died')) &&
      !G.mem?.s16WhatTheyCalledYou,
    text: pick([
      `There is a name only one person ever called you — a nickname from childhood, a version of your name that existed only in their mouth. Nobody else used it. With them gone, nobody uses it. The name died when they did, and you did not know you were going to miss it this specifically.`,
      `The way they said your name. You cannot reproduce it. Nobody else pronounced it that way — the specific weight they gave it, the tone that meant they were talking to you and nobody else. This is among the things that are now only yours to remember, which means when you go, that version of your name goes too.`,
    ]),
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s16WhatTheyCalledYou', true) },
  },

]
