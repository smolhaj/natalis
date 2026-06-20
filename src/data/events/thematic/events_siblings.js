// events_siblings.js
// Sibling relationship events across a lifetime: rivalry, solidarity, estrangement,
// borrowing money, emigration, illness in late life.

export const SIBLING_EVENTS = [

  // ── CHILDHOOD ────────────────────────────────────────────────────────────────

  {
    id: 'sib_childhood_rivalry',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.siblings && G.siblings.length > 0 && G.age >= 8 && !G.mem.sibRivalry,
    text: (G) => {
      const s = G.siblings[0]
      return `${s?.name ?? 'Your sibling'} is better at something you care about — school, sport, the approval of one particular parent. The competition is not spoken of directly. It runs underneath everything for a while.`
    },
    choices: [
      {
        text: 'Find your own thing — compete less, be more yourself',
        tag: null,
        outcome: 'You stop measuring against them. Something in you relaxes.',
        effect: (p) => { p.m += 5; p.e += 3; p.setMem('sibRivalry', true) },
      },
      {
        text: 'Push harder — you will not be outpaced',
        tag: null,
        outcome: 'You close the gap. The effort costs you something in ease and gains you something in discipline.',
        effect: (p) => { p.e += 5; p.m -= 3; p.setMem('sibRivalry', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sib_childhood_alliance',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.siblings && G.siblings.length > 0 && G.age >= 7 &&
      (G.character.familyStability === 'unstable' || G.character.familyStability === 'struggling') &&
      !G.mem.sibAlliance,
    text: (G) => {
      const s = G.siblings[0]
      return `You and ${s?.name ?? 'your sibling'} develop a private system — signals, rules, shared language — for navigating the unpredictability at home. You cover for each other. You know things about each other that no one else knows.`
    },
    choices: null,
    effect: (p) => { p.m += 8; p.s += 4; p.addFlag('sibling_bond_strong'); p.setMem('sibAlliance', true) },
  },

  // ── YOUNG ADULT ──────────────────────────────────────────────────────────────

  {
    id: 'sib_emigrates',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.siblings && G.siblings.length > 0 && G.age >= 20 &&
      ['subsaharan', 'developing_urban', 'developing_unstable', 'post_soviet', 'conflict_zone'].includes(G.character.country.archetype) &&
      !G.mem.sibEmigrateEvent,
    text: (G) => {
      const s = G.siblings[0]
      return `${s?.name ?? 'Your sibling'} leaves for another country. The send-off is at the airport and everyone is practical about it, which is the only way to manage it. Their seat at the table is left by habit for longer than makes sense. You adjust. The family does.`
    },
    choices: [
      {
        text: 'Celebrate the opportunity — this is what you all hoped for',
        tag: null,
        outcome: 'They go with your blessing and without the weight of guilt. The calls come weekly at first.',
        effect: (p) => { p.m += 4; p.r += 5; p.addFlag('sibling_emigrated'); p.setMem('sibEmigrateEvent', true) },
      },
      {
        text: 'Resent it quietly — you are left to handle things alone',
        tag: null,
        outcome: 'The resentment is private and accurate. They are gone. You stay.',
        effect: (p) => { p.m -= 6; p.r += 8; p.addFlag('sibling_emigrated'); p.setMem('sibEmigrateEvent', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sib_wedding',
    phase: 'young_adult',
    weight: 3,
    when: (G) => G.siblings && G.siblings.length > 0 && G.age >= 22 && !G.mem.sibWedding,
    text: (G) => {
      const s = G.siblings[0]
      return `${s?.name ?? 'Your sibling'} is getting married. You meet the partner properly for the first time over dinner and form your opinion in about forty minutes. Whether that opinion matches the years ahead is not something you can know yet.`
    },
    choices: [
      {
        text: 'Be fully present — this is their moment',
        tag: null,
        outcome: 'The wedding is good. You are genuinely there for it.',
        effect: (p) => { p.m += 8; p.s += 3; p.karma += 3; p.setMem('sibWedding', true) },
      },
      {
        text: 'Go through the motions — you have reservations about the partner',
        tag: null,
        outcome: 'You are there. Your doubts remain yours.',
        effect: (p) => { p.m += 2; p.r += 4; p.setMem('sibWedding', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sib_borrow_money',
    phase: 'young_adult',
    weight: 2,
    when: (G) => G.siblings && G.siblings.length > 0 && (G.money ?? 0) > 2000 && G.age >= 22 && !G.mem.sibBorrowMoney,
    text: (G) => {
      const s = G.siblings[0]
      return `${s?.name ?? 'Your sibling'} calls and eventually gets to the point. They need money. The situation is explained in some detail. The real situation, which involves some decisions that led here, is present between the lines. Family is family.`
    },
    choices: [
      {
        text: 'Lend it — without conditions',
        tag: null,
        outcome: 'The money helps the immediate problem. Whether it comes back depends on how things go for them.',
        effect: (p) => { p.mo -= 1000; p.m += 2; p.karma += 6; p.setMem('sibBorrowMoney', true) },
      },
      {
        text: 'Give what you can but less than asked',
        tag: null,
        outcome: 'They take what you offer. Neither of you discusses the gap between the ask and the amount.',
        effect: (p) => { p.mo -= 400; p.setMem('sibBorrowMoney', true) },
      },
      {
        text: 'Decline — you cannot keep covering the gap',
        tag: null,
        outcome: 'You say no. The relationship carries this for a while.',
        effect: (p) => { p.m -= 5; p.r += 5; p.setMem('sibBorrowMoney', true) },
      },
    ],
    effect: null,
  },

  // ── ESTRANGEMENT ─────────────────────────────────────────────────────────────

  {
    id: 'sib_estrangement',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.siblings && G.siblings.length > 0 && G.age >= 35 && !G.mem.sibEstrangement,
    text: (G) => {
      const s = G.siblings[0]
      return `The last argument with ${s?.name ?? 'your sibling'} was about something specific. The thing it was actually about — a lifetime of smaller things — was not named. You have not spoken in two years. The absence is structural now, built into family occasions and phone calls and the way your parents handle both of you.`
    },
    choices: [
      {
        text: 'Reach out — you do not want this to be permanent',
        tag: null,
        outcome: 'The call is halting and goes somewhere. Not fully, but somewhere.',
        effect: (p) => { p.m += 6; p.r -= 5; p.s += 3; p.addFlag('sibling_reconciled'); p.setMem('sibEstrangement', true) },
      },
      {
        text: 'Let it remain as it is — some distances are the right distance',
        tag: null,
        outcome: 'The estrangement continues. You stop expecting it to resolve.',
        effect: (p) => { p.m -= 6; p.r += 8; p.addFlag('sibling_estranged'); p.setMem('sibEstrangement', true) },
      },
    ],
    effect: null,
  },

  // ── LATE LIFE ────────────────────────────────────────────────────────────────

  {
    id: 'sib_late_illness',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.siblings && G.siblings.length > 0 && G.age >= 60 && !G.mem.sibLateIllness,
    text: (G) => {
      const s = G.siblings[0]
      return `${s?.name ?? 'Your sibling'} is ill in a way that is serious and probably not fully recoverable. You are in an age when this begins to happen and you understand that intellectually, but the person in the hospital bed is someone who remembers the same house you grew up in and the same parents and a specific afternoon that only the two of you remember.`
    },
    choices: [
      {
        text: 'Be there as much as possible',
        tag: null,
        outcome: 'You go when you can. The visits are not comfortable and matter more than comfort.',
        effect: (p) => { p.m -= 10; p.r += 5; p.karma += 8; p.setMem('sibLateIllness', true) },
      },
      {
        text: 'Stay in contact but manage your own health — you cannot be the caretaker',
        tag: null,
        outcome: 'You call regularly. The distance is real and necessary.',
        effect: (p) => { p.m -= 5; p.r += 6; p.setMem('sibLateIllness', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'sib_late_death',
    phase: 'late_life',
    weight: 2,
    when: (G) => G.siblings && G.siblings.length > 0 && G.age >= 65 && !G.mem.sibLateDeath,
    text: (G) => {
      const s = G.siblings[0]
      return `${s?.name ?? 'Your sibling'} dies. You are one of the few people left who holds the version of the world that both of you came from. The shared history that required two people to maintain now requires only you. You are the last custodian of certain things.`
    },
    choices: null,
    effect: (p) => { p.m -= 20; p.r += 12; p.addFlag('sibling_died'); p.setMem('sibLateDeath', true) },
  },

]
