// Greece and Portugal character events
// Greece: Colonels' junta 1967-74, Polytechnic uprising 1973, Metapolitefsi transition, debt crisis 2010-18
// Portugal: Estado Novo dictatorship 1926-74, colonial wars 1961-74, Carnation Revolution 1974, retornados, EC accession 1986

export const GREECE_PORTUGAL_EVENTS = [

  // ═══════════════════════════════════════════════════════════════════════
  // GREECE
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'gr_junta_announcement',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Greece' &&
      G.currentYear === 1967 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem.grJunta,
    text: 'April 21, 1967. You wake before dawn to silence from the radio. When the radio comes back, it is playing military marches — the kind of music that has no civilian use. By morning the word is out: tanks are positioned around Athens, the king is under house arrest, and a group of colonels have announced the salvation of the nation from the communist threat. The word "salvation" in official Greek from this point forward will carry an aftertaste you will not forget.',
    choices: [
      {
        text: 'You learn to adapt. You get through it quietly.',
        tag: null,
        outcome: 'The calculation is simple and ugly: what you say, and where, and to whom. You become skilled at it faster than you expected.',
        effect: (p) => { p.m -= 8; p.addFlag('learned_silence'); p.addFlag('junta_generation'); p.setMem('grJunta', true) },
      },
      {
        text: 'You find ways to resist quietly — what passes between people in private.',
        tag: null,
        outcome: 'You do not do anything that would bring you to anyone\'s attention. The resistance is internal, conducted in whispers, and it costs you something to keep it contained.',
        effect: (p) => { p.m -= 12; p.karma += 5; p.addFlag('dissident_reader'); p.addFlag('junta_generation'); p.setMem('grJunta', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gr_junta_culture',
    phase: 'adolescence',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Greece' &&
      G.currentYear >= 1967 && G.currentYear <= 1973 &&
      G.age >= 14 && G.age <= 30 &&
      !G.mem.grCulture,
    text: 'The junta has opinions about how you should look. Long hair on men is a problem. Miniskirts on women are a problem. The Theodorakis records are confiscated — Mikis Theodorakis himself is in prison. Sophocles can be performed only with government approval, which means the government has decided it has opinions about Sophocles. You are growing up in a country that has made aesthetics into a security matter. The things that are banned tell you everything about who is afraid of what.',
    choices: [
      {
        text: 'You comply, at least in public. You perform what they want to see.',
        tag: null,
        outcome: 'The performance becomes second nature. You are not sure, later, whether that is an adaptation or a loss.',
        effect: (p) => { p.m -= 7; p.addFlag('authoritarian_childhood'); p.addFlag('junta_youth'); p.setMem('grCulture', true) },
      },
      {
        text: 'You find the underground — the music that moves in private apartments, the books passed between people.',
        tag: null,
        outcome: 'Knowing what is banned and seeking it out anyway is its own kind of education. You learn more from the forbidden shelves than from any curriculum.',
        effect: (p) => { p.m -= 4; p.e += 6; p.addFlag('dissident_reader'); p.addFlag('junta_youth'); p.setMem('grCulture', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gr_polytechnic_1973',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Greece' &&
      G.currentYear === 1973 &&
      G.age >= 18 && G.age <= 30 &&
      !G.mem.grPoly,
    text: 'November 17, 1973. Students at Athens Polytechnic occupy the building. A homemade radio transmitter broadcasts from inside: "This is the Polytechnic. People of Greece, the Polytechnic is the banner of our struggle and your struggle." The broadcast continues for three days. You are close enough to hear it — through a window, from a street nearby, through someone else\'s transistor radio. In the early morning of November 17th, the military sends a tank through the iron gate. The broadcast stops.',
    choices: [
      {
        text: 'You go to the square. You are there when it happens.',
        tag: null,
        outcome: 'The tank moves and you feel it in your feet before you see it. What happens next you remember in fragments, in the specific way that the body stores what the mind cannot keep whole.',
        effect: (p) => { p.m -= 15; p.r += 12; p.karma += 8; p.addFlag('political_active'); p.addFlag('polytechnic_generation'); p.setMem('grPoly', true) },
      },
      {
        text: 'You listen from a distance. You do not go.',
        tag: null,
        outcome: 'You are not there, and not being there is something you carry. The broadcast was real. The tank was real. That you heard it from a distance rather than from the street is also real.',
        effect: (p) => { p.m -= 12; p.r += 8; p.addFlag('polytechnic_generation'); p.setMem('grPoly', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'gr_junta_fall_1974',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Greece' &&
      G.currentYear === 1974 &&
      G.age >= 20 &&
      !G.mem.grFall,
    text: 'The Cyprus coup fails and takes the junta with it. Karamanlis returns from Paris in the middle of the night — the plane lands at 2am, and there are people at the airport, more than anyone expected. Within days the radio is playing Theodorakis. You hear a song you knew before 1967, a song that has been illegal for seven years, playing openly from a shop doorway, and you stop walking. You had not forgotten the melody. You had not known how much you had missed it.',
    choices: null,
    effect: (p) => { p.m += 15; p.karma += 8; p.addFlag('revolution_generation'); p.setMem('grFall', true) },
  },

  {
    id: 'gr_metapolitefsi',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Greece' &&
      G.currentYear >= 1975 && G.currentYear <= 1982 &&
      G.flags.has('revolution_generation') &&
      !G.mem.grMeta,
    text: 'The metapolitefsi — the change of regime. The question of what to do with those who collaborated, who informed, who ran the interrogation cells, is discussed and mostly set aside. The trials happen but they are not what anyone hoped. PASOK wins in 1981, the first socialist government, and Andreas Papandreou speaks to a crowd in Syntagma and the crowd is not the size of the crowd in a country where this kind of election had been impossible eight years ago. You vote. The act of voting, the act of the vote counting and the result meaning something, is not something you had expected to feel the way you feel it.',
    choices: null,
    effect: (p) => { p.m += 10; p.karma += 5; p.addFlag('metapolitefsi_generation'); p.setMem('grMeta', true) },
  },

  {
    id: 'gr_debt_crisis_2010',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Greece' &&
      G.currentYear >= 2010 && G.currentYear <= 2016 &&
      G.age >= 30 && G.age <= 65 &&
      !G.mem.grDebt,
    text: 'The troika arrives: the IMF, the ECB, the European Commission. The word enters daily speech as if it has always been there. Pensions cut. The pharmacies run short of medicine. The ATMs have a daily limit of sixty euros. The television shows queues outside banks that look like footage from a different kind of country. A pension your father or mother earned over forty years is reduced by thirty percent while the conditions for the next tranche of the loan are negotiated in Brussels by people who have never queued for sixty euros.',
    choices: [
      {
        text: 'You stay. You manage. You find the way through.',
        tag: null,
        outcome: 'The managing has costs that do not appear on any balance sheet. You learn what it means to plan around scarcity that is official policy.',
        effect: (p) => { p.m -= 16; p.w -= 8; p.r += 8; p.addFlag('greece_crisis_stayed'); p.setMem('grDebt', true) },
      },
      {
        text: 'You leave. Germany, the Netherlands, the UK — anywhere the numbers work.',
        tag: null,
        outcome: 'You are part of a new Greek emigration, the third or fourth wave depending on how you count, the first one with university degrees and EU passports and nowhere in particular to aim them.',
        effect: (p) => { p.m -= 10; p.addFlag('emigrated'); p.addFlag('greece_crisis_emigrant'); p.setResidency('work_visa'); p.setMem('grDebt', true) },
      },
    ],
    effect: null,
  },

  // ── CIVIL WAR FAMILY MEMORY ───────────────────────────────────────────────────

  {
    id: 'gr_civil_war_memory',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Greece' &&
      G.currentYear >= 1945 && G.currentYear <= 1965 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.grCivilWar,
    text: 'The Civil War ended in 1949 but it did not end in the family. The division between those who fought for the government and those who fought for the Communists ran through villages, through extended families, sometimes through a single household. You are growing up in its aftermath. A relative who was on the losing side: there are things they cannot say, things they cannot do, lists their names are on. Your father does not speak to his brother. There is a word for this — to be "nationally-minded" or to be "of the left" — but in the family the word is not spoken, only practiced. The Civil War killed more Greeks than the German occupation. The Germans are discussed. The Civil War is not.',
    choices: [
      {
        text: 'Your family was on the winning side. The silence is the silence of what winning required.',
        tag: null,
        outcome: 'The things that were done to win are in the family as an absence — as things not discussed rather than as stories. You learn to notice absences.',
        effect: (p) => { p.r += 6; p.e += 4; p.addFlag('gr_civil_war_memory'); p.setMem('grCivilWar', true); },
      },
      {
        text: 'Your family was on the losing side. There are things you cannot say out loud in this decade.',
        tag: null,
        outcome: 'What you cannot say becomes the language of the house — implied, known between family members, inadmissible in the street.',
        effect: (p) => { p.m -= 8; p.r += 7; p.addFlag('gr_civil_war_memory'); p.addFlag('political_leaning_left'); p.setMem('grCivilWar', true); },
      },
    ],
    effect: null,
  },

  // ── THE OXI REFERENDUM 2015 ───────────────────────────────────────────────────

  {
    id: 'gr_oxi_2015',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Greece' &&
      G.currentYear >= 2015 && G.currentYear <= 2016 &&
      G.age >= 20 &&
      !G.mem?.grOxi,
    text: 'July 5, 2015. The question is: do you accept the creditors\' austerity terms. The ballot says \'OXI\' for no and \'NAI\' for yes. Sixty-one percent vote OXI. Tsipras holds it up as a mandate. One week later he accepts terms significantly more severe than the ones that were rejected. The sequence — the referendum, the week, the capitulation — teaches something specific about the gap between democratic mandate and economic power. The word OXI has meant something specific in Greece since October 1940, when Metaxas said it to Mussolini. It was used again in July 2015, and meant something different, and produced a different result.',
    choices: [
      {
        text: 'You voted OXI. The vote was real. The outcome was not what the vote indicated.',
        tag: null,
        outcome: 'The lesson is not about Tsipras. The lesson is about the structure that produced the outcome.',
        effect: (p) => { p.m -= 10; p.r += 7; p.e += 4; p.addFlag('gr_oxi_generation'); p.setMem('grOxi', true); },
      },
      {
        text: 'You voted NAI, or abstained. You believed the referendum was theater.',
        tag: null,
        outcome: 'You were right about the theater. The people who voted OXI were also right about what they were saying. Both can be true.',
        effect: (p) => { p.m -= 7; p.r += 5; p.e += 3; p.addFlag('gr_oxi_generation'); p.setMem('grOxi', true); },
      },
    ],
    effect: null,
  },

  // ── BRAIN DRAIN 2010s ─────────────────────────────────────────────────────────

  {
    id: 'gr_brain_drain_2010s',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Greece' &&
      G.currentYear >= 2010 && G.currentYear <= 2020 &&
      G.age >= 22 && G.age <= 38 &&
      G.stats.smarts > 45 &&
      !G.mem?.grBrainDrain,
    text: 'Between 2008 and 2018, four hundred thousand Greeks emigrated — the majority of them with university degrees. You have the degree. You have the EU passport. Germany, the Netherlands, Australia, Canada: the specific geography of where Greeks went. You know people who are already there. The salary offered in Germany is three times what the Greek market offers for the same work, if the Greek market offers it at all. The unemployment rate for your age group has reached fifty percent. The question is whether you are a person who stays or a person who goes, and the question is answered by the same practical arithmetic that is answering it for four hundred thousand other people.',
    choices: [
      {
        text: 'You go. The degree travels. You follow it.',
        tag: null,
        outcome: 'You leave carrying the specific double grief of economic emigration: you did not leave because you wanted to, and you do not return because you cannot afford to.',
        effect: (p) => { p.m -= 8; p.r += 7; p.e += 5; p.addFlag('emigrated'); p.addFlag('greece_crisis_emigrant'); p.setResidency('work_visa'); p.setMem('grBrainDrain', true); },
      },
      {
        text: 'You stay. You will find a way to make it work here.',
        tag: null,
        outcome: 'Staying is a choice that the people who left have complicated feelings about. The country needs people who stay. The country is also not making it easy.',
        effect: (p) => { p.m -= 6; p.r += 6; p.karma += 4; p.addFlag('greece_crisis_stayed'); p.setMem('grBrainDrain', true); },
      },
    ],
    effect: null,
  },

  // ── LATE RECKONING ────────────────────────────────────────────────────────────

  {
    id: 'gr_late_reckoning',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Greece' &&
      G.currentYear >= 1990 &&
      G.age >= 55 &&
      (G.flags.has('gr_civil_war_memory') || G.flags.has('polytechnic_generation') ||
       G.flags.has('greece_crisis_stayed') || G.flags.has('revolution_generation')) &&
      !G.mem?.grLate,
    text: (G) => {
      const seenCivilWar = G.flags.has('gr_civil_war_memory')
      const seenJunta = G.flags.has('polytechnic_generation') || G.flags.has('revolution_generation')
      if (seenCivilWar && seenJunta) {
        return 'You lived the Civil War\'s aftermath — the silences, the lists, the family fractures — and then the junta, and then the Polytechnic, and then the Metapolitefsi, and then the crisis. Greece has had many more opportunities for catastrophe per generation than most countries. You have been in possession of all of them. You have also been alive for the country that kept reconstituting itself on the other side of each one.'
      }
      if (seenJunta) {
        return 'From the junta to the Metapolitefsi to the EU to the crisis to the OXI vote and its aftermath: you have seen what Greece looked like when it had no democracy and what it looked like when democracy produced an outcome that was overridden by economics. The generation that holds both versions is yours.'
      }
      return 'The crisis decade taught specific things about what a country can lose and what it can absorb. Pensions cut. ATMs limited. Young people leaving. The country absorbing it — or failing to absorb it cleanly — over years. You watched from the inside. That vantage point is not transferable.'
    },
    choices: null,
    effect: (p) => { p.r += 7; p.karma += 4; p.addFlag('gr_testigo_generation'); p.setMem('grLate', true); },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PORTUGAL
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'pt_estado_novo_texture',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Portugal' &&
      G.currentYear >= 1940 && G.currentYear <= 1973 &&
      G.age >= 12 && G.age <= 25 &&
      !G.mem.ptEstado,
    text: 'The PIDE are not everywhere but they might be. That is the point. The informer network — vizinhos, colleagues, the person at the next workbench — is as much an instrument of control as the actual arrests. You have learned to calibrate: the sentence you do not finish at work, the opinion you do not complete in the café, the joke you start and then redirect. Salazar has been in power since before your parents can remember politics being anything else. The Estado Novo is not exceptional to you. It is the shape of ordinary life.',
    choices: [
      {
        text: 'You keep your head down. The walls are thin everywhere.',
        tag: null,
        outcome: 'The discipline becomes invisible over time. You stop noticing the sentences you do not say. That is also a thing that happens to people.',
        effect: (p) => { p.m -= 8; p.addFlag('learned_silence'); p.addFlag('authoritarian_childhood'); p.addFlag('estado_novo_generation'); p.setMem('ptEstado', true) },
      },
      {
        text: 'You find people who speak plainly — carefully chosen, trusted rooms.',
        tag: null,
        outcome: 'The trust required to say what you actually think, and the pleasure of saying it, are not small things when they have been scarce.',
        effect: (p) => { p.m -= 5; p.e += 5; p.addFlag('dissident_reader'); p.addFlag('estado_novo_generation'); p.setMem('ptEstado', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'pt_colonial_war',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Portugal' &&
      G.character.gender === 'male' &&
      G.currentYear >= 1961 && G.currentYear <= 1974 &&
      G.age >= 18 && G.age <= 28 &&
      !G.mem.ptWar,
    text: 'The conscription notice arrives. Angola, Guinea-Bissau, Mozambique — Portugal is fighting three simultaneous colonial wars to hold an empire that the rest of the world has already ended. One hundred thousand Portuguese soldiers are in Africa at any time. The official position is that these are not colonies but provinces, that the people there are part of the Portuguese nation, that the war is against external communism rather than internal independence movements. The men coming back tell a different version in private, when they tell anything at all.',
    choices: [
      {
        text: 'You serve. You go to Africa.',
        tag: null,
        outcome: 'What the war looks like from inside it — the heat, the ambushes, the question of what you are there for — is not the same as what the war looks like on the official newsreels. You come back changed in ways that take years to name.',
        effect: (p) => { p.h -= 8; p.r += 10; p.addFlag('colonial_war_served'); p.setMem('ptWar', true) },
      },
      {
        text: 'You find a way out. France, most likely — there are hundreds of thousands of Portuguese workers there already.',
        tag: null,
        outcome: 'You cross at night, or through a contact, or through a paperwork gap. The emigration to France is also a kind of desertion from a war that nobody can explain clearly, and nobody talks about it that way, and everyone knows what it is.',
        effect: (p) => { p.m -= 10; p.m += 8; p.addFlag('emigrated'); p.addFlag('colonial_war_evaded'); p.setResidency('work_visa'); p.setMem('ptWar', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'pt_carnation_revolution',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Portugal' &&
      G.currentYear === 1974 &&
      G.age >= 18 &&
      !G.mem.ptCarnation,
    text: (G) => {
      const hasLived = G.flags.includes('estado_novo_generation') || G.flags.includes('learned_silence')
      if (hasLived) {
        return 'April 25, 1974. The signal: Rádio Renascença plays *E Depois do Adeus* at 22:55 on the night of the 24th. Then at 00:20 *Grândola, Vila Morena* — a song banned since 1964, a song about brotherhood and the people, and anyone who knows what is happening knows what hearing it on the national radio means. The Armed Forces Movement has moved. By morning the Estado Novo is over. You have lived your entire life inside this regime. The soldiers have carnations in their rifle barrels. Forty-eight years of one thing, and then this: a day without violence, with flowers in the gun barrels, and the streets full of people who no longer know what to be afraid of.'
      }
      return 'April 25, 1974. The signal goes out: Rádio Renascença plays *E Depois do Adeus* at 22:55 — the first codeword. Then at 00:20 they play *Grândola, Vila Morena*, a song banned for its leftist associations, and any soldier who is part of the MFA knows what this means. By morning it is clear the Estado Novo is over. Soldiers have carnations in their rifle barrels. Forty-eight years of dictatorship end in a day, almost without violence, with flowers.'
    },
    choices: [
      {
        text: 'You go to the barracks. You put carnations in the rifle barrels. You are in the street.',
        tag: null,
        outcome: 'The soldiers let the crowd approach. You stand close enough to a man with a rifle to put a carnation in it, and he lets you, and the two of you stand there for a moment that has no equivalent in the years before or after.',
        effect: (p) => { p.m += 18; p.karma += 8; p.addFlag('political_active'); p.addFlag('carnation_generation'); p.setMem('ptCarnation', true) },
      },
      {
        text: 'You watch from a window. You hear the city change.',
        tag: null,
        outcome: 'The sounds from outside — not the sounds of violence, the sounds of people who have stopped being afraid — enter the apartment and are their own evidence. You open the window wider.',
        effect: (p) => { p.m += 12; p.r += 5; p.addFlag('carnation_generation'); p.setMem('ptCarnation', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'pt_retornados',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Portugal' &&
      G.currentYear >= 1975 && G.currentYear <= 1978 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem.ptRetornado,
    text: 'Seven hundred thousand people return from Angola and Mozambique after independence — retornados, the returned ones, though many were born in Africa and have never lived in Portugal. They arrive at the airports with what they could carry in the time available, which was rarely enough time. Lajes, Figo Maduro, the transit centres. Some are family. Some are strangers at bus stations with suitcases and the particular look of people who have recently learned what can and cannot be packed in a night.',
    choices: [
      {
        text: 'Your family is among them. Someone you know arrives with almost nothing.',
        tag: null,
        outcome: 'The logistics of absorbing another life into a small apartment, the conversations about what was left behind and what cannot be recovered, are the work of the next years.',
        effect: (p) => { p.m -= 8; p.r += 7; p.addFlag('retornado_family'); p.setMem('ptRetornado', true) },
      },
      {
        text: 'You witness it as a stranger — at the bus station, at the transit centres, in the neighbourhood.',
        tag: null,
        outcome: 'Portugal has been a country of emigrants for a century. The sight of arrivals is disorienting in its novelty. You watch people learn to be somewhere new and do not know what to offer.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('witnessed_displacement'); p.setMem('ptRetornado', true) },
      },
    ],
    effect: null,
  },

  {
    id: 'pt_eu_accession',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Portugal' &&
      G.currentYear >= 1986 && G.currentYear <= 1992 &&
      G.age >= 28 && G.age <= 60 &&
      !G.mem.ptEU,
    text: 'Portugal joins the European Community on January 1, 1986. The structural funds begin to arrive. Roads that did not exist are built. A motorway from Lisbon to Porto. A university in every district capital. A pharmacist in Beja applies for European funding for the first time and receives it. What EC membership means for the generation that remembers the Estado Novo and emigrating to France to work in factories is not something that can be measured in GDP figures. The reference point is not Luxembourg. The reference point is 1974.',
    choices: null,
    effect: (p) => { p.m += 8; p.w += 5; p.e += 4; p.addFlag('eu_accession_generation'); p.setMem('ptEU', true) },
  },

]
