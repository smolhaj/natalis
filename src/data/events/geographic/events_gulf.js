// events_gulf.js — the two cities in one square kilometre.
//
// The UAE's own country note says it: "Citizens are a privileged minority —
// 11% of the population — in their own country... An Emirati and a Bangladeshi
// construction worker live in the same square kilometre but inhabit entirely
// different cities." The demography was already modelled correctly — UAE 59%
// South Asian, Qatar 60%, Kuwait 40%, Bahrain 36%, every migrant group flagged
// disadvantaged — and across eleven Gulf ethnic ids the corpus contained ONE
// reference. `wealthy_gulf` was the worst-covered archetype in the roster.
//
// The kafala content that existed was written from the sending side: a Nepali
// village, a labour broker, a one-way ticket. The arriving life, and the life
// of the citizen watching it arrive, were both unwritten.
//
// Two things this module refuses to do.
//
// It does not write the migrant life as only suffering. The remittance is the
// point of it, the house going up four thousand kilometres away is real, and
// men who have done fifteen years in the Industrial Area are not a category,
// they are the people who paid for a sister's degree. The cost is enormous and
// it is not the whole of the ledger.
//
// It does not write the citizen as a villain or a cartoon. The Gulf was
// desperately poor within living memory — the pearl economy collapsed in the
// 1930s when Japanese cultured pearls destroyed the market, and the famine that
// followed is in living grandparents' mouths. A Qatari born in 1955 watched a
// country arrive around them at a speed nobody has a precedent for, and being
// eleven per cent of your own country is its own strange condition.
//
// Dates used, all checked: Bahrain oil 1932 (first in the Gulf), Kuwait and
// Saudi 1938, Qatar 1940, Abu Dhabi exports 1962, Oman 1967. Kuwait
// independent 1961; UAE, Qatar and Bahrain 1971. The pearl collapse runs from
// the early 1930s. Iraq invades Kuwait 2 August 1990, liberation February 1991,
// and some 400,000 Palestinians are expelled afterwards for the PLO's position.
// Midday summer outdoor-work bans: UAE 2005, Qatar 2007, Saudi 2010. Bahrain's
// Pearl Roundabout is occupied in February 2011 and demolished on 18 March, so
// that it could not be a symbol. Qatar wins the World Cup in December 2010 and
// holds it in November 2022; the exit permit goes in 2018 and the NOC
// requirement in 2020, and a minimum wage arrives in 2021 — late in a life that
// started in 1994.

import { pickFrom } from '../../../utils/random'

const GULF = ['UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Saudi Arabia', 'Oman']

const IS_GULF = (G) => GULF.includes(G.currentCountry?.name ?? G.character?.country?.name)

// The migrant populations, by the ids the roster actually uses.
const MIGRANT_IDS = new Set([
  'south_asian_uae', 'south_asian_qatar', 'south_asian_kuwait', 'south_asian_bahrain',
  'south_asian_omani', 'south_asian_worker', 'filipino_qatar', 'east_asian_uae',
])
const IS_MIGRANT = (G) => MIGRANT_IDS.has(G.character?.ethnicity)

// The citizen populations. `other_arab_*` and `western_*` are a third thing —
// resident, not migrant labour, not national — and this module leaves them out
// rather than writing them as either.
const CITIZEN_IDS = new Set([
  'emirati', 'qatari_arab', 'kuwaiti', 'bahraini_shia', 'bahraini_sunni',
  'arab_saudi', 'bedouin', 'omani_arab', 'jibbali_omani', 'lawati_omani',
])
const IS_CITIZEN = (G) => CITIZEN_IDS.has(G.character?.ethnicity)

const here = (G) => G.currentCountry?.name ?? G.character?.country?.name

// Where "home" is for a migrant the engine drew in the Gulf. The roster models
// these groups as born in the country they work in, so the birth country is
// the Gulf state itself and `p.returnHome()` would go nowhere. Going home for
// good narrated a bag, a bank draft and a finished house, and then left the
// man in Bur Dubai for the rest of his life, retiring on a Gulf pension from a
// country whose own prose had just said there is no retirement here.
const SENDING = {
  filipino_qatar: ['Philippines'],
  east_asian_uae: ['Philippines', 'Philippines', 'Indonesia'],
}
const goHome = (p) => {
  // The family's names already say where it came from (character.js,
  // NAME_SOURCE), so home is that country when there is one.
  const eth = p._state?.character?.ethnicity
  const origin = p._state?.character?.nameCountry
  p.emigrateTo(origin ? [origin] : SENDING[eth] ?? ['India', 'India', 'Pakistan', 'Bangladesh', 'Nepal', 'Sri Lanka'], { residency: 'citizen' })
  p.clearCareer()
}

