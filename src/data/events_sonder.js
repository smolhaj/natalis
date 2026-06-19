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

]
