/**
 * src/data/exitRules.js — who could leave, who would be let in, and where
 * people from here actually went.
 *
 * The emigration panel used to be the whole roster in alphabetical order:
 * 153 rows, each printed with its internal archetype id ("post soviet",
 * "conflict zone") and the same moving cost, so a Yoruba farm hand in 1981 was
 * offered Croatia and Bosnia ten years before either existed, North Korea at
 * the same price as Ghana, and a free passage out of the Soviet Union for a
 * Russian in 1950. Every move also added five points of smarts, so ten moves
 * in one afternoon took a character to 100.
 *
 * Three questions, kept apart because they have different answers:
 *
 *   exitClosed(from, year, state)   could you leave at all? Exit was the
 *                                   state's to grant across a third of the
 *                                   twentieth century.
 *   entryRoute(state, dest)         would they let you in, and on what paper?
 *   destinationsFor(state)          where people from here went: the
 *                                   corridors, the old metropole, the
 *                                   neighbours, the Gulf.
 *
 * `EXIT_CLOSED` in src/data/events.js is the narrower family-departure rule
 * for events; this table is the one the player's own verb reads.
 */

import { COUNTRIES } from './countries.js'
import { SOVIET_REPUBLICS, WARSAW_PACT, COLONIAL_SCHOOL_LANGUAGE, conflictRiskAt } from './history.js'
import { migrationDestinations } from './migration.js'

const byName = new Map(COUNTRIES.map(c => [c.name, c]))
const nameOf = (c) => (typeof c === 'string' ? c : c?.name)

// ── Exit ─────────────────────────────────────────────────────────────────────

const SOVIET_EXIT = 'An exit visa is something you have heard of other people getting. Asking for one is a mark against you and against everyone at your address.'
const BLOC_EXIT = 'The passport is kept at the ministry, not at home. To leave you would need permission, and applying is itself a kind of confession.'

export const EXIT_CLOSED = [
  { countries: SOVIET_REPUBLICS, from: 1928, to: 1989, why: SOVIET_EXIT, federation: 'soviet' },
  { countries: WARSAW_PACT, from: 1948, to: 1989, why: BLOC_EXIT },
  { countries: ['North Korea'], from: 1948, to: 9999, why: 'There is no way out that is a way you could ask for.' },
  { countries: ['Albania'], from: 1945, to: 1990, why: 'The border is mined and watched, and the sea is watched too. Nobody leaves who is not sent.' },
  { countries: ['Cuba'], from: 1962, to: 2012, except: [1965, 1980, 1994], why: 'The exit permit is a separate document from the passport and nobody you know has been given one.' },
  { countries: ['China'], from: 1950, to: 1978, why: 'Going abroad is not a thing a person applies for. The work unit decides where you are, and it has decided.' },
  { countries: ['Mongolia'], from: 1924, to: 1990, why: BLOC_EXIT },
  { countries: ['Vietnam'], from: 1975, to: 1988, why: 'There is no legal way out. The ones who go, go by boat at night, and some of them arrive.' },
  { countries: ['Laos'], from: 1975, to: 1988, why: 'There is no legal way out. The ones who go, go across the river.' },
  { countries: ['Cambodia'], from: 1975, to: 1979, why: 'There are no passports, no offices, no post. There is the field and the cadre.' },
  { countries: ['Myanmar'], from: 1962, to: 1988, why: 'A passport is a favour, and it is not going to be done for you.' },
  { countries: ['Bhutan'], from: 0, to: 1974, why: 'The kingdom is closed in both directions. Nobody leaves as a household.' },
  { countries: ['Eritrea'], from: 1998, to: 9999, why: 'National service has no end date, and nobody under fifty is given an exit visa. The ones who leave walk.' },
  { countries: ['Turkmenistan'], from: 1992, to: 2002, why: 'An exit visa is needed and the list of people who are refused it is long and unpublished.' },
  { countries: ['Iraq'], from: 1980, to: 2003, why: 'There is an exit fee nobody can pay, and for anyone with a degree, a ban.' },
]

