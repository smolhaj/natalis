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

  // ── HYPERINFLATION AND PLANO REAL ─────────────────────────────────────────────

  {
    id: 'bra_hyperinflation',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 1986 && G.currentYear <= 1994 &&
      G.age >= 18 &&
      !G.mem?.bra_inflation,
    text: (G) => {
      const yr = G.currentYear
      if (yr <= 1989) {
        return 'The price of a coffee changes between when you sit down and when you pay. The Cruzado, the Cruzado Novo, the Cruzeiro — the currency is renamed while the inflation continues. The Plano Cruzado freezes prices in 1986 and Brazilians mob the supermarkets to enforce it, photographing price labels, reporting stores to television cameras. The freeze lasts eight months. Inflation returns at 2,000% per year. Salaries are indexed by formula; the formula is adjusted; the formula adjusts again. You have developed the specific skill of knowing that a price is wrong before the cashier notices.'
      }
      return 'July 1, 1994. Fernando Henrique Cardoso, Finance Minister, introduces the Plano Real. The old cruzeiro real is exchanged for the new real at a fixed rate. The mechanism is complex — a virtual currency called the URV mediating the transition. What happens next is simple: the inflation stops. Overnight. You go to the supermarket and the price on the shelf is the price at the register. You do not know what to do with this. The generation that grew up with instability has to learn, slowly, that the price of something is a fixed fact.'
    },
    choices: [
      {
        text: 'The instability shaped how you think about money — you still distrust savings',
        tag: null,
        outcome: 'The distrust is rational: you watched savings become worthless three times. The Plano Real works but the memory of when it did not is structural. You do not fully believe the price will be the same tomorrow.',
        effect: (p) => { p.w -= 3; p.r += 4; p.addFlag('bra_hyperinflation_generation'); p.setMem('bra_inflation', true); },
      },
      {
        text: 'The Plano Real is the moment Brazil becomes modern — stable prices, real planning possible',
        tag: null,
        outcome: 'You are correct and also lucky: the Real holds. For the generation after you, a price on a shelf is a fact. For your generation, it is still a mild surprise.',
        effect: (p) => { p.w += 4; p.addFlag('bra_hyperinflation_generation'); p.addFlag('bra_plano_real_optimist'); p.setMem('bra_inflation', true); },
      },
    ],
    effect: null,
  },

  // ── CARANDIRU 1992 ────────────────────────────────────────────────────────────

  {
    id: 'bra_carandiru_1992',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 1992 && G.currentYear <= 1996 &&
      G.age >= 18 &&
      !G.mem?.bra_carandiru,
    text: 'October 2, 1992. The Casa de Detenção de Carandiru in São Paulo — the largest prison in Latin America. A riot begins in one pavilion. Military police enter. When they leave, 111 inmates are dead. None of the prisoners had firearms. The commander, Colonel Ubiratan Guimarães, is acquitted in 2001 by a São Paulo jury and later elected to the state assembly. The Carandiru Massacre enters the language of Brazilian politics as the specific proof of how the state treats its poor and incarcerated. Carandiru is demolished in 2002. A park is built on the site.',
    choices: [
      {
        text: 'One hundred eleven people. The number is not in dispute.',
        tag: null,
        outcome: 'The number is in the record. What is done with the number in the courts and in the ballot box is the political question. The number does not move.',
        effect: (p) => { p.m -= 6; p.karma += 4; p.addFlag('bra_carandiru_generation'); p.setMem('bra_carandiru', true); },
      },
      {
        text: 'A prison riot suppressed — the police did what prisons require',
        tag: null,
        outcome: 'This position has a constituency. The 111 dead had records, families, histories the courts did not consider. The constituency and the families inhabit the same São Paulo.',
        effect: (p) => { p.r += 5; p.addFlag('bra_carandiru_generation'); p.setMem('bra_carandiru', true); },
      },
    ],
    effect: null,
  },

  // ── NORDESTINO MIGRATION ──────────────────────────────────────────────────────

  {
    id: 'bra_nordestino_migration',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 1950 && G.currentYear <= 1995 &&
      G.ruralUrban === 'rural' &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.bra_nordestino,
    text: (G) => {
      const yr = G.currentYear
      if (yr <= 1970) {
        return 'The pau-de-arara: the wooden truck bed with the pole across the top for people to grip on the road south. Weeks from Ceará or Piauí or Bahia to São Paulo. The sertão is dry again this year — the drought polygon, the caatinga, the reservoir that is a mudflat by August. São Paulo needs workers. The construction sites need workers. The domestic employers need workers. You leave with an address written on a piece of paper and the name of someone from your town who made it.'
      }
      return 'The sertão is dry and São Paulo has work. Millions before you have taken this road — by truck in earlier decades, by bus now. In São Paulo they will call you nordestino and the word is not always neutral. You will live in a room with four other people from your state. You will send money home. The forró is still playing, in the bar in Brás where everyone from your city goes on Saturdays. You are in São Paulo. The sertão is in São Paulo with you.'
    },
    choices: [
      {
        text: 'You go. The sertão has nothing left to give this year.',
        tag: null,
        outcome: 'São Paulo receives you and processes you into its economy. The city needs your labor more than it admits to needing it. The distance between the city you arrived in and the city you built is a political fact no one officially records.',
        effect: (p) => { p.w += 5; p.m -= 5; p.r += 4; p.addFlag('bra_nordestino_migrant'); p.setMem('bra_nordestino', true); },
      },
      {
        text: 'You stay. The sertão is yours and the stories of São Paulo are not all good.',
        tag: null,
        outcome: 'You stay in the drought and the shortage and the community that has always been here. What you stay for is real. What the sertão costs is also real. The two things coexist in the same parched landscape.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('bra_nordestino_stayed'); p.setMem('bra_nordestino', true); },
      },
    ],
    effect: null,
  },

  // ── LULA AND THE WORKERS' PARTY ───────────────────────────────────────────────

  {
    id: 'bra_lula_election',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 2002 && G.currentYear <= 2007 &&
      G.age >= 18 &&
      !G.mem?.bra_lula,
    text: 'October 27, 2002. Luiz Inácio Lula da Silva wins the presidency on his fourth attempt with 61% of the vote. A metalworker who lost a finger in a factory accident in the ABC industrial region of São Paulo. A union organizer. A man who did not finish primary school. The markets feared him; he wrote the Carta ao Povo Brasileiro — the letter to the Brazilian people — pledging to honor international creditors. He honored them. He also introduced Bolsa Família: cash transfers that reached 14 million families by 2006. For the first time many poor Brazilians had a government that knew they existed.',
    choices: [
      {
        text: 'Lula is the proof that the country you were promised is possible — you vote for him, you believe',
        tag: null,
        outcome: 'Bolsa Família. The economy grows. Lula\'s approval reaches 87% by the end of his second term. The metalworker governed and the country got better. The proof is in the numbers that the poor got and spent.',
        effect: (p) => { p.m += 6; p.karma += 3; p.addFlag('bra_lula_generation'); p.setPolitical('left'); p.setMem('bra_lula', true); },
      },
      {
        text: 'The PT has been in São Paulo politics for twenty years — you know what the party does with power',
        tag: null,
        outcome: 'What the PT does with power includes Mensalão, the monthly payments to allied politicians that surfaces in 2005. It also includes Bolsa Família. Both are true simultaneously, which is the difficulty.',
        effect: (p) => { p.r += 4; p.addFlag('bra_lula_generation'); p.setMem('bra_lula', true); },
      },
    ],
    effect: null,
  },

  // ── THE EVANGELICAL SHIFT ─────────────────────────────────────────────────────

  {
    id: 'bra_evangelical_shift',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 1990 && G.currentYear <= 2020 &&
      G.age >= 16 && G.age <= 40 &&
      !G.mem?.bra_evangelical,
    text: (G) => {
      const yr = G.currentYear
      if (yr <= 2005) {
        return 'Brazil was 90% Catholic in 1970. The census in 2000 shows 74% — still a majority but the Universal Church of the Kingdom of God has 12,000 congregations, a television network, and a presence in every favela. The service is Tuesday and Thursday and Sunday. The bishop says tithe and God will bless you. In the neighborhood the Catholic priest has one mass on Sunday; the evangelical pastor has services three times a week, a youth group, and a cell phone. The pastoral structure is the comparison.'
      }
      return 'The 2010 census: 64% Catholic, 22% evangelical Protestant. The 2023 projections suggest they have crossed: more evangelicals than Catholics by mid-decade. The change happened in one generation and it happened fastest in the favelas and the interior. The evangelical vote — the bancada evangélica in Congress — is the largest bloc in the legislature. The church that grew on the margins is now writing legislation.'
    },
    choices: [
      {
        text: 'You have found your faith here — the evangelical church gave you community when the city had not',
        tag: null,
        outcome: 'Community, structure, a weekly place to be known by name in a city that did not otherwise know you. The theology and the belonging are not always separable. You chose the belonging and the theology came with it.',
        effect: (p) => { p.m += 5; p.s += 3; p.addFlag('bra_evangelical_convert'); p.setMem('bra_evangelical', true); },
      },
      {
        text: 'The Catholicism of your parents is yours — or you have no religion — the Universal Church is a business in a temple',
        tag: null,
        outcome: 'The observation about the business model is documented. The people who found community in it found community. Both are true. The church is growing regardless of your assessment.',
        effect: (p) => { p.r += 3; p.setMem('bra_evangelical', true); },
      },
    ],
    effect: null,
  },

  // ── LAVA JATO ─────────────────────────────────────────────────────────────────

  {
    id: 'bra_lava_jato',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 2016 && G.currentYear <= 2020 &&
      G.age >= 25 &&
      !G.mem?.bra_lavajato,
    text: 'Operação Lava Jato — Car Wash — begins in 2014 with a currency exchange shop in a gas station in Curitiba. By 2016 it has reached the highest levels of Brazilian politics: Petrobras, the construction giants, the PT, the PSDB, every major party. Judge Sérgio Moro sentences Lula to nine years in prison in July 2017. Lula enters prison in April 2018, unable to run in the October election. Jair Bolsonaro wins. Moro becomes Bolsonaro\'s Justice Minister. In 2021 the Supreme Court rules that Moro was biased — the judge who convicted Lula had been secretly coordinating with the prosecution. The conviction is annulled.',
    choices: [
      {
        text: 'Lava Jato started as genuine anti-corruption and became a political weapon — both things are true',
        tag: null,
        outcome: 'The corruption it exposed was real and the political use of the investigation to prevent an election was also real. You hold both. The country is still sorting which story dominates.',
        effect: (p) => { p.r += 5; p.addFlag('bra_lava_jato_generation'); p.setMem('bra_lavajato', true); },
      },
      {
        text: 'The PT was corrupt and Lula\'s conviction was just — the Supreme Court annulment was political',
        tag: null,
        outcome: 'This position has adherents. The message leaks — Moro coordinating with prosecutors — are in the record. You have decided what to do with them.',
        effect: (p) => { p.r += 4; p.addFlag('bra_lava_jato_generation'); p.setMem('bra_lavajato', true); },
      },
    ],
    effect: null,
  },

  // ── JANUARY 8, 2023 ───────────────────────────────────────────────────────────

  {
    id: 'bra_january_8_2023',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Brazil' &&
      G.currentYear >= 2023 && G.currentYear <= 2025 &&
      G.age >= 25 &&
      !G.mem?.bra_jan8,
    text: 'January 8, 2023. Nine days after Lula is inaugurated for his third term, thousands of Bolsonaro supporters enter the Planalto Palace, the National Congress, and the Supreme Court. They break furniture, smash art, defecate on tables, destroy Cândido Portinari\'s paintings. Bolsonaro is in Florida. The military stands aside for forty minutes before federal police intervene. More than a thousand people are arrested. The images — a man urinating in Lula\'s desk chair, the broken stained glass — go around the world. Brazil has watched what happened in Washington in January 2021. It has now had its own version.',
    choices: [
      {
        text: 'The democracy held — the institutions responded and the coup failed',
        tag: null,
        outcome: 'Lula governs. The trials for January 8 proceed. The democracy held in the sense that it did not fall. What it cost to hold is a question the country is still counting.',
        effect: (p) => { p.m += 3; p.karma += 4; p.addFlag('bra_january_8_witness'); p.setMem('bra_jan8', true); },
      },
      {
        text: 'The rage that produced January 8 is real and the democracy that ignores it will face it again',
        tag: null,
        outcome: 'The polarisation that filled the Congress on January 8 did not empty from the country when the police arrived. The underlying conditions are not resolved by the arrests, however many there are.',
        effect: (p) => { p.r += 5; p.addFlag('bra_january_8_witness'); p.setMem('bra_jan8', true); },
      },
    ],
    effect: null,
  },

]

export default BRAZIL_EVENTS
