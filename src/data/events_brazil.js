// Brazil arc events
//
// Brazil's story has specific textures rarely understood from outside:
//  — Favela: not just poverty but a complete urban ecosystem — community, governance,
//    culture, and danger — built on the hills overlooking the cities that refused to house people.
//    Today roughly 12 million Brazilians live in favelas.
//  — The military dictatorship 1964–85: AI-5 in December 1968 suspended habeas corpus,
//    authorized indefinite detention, closed Congress. The DOI-CODI interrogation centers ran
//    systematic torture. 434 killed or disappeared. The economy grew 10% per year.
//    These two facts occupied the same years.
//  — Abertura: the slow managed opening 1974–85. The Amnesty Law of 1979 freed political
//    prisoners and their torturers with identical paperwork. The torturers were promoted.
//  — Diretas Já 1984: 1 million in São Paulo, 1.7 million in Rio — the largest democratic
//    marches in Brazilian history. The Dante de Oliveira amendment failed by 22 votes.
//  — Racial democracy: Gilberto Freyre's 1930s thesis that mixture transcended race. The myth
//    coexisted with the highest racial wealth gap in the hemisphere. Brazil has more people of
//    African descent than any country outside Africa.
//  — The Amazon as political economy: rubber tappers, ranchers, Indigenous peoples, loggers,
//    and international pressure — the forest as a living argument about who the country is for.