// Rules about who, rather than where.
const GENDERED_EXIT = [
  { country: 'Saudi Arabia', from: 0, to: 2019, why: 'Leaving needs a male guardian\'s signature on the form, and the man who would sign it will not.' },
  { country: 'Afghanistan', from: 1996, to: 2001, why: 'A woman cannot cross a district line without a mahram, let alone a border.' },
  { country: 'Afghanistan', from: 2021, to: 9999, why: 'A woman cannot travel any distance without a mahram, let alone cross a border.' },
]

/**
 * Could this person leave this country this year? Returns null when they
 * could, or the sentence that says why not.
 */
export function exitClosed(from, year, state = null) {
  const name = nameOf(from)
  for (const r of EXIT_CLOSED) {
    if (!r.countries.includes(name)) continue
    if (year < r.from || year > r.to) continue
    if (r.except?.includes(year)) continue
    return r.why
  }
  if (state?.character?.gender === 'female') {
    for (const r of GENDERED_EXIT) {
      if (r.country === name && year >= r.from && year <= r.to) return r.why
    }
  }
  return null
}

// ── Which countries existed to be moved to ───────────────────────────────────
//
// The roster carries the successor states as their own countries, which is
// right for a life born after the split and wrong for a destination before it.
// Before independence the federation is the destination, represented by one
// member and shown under the federation's own name.

const FEDERATION = {
  // member: [representative, until]
  Ukraine: ['Russia', 1991], Belarus: ['Russia', 1991], Moldova: ['Russia', 1991],
  Estonia: ['Russia', 1991], Latvia: ['Russia', 1991], Lithuania: ['Russia', 1991],
  Georgia: ['Russia', 1991], Armenia: ['Russia', 1991], Azerbaijan: ['Russia', 1991],
  Kazakhstan: ['Russia', 1991], Uzbekistan: ['Russia', 1991], Kyrgyzstan: ['Russia', 1991],
  Turkmenistan: ['Russia', 1991], Tajikistan: ['Russia', 1991],
  Croatia: ['Serbia', 1991], Slovenia: ['Serbia', 1991], 'Bosnia and Herzegovina': ['Serbia', 1992],
  Slovakia: ['Czech Republic', 1993],
  Eritrea: ['Ethiopia', 1993],
  Bangladesh: ['Pakistan', 1971],
  'East Timor': ['Indonesia', 2002],
  Namibia: ['South Africa', 1990],
}

// Never a place anybody could move to and be let in to stay.
const NOT_A_DESTINATION = new Set(['Palestine'])

/**
 * The country a move to `dest` in `year` actually reaches: the destination
 * itself, or the federation it was still part of. Null when it was not a
 * place to go at all.
 */
export function destinationThen(dest, year) {
  const name = nameOf(dest)
  if (NOT_A_DESTINATION.has(name)) return null
  if (name === 'Israel' && year < 1948) return null
  const fed = FEDERATION[name]
  if (fed && year < fed[1]) return fed[0]
  return name
}

/** Two places inside one federation that year: a move between them is internal. */
export function sameFederation(a, b, year) {
  const ra = destinationThen(a, year) ?? nameOf(a)
  const rb = destinationThen(b, year) ?? nameOf(b)
  return ra === rb
}

// ── Entry ────────────────────────────────────────────────────────────────────

const EU_FREE_MOVEMENT = {
  Belgium: 1968, France: 1968, Germany: 1968, Italy: 1968, Netherlands: 1968,
  'United Kingdom': 1973, Ireland: 1973, Denmark: 1973,
  Greece: 1988, Spain: 1992, Portugal: 1992,
  Austria: 1995, Sweden: 1995, Finland: 1995,
  'Czech Republic': 2004, Estonia: 2004, Hungary: 2004, Latvia: 2004, Lithuania: 2004,
  Poland: 2004, Slovakia: 2004, Slovenia: 2004, Cyprus: 2004,
  Romania: 2007, Bulgaria: 2007, Croatia: 2013,
}
const EU_LEFT = { 'United Kingdom': 2021 }
function inEu(name, year) {
  const from = EU_FREE_MOVEMENT[name]
  if (!from || year < from) return false
  return !(EU_LEFT[name] && year >= EU_LEFT[name])
}

const NORDIC = new Set(['Sweden', 'Norway', 'Denmark', 'Finland', 'Iceland'])

