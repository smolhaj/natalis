// events_followthrough_51.js
// Anniversary-aware follow-throughs for TIMESTAMPED_FLAGS that have thin event coverage.
// All events gate on (currentYear - mem.flagYear) >= N to fire at meaningful distances
// from the original event — honouring how time changes what things mean.

export const FOLLOWTHROUGH_51_EVENTS = [

  // ── FAMINE MEMORY ─────────────────────────────────────────────────────────

  {
    id: 'ft51_famine_memory_20yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('famine_memory') &&
      G.mem?.famine_memoryYear &&
      G.currentYear - G.mem.famine_memoryYear >= 20 &&
      G.age >= 35 &&
      !G.mem?.ft51FamineMemory20,
    text: `Twenty years is long enough to have mostly forgotten. Long enough to live somewhere with full shelves and take the full shelves as a baseline. Then there is a moment — someone scraping half their dinner into the bin without pausing, or bread going stale on the counter, or the unremarkable way the restaurant replaces the basket and you watch the old bread go without ceremony — and the body knows before the mind does. Not grief exactly. A specific kind of witnessing.`,
    choices: [
      {
        text: 'You say nothing. The response to it lives in you rather than in any conversation.',
        tag: null,
        outcome: 'The distance between what you know and what is normal now is not something that closes. You have just learned to carry it without it showing.',
        effect: (p) => {
          p.r += 3
          p.setMem('ft51FamineMemory20', true)
        },
      },
      {
        text: 'You say something. A sentence, not a lecture.',
        tag: null,
        outcome: 'The sentence lands somewhere, or it doesn\'t. What mattered was saying it. The knowing doesn\'t belong only in you.',
        effect: (p) => {
          p.r += 2
          p.karma += 2
          p.setMem('ft51FamineMemory20', true)
        },
      },
    ],
    effect: null,
  },

  // ── LGBTQ FAMILY REJECTION ────────────────────────────────────────────────

  {
    id: 'ft51_lgbtq_rejection_10yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('lgbtq_family_rejection') &&
      G.mem?.lgbtq_family_rejectionYear &&
      G.currentYear - G.mem.lgbtq_family_rejectionYear >= 10 &&
      G.currentYear - G.mem.lgbtq_family_rejectionYear < 20 &&
      G.age >= 28 &&
      !G.mem?.ft51LgbtqRejection10,
    text: `Ten years since the conversation that ended something between you and your family. The world has changed enough in that time that the silence seems stranger now than it did then — there is language for it now, visibility, the fact of people like you everywhere in public. None of that closes the specific absence. Some losses get further away. This one has a weight that stays about the same distance.`,
    choices: [
      {
        text: 'You have made a family from the people who chose you. That is its own thing.',
        tag: null,
        outcome: 'It is its own thing. Not a replacement — something different. The chosen family understands the distinction without being told.',
        effect: (p) => {
          p.m += 4
          p.r += 2
          p.setMem('ft51LgbtqRejection10', true)
        },
      },
      {
        text: 'You try again. A letter. Not asking for anything — just opening the door.',
        tag: null,
        outcome: 'The letter goes. You do not know yet what comes back. The sending was the part you controlled.',
        effect: (p) => {
          p.m += 2
          p.karma += 4
          p.r += 3
          p.setMem('ft51LgbtqRejection10', true)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'ft51_lgbtq_rejection_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('lgbtq_family_rejection') &&
      G.mem?.lgbtq_family_rejectionYear &&
      G.currentYear - G.mem.lgbtq_family_rejectionYear >= 25 &&
      G.age >= 52 &&
      !G.mem?.ft51LgbtqRejectionLate,
    text: `Your parents are old or gone now. The conversation you never had is no longer possible, or is possible only in a form that isn't the conversation anymore — beside a hospital bed, or speaking to a grave. A quarter century of a thing unfixed. You have carried it far enough that you know its weight precisely. Other people would not know it was there.`,
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 4
      p.setMem('ft51LgbtqRejectionLate', true)
    },
  },

  // ── EXPERIENCED RACISM ────────────────────────────────────────────────────

  {
    id: 'ft51_racism_accumulation_15yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('experienced_racism') &&
      G.mem?.experienced_racismYear &&
      G.currentYear - G.mem.experienced_racismYear >= 15 &&
      G.age >= 35 &&
      !G.mem?.ft51RacismAccum15,
    text: `Fifteen years of navigating specific rooms in a specific way. You are good at it. You have learned to read the pause, the question behind the question, the warmth that is not quite warmth, the rooms that are open and the rooms that are technically open. The skill is real. The effort required to have it is not something anyone asked about or would easily understand.`,
    choices: [
      {
        text: 'You have learned not to let it show. The mask is so practiced it almost feels like your face.',
        tag: null,
        outcome: 'The mask is effective. The cost of effectiveness is the thing you do not mention in professional settings.',
        effect: (p) => {
          p.m -= 4
          p.e += 2
          p.setMem('ft51RacismAccum15', true)
        },
      },
      {
        text: 'You have stopped softening your presence for rooms that wouldn\'t notice the effort.',
        tag: null,
        outcome: 'Some rooms respond poorly. The rooms that matter mostly don\'t. You have become more useful to yourself.',
        effect: (p) => {
          p.m += 3
          p.r += 2
          p.setMem('ft51RacismAccum15', true)
        },
      },
    ],
    effect: null,
  },

  // ── GRIEF DRINKING ────────────────────────────────────────────────────────

  {
    id: 'ft51_grief_drinking_3yr',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('grief_drinking') &&
      G.mem?.grief_drinkingYear &&
      G.currentYear - G.mem.grief_drinkingYear >= 3 &&
      G.currentYear - G.mem.grief_drinkingYear < 8 &&
      !G.mem?.ft51GriefDrinking3,
    text: `The grief was the original reason. After three years, the drinking is its own thing — not grief anymore, just routine, just the bottle that's always in the same place and the glass you reach for without deciding to. The distinction matters only if you are trying to stop, and stopping is a different kind of work than the grief was.`,
    choices: [
      {
        text: 'You recognise the shape of it. The recognition is a start.',
        tag: null,
        outcome: 'Recognition doesn\'t stop the reaching for the glass. It changes the quality of what you know about yourself when you do.',
        effect: (p) => {
          p.m -= 3
          p.h -= 2
          p.e += 2
          p.setMem('ft51GriefDrinking3', true)
        },
      },
      {
        text: 'You put the bottle somewhere inconvenient. That is all. Just inconvenient.',
        tag: null,
        outcome: 'Inconvenient is enough to slow the automatic reaching. Enough to make the reaching a decision instead of a reflex. That changes the count.',
        effect: (p) => {
          p.h += 3
          p.karma += 2
          p.setMem('ft51GriefDrinking3', true)
        },
      },
    ],
    effect: null,
  },

  // ── OIL DELTA WITNESS ─────────────────────────────────────────────────────

  {
    id: 'ft51_oil_delta_10yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('oil_delta_witness') &&
      G.mem?.oil_delta_witnessYear &&
      G.currentYear - G.mem.oil_delta_witnessYear >= 10 &&
      G.age >= 30 &&
      !G.mem?.ft51OilDelta10,
    text: `A decade since the spill. The company's cleanup report was filed. The creek has not recovered. You know this because you still have family there, because someone still drinks from a well you would not drink from, because the cassava plants that grow in certain soil here now are the only cassava plants that grow. The company's cleanup report is filed in the same place all these reports go.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 5
      p.karma += 3
      p.setMem('ft51OilDelta10', true)
    },
  },

  // ── CHERNOBYL LIQUIDATOR ──────────────────────────────────────────────────

  {
    id: 'ft51_chernobyl_10yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('chernobyl_liquidator') &&
      G.mem?.chernobyl_liquidatorYear &&
      G.currentYear - G.mem.chernobyl_liquidatorYear >= 10 &&
      G.age >= 30 &&
      !G.mem?.ft51Chernobyl10,
    text: `The liquidator's certificate entitles you to a small pension supplement and some medical monitoring. The doctor who does the monitoring looks at the numbers and says something noncommittal and makes a note. You have learned to read the note in the expression rather than the words. The state has a specific way of acknowledging a debt without paying it. The certificate is the acknowledgement. The pension supplement is a rounding error.`,
    choices: [
      {
        text: 'You keep going to the appointments. The monitoring is a form of witness even if it changes nothing.',
        tag: null,
        outcome: 'The appointments continue. The numbers continue. Something is being recorded. Whether it matters depends on who reads it.',
        effect: (p) => {
          p.h -= 3
          p.r += 3
          p.setMem('ft51Chernobyl10', true)
        },
      },
      {
        text: 'You stop going. The results don\'t change your options. You know what you know.',
        tag: null,
        outcome: 'The choice not to know specifically is also a kind of peace. Some things can be lived with better without the exact number.',
        effect: (p) => {
          p.m += 2
          p.h -= 2
          p.setMem('ft51Chernobyl10', true)
        },
      },
    ],
    effect: null,
  },

  // ── WRITING IN DRAWER ─────────────────────────────────────────────────────

  {
    id: 'ft51_writing_drawer_10yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('writing_in_drawer') &&
      G.mem?.writing_in_drawerYear &&
      G.currentYear - G.mem.writing_in_drawerYear >= 10 &&
      G.age >= 30 &&
      !G.mem?.ft51WritingDrawer10,
    text: `The manuscript has been in the drawer for ten years. You know exactly how long because you remember the year you stopped working on it, the specific reason you told yourself at the time, which turned out to be a season's reason rather than a real one. It is still there. Ten years has not improved or worsened it. Ten years has only meant that opening the drawer is now a bigger thing than it was when you first closed it.`,
    choices: [
      {
        text: 'You take it out. You don\'t know what you\'ll do with it. That\'s not the point yet.',
        tag: null,
        outcome: 'The work is better than you remembered. The reasons you stopped are less solid than they seemed. Neither discovery is simple.',
        effect: (p) => {
          p.m += 5
          p.e += 2
          p.addFlag('project_revived')
          p.setMem('ft51WritingDrawer10', true)
        },
      },
      {
        text: 'You don\'t open the drawer. Some things are better as what they could have been.',
        tag: null,
        outcome: 'The closed drawer is also a choice. The work is still there. That fact doesn\'t change regardless of what you do with it.',
        effect: (p) => {
          p.r += 3
          p.setMem('ft51WritingDrawer10', true)
        },
      },
    ],
    effect: null,
  },

  // ── MUSIC PRIVATE ─────────────────────────────────────────────────────────

  {
    id: 'ft51_music_private_10yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('music_private') &&
      G.mem?.music_privateYear &&
      G.currentYear - G.mem.music_privateYear >= 10 &&
      G.age >= 30 &&
      !G.mem?.ft51MusicPrivate10,
    text: `For ten years you have played music that no one else has heard. There is a specific kind of freedom in that. There is also a specific kind of wondering. Not ambition exactly — the performing life is something else and you have mostly made your peace with not having it. Just the occasional thought: if this had gone somewhere, where would it have gone? The thought doesn't resolve. You play anyway.`,
    choices: null,
    effect: (p) => {
      p.m += 4
      p.r += 2
      p.setMem('ft51MusicPrivate10', true)
    },
  },

  // ── RUNNER HABIT ──────────────────────────────────────────────────────────

  {
    id: 'ft51_runner_10yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('runner_habit') &&
      G.mem?.runner_habitYear &&
      G.currentYear - G.mem.runner_habitYear >= 10 &&
      G.age >= 30 && G.age <= 52 &&
      !G.mem?.ft51Runner10,
    text: `Ten years of the same route, or routes that have accumulated into a body that knows distance the way it knows hunger. The number of hours is not small. You have done this long enough that not doing it would be the strange thing, the thing that required explanation. The running has been in the life so long it stopped being a habit and became a condition of the life.`,
    choices: null,
    effect: (p) => {
      p.h += 4
      p.m += 3
      p.setMem('ft51Runner10', true)
    },
  },

  {
    id: 'ft51_runner_body_change',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('runner_habit') &&
      G.mem?.runner_habitYear &&
      G.currentYear - G.mem.runner_habitYear >= 20 &&
      G.age >= 55 &&
      !G.mem?.ft51RunnerBodyChange,
    text: `The body is changing what it will do. Not a sudden injury but a slow negotiation — the knee that gives an opinion now about pace and surface, the recovery that takes a day longer than it used to. You have been running for twenty years. The body doesn't owe you the same conversation indefinitely. You are learning a different kind of running. It turns out the distance you're covering is still the point. The pace was never the point.`,
    choices: [
      {
        text: 'You adjust. Shorter, slower, different shoes. Still going.',
        tag: null,
        outcome: 'Still going. The commitment was always to the going, not the speed. The body responds to the accommodation.',
        effect: (p) => {
          p.h += 3
          p.m += 4
          p.setMem('ft51RunnerBodyChange', true)
        },
      },
      {
        text: 'You shift to walking. The walking is continuous with the running. The same impulse.',
        tag: null,
        outcome: 'The route is the same. The time it takes is different. Everything else about the morning is unchanged.',
        effect: (p) => {
          p.h += 2
          p.m += 3
          p.r += 2
          p.setMem('ft51RunnerBodyChange', true)
        },
      },
    ],
    effect: null,
  },

  // ── SOLIDARITY PROVEN ─────────────────────────────────────────────────────

  {
    id: 'ft51_solidarity_15yr',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('solidarity_proven') &&
      G.mem?.solidarity_provenYear &&
      G.currentYear - G.mem.solidarity_provenYear >= 15 &&
      G.age >= 35 &&
      !G.mem?.ft51Solidarity15,
    text: `Fifteen years ago you made a choice that cost you something. The people you made it alongside have scattered — some kept the same politics, some didn't, some lost touch entirely. The cause has moved in directions you didn't predict. You are left with what you chose then, independent of what the choice became. That version of yourself is still there, making the same calculation, still getting the same answer.`,
    choices: null,
    effect: (p) => {
      p.m += 4
      p.karma += 2
      p.r += 2
      p.setMem('ft51Solidarity15', true)
    },
  },

  // ── EXPERIENCED MISCARRIAGE ───────────────────────────────────────────────

  {
    id: 'ft51_miscarriage_3yr',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      (G.flags.has('experienced_miscarriage') || G.flags.has('multiple_miscarriage')) &&
      G.mem?.experienced_miscarriageYear &&
      G.currentYear - G.mem.experienced_miscarriageYear >= 3 &&
      G.currentYear - G.mem.experienced_miscarriageYear < 7 &&
      !G.mem?.ft51Miscarriage3,
    text: `Three years. Other people have stopped marking it. That is correct — it is not their time to keep. The calculation of what age the child would be is yours alone to do, and you do it without deciding to. In the spring or whatever season it was. The date has a texture even now that the days around it don't have.`,
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.r += 3
      p.setMem('ft51Miscarriage3', true)
    },
  },

  // ── LOST FRIEND ───────────────────────────────────────────────────────────

  {
    id: 'ft51_lost_friend_10yr',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('lost_friend') &&
      G.mem?.lost_friendYear &&
      G.currentYear - G.mem.lost_friendYear >= 10 &&
      G.age >= 38 &&
      !G.mem?.ft51LostFriend10,
    text: `Ten years. The shape of the friendship is still present in the way a word you've stopped saying is still present — in the space where it used to go. You still reach for them sometimes in a particular kind of moment: something very funny, or very bad, or very strange. The reaching happens before the remembering. That gap — the reach and then the absence — has not narrowed particularly in ten years. You have just become more familiar with it.`,
    choices: null,
    effect: (p) => {
      p.m -= 4
      p.r += 4
      p.setMem('ft51LostFriend10', true)
    },
  },

]
