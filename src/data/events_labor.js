// events_labor.js — BUILD 20
// Labor and strikes: the union card, the picket line, collective action,
// the machine that does your job, solidarity. Fires across archetypes,
// gated on career type, era, and economic conditions.

export const LABOR_EVENTS = [

  // ── THE UNION CARD ────────────────────────────────────────────────────────────

  {
    id: 'lab_union_card',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.labUnion &&
      G.career &&
      G.currentYear >= 1920 && G.currentYear <= 2000 &&
      G.age >= 18 && G.age <= 45 &&
      !G.flags.has('union_member') &&
      ['wealthy_west', 'post_soviet', 'developing_urban', 'subsaharan'].includes(G.character.country.archetype),
    text: 'A union representative finds you during the break — someone you recognise from the floor, not a stranger. He doesn\'t make a speech. He tells you what the monthly fee is. He tells you what the union got in the last negotiation: two extra days of leave, a grievance process that didn\'t exist before. He slides a card across the table. You have until Friday.',
    choices: [
      {
        text: 'Sign the card',
        tag: null,
        outcome: 'Your name is in the book. The monthly fee comes out quietly and you stop noticing it after the third month.',
        effect: (p) => { p.m += 5; p.s += 3; p.mo -= 8; p.addFlag('union_member'); p.setMem('labUnion', true) },
      },
      {
        text: 'Don\'t sign — you manage fine on your own',
        tag: null,
        outcome: 'You manage fine. The negotiation next year produces a raise that you benefit from without having paid for it. You notice this.',
        effect: (p) => { p.r += 4; p.setMem('labUnion', true) },
      },
    ],
    effect: null,
  },

  // ── THE STRIKE IS CALLED ─────────────────────────────────────────────────────

  {
    id: 'lab_strike_called',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.labStrikeCalled &&
      G.flags.has('union_member') &&
      G.currentYear >= 1920 &&
      G.age >= 18,
    text: 'The vote was 71 to 34. Not unanimous — 34 people voted against, and you know some of them by name. But it passed, and now it is happening. The notice goes up on the board on Thursday afternoon. Monday morning you either cross the line or you don\'t. There is no version of this that doesn\'t mean something.',
    choices: [
      {
        text: 'Stay out — you voted for it, you stand by it',
        tag: null,
        outcome: 'You don\'t cross. The morning is cold and you stand in it and the thing you are doing has a name.',
        effect: (p) => { p.m += 3; p.karma += 5; p.s += 3; p.addFlag('lab_striking'); p.addFlag('solidarity_proven'); p.setMem('labStrikeCalled', true) },
      },
      {
        text: 'Cross the line — you can\'t afford to stop working',
        tag: null,
        outcome: 'You cross. The faces on the line follow you in. Nobody shouts. The silence is the thing that stays.',
        effect: (p) => { p.m -= 10; p.r += 8; p.s -= 4; p.addFlag('lab_crossed_line'); p.setMem('labStrikeCalled', true) },
      },
    ],
    effect: null,
  },

  // ── ON THE PICKET LINE ────────────────────────────────────────────────────────

  {
    id: 'lab_picket_line',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.labPicket &&
      G.flags.has('lab_striking'),
    text: 'The line is outside the main gate. You are standing with people you work with every day and also with people you have never exchanged more than a nod with, and the standing together is different from the nodding. A car comes through the car park — you recognise the driver. He is looking straight ahead. He turns into the entrance road. The line opens to let him through. Nobody calls anything. Nobody has to.',
    choices: [
      {
        text: 'Hold the line — don\'t react',
        tag: null,
        outcome: 'You hold it. The driver doesn\'t look back. You all stand there for a while after he\'s gone, not talking about it.',
        effect: (p) => { p.m -= 4; p.karma += 5; p.s += 2; p.addFlag('lab_solidarity'); p.setMem('labPicket', true) },
      },
      {
        text: 'Say something to him as he passes',
        tag: null,
        outcome: 'You say his name. He doesn\'t stop. The word sits in the air for a moment and then the morning resumes.',
        effect: (p) => { p.m -= 5; p.s += 3; p.karma += 3; p.addFlag('lab_solidarity'); p.setMem('labPicket', true) },
      },
    ],
    effect: null,
  },

  // ── THREE MONTHS IN ──────────────────────────────────────────────────────────

  {
    id: 'lab_strike_three_months',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.labThreeMonths &&
      G.flags.has('lab_striking') &&
      G.mem?.labPicket,
    text: 'The strike fund letter says it will cover four more weeks at the current rate. There are people on the line who are in worse positions than you — someone whose landlord has already sent a letter, someone with a child in hospital who is calculating costs you don\'t want to think about. The company has made an offer. It is worse than what you struck for. The union has called a meeting.',
    choices: [
      {
        text: 'Hold on — accepting the offer now means losing what you started for',
        tag: null,
        outcome: 'You hold. The meeting goes long. The vote to continue is closer than the original vote.',
        effect: (p) => { p.m -= 10; p.mo -= 400; p.karma += 6; p.addFlag('lab_holdout'); p.setMem('labThreeMonths', true) },
      },
      {
        text: 'Accept the offer — you can\'t ask people to keep suffering for this',
        tag: null,
        outcome: 'The offer is accepted. You go back to work the following Monday with terms that are better than nothing and worse than what you went out for.',
        effect: (p) => { p.m -= 6; p.mo -= 200; p.r += 5; p.addFlag('lab_settled_early'); p.setMem('labThreeMonths', true) },
      },
      {
        text: 'Find a way to supplement income on the side',
        tag: null,
        outcome: 'You take whatever comes in — cash-in-hand work, selling what can be sold. It keeps you out long enough to matter.',
        effect: (p) => { p.m -= 7; p.mo -= 100; p.s += 4; p.addFlag('lab_holdout'); p.setMem('labThreeMonths', true) },
      },
    ],
    effect: null,
  },

  // ── DEFEAT ───────────────────────────────────────────────────────────────────

  {
    id: 'lab_strike_outcome_defeat',
    phase: null,
    weight: 4,
    when: (G) =>
      !G.mem?.labOutcome &&
      (G.flags.has('lab_striking') || G.flags.has('lab_three_months')) &&
      !G.flags.has('lab_won'),
    text: 'The return is on a Monday. You go in through the main entrance, past where the line was. The desks are where the desks were. The work is the same. The conditions are the same. The person you manage to make eye contact with across the floor is someone who crossed the line three months ago. Neither of you speaks about it. You pick up where you left off in the way that means you did not pick up where you left off at all.',
    choices: null,
    effect: (p) => {
      p.m -= 14
      p.r += 10
      p.e += 4
      p.s += 3
      p.addFlag('strike_defeat')
      p.setMem('labOutcome', true)
    },
  },

  // ── VICTORY ──────────────────────────────────────────────────────────────────

  {
    id: 'lab_strike_outcome_win',
    phase: null,
    weight: 1,
    when: (G) =>
      !G.mem?.labOutcome &&
      (G.flags.has('lab_striking') || G.flags.has('lab_holdout')) &&
      G.stats.karma > 55,
    text: 'The agreement is announced on a Friday afternoon. The representative reads the terms out loud in the car park. The hourly rate is a figure. The extra leave is a number of days. The grievance procedure has teeth now. These are small specific things. They are also the specific things you went out for. The people around you are not celebrating exactly — it is more like a slow release, like a noise finally stopping.',
    choices: null,
    effect: (p) => {
      p.m += 16
      p.karma += 8
      p.s += 5
      p.e += 3
      p.addFlag('strike_victory')
      p.addFlag('lab_won')
      p.setMem('labOutcome', true)
    },
  },

  // ── THE LUDDITE MOMENT ────────────────────────────────────────────────────────

  {
    id: 'lab_luddite_moment',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.labLuddite &&
      G.career &&
      G.currentYear >= 1880 &&
      G.age >= 22,
    text: (G) => {
      const year = G.currentYear
      const career = G.career
      const field = career?.field || ''

      if (year < 1920) {
        return 'The new loom does in a day what took a week. The manufacturer walks you through the floor and explains the mechanism as if the mechanism is the point. You understand the mechanism. You also understand what it means for the number of people on this floor next year.'
      }
      if (year < 1970) {
        return 'The machine arrives in a crate and takes three men to uninstall it from the crate. It does what ' + (field === 'finance' || field === 'admin' ? 'the counting room' : 'six workers') + ' did before it, faster and without stopping for a cigarette break. The foreman calls it progress. You call it by its correct name, which is the same word.'
      }
      if (year < 1995) {
        return 'The software arrives on a disc. It runs on the new computer they installed last month. The thing it does — ' + (field === 'finance' ? 'the ledger work, the reconciliations' : field === 'media' ? 'the typesetting, the layout' : 'the filing, the calculations') + ' — took three people before. It takes one now, and a different kind of one. You are the kind who did it before.'
      }
      return 'The article is in the trade publication you get sent. The headline is about efficiency. The headline is also, if you read it again, about you. The system they are describing does what you do, faster, without needing the commute. The article uses the word "transition." You have a mortgage.'
    },
    choices: [
      {
        text: 'Adapt — learn what the machine needs that you can provide',
        tag: null,
        outcome: 'You learn. The learning is not pleasant and it takes longer than you expected and you manage it. The job that exists on the other side of it is different from the job you had.',
        effect: (p) => { p.e += 7; p.m -= 5; p.addFlag('luddite_moment'); p.addFlag('technology_adapter'); p.setMem('labLuddite', true) },
      },
      {
        text: 'Resist — what the machine does and what you do are not the same thing',
        tag: null,
        outcome: 'You resist, which means you articulate the difference. Some people understand the distinction. The company does not especially care.',
        effect: (p) => { p.e += 5; p.m -= 8; p.r += 5; p.addFlag('luddite_moment'); p.addFlag('technology_resister'); p.setMem('labLuddite', true) },
      },
      {
        text: 'Find the thing the machine cannot do — and become indispensable at it',
        tag: null,
        outcome: 'The machine cannot read the room. It cannot manage the person who is having a bad year. You become very good at the parts of the job that require being human. For a while this is enough.',
        effect: (p) => { p.e += 6; p.s += 5; p.m += 2; p.addFlag('luddite_moment'); p.addFlag('human_irreplaceable'); p.setMem('labLuddite', true) },
      },
    ],
    effect: null,
  },

  // ── A COLLEAGUE IN TROUBLE ────────────────────────────────────────────────────

  {
    id: 'lab_solidarity_test',
    phase: null,
    weight: 3,
    when: (G) =>
      !G.mem?.labSolidarity &&
      G.career &&
      G.age >= 25,
    text: 'A colleague — someone you work alongside but are not close to — is in a dispute with management. The details are clear enough: they raised something that needed raising, and raising it has cost them. It is not your fight. You have your own things to manage. The question of whether to make it your fight, and how, is the question in front of you.',
    choices: [
      {
        text: 'Act — speak up, make it visible that it is not only their problem',
        tag: null,
        outcome: 'You speak. The room gets quieter when you do. What follows is uncertain, but the speaking itself is not.',
        effect: (p) => { p.karma += 9; p.m += 3; p.s += 4; p.addFlag('solidarity_proven'); p.setMem('labSolidarity', true) },
      },
      {
        text: 'Stay out — getting involved would cost you things you can\'t afford to lose',
        tag: null,
        outcome: 'You stay out. You are careful not to look in their direction when the decision is announced. You become the kind of person who does this.',
        effect: (p) => { p.r += 7; p.m -= 4; p.addFlag('solidarity_failed'); p.setMem('labSolidarity', true) },
      },
      {
        text: 'Ask them privately what they actually need',
        tag: null,
        outcome: 'You ask. They tell you. What they need is smaller than a confrontation and more specific. You can do the specific thing.',
        effect: (p) => { p.karma += 6; p.s += 5; p.m += 5; p.addFlag('solidarity_proven'); p.setMem('labSolidarity', true) },
      },
    ],
    effect: null,
  },

  // ── THE FIRST BOSS ────────────────────────────────────────────────────────────

  {
    id: 'lab_first_boss',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.labFirstBoss &&
      G.career &&
      G.age >= 18 && G.age <= 24,
    text: 'Your first boss is not a monster. They are a person with power over your income, which is a specific kind of relationship that requires a specific kind of literacy. They have preferences about when you speak and when you don\'t. They have ways of communicating that are not the ways they say they communicate. The work itself is one thing. Managing this person is another. Nobody told you the second part was part of the job.',
    choices: [
      {
        text: 'Learn to read them — the skill is worth having',
        tag: null,
        outcome: 'You develop a fluency with authority that you will use in every job you have after this. It is not the same as liking it.',
        effect: (p) => { p.e += 5; p.s += 5; p.m += 3; p.addFlag('authority_learned'); p.setMem('labFirstBoss', true) },
      },
      {
        text: 'Push back early — establish that you have a position',
        tag: null,
        outcome: 'The push back is noticed. It costs something in the short term and earns something over time. The arithmetic takes a while to work out.',
        effect: (p) => { p.e += 4; p.s += 4; p.m -= 4; p.addFlag('authority_learned'); p.addFlag('early_boundary_setter'); p.setMem('labFirstBoss', true) },
      },
      {
        text: 'Be exactly what they expect — make yourself useful and invisible',
        tag: null,
        outcome: 'The strategy works well enough for long enough. What it costs is harder to name — something to do with the difference between what you\'re good at and what you\'re used for.',
        effect: (p) => { p.e += 3; p.m -= 3; p.r += 4; p.addFlag('authority_learned'); p.setMem('labFirstBoss', true) },
      },
    ],
    effect: null,
  },

]
