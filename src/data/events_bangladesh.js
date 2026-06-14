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

const BANGLADESH_EVENTS = [

  // ── BHOLA CYCLONE SHADOW ─────────────────────────────────────────────────────

  {
    id: 'bng_bhola_shadow',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1970 && G.currentYear <= 1980 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.bng_bhola,
    text: 'November 13, 1970. The cyclone makes landfall in the night. Up to 500,000 people die on the low coastal islands of East Pakistan. The relief from the central government in West Pakistan is inadequate — too slow, too little, too politically indifferent. Your family has lost someone, or your family knows someone who lost everyone. The dead are not in the newspapers yet. The anger is. The connection between what Dhaka controls and what Islamabad does not is articulated in different places and in different voices, but it is the same statement: they do not govern us because they do not consider us the same as them.',
    choices: null,
    effect: (p) => { p.m -= 6; p.h -= 3; p.addFlag('bng_cyclone_generation'); p.setMem('bng_bhola', true); },
  },

  // ── LIBERATION WAR 1971 ───────────────────────────────────────────────────────

  {
    id: 'bng_liberation_war_1971',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1971 && G.currentYear <= 1973 &&
      G.age >= 15 &&
      !G.mem?.bng_liberation,
    text: (G) => {
      const age = G.age
      return age >= 20
        ? 'March 25–26, 1971. Operation Searchlight begins at midnight. The Pakistani army targets Dhaka first: the University, the Hindu neighborhoods, the police barracks. Then the rest of the country. Nine months of war. The Mukti Bahini — the liberation fighters — operate from the countryside and from India. You know people who joined them. You know people who didn\'t come back. On December 16, 1971, ninety-three thousand Pakistani soldiers surrender. The country is free. The dead are between one and three million, depending on which count you use. No count is wrong in the way that matters.'
        : 'The war is nine months of your adolescence. The army comes to your area or it comes close. Your family moves, or hides, or keeps going to work because stopping would attract attention. The Mukti Bahini fighters — some of them boys not much older than you — move through at night. December 16: the Pakistani army surrenders. This is Victory Day. You will remember where you were when you heard.'
    },
    choices: [
      {
        text: 'You join the Mukti Bahini or work for the resistance in whatever way your age allows',
        tag: null,
        outcome: 'Joi Bangla. The country that emerges from the war carries its fighters in a specific relationship to what they did and what it cost. You are in that relationship now.',
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
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1974 && G.currentYear <= 1976 &&
      G.age >= 20 &&
      !G.mem?.bng_famine,
    text: 'Three years after independence. One to 1.5 million people die of starvation. The new country does not have the administrative infrastructure to distribute food aid. The food aid is there. The floods came. The government did not move fast enough. Sheikh Mujibur Rahman — Bangabandhu, Father of the Nation, the man who gave the March 7 speech — is in the presidential palace. The people are dying in the countryside. The distance between those two facts is what the famine produces as political feeling.',
    choices: null,
    effect: (p) => { p.m -= 8; p.h -= 5; p.addFlag('bng_famine_generation'); p.setMem('bng_famine', true); },
  },

  // ── MUJIB ASSASSINATION 1975 ──────────────────────────────────────────────────

  {
    id: 'bng_mujib_1975',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1975 && G.currentYear <= 1977 &&
      G.age >= 20 &&
      !G.mem?.bng_mujib,
    text: 'August 15, 1975. Before dawn. A military faction enters the presidential residence. Sheikh Mujibur Rahman — the Bangabandhu, the father of the nation, the man whose voice at Ramna Race Course in March 1971 was the speech that started everything — is killed with most of his family. His daughters Sheikh Hasina and Sheikh Rehana are in Germany and survive. The military takes power. The country that fought nine months for its freedom is now, four years later, under military rule. The gap between what the war was for and what it produced is the political terrain of the next twenty years.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('bng_coup_generation'); p.setMem('bng_mujib', true); },
  },

  // ── CYCLONE AS ANNUAL CONDITION ───────────────────────────────────────────────

  {
    id: 'bng_cyclone_life',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1980 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.bng_cyclone_adult,
    text: (G) => {
      const yr = G.currentYear
      return yr <= 1992
        ? 'April 1991. The cyclone makes landfall at night with a 6-metre storm surge. 138,000 people die. You know which areas were hit because you know people from those areas and some of them you will not hear from again. Chittagong. Cox\'s Bazar. The coastal islands. The khatian — land registration document — is in the mud somewhere. The country organizes the response faster than 1970 but the coast is still the coast and the sea is still the sea.'
        : yr <= 2010
        ? 'Sidr makes landfall November 15, 2007. Category 4. Three thousand dead. The number is lower than 1991 because the cyclone shelters were built and the evacuation system worked and the community knowledge was better. The number is still 3,000. The coast is still the coast. You watch the relief organizations arrive and know some of them and know the geography and the gap between the two.'
        : 'The cyclone warning system is sophisticated now. The shelters are concrete. The evacuation routes are trained into the communities. When the storms come — and they come every few years — the death toll is lower than anyone would have thought possible thirty years ago. The sea is also warmer than thirty years ago. The two facts are in the same sentence now.'
    },
    choices: null,
    effect: (p) => { p.h -= 4; p.r += 5; p.addFlag('bng_cyclone_survivor'); p.setMem('bng_cyclone_adult', true); },
  },

  // ── GARMENT FACTORY ───────────────────────────────────────────────────────────

  {
    id: 'bng_garment_worker',
    phase: 'young_adult',
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
        outcome: 'Rana Plaza collapsed on April 24, 2013, the day after cracks appeared and workers were sent home and then ordered back. 1,134 people died. The order had a deadline.',
        effect: (p) => { p.h -= 3; p.r += 5; p.addFlag('bng_garment_generation'); p.setMem('bng_garment', true); },
      },
    ],
    effect: null,
  },

  // ── GRAMEEN BANK MICROLOAN ────────────────────────────────────────────────────

  {
    id: 'bng_grameen_loan',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 1983 &&
      G.character.gender === 'female' &&
      G.age >= 20 && G.age <= 45 &&
      G.stats.wealth < 50 &&
      !G.mem?.bng_grameen,
    text: 'The Grameen Bank offers small loans — taka amounts that the formal banking system would not consider — to women in rural groups who collectively guarantee each other\'s repayment. Muhammad Yunus\'s idea: poor women are creditworthy if you structure the loan correctly. The loan is for a sewing machine, or a phone for mobile money services, or stock for a small shop. The group meets weekly. The repayment rate is ninety-eight percent. What the loan enables — the scale of it, the supply chain of microentrepreneurship across the country — is real. What it sometimes traps people in is also real.',
    choices: [
      {
        text: 'You take the loan and build something small but yours',
        tag: null,
        outcome: 'The loan is repaid and another follows. The income is not large but it is yours in a way that was not previously available. The weekly meeting is also a social infrastructure.',
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
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.ruralUrban === 'urban' &&
      G.currentYear >= 2000 &&
      G.age >= 25 &&
      !G.mem?.bng_dhaka,
    text: 'Dhaka is one of the densest cities on earth. Twenty-two million people in a metropolitan area that was two million in 1975. The rickshaws in the street number four hundred thousand. The CNG auto-rickshaws. The buses that do not stop for long. The flood water in July in the streets of Dhanmondi, mid-thigh, the office workers with trousers held up. The garment economy drew the country to the city and the city expanded to hold it and the city is still expanding. The infrastructure does not keep up with the expansion. The expansion does not slow.',
    choices: null,
    effect: (p) => { p.s += 2; p.r += 3; p.addFlag('bng_dhaka_generation'); p.setMem('bng_dhaka', true); },
  },

  // ── STUDENT UPRISING 2024 ─────────────────────────────────────────────────────

  {
    id: 'bng_student_uprising_2024',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Bangladesh' &&
      G.currentYear >= 2024 && G.currentYear <= 2025 &&
      G.age >= 20 &&
      !G.mem?.bng_2024,
    text: 'July 2024. University students march against the quota system that reserves thirty percent of civil service jobs for descendants of 1971 Liberation War fighters. The government calls the protesters "Razakars" — collaborators with the Pakistani army in 1971, the worst word in Bangladesh. The students continue. Security forces open fire. At least 300 are killed. On August 5, Sheikh Hasina — the Prime Minister, daughter of the Bangabandhu, who has governed for fifteen consecutive years — boards a military helicopter and leaves. The country wakes up the next morning to the question of what comes next.',
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