// The recruitment treaties of the Wirtschaftswunder, 1955-1973.
const GASTARBEITER = new Set(['Italy', 'Spain', 'Greece', 'Turkey', 'Portugal', 'Serbia', 'Croatia', 'Slovenia', 'Bosnia and Herzegovina', 'Morocco', 'Tunisia', 'South Korea'])

const GULF = new Set(['Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Bahrain', 'Oman'])
const GULF_OPEN = { 'Saudi Arabia': 1950, Kuwait: 1950, Bahrain: 1950, Qatar: 1960, UAE: 1968, Oman: 1972 }
// Where the Gulf recruited from once the oil price quadrupled.
const GULF_SENDING = new Set(['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Philippines', 'Indonesia', 'Egypt', 'Sudan', 'Yemen', 'Jordan', 'Palestine', 'Lebanon', 'Syria', 'Ethiopia', 'Kenya', 'Uganda', 'Eritrea', 'Somalia'])

const EUROPEAN_REGIONS = new Set(['Western Europe', 'Southern Europe', 'Northern Europe', 'Eastern Europe', 'Balkans', 'Southeast Europe', 'Eastern Europe / Central Asia'])
const AMERICAS = new Set(['North America', 'South America', 'Central America', 'Caribbean'])

// The countries whose immigration law was written to keep most of the world
// out until the 1960s and 70s: the 1924 quotas, the White Australia policy,
// Canada's preferred-country lists.
const RACIAL_QUOTA_UNTIL = { 'United States': 1965, Australia: 1973, Canada: 1962, 'New Zealand': 1987 }

// States that let almost nobody settle, whatever their exit rules.
const CLOSED_TO_SETTLERS = new Set(['North Korea', 'Japan', 'South Korea', 'Taiwan', 'China', 'Bhutan', 'Albania'])

const EDU_RANK = { none: 0, primary: 1, secondary: 2, vocational: 2, university: 3, graduate: 4 }

/**
 * What happens at the other end. `{ open, status, note }` — `status` is the
 * residency paper the character arrives on; `note` is one quiet line for the
 * panel. `open: false` means there was no door, not that it was expensive.
 */
