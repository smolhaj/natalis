// Pakistan character events
// Historical arcs: Partition refugees/Muhajir, Zia ul-Haq Islamization,
// 1971 Bangladesh war from Pakistani side, Karachi ethnic violence, nuclear tests

export const PAKISTAN_EVENTS = [

  {
    id: 'pak_muhajir_karachi',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1947 && G.currentYear <= 1965 &&
      G.age >= 6 && G.age <= 16 &&
      G.character.ethnicity === 'muhajir' &&
      !G.mem?.pakMuhajir,
    text: 'Your family came from across the border in 1947. The word muhajir means emigrant — someone who has left for the faith. In practice it means you are from somewhere else, which Karachi has built its entire identity around absorbing and which still operates as a category. Your Urdu is formal, a prestige language that is also a marker of displacement. The house you are in is not the house. The house is on the other side of a border that did not exist three years ago.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 6; p.addFlag('muhajir_identity'); p.setMem('pakMuhajir', true) },
  },

  {
    id: 'pak_partition_memory',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1950 && G.currentYear <= 1975 &&
      G.age >= 8 && G.age <= 16 &&
      !G.mem?.pakPartitionMemory,
    text: 'Your parents describe a city they no longer live in. Amritsar. Lucknow. Delhi. The words contain the weight of specific streets, specific smells, the particular light in a particular house. The 1947 partition moved twelve million people in six weeks. Seventy-five thousand women abducted. Between two hundred thousand and two million dead. Your parents do not give these numbers. They give the name of the neighbour who helped them and the name of the neighbour who did not.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 7; p.addFlag('partition_memory_family'); p.setMem('pakPartitionMemory', true) },
  },

  {
    id: 'pak_1971_east_pakistan',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear === 1971 &&
      G.age >= 16 &&
      !G.mem?.pak1971 &&
      !G.mem?.pkEastWingWar,
    text: 'East Pakistan is separating. In March, the army was sent in — Operation Searchlight — to suppress the independence movement. By December there is a war with India, and by December 16 the Pakistani forces in Dhaka have surrendered. Ninety-three thousand soldiers become prisoners of war. East Pakistan is now Bangladesh, a country that did not exist in the morning and exists in the evening. The official account will take decades to address what happened between March and December. In West Pakistan, the version is: we were betrayed.',
    choices: [
      {
        text: 'You have a relative who was stationed in the east.',
        tag: null,
        outcome: 'He comes back. He does not describe what happened. The silence is its own description.',
        effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('1971_war_lived'); p.setMem('pak1971', true) },
      },
      {
        text: 'You followed the war on state radio.',
        tag: null,
        outcome: 'The state radio described a situation that was clearly not the situation. The gap between the broadcast and the outcome was the education.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('1971_war_lived'); p.addFlag('media_skeptic'); p.setMem('pak1971', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'pak_zia_islamization',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1977 && G.currentYear <= 1988 &&
      G.age >= 18 &&
      !G.mem?.pakZia,
    text: 'General Zia ul-Haq suspended the constitution in July 1977 and executed Z.A. Bhutto in 1979. The Hudood Ordinances are now law: flogging, amputation, stoning — punishments from seventh-century jurisprudence inserted into modern statutes. Blasphemy law strengthened. Alcohol prohibited. The call to prayer is broadcast by state television. This is called Islamization. What changes is not only law. The public language of the city changes. The space for certain conversations contracts.',
    choices: null,
    effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('zia_generation'); p.setMem('pakZia', true) },
  },

  {
    id: 'pak_zia_female',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.character.gender === 'female' &&
      G.currentYear >= 1979 && G.currentYear <= 1988 &&
      G.age >= 16 &&
      !G.mem?.pakZiaFemale &&
      !G.mem?.pkZiaIslamisation,
    text: 'The Law of Evidence: in some categories of case, a woman\'s testimony is worth half a man\'s. The Zina Ordinance makes extramarital sex a crime, and because proof is difficult, women who report rape risk being prosecuted for adultery instead. You understand the legal architecture now. It was designed somewhere and signed by someone, and it operates in the courts, and you live inside it.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 7; p.addFlag('zia_generation'); p.addFlag('womens_rights_restricted'); p.setMem('pakZiaFemale', true) },
  },

  {
    id: 'pak_karachi_ethnic_violence',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1986 && G.currentYear <= 1999 &&
      G.age >= 18 &&
      !G.mem?.pakKarachi,
    text: 'Karachi in the late 1980s and 1990s: the MQM and the PPP and the ANP and at points the army, all operating in the city simultaneously. The gunfire is particular to certain neighborhoods on certain nights. The number of people who die in targeted killings runs to thousands across the decade. Curfews. The news carries the names of localities — Orangi, Liaquatabad, Qasba Colony — as proxies for something the news cannot say directly: which ethnic group, which party, which neighborhood is being targeted this week.',
    choices: [
      {
        text: 'You learn which routes to avoid.',
        tag: null,
        outcome: 'The routes become second nature. The city becomes a map of avoidances. You live inside the map.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('karachi_violence_generation'); p.setMem('pakKarachi', true) },
      },
      {
        text: 'Someone close to you is caught in it.',
        tag: null,
        outcome: 'The grief is ordinary in Karachi in these years, which doesn\'t make it smaller. It makes it accompanied.',
        effect: (p) => { p.m -= 16; p.h -= 4; p.r += 9; p.addFlag('karachi_violence_generation'); p.addFlag('experienced_loss'); p.setMem('pakKarachi', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'pak_nuclear_1998',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear === 1998 &&
      G.age >= 20 &&
      !G.mem?.pakNuclear,
    text: 'May 28, 1998. Pakistan detonates five nuclear devices at Chagai in Balochistan, two weeks after India\'s tests. The prime minister calls it a great day. The tests are followed by international sanctions, a run on the foreign currency reserves, and a brief period of genuine national pride that crosses all the usual divisions. The equation has changed. Pakistan is now formally a nuclear state. What this means in practice is that the wars between India and Pakistan will hereafter be managed differently, because the alternative is not manageable.',
    choices: null,
    effect: (p) => { p.m += 5; p.r += 4; p.addFlag('nuclear_pakistan_generation'); p.setMem('pakNuclear', true) },
  },

  {
    id: 'pak_afghanistan_frontier',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1980 && G.currentYear <= 1990 &&
      G.age >= 18 &&
      !G.mem?.pakAfghan,
    text: 'Three million Afghan refugees cross into Pakistan after the Soviet invasion of 1979. The camps at Peshawar and in the NWFP are the largest refugee population in the world. The CIA routes money through the ISI to the mujahideen; the weapons come back across the same border in both directions. The Kalashnikov culture — cheap automatic weapons flooding the civilian market — is a consequence with a name by the late 1980s. You are not in the frontier province but the frontier province is in you now, in the news and in what is available on the street.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('afghan_crisis_neighbor'); p.setMem('pakAfghan', true) },
  },

  {
    id: 'pak_madrassah_question',
    phase: 'childhood',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 1978 && G.currentYear <= 1995 &&
      G.age >= 8 && G.age <= 14 &&
      !G.mem?.pakMadrassah,
    text: 'The choice is between state school — underfunded, teachers absent half the time, textbooks shared between four children — and the madrassah, which is free, which provides food, which has a structure and a certainty that the state school lacks. Your parents think about this choice in practical terms. Zia\'s Islamization has dramatically increased the number of registered madrassahs. The education is real. What is also real is what it does and doesn\'t teach.',
    choices: [
      {
        text: 'State school. The family scrapes together the fees.',
        tag: null,
        outcome: 'You attend. The teacher is present on some days. The textbook has the Pakistani nationalist version of history that will take years to examine. You receive it as fact.',
        effect: (p) => { p.e += 3; p.m -= 3; p.addFlag('formal_education'); p.setMem('pakMadrassah', true) },
      },
      {
        text: 'Madrassah. It is what is available.',
        tag: null,
        outcome: 'You learn to read Arabic before Urdu. The structure is clear and the days are organized. What you are being taught is specific, and the specificity is the point.',
        effect: (p) => { p.e += 2; p.m -= 2; p.addFlag('religious_education'); p.setMem('pakMadrassah', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'pak_benazir_assassination_2007',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear === 2007 &&
      G.age >= 14 &&
      !G.mem?.pakBenazir,
    text: 'December 27, 2007. Benazir Bhutto is killed at a rally in Rawalpindi, seventeen days after surviving a suicide bombing in Karachi that killed one hundred and forty-nine others. She had returned from exile in October. The assassin is identified as a sixteen-year-old boy. The investigation produces multiple accounts. Pervez Musharraf\'s government produces one. The UN commission produces another. Bhutto had been the first female prime minister of a Muslim-majority country — twice, with an eight-year exile between the terms. She was fifty-four.',
    choices: [
      {
        text: 'You grieve for what she represented — whatever her compromises.',
        tag: null,
        outcome: 'The compromises were real and the killing was also real. The killing ended the conversation about the compromises, which may have been the point.',
        effect: (p) => { p.m -= 10; p.r += 5; p.addFlag('benazir_generation'); p.setMem('pakBenazir', true); },
      },
      {
        text: 'You understand the rage that produces a sixteen-year-old assassin.',
        tag: null,
        outcome: 'Understanding the production is not endorsing the product. You hold both parts of that sentence at the same time.',
        effect: (p) => { p.m -= 8; p.e += 4; p.r += 4; p.addFlag('benazir_generation'); p.setMem('pakBenazir', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'pak_aps_peshawar_2014',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear === 2014 &&
      G.age >= 10 &&
      !G.mem?.pakAPS,
    text: 'December 16, 2014. Seven Pakistani Taliban gunmen enter the Army Public School in Peshawar at ten in the morning. A hundred and forty-one people are killed; a hundred and thirty-two are children. The specific horror of the timeline — the school hall, the children under desks, the teachers, the eight hours — is reported in specific detail by the survivors. December 16 was also the day Bangladesh was created in 1971, but that is not the date that will be named when Pakistanis say December 16. The country goes quiet in a way that is different from other attacks.',
    choices: null,
    effect: (p) => {
      p.m -= 15
      p.h -= 5
      p.r += 8
      p.addFlag('aps_generation')
      p.setMem('pakAPS', true)
    },
  },

  {
    id: 'pak_blasphemy_fear',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Pakistan' &&
      G.currentYear >= 2000 && G.currentYear <= 2024 &&
      G.age >= 18 &&
      !G.mem?.pakBlasphemy,
    text: 'Someone from your neighbourhood has been accused of blasphemy. The charge does not require evidence in the way that other charges do. The accusation is enough for a crowd to assemble. The court is the secondary question; the primary question is whether the person survives to reach the court. Asia Bibi spent ten years on death row; the Supreme Court acquitted her in 2018 and the verdict triggered nationwide protests. She could not go home. She could not stay in Pakistan. The architecture of the law and what the law produces are two different things.',
    choices: [
      {
        text: 'You say something. You know this person and you say what you know.',
        tag: null,
        outcome: 'Speaking makes you adjacent to the accusation in the eyes of the crowd, which is precisely the mechanism that makes the accusation so effective.',
        effect: (p) => { p.m -= 10; p.karma += 8; p.r += 5; p.addFlag('blasphemy_law_era'); p.setMem('pakBlasphemy', true); },
      },
      {
        text: 'You say nothing. This is not cowardice. This is how the system preserves itself.',
        tag: null,
        outcome: 'You do not speak and you live with not speaking. The two things are connected in a way that becomes part of the interior furniture of your life.',
        effect: (p) => { p.m -= 8; p.r += 8; p.addFlag('blasphemy_law_era'); p.setMem('pakBlasphemy', true); },
      },
    ],
    effect: null,
  },

]
