// Bangladesh arc events
//
// Bangladesh's story is unlike any other:
//  — The Liberation War 1971: nine months of Pakistani army atrocities against its own
//    Bengali citizens; up to 3 million dead, 200,000–400,000 women raped; 10 million
//    refugees to India. The war ended December 16, 1971 — Victory Day — when 93,000
//    Pakistani soldiers surrendered to Indian-Mukti Bahini joint command.
//  — The Bhola cyclone 1970: up to 500,000 dead — the deadliest tropical cyclone in
//    recorded history. Pakistan's inadequate response accelerated the independence movement.
//  — The 1974 famine: 1–1.5 million died of starvation the year after independence,
//    in a free country whose government could not manage the crisis.
//  — Mujib assassination 1975: Sheikh Mujibur Rahman — Bangabandhu, "friend of Bengal,"
//    father of the nation — killed in a military coup with most of his family.
//  — Garment economy: 4 million workers, 80% women, producing 85% of Bangladesh's
//    export earnings. Rana Plaza collapsed April 24, 2013, killing 1,134 people.
//  — Grameen Bank: Muhammad Yunus's microloan model, 1983 — the idea that poor women
//    are creditworthy if given small loans with group accountability.
//  — Student uprising 2024: protests against civil service quota system turned mass
//    uprising; Sheikh Hasina fled; military took power; democracy in flux.

import { hasTech } from '../../technology.js'

