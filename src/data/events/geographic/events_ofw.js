// events_ofw.js — Philippines OFW (Overseas Filipino Worker) arc
// The worker/parent perspective: decision, departure, first year abroad,
// complications, return, and the long follow-through.
//
// The children's perspective (raised by grandparents, birthday calls, packages,
// the reunion with a stranger) is handled in events_children_abroad.js.
// This file covers what happens on the other side of the flight.
//
// Existing event cc_domestic_ofw_gulf in events_crosscutting.js covers the
// texture of being inside the Gulf employer's house with passport held. These
// events complement that: the decision arc, POEA process, arrival moment,
// complications, the return, and the long reckoning.
//
// Guard format: G.character.country?.name === 'Philippines' throughout.
// Destination-specific events gate on mem.ofwDestination ('gulf'|'hongkong'|'italy'|'other').
// The emigrated flag is set at POEA signing so integration events fire correctly.
//
// ── FOLLOW-THROUGH EVENTS (written first per design rule) ─────────────────────
//
// ofw_late_reckoning   — late_life 65+, after return: what it cost
// ofw_cycle_repeating  — midlife, when own child considers leaving
// ofw_cost_accounting  — young_adult, the arithmetic of absence

export const OFW_EVENTS = [

  // ── FOLLOW-THROUGH: LATE RECKONING (late_life, fires once) ────────────────
  {
    id: 'ofw_late_reckoning',
    phase: 'late_life',
    weight: 5,
    when: (G) =>
      !G.mem?.ofwLateReckoning &&
      G.flags.includes('ofw_returned') &&
      G.age >= 65,
    text: 'A grandchild is drawing at your feet. The house you built with the money is solid — concrete, not wood, with a gate and a second floor that took three contracts to finish. You think about the years. You count them the way you count money: how many birthdays you missed, how many illnesses you heard about by phone, what your child looked like at fifteen versus what you saw in photographs. The house is here. The years are also here, in a different way. You do not regret it. You regret it completely. Both are true and you have stopped trying to resolve them.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 10; p.karma += 12; p.addFlag('ofw_reckoned'); p.setMem('ofwLateReckoning', true) },
  },

  // ── FOLLOW-THROUGH: THE CYCLE REPEATING (midlife, fires once) ─────────────
  {
    id: 'ofw_cycle_repeating',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      !G.mem?.ofwCycleReckoning &&
      G.flags.includes('ofw_returned') &&
      G.children.length > 0 &&
      G.age >= 38 && G.age <= 58,
    text: 'Your child tells you they are looking at an agency. The same word — agency. You know what the contract will say about days off. You know what will not be in the contract. You think about saying this. Instead you ask which country. They say the name of a country. You say: take the POEA-certified one. You say: call me every Sunday without fail. You do not say what you are not saying, which is everything else — the specific weight of a Sunday when the phone does not ring, the way a person can be very far away and still the nearest thing.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 8; p.karma += 6; p.addFlag('ofw_cycle_witness'); p.setMem('ofwCycleReckoning', true) },
  },

  // ── FOLLOW-THROUGH: COST ACCOUNTING (young_adult, fires once) ─────────────
  {
    id: 'ofw_cost_accounting',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem?.ofwCostAccounting &&
      G.flags.includes('ofw_returned') &&
      G.age >= 24 && G.age <= 34,
    text: 'You sit with a piece of paper the way your mother sat with the monthly budget. On one side: the house, the tuition paid in full, the refrigerator, the siblings who finished school. On the other side: things that do not have prices. The paper is a useful lie. It does not balance and you know it does not balance, but the exercise is something — proof, maybe, that the years meant something other than just the years.',
    choices: [
      {
        text: 'You fold it and put it away. Some things are not for paper.',
        tag: null,
        outcome: 'The accounting stays unfinished. That feels right.',
        effect: (p) => { p.m += 3; p.r += 6; p.setMem('ofwCostAccounting', true) },
      },
      {
        text: 'You add it up anyway. You need to know the number.',
        tag: null,
        outcome: 'The number is large. The other column has no number. You write both.',
        effect: (p) => { p.e += 3; p.r += 8; p.karma += 4; p.setMem('ofwCostAccounting', true) },
      },
    ],
    effect: null,
  },

  // ── PHASE 4: RETURN (midlife or late young_adult) ─────────────────────────

  {
    id: 'ofw_return_stranger',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      !G.mem?.ofwReturnStranger &&
      G.flags.includes('ofw_worker') &&
      !G.flags.includes('ofw_returned') &&
      G.age >= 32 && G.age <= 55,
    text: 'You are home. The house is finished — you built it floor by floor from abroad and now you are inside it. Your youngest does not run to you. They stand a little back, watching. Someone told you this might happen. You were not prepared for it. In the evening your mother makes the food you asked for in the last call and you eat it at the table of the house you paid for and you are a guest at your own table, in the best possible way and in the most difficult possible way.',
    choices: [
      {
        text: 'You make a point of being present in every ordinary thing.',
        tag: null,
        outcome: 'It takes months. The distance closes slowly, then all at once.',
        effect: (p) => { p.m += 8; p.karma += 6; p.addFlag('ofw_returned'); p.setMem('ofwReturnStranger', true) },
      },
      {
        text: 'You give them space. You trust the house to speak for you.',
        tag: null,
        outcome: 'The house is solid. The relationship rebuilds at its own pace.',
        effect: (p) => { p.m += 4; p.r += 5; p.addFlag('ofw_returned'); p.setMem('ofwReturnStranger', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ofw_contract_renewal',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.ofwContractRenewal &&
      G.flags.includes('ofw_worker') &&
      !G.flags.includes('ofw_returned') &&
      G.age >= 26 && G.age <= 45 &&
      G.currentYear >= 1985,
    text: 'The contract is finished. They ask if you want to renew. The salary is the same; they know you will say yes because the salary is why you are here. At home your child started secondary school this year and the fees are a number you know exactly. You call and talk about the school. You do not talk about the renewal because you already know what you will say.',
    choices: [
      {
        text: 'Sign the renewal. One more year.',
        tag: null,
        outcome: 'One more year becomes a plan. The plan becomes a life.',
        effect: (p) => { p.m -= 5; p.mo += 3500; p.karma += 4; p.addFlag('ofw_long_contract'); p.setMem('ofwContractRenewal', true) },
      },
      {
        text: 'Negotiate for better terms before signing.',
        tag: null,
        outcome: 'They offer a small raise. You sign. It was worth trying.',
        effect: (p) => { p.m -= 3; p.mo += 4500; p.e += 2; p.setMem('ofwContractRenewal', true) },
      },
      {
        text: 'Tell them no. It is time to go home.',
        tag: null,
        outcome: 'You book the ticket. The decision has a weight that is also a relief.',
        effect: (p) => { p.m += 10; p.addFlag('ofw_returned'); p.setMem('ofwContractRenewal', true) },
      },
    ],
    effect: null,
  },

  // ── PHASE 3: COMPLICATIONS ────────────────────────────────────────────────

  {
    id: 'ofw_contract_violation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem?.ofwContractViolation &&
      G.flags.includes('ofw_worker') &&
      G.currentYear >= 1985 &&
      G.age >= 22 && G.age <= 45,
    text: (G) => {
      const dest = G.mem?.ofwDestination || 'gulf'
      if (dest === 'gulf') {
        return 'The contract said six days. They say seven. When you ask about the rest day, the employer says: if you want the day off, we can end the arrangement. The agency that placed you is in Manila. OWWA has an office here but you do not know what it will cost you to walk in — the employer knows people, and your passport is in his drawer.'
      } else if (dest === 'hongkong') {
        return 'She docks your pay for the month the daughter was sick and required extra care. The contract does not allow this. You know the contract. She knows you know. She says you can file a complaint if you want. The POEA is in the Philippines. You have seven months left on the contract and a tuition payment due in March.'
      } else {
        return 'The terms you were promised did not survive the trip. The hours are longer than the contract, the accommodation is a room you share with someone else, and the agency fee you paid is not refundable. You are calculating: if you go home now, you leave with nothing. If you stay, you leave with something. You stay.'
      }
    },
    choices: [
      {
        text: 'Document it and report to OWWA.',
        tag: null,
        outcome: 'The complaint goes in. The process is slow. The employer is careful after that.',
        effect: (p) => { p.m -= 5; p.e += 4; p.karma += 8; p.addFlag('ofw_reported_violation'); p.setMem('ofwContractViolation', true) },
      },
      {
        text: 'Endure it. You need the money and the situation could become worse.',
        tag: null,
        outcome: 'You learn the cost of quiet. The money arrives home on schedule.',
        effect: (p) => { p.m -= 12; p.r += 8; p.mo += 1500; p.setMem('ofwContractViolation', true) },
      },
      {
        text: 'Quietly find another employer through a contact you trust.',
        tag: null,
        outcome: 'It takes six weeks. The new arrangement is better. You do not think about what you risked.',
        effect: (p) => { p.m += 2; p.s += 3; p.addFlag('ofw_runaway'); p.setMem('ofwContractViolation', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ofw_sunday_call',
    phase: 'young_adult',
    weight: 5,
    cooldown: 3,
    when: (G) =>
      G.flags.includes('ofw_worker') &&
      !G.flags.includes('ofw_returned') &&
      G.age >= 22 && G.age <= 50 &&
      G.currentYear >= 1985,
    text: (G) => {
      const dest = G.mem?.ofwDestination || 'gulf'
      const hasChild = G.children && G.children.length > 0
      const hasPartner = G.partner !== null
      if (G.currentYear < 2000) {
        if (hasChild && hasPartner) {
          return 'Sunday. The call costs by the minute so you speak quickly. Your partner tells you the price of rice has gone up. Your child tells you about a dog they saw. You ask questions to make the call longer. When you say goodbye you sit in the room for a while before going back to the rest of the day.'
        } else if (hasChild) {
          return 'Sunday. The call goes to your mother\'s house, where your child is staying. You can hear them in the background before they come to the phone. You ask about school. They say fine. They say fine to everything. You are not sure what fine means from there.'
        } else {
          return 'Sunday. The call goes through after three tries. You talk about home — who got married, what the weather is, whether the mango tree is fruiting. The ordinary news of a place you are not in.'
        }
      } else {
        if (hasChild) {
          return 'Sunday. You call on video. Your child holds the phone at the wrong angle — you can see the ceiling and hear them. You say: hold it up. They hold it up. They are taller than the last time you saw them in person. You note this but you do not say it. You ask about school. You say goodbye. You remain in the feeling of the goodbye for the rest of the afternoon.'
        } else {
          return 'Sunday. The video call connects and you see the living room, the curtain you chose when you ordered things from abroad, your mother in her chair. Everything is familiar and everything is slightly wrong — the wrong time of day, the wrong light, yourself in a small square in the corner of the screen.'
        }
      }
    },
    choices: null,
    effect: (p) => { p.m -= 6; p.karma += 3 },
  },

  {
    id: 'ofw_balikbayan_box',
    phase: 'young_adult',
    weight: 4,
    cooldown: 4,
    when: (G) =>
      G.flags.includes('ofw_worker') &&
      !G.flags.includes('ofw_returned') &&
      G.age >= 22 && G.age <= 50 &&
      G.currentYear >= 1985,
    text: 'The box takes a month to arrive. You sent: the brand of shampoo your mother likes that you cannot get there anymore, a jacket for your child two sizes larger than they are now (they will grow into it, you calculated), chocolates in a flavor you can find here but not there, a watch for your partner, two pairs of shoes, vitamins. The box is not a box. The box is what you are saying when there is no call scheduled and no money to send and the distance has no other vocabulary. You sealed it and watched the forwarder load it onto a truck and then it was gone and you were still here.',
    choices: null,
    effect: (p) => { p.m += 4; p.m -= 2; p.mo -= 800; p.karma += 8; p.addFlag('balikbayan_sender') },
  },

  // ── PHASE 2: FIRST YEAR ABROAD ────────────────────────────────────────────

  {
    id: 'ofw_arrival_gulf',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      !G.mem?.ofwArrival &&
      G.flags.includes('ofw_worker') &&
      G.mem?.ofwDestination === 'gulf' &&
      G.age >= 20 && G.age <= 40 &&
      G.currentYear >= 1980,
    text: 'At the airport a man in a uniform takes your passport. He does this without explanation in the way that things are done here without explanation. Your agency contact said this would happen — passport processing, they called it. You know the other name. The room you are given is small and shared. The first night you lie awake listening to the air conditioning unit and calculating: four months to send the money you promised, nine months to cover the first year of tuition, two years if everything goes to plan. The heat outside is like a wall you were not prepared for.',
    choices: null,
    effect: (p) => { p.m -= 18; p.h -= 5; p.addFlag('ofw_passport_held'); p.setResidency('work_visa'); p.setMem('ofwArrival', true) },
  },

  {
    id: 'ofw_arrival_hongkong',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      !G.mem?.ofwArrival &&
      G.flags.includes('ofw_worker') &&
      G.mem?.ofwDestination === 'hongkong' &&
      G.age >= 20 && G.age <= 40 &&
      G.currentYear >= 1975,
    text: 'The contract allows Sundays off. This is the fact you repeat to yourself on the first week when the Sundays do not feel like Sundays. On your first actual day off you take the bus to Victoria Park. There are hundreds of women there — Filipino, Indonesian, Thai — sitting on flattened cardboard, sharing food from containers, speaking languages that arrive in waves. You find a woman from Batangas. She shows you which bus to take and which employer is worth asking, and which agency is known for padding fees. By four in the afternoon you have more information than three months of worrying gave you. You take the same bus home.',
    choices: null,
    effect: (p) => { p.m -= 8; p.s += 5; p.e += 3; p.setResidency('work_visa'); p.addFlag('ofw_hongkong'); p.setMem('ofwArrival', true) },
  },

  {
    id: 'ofw_arrival_italy',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem?.ofwArrival &&
      G.flags.includes('ofw_worker') &&
      G.mem?.ofwDestination === 'italy' &&
      G.age >= 20 && G.age <= 40 &&
      G.currentYear >= 1990,
    text: 'The family is kind. This is the sentence you will use when you call home and you know it is true and you also know it is not the whole sentence. The apartment has a room that is yours, with a window. The grandmother calls you by a shortened version of your name that is not your name. The food is not difficult to cook — they show you, patiently, and you write it in a small notebook. On Sunday afternoons you go to the Filipino community center near the station. You eat food from home and speak in Tagalog and for a few hours the Italian disappears and you are yourself without translation.',
    choices: null,
    effect: (p) => { p.m -= 5; p.s += 4; p.e += 5; p.setResidency('work_visa'); p.addFlag('ofw_italy'); p.setMem('ofwArrival', true) },
  },

  {
    id: 'ofw_remittance_ritual',
    phase: 'young_adult',
    weight: 5,
    cooldown: 5,
    when: (G) =>
      G.flags.includes('ofw_worker') &&
      !G.flags.includes('ofw_returned') &&
      G.age >= 20 && G.age <= 50 &&
      G.currentYear >= 1980,
    text: (G) => {
      const year = G.currentYear
      if (year < 1995) {
        return 'The money goes through the remittance office near the market. You have the recipient name memorised — your mother, your partner, whichever arrangement your family settled on. The fee is a percentage you have stopped calculating because calculating it changed nothing. The slip they give you is your only receipt. You fold it and put it in an envelope and send it home because your mother asked once to see the slips. She keeps them somewhere. You do not know why and you did not ask.'
      } else if (year < 2010) {
        return 'You send through Western Union. The fee is fourteen percent for the first five years and then you find a smaller operator who charges nine and you switch. The money arrives in three business days. Your partner confirms it by text. You have learned to live on what is left after the remittance — the remittance is not negotiable; what you eat for dinner is.'
      } else {
        return 'The app now. Faster, cheaper, and you can see when it arrives on your phone. You send every month on the fifteenth, which is payday minus four days of margin. The amount is fixed. Some months you add a little. Some months you cannot. The months you cannot, you do not call until the transfer goes through because the call and the absence of money in the same moment is a combination you avoid.'
      }
    },
    choices: null,
    effect: (p) => { p.m -= 4; p.mo -= 1200; p.karma += 5 },
  },

  // ── PHASE 1: THE DECISION ARC ─────────────────────────────────────────────

  {
    id: 'ofw_family_conference',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem?.ofwFamilyConference &&
      G.character.country?.name === 'Philippines' &&
      !G.flags.includes('ofw_worker') &&
      !G.flags.includes('emigrated') &&
      G.currentYear >= 1975 &&
      G.age >= 19 && G.age <= 38,
    text: 'The family conference happens on a Sunday after lunch, which is the only way serious things happen in your family — announced quietly after the dishes are done, with everyone still at the table. Someone says the word abroad. Nobody disagrees about the need. The disagreement is about who, and everyone knows who it has to be. Your mother does not say: don\'t go. She says: if you go, go through POEA. She has a cousin who went through an agency that charged three times the legal cap. She says: get everything in writing. She has been thinking about this longer than the conversation.',
    choices: [
      {
        text: 'Say yes. You will start the application.',
        tag: null,
        outcome: 'The table is quiet after. Your mother starts washing up. The decision has been made.',
        effect: (p) => { p.addFlag('ofw_considering'); p.setMem('ofwFamilyConference', true) },
      },
      {
        text: 'Ask for more time to think.',
        tag: null,
        outcome: 'They give you the month. The numbers on the table do not change.',
        effect: (p) => { p.addFlag('ofw_considering'); p.r += 3; p.setMem('ofwFamilyConference', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ofw_broker_fee',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem?.ofwBrokerFee &&
      G.character.country?.name === 'Philippines' &&
      G.flags.includes('ofw_considering') &&
      !G.flags.includes('ofw_worker') &&
      G.currentYear >= 1975 &&
      G.age >= 19 && G.age <= 40,
    text: (G) => {
      const year = G.currentYear
      const hasGoodIncome = G.money > 4000
      if (hasGoodIncome) {
        return 'The agency fee is legitimate — POEA-certified, within the cap. You can cover it from savings. The process takes four months: medical clearance, document authentication, pre-departure orientation. The orientation is a room of forty people listening to a civil servant explain the Migrant Workers Act. Everyone in the room already knows they are going.'
      } else {
        return 'The agency fee is more than you have. You borrow from your mother\'s tanda, from a cousin in Cavite, from a cooperative that charges one-point-eight percent monthly. The debt means you are committed before you leave — you are already working off a balance when you step onto the plane. The agency representative says: don\'t worry, you\'ll earn it back in three months. He says this to everyone.'
      }
    },
    choices: [
      {
        text: 'Pay the fee and trust the POEA-certified process.',
        tag: null,
        outcome: 'The paperwork is correct. The contract is standard. This is the best available version.',
        effect: (p) => { p.mo -= 2500; p.e += 2; p.setMem('ofwBrokerFee', true) },
      },
      {
        text: 'Take out a loan to cover it. The math works if the contract holds.',
        tag: null,
        outcome: 'The debt is real. The contract is real. You board the plane with both.',
        effect: (p) => { p.mo -= 2500; p.addFlag('ofw_broker_debt'); p.setMem('ofwBrokerFee', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ofw_poea_signing',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      !G.mem?.ofwPoeaSigning &&
      G.character.country?.name === 'Philippines' &&
      G.flags.includes('ofw_considering') &&
      !G.flags.includes('ofw_worker') &&
      G.currentYear >= 1975 &&
      G.age >= 19 && G.age <= 42,
    text: (G) => {
      const destinations = ['gulf', 'hongkong', 'italy', 'other']
      // destination determined by archetype/year probabilities baked into text
      const year = G.currentYear
      let destText = ''
      if (year >= 1975 && year < 1990) {
        destText = 'Saudi Arabia'
      } else if (year >= 1990 && year < 2005) {
        destText = 'Hong Kong'
      } else {
        destText = 'abroad'
      }
      return `The contract is twelve pages. The civil servant at the POEA office explains the key clauses in the order printed. You sign where indicated. Your departure date is in six weeks. There is a moment — between the last signature and the folder closing — when the life you are leaving becomes specific: the breakfast table, the smell of the street after rain, the particular quality of morning in your parents\' house. Then the folder closes and the civil servant says: good luck, and the next person sits down.`
    },
    choices: [
      {
        text: 'Gulf (Saudi Arabia, UAE, Kuwait, Qatar)',
        tag: 'gulf',
        outcome: 'The contract names an employer in the Gulf. The work is domestic. The salary is fixed.',
        effect: (p) => {
          p.addFlag('ofw_worker')
          p.addFlag('emigrated')
          p.addFlag('ofw_gulf')
          p.setResidency('work_visa')
          p.setMem('ofwDestination', 'gulf')
          p.setMem('ofwPoeaSigning', true)
          p.m -= 10
          p.karma += 5
        },
      },
      {
        text: 'Hong Kong or Singapore',
        tag: 'hongkong',
        outcome: 'The contract names a family in Hong Kong. Sundays are specified as rest days.',
        effect: (p) => {
          p.addFlag('ofw_worker')
          p.addFlag('emigrated')
          p.addFlag('ofw_hongkong')
          p.setResidency('work_visa')
          p.setMem('ofwDestination', 'hongkong')
          p.setMem('ofwPoeaSigning', true)
          p.m -= 8
          p.karma += 5
        },
      },
      {
        text: 'Italy or another EU country',
        tag: 'italy',
        outcome: 'The contract is for care work with an elderly family in Rome. The salary is higher.',
        effect: (p) => {
          p.addFlag('ofw_worker')
          p.addFlag('emigrated')
          p.addFlag('ofw_italy')
          p.setResidency('work_visa')
          p.setMem('ofwDestination', 'italy')
          p.setMem('ofwPoeaSigning', true)
          p.m -= 6
          p.karma += 5
        },
      },
    ],
    effect: null,
  },

]
