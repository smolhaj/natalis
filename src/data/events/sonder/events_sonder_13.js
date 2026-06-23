// events_sonder_13.js — Contemplative layer, batch 13
// Weight 2, mem-gated, no choices, no meaningful stat effects.
// Pure prose: the texture of a life in the gaps between events.
// Themes: the body at rest, work without witness, the small room,
// threshold moments, what stays after people leave.

export const EVENTS_SONDER_13 = [

  // ── THE BODY AT REST ─────────────────────────────────────────────────────────

  {
    id: 'sonder13_body_rest_1',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sonder13_body_rest_1,
    text: `You sit down and your body makes a small sound of approval. Not pain and not its absence but something between — the recognition that the standing is over for now. You have been doing this for an hour and your body has been waiting for this with a patience that is almost indignant.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_body_rest_1', true) },
  },

  {
    id: 'sonder13_body_rest_2',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.sonder13_body_rest_2,
    text: `The chair has a specific place in the afternoon light. This is where you sit. The light changes at a specific rate and the chair accommodates a specific weight and the two of them together have made something that is not quite comfort and is more than furniture.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_body_rest_2', true) },
  },

  {
    id: 'sonder13_sleeping_body',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sonder13_sleeping_body,
    text: `Your partner is asleep. You can see from here that they are deeply asleep — the quality of the breathing, the specific angle of the face. They are somewhere you cannot reach. You watch them for a moment that is longer than a glance but shorter than the moment that would be odd. Then you go back to what you were doing.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_sleeping_body', true) },
  },

  // ── WORK WITHOUT WITNESS ─────────────────────────────────────────────────────

  {
    id: 'sonder13_work_unseen_1',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonder13_work_unseen_1,
    text: `You do the work carefully and correctly and no one sees you do it. This is most of the work. The quality goes into the thing rather than into the witness of the quality, and the thing is better for it, and you know the thing is better for it, which is its own information but not always sufficient information.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_work_unseen_1', true) },
  },

  {
    id: 'sonder13_work_unseen_2',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sonder13_work_unseen_2,
    text: `The task took two hours and produced something that is correct and will be used by someone who will not know how the correctness was achieved. This is the majority of productive effort: invisible infrastructure of other people's outcomes.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_work_unseen_2', true) },
  },

  {
    id: 'sonder13_done_alone',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.sonder13_done_alone,
    text: `You have done a substantial part of your life's productive work without any audience. The work exists in its outcomes — the things built, the people helped, the documents filed, the care given. The absence of witness is not a failure of the work. It is the nature of work.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_done_alone', true) },
  },

  // ── THE SMALL ROOM ───────────────────────────────────────────────────────────

  {
    id: 'sonder13_room_1',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonder13_room_1,
    text: `The room is small enough that the window matters. In the morning it faces the right way and in the afternoon it does not. You have arranged your life in the room according to the window. This is a small architecture but it is the architecture you have.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_room_1', true) },
  },

  {
    id: 'sonder13_room_2',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonder13_room_2,
    text: `The room has become yours in the way a rented room becomes yours — the specific placement of objects, the route from bed to door memorised in the dark, the smell that is the smell of this room and no other. When you leave it, you will leave this specific version of yourself in it.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_room_2', true) },
  },

  {
    id: 'sonder13_room_empty',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sonder13_room_empty,
    text: `The room that someone lived in has been cleared out. The personal geography — the arrangement of their things in this space — is gone. The room is just a room again. You stand in it for a moment. There is nothing to do in it. You leave.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_room_empty', true) },
  },

  // ── THRESHOLD MOMENTS ────────────────────────────────────────────────────────

  {
    id: 'sonder13_threshold_1',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonder13_threshold_1,
    text: `You are standing at the beginning of something — a job, a relationship, a city — without yet knowing what the beginning is the beginning of. Later you will mark this moment as the start of a particular chapter. Right now you are just standing here, which is all anyone can do at the beginning.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_threshold_1', true) },
  },

  {
    id: 'sonder13_threshold_2',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sonder13_threshold_2,
    text: `The last time you did something. You did not know it was the last time. The thing seemed like it would continue — the regular dinner, the weekly call, the walk to the same place on Sunday — and then it stopped, and the last time receded into the sequence and became invisible, and now you are trying to remember it specifically.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_threshold_2', true) },
  },

  {
    id: 'sonder13_threshold_3',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.sonder13_threshold_3,
    text: `There are things you will do for the last time and not know it is the last time. This is the nature of lasts. The firsts are marked; the lasts dissolve into the unremarkable continuation of things until they stop continuing. The thing you did last Thursday might have been one of them.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_threshold_3', true) },
  },

  // ── WHAT STAYS AFTER PEOPLE LEAVE ────────────────────────────────────────────

  {
    id: 'sonder13_after_leaving_1',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sonder13_after_leaving_1,
    text: `After they left you found the small things — the handwriting on a piece of paper, the object moved to a different shelf, the phrase you have started saying without noticing. People leave deposit in you in forms you do not always recognise as deposit until something jogs the recognition.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_after_leaving_1', true) },
  },

  {
    id: 'sonder13_after_leaving_2',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.sonder13_after_leaving_2,
    text: `The people who have been through your life are in it in specific ways. Not as memories exactly — more as modifications to how you see things, what you find funny, what you cannot abide, which silences you can sit in and which you cannot. You are the accumulation of every person who has sat in your kitchen.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_after_leaving_2', true) },
  },

  {
    id: 'sonder13_after_death',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.sonder13_after_death,
    text: `What remains after someone dies is not what you expected it to be. Not the absence — you had anticipated the absence. The thing you had not anticipated is the continued presence in detail: the way you set an extra cup without thinking, the laugh that belongs to only one person arriving in your head at the wrong moment, the sentence that starts with their name before you remember.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_after_death', true) },
  },

  // ── THE OBJECT ───────────────────────────────────────────────────────────────

  {
    id: 'sonder13_object_1',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sonder13_object_1,
    text: `The object has been in the same place for twelve years. You have moved it perhaps twice — once to clean under it, once without knowing why — and returned it to its place because that is where it belongs, which is a phrase that means: the object has claimed this place and you have ratified the claim.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_object_1', true) },
  },

  {
    id: 'sonder13_object_2',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.sonder13_object_2,
    text: `You kept the thing. You moved it from place to place across three homes and you kept it, though you were not always certain why. It is ugly by most measures and not worth anything and it has been in your possession since before a period of your life you do not otherwise have objects from. That is why you kept it.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_object_2', true) },
  },

  {
    id: 'sonder13_object_3',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonder13_object_3,
    text: `You buy the thing and bring it home and it is the wrong thing — not defective, not a mistake in the transaction, but wrong for the space, wrong for the use you had in mind. You keep it anyway. This is the beginning of the accumulation.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_object_3', true) },
  },

  // ── LANGUAGE AND SILENCE ─────────────────────────────────────────────────────

  {
    id: 'sonder13_silence_1',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sonder13_silence_1,
    text: `The conversation ends and the silence after it is a different silence from the silence before it. Before, the silence was empty. After, the silence contains what was said. You sit in the containing silence and do not need to say anything else. Neither does the other person. This is a kind of intimacy.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_silence_1', true) },
  },

  {
    id: 'sonder13_language_gap',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sonder13_language_gap,
    text: `There is a thing you want to say and no word for it in the language you are speaking. This is not a failure of language — it is the specific territory between languages, the place where an experience exists before it has been named. You gesture toward it. Sometimes the other person recognises the gesture. Sometimes the gesture is everything.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_language_gap', true) },
  },

  {
    id: 'sonder13_unsaid',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.sonder13_unsaid,
    text: `The things you said and regretted are in the record. The things you did not say and regretted are in a different record — harder to locate, because the absence doesn't announce itself the way the wrong word does. The unsaid tends to surface later, at an angle, when you are not looking for it.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_unsaid', true) },
  },

  // ── TIME AND REPETITION ──────────────────────────────────────────────────────

  {
    id: 'sonder13_repeat_1',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sonder13_repeat_1,
    text: `The route to work is the same every day and you do not experience it every day. You experience it on the days when something is different — the weather, an incident, an unusual thought — and on the normal days the route performs itself without you. You arrive having been somewhere without having been there.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_repeat_1', true) },
  },

  {
    id: 'sonder13_repeat_2',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.sonder13_repeat_2,
    text: `You have eaten the same breakfast a very large number of times. Not every day — there are variations, meals away, the years when you ate differently — but the stable version of the breakfast, the default one, has been consumed so many times that the number exceeds any reasonable estimate you could make. The number is invisible. The breakfast is just the breakfast.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_repeat_2', true) },
  },

  {
    id: 'sonder13_seasons_body',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sonder13_seasons_body,
    text: `The body marks the seasons in ways the calendar does not. The specific weight of winter air, the way cold affects the joints differently at forty than it did at twenty, the particular tiredness that August produces. The body keeps a different record of the year than the year keeps of itself.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_seasons_body', true) },
  },

  // ── STRANGER GLIMPSES ────────────────────────────────────────────────────────

  {
    id: 'sonder13_stranger_1',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonder13_stranger_1,
    text: `The person at the next table is reading something and laughing to themselves. Not a polite laugh — a real one, sudden, surprised. Someone wrote something that caught them exactly right and they are reading it in a café and you are briefly in the room with that catch, and then the moment passes and they are just a person reading and you are just a person at the next table.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_stranger_1', true) },
  },

  {
    id: 'sonder13_stranger_2',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sonder13_stranger_2,
    text: `The man on the platform is checking his phone. On his face for a moment is something — you catch it in the second before he rearranges his face into the neutral expression people wear in public. The something was grief. Or it was good news about someone he loves. You cannot tell and you are not supposed to know and then the train arrives.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_stranger_2', true) },
  },

  {
    id: 'sonder13_stranger_3',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.sonder13_stranger_3,
    text: `Two old people on a bench who are not talking. They have arrived at the stage of being together that does not require talking. The bench is their bench — you can see from how they have settled into it that they have been coming here for years. You walk past them and they do not notice you. You notice them for longer than is visible.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_stranger_3', true) },
  },

  // ── FOOD AND MEMORY ──────────────────────────────────────────────────────────

  {
    id: 'sonder13_food_memory_1',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sonder13_food_memory_1,
    text: `The smell of something cooking arrives before the memory arrives, and then the memory arrives and the smell has already placed you somewhere specific — a kitchen, a time, a person who is not here. The food smell is faster than the narrative. By the time you have the story, the smell is already finished.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_food_memory_1', true) },
  },

  {
    id: 'sonder13_food_memory_2',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.sonder13_food_memory_2,
    text: `You made the dish your mother made. You have her recipe — or what you remember of her recipe, which has been modified by your approximations over thirty years — and the result is close but not exact. The distance between your dish and hers is exactly the distance between her hands and yours, which is a distance that will never close.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_food_memory_2', true) },
  },

  // ── THE HOUR ─────────────────────────────────────────────────────────────────

  {
    id: 'sonder13_hour_1',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonder13_hour_1,
    text: `3am is its own country. The quality of being awake at 3am is not the same as the quality of being awake at any other hour. The things that are large at 3am are not always the things that are large in the morning. You have learned to account for the specific distortion of the hour, which does not always make the 3am things less large.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_hour_1', true) },
  },

  {
    id: 'sonder13_hour_2',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sonder13_hour_2,
    text: `The hour before the house wakes up. You are the only one in it and the house is a different house — quieter, more itself, still carrying the specific silence of sleeping people. This is the hour you think clearly, or feel something without having to account for it. The hour ends when the first sound comes from upstairs.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_hour_2', true) },
  },

  // ── THE BODY GETTING OLDER ───────────────────────────────────────────────────

  {
    id: 'sonder13_body_age_1',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.sonder13_body_age_1,
    text: `The recovery time is longer now. Not dramatically — not a threshold crossed, more a gradual shift in the arithmetic. Two days used to be enough. Now the third day still has something in it that the second day used to take care of. Your body is negotiating terms with you about the things you ask of it.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_body_age_1', true) },
  },

  {
    id: 'sonder13_body_age_2',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.sonder13_body_age_2,
    text: `You know exactly how the body is doing because the body has become informative in a way it was not when you were younger. Younger it was background. Now it is foreground. You receive regular dispatches from the various departments, some of which require action and some of which require only acknowledgement.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_body_age_2', true) },
  },

  // ── WHAT YOU CARRY ───────────────────────────────────────────────────────────

  {
    id: 'sonder13_carry_1',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.sonder13_carry_1,
    text: `There are things you are carrying that have been with you so long that you no longer experience them as things being carried. They have become part of the posture, the background condition of being you. You would not know they were there except that occasionally something jogs them and briefly they are very there.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_carry_1', true) },
  },

  {
    id: 'sonder13_carry_2',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.sonder13_carry_2,
    text: `What you carry out of a long life: the specific things, not the general inventory. The sentence someone said in 1987 that you still think about. The smell of a particular room. The exact weight of a particular silence. Not the events — the texture of the events. The events become stories. The texture stays raw.`,
    choices: null,
    effect: (p) => { p.setMem('sonder13_carry_2', true) },
  },

]
