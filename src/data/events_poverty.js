// events_poverty.js — Burst I
// Traumatic financial experiences across the life course.
// Eviction, repossession, foreclosure, debt collectors, wage garnishment,
// homelessness, welfare, moving in with relatives. Both childhood and adult.
// Guiding principle: mirror real life and how things work.

// ── Welfare label helpers ─────────────────────────────────────────────────────

const WELFARE_NAMES = {
  'United States':    () => 'SNAP benefits',
  'United Kingdom':   (yr) => yr >= 2013 ? 'Universal Credit' : "Jobseeker's Allowance",
  'Australia':        () => 'Centrelink payments',
  'Germany':          (yr) => yr >= 2023 ? 'Bürgergeld' : yr >= 2005 ? 'Hartz IV' : 'Sozialhilfe',
  'France':           (yr) => yr >= 2009 ? 'RSA' : 'RMI',
  'Canada':           () => 'social assistance',
  'Netherlands':      () => 'bijstand',
  'Sweden':           () => 'försörjningsstöd',
  'Norway':           () => 'sosialhjelp',
  'Denmark':          () => 'kontanthjælp',
  'Finland':          () => 'toimeentulotuki',
  'Ireland':          () => "Jobseeker's Benefit",
  'New Zealand':      () => 'Jobseeker Support',
  'Switzerland':      () => 'Sozialhilfe',
  'Belgium':          () => 'leefloon',
  'Austria':          () => 'Mindestsicherung',
}

function welfareLabel(G) {
  const fn = WELFARE_NAMES[G.character.country.name] || WELFARE_NAMES[G.currentCountry?.name]
  if (fn) return fn(G.currentYear)
  // Post-soviet countries have some form
  if (G.archetype === 'post_soviet') return 'state assistance'
  // Wealthy archetypes always have something
  if (['wealthy_west', 'wealthy_east'].includes(G.archetype)) return 'welfare'
  return null
}

function hasFormalWelfare(G) {
  return welfareLabel(G) !== null
}

// True if the archetype typically has shelters
function shelterExists(G) {
  return ['wealthy_west', 'wealthy_east', 'post_soviet'].includes(G.archetype)
}

const HIGH_DEBT_ARCHETYPES = ['wealthy_west', 'wealthy_east']

