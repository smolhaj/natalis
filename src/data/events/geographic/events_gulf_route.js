// events_gulf_route.js — the ticket, and the country at the other end of it.
//
// `events_gulf.js` was written to close the worst-covered archetype in the
// roster, and it addressed the migrant life from inside: the passport into the
// bag at the airport, the shelf that is your whole private property, the house
// you built and have only seen in photographs. A beta read found all seven of
// its firings had gone to characters BORN in the Gulf — a Qatari-born man whose
// father is an engineer and whose mother is a doctor was told he had just
// landed at the airport, and four years later that he had been in the country
// nine years.
//
// The cause is not the guard. `IS_MIGRANT` reads ethnicity, and the engine
// draws ethnicity from the BIRTH country's own `ethnicGroups` — so every
// `south_asian_qatar` character in the game is born in Doha by construction,
// and the arriving life the module was written for is a population the engine
// could not produce. Writing the arrival for somebody who never arrived is the
// same defect as narrating a move that moves nobody, one layer further back:
// the event was right and there was no one for it to be right about.
//
// This module is the missing half — the sending side, which puts a real person
// on a real plane with `p.emigrateTo`. The Gulf arrival arc now requires
// `gulf_arrived`, and the Gulf-born second generation gets its own writing in
// events_gulf.js rather than somebody else's.
//
// Dates and shares, checked: the Gulf labour boom follows the 1973 oil price
// rise, so the corridors open in the mid-1970s and Kerala's remittance economy
// dates from then. Bangladesh's Bureau of Manpower opens in 1976. The
// Philippines' Overseas Employment Development Board is 1974 and the country
// has sent over a million workers a year since the 2000s, close to half of
// them to Saudi Arabia and the UAE. Nepal's corridor is later — the Foreign
// Employment Act is 1985 but the volume arrives after 2000, once the Maoist
// war closes the alternatives. Sri Lanka's flow is unusual in being majority
// female for most of the 1990s, almost all of it domestic work. Egypt's is
// older and different in kind: teachers and clerks to Iraq, Libya and the Gulf
// from the mid-1970s, and a large share of it returns.

