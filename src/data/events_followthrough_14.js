// Follow-through events (BUILD — country arc follow-throughs)
// Callbacks for flags set in USA, Australia, Canada, Italy, Poland arcs.
// Each fires years or decades after the originating event, showing how
// historical experiences persist through a life.

export const FOLLOWTHROUGH_14_EVENTS = [

  // ── USA FOLLOW-THROUGHS ─────────────────────────────────────────────────────

  {
    id: 'ft14_jim_crow_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('jim_crow_childhood') &&
      G.age >= 60 &&
      !G.mem?.ft14JimCrowLate,
    text: 'Sixty years since the water fountain. The signs are gone. What remains is harder to photograph: the reflex of the second calculation, the scan of a room, the reading of who else is there. The civil rights laws passed. The enforcement of the laws was the next struggle. The struggle after that was the enforcement of the enforcement. You have been alive for several rounds of it. The country progresses and regresses and progresses again and the speed of the progression is always slower than the urgency requires.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.karma += 4
      p.setMem('ft14JimCrowLate', true)
    },
  },

  {
    id: 'ft14_civil_rights_legacy',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('civil_rights_movement_participant') &&
      G.age >= 65 &&
      !G.mem?.ft14CivilRightsLegacy,
    text: 'Someone asks you about it — a grandchild, a student, a journalist. You tell the part that is tellable. There is another part. The part about what it cost the people around you, the specific faces of the specific people who paid things you did not pay. The movement became history and you became a person who was in the history. Being a person who was in the history is different from being in the history. The history is cleaner than the thing itself.',
    choices: [
      {
        text: 'You tell it as fully as you can. What happened is worth being told.',
        tag: null,
        outcome: 'The telling is imperfect and necessary. The person listening carries some of it forward. You cannot know which part.',
        effect: (p) => { p.m += 4; p.karma += 5; p.r += 3; p.setMem('ft14CivilRightsLegacy', true); },
      },
      {
        text: 'You tell the version that is tellable. Some of it stays with you.',
        tag: null,
        outcome: 'The part that stays with you is real. It does not need to be told to be real.',
        effect: (p) => { p.r += 5; p.setMem('ft14CivilRightsLegacy', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft14_vietnam_vet_wall',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('vietnam_veteran') &&
      G.character.country.name === 'United States' &&
      G.currentYear >= 1982 &&
      G.age >= 40 &&
      !G.mem?.ft14VietnamWall,
    text: 'The Vietnam Veterans Memorial, Washington DC. Black granite. Fifty-eight thousand, two hundred and eighty names. You find the ones you are looking for. You can see your reflection in the granite as you touch the letters. The wall does not ask you to be fine. It does not ask you about your feelings about the war. It does not ask you about the withdrawal agreement or the domino theory or the credibility of American commitments in Southeast Asia. It asks you to find the name.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.m += 8
      p.r += 5
      p.karma += 4
      p.setMem('ft14VietnamWall', true)
    },
  },

  {
    id: 'ft14_vietnam_refused_pardon',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('vietnam_refused') &&
      G.character.country.name === 'United States' &&
      G.currentYear >= 1977 &&
      G.age >= 25 &&
      !G.mem?.ft14VietnamPardon,
    text: (G) => {
      const year = G.currentYear
      if (year <= 1980) {
        return 'January 21, 1977. Carter\'s first day in office. Pardon for all who evaded the draft. The pardon is administrative: it restores civil rights and cancels prosecution. It is not an apology. The country did not apologize for asking. You did not ask for an apology. You made a decision that cost you certain things. The pardon addresses the legal consequences. The weight of the decision is not a legal consequence.'
      }
      return 'The Vietnam era. You refused. The pardon came in 1977 and was administrative — civil rights restored, prosecution cancelled. The country has moved on from the debate about whether you were right. The debate, which once defined you in certain rooms, is now historical. History is lighter than the original thing.'
    },
    choices: null,
    effect: (p) => {
      p.m += 4
      p.r += 4
      p.karma += 3
      p.setMem('ft14VietnamPardon', true)
    },
  },

  {
    id: 'ft14_rustbelt_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('rustbelt_generation') &&
      G.age >= 60 &&
      !G.mem?.ft14RustbeltLate,
    text: 'They are talking about the Rust Belt again. Every four years, the candidates come to the towns where the plant closed and say they understand. Some of them grew up in towns like this. Some of them have not. What they say is similar regardless. You know what the town looked like in 1972 and you know what it looks like now and the distance between those two pictures is the political fact that is being discussed, though not always by someone who has stood in the distance.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.setMem('ft14RustbeltLate', true)
    },
  },

  // ── AUSTRALIA FOLLOW-THROUGHS ───────────────────────────────────────────────

  {
    id: 'ft14_dismissal_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('dismissal_generation') &&
      G.age >= 60 &&
      !G.mem?.ft14DismissalLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2027) {
        return 'Kerr\'s papers are released in 2027. You read the coverage. You were alive when it happened. You have been reading coverage of it for fifty years. The papers confirm some things and do not resolve others. The argument about what happened on November 11, 1975 is structurally similar to what it was in 1975. New information has arrived. The argument has incorporated the new information and continues.'
      }
      return 'Kerr died in 1991. Whitlam died in 2014. The papers are sealed until 2027. The people who were in the room are gone or old. The constitutional argument continues between people who were not in the room. You were in the country when it happened. That is a different knowledge from the argument.'
    },
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.setMem('ft14DismissalLate', true)
    },
  },

  {
    id: 'ft14_aus_vietnam_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('aus_vietnam_vet') &&
      G.age >= 55 &&
      !G.mem?.ft14AusVietnamLate,
    text: 'The Welcome Home Parade, 1987. Fourteen years after the last troops came home. Sydney. Eighteen thousand veterans march. Some of them are still angry about the fourteen years. Some of them are grateful. Some of them are both. The speeches are careful. The crowd is large. What the parade cannot give back is the fourteen years in which the country did not ask how you were, in which the war did not officially have a welcome home, in which you arranged your own relationship with what you carried.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.r += 5
      p.setMem('ft14AusVietnamLate', true)
    },
  },

  // ── CANADA FOLLOW-THROUGHS ──────────────────────────────────────────────────

  {
    id: 'ft14_solidarity_generation_after',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('solidarity_generation') &&
      G.character.country.name === 'Poland' &&
      G.currentYear >= 2000 &&
      G.age >= 50 &&
      !G.mem?.ft14SolidarityAfter,
    text: 'Solidarity became a party. The party split and split again. Wałęsa ran for president, won, and later received very low poll numbers. The trade union is still a trade union, smaller than it was. What you participated in — the meeting in the church, the shipyard gates, the extraordinary air of August 1980 — is now history. The history is accurate and is also the skeleton of the experience. The flesh of it: the feeling of the meeting, what was said, the specific faces, the exact quality of the hope. That is not in the history books and it is yours.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.karma += 3
      p.setMem('ft14SolidarityAfter', true)
    },
  },

  {
    id: 'ft14_underground_echo',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('underground_poland') &&
      G.age >= 55 &&
      !G.mem?.ft14UndergroundEcho,
    text: 'The bibuła, the samizdat, the printshop in the church basement. They are in the museum now. The copies you made are in the museum or they are not — many were burned when the risk was too high, and the burning was also the right decision. What you know is that the chain of distribution held, that the information moved, that the people who read it knew they were not alone. The maintenance of that knowledge — that they were not alone — is what the underground was for, and it worked.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.karma += 6
      p.r += 4
      p.setMem('ft14UndergroundEcho', true)
    },
  },

  // ── ITALY FOLLOW-THROUGHS ───────────────────────────────────────────────────

  {
    id: 'ft14_anni_di_piombo_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('anni_di_piombo_generation') &&
      G.age >= 60 &&
      !G.mem?.ft14AnniDiPiomboLate,
    text: 'The files are still classified. The trials reached verdicts that were appealed and overturned and revised. The people responsible died in prison or were released early or were never definitively identified or are still alive in ordinary apartments. Italy does not have a Day of Memory for the Years of Lead the way Germany has for the war. The dead are in the record. The record is in archives that require specific authorization to read. You were there. You do not need authorization.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.e += 3
      p.setMem('ft14AnniDiPiomboLate', true)
    },
  },

  {
    id: 'ft14_mani_pulite_after',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.includes('mani_pulite_generation') &&
      G.currentYear >= 1995 &&
      G.age >= 30 &&
      !G.mem?.ft14ManiPuliteAfter,
    text: 'The Clean Hands investigation destroyed the First Republic and produced Berlusconi. The magistrates who conducted it became famous and then some of them were investigated. The tangenti system — the systematic corruption — was dismantled at the level of the parties that organized it. The corruption reorganized at a different level. The Italy that emerged from Mani Pulite is not the Italy that went in, and whether the change was improvement is the argument that is still running.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 4
      p.setMem('ft14ManiPuliteAfter', true)
    },
  },

  {
    id: 'ft14_precariato_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('precariato_generation') &&
      G.age >= 55 &&
      !G.mem?.ft14PrecariatoLate,
    text: 'The pension calculation arrives. The contributivo system — contributions to a fund that is calculated at retirement age based on what you actually contributed. Your contributions were interrupted by the Partita IVA years, the contract gaps, the periods between projects. The number is smaller than you planned for. It was always going to be smaller than you planned for. You planned for something and the plan met the system and the system was not designed for the plan.',
    choices: null,
    effect: (p) => {
      p.m -= 6
      p.r += 6
      p.w -= 4
      p.setMem('ft14PrecariatoLate', true)
    },
  },

  {
    id: 'ft14_shock_therapy_vindication',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('shock_therapy_generation') &&
      G.character.country.name === 'Poland' &&
      G.currentYear >= 2010 &&
      G.age >= 55 &&
      !G.mem?.ft14ShockTherapyVindication,
    text: 'Poland did not enter recession in 2009. The only major European economy that didn\'t. The motorways are built. Warsaw looks like a Western European city. The GDP per capita has grown faster than any EU country for twenty years. The price was paid in the early nineties. You were there when the price was paid. The people in the new Warsaw coffee shops were not there. They live in the country that the price bought, and they do not know the price, which is neither their fault nor yours. The price was real. The country is also real.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.r += 4
      p.karma += 3
      p.setMem('ft14ShockTherapyVindication', true)
    },
  },

]