const BRAZIL_EVENTS = [

  // ── FAVELA CHILDHOOD ─────────────────────────────────────────────────────────

  {
    id: 'bra_favela_childhood',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.ruralUrban === 'urban' &&
      G.stats.wealth < 45 &&
      G.age >= 6 && G.age <= 15 &&
      !G.mem?.bra_favela,
    text: (G) => {
      const yr = G.currentYear
      return yr <= 1980
        ? 'The favela goes up the hill and the city goes down. There is a line between them that is not on any map but everyone knows where it is. Your house is two rooms your parents built themselves, each room added when money arrived to add it. The water comes from a hose tapped off the main two streets over. You know every path on the hill, every shortcut, every face.'
        : yr <= 2005
        ? 'The hill has its own organization. The traficantes control the access points; the police come in force and then leave. In between these events, which happen on a schedule everyone understands, daily life is daily life: school in the morning, the alley in the afternoon, the baile funk from three streets over on Friday. The city below the hill has its rules. You know both sets.'
        : 'The UPP entered the favela two or three years ago — the Unidades de Polícia Pacificadora installed before the World Cup. The traffic moved or went underground. What replaced it is more complicated than the brochure suggested. The cable car to the hill is very photogenic. The water pressure is still intermittent.'
    },
    choices: null,
    effect: (p) => { p.e += 2; p.s += 3; p.addFlag('bra_favela_generation'); p.setMem('bra_favela', true); },
  },

  // ── AI-5 AND THE TORTURE STATE ────────────────────────────────────────────────

  {
    id: 'bra_ai5_dictatorship',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 1968 && G.currentYear <= 1979 &&
      G.age >= 18 &&
      !G.mem?.bra_ai5,
    text: 'December 13, 1968. Institutional Act Number Five closes Congress, suspends habeas corpus, authorizes indefinite detention without charge. The DOPS — political police — begins systematic arrests. The DOI-CODI interrogation centers operate without judicial oversight. Thousands are tortured; 434 are killed or disappeared. On television: "Brasil, ame-o ou deixe-o" — Brazil, love it or leave it. The economy is growing at 10% a year. These facts coexist.',
    choices: [
      {
        text: 'You keep your opinions to yourself — the price of visibility is too high',
        tag: null,
        outcome: 'The calculation is rational and almost universal. The people who did not make this calculation are the evidence.',
        effect: (p) => { p.r += 5; p.addFlag('bra_dictatorship_generation'); p.setMem('bra_ai5', true); },
      },
      {
        text: 'You are on the edges of the resistance — meetings, pamphlets, university networks',
        tag: null,
        outcome: 'The edges are more dangerous than they look from the center. Several people you know are arrested. The pamphlets continue.',
        effect: (p) => { p.m -= 5; p.addFlag('bra_dictatorship_generation'); p.addFlag('bra_resistance_generation'); p.setMem('bra_ai5', true); },
      },
    ],
    effect: null,
  },

  // ── THE AMNESTY ───────────────────────────────────────────────────────────────

  {
    id: 'bra_amnesty_1979',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 1979 && G.currentYear <= 1983 &&
      G.flags.has('bra_dictatorship_generation') &&
      G.age >= 25 &&
      !G.mem?.bra_amnesty,
    text: 'The Amnesty Law passes on August 28, 1979. Political exiles can return. Political prisoners are released. It is also an amnesty for the people who tortured them — the same law, the same signature, the same paperwork. The architects of the abertura considered this non-negotiable: no opening without impunity. The tortured and the torturers walk out into the same country. Some of the exiles come back to streets they do not recognize. Some of the torturers are promoted.',
    choices: null,
    effect: (p) => { p.m -= 4; p.r += 6; p.addFlag('bra_abertura_generation'); p.setMem('bra_amnesty', true); },
  },

  // ── DIRETAS JÁ ────────────────────────────────────────────────────────────────

  {
    id: 'bra_diretas_ja_1984',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 1983 && G.currentYear <= 1985 &&
      G.age >= 18 &&
      !G.mem?.bra_diretas,
    text: 'January 1984. The Diretas Já campaign — Direct Elections Now. The rallies grow from tens of thousands to hundreds of thousands to one million in São Paulo, 1.7 million in Rio. The largest democratic demonstrations in Brazilian history. The Dante de Oliveira amendment — which would restore direct presidential elections — comes to a vote in the Chamber of Deputies in April. It falls twenty-two votes short of the two-thirds required. The crowd that filled the Paulistão cannot reach the floor of the chamber.',
    choices: [
      {
        text: 'You are in the crowd in the rain with your sign — that many people in one place means something',
        tag: null,
        outcome: 'The amendment fails. Tancredo Neves wins the presidency through the electoral college — the military\'s own mechanism — and dies before taking office. Democracy arrives anyway, sideways.',
        effect: (p) => { p.s += 3; p.addFlag('bra_diretas_generation'); p.setPolitical('left'); p.setMem('bra_diretas', true); },
      },
      {
        text: 'You watch on television — you have work, a family, obligations that do not stop for politics',
        tag: null,
        outcome: 'The country changes on television while the rest of life continues. Both things are real.',
        effect: (p) => { p.r += 3; p.addFlag('bra_diretas_generation'); p.setMem('bra_diretas', true); },
      },
    ],
    effect: null,
  },

  // ── BALA PERDIDA ─────────────────────────────────────────────────────────────

  {
    id: 'bra_bala_perdida',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.flags.has('bra_favela_generation') &&
      G.currentYear >= 1990 &&
      G.age >= 16 && G.age <= 40 &&
      !G.mem?.bra_bala,
    text: 'Bala perdida — stray bullet. The specific term for what happens when crossfire between police and factions sends a round through an unexpected wall, or an unexpected skull. A neighbor\'s son. A woman hanging laundry on the roof. A cousin you grew up with. The community names this before the state has a database for it. The city\'s geography has sorted who absorbs this arithmetic and who lives in neighborhoods where it does not occur.',
    choices: [
      {
        text: 'You leave the hill as soon as you are able — the calculation is clear',
        tag: null,
        outcome: 'You leave and you think about the people you left and you send money back. You do not think too directly about what leaving required of you.',
        effect: (p) => { p.m -= 5; p.r += 5; p.addFlag('bra_favela_survived'); p.setMem('bra_bala', true); },
      },
      {
        text: 'You stay — the hill is where your people are and where you know how things work',
        tag: null,
        outcome: 'Staying is also a calculation. You know the routes, the times, the faces to read. The knowledge keeps you safer than ignorance would. Safer is not safe.',
        effect: (p) => { p.s += 2; p.r += 4; p.addFlag('bra_favela_survived'); p.setMem('bra_bala', true); },
      },
    ],
    effect: null,
  },

  // ── RACIAL DEMOCRACY MYTH ─────────────────────────────────────────────────────

  {
    id: 'bra_racial_democracy',
    phase: 'adolescence',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.age >= 14 && G.age <= 30 &&
      !G.mem?.bra_race,
    text: (G) => {
      const yr = G.currentYear
      return yr <= 1995
        ? 'The official position is that Brazil has no race problem. Gilberto Freyre said in the 1930s that mixture produced a Brazilian identity beyond race — the "racial democracy." You are old enough to count which people are in which rooms. The domestic workers are Black. The doormen are Black. The people in the newspaper photographs of inaugurations are white. The official position says this is about class, not race.'
        : 'Brazil has more people of African descent than any country outside Africa. The cotas — racial quotas in universities and public service — have been contested since 2001. The census asks you to identify your color: branco, pardo, preto, amarelo, indígena. The categories have a history inside them that is not in the census question. You fill in your color and notice which box feels accurate and which feels invented.'
    },
    choices: [
      {
        text: 'The myth was always a lie — the structure is visible to anyone who looks at who cleans whose house',
        tag: null,
        outcome: 'Naming the structure does not change it quickly. It is still the necessary precondition.',
        effect: (p) => { p.e += 3; p.addFlag('bra_racial_reckoning'); p.setPolitical('left'); p.setMem('bra_race', true); },
      },
      {
        text: 'Brazil is genuinely different from the United States — mixture created something real, not just a cover story',
        tag: null,
        outcome: 'The difference from the American model is real. The racial inequality visible in income, incarceration, and police shootings is also real. Both propositions coexist.',
        effect: (p) => { p.e += 2; p.setMem('bra_race', true); },
      },
    ],
    effect: null,
  },

  // ── CHICO MENDES AND THE AMAZON ───────────────────────────────────────────────

  {
    id: 'bra_chico_mendes',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 1988 && G.currentYear <= 1995 &&
      G.age >= 20 &&
      !G.mem?.bra_amazon,
    text: 'December 22, 1988. Chico Mendes — rubber tapper, union organizer, founder of the Xapuri Rural Workers\' Union — is shot dead on the back porch of his house in Acre. He had received twenty-two death threats. He had asked for and been denied police protection. The ranchers who ordered his killing are convicted nine years later. The deforestation he was fighting continues. What he named — that the forest is an economy for the people who live in it, not merely a resource for extraction — remains the correct description.',
    choices: null,
    effect: (p) => { p.m -= 5; p.karma += 3; p.addFlag('bra_amazon_generation'); p.setMem('bra_amazon', true); },
  },

  // ── COPA PROTESTS 2013–2014 ───────────────────────────────────────────────────

  {
    id: 'bra_copa_protests',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 2013 && G.currentYear <= 2015 &&
      G.age >= 18 &&
      !G.mem?.bra_copa,
    text: 'June 2013. The bus fare in São Paulo goes up twenty centavos — from R$3.00 to R$3.20. Fifty thousand people in the streets. "Copa para quem?" — the World Cup is for whom? The Maracanã renovation costs R$900 million. The hospitals are understaffed and the schools lack textbooks. The World Cup arrives in 2014 anyway, in stadiums built on demolished neighborhoods, guarded by drones. Brazil loses 7–1 to Germany in the semi-final in its own country. The stadium in Brasília is repurposed for cricket. The country does not fully agree on what any of this meant.',
    choices: [
      {
        text: 'You are in the street — the bus fare is the entry point to everything else',
        tag: null,
        outcome: 'The movement is too large to have a single agenda and too genuine to be dismissed. The bus fare is restored. The structural question it was asking is not.',
        effect: (p) => { p.s += 3; p.addFlag('bra_copa_generation'); p.setPolitical('left'); p.setMem('bra_copa', true); },
      },
      {
        text: 'The protest seems to be against everything at once and therefore nothing — the Copa will come regardless',
        tag: null,
        outcome: 'The Copa does come. The movement returns differently shaped in 2015–16. The bus fare is restored. The structural question remains.',
        effect: (p) => { p.r += 3; p.addFlag('bra_copa_generation'); p.setMem('bra_copa', true); },
      },
    ],
    effect: null,
  },

  // ── BOLSONARO AND THE 700,000 ─────────────────────────────────────────────────

  // ── CARANDIRU: PERSONAL PROXIMITY ────────────────────────────────────────────

  {
    id: 'bra_carandiru_proximity',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear === 1992 &&
      G.criminalRecord?.length > 0 &&
      G.age >= 18 && G.age <= 45 &&
      !G.mem?.bra_caranPrx,
    text: 'The São Paulo papers name 111 dead. The news says riot; the survivors say execution. You know people who were in Carandiru, or people who might have been. The number 7,000 people in a facility built for 3,500 — you can do the arithmetic on what happens when the military police enter with that ratio. Colonel Guimarães will face trial. He will be convicted. The conviction will be overturned. The arithmetic is the country you live in.',
    choices: null,
    effect: (p) => { p.m -= 12; p.r += 6; p.addFlag('carandiru_personal_proximity'); p.setMem('bra_caranPrx', true); },
  },

  // ── CARANDIRU: LATE RECKONING ─────────────────────────────────────────────────

  {
    id: 'bra_carandiru_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.has('carandiru_witness_generation') &&
      G.currentYear >= 2015 &&
      G.age >= 55 &&
      !G.mem?.bra_caranLate,
    text: 'The demolition happened in 2002 — they tore down Carandiru on live television. The colonel who commanded the operation was convicted in 2001 and had his conviction overturned. He ran for state office. The documentary, the books, the film, the tribunal — twenty-five years of investigation produced, ultimately, no one in prison for killing 111 people in a prison. You were watching in 1992. You are watching now.',
    choices: null,
    effect: (p) => { p.r += 5; p.setMem('bra_caranLate', true); },
  },

  {
    id: 'bra_bolsonaro_covid',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 2020 && G.currentYear <= 2022 &&
      G.age >= 25 &&
      !G.mem?.bra_covid,
    text: 'Brazil registers 700,000 COVID deaths — the second-highest total in the world. The president calls it a "little flu" in March 2020, promotes hydroxychloroquine throughout the pandemic without evidence, fires two health ministers who recommend masks, and leads maskless rallies while hospitals in Manaus run out of oxygen. A senate investigation concludes he committed crimes against humanity. He is not prosecuted. He loses the 2022 election by less than two percentage points.',
    choices: [
      {
        text: 'The dead are in the mathematics and the mathematics is not politically contested',
        tag: null,
        outcome: '700,000. The number is in the international record independent of domestic politics. The political will to act on it is a separate question.',
        effect: (p) => { p.m -= 8; p.karma += 4; p.addFlag('bra_pandemic_witness'); p.setMem('bra_covid', true); },
      },
      {
        text: 'The opposition used COVID to delegitimize a government it couldn\'t defeat democratically',
        tag: null,
        outcome: 'This position has adherents. The 700,000 are also in the global dataset, for anyone who wants to look, independent of what the opposition said about them.',
        effect: (p) => { p.r += 4; p.addFlag('bra_pandemic_witness'); p.setMem('bra_covid', true); },
      },
    ],
    effect: null,
  },

]

export default BRAZIL_EVENTS
