// Singapore arc events
//
// Singapore's story is unlike any other: a nation that came into being by accident
// (expelled from Malaysia, 1965), then built itself into a wealthy city-state through
// a specific bargain — prosperity and safety in exchange for conformity and deference.
// Lee Kuan Yew's PAP has governed since 1959. The results are real. The costs are real.
//
// Key arcs:
//  — The founding shock (1965): becoming a nation nobody planned for
//  — Kampung demolition: entire way of life replaced by HDB blocks
//  — Speak Mandarin campaign (1979): Chinese dialects suppressed within a generation
//  — National Service: the male rite of passage that defines the country
//  — PSLE and kiasu culture: streaming at age 12 that tracks you for life
//  — The racial bargain: engineered harmony, Ethnic Integration Policy, Malay exclusion
//  — LKY death 2015: what do you feel when the man who built everything is gone?

const SINGAPORE_EVENTS = [

  // ── FOUNDING SHOCK ─────────────────────────────────────────────────────────

  {
    id: 'sg_separation_1965',
    phase: 'young_adult',
    weight: 6,
    when: (G) =>
      G.character.country.name === 'Singapore' &&
      G.currentYear >= 1965 && G.currentYear <= 1970 &&
      G.age >= 15 &&
      !G.mem?.sg_separation,
    text: (G) => {
      const yr = G.currentYear
      if (yr === 1965) return 'August 9, 1965. Lee Kuan Yew comes on television and his eyes are wet. He says: "For me it is a moment of anguish because all my life..." He cannot finish the sentence. Singapore has been expelled from Malaysia. You are now a citizen of a country that nobody planned, a city-state with no hinterland, no natural resources, no reason to exist as a separate nation except that it has just been told it must. The country is shocked and then it begins.'
      return 'The separation from Malaysia happened three years ago, or five. The shock has settled into something practical. Singapore is building. The question of whether it can survive — a tiny island with no water, no food, no natural resources — has been replaced by the question of how fast it can grow. You are watching this happen from inside it.'
    },
    choices: [
      {
        text: 'The fear of survival is real — but also clarifying',
        tag: null,
        outcome: 'Existential threat produces focus. The country you are building has no margin for error and everyone in it knows this. The knowledge is useful.',
        effect: (p) => { p.e += 5; p.addFlag('sg_founding_generation'); p.setMem('sg_separation', true); },
      },
      {
        text: 'Nobody asked you if you wanted this country',
        tag: null,
        outcome: 'Citizenship arrived. You did not apply for it. The country that chose you is now demanding that you choose it back. This is not a simple transaction.',
        effect: (p) => { p.r += 6; p.m -= 4; p.addFlag('sg_founding_generation'); p.setMem('sg_separation', true); },
      },
    ],
    effect: null,
  },

  // ── KAMPUNG DEMOLITION ──────────────────────────────────────────────────────

  {
    id: 'sg_kampung_clearing',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Singapore' &&
      G.currentYear >= 1965 && G.currentYear <= 1985 &&
      G.age >= 6 && G.age <= 16 &&
      !G.mem?.sg_kampung,
    text: 'The letter comes to say the kampung is being acquired. The government needs the land for HDB flats — the high-rise public housing blocks going up faster than anyone expected. Your family\'s house, the neighbors, the chickens, the well, the banyan tree where you spent every afternoon — all of it will be cleared within the year. The government says this is progress. Most of the adults around you believe them, and also they are crying.',
    choices: null,
    effect: (p) => { p.m -= 6; p.r += 5; p.addFlag('sg_kampung_generation'); p.setMem('sg_kampung', true); },
  },

  // ── SPEAK MANDARIN CAMPAIGN ─────────────────────────────────────────────────

  {
    id: 'sg_speak_mandarin',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Singapore' &&
      G.ethnicity === 'chinese_singaporean' &&
      G.currentYear >= 1979 && G.currentYear <= 1999 &&
      G.age >= 6 && G.age <= 20 &&
      !G.mem?.sg_mandarin,
    text: (G) => {
      const yr = G.currentYear
      return yr <= 1985
        ? 'The Speak Mandarin Campaign has begun. Your grandmother speaks Hokkien; your grandfather speaks Teochew. The radio stations that broadcast in those languages are being shut down one by one. At school they tell you that speaking your dialect in public is holding Singapore back — that Mandarin is the language of the future and the dialects are the past. You go home and you can hear your grandmother trying to explain something and the word for it does not exist in the language you are being asked to speak.'
        : 'The campaign has been running for years. Your parents speak Mandarin to you; Hokkien or Cantonese or Teochew comes out when they are emotional or tired or talking to their own parents. The language your grandmother thinks in is not the language you are fully fluent in. The connection this creates is hard to name: you can be in the same room and partly unreachable from each other.'
    },
    choices: [
      {
        text: 'Learn Mandarin, let the dialect go — it is the practical thing',
        tag: null,
        outcome: 'The practical thing turns out to be a permanent thing. Languages do not come back easily once they are gone from a generation.',
        effect: (p) => { p.e += 3; p.r += 4; p.addFlag('sg_dialect_lost'); p.setMem('sg_mandarin', true); },
      },
      {
        text: 'Keep learning the dialect from your grandmother — it is hers to give you',
        tag: null,
        outcome: 'You hold two registers: Mandarin for the world, dialect for the kitchen. Not everyone who tries this succeeds. You mostly do.',
        effect: (p) => { p.e += 2; p.addFlag('sg_dialect_keeper'); p.setMem('sg_mandarin', true); },
      },
    ],
    effect: null,
  },

  // ── NATIONAL SERVICE ────────────────────────────────────────────────────────

  {
    id: 'sg_national_service',
    phase: 'young_adult',
    weight: 7,
    when: (G) =>
      G.character.country.name === 'Singapore' &&
      G.character.gender === 'male' &&
      G.currentYear >= 1967 &&
      G.age >= 18 && G.age <= 21 &&
      !G.mem?.sg_ns,
    text: (G) => {
      const isMalay = G.ethnicity === 'malay_singaporean'
      return isMalay
        ? 'Your enlistment letter arrives. Two years, two months. You report on the appointed day. At the training camp you notice that Malay servicemen are steered toward certain vocations — logistics, engineering, the signals corps. The combat units are predominantly Chinese. Nobody says this out loud; it is simply where you end up. The understanding is that it has to do with "security sensitivities" — your ethnicity, the religion, the countries next door. You are Singaporean. You are serving Singapore. The exact nature of your belonging to it is more complicated than the brochure suggested.'
        : 'Your enlistment letter arrives. Two years, two months of national service. Everyone does it; it is the male rite of passage of this country. The first three months are BMT — Basic Military Training: the physical regime, the sergeant who knows your name and intends to make it difficult, the specific boredom and camaraderie of a camp. You come out the other side with a unit, a field camp story, and the knowledge that every man in Singapore of your generation has exactly one of each.'
    },
    choices: [
      {
        text: 'You take it seriously — the country is real and worth defending',
        tag: null,
        outcome: 'The commitment is not pretended. Singapore\'s vulnerability is genuine: small island, complicated neighbourhood. You serve and it means something.',
        effect: (p) => { p.s += 5; p.h += 3; p.addFlag('sg_ns_served'); p.setMem('sg_ns', true); },
      },
      {
        text: 'You serve because you have to — the years are years you cannot get back',
        tag: null,
        outcome: 'The years pass. You are a reservist now. Every year until your fifties the in-camp training order will arrive. The country has your time for a long time.',
        effect: (p) => { p.h += 2; p.r += 4; p.addFlag('sg_ns_served'); p.setMem('sg_ns', true); },
      },
    ],
    effect: null,
  },

  // ── PSLE AND KIASU ──────────────────────────────────────────────────────────

  {
    id: 'sg_psle_exam',
    phase: 'childhood',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Singapore' &&
      G.currentYear >= 1960 &&
      G.age >= 11 && G.age <= 13 &&
      !G.mem?.sg_psle,
    text: 'The PSLE — Primary School Leaving Examination — at twelve years old will determine which secondary school you attend, which stream you enter, and in ways that are difficult to fully escape, who you will become professionally. You know this. Your parents know this. Singapore runs on this knowledge. Your mother has enrolled you in tuition for Chinese, English, Mathematics, and Science. The Saturday mornings given over to this are simply what Singapore childhoods are. You sit the exam.',
    choices: [
      {
        text: 'You do well — the preparation paid off',
        tag: null,
        outcome: 'The score is good. The secondary school is good. The track is set. You will spend several years understanding whether the track matches who you actually are.',
        effect: (p) => { p.e += 5; p.addFlag('sg_exam_success'); p.addFlag('sg_hdb_generation'); p.setMem('sg_psle', true); },
      },
      {
        text: 'You do not do well enough — the track closes',
        tag: null,
        outcome: 'The system has rendered its verdict. Normal Technical stream, or the neighbourhood school that was the backup. Singapore says this is not the end; you know enough to know it significantly changes the shape of things.',
        effect: (p) => { p.e -= 2; p.m -= 6; p.r += 5; p.addFlag('sg_exam_failure'); p.addFlag('sg_hdb_generation'); p.setMem('sg_psle', true); },
      },
    ],
    effect: null,
  },

  // ── FINE CITY / SOCIAL CONTRACT ─────────────────────────────────────────────

  {
    id: 'sg_fine_city',
    phase: 'young_adult',
    weight: 3,
    when: (G) =>
      G.character.country.name === 'Singapore' &&
      G.currentYear >= 1990 &&
      G.age >= 18 &&
      !G.mem?.sg_fine_city,
    text: (G) => {
      const yr = G.currentYear
      const detail = yr <= 1993
        ? 'Chewing gum is banned starting this year. You knew before the law that you were living inside a set of rules denser than most places, but this one is specific enough to crystallize it.'
        : yr <= 2005
        ? 'The list of fines accumulates in your memory: jaywalking, not flushing a public toilet, eating on the MRT, failing to carry your IC. The country works. The rules that make it work are not hypothetical.'
        : 'Section 377A is still on the books — homosexual acts between men are illegal, even though the government has said it will not prosecute. The law\'s presence is its own message. The country you live in has decided some things are managed rather than resolved.'
      return `${detail} There is a specific social contract here: you give up certain freedoms and you get safety, efficiency, and wealth. Most people you know consider this a good trade. You are still deciding whether you consider it a choice.`
    },
    choices: [
      {
        text: 'The trade is worth it — the country functions and that is rare',
        tag: null,
        outcome: 'This is the dominant Singaporean position and it is not unreasonable. The MRT runs. The hospitals work. The schools produce results. The bargain has delivered.',
        effect: (p) => { p.m += 3; p.addFlag('sg_conformist'); p.setMem('sg_fine_city', true); },
      },
      {
        text: 'Something is missing — the country runs but it does not breathe',
        tag: null,
        outcome: 'You are not wrong. The word for it in Singapore is "stifling." Some people who feel this leave. Others stay and feel it quietly.',
        effect: (p) => { p.r += 5; p.addFlag('sg_restless'); p.setMem('sg_fine_city', true); },
      },
    ],
    effect: null,
  },

  // ── ETHNIC INTEGRATION POLICY ───────────────────────────────────────────────

  {
    id: 'sg_ethnic_quota',
    phase: 'young_adult',
    weight: 4,
    when: (G) =>
      G.character.country.name === 'Singapore' &&
      G.currentYear >= 1989 &&
      G.age >= 25 && G.age <= 45 &&
      !G.mem?.sg_eip,
    text: (G) => {
      const eth = G.ethnicity
      if (eth === 'malay_singaporean') {
        return 'You want to buy in that block near your parents, or near your mosque, where you know people and the neighbourhood is familiar. The HDB officer explains that the Ethnic Integration Policy limits the proportion of Malay flat-owners in each block. The block you want has reached its Malay quota. The policy is designed to prevent ethnic enclaves — to ensure Singapore stays mixed. The policy is not wrong, exactly. It also means that where you can live is partly determined by how many people like you already live there.'
      }
      if (eth === 'indian_singaporean') {
        return 'The Ethnic Integration Policy means the proportion of Indian households in each block is capped. The flat near your family, the one you\'ve been working toward, has hit the Indian quota. You are directed to look elsewhere. Singapore\'s engineered multiculturalism works by distributing ethnic groups across the housing stock. The engineering is real and produces real effects on where you end up.'
      }
      return 'You want the flat in a block near work, near your parents, near the hawker centre you know. The Ethnic Integration Policy limits each ethnic group\'s proportion in each block. The Chinese quota has not been hit — this is less often a problem for the majority — but you know families for whom it has been. The policy\'s logic is sound. Its effects are uneven.'
    },
    choices: null,
    effect: (p) => { p.r += 4; p.addFlag('sg_eip_generation'); p.setMem('sg_eip', true); },
  },

  // ── LEE KUAN YEW DEATH 2015 ─────────────────────────────────────────────────

  {
    id: 'sg_lky_death_2015',
    phase: 'midlife',
    weight: 5,
    when: (G) =>
      G.character.country.name === 'Singapore' &&
      G.currentYear >= 2015 && G.currentYear <= 2016 &&
      G.age >= 30 &&
      !G.mem?.sg_lky_death,
    text: 'March 23, 2015. Lee Kuan Yew dies at ninety-one. He has been prime minister since before Singapore existed as a nation. For five days the queue stretches for hours — people wait through the night to file past the casket. Singapore grieves in a way that surprises even Singaporeans; you did not know the feeling of loss would be this large. He was not always right. He was not always kind. The country he built, for all its costs, is real. The city is quiet for a week in a way it has never been and will not be again.',
    choices: [
      {
        text: 'You queue — five hours, in the rain',
        tag: null,
        outcome: 'You are not sure what you feel. The queue is something you can do. The country is old enough now to have something to mourn.',
        effect: (p) => { p.m -= 5; p.karma += 3; p.addFlag('sg_lky_generation'); p.setMem('sg_lky_death', true); },
      },
      {
        text: 'You do not queue — you watch from a distance, more ambivalent than grief',
        tag: null,
        outcome: 'The distance is honest. You live in what he built. Your ambivalence about it has not prevented you from living in it.',
        effect: (p) => { p.r += 4; p.addFlag('sg_lky_generation'); p.setMem('sg_lky_death', true); },
      },
    ],
    effect: null,
  },

]

export default SINGAPORE_EVENTS
