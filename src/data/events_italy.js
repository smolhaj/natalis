// Italy character events
// Economic miracle, Hot Autumn 1969, Years of Lead, Mani Pulite 1992,
// Berlusconi era, southern emigration, precariato generation

export const ITALY_EVENTS = [

  {
    id: 'it_miracolo_economico',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      G.currentYear >= 1955 && G.currentYear <= 1968 &&
      G.age >= 16 && G.age <= 35 &&
      !G.mem?.itMiracolo,
    text: 'The years of the miracolo economico. Italy goes from the rubble of the war to the fifth largest economy in the world in fifteen years. The Fiat 500 comes out in 1957 — the car of the economic miracle, small enough for the narrow streets, cheap enough for a factory worker. The television arrives in the house. The refrigerator arrives. The washing machine. Carosello on television after the news: the advertisements before bed. The country is building itself out of the prewar poverty and building too fast and too unevenly to notice where the cracks are going.',
    choices: [
      {
        text: 'The prosperity is real and you feel it. Something extraordinary is happening.',
        tag: null,
        outcome: 'The feeling is correct. Italy\'s GDP grows at over five percent annually for a decade. Something extraordinary happens in the north. The south participates differently. The something extraordinary has a geography.',
        effect: (p) => { p.m += 6; p.w += 5; p.addFlag('miracolo_generation'); p.setMem('itMiracolo', true); },
      },
      {
        text: 'The prosperity is happening somewhere. Here, the poverty is not done.',
        tag: null,
        outcome: 'The north-south divide: the Lira goes north with the cars; the south contributes labor and receives less. The miracle has a border and you are south of it.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('miracolo_generation'); p.addFlag('mezzogiorno_born'); p.setMem('itMiracolo', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'it_southern_emigration',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      G.currentYear >= 1950 && G.currentYear <= 1975 &&
      G.age >= 18 && G.age <= 35 &&
      !G.mem?.itSouthernMigration,
    text: 'The train goes north. Turin, Milan, the factories. Or Zurich, Stuttgart, Brussels — the external emigration for the ones who go further. The south empties. Campobasso, Matera, Reggio Calabria — the towns that see a third of their population board trains over a decade. The northern cities receive these people and call them terroni — southerners, literally earth-people — and the word is not kind. You take the train because there is nothing to stay for or because what there is to stay for is not enough.',
    choices: [
      {
        text: 'You go north — to Turin or Milan. The factories are hiring.',
        tag: null,
        outcome: 'You are at Fiat or Pirelli or Olivetti and you live in a corte in Barriera di Milano. The neighborhood is all Calabrians and Sicilians. The north has a word for you. You use it back with a different intonation.',
        effect: (p) => { p.m -= 5; p.w += 6; p.r += 5; p.addFlag('southern_migrant_italy'); p.addFlag('mezzogiorno_born'); p.setMem('itSouthernMigration', true); },
      },
      {
        text: 'You go to Switzerland or Germany. Farther but often better paid.',
        tag: null,
        outcome: 'Gastarbeiter. Guest worker. The same contract structure as the Turks who will come later. Two years, and then home. The two years extend. The home becomes partial.',
        effect: (p) => { p.m -= 6; p.w += 8; p.r += 6; p.addFlag('italian_emigrant'); p.addFlag('mezzogiorno_born'); p.setMem('itSouthernMigration', true); },
      },
      {
        text: 'You stay. Something keeps you — the land, the family, the refusal.',
        tag: null,
        outcome: 'You stay in a town that is getting quieter. The young men leave every year. The church and the bar are the remaining institutions. What you build here is built in a diminishing place.',
        effect: (p) => { p.m -= 4; p.r += 5; p.addFlag('mezzogiorno_born'); p.addFlag('stayed_in_the_south_italy'); p.setMem('itSouthernMigration', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'it_sessantotto_hot_autumn',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      G.currentYear >= 1968 && G.currentYear <= 1970 &&
      G.age >= 16 && G.age <= 30 &&
      !G.mem?.it68,
    text: (G) => {
      const isWorking = G.stats?.wealth < 45 || G.career?.field === 'manufacturing'
      if (isWorking) {
        return 'The Hot Autumn of 1969. Not just the students — the factories. Fiat, Pirelli, Falck steel. The workers occupy the floor and the demands are about time: hours, shifts, the pace of the line. The unions are not fast enough and the workers go around them. 150 million hours of strikes. The Statuto dei lavoratori — the workers\' statute — passes in 1970. You have a contract now. The contract was won on the floor.'
      }
      return '1968. The facoltà occupied. The lezioni dialogate. Trento, Torino, Pisa — the students who read Marcuse and Mao and occupied the lecture halls and wrote manifestos on the walls. Then the Hot Autumn of 1969: the workers at Fiat and Pirelli take up what the students started and make it material. 150 million hours of strikes. The movement becomes two overlapping movements and the overlap is the thing that frightens the establishment.'
    },
    choices: [
      {
        text: 'You are in it — the occupations, the assemblies, the strikes.',
        tag: null,
        outcome: 'You are in it for the years it takes to burn through. The Statuto dei lavoratori passes. The movimento operaio achieves real things. What it does not achieve becomes the argument about what came next.',
        effect: (p) => { p.m += 5; p.karma += 8; p.r += 3; p.addFlag('sessantotto_generation'); p.addFlag('political_active'); p.setMem('it68', true); },
      },
      {
        text: 'You watch it from the side — sympathetic or uncertain or concerned where it is going.',
        tag: null,
        outcome: 'The concern about where it is going turns out to be justified, not in the way you expected. The "where it is going" goes to the Years of Lead. The movement and the violence come from the same historical moment and are not the same thing.',
        effect: (p) => { p.m -= 2; p.r += 4; p.addFlag('sessantotto_generation'); p.setMem('it68', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'it_anni_di_piombo',
    phase: 'midlife',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      G.currentYear >= 1970 && G.currentYear <= 1984 &&
      G.age >= 18 &&
      !G.mem?.itAnniDiPiombo,
    text: (G) => {
      const year = G.currentYear
      if (year <= 1973) {
        return 'The strategy of tension. The Piazza Fontana bombing in Milan, December 12, 1969: sixteen dead, eighty-eight wounded at the Banca dell\'Agricoltura. The bomb is placed by fascists, the state blames anarchists, the anarchist Pietro Valpreda is arrested, the journalist Pinelli dies falling from a police building. The state and the far right and the secret services are connected in ways that become clear over decades of trials that reach no convictions. The years of lead begin before anyone names them.'
      }
      if (year <= 1979) {
        return 'The Brigate Rosse. The Red Brigades take Aldo Moro — former Prime Minister, likely next President — on March 16, 1978. He is held for fifty-five days. The state refuses to negotiate. On May 9, Moro\'s body is found in a car on Via Caetani, equidistant between the DC and PCI headquarters. He had written letters from captivity. The letters say things the state found inconvenient. The state eventually decides the letters were written under duress. The decision takes twenty years.'
      }
      return 'The bombing at Bologna Centrale, August 2, 1980. Eighty-five dead in the second-class waiting room. The attack is later attributed to the fascist Nuclei Armati Rivoluzionari with possible state involvement. The trials run for years. Italy has been living with political violence for a decade. The violence is from the right and from the left and from the state and the distinctions are sometimes clear and sometimes not clear at all. You have learned to live in a country where the news contains these events.'
    },
    choices: [
      {
        text: 'You know someone who was there, or near somewhere it happened.',
        tag: null,
        outcome: 'The proximity changes how you carry the decade. The abstract political violence becomes the specific face of a specific person who happened to be on a specific piazza.',
        effect: (p) => { p.m -= 12; p.h -= 3; p.r += 7; p.addFlag('anni_di_piombo_generation'); p.addFlag('political_violence_witnessed'); p.setMem('itAnniDiPiombo', true); },
      },
      {
        text: 'You follow it from a distance that does not feel distant. Italy is not large enough.',
        tag: null,
        outcome: 'Italy is not large enough for the violence to feel like someone else\'s problem. The newspapers, the television, the radio. You knew the name Moro before you knew what had happened to him.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('anni_di_piombo_generation'); p.setMem('itAnniDiPiombo', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'it_mani_pulite',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      G.currentYear >= 1992 && G.currentYear <= 1996 &&
      G.age >= 18 &&
      !G.mem?.itManiPulite,
    text: 'February 17, 1992. Mario Chiesa, president of a Milan nursing home, is arrested trying to flush cash down a toilet. This is the beginning of Mani Pulite — Clean Hands. The bribe was routine: contracts were won through tangenti, percentages, a systematic corruption that financed all the major political parties. Within two years, the magistrates in Milan have investigated four thousand people, the entire Italian political class. Andreotti is tried for Mafia association. Craxi flees to Tunisia. The Christian Democrats disband in 1994, having governed Italy for almost fifty years. The First Republic ends in a toilet in Milan.',
    choices: [
      {
        text: 'The system that ran the country since the war is exposed and it deserved to be.',
        tag: null,
        outcome: 'The exposure is real and correct. What replaces the system — what Berlusconi builds in the space the investigations clear — is also information.',
        effect: (p) => { p.m += 4; p.karma += 5; p.addFlag('mani_pulite_generation'); p.setMem('itManiPulite', true); },
      },
      {
        text: 'Something is being destroyed that held things together, however badly.',
        tag: null,
        outcome: 'The holding-together was imperfect and the holding-together was real. What the DC and PSI did with the tangenti also paid for things. The things are not defended by pointing this out. But Berlusconi is the alternative, and the alternative is information.',
        effect: (p) => { p.m -= 4; p.r += 6; p.addFlag('mani_pulite_generation'); p.setMem('itManiPulite', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'it_berlusconi_era',
    phase: 'midlife',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      G.currentYear >= 1994 && G.currentYear <= 2012 &&
      G.age >= 18 &&
      !G.mem?.itBerlusconi,
    text: 'Silvio Berlusconi enters politics in 1994, ninety days after founding Forza Italia. He owns the three largest private television channels in Italy. He is tried seventeen times and acquitted or amnestied or has the statute of limitations run out each time. He is Prime Minister three times. He changes the laws that apply to him while he governs. He survives the bunga bunga scandals of 2010 and 2011 and continues governing. He is still in the Senate in 2023. The Berlusconi phenomenon is the proof that something in Italian political culture was exactly the right shape to receive him.',
    choices: [
      {
        text: 'You vote for him — he is a businessman who speaks plainly.',
        tag: null,
        outcome: 'You vote for him and you are in the majority that puts him in government. Three governments. The alignment between what he promised and what he delivered is the argument you are still having.',
        effect: (p) => { p.m += 2; p.r += 5; p.addFlag('berlusconi_generation'); p.setMem('itBerlusconi', true); },
      },
      {
        text: 'The concentration of media power in the hands of a politician is the problem. Full stop.',
        tag: null,
        outcome: 'The European Parliament passed resolutions about the conflict of interest. Italy\'s Constitutional Court found it acceptable. The media power and the political power overlapped for twenty years. The overlap is the documented thing.',
        effect: (p) => { p.m -= 5; p.r += 5; p.karma += 3; p.addFlag('berlusconi_generation'); p.addFlag('media_democracy_concern'); p.setMem('itBerlusconi', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'it_precariato',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      G.currentYear >= 2000 && G.currentYear <= 2020 &&
      G.age >= 22 && G.age <= 35 &&
      !G.mem?.itPrecariato,
    text: 'Precariato — precariat — is the Italian word for the generation of workers on short-term contracts, project contracts, Partite IVA invoicing arrangements that have the form of self-employment without any of its freedom. The post-Biagi reform labour market: flexible, they said, meaning the flexibility was all on the employer\'s side. Your degree does not convert to a permanent contract. The permanent contract is for the generation before you. You invoice, you hustle, you contribute to a pension system that will not exist when you reach it. The country where your parents bought a house at thirty on a factory worker\'s income is the country you also live in, but that country is gone.',
    choices: [
      {
        text: 'You leave. Italy is exporting its educated generation.',
        tag: null,
        outcome: 'London, Berlin, Brussels, New York. The fuga dei cervelli — brain drain — produces specific spaces in Italian cities: the flats of the people who left, the positions that went unfilled, the parents who call on Sunday.',
        effect: (p) => { p.m -= 4; p.w += 4; p.r += 5; p.addFlag('precariato_generation'); p.addFlag('italian_emigrant'); p.setMem('itPrecariato', true); },
      },
      {
        text: 'You stay and navigate the precariato. This is still Italy.',
        tag: null,
        outcome: 'You stay. The navigation is real and unglamorous. The permanence you seek arrives, if it arrives, later than you planned. The country is still Italy, which means it is still possible and still maddening.',
        effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('precariato_generation'); p.setMem('itPrecariato', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'it_mediterranean_crossing',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Italy' &&
      ['moroccan_italian', 'other_italian', 'romanian_italian'].includes(G.ethnicity) &&
      G.currentYear >= 1990 && G.currentYear <= 2015 &&
      G.age >= 18 && G.age <= 35 &&
      G.flags.includes('emigrant') &&
      !G.mem?.itMediterranean,
    text: (G) => {
      const isNorthAfrican = G.ethnicity === 'moroccan_italian'
      if (isNorthAfrican) {
        return 'The crossing: rubber boat or wooden boat, forty people or two hundred. Lampedusa is the island closest to Tunisia and to Libya. The Italian coast guard or the NGO ships or nothing. You paid for this passage. The price is in the range of what would take months to save. You are in the water in the dark. The water is the Mediterranean, which is also the sea the travel posters use. This is the other version of the same sea.'
      }
      return 'You arrived in Italy not through the airport but by other means. The caporale at the farm in Puglia or Calabria pays in cash. The cash disappears into the debt for the crossing. The crossing is paid before you earn anything. You are legal or not legal depending on a piece of paper that changes the meaning of everything else. You are in Italy. Italy is the country you aimed for. Italy is not what you aimed for.'
    },
    choices: [
      {
        text: 'You made it. The calculation of what it cost begins now.',
        tag: null,
        outcome: 'The calculation continues for years. The papers, the permit, the renewal, the precariousness of status that means every interaction with authority contains a question about whether you are still here legally.',
        effect: (p) => { p.m -= 8; p.r += 6; p.addFlag('mediterranean_crossing_survived'); p.setMem('itMediterranean', true); },
      },
    ],
    effect: null,
  },

]
