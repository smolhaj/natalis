// BUILD 35 — Informal Economy
// For subsaharan, conflict_zone, developing_unstable, and developing_urban characters
// with no formal career. Tracks informalWorkType in G.mem.
// workStatus set to 'informal' via p.setWorkStatus('informal').

const LOW_GDP_ARCHETYPES = ['subsaharan', 'conflict_zone', 'developing_unstable', 'developing_urban']
const URBAN_WORK_TYPES = ['hawker', 'market_stall', 'moto_taxi', 'day_labor']
const RURAL_WORK_TYPES = ['subsistence_farm', 'day_labor']

export const INFORMAL_EVENTS = [

  // ── ENTRY ──────────────────────────────────────────────────────────────────

  {
    id: 'inf_enter_informal',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      LOW_GDP_ARCHETYPES.includes(G.archetype) &&
      G.career === null &&
      G.age >= 16 && G.age <= 24 &&
      !G.mem?.informalWorkType &&
      G.workStatus !== 'formal',
    text: (G) => {
      const isRural = G.ruralUrban === 'rural'
      if (isRural) return 'School ended or was never an option. The land needs working or someone needs moving. You find your place in the economy the way most people here do — not through an interview, but through showing up and being useful.'
      return 'There is no advertisement for what you start doing. You find a gap — a route with no one selling cold drinks, a corner where nobody parks a motorcycle yet, a market stall her cousin is leaving — and you fill it.'
    },
    choices: [
      {
        text: (G) => G.ruralUrban === 'rural' ? 'Work the family plot and sell the surplus' : 'Start selling from a barrow — stock you can carry',
        tag: null,
        outcome: (G) => G.ruralUrban === 'rural' ? 'The rhythm of the land becomes your rhythm.' : 'The barrow is heavy. Your legs learn it.',
        effect: (p) => {
          const isRural = p._state.character.ruralUrban === 'rural'
          p.setWorkStatus('informal')
          p.setMem('informalWorkType', isRural ? 'subsistence_farm' : 'hawker')
          p.mo += 400; p.w += 2; p.h += 2
        },
      },
      {
        text: (G) => G.ruralUrban === 'rural' ? 'Take day labour on other farms' : 'Find a motorcycle — carry people, carry goods',
        tag: null,
        outcome: (G) => G.ruralUrban === 'rural' ? 'You are reliable. That is enough, for now.' : 'The bike is borrowed. You earn and you pay back.',
        effect: (p) => {
          const isRural = p._state.character.ruralUrban === 'rural'
          p.setWorkStatus('informal')
          p.setMem('informalWorkType', isRural ? 'day_labor' : 'moto_taxi')
          p.mo += 350; p.w += 1; p.s += 2
        },
      },
      {
        text: (G) => G.ruralUrban === 'rural' ? 'Find work in the nearest town' : 'Set up a stall in the market',
        tag: null,
        outcome: 'You negotiate a corner. It is yours now, by convention if not by law.',
        effect: (p) => {
          p.setWorkStatus('informal')
          p.setMem('informalWorkType', 'market_stall')
          p.mo += 500; p.w += 2
        },
      },
    ],
    effect: null,
  },

  // ── HAWKER EVENTS ──────────────────────────────────────────────────────────

  {
    id: 'inf_hawker_route',
    phase: 'young_adult',
    weight: 3,
    cooldown: 5,
    when: (G) => G.mem?.informalWorkType === 'hawker' && G.age >= 18 && !G.mem?.hawkerRouteSet,
    text: (G) => {
      const city = G.place?.name ?? G.capital
      return `The route is yours now by repetition, not contract. The vendors at ${city} know your face. The spot outside the bus depot — the shaded side, two steps from where the taxis stop — is yours between six and noon. Nobody told you this. You learned it the way these things are learned: by showing up.`
    },
    choices: null,
    effect: (p) => { p.setMem('hawkerRouteSet', true); p.m += 5; p.s += 3; p.mo += 600 },
  },

  {
    id: 'inf_hawker_inspector',
    phase: 'young_adult',
    weight: 4,
    cooldown: 3,
    when: (G) => G.mem?.informalWorkType === 'hawker' && G.age >= 18,
    text: 'The city council inspector arrives with a clipboard and a uniform. He says your spot is unlicensed. He says there is a fine. The amount he writes on the paper is not the amount he expects.',
    choices: [
      {
        text: 'Pay what he actually wants',
        tag: null,
        outcome: 'He tucks it away. You are back selling by noon.',
        effect: (p) => { p.mo -= 80; p.karma -= 2 },
      },
      {
        text: 'Argue — demand a proper receipt',
        tag: null,
        outcome: 'He writes nothing and takes nothing. But he will be back.',
        effect: (p) => { p.m -= 3; p.s += 3; p.karma += 3 },
      },
      {
        text: 'Pack up and move to a different street',
        tag: null,
        outcome: 'You lose the morning. The new spot is worse. You will need to earn back what the route took years to build.',
        effect: (p) => { p.mo -= 150; p.m -= 4 },
      },
    ],
    effect: null,
  },

  {
    id: 'inf_hawker_rain',
    phase: 'young_adult',
    weight: 3,
    cooldown: 4,
    when: (G) => G.mem?.informalWorkType === 'hawker',
    text: 'The rains arrive a week early and the wrong kind — not the afternoon shower that passes but the all-day grey that soaks through the plastic sheeting. By the time it clears, the bread is wet. The vegetables have gone. You count what is left and it is not enough to cover what you bought.',
    choices: null,
    effect: (p) => { p.mo -= 250; p.m -= 6; p.h -= 2 },
  },

  // ── MOTORCYCLE TAXI EVENTS ─────────────────────────────────────────────────

  {
    id: 'inf_moto_taxi_start',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) => G.mem?.informalWorkType === 'moto_taxi' && !G.mem?.motoTaxiStarted,
    text: 'The motorcycle is not yours yet — you pay the owner a daily rate and keep what is above it. This means the first two hours of every morning belong to someone else. After that you are working for yourself. You learn the city\'s underside: the shortcuts, the road conditions, the police shift changes, the checkpoints where you pay and the ones where you argue.',
    choices: null,
    effect: (p) => { p.setMem('motoTaxiStarted', true); p.m += 4; p.s += 3; p.e += 3; p.mo += 800 },
  },

  {
    id: 'inf_moto_taxi_repair',
    phase: 'young_adult',
    weight: 4,
    cooldown: 3,
    when: (G) => G.mem?.informalWorkType === 'moto_taxi',
    text: 'The engine starts making a sound it didn\'t make last week. The mechanic at the corner says it is the carburettor. The repair will take three days and cost more than you earn in a week. While it sits in the yard, you earn nothing.',
    choices: [
      {
        text: 'Pay for the full repair',
        tag: null,
        outcome: 'Back on the road. Poorer by a week\'s wages but running.',
        effect: (p) => { p.mo -= 400; p.m -= 3 },
      },
      {
        text: 'Find a cheaper mechanic and risk it',
        tag: null,
        outcome: 'He fixes what he can see. The sound returns three weeks later.',
        effect: (p) => { p.mo -= 150; p.m -= 5; p.h -= 2 },
      },
    ],
    effect: null,
  },

  {
    id: 'inf_moto_taxi_police',
    phase: 'young_adult',
    weight: 3,
    cooldown: 4,
    when: (G) => G.mem?.informalWorkType === 'moto_taxi',
    text: 'The checkpoint is new — they rearranged the barriers last night. Two officers, helmets pushed back, looking at every *boda-boda* that slows down. Your registration is from another district. One of them waves you over.',
    choices: [
      {
        text: 'Negotiate quietly',
        tag: null,
        outcome: 'A familiar transaction. You are waved through in two minutes.',
        effect: (p) => { p.mo -= 120; p.karma -= 2 },
      },
      {
        text: 'Show your documents and wait it out',
        tag: null,
        outcome: 'Forty minutes. They check everything twice. You miss four fares.',
        effect: (p) => { p.mo -= 200; p.m -= 3; p.karma += 2 },
      },
    ],
    effect: null,
  },

  // ── MARKET STALL EVENTS ────────────────────────────────────────────────────

  {
    id: 'inf_market_stall_neighbor',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) => G.mem?.informalWorkType === 'market_stall' && !G.mem?.stallNeighborNamed,
    text: 'The stall two down sells the same things you sell, but she has been here longer and knows the wholesale contact. You start as rivals — the careful politeness of competitors who share a wall. By the third dry season, she is watching your stall when you take your child to the clinic.',
    choices: null,
    effect: (p) => {
      const c = p._state.character.country
      const name = c.namePool.female[Math.floor(Math.random() * c.namePool.female.length)]
      p.setMem('stallNeighborName', name)
      p.setMem('stallNeighborNamed', true)
      p.makeFriend(68)
      p.m += 7; p.s += 4
    },
  },

  {
    id: 'inf_market_stall_demolish',
    phase: 'young_adult',
    weight: 2,
    cooldown: 0,
    when: (G) => G.mem?.informalWorkType === 'market_stall' && !G.mem?.stallDemolishEvent,
    text: (G) => {
      const city = G.place?.name ?? G.capital
      return `The notice goes up on a Tuesday. The city is building something — a bus terminal, a car park, a road widening — and the ${city} market is in the way. You have thirty days. The stall is not yours in any legal sense, but you have been here for ${Math.min(G.age - 18, 7)} years.`
    },
    choices: [
      {
        text: 'Organise with the other vendors to resist',
        tag: null,
        outcome: 'You buy three more months and negotiate a space in the new covered market. It is smaller and costs a fee. It is also legal.',
        effect: (p) => { p.m -= 5; p.karma += 8; p.s += 5; p.setMem('stallDemolishEvent', true); p.setMem('informalWorkType', 'market_stall') },
      },
      {
        text: 'Find a new location before the deadline',
        tag: null,
        outcome: 'The new spot is worse — less traffic, different customers. You start again.',
        effect: (p) => { p.mo -= 600; p.m -= 8; p.setMem('stallDemolishEvent', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'inf_stall_supplier_debt',
    phase: 'young_adult',
    weight: 3,
    cooldown: 5,
    when: (G) => G.mem?.informalWorkType === 'market_stall' && G.money < 2000,
    text: 'The supplier lets you take goods on credit — not in writing, but by his word and your word, which out here is the only contract that exists. You owe him six weeks of slow sales worth of stock. He is patient because he needs your business. You are anxious because he is patient.',
    choices: [
      {
        text: 'Pay it off before you restock',
        tag: null,
        outcome: 'Lean two weeks. You eat the same thing every day. The debt clears.',
        effect: (p) => { p.mo -= 500; p.m -= 5; p.karma += 3 },
      },
      {
        text: 'Keep trading — the debt stays manageable',
        tag: null,
        outcome: 'It is not a crisis. But it never fully goes away.',
        effect: (p) => { p.addDebt(500); p.m -= 2 },
      },
    ],
    effect: null,
  },

  // ── DAY LABOUR EVENTS ──────────────────────────────────────────────────────

  {
    id: 'inf_day_labor_gathering',
    phase: 'young_adult',
    weight: 4,
    cooldown: 3,
    when: (G) => G.mem?.informalWorkType === 'day_labor' && G.age >= 18,
    text: 'You are at the corner by six. There are fifteen others already. The contractor arrives in a pickup, looks at the line, points: you, you, you, not you. The selection has no logic you can read. You get picked. Today you will pour concrete for nine hours. You will be paid in cash at the end.',
    choices: null,
    effect: (p) => { p.mo += 350; p.h -= 3; p.m -= 2 },
  },

  {
    id: 'inf_day_labor_unpaid',
    phase: 'young_adult',
    weight: 3,
    cooldown: 4,
    when: (G) => G.mem?.informalWorkType === 'day_labor',
    text: 'Three days of work — clearing foundations, mixing cement, loading. At the end the foreman says the site manager has not come with the cash and to come back Friday. On Friday there is a different foreman who says he does not know anything about three days.',
    choices: [
      {
        text: 'Keep coming back until you are paid',
        tag: null,
        outcome: 'After two more weeks they pay you half. You take it.',
        effect: (p) => { p.mo += 300; p.m -= 10; p.h -= 3 },
      },
      {
        text: 'Accept the loss and find a different contractor',
        tag: null,
        outcome: 'The loss is a week\'s food. You do not work for that company again.',
        effect: (p) => { p.mo -= 800; p.m -= 12; p.karma += 3 },
      },
    ],
    effect: null,
  },

  // ── SUBSISTENCE FARM EVENTS ────────────────────────────────────────────────

  {
    id: 'inf_subsistence_good_year',
    phase: 'young_adult',
    weight: 3,
    cooldown: 4,
    when: (G) => G.mem?.informalWorkType === 'subsistence_farm' && G.ruralUrban === 'rural',
    text: 'The rains came when they should and stayed long enough. The yield is more than the household needs. You carry the surplus to the weekly market — the first time you have had something to sell rather than only to buy.',
    choices: null,
    effect: (p) => { p.mo += 800; p.m += 8; p.h += 3 },
  },

  {
    id: 'inf_subsistence_bad_year',
    phase: 'young_adult',
    weight: 3,
    cooldown: 4,
    when: (G) => G.mem?.informalWorkType === 'subsistence_farm' && G.ruralUrban === 'rural',
    text: 'The dry spell lasted two weeks longer than anyone expected. The cassava is salvageable but thin. There is enough to eat — barely, and only if you adjust. The seed you were saving for next season will need to be eaten now.',
    choices: null,
    effect: (p) => { p.mo -= 300; p.m -= 5; p.h -= 3; p.addFlag('food_insecurity') },
  },

  // ── CROSS-CUTTING INFORMAL EVENTS ─────────────────────────────────────────

  {
    id: 'inf_mobile_money',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.mem?.informalWorkType &&
      ['subsaharan', 'developing_urban'].includes(G.archetype) &&
      G.currentYear >= 2007 && G.currentYear <= 2018 &&
      !G.mem?.mobileMoneyGot,
    text: 'The phone agent at the airtime kiosk shows you how it works. You give him cash. He sends it to your number. You can send it to your mother\'s number in the village without a bus, without a courier, without anyone losing it on the road. This changes something fundamental about how money moves in your life.',
    choices: null,
    effect: (p) => { p.setMem('mobileMoneyGot', true); p.m += 8; p.w += 3; p.addFlag('mobile_money_user') },
  },

  {
    id: 'inf_savings_circle',
    phase: 'young_adult',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.mem?.informalWorkType &&
      LOW_GDP_ARCHETYPES.includes(G.archetype) &&
      !G.mem?.joinedSavingsCircle,
    text: 'Seven women from the market form a group: each contributes the same amount every month, and one person takes the whole pot. By the time it comes back to you, it is enough to repair the roof or buy the school uniform or pay the deposit on a proper stall space.',
    choices: [
      {
        text: 'Join the circle',
        tag: null,
        outcome: 'The pot comes around in the fourth month. It is not a lot. It is more than you would have saved alone.',
        effect: (p) => { p.setMem('joinedSavingsCircle', true); p.m += 8; p.w += 5; p.mo += 1200; p.s += 3 },
      },
      {
        text: 'Stay out — you need the cash now, not in six months',
        tag: null,
        outcome: 'A sensible calculation. The group thrives without you.',
        effect: (p) => { p.setMem('joinedSavingsCircle', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'inf_formalization',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.workStatus === 'informal' &&
      G.mem?.informalWorkType &&
      G.age >= 28 && G.age <= 45 &&
      !G.mem?.formalizationEvent,
    text: (G) => {
      const cityType = G.ruralUrban === 'urban' ? 'the city' : 'the district'
      return `${G.archetype === 'developing_urban' ? 'A new programme in ' + cityType : 'A government drive'} is registering informal traders. A licence, a tax number, a name on an official list. The fee is not small. Some of your colleagues are suspicious — once you are registered, you can be taxed. Once you can be taxed, you can be fined.`
    },
    choices: [
      {
        text: 'Register — access formal banking, protection from arbitrary fines',
        tag: null,
        outcome: 'The paperwork takes a week. The licence goes on the wall. Small loans become possible. A different category of problem replaces the old ones.',
        effect: (p) => {
          p.setMem('formalizationEvent', true)
          p.setWorkStatus('formal')
          p.addFlag('formalized_worker')
          p.mo -= 400; p.w += 5; p.m += 5
        },
      },
      {
        text: 'Stay off the register — keep the flexibility',
        tag: null,
        outcome: 'Nothing changes. Which is the point.',
        effect: (p) => { p.setMem('formalizationEvent', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'inf_midlife_reckoning',
    phase: 'midlife',
    weight: 3,
    cooldown: 0,
    when: (G) =>
      G.workStatus === 'informal' &&
      G.mem?.informalWorkType &&
      G.age >= 38 && G.age <= 50 &&
      !G.mem?.informalMidlifeAck,
    text: (G) => {
      const years = G.age - 18
      const workType = G.mem?.informalWorkType === 'hawker' ? 'selling' :
        G.mem?.informalWorkType === 'moto_taxi' ? 'riding' :
        G.mem?.informalWorkType === 'market_stall' ? 'the stall' :
        G.mem?.informalWorkType === 'subsistence_farm' ? 'the farm' : 'this work'
      return `You have been doing ${workType} for roughly ${years} years. There is no pension. There is no sick pay. When you don't work, you don't earn, and when you are sick you still don't work. Some people in your position call this freedom. Others call it what it is.`
    },
    choices: [
      {
        text: 'Start setting aside something, however small, for later',
        tag: null,
        outcome: 'A biscuit tin under the bed. A hundred a week if possible. It is not a retirement plan. It is something.',
        effect: (p) => { p.setMem('informalMidlifeAck', true); p.mo -= 600; p.m += 3; p.addFlag('informal_saver') },
      },
      {
        text: 'Keep working — later is not now',
        tag: null,
        outcome: 'A reasonable choice, given the arithmetic. You work.',
        effect: (p) => { p.setMem('informalMidlifeAck', true); p.m -= 3 },
      },
    ],
    effect: null,
  },

]
