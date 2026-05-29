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

]