const BANGLADESH_EVENTS = [

  // ── BHOLA CYCLONE SHADOW ─────────────────────────────────────────────────────

  {
    id: 'bng_bhola_shadow',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1970 && G.currentYear <= 1980 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.bng_bhola,
    text: 'November 1970, and the cyclone comes ashore at night on the low islands of the coast, and hundreds of thousands die. The help from West Pakistan is too slow, too small, too indifferent. Your family has lost someone, or knows someone who lost everyone. The anger is in the newspapers before the dead are: they do not govern us because they do not think of us as the same as them.',
    choices: null,
    effect: (p) => { p.m -= 6; p.h -= 3; p.addFlag('bng_cyclone_generation'); p.setMem('bng_bhola', true); },
  },

  // ── LIBERATION WAR 1971 ───────────────────────────────────────────────────────

  {
    id: 'bng_liberation_war_1971',
    phase: null,
    weight: 7,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1971 && G.currentYear <= 1973 &&
      G.age >= 15 &&
      !G.mem?.bng_liberation,
    text: (G) => {
      const age = G.age
      return age >= 20
        ? 'Operation Searchlight begins at midnight in Dhaka: the University, the Hindu neighbourhoods, the police barracks, then the rest of the country. For nine months the Mukti Bahini fight from the countryside and from India, and you know people who joined them and people who did not come back. On December 16 the Pakistani army surrenders and the country is free. Nobody agrees how many died, and no count is wrong in the way that matters.'
        : 'The war is nine months of your adolescence. The army comes to your area or it comes close. Your family moves, or hides, or keeps going to work because stopping would attract attention. The Mukti Bahini fighters — some of them boys not much older than you — move through at night. December 16: the Pakistani army surrenders. This is Victory Day. You will remember where you were when you heard.'
    },
    context: 'The Pakistani army began Operation Searchlight on 25-26 March 1971. About 93,000 Pakistani soldiers surrendered on 16 December 1971. Estimates of the dead range from several hundred thousand to three million.',
    choices: [
      {
        text: 'You join the Mukti Bahini or work for the resistance in whatever way your age allows',
        tag: null,
        outcome: 'Joi Bangla. The country that emerges from the war carries its fighters in a relationship to what they did and what it cost. You are in that relationship now.',
        effect: (p) => { p.s += 4; p.h -= 5; p.addFlag('bng_mukti_bahini'); p.addFlag('bng_liberation_generation'); p.setMem('bng_liberation', true); },
      },
      {
        text: 'You survive the war — nine months of evasion, silence, and watching',
        tag: null,
        outcome: 'Survival is its own form of the war. December 16 arrives and the country is free and you are alive in it. What was asked of you and what you did are the private accounting.',
        effect: (p) => { p.r += 6; p.m -= 6; p.addFlag('bng_liberation_generation'); p.setMem('bng_liberation', true); },
      },
    ],
    effect: null,
  },

  // ── FAMINE AFTER INDEPENDENCE ─────────────────────────────────────────────────

  {
    id: 'bng_1974_famine',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1974 && G.currentYear <= 1976 &&
      G.age >= 20 &&
      !G.mem?.bng_famine,
    text: 'Three years after independence, and the floods, and the food aid that is there and does not reach. The new state does not have the machinery to move it, and it does not move fast enough. Bangabandhu, the man of the March 7 speech, is in the palace, and in the countryside people are dying. The distance between those two facts is what the famine leaves behind as politics.',
    context: 'The Bangladesh famine of 1974 killed an estimated several hundred thousand to 1.5 million people.',
    choices: null,
    effect: (p) => { p.m -= 8; p.h -= 5; p.addFlag('bng_famine_generation'); p.setMem('bng_famine', true); },
  },

  // ── MUJIB ASSASSINATION 1975 ──────────────────────────────────────────────────

  {
    id: 'bng_mujib_1975',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1975 && G.currentYear <= 1977 &&
      G.age >= 20 &&
      !G.mem?.bng_mujib,
    text: 'August 15, 1975, before dawn. Soldiers enter the president\'s house and kill Bangabandhu, the father of the nation, the voice of the March speech, with most of his family; his daughters are in Germany and live. Four years after nine months of war for freedom, the country is under military rule. The gap between what the war was for and what it produced is the politics of the next twenty years.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('bng_coup_generation'); p.setMem('bng_mujib', true); },
  },

  // ── CYCLONE AS ANNUAL CONDITION ───────────────────────────────────────────────

  {
    id: 'bng_cyclone_life',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1980 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.bng_cyclone_adult,
    text: (G) => {
      const yr = G.currentYear
      return yr < 1991
        ? 'The cyclone signal numbers on the radio in April and again in October. Signal seven, signal ten. Everyone on the coast knows what 1970 was and nobody talks about it in the season. The khatian — land registration document — is wrapped in plastic and kept high. The sea is the sea.'
        : yr < 2008
        ? 'April 1991, and the cyclone comes ashore at night with the sea six metres high behind it. You know which places were hit because you know people from them, and some you will not hear from again: Chittagong, Cox\'s Bazar, the islands. The land papers are somewhere in the mud. The response is faster than 1970, but the coast is still the coast and the sea is still the sea.'
        : yr <= 2010
        ? 'Sidr makes landfall November 15, 2007. Category 4. Three thousand dead. The number is lower than 1991 because the cyclone shelters were built and the evacuation system worked and the community knowledge was better. The number is still 3,000. The coast is still the coast. You watch the relief organizations arrive and know some of them and know the geography and the gap between the two.'
        : 'The cyclone warning system is sophisticated now. The shelters are concrete. The evacuation routes are trained into the communities. When the storms come — and they come every few years — the death toll is lower than anyone would have thought possible thirty years ago. The sea is also warmer than thirty years ago. The two facts are in the same sentence now.'
    },
    context: 'The 1991 Bangladesh cyclone killed about 138,000 people.',
    choices: null,
    effect: (p) => { p.h -= 4; p.r += 5; p.addFlag('bng_cyclone_survivor'); p.setMem('bng_cyclone_adult', true); },
  },

  // ── GARMENT FACTORY ───────────────────────────────────────────────────────────

  {
    id: 'bng_garment_worker',
    phase: null,
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1990 &&
      G.character.gender === 'female' &&
      G.age >= 18 && G.age <= 35 &&
      G.stats.wealth < 50 &&
      !G.mem?.bng_garment,
    text: 'The factory is on the seventh floor of a building in Ashulia, or Gazipur, or Mirpur. The shift is ten hours, or twelve if there is an order deadline. The wage is enough — enough meaning: you can eat and send money to your family in the village and rent half a room with two other women. The labels in the clothes say European names. The brands have codes of conduct about building safety. The building your floor is in was inspected. What the inspection found and what the inspector wrote are sometimes the same thing.',
    choices: [
      {
        text: 'The wage is real and the alternative is worse — you know what the village offers',
        tag: null,
        outcome: 'The factory economy lifted millions of women out of rural poverty and into urban wages. The wages are low and the conditions are what they are and the alternative is also what it is.',
        effect: (p) => { p.w += 4; p.e += 2; p.addFlag('bng_garment_generation'); p.setMem('bng_garment', true); },
      },
      {
        text: 'The building worries you — cracks appeared last week and the manager said it was fine',
        tag: null,
        outcome: (G) => (G.currentYear >= 2012 && G.currentYear <= 2014)
          ? 'Rana Plaza collapsed on April 24, 2013, the day after cracks appeared and workers were sent home and then ordered back. 1,134 people died. The order had a deadline. You got out.'
          : 'The cracks are patched over. The manager is right this time, or you are lucky, or both. You have heard what happened at other buildings that worried people and were not fixed.',
        effect: (p) => {
          p.h -= 3; p.r += 5; p.addFlag('bng_garment_generation'); p.setMem('bng_garment', true)
          if (p._state.currentYear >= 2012 && p._state.currentYear <= 2014) p.addFlag('rana_plaza_survived')
        },
      },
    ],
    effect: null,
  },

  // ── GRAMEEN BANK MICROLOAN ────────────────────────────────────────────────────

  {
    id: 'bng_grameen_loan',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1983 &&
      G.character.gender === 'female' &&
      G.age >= 20 && G.age <= 45 &&
      G.stats.wealth < 50 &&
      !G.mem?.bng_grameen,
    // The village phone ladies are a 1997 programme and mobile money later
    // still; the bank itself opened in 1983, and this was lending for a
    // handset in 1986.
    text: (G) => `The Grameen Bank offers small loans — taka amounts that the formal banking system would not consider — to women in rural groups who collectively guarantee each other's repayment. Muhammad Yunus's idea: poor women are creditworthy if you structure the loan correctly. The loan is for a sewing machine, or ${hasTech(G.currentCountry ?? G.character.country, 'mobile_phone', G.currentYear) ? 'a handset to rent calls out from' : 'a goat'}, or stock for a small shop. The group meets weekly. The repayment rate is ninety-eight percent. What it sometimes traps people in is also real.`,
    choices: [
      {
        text: 'You take the loan and build something small but yours',
        tag: null,
        outcome: 'The loan is repaid and another follows. The income is not large but it is yours, which it has never been before. The weekly meeting is also a social infrastructure.',
        effect: (p) => { p.e += 3; p.w += 4; p.mo += 500; p.addFlag('bng_microloan_generation'); p.setMem('bng_grameen', true); },
      },
      {
        text: 'The group pressure is another form of obligation you cannot afford to fail at',
        tag: null,
        outcome: 'The group accountability that produces a 98% repayment rate is experienced from inside as the weight of not failing in front of the women who vouched for you. The system works because of this weight.',
        effect: (p) => { p.r += 4; p.addFlag('bng_microloan_generation'); p.setMem('bng_grameen', true); },
      },
    ],
    effect: null,
  },

  // ── DHAKA RIVER OF PEOPLE ─────────────────────────────────────────────────────

  {
    id: 'bng_dhaka_city',
    phase: null,
    weight: 3,
    when: (G) =>
      G.age <= 49 &&
      G.character.country.name === 'Bangladesh' &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 2000 &&
      G.age >= 25 &&
      !G.mem?.bng_dhaka,
    text: 'Dhaka. Rickshaws, CNGs, buses that barely stop, and in July the flood water mid-thigh in the streets of Dhanmondi, the office workers holding their trousers up. The garment economy drew the country to the city and the city grew to hold it and is still growing, faster than any road or drain. In 1975 it was two million people. Nobody now is sure how many it is.',
    context: 'Greater Dhaka grew from about two million people in 1975 to over twenty million by the 2020s.',
    choices: null,
    effect: (p) => { p.s += 2; p.r += 3; p.addFlag('bng_dhaka_generation'); p.setMem('bng_dhaka', true); },
  },

  // ── MALAYSIA LABOUR MIGRATION ────────────────────────────────────────────────

  {
    id: 'bng_malaysia_decision',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1993 &&
      G.character.gender === 'male' &&
      G.age >= 20 && G.age <= 35 &&
      G.stats.wealth < 55 &&
      !G.mem?.bngMalaysia,
    text: 'The dalal says the fee is three lakh taka for a construction visa to Malaysia. The official rate is seventy thousand. The difference is the dalal\'s margin and the recruiter\'s margin and the employer\'s agent\'s margin, stacked. Your family will borrow against the land to cover it. The loan is from a moneylender at three percent a month. The man three houses down went three years ago and sent enough to rebuild the house. Another man from the village went and the employer changed his visa category when he arrived and the job he\'d been promised didn\'t exist.',
    choices: [
      {
        text: 'You go. The three lakh is borrowed, the ticket is bought.',
        tag: null,
        outcome: 'Kuala Lumpur at two in the morning. The agent takes your passport at the airport. You will get it back when the employer says. The dormitory holds eighteen people.',
        effect: (p) => { p.m -= 10; p.mo -= 3500; p.addFlag('bng_malaysia_worker'); p.addFlag('bng_broker_debt'); p.addFlag('emigrated'); p.emigrateTo('Malaysia'); p.setResidency('work_visa'); p.setMem('bngMalaysia', true); },
      },
      {
        text: 'The risk is the debt, not the distance. You stay.',
        tag: null,
        outcome: 'The land stays in the family. The earnings from here are smaller. You are still here when some of the men who went come back — some with money, some having sent everything home and returned with nothing.',
        effect: (p) => { p.m -= 4; p.addFlag('stayed_behind'); p.setMem('bngMalaysia', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'bng_malaysia_life',
    phase: null,
    weight: 4,
    when: (G) =>
      G.flags.has('bng_malaysia_worker') &&
      G.currentYear >= 1993 &&
      G.age >= 21 && G.age <= 40 &&
      !G.mem?.bngMalaysiaLife,
    text: 'The construction site is in Johor Bahru or Selangor or Penang, ten to twelve hours a day, and the dormitory is a shipping container. The employer holds your permit, which means he decides whether you stay. Your phone plan covers a call home on Sundays. Out of each month\'s pay you send most home and keep a little for food and the phone, and the debt to the broker will be cleared in three years, two if the overtime holds. You have agreed with yourself not to think about the interest.',
    choices: [
      {
        text: 'Send the maximum home. You can live on very little.',
        tag: null,
        outcome: 'The remittances arrive on the second Tuesday. Your mother knows the schedule. The debt is coming down. Your son was born while you were here.',
        effect: (p) => { p.m -= 10; p.mo += 1200; p.addFlag('bng_remittance_generation'); p.karma += 5; p.setMem('bngMalaysiaLife', true); },
      },
      {
        text: 'Document the permit violations. You know what the law says they cannot do.',
        tag: null,
        outcome: 'The employer finds out you have been asking questions. You are transferred to a subcontractor in Sabah without notice. The documentation stays with you. You do not know yet whether it will matter.',
        effect: (p) => { p.m -= 12; p.karma += 8; p.addFlag('bng_malaysia_worker'); p.setMem('bngMalaysiaLife', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'bng_malaysia_return',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('bng_malaysia_worker') &&
      G.currentYear >= 2000 &&
      G.age >= 28 && G.age <= 50 &&
      !G.mem?.bngMalaysiaReturn,
    text: 'You have been gone four years, or six, or ten. The remittances went home and the debt is paid and the house has a second floor. Your children speak to you with the careful formality people use for someone they know from calls. Your wife has managed the household and the parents-in-law and the school decisions for years without you. The country you returned to is the country you left but the person you are is not the person who left it. That gap takes a while to name.',
    choices: [
      {
        text: 'The remittances built something real. The years were worth it.',
        tag: null,
        outcome: 'The second floor goes up. The fees are paid. The accounting on the years abroad is: it worked, and it cost something you are still calculating.',
        effect: (p) => { p.m += 8; p.r += 5; p.addFlag('bng_remittance_generation'); p.setMem('bngMalaysiaReturn', true); },
      },
      {
        text: 'You missed the years. No house is worth what you weren\'t here for.',
        tag: null,
        outcome: 'This is true and the house is also true and the two truths are both yours. You are here now. That is the part you can still do something about.',
        effect: (p) => { p.m -= 6; p.r += 10; p.addFlag('bng_remittance_generation'); p.setMem('bngMalaysiaReturn', true); },
      },
    ],
    effect: null,
  },

  // ── STUDENT UPRISING 2024 ─────────────────────────────────────────────────────

  {
    id: 'bng_student_uprising_2024',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 2024 && G.currentYear <= 2025 &&
      G.age >= 20 &&
      !G.mem?.bng_2024,
    text: 'July 2024. The students march against the quota that reserves civil service jobs for the descendants of the freedom fighters, and the government calls them Razakars, collaborators, the worst word in Bangladesh. They keep marching, and the security forces open fire. On August 5 Sheikh Hasina, Bangabandhu\'s daughter, prime minister for fifteen years, leaves by military helicopter. The country wakes the next morning to the question of what comes next.',
    choices: [
      {
        text: 'The movement did something that had seemed impossible — it ended fifteen years of one-party rule in a day',
        tag: null,
        outcome: 'What comes after is uncertain. The movement was clear about what it was against. The institutions that were supposed to manage the transition were also the institutions that had been organized around one person\'s authority.',
        effect: (p) => { p.s += 4; p.addFlag('bng_uprising_generation'); p.setPolitical('left'); p.setMem('bng_2024', true); },
      },
      {
        text: 'The cost was three hundred dead students — the question of what follows deserves more than hope',
        tag: null,
        outcome: 'The dead are in the count. The institutions are in uncertain hands. Hope and caution are not mutually exclusive but they require different things of you.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('bng_uprising_generation'); p.setMem('bng_2024', true); },
      },
    ],
    effect: null,
  },

]

export default BANGLADESH_EVENTS
