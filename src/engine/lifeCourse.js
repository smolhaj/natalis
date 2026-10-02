/**
 * src/engine/lifeCourse.js
 *
 * The ordinary events of a life, supplied without being chosen.
 *
 * Work, a partner, a marriage, children, retirement — every one of these was a
 * button in a panel and nothing else. A life that nobody steered therefore
 * reached sixty-five having never held a job, never married and never had a
 * child: measured over 150 unsteered lives, 7% ever had a career, 4% ever had a
 * partner, 0% ever married, 1% ever had children. The prose layer fired
 * beautifully over a life in which nothing had happened.
 *
 * That is not only an empty life, it starves the corpus. The `earned` register —
 * roughly a third of every year's events — keys off exactly these fields, and
 * the entire follow-through layer is written about a partner, a child, a job.
 * None of it can reach a character who has none.
 *
 * So the life course runs as a background process. Real people do not decide to
 * have a life; they mostly have one, and the decisions are the exceptions. This
 * module supplies the default, and it steps aside the moment the player acts:
 * every hook here only fires into an empty slot.
 *
 * THE NUMBERS ARE THE POINT. A life simulation whose demography is generic is
 * a stats game with prose on top. When a woman born in Lagos in 1962 marries,
 * she should marry at the age Nigerian women actually married, for reasons
 * legible in the data the game already holds about her country: how many women
 * there could read, how urban it was, what the fertility rate was that decade.
 * The tables below are anchored to the historical record and interpolated
 * between anchor years, then modulated by the character's own circumstances.
 */

import { PROPERTY_TYPES, localisePrice } from '../data/assets'
import { inEraMoney } from '../data/economy.js'
import { institutionExists, divorceLegalFor } from '../data/history.js'
import { generatePartnerProfile, getMarried, retire, tryForChild } from './playerActions'
import { enterCareer, getAvailableCareers, liveCountry } from './tick'
import { livingRuralUrban, childNameCountry } from './character'
import { preferUnsaid, rememberSaid, hasSaid } from './prose'
import { pickUnusedName, namesInUse } from './names'
import { gulfNonNational } from '../data/migration.js'
import { EVENTS } from '../data/events'

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const chance = p => Math.random() < p
const pick = arr => arr[Math.floor(Math.random() * arr.length)]

/** Linear interpolation across a { year: value } anchor table, flat outside it. */
function overTime(anchors, year) {
  const years = Object.keys(anchors).map(Number).sort((a, b) => a - b)
  if (year <= years[0]) return anchors[years[0]]
  if (year >= years[years.length - 1]) return anchors[years[years.length - 1]]
  for (let i = 0; i < years.length - 1; i++) {
    const [a, b] = [years[i], years[i + 1]]
    if (year >= a && year <= b) {
      const t = (year - a) / (b - a)
      return anchors[a] + t * (anchors[b] - anchors[a])
    }
  }
  return anchors[years[years.length - 1]]
}

// ─── Female labour force participation ───────────────────────────────────────
// Share of working-age women in the labour force. The regional spread here is
// larger than almost any other demographic fact and it is routinely got wrong:
// participation in sub-Saharan Africa has been near 60% for the whole period
// (women farm and trade), while the Gulf started near 5%. A 1955 West German
// housewife and a 1955 Ghanaian market trader are not the same life.

const FLFP_BY_ARCHETYPE = {
  subsaharan:          { 1900: 0.60, 1950: 0.62, 1980: 0.63, 2000: 0.63, 2020: 0.62 },
  wealthy_west:        { 1900: 0.22, 1950: 0.32, 1980: 0.50, 2000: 0.60, 2020: 0.67 },
  wealthy_east:        { 1900: 0.45, 1950: 0.48, 1980: 0.50, 2000: 0.51, 2020: 0.56 },
  post_soviet:         { 1900: 0.30, 1950: 0.60, 1980: 0.72, 2000: 0.58, 2020: 0.56 },
  developing_urban:    { 1900: 0.22, 1950: 0.25, 1980: 0.35, 2000: 0.48, 2020: 0.54 },
  developing_unstable: { 1900: 0.28, 1950: 0.30, 1980: 0.33, 2000: 0.36, 2020: 0.41 },
  wealthy_gulf:        { 1900: 0.05, 1950: 0.07, 1980: 0.12, 2000: 0.20, 2020: 0.30 },
  conflict_zone:       { 1900: 0.20, 1950: 0.21, 1980: 0.23, 2000: 0.26, 2020: 0.29 },
}

/**
 * How likely a woman here and now is to be in paid work at all.
 * The archetype sets the shape; the country's own female literacy relative to
 * male literacy moves it, because the two track each other closely and the game
 * already carries literacy per country.
 */
export function femaleWorkChance(country, year) {
  const base = overTime(FLFP_BY_ARCHETYPE[country?.archetype] ?? FLFP_BY_ARCHETYPE.developing_urban, year)
  const lf = country?.literacyFemale
  const lm = country?.literacyMale
  if (typeof lf !== 'number' || typeof lm !== 'number' || lm <= 0) return clamp(base, 0.03, 0.85)
  // A literacy gap is the most legible marker of how much of public life is
  // closed to women; parity leaves the archetype base alone.
  const ratio = clamp(lf / lm, 0.3, 1.0)
  return clamp(base * (0.55 + 0.45 * (ratio / 1.0) * (1 / 0.775)), 0.03, 0.85)
}

// ─── Age at first work ───────────────────────────────────────────────────────
// Not a policy question — a subsistence question. Where the household needs the
// labour, children work; where it does not, adolescence is extended and the
// first job waits for the end of schooling.

const WORK_AGE_BY_GDP = {
  very_low:   11,
  low:        12,
  low_medium: 14,
  medium:     16,
  medium_high: 17,
  high:       18,
  very_high:  18,
}

export function workEntryAge(state) {
  const c = liveCountry(state)
  let age = WORK_AGE_BY_GDP[c?.gdp] ?? 16
  // Rural households put children to work earlier and more universally.
  const urban = c?.urbanRate ?? 0.5
  age += urban > 0.6 ? 1 : urban < 0.3 ? -1 : 0
  // Compulsory schooling arrives late and unevenly; before it, work starts young
  // everywhere, including in what are now rich countries.
  if (state.currentYear < 1930) age -= 2
  else if (state.currentYear < 1960) age -= 1
  if (state.flags?.includes('child_labor')) age = Math.min(age, 10)
  const edu = state.education?.level
  if (edu === 'university') age = Math.max(age, 22)
  else if (edu === 'graduate') age = Math.max(age, 25)
  else if (edu === 'secondary') age = Math.max(age, 18)
  return clamp(age, 8, 27)
}

// ─── Age at first marriage ───────────────────────────────────────────────────
// Women's median age at first marriage, by archetype and year. Men marry later
// almost everywhere, and the gap itself is regional: two years in Scandinavia,
// six or more in the Sahel and the Gulf.

const MARRIAGE_AGE_BY_ARCHETYPE = {
  subsaharan:          { 1900: 17.0, 1950: 18.0, 1980: 19.0, 2000: 20.0, 2020: 21.0 },
  developing_unstable: { 1900: 17.0, 1950: 18.0, 1980: 19.5, 2000: 20.5, 2020: 21.5 },
  conflict_zone:       { 1900: 17.0, 1950: 18.0, 1980: 19.0, 2000: 20.0, 2020: 21.0 },
  developing_urban:    { 1900: 19.0, 1950: 20.0, 1980: 21.5, 2000: 23.0, 2020: 24.5 },
  wealthy_gulf:        { 1900: 16.5, 1950: 18.0, 1980: 20.0, 2000: 23.0, 2020: 25.0 },
  post_soviet:         { 1900: 20.5, 1950: 21.5, 1980: 22.0, 2000: 23.0, 2020: 25.5 },
  wealthy_east:        { 1900: 20.0, 1950: 23.0, 1980: 25.0, 2000: 27.5, 2020: 29.5 },
  wealthy_west:        { 1900: 22.5, 1950: 21.5, 1980: 23.0, 2000: 27.0, 2020: 30.5 },
}

const MALE_MARRIAGE_GAP = {
  subsaharan: 6.0, developing_unstable: 5.0, conflict_zone: 5.0, wealthy_gulf: 5.5,
  developing_urban: 3.5, post_soviet: 2.5, wealthy_east: 2.5, wealthy_west: 2.0,
}

export function marriageAge(state) {
  const c = liveCountry(state)
  const arch = c?.archetype ?? 'developing_urban'
  let age = overTime(MARRIAGE_AGE_BY_ARCHETYPE[arch] ?? MARRIAGE_AGE_BY_ARCHETYPE.developing_urban, state.currentYear)
  if (state.character?.gender === 'male') age += MALE_MARRIAGE_GAP[arch] ?? 3
  // Cities delay marriage; the countryside does not. Kept small deliberately:
  // the tables above are population medians that ALREADY contain the country's
  // urban share and its schooling, so a full-sized modifier here counts both
  // twice and pushes every median marriage years late.
  age += (c?.urbanRate ?? 0.5) > 0.6 ? 0.8 : (c?.urbanRate ?? 0.5) < 0.3 ? -0.5 : 0
  const edu = state.education?.level
  if (edu === 'graduate') age += 1.8
  else if (edu === 'university') age += 1.2
  else if (edu === 'secondary') age += 0.4
  // Female literacy is the strongest single predictor of when a society marries,
  // and it separates places the archetype tables lump together: India at 0.54
  // and Brazil at 0.82 are both `developing_urban` and marry four years apart.
  // One-sided on purpose. Low female literacy pulls marriage earlier; high
  // female literacy does not push it later, because the archetypes where
  // literacy is near-universal were calibrated on exactly those populations and
  // adding the effect again puts every rich-world marriage a year or two late.
  const litF = c?.literacyFemale
  if (typeof litF === 'number') age += Math.min(0, (litF - 0.85) * 7)
  // Where early marriage is common, it is common for the girls specifically.
  const cmr = c?.childMarriageRisk ?? 0
  if (state.character?.gender === 'female' && cmr > 0) age -= cmr * 12
  return clamp(age, 15, 38)
}

