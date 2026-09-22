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
import { generatePartnerProfile, getMarried, proposeMarriage, retire, tryForChild } from './playerActions'
import { enterCareer, getAvailableCareers, liveCountry } from './tick'

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
  academia:          [0.1, 0.6, 1.8],
  science:           [0.05, 0.5, 1.5],
  arts:              [0.6, 1, 1.2],
  writing:           [0.2, 0.6, 1],
  entertainment:     [0.4, 1, 1.2],
  sports:            [0.5, 1, 1],
  social_services:   [0.3, 1, 1.8],
  mental_health:     [0.05, 0.4, 1.5],
  interpreter:       [0.2, 0.8, 1],
  veterinary:        [0.5, 0.5, 1],
  aviation:          [0.05, 0.4, 1],
  architecture:      [0.05, 0.5, 1.2],
  dentistry:         [0.1, 0.6, 1.2],
  pharmacy:          [0.2, 1, 1.4],
  real_estate:       [0.1, 1, 1.6],
  electrician:       [0.8, 2.5, 1.8],
  plumber:           [0.8, 2.5, 1.8],
  IT:                [0.05, 0.8, 2.2],
  politics:          [0.2, 0.5, 0.8],
}

function fitColumn(country) {
  const rich = ['high', 'very_high', 'medium_high'].includes(country?.gdp)
  const urban = (country?.urbanRate ?? 0.5) >= 0.45
  if (rich) return 2
  return urban ? 1 : 0
}

/** Pick a job the way a life picks one: from what is actually around. */
export function chooseCareer(state) {
  const available = getAvailableCareers(state).filter(c => !c.partTime || state.age < 20)
  if (!available.length) return null
  const col = fitColumn(liveCountry(state))
  const weighted = available.map(c => {
    const fit = FIELD_FIT[c.field]?.[col] ?? 1
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
  const career = chooseCareer(s)
  if (!career) return s
  const before = s.career
  s = enterCareer(s, career.id)
  if (!s.career || s.career === before) return s
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
  s = { ...s, partner: profile, flags: [...new Set([...s.flags, 'first_relationship'])] }
  return log(s, pick([
    `You meet ${profile.name}. Nothing about it announces itself as the beginning of anything.`,
    `You and ${profile.name} start seeing each other. It takes some weeks before either of you says so out loud.`,
    `${profile.name} becomes the person you tell things to first. The change happens before you notice it has.`,
    `You meet ${profile.name}. Later you will disagree about which time was the first time.`,
  ]), true)
}

/** Marriage, where and when marriage is what people do. */
function courseMarriage(s) {
  if (!s.partner || s.partner.married || s.inPrison) return s
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
    const next = proposeMarriage(s)
    if (next.partner?.engaged) return next
    // proposeMarriage refuses below a relationship-quality threshold. After
    // several years together that threshold stops describing anything: people
    // marry out of expectation, family, housing and inertia at least as often
    // as out of a high score.
    if (years >= 3) return { ...s, partner: { ...s.partner, engaged: true } }
    return s
  }
  return getMarried(s)
}

/** Children, at the rate the place and the decade actually had them. */
function courseChildren(s) {
  if (!s.partner || s.inPrison) return s
  if (s.flags?.includes('pregnant') || s.birthControl) return s
  if (s.flags?.includes('infertile') || s.flags?.includes('childfree_by_choice')) return s
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
  if (!s.partner.married) p *= 0.5
  // A recent birth suppresses the next one; birth intervals are rarely annual.
  const since = s.age - (s.mem?.lcLastBirthAge ?? -99)
  if (since < 2) p *= 0.1
  else if (since < 3) p *= 0.65
  // tryForChild rolls its own conception chance on top of this one; compensate
  // so the tables above mean what they say rather than 65% of what they say.
  p /= s.partner.married ? 0.65 : 0.38
  if (!chance(clamp(p, 0, 0.85))) return s

  const before = s.flags?.includes('pregnant')
  const next = tryForChild(s)
  if (!before && next.flags?.includes('pregnant')) {
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
  if (r && r !== 'citizen' && r !== 'permanent_resident') return base * 0.15
  return base
}

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
    const price = localisePrice(type.basePrice, c?.gdp, 'local')
    const deposit = Math.round(price * (type.downPaymentRate ?? 0.2))
    if ((s.money ?? 0) < deposit) return s
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
  const value = Math.max(400, Math.round(localisePrice(type.basePrice, c?.gdp, 'local') * 0.45))
  s = {
    ...s,
    assets: { ...s.assets, properties: [...(s.assets?.properties ?? []), {
      typeId: type.id, name: type.name, purchasePrice: 0, currentValue: value, mortgage: 0,
    }] },
    flags: [...new Set([...s.flags, 'homeowner', 'home_without_a_deed'])],
    mem: { ...s.mem, lcHousingSettled: true, lcHomeYear: s.currentYear },
  }
  return log(s, pick([
    'The house is finished in the sense that you live in it. The upper floor has been waiting for its windows for two years and will wait longer, and everyone builds this way, so nobody remarks on it.',
    'Nobody signs anything. The land is where the family has been, and the arrangement is understood by everyone who needs to understand it, which works perfectly until the day it does not.',
    'The roof goes on in stages, as the money arrives. You can date the last four years by looking up at it.',
    'The flat was allocated, and then years later a letter arrived saying it was simply yours now. You read it twice. Nobody had asked you whether you wanted to own anything.',
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
  s = coursePartner(s)
  s = courseMarriage(s)
  s = courseChildren(s)
  s = courseHousing(s)
  s = courseRetirement(s)
  return s
}
