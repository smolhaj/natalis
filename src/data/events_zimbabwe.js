// Zimbabwe arc events — land reform, Mugabe era, hyperinflation, exodus
// Both perspectives: white farming family AND Black Zimbabwean experience

export const ZIMBABWE_EVENTS = [

  // ── LAND REFORM ───────────────────────────────────────────────────────────

  {
    id: 'zim_land_seizure_white',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Zimbabwe' &&
      G.currentYear >= 2000 && G.currentYear <= 2005 &&
      (G.ethnicity === 'white_zimbabwean' || G.flags.includes('white_zimbabwean')) &&
      !G.mem?.zimLandSeizure,
    text: 'The farm has been in the family for fifty years. The letter arrives telling you that it has been designated for resettlement under the Fast Track Land Reform Programme. Your workers — some of them were born here — ask what happens now. You have no answer. The police presence at the district office makes clear that contesting the designation is not advisable. Your father built the irrigation system. Your children were born in the house.',
    choices: [
      {
        text: 'Leave — take what you can and go',
        tag: null,
        outcome: 'You leave for South Africa or the UK, carrying what fit in two cars. The farm reverts to the state. You learn later that a party official received it. The irrigation system fell into disrepair within three years.',
        effect: (p) => { p.m -= 22; p.mo -= 15000; p.w -= 12; p.addFlag('white_zimbabwean_exile'); p.setResidency('work_visa'); p.setMem('zimLandSeizure', true); },
      },
      {
        text: 'Try to negotiate — there may be a compensation process',
        tag: null,
        outcome: 'The compensation process exists on paper. The amounts offered are a fraction of the land value, paid in Zimbabwe dollars that are depreciating daily. You eventually leave.',
        effect: (p) => { p.m -= 18; p.mo -= 8000; p.w -= 10; p.addFlag('white_zimbabwean_stayed'); p.setMem('zimLandSeizure', true); },
      },
    ],
  },

  {
    id: 'zim_land_reform_black',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Zimbabwe' &&
      G.currentYear >= 2000 && G.currentYear <= 2008 &&
      G.ethnicity !== 'white_zimbabwean' && !G.flags.includes('white_zimbabwean') &&
      !G.mem?.zimLandReform,
    text: 'The land reform was announced as redistribution — the land taken from white farmers returned to the people it was taken from. In practice, the farms went to war veterans and ZANU-PF officials. Your family is not on the list. The commercial farms that fed the region are now unproductive, their irrigation abandoned, their equipment stripped. The maize that used to be in the market is not there anymore. The price of the maize that remains is something else.',
    choices: null,
    effect: (p) => { p.m -= 12; p.mo -= 500; p.addFlag('zim_land_reform_witness'); p.setMem('zimLandReform', true); },
  },

  // ── HYPERINFLATION ────────────────────────────────────────────────────────

  {
    id: 'zim_hyperinflation',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Zimbabwe' &&
      G.currentYear >= 2006 && G.currentYear <= 2009 &&
      !G.mem?.zimInflation,
    text: 'The note in your hand says one hundred trillion Zimbabwe dollars. It was printed last month. It will not buy a loaf of bread. You do your shopping in the morning, before prices change again. The bank has stopped accepting cash after a certain hour. The word *inflation* does not describe this — inflation is when things become more expensive. This is when numbers stop meaning what they say. People carry cash in wheelbarrows and settle transactions in US dollars or South African rand. Teachers, nurses, police officers — the state salary is a symbolic gesture.',
    choices: [
      {
        text: 'Deal in foreign currency — everyone does now',
        tag: null,
        outcome: 'The parallel economy runs on dollars you source where you can. The legal economy has effectively ceased to function.',
        effect: (p) => { p.m -= 14; p.mo -= 2000; p.addFlag('zim_hyperinflation_generation'); p.setMem('zimInflation', true); },
      },
      {
        text: 'Stay on the formal economy as long as possible',
        tag: null,
        outcome: 'The formal economy stops working before you do. You lose most of what you held in the local currency.',
        effect: (p) => { p.m -= 18; p.wipeMoney(0.6); p.addFlag('zim_hyperinflation_generation'); p.setMem('zimInflation', true); },
      },
    ],
  },

  // ── EXODUS ────────────────────────────────────────────────────────────────

  {
    id: 'zim_exodus_south',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Zimbabwe' &&
      G.currentYear >= 2003 && G.currentYear <= 2012 &&
      !G.mem?.zimExodus,
    text: 'Three million Zimbabweans are in South Africa by now, a million in the UK, hundreds of thousands in Botswana and Zambia. The people who are leaving are not the ones the government describes as leaving — they are teachers, nurses, civil engineers, accountants. They are the people the country was built to train and who the country can no longer pay. You know at least five families who have gone. The conversation with your own family is overdue.',
    choices: [
      {
        text: 'Leave — join the Zimbabwean diaspora in South Africa',
        tag: null,
        outcome: 'Johannesburg has a Zimbabwean district, Zimbabwean churches, Zimbabwean food if you know where. You arrive into it. The xenophobic violence of 2008 has not yet happened. You find work below your qualification and send money home.',
        effect: (p) => { p.m -= 10; p.addFlag('zim_diaspora'); p.addFlag('emigrated'); p.setResidency('undocumented'); p.setMem('zimExodus', true); },
      },
      {
        text: 'Stay — this is your country',
        tag: null,
        outcome: 'You stay and watch the people around you leave. What remains requires a specific kind of commitment to keep working.',
        effect: (p) => { p.m -= 8; p.karma += 6; p.addFlag('stayed_when_others_left'); p.setMem('zimExodus', true); },
      },
    ],
  },

  // ── MUGABE ERA TEXTURE ────────────────────────────────────────────────────

  {
    id: 'zim_mugabe_early',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Zimbabwe' &&
      G.currentYear >= 1980 && G.currentYear <= 1992 &&
      !G.mem?.zimEarlyEra,
    text: 'Independence came in 1980 and the first decade is genuinely better than what came before. The schools build. The clinics open. A child who would not have been educated under Rhodesia goes to school now. The economy works. The word "liberation" is not ironic yet. You grow up in a country that is, by most measures, functioning — and this is itself a new thing.',
    choices: null,
    effect: (p) => { p.m += 8; p.e += 5; p.addFlag('zimbabwe_independence_generation'); p.setMem('zimEarlyEra', true); },
  },

  {
    id: 'zim_gukurahundi',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Zimbabwe' &&
      G.currentYear >= 1983 && G.currentYear <= 1987 &&
      G.character.ruralUrban === 'rural' &&
      (G.ethnicity === 'ndebele' || G.flags.includes('ndebele_matabeleland')) &&
      !G.mem?.zimGukurahundi,
    text: 'The North Korean-trained Fifth Brigade has been deployed in Matabeleland. The word *gukurahundi* is Shona: the rain that washes away the chaff. Twenty thousand Ndebele people are killed in four years. The village does not discuss it. The silence is the kind that comes from being in a country where the government has done something and has decided that it did not happen.',
    choices: null,
    effect: (p) => { p.m -= 22; p.h -= 8; p.addFlag('gukurahundi_generation'); p.setMem('zimGukurahundi', true); },
  },

  // ── OPERATION MURAMBATSVINA 2005 ─────────────────────────────────────────

  {
    id: 'zim_murambatsvina',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Zimbabwe' &&
      G.currentYear >= 2005 && G.currentYear <= 2006 &&
      !G.mem?.zimMurambatsvina,
    text: 'Operation Restore Order. Seven hundred thousand people lose their homes, their livelihoods, or both in two months. The informal market stalls are demolished. The backyard extensions are torn down. The government says it is clearing slums. What it is also clearing is the urban informal economy, and the people whose political independence can be managed by making them mobile and desperate. You know three families whose situations change overnight.',
    choices: null,
    effect: (p) => { p.m -= 12; p.mo -= 600; p.addFlag('murambatsvina_witness'); p.setMem('zimMurambatsvina', true); },
  },

  // ── MUGABE FALL 2017 ─────────────────────────────────────────────────────

  {
    id: 'zim_mugabe_fall_2017',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Zimbabwe' &&
      G.currentYear >= 2017 && G.currentYear <= 2018 &&
      G.age >= 25 &&
      !G.mem?.zimMugabeFall,
    text: 'The generals issue a statement. They do not call it a coup. The army surrounds the state broadcaster and the president is on television, wearing a suit, looking at a speech he does not appear to have written. He resigns on the nineteenth. People dance in the streets of Harare in a way they have not danced in years. What comes next is not yet clear, which feels, for now, like enough.',
    choices: null,
    effect: (p) => { p.m += 10; p.addFlag('zim_mugabe_era_end'); p.setMem('zimMugabeFall', true); },
  },

  // ── FOLLOW-THROUGHS ──────────────────────────────────────────────────────

  {
    id: 'zim_gukurahundi_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('gukurahundi_generation') &&
      G.age >= 55 &&
      !G.mem?.zimGukurahundiLate,
    text: 'The commissions talk about it now. Some survivors speak publicly. The word has entered the historical record. What has not entered the record is the particular texture of the silence that followed — how long it lasted, how many people maintained it, what that maintaining required.',
    choices: null,
    effect: (p) => { p.r += 5; p.karma += 3; p.setMem('zimGukurahundiLate', true); },
  },

  {
    id: 'zim_hyperinflation_late',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.flags.has('zim_hyperinflation_generation') &&
      G.currentYear >= 2015 &&
      G.age >= 50 &&
      !G.mem?.zimHyperinflationLate,
    text: 'The Zimbabwe dollar was discontinued in 2015. You remember what it was to carry numbers so large they became abstract. Younger people did not experience it, which means you sometimes have to explain that no, it was not primarily funny. The hundred-trillion-dollar note is for sale as a souvenir on the internet. That is a thing you know how to feel about.',
    choices: null,
    effect: (p) => { p.r += 3; p.setMem('zimHyperinflationLate', true); },
  },

]