// ─── Fertility ───────────────────────────────────────────────────────────────
// Total fertility rate: children per woman over a lifetime. The single number
// that most separates one era's life from another's — six children and four
// funerals in 1950s Kano, one child at thirty-four in 2010s Kyoto.

const TFR_BY_ARCHETYPE = {
  subsaharan:          { 1900: 6.3, 1950: 6.6, 1980: 6.7, 2000: 5.8, 2020: 4.6, 2050: 3.4 },
  conflict_zone:       { 1900: 6.5, 1950: 7.0, 1980: 6.8, 2000: 5.4, 2020: 4.1, 2050: 3.0 },
  developing_unstable: { 1900: 6.2, 1950: 6.5, 1980: 6.2, 2000: 4.8, 2020: 3.6, 2050: 2.7 },
  wealthy_gulf:        { 1900: 6.8, 1950: 7.0, 1980: 6.5, 2000: 3.6, 2020: 2.2, 2050: 1.8 },
  developing_urban:    { 1900: 5.8, 1950: 6.0, 1980: 4.4, 2000: 2.8, 2020: 2.1, 2050: 1.8 },
  post_soviet:         { 1900: 5.5, 1950: 2.9, 1980: 2.3, 2000: 1.4, 2020: 1.6, 2050: 1.6 },
  wealthy_east:        { 1900: 5.0, 1950: 3.3, 1980: 1.9, 2000: 1.4, 2020: 1.2, 2050: 1.2 },
  wealthy_west:        { 1900: 4.2, 1950: 2.9, 1980: 1.8, 2000: 1.7, 2020: 1.5, 2050: 1.5 },
}

// Countries whose fertility history diverges sharply from their archetype's.
// Egypt and Brazil are both `developing_urban`, and their fertility rates are a
// full child apart: the Middle Eastern plateau is real and the archetype cannot
// see it. Female literacy does not separate them either — India has LOWER female
// literacy than Egypt and lower fertility — so this is named directly rather
// than derived from a proxy that gets the ordering wrong.
const TFR_BY_COUNTRY = {
  Egypt:        { 1950: 6.6, 1980: 5.4, 2000: 3.5, 2020: 3.3, 2050: 2.5 },
  Algeria:      { 1950: 7.4, 1980: 6.7, 2000: 2.6, 2020: 3.0, 2050: 2.3 },
  Jordan:       { 1950: 7.4, 1980: 6.8, 2000: 4.0, 2020: 2.9, 2050: 2.2 },
  Iraq:         { 1950: 7.3, 1980: 6.5, 2000: 4.9, 2020: 3.6, 2050: 2.6 },
  Pakistan:     { 1950: 6.6, 1980: 6.9, 2000: 4.5, 2020: 3.6, 2050: 2.5 },
  Israel:       { 1950: 4.3, 1980: 3.1, 2000: 2.9, 2020: 3.0, 2050: 2.6 },
  Philippines:  { 1950: 7.3, 1980: 5.2, 2000: 3.8, 2020: 2.7, 2050: 2.0 },
  Iran:         { 1950: 6.9, 1980: 6.5, 2000: 2.2, 2020: 1.7, 2050: 1.6 },
  China:        { 1950: 6.1, 1970: 5.5, 1980: 2.7, 2000: 1.6, 2020: 1.2, 2050: 1.2 },
  Thailand:     { 1950: 6.1, 1980: 3.4, 2000: 1.7, 2020: 1.3, 2050: 1.3 },
}

export function totalFertility(state) {
  const c = liveCountry(state)
  const named = TFR_BY_COUNTRY[c?.name]
  let tfr = named
    ? overTime(named, state.currentYear)
    : overTime(TFR_BY_ARCHETYPE[c?.archetype] ?? TFR_BY_ARCHETYPE.developing_urban, state.currentYear)
  // The urban-rural fertility gap is large and persistent everywhere.
  const urban = c?.urbanRate ?? 0.5
  tfr *= urban > 0.6 ? 0.92 : urban < 0.3 ? 1.10 : 1.0
  // Educated women have fewer children, in every country, in every decade —
  // but the archetype rate is already a national average containing them, so
  // this is a nudge off that average, not the whole effect over again.
  const edu = state.education?.level
  if (edu === 'graduate' || edu === 'university') tfr *= 0.85
  else if (edu === 'secondary') tfr *= 0.95
  return clamp(tfr, 0.9, 8)
}

// ─── Retirement ──────────────────────────────────────────────────────────────
// Retirement is an institution, not an age. It requires a pension system and a
// formal job to have been inside. A smallholder does not retire; the work
// narrows until someone else is doing it.

const PENSION_ERA = {
  wealthy_west: 1935, post_soviet: 1936, wealthy_east: 1955, wealthy_gulf: 1975,
  developing_urban: 1970, developing_unstable: 1990, subsaharan: 1995, conflict_zone: 2010,
}

const INFORMAL_FIELDS = new Set(['agriculture', 'trade', 'casual', 'arts', 'writing'])

export function retirementAge(state) {
  const c = liveCountry(state)
  if (!state.career) return null
  const era = PENSION_ERA[c?.archetype] ?? 1980
  if (state.currentYear < era) return null
  // A pension you are inside, rather than one that exists on paper somewhere.
  const poor = ['very_low', 'low'].includes(c?.gdp)
  if (poor && INFORMAL_FIELDS.has(state.career.field)) return null
  let age = state.currentYear < 1970 ? 65 : state.currentYear < 2000 ? 62 : 65
  if (['very_low', 'low', 'low_medium'].includes(c?.gdp)) age += 3   // no cushion to stop earlier
  if (state.character?.gender === 'female' && state.currentYear < 2010) age -= 3  // lower statutory ages for women
  return clamp(age, 55, 75)
}

// ─── Choosing a plausible job ────────────────────────────────────────────────
// getAvailableCareers answers "is this legal for this character", which is not
// the same as "is this what someone like this actually does". Left to itself it
// will make a 1974 Ethiopian villager a dog walker. Weight by what the place and
// the era actually employ people to do.

const FIELD_FIT = {
  // field            rural-poor  urban-poor  urban-rich
  agriculture:       [10, 1, 0.4],
  trade:             [4, 6, 1.5],
  casual:            [0.5, 2, 3],
  manufacturing:     [1, 5, 1.5],
  construction:      [2, 5, 1.5],
  transport:         [1, 4, 1.5],
  hospitality:       [1, 3, 2],
  military:          [2, 2, 1],
  law_enforcement:   [1, 2, 1.5],
  education:         [1.5, 2, 2.5],
  healthcare:        [1, 2, 2.5],
  religion:          [1.5, 1, 0.8],
  government:        [0.5, 2, 2],
  engineering:       [0.2, 1, 2.5],
  technology:        [0.05, 0.6, 3],
  finance:           [0.1, 0.8, 2.5],
  law:               [0.1, 0.8, 2],
  media:             [0.1, 1, 2],
  // Split out of `media` because every `field === 'media'` guard in the
  // corpus is about a journalist under a regime — the editor's office, the
  // protected source, the story that cannot run — and they were all firing
  // for a TikTok influencer, whose epitaph then read "She worked in
  // journalism and learned what it costs to tell the truth."
  digital_media:     [0.02, 0.12, 0.25],
  academia:          [0.1, 0.6, 1.8],
  science:           [0.05, 0.5, 1.5],
  arts:              [0.3, 0.4, 0.6],
  writing:           [0.05, 0.15, 0.3],
  entertainment:     [0.1, 0.3, 0.5],
  sports:            [0.2, 0.3, 0.4],
  social_services:   [0.3, 1, 1.8],
  mental_health:     [0.05, 0.4, 1.5],
  interpreter:       [0.05, 0.2, 0.3],
  veterinary:        [0.5, 0.5, 1],
  aviation:          [0.05, 0.4, 1],
  architecture:      [0.05, 0.5, 1.2],
  dentistry:         [0.1, 0.6, 1.2],
  pharmacy:          [0.2, 1, 1.4],
  real_estate:       [0.05, 0.3, 0.5],
  electrician:       [0.8, 2.5, 1.8],
  plumber:           [0.8, 2.5, 1.8],
  IT:                [0.05, 0.8, 2.2],
  politics:          [0.2, 0.5, 0.8],
}

// The columns are rural-poor / urban-poor / urban-rich, and the column was
// picked from the COUNTRY's urban rate rather than from where this character
// actually is — so every Indonesian in 1977 read as rural-poor including the
// ones in Jakarta, and every Brazilian in 1995 as urban-poor including the ones
// on a farm. The character's own position is what the table is about.
function fitColumn(state) {
  const country = liveCountry(state)
  const rural = livingRuralUrban(state) === 'rural'
  const tier = state?.character?.wealthTier ?? 2
  const richCountry = ['high', 'very_high', 'medium_high'].includes(country?.gdp)
  if (rural) return richCountry && tier >= 3 ? 1 : 0
  if (richCountry || tier >= 4) return 2
  return 1
}