export function entryRoute(state, dest) {
  const year = state.currentYear
  const destName = destinationThen(dest, year)
  if (!destName) return { open: false, note: 'There is no state there to let you in.' }
  const fromC = state.currentCountry ?? state.character?.country
  const from = nameOf(fromC)
  const birth = nameOf(state.character?.country)
  const fromRegion = byName.get(from)?.region ?? fromC?.region
  const eduRank = EDU_RANK[state.education?.level ?? 'none'] ?? 0
  const religion = state.religion ?? state.character?.religion ?? ''

  // Home is home.
  if (destName === destinationThen(birth, year) && state.residencyStatus !== 'citizen') {
    return { open: true, status: 'citizen', note: 'You go back on the passport you were born to.' }
  }
  if (destName === birth) return { open: true, status: 'citizen', note: 'You go back on the passport you were born to.' }

  // Inside one federation the move is a change of address, not a border.
  if (sameFederation(from, destName, year)) {
    return { open: true, status: state.residencyStatus ?? 'citizen', note: 'Inside one state. A residence permit, a queue, a stamp.' }
  }

  // Closed states take nobody in.
  if (exitClosed(destName, year) || CLOSED_TO_SETTLERS.has(destName)) {
    return { open: false, note: 'Nobody is let in to stay.' }
  }

  // Jewish return.
  if (destName === 'Israel') {
    if (/jewish/.test(religion)) return { open: true, status: 'citizen', note: 'The Law of Return. Citizenship at the airport.' }
    return { open: false, note: 'There is no route in for somebody who is not Jewish.' }
  }

  // The Gulf: a work visa and a sponsor, never anything more.
  if (GULF.has(destName)) {
    if (year < (GULF_OPEN[destName] ?? 1970)) return { open: false, note: 'There is no work there yet that brings people from outside.' }
    return { open: true, status: 'work_visa', note: 'A sponsor holds your visa. The job is the permission to be there.', recruited: GULF_SENDING.has(from) }
  }

  // Free movement.
  if (inEu(from, year) && inEu(destName, year)) return { open: true, status: 'permanent_resident', note: 'Free movement. An address and a form.' }
  if (NORDIC.has(from) && NORDIC.has(destName) && year >= 1954) return { open: true, status: 'permanent_resident', note: 'The Nordic passport union. No papers at all.' }
  if ((from === 'Ireland' && destName === 'United Kingdom') || (from === 'United Kingdom' && destName === 'Ireland')) {
    return { open: true, status: 'permanent_resident', note: 'The Common Travel Area. Nobody asks.' }
  }
  if ((from === 'Australia' && destName === 'New Zealand') || (from === 'New Zealand' && destName === 'Australia')) {
    return { open: true, status: 'permanent_resident', note: 'Across the Tasman nobody asks for a visa.' }
  }
  if (from === 'Puerto Rico' && destName === 'United States') return { open: true, status: 'citizen', note: 'You are already a citizen. The flight is the only paperwork.' }

  // Empire and its after-life.
  const metropole = metropoleOf(from)
  if (metropole === destName) {
    if (destName === 'United Kingdom') {
      if (year < 1962) return { open: true, status: 'permanent_resident', note: 'A British subject. The right to land and stay.' }
      if (year < 1973) return { open: true, status: 'work_visa', note: 'An employment voucher, if you have the trade they want.' }
    }
    if (destName === 'France' && year < 1974) return { open: true, status: 'work_visa', note: 'The factories are still recruiting from the old colonies.' }
    if (destName === 'Portugal' && year < 1981) return { open: true, status: 'permanent_resident', note: 'Portuguese nationality, for now.' }
    if (destName === 'Netherlands' && year < 1975) return { open: true, status: 'permanent_resident', note: 'Dutch nationality, for now.' }
  }

  // Recruitment and quota eras.
  if (destName === 'Germany' && GASTARBEITER.has(from) && year >= 1955 && year <= 1973) {
    return { open: true, status: 'work_visa', note: 'A recruitment office, a medical, a contract, a train.' }
  }
  if (destName === 'United Kingdom' && from === 'Australia' && year < 1973) return { open: true, status: 'permanent_resident', note: 'A Commonwealth passport. The right to stay.' }
  if (destName === 'Australia' && from === 'United Kingdom' && year >= 1945 && year <= 1982) return { open: true, status: 'permanent_resident', note: 'Assisted passage. Ten pounds and a hostel at the other end.', assisted: true }
  const quotaUntil = RACIAL_QUOTA_UNTIL[destName]
  if (quotaUntil && year < quotaUntil) {
    const european = EUROPEAN_REGIONS.has(fromRegion) || ['United States', 'Canada', 'Australia', 'New Zealand'].includes(from)
    const hemisphere = destName === 'United States' && AMERICAS.has(fromRegion)
    if (!european && !hemisphere && !(destName === 'United States' && from === 'Philippines' && year < 1946)) {
      return { open: false, note: 'The quota for people from where you are from is a number close to zero.' }
    }
  }

  // Asylum.
  const danger = conflictRiskAt(byName.get(from) ?? fromC, year) ?? 0
  if (year >= 1951 && danger >= 0.15 && byName.get(destName) && destRich(destName, year)) {
    return { open: true, status: 'asylum_seeker', note: 'You will ask for protection at the border and wait to be believed.' }
  }

  // Everyone else: a permit tied to a job. Without a degree the job is one
  // somebody already there found for you, and the permit is only as good as it.
  if (destRich(destName, year) && !destRich(from, year)) {
    if (eduRank >= 3) return { open: true, status: 'work_visa', note: 'A work visa, on the strength of the degree.' }
    return { open: true, status: 'work_visa', note: 'A work permit, for a job a cousin already there found you.', sponsored: true }
  }
  return { open: true, status: 'work_visa', note: 'A residence permit and a job to show for it.' }
}

