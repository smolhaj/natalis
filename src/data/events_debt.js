// BUILD 55 — Formal debt arc
// The debt field exists; the experience of debt has almost no events.
// Different types: consumer credit (USA/wealthy west), microfinance (developing world),
// IMF structural adjustment (sovereign debt as personal experience), medical debt (USA).
// NOTE: ya_student_loan_reality already exists in BASE_EVENTS — not duplicated here.

const WEALTHY_ARCHETYPES = ['wealthy_west', 'wealthy_east']
const DEVELOPING_ARCHETYPES = ['subsaharan', 'developing_urban', 'developing_unstable']

export const DEBT_EVENTS = [

  // ── FOLLOW-THROUGHS (written first per design rule) ──────────────────────

  {
    id: 'debt_decade_clean',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('debt_spiral_experienced') && G.age >= 40 && !G.mem.debtDecadeClean,
    text: 'Ten years, roughly, since the worst of it. The credit score has recovered — you check it sometimes, still, the way you test a healed bone. You pay the balance in full every month. You know what the minimum payment feeling is like, the specific mathematics of making it worse while appearing to make it better. Your children won\'t know that.',
    effect: (p) => { p.m += 10; p.addFlag('debt_recovered'); p.setMem('debtDecadeClean', true) },
  },

  {
    id: 'debt_teaching_children',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('debt_spiral_experienced') && G.children.length > 0 && G.age >= 44 && !G.mem.debtTaughtChildren,
    text: 'Your eldest asks about credit cards. They are eighteen and want to build credit. You know things about this that you learned in a specific, expensive way.',
    choices: [
      {
        text: 'Tell them the whole story.',
        tag: 'told_all',
        outcome: 'You sit together for an hour. They listen differently than you expected. You have not spoken about those years to anyone in a long time.',
        effect: (p) => { p.m += 8; p.karma += 6; p.setMem('debtTaughtChildren', true) },
      },
      {
        text: 'Give them the rules without the story.',
        tag: 'gave_rules',
        outcome: '"Never carry a balance. Never. Not for a month." They nod. You mean it more than they can understand yet.',
        effect: (p) => { p.karma += 4; p.setMem('debtTaughtChildren', true) },
      },
      {
        text: 'Say nothing specific. They\'ll learn.',
        tag: 'said_nothing',
        outcome: 'Maybe they will and maybe they won\'t. You watch them go.',
        effect: (p) => { p.setMem('debtTaughtChildren', true) },
      },
    ],
  },

  {
    id: 'debt_student_loan_decade',
    phase: 'midlife',
    weight: 3,
    when: (G) => WEALTHY_ARCHETYPES.includes(G.archetype) && G.flags.has('debt_spiral_experienced') && G.age >= 32 && G.age <= 45 && !G.mem.debtStudentDecade,
    text: 'Ten years of payments on the student loan. You run the numbers: what you owe today is almost exactly what you owed when you started, because interest. The degree that justified this is on the wall of an office in a job that pays you enough to not miss payments and not enough to accelerate them.',
    effect: (p) => { p.m -= 8; p.setMem('debtStudentDecade', true) },
  },

  {
    id: 'debt_late_life_free',
    phase: 'late_life',
    weight: 3,
    when: (G) => G.flags.has('debt_spiral_experienced') && G.age >= 62 && !G.flags.has('debt_spiral') && !G.mem.debtLateLifeFree,
    text: 'The mortgage is paid. The last card is paid. There is a specific absence — the weight you\'ve been managing since your twenties is gone, and you can feel the absence of it more precisely than you could ever feel the weight, because the weight was just the ground you walked on.',
    effect: (p) => { p.m += 15; p.addFlag('debt_recovered'); p.setMem('debtLateLifeFree', true) },
  },

  // ── CONSUMER CREDIT SPIRAL ────────────────────────────────────────────────

  {
    id: 'debt_first_card',
    phase: 'young_adult',
    weight: 4,
    when: (G) => WEALTHY_ARCHETYPES.includes(G.archetype) && G.age >= 18 && G.age <= 24 && !G.flags.has('debt_spiral') && !G.mem.debtFirstCard,
    text: 'The card arrives in the mail. The limit is $500. Within a year, they raise it to $1,500 without asking. The minimum payment is small. The interest rate is in the documentation you didn\'t fully read. The card makes some months possible that wouldn\'t have been.',
    choices: [
      {
        text: 'Use it carefully — pay it in full each month.',
        tag: 'careful',
        outcome: 'You develop the habit early. It becomes automatic, like locking the door. You will not understand for years how unusual this is.',
        effect: (p) => { p.e += 3; p.addFlag('disciplined_saver'); p.setMem('debtFirstCard', true) },
      },
      {
        text: 'Use it. The balance carries from month to month.',
        tag: 'carries_balance',
        outcome: 'The balance is never zero. It grows slowly at first. You are good at not looking directly at it.',
        effect: (p) => { p.mo -= 800; p.addFlag('debt_spiral'); p.addFlag('debt_spiral_experienced'); p.setMem('debtFirstCard', true) },
      },
    ],
  },

  {
    id: 'debt_spiral_deepens',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.flags.has('debt_spiral') && G.age >= 22 && G.age <= 35 && G.money < 600 && !G.mem.debtSpiralDeepens,
    text: 'The month where you pay the Visa with the Mastercard. The arithmetic is obvious when you write it out: you are paying 21% interest to delay 19% interest. The minimum payments together are $340. You make $2,100 a month. Rent is $1,100.',
    choices: [
      {
        text: 'Call the bank. Ask about a hardship plan.',
        tag: 'called_bank',
        outcome: 'They lower the interest rate for six months. You have to close the account to get the plan. You close it.',
        effect: (p) => { p.m -= 8; p.addFlag('debt_restructured'); p.setMem('debtSpiralDeepens', true) },
      },
      {
        text: 'Cash out what\'s in the retirement account.',
        tag: 'cashed_retirement',
        outcome: 'The penalty and taxes eat a third of it. The rest clears the cards. You are forty-two before you start saving for retirement again.',
        effect: (p) => { p.mo -= 3000; p.m -= 5; p.w -= 5; p.setMem('debtSpiralDeepens', true) },
      },
      {
        text: 'Ignore it for now. Something will change.',
        tag: 'ignored',
        outcome: 'Something does not change. The balance crosses five figures. The calls start.',
        effect: (p) => { p.mo -= 2000; p.m -= 12; p.setMem('debtSpiralDeepens', true) },
      },
    ],
  },

  {
    id: 'debt_collector_call',
    phase: 'young_adult',
    weight: 3,
    cooldown: 4,
    when: (G) => G.flags.has('debt_spiral') && G.money < 400,
    text: 'A number you don\'t recognise. The voice uses your full legal name. The script moves between sympathy and legal language — they cannot arrest you, though the phrasing implies otherwise. They cannot call before 8am or after 9pm. It is 8:04am.',
    choices: [
      {
        text: 'Talk to them. Negotiate.',
        tag: 'negotiated',
        outcome: 'They will accept 60 cents on the dollar as a settlement, paid in full by Friday. You don\'t have it. You ask about a payment plan. They say they\'ll call back.',
        effect: (p) => { p.m -= 8 },
      },
      {
        text: 'Let it go to voicemail.',
        tag: 'ignored_call',
        outcome: 'The message is the same message. There are three more calls before noon.',
        effect: (p) => { p.m -= 10 },
      },
    ],
  },

  {
    id: 'debt_bankruptcy',
    phase: 'midlife',
    weight: 2,
    when: (G) => G.flags.has('debt_spiral') && G.money < -1500 && G.age >= 28 && !G.mem.debtBankruptcy,
    text: 'A lawyer explains the options. Chapter 7 discharges most unsecured debt; it destroys your credit score for seven years and will appear on background checks. Chapter 13 restructures payments over five years; you keep more assets, you keep the obligation. The lawyer charges $1,500. You don\'t have $1,500.',
    choices: [
      {
        text: 'File Chapter 7.',
        tag: 'chapter7',
        outcome: 'The calls stop. The debt is gone. For seven years you will rent with cash deposits and borrow at punishing rates. You sleep the night after the filing better than you\'ve slept in years.',
        effect: (p) => { p.m += 15; p.addFlag('debt_bankrupt'); p.addFlag('debt_spiral_experienced'); p.setMem('debtBankruptcy', true) },
      },
      {
        text: 'File Chapter 13.',
        tag: 'chapter13',
        outcome: 'Five years of court-supervised payments. You keep the car. The house, if you have one, depends on the equity.',
        effect: (p) => { p.m += 5; p.addFlag('debt_restructured'); p.addFlag('debt_spiral_experienced'); p.setMem('debtBankruptcy', true) },
      },
    ],
  },

  // ── MICROFINANCE ARC (developing world) ───────────────────────────────────

  {
    id: 'debt_microfinance_entry',
    phase: 'young_adult',
    weight: 3,
    when: (G) => DEVELOPING_ARCHETYPES.includes(G.archetype) && G.stats.wealth <= 3 && !G.flags.has('microfinance_borrower') && !G.flags.has('microfinance_declined') && G.age >= 20 && G.age <= 40,
    text: 'A loan officer comes to the village. The group lending model: five women, jointly liable. If one defaults, the others must cover it. The social pressure is the collateral. The interest rate is 22% per year, which is far below the moneylender\'s 100% per month. The first loan is small — enough to buy stock for a small trade.',
    choices: [
      {
        text: 'Join the circle.',
        tag: 'joined',
        outcome: 'The first loan is repaid. You are offered a second, larger loan. The weekly meeting is part of your schedule now.',
        effect: (p) => { p.m += 5; p.mo += 500; p.addFlag('microfinance_borrower') },
      },
      {
        text: 'Decline.',
        tag: 'declined',
        outcome: 'You have seen group liability go wrong. The risk is distributed but not equally.',
        effect: (p) => { p.addFlag('microfinance_declined') },
      },
    ],
  },

  {
    id: 'debt_microfinance_pressure',
    phase: 'midlife',
    weight: 3,
    cooldown: 5,
    when: (G) => G.flags.has('microfinance_borrower') && G.money < 500,
    text: 'At the weekly meeting, one woman in the circle has not paid. She is three weeks behind. The loan officer watches. The group looks at her. You know her situation — her husband has been sick. The dynamic of the meeting is that the group is responsible for her debt, and everyone here knows it.',
    choices: [
      {
        text: 'Speak for her. Ask for an extension.',
        tag: 'spoke_for',
        outcome: 'The loan officer agrees to one week. You have made an enemy of the process and possibly a friend of the woman. Both things matter here.',
        effect: (p) => { p.karma += 8; p.m -= 3 },
      },
      {
        text: 'Say nothing.',
        tag: 'silent',
        outcome: 'The meeting concludes. She pays the next week somehow. You don\'t ask how.',
        effect: (p) => { p.karma -= 4 },
      },
    ],
  },

  {
    id: 'debt_microfinance_spiral',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('microfinance_borrower') && G.money < 200 && !G.mem.debtMFSpiral,
    text: 'The second loan was taken to repay the first. Now there is a third. The interest on all three combined is more than the income the loans were supposed to generate. The loan officer is also a neighbour. The weekly meeting is also a social occasion.',
    effect: (p) => { p.m -= 12; p.mo -= 1000; p.addFlag('debt_spiral'); p.addFlag('debt_spiral_experienced'); p.setMem('debtMFSpiral', true) },
  },

  // ── IMF STRUCTURAL ADJUSTMENT ─────────────────────────────────────────────

  {
    id: 'debt_imf_arrives',
    phase: 'midlife',
    weight: 3,
    when: (G) => DEVELOPING_ARCHETYPES.includes(G.archetype) && G.currentYear >= 1983 && G.currentYear <= 2002 && (G.career?.field === 'public_sector' || G.career?.field === 'education' || G.career?.field === 'healthcare') && !G.flags.has('structural_adjustment_era'),
    text: 'The IMF programme requires the government to cut the civil service payroll, raise interest rates, and remove food subsidies. The conditions are called a Structural Adjustment Programme. The ministry sends a memo about hiring freezes. The bread at the market is suddenly a different price.',
    effect: (p) => { p.m -= 10; p.mo -= 2000; p.addFlag('structural_adjustment_era') },
  },

  {
    id: 'debt_sap_clinic_closed',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.flags.has('structural_adjustment_era') && !G.mem.debtSAPClinic,
    text: 'The clinic in the next town closed last year. User fees were introduced at the hospital — before that, care was free, or close enough. The primary school is still open but fees apply for materials that used to be provided. These are not listed on any spreadsheet you have access to, but they are the adjustment.',
    effect: (p) => { p.h -= 5; p.m -= 8; p.setMem('debtSAPClinic', true) },
  },

  // ── MEDICAL DEBT ──────────────────────────────────────────────────────────

  {
    id: 'debt_medical_bill',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.character.country?.name === 'United States' && G.conditions.length > 0 && G.age >= 30 && G.age <= 60 && !G.mem.debtMedicalBill,
    text: 'The bill arrives six weeks after the hospital stay. The number is not a typo. The insurance paid 70%, which is why the remaining 30% is a number that requires you to sit down. There is a phone number on the bill for a financial counsellor. Their hours are weekdays 9–4.',
    choices: [
      {
        text: 'Pay it. Whatever it takes.',
        tag: 'paid',
        outcome: 'You put it on the card and watch the balance change. You have been here before, or somewhere like it.',
        effect: (p) => { p.wipeMoney(0.25); p.addFlag('medical_debt'); p.setMem('debtMedicalBill', true) },
      },
      {
        text: 'Call and negotiate.',
        tag: 'negotiated',
        outcome: 'Hospitals will often settle for 40–60% of billed charges if you ask. The person on the phone has authority to do this. You didn\'t know that before.',
        effect: (p) => { p.wipeMoney(0.12); p.e += 2; p.addFlag('medical_debt'); p.setMem('debtMedicalBill', true) },
      },
      {
        text: 'Ignore it. Let it go to collections.',
        tag: 'ignored',
        outcome: 'Medical debt in collections stays on your credit report for seven years, or it did. The rules change. You check periodically.',
        effect: (p) => { p.m -= 8; p.addFlag('medical_debt'); p.addFlag('debt_spiral_experienced'); p.setMem('debtMedicalBill', true) },
      },
    ],
  },
]
