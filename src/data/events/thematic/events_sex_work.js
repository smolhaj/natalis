// events_sex_work.js — The sex work arc (BUILD 33)
// Not sensationalized. Treated as labor with the same specificity applied to every other
// work system. Three entry tracks:
//   Survival: economic necessity or refugee camp (criminalized or no legal framework)
//   Tolerated grey zone: Thailand (tourist economy, police as variable, no legal standing)
//   Legalized: Netherlands (2000), Germany (2002), New Zealand (2003) — regulated, taxable
//
// The safety calculation gates on legal status. Police: sometimes protection, usually not.
// The exit arc — and the absence of it — closes the arc in late life.

const SW_CRIMINALIZED = (G) =>
  ['Nigeria', 'Uganda', 'Ethiopia', 'Bangladesh', 'Indonesia',
   'Cambodia', 'Myanmar', 'Philippines'].includes(G.currentCountry?.name) ||
  (G.currentCountry?.name === 'India' && G.currentYear < 1990)

const SW_TOLERATED = (G) =>
  G.currentCountry?.name === 'Thailand' ||
  (G.currentCountry?.name === 'India' && G.currentYear >= 1990)

const SW_LEGALIZED = (G) =>
  (G.currentCountry?.name === 'Netherlands' && G.currentYear >= 2000) ||
  (G.currentCountry?.name === 'Germany' && G.currentYear >= 2002) ||
  (G.currentCountry?.name === 'New Zealand' && G.currentYear >= 2003)

const SURVIVAL_CONTEXT = (G) =>
  (['very_low', 'low', 'low_medium'].includes(G.currentCountry?.gdp) && G.stats.wealth <= 20) ||
  ['refugee_status', 'asylum_seeker', 'undocumented'].includes(G.residencyStatus)

const FEMALE = (G) => G.character.gender === 'female'

