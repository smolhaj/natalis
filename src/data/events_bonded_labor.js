// events_bonded_labor.js — Debt bondage, bonded labor, and sharecropping (BUILD 37)
// Not poverty — a specific legal/semi-legal trap: the loan taken during a family
// emergency at terms that make repayment structurally impossible. The work
// that services the interest without touching the principal. The debt that
// can pass to children.
//
// Three arcs:
//   - Bonded labor (India, Pakistan, Nepal): brick kilns, carpet weaving, agriculture
//   - Sharecropping (Black American South, 1930s–1960s)
// Note: microfinance spiral already covered in events_debt.js.

const BONDED_ARCHETYPES = (G) =>
  ['developing_unstable', 'developing_urban', 'subsaharan'].includes(G.currentCountry?.archetype) &&
  ['very_low', 'low', 'low_medium'].includes(G.currentCountry?.gdp)

const IS_SOUTH_ASIA = (G) =>
  ['India', 'Pakistan', 'Nepal', 'Bangladesh'].includes(G.character.country?.name)

const IS_BLACK_AMERICAN = (G) =>
  G.character.country?.name === 'United States' && G.ethnicity === 'black_american'

export const BONDED_LABOR_EVENTS = [

  // ── THE INITIAL LOAN ─────────────────────────────────────────────────────────
  // The entry point into bonded labor. A small amount, during crisis,
  // at terms so structured that repayment becomes impossible.

  {
    id: 'bl_initial_loan',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      BONDED_ARCHETYPES(G) &&
      IS_SOUTH_ASIA(G) &&
      G.stats.wealth <= 2 &&
      G.currentYear >= 1950 && G.currentYear <= 2010 &&
      G.age >= 16 && G.age <= 35 &&
      !G.career &&
      !G.flags.has('bonded_labor') &&
      !G.mem?.blLoan,
    text: 'Your father is sick, or the monsoon failed, or the landlord raised the rent in the same month the price of rice doubled — the cause does not matter because the result is the same: there is not enough money. The owner of the brick kiln outside town is known to lend. The interest is 25%, compounded monthly. You calculate that at current wages it will take fourteen months to pay it back. You take the loan. You will work it off in the kiln. You sign the paper, which you cannot fully read, with your thumb print.',
    choices: [
      {
        text: 'You accept. There is no other source.',
        tag: 'accept',
        outcome: 'The crisis is resolved. The kiln work begins the next week. The owner keeps your identity documents until the debt is settled, for safekeeping.',
        effect: (p) => { p.mo += 800; p.m -= 8; p.r += 5; p.addFlag('bonded_labor'); p.addFlag('bonded_kiln'); p.setMem('blLoan', true) },
      },
      {
        text: 'You find another way. The terms are impossible.',
        tag: 'refuse',
        outcome: 'You manage without the loan — barely, slowly, with consequences that will take years to clear. But you are not bound.',
        effect: (p) => { p.mo -= 400; p.h -= 3; p.m -= 5; p.r += 4; p.addFlag('refused_bonded_debt'); p.setMem('blLoan', true) },
      },
    ],
    effect: null,
  },

  // ── THE BRICK KILN ───────────────────────────────────────────────────────────
  // The specific texture of bonded kiln work: the heat, the quota, the arithmetic
  // that never resolves in your favour.

  {
    id: 'bl_kiln_life',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.has('bonded_kiln') &&
      G.age >= 17 && G.age <= 40 &&
      !G.mem?.blKiln,
    text: 'The quota is one thousand bricks per day, which is possible if nothing goes wrong. The clay must be a particular consistency — too wet and the bricks crack in firing, which counts against your account; too dry and they crack before firing, which also counts against your account. The owner has a ledger. Your wages go into the ledger on one side; the loan, the interest, the cost of the mud you use, the cost of the coal for firing, the cost of your water for the day — all of these go into the ledger on the other side. You have not seen the ledger. The owner reads from it to you at the end of the month. The balance is always approximately the same.',
    choices: null,
    effect: (p) => { p.h -= 6; p.m -= 8; p.r += 7; p.e += 3; p.setMem('blKiln', true) },
  },

  // ── THE CHILD AT THE LOOM ─────────────────────────────────────────────────────
  // The carpet weaving shed. Small fingers. The debt was the father's;
  // the child works it off. Legal abolition has existed for decades.

  {
    id: 'bl_carpet_child',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      IS_SOUTH_ASIA(G) &&
      G.currentYear >= 1970 && G.currentYear <= 2000 &&
      G.age >= 7 && G.age <= 12 &&
      G.stats.wealth <= 2 &&
      (G.parents?.father?.alive === false || G.stats.wealth <= 1) &&
      !G.flags.has('bonded_labor') &&
      !G.mem?.blCarpetChild,
    text: 'The carpet shed is a low room with looms that fill it wall to wall. The contractor who came to the house said you would learn a trade, which is true in the sense that you are learning something. Your fingers are the right size for the knots — smaller is better, the contractor said, and this was the reason given for why the work is for children rather than adults. The patterns are called by code numbers. You do not know what the carpets look like from the other side because you only ever see the back. Your wages are being held against your father\'s debt.',
    choices: null,
    effect: (p) => { p.h -= 5; p.e -= 3; p.m -= 10; p.r += 8; p.addFlag('bonded_labor'); p.addFlag('child_laborer'); p.setMem('blCarpetChild', true) },
  },

  // ── THE DEBT INHERITED ───────────────────────────────────────────────────────
  // The parent's debt becomes the child's. The mechanism that makes bonded
  // labor intergenerational.

  {
    id: 'bl_debt_inherited',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.flags.has('bonded_labor') &&
      G.age >= 18 && G.age <= 28 &&
      !G.mem?.blDebtInherited,
    text: 'Your father has died, or become too ill to work, and the owner has come to explain that the outstanding balance on the debt is now yours. The owner is not aggressive about this — it is simply how it works, and everyone present understands that this is how it works. The law says otherwise, but the law is a set of words in a building in the state capital, and the owner is here, and you are here, and the debt is here.',
    choices: [
      {
        text: 'You accept the debt. There is nowhere else to go.',
        tag: 'accept',
        outcome: 'The ledger has your name now. The balance is what it always was.',
        effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('bonded_generational'); p.setMem('blDebtInherited', true) },
      },
      {
        text: 'You dispute it. The law says you cannot inherit a bonded debt.',
        tag: 'dispute',
        outcome: 'The dispute goes nowhere quickly. The local magistrate schedules a hearing for eight months away. You continue working while it is pending because you have no alternative.',
        effect: (p) => { p.m -= 8; p.r += 6; p.karma += 5; p.addFlag('bonded_debt_disputed'); p.setMem('blDebtInherited', true) },
      },
    ],
    effect: null,
  },

  // ── THE LAW THAT EXISTS ───────────────────────────────────────────────────────
  // Bonded labor has been illegal in India since 1976, in Pakistan since 1992.
  // The law exists; the practice continues. The character who learns this.

  {
    id: 'bl_abolition_gap',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('bonded_labor') &&
      IS_SOUTH_ASIA(G) &&
      G.currentYear >= 1980 &&
      G.age >= 20 && G.age <= 50 &&
      !G.mem?.blAbolitionGap,
    text: 'An NGO worker comes to the kiln, or the carpet shed, or the farm — they come sometimes, with clipboards and cameras. One of them explains to you that what is happening to you is illegal under the Bonded Labour System (Abolition) Act of 1976, or its 1992 counterpart, and has been illegal for longer than you have been alive. The owner knows this. The district officer who is supposed to enforce it knows this. The Act has a mechanism for issuing certificates of release and for rehabilitation assistance. The NGO worker gives you a leaflet. The leaflet is in Hindi, which you read partially.',
    choices: [
      {
        text: 'You talk to the NGO worker about your situation.',
        tag: 'engage',
        outcome: 'They take notes. They will file a report. The process of release and rehabilitation, if it begins, will take months. You give them your name.',
        effect: (p) => { p.m += 4; p.r += 5; p.karma += 5; p.addFlag('bonded_release_process'); p.setMem('blAbolitionGap', true) },
      },
      {
        text: 'You say nothing to the NGO worker. The owner will hear.',
        tag: 'stay_silent',
        outcome: 'The NGO worker leaves. The leaflet goes under a stone. You understand that the gap between what the law says and what happens is not an accident.',
        effect: (p) => { p.m -= 5; p.r += 8; p.e += 3; p.setMem('blAbolitionGap', true) },
      },
    ],
    effect: null,
  },

  // ── LIBERATION ───────────────────────────────────────────────────────────────
  // The rare event: an NGO or sympathetic official intervenes.
  // The specific difficulty: the lender is also the landlord.

  {
    id: 'bl_liberation',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('bonded_release_process') &&
      G.age >= 25 && G.age <= 55 &&
      !G.mem?.blLiberation,
    text: 'The district magistrate has issued a certificate of release. It is a piece of paper with a government seal that says the debt — the amount, the interest, the compounded interest on the interest — is cancelled and cannot be collected. The owner\'s documents claiming you owe this money are void. You are also no longer employed at the kiln, and you no longer have housing on the kiln premises, and the owner is also the person the village buys rice from. The government\'s rehabilitation scheme provides a lump sum — fourteen thousand rupees, or a similar amount — for resettlement. You have the paper. You have the money. You are standing at the edge of the owner\'s land, which is also the edge of the village, looking at what is on the other side.',
    choices: [
      {
        text: 'You leave. Take the money and go somewhere the owner does not have reach.',
        tag: 'leave',
        outcome: 'The town is larger and more anonymous. The money lasts six months. You find work. The first year is the hardest.',
        effect: (p) => { p.m += 12; p.r += 8; p.mo += 800; p.addFlag('bonded_labor_freed'); p.addFlag('emigrated'); p.setResidency('work_visa'); p.setMem('blLiberation', true) },
      },
      {
        text: 'You stay in the area. Your family is here. You will navigate the owner\'s presence.',
        tag: 'stay',
        outcome: 'The paper is real. The freedom is real. The daily calculation of what to avoid and who to not be seen talking to — that is also real, and ongoing.',
        effect: (p) => { p.m += 6; p.r += 10; p.addFlag('bonded_labor_freed'); p.setMem('blLiberation', true) },
      },
    ],
    effect: null,
  },

  // ── SHARECROPPING: THE LEDGER ─────────────────────────────────────────────────
  // Black American South, 1930s–1960s. The accounting that ensures the
  // sharecropper never comes out ahead. The crop lien that means the harvest
  // doesn't belong to the person who grew it.

  {
    id: 'bl_sharecrop_ledger',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_BLACK_AMERICAN(G) &&
      G.currentYear >= 1930 && G.currentYear <= 1965 &&
      G.age >= 18 && G.age <= 40 &&
      G.ruralUrban === 'rural' &&
      !G.flags.has('bonded_labor') &&
      !G.mem?.blSharecropLedger,
    text: 'The settlement comes in November, when the cotton is in. The landowner has a book, and he reads from it: your share of the crop, minus the rent on the cabin, minus the seeds, minus the fertilizer, minus the mule rental, minus the credit you drew at the commissary for food and supplies through the year. The commissary prices are set by the landowner; the mule rental is set by the landowner; the weight of your cotton is measured by the landowner. What remains — what he says remains — is rarely enough to cover what he says you owe. You go into next year already in debt for this year.',
    choices: [
      {
        text: 'You ask to see the book.',
        tag: 'question',
        outcome: 'He shows you the book. The numbers are there. Some of them are wrong. Questioning the numbers in the ledger of a white landowner in 1942 carries a cost you understand before you open your mouth.',
        effect: (p) => { p.m -= 5; p.r += 8; p.karma += 6; p.e += 4; p.addFlag('bonded_labor'); p.addFlag('challenged_power'); p.setMem('blSharecropLedger', true) },
      },
      {
        text: 'You accept the settlement. Next year you will plant more.',
        tag: 'accept',
        outcome: 'Next year comes. The settlement looks the same. The landowner has a new book and an older debt.',
        effect: (p) => { p.m -= 10; p.r += 6; p.h -= 2; p.addFlag('bonded_labor'); p.addFlag('sharecrop_generation'); p.setMem('blSharecropLedger', true) },
      },
    ],
    effect: null,
  },

  // ── THE GREAT MIGRATION PULL ──────────────────────────────────────────────────
  // The decision to leave for the North. The specific arithmetic of the train ticket.

  {
    id: 'bl_sharecrop_north',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      IS_BLACK_AMERICAN(G) &&
      G.flags.has('sharecrop_generation') &&
      G.currentYear >= 1940 && G.currentYear <= 1970 &&
      G.age >= 18 && G.age <= 40 &&
      !G.flags.has('emigrated') &&
      !G.mem?.blSharecropNorth,
    text: 'Your cousin sends a letter from Chicago or Detroit or Pittsburgh — there are jobs in the plants, in the stockyards, in the steel mills. The wages are in real money, not ledger credit. The foreman is white but the foreman does not own your house or sell you your food or hold your debt. The train ticket costs more than you have, but your cousin will lend you half and you can work the rest. The landowner, when he hears people are leaving, says he will call in all outstanding debts immediately. The leaving requires leaving before he can do this.',
    choices: [
      {
        text: 'You go. Leave at night. Send for your family once you are settled.',
        tag: 'go',
        outcome: 'Chicago in February is a different kind of cold than Mississippi in February. The plant is loud and the work is hard but the check is real.',
        effect: (p) => { p.m += 8; p.e += 4; p.w += 3; p.addFlag('great_migration'); p.addFlag('emigrated'); p.setResidency('citizen'); p.setMem('blSharecropNorth', true) },
      },
      {
        text: 'You stay. You cannot leave your parents, your community, the land.',
        tag: 'stay',
        outcome: 'The people who left send money back. The crop comes in. The ledger looks the same.',
        effect: (p) => { p.m -= 8; p.r += 8; p.s += 4; p.addFlag('stayed_sharecrop'); p.setMem('blSharecropNorth', true) },
      },
    ],
    effect: null,
  },

  // ── LATE-LIFE RECKONING ───────────────────────────────────────────────────────
  // What bonded labor leaves in a person, long after it ends.

  {
    id: 'bl_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('bonded_labor') &&
      G.age >= 60 &&
      !G.mem?.blLateReckoning,
    text: 'You know what a ledger that is not in your favour looks like. You know the specific calculation of a debt that doesn\'t move: how you go in to the settlement and go out of the settlement knowing already what next year will look like. This knowledge — the arithmetic of a trap — does not leave you when the trap ends, if it ends. It reshapes how you hold money when you have it: the compulsive accounting, the distrust of terms you cannot verify, the particular attention to what the other person controls in any transaction. Your grandchildren watch you count change in a way they find excessive. You have not explained why.',
    choices: null,
    effect: (p) => { p.e += 4; p.r += 5; p.m += 3; p.setMem('blLateReckoning', true) },
  },

]
