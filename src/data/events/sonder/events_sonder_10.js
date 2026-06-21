// events_sonder_10.js — MODE C contemplative auto-resolve events (36 events)
// Four registers: THE PHOTOGRAPH (9), THE NEIGHBOR (9),
// WHAT THE BODY LEARNS (9), FAITH IN SMALL ACTS (9)
// All mem-gated single-fire, weight 2, no choices, no new flags.

export const EVENTS_SONDER_10 = [

  // ══════════════════════════════════════════════════════════════════════════
  // THE PHOTOGRAPH
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder10_photo_child',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s10PhotoChild,
    text: 'A photograph from your childhood. The face is yours but you do not recognise it — not as a stranger, exactly, but as someone you knew long ago and have not seen since. The child in the photograph does not know what you know. You cannot explain to them what is coming.',
    choices: null,
    effect: (p) => { p.r += 3; p.m += 1; p.setMem('s10PhotoChild', true) },
  },

  {
    id: 'sonder10_photo_missing',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s10PhotoMissing,
    text: 'Looking through photographs from a particular year, you notice that someone is missing from all of them. The year was not a good one. The person was there — you remember them being there — but they are absent from every image, as if the camera was avoiding them, or they were avoiding the camera.',
    choices: null,
    effect: (p) => { p.r += 4; p.setMem('s10PhotoMissing', true) },
  },

  {
    id: 'sonder10_photo_unremembered',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.s10PhotoUnremembered,
    text: 'A photograph of you at a moment you do not remember. Someone took it. You were somewhere, with someone, doing something, and it was real enough to be photographed — and you have no memory of it. The photograph is the only evidence that the moment happened.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s10PhotoUnremembered', true) },
  },

  {
    id: 'sonder10_photo_last_one',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s10PhotoLast,
    text: 'The group photograph from some years ago. You count who is left. The arithmetic is not something you were expecting to do when the photograph was taken — everyone was simply there, and the camera clicked, and it was unremarkable. Now it is the document of something.',
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('s10PhotoLast', true) },
  },

  {
    id: 'sonder10_photo_place_gone',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s10PhotoPlace,
    text: 'A photograph of a place that no longer exists. The building came down, or the street was widened, or the whole neighbourhood was cleared. The photograph shows it as it was. It is strange to hold an image of something that has no physical correlate anymore — not destroyed, exactly, just no longer present in the world.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 1; p.setMem('s10PhotoPlace', true) },
  },

  {
    id: 'sonder10_photo_parents_young',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && !G.mem?.s10PhotoParentsYoung,
    text: 'A photograph of your parents before you were born. They are younger than you are now. You try to see them as people rather than as your parents — as two people who did not yet know you would exist. You cannot quite do it. To you, they will always be the age you first remember them, even as you have long since overtaken that age yourself.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('s10PhotoParentsYoung', true) },
  },

  {
    id: 'sonder10_photo_unknown',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s10PhotoUnknown,
    text: 'You find a photograph you did not know existed. You are in it. You do not remember the day, but you can date it by context — the clothes, the surroundings, the age of someone else in the frame. A day from your own life that you have no access to except through this image.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s10PhotoUnknown', true) },
  },

  {
    id: 'sonder10_photo_memory_or_image',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s10PhotoMemImg,
    text: 'You cannot tell anymore which part of the memory is real and which part is the photograph. The photograph was looked at so many times that it replaced whatever the original experience was. The memory is vivid; you cannot be certain it was ever yours.',
    choices: null,
    effect: (p) => { p.e += 1; p.r += 2; p.setMem('s10PhotoMemImg', true) },
  },

  {
    id: 'sonder10_photo_face_like_yours',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s10PhotoFaceLike,
    text: 'You notice, in a photograph, that someone else has your face. A parent, a sibling, a child. The likeness was probably always there. At some point it became unmistakable. You are not sure if this is consoling or unnerving. Both, maybe.',
    choices: null,
    effect: (p) => { p.r += 3; p.m += 2; p.setMem('s10PhotoFaceLike', true) },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // THE NEIGHBOR
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder10_nbr_name',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s10NbrName,
    text: 'You have seen the person next door almost every day for years and you do not know their name. You have reached the stage where it would be awkward to ask. You know their schedule, the sound of their door, the hours they keep. You know them without knowing anything about them.',
    choices: null,
    effect: (p) => { p.m += 1; p.setMem('s10NbrName', true) },
  },

  {
    id: 'sonder10_nbr_sound',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s10NbrSound,
    text: 'Through the wall you can hear them. Not the words, just the rhythms: raised voices once, then nothing for days, then music late at night. You have assembled a partial picture of their life from sound alone. You will never verify any of it. You have been listening to a life.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s10NbrSound', true) },
  },

  {
    id: 'sonder10_nbr_found',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s10NbrFound,
    text: 'The neighbour was found after several days. You are not sure how you feel about this — grief would be too strong a word for someone you barely knew, but it is not nothing. You noticed their absence before anyone else. You did not do anything with the noticing.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 4; p.setMem('s10NbrFound', true) },
  },

  {
    id: 'sonder10_nbr_light',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 38 && !G.mem?.s10NbrLight,
    text: 'The light is on in the apartment across the street at three in the morning. You are awake because you are awake. Someone over there is awake for their own reason. You look at the lit rectangle for a while. Another person, their own insomnia, their own window.',
    choices: null,
    effect: (p) => { p.m += 2; p.e += 1; p.setMem('s10NbrLight', true) },
  },

  {
    id: 'sonder10_nbr_routine',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s10NbrRoutine,
    text: 'You know their schedule better than their name. The door at seven. The car at seven-fifteen. The light in the kitchen at six in the morning and again at ten at night. A full picture of the structure of a life, assembled from fragments, over years, without intention.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s10NbrRoutine', true) },
  },

  {
    id: 'sonder10_nbr_left_behind',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 35 && !G.mem?.s10NbrLeftBehind,
    text: 'Moving into this place, you found things from the person before: a single shoe, a postcard from somewhere, marks on a wall that tracked a child\'s height over several years. The child is gone. The marks remain. A life was here.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s10NbrLeftBehind', true) },
  },

  {
    id: 'sonder10_nbr_dog',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 33 && !G.mem?.s10NbrDog,
    text: 'The dog that barked every night for years has stopped barking. You did not notice it stopping until a week after it stopped. You wonder briefly what happened — you do not wonder long — and then the silence becomes ordinary, the way the barking became ordinary before it.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s10NbrDog', true) },
  },

  {
    id: 'sonder10_nbr_child',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s10NbrChild,
    text: 'You watched a child grow up next door without ever really knowing them. You remember them as an infant, and then they were a teenager, and now they have moved somewhere. You do not know their name. You watched fifteen years of their life from a distance of thirty feet.',
    choices: null,
    effect: (p) => { p.r += 3; p.m += 2; p.setMem('s10NbrChild', true) },
  },

  {
    id: 'sonder10_nbr_stairs',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s10NbrStairs,
    text: 'The greeting on the stairs. A nod, a few words about the weather, a brief acknowledgment that you both live here. This is the whole of your relationship with someone you have passed hundreds of times. It is enough. It is exactly enough, and no more.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s10NbrStairs', true) },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // WHAT THE BODY LEARNS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder10_body_dark',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s10BodyDark,
    text: 'You can do it in the dark now. Lock the door, navigate the kitchen, find the light switch. The body has learned the space and stored it somewhere that is not quite memory. You do not think about it. Your hands simply know.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s10BodyDark', true) },
  },

  {
    id: 'sonder10_body_keyboard',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentYear >= 1990 && G.age >= 22 && !G.mem?.s10BodyKeyboard,
    text: 'You do not look at the keys anymore. At some point the knowledge moved from the eyes to the fingers, and you cannot go back — if you look at your hands while typing you lose the thread. There is knowledge the body holds that the mind cannot access directly.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s10BodyKeyboard', true) },
  },

  {
    id: 'sonder10_body_drive',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s10BodyDrive,
    text: 'You drove a familiar route and arrived without having been conscious of the drive. The body handled it. You were somewhere else — thinking, or not thinking exactly — and the car carried you home. This is mildly alarming and yet the body did it correctly, as it always does.',
    choices: null,
    effect: (p) => { p.m += 1; p.setMem('s10BodyDrive', true) },
  },

  {
    id: 'sonder10_body_instrument',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s10BodyInstrument,
    text: 'You played it for years and stopped. The hands still carry the muscle memory of it — the specific angles, the pressure, the movements that were once so deliberate they seemed impossible. You pick it up after a long absence and your hands remember a version of it. Not fully. Not nothing.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 2; p.setMem('s10BodyInstrument', true) },
  },

  {
    id: 'sonder10_body_language',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s10BodyLang,
    text: 'The language learned in childhood is in the body in a way the one learned later is not. There is no translation happening in the first language. The thought and the word arrive together. In the second language you can feel yourself working. There is always a slight delay.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s10BodyLang', true) },
  },

  {
    id: 'sonder10_body_learned_without',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s10BodyLearnedWithout,
    text: 'Your hands know how to do something and you cannot remember learning it. Someone must have shown you, or you figured it out, but the learning itself is gone and only the skill remains. You do it without thinking and without knowing how you know.',
    choices: null,
    effect: (p) => { p.m += 2; p.e += 1; p.setMem('s10BodyLearnedWithout', true) },
  },

  {
    id: 'sonder10_body_handshake',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s10BodyHandshake,
    text: 'The hand is already extended before you have consciously decided to extend it. The body reads the social situation and responds before you arrive at the scene. You watch yourself do it, competently, automatically, from a slight remove. The body has learned to navigate.',
    choices: null,
    effect: (p) => { p.s += 1; p.setMem('s10BodyHandshake', true) },
  },

  {
    id: 'sonder10_body_swim',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && !G.mem?.s10BodySwim,
    text: 'You hadn\'t swum in years. The body remembered immediately — the breathing, the stroke, the strange efficiency of it. No one who learns to swim ever quite forgets. The body keeps the record of things the mind releases.',
    choices: null,
    effect: (p) => { p.h += 2; p.m += 3; p.setMem('s10BodySwim', true) },
  },

  {
    id: 'sonder10_body_read',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 35 && !G.mem?.s10BodyRead,
    text: 'You read faster now than you used to, and you skip things without noticing you\'ve skipped them. The eye has learned to identify what matters. What you gain in speed, you may lose in something else — the unhurried sentences, the words read twice because they were exactly right. You are not sure what you\'ve traded.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s10BodyRead', true) },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // FAITH IN SMALL ACTS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder10_faith_prayer_body',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.religion && G.religion !== 'atheist' && G.religion !== 'agnostic' && G.age >= 35 && !G.mem?.s10FaithPrayerBody,
    text: 'The prayer has been said so many times that it lives in the body now rather than the mind. You can say it while thinking about something else. You are not certain whether this is devotion that has gone so deep it no longer needs effort, or whether it is something that has become automatic in the way routines become automatic. You say it anyway.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 1; p.setMem('s10FaithPrayerBody', true) },
  },

  {
    id: 'sonder10_faith_fast',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.religion === 'muslim_sunni' || G.religion === 'muslim_shia' || G.religion === 'christian_orthodox' || G.religion === 'christian_catholic') && G.age >= 18 && !G.mem?.s10FaithFast,
    text: 'The fast changes what the afternoon feels like. Not just the hunger — the texture of the hours is different, slower and more deliberate, as if the removal of a habit reveals the structure underneath it. You are more aware of yourself than usual. That is either the point or a side effect. You are not sure.',
    choices: null,
    effect: (p) => { p.m += 2; p.e += 2; p.setMem('s10FaithFast', true) },
  },

  {
    id: 'sonder10_faith_candle',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.s10FaithCandle,
    text: 'You light a candle in the church, or the temple, or the shrine — you are not sure anymore that you believe what is required to make the act meaningful. You do it anyway. The flame is there regardless. Whatever is carried in the action is carried regardless of whether you have resolved the question of belief.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 2; p.setMem('s10FaithCandle', true) },
  },

  {
    id: 'sonder10_faith_object',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.religion && G.religion !== 'atheist' && G.religion !== 'agnostic' && G.age >= 35 && !G.mem?.s10FaithObject,
    text: 'It has been in every home you\'ve ever lived in. The small religious object — the icon, the string of beads, the verse in a frame, the statue that has been on a shelf since before you can remember. Moving it would feel wrong even to those who are not sure it means what it meant. It stays.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s10FaithObject', true) },
  },

  {
    id: 'sonder10_faith_adhan',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.religion === 'muslim_sunni' || G.religion === 'muslim_shia' && G.age >= 18 && !G.mem?.s10FaithAdhan,
    text: 'The adhan arrives at a particular time of day and the day has a structure given to it from outside. Whatever you are doing pauses, or doesn\'t — that is a daily small decision. Either way, the day has been marked. The call happened and you were in it.',
    choices: null,
    effect: (p) => { p.m += 2; p.e += 1; p.setMem('s10FaithAdhan', true) },
  },

  {
    id: 'sonder10_faith_blessing',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s10FaithBlessing,
    text: 'The blessing before meals — the children have stopped saying it. You notice this without reproaching them. It was said every day for years at that table, a small formal acknowledgment of the food and its source. Now it isn\'t said. Something went out of the room quietly and you are not sure the children noticed it leave.',
    choices: null,
    effect: (p) => { p.r += 3; p.m -= 1; p.setMem('s10FaithBlessing', true) },
  },

  {
    id: 'sonder10_faith_building',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s10FaithBuilding,
    text: 'Entering the building, even now, even after everything you are uncertain about — there is still a change in atmosphere. The specific acoustics, the particular quality of light through certain windows, the smell of the space. The body has been here long enough to carry the feeling independent of the belief.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 1; p.setMem('s10FaithBuilding', true) },
  },

  {
    id: 'sonder10_faith_saint',
    phase: 'late_life',
    weight: 2,
    when: (G) => (G.religion === 'christian_catholic' || G.religion === 'christian_orthodox') && G.age >= 55 && !G.mem?.s10FaithSaint,
    text: 'A moment of crisis — a near thing, a sudden fear — and a name comes out of your mouth before thought. A saint\'s name, a prayer fragment, something from childhood that bypassed the long conversation you\'ve had with yourself about whether any of it is real. The body still believes something. You are not sure the body is wrong.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 1; p.setMem('s10FaithSaint', true) },
  },

  {
    id: 'sonder10_faith_ceremony',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.religion && G.religion !== 'atheist' && G.religion !== 'agnostic' && G.age >= 35 && !G.mem?.s10FaithCeremony,
    text: 'You attend the annual ceremony without deciding whether you believe it. The question is set aside at the door. Everyone who is there has their own relationship with the question and has set it aside at the door. The ceremony happens, and something is marked, and the year turns, and it is enough.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s10FaithCeremony', true) },
  },

]
