// Latin America character events: Chile, Argentina, Brazil, Colombia, Operation Condor
// Supplements existing world events (argentina_dirty_war, falklands_war, colombia_drug_wars, etc.)
// and city-specific events in events_cities_extended.js.
// These events fire for ALL characters in each country, not only those in specific cities.

export const LATIN_AMERICA_EVENTS = [

  // ═══════════════════════════════════════════════════════════════════════
  // CHILE
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'la_chile_dina_silence',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Chile' &&
      G.currentYear >= 1973 && G.currentYear <= 1988 &&
      G.age >= 18 &&
      !G.mem?.chile_dina_silence,
    text: 'There are things you do not say. The list has grown since September. At the office, at the dinner table with relatives, at the queue for bread: a set of subjects that have become physically dangerous, so you have learned to speak around them. You do this so fluently that you sometimes forget what you used to say before you learned.',
    choices: [
      {
        text: 'Learn to live inside the silence',
        tag: null,
        outcome: 'The silence becomes fluent. You are safe. You are also less yourself than you were.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('regime_self_censorship'); p.setMem('chile_dina_silence', true); },
        inject: null,
      },
      {
        text: 'Find the people who still speak plainly',
        tag: 'principled',
        outcome: 'A small room. A careful circle. The words come back slowly, and with them, a different kind of risk.',
        effect: (p) => { p.m += 2; p.r += 3; p.karma += 4; p.addFlag('dissident_reader'); p.setMem('chile_dina_silence', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_chile_exile_decision',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Chile' &&
      G.currentYear >= 1973 && G.currentYear <= 1978 &&
      G.age >= 18 && G.age <= 38 &&
      (G.flags.has('dissident_reader') || G.flags.has('political_aware') || G.flags.has('interrogated_by_state') || G.career?.field === 'arts') &&
      !G.flags.has('emigrated') &&
      !G.mem?.chile_exile_decision,
    text: 'People are leaving. Not everyone — mostly the ones who said something about the government before September, or taught it in classrooms, or made art that said it sideways. Some have been told directly that staying is not an option. You have not been told directly. The question is whether to wait for the telling.',
    choices: [
      {
        text: 'Leave — the risk is real',
        tag: null,
        outcome: 'Buenos Aires first, then perhaps Paris or Stockholm. You leave with a suitcase and the understanding that you do not know when you will return.',
        effect: (p) => { p.m -= 8; p.addFlag('chile_exiled'); p.addFlag('emigrated'); p.setResidency('work_visa'); p.setMem('chile_exile_decision', true); },
        inject: null,
      },
      {
        text: 'Stay — you will manage',
        tag: null,
        outcome: 'Some who stayed were fine. The question of whether you were brave or merely fortunate followed you for years.',
        effect: (p) => { p.m -= 4; p.r += 4; p.addFlag('stayed_when_others_left'); p.setMem('chile_exile_decision', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_chile_interrogation',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Chile' &&
      G.currentYear >= 1974 && G.currentYear <= 1983 &&
      (G.flags.has('dissident_reader') || G.flags.has('political_aware') || G.career?.field === 'arts' || G.career?.field === 'education' || G.career?.field === 'journalism') &&
      !G.mem?.chile_interrogated,
    text: 'They come for you at seven in the morning. Not the men who take people and do not bring them back — different men, with a car and a building with fluorescent lights. They ask questions for several hours. They already seem to know the answers. What they want is the names of people you know. You are released in the afternoon. They tell you not to discuss this.',
    choices: [
      {
        text: 'Tell no one',
        tag: null,
        outcome: 'The silence protects you and isolates you simultaneously. You stop attending the meetings you attended before.',
        effect: (p) => { p.m -= 10; p.r += 6; p.addFlag('interrogated_by_state'); p.addFlag('regime_self_censorship'); p.setMem('chile_interrogated', true); },
        inject: null,
      },
      {
        text: 'Tell someone you trust',
        tag: null,
        outcome: 'The telling is a risk. The person you tell is also now more careful.',
        effect: (p) => { p.m -= 6; p.karma += 3; p.addFlag('interrogated_by_state'); p.setMem('chile_interrogated', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_chile_plebiscite_1988',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Chile' &&
      G.currentYear === 1988 &&
      G.age >= 18 &&
      !G.mem?.chile_plebiscite_88,
    text: 'The ballot has two options. Sí: Pinochet continues for eight more years. No: there will be an election. The general has the army behind him and has allowed this vote, which is itself a kind of statement about what he expects the result to be. You stand in the booth with the pencil.',
    choices: [
      {
        text: 'Vote No',
        tag: 'principled',
        outcome: 'The count takes all night. The No wins 55.99 to 44.01. For a specific moment, a pencil mark achieves what nothing else could.',
        effect: (p) => { p.m += 8; p.karma += 5; p.addFlag('chile_voted_no'); p.setMem('chile_plebiscite_88', true); },
        inject: null,
      },
      {
        text: 'Vote Sí — stability over uncertainty',
        tag: null,
        outcome: 'You voted for what you knew. The No won anyway.',
        effect: (p) => { p.m -= 3; p.r += 6; p.setMem('chile_plebiscite_88', true); },
        inject: null,
      },
      {
        text: 'Stay away — too risky to be visible',
        tag: null,
        outcome: 'From home, you heard when the results came. The No won.',
        effect: (p) => { p.m += 2; p.r += 4; p.setMem('chile_plebiscite_88', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_chile_rettig_reckoning',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Chile' &&
      G.currentYear >= 1991 && G.currentYear <= 1996 &&
      !G.mem?.chile_rettig,
    text: 'The Rettig Commission has published its report. Two thousand four hundred and seventy-nine names — the dead and the disappeared the state acknowledges. Everyone knows the real number is larger. But it is the first time the government has named them. Some families who have been saying for twenty years what happened to their relatives now have a document that agrees with them.',
    choices: null,
    effect: (p) => { p.m -= 5; p.e += 3; p.addFlag('witnessed_truth_commission'); p.setMem('chile_rettig', true); },
  },

  {
    id: 'la_chile_2019_estallido',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Chile' &&
      G.currentYear === 2019 &&
      G.age >= 30 &&
      !G.mem?.chile_2019,
    text: 'It starts with students jumping the metro turnstiles to protest a fare increase. Within a week, Santiago sees the largest protests since the dictatorship. The president says: estamos en guerra — we are at war. The same phrase the other one used. The streets answer: no estamos en guerra, estamos despiertos. We are not at war. We are awake.',
    choices: [
      {
        text: 'Go to the streets',
        tag: null,
        outcome: 'You are older than most of the people around you. You remember 1988. This feels different and the same simultaneously.',
        effect: (p) => { p.m += 5; p.karma += 4; p.addFlag('political_active_2019'); p.setMem('chile_2019', true); },
        inject: null,
      },
      {
        text: 'Watch from home — you know what happens when this fails',
        tag: null,
        outcome: 'From the window, the sound carries all night. The country makes a decision without you and also with you.',
        effect: (p) => { p.m -= 3; p.r += 4; p.setMem('chile_2019', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ARGENTINA
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'la_arg_disappeared_colleague',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Argentina' &&
      G.regime === 'military_dictatorship' &&
      G.currentYear >= 1976 && G.currentYear <= 1983 &&
      G.age >= 18 &&
      !G.flags.has('buenos_aires_junta_era') &&
      !G.mem?.arg_disappeared_colleague,
    text: 'Someone you worked with is not there on Monday. A desk that was occupied on Friday. The secretary says she is not sure where he has gone. His wife, when you pass her in the street, says he is traveling. Nobody asks the obvious question. Everyone knows the answer and the asking is its own risk.',
    choices: [
      {
        text: 'Say nothing — you have a family',
        tag: null,
        outcome: 'The pragmatism is real. The thing you carry is also real.',
        effect: (p) => { p.m -= 8; p.r += 7; p.addFlag('witnessed_disappearance'); p.setMem('arg_disappeared_colleague', true); },
        inject: null,
      },
      {
        text: 'Ask — quietly, carefully',
        tag: null,
        outcome: 'The person you ask goes very still. They say they don\'t know. You understand later they were protecting you by not answering.',
        effect: (p) => { p.m -= 6; p.r += 5; p.e += 3; p.addFlag('witnessed_disappearance'); p.setMem('arg_disappeared_colleague', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_arg_proceso_complicity',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Argentina' &&
      G.regime === 'military_dictatorship' &&
      G.currentYear >= 1976 && G.currentYear <= 1983 &&
      G.age >= 20 &&
      !G.mem?.arg_proceso_complicity,
    text: 'The conversation at the dinner table goes in certain directions and not others. Nobody at the table is a monster. But there are things that would change the dinner if said, so they are not said. The economy is discussed. Football is discussed. The people who might once have been invited — the ones who are no longer at tables — are not discussed. The silence is the participation.',
    choices: null,
    effect: (p) => { p.m -= 5; p.r += 8; p.addFlag('proceso_lived'); p.setMem('arg_proceso_complicity', true); },
  },

  {
    id: 'la_arg_falklands_family',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Argentina' &&
      G.currentYear === 1982 &&
      G.age >= 36 &&
      G.children?.some(c => c.alive) &&
      !G.mem?.arg_falklands_family,
    text: 'The government invades the Malvinas on April 2nd and the streets fill with people chanting. The Junta is popular for the first time. Your son is of conscription age. The generals who spent six years disappearing civilians are now asking those civilians to send their sons to die in the South Atlantic.',
    choices: [
      {
        text: 'The Malvinas are Argentina\'s — he serves',
        tag: null,
        outcome: 'He goes. He comes back. Not everyone does. The surrender comes in June and the dictatorship falls within the year.',
        effect: (p) => { p.m -= 12; p.r += 6; p.setMem('arg_falklands_family', true); },
        inject: null,
      },
      {
        text: 'Find a way to keep him from the draft',
        tag: null,
        outcome: 'Money, contacts, a medical certificate. You use what you have. He stays. You live with this separately from him.',
        effect: (p) => { p.m -= 8; p.r += 4; p.karma -= 3; p.mo -= 500; p.setMem('arg_falklands_family', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_arg_nunca_mas',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Argentina' &&
      G.currentYear >= 1984 && G.currentYear <= 1990 &&
      !G.mem?.arg_nunca_mas,
    text: 'The CONADEP report — Nunca Más, Never Again — is published in November 1984 and sells out in days. What it documents: 8,961 disappeared, though everyone knows the real number is larger. Testimony from survivors. The methods. The specific buildings. The specific vocabulary — vuelos, parrilla, capucha — for things that did not have names before they happened.',
    choices: null,
    effect: (p) => { p.m -= 7; p.e += 4; p.karma += 4; p.addFlag('witnessed_truth_commission'); p.setMem('arg_nunca_mas', true); },
  },

  {
    id: 'la_arg_conadep_testimony',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Argentina' &&
      G.flags.has('witnessed_disappearance') &&
      G.currentYear >= 1984 && G.currentYear <= 1987 &&
      !G.mem?.arg_conadep_testimony,
    text: 'The CONADEP commission is taking testimony. You were a witness — you know what you saw, what you didn\'t ask. A colleague calls to say they are looking for people who can speak. What you have to say is specific and verifiable. Five years ago, saying it could have made you disappear.',
    choices: [
      {
        text: 'Testify — it happened and it should be recorded',
        tag: 'principled',
        outcome: 'The testimony is recorded. The country is trying to name what it did to itself.',
        effect: (p) => { p.m -= 5; p.karma += 8; p.r -= 3; p.addFlag('truth_commission_witness'); p.setMem('arg_conadep_testimony', true); },
        inject: null,
      },
      {
        text: 'Don\'t — it\'s over, move forward',
        tag: null,
        outcome: 'You are not alone in this decision. What you saw is not in the record.',
        effect: (p) => { p.m -= 3; p.r += 7; p.setMem('arg_conadep_testimony', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_arg_nietos',
    phase: 'late_life',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Argentina' &&
      (G.flags.has('witnessed_disappearance') || G.flags.has('proceso_lived')) &&
      G.currentYear >= 1998 && G.currentYear <= 2015 &&
      G.age >= 50 &&
      !G.mem?.arg_nietos,
    text: 'The Abuelas de Plaza de Mayo have recovered another grandchild — a child born in a detention centre, given to a family with ties to the regime, who is now an adult learning who they actually are. The DNA project has been running since 1987. You read about it and think about the families you knew in those years, and what you do or don\'t know about how they came to be.',
    choices: null,
    effect: (p) => { p.m -= 4; p.e += 3; p.setMem('arg_nietos', true); },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BRAZIL
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'la_bra_ai5',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.regime === 'military_dictatorship' &&
      G.currentYear >= 1968 && G.currentYear <= 1974 &&
      (G.career?.field === 'education' || G.career?.field === 'arts' || G.career?.field === 'journalism' || G.flags.has('university_enrolled') || G.flags.has('dissident_reader')) &&
      !G.mem?.bra_ai5,
    text: 'Institutional Act Number 5. The president signs it in December 1968. Habeas corpus suspended. Congress closed. Press censorship institutionalised. The newspapers this morning have white space where the censors deleted stories, and some of them fill it with recipes or poems — which becomes its own act. Students who were in the streets last month are now being looked for.',
    choices: [
      {
        text: 'Keep working — find ways to say things indirectly',
        tag: null,
        outcome: 'You learn the grammar of coded speech. It is exhausting and occasionally it works.',
        effect: (p) => { p.m -= 8; p.e += 3; p.addFlag('brazil_dictatorship_lived'); p.addFlag('regime_self_censorship'); p.setMem('bra_ai5', true); },
        inject: null,
      },
      {
        text: 'Go quiet — this is not the time',
        tag: null,
        outcome: 'The caution is rational. You stop doing some of the things you were doing. You don\'t call it stopping.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('brazil_dictatorship_lived'); p.setMem('bra_ai5', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_bra_tropicalia',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 1967 && G.currentYear <= 1972 &&
      (G.flags.has('creative') || (G.hobbies?.music ?? 0) >= 20 || G.career?.field === 'arts') &&
      !G.mem?.bra_tropicalia,
    text: 'Caetano Veloso and Gilberto Gil have been arrested and are in exile. The music they made — Tropicália, noise and irony saying what cannot be said directly — is still played, on stations now being monitored. The songs carry meaning that requires knowing what you cannot say, and that knowledge is itself a form of belonging.',
    choices: [
      {
        text: 'Play it — the music is the resistance',
        tag: 'creative',
        outcome: 'In the playing, you are in specific company: people who understand what the song actually says.',
        effect: (p) => { p.m += 5; p.karma += 4; p.addFlag('resistance_through_art'); p.practiceHobby('music', 8); p.setMem('bra_tropicalia', true); },
        inject: null,
      },
      {
        text: 'Stick to things that won\'t attract attention',
        tag: null,
        outcome: 'Art you don\'t make is not the same as art you can\'t make. The difference is something you notice later.',
        effect: (p) => { p.m -= 4; p.r += 5; p.setMem('bra_tropicalia', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_bra_miracle_contradiction',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.regime === 'military_dictatorship' &&
      G.currentYear >= 1968 && G.currentYear <= 1974 &&
      G.stats.wealth >= 35 &&
      !G.mem?.bra_miracle,
    text: 'The city is building itself faster than it can be mapped. GDP growing at ten percent a year. The apartment you moved into last year didn\'t exist three years ago. The newspapers report economic figures; they are not permitted to report other figures. You are prospering in a country that is also disappearing people, and the architecture of daily life is designed to prevent those two facts from touching each other.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 6; p.addFlag('brazil_dictatorship_lived'); p.setMem('bra_miracle', true); },
  },

  {
    id: 'la_bra_diretas_ja',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear === 1984 &&
      G.age >= 18 &&
      !G.mem?.bra_diretas_ja,
    text: 'January 25th, 1984. One million people in the streets of São Paulo demanding direct elections. The Praça da Sé cannot hold them all. The military has governed since 1964. The constitutional amendment to allow a direct presidential vote will fail in Congress by twenty-two votes — but the world that produced a million-person march has already changed something.',
    choices: [
      {
        text: 'You are in the street',
        tag: null,
        outcome: 'The vote fails in the chamber but the campaign wins the country. The military negotiates its exit rather than firing on crowds this size.',
        effect: (p) => { p.m += 8; p.karma += 5; p.addFlag('diretas_ja_participant'); p.setMem('bra_diretas_ja', true); },
        inject: null,
      },
      {
        text: 'You watch from somewhere else',
        tag: null,
        outcome: 'The television shows a number of people you have never seen voluntarily assembled in one place in your country before.',
        effect: (p) => { p.m += 4; p.setMem('bra_diretas_ja', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_bra_evangelical_rise',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.religion === 'christian_catholic' &&
      G.currentYear >= 1990 && G.currentYear <= 2010 &&
      G.age >= 30 &&
      !G.mem?.bra_evangelical,
    text: 'The church at the end of the street is now something else. The same building — the Immaculate Conception, São José — is now the Igreja Universal do Reino de Deus, or the Assembleia de Deus, or a Comunidade Evangélica whose name changes yearly. Your neighbor, who used to see you at Saturday mass, goes somewhere three times a week now and speaks differently about God. This has happened in a single generation, neighborhood by neighborhood.',
    choices: [
      {
        text: 'You find something genuine in it',
        tag: null,
        outcome: 'The services are different — louder, more immediate. The community is present in ways the old parish wasn\'t.',
        effect: (p) => { p.m += 5; p.r -= 2; p.addFlag('evangelical_convert'); p.setMem('bra_evangelical', true); },
        inject: null,
      },
      {
        text: 'The old faith holds',
        tag: null,
        outcome: 'The neighborhood changes around you. The specific loneliness of remaining where you were.',
        effect: (p) => { p.m -= 3; p.r += 3; p.setMem('bra_evangelical', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // COLOMBIA
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'la_col_cartel_adjacency',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.currentYear >= 1984 && G.currentYear <= 2002 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.col_cartel_adjacency,
    text: 'You know someone. Not a friend, exactly — a relative of a colleague, a neighbor\'s son who was at school with your younger brother. He has a car now. He wears shoes that cost what you make in a month. Nobody says where the money comes from. In this city, in this decade, proximity to the cocaine economy is not something you seek out or avoid. It is a condition of geography.',
    choices: [
      {
        text: 'Maintain the distance that already exists',
        tag: null,
        outcome: 'The distance is kept without being acknowledged. This is how most people manage it.',
        effect: (p) => { p.m -= 4; p.addFlag('colombia_cartel_adjacent'); p.setMem('col_cartel_adjacency', true); },
        inject: null,
      },
      {
        text: 'Accept one small favor — it means nothing',
        tag: null,
        outcome: 'It means nothing, and it means something. The second favor is easier to accept than the first.',
        effect: (p) => { p.m -= 2; p.karma -= 4; p.mo += 200; p.addFlag('colombia_cartel_adjacent'); p.setMem('col_cartel_adjacency', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_col_cartel_offer',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.currentYear >= 1986 && G.currentYear <= 1999 &&
      G.stats.wealth >= 35 &&
      G.age >= 25 &&
      !G.mem?.col_cartel_offer,
    text: 'A man you have met twice, both times through someone else, asks to sit with you. He says he has an interest in businesses that show steady income. He doesn\'t explain why that particular quality interests him. The amount he names would clear the debt you have been managing for two years. The conversation is entirely normal in tone. That is the part that stays with you afterward.',
    choices: [
      {
        text: 'Decline — the money has a form you don\'t want',
        tag: 'principled',
        outcome: 'He is gracious. He was not expecting a different answer, you think. The debt continues.',
        effect: (p) => { p.karma += 6; p.setMem('col_cartel_offer', true); },
        inject: null,
      },
      {
        text: 'Accept — you need the capital',
        tag: null,
        outcome: 'The money arrives. The business continues. The investor requires occasional updates. You provide them.',
        effect: (p) => { p.mo += 8000; p.karma -= 10; p.addFlag('cartel_money_laundering'); p.setMem('col_cartel_offer', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_col_kidnap_culture',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.currentYear >= 1985 && G.currentYear <= 2008 &&
      G.stats.wealth >= 40 &&
      G.age >= 20 &&
      !G.mem?.col_kidnap_culture,
    text: 'There are rules you follow without calling them rules. You don\'t use the same route twice. You don\'t announce your schedule. You know the number to call. Your employer has a protocol — everyone in the office has been briefed. The precautions become so routine that you sometimes forget they are precautions and not simply the way things are done.',
    choices: null,
    effect: (p) => { p.m -= 5; p.addFlag('security_consciousness'); p.setMem('col_kidnap_culture', true); },
  },

  {
    id: 'la_col_displacement',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.currentYear >= 1985 && G.currentYear <= 2010 &&
      G.ruralUrban === 'rural' &&
      G.age >= 6 &&
      !G.mem?.col_displacement,
    text: 'They arrive one evening — men who are not soldiers or call themselves something else. They say the village will be safer elsewhere. Your family leaves before morning with what can be carried. You arrive in Bogotá or Medellín or Barranquilla in a neighborhood you did not know existed, where the streets are unpaved and the houses were built last year from materials that were not meant to be permanent.',
    choices: null,
    effect: (p) => { p.m -= 10; p.h -= 5; p.addFlag('colombia_displaced'); p.addFlag('rural_to_urban'); p.setMem('col_displacement', true); },
  },

  {
    id: 'la_col_city_transformation',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.currentYear >= 2003 && G.currentYear <= 2016 &&
      G.age >= 30 &&
      !G.mem?.col_city_transform,
    text: (G) => {
      const placeId = G.place?.id ?? ''
      if (placeId.includes('medellin') || placeId.includes('medellín')) {
        return 'Medellín was the most dangerous city in the world in 1991. The metro opened in 1995 — the first in Colombia. Cable cars reached the comunas in 2004. The city that Escobar made into a synonym for car bombs and cocaine is now in urban planning journals. You lived in both cities. They share a name.'
      }
      return 'Bogotá in 1990 was not a city you stayed in at night if you had a choice. Now there is the ciclovía — every Sunday, 120 kilometres of roads closed to cars. The homicide rate has fallen by eighty percent in fifteen years. The transformation is incomplete. It is also real.'
    },
    choices: null,
    effect: (p) => { p.m += 5; p.e += 3; p.setMem('col_city_transform', true); },
  },

  {
    id: 'la_col_farc_peace',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Colombia' &&
      G.currentYear === 2016 &&
      G.age >= 18 &&
      !G.mem?.col_farc_peace,
    text: 'The peace agreement is submitted to a referendum. The campaign for No says the deal is too lenient with men who committed atrocities. The campaign for Yes says fifty-two years is long enough. The No wins by 50.2 to 49.8 — the narrowest possible margin. The agreement is subsequently modified and ratified by Congress rather than popular vote. The war officially ends. The country splits on whether that counts.',
    choices: [
      {
        text: 'You voted Yes — fifty-two years is enough',
        tag: null,
        outcome: 'Your side lost the referendum. The peace happened anyway. You carry the loss and the relief simultaneously.',
        effect: (p) => { p.m += 3; p.r += 4; p.setMem('col_farc_peace', true); },
        inject: null,
      },
      {
        text: 'You voted No — the deal gave too much away',
        tag: null,
        outcome: 'Your side won. The deal was renegotiated and signed anyway. You are not sure what you won.',
        effect: (p) => { p.m -= 3; p.r += 6; p.setMem('col_farc_peace', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // OPERATION CONDOR — the exile who is not safe
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'la_condor_exile_warned',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.flags.has('emigrated') &&
      ['Chile', 'Argentina', 'Uruguay', 'Brazil'].includes(G.character.country.name) &&
      G.currentYear >= 1974 && G.currentYear <= 1983 &&
      G.age >= 18 &&
      !G.mem?.condor_warned,
    text: 'Someone passes you a message through two people. The message is that they know where you are. You left the country to be safe and the country has followed you. Operation Condor: the security services of Chile, Argentina, Uruguay, Brazil, Paraguay, and Bolivia cooperating across borders to find people who believed distance was protection. The distance was, in part, an illusion.',
    choices: [
      {
        text: 'Move — immediately, without telling anyone where',
        tag: null,
        outcome: 'You leave the city. The network finds you eventually, or it doesn\'t. This time it doesn\'t.',
        effect: (p) => { p.m -= 10; p.addFlag('condor_survived'); p.setMem('condor_warned', true); },
        inject: null,
      },
      {
        text: 'Contact a solidarity organisation — you\'re not the first',
        tag: null,
        outcome: 'Amnesty. Refugee committees in Paris and Stockholm. They have done this before. They help you.',
        effect: (p) => { p.m -= 6; p.karma += 5; p.addFlag('condor_survived'); p.setMem('condor_warned', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_condor_exile_network',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.flags.has('emigrated') &&
      ['Chile', 'Argentina', 'Uruguay', 'Brazil'].includes(G.character.country.name) &&
      G.currentYear >= 1973 && G.currentYear <= 1985 &&
      G.age >= 18 &&
      !G.mem?.condor_network,
    text: 'In Buenos Aires, in Paris, in Mexico City, in Stockholm — there are communities of people who left the same place. They meet in apartments and solidarity offices. They read the same news. They argue about what to do from here. The exile has its own politics, its own internal conflicts about who left and when and why. You are in it now.',
    choices: [
      {
        text: 'Commit to the work — newsletters, testimony, solidarity campaigns',
        tag: 'principled',
        outcome: 'The work is slower than everything you imagined. It matters.',
        effect: (p) => { p.m -= 3; p.karma += 6; p.addFlag('exile_political_work'); p.setMem('condor_network', true); },
        inject: null,
      },
      {
        text: 'Build a life here instead — the politics nearly cost you everything',
        tag: null,
        outcome: 'You make a life in the new place. The country you came from stays in your head. The community is one you visit but do not live in.',
        effect: (p) => { p.m += 3; p.r += 4; p.setMem('condor_network', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_condor_return_possible',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      (G.flags.has('chile_exiled') || G.flags.has('exile_political_work') || G.flags.has('condor_survived')) &&
      G.currentYear >= 1985 && G.currentYear <= 1994 &&
      G.age >= 30 &&
      !G.mem?.condor_return,
    text: 'The juntas are falling. Chile\'s plebiscite went the right way. Argentina has been a democracy since 1983. The specific danger that made you leave has been removed — officially, at least. After ten or twelve years, returning is no longer theoretical. The country you left is not the country that exists now. You are not the person who left.',
    choices: [
      {
        text: 'Go back — this is what you worked toward',
        tag: null,
        outcome: 'You return to a place that kept its name and changed its contents. The adjustment takes years. So does the relief.',
        effect: (p) => { p.m += 6; p.r -= 4; p.addFlag('returned_exile'); p.setMem('condor_return', true); },
        inject: null,
      },
      {
        text: 'Stay — you have a life here now',
        tag: null,
        outcome: 'The return was possible and you didn\'t take it. You were not sure you would make this choice until you made it.',
        effect: (p) => { p.m -= 4; p.r += 6; p.setMem('condor_return', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // FOOTBALL — national religion
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'la_arg_78_mundial_contradiction',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Argentina' &&
      G.currentYear === 1978 &&
      G.age >= 16 &&
      G.flags.has('witnessed_disappearance') &&
      !G.mem?.arg_78_mundial,
    text: 'You have seen what the government is doing. You know what is happening in the buildings near the stadium. You are also watching the World Cup final with a country that has gone collective with something you can identify as joy. Kempes scores in extra time. Argentina wins. The general is at the match in a suit. You are in the street. You know both things at the same time, and the knowing doesn\'t stop the feeling, and the feeling doesn\'t stop the knowing.',
    choices: null,
    effect: (p) => { p.r += 7; p.m += 3; p.e += 3; p.setMem('arg_78_mundial', true); },
  },

  {
    id: 'la_bra_2014_copa_heartbreak',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear === 2014 &&
      G.age >= 16 &&
      !G.mem?.bra_2014_copa,
    text: 'Germany 7, Brazil 1. At home. In a semifinal. In Belo Horizonte, the crowd goes quiet in ways that stadiums do not go quiet. In the second half the German goals arrive and then keep arriving and the noise becomes something else — not silence but its opposite, something that won\'t fit in a reaction. The score is a fact that keeps being untrue.',
    choices: null,
    effect: (p) => { p.m -= 8; p.setMem('bra_2014_copa', true); },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MEXICO
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'la_mex_pri_machine',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Mexico' &&
      G.regime === 'single_party_authoritarian' &&
      G.currentYear >= 1950 && G.currentYear <= 2000 &&
      G.age >= 18 &&
      !G.mem?.mex_pri_machine,
    text: 'An election is held. The PRI candidate wins, as the PRI candidate has won every election since 1929. The process is not exactly a fraud — votes are counted, candidates appear on ballots, polling stations open and close. But the outcome was not in doubt before the process began. Everyone who votes knows this. Most vote anyway.',
    choices: [
      {
        text: 'Vote PRI — the machine works, in its way',
        tag: null,
        outcome: 'The candidate you voted for wins. He was always going to win. You feel something that is not quite pride and not quite resignation.',
        effect: (p) => { p.m -= 3; p.r += 4; p.setMem('mex_pri_machine', true); },
        inject: null,
      },
      {
        text: 'Vote opposition — someone has to',
        tag: 'principled',
        outcome: 'The candidate you voted for loses. There may be observers; there are not enough observers. The PRI loses eventually, in 2000, after seventy-one years.',
        effect: (p) => { p.m -= 3; p.karma += 4; p.addFlag('political_active'); p.setMem('mex_pri_machine', true); },
        inject: null,
      },
      {
        text: 'Stay home — the outcome is the same either way',
        tag: null,
        outcome: 'The PRI wins regardless. Your absence is statistically invisible.',
        effect: (p) => { p.r += 3; p.setMem('mex_pri_machine', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_mex_1985_earthquake',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Mexico' &&
      G.currentYear === 1985 &&
      G.age >= 10 &&
      !G.mem?.mex_1985_earthquake,
    text: 'September 19, 1985. Magnitude 8.1. The city shakes for two minutes at 7:19 in the morning. The government response is so slow and so inadequate that citizens begin digging through rubble themselves — with their hands, with tools borrowed from construction sites, with a systematic organisation that the government was supposed to provide. Volunteers appear from everywhere. This is said, later, to be the moment Mexican civil society was born.',
    choices: [
      {
        text: 'Go to where people are digging',
        tag: null,
        outcome: 'You remove pieces of concrete for twelve hours. You find someone alive on the second day. The government arrives on the third.',
        effect: (p) => { p.m -= 8; p.h -= 5; p.karma += 8; p.addFlag('earthquake_volunteer'); p.setMem('mex_1985_earthquake', true); },
        inject: null,
      },
      {
        text: 'Send supplies — you have a family to attend to',
        tag: null,
        outcome: 'The neighbourhood organises itself. You bring water and food to the collection point. This too is necessary.',
        effect: (p) => { p.m -= 6; p.karma += 4; p.setMem('mex_1985_earthquake', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_mex_1982_devaluation',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Mexico' &&
      G.currentYear >= 1982 && G.currentYear <= 1984 &&
      G.age >= 16 &&
      !G.mem?.mex_devaluation,
    text: 'In August 1982 Mexico devalues the peso and nationalises the banks. Savings denominated in pesos are now worth fifty-two percent of what they were a month ago. Families who considered themselves middle-class recalculate. The word *devaluación* enters daily speech and stays there. The IMF arrives with conditions and the conditions have a shape: cut spending, open markets, reduce wages in real terms.',
    choices: null,
    effect: (p) => { p.w -= 12; p.m -= 8; p.addFlag('hyperinflation_generation'); p.setMem('mex_devaluation', true); },
  },

  {
    id: 'la_mex_zapatista_1994',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Mexico' &&
      G.currentYear === 1994 &&
      G.age >= 14 &&
      !G.mem?.mex_zapatista,
    text: 'On January 1, 1994 — the day NAFTA comes into force — the Zapatistas take four towns in Chiapas. The communiqué is dated from the mountains and signed by the EZLN. It says: Enough. The men in ski masks speak about indigenous rights and free trade and the colonial debt. The government calls them terrorists. They have, by sunrise, made NAFTA mean something it was not supposed to mean.',
    choices: [
      {
        text: 'The uprising is necessary — NAFTA benefits the few',
        tag: 'principled',
        outcome: 'The uprising ends in a ceasefire within twelve days, but the political debate it opens does not close.',
        effect: (p) => { p.m += 3; p.karma += 5; p.addFlag('political_active'); p.setMem('mex_zapatista', true); },
        inject: null,
      },
      {
        text: 'The violence is wrong, whatever the cause',
        tag: null,
        outcome: 'The ceasefire comes quickly. The Zapatistas remain in the mountains. The question of Chiapas is not resolved.',
        effect: (p) => { p.m -= 3; p.r += 4; p.setMem('mex_zapatista', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_mex_maquiladora',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Mexico' &&
      G.character.gender === 'female' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1982 && G.currentYear <= 2005 &&
      G.age >= 16 && G.age <= 30 &&
      !G.flags.has('emigrated') &&
      !G.mem?.mex_maquiladora,
    text: 'The assembly plants on the northern border are hiring. The wage is more than you would see at home in a month. You would be in Tijuana or Juárez or Nogales, in a room with other women from Oaxaca and Chiapas and Guerrero, assembling circuit boards or stitching jeans for brands whose names you know from their advertisements. The freedom is real. The vulnerability is also real.',
    choices: [
      {
        text: 'Go — the wages are your way out',
        tag: null,
        outcome: 'You arrive with an address on a piece of paper. The plant is real, the wage is real, the dormitory is also real. You send money home. You build a life that looks nothing like what was expected of you.',
        effect: (p) => { p.m += 5; p.mo += 600; p.addFlag('maquiladora_worker'); p.addFlag('rural_to_urban'); p.setMem('mex_maquiladora', true); },
        inject: null,
      },
      {
        text: 'Stay — the risk is too great',
        tag: null,
        outcome: 'You hear later from the women who went. Some came back with money. Some did not come back.',
        effect: (p) => { p.m -= 4; p.r += 3; p.setMem('mex_maquiladora', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PERU
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'la_per_sendero',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.currentYear >= 1983 && G.currentYear <= 1993 &&
      G.age >= 15 &&
      !G.mem?.per_sendero,
    text: 'The blackouts began first — transmission towers bombed in the mountains, the lights of Lima going out in sections. Then the car bombs. Then the lists. The Shining Path and the army are fighting a war whose front line is sometimes a village market and sometimes a university cafeteria and sometimes this street. The question that replaces every other question: whose side do people think you are on?',
    choices: [
      {
        text: 'Keep your head down — this is not a war you chose',
        tag: null,
        outcome: 'Most people survive by being invisible. The specific cost of invisibility is that it looks, from outside, like indifference.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('sendero_generation'); p.setMem('per_sendero', true); },
        inject: null,
      },
      {
        text: 'Someone has to speak clearly about what is happening',
        tag: 'principled',
        outcome: 'Speaking clearly about what is happening is dangerous from multiple directions in 1988. You speak anyway.',
        effect: (p) => { p.m -= 6; p.karma += 6; p.addFlag('sendero_generation'); p.addFlag('political_active'); p.setMem('per_sendero', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_per_indigenous_crossfire',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1983 && G.currentYear <= 1993 &&
      G.age >= 8 &&
      !G.mem?.per_indigenous_crossfire,
    text: 'The Shining Path came and said the village was with them. Then the army came and said the village was with the Shining Path. The logic of both claims required the village to have chosen something it had not chosen. In the highlands of Ayacucho and Junín and Huancavelica, 70,000 people died in this argument between two forces, neither of which asked the people in the middle what they thought.',
    choices: null,
    effect: (p) => { p.m -= 12; p.h -= 6; p.addFlag('sendero_generation'); p.addFlag('war_childhood'); p.setMem('per_indigenous_crossfire', true); },
  },

  {
    id: 'la_per_fujimori_autogolpe',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.currentYear === 1992 &&
      G.age >= 16 &&
      !G.mem?.per_fujimori_golpe,
    text: 'April 5, 1992. Fujimori appears on television in military company and announces he is dissolving Congress and suspending the judiciary. He calls it a necessary correction. The polls show sixty percent approval. Terrorism has been catastrophic and the institutions he dissolved were failing. The logic is comprehensible. This is what makes it worth examining.',
    choices: [
      {
        text: 'The institutions were broken — something had to give',
        tag: null,
        outcome: 'Fujimori captures Guzmán within five months and the Shining Path collapses. The democracy that was suspended does not fully return.',
        effect: (p) => { p.r += 6; p.addFlag('fujimori_supported'); p.setMem('per_fujimori_golpe', true); },
        inject: null,
      },
      {
        text: 'A democracy that suspends itself is not a solution',
        tag: 'principled',
        outcome: 'The OAS condemns it. The US suspends aid briefly. Fujimori holds new elections and the condemnation fades. The point stands.',
        effect: (p) => { p.m -= 4; p.karma += 5; p.addFlag('political_active'); p.setMem('per_fujimori_golpe', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_per_vladivideo',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Peru' &&
      G.currentYear >= 2000 && G.currentYear <= 2002 &&
      G.age >= 25 &&
      !G.mem?.per_vladivideo,
    text: 'The videos began appearing in September 2000. Vladimiro Montesinos — Fujimori\'s intelligence chief — had recorded himself bribing congressmen, judges, television channel owners. The videos were systematic, comprehensive — a bureaucracy of corruption on tape. The president flees to Japan via Brunei and faxes his resignation. It is the most documented fall of a government in Latin American history.',
    choices: null,
    effect: (p) => { p.m -= 4; p.e += 4; p.addFlag('witnessed_truth_commission'); p.setMem('per_vladivideo', true); },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // VENEZUELA
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'la_ven_chavez_hope',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 1999 && G.currentYear <= 2007 &&
      G.age >= 18 &&
      !G.mem?.ven_chavez_hope,
    text: 'Chávez wins in December 1998 and the country immediately becomes more legible. The oil is the country\'s and the country\'s money will go to the country\'s people — the misiones, the Barrio Adentro clinics staffed by Cuban doctors, the subsidised food markets in the poor barrios. If you are in the barrio, a man is repairing what was broken and calling it by its name. The opposition calls him a dictator. In the barrio, the word means something different.',
    choices: [
      {
        text: 'The misiones are changing things — you see it',
        tag: null,
        outcome: 'The literacy mission, the healthcare mission, the housing mission. For a decade, the poverty figures fall. The story is not finished.',
        effect: (p) => { p.m += 6; p.addFlag('chavista_generation'); p.setMem('ven_chavez_hope', true); },
        inject: null,
      },
      {
        text: 'The populism has a price that will arrive eventually',
        tag: null,
        outcome: 'The price arrives. Whether you were right is a question that depends on which years you count.',
        effect: (p) => { p.m -= 3; p.r += 5; p.setMem('ven_chavez_hope', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_ven_exodus_decision',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Venezuela' &&
      G.currentYear >= 2016 && G.currentYear <= 2022 &&
      G.age >= 25 &&
      !G.flags.has('emigrated') &&
      !G.mem?.ven_exodus,
    text: 'Five million Venezuelans have left. You know people in Bogotá, in Lima, in Buenos Aires, in Madrid. They send messages — with the specific texture of people who left and need you to understand why, and also the specific texture of people who need to know you are still okay, still the country they left. Every week the question recalculates: stay, or go?',
    choices: [
      {
        text: 'Leave — there is nothing left to stay for',
        tag: null,
        outcome: 'You cross the border with what fits in a bag. The country you arrive in has a specific way of receiving you.',
        effect: (p) => { p.m -= 8; p.addFlag('emigrated'); p.addFlag('venezuela_exodus'); p.setResidency('undocumented'); p.setMem('ven_exodus', true); },
        inject: null,
      },
      {
        text: 'Stay — your family is here',
        tag: null,
        outcome: 'The ones who stay are the ones the country runs on. Staying is also a choice that costs something.',
        effect: (p) => { p.m -= 6; p.r += 5; p.setMem('ven_exodus', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // CUBA
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'la_cub_cdr',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1965 && G.currentYear <= 2020 &&
      G.age >= 18 &&
      !G.mem?.cub_cdr,
    text: 'The Committees for the Defense of the Revolution meet on your block every few weeks. Attendance is voluntary in the way that many things in Cuba are voluntary — nobody compels you, but your absence is noticed and the noting has a form. The meeting covers block maintenance, hygiene inspections, and the general category of counterrevolutionary activity, which is defined broadly and updated frequently.',
    choices: [
      {
        text: 'Attend — you have nothing to hide',
        tag: null,
        outcome: 'Attendance is the lowest-cost option. You say what is safe to say and go home.',
        effect: (p) => { p.m -= 3; p.addFlag('cuba_cdr_attendee'); p.setMem('cub_cdr', true); },
        inject: null,
      },
      {
        text: 'Don\'t attend — they\'ll note it and nothing will happen',
        tag: null,
        outcome: 'Nothing happens immediately. The noting is done. The noting may matter at some future point.',
        effect: (p) => { p.m -= 5; p.r += 3; p.setMem('cub_cdr', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_cub_special_period',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1991 && G.currentYear <= 2000 &&
      G.age >= 16 &&
      !G.mem?.cub_special_period,
    text: 'The Soviet Union is gone and with it the subsidies. Castro announces the Special Period in Time of Peace. The bus that went to your workplace has no fuel. The bicycle is now the primary transport for five million Cubans. The state ration covers half of what it covered last year. The people who have dollars — a relative in Miami, a job in the tourist economy — are eating differently from everyone else.',
    choices: null,
    effect: (p) => { p.w -= 10; p.h -= 6; p.m -= 8; p.addFlag('special_period_generation'); p.setMem('cub_special_period', true); },
  },

  {
    id: 'la_cub_leaving_decision',
    phase: 'young_adult',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1994 && G.currentYear <= 2015 &&
      G.age >= 18 && G.age <= 40 &&
      !G.flags.has('emigrated') &&
      !G.mem?.cub_leaving,
    text: 'The balsero crisis of August 1994: 35,000 Cubans cross the Florida Strait on rafts and inner tubes in three months. The odds are not good. The Coast Guard turns back some; others do not arrive. You know people who went. The 90 miles is a calculation people have been making since 1961 and will make for decades more. It is your calculation now.',
    choices: [
      {
        text: 'Leave — anything across the water is better than this',
        tag: null,
        outcome: 'The crossing is 90 miles. The raft holds. You arrive. Miami is nothing like you imagined and exactly what you imagined simultaneously.',
        effect: (p) => { p.m -= 10; p.h -= 8; p.addFlag('emigrated'); p.addFlag('cuba_balsero'); p.setResidency('refugee_status'); p.setMem('cub_leaving', true); },
        inject: null,
      },
      {
        text: 'Stay — you won\'t risk the crossing',
        tag: null,
        outcome: 'Others go and some arrive and some don\'t. You stay. You build a life inside the specific limits of this one.',
        effect: (p) => { p.m -= 5; p.r += 5; p.setMem('cub_leaving', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_cub_double_economy',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Cuba' &&
      G.currentYear >= 1994 && G.currentYear <= 2021 &&
      G.age >= 25 &&
      !G.mem?.cub_double_economy,
    text: 'The convertible peso trades one-to-one with the dollar. The libreta and peso economy covers the basics. The dollar economy covers everything else. If you have a relative in Miami who sends fifty dollars a month you live differently from someone who doesn\'t. The doctor who earns in pesos and the hotel worker who earns in tips: the same apartment block, two different cities.',
    choices: null,
    effect: (p) => { p.r += 5; p.addFlag('cuba_double_economy'); p.setMem('cub_double_economy', true); },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BOLIVIA
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'la_bol_coup_radio',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Bolivia' &&
      G.regime === 'military_dictatorship' &&
      G.currentYear >= 1964 && G.currentYear <= 1982 &&
      G.age >= 8 &&
      !G.mem?.bol_coup_radio,
    text: 'The radio is playing military music. This is how you know. No programme, no announcer — just the march, which means the army has decided something and the government that existed this morning no longer exists. Bolivia has had more governments than years of independence. Your parents explain this with the expression of people explaining weather: something that happens, that has to be waited out.',
    choices: null,
    effect: (p) => { p.m -= 5; p.addFlag('political_aware'); p.addFlag('coup_generation'); p.setMem('bol_coup_radio', true); },
  },

  {
    id: 'la_bol_evo_morales',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Bolivia' &&
      G.currentYear >= 2006 && G.currentYear <= 2012 &&
      G.age >= 20 &&
      !G.mem?.bol_evo,
    text: (G) => {
      const ethnicId = G.character.ethnicity?.id ?? ''
      if (ethnicId.includes('quechua') || ethnicId.includes('aymara')) {
        return 'Evo Morales is inaugurated first in the traditional ceremony at Tiwanaku, in Aymara and Quechua, with the coca leaf and the wiphala. The second ceremony is in La Paz. You have waited your entire life for a person who looks like you to stand in this place and say: the original people of this land are no longer simply the majority that does not govern.'
      }
      return 'Evo Morales becomes president in January 2006. He nationalises the gas fields, raises the minimum wage, expands social programmes funded by hydrocarbon revenues. The poverty rate falls from sixty-three percent to thirty-five by 2014. The country is trying something it has not tried before.'
    },
    choices: [
      {
        text: 'This government represents something real',
        tag: null,
        outcome: 'The poverty figures, the literacy figures, the maternal mortality figures change. This is documented.',
        effect: (p) => { p.m += 6; p.addFlag('bolivarian_generation'); p.setMem('bol_evo', true); },
        inject: null,
      },
      {
        text: 'The nationalisations will damage long-term investment',
        tag: null,
        outcome: 'The foreign companies renegotiate rather than leave. The gas revenues flow. Your concern was valid and had less effect than you thought.',
        effect: (p) => { p.r += 4; p.setMem('bol_evo', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // GUATEMALA
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'la_gua_scorched_earth',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Guatemala' &&
      G.ruralUrban === 'rural' &&
      G.currentYear >= 1981 && G.currentYear <= 1984 &&
      G.age >= 6 &&
      !G.mem?.gua_scorched_earth,
    text: 'The soldiers say the village is with the guerrillas. The guerrillas had come earlier and said the village must support them. Both statements required the village to choose something it was not choosing. Ríos Montt\'s campaign was called Victoria 82 in the army\'s communiqués. In the Ixil Triangle, in Quiché, in Huehuetenango — 626 villages destroyed. The UN called it genocide. The courts, eventually, agreed.',
    choices: null,
    effect: (p) => { p.m -= 15; p.h -= 10; p.addFlag('genocide_survivor'); p.addFlag('war_childhood'); p.addFlag('displaced'); p.setMem('gua_scorched_earth', true); },
  },

  {
    id: 'la_gua_civil_war_texture',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Guatemala' &&
      G.currentYear >= 1970 && G.currentYear <= 1995 &&
      G.age >= 18 &&
      !G.mem?.gua_civil_war,
    text: 'The civil war has been running since 1960. It is the water in this country. The army, the paramilitaries, the death squads, the guerrilla groups — most people are not in any of them and all of them affect most people. You know what the ear is cut off for and what the body in the road means as a message, though you have not been told explicitly. You developed this knowledge slowly and entirely.',
    choices: [
      {
        text: 'Survive — say nothing, see nothing, know nothing officially',
        tag: null,
        outcome: 'Most people survive this way. The cost is carried internally.',
        effect: (p) => { p.m -= 8; p.r += 5; p.addFlag('war_childhood'); p.setMem('gua_civil_war', true); },
        inject: null,
      },
      {
        text: 'Work with community organisations — someone has to',
        tag: 'principled',
        outcome: 'Community organisers are on lists. You learn to do necessary things in ways that are less visible.',
        effect: (p) => { p.m -= 6; p.karma += 6; p.addFlag('political_active'); p.setMem('gua_civil_war', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_gua_peace_1996',
    phase: 'midlife',
    weight: 2,
    when: (G) =>
      G.character.country.name === 'Guatemala' &&
      G.currentYear >= 1996 && G.currentYear <= 1999 &&
      G.age >= 20 &&
      !G.mem?.gua_peace,
    text: 'December 29, 1996. The peace accords are signed at the National Palace after 36 years of war and 200,000 dead. The CEH — the historical clarification commission — will later find that 93% of documented atrocities were committed by state forces and that these acts constituted genocide. A country that has spent a generation learning to see nothing is now asked to remember and reckon with what it saw.',
    choices: null,
    effect: (p) => { p.m -= 4; p.e += 4; p.addFlag('witnessed_truth_commission'); p.setMem('gua_peace', true); },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // HAITI
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'la_hai_tonton_macoutes',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Haiti' &&
      G.currentYear >= 1958 && G.currentYear <= 1986 &&
      G.age >= 14 &&
      !G.mem?.hai_macoutes,
    text: 'The tonton macoutes answer to Papa Doc — then Baby Doc — not to any law. The name comes from a bogeyman of Haitian folk tales, the uncle who carries children away in a bag. The real ones carry machetes and guns and have the state\'s permission for whatever they decide to do. The section chief in your commune is known. What he has done is known. What he could do is the more relevant fact.',
    choices: [
      {
        text: 'Give him what he wants — you have no other option',
        tag: null,
        outcome: 'What he wants varies. Today it is money. Tomorrow will be different. The relationship has a logic that is entirely his to determine.',
        effect: (p) => { p.m -= 8; p.mo -= 100; p.r += 5; p.addFlag('duvalier_generation'); p.setMem('hai_macoutes', true); },
        inject: null,
      },
      {
        text: 'Avoid him entirely — never be visible',
        tag: null,
        outcome: 'The invisibility is a strategy with a cost. It works until it doesn\'t.',
        effect: (p) => { p.m -= 6; p.r += 4; p.addFlag('duvalier_generation'); p.setMem('hai_macoutes', true); },
        inject: null,
      },
    ],
    effect: null,
  },

  {
    id: 'la_hai_duvalier_falls',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Haiti' &&
      G.currentYear >= 1986 && G.currentYear <= 1988 &&
      G.age >= 20 &&
      !G.mem?.hai_duvalier_falls,
    text: 'February 7, 1986. Jean-Claude Duvalier boards a US Air Force plane at 3 a.m. with his wife and associates and leaves for France — taking the national treasury with him, the amount contested but the fact not. Twenty-nine years of Duvalierism. The streets fill at dawn. People are tearing down the VSN symbols and the portraits. The specific feeling is not joy but the vertigo of a fixed point suddenly not being there.',
    choices: null,
    effect: (p) => { p.m += 6; p.r += 5; p.addFlag('haiti_liberation_moment'); p.setMem('hai_duvalier_falls', true); },
  },

  {
    id: 'la_hai_earthquake_2010',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Haiti' &&
      G.currentYear === 2010 &&
      !G.mem?.hai_earthquake_2010,
    text: 'January 12, 2010. 4:53 pm. Magnitude 7.0, epicentre 25 kilometres from Port-au-Prince. Two hundred and twenty thousand people die. One and a half million are displaced in a country of ten million. The Presidential Palace collapses. The parliament collapses. The main hospital collapses. International aid arrives in quantities that dwarf the country\'s GDP. You are alive. Most of the people near you are alive. This is not certain for the first hour.',
    choices: [
      {
        text: 'Find your family first',
        tag: null,
        outcome: 'The searching takes hours. Everyone is found, or not found, on their own schedule. This is the worst thing about a disaster — the information arrives at its own pace.',
        effect: (p) => { p.m -= 18; p.h -= 10; p.addFlag('earthquake_survivor'); p.addFlag('disaster_survivor'); p.setMem('hai_earthquake_2010', true); },
        inject: null,
      },
      {
        text: 'Help whoever you can reach immediately',
        tag: null,
        outcome: 'You pull people out of rubble before dark. Your family is safe when you find them.',
        effect: (p) => { p.m -= 15; p.h -= 10; p.karma += 6; p.addFlag('earthquake_survivor'); p.addFlag('disaster_survivor'); p.setMem('hai_earthquake_2010', true); },
        inject: null,
      },
    ],
    effect: null,
  },

]
