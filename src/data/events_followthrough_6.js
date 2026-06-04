// events_followthrough_6.js
// Follow-through events for flags set by BUILD 45 (events_intimacy.js), BUILD 46 (events_school.js),
// BUILD 38 (events_children_abroad.js), and BUILD 23 (events_stayed.js).
// Every flag set by those modules that had no downstream consequence now has at least one.

export const FOLLOWTHROUGH_6_EVENTS = [

  // ── BUILD 45: INTIMACY FOLLOW-THROUGHS ───────────────────────────────────────

  {
    id: 'ft6_first_love_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('first_love_over') &&
      G.age >= 35 &&
      !G.mem?.ft6FirstLoveMidlife,
    text: 'You think of them occasionally — not with longing exactly but with the specific curiosity reserved for the person who taught you what an ending actually costs. Before them you had understood love as something that, once found, continued. They were the one who made the correction. You carry a different kind of knowledge because of how that finished.',
    choices: null,
    effect: (p) => {
      p.karma += 3
      p.setMem('ft6FirstLoveMidlife', true)
    },
  },

  {
    id: 'ft6_liberation_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('liberation_generation_reckoning') &&
      G.age >= 65 &&
      !G.mem?.ft6LiberationLate,
    text: 'From here the distance is visible. The generation changed specific things — law, language, the surface of what could be said aloud — and did not change other things that were harder to reach. You are not disappointed exactly. You are accounting. What a generation can move in one lifetime is not nothing. It is also not everything that needed to move.',
    choices: null,
    effect: (p) => {
      p.m += 6
      p.karma += 4
      p.setMem('ft6LiberationLate', true)
    },
  },

  {
    id: 'ft6_long_marriage_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('long_marriage_intimacy') &&
      G.partner &&
      G.age >= 65 &&
      !G.mem?.ft6LongMarriageLate,
    text: (G) =>
      `What it became in the end is not what it was at the beginning and is not a lesser version of it. The body is different; what happens between you and ${G.partner?.name ?? 'your partner'} is different. There is a specific knowledge of another person that can only be accumulated over time and cannot be transferred. You have that. You are aware it is not held by everyone.`,
    choices: null,
    effect: (p) => {
      p.m += 9
      p.partnerRel(5)
      p.setMem('ft6LongMarriageLate', true)
    },
  },

  {
    id: 'ft6_cultural_intimacy_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('cultural_intimacy_silence') &&
      G.age >= 58 &&
      !G.mem?.ft6CulturalIntimacyEcho,
    text: 'You hear younger people speak of these things with a directness that was not available in the language you grew up with. You do not feel deprived of what they have. The things that were carried in silence were still carried — held in gesture, in proximity, in the specific texture of lives lived alongside each other. A different way of holding it. Not absent.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.setMem('ft6CulturalIntimacyEcho', true)
    },
  },

  {
    id: 'ft6_intimacy_partner_decline',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('intimacy_late_life') &&
      G.partner &&
      G.age >= 72 &&
      !G.mem?.ft6IntimacyPartnerDecline,
    text: (G) =>
      `The body changes again. What passes between you and ${G.partner?.name ?? 'your partner'} is quieter now — less motion, more presence. A hand held for a long time. The specific warmth of another person who has known you for decades and is still here, in the same room, in the same life. You understand this as a form of intimacy that the younger version of you could not have understood.`,
    choices: null,
    effect: (p) => {
      p.m += 7
      p.partnerRel(4)
      p.setMem('ft6IntimacyPartnerDecline', true)
    },
  },

  // ── BUILD 46: SCHOOL FOLLOW-THROUGHS ─────────────────────────────────────────

  {
    id: 'ft6_scholarship_declined_echo',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('scholarship_declined') &&
      G.age >= 38 &&
      !G.mem?.ft6ScholarshipDeclinedEcho,
    text: 'You didn\'t take the door. The person you might have become — in that school, in those rooms, with those people — is not a ghost exactly but a figure you imagine occasionally. The life you have built from the choice you made is real and yours. You do not spend much time wondering. Sometimes, though, you wonder.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.m -= 2
      p.setMem('ft6ScholarshipDeclinedEcho', true)
    },
  },

  {
    id: 'ft6_class_gap_career',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.includes('class_gap_known') &&
      G.career !== null &&
      G.age >= 26 &&
      !G.mem?.ft6ClassGapCareer,
    text: 'You are in a room with people who grew up different from you. The specific knowledge you carry — of what everything costs, of what it took to get here, of what was not assumed — is not visible to them. It is not a wound. It is an orientation. You notice things they don\'t notice. You understand things they have to be told.',
    choices: null,
    effect: (p) => {
      p.e += 3
      p.s += 2
      p.karma += 3
      p.setMem('ft6ClassGapCareer', true)
    },
  },

  {
    id: 'ft6_war_school_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('war_school_attended') &&
      G.age >= 35 &&
      !G.mem?.ft6WarSchoolMidlife,
    text: 'A news story about children being denied access to school — a decision, a decree, a front line that moved. You carry specific knowledge: what the routine holds together when everything around it is not routine. The teacher there every morning at seven-thirty. The fractions lesson in a city under siege. You have thought about that teacher more than once since.',
    choices: null,
    effect: (p) => {
      p.karma += 4
      p.setMem('ft6WarSchoolMidlife', true)
    },
  },


  // ── BUILD 38: CHILDREN LEFT BEHIND FOLLOW-THROUGHS ───────────────────────────

  {
    id: 'ft6_raised_extended_midlife',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('raised_by_extended_family') &&
      G.age >= 38 &&
      !G.mem?.ft6RaisedExtendedMidlife,
    text: 'The person who raised you when your parent wasn\'t there — the grandmother, the aunt, the household that reorganised around the gap — you think of them with a specific kind of loyalty that does not diminish. They taught you things by accident: how to read weather, how to be quiet when required, how to be enough when you are not what was planned for. You carry her with you without naming it.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 4
      p.setMem('ft6RaisedExtendedMidlife', true)
    },
  },

  {
    id: 'ft6_understood_cost_no_emigration',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('understood_the_cost') &&
      !G.flags.includes('emigrated') &&
      !G.flags.includes('the_cycle_repeated') &&
      G.age >= 35 &&
      !G.mem?.ft6UnderstoodCostNoEmig,
    text: 'You did not leave. You built the life you built from here, which is not what your parent built from abroad. The accounting still sits with you — the material gain, the specific cost, both columns true. You chose not to repeat it. Whether this is wisdom or its own form of cost, you cannot entirely say.',
    choices: null,
    effect: (p) => {
      p.m += 4
      p.karma += 3
      p.setMem('ft6UnderstoodCostNoEmig', true)
    },
  },

  // ── BUILD 23: STAYED BEHIND FOLLOW-THROUGHS ──────────────────────────────────

  {
    id: 'ft6_witness_exodus_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('witness_to_exodus') &&
      G.age >= 65 &&
      !G.mem?.ft6WitnessExodusLate,
    text: 'You watched the country change as people left and did not come back, or came back different. You were the continuity — the one who knew what the street looked like before, who remembered the names of the families who used to live in those houses. This is its own kind of knowledge. Not everyone wanted to hold it, and you did.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 4
      p.setMem('ft6WitnessExodusLate', true)
    },
  },

]
