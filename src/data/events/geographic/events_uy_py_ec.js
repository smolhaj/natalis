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

  // uru_bordaberry_coup was removed: it retold the world event bordaberry_coup_uruguay_1973 in the same year, near
  // word for word, and negated the flag that world event sets before the year's
  // event is drawn, so it could never fire. The world event carries it.
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
    text: 'March 1, 1985, and a civilian government again. The political prisoners walk out, the Tupamaros among them, Mujica after fourteen years in which he barely saw a newspaper. The parliament reopens. The exiles come back to a city that changed while they were gone, and the people who stayed find that they changed too.',
    choices: null,
    effect: (p) => { p.m += 10; p.karma += 3; p.addFlag('uru_democracy_restored'); },
  },

  {
    id: 'uru_mujica_presidency',
    phase: null,
    weight: 4,
    when: (G) => G.character.country.name === 'Uruguay' && G.currentYear >= 2010 && G.currentYear <= 2015 && G.age >= 12 && !G.flags.has('uru_mujica_era'),
    text: 'The president lives out on the smallholding with the dogs and drives the same 1987 Beetle to work. He keeps a teacher\'s wage from the salary and gives the rest away, and he says in an interview that he is not poor, that poor is when you work only to keep an expensive life going. The foreign correspondents write about him the way you would write about a curiosity. To you he sounds like your uncle, and your uncle has been saying it for forty years.',
    context: 'Jose Mujica, a former Tupamaro guerrilla who spent fourteen years in prison under the dictatorship, much of it in solitary confinement at the bottom of a well, was president of Uruguay from 2010 to 2015. He donated about ninety percent of his salary and lived on his farm outside Montevideo. His government legalised same-sex marriage, abortion, and a state-regulated cannabis market.',
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
      return `Stroessner has been in power since 1954. In ${yr} the Colorado Party holds every government job, every import licence, every land grant. You want to work for the state, or your family does, and the party card is cheap; the alternative is living outside the system entirely. There is exile, Buenos Aires or New York or Madrid, and exile is a loss. You know people who chose it, and people who didn't.`
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
        outcome: 'Outside the system was difficult too. Not dramatic. Just narrow.',
        effect: (p) => { p.m -= 8; p.r += 4; p.karma += 3; p.addFlag('pry_stroessner_era'); p.addFlag('pry_colorado_refused'); p.setMem('pry_stro_checked', true); },
      },
    ],
  },

  {
    id: 'pry_triple_alliance_memory',
    phase: null,
    weight: 3,
    when: (G) => G.character.country.name === 'Paraguay' && G.currentYear >= 1940 && G.currentYear <= 1980 && G.age >= 8 && G.age <= 16 && !G.flags.has('pry_triple_alliance_memory'),
    text: 'The war. The teacher says Paraguay fought Brazil, Argentina and Uruguay at once, for five years, and that after it there were four women for every man, and that the women rebuilt the country. Some say sixty percent of the people died; some say seventy. You learn this and feel something that has no clean name in Spanish or in Guaraní, the grief and the pride the same feeling. We were nearly destroyed. We are still here.',
    context: 'The War of the Triple Alliance (1864-1870) killed a large majority of Paraguay\'s population; estimates of the losses range from about a quarter to over two thirds.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 3; p.r += 4; p.addFlag('pry_triple_alliance_memory'); },
  },

  {
    id: 'pry_archive_1992',
    phase: 'midlife',
    weight: 4,
    when: (G) => G.character.country.name === 'Paraguay' && G.currentYear === 1992 && !G.flags.has('pry_archive_terror'),
    text: 'A lawyer looking for a client\'s file in a police station in Asunción finds another filing cabinet, and then another: the Archive of Terror, tonnes of paper, the files of Operation Condor. The names of people killed across six countries, and the proof that the secret police of Chile, Argentina, Uruguay, Brazil, Paraguay and Bolivia worked together to find people who thought distance would protect them. Stroessner\'s men kept records. You read the newspaper account and something goes cold in you.',
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
      const isIndigenous = G.character.ethnicity === 'indigenous_ecuadorian'
      const yr = G.currentYear
      return isIndigenous
        ? `The oil company built a road into the Oriente in ${yr <= 1975 ? '1972' : 'the 1970s'}. The road brought the oil company and it brought missionaries and it brought settlers and it brought disease, in that order or some other order that amounts to the same thing. The well that blew out left oil in the river for six months. The fish died. The children's skin changed. The company moved on when the well ran dry and left what it left.`
        : `The oil discovery in the Oriente changed Ecuador. The wells at Lago Agrio. The pipeline over the Andes. The money coming in and where it went. In ${yr}, Ecuador is a petroleum republic and the Amazon is where petroleum companies go to extract. What happens in the Amazon does not always make the newspapers in Quito.`
    },
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('ecu_oil_generation'); },
  },

  // ecu_dollarization was removed: it retold the world event ecuador_dollarization_2000 in the same year, near
  // word for word, and negated the flag that world event sets before the year's
  // event is drawn, so it could never fire. The world event carries it.
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
    text: 'October 2019. The government removes the fuel subsidy at the IMF\'s request, and CONAIE calls a national strike. The roads into Quito are blocked and thousands march in from the Amazon and the Andes, and the government moves itself to Guayaquil. Two weeks of tear gas and marching, and then the president is back at the table and the subsidy partly restored. You watched a movement shut down a government and make it negotiate.',
    choices: null,
    effect: (p) => { p.m += 4; p.karma += 4; p.e += 2; p.addFlag('ecu_conaie_2019'); },
  },

]

export default UY_PY_EC_EVENTS
