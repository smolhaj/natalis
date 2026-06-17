// Uruguay, Paraguay, and Ecuador arc events

const UY_PY_EC_EVENTS = [

  // ─── URUGUAY ─────────────────────────────────────────────────────────────────

  {
    id: 'uru_tupamaro',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.character.country.name === 'Uruguay' && G.currentYear >= 1965 && G.currentYear <= 1972 && !G.flags.has('uru_tupamaro_era'),
    text: 'The Tupamaros rob a Swiss bank and distribute the money in poor neighborhoods. They publish the secret account records of corrupt officials. They kidnap a police chief and broadcast his confession on their clandestine radio station. The urban guerrilla movement has a reputation for avoiding civilian casualties and for a kind of theatrical political humiliation of the powerful. You know people on the edges of it. You know people sympathetic to it. The question of what you think about them is something you answer differently depending on who is asking.',
    choices: [
      {
        text: 'You were on the edges, distributing materials.',
        tag: 'involved',
        outcome: 'The edges were not as safe as the edges implied. You understood this afterward.',
        effect: (p) => { p.m += 4; p.karma += 5; p.addFlag('uru_tupamaro_era'); p.addFlag('uru_tupamaro_adjacent'); },
      },
      {
        text: 'You were a sympathizer who stayed back.',
        tag: 'sympathizer',
        outcome: 'The distinction between involvement and sympathy mattered less to the military after 1973 than you had assumed it would.',
        effect: (p) => { p.m += 2; p.addFlag('uru_tupamaro_era'); },
      },
    ],
  },

  {
    id: 'uru_bordaberry_coup',
    phase: 'young_adult',
    weight: 5,
    when: (G) => G.character.country.name === 'Uruguay' && G.currentYear === 1973 && !G.flags.has('uru_coup_1973'),
    text: 'June 27, 1973. President Bordaberry closes the parliament and hands power to the military. The coup is not dramatic — there are no tanks in the main plaza, no gunfire. The parliament doors close, and then they stay closed. Uruguay, the country known as the Switzerland of South America, the one with universal suffrage since 1918, the one with divorce and secular education and a welfare state — that Uruguay is gone. The dictatorship will last twelve years.',
    choices: null,
    effect: (p) => { p.m -= 14; p.r += 7; p.addFlag('uru_coup_1973'); },
  },

  {
    id: 'uru_dictatorship_life',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.character.country.name === 'Uruguay' && G.currentYear >= 1974 && G.currentYear <= 1984 && G.flags.has('uru_coup_1973') && !G.mem.uru_dict_checked,
    text: (G) => {
      const yr = G.currentYear
      return `Uruguay under the military. The highest per capita number of political prisoners in the world — ${yr <= 1978 ? 'one in fifty' : 'one in a hundred'} Uruguayans is in prison or under surveillance. The Tupamaros in Punta Carretas are kept in conditions designed to destroy them psychologically: total isolation, darkness, total sensory deprivation at intervals. One of the prisoners is José Mujica. You know someone who is inside, or you know someone whose family member is inside, or you know someone who has left for Buenos Aires or Stockholm and cannot come back.`
    },
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 6; p.setMem('uru_dict_checked', true); p.addFlag('uru_dictatorship_lived'); },
  },

  {
    id: 'uru_return_democracy',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.character.country.name === 'Uruguay' && G.currentYear === 1985 && !G.flags.has('uru_democracy_restored'),
    text: 'March 1, 1985. The new civilian government is inaugurated. The political prisoners are released, including the Tupamaros. Mujica walks out of Libertad Prison after fourteen years. He has not seen a newspaper in years. He has not had a real conversation in years. The parliament reopens. The country slowly reassembles what it had been. The people who spent twelve years in exile come back to a city that has changed while they were gone. The people who stayed come back to a self that has also changed.',
    choices: null,
    effect: (p) => { p.m += 10; p.karma += 3; p.addFlag('uru_democracy_restored'); },
  },

  {
    id: 'uru_mujica_presidency',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.character.country.name === 'Uruguay' && G.currentYear >= 2010 && G.currentYear <= 2015 && !G.flags.has('uru_mujica_era'),
    text: 'The president of Uruguay lives in a farmhouse outside Montevideo and drives a 1987 Volkswagen Beetle. He donates 90 percent of his salary to charitable causes, leaving himself the equivalent of a teacher\'s wage. His name is José Mujica. He spent fourteen years in prison under the dictatorship, much of it in a hole in the ground. Under his presidency: marijuana legalized and state-regulated. Abortion legalized. Same-sex marriage legalized. He says in interviews: I am not poor. Poor people are those who only work to try to maintain an expensive lifestyle. I do not have time for that. The foreigners write about this as if it is eccentric. To you it makes a specific kind of sense.',
    choices: null,
    effect: (p) => { p.m += 8; p.karma += 5; p.addFlag('uru_mujica_era'); },
  },

  // ─── PARAGUAY ────────────────────────────────────────────────────────────────

  {
    id: 'pry_guarani_identity',
    phase: 'childhood',
    weight: 4,
    when: (G) => G.character.country.name === 'Paraguay' && G.age >= 6 && G.age <= 14 && !G.flags.has('pry_guarani_speaker'),
    text: 'You grow up speaking two languages without deciding to. Spanish at school, Guaraní at home or in the market or when something needs to be said quickly and in the right register. Guaraní has words for things that Spanish does not have words for. The syllables sit differently in the mouth. Paraguay is the only country in South America where an indigenous language is genuinely the majority language — not preserved on reserves or in ceremonies, but spoken at the bus stop and in the market and in the kitchen when your grandmother is angry. You do not think of this as unusual. It is the air.',
    choices: null,
    effect: (p) => { p.e += 3; p.s += 2; p.addFlag('pry_guarani_speaker'); },
  },

  {
    id: 'pry_stroessner',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.character.country.name === 'Paraguay' && G.currentYear >= 1958 && G.currentYear <= 1988 && !G.flags.has('pry_stroessner_era') && !G.mem.pry_stro_checked,
    text: (G) => {
      const yr = G.currentYear
      return `Alfredo Stroessner has been in power since 1954. He will be in power until 1989. In ${yr}, the Colorado Party controls every patronage position in the country — every government job, every import licence, every land concession. You want to work for the government, or your family does. The price of the party membership card is small. The alternative is to exist outside the system entirely. The exile option exists — Buenos Aires, New York, Madrid — but exile is a particular kind of loss. You know people who chose it. You know people who didn't.`
    },
    choices: [
      {
        text: 'You joined the Colorado Party and navigated the system.',
        tag: 'joined',
        outcome: 'The card got you the job. The job came with what the job came with. You do not think about this constantly but you think about it sometimes.',
        effect: (p) => { p.m -= 6; p.r += 5; p.karma -= 4; p.addFlag('pry_stroessner_era'); p.setMem('pry_stro_checked', true); },
      },
      {
        text: 'You stayed outside and lived with the consequences.',
        tag: 'outside',
        outcome: 'Outside the system was its own kind of difficult. Not dramatic. Just narrow.',
        effect: (p) => { p.m -= 8; p.r += 4; p.karma += 3; p.addFlag('pry_stroessner_era'); p.addFlag('pry_colorado_refused'); p.setMem('pry_stro_checked', true); },
      },
    ],
  },

  {
    id: 'pry_triple_alliance_memory',
    phase: 'childhood',
    weight: 3,
    when: (G) => G.character.country.name === 'Paraguay' && G.currentYear >= 1940 && G.currentYear <= 1980 && G.age >= 8 && G.age <= 16 && !G.flags.has('pry_triple_alliance_memory'),
    text: 'The war. 1864 to 1870. Paraguay against Brazil, Argentina, and Uruguay at the same time. For five years. The teacher says: sixty percent of the population died. Some say seventy. After the war, four women for every man. After the war, the country was reorganized by the surviving women. You learn this and feel something that does not have a clean name in Spanish or Guaraní — the grief and the pride are the same feeling. We were nearly destroyed. We are still here.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 3; p.r += 4; p.addFlag('pry_triple_alliance_memory'); },
  },

  {
    id: 'pry_archive_1992',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.character.country.name === 'Paraguay' && G.currentYear === 1992 && !G.flags.has('pry_archive_terror'),
    text: 'A police station in Asunción. A lawyer looking for a client\'s file finds another filing cabinet, and then another. The Archive of Terror: four tonnes of documents, the files of Operation Condor. The names of people assassinated across six countries. The coordination between the security services of Chile, Argentina, Uruguay, Brazil, Paraguay, and Bolivia to find people who thought distance was protection. The documentation is complete. The Stroessner regime kept records. You read the newspaper account and you feel something cold and specific.',
    choices: null,
    effect: (p) => { p.m -= 10; p.r += 6; p.e += 3; p.addFlag('pry_archive_terror'); },
  },

  // ─── ECUADOR ─────────────────────────────────────────────────────────────────

  {
    id: 'ecu_oil_oriente',
    phase: 'young_adult',
    weight: 4,
    when: (G) => G.character.country.name === 'Ecuador' && G.currentYear >= 1972 && G.currentYear <= 1990 && !G.flags.has('ecu_oil_generation'),
    text: (G) => {
      const isIndigenous = G.character.ethnicity?.id === 'indigenous_ecuadorian'
      const yr = G.currentYear
      return isIndigenous
        ? `The oil company built a road into the Oriente in ${yr <= 1975 ? '1972' : 'the 1970s'}. The road brought the oil company and it brought missionaries and it brought settlers and it brought disease, in that order or some other order that amounts to the same thing. The well that blew out left oil in the river for six months. The fish died. The children's skin changed. The company moved on when the well ran dry and left what it left.`
        : `The oil discovery in the Oriente changed Ecuador. The wells at Lago Agrio. The pipeline over the Andes. The money coming in and where it went. In ${yr}, Ecuador is a petroleum republic and the Amazon is where petroleum companies go to extract. What happens in the Amazon does not always make the newspapers in Quito.`
    },
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('ecu_oil_generation'); },
  },

  {
    id: 'ecu_dollarization',
    phase: 'young_adult',
    weight: 5,
    when: (G) => G.character.country.name === 'Ecuador' && G.currentYear === 2000 && !G.flags.has('ecu_dollarization_generation'),
    text: 'January 2000. The sucre has lost 75 percent of its value in a year. Banks are closed. Savings have been wiped out. The president announces Ecuador will abandon its currency and adopt the US dollar. You wake up in a country where the price of everything is now calculated in dollars. Your salary, your rent, your savings — all converted at a rate that made you poorer by conversion. The dollar is stable and Ecuador is, for a while, not.',
    choices: null,
    effect: (p) => { p.m -= 12; p.w -= 10; p.mo -= 1000; p.addFlag('ecu_dollarization_generation'); },
  },

  {
    id: 'ecu_yasuni',
    phase: 'midlife',
    weight: 3,
    when: (G) => G.character.country.name === 'Ecuador' && G.currentYear >= 2007 && G.currentYear <= 2014 && !G.flags.has('ecu_yasuni_generation'),
    text: (G) => {
      const yr = G.currentYear
      return yr <= 2012
        ? 'Ecuador\'s proposal: the oil under Yasuní National Park will stay in the ground if the world contributes half of what Ecuador would earn from drilling it. It is a climate proposal, an indigenous rights proposal, and a question directed at the countries whose carbon emissions are heating the planet. You watch Ecuador make this offer to the world. The world is considering.'
        : 'The Yasuní-ITT Initiative failed. Ecuador raised $336 million of the $3.6 billion target. President Correa announced in 2013 that Ecuador could not ask the world to indefinitely carry a burden that is the world\'s responsibility. The drilling begins. The Amazon block that was the offer to the world is now the oil field. You have watched this happen from beginning to end.'
    },
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 5; p.e += 2; p.addFlag('ecu_yasuni_generation'); },
  },

  {
    id: 'ecu_conaie_uprising',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.character.country.name === 'Ecuador' && G.currentYear === 2019 && !G.flags.has('ecu_conaie_2019'),
    text: 'October 2019. The government removes fuel subsidies under IMF pressure. CONAIE — the indigenous confederation — calls a national strike. The highways into Quito are blocked. Thousands march from the Amazon and the Andes to the capital. The government moves the seat of government to Guayaquil and declares a state of emergency. The Quito streets for two weeks: tear gas, marching, negotiation, the president finally back at the table. The fuel subsidies are partially restored. You watched a national movement shut down a government and negotiate. You are still thinking about what it means.',
    choices: null,
    effect: (p) => { p.m += 4; p.karma += 4; p.e += 2; p.addFlag('ecu_conaie_2019'); },
  },

]

export default UY_PY_EC_EVENTS