export const SEX_WORK_EVENTS = [

  // ── ENTRY: SURVIVAL / ECONOMIC NECESSITY ─────────────────────────────────────
  // The decision, which is not a simple one but which often happens quickly
  // because the alternatives are not available slowly.

  {
    id: 'sw_entry_survival',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      FEMALE(G) &&
      SURVIVAL_CONTEXT(G) &&
      (SW_CRIMINALIZED(G) || G.residencyStatus === 'refugee_status' || G.residencyStatus === 'asylum_seeker') &&
      G.currentYear >= 1960 &&
      G.age >= 16 && G.age <= 30 &&
      !G.career &&
      !G.flags.has('sex_work_entry') &&
      !G.mem?.swEntry,
    text: (G) => G.residencyStatus === 'refugee_status' || G.residencyStatus === 'asylum_seeker'
      ? 'In the camp there is no work permit and no formal economy and therefore no wage. There is money in it — not the amount people outside the situation imagine, but money that arrives in cash, that evening, which is the only quality that matters. You know other women who do this. You have known them since you arrived, which means you also know that no one discusses it openly and that everyone knows.'
      : 'There is money in it. Not a large amount — the money is never what people outside imagine — but money that arrives in cash, the same evening, which is the only quality that matters when rent is owed and there is no other source. You know women who do this. You have known them your whole life, which means you also know what people say about them, and you have spent the last several weeks deciding whether what people say is a thing you can afford to care about.',
    choices: [
      {
        text: 'You take the work. The cash is real and the month is real.',
        tag: 'enter',
        outcome: 'The first time is the one that sets the shape of it. What you expected and what it is are not the same thing, which is true in both directions.',
        effect: (p) => { p.mo += 600; p.h -= 3; p.m -= 6; p.r += 6; p.addFlag('sex_work_entry'); p.addFlag('sw_criminalized_context'); p.setMem('swEntry', true) },
      },
      {
        text: 'You find another way. The cost of this particular solution is too high.',
        tag: 'refuse',
        outcome: 'Another way is harder to find than the phrase suggests. It takes months. Some of what it costs does not show on any account.',
        effect: (p) => { p.mo -= 300; p.h -= 4; p.m -= 3; p.r += 4; p.setMem('swEntry', true) },
      },
    ],
    effect: null,
  },

  // ── ENTRY: THAILAND / TOLERATED GREY ZONE ────────────────────────────────────
  // Not legal, not prosecuted, entirely visible, built into the tourist economy.
  // The police are not a consistent threat — they are an inconsistent one,
  // which is its own arithmetic.

  {
    id: 'sw_entry_tolerated',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      FEMALE(G) &&
      SW_TOLERATED(G) &&
      G.currentYear >= 1975 &&
      G.age >= 18 && G.age <= 32 &&
      !G.flags.has('sex_work_entry') &&
      !G.mem?.swEntry,
    text: 'The bar where you work is one of many bars on one of many streets in one of many towns that run on this economy. The municipality tolerates it. The police tolerate it. The tour operators who recommend this street tolerate it and include it in the category of local colour on the websites. Nobody has written the rules down because the rules that are written down say something different. You have learned to read the unwritten ones.',
    choices: [
      {
        text: 'You stay in the work. The money is better than anything else available.',
        tag: 'enter',
        outcome: 'The work becomes routine in the way all work becomes routine. The routinisation is a form of management.',
        effect: (p) => { p.mo += 700; p.m -= 4; p.r += 4; p.addFlag('sex_work_entry'); p.addFlag('sw_tolerated_context'); p.setMem('swEntry', true) },
      },
      {
        text: 'You leave the bar. This is not the economy you want to be part of.',
        tag: 'leave',
        outcome: 'You find other work. Less money. Less complicated.',
        effect: (p) => { p.m += 3; p.r += 2; p.setMem('swEntry', true) },
      },
    ],
    effect: null,
  },

  // ── ENTRY: LEGALIZED CONTEXT ─────────────────────────────────────────────────
  // Netherlands, Germany, New Zealand. Regulated, taxable, with a licensing office
  // and a health card. Stigma persists independently of legality.

  {
    id: 'sw_entry_legalized',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      SW_LEGALIZED(G) &&
      G.age >= 20 && G.age <= 34 &&
      !G.flags.has('sex_work_entry') &&
      !G.mem?.swEntry,
    text: (G) => G.currentCountry?.name === 'Netherlands'
      ? 'The licensing office is a converted row house. You register with your identity document, receive a health card, and are assigned a window — a time slot and a location. The municipality maintains the list. The list is accessible in the sense that it exists in a government database, not in the sense that anyone announces it. The work is taxable. A client can pay by PIN.'
      : 'The registration is administrative. You have employment rights here: the right to refuse a client, to set your own hours, to access the health system. These rights exist on paper and in practice in proportion to how clearly you know them and are willing to assert them, which varies.',
    choices: [
      {
        text: 'You register and begin. The legality removes some of what you expected to worry about.',
        tag: 'enter',
        outcome: 'The administrative clarity is real. The stigma exists in a different register from legality and is not resolved by legality.',
        effect: (p) => { p.mo += 900; p.m -= 2; p.r += 2; p.addFlag('sex_work_entry'); p.addFlag('sw_legalized_worker'); p.setMem('swEntry', true) },
      },
      {
        text: 'You consider it and decide against it. The legality helps but it does not resolve everything.',
        tag: 'decline',
        outcome: 'You find other work. The option existed. You chose not to take it.',
        effect: (p) => { p.m += 2; p.addFlag('sw_considered_sector'); p.setMem('swEntry', true) },
      },
    ],
    effect: null,
  },

  // ── THE DAILY CALCULATION: CRIMINALIZED ──────────────────────────────────────
  // The specific safety arithmetic of working in a country where the work is illegal.
  // This runs in the background of every shift.

  {
    id: 'sw_daily_criminalized',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('sex_work_entry') &&
      G.flags.has('sw_criminalized_context') &&
      G.age >= 17 && G.age <= 45 &&
      !G.mem?.swDailyCrim,
    text: 'The safety calculation happens before you decide anything else. Who knows where you are going and when to expect you back. Which streets the police patrol at which hours. Which clients you have seen before and what before means in this context — not safe, exactly, but a known quantity. You have built a system. The system is mostly invisible to anyone who hasn\'t built one like it. You maintain it the way you maintain any tool: constantly, without thinking about it, because the cost of not maintaining it is visible and the cost of the maintenance is just the cost of being here.',
    choices: null,
    effect: (p) => { p.h -= 2; p.r += 5; p.e += 3; p.setMem('swDailyCrim', true) },
  },

  // ── THE POLICE ────────────────────────────────────────────────────────────────
  // In criminalized contexts, the police are not a source of protection.
  // They are a variable in the safety calculation, usually on the wrong side of it.

  {
    id: 'sw_police_encounter',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('sex_work_entry') &&
      (G.flags.has('sw_criminalized_context') || G.flags.has('sw_tolerated_context')) &&
      G.age >= 17 && G.age <= 50 &&
      !G.mem?.swPolice,
    text: 'The officer is not arresting you. He is not required to arrest you to make the situation clear. He wants money — or he wants something else that he has the power to require — and the law that makes what you do criminal is what gives him that power. He knows this. You know this. The knowing does not change anything about the situation except that it removes the possibility of being surprised.',
    choices: [
      {
        text: 'Pay what he asks. This is the cost of operating in this context.',
        tag: 'pay',
        outcome: 'He takes the money and leaves. You add this to the accounting. The accounting does not end.',
        effect: (p) => { p.mo -= 250; p.r += 5; p.addFlag('sw_police_extorted'); p.setMem('swPolice', true) },
      },
      {
        text: 'Refuse. You know people who have refused and survived it.',
        tag: 'refuse',
        outcome: 'The refusal has consequences that take days to resolve. You survive them. The cost was higher than the payment would have been.',
        effect: (p) => { p.h -= 5; p.m -= 8; p.r += 8; p.addFlag('sw_police_extorted'); p.setMem('swPolice', true) },
      },
    ],
    effect: null,
  },

  // ── THE REGULAR CLIENT ────────────────────────────────────────────────────────
  // He comes every Tuesday. He is not unkind, which creates a specific problem.

  {
    id: 'sw_regular_client',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.flags.has('sex_work_entry') &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.swRegular,
    text: 'He comes every week, or every two weeks — regular enough that you know his schedule, remember his preferences, understand the particular version of himself he brings here and the version he does not. He is not unkind. He asks about your week. He remembers the name you use. He does not make things difficult. You have had time to think about what the version that does not make things difficult means, in this particular economy of exchange, and the thinking does not fully resolve into a simple feeling.',
    choices: null,
    effect: (p) => { p.m -= 3; p.r += 6; p.e += 2; p.addFlag('sw_regular_client_known'); p.setMem('swRegular', true) },
  },

  // ── FAMILY KNOWS ─────────────────────────────────────────────────────────────
  // The social weight of stigma is independent of legality.
  // The question is whether to carry it alone or share it.

  {
    id: 'sw_family_knows',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.flags.has('sex_work_entry') &&
      G.age >= 19 && G.age <= 40 &&
      !G.mem?.swFamily,
    text: 'Your mother — or your sister, or the aunt you are close to — does not ask directly. The way she does not ask is the question. The question has been in the room for months, possibly longer. You are both managing around it, which takes more effort than either of the alternatives.',
    choices: [
      {
        text: 'Deny it. Let her have the version that costs her less.',
        tag: 'deny',
        outcome: 'She accepts the version. The management continues. You become expert at maintaining the version.',
        effect: (p) => { p.m -= 5; p.s -= 2; p.r += 4; p.addFlag('sw_stigma_denied'); p.setMem('swFamily', true) },
      },
      {
        text: 'Tell her. Some things cost more to hide than to say.',
        tag: 'tell',
        outcome: 'The conversation is not easy. It does not resolve cleanly. It is also, finally, honest, which changes what the relationship can be.',
        effect: (p) => { p.m += 3; p.r += 3; p.addFlag('sw_stigma_handled'); p.setMem('swFamily', true) },
      },
    ],
    effect: null,
  },

  // ── THE EXIT OPPORTUNITY ──────────────────────────────────────────────────────
  // A chance to leave the sector. Exit is available in theory.
  // In practice it requires bridging a money gap that is specific and not abstract.

  {
    id: 'sw_exit_opportunity',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.flags.has('sex_work_entry') &&
      !G.flags.has('sw_exited') &&
      G.age >= 27 && G.age <= 50 &&
      !G.mem?.swExit,
    text: 'There is a training programme — a vocational certification, a restaurant job that pays decently, a man who has offered something more stable, a city that might be far enough away that no one knows. Every exit that presents itself comes with a condition attached: a period without income while you retrain, a debt to clear first, a dependent who cannot wait, a window that may or may not still be open when you are ready for it.',
    choices: [
      {
        text: 'Take the opportunity. Manage the income gap somehow.',
        tag: 'exit',
        outcome: 'The first six months are the hardest financially. You manage. The work becomes something that was, not something that is.',
        effect: (p) => { p.m += 8; p.mo -= 400; p.r += 4; p.addFlag('sw_exited'); p.setMem('swExit', true) },
      },
      {
        text: 'You cannot afford to stop right now. The gap between what this pays and what the alternative pays is real.',
        tag: 'stay',
        outcome: 'The window closes or stays open — you cannot tell which. You stay in the work. Later becomes the word you use for the exit that keeps not arriving.',
        effect: (p) => { p.mo += 400; p.m -= 5; p.r += 5; p.addFlag('sw_exit_declined'); p.addFlag('sw_long_term_worker'); p.setMem('swExit', true) },
      },
    ],
    effect: null,
  },

  // ── LONG-TERM: STILL HERE ─────────────────────────────────────────────────────
  // The character who did not exit. What the sector looks like from inside,
  // a decade later.

  {
    id: 'sw_long_term',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.flags.has('sex_work_entry') &&
      !G.flags.has('sw_exited') &&
      G.age >= 36 &&
      !G.mem?.swLongTerm,
    text: 'You have been doing this work for a decade, or twelve years, or fifteen. The arithmetic has shifted: you are better paid than you were when you started, because time teaches you who to take and who to avoid and how to set the terms, and that knowledge is worth something even in this economy. The social world of the work — the other women, the rhythms, the specific body of knowledge about this industry — is the primary knowledge you have about how work operates. You are good at it. Good is a complicated word for it, but it is accurate.',
    choices: null,
    effect: (p) => { p.h -= 4; p.r += 7; p.e += 4; p.addFlag('sw_long_term_worker'); p.setMem('swLongTerm', true) },
  },

  // ── LATE-LIFE RECKONING ───────────────────────────────────────────────────────
  // What the years mean, at a distance from them.

  {
    id: 'sexwork_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('sex_work_entry') &&
      G.age >= 55 &&
      !G.mem?.swLateReckoning,
    text: 'The years are the years they were. What you make of them now is different from what you made of them at thirty, which is different from what you made of them at forty-five. The work was work — in the sense that it paid, that it required skill, that it had its own social world and its own exhaustions and its own forms of expertise. It was also not only work. The specific loneliness of it — the one that was not about being alone but about what could not be said to anyone outside it — is something you no longer try to translate. Some experiences do not translate. That is not the same as saying they did not happen.',
    choices: null,
    effect: (p) => { p.e += 4; p.r += 5; p.m += 3; p.setMem('swLateReckoning', true) },
  },

]
