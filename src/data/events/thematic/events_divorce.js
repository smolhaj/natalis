// events_divorce.js — Divorce depth arc
//
// The divorce action (in gameStore) handles the legal moment.
// These events handle everything around it: the slow coming apart,
// the legal process experienced from inside, the children question,
// the re-emergence as a single person, and the long integration.

const hasDivorced = (G) => G.flags.has('divorced')
const wasMarried = (G) => G.flags.has('divorced') || G.partner != null

export const DIVORCE_EVENTS = [

  // ── Before ──────────────────────────────────────────────────────────────

  {
    id: 'div_the_long_end',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.partner != null &&
      (G.partner.relationshipQuality ?? 60) < 30 &&
      G.age >= 22 &&
      !G.mem?.divLongEndFired,
    text: 'The marriage is not ending. It has already ended — the ending happened somewhere in the last two years, in the specific silences, in the things you stopped saying, in the two of you increasingly managing a situation rather than living in one. What remains now is the formal recognition of what is already true. The word divorce is not said yet. The fact it describes has been present for some time.',
    choices: [
      {
        text: 'Try once more — couples therapy, a direct conversation',
        tag: null,
        outcome: 'The conversation is the most honest one you have had in years. It does not save the marriage. It makes the ending a little more dignified.',
        effect: (p) => { p.m -= 5; p.partnerRel(5); p.addFlag('divorce_attempt_repair'); p.setMem('divLongEndFired', true) },
      },
      {
        text: 'You know what this is — start thinking practically',
        tag: null,
        outcome: 'The practicalities are a way of processing the emotional thing through action. You begin to understand the geometry of how the life would separate.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('divorce_known_before'); p.setMem('divLongEndFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'div_the_long_end_midlife',
    phase: 'midlife',
    weight: 7,
    when: (G) =>
      G.partner != null &&
      (G.partner.relationshipQuality ?? 60) < 30 &&
      G.age >= 30 &&
      !G.mem?.divLongEndFired,
    text: 'Twenty years ago you had a wedding. The people at the wedding are scattered. Some of them have their own divorces now. The marriage that started that day has become something neither of you planned and neither of you would have chosen. You are not enemies. You are two people who grew in directions that no longer overlap. The children — if there are children — are watching in the way that children watch everything: carefully, saying less than they know.',
    choices: [
      {
        text: 'Try once more — couples therapy, a direct conversation',
        tag: null,
        outcome: 'The conversation is the most honest one you have had in years. It does not save the marriage. It makes the ending a little more dignified.',
        effect: (p) => { p.m -= 5; p.partnerRel(5); p.addFlag('divorce_attempt_repair'); p.setMem('divLongEndFired', true) },
      },
      {
        text: 'You know what this is — start thinking practically',
        tag: null,
        outcome: 'The practicalities are a way of processing the emotional thing through action. You begin to understand the geometry of how the life would separate.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('divorce_known_before'); p.setMem('divLongEndFired', true) },
      },
    ],
    effect: null,
  },

  // ── The Legal Process ────────────────────────────────────────────────────

  {
    id: 'div_legal_process',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      hasDivorced(G) &&
      !G.mem?.divLegalFired,
    text: 'The divorce is a legal process. The legal process requires documentation of a life: the assets, the accounts, the property, the children\'s time, the debt. The lawyers translate the marriage into a ledger. The ledger is accurate and completely wrong simultaneously — it cannot account for the specific shape the two of you made together, the accumulated texture of the shared years. The judge signs the documents. The documents are filed.',
    choices: null,
    effect: (p) => { p.mo -= 2000; p.m -= 10; p.r += 8; p.addFlag('divorce_legal_done'); p.setMem('divLegalFired', true) },
  },

  {
    id: 'div_legal_process_midlife',
    phase: 'midlife',
    weight: 8,
    when: (G) =>
      hasDivorced(G) &&
      !G.mem?.divLegalFired,
    text: 'The divorce is a legal process. The legal process requires documentation of a life: the assets, the accounts, the property, the children\'s time, the debt. The lawyers translate the marriage into a ledger. The ledger is accurate and completely wrong simultaneously — it cannot account for the specific shape the two of you made together, the accumulated texture of the shared years. The judge signs the documents. The documents are filed.',
    choices: null,
    effect: (p) => { p.mo -= 3500; p.m -= 10; p.r += 8; p.addFlag('divorce_legal_done'); p.setMem('divLegalFired', true) },
  },

  // ── Children and Co-parenting ────────────────────────────────────────────

  {
    id: 'div_children_question',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      hasDivorced(G) &&
      G.children && G.children.length > 0 &&
      !G.mem?.divChildrenFired,
    text: 'The children are at the centre of the logistics and are not consulted about the logistics. You discuss the schedule with your former partner in the language of scheduling — days, pickup times, holidays, school events. The children know that a schedule is not a family. You know this too. You make the schedule as good as you can, which is the only thing available to make.',
    choices: [
      {
        text: 'Prioritise consistency and cooperation — whatever it costs',
        tag: null,
        outcome: 'The cooperation requires swallowing things. The children, over time, seem okay. Not the okay you planned for them, but a real okay.',
        effect: (p) => { p.m -= 5; p.karma += 8; p.addFlag('coparenting_cooperative'); p.setMem('divChildrenFired', true) },
      },
      {
        text: 'The conflict continues — it cannot be contained for the schedule',
        tag: null,
        outcome: 'The children hear the edges of things. They become skilled at reading rooms. This is not what you wanted to give them.',
        effect: (p) => { p.m -= 12; p.r += 10; p.addFlag('coparenting_difficult'); p.setMem('divChildrenFired', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'div_children_question_midlife',
    phase: 'midlife',
    weight: 8,
    when: (G) =>
      hasDivorced(G) &&
      G.children && G.children.length > 0 &&
      !G.mem?.divChildrenFired,
    text: 'The children are at the centre of the logistics and are not consulted about the logistics. You discuss the schedule with your former partner in the language of scheduling — days, pickup times, holidays, school events. The children know that a schedule is not a family. You know this too. You make the schedule as good as you can, which is the only thing available to make.',
    choices: [
      {
        text: 'Prioritise consistency and cooperation — whatever it costs',
        tag: null,
        outcome: 'The cooperation requires swallowing things. The children, over time, seem okay. Not the okay you planned for them, but a real okay.',
        effect: (p) => { p.m -= 5; p.karma += 8; p.addFlag('coparenting_cooperative'); p.setMem('divChildrenFired', true) },
      },
      {
        text: 'The conflict continues — it cannot be contained for the schedule',
        tag: null,
        outcome: 'The children hear the edges of things. They become skilled at reading rooms. This is not what you wanted to give them.',
        effect: (p) => { p.m -= 12; p.r += 10; p.addFlag('coparenting_difficult'); p.setMem('divChildrenFired', true) },
      },
    ],
    effect: null,
  },

  // ── First Year After ─────────────────────────────────────────────────────

  {
    id: 'div_first_year',
    phase: 'young_adult',
    weight: 8,
    when: (G) =>
      hasDivorced(G) &&
      G.flags.has('divorce_legal_done') &&
      !G.mem?.divFirstYearFired,
    text: 'The first year after is the year of learning what you have always taken for granted: the shared decision-making, the simple reporting of a day to someone who cares how it went, the presence in a bed, the planning of a future that assumed a specific person would be in it. These are not dramatic losses. They are structural losses. The structure of the daily life had a shape. The shape is gone.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('divorce_year_one'); p.setMem('divFirstYearFired', true) },
  },

  {
    id: 'div_first_year_midlife',
    phase: 'midlife',
    weight: 8,
    when: (G) =>
      hasDivorced(G) &&
      G.flags.has('divorce_legal_done') &&
      !G.mem?.divFirstYearFired,
    text: 'The first year after is the year of learning what you have always taken for granted: the shared decision-making, the simple reporting of a day to someone who cares how it went, the presence in a bed, the planning of a future that assumed a specific person would be in it. These are not dramatic losses. They are structural losses. The structure of the daily life had a shape. The shape is gone.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('divorce_year_one'); p.setMem('divFirstYearFired', true) },
  },

  // ── Re-emergence ─────────────────────────────────────────────────────────

  {
    id: 'div_dating_again',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      hasDivorced(G) &&
      G.flags.has('divorce_year_one') &&
      !G.partner &&
      G.age <= 45 &&
      !G.mem?.divDatingFired,
    text: 'Someone asks you out, or a friend suggests someone, or you create a profile on an app late at night and feel immediately strange about it. Dating after a marriage is different from dating before one. You know more — about yourself, about what a relationship actually requires. The knowing is useful and also makes the early meetings feel more procedural than they should. You are forty-something, or thirty-something, sitting across from a person who does not know the specific shape of the years you have had.',
    choices: [
      {
        text: 'Try — the alternative is staying closed',
        tag: null,
        outcome: 'The first few don\'t lead anywhere. The process is awkward and occasionally interesting. You are, slowly, learning to be in this again.',
        effect: (p) => { p.m += 3; p.addFlag('divorce_dating_again'); p.setMem('divDatingFired', true) },
      },
      {
        text: 'Not yet — this is not the right moment',
        tag: null,
        outcome: 'The decision is sound. The aloneness has things to teach that the right-next-relationship would interrupt.',
        effect: (p) => { p.m -= 2; p.addFlag('divorce_solo_choice'); p.setMem('divDatingFired', true) },
      },
    ],
    effect: null,
  },

  // ── Long Integration ─────────────────────────────────────────────────────

  {
    id: 'div_long_integration',
    phase: 'midlife',
    weight: 6,
    when: (G) =>
      hasDivorced(G) &&
      G.flags.has('divorce_year_one') &&
      G.age >= 40 &&
      !G.mem?.divIntegrationFired,
    text: 'Five years out, or ten, the divorce has become part of the landscape of the life rather than its defining feature. You think about your former partner rarely and then specifically — a song, a place, a turn of phrase one of the children uses that you recognise. The marriage shaped you in ways the divorce did not undo. The regret, if there is any, is no longer about the decision. It is about the things that couldn\'t be recovered: the specific years, the version of the life that was possible in them.',
    choices: null,
    effect: (p) => { p.m += 5; p.r -= 3; p.addFlag('divorce_integrated'); p.setMem('divIntegrationFired', true) },
  },

  // ── Children grown, reconciliation ──────────────────────────────────────

  {
    id: 'div_children_grown',
    phase: 'late_life',
    weight: 6,
    when: (G) =>
      hasDivorced(G) &&
      G.children && G.children.length > 0 &&
      G.age >= 55 &&
      !G.mem?.divChildrenGrownFired,
    text: 'The children are grown and have their own understanding of what happened. You do not control the understanding. Some of it is accurate. Some of it is formed from the specific vantage point of the child in the middle, which is a vantage point no adult can fully correct for. What you get, at sixty or sixty-five, is the relationship with your adult children as they are — not as the product of the marriage that didn\'t survive, but as their own complete people, making their own judgements about the past they came from.',
    choices: null,
    effect: (p) => { p.m += 5; p.r -= 4; p.addFlag('divorce_children_grown'); p.setMem('divChildrenGrownFired', true) },
  },

]
