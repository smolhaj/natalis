// events_followthrough_5.js
// Follow-through events for flags set by BUILD 40 (arts under pressure) and
// other orphaned flags from decolonisation, career-regime, and country arcs.

export const FOLLOWTHROUGH_5_EVENTS = [

  // ── CIVIL RIGHTS GENERATION ──────────────────────────────────────────────────

  {
    id: 'ft5_civil_rights_legacy',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('civil_rights_generation') &&
      G.age >= 35 &&
      !G.mem?.ft5CivilRightsLegacy,
    text: 'The movement that shaped your political formation is being taught in schools now. That is not nothing, and it is also not what anyone marched for. The textbook version is careful and resolved. The version you carry is not resolved — it is ongoing, specific, and occasionally furious in ways the textbook does not have room for.',
    choices: null,
    effect: (p) => { p.e += 4; p.r += 3; p.setMem('ft5CivilRightsLegacy', true); },
  },

  // ── RESISTANCE THROUGH ART ───────────────────────────────────────────────────

  {
    id: 'ft5_resistance_art_recognized',
    phase: 'late_life',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('resistance_through_art') &&
      G.age >= 60 &&
      !G.mem?.ft5ResistanceArtRecog,
    text: 'A younger person asks what it cost to make work that could not be made openly. You try to describe the arithmetic — the specific omissions, the double meanings the censor read as submission and the audience read as something else. What you cannot explain is why the constraint produced something that the freedom of later years did not. You are not sure you understand it yourself.',
    choices: null,
    effect: (p) => { p.m += 5; p.karma += 4; p.setMem('ft5ResistanceArtRecog', true); },
  },

  // ── ART SHOWN LATE ───────────────────────────────────────────────────────────

  {
    id: 'ft5_art_shown_late_exists',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('art_shown_late') &&
      G.age >= 40 &&
      !G.mem?.ft5ArtShownLate,
    text: 'The work you retrieved from the drawer is in the world now. Someone has read it, heard it, seen it. It exists outside your possession for the first time. The feeling is not what you expected — not vindication exactly, more like watching something that was only yours become partly someone else\'s. You are not sure if that is loss or completion.',
    choices: null,
    effect: (p) => { p.m += 8; p.setMem('ft5ArtShownLate', true); },
  },

  // ── COMPROMISED ──────────────────────────────────────────────────────────────

  {
    id: 'ft5_compromised_ledger',
    phase: 'late_life',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('compromised') &&
      G.age >= 55 &&
      !G.mem?.ft5CompromisedLedger,
    text: 'You are old enough now to see the accumulation. Each individual decision made sense at the time — this was not the hill, the cost was too high, someone else would have done it anyway. The accumulation is something that individual decisions do not prepare you for. It is not a single thing you did. It is a person you became one small step at a time.',
    choices: [
      {
        text: 'Name it to yourself — this is what happened',
        tag: null,
        outcome: 'Naming it does not undo it. It does make it more difficult to continue pretending it was something else.',
        effect: (p) => { p.r -= 4; p.karma += 8; p.setMem('ft5CompromisedLedger', true); },
      },
      {
        text: 'Each decision was the right one at the time',
        tag: null,
        outcome: 'You have spent a long time getting good at this particular argument.',
        effect: (p) => { p.r += 6; p.setMem('ft5CompromisedLedger', true); },
      },
    ],
    effect: null,
  },

  // ── CENSORED JOURNALIST ──────────────────────────────────────────────────────

  {
    id: 'ft5_censored_journalist_story',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('censored_journalist') &&
      G.age >= 40 &&
      !G.mem?.ft5CensoredJournalist,
    text: 'The story you did not run is still a story. Someone ran a version of it eventually — less complete, less sourced, years later when the cost was lower. Reading it you see all the gaps where your version would have been better. You are not sure whether feeling this is vanity or principle or both.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft5CensoredJournalist', true); },
  },

  // ── INTIMIDATED INTO SILENCE ─────────────────────────────────────────────────

  {
    id: 'ft5_intimidated_body_reflex',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('intimidated_into_silence') &&
      G.age >= 35 &&
      !G.mem?.ft5IntimidatedBody,
    text: 'Years later you are in a meeting and someone in authority asks a question and you feel the old reflex before you can name it — the specific pause, the recalibration of what is safe to say. The car that followed you is not there anymore. The regime that required it may not even exist. The body keeps its own record independently of events.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 3; p.setMem('ft5IntimidatedBody', true); },
  },

  // ── INDEPENDENCE GENERATION ──────────────────────────────────────────────────

  {
    id: 'ft5_independence_generation_reckoning',
    phase: 'late_life',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('independence_generation_self') &&
      G.age >= 55 &&
      !G.mem?.ft5IndependenceReckoning,
    text: 'You were there when the flag was raised and the crowd was so loud you could not hear the music. The country has been independent for most of your life now. The accounting is not simple. The things that were promised and arrived. The things that were promised and did not. The specific thing that was not the colonial power and also was not the dream. You hold this without resolving it because that is the only honest way to hold it.',
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 5; p.r += 4; p.setMem('ft5IndependenceReckoning', true); },
  },

  // ── FIRST COUP WITNESS ───────────────────────────────────────────────────────

  {
    id: 'ft5_first_coup_not_last',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('first_coup_witness') &&
      G.age >= 40 &&
      !G.mem?.ft5FirstCoupPattern,
    text: 'It was not the last coup. That is the thing no one told you about the first one — that it initiates you into a recurring experience. The announcement on the radio, the specific voice that says the government has been dissolved, the specific days of not knowing. By the third or fourth time you have a body of knowledge about what follows: who goes to ground, which institutions survive, which promises will be made and unmade. The knowledge is not reassuring. It is just accurate.',
    choices: null,
    effect: (p) => { p.r += 4; p.e += 5; p.setMem('ft5FirstCoupPattern', true); },
  },

  // ── BUILD 49 — FAMINE ARC ──────────────────────────────────────────────────
  // Attaches to famine_survivor flag set by world events (Holodomor, Great Leap,
  // Ethiopian famine, North Korea famine, Biafra blockade).
  // Sequential arc chains via G.mem keys across 3 years + a late-life echo.

  {
    id: 'fam_arc_price',
    phase: 'childhood',
    weight: 6,
    cooldown: 0,
    when: (G) =>
      G.flags.has('famine_survivor') &&
      !G.mem?.famArcPrice &&
      G.age >= 4,
    text: (G) => {
      const isChild = G.age < 12
      if (isChild) return 'The adults stop finishing their sentences when you come into the room. The market is louder than usual — voices raised over prices. Your mother comes back with less than she went with. You are old enough to notice. You are not old enough to know what to call it.'
      return 'The first sign is never hunger — it is the market. The price of millet has doubled since last week. The merchant shrugs and says it will be worse next week. Around him people are buying quickly, before next week comes. The word for what is coming does not exist yet. Everyone uses other words.'
    },
    choices: [
      {
        text: 'Buy what you can now, before prices climb further',
        tag: null,
        outcome: 'The money goes fast. What you have lasts two weeks longer than it would have.',
        effect: (p) => {
          p.setMem('famArcPrice', true)
          p.setMem('famineAge', p._age)
          p.mo -= Math.round((p._state.money ?? 0) * 0.3)
          p.m -= 5
        },
      },
      {
        text: 'Wait — surely prices will correct',
        tag: null,
        outcome: 'They do not correct. You have the same money and less time to use it.',
        effect: (p) => {
          p.setMem('famArcPrice', true)
          p.setMem('famineAge', p._age)
          p.m -= 8
        },
      },
    ],
    effect: null,
  },

  {
    id: 'fam_arc_body',
    phase: 'childhood',
    weight: 5,
    cooldown: 0,
    when: (G) =>
      G.mem?.famArcPrice && !G.mem?.famArcBody,
    text: (G) => {
      const isChild = G.age < 12
      if (isChild) return 'You are hungry in a way that is different from the hunger before a meal. That hunger is impatient. This hunger is quiet. It stops asking and starts being there all the time, like weather. The children are the first to show it. Your mother watches you the way people watch something they cannot fix.'
      return 'The hunger stops being urgent after the second week. It becomes background — present the way cold is present in winter, a fact the body adjusts around. You eat when something is available. Between times, your body learns to do less: slow thoughts, slow movement, sleep that is not restful.'
    },
    choices: null,
    effect: (p) => { p.setMem('famArcBody', true); p.h -= 10; p.m -= 10 },
  },

  {
    id: 'fam_arc_selling',
    phase: 'childhood',
    weight: 4,
    cooldown: 0,
    when: (G) =>
      G.mem?.famArcBody && !G.mem?.famArcSelling,
    text: (G) => {
      const hasAnimals = G.flags.has('rural_upbringing') || G.ruralUrban === 'rural'
      if (hasAnimals) return 'The goat goes first — the one your father named. The buyer pays less than it is worth because everyone knows what everyone\'s situation is. The money feeds the household for three weeks. The goat is gone. You understand, at whatever age you are, that this is irreversible in a way that money cannot undo.'
      return 'The object your mother brought from her home village. The sewing machine that was a wedding gift. Each thing has a price and a story and the price is always less than the story. You watch the inventory of the household diminish and understand something about how wealth works that you will not be able to unlearn.'
    },
    choices: [
      {
        text: 'Sell whatever is necessary',
        tag: null,
        outcome: 'It keeps you alive through the worst months. The household never recovers everything that was lost.',
        effect: (p) => {
          p.setMem('famArcSelling', true)
          p.mo += 600; p.m -= 15; p.w -= 8
          p.addFlag('famine_asset_loss')
        },
      },
      {
        text: 'Keep the most essential things — find another way',
        tag: null,
        outcome: 'Another way is harder to find. You manage, barely, by borrowing from people who also have little.',
        effect: (p) => {
          p.setMem('famArcSelling', true)
          p.addDebt(400); p.m -= 18; p.h -= 5
        },
      },
    ],
    effect: null,
  },

  {
    id: 'fam_arc_after',
    phase: 'midlife',
    weight: 4,
    cooldown: 0,
    when: (G) =>
      G.flags.has('famine_survivor') &&
      G.mem?.famArcSelling &&
      G.age > (G.mem?.famineAge ?? G.age) + 8 &&
      G.age >= 25 &&
      !G.mem?.famArcAfter,
    text: (G) => {
      const years = G.age - (G.mem?.famineAge ?? G.age)
      return `${years} years. Your pantry is overstocked in a way your partner finds puzzling. You cannot explain it rationally — there is no shortage, there has not been a shortage in years. But the reflex to store, to keep an extra month's worth of everything, arrived in the famine and has not left. The body learned something the mind keeps failing to override.`
    },
    choices: null,
    effect: (p) => {
      p.setMem('famArcAfter', true)
      p.m -= 3; p.r += 5
      p.addFlag('famine_memory')
    },
  },

]
