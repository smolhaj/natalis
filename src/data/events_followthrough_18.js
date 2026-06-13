// Follow-through events (BUILD — Romania arc + Vietnam/Korea follow-throughs)
// Late-life callbacks for Romania flags + unregistered Vietnam/Korea flags.

export const FOLLOWTHROUGH_18_EVENTS = [

  // ── ROMANIA FOLLOW-THROUGHS ──────────────────────────────────────────────────

  {
    id: 'ft18_securitate_files',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('securitate_generation') &&
      G.currentYear >= 2000 &&
      G.age >= 40 &&
      !G.mem?.ft18SecuritateFiles,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2012) {
        return 'The CNSAS — the National Council for the Study of the Securitate Archives — has been operating since 1999. You can request your file. People have requested their files and found the names of people they knew. The neighbour who was an informer. The colleague. Sometimes: the spouse. The files contain reports that are accurate and reports that the informer invented to meet a quota. The distinction is hard to make from the inside of the report. You can request your file. Some people do not request their file.'
      }
      return 'The Securitate files are being opened. The CNSAS exists and is cataloguing them. The people whose names appear as informers are sometimes people you know. Sometimes they were informers under coercion and sometimes they were informers for other reasons. The distinction is relevant and is also difficult to establish from documents. You grew up in the system the documents describe. You know the system in a way the documents do not contain.'
    },
    choices: [
      {
        text: 'You request your file. You need to know what is in it.',
        tag: null,
        outcome: 'You receive the file. What is in it is accurate in some places and inaccurate in others and you cannot always tell which is which. The name of one person you did not expect is in it.',
        effect: (p) => { p.r += 5; p.e += 3; p.m -= 3; p.setMem('ft18SecuritateFiles', true); },
      },
      {
        text: 'You do not request your file. Some of what is in it you already know.',
        tag: null,
        outcome: 'What you already know is enough. The document would add precision to what you know and precision is not always what you are after.',
        effect: (p) => { p.r += 4; p.m += 2; p.setMem('ft18SecuritateFiles', true); },
      },
    ],
    effect: null,
  },

  {
    id: 'ft18_decree_779_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('decree_779_generation') &&
      G.age >= 55 &&
      !G.mem?.ft18Decree779Late,
    text: 'Decree 779 ran for twenty-three years — from 1966 to December 1989. Twelve thousand women died from illegal procedures in those twenty-three years. The number is the one that was officially researched; the actual number may be higher. The children born under the decree — the decreţei, as they are called — are now in their forties and fifties. Some of them were placed in the orphanages. Some of them grew up with mothers who had not planned for them. You were one of the women counting weeks. You made the decisions the decree forced you to make. The decree is gone. The decisions are in you.',
    choices: null,
    effect: (p) => {
      p.r += 6
      p.karma += 5
      p.m += 3
      p.setMem('ft18Decree779Late', true)
    },
  },

  {
    id: 'ft18_1989_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('romania_1989_generation') &&
      G.age >= 50 &&
      !G.mem?.ft18Rev1989Late,
    text: 'Thirty years later, the question of who the "terrorists" were in December 1989 has not been definitively answered. The court cases are ongoing and have been ongoing for three decades. Iliescu was charged with crimes against humanity in 2015. The trial is still open. The revolution that felt complete on Christmas Day 1989 — when the body was shown on television and the thing that defined your entire life ended in ninety minutes — was followed by a transition that raised the question of how complete the revolution actually was. You were in it. You have been watching the accounting ever since.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.e += 3
      p.setMem('ft18Rev1989Late', true)
    },
  },

  {
    id: 'ft18_eu_emigrant_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('eu_emigrant_romania') &&
      G.age >= 45 &&
      G.currentYear >= 2015 &&
      !G.mem?.ft18EUEmigLate,
    text: (G) => {
      const country = G.currentCountry?.name || 'Western Europe'
      return `You have been in ${country} since the accession years. Romania is in the news periodically — the anti-corruption protests, the government instability, the Colectiv nightclub fire, the pandemic. You follow it in the way that people follow the news of a country that is still theirs from a distance. The village you came from has fewer people each year. The school may already be closed. You send money. The money changes things at the house but not at the school. You know the calculation you made when you left was the right calculation for you. You also know what the right calculation cost the place you made it from.`
    },
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m -= 2
      p.karma += 4
      p.setMem('ft18EUEmigLate', true)
    },
  },

  // ── VIETNAM FOLLOW-THROUGHS ───────────────────────────────────────────────────

  {
    id: 'ft18_doi_moi_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('doi_moi_generation') &&
      G.age >= 55 &&
      !G.mem?.ft18DoiMoiLate,
    text: 'The Đổi Mới reforms — 1986, renovation. The moment Vietnam shifted from central planning toward a market economy while the Communist Party stayed in power. GDP growth averaging 7 percent for twenty years after. Poverty falling from 60 percent to 10 percent by 2010. The Ho Chi Minh City skyline, the motorbikes, the foreign investment, the coffee chains. You were in the country for the transition — old enough to remember the ration coupon and young enough to have a bank account after. Vietnam\'s economic miracle is not in the newspapers the way China\'s is. It happened anyway.',
    choices: null,
    effect: (p) => {
      p.m += 5
      p.e += 3
      p.r += 2
      p.setMem('ft18DoiMoiLate', true)
    },
  },

  {
    id: 'ft18_viet_kieu_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('viet_kieu_investor') &&
      G.age >= 50 &&
      !G.mem?.ft18VietKieuLate,
    text: 'Việt Kiều — overseas Vietnamese. You came back to invest, or to visit, or to figure out what coming back meant. The country you came back to has a market economy and a party that does not permit political opposition and a class of young people who were born after the war and have no memory of the south. You are from the south. The café on the corner used to be something else. The people who remember what it was are old. You are becoming one of the people who remember.',
    choices: null,
    effect: (p) => {
      p.r += 5
      p.m += 3
      p.e += 2
      p.setMem('ft18VietKieuLate', true)
    },
  },

  // ── KOREA FOLLOW-THROUGHS ─────────────────────────────────────────────────────

  {
    id: 'ft18_gwangju_late',
    phase: 'late_life',
    weight: 4,
    when: (G) =>
      G.flags.includes('gwangju_witness') &&
      G.age >= 55 &&
      !G.mem?.ft18GwangjuLate,
    text: (G) => {
      const year = G.currentYear
      if (year >= 2017) {
        return 'Chun Doo-hwan, who ordered the paratroopers into Gwangju in May 1980, died in 2021 at eighty-nine years old without having completed his apology. He was sentenced to death in 1996 for the coup and the Gwangju massacre, pardoned in 1997. In his final years, his lawyers challenged the characterisation of the events in Gwangju. The characterisation is "massacre." He disputed this. The 606 confirmed dead — the bodies that were found, the number that was eventually acknowledged — do not dispute it.'
      }
      return 'The May 18th Democratic Uprising Memorial in Gwangju holds the bodies and the names and the testimonies. The paratroopers who were in the city in May 1980 were following orders whose origin is now documented. The documentation has been available since the trials. Chun Doo-hwan was convicted. He was pardoned. You were in Gwangju. You have been watching the accounting.'
    },
    choices: null,
    effect: (p) => {
      p.r += 5
      p.karma += 4
      p.setMem('ft18GwangjuLate', true)
    },
  },

  {
    id: 'ft18_chaebol_late',
    phase: 'late_life',
    weight: 3,
    when: (G) =>
      G.flags.includes('chaebol_worker') &&
      G.age >= 55 &&
      !G.mem?.ft18ChaeholLate,
    text: 'The chaebol company. Samsung, Hyundai, LG, Lotte. You gave it decades. The performance review, the evening dinners that were not optional, the specific culture of a large Korean corporation where the hierarchy is visible in every room. In exchange: the salary, the healthcare, the pension, the prestige of the employer on your resume. Park Geun-hye was impeached in 2017 and the Samsung heir went to prison for bribing her administration. The corruption that ran the miracle is not separate from the miracle. You built something inside that structure. The structure and what you built inside it are both real.',
    choices: null,
    effect: (p) => {
      p.r += 4
      p.e += 3
      p.m += 2
      p.setMem('ft18ChaeholLate', true)
    },
  },

]
