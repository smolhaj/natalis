// events_sonder_4.js — MODE C sonder pass, fourth batch
// 36 contemplative auto-resolve events in four new registers:
// TECHNOLOGY AS TIME (9): specific objects that date a year
// THE WORKPLACE (9): commute, desk, colleague rituals
// OBJECTS FROM BEFORE (9): childhood things that persist
// THE BODY IN WEATHER (9): seasonal texture
// All mem-gated single-fire, weight 2, no choices, no new flags, minimal effects.

export const EVENTS_SONDER_4 = [

  // ═══════════════════════════════════════════════════════════════════════════
  // REGISTER 1: TECHNOLOGY AS TIME
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder4_the_first_television',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_tv &&
      G.currentYear >= 1955 && G.currentYear <= 1975 &&
      G.age >= 5 && G.age <= 14,
    text: 'The television arrives. It is large and has one channel and the image is not always clear and your father adjusts the aerial by moving it a degree at a time while you call out from across the room whether it is better or worse. The show that is on when the image finally resolves: you still remember it.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 2; p.setMem('s4_tv', true) },
  },

  {
    id: 'sonder4_walkman',
    phase: 'adolescence',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_walkman &&
      G.currentYear >= 1980 && G.currentYear <= 1992 &&
      G.age >= 12 && G.age <= 20,
    text: 'The headphones go in and the world goes away. This is new — music as a private room you carry with you, as something that insulates the commute and the walk to school and the waiting. The tape is a specific object: you turn it over when one side ends. The act of turning it over is a small ceremony that you will not miss when it stops being necessary and that you will occasionally miss for years after.',
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('s4_walkman', true) },
  },

  {
    id: 'sonder4_first_mobile',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_mobile &&
      G.currentYear >= 1995 && G.currentYear <= 2005 &&
      G.age >= 17 && G.age <= 30,
    text: 'The phone is small and has one game and can only receive texts of a certain length. You carry it in your pocket and check it frequently for no particular reason. The frequency is new — the checking, the availability, the way you now exist in a slightly different relationship to absence. When someone does not call, there is no longer the excuse of having missed you.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s4_mobile', true) },
  },

  {
    id: 'sonder4_search_engine',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_search &&
      G.currentYear >= 1998 && G.currentYear <= 2006 &&
      G.age >= 14 && G.age <= 30,
    text: 'You type a question into a box and the answer comes. You have done this for a year now and it has not stopped being remarkable. The thing you wanted to know — the capital of a country, the name of the actor, the recipe — required either a library or someone who happened to know, and now it does not. The access to information is so ordinary already that you have started to forget that it is not ordinary.',
    choices: null,
    effect: (p) => { p.e += 3; p.setMem('s4_search', true) },
  },

  {
    id: 'sonder4_smartphone_arrives',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_smartphone &&
      G.currentYear >= 2008 && G.currentYear <= 2013 &&
      G.age >= 25,
    text: 'The map is in your hand. The music is in your hand. The camera is in your hand, and the photographs go somewhere. You have stopped getting lost, which changes the relationship to the city — you no longer need to know it, which means you know it differently. You have also stopped knowing phone numbers. The phone numbers are in the phone. You know the shape of the screen instead.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s4_smartphone', true) },
  },

  {
    id: 'sonder4_video_call',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_videocall &&
      G.currentYear >= 2005 && G.currentYear <= 2015 &&
      G.age >= 18 &&
      (G.flags.has('emigrated') || G.flags.has('children_emigrated') || G.flags.has('friend_emigrated')),
    text: 'You can see their face now. The lag is still there — a fraction of a second between the sound and the image and between your reply and theirs — but the face is there, in a window, in the kitchen, and it changes what the distance is. The distance used to be total. Now it is partial. The partiality is its own kind of grief.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s4_videocall', true) },
  },

  {
    id: 'sonder4_the_algorithm',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_algo &&
      G.currentYear >= 2015 &&
      G.age >= 28,
    text: 'Something knows what you will click on before you do. The feed shows you more of what you have already looked at and less of what you haven\'t. You have noticed this and you have not changed your behaviour. The noticing and the not-changing sit next to each other without resolving.',
    choices: null,
    effect: (p) => { p.r += 2; p.e += 2; p.setMem('s4_algo', true) },
  },

  {
    id: 'sonder4_cassette_tape_car',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_carTape &&
      G.currentYear >= 1975 && G.currentYear <= 1995 &&
      G.age >= 5 && G.age <= 16,
    text: 'There is a tape that lives in the car. It has been in the car for years. The tape is not a tape you chose — it was there when you were old enough to notice, and it will be there after you leave home. The songs on it have become part of what long drives are. When you hear one of them later, in another decade, in another city, you are briefly in the car again, going somewhere at night.',
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('s4_carTape', true) },
  },

  {
    id: 'sonder4_power_cut_candle',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_powerCut &&
      G.currentYear >= 1960 && G.currentYear <= 2000 &&
      G.age >= 4 && G.age <= 14 &&
      (G.character.country?.archetype === 'subsaharan' ||
       G.character.country?.archetype === 'developing_unstable' ||
       G.character.country?.archetype === 'developing_urban' ||
       G.character.country?.archetype === 'post_soviet'),
    text: 'The lights go out and the family finds its candles without needing to discuss the order of things. This has happened often enough that the procedure is settled. The candle is placed on the table. The conversation continues in the altered light, which is warmer and smaller and turns the familiar room into something slightly different. You are happy for a reason you cannot name.',
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('s4_powerCut', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REGISTER 2: THE WORKPLACE
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder4_commute_route',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s4_commute && G.age >= 20 && G.career,
    text: 'The route to work is so familiar now that you can do it without making any decisions. The body goes without the mind\'s help. Sometimes you arrive and cannot account for the journey — which turns, which lights, which people you passed. The route knows you. You have been this route\'s regular for three years and it has learned you.',
    choices: null,
    effect: (p) => { p.setMem('s4_commute', true) },
  },

  {
    id: 'sonder4_the_colleague_coffee',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s4_colCoffee && G.age >= 22 && G.career,
    text: 'There is a colleague you get coffee with. Not a friend, exactly — or maybe a friend, but a specific kind of friend that only exists in the context of this building, this floor, this particular hour. The conversation is easy and contained. If either of you left, you would not stay in touch, probably. This seems fine to both of you. The coffee is good. The hour is good.',
    choices: null,
    effect: (p) => { p.m += 4; p.s += 2; p.setMem('s4_colCoffee', true) },
  },

  {
    id: 'sonder4_the_desk',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s4_desk && G.age >= 30 && G.career,
    text: 'On your desk there is something you have been meaning to deal with for six months. It is not the most important thing and not the least. It is there every morning. You have worked around it for so long that it has become part of the landscape — as fixed as the window and the chair. You know that someday you will deal with it. You do not deal with it today.',
    choices: null,
    effect: (p) => { p.setMem('s4_desk', true) },
  },

  {
    id: 'sonder4_meeting_that_was_an_email',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_meeting &&
      G.age >= 30 &&
      G.career &&
      G.currentYear >= 1995,
    text: 'You have been in a meeting that could have been an email and in an email that should have been a meeting. Today it is the first kind. You sit at a table for seventy minutes and produce three decisions, two of which were already made before anyone arrived. You know everyone who is there. There is nothing wrong. You leave and eat your lunch at your desk and feel obscurely grateful for the quiet.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s4_meeting', true) },
  },

  {
    id: 'sonder4_the_retiring_colleague',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s4_retireCol && G.age >= 35 && G.career,
    text: 'Someone who has been at this workplace longer than you retires. There is a small party with a sheet cake and a card. They give a short speech. You learn things about their life — a hobby they\'ve had for thirty years, a grown child you didn\'t know about — that you would have found interesting if you\'d known earlier. You eat the cake. A week later their desk is empty and the silence is exactly the shape of where they sat.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s4_retireCol', true) },
  },

  {
    id: 'sonder4_market_stall_regular',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_marketStall &&
      G.age >= 20 &&
      (G.character.country?.archetype === 'subsaharan' ||
       G.character.country?.archetype === 'developing_urban' ||
       G.character.country?.archetype === 'developing_unstable'),
    text: 'The woman at the third stall knows your name. She knows what you usually buy. When she sees you coming she starts adding up without your asking. You have been coming here for years. She has been here for years before that. You know nothing about her life except this: she is here, every morning, in the same spot, with the same things on the same table. You hope she is well. You do not ask.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s4_marketStall', true) },
  },

  {
    id: 'sonder4_factory_floor_sound',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_factorySound &&
      G.age >= 18 && G.age <= 45 &&
      G.career?.field === 'manufacturing',
    text: 'The sound of the factory floor is a thing you stopped noticing years ago. It is only when someone visits — a family member, a new worker — that you see their face change at the noise and remember that it is noise. To you it is the background of the day. It is what the day sounds like. You hear the particular machines you are responsible for against the general sound, the way a parent hears their child\'s voice in a crowd.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s4_factorySound', true) },
  },

  {
    id: 'sonder4_end_of_shift',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s4_endShift && G.age >= 20 && G.career,
    text: 'The shift ends. That is all — the shift ends. The specific pleasure of this is not nothing. You wash your hands or pack your bag or log out and the day belongs to you again. For the first five minutes of the walk out you are entirely yourself and not the role. The five minutes are good.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s4_endShift', true) },
  },

  {
    id: 'sonder4_the_long_tenure',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s4_longTenure && G.age >= 55 && G.career,
    text: 'You have worked here for a long time. Long enough that you remember the building before the renovation. Long enough that the people who trained you are retired. Long enough that the work is different from what it was when you started, and you are the person who remembers what it was. The institutional memory of this place is partly you.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.karma += 3; p.setMem('s4_longTenure', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REGISTER 3: OBJECTS FROM BEFORE
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder4_childhood_book',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s4_childhoodBook && G.age >= 35,
    text: 'There is a book from childhood that you still have. You have moved it with you through every move — sometimes without opening it, sometimes deliberately setting it on the shelf in the new place. You could not tell anyone why you kept it specifically. The story is ordinary. The copy is yours.',
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('s4_childhoodBook', true) },
  },

  {
    id: 'sonder4_the_smell_of_home',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s4_smellHome && G.age >= 20,
    text: 'You visit your parents\' home and smell it before you see anything. The specific combination — cooking, fabric, the particular soap, something unidentifiable — hits before the door is fully open. You have not smelled it in months and it is immediately the smell of being young and not responsible for the morning, which is also the smell of before.',
    choices: null,
    effect: (p) => { p.m += 6; p.setMem('s4_smellHome', true) },
  },

  {
    id: 'sonder4_the_photograph',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s4_oldPhoto && G.age >= 30,
    text: 'There is a photograph from before you were the age you are now. You are in it. You do not quite recognise yourself — the posture is different, or the face, or the way you are standing next to whoever is standing next to you. You were trying to look a certain way. The way you were trying to look is visible. You were younger than you thought you were.',
    choices: null,
    effect: (p) => { p.m += 4; p.r += 2; p.setMem('s4_oldPhoto', true) },
  },

  {
    id: 'sonder4_parents_handwriting',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s4_handwriting && G.age >= 55,
    text: 'You find something your mother or father wrote. A note, a list, a letter. The handwriting is so specific that you are not prepared for it. The person who made those particular marks on paper: you know their handwriting better than you know most things. You sit with it for a while. It is just a note. It is not just a note.',
    choices: null,
    effect: (p) => { p.m += 6; p.r += 4; p.setMem('s4_handwriting', true) },
  },

  {
    id: 'sonder4_the_toy',
    phase: 'childhood',
    weight: 2,
    when: (G) => !G.mem?.s4_toy && G.age >= 5 && G.age <= 12,
    text: 'There is a toy that has lost its original purpose and become something else — a ship that is now a person, a stick that was briefly a horse and will become, next month, a sword. You are carrying a narrative through it that no one else knows. The narrative is elaborate. You have been developing it for months. When you are eventually told you are too old for it, some of the story will be lost with the object.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.setMem('s4_toy', true) },
  },

  {
    id: 'sonder4_family_recipe',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s4_recipe && G.age >= 20,
    text: 'You are cooking something your family made. The recipe was never written down — you learned it by watching, and what you learned is a method, not a formula. The measurements are approximations. The result is not identical to what you remember. It is close enough that when you eat it you are briefly in the kitchen where you learned it, which no longer exists in the form you remember.',
    choices: null,
    effect: (p) => { p.m += 6; p.setMem('s4_recipe', true) },
  },

  {
    id: 'sonder4_the_scar',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s4_scar && G.age >= 30,
    text: 'There is a scar from childhood. You know exactly how you got it — the specific afternoon, the specific location, the exact shape of what happened. The scar has been present for so long that you notice it only when someone else notices it. You explain how you got it. The explanation is shorter than the memory.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s4_scar', true) },
  },

  {
    id: 'sonder4_the_song_from_before',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s4_oldSong && G.age >= 22,
    text: 'You hear a song from before — from the specific time when you heard it constantly and now cannot recall between hearings. The song lands differently than you expected. Something in the chord sequence or the particular quality of the voice carries the temperature of the year you first heard it. The year comes back around the song. They are apparently inseparable.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 2; p.setMem('s4_oldSong', true) },
  },

  {
    id: 'sonder4_the_grade_report',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s4_gradeReport && G.age >= 60,
    text: 'You find a school report card — yours, from decades ago. The marks are surprising in some way — better or worse than you remember thinking you were. The teacher\'s comment is a sentence about a child you can only partly access now. The handwriting is careful. The teacher believed the sentence was worth writing. You were a child who received this sentence and you are now someone old enough to hold it from the outside.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 3; p.e += 2; p.setMem('s4_gradeReport', true) },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REGISTER 4: THE BODY IN WEATHER
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'sonder4_first_cold_day',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_firstCold &&
      G.age >= 5 && G.age <= 14 &&
      (G.character.country?.region === 'Europe' ||
       G.character.country?.region === 'North America' ||
       G.character.country?.region === 'Central Asia' ||
       G.character.country?.name === 'Russia'),
    text: 'The first cold day of autumn. The coat that has been at the back of the cupboard comes out and smells of last winter. The cold has a quality the summer doesn\'t — it asks more of you. You walk differently in the cold. You are more aware of where you are going.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s4_firstCold', true) },
  },

  {
    id: 'sonder4_rain_season',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_rainSeason &&
      G.age >= 5 && G.age <= 14 &&
      (G.character.country?.archetype === 'subsaharan' ||
       G.character.country?.archetype === 'developing_unstable' ||
       G.character.country?.archetype === 'developing_urban' ||
       G.character.country?.name === 'Bangladesh' ||
       G.character.country?.name === 'India'),
    text: 'The rain comes in its season. This is not the random rain of other climates — it is the arrival of something that has been anticipated, that the body has been waiting for without knowing it was waiting. The smell before it starts, the sound of the first drops on the roof, the particular cool that follows: you learn these the way you learn a language before you know you\'re learning a language.',
    choices: null,
    effect: (p) => { p.m += 5; p.e += 2; p.setMem('s4_rainSeason', true) },
  },

  {
    id: 'sonder4_heat_afternoon',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_heatAfternoon &&
      G.age >= 6 && G.age <= 16 &&
      (G.character.country?.archetype === 'wealthy_gulf' ||
       G.character.country?.archetype === 'developing_unstable' ||
       G.character.country?.name === 'Iraq' ||
       G.character.country?.name === 'Egypt' ||
       G.character.country?.name === 'Sudan' ||
       G.character.country?.name === 'Algeria' ||
       G.character.country?.name === 'Tunisia'),
    text: 'The afternoon in summer is not for being outside. The city empties. The shutters are closed against the light. The dogs find shade. The streets are a different color in the heat — the light is flat and everything is still. You have learned to sleep in the afternoon. This is the kind of knowledge that is purely physical.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s4_heatAfternoon', true) },
  },

  {
    id: 'sonder4_winter_dark',
    phase: 'adolescence',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_winterDark &&
      G.age >= 13 && G.age <= 19 &&
      (G.character.country?.name === 'Norway' ||
       G.character.country?.name === 'Sweden' ||
       G.character.country?.name === 'Finland' ||
       G.character.country?.name === 'Russia' ||
       G.character.country?.name === 'Estonia' ||
       G.character.country?.name === 'Latvia' ||
       G.character.country?.name === 'Lithuania'),
    text: 'December: the sun rises at nine and sets at three. You go to school in the dark and come home in the dark. The middle of the day has a particular quality — the pale light through the window at noon, the sense that day is a brief guest who will not stay. You are used to this. The body adapts to the dark and comes alive again in March in a way that makes you understand, every year, what the winter cost.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 2; p.setMem('s4_winterDark', true) },
  },

  {
    id: 'sonder4_dust_season',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_dustSeason &&
      G.age >= 5 && G.age <= 16 &&
      (G.character.country?.name === 'Mali' ||
       G.character.country?.name === 'Senegal' ||
       G.character.country?.name === 'Niger' ||
       G.character.country?.name === 'Sudan' ||
       G.character.country?.name === 'Algeria' ||
       G.character.country?.name === 'Kazakhstan' ||
       G.character.country?.name === 'Uzbekistan'),
    text: 'The harmattan or the buran or the dust wind of whichever season belongs to this place arrives and covers everything in a fine layer. You know what it means for the day — the objects moved inside, the water stored, the breathing through fabric. The sky turns the colour of old paper. Then it passes. You clean what needs cleaning and the day continues.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 2; p.setMem('s4_dustSeason', true) },
  },

  {
    id: 'sonder4_first_snow',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.s4_firstSnow &&
      G.age >= 4 && G.age <= 12 &&
      (G.character.country?.region === 'Europe' ||
       G.character.country?.region === 'Central Asia' ||
       G.character.country?.name === 'Russia' ||
       G.character.country?.name === 'China' ||
       G.character.country?.name === 'South Korea' ||
       G.character.country?.name === 'Japan'),
    text: 'The snow falls and you are at the window. The accumulation on the sill, the changed sound of everything outside, the particular grey-white light that comes up from the ground rather than down from the sky. You put your hand out the window and catch some. The cold is clean. You know that the morning will be different and you want it to be morning.',
    choices: null,
    effect: (p) => { p.m += 6; p.setMem('s4_firstSnow', true) },
  },

  {
    id: 'sonder4_old_body_cold',
    phase: 'late_life',
    weight: 2,
    when: (G) => !G.mem?.s4_oldBodyCold && G.age >= 65,
    text: 'The cold is worse than it used to be. Not in the abstract — concretely, specifically. The hands that used to manage a winter morning now require gloves earlier than they did. The internal thermostat has changed. You put on a sweater at temperatures that ten years ago were fine. This is information about the body\'s age, which you did not need the cold to tell you but which the cold tells you anyway, annually.',
    choices: null,
    effect: (p) => { p.r += 3; p.h -= 2; p.setMem('s4_oldBodyCold', true) },
  },

  {
    id: 'sonder4_the_season_you_love',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s4_favSeason && G.age >= 30,
    text: 'There is a season you prefer. You would not have said this at twenty — all seasons seemed equivalent. But now there is one that opens something, that makes the world a specific way you have come to recognize as the way you want it. It arrives and you notice. You have been waiting for it without knowing you were waiting.',
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('s4_favSeason', true) },
  },

  {
    id: 'sonder4_garden_year',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.mem?.s4_garden && G.age >= 35 && !G.flags.has('emigrated'),
    text: 'You have been watching the same tree or garden for long enough to have a year\'s cycle memorized. The exact week the blossom comes. The time the leaves begin. The specific green of May. You have been given this by staying — the knowledge of what a year looks like in this particular piece of ground, which accumulates over years into something that is yours.',
    choices: null,
    effect: (p) => { p.m += 5; p.karma += 2; p.setMem('s4_garden', true) },
  },

]
