// Baltic states arc events: Estonia, Latvia, Lithuania
// Soviet occupation and deportations, Russification, song festival resistance,
// January 1991 events, independence, Russian minority exclusion, EU emigration wave.

const BALTIC_COUNTRIES = ['Estonia', 'Latvia', 'Lithuania']

const isRussianMinority = (G) => {
  const id = G.character?.ethnicity?.id || ''
  return id.startsWith('russian_') && BALTIC_COUNTRIES.includes(G.character.country.name)
}

export const BALTIC_EVENTS = [

  {
    id: 'balt_deportation_family',
    phase: 'childhood',
    weight: 4,
    when: (G) =>
      BALTIC_COUNTRIES.includes(G.character.country.name) &&
      !isRussianMinority(G) &&
      G.currentYear >= 1955 && G.currentYear <= 1975 &&
      G.age >= 7 && G.age <= 16 &&
      !G.mem?.baltDeportation,
    text: (G) => {
      const country = G.character.country.name
      if (country === 'Estonia') {
        return 'You learn, in pieces, what happened to the family members who are not here. June 1941: Soviet security forces loaded Estonian families onto cattle cars in the night. Then again in March 1949: the deportation of the kulaks, as they were called. Twenty thousand people in Estonia alone, in those two operations. Siberia. The ones who came back — some of them — came back different. The ones who did not come back are in the family in a different way.'
      }
      if (country === 'Latvia') {
        return 'The family members who are not present: you learn about them in pieces, over years. June 14, 1941 is the date in Latvia. Soviet security forces came in the night and took families — women, children, the elderly — to cattle cars going east. The Siberian deportations. Roughly thirty-five thousand Latvians in that first wave; another forty-three thousand in March 1949. Some came back. Many did not. The ones who did not are in the family in a different way than the ones who are here.'
      }
      return 'June 14, 1941 is the date in Lithuania. Soviet security forces coming in the night, cattle cars east. Then March 1949. Almost ninety thousand Lithuanian deportees across both waves. The family members who are not present — you learn about them in pieces, over years, from adults who lower their voices without being aware of lowering their voices. What happened is both the history of your country and a specific hole in your specific family.'
    },
    choices: [
      {
        text: 'You ask questions. The answers come in fragments, across years.',
        tag: null,
        outcome: 'The fragments accumulate into something that is not quite a story but is more than silence. You carry it as both fact and feeling.',
        effect: (p) => { p.m -= 6; p.r += 5; p.e += 3; p.addFlag('deportation_family_memory'); p.setMem('baltDeportation', true); },
      },
      {
        text: 'You understand from the adults that this is not something you ask about.',
        tag: null,
        outcome: 'The understanding is itself a form of knowledge. What cannot be spoken is still present. You learn to read the silences.',
        effect: (p) => { p.m -= 4; p.r += 4; p.addFlag('deportation_family_memory'); p.addFlag('learned_silence'); p.setMem('baltDeportation', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'balt_soviet_school',
    phase: 'childhood',
    weight: 3,
    when: (G) =>
      BALTIC_COUNTRIES.includes(G.character.country.name) &&
      !isRussianMinority(G) &&
      G.currentYear >= 1955 && G.currentYear <= 1985 &&
      G.age >= 7 && G.age <= 16 &&
      !G.mem?.baltSchool,
    text: (G) => {
      const country = G.character.country.name
      const lang = country === 'Estonia' ? 'Estonian' : country === 'Latvia' ? 'Latvian' : 'Lithuanian'
      return `At school, Russian is the language of advancement. The science textbook is in Russian. The teacher's praise is in Russian. The political terminology — the only correct political terminology — is in Russian. ${lang} is what you speak at home, in the yard, with the grandmother. The two registers feel different in your mouth. At school you are learning that ${lang} belongs to the kitchen and the yard, and that the world is organized in a different language. You are seven years old and you already know this without having the words for it.`
    },
    choices: [
      {
        text: 'You learn Russian well. The advantage is real and you take it.',
        tag: null,
        outcome: 'You acquire the language of advancement without surrendering the language of home. This is a skill that has a cost you are not yet able to calculate.',
        effect: (p) => { p.e += 5; p.m -= 3; p.addFlag('baltic_russification_generation'); p.setMem('baltSchool', true); },
      },
      {
        text: 'You resist, quietly. You do the minimum in Russian. The native language is the one you think in.',
        tag: null,
        outcome: 'The resistance is not visible from outside. The native language is the one that remains intact. The cost of the resistance comes in the form of reduced access.',
        effect: (p) => { p.m -= 3; p.r += 4; p.karma += 3; p.addFlag('baltic_russification_generation'); p.setMem('baltSchool', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'balt_song_festival',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      BALTIC_COUNTRIES.includes(G.character.country.name) &&
      !isRussianMinority(G) &&
      G.currentYear >= 1965 && G.currentYear <= 1987 &&
      G.age >= 16 &&
      !G.mem?.baltSong,
    text: (G) => {
      const country = G.character.country.name
      const festival = country === 'Estonia' ? 'Laulupidu' : country === 'Latvia' ? 'Dziesmu svētki' : 'Dainų šventė'
      return `The ${festival} — the national song festival. It has been happening since the nineteenth century and the Soviets permit it because it is folk culture, officially harmless. What happens in the field when ten thousand voices sing in the national language is something the permission does not fully account for. You have been coming to this since childhood. This year something is different — not in what is sung but in what the singing means to the people singing it. The bodies of a hundred thousand people, standing together, knowing what they know.`
    },
    choices: [
      {
        text: 'You sing. The singing is where the nation actually lives right now.',
        tag: null,
        outcome: 'The nation is where the people are when they sing. You know this and you know it will have been worth knowing when what comes next arrives.',
        effect: (p) => { p.m += 10; p.karma += 4; p.addFlag('baltic_song_resistance'); p.setMem('baltSong', true); },
      },
      {
        text: 'You watch. You are not sure what the singing means but you understand it matters.',
        tag: null,
        outcome: 'What it means is what you are watching. The watching is also a form of being there.',
        effect: (p) => { p.m += 7; p.addFlag('baltic_song_resistance'); p.setMem('baltSong', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'balt_january_1991',
    phase: 'young_adult',
    weight: 5,
    when: (G) =>
      BALTIC_COUNTRIES.includes(G.character.country.name) &&
      G.currentYear === 1991 &&
      G.age >= 14 &&
      !G.mem?.balt1991,
    text: (G) => {
      const country = G.character.country.name
      if (country === 'Lithuania') {
        return 'January 13, 1991. Soviet troops move on the Vilnius television tower before dawn. Thirteen people die under tank treads and gunfire — one more would die later. The crowds surrounding the tower are unarmed. The troops take the tower; the transmissions go dark. The crowds do not disperse. By morning there are tens of thousands at the parliament building, which is ringed with barricades made of whatever was to hand. Lithuanian independence — declared on March 11, 1990, and then pressured into suspension by Moscow — holds. The troops stop. The world is watching and the world is watching Lithuania in particular.'
      }
      if (country === 'Latvia') {
        return 'January 1991. Soviet special forces — the OMON, the black berets — seize the Interior Ministry building in Riga. Five people are killed at various points in the following weeks. The Latvian government broadcasts from a mobile transmitter. The barricades around the parliament are made of concrete blocks, farm machinery, whatever the people brought in from the countryside. Latvian independence was declared May 4, 1990. It has been hanging in the balance since. This week is when it becomes clear that it is going to hold.'
      }
      return 'January 1991. The Soviet pressure on all three Baltic states is at its peak. In Lithuania, thirteen killed at the TV Tower. In Latvia, five killed in January events. Estonian independence is also formally contested. The question of whether the independence declarations of 1990 will survive is being answered in blood in Vilnius and Riga, and in the barricades and the determination of the people at them. The Soviet Union, it is becoming clear, is not going to do to the Balts what it did to Hungary in 1956.'
    },
    choices: [
      {
        text: 'You are at the barricades, or at the parliament, or at the tower. You are there.',
        tag: null,
        outcome: 'You are one of the conditions. Independence — the specific independence of this specific country — required bodies at the barricades. Your body was one of them.',
        effect: (p) => { p.m += 6; p.m -= 8; p.karma += 10; p.r += 4; p.addFlag('baltic_january_1991'); p.setMem('balt1991', true); },
      },
      {
        text: 'You watch from a distance, from a radio, from a window. It is happening and you are not there.',
        tag: null,
        outcome: 'What happened happened whether you were there or not. The question of why you were not there is one you will be living with.',
        effect: (p) => { p.m -= 3; p.r += 5; p.addFlag('baltic_january_1991'); p.setMem('balt1991', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'balt_russian_non_citizen',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      isRussianMinority(G) &&
      G.currentYear >= 1992 && G.currentYear <= 2010 &&
      G.age >= 18 &&
      !G.mem?.baltRussian,
    text: (G) => {
      const country = G.character.country.name
      if (country === 'Latvia') {
        return 'Latvia\'s citizenship law, adopted in 1994, requires that citizens demonstrate descent from pre-1940 Latvian citizens, or pass a language and civics test. You are Russian. Your family came after the war, during the Soviet period. Under this law you are a "non-citizen" — a category unique to Latvia: not a citizen of Latvia, not formally stateless, but holding a grey passport that does not permit voting and requires visas for most countries. The non-citizen passport is issued to over 700,000 people in the early 1990s.'
      }
      if (country === 'Estonia') {
        return 'Estonia\'s citizenship law requires naturalization through a language test in Estonian and a civics exam. Your family is Russian — Soviet-era arrivals. You can take the test. The test is not easy in a language you learned as a second language in the Soviet school system. The alternative is to apply for Russian citizenship, which some do. Or to live as an "alien" — that is the official category — which means a specific document, specific restrictions, and the specific experience of being a minority in a country that was occupied partly through the importation of people like your family.'
      }
      return 'The post-independence citizenship question. Lithuania handled it differently from Estonia and Latvia — extending citizenship to most Soviet-era residents. But the cultural and political position of Russian-speakers in independent Lithuania is still one of adjustment. The language laws, the national holidays that are not your holidays, the history that is told from a perspective that is not your family\'s perspective.'
    },
    choices: [
      {
        text: 'You naturalize. You learn the language, pass the tests, become a citizen of the country you live in.',
        tag: null,
        outcome: 'The citizenship comes. The belonging is a different question from the citizenship.',
        effect: (p) => { p.e += 5; p.m -= 4; p.r += 4; p.addFlag('russian_minority_baltic'); p.setMem('baltRussian', true); },
      },
      {
        text: 'You take the Russian passport. Your loyalty is where your language is.',
        tag: null,
        outcome: 'The Russian passport is a position. The position has consequences for where you can travel, what you can vote on, and how your children will relate to the country they grow up in.',
        effect: (p) => { p.r += 5; p.m -= 5; p.addFlag('russian_minority_baltic'); p.setMem('baltRussian', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'balt_eu_emigration',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      BALTIC_COUNTRIES.includes(G.character.country.name) &&
      G.currentYear >= 2004 && G.currentYear <= 2015 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.baltEUEmig,
    text: (G) => {
      const country = G.character.country.name
      if (country === 'Lithuania') {
        return 'EU accession, 2004. The borders to Western Europe open and the movement begins immediately. At its peak: 50,000 Lithuanians a year leaving a country of 3 million. Ireland, the United Kingdom, Germany, Norway. The village emptying. The school closing when the children are gone. A country that survived Soviet occupation and then independence and then the collapse of the 1990s is now experiencing a different kind of departure — not forced, not traumatic in the obvious sense, just ordinary people making a rational calculation about where to live.'
      }
      if (country === 'Latvia') {
        return 'EU accession 2004. Latvia lost approximately 15 percent of its population by 2015 through emigration — one of the most dramatic population declines in Europe outside of war. Ireland, the UK, Germany. The remittances arrive. The houses in the countryside get renovated from abroad before the schools get funding. You are doing the calculation: what the country offers, what the alternative offers, what it costs to leave and what it costs to stay.'
      }
      return 'EU accession 2004. The movement begins. Estonia loses a smaller percentage than Latvia or Lithuania, but the demographic is specific: young, educated, mobile. The people the country needs most are making the calculation and the calculation is pointing west. The internet startup ecosystem and the digital economy absorb some of this but not all. You are in the age range where the calculation is real.'
    },
    choices: [
      {
        text: 'You go. The opportunity is real and so is the distance.',
        tag: null,
        outcome: 'You arrive in Western Europe carrying Baltic independence, Baltic history, and Baltic salary expectations that need adjusting. The adjusting happens.',
        effect: (p) => { p.mo += 2500; p.w += 5; p.m -= 5; p.addFlag('eu_emigrant_baltic'); p.addFlag('emigrated'); p.setMem('baltEUEmig', true); },
      },
      {
        text: 'You stay. You are aware you are among a thinning cohort of people who stay.',
        tag: null,
        outcome: 'The thinning is visible. The jobs left behind by the emigrants sometimes pay better than they did before. The question of what the country will be made of is one you are staying to help answer.',
        effect: (p) => { p.r += 3; p.karma += 3; p.addFlag('stayed_when_others_left'); p.setMem('baltEUEmig', true); },
      },
    ],
    effect: null,
  },

]