// Occupations were, and mostly still are, segregated by sex and — in the Gulf
// — by passport. Without this the engine put Saudi women behind the wheel of
// a taxi decades before they were allowed to drive, a Pakistani woman of 1960
// in the same cab, and Saudi citizens on the building sites their country
// imported a workforce to staff.
const WOMEN_RESTRICTED = new Set(['Saudi Arabia', 'Afghanistan', 'Yemen', 'Pakistan', 'Iran', 'Qatar', 'UAE', 'Kuwait', 'Oman', 'Bahrain'])
const GULF_IMPORTED_WORK = new Set(['laborer', 'farmer', 'construction_worker', 'fast_food', 'cashier', 'chef', 'driver', 'factory_worker', 'babysitter', 'dog_walker', 'paper_round'])
function segregation(c, state) {
  const country = liveCountry(state)
  const y = state.currentYear ?? 1980
  let m = 1
  if (state.character?.gender === 'female') {
    const eraF = y < 1970 ? 1 : y < 2000 ? 0.7 : 0.45   // how closed the field still was
    if (c.field === 'transport') m *= 0.08 * (1 + (1 - eraF) * 2)
    else if (['construction', 'military', 'plumber', 'electrician'].includes(c.field)) m *= 0.12 * (1 + (1 - eraF) * 2)
    else if (c.field === 'law_enforcement') m *= y < 1975 ? 0.1 : 0.35
    else if (c.field === 'aviation') m *= y < 1980 ? 0.02 : 0.1
    if (WOMEN_RESTRICTED.has(country?.name)) {
      // Teaching girls and nursing women were the open doors; most others shut.
      if (!['education', 'healthcare', 'casual', 'government', 'agriculture', 'trade', 'manufacturing'].includes(c.field)) m *= 0.15
      if (country?.name === 'Saudi Arabia' && c.field === 'transport' && y < 2018) m = 0
      if (['military', 'law_enforcement'].includes(c.field) && y < 2019) m = 0
      if (country?.archetype === 'wealthy_gulf' || country?.name === 'Saudi Arabia') {
        if (['agriculture', 'trade', 'manufacturing', 'casual'].includes(c.field)) m *= 0.2
      }
    }
  }
  const gulf = country?.archetype === 'wealthy_gulf' || country?.name === 'Saudi Arabia'
  // The state, its police and its army are for nationals.
  if (gulfNonNational(state) && ['government', 'law_enforcement', 'military', 'politics'].includes(c.field)) return 0
  if (gulf && y >= 1975 && GULF_IMPORTED_WORK.has(c.id)) {
    const migrant = country?.ethnicGroups?.some(g => g.id === state.character?.ethnicity && g.disadvantaged)
    if (!migrant) m *= 0.1
  }
  return m
}

/** Pick a job the way a life picks one: from what is actually around. */
export function chooseCareer(state) {
  const available = getAvailableCareers(state).filter(c => !c.partTime || state.age < 20)
  if (!available.length) return null
  const col = fitColumn(state)
  // FIELD_FIT is a table of FIELDS, and it was applied per CAREER, so a field
  // with five entry points outweighed a field with one by five to one. The
  // casual field (paper round, babysitter, dog walker, fast food, cashier) and
  // the two-career entertainment field together took a large share of first
  // jobs: across 25 lives each, four German men of 1970 started as film
  // extras and nine Egyptians of 1990 as fast-food crew. Divide by the number
  // of careers the field offers this character, so the table means a field.
  const perField = {}
  for (const c of available) perField[c.field] = (perField[c.field] ?? 0) + 1
  const weighted = available.map(c => {
    let fit = (FIELD_FIT[c.field]?.[col] ?? 1) / perField[c.field]
    // A ladder whose top rung is "Superstar" is not entered the way a trade is.
    // A rural Sundanese seventeen-year-old in 1977 was picked for Busker and
    // promoted to Superstar by twenty-two, with a twenty-six-year tenure.
    if ((c.fameCareer || ['entertainment', 'sports'].includes(c.field)) && col === 0) fit *= 0.25
    // Nobody farms in a megacity. `agriculture` is weighted 1 in the urban-poor
    // column, which is low and is not zero, so the engine made a man who had
    // moved to Mumbai at nineteen a Smallholder at twenty and an Agricultural
    // Business Owner until sixty-nine — and then ran both arcs past each other
    // for four decades: the three-hour commute and the local train at rush hour
    // in the same life as "the neighbours had it too, which means the price
    // will be poor". Peri-urban farming around a town or a small city is real,
    // so the cut is at the two largest scales rather than at "urban".
    if (c.field === 'agriculture' && ['megacity', 'major_city'].includes(state?.currentPlace?.scale)) fit = 0
    fit *= segregation(c, state)
    // Nobody starts a creator channel as their living at sixty. A sixty-year-
    // old Qatari woman began as a "Micro Creator" and her obituary said she
    // spent the working years as a Growing Channel.
    if (c.field === 'digital_media' && state.age > 35) fit *= 0.1
    // Smarts open the doors that require them; they do not open the doors that
    // require capital or a name, which the requirements already model.
    const req = c.requirements?.minSmarts ?? 0
    const headroom = req > 0 ? clamp((state.stats.smarts - req) / 40 + 0.6, 0.4, 1.6) : 1
    return { c, w: Math.max(0.01, fit * headroom) }
  })
  const total = weighted.reduce((s, x) => s + x.w, 0)
  let r = Math.random() * total
  for (const x of weighted) { r -= x.w; if (r <= 0) return x.c }
  return weighted[weighted.length - 1].c
}

// ─── The hooks ───────────────────────────────────────────────────────────────

function log(s, text, isKey = false) {
  return { ...s, log: [...s.log, { age: s.age, year: s.currentYear, text, isKey }] }
}

/**
 * Work. Before the first job there may be years of unpaid or unrecorded labour;
 * where that is the norm it is said once, because it is the shape of the
 * childhood rather than an event in it.
 */
function courseWork(s) {
  if (s.career || s.retired || s.inPrison || s.education?.enrolled) return s
  const c = liveCountry(s)
  const entry = workEntryAge(s)

  // The years of work that never became a job.
  if (s.age >= entry && s.age < entry + 4 && !s.mem?.lcInformalNoted) {
    const subsistence = ['very_low', 'low'].includes(c?.gdp) && (c?.urbanRate ?? 0.5) < 0.45
    if (subsistence && s.age < 16 && chance(0.5)) {
      s = { ...s, mem: { ...s.mem, lcInformalNoted: true }, flags: [...new Set([...s.flags, 'working_young'])] }
      return log(s, pick([
        'You are put to work without anyone announcing it. One year you are carrying things because you are there, and the next you are carrying things because it is your job to.',
        'Nobody calls it work. There is simply a set of things that are yours to do before the light goes, and the set gets bigger every year.',
        'The work arrives before the word for it does. You are useful, and being useful turns out to be permanent.',
      ]))
    }
  }

  if (s.age < entry) return s
  if (s.age > 62) return s

  if (s.character?.gender === 'female' && !chance(femaleWorkChance(c, s.currentYear))) return s

  // Most people are not looking every year; they take what comes when it comes.
  if (!chance(0.42)) return s
  // Somebody who has worked before is not starting a first job. Prefer the
  // trade they know — a laid-off Agency Director looks for agency work — and
  // where they cannot get back in, say so, because the log otherwise reads
  // "You begin working as an Assembly Worker. Starting salary: $6,415/yr"
  // after twenty years on six figures, as though nothing had happened.
  const last = s.mem?.lcLastCareer
  const reentry = last && chance(0.65)
    ? (getAvailableCareers(s).find(c => c.id === last.id)
      ?? getAvailableCareers(s).find(c => c.field === last.field))
    : null
  const career = reentry ?? chooseCareer(s)
  if (!career) return s
  const before = s.career
  s = enterCareer(s, career.id)
  if (!s.career || s.career === before) return s
  if (last) {
    const fell = (last.baseSalary ?? 0) > 0 && (s.career.baseSalary ?? 0) < last.baseSalary * 0.55
    s = log(s, fell
      ? pick([
        `The job is a job. It is not the job, and the difference is a number you have stopped saying out loud.`,
        `You start again at the bottom of something, at an age when the people around you at this level are half yours. Nobody is unkind about it. That is its own thing to absorb.`,
        `What you were is not on the form. What you are is, and the two do not have to be reconciled by anybody except you.`,
      ])
      : pick([
        `You are back in it. The first week is spent finding out how much of what you knew still applies.`,
        `The work resumes. Some of it has moved on without you and some of it has not moved at all.`,
      ]), true)
  }
  return { ...s, mem: { ...s.mem, lcFirstJobAge: s.mem?.lcFirstJobAge ?? s.age } }
}

/**
 * Meeting someone. The hazard rises towards the local median marriage age and
 * falls away after it, which is roughly what the marriage curves look like.
 */
