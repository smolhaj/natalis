// events_followthrough_67.js
// Follow-through events for Philippines depth flags.

export const FOLLOWTHROUGH_67_EVENTS = [

  // ── BPO GENERATION ────────────────────────────────────────────────────────

  {
    id: 'ft67_bpo_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ph_bpo_generation') &&
      G.age >= 32 &&
      !G.mem?.ft67BPOMidlife,
    text: 'The night shifts are behind you, or you are still in them. Either way the body clock was changed. You notice it in the way you still sometimes wake at 3am and feel, for a moment before you remember, that this is when the work begins. The years of answering as "David" or "Jessica" taught you something about code-switching that has stayed useful. The Americans whose problems you solved have no idea that the accent they trusted was learned on purpose, in a training room, in the middle of the night.',
    choices: null,
    effect: (p) => {
      p.r += 2
      p.e += 2
      p.setMem('ft67BPOMidlife', true)
    },
  },

  {
    id: 'ft67_bpo_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('ph_bpo_generation') &&
      G.age >= 52 &&
      !G.mem?.ft67BPOLate,
    text: 'The BPO industry remade a generation. You were part of it: the generation that discovered you could earn three times the local salary and never leave the country, only leave the time zone. What the industry cost — the circadian damage, the distance from the social life of people who slept at night — is the kind of cost that doesn\'t appear in the GDP figures. The figures only count the remittances. The figures are correct and incomplete.',
    choices: null,
    effect: (p) => {
      p.r += 3
      p.setMem('ft67BPOLate', true)
    },
  },

  // ── MORO GENERATION ───────────────────────────────────────────────────────

  {
    id: 'ft67_moro_bangsamoro',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ph_moro_generation') &&
      G.currentYear >= 2019 &&
      G.age >= 30 &&
      !G.mem?.ft67MoroBangsamoro,
    text: 'The Bangsamoro Organic Law passed in 2019. The BARMM — the Bangsamoro Autonomous Region in Muslim Mindanao — has a name and a parliament now. You watch the coverage from wherever you are and you feel something that is not quite what you expected to feel. The justice of the cause was never in question. What the law produces — whether the autonomy is real, whether the conditions that produced the conflict are actually changing — is a different question, and it will take a generation to answer.',
    choices: null,
    effect: (p) => {
      p.r += 3
      p.e += 2
      p.setMem('ft67MoroBangsamoro', true)
    },
  },

  {
    id: 'ft67_moro_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('ph_moro_generation') &&
      G.age >= 55 &&
      !G.mem?.ft67MoroLate,
    text: 'You have been defined, your whole life, in relation to a conflict. The Moro homeland: a concept carried in the body before it was carried in legislation. You have watched the conflict change shape over fifty years — the MNLF, then the MILF, then the peace talks, then the Bangsamoro. The autonomy your parents\' generation demanded is now partially in law. The life you lived in the meantime was not a waiting room. It was the life.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m += 3
      p.setMem('ft67MoroLate', true)
    },
  },

  // ── HACIENDA GENERATION ───────────────────────────────────────────────────

  {
    id: 'ft67_hacienda_reform_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ph_hacienda_generation') &&
      G.currentYear >= 1988 &&
      G.age >= 28 &&
      !G.mem?.ft67HaciendaReform,
    text: 'The Comprehensive Agrarian Reform Program passed in 1988. The hacienda system was supposed to be redistributed. The process was slow and uneven — land was reclassified, exemptions were claimed, the legal machinery of delay was applied with sophistication. Some land changed hands. Some did not. You know someone who waited twenty years for a title that finally came, and someone else who is still waiting. The hacienda family is still there. The cane still grows.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 2
      p.setMem('ft67HaciendaReform', true)
    },
  },

  {
    id: 'ft67_hacienda_city_echo',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('ph_hacienda_generation') &&
      G.ruralUrban === 'urban' &&
      G.age >= 22 &&
      !G.mem?.ft67HaciendaCity,
    text: 'In the city you are nobody\'s sacada. This is what you came for. The landlord relationship — the specific texture of being known as someone who works someone else\'s land — does not follow you to Manila or Cebu. What follows you is the work ethic the cane taught, and the specific anger of someone who learned young what inequality looks like when it has a face and a surname and a family that has been there since the Spanish period.',
    choices: null,
    effect: (p) => {
      p.r += 3
      p.m += 2
      p.setMem('ft67HaciendaCity', true)
    },
  },

  // ── OFW ───────────────────────────────────────────────────────────────────

  {
    id: 'ft67_ofw_return',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ph_ofw_departed') &&
      G.age >= 35 &&
      !G.mem?.ft67OFWReturn,
    text: 'The contract ended, or another contract began, or you finally came home. The house that the remittances built is a specific thing: the tiled floor, the television, the repaired roof. Your mother points at things you paid for without announcing that you paid for them. The things are the announcement. You look at the house and calculate: the two years of Gulf or Hong Kong salary, the exact exchange rate, the kilo of rice it bought per month. The house does not look like that calculation. It looks like a house. This is what it was supposed to look like.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m += 5
      p.setMem('ft67OFWReturn', true)
    },
  },

  {
    id: 'ft67_stayed_reckoning',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('ph_stayed_behind') &&
      G.age >= 38 &&
      !G.mem?.ft67StayedReckoning,
    text: 'The balikbayan boxes have been arriving for years. You open them with your mother and identify the things from abroad: the Spam, the Toblerone, the specific shoes that your cousin knew you needed. The one who left has a different body now — slightly different clothes, slightly different posture, the way of speaking that has absorbed something from elsewhere. You are the one who stayed. The province is still here because people like you stayed. You know this. You are not sure it is enough.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m -= 2
      p.setMem('ft67StayedReckoning', true)
    },
  },

]
