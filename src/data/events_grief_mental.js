// ── GRIEF & MENTAL HEALTH EVENTS ──────────────────────────────────────────────
//
// These events are designed to depict grief and mental health as lived experience,
// not clinical taxonomy. Cultural practices are accurate to specific traditions.
// Grief is non-linear. Stigma is context-specific. Nothing is resolved neatly.

export const GRIEF_MENTAL_EVENTS = [

  // ──────────────────────────────────────────────────────────────────────────────
  // FUNERAL & MOURNING PRACTICES
  // Culturally specific. Accurate to tradition and era.
  // ──────────────────────────────────────────────────────────────────────────────

  {
    id: 'funeral_west_african',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      ['subsaharan'].includes(G.character.country.archetype) &&
      (G.mem.parentDied || G.flags.includes('bereaved')) &&
      !G.mem.funeral_type_shown,
    text: (G) => {
      const isNigeria = G.character.country.name === 'Nigeria'
      const isGhana = G.character.country.name === 'Ghana'
      if (isNigeria && G.religion === 'christian_protestant') {
        return 'The church service runs four hours. The choir sings in Yoruba and English simultaneously, and the sound is so large it vibrates in your chest. Cousins you have not seen in a decade appear. Your mother\'s friends — women who have known her since before you existed — take turns keeping vigil through the night. The coffin is expensive. Funerals here are not quiet; they are a statement. The food afterward continues until midnight. People say: a good send-off. That is the obligation, and it is taken seriously.'
      }
      if (isGhana) {
        return 'The funeral runs two days. Saturday is for the family — the body is received in the compound, the women in black and red, the men in dark cloth. Drumming begins at dawn and does not stop until well after dark. Sunday is for the church, the crowd, the formal tributes. A man with a microphone reads out every contribution by name. The grief is communal property here. It does not belong to you alone.'
      }
      return 'The funeral is longer than you expected and louder than you were prepared for. In this community, a death that is not properly mourned is a failure of love. The music, the food, the gathering of people who knew the person from every chapter of their life — it goes on for days. You are exhausted and also, somewhere underneath it, held.'
    },
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 5; p.setMem('funeral_type_shown', true); p.addFlag('cultural_mourning') },
  },

  {
    id: 'funeral_muslim_burial',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      ['muslim_sunni', 'muslim_shia'].includes(G.religion) &&
      (G.mem.parentDied || G.flags.includes('bereaved')) &&
      !G.mem.funeral_type_shown,
    text: (G) => {
      const isSunni = G.religion === 'muslim_sunni'
      return 'The burial happens within twenty-four hours. That is not a custom — it is an obligation. The body is washed, wrapped in white cloth, and prayed over by the men of the community. There is no embalming, no delay, no time for relatives to fly in from far away. The urgency is the point: the soul should not wait. The women of the family gather at the house. You sit on the floor. People come and go for three days. The word they use is ' + (isSunni ? 'inna lillahi' : 'inna lillahi') + ' — we belong to God and to God we return. Someone says it every time a new person arrives, and every time it lands differently.'
    },
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 4; p.setMem('funeral_type_shown', true); p.addFlag('cultural_mourning') },
  },

  {
    id: 'funeral_japanese_buddhist',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Japan' &&
      (G.mem.parentDied || G.flags.includes('bereaved')) &&
      !G.mem.funeral_type_shown,
    text: 'The ceremony takes two days. The first night is the tsuya — you sit with the body, the incense burns without stopping, relatives arrive with koden envelopes containing money and their name written formally in brush ink. You receive them at the entrance and bow. The funeral home arranges everything with a precision that feels like mercy. The coffin is surrounded with white chrysanthemums. At the cremation, the family uses long chopsticks to pass the bones between each other — the only time in Japanese life you deliberately pass something from chopstick to chopstick, because you never do it otherwise. You understand the inversion. You carry out the gesture carefully.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 5; p.setMem('funeral_type_shown', true); p.addFlag('cultural_mourning') },
  },

  {
    id: 'funeral_irish_wake',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Ireland' &&
      (G.mem.parentDied || G.flags.includes('bereaved')) &&
      !G.mem.funeral_type_shown,
    text: 'The body is in the front room, in the open coffin. People have been arriving since last night. Someone you barely know is telling a story about your father at a football match in 1987 and the room is laughing. There is tea, and sandwiches, and later whiskey. The priest comes and goes. A neighbour plays "The Parting Glass" on a tin whistle, badly, and no one minds. The wake is not a failure to grieve. It is grief performed collectively, with the specific Irish understanding that the way you treat the dead says everything about how you treat the living. You will be here all night.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 4; p.setMem('funeral_type_shown', true); p.addFlag('cultural_mourning') },
  },

  {
    id: 'funeral_orthodox_russian',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      ['Russia', 'Ukraine', 'Serbia', 'Romania', 'Georgia'].includes(G.character.country.name) &&
      G.religion === 'christian_orthodox' &&
      (G.mem.parentDied || G.flags.includes('bereaved')) &&
      !G.mem.funeral_type_shown,
    text: (G) => {
      const country = G.character.country.name
      const isRussia = country === 'Russia'
      return 'The body lies in the open coffin in the home, the lid set aside. The priest chants the panikhida — the memorial service — and the incense is thick. Relatives and neighbours come to pay respects and place a small folded strip of paper, the ' + (isRussia ? 'venets' : 'funeral crown') + ', across the forehead. You have been told not to cry too loudly, that excessive grieving disturbs the dead. Your grandmother presses her lips together and does not look away from the face in the coffin. On the third day after death, the ninth, and the fortieth, the family gathers again. Grief here is structured into a liturgical calendar.'
    },
    choices: null,
    effect: (p) => { p.m -= 11; p.r += 5; p.setMem('funeral_type_shown', true); p.addFlag('cultural_mourning') },
  },

  {
    id: 'funeral_chinese',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'China' &&
      (G.mem.parentDied || G.flags.includes('bereaved')) &&
      !G.mem.funeral_type_shown,
    text: 'The mourning period is seven times seven days — forty-nine days — though the formal services are compressed into a week. At the funeral you wear unbleached white, the colour of grief. Joss paper is burned: paper money, paper houses, paper objects the dead might need. The burning is practical and spiritual at once. At the grave your aunt wails with a volume and completeness that surprises you. You had not known she felt this way. You had not known grief could look like this. Later you will understand it as a gift: the family holds space for feeling that you, still young, do not yet have permission to show.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 5; p.setMem('funeral_type_shown', true); p.addFlag('cultural_mourning') },
  },

  {
    id: 'funeral_secular_western',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      ['wealthy_west'].includes(G.character.country.archetype) &&
      !['muslim_sunni', 'muslim_shia'].includes(G.religion) &&
      (G.mem.parentDied || G.flags.includes('bereaved')) &&
      !G.mem.funeral_type_shown,
    text: 'The service is forty minutes. A humanist celebrant who did not know your mother reads from notes you gave her over the phone last week. Someone plays a song on a laptop through a small Bluetooth speaker. The flower arrangements are correct. At the crematorium you are given a printed order of service. Afterwards everyone goes to a pub and says "she would have wanted this" and drinks more than they planned to. The whole thing is over in one day. You drive home thinking: it was not enough. There should be more of this. It should take longer.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 6; p.setMem('funeral_type_shown', true); p.addFlag('cultural_mourning') },
  },

  // ──────────────────────────────────────────────────────────────────────────────
  // NON-LINEAR GRIEF — AMBUSH MOMENTS
  // The third year. The song. The smell. The unexpected undoing.
  // ──────────────────────────────────────────────────────────────────────────────

  {
    id: 'grief_ambush_smell',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.mem.parentDied &&
      G.age >= 22 &&
      !G.mem.grief_ambush1,
    text: (G) => {
      const country = G.character.country
      const arch = country.archetype
      if (['subsaharan', 'developing_unstable'].includes(arch)) {
        return 'You are at the market when it happens — the smell of groundnut oil and dried fish frying together, the exact combination that always meant your mother\'s kitchen on Sundays. You stop walking. The people behind you flow around you. You stand there for a full minute before you can move again. Grief, you are learning, does not announce itself.'
      }
      if (arch === 'wealthy_east' && country.name === 'Japan') {
        return 'It is the smell of soy sauce caramelising in a pan, the exact threshold where it goes from savoury to slightly burnt. Your father always let it go a few seconds too long. You have been making it the right way, every time. You stand at your own stove and cry for the first time since the funeral.'
      }
      if (arch === 'post_soviet') {
        return 'The smell hits you in the stairwell of a building that has nothing to do with your family — a specific combination of damp concrete and boiled cabbage that belongs to a hundred Soviet-era staircases and, without warning, to your grandmother\'s apartment. You sit on the stairs for a while. A neighbour passes and does not ask.'
      }
      return 'You are in a hardware store when a smell — paint thinner, something like turpentine — arrives before the memory does. By the time you have identified it as your father\'s workshop, your throat is already tight. You turn to the next aisle and wait for your face to settle. Grief does not ask permission.'
    },
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 4; p.setMem('grief_ambush1', true) },
  },

  {
    id: 'grief_ambush_song',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      (G.mem.parentDied || G.flags.includes('bereaved')) &&
      G.age >= 28 &&
      !G.mem.grief_ambush_song,
    text: (G) => {
      const year = G.character.birthYear + G.age
      const country = G.character.country
      // Era-specific songs by region/archetype
      if (country.name === 'Ireland') {
        return 'It comes on the radio in the car — "Nothing Compares 2 U" or something from a tape your mother played when you were eight, one of those songs that belonged entirely to a specific time of your life. You reach to change the station and then don\'t. You sit in the parked car in the supermarket car park for several minutes. People walk past with trolleys. The song ends. You go in and buy milk.'
      }
      if (country.name === 'Nigeria' || country.name === 'Ghana') {
        return 'A Fela song comes on in someone else\'s car — or a hymn from Sunday service, the one they always sang at the end, in Yoruba, that your father would hum for days afterward. You hear it now somewhere unexpected: a phone playing on the bus, a child in the street. The feeling is not sadness exactly. It is the feeling of being in two times at once.'
      }
      if (country.name === 'Japan') {
        return 'The year your parent died, a particular Misora Hibari song was playing constantly — in the konbini, in the lift, on the television in the evenings. You did not notice it at the time. Now you hear it in a department store, and your body has filed it under a year you would rather not return to. You stand by the escalator and wait for it to end.'
      }
      if (country.archetype === 'post_soviet') {
        return 'There is a song on the television — Soviet-era, something from a film that everyone your parents\' age knew — and for a moment you hear it the way your mother heard it: as the sound of a particular decade, a particular set of expectations, a life before you existed. The grief is for her and also for all the years she had that you were not part of.'
      }
      if (country.archetype === 'wealthy_west') {
        const decade = Math.floor((G.character.birthYear + 10) / 10) * 10
        if (decade <= 1970) return 'A song from the sixties plays somewhere. Not even a song you particularly liked. But it belonged to the house you grew up in — it was in the background of Sundays, of your mother ironing, of the specific quality of afternoon light in that kitchen. The gap between then and now is not measurable in years.'
        if (decade <= 1980) return 'Something from the late seventies — a song that was on the radio during the years your parents were young adults, that you absorbed without knowing it. You hear it now and realise it does not belong to you at all. It belongs to them. To a time before you, which is now also a time after them.'
        return 'The song was a hit the year your parent died. You didn\'t know you\'d filed it that way. Now it surfaces — on a streaming playlist, in a shop — and your body knows before your mind does. You pause whatever you\'re doing and let it pass.'
      }
      return 'A song from the year of the death comes on somewhere unexpected. You had not known you\'d associated them so completely. Your body responds before your mind catches up.'
    },
    choices: null,
    effect: (p) => { p.m -= 7; p.r += 3; p.setMem('grief_ambush_song', true) },
  },

  {
    id: 'grief_year_three',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mem.parentDied &&
      G.age >= 25 &&
      !G.mem.grief_year_three &&
      !G.flags.includes('processed_grief'),
    text: 'Everyone told you the first year would be the worst. In the first year you were surrounded by people, you were given permission, there were rituals and phone calls and casseroles left at the door. In the third year you are expected to be recovered, and you are not. The absence has become structural — not an acute pain but a permanent alteration in the shape of things. There are days that are harder than anything from year one.',
    choices: [
      {
        text: 'Acknowledge that grief has its own timetable',
        tag: null,
        outcome: 'The acknowledgement does not fix anything. But naming it correctly helps.',
        effect: (p) => { p.m -= 5; p.r += 3; p.setMem('grief_year_three', true) },
        inject: null,
      },
      {
        text: 'Push through — you should be further along than this',
        tag: null,
        outcome: 'The pressure to be done with it compounds the loss. You carry both now.',
        effect: (p) => { p.m -= 10; p.h -= 3; p.r += 6; p.setMem('grief_year_three', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'grief_anniversary_ambush',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.mem.parentDied &&
      G.age >= 35 &&
      !G.mem.grief_anniversary_ambush,
    text: 'You forgot what day it was. You were in the middle of a meeting, or a grocery run, or putting the children to bed, and then something — the date on a receipt, the way the light fell — returned you there. You went quiet in a way that the people around you attributed to tiredness. You did not correct them. Grief does not become manageable so much as it becomes portable. You learn to carry it in places others cannot see.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 4; p.setMem('grief_anniversary_ambush', true) },
  },

  {
    id: 'grief_milestone_absent',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.mem.parentDied &&
      (G.partner || G.children.length > 0) &&
      G.age >= 30 &&
      !G.mem.grief_milestone,
    text: (G) => {
      if (G.children.length > 0) {
        return 'Your child does something — says a first word, starts school, wins something small — and your first instinct is to call home. Then the pause. Then the recalculation that will happen, you realise, at every milestone from now on. Your parent is the person who was supposed to see this.'
      }
      return 'At the wedding, or the graduation, or the moment you have been working toward for years, you look for the face in the crowd before you remember. The gap is proportional to how much they would have meant it.'
    },
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.setMem('grief_milestone', true) },
  },

  // ──────────────────────────────────────────────────────────────────────────────
  // MENTAL HEALTH STIGMA — CONTEXT-SPECIFIC
  // ──────────────────────────────────────────────────────────────────────────────

  {
    id: 'mh_stigma_post_soviet',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.archetype === 'post_soviet' &&
      G.mentalHealth.condition &&
      !G.mem.mh_stigma_shown,
    text: (G) => {
      const country = G.character.country.name
      const condition = G.mentalHealth.condition
      if (condition === 'depression') {
        return 'When you tell your mother what the doctor said, she is quiet for a moment. Then: "Everyone is sad sometimes. You just need to get outside more. Eat properly." There is no malice in it. In her vocabulary, depression is a foreign concept for people who have not had real problems. She grew up under a regime that did not officially recognise mental illness except as deviance. You do not have the energy to explain. You stop telling her.'
      }
      return 'The word "nervy" — nervniy — is the closest translation available to you. It means something between anxious and weak, and carries a moral implication. "He\'s nervous" is not a diagnosis but a character flaw. You learn not to mention the therapy appointments. You say you are seeing a doctor for something physical. This is, in its way, true.'
    },
    choices: [
      {
        text: 'Continue treatment privately — you don\'t need their understanding',
        tag: null,
        outcome: 'You carry two vocabularies: the one for the doctor and the one for the family. It is sustainable.',
        effect: (p) => { p.m -= 3; p.setMem('mh_stigma_shown', true) },
        inject: null,
      },
      {
        text: 'Try to explain — the understanding matters',
        tag: null,
        outcome: 'The explanation does not land. But you said it. Something about that matters.',
        effect: (p) => { p.m -= 5; p.r += 3; p.setMem('mh_stigma_shown', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mh_stigma_subsaharan',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.archetype === 'subsaharan' &&
      G.mentalHealth.condition &&
      !G.mem.mh_stigma_shown,
    text: (G) => {
      const isMuslim = ['muslim_sunni', 'muslim_shia'].includes(G.religion)
      const isChristian = ['christian_protestant', 'christian_catholic'].includes(G.religion)
      if (isMuslim) {
        return 'The imam says what is in your heart is a test from Allah. The word "depression" does not appear in his response. Your uncle says you need more prayer, more structure, a wife, work that means something. There is no psychiatric service in the nearest town. There is a traditional healer two streets over whose methods you are uncertain of. Your body keeps the score in ways no one around you has language for.'
      }
      if (isChristian) {
        return 'The pastor prays over you and speaks of spiritual warfare. "The enemy uses the mind" — he is not wrong, you think, just describing it in a frame you cannot use to get better. Your mother lights candles and fasts. The love in all of this is real. The infrastructure is not. There is no therapist within fifty miles who takes your situation seriously as a medical one.'
      }
      return 'In your community the language for what you are experiencing is: madness, laziness, spiritual attack, or grief that has gone on too long. None of these maps onto what the body is actually doing. You manage as best you can with what you have, which is family, prayer, and forward motion.'
    },
    choices: [
      {
        text: 'Accept the community\'s framing — it is what\'s available',
        tag: null,
        outcome: 'The support is real even if the framework does not fit. You take what helps.',
        effect: (p) => { p.m += 3; p.setMem('mh_stigma_shown', true) },
        inject: null,
      },
      {
        text: 'Find your own understanding of what is happening',
        tag: null,
        outcome: 'Without outside resources you build your own vocabulary. It takes longer. It is yours.',
        effect: (p) => { p.m += 2; p.h -= 3; p.setMem('mh_stigma_shown', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mh_stigma_east_asian',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.archetype === 'wealthy_east' &&
      G.mentalHealth.condition &&
      !G.mem.mh_stigma_shown,
    text: (G) => {
      const isJapan = G.character.country.name === 'Japan'
      const isKorea = G.character.country.name === 'South Korea'
      if (isJapan) {
        return 'The concept exists — utsu-byo, depression — but naming it at work would be professionally catastrophic. The polite fiction is that you are tired, overworked, perhaps a seasonal thing. Your doctor prescribes medication without much conversation. In Japan, the prescription is the treatment; the conversation is not the point. You take the medication and say nothing to your colleagues. The performance of function continues. It is exhausting in a way that compounds what you are treating.'
      }
      if (isKorea) {
        return 'Hwabyung is the word for what happens when you suppress anger and grief long enough that it becomes something physical — a lump in the chest, fatigue, heat. It is recognized as a culture-bound syndrome in the DSM. You do not know this. You know that you cannot bring shame to your family by being unwell in this way. You perform wellness with great precision.'
      }
      return 'In this context, mental illness carries a specific weight: it can affect employment prospects, marriage prospects, your family\'s reputation. You see a doctor once. The doctor is careful. You do not return.'
    },
    choices: [
      {
        text: 'Manage it privately — exposure is not worth the cost',
        tag: null,
        outcome: 'You manage. The management itself is a kind of work that never stops.',
        effect: (p) => { p.m -= 5; p.h -= 3; p.setMem('mh_stigma_shown', true) },
        inject: null,
      },
      {
        text: 'Seek help even knowing the risk',
        tag: null,
        outcome: 'You find a doctor who sees this as medicine. The discretion is mutual. It helps.',
        effect: (p) => { p.m += 7; p.mo -= 1500; p.setMem('mh_stigma_shown', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  // ──────────────────────────────────────────────────────────────────────────────
  // DEPRESSION AS LIVED EXPERIENCE
  // The specific, not the clinical. The intrusive thought. The avoidance.
  // ──────────────────────────────────────────────────────────────────────────────

  {
    id: 'depression_not_getting_up',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition === 'depression' &&
      G.stats.happiness < 30 &&
      !G.mem.dep_lived1,
    text: 'The alarm goes off. You know exactly what you need to do and in what order. You know the exact sequence of actions between here and there. This knowledge produces nothing. You lie there for two hours looking at the ceiling. The ceiling has a small water stain in one corner. You have developed an extremely detailed familiarity with it. The phone lights up twice. You do not look at it. Eventually hunger produces forward motion. This is called a good day.',
    choices: null,
    effect: (p) => { p.m -= 8; p.h -= 3; p.setMem('dep_lived1', true) },
  },

  {
    id: 'depression_food_flat',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition === 'depression' &&
      !G.mem.dep_lived2,
    text: 'Food has stopped tasting like anything. You eat because it is time, or because your body insists, but the information that used to arrive with eating — pleasure, comfort, anticipation — has been turned off. You order the same thing every day because choosing requires more than you have. The coffee has no flavour. You drink it anyway. This is one of the invisible losses no one mentions: the small pleasures that go dark first.',
    choices: null,
    effect: (p) => { p.m -= 6; p.h -= 2; p.setMem('dep_lived2', true) },
  },

  {
    id: 'depression_avoided_thing',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition === 'depression' &&
      G.age >= 20 &&
      !G.mem.dep_lived3,
    text: 'There is a thing you have been avoiding. Not a big thing — an email, a phone call, a form to fill out. But it has been sitting there for three weeks, growing. The longer you leave it the more charge it accumulates. The charge is now large enough that thinking about it causes a physical sensation in your chest, so you do not think about it, which is how it gets to six weeks. Eventually someone else follows up. The relief and shame arrive together.',
    choices: [
      {
        text: 'Do the thing',
        tag: null,
        outcome: 'It takes eleven minutes. The weeks of weight dissolve instantly. You do not yet have a system that prevents the next one.',
        effect: (p) => { p.m += 5; p.setMem('dep_lived3', true) },
        inject: null,
      },
      {
        text: 'Let it lapse — the cost of avoiding it is now lower',
        tag: null,
        outcome: 'This works until the next thing accumulates the same charge. The pile grows slowly.',
        effect: (p) => { p.m -= 5; p.r += 4; p.setMem('dep_lived3', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'depression_performance_exhaustion',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition === 'depression' &&
      G.career !== null &&
      G.age >= 30 &&
      !G.mem.dep_perf_exhaust,
    text: 'You have become good at performing wellness. You know how to arrange your face for work, for social events, for the children\'s school pickups. The performance requires approximately three times the energy of the actual activities. At the end of the day you go to bed and are not recovered by morning. You have been doing this long enough that you cannot remember what it felt like when the performance was not required.',
    choices: [
      {
        text: 'Tell someone what is actually happening',
        tag: null,
        outcome: 'One person knows now. The performance is still required for everyone else. But one person knowing changes the mathematics.',
        effect: (p) => { p.m += 6; p.r -= 4; p.setMem('dep_perf_exhaust', true) },
        inject: null,
      },
      {
        text: 'Keep going — the performance is what\'s holding things together',
        tag: null,
        outcome: 'It is, partly. It is also preventing recovery. Both of these things are true.',
        effect: (p) => { p.m -= 8; p.h -= 4; p.setMem('dep_perf_exhaust', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'depression_recognition',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.stats.happiness < 30 &&
      !G.mentalHealth.condition &&
      !G.mem.dep_recog,
    text: 'You are reading something — a forum, an article, a page in a book someone left at the flat — and you recognise yourself in it. Not the dramatic version. The quiet one: the loss of interest, the early waking, the way you have been explaining away six months. The article calls it depression. You have been calling it tired.',
    choices: [
      {
        text: 'Make an appointment',
        tag: null,
        outcome: 'The first appointment is just talking. That is enough to begin.',
        effect: (p) => { p.m += 5; p.setMentalHealth({ condition: 'depression', therapy: true }); p.setMem('dep_recog', true); p.setMem('mhEvent1', true) },
        inject: null,
      },
      {
        text: 'It\'s probably still just tired',
        tag: null,
        outcome: 'The recognition arrives again, later, in a harder moment.',
        effect: (p) => { p.m -= 5; p.setMentalHealth({ condition: 'depression' }); p.setMem('dep_recog', true); p.setMem('mhEvent1', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  // ──────────────────────────────────────────────────────────────────────────────
  // ANXIETY AS LIVED EXPERIENCE
  // The specific loop. The body response. The avoidance.
  // ──────────────────────────────────────────────────────────────────────────────

  {
    id: 'anxiety_intrusive_loop',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition === 'anxiety' &&
      !G.mem.anx_lived1,
    text: 'The thought arrives fully formed: what if the thing you sent — the email, the message, the thing you said in the meeting — was misread. What if the way it landed is not the way you intended. The thought runs through the possible interpretations twice and then a third time, each time less charitable. You go back and re-read it. It reads fine. The thought does not trust this assessment and runs the loop again.',
    choices: null,
    effect: (p) => { p.m -= 6; p.h -= 2; p.setMem('anx_lived1', true) },
  },

  {
    id: 'anxiety_body_response',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition === 'anxiety' &&
      !G.mem.anx_lived2,
    text: 'The physical symptoms began before you had a name for any of this. The tightness across the chest on Sunday evenings. The nausea before things that are not, by any rational measure, scary. The way your hands go cold when the phone rings from an unknown number. Your body decided something was dangerous years ago and has not updated its files.',
    choices: null,
    effect: (p) => { p.m -= 5; p.h -= 3; p.setMem('anx_lived2', true) },
  },

  {
    id: 'anxiety_avoidance_cascade',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition === 'anxiety' &&
      G.age >= 21 &&
      !G.mem.anx_avoidance,
    text: 'You stopped going to the thing. Not because you decided to stop — you simply didn\'t go last week because the week was hard, and not going was so much easier than going that the contrast is now very clear to your nervous system. Next week the bar will be higher. The week after that it will feel insurmountable. This is how the circumference of your life contracts: not with a decision but with a series of relief-seeking moments that compound.',
    choices: [
      {
        text: 'Go — even though it will be hard',
        tag: null,
        outcome: 'You go. It is difficult and also ordinary. The relief of having gone is almost physical.',
        effect: (p) => { p.m += 7; p.h += 2; p.setMem('anx_avoidance', true) },
        inject: null,
      },
      {
        text: 'Not yet — the timing isn\'t right',
        tag: null,
        outcome: 'The timing never becomes right on its own.',
        effect: (p) => { p.m -= 8; p.setMem('anx_avoidance', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'anxiety_social_performance',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.mentalHealth.condition === 'anxiety' &&
      !G.mem.anx_social &&
      G.stats.charisma < 55,
    text: (G) => {
      const arch = G.character.country.archetype
      if (['wealthy_east'].includes(arch)) {
        return 'There is a specific anxiety that belongs to this context — the performance of correct social form under scrutiny. You know the protocols: the bow, the card exchange with both hands, the correct level of deference. But knowing them does not prevent the feeling that you are one gesture away from visible failure. You leave every professional interaction and replay it once, then twice, then leave it.'
      }
      if (['subsaharan', 'developing_unstable'].includes(arch)) {
        return 'In your family, in your community, the anxiety you experience is described as overthinking. People here have real problems; what you\'re feeling is a luxury of the mind. You have absorbed this assessment. You do not dispute it. The anxiety does not respond to logic.'
      }
      return 'After a social event you sit in your car and review the conversation. The parts that went well do not merit attention; the two moments of imprecision occupy you for the full drive home. You know this is not proportionate. You do it anyway.'
    },
    choices: null,
    effect: (p) => { p.m -= 5; p.setMem('anx_social', true) },
  },

  // ──────────────────────────────────────────────────────────────────────────────
  // GRIEF FOR A CHILD (EXPANDED)
  // The category that does not follow rules.
  // ──────────────────────────────────────────────────────────────────────────────

  {
    id: 'grief_child_loss_aftermath',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.includes('child_loss') &&
      !G.mem.child_loss_aftermath,
    text: (G) => {
      const arch = G.character.country.archetype
      if (['subsaharan', 'developing_unstable', 'conflict_zone'].includes(arch)) {
        return 'In this community, child loss is not uncommon in the statistical sense. That fact provides no comfort. The neighbours know how to sit with you; they have done it before. The rituals exist. But the particular knowledge that your child is gone — not an abstraction, not a statistic — is a fact that will not integrate. You continue forward. You do not recover. These are not the same thing.'
      }
      return 'People stop saying the name. They are protecting you, they believe. What they are doing is making the absence louder. You begin to say the name deliberately — at dinner, in conversation, in the places where the child would have been. Your partner does the same. You learn, slowly, that grief for a child requires a different architecture than grief for anyone else. It does not diminish. It expands to fit the life you keep living alongside it.'
    },
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 6; p.setMem('child_loss_aftermath', true) },
  },

  // ──────────────────────────────────────────────────────────────────────────────
  // LATE-LIFE GRIEF — ACCUMULATED LOSS
  // ──────────────────────────────────────────────────────────────────────────────

  {
    id: 'grief_accumulation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.age >= 62 &&
      (G.flags.includes('bereaved') || G.mem.parentDied) &&
      !G.mem.grief_accumulated,
    text: 'It is not that the grief is worse, exactly. It is that there is more of it now. You have attended enough funerals to know the liturgies, the rituals, the exact moment when the heaviness lifts just slightly. You have become, without wanting to be, a person who is competent at grief. You know how to sit with the bereaved. You know what not to say. This competence cost something, and you are only now tallying the full amount.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 4; p.setMem('grief_accumulated', true) },
  },

  {
    id: 'grief_friends_depleting',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.age >= 68 &&
      G.friends.length > 0 &&
      !G.mem.grief_friends_gone,
    text: 'The generation above you is gone — parents, aunts, uncles, teachers. Now the generation alongside you is beginning to go. The friend who knew you at twenty, who has the context for the person you were before you became this person, dies on a Tuesday. The phone call comes while you are making lunch. There is a specific loneliness to outliving the witnesses to your early life. The version of you that only they knew dies with them.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 6; p.setMem('grief_friends_gone', true) },
  },

  // ──────────────────────────────────────────────────────────────────────────────
  // PTSD — CULTURALLY SPECIFIC VERSIONS
  // ──────────────────────────────────────────────────────────────────────────────

  {
    id: 'ptsd_subsaharan_no_language',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('conflict_survivor') &&
      ['subsaharan', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype) &&
      G.mentalHealth.condition === 'ptsd' &&
      !G.mem.ptsd_context_shown,
    text: 'There is no word for it in your first language — not exactly. There is a word for the damage of war, for the way a person comes back different. But the clinical category, the treatment protocol, the cognitive processing therapy — none of this infrastructure exists here, and even if it did, it would carry a stigma that would cost you work, family, standing. You carry this as a private structural problem. You work around it. You build a life around its shape.',
    choices: [
      {
        text: 'Find community with others who survived the same thing',
        tag: null,
        outcome: 'The understanding is non-verbal and complete. You do not need the vocabulary. You recognise each other.',
        effect: (p) => { p.m += 6; p.h += 3; p.setMem('ptsd_context_shown', true) },
        inject: null,
      },
      {
        text: 'Carry it alone — explanation is impossible',
        tag: null,
        outcome: 'Alone is sustainable for a long time. Then it is not. You will know when you reach that threshold.',
        effect: (p) => { p.m -= 6; p.h -= 5; p.setMem('ptsd_context_shown', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'ptsd_post_soviet_stoicism',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('conflict_survivor') &&
      G.character.country.archetype === 'post_soviet' &&
      G.mentalHealth.condition === 'ptsd' &&
      !G.mem.ptsd_context_shown,
    text: 'The men who came back from Afghanistan in the 1980s did not speak about it. The men who came back from Chechnya did not speak about it. The expectation — inherited, unspoken — is that you will also not speak about it. The correct response to what you have seen is to work harder, drink moderately or excessively, and not burden others. The dream where you are back there comes three or four times a week. You do not speak about it.',
    choices: [
      {
        text: 'Find a way to speak about it — the silence is costing you',
        tag: null,
        outcome: 'The first person you tell is uncomfortable. The second is not. Something begins to move.',
        effect: (p) => { p.m += 7; p.h -= 3; p.setMem('ptsd_context_shown', true) },
        inject: null,
      },
      {
        text: 'Maintain the silence — this is what it means to have survived',
        tag: null,
        outcome: 'You survive. The costs redistribute themselves over the years in ways you do not always track.',
        effect: (p) => { p.m -= 5; p.h -= 6; p.setMem('ptsd_context_shown', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  // ──────────────────────────────────────────────────────────────────────────────
  // MENTAL HEALTH — RECOVERY IS NOT LINEAR
  // ──────────────────────────────────────────────────────────────────────────────

  {
    id: 'mh_good_day_ambivalence',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.mentalHealth.condition &&
      G.stats.happiness >= 45 &&
      !G.mem.mh_good_day,
    text: 'Today was fine. Not performing fine — actually fine. Food tasted correct. You were present in conversations rather than watching yourself have them from a slight remove. You noticed the sky at some point. In the evening you sat with this and felt something unexpected: suspicion. Experience has taught you that this is the pattern, that a good run precedes an interruption. You do not yet know if this is insight or catastrophising.',
    choices: null,
    effect: (p) => { p.m += 6; p.setMem('mh_good_day', true) },
  },

  {
    id: 'mh_relapse_unexpected',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.mentalHealth.condition &&
      G.flags.includes('processed_grief') &&
      !G.mem.mh_relapse_unexpected,
    text: 'You thought you were past the worst of it. Several years of relative stability. The tools working. Then a winter that was slightly greyer than average, a run of bad news, a change in your sleep — and here it is again. Not as bad as the first time. But recognisably the same thing. This is what they did not tell you: that having processed something does not mean it cannot return. The processing is not a cure. It is an increased capacity to carry.',
    choices: [
      {
        text: 'Use what you learned last time — restart treatment early',
        tag: null,
        outcome: 'Catching it early is different from being ambushed by it. Recovery is faster.',
        effect: (p) => { p.m += 8; p.mo -= 1500; p.setMem('mh_relapse_unexpected', true) },
        inject: null,
      },
      {
        text: 'Try to manage it — you know what this is now',
        tag: null,
        outcome: 'Knowledge helps. It does not fully substitute for treatment.',
        effect: (p) => { p.m -= 6; p.h -= 3; p.setMem('mh_relapse_unexpected', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'mh_medication_decision',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.mentalHealth.condition &&
      !G.mentalHealth.medicating &&
      !G.mentalHealth.therapy &&
      G.money >= 300 &&
      G.age >= 22 &&
      !G.mem.mh_med_decision,
    text: 'A doctor you finally trust suggests a trial of medication. Not forever — a course, to see. You have resisted this for a long time. The resistance involves a belief you have not examined directly: that managing without it means you are stronger, that the medication would mean the problem is real, that "real you" does not need it.',
    choices: [
      {
        text: 'Try the medication',
        tag: null,
        outcome: 'Six weeks. Something levels. The level is not happiness exactly — it is the removal of a floor you did not know you were living on.',
        effect: (p) => { p.m += 10; p.mo -= 800; p.setMentalHealth({ medicating: true }); p.setMem('mh_med_decision', true) },
        inject: null,
      },
      {
        text: 'Not yet — try other things first',
        tag: null,
        outcome: 'The other things sometimes work. You keep the medication as a contingency.',
        effect: (p) => { p.m += 2; p.setMem('mh_med_decision', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  // ──────────────────────────────────────────────────────────────────────────────
  // GRIEF — SPOUSE DEATH EXPANDED (late life)
  // ──────────────────────────────────────────────────────────────────────────────

  {
    id: 'grief_spouse_first_year',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      !G.partner &&
      G.flags.includes('bereaved') &&
      G.age >= 58 &&
      !G.mem.grief_spouse_year1,
    text: (G) => {
      const arch = G.character.country.archetype
      if (['subsaharan', 'developing_unstable'].includes(arch)) {
        return 'The family comes. They come for a week and then they leave, and the house is different. Not quiet exactly — it has always been busy here — but differently inhabited. The decisions that used to be shared are now yours alone: the money, the children, the repairs, the daily governance of a life that was built for two. Your mother says this is God\'s test. You do not have the language to disagree, and also do not have the language to agree.'
      }
      if (arch === 'post_soviet') {
        return 'In the first weeks, people come and bring food. Then they stop coming. The food stops. The apartment is the same apartment. His coat is on the hook by the door. You have moved it three times and returned it. You do not know what to do with the coat.'
      }
      return 'The logistics expand to fill the grief. For the first months there are things to do — arrangements, notifications, the endless paperwork of a life that legally needs to be closed. When the logistics end, the grief is what remains. The house is very quiet. The routines that were invisible when shared are suddenly enormous and solitary.'
    },
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 5; p.setMem('grief_spouse_year1', true) },
  },

  {
    id: 'grief_spouse_meaning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.partner &&
      G.mem.grief_spouse_year1 &&
      G.age >= 63 &&
      !G.mem.grief_spouse_meaning,
    text: 'Several years on, you are still here. This is not a triumph exactly, but it is something. You have developed routines that belong to you alone — a different route, a different hour, different food. The apartment still has their arrangement of things, mostly, but you have made some adjustments. Friends say you are coping well. You know what you are doing is not coping but continuing, which is related but not the same.',
    choices: null,
    effect: (p) => { p.m += 4; p.addFlag('found_meaning'); p.setMem('grief_spouse_meaning', true) },
  },

  // ──────────────────────────────────────────────────────────────────────────────
  // GRIEF — CULTURAL MEMORY TOUCHSTONES
  // Era-specific, region-specific. Accuracy over generality.
  // ──────────────────────────────────────────────────────────────────────────────

  {
    id: 'grief_memory_touchstone',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.mem.parentDied &&
      G.age >= 38 &&
      !G.mem.grief_touchstone,
    text: (G) => {
      const country = G.character.country
      const birthYear = G.character.birthYear
      const midChildhoodYear = birthYear + 10

      if (country.name === 'Japan') {
        if (midChildhoodYear >= 1960 && midChildhoodYear <= 1975) {
          return 'You find an old photograph and in the background there is a Showa-era television set, the small boxy kind, and a calendar on the wall advertising a rice brand that no longer exists. The photograph is of something else but your eyes go to the calendar. Your parent is in the photo. The specific quality of light in the room is the light of that decade. You are not able to explain to your children what it felt like to live inside that time.'
        }
        return 'Your parent\'s handwriting is on a folded piece of paper inside an old book. The handwriting is very specific — a particular way of writing certain characters that you have not seen in years. You close the book and put it back.'
      }
      if (country.name === 'Nigeria') {
        if (midChildhoodYear >= 1970 && midChildhoodYear <= 1985) {
          return 'You find one of your father\'s old cassette tapes — Fela Kuti, or King Sunny Ade, or something from a time before the military government when everything felt possible. The tape is warped. You cannot play it. You know what is on it without needing to.'
        }
        return 'There is a cloth — ankara, the pattern that was everywhere in the years of your childhood — that belonged to your mother. You don\'t wear it. You keep it folded in a drawer. You understand that you are keeping it because the smell, after all these years, is still slightly hers.'
      }
      if (country.name === 'Ireland') {
        return 'There is a particular smell of turf smoke that belongs to the house you grew up in. You encounter it occasionally — a fireplace somewhere, an older house in the countryside — and the whole of the early years comes back at once: the kitchen table, the pattern of the wallpaper, the specific texture of the carpet in the hall. Memory lives in the nose. You have known this for a long time.'
      }
      if (country.archetype === 'post_soviet') {
        if (midChildhoodYear >= 1960 && midChildhoodYear <= 1980) {
          return 'Your parent\'s Soviet-era books are still on the shelves. The spines are a particular shade of faded brown that belongs entirely to the printing techniques of that time. You take one down. The pages are yellow at the edges. The name written inside the front cover is your parent\'s, in the handwriting of when they were young — different from the handwriting you knew, more uncertain, still becoming itself.'
        }
        return 'A television programme from the eighties plays on a nostalgia channel — something from Gostelradio, the music or the news broadcast. The production quality is immediately, precisely the quality of every evening of your childhood. You were not aware you had stored it so completely.'
      }
      if (country.archetype === 'wealthy_west') {
        if (midChildhoodYear >= 1965 && midChildhoodYear <= 1980) {
          return 'You are clearing out and find an album that belonged to your parents — The Beatles, or Bowie, or something from the years when they were young and the century felt new. The sleeve art. The track listing on the back. You do not play it but you know every song anyway, from the years it lived on a shelf in the living room, from the afternoons you were in the room while it played in the background. You keep it.'
        }
        return 'A film from your childhood is on somewhere — the specific palette of eighties or nineties cinema, the particular texture of home video — and the years collapse. Not with sadness exactly. With the physical fact of time: all of that was real, and it is also very far away.'
      }
      return 'You find something that belonged to them — an object so ordinary it survived without ceremony: a cup, a pen, a book with their handwriting in the margin. The ordinariness of it is what undoes you. Not a keepsake. Just a thing.'
    },
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 3; p.setMem('grief_touchstone', true) },
  },

]