function coursePartner(s) {
  if (s.partner || s.inPrison || s.age < 15) return s
  if (s.flags?.includes('celibate') || s.flags?.includes('vow_of_celibacy')) return s
  // Peak the meeting several years BEFORE the median marriage age, because
  // marrying at twenty-one means meeting at eighteen. Peaking on the marriage
  // age itself pushed every median marriage a decade late. The extra year on
  // top of the courtship absorbs the engagement path, which costs one more.
  const target = marriageAge(s) - 4
  if (s.age < target - 4) return s
  const distance = s.age - target
  // Asymmetric: rises steeply to the peak, falls away slowly, because people do
  // meet someone at fifty-eight — just far less often than at twenty-two.
  const spread = distance < 0 ? 12 : 90
  let p = 0.46 * Math.exp(-(distance * distance) / spread)
  if (s.flags?.includes('widowed') || s.flags?.includes('divorced')) p *= 0.5
  const attract = ((s.stats.looks ?? 50) + (s.stats.charisma ?? 50)) / 200
  p *= 0.7 + 0.6 * attract
  if (!chance(clamp(p, 0.01, 0.5))) return s

  // Age gap, not a uniform draw. generatePartnerProfile's default span is the
  // character's age minus eight to plus twelve in both directions, which pairs
  // a great many men with a woman already past childbearing and quietly ends
  // their fertility before it starts. Real couples skew the other way, by
  // roughly the same margin as the male marriage-age gap above.
  const male = s.character?.gender === 'male'
  const profile = generatePartnerProfile(s, male
    ? { minAge: Math.max(s.age >= 22 ? 18 : 16, s.age - 7), maxAge: Math.max(18, s.age + 3) }
    : { minAge: Math.max(16, s.age - 2), maxAge: s.age + 11 })
  if (chance(arrangedShare(s))) {
    // Most marriages on the roster, for most of the century, were not met.
    // They were proposed, by families, and a Riyadh girl in 1988 did not
    // "start seeing" anybody for weeks before saying so out loud.
    s = { ...s, partner: { ...profile, arranged: true, engaged: true }, flags: [...new Set([...s.flags, 'first_relationship', 'arranged_marriage'])] }
    const elder = s.parents?.mother?.alive !== false ? 'mother' : s.parents?.father?.alive !== false ? 'father' : 'aunt'
    return log(s, pick([
      `A match is proposed: ${profile.name}. The families have met several times before the two of you do.`,
      `Your ${elder} has made enquiries, and the enquiries have come back with a name: ${profile.name}.`,
      `You are shown ${profile.name} across a room full of relatives, and ${profile.name} is shown you. Nobody pretends this is anything other than what it is.`,
      `The families settle on ${profile.name} over several visits and a great deal of tea. You are asked, at the end, and you say yes.`,
    ]), true)
  }
  s = { ...s, partner: profile, flags: [...new Set([...s.flags, 'first_relationship'])] }
  return log(s, pick([
    `You meet ${profile.name}. Nothing about it announces itself as the beginning of anything.`,
    `You and ${profile.name} start seeing each other. It takes some weeks before either of you says so out loud.`,
    `${profile.name} becomes the person you tell things to first. The change happens before you notice it has.`,
    `You meet ${profile.name}. Later you will disagree about which time was the first time.`,
  ]), true)
}

/**
 * How likely a first match is to have been arranged by the families rather
 * than met — by region and decade, lowered by a city and a degree. Rough
 * shares from the survey literature, not point estimates: South Asia stays
 * above three quarters through the whole period, the Gulf nearly as high, the
 * Arab world and Iran falling from a majority to a large minority, East Asia's
 * omiai and matchmakers fading out after the war.
 */
const SOUTH_ASIA = new Set(['India', 'Pakistan', 'Bangladesh', 'Nepal', 'Afghanistan', 'Bhutan'])
const MENA = new Set(['Egypt', 'Iran', 'Iraq', 'Syria', 'Jordan', 'Morocco', 'Algeria', 'Tunisia', 'Libya', 'Sudan', 'Yemen', 'Palestine', 'Lebanon', 'Turkey'])
export function arrangedShare(s) {
  const c = liveCountry(s)
  const y = s.currentYear ?? 1970
  let p = 0
  if (SOUTH_ASIA.has(c?.name)) p = y < 1990 ? 0.9 : 0.78
  else if (c?.archetype === 'wealthy_gulf' || c?.name === 'Saudi Arabia' || c?.name === 'Yemen') p = y < 2000 ? 0.9 : 0.72
  else if (MENA.has(c?.name)) p = y < 1980 ? 0.65 : y < 2000 ? 0.45 : 0.3
  else if (c?.name === 'Sri Lanka') p = y < 1980 ? 0.6 : 0.35
  else if (c?.name === 'China') p = y < 1950 ? 0.8 : y < 1980 ? 0.25 : 0.05
  else if (c?.name === 'Japan') p = y < 1960 ? 0.5 : y < 1980 ? 0.25 : 0.05
  else if (c?.name === 'South Korea') p = y < 1970 ? 0.5 : y < 1990 ? 0.15 : 0.03
  if (p === 0) return 0
  if (livingRuralUrban(s) !== 'rural') p -= 0.12
  if (['university', 'graduate'].includes(s.education?.level)) p -= 0.15
  if (s.flags?.includes('widowed') || s.flags?.includes('divorced')) p -= 0.2
  return clamp(p, 0, 0.95)
}

/** Marriage, where and when marriage is what people do. */
function courseMarriage(s) {
  if (!s.partner || s.partner.alive === false || s.partner.married || s.inPrison) return s
  const years = s.partner.years ?? 0
  if (years < 1) return s
  const target = marriageAge(s)
  // Marriage is near-universal in most of the world for most of this period;
  // in the late-century rich world it stops being.
  const c = liveCountry(s)
  const secular = ['wealthy_west', 'post_soviet'].includes(c?.archetype) && s.currentYear > 1985
  const base = secular ? 0.28 : 0.55
  const overdue = clamp((s.age - target) / 8, -0.5, 0.8)
  if (!chance(clamp(base + overdue * 0.2, 0.08, 0.75))) return s

  if (!s.partner.engaged) {
    // proposeMarriage is the player's button, and its line is the player's
    // act: "You propose to Aisha. They say yes." printed into every marriage
    // the life course made — a Hausa bride of 1980 proposing to her husband,
    // in the pronoun of nobody. The life course says it the way it happened
    // there and then. The threshold is the button's too, and after several
    // years together it stops describing anything: people marry out of
    // expectation, family, housing and inertia at least as often as out of a
    // high score.
    if ((s.partner.relationshipQuality ?? 60) < 55 && years < 3) return s
    return engagementLine({ ...s, partner: { ...s.partner, engaged: true } })
  }
  return getMarried(s)
}

const BRIDEWEALTH = new Set(['subsaharan'])
/** How an engagement happened, for a match that was met rather than arranged. */
function engagementLine(s) {
  const p = s.partner
  const name = p.name
  const c = liveCountry(s)
  const y = s.currentYear ?? 1970
  const female = s.character?.gender === 'female'
  const partnerMale = p.gender === 'male'
  const him = partnerMale ? 'him' : 'her'
  const he = partnerMale ? 'he' : 'she'
  const his = partnerMale ? 'his' : 'her'
  let pool
  if (BRIDEWEALTH.has(c?.archetype)) {
    pool = female
      ? [`${name}'s people come to see your people. There is a list, and an afternoon of arguing about the list, and at the end of it you are promised.`,
        `${name} sends ${his} uncles to your father's house. You are not in the room. You hear the laughter through the wall and know what it means.`]
      : [`You send your uncles to ${name}'s family with drinks and a speech that is older than any of you. They come back with a list, which is a yes.`,
        `The bride price is talked down over two visits and settled on the third. ${name} is in the next room the whole time and hears every figure.`]
  } else if (SOUTH_ASIA.has(c?.name) || MENA.has(c?.name) || c?.archetype === 'wealthy_gulf') {
    pool = [`Your two families are told, yours first, and then the families take it from there. ${name} finds a way to ask you, out of everyone's hearing, whether you are sure, and you are.`,
      `It is ${name}'s mother who has to be won over, and she is, slowly, across a season of visits in which nobody mentions it.`]
  } else if (y < 1985 || !['wealthy_west', 'post_soviet'].includes(c?.archetype)) {
    pool = female && partnerMale
      ? [`${name} asks you to marry ${him}. ${he[0].toUpperCase() + he.slice(1)} has clearly rehearsed it, and gets it wrong anyway, and you say yes before ${he} has finished.`,
        `${name} asks your father first, which you find out afterwards and do not entirely forgive. Then ${he} asks you.`,
        `${name} asks you on an ordinary evening, on the way back from somewhere. You say yes, and then you both walk the rest of the way not saying anything.`]
      : [`You ask ${name} to marry you. ${he[0].toUpperCase() + he.slice(1)} says yes, and then asks whether you are going to tell ${his} parents or whether ${he} has to.`,
        `You ask ${name}'s father before you ask ${name}, because that is how it is done, and he takes long enough answering that you start to sweat.`,
        `You ask ${name} on an ordinary evening, on the way back from somewhere. ${he[0].toUpperCase() + he.slice(1)} says yes, and you both walk the rest of the way not saying anything.`]
  } else {
    pool = [`One of you says it first and neither of you can afterwards agree which. You are engaged.`,
      `You and ${name} decide to get married, sitting at the kitchen table, in about four sentences.`,
      female && partnerMale
        ? `${name} asks you to marry ${him}, badly and sincerely, and you say yes.`
        : `You ask ${name} to marry you, badly and sincerely, and ${he} says yes.`]
  }
  const line = pick(preferUnsaid(s, pool))
  return { ...log(s, line, true), mem: rememberSaid(s.mem, line) }
}