const CORRIDORS = {
  India:       { from: 1974, dests: ['United Arab Emirates', 'United Arab Emirates', 'Saudi Arabia', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain'] },
  Pakistan:    { from: 1975, dests: ['Saudi Arabia', 'Saudi Arabia', 'United Arab Emirates', 'United Arab Emirates', 'Oman', 'Qatar'] },
  Bangladesh:  { from: 1976, dests: ['Saudi Arabia', 'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Oman'] },
  Philippines: { from: 1975, dests: ['Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Bahrain'] },
  'Sri Lanka': { from: 1980, dests: ['Saudi Arabia', 'Saudi Arabia', 'Kuwait', 'United Arab Emirates', 'Qatar'] },
  Egypt:       { from: 1974, dests: ['Saudi Arabia', 'Kuwait', 'United Arab Emirates', 'Qatar'] },
  Nepal:       { from: 1995, dests: ['Qatar', 'Qatar', 'Saudi Arabia', 'Saudi Arabia', 'United Arab Emirates', 'Kuwait'] },
  Indonesia:   { from: 1985, dests: ['Saudi Arabia', 'Saudi Arabia', 'United Arab Emirates'] },
  Ethiopia:    { from: 2000, dests: ['Saudi Arabia', 'Saudi Arabia', 'Kuwait', 'United Arab Emirates'] },
  Kenya:       { from: 2005, dests: ['Saudi Arabia', 'Qatar', 'United Arab Emirates'] },
}

const corridor = (G) => CORRIDORS[G.character?.country?.name]
const pickDest = (c) => c.dests[Math.floor(Math.random() * c.dests.length)]

// The fee is the whole of it. A Bangladeshi worker in the 2010s paid the
// highest recruitment costs in the world — commonly three to four thousand
// dollars against a wage of two hundred a month — and borrowed it against land.
// Nepal and India are lower and still most of a year's earnings.
const FEE = { Bangladesh: 3400, Nepal: 1400, India: 1200, Pakistan: 1800, 'Sri Lanka': 700, Philippines: 1500, Egypt: 900, Indonesia: 900, Ethiopia: 500, Kenya: 900 }

const eligible = (G) => {
  const c = corridor(G)
  if (!c) return false
  if (G.currentYear < c.from || G.currentYear > 2026) return false
  if (G.currentCountry?.name !== G.character?.country?.name) return false
  if (G.flags.includes('gulf_arrived')) return false
  if (G.age < 18 || G.age > 38) return false
  return (G.wealthTier ?? 3) <= 3
}

export const GULF_ROUTE_EVENTS = [

  // ── THE DECISION ───────────────────────────────────────────────────────────

  {
    id: 'gulfr_the_agent',
    phase: null,
    weight: 26,
    when: (G) => eligible(G) && G.character?.gender === 'male' && !G.mem?.gulfrAgent,
    text: (G) => {
      const fee = FEE[G.character.country.name] ?? 1200
      const where = G.character.country.name === 'Philippines' ? 'the agency in the city' : 'the agent'
      return `There is a room above a shop where ${where} sits, and a laminated folder of photographs of buildings that do not exist yet. Two years, he says, and the figure he says per month is four or five times what you can earn here, and both of those numbers are true. The fee is about $${fee.toLocaleString()} and you do not have it and nobody has ever had it — you borrow it against the land, or against your father's name, which is the same thing. Three men from this street have gone. One of them sent back enough to roof his mother's house and one of them has not been heard from in a while and the third is standing right there telling you to go.`
    },
    choices: [
      {
        text: 'Sign. The arithmetic is not complicated.',
        tag: null,
        outcome: 'The medical is in a room with forty other men in their underwear. The flight is at two in the morning, which you will later learn is when all of these flights are.',
        effect: (p) => {
          const c = CORRIDORS[p._state?.character?.country?.name]
          p.setMem('gulfrAgent', true)
          p.addDebt(FEE[p._state?.character?.country?.name] ?? 1200)
          p.m -= 4; p.r += 5
          p.addFlag('gulf_arrived'); p.addFlag('gulf_recruitment_debt'); p.addFlag('kafala_worker')
          if (c) p.emigrateTo(pickDest(c), { residency: 'work_visa', tier: 'informal' })
        },
      },
      {
        text: 'Not with money borrowed against the land.',
        tag: null,
        outcome: 'You stay. Over the next fifteen years you watch the street rebuild itself one roof at a time, and every one of those roofs was paid for from somewhere else.',
        effect: (p) => { p.setMem('gulfrAgent', true); p.m -= 3; p.r += 4; p.addFlag('stayed_behind'); p.addFlag('the_ones_who_stayed') },
      },
    ],
    effect: null,
  },

  {
    id: 'gulfr_the_agency_women',
    phase: null,
    weight: 22,
    when: (G) =>
      eligible(G) && G.character?.gender === 'female' && !G.mem?.gulfrAgency &&
      ['Sri Lanka', 'Philippines', 'Indonesia', 'Ethiopia', 'Nepal', 'Kenya'].includes(G.character?.country?.name),
    text: (G) => `The recruiter is a woman, which is how it is done for this, and she is from two villages over and has done it herself. Housemaid. A family, a room, a contract in a language you will sign anyway. Your mother is against it and your mother has also seen what the money does. What she says, in the end, is not don't go. What she says is find out the name of the family before you get on the plane, and write it down, and give the paper to me.`,
    choices: [
      {
        text: 'Go. Two years, and then the decision is yours again.',
        tag: null,
        outcome: 'You write the name on the back of a receipt. The two years is a number in a contract and not a number that anybody in this transaction treats as binding.',
        effect: (p) => {
          const c = CORRIDORS[p._state?.character?.country?.name]
          p.setMem('gulfrAgency', true)
          p.m -= 5; p.r += 6
          p.addFlag('gulf_arrived'); p.addFlag('gulf_domestic_route'); p.addFlag('kafala_worker')
          if (c) p.emigrateTo(pickDest(c), { residency: 'work_visa', tier: 'middle_class' })
        },
      },
      {
        text: 'Your mother is right.',
        tag: null,
        outcome: 'You do not go. The woman two villages over comes back in six years and will not talk about it, and you think about that for a long time afterwards.',
        effect: (p) => { p.setMem('gulfrAgency', true); p.m -= 2; p.r += 5; p.addFlag('stayed_behind') },
      },
    ],
    effect: null,
  },

  {
    id: 'gulfr_egypt_teachers',
    phase: null,
    weight: 24,
    when: (G) =>
      eligible(G) && G.character?.country?.name === 'Egypt' && !G.mem?.gulfrEgypt &&
      G.currentYear >= 1974 && G.currentYear <= 2000 &&
      ['education', 'healthcare', 'government', 'engineering', 'law'].includes(G.career?.field ?? ''),
    text: 'Half the staff room has gone. Not to Europe — to Riyadh, to Kuwait, to Baghdad while Baghdad was still paying, on two-year contracts that pay in a month what the ministry pays in five. The ones who come back build a floor onto the family building and buy a Peugeot and are slightly different people. The ones who do not come back send for the family in the third year. Your headmaster does not try to talk you out of it, which is its own kind of answer.',
    choices: [
      {
        text: 'Take the contract.',
        tag: null,
        outcome: 'You teach the same subject in a building with air conditioning, to children whose fathers your own country trained, and you send home more in a year than your father earned in ten.',
        effect: (p) => {
          const c = CORRIDORS.Egypt
          p.setMem('gulfrEgypt', true)
          p.mo += 3000; p.m += 3; p.r += 4
          p.addFlag('gulf_arrived'); p.addFlag('gulf_professional_expat')
          p.emigrateTo(pickDest(c), { residency: 'work_visa', tier: 'middle_class' })
        },
      },
      {
        text: 'Stay. Somebody has to teach here.',
        tag: null,
        outcome: 'The class sizes go up every year and the salary does not, and you are still the person who stayed, which is worth something you cannot spend.',
        effect: (p) => { p.setMem('gulfrEgypt', true); p.karma += 6; p.r += 4; p.addFlag('stayed_behind') },
      },
    ],
    effect: null,
  },

  // ── AND WHAT IT LEAVES BEHIND ──────────────────────────────────────────────

  {
    id: 'gulfr_stayed_and_watched',
    phase: null,
    weight: 12,
    when: (G) =>
      G.flags.includes('stayed_behind') && !G.mem?.gulfrStayedLate &&
      G.age >= 45 && corridor(G) != null,
    text: 'The street is roofed now, almost all of it, and the houses have the particular look of houses built in instalments by somebody who was not present for any of it — a floor at a time, over eleven years, decided by telephone. The men who built them this way are mostly back and mostly have something wrong with a knee or a lung. You did not go, and you have your whole family and your whole life in one country, and on the worst days you could not tell anybody which of those two facts is the achievement.',
    choices: null,
    effect: (p) => { p.setMem('gulfrStayedLate', true); p.r += 5; p.m -= 2; p.addFlag('stayed_reckoning') },
  },

  {
    id: 'gulfr_the_body_comes_back',
    phase: null,
    weight: 14,
    when: (G) =>
      corridor(G) != null && !G.mem?.gulfrBody &&
      G.currentYear >= 1990 && G.age >= 20 && G.age <= 70 &&
      G.currentCountry?.name === G.character?.country?.name,
    text: 'The coffin comes off the same flight the workers go out on, which is the detail nobody who has not stood at that airport knows. The certificate says cardiac arrest, which is what the certificate says. He was thirty-four and he had been doing outdoor work in a place where the summer is a thing you survive rather than a season. The family is paid something by somebody. The village is at the house for three days and the thing nobody says out loud is that four more men from here are going in the spring.',
    choices: null,
    effect: (p) => { p.setMem('gulfrBody', true); p.m -= 9; p.r += 6; p.addFlag('knows_a_migration_death') },
  },

]
