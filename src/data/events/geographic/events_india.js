// India character events
// Historical arcs: Emergency 1975-77 (Indira Gandhi), 1984 Sikh massacre,
// Babri Masjid 1992, economic liberalization 1991, Pokhran nuclear tests 1998,
// Gujarat riots 2002
// Note: caste system events (school denial, well, intercaste marriage, reservation)
// already exist in events_historical.js

export const INDIA_EVENTS = [

  {
    id: 'ind_emergency_1975',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.currentYear >= 1975 && G.currentYear <= 1977 &&
      G.age >= 18 &&
      !G.mem.indEmergency,
    text: 'June 26, 1975. Indira Gandhi declares an emergency: the opposition arrested overnight, the newspapers censored, the constitution suspended. Then the twenty-point programme, the sterilisation quotas, the slums bulldozed, and Sanjay running things from a position he does not hold. You are living inside the bracket Indian democracy put around itself.',
    choices: [
      {
        text: 'You adapt to the new constraints. Most people do.',
        tag: null,
        outcome: 'The Emergency lasts twenty-one months. Indira Gandhi calls elections, loses, and is voted back in three years later. The parenthesis closes. The country does not fully process what was inside it.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('emergency_generation'); p.setMem('indEmergency', true) },
      },
      {
        text: 'You know someone who was detained.',
        tag: null,
        outcome: 'The detentions were real and specific: a person, a morning, an absence. You do not forget the specifics.',
        effect: (p) => { p.m -= 12; p.r += 9; p.addFlag('emergency_generation'); p.addFlag('experienced_loss'); p.setMem('indEmergency', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_1984_sikh_massacre',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.currentYear === 1984 &&
      G.age >= 18 &&
      !G.mem.ind1984,
    text: 'October 31, 1984. Indira Gandhi is shot by her Sikh bodyguards, three weeks after the army stormed the Golden Temple. In the days that follow, mobs move through the Sikh neighbourhoods of Delhi, and the police are absent, or present and do nothing. The government\'s part in it will be argued about for decades, and most of those responsible will never be convicted.',
    context: 'The official toll of the 1984 anti-Sikh violence is 2,733 in Delhi; other estimates are higher.',
    choices: [
      {
        text: 'You are in Delhi during the pogroms.',
        tag: null,
        outcome: 'You saw what was organized and how. What you saw and what was subsequently said about it do not match.',
        effect: (p) => { p.m -= 16; p.r += 10; p.addFlag('india_1984_generation'); p.setMem('ind1984', true) },
      },
      {
        text: 'You follow it through the news, at a distance.',
        tag: null,
        outcome: 'The news and the accounts of people who were there are different. You file the difference.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('india_1984_generation'); p.setMem('ind1984', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_liberalization_1991',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.currentYear >= 1991 && G.currentYear <= 1996 &&
      G.age >= 20 &&
      !G.mem.indLib,
    text: 'Manmohan Singh presents the budget in July 1991. India is almost out of foreign exchange. The licence raj is dismantled: import quotas removed, industries deregulated, the rupee devalued. Foreign investment begins to arrive. The language of the economy changes — the new words are software, call centres, outsourcing, Bangalore. The economy that your parents\' generation understood is being reorganized. The reorganization will produce wealth in concentrations that the old model, for all its inefficiencies, did not.',
    choices: [
      {
        text: 'You enter the new economy. Technology, services, something adjacent.',
        tag: null,
        outcome: 'The decade that follows produces a class that did not exist in the 1980s. You are in it, or beside it.',
        effect: (p) => { p.m += 6; p.mo += 1500; p.e += 4; p.addFlag('liberalization_generation'); p.setMem('indLib', true) },
      },
      {
        text: 'The reorganization doesn\'t reach where you are.',
        tag: null,
        outcome: 'The growth is real and geographically specific. The parts of India that grow fastest are not all parts of India. You are in the part the statistics average out.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('liberalization_generation'); p.setMem('indLib', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_babri_masjid_1992',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.currentYear === 1992 &&
      G.age >= 18 &&
      !G.mem.indBabri,
    // The single most consequential fact about December 1992 is which side of
    // it you were on, and the event used to report it in the third person to
    // everybody — including to the people the riots were looking for.
    text: (G) => (G.religion === 'muslim_sunni' || G.religion === 'muslim_shia')
      ? 'December 6, 1992. The mosque at Ayodhya is brought down by hand, by a crowd of several hundred thousand, while the police stand at the edge of it. It was built in 1528. Within a day the riots have reached your city and the arithmetic in your house is not about the constitution: it is about the nameplate on the door, about whether the shop should open, about which of the neighbours would be a problem and which would be the opposite. Some of them come and stand outside for three nights, and that is the part you will find hardest to explain afterwards, because it was both true and not enough.'
      : 'December 6, 1992. The Babri Masjid in Ayodhya is demolished by a crowd of several hundred thousand people. The mosque was built in 1528. The claim that a Ram temple stood there before the mosque is the disputed point that the law courts have been considering for decades and that the crowd has now settled by force. The riots that follow kill approximately two thousand people across India. The question of what the demolition means for the constitutional principle of secularism is one that will structure Indian politics for the next three decades.',
    choices: [
      {
        text: 'The demolition was the dividing line. You choose a side.',
        tag: null,
        outcome: 'The sides have hardened by the time you choose. The choice itself is a statement about which version of India you live in.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('babri_generation'); p.setMem('indBabri', true) },
      },
      {
        text: 'You watch from a distance that feels increasingly fictional.',
        tag: null,
        outcome: 'The distance collapses in the riots. There is no outside position from which to watch this thing.',
        effect: (p) => { p.m -= 10; p.r += 8; p.addFlag('babri_generation'); p.setMem('indBabri', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_gujarat_2002',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.currentYear === 2002 &&
      G.age >= 25 &&
      !G.mem.indGujarat,
    text: (G) => (G.religion === 'muslim_sunni' || G.religion === 'muslim_shia')
      ? 'February 2002. A train carrying pilgrims back from Ayodhya burns near Godhra and fifty-nine people die, and by the evening of the next day the lists are being used. That is the detail that stays: not a mob finding a street, but a mob arriving at addresses. The official figure will be 790 Muslims killed and the other counts will be higher and the courts will spend twenty years on the question of what the state government did and did not do. You spend the three months after it deciding, every single morning, whether it is a day to be out of doors.'
      : "February 2002. A train carrying Hindu pilgrims back from Ayodhya burns near Godhra, and in the three months that follow, across Gujarat, Muslims are killed in what is called rioting and called pogrom. Modi is chief minister. The courts will look at his government's part for years, and it will be a permanent part of the account.",
    context: 'Fifty-nine people died in the Godhra train fire. The official toll of the Gujarat violence was 1,044, 790 of them Muslim; other estimates are much higher.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('gujarat_2002_generation'); p.setMem('indGujarat', true) },
  },

  {
    id: 'ind_call_centre_generation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.currentYear >= 2000 && G.currentYear <= 2012 &&
      G.age >= 20 && G.age <= 32 &&
      !G.mem.indCallCentre,
    text: 'The BPO job: twelve-hour shifts on American time, which means your night is their day. You adopt a work name — Michael, Jessica — because the clients find the Indian name harder. Your accent shifts after eighteen months into something that is neither the accent you grew up with nor the accent of the place you are servicing. The salary is four times what your father earned in government service. Your parents do not entirely understand what you do but they understand the salary. The suburb where you rent is full of people doing the same thing on similar shifts.',
    choices: null,
    effect: (p) => { p.m -= 3; p.mo += 2000; p.e += 3; p.addFlag('bpo_generation'); p.setMem('indCallCentre', true) },
  },

  {
    id: 'ind_demonetization_2016',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.currentYear === 2016 &&
      G.age >= 25 &&
      !G.mem.indDemo,
    text: 'November 8, 2016, 8pm. Prime Minister Modi announces that five hundred and one thousand rupee notes — 86 percent of the currency in circulation — are no longer legal tender as of midnight. Banks will exchange them, but the lines form immediately and stay for weeks. The informal economy, which runs on cash and constitutes 90 percent of Indian employment, does not have four hours to prepare. The stated purpose is to eliminate black money. The disruption is immediate, concrete, and experienced in queues.',
    choices: [
      {
        text: 'You have savings in formal banking. You manage.',
        tag: null,
        outcome: 'The queue is long. You manage. The people who couldn\'t manage were the people whose savings were in cash: most people.',
        effect: (p) => { p.m -= 6; p.r += 4; p.addFlag('demonetization_generation'); p.setMem('indDemo', true) },
      },
      {
        text: 'Your savings are in cash. You lose weeks to lines.',
        tag: null,
        outcome: 'The government\'s assumption was that savings in cash meant black money. Your savings are in cash because the bank is two hours away. The assumption did not include you.',
        effect: (p) => { p.m -= 14; p.mo -= Math.floor((p.mo ?? 0) * 0.15); p.r += 8; p.addFlag('demonetization_generation'); p.setMem('indDemo', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_caa_protests_2019',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.currentYear >= 2019 && G.currentYear <= 2021 &&
      G.age >= 16 &&
      !G.mem?.indCAA,
    text: (G) => {
      if (G.religion?.startsWith('muslim')) return 'December 2019. The Citizenship Amendment Act makes religion an explicit criterion for citizenship for the first time in Indian law — offering fast-track status to Hindus, Sikhs, Buddhists, and Christians from neighbouring countries, not Muslims. The National Register of Citizens in Assam already left out nearly two million people, most of them poor and unable to produce papers proving they were Indian. The logical extension of NRC + CAA is visible. Shaheen Bagh begins: women sitting on a road in Delhi, day after day, through January and February. You understand what they are sitting against.'
      return 'December 2019. The Citizenship Amendment Act, the National Register of Citizens, Shaheen Bagh — women sitting on a road in Delhi for a hundred days through winter. The Delhi riots in February 2020 come after the police are visibly absent from Muslim neighbourhoods. How you understand the sequence depends partly on which India you live in.'
    },
    choices: [
      {
        text: 'The CAA represents something you cannot accept about the direction the country is taking.',
        tag: null,
        outcome: 'You say what you think in the spaces where it is possible to say it. The spaces have been narrowing.',
        effect: (p) => { p.m -= 8; p.karma += 6; p.r += 5; p.addFlag('caa_protest_generation'); p.addFlag('political_active'); p.setMem('indCAA', true); },
      },
      {
        text: 'The law is defensible and the protests are being mischaracterized.',
        tag: null,
        outcome: 'Your reading of the law is your reading. The question of what it produces over time is the longer account.',
        effect: (p) => { p.m -= 4; p.r += 4; p.addFlag('caa_protest_generation'); p.setMem('indCAA', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ind_farmers_protest_2020',
    phase: null,
    weight: 3,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.currentYear >= 2020 && G.currentYear <= 2022 &&
      G.age >= 18 &&
      !G.mem?.indFarmers,
    text: 'November 2020, and farmers from Punjab and Haryana march to the edges of Delhi and stay, camped on the highways at Singhu, Tikri and Ghazipur for thirteen months. They read the three new farm laws as the end of the minimum price that is their floor; the government says the laws modernise the market. In November 2021 the prime minister repeals all three. The farmers go home.',
    choices: [
      {
        text: 'You support the farmers — this is the rural economy defending itself.',
        tag: null,
        outcome: 'The thirteen-month duration is itself a fact. The repeal is also a fact. Whether one caused the other is an argument the government and the movement have different answers to.',
        effect: (p) => { p.m += 4; p.karma += 5; p.addFlag('farmers_protest_generation'); p.setMem('indFarmers', true); },
      },
      {
        text: 'The protest blocked roads and affected ordinary people for over a year.',
        tag: null,
        outcome: 'You are not wrong about the disruption. The disruption was the point. What a disruption is worth depends on what it was blocking.',
        effect: (p) => { p.m -= 3; p.r += 3; p.addFlag('farmers_protest_generation'); p.setMem('indFarmers', true); },
      },
    ],
    effect: null,
  },

  // ── PARTITION FAMILY MEMORY ───────────────────────────────────────────────────
  // India characters born after 1947 grew up with Partition as inherited memory.
  // Pakistan's equivalent is pak_partition_memory in events_pakistan.js.

  {
    id: 'ind_partition_family_memory',
    phase: null,
    weight: 4,
    when: (G) =>
      G.character.country.name === 'India' &&
      G.currentYear >= 1955 && G.currentYear <= 1982 &&
      G.age >= 8 && G.age <= 17 &&
      (G.religion === 'hindu' || G.religion === 'sikh') &&
      !G.mem?.indPartitionMem,
    text: 'The adults in your family describe a city they no longer live in: Lahore, Rawalpindi, Lyallpur. The name carries particular streets, a temple gate, the smell of wheat at harvest in a Punjab that is in another country now. They do not give you numbers. They give you the name of the neighbour who helped them across, and the one who did not, and the object they managed to carry.',
    choices: null,
    effect: (p) => { p.r += 7; p.e += 3; p.addFlag('partition_india_memory'); p.setMem('indPartitionMem', true) },
  },

  {
    id: 'ind_partition_colony',
    phase: null,
    weight: 2,
    when: (G) =>
      // Lajpat Nagar and Rajinder Nagar are Delhi; this was printing them into
      // childhoods in Mumbai and rural Uttar Pradesh. Mumbai's Partition
      // colonies were Sindhi, and had other names.
      G.character.country.name === 'India' &&
      ['in_delhi', 'in_mumbai'].includes(G.place?.id) &&
      G.flags.has('partition_india_memory') &&
      G.currentYear >= 1958 && G.currentYear <= 1985 &&
      G.age >= 10 && G.age <= 20 &&
      !G.mem?.indPartitionColony,
    text: (G) => G.place?.id === 'in_mumbai'
      ? 'The neighbourhood has a name: the camp. Sion Koliwada, Chembur, and out past Kalyan the army barracks they renamed Ulhasnagar, all of them built for Sindhi families who came down the coast by ship with what fit in a trunk. The children on your street know their families came from somewhere else. Nobody says when. It is simply before.'
      : 'The neighbourhood has a name: the refugee colony. Lajpat Nagar, Rajinder Nagar, Punjabi Bagh, built in the fifties for families who arrived with what fit in a trunk. The children on your street know their families came from somewhere else. Nobody says when. It is simply before.',
    choices: null,
    effect: (p) => { p.r += 5; p.e += 2; p.addFlag('partition_colony_raised'); p.setMem('indPartitionColony', true) },
  },

]