// ─── Divorce ─────────────────────────────────────────────────────────────────
// Married couples never separated on their own: the relationship quality
// drifted toward 55 and only an unmarried couple under 20 could break up. An
// American born in 1950 had a 5% chance of ever divorcing, against a real 40%.
// The hazard is by place and decade, cut to nothing where the law did not allow
// it (Ireland before 1996, Italy before 1970, the Philippines still), lowered
// where faith or custom made it rare, and raised by a marriage that is not
// working.
const DIVORCE_BY_ARCHETYPE = {
  wealthy_west:        { 1930: 0.002, 1950: 0.004, 1965: 0.007, 1975: 0.014, 1990: 0.013, 2010: 0.011 },
  post_soviet:         { 1930: 0.004, 1950: 0.005, 1965: 0.012, 1980: 0.016, 1995: 0.015, 2020: 0.012 },
  wealthy_east:        { 1950: 0.003, 1980: 0.004, 2000: 0.008, 2020: 0.008 },
  wealthy_gulf:        { 1950: 0.004, 1990: 0.006, 2020: 0.008 },
  developing_urban:    { 1950: 0.002, 1980: 0.003, 2000: 0.005, 2020: 0.007 },
  developing_unstable: { 1950: 0.002, 1990: 0.003, 2020: 0.004 },
  subsaharan:          { 1950: 0.005, 2020: 0.006 },
  conflict_zone:       { 1950: 0.002, 2020: 0.003 },
}
const DIVORCE_COUNTRY_MULT = {
  'United States': 1.5, Sweden: 1.3, Denmark: 1.3, Finland: 1.2, Norway: 1.1, 'United Kingdom': 1.2, Russia: 1.2, Ukraine: 1.1, Belarus: 1.1, Latvia: 1.1, Cuba: 1.6,
  Italy: 0.4, Spain: 0.5, Portugal: 0.6, Ireland: 0.35, Greece: 0.5, Malta: 0.3, Poland: 0.6,
  Japan: 0.8, India: 0.12, Bangladesh: 0.3, Pakistan: 0.25, Nepal: 0.2, 'Sri Lanka': 0.3,
}
export function divorceHazard(s) {
  const c = liveCountry(s)
  const y = s.currentYear ?? 1970
  if (!divorceLegalFor(c, y, s.religion ?? s.character?.religion ?? '')) return 0
  let p = overTime(DIVORCE_BY_ARCHETYPE[c?.archetype] ?? DIVORCE_BY_ARCHETYPE.developing_urban, y)
  p *= DIVORCE_COUNTRY_MULT[c?.name] ?? 1
  const faith = String(s.religion ?? s.character?.religion ?? '')
  if (faith === 'hindu' || faith.startsWith('sikh')) p *= 0.4
  else if (faith === 'christian_catholic') p *= 0.75
  else if (faith === 'secular' || faith === 'atheist') p *= 1.25
  if (s.partner?.arranged) p *= 0.6
  const q = s.partner?.relationshipQuality ?? 55
  p *= q < 30 ? 4 : q < 45 ? 2 : q > 70 ? 0.4 : 1
  const years = s.partner?.years ?? 0
  p *= years < 3 ? 0.8 : years <= 10 ? 1.3 : years > 25 ? 0.4 : 1
  if (s.age > 60) p *= 0.4
  return clamp(p, 0, 0.25)
}

function courseDivorce(s) {
  const p = s.partner
  if (!p || p.alive === false || !p.married || s.inPrison) return s
  if (!chance(divorceHazard(s))) return s
  const c = liveCountry(s)
  const y = s.currentYear
  const name = p.name
  const first = name?.split(' ')[0] ?? name
  const kids = (s.children ?? []).filter(k => k.alive !== false && (k.age ?? 99) < 18).length
  const faith = String(s.religion ?? s.character?.religion ?? '')
  const female = s.character?.gender === 'female'
  let pool
  if (faith.startsWith('muslim') && (MENA.has(c?.name) || c?.archetype === 'wealthy_gulf' || SOUTH_ASIA.has(c?.name))) {
    pool = female
      ? [`${first} says the words, and the marriage is over in the time it takes to say them. Your brother comes with a car for your things.`,
        `The divorce goes through the family before it goes through anybody else. You are back in your mother's house by the end of the month, in the room you left.`]
      : [`You divorce ${first}. Her family come for her things on a Friday, and her brother does not look at you.`,
        `The divorce goes through both families before it goes through the court, and by the time it reaches the court there is nothing left in it to decide.`]
  } else if (c?.archetype === 'subsaharan') {
    pool = [`The bride price is argued over between the two families, and when it is settled, so is the marriage. ${first} goes back to ${p.gender === 'male' ? 'his' : 'her'} people.`,
      `${first} leaves. There is a meeting of the elders of both families, which is the divorce, and a long silence between the two houses afterwards, which is also the divorce.`]
  } else if (c?.archetype === 'post_soviet' && y < 1992) {
    pool = [`You divorce ${first} at the registry office, in the same building you were married in. It takes twenty minutes and a stamp, and then there is the question of the flat, which takes years.`,
      `You and ${first} divorce and go on living in the same two rooms, because there is nowhere else on the list for either of you. You learn to be polite.`]
  } else if (y < 1970) {
    pool = [`You divorce ${first}. It is still a word people lower their voices for, and you hear them do it.`,
      `${first} moves out. The divorce takes a lawyer, a reason the court will accept, and most of a year, and the reason is not the real one.`]
  } else {
    pool = [`${first} moves out in the spring. The papers take most of a year, and at the end of them you are somebody who was married once.`,
      `You and ${first} divorce. It is quieter than the years before it, which is how you know it was right, and it still takes a long time to stop setting out two cups.`,
      `The marriage ends in a lawyer's office, with both of you being careful about the furniture.`]
  }
  if (kids > 0) {
    pool = pool.map(l => `${l} ${kids === 1 ? 'The child learns' : 'The children learn'} the way between two houses.`)
  }
  const line = pick(preferUnsaid(s, pool))
  const out = log(s, line, true)
  return {
    ...out,
    partner: null,
    exPartners: [...(s.exPartners ?? []), { name, gender: p.gender, years: p.years ?? 0, married: true, endedYear: y, alive: true }],
    flags: [...new Set([...s.flags.filter(f => f !== 'married' && f !== 'engaged'), 'divorced'])],
    mem: rememberSaid({ ...(s.mem ?? {}), divorcedYear: y, lastMajorEvent_relationship: y }, line),
    stats: { ...s.stats, happiness: clamp((s.stats.happiness ?? 50) - 10, 0, 100) },
    children: (s.children ?? []).map(k => ({ ...k, relationshipQuality: clamp((k.relationshipQuality ?? 60) - 6, 0, 100) })),
  }
}

// Births outside marriage as a share of what the same couple would have inside
// it. A flat 0.5 put children before the wedding into Muslim households in
// 1980s Kano, where a pregnancy outside marriage was a matter for the family
// and, after 2000, for the Sharia courts. The spread is real: under 2% of
// births in the Gulf, India or Japan; around a third of all births in Western
// Europe by 2000; consensual unions the commonest form of family across much
// of Latin America and the Caribbean; and southern Africa, where bridewealth
// delays formal marriage for years, higher than West Africa.
const CONSENSUAL_UNION = new Set([
  'Mexico', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Panama', 'Costa Rica', 'Colombia',
  'Venezuela', 'Ecuador', 'Peru', 'Bolivia', 'Paraguay', 'Brazil', 'Argentina', 'Uruguay', 'Chile',
  'Cuba', 'Dominican Republic', 'Haiti', 'Jamaica', 'Trinidad and Tobago', 'Guyana', 'Belize',
])
const SOUTHERN_AFRICA = new Set(['South Africa', 'Namibia', 'Zimbabwe'])
export function premaritalFactor(s) {
  const c = liveCountry(s)
  const year = s.currentYear
  const faith = String(s.religion ?? s.character?.religion ?? '')
  if (faith.startsWith('muslim') || c?.archetype === 'wealthy_gulf') return 0.03
  if (faith === 'hindu' || faith.startsWith('sikh') || c?.archetype === 'wealthy_east') return 0.04
  if (c?.name && CONSENSUAL_UNION.has(c.name)) return 0.55
  if (c?.name && SOUTHERN_AFRICA.has(c.name)) return year >= 1970 ? 0.5 : 0.3
  if (c?.archetype === 'wealthy_west') return year < 1965 ? 0.08 : year < 1980 ? 0.2 : 0.5
  if (c?.archetype === 'post_soviet') return year < 1990 ? 0.12 : 0.35
  return 0.12
}

/** Children, at the rate the place and the decade actually had them. */
function courseChildren(s) {
  // A partner who has died stays on state as { alive: false } so the grief
  // layer can name them. Read as "has a partner", it went on conceiving.
  if (!s.partner || s.partner.alive === false || s.inPrison) return s
  if (s.flags?.includes('pregnant') || s.flags?.includes('expecting') || s.birthControl) return s
  if (s.flags?.includes('infertile') || s.flags?.includes('childfree_by_choice')) return s
  if (s.flags?.includes('sterilised')) return s
  const female = s.character?.gender === 'female'
  const bearerAge = female ? s.age : (s.partner.age ?? s.age)
  if (bearerAge > 44 || bearerAge < 15) return s

  const tfr = totalFertility(s)
  const born = (s.children?.length ?? 0)
  // Spread the lifetime total across the years actually available: partnering
  // consumes the early ones and a two-year birth interval consumes more, so the
  // effective window is nearer fifteen years than the thirty on paper.
  let p = tfr / 11
  if (born >= tfr) p *= 0.2
  else if (born >= tfr - 1) p *= 0.5
  if (!s.partner.married) p *= premaritalFactor(s)
  // A recent birth suppresses the next one; birth intervals are rarely annual.
  const since = s.age - (s.mem?.lcLastBirthAge ?? -99)
  if (since < 2) p *= 0.1
  else if (since < 3) p *= 0.65
  // tryForChild rolls its own conception chance on top of this one; compensate
  // so the tables above mean what they say rather than 65% of what they say.
  p /= s.partner.married ? 0.65 : 0.38
  if (!chance(clamp(p, 0, 0.85))) return s

  const before = s.flags?.includes('expecting')
  const next = tryForChild(s, { silent: true })
  if (!before && next.flags?.includes('expecting')) {
    return { ...next, mem: { ...next.mem, lcLastBirthAge: next.age } }
  }
  return next
}

