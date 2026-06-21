// events_money.js — Money across a life: first paycheck, inheritance, debt,
// hyperinflation survival, the gift, elder scam, counting days to payment.
// Gates on money thresholds, life stage, and era flags.

export const MONEY_EVENTS = [

  {
    id: 'money_first_paycheck',
    phase: 'young_adult',
    weight: 3,
    when: (G) => !G.mem?.firstPaycheck && G.age >= 18 && G.age <= 26 && G.career,
    text: 'The number on the slip is smaller than you expected and larger than you have had before. You look at it for a long time. You have earned money before — small amounts, irregular — but this is a figure for a month\'s work, arriving on a schedule. The question of what to do with it has no obvious answer.',
    choices: [
      {
        text: 'Spend it — you\'ve earned it',
        tag: 'enjoy',
        outcome: 'You spend it on things that feel right. For a week you are comfortable. Then you begin again.',
        effect: (p) => { p.m += 8; p.setMem('firstPaycheck', true) },
      },
      {
        text: 'Save most of it',
        tag: 'prudent',
        outcome: 'The amount sits in the account and grows slowly. This is what the account is for.',
        effect: (p) => { p.w += 3; p.m += 3; p.mo += 500; p.addFlag('saver_habit'); p.setMem('firstPaycheck', true) },
      },
      {
        text: 'Send most of it home',
        tag: 'responsible',
        outcome: 'Your parent\'s voice on the phone says nothing, and then says something that means everything.',
        effect: (p) => { p.karma += 5; p.m += 5; p.setMem('firstPaycheck', true) },
      },
    ],
  },

  {
    id: 'money_hyperinflation_personal',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      !G.mem?.hyperinflationPersonal &&
      G.flags.has('savings_wiped_hyperinflation') &&
      G.age >= 28,
    text: 'You cash your wages on the day they arrive. By Friday the price of bread has risen again. The bank has removed three zeros from the currency and the number in your account is the same number and means something different. You carry cash in a bag now. You spend it the same day.',
    choices: [
      {
        text: 'Convert savings to hard currency',
        tag: 'strategic',
        outcome: 'You find someone who will exchange. The rate is bad and it is still the right decision.',
        effect: (p) => { p.w += 3; p.m -= 5; p.addFlag('hard_currency_survivor'); p.setMem('hyperinflationPersonal', true) },
      },
      {
        text: 'Barter where possible',
        tag: 'practical',
        outcome: 'The neighbour takes eggs for vegetables. The market woman takes cigarettes. Money is one medium of exchange among several.',
        effect: (p) => { p.s += 3; p.m -= 3; p.addFlag('barter_economy_lived'); p.setMem('hyperinflationPersonal', true) },
      },
      {
        text: 'Wait for it to stabilise',
        tag: 'hoping',
        outcome: 'It does not stabilise quickly. Your savings lose most of their value before the new notes arrive.',
        effect: (p) => { p.w -= 5; p.m -= 8; p.setMem('hyperinflationPersonal', true) },
      },
    ],
  },

  {
    id: 'money_first_debt',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.firstDebtEvent &&
      G.age >= 22 && G.age <= 35 &&
      G.money < 5000 &&
      G.wealthTier <= 3,
    text: 'The interest rate is lower than you feared. The monthly payment is manageable. You sign at three places and walk out with what you needed. The loan officer says congratulations. The weight of it arrives later — not all at once, but as a low-grade awareness that some of your future income already has an owner.',
    choices: null,
    effect: (p) => { p.m -= 4; p.addFlag('first_debt'); p.setMem('firstDebtEvent', true) },
  },

  {
    id: 'money_inheritance',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.mem?.inheritanceEvent &&
      (!G.parents?.father?.alive || !G.parents?.mother?.alive) &&
      G.age >= 35 && G.age <= 62 &&
      G.wealthTier >= 3,
    text: 'The lawyer reads out the figure and you had not expected that number. There is a form. Your name appears where your parent\'s name was. The money is real and the person who earned it is not. You sit in the car for a while before starting it.',
    choices: [
      {
        text: 'Invest it carefully',
        tag: 'prudent',
        outcome: 'You put it somewhere it can grow. It is the kind of decision they would have approved of.',
        effect: (p) => { p.w += 8; p.mo += 20000; p.m += 3; p.setMem('inheritanceEvent', true) },
      },
      {
        text: 'Share it with your siblings',
        tag: 'generous',
        outcome: 'The distribution is not entirely clean — nothing like this ever is — but it settles something.',
        effect: (p) => { p.w += 3; p.mo += 8000; p.karma += 6; p.setMem('inheritanceEvent', true) },
      },
      {
        text: 'Spend it on something lasting',
        tag: 'memorial',
        outcome: 'The thing you buy, or build, or give becomes a marker. Something that will outlast you too.',
        effect: (p) => { p.m += 10; p.karma += 4; p.addFlag('inheritance_memorial'); p.setMem('inheritanceEvent', true) },
      },
    ],
  },

  {
    id: 'money_the_gift',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.majorGiftGiven &&
      G.age >= 65 &&
      G.money >= 30000 &&
      G.karma >= 55,
    text: 'You have been thinking about this for a year. Not the amount — that was settled months ago — but who, and when, and whether to say what it is for. You write the cheque at the kitchen table. It is the largest single thing you have ever done with money, and no one knows about it yet except you.',
    choices: [
      {
        text: 'Give it to your child or grandchild',
        tag: 'family',
        outcome: 'The phone call lasts an hour. There are silences on both sides that mean different things.',
        effect: (p) => { p.karma += 6; p.m += 8; p.addFlag('gave_major_gift'); p.setMem('majorGiftGiven', true) },
      },
      {
        text: 'Give it to a cause',
        tag: 'legacy',
        outcome: 'You receive a letter of acknowledgement. It is formal and genuine. The work it funds will continue after you.',
        effect: (p) => { p.karma += 10; p.m += 6; p.addFlag('gave_major_gift'); p.addFlag('philanthropist'); p.setMem('majorGiftGiven', true) },
      },
    ],
  },

  {
    id: 'money_elder_scam',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      !G.mem?.elderScam &&
      G.age >= 68 &&
      G.money >= 10000,
    text: 'The call comes from someone who knows your bank\'s name, your address, your daughter\'s name. They say there is a problem with your account. They need to verify something small — just the last four digits, just to confirm. Your daughter, when you tell her that evening, goes quiet for a moment before she speaks.',
    choices: [
      {
        text: 'Give them what they asked for',
        tag: 'trusting',
        outcome: 'By morning the account is partially drained. The bank is sympathetic and slow.',
        effect: (p) => { p.wipeMoney(0.35); p.m -= 12; p.addFlag('elder_scam_victim'); p.setMem('elderScam', true) },
      },
      {
        text: 'Hang up and call the bank directly',
        tag: 'careful',
        outcome: 'The bank confirms there is no problem. You tell no one about the call except your daughter.',
        effect: (p) => { p.m -= 3; p.e += 2; p.setMem('elderScam', true) },
      },
    ],
  },

  {
    id: 'money_counting_days',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.moneyCountingDays &&
      G.money < 300 &&
      G.age >= 28 && G.age <= 58 &&
      !G.flags.has('student'),
    text: 'The account balance is the kind of number that means decisions have been made for you. You count the days until the next payment. Each day is a small calculation. You walk past things in shops without stopping — not because you are disciplined, but because stopping would cost something you do not have.',
    choices: null,
    effect: (p) => { p.m -= 6; p.h -= 3; p.addFlag('experienced_true_poverty'); p.setMem('moneyCountingDays', true) },
  },

]