export const POVERTY_EVENTS = [

  // ── SECTION 1: CHILDHOOD POVERTY ─────────────────────────────────────────────

  {
    id: 'pov_lights_out',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      !G.mem?.povLightsOut &&
      G.age >= 6 && G.age <= 12 &&
      (G.character.familyStability === 'unstable' || G.character.familyStability === 'struggling') &&
      ['wealthy_west', 'wealthy_east', 'post_soviet', 'developing_urban'].includes(G.archetype),
    text: 'The lights go out in the evening, and the next morning too. Your parent is on the phone for a long time using a voice you know means something is wrong. The electricity company has cut the service. Your neighbour lets you charge a torch from their socket. For two weeks you do your homework by the light of it.',
    choices: null,
    effect: (p) => {
      p.setMem('povLightsOut', true)
      p.addFlag('poverty_childhood')
      p.addFlag('utilities_cut_childhood')
      p.m -= 6
      p.h -= 2
    },
  },

  {
    id: 'pov_free_lunch',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      !G.mem?.povFreeLunch &&
      G.age >= 6 && G.age <= 12 &&
      (G.character.familyStability === 'unstable' || G.character.familyStability === 'struggling') &&
      ['wealthy_west', 'wealthy_east'].includes(G.archetype),
    text: 'There is a form your parent has to sign. Free school lunches. You are not meant to know what it is, but you see the word Free in bold and understand. You watch the lunch queue from the side, deciding whether to stand in it or wait until no one is looking.',
    choices: [
      {
        text: 'You stand in the queue anyway — it is just lunch',
        tag: 'pragmatic',
        outcome: 'A classmate notices once and says nothing. Mostly people are too occupied with their own meal to look.',
        effect: (p) => {
          p.setMem('povFreeLunch', true)
          p.addFlag('poverty_childhood')
          p.addFlag('school_shame_poverty')
          p.m -= 4
          p.e += 2
        },
      },
      {
        text: 'You wait until the room empties before you get your tray',
        tag: 'ashamed',
        outcome: 'The lunch is the same whether you eat it with company or alone. You tell yourself this is a choice.',
        effect: (p) => {
          p.setMem('povFreeLunch', true)
          p.addFlag('poverty_childhood')
          p.addFlag('school_shame_poverty')
          p.m -= 8
          p.r += 4
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pov_parents_fight',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      !G.mem?.povParentsFight &&
      G.age >= 7 && G.age <= 13 &&
      (G.character.familyStability === 'unstable' || G.character.familyStability === 'struggling'),
    text: 'You wake to the sound of it — the same argument, the same word, the same pause before the door slams. The word is money. You lie still and listen, learning the grammar of what financial pressure does to two people who love each other and are exhausted and afraid.',
    choices: null,
    effect: (p) => {
      p.setMem('povParentsFight', true)
      p.addFlag('poverty_childhood')
      p.addFlag('overheard_money_fights')
      p.m -= 7
      p.r += 3
    },
  },

  {
    id: 'pov_childhood_eviction',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.povChildhoodEviction &&
      G.age >= 7 && G.age <= 14 &&
      (G.character.familyStability === 'unstable' || G.character.familyStability === 'struggling'),
    text: 'Men come to the door with paperwork. Your parent does not open the door at first, and then does. You watch from the top of the stairs as your parent reads the letter standing up, in the hall, not moving. That evening you pack a bin bag with clothes. You do not ask where you are going.',
    choices: null,
    effect: (p) => {
      p.setMem('povChildhoodEviction', true)
      p.addFlag('poverty_childhood')
      p.addFlag('eviction_witnessed_childhood')
      p.m -= 12
      p.h -= 3
      p.r += 5
    },
  },

  {
    id: 'pov_childhood_homeless',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.povChildhoodHomeless &&
      G.flags.has('eviction_witnessed_childhood') &&
      G.age >= 8 && G.age <= 15,
    text: 'For some weeks you live in places that are not home. A cousin\'s sofa, a night shelter, the back seat of the car with the windows steamed up. You go to school from wherever you are that morning. You do not tell anyone at school. The gap between what your life looks like from the outside and what it is has become a skill you maintain daily.',
    choices: null,
    effect: (p) => {
      p.setMem('povChildhoodHomeless', true)
      p.addFlag('childhood_homeless')
      p.addFlag('poverty_childhood')
      p.m -= 14
      p.h -= 5
      p.r += 6
    },
  },

  {
    id: 'pov_food_bank_child',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      !G.mem?.povFoodBankChild &&
      G.age >= 7 && G.age <= 14 &&
      (G.character.familyStability === 'unstable' || G.character.familyStability === 'struggling') &&
      ['wealthy_west', 'wealthy_east'].includes(G.archetype),
    text: 'Your parent takes you on a Saturday morning to a church hall. There are other families there, queuing quietly, not making eye contact. Each family is given a cardboard box. On the walk home your parent carries it and you carry what doesn\'t fit. The food in the box is different from what you normally eat but it is food.',
    choices: null,
    effect: (p) => {
      p.setMem('povFoodBankChild', true)
      p.addFlag('poverty_childhood')
      p.addFlag('food_bank_child')
      p.m -= 6
      p.h += 2
    },
  },

  // ── SECTION 2: CHILDHOOD POVERTY CALLBACKS ───────────────────────────────────

  {
    id: 'pov_utility_anxiety',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.povUtilityAnxiety &&
      G.flags.has('utilities_cut_childhood') &&
      G.age >= 32 && G.age <= 50,
    text: 'You turn off every light when you leave a room. You check the thermostat before you leave the house. You have enough money — have had enough money for years — and you still do this, still feel the specific dread of the moment before the bill arrives. Your partner has noticed and mentioned it once. You did not explain it then and do not now.',
    choices: null,
    effect: (p) => {
      p.setMem('povUtilityAnxiety', true)
      p.addFlag('poverty_reflex_utilities')
      p.r += 4
      p.m -= 2
    },
  },

  {
    id: 'pov_grocery_reflex',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.povGroceryReflex &&
      (G.flags.has('poverty_childhood') || G.flags.has('food_bank_child')) &&
      G.age >= 33 && G.age <= 52,
    text: 'Your fridge is full. Has been full for years. You still buy more than you need on Friday evenings, still check the expiry dates on things that were bought last week. The habit runs deeper than the reason for it. Your children complain there is never any space. You do not tell them why you need the space taken.',
    choices: null,
    effect: (p) => {
      p.setMem('povGroceryReflex', true)
      p.addFlag('poverty_reflex_food')
      p.r += 3
    },
  },

  {
    id: 'pov_shame_echo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.povShameEcho &&
      G.flags.has('school_shame_poverty') &&
      G.age >= 30 && G.age <= 48,
    text: 'You are at a dinner with colleagues. Someone orders the most expensive thing on the menu and laughs about it. Someone else mentions their parents\' holiday home. You do not speak about where you came from. You have learned to project a fluency in these settings that takes a certain effort you never fully articulate to anyone.',
    choices: [
      {
        text: 'You say something — a careful, honest sentence about where you grew up',
        tag: 'names_it',
        outcome: 'The table briefly reconfigures. Someone says something kind. It is not a big moment, but it is real.',
        effect: (p) => {
          p.setMem('povShameEcho', true)
          p.addFlag('class_named')
          p.m += 6
          p.karma += 3
          p.r -= 3
        },
      },
      {
        text: 'You say nothing — you know how to perform this',
        tag: 'performs',
        outcome: 'You are good at this by now. No one would know. You leave early with a headache that began around the soup.',
        effect: (p) => {
          p.setMem('povShameEcho', true)
          p.m -= 4
          p.r += 5
        },
      },
    ],
    effect: null,
  },

  // ── SECTION 3: DEBT INCITING EVENTS ─────────────────────────────────────────

  {
    id: 'pov_debt_job_loss',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.povDebtJobLoss &&
      !G.career &&
      (G.debt ?? 0) < 2000 &&
      G.money < 500 &&
      G.age >= 22 && G.age <= 40 &&
      HIGH_DEBT_ARCHETYPES.includes(G.archetype),
    text: 'You lose the job in March and by May the credit card is how you buy food. It started as a bridge — just until you find something new. Three months in, the minimum payment is larger than you expected and the balance is not going down. The interest column on the statement is its own small tragedy every month.',
    choices: [
      {
        text: 'Cut everything that can be cut — you will pay this down',
        tag: 'austere',
        outcome: 'It is slower than you expected, but the balance moves. You learn what you can actually live without.',
        effect: (p) => {
          p.setMem('povDebtJobLoss', true)
          p.addFlag('debt_spiral_experienced')
          p.addDebt(1800)
          p.m -= 6
          p.e += 2
        },
      },
      {
        text: 'Keep using it — something will change soon',
        tag: 'avoids',
        outcome: 'Something does not change soon. The balance grows faster than your plan to address it.',
        effect: (p) => {
          p.setMem('povDebtJobLoss', true)
          p.addFlag('debt_spiral_experienced')
          p.addFlag('debt_spiral_active')
          p.addDebt(3200)
          p.m -= 4
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pov_debt_medical',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.povDebtMedical &&
      G.money < 2000 &&
      G.age >= 20 && G.age <= 45 &&
      ['wealthy_west', 'wealthy_east'].includes(G.archetype),
    text: (G) =>
      `The ${G?.character?.country?.name === 'United States' ? 'bill' : 'cost'} arrives three weeks after the treatment. You read the number twice. You understood that the hospital visit was necessary. What you did not understand was the administrative fee, the specialist consultation charge, the ${G?.character?.country?.name === 'United States' ? 'out-of-network cost that you were not informed about' : 'gap between what insurance covers and what the procedure costs'}. The total is more than two months\' rent.`,
    choices: [
      {
        text: 'Set up a payment plan with the provider',
        tag: 'payment_plan',
        outcome: 'They agree to a monthly figure that is manageable if everything else holds. Everything else needs to hold.',
        effect: (p) => {
          p.setMem('povDebtMedical', true)
          p.addFlag('medical_debt')
          p.addDebt(2400)
          p.m -= 5
        },
      },
      {
        text: 'Put it on the credit card — you will deal with it later',
        tag: 'card',
        outcome: 'It is on the card now. It will be on the card for longer than you think.',
        effect: (p) => {
          p.setMem('povDebtMedical', true)
          p.addFlag('medical_debt')
          p.addFlag('debt_spiral_active')
          p.addDebt(2400)
          p.m -= 3
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pov_debt_consumer',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.povDebtConsumer &&
      (G.debt ?? 0) > 1000 && (G.debt ?? 0) < 6000 &&
      G.age >= 24 && G.age <= 38 &&
      HIGH_DEBT_ARCHETYPES.includes(G.archetype),
    text: 'The debt has been accumulating for a few years. Not catastrophically — no single crisis, just the slow drift of spending slightly more than you earn each month. The car needed work. The holiday seemed affordable at the time. The sofa was a good deal. Looking at the total now, you can see the narrative of small decisions that made the number.',
    choices: null,
    effect: (p) => {
      p.setMem('povDebtConsumer', true)
      p.addFlag('debt_spiral_experienced')
      p.addDebt(1500)
      p.m -= 3
      p.r += 4
    },
  },

  // ── SECTION 4: DEBT COLLECTION ARC ──────────────────────────────────────────

  {
    id: 'pov_collector_first',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.povCollectorFirst &&
      (G.debt ?? 0) > 2000 &&
      G.money < 800 &&
      G.age >= 20 && G.age <= 55,
    text: 'The first call comes from a number you do not recognise. The voice is polite and then specific about sums and deadlines. This is a debt collection company. The original creditor has passed the account on. You have thirty days to pay in full or arrange a repayment schedule.',
    choices: [
      {
        text: 'Answer and arrange to pay what you can monthly',
        tag: 'engage',
        outcome: 'They accept a monthly figure. You have bought time. The debt is still the debt.',
        effect: (p) => {
          p.setMem('povCollectorFirst', true)
          p.addFlag('debt_collector_known')
          p.m -= 5
        },
      },
      {
        text: 'Do not answer — maybe it will go away',
        tag: 'avoids',
        outcome: 'It does not go away. The calls increase in frequency. A letter arrives with a different tone.',
        effect: (p) => {
          p.setMem('povCollectorFirst', true)
          p.addFlag('debt_collector_known')
          p.addFlag('debt_collector_escalated')
          p.m -= 8
          p.r += 4
        },
      },
      {
        text: 'Pay the full amount using a payday loan to clear it',
        tag: 'payday',
        outcome: 'The collector stops calling. The payday loan has replaced the debt at a worse interest rate.',
        effect: (p) => {
          p.setMem('povCollectorFirst', true)
          p.addFlag('took_payday_loan')
          p.addDebt(Math.round((p._state?.debt ?? 2000) * 0.4))
          p.m -= 3
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pov_collector_threat',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.povCollectorThreat &&
      G.flags.has('debt_collector_escalated') &&
      G.age >= 21 && G.age <= 56,
    text: 'A letter arrives with a court heading. A county court judgment is being sought against you for the outstanding balance. This is not a threat — it is the next step in a process that has been moving whether or not you were watching it. A CCJ will affect your credit for six years. You have fourteen days to respond.',
    choices: [
      {
        text: 'Respond with a payment proposal — stop the judgment',
        tag: 'respond',
        outcome: 'The creditor accepts the proposal. No judgment is recorded this time. The debt remains.',
        effect: (p) => {
          p.setMem('povCollectorThreat', true)
          p.addFlag('debt_collector_resolved_partial')
          p.m -= 6
          p.creditScore = Math.max(300, (p._state?.creditScore ?? 650) - 40)
        },
      },
      {
        text: 'Ignore it — you have nothing they can take',
        tag: 'ignores',
        outcome: 'The judgment is granted by default. It is on your credit file. Renting, borrowing, and some jobs become harder.',
        effect: (p) => {
          p.setMem('povCollectorThreat', true)
          p.addFlag('ccj_on_record')
          p.m -= 10
          p.r += 5
          p.setCreditScore(Math.max(300, (p._state?.creditScore ?? 650) - 80))
        },
      },
      {
        text: 'See a debt charity for advice — there may be options',
        tag: 'advice',
        outcome: 'The adviser explains a debt relief order as a possibility. It has a cost but it has a floor.',
        effect: (p) => {
          p.setMem('povCollectorThreat', true)
          p.addFlag('sought_debt_advice')
          p.m -= 3
          p.e += 3
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pov_wage_garnishment',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.povWageGarnishment &&
      G.flags.has('ccj_on_record') &&
      G.career !== null &&
      G.age >= 25 && G.age <= 55 &&
      G.character.country.name === 'United States',
    text: 'HR calls you in. There is an attachment of earnings notice on file — a creditor has gone through the courts and your wages will be garnished at fifteen percent until the judgment is satisfied. Your manager does not say anything, but you read the register of the meeting accurately. You leave it understanding that your financial life has become partly visible at work.',
    choices: [
      {
        text: 'Negotiate a lump-sum settlement with the creditor to end it',
        tag: 'settle',
        outcome: 'They accept sixty cents on the dollar. The garnishment stops. The number on the settlement stays in your memory.',
        effect: (p) => {
          p.setMem('povWageGarnishment', true)
          p.addFlag('wage_garnished')
          p.addFlag('debt_settled_discount')
          p.wipeMoney(0.3)
          p.m -= 6
          p.setCreditScore(Math.max(300, (p._state?.creditScore ?? 550) - 20))
        },
      },
      {
        text: 'Let it run — the garnishment will clear the balance eventually',
        tag: 'endure',
        outcome: 'It will take two years at this rate. You adjust your budget and do not tell anyone at work.',
        effect: (p) => {
          p.setMem('povWageGarnishment', true)
          p.addFlag('wage_garnished')
          p.m -= 10
          p.r += 4
        },
      },
    ],
    effect: null,
  },

  // ── SECTION 5: REPOSSESSION ARC ──────────────────────────────────────────────

  {
    id: 'pov_car_repo',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.povCarRepo &&
      G.flags.has('debt_spiral_active') &&
      (G.assets?.vehicles?.length > 0) &&
      G.age >= 22 && G.age <= 55,
    text: 'The car is gone in the morning. You go to the space on the street where you parked it and the space is empty. The repossession company came overnight. There is a reference number on the notice they left under the door. The car is at a compound thirty miles away and the fee to recover it is more than you have.',
    choices: null,
    effect: (p) => {
      p.setMem('povCarRepo', true)
      p.addFlag('car_repossessed')
      p.removeFirstVehicle()
      p.m -= 12
      p.r += 5
      p.setCreditScore(Math.max(300, (p._state?.creditScore ?? 600) - 60))
    },
  },

  {
    id: 'pov_household_bailiffs',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.povBailiffs &&
      G.flags.has('ccj_on_record') &&
      (G.debt ?? 0) > 3000 &&
      G.money < 500 &&
      G.age >= 25 && G.age <= 55,
    text: 'Two men arrive at the door with identification and a court order. They are civil enforcement agents — bailiffs is the word your parent used, and you understand now what that word meant. They make an inventory of items in the hallway: the television, a laptop, a bicycle. They put stickers on them. They give you a week to pay the outstanding sum or the items will be collected.',
    choices: [
      {
        text: 'Borrow money from family to pay the sum and keep the items',
        tag: 'borrows',
        outcome: 'The items stay. The debt to your family is now added to the rest. Your parent does not ask when you will repay it.',
        effect: (p) => {
          p.setMem('povBailiffs', true)
          p.addFlag('goods_seizure_threatened')
          p.addDebt(500)
          p.m -= 6
          p.r += 5
        },
      },
      {
        text: 'Let them take the items — you cannot find the money',
        tag: 'surrenders',
        outcome: 'They come back on Friday. The spaces where the television and laptop were remain visible for longer than the objects did.',
        effect: (p) => {
          p.setMem('povBailiffs', true)
          p.addFlag('goods_seized')
          p.m -= 14
          p.r += 6
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pov_foreclosure_notice',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.povForeclosureNotice &&
      (G.debt ?? 0) > 5000 &&
      G.money < 1000 &&
      (G.assets?.properties?.some(p => p.mortgaged)) &&
      G.age >= 28 && G.age <= 60 &&
      ['wealthy_west', 'wealthy_east'].includes(G.archetype),
    text: 'The bank has sent a notice of default. You are behind on three mortgage payments and the bank is beginning a formal process. The notice explains that if the arrears are not cleared within thirty days, the bank may proceed to repossession. You read it at the kitchen table in the house you have lived in for eight years.',
    choices: [
      {
        text: 'Contact the bank and negotiate a forbearance agreement',
        tag: 'negotiate',
        outcome: 'They agree to a modified payment plan for six months. The house is still yours, on a new set of conditions.',
        effect: (p) => {
          p.setMem('povForeclosureNotice', true)
          p.addFlag('foreclosure_threatened')
          p.addFlag('mortgage_forbearance')
          p.m -= 8
        },
      },
      {
        text: 'Talk to a housing charity or solicitor first',
        tag: 'advice',
        outcome: 'You learn there is more time and more process than the letter implied. The house is not gone yet.',
        effect: (p) => {
          p.setMem('povForeclosureNotice', true)
          p.addFlag('foreclosure_threatened')
          p.addFlag('sought_debt_advice')
          p.m -= 5
          p.e += 3
        },
      },
      {
        text: 'Do nothing — you cannot face it right now',
        tag: 'avoids',
        outcome: 'The thirty days pass. The next letter is from the bank\'s solicitors.',
        effect: (p) => {
          p.setMem('povForeclosureNotice', true)
          p.addFlag('foreclosure_threatened')
          p.addFlag('foreclosure_active')
          p.m -= 12
          p.r += 6
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pov_foreclosure_day',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.povForeclosureDay &&
      G.flags.has('foreclosure_active') &&
      G.age >= 29 && G.age <= 65,
    text: (G) => {
      const hasChild = G?.children?.length > 0
      const childLine = hasChild
        ? ' Your child asks where you are going. You say you are moving somewhere new. That part is true.'
        : ''
      return `The court order has been granted. You have been given a date. You pack what you can carry out in a day.${childLine} The keys go through the letter box. You stand on the pavement and look at the front door for a moment, and then you do not look at it again.`
    },
    choices: null,
    effect: (p) => {
      p.setMem('povForeclosureDay', true)
      p.setMem('isHomeless', true)
      p.addFlag('foreclosure_survived')
      p.addFlag('lost_home')
      p.addFlag('homeless')
      p.removeFirstMortgagedProperty()
      p.m -= 20
      p.r += 8
      p.h -= 4
      p.setCreditScore(Math.max(300, (p._state?.creditScore ?? 550) - 100))
    },
  },

  // ── SECTION 6: ADULT EVICTION ARC ─────────────────────────────────────────────

  {
    id: 'pov_eviction_notice_adult',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.povEvictionNoticeAdult &&
      G.money < 600 &&
      G.age >= 18 && G.age <= 55 &&
      !G.flags.has('homeless') &&
      !G.flags.has('foreclosure_active'),
    text: 'The notice is under your door when you come in. Section 21, or its equivalent — two months to leave, no reason required, just the fact that you have fallen behind or the landlord wants the property back or both. Two months is a concrete number. You sit on the edge of the bed and count backward from sixty.',
    choices: [
      {
        text: 'Start looking for somewhere else immediately',
        tag: 'acts',
        outcome: 'The search is harder than you expected. You have a month left and two realistic options, both worse than this.',
        effect: (p) => {
          p.setMem('povEvictionNoticeAdult', true)
          p.addFlag('eviction_threatened_adult')
          p.m -= 8
          p.e += 2
        },
      },
      {
        text: 'Challenge the notice — you know your rights',
        tag: 'challenges',
        outcome: 'A housing adviser confirms the notice has a technical error. You buy an extra month, and then it is corrected and reissued.',
        effect: (p) => {
          p.setMem('povEvictionNoticeAdult', true)
          p.addFlag('eviction_threatened_adult')
          p.m -= 5
          p.e += 4
        },
      },
      {
        text: 'Say nothing and stay as long as you can — the process takes time',
        tag: 'stays',
        outcome: 'You get two more months. It costs you more in anxiety than it gains in money.',
        effect: (p) => {
          p.setMem('povEvictionNoticeAdult', true)
          p.addFlag('eviction_threatened_adult')
          p.addFlag('eviction_court_debt')
          p.m -= 6
          p.r += 4
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pov_eviction_day',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.povEvictionDay &&
      G.flags.has('eviction_threatened_adult') &&
      G.age >= 18 && G.age <= 60,
    text: (G) => {
      const hasChild = G?.children?.length > 0
      const childLine = hasChild
        ? ' Your child\'s toys are in a bin bag by the door. You pick that bag up last.'
        : ''
      return `The day comes. You have packed what fits in the car, or arranged a van for a morning, or left things behind because you ran out of containers. The landlord or the enforcement officer is there or is not there, but either way the flat is no longer yours.${childLine} You close the door and post the key and walk to wherever you are going next without looking back at the building.`
    },
    choices: null,
    effect: (p) => {
      p.setMem('povEvictionDay', true)
      p.setMem('isHomeless', true)
      p.addFlag('evicted')
      p.addFlag('homeless')
      p.m -= 16
      p.h -= 3
      p.r += 7
    },
  },

  {
    id: 'pov_cps_visit',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.povCpsVisit &&
      G.flags.has('homeless') &&
      G.children?.length > 0 &&
      G.mem?.isHomeless === true &&
      G.age >= 20 && G.age <= 45 &&
      ['wealthy_west', 'wealthy_east'].includes(G.archetype),
    text: 'A social worker visits the temporary address. A neighbour or the school made a referral — children living in unstable housing, that is the phrase in the file. The visit is professional and thorough. They are not unkind. But you understand that the purpose of the visit is to determine whether your children are safe, and that you are being assessed, and that the outcome is not guaranteed.',
    choices: [
      {
        text: 'Be fully open about what has happened and what you are doing to address it',
        tag: 'open',
        outcome: 'The social worker notes the steps you are taking. The case stays open for a review in three months. Your children stay with you.',
        effect: (p) => {
          p.setMem('povCpsVisit', true)
          p.addFlag('cps_contacted')
          p.addFlag('cps_open_case')
          p.m -= 12
          p.karma += 5
        },
      },
      {
        text: 'Minimise the situation — things are better than they look',
        tag: 'minimises',
        outcome: 'The social worker writes "family coping, monitoring." The relief is real but the case is not closed.',
        effect: (p) => {
          p.setMem('povCpsVisit', true)
          p.addFlag('cps_contacted')
          p.m -= 8
          p.r += 4
        },
      },
      {
        text: 'Ask what support is available — housing, emergency payments, anything',
        tag: 'asks_help',
        outcome: 'They give you three numbers. One of them turns out to be useful. You are on a housing priority list now.',
        effect: (p) => {
          p.setMem('povCpsVisit', true)
          p.addFlag('cps_contacted')
          p.addFlag('housing_priority_list')
          p.m -= 6
          p.e += 3
          p.karma += 3
        },
      },
    ],
    effect: null,
  },

  // ── SECTION 7: WELFARE ARC ───────────────────────────────────────────────────

  {
    id: 'pov_benefits_application',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.povBenefitsApplication &&
      !G.career &&
      G.money < 600 &&
      G.age >= 18 && G.age <= 60 &&
      hasFormalWelfare(G),
    text: (G) => {
      const label = welfareLabel(G) || 'welfare'
      return `The application for ${label} requires evidence of everything: identity, address, bank statements, proof of job search. The waiting room at the benefits office has a number system. You sit for an hour and a half before your number is called. The interview is brisk and thorough. You leave not knowing the outcome but having done it.`
    },
    choices: [
      {
        text: 'Complete the application in full',
        tag: 'applies',
        outcome: 'The claim is approved within two weeks. The first payment does not cover everything but it stabilises the immediate situation.',
        effect: (p) => {
          p.setMem('povBenefitsApplication', true)
          p.addFlag('benefits_applied')
          p.addFlag('benefits_recipient')
          p.mo += 400
          p.m -= 4
        },
      },
      {
        text: 'Stop partway through — you cannot face the full process today',
        tag: 'defers',
        outcome: 'The application is incomplete. You go back the following week and finish it. The payment is delayed by ten days.',
        effect: (p) => {
          p.setMem('povBenefitsApplication', true)
          p.addFlag('benefits_applied')
          p.addFlag('benefits_recipient')
          p.mo += 200
          p.m -= 8
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pov_benefits_experience',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.povBenefitsExperience &&
      G.flags.has('benefits_recipient') &&
      G.age >= 19 && G.age <= 62,
    text: (G) => {
      const label = welfareLabel(G) || 'the payment'
      return `The ${label} arrives on a Thursday. It is not enough and it is something. You work out what it covers — most of the food, some of the utilities, not the rent in full. There are conditions attached: a job search log, appointments at the office every two weeks, evidence of applications. You comply. Some weeks the compliance takes more time than a part-time job would.`
    },
    choices: null,
    effect: (p) => {
      p.setMem('povBenefitsExperience', true)
      p.addFlag('knows_welfare_system')
      p.m -= 3
      p.e += 2
    },
  },

  // ── SECTION 8: HOMELESSNESS ARC ──────────────────────────────────────────────

  {
    id: 'pov_homeless_first_night',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.povHomelessFirstNight &&
      G.mem?.isHomeless === true &&
      G.age >= 18 && G.age <= 65,
    text: (G) => {
      const arch = G.archetype
      const hasCar = (G.assets?.vehicles?.length ?? 0) > 0
      const hasFriend = (G.friends?.length ?? 0) > 0
      if (arch === 'subsaharan' || arch === 'developing_urban' || arch === 'developing_unstable') {
        return 'You sleep at a relative\'s. It is not discussed — you arrive and space is made on a mat on the floor of the front room. In the morning your aunt or cousin says nothing about it. You understand this is a grace that has limits you should not test.'
      }
      if (hasCar) {
        return 'The first night you sleep in the car. The seat reclines to a point. You wake up at four in the morning and lie there calculating. The car is warmer than you expected. You do not feel safe but you feel hidden, which is something.'
      }
      if (hasFriend) {
        return 'A friend says you can stay on their sofa. They do not ask many questions. You lie on the sofa that night and hear the sounds of someone else\'s house and understand that you are a guest in your own life right now.'
      }
      if (shelterExists(G)) {
        return 'You go to the council office and they give you a number for the emergency housing team. The shelter they refer you to is a converted church hall with twelve beds. You take one. The rules are no alcohol and out by eight in the morning. You fold your clothes on the chair beside the bed.'
      }
      return 'You find a doorway on a side street that is dry and sheltered from the wind. You have a coat and a bag. You do not sleep for most of the night. By morning you have a clearer sense of what has to happen next than you have had in weeks.'
    },
    choices: null,
    effect: (p) => {
      p.setMem('povHomelessFirstNight', true)
      p.addFlag('has_been_homeless')
      p.m -= 16
      p.h -= 4
      p.r += 5
    },
  },

  {
    id: 'pov_homeless_shelter',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.povHomelessShelter &&
      G.mem?.isHomeless === true &&
      G.flags.has('has_been_homeless') &&
      shelterExists(G) &&
      G.age >= 18 && G.age <= 65,
    text: (G) => {
      const country = G.character.country.name
      if (country === 'United States') {
        return 'The shelter has a waiting list. You get in on the third night. The rules are strict: no substances on the premises, curfew at nine, out by six-thirty. The locker is big enough for your important documents. You keep your documents on you. The social worker has a caseload of fifty-seven people and sees you for twenty minutes twice a week. You make those twenty minutes count.'
      }
      if (country === 'United Kingdom') {
        return 'The council duty housing team processes you as priority-needs homeless. You are put in temporary accommodation — a room in a converted B&B on the edge of town that the council contracts for exactly this purpose. The room has a kettle and a single bed. You share a bathroom with three other families. It is not nothing.'
      }
      return 'The emergency shelter processes you in. Your belongings are stored in a lockable room. The other residents are at different stages of the same situation. Some have been here longer than they intended. You tell yourself you will not be one of those.'
    },
    choices: null,
    effect: (p) => {
      p.setMem('povHomelessShelter', true)
      p.addFlag('used_shelter')
      p.m -= 5
      p.h += 2
    },
  },

  {
    id: 'pov_homeless_job_hunt',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.povHomelessJobHunt &&
      G.mem?.isHomeless === true &&
      !G.career &&
      G.age >= 18 && G.age <= 55,
    text: 'The application form asks for your address. You write the shelter address, or a friend\'s address with their permission, or you leave the line blank and hope. The interview, if you get one, is forty minutes of performing stability. You iron your shirt at the shelter\'s laundry facilities at six in the morning before anyone else is up. You arrive at the interview ten minutes early and tell no one where you slept last night.',
    choices: [
      {
        text: 'Use the shelter address honestly and explain the situation briefly',
        tag: 'honest',
        outcome: 'Some employers end the process there. One, further down the list, does not. You get a second interview.',
        effect: (p) => {
          p.setMem('povHomelessJobHunt', true)
          p.addFlag('homeless_job_search')
          p.m -= 8
          p.e += 3
          p.karma += 3
        },
      },
      {
        text: 'Use a friend\'s address and say nothing about the situation',
        tag: 'conceals',
        outcome: 'The gap in the narrative holds for now. If you get the job, there will be other gaps to manage.',
        effect: (p) => {
          p.setMem('povHomelessJobHunt', true)
          p.addFlag('homeless_job_search')
          p.m -= 6
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pov_homeless_end',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.povHomelessEnd &&
      G.mem?.isHomeless === true &&
      G.money > 1200 &&
      G.age >= 19 && G.age <= 66,
    text: 'You get the keys on a Wednesday. The flat is on the second floor and the windows look onto a courtyard. You stand in the empty main room for a moment without putting anything down. You walk through each room and back. You sit on the floor in the kitchen because there is no furniture yet and you have a cup of tea from a flask and this is, for now, enough.',
    choices: null,
    effect: (p) => {
      p.setMem('povHomelessEnd', true)
      p.setMem('isHomeless', false)
      p.addFlag('homeless_survived')
      p.m += 18
      p.h += 5
    },
  },

  {
    id: 'pov_informal_rescue',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.povInformalRescue &&
      G.mem?.isHomeless === true &&
      ['subsaharan', 'developing_urban', 'developing_unstable', 'post_soviet'].includes(G.archetype) &&
      G.age >= 18 && G.age <= 55,
    text: 'The network holds. An uncle, a second cousin, a neighbour from your old street — someone who knows someone who knows you. A room is found. It is not free — there is an expectation of contribution, of help around the house, of a particular gratitude expressed over months. You meet these conditions. The informal debt is real but has no interest rate.',
    choices: null,
    effect: (p) => {
      p.setMem('povInformalRescue', true)
      p.setMem('isHomeless', false)
      p.addFlag('homeless_survived')
      p.addFlag('informal_network_saved_me')
      p.m += 10
      p.karma += 4
    },
  },

  // ── SECTION 9: MOVING IN WITH RELATIVES ─────────────────────────────────────

  {
    id: 'pov_move_in_parents',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.povMoveInParents &&
      G.money < 500 &&
      (G.parents?.mother?.alive || G.parents?.father?.alive) &&
      !G.flags.has('homeless') &&
      G.age >= 22 && G.age <= 38,
    text: 'You move back into your old room. Your parent has kept it as it was, which is itself a statement. You bring your adult life and fit it around the furniture of your childhood — your desk, your old bed, the view from the window you looked at when you were fifteen and everything seemed possible. The regression is logistical. You remind yourself of this.',
    choices: [
      {
        text: 'Accept it as a temporary arrangement with a clear plan',
        tag: 'temporary',
        outcome: 'You give yourself six months. The plan is more motivating than the room.',
        effect: (p) => {
          p.setMem('povMoveInParents', true)
          p.addFlag('moved_in_with_parents_adult')
          p.mo += 800
          p.m -= 6
          p.r += 4
        },
      },
      {
        text: 'Let it be what it is without a fixed plan',
        tag: 'open',
        outcome: 'The six months becomes a year. You do not ask yourself when exactly the temporary became the present.',
        effect: (p) => {
          p.setMem('povMoveInParents', true)
          p.addFlag('moved_in_with_parents_adult')
          p.mo += 800
          p.m -= 10
          p.r += 6
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pov_move_in_sibling',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.povMoveInSibling &&
      G.money < 400 &&
      G.siblings?.some(s => s.alive) &&
      !G.flags.has('homeless') &&
      G.age >= 20 && G.age <= 42,
    text: 'Your sibling makes space. There is a sofa or a spare room or a division of the flat with a sheet in the doorway and an agreement about the kitchen. The two of you have a full history in a small space now. Every way you have been easy and difficult with each other is available again.',
    choices: null,
    effect: (p) => {
      p.setMem('povMoveInSibling', true)
      p.addFlag('moved_in_with_sibling')
      p.mo += 600
      p.m -= 4
      p.r += 3
    },
  },

  {
    id: 'pov_move_in_friend',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.povMoveInFriend &&
      G.money < 400 &&
      G.friends?.some(f => f.alive) &&
      !G.parents?.mother?.alive && !G.parents?.father?.alive &&
      !G.siblings?.some(s => s.alive) &&
      G.age >= 20 && G.age <= 42,
    text: 'A friend offers their sofa, or the spare room they\'ve been using as a wardrobe. You arrive with a bag and an expression of gratitude you will have to maintain at a level that does not become claustrophobic for either of you. A friendship is the infrastructure for this but it is not designed for this, and both of you know it.',
    choices: null,
    effect: (p) => {
      p.setMem('povMoveInFriend', true)
      p.addFlag('moved_in_with_friend')
      p.mo += 500
      p.m -= 5
      p.s -= 2
    },
  },

  {
    id: 'pov_move_in_protracted',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.povMoveInProtracted &&
      (G.flags.has('moved_in_with_parents_adult') || G.flags.has('moved_in_with_sibling') || G.flags.has('moved_in_with_friend')) &&
      G.age >= 26 && G.age <= 44,
    text: 'What was temporary has become a year. Then nearly two. The arrangement is not bad — the money saved has made things more stable — but the question of when you will leave your own version of your life has developed a quality you recognise as avoidance. You are comfortable enough not to do what is uncomfortable.',
    choices: [
      {
        text: 'Set a departure date and hold to it',
        tag: 'leaves',
        outcome: 'You move out on the date you set. It costs more than staying. You needed it to cost more.',
        effect: (p) => {
          p.setMem('povMoveInProtracted', true)
          p.addFlag('moved_out_of_relatives')
          p.m += 8
          p.r -= 4
        },
      },
      {
        text: 'Stay — the financial logic still holds',
        tag: 'stays',
        outcome: 'The financial logic does hold. The other logic you manage.',
        effect: (p) => {
          p.setMem('povMoveInProtracted', true)
          p.m -= 5
          p.r += 5
          p.mo += 400
        },
      },
    ],
    effect: null,
  },

  // ── SECTION 10: WORKING POOR ─────────────────────────────────────────────────

  {
    id: 'pov_working_poor',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.povWorkingPoor &&
      G.career &&
      G.money < 800 &&
      G.age >= 20 && G.age <= 40 &&
      (G.wealthTier ?? 3) <= 2,
    text: 'You have a job and the job pays not quite enough. The gap between what comes in and what goes out has a name — rent, utilities, food — and it is specific every month. You know your bank balance on the twenty-eighth of every month in a way that people with larger balances do not. You count forward to payday in a way that feels like arithmetic and reads, from the outside, like something else.',
    choices: null,
    effect: (p) => {
      p.setMem('povWorkingPoor', true)
      p.addFlag('working_poor')
      p.m -= 6
      p.r += 5
      p.e += 2
    },
  },

  {
    id: 'pov_second_job',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem?.povSecondJob &&
      G.flags.has('working_poor') &&
      G.age >= 22 && G.age <= 45,
    text: 'You take on a second job. The second job is Saturday mornings and two evenings a week. Your body adjusts to a schedule it does not prefer. The combined income now covers the gap, barely, with nothing left for the unforeseen. The unforeseen arrives on schedule.',
    choices: [
      {
        text: 'Keep going — the financial stability is worth it',
        tag: 'keeps',
        outcome: 'You maintain it for longer than your body expected. You are tired in a specific way that sleep does not entirely resolve.',
        effect: (p) => {
          p.setMem('povSecondJob', true)
          p.addFlag('works_two_jobs')
          p.mo += 600
          p.h -= 5
          p.m -= 4
        },
      },
      {
        text: 'Quit the second job after a few months — the cost to your health is too high',
        tag: 'quits',
        outcome: 'The exhaustion lifts within two weeks. The financial gap is back. You look for a better primary option instead.',
        effect: (p) => {
          p.setMem('povSecondJob', true)
          p.addFlag('chose_rest_over_money')
          p.h += 4
          p.m += 3
          p.karma += 2
        },
      },
    ],
    effect: null,
  },

  {
    id: 'pov_working_poor_reckoning',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.povWorkingPoorReckoning &&
      G.flags.has('working_poor') &&
      G.age >= 34 && G.age <= 50,
    text: 'You have been doing this for over a decade. Working, not getting ahead. Covering costs, not building anything. The middle class is visible from here — a specific distance, a specific quality of furniture, a specific relationship with uncertainty. You know exactly where you are. The question is whether this is a stage or a condition.',
    choices: [
      {
        text: 'Retrain or reskill — change the income ceiling',
        tag: 'retrains',
        outcome: 'It takes two years and costs you rest you did not have to spare. The qualification on the other end is real.',
        effect: (p) => {
          p.setMem('povWorkingPoorReckoning', true)
          p.addFlag('reskilled_from_poverty')
          p.e += 8
          p.m -= 5
          p.mo -= 1000
          p.karma += 4
        },
      },
      {
        text: 'Accept the life as it is — you have built something that holds',
        tag: 'accepts',
        outcome: 'The acceptance is not defeat. It is an accurate read of what you have and what it costs to keep it.',
        effect: (p) => {
          p.setMem('povWorkingPoorReckoning', true)
          p.addFlag('poverty_accepted')
          p.m += 4
          p.r += 5
          p.karma += 3
        },
      },
      {
        text: 'Look for a way out through a different route — a person, a place, a scheme',
        tag: 'searches',
        outcome: 'You find something. Whether it delivers is a different question. For now, there is movement where there was none.',
        effect: (p) => {
          p.setMem('povWorkingPoorReckoning', true)
          p.addFlag('seeking_way_out_poverty')
          p.m += 2
          p.e += 3
        },
      },
    ],
    effect: null,
  },

  // ── SECTION 11: CHILDREN IN POVERTY ──────────────────────────────────────────

  {
    id: 'pov_child_school_parent',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.povChildSchoolParent &&
      G.flags.has('poverty_childhood') &&
      G.children?.length > 0 &&
      G.age >= 30 && G.age <= 50,
    text: 'Your child comes home with a form about the school trip. The cost is not large. It is large enough. You recognise the calculation your parent ran when you were this age, running it now for your own child — whether to say it cannot be done and explain, or to find the money and not explain. You had promised yourself this specific moment would not arrive.',
    choices: [
      {
        text: 'Find the money somehow — your child goes on the trip',
        tag: 'finds_money',
        outcome: 'They go. They come back happy. You did not eat lunch for three days and you do not mention it.',
        effect: (p) => {
          p.setMem('povChildSchoolParent', true)
          p.addFlag('sacrificed_for_child')
          p.mo -= 180
          p.karma += 6
          p.m += 4
          p.r += 3
        },
      },
      {
        text: 'Explain the situation to your child honestly',
        tag: 'honest_with_child',
        outcome: 'They are disappointed and then, after a moment, not. They grow up by a small amount in the car on the way home.',
        effect: (p) => {
          p.setMem('povChildSchoolParent', true)
          p.addFlag('honest_with_child_about_money')
          p.m -= 5
          p.karma += 4
          p.r += 5
        },
      },
    ],
    effect: null,
  },

  // ── SECTION 12: RECOVERY ARC ─────────────────────────────────────────────────

  {
    id: 'pov_first_stable_address',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.povFirstStableAddress &&
      G.flags.has('homeless_survived') &&
      G.money > 1000 &&
      !G.mem?.isHomeless &&
      G.age >= 22 && G.age <= 60,
    text: 'Two years in this flat, or close to it. You have a chair that belongs to you and a kitchen that operates on your schedule. You have people who ring the bell and expect to be let in. The address on your bank statement is a place you recognise. You notice this with the specific attention of someone who has not always had it.',
    choices: null,
    effect: (p) => {
      p.setMem('povFirstStableAddress', true)
      p.addFlag('stability_achieved')
      p.m += 12
      p.r -= 4
    },
  },

  {
    id: 'pov_debt_free_day',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.povDebtFreeDay &&
      (G.debt ?? 0) < 200 &&
      G.money > 500 &&
      G.flags.has('debt_spiral_experienced') &&
      G.age >= 24 && G.age <= 60,
    text: 'The balance is two figures now. You pay what remains and the account reads zero. It is not a celebration exactly — the debt has been gone in practice for months, reduced to something theoretical. But the zero is a fact. You read it twice. You sit back and understand that the background noise you have been carrying for some years has stopped.',
    choices: null,
    effect: (p) => {
      p.setMem('povDebtFreeDay', true)
      p.addFlag('debt_spiral_survived')
      p.m += 10
      p.r -= 5
      p.karma += 3
    },
  },

  {
    id: 'pov_credit_rebuilding',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.povCreditRebuilding &&
      G.flags.has('debt_spiral_survived') &&
      (G.creditScore ?? 700) < 600 &&
      G.money > 1500 &&
      G.age >= 26 && G.age <= 60 &&
      ['wealthy_west', 'wealthy_east'].includes(G.archetype),
    text: 'You apply for a credit card with a low limit. The kind designed for people rebuilding. The interest rate is punitive for anyone who carries a balance. You do not carry a balance. You pay it in full every month. After a year the credit reference agency updates your file. The score is still not good but it is moving. You understand now that credit is not about debt — it is about demonstrating that you are trustworthy with debt.',
    choices: null,
    effect: (p) => {
      p.setMem('povCreditRebuilding', true)
      p.addFlag('credit_rebuilding')
      p.m += 5
      p.e += 3
      p.setCreditScore(Math.min(800, (p._state?.creditScore ?? 450) + 80))
    },
  },

  {
    id: 'pov_money_not_emergency',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.povMoneyNotEmergency &&
      G.flags.has('poverty_childhood') &&
      (G.wealthTier ?? 1) >= 3 &&
      G.money > 8000 &&
      G.age >= 35 && G.age <= 55,
    text: 'The fridge is full and the rent is paid and you have, for the first time in your life, what financial advisers call an emergency fund. The concept was theoretical for most of your life — money you do not touch, money that exists against a future emergency rather than being consumed by the present one. You look at the number and feel something you cannot immediately name. It takes you a moment to identify it as calm.',
    choices: null,
    effect: (p) => {
      p.setMem('povMoneyNotEmergency', true)
      p.addFlag('financial_security_found')
      p.m += 15
      p.r -= 6
      p.karma += 4
    },
  },

  {
    id: 'pov_payday_loan_consequence',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.povPaydayConsequence &&
      G.flags.has('took_payday_loan') &&
      G.age >= 20 && G.age <= 45,
    text: 'The payday loan is due on the date specified. The amount is three hundred and twenty percent of what you borrowed, annualised. The specific figure when you took it out was small enough to seem manageable. The specific figure when it is due is larger than the emergency it was supposed to cover. You look at both numbers and understand the mechanism.',
    choices: [
      {
        text: 'Pay it in full and never use one again',
        tag: 'pays_full',
        outcome: 'Paid. The lesson is expensive and it has been learned. You understand now what the APR figure means.',
        effect: (p) => {
          p.setMem('povPaydayConsequence', true)
          p.addFlag('payday_loan_escaped')
          p.wipeMoney(0.25)
          p.m -= 6
          p.e += 4
        },
      },
      {
        text: 'Roll it over — you cannot cover the full amount right now',
        tag: 'rolls',
        outcome: 'The new amount is larger. The next due date is closer than the last one felt. You are in the mechanism now.',
        effect: (p) => {
          p.setMem('povPaydayConsequence', true)
          p.addFlag('payday_loan_spiral')
          p.addDebt(600)
          p.m -= 10
          p.r += 5
        },
      },
    ],
    effect: null,
  },

  // ── EVENT 44: BANKRUPTCY CONTEMPLATION ───────────────────────────────────────

  {
    id: 'pov_bankruptcy_contemplation',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem?.povBankruptcy &&
      (G.debt ?? 0) > 8000 &&
      G.money < 200 &&
      G.age >= 21 && G.age <= 65 &&
      ['wealthy_west', 'wealthy_east'].includes(G.archetype),
    text: 'You have looked at the numbers from every angle and the numbers do not change. The debt is not something you can pay down on your current income — the interest outpaces your ability to reduce the principal. A solicitor or credit counsellor has mentioned the word bankruptcy. In films it is portrayed as a catastrophe. In practice it is a legal mechanism for acknowledging that a situation is irresolvable and beginning again on different terms. You are reading about it for the third time.',
    choices: [
      {
        text: 'Liquidate the debt — fresh start, lose non-exempt assets (Chapter 7 / Debt Relief Order)',
        tag: 'liquidation',
        outcome: 'The process takes several months. Your non-exempt assets are assessed. At the end of it, the debt is gone. So is your credit, your non-exempt property, and a certain quality of pretence.',
        effect: (p) => {
          p.setMem('povBankruptcy', true)
          p.addFlag('declared_bankrupt')
          p.addFlag('debt_spiral_survived')
          p.setDebt(0)
          p.setCreditScore(320)
          p.m += 6
          p.r += 8
          p.karma -= 2
        },
      },
      {
        text: 'Restructure and repay over time — keep assets, pay a portion monthly (Chapter 13 / DMP)',
        tag: 'restructure',
        outcome: 'The plan commits you to a fixed monthly payment for several years. You keep what you have. The debt stays present but bounded.',
        effect: (p) => {
          p.setMem('povBankruptcy', true)
          p.addFlag('debt_management_plan')
          p.setDebt(Math.round((p._state?.debt ?? 10000) * 0.4))
          p.setCreditScore(Math.max(350, (p._state?.creditScore ?? 500) - 60))
          p.m += 2
        },
      },
      {
        text: 'Not yet — you will find another way',
        tag: 'declines',
        outcome: 'You are not ready to call it. Some part of you still believes the arithmetic will change. You continue.',
        effect: (p) => {
          p.setMem('povBankruptcy', true)
          p.m -= 5
          p.r += 4
        },
      },
    ],
    effect: null,
  },

]
