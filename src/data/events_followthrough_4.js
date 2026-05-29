// events_followthrough_4.js
// Flag follow-through pass: downstream consequences for previously orphaned flags.
// Targets: caste_discrimination, corporate_scandal_covered, betrayal_adolescence,
//          harvest_failure, civil_war_lived, ethnic_minority_conflict,
//          dissident_reader, refugee_arrived/status, political_active.

export const FOLLOWTHROUGH_4_EVENTS = [

  // ── CASTE DISCRIMINATION ──────────────────────────────────────────────────────

  {
    id: 'ft4_caste_career_ceiling',
    phase: 'young_adult',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.flags.has('caste_discrimination') &&
      G.career &&
      G.age >= 22,
    text: 'You put your name on the application. The shortlist comes back without it. A colleague — from the right family — is on it. This is not the first time. You have learned to read the result before it arrives. The question you have not answered is what to do with what you know.',
    choices: [
      {
        text: 'Name it — challenge the shortlist formally',
        tag: null,
        outcome: 'The challenge goes nowhere official. It changes the temperature in the room permanently.',
        effect: (p) => { p.m -= 6; p.karma += 8; p.e += 3; },
      },
      {
        text: 'Build around it — find another route',
        tag: null,
        outcome: 'You find a path that doesn\'t require those doors. It takes longer. You take it.',
        effect: (p) => { p.m -= 3; p.e += 4; p.w += 3; },
      },
    ],
    effect: null,
  },

  // ── CORPORATE SCANDAL COVERED ─────────────────────────────────────────────────

  {
    id: 'ft4_corporate_scandal_resurfaces',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('corporate_scandal_covered') &&
      G.career &&
      G.age >= 45 &&
      !G.mem?.ft4CorporateScandalLate,
    text: 'A journalist has found something from fifteen years ago. Not everything — not the internal memo you still have in a personal folder — but enough to raise a question. You are asked by the communications team to prepare a statement. The statement they have drafted is not false. It is not the whole truth.',
    choices: [
      {
        text: 'Sign the statement as drafted',
        tag: null,
        outcome: 'The story runs, your statement runs. It passes. You are now further in than you were.',
        effect: (p) => { p.r += 10; p.m -= 8; p.setMem('ft4CorporateScandalLate', true); },
      },
      {
        text: 'Add what the statement is missing',
        tag: null,
        outcome: 'The full story creates a larger situation. So does telling the truth fifteen years late. You manage both.',
        effect: (p) => { p.m -= 5; p.karma += 12; p.w -= 8; p.setMem('ft4CorporateScandalLate', true); },
      },
    ],
    effect: null,
  },

  // ── BETRAYAL ADOLESCENCE ──────────────────────────────────────────────────────

  {
    id: 'ft4_betrayal_adult_trust',
    phase: 'young_adult',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.flags.has('betrayal_adolescence') &&
      G.age >= 22,
    text: 'Someone new. Someone who seems safe. You find yourself listening to them describe something that requires trust, and you become aware of the gap between what you say and what you give access to. You do not close the door. You do not open it all the way.',
    choices: null,
    effect: (p) => { p.r += 3; p.s -= 2; },
  },

  // ── HARVEST FAILURE ───────────────────────────────────────────────────────────

  {
    id: 'ft4_harvest_failure_pantry',
    phase: 'midlife',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('harvest_failure') &&
      G.money > 3000 &&
      G.age >= 30 &&
      !G.mem?.ft4HarvestPantry,
    text: 'You have money now — enough that the question of eating is not the question anymore. The year the rains didn\'t come is not something you explain to people who weren\'t there. What you have instead is a pantry stocked further than the week requires, and a specific unease around waste that your children find eccentric.',
    choices: null,
    effect: (p) => { p.e += 2; p.setMem('ft4HarvestPantry', true); },
  },

  // ── CIVIL WAR LIVED ───────────────────────────────────────────────────────────

  {
    id: 'ft4_civil_war_news_echo',
    phase: 'midlife',
    weight: 2,
    cooldown: 10,
    when: (G) =>
      G.flags.has('civil_war_lived') &&
      G.age >= 30,
    text: 'The news covers a conflict somewhere. You watch the correspondent standing in front of a building you recognise from some internal archive — not the building specifically but the specific quality of the rubble, the specific posture of the children at the edge of the frame. You know what the correspondent does not say. You know what comes after the frame.',
    choices: null,
    effect: (p) => { p.r += 3; p.e += 2; },
  },

  // ── ETHNIC MINORITY CONFLICT ─────────────────────────────────────────────────

  {
    id: 'ft4_ethnic_minority_where_from',
    phase: 'midlife',
    weight: 2,
    cooldown: 8,
    when: (G) =>
      G.flags.has('ethnic_minority_conflict') &&
      G.career &&
      G.age >= 28,
    text: 'The question of where you are really from is a different question in your mouth than in the mouth of someone asking it. You have learned to answer the surface version — the city, the country — without engaging the deeper one, which is about belonging and has no short answer. Some days this is exhausting. Some days it is simply a thing you do.',
    choices: null,
    effect: (p) => { p.r += 3; p.s += 2; },
  },

  // ── DISSIDENT READER ─────────────────────────────────────────────────────────

  {
    id: 'ft4_dissident_reader_cost',
    phase: 'young_adult',
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.flags.has('dissident_reader') &&
      ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian'].includes(G.regime) &&
      G.age >= 20,
    text: 'A colleague you thought you trusted asks what you have been reading lately. The question is casual. The question is never casual here. You name something safe. The specific cost of this is not large. The accumulated cost of all the times you name something safe is something you do not add up.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 3; p.e += 2; },
  },

  // ── REFUGEE: FIVE-YEAR ANNIVERSARY ───────────────────────────────────────────

  {
    id: 'ft4_refugee_five_years',
    phase: null,
    weight: 2,
    cooldown: 0,
    when: (G) =>
      (G.flags.has('refugee_arrived') || G.residencyStatus === 'refugee_status' || G.residencyStatus === 'permanent_resident') &&
      G.flags.has('emigrated') &&
      (G.yearsAbroad ?? 0) >= 5 &&
      G.age >= 20 &&
      !G.mem?.ft4RefugeeAnniversary,
    text: 'Five years since you arrived. You know the date the way you know a scar — not consciously, but there when you press it. The country is legible now: which bus goes where, what to say at the post office, the specific joke that means you belong to a group you did not choose. The other country has become the country of a version of yourself you can no longer exactly reach.',
    choices: null,
    effect: (p) => { p.m += 3; p.r += 5; p.setMem('ft4RefugeeAnniversary', true); },
  },

  // ── POLITICAL ACTIVE: REGIME COST ────────────────────────────────────────────

  {
    id: 'ft4_political_active_cost',
    phase: 'midlife',
    weight: 2,
    cooldown: 10,
    when: (G) =>
      G.flags.has('political_active') &&
      G.career &&
      ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian', 'theocracy'].includes(G.regime) &&
      G.age >= 30,
    text: 'Someone at work knows you were at the demonstration. This is not mentioned directly — that is not how it works. It surfaces as a reassignment, a meeting you were not included in, a small professional thing that is harder to name as cause and effect. The regime does not need to be explicit to be effective.',
    choices: null,
    effect: (p) => { p.m -= 6; p.w -= 3; p.karma += 5; },
  },

  // ── DISSIDENT WRITER: ARRESTED ────────────────────────────────────────────────

  {
    id: 'ft4_dissident_writer_risk',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) =>
      G.flags.has('dissident_writer') &&
      ['military_dictatorship', 'single_party_communist', 'single_party_authoritarian'].includes(G.regime) &&
      G.age >= 22 &&
      !G.mem?.ft4DissidentWriterRisk,
    text: 'Someone passed one of your copies to someone who was not safe to pass it to. You find out through a third person, then through silence — the kind that means people are recalibrating. For three weeks you expect the knock. It does not come. You do not know if this means you are not worth arresting or not yet found. Either is temporary.',
    choices: [
      {
        text: 'Stop — burn whatever drafts remain',
        tag: null,
        outcome: 'The silence becomes permanent. You are safe. The work is gone.',
        effect: (p) => { p.m -= 8; p.r += 8; p.setMem('ft4DissidentWriterRisk', true); },
      },
      {
        text: 'Continue — carefully, more carefully',
        tag: null,
        outcome: 'You continue. Carefully. The fear becomes something you carry rather than something that stops you.',
        effect: (p) => { p.m -= 4; p.karma += 6; p.addFlag('artistic_integrity'); p.setMem('ft4DissidentWriterRisk', true); },
      },
    ],
    effect: null,
  },

]