/** Retirement, where retirement exists. */
function courseRetirement(s) {
  if (!s.career || s.retired || s.inPrison) return s
  const target = retirementAge(s)
  if (target == null) {
    // No pension, no retirement — only the work getting harder to do.
    if (s.age >= 66 && !s.mem?.lcNoRetirement && chance(0.3)) {
      s = { ...s, mem: { ...s.mem, lcNoRetirement: true } }
      return log(s, pick([
        'There is no year in which you stop. There is only the year you notice you are doing less of it, and that someone else has started doing the rest.',
        'People in other countries retire. You have heard about it. What happens here is that the work quietly redistributes itself away from you.',
        'You do not retire. The heavy part goes to someone younger, and you keep the part that needs knowing rather than lifting.',
      ]))
    }
    return s
  }
  if (s.age < target) return s
  if (!chance(0.45)) return s
  return retire(s)
}

// ─── Schooling ───────────────────────────────────────────────────────────────
// The engine granted secondary education to everyone who had not explicitly
// dropped out, which produced 95% secondary completion for a 1962 Nigerian
// cohort against a real 10%, and 98% for a 1974 Ethiopian one against 6%. In
// most of the world for most of this period, whether you finished school is THE
// fork in a life, and the game was quietly handing it to every character.
//
// Modelled on the literacy the country already carries, read for the
// character's own gender, because a literacy gap is the same gap: Nigeria is
// 0.72 male and 0.60 female and the schooling followed that. The era term
// exists because those literacy figures are a modern snapshot applied to
// mid-century births, so an older cohort is scaled down towards what it
// actually got.

const SCHOOL_ERA = { 1930: 0.42, 1950: 0.62, 1970: 0.82, 1990: 1.0, 2010: 1.06 }

export function secondaryChance(state) {
  const c = liveCountry(state)
  const female = state.character?.gender === 'female'
  const lit = (female ? c?.literacyFemale : c?.literacyMale) ?? 0.7
  // Near-universal literacy means near-universal secondary; 0.6 means a small
  // minority finish, which is what the record shows.
  let p = Math.pow(clamp((lit - 0.45) / 0.55, 0.02, 1), 1.6)
  p *= overTime(SCHOOL_ERA, state.currentYear)
  const urban = c?.urbanRate ?? 0.5
  if (urban < 0.3) p *= 0.75
  else if (urban > 0.7) p *= 1.1
  if (['very_low', 'low'].includes(c?.gdp)) p *= 0.85
  // A sharp child is more likely to be kept in school wherever there is a
  // choice about it; it does not conjure a school that is not there.
  p *= 0.8 + ((state.stats?.smarts ?? 50) / 250)
  return clamp(p, 0.045, 0.97)
}

// ─── University ──────────────────────────────────────────────────────────────
// Whether a place existed. The graduation fork offered university to anyone
// with 8,000 in the bank or a smarts of 72 — a nominal figure that meant a
// fortune in 1968 and a month's rent in 2008, and no notion that most of the
// world had a handful of universities for millions of people. Share of the
// age cohort entering tertiary education, by the year they are eighteen:
// the United States crosses a quarter in the late sixties, Sweden is near a
// tenth in the fifties, Afghanistan is near nothing for most of the century.
const TERTIARY_BY_ARCHETYPE = {
  wealthy_west:        { 1920: 0.03, 1940: 0.05, 1958: 0.10, 1970: 0.18, 1990: 0.30, 2010: 0.45 },
  wealthy_east:        { 1930: 0.02, 1950: 0.05, 1970: 0.15, 1990: 0.35, 2010: 0.60 },
  wealthy_gulf:        { 1950: 0.002, 1970: 0.03, 1990: 0.12, 2010: 0.25 },
  post_soviet:         { 1930: 0.03, 1950: 0.08, 1970: 0.15, 1990: 0.18, 2010: 0.35 },
  developing_urban:    { 1930: 0.005, 1950: 0.02, 1970: 0.06, 1990: 0.12, 2010: 0.25 },
  developing_unstable: { 1930: 0.003, 1950: 0.01, 1970: 0.03, 1990: 0.06, 2010: 0.12 },
  subsaharan:          { 1930: 0.0005, 1950: 0.002, 1970: 0.01, 1990: 0.03, 2010: 0.07 },
  conflict_zone:       { 1930: 0.0005, 1950: 0.002, 1970: 0.01, 1990: 0.03, 2010: 0.06 },
}
const TERTIARY_BY_COUNTRY = {
  'United States': { 1930: 0.08, 1945: 0.15, 1968: 0.27, 1990: 0.33, 2010: 0.42 },
  Canada:          { 1940: 0.06, 1968: 0.20, 1990: 0.32, 2010: 0.45 },
  Japan:           { 1940: 0.04, 1960: 0.10, 1975: 0.27, 1990: 0.30, 2010: 0.50 },
  'South Korea':   { 1950: 0.03, 1970: 0.08, 1980: 0.15, 1995: 0.45, 2010: 0.70 },
  Afghanistan:     { 1930: 0.0002, 1960: 0.002, 1975: 0.01, 1990: 0.01, 2010: 0.04 },
  Philippines:     { 1950: 0.05, 1970: 0.15, 1990: 0.25, 2010: 0.28 },
  India:           { 1950: 0.01, 1970: 0.04, 1990: 0.06, 2010: 0.18 },
  China:           { 1950: 0.003, 1966: 0.01, 1970: 0.001, 1977: 0.01, 1990: 0.03, 2000: 0.08, 2010: 0.25 },
  Germany:         { 1950: 0.05, 1970: 0.14, 1980: 0.19, 2000: 0.33, 2010: 0.45 },
  Ireland:         { 1950: 0.04, 1968: 0.11, 1980: 0.18, 1995: 0.35, 2010: 0.5 },
  Italy:           { 1950: 0.04, 1970: 0.14, 1990: 0.22, 2010: 0.35 },
  Sweden:          { 1940: 0.04, 1958: 0.09, 1970: 0.2, 1990: 0.3, 2010: 0.45 },
}
// Women's share of places relative to men's, by year: half in the forties,
// parity by about 1980 in the rich world and later elsewhere, with the
// country's own literacy gap doing the rest.
const TERTIARY_FEMALE_RATIO = { 1920: 0.25, 1940: 0.45, 1960: 0.6, 1980: 0.9, 2000: 1.15 }
export function tertiaryChance(state) {
  const c = liveCountry(state)
  const y = state.currentYear ?? 1970
  const named = TERTIARY_BY_COUNTRY[c?.name]
  const avg = overTime(named ?? TERTIARY_BY_ARCHETYPE[c?.archetype] ?? TERTIARY_BY_ARCHETYPE.developing_urban, y)
  const litGap = clamp((c?.literacyFemale ?? 0.9) / Math.max(0.05, c?.literacyMale ?? 0.9), 0.2, 1)
  const r = overTime(TERTIARY_FEMALE_RATIO, y) * litGap
  const male = avg * 2 / (1 + r)
  return clamp(state.character?.gender === 'female' ? male * r : male, 0, 0.9)
}

/**
 * The chance a secondary graduate is offered a university place, given how
 * many of their cohort finished secondary in the first place. A place is
 * mostly taken when it is offered; `UNI_TAKEUP` is the share who take it.
 */
export const UNI_TAKEUP = 0.8
export function universityPlaceChance(state) {
  const cohortSecondary = secondaryChance({ ...state, stats: { ...(state.stats ?? {}), smarts: 50 } })
  const t = tertiaryChance(state)
  const conditional = t / Math.max(t, cohortSecondary) / UNI_TAKEUP
  // The sharp get the places, where places are few.
  const merit = clamp(0.4 + (state.stats?.smarts ?? 60) / 100, 0.6, 1.4)
  return clamp(conditional * merit, 0, 0.97)
}

/** Whether this character can read at all, where secondary was not reached. */
export function primaryChance(state) {
  const c = liveCountry(state)
  const female = state.character?.gender === 'female'
  const lit = (female ? c?.literacyFemale : c?.literacyMale) ?? 0.7
  return clamp(lit * overTime(SCHOOL_ERA, state.currentYear) + 0.1, 0.05, 0.99)
}

// ─── Housing ─────────────────────────────────────────────────────────────────
// Nobody in this game had ever had a home of their own: buyProperty existed and
// nothing called it, so across every simulated life the ownership rate was 0%.
//
// Tenure is one of the most era- and place-defining facts of a life, and it is
// not one story. A Soviet family waits years for an allocated flat and is then
// handed the freehold of it in 1993 by a decree nobody asked for. A West German
// rents for fifty years by preference and is not poor for it. A Lagos household
// builds its own house over a decade of half-finished floors and never holds a
// title deed. Ownership rates below are households, not people, and the second
// table is for the countries whose figure the archetype cannot predict.

