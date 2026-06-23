// events_society.js
// Women's rights milestones, healthcare system encounters, and language/identity events.
// These are educational moments — the player learns when and where things changed,
// told from the perspective of someone living through the change.

export const SOCIETY_EVENTS = [

  // ── WOMEN'S RIGHTS — VOTING ──────────────────────────────────────────────────

  {
    id: 'womens_vote_first',
    phase: 'young_adult',
    weight: 5,
    when: (G) => {
      if (G.character.gender !== 'female') return false
      if (G.mem?.womens_vote) return false
      if (G.age < 18) return false
      const voteYears = {
        'New Zealand': 1893,
        'Australia': 1902,
        'Finland': 1906,
        'Denmark': 1915,
        'Canada': 1918,
        'Germany': 1918,
        'United Kingdom': 1928,
        'United States': 1920,
        'France': 1944,
        'Italy': 1945,
        'Japan': 1945,
        'China': 1949,
        'India': 1950,
        'Switzerland': 1971,
        'Portugal': 1976,
        'Saudi Arabia': 2015,
      }
      const year = voteYears[G.character.country.name]
      if (!year) return false
      return Math.abs(G.currentYear - year) <= 2
    },
    text: (G) => {
      const country = G.character.country.name
      const year = G.currentYear
      if (country === 'Australia') return 'The Commonwealth Franchise Act has passed. You are among the first women in the world to hold this right at a national level. The polling booth is quiet. The man at the desk checks your name twice. You vote.'
      if (country === 'Finland') return 'Finland is the first country in Europe to grant women both the vote and the right to stand for parliament. You have read the arguments for and against, most of them written by men. You walk to the polling station. There are other women ahead of you in the queue.'
      if (country === 'Denmark') return `The constitutional revision has passed. It is ${year}. You are thirty-six years old and it is the first time you will vote. Your mother never did. You stand in the queue and think about that.`
      if (country === 'Canada') return 'The Women\'s Franchise Act has passed. Federally, at least. Quebec women will wait another generation for the provincial vote. You know this. It complicates how you feel, holding the ballot. You vote anyway.'
      if (country === 'Germany') return 'The Republic has granted women full suffrage. The Kaiser is gone. The war is over. The world is rearranging itself into something none of you recognise. The election is in January. You intend to vote in it.'
      if (country === 'United States') return 'The Nineteenth Amendment has been ratified. Seventy-two years since Seneca Falls. You stand in line. The woman behind you is old enough to have marched. You do not know her name. You want to say something and don\'t.'
      if (country === 'France') return `It is ${year}. The provisional government has granted women the right to vote. France is later than most of Europe. The men who fought in the Resistance will cast their ballots alongside the women who did. You put your name on the register.`
      if (country === 'Italy') return 'The Fascists are gone. The new republic has granted women full suffrage. The first elections are next year. Your grandmother voted for Mussolini in the only referendum she was ever offered. You will not be repeating that particular history.'
      if (country === 'Japan') return 'The occupation government has written universal suffrage into the new constitution. Your mother is uncertain about this. You are not. You go to the polling station early, before the heat.'
      if (country === 'China') return 'The People\'s Republic has declared. The new constitution grants women equal voting rights. Whether those rights mean anything under a single-party state is a question you know better than to ask aloud. You mark your ballot.'
      if (country === 'India') return 'The Constitution of the Republic of India grants universal adult suffrage. There is no literacy test, no property requirement, no husband\'s permission needed. You stand in a line that stretches around the block. Most of the women near you have never held a ballot before. Neither have you.'
      if (country === 'Saudi Arabia') return 'The decree allows women to vote in municipal elections. Municipal elections only. You drive yourself to the polling station — that right came through last year. You vote. You know the boundaries. You vote anyway.'
      return 'The law has passed. Women may now vote. You hear the news and sit with it for a while. Some women in the street are weeping. Some are arguing already about what it will and will not change. You have been waiting your whole adult life for a right that was always supposed to be self-evident.'
    },
    choices: null,
    effect: (p) => {
      p.m += 15
      p.e += 3
      p.karma += 5
      p.setMem('womens_vote', true)
      p.addFlag('witnessed_womens_suffrage')
    },
  },

  {
    id: 'womens_vote_nz_first',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.name === 'New Zealand' &&
      G.currentYear >= 1893 && G.currentYear <= 1895 &&
      G.age >= 18 &&
      !G.mem?.womens_vote,
    text: 'New Zealand is the first country on earth to grant women the right to vote. The Electoral Act passed last month. Kate Sheppard collected hundreds of thousands of signatures. You stand in line at the polling place. The man ahead of you is surprised to see women in the queue. You vote.',
    choices: null,
    effect: (p) => {
      p.m += 20
      p.e += 5
      p.karma += 8
      p.setMem('womens_vote', true)
      p.addFlag('witnessed_womens_suffrage')
      p.addFlag('first_in_world_to_vote')
    },
  },

  {
    id: 'womens_vote_suffragette_violence',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 1910 && G.currentYear <= 1914 &&
      G.age >= 18,
    text: 'The suffragettes are chaining themselves to railings and breaking windows. Emily Wilding Davison died at Epsom last summer, stepping onto the track. The newspapers call them hysterical. You have read their pamphlets. You know exactly what they want and why.',
    choices: [
      {
        text: 'Join a suffragette march',
        tag: 'activist',
        outcome: 'The police are there. You are not arrested, but a woman beside you is. She goes quietly, as if she expected it.',
        effect: (p) => { p.m -= 5; p.e += 6; p.s += 4; p.addFlag('suffragette_activist') },
      },
      {
        text: 'Support from a distance — sign petitions, donate',
        tag: null,
        outcome: 'Your name is on a list somewhere. That is something.',
        effect: (p) => { p.m += 3; p.e += 3; p.addFlag('suffrage_supporter') },
      },
    ],
    effect: null,
  },

  {
    id: 'womens_vote_switzerland_late',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.name === 'Switzerland' &&
      G.currentYear >= 1971 && G.currentYear <= 1973 &&
      G.age >= 18 &&
      !G.mem?.womens_vote,
    text: 'Switzerland grants women the right to vote in federal elections. This is 1971. France gave women the vote in 1944. West Germany in 1949. You have watched other countries do this for a generation. The referendum passed with 65 percent of men voting yes.',
    choices: null,
    effect: (p) => {
      p.m += 12
      p.e += 4
      p.r += 5
      p.setMem('womens_vote', true)
      p.addFlag('witnessed_womens_suffrage')
    },
  },

  // ── WOMEN'S RIGHTS — FINANCIAL INDEPENDENCE ──────────────────────────────────

  {
    id: 'womens_credit_rights',
    phase: 'young_adult',
    weight: 4,
    when: (G) => {
      if (G.character.gender !== 'female') return false
      if (G.mem?.womens_credit) return false
      if (G.age < 18 || G.age > 40) return false
      const creditYears = {
        'France': 1965,
        'United States': 1974,
        'United Kingdom': 1975,
        'Germany': 1977,
        'Switzerland': 1988,
        'Japan': 1986,
      }
      const year = creditYears[G.character.country.name]
      if (!year) return false
      return Math.abs(G.currentYear - year) <= 2
    },
    text: 'You go to the bank to open an account. The form asks for a co-signer — a husband, a father, a male relative with legal standing. A new law has just changed this. You write your own name in that space. The clerk looks at it for a moment. Then processes it.',
    choices: null,
    effect: (p) => {
      p.m += 10
      p.s += 3
      p.setMem('womens_credit', true)
      p.addFlag('financial_independence_era')
    },
  },

  // ── WOMEN'S RIGHTS — REPRODUCTIVE ────────────────────────────────────────────

  {
    id: 'contraception_available',
    phase: 'young_adult',
    weight: 4,
    when: (G) => {
      if (G.character.gender !== 'female') return false
      if (G.mem?.contraception_era) return false
      if (G.age < 18 || G.age > 35) return false
      if (!['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype)) return false
      const contraYears = {
        'United Kingdom': 1961,
        'United States': 1960,
        'France': 1967,
        'Germany': 1961,
        'Canada': 1969,
        'Australia': 1961,
        'Ireland': 1985,
        'Italy': 1971,
      }
      const year = contraYears[G.character.country.name]
      if (!year) return false
      return G.currentYear >= year && G.currentYear <= year + 4
    },
    text: 'The doctor writes you a prescription for the pill. He is clinical about it. You take the slip of paper and walk out into the afternoon. The question of when — or whether — you become a mother is now, for the first time, mostly yours to answer.',
    choices: null,
    effect: (p) => {
      p.m += 8
      p.setMem('contraception_era', true)
      p.addFlag('contraception_era')
    },
  },

  {
    id: 'abortion_legal',
    phase: 'young_adult',
    weight: 3,
    when: (G) => {
      if (G.character.gender !== 'female') return false
      if (G.mem?.abortion_law_change) return false
      if (G.age < 18) return false
      const abortionYears = {
        'United Kingdom': 1967,
        'United States': 1973,
        'France': 1975,
        'Germany': 1992,
        'Portugal': 2007,
        'Ireland': 2018,
        'Italy': 1978,
        'Spain': 2010,
      }
      const year = abortionYears[G.character.country.name]
      if (!year) return false
      return Math.abs(G.currentYear - year) <= 2
    },
    text: 'The law has changed. Abortion is now legal here, under certain conditions. You read the news not as it applies to your own situation — but as an account of what has existed until now, what has been decided in secret rooms, what has not been safe. The legal change takes years to reach every clinic.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.setMem('abortion_law_change', true)
      p.addFlag('reproductive_rights_era')
    },
  },

  // ── WOMEN'S RIGHTS — WORKFORCE ────────────────────────────────────────────────

  {
    id: 'women_enter_workforce_wartime',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.archetype === 'wealthy_west' &&
      G.currentYear >= 1940 && G.currentYear <= 1945 &&
      G.age >= 18 && G.age <= 35 &&
      !G.flags.includes('rosie_the_riveter_generation'),
    text: 'The men are overseas. The factory has hired women for the first time. Your supervisor explains the machines as if you might break them. By the end of the week you are faster than he is.',
    choices: null,
    effect: (p) => {
      p.e += 5
      p.s += 3
      p.w += 5
      p.addFlag('rosie_the_riveter_generation')
    },
  },

  {
    id: 'women_fired_after_war',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.archetype === 'wealthy_west' &&
      G.currentYear >= 1945 && G.currentYear <= 1948 &&
      G.flags.includes('rosie_the_riveter_generation') &&
      !G.mem?.fired_postwar,
    text: 'The men come back. The factory says thank you for your service and lets you go. The job you held for four years goes back to its rightful owner, who was not here to do it.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.w -= 8
      p.r += 8
      p.clearCareer()
      p.addFlag('laid_off')
      p.setMem('fired_postwar', true)
    },
  },

  {
    id: 'womens_equal_pay_law',
    phase: 'young_adult',
    weight: 3,
    when: (G) => {
      if (G.character.gender !== 'female') return false
      if (G.mem?.equal_pay_law) return false
      if (G.age < 18) return false
      const payYears = {
        'United States': 1963,
        'United Kingdom': 1970,
        'France': 1972,
        'Germany': 1980,
        'Australia': 1969,
        'Canada': 1977,
      }
      const year = payYears[G.character.country.name]
      if (!year) return false
      return Math.abs(G.currentYear - year) <= 2
    },
    text: 'A law is passed requiring equal pay for equal work. It will be decades before the gap closes measurably. But the law exists now.',
    choices: null,
    effect: (p) => {
      p.m += 8
      p.w += 3
      p.setMem('equal_pay_law', true)
    },
  },

  {
    id: 'women_barred_profession',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.archetype === 'wealthy_west' &&
      G.currentYear < 1970 &&
      G.stats.smarts > 60 &&
      !G.mem?.profession_barred,
    text: 'You apply to the program. The letter comes back. Women are not admitted. The sentence contains no apology. It does not explain. It does not need to — everyone already knows this is how things are.',
    choices: [
      {
        text: 'Find another path and build your case from the outside',
        tag: null,
        outcome: 'You take the longer route. There are others here who took it before you.',
        effect: (p) => { p.e += 3; p.m -= 8; p.r += 6; p.setMem('profession_barred', true); p.addFlag('barred_from_profession') },
      },
      {
        text: 'Write a formal letter of protest',
        tag: null,
        outcome: 'The letter is filed somewhere. Nothing changes this year. But you are on record.',
        effect: (p) => { p.e += 2; p.m -= 5; p.r += 8; p.setMem('profession_barred', true); p.addFlag('barred_from_profession') },
      },
    ],
    effect: null,
  },

  // ── WOMEN'S RIGHTS — MARRIAGE AND FAMILY LAW ─────────────────────────────────

  {
    id: 'married_womens_property',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.archetype === 'wealthy_west' &&
      G.currentYear >= 1870 && G.currentYear <= 1920 &&
      G.age >= 18 &&
      !G.mem?.married_property_law,
    text: 'Until now, everything you owned became your husband\'s on the day you married. A new law changes this. You can own property, keep wages, enter contracts in your own name. It will take time for people to act accordingly.',
    choices: null,
    effect: (p) => {
      p.m += 8
      p.w += 3
      p.setMem('married_property_law', true)
    },
  },

  {
    id: 'domestic_violence_law',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      if (G.character.gender !== 'female') return false
      if (G.mem?.dv_law_passed) return false
      if (!['wealthy_west'].includes(G.character.country.archetype)) return false
      const dvYears = {
        'United Kingdom': 1976,
        'United States': 1994,
        'Australia': 1987,
        'Canada': 1982,
        'France': 1994,
        'Germany': 1997,
        'Ireland': 1996,
      }
      const year = dvYears[G.character.country.name]
      if (!year) return false
      return G.currentYear >= year && G.currentYear <= year + 3
    },
    text: 'A law is passed making domestic violence a criminal offense. Before this, it was classified as a domestic matter — something to be handled within families. The legislation creates shelters, restraining orders, a legal mechanism that did not exist before. Many women learn about it only later.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.setMem('dv_law_passed', true)
      p.addFlag('domestic_protection_era')
    },
  },

  {
    id: 'womens_divorce_rights',
    phase: 'midlife',
    weight: 3,
    when: (G) => {
      if (G.character.gender !== 'female') return false
      if (G.mem?.divorce_rights_law) return false
      if (G.age < 25) return false
      const divorceYears = {
        'Ireland': 1996,
        'Italy': 1970,
        'Spain': 1981,
        'Malta': 2011,
        'Brazil': 1977,
        'Chile': 2004,
        'Philippines': null,
      }
      const year = divorceYears[G.character.country.name]
      if (!year) return false
      return Math.abs(G.currentYear - year) <= 2
    },
    text: 'The divorce law has changed. Before, you needed grounds. Adultery, cruelty, abandonment. Now both parties can simply agree it is over. The shift in legal power is not dramatic in its language. It is enormous in what it makes possible.',
    choices: null,
    effect: (p) => {
      p.m += 8
      p.setMem('divorce_rights_law', true)
      p.addFlag('divorce_rights_era')
    },
  },

  // ── HEALTHCARE — GENERAL ACCESS ───────────────────────────────────────────────

  {
    id: 'healthcare_universal_system',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.age >= 18 && G.age <= 28 &&
      ['wealthy_west', 'wealthy_east'].includes(G.character.country.archetype) &&
      G.character.country.name !== 'United States' &&
      !G.mem?.healthcare_system_encountered,
    text: 'The doctor sees you the same day. You leave without a bill. This is not remarkable here — it is simply how it works. You have grown up knowing this. You will not understand what it means until you meet someone who grew up without it.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.h += 3
      p.setMem('healthcare_system_encountered', true)
    },
  },

  {
    id: 'healthcare_uninsured_bill',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'United States' &&
      G.age >= 18 && G.age <= 35 &&
      G.money < 30000 &&
      !G.mem?.uninsured_bill,
    text: 'You are in the hospital for three days. The bill is thirty-four thousand dollars. The itemized statement shows twenty-eight dollars for each aspirin. You call the billing department. You negotiate it to eleven thousand. This is described to you as a success.',
    choices: [
      {
        text: 'Set up a payment plan',
        tag: null,
        outcome: 'One hundred and fifty dollars a month. You will be paying this for six years.',
        effect: (p) => { p.mo -= 5000; p.m -= 15; p.setMem('uninsured_bill', true); p.addFlag('medical_debt') },
      },
      {
        text: 'Apply for financial assistance',
        tag: null,
        outcome: 'The paperwork takes three weeks. Some of it is forgiven. Most of it is not.',
        effect: (p) => { p.mo -= 3000; p.m -= 10; p.setMem('uninsured_bill', true); p.addFlag('medical_debt') },
      },
    ],
    effect: null,
  },

  {
    id: 'healthcare_soviet_polyclinic',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.archetype === 'post_soviet' &&
      G.currentYear < 1991 &&
      G.age >= 18 &&
      !G.mem?.soviet_healthcare,
    text: 'The polyclinic is state-run. The doctor is good. The building is not. You bring your own bandages because the ward has run out. The doctor examines you efficiently, writes a referral in careful handwriting, and sees the next patient. There is no bill.',
    choices: null,
    effect: (p) => {
      p.h += 3
      p.m -= 3
      p.setMem('soviet_healthcare', true)
    },
  },

  {
    id: 'healthcare_developing_world',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      ['subsaharan', 'developing_unstable', 'developing_urban'].includes(G.character.country.archetype) &&
      G.age >= 18 &&
      !G.mem?.developing_healthcare,
    text: 'The hospital is three hours away by bus. The doctor sees forty patients before noon. You wait in a courtyard with others, some of whom have been here since the day before. The medicine you need is not in stock. The pharmacist writes down the name and tells you to try the private clinic on the other side of town.',
    choices: null,
    effect: (p) => {
      p.h -= 3
      p.m -= 8
      p.setMem('developing_healthcare', true)
    },
  },

  // ── HEALTHCARE — HISTORICAL MILESTONES ────────────────────────────────────────

  {
    id: 'polio_vaccine_arrives',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.archetype === 'wealthy_west' &&
      G.currentYear >= 1955 && G.currentYear <= 1960 &&
      G.age >= 5 && G.age <= 14 &&
      !G.mem?.polio_vaccine,
    text: 'The polio vaccine is available. Your mother takes you to a school gymnasium where a nurse administers it with a jet injector. The woman behind you in line wept quietly when she got to the front. You did not know why then.',
    choices: null,
    effect: (p) => {
      p.h += 8
      p.m += 5
      p.setMem('polio_vaccine', true)
      p.addFlag('salk_generation')
    },
  },

  {
    id: 'hiv_aids_treatment',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentYear >= 1996 && G.currentYear <= 1999 &&
      G.age >= 20 && G.age <= 45 &&
      ['wealthy_west'].includes(G.character.country.archetype) &&
      (G.flags.includes('lgbtq_identity') || G.flags.includes('aids_crisis_generation')) &&
      !G.mem?.aids_treatment,
    text: 'The combination therapy is announced. The people in the clinic who were making plans for dying begin, cautiously, to revise them. The ward that was a dying ward is not a dying ward anymore. This takes time to believe.',
    choices: null,
    effect: (p) => {
      p.h += 10
      p.m += 15
      p.setMem('aids_treatment', true)
      p.addFlag('survived_aids_crisis')
    },
  },

  {
    id: 'mental_health_stigma_era',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentYear < 1990 &&
      G.character.country.archetype === 'wealthy_west' &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.mental_health_visit_early,
    text: 'You tell your doctor you cannot sleep, cannot concentrate, have not been able to feel much for months. He suggests fresh air and reducing stress. The word depression is not used. You go home with a pamphlet about diet and exercise.',
    choices: null,
    effect: (p) => {
      p.m -= 8
      p.r += 6
      p.setMem('mental_health_visit_early', true)
    },
  },

  {
    id: 'mental_health_modern',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.currentYear >= 2000 &&
      G.character.country.archetype === 'wealthy_west' &&
      G.age >= 20 && G.age <= 40 &&
      !G.mem?.therapy_normalized,
    text: 'Your colleague mentions her therapist in passing, the way she mentions her dentist. This did not used to happen. You make an appointment you have been putting off for two years.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.e += 3
      p.setMem('therapy_normalized', true)
    },
  },

  {
    id: 'childbirth_era_early',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.archetype === 'wealthy_west' &&
      G.currentYear >= 1920 && G.currentYear <= 1960 &&
      G.children && G.children.length >= 1 &&
      !G.mem?.birth_experience,
    text: 'The hospital does not allow your husband in the room. You are given ether. You remember little of it. The baby is brought to you afterward, clean and wrapped, by a nurse who does not ask how you are feeling.',
    choices: null,
    effect: (p) => {
      p.h -= 5
      p.m += 10
      p.setMem('birth_experience', true)
      p.addFlag('parent')
    },
  },

  {
    id: 'childbirth_era_modern',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.archetype === 'wealthy_west' &&
      G.currentYear >= 1975 &&
      G.children && G.children.length >= 1 &&
      !G.mem?.birth_experience,
    text: 'Your partner is there. There is a birth plan, a playlist, a conversation about epidurals. The plan is mostly abandoned by hour six. None of that matters by the end.',
    choices: null,
    effect: (p) => {
      p.h -= 5
      p.m += 15
      p.setMem('birth_experience', true)
      p.addFlag('parent')
    },
  },

  {
    id: 'childbirth_developing_world',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      ['subsaharan', 'developing_unstable', 'developing_urban'].includes(G.character.country.archetype) &&
      G.children && G.children.length >= 1 &&
      !G.mem?.birth_experience,
    text: 'You deliver at home. The midwife has been here before, knows what she is doing. The clinic is too far. This is how your mother was born, and her mother before her. You think of them during it.',
    choices: null,
    effect: (p) => {
      p.h -= 8
      p.m += 12
      p.setMem('birth_experience', true)
      p.addFlag('parent')
    },
  },

  {
    id: 'traditional_healer_vs_hospital',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      ['subsaharan', 'developing_unstable'].includes(G.character.country.archetype) &&
      G.ruralUrban === 'rural' &&
      G.age >= 7 && G.age <= 14 &&
      !G.mem?.traditional_healer,
    text: 'When you are ill, your grandmother calls for the herbalist before the clinic is considered. The herbalist knows what grows nearby and what it is for. When your family eventually goes to the clinic, the doctor prescribes something that costs more than a week\'s food.',
    choices: null,
    effect: (p) => {
      p.h -= 3
      p.karma += 3
      p.setMem('traditional_healer', true)
      p.addFlag('traditional_medicine_experienced')
    },
  },

  // ── LANGUAGE AND IDENTITY — SUPPRESSION ──────────────────────────────────────

  {
    id: 'language_punished_school',
    phase: 'childhood',
    weight: 4,
    when: (G) => {
      if (G.age < 6 || G.age > 14) return false
      if (G.mem?.language_punished) return false
      const suppressedCountries = {
        'Spain': 1976,
        'Turkey': 1991,
      }
      const name = G.character.country.name
      if (suppressedCountries[name] && G.currentYear < suppressedCountries[name]) return true
      if (name === 'France' && G.currentYear < 1952 && G.flags.includes('minority_language_speaker')) return true
      if (name === 'Wales' && G.currentYear < 1967) return true
      if (G.flags.includes('minority_language_speaker') && G.currentYear < 1970) return true
      return false
    },
    text: 'At school, speaking your language earns a punishment. In Wales, children wear a wooden board — the Welsh Not — and must pass it to the next child they hear speak Welsh. The last child wearing it at the end of the day is beaten. You learn to translate yourself without thinking about it.',
    choices: [
      {
        text: 'Stop speaking your language at school',
        tag: null,
        outcome: 'You become fluent in the official language. You also become practiced at silence.',
        effect: (p) => { p.e += 3; p.m -= 8; p.r += 5; p.setMem('language_punished', true); p.addFlag('suppressed_language') },
      },
      {
        text: 'Keep speaking it in secret with friends who understand',
        tag: null,
        outcome: 'The language survives in whispers. You are punished twice before the year is out.',
        effect: (p) => { p.e += 2; p.m -= 10; p.s += 2; p.setMem('language_punished', true); p.addFlag('suppressed_language') },
      },
    ],
    effect: null,
  },

  {
    id: 'language_catalan_franco',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Spain' &&
      G.currentYear >= 1939 && G.currentYear <= 1975 &&
      G.age >= 6 && G.age <= 14 &&
      G.flags.includes('minority_language_speaker') &&
      !G.mem?.catalan_suppressed,
    text: 'Catalan is banned. Not just at school — in books, in newspapers, in public. The language your parents speak at home does not exist officially. The sign on the shop says the same thing in Castilian now. Your teacher explains this without explaining it.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.e += 4
      p.r += 6
      p.setMem('catalan_suppressed', true)
      p.addFlag('suppressed_language')
    },
  },

  {
    id: 'language_code_switch',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.age >= 12 && G.age <= 20 &&
      (G.flags.includes('suppressed_language') || G.flags.includes('colonial_education') ||
        ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.character.country.archetype)) &&
      !G.mem?.code_switch,
    text: 'You think in one language and write in another. At home you are one person. At school you are a translation of that person. The gap between them is where you live now.',
    choices: null,
    effect: (p) => {
      p.e += 5
      p.s -= 3
      p.r += 5
      p.setMem('code_switch', true)
      p.addFlag('bicultural')
    },
  },

  {
    id: 'language_loss_grief',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.age >= 40 &&
      (G.flags.includes('suppressed_language') ||
        ['Wales', 'Ireland', 'Spain', 'Turkey', 'France'].includes(G.character.country.name)) &&
      !G.mem?.language_loss_grief,
    text: 'Your grandchildren do not speak the language your grandparents spoke. The last fluent speakers in the valley are in their eighties. When they die the language will exist only in recordings and academic papers. You are watching a way of thinking disappear.',
    choices: null,
    effect: (p) => {
      p.r += 10
      p.m -= 5
      p.setMem('language_loss_grief', true)
    },
  },

  {
    id: 'colonial_language_instruction',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      ['subsaharan', 'developing_urban'].includes(G.character.country.archetype) &&
      G.currentYear < 1980 &&
      G.age >= 6 && G.age <= 14 &&
      !G.mem?.colonial_education,
    text: 'The school teaches in French. Or English. Or Portuguese. Your mother tongue is not permitted in the classroom. You become fluent in a language that arrived here with colonizers and stayed when they left. Later you will understand this as a gift that was also a taking.',
    choices: null,
    effect: (p) => {
      p.e += 5
      p.r += 5
      p.setMem('colonial_education', true)
      p.addFlag('colonial_education')
    },
  },

  {
    id: 'reclaiming_language',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.age >= 30 && G.age <= 55 &&
      G.flags.includes('suppressed_language') &&
      !G.mem?.language_reclaimed,
    text: 'Your children are learning the language that was taken from your grandparents. The classes meet on Tuesday evenings in a community center. The word for what this is is revitalization. The word your grandmother used was survival.',
    choices: null,
    effect: (p) => {
      p.m += 8
      p.karma += 5
      p.e += 3
      p.setMem('language_reclaimed', true)
    },
  },

  // ── LANGUAGE AND IDENTITY — POSTCOLONIAL ──────────────────────────────────────

  {
    id: 'which_name',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      ['subsaharan', 'developing_urban', 'developing_unstable'].includes(G.character.country.archetype) &&
      G.age >= 13 && G.age <= 22 &&
      !G.mem?.dual_name,
    text: 'You have two names. The name your family uses and the name your school records use. Switching between them is automatic by now. You are not sure which one is more yours.',
    choices: null,
    effect: (p) => {
      p.s += 3
      p.r += 5
      p.setMem('dual_name', true)
      p.addFlag('dual_identity')
    },
  },

  {
    id: 'accent_discrimination',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.age >= 18 && G.age <= 35 &&
      (G.flags.includes('emigrated') || G.flags.includes('ethnic_minority')) &&
      !G.mem?.accent_navigation,
    text: 'The way you say certain words identifies where you are from in a way that closes some doors before you open them. You practice saying them differently. Sometimes you succeed. It costs something each time.',
    choices: null,
    effect: (p) => {
      p.s -= 3
      p.e += 2
      p.r += 5
      p.setMem('accent_navigation', true)
      p.addFlag('accent_navigation')
    },
  },

  // ── ADDITIONAL SOCIETY EVENTS ─────────────────────────────────────────────────

  {
    id: 'national_health_service_birth',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'United Kingdom' &&
      G.currentYear >= 1948 && G.currentYear <= 1950 &&
      G.age >= 16 &&
      !G.mem?.nhs_founded,
    text: 'The National Health Service begins. Aneurin Bevan opens Park Hospital in Manchester on the fifth of July. Anyone in the country can now see a doctor without paying at the door. People who have never been to a dentist go for the first time. The queues are enormous.',
    choices: null,
    effect: (p) => {
      p.m += 10
      p.h += 5
      p.setMem('nhs_founded', true)
      p.addFlag('nhs_generation')
    },
  },

  {
    id: 'women_drive_saudi',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.name === 'Saudi Arabia' &&
      G.currentYear >= 2018 && G.currentYear <= 2020 &&
      G.age >= 18 &&
      !G.mem?.saudi_drive,
    text: 'Women are now permitted to drive. You have had a car in the family for fifteen years. Your father and brothers have driven it. You take the keys on the morning the law takes effect and drive to the market alone for the first time.',
    choices: null,
    effect: (p) => {
      p.m += 15
      p.s += 3
      p.setMem('saudi_drive', true)
      p.addFlag('witnessed_womens_rights_change')
    },
  },

  {
    id: 'title_ix_era',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.name === 'United States' &&
      G.currentYear >= 1972 && G.currentYear <= 1976 &&
      G.age >= 14 && G.age <= 22 &&
      !G.mem?.title_ix,
    text: 'Title IX is passed. Educational institutions receiving federal funding cannot discriminate on the basis of sex. Women\'s sports programs begin to receive funding they were denied before. The girls\' soccer team gets a field. The change is practical before it is anything else.',
    choices: null,
    effect: (p) => {
      p.m += 8
      p.e += 3
      p.setMem('title_ix', true)
      p.addFlag('title_ix_generation')
    },
  },

  {
    id: 'mandatory_headscarf_iran',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.name === 'Iran' &&
      G.currentYear >= 1979 && G.currentYear <= 1981 &&
      G.age >= 14 &&
      !G.mem?.iran_headscarf_law,
    text: 'The new law requires women to cover their hair in public. Last year this was a choice. Now it is enforceable by the morality police. You adjust the cloth in the hallway mirror before leaving the house. You are not sure yet what this means about who you are allowed to be.',
    choices: null,
    effect: (p) => {
      p.m -= 10
      p.r += 8
      p.setMem('iran_headscarf_law', true)
    },
  },

  {
    id: 'apartheid_healthcare_separation',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'South Africa' &&
      G.currentYear >= 1948 && G.currentYear <= 1994 &&
      G.age >= 16 &&
      !G.mem?.apartheid_healthcare &&
      (G.flags.includes('ethnic_minority') || G.flags.includes('disadvantaged_ethnicity')),
    text: 'The hospital has separate entrances. Separate wards. You are directed to a wing that is less equipped and more crowded. The nurse who treats you is competent and overworked. The doctor is rarely here. You understand this is not an accident.',
    choices: null,
    effect: (p) => {
      p.h -= 5
      p.m -= 12
      p.r += 8
      p.setMem('apartheid_healthcare', true)
    },
  },

  {
    id: 'womens_suffrage_france_delayed',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.gender === 'female' &&
      G.character.country.name === 'France' &&
      G.currentYear >= 1944 && G.currentYear <= 1946 &&
      G.age >= 18 &&
      !G.mem?.france_womens_vote,
    text: 'French women vote for the first time in the municipal elections. France is late — later than most of the countries it considers its peers. The Assemblée has debated this since 1919. The debate has been about whether women were ready. You have been voting in your head for twenty-five years.',
    choices: null,
    effect: (p) => {
      p.m += 12
      p.e += 3
      p.r += 4
      p.setMem('france_womens_vote', true)
      p.addFlag('witnessed_womens_suffrage')
    },
  },

  {
    id: 'healthcare_rationing_austerity',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      ['wealthy_west', 'post_soviet'].includes(G.character.country.archetype) &&
      G.currentYear >= 2010 && G.currentYear <= 2020 &&
      G.age >= 35 &&
      !G.mem?.healthcare_austerity,
    text: 'The wait for your appointment is four months. The surgery that was scheduled has been pushed back twice. The hospital ward that used to handle this has been consolidated with another. You read in the newspaper that this is temporary. You have been reading that for three years.',
    choices: null,
    effect: (p) => {
      p.h -= 4
      p.m -= 6
      p.setMem('healthcare_austerity', true)
    },
  },

  {
    id: 'language_independence_restoration',
    phase: 'young_adult',
    weight: 4,
    when: (G) => {
      if (G.age < 16) return false
      if (G.mem?.language_independence) return false
      const restorationYears = {
        'Estonia': 1991,
        'Latvia': 1991,
        'Lithuania': 1991,
        'Czech Republic': 1993,
        'Slovakia': 1993,
        'Ukraine': 1991,
      }
      const year = restorationYears[G.character.country.name]
      if (!year) return false
      return G.currentYear >= year && G.currentYear <= year + 3
    },
    text: 'With independence, the national language returns to official life. Street signs are changed. Schools switch. Television broadcasts begin in the language that was here before. You grew up speaking it at home in a way that felt like a private act. Now it is simply the language of where you live.',
    choices: null,
    effect: (p) => {
      p.m += 12
      p.e += 3
      p.setMem('language_independence', true)
      p.addFlag('national_language_restored')
    },
  },

]
