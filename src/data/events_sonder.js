// events_sonder.js — Sonder: the awareness of other lives passing around you,
// and the texture of unremarkable days that make up most of a life.
//
// Two categories:
//   STRANGER GLIMPSES — moments of sudden awareness of other people's interior lives
//   MUNDANE LIFE      — the ordinary fabric of existence given its proper weight
//
// All events are single-fire (mem-gated) and auto-resolve. No choices. Small effects.
// Weight: 2 — present but not dominant. The goal is ~2–4 per decade across a life.

export const SONDER_EVENTS = [

  // ── STRANGER GLIMPSES ────────────────────────────────────────────────────────
  // Moments when another life becomes briefly, partially visible.

  {
    id: 'sonder_lit_window',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 30 && !G.mem?.sonderLitWindow,
    text: 'Walking back one evening, you pass a lit window on the second floor. Inside, someone is sitting at a table — you cannot tell what they are doing, only the quality of their stillness. The whole of their day, their history, their internal weather, is behind that glass. You walk on. The light goes out of view.',
    effect: (p) => { p.e += 1; p.setMem('sonderLitWindow', true); },
  },

  {
    id: 'sonder_funeral_street',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 35 && !G.mem?.sonderFuneralStreet,
    text: 'A funeral procession moves through the street ahead of you — slow, the family walking together, a coffin in a vehicle you have to wait for. You do not know whose funeral this is. You do not know anything about the person inside the vehicle except that they existed and now do not. You think about this for the rest of the afternoon.',
    effect: (p) => { p.e += 1; p.m -= 1; p.setMem('sonderFuneralStreet', true); },
  },

  {
    id: 'sonder_bus_photograph',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 40 && G.currentYear >= 1950 && !G.mem?.sonderBusPhoto,
    text: 'On a bus, a woman across from you takes a photograph from her bag and looks at it for a long time. She is not showing it to anyone. When she puts it away, her face is something you do not have a word for. The bus stops. She gets off. You will never know what was in the photograph.',
    effect: (p) => { p.e += 1; p.setMem('sonderBusPhoto', true); },
  },

  {
    id: 'sonder_wedding_sound',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 52 && !G.mem?.sonderWeddingSound,
    text: 'Passing a building at night, you hear music from an upper floor — the unmistakable shape of a wedding: the saxophone, then voices, then laughter too loud to be contained. Someone is dancing. You pass through it and come out the other side still in the same street, still in your own life, which is also complete.',
    effect: (p) => { p.m += 1; p.setMem('sonderWeddingSound', true); },
  },

  {
    id: 'sonder_old_man_corner',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 56 && !G.mem?.sonderOldManCorner,
    text: 'There is an old man who sits in front of the same building at the same time every day. You have passed him so many times that he has become part of the landscape. One day he is not there. He will not be there again. You do not know his name. You find that you notice his absence longer than you would have expected.',
    effect: (p) => { p.r += 1; p.e += 1; p.setMem('sonderOldManCorner', true); },
  },

  {
    id: 'sonder_children_below',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && G.age <= 55 && !G.mem?.sonderChildrenBelow,
    text: 'Children are playing in the street below, or in the courtyard, or on the patch of ground outside. You can hear them from where you are. The game they are playing makes sense only to them. They are entirely inside it. Something about the sound of it, heard from above, from the middle of an adult day, is both ordinary and not ordinary at all.',
    effect: (p) => { p.m += 1; p.setMem('sonderChildrenBelow', true); },
  },

  {
    id: 'sonder_market_hands',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 45 && !G.mem?.sonderMarketHands,
    text: 'At the market, a vendor wraps your purchase with the efficiency of someone who has done this ten thousand times. The motion of their hands is exact and unhurried. Their whole working day is in the motion. You take the package. They look past you at the next person in line. The transaction is complete.',
    effect: (p) => { p.e += 1; p.setMem('sonderMarketHands', true); },
  },

  {
    id: 'sonder_train_station',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 34 && G.currentYear >= 1940 && !G.mem?.sonderTrainStation,
    text: 'In the station, everyone is going somewhere and has reasons for it. The man with the too-heavy bag has reasons. The woman in the yellow coat has reasons. The child running ahead of the parent has only speed as a reason, which is also a kind of reason. You find your platform. Everyone else finds theirs. The station empties in all directions at once.',
    effect: (p) => { p.e += 1; p.setMem('sonderTrainStation', true); },
  },

  {
    id: 'sonder_cemetery_shortcut',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.sonderCemeteryShortcut,
    text: 'You walk through the cemetery sometimes — it is a shortcut, or you have learned to make it one. The names on the stones are the names of people who were also making their way through years, also checking the account balance, also waking at three in the morning thinking about things not yet resolved. The shortcut works. You come out the other side.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderCemeteryShortcut', true); },
  },

  {
    id: 'sonder_wall_argument',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 52 && G.currentYear >= 1920 && !G.mem?.sonderWallArgument,
    text: 'Through the wall — a thin wall, the kind that older buildings have — you can hear a couple arguing. Not the words, just the shape: the escalation, the pause, the different tone when one of them starts to cry, or to apologise, or both. Then it stops. You go back to whatever you were doing. Behind every wall, someone is living.',
    effect: (p) => { p.e += 1; p.setMem('sonderWallArgument', true); },
  },

  // ── MUNDANE LIFE ─────────────────────────────────────────────────────────────
  // The unremarkable days that make up most of a life, given their proper weight.

  {
    id: 'mundane_morning_ritual',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 32 && !G.mem?.mundaneMorningRitual,
    text: 'You have developed a morning ritual. It is small and private and probably unremarkable to anyone who is not you: the order of things, the specific quality of the first hour. You did not decide to develop it. It assembled itself. You notice, this year, that you look forward to it.',
    effect: (p) => { p.m += 2; p.setMem('mundaneMorningRitual', true); },
  },

  {
    id: 'mundane_commute_owned',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 24 && G.age <= 45 && G.career && G.currentYear >= 1950 && !G.mem?.mundaneCommuteOwned,
    text: 'The commute is the only part of the day that belongs entirely to you. No one can reach you for these exact minutes — or you can choose not to be reached. You have started to use this time in a specific way. What you do with it says something about what you actually want, as opposed to what you think you want.',
    effect: (p) => { p.e += 1; p.m += 1; p.setMem('mundaneCommuteOwned', true); },
  },

  {
    id: 'mundane_grocery_routine',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 55 && G.currentYear >= 1960 && !G.mem?.mundaneGroceryRoutine,
    text: 'You know which aisle has what. You know which product is never in stock on a Monday. You know the checkout queue to avoid. This knowledge, accumulated without effort over years of the same loop, is the kind of intelligence that goes unacknowledged. The weekly shop takes twenty minutes less than it used to. You have absorbed the shop.',
    effect: (p) => { p.m += 1; p.setMem('mundaneGroceryRoutine', true); },
  },

  {
    id: 'mundane_sunday_nothing',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 55 && !G.mem?.mundaneSundayNothing,
    text: 'A day with nothing required. You feel the shape of the nothing and it is unusual — not comfortable at first, then more comfortable. By afternoon you have found the thing you actually wanted to do with a free day, not the thing you had told yourself you would do if you had time. The two are different. The distance between them is information.',
    effect: (p) => { p.m += 3; p.e += 1; p.setMem('mundaneSundayNothing', true); },
  },

  {
    id: 'mundane_cooking_alone',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 38 && !G.partner && !G.mem?.mundaneCookingAlone,
    text: 'You cook a meal for yourself, for no particular occasion. The choosing of it, the preparation, the time it takes — none of this is remarkable, but there is a quality of attention in it that a day spent being moved from thing to thing does not have. You eat it. It is good enough. The kitchen is quiet after.',
    effect: (p) => { p.m += 2; p.setMem('mundaneCookingAlone', true); },
  },

  {
    id: 'mundane_task_unwitnessed',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && G.age <= 58 && !G.mem?.mundaneTaskUnwitnessed,
    text: 'You spend part of the day doing something no one else will ever know you did. The repair. The filing. The reply that needed to go out. When it is done there is no record of its undone state, which means no one can see that it is now done. You notice this. You do it anyway.',
    effect: (p) => { p.karma += 1; p.m += 1; p.setMem('mundaneTaskUnwitnessed', true); },
  },

  {
    id: 'mundane_waiting_room',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 65 && G.currentYear >= 1940 && !G.mem?.mundaneWaitingRoom,
    text: 'In the waiting room, a man reads yesterday\'s newspaper. A woman adjusts her bag every few minutes. A child has given up asking when they can leave. You are all waiting for different things to happen to you. The room holds everyone\'s version of the same suspension. Your name is called and you leave them there.',
    effect: (p) => { p.e += 1; p.setMem('mundaneWaitingRoom', true); },
  },

  {
    id: 'mundane_rain_inside',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 65 && !G.mem?.mundaneRainInside,
    text: 'A day when the rain makes the decision for you. You stay inside. You do not have to account for the decision because the weather has made it. There is a particular freedom in having the choice removed. By afternoon you are still inside and the rain is still there, and this is, in its way, a complete day.',
    effect: (p) => { p.m += 2; p.setMem('mundaneRainInside', true); },
  },

  {
    id: 'mundane_end_of_ordinary_day',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 58 && !G.mem?.mundaneEndOfDay,
    text: 'The day was neither good nor bad. Nothing of significance happened and nothing was asked of you beyond the ordinary, and you provided it. By evening it has passed in a way that feels like most things passing. You eat something. You sit for a while. The day goes where days go.',
    effect: (p) => { p.m += 1; p.setMem('mundaneEndOfDay', true); },
  },

  {
    id: 'mundane_birthday_unremarkable',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 58 && !G.mem?.mundaneBirthdayUnremarkable,
    text: 'Your birthday arrives on a Tuesday and it is a Tuesday. The number has changed — you are one year older — but the day is a day. Some people send messages. You receive them. There is a meal you choose for the occasion, nothing elaborate. The next day is a Wednesday. This is, in fact, what growing older mostly is.',
    effect: (p) => { p.r += 1; p.e += 1; p.setMem('mundaneBirthdayUnremarkable', true); },
  },


  // ── STRANGER GLIMPSES — EXTENDED ──────────────────────────────────────────────
  // More moments when another life becomes briefly, partially visible.

  {
    id: 'sonder_hospital_corridor',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 58 && !G.mem?.sonderHospitalCorridor,
    text: 'In the corridor of the hospital you are not a patient in, a family is gathered around something you cannot see — their arrangement tells you everything. They do not notice you. You pass them the way people pass through other people\'s worst days, which is: without touching them.',
    effect: (p) => { p.e += 1; p.setMem('sonderHospitalCorridor', true); },
  },

  {
    id: 'sonder_platform_farewell',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 35 && G.currentYear >= 1940 && !G.mem?.sonderPlatformFarewell,
    text: 'At the station, two people are saying goodbye. The train is already at the platform. One of them is holding the other\'s face with both hands. You do not watch. You have seen it. You carry your bag to the other end of the platform and think about something else.',
    effect: (p) => { p.e += 1; p.setMem('sonderPlatformFarewell', true); },
  },

  {
    id: 'sonder_night_worker',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 40 && !G.mem?.sonderNightWorker,
    text: 'You see them when you are returning from something late — the cleaner, the night security, the baker loading a van before four in the morning. The city runs on two shifts and you exist in the one that does not notice the other.',
    effect: (p) => { p.e += 1; p.setMem('sonderNightWorker', true); },
  },

  {
    id: 'sonder_couple_not_speaking',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 55 && !G.mem?.sonderCoupleNotSpeaking,
    text: 'In a restaurant, a couple sits without speaking. They are not angry — or not visibly angry. They have eaten most of their meals together for a long time and the silence has a quality not available to strangers. You do not know if the silence is comfortable or the end of something.',
    effect: (p) => { p.e += 1; p.setMem('sonderCoupleNotSpeaking', true); },
  },

  {
    id: 'sonder_letter_drop',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 45 && G.currentYear >= 1920 && G.currentYear <= 1990 && !G.mem?.sonderLetterDrop,
    text: 'A woman ahead of you in the street drops a letter she was carrying. You pick it up and hand it to her and in the second of exchange you see her face — something is written in it that doesn\'t belong to the street, or to you, or to anything that can be spoken about easily. She thanks you and walks on.',
    effect: (p) => { p.e += 1; p.setMem('sonderLetterDrop', true); },
  },

  {
    id: 'sonder_child_wave_window',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 52 && !G.mem?.sonderChildWaveWindow,
    text: 'A small child in a car waves at you from the back window. You wave back. The car turns a corner. You are aware that this was a complete exchange — the child will not remember it; you will not remember them. You are having a thought about time.',
    effect: (p) => { p.m += 1; p.setMem('sonderChildWaveWindow', true); },
  },

  {
    id: 'sonder_midnight_light',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 45 && !G.mem?.sonderMidnightLight,
    text: 'After midnight, one window in the building across the street is still lit. Someone is awake in there for reasons you will never know — working, grieving, nursing an infant, unable to sleep, finishing something, starting something, or simply still awake. The light goes out while you are watching it.',
    effect: (p) => { p.e += 1; p.setMem('sonderMidnightLight', true); },
  },

  {
    id: 'sonder_stranger_laugh',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 40 && !G.mem?.sonderStrangerLaugh,
    text: 'On the street, a woman you do not know and will never see again laughs at something the person with her has said. The laugh is genuine — something in it is not performed. For a moment you are glad she exists, and then she is gone, and you continue.',
    effect: (p) => { p.m += 1; p.setMem('sonderStrangerLaugh', true); },
  },

  {
    id: 'sonder_queue_grief',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 60 && !G.mem?.sonderQueueGrief,
    text: 'The man in the queue ahead of you buys the same things every week — you know this because you are in this queue every week — except that this week there is one of everything where there used to be two. You do not know if someone has moved out or died or simply stopped wanting the thing. You do not ask.',
    effect: (p) => { p.e += 1; p.setMem('sonderQueueGrief', true); },
  },

  {
    id: 'sonder_park_reader',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 60 && !G.mem?.sonderParkReader,
    text: 'In the park, an elderly man reads on the same bench at the same hour on the same day every week. You have passed him so many times that his absence would register before you understood the absence. He is an anchor. He doesn\'t know he is an anchor.',
    effect: (p) => { p.e += 1; p.setMem('sonderParkReader', true); },
  },

  {
    id: 'sonder_taxi_driver',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 45 && G.currentYear >= 1950 && !G.mem?.sonderTaxiDriver,
    text: 'The taxi driver, or the tuk-tuk driver, or whoever carries you through this city, is explaining something about the city\'s history that you would not have found in any guide. He does not know you will think about this for weeks. He is just filling the silence with something true.',
    effect: (p) => { p.e += 1; p.setMem('sonderTaxiDriver', true); },
  },

  {
    id: 'sonder_old_woman_market',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 58 && !G.mem?.sonderOldWomanMarket,
    text: 'At the market, an old woman is arranging her goods at the same stall where, you realise, she has probably been arranging them every morning for decades. The arrangement is exact and without hurry. The decades are in the arrangement.',
    effect: (p) => { p.e += 1; p.setMem('sonderOldWomanMarket', true); },
  },

  {
    id: 'sonder_hospital_rooftop',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.sonderHospitalRooftop,
    text: 'From the hospital window — or the window of the building opposite — a figure stands alone on a rooftop for a long time, not doing anything. They are looking at the city. Eventually they go back inside. You do not know what they were thinking about. You were watching because you were not sure they were all right.',
    effect: (p) => { p.e += 2; p.setMem('sonderHospitalRooftop', true); },
  },

  {
    id: 'sonder_wedding_photo',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.sonderWeddingPhoto,
    text: 'In a second-hand shop, or a market, or a house clearance sale, you find a wedding photograph. The couple is smiling. They are in the past. Their names are on the back in a handwriting that suggests a third person took them seriously. You put it down. You think about it on the way home.',
    effect: (p) => { p.e += 1; p.r += 1; p.setMem('sonderWeddingPhoto', true); },
  },

  {
    id: 'sonder_child_homework',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && G.age <= 55 && !G.mem?.sonderChildHomework,
    text: 'You pass a lit window and a child is at a table, doing homework. They are completely inside the task — the pen moving, the face concentrated. From outside, the lamp and the child and the table compose something that you cannot name but will not forget quickly.',
    effect: (p) => { p.m += 1; p.setMem('sonderChildHomework', true); },
  },

  {
    id: 'sonder_two_old_women',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 60 && !G.mem?.sonderTwoOldWomen,
    text: 'Two old women talking in the street, standing close, both talking at once, both listening. They have the ease of people who have been talking for sixty years and have found a way to do it simultaneously. The conversation is about everything and you pass through it and come out the other side.',
    effect: (p) => { p.e += 1; p.m += 1; p.setMem('sonderTwoOldWomen', true); },
  },

  {
    id: 'sonder_man_singing',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 38 && !G.mem?.sonderManSinging,
    text: 'A man working in the street — a repair, a delivery, an installation — is singing to himself. The song is not for anyone. He does not know you are hearing it. The sound of someone singing who does not know they are being heard is one of the most private sounds there is.',
    effect: (p) => { p.m += 1; p.setMem('sonderManSinging', true); },
  },

  {
    id: 'sonder_late_office_window',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 42 && G.currentYear >= 1950 && !G.mem?.sonderLateOfficeWindow,
    text: 'At eight in the evening, one office in the office building across the way is still lit. A figure at a desk, visible in silhouette. You are leaving. They are still there. You do not know if they are getting ahead or being left behind. Both can look the same from outside.',
    effect: (p) => { p.e += 1; p.setMem('sonderLateOfficeWindow', true); },
  },

  {
    id: 'sonder_prayer_beads',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 60 && !G.mem?.sonderPrayerBeads,
    text: 'On the bus or train, the person next to you runs their fingers along prayer beads without appearing to notice they are doing it. The motion is entirely automatic. Something is being measured or maintained in a register below ordinary consciousness.',
    effect: (p) => { p.e += 1; p.setMem('sonderPrayerBeads', true); },
  },

  {
    id: 'sonder_night_library',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 35 && G.currentYear >= 1950 && !G.mem?.sonderNightLibrary,
    text: 'The library at the end of the night, when most people have left. One or two others remain — at separate tables, in separate silences. You do not know what they are working on. They do not know what you are working on. The shared silence is its own form of companionship.',
    effect: (p) => { p.e += 1; p.m += 1; p.setMem('sonderNightLibrary', true); },
  },

  // ── MUNDANE LIFE — EXTENDED ────────────────────────────────────────────────────
  // More of the ordinary fabric. Gated by country, era, gender, career, life phase.

  {
    id: 'mundane_keys_table',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && G.age <= 38 && !G.mem?.mundaneKeysTable,
    text: 'The keys go on the table by the door. This has become automatic. You did not decide that the table by the door would be where the keys go. It assembled itself over weeks of arriving home and putting the keys somewhere. Now the keys go on the table by the door.',
    effect: (p) => { p.m += 1; p.setMem('mundaneKeysTable', true); },
  },

  {
    id: 'mundane_phrase_started_using',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 32 && G.age <= 55 && !G.mem?.mundanePhraseStartedUsing,
    text: 'You have started using a phrase you did not use before. You do not know exactly when you started. It sounds, to you, like something a person slightly older would say. You are slightly older.',
    effect: (p) => { p.r += 1; p.setMem('mundanePhraseStartedUsing', true); },
  },

  {
    id: 'mundane_specific_chair',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 60 && !G.mem?.mundaneSpecificChair,
    text: 'There is a chair in your home that is yours — not by declaration but by accumulated precedent. No one sits in it when you are in the room. You sit in it. This is the invisible hierarchy of domestic space.',
    effect: (p) => { p.m += 1; p.setMem('mundaneSpecificChair', true); },
  },

  {
    id: 'mundane_shortcut_learned',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 35 && !G.mem?.mundaneShortcutLearned,
    text: 'You found the shortcut this year. Not the obvious one — the other one, through the alley or across the courtyard or along the wall. The knowledge of it is a small local ownership.',
    effect: (p) => { p.m += 1; p.setMem('mundaneShortcutLearned', true); },
  },

  {
    id: 'mundane_thing_on_shelf',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 65 && !G.mem?.mundaneThingOnShelf,
    text: 'There is an object that has been on the same shelf for fifteen years. You stopped noticing it around year three. This year you noticed it again — by accident, in a particular light. It is still there. It has outlasted the reason you kept it.',
    effect: (p) => { p.e += 1; p.r += 1; p.setMem('mundaneThingOnShelf', true); },
  },

  {
    id: 'mundane_last_seen_face',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && !G.mem?.mundaneLastSeenFace,
    text: 'You thought of someone today — a person from a previous chapter of your life, someone you lost track of gradually without a single specific decision. You do not know where they are. You wonder, briefly, what their life looks like.',
    effect: (p) => { p.e += 1; p.r += 1; p.setMem('mundaneLastSeenFace', true); },
  },

  {
    id: 'mundane_night_kitchen',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 38 && !G.mem?.mundaneNightKitchen,
    text: 'You are in the kitchen at an hour you are not usually in the kitchen. The house is quiet. You eat something over the sink. There is a specific freedom in this that has no name.',
    effect: (p) => { p.m += 2; p.setMem('mundaneNightKitchen', true); },
  },

  {
    id: 'mundane_same_song_again',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 35 && !G.mem?.mundaneSameSongAgain,
    text: 'You have listened to the same song too many times to count this year. The number does not seem possible given how often you wanted it again. The song has gone into the layer of things you will associate with this period for the rest of your life.',
    effect: (p) => { p.m += 2; p.setMem('mundaneSameSongAgain', true); },
  },

  {
    id: 'mundane_first_winter_coat',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 30 && G.currentYear >= 1930 && !G.mem?.mundaneFirstWinterCoat,
    text: 'You bought a coat that is not the cheapest option available. The decision took longer than it should have. The coat is good. You wear it more than any coat before it. You understand now why people talk about coats the way they do.',
    effect: (p) => { p.m += 1; p.setMem('mundaneFirstWinterCoat', true); },
  },

  {
    id: 'mundane_good_pen',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 55 && G.currentYear >= 1920 && !G.mem?.mundaneGoodPen,
    text: 'There is a pen that writes the way a pen should write. You are careful about where it is. When someone borrows it, you notice. The preference for a specific pen is one of the small dignities of a working life.',
    effect: (p) => { p.m += 1; p.setMem('mundaneGoodPen', true); },
  },

  {
    id: 'mundane_letter_to_no_one',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.mundaneLetterToNoOne,
    text: 'You started writing something that was not a letter to anyone in particular. Not a diary. Not exactly. Something between remembering and accounting. You do not know if you will continue. You wrote three pages and left them in a drawer.',
    effect: (p) => { p.e += 2; p.setMem('mundaneLetterToNoOne', true); },
  },

  {
    id: 'mundane_neighbour_nod',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 60 && !G.mem?.mundaneNeighbourNod,
    text: 'There is a neighbour you have never spoken to beyond the nod of recognition. You have nodded at each other for years. The relationship is complete without words. If they moved, you would notice the absence.',
    effect: (p) => { p.m += 1; p.setMem('mundaneNeighbourNod', true); },
  },

  {
    id: 'mundane_television_years',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.currentYear >= 1955 && !G.mem?.mundaneTelevisionYears,
    text: 'If you added up the hours you have spent watching television, the number would be a significant fraction of your waking life. You have never thought of this carefully before. The thought passes.',
    effect: (p) => { p.e += 1; p.setMem('mundaneTelevisionYears', true); },
  },

  {
    id: 'mundane_work_acquaintance_left',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 55 && G.career && !G.mem?.mundaneWorkAcquaintanceLeft,
    text: 'Someone at work left — not a close colleague, but someone whose daily presence had become background. The desk is now occupied by someone else who will also eventually become background. You think about this for the length of a lunch.',
    effect: (p) => { p.e += 1; p.setMem('mundaneWorkAcquaintanceLeft', true); },
  },

  {
    id: 'mundane_childhood_home_smell',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.mundaneChildhoodHomeSmell,
    text: 'You caught a smell this year — something ordinary, something in a shop or a street or another person\'s kitchen — and for a fraction of a second you were somewhere else entirely, somewhere from your childhood. The specificity of the olfactory memory still surprises you.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('mundaneChildhoodHomeSmell', true); },
  },

  {
    id: 'mundane_train_missed',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 38 && G.currentYear >= 1950 && !G.mem?.mundaneTrainMissed,
    text: 'You missed the train by thirty seconds. You watched it leave. The next one is in an hour. You find a place to sit and think about what you would have done with that hour had it been given to you. You do the thing you thought of.',
    effect: (p) => { p.m += 1; p.setMem('mundaneTrainMissed', true); },
  },

  {
    id: 'mundane_number_memorised',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.mundaneNumberMemorised,
    text: 'There is a phone number you memorised decades ago and never had to look up, and the person it belongs to is gone, and the number is still there, intact, in the part of the memory that keeps things beyond their usefulness.',
    effect: (p) => { p.e += 1; p.r += 2; p.setMem('mundaneNumberMemorised', true); },
  },

  {
    id: 'mundane_friday_feeling',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 40 && G.career && !G.mem?.mundaneFridayFeeling,
    text: 'The specific quality of the Friday afternoon: the week finished, the weekend still ahead, the two days still unstructured and therefore still perfect. This has happened every week for years. The feeling has not diminished.',
    effect: (p) => { p.m += 2; p.setMem('mundaneFridayFeeling', true); },
  },

  {
    id: 'mundane_dream_recalled',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 28 && G.age <= 58 && !G.mem?.mundaneDreamRecalled,
    text: 'You remembered a dream into the afternoon, which is unusual. Most dreams leave by nine. This one stayed. You are not sure what it means and are not inclined to interpret it formally, but it occupied a specific corner of the day.',
    effect: (p) => { p.e += 1; p.setMem('mundaneDreamRecalled', true); },
  },

  {
    id: 'mundane_book_two_years',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 60 && !G.mem?.mundaneBookTwoYears,
    text: 'There is a book on your bedside table or your shelf that you have been about to read for two years. You are not sure why you haven\'t. The presence of the unread book is a small persistent fact of the life of this decade.',
    effect: (p) => { p.m += 1; p.setMem('mundaneBookTwoYears', true); },
  },

  {
    id: 'mundane_photograph_unseen',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.mundanePhotographUnseen,
    text: 'You find photographs you had forgotten existed. The person in some of them is you, but a version of you that is distant enough to examine with something approaching objectivity. That person did not know they were at the beginning of things.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('mundanePhotographUnseen', true); },
  },

  // ── MUNDANE — ERA AND COUNTRY SPECIFIC ────────────────────────────────────────

  {
    id: 'mundane_radio_family',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 6 && G.age <= 14 && G.currentYear >= 1930 && G.currentYear <= 1970 && !G.mem?.mundaneRadioFamily,
    text: 'In the evenings the family gathers around the radio the way your parents once gathered around something else. The radio speaks to everyone and to no one. You do not need to look at it. You listen.',
    effect: (p) => { p.m += 1; p.setMem('mundaneRadioFamily', true); },
  },

  {
    id: 'mundane_television_first_year',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 6 && G.age <= 16 && G.currentYear >= 1950 && G.currentYear <= 1975 && !G.mem?.mundaneTelevisionFirstYear,
    text: 'The television arrived this year or last year. The living room has rearranged itself around the fact of it. The evenings are different now. Not better, not worse — different in a way that is already becoming normal.',
    effect: (p) => { p.m += 1; p.setMem('mundaneTelevisionFirstYear', true); },
  },

  {
    id: 'mundane_internet_first',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 16 && G.age <= 30 && G.currentYear >= 1993 && G.currentYear <= 2002 && !G.mem?.mundaneInternetFirst,
    text: 'You used the internet for something real this year — something beyond novelty. The understanding that most of what you needed to know was now findable, if you knew the right words to search, arrived gradually and then all at once.',
    effect: (p) => { p.e += 1; p.setMem('mundaneInternetFirst', true); },
  },

  {
    id: 'mundane_mobile_phone_first',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 16 && G.age <= 35 && G.currentYear >= 1993 && G.currentYear <= 2005 && !G.mem?.mundaneMobilePhoneFirst,
    text: 'The mobile phone arrived in your pocket this year or last year. The change it made was not dramatic on any given day. Cumulatively it changed everything about being reachable, and therefore everything about the texture of the day.',
    effect: (p) => { p.m += 1; p.setMem('mundaneMobilePhoneFirst', true); },
  },

  {
    id: 'mundane_pension_form',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.age <= 52 && G.currentYear >= 1960 && G.career && !G.mem?.mundanePensionForm,
    text: 'You filled in a form about retirement this year. The retirement is still far enough to be theoretical. But the form required specific numbers, and the numbers made the theoretical more concrete. You filed it. You thought about it later.',
    effect: (p) => { p.r += 1; p.setMem('mundanePensionForm', true); },
  },

  {
    id: 'mundane_school_run_years',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 50 && G.children?.length > 0 && !G.mem?.mundaneSchoolRunYears,
    text: 'The school run is five minutes each way and you have done it — by now — enough times that the total hours constitute days. You have done it in rain and in heat and running late and early. The child who was carried is now the child who walks ahead.',
    effect: (p) => { p.m += 2; p.setMem('mundaneSchoolRunYears', true); },
  },

  {
    id: 'mundane_funeral_suit',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && G.age <= 60 && !G.mem?.mundaneFuneralSuit,
    text: 'You have worn the same dark suit or the same dark dress to funerals for fifteen years. It is the correct garment. You do not own a better one and do not need to.',
    effect: (p) => { p.e += 1; p.setMem('mundaneFuneralSuit', true); },
  },

  {
    id: 'mundane_night_three_am',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 60 && !G.mem?.mundaneNightThreeAm,
    text: 'You woke at three in the morning with a thought that did not warrant waking at three in the morning. The thought knows no proportionality. You lay with it for an hour. It dissolved into sleep before it resolved.',
    effect: (p) => { p.e += 1; p.setMem('mundaneNightThreeAm', true); },
  },

  {
    id: 'mundane_decade_birthday',
    phase: 'midlife',
    weight: 2,
    when: (G) => (G.age === 40 || G.age === 50 || G.age === 60) && !G.mem?.mundaneDecadeBirthday,
    text: 'The decade birthday arrived with more weight than the ones before it. Not grief exactly. Something else — the sense that the number has rearranged what is expected of the remaining years. You are the same person who was nine years younger. The category has shifted.',
    effect: (p) => { p.r += 1; p.e += 2; p.setMem('mundaneDecadeBirthday', true); },
  },

  {
    id: 'mundane_letter_kept',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.mundaneLetterKept,
    text: 'There are letters you have kept. You have not read most of them in twenty years, but you know where they are. Their presence is the point. They are the evidence of something.',
    effect: (p) => { p.e += 1; p.r += 1; p.setMem('mundaneLetterKept', true); },
  },

  // ── MUNDANE — OCCUPATION SPECIFIC ─────────────────────────────────────────────

  {
    id: 'mundane_teacher_june',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.field === 'education' && G.age >= 28 && !G.mem?.mundaneTeacherJune,
    text: 'The end of the school year has its own quality: the rooms quiet, the desks empty, the particular exhaustion of thirty-eight weeks of other people\'s growth. You close the door of the classroom. You will not enter it again for six weeks. This is not nothing.',
    effect: (p) => { p.m += 2; p.setMem('mundaneTeacherJune', true); },
  },

  {
    id: 'mundane_nurse_handover',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.career?.field === 'healthcare' && G.age >= 22 && G.age <= 45 && !G.mem?.mundaneNurseHandover,
    text: 'The handover at the shift change: the quick run through each patient, the tone of voice that conveys more than the words, the colleague who takes over and whom you trust with what you are leaving. You go home. The ward continues.',
    effect: (p) => { p.m += 1; p.setMem('mundaneNurseHandover', true); },
  },

  {
    id: 'mundane_farmer_almanac',
    phase: 'midlife',
    weight: 2,
    when: (G) => (G.career?.field === 'agriculture' || G.mem?.subsistenceFarmer) && G.age >= 28 && !G.mem?.mundaneFarmerAlmanac,
    text: 'The almanac — or the knowledge accumulated without almanacs — says it is time to plant. You plant. Whether the rains agreed is what the next months will answer.',
    effect: (p) => { p.m += 1; p.setMem('mundaneFarmerAlmanac', true); },
  },

  {
    id: 'mundane_soldier_downtime',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.flags.has('conscripted') || G.flags.has('soldier') || G.flags.has('veteran')) && G.age >= 18 && G.age <= 40 && !G.mem?.mundaneSoldierDowntime,
    text: 'The waiting between things. Military life is primarily waiting — for the order, for the transport, for the rotation. In the waiting, the ordinary surfaces: the card game, the letter written slowly, the argument about something small.',
    effect: (p) => { p.m += 1; p.setMem('mundaneSoldierDowntime', true); },
  },

  // ── MUNDANE — GENDER SPECIFIC (EXTENDED) ──────────────────────────────────────

  {
    id: 'mundane_woman_name_changed',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character?.gender === 'female' && G.partner && G.age >= 20 && G.age <= 35 && !G.mem?.mundaneWomanNameChanged,
    text: 'Your name has changed, or there was the question of whether your name would change, or you are still being introduced by a name that no longer exactly belongs to the identity it belonged to. The administration of this takes longer than expected.',
    effect: (p) => { p.e += 1; p.setMem('mundaneWomanNameChanged', true); },
  },

  {
    id: 'mundane_man_asking_directions',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character?.gender === 'male' && G.age >= 18 && G.age <= 45 && !G.mem?.mundaneManAskingDirections,
    text: 'You needed to ask directions. The asking of directions requires a specific recalibration for someone who does not usually ask for directions. You asked. You were given accurate information. You got there.',
    effect: (p) => { p.m += 1; p.setMem('mundaneManAskingDirections', true); },
  },

  {
    id: 'mundane_pregnancy_invisible',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character?.gender === 'female' && G.age >= 22 && G.age <= 42 && !G.mem?.mundanePregnancyInvisible,
    text: 'The early weeks of a pregnancy — or the months of trying, or the months of not trying — when the body is engaged in something enormous and no one can see it. The ordinary continues around something that is not ordinary.',
    effect: (p) => { p.e += 1; p.setMem('mundanePregnancyInvisible', true); },
  },

  // ── MUNDANE — RELIGION SPECIFIC (EXTENDED) ────────────────────────────────────

  {
    id: 'mundane_ramadan_fast_end',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character?.religion?.startsWith('muslim') && G.age >= 15 && !G.mem?.mundaneRamadanFastEnd,
    text: 'The last days of Ramadan: the exhaustion and the completeness together. Thirty days arrived and thirty days were fulfilled. The iftar tonight is the same as the ones before it and also different because it is the last one this year.',
    effect: (p) => { p.m += 2; p.karma += 1; p.setMem('mundaneRamadanFastEnd', true); },
  },

  {
    id: 'mundane_church_christmas',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.character?.religion?.startsWith('christian') && G.age >= 6 && G.age <= 16 && !G.mem?.mundaneChurchChristmas,
    text: 'Christmas at the church is different from Christmas at home — the candles, the hymns that only come once a year, the congregation somehow larger and also more itself. You know this service by heart now. The knowing is part of what it is.',
    effect: (p) => { p.m += 2; p.setMem('mundaneChurchChristmas', true); },
  },

  {
    id: 'mundane_high_holidays',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.character?.religion === 'jewish' && G.age >= 25 && !G.mem?.mundaneHighHolidays,
    text: 'The High Holidays again. The year is counted, accounted for, and opened. The same prayers as last year and the year before. The same people — fewer, now, than in the years before — in the same seats.',
    effect: (p) => { p.m += 1; p.r += 1; p.setMem('mundaneHighHolidays', true); },
  },

  {
    id: 'mundane_diwali_lights',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.character?.religion === 'hindu' && G.age >= 5 && G.age <= 16 && !G.mem?.mundaneDiwaliLights,
    text: 'Diwali: the diyas lit, the sweets distributed, the sky punctuated with firecrackers. The preparations took days. The evening takes hours. By midnight the street is quiet again and the lamps are burning down.',
    effect: (p) => { p.m += 2; p.setMem('mundaneDiwaliLights', true); },
  },

  // ── MUNDANE — CHILDHOOD AND SCHOOL ────────────────────────────────────────────

  {
    id: 'mundane_desk_neighbour',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 6 && G.age <= 14 && !G.mem?.mundaneDeskNeighbour,
    text: 'You sat next to the same person in the same class for a year. By the end of the year you knew their handwriting, their smell, their way of opening the desk. You did not particularly choose this. Proximity made you intimate with the details.',
    effect: (p) => { p.m += 1; p.setMem('mundaneDeskNeighbour', true); },
  },

  {
    id: 'mundane_playground_game_rules',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 6 && G.age <= 12 && !G.mem?.mundanePlaygroundGameRules,
    text: 'The game has rules that evolved without anyone writing them down. Everyone who plays this game knows the rules and no one outside this group knows them. The rules are as real as anything.',
    effect: (p) => { p.m += 1; p.setMem('mundanePlaygroundGameRules', true); },
  },

  {
    id: 'mundane_school_corridor_smell',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 16 && !G.mem?.mundaneSchoolCorridorSmell,
    text: 'School has a smell that is the same regardless of which school and which country — a compound of cleaning fluid and paper and children and the particular neutrality of institutional space. You will smell it decades later and be briefly elsewhere.',
    effect: (p) => { p.m += 1; p.setMem('mundaneSchoolCorridorSmell', true); },
  },

  {
    id: 'mundane_teacher_whose_name',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 8 && G.age <= 16 && !G.mem?.mundaneTeacherWhoseName,
    text: 'One teacher whose name you will still know at eighty. Not because they were the favourite — although perhaps they were — but because something in the way they spoke to you was the first time you understood that an adult could take you seriously.',
    effect: (p) => { p.e += 2; p.s += 1; p.setMem('mundaneTeacherWhoseName', true); },
  },

  {
    id: 'mundane_summer_long',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 14 && !G.mem?.mundaneSummerLong,
    text: 'The long summer — or the equivalent in the places that do not have summers — when school is not and time is elastic. The days were longer then than they have been since. This is not nostalgia. It is physics: the same hours occupying more of the available life.',
    effect: (p) => { p.m += 2; p.setMem('mundaneSummerLong', true); },
  },

  // ── MUNDANE — LATE LIFE ────────────────────────────────────────────────────────

  {
    id: 'mundane_retirement_morning',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.career && !G.mem?.mundaneRetirementMorning,
    text: 'The first year after work: mornings are different when no one is waiting. At first this was disorienting. You have been building a different architecture of the day — slower, without the clock, with time for the things the clock used to make impossible.',
    effect: (p) => { p.m += 2; p.r += 1; p.setMem('mundaneRetirementMorning', true); },
  },

  {
    id: 'mundane_grandchild_first',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 55 && G.children?.length > 0 && !G.mem?.mundaneGrandchildFirst,
    text: 'The grandchild arrived, or is arriving, or the children are at the age when this becomes possible. You are at a remove from what you were before. The love is the same and also different — less desperate, less constant, more purely glad.',
    effect: (p) => { p.m += 3; p.setMem('mundaneGrandchildFirst', true); },
  },

  {
    id: 'mundane_old_address_book',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && G.currentYear >= 1950 && !G.mem?.mundaneOldAddressBook,
    text: 'You found the old address book. More than half the addresses are out of date. Some of the people have moved. Some of the people have died. The book is a record of a moment in the life that no longer exists as described.',
    effect: (p) => { p.e += 1; p.r += 2; p.setMem('mundaneOldAddressBook', true); },
  },

  {
    id: 'mundane_long_nap',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.mundaneLongNap,
    text: 'The afternoon nap — once the indulgence of the ill or the weekend — has become an ordinary part of the day\'s structure. You do not resist it. The body requires its portion of sleep across the whole day now, not just the night. You sleep. You wake refreshed.',
    effect: (p) => { p.m += 2; p.setMem('mundaneLongNap', true); },
  },

  {
    id: 'mundane_doctor_relationship',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.mundaneDoctorRelationship,
    text: 'The relationship with your doctor has evolved. It is no longer the visit for the acute problem. It is the ongoing conversation about the body\'s trends. The doctor says something and you understand more of it than you once did. This is a form of literacy.',
    effect: (p) => { p.e += 1; p.setMem('mundaneDoctorRelationship', true); },
  },

  {
    id: 'mundane_same_walk',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.mundaneSameWalk,
    text: 'You walk the same route you have walked for years. The route is known to the body. You do not plan the turn. You take it. The walk is its own sufficient thing.',
    effect: (p) => { p.m += 2; p.setMem('mundaneSameWalk', true); },
  },

  // ── STRANGER GLIMPSES — CULTURAL SPECIFIC ─────────────────────────────────
  // Sonder moments grounded in specific places, contexts, and ways of moving through a city.

  {
    id: 'sonder_danfo_bus',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentCountry === 'Nigeria' && G.age >= 18 && G.age <= 42 && !G.mem?.sonderDanfoBus,
    text: 'In the danfo, the woman beside you reads a Bible with one thumb while her other hand holds the market bag on her lap. She is completely elsewhere — wherever the reading has taken her. The bus lurches through traffic. The bag shifts. Her thumb does not move from the page.',
    effect: (p) => { p.e += 1; p.setMem('sonderDanfoBus', true); },
  },

  {
    id: 'sonder_chai_stall',
    phase: 'young_adult',
    weight: 2,
    when: (G) => ['India', 'Pakistan', 'Bangladesh'].includes(G.currentCountry) && G.age >= 18 && G.age <= 45 && !G.mem?.sonderChaiStall,
    text: 'The chai wallah at the corner is pouring four glasses simultaneously while chatting to a fifth person and collecting coin from a sixth. The motion belongs to someone who has done this ten thousand times. He does not appear to be managing it. He appears to be doing something else while it happens.',
    effect: (p) => { p.e += 1; p.setMem('sonderChaiStall', true); },
  },

  {
    id: 'sonder_night_market_table',
    phase: 'midlife',
    weight: 2,
    when: (G) => ['Thailand', 'Vietnam', 'Malaysia', 'Cambodia', 'Laos', 'Myanmar', 'Taiwan', 'South Korea', 'China'].includes(G.currentCountry) && G.age >= 25 && G.age <= 58 && !G.mem?.sonderNightMarketTable,
    text: 'At the night market, a family occupies a corner table — grandmother, parents, two children, a teenager with a phone. They are entirely ordinary and entirely specific. The grandmother peels a shrimp without looking at it. The father glances at the street and comes back.',
    effect: (p) => { p.e += 1; p.m += 1; p.setMem('sonderNightMarketTable', true); },
  },

  {
    id: 'sonder_coffee_house_game',
    phase: 'midlife',
    weight: 2,
    when: (G) => ['Egypt', 'Algeria', 'Tunisia', 'Morocco', 'Jordan', 'Lebanon', 'Syria', 'Turkey'].includes(G.currentCountry) && G.age >= 25 && G.age <= 62 && !G.mem?.sonderCoffeeHouseGame,
    text: 'In the coffee house, two men have played backgammon for an hour without speaking. The pieces move. The silence between moves belongs to people who have played together so long they no longer need to narrate the game to each other.',
    effect: (p) => { p.e += 1; p.m += 1; p.setMem('sonderCoffeeHouseGame', true); },
  },

  {
    id: 'sonder_apartment_block_cleaner',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.character?.country?.archetype === 'post_soviet' && G.age >= 25 && G.age <= 62 && !G.mem?.sonderApartmentCleaner,
    text: 'The woman who cleans the stairwell has been doing it every Tuesday morning for as long as you have lived here. You have said perhaps twenty words to each other across six years. She knows your post box number. You do not know her name. Neither of you has required correction.',
    effect: (p) => { p.e += 1; p.setMem('sonderApartmentCleaner', true); },
  },

  {
    id: 'sonder_east_africa_rain',
    phase: 'young_adult',
    weight: 2,
    when: (G) => ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Zambia', 'Zimbabwe', 'Ethiopia'].includes(G.currentCountry) && G.age >= 18 && G.age <= 40 && !G.mem?.sonderEastAfricaRain,
    text: 'Through the matatu window, a woman walks fast in the rain holding a flat bag over her head. She is not running. She has calculated how wet she will get and has accepted it. You pass her. She disappears into the back window.',
    effect: (p) => { p.e += 1; p.setMem('sonderEastAfricaRain', true); },
  },

  {
    id: 'sonder_friday_prayer_courtyard',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.character?.religion?.startsWith('muslim') && G.age >= 28 && G.age <= 65 && !G.mem?.sonderFridayPrayerCourtyard,
    text: 'After Friday prayer, men talk in the courtyard in groups sorted by age and neighbourhood and how long they have known each other — an arrangement no one decided. An old man stands at the edge alone, watching. He is not excluded. He is the one who sees.',
    effect: (p) => { p.e += 1; p.m += 1; p.setMem('sonderFridayPrayerCourtyard', true); },
  },

  {
    id: 'sonder_latin_evening_window',
    phase: 'midlife',
    weight: 2,
    when: (G) => ['Mexico', 'Colombia', 'Brazil', 'Argentina', 'Chile', 'Peru', 'Venezuela', 'Ecuador', 'Bolivia', 'Uruguay', 'Paraguay', 'Guatemala', 'El Salvador', 'Honduras', 'Nicaragua', 'Costa Rica'].includes(G.currentCountry) && G.age >= 28 && G.age <= 55 && !G.mem?.sonderLatinEveningWindow,
    text: 'Through an open window on the evening walk, you hear oil in a pan, a radio, a woman responding to something on the screen. The whole of an ordinary evening is in those sounds. You are on the pavement, on your way somewhere, and then you are past it.',
    effect: (p) => { p.m += 1; p.setMem('sonderLatinEveningWindow', true); },
  },

  {
    id: 'sonder_checkpoint_young_soldier',
    phase: 'young_adult',
    weight: 2,
    when: (G) => ['conflict_zone', 'developing_unstable'].includes(G.character?.country?.archetype) && G.age >= 18 && G.age <= 42 && !G.mem?.sonderCheckpointYoungSoldier,
    text: 'The soldier at the checkpoint is twenty, possibly twenty-one. He checks your document and returns it without looking at your face. He is doing this the way you do your own work — a task repeated many times a day until it becomes motion without intention. You walk through. He returns to waiting.',
    effect: (p) => { p.e += 1; p.setMem('sonderCheckpointYoungSoldier', true); },
  },

  {
    id: 'sonder_market_head_balance',
    phase: 'midlife',
    weight: 2,
    when: (G) => ['subsaharan', 'developing_urban'].includes(G.character?.country?.archetype) && G.age >= 28 && G.age <= 55 && !G.mem?.sonderMarketHeadBalance,
    text: 'A woman at the market has balanced a tray on her head for so many years that she does it without thought — reaching for a purse, turning to call to a child, all while the tray holds still. The skill is total. You have not learned anything to this degree.',
    effect: (p) => { p.e += 1; p.setMem('sonderMarketHeadBalance', true); },
  },

  {
    id: 'sonder_temple_morning_keeper',
    phase: 'midlife',
    weight: 2,
    when: (G) => (G.character?.religion === 'buddhist' || G.character?.religion === 'hindu') && ['Thailand', 'Vietnam', 'Cambodia', 'Myanmar', 'Laos', 'Sri Lanka', 'India', 'Nepal'].includes(G.currentCountry) && G.age >= 25 && G.age <= 60 && !G.mem?.sonderTempleMorningKeeper,
    text: 'At the temple in the early morning, a man you have seen here before tends a lamp and some flowers with the efficiency of long practice. He does not appear to be praying. He appears to be keeping an arrangement that predates him.',
    effect: (p) => { p.e += 1; p.m += 1; p.setMem('sonderTempleMorningKeeper', true); },
  },

  {
    id: 'sonder_night_market_alone',
    phase: 'late_life',
    weight: 2,
    when: (G) => ['Thailand', 'Vietnam', 'Cambodia', 'Laos', 'Myanmar', 'Malaysia', 'Indonesia', 'Philippines'].includes(G.currentCountry) && G.age >= 55 && !G.mem?.sonderNightMarketAlone,
    text: 'A woman eats alone at a corner table in the night market with a serenity the noise around her cannot touch. She works through her meal with full attention. Around her, the market at its loudest. She does not appear to hear it.',
    effect: (p) => { p.e += 1; p.m += 1; p.setMem('sonderNightMarketAlone', true); },
  },

  // ── STRANGER GLIMPSES — CHILDHOOD PERSPECTIVE ─────────────────────────────
  // Children notice other lives too, in the limited and total way children notice things.

  {
    id: 'sonder_lit_house_across',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 6 && G.age <= 11 && !G.mem?.sonderLitHouseAcross,
    text: 'The neighbour\'s house is lit in the evenings and you can see the shapes of people moving through the rooms. They do not know you are watching. Something about lit-up houses belonging to people you do not know is interesting in a way you do not yet have a word for.',
    effect: (p) => { p.e += 1; p.setMem('sonderLitHouseAcross', true); },
  },

  {
    id: 'sonder_adult_crying_table',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 12 && !G.mem?.sonderAdultCryingTable,
    text: 'You see an adult crying — not at a funeral, not in the context that makes it make sense to you. Just at a table, or on the step outside, in the middle of an ordinary day. Adults cry for reasons you do not yet have. The world is larger than the reasons you know the names of.',
    effect: (p) => { p.e += 2; p.setMem('sonderAdultCryingTable', true); },
  },

  {
    id: 'sonder_old_person_world',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.age >= 7 && G.age <= 13 && !G.mem?.sonderOldPersonWorld,
    text: 'An old person tells you something about what the world was like when they were young. The world they describe does not exist anymore. You understand, without having words for it yet, that you are talking to someone from a different time — and that this is strange and ordinary at once.',
    effect: (p) => { p.e += 2; p.setMem('sonderOldPersonWorld', true); },
  },

  // ── CONTEMPLATION — LATE LIFE ─────────────────────────────────────────────
  // Late-life sonder has a different quality: the accumulation of other lives now visible in aggregate.

  {
    id: 'sonder_city_palimpsest',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.sonderCityPalimpsest,
    text: 'Walking through the part of the city that was different when you were thirty, you pass a café where a different building was, a wall where a different wall was. The city is conducting its own continuous life around the fixed points of your memory. You are, in certain respects, a tourist in a place that is yours.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderCityPalimpsest', true); },
  },

  {
    id: 'sonder_obituary_same_age',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.sonderObitSameAge,
    text: 'You read an obituary of someone your age. You did not know them. It lists their work, their family, what they loved. You read it to the end. This has started happening more often — the reading of obituaries of people you have never met, each one to its end.',
    effect: (p) => { p.e += 1; p.r += 2; p.setMem('sonderObitSameAge', true); },
  },

  {
    id: 'sonder_generations_street',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && !G.mem?.sonderGenerationsStreet,
    text: 'The children on this street play a game you do not know the rules of. The rules have changed since your children played here. The children before them also played with rules that changed. The street stays. The rules turn over every generation.',
    effect: (p) => { p.e += 1; p.setMem('sonderGenerationsStreet', true); },
  },

  {
    id: 'sonder_bench_thirty_years',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 68 && !G.mem?.sonderBenchThirtyYears,
    text: 'You sit at a bench where you have been sitting, at this hour, for thirty years. The bench is not the same bench — it was replaced twice — but the view and the hour are the same. In this arrangement, you are the constant.',
    effect: (p) => { p.m += 2; p.r += 1; p.setMem('sonderBenchThirtyYears', true); },
  },

  {
    id: 'sonder_grandchild_question',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 65 && G.children?.length > 0 && !G.mem?.sonderGrandchildQuestion,
    text: 'A child asks you what something was like when you were young. You describe it. The child listens with the particular patience of someone for whom this is not memory but story. The distance between what you remember and what they can imagine is the length of a century.',
    effect: (p) => { p.e += 2; p.m += 1; p.setMem('sonderGrandchildQuestion', true); },
  },

  // ── SECOND EXPANSION BATCH ────────────────────────────────────────────────

  {
    id: 'sonder_older_couple_shorthand',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 14 && !G.mem?.sonderOlderCoupleShorthand,
    text: 'Two people at a nearby table communicate in a language built entirely from incomplete sentences. They have been having this conversation for so long that the nouns are no longer necessary. You watch them finish each other\'s thoughts without noticing that they are doing it. You wonder what it costs to get there.',
    effect: (p) => { p.e += 2; p.setMem('sonderOlderCoupleShorthand', true); },
  },

  {
    id: 'sonder_sleeping_commuter',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 13 && G.ruralUrban === 'urban' && G.currentYear >= 1950 && !G.mem?.sonderSleepingCommuter,
    text: 'A man is asleep on the bus, still in his work clothes. His head tips toward the window. He wakes at the right stop without an alarm — the body learning the distance by repetition until the distance becomes the alarm. You wonder how many years it takes to train a body to know when to wake.',
    effect: (p) => { p.e += 1; p.setMem('sonderSleepingCommuter', true); },
  },

  {
    id: 'sonder_parent_old_photo',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 13 && !G.mem?.sonderParentOldPhoto,
    text: 'You find a photograph of your parents before you existed. They are young in it — younger than you are now. They are looking at something outside the frame. You have never met these people. You know only the version of them that already had you in it.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderParentOldPhoto', true); },
  },

  {
    id: 'sonder_rural_distant_field',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.ruralUrban === 'rural' && !G.mem?.sonderRuralDistantField,
    text: 'Far across the field, your neighbour is working. They are small at this distance, a figure moving in a methodical way that means the same task has been done many times. You cannot hear anything. The field between you is very large.',
    effect: (p) => { p.e += 1; p.setMem('sonderRuralDistantField', true); },
  },

  {
    id: 'sonder_road_traveller',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.ruralUrban === 'rural' && !G.mem?.sonderRoadTraveller,
    text: 'Someone passes on the road carrying more than is comfortable. They do not stop. They do not look at you. Where they came from and where they are going with that weight is a complete story. You will not know any of it.',
    effect: (p) => { p.e += 2; p.setMem('sonderRoadTraveller', true); },
  },

  {
    id: 'sonder_village_elder_road',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.ruralUrban === 'rural' && G.age >= 35 && !G.mem?.sonderVillageElderRoad,
    text: 'The old man sits where he has always sat, facing the road. You ask him once what he watches for. He says he is not watching for anything. He says the road is different from the fields — something comes in from the road. The fields already know what they are.',
    effect: (p) => { p.e += 2; p.setMem('sonderVillageElderRoad', true); },
  },

  {
    id: 'sonder_woman_keys_night',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character?.gender === 'female' && !G.mem?.sonderWomanKeysNight,
    text: 'Coming home late, you hold your keys in a particular way — one between two fingers — that you do not remember being taught. Other women you know do the same without any of you having discussed it. It is the kind of knowledge that travels without being written down.',
    effect: (p) => { p.e += 1; p.setMem('sonderWomanKeysNight', true); },
  },

  {
    id: 'sonder_invisible_older_woman',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.character?.gender === 'female' && G.age >= 46 && !G.mem?.sonderInvisibleOlderWoman,
    text: 'An older woman stands at the edge of the group and no one introduces her. You notice that she has stopped insisting. It is not resignation. She has moved her attention to things that don\'t require introduction.',
    effect: (p) => { p.e += 2; p.setMem('sonderInvisibleOlderWoman', true); },
  },

  {
    id: 'sonder_doorway_watching_child',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.children?.length > 0 && G.age >= 28 && !G.mem?.sonderDoorwayWatchingChild,
    text: 'You stand in the doorway a moment longer than you meant to. They are asleep. Their breathing is audible from here. Everything about how small they still are is something you know you will forget by the time they are older. You know this and look a little longer.',
    effect: (p) => { p.m += 3; p.setMem('sonderDoorwayWatchingChild', true); },
  },

  {
    id: 'sonder_colleague_desk_photo',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career && G.age >= 36 && !G.mem?.sonderColleagueDeskPhoto,
    text: 'After years of sitting near the photograph on his desk, you finally learn who is in it. It is not who you had assumed. The brief explanation rearranges years of assumptions about who he is. You had not known you were making those assumptions.',
    effect: (p) => { p.e += 2; p.setMem('sonderColleagueDeskPhoto', true); },
  },

  {
    id: 'sonder_office_cleaners_dawn',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.career && G.ruralUrban === 'urban' && G.currentYear >= 1950 && !G.mem?.sonderOfficeCleanersDawn,
    text: 'You arrive early enough to pass the cleaners leaving. They nod. They are finishing a shift. The building you are about to spend your day in was their workplace first. The coffee you will make later is in a mug they already cleaned.',
    effect: (p) => { p.e += 1; p.setMem('sonderOfficeCleanersDawn', true); },
  },

  {
    id: 'sonder_retirement_true_thing',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career && G.age >= 40 && !G.mem?.sonderRetirementTrueThing,
    text: 'At the leaving party, the person who is retiring says one true thing in a speech that is otherwise very polite. They say it quietly, almost as an aside. It is the most honest sentence you have heard anyone speak in this building.',
    effect: (p) => { p.e += 2; p.setMem('sonderRetirementTrueThing', true); },
  },

  {
    id: 'sonder_telegram_nearby_house',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.currentYear >= 1939 && G.currentYear <= 1965 && !G.mem?.sonderTelegramNearbyHouse,
    text: 'The telegram boy stops two houses down. You watch from the window without knowing why watching feels necessary. The door opens. Then the door closes. What you just witnessed from a distance will be someone\'s entire year.',
    effect: (p) => { p.e += 2; p.setMem('sonderTelegramNearbyHouse', true); },
  },

  {
    id: 'sonder_tv_shop_window',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.currentYear >= 1952 && G.currentYear <= 1970 && !G.mem?.sonderTvShopWindow,
    text: 'A television plays in the shop window and a small crowd has gathered. No one knows each other. They stand together watching something that — in a few years — everyone will have in their own home and watch alone. Right now, though, they are watching it together.',
    effect: (p) => { p.e += 2; p.m += 1; p.setMem('sonderTvShopWindow', true); },
  },

  {
    id: 'sonder_counting_coins_counter',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonderCountingCoinsCounter,
    text: 'The man at the counter counts his coins slowly. There are not quite enough. He counts them again. He puts one item back. Nobody in the line says anything. He takes his things and goes without looking at anyone.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderCountingCoinsCounter', true); },
  },

  {
    id: 'sonder_meal_divided_precisely',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.sonderMealDividedPrecisely,
    text: 'At the table nearby, the food is divided with a precision that suggests the calculation has been made many times. The children get more. The parents take less without commenting on it. The children eat without noticing. The parents do not want them to notice.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderMealDividedPrecisely', true); },
  },

  {
    id: 'sonder_church_between_services',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonderChurchBetweenServices,
    text: 'A woman sits alone in the church between services. She has not come for the service. The building is available to her in this hour in a way it is not when it is full of purpose. She sits without praying, or with a prayer that has no outward form.',
    effect: (p) => { p.e += 1; p.setMem('sonderChurchBetweenServices', true); },
  },

  {
    id: 'sonder_hospital_ward_night',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 35 && !G.mem?.sonderHospitalWardNight,
    text: 'Passing the hospital at night, you look up at the lit windows. They look like any other lit windows except that the people behind them did not choose to be there tonight. The different kind of night that those rooms contain goes on behind glass, visible and separate.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderHospitalWardNight', true); },
  },

  {
    id: 'sonder_last_village_light',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.ruralUrban === 'rural' && G.age >= 55 && !G.mem?.sonderLastVillageLight,
    text: 'Without deciding to, you have started tracking which house goes dark last. Not every night, but most nights. A family you do not know well. You know their light, though. Sometime after midnight they turn it off and the village becomes all the same dark.',
    effect: (p) => { p.e += 1; p.m += 1; p.setMem('sonderLastVillageLight', true); },
  },

  {
    id: 'sonder_last_bus_population',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && G.currentYear >= 1950 && !G.mem?.sonderLastBusPopulation,
    text: 'The last bus carries its specific population: the shift workers, the people who stayed out too late, the ones who missed everything earlier. No one is going to the same place. The only thread connecting them is the hour and the fact that this is the last one.',
    effect: (p) => { p.e += 2; p.setMem('sonderLastBusPopulation', true); },
  },

  {
    id: 'sonder_own_gesture_stranger',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.sonderOwnGestureStranger,
    text: 'Someone across the room makes a gesture you recognise — a particular way of carrying weight, the slight turn of the head when listening. It takes a moment to understand: it is the gesture you make. This person you have never met moves as you move. You wonder if either of you learned it or arrived at it separately.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderOwnGestureStranger', true); },
  },

  {
    id: 'sonder_own_street_as_stranger',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.sonderOwnStreetStranger,
    text: 'For a moment, walking down your own street, you see it as someone arriving for the first time would see it — the uneven paving, the angle of the afternoon light, the specific smell of it. You have been seeing past all of this for years. In the instant before familiarity reasserts itself, you see the street, not your street.',
    effect: (p) => { p.e += 2; p.setMem('sonderOwnStreetStranger', true); },
  },

  {
    id: 'sonder_elevator_grief',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && G.age >= 32 && !G.mem?.sonderElevatorGrief,
    text: 'In the elevator, a woman holds a box with both hands and is trying not to cry. Whatever is in the box or what the box means: a whole life happening in this small space between floors. She gets out. The doors close.',
    effect: (p) => { p.e += 2; p.setMem('sonderElevatorGrief', true); },
  },

  {
    id: 'sonder_flatmate_phone_wall',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 18 && G.age <= 26 && !G.mem?.sonderFlatmatePhoneWall,
    text: 'Through the wall you can hear your flatmate on the phone — not the words but the tone. The particular register of someone having a conversation they have been dreading. There is a whole life on the other side of that wall that you have been living next to without knowing.',
    effect: (p) => { p.e += 2; p.setMem('sonderFlatmatePhoneWall', true); },
  },

  {
    id: 'sonder_train_lips_moving',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && G.currentYear >= 1940 && !G.mem?.sonderTrainLipsMoving,
    text: 'A man on the train closes his eyes and his lips move slightly. You cannot tell if he is praying, rehearsing, or remembering. He opens his eyes at his stop and leaves without knowing you saw.',
    effect: (p) => { p.e += 1; p.setMem('sonderTrainLipsMoving', true); },
  },

  {
    id: 'sonder_served_by_younger_self',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career && G.age >= 38 && !G.mem?.sonderServedByYoungerSelf,
    text: 'The person serving you is the age you were when you first worked this kind of job. The same slightly-too-attentive posture, the same way of managing a difficult moment with a patience that costs something. You tip more than usual and do not explain why.',
    effect: (p) => { p.m += 1; p.karma += 1; p.setMem('sonderServedByYoungerSelf', true); },
  },

  {
    id: 'sonder_letter_wrong_address',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentYear >= 1930 && G.currentYear <= 1990 && !G.mem?.sonderLetterWrongAddress,
    text: 'A letter arrives addressed to someone who does not live here. You return it to the post box. The name on it is someone you do not know. Their correspondence is continuing without them somewhere, addressed to an address that was once theirs.',
    effect: (p) => { p.e += 1; p.setMem('sonderLetterWrongAddress', true); },
  },

  {
    id: 'sonder_stranger_crying_platform',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && G.currentYear >= 1940 && !G.mem?.sonderStrangerCryingPlatform,
    text: 'A woman on the platform is crying in the particular way of someone who hoped they could stop by now. She watches the arrivals board. You do not know if she is waiting for someone or has just said goodbye. Either way it is a complete story you have only seen the middle of.',
    effect: (p) => { p.e += 2; p.setMem('sonderStrangerCryingPlatform', true); },
  },

  {
    id: 'sonder_neighbour_light_same_hour',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 34 && !G.mem?.sonderNeighbourLightSameHour,
    text: 'The light in the apartment across from yours comes on at the same time most evenings. You have never met this person. You know their schedule without having asked for it. There is a whole life in that rhythm that has been running parallel to yours for years.',
    effect: (p) => { p.e += 1; p.setMem('sonderNeighbourLightSameHour', true); },
  },

  // ── THIRD EXPANSION BATCH ─────────────────────────────────────────────────

  {
    id: 'sonder_busker_one_listener',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && G.currentYear >= 1930 && !G.mem?.sonderBuskerOneListener,
    text: 'The busker is playing to almost no one. One person has stopped and is listening with total attention. Everyone else passes through. You wonder which of those two experiences is closer to what the busker hoped for.',
    effect: (p) => { p.e += 2; p.setMem('sonderBuskerOneListener', true); },
  },

  {
    id: 'sonder_radio_singing_alone',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.currentYear >= 1935 && !G.mem?.sonderRadioSingingAlone,
    text: 'Music comes from the next room. An adult you know is singing along, not performing — the unguarded singing of someone who does not know they are being heard. You stay where you are.',
    effect: (p) => { p.e += 1; p.m += 1; p.setMem('sonderRadioSingingAlone', true); },
  },

  {
    id: 'sonder_wedding_photo_for_sale',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.currentYear >= 1950 && G.age >= 35 && !G.mem?.sonderWeddingPhotoForSale,
    text: 'In the second-hand shop: a wedding photograph still in its frame, for sale at a low price. Two people on the best day of a year you cannot date from the photograph. Somewhere the context exists for what happened between then and here. The photograph doesn\'t know.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderWeddingPhotoForSale', true); },
  },

  {
    id: 'sonder_hospital_ordinary_work',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.sonderHospitalOrdinaryWork,
    text: 'The nurses move through the ward with the efficiency of people who have done this a thousand times. For them this is Thursday. For the people in the beds it is the worst week. This difference in register — the ordinary and the catastrophic in the same room — is something you notice you had not fully seen before.',
    effect: (p) => { p.e += 2; p.setMem('sonderHospitalOrdinaryWork', true); },
  },

  {
    id: 'sonder_crowd_after_match',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonderCrowdAfterMatch,
    text: 'Everyone leaving the stadium at the same moment: strangers who arrived separately and have just spent two hours wanting the same thing. For a few minutes, walking home in the same direction, they are briefly a single thing with many faces.',
    effect: (p) => { p.m += 2; p.setMem('sonderCrowdAfterMatch', true); },
  },

  {
    id: 'sonder_old_man_hospital_corridor',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && !G.mem?.sonderOldManHospitalCorridor,
    text: 'An old man sits alone in the hospital corridor. He is not unwell — his posture is too settled for that, the posture of someone waiting for someone else. He is holding a plastic bag with things in it. He has been here before.',
    effect: (p) => { p.e += 2; p.setMem('sonderOldManHospitalCorridor', true); },
  },

  {
    id: 'sonder_child_waving_window',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonderChildWavingWindow,
    text: 'A small child waves at you from a window. You are a stranger to them — you are waving at someone who has not yet learned to need a reason to wave at a stranger. You wave back. The child seems satisfied. The transaction is complete.',
    effect: (p) => { p.m += 2; p.setMem('sonderChildWavingWindow', true); },
  },

  {
    id: 'sonder_craftsman_absorbed',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonderCraftsmanAbsorbed,
    text: 'A craftsman at work on something — the hands moving without instruction, the face entirely elsewhere. The object being made is almost incidental. What you are watching is the state of being completely in the right place.',
    effect: (p) => { p.e += 2; p.m += 1; p.setMem('sonderCraftsmanAbsorbed', true); },
  },

  {
    id: 'sonder_vendor_counting_end_of_day',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.character?.country?.archetype === 'subsaharan' || G.character?.country?.archetype === 'developing_urban' || G.character?.country?.archetype === 'developing_unstable') && !G.mem?.sonderVendorCountingEndOfDay,
    text: 'The market vendor counts their money at the end of the day with the focused quiet of someone for whom this number means very specific things. It is a good day or a bad day in a way that has immediate material consequence. They fold the notes and do not speak.',
    effect: (p) => { p.e += 2; p.setMem('sonderVendorCountingEndOfDay', true); },
  },

  {
    id: 'sonder_teenager_outside_door',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 38 && G.currentYear >= 2005 && !G.mem?.sonderTeenagerOutsideDoor,
    text: 'A teenager sits on the front step of their house with their phone, facing outward but not looking at anything. Neither outside nor inside. You were once the age of the step and the looking-at-nothing but you did it differently, without the phone, the same.',
    effect: (p) => { p.e += 2; p.setMem('sonderTeenagerOutsideDoor', true); },
  },

  {
    id: 'sonder_couple_argument_public',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonderCoupleArgumentPublic,
    text: 'A couple arguing at a table. They stop when the waiter arrives, both of them smoothing their faces in the same moment, the same practiced pause. The waiter leaves. They resume. A whole long story told in the two seconds it took to stop.',
    effect: (p) => { p.e += 2; p.setMem('sonderCoupleArgumentPublic', true); },
  },

  {
    id: 'sonder_library_absorbed_reader',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonderLibraryAbsorbedReader,
    text: 'Someone in the library so absorbed in their book they do not notice you pass. Not performing reading — actually gone somewhere. The door they went through is closed from this side.',
    effect: (p) => { p.e += 1; p.setMem('sonderLibraryAbsorbedReader', true); },
  },

  {
    id: 'sonder_box_of_stranger_photographs',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 36 && G.currentYear >= 1960 && !G.mem?.sonderBoxStrangerPhotographs,
    text: 'A box of old photographs for sale in a market — strangers at their best moments, birthdays, graduations, days at the beach. You go through several of them. Every person in them was someone\'s whole world at the time the photograph was taken.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderBoxStrangerPhotographs', true); },
  },

  {
    id: 'sonder_grandmother_watching_street',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.sonderGrandmotherWatchingStreet,
    text: 'There is an old woman in a window across the street who watches everything. She has been there as long as you can remember. The watching is her occupation now — the street is what she has instead of going places. You find you wave at her sometimes.',
    effect: (p) => { p.e += 1; p.m += 1; p.setMem('sonderGrandmotherWatchingStreet', true); },
  },

  {
    id: 'sonder_night_shift_going_home',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && G.currentYear >= 1930 && !G.mem?.sonderNightShiftGoingHome,
    text: 'At six in the morning, a group of workers coming off the night shift — nurses, factory workers, cleaners — moving home through a city that is just waking up. They are finishing while everyone else is starting. They carry the night in their faces and move through the morning world like visitors.',
    effect: (p) => { p.e += 2; p.setMem('sonderNightShiftGoingHome', true); },
  },

  {
    id: 'sonder_empty_playground',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && !G.mem?.sonderEmptyPlayground,
    text: 'An empty playground in the middle of the afternoon. The children who use it are somewhere else — school, home, elsewhere. The equipment is waiting in a state of readiness that has something melancholy in it. The slide goes nowhere for now.',
    effect: (p) => { p.e += 1; p.r += 1; p.setMem('sonderEmptyPlayground', true); },
  },

  {
    id: 'sonder_telephone_box_waiting',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentYear >= 1945 && G.currentYear <= 1992 && G.ruralUrban === 'urban' && !G.mem?.sonderTelephoneBoxWaiting,
    text: 'Someone waiting outside a telephone box for the person inside to finish. They are not impatient — they are waiting with the kind of patience that comes from having no alternative. The person inside talks on. The outside waiter looks at the street.',
    effect: (p) => { p.e += 1; p.setMem('sonderTelephoneBoxWaiting', true); },
  },

  {
    id: 'sonder_two_languages_one_conversation',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.flags?.has?.('emigrated') && !G.mem?.sonderTwoLanguagesOneConversation,
    text: 'Two people near you shift mid-sentence between languages — not translating, not code-switching deliberately, just using whichever language is closer to the thought. The seam where one language ends and the other begins is invisible to them.',
    effect: (p) => { p.e += 2; p.setMem('sonderTwoLanguagesOneConversation', true); },
  },

  {
    id: 'sonder_widow_shopping_for_one',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && !G.mem?.sonderWidowShoppingForOne,
    text: 'You notice a woman in the supermarket buying a single portion of something. She picks it up and then puts it back and takes a different one. It is a very small decision. You understand that it is not a small decision.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderWidowShoppingForOne', true); },
  },

  {
    id: 'sonder_street_art_read_slowly',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && G.currentYear >= 1970 && !G.mem?.sonderStreetArtReadSlowly,
    text: 'A person stands in front of street art and reads it slowly — not looking at it as decoration but as a text. They stay with it longer than you would have expected. Then they take out their phone, photograph it, and move on. You wonder what they were reading that took that long.',
    effect: (p) => { p.e += 1; p.setMem('sonderStreetArtReadSlowly', true); },
  },

  {
    id: 'sonder_first_snow_witness',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.currentCountry === 'Canada' || G.currentCountry === 'Germany' || G.currentCountry === 'Russia' || G.currentCountry === 'Norway' || G.currentCountry === 'Poland' || G.currentCountry === 'Ukraine' || G.currentCountry === 'Hungary' || G.currentCountry === 'Romania') && G.currentYear >= 1980 && !G.mem?.sonderFirstSnowWitness,
    text: 'Someone near you in the street sees snow for what is clearly the first time. They look up before they look down. They hold out a hand. They look at you and then away quickly — the looking being the kind that wants no witness but cannot help itself.',
    effect: (p) => { p.m += 2; p.e += 1; p.setMem('sonderFirstSnowWitness', true); },
  },

  {
    id: 'sonder_taxi_driver_last_fare',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && G.age >= 35 && G.currentYear >= 1960 && !G.mem?.sonderTaxiDriverLastFare,
    text: 'The taxi driver, near the end of a long shift, talks more than is necessary. You do not mind. The whole day is in it — the rides, the roads, a conversation that went well, one that didn\'t. You are the last person he will tell today about the day.',
    effect: (p) => { p.m += 1; p.e += 1; p.setMem('sonderTaxiDriverLastFare', true); },
  },

  {
    id: 'sonder_soldier_homecoming',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.currentYear >= 1940 && G.currentYear <= 1980 && !G.mem?.sonderSoldierHomecoming,
    text: 'There is a homecoming on the street or at the station — a man back from somewhere he was sent, a family trying to be exactly what it was before. You watch the hug that is not quite the same as the hug before he left. Something was subtracted and something was added in equal measure.',
    effect: (p) => { p.e += 2; p.setMem('sonderSoldierHomecoming', true); },
  },

  {
    id: 'sonder_queue_patience',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonderQueuePatience,
    text: 'The queue is long and no one is complaining. Something about the acceptance in the queue — everyone here has calculated that what they are waiting for is worth the wait. They stand with the patience of people who have made a decision and are living inside it.',
    effect: (p) => { p.e += 1; p.setMem('sonderQueuePatience', true); },
  },

  {
    id: 'sonder_learning_to_drive',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentYear >= 1950 && G.currentYear <= 2000 && !G.mem?.sonderLearningToDrive,
    text: 'Someone is learning to drive in an empty car park — the car moving in careful arcs, too slow, then stopping, then starting again. An instructor in the passenger seat. The driver is concentrating so completely on the wheel that the wheel is the whole world.',
    effect: (p) => { p.e += 1; p.m += 1; p.setMem('sonderLearningToDrive', true); },
  },

  // ── FOURTH EXPANSION BATCH: RELIGION, ETHNICITY, GENDER, OCCUPATION, ERA ─

  // RELIGION-SPECIFIC GLIMPSES

  {
    id: 'sonder_sikh_langar_servers',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.religion === 'sikh' || G.character?.country?.name === 'India' || G.currentCountry === 'Canada' || G.currentCountry === 'United Kingdom') && !G.mem?.sonderSikhLangarServers,
    text: 'At the gurdwara, the langar servers spoon food without looking at who is next in the line. Rich and poor, believer and stranger — the ladle moves in the same arc regardless. The meal is free and it is served without a glance at the face of the person receiving it. You have seen charity with hierarchy in it. This is something else.',
    effect: (p) => { p.e += 2; p.karma += 1; p.setMem('sonderSikhLangarServers', true); },
  },

  {
    id: 'sonder_evangelical_service_street',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.religion === 'christian_evangelical' || G.religion === 'christian_pentecostal') && (G.character?.country?.archetype === 'subsaharan' || G.character?.country?.archetype === 'developing_urban') && !G.mem?.sonderEvangelicalServiceStreet,
    text: 'The church service has exceeded the church: the singing is audible from a block away, and at the door people are standing in the street because the building ran out of room. They are looking through the open door. They are singing the same song as the people inside. The door is the only difference between them.',
    effect: (p) => { p.e += 2; p.setMem('sonderEvangelicalServiceStreet', true); },
  },

  {
    id: 'sonder_shia_ashura_procession',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.religion === 'muslim_shia' && !G.mem?.sonderShiaAshuraProcession,
    text: 'The Ashura procession moves through the street. The grief in it is not private — it is communal, practiced, passed down. People who do not know each other are mourning the same death that happened more than a thousand years ago as though it happened recently, which in this context it did.',
    effect: (p) => { p.e += 2; p.setMem('sonderShiaAshuraProcession', true); },
  },

  {
    id: 'sonder_coptic_christmas_queue',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character?.country?.name === 'Egypt' && G.currentYear >= 1950 && !G.mem?.sonderCopticChristmasQueue,
    text: 'On the night of Coptic Christmas, the line outside the cathedral is long. The Copts wait without urgency — this night has come every year regardless of what the year contained, and will come again. A man near the front of the line is carrying something small wrapped in cloth. You do not know what it is. He holds it like it matters.',
    effect: (p) => { p.e += 2; p.setMem('sonderCopticChristmasQueue', true); },
  },

  {
    id: 'sonder_animist_crossroads_offering',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.religion === 'animist' || G.religion === 'folk_religion') && !G.mem?.sonderAnimistCrossroadsOffering,
    text: 'At the crossroads, someone has left something — food, a cloth, something you don\'t name. The leaving was not performed. You came after. The communication between the person who left the offering and whoever they left it for took place without witnesses, which is how it is supposed to work.',
    effect: (p) => { p.e += 1; p.setMem('sonderAnimistCrossroadsOffering', true); },
  },

  {
    id: 'sonder_orthodox_holy_week_exhausted',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.religion === 'christian_orthodox' && !G.mem?.sonderOrthodoxHolyWeekExhausted,
    text: 'Coming out of the Holy Week service at two in the morning — a three-hour liturgy — people stand on the church steps in their good clothes with the particular exhaustion of having done something difficult on purpose. A woman near you is smiling at nothing. You have seen exhaustion and you have seen joy and this is both.',
    effect: (p) => { p.e += 2; p.m += 1; p.setMem('sonderOrthodoxHolyWeekExhausted', true); },
  },

  {
    id: 'sonder_ultra_orthodox_shabbat_rush',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character?.country?.name === 'Israel' && G.religion === 'jewish' && !G.mem?.sonderUltraOrthodoxShabbatRush,
    text: 'Friday afternoon in a religious neighbourhood: everyone moving quickly toward home, the pace of people keeping an appointment with something that does not wait. The shops are closing. Men are carrying bags of food. By sunset, the street will be almost empty. The city is racing something you cannot see.',
    effect: (p) => { p.e += 2; p.setMem('sonderUltraOrthodoxShabbatRush', true); },
  },

  {
    id: 'sonder_tewahedo_fasting_queue',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character?.country?.name === 'Ethiopia' && G.religion?.startsWith('christian') && !G.mem?.sonderTewahedo,
    text: 'The injera vendor during the fasting period: the queue is long because everyone is fasting, and therefore everyone is eating the same permitted things, and therefore everyone is in this queue. The fasting is a kind of equaliser — rich and poor eating the same lentils from the same street vendor this week.',
    effect: (p) => { p.e += 1; p.setMem('sonderTewahedo', true); },
  },

  // ETHNICITY / COUNTRY-SPECIFIC GLIMPSES

  {
    id: 'sonder_dalit_water_pump',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.casteSystem && G.character?.country?.name === 'India' && G.currentYear <= 2000 && !G.mem?.sonderDalitWaterPump,
    text: 'At the village pump, a woman waits after the others have gone. This is the arrangement: she uses the pump when the upper-caste families are finished, so that the water is not touched by her touching it first. She does not look at you. She is not waiting to be seen. She is waiting for them to finish.',
    effect: (p) => { p.e += 2; p.r += 2; p.setMem('sonderDalitWaterPump', true); },
  },

  {
    id: 'sonder_hagwon_children_late_bus',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.character?.country?.name === 'South Korea' && G.currentYear >= 1985 && !G.mem?.sonderHagwonChildrenLateBus,
    text: 'The hagwon bus drops children home at ten-thirty in the evening. They get off with their backpacks, faces blank with the specific tiredness of children who have been studying for fourteen hours. They do not complain. You are not sure whether to call this diligence or something else.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderHagwonChildrenLateBus', true); },
  },

  {
    id: 'sonder_salaryman_last_train',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character?.country?.name === 'Japan' && G.currentYear >= 1965 && !G.mem?.sonderSalarymanLastTrain,
    text: 'The last train of the night: a man in a suit asleep against the window, briefcase on his lap, tie loosened one centimetre. He will wake at the right stop. The company he works for has consumed most of the day that is now over. The train carries him home as though the train is responsible for him.',
    effect: (p) => { p.e += 2; p.setMem('sonderSalarymanLastTrain', true); },
  },

  {
    id: 'sonder_ofw_victoria_park_sunday',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.currentCountry === 'Hong Kong' || (G.character?.country?.name === 'Philippines' && G.flags?.has?.('ofw_worker'))) && !G.mem?.sonderOfwVictoriaPark,
    text: 'In the park on Sunday — the one day in the week that is theirs — Filipino domestic workers eat food from home, do each other\'s hair, show photographs of children they have not seen in two years. The park fills with a version of the Philippines that exists only on Sundays in this city, built from what was brought and what is missed.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderOfwVictoriaPark', true); },
  },

  {
    id: 'sonder_aboriginal_elder_city',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.character?.country?.name === 'Australia' && !G.mem?.sonderAboriginalElderCity,
    text: 'An elder sits on a bench in the city centre, watching. He has the particular stillness of someone who remembers what was here before the buildings. You don\'t know if he is waiting for someone or if the watching itself is the thing. The city proceeds around him without looking back.',
    effect: (p) => { p.e += 2; p.setMem('sonderAboriginalElderCity', true); },
  },

  {
    id: 'sonder_bedouin_tent_city_edge',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.character?.country?.name === 'Jordan' || G.character?.country?.name === 'Saudi Arabia') && !G.mem?.sonderBedouinTentCityEdge,
    text: 'At the edge of the city, a tent in a vacant lot. Someone cooking over a fire outside it. Behind them, the high-rises. The old way and the new city are in the same frame without resolving into each other. You drive past. The tent and the high-rises stay where they are.',
    effect: (p) => { p.e += 2; p.setMem('sonderBedouinTentCityEdge', true); },
  },

  {
    id: 'sonder_indigenous_market_woman',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.character?.country?.name === 'Mexico' || G.character?.country?.name === 'Guatemala' || G.character?.country?.name === 'Peru' || G.character?.country?.name === 'Bolivia') && !G.mem?.sonderIndigenousMarketWoman,
    text: 'The woman at the market stall has been here since before the market opened. Her goods are arranged with the exactness of someone who does this every day, which she does. When she speaks to you it is in the official language; when she speaks to the woman next to her it is in another one entirely, the one she grew up with, which is still the one she thinks in.',
    effect: (p) => { p.e += 2; p.setMem('sonderIndigenousMarketWoman', true); },
  },

  {
    id: 'sonder_garment_workers_home',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.character?.country?.name === 'Bangladesh' || G.character?.country?.name === 'Vietnam' || G.character?.country?.name === 'Cambodia') && G.currentYear >= 1990 && !G.mem?.sonderGarmentWorkersHome,
    text: 'The factory shift ends and the street fills with women walking home, still in their work clothes. They walk in groups of four or five, talking. They have been sitting still for ten hours and the walking is what the body wants. They fill the road and the road belongs to them for this twenty minutes.',
    effect: (p) => { p.e += 2; p.setMem('sonderGarmentWorkersHome', true); },
  },

  {
    id: 'sonder_roma_roadside',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.character?.country?.name === 'Romania' || G.character?.country?.name === 'Hungary' || G.character?.country?.name === 'Serbia' || G.character?.country?.name === 'Slovakia') && !G.mem?.sonderRomaRoadside,
    text: 'A Roma family stopped by the side of the road — their things in a cart, a fire going, children playing close to it. They have been in this country for six centuries and they still live at the edge of it, against the verge, visible in the way that people are visible when they are not permitted to be invisible.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderRomaRoadside', true); },
  },

  // GENDER-SPECIFIC GLIMPSES

  {
    id: 'sonder_young_woman_idea_credited',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character?.gender === 'female' && G.career && G.age >= 22 && !G.mem?.sonderYoungWomanIdeaCredited,
    text: 'You say something in the meeting. Two minutes later a man says the same thing in different words and there is a response this time — the discussion picks up, someone writes it down. You have noticed this before. You have been counting.',
    effect: (p) => { p.e += 1; p.r += 1; p.setMem('sonderYoungWomanIdeaCredited', true); },
  },

  {
    id: 'sonder_mother_public_invisible',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character?.gender === 'female' && G.children?.length > 0 && G.age >= 28 && G.age <= 40 && !G.mem?.sonderMotherPublicInvisible,
    text: 'Pushing a pram through the street, you become a new category of person. Cars stop for you differently. Other people with prams nod. Men you know from before walk past without seeing you, or see you as something new rather than as who you were. You are still both.',
    effect: (p) => { p.e += 2; p.setMem('sonderMotherPublicInvisible', true); },
  },

  {
    id: 'sonder_fathers_school_gate',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.character?.gender === 'male' && G.children?.length > 0 && G.age >= 35 && !G.mem?.sonderFathersSchoolGate,
    text: 'At the school gate you are in a significant minority and everyone adjusts slightly — the other parents, the teachers, you. There are not many fathers here at pickup time and the ones who are here don\'t fully know whether to speak to each other about it or not.',
    effect: (p) => { p.e += 1; p.setMem('sonderFathersSchoolGate', true); },
  },

  {
    id: 'sonder_old_man_birds',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.character?.gender === 'male' && G.age >= 70 && !G.partner && !G.mem?.sonderOldManBirds,
    text: 'An old man in the park feeding birds, alone, at eleven in the morning on a weekday. He has a bag and he knows which birds will come. He is not lonely in the way that word is usually used — he has found what the morning contains and is inside it. The birds come.',
    effect: (p) => { p.e += 1; p.m += 2; p.setMem('sonderOldManBirds', true); },
  },

  // OCCUPATION / CLASS GLIMPSES

  {
    id: 'sonder_fisherman_mending_nets',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.ruralUrban === 'rural' && !G.mem?.sonderFishermanMendingNets,
    text: 'A fisherman mending his nets before dawn, working by a light attached to his boat. The movement is practiced and without ceremony — he has done this so many times that his hands know the net without instruction. The net holds fish because he does this, reliably, in the dark.',
    effect: (p) => { p.e += 2; p.setMem('sonderFishermanMendingNets', true); },
  },

  {
    id: 'sonder_mine_shift_surfaces',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.character?.country?.name === 'South Africa' || G.character?.country?.name === 'Zambia' || G.character?.country?.name === 'Chile' || G.character?.country?.name === 'Bolivia' || G.character?.country?.name === 'Colombia') && !G.mem?.sonderMineShiftSurfaces,
    text: 'The end of the mine shift: men coming up into the light, squinting. The underground version of them — four hundred metres down in the dark — and the surface version are the same person, but you can see the transition happening in the first few seconds. They stretch. They speak. They become surface people again.',
    effect: (p) => { p.e += 2; p.setMem('sonderMineShiftSurfaces', true); },
  },

  {
    id: 'sonder_market_stall_woman_nursing',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.character?.country?.archetype === 'subsaharan' || G.character?.country?.archetype === 'developing_urban') && !G.mem?.sonderMarketStallNursing,
    text: 'The market stall woman is nursing while managing a transaction with her other hand. When the transaction is done she resumes the nursing without interruption. The business and the child and the afternoon are all held in the same attention, which is not divided. It is multiple.',
    effect: (p) => { p.e += 2; p.setMem('sonderMarketStallNursing', true); },
  },

  {
    id: 'sonder_street_barber_between',
    phase: 'young_adult',
    weight: 2,
    when: (G) => (G.character?.country?.archetype === 'subsaharan' || G.character?.country?.archetype === 'developing_urban') && G.ruralUrban === 'urban' && !G.mem?.sonderStreetBarberBetween,
    text: 'Between customers, the street barber sits in his own chair. The mirror in front of him reflects the street. He is watching the street reflected rather than the street directly. He has been in this chair, at this corner, for years. The chair is his address.',
    effect: (p) => { p.e += 1; p.setMem('sonderStreetBarberBetween', true); },
  },

  {
    id: 'sonder_night_watchman_chair',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.character?.country?.archetype === 'developing_urban' || G.character?.country?.archetype === 'subsaharan' && !G.mem?.sonderNightWatchmanChair,
    text: 'The night watchman in his plastic chair at the gate, at three in the morning. Sometimes he is awake. Sometimes he is in the condition between sleep and waking that experienced night watchmen find. The gate he is watching has not been disturbed in months. He is still here.',
    effect: (p) => { p.e += 1; p.setMem('sonderNightWatchmanChair', true); },
  },

  // ERA-SPECIFIC GLIMPSES

  {
    id: 'sonder_depression_soup_line',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentYear >= 1930 && G.currentYear <= 1938 && (G.character?.country?.archetype === 'wealthy_west' || G.character?.country?.name === 'United States') && !G.mem?.sonderDepressionSoupLine,
    text: 'The line for soup: men in good coats that are two years older than they were. The coats are maintained. The hats are level. There is a kind of dignity in the line that costs something. They do not look at the line. They look at the building ahead.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderDepressionSoupLine', true); },
  },

  {
    id: 'sonder_cold_war_civil_defense',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.currentYear >= 1951 && G.currentYear <= 1964 && (G.character?.country?.archetype === 'wealthy_west' || G.character?.country?.archetype === 'post_soviet') && !G.mem?.sonderColdWarCivilDefense,
    text: 'The civil defense drill: everyone moving to where they are told to move. Children under desks. The drill assumes a particular kind of catastrophe and does not assume it will work. Adults comply. The compliance is its own kind of testament to what this decade contains.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderColdWarCivilDefense', true); },
  },

  {
    id: 'sonder_oil_queue_1973',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentYear >= 1973 && G.currentYear <= 1980 && G.character?.country?.archetype === 'wealthy_west' && !G.mem?.sonderOilQueue1973,
    text: 'The line for gasoline: cars stretching back a block, then two. People have brought books. Some are talking to the person in the next car. The petrol crisis has converted the queue into a neighbourhood that will dissolve when the queue ends. For now, everyone in it is equal in their waiting.',
    effect: (p) => { p.e += 2; p.setMem('sonderOilQueue1973', true); },
  },

  {
    id: 'sonder_aids_vigil_street',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentYear >= 1987 && G.currentYear <= 1997 && G.character?.country?.archetype === 'wealthy_west' && !G.mem?.sonderAidsVigilStreet,
    text: 'The candlelight vigil is visible from here — a hundred people standing together with candles on a Tuesday evening in a public park. You do not know who specifically they are mourning. You know the general shape of what they have lost this year. There have been many Tuesdays like this.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderAidsVigilStreet', true); },
  },

  {
    id: 'sonder_internet_cafe_first_email',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.currentYear >= 1995 && G.currentYear <= 2005 && (G.character?.country?.archetype === 'developing_urban' || G.character?.country?.archetype === 'subsaharan') && !G.mem?.sonderInternetCafeFirstEmail,
    text: 'The person at the terminal next to you in the internet café is composing an email with the focused care of someone writing a letter. They reread it twice. The email is going somewhere they cannot go — a family member, a prospective job, a country they have been trying to reach. They send it and sit for a moment before they close the browser.',
    effect: (p) => { p.e += 2; p.setMem('sonderInternetCafeFirstEmail', true); },
  },

  // DISABILITY AND CARE GLIMPSES

  {
    id: 'sonder_dementia_couple_supermarket',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.sonderDementiaCoupleSuper,
    text: 'A man guiding his wife through the supermarket, his hand at the small of her back, steering gently at each junction. She is somewhere near him and somewhere else. He knows which way to go. He has learned the supermarket in relation to where she gets confused. He handles the transaction. She holds the basket.',
    effect: (p) => { p.e += 2; p.r += 1; p.setMem('sonderDementiaCoupleSuper', true); },
  },

  {
    id: 'sonder_deaf_person_watching',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonderDeafPersonWatching,
    text: 'Someone at the next table is watching the room in a particular way — reading lips, reading body language, reading the parts of conversation that don\'t require sound. They are getting more of this room than most people in it. They see you watching them watch. They look away first and then, after a moment, so do you.',
    effect: (p) => { p.e += 2; p.setMem('sonderDeafPersonWatching', true); },
  },

  {
    id: 'sonder_blind_person_confident_route',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.sonderBlindPersonConfidentRoute,
    text: 'A blind man navigating this street so quickly and accurately that he is overtaking people who can see. He knows this route the way the body knows things — through repetition until the knowledge is stored somewhere more reliable than sight. You step aside. He does not need the gesture but you make it anyway.',
    effect: (p) => { p.e += 2; p.setMem('sonderBlindPersonConfidentRoute', true); },
  },

  {
    id: 'sonder_wheelchair_step_calculation',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && !G.mem?.sonderWheelchairStepCalc,
    text: 'The person in the wheelchair stops at the step and makes the calculation — the height, the approach angle, the weight to shift. You move to help and they wave you off. They have done this before and have a method. The method works. They move past the step and are gone.',
    effect: (p) => { p.e += 2; p.setMem('sonderWheelchairStepCalc', true); },
  },

  {
    id: 'sonder_carer_parent_public',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 42 && !G.mem?.sonderCarerParentPublic,
    text: 'An adult managing an elderly parent in public — the arm offered without being asked for, the answer given before the parent finishes the question, the menu translated into what will be manageable. The whole thing conducted with a casualness that took years to earn. The parent says thank you and the child says it\'s nothing.',
    effect: (p) => { p.e += 2; p.setMem('sonderCarerParentPublic', true); },
  },

]
