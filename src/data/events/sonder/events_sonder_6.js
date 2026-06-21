// events_sonder_6.js — MODE C sonder depth (36 events)
// Four registers: NIGHT AND SLEEP (9), WEATHER AND SEASON (9),
// THE BODY AT WORK (9), WAITING (9)
// All mem-gated, weight 2, no choices, no new flags, minimal stat effects

export const EVENTS_SONDER_6 = [

  // ─── NIGHT AND SLEEP ──────────────────────────────────────────────────────────
  // What happens in the hours between sleep and waking — the particular quality
  // of night that no one else is awake to witness

  {
    id: 'sonder6_night_3am',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && G.age <= 55 && !G.mem?.s6Night3am,
    text: 'Three in the morning and you are awake for no reason you can name. The house is its night-self: different sounds, different quality of dark. You lie still and take inventory of what is worrying you. The inventory is the same one it always is at this hour, just in a different order.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s6Night3am', true) },
  },

  {
    id: 'sonder6_night_child_sleeping',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.children?.length > 0 && G.age >= 28 && G.age <= 50 && !G.mem?.s6NightChild,
    text: 'You check on the child before you sleep. They are at an angle no adult would choose, entirely committed to it. The room smells of them specifically — shampoo and something underneath. You stand in the doorway longer than you needed to.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s6NightChild', true) },
  },

  {
    id: 'sonder6_night_power_cut',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      ['subsaharan', 'developing_urban', 'developing_unstable', 'post_soviet'].includes(G.character.archetype) &&
      !G.mem?.s6NightCut,
    text: 'The power went out at midnight. You know it by the sudden end of the fan, the way the dark became a different quality of dark. You lie in the heat and listen to the neighbourhood recalibrate — a generator starting somewhere, a dog, the settling. You have slept through worse. You will sleep through this.',
    choices: null,
    effect: (p) => { p.setMem('s6NightCut', true) },
  },

  {
    id: 'sonder6_night_partner',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.partner && !G.mem?.s6NightPartner,
    text: 'You wake and they are asleep beside you. Their breathing at this rhythm. Their shoulder at this angle. You have slept next to this person for years and there are still moments, in the particular darkness, when the fact of them strikes you as improbable.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s6NightPartner', true) },
  },

  {
    id: 'sonder6_night_alone',
    phase: 'midlife',
    weight: 2,
    when: (G) => !G.partner && G.age >= 32 && !G.mem?.s6NightAlone,
    text: 'The night is yours entirely. No one else\'s breathing, no one else\'s body redistributing heat beside you. This is its own kind of thing: a space that belongs to no one but you, which some nights feels like freedom and some nights feels like a fact you have not finished processing.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s6NightAlone', true) },
  },

  {
    id: 'sonder6_night_dreaming_late',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 58 && !G.mem?.s6NightDreamLate,
    text: 'The dead visit in dreams now in a way they did not before. Your mother. Someone from school whose face you had not been able to recall for thirty years. They do not do anything alarming. They are simply there, in the way of a room you know very well and have not been in for a long time.',
    choices: null,
    effect: (p) => { p.r += 3; p.m += 2; p.setMem('s6NightDreamLate', true) },
  },

  {
    id: 'sonder6_night_worrying',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 22 && G.age <= 35 && !G.mem?.s6NightWorry,
    text: 'You are running through it again. The money, the job, the conversation that did not go the way you needed it to. Your mind is doing this without your permission, as it does at this hour. At some point you stop fighting it and simply watch it happen.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s6NightWorry', true) },
  },

  {
    id: 'sonder6_night_city',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && G.age >= 20 && !G.mem?.s6NightCity,
    text: 'The city at night is a different city. The noise is lower but not gone — a siren somewhere, the particular rumble of a truck on the ring road, the city\'s machinery that does not sleep. You have lived in the city long enough that the night sounds are as familiar as the day sounds. They register as ordinary, which is a kind of belonging.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s6NightCity', true) },
  },

  {
    id: 'sonder6_night_rural',
    phase: 'childhood',
    weight: 2,
    when: (G) => G.ruralUrban !== 'urban' && G.age >= 8 && G.age <= 16 && !G.mem?.s6NightRural,
    text: 'The village at night is completely dark. No streetlights, the houses extinguished one by one. The stars are so dense they look like something poured. You have grown up under this sky and take it as the correct version of the sky, which means that cities, when you eventually see them, will seem to have made an error.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s6NightRural', true) },
  },

  // ─── WEATHER AND SEASON ───────────────────────────────────────────────────────
  // Specific felt weather across climates — the sensory reality of living
  // in a particular latitude at a particular time of year

  {
    id: 'sonder6_weather_harmattan',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      ['Nigeria', 'Ghana', 'Senegal', 'Mali', 'Burkina Faso', 'Guinea', 'Niger', 'Côte d\'Ivoire', 'Cameroon', 'Chad'].includes(G.character.country?.name) &&
      !G.mem?.s6WeatherHarmattan,
    text: 'The harmattan has been blowing for a week. The air is dry enough to crack lips by morning. Everything has a fine coat of Sahara on it — the windowsill, the leaves, the inside of your nose. The sky is the colour of milk. This is December, which elsewhere means cold. Here it means dust and dry and the particular chapping around the eyes.',
    choices: null,
    effect: (p) => { p.setMem('s6WeatherHarmattan', true) },
  },

  {
    id: 'sonder6_weather_monsoon',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      ['India', 'Bangladesh', 'Pakistan', 'Nepal', 'Myanmar', 'Thailand', 'Vietnam', 'Cambodia', 'Indonesia', 'Philippines', 'Sri Lanka'].includes(G.character.country?.name) &&
      !G.mem?.s6WeatherMonsoon,
    text: 'June and the monsoon has arrived. The rain comes in sheets and does not stop and does not stop. The smell before the first rain — petrichor, the word you will learn later — is something you will recognise for the rest of your life as the smell of the year beginning again. The streets become rivers. The mango trees are very green.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s6WeatherMonsoon', true) },
  },

  {
    id: 'sonder6_weather_snow_first',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      ['Russia', 'Ukraine', 'Poland', 'Belarus', 'Kazakhstan', 'Mongolia', 'North Korea', 'China', 'Canada', 'Germany', 'Czech Republic', 'Hungary', 'Romania', 'Serbia'].includes(G.character.country?.name) &&
      !G.mem?.s6WeatherSnow,
    text: 'The first snow of the year. You watched from the window as it started — the change in light that came before it, the first flakes tentative. By morning the world is a version of itself with all its edges rounded. You went outside before anyone else and left the first footprints, which felt briefly like a kind of ownership.',
    choices: null,
    effect: (p) => { p.m += 4; p.setMem('s6WeatherSnow', true) },
  },

  {
    id: 'sonder6_weather_heat_afternoon',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      ['subsaharan', 'developing_urban', 'developing_unstable', 'wealthy_gulf'].includes(G.character.archetype) &&
      !G.mem?.s6WeatherHeat,
    text: 'Three in the afternoon. The heat has been building since ten and is now at the place where movement becomes a deliberate choice. The shade is not cool but it is something. The city, in this hour, has slowed. The people who can, sit. The people who cannot, work. You have learned the difference between these two categories and which one you occupy.',
    choices: null,
    effect: (p) => { p.setMem('s6WeatherHeat', true) },
  },

  {
    id: 'sonder6_weather_winter_european',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      ['wealthy_west'].includes(G.character.archetype) &&
      !['Nigeria', 'Ghana', 'Kenya', 'Ethiopia', 'South Africa', 'Egypt', 'Morocco'].includes(G.character.country?.name) &&
      !G.mem?.s6WeatherWinter,
    text: 'The short days of January. By four in the afternoon it is dark. This is the version of dark that is not alarming but is draining — the dark that means another evening in, the dark that means the year has not properly started yet. You have grown up knowing that spring is a fact that will arrive. This is different from hoping it will.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s6WeatherWinter', true) },
  },

  {
    id: 'sonder6_weather_rainy_season',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      ['subsaharan', 'developing_unstable'].includes(G.character.archetype) &&
      G.ruralUrban !== 'urban' &&
      !G.mem?.s6WeatherRains,
    text: 'The rains came on Thursday. You can smell it in the soil all the way from the house — the earth opening to it. By Sunday the road is impassable and the river is another colour. This is both the good thing and the difficult thing about the rains: they are what the crops need and also what cuts you off. The year turns on this.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s6WeatherRains', true) },
  },

  {
    id: 'sonder6_weather_fog',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.ruralUrban === 'urban' && !G.mem?.s6WeatherFog,
    text: 'The city has been in fog for three days. The buildings end at the fifth floor. The people you pass are muffled into themselves. There is something about fog that makes everyone look preoccupied — as if the reduced visibility has turned them inward. You walk through it and arrive at where you were going and realise you did not see the city at all.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s6WeatherFog', true) },
  },

  {
    id: 'sonder6_weather_drought',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.ruralUrban !== 'urban' &&
      ['subsaharan', 'developing_unstable', 'developing_urban'].includes(G.character.archetype) &&
      !G.mem?.s6WeatherDrought,
    text: 'The rains did not come when they should have. You know the exact date by which they are supposed to arrive and it passed. You watched the sky for a week. The soil is cracking from the top. The farmers discuss it in the way people discuss things that have happened before and will happen again — with knowledge rather than surprise, which does not make it less serious.',
    choices: null,
    effect: (p) => { p.m -= 3; p.r += 2; p.setMem('s6WeatherDrought', true) },
  },

  {
    id: 'sonder6_weather_autumn',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      ['wealthy_west', 'post_soviet', 'wealthy_east'].includes(G.character.archetype) &&
      !G.mem?.s6WeatherAutumn,
    text: 'The leaves turn in a sequence you have memorised over decades: first the birches, then the maples, then the oaks which hold longest. You have watched this happen every year of your life in this place and it has never become unremarkable. It may be that some things are designed to remain remarkable. This might be one of them.',
    choices: null,
    effect: (p) => { p.m += 3; p.setMem('s6WeatherAutumn', true) },
  },

  // ─── THE BODY AT WORK ─────────────────────────────────────────────────────────
  // Hands that know things the mind does not consciously direct — the muscle
  // memory of a trade, a task, a physical skill done ten thousand times

  {
    id: 'sonder6_work_hands',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.id && G.age >= 30 && !G.mem?.s6WorkHands,
    text: 'You have been doing this long enough that your hands know what to do before you have consciously decided. The motion is in the body now, not in the instruction. You catch yourself watching your own hands sometimes, slightly surprised by their competence, as if they belong to someone who has been at this longer than you feel you have.',
    choices: null,
    effect: (p) => { p.m += 3; p.e += 2; p.setMem('s6WorkHands', true) },
  },

  {
    id: 'sonder6_work_first_day_job',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.career?.id && G.age >= 18 && G.age <= 28 && !G.mem?.s6WorkFirstDay,
    text: 'The first week of the first real job. Everything has a procedure you do not know yet. The bathroom, the key, the way to address the person above you. By the end of the first week you know some of these things and the others you learn by watching, which is the oldest system. You are still mostly performing competence rather than having it. You are not sure yet when that will change.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('s6WorkFirstDay', true) },
  },

  {
    id: 'sonder6_work_physical_toll',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 40 && G.stats.health <= 65 && G.career?.id && !G.mem?.s6WorkToll,
    text: 'The body has been keeping a record of what you have asked of it. The back in the morning. The knees on stairs. The particular fatigue that comes from years of this kind of work rather than a single day of it. You do not complain about this to most people. It is simply part of the inventory you are living with.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s6WorkToll', true) },
  },

  {
    id: 'sonder6_work_expertise',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.career?.id && G.age >= 52 && !G.mem?.s6WorkExpert,
    text: 'Someone asks you something about your work and you answer it in four sentences. They thank you and leave. You notice afterward that it took you years to be able to say that in four sentences. The knowing is so fully inside you now that you have almost lost access to the time before you knew it. Expertise is like that: it eventually becomes invisible even to the person who has it.',
    choices: null,
    effect: (p) => { p.m += 4; p.e += 2; p.setMem('s6WorkExpert', true) },
  },

  {
    id: 'sonder6_work_repetition',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.career?.id && G.age >= 35 && G.age <= 52 && !G.mem?.s6WorkRep,
    text: 'You have done this specific motion — this sequence, this routine — so many times that the number is not calculable. It has become as neutral as breathing. You notice it today only because a new person is watching, and through their watching you see it again briefly as something that had to be learned.',
    choices: null,
    effect: (p) => { p.setMem('s6WorkRep', true) },
  },

  {
    id: 'sonder6_work_market',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.ruralUrban !== 'urban' &&
      ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.character.archetype) &&
      !G.mem?.s6WorkMarket,
    text: 'Market day. You are set up before six. The arrangement of what you are selling is not arbitrary — you know from experience which placement sells and which does not, which items go at eye level and which below. The first customer is always the reference point for the day. The first transaction at a good price means something different than the first at a bad one.',
    choices: null,
    effect: (p) => { p.s += 2; p.setMem('s6WorkMarket', true) },
  },

  {
    id: 'sonder6_work_teaching',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.career?.id && G.age >= 50 && !G.mem?.s6WorkTeach,
    text: 'There is a younger person you are showing how to do something. You watch them make the mistake you made twenty years ago and you do not say: I made that mistake. You let them correct it. Later they will not remember being taught. They will simply know.',
    choices: null,
    effect: (p) => { p.m += 4; p.karma += 3; p.setMem('s6WorkTeach', true) },
  },

  {
    id: 'sonder6_work_last',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 60 && !G.mem?.s6WorkLast,
    text: 'There is a day that will be the last time you do the particular physical thing that has been your life\'s work. You will not know it is the last time when it happens — retirement or incapacity or just the day you stopped. Somewhere in the past, already, you have done this thing for the final time. It is in the past. The hands that did it are these hands.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('s6WorkLast', true) },
  },

  {
    id: 'sonder6_work_commute',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.ruralUrban === 'urban' && G.career?.id && G.age >= 30 && G.age <= 55 && !G.mem?.s6WorkCommute,
    text: 'The commute has become a kind of body memory. The timing of the train, the specific pillar you stand next to, the way your body positions itself before the doors open. You have stopped experiencing this as experience. It is simply what happens in the gap between home and work. This is, in its way, a kind of peace.',
    choices: null,
    effect: (p) => { p.m += 2; p.setMem('s6WorkCommute', true) },
  },

  // ─── WAITING ─────────────────────────────────────────────────────────────────
  // Queues, hospitals, government offices, delays — the texture of time
  // that is someone else's to allocate

  {
    id: 'sonder6_wait_hospital',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s6WaitHospital,
    text: 'The hospital waiting room. The numbers are called in an order that does not correspond to when you arrived. You have been here two hours. The television in the corner is showing something with the sound off. The person next to you is asleep sitting up, which seems like the correct response. You consider what it is you are worrying about, here, waiting, and whether it is the right thing to be worrying about.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s6WaitHospital', true) },
  },

  {
    id: 'sonder6_wait_government_office',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      ['developing_urban', 'developing_unstable', 'subsaharan', 'post_soviet'].includes(G.character.archetype) &&
      !G.mem?.s6WaitGovt,
    text: 'The government office opens at nine. You arrived at eight. The person at the counter has a quality of stillness that is not peace but the management of circumstances they did not design. You have brought every document you were told to bring. You will be told you are missing one. This is not a deviation from the system. This is the system.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s6WaitGovt', true) },
  },

  {
    id: 'sonder6_wait_queue',
    phase: 'young_adult',
    weight: 2,
    when: (G) => !G.mem?.s6WaitQueue,
    text: 'The queue stretches to the corner. You join the back of it. The people ahead of you have their own calculations running — how long this will take, whether what is at the front is worth the time, whether the person who just walked to the front is going to get away with it. Queue etiquette is a theory of fairness. The theory does not always hold.',
    choices: null,
    effect: (p) => { p.setMem('s6WaitQueue', true) },
  },

  {
    id: 'sonder6_wait_delay',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.age >= 20 && !G.mem?.s6WaitDelay,
    text: 'The train is delayed. No announcement, just the board changing from a time to a dash. You find a seat on the platform bench. Someone beside you is eating something that has a strong smell. The people standing look at their phones. The people sitting look at the track. You are thinking about what you are about to arrive at — the meeting, the appointment, the person — and whether the delay will matter.',
    choices: null,
    effect: (p) => { p.setMem('s6WaitDelay', true) },
  },

  {
    id: 'sonder6_wait_border',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      ['developing_unstable', 'conflict_zone', 'subsaharan'].includes(G.character.archetype) &&
      !G.mem?.s6WaitBorder,
    text: 'The border crossing. You have your documents. The guards have your documents. The guard with your documents is doing something at the desk that is not looking at your documents. This is a particular form of waiting: the kind where the outcome is uncertain and making it seem uncertain is itself the message. You wait in the way people wait when they have learned not to show what they are thinking.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s6WaitBorder', true) },
  },

  {
    id: 'sonder6_wait_news',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.age >= 30 && !G.mem?.s6WaitNews,
    text: 'Waiting for news about someone. You do not know yet whether it will be the good version or the bad version. Your phone is in your hand. The interval between not knowing and knowing has a particular texture: it is not quite fear but it is the awareness of fear\'s shape, its outline in the air before it lands.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s6WaitNews', true) },
  },

  {
    id: 'sonder6_wait_child_coming_home',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.children?.length > 0 && G.age >= 38 && G.age <= 58 && !G.mem?.s6WaitChild,
    text: 'The child is late. Fifteen minutes past when they said. You stand at the window. You tell yourself not to stand at the window and you stand at the window. This is the calculation that runs continuously in the background of parenthood — the gap between where they are supposed to be and where they are — and you have never found a way to stop running it.',
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('s6WaitChild', true) },
  },

  {
    id: 'sonder6_wait_results',
    phase: 'adolescence',
    weight: 2,
    when: (G) => G.age >= 14 && G.age <= 19 && !G.mem?.s6WaitResults,
    text: 'Exam results. You know them or you don\'t; the knowing is in the envelope or on the board and you are not there yet. What you feel in this interval is not suspense but the specific weight of consequence — the understanding that what is about to be revealed will shape what comes next in ways you cannot yet see and cannot prevent.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('s6WaitResults', true) },
  },

  {
    id: 'sonder6_wait_late_life',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.age >= 62 && !G.mem?.s6WaitLate,
    text: 'There is more waiting now than there was. The doctor\'s appointment. The test results. The letter that takes three weeks. You have waited through your whole life — queues, hospitals, news, outcomes — but the waiting of late life has a different quality: you know more of what you are waiting for, and you know that some of what you are waiting for cannot be waited away.',
    choices: null,
    effect: (p) => { p.r += 4; p.m += 2; p.setMem('s6WaitLate', true) },
  },

]