function destRich(name, year) {
  const c = byName.get(name)
  if (!c) return false
  return ['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(c.archetype) && year >= 1950
}

/** Where the old empire was governed from. */
export function metropoleOf(name) {
  if (name === 'Philippines' || name === 'Puerto Rico') return 'United States'
  if (name === 'DR Congo' || name === 'Rwanda') return 'Belgium'
  const lang = COLONIAL_SCHOOL_LANGUAGE[name]
  return { English: 'United Kingdom', French: 'France', Portuguese: 'Portugal', Dutch: 'Netherlands', Italian: 'Italy', Spanish: 'Spain' }[lang] ?? null
}

// ── Where people went ────────────────────────────────────────────────────────

const GDP_ORDER = ['very_low', 'low', 'low_medium', 'medium', 'medium_high', 'high', 'very_high']
const SPANISH_AMERICA = new Set(['Mexico', 'Guatemala', 'El Salvador', 'Honduras', 'Nicaragua', 'Colombia', 'Venezuela', 'Ecuador', 'Peru', 'Bolivia', 'Chile', 'Argentina', 'Uruguay', 'Paraguay', 'Cuba', 'Dominican Republic'])

/**
 * The handful of places somebody from here, now, would actually think of.
 * Corridors first, then the old metropole, then the richer neighbours, then
 * the Gulf where the Gulf was recruiting. Home, if abroad. Never more than ten.
 */
export function destinationsFor(state) {
  const year = state.currentYear
  const from = nameOf(state.currentCountry ?? state.character?.country)
  const birth = nameOf(state.character?.country)
  const fromC = byName.get(from)
  const out = []
  const add = (n) => {
    const d = destinationThen(n, year)
    if (!d || d === destinationThen(from, year) || out.includes(d) || !byName.get(d)) return
    out.push(d)
  }
  if (birth !== from) add(birth)
  for (const n of migrationDestinations(fromC ?? from)) add(n)
  const metro = metropoleOf(from)
  if (metro) add(metro)
  if (SPANISH_AMERICA.has(from)) add('Spain')
  if (GULF_SENDING.has(from) && year >= 1973) for (const g of ['Saudi Arabia', 'UAE', 'Kuwait']) add(g)
  // The neighbours, richest first.
  const region = fromC?.region
  const neighbours = COUNTRIES
    .filter(c => c.region === region && c.name !== from)
    .sort((a, b) => GDP_ORDER.indexOf(b.gdp) - GDP_ORDER.indexOf(a.gdp))
  for (const c of neighbours.slice(0, 3)) add(c.name)
  return out.slice(0, 10)
}

// ── What it costs to get there ───────────────────────────────────────────────

const CONTINENT = {
  'North America': 'americas', 'South America': 'americas', 'Central America': 'americas', Caribbean: 'americas',
  'Western Europe': 'europe', 'Southern Europe': 'europe', 'Northern Europe': 'europe', 'Eastern Europe': 'europe',
  Balkans: 'europe', 'Southeast Europe': 'europe', 'Eastern Europe / Central Asia': 'europe', 'Middle East / Europe': 'europe',
  Caucasus: 'asia', 'Central Asia': 'asia', 'East Asia': 'asia', 'Southeast Asia': 'asia', 'South Asia': 'asia',
  'Middle East': 'mideast', 'North Africa': 'mideast',
  'West Africa': 'africa', 'East Africa': 'africa', 'Central Africa': 'africa', 'Southern Africa': 'africa', 'Sub-Saharan Africa': 'africa',
  Oceania: 'oceania', Pacific: 'oceania', 'Indian Ocean': 'asia',
}

/**
 * The journey, in present-day dollars, and how it was made. The panel and the
 * charge both read this; it is deterministic so that the number shown is the
 * number taken. `priceClass` says whether it is priced like local goods (a bus
 * across a border) or like a world good (a ticket on a ship or a plane).
 */
export function routeCost(fromName, destName, year, route = {}) {
  const a = byName.get(fromName)?.region
  const b = byName.get(destName)?.region
  let base, how, priceClass
  if (a && a === b) { base = 350; how = 'overland'; priceClass = 'local' }
  else if (CONTINENT[a] && CONTINENT[a] === CONTINENT[b]) { base = 1200; how = year < 1960 ? 'by rail and road' : 'overland or a short flight'; priceClass = 'imported' }
  else { base = year < 1960 ? 3200 : year < 1975 ? 2600 : 1600; how = year < 1960 ? 'by sea' : 'by air'; priceClass = 'imported' }
  // The fee that is not the fare: a recruiting agent, a smuggler, a lawyer.
  if (route.recruited) base += 1800
  if (route.sponsored) base += 600
  if (route.status === 'asylum_seeker') base += 2500
  if (route.assisted) base = 150
  return { base, how, priceClass }
}
