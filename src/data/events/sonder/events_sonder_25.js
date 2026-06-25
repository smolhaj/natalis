// events_sonder_25.js
// Contemplative layer: 28 events. No choices, no new flags, weight 2, mem-gated.
// Themes: the waiting room, things stopped without announcement, the shape of a decade,
// what handwriting becomes, the path walked daily, other people's grief, the view from
// the window at work, internal narrative of beginning, what the children know that you don't,
// the birthday without ceremony, medical vocabulary entering a life, and more.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const EVENTS_SONDER_25 = [

  // ── THE WAITING ROOM ──────────────────────────────────────────────────────

  {
    id: 'sdr25_waiting_room',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sdr25WaitingRoom,
    text: pick([
      'The waiting room: the arrangement of chairs that assumes nothing about the people in them. Everyone here is waiting for something to be decided. You sit with that.',
      'Hospital waiting rooms teach you something about time that calendars don\'t. The hour between calling your name and calling your name again.',
      'The office waiting room, the clinic waiting room, the government waiting room — they have the same furniture and the same quality of light and the same instruction not to make eye contact.',
      'You have spent a measurable portion of your life in waiting rooms. The magazine from three months ago. The number being called that is not your number. The ceiling tile you count.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25WaitingRoom', true) },
  },

  // ── THINGS STOPPED WITHOUT ANNOUNCEMENT ──────────────────────────────────

  {
    id: 'sdr25_things_stopped',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sdr25ThingsStopped,
    text: pick([
      'You used to do something — run, or cook elaborate meals, or write letters, or call a particular person every Sunday — and then you stopped. There was no decision. One day it just wasn\'t happening anymore.',
      'Some habits end with an event: the last run before the injury, the last letter before they died. Others end without one. They simply stop, and you notice only later that they have.',
      'The things you stopped doing: there is no inventory. You only encounter them when something reminds you — a smell, a season, a particular kind of afternoon — and then you think: I used to do that.',
      'Not all endings are named. Some things just become the past without being concluded first.',
    ]),
    choices: null,
    effect: (p) => { p.m -= 1; p.r += 1; p.setMem('sdr25ThingsStopped', true) },
  },

  // ── THE SHAPE OF A DECADE ─────────────────────────────────────────────────

  {
    id: 'sdr25_shape_of_decade',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr25DecadeShape,
    text: pick([
      'A decade only has a shape from outside it. Inside, it is individual years. From the outside: a decade is the period when this happened, before that started, while the children were small.',
      'The decade you are in now will be named later for something that hasn\'t happened yet or hasn\'t been identified yet as the thing that names it. You are inside the naming period, not after it.',
      'You can look back and say: that decade was about building, or leaving, or surviving, or becoming. The summary arrives after. The living of it had no such clarity.',
      'The previous decade looks simple from this side. You know this is not accurate. You remember the confusion. The pattern became visible on exit.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25DecadeShape', true) },
  },

  // ── WHAT YOUR HANDWRITING BECAME ─────────────────────────────────────────

  {
    id: 'sdr25_handwriting',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sdr25Handwriting,
    text: pick([
      'Your handwriting is nothing like what you were taught. The loops went away. The letters got faster and smaller. You can still read it. No one else easily can.',
      'There is a version of your handwriting that existed before screens — careful, practiced, the version that appeared in formal documents. You cannot reliably produce it anymore.',
      'You sign your name many times a day without thinking about what the signature is. It used to be letters. It became a shape. The shape is still yours.',
      'The handwriting practice workbooks: the same letter, line after line, the same pressure, the same angle. The adult handwriting that resulted from none of that and all of it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25Handwriting', true) },
  },

  // ── THE DAILY PATH ────────────────────────────────────────────────────────

  {
    id: 'sdr25_daily_path',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sdr25DailyPath,
    text: pick([
      'The walk you take every day. You know it well enough that your mind can go elsewhere while your body takes you. Then one day something changes — a scaffold, a new shop, a closed one — and you return to paying attention.',
      'There is a route you have walked so many times that you know which pavement stones are uneven, where the dog is usually tied, what the smell is at the bakery corner on weekday mornings.',
      'You have walked the same path enough times that your body knows it. Not thinks about it — knows it, the way the body knows things, in the feet and the turning before you think to turn.',
      'The daily route: the version that exists in your body versus the version that exists in any map. They are not exactly the same place.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25DailyPath', true) },
  },

  // ── OTHER PEOPLE'S GRIEF ──────────────────────────────────────────────────

  {
    id: 'sdr25_others_grief',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sdr25OthersGrief,
    text: pick([
      'Watching someone else grieve: the specific discomfort of being the witness. The inadequacy of everything you might say. The way you keep saying it anyway.',
      'You have sat with someone while they were in their grief, not in yours. There is a different kind of attending required. You had to learn it.',
      'Other people\'s grief comes in at an angle that yours does not. You can see it from the outside, which is both useful and the thing that makes it harder to help.',
      'The look of grief on someone you love: the face you know doing something with itself you hadn\'t seen it do. You filed that away without knowing you were filing.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25OthersGrief', true) },
  },

  // ── THE VIEW FROM THE WINDOW AT WORK ─────────────────────────────────────

  {
    id: 'sdr25_work_window',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sdr25WorkWindow,
    text: pick([
      'The view from the window at work: you have watched the tree across the street in every season, the same patch of sky through several years, the people who use the bench below.',
      'There is a view you have seen more than almost any other view — from a window at your workplace, facing in a direction you didn\'t choose. You know it completely without having decided to learn it.',
      'The window you face at work changes with the season in ways you registered without realizing. The angle of the light in January versus June. The same rooftop in rain and sun.',
      'A view you have looked at for years without looking at: it is still completely recognizable when you finally pay attention. The body had been taking it in the whole time.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25WorkWindow', true) },
  },

  // ── WHAT YOU TELL YOURSELF AT THE START ──────────────────────────────────

  {
    id: 'sdr25_starting_self_talk',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sdr25StartTalk,
    text: pick([
      'What you say to yourself when you are about to start something hard: the same phrase, or the same breath, or the same sequence of small actions. You had not noticed it was a ritual until someone pointed it out.',
      'There is an internal sentence you use to begin difficult things. It arrived at some point. You don\'t remember deciding to use it. It is just there, at the threshold, waiting.',
      'The pre-task ceremony: the specific cup of tea, the cleared desk, the three minutes of doing nothing, the arrangement of things. It has logic. You don\'t know what the logic is. It works.',
      'You have noticed that you approach certain kinds of work the same way every time. Not a decision — a groove. The groove precedes the thinking.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25StartTalk', true) },
  },

  // ── WHAT THE CHILDREN KNOW THAT YOU DON'T ────────────────────────────────

  {
    id: 'sdr25_children_know',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.children && G.children.length > 0 && !G.mem?.sdr25ChildKnow,
    text: pick([
      'Your child knows something you don\'t — a technology, a reference, a platform, a fact about the world that is simply part of their landscape. You encountered this gradually and then it became ordinary.',
      'There is a reversal that happens with children, at some point: you stop knowing everything they need to know and they start knowing things you need to ask them about.',
      'They move through the current world with a fluency you observe from slightly outside it. Not that you are incompetent — you function — but you function with something they don\'t need: the awareness of functioning.',
      'The competence your child has, at an age when you were fumbling with something you can no longer remember needing to learn: this is one of the small disorienting pleasures of watching a person grow.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25ChildKnow', true) },
  },

  // ── THE BIRTHDAY WITHOUT CEREMONY ─────────────────────────────────────────

  {
    id: 'sdr25_uncelebrated_birthday',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr25UncelebBday,
    text: pick([
      'There have been birthdays that passed without being marked. Not forgotten exactly — just absorbed into a Tuesday. You noted them internally and went to work.',
      'At some age the birthday stopped requiring ceremony. This was a loss and also a relief, and the proportions of each depended on the year.',
      'The birthday you spent alone, or working, or ill: it was still your birthday. The day was still distinct, internally, even when nothing marked it externally.',
      'You remember some birthdays precisely and others not at all. The ones you remember are not always the ones where the most happened.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25UncelebBday', true) },
  },

  // ── MEDICAL VOCABULARY ENTERING A LIFE ───────────────────────────────────

  {
    id: 'sdr25_medical_vocabulary',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.sdr25MedVocab,
    text: pick([
      'At some point the words of clinical medicine became familiar words. Not because you studied them — because they kept arriving in conversations about your own body or the bodies of people you love.',
      'The vocabulary of a condition: you learned it the way you learn the vocabulary of a city you moved to. Gradually, by necessity, until you were fluent without noticing the acquisition.',
      'There are words you now understand that you did not know existed fifteen years ago. The knowledge arrived through need. You would have preferred not to need it.',
      'Diagnosis language: the first time you heard it you did not understand it. Now you use it, almost casually, in conversations with doctors and pharmacists. The fluency came from somewhere.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25MedVocab', true) },
  },

  // ── WHAT SELF-TEACHING FELT LIKE ─────────────────────────────────────────

  {
    id: 'sdr25_self_taught',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sdr25SelfTaught,
    text: pick([
      'Something you taught yourself: a skill that arrived through trying and failing and trying again, with no teacher, no curriculum, just the thing and your repeated attempt at it.',
      'The self-taught thing has a different texture to it than the formally taught thing. You know exactly where the gaps are, because you are the one who taught around them.',
      'There is a skill you have that you got by doing it badly for a long time, in private, without being assessed. The confidence it gave you is different from any other confidence you have.',
      'No one taught you this. That is not a boast — it is a description of a method. The method involved a lot of being wrong before you were less wrong.',
    ]),
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('sdr25SelfTaught', true) },
  },

  // ── THE AFTERNOON LIGHT ───────────────────────────────────────────────────

  {
    id: 'sdr25_afternoon_light',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sdr25AfternoonLight,
    text: pick([
      'The light at a specific afternoon hour — not the golden hour, not the harsh midday: something in between, the light that falls into rooms at an angle you associate with the mid-afternoon of your childhood.',
      'There is a quality of light that appears for a few weeks in a particular season and then is gone for a year. You notice it every time. It arrives with a feeling you cannot name.',
      'The afternoon light through a specific window: it exists for perhaps thirty minutes a day, at a particular time, in a particular season. You have seen it enough times to recognize its colour.',
      'Light changes over the day and the year and you mostly ignore it, except at the moments when it does something specific — angles through something, catches something — and you stop.',
    ]),
    choices: null,
    effect: (p) => { p.m += 1; p.setMem('sdr25AfternoonLight', true) },
  },

  // ── THE NEIGHBOR'S SOUNDS ─────────────────────────────────────────────────

  {
    id: 'sdr25_neighbor_sounds',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && !G.mem?.sdr25NeighborSound,
    text: pick([
      'You know the sounds of the people who live through the wall from you: what time they wake, when the television goes on, whether there is arguing this week. You know them better than they know you know them.',
      'The neighbor whose schedule you know without having learned it. The alarm, the footsteps, the drawer that sticks, the particular sound of their kettle. The involuntary intimacy of shared walls.',
      'Through the ceiling you hear someone moving, living their day — furniture scraping, the occasional voice, the pattern of their waking hours. You know this life in the way acoustics teach you, not words.',
      'The neighbor who has been there longer than you: you know the sounds of their daily life without knowing their name in some cases. An intimacy that lives entirely in sound.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25NeighborSound', true) },
  },

  // ── MONEY IN THE HAND ─────────────────────────────────────────────────────

  {
    id: 'sdr25_physical_money',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sdr25PhysMoney,
    text: pick([
      'You can remember what a specific amount of money used to feel like to hold — not a large amount, a specific amount that had weight when you were young and means something different now.',
      'The first time you held an amount of money that felt like something: you know the denomination, the occasion, the feeling in the hand. The feeling has changed with the amount many times since.',
      'Physical money has a different quality than numbers on a screen. You count it differently. You lose it differently. You find it in coat pockets and it is slightly surprising in a way that a number never is.',
      'Counting out coins for something you couldn\'t otherwise afford: the particular attention that requires, the exactness. Later this becomes a memory with a specific texture.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25PhysMoney', true) },
  },

  // ── THE RECIPE FROM MEMORY ────────────────────────────────────────────────

  {
    id: 'sdr25_recipe_from_memory',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sdr25RecipeMemory,
    text: pick([
      'There is a dish you make from memory that you did not learn from a recipe. You learned it by watching, by smell, by eating it enough times that the making is somewhere in the body, not the mind.',
      'The recipe your mother made without a recipe: you tried to reconstruct it once, by memory and by taste. It is close. It is not the same. The difference is in something you cannot name or replicate.',
      'Food memory: the dish that means a specific person, a specific place, a specific period. You can eat something like it in restaurants but the thing it means is not transferable.',
      'You make a dish the way you remember it being made, which is approximate. The approximation is yours now. The original is gone with the person who made it.',
    ]),
    choices: null,
    effect: (p) => { p.m += 1; p.setMem('sdr25RecipeMemory', true) },
  },

  // ── WHAT 3AM SOUNDS LIKE ─────────────────────────────────────────────────

  {
    id: 'sdr25_three_am_city',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && !G.mem?.sdr25ThreeAm,
    text: pick([
      'The city at 3am: the sound of a city that has not gone silent but has gone sparse. Traffic exists but differently. The quality of quiet between sounds is different from daytime quiet.',
      'There is a version of your city that only exists between 2 and 4 in the morning. You know it from the occasions you were awake in it — ill, or anxious, or young and out.',
      '3am: the city is not asleep exactly. It is in a different mode. The cleaning trucks, the lights in certain windows, the different population that uses the street at this hour.',
      'You have heard the city at its quietest hours — the train that doesn\'t come for hours, the voice carrying from two blocks away, the rain on pavement with nothing to compete with it.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25ThreeAm', true) },
  },

  // ── THE SIGNATURE ─────────────────────────────────────────────────────────

  {
    id: 'sdr25_signature',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sdr25Signature,
    text: pick([
      'Your signature is something you produce without thinking. At some point it stopped being your name and became a shape. The shape is still recognizably yours. It contains only traces of the letters it started as.',
      'The first time you had to sign something important, you were aware of the signature. Later you stopped being aware. The unawareness is a kind of mastery and also a kind of loss.',
      'A signature is also a performance of identity, at some minimal level — you are attesting that this shape means you. What the shape has become over time was not designed.',
      'You have signed your name hundreds of times on forms and documents and cards. What it looks like now, compared to what it looked like at the beginning: a different person made the earlier ones.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25Signature', true) },
  },

  // ── LEARNING SOMETHING TOO LATE ───────────────────────────────────────────

  {
    id: 'sdr25_learned_too_late',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.sdr25LearnedLatent,
    text: pick([
      'There is a thing you learned that arrived too late to use in the way it would have been most useful. You use it now, but differently, without the context it was made for.',
      'You learned something after the person who might have helped you most was gone. The knowledge arrived and there was nowhere to take it.',
      'The thing you didn\'t know when you needed it, that you know now: this is a different thing from the thing you didn\'t know when you didn\'t know you needed it.',
      'Later knowledge: the things you understood in retrospect that would have changed the decisions, if you had understood them in time. They arrived as explanations, not solutions.',
    ]),
    choices: null,
    effect: (p) => { p.r += 1; p.setMem('sdr25LearnedLatent', true) },
  },

  // ── THE COLLEAGUE YOU WON'T SEE AGAIN ─────────────────────────────────────

  {
    id: 'sdr25_colleague_gone',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sdr25ColleagueGone,
    text: pick([
      'There are people you spent years of your days with — five or eight or twelve years, five days a week, the majority of your waking hours — who you have not seen since you left that job. The intimacy is strange in retrospect.',
      'You knew a colleague\'s coffee order, their children\'s names, what they sounded like when they were stressed, the quality of their work, their ambitions — and then you both moved on and they are now a distant memory in someone else\'s life.',
      'The colleague who became a friend for the duration of that period and then didn\'t make the transition past it. Not a falling out — just the way work friendships work, which is that they live inside the work.',
      'Someone you sat near for years: the sound of their typing, their particular laugh, their daily habits. You could describe them exactly in that context. Outside of it you had almost nothing in common.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25ColleagueGone', true) },
  },

  // ── THE TOWN YOU'RE FROM ──────────────────────────────────────────────────

  {
    id: 'sdr25_hometown_change',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.sdr25Hometown,
    text: pick([
      'The place you grew up in has changed. Not unrecognizably — there is still the street, the building, the general layout — but the shops are different, the atmosphere is different, the people are different. Your knowledge of it is historical.',
      'When you return to the place you grew up, you move through a double image: the place as it is and the place as it was. The two overlap imperfectly.',
      'Other people grew up in your town after you left. They have memories of it you do not have. They know it in a way you don\'t anymore. The town you know is a different town than the one that exists.',
      'You can say where you are from and that tells someone something, but the thing it tells them is not necessarily what you know. What you know is older than the current version.',
    ]),
    choices: null,
    effect: (p) => { p.r += 1; p.setMem('sdr25Hometown', true) },
  },

  // ── WHAT AGE LOOKS LIKE ON PEOPLE YOU LOVE ────────────────────────────────

  {
    id: 'sdr25_age_on_loved_ones',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.sdr25AgeLoved,
    text: pick([
      'The face of someone you love, aging: you watch it closely enough that you do not notice the increments. Then a photograph from five years ago. The increment is there in the photograph.',
      'You see people you love changing over time in a way you cannot see yourself changing. The aging that is invisible to the self is visible to others. They have the same view of you.',
      'Your parent at the age you are now: you have reached the age where the photographs from their middle life are at your eye level. The resemblance in the photographs is something you could not have predicted.',
      'Watching someone age who you have known long enough to see the beginning and the middle and now more: the continuity of the person across the change is more apparent than the change.',
    ]),
    choices: null,
    effect: (p) => { p.r += 1; p.setMem('sdr25AgeLoved', true) },
  },

  // ── THE JOKE THAT DIDN'T LAND ─────────────────────────────────────────────

  {
    id: 'sdr25_joke_failed',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sdr25JokeFailed,
    text: pick([
      'The joke that landed in silence: the particular quality of that silence, the moment before you understood it had not worked, the adjustment of everything that follows.',
      'There are things you have said that did not land the way you intended them, and you remember exactly: the words, the room, the face that received them, the silence.',
      'The failed joke is its own category of social memory. It is both trivial and slightly permanent. You can recall the room.',
      'You made a joke once, or said something meant to be light, and it wasn\'t. You still have it. The moment replays. This is disproportionate to the magnitude of the thing and also accurate.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25JokeFailed', true) },
  },

  // ── LETTERS NEVER SENT ────────────────────────────────────────────────────

  {
    id: 'sdr25_unsent_letters',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sdr25UnsentLetters,
    text: pick([
      'There are things you composed, in your head or on paper, that were addressed to specific people and never sent. Not because they were wrong, exactly. Because you decided against it.',
      'The letter you wrote and did not send: you might still have it, or you might have destroyed it. Either way, you know what it said. It said something that seemed important enough to write.',
      'The impulse to write to someone arrives sometimes when speaking seems insufficient or impossible. What you compose in that impulse is usually the truest version of what you wanted to say. It rarely gets sent.',
      'You have told someone something in a letter they never read. Not because you stopped meaning it — because the circumstances changed, or the timing was wrong, or because you weren\'t brave enough.',
    ]),
    choices: null,
    effect: (p) => { p.r += 1; p.setMem('sdr25UnsentLetters', true) },
  },

  // ── RAIN ON A PARTICULAR SURFACE ──────────────────────────────────────────

  {
    id: 'sdr25_rain_on_surface',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.sdr25RainSurface,
    text: pick([
      'The sound of rain on a particular surface: corrugated iron, or leaves, or a tin roof, or the window you used to sit by. You carry this specific sound as a sensory record of a place and time.',
      'Rain sounds different depending on what it falls on. You know the specific version from wherever you grew up. The version from other places sounds wrong, slightly, for reasons that are purely biographical.',
      'The rain at a certain kind of window: the pattern of drops on glass, the sound, the particular way the streetlight looked through it. This is stored precisely somewhere.',
      'Some sounds are place-specific in your memory. Rain is one. The version you know best is from a specific roof, a specific window, a specific room.',
    ]),
    choices: null,
    effect: (p) => { p.m += 1; p.setMem('sdr25RainSurface', true) },
  },

  // ── THE GARDEN ────────────────────────────────────────────────────────────

  {
    id: 'sdr25_something_you_tend',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sdr25Garden,
    text: pick([
      'There is something alive that you look after. Not a person — a plant, or a garden, or a tree in a pot on a balcony. You have noticed the seasons through it. It has kept time differently than a calendar.',
      'The plant on the windowsill: it requires water and light and it gives nothing back except the fact of its being alive, which turns out to be enough for what it is doing.',
      'You have killed plants before learning how to not kill them. The survivors are now old enough to be a record. You know when each one arrived and what was happening at the time.',
      'Something you tend: the attention it requires is small and recurrent. It makes the day organised around a small act of care. You notice when you forget to do it.',
    ]),
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('sdr25Garden', true) },
  },

  // ── THE PHONE CALL THAT CHANGED THINGS ────────────────────────────────────

  {
    id: 'sdr25_call_that_changed',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sdr25CallChanged,
    text: pick([
      'There is a phone call you received that changed the period that followed it. Not the news exactly — the phone call as a physical event: where you were, what you were doing, the moment before you answered.',
      'The call comes and then there is a before and after. You know exactly where you were standing. You might still remember what the light was doing.',
      'A phone call that arrived at an ordinary moment and made the moment permanent: the ordinary things around you when you received news that mattered are part of the memory now.',
      'You can remember what you were doing when a particular call came. The task you were in the middle of, the room, the time of day. The news reorganised everything after it, but you can still return to the moment before.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25CallChanged', true) },
  },

  // ── THE CAR THAT'S GONE ───────────────────────────────────────────────────

  {
    id: 'sdr25_car_gone',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sdr25CarGone,
    text: pick([
      'There was a vehicle you drove for years — knew the handling, the sounds that meant things, the specific resistance of the wheel. Then it was gone, and the next one took time to feel like a known quantity.',
      'You remember a specific vehicle from a specific period: where it went, what was heard on the radio in it, who was in the passenger seat. It is a container for that period as much as a car.',
      'The car you drove in your twenties, or the one you inherited, or the first one you bought: it exists now only as memory and photographs. The specific feel of the door, the particular sound of the engine.',
      'A vehicle accumulates history. By the time you give it up there are years of specific associations — the journey where something happened, the long drive where things were said, the day it broke down somewhere specific. The new one has none of that yet.',
    ]),
    choices: null,
    effect: (p) => { p.setMem('sdr25CarGone', true) },
  },

]
