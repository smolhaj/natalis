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

]
