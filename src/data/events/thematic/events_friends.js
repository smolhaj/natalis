// events_friends.js
// Friend lifecycle events: drifting apart, reconnecting, a friend's crisis bleeding into your life,
// a friend asking for money, a friend dying. These are not dramatic — they are what friendship
// actually is over decades.

export const FRIEND_EVENTS = [

  // ── DRIFTING APART ───────────────────────────────────────────────────────────

  {
    id: 'friend_drift_slow',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.friends && G.friends.length > 0 && G.age >= 25 && !G.mem.friendDrift,
    text: (G) => {
      const f = G.friends[0]
      return `You and ${f?.name ?? 'an old friend'} were close for years. The gap started with distance — different cities, different schedules — and became a habit. You realize you have not spoken in eight months. The last message sits unanswered in a thread from the spring.`
    },
    choices: [
      {
        text: 'Reach out',
        tag: null,
        outcome: 'You message. They reply in minutes, as if no time has passed. Something is reclaimed.',
        effect: (p) => { p.m += 8; p.s += 3; p.updateFriendRel(0, 10); p.setMem('friendDrift', true) },
      },
      {
        text: 'Let it go — lives move in different directions',
        tag: null,
        outcome: 'You do not reach out. This becomes permanent in a way you did not intend.',
        effect: (p) => { p.m -= 6; p.r += 5; p.updateFriendRel(0, -15); p.setMem('friendDrift', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'friend_drift_values',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.friends && G.friends.length > 0 && G.age >= 32 && !G.mem.friendDriftValues,
    text: (G) => {
      const f = G.friends[0]
      return `You and ${f?.name ?? 'a long-standing friend'} no longer agree on the things that used to not be a problem. Politics, money, how to raise children. The conversations have an unspoken perimeter now — topics that are navigated around rather than discussed. The friendship continues as a smaller version of itself.`
    },
    choices: [
      {
        text: 'Name the distance — see if there is still something underneath',
        tag: null,
        outcome: 'The conversation is awkward and real. Something survives it, changed.',
        effect: (p) => { p.m += 5; p.s += 4; p.updateFriendRel(0, 5); p.setMem('friendDriftValues', true) },
      },
      {
        text: 'Keep it surface level — the history is enough',
        tag: null,
        outcome: 'You maintain the form of the friendship without its substance. It lasts longer this way. It is also less.',
        effect: (p) => { p.m -= 5; p.r += 5; p.updateFriendRel(0, -8); p.setMem('friendDriftValues', true) },
      },
    ],
    effect: null,
  },

  // ── RECONNECTING ─────────────────────────────────────────────────────────────

  {
    id: 'friend_reconnect',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.friends && G.friends.length > 0 && G.age >= 35 &&
      (G.friends[0]?.relationshipQuality ?? 50) < 40 && !G.mem.friendReconnect,
    text: (G) => {
      const f = G.friends[0]
      return `${f?.name ?? 'An old friend'} sends a message out of nowhere. Something in their life has shifted — a divorce, a health scare, a move — and it appears to have prompted stocktaking. They say they have been thinking about people from that time and wondering how you are.`
    },
    choices: [
      {
        text: 'Meet up — it has been too long',
        tag: null,
        outcome: 'You meet. The years sit between you and also dissolve. You leave the table having remembered something you had let go of.',
        effect: (p) => { p.m += 12; p.s += 4; p.updateFriendRel(0, 20); p.setMem('friendReconnect', true) },
      },
      {
        text: 'Reply warmly but keep it at a distance — too much has changed',
        tag: null,
        outcome: 'You exchange a few messages. The warmth is real. The reunion does not happen.',
        effect: (p) => { p.m += 4; p.updateFriendRel(0, 5); p.setMem('friendReconnect', true) },
      },
    ],
    effect: null,
  },

  // ── FRIEND'S DIVORCE ─────────────────────────────────────────────────────────

  {
    id: 'friend_divorce',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.friends && G.friends.length > 0 && G.age >= 30 && !G.mem.friendDivorce,
    text: (G) => {
      const f = G.friends[0]
      return `${f?.name ?? 'A close friend'} calls on a Tuesday evening and talks for two hours. The marriage is ending. You listen. You make the right sounds. You also, quietly, file away the version of the marriage you thought you knew and begin to understand the version that was actually happening.`
    },
    choices: [
      {
        text: 'Be fully present — this is what friendship is for',
        tag: null,
        outcome: 'You are available through months of it. The friendship deepens in the way crisis allows.',
        effect: (p) => { p.m += 5; p.karma += 5; p.updateFriendRel(0, 15); p.setMem('friendDivorce', true) },
      },
      {
        text: 'Be supportive but set some limits — you have your own life',
        tag: null,
        outcome: 'You help to the extent you can. They understand. The friendship holds.',
        effect: (p) => { p.m += 2; p.updateFriendRel(0, 5); p.setMem('friendDivorce', true) },
      },
    ],
    effect: null,
  },

  // ── FRIEND'S SUCCESS / ENVY ──────────────────────────────────────────────────

  {
    id: 'friend_success_envy',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.friends && G.friends.length > 0 && G.age >= 30 && !G.mem.friendSuccess,
    text: (G) => {
      const f = G.friends[0]
      return `${f?.name ?? 'A friend'} has done well. Not spectacularly — no headlines — but the house, the job, the steady evidence of things working out. You are genuinely happy for them and also, at certain angles and in certain lights, you are not. The two things coexist without canceling each other.`
    },
    choices: [
      {
        text: 'Let yourself feel it and then move past it',
        tag: null,
        outcome: 'The envy passes. What remains is the friendship.',
        effect: (p) => { p.m -= 3; p.e += 3; p.setMem('friendSuccess', true) },
      },
      {
        text: 'Use it as a prompt — where do you want to be in five years',
        tag: null,
        outcome: 'You redirect the feeling. A few things shift in your actual life as a result.',
        effect: (p) => { p.m += 3; p.e += 5; p.w += 3; p.setMem('friendSuccess', true) },
      },
    ],
    effect: null,
  },

  // ── FRIEND ASKS FOR MONEY ────────────────────────────────────────────────────

  {
    id: 'friend_borrow_money',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.friends && G.friends.length > 0 && (G.money ?? 0) > 1000 && G.age >= 22 && !G.mem.friendBorrowMoney,
    text: (G) => {
      const f = G.friends[0]
      return `${f?.name ?? 'A friend'} asks to borrow money. The situation is specific and real — a medical bill, a gap between jobs, a problem that has a number attached. They say they will pay it back and you believe they believe that.`
    },
    choices: [
      {
        text: 'Lend it',
        tag: null,
        outcome: 'The money solves the immediate problem. Whether it comes back is a different question.',
        effect: (p) => { p.mo -= 500; p.m += 3; p.karma += 5; p.updateFriendRel(0, 8); p.setMem('friendBorrowMoney', true) },
      },
      {
        text: 'Give it as a gift — make clear you do not expect it back',
        tag: null,
        outcome: 'They protest. You insist. The friendship absorbs this cleanly.',
        effect: (p) => { p.mo -= 500; p.m += 8; p.karma += 10; p.updateFriendRel(0, 12); p.setMem('friendBorrowMoney', true) },
      },
      {
        text: 'Decline — mixing money and friendship ends both',
        tag: null,
        outcome: 'They find the money elsewhere. The refusal sits between you for a while.',
        effect: (p) => { p.updateFriendRel(0, -10); p.setMem('friendBorrowMoney', true) },
      },
    ],
    effect: null,
  },

  // ── FRIEND'S ILLNESS ─────────────────────────────────────────────────────────

  {
    id: 'friend_illness',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.friends && G.friends.length > 0 && G.age >= 35 && !G.mem.friendIllness,
    text: (G) => {
      const f = G.friends[0]
      return `${f?.name ?? 'A close friend'} receives a serious diagnosis. They tell you in a restaurant, after ordering, before the food arrives. The ordinary surroundings do not accommodate the information well. You both sit with it.`
    },
    choices: [
      {
        text: 'Be there — as much as they want, whenever they need it',
        tag: null,
        outcome: 'You show up. It is not comfortable and it is necessary. This is what friendship is capable of.',
        effect: (p) => { p.m -= 5; p.r += 5; p.karma += 8; p.updateFriendRel(0, 18); p.setMem('friendIllness', true) },
      },
      {
        text: 'Support them but keep some emotional distance — you are not good with illness',
        tag: null,
        outcome: 'You are there at a remove. They understand. You wish you were different.',
        effect: (p) => { p.m -= 8; p.r += 8; p.updateFriendRel(0, 4); p.setMem('friendIllness', true) },
      },
    ],
    effect: null,
  },

  // ── FRIEND DIES ──────────────────────────────────────────────────────────────

  {
    id: 'friend_death',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.friends && G.friends.length > 0 &&
      (G.friends[0]?.relationshipQuality ?? 50) >= 50 &&
      G.age >= 40 && !G.mem.friendDeath,
    text: (G) => {
      const f = G.friends[0]
      return `${f?.name ?? 'A close friend'} dies. It is not entirely unexpected and also completely unexpected. You go to the funeral. You hear things about their life that you did not know, which seems wrong and also seems right. People say they were one of a kind. You have always known this.`
    },
    choices: null,
    effect: (p) => { p.m -= 20; p.r += 12; p.updateFriendRel(0, -100); p.addFlag('friend_died'); p.setMem('friendDeath', true) },
  },

  {
    id: 'friend_death_late',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.friends && G.friends.length > 0 && G.age >= 65 && !G.mem.friendDeathLate,
    text: (G) => {
      const f = G.friends[0]
      return `${f?.name ?? 'One of your oldest friends'} is gone. At this age the losses come closer together. You have attended too many of these. You stand at the graveside and think about what it means to outlive the people who remember who you were when you were young.`
    },
    choices: null,
    effect: (p) => { p.m -= 18; p.r += 10; p.updateFriendRel(0, -100); p.addFlag('friend_died'); p.setMem('friendDeathLate', true) },
  },


  // ── FELT ORDINARINESS ─────────────────────────────────────────────────────────

  {
    id: 'ord_day_wasted_well',
    phase: null,
    weight: 3,
    when: (G) => (G.friends ?? []).length > 0 && G.age >= 17 && G.age <= 40 && !G.mem?.ordDayWasted && Math.random() < 0.18,
    text: (G) => {
      const f = (G.friends ?? [])[0]?.name ?? 'your friend'
      return `You meet ` + f + ` at eleven with a plan and abandon the plan by noon. The day goes: a bench, a long argument about something neither of you cares about, chips, a shop you go into for no reason, more sitting. You get home at seven having achieved nothing whatsoever. It is the best day you will have for about four months.`
    },
    choices: null,
    effect: (p) => { p.m += 11; p.s += 3; p.setMem('ordDayWasted', true) },
  },

  {
    id: 'ord_friend_no_catchup',
    phase: null,
    weight: 3,
    when: (G) => (G.friends ?? []).some(f => (f.quality ?? 50) > 60) && G.age >= 40 && !G.mem?.ordNoCatchup && Math.random() < 0.18,
    text: `You see them for the first time in two years and there is no catching up. They start a sentence in the middle, as though the last conversation had a comma at the end of it. Nobody performs how well they are doing. At one point you are both laughing at a thing that would take an hour to explain to anyone else, and you do not have to explain it.`,
    choices: null,
    effect: (p) => { p.m += 12; p.s += 2; p.setMem('ordNoCatchup', true) },
  },

  {
    id: 'ord_laughing_with_contemporary',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.age >= 66 && (G.friends ?? []).length > 0 && !G.mem?.ordOldLaugh,
    text: `The two of you have known each other since before either of you had opinions. Most of the conversation now is complaint, delivered as competition, and it is very funny. They do the impression of the man who used to run the depot. You laugh until you have to hold the arm of the chair, and it hurts somewhere in the ribs, and that is fine.`,
    choices: null,
    effect: (p) => { p.m += 13; p.h += 2; p.setMem('ordOldLaugh', true) },
  },
]