const OWNERSHIP_BY_ARCHETYPE = {
  wealthy_west:        { 1900: 0.38, 1950: 0.50, 1980: 0.62, 2000: 0.66, 2020: 0.64 },
  // Near-total state ownership, then the mass privatisations of the early 1990s,
  // which handed sitting tenants the freehold of the flat they already lived in.
  post_soviet:         { 1900: 0.30, 1950: 0.06, 1988: 0.10, 1996: 0.80, 2020: 0.88 },
  wealthy_east:        { 1900: 0.50, 1950: 0.55, 1980: 0.61, 2000: 0.61, 2020: 0.60 },
  developing_urban:    { 1900: 0.60, 1950: 0.62, 1980: 0.66, 2000: 0.70, 2020: 0.71 },
  developing_unstable: { 1900: 0.65, 1950: 0.66, 1980: 0.67, 2000: 0.68, 2020: 0.68 },
  subsaharan:          { 1900: 0.80, 1950: 0.78, 1980: 0.74, 2000: 0.70, 2020: 0.66 },
  conflict_zone:       { 1900: 0.65, 1950: 0.62, 1980: 0.58, 2000: 0.55, 2020: 0.52 },
  wealthy_gulf:        { 1900: 0.55, 1950: 0.50, 1980: 0.38, 2000: 0.32, 2020: 0.30 },
}

const OWNERSHIP_BY_COUNTRY = {
  Germany:     { 1950: 0.30, 1980: 0.40, 2020: 0.47 },   // renting is a choice, not a failure
  Switzerland: { 1950: 0.32, 1980: 0.32, 2020: 0.40 },
  Austria:     { 1950: 0.36, 1980: 0.48, 2020: 0.55 },
  Singapore:   { 1960: 0.10, 1980: 0.60, 2000: 0.88, 2020: 0.89 },  // HDB
  Romania:     { 1985: 0.12, 1996: 0.94, 2020: 0.95 },
  Russia:      { 1985: 0.10, 1996: 0.78, 2020: 0.87 },
  China:       { 1980: 0.15, 2000: 0.72, 2020: 0.90 },   // danwei housing, then the boom
}

export function ownershipChance(state) {
  const c = liveCountry(state)
  const named = OWNERSHIP_BY_COUNTRY[c?.name]
  const base = named
    ? overTime(named, state.currentYear)
    : overTime(OWNERSHIP_BY_ARCHETYPE[c?.archetype] ?? OWNERSHIP_BY_ARCHETYPE.developing_urban, state.currentYear)
  // Someone living on someone else's visa does not buy the flat.
  const r = state.residencyStatus
  // Freehold for foreigners in the Gulf is a handful of zones from 2002 on.
  if (gulfNonNational(state)) return base * (state.currentYear >= 2002 ? 0.08 : 0.01)
  if (r && r !== 'citizen' && r !== 'permanent_resident') return base * 0.15
  return base
}

// A flat allocated by a housing office and later privatised by decree is a
// socialist state's story; a self-build on family land is everywhere else's.
// Drawn from one pool, the allocation line reached an Indonesian police
// sergeant in 2020 — and CLAUDE.md's own note says post-Soviet privatisation
// is an event, not a hazard.
const ALLOCATING = new Set([
  'Russia', 'Ukraine', 'Belarus', 'Poland', 'Romania', 'Bulgaria', 'Hungary',
  'Czech Republic', 'Slovakia', 'Estonia', 'Latvia', 'Lithuania', 'Moldova',
  'Georgia', 'Armenia', 'Azerbaijan', 'Kazakhstan', 'Uzbekistan', 'Kyrgyzstan',
  'Tajikistan', 'Turkmenistan', 'China', 'Cuba', 'North Korea', 'Vietnam',
  'Mongolia', 'Albania', 'Serbia', 'Croatia', 'Slovenia', 'Bosnia and Herzegovina',
  'East Germany', 'Singapore',
])

/**
 * A home, by whichever route this place and decade actually provides one.
 *
 * Two paths, because there are two worlds: a financed purchase where there is a
 * mortgage market and the money for a deposit, and everywhere else — land from
 * the family, a house built over a decade of half-finished floors, a flat
 * allocated and later simply handed over. The second path is most of the world
 * for most of this period, and pricing it as a purchase would have quietly
 * excluded it.
 */

function courseHousing(s) {
  if (s.inPrison || s.age < 20 || s.age > 72) return s
  if ((s.assets?.properties?.length ?? 0) > 0) return s
  if (s.mem?.lcHousingSettled) return s
  // A character who has already had the "it was not going to happen" event and
  // made their peace with renting should not then be handed a mortgage by the
  // default layer. One life got `housing_never_owned_west` at 54 and a
  // terraced house at 63.
  if (s.mem?.housingNeverOwned || (s.flags ?? []).includes('made_peace_with_renting')) return s

  const c = liveCountry(s)
  // Acquisition peaks in the thirties and tails off; the lifetime total is what
  // the tables above say, spread across the years it actually happens in.
  const peak = 34
  const d = s.age - peak
  const shape = Math.exp(-(d * d) / (d < 0 ? 90 : 260))
  const settled = s.partner ? 1.35 : 1.0
  const formal = ['very_high', 'high', 'medium_high'].includes(c?.gdp)
  // Two different rates because the two paths have different brakes on them.
  // A financed purchase is already limited by whether the deposit exists, so it
  // needs a higher hazard to reach its lifetime rate; the unfinanced route has
  // no such brake and saturates at the same number, which is how Nigeria and
  // India first came out at 90% against a real 70%.
  const p = ownershipChance(s) * shape * settled * (formal ? 0.075 : 0.05)
  if (!chance(clamp(p, 0, 0.3))) return s

  const tier = ['very_high', 'high'].includes(c?.gdp) ? 'terraced_house'
    : c?.gdp === 'medium_high' ? 'apartment' : 'studio_flat'
  const type = PROPERTY_TYPES.find(t => t.id === tier) ?? PROPERTY_TYPES[0]

  if (formal) {
    const price = inEraMoney(localisePrice(type.basePrice, c?.gdp, 'local'), c, s.currentYear)
    const deposit = Math.round(price * (type.downPaymentRate ?? 0.2))
    if ((s.money ?? 0) < deposit) return s
    // A lender tests the income, not only the deposit. Nothing here did, so a
    // musician on $4,149 a year who happened to have saved a deposit was handed
    // a terraced house whose annual payment exceeded her entire salary — and
    // that was free, invisibly, for as long as arrears had no consequence. The
    // moment three years of them took the house, the engine started repossessing
    // people at 44 whose only mistake was being sold a mortgage in the first
    // place: three lives in a row entered arrears at 42 and lost the house at 44.
    //
    // Below the line the purchase simply does not happen, which is what "could
    // not get a mortgage" looks like from inside a life.
    const mortgage = price - deposit
    const payment = Math.round(mortgage / 25) + Math.round(mortgage * 0.04)
    // The textbook line is about a third of GROSS HOUSEHOLD income, and the
    // state carries one salary — there is no partner income field — so the
    // figure has to stand in for a household out of a single earner's wage.
    // Calibrated against the recorded targets rather than picked: at 0.35 it
    // rejected the median 1975 American household and ownership collapsed to
    // 18%; at 0.7 it measures US 41-50% and Germany 37-42% against real figures
    // of 43% and 47%, with repossession down to 1-3 lives in 62.
    const HOUSEHOLD_CAPACITY = 0.7
    const income = (s.career?.salary ?? 0) + (s.pensionAnnual ?? 0)
    if (payment > income * HOUSEHOLD_CAPACITY) return s
    s = {
      ...s,
      money: (s.money ?? 0) - deposit,
      assets: { ...s.assets, properties: [...(s.assets?.properties ?? []), {
        typeId: type.id, name: type.name, purchasePrice: price, currentValue: price, mortgage: price - deposit,
      }] },
      flags: [...new Set([...s.flags, 'homeowner', 'mortgaged'])],
      mem: { ...s.mem, lcHousingSettled: true, lcHomeYear: s.currentYear },
    }
    return log(s, pick([
      'The paperwork takes a morning and commits the next twenty-five years of you, and the man who hands you the pen has done this so many times that he talks about the weather all the way through it.',
      'You own the front door. You do not own most of what is behind it yet, and will not for a long time, but the front door is a real thing and you stand in it for a while.',
      'There is a particular sound an empty room makes before there is anything in it. You will not hear it again in this house.',
    ]), true)
  }

  // The unfinanced route: family land, a self-build, an allocated flat that
  // became yours. No mortgage, because there was never a bank in it.
  const value = Math.max(400, inEraMoney(Math.round(localisePrice(type.basePrice, c?.gdp, 'local') * 0.45), c, s.currentYear))
  const allocated = ALLOCATING.has(c?.name) && s.currentYear >= 1950
  s = {
    ...s,
    assets: { ...s.assets, properties: [...(s.assets?.properties ?? []), {
      typeId: type.id, name: unpurchasedHomeName(c, s.flags, allocated), purchasePrice: 0, currentValue: value, mortgage: 0, unfinanced: true,
    }] },
    flags: [...new Set([...s.flags, 'homeowner', 'home_without_a_deed'])],
    mem: { ...s.mem, lcHousingSettled: true, lcHomeYear: s.currentYear },
  }
  // Two of these assume an institution that a handful of country-years did not
  // have: money, and a letter from a functioning post and land registry.
  // Democratic Kampuchea abolished both, and printed "The roof goes on in
  // stages, as the money arrives" into 1977.
  const hasMoney = institutionExists(c?.name, s.currentYear, 'money')
  const hasPost = institutionExists(c?.name, s.currentYear, 'post')
  // There are two unfinanced routes and they are not the same route. A flat
  // allocated by a housing office and then privatised by decree is a socialist
  // state's story; a self-build on family land is everywhere else's. Drawn
  // from one pool, the allocation line reached an Indonesian police sergeant
  // in 2020 — and CLAUDE.md's own note says post-Soviet privatisation is an
  // event, not a hazard. The property's name comes from `unpurchasedHomeName`
  // either way, so a flat that was allocated to you was also being called "the
  // house you built".
  if (allocated) {
    return log(s, pick([
      hasPost
        ? 'The flat was allocated, and then years later a letter arrived saying it was simply yours now. You read it twice. Nobody had asked you whether you wanted to own anything.'
        : 'You were put in it. Whether it is yours is not a question anybody is currently answering, and asking would be the wrong thing to do.',
      'The list moved and your name was on it, after a number of years you could state exactly. The flat is the same as the flats either side of it, which is the point of it.',
      'Somebody at the works had a word, and then there was a key. You have never been entirely sure which part of that was the system working and which part was the word.',
    ]), true)
  }
  // A self-build on family land is a village or a town. In Buenos Aires or
  // Lagos proper the unfinanced home is a flat that came down through the
  // family, or one bought from somebody in cash with a paper and no bank.
  if (['megacity', 'major_city'].includes(s.currentPlace?.scale)) {
    return log(s, pick([
      'The flat was your grandmother\'s, and then nobody\'s in particular, and then yours. The deed is in a drawer in a name that is not yours, and nobody has asked to see it.',
      hasMoney
        ? 'You buy it from a cousin, in cash, in instalments, with a paper you both sign in front of a man whose stamp costs more than the paper.'
        : 'It comes to you the way things come to you here: somebody leaves, and somebody who knows somebody says it is yours now.',
    ]), true)
  }
  return log(s, pick([
    'The house is finished in the sense that you live in it. The upper floor has been waiting for its windows for two years and will wait longer, and everyone builds this way, so nobody remarks on it.',
    'Nobody signs anything. The land is where the family has been, and the arrangement is understood by everyone who needs to understand it, which works perfectly until the day it does not.',
    hasMoney
      ? 'The roof goes on in stages, as the money arrives. You can date the last four years by looking up at it.'
      : 'The roof goes on in stages, as the materials turn up. You can date the last four years by looking up at it.',
  ]), true)
}

