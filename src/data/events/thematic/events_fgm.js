// events_fgm.js — Female genital cutting arc (BUILD 22 supplement)
// Practiced in 30+ countries; approximately 200 million women living with the consequences.
// Written with the same restraint applied to all other events in the game.
// Not sensationalized. Not sanitized.
//
// The experience from inside: the community framework (marriageability, belonging, tradition),
// the child's limited understanding, the adolescent's greater awareness and limited agency,
// the adult encounter with a healthcare system that categorizes it differently than the
// community did, the question of the cycle when a daughter reaches the age.
//
// Countries gated: high-prevalence where the game has character arcs.
// Years: 1940–present (ongoing; rates declining but uneven by country and urban/rural).

const FGM_COUNTRIES = (G) => {
  const name = G.currentCountry?.name || G.character.country?.name
  return ['Somalia', 'Guinea', 'Eritrea', 'Ethiopia', 'Mali',
          'Sudan', 'Egypt', 'Sierra Leone', 'Djibouti'].includes(name)
}

const FEMALE = (G) => G.character.gender === 'female'

export const FGM_EVENTS = [

  // ── THE CHILD'S CEREMONY ──────────────────────────────────────────────────────
  // Ages 5–10. The preparations you understood as celebration before you
  // understood what you were celebrating.

  {
    id: 'fgm_child_ceremony',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      FEMALE(G) &&
      FGM_COUNTRIES(G) &&
      G.currentYear >= 1940 && G.currentYear <= 2010 &&
      G.age >= 5 && G.age <= 10 &&
      !G.flags.has('fgm_underwent') &&
      !G.mem?.fgmCeremony,
    text: 'The preparations begin several days before. There is food being made in quantities that mean a celebration. The women come — aunts, the elder woman from the edge of the village, neighbours whose presence means the occasion is significant. Your mother has explained what will happen, in the language that women in your community use for this: words that indicate the thing without describing it, because description is not the tradition. You understand that you are crossing into something. You do not understand the crossing until it is happening. Afterwards there are days of recovery, and then the healing, and then you are different and the community treats you as having become something, and the celebration is real.',
    choices: null,
    effect: (p) => { p.h -= 10; p.m -= 10; p.r += 4; p.addFlag('fgm_underwent'); p.setMem('fgmCeremony', true) },
  },

  // ── THE ADOLESCENT WHO KNOWS ─────────────────────────────────────────────────
  // Ages 11–16. Older, more aware of what is coming, with slightly more agency —
  // though the social cost of refusing is real and most do not refuse.
  // This event fires for characters who weren't cut as young children
  // or for communities where it happens at adolescence.

  {
    id: 'fgm_adolescent_question',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      FEMALE(G) &&
      FGM_COUNTRIES(G) &&
      G.currentYear >= 1960 && G.currentYear <= 2020 &&
      G.age >= 11 && G.age <= 16 &&
      !G.flags.has('fgm_underwent') &&
      !G.mem?.fgmAdolescent,
    text: 'You are old enough to know what is being prepared for you. You know what it involves; you have heard it from the other girls, and from older women who describe it in the language that makes it sound like belonging, because for them it is also belonging. The preparation is also preparation for marriage — you understand this now. An uncircumcised woman in this community is unmarriageable in ways that are specific and practical, not abstract. Your cousin refused at fourteen. What happened to your cousin after she refused is something you have been thinking about for weeks.',
    choices: [
      {
        text: 'You go through with it. This is the community you live in and will continue to live in.',
        tag: 'comply',
        outcome: 'The ceremony happens. The recovery happens. You are welcomed on the other side of it. What you carry from it is something that takes years to understand.',
        effect: (p) => { p.h -= 8; p.m -= 8; p.r += 5; p.addFlag('fgm_underwent'); p.setMem('fgmAdolescent', true) },
      },
      {
        text: 'You refuse. You have seen what it is and you will not go through it.',
        tag: 'refuse',
        outcome: 'The refusal costs you more than you were ready for. The community\'s response is not anger exactly — it is a quiet subtraction. Things you expected are no longer available to you. The cost is ongoing.',
        effect: (p) => { p.m -= 12; p.r += 8; p.karma += 6; p.addFlag('fgm_refused'); p.addFlag('fgm_social_cost'); p.setMem('fgmAdolescent', true) },
      },
    ],
    effect: null,
  },

  // ── THE MEDICAL ENCOUNTER ─────────────────────────────────────────────────────
  // A doctor asks questions. Or you give birth and the midwife notes something.
  // The healthcare system's category for your experience is different from the
  // community's category. This difference is its own experience to navigate.

  {
    id: 'fgm_medical_encounter',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      FEMALE(G) &&
      G.flags.has('fgm_underwent') &&
      G.currentYear >= 1975 &&
      G.age >= 18 && G.age <= 50 &&
      !G.mem?.fgmMedical,
    text: (G) => G.children && G.children.length > 0
      ? 'During the birth, or at a check-up afterwards, a nurse or doctor makes a note in your file. The term they use is not the term your community uses. The term in the file is a clinical one; it belongs to a different framework for understanding the same body. The nurse explains what she has noted and asks some questions. You answer some of them. The gap between the framework on the form and the framework you grew up inside is not a gap you know how to explain in this room.'
      : 'A doctor — at a routine appointment, or during an examination for another reason — pauses and asks when you arrived in the country, and then asks some questions you were not expecting. The term they use is not the term your community uses. You understand, from the way the questions are framed, that what was done to your body occupies a specific legal and medical category here that it did not occupy at home. The recognition is not simple.',
    choices: [
      {
        text: 'Explain what you remember and answer the questions.',
        tag: 'answer',
        outcome: 'The record is made. A referral is offered. You take the information and decide later what to do with it.',
        effect: (p) => { p.e += 4; p.r += 4; p.addFlag('fgm_medical_known'); p.setMem('fgmMedical', true) },
      },
      {
        text: 'Answer minimally. This is not a conversation you want to have here.',
        tag: 'deflect',
        outcome: 'The appointment ends. The gap between the two frameworks remains. You carry it alone.',
        effect: (p) => { p.r += 5; p.m -= 3; p.setMem('fgmMedical', true) },
      },
    ],
    effect: null,
  },

  // ── THE DAUGHTER'S AGE ────────────────────────────────────────────────────────
  // Your daughter has reached the age. The community expectation is clear.
  // What do you do?

  {
    id: 'fgm_daughter_question',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      FEMALE(G) &&
      G.flags.has('fgm_underwent') &&
      G.children && G.children.some(c => c.gender === 'female' && c.age >= 6 && c.age <= 14) &&
      G.currentYear >= 1970 &&
      !G.mem?.fgmDaughter,
    text: 'Your daughter has reached the age. The women in the family are beginning to organize; the conversations are happening around you in the way these conversations happen. The community expectation is not stated directly because it does not need to be stated — everyone understands what is expected. You understand what is expected because it was expected of you, and you went through it, and you are who you are. The question of what that means for your daughter is one you have been approaching from a long distance.',
    choices: [
      {
        text: 'You protect her. The cycle ends here.',
        tag: 'protect',
        outcome: 'The conversation with the family is difficult. You hold your position. The community adjusts around your decision over time. What you gave your daughter is something you did not have.',
        effect: (p) => { p.karma += 12; p.m += 5; p.r += 6; p.s -= 3; p.addFlag('fgm_broke_cycle'); p.setMem('fgmDaughter', true) },
      },
      {
        text: 'You do not intervene. This is how the community works. She will survive it as you survived it.',
        tag: 'continue',
        outcome: 'The ceremony happens. Your daughter recovers. The community remains intact. You carry a specific weight alongside the relief of having maintained your place in it.',
        effect: (p) => { p.r += 8; p.m -= 6; p.karma -= 6; p.addFlag('fgm_continued_cycle'); p.setMem('fgmDaughter', true) },
      },
    ],
    effect: null,
  },

  // ── LATE-LIFE RECKONING ───────────────────────────────────────────────────────
  // What you make of the experience at the end of a life.
  // Whether the cycle continued or ended.

  {
    id: 'fgm_late_reckoning',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      FEMALE(G) &&
      (G.flags.has('fgm_underwent') || G.flags.has('fgm_refused')) &&
      G.age >= 58 &&
      !G.mem?.fgmLate,
    text: (G) => {
      if (G.flags.has('fgm_broke_cycle')) {
        return 'Your daughter was not cut. You made sure of it at the cost of some relationships and some belonging. What you gave her is something you cannot name directly because the naming would require acknowledging too precisely what was done to you. You know what you gave her. She does not know what it was, exactly, that you protected her from. You have decided this is right: some knowledge should not have to be acquired.'
      }
      if (G.flags.has('fgm_refused')) {
        return 'You refused at the age when you could refuse. The cost of refusing was real and you paid it over years: the unmarriageability that turned out to be navigable, the community distance that became the price of a particular freedom. At this distance you hold both the cost and the thing you kept intact, and the arithmetic between them is something you do not discuss but you know.'
      }
      return 'What was done to you was done as care — by women who had gone through it, who believed it was what a girl needed to become a woman in the community, who were not acting out of cruelty. This is true. It is also true that the body carries what the body carries. Both of these things sit alongside each other in your life. You have spent a long time learning to hold both.'
    },
    choices: null,
    effect: (p) => { p.e += 4; p.r += 5; p.m += 3; p.setMem('fgmLate', true) },
  },

]