export const GULF_EVENTS = [

  // ══════════════════════════════════════════════════════════════════════════
  // FOLLOW-THROUGH FIRST. Everything below the triggers is written above them,
  // because a flag with no echo is prose that leaves the life the moment it
  // resolves.
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'gulf_the_debt_that_came_with_you',
    phase: null,
    weight: 40,
    when: (G) =>
      G.flags.includes('gulf_recruitment_debt') &&
      !G.flags.includes('gulf_debt_cleared') &&
      G.mem?.gulfArrivedYear != null &&
      G.currentYear - G.mem.gulfArrivedYear >= 2 &&
      G.currentYear - G.mem.gulfArrivedYear <= 4 &&
      !G.mem?.gulfDebtYears,
    text: 'The arithmetic of the first years is not the arithmetic you were shown. The agent\'s fee was a number you borrowed against land, and the wage is the wage, and what is left after the deduction for the accommodation and the deduction for the food goes first to the interest. You have been here twenty-eight months. You calculate, on a Friday, with a pencil, that the flight and the fee and the medical and the stamp will be paid off in the fourth year, and that the fourth year is therefore the first year you will actually be working for your family rather than for the fact of having come.',
    choices: [
      {
        text: 'Write home that it is going well.',
        tag: 'yielding',
        outcome: 'It is not a lie so much as a decision about what a letter is for. You will make the same decision for fifteen years.',
        effect: (p) => { p.setMem('gulfDebtYears', true); p.m -= 6; p.r += 5; p.addFlag('gulf_protected_them_from_it') },
      },
      {
        text: 'Write home exactly what the numbers are.',
        tag: 'defiant',
        outcome: 'Your father reads it and does not reply for a month, and then replies about the rain. You understand that you have transferred the weight rather than shared it.',
        effect: (p) => { p.setMem('gulfDebtYears', true); p.m -= 4; p.r += 7; p.addFlag('gulf_told_them_the_truth') },
      },
    ],
    effect: null,
  },

  {
    id: 'gulf_two_more_years',
    phase: null,
    weight: 30,
    when: (G) =>
      G.flags.includes('gulf_migrant_worker') &&
      G.mem?.gulfArrivedYear != null &&
      G.currentYear - G.mem.gulfArrivedYear >= 9 &&
      !G.mem?.gulfTwoMoreYears,
    text: (G) => {
      const yrs = G.currentYear - (G.mem?.gulfArrivedYear ?? G.currentYear)
      return `You have said "two more years" for ${yrs > 12 ? 'more than a decade' : 'nine years'}. You said it the first time meaning it. There was the roof, and then the sister's wedding, and then the brother's course, and then the year the riyal bought less than it had, and each of those was a real reason and each of them was two more years. The room has four other men in it and three of them have been here longer than you. Nobody in it thinks of himself as living here.`
    },
    choices: null,
    effect: (p) => { p.setMem('gulfTwoMoreYears', true); p.m -= 7; p.r += 8; p.addFlag('gulf_long_stayer') },
  },

  {
    id: 'gulf_the_house_you_have_not_stood_in',
    phase: null,
    weight: 26,
    when: (G) =>
      G.flags.includes('gulf_migrant_worker') &&
      G.flags.includes('gulf_sends_remittance') &&
      G.mem?.gulfArrivedYear != null &&
      G.currentYear - G.mem.gulfArrivedYear >= 6 &&
      !G.mem?.gulfTheHouse,
    text: 'The house is finished. There are photographs: the front, the gate, the room that is yours, your mother standing in the doorway being told to stand still. It has a concrete roof and a tank on it and it is the best house on that road, and it exists because of eleven years of a room in the Industrial Area, and you have never stood inside it. You look at the photographs on the phone in the evening, which is what the phone is for, and the strange part is not sadness. The strange part is that it is genuinely, entirely worth it, and that both of those things stay true at once.',
    choices: null,
    effect: (p) => { p.setMem('gulfTheHouse', true); p.m += 6; p.r += 6; p.addFlag('gulf_built_it_from_here') },
  },

  {
    id: 'gulf_the_children_on_the_screen',
    phase: null,
    weight: 26,
    when: (G) =>
      G.flags.includes('gulf_migrant_worker') &&
      (G.children ?? []).some(c => c.alive !== false) &&
      G.currentYear >= 2008 &&
      G.mem?.gulfArrivedYear != null &&
      G.currentYear - G.mem.gulfArrivedYear >= 4 &&
      !G.mem?.gulfScreenChildren,
    text: (G) => {
      const kid = (G.children ?? []).find(c => c.alive !== false)
      const name = kid?.name?.split(' ')[0] ?? 'your eldest'
      return `${name} is taller in each call and you notice it in steps rather than continuously, which is not how a parent is supposed to learn it. There is a moment in the call where the conversation runs out and neither of you minds, and the phone just stays on, propped against something, while they do their homework and you sit on the edge of the bed. That is the part that is closest to being there. You do about forty minutes a week of being a father and you have got very good at it.`
    },
    choices: null,
    effect: (p) => { p.setMem('gulfScreenChildren', true); p.m -= 5; p.r += 7; p.addFlag('gulf_parent_by_phone') },
  },

  {
    id: 'gulf_reform_arrives_late',
    phase: null,
    weight: 34,
    when: (G) =>
      G.flags.includes('gulf_migrant_worker') &&
      IS_GULF(G) &&
      // Qatar 2018-2021 is the real reform; the others move partially and later.
      G.currentYear >= (here(G) === 'Qatar' ? 2020 : 2022) &&
      G.currentYear <= 2035 &&
      G.mem?.gulfArrivedYear != null &&
      G.currentYear - G.mem.gulfArrivedYear >= 8 &&
      !G.mem?.gulfReform,
    text: (G) => here(G) === 'Qatar'
      ? 'They abolish the exit permit, and then the no-objection certificate, and then there is a minimum wage. It is in the paper and the men in the room read it out to each other and there is an argument about what it actually means for a man with eleven years in. What it means for you is that you could change employer now, in principle, and that you are forty-six, and that the arithmetic of starting again is not the arithmetic of a young man. The thing you wanted at twenty-eight arrives at forty-six and is addressed to somebody else.'
      : 'The rules change, somewhat, in a direction that is better than the direction they were. The announcement is precise about the categories it covers and you read it twice to find out whether you are one of them. The room has opinions. The oldest man in it says that the rules have changed four times since he came and the work has not changed once, and everybody laughs, and he is not entirely joking.',
    choices: null,
    effect: (p) => { p.setMem('gulfReform', true); p.m -= 2; p.r += 6; p.addFlag('gulf_reform_too_late') },
  },

  {
    id: 'gulf_going_home_for_good',
    phase: null,
    weight: 45,
    when: (G) =>
      G.flags.includes('gulf_long_stayer') &&
      G.age >= 48 &&
      !G.mem?.gulfWentHome,
    text: 'There is no retirement here and there was never going to be; the visa is the job and when the job ends the country ends. You go back with a bag, a bank draft, a body that is about ten years older than the number, and a set of habits — the water bottle, the shade, the way you sleep through the afternoon — that will look strange at home and that you will not be able to explain. At the airport somebody stamps you out of a place you gave twenty-three years to and have never once been from.',
    choices: [
      {
        text: 'Be glad. The house is there, the children are grown, the arithmetic worked.',
        tag: 'yielding',
        outcome: 'It did work. You are the reason for a great deal, and everybody in the house knows it, and they treat you like a guest for about three weeks.',
        effect: (p) => {
          p.setMem('gulfWentHome', true)
          p.m += 8; p.r += 4
          p.addFlag('gulf_returned'); p.addFlag('ofw_returned'); goHome(p)
        },
      },
      {
        text: 'Find you cannot settle. Your life was there and your life was never there.',
        tag: 'defiant',
        outcome: 'You are home and you are looking for the shade at the wrong time of day, and you have nobody to say the Industrial Area words to.',
        effect: (p) => {
          p.setMem('gulfWentHome', true)
          p.m -= 6; p.r += 9
          p.addFlag('gulf_returned'); p.addFlag('gulf_could_not_settle'); goHome(p)
        },
      },
    ],
    effect: null,
  },

  {
    id: 'gulf_citizen_the_country_arrived',
    phase: null,
    weight: 24,
    when: (G) =>
      G.flags.includes('gulf_watched_it_built') &&
      G.age >= 58 &&
      !G.mem?.gulfCitizenLate,
    text: 'Your grandfather dived for pearls and your father remembers being hungry and you have a card that pays for things, and the three of you are one family and about seventy years. You drive past a district that did not exist and cannot name the road. The speed of it is the fact that no one outside has the right instinct about: not the wealth, the speed. A country was delivered to you, more or less completely, inside one life, and the question of what any of you did to deserve it is one that the polite version of the conversation does not include.',
    choices: null,
    effect: (p) => { p.setMem('gulfCitizenLate', true); p.m += 2; p.r += 7; p.addFlag('gulf_three_generations') },
  },

  {
    id: 'gulf_minority_at_home',
    phase: null,
    weight: 22,
    when: (G) =>
      G.flags.includes('gulf_citizen_minority') &&
      G.age >= 30 &&
      !G.mem?.gulfMinorityEcho,
    text: (G) => here(G) === 'Kuwait'
      ? 'You are thirty per cent of your own country and that is the high figure in this region. The mall is not in your language. The clinic is not in your language. It is not resentment exactly — the arrangement was built deliberately and your family is on the side of it that benefits — but there is a specific small disorientation in being from a place and being outnumbered in it four to one by people who cannot stay.'
      : 'Roughly one person in nine here is from here. You have gone whole days conducting your business in English with people who will be in another country within five years, and it is entirely normal, and then a cousin visits from abroad and says something about it and you hear it freshly for an afternoon.',
    choices: null,
    effect: (p) => { p.setMem('gulfMinorityEcho', true); p.r += 4; p.addFlag('gulf_minority_reflection') },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // THE MIGRANT LIFE — arriving, the camp, the heat, the money
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'gulf_arrival_passport',
    phase: null,
    weight: 90,
    when: (G) =>
      IS_GULF(G) && IS_MIGRANT(G) &&
      G.age >= 19 && G.age <= 34 &&
      G.currentYear >= 1975 &&
      !G.mem?.gulfArrived,
    text: (G) => `You land at night because the flights are at night, and the heat outside the terminal is not weather, it is a physical object you walk into. A man with a clipboard has your name on a list in the wrong transliteration. In the minibus somebody asks for the passports and collects them, and the collecting is done briskly and without discussion, the way a thing is done when everyone present has already agreed it will happen. You will see it again in four years if you are lucky, at the moment of renewal, briefly, across a desk. ${here(G)} is outside the window and it is mostly lights and cranes.`,
    choices: [
      {
        text: 'Hand it over. Everyone else has.',
        tag: 'yielding',
        outcome: 'It goes into a bag with thirty others. Your name is on the outside, spelled the way the list spells it.',
        effect: (p) => {
          p.setMem('gulfArrived', true)
          p.setMem('gulfArrivedYear', p._state?.currentYear ?? null)
          p.m -= 5; p.r += 4
          p.addFlag('gulf_migrant_worker'); p.addFlag('gulf_recruitment_debt')
          p.addFlag('ofw_passport_held'); p.addFlag('gulf_sends_remittance')
          p.setResidency('work_visa')
        },
      },
      {
        text: 'Ask, out loud, whether you get it back.',
        tag: 'defiant',
        outcome: 'You are told yes, of course, pleasantly, and it goes into the bag. The man beside you looks straight ahead and later tells you not to be the one who asks.',
        effect: (p) => {
          p.setMem('gulfArrived', true)
          p.setMem('gulfArrivedYear', p._state?.currentYear ?? null)
          p.m -= 3; p.s += 2; p.r += 5
          p.addFlag('gulf_migrant_worker'); p.addFlag('gulf_recruitment_debt')
          p.addFlag('ofw_passport_held'); p.addFlag('gulf_sends_remittance')
          p.addFlag('gulf_asked_out_loud')
          p.setResidency('work_visa')
        },
      },
    ],
    effect: null,
  },

  {
    id: 'gulf_the_room',
    phase: null,
    weight: 50,
    when: (G) =>
      G.flags.includes('gulf_migrant_worker') &&
      G.mem?.gulfArrivedYear != null &&
      G.currentYear - G.mem.gulfArrivedYear <= 3 &&
      !G.mem?.gulfRoom,
    text: 'Eight bunks, six men, one window and an air conditioner that is either off or catastrophic. The cooking is done on the floor at the end where the tiles are. There is a shelf each and the shelf is the whole of your private property in this country and everybody respects it absolutely, which is a small thing and is not a small thing. The bus is at half past four. On Fridays there is a phone call and a shop that sells the right spices at the wrong price, and the road outside fills with men walking with nowhere particular to be.',
    choices: null,
    effect: (p) => { p.setMem('gulfRoom', true); p.h -= 4; p.m -= 3; p.addFlag('gulf_labour_accommodation') },
  },

  {
    id: 'gulf_the_heat',
    phase: null,
    weight: 44,
    when: (G) =>
      G.flags.includes('gulf_migrant_worker') &&
      !G.mem?.gulfHeat,
    text: (G) => G.currentYear >= (here(G) === 'UAE' ? 2005 : here(G) === 'Qatar' ? 2007 : 2010)
      ? 'From June there is a rule: no outdoor work between noon and three. It is a real rule and it is mostly kept, and it means the day starts before light and finishes after dark with a hole in the middle that you spend lying on a bunk in a room that is thirty-eight degrees, waiting. Somebody times it. The men who were here before the rule describe the years before the rule in a flat voice and do not dwell on it.'
      : 'In August the site metal cannot be touched with a bare hand after ten in the morning. You learn the particular discipline of drinking before you are thirsty and you learn to recognise, in another man, the moment before it goes wrong — the talking that gets a little too easy. Two men from the other camp are taken away in a week and the cause of death, when it is given at all, is given as cardiac arrest.',
    choices: null,
    effect: (p) => {
      p.setMem('gulfHeat', true)
      p.h -= 7; p.m -= 3
      p.addFlag('gulf_worked_the_heat')
    },
  },

  {
    id: 'gulf_remittance_day',
    phase: null,
    weight: 38,
    when: (G) =>
      G.flags.includes('gulf_sends_remittance') &&
      !G.mem?.gulfRemittanceDay,
    text: 'The queue at the exchange on the last Friday is four hundred men long and entirely good-humoured. You know the rate before you arrive, everybody does, it is the one number in this country that everybody in this queue can quote. The clerk knows your number without asking. What you are holding when you come out is a slip of paper worth a term\'s fees, or a roof, or the operation, and for about an hour afterwards you are the most useful man in your family and you walk differently.',
    choices: null,
    effect: (p) => { p.setMem('gulfRemittanceDay', true); p.m += 7; p.karma += 4; p.addFlag('gulf_remittance_pride') },
  },

  {
    id: 'gulf_wages_late',
    phase: null,
    weight: 40,
    when: (G) =>
      G.flags.includes('gulf_migrant_worker') &&
      G.mem?.gulfArrivedYear != null &&
      G.currentYear - G.mem.gulfArrivedYear >= 2 &&
      !G.mem?.gulfWagesLate,
    text: 'The wages are two months late and then they are three. The company says the client has not paid the company, which may even be true. You cannot leave the employer, you cannot leave the country without the paper, and the men in the room divide roughly into the ones who want to go to the labour office and the ones who have been to the labour office. What arrives in the end is most of it, in one payment, with no explanation and no interest, and the relief is so large that the anger has nowhere to go.',
    choices: [
      {
        text: 'Go with the others to the labour office.',
        tag: 'defiant',
        outcome: 'It is a long day of forms and a longer wait. It works, eventually, partially. Two of the men who went are not on the site the following month.',
        effect: (p) => { p.setMem('gulfWagesLate', true); p.m -= 5; p.karma += 6; p.r += 4; p.addFlag('gulf_complained_formally') },
      },
      {
        text: 'Wait. Send a message home that this month is thin.',
        tag: 'yielding',
        outcome: 'They say of course, don\'t worry. The not-worrying is a thing they do for you and you both know it.',
        effect: (p) => { p.setMem('gulfWagesLate', true); p.m -= 7; p.r += 6; p.addFlag('gulf_waited_it_out') },
      },
    ],
    effect: null,
  },

  {
    id: 'gulf_world_cup_site',
    phase: null,
    weight: 55,
    when: (G) =>
      here(G) === 'Qatar' &&
      G.flags.includes('gulf_migrant_worker') &&
      G.currentYear >= 2012 && G.currentYear <= 2022 &&
      !G.mem?.gulfWorldCup,
    text: 'The country is building eight stadiums and a metro and a city that was not there, and you are in the middle of it with a hard hat and a number. The work is enormous and it is genuinely impressive and you are genuinely a part of it. Journalists come, occasionally, escorted; there is a debate somewhere far away about a figure for how many men have died and the figure has a wide range because nobody is obliged to count in a way that would settle it. In 2022 the tournament happens and it is on the television in the room and the room watches it, and the feeling in the room is complicated and mostly not bitter.',
    choices: null,
    effect: (p) => { p.setMem('gulfWorldCup', true); p.m += 2; p.r += 6; p.addFlag('gulf_built_the_tournament') },
  },

  {
    id: 'gulf_domestic_worker_inside',
    phase: null,
    weight: 55,
    when: (G) =>
      IS_GULF(G) && IS_MIGRANT(G) &&
      G.character?.gender === 'female' &&
      G.age >= 20 && G.age <= 45 &&
      G.currentYear >= 1985 &&
      !G.mem?.gulfDomestic,
    text: 'You live in the house. That is the arrangement and it is the whole difference: the men are in a camp with three hundred men and a bus, and you are in a room off the kitchen in a family\'s home, where the hours are not hours because there is no edge to them, and where whether your life is bearable depends entirely and unaccountably on what kind of people they turn out to be. Yours are not cruel. The mother is sharp and the grandmother is kind and the children are yours in the way that other people\'s children can be yours for eleven hours a day, and there is no law that any of this touches.',
    choices: [
      {
        text: 'Attach to the children. They are what the days are made of.',
        tag: 'yielding',
        outcome: 'The youngest calls you by a name that is not quite an aunt and not quite a title. She is eleven when you leave. You do not see her again.',
        effect: (p) => { p.setMem('gulfDomestic', true); p.m += 5; p.r += 8; p.addFlag('gulf_domestic_worker'); p.addFlag('gulf_raised_their_children') },
      },
      {
        text: 'Keep the line. You are staff, and staff go home eventually.',
        tag: 'defiant',
        outcome: 'It is a sound policy and it does not survive contact with a four-year-old, entirely, but you hold most of it.',
        effect: (p) => { p.setMem('gulfDomestic', true); p.m -= 2; p.r += 5; p.addFlag('gulf_domestic_worker') },
      },
    ],
    effect: null,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // THE CITIZEN LIFE — pearls, oil, and being eleven per cent
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'gulf_pearl_collapse',
    phase: null,
    weight: 80,
    when: (G) =>
      IS_GULF(G) && IS_CITIZEN(G) &&
      G.currentYear >= 1930 && G.currentYear <= 1948 &&
      G.age >= 6 && G.age <= 30 &&
      !G.mem?.gulfPearl,
    text: 'The diving season is the year: the boats go out for four months and the whole coast is arranged around them, the nakhoda and the divers and the haulers and the merchants who advance against the catch and own the season before it starts. Then the Japanese learn to grow pearls in an oyster on purpose, and the price of the thing your entire coast does falls through the floor and does not come back. What follows is not a downturn. Men who dived sell the boat, then the house, then leave for Bombay or Basra, and there are years here that people will later describe simply as the hunger, without elaborating.',
    choices: null,
    effect: (p) => {
      p.setMem('gulfPearl', true)
      p.m -= 10; p.h -= 5; p.wipeMoney(0.5)
      p.addFlag('gulf_pearl_generation')
    },
  },

  {
    id: 'gulf_oil_arrives',
    phase: null,
    weight: 70,
    when: (G) => {
      const OIL = { Bahrain: 1932, Kuwait: 1946, 'Saudi Arabia': 1946, Qatar: 1949, UAE: 1962, Oman: 1967 }
      const y = OIL[here(G)]
      return IS_GULF(G) && IS_CITIZEN(G) && y != null &&
        G.currentYear >= y && G.currentYear <= y + 12 &&
        G.age >= 10 && !G.mem?.gulfOil
    },
    text: (G) => here(G) === 'Bahrain'
      ? 'The company compound has electric light and a cinema and a hospital and a fence, and the wage inside it is a wage nobody on this island had a category for. Your uncle goes to work there and comes back with an opinion about how things are done that his father does not want to hear. It is the first of it, anywhere on this coast, and nobody yet understands the size of what has started.'
      : 'The first shipment goes out and the number in the newspaper means nothing to anybody because there is no scale to compare it to. What arrives first is not money, it is roads — a graded track where there was a camel route — and then a school, and then a clinic, and then a stipend that is explained to your father as a right rather than a wage. Within fifteen years the town will not be recognisable to a man who leaves now and comes back then.',
    choices: null,
    effect: (p) => {
      p.setMem('gulfOil', true)
      p.m += 6; p.w += 8; p.e += 3
      p.addFlag('gulf_watched_it_built'); p.addFlag('gulf_oil_generation')
    },
  },

  {
    id: 'gulf_citizen_the_arrangement',
    phase: null,
    weight: 45,
    when: (G) =>
      IS_GULF(G) && IS_CITIZEN(G) &&
      ['UAE', 'Qatar', 'Kuwait'].includes(here(G)) &&
      G.currentYear >= 1990 &&
      G.age >= 18 && G.age <= 40 &&
      !G.mem?.gulfArrangement,
    text: 'The man who built your parents\' house and the man who drives your grandmother to the clinic and the woman who has been in the kitchen since you were four are all here on a document that ties them to a person, and the person is, in two of those three cases, your father. It is the arrangement. Everybody you know lives inside it and almost nobody discusses it, and it is not a secret — it is written down, it is in the newspaper, the rules are published. The thing that is not discussed is not the fact. It is what you are supposed to feel about it.',
    choices: [
      {
        text: 'Feel nothing in particular. It is how the country works.',
        tag: 'yielding',
        outcome: 'This is the majority position and it is comfortable and it holds for years at a time, and then somebody from outside asks a direct question at a dinner.',
        effect: (p) => { p.setMem('gulfArrangement', true); p.r += 4; p.addFlag('gulf_citizen_minority'); p.addFlag('gulf_accepted_it') },
      },
      {
        text: 'Learn her name, her village, and how many children she has.',
        tag: 'defiant',
        outcome: 'It changes nothing structural and it changes the house. Your mother thinks it is odd and does it herself within a year.',
        effect: (p) => { p.setMem('gulfArrangement', true); p.karma += 8; p.r += 6; p.addFlag('gulf_citizen_minority'); p.addFlag('gulf_looked_at_it') },
      },
      {
        text: 'Say, in public, that it is indefensible.',
        tag: 'defiant',
        outcome: 'In an absolute monarchy that is not a debating position, it is a category of person. You are spoken to by somebody senior and the conversation is entirely courteous.',
        effect: (p) => {
          p.setMem('gulfArrangement', true)
          p.karma += 12; p.m -= 6; p.r += 5
          p.addFlag('gulf_citizen_minority'); p.addFlag('gulf_spoke_against_it'); p.addFlag('politically_aware')
        },
      },
    ],
    effect: null,
  },

  {
    id: 'gulf_kuwait_invasion',
    phase: null,
    weight: 999,
    when: (G) =>
      here(G) === 'Kuwait' &&
      G.currentYear === 1990 &&
      G.age >= 5 &&
      !G.mem?.gulfInvasion,
    text: 'The second of August. They are in the city before most people know it has started, and for seven months the country is a province of another country with a new name on the maps. Some leave in the first week on the road to Saudi Arabia and some cannot and some will not. The occupation is administered and it is also a looting: the museum, the hospitals, the cars, the wiring out of the walls. When it ends in February the sky is black at noon from six hundred burning wells and the rain that falls is oily and everybody remembers the particular smell for the rest of their life.',
    choices: [
      {
        text: 'Get out on the road south while it is still open.',
        tag: 'yielding',
        outcome: 'Four days, and the border, and a relative\'s floor in a city you had only visited. You come back in March to a house that has been lived in by strangers.',
        effect: (p) => {
          p.setMem('gulfInvasion', true)
          p.m -= 14; p.h -= 4; p.r += 8
          p.addFlag('kuwait_occupation'); p.addFlag('displaced'); p.addFlag('gulf_fled_1990')
        },
      },
      {
        text: 'Stay. This is your house and your street.',
        tag: 'defiant',
        outcome: 'Seven months of a very small life: the bread, the radio at low volume, the checkpoint at the end of the road manned by a conscript younger than your son.',
        effect: (p) => {
          p.setMem('gulfInvasion', true)
          p.m -= 16; p.h -= 7; p.r += 10
          p.addFlag('kuwait_occupation'); p.addFlag('gulf_stayed_1990')
        },
      },
    ],
    effect: null,
  },

  {
    id: 'gulf_kuwait_expulsion',
    phase: null,
    weight: 70,
    when: (G) =>
      here(G) === 'Kuwait' &&
      G.currentYear >= 1991 && G.currentYear <= 1993 &&
      (G.character?.ethnicity === 'other_arab_kuwait' || G.flags.includes('palestinian_family')) &&
      G.age >= 8 &&
      !G.mem?.gulfExpulsion,
    text: 'The PLO backed the invasion and you are a Palestinian family in Kuwait, and those two facts are now one fact and it is about you. There were nearly four hundred thousand of you here before August. There will be about thirty thousand after. The teachers, the engineers, the clerks, the second generation born in Hawalli who have never seen Palestine and speak with a Kuwaiti accent — the whole community is undone inside two years, and the world, having just spent six months on the subject of Kuwait, does not especially cover it.',
    choices: null,
    effect: (p) => {
      p.setMem('gulfExpulsion', true)
      p.m -= 16; p.r += 12; p.wipeMoney(0.8)
      p.addFlag('displaced'); p.addFlag('gulf_expelled_1991'); p.addFlag('refugee')
    },
  },

  {
    id: 'gulf_bahrain_roundabout',
    phase: null,
    weight: 999,
    when: (G) =>
      here(G) === 'Bahrain' &&
      G.currentYear === 2011 &&
      G.age >= 15 &&
      !G.mem?.gulfPearlRoundabout,
    text: (G) => G.character?.ethnicity === 'bahraini_shia'
      ? 'February. The roundabout with the pearl monument on it fills, and stays full, and for a few weeks it is the only place in the country where everything is sayable out loud. You are a Shia majority that has never governed and the demands are ordinary — a parliament with power, an end to the recruitment of the police from abroad, the villages getting what the suburbs get. In March the Peninsula Shield force crosses the causeway from Saudi Arabia. On the eighteenth they knock the monument down, so that there is nothing left for anyone to mean by it, and the roundabout is erased from the map and the banknote.'
      : 'February. The roundabout fills. You watch it from the other side of a division that everybody claims is not sectarian and that everybody can describe precisely. Some of what is being demanded is plainly reasonable and some of what is being said about your side is not, and both of those are true, and by March the Saudi armoured vehicles are on the causeway and the argument is over in the way arguments end when one side has armoured vehicles. They demolish the monument. You are surprised by how much that particular act bothers you.',
    choices: [
      {
        text: 'Go to the roundabout.',
        tag: 'defiant',
        outcome: 'You are there for eleven days. Afterwards there is a list, and being on it costs a job, a scholarship, or more, depending.',
        effect: (p) => {
          p.setMem('gulfPearlRoundabout', true)
          p.m -= 8; p.karma += 10; p.r += 6
          p.addFlag('bahrain_2011'); p.addFlag('gulf_was_at_the_roundabout'); p.addFlag('politically_aware')
        },
      },
      {
        text: 'Stay away and follow it hour by hour.',
        tag: 'yielding',
        outcome: 'Everybody knows somebody who went. The country afterwards is the same country with a different quantity of caution in it.',
        effect: (p) => {
          p.setMem('gulfPearlRoundabout', true)
          p.m -= 5; p.r += 7
          p.addFlag('bahrain_2011')
        },
      },
    ],
    effect: null,
  },

  {
    id: 'gulf_citizen_government_post',
    phase: null,
    weight: 36,
    when: (G) =>
      IS_GULF(G) && IS_CITIZEN(G) &&
      G.currentYear >= 1975 &&
      G.age >= 21 && G.age <= 32 &&
      !G.mem?.gulfPost,
    text: 'The ministry job arrives more or less the way weather arrives. There is an office, a title, a salary that is not connected in any legible way to the work, and colleagues in the same position who are excellent, or who are not, without much consequence either way. It is the citizenship dividend in its administrative form. Some men build a genuine career out of it and some men are on a boat by two and the system does not much distinguish between them, and deciding which you are going to be is a private matter that nobody will ever raise with you.',
    choices: [
      {
        text: 'Take it seriously. Be good at it on purpose.',
        tag: 'defiant',
        outcome: 'It turns out there is real work available to anyone who goes looking for it, and a quiet and fairly small group of people who have.',
        effect: (p) => { p.setMem('gulfPost', true); p.e += 5; p.w += 5; p.karma += 4; p.addFlag('gulf_made_it_a_career') },
      },
      {
        text: 'Take the salary and put your life elsewhere.',
        tag: 'yielding',
        outcome: 'The elsewhere is real — the family, the majlis, the farm, the boat — and it is a completely defensible way to spend a life, and you are occasionally uneasy about it at three in the morning.',
        effect: (p) => { p.setMem('gulfPost', true); p.w += 5; p.m += 3; p.r += 4; p.addFlag('gulf_took_the_stipend') },
      },
    ],
    effect: null,
  },

  {
    id: 'gulf_majlis',
    phase: null,
    weight: 30,
    when: (G) =>
      IS_GULF(G) && IS_CITIZEN(G) &&
      G.age >= 14 &&
      !G.mem?.gulfMajlis,
    text: 'The majlis is on a particular evening and the men of the family are there and so is anyone who wants something, and the two categories overlap. You sit at the end where the young sit and say nothing for about six years. What is transacted is a job, a marriage, a dispute about a wall, a word to somebody who knows somebody — the whole informal government of a place that also has a formal one. By the time you are allowed to speak you have absorbed the entire grammar of it without anybody ever explaining a rule.',
    choices: null,
    effect: (p) => { p.setMem('gulfMajlis', true); p.s += 5; p.e += 2; p.addFlag('gulf_majlis_raised') },
  },

  {
    id: 'gulf_two_cities_crossing',
    phase: null,
    weight: 28,
    isGlimpse: true,
    when: (G) =>
      IS_GULF(G) &&
      G.currentYear >= 1995 &&
      G.age >= 16 &&
      !G.mem?.gulfCrossing,
    text: (G) => IS_MIGRANT(G)
      ? 'At the lights a car stops beside the bus, close enough that you are looking down into it. A man about your age, in white, air conditioning, a child in the back on a screen. He is not looking up and there is no reason he would. You have been in this country nine years and you have never had a conversation with anybody from it that was not an instruction. The lights change. Both of you go on into two completely different cities that occupy the same road.'
      : 'At the lights a labour bus stops beside you, high enough that the men in it are looking down. They are going somewhere at an hour that has nothing to do with your hour. One of them meets your eye for a second, without any particular expression, and then the lights change. You have lived here your whole life and the number of those men you could name is a number you find, briefly, that you do not want to say out loud even to yourself.',
    choices: null,
    effect: (p) => { p.setMem('gulfCrossing', true); p.r += 4; p.addFlag('gulf_saw_the_other_city') },
  },


  // ══════════════════════════════════════════════════════════════════════════
  // LATE ECHOES. Each of the six `major` flags above needs an event and not
  // only a line of texture, because a major flag with no event is a thing the
  // life registered and never came back to.
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'gulf_pearl_the_thing_that_was_lost',
    phase: 'late_life',
    weight: 26,
    when: (G) =>
      G.flags.includes('gulf_pearl_generation') &&
      G.age >= 55 &&
      !G.mem?.gulfPearlLate,
    text: 'Somebody official comes to record the songs. There were songs for the hauling and songs for the drop and songs for the last day of the season, and they are being collected now because there are four men left who have them whole and you are one of the people who knows which four. The recording is respectful and well-funded and takes place in a building with air conditioning, and the whole apparatus of it is the proof that the thing is over. Your grandfather would have found the reverence baffling. In his account it was work, and badly paid, and it ruined his ears.',
    choices: null,
    effect: (p) => { p.setMem('gulfPearlLate', true); p.m += 3; p.r += 7; p.addFlag('gulf_pearl_remembered') },
  },

  {
    id: 'gulf_kuwait_the_year_after',
    phase: null,
    weight: 28,
    when: (G) =>
      G.flags.includes('kuwait_occupation') &&
      G.currentYear >= 1993 &&
      G.age >= 18 &&
      !G.mem?.gulfKuwaitAfter,
    text: 'The country is rebuilt quickly and thoroughly and with money, and what does not get rebuilt is the assumption. Before August, this was a place that had never had anything happen to it. Afterwards there is a category of person — the ones who stayed — and a quieter category of question about the ones who did not, and it is asked obliquely for about fifteen years at weddings. The wells were capped, the museum was partly returned, the wiring was replaced. The part that took longest was nothing physical.',
    choices: null,
    effect: (p) => { p.setMem('gulfKuwaitAfter', true); p.m -= 4; p.r += 7; p.addFlag('gulf_1990_never_settled') },
  },

  {
    id: 'gulf_bahrain_the_list',
    phase: null,
    weight: 30,
    when: (G) =>
      G.flags.includes('bahrain_2011') &&
      G.currentYear >= 2013 &&
      G.age >= 20 &&
      !G.mem?.gulfBahrainAfter,
    text: (G) => G.flags.includes('gulf_was_at_the_roundabout')
      ? 'The list is not published and it is entirely real. It costs a scholarship, or a post, or a licence, or a passport, depending on which list and how long you were there. Nobody ever tells you that you are on it; you find out by applying for something ordinary and receiving a decision with no reasons in it. You apply for three more things over the following years in order to test the shape of it, which is a strange hobby to have.'
      : 'The roundabout is a junction now and the monument is gone and the banknote was redesigned. What did not change is that everybody can tell you, of anybody, which side of it they were on, and that nobody says so directly, and that the whole country is fluent in a way of talking around it that a visitor cannot hear at all.',
    choices: null,
    effect: (p) => { p.setMem('gulfBahrainAfter', true); p.m -= 5; p.r += 7; p.addFlag('gulf_2011_aftermath') },
  },

  {
    id: 'gulf_expelled_the_second_country',
    phase: null,
    weight: 30,
    when: (G) =>
      G.flags.includes('gulf_expelled_1991') &&
      G.currentYear >= 1995 &&
      !G.mem?.gulfExpelledAfter,
    text: 'Jordan, mostly, or Gaza, or wherever the document allowed. You arrive in your third country as a person whose accent is from the second one and whose papers are about the first, and the schools do not take the qualifications and the engineers become drivers for a few years. Your children will be from here in a way you will not be, and they will ask about Kuwait as though it were a holiday, and you will find you cannot explain that it was simply the place where everything was, which is what a country is.',
    choices: null,
    effect: (p) => {
      p.setMem('gulfExpelledAfter', true)
      p.m -= 9; p.r += 9
      p.addFlag('gulf_third_country'); p.addFlag('first_generation_immigrant')
    },
  },

  {
    id: 'gulf_domestic_the_house_after',
    phase: null,
    weight: 30,
    when: (G) =>
      G.flags.includes('gulf_domestic_worker') &&
      G.age >= 44 &&
      !G.mem?.gulfDomesticAfter,
    text: 'The contract ends because the children are grown and a house with grown children does not need you. There is a payment, which is generous by the standards of what was owed and small by the standards of nineteen years. The mother, who was sharp for two decades, cries at the door and you are genuinely moved and you are also aware that you have no telephone number for anybody in this family and that none of them has asked for yours. You go home with a bag and a set of habits about other people\'s kitchens.',
    choices: [
      {
        text: 'Ask, at the door, for the youngest one\'s number.',
        tag: 'defiant',
        outcome: 'She gives it. It is used twice in the first year and once in the second, and then it is a number you have.',
        effect: (p) => { p.setMem('gulfDomesticAfter', true); p.m += 4; p.r += 6; p.addFlag('gulf_kept_the_number') },
      },
      {
        text: 'Take the payment and go.',
        tag: 'yielding',
        outcome: 'It was work. You had told yourself that the entire time and it was about two-thirds true, which is the part you carry.',
        effect: (p) => { p.setMem('gulfDomesticAfter', true); p.m -= 5; p.r += 8; p.addFlag('gulf_left_it_behind') },
      },
    ],
    effect: null,
  },

  {
    id: 'gulf_returned_the_young_man_leaving',
    phase: null,
    weight: 28,
    when: (G) =>
      G.flags.includes('gulf_returned') &&
      G.age >= 52 &&
      !G.mem?.gulfReturnedAdvice,
    text: 'A boy from the road is going. He is twenty-three and the agent has been to the house and the fee has been agreed against the land, and he has come to you because you are the man who went and came back with the house. He wants to know what it is like. You have about nine hours of true answer and he has the attention span of somebody who has already decided, and you know from your own twenty-three that nothing you say can be heard yet. So you tell him the practical things: drink before you are thirsty, keep the paper, do not be the one who asks.',
    choices: [
      {
        text: 'Tell him the true version anyway.',
        tag: 'defiant',
        outcome: 'He listens politely to a man who is old and has already had his turn, and goes in March.',
        effect: (p) => { p.setMem('gulfReturnedAdvice', true); p.karma += 6; p.r += 6; p.addFlag('gulf_told_the_next_one') },
      },
      {
        text: 'Tell him the practical things and let him go.',
        tag: 'yielding',
        outcome: 'It is the more useful conversation and you are not sure it is the honest one, and you think about it for a week.',
        effect: (p) => { p.setMem('gulfReturnedAdvice', true); p.r += 7; p.addFlag('gulf_gave_the_short_version') },
      },
    ],
    effect: null,
  },

]

export default GULF_EVENTS
