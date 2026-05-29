// Early childhood and early 20s events — BUILD 6
// Fills the thinnest life phase gaps: early_childhood (ages 0–5) and young_adult (18–25 sub-phase).
// Early childhood events are told from a small child's limited perspective:
// what they see, what they don't understand yet, the specific objects and textures of a world
// they have only just arrived in.
// Young adult events cover the messy 18–25 years: the self discovered at 17 does not fit
// the world at 22, and these events name that gap specifically.

export const EARLY_LIFE_EVENTS = [

  // ─── EARLY CHILDHOOD (ages 0–5) ──────────────────────────────────────────────

  {
    id: 'ec_first_school',
    phase: 'early_childhood',
    weight: 4,
    when: (G) => G.age >= 4 && G.age <= 6 && !G.mem?.ecFirstSchool && !G.mem?.school_first_day,
    text: (G) => {
      const arch = G.character.country.archetype
      if (['subsaharan', 'developing_unstable', 'conflict_zone'].includes(arch)) {
        return 'Your mother walks you to the school gate and stops. The gate is where she stops. Inside is yours now. The classroom has rows of benches and a blackboard with yesterday\'s lesson still on it. A teacher calls your name from a list and you sit where she points.'
      }
      if (arch === 'wealthy_east') {
        return 'You have been prepared for this. Your school bag is packed the night before. The uniform is pressed. At the gate your mother straightens your collar without speaking. Inside, the children sit in rows and wait for instruction. Everyone already knows what school is for.'
      }
      if (arch === 'post_soviet') {
        return 'The school is a wide concrete building with a portrait above the entrance. Your teacher has white hair and says your name correctly on the first try. You sit in a double desk and share it with a child you do not know yet.'
      }
      return 'You have been told about school for months. The reality is louder and larger and more specific than you imagined. Your name tag is pinned crooked. Someone cries at the coat hooks. You are not going to be the one who cries.'
    },
    choices: [
      {
        text: 'Hold your parent\'s hand until the last possible moment.',
        tag: null,
        outcome: 'The teacher gently lifts your hand from theirs. You watch the door close. You do not cry. You do not stop watching the door.',
        effect: (p) => { p.m -= 4; p.s += 2; p.setMem('ecFirstSchool', true); p.addFlag('school_attended') },
      },
      {
        text: 'Walk in without looking back.',
        tag: 'ec_independent_start',
        outcome: 'You find a seat and sit in it. You learn the teacher\'s name. By the end of the day you know where the bathroom is and whose pencil case is the best one.',
        effect: (p) => { p.m += 3; p.e += 3; p.s += 3; p.setMem('ecFirstSchool', true); p.addFlag('school_attended') },
      },
    ],
    effect: null,
  },

  {
    id: 'ec_parent_absent',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => G.age >= 2 && G.age <= 5 && !G.mem?.ecParentAbsent,
    text: (G) => {
      const arch = G.character.country.archetype
      const migrant = ['developing_urban', 'subsaharan', 'developing_unstable'].includes(arch)
      if (migrant) {
        return 'Your father leaves before it is light. A bag goes with him. Your mother tells you he has gone to find work, which is not a lie and is also not the whole truth. His chair at the table is still his chair. No one sits in it.'
      }
      return 'One of your parents is gone. The room where they slept is still there. Their things are still there. The adults in the house speak carefully around the fact of the absence, which makes the absence larger, not smaller.'
    },
    choices: [
      {
        text: 'Ask where they went.',
        tag: null,
        outcome: 'You are told something. The answer does not answer the question. You stop asking, which is its own kind of answer.',
        effect: (p) => { p.m -= 6; p.r += 4; p.e += 2; p.addFlag('absent_parent'); p.setMem('ecParentAbsent', true) },
      },
      {
        text: 'Stop asking. Pretend it is normal.',
        tag: 'ec_early_stoic',
        outcome: 'You learn to work around the space where they were. This becomes a skill you did not choose to develop.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('absent_parent'); p.addFlag('learned_silence'); p.setMem('ecParentAbsent', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ec_new_sibling',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => G.age >= 2 && G.age <= 5 && !G.mem?.ecNewSibling && G.siblings && G.siblings.length > 0,
    text: 'The baby has arrived and the house has reorganised itself around it. The baby cries at hours that are not sleeping hours. Everyone goes to the crying. You understand something without being told: the configuration has changed, and the configuration was you.',
    choices: [
      {
        text: 'Welcome the baby. Bring it things.',
        tag: null,
        outcome: 'You fetch the blanket and hand it carefully to your mother. She says good and that is enough.',
        effect: (p) => { p.m += 4; p.s += 4; p.karma += 3; p.setMem('ecNewSibling', true) },
      },
      {
        text: 'Be very quiet for several days.',
        tag: 'ec_sibling_retreat',
        outcome: 'The adults notice eventually. Your mother sits with you alone one evening and that helps.',
        effect: (p) => { p.m -= 4; p.r += 3; p.e += 2; p.setMem('ecNewSibling', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ec_object_yours',
    phase: 'early_childhood',
    weight: 4,
    when: (G) => G.age >= 3 && G.age <= 5 && !G.mem?.ecObjectYours,
    text: (G) => {
      const arch = G.character.country.archetype
      const wealthy = ['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(arch)
      if (wealthy) {
        return 'Among all the things in the house, one object is yours. Not lent, not shared — yours. A toy with a worn spot where you hold it. A book with your name written in it in someone else\'s handwriting. You know which drawer it lives in. You know its weight exactly.'
      }
      return 'There is one thing that belongs to you. A piece of bright cloth, or a tin car with one wheel missing, or a stone the right size and shape to carry in a pocket. You know where it is at all times. You have never been asked to share it. You would not.'
    },
    choices: [
      {
        text: 'Keep it hidden. Some things are for you alone.',
        tag: null,
        outcome: 'You find a place for it that only you know. It stays yours.',
        effect: (p) => { p.m += 5; p.setMem('ecObjectYours', true); p.setMem('hasChildhoodObject', true); p.addFlag('childhood_object') },
      },
      {
        text: 'Show it to someone you trust.',
        tag: 'ec_object_shared',
        outcome: 'The showing is its own kind of gift. The object does not become less yours. Something between you grows.',
        effect: (p) => { p.m += 7; p.s += 3; p.setMem('ecObjectYours', true); p.setMem('hasChildhoodObject', true); p.addFlag('childhood_object') },
      },
    ],
    effect: null,
  },

  {
    id: 'ec_witness_adult',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => G.age >= 3 && G.age <= 5 && !G.mem?.ecWitnessAdult,
    text: (G) => {
      const regime = G.regime
      if (['military_dictatorship', 'single_party_authoritarian', 'single_party_communist', 'theocracy'].includes(regime)) {
        return 'Men come to the door in uniforms and your mother takes you out of the room before they finish speaking. From the hallway you can hear the register of voices but not the words. Your mother\'s hand is tight on your arm. When it is over, nobody explains. This becomes one of the things nobody explains.'
      }
      if (G.character.familyStability === 'unstable') {
        return 'Late at night the voices in the kitchen rise and then stop. The stopping is worse than the rising. You lie very still and listen to the quality of the silence. You are three or four years old and already an expert in the silence after arguing.'
      }
      return 'You see something in the street from the window — a man being pulled by two other men, or something passing fast — and your mother draws you away from the glass before you can understand what you saw. The not-understanding stays with you longer than seeing would have.'
    },
    choices: null,
    effect: (p) => {
      p.e += 3
      p.r += 3
      p.addFlag('early_witness')
      p.setMem('ecWitnessAdult', true)
    },
  },

  {
    id: 'ec_early_illness',
    phase: 'early_childhood',
    weight: 3,
    when: (G) => G.age >= 2 && G.age <= 5 && !G.mem?.ecEarlyIllness,
    text: (G) => {
      const arch = G.character.country.archetype
      if (['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(arch)) {
        return 'The fever comes at night. Your temperature is taken three times. The doctor comes or you go to the doctor — clean rooms, a tongue depressor, a sticker for being still. You recover in a week. Your parents look at you differently for a little while after, as if rechecking something.'
      }
      if (['subsaharan', 'conflict_zone', 'developing_unstable'].includes(arch)) {
        return 'The fever runs high for four days. There is a discussion among the adults about what to do and where to go and what it will cost. Someone brings something from the market — dried bark steeped in water, or pills without a box. You sweat through sheets. Your grandmother sits at the foot of the mattress through the worst nights.'
      }
      return 'You are sick in a way that you remember afterward without knowing what it was. The illness has a texture: the specific heat of it, the way the ceiling looked from where you lay, the smell of the room by the third day. You recover. You carry the memory of it as a reference point for what ill means.'
    },
    choices: [
      {
        text: 'Try the healer the neighbour recommended.',
        tag: null,
        outcome: 'The treatment is unfamiliar and slightly frightening. You recover. Whether it helped is a question nobody settles.',
        effect: (p) => { p.h -= 3; p.m -= 4; p.addFlag('survived_early_illness'); p.setMem('ecEarlyIllness', true) },
      },
      {
        text: 'Wait it out at home.',
        tag: null,
        outcome: 'The fever breaks on the fifth morning. The relief in the house is enormous. You eat something plain and sleep for twelve hours.',
        effect: (p) => { p.h -= 5; p.m -= 2; p.addFlag('survived_early_illness'); p.setMem('ecEarlyIllness', true) },
      },
      {
        text: 'Go to the clinic.',
        tag: null,
        outcome: 'The queue is long. The medicine is given. You recover faster than you would have otherwise.',
        effect: (p) => { p.h += 2; p.addFlag('survived_early_illness'); p.setMem('ecEarlyIllness', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ec_hunger_known',
    phase: 'early_childhood',
    weight: 4,
    when: (G) =>
      G.age >= 2 && G.age <= 5 &&
      !G.mem?.ecHungerKnown &&
      ['subsaharan', 'conflict_zone', 'developing_unstable'].includes(G.character.country.archetype),
    text: 'There is a week when dinner is smaller each evening. Nobody says why. The pot is the same pot. The portions come out differently. You learn to eat what is given without asking if there is more. This is not taught to you directly. You learn it from watching the adults at the table.',
    choices: null,
    effect: (p) => {
      p.h -= 2
      p.r += 3
      p.addFlag('hunger_known')
      p.addFlag('food_insecurity')
      p.setMem('ecHungerKnown', true)
    },
  },

  {
    id: 'ec_television_arrives',
    phase: 'early_childhood',
    weight: 3,
    when: (G) =>
      G.age >= 3 && G.age <= 5 &&
      !G.mem?.ecTelevisionArrives &&
      G.currentYear >= 1958 && G.currentYear <= 1985 &&
      ['wealthy_west', 'developing_urban', 'post_soviet', 'wealthy_east'].includes(G.character.country.archetype),
    text: (G) => {
      if (G.character.country.archetype === 'post_soviet') {
        return 'The television arrives from the factory where your father\'s colleague works. It takes two men to carry it. The screen is small and the image is black and white and slightly tilted. The whole family gathers in front of it that evening. The news is on. Your father turns the sound up and nobody speaks for the duration.'
      }
      return 'Someone brings a television into the house. Or a neighbour gets one and the street rearranges itself around it, everyone finding reasons to be in that living room after dinner. The thing on the screen is people, but smaller and grey. It is impossible not to watch.'
    },
    choices: [
      {
        text: 'Sit as close to it as you can.',
        tag: null,
        outcome: 'You are told to move back. You move back two inches. You watch everything.',
        effect: (p) => { p.m += 6; p.e += 3; p.addFlag('television_childhood'); p.setMem('ecTelevisionArrives', true) },
      },
      {
        text: 'Sit with the family and watch together.',
        tag: null,
        outcome: 'The television becomes the new shape of the evening. Your family sits in a row. Sometimes your mother laughs. This is a specific sound in a specific room at a specific hour.',
        effect: (p) => { p.m += 8; p.s += 2; p.addFlag('television_childhood'); p.setMem('ecTelevisionArrives', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ec_night_fear',
    phase: 'early_childhood',
    weight: 4,
    when: (G) => G.age >= 3 && G.age <= 5 && !G.mem?.ecNightFear,
    text: (G) => {
      const regime = G.regime
      const unstable = ['conflict_zone', 'developing_unstable'].includes(G.character.country.archetype)
      if (unstable || ['military_dictatorship', 'theocracy'].includes(regime)) {
        return 'At night there are sounds from outside that the adults do not explain. A vehicle idling for too long. A door. You lie in the dark with your eyes open and listen to the particular quality of the house being still. You have not been told there is danger. You do not need to be told.'
      }
      return 'Something lives in the dark at the end of the hallway. Not always — only when the light is off and the house is quiet. You have seen its shape at the door once. You cannot describe the shape to anyone because in the daylight the shape is not there and the words for it are not available to you. At night, you know exactly what it is.'
    },
    choices: [
      {
        text: 'Tell someone.',
        tag: null,
        outcome: 'They sit on the edge of your bed and look at the hallway with you. Nothing is there. The looking-together helps more than the nothing.',
        effect: (p) => { p.m += 4; p.s += 2; p.h += 2; p.setMem('ecNightFear', true) },
      },
      {
        text: 'Keep it to yourself.',
        tag: 'ec_fear_alone',
        outcome: 'You learn to get through the nights. The fear does not go away; you build something around it.',
        effect: (p) => { p.m -= 3; p.e += 3; p.r += 2; p.addFlag('kept_first_fear'); p.setMem('ecNightFear', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ec_first_friend',
    phase: 'early_childhood',
    weight: 4,
    when: (G) => G.age >= 3 && G.age <= 5 && !G.mem?.ecFirstFriend,
    text: (G) => {
      const arch = G.character.country.archetype
      if (['subsaharan', 'developing_urban'].includes(arch)) {
        return 'There is a child at the compound gate or the water point or the end of the path you walk every morning. They are there most days. At some point you stop ignoring each other. At some point you start waiting.'
      }
      if (arch === 'wealthy_east') {
        return 'There is a child in the house next door who is brought to the same garden in the afternoons. You observe each other for several days. Then one of you brings something to show the other. This is the beginning.'
      }
      return 'There is a child next door, or in the next flat, or on the same stretch of pavement. You do not plan the friendship. You are simply in the same place often enough that it becomes unavoidable.'
    },
    choices: [
      {
        text: 'Invite them to see the thing that is yours.',
        tag: 'ec_shared_object',
        outcome: 'You show them. They do not take it. They look at it the way you wanted them to look at it. Something is agreed without words.',
        effect: (p) => { p.m += 8; p.s += 4; p.addFlag('had_first_friend'); p.setMem('ecFirstFriend', true) },
      },
      {
        text: 'Go to where they are.',
        tag: null,
        outcome: 'Their house or their part of the yard has different rules, different smells, a different quality of light. You learn something about the world from being somewhere that is not your somewhere.',
        effect: (p) => { p.m += 6; p.s += 3; p.e += 2; p.addFlag('had_first_friend'); p.setMem('ecFirstFriend', true) },
      },
      {
        text: 'Wait and let them come to you.',
        tag: null,
        outcome: 'They come. It takes a week. The waiting is practice for something you will use later.',
        effect: (p) => { p.m += 5; p.e += 2; p.addFlag('had_first_friend'); p.setMem('ecFirstFriend', true) },
      },
    ],
    effect: null,
  },

  // ─── YOUNG ADULT (ages 18–25) ─────────────────────────────────────────────────

  {
    id: 'ya_first_apartment',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.age >= 18 && G.age <= 24 &&
      !G.mem?.yaFirstApartment &&
      !G.flags.has('lives_with_parents') &&
      !G.flags.has('first_apartment'),
    text: 'The key is yours. You lock and unlock the door three times on the first night just to feel it. The apartment is the size of a large room. There is a mattress on the floor because the bed frame did not fit in the car. One pot. The thing you brought from home sits on the counter because you have not decided where it lives yet.',
    choices: [
      {
        text: 'Call home that night.',
        tag: null,
        outcome: 'The call lasts forty minutes. You describe the kitchen. You do not say that it is very quiet here.',
        effect: (p) => { p.m += 5; p.s += 2; p.karma += 3; p.addFlag('first_apartment'); p.setMem('yaFirstApartment', true) },
      },
      {
        text: 'Don\'t call yet. Sit in the quiet first.',
        tag: 'ya_first_alone',
        outcome: 'You sit on the mattress and listen to the specific sound of a place that has no one else in it. This is yours. The feeling is terrifying and correct.',
        effect: (p) => { p.m += 7; p.e += 3; p.addFlag('first_apartment'); p.setMem('yaFirstApartment', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ya_just_a_job',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.age >= 19 && G.age <= 24 &&
      !G.mem?.yaJustAJob &&
      (!G.career || G.career.level === 0),
    text: (G) => {
      const arch = G.character.country.archetype
      if (['subsaharan', 'developing_unstable', 'conflict_zone'].includes(arch)) {
        return 'The job is in a shop, or on a site, or at the back of a kitchen you cannot see from the street. The hours are long and the money is fixed and the work is physical in ways that make specific parts of your body hurt at specific times of day. You do it because it is a thing that pays.'
      }
      if (['wealthy_west', 'wealthy_east'].includes(arch) && G.currentYear >= 2000) {
        return 'The job is entry-level in a way that was not what you meant when you imagined entry-level. You answer phones. You restock things. You sit in a chair that was not designed for sitting in for eight hours. The boredom has a texture. The paycheck is real.'
      }
      return 'This is not what you thought work would be. The gap between what you imagined and what this is has a specific width. You measure it every shift.'
    },
    choices: [
      {
        text: 'Endure it. Money is money.',
        tag: null,
        outcome: 'You become efficient at it without meaning to. Efficiency is not the same as caring. You know the difference.',
        effect: (p) => { p.m -= 4; p.w += 2; p.mo += 200; p.addFlag('worked_a_bad_job'); p.setMem('yaJustAJob', true) },
      },
      {
        text: 'Treat it as temporary and plan around it.',
        tag: 'ya_strategic_job',
        outcome: 'You use the hours at the counter to think. The job funds something. That makes it bearable.',
        effect: (p) => { p.m -= 2; p.e += 3; p.mo += 200; p.addFlag('worked_a_bad_job'); p.setMem('yaJustAJob', true) },
      },
      {
        text: 'Actually try to be good at it.',
        tag: null,
        outcome: 'You become the person who is trusted with the difficult customers. The manager notices. You are not sure whether this is good news.',
        effect: (p) => { p.m += 2; p.s += 4; p.w += 3; p.mo += 300; p.addFlag('worked_a_bad_job'); p.setMem('yaJustAJob', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ya_first_real_failure',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.age >= 19 && G.age <= 25 &&
      !G.mem?.yaFirstRealFailure,
    text: (G) => {
      const high = G.stats.smarts > 65 || G.stats.charisma > 65
      if (high) {
        return 'You have always been good at things. The specific thing you fail at — the audition, the application, the project you spent four months on, the relationship you were certain of — is the first thing you were good at that was not enough. The failure is precise. It does not generalise, but you try to make it generalise anyway.'
      }
      return 'Something goes wrong. Not the small wrong that you have learned to absorb — something larger, something you had put yourself into. It does not work. There is a specific day when you know it is not working. That day arrives before you are ready for it.'
    },
    choices: [
      {
        text: 'Admit it directly — to yourself and to someone else.',
        tag: 'ya_failure_admitted',
        outcome: 'The admission is more useful than it feels. You have a clearer account of what happened, which is not the same as feeling better about it.',
        effect: (p) => { p.e += 4; p.r += 3; p.s += 3; p.addFlag('knows_failure'); p.setMem('yaFirstRealFailure', true) },
      },
      {
        text: 'Reframe it — find the reason that was someone else\'s fault.',
        tag: null,
        outcome: 'The reframing works, partially. You carry it for a few years before you look at it again.',
        effect: (p) => { p.m += 2; p.r += 6; p.addFlag('knows_failure'); p.setMem('yaFirstRealFailure', true) },
      },
      {
        text: 'Sit with it. Not immediately, but don\'t explain it away.',
        tag: 'ya_failure_integrated',
        outcome: 'It takes months. Eventually the failure becomes information. You build something different on the other side of it.',
        effect: (p) => { p.e += 6; p.m -= 4; p.r += 2; p.addFlag('knows_failure'); p.addFlag('failure_integrated'); p.setMem('yaFirstRealFailure', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ya_friend_group_scatters',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.age >= 21 && G.age <= 26 &&
      !G.mem?.yaFriendGroupScatters &&
      (G.friends ?? []).filter(f => f.alive).length > 0,
    text: 'The group is dispersing. Not a fight — nothing happened wrong. One person got a position in another city. One moved back to where they came from. One went in a direction you cannot quite follow from here. You still have their numbers. You text and mean it. The texture of seeing each other weekly, of the running conversation that never quite ended, is over.',
    choices: [
      {
        text: 'Try to hold it together — schedule the calls, organise the visits.',
        tag: 'ya_maintaining_connections',
        outcome: 'Some of it holds. The ones who matter find a way. The ones who don\'t, you understand without resentment.',
        effect: (p) => { p.m -= 3; p.s += 4; p.karma += 3; p.addFlag('friend_group_scattered'); p.setMem('yaFriendGroupScatters', true) },
      },
      {
        text: 'Let the dispersion happen. Grieve it cleanly.',
        tag: null,
        outcome: 'You say proper goodbyes where you can. The grief is honest and not drawn out. Something closes with some shape to it.',
        effect: (p) => { p.m -= 5; p.r += 3; p.e += 2; p.addFlag('friend_group_scattered'); p.setMem('yaFriendGroupScatters', true) },
      },
      {
        text: 'Stop trying to maintain the group and let the strongest friendships find their own level.',
        tag: null,
        outcome: 'Two or three of them stay real. The rest become people you were friends with, which is a category of its own.',
        effect: (p) => { p.m -= 2; p.e += 3; p.addFlag('friend_group_scattered'); p.setMem('yaFriendGroupScatters', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ya_adult_breakup',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.age >= 20 && G.age <= 27 &&
      !G.mem?.yaAdultBreakup &&
      !G.partner,
    text: 'This relationship was not the heartbreak of adolescence — it was a real adult thing, with shared routines and combined furniture and the sense that it had a future. The ending is not dramatic. Two people grew in directions they did not choose. The incompatibility arrived slowly and was obvious once you named it. The naming is the worst part.',
    choices: [
      {
        text: 'End it clearly and immediately.',
        tag: 'ya_breakup_clean',
        outcome: 'The clarity costs something. In six months you understand why it was right. The understanding does not retroactively reduce the cost.',
        effect: (p) => { p.m -= 8; p.r += 4; p.e += 3; p.addFlag('adult_heartbreak'); p.setMem('yaAdultBreakup', true) },
      },
      {
        text: 'Suggest a break — not an ending, a pause.',
        tag: 'ya_breakup_pause',
        outcome: 'The pause is an ending that hasn\'t admitted it yet. You use three months to arrive at the same place.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('adult_heartbreak'); p.setMem('yaAdultBreakup', true) },
      },
      {
        text: 'Stay longer than you should.',
        tag: 'ya_breakup_delayed',
        outcome: 'There are good weeks inside the bad months. Eventually the imbalance is undeniable. The ending is harder for the delay.',
        effect: (p) => { p.m -= 14; p.r += 8; p.addFlag('adult_heartbreak'); p.addFlag('stayed_too_long'); p.setMem('yaAdultBreakup', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ya_money_zero',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.age >= 19 && G.age <= 25 &&
      !G.mem?.yaMoneyZero &&
      G.money < 400 &&
      !G.flags.has('student'),
    text: 'The account shows a number that requires decisions to be made immediately. You calculate what is required between now and next payment. The calculation has no slack in it. You walk past a cafe and do not go in. You eat what is in the cupboard in a specific order — cheapest last, in case something changes.',
    choices: [
      {
        text: 'Ask to borrow money.',
        tag: null,
        outcome: 'Someone says yes. The relief is enormous and costs something you cannot quite name. You pay it back.',
        effect: (p) => { p.m -= 4; p.mo += 150; p.r += 3; p.addFlag('money_zero_survived'); p.setMem('yaMoneyZero', true) },
      },
      {
        text: 'Cut everything back to essentials and wait.',
        tag: 'ya_austerity',
        outcome: 'You make it to the next payment. The week has a specific texture — you know every item in your kitchen by the end of it.',
        effect: (p) => { p.m -= 7; p.e += 3; p.w += 2; p.addFlag('money_zero_survived'); p.addFlag('knows_true_broke'); p.setMem('yaMoneyZero', true) },
      },
      {
        text: 'Ask family for help.',
        tag: null,
        outcome: 'They help without conditions, which is both generous and slightly harder to receive than conditions would have been.',
        effect: (p) => { p.m -= 2; p.mo += 250; p.karma += 2; p.addFlag('money_zero_survived'); p.setMem('yaMoneyZero', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ya_flatmate',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.age >= 18 && G.age <= 24 &&
      !G.mem?.yaFlatmate &&
      G.flags.has('first_apartment'),
    text: 'Someone else lives in the apartment. You share the bathroom and the kitchen and the unspoken rules that you discover only when they are broken. Their things are on the shelf where your things were. They leave dishes in the sink in a specific way. They have moods that are not your moods and affect the air of the room anyway.',
    choices: [
      {
        text: 'Make an effort to become friends.',
        tag: 'ya_flatmate_friend',
        outcome: 'By the third month you are texting each other from your rooms. By the sixth you are inviting them to things. They become real.',
        effect: (p) => { p.m += 8; p.s += 5; p.makeFriend(72); p.addFlag('first_flatmate'); p.setMem('yaFlatmate', true) },
      },
      {
        text: 'Keep it cordial but separate.',
        tag: null,
        outcome: 'It is a functional arrangement. You learn the specific skill of sharing space without sharing your life.',
        effect: (p) => { p.m += 2; p.e += 2; p.addFlag('first_flatmate'); p.setMem('yaFlatmate', true) },
      },
      {
        text: 'They become closer than you expected.',
        tag: 'ya_flatmate_unexpected',
        outcome: 'You did not plan it. Proximity has its own logic. They see a version of you that nobody else at this distance sees.',
        effect: (p) => { p.m += 10; p.s += 6; p.makeFriend(78); p.addFlag('first_flatmate'); p.addFlag('unexpected_intimacy'); p.setMem('yaFlatmate', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ya_city_arrival',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.age >= 18 && G.age <= 24 &&
      !G.mem?.yaCityArrival &&
      G.ruralUrban === 'rural' &&
      !G.flags.has('rural_city_arrival'),
    text: (G) => {
      const name = G.character.country.name
      const arch = G.character.country.archetype
      if (['subsaharan', 'developing_urban', 'developing_unstable'].includes(arch)) {
        return 'The bus arrives in the morning and the city is already moving. You have the address of someone\'s cousin written on a piece of paper. The street is wider than any road you have been on. There are more people on this corner than in your village. The noise has layers. You stand still for a moment because you cannot decide which direction to start in.'
      }
      if (arch === 'post_soviet') {
        return `You come to ${name === 'Russia' ? 'Moscow' : 'the capital'} by train. The station is enormous and cold and full of people who know where they are going. You have a bag and a telephone number and the number of the dormitory. Your village is eight hours behind you on the same track.`
      }
      return 'The city is the size of a fact you cannot hold all at once. You knew it would be large. You did not know large was this specific — this particular density, this particular rhythm of strangers on a pavement, this particular quality of not being known by anyone.'
    },
    choices: [
      {
        text: 'Embrace it. Learn the city as fast as you can.',
        tag: 'ya_city_embrace',
        outcome: 'You buy a map or memorise a transit line. You eat at a place with no English on the menu. By the end of the month you have a route that is yours.',
        effect: (p) => { p.m += 6; p.s += 5; p.e += 3; p.addFlag('rural_city_arrival'); p.addFlag('city_adapted'); p.setMem('yaCityArrival', true) },
      },
      {
        text: 'Feel like a fraud for months and work around it.',
        tag: 'ya_city_imposter',
        outcome: 'You navigate but you do not belong yet. You are not sure belonging is available to someone from where you came from. You are not sure that is true either.',
        effect: (p) => { p.m -= 4; p.e += 4; p.r += 3; p.addFlag('rural_city_arrival'); p.setMem('yaCityArrival', true) },
      },
      {
        text: 'Map it carefully, block by block, until it becomes yours.',
        tag: null,
        outcome: 'It takes a year. The city does not hand itself over. You learn it the way you learned everything that mattered — slowly, specifically, by going back.',
        effect: (p) => { p.m += 3; p.e += 5; p.addFlag('rural_city_arrival'); p.setMem('yaCityArrival', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ya_mistake_owned',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.age >= 20 && G.age <= 25 &&
      !G.mem?.yaMistakeOwned,
    text: (G) => {
      const hasFriend = (G.friends ?? []).filter(f => f.alive).length > 0
      if (G.career) {
        return 'Something goes wrong at work and the wrong is yours. Not partly yours — yours. The information arrives in stages: first the consequence, then the cause, then your role in the cause. The account you give yourself in the first hour is not the account you give yourself by the end of the day.'
      }
      if (hasFriend) {
        return 'You say something to someone that you should not have said. Not a mistake of information but a mistake of timing, of tone, of failing to think about who you were saying it to. The look on their face is the fact. You know it the moment it happens.'
      }
      return 'You make a mistake that is clearly yours. There is no version of the story in which it is not yours. This is useful information that is not comfortable to hold.'
    },
    choices: [
      {
        text: 'Own it immediately and directly.',
        tag: 'ya_mistake_clean',
        outcome: 'The acknowledgement is uncomfortable and brief. Something is repaired, or at least the damage does not spread. You carry the lesson without the weight of the cover-up.',
        effect: (p) => { p.m -= 3; p.s += 4; p.karma += 5; p.e += 3; p.addFlag('mistake_owned'); p.setMem('yaMistakeOwned', true) },
      },
      {
        text: 'Deflect first, then own it.',
        tag: null,
        outcome: 'The deflection buys you a day. The ownership arrives late and costs more than it would have immediately. You note the difference.',
        effect: (p) => { p.m -= 5; p.r += 4; p.karma += 2; p.addFlag('mistake_owned'); p.setMem('yaMistakeOwned', true) },
      },
      {
        text: 'Let the moment pass without owning it.',
        tag: 'ya_mistake_unowned',
        outcome: 'The moment passes. The fact of it does not. You carry it as a specific weight — not guilt, but a thing that sits just below the surface of certain conversations.',
        effect: (p) => { p.m -= 4; p.r += 7; p.addFlag('mistake_not_owned'); p.setMem('yaMistakeOwned', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ya_political_moment',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.age >= 19 && G.age <= 25 &&
      !G.mem?.yaPoliticalMoment &&
      (!G.political_leaning),
    text: (G) => {
      const regime = G.regime
      const arch = G.character.country.archetype
      if (['military_dictatorship', 'single_party_authoritarian', 'single_party_communist'].includes(regime)) {
        return 'Something happens — a neighbour is taken, or a professor disappears from the schedule, or a book is removed from the library without explanation — and for the first time the system you were born into is visible to you as a system. Not a backdrop. An arrangement that someone made and that benefits someone. You cannot go back to not seeing it.'
      }
      if (['developing_unstable', 'conflict_zone'].includes(arch)) {
        return 'A news story, or a conversation, or the specific way an election result is announced, makes something clear that you had been circling for years. The world has an arrangement. The arrangement is not accidental. People have interests. Some interests are yours and some are not. You are twenty-one or twenty-two and this is the year the politics becomes personal.'
      }
      return 'The book, or the conversation, or the news cycle of a specific month organises something in you that was disorganised before. You have had opinions. This is different. This is a position — a place you stand in relation to other things, that determines what is visible from it and what is not.'
    },
    choices: [
      {
        text: 'Act on it immediately — march, organise, write.',
        tag: 'ya_politics_action',
        outcome: 'You go to the meeting or the march or the table. The energy of other people who see what you see is real. So is the gap between the energy and the change.',
        effect: (p) => {
          p.e += 4; p.s += 5; p.m += 3; p.karma += 4;
          p.addFlag('political_awareness_early');
          p.setPolitical('left');
          p.addFlag('political_awakening_twenty');
          p.setMem('yaPoliticalMoment', true);
        },
      },
      {
        text: 'Sit with it for years — let it become something solid.',
        tag: 'ya_politics_deliberate',
        outcome: 'You read more than you act. The position hardens without the certainty of the newly converted. By thirty you know what you think and can explain why.',
        effect: (p) => {
          p.e += 7; p.m += 2;
          p.addFlag('political_awareness_early');
          p.setPolitical('centre');
          p.addFlag('political_awakening_twenty');
          p.setMem('yaPoliticalMoment', true);
        },
      },
      {
        text: 'Turn away from it — the weight of it is not something you want to carry.',
        tag: 'ya_politics_withdrawal',
        outcome: 'You make a decision not to let it become your thing. The decision is its own position. It does not feel like one for several years.',
        effect: (p) => {
          p.m += 2; p.r += 3;
          p.addFlag('political_awareness_early');
          p.setPolitical('apolitical');
          p.addFlag('political_awakening_twenty');
          p.setMem('yaPoliticalMoment', true);
        },
      },
    ],
    effect: null,
  },

]