/**
 * Run the ordinary course of a life for one year.
 * Every hook is a no-op if the player has already filled that slot themselves.
 */
export function tickLifeCourse(state) {
  if (state.dead) return state
  let s = state
  s = courseWork(s)
  s = courseDivorce(s)
  s = coursePartner(s)
  s = courseMarriage(s)
  s = courseChildren(s)
  s = courseHousing(s)
  s = courseRetirement(s)
  s = courseGrandchildren(s)
  return s
}

/**
 * Grandchildren. They were not modelled at all — a `grandparent` flag set by
 * one event and a guess from a child's age — so childless seventy-year-olds
 * were told what their grandchildren did on their phones and a Nigerian
 * mother of nine could reach eighty with none. Each living adult child now has
 * children of their own at the local rate, recorded as `child.kids`. The first
 * is narrated by the existing late_grandchild_born event; the rest are a line.
 */
function courseGrandchildren(s) {
  const kids = s.children ?? []
  if (!kids.length) return s
  const tfr = totalFertility(s)
  const before = kids.reduce((n, c) => n + (c.kids ?? 0), 0)
  const born = []
  const next = kids.map(c => {
    if (c.alive === false) return c
    const a = c.age ?? 0
    if (a < 18 || a > 42) return c
    const have = c.kids ?? 0
    let p = tfr / 22
    if (have >= Math.round(tfr)) p *= 0.12
    if (a < 21) p *= 0.5
    if (!chance(clamp(p, 0, 0.5))) return c
    born.push(c)
    return { ...c, kids: have + 1 }
  })
  if (!born.length) return s
  let out = { ...s, children: next, mem: { ...(s.mem ?? {}), grandchildCount: before + born.length } }
  if (before === 0 && !s.flags?.includes('grandparent')) {
    const ev = GRANDCHILD_EVENT()
    if (ev && !(s.usedEventMap ?? new Map()).has(ev.id) && !s.queue?.some(e => e.id === ev.id)) {
      out = { ...out, queue: [ev, ...(s.queue ?? [])] }
    } else {
      out = { ...out, flags: [...new Set([...(s.flags ?? []), 'grandparent'])] }
    }
    return out
  }
  let count = before
  for (const c of born) {
    count += 1
    out = grandchildLine(out, c, count)
  }
  return out
}

const ORDINALS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
  'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth',
  'nineteenth', 'twentieth']

// Three fixed templates and no memory: one life read "Ikram calls with the
// news" four times. The line interpolates the child's name, so the hashed
// said-lines record cannot see that two of them are the same sentence; the
// template index is remembered as well, and a fresh one is preferred until
// all of them have been used.
function grandchildLine(s, c, count = 2) {
  const first = c.name?.split(' ')[0] ?? 'your child'
  const which = c.gender === 'female' ? 'daughter' : 'son'
  const babyGender = chance(0.5) ? 'female' : 'male'
  const baby = babyGender === 'female' ? 'daughter' : 'son'
  const pool = childNameCountry(s)?.namePool?.[babyGender]
  const gname = pickUnusedName(pool, namesInUse(s)) || null
  const templates = [
    () => `Your ${which} ${first} has a ${baby}. You hold the baby the way you held ${first}, and your arms remember before you do.`,
    () => `Another grandchild, ${first}'s this time. The house is loud on Sundays in a way it has not been for years.`,
    () => `${first} calls with the news. You write the name down so that you will say it right the first time.`,
    () => gname ? `${first}'s ${baby} is called ${gname}. You say it over to yourself for a day until it stops sounding new.`
      : `${first}'s ${baby} arrives in the night. You hear about it in the morning, and the morning is different.`,
    () => gname ? `${gname}. ${first}'s. Small, furious, entirely there.`
      : `A ${baby} for ${first}. Small, furious, entirely there.`,
    () => `${first} puts the baby in your arms and goes to sit down, and does not ask for it back for an hour.`,
    () => gname ? `A grandchild called ${gname}. You count them on your fingers afterwards, to be sure of the number.`
      : `Another grandchild. You count them on your fingers afterwards, to be sure of the number.`,
    () => `${first} has a ${baby}. Somebody has to tell you twice, because the first time you are still thinking of ${first} at that age.`,
  ]
  // A grandchild already announced by an event is still the first one here.
  if (count === 1) {
    const text = `${first} has a ${baby}, your first grandchild. You are told on the doorstep and you sit down on the step to hear the rest.`
    return { ...log(s, text), mem: rememberSaid(s.mem, text) }
  }
  const used = Array.isArray(s.mem?.gcTemplatesUsed) ? s.mem.gcTemplatesUsed : []
  const open = templates.map((_, i) => i).filter(i => !used.includes(i))
  // Once the eight are spent the templates do not start again — the old reset
  // is how a grandmother of seventeen read the same sentence three times. The
  // count is the news now, and only now and then: by the twelfth, a birth in
  // the family is a thing you hear about, and the life log does not need
  // every one of them.
  if (open.length === 0) {
    if (count > ORDINALS.length || (count > 12 && count % 3 !== 0)) return s
    const nth = ORDINALS[count - 1]
    const text = pick([
      `The ${nth} grandchild, ${first}'s. You have to stop and count to be sure of the number, and then you are sure.`,
      `${first}'s ${baby} makes ${count}. You keep the names in a list now, in the order they came.`,
      `A ${baby} for ${first}: the ${nth}. The family has grown past what one table holds, and nobody has suggested a second table.`,
    ])
    if (hasSaid(s, text)) return s
    return { ...log(s, text), mem: rememberSaid(s.mem, text) }
  }
  const lines = open.map(i => [i, templates[i]()])
  const fresh = preferUnsaid(s, lines.map(([, t]) => t))
  const choices = lines.filter(([, t]) => fresh.includes(t))
  const [idx, text] = pick(choices.length ? choices : lines)
  const out = log(s, text)
  return {
    ...out,
    mem: rememberSaid({ ...(out.mem ?? {}), gcTemplatesUsed: [...used, idx] }, text),
  }
}
let _grandchildEvent
const GRANDCHILD_EVENT = () => (_grandchildEvent ??= EVENTS.find(e => e.id === 'late_grandchild_born') ?? null)

// A home that arrived without a purchase — family land, a self-build, an
// allocated flat — carries the name of the thing it actually is. The catalogue
// entry is a financed transaction's name, and the prose beside it describes
// rebar and an unfinished upper floor, so a life ended holding an asset called
// "Studio Flat" while the epitaph described the house they built.
export function unpurchasedHomeName(country, flags = [], allocated = false) {
  if (flags.includes?.('privatised_flat') || flags.includes?.('soviet_flat')) return 'The flat, privatised'
  const arch = country?.archetype
  if (arch === 'post_soviet') return 'The flat you were given the deed to'
  // The name has to match the story the prose told. A flat that was allocated
  // to an Indonesian police sergeant was also being called "The house you
  // built", and the epitaph then said it was built in stages as money allowed.
  if (allocated) return 'The flat you were allocated'
  if (['wealthy_west', 'wealthy_east', 'wealthy_gulf'].includes(arch)) return 'The house that came to you'
  return 'The house you built'
}
