// events_sonder_8.js — MODE C contemplative auto-resolve events (36 events)
// Four registers: WORK AND PURPOSE (9), HOME AND OBJECTS (9),
// WEATHER AND SEASONS (9), LATE LIFE TEXTURE (9)
// All mem-gated single-fire, weight 2, no choices, no new flags.

export const EVENTS_SONDER_8 = [

  // ══════════════════════════════════════════════════════════════════════════
  // WORK AND PURPOSE
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder8_work_monday',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.career && G.age >= 22 && !G.mem?.s8WorkMonday,
    text: 'Monday again. You have done this enough times now that Monday has a texture that is different from the other days — not worse, exactly, just specific. The specific weight of the beginning of the same week.',
    choices: null,
    effect: (p) => { p.m -= 1; p.setMem('s8WorkMonday', true) },
  },

  {
    id: 'sonder8_work_mastery',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career && G.age >= 30 && !G.mem?.s8WorkMastery,
    text: 'You can do this in your sleep now. You do not say this to anyone because it sounds like complaining and you are not complaining. It is just a fact. The thing that used to take concentration takes none. You find yourself wondering what to do with the part of you that used to be occupied.',
    choices: null,
    effect: (p) => { p.e += 1; p.setMem('s8WorkMastery', true) },
  },

  {
    id: 'sonder8_work_purpose_question',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career && G.age >= 38 && G.age <= 52 && !G.mem?.s8WorkPurposeQ,
    text: 'Someone asks you what you do and you tell them and they nod and you watch yourself explaining and think: this is what I have done with the years. Not as a complaint. Just as a fact that has a specific weight when you look at it directly.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s8WorkPurposeQ', true) },
  },

  {
    id: 'sonder8_work_colleague_gone',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career && G.age >= 35 && !G.mem?.s8WorkColleagueGone,
    text: 'Someone you have worked alongside for years leaves. The farewell is a party with a cake and a card and everyone writes something in it. Then they are gone and their desk is someone else\'s desk. The specific absence of a person who was simply there every day is a quiet kind of grief that has no name.',
    choices: null,
    effect: (p) => { p.m -= 3; p.setMem('s8WorkColleagueGone', true) },
  },

  {
    id: 'sonder8_work_unexpected_meaning',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.career && G.age >= 25 && G.age <= 35 && !G.mem?.s8WorkUnexpMeaning,
    text: 'You did not expect to care about this job. You took it because of the circumstances and then something in it turned out to matter — not every day, not obviously, but enough. You have not told anyone this because it sounds sentimental about a thing that is just work.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s8WorkUnexpMeaning', true) },
  },

  {
    id: 'sonder8_work_the_commute',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.career && G.age >= 22 && G.age <= 45 && !G.mem?.s8WorkCommute,
    text: 'The commute is a kind of daily transition that you barely notice anymore. At some point it became part of the day rather than the thing before the day. You know which stop to look up at. You know which bend in the road means five minutes more.',
    choices: null,
    effect: (p) => { p.setMem('s8WorkCommute', true) },
  },

  {
    id: 'sonder8_work_recognition',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career && G.age >= 35 && !G.mem?.s8WorkRecognition,
    text: 'Someone tells you that you are good at what you do. They say it directly, without qualification. You find that you do not know how to hold this information. You say thank you and then you go on doing the work the same as before, except that you remember the sentence at odd moments for weeks afterward.',
    choices: null,
    effect: (p) => { p.m += 5; p.s += 1; p.setMem('s8WorkRecognition', true) },
  },

  {
    id: 'sonder8_work_last_day_approaching',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.career && G.age >= 60 && !G.mem?.s8WorkLastDayApproach,
    text: 'You are counting without counting. You know approximately how many of these there are left — not obsessively, just as a fact that is now present. Every ordinary day at work has a small sense of being one of the remaining ones, though this passes and the work is still just work.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s8WorkLastDayApproach', true) },
  },

  {
    id: 'sonder8_work_younger_generation',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.career && G.age >= 55 && !G.mem?.s8WorkYounger,
    text: 'The newest people at work were born in a different decade than you were. They have different assumptions about how things should work. You were the youngest in the room for so long that you did not notice when you stopped being. Now you are neither the oldest nor the youngest, which is its own specific place.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s8WorkYounger', true) },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // HOME AND OBJECTS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder8_home_routine',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.s8HomeRoutine,
    text: 'You have a routine now. You did not decide to have one — it assembled itself out of necessity and then calcified into habit. The specific order of the morning: the things you do before you do the other things. You do not think about it. It is just the shape of the day.',
    choices: null,
    effect: (p) => { p.setMem('s8HomeRoutine', true) },
  },

  {
    id: 'sonder8_home_object_decades',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s8HomeObjectDecades,
    text: 'You have owned this object for twenty years. It was ordinary when you got it and is now simply part of the furniture of your life — not precious, not noticed, just there. The idea of not having it would feel odd in a way you cannot quite explain.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s8HomeObjectDecades', true) },
  },

  {
    id: 'sonder8_home_smell',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 18 && !G.mem?.s8HomeSmell,
    text: 'The house has a smell that you do not notice because you live in it. You will only notice it the first time you come back after being away for long enough — you will walk in and it will be suddenly present, the specific smell that is home, which you never knew was home while you were inside it.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s8HomeSmell', true) },
  },

  {
    id: 'sonder8_home_clearing',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.s8HomeClearing,
    text: 'You have begun to go through things. Not urgently, just — there are drawers that have not been opened in years and you have started to open them. The objects inside are from lives that feel like different lives, which they partly were. You throw some things away and keep others and the criteria for which is which is not always obvious.',
    choices: null,
    effect: (p) => { p.r += 3; p.m -= 2; p.setMem('s8HomeClearing', true) },
  },

  {
    id: 'sonder8_home_light',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s8HomeLight,
    text: 'There is a time of day when the light in this room is specific — a particular angle that makes the ordinary things look briefly different. You have noticed it for years and every time it registers as something you should pay more attention to.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s8HomeLight', true) },
  },

  {
    id: 'sonder8_home_moved',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 40 && !G.mem?.s8HomeMoved,
    text: 'The new place takes a while to feel like somewhere you live. The muscle memory of the old place persists for weeks — reaching for the light switch in the wrong direction, expecting a step that isn\'t there. The body knows an address.',
    choices: null,
    effect: (p) => { p.m -= 2; p.setMem('s8HomeMoved', true) },
  },

  {
    id: 'sonder8_home_repair',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.s8HomeRepair,
    text: 'The thing has been broken for so long it has become part of the house. You walk past it every day and think: I should fix that. You do not fix it. At some point the knowledge that you are not going to fix it quietly replaces the intention to fix it, and the broken thing becomes simply part of how the house is.',
    choices: null,
    effect: (p) => { p.setMem('s8HomeRepair', true) },
  },

  {
    id: 'sonder8_home_photograph',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s8HomePhotograph,
    text: 'There is a photograph on the wall that you stopped seeing years ago. A visitor looks at it and asks about it and you explain and as you explain you see the photograph again — the people in it, the moment it was, the distance between then and now.',
    choices: null,
    effect: (p) => { p.r += 3; p.m += 2; p.setMem('s8HomePhotograph', true) },
  },

  {
    id: 'sonder8_home_guest',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s8HomeGuest,
    text: 'Someone comes to stay for a few days. The house adjusts for them — the rhythm of it, the small accommodations — and then they leave and the house returns to its ordinary state. You notice the return more than you noticed the original state.',
    choices: null,
    effect: (p) => { p.m += 3; p.s += 1; p.setMem('s8HomeGuest', true) },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // WEATHER AND SEASONS
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder8_weather_first_warm',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s8WeatherFirstWarm,
    text: 'The first genuinely warm day of the year is always a surprise. You knew it was coming. You have been waiting for it for months. And still, when it arrives, you stop for a moment and just stand in it.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s8WeatherFirstWarm', true) },
  },

  {
    id: 'sonder8_weather_rain_on_roof',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 16 && !G.mem?.s8WeatherRainRoof,
    text: 'It rains on the roof tonight and you lie listening to it. The sound of rain on whatever roof you are under is among the oldest sounds you know. You will be able to produce it from memory decades from now, if you think about it.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s8WeatherRainRoof', true) },
  },

  {
    id: 'sonder8_weather_drought',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s8WeatherDrought,
    text: 'The dry season extends further than usual. The ground is the colour of nothing. People in the market talk about it the way they talk about other things that are happening and that no one can do anything about. You carry your water carefully.',
    choices: null,
    effect: (p) => { p.h -= 1; p.setMem('s8WeatherDrought', true) },
  },

  {
    id: 'sonder8_weather_season_change',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && !G.mem?.s8WeatherSeasonChange,
    text: 'There is a day — always one specific day — when you feel the season change. Not the calendar date, but the actual texture of the air, which becomes something else. This happens every year and every year it registers as though you are noticing it for the first time.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s8WeatherSeasonChange', true) },
  },

  {
    id: 'sonder8_weather_storm',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 6 && G.age <= 14 && !G.mem?.s8WeatherStorm,
    text: 'There is a storm tonight. The particular sound of it — the wind in whatever trees are outside, the specific quality of the dark — is a sound that will come back to you in other years when you are somewhere else and a storm comes. The first storms lodge.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s8WeatherStorm', true) },
  },

  {
    id: 'sonder8_weather_heat_body',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.s8WeatherHeatBody,
    text: 'You handle the heat differently now than you did. Not dramatically different, just — you notice it more. You seek shade sooner. The body\'s tolerance for discomfort changes quietly, over years, before you realise it has changed.',
    choices: null,
    effect: (p) => { p.h -= 1; p.r += 1; p.setMem('s8WeatherHeatBody', true) },
  },

  {
    id: 'sonder8_weather_anniversary',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.s8WeatherAnniversary,
    text: 'The weather on this date always makes you think of something. You do not always know what. A specific quality of light or temperature that is tied to a year that the current year resembles. The body stores dates by weather.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s8WeatherAnniversary', true) },
  },

  {
    id: 'sonder8_weather_night_sky',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 13 && G.age <= 22 && !G.mem?.s8WeatherNightSky,
    text: 'You look up at the sky at night and the scale of it is briefly present. Not frightening, just large. There is a moment in most adolescent lives when the cosmos becomes briefly legible as something that is not about you, and something in you organises around this.',
    choices: null,
    effect: (p) => { p.e += 1; p.m += 2; p.setMem('s8WeatherNightSky', true) },
  },

  {
    id: 'sonder8_weather_old_winter',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s8WeatherOldWinter,
    text: 'The cold gets into you more easily than it used to. You dress more than you would have ten years ago for the same temperature. This is not a complaint. It is one of the ways the body tells you what year it is.',
    choices: null,
    effect: (p) => { p.h -= 1; p.r += 2; p.setMem('s8WeatherOldWinter', true) },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // LATE LIFE TEXTURE
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder8_late_the_number',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s8LateTheNumber,
    text: 'You are sometimes surprised by your age when you say it aloud. Not the number itself — you know the number — but what the number means in someone else\'s ear. The person you are inside has not fully updated.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s8LateTheNumber', true) },
  },

  {
    id: 'sonder8_late_phone_list',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.s8LatePhoneList,
    text: 'You have stopped adding people to certain lists because the list no longer serves its original function. The address book — or its equivalent — contains names of people who have died and you have not deleted them, partly because the deletion feels wrong and partly because you are not sure what it would mean to delete them.',
    choices: null,
    effect: (p) => { p.r += 4; p.m -= 3; p.setMem('s8LatePhoneList', true) },
  },

  {
    id: 'sonder8_late_doctor_regular',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s8LateDoctorReg,
    text: 'You see the doctor regularly now in a way you did not before. The appointments have a specific texture: the waiting room, the numbers, the questions you now know to ask. Your body has become something you manage rather than something you simply inhabit.',
    choices: null,
    effect: (p) => { p.h += 1; p.r += 2; p.setMem('s8LateDoctorReg', true) },
  },

  {
    id: 'sonder8_late_younger_eyes',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.s8LateYoungerEyes,
    text: 'You watch a young person make a decision and you can see, from where you are standing, what they cannot see: how this is likely to go. You do not say this. It is not information that helps to receive from outside.',
    choices: null,
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('s8LateYoungerEyes', true) },
  },

  {
    id: 'sonder8_late_the_decade',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 70 && !G.mem?.s8LateTheDecade,
    text: 'You have lived a decade you did not think would be a decade. Somewhere in your forties you had an implicit sense of what the span of your life would be. You have passed that limit. The years past it are in a specific register: unexpected, uncalculated, yours to make sense of.',
    choices: null,
    effect: (p) => { p.m += 4; p.karma += 2; p.setMem('s8LateTheDecade', true) },
  },

  {
    id: 'sonder8_late_music_year',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.s8LateMusicYear,
    text: 'You hear a song from a specific year of your life and the year arrives. Not memory exactly — something more physical than that. The year lands in your body briefly and then the song ends and you are here again.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s8LateMusicYear', true) },
  },

  {
    id: 'sonder8_late_grandchild_clock',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.age >= 65 &&
      G.children?.length > 0 &&
      !G.mem?.s8LateGrandchildClock,
    text: 'The grandchildren — if you have them — are a specific kind of time. They age at a rate you can observe, which means you can observe time passing in a way that is harder to see in yourself. Every year the child is taller and you are the same height, which is information.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 3; p.setMem('s8LateGrandchildClock', true) },
  },

  {
    id: 'sonder8_late_the_unasked',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.s8LateUnasked,
    text: 'There are questions you did not ask when you could have asked them. The person who would have known the answer is gone. This is not a tragedy — it is simply how knowledge passes through generations, imperfectly, with gaps. But the gaps are real and they are yours.',
    choices: null,
    effect: (p) => { p.r += 4; p.m -= 2; p.setMem('s8LateUnasked', true) },
  },

  {
    id: 'sonder8_late_morning_window',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 70 && !G.mem?.s8LateMorningWindow,
    text: 'In the morning you sit by the window for longer than you used to. You are not doing anything in particular. You are watching what is outside: the street, or the garden, or the courtyard, or the wall — whatever is there. This is a thing you now do that you did not used to do, and you do not mind it.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s8LateMorningWindow', true) },
  },

]
