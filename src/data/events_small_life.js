// Small moments that persist across a life: named friendships, first crushes,
// formative teachers, small triumphs, stranger kindness, a first place of your own.
// Every person here gets a name. That name lives in G.mem and comes back.

export const SMALL_LIFE_EVENTS = [

  // ── CHILDHOOD FRIENDSHIP ─────────────────────────────────────────────────────
  // The first person you chose. They get a name, they appear again.

  {
    id: 'sl_first_real_friend',
    phase: 'childhood',
    weight: 4,
    cooldown: 0,
    when: (G) => G.age >= 8 && G.age <= 12 && !G.mem?.firstFriendMade,
    text: 'You sit next to the same person three days in a row without planning to. On the third day, one of you says something honest and the other one answers honestly back. Something starts that you don\'t have a name for yet.',
    choices: null,
    effect: (p) => {
      const c = p._state.character.country
      const g = Math.random() > 0.5 ? 'male' : 'female'
      const pool = g === 'male' ? c.namePool.male : c.namePool.female
      const fname = pool[Math.floor(Math.random() * pool.length)]
      p.addFriend({ name: fname, alive: true, relationshipQuality: 72 })
      p.setMem('firstFriendName', fname)
      p.setMem('firstFriendMade', true)
      p.m += 5
      p.s += 2
    },
  },

  {
    id: 'sl_friend_first_fight',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) => G.mem?.firstFriendMade && G.age >= 10 && G.age <= 14 && !G.mem?.firstFriendFightAck,
    text: (G) => `You and ${G.mem.firstFriendName ?? 'your closest friend'} have an argument. Not the small frictions you have both navigated before — something with edges. You go home and don't speak for four days.`,
    choices: [
      {
        text: 'Go to them.',
        tag: 'friend_fight_repaired',
        outcome: (G) => `You knock on their door. ${G.mem?.firstFriendName ?? 'They'} open it. Neither of you says sorry exactly, but you both understand.`,
        effect: (p) => {
          p.m += 7; p.s += 3; p.updateFriendRel(0, 10); p.setMem('firstFriendFightAck', true)
        },
        inject: {
          id: 'sl_friend_after_repair',
          phase: null,
          cooldown: 0,
          when: null,
          text: (G) => `Something between you and ${G.mem?.firstFriendName ?? 'your friend'} is stronger for having been tested. You don't talk about the argument again. You don't need to.`,
          choices: null,
          effect: (p) => { p.m += 4; p.addFlag('had_formative_friendship') },
        },
      },
      {
        text: 'Wait for them to come to you.',
        tag: null,
        outcome: 'They do come. A week later, something is quietly mended.',
        effect: (p) => { p.m += 4; p.updateFriendRel(0, 5); p.setMem('firstFriendFightAck', true) },
        inject: null,
      },
      {
        text: 'Let the distance settle.',
        tag: 'friend_fight_abandoned',
        outcome: 'The gap becomes a habit. You don\'t recover this one.',
        effect: (p) => {
          p.m -= 6; p.r += 5; p.updateFriendRel(0, -25); p.setMem('firstFriendFightAck', true)
        },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'sl_friend_shared_season',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) => G.mem?.firstFriendMade && (G.friends ?? []).length > 0 &&
      (G.friends[0]?.relationshipQuality ?? 0) > 45 &&
      G.age >= 13 && G.age <= 17 && !G.mem?.friendSharedSeasonAck,
    text: (G) => {
      const name = G.mem?.firstFriendName ?? G.friends[0]?.name ?? 'your closest friend'
      return `You and ${name} spend most of one season together without planning to. Nowhere important. Just time and proximity and the specific freedom of being old enough to wander and young enough to have nowhere to be. You will refer to this period later without being fully able to explain what you're referring to.`
    },
    choices: null,
    effect: (p) => {
      p.m += 7; p.s += 3; p.updateFriendRel(0, 10)
      p.addFlag('had_formative_friendship')
      p.setMem('friendSharedSeasonAck', true)
    },
  },

  {
    id: 'sl_friend_grows_apart',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('had_formative_friendship') && G.mem?.firstFriendName &&
      G.age >= 20 && G.age <= 27 && !G.mem?.friendGrownApartAck,
    text: (G) => {
      const name = G.mem.firstFriendName
      return `You realise you and ${name} are living different lives now — not worse lives, just different. The messages are fewer. When you do speak there is warmth but also a small gap where the ease used to be. You are both becoming people the other one didn't fully predict.`
    },
    choices: [
      {
        text: 'Make the effort — plans, a visit, something real.',
        tag: 'maintained_first_friendship',
        outcome: (G) => `You make it happen. Sitting across from ${G.mem?.firstFriendName ?? 'them'}, you find that most of what you had is still there. The gap was just distance, not distance.`,
        effect: (p) => { p.m += 8; p.s += 3; p.updateFriendRel(0, 12); p.setMem('friendGrownApartAck', true) },
        inject: null,
      },
      {
        text: 'Let it find its own level.',
        tag: null,
        outcome: 'You remain in each other\'s lives as something smaller than you were. That is also something.',
        effect: (p) => { p.m -= 3; p.r += 3; p.updateFriendRel(0, -8); p.setMem('friendGrownApartAck', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  // ── CRUSH THAT ECHOES ────────────────────────────────────────────────────────
  // The first person you were drawn to. Named. Returns across decades.

  {
    id: 'sl_childhood_crush',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) => G.age >= 9 && G.age <= 12 && !G.mem?.firstCrushName,
    text: 'There is one person at school who you look for in a room before you do anything else. You don\'t have a word for this yet. It is different from ordinary attention.',
    choices: null,
    effect: (p) => {
      const c = p._state.character.country
      const myGender = p._state.character.gender
      const isLGBTQ = p.flags.includes('lgbtq_identity')
      const crushGender = isLGBTQ ? myGender : (myGender === 'male' ? 'female' : 'male')
      const pool = crushGender === 'male' ? c.namePool.male : c.namePool.female
      const fname = pool[Math.floor(Math.random() * pool.length)]
      p.setMem('firstCrushName', fname)
      p.m += 3
      p.addFlag('had_childhood_crush')
    },
  },

  {
    id: 'sl_crush_adolescent_encounter',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('had_childhood_crush') && G.mem?.firstCrushName &&
      G.age >= 14 && G.age <= 17 && !G.mem?.crushAdolAck,
    text: (G) => {
      const name = G.mem.firstCrushName
      return `${name} is at the same gathering. You've known each other for years, but something about tonight shifts it. A small thing they say. The hour. You are aware of them in a room the way you were at nine.`
    },
    choices: [
      {
        text: 'Say something.',
        tag: 'pursued_first_crush',
        outcome: (G) => `You say something small. ${G.mem?.firstCrushName ?? 'They'} answer. Nothing resolves, but something is acknowledged.`,
        effect: (p) => { p.m += 8; p.s += 4; p.setMem('crushAdolAck', true) },
        inject: {
          id: 'sl_crush_next_encounter',
          phase: null,
          cooldown: 0,
          when: null,
          text: (G) => `You see ${G.mem?.firstCrushName ?? 'them'} again that week. The conversation goes somewhere it didn't used to go. Neither of you mentions the other night.`,
          choices: null,
          effect: (p) => { p.m += 5; p.s += 2; p.addFlag('first_crush_reciprocated') },
        },
      },
      {
        text: 'Say nothing.',
        tag: null,
        outcome: 'On the walk home you compose the sentence you might have said.',
        effect: (p) => { p.r += 4; p.setMem('crushAdolAck', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'sl_crush_midlife_echo',
    phase: 'midlife',
    weight: 1,
    cooldown: 0,
    when: (G) => G.flags.has('had_childhood_crush') && G.mem?.firstCrushName &&
      G.age >= 38 && !G.mem?.crushMidlifeAck,
    text: (G) => {
      const name = G.mem.firstCrushName
      return `You think of ${name} today for no particular reason. Not with longing — that was a different version of you. More like recognition: they were the first person you ever chose out of everyone in a room. You don't look them up.`
    },
    choices: null,
    effect: (p) => { p.r += 2; p.setMem('crushMidlifeAck', true) },
  },

  // ── FORMATIVE TEACHER ────────────────────────────────────────────────────────
  // Named. A sentence they say travels decades.

  {
    id: 'sl_formative_teacher',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) => G.age >= 9 && G.age <= 14 && !G.mem?.formativeTeacherName,
    text: 'There is a teacher who calls on you when you aren\'t expecting it. Not to embarrass you — to hear you. You can feel the difference immediately.',
    choices: null,
    effect: (p) => {
      const c = p._state.character.country
      const g = Math.random() > 0.5 ? 'male' : 'female'
      const surname = c.surnames[Math.floor(Math.random() * c.surnames.length)]
      p.setMem('formativeTeacherName', surname)
      p.setMem('formativeTeacherTitle', g === 'male' ? 'Mr' : 'Ms')
      p.e += 5; p.m += 3
      p.addFlag('had_formative_teacher')
    },
  },

  {
    id: 'sl_teacher_keeps_you_back',
    phase: 'adolescence',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('had_formative_teacher') && G.mem?.formativeTeacherName &&
      G.age >= 13 && G.age <= 17 && !G.mem?.teacherSentenceAck,
    text: (G) => {
      const title = G.mem.formativeTeacherTitle ?? 'Ms'
      const name = G.mem.formativeTeacherName
      return `${title} ${name} keeps you back after class. A sentence — specific, about a piece of work you turned in — that you carry out of the room and further than that.`
    },
    choices: [
      {
        text: 'Thank them — and mean it.',
        tag: null,
        outcome: 'You do. They nod. You understand that they already knew.',
        effect: (p) => { p.m += 6; p.e += 4; p.s += 2; p.setMem('teacherSentenceAck', true) },
        inject: {
          id: 'sl_teacher_lends_something',
          phase: null,
          cooldown: 0,
          when: null,
          text: (G) => {
            const title = G.mem?.formativeTeacherTitle ?? 'Ms'
            const name = G.mem?.formativeTeacherName ?? 'your teacher'
            return `${title} ${name} lends you something — a book, an article, a name to look up — without making it a formal thing. You understand this as a specific kind of trust.`
          },
          choices: null,
          effect: (p) => { p.e += 5; p.m += 3; p.addFlag('teacher_extended_trust') },
        },
      },
      {
        text: 'Nod and leave.',
        tag: null,
        outcome: 'The sentence travels with you anyway.',
        effect: (p) => { p.e += 3; p.setMem('teacherSentenceAck', true) },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'sl_teacher_remembered',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('had_formative_teacher') && G.mem?.formativeTeacherName &&
      G.age >= 36 && !G.mem?.teacherRememberedAck,
    text: (G) => {
      const title = G.mem.formativeTeacherTitle ?? 'Ms'
      const name = G.mem.formativeTeacherName
      return `You catch yourself saying something to a younger colleague — specific, about a piece of work — and you hear ${title} ${name} in it. The sentence has been with you so long you stopped knowing it was borrowed.`
    },
    choices: null,
    effect: (p) => { p.e += 3; p.karma += 5; p.setMem('teacherRememberedAck', true) },
  },

  // ── SMALL TRIUMPH ────────────────────────────────────────────────────────────
  // Something small you won. You still have it.

  {
    id: 'sl_small_trophy',
    phase: 'childhood',
    weight: 3,
    cooldown: 0,
    when: (G) => G.age >= 7 && G.age <= 13 && !G.mem?.smallTrophyAck,
    text: (G) => {
      const things = [
        'a drawing competition at school. Your entry is pinned on the wall for three weeks',
        'a spelling competition. You know the word before they finish reading it out',
        'a race you were not expected to win',
        'a science competition with something you built from whatever was available',
        'a football match. The goal was partly accidental and was not accidental',
      ]
      const idx = Math.floor((G.age + G.currentYear) % things.length)
      return `You win ${things[idx]}. You are given something small to mark it. You carry it home with both hands.`
    },
    choices: null,
    effect: (p) => {
      p.m += 6; p.e += 2
      p.addFlag('had_small_triumph')
      p.setMem('smallTrophyAck', true)
    },
  },

  {
    id: 'sl_trophy_late_life',
    phase: 'late_life',
    weight: 1,
    cooldown: 0,
    when: (G) => G.flags.has('had_small_triumph') && G.age >= 55 && !G.mem?.trophyLateAck,
    text: 'You find it while looking for something else. You have moved house at least twice since you won it, and it came with you each time. You are not sure when you decided it was something you kept. It clearly is something you kept.',
    choices: null,
    effect: (p) => { p.m += 5; p.setMem('trophyLateAck', true) },
  },

  // ── STRANGER KINDNESS ────────────────────────────────────────────────────────
  // Someone helped for no reason. You pay it forward decades later.

  {
    id: 'sl_stranger_kindness',
    phase: null,
    weight: 2,
    cooldown: 0,
    when: (G) => G.age >= 14 && G.age <= 30 && !G.mem?.strangerKindnessAck,
    text: 'A stranger does something for you that they had no reason to do. It isn\'t large. You remember it for years.',
    choices: null,
    effect: (p) => {
      p.m += 4; p.karma += 3
      p.addFlag('stranger_was_kind')
      p.setMem('strangerKindnessAck', true)
    },
  },

  {
    id: 'sl_paying_forward',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('stranger_was_kind') && G.age >= 30 && !G.mem?.paidForwardAck,
    text: 'You help a stranger who didn\'t ask. You don\'t think about why until you\'re already doing it.',
    choices: null,
    effect: (p) => { p.m += 5; p.karma += 6; p.setMem('paidForwardAck', true) },
  },

  // ── FIRST PLACE OF YOUR OWN ──────────────────────────────────────────────────
  // The first door you could close and it was only your quiet on the other side.

  {
    id: 'sl_first_own_place',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) => G.age >= 18 && G.age <= 25 && !G.mem?.firstOwnPlaceAck,
    text: 'A place that is entirely yours — rented, shared, small, it doesn\'t matter. When you close the door, there is only your quiet in the room. You don\'t know yet what a specific luxury this is.',
    choices: null,
    effect: (p) => {
      p.m += 6
      p.addFlag('had_first_own_place')
      p.setMem('firstOwnPlaceAck', true)
    },
  },

  {
    id: 'sl_first_place_gone',
    phase: 'midlife',
    weight: 1,
    cooldown: 0,
    when: (G) => G.flags.has('had_first_own_place') && G.age >= 35 && !G.mem?.firstPlaceGoneAck,
    text: 'You pass the building where you first lived alone. Someone else\'s things are in the window. You don\'t slow down, but you notice. The building hasn\'t changed. You are the variable.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('firstPlaceGoneAck', true) },
  },

  // ── THE CHOICE THAT FOLLOWED YOU ─────────────────────────────────────────────
  // Explicit callbacks: events that name a prior decision and its weight in the present.

  {
    id: 'sl_stayed_when_others_left',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => !G.flags.has('emigrated') && G.flags.has('had_emigration_opportunity') &&
      G.age >= 35 && !G.mem?.stayedCallbackAck,
    text: 'The people who left have built lives somewhere else. You can see it — the photos, the visits home, the accumulation of a life in a different country. You stayed. You made something here. You are not sure yet whether this is called wisdom or inertia, and you have stopped needing to decide.',
    choices: null,
    effect: (p) => { p.r += 3; p.karma += 4; p.setMem('stayedCallbackAck', true) },
  },

  {
    id: 'sl_left_job_three_years_on',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) => G.flags.has('left_stable_job') && G.mem?.leftStableJobYear &&
      G.currentYear >= (G.mem.leftStableJobYear + 3) && !G.mem?.leftJobCallbackAck,
    text: 'Three years since you left. You still run the calculation sometimes — what you would have if you\'d stayed. The number has a shape. So does what you have instead. You can hold both.',
    choices: null,
    effect: (p) => { p.r += 2; p.e += 3; p.setMem('leftJobCallbackAck', true) },
  },

]
