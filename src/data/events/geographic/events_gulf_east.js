// events_gulf_east.js
// Events specific to wealthy_gulf and wealthy_east archetypes.
// Saudi Arabia, UAE, Kuwait, Qatar / Japan, South Korea, Singapore, Taiwan.
// Characters from these places need events that couldn't fire anywhere else.

export const GULF_EAST_EVENTS = [

  // ── WEALTHY GULF ─────────────────────────────────────────────────────────────

  {
    id: 'gulf_oil_boom_childhood',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      !G.mem.gulfOilBoomChildhood &&
      G.character.country.archetype === 'wealthy_gulf' &&
      G.currentYear >= 1970 && G.currentYear <= 1995 &&
      G.age >= 6 && G.age <= 12,
    text: (G) => {
      const country = G.character.country.name
      return `${country} is being built around you. Where your grandfather walked to the market, there is now a highway under construction. The labourers who build it are from somewhere else — Pakistan, India, Bangladesh — and they live in camps behind fences on the edge of the city. Your father drives a new car. Last year he drove a different new car. The speed of it all is too fast to become memory while it is happening.`
    },
    choices: null,
    effect: (p) => { p.w += 10; p.m += 8; p.addFlag('gulf_boom_generation'); p.setMem('gulfOilBoomChildhood', true) },
  },

  {
    id: 'gulf_gender_rules_female',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      !G.mem.gulfGenderRulesFemale &&
      G.character.country.archetype === 'wealthy_gulf' &&
      G.character.gender === 'female' &&
      G.age >= 13 && G.age <= 17,
    text: (G) => {
      const country = G.character.country.name
      if (country === 'Saudi Arabia') {
        return 'The rules are clear and comprehensive: what you may wear, where you may go, with whom, supervised by whom. Your male guardian is your father for now, eventually a husband. The religious police walk the shopping centre and the rules are enforced with a seriousness that does not leave room for ambiguity. You have known the rules your whole life. Understanding them is different from having known them.'
      }
      return 'The expectations for a girl in your family are specific and detailed. You understand that freedom, for women here, is a negotiation — between what is permitted, what is approved, and what is possible if nobody is watching. The negotiation is ongoing and you are only beginning to understand its terms.'
    },
    choices: [
      {
        text: 'Work within the rules — they are not all bad, and resistance has costs',
        tag: null,
        outcome: 'The navigation becomes skilled. The skill is real even if the system requiring it is not.',
        effect: (p) => { p.e += 5; p.s += 5; p.addFlag('gulf_female_navigation'); p.setMem('gulfGenderRulesFemale', true) },
      },
      {
        text: 'Understand where the limits are — and where they can be pushed',
        tag: null,
        outcome: 'The pushing is small and careful. Each small thing is its own kind of record.',
        effect: (p) => { p.m += 5; p.e += 7; p.addFlag('gulf_female_navigation'); p.addFlag('quiet_resistance'); p.setMem('gulfGenderRulesFemale', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gulf_foreign_workers',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      !G.mem.gulfForeignWorkers &&
      G.character.country.archetype === 'wealthy_gulf' &&
      G.age >= 14,
    text: 'The workers who build the roads, clean the buildings, and staff the restaurants are from a different world operating inside yours. You have been taught to understand this as normal. Today something specific happens — an exchange, an observation, a moment that makes the normal strange. The man who fixes the air conditioning unit drinks water from the bottle he brought because there is no glass offered. You watch this and understand something about the city you live in that you did not have words for before.',
    choices: [
      {
        text: 'Offer him water from your kitchen',
        tag: null,
        outcome: 'He accepts, surprised. The transaction takes ninety seconds. It stays with you longer than that.',
        effect: (p) => { p.m += 5; p.karma += 10; p.setMem('gulfForeignWorkers', true) },
      },
      {
        text: 'Do nothing — you are a child and this is how it is',
        tag: null,
        outcome: 'The moment passes. It does not leave entirely.',
        effect: (p) => { p.m -= 4; p.r += 5; p.setMem('gulfForeignWorkers', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gulf_hajj_family',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.gulfHajjFamily &&
      G.character.country.archetype === 'wealthy_gulf' &&
      (G.religion === 'muslim_sunni' || G.religion === 'muslim_shia' || G.religion?.includes('muslim')) &&
      G.age >= 18 && G.age <= 35,
    text: 'Your family goes to Mecca for Hajj. The proximity — a few hours\' drive for you, a life\'s savings and years of waiting for others — is something you understand intellectually but not fully. The tawaf. Two million people moving in the same direction. The scale of it is not spiritual until suddenly it is, in a way that surprises you even after a lifetime of faith.',
    choices: [
      {
        text: 'Let it affect you — this is what it is for',
        tag: null,
        outcome: 'Something in the ritual lands differently than you expected. You return with something that takes months to name.',
        effect: (p) => { p.m += 14; p.karma += 12; p.addFlag('completed_hajj'); p.setMem('gulfHajjFamily', true) },
      },
      {
        text: 'Move through it carefully — observance is its own form of presence',
        tag: null,
        outcome: 'The obligation is fulfilled. The meaning accumulates slowly over the years after.',
        effect: (p) => { p.m += 8; p.karma += 6; p.addFlag('completed_hajj'); p.setMem('gulfHajjFamily', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gulf_reform_wave',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.gulfReformWave &&
      G.character.country.archetype === 'wealthy_gulf' &&
      G.currentYear >= 2017 &&
      G.age >= 18 && G.age <= 35,
    text: (G) => {
      const country = G.character.country.name
      if (country === 'Saudi Arabia') {
        return 'Women are allowed to drive now. The announcement is on every screen. For your mother\'s generation this is seismic. For yours, it is a beginning that is happening decades late, which is different from gratitude, though you also feel something like relief. The changes that follow — cinemas, concerts, the softening of the morality police — are happening fast. What the pace means for what comes after is not yet clear.'
      }
      return 'The reforms are arriving. The pace is set from above and the direction is real even if the destination is uncertain. The generation coming up behind you will have a different version of this country than you inherited.'
    },
    choices: null,
    effect: (p) => { p.m += 10; p.addFlag('gulf_reform_generation'); p.setMem('gulfReformWave', true) },
  },

  // ── WEALTHY EAST (JAPAN) ──────────────────────────────────────────────────────

  {
    id: 'japan_company_culture',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem.japanCompanyCulture &&
      G.character.country.name === 'Japan' &&
      G.career &&
      G.age >= 22 && G.age <= 35,
    text: (G) => {
      const yr = G.currentYear
      if (yr >= 1960 && yr <= 1989) {
        return 'The company provides housing, healthcare, a pension, and a social structure that extends to the weekend. The implicit contract: you give it your working life and it gives you security and identity. You drink with your colleagues on Friday in a bar where the hierarchy does not change but is temporarily more porous. You sing at karaoke. The second face — the one for after work — is real too.'
      }
      return 'The job culture is demanding in ways that are structural and expected. Overtime is unspoken and universal. Leaving at five would be noticed. You stay. Most people do. The word for dying from overwork exists in your language because the condition is common enough to require naming.'
    },
    choices: [
      {
        text: 'Embrace it — the loyalty runs both ways here',
        tag: null,
        outcome: 'The advancement is real and gradual. You are valued. The cost of the valuing is your evenings.',
        effect: (p) => { p.m += 5; p.w += 8; p.h -= 5; p.addFlag('company_man'); p.setMem('japanCompanyCulture', true) },
      },
      {
        text: 'Perform the form while protecting the time',
        tag: null,
        outcome: 'The balance is exhausting to maintain. You manage it better than most. The limits are yours.',
        effect: (p) => { p.m += 3; p.e += 5; p.setMem('japanCompanyCulture', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'japan_bubble_burst',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.japanBubbleBurst &&
      G.character.country.name === 'Japan' &&
      G.currentYear >= 1990 && G.currentYear <= 1995,
    text: 'The bubble that inflated land prices to the point where a square metre in Tokyo cost more than a house in any other country has burst. The company that was a lifetime guarantee is restructuring. The word "lifetime employment" is now spoken with a different tone. Your parents\' generation built the miracle. You are inheriting what comes after it.',
    choices: null,
    effect: (p) => { p.w -= 12; p.m -= 8; p.addFlag('japan_lost_decade'); p.setMem('japanBubbleBurst', true) },
  },

  // ── WEALTHY EAST (SOUTH KOREA) ────────────────────────────────────────────────

  {
    id: 'korea_education_pressure',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      !G.mem.koreaEduPressure &&
      G.character.country.name === 'South Korea' &&
      G.age >= 14 && G.age <= 17,
    text: (G) => {
      const yr = G.currentYear
      return `The exam determines the university. The university determines everything after it. The hagwon runs until ten PM. You come home and study more. Your mother checks the light under the door at midnight. The other students in your class are doing the same thing. The competition is not between you and them — it is between you and the version of the future the exam controls. The stakes are not exaggerated. You have watched what happens to the people who did not pass.`
    },
    choices: [
      {
        text: 'Give it everything — this is what the next year is for',
        tag: null,
        outcome: 'The result is good. The cost to your body and the year is real. You sleep for three days after the exam.',
        effect: (p) => { p.e += 12; p.h -= 10; p.m -= 10; p.addFlag('suneung_survivor'); p.setMem('koreaEduPressure', true) },
      },
      {
        text: 'Do your best but keep some of yourself back',
        tag: null,
        outcome: 'The result is adequate. The self you kept back was worth keeping. What comes next is still possible.',
        effect: (p) => { p.e += 6; p.m -= 4; p.addFlag('suneung_survivor'); p.setMem('koreaEduPressure', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'korea_military_service',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem.koreaMilitary &&
      G.character.country.name === 'South Korea' &&
      G.character.gender === 'male' &&
      G.age >= 19 && G.age <= 22,
    text: 'Twenty-one months. The obligation is not optional. Every man you know has done it or is planning to do it or has plans to defer it as long as possible. You go. The army is a thing that happens to you and simultaneously a thing you come out of having changed in ways you did not expect. You will not be able to explain what changed to people who haven\'t done it, and they will not fully understand why you can\'t explain it.',
    choices: [
      {
        text: 'Use the time — build something from it',
        tag: null,
        outcome: 'You come out harder and more focused. The time was not lost.',
        effect: (p) => { p.h += 10; p.s += 5; p.e += 4; p.addFlag('military_service'); p.setMem('koreaMilitary', true) },
      },
      {
        text: 'Get through it and return to your real life',
        tag: null,
        outcome: 'You survive it. The return to civilian life takes longer to adjust to than the entry did.',
        effect: (p) => { p.h += 5; p.m -= 5; p.addFlag('military_service'); p.setMem('koreaMilitary', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'korea_factory_1970s',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'South Korea' &&
      G.currentYear >= 1965 && G.currentYear <= 1985 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem.koreaFactory,
    text: 'The factory is part of the miracle. South Korea\'s growth rate is 9.2 percent per year. It requires labour, and the labour is you. The shifts are twelve hours. The dormitories hold eight to a room. The Saemaul Undong posters on the wall say diligence, self-help, cooperation. The wages are low enough that the chaebol model requires them to be low. You are building the country that you were told you were building. You are also building the profit margin of someone you will never meet.',
    choices: [
      {
        text: 'You stay. You send money home and study at night.',
        tag: null,
        outcome: 'Three years. You move to a slightly better position. The country\'s GDP doubles. Your wages rise slightly. The ratio stays roughly constant.',
        effect: (p) => { p.m -= 5; p.e += 4; p.mo += 800; p.addFlag('korean_economic_miracle_worker'); p.setMem('koreaFactory', true) },
      },
      {
        text: 'You join the labour organizers.',
        tag: null,
        outcome: 'The KCIA\'s interest in labour organizers is not theoretical. You learn the cost of the category before you finish learning what the category means.',
        effect: (p) => { p.m -= 8; p.karma += 8; p.addFlag('korean_economic_miracle_worker'); p.addFlag('labor_organizer'); p.setMem('koreaFactory', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'korea_gwangju_1980',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'South Korea' &&
      G.currentYear === 1980 &&
      G.age >= 15 &&
      !G.mem.koreaGwangju,
    text: 'May 18, 1980. Gwangju. After Park Chung-hee\'s assassination, Chun Doo-hwan seizes power by military coup. When students and citizens protest in Gwangju, the paratroopers are sent in. What happens in the following nine days will be suppressed from national discourse for almost a decade. The number of dead is disputed. The military\'s tally is 144. Civil society\'s is higher. For those who are not in Gwangju, the news arrives in fragments and then does not arrive at all.',
    choices: [
      {
        text: 'You are in Gwangju.',
        tag: null,
        outcome: 'You will not talk about it for years because there is no safe context in which to talk about it. The memory acquires the specific quality of things that cannot yet be named.',
        effect: (p) => { p.m -= 18; p.h -= 8; p.r += 10; p.addFlag('gwangju_generation'); p.setMem('koreaGwangju', true) },
      },
      {
        text: 'You are not in Gwangju, but you know people who were.',
        tag: null,
        outcome: 'The official account and the accounts of people you trust do not agree. You file this. You continue to file this for the next decade, until the country is ready to look at it.',
        effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('gwangju_generation'); p.setMem('koreaGwangju', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'korea_democracy_1987',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'South Korea' &&
      G.currentYear === 1987 &&
      G.age >= 18 &&
      !G.mem.koreaDemocracy,
    text: 'June 1987. The student protests have been running for weeks. On June 9, a student named Lee Han-yeol is hit by a tear-gas canister at Yonsei University and photographs of his fall circulate. The protests become something else — not just students but office workers, the middle class, people in suits. On June 29 Roh Tae-woo announces direct presidential elections. The moment has a name now: the June Democratic Struggle. After twenty-six years of military government, direct elections will happen.',
    choices: null,
    effect: (p) => { p.m += 10; p.karma += 5; p.addFlag('june_struggle_generation'); p.setMem('koreaDemocracy', true) },
  },

  {
    id: 'korea_imf_crisis_1997',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'South Korea' &&
      G.currentYear >= 1997 && G.currentYear <= 1999 &&
      G.age >= 28 &&
      !G.mem.koreaIMF,
    text: 'November 1997. The won collapses. The IMF arrives with $58 billion and conditions: mass layoffs, asset sales to foreign investors, labour market "flexibility." The chaebols — Daewoo, Hyundai, Samsung — begin restructuring. Daewoo will cease to exist. Your father\'s generation considered lifetime employment a social contract. The IMF calls the contract inefficient. People donate gold jewellery to help pay the national debt — wedding rings, school medals. The donations are real, and the gesture is real, and the structural adjustment happens anyway.',
    choices: [
      {
        text: 'You lose your job in the restructuring.',
        tag: null,
        outcome: 'The category is IMF agejeong — IMF laid-off. It is large enough to have a name. You are in it.',
        effect: (p) => { p.m -= 16; p.mo -= Math.floor((p.mo ?? 0) * 0.4); p.addFlag('korean_imf_generation'); p.setMem('koreaIMF', true) },
      },
      {
        text: 'Your job survives. Your colleagues\' do not.',
        tag: null,
        outcome: 'The survivor\'s version: you keep your desk, your badge, your salary, and you watch the restructuring happen around you. The desks that empty stay empty for a long time.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('korean_imf_generation'); p.setMem('koreaIMF', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'korea_hallyu_2000s',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'South Korea' &&
      G.currentYear >= 2000 && G.currentYear <= 2015 &&
      G.age >= 30 &&
      !G.mem.koreaHallyu,
    text: 'Korean drama is being watched in China, Vietnam, the Philippines. Korean music is charting in markets that a generation ago would not have recognized the country\'s name. The cultural wave has a name: hallyu. It is a soft-power outcome of the IMF crisis, in an indirect way — the government invested in cultural industries when the manufacturing economy failed. The country you grew up in was not a cultural exporter. The country your children are growing up in is.',
    choices: null,
    effect: (p) => { p.m += 6; p.addFlag('hallyu_generation'); p.setMem('koreaHallyu', true) },
  },

  {
    id: 'korea_ppalli_ppalli',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'South Korea' &&
      G.currentYear >= 1990 && G.currentYear <= 2020 &&
      G.age >= 22 &&
      !G.mem.koreaPpalli,
    text: 'Ppalli-ppalli: hurry, hurry. The phrase is a cultural value. The broadband is the fastest in the world. The delivery arrives in thirty minutes. The social expectation is that everything happens faster than the speed at which anything naturally happens. You have internalized this. You notice it when you are somewhere else — the slowness of other cities, the way people wait — and what you feel is not quite impatience. It is the specific disorientation of a pace that is no longer yours.',
    choices: null,
    effect: (p) => { p.m -= 3; p.e += 3; p.addFlag('korean_speed_culture'); p.setMem('koreaPpalli', true) },
  },

  // ── WEALTHY EAST (SINGAPORE/TAIWAN) ──────────────────────────────────────────

  {
    id: 'singapore_meritocracy',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      !G.mem.singaporeMeritocracy &&
      (G.character.country.name === 'Singapore' || G.character.country.name === 'Taiwan') &&
      G.age >= 13 && G.age <= 16,
    text: (G) => {
      const country = G.character.country.name
      return `The system in ${country} is built on the premise that performance determines outcome and outcome is fair. The PSLE or its equivalent will determine your secondary school, which will determine the university, which will determine everything else in a country small enough that everyone knows which school you went to. You are old enough now to understand the track you are on. Whether the track is the right one is a question the system does not make easy to ask.`
    },
    choices: [
      {
        text: 'Work the system — it rewards hard work',
        tag: null,
        outcome: 'The track takes you where it promised. The promise, you discover, was accurate and insufficient simultaneously.',
        effect: (p) => { p.e += 10; p.h -= 5; p.m -= 3; p.addFlag('meritocracy_track'); p.setMem('singaporeMeritocracy', true) },
      },
      {
        text: 'Question the framework while working within it',
        tag: null,
        outcome: 'The questioning keeps something alive in you that pure compliance would have extinguished.',
        effect: (p) => { p.e += 7; p.s += 5; p.addFlag('meritocracy_track'); p.setMem('singaporeMeritocracy', true) },
      },
    ],
    effect: null,
  },

]
