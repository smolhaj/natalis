// events_post_soviet.js
// Personal-level post-Soviet arc events.
// Communist childhood, 1990s collapse, oligarch split, emigration wave.
// Fires for post_soviet archetype characters across relevant phases.

export const POST_SOVIET_EVENTS = [

  // ── COMMUNIST CHILDHOOD ──────────────────────────────────────────────────────

  {
    id: 'ps_pioneer_induction',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      !G.mem.psPioneerInduction &&
      G.character.country.archetype === 'post_soviet' &&
      G.currentYear >= 1950 && G.currentYear <= 1989 &&
      G.age >= 9 && G.age <= 11,
    text: (G) => {
      const country = G.character.country.name
      if (['Estonia', 'Latvia', 'Lithuania'].includes(country)) {
        return 'You are inducted into the Young Pioneers at school. The red neckerchief is tied by a teacher who explains what it means to be a builder of Communism. The ceremony is the same as in Moscow. At home, your grandmother says nothing about it. Her silence is its own comment.'
      }
      if (country === 'Poland' || country === 'Czech Republic' || country === 'Hungary') {
        return 'The school induction into the youth organization is mandatory. You wear the uniform and recite the pledge. The pledge is translated from Russian. Everyone knows this. No one says it.'
      }
      return 'The day you join the Young Pioneers, your mother ties the red neckerchief herself. She was a Pioneer too. You learn the pledge — to live, study and struggle — and for a while you mean it. The future the pledge describes feels real. You are going to build it.'
    },
    choices: [
      {
        text: 'Believe in it — you mean the pledge',
        tag: null,
        outcome: 'The certainty is warm while it lasts. Later you will remember what it felt like to know what the future was going to be.',
        effect: (p) => { p.m += 5; p.e += 3; p.addFlag('communist_childhood'); p.setMem('psPioneerInduction', true) },
      },
      {
        text: 'Go through the motions — the neckerchief is just fabric',
        tag: null,
        outcome: 'You learn early the gap between the ceremony and the thing the ceremony is for.',
        effect: (p) => { p.e += 4; p.addFlag('communist_childhood'); p.setMem('psPioneerInduction', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ps_space_optimism',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      !G.mem.psSpaceOptimism &&
      G.character.country.archetype === 'post_soviet' &&
      G.currentYear >= 1961 && G.currentYear <= 1975 &&
      G.age >= 7,
    text: 'The teacher stops the lesson to make an announcement. A Soviet cosmonaut has done something — orbited the earth, or walked in space, or set a record that does not matter except that it proves the future is ours. You go home and draw a rocket. The rocket is going somewhere specific, even if you cannot name the destination. The century feels like it belongs to you.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 5; p.addFlag('communist_childhood'); p.addFlag('space_age_optimism'); p.setMem('psSpaceOptimism', true) },
  },

  {
    id: 'ps_five_year_plan',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.psFiveYearPlan &&
      G.character.country.archetype === 'post_soviet' &&
      G.currentYear >= 1960 && G.currentYear <= 1985 &&
      G.age >= 18,
    text: 'You are assigned your position. The job assignment comes from the state, which consulted your aptitude scores and the needs of the Five Year Plan. The work is not what you would have chosen. It is also guaranteed for life, which is not nothing. Your grandmother\'s generation had nothing guaranteed. You sign the papers.',
    choices: [
      {
        text: 'Accept the assignment — security matters',
        tag: null,
        outcome: 'The work becomes the rhythm of the week. The rhythm becomes the life.',
        effect: (p) => { p.m -= 4; p.w += 6; p.addFlag('communist_childhood'); p.setMem('psFiveYearPlan', true) },
      },
      {
        text: 'Try to change the assignment through the system',
        tag: null,
        outcome: 'The system considers your request for several months and arrives at the same answer.',
        effect: (p) => { p.m -= 6; p.w += 3; p.addFlag('communist_childhood'); p.setMem('psFiveYearPlan', true) },
      },
    ],
    effect: null,
  },

  // ── 1990s PERSONAL COLLAPSE ──────────────────────────────────────────────────

  {
    id: 'ps_factory_closure',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem.psFactoryClosure &&
      G.character.country.archetype === 'post_soviet' &&
      G.currentYear >= 1991 && G.currentYear <= 1998 &&
      G.age >= 18 && G.age <= 45 &&
      G.career &&
      ['factory_worker', 'engineer', 'technician', 'machinist'].some(c => G.career?.id?.includes(c) || G.career?.field === 'manufacturing'),
    text: (G) => {
      const year = G.currentYear
      if (year <= 1992) {
        return 'The factory notice is posted at the gate. The enterprise has been privatised. The new owners have determined that your entire department is redundant. You have three weeks\' severance. The number on the notice, converted to roubles, is what a loaf of bread cost six months ago. The word for what has happened does not exist yet in your vocabulary. It will.'
      }
      return 'The factory has been closed for eight months now. You heard someone bought the building. The equipment went east — to China, the rumor says, or to Turkey. Your colleagues are scattered. Some are driving taxis. One sells things at the market. None of you talk about what you used to do. The vocabulary of it feels like it belongs to a different language.'
    },
    choices: [
      {
        text: 'Find work in the new economy — whatever that means',
        tag: null,
        outcome: 'The transition is undignified and takes longer than you expected. You develop skills you did not know you needed.',
        effect: (p) => { p.w -= 10; p.m -= 8; p.addFlag('post_soviet_collapse'); p.setMem('psFactoryClosure', true) },
      },
      {
        text: 'Use your connections — someone knows someone',
        tag: null,
        outcome: 'The informal economy runs on relationships. You are not without them.',
        effect: (p) => { p.w -= 5; p.m -= 5; p.s += 4; p.addFlag('post_soviet_collapse'); p.addFlag('used_connections'); p.setMem('psFactoryClosure', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ps_savings_wiped',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      !G.mem.psSavingsWiped &&
      G.character.country.archetype === 'post_soviet' &&
      G.currentYear >= 1992 && G.currentYear <= 1994 &&
      G.age >= 20,
    text: (G) => {
      const country = G.character.country.name
      if (['Estonia', 'Latvia', 'Lithuania'].includes(country)) {
        return 'The Baltic states are introducing their own currencies. The exchange rate wipes out savings held in roubles — which is to say, all savings. Your parents had been putting money aside since 1978. The account exists. The number in it no longer corresponds to anything purchasable.'
      }
      return 'The prices are written in chalk at the market stall. Your mother sends you for bread. By the time you arrive, the price has been changed. You have enough for one loaf where yesterday you would have bought three. The savings account your father has been building since before you were born will not, at the current rate of inflation, cover a month\'s groceries by summer. The certainty that was supposed to be the reward for a Soviet life is gone before it could be spent.'
    },
    choices: [
      {
        text: 'Convert whatever remains to hard currency or goods',
        tag: null,
        outcome: 'The things you can hold do not inflate. The lesson is not forgotten.',
        effect: (p) => { p.w -= 12; p.m -= 8; p.e += 3; p.addFlag('post_soviet_collapse'); p.addFlag('savings_wiped_hyperinflation'); p.setMem('psSavingsWiped', true) },
      },
      {
        text: 'Wait — surely this cannot continue',
        tag: null,
        outcome: 'It continues.',
        effect: (p) => { p.w -= 18; p.m -= 12; p.addFlag('post_soviet_collapse'); p.addFlag('savings_wiped_hyperinflation'); p.setMem('psSavingsWiped', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ps_sudden_poverty',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.psSuddenPoverty &&
      G.character.country.archetype === 'post_soviet' &&
      G.currentYear >= 1991 && G.currentYear <= 1997 &&
      G.flags.includes('post_soviet_collapse') &&
      G.age >= 25 && G.age <= 50,
    text: 'You had a profession. You had a salary. You had, in the specific way the Soviet system promised it, a place. The place does not exist anymore. What is difficult is not the poverty itself — poverty has a practical logic — but the shame. The shame of having had and then not having. Of not knowing the vocabulary of need because you were never meant to need. Of being new to the queue at the food bank and recognizing the person in front of you from work.',
    choices: [
      {
        text: 'Accept help when it is offered',
        tag: null,
        outcome: 'The dignity of accepting turns out to be harder than the dignity of asking.',
        effect: (p) => { p.m -= 8; p.s += 3; p.addFlag('post_soviet_shame'); p.setMem('psSuddenPoverty', true) },
      },
      {
        text: 'Refuse — manage alone, whatever it takes',
        tag: null,
        outcome: 'The management is improvised and mostly works. The pride is intact in a way that is both correct and costly.',
        effect: (p) => { p.m -= 12; p.r += 8; p.e += 3; p.addFlag('post_soviet_shame'); p.setMem('psSuddenPoverty', true) },
      },
    ],
    effect: null,
  },

  // ── OLIGARCH SPLIT ───────────────────────────────────────────────────────────

  {
    id: 'ps_privatisation_opportunity',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      !G.mem.psPrivatisationOpportunity &&
      G.character.country.archetype === 'post_soviet' &&
      G.currentYear >= 1992 && G.currentYear <= 1997 &&
      G.age >= 25 && G.age <= 45 &&
      (G.stats.wealth > 55 || G.flags.includes('used_connections') || G.career?.field === 'finance' || G.career?.field === 'management'),
    text: 'Someone in the privatisation agency owes your contact a favour. The state enterprise being auctioned is worth, by conservative estimate, several hundred times what the auction will clear. The vouchers can be acquired. The mechanism is not illegal because the laws have not yet been written. Whether it will become illegal, retrospectively, is a political question. You have forty-eight hours to decide.',
    choices: [
      {
        text: 'Take the opportunity',
        tag: null,
        outcome: 'The asset is acquired. What follows is a decade of defending what you took in the moment before the rules existed.',
        effect: (p) => { p.w += 25; p.mo += 15000; p.m -= 5; p.r += 10; p.addFlag('oligarch_path'); p.addFlag('post_soviet_wealth'); p.setMem('psPrivatisationOpportunity', true) },
      },
      {
        text: 'Decline — this is not something you can live with',
        tag: null,
        outcome: 'Someone else takes it. You watch them become someone you no longer recognise. The money does not trouble you. What it did to the person does.',
        effect: (p) => { p.m -= 4; p.karma += 8; p.addFlag('declined_oligarch'); p.setMem('psPrivatisationOpportunity', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ps_oligarch_cost',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      !G.mem.psOligarchCost &&
      G.flags.includes('oligarch_path') &&
      G.currentYear >= 1999 && G.currentYear <= 2010,
    text: 'The asset you took in the nineties has appreciated enormously. It has also required: a private security team, a change of address you do not publicise, the disappearance from your social world of anyone who knew you when you took nothing. The state has changed its position on what was legal in the nineties three times. You have a lawyer who tracks this as his primary professional activity. There are men who own less than you who sleep better.',
    choices: [
      {
        text: 'Protect the asset — this is how the game works',
        tag: null,
        outcome: 'The protection costs what it costs. You do not ask about the methods.',
        effect: (p) => { p.m -= 8; p.r += 12; p.addFlag('post_soviet_wealth'); p.setMem('psOligarchCost', true) },
      },
      {
        text: 'Find a way to distribute some of it — philanthropy, legitimacy',
        tag: null,
        outcome: 'The foundation you establish is real. It does not erase what it was built on. It does something for people who need it, which is also real.',
        effect: (p) => { p.m += 4; p.karma += 12; p.mo -= 5000; p.setMem('psOligarchCost', true) },
      },
    ],
    effect: null,
  },

  // ── EMIGRATION WAVE ──────────────────────────────────────────────────────────

  {
    id: 'ps_jewish_emigration',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.psJewishEmigration &&
      G.character.country.archetype === 'post_soviet' &&
      G.currentYear >= 1989 && G.currentYear <= 1999 &&
      G.religion === 'jewish' &&
      G.age >= 18,
    text: 'The Law of Return means that Israel will accept you. The Soviet state always categorised you as Jewish, which was sometimes useful and mostly not. Now the same category that put a ceiling above you opens a door west. The question is whether you go through it. One million Soviet Jews have already made the decision. The train station looks the same as it always did and nothing about it is the same.',
    choices: [
      {
        text: 'Leave — Israel, Germany, anywhere that will take you',
        tag: null,
        outcome: 'The departure is not heroic. It is practical and irreversible and the right decision, which you will spend years explaining to yourself.',
        effect: (p) => { p.m -= 5; p.addFlag('emigrated'); p.addFlag('post_soviet_emigrant'); p.setResidency('permanent_resident'); p.setMem('psJewishEmigration', true) },
      },
      {
        text: 'Stay — this country is still yours',
        tag: null,
        outcome: 'The claim is true. The cost of the claim is what everyone who stayed is calculating.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('stayer'); p.setMem('psJewishEmigration', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ps_german_heritage_emigration',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.psGermanEmigration &&
      G.character.country.archetype === 'post_soviet' &&
      G.currentYear >= 1989 && G.currentYear <= 2000 &&
      G.ethnicity === 'german_russian' &&
      G.age >= 18,
    text: 'The Spätaussiedler programme allows ethnic Germans in the former Soviet Union to emigrate to Germany. Your great-grandparents came east with Catherine the Great\'s settlement scheme. For two hundred years the family kept the language, the recipes, the sense of being from somewhere else. Germany says this is enough. You have an apartment waiting in Stuttgart or Cologne. The country you were born in is dissolving. The country your ancestors came from is calling you back.',
    choices: [
      {
        text: 'Accept — go to Germany',
        tag: null,
        outcome: 'Germany is both what you expected and nothing like it. The Germans call you Russian. The Russians always called you German. You arrive somewhere that has a place for you on paper.',
        effect: (p) => { p.m -= 6; p.addFlag('emigrated'); p.addFlag('post_soviet_emigrant'); p.setResidency('permanent_resident'); p.setMem('psGermanEmigration', true) },
      },
      {
        text: 'Stay — Germany is a name, not a place you know',
        tag: null,
        outcome: 'The offer is not rescinded. It waits. Some years it is easier to not think about it than others.',
        effect: (p) => { p.m -= 3; p.r += 4; p.addFlag('stayer'); p.setMem('psGermanEmigration', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ps_professional_emigration',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      !G.mem.psProfessionalEmigration &&
      G.character.country.archetype === 'post_soviet' &&
      G.currentYear >= 1992 && G.currentYear <= 2002 &&
      G.stats.smarts > 65 &&
      G.age >= 22 && G.age <= 35 &&
      !G.flags.includes('emigrated'),
    text: (G) => {
      const country = G.character.country.name
      if (['Estonia', 'Latvia', 'Lithuania'].includes(country)) {
        return 'The EU is not yet open but Finland and Sweden are. An engineering company in Helsinki sent a letter through a contact. The salary is twelve times what you earn here. The decision is not difficult. The guilt about leaving is.'
      }
      return 'You have a degree in mathematics or engineering or medicine. In the country you live in now, the degree guarantees nothing except poverty with credentials. In New York or Toronto or Berlin, the credential is worth something real. You have a cousin who has already gone. The brain drain the newspapers write about is, from the inside, just individual people making the only rational decision available to them.'
    },
    choices: [
      {
        text: 'Go — take the offer',
        tag: null,
        outcome: 'The first years are disorienting in ways you did not prepare for. The credential is accepted but you are not, quite, a person yet in the new city. This changes, slowly.',
        effect: (p) => { p.w += 8; p.m -= 4; p.addFlag('emigrated'); p.addFlag('post_soviet_emigrant'); p.addFlag('qualified_emigrant'); p.setResidency('work_visa'); p.setMem('psProfessionalEmigration', true) },
      },
      {
        text: 'Stay — someone has to rebuild this country',
        tag: null,
        outcome: 'The conviction is genuine. The watching of colleagues leave, one by one, tests it regularly.',
        effect: (p) => { p.m -= 5; p.e += 4; p.r += 3; p.addFlag('stayer'); p.addFlag('stayed_to_rebuild'); p.setMem('psProfessionalEmigration', true) },
      },
    ],
    effect: null,
  },

  // ── FOLLOW-THROUGH: WHAT COMMUNIST CHILDHOOD BECOMES ────────────────────────

  {
    id: 'ps_communist_nostalgia',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem.psCommunistNostalgia &&
      G.flags.includes('communist_childhood') &&
      G.currentYear >= 1995 &&
      G.age >= 35,
    text: 'Your niece asks what it was like. She is twenty-two and has grown up in a country that does not remember being another country. You try to explain the certainty — not the freedom, which there was not, but the certainty that there would be a job and an apartment and a pension and a place. She listens politely. The thing you are describing does not translate into the present tense. You are not sure it should.',
    choices: [
      {
        text: 'Tell her what was good about it honestly',
        tag: null,
        outcome: 'She is surprised you are honest about the good parts. The conversation is better for it.',
        effect: (p) => { p.m += 4; p.s += 3; p.setMem('psCommunistNostalgia', true) },
      },
      {
        text: 'Tell her it was a lie, start to finish',
        tag: null,
        outcome: 'That is also partly true. The part that is not true sits with you afterward.',
        effect: (p) => { p.m -= 3; p.r += 5; p.setMem('psCommunistNostalgia', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ps_returning_emigrant',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      !G.mem.psReturningEmigrant &&
      G.flags.includes('post_soviet_emigrant') &&
      G.currentYear >= 2000 &&
      G.age >= 35 && G.age <= 55,
    text: 'You go back for a week. The airport is different — there are advertisements now. The city has a new layer over the old layer. People you know have aged or left or prospered or not. The friend who stayed and runs a small business looks at you the way you look at them: measuring, comparing, unsure. You are both correct that the other made a different kind of sense.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 6; p.addFlag('returned_to_visit'); p.setMem('psReturningEmigrant', true) },
  },

]
