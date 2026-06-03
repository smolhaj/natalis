// events_followthrough_10.js
// Follow-through events for 7 orphaned flags identified by check-flags:
//   ofw_gulf, ofw_hongkong, ofw_italy — destination-specific OFW texture
//   ofw_runaway — fled employer, aftermath
//   ofw_broker_debt — borrowed to pay agency fee, paying it off
//   intellectual_target — Algeria journalist/artist targeted by GIA or state
//   decennie_noire_memory — late-life reckoning with the Black Decade impunity

export const FOLLOWTHROUGH_10_EVENTS = [

  // ── OFW GULF: texture during stay ──────────────────────────────────────────
  {
    id: 'ft10_ofw_gulf_passport',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('ofw_gulf') &&
      !G.flags.has('ofw_returned') &&
      !G.mem?.ft10GulfPassport &&
      G.age >= 22 && G.age <= 50,
    text: 'Your employer keeps your passport in a drawer in the main house. You have been told this is normal — for safekeeping, they said, smiling. You believe it is normal because everyone you know here says the same thing. What you notice is that you feel the difference between your passport being in your bag and your passport being in someone else\'s drawer. The feeling has no name. You learn not to mention it in the Sunday calls home.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.addFlag('kafala_documented')
      p.setMem('ft10GulfPassport', true)
    },
  },

  {
    id: 'ft10_ofw_gulf_rest_day',
    phase: null,
    weight: 3,
    cooldown: 5,
    when: (G) =>
      G.flags.has('ofw_gulf') &&
      !G.flags.has('ofw_returned') &&
      G.age >= 22 && G.age <= 50,
    text: 'Your contract says one rest day a week. In practice the house needs you, and the family does not observe Sundays. On the days you do get out you walk to the compound where the others gather — women from home, from Sri Lanka, from Ethiopia, from Indonesia, all wearing the same careful posture of people who are being watched even when they are not. Someone has brought a box of leche flan wrapped in plastic. Someone else has a phone with bad signal and you take turns trying to get through. The afternoon goes like this, and it is enough. It is not enough.',
    choices: null,
    effect: (p) => {
      p.s += 4
      p.m -= 3
    },
  },

  // ── OFW HONGKONG: Sunday texture ───────────────────────────────────────────
  {
    id: 'ft10_ofw_hongkong_victoria',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('ofw_hongkong') &&
      !G.flags.has('ofw_returned') &&
      !G.mem?.ft10HKVictoria &&
      G.age >= 22 && G.age <= 50,
    text: 'Sunday is yours, legally — Hong Kong mandates it and the employer knows. You go to Victoria Park with everyone else. The cardboard on the ground, the food in Tupperware passed around, the Tagalog that expands without the employer\'s hearing. Someone has a copy of a newspaper from home that is two weeks old. Someone else has brought a portable speaker. By early afternoon the park is so loud with a hundred small gatherings that you feel, briefly, like you are somewhere else entirely — not the park but the country the park has become for a few hours every Sunday.',
    choices: null,
    effect: (p) => {
      p.m += 6
      p.s += 3
      p.setMem('ft10HKVictoria', true)
    },
  },

  {
    id: 'ft10_ofw_hongkong_rights',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('ofw_hongkong') &&
      !G.flags.has('ofw_returned') &&
      !G.mem?.ft10HKRights &&
      G.currentYear >= 2019 &&
      G.age >= 22 && G.age <= 55,
    text: 'The protests fill the streets on your one day off. You watch from the edge — you have papers here, a contract, and you cannot afford to be swept up in something. But you watch. The young people with umbrellas and hard hats, the specific courage of people who are being photographed by the state and know it. You are not a citizen of this place. The things they are trying to hold onto are things that also protect you, in ways the protest organizers are probably not thinking about. You go back to the flat before dark.',
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.karma += 6
      p.setMem('ft10HKRights', true)
    },
  },

  // ── OFW ITALY: care work texture ───────────────────────────────────────────
  {
    id: 'ft10_ofw_italy_badante',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('ofw_italy') &&
      !G.flags.has('ofw_returned') &&
      !G.mem?.ft10ItalyBadante &&
      G.age >= 22 && G.age <= 55,
    text: 'You are called a *badante* here — a carer. The old woman you look after is ninety-one and has been a widow for twenty years and does not always know where she is, but she knows you. She calls you by a name that is not yours, which was the name of someone who worked here before. You have stopped correcting her. Her daughter visits on Saturdays and looks at you with a complicated expression that you have learned to read as gratitude and guilt in equal measure, which is also what you feel about being here at all. You write home about the apartment, the food, the good coffee. You do not write about the name she calls you.',
    choices: null,
    effect: (p) => {
      p.m -= 5
      p.s += 3
      p.e += 4
      p.addFlag('care_work_done')
      p.setMem('ft10ItalyBadante', true)
    },
  },

  {
    id: 'ft10_ofw_italy_community',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('ofw_italy') &&
      !G.flags.has('ofw_returned') &&
      !G.mem?.ft10ItalyCommunity &&
      G.age >= 22 && G.age <= 55,
    text: 'The church in the next town holds a Filipino mass on the second Sunday of each month. You go when you can. The singing is in a language you dream in, and the priest is from Cebu, and someone always brings pansit in a pot that gets passed around afterward in the car park. You have found the person who handles the remittance service and the person who knows which agency to avoid and the person who was here fifteen years ago and will tell you, quietly, what happens to people who do not keep their papers in order. The community has its own knowledge economy. You learn it fast.',
    choices: null,
    effect: (p) => {
      p.m += 7
      p.s += 4
      p.setMem('ft10ItalyCommunity', true)
    },
  },

  // ── OFW RUNAWAY: aftermath of fleeing employer ──────────────────────────────
  {
    id: 'ft10_ofw_runaway_shelter',
    phase: null,
    weight: 5,
    when: (G) =>
      G.flags.has('ofw_runaway') &&
      !G.flags.has('ofw_returned') &&
      !G.mem?.ft10RunawayShelter,
    text: 'The shelter is run by a Filipino organization that has seen this before. They have a protocol: document everything, change your SIM card, do not go back to the old neighbourhood. A woman behind a desk takes down your employer\'s name without looking surprised, which is either reassuring or not. You are not undocumented — technically — but your contract was with an employer who no longer has you, which puts you in a category that the embassy describes as \'complex\'. You wait. You fill out forms. You call home and say things are fine because they are fine, in the sense that you are safe, which is not the same as fine.',
    choices: [
      {
        text: 'Focus on finding a new legitimate placement',
        tag: null,
        outcome: 'The agency takes six weeks and a fee you can barely cover. The new employer is in a different neighbourhood. You start again.',
        effect: (p) => { p.m -= 5; p.addFlag('ofw_new_placement'); p.setMem('ft10RunawayShelter', true) },
      },
      {
        text: 'Work informally while sorting out your status',
        tag: null,
        outcome: 'You clean houses for cash. It pays more per hour and carries different risks. You keep moving.',
        effect: (p) => { p.mo += 400; p.addFlag('informal_abroad'); p.setMem('ft10RunawayShelter', true) },
      },
    ],
  },

  {
    id: 'ft10_ofw_runaway_long',
    phase: null,
    weight: 3,
    when: (G) =>
      G.flags.has('ofw_runaway') &&
      !G.mem?.ft10RunawayLong &&
      G.age >= 30,
    text: 'Years later, the month you ran is still the month you are clearest about. Everything else — contracts, employers, cities — has blurred a little. That month is specific. The number of nights in the shelter, the name of the woman who did the intake paperwork, the pattern on the ceiling. Memory is strange: it keeps what it needs and not what you would choose.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.m -= 3
      p.karma += 5
      p.setMem('ft10RunawayLong', true)
    },
  },

  // ── OFW BROKER DEBT: paying down the structural trap ───────────────────────
  {
    id: 'ft10_ofw_broker_debt_monthly',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('ofw_broker_debt') &&
      !G.flags.has('ofw_broker_paid') &&
      !G.mem?.ft10BrokerDebtMonthly &&
      G.age >= 22 && G.age <= 45,
    text: 'Before you send money home you send money to the loan. The arrangement was explained to you as temporary — a few months of remittances and the fee is settled. What the broker did not explain was the interest, which recalculates in ways that are legal but not easy to follow. You have started keeping a notebook. Each month you write the amount still owed. The number goes down. It goes down very slowly. You learn, in this way, what thirty percent per annum means from the inside.',
    choices: null,
    effect: (p) => {
      p.mo -= 600
      p.e += 3
      p.setMem('ft10BrokerDebtMonthly', true)
    },
  },

  {
    id: 'ft10_ofw_broker_paid_off',
    phase: null,
    weight: 5,
    when: (G) =>
      G.flags.has('ofw_broker_debt') &&
      !G.flags.has('ofw_broker_paid') &&
      !G.mem?.ft10BrokerPaidOff &&
      G.age >= 24,
    text: 'The notebook shows zero. You have paid back the agency fee, the interest on the agency fee, and what the lender called \'administrative costs\' which you now understand is a word for a number they add when they want to. You close the notebook. You do not celebrate because the money that went to the loan was money that could have gone home, and you think about this in a way that isn\'t productive. But zero is zero. You send an extra two thousand pesos home this month and don\'t explain why.',
    choices: null,
    effect: (p) => {
      p.m += 10
      p.karma += 8
      p.addFlag('ofw_broker_paid')
      p.setMem('ft10BrokerPaidOff', true)
    },
  },

  // ── INTELLECTUAL_TARGET: Algeria — living after being named ────────────────
  {
    id: 'ft10_intellectual_target_midlife',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.flags.has('intellectual_target') &&
      !G.mem?.ft10IntellectualTargetMidlife &&
      G.age >= 35,
    text: (G) => {
      const inExile = G.flags.has('algeria_exile') || G.flags.has('emigrated')
      if (inExile) {
        return 'You read about the men who drew up the lists. Some have had their sentences reduced under the amnesty provisions. One has become a local official in a town east of Oran. You find this out through someone who still knows someone. You sit with the information for several days. There is nothing to do with it. That is the specific nature of impunity — it gives you something to know and nowhere to put it.'
      }
      return 'The years of it are over. The people who came for journalists and teachers and novelists are mostly out of the hills or dead or in government — that last one still surprises you, though it shouldn\'t. You have been asked, more than once, to write about that period. You have started and stopped four times. The problem is not the words. The problem is the question of who the words are for.'
    },
    choices: null,
    effect: (p) => {
      p.r += 8
      p.m -= 5
      p.karma += 6
      p.addFlag('intellectual_target_reckoned')
      p.setMem('ft10IntellectualTargetMidlife', true)
    },
  },

  {
    id: 'ft10_intellectual_target_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('intellectual_target') &&
      G.flags.has('intellectual_target_reckoned') &&
      !G.mem?.ft10IntellectualTargetLate &&
      G.age >= 60,
    text: 'A student finds you. They are writing a thesis on the cultural production of the 1990s — the work that survived the decade, the writers who didn\'t. They ask careful questions. You are surprised by how much you remember and how specifically you remember it. Not the fear, exactly, which has faded to something you can look at. The specific objects: which window you worked beside, the generator noise, the hours you kept. You talk for two hours. The student types everything. You feel, afterward, something you don\'t have a word for — not healing, not resolution, something more like being a record that has been read.',
    choices: null,
    effect: (p) => {
      p.m += 8
      p.karma += 10
      p.setMem('ft10IntellectualTargetLate', true)
    },
  },

  // ── DECENNIE_NOIRE_MEMORY: echo in daily life ──────────────────────────────
  {
    id: 'ft10_decennie_noire_echo',
    phase: null,
    weight: 3,
    cooldown: 8,
    when: (G) =>
      G.flags.has('decennie_noire_memory') &&
      G.age >= 45,
    text: (G) => {
      const inExile = G.flags.has('algeria_exile') || G.flags.has('emigrated')
      if (inExile) {
        return 'Something in the news — a checkpoint, a disappearance, a government that says it is restoring order — and the decade comes back in a particular way. Not as memory exactly. As a reflex. Your body remembers before your mind does: the small adjustment, the checking of exits, the calculation of who is in the room and what they know. You have been here thirty years. The reflex is still from there.'
      }
      return 'The decade is not discussed in the way you might expect. People who lived through it know which conversations to have and which to let settle. The younger ones sometimes ask. You answer partially, which is the only way to answer. Fully would take more than they are ready to hold, and you have learned to be careful with the weight of it.'
    },
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 3
    },
  },
]
